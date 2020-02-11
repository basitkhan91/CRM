import { Component, Input, Output, EventEmitter,ViewChild, ElementRef } from "@angular/core";
import { ItemMasterSearchQuery } from "../../../../quotes/models/item-master-search-query";
import { ItemSearchType } from "../../../../quotes/models/item-search-type";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ItemMasterService } from "../../../../../../services/itemMaster.service";
import { StocklineService } from "../../../../../../services/stockline.service";
import { SalesQuoteService } from "../../../../../../services/salesquote.service";
import { ConditionService } from '../../../../../../services/condition.service';
import { ISalesQuote } from "../../../../../../models/sales/ISalesQuote.model";
import { PartSearchParamters } from "../../../../quotes/models/part-search-parameters";
import { IPartJson } from "../../../models/ipart-json";
import { ISalesItemMaster } from "../../../models/isales-item-master";
import { IMultiPartJson } from "../../../models/imulti-part-json";
import { Router } from "@angular/router";

@Component({
  selector: "app-part-number-filter",
  templateUrl: "./part-number-filter.component.html",
  styleUrls: ["./part-number-filter.component.scss"]
})
export class PartNumberFilterComponent {
  @Input() customer: any;
  @Input() salesQuote:ISalesQuote;
  @Output() onPartSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearchTypeChange: EventEmitter<ItemSearchType> = new EventEmitter<ItemSearchType>();
  @ViewChild("searchMultiPart") searchMultiPart: ElementRef;
  query: ItemMasterSearchQuery;
  partDetails: any[];
  partDetail: any;
  searchDisabled: boolean;
  historicalDisabled: boolean;
  allConditionInfo: any[] = [];
  displayPartError: boolean = false;
  enableMultiSearch: boolean = false;
  errorMessages:any[]=[];
  multiPartModal: NgbModalRef;
  multiPartNumbers="";
  multiSearchResult:IMultiPartJson[]=[];
  columns: any[];

  constructor(
    private modalService: NgbModal,
    private itemMasterService: ItemMasterService,
    private stockLineService: StocklineService,
    private salesQuoteService: SalesQuoteService,
    private router: Router,
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

  initColumns() {
    this.columns = [
      { field: null, header: '', width: '50px' },
      { field: 'partNumber', header: 'PN', width: '200px' },
      { field: 'partNumber', header: 'PN Description', width: '200px' },
      { field: 'conditionType', header: 'Condition Type', width: '200px' },
      { field: 'alternatePartNumber', header: 'Alternate PN', width: '200px' },
      { field: 'qtyAvailable', header: 'Qty Available', width: '200px' },
      { field: 'qtyOnHand', header: 'Qty On Hand', width: '200px' },
      { field: 'qtyRequested', header: 'Qty Requested', width: '200px' },
      { field: '', header: 'Actions', width: '100px' },
    ]
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
    if(this.query.partSearchParamters.includeMultiplePartNumber){
      this.getMultipartsQuery();
    }else{
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
    }
    
    console.log(this.query);
  }
  calculate() {
    if (this.query.partSearchParamters.conditionId>0 && this.query.partSearchParamters.partNumber  && this.query.partSearchParamters.quantityRequested>0){
      this.searchDisabled = false;
      }
    let qr = + this.query.partSearchParamters.quantityRequested;
    if(qr){
      this.query.partSearchParamters.quantityToQuote = qr - this.query.partSearchParamters.quantityAlreadyQuoted;
    }
    
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
    if (this.query.partSearchParamters.conditionId>0 && this.query.partSearchParamters.quantityRequested>0)
          this.searchDisabled = false;
  }
  onConditionSelect() {
    console.log(this.query);
    if (this.query.partSearchParamters.conditionId>0 && this.query.partSearchParamters.partNumber  && this.query.partSearchParamters.quantityRequested>0)
          this.searchDisabled = false;
   // else if (this.query.partSearchParamters.conditionId>0 && this.query.partSearchParamters.includeMultiplePartNumber)
    //      this.searchDisabled = false;
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
    let partSearchParamters={
      'partNumber':event.query,
      "restrictPMA": this.salesQuote.restrictPMA,
      "restrictDER": this.salesQuote.restrictDER,  
      "customerId": this.salesQuote.customerId
    }
    this.itemMasterService.searchPartNumberAdvanced(partSearchParamters).subscribe(
      (result: any[]) => {
        this.partDetails = result.length > 0 ? result : [];
       // console.log(result);
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

  openMultiPartSearch() {

    this.multiPartModal = this.modalService.open(this.searchMultiPart, { size: "lg" });
    this.multiPartModal.result.then(
      () => {
        console.log("When user closes");
      },
      () => {
        console.log("Backdrop click");
      }
    );
  }
  getMultipartsQuery() {

    let multiParts = [];
    for (let i = 0; i < this.multiSearchResult.length; i++) {
      if (this.multiSearchResult[i].exist) {
        let partSearchParamters = new PartSearchParamters();
        partSearchParamters =  { ...this.query.partSearchParamters };
        partSearchParamters.partNumber = this.multiSearchResult[i].partNumber;
        partSearchParamters.partId = this.multiSearchResult[i].partId;
        partSearchParamters.partDescription = this.multiSearchResult[i].partDescription;
        partSearchParamters.conditionId = this.multiSearchResult[i].conditionType;
        multiParts.push(partSearchParamters);
      }
    }
    //console.log(multiParts);
    if(multiParts.length>0){
     // this.query.partSearchParamters = new PartSearchParamters();
      this.query.multiPartSearchParamters = multiParts;
      console.log(this.query);
      switch (this.query.partSearchParamters.itemSearchType) {
        case ItemSearchType.StockLine:
        this.stockLineService.multiSearch(this.query)
        .subscribe(result => {
          console.log(result);
          this.onPartSearch.emit(result);
        });
         
          break;
  
        default:
          console.log('Item master....');
          this.itemMasterService.multiSearch(this.query)
            .subscribe(result => {
              this.onPartSearch.emit(result);
            });
          break;
      }
    }
    
    
    
  }
  searchMultiPartNumbers(): void {

    let partSearchParamters={
      'parts':this.multiPartNumbers.split(","),
      "restrictPMA": this.salesQuote.restrictPMA,
      "restrictDER": this.salesQuote.restrictDER,  
      "customerId": this.salesQuote.customerId
    }
    this.itemMasterService.searchMultiPartNumbers(partSearchParamters).subscribe((response:any[]) => {
      console.log(response);
      this.multiSearchResult = response;
      if (this.multiSearchResult.length>0)
          this.searchDisabled = false;
     // this.multiPartModal.close();
      
     
    });

  }
  includeMultiplePN(event) {
    let checked: boolean = event.srcElement.checked;
    if(checked){
      //this.openMultiPartSearch();
      this.enableMultiSearch = true;
      if (this.multiSearchResult.length>0)
      this.searchDisabled = false;
    }else{
      this.enableMultiSearch = false;
      if (this.query.partSearchParamters.conditionId>0 && this.query.partSearchParamters.partNumber  && this.query.partSearchParamters.quantityRequested>0)
          this.searchDisabled = false;
      else
      this.searchDisabled = true;
    }
    
  }
  onCloseMultiPartNumbers(event) {
  
    this.multiPartModal.close();
   
  }
  public navigateToAddItemMaster() {

		this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-stock')

	}
}