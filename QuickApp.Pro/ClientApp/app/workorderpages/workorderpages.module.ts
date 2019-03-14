
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { QuickAppProMaterialModule } from "../modules/material.module";
import { CommonModule } from '@angular/common'; //<-- This one
import { RouterModule, Routes } from '@angular/router';
import { GroupByPipe } from '../pipes/group-by.pipe';

import { WorkOrdersPagesRoutingModule } from "./workorderpages-routing.module";

import { WorkOrderPagesComponent } from "./workorderpages.component";
import { WorkOrderAddComponent } from "../components/work-order/work-order-setup/work-order-add/work-order-add.component";
import { ManualEntryLaborHoursComponent } from "../components/work-order/work-order-setup/labor/manual-entry-labor-hours/manual-entry-labor-hours.component";
import { SystemGeneratedLaborHoursComponent } from "../components/work-order/work-order-setup/labor/system-generated-labor-hours/system-generated-labor-hours.component";
import { BarCodeScannedLaborHoursComponent } from "../components/work-order/work-order-setup/labor/bar-code-scanned-labor-hours/bar-code-scanned-labor-hours.component";
import { WorkOrderEquipmentListComponent } from "../components/work-order/work-order-setup/work-order-equipment/work-order-equipment-list/work-order-equipment-list.component";
import { WorkOrderEquipmentCheckInOutComponent } from "../components/work-order/work-order-setup/work-order-equipment/work-order-equipment-check-in-out/work-order-equipment-check-in-out.component";
import { WorkOrderCompleteMaterialListComponent } from "../components/work-order/work-order-setup/work-order-complete-material-list/work-order-complete-material-list.component";
import { WorkOrderReserveIssueComponent } from "../components/work-order/work-order-setup/work-order-reserve-issue/work-order-reserve-issue.component";
import { WorkOrderMainComponentComponent } from "../components/work-order/work-order-setup/work-order-main-component/work-order-main-component.component";
import { SubWorkOrderListComponent } from "../components/work-order/work-order-setup/sub-work-order/sub-work-order-list/sub-work-order-list.component";
import { SubWorkOrderSetupComponent } from "../components/work-order/work-order-setup/sub-work-order/sub-work-order-setup/sub-work-order-setup.component";
import { WorkOrderMemoComponent } from "../components/work-order/work-order-setup/work-order-memo/work-order-memo.component";
import { WorkOrderDocumentsComponent } from "../components/work-order/work-order-setup/work-order-documents/work-order-documents.component";
import { WorkOrderAnalysisComponent } from "../components/work-order/work-order-setup/work-order-analysis/work-order-analysis.component";
import { WorkOrderBillingComponent } from "../components/work-order/work-order-setup/work-order-billing/work-order-billing.component";
import { WorkOrderQuoteComponent } from "../components/work-order/work-order-setup/work-order-quote/work-order-quote.component";
import { WorkOrderShippingComponent } from "../components/work-order/work-order-setup/work-order-shipping/work-order-shipping.component";
import { WorkOrderListComponent } from "../components/work-order/work-order-list/work-order-list.component";

import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { SelectButtonModule } from 'primeng/selectbutton'
import { InputTextModule } from 'primeng/inputtext'
import { MultiSelectModule } from 'primeng/multiselect'

@NgModule({
    imports: [
        CommonModule,
        WorkOrdersPagesRoutingModule,
        TableModule,
        ButtonModule,
        SelectButtonModule,
        InputTextModule,
        MultiSelectModule
    ],
    declarations: [
        WorkOrderPagesComponent,
        WorkOrderAddComponent,
        ManualEntryLaborHoursComponent,
        SystemGeneratedLaborHoursComponent,
        BarCodeScannedLaborHoursComponent,
        WorkOrderEquipmentListComponent,
        WorkOrderEquipmentCheckInOutComponent,
        WorkOrderEquipmentCheckInOutComponent,
        WorkOrderCompleteMaterialListComponent,
        WorkOrderReserveIssueComponent,
        WorkOrderMainComponentComponent,
        SubWorkOrderListComponent,
        SubWorkOrderSetupComponent,
        WorkOrderMemoComponent,
        WorkOrderDocumentsComponent,
        WorkOrderAnalysisComponent,
        WorkOrderBillingComponent,
        WorkOrderQuoteComponent,
        WorkOrderShippingComponent,
        WorkOrderListComponent

    ],
    entryComponents: [
    ]
})
export class WorkOrderPagesModule {

}