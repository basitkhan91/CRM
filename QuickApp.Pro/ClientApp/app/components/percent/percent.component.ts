
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';
import { PriorityService } from '../../services/priority.service';
import { Priority } from '../../models/priority.model';
import { AuditHistory } from '../../models/audithistory.model';
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";


import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";

import { CustomerService } from '../../services/customer.service';
import { PercentageService } from '../../services/percentage.service';
import { Table } from '../../../../node_modules/primeng/table';
import { validateRecordExistsOrNot, selectedValueValidate } from '../../generic/autocomplete';
import { PercentService } from '../../services/percent.service';

@Component({
    selector: 'app-percent',
    templateUrl: './percent.component.html',
    styleUrls: ['./percent.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class PercentComponent implements OnInit {
    
    originalData: any;
    isEdit: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    headers = [        
        { field: 'percentValue', header: 'Percent' },
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
    descriptionList: any;

    new = {
        percentValue: "",
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
        public percentService: PercentService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {

    }


    ngOnInit(): void {
        this.getList();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-percent';
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
        // const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=UnitOfMeasure&fileName=uom.xlsx`;

        // window.location.assign(url);
    }

    getList() {
        this.percentService.getPercentages().subscribe(res => {
            console.log(res)
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
            return x.percentValue.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.descriptionList = descriptionData;
    }
    selectedDescription(object) {
       const exists = selectedValueValidate('percentValue', object, this.selectedRecordForEdit)

      this.disableSaveForDescription = !exists;
    }

    save() {
        // const data = {
        //    // ...this.addNew, createdBy: this.userName, updatedBy: this.userName,
        //   //  ataChapterName: editValueAssignByCondition('ataChapterName', this.addNew.ataChapterName),
        //    // ataChapterCategory: editValueAssignByCondition('ataChapterCategory', this.addNew.ataChapterCategory)
        // };
        // if (!this.isEdit) {
        //     this.atamainService.newATAMain(data).subscribe(() => {
        //         this.resetForm();
        //         this.getList();
        //         this.alertService.showMessage(
        //             'Success',
        //             `Added  New Percent Successfully`,
        //             MessageSeverity.success
        //         );
        //     })
        // } else {
        //     this.atamainService.updateATAMain(data).subscribe(() => {
        //         this.selectedRecordForEdit = undefined;
        //         this.isEdit = false;
        //         this.resetForm();
        //         this.getList();
        //         this.alertService.showMessage(
        //             'Success',
        //             `Updated Percent Successfully`,
        //             MessageSeverity.success
        //         );
        //     })
        // }
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
         //   ataChapterName: getObjectByValue('ataChapterName', rowData.ataChapterName, this.originalData),
        };
        this.selectedRecordForEdit = { ...this.addNew }

    }

    changeStatus(rowData) {
        console.log(rowData);
        const data = { ...rowData }
        // this.atamainService.updateATAMain(data).subscribe(() => {

        //     this.alertService.showMessage(
        //         'Success',
        //         `Updated Status Successfully  `,
        //         MessageSeverity.success
        //     );
        // })

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
            // this.atamainService.deleteATAMain(this.selectedRowforDelete.ataChapterId).subscribe(() => {
            //     this.getList();
            //     this.alertService.showMessage(
            //         'Success',
            //         `Deleted Percent Successfully  `,
            //         MessageSeverity.success
            //     );
            // })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    getAuditHistoryById(rowData) {
        // this.atamainService.getAtaChapterAudit(rowData.ataChapterId).subscribe(res => {
        //     this.auditHistory = res;
        // })
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