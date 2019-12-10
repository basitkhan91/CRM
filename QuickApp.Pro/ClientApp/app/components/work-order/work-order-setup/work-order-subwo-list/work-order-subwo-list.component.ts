import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';



@Component({
    selector: 'app-sub-work-orderlist',
    templateUrl: './work-order-subwo-list.component.html',
})
/** WorkOrderShipping component*/
export class SubWorkOrderListComponent implements OnInit {
@Input() workOrderId;
@Input() mpnId;

    constructor(public _router: Router, ) { }

    ngOnInit() {

    }
    openNewSubWorkOrder() {
        // { workorderid: workorderid, mpnid: workorderid, subworkorderid: 0 }
        // console.log('test');
        // &mpn/mpnid=15&subworkOrder
        // const workorderid = 54;
        // const mpnid = 0;
        const subworkorderid = 0;
        window.open(`/workordersmodule/workorderspages/app-sub-work-order?workorderid=${this.workOrderId}&mpnid=${this.mpnId}&subworkorderid=${subworkorderid}`);
        // window.location.href = "https://www.google.com";
    }



    // openNewSubWorkOrder() {

    //     // { workorderid: workorderid, mpnid: workorderid, subworkorderid: 0 }
    //     // console.log('test');
    //     // &mpn/mpnid=15&subworkOrder
    //     const workorderid = 200;
    //     const mpnid = 0;
    //     const subworkorderid = 0;
    //     this._router.navigateByUrl(`/receivingmodule/receivingpages/app-receiving-ro?workorderid=${workorderid}&mpnid=${mpnid}&subworkorderid=${subworkorderid}`);
    //     // window.location.href = "https://www.google.com";
    // }

}