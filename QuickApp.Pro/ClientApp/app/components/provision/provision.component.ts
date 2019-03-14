import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { ProvisionService } from '../../services/provision.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { Provision } from '../../models/provision.model';
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

@Component({
    selector: 'app-provision',
    templateUrl: './provision.component.html',
    styleUrls: ['./provision.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class ProvisionComponent implements OnInit, AfterViewInit {
    allprovisin: any[]=[];
    selectedreason: any;
    provision_Name: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    disableSave: boolean = false;
    isSaving: boolean;
    ngOnInit(): void {
		this.loadData();
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-provision';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }
    Active: string = "Active";
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns = ['provisionId', 'description','createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<Provision>;
    allProvisonInfo: Provision[] = [];
    allComapnies: MasterCompany[] = [];
    public auditHisory: AuditHistory[] = [];
    sourceAction: Provision;
    loadingIndicator: boolean;
    actionForm: FormGroup;
    title: string = "Create";
    id: number;
    errorMessage: any;
    cols: any[];
    selectedColumns: any[];
    modal: NgbModalRef;
    selectedColumn: Provision[];

    provisionName: string;
    filteredBrands: any[];
    localCollection: any[] = [];

    /** Actions ctor */

    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;

	constructor(private breadCrumb: SingleScreenBreadcrumbService,private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public provisionService: ProvisionService,  private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.sourceAction = new Provision();

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    public allWorkFlows: Provision[] = [];

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.provisionService.getProvisionList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.cols = [
            //{ field: 'provisionId', header: 'Provison Id' },
            { field: 'description', header: 'Provision Name' },
            { field: 'memo', header: 'Memo' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
           // { field: 'updatedDate', header: 'Updated Date' },
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
    private onDataLoadSuccessful(getProvisionList: Provision[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getProvisionList;
        this.allProvisonInfo = getProvisionList;
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
    openView(content, row) {

        this.sourceAction = row;
        this.provision_Name = row.description;   
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

    open(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;
		this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
		this.sourceAction = new Provision();
        this.sourceAction.isActive = true;

        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceAction = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openEdit(content, row) {

        this.isEditMode = true;

        this.isSaving = true;
        this.loadMasterCompanies();
		this.disableSave = false;


        this.sourceAction = row;
        this.provisionName = this.sourceAction.description;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    eventHandler(event) {
        let value = event.target.value.toLowerCase()
        if (this.selectedreason) {
            if (value == this.selectedreason.toLowerCase()) {
                this.disableSave = true;
            }
            else {
                this.disableSave = false;
            }
        }
    }




    provisionId(event) {
        for (let i = 0; i < this.allprovisin.length; i++) {
            if (event == this.allprovisin[i][0].provisionName) {

                this.disableSave = true;
                this.selectedreason = event;
            }




        }
    }

    filterprovisions(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allProvisonInfo.length; i++) {
            let provisionName = this.allProvisonInfo[i].description;
            if (provisionName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.allprovisin.push([{
                    "provisionId": this.allProvisonInfo[i].provisionId,
                    "provisionName": provisionName
                }]),
                this.localCollection.push(provisionName);
            }
        }
    }

    openHist(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;


        this.sourceAction = row;



        //this.isSaving = true;
        // debugger;
        this.provisionService.historyProvision(this.sourceAction.provisionId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));


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

    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceAction.isActive == false;
            this.provisionService.updateProvision(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive == true;
            this.provisionService.updateProvision(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

    }

   
    editItemAndCloseModel() {

        // debugger;

        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.provisionName;
            this.sourceAction.masterCompanyId = 1;
            this.provisionService.newProvision(this.sourceAction).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.provisionName;
            this.sourceAction.masterCompanyId = 1;
            this.provisionService.updateProvision(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.provisionService.deleteProvision(this.sourceAction.provisionId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    private saveCompleted(user?: Provision) {
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

    private saveSuccessHelper(role?: Provision) {
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
}