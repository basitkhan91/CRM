import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { CommonService } from '../../../../services/common.service';
import { MessageSeverity, AlertService } from '../../../../services/alert.service';
import { AuthService } from '../../../../services/auth.service';



@Component({
    selector: 'app-workorder-ro-list',
    templateUrl: './work-order-ro-list.component.html',

})
/** WorkOrderShipping component*/
export class WorkOrderROListComponent implements OnInit {
    workOrderRoList: any;
    roListColumns = [
        { field: 'partNumber', header: 'MCPN' },
        { field: 'partDescription', header: 'MCPN Description' },
        { field: 'serialNumber', header: 'MC Serial #' },
        { field: 'repairOrderNumber', header: 'RO Num' },
        { field: 'quantityOrdered', header: '# of Items' },
        { field: 'controlNumber', header: 'Control #' },
        { field: 'controllerId', header: 'Control Id' },
        { field: 'unitCost', header: 'Unit Cost' },
        { field: 'extendedCost', header: 'Extended Cost' },
        { field: 'currency', header: 'Currency' },
        { field: 'vendorName', header: 'Vendor Name' },
        { field: 'status', header: 'Status' },
        { field: 'openDate', header: 'Open Date' },
        { field: 'needByDate', header: 'Need By Date' },


    ]




    constructor(private workOrderService: WorkOrderService) { }

    ngOnInit() {
        this.getExistingRoList();
    }




    getExistingRoList() {
        this.workOrderService.getExistingWOROList().subscribe(res => {
            this.workOrderRoList = res;
            console.log(res);

        });
    }
    edit() {
        // window.open(`/workordersmodule/workorderspages/app-sub-work-order?workorderid=${this.workOrderId}&mpnid=${this.mpnId}&subworkorderid=${subworkorderid}`);  
    }
}