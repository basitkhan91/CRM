import { Component } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { PageHeaderComponent } from '../../../../shared/page-header.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-work-order-analysis',
  templateUrl: './work-order-analysis.component.html',
  styleUrls: ['./work-order-analysis.component.scss'],
  animations: [fadeInOut]
})
/** WorkOrderAnalysis component*/
export class WorkOrderAnalysisComponent {
  constructor() {}
}
