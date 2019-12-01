import { Component, OnInit } from "@angular/core";
import { CustomerSearchQuery } from "../models/customer-search-query";
import { CustomerService } from "../../../../services/customer.service";
import { Customer } from "../../../../models/customer.model";
import { AlertService } from "../../../../services/alert.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sales-order-create",
  templateUrl: "./sales-order.component.html",
  styleUrls: ["./sales-order.component.css"]
})
export class SalesOrderComponent implements OnInit {
  query: CustomerSearchQuery;
  customers: Customer[];
  totalRecords: number = 0;
  totalPages: number = 0;
  showPaginator: boolean = false;
    pageLinks: any;
    selectedColumns: any;
  constructor(
    private customerService: CustomerService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.query = new CustomerSearchQuery();
  }

  onSearch(event) {
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

  createOrder(customer: any) {
    this.router.navigateByUrl(
      `salesmodule/salespages/sales-order-create/${customer.customerId}`
    );
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
