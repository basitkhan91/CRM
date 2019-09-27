import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import * as $ from 'jquery';
import { MenuItem, LazyLoadEvent } from 'primeng/api';//bread crumb
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';
import { ManufacturerService } from '../../services/manufacturer.service';
import { DataTableModule } from 'primeng/datatable';
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { SelectButtonModule } from 'primeng/selectbutton'
import { InputTextModule } from 'primeng/inputtext'
import { MultiSelectModule } from 'primeng/multiselect'
import { Action } from 'rxjs/scheduler/Action';
import { AuditHistory } from '../../models/audithistory.model';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { Manufacturer } from '../../models/manufacturer.model';
import { SingleScreenAuditDetails } from '../../models/single-screen-audit-details.model';
import { getObjectByValue } from '../../generic/autocomplete';


@Component({
    selector: 'app-manufacturer',
    templateUrl: './manufacturer.component.html',
    styleUrls: ['./manufacturer.component.scss'],
    animations: [fadeInOut]

})
/** manufacturer1 component*/
export class ManufacturerComponent implements OnInit, AfterViewInit {
    manufacturerPaginationList: any[] = [];
    totelPages: number;
    manufacturer = [];
    updatedByInputFieldValue: any;
    createdByInputFieldValue: any;
    nameInputFieldValue: any;
    commentsInputFieldValue: any;
    matvhMode: any;
    field: any;
    event: any;
    auditHisory: any[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    cols: any[];
    selectedColumns: any[];
    displayedColumns = ['name', 'comments', 'createdDate', 'companyName'];
    dataSource: MatTableDataSource<any>;
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    public sourcemanufacturer: any = {}
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    title: string = "Create";
    id: number;
    namecolle: any[] = [];
    actionamecolle: any[] = [];
    errorMessage: any;
    modal: NgbModalRef;
    /** Actions ctor */
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    filteredBrands: any[];
    localCollection: any[] = [];
    selectedColumn: any[];
    Active: string = "Active";
    allManufacturer: any[];
    manufacturerId: any;
    name: string = "";
    sourceAction: any;
    integrationName: any;
    selectedManufacturer: any;
    //disablesave: boolean=false;
    allManufacturerInfo: any[] = [];
    localmanufacturer: any[];
    comments: any = " ";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    manufactureViewField: any = {};
    disableSave: boolean = false;
    AuditDetails: SingleScreenAuditDetails[];

    pageSearch: { query: any; field: any; };
    first: number;
    rows: number;
    paginatorState: any;
    manufacturerPagination: Manufacturer[];//added
    totalRecords: number;
    loading: boolean;
    /** manufacturer1 ctor */
    constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: ManufacturerService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {

    }
    ngAfterViewInit(): void {

    }
    ngOnInit(): void {
        this.loadData();
        this.cols = [
            { field: 'name', header: 'Manufacturer Name' },
            { field: 'comments', header: 'Memo' },
            // { field: 'createdBy', header: 'Created By' },
            //{ field: 'updatedBy', header: 'Updated By' },
            //{ field: 'createdDate', header: 'Created Date' },
            //{ field: 'updatedDate', header: 'Updated Date' }
        ];
        this.selectedColumns = this.cols;
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-manufacturer';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);

    }
    validateRecordExistsOrNot(field: string, currentInput: any, originalData: any) {
        console.log(field, currentInput, originalData)
        if ((field !== '' || field !== undefined) && (currentInput !== '' || currentInput !== undefined) && (originalData !== undefined)) {
            const data = originalData.filter(x => {
                return x[field].toLowerCase() === currentInput.toLowerCase()
            })
            return data;
        }
    }
    editValueAssignByCondition(field: any, value: any) {
        console.log(field, value)
        if ((value !== undefined) && (field !== '' || field !== undefined)) {

            if (typeof (value) === 'string') {
                return value
            }
            else {
                return this.getValueFromObjectByKey(field, value)
            }
        }
    }
    getValueFromObjectByKey(field: string, object: any) {
        console.log(field, object)
        if ((field !== '' || field !== undefined) && (object !== undefined)) {
            return object[field];
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
        this.applyFilter(this.dataSource.filter);
    }

    open(content) {
        this.disableSave = false;
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourcemanufacturer = new Manufacturer();
        this.sourcemanufacturer.name= "";
        this.sourcemanufacturer.isActive = true;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openDelete(content, row) {
        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourcemanufacturer = row;
        this.manufactureViewField.name = row.name;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    ManufacturerHandler(field, value) {
        value = value.trim();
        const exists = this.validateRecordExistsOrNot(field, value, this.allManufacturerInfo);
        // console.log(exists);
        if (exists.length > 0) {
            this.disableSave = true;
        }
        else {
            this.disableSave = false;
        }
    }

    Manufacturerdescription(event) {
        //
        this.disableSave = true;
    }
    editItemAndCloseModel() {

        this.isSaving = true;
        if (this.isEditMode == false) {
            this.sourcemanufacturer.createdBy = this.userName;
            this.sourcemanufacturer.updatedBy = this.userName;
            this.sourcemanufacturer.masterCompanyId = 1;
            this.sourcemanufacturer.name = this.editValueAssignByCondition('name', this.sourcemanufacturer.name);
            this.workFlowtService.newManufacturer(this.sourcemanufacturer).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {

            this.sourcemanufacturer.updatedBy = this.userName;
            this.sourcemanufacturer.name = this.editValueAssignByCondition('name', this.sourcemanufacturer.name);
            this.sourcemanufacturer.masterCompanyId = 1;
            this.workFlowtService.updateManufacturer(this.sourcemanufacturer).subscribe(
                response => this.saveCompleted(this.sourcemanufacturer),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }
    private saveSuccessHelper(role?: any) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

        this.loadData();

    }
    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourcemanufacturer.updatedBy = this.userName;
        this.workFlowtService.deleteManufacturer(this.sourcemanufacturer.manufacturerId).subscribe(
            response => this.saveCompleted(this.sourcemanufacturer),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }
    private onmanufacturerSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.totalRecords = allWorkFlows.length;
        this.allManufacturerInfo = allWorkFlows;
        //console.log(this.allActions);
    }
    filtermanufacturer(event) {
        this.localCollection = this.allManufacturerInfo;

        if (event.query !== undefined && event.query !== null) {
            const name = [...this.allManufacturerInfo.filter(x => {
                return x.name.toLowerCase().includes(event.query.toLowerCase())
            })]
            this.localCollection = name;
        }
    }

    openEdit(content, row) {
        this.isEditMode = true;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.disableSave = false;
        this.sourcemanufacturer = {...row};
        this.sourcemanufacturer.name = getObjectByValue('name', row.name, this.allManufacturerInfo)
        //this.comments = this.sourcemanufacturer.comments;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openView(content, row) {
        this.sourcemanufacturer = row;
        this.manufactureViewField.name = row.name;
        this.manufactureViewField.comments = row.comments;
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

    openHist(content, row) {
        this.sourcemanufacturer = row;
        this.workFlowtService.historyManufacturer(this.sourcemanufacturer.manufacturerId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));
    }
    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }
    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourcemanufacturer = rowData;
            this.sourcemanufacturer.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourcemanufacturer.isActive == false;
            this.loadMasterCompanies();
            this.sourcemanufacturer.masterCompanyId = 1;

            this.workFlowtService.updateManufacturer(this.sourcemanufacturer).subscribe(

                response => this.saveCompleted(this.sourcemanufacturer),
                error => this.saveFailedHelper(error));
        }
        else {
            this.sourcemanufacturer = rowData;
            this.sourcemanufacturer.updatedBy = this.userName;
            this.Active = "Active";
            this.sourcemanufacturer.isActive == true;
            this.loadMasterCompanies();
            this.sourcemanufacturer.masterCompanyId = 1;
            this.workFlowtService.updateManufacturer(this.sourcemanufacturer).subscribe(

                response => this.saveCompleted(this.sourcemanufacturer),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

    }

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getWorkFlows().subscribe(
            results => this.onmanufacturerSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
   
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
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    showAuditPopup(template, id): void {
        debugger;
        this.getManufacturerAuditDetails(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    getManufacturerAuditDetails(Id: number): void {
        this.workFlowtService.getManufacturerAuditDetails(Id).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["manufacturerAuditId", "manufacturerId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }

    // updatePaginatorState() //need to pass this Object after update or Delete to get Server Side pagination
    // {
    //     this.paginatorState = {
    //         rows: this.rows,
    //         first: this.first
    //     }
    //     if (this.paginatorState) {
    //         this.loadManufacturer(this.paginatorState);
    //     }
    // }

    // loadManufacturer(event: LazyLoadEvent) //when page initilizes it will call this method
    // {
    //     this.loading = true;
    //     this.rows = event.rows;
    //     this.first = event.first;
    //     if (this.field)
    //     {
    //         this.manufacturer.push({
    //             Name: this.nameInputFieldValue,
    //             Comments: this.commentsInputFieldValue,
    //             CreatedBy: this.createdByInputFieldValue,
    //             UpdatedBy: this.updatedByInputFieldValue,
    //             first: this.first,
    //             page: 10,
    //             pageCount: 10,
    //             rows: this.rows,
    //             limit: 5
    //         })
    //         if (this.manufacturer) {
    //             this.workFlowtService.getServerPages(this.manufacturer[this.manufacturer.length - 1]).subscribe( //we are sending event details to service
    //                 pages => {
    //                     this.manufacturerPaginationList = pages;
    //                     this.manufacturerPagination = this.manufacturerPaginationList[0].manufacturerList;
    //                     this.totalRecords = this.manufacturerPaginationList[0].totalRecordsCount;
    //                     this.totelPages = Math.ceil(this.totalRecords / this.rows);
    //                 });
    //         }
    //         else {
    //         }
    //     }
    //     else {
    //         setTimeout(() => {
    //             if (this.allManufacturerInfo) {
    //                 this.workFlowtService.getServerPages(event).subscribe( //we are sending event details to service
    //                     pages => {
    //                         this.manufacturerPaginationList = pages;
    //                         this.manufacturerPagination = this.manufacturerPaginationList[0].manufacturerList;
    //                         this.totalRecords = this.manufacturerPaginationList[0].totalRecordsCount;
    //                         this.totelPages = Math.ceil(this.totalRecords / this.rows);
    //                     });
    //                 this.loading = false;
    //             }
    //         }, 1000);
    //     }

    // }

    // inputFiledFilter(event, filed, matchMode) {
    //     this.first = 0;
    //     this.event = event;
    //     this.field = filed;
    //     this.matvhMode = matchMode;

    //     if (filed == 'name') {
    //         this.nameInputFieldValue = event;
    //     }
    //     if (filed == 'comments') {
    //         this.commentsInputFieldValue = event;
    //     }
    //     if (filed == 'createdBy') {
    //         this.createdByInputFieldValue = event;
    //     }
    //     if (filed == 'updatedBy') {
    //         this.updatedByInputFieldValue = event;
    //     }
    //     this.manufacturer.push({
    //         Name: this.nameInputFieldValue,
    //         Comments: this.commentsInputFieldValue,
    //         CreatedBy: this.createdByInputFieldValue,
    //         UpdatedBy: this.updatedByInputFieldValue,
    //         first: this.first,
    //         page: 10,
    //         pageCount: 10,
    //         rows: this.rows,
    //         limit: 5
    //     })
    //     if (this.manufacturer) {
    //         this.workFlowtService.getServerPages(this.manufacturer[this.manufacturer.length - 1]).subscribe( //we are sending event details to service
    //             pages => {
    //                 this.manufacturerPaginationList = pages;
    //                 this.manufacturerPagination = this.manufacturerPaginationList[0].manufacturerList;
    //                 this.totalRecords = this.manufacturerPaginationList[0].totalRecordsCount;
    //                 this.totelPages = Math.ceil(this.totalRecords / this.rows);
    //             });
    //     }
    //     else {
    //     }
    // }
}