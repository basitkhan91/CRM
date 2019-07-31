// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceivingpagesComponent } from './receivingpages.component';
import { CustomerWorksListComponent } from '../components/receiving/customer-work/customer-works-list/customer-works-list.component';
import { CustomerWorkSetupComponent } from '../components/receiving/customer-work/customer-work-setup/customer-work-setup.component';
import { CustomerWorkEditComponent } from '../components/receiving/customer-work/customer-work-edit/customer-work-edit.component';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard.service';
import { EditPoComponent } from "../components/receiving/po-ro/edit-po/edit-po.component";
import { PurchaseOrderComponent } from "../components/receiving/po-ro/purchase-order/purchase-order.component";
import { ReceivngPoComponent } from "../components/receiving/po-ro/receivng-po/receivng-po.component";
import { RepairOrderComponent } from '../components/receiving/repair-order/repair-order.component';
import { ViewPoComponent } from '../components/receiving/po-ro/view-po/view-po.component';
//import { ShippingComponent } from '../components/receiving/shipping/shipping.component';

const receivingPagesRoutes: Routes = [
	{
		path: 'receivingpages',
		component: ReceivingpagesComponent,
		children: [


			{ path: "app-customer-works-list", component: CustomerWorksListComponent, data: { title: "Customer Work List" } },
			{ path: "app-customer-work-setup", component: CustomerWorkSetupComponent, data: { title: "Customer Work Setup" } },
			{ path: "app-customer-work-edit", component: CustomerWorkEditComponent, data: { title: "Customer Work Edit" } },
            { path: "app-edit-po", component: EditPoComponent, data: { title: "Edit-Po" } },
            { path: "app-view-po", component: ViewPoComponent, data: { title: "View-Po" } },
			{ path: "app-purchase-order", component: PurchaseOrderComponent, data: { title: "purchase Order" } },
            { path: "app-receivng-po", component : ReceivngPoComponent, data: { title: "receivng PO" } },
            { path: 'app-repair-order', component: RepairOrderComponent, data: { title: "repair order" } },
            //{ path: 'app-shipping', component: ShippingComponent, data: {title: "shipping"} }
			

		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(receivingPagesRoutes)
	],
	exports: [
		RouterModule
	],
	providers: [
		AuthService, AuthGuard
	]
})
export class ReceivingPagesRoutingModule { }