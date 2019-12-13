import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery'
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-work-order-charges',
  templateUrl: './work-order-charges.component.html',

})
/** WorkOrderDocuments component*/
export class WorkOrderChargesComponent {
  @Input() workOrderChargesList;
  @Input() workFlowObject;
  @Input() isWorkOrder;
  @Input() isQuote = false;
  @Output() saveChargesListForWO = new EventEmitter();
  @Output() updateChargesListForWO = new EventEmitter();
  @Output() refreshData = new EventEmitter();
  @Output() createQuote = new EventEmitter(); 


  isEdit: boolean = false;
  editData: any;

  constructor(private workOrderService: WorkOrderService, private authService: AuthService,
    private alertService: AlertService, private cdRef: ChangeDetectorRef) {


  }


  get userName(): string {
    return this.authService.currentUser ? this.authService.currentUser.userName : "";
  }

  createNew() {
    this.isEdit = false;
    this.editData = undefined;
  }
  edit(rowData) {
    this.createNew();
    this.cdRef.detectChanges();
    this.isEdit = true;
    this.editData = rowData;
  }
  delete(rowData) {
    const { workOrderChargeId } = rowData;
    this.workOrderService.deleteWorkOrderChargesByChargesId(workOrderChargeId, this.userName).subscribe(res => {
      this.refreshData.emit();
      this.alertService.showMessage(
        '',
        'Deleted WorkOrder Charges Successfully',
        MessageSeverity.success
      );
    })
  }

  saveChargesList(event) {
    this.saveChargesListForWO.emit(event);
    $('#addNewCharges').modal('hide');
  }

  updateChargesList(event) {
    this.updateChargesListForWO.emit(event);
    $('#addNewCharges').modal('hide');
    this.isEdit = false;
  }

  createChargeQuote(){
    this.createQuote.emit(this.workOrderChargesList);
  }

}