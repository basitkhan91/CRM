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
  constructor() {}


  saveChargesList(event){
    this.saveChargesListForWO.emit(event);
    $('#addNewCharges').modal('hide');
  }

}