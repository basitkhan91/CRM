// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendorpagesComponent } from "./vendorpages.component";

import { VendorContactsComponent } from "../components/vendor/vendor-contacts/vendor-contacts.component";
import { VendorEditComponent } from "../components/vendor/vendor-edit/vendor-edit.component";
import { VendorFinancialInformationComponent } from "../components/vendor/vendor-financial-information/vendor-financial-information.component";
import { VendorGeneralInformationComponent } from "../components/vendor/vendor-general-information/vendor-general-information.component";
import { VendorPaymentInformationComponent } from "../components/vendor/vendor-payment-information/vendor-payment-information.component";
import { VendorSetupComponent } from "../components/vendor/vendor-setup/vendor-setup.component";
import { VendorShippingInformationComponent } from "../components/vendor/vendor-shipping-information/vendor-shipping-information.component";
import { VendorWarningsComponent } from "../components/vendor/vendor-warnings/vendor-warnings.component";
import { VendorMemoComponent } from "../components/vendor/vendor-memo/vendor-memo.component";
import { VendorEmailsComponent } from "../components/vendor/vendor-emails/vendor-emails.component";
import { VendorConversationsComponent } from "../components/vendor/vendor-conversations/vendor-conversations.component";
import { VendorsListComponent } from "../components/vendor/vendors-list/vendors-list.component";


import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard.service';
import { PolistComponent } from '../components/vendor/purchase-orders/polist/polist.component';
import { CreatePoComponent } from '../components/vendor/purchase-orders/create-po/create-po.component';
import { PoApprovalComponent } from '../components/vendor/purchase-orders/po-approval/po-approval.component';
import { PurchaseSetupComponent } from '../components/vendor/purchase-orders/purchase-setup/purchase-setup.component';
import { CreateRoComponent } from '../components/vendor/repaire-orders/create-ro/create-ro.component';
import { RoListComponent } from '../components/vendor/repaire-orders/ro-list/ro-list.component';
import { RoSetupComponent } from '../components/vendor/repaire-orders/ro-setup/ro-setup.component';

import { VendorCapabilitiesListComponent } from "../components/vendor/vendor-caps/vendor-capabilities-list/vendor-capabilities-list.component";
import { AddVendorCapabilitiesComponent } from "../components/vendor/vendor-caps/add-vendor-capabilities/add-vendor-capabilities.component";
import { EditVendorCapabilitiesComponent } from '../components/vendor/vendor-caps/edit-vendor-capabilities/edit-vendor-capabilities.component';


const vendorPagesRoutes: Routes = [
	{
		path: 'vendorpages',
		component: VendorpagesComponent,
		children: [
			{ path: "app-vendor-edit", component: VendorEditComponent, data: { title: "Vendor's Edit" } },
			{ path: "app-vendors-list", component: VendorsListComponent, data: { title: "Vendor's List" } },
			{ path: "app-vendor-setup", component: VendorSetupComponent, data: { title: "Vendor's Setup" } },

			{ path: "app-vendor-general-information", component: VendorGeneralInformationComponent, data: { title: "Vendor's General Information" } },
			{ path: "app-vendor-contacts", component: VendorContactsComponent, data: { title: "Vendor's Contact" } },
			{ path: "app-vendor-financial-information", component: VendorFinancialInformationComponent, data: { title: "Vendor's Financial Information" } },
			{ path: "app-vendor-payment-information", component: VendorPaymentInformationComponent, data: { title: "Vendor's Payment Information" } },
			{ path: "app-vendor-shipping-information", component: VendorShippingInformationComponent, data: { title: "Vendor's Shipping Information" } },
			{ path: "app-vendor-warnings", component: VendorWarningsComponent, data: { title: "Vendor Warnings" } },
			{ path: "app-vendor-memo", component: VendorMemoComponent, data: { title: "Vendor Memo" } },
			{ path: "app-vendor-emails", component: VendorEmailsComponent, data: { title: "Vendor Emails" } },
			{ path: "app-vendor-conversations", component: VendorConversationsComponent, data: { title: "Vendor Conversations" } },
			{ path: "app-polist", component: PolistComponent, data: { title: "Po List" } },
			{ path: "app-create-po", component: CreatePoComponent, data: { title: "Create PO" } },
			{ path: "app-po-approval", component: PoApprovalComponent, data: { title: "Po Approval" } },
			{ path: "app-purchase-setup", component: PurchaseSetupComponent, data: { title: "Purchase-setup" } },
			{ path: "app-create-ro", component: CreateRoComponent, data: { title: "Create-Ro" } },
			{ path: "app-ro-list", component: RoListComponent, data: { title: "Ro-List" } },
			{ path: "app-ro-setup", component: RoSetupComponent, data: { title: "RO-setup" } },
			{ path: "app-vendor-capabilities-list", component: VendorCapabilitiesListComponent, data: { title: "capabilities-list" } },
			{ path: "app-add-vendor-capabilities", component: AddVendorCapabilitiesComponent, data: { title: "capabilities-add" } },
            { path: "app-edit-vendor-capabilities", component: EditVendorCapabilitiesComponent, data: { title: "capabilities-edit" } },

		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(vendorPagesRoutes)
	],
	exports: [
		RouterModule
	],
	providers: [
		AuthService, AuthGuard
	]
})
export class VendorPagesRoutingModule { }