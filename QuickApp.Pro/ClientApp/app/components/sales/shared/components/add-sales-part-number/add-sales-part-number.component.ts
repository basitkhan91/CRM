import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { ItemMasterService } from "../../../../../services/itemMaster.service";
import { ItemSearchType } from "../../../quotes/models/item-search-type";

@Component({
  selector: "app-add-sales-part-number",
  templateUrl: "./add-sales-part-number.component.html",
  styleUrls: ["./add-sales-part-number.component.css"]
})
export class AddSalesPartNumberComponent implements OnInit {
  @Input() display: boolean;
  @Input() customer: any;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  searchType: ItemSearchType;
  parts: any[];
  constructor(private itemMasterService: ItemMasterService) {
    console.log("add...");
    this.searchType = ItemSearchType.ItemMaster;
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
}
