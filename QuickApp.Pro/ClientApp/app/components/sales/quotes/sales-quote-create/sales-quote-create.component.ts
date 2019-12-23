import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, FormBuilder, FormGroup, Validators, FormControl,FormArray } from '@angular/forms';
import { CustomerSearchQuery } from "../models/customer-search-query";
import { CustomerService } from "../../../../services/customer.service";
import { Customer } from "../../../../models/customer.model";
import { AlertService,MessageSeverity } from "../../../../services/alert.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { SalesQuoteService } from "../../../../services/salesquote.service";
import { ISalesQuote } from "../../../../models/sales/ISalesQuote.model";
import { SalesQuote } from "../../../../models/sales/SalesQuote.model";
import { ISalesOrderQuote } from "../../../../models/sales/ISalesOrderQuote";
import { ISalesQuoteView } from "../../../../models/sales/ISalesQuoteView";
import { SalesQuoteView } from "../../../../models/sales/SalesQuoteView";
import { SalesOrderQuotePart } from "../../../../models/sales/SalesOrderQuotePart";
import { SalesOrderQuote } from "../../../../models/sales/SalesOrderQuote";
import { CommonService } from '../../../../services/common.service';
import { Currency } from '../../../../models/currency.model';
import { CurrencyService } from '../../../../services/currency.service';
import { EmployeeService } from '../../../../services/employee.service';
import { AuthService } from '../../../../services/auth.service';
import { Router } from "@angular/router";
import { getValueFromObjectByKey, getObjectById, editValueAssignByCondition, getObjectByValue } from '../../../../generic/autocomplete';
import { NgbModal, NgbActiveModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CustomerViewComponent } from '../../../../shared/components/customer/customer-view/customer-view.component';
import { PartDetail } from "../../shared/models/part-detail";



@Component({
  selector: "app-sales-quote-create",
  templateUrl: "./sales-quote-create.component.html",
  styleUrls: ["./sales-quote-create.component.scss"]
})
export class SalesQuoteCreateComponent implements OnInit {
  query: CustomerSearchQuery;
  customers: Customer[];
  customerDetails:any;
  totalRecords: number = 0;
  totalPages: number = 0;
  showPaginator: boolean = false;
  customerId: number;
  salesQuote: ISalesQuote;
  salesOrderQuote: ISalesOrderQuote;
  salesQuoteView: ISalesQuoteView;
  creditTerms:any[];
  percents:any[];
  allCurrencyInfo: any[];
  firstCollection: any[];
  allEmployeeinfo: any[] = [];
  customerNames: any[];
  allCustomer: any[];
  customerContactList:any[];
  customerWarningData: any = [];
  approvers: any[];
  accountTypes:any[];
  selectedParts:any[] = [];
  modal: NgbModalRef;
  tempMemo: any;
	tempMemoLabel: any;
  customer: any = {
    customerName: '',
    customerCode: '',
    promisedDate: ''
  };
  salesQuoteForm: FormGroup;
  display: boolean = false;

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
    private router: Router,
    private modalService: NgbModal
  ) {

    this.salesQuote = new SalesQuote();
  }

  ngOnInit() {
    this.customerId = +this.route.snapshot.paramMap.get("customerId");
    console.log(`customer id: ${this.customerId}`);
  

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
    this.salesQuoteService.getSelectedParts()
    .subscribe(data => {
    this.selectedParts = data;
    });
    this.getCreditTerms();
    this.getPercents();
    this.getCurrencyData();
    this.getEmployeedata();
    this.getAllCustomerContact();
    this.getCustomerWarningsData();
    this.getAccountTypes();
    this.getNewSalesQuoteInstance(this.customerId);

  }
  get userName(): string {
    return this.authService.currentUser ? this.authService.currentUser.userName : "";
  }
  get userId() {
    console.log(this.authService.currentUser);
    return this.authService.currentUser ? this.authService.currentUser.id : 0;
  }

  getCreditTerms() {
    this.commonservice.smartDropDownList('CreditTerms', 'CreditTermsId', 'Name').subscribe(res => {
        this.creditTerms = res;
        console.log(this.creditTerms);
    })
}
getPercents() {
  this.commonservice.smartDropDownList('[Percent]', 'PercentId', 'PercentValue').subscribe(res => {
      this.percents = res;
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
  this.firstCollection = this.allEmployeeinfo;

  const employeeListData = [...this.allEmployeeinfo.filter(x => {
      return x.firstName.toLowerCase().includes(event.query.toLowerCase())
  })]
  this.firstCollection = employeeListData;
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

  getCustomerDetails() {
    this.alertService.startLoadingMessage();
    this.customerService.getCustomerdataById(this.customerId).subscribe(res => {
      this.customerDetails = res[0];
      console.log(this.customerDetails);
      this.salesQuote.creditLimit = this.customerDetails.creditLimit;
      this.salesQuote.creditLimitTermsId = this.customerDetails.creditTermsId;
      this.salesQuote.contractReferenceName = this.customerDetails.contractReference;
      this.salesQuote.restrictPMA = this.customerDetails.restrictPMA;
      this.salesQuote.restrictDER = this.customerDetails.restrictBER;
      this.salesQuote.accountTypeId = this.customerDetails.customerTypeId;
      this.salesQuote.salesPersonName =  getObjectById('employeeId', this.customerDetails.primarySalesPersonId, this.allEmployeeinfo);
     // this.salesQuote.secondarySalesPersonId: getObjectById('employeeId', this.customerDetails.secondarySalesPersonId, this.employeeListOriginal),
      this.salesQuote.customerServiceRepName = getObjectById('employeeId', this.customerDetails.csrId, this.allEmployeeinfo);
      this.salesQuote.agentName = getObjectById('employeeId', this.customerDetails.saId, this.allEmployeeinfo);
      this.salesQuote.employeeName = getObjectById('employeeId', this.userId, this.allEmployeeinfo);
      this.alertService.stopLoadingMessage();
    })
    }
    getDefaultContact() {
      if (this.customerContactList) {
          if (this.customerContactList.length > 0) {
              for (let i = 0; i < this.customerContactList.length; i++) {
                  let isDefaultContact = this.customerContactList[i].isDefaultContact;
                  if (isDefaultContact) {
                     this.salesQuote.customerContactId = this.customerContactList[i].contactId;
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
    this.alertService.startLoadingMessage();
    this.salesQuoteService
      .getNewSalesQuoteInstance(customerId)
      .subscribe(data => {
        this.salesQuote = data && data.length ? data[0] : null;
    
        this.getCustomerDetails();
       
        this.getDefaultContact();
       console.log(this.salesQuote);
        this.customer = {
          customerName: this.salesQuote.customerName,
          customerCode: this.salesQuote.customerCode,
          promisedDate: this.salesQuote.customerPromisedDate
        };
        this.alertService.stopLoadingMessage();
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
  viewSelectedRow() {
   
    console.log();
    this.modal = this.modalService.open(CustomerViewComponent, { size: 'lg' });
    this.modal.componentInstance.customerId = this.customerId;
    this.modal.result.then(() => {
        console.log('When user closes');
    }, () => { console.log('Backdrop click') })

}
onAddDescription(value) {
  this.tempMemo = '';
  if (value == 'notes') {
    this.tempMemoLabel = 'Notes';
    this.tempMemo = this.salesQuote.notes;
  }
  if (value == 'memo') {
    this.tempMemoLabel = 'Memo';
    this.tempMemo = this.salesQuote.memo;
  }		
}

onSaveDescription() {
  if (this.tempMemoLabel == 'Notes') {
    this.salesQuote.notes = this.tempMemo;
  }
  if (this.tempMemoLabel == 'Memo') {
    this.salesQuote.memo = this.tempMemo;
  }		
}


  onSubmit() {
    //##TODO call below service to create sales quote 
    //this.salesQuoteService.create
    //input parameter: ISalesQuoteView
    console.log(this.salesQuote);
    if (!(this.salesQuote.quoteTypeId!=0 && this.salesQuote.openDate && this.salesQuote.customerRequestDate
      && this.salesQuote.customerPromisedDate && this.salesQuote.estimatedShipDate && this.salesQuote.validForDays!=0
      && this.salesQuote.quoteExpiryDate && this.salesQuote.priorityId!=0 && this.salesQuote.accountTypeId!=0 && this.salesQuote.customerContactId!=0
      && this.salesQuote.customerReferenceName  && this.salesQuote.employeeId!=0  && this.salesQuote.currencyId!=0)) {
      this.display = true;
  }else{
    this.display = false;
    this.alertService.startLoadingMessage();
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
    this.salesOrderQuote.salesPersonId = editValueAssignByCondition('employeeId', this.salesQuote.salesPersonName);
    this.salesOrderQuote.agentName = editValueAssignByCondition('firstName', this.salesQuote.agentName);
     this.salesOrderQuote.customerSeviceRepId = editValueAssignByCondition('employeeId', this.salesQuote.customerServiceRepName);

    this.salesOrderQuote.probabilityId = this.salesQuote.probabilityId;
    this.salesOrderQuote.employeeId = editValueAssignByCondition('employeeId', this.salesQuote.employeeId);
    this.salesOrderQuote.billToContactName = editValueAssignByCondition('name', this.salesOrderQuote.billToContactId);
    this.salesOrderQuote.billToContactId = editValueAssignByCondition('customerId', this.salesOrderQuote.billToContactId);
    this.salesOrderQuote.shipToContactName = editValueAssignByCondition('name', this.salesOrderQuote.shipToContactId);
    this.salesOrderQuote.shipToContactId = editValueAssignByCondition('customerId', this.salesOrderQuote.shipToContactId);
    this.salesOrderQuote.leadSourceId = this.salesQuote.leadSourceId;
    this.salesOrderQuote.creditLimit = this.salesQuote.creditLimit;
    this.salesOrderQuote.creditTermId = this.salesQuote.creditLimitTermsId;
     this.salesOrderQuote.restrictPMA = this.salesQuote.restrictPMA;
    this.salesOrderQuote.restrictDER = this.salesQuote.restrictDER;
    if(this.salesQuote.approvedDate)
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

    let partList:any = [];

    for (let i = 0; i < this.selectedParts.length; i++) {

      let selectedPart  = this.selectedParts[0];
      let partNumberObj = new SalesOrderQuotePart();
      partNumberObj.itemMasterId = selectedPart.itemMasterId;
      partNumberObj.stockLineId = selectedPart.stockLineId;
      partNumberObj.fxRate = selectedPart.fixRate;
      partNumberObj.qtyQuoted = selectedPart.quantityFromThis;
      partNumberObj.unitSalePrice = selectedPart.salesPricePerUnit;
      partNumberObj.salesBeforeDiscount = selectedPart.salesPriceExtended;
      partNumberObj.discount = selectedPart.salesDiscount;
      partNumberObj.discountAmount = selectedPart.salesDiscountPerUnit;
      partNumberObj.netSales = selectedPart.netSalesPriceExtended;
      partNumberObj.masterCompanyId = selectedPart.masterCompanyId;
      partNumberObj.createdBy=this.userName;
      partNumberObj.updatedBy=this.userName;
      partNumberObj.createdOn = new Date().toDateString();
      partNumberObj.updatedOn = new Date().toDateString();
      partList.push(partNumberObj);  
    }
    this.salesQuoteView.parts = partList;

    this.salesQuoteService
    .create(this.salesQuoteView)
    .subscribe(data => { 
      console.log(data);
      this.alertService.stopLoadingMessage();
      this.alertService.showMessage("Success", `Quote created successfully.`, MessageSeverity.success);
      this.router.navigateByUrl(
        `salesmodule/salespages/sales-quote-list`
      );
    });
    console.log(this.salesQuote);
    console.log(this.salesOrderQuote);
    console.log(this.approvers);

  }
    
  }

  quote: any = {
    quoteTypeId: null,
    quoteDate: Date
  };
}
