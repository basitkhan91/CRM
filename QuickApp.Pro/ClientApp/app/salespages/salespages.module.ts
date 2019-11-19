// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { QuickAppProMaterialModule } from "../modules/material.module";

import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { SelectButtonModule } from "primeng/selectbutton";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { AutoCompleteModule } from "primeng/autocomplete";
import { GMapModule } from "primeng/gmap";
import { AddActionsDialogComponent } from "../components/dialogs/add-actions-dialog/add-actions-dialog.component";
import { FileUploadModule } from "primeng/fileupload";
import { RadioButtonModule } from "primeng/radiobutton";
import { StepsModule } from "primeng/steps";
import { DialogModule } from "primeng/dialog";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { InputSwitchModule } from "primeng/inputswitch";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { KeyFilterModule } from "primeng/keyfilter";
import { TooltipModule } from "primeng/tooltip";
import { SpinnerModule } from "primeng/spinner";
import { CheckboxModule } from "primeng/checkbox";
import { PanelModule } from "primeng/panel";

import { SalesPagesRoutingModule } from "./salespages-routing.module";
import { SalesPagesComponent } from "./salespages.component";
import { SalesQuoteListComponent } from "../components/sales/quotes/sales-quote-list/sales-quote-list.component";
import { SalesQuoteCreateComponent } from "../components/sales/quotes/sales-quote-create/sales-quote-create.component";
import { CustomerService } from "../services/customer.service";
import { SalesQuoteComponent } from "../components/sales/quotes/sales-quote/sales-quote-component";
import { SalesQuoteService } from "../services/salesquote.service";
import { SalesQuoteEndpointService } from "../services/salesquote-endpoint.service";
import { TabViewModule } from "primeng/tabview";
import { SalesApproveComponent } from "../components/sales/quotes/shared/components/sales-approve/sales-approve.component";
import { SalesPartNumberComponent } from "../components/sales/quotes/shared/components/sales-part-number/sales-part-number.component";
import { SalesAddressComponent } from "../components/sales/quotes/shared/components/sales-address/sales-address.component";

@NgModule({
  imports: [
    SalesPagesRoutingModule,
    KeyFilterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    QuickAppProMaterialModule,
    TranslateModule,
    CommonModule,
    TableModule,
    ButtonModule,
    SelectButtonModule,
    InputTextModule,
    MultiSelectModule,
    InputSwitchModule,
    AutoCompleteModule,
    CalendarModule,
    GMapModule,
    RadioButtonModule,
    FileUploadModule,
    DialogModule,
    StepsModule,
    BreadcrumbModule,
    DropdownModule,
    TooltipModule,
    SpinnerModule,
    CheckboxModule,
    PanelModule,
    TabViewModule,
    DropdownModule
  ],
  declarations: [
    SalesPagesComponent,
    SalesQuoteListComponent,
    SalesQuoteCreateComponent,
    SalesQuoteComponent,
    SalesApproveComponent,
    SalesPartNumberComponent,
    SalesAddressComponent
  ],
  providers: [CustomerService, SalesQuoteService, SalesQuoteEndpointService],
  entryComponents: []
})
export class SalesPagesModule {}
