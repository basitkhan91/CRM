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
  ngOnInit() {
    this.quoteForm = {
      ...this.quoteForm,
      partsDetails: [{ ...this.multiParts }]
    };
  }
  saveQuoteDetails() {
    console.log(this.quoteForm);
  }
  addMPN() {
    this.quoteForm.partsDetails.push({ ...this.multiParts });
  }

  this.quoteNumber = '';
  this.openDate = '';
  this.quoteDueDate = '';
  this.validForDays = null;
  this.expirationDate = new Date();
  this.expirationDateStatus = '';
  this.workOrderNumber = '';
  this.customerId = '';
  this.customerCodeId = null;
  this.customerReference = '';
  this.isContract = false;
  this.contract = '';
  this.quantity = null;
  this.customerRequestDate = new Date();
  this.promiseDate = new Date();
  this.estCompletionDate = new Date();
  this.estShipDate = new Date();
  this.creditTerms = '';
  this.creditTermsandLimit = '';
  this.itemCount = null;
  this.currency = '';
  this.dso = '';
  this.accountsReceivableBalance = '';
}
