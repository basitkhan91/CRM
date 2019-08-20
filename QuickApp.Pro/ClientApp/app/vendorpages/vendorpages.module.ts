﻿
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { QuickAppProMaterialModule } from "../modules/material.module";

import { VendorPagesRoutingModule } from "./vendorpages-routing.module";

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
import { VendorStepsPrimeNgComponent } from '../components/vendor/vendor-steps-prime-ng/vendor-steps-prime-ng.component';





import { CommonModule } from '@angular/common'; //<-- This one
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';


import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from "primeng/autocomplete";
import { VendorClassificationComponent } from "../components/vendor-classification/vendor-classification.component";
import { GMapModule } from 'primeng/gmap';
import { AddActionsDialogComponent } from '../components/dialogs/add-actions-dialog/add-actions-dialog.component';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
//import { SharedModule } from '../shared/shared.module';
//import { CompanyComponent } from '../shared/company/company.component';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';

import { BreadcrumbModule } from 'primeng/breadcrumb'; //bread crumb
import { DialogModule } from 'primeng/dialog'; //Prime Ng Dailog
import { CreatePoComponent } from "../components/vendor/purchase-orders/create-po/create-po.component";
import { PoApprovalComponent } from "../components/vendor/purchase-orders/po-approval/po-approval.component";
import { PolistComponent } from "../components/vendor/purchase-orders/polist/polist.component";
import { PurchaseSetupComponent } from "../components/vendor/purchase-orders/purchase-setup/purchase-setup.component";
import { CreateRoComponent } from "../components/vendor/repaire-orders/create-ro/create-ro.component";
import { RoListComponent } from "../components/vendor/repaire-orders/ro-list/ro-list.component";
import { RoSetupComponent } from "../components/vendor/repaire-orders/ro-setup/ro-setup.component";
import { CalendarModule } from 'primeng/calendar'
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { VendorCapabilitiesListComponent } from "../components/vendor/vendor-caps/vendor-capabilities-list/vendor-capabilities-list.component";
import { AddVendorCapabilitiesComponent } from "../components/vendor/vendor-caps/add-vendor-capabilities/add-vendor-capabilities.component";
import { EditVendorCapabilitiesComponent } from "../components/vendor/vendor-caps/edit-vendor-capabilities/edit-vendor-capabilities.component";
import { AuthService } from "../services/auth.service";
import { RolesGuardService } from "../services/roles-guard.service";
import { ValidateAccessModule } from "../validateaccess/validateaccess.module";
import { KeyFilterModule } from "primeng/keyfilter";
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
	imports: [
		//SharedModule,
		//CompanyComponent,
        KeyFilterModule,
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
        VendorPagesRoutingModule,
        InputSwitchModule,
        CheckboxModule,
        AutoCompleteModule,
		GMapModule
		, RadioButtonModule, FileUploadModule,
		StepsModule,
		BreadcrumbModule, DialogModule, CalendarModule,
		TreeModule,
        TreeTableModule,
        ValidateAccessModule,
        TabViewModule,
        TooltipModule

	],
	declarations: [
		VendorpagesComponent,
		VendorContactsComponent,
		VendorEditComponent,
		VendorFinancialInformationComponent,
		VendorGeneralInformationComponent,
		VendorPaymentInformationComponent,
		VendorSetupComponent,
		VendorShippingInformationComponent,
		VendorWarningsComponent,
		VendorMemoComponent,
		VendorEmailsComponent,
		VendorConversationsComponent,
        VendorsListComponent,
		AddActionsDialogComponent,
		VendorStepsPrimeNgComponent,
		CreatePoComponent,
		PoApprovalComponent,
		PolistComponent,
		PurchaseSetupComponent,
		CreateRoComponent,
		RoListComponent,
		RoSetupComponent,

		VendorCapabilitiesListComponent,
        AddVendorCapabilitiesComponent,
        EditVendorCapabilitiesComponent
        
	],
	providers: [
        VendorClassificationComponent
	],
    entryComponents: [
        AddActionsDialogComponent
    ],

    
})
export class VendorPagesModule {

}