import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AuditHistory } from '../../../../models/audithistory.model';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog,MatIcon } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MasterCompany } from '../../../../models/mastercompany.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/auth.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { VendorService } from '../../../../services/vendor.service';
import { fadeInOut } from '../../../../services/animations';
import { Router } from '@angular/router';

@Component({
    selector: 'app-purchase-order',
    templateUrl: './purchase-order.component.html',
	styleUrls: ['./purchase-order.component.scss'],
	animations: [fadeInOut]
})
/** purchase-order component*/


export class PurchaseOrderComponent implements OnInit, AfterViewInit {
	selectedRow: any;
	purchaseOrderNumber: any = "";
	requestedBy: any = "";
	dateApprovied: any = "";
	approver: any = "";
	createdBy: any = "";
	updatedBy: any = "";
	createdDate: any = "";
	updatedDate: any = "";
	selectedActionName: any;
	disableSave: boolean;
	actionamecolle: any[] = [];


	auditHisory: AuditHistory[];
	Active: string = "Active";
	/** Currency ctor */

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	displayedColumns = ['currencyId', 'code', 'symbol', 'displayName', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
	dataSource: MatTableDataSource<any>;
	allCurrencyInfo: any[] = [];
	sourceAction: any = {};

	loadingIndicator: boolean;

	actionForm: FormGroup;
	title: string = "Create";
	id: number;

	cols: any[];
	selectedColumns: any[];
	private isEditMode: boolean = false;
	private isDeleteMode: boolean = false;
	allComapnies: MasterCompany[];
	private isSaving: boolean;
	modal: NgbModalRef;
	selectedColumn: any[];
	currencyName: string;
	filteredBrands: any[];
	localCollection: any[] = [];
	allPolistInfo: any[] = [];
	allPurchaseorderInfo: any[] = [];
	/** Currency ctor */
	constructor(private authService: AuthService, private _fb: FormBuilder, public _router: Router, private alertService: AlertService, private masterComapnyService: MasterComapnyService, private modalService: NgbModal, public vendorservice: VendorService, private dialog: MatDialog) {
		this.displayedColumns.push('action');
		this.dataSource = new MatTableDataSource();
		this.vendorservice.ShowPtab = false;
		this.vendorservice.alertObj.next(this.vendorservice.ShowPtab);
		this.vendorservice.currentUrl = '/vendorsmodule/vendorpages/app-polist';
		this.vendorservice.bredcrumbObj.next(this.vendorservice.currentUrl);
	}
	ngOnInit(): void {
		//this.purchaseorderlist();
		this.loadData();
		this.cols = [
			//{ field: 'statusId', header: 'Status' },
			{ field: 'purchaseOrderNumber', header: 'PO Number' },
			{ field: 'requestedBy', header: 'Requested By' },
			{ field: 'dateRequested', header: 'Open Date' },
			{ field: 'requestedBy', header: 'Requested By' },
			{ field: 'dateApprovied', header: ' Date Approvied ' },
			{ field: 'approver', header: ' Approvied By' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' }
		];
		//this.breadCrumb.currentUrl = '/singlepages/singlepages/app-currency';
		//this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
		this.selectedColumns = this.cols;

	}
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	private loadData() {
		// debugger;
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.vendorservice.getPurchaseOrderlist().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
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
	private onDataLoadSuccessful(getCreditTermsList: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getCreditTermsList;

		this.allPolistInfo = getCreditTermsList;
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
	getSelectedColumn(rowData) {
		this.vendorservice.getpurchasevendorlist(rowData.purchaseOrderId).subscribe(
			results => this.onDataLoadordrSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	public getSelectedRow() {
		//this.vendorservice.selectedPoCollection = this.selectedRow;
		if (this.vendorservice.selectedPoCollection != null) {
			this._router.navigateByUrl('/receivingmodule/receivingpages/app-receivng-po');
		}
	}



	private onDataLoadordrSuccessful(getCreditTermsList: any[]) {
		// alert('success');
		this.allPurchaseorderInfo = getCreditTermsList;
		this.vendorservice.selectedPoCollection = this.allPurchaseorderInfo;
		
	}
	//handleChange(rowData, e) {
	//	if (e.checked == false) {
	//		this.sourceAction = rowData;
	//		this.sourceAction.updatedBy = this.userName;
	//		this.Active = "In Active";
	//		this.sourceAction.isActive == false;
	//		this.vendorservice.updatecurrency(this.sourceAction).subscribe(
	//			response => this.saveCompleted(this.sourceAction),
	//			error => this.saveFailedHelper(error));
	//		//alert(e);
	//	}
	//	else {
	//		this.sourceAction = rowData;
	//		this.sourceAction.updatedBy = this.userName;
	//		this.Active = "Active";
	//		this.sourceAction.isActive == true;
	//		this.vendorservice.updatecurrency(this.sourceAction).subscribe(
	//			response => this.saveCompleted(this.sourceAction),
	//			error => this.saveFailedHelper(error));
	//		//alert(e);
	//	}

	//}



	open() {

		this._router.navigateByUrl('/vendorsmodule/vendorpages/app-create-po')
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
	private loadMasterCompanies() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.masterComapnyService.getMasterCompanies().subscribe(
			results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}
	openEdit(row) {


		this.vendorservice.getpurchasevendorlist(row.purchaseOrderId).subscribe(
			results => this.onDataLoadordrSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
		//this.modal = this.modalService.open(content, { size: 'sm' });
		//this.modal.result.then(() => {
		//	console.log('When user closes');
		//}, () => { console.log('Backdrop click') })
	}

	//openHist(content, row) {
	//	this.alertService.startLoadingMessage();
	//	this.loadingIndicator = true;


	//	this.sourceAction = row;



	//	this.isSaving = true;

	//	this.vendorservice.historycurrency(this.sourceAction.currencyId).subscribe(
	//		results => this.onHistoryLoadSuccessful(results[0], content),
	//		error => this.saveFailedHelper(error));


	//}
	private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {


		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

		this.auditHisory = auditHistory;


		this.modal = this.modalService.open(content, { size: 'lg' });

		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })


	}
	//openView(content, row) {

	//	this.sourceAction = row;
	//	this.currency_Name = row.code;
	//	this.symbol = row.symbol;
	//	this.displayName = row.displayName;
	//	this.memo = row.memo;
	//	this.createdBy = row.createdBy;
	//	this.updatedBy = row.updatedBy;
	//	this.createdDate = row.createdDate;
	//	this.updatedDate = row.updatedDate;
	//	this.loadMasterCompanies();
	//	this.modal = this.modalService.open(content, { size: 'sm' });
	//	this.modal.result.then(() => {
	//		console.log('When user closes');
	//	}, () => { console.log('Backdrop click') })
	//}
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
			if (event == this.actionamecolle[i][0].currencyName) {
				//alert("Action Name already Exists");
				this.disableSave = true;
				this.selectedActionName = event;
			}
		}
	}


	filterCurrency(event) {

		this.localCollection = [];
		for (let i = 0; i < this.allCurrencyInfo.length; i++) {
			let currencyName = this.allCurrencyInfo[i].code;
			if (currencyName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.actionamecolle.push([{
					"currencyId": this.allCurrencyInfo[i].currencyId,
					"currencyName": currencyName
				}]),
					this.localCollection.push(currencyName);
			}
		}
	}


	//editItemAndCloseModel() {

	//	// debugger;

	//	this.isSaving = true;

	//	if (this.isEditMode == false) {
	//		this.sourceAction.createdBy = this.userName;
	//		this.sourceAction.updatedBy = this.userName;
	//		this.sourceAction.code = this.currencyName;
	//		this.sourceAction.masterCompanyId = 1;
	//		this.vendorservice.newAddcurrency(this.sourceAction).subscribe(
	//			role => this.saveSuccessHelper(role),
	//			error => this.saveFailedHelper(error));
	//	}
	//	else {

	//		this.sourceAction.updatedBy = this.userName;
	//		this.sourceAction.code = this.currencyName;
	//		this.sourceAction.masterCompanyId = 1;
	//		this.vendorservice.updatecurrency(this.sourceAction).subscribe(
	//			response => this.saveCompleted(this.sourceAction),
	//			error => this.saveFailedHelper(error));
	//	}

	//	this.modal.close();
	//}

	//deleteItemAndCloseModel() {
	//	this.isSaving = true;
	//	this.sourceAction.updatedBy = this.userName;
	//	this.vendorservice.deletecurrency(this.sourceAction.currencyId).subscribe(
	//		response => this.saveCompleted(this.sourceAction),
	//		error => this.saveFailedHelper(error));
	//	this.modal.close();
	//}

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

}