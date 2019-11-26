import { Component, Input } from '@angular/core';



@Component({
  selector: 'app-work-order-charges',
  templateUrl: './work-order-charges.component.html',

})
/** WorkOrderDocuments component*/
export class WorkOrderChargessComponent {
  @Input() workOrderChargesList;
  constructor() {}

}