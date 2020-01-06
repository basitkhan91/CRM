import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { AuthService } from '../../../../services/auth.service';


@Component({
    selector: 'app-work-order-freight',
    templateUrl: './work-order-freight.component.html',

})
/** WorkOrderDocuments component*/
export class WorkOrderFreightComponent implements OnInit {
    @Input() workOrderFreightList;
    constructor(private workOrderService: WorkOrderService, private authService: AuthService,
        private alertService: AlertService, private cdRef: ChangeDetectorRef) {
    }
    ngOnInit() { }

    createNew() { }
}