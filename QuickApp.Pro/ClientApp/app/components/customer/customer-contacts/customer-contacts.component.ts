import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { fadeInOut } from '../../../services/animations';

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
import { getObjectByValue, getObjectById, getValueFromObjectByKey, editValueAssignByCondition } from '../../../generic/autocomplete';
import { AtaSubChapter1Service } from '../../../services/atasubchapter1.service';

import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

import { emailPattern, urlPattern } from '../../../validations/validation-pattern';


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
	@Output() refreshCustomerATAByCustomerId = new EventEmitter();
	@Output() refreshCustomerContactMapped = new EventEmitter();
   



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
	selectedContact: any;
	ataHeaders = [
		{ field: 'ataChapterName', header: 'ATA Chapter' },
		{ field: 'ataSubChapterDescription', header: 'ATA Sub-Chapter' }
	]
	ataListDataValues = []
	auditHistory: any[] = [];
	@ViewChild('ATAADD') myModal;

	constructor(private router: ActivatedRoute,

		private route: Router,
		private authService: AuthService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
		private _fb: FormBuilder,
		private alertService: AlertService,
		public customerService: CustomerService,
		private dialog: MatDialog,
		private atasubchapter1service: AtaSubChapter1Service,
		private masterComapnyService: MasterComapnyService) {
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
            this.getAllCustomerContact();

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

			if (x.middleName !== null && x.middleName !== "") {
				return x.middleName.toLowerCase().indexOf(event.query.toLowerCase())
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
			lastName: editValueAssignByCondition('lastName', this.contactInformation.lastName)

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
	}


	getAllCustomerContact() {
		// get Customer Contatcs 
		this.customerService.getContacts(this.id).subscribe(res => {
			this.customerContacts = res[0]


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

		this.getATACustomerContactMapped();


	}
	dismissModel() {
		this.modal.close();
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

	async getATACustomerContactMapped() {
		this.customerService.getATAMappedByContactId(this.selectedContact.contactId).subscribe(res => {
			console.log(res);
			this.ataListDataValues = res;
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
		this.tab.emit('AircraftInfo');

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

	
}


