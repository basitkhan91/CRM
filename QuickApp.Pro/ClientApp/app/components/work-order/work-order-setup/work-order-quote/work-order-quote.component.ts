import { Component, Input, OnInit } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { PageHeaderComponent } from '../../../../shared/page-header.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-work-order-quote',
  templateUrl: './work-order-quote.component.html',
  styleUrls: ['./work-order-quote.component.scss']
})
/** WorkOrderQuote component*/
export class WorkOrderQuoteComponent implements OnInit {
  @Input() quoteForm;
  partsDetails = [];
  multiParts = {
    PnId: null,
    PnDescription: '',
    RevisedPnId: null,
    WorkScopeId: '',
    Qty: null,
    IsCMMorPubRef: '',
    WorkFlowId: null,
    Priority: '',
    CustomerRequestDate: '',
    PromiseDate: '',
    EstCompletionDate: '',
    EstShipDate: '',
    IsPMA: false,
    IsDER: false,
    TATDaysStandard: null,
    IsActive: false
  };

  constructor() {}
  ngOnInit() {}
  saveQuoteDetails() {}
  addMPN() {
    // this.quoteForm.partsDetails.push({ ...this.multiParts });
  }
}
