import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery'


@Component({
  selector: 'app-work-order-exclusions',
  templateUrl: './work-order-exclusions.component.html',

})
/** WorkOrderDocuments component*/
export class WorkOrderExclusionsComponent {
  @Input() workOrderExclusionsList;
  @Input() workFlowObject;
  @Input() isWorkOrder;
  @Output() saveExclusionsListForWO =  new EventEmitter();
  constructor() {}




  saveExclusionsList(event){
      this.saveExclusionsListForWO.emit(event);
      $('#addNewExclusions').modal('hide');
  }


//   saveChargesList(event){
//     this.saveChargesListForWO.emit(event);
//     $('#addNewCharges').modal('hide');
  }