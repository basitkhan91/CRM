import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { PageHeaderComponent } from '../../../shared/page-header.component';
import * as $ from 'jquery';
import { WorkOrderService } from '../../../services/work-order/work-order.service';

@Component({
    selector: 'app-work-order-list',
    templateUrl: './work-order-list.component.html',
    styleUrls: ['./work-order-list.component.scss'],
    animations: [fadeInOut]
})
/** WorkOrderList component*/
export class WorkOrderListComponent implements OnInit {
    /** WorkOrderList ctor */
    workOrderList : any;
    constructor(    private workOrderService: WorkOrderService,) {

    }
    ngOnInit(){
    
    }

    getAllWorkOrderList(){
        this.workOrderService.getWorkOrderList(0,10).subscribe(res => {
            this.workOrderList = res;
        })
    }
}