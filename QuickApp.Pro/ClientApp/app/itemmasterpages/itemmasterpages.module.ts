﻿import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { QuickAppProMaterialModule } from "../modules/material.module";
import { ItemmasterpagesRoutingModule } from "./itemmasterpages-routing.module";
import { ItemmasterPagesComponent } from "./itemmasterpages.component";
import { CommonModule } from '@angular/common'; //<-- This one
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from "primeng/autocomplete";
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';//Prime Ng Steps
//Prime Ng Dailog
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { GMapModule } from 'primeng/gmap';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ItemMasterListComponent } from "../components/item-masters/item-master-list/item-master-list.component";
import { ItemMasterSetupComponent } from "../components/item-masters/item-master-setup/item-master-setup.component";
import { ItemMasterStockComponent } from "../components/item-masters/item-master-stock/item-master-stock.component";
import { ItemMasterNonStockComponent } from "../components/item-masters/item-master-non-stock/item-master-non-stock.component";
import { ItemMasterEquipmentComponent } from "../components/item-masters/item-master-equipment/item-master-equipment.component";
import { ItemMasterExchangeComponent } from "../components/item-masters/item-master-exchange/item-master-exchange.component";
import { ItemMasterLoanComponent } from "../components/item-masters/item-master-loan/item-master-loan.component";
import { ItemMasterCreateCapabilitiesComponent } from "../components/item-masters/Capabilities/item-master-create-capabilities/item-master-create-capabilities.component";
import { ItemMasterCapabilitiesListComponent } from "../components/item-masters/Capabilities/item-master-capabilities-list/item-master-capabilities-list.component";
import { AuditModule } from "../audit/audit.module";
import { CardModule } from "primeng/card";
import { KeyFilterModule } from "primeng/keyfilter";
import { AircraftModelService } from "../services/aircraft-model/aircraft-model.service";
import { AircraftModelEndpointService } from "../services/aircraft-model/aircraft-model-endpoint.service";
import { AircraftManufacturerEndpointService } from "../services/aircraft-manufacturer/aircraftManufacturer-endpoint.service";
import { AircraftManufacturerService } from "../services/aircraft-manufacturer/aircraftManufacturer.service";
import { RouterModule } from "@angular/router";
import { PublicationService } from "../services/publication.service";
import { PublicationEndpointService } from "../services/publication-endpoint.service";


@NgModule({
    imports: [
        RouterModule,
        KeyFilterModule,
        TabMenuModule,
        CardModule,
        FlexLayoutModule,
        FormsModule, ReactiveFormsModule,
        QuickAppProMaterialModule,
        TranslateModule,
        CommonModule,
        TableModule,
        ButtonModule,
        SelectButtonModule,
        InputTextModule,
        MultiSelectModule,
        ItemmasterpagesRoutingModule,
        InputSwitchModule,
        CheckboxModule,
        AutoCompleteModule,
        GMapModule
        , RadioButtonModule,
        CalendarModule, StepsModule, BreadcrumbModule,
        DialogModule,
        AuditModule
    ],
    declarations: [
        ItemmasterPagesComponent,
        ItemMasterListComponent,
        ItemMasterSetupComponent,
        ItemMasterStockComponent,
        ItemMasterNonStockComponent,
        ItemMasterEquipmentComponent,
        ItemMasterExchangeComponent,
        ItemMasterLoanComponent,
        ItemMasterCreateCapabilitiesComponent,
        ItemMasterCapabilitiesListComponent


    ],
    providers: [
        AircraftModelService,
        AircraftModelEndpointService,
        AircraftManufacturerEndpointService,
        AircraftManufacturerService,
        PublicationService,
        PublicationEndpointService
      
    ],
    entryComponents: [

    ],
})
export class ItemmasterpagesModule {
}