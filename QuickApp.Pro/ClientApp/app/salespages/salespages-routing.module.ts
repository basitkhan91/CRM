// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SalesPagesComponent } from "./salespages.component";
import { SalesQuoteListComponent } from "../components/sales/quotes/sales-quote-list/sales-quote-list.component";
import { SalesQuoteCreateComponent } from "../components/sales/quotes/sales-quote-create/sales-quote-create.component";

const salesPagesRoutes: Routes = [
  {
    path: "salespages",
    component: SalesPagesComponent,
    children: [
      { path: "sales-quote-create", component: SalesQuoteCreateComponent },
      { path: "sales-quote-edit/:id", component: null },
      {
        path: "sales-quote-list",
        component: SalesQuoteListComponent,
        data: { title: "Sales Quote List" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(salesPagesRoutes)],
  exports: [RouterModule],
  providers: []
})
export class SalesPagesRoutingModule {}
