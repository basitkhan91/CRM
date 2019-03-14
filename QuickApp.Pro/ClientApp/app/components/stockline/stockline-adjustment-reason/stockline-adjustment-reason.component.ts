import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../../services/animations';
import { PageHeaderComponent } from '../../../shared/page-header.component';
import { ActionService } from '../../../services/action.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../../services/alert.service';
import { Action } from '../../../models/action.model';
import { AuditHistory } from '../../../models/audithistory.model';
import { AuthService } from '../../../services/auth.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../../models/mastercompany.model';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MenuItem } from 'primeng/api';//bread crumb
import { StocklineService } from '../../../services/stockline.service';

@Component({
    selector: 'app-stockline-adjustment-reason',
    templateUrl: './stockline-adjustment-reason.component.html',
    styleUrls: ['./stockline-adjustment-reason.component.scss'],
    animations: [fadeInOut]
})
/** stockline-adjustment-reason component*/
export class StocklineAdjustmentReasonComponent implements OnInit, AfterViewInit
{
    public sourceAdjustmentReason: any = {};
    selectedActionName: any;
    disableSave: boolean = false;
    actionamecolle: any[] = [];
    action_name: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createddate: any = "";
    updatedDate: any = "";
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    filteredBrands: any[];
    displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<Action>;
    allActions: Action[] = [];
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    public sourceAction: Action;
    public auditHisory: any;
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    selectedColumn: any[];
    selectedColumns: any[];
    cols: any[];
    title: string = "Create";
    id: number;
    errorMessage: any;
    modal: NgbModalRef;
    actionName: string;
    Active: string = "Active";
    length: number;
    localCollection: any[] = [];
    stocklineAdjustmentReason: any;
    adjustmentReasonName: any;
    isActive: any;

    /** Actions ctor */

    ngOnInit(): void {
		this.loadData();
		this.stocklineService.currentUrl = '/stocklinemodule/stocklinepages/app-stockline-adjustment-reason';
		this.stocklineService.bredcrumbObj.next(this.stocklineService.currentUrl);
        //this.breadCrumb.currentUrl = '';
        //this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }

    ngAfterViewInit()
    {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;

    /** stockline-adjustment-reason ctor */
    constructor(private stocklineService: StocklineService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService)
    {
       
        this.dataSource = new MatTableDataSource();
    }

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.stocklineService.getStocklineAdjustmentreason().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.cols = [
            { field: 'adjustmentReasonId', header: 'Adjustment Reason Id' },
            { field: 'description', header: 'Adjustment Reason' },
			{ field: 'createdDate', header: 'Created Date' },
			{ field: 'updatedDate', header: 'Updated Date' },

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
    
    private onDataLoadSuccessful(allWorkFlows: Action[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allActions = allWorkFlows;
       

    }

    private onHistoryLoadSuccessful(auditHistory: any, content) {

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

        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAdjustmentReason = {};
        this.sourceAdjustmentReason.isActive = true;
        this.actionName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceAdjustmentReason = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

	openEdit(content, row) {

        this.isEditMode = true;
        this.disableSave = false;
		this.isSaving = true;
		this.actionName = row.description;
		this.sourceAdjustmentReason = row;
        this.loadMasterCompanies();
        this.stocklineAdjustmentReason = this.sourceAdjustmentReason.description;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openView(content, row) {

        this.sourceAdjustmentReason = row;
		this.adjustmentReasonName = row.description;
		this.isActive = row.isActive;
        this.createdBy = row.createdBy;
        this.updatedBy = row.updatedBy;
        this.createddate = row.createdDate;
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

    openHist(contentHist, rowData) {
        //this.alertService.startLoadingMessage();
        //this.loadingIndicator = true;


        this.sourceAdjustmentReason = rowData;


        //this.workFlowtService.historyAcion(this.sourceAction.actionId).subscribe(
        //    results => this.onHistoryLoadSuccessful(results[0], contentHist),
        //    error => this.saveFailedHelper(error));


    }

    editItemAndCloseModel() {

        // debugger;

        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAdjustmentReason.createdBy = this.userName;
            this.sourceAdjustmentReason.updatedBy = this.userName;
            
            this.sourceAdjustmentReason.masterCompanyId = 1;
            this.stocklineService.newStockLineAdjustmentReason(this.sourceAdjustmentReason).subscribe(
                role => this.saveSuccessHelper(role),
              error => this.saveFailedHelper(error));
            
        }
        else {

            this.sourceAdjustmentReason.updatedBy = this.userName;
			//this.sourceAdjustmentReason.description = this.stocklineAdjustmentReason;
            this.sourceAdjustmentReason.masterCompanyId = 1;
            this.stocklineService.getUpdateStocklineAdjustmentReasonEndpoint(this.sourceAdjustmentReason).subscribe(
                response => this.saveCompleted(this.sourceAdjustmentReason),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAdjustmentReason.updatedBy = this.userName;
		this.stocklineService.deleteStocklineAdjustment(this.sourceAdjustmentReason).subscribe(
            response => this.saveCompleted(this.sourceAdjustmentReason),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    private saveCompleted(user?: Action) {
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

    private saveSuccessHelper(role?: Action) {
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

	handleChange(rowData, e) {
		if (e.checked == false) {
			this.sourceAdjustmentReason = rowData;
			this.sourceAdjustmentReason.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceAdjustmentReason.isActive == false;
			this.stocklineService.getUpdateStocklineAdjustmentReasonEndpoint(this.sourceAdjustmentReason).subscribe(
				response => this.saveCompleted(this.sourceAdjustmentReason),
				error => this.saveFailedHelper(error));
			//alert(e);
		}
		else {
			this.sourceAdjustmentReason = rowData;
			this.sourceAdjustmentReason.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceAdjustmentReason.isActive == true;
			this.stocklineService.getUpdateStocklineAdjustmentReasonEndpoint(this.sourceAdjustmentReason).subscribe(
				response => this.saveCompleted(this.sourceAdjustmentReason),
				error => this.saveFailedHelper(error));
			//alert(e);
		}

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
}