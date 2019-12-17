import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-work-order-exclusions',
  templateUrl: './work-order-exclusions.component.html',

})
/** WorkOrderDocuments component*/
export class WorkOrderExclusionsComponent implements OnInit {
  @Input() workOrderExclusionsList;
  @Input() workFlowObject;
  @Input() isWorkOrder;
  @Output() saveExclusionsListForWO = new EventEmitter();
  @Output() updateExclusionsListForWO = new EventEmitter();
  @Output() refreshData = new EventEmitter();
  @Input() isQuote = false;
  isEdit: boolean = false;
  editData: any;
  editingIndex: number;
  constructor(private workOrderService: WorkOrderService, private authService: AuthService,
    private alertService: AlertService, private cdRef: ChangeDetectorRef) {


  }

  ngOnInit(){
    console.log(this.workOrderExclusionsList);
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
    if(this.isQuote){
      this.workOrderExclusionsList.splice(i, 1);
    }
    else{
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
    if(this.isQuote){
      this.workOrderExclusionsList = [...this.workOrderExclusionsList, ...event['exclusions'].map(x=>{return {...x, epn: x.partNumber, epnDescription: x.partDescription}})];
      $('#addNewExclusions').modal('hide');
    }
    else{
      this.saveExclusionsListForWO.emit(event);
      $('#addNewExclusions').modal('hide');
    }
  }



  updateExclusionsList(event) {
    if(this.isQuote && this.isEdit){
      this.workOrderExclusionsList[this.editingIndex] = event.exclusions[0];
      $('#addNewExclusions').modal('hide');
      this.isEdit = false;
    }
    else{
      this.updateExclusionsListForWO.emit(event);
      $('#addNewExclusions').modal('hide');
      this.isEdit = false;
    }
  }

  saveQuotation(){
    this.saveExclusionsListForWO.emit(this.workOrderExclusionsList);
  }


  //   saveChargesList(event){
  //     this.saveChargesListForWO.emit(event);
  //     $('#addNewCharges').modal('hide');
}