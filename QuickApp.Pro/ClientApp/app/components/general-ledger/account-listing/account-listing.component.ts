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
import { TableModule, Table } from 'primeng/table';
import { LazyLoadEvent, SortEvent, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Router } from '@angular/router';
import { Globals } from '../../../globals';
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
        { field: 'oldAccountCode', header: 'Old Account Code' },
        { field: 'accountCode', header: 'Account Code' },
        { field: 'accountName', header: 'Account Name' },     
        { field: 'accountType', header: 'Account Type' },
        { field: 'accountDescription', header: 'Account Description' },
        { field: 'isActive', header: 'Active' },
        { field: 'leafNodeName', header: 'Leaf Node Name' }        
    ]
    selectedColumns = this.headers;
    data: any;
    pageSize: number = 10;
    pageIndex: number = 0;
    first = 0;
    @ViewChild('dt')
    private table: Table;
    lazyLoadEventData: any;   
    filterKeysByValue: object = {};
    home: any;
    breadcrumbs: MenuItem[];
    filteredText: string;

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
        this.breadcrumbs = [
            { label: 'Accounting' },
            { label: 'GL Account List' },
        ];
    }

    getList(data) {
       
        const PagingData = { ...data, filters: listSearchFilterObjectCreation(data.filters) }    
        this.accountListingService.getAll().subscribe(
            datalist=> {
                this.data = datalist;
                //console.log('data table :', datalist)
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
        if (this.filteredText != "" && this.filteredText != null && this.filteredText != undefined) {
            this.globalSearch(this.filteredText);
        }
        else {
            this.table.reset();
        }        
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
        this._route.navigateByUrl(`generalledgermodule/generalledgerpage/app-account-listing-create/${rowData.glAccountId}`);
    }


    delete(rowData) {        
        this.accountListingService.deleteGlAccountById(rowData.glAccountId).subscribe(response => {
            console.log('response delete :', response)
            this.getList(rowData)
        },
        error => {
            console.log('error in Delete GL account by Id')
        })      
    }

    globalSearch(value) {
        this.pageIndex = 0;
        this.filteredText = value;
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