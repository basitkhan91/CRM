import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ItemMasterSearchQuery } from "../../../../quotes/models/item-master-search-query";
import { ItemMasterService } from "../../../../../../services/itemMaster.service";

@Component({
  selector: "app-part-number-filter",
  templateUrl: "./part-number-filter.component.html",
  styleUrls: ["./part-number-filter.component.scss"]
})
export class PartNumberFilterComponent {
  query: ItemMasterSearchQuery;
  constructor(private itemMasterService: ItemMasterService) {
    this.query = new ItemMasterSearchQuery();
  }


  search($event) {
    $event.preventDefault();
    this.itemMasterService.search(this.query)
      .subscribe(result => {
        //TODO: Parse and bind the data
      });
  }
}
