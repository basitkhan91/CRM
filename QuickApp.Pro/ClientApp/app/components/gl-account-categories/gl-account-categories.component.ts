import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { ActionService } from '../../services/action.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';

import { AuthService } from '../../services/auth.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';
import { GLAccountCategoryService } from '../../services/glaccount-category.service';
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
	selector: 'app-glaccount-category',
	templateUrl: './gl-account-categories.component.html',
	styleUrls: ['./gl-account-categories.component.scss'],
	animations: [fadeInOut]
})
/** ActionsAttribute component*/
export class GLAccountCategoryComponent implements OnInit, AfterViewInit {
	disableSave: boolean;
	selectedGLAccountCategoryName: any;
	actionamecolle: any[] = [];
	auditHisory: any[];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	cols: any[];
	selectedColumns: any[];
	dataSource: MatTableDataSource<any>;
	allGLAccountCategory: any[] = [];
	allComapnies: MasterCompany[] = [];
	private isSaving: boolean;
	public sourceGLAccountCatrgory: any = {};
	private bodyText: string;
	loadingIndicator: boolean;
	closeResult: string;
	title: string = "Create";
	id: number;
	errorMessage: any;
	modal: NgbModalRef;
	/** Actions ctor */
	private isEditMode: boolean = false;
	private isDeleteMode: boolean = false;
	
	filteredBrands: any[];
	localCollection: any[] = [];
	selectedColumn: any[];
	Active: string = "Active";
    glAccountCategoryName: string;
    disablecategory: boolean;
    secelectcategory: any;
	categoryViewFileds: any = {};

	constructor( private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: GLAccountCategoryService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
		
		this.dataSource = new MatTableDataSource();
		

	}
	ngOnInit(): void {

		this.loadData();
		this.cols = [
			//{ field: 'actionAttributeId', header: 'ACID' },
			{ field: 'glAccountCategoryName', header: 'Expenditure Type' },
			//{ field: 'gLCID', header: 'GLCID' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' },
			//{ field: 'createdDate', header: 'Created Date' },
			//{ field: 'updatedDate', header: 'Updated Date' }


		];
		
		this.selectedColumns = this.cols;
	}
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	public allWorkFlows: any[] = [];
	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.workFlowtService.getWorkFlows().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
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

		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allGLAccountCategory = allWorkFlows;

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
		this.disableSave = false;
		this.isEditMode = false;
		this.isDeleteMode = false;

		this.isSaving = true;
		this.loadMasterCompanies();

		this.glAccountCategoryName = "";
		this.sourceGLAccountCatrgory.isActive = true;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}


	openDelete(content, row) {

		this.isEditMode = false;
		this.isDeleteMode = true;
		this.sourceGLAccountCatrgory = row;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openEdit(content, row) {
		this.disableSave=false;
		this.isEditMode = true;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceGLAccountCatrgory = row;
		this.glAccountCategoryName = this.sourceGLAccountCatrgory.glAccountCategoryName;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openHist(content, row) {

		this.sourceGLAccountCatrgory = row;

		this.workFlowtService.historyGLAccountCategory(this.sourceGLAccountCatrgory.GLAccountCategoryId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));
	}
	handleChange(rowData, e) {
		if (e.checked == false) {
			this.sourceGLAccountCatrgory = rowData;
			this.sourceGLAccountCatrgory.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceGLAccountCatrgory.isActive == false;
			this.workFlowtService.updateGLAccountCategory(this.sourceGLAccountCatrgory).subscribe(
				response => this.saveCompleted(this.sourceGLAccountCatrgory),
				error => this.saveFailedHelper(error));
			//alert(e);
		}
		else {
			this.sourceGLAccountCatrgory = rowData;
			this.sourceGLAccountCatrgory.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceGLAccountCatrgory.isActive == true;
			this.workFlowtService.updateGLAccountCategory(this.sourceGLAccountCatrgory).subscribe(
				response => this.saveCompleted(this.sourceGLAccountCatrgory),
				error => this.saveFailedHelper(error));
			//alert(e);
		}

	}


	eventHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedGLAccountCategoryName) {
				if (value == this.selectedGLAccountCategoryName.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disablecategory = true;

				}
				else {
					this.disablecategory = false;

				}
			}

		}
	}

	partnmId(event) {
		//
		if (this.allGLAccountCategory) {

			for (let i = 0; i < this.allGLAccountCategory.length; i++) {
				if (event == this.allGLAccountCategory[i].glAccountCategoryName) {
					this.sourceGLAccountCatrgory.glAccountCategoryName = this.allGLAccountCategory[i].glAccountCategoryName;
					this.disablecategory = true;

					this.selectedGLAccountCategoryName = event;
				}

			}
		}
	}

	//}
	//partnmId(event) {
	//	//debugger;
	//	for (let i = 0; i < this.actionamecolle.length; i++) {
	//		if (event == this.actionamecolle[i][0].gLAccountCategoryName) {
	//			//alert("Action Name already Exists");
	//			this.disableSave = true;
	//			this.selectedGLAccountCategoryName = event;
	//		}
	//	}
	//}
	filterGLAccountCategory(event) {

		this.localCollection = [];
		for (let i = 0; i < this.allGLAccountCategory.length; i++) {
			let gLAccountCategoryName = this.allGLAccountCategory[i].glAccountCategoryName;
			if (gLAccountCategoryName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.actionamecolle.push([{
					"GLAccountCategoryId": this.allGLAccountCategory[i].GLAccountCategoryId,
					"gLAccountCategoryName": gLAccountCategoryName
				}]),
					this.localCollection.push(gLAccountCategoryName)

			}
		}
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


	editItemAndCloseModel() {

		this.isSaving = true;

		if (this.isEditMode == false) {
			this.sourceGLAccountCatrgory.createdBy = this.userName;
			this.sourceGLAccountCatrgory.updatedBy = this.userName;
			this.sourceGLAccountCatrgory.masterCompanyId = 1;
			this.sourceGLAccountCatrgory.glAccountCategoryName = this.glAccountCategoryName;
			this.workFlowtService.newGLAccountCategory(this.sourceGLAccountCatrgory).subscribe(
				role => this.saveSuccessHelper(role),
				error => this.saveFailedHelper(error));
		}
		else {

			this.sourceGLAccountCatrgory.updatedBy = this.userName;
			this.sourceGLAccountCatrgory.gLAccountCategoryName = this.glAccountCategoryName;
			this.sourceGLAccountCatrgory.masterCompanyId = 1;
			this.workFlowtService.updateGLAccountCategory(this.sourceGLAccountCatrgory).subscribe(
				response => this.saveCompleted(this.sourceGLAccountCatrgory),
				error => this.saveFailedHelper(error));
		}

		this.modal.close();
	}

	
	deleteItemAndCloseModel() {
		this.isSaving = true;
		this.sourceGLAccountCatrgory.updatedBy = this.userName;
		this.workFlowtService.deleteGLAccountCategory(this.sourceGLAccountCatrgory.glAccountCategoryId).subscribe(
			response => this.saveCompleted(this.sourceGLAccountCatrgory),
			error => this.saveFailedHelper(error));
		this.modal.close();
	}
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
	

	openView(content, row) {

		this.sourceGLAccountCatrgory = row;
		this.categoryViewFileds.glAccountCategoryName = row.glAccountCategoryName;
		this.categoryViewFileds.glcid = row.glcid;
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



