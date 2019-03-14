import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard.service';

import { StockLineListComponent } from "../components/stockline/stock-line-list/stock-line-list.component";
import { StockLineSetupComponent } from "../components/stockline/stock-line-setup/stock-line-setup.component";
import { StockAdjustmentComponent } from "../components/stockline/stock-adjustment/stock-adjustment.component";
import { StocklineAdjustmentReasonComponent } from "../components/stockline/stockline-adjustment-reason/stockline-adjustment-reason.component";
import { StockLineEditComponent } from '../components/stockline/stock-line-edit/stock-line-edit.component';
import { StocklinepagesComponent } from './stocklinepages.component';


const StocklinePagesRoutes: Routes = [
	{
		path: 'stocklinepages',
		component: StocklinepagesComponent,
		children: [
			{ path: "app-stock-line-list", component: StockLineListComponent, data: { title: "StockLine List" } },
			{ path: "app-stock-line-setup", component: StockLineSetupComponent, data: { title: "StockLine setup" } },
            { path: "app-stock-adjustment", component: StockAdjustmentComponent, data: { title: "StockLine adjustment" } },
			{ path: "app-stockline-adjustment-reason", component: StocklineAdjustmentReasonComponent, data: { title: "StockLine adjustment Reason" } },
			{ path: "app-stock-line-edit", component: StockLineEditComponent, data: { title: "StockLine Edit" } },

			

		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(StocklinePagesRoutes)
	],
	exports: [
		RouterModule
	],
	providers: [
		AuthService, AuthGuard
	]
})
export class StocklinePagesRoutingModule { }