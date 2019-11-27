import { Component, Input, OnInit } from '@angular/core';
import {
  WorkOrderQuote,
  multiParts
} from '../../../../models/work-order-quote.modal';

@Component({
  selector: 'app-work-order-quote',
  templateUrl: './work-order-quote.component.html',
  styleUrls: ['./work-order-quote.component.scss']
})
/** WorkOrderQuote component*/
export class WorkOrderQuoteComponent implements OnInit {
  @Input() quoteForm: WorkOrderQuote;

  constructor() {}
  ngOnInit() {
    if(this.quoteForm == undefined){
      this.quoteForm = new WorkOrderQuote();
    }
    console.log(this.quoteForm);
  }
  saveQuoteDetails() {
    console.log(this.quoteForm);
  }
  addMPN() {
    this.quoteForm.partsDetails.push(new multiParts());
  }
}
