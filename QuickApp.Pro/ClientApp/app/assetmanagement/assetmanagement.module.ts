import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { QuickAppProMaterialModule } from "../modules/material.module";

import { CommonModule } from '@angular/common'; //<-- This one
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from "primeng/autocomplete";

import { StepsModule } from 'primeng/steps';//Prime Ng Steps
import { DialogModule } from 'primeng/dialog'; //Prime Ng Dailog
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { GMapModule } from 'primeng/gmap';
import { CalendarModule } from 'primeng/calendar';

import { RadioButtonModule } from 'primeng/radiobutton';
import { AssetmanagementComponent } from "./assetmanagement.component";
import { AssetListingComponent } from "../components/Asset-Management/asset-listing/asset-listing.component";
import { AssetCalibrationComponent } from "../components/Asset-Management/Asset-pages/asset-calibration/asset-calibration.component";
import { AssetCapesComponent } from "../components/Asset-Management/Asset-pages/asset-capes/asset-capes.component";
import { AssetGeneralInformationComponent } from "../components/Asset-Management/Asset-pages/asset-general-information/asset-general-information.component";
import { AssetMaintenanceWarrantyComponent } from "../components/Asset-Management/Asset-pages/asset-maintenance-warranty/asset-maintenance-warranty.component";
import { CreateAssetComponent } from "../components/Asset-Management/Asset-pages/create-asset/create-asset.component";
import { AssetmanagementRoutingModule } from "./assetmanagement-routing.module";

@NgModule({
    imports: [
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
        AssetmanagementRoutingModule,
        InputSwitchModule,
        CheckboxModule,
        AutoCompleteModule,
        GMapModule
        , RadioButtonModule,
        CalendarModule, StepsModule, BreadcrumbModule
    ],
    declarations: [
       AssetmanagementComponent,
        AssetListingComponent,
       AssetCalibrationComponent,
       AssetCapesComponent,
       AssetGeneralInformationComponent,
       AssetMaintenanceWarrantyComponent,
       CreateAssetComponent
    ],
    providers: [

    ],
    entryComponents: [

    ],


})
export class AssetmanagementModule {

}