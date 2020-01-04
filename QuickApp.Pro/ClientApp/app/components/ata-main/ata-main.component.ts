import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { AtaMainService } from '../../services/atamain.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { ATAMain } from '../../models/atamain.model';
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
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { ATAChapter } from '../../models/atachapter.model';
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { ConfigurationService } from '../../services/configuration.service';
import { validateRecordExistsOrNot, selectedValueValidate, editValueAssignByCondition, getObjectByValue } from '../../generic/autocomplete';

@Component({
    selector: 'app-ata-main',
    templateUrl: './ata-main.component.html',
    styleUrls: ['./ata-main.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class AtaMainComponent implements OnInit {

    originalData: any;
    isEdit: boolean = false;
    totalRecords: any;
    existingRecordsResponse: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    headers = [
        { field: 'ataChapterCode', header: 'ATA Chapter Code' },
        { field: 'ataChapterName', header: 'ATA Chapter Name' },
        { field: 'ataChapterCategory', header: 'ATA Chapter Category' },
        { field: 'memo', header: 'Memo' },
    ]
    selectedColumns = this.headers;
    formData = new FormData()
    @ViewChild('dt')

    private table: Table;
    auditHistory: any[] = [];
    disableSaveGroupId: boolean = false;
    PortalList: any;
    disableSaveForDescription: boolean = false;
    disableSaveForDescriptionMsg: boolean = false;
    descriptionList: any;

    new = {
        ataChapterCode: "",
        ataChapterName: "",
        ataChapterCategory: "",
        masterCompanyId: 1,
        isActive: true,
        memo: "",
    }
    addNew = { ...this.new };
    selectedRecordForEdit: any;
    viewRowData: any;
    selectedRowforDelete: any;
    constructor(private breadCrumb: SingleScreenBreadcrumbService,
        private authService: AuthService,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private _fb: FormBuilder,
        private alertService: AlertService,
        public atamainService: AtaMainService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private configurations: ConfigurationService) {

    }


    ngOnInit(): void {
        this.getList();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-ata-main';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);

    }



    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        this.table.reset();

        // this.table.sortOrder = 0;
        // this.table.sortField = '';

        this.getList();
    }

    customExcelUpload(event) {
         const file = event.target.files;

         console.log(file);
         if (file.length > 0) {

             this.formData.append('file', file[0])
             this.atamainService.ataChapterCustomUpload(this.formData).subscribe(res => {
                 event.target.value = '';
                 this.formData = new FormData();
                 this.existingRecordsResponse = res;
                 var result = this.existingRecordsResponse[0].uploadStatus;
                 if (result == "Duplicate") {
                    
                     this.alertService.showMessage(
                         'Success',
                         `Duplicaate Records found `,
                         MessageSeverity.success
                     );
                 }
                 if (result === "Success") {
                     this.alertService.showMessage(
                         'Success',
                         `Successfully imported `,
                         MessageSeverity.success
                     );
                 }   

                 if (result != "Duplicate" && result != "Success") {
                     this.alertService.showMessage(
                         'Failed',
                         result,
                         MessageSeverity.warn
                     );
                 }   
                 this.getList();  
             })
         }

    }
    sampleExcelDownload() {
         const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=ATAChapter&fileName=ATAChapter.xlsx`;

         window.location.assign(url);
    }

    getList() {
        this.atamainService.getAtaMainList().subscribe(res => {
            //console.log(res)
            const responseData = res[0];
            this.originalData = responseData;
            this.totalRecords = responseData.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        })
    }
    changePage(event: { first: any; rows: number }) {
        console.log(event);
        const pageIndex = (event.first / event.rows);

        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }


    checkGroupDescriptionExists(field, value) {
        console.log(this.selectedRecordForEdit);
        const exists = validateRecordExistsOrNot(field, value, this.originalData, this.selectedRecordForEdit);
        if (exists.length > 0) {
            this.disableSaveForDescription = true;
            this.disableSaveForDescriptionMsg = true;
        }
        else {
            this.disableSaveForDescription = false;
            this.disableSaveForDescriptionMsg = false;
        }

    }
    filterDescription(event) {
        this.descriptionList = this.originalData;

        const descriptionData = [...this.originalData.filter(x => {
            return x.ataChapterName.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.descriptionList = descriptionData;
    }
    selectedDescription(object) {
        const exists = selectedValueValidate('ataChapterName', object, this.selectedRecordForEdit);
        this.disableSaveForDescription = !exists;
        this.disableSaveForDescriptionMsg = !exists;
    }

    onBlur(event) {
        const value = event.target.value;
        this.disableSaveForDescriptionMsg = false;
        for (let i = 0; i < this.originalData.length; i++) {
            let ataChapterName = this.originalData[i].ataChapterName;
            let ataChapterId = this.originalData[i].ataChapterId;
            if (ataChapterName.toLowerCase() == value.toLowerCase()) {
                if (!this.isEdit || this.isEdit) {
                    this.disableSaveForDescription = true;
                    this.disableSaveForDescriptionMsg = true;
                }
                else if (ataChapterId != this.selectedRecordForEdit.ataChapterId) {
                    this.disableSaveForDescription = false;
                    this.disableSaveForDescriptionMsg = true;
                }
                else {
                    this.disableSaveForDescription = false;
                    this.disableSaveForDescriptionMsg = false;
                }
                console.log('ataChapterName :', ataChapterName);
                break;
            }
        }

    }

    save() {
        const data = {
            ...this.addNew, createdBy: this.userName, updatedBy: this.userName,
            ataChapterName: editValueAssignByCondition('ataChapterName', this.addNew.ataChapterName),
            ataChapterCategory: editValueAssignByCondition('ataChapterCategory', this.addNew.ataChapterCategory)
        };
        if (!this.isEdit) {
            this.atamainService.newATAMain(data).subscribe(() => {
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Added  New ATA Chapter Successfully`,
                    MessageSeverity.success
                );
            })
        } else {
            this.atamainService.updateATAMain(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Updated ATA Chapter Successfully`,
                    MessageSeverity.success
                );
            })
        }
    }

    resetForm() {
        this.isEdit = false;
        this.disableSaveForDescriptionMsg = false;
        this.selectedRecordForEdit = undefined;
        this.addNew = { ...this.new };
    }


    edit(rowData) {
        console.log(rowData);
        this.isEdit = true;
        this.disableSaveGroupId = true;
        this.disableSaveForDescription = true;
        this.disableSaveForDescriptionMsg = false;
        this.addNew = {
            ...rowData,
            ataChapterName: getObjectByValue('ataChapterName', rowData.ataChapterName, this.originalData),
        };
        this.selectedRecordForEdit = { ...this.addNew }

    }

    changeStatus(rowData) {
        console.log(rowData);
        const data = { ...rowData }
        this.atamainService.updateATAMain(data).subscribe(() => {

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
            this.atamainService.deleteATAMain(this.selectedRowforDelete.ataChapterId).subscribe(() => {
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Deleted ATA Chapter Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    getAuditHistoryById(rowData) {
        this.atamainService.historyATAMain(rowData.ataChapterId).subscribe(res => {
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