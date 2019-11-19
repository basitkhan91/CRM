import { Component, OnInit } from "@angular/core";

import { CustomerSearchQuery } from "../models/customer-search-query";
import { CustomerService } from "../../../../services/customer.service";
import { Customer } from "../../../../models/customer.model";
import { AlertService } from "../../../../services/alert.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { SalesQuoteService } from "../../../../services/salesquote.service";
import { ISalesQuote } from "../../../../models/sales/ISalesQuote.model";
import { SalesQuote } from "../../../../models/sales/SalesQuote.model";

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
  salesQuote: ISalesQuote;
  
  constructor(
    private customerService: CustomerService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private salesQuoteService: SalesQuoteService
  ) {
    this.salesQuote = new SalesQuote();
  }

  ngOnInit() {
    this.customerId = +this.route.snapshot.paramMap.get("customerId");
    console.log(`customer id: ${this.customerId}`);
    this.getNewSalesQuoteInstance(this.customerId);
  }

  getNewSalesQuoteInstance(customerId: number) {
    this.salesQuoteService
      .getNewSalesQuoteInstance(customerId)
      .subscribe(data => {
        this.salesQuote = data && data.length ? data[0] : null;
      });
  }

  quote: any = {
    quoteTypeId: null,
    quoteDate: Date
  };
}
