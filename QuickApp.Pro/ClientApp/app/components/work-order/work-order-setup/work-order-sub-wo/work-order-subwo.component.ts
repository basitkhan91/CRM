import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';



@Component({
    selector: 'app-sub-work-order',
    templateUrl: './work-order-subwo.component.html',
    styleUrls: ['./work-order-subwo.component.scss']
})
/** WorkOrderShipping component*/
export class SubWorkOrderComponent implements OnInit {
    issubWorkOrderState: Boolean = true;
    subWorkOrderHeader: Object;

    workOrderDetails;
    workOrderId: any;
    mpnId: any;
    subWorkOrderId: any;

    constructor(private router: Router, private acRouter: ActivatedRoute, private workOrderService: WorkOrderService) { }

    ngOnInit() {
        this.getHeaderDetails();
        // workorderid&mpnid=:mpnid&subworkorderid=:subworkorderid

        // this.workOrderId = this.acRouter.snapshot.params['workorderid'];
        // this.mpnId = this.acRouter.snapshot.params['mpnid'];
        // this.subWorkOrderId = this.acRouter.snapshot.params['subworkorderid'];
        const queryParamsData = this.acRouter.snapshot.queryParams;
        this.workOrderDetails = queryParamsData;

    }


    getHeaderDetails() {
        this.workOrderService.getSubWorkOrderHeaderByWorkOrderId(48, 35).subscribe(res => {
            this.subWorkOrderHeader = res;
        })
    }


}