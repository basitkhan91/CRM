import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { ISalesQuote } from "../../../../../models/sales/ISalesQuote.model";
import { IPartJson } from "../../models/ipart-json";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PartDetail } from "../../models/part-detail";
import { AddSalesPartNumberComponent } from "../add-sales-part-number/add-sales-part-number.component";
import { SalesQuoteService } from "../../../../../services/salesquote.service";
import { ItemMasterSearchQuery } from "../../../quotes/models/item-master-search-query";
import {
  AlertService,
  DialogType,
  MessageSeverity
} from "../../../../../services/alert.service";
@Component({
  selector: "app-sales-part-number",
  templateUrl: "./sales-part-number.component.html",
  styleUrls: ["./sales-part-number.component.css"]
})
export class SalesPartNumberComponent {
  show: boolean;
  addPartModal: NgbModalRef;
  deletePartModal: NgbModalRef;
  salesMarginModal: NgbModalRef;

  part: PartDetail;
  selectedPart: IPartJson;
  selectedParts: any[] = [];
  columns: any[];
  @ViewChild("addPart") addPart: ElementRef;
  @ViewChild("salesMargin") salesMargin: ElementRef;
  @Input() customer: any;
  @Input() salesQuote: ISalesQuote;
  query: ItemMasterSearchQuery;
  isEdit:boolean=false;
  constructor(
    private modalService: NgbModal,
    private salesQuoteService: SalesQuoteService,
    private alertService: AlertService
  ) {
    this.show = false;
    this.part = new PartDetail();
  }

  /*addPartNumber(value) {
    this.show = true;
  }
  */

  ngOnInit() {
    this.salesQuoteService.getSearchPartObject().subscribe(data => {
      this.query = data;
    });
    this.salesQuoteService.getSelectedParts().subscribe(data => {
      this.selectedParts = data;
    });
    this.columns = [];
    this.initColumns();
  }

  initColumns() {
    this.columns = [
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
      { field: "marginPercentageExtended", header: "MARGIN (%)", width: "200px" },
      { field: "", header: "Actions", width: "100px" }
    ];
  }

  onClose(event) {
    this.show = false;
    this.addPartModal.close();
    console.log("close event");
  }

  onCloseMargin(event) {
    this.show = false;
    this.salesMarginModal.close();
    console.log("close event");
    if(!this.isEdit){
      this.selectedPart.selected = false;
      this.openPartNumber();
    }
  }
  onClosePartDelete(event) {
   
    this.deletePartModal.close();
   
  }
 

  addPartNumber() {
    this.salesQuoteService.resetSearchPart();
    //this.salesQuoteService.getSearchPartResult();
    this.openPartNumber();
  }
  openPartNumber() {
    console.log(this.salesQuote);
    let contentPart = this.addPart;
    this.addPartModal = this.modalService.open(contentPart, { size: "lg", backdrop: 'static', keyboard: false });
    this.addPartModal.result.then(
      () => { },
      () => { }
    );
  }
  openSalesMargin(event) {
    console.log(event);
    console.log(this.salesQuote);
    this.isEdit = false;
    let contentMargin = this.salesMargin;
    this.selectedPart = event.part;
    let checked = event.checked;
    if (this.selectedPart) {
      if (checked) {
        this.salesQuoteService.getSearchPartObject().subscribe(data => {
          this.query = data;
          this.part = new PartDetail();
          this.part.partNumber = this.selectedPart.partNumber;
          this.part.stockLineNumber = this.selectedPart.stockLineNumber;
          this.part.salesPricePerUnit = +this.selectedPart.unitCost;
          this.part.unitCostPerUnit = +this.selectedPart.unitCost;
          this.part.itemClassification = this.selectedPart.itemClassification;
          this.part.description = this.selectedPart.description;
          this.part.itemMasterId = this.selectedPart.itemId;
          this.part.stockLineId = this.selectedPart.stockLineId;
          this.part.idNumber = this.selectedPart.idNumber;
          this.part.method = this.selectedPart.method;
          this.part.serialNumber = this.selectedPart.serialNumber;
          //this.part.pmaStatus = "OEM";
          if (this.selectedPart.isOEM) this.part.pmaStatus = "ODA";
          if (this.selectedPart.isPMA) this.part.pmaStatus = "PMA";
          if (this.selectedPart.isDER) this.part.pmaStatus = "DER";
          this.part.masterCompanyId = this.selectedPart.itemClassification.masterCompanyId;
          this.part.conditionId = this.selectedPart.conditionId;
          this.part.conditionDescription = this.selectedPart.conditionDescription;
          this.part.currencyId = this.selectedPart.currencyId;
          this.part.currencyDescription = this.selectedPart.currencyDescription;
          this.part.currency = this.selectedPart.currency;
          this.part.salesDiscount = 0;
         // this.part.unitCostPerUnit = 0;
          this.part.markupPerUnit = 0;
         // this.part.salesPricePerUnit = 0;
          this.part.markUpPercentage = 0;
          this.part.salesDiscount = 0;
          this.part.quantityRequested = this.query.partSearchParamters.quantityRequested;
          this.part.quantityToBeQuoted = this.query.partSearchParamters.quantityToQuote;
          this.part.quantityFromThis = this.query.partSearchParamters.quantityToQuote;
          this.part.quantityAlreadyQuoted = this.query.partSearchParamters.quantityAlreadyQuoted;
        });
        this.addPartModal.close();
        this.salesMarginModal = this.modalService.open(contentMargin, { size: "lg", backdrop: 'static', keyboard: false });
        this.salesMarginModal.result.then(
          () => { },
          () => { 
            this.selectedPart.selected = false;
          }
        );
      } else {
        this.removePartNamber(this.selectedPart);
      }
    }
  }
  openSalesMarginSave(event) {
    console.log(event);
    // if(!this.checkForDuplicates(event)){
    this.salesQuoteService.getSearchPartObject().subscribe(data => {
      this.query = data;
      this.query.partSearchParamters.quantityAlreadyQuoted =
        this.query.partSearchParamters.quantityAlreadyQuoted +
        event.quantityFromThis;
      this.query.partSearchParamters.quantityToQuote =
        this.query.partSearchParamters.quantityRequested -
        this.query.partSearchParamters.quantityAlreadyQuoted;
    });
    this.salesQuoteService.updateSearchPartObject(this.query);

    let partObj = { ...this.part };

   
    
    if(!this.isEdit){
      this.openPartNumber();
      this.selectedParts.push(partObj);
    }
    this.salesMarginModal.close();
   
   
    console.log(this.query);
    console.log(this.selectedParts);
    // }
  }
  openPartToEdit(part) {
    this.isEdit = true;
    let contentPartEdit = this.salesMargin;
    this.part = part;
    if (this.part) {
      this.salesQuoteService.getSearchPartObject().subscribe(data => {
        this.query = data;
        this.part = part;
        this.part.quantityRequested = this.query.partSearchParamters.quantityRequested;
        this.part.quantityToBeQuoted = this.query.partSearchParamters.quantityToQuote;
        this.part.quantityAlreadyQuoted = this.query.partSearchParamters.quantityAlreadyQuoted;
      });
     // this.addPartModal.close();
      this.salesMarginModal = this.modalService.open(contentPartEdit, { size: "lg", backdrop: 'static', keyboard: false });
      this.salesMarginModal.result.then(
        () => {},
        () => { }
      );
    }
  }
  openPartDelete(contentPartDelete, part) {
    this.part = part;
    this.deletePartModal = this.modalService.open(contentPartDelete, { size: "sm", backdrop: 'static', keyboard: false });
    this.deletePartModal.result.then(
      () => { },
      () => { }
    );
  }
  deletePart(): void {


    if(this.part.salesOrderQuotePartId){
      this.salesQuoteService.deletePart(this.part.salesOrderQuotePartId).subscribe(response => {
        this.removePartNamber(this.part);
        this.deletePartModal.close();
        this.alertService.showMessage(
          "Success",
          `Part removed successfully.`,
          MessageSeverity.success
        );
       
      });
    }else{
      this.removePartNamber(this.part);
      this.deletePartModal.close();
      this.alertService.showMessage(
        "Success",
        `Part removed successfully.`,
        MessageSeverity.success
      );
    }

  }

  checkForDuplicates(selectedPart) {
    let selectedPartNamber = selectedPart.partNumber;
    let selectedStockLineNumber = selectedPart.stockLineNumber;
    console.log(selectedPart);
    console.log(this.selectedParts);
    for (let i = 0; i < this.selectedParts.length; i++) {
      let partNumber = this.selectedParts[i].partNumber;
      let stockLineNumber = this.selectedParts[i].stockLineNumber;
      console.log(partNumber);
      console.log(stockLineNumber);
      if (
        partNumber == selectedPartNamber &&
        stockLineNumber == selectedStockLineNumber
      ) {
        return true;
      }
      return false;
    }
  }
  removePartNamber(selectedPart) {
    let selectedPartNamber = selectedPart.partNumber;
    let selectedStockLineNumber = selectedPart.stockLineNumber;
    for (let i = 0; i < this.selectedParts.length; i++) {
      let partNumber = this.selectedParts[i].partNumber;
      let stockLineNumber = this.selectedParts[i].stockLineNumber;
      //console.log(partNumber);
      if (
        partNumber == selectedPartNamber &&
        stockLineNumber == selectedStockLineNumber
      ) {
        this.selectedParts.splice(i, 1);
      }
    }
    console.log(this.selectedParts);
  }

 
}
