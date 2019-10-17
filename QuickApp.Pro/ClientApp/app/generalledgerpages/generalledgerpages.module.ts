
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
import { NodeSetupComponent } from "../components/accounting/general-ledger/node-setup/node-setup.component";
import { NodeSetupService } from "../services/node-setup/node-setup.service";
import { NodeSetupEndpointService } from "../services/node-setup/nodeSetup-endpoint.service";
import { InputSwitchModule } from 'primeng/inputswitch';
import { GlaccountListComponent } from "../components/general-ledger/glaccount-list/glaccount-list.component";
import { GlaccountCreateComponent } from "../components/general-ledger/glaccount-create/glaccount-create.component";
import { AccountCalenderService } from "../services/account-calender/accountcalender.service";
import { AccountCalenderEndpointService } from "../services/account-calender/accountcalender-endpoint.service";
import { PoRoCategoryComponent } from "../components/general-ledger/po-ro-category/po-ro-category.component";
import { POROCategoryEndpoint } from "../services/porocategory/po-ro-category-endpoint.service";
import { POROCategoryService } from "../services/porocategory/po-ro-category.service";
import { AuditModule } from "../audit/audit.module";
import { InterCompanySetupComponent } from "../components/general-ledger/intercompany-setup/intercompany-setup.component";
import { AutoCompleteModule } from "primeng/autocomplete";
import { TooltipModule } from "../../../node_modules/primeng/tooltip";

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
        TreeModule, DialogModule, CalendarModule, InputSwitchModule,
        AuditModule,
        AutoCompleteModule,
        TooltipModule

    ],
    declarations: [
        GeneralledgerPageComponent,
        AccountingCalendarComponent,
        JournalsComponent,
        OpenClosePeriodComponent,
        AccountReportsComponent,
        AccountSetupComponent,
        GeneralLedgerCurrencyComponent,
        LegalEntityStructureComponent,
        ManagementStructureComponent,
        EntityEditComponent,
        NodeSetupComponent,
        GlaccountListComponent,
        GlaccountCreateComponent,
        PoRoCategoryComponent,
        InterCompanySetupComponent,


    ],
    providers: [
        NodeSetupService,
        NodeSetupEndpointService,
        POROCategoryEndpoint,
        POROCategoryService


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