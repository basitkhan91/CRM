import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, FormBuilder, FormGroup, Validators, FormControl,FormArray } from '@angular/forms';
import { CustomerSearchQuery } from "../models/customer-search-query";
import { CustomerService } from "../../../../services/customer.service";
import { Customer } from "../../../../models/customer.model";
import { AlertService } from "../../../../services/alert.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { SalesQuoteService } from "../../../../services/salesquote.service";
import { ISalesQuote } from "../../../../models/sales/ISalesQuote.model";
import { SalesQuote } from "../../../../models/sales/SalesQuote.model";
import { ISalesOrderQuote } from "../../../../models/sales/ISalesOrderQuote";
import { ISalesQuoteView } from "../../../../models/sales/ISalesQuoteView";
import { SalesQuoteView } from "../../../../models/sales/SalesQuoteView";
import { SalesOrderQuote } from "../../../../models/sales/SalesOrderQuote";
import { CommonService } from '../../../../services/common.service';
import { Currency } from '../../../../models/currency.model';
import { CurrencyService } from '../../../../services/currency.service';
import { EmployeeService } from '../../../../services/employee.service';
import { AuthService } from '../../../../services/auth.service';
import { Router } from "@angular/router";


@Component({
  selector: "app-sales-quote-create",
  templateUrl: "./sales-quote-create.component.html",
  styleUrls: ["./sales-quote-create.component.scss"]
})
export class SalesQuoteCreateComponent implements OnInit {
  query: CustomerSearchQuery;
  customers: Customer[];
  totalRecords: number = 0;
  totalPages: number = 0;
  showPaginator: boolean = false;
  customerId: number;
  salesQuote: ISalesQuote;
  salesOrderQuote: ISalesOrderQuote;
  salesQuoteView: ISalesQuoteView;
  creditTerms:any[];
  allCurrencyInfo: any[];
  firstCollection: any[];
  allEmployeeinfo: any[] = [];
  customerNames: any[];
  allCustomer: any[];
  customerContactList:any[];
  customerWarningData: any = [];
  approvers: any[];
  accountTypes:any[];
  customer: any = {
    customerName: '',
    customerCode: '',
    promisedDate: ''
  };
  salesQuoteForm: FormGroup;

  @ViewChild("newSalesQuoteForm") public newSalesQuoteForm: NgForm;
  constructor(
    private customerService: CustomerService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private salesQuoteService: SalesQuoteService,
    private formBuilder: FormBuilder,
    private commonservice: CommonService,
    public currencyService: CurrencyService,
    public employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {

    this.salesQuote = new SalesQuote();
  }

  ngOnInit() {
    this.customerId = +this.route.snapshot.paramMap.get("customerId");
    console.log(`customer id: ${this.customerId}`);
    this.getNewSalesQuoteInstance(this.customerId);

    this.salesQuoteService
    .getSalesOrderQuteInstance()
    .subscribe(data => {
      this.salesOrderQuote = data;
    });
    this.salesQuoteService
    .getSalesOrderQuteApprovers()
    .subscribe(data => {
      this.approvers = data;
    });
    this.getCreditTerms();
    this.getCurrencyData();
    //this.getCustomerList();
    this.getEmployeedata();
    this.getAllCustomerContact();
    this.getCustomerWarningsData();
    this.getAccountTypes();

  }
  get userName(): string {
    return this.authService.currentUser ? this.authService.currentUser.userName : "";
}
  getCreditTerms() {
    this.commonservice.smartDropDownList('CreditTerms', 'CreditTermsId', 'Name').subscribe(res => {
        this.creditTerms = res;
        console.log(this.creditTerms);
    })
}

getAccountTypes() {
  this.customerService.getCustomerTypes().subscribe(res => {
      const responseData = res[0];
      this.accountTypes = responseData;
  })
}
async getCustomerWarningsData() {
  await this.customerService.getCustomerWarningsById(this.customerId).subscribe(res => {
    this.customerWarningData = res;
  })
}
private oncurrencySuccessful(getCreditTermsList: Currency[]) {
  this.allCurrencyInfo = getCreditTermsList;
}

private getCurrencyData() {
  this.currencyService.getCurrencyList().subscribe(
      results => this.oncurrencySuccessful(results[0]),
      error => this.onDataLoadFailed(error)
  );
}
private getEmployeedata() {
  this.employeeService.getEmployeeList().subscribe(
    results => this.onempDataLoadSuccessful(results[0]),
    error => this.onDataLoadFailed(error)
  );


}

private onempDataLoadSuccessful(getEmployeeCerficationList: any[]) {
  this.allEmployeeinfo = getEmployeeCerficationList;
}

filterfirstName(event) {

  this.firstCollection = [];
  for (let i = 0; i < this.allEmployeeinfo.length; i++) {
    let firstName = this.allEmployeeinfo[i].firstName;
    if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
      this.firstCollection.push(firstName);
    }
  }
}
  private onCustomerDataLoadSuccessful(allCustomerFlows: any[]) {
  this.allCustomer = allCustomerFlows;

}
private getCustomerList() {
  this.customerService.getWorkFlows().subscribe(
    results => this.onCustomerDataLoadSuccessful(results[0]),
    error => this.onDataLoadFailed(error)
  );
}
   filterNames(event) {

      this.customerNames = [];
      if (this.allCustomer) {
          if (this.allCustomer.length > 0) {
              for (let i = 0; i < this.allCustomer.length; i++) {
                  let name = this.allCustomer[i].name;
                  if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                      this.customerNames.push(name);
                  }
              }
          }
      }
  }
  getAllCustomerContact() {
    // get Customer Contatcs 
    
this.customerService.getContacts(this.customerId).subscribe(res => {
  this.customerContactList = res[0];
  console.log(this.customerContactList);
})
}
private onDataLoadFailed(error: any) {
  // alert(error);
}

onSalesPersonSelect(event) {
  console.log(event);
  if (this.allEmployeeinfo) {
      for (let i = 0; i < this.allEmployeeinfo.length; i++) {
          if (event == this.allEmployeeinfo[i].firstName) {
             this.salesQuote.salesPersonId = this.allEmployeeinfo[i].employeeId;  
          }
      }
  }
}
onAgentSelect(event) {
  console.log(event);
  if (this.allEmployeeinfo) {
      for (let i = 0; i < this.allEmployeeinfo.length; i++) {
          if (event == this.allEmployeeinfo[i].firstName) {
             this.salesQuote.agentId = this.allEmployeeinfo[i].employeeId;  
          }
      }
  }
}
onCustomerServiceRepSelect(event) {
  console.log(event);
  if (this.allEmployeeinfo) {
      for (let i = 0; i < this.allEmployeeinfo.length; i++) {
          if (event == this.allEmployeeinfo[i].firstName) {
             this.salesQuote.customerServiceRepId = this.allEmployeeinfo[i].employeeId;  
          }
      }
  }
}
onEmployeeNameSelect(event) {
  console.log(event);
  if (this.allEmployeeinfo) {
      for (let i = 0; i < this.allEmployeeinfo.length; i++) {
          if (event == this.allEmployeeinfo[i].firstName) {
             this.salesQuote.employeeId = this.allEmployeeinfo[i].employeeId;  
          }
      }
  }
}

onWarningSelect(event) {
  console.log(event);
  if (this.customerWarningData) {
      for (let i = 0; i < this.customerWarningData.length; i++) {
          if (event == this.customerWarningData[i].customerWarningId) {
             this.salesQuote.warningName = this.customerWarningData[i].warningMessage;  
          }
      }
  }
}



  getNewSalesQuoteInstance(customerId: number) {
    this.salesQuoteService
      .getNewSalesQuoteInstance(customerId)
      .subscribe(data => {
        this.salesQuote = data && data.length ? data[0] : null;
        this.customer = {
          customerName: this.salesQuote.customerName,
          customerCode: this.salesQuote.customerCode,
          promisedDate: this.salesQuote.customerPromisedDate
        };
      });
  }

  searchCustomerByName(event) {
    this.customerService
      .getcustomerByNameList(event.query)
      .subscribe((results: any) => {
        this.customers = results.length > 0 ? results[0] : [];
        console.log(this.customers);
      });
  }

  onCustomerNameSelect(customer: any) {
    console.log(customer);
    this.salesQuote.customerId = customer.customerId;
    this.salesQuote.customerCode = customer.customerCode;

   
 
  }

  onSubmit() {
    //##TODO call below service to create sales quote 
    //this.salesQuoteService.create
    //input parameter: ISalesQuoteView

    this.salesOrderQuote.quoteTypeId = this.salesQuote.quoteTypeId;
    this.salesOrderQuote.openDate = this.salesQuote.openDate.toDateString();
    this.salesOrderQuote.customerRequestDate = this.salesQuote.customerRequestDate.toDateString();
    this.salesOrderQuote.promisedDate = this.salesQuote.customerPromisedDate.toDateString();
    this.salesOrderQuote.estimatedShipDate = this.salesQuote.estimatedShipDate.toDateString();
    this.salesOrderQuote.validForDays = this.salesQuote.validForDays;
    this.salesOrderQuote.quoteExpireDate = this.salesQuote.quoteExpiryDate.toDateString();
    this.salesOrderQuote.priorityId = this.salesQuote.priorityId;
    this.salesOrderQuote.accountTypeId = this.salesQuote.accountTypeId;
    this.salesOrderQuote.customerId = this.salesQuote.customerId;
    this.salesOrderQuote.customerContactId = this.salesQuote.customerContactId;
    this.salesOrderQuote.customerReference = this.salesQuote.customerReferenceName;
    this.salesOrderQuote.contractReference = this.salesQuote.contractReferenceName;
    this.salesOrderQuote.salesPersonId = this.salesQuote.salesPersonId;
    this.salesOrderQuote.agentName = this.salesQuote.agentName;
     this.salesOrderQuote.customerSeviceRepId = this.salesQuote.customerServiceRepId;
    this.salesOrderQuote.probabilityId = this.salesQuote.probabilityId;
    this.salesOrderQuote.employeeId = this.salesQuote.employeeId;
    this.salesOrderQuote.leadSourceId = this.salesQuote.leadSourceId;
    this.salesOrderQuote.creditLimit = this.salesQuote.creditLimit;
    this.salesOrderQuote.creditTermId = this.salesQuote.creditLimitTermsId;
     this.salesOrderQuote.restrictPMA = this.salesQuote.restrictPMA;
    this.salesOrderQuote.restrictDER = this.salesQuote.restrictDER;
      this.salesOrderQuote.approvedDate = this.salesQuote.approvedDate.toDateString();
    this.salesOrderQuote.currencyId = this.salesQuote.currencyId;
    this.salesOrderQuote.customerWarningId = this.salesQuote.warningId;
     this.salesOrderQuote.memo = this.salesQuote.memo;
    this.salesOrderQuote.notes = this.salesQuote.notes;
    this.salesOrderQuote.createdBy=this.userName;
    this.salesOrderQuote.updatedBy=this.userName;
    this.salesOrderQuote.createdOn = new Date().toDateString();
    this.salesOrderQuote.updatedOn = new Date().toDateString();
    this.salesQuoteView = new SalesQuoteView();
    this.salesQuoteView.salesOrderQuote = this.salesOrderQuote;
    this.salesQuoteView.approverList = this.approvers;
    this.salesQuoteService
    .create(this.salesQuoteView)
    .subscribe(data => { 
      console.log(data);
      this.router.navigateByUrl(
        `salesmodule/salespages/sales-quote-list`
      );
    });
    console.log(this.salesQuote);
    console.log(this.salesOrderQuote);
    console.log(this.approvers);
  }

  quote: any = {
    quoteTypeId: null,
    quoteDate: Date
  };
}
