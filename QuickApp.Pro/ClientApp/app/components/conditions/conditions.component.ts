import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';

import { ConditionService } from '../../services/condition.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { Condition } from '../../models/condition.model';
import * as $ from 'jquery';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort, MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { MasterCompany } from '../../models/mastercompany.model';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AuthService } from '../../services/auth.service';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuditHistory } from '../../models/audithistory.model';
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { validateRecordExistsOrNot, getObjectById, getObjectByValue, selectedValueValidate, editValueAssignByCondition } from '../../generic/autocomplete';
@Component({
    selector: 'app-conditions',
    templateUrl: './conditions.component.html',
    styleUrls: ['./conditions.component.scss'],
    animations: [fadeInOut]
})
/** Conditions component*/
export class ConditionsComponent implements OnInit {
    selectedActionName: any;
    actionamecolle: any[] = [];

    AuditDetails: SingleScreenAuditDetails[];
    auditHisory: AuditHistory[];
    selectedColumns: any[];
    id: number;
    errorMessage: any;
    isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    allComapnies: MasterCompany[];
    private isSaving: boolean;
    modal: NgbModalRef;
    selectedColumn: Condition[];
    filteredBrands: any[];
    localCollection: any[] = [];
    Active: string = "Active";

    viewRowData: any;
    auditHistory: any;
    selectedRowforDelete: any;
    
    conditionData: any;
    conditionList: any;
    conditionHeaders = [
        
            { field: 'description', header: 'Condition Name' },
            { field: 'memo', header: 'Memo' },

        ];
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    @ViewChild('dt')
    private table: Table;
    selectedRecordForEdit: any;
    newCondition =
        {
            description: "",
            masterCompanyId: 1,
            isActive: true,
            isDelete: false,
            memo: ""
        };
    addNewCondition= {...this.newCondition};
    disableSaveForCondition: boolean;
    /** Currency ctor */
    constructor(public router: Router, private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private _fb: FormBuilder, private alertService: AlertService, private masterComapnyService: MasterComapnyService, private modalService: NgbModal, public conditionService: ConditionService, private dialog: MatDialog) {
         

    }
    ngOnInit(): void {
        this.selectedColumns = this.conditionHeaders;
        this.getConditionList();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-conditions';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }

       
    columnsChanges() {
        this.refreshList();
    }
    private getConditionList() {
        this.conditionService.getAllConditionList().subscribe(res => {
            const respData = res[0];
            this.conditionData = respData.columnData;
            this.totalRecords = respData.totalRecords;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        });
    }

    resetConditionForm() {
        this.isEditMode = false;
        this.disableSaveForCondition = false;
     
        this.selectedRecordForEdit = undefined;
        this.addNewCondition = { ...this.newCondition };
    }

    changeStatus(rowData) {
        console.log(rowData);
        const data = { ...rowData }
        this.conditionService.updateCondition(data).subscribe(() => {
            // this.getUOMList();
            this.alertService.showMessage(
                'Success',
                `Updated Status Successfully  `,
                MessageSeverity.success
            );
        })

    }
   
    filterConditions(event) {
        this.conditionList = this.conditionData;

        const CONDITIONData = [...this.conditionData.filter(x => {
            return x.description.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.conditionList = CONDITIONData;
    }

    checkConditionExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.conditionData, this.selectedRecordForEdit);
        if (exists.length > 0) {
            this.disableSaveForCondition = true;
        }
        else {
            this.disableSaveForCondition = false;
        }

    }
    selectedCondition(object) {
        const exists = selectedValueValidate('description', object, this.selectedRecordForEdit)

        this.disableSaveForCondition = !exists;
    }

   
    refreshList() {
        this.table.reset();
        this.getConditionList();
    }
   
    delete(rowData) {
        this.selectedRowforDelete = rowData;

    }
    deleteConformation(value) {
        if (value === 'Yes') {
            this.conditionService.deleteCondition(this.selectedRowforDelete.conditionId).subscribe(() => {
                this.getConditionList();
                this.alertService.showMessage(
                    'Success',
                    `Deleted Condition Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }
      
    viewSelectedRow(rowData) {
        console.log(rowData);
        this.viewRowData = rowData;
    }

    resetViewData() {
        this.viewRowData = undefined;
    }
    edit(rowData) {
        console.log(rowData);
        this.isEditMode = true;
        this.disableSaveForCondition = false;
        this.addNewCondition = { ...rowData, description: getObjectById('conditionId', rowData.conditionId, this.conditionData) };
        this.selectedRecordForEdit = { ...this.addNewCondition }
        console.log(this.addNewCondition);
    }

    saveCondition() {
         const data = {
            ...this.addNewCondition, createdBy: this.userName, updatedBy: this.userName,
            description: editValueAssignByCondition('description', this.addNewCondition.description)
        };
        if (!this.isEditMode) {
            this.conditionService.newAddCondition(data).subscribe(() => {
                this.resetConditionForm();
                this.getConditionList();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Condition Successfully`,
                    MessageSeverity.success
                );
            })
        } else {
            this.conditionService.updateCondition(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEditMode = false;
                this.resetConditionForm();
                this.getConditionList();
                this.alertService.showMessage(
                    'Success',
                    `Updated Condition Successfully`,
                    MessageSeverity.success
                );
            })
        }
    }
          

    openHelpText(content) {
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
   

    

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }


    getAuditHistoryById(rowData) {
        this.conditionService.getConditionAudit(rowData.conditionId).subscribe(res => {
            this.auditHistory = res;
        })
    }
    getColorCodeForHistory(i, field, value) {
        const data = this.auditHistory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }

    changePage(event: { first: any; rows: number }) {
        console.log(event);
        const pageIndex = (event.first / event.rows);
        // this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }

}
