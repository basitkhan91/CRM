import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { UnitOfMeasureService } from '../../services/unitofmeasure.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { UnitOfMeasure } from '../../models/unitofmeasure.model';
import { AuditHistory } from '../../models/audithistory.model';
import { AuthService } from '../../services/auth.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuItem, LazyLoadEvent } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails } from '../../models/single-screen-audit-details.model';

@Component({
    selector: 'app-unit-of-measure',
    templateUrl: './unit-of-measure.component.html',
    styleUrls: ['./unit-of-measure.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class UnitOfMeasureComponent implements OnInit, AfterViewInit {
    unitOfMeasurePaginationList: any[] = [];
    totelPages: number;
    updatedByInputFieldValue: any;
    createdByInputFieldValue: any;
    unitOfMeasure = [];
    memoInputFieldValue: any;
    standardInputFieldValue: any;
    shortNameInputFieldValue: any;
    descriptionInputFieldValue: any;
    matvhMode: any;
    field: any;
    event: any;
    paginatorState: { rows: number; first: number; };
    totalRecords: number;
    first: number;
    rows: number;
    loading: boolean;
    selectedActionName: any;
    actionamecolle: any[] = [];
    disableSave: boolean = false;
    unitofmeasure_Name: any = "";
    shortName: any = "";
    standard: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    AuditDetails: SingleScreenAuditDetails[];
    unitOfMeasurePagination: UnitOfMeasure[];//added

    isSaving: boolean;
    ngOnInit(): void {
        this.loadData();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-unit-of-measure';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    Active: string = "Active";
    displayedColumns = ['unitofmeasureId', 'description', 'shortname', 'standard', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<UnitOfMeasure>;
    allUnitOfMeasureinfo: UnitOfMeasure[] = [];
    sourceAction: UnitOfMeasure;
    allComapnies: MasterCompany[] = [];
    public auditHisory: AuditHistory[] = [];
    loadingIndicator: boolean;
    actionForm: FormGroup;
    title: string = "Create";
    id: number;
    errorMessage: any;
    cols: any[];
    selectedColumns: any[];
    modal: NgbModalRef;
    allunitData: any;
    selectedColumn: UnitOfMeasure[];
    unitName: string;
    filteredBrands: any[];
    localCollection: any[] = [];


    private isEditMode: boolean = false;
    private isDelete: boolean = false;

    constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public unitofmeasureService: UnitOfMeasureService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.sourceAction = new UnitOfMeasure();

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    public allWorkFlows: UnitOfMeasure[] = [];
    private loadData() {    
        this.unitofmeasureService.getAllUnitofMeasureList().subscribe(data => {
            this.allunitData = data[0].columHeaders;
            this.allUnitOfMeasureinfo = data[0].columnData;
            console.log(this.allUnitOfMeasureinfo);
            this.totalRecords = this.allUnitOfMeasureinfo.length;         
            this.cols = [
                console.log(this.allunitData),
                this.selectedColumns = this.allunitData
            ];
        }
        );
    }

    // private loadData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.unitofmeasureService.getUnitOfMeasureList().subscribe(
    //         results => this.onDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    //     this.cols = [
    //         //{ field: 'provisionId', header: 'Provison Id' },
    //         { field: 'description', header: 'Unit of Measure' },
    //         { field: 'shortName', header: 'Short Name' },
    //         { field: 'standard', header: 'Standard' },
    //         { field: 'memo', header: 'Memo' },
    //         { field: 'createdBy', header: 'Created By' },
    //         { field: 'updatedBy', header: 'Updated By' },
    //       //  { field: 'updatedDate', header: 'Updated Date' },
    //        // { field: 'createdDate', header: 'Created Date' }
    //     ];
    //     this.selectedColumns = this.cols;
    // }
    // RemoveIsActive(columHeaders,columnData){
    //    const response = this.allunitData;
    //    columHeaders = response.filter(x=>{
    //        x.field
    //    })
    // }
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
    // private onDataLoadSuccessful(getUnitOfMeasureList) {
    //     // alert('success');
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = getUnitOfMeasureList;      
    //     this.totalRecords = getUnitOfMeasureList.length;//Adding for Pagination
    //     this.allUnitOfMeasureinfo = getUnitOfMeasureList;
        

    // }

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
        this.isDelete = false;
        this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new UnitOfMeasure();
        this.sourceAction.isActive = true;
        this.unitName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    openDelete(content, row) {

        this.isEditMode = false;
        this.isDelete= true;
        this.sourceAction = row;
        this.unitofmeasure_Name = row.description;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openEdit(content, row) {
        this.isEditMode = true;
        this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = row;
        this.unitName = this.sourceAction.description;
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
        //this.isSaving = true;
        // debugger;
        this.unitofmeasureService.historyUnitOfMeasure(this.sourceAction.unitOfMeasureId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));
    }

    openView(content, row) {
        this.sourceAction = row;
        this.unitofmeasure_Name = row.description;
        this.shortName = row.shortName;
        this.standard = row.standard;
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
            if (event == this.actionamecolle[i][0].unitName) {
                //alert("Action Name already Exists");
                this.disableSave = true;
                this.selectedActionName = event;

            }
        }
    }

    filterUnitOfMeasures(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allUnitOfMeasureinfo.length; i++) {
            let unitName = this.allUnitOfMeasureinfo[i].description;
            if (unitName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {

                this.actionamecolle.push([{
                    "unitOfMeasureId": this.allUnitOfMeasureinfo[i].unitOfMeasureId,
                    "unitName": unitName
                }]),
                    this.localCollection.push(unitName);
            }
        }
    }


    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceAction.isActive == false;
            this.loadMasterCompanies();
            this.sourceAction.masterCompanyId = 1;
            this.unitofmeasureService.updateUnitOfMeasure(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive == true;
            this.sourceAction.masterCompanyId = 1;
            this.unitofmeasureService.updateUnitOfMeasure(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

    }


    SaveandEditUOM() {
        // debugger;
        this.isSaving = true;
        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.unitName;     
            this.sourceAction.isDelete = this.isDelete;       
            this.sourceAction.masterCompanyId = 1;
            this.unitofmeasureService.newUnitOfMeasure(this.sourceAction).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.unitName;
            this.sourceAction.masterCompanyId = 1;
            this.unitofmeasureService.updateUnitOfMeasure(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.unitofmeasureService.deleteUnitOfMeasure(this.sourceAction.unitOfMeasureId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    dismissModel() {
        this.isDelete = false;
        this.isEditMode = false;
        this.modal.close();
    }

    private saveCompleted(user?: UnitOfMeasure) {
        this.isSaving = false;

        if (this.isDelete == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDelete = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

        }

        //this.updatePaginatorState();
        this.loadData();
    }

    private saveSuccessHelper(role?: UnitOfMeasure) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

        //this.updatePaginatorState();
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
        debugger;
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    showAuditPopup(template, id): void {
        debugger;
        this.getUnitOfMeasureAuditDetails(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    getUnitOfMeasureAuditDetails(Id: number): void {
        this.unitofmeasureService.getUnitOfWorkAuditDetails(Id).subscribe(audits => {
            console.log(audits);
            if (audits != null)
                if (audits.length > 0) {
                    this.AuditDetails = audits;
                    this.AuditDetails[0].ColumnsToAvoid = ["unitOfMeasureAuditId", "unitOfMeasureId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
                }
        });
    }

    // loadUnitOfMeasure(event: LazyLoadEvent) //when page initilizes it will call this method
    // {
    //     this.loading = true;
    //     this.rows = event.rows;
    //     this.first = event.first;
    //     if (this.field)
    //     {
    //         this.unitOfMeasure.push({
    //             Description: this.descriptionInputFieldValue,
    //             ShortName: this.shortNameInputFieldValue,
    //             Standard: this.standardInputFieldValue,
    //             Memo: this.memoInputFieldValue,
    //             first: this.first,
    //             page: 10,
    //             pageCount: 10,
    //             rows: this.rows,
    //             limit: 5
    //         })
    //         if (this.unitOfMeasure)
    //         {
    //             this.unitofmeasureService.getServerPages(this.unitOfMeasure[this.unitOfMeasure.length - 1]).subscribe( //we are sending event details to service
    //                 pages => {
    //                     if (pages.length > 0) {
    //                         this.unitOfMeasurePaginationList = pages;
    //                         this.unitOfMeasurePagination = this.unitOfMeasurePaginationList[0].unitOfMeasureList;
    //                         this.totalRecords = this.unitOfMeasurePaginationList[0].totalRecordsCount;
    //                         this.totelPages = Math.ceil(this.totalRecords / this.rows);
    //                     }
    //                 });
    //         }
    //     }

    //     else
    //     {
    //         setTimeout(() => {
    //             if (this.allUnitOfMeasureinfo) {
    //                 this.unitofmeasureService.getServerPages(event).subscribe( //we are sending event details to service
    //                     pages => {
    //                         this.unitOfMeasurePaginationList = pages;
    //                         this.unitOfMeasurePagination = this.unitOfMeasurePaginationList[0].unitOfMeasureList;
    //                         this.totalRecords = this.unitOfMeasurePaginationList[0].totalRecordsCount;
    //                         this.totelPages = Math.ceil(this.totalRecords / this.rows);

    //                     });
    //                 this.loading = false;
    //             }
    //         }, 1000);
    //         this.loading = false;
    //     }


    // }

    // updatePaginatorState() //need to pass this Object after update or Delete to get Server Side pagination
    // {
    //     this.paginatorState = {
    //         rows: this.rows,
    //         first: this.first
    //     }
    //     if (this.paginatorState) {
    //         this.loadUnitOfMeasure(this.paginatorState);
    //     }
    // }


    // inputFiledFilter(event, filed, matchMode) {
    //     this.first = 0;
    //     this.event = event;
    //     this.field = filed;
    //     this.matvhMode = matchMode;

    //     if (filed == 'description') {
    //         this.descriptionInputFieldValue = event;
    //     }
    //     if (filed == 'shortName') {
    //         this.shortNameInputFieldValue = event;
    //     }
    //     if (filed == 'standard') {
    //         this.standardInputFieldValue = event;
    //     }
    //     if (filed == 'memo') {
    //         this.memoInputFieldValue = event;
    //     }
    //     if (filed == 'createdBy') {
    //         this.createdByInputFieldValue = event;
    //     }
    //     if (filed == 'updatedBy') {
    //         this.updatedByInputFieldValue = event;
    //     }
    //     this.unitOfMeasure.push({
    //         Description: this.descriptionInputFieldValue,
    //         ShortName: this.shortNameInputFieldValue, 
    //         Standard: this.standardInputFieldValue,
    //         Memo: this.memoInputFieldValue,
    //         CreatedBy: this.createdByInputFieldValue,
    //         UpdatedBy: this.updatedByInputFieldValue,
    //         first: this.first,
    //         page: 10,
    //         pageCount: 10,
    //         rows: this.rows,
    //         limit: 5
    //     })
    //     if (this.unitOfMeasure) {
    //         this.unitofmeasureService.getServerPages(this.unitOfMeasure[this.unitOfMeasure.length - 1]).subscribe( //we are sending event details to service
    //             pages => {
    //                 this.unitOfMeasurePaginationList = pages;
    //                 this.unitOfMeasurePagination = this.unitOfMeasurePaginationList[0].unitOfMeasureList;
    //                 this.totalRecords = this.unitOfMeasurePaginationList[0].totalRecordsCount;
    //                 this.totelPages = Math.ceil(this.totalRecords / this.rows);
    //             });
    //     }
    //     else {
    //     }
    // }
}