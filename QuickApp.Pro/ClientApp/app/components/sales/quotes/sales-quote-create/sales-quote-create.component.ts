import { Component, OnInit } from "@angular/core";

import { CustomerSearchQuery } from "../models/customer-search-query";
import { CustomerService } from "../../../../services/customer.service";
import { Customer } from "../../../../models/customer.model";
import { AlertService } from "../../../../services/alert.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: "app-sales-quote-create",
  templateUrl: "./sales-quote-create.component.html",
  styleUrls: ["./sales-quote-create.component.css"]
})
export class SalesQuoteCreateComponent implements OnInit {
  query: CustomerSearchQuery;
  customers: Customer[];
  totalRecords: number = 0;
  totalPages: number = 0;
  showPaginator: boolean = false;
    customerId: number;
    checked = false;
  constructor(
    private customerService: CustomerService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.customerId = +this.route.snapshot.paramMap.get("customerId");
    console.log(`customer id: ${this.customerId}`);
  }

  quote: any = {
    quoteTypeId: null,
    quoteDate: Date
  };
}
