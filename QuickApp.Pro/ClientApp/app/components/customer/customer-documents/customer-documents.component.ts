﻿import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Input, ElementRef, SimpleChanges } from '@angular/core';
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
import { ConfigurationService } from '../../../services/configuration.service';
import * as $ from 'jquery';
import { Table } from 'primeng/table';
@Component({
    selector: 'app-customer-documents',
    templateUrl: './customer-documents.component.html',
    styleUrls: ['./customer-documents.component.scss'],
})
/** Customer component*/
export class CustomerDocumentsComponent implements OnInit {
    disableSave: boolean = true;
    @Input() savedGeneralInformationData;
    @Input() editMode;
    @Input() editGeneralInformationData;
    @Output() tab = new EventEmitter<any>();
    @ViewChild('fileUploadInput') fileUploadInput: any;
    @Input() customerDataFromExternalComponents: any;
    documentInformation = {
        docName: '',
        docMemo: '',
        docDescription: ''
    }
    @ViewChild('documents') Table;
    customerDocumentsData: any = [];
    customerdocumentsDestructuredData = [];
    customerDocumentsColumns = [

        { field: 'docName', header: 'Name' },
        { field: 'docDescription', header: 'Description' },
        { field: 'fileName', header: 'FileName' },
        // { field: 'documents', header: 'documents' },
        { field: 'fileCreatedDate', header: 'CreatedDate' },
        { field: 'fileCreatedBy', header: 'Created By' },
        { field: 'fileUpdatedBy', header: 'UpdatedBy' },
        { field: 'fileUpdatedDate', header: 'UpdatedDate' },
        { field: 'fileSize', header: 'FileSize' },
        { field: 'docMemo', header: 'Memo' }
    ];


    // fileName:x[i].fileName,
    // fileCreatedDate:x[i].createdDate, 
    // fileCreatedBy : x[i].createdBy,
    // fileUpdatedBy:x[i].updatedBy,
    // fileUpdatedDate:x[i].updatedDate,
    // fileSize : x[i].fileSize
    sourceViewforDocumentListColumns = [
        { field: 'fileName', header: 'File Name' },
    ]
    selectedColumns = this.customerDocumentsColumns;
    formData = new FormData()
    // ediData: any;
    isEditButton: boolean = false;
    isDeleteMode: boolean = false;
    id: number;
    customerCode: any;
    customerName: any;
    sourceViewforDocument: any;
    localCollection: any;
    selectedRowForDelete: any;
    modal: NgbModalRef;
    sourceViewforDocumentList: any = [];
    documentauditHisory: any[];
    headersforAttachment = [
        { field: 'fileName', header: 'File Name' },
        //{ field: 'link', header: 'Action' },
    ];
    isViewMode: boolean = false;
    totalRecords: number = 0;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number = 0;
    loader: boolean = true;
    lastValueItegrated: any;

    constructor(private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public customerService: CustomerService,
        private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private configurations: ConfigurationService) {
    }

    ngOnInit() {
        if (this.editMode) {
            this.id = this.editGeneralInformationData.customerId;

            this.customerCode = this.editGeneralInformationData.customerCode;
            this.customerName = this.editGeneralInformationData.name;
            this.isViewMode = false;
            this.getList();

        } else {
            if (this.customerDataFromExternalComponents) {
                this.id = this.customerDataFromExternalComponents.customerId;
                this.customerCode = this.customerDataFromExternalComponents.customerCode;
                this.customerName = this.customerDataFromExternalComponents.name;
                this.getList();
                this.isViewMode = true;
            } else {
                this.id = this.savedGeneralInformationData.customerId;
                this.customerCode = this.savedGeneralInformationData.customerCode;
                this.customerName = this.savedGeneralInformationData.name;
                this.isViewMode = false;
                this.getList();
            }

        }

    }

    ngOnChanges(changes: SimpleChanges) {

        for (let property in changes) {

            if (property == 'customerDataFromExternalComponents') {

                if (changes[property].currentValue != {}) {
                    this.id = this.customerDataFromExternalComponents.customerId;
                    this.customerCode = this.customerDataFromExternalComponents.customerCode;
                    this.customerName = this.customerDataFromExternalComponents.name;
                    this.getList();
                    this.isViewMode = true;

                }
            }
        }
    }
    enableSave() {
        if(this.sourceViewforDocumentList && this.sourceViewforDocumentList.length>0){
            this.disableSave = false;
        }else if(this.isEditButton == true){
            this.disableSave = false; 
        }else{
            this.disableSave = true; 
        }
       
        console.log("changes sidfsf")

    }
    closeMyModel(type) {
        console.log("check issues")
        $(type).modal("hide");
        this.disableSave = true;
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    // opencontactView(content, row) {

    fileUpload(event) {
        console.log(event, "event+++")
        if (event.files.length === 0)
            return  this.disableSave = true;

        for (let file of event.files)
            this.formData.append(file.name, file);
        this.disableSave = false;
    }
    removeFile(event) {
        this.formData.delete(event.file.name)

    }

    openDocument(row) {
        this.sourceViewforDocumentList = [];
        this.customerService.toGetUploadDocumentsList(row.attachmentId, row.customerId, 1).subscribe(res => {
            this.sourceViewforDocumentList = res;
            this.sourceViewforDocument = row;
        });


        //this.modal = this.modalService.open(content, { size: 'sm' });
        //this.modal.result.then(() => {
        //    console.log('When user closes');
        //}, () => { console.log('Backdrop click') })


    }
    docviewdblclick(data) {
        this.sourceViewforDocument = data;
        this.openDocument(data);
        $('#docView').modal('show');

    }
    toGetUploadDocumentsList(attachmentId, customerId, moduleId) {

        this.customerService.toGetUploadDocumentsList(attachmentId, customerId, moduleId).subscribe(res => {
            this.sourceViewforDocumentList = res;
            if (res.length > 0) {
                this.disableSave = false;
                // this.enableSave();
            }
            console.log(this.sourceViewforDocumentList);
        })
    }
    getList() {
        this.customerdocumentsDestructuredData = [];
          this.customerService.getDocumentList(this.id).subscribe(res => {
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
						// fileSize: ${y[i].fileSize} MB
						fileSize: y[i].fileSize,
						attachmentDetailId: y[i].attachmentDetailId

					})
            }
        })
            
				this.customerdocumentsDestructuredData = arr;

            this.loader = false;
        }, err => {
            this.customerdocumentsDestructuredData = [];
            this.loader = false;
        })
    }
    saveDocumentInformation() {
        const data = {
            ...this.documentInformation,
            customerId: this.id,
            masterCompanyId: 1,
            updatedBy: this.userName,
            createdBy: this.userName
        }

        for (var key in data) {
            this.formData.append(key, data[key]);
        }
        if (!this.isEditButton) {
            this.customerService.documentUploadAction(this.formData).subscribe(res => {
                this.formData = new FormData()
                this.documentInformation = {

                    docName: '',
                    docMemo: '',
                    docDescription: ''
                }
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Saved Documents Successfully `,
                    MessageSeverity.success
                );
                this.dismissDocumentPopupModel()
            })
        }
        else {
            this.customerService.documentUploadAction(this.formData).subscribe(res => {
                this.documentInformation = {

                    docName: '',
                    docMemo: '',
                    docDescription: ''
                }
                this.isEditButton = false;
                this.formData = new FormData()
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Updated Documents Successfully `,
                    MessageSeverity.success
                );
                this.dismissDocumentPopupModel()
            })
        }
        $("#addDocumentDetails").modal("hide");
        this.disableSave = true;
    }

    updateCustomerDocument() { }

    editCustomerDocument(rowdata) {
        this.isEditButton = true;
        this.documentInformation = rowdata;

        this.customerService.toGetUploadDocumentsList(rowdata.attachmentId, rowdata.customerId, 1).subscribe(res => {
            this.sourceViewforDocumentList = res;
            //this.sourceViewforDocument = rowdata;
        });
    }
    addDocumentDetails() {
        this.sourceViewforDocumentList = [];
        this.isEditButton = false;
        this.documentInformation = {

            docName: '',
            docMemo: '',
            docDescription: ''
        }
    }
    backClick() {
        this.tab.emit('Warnings');
    }
    openDelete(content, row) {
        this.selectedRowForDelete = row;
        this.isDeleteMode = true;
        delete row.updatedBy;
        this.localCollection = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    deleteItemAndCloseModel() {
        // let customerDocumentDetailId = this.localCollection.customerDocumentDetailId;
        let attachmentDetailId = this.localCollection.attachmentDetailId;
        console.log("vendfoer",this.localCollection.AttachmentDetailId ,this.localCollection.attachmentDetailId)
        if (attachmentDetailId > 0) {
            //this.isSaving = true;
            this.customerService.deleteDocumentByCustomerAttachementId(attachmentDetailId).subscribe(res => {
                this.getList()
                this.alertService.showMessage(
                    'Success',
                    `Deleted  Documents Successfully `,
                    MessageSeverity.success
                );

            })



        }
        this.modal.close();
    }
    dismissModel() {
        this.isDeleteMode = false;
        this.modal.close();
    }

    dismissDocumentPopupModel() {
        this.fileUploadInput.clear();
        // this.closeMyModel(type);
        console.log("hiasdsadsad")
    }

    downloadFileUpload(rowData) {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadattachedfile?filePath=${rowData.link}`;
        window.location.assign(url);
    }

    getPageCount(totalNoofRecords, pageSize) {
        return Math.ceil(totalNoofRecords / pageSize)
    }
    pageIndexChange(event) {
        this.pageSize = event.rows;
    }
    openHistory(content, rowData) {
        //const { customerShippingAddressId } = rowData.customerShippingAddressId;
        //const { customerShippingId } = rowData.customerShippingId;
        this.alertService.startLoadingMessage();

        this.customerService.getCustomerDocumentHistory(rowData.customerDocumentDetailId, this.id).subscribe(
            results => this.onAuditHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));
    }
    private onAuditHistoryLoadSuccessful(auditHistory, content) {
        this.alertService.stopLoadingMessage();


        this.documentauditHisory = auditHistory;

        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
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
    private saveFailedHelper(error: any) {

        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }




}


