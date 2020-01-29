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
import { ConfigurationService } from '../../../services/configuration.service';
import { AuditHistory } from '../../../models/audithistory.model';
import * as $ from 'jquery';
import { VendorStepsPrimeNgComponent } from '../vendor-steps-prime-ng/vendor-steps-prime-ng.component';

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
	@ViewChild(VendorStepsPrimeNgComponent) stepper: VendorStepsPrimeNgComponent;
	documentInformation = {
		vendorDocumentDetailId: 0,
		docName: '',
		docMemo: '',
		docDescription: ''
	}
	vendorDocumentsData: any = [];
	vendorDocumentsColumns = [
		{ field: 'docName', header: 'Name' },
		{ field: 'docDescription', header: 'Description' },
		{ field: 'documents', header: 'Documents' },
		{ field: 'docMemo', header: 'Memo' },

	];
	selectedColumns = this.vendorDocumentsColumns;

	headersforAttachment = [
		{ field: 'fileName', header: 'File Name' },
		//{ field: 'link', header: 'Action' },
	];
	sourceViewforDocumentListColumns = [
		{ field: 'fileName', header: 'File Name' },
	]
	formData = new FormData()
	// ediData: any;
	isEditButton: boolean = false;
	// id: number;
	// customerCode: any;
	// customerName: any;
	sourceViewforDocument: any;
	localCollection: any;
	sourceViewforDocumentList: any = [];
	local: any;
	activeIndex: any;
	isDeleteMode: boolean = false;
	private isEditMode: boolean = false;
	private isSaving: boolean;
	modal: NgbModalRef;
	public auditHisory: AuditHistory[] = [];
	loadingIndicator: boolean;
	documentauditHisory: any[];
	isViewMode: boolean = false;
	totalRecords: number = 0;
	pageIndex: number = 0;
	pageSize: number = 10;
	totalPages: number = 0;
	constructor(public workFlowtService: VendorService, private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService,
		private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private configurations: ConfigurationService) {

		if (this.workFlowtService.listCollection !== undefined) {
			this.workFlowtService.isEditMode = true;
			this.isViewMode = false;
		}
		else {
			this.isViewMode = true;;
		}

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
			this.vendorDocumentsData = res;
		})
	}
	getListById(vendorDocId) {
		this.workFlowtService.getDocumentListbyId(vendorDocId).subscribe(res => {
			this.sourceViewforDocument = res;
			console.log(this.sourceViewforDocument);
		})
	}

	toGetUploadDocumentsList(attachmentId, vendorId, moduleId) {
		this.workFlowtService.toGetUploadDocumentsList(attachmentId, vendorId, moduleId).subscribe(res => {
			this.sourceViewforDocumentList = res;
			console.log(this.sourceViewforDocumentList);
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
			this.documentInformation.vendorDocumentDetailId = 0;
			this.documentInformation.docDescription = '';
			this.documentInformation.docMemo = '';
			this.documentInformation.docName = '';

			this.formData = new FormData();
			this.getList();
			this.alertService.showMessage(
				'Success',
				`Saved Documents Successfully `,
				MessageSeverity.success
			);


		})

	}
	updateVendorDocument() {



	}

	editVendorDocument(rowdata, e) {
		//this.toGetUploadDocumentsList(rowdata.attachmentId, rowdata.vendorId,3);
		this.documentInformation = rowdata;
		this.workFlowtService.toGetUploadDocumentsList(rowdata.attachmentId, rowdata.vendorId, 3).subscribe(res => {
			this.sourceViewforDocumentList = res;
			this.sourceViewforDocument = rowdata;
		})
	}

	openView(content, row) {
		// this.toGetUploadDocumentsList(row.attachmentId, row.vendorId,3);

		this.workFlowtService.toGetUploadDocumentsList(row.attachmentId, row.vendorId, 3).subscribe(res => {
			this.sourceViewforDocumentList = res;
			this.sourceViewforDocument = row;

		})


		// this.modal = this.modalService.open(content, { size: 'sm' });
		//    this.modal.result.then(() => {
		//     console.log('When user closes');
		// }, () => { console.log('Backdrop click') })
		//console.log(this.sourceViewforDocument);
		//this.getListById(row.vendorDocumentDetailId);        
	}

	openViewOnDblClick(row) {
		this.workFlowtService.toGetUploadDocumentsList(row.attachmentId, row.vendorId, 3).subscribe(res => {
			this.sourceViewforDocumentList = res;
			this.sourceViewforDocument = row;
		});
		$('#view').modal('show');
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

	deleteItemAndCloseModel() {

		let vendorDocumentDetailId = this.localCollection.vendorDocumentDetailId;
		if (vendorDocumentDetailId > 0) {
			this.isSaving = true;
			this.workFlowtService.getDeleteDocumentListbyId(vendorDocumentDetailId).subscribe(

				res => {
					this.getList();
					this.alertService.showMessage(
						'Success',
						`Action was deleted successfully `,
						MessageSeverity.success
					)
				});

		}

		this.modal.close();
	}

	dismissModel() {
		this.modal.close();
	}

	downloadFileUpload(rowData) {
		const url = `${this.configurations.baseUrl}/api/FileUpload/downloadattachedfile?filePath=${rowData.link}`;
		window.location.assign(url);
	}

	backClick() {
		this.activeIndex = 9;
		this.stepper.changeStep(this.activeIndex);



		// this.workFlowtService.indexObj.next(this.activeIndex);
		// this.workFlowtService.changeStep('Memos');
		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-memo');
	}

	CreateNewClick() {
		// this.workFlowtService.contactCollection = this.local;
		this.activeIndex = 1;
		this.stepper.changeStep(this.activeIndex);
		// this.workFlowtService.indexObj.next(this.activeIndex);
		// this.workFlowtService.changeStep('General Information');
		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');

	}
	openHistory(content, row) {

		this.alertService.startLoadingMessage();

		this.isSaving = true;
		this.workFlowtService.getVendorDocumentAuditHistory(row.vendorDocumentDetailId).subscribe(
			results => this.onAuditHistoryLoadSuccessful(results, content),
			error => this.saveFailedHelper(error));



	}
	private onAuditHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

		this.documentauditHisory = auditHistory;

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

	getColorCodeForHistory(i, field, value) {
		const data = this.documentauditHisory;
		const dataLength = data.length;
		if (i >= 0 && i <= dataLength) {
			if ((i + 1) === dataLength) {
				return true;
			} else {
				return data[i + 1][field] === value
			}
		}
	}

	getPageCount(totalNoofRecords, pageSize) {
		return Math.ceil(totalNoofRecords / pageSize)
	}


}


