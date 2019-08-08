import { Component, Input } from '@angular/core';

import { Documents } from '../../../../models/work-order-documents.modal';

@Component({
  selector: 'app-work-order-documents',
  templateUrl: './work-order-documents.component.html',
  styleUrls: ['./work-order-documents.component.scss']
})
/** WorkOrderDocuments component*/
export class WorkOrderDocumentsComponent {
  @Input() documentForm;
  constructor() {}
  addNewDoc() {
    this.documentForm = [...this.documentForm, new Documents()];
  }
}
