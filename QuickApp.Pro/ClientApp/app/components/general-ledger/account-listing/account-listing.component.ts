import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
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
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Router } from '@angular/router';
import { Globals } from '../../../globals'
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import { listSearchFilterObjectCreation } from '../../../generic/autocomplete';
import { AccountListingService } from '../../../services/account-listing/account-listing.service'


@Component({
    selector: 'app-account-listing',
    templateUrl: './account-listing.component.html',
    styleUrls: ['./account-listing.component.scss']
})
/** Account List component*/
export class AccountListingComponent implements OnInit {
  

    totalRecords: number = 0;
    totalPages: number = 0;
    headers = [
        { field: 'ledgerName', header: 'Ledger Name' },
        { field: 'prevAccountCode', header: 'Old GL Account Code' },
        { field: 'accountCode', header: 'GL Account Code' },
        { field: 'accountName', header: 'Account Name' },
        { field: 'accountActive', header: 'Active' }
        // { field: 'stateOrProvince', header: 'StateOrProvince' },
        // { field: 'contact', header: 'Contact' },
        // { field: 'salesPersonPrimary', header: 'Primary Sales Person' }


    ]
    selectedColumns = this.headers;
    data: any;
    pageSize: number = 10;
    pageIndex: number = 0;
    first = 0;
    @ViewChild('dt')
    private table: Table;
    lazyLoadEventData: any;
    viewDataGeneralInformation: any;
    
    /*viewData: any[];
    viewDataGeneralInformation: any[];
    customerContacts: any;
    customerContactsColumns = [
        { field: 'tag', header: 'TAG' },
        { field: 'firstName', header: 'First Name' },
        { field: 'lastName', header: 'Last Name' },
        { field: 'contactTitle', header: 'Contact Title' },
        { field: 'email', header: 'Email' },
        { field: 'workPhone', header: 'Work Phone' },
        { field: 'mobilePhone', header: 'Mobile Phone' },
        { field: 'fax', header: 'Fax' },

    ];
    colsaircraftLD: any = [
        { field: "aircraftType", header: "Aircraft" },
        { field: "aircraftModel", header: "Model" },
        { field: "dashNumber", header: "Dash Numbers" },
        { field: "inventory", header: "Inventory" },
        { field: "memo", header: "Memo" }

    ]

    ataHeaders = [
        { field: 'ataChapterName', header: 'ATA Chapter' },
        { field: 'ataSubChapterDescription', header: 'ATA Sub-Chapter' }
    ]
    billingInfoTableHeaders = [
        { field: 'siteName', header: 'Site Name' },
        { field: 'address1', header: 'Address1' },
        { field: 'address2', header: 'Address2' },
        { field: 'address3', header: 'Address3' },
        { field: 'city', header: 'City' },
        { field: 'stateOrProvince', header: 'State/Prov' },
        { field: 'postalCode', header: 'Postal Code' },
        { field: 'country', header: 'Country' }
    ]
    domesticShippingHeaders = [
        { field: 'siteName', header: 'Site Name' },
        { field: 'address1', header: 'Address1' },
        { field: 'address2', header: 'Address2' },
        { field: 'address3', header: 'Address3' },
        { field: 'city', header: 'City' },
        { field: 'stateOrProvince', header: 'State Or Province' },
        { field: 'postalCode', header: 'Postal Code' },
        { field: 'country', header: 'Country' }
    ]
    internationalShippingHeaders = [
        { field: 'exportLicense', header: 'Export License' },
        { field: 'description', header: 'Description' },
        { field: 'isPrimary', header: 'IsDefault' },
        { field: 'startDate', header: 'Start Date' },
        { field: 'expirationDate', header: 'Expiration Date' },
        { field: 'amount', header: 'Amount' }
    ]
    aircraftListDataValues: any;
    ataListDataValues: any;
    billingInfoList: any;
    domesticShippingData: any[];
    internationalShippingData: any;
*/
    filterKeysByValue: object = {};


    constructor(private _route: Router,
        private authService: AuthService,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private _fb: FormBuilder,
        private alertService: AlertService,
        public customerService: CustomerService,
        private dialog: MatDialog,
        private masterComapnyService: MasterComapnyService,
        private accountListingService: AccountListingService) {

    }
    ngOnInit() {
        
    }

    getList(data) {
        // this.filterObjectCreate(data.filters);
        const PagingData = { ...data, filters: listSearchFilterObjectCreation(data.filters) }
       
        // this.customerService.getCustomerAll(PagingData).subscribe(res => {
        //     this.data = res;
        //     console.log('response :', this.data)
        //     if (res.length > 0) {
        //         this.totalRecords = res[0].totalRecords;
        //         this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        //     }

        // })

        this.accountListingService.getAll().subscribe(
            datalist=> {
                this.data = datalist.accountList;
                console.log('data table :', datalist)
                if (datalist.length > 0) {
                    this.totalRecords = datalist.filter(items => items).length;
                    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
                }
            },
            error => {
                console.log('error in getting information')
            }
        );


    }






    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        this.table.reset();
        // this.getList();
        // this.table.sortOrder = 0;
        // this.table.sortField = '';


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

    filterData(data) {
        console.log(data);
    }
    changeStatus(rowData) {
        this.customerService.updateActionforActive(rowData, this.userName).subscribe(res => {
            this.alertService.showMessage("Success", `Successfully Updated Status`, MessageSeverity.success);
        })

    }
    edit(rowData) {
        const { customerId } = rowData.id;
        console.log('rowData :', rowData)
        console.log('id :', rowData.id)
        this._route.navigateByUrl(`generalledgermodule/generalledgerpage/app-account-listing-create/${rowData.id}`);
    }
    delete(rowData) {
        console.log('rowData dele :', rowData)
        // this.customerService.updateListstatus(rowData.customerId).subscribe(res => {
        //     this.getList(this.lazyLoadEventData);
        //     this.alertService.showMessage("Success", `Successfully Deleted Record`, MessageSeverity.success);

        // })
    }

    /*
    viewSelectedRow(rowData) {
        const { customerId } = rowData;
        this.customerService.getCustomerdataById(customerId).subscribe(res => {
            this.viewDataGeneralInformation = res[0];
        })
        this.getAllCustomerContact(customerId);
        this.getAircraftMappedDataByCustomerId(customerId);
        this.getMappedATAByCustomerId(customerId);
        this.getBillingDataById(customerId);
        this.getDomesticShippingByCustomerId(customerId);
        this.getInternationalShippingByCustomerId(customerId);

    }

    getAllCustomerContact(customerId) {
        // get Customer Contatcs 
        this.customerService.getContacts(customerId).subscribe(res => {
            this.customerContacts = res[0]
        })
    }

    getAircraftMappedDataByCustomerId(customerId) {
        // const id = this.savedGeneralInformationData.customerId;
        this.customerService.getMappedAirCraftDetails(customerId).subscribe(res => {
            this.aircraftListDataValues = res;
        })
    }
    getMappedATAByCustomerId(customerId) {
        // const id = this.savedGeneralInformationData.customerId;
        this.customerService.getATAMappedByCustomerId(customerId).subscribe(res => {
            this.ataListDataValues = res;
            console.log(res);

        })
    }
    getBillingDataById(customerId) {
        this.customerService.getCustomerBillViaDetails(customerId).subscribe(res => {
            this.billingInfoList = res[0]
        })
    }


    // get domestic shipping by customer Id 
    getDomesticShippingByCustomerId(customerId) {
        // const id = this.savedGeneralInformationData.customerId;
        this.customerService.getCustomerShipAddressGet(customerId).subscribe(res => {
            console.log(res);
            this.domesticShippingData = res[0];
        })
    }

    getInternationalShippingByCustomerId(customerId) {

        // const id = this.savedGeneralInformationData.customerId;

        this.customerService.getInternationalShippingByCustomerId(customerId, 0, 20).subscribe(res => {
            console.log(res);
            this.internationalShippingData = res.paginationList;
            // this.totalRecordsForInternationalShipping = res.totalRecordsCount;
        })



    }*/
    globalSearch(value) {
        this.pageIndex = 0;
        this.customerService.getGlobalSearch(value, this.pageIndex, this.pageSize).subscribe(res => {
            this.data = res;
            if (res.length > 0) {
                this.totalRecords = res[0].totalRecords;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }
        })
    }
    getAuditHistoryById(rowData) {
    }
}