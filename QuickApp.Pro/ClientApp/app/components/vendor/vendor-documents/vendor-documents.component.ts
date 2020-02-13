import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
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
import { getObjectByValue, getObjectById, getValueFromObjectByKey, editValueAssignByCondition } from '../../../generic/autocomplete';
import { VendorService } from '../../../services/vendor.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { AuditHistory } from '../../../models/audithistory.model';
import * as $ from 'jquery';
import { VendorStepsPrimeNgComponent } from '../vendor-steps-prime-ng/vendor-steps-prime-ng.component';
import { Documents } from '../../../models/documents.model';


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
	@ViewChild('fileUpload') fileUpload: any;

	documentInformation = { ...new Documents() };

	vendorDocumentsData: any = [];
	vendorDocumentsColumns = [
		{ field: 'docName', header: 'Name' },
		{ field: 'docDescription', header: 'Description' },
		{ field: 'fileName', header: 'FileName' },
		{ field: 'fileCreatedDate', header: 'CreatedDate' },
		{ field: 'fileCreatedBy', header: 'Created By' },
		{ field: 'fileUpdatedBy', header: 'UpdatedBy' },
		{ field: 'fileUpdatedDate', header: 'UpdatedDate' },
		{ field: 'fileSize', header: 'FileSize' },
		{ field: 'docMemo', header: 'Memo' }
		// { field: 'docName', header: 'Name' },
		// { field: 'docDescription', header: 'Description' },
		// { field: 'documents', header: 'Documents' },
		// { field: 'docMemo', header: 'Memo' },

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
	@Input() vendorId: number = 0;
	@Input() viewMode: boolean = false;
	documentsDestructuredData: any = [];

	constructor(public vendorService: VendorService, private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService,
		private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private configurations: ConfigurationService) {

		if (this.vendorService.listCollection !== undefined) {
			this.vendorService.isEditMode = true;
			this.isViewMode = false;
		}
		else {
			this.isViewMode = true;;
		}

		if (this.vendorService.listCollection && this.vendorService.isEditMode == true) {

			this.local = this.vendorService.listCollection;

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

	resetCreateForm() {
		this.documentInformation = new Documents();
		this.sourceViewforDocument = undefined;
		this.sourceViewforDocumentList = [];
		this.clearFileUpload();

	}
	clearFileUpload() {
		this.fileUpload.clear();
	}





	fileUploadForDocuments(event) {
		console.log(event);

		if (event.files.length === 0)
			return;

		for (let file of event.files) {
			this.formData.append(file.name, file);
		}
		// fileUpload.clear();

	}
	removeFile(event) {
		this.formData.delete(event.file.name)

	}

	getList() {
		const vendorId = this.vendorId != 0 ? this.vendorId : this.local.vendorId;
		this.documentsDestructuredData = [];
		this.vendorService.getDocumentList(vendorId).subscribe(res => {
			let arr = [];

			const data = res.map(x => {
				for (var i = 0; i < x.attachmentDetails.length; i++) {
					const y = x.attachmentDetails;
					arr.push({
						...x,
						// documents: y[i].fileName,
						fileName: y[i].fileName,
						fileCreatedDate: y[i].createdDate,
						fileCreatedBy: y[i].createdBy,
						fileUpdatedBy: y[i].updatedBy,
						fileUpdatedDate: y[i].updatedDate,
						// fileSize: `${y[i].fileSize} MB`
						fileSize: y[i].fileSize,
						attachmentDetailId: y[i].attachmentDetailId

					})
				}
				this.documentsDestructuredData = arr;
				console.log(arr);
				console.log(this.documentsDestructuredData);


			})
		}, err => {
			this.documentsDestructuredData = [];
		})
	}
	getListById(vendorDocId) {
		this.vendorService.getDocumentListbyId(vendorDocId).subscribe(res => {
			this.sourceViewforDocument = res;
			console.log(this.sourceViewforDocument);
		})
	}

	toGetUploadDocumentsList(attachmentId, vendorId, moduleId) {
		this.vendorService.toGetUploadDocumentsList(attachmentId, vendorId, moduleId).subscribe(res => {
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



		this.vendorService.documentUploadAction(this.formData).subscribe(res => {
			// this.documentInformation.vendorDocumentDetailId = 0;
			this.documentInformation.docDescription = '';
			this.documentInformation.docMemo = '';
			this.documentInformation.docName = '';
			this.sourceViewforDocumentList = [];

			this.formData = new FormData();
			this.clearFileUpload();
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
		this.documentInformation = { ...rowdata };
		this.vendorService.toGetUploadDocumentsList(rowdata.attachmentId, rowdata.vendorId, 3).subscribe(res => {
			this.sourceViewforDocumentList = res;
			this.sourceViewforDocument = rowdata;
		})
	}

	openView(content, row) {
		// this.toGetUploadDocumentsList(row.attachmentId, row.vendorId,3);

		this.vendorService.toGetUploadDocumentsList(row.attachmentId, row.vendorId, 3).subscribe(res => {
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
		this.vendorService.toGetUploadDocumentsList(row.attachmentId, row.vendorId, 3).subscribe(res => {
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
			this.vendorService.getDeleteDocumentListbyId(vendorDocumentDetailId).subscribe(

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
		this.vendorService.changeofTab(this.activeIndex);
		// this.vendorService.indexObj.next(this.activeIndex);
		// this.vendorService.changeStep('Memos');
		// this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-memo');
	}

	CreateNewClick() {
		// this.vendorService.contactCollection = this.local;		
		// this.vendorService.indexObj.next(this.activeIndex);
		// this.vendorService.changeStep('General Information');
		// this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');

		// this.activeIndex = 1;
		// this.vendorService.changeofTab(this.activeIndex);

		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendors-list');

	}
	openHistory(content, row) {

		this.alertService.startLoadingMessage();

		this.isSaving = true;
		this.vendorService.getVendorDocumentAuditHistory(row.vendorDocumentDetailId).subscribe(
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


	getVendorName() {


		if (this.local !== undefined) {
			return editValueAssignByCondition('vendorName', this.local.vendorName) === undefined ? '' : editValueAssignByCondition('vendorName', this.local.vendorName);
		} else {
			return '';
		}
	}
	getPageCount(totalNoofRecords, pageSize) {
		return Math.ceil(totalNoofRecords / pageSize)
	}
	pageIndexChange(event) {
        this.pageSize = event.rows;
    }

	// resetVendorDocument()
	// {
	// 	    this.getList();
	// 	    this.sourceViewforDocumentList= [];		 
	// 	    this.documentInformation.vendorDocumentDetailId = 0;
	// 		this.documentInformation.docDescription = '';
	// 		this.documentInformation.docMemo = '';
	// 		this.documentInformation.docName = '';

	// }


}


