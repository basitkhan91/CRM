import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-part-details",
  templateUrl: "./part-details.component.html",
  styleUrls: ["./part-details.component.scss"]
})
export class ParetDetailsComponent {
    showPaginator: any;
    pageLinks: any;
    parts: any;
    selectedColumns: any;
    totalRecords: any;
    onPaging: any;

  constructor() {}
}
