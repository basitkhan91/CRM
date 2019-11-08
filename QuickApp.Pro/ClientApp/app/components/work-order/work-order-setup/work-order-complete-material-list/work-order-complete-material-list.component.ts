import { Component, Input } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
// import { PageHeaderComponent } from '../../../../shared/page-header.component';
// import * as $ from 'jquery';

@Component({
    selector: 'app-work-order-complete-material-list',
    templateUrl: './work-order-complete-material-list.component.html',
    styleUrls: ['./work-order-complete-material-list.component.scss'],
    animations: [fadeInOut]
})
/** WorkOrderCompleteMaterialList component*/
export class WorkOrderCompleteMaterialListComponent {
    @Input() workOrderMaterialList;
    /** WorkOrderCompleteMaterialList ctor */
    constructor() {
       console.log(this.workOrderMaterialList)
    }
}