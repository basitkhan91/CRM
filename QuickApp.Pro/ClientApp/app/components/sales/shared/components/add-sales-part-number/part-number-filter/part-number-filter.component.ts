import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ItemMasterSearchQuery } from "../../../../quotes/models/item-master-search-query";
import { ItemSearchType } from "../../../../quotes/models/item-search-type";

import { ItemMasterService } from "../../../../../../services/itemMaster.service";
import { StocklineService } from "../../../../../../services/stockline.service";
import { SalesQuoteService } from "../../../../../../services/salesquote.service";
import { ConditionService } from '../../../../../../services/condition.service';

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
  allConditionInfo: any[] = [];
  displayPartError: boolean = false;
  errorMessages:any[]=[];

  constructor(
    private itemMasterService: ItemMasterService,
    private stockLineService: StocklineService,
    private salesQuoteService: SalesQuoteService,
    public conditionService: ConditionService) {
    this.partDetails = [];
    this.query = new ItemMasterSearchQuery();
    this.partDetail = {
      id: null,
      partNumber: '',
      partDescription: ''
    };

    this.resetActionButtons();
  }
  ngOnInit() {
//this.ptnumberlistdata();
this.loadData();
this.salesQuoteService.getSearchPartObject()
.subscribe(data => {
  this.query = data;
  this.calculate();

});
   
  }

  private loadData()
	{


		this.conditionService.getConditionList().subscribe(
      results =>{
        this.allConditionInfo = results[0];
      });
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
            console.log(result);
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
    console.log(this.query);
  }
  calculate() {
    this.query.partSearchParamters.quantityToQuote = this.query.partSearchParamters.quantityRequested - this.query.partSearchParamters.quantityAlreadyQuoted;
    this.salesQuoteService.updateSearchPartObject(this.query);
  }
  private ptnumberlistdata() {

    this.itemMasterService.getPrtnumberslistList().subscribe(
        results => this.onptnmbersSuccessful(results[0]),
        //error => this.onDataLoadFailed(error)
    );
}

private onptnmbersSuccessful(allWorkFlows: any[]) {
    //this.dataSource.data = allWorkFlows;
    console.log(this.partDetails);
    this.partDetails = allWorkFlows;
}

  onPartNumberSelect(part: any) {
    console.log(this.query);
    this.resetActionButtons();
    this.query.partSearchParamters.partNumber = part.partNumber;
    this.query.partSearchParamters.partId = part.partId;
    this.query.partSearchParamters.partDescription = part.partDescription;
    if (this.query.partSearchParamters.conditionId>0)
          this.searchDisabled = false;
  }
  onConditionSelect() {
    console.log(this.query);
    if (this.query.partSearchParamters.conditionId>0 && this.query.partSearchParamters.partNumber)
          this.searchDisabled = false;
  }
  
 /* onPartNumberSelect(event) {
    console.log(event);
    if (this.partDetails) {
        for (let i = 0; i < this.partDetails.length; i++) {
            if (event == this.partDetails[i].itemMasterId) {
              this.query.partSearchParamters.partNumber = this.partDetails[i].partNumber; 
              this.query.partSearchParamters.partDescription = this.partDetails[i].partDescription;  
            }
        }
    }
  }*/

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