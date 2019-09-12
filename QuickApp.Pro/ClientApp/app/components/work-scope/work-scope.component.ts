import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { WorkScopeService } from '../../services/workscope.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { WorkScope } from '../../models/workscope.model';
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
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails } from '../../models/single-screen-audit-details.model';


@Component({
    selector: 'app-work-scope',
    templateUrl: './work-scope.component.html',
    styleUrls: ['./work-scope.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class WorkScopeComponent implements OnInit, AfterViewInit {

    allcolletion: any[] = [];
    disableSave: boolean = false;
    selectedworkscope: any;
    workScope_Name: any = "";
    description: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    isSaving: boolean;
    ngOnInit(): void {
        this.loadData();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-work-scope';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    Active: string = "Active";
    displayedColumns = ['workscopeId', 'workscopecode', 'description', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<WorkScope>;
    allWorkScopeinfo: WorkScope[] = [];
    sourceAction: WorkScope;
    allComapnies: MasterCompany[] = [];
    public auditHisory: AuditHistory[] = [];

    loadingIndicator: boolean;
    actionForm: FormGroup;
    title: string = "Create";
    id: number;
    errorMessage: any;
    cols: any[];
    selectedColumns: any[];
    modal: NgbModalRef;
    selectedColumn: WorkScope[];
    workScopeName: string;
    filteredBrands: any[];
    localCollection: any[] = [];
    AuditDetails: SingleScreenAuditDetails[];


    /** Actions ctor */

    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;

    constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workscopeService: WorkScopeService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.sourceAction = new WorkScope();

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    public allWorkFlows: WorkScope[] = [];

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workscopeService.getWorkScopeList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.cols = [
            //{ field: 'workscopeId', header: 'WorkScope Id' },
            { field: 'workScopeCode', header: 'Work Scope Code' },
            { field: 'description', header: 'Work Scope Description' },
            { field: 'memo', header: 'Memo' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
            //{ field: 'updatedDate', header: 'Updated Date' },
            // { field: 'createdDate', header: 'Created Date' }
        ];
        this.selectedColumns = this.cols;
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
    private onDataLoadSuccessful(getWorkScopeList: WorkScope[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getWorkScopeList;
        this.allWorkScopeinfo = getWorkScopeList;
    }

    private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {

        // debugger;
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.auditHisory = auditHistory;
        this.modal = this.modalService.open(content, { size: 'lg' });
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
        this.disableSave = false;
        this.loadMasterCompanies();
        this.sourceAction = new WorkScope();
        this.sourceAction.isActive = true;
        this.workScopeName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceAction = row;
        this.workScope_Name = row.workScopeCode;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openEdit(content, row) {
        this.disableSave = false;
        this.isEditMode = true;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = row;
        this.workScopeName = this.sourceAction.workScopeCode;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openHist(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.sourceAction = row;
        //this.isSaving = true;
        // debugger;
        this.workscopeService.historyWorkScope(this.sourceAction.workScopeId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));
    }


    eventHandler(event) {

        let value = event.target.value.toLowerCase()
        if (this.selectedworkscope) {
            if (value == this.selectedworkscope.toLowerCase()) {

                this.disableSave = true;
            }
            else {

                this.disableSave = false;
            }
        }
    }

    partnmId(event) {

        for (let i = 0; i < this.allcolletion.length; i++) {
            if (event == this.allcolletion[i][0].workScopeName) {

                this.disableSave = true;
                this.selectedworkscope = event;
            }

        }

    }

    filterWorkscopes(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allWorkScopeinfo.length; i++) {
            let workScopeName = this.allWorkScopeinfo[i].workScopeCode;
            if (workScopeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {

                this.allcolletion.push([{
                    "workScopeId": this.allWorkScopeinfo[i].workScopeId,
                    "workScopeName": workScopeName
                }]),
                    this.localCollection.push(workScopeName);
            }
        }
    }
    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceAction.isActive == false;
            this.workscopeService.updateWorkScope(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive == true;
            this.workscopeService.updateWorkScope(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

    }
    openView(content, row) {

        this.sourceAction = row;
        this.workScope_Name = row.workScopeCode;
        this.description = row.description;
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


    editItemAndCloseModel() {

        // debugger;
        this.isSaving = true;
        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.workScopeCode = this.workScopeName;
            this.sourceAction.masterCompanyId = 1;
            this.workscopeService.newWorkScope(this.sourceAction).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.workScopeCode = this.workScopeName;
            this.sourceAction.masterCompanyId = 1;
            this.workscopeService.updateWorkScope(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }
        this.modal.close();
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.workscopeService.deleteWorkScope(this.sourceAction.workScopeId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    private saveCompleted(user?: WorkScope) {
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

    private saveSuccessHelper(role?: WorkScope) {
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
        debugger;
        this.getWorkScopeAuditDetails(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    getWorkScopeAuditDetails(Id: number): void {
        this.workscopeService.getWorkScopeAuditDetails(Id).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["workScopeAuditId", "workScopeId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }
}