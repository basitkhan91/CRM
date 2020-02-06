import { Component, OnInit } from "@angular/core";
import { CustomerSearchQuery } from "../models/customer-search-query";
import { CustomerService } from "../../../../services/customer.service";
import { Customer } from "../../../../models/customer.model";
import { AlertService } from "../../../../services/alert.service";
import { Router } from "@angular/router";
import { listSearchFilterObjectCreation } from '../../../../generic/autocomplete';
import { TableModule, Table } from 'primeng/table';
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
    modal: NgbModalRef;
    data: any;
    pageSize: number = 10;
    pageIndex: number = 0;
    first = 0;
     lazyLoadEventData: any;
     filteredText: string;
     private table: Table;


     headers = [
      { field: 'name', header: 'Name' },
      { field: 'customerCode', header: 'Code' },
      { field: 'accountType', header: 'Account Type' },
      { field: 'customerType', header: 'Type' },

      { field: 'customerClassification', header: 'Classification' },
      { field: 'email', header: 'Email' },
      { field: 'city', header: 'City' },
      { field: 'stateOrProvince', header: 'State' },
      { field: 'contact', header: 'Contact' },
      { field: 'salesPersonPrimary', header: 'Sales Person' }


  ]
  selectedColumns = this.headers;

  constructor(
    private customerService: CustomerService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.query = new CustomerSearchQuery();
    //this.getList();
  }

  getList(data) {
        
    console.log(data.sortField);
         const PagingData = { ...data, filters: listSearchFilterObjectCreation(data.filters) }
    this.customerService.getCustomerAll(PagingData).subscribe(res => {
        this.data = res;
        if (res.length > 0) {
            this.totalRecords = res[0].totalRecords;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        }

    })
}

    columnsChanges() {
    this.refreshList();
}
refreshList() {
    if (this.filteredText != "" && this.filteredText != null && this.filteredText != undefined) {
        this.globalSearch(this.filteredText);
    }
    else {
        this.table.reset();
    }
   

}
globalSearch(value) {
  this.pageIndex = 0;
  this.filteredText = value;
  this.customerService.getGlobalSearch(value, this.pageIndex, this.pageSize).subscribe(res => {
      this.data = res;
      if (res.length > 0) {
          this.totalRecords = res[0].totalRecords;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      }
  })
}
loadData(event) {
   
    this.lazyLoadEventData = event;
    const pageIndex = parseInt(event.first) / event.rows;;
    this.pageIndex = pageIndex;
    this.pageSize = event.rows;
    event.first = pageIndex;
       this.getList(event)
    
    console.log(event);
}



filterData(data) {
    console.log(data);
}
getPageCount(totalNoofRecords, pageSize) {
return Math.ceil(totalNoofRecords / pageSize)
}

  viewSelectedRow(rowData) {
   
    console.log(rowData);
    this.modal = this.modalService.open(CustomerViewComponent, { size: 'lg', backdrop: 'static', keyboard: false });
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
