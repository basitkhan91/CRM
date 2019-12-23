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
  
}

  onClose(event) {
    this.show = false;
    this.addPartModal.close();
    console.log('close event');

  }
  
  onCloseMargin(event) {
    this.show = false;
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
        this.part.partNumber = this.selectedPart.partNumber;
        this.part.stockLineNumber = this.selectedPart.stockLineNumber;
        this.part.salesPricePerUnit = + this.selectedPart.unitCost;
        this.part.itemClassification = this.selectedPart.itemClassification;
        this.part.description = this.selectedPart.description;
        this.part.itemMasterId = this.selectedPart.itemId;
        this.part.stockLineId = this.selectedPart.itemId;
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
        }, () => { console.log('Backdrop click') })
       }else{
         this.removePartNamber(this.selectedPart);
       }
    }
  
   
  }
  openSalesMarginSave(event){
    console.log(event);
    if(!this.checkForDuplicates(event)){
      this.salesQuoteService.getSearchPartObject()
      .subscribe(data => {
        this.query = data;
        this.query.partSearchParamters.quantityAlreadyQuoted = this.query.partSearchParamters.quantityAlreadyQuoted+event.quantityFromThis;
        this.query.partSearchParamters.quantityToQuote = this.query.partSearchParamters.quantityRequested - this.query.partSearchParamters.quantityAlreadyQuoted;
      });
      this.salesQuoteService.updateSearchPartObject(this.query);
      this.selectedParts.push(event);
      this.salesMarginModal.close();
      this.openPartNumber();
      console.log(this.query);
      console.log(this.selectedParts);
    }
   
  }

  checkForDuplicates(selectedPart){
    let selectedPartNamber = selectedPart.partNumber
    let selectedStockLineNumber = selectedPart.stockLineNumber
    for (let i = 0; i < this.selectedParts.length; i++) {
      let partNumber = this.selectedParts[i].partNumber;
      let stockLineNumber = this.selectedParts[i].stockLineNumber;
      console.log(partNumber);
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
