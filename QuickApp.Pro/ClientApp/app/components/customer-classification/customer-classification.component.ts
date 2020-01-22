import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';

import { CustomerClassificationService } from '../../services/CustomerClassification.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { CustomerClassification } from '../../models/customer-classification.model';
import * as $ from 'jquery';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort, MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { MasterCompany } from '../../models/mastercompany.model';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AuditHistory } from '../../models/audithistory.model';
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails } from '../../models/single-screen-audit-details.model';
import { selectedValueValidate, validateRecordExistsOrNot, editValueAssignByCondition } from '../../generic/autocomplete';
import { CommonService } from '../../services/common.service';
import { ConfigurationService } from '../../services/configuration.service';
@Component({
    selector: 'app-customer-classification',
    templateUrl: './customer-classification.component.html',
    styleUrls: ['./customer-classification.component.scss'],
    animations: [fadeInOut]
})
/** CustomerClassification component*/
export class CustomerClassificationComponent implements OnInit, AfterViewInit {
    viewRowData: any;
    customerClassification_Name: any = "";
    memo: string = "";
    isActive: boolean = true;
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    auditHisory: AuditHistory[];
    Active: string = "Active";
    /** CustomerClassification ctor */
    selectedActionName: any;
    disableSave: boolean;
    descritpion: string = "";
    selectedRecordForEditDesc: string = "";
    customerClassificationId: number =0;
    actionamecolle: any[] = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns = ['customerClassificationId', 'description', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<CustomerClassification>;
    allcustomerclassificationInfo: CustomerClassification[] = [];
    sourceAction: CustomerClassification = new CustomerClassification();
    loadingIndicator: boolean;
    actionForm: FormGroup;
    title: string = "Create";
    id: number;
    errorMessage: any;
    cols: any[];
    selectedColumns: any[];
    isEditMode: boolean = false;
    isDeleteMode: boolean = false;
    descmodified: boolean = false;
    allComapnies: MasterCompany[];
    private isSaving: boolean;
    modal: NgbModalRef;
    selectedColumn: CustomerClassification[];
    filteredBrands: any[];
    localClassificationsCollection: any[] = [];
    AuditDetails: SingleScreenAuditDetails[];
    auditHistory: any[] = [];
    pageSize: number = 20;
    totalPages: number;
    totalRecords: number;
    formData = new FormData()
    /** Currency ctor */
    constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private _fb: FormBuilder, private alertService: AlertService, private masterComapnyService: MasterComapnyService, private modalService: NgbModal, public CustomerClassificationService: CustomerClassificationService, private dialog: MatDialog, private commonService: CommonService, private configurations: ConfigurationService ) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();

    }
    ngOnInit(): void {
        this.loadData();
        this.cols = [
            //{ field: 'customerClassificationId', header: 'Customer Classification ID' },
            { field: 'description', header: 'Classification Name' },
            { field: 'memo', header: 'Memo' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
            //{ field: 'updatedDate', header: 'Updated Date' },
            //{ field: 'createdDate', header: 'Created Date' }
        ];
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-customer-classification';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        this.selectedColumns = this.cols;
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    private loadData() {
        // debugger;
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.CustomerClassificationService.getCustomerClassificationList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }
    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue;
    }

    private refresh() {
        // Causes the filter to refresh there by updating with recently added data.
        this.applyFilter(this.dataSource.filter);
    }
    private onDataLoadSuccessful(getCustomerClassificationList: CustomerClassification[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getCustomerClassificationList;
        this.allcustomerclassificationInfo = getCustomerClassificationList;
        this.totalRecords = getCustomerClassificationList.length;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
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

    openAddClassficationDialog() {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.disableSave = false;
        this.isSaving = true;
        this.sourceAction = new CustomerClassification();
        this.memo = "";
    }

    open(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;
        this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new CustomerClassification();
        this.memo = ""
        this.sourceAction.isActive = true;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceAction = row;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    private loadMasterCompanies() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.masterComapnyService.getMasterCompanies().subscribe(
            results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }
    openEdit(row) {
        this.descmodified = false;
        this.disableSave = false;
        this.isEditMode = true;
        this.isSaving = true;
        //this.loadMasterCompanies();
        this.sourceAction = row;
        this.memo = row.memo;
        this.descritpion = row.description;
        this.customerClassificationId = row.customerClassificationId;
        this.isActive = row.isActive;
        this.selectedRecordForEditDesc = row.description;

        //this.classificationName = this.sourceAction.description;
        //this.loadMasterCompanies();
        //this.modal = this.modalService.open(content, { size: 'sm' });
        //this.modal.result.then(() => {
        //    console.log('When user closes');
        //}, () => { console.log('Backdrop click') })

    }

    openHist(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.sourceAction = row;
        this.isSaving = true;
        this.CustomerClassificationService.historycustomerclass(this.sourceAction.customerClassificationId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));


    }
    openView(content, row) {
        this.sourceAction = row;
        this.customerClassification_Name = row.description;
        this.memo = row.memo;
        this.createdBy = row.createdBy;
        this.updatedBy = row.updatedBy;
        this.createdDate = row.createdDate;
        this.updatedDate = row.updatedDate;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openHelpText(content) {
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
   
    checkIfClassificationExists(value) {

        const exists = selectedValueValidate('description', value, this.selectedRecordForEditDesc)

        this.descmodified = true;
        for (let i = 0; i < this.allcustomerclassificationInfo.length; i++) {

            if (value == this.allcustomerclassificationInfo[i].description) {
                const exists = selectedValueValidate('description', value, this.selectedRecordForEditDesc)

                this.disableSave = !exists;

                return;
            }
            else {
                this.disableSave = false;
            }

        }

    }
    selectedClassification(event) {
      
        if (event.description !== this.selectedRecordForEditDesc) {
            const exists = selectedValueValidate('description', event, this.selectedRecordForEditDesc)
            this.disableSave = !exists;
        }
        else {
            this.disableSave = false;
        }
    }
    filterclassifications(event) {
        this.localClassificationsCollection = [];
              this.localClassificationsCollection = [...this.allcustomerclassificationInfo.filter(x => { return x.description.toLowerCase().includes(event.query.toLowerCase()); })];
    }
    private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.auditHisory = auditHistory;
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })

    }

    customExcelUpload(event) {
        const file = event.target.files;

        console.log(file);
        if (file.length > 0) {

            this.formData.append('ModuleName', 'CustomerClassification')
            this.formData.append('file', file[0])


            this.commonService.smartExcelFileUpload(this.formData).subscribe(res => {

                this.formData = new FormData();
                this.loadData();
                this.alertService.showMessage(
                    'Success',
                    `Successfully Uploaded  `,
                    MessageSeverity.success
                );

            })
        }

    }

    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=CustomerClassification&fileName=CustomerClassification.xlsx`;
        window.location.assign(url);
    }
    handleChange(rowData) {
         this.sourceAction = rowData;
          this.sourceAction.updatedBy = this.userName;
             this.CustomerClassificationService.updatecustomerclass(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
    
    }



    editItemAndCloseModel() {
        
      
        this.isSaving = true;
        const data = {
            ...this.sourceAction,
            createdBy: this.userName,
            updatedBy: this.userName,
            description: editValueAssignByCondition('description', this.sourceAction.description),
            memo: this.memo,
            masterCompanyId: 1,
            isActive: this.isActive
        };
        if (this.isEditMode == false) {
            data.description = this.sourceAction;
            this.CustomerClassificationService.newAddcustomerclass(data).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {
            if (this.descmodified == true) {
                data.description = this.sourceAction;
            }
            data.customerClassificationId = this.customerClassificationId;
            data.memo = this.memo;
            this.CustomerClassificationService.updatecustomerclass(data).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.CustomerClassificationService.deletecustomerclass(this.sourceAction.customerClassificationId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.sourceAction = new CustomerClassification();
        this.memo = "";
        this.modal.close();
    }
    viewSelectedRow(rowData) {
        console.log(rowData);
        this.viewRowData = rowData;
    }
    resetViewData() {
        this.viewRowData = undefined;
    }

    private saveCompleted(user?: CustomerClassification) {
        this.isSaving = false;
        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

        }
        this.sourceAction = new CustomerClassification();
        this.memo = "";
        this.loadData();
    }

    private saveSuccessHelper(role?: CustomerClassification) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);
        this.sourceAction = new CustomerClassification();
        this.memo = "";
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

    showAuditPopup(audit): void {
        this.auditClassification(audit.customerClassificationId);
        //this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditClassification(CustomerClassificationId: number): void {
        this.CustomerClassificationService.getCustomerclassification(CustomerClassificationId).subscribe(audits => {
            if (audits.length > 0) {
                if (audits[0].result.length > 0)
                    this.auditHistory = audits[0].result;
            }
        });
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