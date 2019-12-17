import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { CommonService } from '../../../../services/common.service';
import { MessageSeverity, AlertService } from '../../../../services/alert.service';
import { AuthService } from '../../../../services/auth.service';



@Component({
    selector: 'app-workorder-ro-create',
    templateUrl: './work-order-ro-create.component.html',

})
/** WorkOrderShipping component*/
export class WorkOrderROCreateComponent implements OnInit {
    workOrderROPartsList: any;
    constructor(private workOrderService: WorkOrderService) { }
    @Input() mpnId;
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


    ngOnInit() {
        this.getNewROCreate();
    }

    getNewROCreate() {
        this.workOrderService.createNewWORO(this.mpnId).subscribe(res => {
            this.workOrderROPartsList = res;
        })
    }

    createNewRoWorkOrder() {
        window.open(`/vendorsmodule/vendorpages/workorder-ro-create/${0}/${this.mpnId}`)
    }


}