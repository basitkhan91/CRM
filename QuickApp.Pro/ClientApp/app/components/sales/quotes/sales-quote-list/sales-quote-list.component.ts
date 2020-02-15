import { Component, OnInit, ViewChild } from "@angular/core";
import * as $ from "jquery";
import { SalesQuoteService } from "../../../../services/salesquote.service";
import { ISalesSearchParameters } from "../../../../models/sales/ISalesSearchParameters";
import { SalesSearchParameters } from "../../../../models/sales/SalesSearchParameters";
import {
  AlertService,
  DialogType,
  MessageSeverity
} from "../../../../services/alert.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { ISalesQuote } from "../../../../models/sales/ISalesQuote.model";
import { SalesQuote } from "../../../../models/sales/SalesQuote.model";
import { ISalesOrderQuote } from "../../../../models/sales/ISalesOrderQuote";
import { ISalesQuoteView } from "../../../../models/sales/ISalesQuoteView";
import { SalesQuoteView } from "../../../../models/sales/SalesQuoteView";
import { SalesOrderQuotePart } from "../../../../models/sales/SalesOrderQuotePart";
import { SalesOrderQuote } from "../../../../models/sales/SalesOrderQuote";
import { Currency } from "../../../../models/currency.model";
import { CurrencyService } from "../../../../services/currency.service";
import { EmployeeService } from "../../../../services/employee.service";
import { CustomerService } from "../../../../services/customer.service";
import { CommonService } from "../../../../services/common.service";
import { AuthService } from "../../../../services/auth.service";
import { PartDetail } from "../../shared/models/part-detail";
import { listSearchFilterObjectCreation } from "../../../../generic/autocomplete";
import { StocklineViewComponent } from '../../../../shared/components/stockline/stockline-view/stockline-view.component';
import {
  getValueFromObjectByKey,
  getObjectById,
  editValueAssignByCondition,
  getObjectByValue
} from "../../../../generic/autocomplete";

@Component({
  selector: "app-sales-quote-list",
  templateUrl: "./sales-quote-list.component.html",
  styleUrls: ["./sales-quote-list.component.css"]
})
export class SalesQuoteListComponent implements OnInit {
  @ViewChild("dt")
  searchParameters: ISalesSearchParameters;
  sales: any[];
  selected: any;
  modal: NgbModalRef;
  partModal: NgbModalRef;
  headers:any[];
  columns: any[];
  selectedColumns:any[];
  selectedColumn:any[];
  totalRecords: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  first = 0;
  showPaginator: boolean = false;

  partColumns: any[];

  customerDetails: any;
  salesQuote: ISalesQuote;
  salesOrderQuote: ISalesOrderQuote;
  salesQuoteView: ISalesQuoteView;
  selectedParts: any[] = [];
  creditTerms: any[];
  percents: any[];
  allCurrencyInfo: any[];
  allEmployeeinfo: any[] = [];
  customerWarningData: any = [];
  accountTypes: any[];
  approvers: any[];

  constructor(
    private salesQuoteService: SalesQuoteService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private router: Router,
    private customerService: CustomerService,
    public employeeService: EmployeeService,
    private commonservice: CommonService,
    public currencyService: CurrencyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.salesQuote = new SalesQuote();
    this.salesOrderQuote = new SalesOrderQuote();
    this.searchParameters = new SalesSearchParameters();
    this.initColumns();
    this.getCreditTerms();
    this.getPercents();
    this.getCurrencyData();
    this.getEmployeedata();

    this.getAccountTypes();
    this.initPartColumns();
    this.onSearch();
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

  initColumns() {
    this.headers = [
      { field: "salesQuoteId", header: "Quote number", width: "200px" },
      { field: "quoteDate", header: "Quote Date", width: "200px" },
      { field: "versionNumber", header: "Version Number", width: "200px" },
      { field: "customerName", header: "Customer Name", width: "200px" },
      { field: "customerCode", header: "Customer Code", width: "200px" },
      { field: "status", header: "Status", width: "100px" },
      { field: "salesPrice", header: "Sales Price", width: "200px" },
      { field: "cost", header: "Cost", width: "200px" },
      { field: "numberOfItems", header: "numberOfItems", width: "200px" },
     // { field: "", header: "actions", width: "100px" }
    ];
    this.selectedColumns = this.headers;
  }

  initPartColumns() {
    this.partColumns = [
      { field: "partNumber", header: "PartNumber", width: "200px" },
      { field: "description", header: "Description", width: "200px" },
      { field: "stockLineNumber", header: "Stock Line Number", width: "200px" },
      { field: "method", header: "Method", width: "200px" },
      { field: "serialNumber", header: "Serial Number", width: "200px" },
      { field: "stockLineId", header: "STOCK LINE NUM", width: "200px" },
      { field: "idNumber", header: "ID NUM", width: "200px" },
      { field: "pmaStatus", header: "OEM/PMA/DE", width: "200px" },
      { field: "conditionType", header: "COND TYPE", width: "200px" },
      { field: "currency", header: "Currency", width: "200px" },
      { field: "fixRate", header: "fx Rate", width: "200px" },
      { field: "quantityFromThis", header: "QTY QUOTED", width: "200px" },
      { field: "salesPricePerUnit", header: "UNIT SALE PRICE", width: "200px" },
      { field: "markUpPercentage", header: "MARK UP %", width: "200px" },
      { field: "markupExtended", header: "MARK UP AMOUNT", width: "200px" },
      { field: "salesDiscount", header: "DISCOUNT %", width: "200px" },
      { field: "salesDiscountPerUnit", header: "DISC AMOUNT", width: "200px" },
      { field: "netSalesPriceExtended", header: "NET SALES", width: "200px" },
      { field: "unitCostPerUnit", header: "UNIT COST", width: "200px" },
      { field: "unitCostExtended", header: "EXTENDED COST", width: "200px" },
      { field: "marginAmountExtended", header: "MARGIN ($)", width: "200px" },
      {
        field: "marginPercentageExtended",
        header: "MARGIN (%)",
        width: "200px"
      }
    ];
  }

  loadData(event) {
    this.searchParameters.first = event.first;
    this.searchParameters.rows = event.rows;
    this.searchParameters.sortOrder = event.sortOrder;
    this.searchParameters.sortField = event.sortField;
    this.searchParameters.columnFilters = listSearchFilterObjectCreation(
      event.filters
    );
    this.onSearch();
  }

  onSearch() {
    this.alertService.startLoadingMessage();
    this.salesQuoteService
      .search(this.searchParameters)
      .subscribe((response: any) => {
        this.sales = response[0].data;
        this.totalRecords = response[0].totalRecordsCount;
        this.totalRecords = response[0].totalRecordsCount;
        this.totalPages = Math.ceil(
          this.totalRecords / this.searchParameters.rows
        );
        this.showPaginator = this.totalRecords > 0;
        this.alertService.stopLoadingMessage();
      });
  }

  dismissModel() {
    this.modal.close();
  }
  dismissViewModel() {
    this.modal.close();
  }
  dismissPartViewModel() {
    this.partModal.close();
  }

  openDelete(content, rowData) {
    this.selected = rowData.salesQuoteId;
    this.modal = this.modalService.open(content, { size: "sm" });
    this.modal.result.then(
      () => {
        console.log("When user closes");
      },
      () => {
        console.log("Backdrop click");
      }
    );
  }

  deleteQuote(): void {
    this.salesQuoteService.delete(this.selected).subscribe(response => {
      this.modal.close();
      this.alertService.showMessage(
        "Success",
        `Quote removed successfully.`,
        MessageSeverity.success
      );
      this.onSearch();
    });
  }

  openQuoteToEdit(row) {
    const { salesQuoteId } = row;
    let customerId = row.customerId;
    console.log(row);
    this.router.navigateByUrl(
      `salesmodule/salespages/sales-quote-edit/${customerId}/${salesQuoteId}`
    );
  }

  viewSelectedRow(content, row) {
    const { salesQuoteId } = row;
    let customerId = row.customerId;
    this.salesQuote = new SalesQuote();
    this.salesOrderQuote = new SalesOrderQuote();
    this.selectedParts = [];
    this.getCustomerWarningsData(customerId);
    this.getSalesQuoteInstance(salesQuoteId, customerId);
    this.modal = this.modalService.open(content, { size: "lg" });
    this.modal.result.then(
      () => {
        console.log("When user closes");
      },
      () => {
        console.log("Backdrop click");
      }
    );
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

  async getCustomerWarningsData(customerId) {
    await this.customerService
      .getCustomerWarningsById(customerId)
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

  private onDataLoadFailed(error: any) {
    // alert(error);
  }

  private onempDataLoadSuccessful(getEmployeeCerficationList: any[]) {
    this.allEmployeeinfo = getEmployeeCerficationList;
  }

  getSalesQuoteInstance(salesQuoteId: number, customerId: number) {
    this.alertService.startLoadingMessage();
    
    this.salesQuoteService.getSalesQuote(salesQuoteId).subscribe(data => {
      this.salesQuoteView = data && data.length ? data[0] : null;
      this.salesOrderQuote = this.salesQuoteView.salesOrderQuote;
      this.approvers = this.salesQuoteView.approverList;
      let partList: any[] = this.salesQuoteView.parts;

      for (let i = 0; i < partList.length; i++) {
        let selectedPart = partList[0];
        let partNumberObj = new PartDetail();
        partNumberObj.itemMasterId = selectedPart.itemMasterId;
        partNumberObj.stockLineId = selectedPart.stockLineId;
        partNumberObj.fixRate = selectedPart.fxRate;
        partNumberObj.quantityFromThis = selectedPart.qtyQuoted;
        partNumberObj.conditionId = selectedPart.conditionId;
        partNumberObj.conditionDescription = selectedPart.conditionDescription;
        partNumberObj.currencyId = selectedPart.currencyId;
        partNumberObj.currencyDescription = selectedPart.currencyDescription;

        partNumberObj.partNumber = selectedPart.partNumber;
        partNumberObj.description = selectedPart.partDescription;
        partNumberObj.stockLineNumber = selectedPart.stockLineNumber;
        if (selectedPart.isOEM) partNumberObj.pmaStatus = "ODA";
        if (selectedPart.isPMA) partNumberObj.pmaStatus = "PMA";
        if (selectedPart.isDER) partNumberObj.pmaStatus = "DER";

        partNumberObj.salesPricePerUnit = selectedPart.unitSalePrice;
        partNumberObj.salesPriceExtended = selectedPart.salesBeforeDiscount;
        partNumberObj.salesDiscount = selectedPart.discount;
        partNumberObj.salesDiscountPerUnit = selectedPart.discountAmount;
        partNumberObj.netSalesPriceExtended = selectedPart.netSales;
        partNumberObj.masterCompanyId = selectedPart.masterCompanyId;
        partNumberObj.quantityFromThis = selectedPart.qtyQuoted;
        partNumberObj.markUpPercentage = selectedPart.markUpPercentage;
        
        partNumberObj.markupExtended = selectedPart.markupExtended;
        partNumberObj.method = selectedPart.method;
        partNumberObj.methodType = selectedPart.methodType;
        partNumberObj.serialNumber = selectedPart.serialNumber;
        partNumberObj.marginAmountExtended = selectedPart.marginAmountExtended;
        partNumberObj.marginPercentagePerUnit = selectedPart.marginPercentage;
        partNumberObj.markupExtended = selectedPart.markupExtended;
        partNumberObj.unitCostPerUnit = selectedPart.unitCost;
        partNumberObj.unitCostExtended = selectedPart.unitCostExtended;
        this.selectedParts.push(partNumberObj);
      }
     // console.log(this.salesQuoteView);

      this.salesQuote.priorities = this.salesQuoteView.priorities;
      this.salesQuote.leadSources = this.salesQuoteView.leadSources;
      this.salesQuote.salesQuoteTypes = this.salesQuoteView.salesQuoteTypes;
      this.salesQuote.salesOrderQuoteId = this.salesOrderQuote.salesOrderQuoteId;
      this.salesQuote.quoteTypeId = this.salesOrderQuote.quoteTypeId;
      this.salesQuote.openDate = new Date(this.salesOrderQuote.openDate);
      this.salesQuote.customerRequestDate = new Date(
        this.salesOrderQuote.customerRequestDate
      );
      this.salesQuote.customerPromisedDate = new Date(
        this.salesOrderQuote.promisedDate
      );
      this.salesQuote.estimatedShipDate = new Date(
        this.salesOrderQuote.estimatedShipDate
      );
      this.salesQuote.validForDays = this.salesOrderQuote.validForDays;
      this.salesQuote.quoteExpiryDate = new Date(
        this.salesOrderQuote.quoteExpireDate
      );
      this.salesQuote.priorityId = this.salesOrderQuote.priorityId;
      this.salesQuote.accountTypeId = this.salesOrderQuote.accountTypeId;
      this.salesQuote.customerId = this.salesOrderQuote.customerId;
      this.salesQuote.customerContactId = this.salesOrderQuote.customerContactId;
      this.salesQuote.customerReferenceName = this.salesOrderQuote.customerReference;
      this.salesQuote.contractReferenceName = this.salesOrderQuote.contractReference;

      this.salesQuote.salesPersonName = getObjectById(
        "employeeId",
        this.salesOrderQuote.salesPersonId,
        this.allEmployeeinfo
      );
      // this.salesQuote.secondarySalesPersonId: getObjectById('employeeId', this.customerDetails.secondarySalesPersonId, this.employeeListOriginal),
      this.salesQuote.customerServiceRepName = getObjectById(
        "employeeId",
        this.salesOrderQuote.customerSeviceRepId,
        this.allEmployeeinfo
      );
      this.salesQuote.agentName = getObjectById(
        "employeeId",
        this.salesOrderQuote.employeeId,
        this.allEmployeeinfo
      );
      this.salesQuote.employeeName = getObjectById(
        "employeeId",
        this.salesOrderQuote.employeeId,
        this.allEmployeeinfo
      );

      this.salesOrderQuote.billToContactId = getObjectById(
        "customerId",
        this.salesOrderQuote.billToContactId,
        this.allEmployeeinfo
      );
      this.salesOrderQuote.shipToContactId = getObjectById(
        "customerId",
        this.salesOrderQuote.shipToContactId,
        this.allEmployeeinfo
      );

      this.salesQuote.probabilityId = this.salesOrderQuote.probabilityId;
      this.salesQuote.leadSourceId = this.salesOrderQuote.leadSourceId;
      this.salesQuote.creditLimit = this.salesOrderQuote.creditLimit;
      this.salesQuote.creditLimitTermsId = this.salesOrderQuote.creditTermId;
      this.salesQuote.restrictPMA = this.salesOrderQuote.restrictPMA;
      this.salesQuote.restrictDER = this.salesOrderQuote.restrictDER;
      if (this.salesOrderQuote.approvedDate)
        this.salesQuote.approvedDate = new Date(
          this.salesOrderQuote.approvedDate
        );
      this.salesQuote.currencyId = this.salesOrderQuote.currencyId;
      this.salesQuote.warningId = this.salesOrderQuote.customerWarningId;
      this.salesQuote.memo = this.salesOrderQuote.memo;
      this.salesQuote.notes = this.salesOrderQuote.notes;

      this.getCustomerDetails(customerId);

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
  getCustomerDetails(customerId) {
    this.alertService.startLoadingMessage();
    this.customerService.getCustomerdataById(customerId).subscribe(res => {
      this.customerDetails = res[0];
      console.log(this.customerDetails);

      this.salesQuote.customerName = this.customerDetails.name;
      this.salesQuote.customerCode = this.customerDetails.customerCode;

      this.alertService.stopLoadingMessage();
    });
  }
  viewSelectedStockLine(rowData) {
   
    console.log(rowData);
    this.partModal = this.modalService.open(StocklineViewComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    this.partModal.componentInstance.stockLineId = rowData.stockLineId;
    this.partModal.result.then(() => {
        console.log('When user closes');
    }, () => { console.log('Backdrop click') })

}


}
