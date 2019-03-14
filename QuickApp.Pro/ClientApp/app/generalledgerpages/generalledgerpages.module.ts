
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { QuickAppProMaterialModule } from "../modules/material.module";
import { CommonModule } from '@angular/common'; //<-- This one
import { RouterModule, Routes } from '@angular/router';
import { GroupByPipe } from '../pipes/group-by.pipe';

import { GeneralledgerPageRoutingModule } from "./generalledgerpages-routing.component";
import { GeneralledgerPageComponent } from "./generalledgerpages.component";

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';



import { AccountingCalendarComponent } from "../components/general-ledger/accounting-calendar/accounting-calendar.component";
import { JournalsComponent } from "../components/general-ledger/journals/journals.component";
import { OpenClosePeriodComponent } from "../components/general-ledger/open-close-period/open-close-period.component";
import { AccountReportsComponent } from "../components/general-ledger/account-reports/account-reports.component";
import { AccountSetupComponent } from "../components/general-ledger/account-setup/account-setup.component";
import { GeneralLedgerCurrencyComponent } from "../components/general-ledger/general-ledger-currency/general-ledger-currency.component";

import { LegalEntityStructureComponent } from "../components/general-ledger/entity/entity-list/entity-list.component";
import { ManagementStructureComponent } from "../components/general-ledger/entity/entity-setup/entity-setup.component";
import { TreeTableModule } from 'primeng/treetable';
import { EntityEditComponent } from "../components/general-ledger/entity/entity-edit/entity-edit.component";
//import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

import { DialogModule } from 'primeng/dialog'; 
import { CalendarModule } from 'primeng/calendar';
//import { GLAccountCategoryComponent } from "../components/gl-account-categories/gl-account-categories.component";
@NgModule({
    imports: [
        FlexLayoutModule,
        FormsModule, ReactiveFormsModule,
        QuickAppProMaterialModule,
        TranslateModule,
        CommonModule,
        GeneralledgerPageRoutingModule,
        TableModule,
        ButtonModule,
        SelectButtonModule,
        InputTextModule,
		MultiSelectModule,
		TreeTableModule,
		TreeModule, DialogModule, CalendarModule
	
    ],
    declarations: [
        GeneralledgerPageComponent,
        AccountingCalendarComponent,
        JournalsComponent,
        OpenClosePeriodComponent,
        AccountReportsComponent,
        AccountSetupComponent,
        GeneralLedgerCurrencyComponent,
		//GLAccountCategoryComponent,
		LegalEntityStructureComponent,
		ManagementStructureComponent,
		EntityEditComponent,
    ],
    providers: [
    ],
    exports: [
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        QuickAppProMaterialModule,
        TranslateModule
    ],
    entryComponents: [
    ]
})
export class GeneralledgerPageModule {

}