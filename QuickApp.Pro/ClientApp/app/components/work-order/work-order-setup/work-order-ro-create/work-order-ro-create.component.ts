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
    workOrderROPartsList: any = [];
    constructor(private workOrderService: WorkOrderService) { }
    @Input() mpnId;
    roListColumns = [
        { field: 'mcpn', header: 'MCPN' },
        { field: 'mcpndescription', header: 'MCPN Description' },
        { field: 'mcserial', header: 'MC Serial #' },
        { field: 'stockline', header: 'Stock Line ' },
        { field: 'control', header: 'Control' },
        { field: 'controlid', header: 'Control #' },
        { field: 'controllerId', header: 'Control Id' },
        { field: 'qtytorepair', header: 'Qty to Repair' },
        { field: 'qtyreserved', header: 'Qty to Reserved' },

    ]






    ngOnInit() {
        console.log(this.mpnId)
        this.getNewROCreate();
    }


    getNewROCreate() {

        this.workOrderService.createNewWORO(this.mpnId).subscribe(res => {
            this.workOrderROPartsList = [res];
        })
    }

    createNewRoWorkOrder() {
        window.open(`/vendorsmodule/vendorpages/workorder-ro-create/${0}/${this.mpnId}`)
    }


}