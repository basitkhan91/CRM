import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatIcon } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { fadeInOut } from '../../../services/animations';
import { MasterCompany } from '../../../models/mastercompany.model';
import { AuditHistory } from '../../../models/audithistory.model';
import { AuthService } from '../../../services/auth.service';
import { MessageSeverity, AlertService } from '../../../services/alert.service';
import { VendorService } from '../../../services/vendor.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { Vendor } from '../../../models/vendor.model';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { WorkFlowtService } from '../../../services/workflow.service';
import { ActionService } from '../../../Workflow/ActionService';

@Component({
    selector: 'app-workflow-list',
    templateUrl: './workflow-list.component.html',
	styleUrls: ['./workflow-list.component.scss'],
	animations: [fadeInOut]
})
/** workflow-list component*/


export class WorkflowListComponent implements OnInit, AfterViewInit {
	activeIndex: number;
	vendorCode: any = "";
	vendorname: any = "";
	vendorEmail: any = "";
	VendorTypeId: any = "";
	allgeneralInfo: any[];
	collection: any;
	//vendorCode: any = "";
	memo: any = "";
	createdBy: any = "";
	updatedBy: any = "";
	createddate: any = "";
	updatedDate: any = "";
	sub: any;
	local: any;
	vendorName: any;
	lastName: any = "";
	firstName: any = "";
	contactTitle: any = "";
	email: any = "";
	mobilePhone: number;
	fax: any = "";
	vendorTypeId: any = "";
	doingBusinessAsName: any = "";
	parent: any = "";
	address1: any = "";
	address2: any = "";
	address3: any = "";
	city: any = "";
	stateOrProvince: any = "";
	postal: any = "";
	country: any = "";
	classificationName: any = "";
	isPreferredVendor: any = "";
	vendorContractReference: any = "";
	licenseNumber: any = "";
	capabilityId: any = "";
	vendorURL: any = "";
	postalCode: any = "";
	vendorClassificationId: any = "";
	creditlimit: any = "";
	creditTermsId: any = "";
	currencyId: any = "";
	discountLevel: any = "";
	is1099Required: any = "";
	showGeneralData: boolean = true;
	showcontactdata: boolean = true;
	showfinancialdata: boolean = true;
	allContacts: any[] = [];
	allpayments: any[] = [];
	selectedPaymentColumns: any[];
	allShippings: any[];
	shippingCol: any[];
	selectedShippingColumns: any[];
	ngOnInit() {

		// debugger;
		this.loadData();
		//this.workFlowtService.currentUrl = '/vendorsmodule/vendorpages/app-vendors-list';
		//this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);

		//this.workFlowtService.ShowPtab = false;

		//this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab);

	}


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	filteredBrands: any[];
	displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
	dataSource: MatTableDataSource<any>;
	allVendorList: any[] = [];
	allComapnies: MasterCompany[] = [];
	private isSaving: boolean;
	public sourceVendor: any = {};
	public domesticSaveObj: Object = {

	}
	public internationalSaveObj: Object = {

	}
	public sourceAction: any = [];
	public auditHisory: AuditHistory[] = [];
	private bodyText: string;
	loadingIndicator: boolean;
	closeResult: string;
	selectedColumn: any[];
	selectedColumns: any[];
	selectedContactColumns: any[];
	cols: any[];
	contactcols: any[];
	paymentcols: any[];
	title: string = "Create";
	id: number;
	errorMessage: any;
	modal: NgbModalRef;
	actionName: string;
	Active: string = "Active";
	length: number;
	localCollection: any;

	/** Actions ctor */

	private isEditMode: boolean = false;
	private isDeleteMode: boolean = false;

	constructor(private actionService: ActionService,private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: WorkFlowtService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
		//this.local = this.workFlowtService.financeCollection;
		this.dataSource = new MatTableDataSource();
		this.workFlowtService.listCollection = null;
		//this.workFlowtService.listCollection = null;
	}

	ngAfterViewInit() {
		//this.dataSource.paginator = this.paginator;
		//this.dataSource.sort = this.sort;
	}
	public allWorkFlows: any[] = [];


	public navigateTogeneralInfo() {
		//this.workFlowtService.listCollection = [];
		this.activeIndex = 0;
		

	}

	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getWorkFlows().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

		this.cols = [
			//{ field: 'actionId', header: 'Action Id' },
			{ field: 'partNumber', header: 'Part Number' },
			{ field: 'partDescription', header: 'PartNumber Description' },
			{ field: 'workOrderNumber', header: 'Workflow Id' },
			{ field: 'description', header: 'WorkScope' },
			//{ field: 'city', header: 'City' },
			//{ field: 'stateOrProvince', header: 'StateOrProvince' },
			//{ field: 'createdBy', header: 'Created By' },
			//{ field: 'updatedBy', header: 'Updated By' },

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
	private onDataLoadSuccessful(allWorkFlows: any[]) {
		//debugger;
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allVendorList = allWorkFlows;


	}
	private ongeneralDataLoadSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allgeneralInfo = allWorkFlows;
		this.vendorname = this.allgeneralInfo[0].vendorName;
		this.vendorCode = this.allgeneralInfo[0].vendorCode;
		console.log(this.allgeneralInfo);


	}

	filterActions(event) {

		this.localCollection = [];
		for (let i = 0; i < this.allVendorList.length; i++) {
			let actionName = this.allVendorList[i].description;

			if (actionName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.localCollection.push(actionName);

			}
		}
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
		//this.sourceVendor.isActive = true;
		this.actionName = "";
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	openGeneralInfo() {
		this.showGeneralData = true;
		this.showcontactdata = false;
		this.showfinancialdata = false;
	}
	openFinancialInfo() {
		this.showGeneralData = false;
		this.showcontactdata = false;
		this.showfinancialdata = true;
	}

	openDelete(content1, rowData) {

		this.isEditMode = false;
		this.isDeleteMode = true;
		this.sourceVendor = rowData;
		this.modal = this.modalService.open(content1, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}


	openEdit(row) {
        
		this.workFlowtService.listCollection = row;
		this.workFlowtService.enableUpdateMode = true;
        this.workFlowtService.currentWorkFlowId = row.workflowId;
		this.route.navigateByUrl('/workflowmodule/workflowpages/wf-create');
		
	}
	private loadContactDataData(vendorId) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		//this.workFlowtService.getContacts(vendorId).subscribe(
		//	results => this.onContactDataLoadSuccessful(results[0]),
		//	error => this.onDataLoadFailed(error)
		//);

		this.contactcols = [
			//{ field: 'actionId', header: 'Action Id' },
			{ field: 'firstName', header: 'First Name' },
			{ field: 'lastName', header: 'Last  Name' },
			{ field: 'contactTitle', header: 'Contact Title' },
			{ field: 'email', header: 'Email' },
			{ field: 'mobilePhone', header: 'Mobile Phone' },
			{ field: 'fax', header: 'Fax' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' },
			{ field: 'updatedDate', header: 'Updated Date' },
			{ field: 'createdDate', header: 'Created Date' }

		];

		this.selectedContactColumns = this.contactcols;

	}
	private loadShippingData(vendorId) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		//this.workFlowtService.getVendorShipAddressGet(vendorId).subscribe(
		//	results => this.onShippingDataLoadSuccessful(results[0]),
		//	error => this.onDataLoadFailed(error)
		//);

		this.shippingCol = [

			{ field: 'siteName', header: 'Site Name' },
			{ field: 'address1', header: 'Address1' },
			{ field: 'address2', header: 'Address2' },
			{ field: 'address3', header: 'Address3' },
			{ field: 'city', header: 'City' },
			{ field: 'stateOrProvince', header: 'State/Prov' },
			{ field: 'postalCode', header: 'Postal Code' },
			{ field: 'country', header: 'Country' }

		];

		this.selectedShippingColumns = this.shippingCol;

	}


	private onContactDataLoadSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allContacts = allWorkFlows;


	}
	private onPaymentDataLoadSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allpayments = allWorkFlows;


	}
	private onShippingDataLoadSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allShippings = allWorkFlows;


	}

	private loadPayamentData(vendorId) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		//this.workFlowtService.getCheckPaymentobj(vendorId).subscribe(
		//	results => this.onPaymentDataLoadSuccessful(results[0]),
		//	error => this.onDataLoadFailed(error)
		//);



		this.paymentcols = [
			//{ field: 'actionId', header: 'Action Id' },
			{ field: 'siteName', header: 'Site Name' },
			{ field: 'address1', header: 'Address' },
			{ field: 'city', header: 'City' },
			{ field: 'stateOrProvince', header: 'State/Prov' },
			{ field: 'postalCode', header: 'Postal Code' },
			{ field: 'country', header: 'Country' }

		];

		this.selectedPaymentColumns = this.paymentcols;

	}

	openView(content, row) {

		//this.sourceVendor = row;
		this.vendorCode = row.vendorCode;
		this.vendorName = row.vendorName;
		this.vendorTypeId = row.t.vendorTypeId;
		this.doingBusinessAsName = row.t.doingBusinessAsName;
		this.parent = row.parent;
		this.address1 = row.address1;
		this.address2 = row.address2;
		this.address3 = row.address3;
		this.city = row.city;
		this.stateOrProvince = row.stateOrProvince;
		this.postalCode = row.postalCode;
		this.country = row.country;
		this.vendorEmail = row.vendorEmail;
		this.vendorClassificationId = row.vendorClassificationId;
		this.vendorContractReference = row.t.vendorContractReference;
		this.isPreferredVendor = row.t.isPreferredVendor;
		this.licenseNumber = row.t.licenseNumber;
		this.capabilityId = row.capabilityId;
		this.vendorURL = row.t.vendorURL;
		//this.sourceVendor = row;
		this.creditlimit = row.t.creditlimit;
		this.creditTermsId = row.t.creditTermsId;
		this.currencyId = row.t.currencyId;
		this.discountLevel = row.t.discountLevel;
		this.is1099Required = row.t.is1099Required;
		this.loadContactDataData(row.vendorId);
		this.loadPayamentData(row.vendorId);
		this.loadShippingData(row.vendorId);
		this.modal = this.modalService.open(content, { size: 'lg' });
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

	openHist(content, row) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;


		this.sourceVendor = row;


		this.isSaving = true;
		//debugger;
		//this.workFlowtService.vendorHistory(this.sourceVendor.vendorId).subscribe(
		//	results => this.onHistoryLoadSuccessful(results[0], content),
		//	error => this.saveFailedHelper(error));


	}


	AddPage() {

		this.workFlowtService.enableUpdateMode = false;

		this.route.navigateByUrl('/workflowmodule/workflowpages/wf-create');

	}


	

	deleteItemAndCloseModel() {
		this.isSaving = true;
		this.isDeleteMode = true;
		this.sourceVendor.isdelete = false;
		//this.sourceVendor = content;
		this.sourceVendor.updatedBy = this.userName;
		//this.workFlowtService.updatevendorstatus(this.sourceVendor).subscribe(
		//	response => this.saveCompleted(this.sourceVendor),
		//	error => this.saveFailedHelper(error));
		//this.modal.close();
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

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
	//handleChangesforcontacts(rowData, e) {
	//	if (e.checked == false) {
	//		this.sourceVendor = rowData;
	//		this.sourceVendor.updatedBy = this.userName;
	//		this.Active = "In Active";
	//		this.sourceVendor.isActive == false;
	//		this.workFlowtService.updateContactforActive(this.sourceVendor).subscribe(
	//			response => this.saveCompleted(this.sourceVendor),
	//			error => this.saveFailedHelper(error));
	//		//alert(e);
	//	}
	//	else {
	//		this.sourceVendor = rowData;
	//		this.sourceVendor.updatedBy = this.userName;
	//		this.Active = "Active";
	//		this.sourceVendor.isActive == true;
	//		this.workFlowtService.updateContactforActive(this.sourceVendor).subscribe(
	//			response => this.saveCompleted(this.sourceVendor),
	//			error => this.saveFailedHelper(error));
	//		//alert(e);
	//	}

	//}
	opencontactView(content, row) {

		this.sourceVendor = row;
		this.firstName = row.firstName;
		this.lastName = row.lastName;
		this.contactTitle = row.contactTitle;
		this.email = row.email;
		this.mobilePhone = row.mobilePhone;
		this.fax = row.fax;
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

	deleteItemAndCloseModelforContact(contactId) {
		// debugger;

		this.isSaving = true;

		//this.workFlowtService.deleteContact(contactId).subscribe(
		//	response => this.saveCompleted(this.sourceVendor),
		//	error => this.saveFailedHelper(error));
		//this.modal.close();
	}


	openEditforcontact(content, row) {

		this.isEditMode = true;

		this.isSaving = true;
		this.sourceVendor = row;
		this.loadMasterCompanies();
		// this.actionName = this.sourceVendor.description;

	}
	openViewforfinance(content, row) {

		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'lg' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	//handleChangesforcontact(rowData, e) {
	//	if (e.checked == false) {
	//		this.sourceVendor = rowData;
	//		this.sourceVendor.updatedBy = this.userName;
	//		this.Active = "In Active";
	//		this.sourceVendor.isActive == false;
	//		this.workFlowtService.updateContactforActive(this.sourceVendor).subscribe(
	//			response => this.saveCompleted(this.sourceVendor),
	//			error => this.saveFailedHelper(error));
	//		//alert(e);
	//	}
	//	else {
	//		this.sourceVendor = rowData;
	//		this.sourceVendor.updatedBy = this.userName;
	//		this.Active = "Active";
	//		this.sourceVendor.isActive == true;
	//		this.workFlowtService.updateContactforActive(this.sourceVendor).subscribe(
	//			response => this.saveCompleted(this.sourceVendor),
	//			error => this.saveFailedHelper(error));
	//		//alert(e);
	//	}

	//}

	openHistforcontact(content, row) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;


		this.sourceVendor = row;


		this.isSaving = true;
		//debugger;
		//this.workFlowtService.historyAcion(this.sourceVendor.contactId).subscribe(
		//	results => this.onHistoryLoadSuccessful(results[0], content),
		//	error => this.saveFailedHelper(error));


	}
	openContactList(content, row) {
		this.modal = this.modalService.open(content, { size: 'lg' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
		this.loadContactDataData(row.vendorId);


	}
}