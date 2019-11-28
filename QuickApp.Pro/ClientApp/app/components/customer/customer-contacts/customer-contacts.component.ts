import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
// import { PageHeaderComponent } from '../../../shared/page-header.component';
// import { PaginatorModule } from 'primeng/paginator';
// import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
// import { TableModule } from 'primeng/table';
// import { ButtonModule } from 'primeng/button';
// import { SelectButtonModule } from 'primeng/selectbutton';
// import { InputTextModule } from 'primeng/inputtext';
// import { MultiSelectModule } from 'primeng/multiselect';
// import { AutoCompleteModule } from 'primeng/autocomplete';
import { Params, ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
// import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
// import { MasterCompany } from '../../../models/mastercompany.model';
// import { AuditHistory } from '../../../models/audithistory.model';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
// import { Customer } from '../../../models/Customer.model';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { CustomerService } from '../../../services/customer.service';
import { CustomerContactModel } from '../../../models/customer-contact.model';
import { MatDialog } from '@angular/material';
import { getObjectByValue, getObjectById, getValueFromObjectByKey, editValueAssignByCondition } from '../../../generic/autocomplete';
import { AtaSubChapter1Service } from '../../../services/atasubchapter1.service';


@Component({
	selector: 'app-customer-contacts',
	templateUrl: './customer-contacts.component.html',
	styleUrls: ['./customer-contacts.component.scss'],
})
/** CustomerEdit component*/
export class CustomerContactsComponent implements OnInit {
	@Input() savedGeneralInformationData;
	@Input() editMode;
	@Input() editGeneralInformationData;
	@Input() add_ataChapterList;

	// @Input() ataListDataValues;
	@Output() tab = new EventEmitter<any>();
	@Output() saveCustomerContactATAMapped = new EventEmitter();
	@Output() refreshCustomerATAMapped = new EventEmitter();
	contactsListOriginal: any;
	firstNamesList: any;
	middleNamesList: any;
	lastNamesList: any;
	contactInformation = new CustomerContactModel()
	customerContacts: any = [];
	customerContactsColumns = [
		{ field: 'tag', header: 'Tag' },
		{ field: 'firstName', header: 'First Name' },
		{ field: 'lastName', header: 'Last Name' },
		{ field: 'contactTitle', header: 'Contact Title' },
		{ field: 'email', header: 'Email' },
		{ field: 'workPhone', header: 'Work Phone' },
		{ field: 'mobilePhone', header: 'Mobile Phone' },
		{ field: 'fax', header: 'Fax' },
		{ field: 'isDefaultContact', header: 'Primary Contact' },
		{ field: 'notes', header: 'Memo' },
		{ field: 'updatedDate', header: 'Updated Date' },
		{ field: 'createdDate', header: 'Created Date' }
	];
	selectedColumns = this.customerContactsColumns;

	ediData: any;
	isEditButton: boolean = false;
	id: number;
	customerCode: any;
	customerName: any;
	emailPattern = "[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";
	urlPattern = "^((ht|f)tp(s?))\://([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(/\S*)?$";
	sourceViewforContact: any;
	add_SelectedId: any;
	add_SelectedModels: any;
	add_ataSubChapterList: any;
	selectedContact: any;
	ataHeaders = [
		{ field: 'ataChapterName', header: 'ATA Chapter' },
		{ field: 'ataSubChapterDescription', header: 'ATA Sub-Chapter' }
	]
	ataListDataValues = []
	auditHistory: any[] = [];
    @ViewChild('ATAADD') myModal;

	constructor(private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public customerService: CustomerService,
		private dialog: MatDialog, private atasubchapter1service: AtaSubChapter1Service, private masterComapnyService: MasterComapnyService) {
	}

	ngOnInit() {
		if (this.editMode) {
			this.id = this.editGeneralInformationData.customerId;
			this.customerCode = this.editGeneralInformationData.customerCode;
			this.customerName = this.editGeneralInformationData.name;
			console.log(this.id);

			this.getAllCustomerContact()
		} else {
			this.id = this.savedGeneralInformationData.customerId;
			this.customerCode = this.savedGeneralInformationData.customerCode;
			this.customerName = this.savedGeneralInformationData.name;
		}

		this.getAllContacts();
       // this.getATACustomerContactMapped();
	}


	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}

	getAllContacts() {
		this.customerService.getContactsFirstName().subscribe(res => {
			this.contactsListOriginal = res[0];
		})
	}

	filterFirstNames(event) {
		this.firstNamesList = this.contactsListOriginal
		this.firstNamesList = [...this.contactsListOriginal.filter(x => {
			return x.firstName.toLowerCase().includes(event.query.toLowerCase())
		})]
	}
	filterMiddleNames(event) {
		console.log(event);
		this.middleNamesList = this.contactsListOriginal
		this.middleNamesList = [...this.contactsListOriginal.filter(x => {
			if (x.lastName! == null) {
				return x.middleName.toLowerCase().includes(event.query.toLowerCase())
			}

		})]
	}
	filterLastNames(event) {
		this.lastNamesList = this.contactsListOriginal
		this.lastNamesList = [...this.contactsListOriginal.filter(x => {
			return x.lastName.toLowerCase().includes(event.query.toLowerCase())
		})]
	}

	async saveContactInformation() {

		// create a new contact in the contact table
		const data = { ...this.contactInformation, createdBy: this.userName, updatedBy: this.userName, masterCompanyId: 1 }
		await this.customerService.newAddContactInfo(data).subscribe(res => {
			const responseForCustomerCreate = res;

			this.customerService.newAddCustomerContact(
				{ ...responseForCustomerCreate, CustomerId: this.id }).subscribe(res => {


					this.contactInformation = new CustomerContactModel()
					// get all contacts
					// this.getAllContacts();
					// get Customer Contatcs 
					this.getAllCustomerContact();
					this.alertService.showMessage(
						'Success',
						`Sucessfully Created Contact`,
						MessageSeverity.success
					);
				})
		})
	}

	// autoCompleteBindingByValue(field, value, originalData) {
	// 	const data = originalData.filter(x => {
	// 		if (x[field] === value) {
	// 			return x;
	// 		}
	// 	})
	// 	return data[0];
	// }

	viewSelectedRow(rowData) {
		this.sourceViewforContact = rowData;
    }
    onAddContactInfo() {
        this.isEditButton = false;
        this.contactInformation = new CustomerContactModel()


    }
	editCustomerContact(rowData) {
		this.ediData = { ...rowData };
		this.isEditButton = true;
		this.contactInformation = {
			...this.ediData,
			// firstName: getObjectByValue('firstName', this.ediData.firstName, this.contactsListOriginal),
			// middleName: getObjectByValue('middleName', this.ediData.middleName, this.contactsListOriginal),
			// lastName: getObjectByValue('lastName', this.ediData.lastName, this.contactsListOriginal),
		}
        console.log(this.contactInformation);
        this.sourceViewforContact = '';

	}

	// returnNameByKey(field, obj) {
	// 	return obj[field];

	// }
	updateCustomerContact() {
		const data = {
			...this.contactInformation,
			masterCompanyId: 1,
			firstName: editValueAssignByCondition('firstName', this.contactInformation.firstName),
			middleName: editValueAssignByCondition('middleName', this.contactInformation.middleName),
			lastName: editValueAssignByCondition('lastName', this.contactInformation.lastName)

		}
		this.customerService.updateContactinfo(data).subscribe(res => {
			this.getAllCustomerContact();
			this.alertService.showMessage(
				'Success',
				`Sucessfully Updated Contact`,
				MessageSeverity.success
			);
		});
	}


	getAllCustomerContact() {
		// get Customer Contatcs 
		this.customerService.getContacts(this.id).subscribe(res => {
			this.customerContacts = res[0]
		})
	}

    handleChange(rowData) {
        this.sourceViewforContact = '';

		// if (e.checked == false) {
		const data = { ...rowData, updatedBy: this.userName };

		this.customerService.updateContactinfo(data).subscribe(res => {

			this.getAllCustomerContact();
			this.alertService.showMessage(
				'Success',
				`Sucessfully Updated Status`,
				MessageSeverity.success
			);
		});
		// }
		// else {
		// 	const data = { ...rowData, updatedBy: this.userName, isActive: true };
		// 	this.customerService.updateContactinfo(data).subscribe(res => {
		// 		this.getAllCustomerContact();
		// 	});
		// }

	}
	deleteContact(id) {
		this.customerService.deleteContact(id).subscribe(res => {
			this.getAllCustomerContact()

			this.alertService.showMessage(
				'Success',
				`Sucessfully Deleted Customer Contact`,
				MessageSeverity.success
			);
		})
	}

    addATAChapter(rowData) {
        this.sourceViewforContact = '';

		this.selectedContact = rowData;
		this.ataListDataValues = [];
		this.getATACustomerContactMapped();

	}




	// get subchapter by Id in the add ATA Mapping
    getATASubChapterByATAChapter() {

		const selectedATAId = getValueFromObjectByKey('ataChapterId', this.add_SelectedId)
		this.atasubchapter1service.getATASubChapterListByATAChapterId(selectedATAId).subscribe(atasubchapter => {
			const responseData = atasubchapter[0];
			this.add_ataSubChapterList = responseData.map(x => {
				return {
					label: x.description,
					value: x
				}
			})
		})
	}
	// post the ata Mapping 
	async addATAMapping() {
		// const id = this.savedGeneralInformationData.customerId;
		const ataMappingData = this.add_SelectedModels.map(x => {
			return {
				CustomerId: this.id,
				CustomerContactId: this.selectedContact.contactId,
				ATAChapterId: getValueFromObjectByKey('ataChapterId', this.add_SelectedId),
				ATASubChapterId: x.ataSubChapterId,
				ATAChapterCode: getValueFromObjectByKey('ataChapterCode', this.add_SelectedId),
				ATAChapterName: getValueFromObjectByKey('ataChapterName', this.add_SelectedId),
				ATASubChapterDescription: x.description,
				MasterCompanyId: x.masterCompanyId,
				CreatedBy: this.userName,
				UpdatedBy: this.userName,
				CreatedDate: new Date(),
				UpdatedDate: new Date(),
				IsDeleted: false,
			}
        })
       
		this.add_SelectedModels = undefined;
		this.add_SelectedId = undefined;
       	await this.saveCustomerContactATAMapped.emit(ataMappingData);

 

     
        this.openModel();



    }
    openModel() {
        this.myModal.nativeElement.className = 'modal fade show';
        this.getATACustomerContactMapped();

       
    }

	getATACustomerContactMapped() {
		this.customerService.getATAMappedByContactId(this.selectedContact.contactId).subscribe(res => {
			console.log(res);
			this.ataListDataValues = res;
		})
	}

	deleteATAMapped(rowData) {
		this.customerService.deleteATAMappedByContactId(rowData.customerContactATAMappingId).subscribe(res => {
			this.getATACustomerContactMapped();
			this.refreshCustomerATAMapped.emit(this.id)
			this.alertService.showMessage(
				'Success',
				'Deleted ATA Mapped  Successfully ',
				MessageSeverity.success
			);
		})

	}

	getAuditHistoryById(rowData) {
		this.customerService.getCustomerContactAuditDetails(rowData.customerContactId).subscribe(res => {
			this.auditHistory = res;
		})
    }
  
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

	nextClick() {
		this.tab.emit('AircraftInfo');

	}
	backClick() {
		this.tab.emit('General');
	}
   









	// activeIndex: number;
	// showFirstName: boolean;
	// showemail: boolean;
	// showworkPhone: boolean;
	// showmobilePhone: boolean;
	// showLastName: boolean;
	// showcustomerContractReference: boolean;
	// alldata: any[];
	// middleNames: any[];
	// lastNames: any;
	// firstNames: any;
	// customerCode: any = "";
	// customername: any = "";
	// allgeneralInfo: any[];
	// collection: any;
	// action_name: any = "";
	// memo: any = "";
	// createdBy: any = "";
	// updatedBy: any = "";
	// createddate: any = "";
	// updatedDate: any = "";
	// sub: any;
	// local: any;
	// isCustomerAlsoVendor: boolean = false;
	// allViewforContact: any = {};
	// sourceViewforContact: any = {};
	// @ViewChild(MatPaginator) paginator: MatPaginator;
	// @ViewChild(MatSort) sort: MatSort;
	// filteredBrands: any[];
	// displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
	// dataSource: MatTableDataSource<any>;
	// allActions: any[] = [];
	// allComapnies: MasterCompany[] = [];
	// private isSaving: boolean;
	// public sourceCustomer: any = {};
	// public sourceAction: any = [];
	// public auditHisory: AuditHistory[] = [];
	// private bodyText: string;
	// loadingIndicator: boolean;
	// closeResult: string;
	// selectedColumn: any[];
	// selectedColumns: any[];
	// cols: any[];
	// title: string = "Create";
	// id: number;
	// errorMessage: any;
	// modal: NgbModalRef;
	// actionName: string;
	// Active: string = "Active";
	// length: number;
	// localCollection: any;
	// isDefault: boolean = false;
	// comName: string;
	// display: boolean = false;
	// modelValue: boolean = false;
	// isEditMode: boolean = false;
	// isDeleteMode: boolean = false;
	// public allWorkFlows: any[] = [];
	// isDefaultContact: any;
	// selectedFirstName: any;
	// disableSaveFirstName: boolean;
	// disableSaveMiddleName: boolean;
	// selectedMiddleName: any;
	// disableSaveName: any;
	// disableSavelastName: any;
	// disableSaveLastName: boolean;
	// sourceCustomerTemp: any = {};
	// //@ViewChild('addContactForm') addContactForm: NgForm;

	// constructor(private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public customerService: CustomerService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {

	// 	//this.comName = companyDirective.companyName;
	// 	if (this.customerService.generalCollection) {

	// 		this.local = this.customerService.generalCollection;
	// 	}
	// 	if (this.local) {

	// 		this.customerService.contactCollection = this.local;
	// 	}

	// 	this.dataSource = new MatTableDataSource();
	// 	if (this.customerService.listCollection && this.customerService.isEditMode == true) {
	// 		this.local = this.customerService.listCollection.t;
	// 		this.loadData();
	// 	}
	// 	this.alertService.stopLoadingMessage();
	// }

	// ngOnInit(): void {
	// 	this.customerService.currentUrl = '/customersmodule/customerpages/app-customer-contacts';
	// 	this.customerService.bredcrumbObj.next(this.customerService.currentUrl);
	// 	this.customerService.ShowPtab = true;
	// 	this.customerService.alertObj.next(this.customerService.ShowPtab); //steps
	// 	if (this.local) {
	// 		this.loadData();
	// 	}
	// 	this.loadCompleteddata();
	// 	this.router.queryParams.subscribe((params: Params) => {
	// 	});
	// }
	// //Filter Customer First Name//
	// filterFirstNames(event) {
	// 	this.firstNames = [];
	// 	if (this.alldata) {
	// 		for (let i = 0; i < this.alldata.length; i++) {
	// 			let firstName = this.alldata[i].firstName;

	// 			if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
	// 				this.firstNames.push(firstName);

	// 			}
	// 		}
	// 	}
	// }

	// // filter Last Name of Customer//
	// filterLastNames(event) {
	// 	this.lastNames = [];
	// 	for (let i = 0; i < this.alldata.length; i++) {
	// 		let lastName = this.alldata[i].lastName;

	// 		if (lastName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
	// 			this.lastNames.push(lastName);

	// 		}
	// 	}
	// }

	// // filter Middle Name of Customer//
	// filterMiddleNames(event) {
	// 	this.middleNames = [];
	// 	for (let i = 0; i < this.alldata.length; i++) {
	// 		let middleName = this.alldata[i].middleName;
	// 		if (middleName != "" && middleName != null && middleName != "Null") {
	// 			if (middleName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
	// 				this.middleNames.push(middleName);

	// 			}

	// 		}
	// 	}
	// }
	// private onDataLoadSuccessful(allWorkFlows: any[]) {
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.dataSource.data = allWorkFlows;
	// 	this.allActions = allWorkFlows;


	// }
	// ngAfterViewInit() {
	// 	this.dataSource.paginator = this.paginator;
	// 	this.dataSource.sort = this.sort;
	// }

	// //Load Contacts//
	// loadData() {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;
	// 	this.customerService.getContacts(this.local.customerId).subscribe(
	// 		results => this.onDataLoadSuccessful(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// 	this.cols = [
	// 		{ field: 'firstName', header: 'First Name' },
	// 		{ field: 'lastName', header: 'Last Name' },
	// 		{ field: 'contactTitle', header: 'Contact Title' },
	// 		{ field: 'email', header: 'Email' },
	// 		{ field: 'workPhone', header: 'Work Phone' },
	// 		{ field: 'mobilePhone', header: 'Mobile Phone' },
	// 		{ field: 'fax', header: 'Fax' },
	// 		//{ field: 'createdBy', header: 'Created By' },
	// 		//{ field: 'updatedBy', header: 'Updated By' },
	// 		{ field: 'isDefaultContact', header: 'Primary Contact' },
	// 		{ field: 'notes', header: 'Memo' },
	// 		{ field: 'updatedDate', header: 'Updated Date' },
	// 		{ field: 'createdDate', header: 'Created Date' }

	// 	];

	// 	this.selectedColumns = this.cols;

	// }

	// // Load Compamiesdata//
	// private loadCompleteddata() {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;
	// 	this.customerService.getContactsFirstName().subscribe(
	// 		results => this.ondata(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);


	// }

	// private loadMasterCompanies() {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;
	// 	this.masterComapnyService.getMasterCompanies().subscribe(
	// 		results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);

	// }
	// private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.allComapnies = allComapnies;

	// }


	// public applyFilter(filterValue: string) {
	// 	this.dataSource.filter = filterValue;
	// }
	// handleChange(rowData, e) {
	// 	if (e.checked == false) {
	// 		this.sourceCustomer = rowData;
	// 		this.sourceCustomer.updatedBy = this.userName;
	// 		this.Active = "In Active";
	// 		this.sourceCustomer.isActive == false;
	// 		this.customerService.updateContactinfo(this.sourceCustomer).subscribe(
	// 			response => this.saveCompleted(this.sourceCustomer),
	// 			error => this.saveFailedHelper(error));
	// 		this.sourceCustomer = "";

	// 	}
	// 	else {
	// 		this.sourceCustomer = rowData;
	// 		this.sourceCustomer.updatedBy = this.userName;
	// 		this.Active = "Active";
	// 		this.sourceCustomer.isActive == true;
	// 		this.customerService.updateContactinfo(this.sourceCustomer).subscribe(
	// 			response => this.saveCompleted(this.sourceCustomer),
	// 			error => this.saveFailedHelper(error));
	// 		this.sourceCustomer = "";
	// 	}

	// }

	// private refresh() {
	// 	this.applyFilter(this.dataSource.filter);
	// }

	// private ondata(allWorkFlows: any[]) {
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.dataSource.data = allWorkFlows;
	// 	this.alldata = allWorkFlows;
	// }

	// dismissModel() {
	// 	this.modal.close();
	// }


	// // Filter Values//
	// filterActions(event) {
	// 	this.localCollection = [];
	// 	for (let i = 0; i < this.alldata.length; i++) {
	// 		let actionName = this.alldata[i].description;
	// 		if (actionName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
	// 			this.localCollection.push(actionName);
	// 		}
	// 	}
	// }





	// private onDataLoadFailed(error: any) {
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;

	// }

	// open(content) {
	// 	this.isEditMode = false;
	// 	this.isDeleteMode = false;
	// 	this.isSaving = true;
	// 	this.loadMasterCompanies();
	// 	this.actionName = "";
	// 	this.modal = this.modalService.open(content, { size: 'sm' });
	// 	this.modal.result.then(() => {
	// 		console.log('When user closes');
	// 	}, () => { console.log('Backdrop click') })
	// }


	// openDelete(content, row) {
	// 	this.isEditMode = false;
	// 	this.isDeleteMode = true;
	// 	delete row.updatedBy;
	// 	this.localCollection = row;
	// 	this.modal = this.modalService.open(content, { size: 'sm' });
	// 	this.modal.result.then(() => {
	// 		console.log('When user closes');
	// 	}, () => { console.log('Backdrop click') })
	// }

	// /*openEdit(content, row) {
	// 	this.isEditMode = true;
	// 	this.isSaving = true;
	// 	this.sourceCustomer = row;
	// 	this.loadMasterCompanies();
	// 	this.loadData();
	// }*/
	// openEditContact(row) {
	// 	this.isEditMode = true;
	// 	this.isSaving = true;
	// 	this.sourceCustomer = { ...row };
	// }
	// onAddContactDetails() {
	// 	this.sourceCustomer = {};
	// 	this.isEditMode = false;
	// }
	// opencontactView(content, row) {
	// 	this.sourceViewforContact = row;
	// 	this.createdBy = row.createdBy;
	// 	this.updatedBy = row.updatedBy;
	// 	this.createddate = row.createdDate;
	// 	this.updatedDate = row.updatedDate;
	// 	this.loadMasterCompanies();
	// 	this.modal = this.modalService.open(content, { size: 'sm' });
	// 	this.modal.result.then(() => {
	// 		console.log('When user closes');
	// 	}, () => { console.log('Backdrop click') })
	// }
	// openHelpText(content) {
	// 	this.modal = this.modalService.open(content, { size: 'sm' });
	// 	this.modal.result.then(() => {
	// 		console.log('When user closes');
	// 	}, () => { console.log('Backdrop click') })
	// }

	// //Open History
	// openHist(content, row) {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;
	// 	this.sourceCustomer = row;
	// 	this.isSaving = true;
	// 	this.customerService.historyAcion(this.sourceCustomer.contactId).subscribe(
	// 		results => this.onHistoryLoadSuccessful(results[0], content),
	// 		error => this.saveFailedHelper(error));
	// }
	// private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.auditHisory = auditHistory;
	// 	this.modal = this.modalService.open(content, { size: 'lg' });
	// 	this.modal.result.then(() => {
	// 		console.log('When user closes');
	// 	}, () => { console.log('Backdrop click') })


	// }
	// onBlurMethod(data) {
	// 	if (data == 'firstName') {
	// 		this.showFirstName = false;
	// 	}
	// 	if (data == 'lastName') {
	// 		this.showLastName = false;
	// 	}
	// 	if (data == 'workPhone') {
	// 		this.showworkPhone = false;
	// 	}
	// 	if (data == 'email') {
	// 		this.showemail = false;
	// 	}
	// }


	// Save Customer Contact Info
	// editItemAndCloseModel() {
	// 	console.log(this.savedGeneralInformationData)
	// 	if (!(this.sourceCustomer.firstName && this.sourceCustomer.lastName &&
	// 		this.sourceCustomer.workPhone && this.sourceCustomer.email
	// 	)) {
	// 		//this.display = true;
	// 		this.modelValue = true;
	// 	}
	// 	if (this.sourceCustomer.firstName && this.sourceCustomer.lastName && this.sourceCustomer.workPhone && this.sourceCustomer.email) {

	// 		this.isSaving = true;
	// 		if (!this.sourceCustomer.customerContactId) {
	// 			this.sourceCustomer.createdBy = this.userName;
	// 			this.sourceCustomer.updatedBy = this.userName;
	// 			this.sourceCustomer.masterCompanyId = 1;
	// 			if (this.sourceCustomer.isDefaultContact === undefined) {
	// 				this.sourceCustomer.isDefaultContact = false;
	// 			}
	// 			this.isDefault = this.sourceCustomer.isDefaultContact;
	// 			this.customerService.newAddContactInfo(this.sourceCustomer).subscribe(data => {
	// 				this.localCollection = data;
	// 				this.sourceCustomer = new Object();
	// 				this.localCollection.CustomerId = this.savedGeneralInformationData.customerId;
	// 				this.localCollection.ContactId = this.savedGeneralInformationData.contactId;
	// 				this.loadData();
	// 				if (data) {
	// 					this.localCollection.isDefaultContact = this.isDefault;
	// 					this.updateCustomerContact(this.localCollection);
	// 					this.loadData();
	// 				}
	// 				if (this.sourceCustomer.isCustomerAlsoVendor == true) {
	// 					this.customerService.isCustomerAlsoVendor = this.isCustomerAlsoVendor;
	// 					this.customerService.localCollectiontoVendor = data;
	// 				}
	// 				this.customerService.contactCollection = this.local;
	// 				this.savesuccessCompleted(this.sourceCustomer);
	// 				this.activeIndex = 1;
	// 				this.customerService.indexObj.next(this.activeIndex);

	// 			})


	// 		}
	// 		else {

	// 			this.activeIndex = 1;
	// 			this.sourceCustomer.updatedBy = this.userName;
	// 			this.sourceCustomer.masterCompanyId = 1;
	// 			this.isDefault = this.sourceCustomer.isDefaultContact;

	// 			this.customerService.updateContactinfo(this.sourceCustomer).subscribe(data => {
	// 				this.loadData();
	// 				if (data) { this.sourceCustomer = new Object(); }

	// 			})
	// 			this.saveCompleted(this.sourceCustomer);
	// 		}

	// 	}

	// 	else {
	// 	}

	// }

	// toggledbldisplay(data) {
	// 	this.sourceCustomer = data;

	// }
	// // Next Click
	// nextClick() {
	// 	this.customerService.contactCollection = this.local;
	// 	this.activeIndex = 2;
	// 	this.customerService.indexObj.next(this.activeIndex);
	// 	this.route.navigateByUrl('/customersmodule/customerpages/app-customer-financial-information');

	// }

	// // Back Click
	// backClick() {
	// 	this.tab.emit('General');
	// 	// this.customerService.contactCollection = this.local;
	// 	// this.activeIndex = 0;
	// 	// this.customerService.indexObj.next(this.activeIndex);
	// 	// this.route.navigateByUrl('/customersmodule/customerpages/app-customer-general-information');

	// }

	// deleteItemAndCloseModel(contactId) {
	// 	this.isSaving = true;
	// 	this.customerService.deleteContact(contactId).subscribe(
	// 		response => this.saveCompleted(this.sourceCustomer),
	// 		error => this.saveFailedHelper(error));
	// }

	// updateCustomerContact(updateObj: any) {
	// 	this.customerService.newAddCustomerContact(updateObj).subscribe(data => {
	// 		this.loadData();
	// 	})
	// }

	// private saveCompleted(user?: any) {
	// 	this.isSaving = false;

	// 	if (this.isDeleteMode == true) {
	// 		this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
	// 		this.isDeleteMode = false;
	// 	}
	// 	else {
	// 		this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

	// 	}

	// 	this.loadData();
	// }
	// private savesuccessCompleted(user?: any) {
	// 	this.isSaving = false;
	// 	this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);
	// 	this.loadData();
	// }


	// get userName(): string {
	// 	return this.authService.currentUser ? this.authService.currentUser.userName : "";
	// }

	// private saveFailedHelper(error: any) {
	// 	this.isSaving = false;
	// 	this.alertService.stopLoadingMessage();
	// 	this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
	// 	this.alertService.showStickyMessage(error, null, MessageSeverity.error);
	// }

	// // Tried For Keypress event 
	// keyPress(event: any) {
	// 	const pattern = /[0-9\+\-\ ]/;
	// 	let inputChar = String.fromCharCode(event.charCode);
	// 	if (event.keyCode != 8 && !pattern.test(inputChar)) {
	// 		event.preventDefault();
	// 	}
	// }

	// onKeyUpFirstNames(event) {
	// 	if (event.target.value != "") {
	// 		let value = event.target.value.toLowerCase();
	// 		if (this.selectedFirstName) {
	// 			if (value == this.selectedFirstName.toLowerCase()) {
	// 				this.disableSaveFirstName = true;

	// 			}
	// 			else {
	// 				this.disableSaveFirstName = false;

	// 			}
	// 		}

	// 	}
	// }

	// onSelectFirstName(event) {
	// 	if (this.alldata) {
	// 		for (let i = 0; i < this.alldata.length; i++) {
	// 			if (event == this.alldata[i].firstName) {
	// 				this.sourceCustomer.firstName = this.alldata[i].firstName;
	// 				this.disableSaveFirstName = true;

	// 				this.selectedFirstName = event;
	// 			}

	// 		}
	// 	}
	// }

	// onKeyUpMiddleNames(event) {
	// 	if (event.target.value != "") {
	// 		let value = event.target.value.toLowerCase();
	// 		if (this.disableSaveName) {
	// 			if (value == this.disableSaveName.toLowerCase()) {
	// 				this.disableSaveMiddleName = true;

	// 			}
	// 			else {
	// 				this.disableSaveMiddleName = false;

	// 			}
	// 		}

	// 	}
	// }

	// onSelectMiddleName(event) {
	// 	if (this.alldata) {
	// 		for (let i = 0; i < this.alldata.length; i++) {
	// 			if (event == this.alldata[i].middleName) {
	// 				this.sourceCustomer.middleName = this.alldata[i].middleName;
	// 				this.disableSaveMiddleName = true;

	// 				this.disableSaveName = event;
	// 			}

	// 		}
	// 	}
	// }

	// onKeyUpLastNames(event) {
	// 	if (event.target.value != "") {
	// 		let value = event.target.value.toLowerCase();
	// 		if (this.disableSavelastName) {
	// 			if (value == this.disableSavelastName.toLowerCase()) {
	// 				this.disableSaveLastName = true;

	// 			}
	// 			else {
	// 				this.disableSaveLastName = false;

	// 			}
	// 		}

	// 	}
	// }

	// onSelectLastName(event) {
	// 	if (this.alldata) {
	// 		for (let i = 0; i < this.alldata.length; i++) {
	// 			if (event == this.alldata[i].lastName) {
	// 				this.sourceCustomer.lastName = this.alldata[i].lastName;
	// 				this.disableSaveLastName = true;

	// 				this.disableSavelastName = event;
	// 			}

	// 		}
	// 	}
	//  }

}


