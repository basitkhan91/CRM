import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { TaxTypeService } from '../../services/taxtype.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { TaxType } from '../../models/taxtype.model';
import { AuditHistory } from '../../models/audithistory.model';
import { AuthService } from '../../services/auth.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';

import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuItem, LazyLoadEvent } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails } from '../../models/single-screen-audit-details.model';
import { validateRecordExistsOrNot, selectedValueValidate, editValueAssignByCondition, getObjectByValue, getObjectById } from '../../generic/autocomplete';
import { ConfigurationService } from '../../services/configuration.service';
import { ModeOfOperation } from "../../models/ModeOfOperation.enum";

@Component({
    selector: 'app-tax-type',
    templateUrl: './tax-type.component.html',
    styleUrls: ['./tax-type.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class TaxTypeComponent implements OnInit {
    // updatedByInputFieldValue: any;
    // taxType = [];
    // event: any;
    // standardInputFieldValue: any;
    // createdByInputFieldValue: any;
    // descriptionInputFieldValue: any;
    // matvhMode: any;
    // field: any;
    // memoInputFieldValue: any;
    // actionamecolle: any[] = [];
    // disableSave: boolean = false;
    // selectedActionName: any;
    // taxType_Name: any = "";
    // memo: any = "";
    // createdBy: any = "";
    // updatedBy: any = "";
    // createdDate: any = "";
    // updatedDate: any = "";
    // ngOnInit(): void {
    //     this.loadData();
    //     this.breadCrumb.currentUrl = '/singlepages/singlepages/app-tax-type';
    //     this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    // }
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ViewChild(MatSort) sort: MatSort;
    // Active: string = "Active";
    // displayedColumns = ['taxTypeId', 'description', 'createdBy', 'By', 'updatedDate', 'createdDate'];
    // dataSource: MatTableDataSource<TaxType>;
    // allTaxTypes: TaxType[] = [];
    // allComapnies: MasterCompany[] = [];
    // private isSaving: boolean;
    // public sourceAction: TaxType;
    // public auditHisory: AuditHistory[] = [];
    // private bodyText: string;
    // loadingIndicator: boolean;
    // closeResult: string;
    // selectedColumn: TaxType[];
    // selectedColumns: any[];
    // cols: any[];
    // title: string = "Create";
    // id: number;
    // errorMessage: any;
    // modal: NgbModalRef;

    // description: string;
    // filteredBrands: any[];
    // localCollection: any[] = [];
    // AuditDetails: SingleScreenAuditDetails[];
    // /** Actions ctor */

    // private isEditMode: boolean = false;
    // private isDeleteMode: boolean = false;

    // pageSearch: { query: any; field: any; };
    // first: number;
    // rows: number;
    // paginatorState: any;

    // taxRatePagination: TaxType[];//added
    // totalRecords: number;
    // loading: boolean;


    originalData: any;
    isEdit: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    currentModeOfOperation: ModeOfOperation;
    headers = [
        { field: 'description', header: 'Certification Type' },
        { field: 'memo', header: 'Memo' },
    ]
    selectedColumns = this.headers;
    formData = new FormData()
    @ViewChild('dt')

    private table: Table;
    auditHistory: any[] = [];
    disableSaveTaxtype: boolean = false;
    taxTypeList: any;


    new = {
        description: "",
        masterCompanyId: 1,
        isActive: true,
        memo: "",
    }
    addNew = { ...this.new };
    selectedRecordForEdit: any;
    viewRowData: any;
    selectedRowforDelete: any;
    // originalData: any;
    existingRecordsResponse = []

    constructor(private breadCrumb: SingleScreenBreadcrumbService,
        private authService: AuthService,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private _fb: FormBuilder,
        private alertService: AlertService,
        public taxTypeService: TaxTypeService,
        private dialog: MatDialog,
        private configurations: ConfigurationService,
        private masterComapnyService: MasterComapnyService) {


    }



    ngOnInit(): void {
        this.getList();
        // this.loadData();
        // this.cols = [
        //    // { field: 'itemGroupId', header: 'IGID' },

        //     // { field: 'createdBy', header: 'Created By' },
        //     // { field: 'updatedBy', header: 'Updated By' },
        //     //{ field: 'updatedDate', header: 'Updated Date' },
        //     //{ field: 'createdDate', header: 'Created Date' }
        // ];
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-tax-type';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        // this.selectedColumns = this.cols;
    }



    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        this.table.reset();

        // this.table.sortOrder = 0;
        // this.table.sortField = '';

        this.getList();
    }

    customExcelUpload() {
        // const file = event.target.files;

        // console.log(file);
        // if (file.length > 0) {

        //     this.formData.append('file', file[0])
        //     this.unitofmeasureService.UOMFileUpload(this.formData).subscribe(res => {
        //         event.target.value = '';

        //         this.formData = new FormData();
        //         this.existingRecordsResponse = res;
        //         this.getList();
        //         this.alertService.showMessage(
        //             'Success',
        //             `Successfully Uploaded  `,
        //             MessageSeverity.success
        //         );

        //     })
        // }

    }
    sampleExcelDownload() {
        // const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=CertificationType&fileName=certificationType.xlsx`;

        // window.location.assign(url);
    }

    getList() {
        this.taxTypeService.getWorkFlows().subscribe(res => {
            const responseData = res[0];
            // this.uomHeaders = responseData.columHeaders;
            // this.selectedColumns = responseData.columHeaders;
            this.originalData = responseData;
            this.totalRecords = responseData.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        })
    }
    changePage(event: { first: any; rows: number }) {
        console.log(event);
        // this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }


    checkTaxTypeExists(field, value) {
        console.log('this.selectedRecordForEdit', this.selectedRecordForEdit);
        const exists = validateRecordExistsOrNot(field, value, this.originalData, this.selectedRecordForEdit);
        console.log(exists);
        if (exists.length > 0) {
            this.disableSaveTaxtype = true;
        }
        else {
            this.disableSaveTaxtype = false;
        }

    }
    filterTaxType(event) {
        this.taxTypeList = this.originalData;

        const certificationData = [...this.originalData.filter(x => {
            return x.description.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.taxTypeList = certificationData;
    }
    selectedTaxType(object) {
        console.log('selectedTaxType', object);
        const exists = selectedValueValidate('description', object, this.selectedRecordForEdit)
        if (!this.isEdit || this.isEdit && object.taxTypeId != this.selectedRecordForEdit.taxTypeId) {
            this.disableSaveTaxtype = !exists;
        }
        else {
            this.disableSaveTaxtype = false;
        }
        
    }



    save() {
        const data = {
            ...this.addNew, createdBy: this.userName, updatedBy: this.userName,
            description: editValueAssignByCondition('description', this.addNew.description),
            // unitName: editValueAssignByCondition('description', this.addNew.unitName)
        };

        if (!this.isEdit) {
            this.taxTypeService.newAction(data).subscribe(() => {
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Added Tax Type  Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.taxTypeService.updateAction(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Added  Updated Tax Type Successfully  `,
                    MessageSeverity.success
                );
            })
        }
    }

    resetForm() {
        this.isEdit = false;
        this.selectedRecordForEdit = undefined;

        this.addNew = { ...this.new };
    }


    edit(rowData) {
        console.log(rowData);
        this.isEdit = true;
        this.disableSaveTaxtype = false;



        this.addNew = {
            ...rowData,
            description: getObjectById('taxTypeId', rowData.taxTypeId, this.originalData),
        };


        this.selectedRecordForEdit = { ...this.addNew }

    }

    changeStatus(rowData) {
        console.log(rowData);
        const data = { ...rowData }
        this.taxTypeService.updateAction(data).subscribe(() => {
            // this.getUOMList();
            this.alertService.showMessage(
                'Success',
                `Updated Status Successfully  `,
                MessageSeverity.success
            );
        })

    }
    viewSelectedRow(rowData) {
        console.log(rowData);
        this.viewRowData = rowData;
    }
    resetViewData() {
        this.viewRowData = undefined;
    }
    delete(rowData) {
        this.selectedRowforDelete = rowData;

    }
    deleteConformation(value) {
        if (value === 'Yes') {
            this.taxTypeService.deleteAcion(this.selectedRowforDelete.taxTypeId).subscribe(() => {
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Deleted  Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    //Open the audit history modal.
    showHistory(rowData): void {
        //this.currentModeOfOperation = ModeOfOperation.Audit;
        //this.taxTypeService.getTaxTypeAudit(rowData.taxTypeId).subscribe(audits => {
        //    if (audits[0].length > 0) {
        //        this.auditHistory = audits[0];
        //    }
        //});
        //console.log(this.auditHistory);

        this.taxTypeService.getTaxTypeAudit(rowData.taxTypeId).subscribe(res => {
            this.auditHistory = res;
        })
    }

    onBlur(event) {
        //console.log(event.target.value);
        //console.log(this.addNew);
        
        const value = event.target.value;
        this.disableSaveTaxtype = false;
        for (let i = 0; i < this.originalData.length; i++) {
            let description = this.originalData[i].description;
            let taxTypeId = this.originalData[i].taxTypeId;
            if (description.toLowerCase() == value.toLowerCase()) {
                if (!this.isEdit) {
                    this.disableSaveTaxtype = true;
                }
                else if (taxTypeId != this.selectedRecordForEdit.taxTypeId) {
                    this.disableSaveTaxtype = true;
                }
                else {
                    this.disableSaveTaxtype = false;
                }
                console.log('description :', description);
                break;
            }
        }

    }

    // getAuditHistoryById(rowData) {
    //     this.itemGroupService.historyAcion(rowData.itemGroupId).subscribe(res => {
    //         this.auditHistory = res;
    //     })
    // }
    getColorCodeForHistory(i, field, value) {
        const data = this.auditHistory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }


    // ngAfterViewInit() {
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    // }
    // public allWorkFlows: TaxType[] = [];

    // private loadData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.taxTypeService.getWorkFlows().subscribe(
    //         results => this.onDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    //     this.cols = [
    //         { field: 'description', header: 'Tax Type' },
    //         { field: 'memo', header: 'Memo' },
    //         { field: 'createdBy', header: 'Created By' },
    //         { field: 'updatedBy', header: 'Updated By' },
    //         //{ field: 'updatedDate', header: 'Updated Date' },
    //         //{ field: 'createdDate', header: 'createdDate' }

    //     ];

    //     this.selectedColumns = this.cols;

    // }

    // private loadMasterCompanies() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.masterComapnyService.getMasterCompanies().subscribe(
    //         results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    // }

    // public applyFilter(filterValue: string) {
    //     this.dataSource.filter = filterValue;
    // }

    // private refresh() {
    //     // Causes the filter to refresh there by updating with recently added data.
    //     this.applyFilter(this.dataSource.filter);
    // }
    // private onDataLoadSuccessful(allWorkFlows: TaxType[]) {
    //     // alert('success');
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.totalRecords = allWorkFlows.length;
    //     this.allTaxTypes = allWorkFlows;
    // }

    // private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {

    //     // debugger;
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;

    //     this.auditHisory = auditHistory;


    //     this.modal = this.modalService.open(content, { size: 'lg' });

    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })


    // }

    // private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
    //     // alert('success');
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.allComapnies = allComapnies;

    // }

    // private onDataLoadFailed(error: any) {
    //     // alert(error);
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;

    // }

    // open(content) {

    //     this.isEditMode = false;
    //     this.isDeleteMode = false;
    //     this.disableSave = false;
    //     this.isSaving = true;
    //     this.loadMasterCompanies();
    //     this.sourceAction = new TaxType();
    //     this.sourceAction.isActive = true;
    //     this.description = "";
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {



    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }
    // openView(content, row) {

    //     this.sourceAction = row;
    //     this.taxType_Name = row.description;
    //     this.memo = row.memo;
    //     this.createdBy = row.createdBy;
    //     this.updatedBy = row.updatedBy;
    //     this.createdDate = row.createdDate;
    //     this.updatedDate = row.updatedDate;
    //     this.loadMasterCompanies();
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }
    // openHelpText(content) {
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // openDelete(content, row) {

    //     this.isEditMode = false;
    //     this.isDeleteMode = true;
    //     this.sourceAction = row;
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // openEdit(content, row) {

    //     this.isEditMode = true;
    //     this.disableSave = false;
    //     this.isSaving = true;
    //     this.loadMasterCompanies();



    //     this.sourceAction = row;
    //     this.description = this.sourceAction.description;

    //     this.loadMasterCompanies();
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // openHist(content, row) {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.sourceAction = row;
    //     //this.isSaving = true;
    //     // debugger;
    //     this.taxTypeService.historyTaxType(this.sourceAction.taxTypeId).subscribe(
    //         results => this.onHistoryLoadSuccessful(results[0], content),
    //         error => this.saveFailedHelper(error));


    // }


    // eventHandler(event) {
    //     let value = event.target.value.toLowerCase();
    //     if (this.selectedActionName) {
    //         if (value == this.selectedActionName.toLowerCase()) {
    //             //alert("Action Name already Exists");
    //             this.disableSave = true;
    //         }
    //         else {
    //             this.disableSave = false;
    //         }
    //     }
    // }
    // partnmId(event) {
    //     //debugger;
    //     for (let i = 0; i < this.actionamecolle.length; i++) {
    //         if (event == this.actionamecolle[i][0].description) {
    //             //alert("Action Name already Exists");
    //             this.disableSave = true;
    //             this.selectedActionName = event;
    //         }
    //     }
    // }


    // filterTaxTypes(event) {

    //     this.localCollection = [];
    //     for (let i = 0; i < this.allTaxTypes.length; i++) {
    //         let description = this.allTaxTypes[i].description;
    //         if (description.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {

    //             this.actionamecolle.push([{
    //                 "taxTypeId": this.allTaxTypes[i].taxTypeId,
    //                 "description": description
    //             }]),

    //                 this.localCollection.push(description);
    //         }
    //     }
    // }
    // handleChange(rowData, e) {
    //     if (e.checked == false) {
    //         this.sourceAction = rowData;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.Active = "In Active";
    //         this.sourceAction.isActive == false;
    //         this.taxTypeService.updateAction(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //         //alert(e);
    //     }
    //     else {
    //         this.sourceAction = rowData;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.Active = "Active";
    //         this.sourceAction.isActive == true;
    //         this.taxTypeService.updateAction(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //         //alert(e);
    //     }

    // }



    // editItemAndCloseModel() {

    //     // debugger;

    //     this.isSaving = true;

    //     if (this.isEditMode == false) {
    //         this.sourceAction.createdBy = this.userName;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.description = this.description;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.taxTypeService.newAction(this.sourceAction).subscribe(
    //             role => this.saveSuccessHelper(role),
    //             error => this.saveFailedHelper(error));
    //     }
    //     else {

    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.description = this.description;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.taxTypeService.updateAction(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //     }

    //     this.modal.close();
    // }

    // deleteItemAndCloseModel() {
    //     this.isSaving = true;
    //     this.sourceAction.updatedBy = this.userName;
    //     this.taxTypeService.deleteAcion(this.sourceAction.taxTypeId).subscribe(
    //         response => this.saveCompleted(this.sourceAction),
    //         error => this.saveFailedHelper(error));
    //     this.modal.close();
    // }

    // dismissModel() {
    //     this.isDeleteMode = false;
    //     this.isEditMode = false;
    //     this.modal.close();
    // }

    // private saveCompleted(user?: TaxType) {
    //     this.isSaving = false;

    //     if (this.isDeleteMode == true) {
    //         this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
    //         this.isDeleteMode = false;
    //     }
    //     else {
    //         this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

    //     }

    //     this.updatePaginatorState();
    // }

    // private saveSuccessHelper(role?: TaxType) {
    //     this.isSaving = false;
    //     this.alertService.showMessage("Success", `TaxType was created successfully`, MessageSeverity.success);

    //     this.updatePaginatorState();

    // }

    // get userName(): string {
    //     return this.authService.currentUser ? this.authService.currentUser.userName : "";
    // }

    // private saveFailedHelper(error: any) {
    //     this.isSaving = false;
    //     this.alertService.stopLoadingMessage();
    //     this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
    //     this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    // }

    // private getDismissReason(reason: any): string {
    //     if (reason === ModalDismissReasons.ESC) {
    //         return 'by pressing ESC';
    //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //         return 'by clicking on a backdrop';
    //     } else {
    //         return `with: ${reason}`;
    //     }
    // }

    // showAuditPopup(template, id): void {
    //     debugger;
    //     this.getTaxTypeAuditDetails(id);
    //     this.modal = this.modalService.open(template, { size: 'sm' });
    // }

    // getTaxTypeAuditDetails(Id: number): void {
    //     this.taxTypeService.getTaxTypeAuditDetails(Id).subscribe(audits => {
    //         if (audits.length > 0) {
    //             this.AuditDetails = audits;
    //             this.AuditDetails[0].ColumnsToAvoid = ["taxTypeAuditId", "TaxTypeId", "createdBy", "masterCompanyId", "createdDate", "updatedDate"];
    //         }
    //     });
    // }
    // updatePaginatorState() //need to pass this Object after update or Delete to get Server Side pagination
    // {
    //     this.paginatorState = {
    //         rows: this.rows,
    //         first: this.first
    //     }
    //     if (this.paginatorState) {
    //         this.loadTaxRate(this.paginatorState);
    //     }
    // }

    // loadTaxRate(event: LazyLoadEvent) //when page initilizes it will call this method
    // {
    //     this.loading = true;
    //     this.rows = event.rows;
    //     this.first = event.first;
    //     setTimeout(() => {
    //         if (this.allTaxTypes) {
    //             this.taxTypeService.getServerPages(event).subscribe( //we are sending event details to service
    //                 pages => {
    //                     if (pages.length > 0) {
    //                         this.taxRatePagination = pages[0];
    //                     }
    //                 });
    //             this.loading = false;
    //         }
    //     }, 1000);
    // }

    // inputFiledFilter(event, filed, matchMode) {

    //     this.event = event;
    //     this.field = filed;
    //     this.matvhMode = matchMode;

    //     if (filed == 'description') {
    //         this.descriptionInputFieldValue = event;
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
    //     this.taxType.push({
    //         Description: this.descriptionInputFieldValue,
    //         Memo: this.memoInputFieldValue,
    //         CreatedBy: this.createdByInputFieldValue,
    //         UpdatedBy: this.updatedByInputFieldValue,
    //         first: this.first,
    //         page: 10,
    //         pageCount: 10,
    //         rows: this.rows,
    //         limit: 5
    //     })
    //     if (this.taxType) {
    //         this.taxTypeService.getServerPages(this.taxType[this.taxType.length - 1]).subscribe( //we are sending event details to service
    //             pages => {
    //                 if (pages.length > 0) {
    //                     this.taxRatePagination = pages[0];
    //                 }
    //             });
    //     }
    //     else {
    //     }
    // }
}
