import { Component, Input, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import {
  WorkOrderQuote,
  multiParts,
  partsDetail
} from '../../../../models/work-order-quote.modal';

import { WorkOrderQuoteService } from '../../../../services/work-order/work-order-quote.service';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { CommonService } from '../../../../services/common.service';
import { WorkFlowtService } from '../../../../services/workflow.service';
import { CurrencyService } from '../../../../services/currency.service';
import { listSearchFilterObjectCreation } from '../../../../generic/autocomplete';
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators';
import * as $ from 'jquery'
import {
  AlertService,
  MessageSeverity
} from '../../../../services/alert.service';
import {
  WorkOrderLabor,
  AllTasks,
  WorkOrderQuoteLabor,
  ExclusionQuote,
  ChargesQuote,
  QuoteMaterialList
} from '../../../../models/work-order-labor.modal';
import * as moment from 'moment';

@Component({
  selector: 'app-work-order-quote-list',
  templateUrl: './work-order-quote-list.component.html',
  styleUrls: ['./work-order-quote-list.component.scss']
})
/** WorkOrderQuote component*/
export class WorkOrderQuoteListComponent implements OnInit {

  @Output() closeView = new EventEmitter();
  private woQuoteList: any[];
  private onDestroy$: Subject<void> = new Subject<void>();
  pageSize: number = 10;
  headers = [
    { field: 'quoteNumber', header: 'QUOTE NUM' },
    { field: 'workOrderNum', header: 'WO NUM' },
    { field: 'customerName', header: 'CUST NAME' },
    { field: 'customerCode', header: 'CUST CODE' },
    { field: 'openDate', header: 'OPEN DATE' },
    { field: 'promisedDate', header: 'PROMISE DATE' },
    { field: 'estCompletionDate', header: 'EST. COMP DATE' },
    { field: 'quoteStatus', header: 'QUOTE STATUS' }
]
  selectedColumns = this.headers;
  pageIndex: number = 0;
  totalRecords: any;
  totalPages: number;
  woQuoteViewData: any;
  constructor(private router: ActivatedRoute,private workOrderService: WorkOrderQuoteService, private commonService: CommonService, private _workflowService: WorkFlowtService, private alertService:AlertService, private workorderMainService: WorkOrderService, private currencyService:CurrencyService, private cdRef: ChangeDetectorRef) {}
  ngOnInit() {
    this.workOrderService.getWorkOrderQuoteList({"first":0,"rows":10,"sortOrder":1,
    "filters":{"quoteStatus":"open"},"globalFilter":null})
    .subscribe(
      (res: any[])=>{
        this.woQuoteList = res;
        this.totalRecords = res[0].totalRecords;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      }
    )
  }
  getColorCodeForMultiple(data) {
    return data['partNoType'] === 'Multiple' ? 'green' : 'black';
  }
  convertDate(key, data) {
    if (key === 'openDate') {
        return moment(data['openDate']).format('MM-DD-YYYY');
    }
    else if (key === 'customerRequestDateType') {
        return data['customerRequestDateType'] !== 'Multiple' ? moment(data['customerRequestDate']).format('MM-DD-YYYY') : data['customerRequestDateType'];
    }
    else if (key === 'promisedDateType') {
        return data['promisedDateType'] !== 'Multiple' ? moment(data['promisedDate']).format('MM-DD-YYYY') : data['promisedDateType'];
    }
    else if (key === 'estimatedShipDateType') {
        return data['estimatedShipDateType'] !== 'Multiple' ? moment(data['estimatedShipDate']).format('MM-DD-YYYY') : data['estimatedShipDateType'];
    } else if (key === 'estimatedCompletionDateType') {
        return data['estimatedCompletionDateType'] !== 'Multiple' ? moment(data['estimatedCompletionDate']).format('MM-DD-YYYY') : data['estimatedCompletionDateType'];
    } else {
        return data[key];
    }


  }
  mouseOverData(key, data) {
    if (key === 'partNoType') {
        return data['partNos']
    } else if (key === 'pnDescriptionType') {
        return data['pnDescription']
    } else if (key === 'workScopeType') {
        return data['workScope']
    } else if (key === 'priorityType') {
        return data['priority']
    } else if (key === 'customerType') {
        return data['customer']
    }
    else if (key === 'openDate') {
        return moment(data['openDate']).format('MM-DD-YYYY');
    }
    else if (key === 'customerRequestDateType') {

        return this.convertmultipleDates(data['customerRequestDate']);
    }
    else if (key === 'promisedDateType') {
        return this.convertmultipleDates(data['promisedDate']);
    } else if (key === 'estimatedShipDateType') {
        return this.convertmultipleDates(data['estimatedShipDate']);
    } else if (key === 'stageType') {
        return data['stage']
    } else if (key === 'estimatedCompletionDateType') {
        return this.convertmultipleDates(data['estimatedCompletionDate']);
        // return data['estimatedCompletionDateType'] !== 'Multiple' ? moment(data['estimatedCompletionDate']).format('MM-DD-YYYY') : data['estimatedCompletionDate'];
    } else {
        return data[key]
    }

  }
  convertmultipleDates(value) {
    const arrDates = [];
    const arr = value.split(',');
    for (var i = 0; i < arr.length; i++) {
        arrDates.push(moment(arr[i]).format('MM-DD-YYYY'));
    }
    return arrDates;
  }
  edit(data){
    window.open(` /workordersmodule/workorderspages/app-work-order-quote?workorderid=${data.workOrderId}`);
  }
  view(data){
    this.workOrderService.getWorkOrderQuoteData(data.workOrderQuoteId)
    .subscribe(
      (quoteData)=>{
        this.woQuoteViewData = quoteData;
      }
    )
  }

  getAllWorkOrderQuoteList(data) {
      console.log(data);
      const PagingData = { ...data, filters: listSearchFilterObjectCreation(data.filters) }
      this.workOrderService.getWorkOrderQuoteList(PagingData).pipe(takeUntil(this.onDestroy$)).subscribe((res: any[]) => {
          this.woQuoteList = res;
          if (res.length > 0) {
              this.totalRecords = res[0].totalRecords;
              this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
          }

      })
  }
  loadData(event) {
      const pageIndex = parseInt(event.first) / event.rows;;
      this.pageIndex = pageIndex;
      this.pageSize = event.rows;
      event.first = pageIndex;
      this.getAllWorkOrderQuoteList(event);
  }
}
