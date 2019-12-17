﻿// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkOrderPagesComponent } from './workorderpages.component';
import { WorkOrderQuoteComponent } from '../components/work-order/work-order-setup/work-order-quote/work-order-quote.component';
import { WorkOrderListComponent } from '../components/work-order/work-order-list/work-order-list.component';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard.service';
import { WorkOrderSmartComponent } from '../components/work-order/work-order-setup/work-order-smart/work-order-smart.component';
import { SubWorkOrderComponent } from '../components/work-order/work-order-setup/work-order-sub-wo/work-order-subwo.component';

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
        path: 'app-sub-work-order',
        component: SubWorkOrderComponent,
        data: { title: 'Sub WorkOrder Create' }
      },
      {
        path: 'app-sub-work-order?workorderid=:workorderid&mpnid=:mpnid&subworkorderid=:subworkorderid',
        component: SubWorkOrderComponent,
        data: { title: 'Sub WorkOrder Create' }
      },


      // {
      // 	// 'app-sub-work-order/subworkorder/:workorderid/:mpnid/:subworkorderid'
      // 	path: 'app-receiving-ro?workorderid=:workorderid&mpnid=:mpnid&subworkorderid=:subworkorderid',
      // 	component: ReceivingRoComponent,
      // 	data: { title: 'Sub WorkOrder Create' }
      // },
      // {
      //   path: 'app-work-order-quote',
      //   component: WorkOrderQuoteComponent,
      //   data: { title: 'Quote' }
      // },
      // {
      //   path: 'app-work-order-manual-entry-labor-hours',
      //   component: ManualEntryLaborHoursComponent,
      //   data: { title: 'Manual Entry Labor Hours' }
      // },
      // {
      //   path: 'app-work-order-system-generated-labor-hours',
      //   component: SystemGeneratedLaborHoursComponent,
      //   data: { title: 'System Generated Labor Hours' }
      // },
      // {
      //   path: 'app-work-order-bar-code-scanned-labor-hours',
      //   component: BarCodeScannedLaborHoursComponent,
      //   data: { title: 'Bar Code Scanned Labour Hours' }
      // },
      // {
      //   path: 'app-work-order-equipment-list',
      //   component: WorkOrderEquipmentListComponent,
      //   data: { title: 'Equipment List' }
      // },
      // {
      //   path: 'app-work-order-equipment-check-in-out',
      //   component: WorkOrderEquipmentCheckInOutComponent,
      //   data: { title: 'Equipment Check In Out' }
      // },
      // {
      //   path: 'app-work-order-complete-material-list',
      //   component: WorkOrderCompleteMaterialListComponent,
      //   data: { title: 'Complete Material List' }
      // },
      // {
      //   path: 'app-work-order-reserve-issue',
      //   component: WorkOrderReserveIssueComponent,
      //   data: { title: 'Reserve Issue' }
      // },
      // {
      //   path: 'app-work-order-main-component',
      //   component: WorkOrderMainComponentComponent,
      //   data: { title: 'Main Component' }
      // },
      // {
      //   path: 'app-work-order-memo',
      //   component: WorkOrderMemoComponent,
      //   data: { title: 'Memo' }
      // },
      // {
      //   path: 'app-work-order-documents',
      //   component: WorkOrderDocumentsComponent,
      //   data: { title: 'Documents' }
      // },
      // {
      //   path: 'app-work-order-analysis',
      //   component: WorkOrderAnalysisComponent,
      //   data: { title: 'Analysis' }
      // },
      // {
      //   path: 'app-work-order-billing',
      //   component: WorkOrderBillingComponent,
      //   data: { title: 'Billing' }
      // },
      {
        path: 'app-work-order-quote',
        component: WorkOrderQuoteComponent,
        data: { title: 'Quote' }
      },
      // {
      //   path: 'app-work-order-shipping',
      //   component: WorkOrderShippingComponent,
      //   data: { title: 'Shipping' }
      // },
      // {
      //   path: 'app-work-order-direct-labour',
      //   component: DirectLabourComponent,
      //   data: { title: 'direct-labour' }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(workorderPagesRoutes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})
export class WorkOrdersPagesRoutingModule { }
