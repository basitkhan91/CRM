﻿import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { TaxTypeService } from '../../services/taxtype.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { TaxType } from '../../models/taxtype.model';
import { AuditHistory } from '../../models/audithistory.model';
import { AuthService } from '../../services/auth.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';

import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuItem, LazyLoadEvent } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails } from '../../models/single-screen-audit-details.model';
import { validateRecordExistsOrNot, selectedValueValidate, editValueAssignByCondition, getObjectByValue, getObjectById } from '../../generic/autocomplete';
import { ConfigurationService } from '../../services/configuration.service';
import { ModeOfOperation } from "../../models/ModeOfOperation.enum";

@Component({
    selector: 'app-tax-type',
    templateUrl: './tax-type.component.html',
    styleUrls: ['./tax-type.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class TaxTypeComponent implements OnInit {
   

    originalData: any;
    isEdit: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    currentModeOfOperation: ModeOfOperation;
    headers = [
        { field: 'description', header: 'Certification Type' },
        { field: 'memo', header: 'Memo' },
    ]
    selectedColumns = this.headers;
    formData = new FormData()
    @ViewChild('dt')

    private table: Table;
    auditHistory: any[] = [];
    disableSaveTaxtype: boolean = false;
    taxTypeList: any;


    new = {
        description: "",
        masterCompanyId: 1,
        isActive: true,
        memo: "",
    }
    addNew = { ...this.new };
    selectedRecordForEdit: any;
    viewRowData: any;
    disableSaveTaxtypeMsg:boolean;
    selectedRowforDelete: any;
    existingRecordsResponse: Object;
   // existingRecordsResponse = []

    constructor(private breadCrumb: SingleScreenBreadcrumbService,
        private authService: AuthService,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private _fb: FormBuilder,
        private alertService: AlertService,
        public taxTypeService: TaxTypeService,
        private dialog: MatDialog,
        private configurations: ConfigurationService,
        private masterComapnyService: MasterComapnyService) {


    }



    ngOnInit(): void {
        this.getList();
            this.breadCrumb.currentUrl = '/singlepages/singlepages/app-tax-type';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        // this.selectedColumns = this.cols;
    }



    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        this.table.reset();

     
        this.getList();
    }

    customExcelUpload(event) {
         const file = event.target.files;

         console.log(file);
         if (file.length > 0) {

             this.formData.append('file', file[0])
             this.taxTypeService.taxtypeCustomUpload(this.formData).subscribe(res => {
                 event.target.value = '';

                 this.formData = new FormData();
                 this.existingRecordsResponse = res;

                // alert(JSON.stringify(this.existingRecordsResponse));
                 this.getList();
                 this.alertService.showMessage(
                     'Success',
                     `Successfully Uploaded  `,
                     MessageSeverity.success
                 );
             })
        };
    };
    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=TaxType&fileName=taxType.xlsx`;
        window.location.assign(url);
    }

    getList() {
        this.taxTypeService.getWorkFlows().subscribe(res => {
            const responseData = res[0];
            // this.uomHeaders = responseData.columHeaders;
            // this.selectedColumns = responseData.columHeaders;
            this.originalData = responseData;
            this.totalRecords = responseData.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        })
    }
    changePage(event: { first: any; rows: number }) {
        console.log(event);
        // this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }


    checkTaxTypeExists(field, value) {
        console.log('this.selectedRecordForEdit', this.selectedRecordForEdit);
        const exists = validateRecordExistsOrNot(field, value, this.originalData, this.selectedRecordForEdit);
        console.log(exists);
        if (exists.length > 0) {
            this.disableSaveTaxtype = true;
            this.disableSaveTaxtypeMsg = true;
        }
        else {
            this.disableSaveTaxtype = false;
            this.disableSaveTaxtypeMsg = false;
        }

    }
    filterTaxType(event) {
        this.taxTypeList = this.originalData;

        const certificationData = [...this.originalData.filter(x => {
            return x.description.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.taxTypeList = certificationData;
    }
    selectedTaxType(object) {
        console.log('selectedTaxType', object);
        const exists = selectedValueValidate('description', object, this.selectedRecordForEdit)
        if (!this.isEdit || this.isEdit && object.taxTypeId != this.selectedRecordForEdit.taxTypeId) {
            this.disableSaveTaxtype = !exists;
        }
        else {
            this.disableSaveTaxtype = false;
       }
        
    }



    save() {
        const data = {
            ...this.addNew, createdBy: this.userName, updatedBy: this.userName,
            description: editValueAssignByCondition('description', this.addNew.description),
                  };

        if (!this.isEdit) {
            this.taxTypeService.newAction(data).subscribe(() => {
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Added Tax Type  Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.taxTypeService.updateAction(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Updated Tax Type Successfully  `,
                    MessageSeverity.success
                );
            })
        }
    }

    resetForm() {
        this.isEdit = false;
        this.selectedRecordForEdit = undefined;

        this.addNew = { ...this.new };
    }
    getChange() {
        if (this.disableSaveTaxtypeMsg == false) {
            this.disableSaveTaxtype = false;
        }
    }
    edit(rowData) {
        console.log(rowData);
        this.isEdit = true;
        this.disableSaveTaxtype = true;
        this.disableSaveTaxtypeMsg = false;



        this.addNew = {
            ...rowData,
            description: getObjectById('taxTypeId', rowData.taxTypeId, this.originalData),
        };


        this.selectedRecordForEdit = { ...this.addNew }

    }

    changeStatus(rowData) {
        console.log(rowData);
        const data = { ...rowData }
        this.taxTypeService.updateAction(data).subscribe(() => {
            // this.getUOMList();
            this.alertService.showMessage(
                'Success',
                `Updated Status Successfully  `,
                MessageSeverity.success
            );
        })

    }
    viewSelectedRow(rowData) {
        console.log(rowData);
        this.viewRowData = rowData;
    }
    resetViewData() {
        this.viewRowData = undefined;
    }
    delete(rowData) {
        this.selectedRowforDelete = rowData;

    }
    deleteConformation(value) {
        if (value === 'Yes') {
            this.taxTypeService.deleteAcion(this.selectedRowforDelete.taxTypeId).subscribe(() => {
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Deleted  Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    //Open the audit history modal.
    showHistory(rowData): void {
              this.taxTypeService.getTaxTypeAudit(rowData.taxTypeId).subscribe(res => {
            this.auditHistory = res;
        })
    }

    onBlur(event) {
        const value = event.target.value;
        this.disableSaveTaxtypeMsg = false;
        for (let i = 0; i < this.originalData.length; i++) {
            let description = this.originalData[i].description;
            let taxTypeId = this.originalData[i].taxTypeId;
            if (description.toLowerCase() == value.toLowerCase()) {
                if (!this.isEdit || this.isEdit) {
                    this.disableSaveTaxtype = true;
                    this.disableSaveTaxtypeMsg = true;
                }
                else if (taxTypeId != this.selectedRecordForEdit.taxTypeId) {
                    this.disableSaveTaxtype = false;
                    this.disableSaveTaxtypeMsg = true;
                }
                else {
                    this.disableSaveTaxtype = false;
                    this.disableSaveTaxtypeMsg = false;
                }
                console.log('description :', description);
                break;
            }
        }

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
