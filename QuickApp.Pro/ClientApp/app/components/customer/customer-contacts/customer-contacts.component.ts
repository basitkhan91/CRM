import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import * as $ from 'jquery';
import { Params, ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';

import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { AlertService, MessageSeverity } from '../../../services/alert.service';

import { MasterComapnyService } from '../../../services/mastercompany.service';
import { CustomerService } from '../../../services/customer.service';
import { CustomerContactModel } from '../../../models/customer-contact.model';
import { MatDialog } from '@angular/material';
import { getObjectByValue, getPageCount, getObjectById, getValueFromObjectByKey, editValueAssignByCondition, getValueFromArrayOfObjectById } from '../../../generic/autocomplete';
import { AtaSubChapter1Service } from '../../../services/atasubchapter1.service';

import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

import { emailPattern, urlPattern } from '../../../validations/validation-pattern';
import { ConfigurationService } from '../../../services/configuration.service';
import { CommonService } from '../../../services/common.service';

@Component({
	selector: 'app-customer-contacts',
	templateUrl: './customer-contacts.component.html',
	styleUrls: ['./customer-contacts.component.scss'],
})
/** CustomerEdit component*/
export class CustomerContactsComponent implements OnInit {
	@Input() savedGeneralInformationData: any = {};
	@Input() editMode;
	@Input() editGeneralInformationData;

	@Input() add_ataChapterList;
	@Input() search_ataChapterList;
	@Input() search_ataChapterList1;
	// @Input() ataListDataValues;
	@Output() tab = new EventEmitter<any>();
	@Output() saveCustomerContactATAMapped = new EventEmitter();
	@Output() refreshCustomerATAMapped = new EventEmitter();
	@Output() refreshCustomerATAByCustomerId = new EventEmitter();
	@Output() refreshCustomerContactMapped = new EventEmitter();
	@Input() customerDataFromExternalComponents: any;

	disableSave: boolean = true;
	formData = new FormData();
	totalRecords: any;
	pageIndex: number = 0;
	pageSize: number = 10;
	totalPages: number;

	contactsListOriginal: any;
	firstNamesList: any;
	middleNamesList: any;
	lastNamesList: any;
	isDeleteMode: boolean = false;
	public sourceCustomer: any = {}
	contactInformation = new CustomerContactModel()
	customerContacts: any = [];
	selectedRowforDelete: any;
	selectedAtappedRowforDelete: any;
	selectedFirstName: any;
	disablesaveForFirstname: boolean;
	disableSaveMiddleName: boolean;
	disableSaveLastName: boolean;
	disablesaveForlastname: boolean;
	loaderForContacts = true;
	//ataChapterEditData: any;
	customerContactsColumns = [
		{ field: 'isDefaultContact', header: 'Primary Contact' },
		{ field: 'tag', header: 'Tag' },
		{ field: 'firstName', header: 'First Name' },
		{ field: 'lastName', header: 'Last Name' },
		{ field: 'contactTitle', header: 'Contact Title' },
		{ field: 'email', header: 'Email' },
		{ field: 'workPhone', header: 'Work Phone' },
		{ field: 'mobilePhone', header: 'Mobile Phone' },
		{ field: 'fax', header: 'Fax' },
		// { field: 'notes', header: 'Memo' },
		// { field: 'updatedDate', header: 'Updated Date' },
		// { field: 'createdDate', header: 'Created Date' }
	];
	selectedColumns = this.customerContactsColumns;
	selectedColumn: any;
	ediData: any;
	isEditButton: boolean = false;
	id: number;
	contactId: number;
	customerContactId: number;
	contactATAId: number;
	customerCode: any;
	customerName: any;
	modal: NgbModalRef;
	localCollection: any;

	emailPattern = emailPattern()
	urlPattern = urlPattern()

	// emailPattern = "[a-zA-Z0-9.-]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z0-9]{2,}";
	// urlPattern = "^((ht|f)tp(s?))\://([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(/\S*)?$";
	sourceViewforContact: any;
	add_SelectedId: any;
	add_SelectedModels: any;
	add_ataSubChapterList: any;
	search_ataSubChapterList: any;
	search_ataSubChapterList1: any;
	selectedContact: any;
	selectedstockColumn: any[];
	ataHeaders = [
		{ field: 'ataChapterName', header: 'ATA Chapter' },
		{ field: 'ataSubChapterDescription', header: 'ATA Sub-Chapter' }
	]
	ataListDataValues = []
	auditHistory: any[] = [];
	auditHistory1: any[] = [];
	@ViewChild('ATAADD') myModal;
	originalATASubchapterData: any = [];
	isViewMode: boolean = false;
	ataChapterEditDat =
		{
			ataChapterId: null,
			ataSubChapterId: null,
			isActive: true,
			isDeleted: false,
			customerContactATAMappingId: 0,
			masterCompanyId: 1,
			createdBy: "",
			updatedBy: "",
			createdDate: new Date(),
			customerContactId: 0,
			ataChapterName: "",
			ataChapterCode: "",
			ataSubChapterDescription: "",

		}

	ataChapterEditData = { ...this.ataChapterEditDat };
	stopmulticlicks: boolean;
	constructor(private router: ActivatedRoute,

		private route: Router,
		private authService: AuthService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
		private _fb: FormBuilder,
		private alertService: AlertService,
		public customerService: CustomerService,
		private dialog: MatDialog,
		public atasubchapter1service: AtaSubChapter1Service,
		private masterComapnyService: MasterComapnyService,
		private configurations: ConfigurationService,
		private commonService: CommonService,

	) {
		this.stopmulticlicks = false;
	}

	ngOnInit() {

		console.log(this.add_ataChapterList, "add_ataChapterList+++")
		if (this.editMode) {
			this.id = this.editGeneralInformationData.customerId;
			this.customerCode = this.editGeneralInformationData.customerCode;
			this.customerName = this.editGeneralInformationData.name;
			console.log(this.id);
			this.isViewMode = false;


			this.getAllCustomerContact()
		} else {

			if (this.customerDataFromExternalComponents) {
				this.id = this.customerDataFromExternalComponents.customerId;
				this.customerCode = this.customerDataFromExternalComponents.customerCode;
				this.customerName = this.customerDataFromExternalComponents.name;

				this.getAllCustomerContact();
				this.isViewMode = true;
			} else {

				this.id = this.savedGeneralInformationData.customerId;
				this.customerCode = this.savedGeneralInformationData.customerCode;
				this.customerName = this.savedGeneralInformationData.name;
				this.getAllCustomerContact();
				this.isViewMode = false;
			}
		}

		this.getAllContacts();

		// this.getATACustomerContactMapped();

	}

	ngOnChanges(changes: SimpleChanges) {
		for (let property in changes) {
			if (property == 'selectedCustomerTab') {
				if (changes[property].currentValue == "Contacts") {
					this.getAllCustomerContact();
				}
			}
			if (property == 'customerDataFromExternalComponents') {

				if (changes[property].currentValue != {}) {
					this.id = this.customerDataFromExternalComponents.customerId;
					this.customerCode = this.customerDataFromExternalComponents.customerCode;
					this.customerName = this.customerDataFromExternalComponents.name;
					this.getAllCustomerContact();
					this.isViewMode = true;

				}
			}
		}

	}
	enableSave() {
		console.log('hello ,directive');
		this.disableSave = false;

	}
	closeMyModel() {
		$("#addContactDetails").modal("hide");
		this.disableSave = true;
	}

	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}
	getPageCount(totalNoofRecords, pageSize) {
		return Math.ceil(totalNoofRecords / pageSize)
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

			if (x.middleName !== null && x.middleName !== "") {
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

	patternMobilevalidationWithSpl(event: any) {
		const pattern = /[0-9\+\-()\ ]/;

		let inputChar = String.fromCharCode(event.charCode);
		if (event.keyCode != 8 && !pattern.test(inputChar)) {
			event.preventDefault();
		}

	}
	async saveContactInformation() {

		// create a new contact in the contact table
		const data = {
			...this.contactInformation, createdBy: this.userName, updatedBy: this.userName, isActive: true,
			masterCompanyId: 1,
			firstName: editValueAssignByCondition('firstName', this.contactInformation.firstName),
			middleName: editValueAssignByCondition('middleName', this.contactInformation.middleName),
			lastName: editValueAssignByCondition('lastName', this.contactInformation.lastName)

		}
		await this.customerService.newAddContactInfo(data).subscribe(res => {
			const responseForCustomerCreate = res;

			this.customerService.newAddCustomerContact(
				{ ...responseForCustomerCreate, CustomerId: this.id }).subscribe(res => {


					this.contactInformation = new CustomerContactModel()
					// get all contacts
					this.getAllContacts();
					// get Customer Contatcs 
					this.getAllCustomerContact();
					this.refreshCustomerContactMapped.emit(this.id);

					this.alertService.showMessage(
						'Success',
						`Sucessfully Created Contact`,
						MessageSeverity.success
					);
				})
		})
		$("#addContactDetails").modal("hide");
		this.disableSave = true;
	}



	viewSelectedRow(rowData) {
		this.sourceViewforContact = rowData;

	}
	viewSelectedRowdbl(content, rowData) {
		this.sourceViewforContact = rowData;
		this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })

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
			firstName: getObjectByValue('firstName', rowData.firstName, this.contactsListOriginal),
			middleName: getObjectByValue('middleName', rowData.middleName, this.contactsListOriginal),
			lastName: getObjectByValue('lastName', rowData.lastName, this.contactsListOriginal),
		}
		console.log(this.contactInformation);
		this.sourceViewforContact = '';

	}

	updateCustomerContact() {
		const data = {
			...this.contactInformation,
			masterCompanyId: 1,
			firstName: editValueAssignByCondition('firstName', this.contactInformation.firstName),
			middleName: editValueAssignByCondition('middleName', this.contactInformation.middleName),
			lastName: editValueAssignByCondition('lastName', this.contactInformation.lastName),


		}
		if (String(data.isDefaultContact) == "Yes") {
			data.isDefaultContact = true

		}
		else if (String(data.isDefaultContact) == "") {
			data.isDefaultContact = false;
		}
		this.customerService.updateContactinfo(data).subscribe(res => {
			this.getAllContacts();
			this.getAllCustomerContact();

			this.alertService.showMessage(
				'Success',
				`Sucessfully Updated Contact`,
				MessageSeverity.success
			);
		});
		$("#addContactDetails").modal("hide");
		this.disableSave = true
	}


	getAllCustomerContact() {

		// get Customer Contatcs 
		this.customerService.getContacts(this.id).subscribe(res => {
			this.customerContacts = res[0]
			this.loaderForContacts = false;
			// const re = res[0]
			// for (let i=0; i<re.length; i++){
			// 	if(re[i]['isDefaultContact'] == true){
			// 		re[i]['isDefaultContact'] =  "Yes"
			// 	} else {
			// 		re[i]['isDefaultContact'] =  ""
			// 	}
			// }
			// if (re.length > 0) {
			//     this.totalRecords = re.length;
			//     this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
			// }
		}, err => {
			this.loaderForContacts = false;
		})
	}

	handleChange(rowData) {
		this.sourceViewforContact = '';

		const data = { ...rowData, updatedBy: this.userName };

		this.customerService.updateContactinfo(data).subscribe(res => {
			this.getAllContacts();
			this.getAllCustomerContact();
			this.alertService.showMessage(
				'Success',
				`Sucessfully Updated Status`,
				MessageSeverity.success
			);
		});


	}


	openDelete(content, rowData) {

		this.selectedRowforDelete = rowData;

		this.sourceViewforContact = '';
		this.isDeleteMode = true;

		this.contactId = rowData.contactId;
		this.customerContactId = rowData.customerContactId
		this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	deleteItemAndCloseModel() {
		let contactId = this.contactId;
		let customerContactId = this.customerContactId;
		if (contactId > 0) {

			this.customerService.deleteContact(customerContactId, this.userName).subscribe(
				response => {
					this.saveCompleted(this.sourceCustomer);
					this.refreshCustomerATAByCustomerId.emit(this.id)
					this.refreshCustomerContactMapped.emit(this.id);


				},
				error => this.saveFailedHelper(error));



		}

		this.modal.close();
	}
	addATAChapter(rowData) {
		this.sourceViewforContact = '';
		this.add_SelectedModels = undefined;
		this.add_SelectedId = undefined;
		this.selectedContact = rowData;
		this.ataListDataValues = [];
		this.add_ataSubChapterList = '';
		this.getOriginalATASubchapterList()
		this.getATACustomerContactMapped();
		this.getATASubChapter();

	}
	dismissModel() {
		this.modal.close();
	}

	getATASubChapter() {


		this.atasubchapter1service.getAtaSubChaptersList().subscribe(atasubchapter => {
			const responseData = atasubchapter[0];
			console.log(this.add_ataSubChapterList, "this.add_ataSubChapterList++++=")
			this.add_ataSubChapterList = responseData.map(x => {
				return {
					label: x.ataSubChapterCode + ' - ' + x.description,
					value: x
				}
			})
			this.search_ataSubChapterList = responseData.map(x => {
				return {
					value: x.ataSubChapterId,
					label: x.ataSubChapterCode + ' - ' + x.description
				}
			})
			this.search_ataSubChapterList1 = responseData.map(x => {
				return {
					value: x.ataSubChapterId,
					label: x.description
				}
			})

		})
	}

	// get subchapter by Id in the add ATA Mapping
	getATASubChapterByATAChapter() {

		const selectedATAId = getValueFromObjectByKey('ataChapterId', this.add_SelectedId)
		this.atasubchapter1service.getATASubChapterListByATAChapterId(selectedATAId).subscribe(atasubchapter => {
			const responseData = atasubchapter[0];
			console.log(this.add_ataSubChapterList, "this.add_ataSubChapterList++++=")
			this.add_ataSubChapterList = responseData.map(x => {
				return {
					label: x.ataSubChapterCode + ' - ' + x.description,
					value: x
				}
			})

		})
	}
	// post the ata Mapping 
	async addATAMapping() {
		console.log(this.selectedContact);
		// const id = this.savedGeneralInformationData.customerId;
		const ataMappingData = this.add_SelectedModels.map(x => {
			return {
				CustomerId: this.id,
				CustomerContactId: this.selectedContact.customerContactId,
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
		this.add_ataSubChapterList = '';
		await this.saveCustomerContactATAMapped.emit(ataMappingData);

		setTimeout(() => {
			this.getATACustomerContactMapped();
		}, 1000);



		this.refreshCustomerContactMapped.emit(this.id);




	}
	openModel() {
		this.myModal.nativeElement.className = 'modal fade show';
		this.getATACustomerContactMapped();


	}
	async getOriginalATASubchapterList() {
		this.atasubchapter1service.getAtaSubChapter1List().subscribe(res => {
			const responseData = res[0];
			this.originalATASubchapterData = responseData;
		})

	}

	async getATACustomerContactMapped() {

		this.customerService.getATAMappedByContactId(this.selectedContact.customerContactId).subscribe(res => {
			//console.log(res);
			this.ataListDataValues = res;

			for (let i = 0; i < this.ataListDataValues.length; i++) {
				this.ataListDataValues[i]['ataChapterName'] = this.ataListDataValues[i]['ataChapterCode'] + ' - ' + this.ataListDataValues[i]['ataChapterName']
				//this.ataListDataValues[i]['ataSubChapterDescription'] = getValueFromArrayOfObjectById('ataSubChapterCode', 'ataSubChapterId', this.ataListDataValues[i]['ataSubChapterId'], this.originalATASubchapterData) + ' - ' +this.ataListDataValues[i]['ataSubChapterDescription']
				this.ataListDataValues[i]['ataSubChapterDescription'] = this.ataListDataValues[i]['ataSubChapterCode'] + ' - ' + this.ataListDataValues[i]['ataSubChapterDescription']
			}
		})
	}



	deleteATAMapped(content, rowData) {

		this.selectedAtappedRowforDelete = rowData;
		this.sourceViewforContact = '';
		this.isDeleteMode = true;


		this.contactATAId = rowData.customerContactATAMappingId;
		this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	deleteItemAndCloseModel1() {
		let contactATAId = this.contactATAId;
		if (contactATAId > 0) {

			this.customerService.deleteATAMappedByContactId(contactATAId).subscribe(
				response => {
					this.saveCompleted(this.sourceCustomer);
					this.getATACustomerContactMapped();
					this.refreshCustomerATAMapped.emit(this.id)
					this.refreshCustomerContactMapped.emit(this.id);
				},
				error => this.saveFailedHelper(error));



		}

		this.modal.close();
	}

	getAuditHistoryById(rowData) {
		this.customerService.getCustomerContactAuditDetails(rowData.customerContactId, rowData.customerId).subscribe(res => {
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
		this.stopmulticlicks = true;
		this.tab.emit('AircraftInfo');
		this.alertService.showMessage(
			'Success',
			` ${this.editMode ? 'Updated' : 'Saved'} Customer Contacts Sucessfully `,
			MessageSeverity.success
		);
		setTimeout(() => {
			this.stopmulticlicks = false;
		}, 500)
	}
	backClick() {
		this.tab.emit('General');
	}



	private saveCompleted(user?: any) {

		if (this.isDeleteMode == true) {
			this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
			this.isDeleteMode = false;
		}
		else {
			this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
			this.saveCompleted
		}


		this.getAllCustomerContact();
	}
	private saveFailedHelper(error: any) {

		this.alertService.stopLoadingMessage();
		this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
		this.alertService.showStickyMessage(error, null, MessageSeverity.error);
	}


	onFirstNameSelected() {
		this.disablesaveForFirstname = true;

	}
	onMiddleNameSelected() {
		this.disableSaveMiddleName = true;

	}
	onLastNameSelected() {
		this.disableSaveLastName = true;

	}

	checkfirstNameExist(value) {

		this.disablesaveForFirstname = false;

		for (let i = 0; i < this.contactsListOriginal.length; i++) {

			if (this.contactInformation.firstName == this.contactsListOriginal[i].firstName || value == this.contactsListOriginal[i].firstName) {
				this.disablesaveForFirstname = true;
				return;
			}

		}

	}

	checkmiddleNameExist(value) {


		this.disableSaveMiddleName = false;

		for (let i = 0; i < this.contactsListOriginal.length; i++) {

			if (this.contactInformation.middleName == this.contactsListOriginal[i].middleName || value == this.contactsListOriginal[i].middleName) {
				this.disableSaveMiddleName = true;
				return;
			}

		}
		if (value == "") {
			this.disableSaveMiddleName = false;
		}

	}
	checklastNameExist(value) {

		this.disableSaveLastName = false;

		for (let i = 0; i < this.contactsListOriginal.length; i++) {

			if (this.contactInformation.lastName == this.contactsListOriginal[i].lastName || value == this.contactsListOriginal[i].lastName) {
				this.disableSaveLastName = true;
				return;
			}

		}

	}
	sampleExcelDownloadForContact() {
		const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=CustomerContact&fileName=CustomerContact.xlsx`;
		window.location.assign(url);
	}
	customContactExcelUpload(event) {
		const file = event.target.files;

		console.log(file);
		if (file.length > 0) {

			this.formData.append('file', file[0])
			this.customerService.ContactUpload(this.formData, this.id).subscribe(res => {
				event.target.value = '';

				this.formData = new FormData();
				this.getAllContacts();
				this.getAllCustomerContact();
				this.alertService.showMessage(
					'Success',
					`Successfully Uploaded  `,
					MessageSeverity.success
				);
			})



		}

	}
	editContactATAChapters(rowData) {
		// console.log(rowData, 'ataedit');
		//console.log(this.search_ataChapterList);
		//console.log(this.search_ataSubChapterList);
		this.getATASubChapterByATAChapterID(rowData.ataChapterId)
		this.ataChapterEditData = {
			...rowData,
			//ataSubChapterId: getObjectById('label', rowData.ataSubChapterId, this.search_ataSubChapterList)
		}





	}



	getATAAuditHistoryById(rowData) {
		this.customerService.getCustomerContactATAAuditDetails(rowData.customerContactATAMappingId).subscribe(res => {
			this.auditHistory1 = res;

		})
	}
	getColorCodeForHistoryATA(i, field, value) {
		const data = this.auditHistory1;
		const dataLength = data.length;
		if (i >= 0 && i <= dataLength) {
			if ((i + 1) === dataLength) {
				return true;
			} else {
				return data[i + 1][field] === value
			}
		}
	}
	updateATAChapters() {

		this.ataChapterEditData = {
			...this.ataChapterEditData,
			masterCompanyId: 1,
			isActive: true,
			createdBy: this.userName,
			updatedBy: this.userName,
			createdDate: new Date(),
			customerContactId: this.selectedContact.customerContactId,

			ataChapterName: getValueFromArrayOfObjectById('label', 'value', this.ataChapterEditData.ataChapterId, this.search_ataChapterList1),
			ataChapterCode: getValueFromArrayOfObjectById('code', 'value', this.ataChapterEditData.ataChapterId, this.search_ataChapterList1),

			ataSubChapterDescription: getValueFromArrayOfObjectById('label', 'value', this.ataChapterEditData.ataSubChapterId, this.search_ataSubChapterList1),


		}
		this.customerService.updateCustomerContactATAMApped(this.ataChapterEditData).subscribe(res => {
			this.getATACustomerContactMapped();
			this.alertService.showMessage(
				'Success',
				`Successfully Updated`,
				MessageSeverity.success
			);
		})
	}
	getATASubChapterByATAChapterID(id) {


		this.atasubchapter1service.getATASubChapterListByATAChapterId(id).subscribe(atasubchapter => {
			const responseData = atasubchapter[0];
			// console.log(this.add_ataSubChapterList, "this.add_ataSubChapterList++++=")
			this.search_ataSubChapterList = responseData.map(x => {
				return {
					label: x.ataSubChapterCode + ' - ' + x.description,
					value: x.ataSubChapterId
				}
			})

		})
	}

}


