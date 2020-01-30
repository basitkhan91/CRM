import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
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
export class WorkOrderExclusionsComponent implements OnInit {
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
  costPlusType: string = "Mark Up";
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
    console.log(this.workOrderExclusionsList);
  }


  get userName(): string {
    return this.authService.currentUser ? this.authService.currentUser.userName : "";
  }



  markupChanged(matData, type) {
    try {
      this.markupList.forEach((markup)=>{
        if(type == 'row' && markup.value == matData.markUpPercentageId){
          matData.costPlusAmount = Number(matData.extendedCost) + ((Number(matData.extendedCost) / 100) * Number(markup.label))
        }
        else if(type == 'all' && markup.value == this.overAllMarkup){
          this.workOrderExclusionsList.forEach((mData)=>{
            mData.markUpPercentageId = this.overAllMarkup;
            mData.costPlusAmount = Number(mData.extendedCost) + ((Number(mData.extendedCost) / 100) * Number(markup.label))
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
      this.workOrderExclusionsList = [...this.workOrderExclusionsList, ...event['exclusions'].map(x => { return { ...x, epn: x.partNumber, epnDescription: x.partDescription } })];
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
    this.saveExclusionsListForWO.emit(this.workOrderExclusionsList);
  }


  //   saveChargesList(event){
  //     this.saveChargesListForWO.emit(event);
  //     $('#addNewCharges').modal('hide');
}