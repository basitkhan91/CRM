import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { QuickAppProMaterialModule } from '../modules/material.module';
import { CommonModule } from '@angular/common'; //<-- This one
import { RouterModule, Routes } from '@angular/router';
import { GroupByPipe } from '../pipes/group-by.pipe';

import { WorkOrdersPagesRoutingModule } from './workorderpages-routing.module';

import { WorkOrderPagesComponent } from './workorderpages.component';
import { WorkOrderAddComponent } from '../components/work-order/work-order-setup/work-order-add/work-order-add.component';
import { ManualEntryLaborHoursComponent } from '../components/work-order/work-order-setup/labor/manual-entry-labor-hours/manual-entry-labor-hours.component';
import { SystemGeneratedLaborHoursComponent } from '../components/work-order/work-order-setup/labor/system-generated-labor-hours/system-generated-labor-hours.component';
import { BarCodeScannedLaborHoursComponent } from '../components/work-order/work-order-setup/labor/bar-code-scanned-labor-hours/bar-code-scanned-labor-hours.component';
import { WorkOrderEquipmentListComponent } from '../components/work-order/work-order-setup/work-order-equipment/work-order-equipment-list/work-order-equipment-list.component';
import { WorkOrderEquipmentCheckInOutComponent } from '../components/work-order/work-order-setup/work-order-equipment/work-order-equipment-check-in-out/work-order-equipment-check-in-out.component';
import { WorkOrderCompleteMaterialListComponent } from '../components/work-order/work-order-setup/work-order-complete-material-list/work-order-complete-material-list.component';
import { WorkOrderReserveIssueComponent } from '../components/work-order/work-order-setup/work-order-reserve-issue/work-order-reserve-issue.component';
import { WorkOrderMemoComponent } from '../components/work-order/work-order-setup/work-order-memo/work-order-memo.component';
import { WorkOrderDocumentsComponent } from '../components/work-order/work-order-setup/work-order-documents/work-order-documents.component';
import { WorkOrderAnalysisComponent } from '../components/work-order/work-order-setup/work-order-analysis/work-order-analysis.component';
import { WorkOrderBillingComponent } from '../components/work-order/work-order-setup/work-order-billing/work-order-billing.component';
import { WorkOrderQuoteComponent } from '../components/work-order/work-order-setup/work-order-quote/work-order-quote.component';
import { WorkOrderQuoteListComponent } from '../components/work-order/work-order-setup/work-order-quote-list/work-order-quote-list.component';
import { WorkOrderShippingComponent } from '../components/work-order/work-order-setup/work-order-shipping/work-order-shipping.component';
import { WorkOrderListComponent } from '../components/work-order/work-order-list/work-order-list.component';
import { WorkOrderLaborComponent } from '../components/work-order/work-order-setup/work-order-labor/work-order-labor.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { WorkOrderService } from '../services/work-order/work-order.service';
import { WorkOrderEndpointService } from '../services/work-order/work-order-endpoint.service';
import { WorkOrderPartNumberService } from '../services/work-order/work-order-part-number.service';
import { WorkOrderPartNumberEndpointService } from '../services/work-order/work-order-part-number-endpoint.service';
import { DirectLabourComponent } from '../components/work-order/direct-labour/direct-labour.component';
import { WorkFlowPagesModule } from '../workflowpages/workflowpages.module';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { WorkOrderAssetsComponent } from '../components/work-order/work-order-setup/work-order-assets/work-order-assets.component';
import { WorkOrderAddressesComponent } from '../components/work-order/work-order-setup/work-order-addresses/work-order-addresses.component';
import { TooltipModule } from 'primeng/tooltip';
import { CommonService } from '../services/common.service';
import { MatIconModule } from "@angular/material/icon";
import { TabViewModule } from 'primeng/tabview';
import { WorkOrderSmartComponent } from '../components/work-order/work-order-setup/work-order-smart/work-order-smart.component';
import { AccordionModule } from 'primeng/accordion';

import { WorkFlowtService } from '../services/workflow.service';
import { AssetmanagementModule } from '../assetmanagement/assetmanagement.module';
import { WorkOrderChargesComponent } from '../components/work-order/work-order-setup/work-order-charges/work-order-charges.component';
import { WorkOrderExclusionsComponent } from '../components/work-order/work-order-setup/work-order-exclusions/work-order-exclusions.component';
import { SubWorkOrderListComponent } from '../components/work-order/work-order-setup/work-order-subwo-list/work-order-subwo-list.component';
import { SubWorkOrderComponent } from '../components/work-order/work-order-setup/work-order-sub-wo/work-order-subwo.component';
import { MatTooltipModule } from '@angular/material';
import { WorkOrderQuoteService } from '../services/work-order/work-order-quote.service';
import { QuoteEndpointService } from '../services/work-order/work-order-quote.endpoint.service';
import { WorkOrderROListComponent } from '../components/work-order/work-order-setup/work-order-ro-list/work-order-ro-list.component';
import { WorkOrderROCreateComponent } from '../components/work-order/work-order-setup/work-order-ro-create/work-order-ro-create.component';
import { WorkOrderFreightComponent } from '../components/work-order/work-order-setup/work-order-freight/work-order-freight.component';
import { QuoteViewComponent } from '../shared/quote-view.component';
import { FileUploadModule } from 'primeng/fileupload';

// import { MaterialListCreateComponent } from '../shared/Material-List-Create.component';
// import { SharedModule } from '../shared/shared.module';
// import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    WorkOrdersPagesRoutingModule,
    TableModule,
    ButtonModule,
    SelectButtonModule,
    InputTextModule,
    MultiSelectModule,
    AutoCompleteModule,
    WorkFlowPagesModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    RadioButtonModule,
    InputSwitchModule,
    TooltipModule,
    TabViewModule,
    AccordionModule,
    AssetmanagementModule,
    WorkFlowPagesModule,
    MatTooltipModule,
    FileUploadModule
  ],
  declarations: [
    WorkOrderPagesComponent,
    WorkOrderAddComponent,
    ManualEntryLaborHoursComponent,
    SystemGeneratedLaborHoursComponent,
    BarCodeScannedLaborHoursComponent,
    WorkOrderEquipmentListComponent,
    WorkOrderChargesComponent,
    WorkOrderExclusionsComponent,
    WorkOrderEquipmentCheckInOutComponent,
    WorkOrderEquipmentCheckInOutComponent,
    WorkOrderCompleteMaterialListComponent,
    WorkOrderReserveIssueComponent,
    WorkOrderMemoComponent,
    WorkOrderDocumentsComponent,
    WorkOrderAnalysisComponent,
    WorkOrderBillingComponent,
    WorkOrderQuoteComponent,
    WorkOrderQuoteListComponent,
    WorkOrderShippingComponent,
    WorkOrderListComponent,
    DirectLabourComponent,
    WorkOrderLaborComponent,
    WorkOrderAssetsComponent,
    WorkOrderAddressesComponent,
    WorkOrderSmartComponent,
    SubWorkOrderListComponent,
    SubWorkOrderComponent,
    WorkOrderROListComponent,
    WorkOrderROCreateComponent,
    WorkOrderFreightComponent,
    QuoteViewComponent


  ],
  entryComponents: [],
  providers: [
    WorkFlowtService,
    WorkOrderService,
    WorkOrderEndpointService,
    WorkOrderPartNumberService,
    WorkOrderPartNumberEndpointService,
    CommonService,
    WorkOrderQuoteService,
    QuoteEndpointService
  ],
  exports: [SubWorkOrderComponent]
})
export class WorkOrderPagesModule { }
