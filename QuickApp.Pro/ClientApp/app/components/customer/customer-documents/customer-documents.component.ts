import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { Params, ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { CustomerService } from '../../../services/customer.service';
import { CustomerContactModel } from '../../../models/customer-contact.model';
import { MatDialog } from '@angular/material';
import { getObjectByValue, getObjectById, getValueFromObjectByKey } from '../../../generic/autocomplete';


@Component({
	selector: 'app-customer-documents',
	templateUrl: './customer-documents.component.html',
	styleUrls: ['./customer-documents.component.scss'],
})
/** Customer component*/
export class CustomerDocumentsComponent implements OnInit {
	@Input() savedGeneralInformationData;
	@Input() editMode;
	@Input() editGeneralInformationData;
	@Output() tab = new EventEmitter<any>();
	documentInformation = {

		docName: '',
		docMemo: '',
		docDescription: ''
	}
	customerDocumentsData: any = [];
	customerDocumentsColumns = [
		{ field: 'docName', header: 'Name' },
		{ field: 'docDescription', header: 'Description' },
		{ field: 'documents', header: 'Documents' },
		{ field: 'docMemo', header: 'Memo' }
	];
	selectedColumns = this.customerDocumentsColumns;
	formData = new FormData()
	// ediData: any;
	isEditButton: boolean = false;
	id: number;
	customerCode: any;
	customerName: any;
	sourceViewforDocument: any;
	// modal: NgbModalRef;

	constructor(private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public customerService: CustomerService,
		private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
	}

	ngOnInit() {
		if (this.editMode) {
            this.id = this.editGeneralInformationData.customerId;

            this.customerCode = this.editGeneralInformationData.customerCode;
            this.customerName = this.editGeneralInformationData.name;


		} else {
			this.id = this.savedGeneralInformationData.customerId;
            this.customerCode = this.savedGeneralInformationData.customerCode;
            this.customerName = this.savedGeneralInformationData.name;

		}
	}


	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}

	// opencontactView(content, row) {

	fileUpload(event) {
		if (event.files.length === 0)
			return;

		for (let file of event.files)
			this.formData.append(file.name, file);
	}
	openDocument() {

	}
	getList() {
		this.customerService.getDocumentList(this.id).subscribe(res => {
			this.customerDocumentsData = res;
		})
	}
	saveDocumentInformation() {
		const data = {
			...this.documentInformation,
			customerId: this.id,
			masterCompanyId: 1,
			updatedBy: this.userName
		}

		for (var key in data) {
			this.formData.append(key, data[key]);
		}

		this.customerService.documentUploadAction(this.formData).subscribe(res => {
			this.formData = new FormData()
			this.getList();
			this.alertService.showMessage(
				'Success',
				`Saved Documents Successfully `,
				MessageSeverity.success
			);
		})

	}
	updateCustomerDocument() { }

	editCustomerDocument() {

	}

	backClick() {
		this.tab.emit('Warnings');
	}

}


