﻿import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../../services/animations';
import { PageHeaderComponent } from '../../../shared/page-header.component';
import * as $ from 'jquery';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatIcon } from '@angular/material';
import { AuthService } from '../../../services/auth.service';
import { NgbModal, NgbActiveModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, DialogType, MessageSeverity } from '../../../services/alert.service';
import { CustomerService } from '../../../services/customer.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { AuditHistory } from '../../../models/audithistory.model';
import { MasterCompany } from '../../../models/mastercompany.model';
import { Customer } from '../../../models/customer.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Router } from '@angular/router';
import { Globals } from '../../../globals'
import { LazyLoadEvent } from 'primeng/api';

@Component({
    selector: 'app-customers-list',
    templateUrl: './customers-list.component.html',
    styleUrls: ['./customers-list.component.scss'],
    animations: [fadeInOut]
})
/** CustomersList component*/
export class CustomersListComponent implements OnInit, AfterViewInit {

    totelPages: number;
    customersList: any[] = [];
    createdPageDate: any;
    updatedBy: any;
    createdBy: any;
    createdDate: any;
    updatedDate: any;
    pageLinks: number = 4;
    customerType: any;
    stateOrProvince: any;
    city: any;
    customerViewData: any;
    matvhMode: any;
    field: any;
    event: any;
    condition: any;
    email: any;
    primarySalesPersonFirstName: any;
    customerTypeId: any;
    name: any;
    customerCode: any;
    customers = [];
    globalCustomers = [];
    jsonData: string;
    searchData: { 'CustomerCode': any; };
    inputFilterState: { field: any; value: any; };
    activeIndex: number;
    Active: string = "Active";
    customerViewFeilds: any = {};
    selectedContactsColumns: any[];
    contactcols: any[];
    allcontacts: any[] = [];
    selectedBillingsColumns: any[];
    Billingcol: any[];
    allBillingInfo: any[] = [];
    allShipping: any[] = [];
    allShipViaDetails: any[] = [];
    billingCols: any[];
    shippingcols: any[];
    selectedshippingColumns: any;
    markUpPercent: any = "";
    creditLimit: any = "";
    creditTermsId: any = "";
    allowNettingOfAPAR: any = "";
    isTaxExempt: any = "";
    taxRateStateOrProvince: any = "";
    taxRateOther: any = "";
    ediDescription: any = "";
    shipViacols: any[];
    selectedShipViaColumn: any[];
    currencyId: any = "";
    customerVfinanceiewFeilds: any = {};
    customerClassificationId: any;
    exportLicenseNumber: any;
    ngOnInit(): void {

        this.loadData(); //it is need to not show steps in customer List
        this.activeIndex = 0;
        this.workFlowtService.currentUrl = '/customersmodule/customerpages/app-customers-list';
        this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);

        this.workFlowtService.ShowPtab = false;

        this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab);
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns = ['actionId', 'companyName', 'description', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<Customer>;
    allCustomer: Customer[] = [];
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    shipViaObj: any = {};
    public sourceCustomer: any = {};
    public auditHisory: AuditHistory[] = [];
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    selectedColumn: Customer[];
    selectedColumns: any[];
    cols: any[];
    title: string = "Create";
    id: number;
    errorMessage: any;
    modal: NgbModalRef;
    /** Customers ctor */

    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;

    pageSearch: { query: any; field: any; };
    first: number;
    rows: number;
    paginatorState: any;

    customerPagination: Customer[];//added
    totalRecords: number;
    loading: boolean;

    constructor(private _route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: CustomerService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.displayedColumns.push('Customer');
        this.dataSource = new MatTableDataSource();
        this.activeIndex = 0;
        this.workFlowtService.listCollection = null;
        //this.sourceCustomer = new Customer();

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    public allWorkFlows: Customer[] = [];

    private loadData() {

        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.cols = [

            //{ field: 'actionId', header: 'Action Id' },
            { field: 'customerCode', header: 'Customers Code' },
            { field: 'name', header: 'Customer Name' },
            { field: 'customerType', header: 'Customer Type' },
            { field: 'email', header: 'Customer Email' },
            { field: 'city', header: 'City' },
            { field: 'stateOrProvince', header: 'StateOrProvince' },
            { field: 'primarySalesPersonFirstName', header: 'Primary Sales Person' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
            { field: 'updatedDate', header: 'Updated Date' },
            { field: 'createdDate', header: 'Created Date' }


        ];

        if (!this.selectedColumns) {
            this.selectedColumns = this.cols;
        }


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
    private onDataLoadSuccessful(allWorkFlows: any[]) {
        // debugger;
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.totalRecords = allWorkFlows.length;
        this.allCustomer = allWorkFlows;
        console.log(allWorkFlows);
    }

    private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {

        // debugger;
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        //this.auditHisory = auditHistory;


        //this.modal = this.modalService.open(content, { size: 'lg' });

        //this.modal.result.then(() => {
        //    console.log('When user closes');
        //}, () => { console.log('Backdrop click') })


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
        this.sourceCustomer = "";

        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceCustomer = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    //openEdit(content, row) {

    //    this.isEditMode = true;

    //    this.isSaving = true;
    //    this.loadMasterCompanies();



    //    this.sourceCustomer = row;
    //    this.loadMasterCompanies();
    //    this.modal = this.modalService.open(content, { size: 'sm' });
    //    this.modal.result.then(() => {
    //        console.log('When user closes');
    //    }, () => { console.log('Backdrop click') })
    //}

    openHist(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;


        this.sourceCustomer = row;



        //this.isSaving = true;
        // debugger;
        //this.workFlowtService.historyAcion(this.sourceCustomer.CustomerId).subscribe(
        //    results => this.onHistoryLoadSuccessful(results[0], content),
        //    error => this.saveFailedHelper(error));


    }

    public navigateTogeneralInfo() {
        //this.workFlowtService.listCollection = [];
        this.workFlowtService.isEditMode = false;
        this.workFlowtService.enableExternal = false;
        this._route.navigateByUrl('customersmodule/customerpages/app-customer-general-information');

    }

    openEdits(row) {
        //  debugger
        this.isEditMode = true;
        this.workFlowtService.isEditMode = true;
        this.isSaving = true;
        //this.sourceVendor = row;
        this.loadMasterCompanies();
        this.workFlowtService.getCustomerdataById(row.customerId).subscribe(results =>
        {
            this.workFlowtService.listCollection = results[0][0];
            this.workFlowtService.enableExternal = true;
            this._route.navigateByUrl('customersmodule/customerpages/app-customer-general-information');
            });
       
        //this.workFlowtService.listCollection = row;
        //this.workFlowtService.enableExternal = true;
        //this._route.navigateByUrl('customersmodule/customerpages/app-customer-general-information');
        // this.actionName = this.sourceVendor.description;

    }
    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceCustomer = rowData;
            this.sourceCustomer.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceCustomer.isActive == false;
            this.workFlowtService.updateActionforActive(this.sourceCustomer).subscribe(
                response => this.saveCompleted(this.sourceCustomer),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceCustomer = rowData;
            this.sourceCustomer.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceCustomer.isActive == true;
            this.workFlowtService.updateActionforActive(this.sourceCustomer).subscribe(
                response => this.saveCompleted(this.sourceCustomer),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

    }


    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.isDeleteMode = true;
        this.sourceCustomer.isdelete = false;
        //this.sourceVendor = content;
        this.sourceCustomer.updatedBy = this.userName;
        this.workFlowtService.updateListstatus(this.sourceCustomer.customerId).subscribe(response => {
            this.alertService.showMessage("Customer removed successfully.");
            this.updatePaginatorState();
            this.modal.close();
        });
            //response => this.saveCompleted(this.sourceCustomer),
            //error => this.saveFailedHelper(error));
        this.modal.close();
    }
    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    private saveCompleted(user?: Customer) {
        this.isSaving = false;

        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

        }

        this.updatePaginatorState();
    }

    private saveSuccessHelper(role?: Customer) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

        this.updatePaginatorState();

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

    openView(content, row) {

        if (row.customerId)
        {
            this.workFlowtService.getCustomerdataById(row.customerId).subscribe(results => {
                this.customerViewData = results[0][0];

                if (this.customerViewData)
                {
                    this.customerViewFeilds.name = this.customerViewData.name;
                    this.customerViewFeilds.dba = this.customerViewData.dba;
                    this.customerViewFeilds.customerCode = this.customerViewData.customerCode;
                    this.customerViewFeilds.doingBuinessAsName = this.customerViewData.doingBuinessAsName;
                    this.customerViewFeilds.description = this.customerViewData.description;
                    this.customerViewFeilds.parent = this.customerViewData.parent;
                    this.customerViewFeilds.address1 = this.customerViewData.address1;
                    this.customerViewFeilds.address2 = this.customerViewData.address2;
                    this.customerViewFeilds.address3 = this.customerViewData.address3;
                    this.customerViewFeilds.city = this.customerViewData.city;
                    this.customerViewFeilds.stateOrProvince = this.customerViewData.stateOrProvince;
                    this.customerViewFeilds.postalCode = this.customerViewData.postalCode;
                    this.customerViewFeilds.country = this.customerViewData.country;
                    this.customerViewFeilds.email = this.customerViewData.email;
                    this.customerViewFeilds.customerClassificationId = this.customerViewData.t.customerClassificationId;
                    if (row.currency) {
                        this.currencyId = this.customerViewData.currency.symbol;
                    }
                    else {
                        this.currencyId = "";
                    }
                    if (row.creditTerms) {
                        this.creditTermsId = this.customerViewData.creditTerms.name;
                    }
                    else {
                        this.creditTermsId = "";
                    }

                    if (row.cc) {
                        this.customerClassificationId = this.customerViewData.cc.description;
                    }
                    else {
                        this.customerClassificationId = "";
                    }
                    this.customerViewFeilds.contractReference = this.customerViewData.t.contractReference;
                    this.customerViewFeilds.pbhCustomerMemo = this.customerViewData.pbhCustomerMemo;
                    this.customerViewFeilds.restrictPMAMemo = this.customerViewData.restrictPMAMemo;
                    this.customerViewFeilds.customerURL = this.customerViewData.customerURL;
                    this.sourceCustomer = this.customerViewData;
                    this.customerVfinanceiewFeilds.markUpPercent = this.customerViewData.t.markUpPercent;
                    this.customerVfinanceiewFeilds.creditLimit = this.customerViewData.t.creditLimit;
                    this.customerVfinanceiewFeilds.creditTermsId = this.customerViewData.t.creditTermsId;
                    this.customerVfinanceiewFeilds.allowNettingOfAPAR = this.customerViewData.t.allowNettingOfAPAR;
                    this.customerVfinanceiewFeilds.isTaxExempt = this.customerViewData.t.isTaxExempt;
                    this.customerVfinanceiewFeilds.taxRateStateOrProvince = this.customerViewData.t.taxRateStateOrProvince;
                    this.customerVfinanceiewFeilds.taxRateOther = this.customerViewData.t.taxRateOther;
                    this.customerVfinanceiewFeilds.ediDescription = this.customerViewData.t.ediDescription;
                    this.customerVfinanceiewFeilds.currencyId = this.customerViewData.t.currencyId;

                    //if (row.currency) {
                    //	this.currencyId = row.currency.symbol;
                    //}
                    //else { this.currencyId = "" }

                    this.exportLicenseNumber = row.exportLicenseNumber;
                    this.customerViewFeilds.primarySalesPersonFirstName = this.customerViewData.t.primarySalesPersonFirstName;
                    this.customerViewFeilds.secondarySalesPersonName = this.customerViewData.t.secondarySalesPersonName;
                    this.customerViewFeilds.csrName = this.customerViewData.t.csrName;
                    this.customerViewFeilds.agentName = this.customerViewData.t.agentName;

                    this.loadCustomerData(this.customerViewData.customerId);
                    this.loadShipppingData(this.customerViewData.customerId);
                    this.loadBillingData(this.customerViewData.customerId);
                    this.modal = this.modalService.open(content, { size: 'lg' });
                    this.modal.result.then(() => {
                        console.log('When user closes');
                    }, () => { console.log('Backdrop click') })
                }
            });
        }
        //this.sourceCustomer = row;
        //this.customerViewFeilds = row;
        //this.customerVfinanceiewFeilds = row;
        
    }

    //private loadCustomerData() {
    //	this.alertService.startLoadingMessage();
    //	this.loadingIndicator = true;

    //	this.workFlowtService.getContacts(this.sourceCustomer.customerId).subscribe(
    //		results => this.onDatacontactLoadSuccessful(results[0]),
    //		error => this.onDataLoadFailed(error)
    //	);

    //	this.contactcols = [
    //		//{ field: 'actionId', header: 'Action Id' },
    //		{ field: 'firstName', header: 'First Name' },
    //		{ field: 'lastName', header: 'Last  Name' },
    //		{ field: 'contactTitle', header: 'Contact Title' },
    //		{ field: 'email', header: 'Email' },
    //		{ field: 'mobilePhone', header: 'Mobile Phone' },
    //		{ field: 'fax', header: 'Fax' },
    //		{ field: 'createdBy', header: 'Created By' },
    //		{ field: 'updatedBy', header: 'Updated By' },
    //		{ field: 'updatedDate', header: 'Updated Date' },
    //		{ field: 'createdDate', header: 'Created Date' }

    //	];

    //	this.selectedContactsColumns = this.contactcols;

    //}

    private loadCustomerData(customerId) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getContacts(customerId).subscribe(
            results => this.onDatacontactLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.contactcols = [
            //{ field: 'actionId', header: 'Action Id' },
            { field: 'firstName', header: 'First Name' },
            { field: 'lastName', header: 'Last  Name' },
            { field: 'contactTitle', header: 'Contact Title' },
            { field: 'email', header: 'Email' },
            { field: 'mobilePhone', header: 'Mobile Phone' },
            { field: 'fax', header: 'Fax' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
            { field: 'updatedDate', header: 'Updated Date' },
            { field: 'createdDate', header: 'Created Date' }

        ];

        this.selectedContactsColumns = this.contactcols;

    }

    private onDatacontactLoadSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allcontacts = allWorkFlows;


    }
    private loadBillingData(customerId) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getCustomerBillViaDetails(customerId).subscribe(
            results => this.onDataBillingLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.billingCols = [

            { field: 'siteName', header: 'Site Name' },
            { field: 'address1', header: 'Address1' },
            { field: 'address2', header: 'Address2' },
            { field: 'address3', header: 'Address3' },
            { field: 'city', header: 'City' },
            { field: 'stateOrProvince', header: 'State/Prov' },
            { field: 'postalCode', header: 'Postal Code' },
            { field: 'country', header: 'Country' }

        ];

        this.selectedBillingsColumns = this.billingCols;

    }
    private onDataBillingLoadSuccessful(allWorkFlows: any) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allBillingInfo = allWorkFlows;


    }
    private loadShipppingData(customerId) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getCustomerShipAddressGet(customerId).subscribe(
            results => this.onDatashippingLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.shippingcols = [

            { field: 'siteName', header: 'Site Name' },
            { field: 'address1', header: 'Address1' },
            { field: 'address2', header: 'Address2' },
            { field: 'address3', header: 'Address3' },
            { field: 'city', header: 'City' },
            { field: 'StateOrProvince', header: 'StateOrProvince' },
            { field: 'postalCode', header: 'Postal Code' },
            { field: 'country', header: 'Country' }

        ];

        this.selectedshippingColumns = this.shippingcols;

    }
    private onDatashippingLoadSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allShipping = allWorkFlows;


    }
    private onShipViadetails(allWorkFlows: any) {
        //debugger;
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allShipViaDetails = allWorkFlows;
    }
    private loadShipViaCollection(customerId) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getCustomerShipViaDetails(customerId).subscribe(
            results => this.onShipViadetails(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.shipViacols = [

            { field: 'siteName', header: 'Shipping SiteName' },
            { field: 'shipVia', header: 'Ship Via' },
            { field: 'shippingAccountinfo', header: 'Shipping Account Info' },
            { field: 'shippingURL', header: 'Shipping Url' },
            { field: 'shippingId', header: 'Shipping Id' },
            { field: 'memo', header: 'Memo' }
        ];

        this.selectedShipViaColumn = this.shipViacols;

    }
    openContactList(content, row) {
        this.modal = this.modalService.open(content, { size: 'lg' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
        this.loadCustomerData(row.customerId)

    }
    openSiteList(content, row) {
        this.modal = this.modalService.open(content, { size: 'lg' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
        this.loadShipppingData(row.customerId)

    }
    openShipViaEdit(rowObject) {
        this.isEditMode = true;

        this.isSaving = true;
        this.shipViaObj = rowObject;
        this.loadMasterCompanies();
    }
    openShipVia(content, row) {
        this.modal.close();
        this.loadShipViaCollection(row);
        this.modal = this.modalService.open(content, { size: 'lg' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
        //this.onShipViadetails(row.customerShippingAddressId)
    }

    updatePaginatorState() //need to pass this Object after update or Delete to get Server Side pagination
    {
        this.paginatorState = {
            rows: this.rows,
            first: this.first
        }
        if (this.paginatorState) {
            this.loadCustomerPages(this.paginatorState);
        }
    }

    loadCustomerPages(event: LazyLoadEvent) //when page initilizes it will call this method
    {
        this.loading = true;
        this.rows = event.rows;
        this.first = event.first;
        if (this.field) {
            this.customers.push({
                CustomerCode: this.customerCode,//code11
                Name: this.name, //test Customer11
                Email: this.email,
                City: this.city,
                StateOrProvince: this.stateOrProvince,
                CustomerType: this.customerType,
                PrimarySalesPersonFirstName: this.primarySalesPersonFirstName,  //test Sales
                first: this.first,
                page: 10,
                pageCount: 10,
                rows: this.rows,
                limit: 5
                //GlobalSearchString: ""
            })
            if (this.customers) {
                this.workFlowtService.getServerPages(this.customers[this.customers.length - 1]).subscribe( //we are sending event details to service
                    pages => {
                        if (pages.length > 0) {
                            this.customersList = pages;
                            this.customerPagination = this.customersList[0].customerList;
                            this.totalRecords = this.customersList[0].totalRecordsCount;
                            this.totelPages = Math.ceil(this.totalRecords / this.rows);
                            
                        }
                        else
                        {
                            this.alertService.showMessage("Asset Status removed successfully.");
                        }
                    });
            }
        }

        else
        {
            setTimeout(() => {
                if (this.allCustomer) {
                    this.workFlowtService.getServerPages(event).subscribe( //we are sending event details to service
                        pages => {
                            this.customersList = pages;
                            this.customerPagination = this.customersList[0].customerList;
                            //this.totalRecordsForTable = this.customersList[0].totalRecordsCount;
                            this.totalRecords = this.customersList[0].totalRecordsCount; 
                            this.totelPages = Math.ceil(this.totalRecords / this.rows);
                        });
                    this.loading = false;
                }
            }, 1000);
        }
        this.loading = false;
    }

    inputGlobalFiledFilter(dataEvent, contains) {
        
        if (dataEvent)
        {
            this.globalCustomers.push({
                GlobalSearchString: dataEvent,
                first: this.first,
                page: 10,
                pageCount: 10,
                rows: this.rows,
                limit: 5
            })
            this.workFlowtService.getGlobalSearch(this.globalCustomers[this.globalCustomers.length - 1]).subscribe( //we are sending event details to service
                pages => {
                    this.customersList = pages;
                    this.customerPagination = this.customersList[0].customerList;
                    this.totalRecords = this.customersList[0].totalRecordsCount; 
                });
        }
    }

    inputFiledFilter(event, filed, matchMode) {
        this.first = 0;
        this.event = event;
        this.field = filed;
        this.matvhMode = matchMode;
        //this.jsonData = "{";
        if (filed == 'customerCode') {
            this.customerCode = event;
        }
        //else {
        //    this.customerCode = '';
        //}


        if (filed == 'name') {
            this.name = event;
        }
        //else {
        //    this.name = '';
        //}


        if (filed == 'customerTypeId') {
            this.customerTypeId = event;
        }
        //else {
        //    this.customerTypeId = '';
        //}

        if (filed == 'email') {
            this.email = event;
        }
        //else {
        //    this.email = '';
        //}

        if (filed == 'primarySalesPersonFirstName') {
            this.primarySalesPersonFirstName = event;
        }
        if (filed == 'city') {
            this.city = event;
        }
        if (filed == 'stateOrProvince') {
            this.stateOrProvince = event;
        }
        if (filed == 'customerType') {
            this.customerType = event;
        }
        if (filed == 'updatedDate') {
            this.updatedDate = event;
        }
        if (filed == 'createdDate') {
            this.createdPageDate = event;
        }
        if (filed == 'createdBy') {
            this.createdBy = event;
        }
        if (filed == 'updatedBy') {
            this.updatedBy = event;
        }
        //else {
        //    this.primarySalesPersonFirstName = '';
        //}
        this.customers.push({
            CustomerCode: this.customerCode,//code11
            Name: this.name, //test Customer11
            Email: this.email,
            City: this.city,
            StateOrProvince: this.stateOrProvince,
            CustomerType: this.customerType,
            UpdatedDate: this.updatedDate,
            CreatedDate: this.createdPageDate,
            PrimarySalesPersonFirstName: this.primarySalesPersonFirstName,
            createdBy: this.createdBy,
            updatedBy: this.updatedBy,
            first: this.first,
            page: 10,
            pageCount: 10,
            rows: this.rows,
            limit: 5
            //GlobalSearchString: ""
        })
        if (this.customers) {
            this.workFlowtService.getServerPages(this.customers[this.customers.length - 1]).subscribe( //we are sending event details to service
                pages => {
                    this.customersList = pages;
                    this.customerPagination = this.customersList[0].customerList;
                    this.totalRecords = this.customersList[0].totalRecordsCount;
                    this.totelPages = Math.ceil(this.totalRecords / this.rows);
                });
        }
        else {
            //this.customers = {};
        }
    }

}

