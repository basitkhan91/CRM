import { Component } from '@angular/core';
import { fadeInOut } from '../../../../../services/animations';
import { PageHeaderComponent } from '../../../../../shared/page-header.component';
import * as $ from 'jquery';

@Component({
    selector: 'app-sub-work-order-list',
    templateUrl: './sub-work-order-list.component.html',
    styleUrls: ['./sub-work-order-list.component.scss'],
    animations: [fadeInOut]
})
/** SubWorkOrderList component*/
export class SubWorkOrderListComponent {
    /** SubWorkOrderList ctor */
    constructor() {

    }
}