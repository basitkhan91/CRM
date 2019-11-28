import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ItemMasterSearchQuery } from "../../../../quotes/models/item-master-search-query";
import { ItemSearchType } from "../../../../quotes/models/item-search-type";

import { ItemMasterService } from "../../../../../../services/itemMaster.service";
import { ISalesQuote } from "../../../../../../models/sales/ISalesQuote.model";
import { StocklineService } from "../../../../../../services/stockline.service";

@Component({
  selector: "app-part-number-filter",
  templateUrl: "./part-number-filter.component.html",
  styleUrls: ["./part-number-filter.component.scss"]
})
export class PartNumberFilterComponent {
  @Input() customer: any;
  @Output() onPartSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearchTypeChange: EventEmitter<ItemSearchType> = new EventEmitter<ItemSearchType>();
  query: ItemMasterSearchQuery;
  partDetails: any[];
  partDetail: any;
  searchDisabled: boolean;
  historicalDisabled: boolean;

  constructor(private itemMasterService: ItemMasterService,
    private stockLineService: StocklineService) {
    this.partDetails = [];
    this.query = new ItemMasterSearchQuery();
    this.partDetail = {
      id: null,
      partNumber: '',
      partDescription: ''
    };

    this.resetActionButtons();
  }


  resetActionButtons() {
    this.searchDisabled = true;
    this.historicalDisabled = true;
  }

  search($event) {
    $event.preventDefault();

    switch (this.query.partSearchParamters.itemSearchType) {
      case ItemSearchType.StockLine:
        this.stockLineService.search(this.query)
          .subscribe(result => {
            this.onPartSearch.emit(result);
          });
        break;

      default:
        console.log('Item master....');
        this.itemMasterService.search(this.query)
          .subscribe(result => {
            this.onPartSearch.emit(result);
          });
        break;
    }

  }

  onPartNumberSelect(part: any) {
    this.resetActionButtons();
    this.query.partSearchParamters.partNumber = part.partNumber;
    this.query.partSearchParamters.partId = part.partId;
    this.query.partSearchParamters.partDescription = part.partDescription;
    this.searchDisabled = false;
  }

  searchPartByPartNumber(event) {
    this.searchDisabled = true;
    this.itemMasterService.searchPartNumber(event.query).subscribe(
      result => {
        this.partDetails = result.length > 0 ? result[0] : [];
        console.log(this.partDetails);
      }
    );
  }


  onChangeSearchType(event) {
    this.partDetails = [];
    let searchType: ItemSearchType = ItemSearchType.None;
    switch (event.target.value) {
      case "1":
        searchType = ItemSearchType.ItemMaster;
        break;

      case "2":
        searchType = ItemSearchType.StockLine;
        break;

    }
    this.onSearchTypeChange.emit(searchType);
  }
}