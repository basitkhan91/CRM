// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { QuickAppProMaterialModule } from "../modules/material.module";
//import { GroupByPipe } from '../pipes/group-by.pipe';

//import { ReceivingPagesRoutingModule } from "./customerpages-routing.module";

//import { CustomerPagesComponent } from "./customerpages.component";


import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from "primeng/autocomplete";
import { GMapModule } from 'primeng/gmap';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepsModule } from 'primeng/steps';//Prime Ng Steps
import { DialogModule } from 'primeng/dialog'; //Prime Ng Dailog
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CommonModule } from '@angular/common'; //<-- This one


import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { TabViewModule } from 'primeng/tabview';

import { ReceivingPagesRoutingModule } from "./receivingpages-routing.module";
import { CustomerWorksListComponent } from "../components/receiving/customer-work/customer-works-list/customer-works-list.component";
import { CustomerWorkSetupComponent } from "../components/receiving/customer-work/customer-work-setup/customer-work-setup.component";
import { CustomerWorkEditComponent } from "../components/receiving/customer-work/customer-work-edit/customer-work-edit.component";
import { ReceivingpagesComponent } from "./receivingpages.component";
import { CalendarModule } from "primeng/calendar";
import { EditPoComponent } from "../components/receiving/po-ro/edit-po/edit-po.component";
import { PurchaseOrderComponent } from "../components/receiving/po-ro/purchase-order/purchase-order.component";
import { ReceivngPoComponent } from "../components/receiving/po-ro/receivng-po/receivng-po.component";
import { ReceivingService } from "../services/receiving/receiving.service";
import { ReceivingEndpointService } from "../services/receiving/receiving-endpoint.service";
import { RepairOrderComponent } from "../components/receiving/repair-order/repair-order.component";

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
		ReceivingPagesRoutingModule,
		AutoCompleteModule,
        GMapModule, RadioButtonModule, FileUploadModule, DialogModule, StepsModule, BreadcrumbModule, CalendarModule, InputSwitchModule, CheckboxModule, TreeModule, TreeTableModule, TabViewModule
	],
	declarations: [
		CustomerWorksListComponent,
		CustomerWorkSetupComponent, 
		CustomerWorkEditComponent,
		EditPoComponent,
		PurchaseOrderComponent,
		ReceivngPoComponent,
        ReceivingpagesComponent,
        RepairOrderComponent

	],
    providers: [ReceivingService, ReceivingEndpointService

	],
	entryComponents: [
	]
})
export class ReceivingPagesModule
{

}