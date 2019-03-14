import { Component } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { PageHeaderComponent } from '../../../../shared/page-header.component';
import * as $ from 'jquery';

@Component({
    selector: 'app-work-order-quote',
    templateUrl: './work-order-quote.component.html',
    styleUrls: ['./work-order-quote.component.scss'],
    animations: [fadeInOut]
})
/** WorkOrderQuote component*/
export class WorkOrderQuoteComponent {
    /** WorkOrderQuote ctor */
    constructor() {

    }
}