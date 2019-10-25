import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AuditHistory } from '../../../../models/audithistory.model';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatIcon } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MasterCompany } from '../../../../models/mastercompany.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/auth.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { VendorService } from '../../../../services/vendor.service';
import { fadeInOut } from '../../../../services/animations';
import { Router } from '@angular/router';
import { ReceivingService } from '../../../../services/receiving/receiving.service';
import { PurchaseOrder, DropDownData } from '../receivng-po/PurchaseOrder.model';

@Component({
    selector: 'app-purchase-order',
    templateUrl: './purchase-order.component.html',
    styleUrls: ['./purchase-order.component.scss'],
    animations: [fadeInOut]
})
/** purchase-order component*/


export class PurchaseOrderComponent implements OnInit, AfterViewInit {
    selectedRow: any;
    purchaseOrderNumber: any = "";
    requestedBy: any = "";
    dateApprovied: any = "";
    approver: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    selectedActionName: any;
    disableSave: boolean;
    actionamecolle: any[] = [];
    poStatus: DropDownData[] = [];

    auditHisory: AuditHistory[];
    Active: string = "Active";
    /** Currency ctor */

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    Status: string[] = ['Open', 'Pending', 'Fulfilling', 'Closed'];

    displayedColumns = ['currencyId', 'code', 'symbol', 'displayName', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<any>;
    allCurrencyInfo: any[] = [];
    sourceAction: any = {};

    loadingIndicator: boolean;

    actionForm: FormGroup;
    title: string = "Create";
    id: number;

    cols: any[];
    selectedColumns: any[];
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    allComapnies: MasterCompany[];
    private isSaving: boolean;
    modal: NgbModalRef;
    selectedColumn: any[];
    currencyName: string;
    filteredBrands: any[];
    localCollection: any[] = [];
    allPolistInfo: any;
    allPurchaseorderInfo: PurchaseOrder;
    /** Currency ctor */
    constructor(private receivingService: ReceivingService, private authService: AuthService, private _fb: FormBuilder, public _router: Router, private alertService: AlertService, private masterComapnyService: MasterComapnyService, private modalService: NgbModal, public vendorservice: VendorService, private dialog: MatDialog) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.vendorservice.ShowPtab = false;
        this.vendorservice.alertObj.next(this.vendorservice.ShowPtab);
        this.vendorservice.currentUrl = '/vendorsmodule/vendorpages/app-polist';
        this.vendorservice.bredcrumbObj.next(this.vendorservice.currentUrl);
    }
    ngOnInit(): void {
        //this.purchaseorderlist();
        this.loadData();
        this.cols = [

           
                { field: 'purchaseOrderNumber', header: 'PO Num' },
                { field: 'openDate', header: 'Open Date' },
                { field: 'closedDate', header: 'Closed/Cancelled Date' },
                { field: 'vendorName', header: 'Vendor Name' },
                { field: 'vendorCode', header: 'Vendor Code' },
                { field: 'status', header: 'Status' },
                { field: 'requestedBy', header: 'Requested By' },
                { field: 'approvedBy', header: 'Approved By' },
            
            // //{ field: 'statusId', header: 'Status' },
            // { field: 'status', header: 'Status' },
            // { field: 'noOfItems', header: '# of Items' },
            // { field: 'purchaseOrderNumber', header: 'PO Number' },
            // { field: 'currency', header: 'Currency' },
            // { field: 'poTotalCost', header: 'PO Total Cost' },
            // { field: 'vendorName', header: 'Vendor Name' },
            // { field: 'vendorContact', header: 'Vendor Contact' },
            // { field: 'employeeName', header: 'Employee Name' },
            // { field: 'contactPhone', header: 'Contact Phone' },
            // { field: 'dateRequested', header: 'Open Date' },
            // { field: 'reference', header: 'Ref' },
            // { field: 'requestedBy', header: 'Requested By' },


            //{ field: 'dateApprovied', header: ' Date Approvied ' },
            //{ field: 'approver', header: ' Approvied By' },
            //{ field: 'createdBy', header: 'Created By' },
            //{ field: 'updatedBy', header: 'Updated By' }
        ];
        //this.breadCrumb.currentUrl = '/singlepages/singlepages/app-currency';
        //this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        this.selectedColumns = this.cols;
        this.getStatus();

    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    private loadData() {
        // debugger;
       // this.alertService.startLoadingMessage();
       // this.loadingIndicator = true;

        this.vendorservice.getReceivingPOListing().subscribe(res => {
            this.allPolistInfo = res;
        }
            // results => this.onDataLoadSuccessful(results[0]),
            // error => this.onDataLoadFailed(error)
        );

    }
    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue;
    }

    private refresh() {
        // Causes the filter to refresh there by updating with recently added data.
        this.applyFilter(this.dataSource.filter);
    }


    private onDataLoadSuccessful(purchaseOrderList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        for (let purchaseOrder of purchaseOrderList) {
            let partIds: string[] = [];
            for (let part of purchaseOrder.purchaseOderPart) {
                if (partIds.indexOf(part.itemMasterId) == -1) {
                    partIds.push(part.itemMasterId);
                }
            }
            purchaseOrder.noOfItems = partIds.length;
            purchaseOrder.statusId = purchaseOrder.statusId == null ? 0 : purchaseOrder.statusId;
            purchaseOrder.status = this.Status[purchaseOrder.statusId - 1];

            if (purchaseOrder.vendor != null && purchaseOrder.vendor.vendorContact != null && purchaseOrder.vendor.vendorContact.length > 0) {
                purchaseOrder.vendorName = purchaseOrder.vendor.vendorName;
                purchaseOrder.reference = purchaseOrder.vendor.vendorContractReference;

                let defaultContact = purchaseOrder.vendor.vendorContact.filter(x => x.isDefaultContact == true);
                if (defaultContact != null && defaultContact.length > 0 && defaultContact[0].contact != null) {

                    purchaseOrder.contactPhone = defaultContact[0].contact.mobilePhone;  //  ', header: 'Vendor Contact' },
                    purchaseOrder.vendorContact = defaultContact[0].contact.suffix +
                        defaultContact[0].contact.firstName + " " +
                        defaultContact[0].contact.middleName + " " +
                        defaultContact[0].contact.lastName;
                }
                else {
                    if (purchaseOrder.vendor.vendorContact[0].contact != null) {
                        purchaseOrder.contactPhone = purchaseOrder.vendor.vendorContact[0].contact.mobilePhone;  //  ', header: 'Vendor Contact' },
                        purchaseOrder.vendorContact = purchaseOrder.vendor.vendorContact[0].contact.prefix +
                            purchaseOrder.vendor.vendorContact[0].contact.firstName + " " +
                            purchaseOrder.vendor.vendorContact[0].contact.middleName + " " +
                            purchaseOrder.vendor.vendorContact[0].contact.lastName;
                    }
                }
            }

        }

        this.dataSource.data = purchaseOrderList;
        this.allPolistInfo = purchaseOrderList;
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

    public getSelectedRow(rowData) {
        this.receivingService.purchaseOrderId = rowData.purchaseOrderId;
        this._router.navigateByUrl('/receivingmodule/receivingpages/app-receivng-po');
    }

    private onDataLoadordrSuccessful(purchaseOrder: PurchaseOrder) {
        this.allPurchaseorderInfo = purchaseOrder;
        this.receivingService.selectedPurchaseorderCollection = this.allPurchaseorderInfo;
        this.vendorservice.selectedPoCollection = this.allPurchaseorderInfo;
    }
    
    open() {

        this._router.navigateByUrl('/vendorsmodule/vendorpages/app-create-po')
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
    openEdit(row) {
        //this.vendorservice.getpurchasevendorlist(row.purchaseOrderId).subscribe(
        //	results => this.onDataLoadordrSuccessful(results[0]),
        //	error => this.onDataLoadFailed(error)
        //);
        //this.modal = this.modalService.open(content, { size: 'sm' });
        //this.modal.result.then(() => {
        //	console.log('When user closes');
        //}, () => { console.log('Backdrop click') })
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
            if (event == this.actionamecolle[i][0].currencyName) {
                //alert("Action Name already Exists");
                this.disableSave = true;
                this.selectedActionName = event;
            }
        }
    }


    filterCurrency(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allCurrencyInfo.length; i++) {
            let currencyName = this.allCurrencyInfo[i].code;
            if (currencyName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.actionamecolle.push([{
                    "currencyId": this.allCurrencyInfo[i].currencyId,
                    "currencyName": currencyName
                }]),
                    this.localCollection.push(currencyName);
            }
        }
    }


    //editItemAndCloseModel() {

    //	// debugger;

    //	this.isSaving = true;

    //	if (this.isEditMode == false) {
    //		this.sourceAction.createdBy = this.userName;
    //		this.sourceAction.updatedBy = this.userName;
    //		this.sourceAction.code = this.currencyName;
    //		this.sourceAction.masterCompanyId = 1;
    //		this.vendorservice.newAddcurrency(this.sourceAction).subscribe(
    //			role => this.saveSuccessHelper(role),
    //			error => this.saveFailedHelper(error));
    //	}
    //	else {

    //		this.sourceAction.updatedBy = this.userName;
    //		this.sourceAction.code = this.currencyName;
    //		this.sourceAction.masterCompanyId = 1;
    //		this.vendorservice.updatecurrency(this.sourceAction).subscribe(
    //			response => this.saveCompleted(this.sourceAction),
    //			error => this.saveFailedHelper(error));
    //	}

    //	this.modal.close();
    //}

    //deleteItemAndCloseModel() {
    //	this.isSaving = true;
    //	this.sourceAction.updatedBy = this.userName;
    //	this.vendorservice.deletecurrency(this.sourceAction.currencyId).subscribe(
    //		response => this.saveCompleted(this.sourceAction),
    //		error => this.saveFailedHelper(error));
    //	this.modal.close();
    //}

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
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

    private saveSuccessHelper(role?: any) {
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

    //private getDismissReason(reason: any): string {
    //	if (reason === ModalDismissReasons.ESC) {
    //		return 'by pressing ESC';
    //	} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //		return 'by clicking on a backdrop';
    //	} else {
    //		return `with: ${reason}`;
    //	}
    //}

    private getStatus() {
        this.poStatus = [];
        this.poStatus.push(<DropDownData>{ Key: '1', Value: 'Open' });
        this.poStatus.push(<DropDownData>{ Key: '2', Value: 'Pending Approval' });
        this.poStatus.push(<DropDownData>{ Key: '3', Value: 'Approved' });
        this.poStatus.push(<DropDownData>{ Key: '4', Value: 'Rejected' });
        this.poStatus.push(<DropDownData>{ Key: '4', Value: 'Fulfilled' });
    }

}