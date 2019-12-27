import { ReceivingCustomerWorkService } from '../../../../services/receivingcustomerwork.service';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatIcon } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { fadeInOut } from '../../../../services/animations';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { AuditHistory } from '../../../../models/audithistory.model';
import { AuthService } from '../../../../services/auth.service';
import { MasterCompany } from '../../../../models/mastercompany.model';
import { MasterComapnyService } from '../../../../services/mastercompany.service';

@Component({
    selector: 'app-customer-works-list',
    templateUrl: './customer-works-list.component.html',
    styleUrls: ['./customer-works-list.component.scss'],
    animations: [fadeInOut]
})

export class CustomerWorksListComponent implements OnInit, AfterViewInit{
   

    private isEditMode: boolean = false;
    loadingIndicator: boolean;
    dataSource: any;
    allRecevinginfo: any[] = [];
    cols: any[];
    selectedColumns: { field: string; header: string; }[];
    isSaving: boolean;
    isDeleteMode: boolean;
    sourcereceving: any;
    modal: any;
    auditHisory: any[];
    sourceAction: any;
    allComapnies: MasterCompany[];
    customerId: any;
    employeeId: any;
    conditionId: any;
    siteId: any;
    warehouseId: any;
    locationId: any;
    showViewProperties: any = {};
    selectedColumn: any;
    Active: string = "Active";
   

    constructor(private receivingCustomerWorkService: ReceivingCustomerWorkService, private masterComapnyService: MasterComapnyService, private _route: Router, private authService: AuthService, private alertService: AlertService, private modalService: NgbModal) {
        this.dataSource = new MatTableDataSource();
        this.receivingCustomerWorkService.isEditMode = false;
    }

     

    ngAfterViewInit(): void {
    }
    ngOnInit(): void {
        this.loadData();
    }
    public navigateTogeneralInfo() {
        this.receivingCustomerWorkService.isEditMode = false;
        this.receivingCustomerWorkService.enableExternal = false;
        this._route.navigateByUrl('receivingmodule/receivingpages/app-customer-work-edit');

    }
    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

    }

    private loadData() {

        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.receivingCustomerWorkService.getReceiveCustomerList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.cols = [
            
            { field: 'partNumber', header: 'PN' },
            { field: 'receivingCustomerNumber', header: 'Recev.No.' },
            { field: 'changePartNumber', header: 'Change Part Number' },
            { field: 'firstName', header: 'Employee Name' },
            { field: 'name', header: 'Customer Name' },
            { field: 'customerReference', header: 'Customer Reference' },
        ];

        this.selectedColumns = this.cols;

    }
    private onDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allRecevinginfo = allWorkFlows;
        console.log(allWorkFlows);
    }
    openEdits(row) {
        this.receivingCustomerWorkService.isEditMode = true;
        this.isSaving = true;
        this.receivingCustomerWorkService.listCollection = row;
        this._route.navigateByUrl('receivingmodule/receivingpages/app-customer-work-setup');
    }
  
    openView(content, row) {

        this.sourceAction = row;
        if (row.customer) {
            this.showViewProperties.customerId = row.customer.name;
        }
        else { this.customerId = "" }
        if (row.employee) {
            this.showViewProperties.employeeId = row.employee.firstName;
        }
        else { this.employeeId = "" }

        if (row.co) {
            this.showViewProperties.conditionId = row.co.description;
        }
        else { this.conditionId = "" }
        if (row.si) {
            this.showViewProperties.siteId = row.si.name;
        }
        else { this.siteId = "" }

        if (row.w) {
            this.showViewProperties.warehouseId = row.w.name;
        }
        else { this.warehouseId = "" }

        if (row.l) {
            this.showViewProperties.locationId = row.l.name;
        }
        else { this.locationId = "" }
        if (row.sh) {
            this.showViewProperties.shelfId = row.sh.name;
        }
        else { this.showViewProperties.shelfId = "" }

        if (row.bi) {
            this.showViewProperties.binId = row.bi.name;
        }
        else { this.showViewProperties.binId = "" }
        if (row.ti) {
            this.showViewProperties.timeLifeCyclesId = row.ti.cyclesRemaining;
            this.showViewProperties.timeLifeCyclesId = row.ti.cyclesSinceNew;
            this.showViewProperties.timeLifeCyclesId = row.ti.cyclesSinceOVH;
            this.showViewProperties.timeLifeCyclesId = row.ti.cyclesSinceInspection;
            this.showViewProperties.timeLifeCyclesId = row.ti.cyclesSinceRepair;
            this.showViewProperties.timeLifeCyclesId = row.ti.timeRemaining;
            this.showViewProperties.timeLifeCyclesId = row.ti.timeSinceNew;
            this.showViewProperties.timeLifeCyclesId = row.ti.timeSinceOVH;
            this.showViewProperties.timeLifeCyclesId = row.ti.timeSinceInspection;
            this.showViewProperties.timeLifeCyclesId = row.ti.lastSinceInspection;
            this.showViewProperties.timeLifeCyclesId = row.ti.lastSinceOVH;
            this.showViewProperties.timeLifeCyclesId = row.ti.lastSinceNew;
            this.showViewProperties.timeLifeCyclesId = row.ti.timeSinceRepair;
        }
        else { this.showViewProperties.timeLifeCyclesId = "" }

        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
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

    private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allComapnies = allComapnies;

    }
	openHist(content, row) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.sourcereceving = row;
		this.isSaving = true;
        debugger;
        this.receivingCustomerWorkService.historyReason(this.sourcereceving.chargeId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));
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
    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }
  
    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.isDeleteMode = true;
        this.sourcereceving.isdelete = false;
        this.sourcereceving.updatedBy = this.userName;
        this.receivingCustomerWorkService.deleteReason(this.sourcereceving.receivingCustomerWorkId).subscribe(
            response => this.saveCompleted(this.sourcereceving),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourcereceving = row;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    private saveCompleted(user?: any) {
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

    toggleIsActive(rowData, e) {
        if (e.checked == false) {
            this.sourcereceving = rowData;
            this.sourcereceving.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourcereceving.isActive == false;
            this.receivingCustomerWorkService.updateActionforActive(this.sourcereceving).subscribe(
                response => this.saveCompleted(this.sourcereceving),
                error => this.saveFailedHelper(error));
        }
        else {
            this.sourcereceving = rowData;
            this.sourcereceving.updatedBy = this.userName;
            this.Active = "Active";
            this.sourcereceving.isActive == true;
            this.receivingCustomerWorkService.updateActionforActive(this.sourcereceving).subscribe(
                response => this.saveCompleted(this.sourcereceving),
                error => this.saveFailedHelper(error));
        }

    }
}