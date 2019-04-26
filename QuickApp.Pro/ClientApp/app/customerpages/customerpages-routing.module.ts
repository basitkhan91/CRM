﻿// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerPagesComponent } from "./customerpages.component";
import { CustomersListComponent } from "../components/customer/customers-list/customers-list.component";
import { CustomerEditComponent } from "../components/customer/customer-edit/customer-edit.component";
import { CustomerSetupComponent } from "../components/customer/customer-setup/customer-setup.component";
import { CustomerGeneralInformationComponent } from "../components/customer/customer-general-information/customer-general-information.component";
import { CustomerContactsComponent } from "../components/customer/customer-contacts/customer-contacts.component";
import { CustomerFinancialInformationComponent } from "../components/customer/customer-financial-information/customer-financial-information.component";
import { CustomerBillingInformationComponent } from "../components/customer/customer-billing-information/customer-billing-information.component";
import { CustomerShippingInformationComponent } from "../components/customer/customer-shipping-information/customer-shipping-information-component";
import { CustomerSalesPersonComponent } from "../components/customer/customer-sales-person/customer-sales-person.component";
import { CustomerWarningsComponent } from "../components/customer/customer-warnings/customer-warnings.component";
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard.service';

const customerPagesRoutes: Routes = [
    {
        path: 'customerpages',
        component: CustomerPagesComponent,
        children: [
           
            { path: "app-customers-list", component: CustomersListComponent, data: { title: "Customer's List" } },
			{ path: "app-customer-setup", component: CustomerSetupComponent, data: { title: "Customer Setup" } },
			{ path: "app-customer-general-information", component: CustomerGeneralInformationComponent, data: { title: "General Information" } },
            { path: "app-customer-edit", component: CustomerEditComponent, data: { title: "Customer Edit" } },
            { path: "app-customer-contacts", component: CustomerContactsComponent, data: { title: "Customer contacts" } },
            { path: "app-customer-financial-information", component: CustomerFinancialInformationComponent, data: { title: "Financial-Information" } },
            { path: "app-customer-billing-information", component: CustomerBillingInformationComponent, data: { title: "Billing-Information" } },
            { path: "app-customer-shipping-information", component: CustomerShippingInformationComponent, data: { title: "Shipping-Information" } },
			{ path: "app-customer-sales-person", component: CustomerSalesPersonComponent, data: { title: "Sales-Person" } },
			{ path: "app-customer-warnings", component: CustomerWarningsComponent, data: { title: "Warnings" } },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(customerPagesRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthService, AuthGuard
    ]
})
export class CustomerPagesRoutingModule { }