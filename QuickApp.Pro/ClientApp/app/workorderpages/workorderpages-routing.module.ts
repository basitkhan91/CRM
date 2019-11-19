// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkOrderPagesComponent } from './workorderpages.component';
import { WorkOrderAddComponent } from '../components/work-order/work-order-setup/work-order-add/work-order-add.component';
import { ManualEntryLaborHoursComponent } from '../components/work-order/work-order-setup/labor/manual-entry-labor-hours/manual-entry-labor-hours.component';
import { SystemGeneratedLaborHoursComponent } from '../components/work-order/work-order-setup/labor/system-generated-labor-hours/system-generated-labor-hours.component';
import { BarCodeScannedLaborHoursComponent } from '../components/work-order/work-order-setup/labor/bar-code-scanned-labor-hours/bar-code-scanned-labor-hours.component';
import { WorkOrderEquipmentListComponent } from '../components/work-order/work-order-setup/work-order-equipment/work-order-equipment-list/work-order-equipment-list.component';
import { WorkOrderEquipmentCheckInOutComponent } from '../components/work-order/work-order-setup/work-order-equipment/work-order-equipment-check-in-out/work-order-equipment-check-in-out.component';
import { WorkOrderCompleteMaterialListComponent } from '../components/work-order/work-order-setup/work-order-complete-material-list/work-order-complete-material-list.component';
import { WorkOrderReserveIssueComponent } from '../components/work-order/work-order-setup/work-order-reserve-issue/work-order-reserve-issue.component';
import { WorkOrderMainComponentComponent } from '../components/work-order/work-order-setup/work-order-main-component/work-order-main-component.component';
import { SubWorkOrderListComponent } from '../components/work-order/work-order-setup/sub-work-order/sub-work-order-list/sub-work-order-list.component';
import { SubWorkOrderSetupComponent } from '../components/work-order/work-order-setup/sub-work-order/sub-work-order-setup/sub-work-order-setup.component';
import { WorkOrderMemoComponent } from '../components/work-order/work-order-setup/work-order-memo/work-order-memo.component';
import { WorkOrderDocumentsComponent } from '../components/work-order/work-order-setup/work-order-documents/work-order-documents.component';
import { WorkOrderAnalysisComponent } from '../components/work-order/work-order-setup/work-order-analysis/work-order-analysis.component';
import { WorkOrderBillingComponent } from '../components/work-order/work-order-setup/work-order-billing/work-order-billing.component';
import { WorkOrderQuoteComponent } from '../components/work-order/work-order-setup/work-order-quote/work-order-quote.component';
import { WorkOrderShippingComponent } from '../components/work-order/work-order-setup/work-order-shipping/work-order-shipping.component';
import { WorkOrderListComponent } from '../components/work-order/work-order-list/work-order-list.component';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard.service';
import { DirectLabourComponent } from '../components/work-order/direct-labour/direct-labour.component';
import { WorkOrderSmartComponent } from '../components/work-order/work-order-setup/work-order-smart/work-order-smart.component';

const workorderPagesRoutes: Routes = [
  {
    path: 'workorderspages',
    component: WorkOrderPagesComponent,
    children: [
      {
        path: 'app-work-order-list',
        component: WorkOrderListComponent,
        data: { title: "Work Order's List" }
      },
      {
        path: 'app-work-order-add',
        component: WorkOrderSmartComponent,
        data: { title: 'Work Order Setup' }
      },
      {
        path: 'app-work-order-edit/:id',
        component: WorkOrderSmartComponent,
        data: { title: 'Work Order Setup' }
      },
      {
        path: 'app-work-order-quote',
        component: WorkOrderQuoteComponent,
        data: { title: 'Quote' }
      },
      {
        path: 'app-work-order-manual-entry-labor-hours',
        component: ManualEntryLaborHoursComponent,
        data: { title: 'Manual Entry Labor Hours' }
      },
      {
        path: 'app-work-order-system-generated-labor-hours',
        component: SystemGeneratedLaborHoursComponent,
        data: { title: 'System Generated Labor Hours' }
      },
      {
        path: 'app-work-order-bar-code-scanned-labor-hours',
        component: BarCodeScannedLaborHoursComponent,
        data: { title: 'Bar Code Scanned Labour Hours' }
      },
      {
        path: 'app-work-order-equipment-list',
        component: WorkOrderEquipmentListComponent,
        data: { title: 'Equipment List' }
      },
      {
        path: 'app-work-order-equipment-check-in-out',
        component: WorkOrderEquipmentCheckInOutComponent,
        data: { title: 'Equipment Check In Out' }
      },
      {
        path: 'app-work-order-complete-material-list',
        component: WorkOrderCompleteMaterialListComponent,
        data: { title: 'Complete Material List' }
      },
      {
        path: 'app-work-order-reserve-issue',
        component: WorkOrderReserveIssueComponent,
        data: { title: 'Reserve Issue' }
      },
      {
        path: 'app-work-order-main-component',
        component: WorkOrderMainComponentComponent,
        data: { title: 'Main Component' }
      },
      {
        path: 'app-work-order-sub-wo-list',
        component: SubWorkOrderListComponent,
        data: { title: 'Sub-WO List' }
      },
      {
        path: 'app-work-order-sub-wo-add',
        component: SubWorkOrderSetupComponent,
        data: { title: 'Sub-WO Setup' }
      },
      {
        path: 'app-work-order-memo',
        component: WorkOrderMemoComponent,
        data: { title: 'Memo' }
      },
      {
        path: 'app-work-order-documents',
        component: WorkOrderDocumentsComponent,
        data: { title: 'Documents' }
      },
      {
        path: 'app-work-order-analysis',
        component: WorkOrderAnalysisComponent,
        data: { title: 'Analysis' }
      },
      {
        path: 'app-work-order-billing',
        component: WorkOrderBillingComponent,
        data: { title: 'Billing' }
      },
      {
        path: 'app-work-order-quote',
        component: WorkOrderQuoteComponent,
        data: { title: 'Quote' }
      },
      {
        path: 'app-work-order-shipping',
        component: WorkOrderShippingComponent,
        data: { title: 'Shipping' }
      },
      {
        path: 'app-work-order-direct-labour',
        component: DirectLabourComponent,
        data: { title: 'direct-labour' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(workorderPagesRoutes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})
export class WorkOrdersPagesRoutingModule { }
