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
@Component({
    selector: 'app-conditions',
    templateUrl: './conditions.component.html',
    styleUrls: ['./conditions.component.scss'],
    animations: [fadeInOut]
})
/** Conditions component*/
export class ConditionsComponent implements OnInit, AfterViewInit {
    selectedActionName: any;
    disableSave: boolean;
    actionamecolle: any[]=[];
    condition_Name: any = "";
    description: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    AuditDetails: SingleScreenAuditDetails[];
    auditHisory: AuditHistory[];
    /** Conditions ctor */
   
    cols: any[];
    selectedColumns: any[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['conditionId', 'discription',  'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<Condition>;
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
    /** Currency ctor */
    constructor(public router: Router, private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private _fb: FormBuilder, private alertService: AlertService, private masterComapnyService: MasterComapnyService, private modalService: NgbModal, public conditionService: ConditionService, private dialog: MatDialog) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();

    }
    ngOnInit(): void {
        this.loadData();
        this.cols = [
            //{ field: 'conditionId', header: 'Condition ID' },
           
			{ field: 'description', header: 'Condition Name' },
			{ field: 'memo', header: 'Memo' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
           // { field: 'updatedDate', header: 'Updated Date' },
            //{ field: 'createdDate', header: 'Created Date' }
		];
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-conditions';
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

        this.conditionService.getConditionList().subscribe(
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
    private onDataLoadSuccessful(getConditionList: Condition[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getConditionList;

        this.allConditionInfo = getConditionList;
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


	open(content) {
		this.disableSave = false;
        this.isEditMode = false;
        this.isDeleteMode = false;

        this.isSaving = true;
        this.loadMasterCompanies();
		this.sourceAction = new Condition();
		this.sourceAction.isActive = true;
        this.description = "";

        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    openDelete(content, row) {
        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceAction = row;
        this.condition_Name = row.description;
        this.modal = this.modalService.open(content, { size: 'sm' });
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
    openEdit(content, row) {

		this.isEditMode = true;
		this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = row;
        this.description = this.sourceAction.description;
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
        this.isSaving = true;
        this.conditionService.historyCondition(this.sourceAction.conditionId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));


    }
    openView(content, row) {

        this.sourceAction = row;
        this.condition_Name = row.description;
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
    eventHandler(event) {
        let value = event.target.value.toLowerCase();
        if (this.selectedActionName) {
            if (value == this.selectedActionName.toLowerCase()) {
                //alert("Action Name already Exists");
                this.disableSave = true;
            }
            else {
                this.disableSave = false;
            }
        }
    }
    partnmId(event) {
        //debugger;
		for (let i = 0; i < this.allConditionInfo.length; i++) {
			if (event == this.allConditionInfo[i].description) {
                //alert("Action Name already Exists");
                this.disableSave = true;
                this.selectedActionName = event;
            }
        }
    }
    filterconditions(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allConditionInfo.length; i++) {
            let description = this.allConditionInfo[i].description;
            if (description.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.actionamecolle.push([{
                    "chargeId": this.allConditionInfo[i].conditionId,
                    "description": description
                }]),

                this.localCollection.push(description);
            }
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


    editItemAndCloseModel() {

        // debugger;

        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.description;
              this.sourceAction.masterCompanyId= 1;
            this.conditionService.newAddCondition(this.sourceAction).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.description;
              this.sourceAction.masterCompanyId= 1;
            this.conditionService.updateCondition(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.conditionService.deleteCondition(this.sourceAction.conditionId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
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

    showAuditPopup(template, id): void {
        this.auditCondition(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditCondition(conditionId: number): void {
        this.AuditDetails = [];
        this.conditionService.getConditionAudit(conditionId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["conditionAuditId", "conditionId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }

}
