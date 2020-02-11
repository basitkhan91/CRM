import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Input, ElementRef, SimpleChanges } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { Params, ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/auth.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { MatDialog } from '@angular/material';
import { getObjectByValue, getObjectById, getValueFromObjectByKey } from '../../../../generic/autocomplete';
import { ConfigurationService } from '../../../../services/configuration.service';
import * as $ from 'jquery';
@Component({
    selector: 'app-legal-entity-documents',
    templateUrl: './legal-entity-documents.component.html',
    styleUrls: ['./legal-entity-documents.component.scss'],
})
/** Entity Documents component*/
export class EntityDocumentsComponent implements OnInit {
    disableSave: boolean = true;
    @Input() savedGeneralInformationData;
    @Input() editMode;
    @Input() editGeneralInformationData;
    @Output() tab = new EventEmitter<any>();
    @ViewChild('fileUploadInput') fileUploadInput: any;
    @Input() legalEntityDataFromExternalComponents: any;
    documentInformation = {

        docName: '',
        docMemo: '',
        docDescription: ''
    }
    legalEntityDocumentsData: any = [];
    legalEntityDocumentsColumns = [

        { field: 'docName', header: 'Name' },
        { field: 'docDescription', header: 'Description' },
        { field: 'documents', header: 'Documents' },
        { field: 'docMemo', header: 'Memo' }
    ];
    sourceViewforDocumentListColumns = [
        { field: 'fileName', header: 'File Name' },
    ]
    selectedColumns = this.legalEntityDocumentsColumns;
    formData = new FormData()
    // ediData: any;
    isEditButton: boolean = false;
    isDeleteMode: boolean = false;
    id: number;
    legalEntityCode: any;
    legalEntityName: any;
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

    constructor(private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public legalEntityService: LegalEntityService,
        private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private configurations: ConfigurationService) {
    }

    ngOnInit() {
        if (this.editMode) {
            this.id = this.editGeneralInformationData.legalEntityId;

            this.legalEntityCode = this.editGeneralInformationData.legalEntityCode;
            this.legalEntityName = this.editGeneralInformationData.name;
            this.isViewMode = false;
            this.getList();

        } else {
            if (this.legalEntityDataFromExternalComponents) {
                this.id = this.legalEntityDataFromExternalComponents.legalEntityId;
                this.legalEntityCode = this.legalEntityDataFromExternalComponents.legalEntityCode;
                this.legalEntityName = this.legalEntityDataFromExternalComponents.name;
                this.getList();
                this.isViewMode = true;
            } else {
                this.id = this.savedGeneralInformationData.legalEntityId;
                this.legalEntityCode = this.savedGeneralInformationData.legalEntityCode;
                this.legalEntityName = this.savedGeneralInformationData.name;
                this.isViewMode = false;
                this.getList();
            }

        }

    }

    ngOnChanges(changes: SimpleChanges) {

        for (let property in changes) {

            if (property == 'legalEntityDataFromExternalComponents') {

                if (changes[property].currentValue != {}) {
                    this.id = this.legalEntityDataFromExternalComponents.legalEntityId;
                    this.legalEntityCode = this.legalEntityDataFromExternalComponents.legalEntityCode;
                    this.legalEntityName = this.legalEntityDataFromExternalComponents.name;
                    this.getList();
                    this.isViewMode = true;

                }
            }
        }
    }
    enableSave() {
        this.disableSave = false;

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
            return;

        for (let file of event.files)
            this.formData.append(file.name, file);
        // this.disableSave=false;
    }
    removeFile(event) {
        this.formData.delete(event.file.name)

    }

    openDocument(content, row) {

        this.legalEntityService.toGetUploadDocumentsList(row.attachmentId, row.legalEntityId, 1).subscribe(res => {
            this.sourceViewforDocumentList = res;
            this.sourceViewforDocument = row;

        })


    }
    docviewdblclick(data) {
        this.sourceViewforDocument = data;
        $('#docView').modal('show');

    }
    toGetUploadDocumentsList(attachmentId, legalEntityId, moduleId) {

        this.legalEntityService.toGetUploadDocumentsList(attachmentId, legalEntityId, moduleId).subscribe(res => {
            this.sourceViewforDocumentList = res;
            if (res.length > 0) {
                this.disableSave = false;
                // this.enableSave();
            }
            console.log(this.sourceViewforDocumentList);
        })
    }
    getList() {
        this.legalEntityService.getDocumentList(this.id).subscribe(res => {
            this.legalEntityDocumentsData = res;
            if (this.legalEntityDocumentsData.length > 0) {
                this.totalRecords = this.legalEntityDocumentsData.length;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }
        })
    }
    saveDocumentInformation() {
        const data = {
            ...this.documentInformation,
            legalEntityId: this.id,
            masterCompanyId: 1,
            updatedBy: this.userName,
            createdBy: this.userName
        }

        for (var key in data) {
            this.formData.append(key, data[key]);
        }
        if (!this.isEditButton) {
            this.legalEntityService.documentUploadAction(this.formData).subscribe(res => {
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
            this.legalEntityService.documentUploadAction(this.formData).subscribe(res => {
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

    updatelegalEntityDocument() { }

    editlegalEntityDocument(rowdata) {
        this.isEditButton = true;
        this.documentInformation = rowdata;

        this.legalEntityService.toGetUploadDocumentsList(rowdata.attachmentId, rowdata.legalEntityId, 1).subscribe(res => {
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
        let legalEntityDocumentDetailId = this.localCollection.legalEntityDocumentDetailId;
        if (legalEntityDocumentDetailId > 0) {
            //this.isSaving = true;
            this.legalEntityService.getDeleteDocumentListbyId(legalEntityDocumentDetailId).subscribe(

                this.alertService.showMessage(
                    'Success',
                    `Action was deleted successfully `,
                    MessageSeverity.success
                ));

            this.getList();

        }
        this.modal.close();
    }
    dismissModel() {
        this.isDeleteMode = false;
        this.modal.close();
    }

    dismissDocumentPopupModel() {
        this.fileUploadInput.clear();
        console.log("hiasdsadsad")
    }

    downloadFileUpload(rowData) {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadattachedfile?filePath=${rowData.link}`;
        window.location.assign(url);
    }

    getPageCount(totalNoofRecords, pageSize) {
        return Math.ceil(totalNoofRecords / pageSize)
    }

    openHistory(content, rowData) {
        this.alertService.startLoadingMessage();
        this.legalEntityService.getlegalEntityDocumentHistory(rowData.legalEntityDocumentDetailId, this.id).subscribe(
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


