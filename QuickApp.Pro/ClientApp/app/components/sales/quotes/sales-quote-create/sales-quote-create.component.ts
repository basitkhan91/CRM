import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  NgForm,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from "@angular/forms";
import { CustomerSearchQuery } from "../models/customer-search-query";
import { CustomerService } from "../../../../services/customer.service";
import { Customer } from "../../../../models/customer.model";
import {
  AlertService,
  MessageSeverity
} from "../../../../services/alert.service";
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
import { CommonService } from "../../../../services/common.service";
import { Currency } from "../../../../models/currency.model";
import { CurrencyService } from "../../../../services/currency.service";
import { EmployeeService } from "../../../../services/employee.service";
import { AuthService } from "../../../../services/auth.service";
import { Router } from "@angular/router";
import {
  getValueFromObjectByKey,
  getObjectById,
  editValueAssignByCondition,
  getObjectByValue
} from "../../../../generic/autocomplete";
import {
  NgbModal,
  NgbActiveModal,
  NgbModalRef,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";
import { CustomerViewComponent } from "../../../../shared/components/customer/customer-view/customer-view.component";
import { PartDetail } from "../../shared/models/part-detail";

@Component({
  selector: "app-sales-quote-create",
  templateUrl: "./sales-quote-create.component.html",
  styleUrls: ["./sales-quote-create.component.scss"]
})
export class SalesQuoteCreateComponent implements OnInit {
  query: CustomerSearchQuery;
  customers: Customer[];
  customerDetails: any;
  totalRecords: number = 0;
  totalPages: number = 0;
  showPaginator: boolean = false;
  customerId: number;
  salesQuote: ISalesQuote;
  salesOrderQuote: ISalesOrderQuote;
  salesOrderQuoteObj: ISalesOrderQuote;
  salesQuoteView: ISalesQuoteView;
  creditTerms: any[];
  percents: any[];
  allCurrencyInfo: any[];
  firstCollection: any[];
  allEmployeeinfo: any[] = [];
  customerNames: any[];
  allCustomer: any[];
  customerContactList: any[];
  customerWarningData: any = [];
  approvers: any[];
  accountTypes: any[];
  selectedParts: any[] = [];
  modal: NgbModalRef;
  errorModal: NgbModalRef;
  tempMemo: any;
  tempMemoLabel: any;
  customer: any = {
    customerName: "",
    customerCode: "",
    promisedDate: ""
  };
  salesQuoteForm: FormGroup;
  display: boolean = false;
  id: any;
  selectedApprovers: any[] = [];
  errorMessages: any[] = [];
  @ViewChild("errorMessagePop") public errorMessagePop: ElementRef;
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
    this.id = +this.route.snapshot.paramMap.get("id");
    console.log(`customer id: ${this.customerId}`);
    console.log(`customer id: ${this.id}`);

    this.salesQuoteService.resetSalesOrderQuote();
    this.salesQuoteService.getSalesOrderQuteInstance().subscribe(data => {
      this.salesOrderQuote = data;
    });
    this.salesQuoteService.getSalesOrderQuteApprovers().subscribe(data => {
      this.approvers = data;
      console.log(this.approvers);
    });
    this.salesQuoteService.getSelectedParts().subscribe(data => {
      this.selectedParts = data;
    });
    this.getCreditTerms();
    this.getPercents();
    this.getCurrencyData();
    this.getEmployeedata();
    this.getCustomerList();
    this.getAllCustomerContact();
    this.getCustomerWarningsData();
    this.getAccountTypes();

    if (this.id) this.getSalesQuoteInstance(this.id);
    else this.getNewSalesQuoteInstance(this.customerId);
  }
  get userName(): string {
    return this.authService.currentUser
      ? this.authService.currentUser.userName
      : "";
  }
  get userId() {
    console.log(this.authService.currentUser);
    return this.authService.currentUser ? this.authService.currentUser.id : 0;
  }

  getCreditTerms() {
    this.commonservice
      .smartDropDownList("CreditTerms", "CreditTermsId", "Name")
      .subscribe(res => {
        this.creditTerms = res;
        console.log(this.creditTerms);
      });
  }
  getPercents() {
    this.commonservice
      .smartDropDownList("[Percent]", "PercentId", "PercentValue")
      .subscribe(res => {
        this.percents = res;
      });
  }

  getAccountTypes() {
    this.customerService.getCustomerTypes().subscribe(res => {
      const responseData = res[0];
      this.accountTypes = responseData;
    });
  }
  async getCustomerWarningsData() {
    await this.customerService
      .getCustomerWarningsById(this.customerId)
      .subscribe(res => {
        this.customerWarningData = res;
      });
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

    const employeeListData = [
      ...this.allEmployeeinfo.filter(x => {
        return x.firstName.toLowerCase().includes(event.query.toLowerCase());
      })
    ];
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

      this.salesQuote.customerName = this.customerDetails.name;
      this.salesQuote.customerCode = this.customerDetails.customerCode;

      if (!this.id) {
        this.salesQuote.creditLimit = this.customerDetails.creditLimit;
        this.salesQuote.creditLimitTermsId = this.customerDetails.creditTermsId;
        this.salesQuote.contractReferenceName = this.customerDetails.contractReference;
        this.salesQuote.restrictPMA = this.customerDetails.restrictPMA;
        this.salesQuote.restrictDER = this.customerDetails.restrictBER;
        this.salesQuote.accountTypeId = this.customerDetails.customerTypeId;
        this.salesQuote.salesPersonName = getObjectById(
          "employeeId",
          this.customerDetails.primarySalesPersonId,
          this.allEmployeeinfo
        );
        // this.salesQuote.secondarySalesPersonId: getObjectById('employeeId', this.customerDetails.secondarySalesPersonId, this.employeeListOriginal),
        this.salesQuote.customerServiceRepName = getObjectById(
          "employeeId",
          this.customerDetails.csrId,
          this.allEmployeeinfo
        );
        this.salesQuote.agentName = getObjectById(
          "employeeId",
          this.customerDetails.saId,
          this.allEmployeeinfo
        );
        this.salesQuote.employeeName = getObjectById(
          "employeeId",
          this.userId,
          this.allEmployeeinfo
        );
      }

      this.alertService.stopLoadingMessage();
    });
  }
  getDefaultContact() {
    if (this.customerContactList) {
      if (this.customerContactList.length > 0) {
        for (let i = 0; i < this.customerContactList.length; i++) {
          let isDefaultContact = this.customerContactList[i].isDefaultContact;
          if (isDefaultContact) {
            this.salesQuote.customerContactId = this.customerContactList[
              i
            ].contactId;
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
    });
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
          this.salesQuote.customerServiceRepId = this.allEmployeeinfo[
            i
          ].employeeId;
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
          this.salesQuote.warningName = this.customerWarningData[
            i
          ].warningMessage;
        }
      }
    }
  }

  getApproverList(approvers) {
    if (this.allEmployeeinfo) {
      for (let i = 0; i < this.allEmployeeinfo.length; i++) {
        for (let j = 0; j < approvers.length; j++) {
          let employeeId = approvers[j].employeeId;
          if (employeeId == this.allEmployeeinfo[i].employeeId) {
            this.selectedApprovers.push(this.allEmployeeinfo[i]);
          }
        }
      }
    }
  }

  getSalesQuoteInstance(salesQuoteId: number) {
    this.alertService.startLoadingMessage();
    this.salesQuoteService.getSalesQuote(salesQuoteId).subscribe(data => {
      this.salesQuoteView = data && data.length ? data[0] : null;
      this.salesOrderQuoteObj = this.salesQuoteView.salesOrderQuote;
      // this.approvers = this.salesQuoteView.approverList;
      // this.salesQuoteService.updateApprovers(this.approvers);
      this.getApproverList(this.salesQuoteView.approverList);
      console.log(this.approvers);
      if (this.approvers.length > 0) {
        for (let i = 0; i < this.salesQuoteView.approverList.length; i++) {
          let level = this.salesQuoteView.approverList[i].level;
          switch (level) {
            case 1:
              this.approvers[0] = this.salesQuoteView.approverList[i];
              break;
            case 2:
              this.approvers[1] = this.salesQuoteView.approverList[i];
              break;
            case 3:
              this.approvers[2] = this.salesQuoteView.approverList[i];
              break;
            case 4:
              this.approvers[3] = this.salesQuoteView.approverList[i];
              break;
            case 5:
              this.approvers[4] = this.salesQuoteView.approverList[i];
              break;
          }
          // this.approvers[i].employeeId = this.salesQuoteView.approverList[i].employeeId;
        }
        console.log(this.approvers);
      }

      let partList: any[] = this.salesQuoteView.parts;

      for (let i = 0; i < partList.length; i++) {
        let selectedPart = partList[0];
        let partNumberObj = new PartDetail();
        partNumberObj.itemMasterId = selectedPart.itemMasterId;
        partNumberObj.stockLineId = selectedPart.stockLineId;
        partNumberObj.fixRate = selectedPart.fxRate;
        partNumberObj.quantityFromThis = selectedPart.qtyQuoted;

        partNumberObj.partNumber = selectedPart.partNumber;
        partNumberObj.description = selectedPart.partDescription;
        partNumberObj.stockLineNumber = selectedPart.stockLineNumber;
        if (selectedPart.isOEM) partNumberObj.pmaStatus = "ODA";
        if (selectedPart.isPMA) partNumberObj.pmaStatus = "PMA";
        if (selectedPart.isDER) partNumberObj.pmaStatus = "DER";
        partNumberObj.salesOrderQuotePartId =
          selectedPart.salesOrderQuotePartId;
        partNumberObj.salesPricePerUnit = selectedPart.unitSalePrice;
        partNumberObj.salesPriceExtended = selectedPart.salesBeforeDiscount;
        partNumberObj.salesDiscount = selectedPart.discount;
        partNumberObj.salesDiscountPerUnit = selectedPart.discountAmount;
        partNumberObj.netSalesPriceExtended = selectedPart.netSales;
        partNumberObj.masterCompanyId = selectedPart.masterCompanyId;
        partNumberObj.quantityFromThis = selectedPart.qtyQuoted;
        partNumberObj.markUpPercentage = selectedPart.markUpPercentage;
        partNumberObj.unitCostExtended =
          selectedPart.unitSalePrice * selectedPart.qtyQuoted;
        this.selectedParts.push(partNumberObj);
      }
      console.log(this.salesQuoteView);

      this.salesQuote.priorities = this.salesQuoteView.priorities;
      this.salesQuote.leadSources = this.salesQuoteView.leadSources;
      this.salesQuote.salesQuoteTypes = this.salesQuoteView.salesQuoteTypes;
      this.salesQuote.salesOrderQuoteId = this.salesOrderQuoteObj.salesOrderQuoteId;
      this.salesQuote.quoteTypeId = this.salesOrderQuoteObj.quoteTypeId;
      this.salesQuote.openDate = new Date(this.salesOrderQuoteObj.openDate);
      this.salesQuote.customerRequestDate = new Date(
        this.salesOrderQuoteObj.customerRequestDate
      );
      this.salesQuote.customerPromisedDate = new Date(
        this.salesOrderQuoteObj.promisedDate
      );
      this.salesQuote.estimatedShipDate = new Date(
        this.salesOrderQuoteObj.estimatedShipDate
      );
      this.salesQuote.validForDays = this.salesOrderQuoteObj.validForDays;
      this.salesQuote.quoteExpiryDate = new Date(
        this.salesOrderQuoteObj.quoteExpireDate
      );
      this.salesQuote.priorityId = this.salesOrderQuoteObj.priorityId;
      this.salesQuote.accountTypeId = this.salesOrderQuoteObj.accountTypeId;
      this.salesQuote.customerId = this.salesOrderQuoteObj.customerId;
      this.salesQuote.customerContactId = this.salesOrderQuoteObj.customerContactId;
      this.salesQuote.customerReferenceName = this.salesOrderQuoteObj.customerReference;
      this.salesQuote.contractReferenceName = this.salesOrderQuoteObj.contractReference;

      this.salesQuote.salesPersonName = getObjectById(
        "employeeId",
        this.salesOrderQuoteObj.salesPersonId,
        this.allEmployeeinfo
      );
      // this.salesQuote.secondarySalesPersonId: getObjectById('employeeId', this.customerDetails.secondarySalesPersonId, this.employeeListOriginal),
      this.salesQuote.customerServiceRepName = getObjectById(
        "employeeId",
        this.salesOrderQuoteObj.customerSeviceRepId,
        this.allEmployeeinfo
      );
      this.salesQuote.agentName = getObjectById(
        "employeeId",
        this.salesOrderQuoteObj.employeeId,
        this.allEmployeeinfo
      );
      this.salesQuote.employeeName = getObjectById(
        "employeeId",
        this.salesOrderQuoteObj.employeeId,
        this.allEmployeeinfo
      );

      this.salesOrderQuote.billToContactId = getObjectById(
        "customerId",
        this.salesOrderQuoteObj.billToContactId,
        this.allCustomer
      );
      this.salesOrderQuote.shipToContactId = getObjectById(
        "customerId",
        this.salesOrderQuoteObj.shipToContactId,
        this.allCustomer
      );

      this.salesOrderQuote.shipToSiteName = this.salesOrderQuoteObj.shipToSiteName;
      this.salesOrderQuote.shipToAddress1 = this.salesOrderQuoteObj.shipToAddress1;
      this.salesOrderQuote.shipToAddress2 = this.salesOrderQuoteObj.shipToAddress2;
      this.salesOrderQuote.shipToCity = this.salesOrderQuoteObj.shipToCity;
      this.salesOrderQuote.shipToState = this.salesOrderQuoteObj.shipToState;
      this.salesOrderQuote.shipToPostalCode = this.salesOrderQuoteObj.shipToPostalCode;
      this.salesOrderQuote.shipToCountry = this.salesOrderQuoteObj.shipToCountry;
      this.salesOrderQuote.shipViaName = this.salesOrderQuoteObj.shipViaName;
      this.salesOrderQuote.shipViaShippingAccountInfo = this.salesOrderQuoteObj.shipViaShippingAccountInfo;
      this.salesOrderQuote.shippingId = this.salesOrderQuoteObj.shippingId;
      this.salesOrderQuote.shippingURL = this.salesOrderQuoteObj.shippingURL;
      this.salesOrderQuote.shipViaMemo = this.salesOrderQuoteObj.shipViaMemo;
      this.salesOrderQuote.shipViaShippingURL = this.salesOrderQuoteObj.shipViaShippingURL;
      this.salesOrderQuote.billToSiteName = this.salesOrderQuoteObj.billToSiteName;
      this.salesOrderQuote.billToAddress1 = this.salesOrderQuoteObj.billToAddress1;

      this.salesOrderQuote.billToAddress2 = this.salesOrderQuoteObj.billToAddress2;
      this.salesOrderQuote.billToCity = this.salesOrderQuoteObj.billToCity;
      this.salesOrderQuote.billToState = this.salesOrderQuoteObj.billToState;
      this.salesOrderQuote.billToPostalCode = this.salesOrderQuoteObj.billToPostalCode;
      this.salesOrderQuote.billToCountry = this.salesOrderQuoteObj.billToCountry;
      this.salesOrderQuote.billToMemo = this.salesOrderQuoteObj.billToMemo;

      this.salesOrderQuote.salesOrderQuoteId = this.salesOrderQuoteObj.salesOrderQuoteId;

      this.salesQuote.probabilityId = this.salesOrderQuoteObj.probabilityId;
      this.salesQuote.leadSourceId = this.salesOrderQuoteObj.leadSourceId;
      this.salesQuote.creditLimit = this.salesOrderQuoteObj.creditLimit;
      this.salesQuote.creditLimitTermsId = this.salesOrderQuoteObj.creditTermId;
      this.salesQuote.restrictPMA = this.salesOrderQuoteObj.restrictPMA;
      this.salesQuote.restrictDER = this.salesOrderQuoteObj.restrictDER;
      if (this.salesOrderQuoteObj.approvedDate)
        this.salesQuote.approvedDate = new Date(
          this.salesOrderQuoteObj.approvedDate
        );
      this.salesQuote.currencyId = this.salesOrderQuoteObj.currencyId;
      this.salesQuote.warningId = this.salesOrderQuoteObj.customerWarningId;
      this.salesQuote.memo = this.salesOrderQuoteObj.memo;
      this.salesQuote.notes = this.salesOrderQuoteObj.notes;

      this.getCustomerDetails();

      //this.getDefaultContact();
      console.log(this.salesQuote);
      /* this.customer = {
        customerName: this.salesQuote.customerName,
        customerCode: this.salesQuote.customerCode,
        promisedDate: this.salesQuote.customerPromisedDate
      };*/
      this.alertService.stopLoadingMessage();
    });
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
        /* this.customer = {
          customerName: this.salesQuote.customerName,
          customerCode: this.salesQuote.customerCode,
          promisedDate: this.salesQuote.customerPromisedDate
        };*/
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
    this.modal = this.modalService.open(CustomerViewComponent, { size: "lg" });
    this.modal.componentInstance.customerId = this.customerId;
    this.modal.result.then(
      () => {
        console.log("When user closes");
      },
      () => {
        console.log("Backdrop click");
      }
    );
  }
  onAddDescription(value) {
    this.tempMemo = "";
    if (value == "notes") {
      this.tempMemoLabel = "Notes";
      this.tempMemo = this.salesQuote.notes;
    }
    if (value == "memo") {
      this.tempMemoLabel = "Memo";
      this.tempMemo = this.salesQuote.memo;
    }
  }

  onSaveDescription() {
    if (this.tempMemoLabel == "Notes") {
      this.salesQuote.notes = this.tempMemo;
    }
    if (this.tempMemoLabel == "Memo") {
      this.salesQuote.memo = this.tempMemo;
    }
  }

  closeErrorMessage() {
    // this.isDeleteMode = false;

    this.errorModal.close();
  }

  onSubmit() {
    //##TODO call below service to create sales quote
    //this.salesQuoteService.create
    //input parameter: ISalesQuoteView
    console.log(this.salesQuote);
    console.log(this.salesOrderQuote);
    this.errorMessages = [];
    let haveError = false;
    if (this.salesQuote.quoteTypeId < 0) {
      this.errorMessages.push("Please select Quote Type");
      haveError = true;
    }
    if (!this.salesQuote.openDate) {
      this.errorMessages.push("Please select Open Date");
      haveError = true;
    }
    if (!this.salesQuote.customerRequestDate) {
      this.errorMessages.push("Please select Customer Request Date");
      haveError = true;
    }
    if (!this.salesQuote.customerPromisedDate) {
      this.errorMessages.push("Please select Customer Promised Date");
      haveError = true;
    }
    if (!this.salesQuote.estimatedShipDate) {
      this.errorMessages.push("Please select Estimated ShipDate");
      haveError = true;
    }
    if (this.salesQuote.validForDays < 1) {
      this.errorMessages.push("Please enter Valid For (Days)");
      haveError = true;
    }
    if (!this.salesQuote.quoteExpiryDate) {
      this.errorMessages.push("Please select Quote Expiry Date");
      haveError = true;
    }
    if (this.salesQuote.priorityId < 0) {
      this.errorMessages.push("Please select Priority Type");
      haveError = true;
    }
    if (this.salesQuote.accountTypeId < 0) {
      this.errorMessages.push("Please select Account Type");
      haveError = true;
    }
    if (this.salesQuote.customerContactId < 0) {
      this.errorMessages.push("Please select Customer Contact");
      haveError = true;
    }
    if (!this.salesQuote.customerReferenceName) {
      this.errorMessages.push("Please enter Customer Reference Name");
      haveError = true;
    }
    if (!this.salesQuote.employeeName) {
      this.errorMessages.push("Please select employee");
      haveError = true;
    }
    if (this.salesQuote.currencyId < 0) {
      this.errorMessages.push("Please select currency");
      haveError = true;
    }

    if (!this.salesOrderQuote.shipToSiteName) {
      this.errorMessages.push("Please select Ship To SiteName");
      haveError = true;
    }
    if (!this.salesOrderQuote.shipToContactId) {
      this.errorMessages.push("Please select Ship To Contact");
      haveError = true;
    }
    if (!this.salesOrderQuote.billToSiteName) {
      this.errorMessages.push("Please select Bill To SiteName");
      haveError = true;
    }
    if (!this.salesOrderQuote.billToContactId) {
      this.errorMessages.push("Please select Bill To Contact");
      haveError = true;
    }

    if (haveError) {
      let content = this.errorMessagePop;
      this.errorModal = this.modalService.open(content, { size: "sm" });
      this.errorModal.result.then(
        () => {
          console.log("When user closes");
        },
        () => {
          console.log("Backdrop click");
        }
      );
      this.display = true;
    } else {
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
      this.salesOrderQuote.salesPersonId = editValueAssignByCondition(
        "employeeId",
        this.salesQuote.salesPersonName
      );
      this.salesOrderQuote.agentName = editValueAssignByCondition(
        "firstName",
        this.salesQuote.agentName
      );
      this.salesOrderQuote.customerSeviceRepId = editValueAssignByCondition(
        "employeeId",
        this.salesQuote.customerServiceRepName
      );

      this.salesOrderQuote.probabilityId = this.salesQuote.probabilityId;
      this.salesOrderQuote.employeeId = editValueAssignByCondition(
        "employeeId",
        this.salesQuote.employeeName
      );
      this.salesOrderQuote.billToContactName = editValueAssignByCondition(
        "name",
        this.salesOrderQuote.billToContactId
      );
      this.salesOrderQuote.billToContactId = editValueAssignByCondition(
        "customerId",
        this.salesOrderQuote.billToContactId
      );
      this.salesOrderQuote.shipToContactName = editValueAssignByCondition(
        "name",
        this.salesOrderQuote.shipToContactId
      );
      this.salesOrderQuote.shipToContactId = editValueAssignByCondition(
        "customerId",
        this.salesOrderQuote.shipToContactId
      );
      this.salesOrderQuote.leadSourceId = this.salesQuote.leadSourceId;
      this.salesOrderQuote.creditLimit = this.salesQuote.creditLimit;
      this.salesOrderQuote.creditTermId = this.salesQuote.creditLimitTermsId;
      this.salesOrderQuote.restrictPMA = this.salesQuote.restrictPMA;
      this.salesOrderQuote.restrictDER = this.salesQuote.restrictDER;
      if (this.salesQuote.approvedDate)
        this.salesOrderQuote.approvedDate = this.salesQuote.approvedDate.toDateString();
      this.salesOrderQuote.currencyId = this.salesQuote.currencyId;
      this.salesOrderQuote.customerWarningId = this.salesQuote.warningId;
      this.salesOrderQuote.memo = this.salesQuote.memo;
      this.salesOrderQuote.notes = this.salesQuote.notes;
      this.salesOrderQuote.createdBy = this.userName;
      this.salesOrderQuote.updatedBy = this.userName;
      this.salesOrderQuote.createdOn = new Date().toDateString();
      this.salesOrderQuote.updatedOn = new Date().toDateString();
      this.salesQuoteView = new SalesQuoteView();
      this.salesQuoteView.salesOrderQuote = this.salesOrderQuote;
      this.salesQuoteView.approverList = this.approvers;
      console.log(this.approvers);

      let partList: any = [];

      for (let i = 0; i < this.selectedParts.length; i++) {
        let selectedPart = this.selectedParts[i];
        let partNumberObj = new SalesOrderQuotePart();
        partNumberObj.salesOrderQuotePartId =
          selectedPart.salesOrderQuotePartId;
        partNumberObj.itemMasterId = selectedPart.itemMasterId;
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
        partNumberObj.createdBy = this.userName;
        partNumberObj.updatedBy = this.userName;
        partNumberObj.createdOn = new Date().toDateString();
        partNumberObj.updatedOn = new Date().toDateString();
        partNumberObj.unitCost = selectedPart.unitCostPerUnit;
        partNumberObj.methodType =
          selectedPart.method === "Stock Line" ? "S" : "I";
        partList.push(partNumberObj);
        partNumberObj.salesPriceExtended = selectedPart.salesPriceExtended;
        partNumberObj.markupExtended = selectedPart.markupExtended;
        partNumberObj.salesDiscountExtended = selectedPart.salesDiscount;
        partNumberObj.netSalePriceExtended = selectedPart.netSalePriceExtended;
        partNumberObj.unitCostExtended = selectedPart.unitCostExtended;
        partNumberObj.marginAmount = selectedPart.marginAmount;
        partNumberObj.marginAmountExtended = selectedPart.marginAmountExtended;
        partNumberObj.marginPercentage = selectedPart.marginPercentage;
      }
      this.salesQuoteView.parts = partList;

      if (this.id) {
        this.salesQuoteService.update(this.salesQuoteView).subscribe(data => {
          console.log(data);
          this.alertService.stopLoadingMessage();
          this.alertService.showMessage(
            "Success",
            `Quote updated successfully.`,
            MessageSeverity.success
          );
          this.router.navigateByUrl(`salesmodule/salespages/sales-quote-list`);
        });
      } else {
        this.salesQuoteService.create(this.salesQuoteView).subscribe(data => {
          console.log(data);
          this.alertService.stopLoadingMessage();
          this.alertService.showMessage(
            "Success",
            `Quote created successfully.`,
            MessageSeverity.success
          );
          this.router.navigateByUrl(`salesmodule/salespages/sales-quote-list`);
        });
      }

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
