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
    styleUrls: ['./work-order-freight.component.css'],

})
/** WorkOrderDocuments component*/
export class WorkOrderFreightComponent implements OnInit {
    @Input() workOrderFreightList;
    @Input() freightForm;
    @Input() savedWorkOrderData;
    @Output() saveFreightListForWO = new EventEmitter();
    @Output() updateFreightListForWo = new EventEmitter();
    @Output() refreshData = new EventEmitter();
    
    @Input() isWorkOrder;
    @Input() isQuote = false;
    @Input() markupList;
    @Input() isView: boolean = false;
    customerId: any;
    shipViaList: any;
    carrierList: any;
    cols = [
        { field: 'carrierName', header: 'Carrier' },
        { field: 'shipVia', header: 'Ship Via' },
        { field: 'length', header: 'Length' },
        { field: 'width', header: 'Width' },
        { field: 'weight', header: 'Weight' },
        { field: 'memo', header: 'Memo' },
        { field: 'fixedAmount', header: 'FixedAmount' },
        { field: 'isFixedFreight', header: 'Fixed' },
        { field: 'amount', header: 'Amount' },
    ]
    isEdit: boolean = false;
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

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
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

    createNew() {
        this.isEdit = false;
        this.freightForm = [new Freight()];
    }
    addNewRow() {
        this.freightForm = [...this.freightForm, new Freight()];
    }
    edit(rowData) {
        this.isEdit = true;
        this.freightForm = [rowData];
    }
    saveFreightList() {
        if (this.isEdit) {
            if(this.isQuote){
                this.saveFreightListForWO.emit(this.freightForm);
                $('#addNewFreight').modal('hide');
                this.isEdit = false;
            }
            else{
                this.updateFreightListForWo.emit(this.freightForm);
                $('#addNewFreight').modal('hide');
                this.isEdit = false;
            }
        } else {
            this.saveFreightListForWO.emit(this.freightForm);
            $('#addNewFreight').modal('hide');
        }
    }

    delete(rowData) {
        const { workOrderFreightId } = rowData;

        this.workOrderService.deleteWorkOrderFreightList(workOrderFreightId, this.userName).subscribe(res => {
            this.refreshData.emit();
            this.alertService.showMessage(
                '',
                'Deleted WorkOrder Freight Successfully',
                MessageSeverity.success
            );
        })

    }

}