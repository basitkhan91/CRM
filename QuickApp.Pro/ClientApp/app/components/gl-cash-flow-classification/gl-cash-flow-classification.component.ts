import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { ActionService } from '../../services/action.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { GlCashFlowClassification } from '../../models/glcashflowclassification.model';
import { AuthService } from '../../services/auth.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';
import { GlCashFlowClassificationService } from '../../services/gl-cash-flow-classification.service';
import { DataTableModule } from 'primeng/datatable';
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { SelectButtonModule } from 'primeng/selectbutton'
import { InputTextModule } from 'primeng/inputtext'
import { MultiSelectModule } from 'primeng/multiselect'
import { Action } from 'rxjs/scheduler/Action';
import { AuditHistory } from '../../models/audithistory.model';
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";

@Component({
    selector: 'app-gl-cash-flow-classification',
    templateUrl: './gl-cash-flow-classification.component.html',
	styleUrls: ['./gl-cash-flow-classification.component.scss'],
	animations: [fadeInOut]
})
/** gl-cash-flow-classification component*/
export class GlCashFlowClassificationComponent implements OnInit, AfterViewInit {
    paginator: MatPaginator;
    sort: MatSort;    
	disableSave: boolean;
	selectedGLClassFlowClassificationName: any;
	auditHisory: any[];
	dataSource: MatTableDataSource<any>;	
	glcashflowcoll: any[] = [];		
	createdBy: any = "";
	updatedBy: any = "";
	createddate: any = "";
	updatedDate: any = "";
	GLClassFlowClassificationNamecolle: any[] = [];
	cols: any[];
	selectedColumns: any[]=[];
	selectedColumn: any[];
	displayedColumns = ['glcid', 'glClassFlowClassificationName', 'createdDate', 'companyName'];
	allComapnies: MasterCompany[] = [];
	private isSaving: boolean;
	private bodyText: string;
	loadingIndicator: boolean;
	closeResult: string;
	glClassFlowClassificationName: string;	
	title: string = "Create";

	id: number;
	errorMessage: any;
	modal: NgbModalRef;	
	Active: string = "Active";
	length: number;
	localCollection: any[] = [];	
	allGlCashflow: any[] = [];
	//allGLcashflow: any[];
	isEditMode: boolean = false;
	isDeleteMode: boolean = false;
	public sourceglcashflowclassification: any = {}
	GLClassFlowClassificationName: string;
   // allGLcashflow: any[];
	cashflowViewFileds: any = {};
	
	
	constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private workFlowtService:GlCashFlowClassificationService) {
		this.displayedColumns.push('action');
		this.dataSource = new MatTableDataSource();
		this.sourceglcashflowclassification = new GlCashFlowClassification();
	}
	ngOnInit() {
		this.loadData();
		
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-gl-cash-flow-classification';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
		

	}
	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.workFlowtService.getWorkFlows().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
		this.cols = [
			{ field: 'glClassFlowClassificationName', header: 'GL Class Flow ClassificationName' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' },
			//{ field: 'createdDate', header: 'Created Date' },
			//{ field: 'updatedDate', header: 'Updated Date' }


		];
		this.selectedColumns = this.cols;
	}
	private onDataLoadSuccessful(allWorkFlows: any[]) {
		//debugger;
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = allWorkFlows;
		this.allGlCashflow = allWorkFlows;
		
		this.selectedColumns = this.cols;

	}
	private onDataLoadFailed(error: any) {
		// alert(error);
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

	}
	ngAfterViewInit() {
		//this.dataSource.paginator = this.paginator;
		//this.dataSource.sort = this.sort;

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


	private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allComapnies = allComapnies;

	}
	open(content) {
		this.disableSave = false;
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.disableSave = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceglcashflowclassification = new GlCashFlowClassification();
		this.GLClassFlowClassificationName = "";
		this.sourceglcashflowclassification.isActive = true;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}


	openDelete(content, row) {

		this.isEditMode = false;
		this.isDeleteMode = true;
		this.sourceglcashflowclassification = row;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openEdit(content, row) {
		this.disableSave = false;
		this.isEditMode = true;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceglcashflowclassification = row;
		this.GLClassFlowClassificationName = this.sourceglcashflowclassification.glClassFlowClassificationName;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openHist(content, row) {

		this.sourceglcashflowclassification = row;

		this.workFlowtService.historyGlCashFlowClassification(this.sourceglcashflowclassification.glcashflowclassificationId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));
	}

	handleChange(rowData, e) {
		if (e.checked == false) {
			this.sourceglcashflowclassification = rowData;
			this.sourceglcashflowclassification.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceglcashflowclassification.isActive == false;
			this.workFlowtService.updateCashFlowClassification(this.sourceglcashflowclassification).subscribe(
				response => this.saveCompleted(this.sourceglcashflowclassification),
				error => this.saveFailedHelper(error));
			//alert(e);
		}
		else {
			this.sourceglcashflowclassification = rowData;
			this.sourceglcashflowclassification.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceglcashflowclassification.isActive == true;
			this.workFlowtService.updateCashFlowClassification(this.sourceglcashflowclassification).subscribe(
				response => this.saveCompleted(this.sourceglcashflowclassification),
				error => this.saveFailedHelper(error));
			//alert(e);
		}

	}
	eventHandler(event) {
		let value = event.target.value.toLowerCase();
		if (this.selectedGLClassFlowClassificationName) {
			if (value == this.selectedGLClassFlowClassificationName.toLowerCase()) {
				//alert("Action Name already Exists");
				this.disableSave = true;
			}
			else {
				this.disableSave = false;
			}
		}
		else {
			for (let i = 0; i < this.GLClassFlowClassificationNamecolle.length; i++) {
				if (value == this.GLClassFlowClassificationNamecolle[i].glClassFlowClassificationName.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSave = true;
					this.selectedGLClassFlowClassificationName = event;
				}
			}
		}

	}

	partnmId(event) {
		if (this.allGlCashflow) {

			for (let i = 0; i < this.allGlCashflow.length; i++) {
				if (event == this.allGlCashflow[i].glClassFlowClassificationName) {
					this.sourceglcashflowclassification.glClassFlowClassificationName = this.allGlCashflow[i].glClassFlowClassificationName;
					this.disableSave = true;

					this.selectedGLClassFlowClassificationName = event;
				}

			}
		}
	}
	
	filterGlAccountclass(event) {

		this.localCollection = [];
		if (this.allGlCashflow) {
			for (let i = 0; i < this.allGlCashflow.length; i++) {
				let glClassFlowClassificationName = this.allGlCashflow[i].glClassFlowClassificationName;
				if (glClassFlowClassificationName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.glcashflowcoll.push([{
						"glClassFlowClassificationId": this.allGlCashflow[i].glClassFlowClassificationId,
						"glClassFlowClassificationName": glClassFlowClassificationName
					}]),
						this.localCollection.push(glClassFlowClassificationName)

				}
			}
		}
	}
	editItemAndCloseModel() {

		this.isSaving = true;

		if (this.isEditMode == false) {
			this.sourceglcashflowclassification.createdBy = this.userName;
			this.sourceglcashflowclassification.updatedBy = this.userName;
			this.sourceglcashflowclassification.masterCompanyId = 1;
			//this.sourceglaccountclass.glaccountclassname = this.glAccountclassName;
			this.workFlowtService.newGlCashFlowClassification(this.sourceglcashflowclassification).subscribe(
				role => this.saveSuccessHelper(role),
				error => this.saveFailedHelper(error));
		}
		else {

			this.sourceglcashflowclassification.updatedBy = this.userName;
			//this.sourceglcashflowclassification.glClassFlowClassificationName = this.glClassFlowClassificationName;
			this.sourceglcashflowclassification.masterCompanyId = 1;
			this.workFlowtService.updateCashFlowClassification(this.sourceglcashflowclassification).subscribe(
				response => this.saveCompleted(this.sourceglcashflowclassification),
				error => this.saveFailedHelper(error));
		}

		this.modal.close();
	}
	deleteItemAndCloseModel() {
		this.isSaving = true;
		this.sourceglcashflowclassification.updatedBy = this.userName;
		this.workFlowtService.deleteCashFlowClassification(this.sourceglcashflowclassification.glClassFlowClassificationId).subscribe(
			response => this.saveCompleted(this.sourceglcashflowclassification),
			error => this.saveFailedHelper(error));
		this.modal.close();
	}

	dismissModel() {
		this.isDeleteMode = false;
		this.isEditMode = false;
		this.modal.close();
	}

	private saveSuccessHelper(role?: any) {
		this.isSaving = false;
		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

		this.loadData();

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

	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
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

		this.sourceglcashflowclassification = row;
		this.cashflowViewFileds.glClassFlowClassificationName = row.glClassFlowClassificationName;
		this.cashflowViewFileds.glcid = row.glcid;
		//this.createdBy = row.createdBy;
		//this.updatedBy = row.updatedBy;
		//this.createdDate = row.createdDate;
		//this.updatedDate = row.updatedDate;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

}

