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
    @Input() taskList: any = [];
    customerId: any;
    shipViaList: any;
    carrierList: any;
    editingIndex: any;
    overAllMarkup: any;
    costPlusType: number = 0;
    cols = [
        { field: 'carrierName', header: 'Carrier' },
        { field: 'shipViaName', header: 'Ship Via' },
        { field: 'length', header: 'Length' },
        { field: 'width', header: 'Width' },
        { field: 'weight', header: 'Weight' },
        { field: 'memo', header: 'Memo' },
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
        if(this.workOrderFreightList && this.workOrderFreightList.length>0 && this.workOrderFreightList[0].headerMarkupId){
            this.costPlusType = this.workOrderFreightList[0].markupFixedPrice;
            this.overAllMarkup = Number(this.workOrderFreightList[0].headerMarkupId);
        }
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
        let newFreight = new Freight();
        this.taskList.forEach(
            task=>{
                if(task.description == "Assemble"){
                    newFreight['taskId'] = task.taskId;
                }
            }
        )
        this.freightForm = [...this.freightForm, newFreight];
    }
    edit(rowData, index) {
        this.editingIndex = index;
        this.isEdit = true;
        this.freightForm = [rowData];
    }
    saveFreightList() {
        if(!this.isQuote){
            if (this.isEdit) {
                // if(this.isQuote){
                //     this.saveFreightListForWO.emit(this.freightForm);
                //     $('#addNewFreight').modal('hide');
                //     this.isEdit = false;
                // }
                // else{
                    this.updateFreightListForWo.emit(this.freightForm);
                    $('#addNewFreight').modal('hide');
                    this.isEdit = false;
                // }
            } else {
                this.saveFreightListForWO.emit(this.freightForm);
                $('#addNewFreight').modal('hide');
            }
        }
        else{
            if(this.isEdit){
                this.workOrderFreightList[this.editingIndex] = this.freightForm[0];
                $('#addNewFreight').modal('hide');
                this.isEdit = false;
            }
            else{
                this.workOrderFreightList = [...this.workOrderFreightList, ...this.freightForm];
                $('#addNewFreight').modal('hide');
            }
        }
    }

    createFreightsQuote() {
        this.workOrderFreightList = this.workOrderFreightList.map((f)=>{
            return {...f, headerMarkupId: Number(this.overAllMarkup), markupFixedPrice: this.costPlusType}
        })
        this.saveFreightListForWO.emit(this.workOrderFreightList);
    }

    delete(rowData) {
        if(this.isQuote){
            rowData.isDeleted = true;
            // this.saveFreightListForWO.emit(this.freightForm);
            $('#addNewFreight').modal('hide');
            this.isEdit = false;
        }
        else{
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

    markupChanged(matData, type){
        try{
            this.markupList.forEach((markup)=>{
            if(type == 'row' && markup.value == matData.markupPercentageId){
                // matData.freightCostPlus = Number(matData.amount) + ((Number(matData.amount) / 100) * Number(markup.label))
                matData.billingAmount = (Number(matData.amount) + ((Number(matData.amount) / 100) * Number(markup.label))).toFixed(2)
                // matData['billingAmount'] = Number(matData['billingRate']) * Number(matData.weight);
            }
            else if(type == 'all' && markup.value == this.overAllMarkup){
                this.workOrderFreightList.forEach((mData)=>{
                if(mData.billingMethodId && Number(mData.billingMethodId) == 1){
                    mData.markupPercentageId = Number(this.overAllMarkup);
                    // mData.freightCostPlus = Number(mData.amount) + ((Number(mData.amount) / 100) * Number(markup.label))
                    mData.billingAmount = (Number(mData.amount) + ((Number(mData.amount) / 100) * Number(markup.label))).toFixed(2)
                    // mData['billingAmount'] = Number(mData['billingRate']) * Number(mData.weight);  
                }  
            })
            }
            })
        }
        catch(e){
            console.log(e);
        }
    }

    tmchange(){
        for(let mData of this.workOrderFreightList){
            mData.billingMethodId = this.costPlusType;
        }
    }
    
      getTotalAmount() {
        let total = 0;
        if(this.workOrderFreightList){
          this.workOrderFreightList.forEach(
            (material) => {
              if (material.amount) {
                total += Number(material.amount);
              }
            }
          )
        }
        return total.toFixed(2);
      }
    
    //   getTotalBillingRate() {
    //     let total = 0;
    //     if(this.workOrderFreightList){
    //       this.workOrderFreightList.forEach(
    //         (material) => {
    //           if (material.billingRate) {
    //             total += Number(material.billingRate);
    //           }
    //         }
    //       )
    //     }
    //     return total;
    //   }
    
      getTotalBillingAmount() {
        let total = 0;
        if(this.workOrderFreightList){
          this.workOrderFreightList.forEach(
            (material) => {
              if (material.billingAmount) {
                total += Number(material.billingAmount);
              }
            }
          )
        }
        return total.toFixed(2);
      }

}