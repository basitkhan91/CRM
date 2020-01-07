import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { AuthService } from '../../../../services/auth.service';
import { Freight } from '../../../../models/work-order-freight.model';
import { editValueAssignByCondition } from '../../../../generic/autocomplete';
import { CommonService } from '../../../../services/common.service';
import { getModuleIdByName } from '../../../../generic/enums';


@Component({
    selector: 'app-work-order-freight',
    templateUrl: './work-order-freight.component.html',

})
/** WorkOrderDocuments component*/
export class WorkOrderFreightComponent implements OnInit {
    @Input() workOrderFreightList;
    @Input() freightForm;
    @Input() savedWorkOrderData;
    @Output() saveFreightListForWO = new EventEmitter();
    customerId: any;
    shipViaList: any;
    carrierList: any;
    constructor(private workOrderService: WorkOrderService,
        private authService: AuthService,
        private alertService: AlertService,
        private commonService: CommonService,
        private cdRef: ChangeDetectorRef) {
    }
    ngOnInit() {
        this.freightForm = [...this.freightForm, new Freight()];
        this.customerId = editValueAssignByCondition('customerId', this.savedWorkOrderData.customerId);
        this.getShipViaByCustomerId();
        this.getCarrierList();
    }



    getCarrierList() {
        this.commonService.smartDropDownList('Carrier', 'CarrierId', 'Description').subscribe(res => {
            this.carrierList = res;
        })
    }


    getShipViaByCustomerId() {
        this.commonService.getShipViaDetailsByModule(getModuleIdByName('Customer'), this.customerId).subscribe(res => {

            this.shipViaList = res.map(x => {
                return {
                    label: x.name,
                    value: x.shippingViaId
                }
            });
        })
    }

    createNew() { }
    addNewRow() {
        this.freightForm = [...this.freightForm, new Freight()];
    }
    saveFreightList() {
        this.saveFreightListForWO.emit(this.freightForm);
        $('#addNewFreight').modal('hide');
    }
}