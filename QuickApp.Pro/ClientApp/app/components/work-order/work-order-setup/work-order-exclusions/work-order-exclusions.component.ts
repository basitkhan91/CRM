import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit, OnChanges } from '@angular/core';
import * as $ from 'jquery'
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-work-order-exclusions',
  templateUrl: './work-order-exclusions.component.html',
  styleUrls: ['./work-order-exclusions.component.scss'],

})
/** WorkOrderDocuments component*/
export class WorkOrderExclusionsComponent implements OnInit, OnChanges {
  @Input() workOrderExclusionsList;
  @Input() workFlowObject;
  @Input() isWorkOrder;
  @Input() markupList;
  @Output() saveExclusionsListForWO = new EventEmitter();
  @Output() updateExclusionsListForWO = new EventEmitter();
  @Output() refreshData = new EventEmitter();
  @Input() isQuote = false;
  @Input() isView: boolean = false;
  @Input() taskList: any = [];
  isEdit: boolean = false;
  editData: any;
  editingIndex: number;
  overAllMarkup: any;
  costPlusType: number = 0;
  cols = [
    { field: 'epn', header: 'EPN' },
    { field: 'epnDescription', header: 'EPN Description' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'unitCost', header: 'Unit Cost' },
    { field: 'extendedCost', header: 'Extended Cost' },
    { field: 'memo', header: 'Memo' }
  ]
  constructor(private workOrderService: WorkOrderService, private authService: AuthService,
    private alertService: AlertService, private cdRef: ChangeDetectorRef) {


  }

  ngOnInit() {
    if(this.workOrderExclusionsList && this.workOrderExclusionsList.length > 0 && this.workOrderExclusionsList[0].headerMarkupId){
      this.costPlusType = this.workOrderExclusionsList[0].markupFixedPrice;
      this.overAllMarkup = Number(this.workOrderExclusionsList[0].headerMarkupId);
    }
  }

  ngOnChanges() {
    if(this.workOrderExclusionsList && this.workOrderExclusionsList.length > 0 && this.workOrderExclusionsList[0].headerMarkupId){
      this.costPlusType = this.workOrderExclusionsList[0].markupFixedPrice;
      this.overAllMarkup = Number(this.workOrderExclusionsList[0].headerMarkupId);
    }
  }


  get userName(): string {
    return this.authService.currentUser ? this.authService.currentUser.userName : "";
  }



  markupChanged(matData, type) {
    try {
      this.markupList.forEach((markup)=>{
        if(type == 'row' && markup.value == matData.markupPercentageId){
          matData.billingRate = (Number(matData.unitCost) + ((Number(matData.unitCost) / 100) * Number(markup.label))).toFixed(2);
          matData['billingAmount'] = (Number(matData['billingRate']) * Number(matData.quantity)).toFixed(2);
        }
        else if(type == 'all' && markup.value == this.overAllMarkup){
          this.workOrderExclusionsList.forEach((mData)=>{
            if(mData.billingMethodId && Number(mData.billingMethodId) == 1){
              mData.markupPercentageId = Number(this.overAllMarkup);
              mData.billingRate = (Number(mData.unitCost) + ((Number(mData.unitCost) / 100) * Number(markup.label))).toFixed(2)
              mData['billingAmount'] = (Number(mData['billingRate']) * Number(mData.quantity)).toFixed(2);
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
    for(let mData of this.workOrderExclusionsList){
      mData.billingMethodId = this.costPlusType;
    }
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
      // this.workOrderExclusionsList[i].isDeleted = true;
    }
    else {
      const { workOrderExclusionsId } = rowData;
      this.workOrderService.deleteWorkOrderExclusionByExclusionId(workOrderExclusionsId, this.userName).subscribe(res => {
        this.refreshData.emit();
        this.alertService.showMessage(
          '',
          'Deleted WorkOrder Exclusion Successfully',
          MessageSeverity.success
        );

      })
    }
  }

  saveExclusionsList(event) {
    if(!this.workOrderExclusionsList){
      this.workOrderExclusionsList = [];
    }
    if (this.isQuote) {
      this.workOrderExclusionsList = [...this.workOrderExclusionsList, ...event['exclusions'].map(x => { return { ...x, epn: x.partNumber, epnDescription: x.partDescription, markupFixedPrice: this.costPlusType, headerMarkupId: Number(this.overAllMarkup) } })];
      $('#addNewExclusions').modal('hide');
    }
    else {
      this.saveExclusionsListForWO.emit(event);
      $('#addNewExclusions').modal('hide');
    }
  }



  updateExclusionsList(event) {
    if (this.isQuote && this.isEdit) {
      this.workOrderExclusionsList[this.editingIndex] = event.exclusions[0];
      $('#addNewExclusions').modal('hide');
      this.isEdit = false;
    }
    else {
      this.updateExclusionsListForWO.emit(event);
      $('#addNewExclusions').modal('hide');
      this.isEdit = false;
    }
  }

  saveQuotation() {
    this.workOrderExclusionsList = this.workOrderExclusionsList.map(exc=>{
      return {...exc, headerMarkupId: Number(this.overAllMarkup), markupFixedPrice: this.costPlusType,}
    })
    this.saveExclusionsListForWO.emit(this.workOrderExclusionsList);
  }
  getTotalQuantity() {
    let totalQuantity = 0;
    if(this.workOrderExclusionsList){
      this.workOrderExclusionsList.forEach(
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
    if(this.workOrderExclusionsList){
      this.workOrderExclusionsList.forEach(
        (material) => {
          if (material.extendedCost) {
            total += Number(material.extendedCost);
          }
        }
      )
    }
    return total.toFixed(2);
  }

  getTotalBillingRate() {
    let total = 0;
    if(this.workOrderExclusionsList){
      this.workOrderExclusionsList.forEach(
        (material) => {
          if (material.billingRate) {
            total += Number(material.billingRate);
          }
        }
      )
    }
    return total.toFixed(2);
  }

  getTotalBillingAmount() {
    let total = 0;
    if(this.workOrderExclusionsList){
      this.workOrderExclusionsList.forEach(
        (material) => {
          if (material.billingAmount) {
            total += Number(material.billingAmount);
          }
        }
      )
    }
    return total.toFixed(2);
  }

  //   saveChargesList(event){
  //     this.saveChargesListForWO.emit(event);
  //     $('#addNewCharges').modal('hide');
}