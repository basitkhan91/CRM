import { Component, OnInit } from "@angular/core";
import { CustomerSearchQuery } from "../models/customer-search-query";
import { CustomerService } from "../../../../services/customer.service";
import { Customer } from "../../../../models/customer.model";
import { AlertService } from "../../../../services/alert.service";
import { Router } from "@angular/router";
import { NgbModal, NgbActiveModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CustomerViewComponent } from '../../../../shared/components/customer/customer-view/customer-view.component';

@Component({
  selector: "app-sales-quote-create",
  templateUrl: "./sales-quote.component.html",
  styleUrls: ["./sales-quote.component.css"]
})
export class SalesQuoteComponent implements OnInit {
  query: CustomerSearchQuery;
  customers: Customer[];
  totalRecords: number = 0;
  totalPages: number = 0;
  showPaginator: boolean = false;
    pageLinks: any;
    selectedColumns: any;
    modal: NgbModalRef;
  constructor(
    private customerService: CustomerService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.query = new CustomerSearchQuery();
  }

  viewSelectedRow(rowData) {
   
    console.log(rowData);
    this.modal = this.modalService.open(CustomerViewComponent, { size: 'lg' });
    this.modal.componentInstance.customerId = rowData.customerId;
    this.modal.result.then(() => {
        console.log('When user closes');
    }, () => { console.log('Backdrop click') })

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

  createQuote(customer: any) {
    this.router.navigateByUrl(
      `salesmodule/salespages/sales-quote-create/${customer.customerId}`
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
