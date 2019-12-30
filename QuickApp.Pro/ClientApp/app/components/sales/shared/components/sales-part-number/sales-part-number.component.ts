import { Component, Input,ViewChild,ElementRef  } from "@angular/core";
import { ISalesQuote } from "../../../../../models/sales/ISalesQuote.model";
import { IPartJson } from "../../models/ipart-json";
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartDetail } from "../../models/part-detail";
import { AddSalesPartNumberComponent } from '../add-sales-part-number/add-sales-part-number.component';
import { SalesQuoteService } from "../../../../../services/salesquote.service";
import { ItemMasterSearchQuery } from "../../../quotes/models/item-master-search-query";
@Component({
  selector: "app-sales-part-number",
  templateUrl: "./sales-part-number.component.html",
  styleUrls: ["./sales-part-number.component.css"]
})
export class SalesPartNumberComponent {
  show: boolean;
  addPartModal: NgbModalRef;
  salesMarginModal: NgbModalRef;
  part: PartDetail;
  selectedPart:IPartJson;
  selectedParts:any[] = [];
  columns:any[];
  @ViewChild('addPart') addPart: ElementRef;
  @ViewChild('salesMargin') salesMargin: ElementRef;
  @Input() customer: any;
  @Input() salesQuote:ISalesQuote;
  query: ItemMasterSearchQuery;
  constructor(private modalService: NgbModal,private salesQuoteService: SalesQuoteService) {
    this.show = false;
    this.part = new PartDetail();
  }

  /*addPartNumber(value) {
    this.show = true;
  }
  */

 ngOnInit() {
  this.salesQuoteService.getSearchPartObject()
.subscribe(data => {
this.query = data;

});
this.salesQuoteService.getSelectedParts()
.subscribe(data => {
this.selectedParts = data;

});
this.columns = [];
this.initColumns();
  
}




        





initColumns() {
  this.columns = [
    { field: 'partNumber', header: 'PartNumber', width: '200px' },
    { field: 'description', header: 'Description', width: '200px' },
    { field: 'stockLineNumber', header: 'Stock Line Number', width: '200px' },
    { field: 'method', header: 'Method', width: '200px' },
    { field: 'serialNumber', header: 'Serial Number', width: '200px' },
    { field: 'stockLineId', header: 'STOCK LINE NUM', width: '200px' },
    { field: 'idNumber', header: 'ID NUM', width: '200px' },
    { field: 'pmaStatus', header: 'OEM/PMA/DE', width: '200px' },
    { field: 'conditionType', header: 'COND TYPE', width: '200px' },
    { field: 'currency', header: 'Currency', width: '200px' },
    { field: 'fixRate', header: 'fx Rate', width: '200px' },
    { field: 'quantityFromThis', header: 'QTY QUOTED', width: '200px' },
    { field: 'salesPricePerUnit', header: 'UNIT SALE PRICE', width: '200px' },
    { field: 'markUpPercentage', header: 'MARK UP %', width: '200px' },
    { field: 'markupExtended', header: 'MARK UP AMOUNT', width: '200px' },
    { field: 'salesDiscount', header: 'DISCOUNT %', width: '200px' },
    { field: 'salesDiscountPerUnit', header: 'DISC AMOUNT', width: '200px' },
    { field: 'netSalesPriceExtended', header: 'NET SALES', width: '200px' },
    { field: 'unitCostPerUnit', header: 'UNIT COST', width: '200px' },
    { field: 'unitCostExtended', header: 'EXTENDED COST', width: '200px' },
    { field: 'marginAmountExtended', header: 'MARGIN ($)', width: '200px' },
    { field: 'marginPercentageExtended', header: 'MARGIN (%)', width: '200px' }

  ]
}

  onClose(event) {
    this.show = false;
    this.addPartModal.close();
    console.log('close event');

  }
  
  onCloseMargin(event) {
    this.show = false;
    this.selectedPart.selected = false;
    this.salesMarginModal.close();
    console.log('close event');
    this.openPartNumber();
  }
  
  addPartNumber() {
    this.salesQuoteService.resetSearchPart();
    //this.salesQuoteService.getSearchPartResult();
    this.openPartNumber();
  }
  openPartNumber() {
    console.log(this.salesQuote);
    let content = this.addPart;
    this.addPartModal = this.modalService.open(content, { size: 'lg' });
   // this.addPartModal.componentInstance.salesQuote = this.salesQuote;
   // this.addPartModal.componentInstance.display = this.show;
   /* this.addPartModal.componentInstance.close.subscribe(($e) => {
      console.log($e);
      this.onClose($e);
    })
    this.addPartModal.componentInstance.select.subscribe(($e) => {
      console.log($e);
      this.onClose($e);
    })*/
    this.addPartModal.result.then(() => {
        console.log('When user closes');
    }, () => { console.log('Backdrop click') })
  }
  openSalesMargin(event) {
    console.log(event);
    console.log(this.salesQuote);
    let content = this.salesMargin;
    this.selectedPart = event.part;
    let checked = event.checked;
    if(this.selectedPart){   
      if(checked){
        this.salesQuoteService.getSearchPartObject()
        .subscribe(data => {
        this.query = data;
        this.part = new PartDetail();
        this.part.partNumber = this.selectedPart.partNumber;
        this.part.stockLineNumber = this.selectedPart.stockLineNumber;
        this.part.salesPricePerUnit = + this.selectedPart.unitCost;
        this.part.itemClassification = this.selectedPart.itemClassification;
        this.part.description = this.selectedPart.description;
        this.part.itemMasterId = this.selectedPart.itemId;
        this.part.stockLineId = this.selectedPart.itemId;
        this.part.idNumber = this.selectedPart.idNumber;
        this.part.method = this.selectedPart.method;
        this.part.serialNumber = this.selectedPart.serialNumber;
        this.part.pmaStatus = 'OEM';
        this.part.masterCompanyId = this.selectedPart.itemClassification.masterCompanyId;
        this.part.conditionType = this.selectedPart.conditionType;
        this.part.currency = this.selectedPart.currency;
        this.part.salesDiscount = 0;
        this.part.unitCostPerUnit = 0;
        this.part.markupPerUnit = 0;
        this.part.quantityRequested = this.query.partSearchParamters.quantityRequested;
        this.part.quantityToBeQuoted = this.query.partSearchParamters.quantityToQuote;
        this.part.quantityFromThis = this.query.partSearchParamters.quantityToQuote;
        this.part.quantityAlreadyQuoted = this.query.partSearchParamters.quantityAlreadyQuoted;
        
        });
        this.addPartModal.close();
        this.salesMarginModal = this.modalService.open(content, { size: 'lg' });
        this.salesMarginModal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click'); this.selectedPart.selected = false; })
       }else{
         this.removePartNamber(this.selectedPart);
       }
    }
  
   
  }
  openSalesMarginSave(event){
    console.log(event);
   // if(!this.checkForDuplicates(event)){
      this.salesQuoteService.getSearchPartObject()
      .subscribe(data => {
        this.query = data;
        this.query.partSearchParamters.quantityAlreadyQuoted = this.query.partSearchParamters.quantityAlreadyQuoted+event.quantityFromThis;
        this.query.partSearchParamters.quantityToQuote = this.query.partSearchParamters.quantityRequested - this.query.partSearchParamters.quantityAlreadyQuoted;
      });
      this.salesQuoteService.updateSearchPartObject(this.query);
      let partObj = new PartDetail();
      partObj.partNumber = this.part.partNumber;
      partObj.stockLineNumber = this.part.stockLineNumber;
      partObj.salesPricePerUnit = + this.part.salesPricePerUnit;
      partObj.itemClassification = this.part.itemClassification;
      partObj.description = this.part.description;
      partObj.itemMasterId = this.part.itemMasterId;
      partObj.stockLineId = this.part.stockLineId;
      partObj.idNumber = this.part.idNumber;
      partObj.method = this.part.method;
      partObj.serialNumber = this.part.serialNumber;
      partObj.pmaStatus =  this.part.pmaStatus;
      partObj.masterCompanyId =  this.part.masterCompanyId;
      partObj.conditionType =  this.part.conditionType;
      partObj.currency =  this.part.currency;
      partObj.fixRate = this.part.fixRate;
      partObj.salesDiscount = this.part.salesDiscount;
      partObj.salesDiscountPerUnit = this.part.salesDiscountPerUnit;
      partObj.salesDiscountExtended = this.part.salesDiscountExtended;
      partObj.unitCostPerUnit = this.part.unitCostPerUnit;
      partObj.unitCostExtended = this.part.unitCostExtended;
      partObj.markupPerUnit = this.part.markupPerUnit;
      partObj.markUpPercentage = this.part.markUpPercentage;
      partObj.markupExtended = this.part.markupExtended;
      
      partObj.marginPercentagePerUnit = this.part.marginPercentagePerUnit;
      partObj.marginAmountExtended = this.part.marginAmountExtended;
      partObj.marginAmountPerUnit = this.part.marginAmountPerUnit;
      partObj.quantityRequested = this.part.quantityRequested;
      partObj.quantityToBeQuoted = this.part.quantityToBeQuoted;
      partObj.quantityFromThis = this.part.quantityFromThis;
      partObj.quantityAlreadyQuoted =this.part.quantityAlreadyQuoted;
      partObj.netSalesPriceExtended = this.part.netSalesPriceExtended;
      
      this.selectedParts.push(partObj);
      this.salesMarginModal.close();
      this.openPartNumber();
      console.log(this.query);
      console.log(this.selectedParts);
   // }
   
  }

  checkForDuplicates(selectedPart){
    let selectedPartNamber = selectedPart.partNumber
    let selectedStockLineNumber = selectedPart.stockLineNumber
    console.log(selectedPart);
    console.log(this.selectedParts);
    for (let i = 0; i < this.selectedParts.length; i++) {
      let partNumber = this.selectedParts[i].partNumber;
      let stockLineNumber = this.selectedParts[i].stockLineNumber;
      console.log(partNumber);
      console.log(stockLineNumber);
      if (partNumber==selectedPartNamber&&stockLineNumber==selectedStockLineNumber) {
        
        return true;
      }
      return false;
    }
  }
  removePartNamber(selectedPart){
    let selectedPartNamber = selectedPart.partNumber
    let selectedStockLineNumber = selectedPart.stockLineNumber
    for (let i = 0; i < this.selectedParts.length; i++) {
      let partNumber = this.selectedParts[i].partNumber;
      let stockLineNumber = this.selectedParts[i].stockLineNumber;
      //console.log(partNumber);
      if (partNumber==selectedPartNamber&&stockLineNumber==selectedStockLineNumber) {
       this.selectedParts.splice(i, 1);
      }
     
    }
    console.log(this.selectedParts);
  }
 

}
