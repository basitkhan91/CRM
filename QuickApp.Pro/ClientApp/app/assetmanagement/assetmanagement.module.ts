﻿import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
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
import { FileUploadModule } from 'primeng/fileupload';

import { RadioButtonModule } from 'primeng/radiobutton';
import { AssetmanagementComponent } from "./assetmanagement.component";
import { AssetListingComponent } from "../components/Asset-Management/asset-listing/asset-listing.component";
import { AssetCalibrationComponent } from "../components/Asset-Management/Asset-pages/asset-calibration/asset-calibration.component";
import { AssetCapesComponent } from "../components/Asset-Management/Asset-pages/asset-capes/asset-capes.component";
import { AssetGeneralInformationComponent } from "../components/Asset-Management/Asset-pages/asset-general-information/asset-general-information.component";
import { AssetMaintenanceWarrantyComponent } from "../components/Asset-Management/Asset-pages/asset-maintenance-warranty/asset-maintenance-warranty.component";
import { CreateAssetComponent } from "../components/Asset-Management/Asset-pages/create-asset/create-asset.component";
import { AssetmanagementRoutingModule } from "./assetmanagement-routing.module";
import { MenuItem } from 'primeng/api';
import { AssetStepsComponent } from "../components/Asset-Management/Asset-Steps-primeng/asset-steps/asset-steps.component";
import { AssetService } from "../services/asset/Assetservice";
import { AssetEndpoint } from "../services/asset/Asset-endpoint.service";
import { CommonService } from '../services/common.service';
import { AuditModule } from "../audit/audit.module";
import { ViewAssetComponent } from "../components/Asset-Management/Asset-pages/view-asset/view-asset.component";
import { AssetAdjustmentComponent } from '../components/Asset-Management/Asset-pages/asset-adjustment/asset-adjustment.component';
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
        FileUploadModule,
        CalendarModule, StepsModule, BreadcrumbModule, DialogModule,
        AuditModule
    ],
    declarations: [
        AssetmanagementComponent,
        AssetListingComponent,
        AssetCalibrationComponent,
        AssetCapesComponent,
        AssetGeneralInformationComponent,
        AssetMaintenanceWarrantyComponent,
        CreateAssetComponent,
        AssetStepsComponent,
        ViewAssetComponent,
        AssetAdjustmentComponent
    ],
    providers: [AssetService,
        AssetEndpoint,
        CommonService

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [AssetListingComponent],
    entryComponents: [

    ],


})
export class AssetmanagementModule {

}