import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { WorkPerformedService } from '../../services/workperformed.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {  Table } from 'primeng/table';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { validateRecordExistsOrNot, selectedValueValidate, editValueAssignByCondition, getObjectById, getObjectByValue } from '../../generic/autocomplete';
import { ConfigurationService } from '../../services/configuration.service';
@Component({
    selector: 'app-work-performed',
    templateUrl: './work-performed.component.html',
    styleUrls: ['./work-performed.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class WorkPerformedComponent implements OnInit {
    originalData: any;
    isEdit: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    headers = [
        { field: 'workPerformedCode', header: 'Work Performed Code' },
        { field: 'description', header: 'Work Performed Description' },
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
    disableSaveWorkperformed: boolean = false
    descriptionList: any;
    workPerformedCodeList: any;

    new = {
        workPerformedCode: "",
        description: "",
        masterCompanyId: 1,
        isActive: true,
        memo: "",
    }
    addNew = { ...this.new };
    selectedRecordForEdit: any;
    viewRowData: any;
    selectedRowforDelete: any;
    existingRecordsResponse = []
    constructor(private breadCrumb: SingleScreenBreadcrumbService,
        private authService: AuthService,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private _fb: FormBuilder,
        private alertService: AlertService,
        public workperformedService: WorkPerformedService, 
        private configurations: ConfigurationService,
        private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {

    }


    ngOnInit(): void {
        this.getList();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-work-performed';
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
        // const file = event.target.files;

        // console.log(file);
        // if (file.length > 0) {

        //     this.formData.append('file', file[0])
        //     this.unitofmeasureService.UOMFileUpload(this.formData).subscribe(res => {
        //         event.target.value = '';

        //         this.formData = new FormData();
        //         this.existingRecordsResponse = res;
        //         this.getList();
        //         this.alertService.showMessage(
        //             'Success',
        //             `Successfully Uploaded  `,
        //             MessageSeverity.success
        //         );

        //     })
        // }

    }
    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=WorkPerformed&fileName=workperformed.xlsx`;

        window.location.assign(url);
    }

    getList() {
        this.workperformedService.getWorkPerformedList().subscribe(res => {
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
        }
        else {
            this.disableSaveForDescription = false;
        }

    }
    filterDescription(event) {
        this.descriptionList = this.originalData;

        const descriptionData = [...this.originalData.filter(x => {
            return x.description.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.descriptionList = descriptionData;
    }
    selectedDescription(object) {
        const exists = selectedValueValidate('description', object, this.selectedRecordForEdit)

        this.disableSaveForDescription = !exists;
    }
    checkGroupworkPerformedExists(field,value){
        const existed = validateRecordExistsOrNot(field,value,this.originalData,this.selectedRecordForEdit);
        if (existed.length > 0) {
            this.disableSaveWorkperformed = true;
        }
        else {
            this.disableSaveWorkperformed = false;
        }
    }
    filterWorkperformed(event){
        this.workPerformedCodeList = this.originalData;

        const workPerformed = [...this.originalData.filter(x => {
            return x.workPerformedCode.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.workPerformedCodeList = workPerformed;
    }
    selectedWorkperformed(object){
        const existed = selectedValueValidate('workPerformedCode',object,this.selectedRecordForEdit)
        this.disableSaveWorkperformed = !existed;
    }
    save() {
        const data = {
            ...this.addNew, createdBy: this.userName, updatedBy: this.userName,
            workPerformedCode: editValueAssignByCondition('workPerformedCode', this.addNew.workPerformedCode), 
            description: editValueAssignByCondition('description',this.addNew.description)      
            
        };
        if (!this.isEdit) {
            this.workperformedService.newWorkPerformed(data).subscribe(() => {
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Work Performed Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.workperformedService.updateWorkPerformed(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Work Performed Successfully  `,
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


    edit(rowData) {
        console.log(rowData);
        this.isEdit = true;
        this.disableSaveGroupId = false;
        this.disableSaveForDescription = false;
        this.addNew = {
            ...rowData,           
            description: getObjectByValue('description', rowData.description, this.originalData),
            workPerformedCode: getObjectByValue('workPerformedCode',rowData.workPerformedCode,this.originalData),
        };
        this.selectedRecordForEdit = { ...this.addNew }

    }

    changeStatus(rowData) {
        console.log(rowData);
        const data = { ...rowData }
        this.workperformedService.updateWorkPerformed(data).subscribe(() => {
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
            this.workperformedService.deleteWorkPerformed(this.selectedRowforDelete.workPerformedId).subscribe(() => {
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Deleted Work Performed Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    getAuditHistoryById(rowData) {
        this.workperformedService.getWorkPerformedAudit(rowData.workPerformedId).subscribe(res => {
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