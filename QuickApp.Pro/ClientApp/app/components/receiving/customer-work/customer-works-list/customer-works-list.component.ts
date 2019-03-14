import { Component, OnInit, AfterViewInit } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { PageHeaderComponent } from '../../../../shared/page-header.component';
import * as $ from 'jquery';
import { ReceivingCustomerWorkService } from '../../../../services/receivingcustomerwork.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuditHistory } from '../../../../models/audithistory.model';
import { MessageSeverity } from '../../../../services/alert.service';

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
    constructor(private receivingCustomerWorkService: ReceivingCustomerWorkService, private _route: Router, private alertService: AlertService, private modalService: NgbModal) {
    }

    ngAfterViewInit(): void {
    }
    ngOnInit(): void {
        this.Receveingcustomerlist();
        this.loadData();
    }
    public navigateTogeneralInfo() {
        //this.receivingCustomerWorkService.listCollection = [];
        this.receivingCustomerWorkService.isEditMode = false;
        this.receivingCustomerWorkService.enableExternal = false;
        this._route.navigateByUrl('receivingmodule/receivingpages/app-customer-work-setup');

    }
    private onDataLoadrecevingSuccessful(getEmployeeCerficationList: any[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = getEmployeeCerficationList;
        this.allRecevinginfo = getEmployeeCerficationList;
    }
    private Receveingcustomerlist() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.receivingCustomerWorkService.getReceiveCustomerList().subscribe(
            results => this.onDataLoadrecevingSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onDataLoadFailed(error: any) {
        // alert(error);
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

    }

    private loadData() {

        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.receivingCustomerWorkService.getReason().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.cols = [

            //{ field: 'actionId', header: 'Action Id' },
            { field: 'partNumber', header: 'PN' },
            { field: 'partDescription', header: 'PN Description' },
            { field: 'name', header: 'Customer Name' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
            { field: 'updatedDate', header: 'Updated Date' },
            { field: 'createdDate', header: 'Created Date' }


        ];

        this.selectedColumns = this.cols;

    }
    private onDataLoadSuccessful(allWorkFlows: any[]) {
        // debugger;
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allRecevinginfo = allWorkFlows;
        console.log(allWorkFlows);
    }
    openEdits(row) {
        //  debugger
        this.isEditMode = true;
        this.receivingCustomerWorkService.isEditMode = true;
        this.isSaving = true;
        //this.sourceVendor = row;
        // this.loadMasterCompanies();
        this.receivingCustomerWorkService.listCollection = row;
        this.receivingCustomerWorkService.enableExternal = true;
        this._route.navigateByUrl('receivingmodule/receivingpages/app-customer-work-setup');
        // this.actionName = this.sourceVendor.description;

    }
    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourcereceving = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
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

        debugger;
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.auditHisory = auditHistory;


        this.modal = this.modalService.open(content, { size: 'lg' });

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
}