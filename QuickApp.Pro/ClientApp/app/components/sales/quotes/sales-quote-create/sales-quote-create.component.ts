import { Component, OnInit } from "@angular/core";
import { CustomerSearchQuery } from "./models/customer-search-query";
import { CustomerService } from "../../../../services/customer.service";
import { Customer } from "../../../../models/customer.model";
import { AlertService } from "../../../../services/alert.service";

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

  constructor(
    private customerService: CustomerService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.query = new CustomerSearchQuery();
  }

  onSearch() {
    this.query.reset();
    this.searchCustomer();
  }

  onPaging(event) {
    if (this.totalRecords > 0) {
      this.query.first = event.first;
      this.query.rows = event.rows;
      this.searchCustomer();
    }
  }

  private searchCustomer() {
    this.alertService.startLoadingMessage();
    this.customerService
      .getServerPages(this.query)
      .subscribe((response: any) => {
        this.customers = response[0].customerList;
        this.totalRecords = response[0].totalRecordsCount;
        this.totalPages = Math.ceil(this.totalRecords / this.query.rows);
        this.showPaginator = this.totalRecords > 0;
        this.alertService.stopLoadingMessage();
      });
  }
}
