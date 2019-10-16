import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { AuditHistory } from '../../models/audithistory.model';
import { AuthService } from '../../services/auth.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { JobType } from '../../models/jobtype.model';
import { JobTypeService } from '../../services/job-type.service';
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { getObjectByValue } from '../../generic/autocomplete';

import { LocalStoreManager } from '../../services/local-store-manager.service';
//import { EmployeeAddService } from '../../../services/employee.Add.Service';
import { DBkeys } from '../../services/db-Keys';

import { User } from '../../models/user.model';
@Component({
    selector: 'app-job-type',
    templateUrl: './job-type.component.html',
    styleUrls: ['./job-type.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class JobTypeComponent implements OnInit, AfterViewInit {
    allreasn: any[] = [];
    selectedreason: any;
    job_Name: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    disableSave: boolean = false;
    totalRecords: number;
    totalPages: number;
    rows: number;
    AuditDetails: SingleScreenAuditDetails[];
    ngOnInit(): void {
        this.cols = [
            //{ field: 'jobTitleId', header: 'Job Title Id' },
            { field: 'jobType', header: 'Job Type' },
            { field: 'description', header: 'Description' },
            // { field: 'createdBy', header: 'Created By' },
            // { field: 'updatedBy', header: 'Updated By' },
            //{ field: 'updatedDate', header: 'Updated Date' },
            //{ field: 'createdDate', header: 'createdDate' }
        ];
        this.selectedColumns = this.cols;
        this.loadData();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-job-title';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    Active: string = "Active";
    displayedColumns = ['jobTitleId', 'companyName', 'description', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<JobType>;
    allJobTitlesinfo: JobType[] = [];
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    public sourceAction: any;
    public auditHisory: AuditHistory[] = [];
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    selectedColumns: any[];
    cols: any[];
    title: string = "Create";
    id: number;
    errorMessage: any;
    modal: NgbModalRef;
    selectedColumn: JobType[];
    jobName: any;
    filteredBrands: any[];
    localCollection: any[] = [];
    isDelete: boolean = false;
    public jobTypeName: any;
    public jobTypeDescription: any;
    /** Actions ctor */

    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    public userA: any;
    public jobTypeIdEdit: any;
    public jobTypeNameEdit: any;
    public jobTypeDescriptionEdit: any;
    public isActiveEdit: any;
    public jobTypeIdDelete: any;
    

    constructor(private localStorage: LocalStoreManager,private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: JobTypeService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.sourceAction = new JobType();


        let user = this.localStorage.getDataObject<User>(DBkeys.CURRENT_USER);

        console.log("user:" + user.userName)

        this.userA = user.userName;

    }
    validateRecordExistsOrNot(field: string, currentInput: any, originalData: any) {
        console.log(field, currentInput, originalData)
        if ((field !== '' || field !== undefined) && (currentInput !== '' || currentInput !== undefined) && (originalData !== undefined)) {
            const data = originalData.filter(x => {
                return x[field].toLowerCase() === currentInput.toLowerCase()
            })
            return data;
        }
    }

    editJobType(obj: any) {

        this.jobTypeIdEdit = obj.jobTypeId;

        this.jobTypeNameEdit = obj.jobTypeName;
        this.jobTypeDescriptionEdit = obj.jobTypeDescription;
        this.isActiveEdit = obj.isActive;


        console.log(obj);

        console.log(obj);

    }
    deleteJobType(obj: any) {
        console.log("Delete job")

        this.jobTypeIdDelete = obj.jobTypeId;

        this.workFlowtService.deleteAcion(this.jobTypeIdDelete).subscribe(data => {
            this.loadData()
            var showTitle = 'job Type Deleted Successfully';
            //    this.loadjobtypesData();

            ///this.sourceEmployee.reset();
            this.alertService.showMessage("Success", showTitle, MessageSeverity.success);
        })

       

    }
    editValueAssignByCondition(field: any, value: any) {
        console.log(field, value)
        if ((value !== undefined) && (field !== '' || field !== undefined)) {

            if (typeof (value) === 'string') {
                return value
            }
            else {
                return this.getValueFromObjectByKey(field, value)
            }
        }
    }
    getValueFromObjectByKey(field: string, object: any) {
        console.log(field, object)
        if ((field !== '' || field !== undefined) && (object !== undefined)) {
            return object[field];
        }
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    public allWorkFlows: JobType[] = [];

    private loadData() {
        console.log("hxty")
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getjobTypeWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );


    }

    private loadMasterCompanies() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.masterComapnyService.getMasterCompanies().subscribe(
            results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
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
    private onDataLoadSuccessful(allWorkFlows: JobType[]) {
        console.log("Work Flows");
        console.log(allWorkFlows);
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        console.log(this.dataSource.data);
        this.allJobTitlesinfo = allWorkFlows;
        this.totalRecords = this.allJobTitlesinfo.length;
        this.totalPages = Math.ceil(this.totalRecords / this.rows);
        console.log(this.totalPages);

    }

    updateJobType() {

        console.log(this.jobTypeIdEdit);
        console.log(this.jobTypeNameEdit);
        console.log(this.jobTypeDescriptionEdit);
        console.log(this.isActiveEdit)

        this.sourceAction.updatedBy = this.userA;
        this.sourceAction.jobTypeName = this.jobTypeNameEdit;
        this.sourceAction.jobTypeDescription = this.jobTypeDescriptionEdit;
        this.sourceAction.isActive = this.isActiveEdit;
        this.sourceAction.jobTypeId = this.jobTypeIdEdit;
        console.log("source")

        console.log(this.sourceAction);

        this.workFlowtService.updateAction(this.sourceAction).subscribe(data => {
            this.loadData()
            var showTitle = 'job Type Updated Sucessfully';
            //    this.loadjobtypesData();

            ///this.sourceEmployee.reset();
            this.alertService.showMessage("Success", showTitle, MessageSeverity.success);
        })

       



    }

    saveJobType() {

        console.log(this.jobTypeName);
    


        if (this.jobTypeName) {

            this.sourceAction.createdBy = this.userA;
            this.sourceAction.updatedBy = this.userA;
            this.sourceAction.jobTypeName = this.jobTypeName;
            this.sourceAction.jobTypeDescription = this.jobTypeDescription;

            console.log(this.sourceAction);
            this.sourceAction.description = this.jobName;

            this.workFlowtService.addjobPoint(this.sourceAction).subscribe(data => {
                this.loadData()
           var showTitle = 'job Type Added Sucessfully';
            //    this.loadjobtypesData();

                ///this.sourceEmployee.reset();
                this.alertService.showMessage("Success", showTitle, MessageSeverity.success);
            })
            console.log(this.jobTypeName);
            console.log(this.jobTypeDescription)

        }
        else {
            var showTitle = 'Job Type Title Required';
            this.alertService.showMessage("Failure", showTitle, MessageSeverity.error);
        }

        // if (this.jobTypeName == null || this.jobTypeName == undefined) {


        // }
        //else {

        //  }




    }
    openHist(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.sourceAction = row;
        //this.isSaving = true;
        // debugger;
      
    }
    private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
        // alert('success');

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.auditHisory = auditHistory; this.modal = this.modalService.open(content, { size: 'lg' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })

    }

    private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allComapnies = allComapnies;
    }

    private onDataLoadFailed(error: any) {
        // alert(error);
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
    }

    open(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new JobType();
        this.disableSave = false;
        this.sourceAction.isActive = true;
        this.sourceAction.jobName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    openDelete(content, row) {
        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceAction = row;
        this.job_Name = row.description;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openEdit(content, row) {
        this.isEditMode = true;
        this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = { ...row };
        this.sourceAction.jobName = getObjectByValue('description', row.description, this.allJobTitlesinfo)
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openView(content, row) {
        this.sourceAction = row;
        this.job_Name = row.description;
        this.memo = row.memo;
        this.createdBy = row.createdBy;
        this.updatedBy = row.updatedBy;
        this.createdDate = row.createdDate;
        this.updatedDate = row.updatedDate;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openHelpText(content) {
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    eventHandler(field, value) {
        value = value.trim();
        const exists = this.validateRecordExistsOrNot(field, value, this.allJobTitlesinfo);
        // console.log(exists);
        if (exists.length > 0) {
            this.disableSave = true;
        }
        else {
            this.disableSave = false;
        }
    }

    jobTitleId(event) {
        this.disableSave = true;
    }




    editItemAndCloseModel() {

  
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
     
        this.modal.close();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    private saveCompleted(user?: JobType) {
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

    private saveSuccessHelper(role?: JobType) {
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

    showAuditPopup(template, id): void {
        this.auditJobTitle(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditJobTitle(jobTitleId: number): void {
        this.AuditDetails = [];
      
    }
}