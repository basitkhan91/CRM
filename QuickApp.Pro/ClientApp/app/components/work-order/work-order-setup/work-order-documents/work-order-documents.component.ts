import { Component, Input, OnInit } from '@angular/core';

import { Documents } from '../../../../models/work-order-documents.modal';
import * as $ from 'jquery';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { AuthService } from '../../../../services/auth.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';

@Component({
  selector: 'app-work-order-documents',
  templateUrl: './work-order-documents.component.html',
  styleUrls: ['./work-order-documents.component.scss']
})
/** WorkOrderDocuments component*/
export class WorkOrderDocumentsComponent implements OnInit {
  @Input() savedWorkOrderData: any
  @Input() documentForm;
  @Input() workFlowWorkOrderId;
  disableSave: Boolean = true;
  formData = new FormData();
  isEditButton = false;
  sourceViewforDocumentList = [];
  workOrderId: any;
  documentsDestructuredData: any = [];
  sourceViewforDocumentListColumns = [
    { field: 'fileName', header: 'File Name' },
  ]
  loader = false;
  pageSize: any = 10;
  documentsColumns = [

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
  selectedColumns = this.documentsColumns;

  constructor(private workOrderService: WorkOrderService,
    private alertService: AlertService,
    private authService: AuthService, ) { }


  ngOnInit() {
    this.workOrderId = this.savedWorkOrderData.workOrderId;
    // this.workFlowWorkOrderId = this.savedWorkOrderData
  }
  addNewDoc() {
    this.documentForm = [...this.documentForm, new Documents()];
  }

  get userName(): string {
    return this.authService.currentUser ? this.authService.currentUser.userName : "";
  }
  // this.docName = '';
  // this.docMemo = '';
  // this.docDescription = '';
  // this.docCode = '';


  getList() {
    this.loader = true;
    this.workOrderId.getDocumentsList(this.workFlowWorkOrderId, this.workOrderId).subscribe(res => {
      this.documentsDestructuredData = res;
      this.loader = false;
    })
  }

  addDocumentDetails() {

  }
  enableSave() {

  }
  fileUpload(event) {
    if (event.files.length === 0)
      return this.disableSave = true;

    for (let file of event.files)
      this.formData.append(file.name, file);
    this.disableSave = false;
  }
  removeFile(event) {
    this.formData.delete(event.file.name)
  }
  openDocument(x, y) {

  }
  openHistory(x, y) { }


  saveDocumentInformation() {
    const data = {
      ...this.documentForm,
      // customerId: this.id,
      workOrderId: this.workOrderId,
      workFlowWorkOrderId: this.workFlowWorkOrderId,
      masterCompanyId: 1,
      updatedBy: this.userName,
      createdBy: this.userName,
      managementStructureId: 1,
      // attachmentId : 1
    }
    for (var key in data) {
      this.formData.append(key, data[key]);
    }
    this.workOrderService.createDocuments(this.formData).subscribe(res => {
      this.formData = new FormData();
      this.alertService.showMessage(
        'Success',
        `Saved Documents Successfully `,
        MessageSeverity.success
      );
    })
  }
  getPageCount(totalNoofRecords, pageSize) {
    return Math.ceil(totalNoofRecords / pageSize)
  }
  pageIndexChange(event) {
    this.pageSize = event.rows;
  }

  downloadFileUpload() { }
  closeMyModel(dialogiueId) {
    $(dialogiueId).modal('hide');

  }
  docviewdblclick(data) {

  }
}
