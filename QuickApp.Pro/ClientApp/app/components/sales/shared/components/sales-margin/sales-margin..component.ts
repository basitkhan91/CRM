import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { PartDetail } from "../../models/part-detail";
import { SalesQuoteService } from "../../../../../services/salesquote.service";
import { CommonService } from '../../../../../services/common.service';
import { ItemMasterSearchQuery } from "../../../quotes/models/item-master-search-query";

@Component({
  selector: "app-sales-margin",
  templateUrl: "./sales-margin.component.html",
  styleUrls: ["./sales-margin.component.css"]
})
export class SalesMarginComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() save: EventEmitter<PartDetail> = new EventEmitter<PartDetail>();
  @Input() part: PartDetail;
  @Input() display: boolean;
  @Input() isEdit: boolean;

  query: ItemMasterSearchQuery;
  percentage: any[] = [];
  constructor(private salesQuoteService: SalesQuoteService, private commonservice: CommonService,) {

  }

  ngOnInit() {
    this.getPercents();
    this.calculate();
   /* for (let i = 1; i <= 10; i++) {
      this.percentage.push({ value: i.toString(), text: i.toString() });
    }*/
  }
  getPercents() {
    this.commonservice.smartDropDownList('[Percent]', 'PercentId', 'PercentValue').subscribe(res => {
        this.percentage = res;
    })
  }

  onClose(event: Event): void {
    event.preventDefault();
    this.close.emit(true);
    //this.showPartNumberModal();
  }

  onSave(event: Event): void {
    event.preventDefault();
    this.save.emit(this.part);
   // this.showPartNumberModal();
  }

  showPartNumberModal() {
    var btnPartDetail: any = document.querySelector("#addPartNumber");
    if (btnPartDetail) {
      btnPartDetail.click();
    }
  }

  calculate() {
    if (this.part) {
      console.log(this.part);
      this.calculatePart();
    }
  }

  calculatePart() {
    try {
        this.part.salesPriceExtended = this.part.salesPricePerUnit * this.part.quantityFromThis;
        this.part.markupPerUnit = + (this.part.salesPricePerUnit * (this.part.markUpPercentage / 100)).toFixed(2);
        this.part.markupExtended = + (this.part.markupPerUnit * this.part.quantityFromThis).toFixed(2);
        this.part.salesDiscountPerUnit = + ((this.part.salesDiscount / 100) * (this.part.salesPricePerUnit + this.part.markupPerUnit)).toFixed(2);
        this.part.salesDiscountExtended = +(this.part.salesDiscountPerUnit * this.part.quantityFromThis).toFixed(2);
        this.part.netSalesPricePerUnit = +(this.part.salesPricePerUnit + this.part.markupPerUnit - this.part.salesDiscountPerUnit).toFixed(2);
        this.part.netSalesPriceExtended = +(this.part.salesPriceExtended + this.part.markupExtended - this.part.salesDiscountExtended).toFixed(2);
        this.part.marginAmountPerUnit = +(this.part.netSalesPricePerUnit - this.part.unitCostPerUnit).toFixed(2);
        this.part.marginAmountExtended = +(this.part.marginAmountPerUnit * this.part.quantityFromThis).toFixed(2);
        this.part.unitCostExtended = +(this.part.unitCostPerUnit * this.part.quantityFromThis).toFixed(2);
        this.part.marginPercentagePerUnit = Math.round((this.part.marginAmountPerUnit / this.part.netSalesPricePerUnit)*100);
    }
    catch (e) {
        console.log(e);
    }
  }
}
