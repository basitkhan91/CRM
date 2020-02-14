import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-work-order-charges',
  templateUrl: './work-order-charges.component.html',
  styleUrls: ['./work-order-charges.component.scss']

})
/** WorkOrderDocuments component*/
export class WorkOrderChargesComponent implements OnChanges, OnInit {
  @Input() workOrderChargesList;
  @Input() workFlowObject;
  @Input() isWorkOrder;
  @Input() isQuote = false;
  @Input() markupList;
  @Output() saveChargesListForWO = new EventEmitter();
  @Output() updateChargesListForWO = new EventEmitter();
  @Output() refreshData = new EventEmitter();
  @Output() createQuote = new EventEmitter();
  @Input() isView: boolean = false;
  @Input() taskList: any = [];
  cols = [
    { field: 'chargeType', header: 'Charge Type' },
    { field: 'description', header: 'Description' },
    { field: 'vendorName', header: 'Vendor Name' },
    { field: 'quantity', header: 'QTY' },
    { field: 'unitCost', header: 'Unit Cost' },
    { field: 'extendedCost', header: 'Extented Cost' },
    // { field: 'unitPrice', header: 'Unit Price' },
    // { field: 'extendedPrice', header: 'Extended Price' },
  ]

  isEdit: boolean = false;
  editData: any;
  editingIndex: number;
  costPlusType: number = 0;
  overAllMarkup: any;

  constructor(private workOrderService: WorkOrderService, private authService: AuthService,
    private alertService: AlertService, private cdRef: ChangeDetectorRef) {
      

  }

  ngOnChanges() {
    console.log(this.markupList);
    if(this.workOrderChargesList && this.workOrderChargesList.length > 0 && this.workOrderChargesList[0].headerMarkupId){
      this.costPlusType = Number(this.workOrderChargesList[0].markupFixedPrice);
      this.overAllMarkup = this.workOrderChargesList[0].headerMarkupId;
    }
  }
  ngOnInit() {
    if(this.workOrderChargesList && this.workOrderChargesList.length > 0 && this.workOrderChargesList[0].markupFixedPrice){
      this.costPlusType = Number(this.workOrderChargesList[0].markupFixedPrice);
      this.overAllMarkup = this.workOrderChargesList[0].headerMarkupId;
    }
    if(!this.isQuote){
      this.cols = [...this.cols, { field: 'extendedPrice', header: 'Extended Price' }, { field: 'unitPrice', header: 'Unit Price' },]
    }
  }

  get userName(): string {
    return this.authService.currentUser ? this.authService.currentUser.userName : "";
  }

  createNew() {
    this.isEdit = false;
    this.editData = undefined;
  }
  edit(rowData, i) {
    this.editingIndex = i;
    this.createNew();
    this.cdRef.detectChanges();
    this.isEdit = true;
    this.editData = rowData;
  }
  delete(rowData, i) {
    if (this.isQuote) {
      rowData.isDeleted = true;
      // this.workOrderChargesList[i].isDeleted = true;
    } else {
      console.log(rowData);

      const { workOrderChargesId } = rowData;
      this.workOrderService.deleteWorkOrderChargesByChargesId(workOrderChargesId, this.userName).subscribe(res => {
        this.refreshData.emit();
        this.alertService.showMessage(
          '',
          'Deleted WorkOrder Charges Successfully',
          MessageSeverity.success
        );
      })
    }
  }

  saveChargesList(event) {
    this.saveChargesListForWO.emit(event);
    $('#addNewCharges').modal('hide');
  }

  updateChargesList(event) {
    if (this.isQuote && this.isEdit) {
      this.workOrderChargesList[this.editingIndex] = event.charges[0];
      $('#addNewCharges').modal('hide');
      this.isEdit = false;
    }
    else {
      this.updateChargesListForWO.emit(event);
      $('#addNewCharges').modal('hide');
      this.isEdit = false;
    }
  }

  createChargeQuote() {
    this.workOrderChargesList = this.workOrderChargesList.map(charge=>{
      return {...charge, markupFixedPrice: this.costPlusType, headerMarkupId: Number(this.overAllMarkup) }
    })
    this.createQuote.emit(this.workOrderChargesList);
  }

  markupChanged(matData, type) {
    try {
      this.markupList.forEach((markup)=>{
        if(type == 'row' && markup.value == matData.markupPercentageId){
          // matData.tmAmount = Number(matData.extendedCost) + ((Number(matData.extendedCost) / 100) * Number(markup.label))
          matData['billingRate'] = (matData['unitCost']) + (((matData['unitCost']) / 100) * Number(markup.label))
          matData['billingAmount'] = Number(matData['billingRate']) * Number(matData.quantity);
        }
        else if(type == 'all' && markup.value == this.overAllMarkup){
          this.workOrderChargesList.forEach((mData)=>{
            if(mData.billingMethodId && Number(mData.billingMethodId) == 1){
              // mData.markupPercentageId = this.overAllMarkup;
              // mData.tmAmount = Number(mData.extendedCost) + ((Number(mData.extendedCost) / 100) * Number(markup.label))
              mData.markupPercentageId = this.overAllMarkup;
              mData['billingRate'] = (mData['unitCost']) + (((mData['unitCost']) / 100) * Number(markup.label))
              mData['billingAmount'] = Number(mData['billingRate']) * Number(mData.quantity);
            }
          })
        }
      })

      // this.markupList.forEach((markup) => {
      //   if (markup.value == matData.markupPercentageId) {
      //     matData.chargesCostPlus = (matData.extendedCost) + (((matData.extendedCost) / 100) * Number(markup.label))
      //   }
      // })
    }
    catch (e) {
      console.log(e);
    }
  }

  tmchange(){
    for(let mData of this.workOrderChargesList){
      mData.billingMethodId = this.costPlusType;
    }
  }

  getTotalQuantity() {
    let totalQuantity = 0;
    if(this.workOrderChargesList){
      this.workOrderChargesList.forEach(
        (material) => {
          if (material.quantity) {
            totalQuantity += material.quantity;
          }
        }
      )
    }
    return totalQuantity;
  }

  getTotalUnitCost() {
    let total = 0;
    if(this.workOrderChargesList){
      this.workOrderChargesList.forEach(
        (material) => {
          if (material.unitCost) {
            total += Number(material.unitCost);
          }
        }
      )
    }
    return total;
  }

  getTotalBillingRate() {
    let total = 0;
    if(this.workOrderChargesList){
      this.workOrderChargesList.forEach(
        (material) => {
          if (material.billingRate) {
            total += Number(material.billingRate);
          }
        }
      )
    }
    return total;
  }

  getTotalBillingAmount() {
    let total = 0;
    if(this.workOrderChargesList){
      this.workOrderChargesList.forEach(
        (material) => {
          if (material.billingAmount) {
            total += Number(material.billingAmount);
          }
        }
      )
    }
    return total;
  }

}