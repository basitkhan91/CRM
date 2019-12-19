import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { ItemMasterService } from "../../../../../services/itemMaster.service";
import { ItemSearchType } from "../../../quotes/models/item-search-type";
import { PartDetail } from "../../models/part-detail";
import { ISalesQuote } from "../../../../../models/sales/ISalesQuote.model";

@Component({
  selector: "app-add-sales-part-number",
  templateUrl: "./add-sales-part-number.component.html",
  styleUrls: ["./add-sales-part-number.component.css"]
})
export class AddSalesPartNumberComponent implements OnInit {
  @Input() display: boolean;
  @Input() customer: any;
  @Input() salesQuote:ISalesQuote;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  searchType: ItemSearchType;
  parts: any[];
  showModalMargin: boolean;
  part: PartDetail;

  constructor(private itemMasterService: ItemMasterService) {
    console.log("add...");
    this.searchType = ItemSearchType.ItemMaster;
    this.showModalMargin = false;
  }

  ngOnInit() {
    this.parts = [];
  }

  show(value: boolean): void {
    this.display = value;
  }

  onClose() {
    this.close.emit(true);
  }

  onAddPartNumberSubmit($event) {
    this.display = false;
  }

  onPartSearch(parts) {
    console.log(parts);
    this.parts = parts.data;
  }

  onSearchTypeChange(type: ItemSearchType) {
    this.searchType = type;
  }

  onShowModalMargin(event: any) {
    this.showModalMargin = event.checked;
    if (this.showMarginDetails) {
      this.part = event.part;
      setTimeout(this.showMarginDetails, 100);
    }
  }

  onSelect(part: any) {
    this.select.emit(part);
  }

  showMarginDetails() {
    var btnMarginDetails: any = document.querySelector("#btnMarginDetails");
    if (btnMarginDetails) {
      btnMarginDetails.click();
    }
  }
}
