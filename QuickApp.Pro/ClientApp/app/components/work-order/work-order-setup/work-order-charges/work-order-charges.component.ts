import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges } from '@angular/core';
import * as $ from 'jquery'
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-work-order-charges',
  templateUrl: './work-order-charges.component.html',

})
/** WorkOrderDocuments component*/
export class WorkOrderChargesComponent implements OnChanges {
  @Input() workOrderChargesList;
  @Input() workFlowObject;
  @Input() isWorkOrder;
  @Input() isQuote = false;
  @Input() markupList;
  @Output() saveChargesListForWO = new EventEmitter();
  @Output() updateChargesListForWO = new EventEmitter();
  @Output() refreshData = new EventEmitter();
  @Output() createQuote = new EventEmitter();


  isEdit: boolean = false;
  editData: any;
  editingIndex: number;

  constructor(private workOrderService: WorkOrderService, private authService: AuthService,
    private alertService: AlertService, private cdRef: ChangeDetectorRef) {


  }

  ngOnChanges() {
    console.log(this.markupList);
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
      this.workOrderChargesList[i].isDeleted = true;
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
    this.createQuote.emit(this.workOrderChargesList);
  }

  markupChanged(matData) {
    try {
      this.markupList.forEach((markup) => {
        if (markup.value == matData.markupPercentageId) {
          matData.chargesCostPlus = (matData.quantity * matData.extendedCost) + (((matData.quantity * matData.extendedCost) / 100) * Number(markup.label))
        }
      })
    }
    catch (e) {
      console.log(e);
    }
  }

}