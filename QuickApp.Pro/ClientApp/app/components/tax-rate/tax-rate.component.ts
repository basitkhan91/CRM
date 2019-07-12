import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { TaxRateService } from '../../services/taxrate.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { TaxRate } from '../../models/taxrate.model';
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
import { TaxTypeService } from '../../services/taxtype.service';
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
@Component({
    selector: 'app-tax-rate',
    templateUrl: './tax-rate.component.html',
    styleUrls: ['./tax-rate.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class TaxRateComponent implements OnInit, AfterViewInit {
    taxRatePaginationObject = [];
    updatedByInputFieldValue: any;
    createdByInputFieldValue: any;
    memoFieldValue: any;
    taxRateInputFieldValue: any;
    taxTypeIdInputFieldValue: any;
    matvhMode: any;
    field: any;
    event: any;
	allTaxTypes: any[]=[];
    selectedActionName: any;
    disableSave: boolean=false;
    actionamecolle: any[]=[];
    taxRate_Name: any = "";
    taxRate: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
	updatedDate: any = "";
    display: boolean = false;
    AuditDetails: SingleScreenAuditDetails[];

	showDialog() {
		this.display = true;
	}
    ngOnInit(): void {
		this.loadData();
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-tax-rate';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
		this.loadTaxTypeData();
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    Active: string = "Active";
    displayedColumns = ['taxrateId', 'taxTypeId', 'taxrate', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<TaxRate>;
    allTaxrateInfo: TaxRate[] = [];
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    public sourceAction: TaxRate;
    public auditHisory: AuditHistory[] = [];
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;

    selectedColumns: any[];
    cols: any[];
    title: string = "Create";
    id: number;
    errorMessage: any;
    modal: NgbModalRef;
    selectedColumn: TaxRate[];
    taxRateName: string;
    filteredBrands: any[];
    localCollection: any[] = [];
    /** Actions ctor */

    pageSearch: { query: any; field: any; };
    first: number;
    rows: number;
    paginatorState: any;

    taxRatePagination: TaxRate[];//added
    totalRecords: number;
    loading: boolean;

    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;

	constructor(public workFlowtService: TaxTypeService,private breadCrumb: SingleScreenBreadcrumbService,private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public taxRateService : TaxRateService,  private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.sourceAction = new TaxRate();

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    public allWorkFlows: TaxRate[] = [];

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.taxRateService.getTaxRateList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.cols = [
            //{ field: 'taxrateId', header: 'Tax Rate ID' },
            { field: 'taxTypeId', header: 'Tax Type' },
            { field: 'taxRate', header: 'Tax Rate' },
            { field: 'memo', header: 'Memo' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
            //{ field: 'updatedDate', header: 'Updated Date' },
            //{ field: 'createdDate', header: 'Created Date' }
        ];
        this.selectedColumns = this.cols;
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
	private onTaxTypeloadsuc(allWorkFlows: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allTaxTypes = allWorkFlows;
	}
    private onDataLoadSuccessful(getTaxRateList: TaxRate[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getTaxRateList;
        this.totalRecords = getTaxRateList.length;
        this.allTaxrateInfo = getTaxRateList;
    }
	private loadTaxTypeData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getWorkFlows().subscribe(
			results => this.onTaxTypeloadsuc(results[0]),
			error => this.onDataLoadFailed(error)
		);

		
		this.selectedColumns = this.cols;

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
		this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
		this.sourceAction = new TaxRate();
        this.sourceAction.isActive = true;
        this.taxRateName = "";

        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
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

    openEdit(content, row) {

        this.isEditMode = true;
		this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = row;
        this.taxRateName = this.sourceAction.taxTypeId;
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
        this.taxRateService.historyTaxRate(this.sourceAction.taxRateId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));


    }

    openView(content, row) {

        this.sourceAction = row;
        this.taxRate_Name = row.taxTypeId;
        this.taxRate = row.taxRate;
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
            if (event == this.actionamecolle[i][0].taxTypeName) {
                //alert("Action Name already Exists");
                this.disableSave = true;
                this.selectedActionName = event;
            }
        }
    }

	filterTaxTypes(event) {

		this.localCollection = [];
		for (let i = 0; i < this.allTaxTypes.length; i++) {
			let taxTypeName = this.allTaxTypes[i].description;
			if (taxTypeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {

				this.actionamecolle.push([{
					"taxTypeId": this.allTaxTypes[i].taxTypeId,
					"taxTypeName": taxTypeName
				}]),

					this.localCollection.push(taxTypeName);
			}
		}
	}

    filterTaxRates(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allTaxrateInfo.length; i++) {
            let taxRateName = this.allTaxrateInfo[i].taxTypeId;
            if (taxRateName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {

                this.actionamecolle.push([{
                    "taxRateId": this.allTaxrateInfo[i].taxRateId,
                    "taxRateName": taxRateName
                }]),

                this.localCollection.push(taxRateName);
            }
        }
    }

    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceAction.isActive == false;
            this.taxRateService.updateTaxRate(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive == true;
            this.taxRateService.updateTaxRate(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

    }

  
    editItemAndCloseModel() {

        // debugger;

        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.taxTypeId = this.taxRateName;
            this.sourceAction.masterCompanyId = 1;
            this.taxRateService.newTaxRate(this.sourceAction).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.taxTypeId = this.taxRateName;
            this.sourceAction.masterCompanyId = 1;
            this.taxRateService.updateTaxRate(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.taxRateService.deleteTaxRate(this.sourceAction.taxRateId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    private saveCompleted(user?: TaxRate) {
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

    private saveSuccessHelper(role?: TaxRate) {
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

    showAuditPopup(template, id): void {
        this.auditAssetStatus(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditAssetStatus(taxRateId: number): void
    {
        this.AuditDetails = [];

        this.taxRateService.getTaxRateAudit(taxRateId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["taxRateAuditId", "taxRateId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }

    updatePaginatorState() //need to pass this Object after update or Delete to get Server Side pagination
    {
        this.paginatorState = {
            rows: this.rows,
            first: this.first
        }
        if (this.paginatorState) {
            this.loadAircraftManufacturer(this.paginatorState);
        }
    }

    loadAircraftManufacturer(event: LazyLoadEvent) //when page initilizes it will call this method
    {
        this.loading = true;
        this.rows = event.rows;
        this.first = event.first;
        setTimeout(() => {
            if (this.allTaxrateInfo) {
                this.taxRateService.getServerPages(event).subscribe( //we are sending event details to service
                    pages => {
                        if (pages.length > 0) {
                            this.taxRatePagination = pages[0];
                        }
                    });
                this.loading = false;
            }
        }, 1000);
    }

    inputFiledFilter(event, filed, matchMode) {

        this.event = event;
        this.field = filed;
        this.matvhMode = matchMode;

        if (filed == 'taxTypeId') {
            this.taxTypeIdInputFieldValue = event;
        }
        if (filed == 'taxRate') {
            this.taxRateInputFieldValue = event;
        }
        if (filed == 'memo') {
            this.memoFieldValue = event;
        }
        if (filed == 'createdBy') {
            this.createdByInputFieldValue = event;
        }
        if (filed == 'updatedBy') {
            this.updatedByInputFieldValue = event;
        }
        this.taxRatePaginationObject.push({
            taxTypeId: this.taxTypeIdInputFieldValue,
            taxRate: this.taxRateInputFieldValue,
            memo: this.memoFieldValue,
            CreatedBy: this.createdByInputFieldValue,
            UpdatedBy: this.updatedByInputFieldValue,
            first: this.first,
            page: 10,
            pageCount: 10,
            rows: this.rows,
            limit: 5
        })
        if (this.taxRate) {
            this.taxRateService.getServerPages(this.taxRatePaginationObject[this.taxRatePaginationObject.length - 1]).subscribe( //we are sending event details to service
                pages => {
                    if (pages.length > 0) {
                        this.taxRatePagination = pages[0];
                    }
                });
        }
        else {
        }
    }
}