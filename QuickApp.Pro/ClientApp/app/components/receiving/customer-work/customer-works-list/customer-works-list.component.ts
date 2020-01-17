import { ReceivingCustomerWorkService } from '../../../../services/receivingcustomerwork.service';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatIcon } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

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
import { listSearchFilterObjectCreation } from '../../../../generic/autocomplete';
import { CommonService } from '../../../../services/common.service';
import { TableModule, Table } from 'primeng/table';
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
    //cols: any[];
   // selectedColumns: { field: string; header: string; }[];
    isSaving: boolean;
    isDeleteMode: boolean;
    sourcereceving: any;
    modal: any;
    customerWorkHisory: any[];
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
    lazyLoadEventData: any;
    pageSize: number = 10;
    pageIndex: number = 0;
    totalRecords: number = 0;
    totalPages: number = 0;
    filteredText: string;
    private table: Table;
    auditHisory: any[];
    public departname: any;
    public divsioname: any;
    public biuName: any;
    public compnayname: any;
          cols = [
             
    { field: 'receivingCustomerNumber', header: 'Recev.No.' },
    //{ field: 'workOrderNum', header: 'WorkOrderNum' },
    { field: 'partNumber', header: 'PN' },
    { field: 'partDescription', header: 'PN Description' },

    { field: 'changePartNumber', header: 'Change Part Number' },
    { field: 'firstName', header: 'Employee Name' },
    { field: 'name', header: 'Customer Name' },
    { field: 'customerReference', header: 'Customer Reference' },
];
    selectedColumns = this.cols;


    constructor(private receivingCustomerWorkService: ReceivingCustomerWorkService, private masterComapnyService: MasterComapnyService, private _route: Router, private authService: AuthService, private alertService: AlertService, private modalService: NgbModal, private commonService: CommonService) {
        this.dataSource = new MatTableDataSource();
        this.receivingCustomerWorkService.isEditMode = false;
       
    }

     

    ngAfterViewInit(): void {
    }
    ngOnInit(): void {
      
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
    loadData(event) {

        this.lazyLoadEventData = event;
        const pageIndex = parseInt(event.first) / event.rows;;
        this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        event.first = pageIndex;
        this.getList(event)

        console.log(event);

    }

    getList(data) {

        console.log(data.sortField);
         const PagingData = { ...data, filters: listSearchFilterObjectCreation(data.filters) }
        this.receivingCustomerWorkService.getCustomerWorkAll(PagingData).subscribe(res => {
            this.allRecevinginfo = res;
            if (res.length > 0) {
                this.totalRecords = res[0].totalRecords;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }

        })
    }
   

      

    
    private onDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.allRecevinginfo = allWorkFlows;
        console.log(allWorkFlows,'work');
    }
    openEdits(row) {
    
        const { receivingCustomerWorkId } = row;
       
        this._route.navigateByUrl(`receivingmodule/receivingpages/app-customer-work-setup/edit/${receivingCustomerWorkId}`);
    }
  
    openView(content, row) {

        const { receivingCustomerWorkId } = row;

        this.receivingCustomerWorkService.getCustomerWorkdataById(receivingCustomerWorkId).subscribe(response => {

            this.receivingCustomerWorkService.listCollection = response[0];
            row = response[0];
            this.sourceAction = row;
            if (row.managmentLegalEntity != null && row.divmanagmentLegalEntity != null && row.biumanagmentLegalEntity != null && row.compmanagmentLegalEntity != null) {
                this.departname = row.managementStructeInfo.name;
                this.divsioname = row.divmanagmentLegalEntity.name;
                this.biuName = row.biumanagmentLegalEntity.name;
                this.compnayname = row.compmanagmentLegalEntity.name;

            }
            else if (row.biumanagmentLegalEntity != null && row.divmanagmentLegalEntity != null && row.managmentLegalEntity != null) {

                this.divsioname = row.managmentLegalEntity.name;
                this.biuName = row.divmanagmentLegalEntity.name;
                this.compnayname = row.biumanagmentLegalEntity.name;



            }
            else if (row.divmanagmentLegalEntity != null && row.managmentLegalEntity != null) {
                this.biuName = row.managmentLegalEntity.name;
                this.compnayname = row.divmanagmentLegalEntity.name;


            }
            else if (row.managementStructeInfo != null) {

                this.compnayname = row.managmentLegalEntity.name;

            }
            else {
                
            }
          
            this.showViewProperties.isTimeLife = row.isTimeLife;
            this.showViewProperties.receivingCustomerNumber = row.receivingCustomerNumber;
            this.showViewProperties.customerReference = row.customerReference;
            this.showViewProperties.contactFirstName = row.contactFirstName;
            this.showViewProperties.workPhone = row.workPhone;

            this.showViewProperties.partNumber = row.partNumber;

            this.showViewProperties.partDescription = row.partDescription;

            this.showViewProperties.changePartNumber = row.changePartNumber;

            this.showViewProperties.partCertificationNumber = row.partCertificationNumber;

            this.showViewProperties.expirationDate = row.expirationDate;

            this.showViewProperties.quantity = row.quantity;
            this.showViewProperties.conditionId = row.conditionId;

            this.showViewProperties.owner = row.owner;

            this.showViewProperties.isCustomerStock = row.isCustomerStock;

            this.showViewProperties.traceableToType = row.traceableToType;

            this.showViewProperties.traceableTo = row.traceableTo;

            this.showViewProperties.obtainFromType = row.obtainFromType;
            this.showViewProperties.obtainFrom = row.obtainFrom;
            this.showViewProperties.manufacturingDate = row.manufacturingDate;
            this.showViewProperties.expirationDate = row.expirationDate;
            this.showViewProperties.manufacturingTrace = row.manufacturingTrace;
            this.showViewProperties.manufacturingLotNumber = row.manufacturingLotNumber;
            this.showViewProperties.timeLifeDate = row.timeLifeDate;
            this.showViewProperties.timeLifeOrigin = row.timeLifeOrigin;
           

            
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
            if (this.receivingCustomerWorkService.listCollection.ti) {
                this.showViewProperties.cyclesRemaining = row.ti.cyclesRemaining;
                this.showViewProperties.cyclesSinceNew = row.ti.cyclesSinceNew;
                this.showViewProperties.cyclesSinceOVH = row.ti.cyclesSinceOVH;
                this.showViewProperties.cyclesSinceInspection = row.ti.cyclesSinceInspection;
                this.showViewProperties.cyclesSinceRepair = row.ti.cyclesSinceRepair;
                this.showViewProperties.timeRemaining = row.ti.timeRemaining;
                this.showViewProperties.timeSinceNew = row.ti.timeSinceNew;
                this.showViewProperties.timeSinceOVH = row.ti.timeSinceOVH;
                this.showViewProperties.timeSinceInspection = row.ti.timeSinceInspection;
                this.showViewProperties.lastSinceInspection = row.ti.lastSinceInspection;
                this.showViewProperties.lastSinceOVH = row.ti.lastSinceOVH;
                this.showViewProperties.lastSinceNew = row.ti.lastSinceNew;
                this.showViewProperties.timeSinceRepair = row.ti.timeSinceRepair;
            }
            else { this.showViewProperties.timeLifeCyclesId = "" }

        });

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
        this.receivingCustomerWorkService.deleteReason(this.sourcereceving.receivingCustomerWorkId, this.userName).subscribe(

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
        this.getList(this.lazyLoadEventData);
        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

        }

        
    }

    toggleIsActive(rowData, e) {
      
        if (e.checked == false) {
            this.sourcereceving = rowData;
            this.sourcereceving.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourcereceving.isActive == false;
            this.receivingCustomerWorkService.updateActionforActive(this.sourcereceving.receivingCustomerWorkId, this.sourcereceving.isActive, this.userName).subscribe(
                response => this.saveCompleted(this.sourcereceving),
                error => this.saveFailedHelper(error));
        }
        else {
            this.sourcereceving = rowData;
            this.sourcereceving.updatedBy = this.userName;
            this.Active = "Active";
            this.sourcereceving.isActive == true;
            this.receivingCustomerWorkService.updateActionforActive(this.sourcereceving.receivingCustomerWorkId, this.sourcereceving.isActive, this.userName).subscribe(
                response => this.saveCompleted(this.sourcereceving),
                error => this.saveFailedHelper(error));
        }

    }
    openHistory(content, rowData) {
           this.alertService.startLoadingMessage();

        this.receivingCustomerWorkService.getAuditHistory(rowData.receivingCustomerWorkId).subscribe(
            results => this.onAuditHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));
    }
    private onAuditHistoryLoadSuccessful(auditHistory, content) {
        this.alertService.stopLoadingMessage();


        this.customerWorkHisory = auditHistory;
        console.log(this.customerWorkHisory,'audit')
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    getColorCodeForHistory(i, field, value) {
        const data = this.customerWorkHisory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }
    globalSearch(value) {
        this.pageIndex = 0;
        this.filteredText = value;
        this.receivingCustomerWorkService.getGlobalSearch(value, this.pageIndex, this.pageSize).subscribe(res => {
            this.allRecevinginfo = res;
            if (res.length > 0) {
                this.totalRecords = res[0].totalRecords;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }
        })
    }

    refreshList() {
        if (this.filteredText != "" && this.filteredText != null && this.filteredText != undefined) {
            this.globalSearch(this.filteredText);
        }
        else {
            this.table.reset();
        }
      

    }

    
}