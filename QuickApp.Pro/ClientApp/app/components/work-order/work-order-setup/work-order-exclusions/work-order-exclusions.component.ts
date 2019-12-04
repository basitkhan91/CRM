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
  @Output() updateExclusionsListForWO  = new EventEmitter()
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

  saveExclusionsList(event){
      this.saveExclusionsListForWO.emit(event);
      $('#addNewExclusions').modal('hide');
  }


  
  updateExclusionsList(event){
    this.updateExclusionsListForWO.emit(event);
    $('#addNewExclusions').modal('hide');
    this.isEdit = false;
  }


//   saveChargesList(event){
//     this.saveChargesListForWO.emit(event);
//     $('#addNewCharges').modal('hide');
  }