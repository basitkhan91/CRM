// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { QuickAppProMaterialModule } from "../modules/material.module";
import { GroupByPipe } from '../pipes/group-by.pipe';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common'; //<-- This one
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from "primeng/autocomplete";
import { GMapModule } from 'primeng/gmap';
import { AddActionsDialogComponent } from '../components/dialogs/add-actions-dialog/add-actions-dialog.component';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepsModule } from 'primeng/steps';//Prime Ng Steps
import { DialogModule } from 'primeng/dialog'; //Prime Ng Dailog
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputSwitchModule } from "primeng/inputswitch";
import { CalendarModule } from "primeng/calendar";
import { AccountingPagesComponent } from "./accounting-pages.component";
//import { NodeSetupComponent } from "../components/accounting/general-ledger/node-setup/node-setup.component";
import { AccountingPagesRoutingModule } from "./accountingpages-routing.module";
import { CreateBatchComponent } from "../components/accounting/general-ledger/Journals/create-batch/create-batch.component";
import { ViewBatchTsComponent } from "../components/accounting/general-ledger/Journals/view-batch/view-batch.component";



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
        InputSwitchModule,
        AutoCompleteModule,
        CalendarModule,
        GMapModule, RadioButtonModule, FileUploadModule, DialogModule, StepsModule, BreadcrumbModule, AccountingPagesRoutingModule
    ],
    declarations: [AccountingPagesComponent,
        // NodeSetupComponent,
        CreateBatchComponent,
        ViewBatchTsComponent

    ],
    providers: [

    ],
    entryComponents: [
    ]
})
export class AccountingPagesModule {

}