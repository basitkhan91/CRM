import { Component, Input } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { PageHeaderComponent } from '../../../../shared/page-header.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-work-order-documents',
  templateUrl: './work-order-documents.component.html',
  styleUrls: ['./work-order-documents.component.scss']
})
/** WorkOrderDocuments component*/
export class WorkOrderDocumentsComponent {
  @Input() documentForm;

  document = {
    WOId: '',
    Comp: '',
    BU: '',
    Div: '',
    Dep: '',
    DocumentCode: '',
    Description: 'Contract',
    DocLink: '',
    IsActive: false
  };
  /** WorkOrderDocuments ctor */
  constructor() {}
  addNewDoc() {
    this.documentForm = [...this.documentForm, { ...this.document }];
  }
}
