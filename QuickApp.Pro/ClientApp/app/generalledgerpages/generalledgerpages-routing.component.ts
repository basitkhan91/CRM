
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneralledgerPageComponent } from "./generalledgerpages.component";
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard.service';
import { LegalEntityStructureComponent } from "../components/general-ledger/entity/entity-list/entity-list.component";
import { AccountingCalendarComponent } from "../components/general-ledger/accounting-calendar/accounting-calendar.component";
import { JournalsComponent } from "../components/general-ledger/journals/journals.component";
import { OpenClosePeriodComponent } from "../components/general-ledger/open-close-period/open-close-period.component";
import { AccountReportsComponent } from "../components/general-ledger/account-reports/account-reports.component";
import { AccountSetupComponent } from "../components/general-ledger/account-setup/account-setup.component";
//import { GeneralLedgerCurrencyComponent } from "../components/general-ledger/general-ledger-currency/general-ledger-currency.component";
//import { GlAccountCategoriesComponent } from "../components/gl-account-categories/gl-account-categories.component";
import { ManagementStructureComponent } from '../components/general-ledger/entity/entity-setup/entity-setup.component';
import { EntityEditComponent } from '../components/general-ledger/entity/entity-edit/entity-edit.component';
import { NodeSetupComponent } from "../components/accounting/general-ledger/node-setup/node-setup.component";
//import { GLAccountCategoryComponent } from '../components/gl-account-categories/gl-account-categories.component';

const generalledgerpageRoutes: Routes = [
	{


		path: 'generalledgerpage',
		component: GeneralledgerPageComponent,
		children: [
			{ path: "app-legalentity-structure", component: LegalEntityStructureComponent, data: { title: "EntityListComponent" } },
			{ path: "app-managemententity-structure", component: ManagementStructureComponent, data: { title: "EntitySetupComponent" } },
			{ path: "app-entity-edit", component: EntityEditComponent, data: { title: "EntityEditComponent" } },

			{ path: "app-entity-edit-component", component: AccountingCalendarComponent, data: { title: "AccountingCalendarComponent" } },
			{ path: "app-entity-edit-component", component: JournalsComponent, data: { title: "JournalsComponent" } },
			{ path: "app-entity-edit-component", component: JournalsComponent, data: { title: "JournalsComponent" } },
			{ path: "app-entity-edit-component", component: OpenClosePeriodComponent, data: { title: "OpenClosePeriodComponent" } },
			{ path: "app-entity-edit-component", component: AccountReportsComponent, data: { title: "AccountReportsComponent" } },
            { path: "app-entity-edit-component", component: AccountSetupComponent, data: { title: "AccountSetupComponent" } },
            { path: "app-node-setup", component: NodeSetupComponent, data: { title: "NodeSetupComponent" } },
			//{ path: "app-generalLedgercurrenccComponent", component: GeneralLedgerCurrencyComponent, data: { title: "GeneralLedgerCurrencyComponent" } },
			//{ path: "app-glaccountcategoriescomponent", component: GLAccountCategoryComponent, data: { title: "GlAccountCategoriesComponent" } }
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(generalledgerpageRoutes)
	],
	exports: [
		RouterModule
	],
	providers: [
		AuthService, AuthGuard
	]
})
export class GeneralledgerPageRoutingModule { }