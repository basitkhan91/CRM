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
import { AssetcreateComponent } from "../components/master-maintanace/assets-master/assetstype/assetcreate/assetcreate.component";
import { IntangibletypeListingComponent } from "../components/master-maintanace/assets-master/IntangibleType/intangibletype-listing/intangibletype-listing.component";
import { AssettypelistingComponent } from "../components/master-maintanace/assets-master/assetstype/assettypelisting/assettypelisting.component";
import { CreateIntangibletypeComponent } from "../components/master-maintanace/assets-master/IntangibleType/create-intangibletype/create-intangibletype.component";
import { MastermaintanacepagesComponent } from "./mastermaintanacepages.component";
import { AssetmanagementRoutingModule } from "../assetmanagement/assetmanagement-routing.module";



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
      
        MastermaintanacepagesComponent,
        IntangibletypeListingComponent,
        AssetcreateComponent,
        AssettypelistingComponent,
        CreateIntangibletypeComponent
    ],
    providers: [

    ],
    entryComponents: [

    ],


})
export class MastermaintanceModule {

}