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
    /** Conditions ctor */

    cols: any[];
    selectedColumns: any[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

 
    allConditionInfo: Condition[] = [];
    sourceAction: Condition;
    loadingIndicator: boolean;
    actionForm: FormGroup;
    title: string = "Create";
    id: number;
    errorMessage: any;
    private isEditMode: boolean = false;
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



    private loadData() {
        // debugger;
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.conditionService.getConditionList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

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

    public applyFilter(filterValue: string) {
       // this.dataSource.filter = filterValue;
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

    private onDataLoadSuccessful(getConditionList: Condition[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = getConditionList;

        this.allConditionInfo = getConditionList;
        this.totalRecords = this.allConditionInfo.length;
    }
    refreshList() {
       // this.table.reset();
        this.getConditionList();
    }
    private onDataLoadFailed(error: any) {
        // alert(error);
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

    }
    private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allComapnies = allComapnies;

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

    private loadMasterCompanies() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.masterComapnyService.getMasterCompanies().subscribe(
            results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }
    openHist(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.sourceAction = row;
        this.isSaving = true;
        this.conditionService.historyCondition(this.sourceAction.conditionId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));


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
   
    filterconditions(event) {
        this.localCollection = this.allConditionInfo;
        if (event.query !== undefined && event.query !== null) {
            const conditionName = [...this.allConditionInfo.filter(x => {
                return x.description.toLowerCase().includes(event.query.toLowerCase())
            })]
            this.localCollection = conditionName;
        }
    }
    private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.auditHisory = auditHistory;
        this.modal = this.modalService.open(content, { size: 'lg' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })


    }
    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceAction.isActive == false;
            this.conditionService.updateCondition(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive == true;
            this.conditionService.updateCondition(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
    }

    private saveCompleted(user?: Condition) {
        this.isSaving = false;

        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

        }

        this.loadData();
    }

    private saveSuccessHelper(role?: Condition) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

        this.loadData();

    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
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
  

}
