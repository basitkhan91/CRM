import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery'


@Component({
  selector: 'app-work-order-charges',
  templateUrl: './work-order-charges.component.html',

})
/** WorkOrderDocuments component*/
export class WorkOrderChargesComponent {
  @Input() workOrderChargesList;
  @Input() workFlowObject;
  @Input() isWorkOrder;
  @Output() saveChargesListForWO =  new EventEmitter();
  @Output() updateChargesListForWO =  new EventEmitter();
  
  isEdit: boolean = false;
  editData: any;
  constructor() {}


      createNew() {
        this.isEdit = false;
        this.editData = undefined;
    }
    edit(rowData) {
        this.isEdit = true;
        this.editData = rowData;
    }
    delete(rowData) {
    }

  saveChargesList(event){
    this.saveChargesListForWO.emit(event);
    $('#addNewCharges').modal('hide');
  }

  updateChargesList(event){
    this.updateChargesListForWO.emit(event);
    $('#addNewCharges').modal('hide');
    this.isEdit = false;
  }

}