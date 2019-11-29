﻿import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { Params, ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { CustomerContactModel } from '../../../models/customer-contact.model';
import { MatDialog } from '@angular/material';
import { getObjectByValue, getObjectById, getValueFromObjectByKey } from '../../../generic/autocomplete';
import { VendorService } from '../../../services/vendor.service';


@Component({
	selector: 'app-vendor-documents',
	templateUrl: './vendor-documents.component.html',
	styleUrls: ['./vendor-documents.component.scss'],
})
/** Customer component*/
export class VendorDocumentsComponent implements OnInit {
	// @Input() savedGeneralInformationData;
	// @Input() editMode;
	// @Input() editGeneralInformationData;
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
	local: any;
	activeIndex: any;
	private isEditMode: boolean = false;
	private isSaving: boolean;
	modal: NgbModalRef;
	

	constructor(public workFlowtService: VendorService,private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService,
		private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
			if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
			
				this.local = this.workFlowtService.listCollection;
							
			}
	}

	ngOnInit() {
		this.getList();
		// if (this.editMode) {
        //     this.id = this.editGeneralInformationData.customerId;
        //     this.customerCode = this.editGeneralInformationData.customerCode;
        //     this.customerName = this.editGeneralInformationData.name;


		// } else {
		// 	this.id = this.savedGeneralInformationData.customerId;
        //     this.customerCode = this.savedGeneralInformationData.customerCode;
        //     this.customerName = this.savedGeneralInformationData.name;

		// }
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

	getList() {
		this.workFlowtService.getDocumentList(this.local.vendorId).subscribe(res => {
			this.customerDocumentsData = res;
		})
	}
	getListById(vendorDocId) {
		debugger
		this.workFlowtService.getDocumentListbyId(vendorDocId).subscribe(res => {
			this.sourceViewforDocument = res;
			console.log(this.sourceViewforDocument);
		})
	}
	saveDocumentInformation() {
		const data = {
			...this.documentInformation,
			vendorId: this.local.vendorId,
			masterCompanyId: 1,
			createdBy: this.userName,
			updatedBy: this.userName
		}

		for (var key in data) {
			this.formData.append(key, data[key]);
		}

		
		this.workFlowtService.documentUploadAction(this.formData).subscribe(res => {
			this.formData = new FormData()
			this.getList();
			this.alertService.showMessage(
				'Success',
				`Saved Documents Successfully `,
				MessageSeverity.success
			);
		})

	}
	updateCustomerDocument(rowdata,e) { 

		//this.documentInformation=rowdata;

	}

	editCustomerDocument() {




	}

	openView(content, row) {
	
		debugger
		this.sourceViewforDocument = row;	
		//this.getListById(row.vendorDocumentDetailId);
		
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

	backClick() {
		this.activeIndex = 8;
        this.workFlowtService.indexObj.next(this.activeIndex);
        this.workFlowtService.changeStep('Memos');
        this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-memo');
	}

	// NextClick() {
    //     this.workFlowtService.contactCollection = this.local;
    //     this.activeIndex = 3;
    //     this.workFlowtService.indexObj.next(this.activeIndex);
    //     this.workFlowtService.changeStep('Payment Information');
    //     this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-payment-information');
    // }
   
}


