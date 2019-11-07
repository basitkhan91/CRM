import { Component, OnInit, Input } from '@angular/core';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
@Component({
    selector: 'app-work-order-assets',
    templateUrl: './work-order-assets.component.html',
    styleUrls: ['./work-order-assets.component.css']
})
export class WorkOrderAssetsComponent implements OnInit {
    //@Input() workOrderAssetList: any;
    @Input() savedWorkOrderData : any
    @Input() workOrderAssetList: any
    ngOnInit(): void {
        console.log('test');
        
        // this.getWorkOrderAssetList();
        console.log(this.workOrderAssetList)
    }

    constructor(private workOrderService: WorkOrderService) {


    }

    saveAssets(){
        
    }


    // getWorkOrderAssetList(): void {
    //     this.workOrderService.getWorkOrderAssetList(7).subscribe(
    //         result => {
    //             this.workOrderAssetList = result;
    //         }
    //     );
    // }
}
