import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { PageHeaderComponent } from '../../../shared/page-header.component';
import { PaginatorModule } from 'primeng/paginator';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Params, ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { MasterCompany } from '../../../models/mastercompany.model';
import { AuditHistory } from '../../../models/audithistory.model';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { Customer } from '../../../models/Customer.model';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { CustomerService } from '../../../services/customer.service';


@Component({
    selector: 'app-customer-contacts',
    templateUrl: './customer-contacts.component.html',
   // styleUrls: ['./customers-contacts.component.scss'],
    animations: [fadeInOut]
})
/** CustomerEdit component*/
export class CustomerContactsComponent implements OnInit, AfterViewInit {
	activeIndex: number;
	showFirstName: boolean;
	showemail: boolean;
	showworkPhone: boolean;
	showmobilePhone: boolean;
	showLastName: boolean;
	showcustomerContractReference: boolean;
	alldata: any[];
	middleNames: any[];
	lastNames: any;
	firstNames: any;
	customerCode: any = "";
	customername: any = "";
	allgeneralInfo: any[];
	collection: any;
	action_name: any = "";
	memo: any = "";
	createdBy: any = "";
	updatedBy: any = "";
	createddate: any = "";
	updatedDate: any = "";
	sub: any;
	local: any;
    isCustomerAlsoVendor: boolean=false;
	allViewforContact: any = {};
	sourceViewforContact: any = {};
	ngOnInit(): void {
		this.workFlowtService.currentUrl = '/customersmodule/customerpages/app-customer-contacts';
		this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
		this.workFlowtService.ShowPtab = true;
		this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab); //steps

		// debugger;
		if (this.local) {
			this.loadData();
		}

		this.loadCompleteddata();
		//this.loadEmptyObject();
		this.router.queryParams.subscribe((params: Params) => {

			//this.local = params;
		});

	}
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	filteredBrands: any[];
	displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
	dataSource: MatTableDataSource<any>;
	allActions: any[] = [];
	allComapnies: MasterCompany[] = [];
	private isSaving: boolean;
	public sourceCustomer: any = {};
	public sourceAction: any = [];
	public auditHisory: AuditHistory[] = [];
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
	localCollection: any;
	isDefault: boolean = false;
	comName: string;
	display: boolean = false;
	modelValue: boolean = false;

	/** Actions ctor */

	private isEditMode: boolean = false;
	private isDeleteMode: boolean = false;

	constructor(private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: CustomerService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {

			//this.comName = companyDirective.companyName;
		if (this.workFlowtService.generalCollection) {

			this.local = this.workFlowtService.generalCollection;
		}
		if (this.local) {

			this.workFlowtService.contactCollection = this.local;
		}

		this.dataSource = new MatTableDataSource();
		if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
			this.local = this.workFlowtService.listCollection.t;
			this.loadData();
		}
        this.alertService.stopLoadingMessage();
	}
	filterFirstNames(event) {

		this.firstNames = [];
		for (let i = 0; i < this.alldata.length; i++) {
			let firstName = this.alldata[i].firstName;

			if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.firstNames.push(firstName);

			}
		}
	}
	filterLastNames(event) {

		this.lastNames = [];
		for (let i = 0; i < this.alldata.length; i++) {
			let lastName = this.alldata[i].lastName;

			if (lastName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.lastNames.push(lastName);

			}
		}
	}
	filterMiddleNames(event) {

		this.middleNames = [];
		for (let i = 0; i < this.alldata.length; i++) {
			let middleName = this.alldata[i].middleName;
			if (middleName != "" && middleName != null && middleName != "Null") {
				if (middleName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.middleNames.push(middleName);

				}

			}
		}
	}
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	public allWorkFlows: any[] = [];
	private getgeneralInnfo() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getWorkFlows().subscribe(
			results => this.ongeneralDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private loadEmptyObject() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getEmptyObj().subscribe(
			results => this.onEmptyObjUrl(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}


	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getContacts(this.local.customerId).subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

		this.cols = [
			//{ field: 'actionId', header: 'Action Id' },
			{ field: 'firstName', header: 'First Name' },
			{ field: 'lastName', header: 'Last  Name' },
			{ field: 'contactTitle', header: 'Contact Title' },
			{ field: 'email', header: 'Email' },
			{ field: 'workPhone', header: 'Mobile Phone' },
			{ field: 'fax', header: 'Fax' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' },
			{ field: 'updatedDate', header: 'Updated Date' },
			{ field: 'createdDate', header: 'Created Date' }

		];

		this.selectedColumns = this.cols;

	}

	private loadCompleteddata() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getContactsFirstName().subscribe(
			results => this.ondata(results[0]),
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
	handleChange(rowData, e) {
		if (e.checked == false) {
			this.sourceCustomer = rowData;
			this.sourceCustomer.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceCustomer.isActive == false;
			this.workFlowtService.updateContactinfo(this.sourceCustomer).subscribe(
				response => this.saveCompleted(this.sourceCustomer),
				error => this.saveFailedHelper(error));
			//alert(e);
		}
		else {
			this.sourceCustomer = rowData;
			this.sourceCustomer.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceCustomer.isActive == true;
			this.workFlowtService.updateContactinfo(this.sourceCustomer).subscribe(
				response => this.saveCompleted(this.sourceCustomer),
				error => this.saveFailedHelper(error));
			//alert(e);
		}

	}

	private refresh() {
		// Causes the filter to refresh there by updating with recently added data.
		this.applyFilter(this.dataSource.filter);
	}
	private onDataLoadSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allActions = allWorkFlows;


	}
	private ondata(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.alldata = allWorkFlows;


	}

	dismissModel() {

		this.modal.close();
	}
	private onEmptyObjUrl(allWorkFlows: any) {
		//debugger;
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.sourceCustomer = allWorkFlows;


	}
	private ongeneralDataLoadSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allgeneralInfo = allWorkFlows;
		this.customername = this.allgeneralInfo[0].customername;
		this.customerCode = this.allgeneralInfo[0].customerCode;
		console.log(this.allgeneralInfo);


	}

	filterActions(event) {

		this.localCollection = [];
		for (let i = 0; i < this.alldata.length; i++) {
			let actionName = this.alldata[i].description;

			if (actionName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.localCollection.push(actionName);

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


	openDelete(content, row) {

		this.isEditMode = false;
		this.isDeleteMode = true;
		delete row.updatedBy;
		this.localCollection = row;

		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openEdit(content, row) {

		this.isEditMode = true;

		this.isSaving = true;
		this.sourceCustomer = row;
		this.loadMasterCompanies();
		// this.actionName = this.sourceVendor.description;
		this.loadData();

	}
	opencontactView(content, row) {

		this.sourceViewforContact = row;
		//this.allViewforContact.firstName = row.firstName;
		//this.contactTitle = row.contactTitle;
		//this.workPhone = row.workPhone;
		//this.email = row.email;
		//this.mobilePhone = row.mobilePhone;
		//this.fax = row.fax;
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

	openHist(content, row) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;


		this.sourceCustomer = row;


		this.isSaving = true;
		//debugger;
		this.workFlowtService.historyAcion(this.sourceCustomer.contactId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));


	}

	onBlurMethod(data) {
		if (data == 'firstName') {
			this.showFirstName = false;
		}
		if (data == 'lastName') {
			this.showLastName = false;
		}
		if (data == 'workPhone') {
			this.showworkPhone = false;
		}
		if (data == 'email') {
			this.showemail = false;
		}
	}

	sample() {
		if (!(this.sourceCustomer.firstName && this.sourceCustomer.lastName &&
			this.sourceCustomer.workPhone && this.sourceCustomer.email 
		)) {
			this.display = true;
			this.modelValue = true;
		}
	}
	editItemAndCloseModel() {
        if (!(this.sourceCustomer.firstName && this.sourceCustomer.lastName &&
            this.sourceCustomer.workPhone && this.sourceCustomer.email
        )) {
            this.display = true;
            this.modelValue = true;
        }
		

		if (this.sourceCustomer.firstName && this.sourceCustomer.lastName && this.sourceCustomer.workPhone && this.sourceCustomer.email) {

			this.isSaving = true;
			if (!this.sourceCustomer.customerContactId) {
				this.sourceCustomer.createdBy = this.userName;
				this.sourceCustomer.updatedBy = this.userName;
				this.sourceCustomer.masterCompanyId = 1;
				this.isDefault = this.sourceCustomer.isDefaultContact;
				this.workFlowtService.newAddContactInfo(this.sourceCustomer).subscribe(data => {

					this.localCollection = data;
					this.sourceCustomer= new Object();
					this.localCollection.CustomerId = this.local.customerId;
					this.localCollection.ContactId = this.local.contactId;
					//this.localCollection.IsDefaultContact = false;
					this.loadData();
					if (data) {
						this.localCollection.isDefaultContact = this.isDefault;
						this.updateCustomerContact(this.localCollection);
						this.loadData();
					}
					if (this.sourceCustomer.isCustomerAlsoVendor == true) {
						this.workFlowtService.isCustomerAlsoVendor = this.isCustomerAlsoVendor;
						this.workFlowtService.localCollectiontoVendor = data;
					}
					//let navigationExtras: NavigationExtras = {
					//    queryParams: this.local
					//}
					//this.route.navigate(['/customersmodule/customerpages/app-customer-financial-information'], navigationExtras);
					this.workFlowtService.contactCollection = this.local;
					this.savesuccessCompleted(this.sourceCustomer);
					this.activeIndex = 1;
					this.workFlowtService.indexObj.next(this.activeIndex);
					
					//this.route.navigateByUrl('/customersmodule/customerpages/app-customer-financial-information');
				})


			}
			else {
				
				this.activeIndex = 1;
				//this.workFlowtService.indexObj.next(this.activeIndex);
				//this.route.navigateByUrl('/customersmodule/customerpages/app-customer-financial-information');

				this.sourceCustomer.updatedBy = this.userName;
				this.sourceCustomer.masterCompanyId = 1;
				this.workFlowtService.updateContactinfo(this.sourceCustomer).subscribe(data => {
					this.loadData();
					//this.localCollection.isDefaultContact = this.sourceCustomer.isDefaultContact;
					if (data) { this.sourceCustomer = new Object(); }

				})
				this.saveCompleted(this.sourceCustomer);
			}

		}

		else {
		}
		
		//this.workFlowtService.contactCollection = this.local;
		//this.modal.close();
	}
	toggledbldisplay(data) {
		this.sourceCustomer = data;

	}
    nextClick() {
        this.workFlowtService.contactCollection = this.local;
		this.activeIndex = 2;
		this.workFlowtService.indexObj.next(this.activeIndex);
		//this.saveCompleted(this.sourceCustomer);
		this.route.navigateByUrl('/customersmodule/customerpages/app-customer-financial-information');
		
	}
	backClick() {
		this.workFlowtService.contactCollection = this.local;
		this.activeIndex = 0;
		this.workFlowtService.indexObj.next(this.activeIndex);
		//this.saveCompleted(this.sourceCustomer);
		this.route.navigateByUrl('/customersmodule/customerpages/app-customer-general-information');

	}

	deleteItemAndCloseModel(contactId) {
		// debugger;

		this.isSaving = true;

		this.workFlowtService.deleteContact(contactId).subscribe(
			response => this.saveCompleted(this.sourceCustomer),
			error => this.saveFailedHelper(error));
		//this.modal.close();
	}

	updateCustomerContact(updateObj: any) {
		this.workFlowtService.newAddCustomerContact(updateObj).subscribe(data => {
			this.loadData();
		})
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
	private savesuccessCompleted(user?: any) {
		this.isSaving = false;


		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);



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
}


