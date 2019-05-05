import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CreditTermsService } from '../../services/Credit Terms.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { CreditTerms } from '../../models/credit-terms.model';
import * as $ from 'jquery';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort, MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { MasterCompany } from '../../models/mastercompany.model';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AuditHistory } from '../../models/audithistory.model';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";

@Component({
    selector: 'app-credit-terms',
    templateUrl: './credit-terms.component.html',
    styleUrls: ['./credit-terms.component.scss'],
    animations: [fadeInOut]
})
/** CreditTerms component*/
export class CreditTermsComponent implements OnInit, AfterViewInit
{
    selectedActionName: any;
    disableSave: boolean;
    actionamecolle: any[] = [];
    creditTerm_Name: any = "";
    percentage: any = "";
    days: any = "";
    netDays: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    auditHisory: AuditHistory[];
    Active: string = "Active";
    AuditDetails: SingleScreenAuditDetails[];
    /** CreditTerms ctor */
   
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

displayedColumns = ['creditTermsId', 'name', 'percentage', 'days', 'netDays', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
dataSource: MatTableDataSource<CreditTerms>;
allcreditTermInfo: any[] = [];
sourceAction: CreditTerms;
loadingIndicator: boolean;
 allComapnies: MasterCompany[];
actionForm: FormGroup;
title: string = "Create";
id: number;
errorMessage: any;
cols: any[];
 selectedColumns: any[];
 selectedColumn: CreditTerms[];
 private isEditMode: boolean = false;
 private isDeleteMode: boolean = false;
 private isSaving: boolean;
 creditTermName: string;
filteredBrands: any[];
localCollection: any[] = [];
 modal: NgbModalRef;
	constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService:AuthService,private _fb: FormBuilder, private alertService: AlertService, private masterComapnyService:MasterComapnyService, private modalService: NgbModal,public CreditTermsService: CreditTermsService, private dialog: MatDialog) {
    this.displayedColumns.push('action');
    this.dataSource = new MatTableDataSource();

    }
	ngOnInit(): void {
		this.loadData();
       
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-credit-terms';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
       
        
    }

ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}

    private loadData() {
    // debugger;
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    this.CreditTermsService.getCreditTermsList().subscribe(
        results => this.onDataLoadSuccessful(results[0]),
        error => this.onDataLoadFailed(error)
		);
		this.cols = [
			//{ field: 'creditTermsId', header: 'CreditTerm ID' },
			{ field: 'name', header: ' Credit Terms Name' },
			{ field: 'percentage', header: 'Percentage' },
			{ field: 'days', header: 'Days' },
			{ field: 'netDays', header: 'Net Days' },
			{ field: 'memo', header: 'Memo' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' },
			//{ field: 'updatedDate', header: 'Updated Date' },
			//{ field: 'createdDate', header: 'Created Date' }
		];
		this.selectedColumns = this.cols;
}
    public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
}

    private refresh() {
    // Causes the filter to refresh there by updating with recently added data.
    this.applyFilter(this.dataSource.filter);
}
    private onDataLoadSuccessful(getCreditTermsList: any[]) {
    // alert('success');
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    this.dataSource.data = getCreditTermsList;
	this.allcreditTermInfo = getCreditTermsList;
	console.log(this.allcreditTermInfo);
}

    private onDataLoadFailed(error: any){
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

        this.isEditMode = false;
        this.isDeleteMode = false;
		this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new CreditTerms();
        this.sourceAction.isActive = true;
        this.creditTermName = "";
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
    private loadMasterCompanies() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.masterComapnyService.getMasterCompanies().subscribe(
            results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }
    openEdit(content, row) {
		this.disableSave = false;
        this.isEditMode = true;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = row;
        this.creditTermName = this.sourceAction.name;
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
        this.CreditTermsService.historycreditterms(this.sourceAction.creditTermsId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));


    }
    openView(content, row) {

        this.sourceAction = row;
        this.creditTerm_Name = row.name;
        this.percentage = row.percentage;
        this.days = row.days;
        this.netDays = row.netDays;
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
        for (let i = 0; i < this.actionamecolle.length; i++) {
            if (event == this.actionamecolle[i][0].creditTermName) {
                //alert("Action Name already Exists");
                this.disableSave = true;
                this.selectedActionName = event;
            }
        }
    }
    filtercreditTerms(event) {
        this.localCollection = [];
        for (let i = 0; i < this.allcreditTermInfo.length; i++) {
            let creditTermName  = this.allcreditTermInfo[i].name;
            if (creditTermName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.actionamecolle.push([{
                    "creditTermsId": this.allcreditTermInfo[i].creditTermsId,
                    "creditTermName": creditTermName
                }]),
                this.localCollection.push(creditTermName);
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
            this.CreditTermsService.updatecreditterms(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive == true;
            this.CreditTermsService.updatecreditterms(this.sourceAction).subscribe(
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
            this.sourceAction.name = this.creditTermName;
              this.sourceAction.masterCompanyId= 1;
            this.CreditTermsService.newAddcreditterms(this.sourceAction).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.name = this.creditTermName;
              this.sourceAction.masterCompanyId= 1;
            this.CreditTermsService.updatecreditterms(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.CreditTermsService.deletecreditterms(this.sourceAction.creditTermsId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    private saveCompleted(user?: CreditTerms) {
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

    private saveSuccessHelper(role?: CreditTerms) {
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
        this.auditCreditTerms(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditCreditTerms(creditTermId: number): void {
        this.AuditDetails = [];
        this.CreditTermsService.getCreaditTermsAudit(creditTermId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["creditTermsAuditId", "creditTermsId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }

}
