import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { ItemMasterService } from "../../../../../services/itemMaster.service";

@Component({
  selector: "app-add-sales-part-number",
  templateUrl: "./add-sales-part-number.component.html",
  styleUrls: ["./add-sales-part-number.component.css"]
})
export class AddSalesPartNumberComponent implements OnInit {
  @Input() display: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private itemMasterService: ItemMasterService) {
    console.log("add...");
  }

  ngOnInit() {
    // this.itemMasterService.search({}).subscribe(result => {
    //   console.log(result);
    // });
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
}
