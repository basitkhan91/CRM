import { Component, OnInit } from "@angular/core";
import { CalendarModule } from "primeng/calendar";
@Component({
  selector: "app-create-publication",
  templateUrl: "./create-publication.component.html",
  styleUrls: ["./create-publication.component.scss"]
})
/** Create-publication component*/
export class CreatePublicationComponent implements OnInit {
  activeMenuItem: number = 1;
  revision: boolean = false;
  currentTab: string = "General";
  types = [
    { label: "SelectPublication ", value: "Select publication" },
    { label: "CMM", value: "CMM" },
    { label: "AD", value: "AD" },
    { label: "SB", value: "SB" }
  ];
  status = [
    { label: "Select Status ", value: "Select Status" },
    { label: "Active", value: "Active" },
    { label: "In-Active", value: "In-Active" }
  ];
  /** Create-publication ctor */
  constructor() {}

  cars = [
    { aircraft: "a1653d4d", model: "VW", dashNumber: "1998", memo: "White" }
  ];

  cols: any[];
  first: number = 0;
  /** Create-publication ctor */
  constructor() {}
  ngOnInit() {
    this.cols = [
      // { field: "id", header: "ID" },
      { field: "aircraft", header: "Aircraft" },
      { field: "model", header: "Model" },
      { field: "dashNumber", header: "Dash Numbers" },
      { field: "memo", header: "Memo" }
      // { field: "actions", header: "Actions" }
    ];
  }

  changeOfTab(value) {
    if (value === "General") {
      this.currentTab = "General";
      this.activeMenuItem = 1;
    } else if (value === "Aircraft") {
      this.currentTab = "Aircraft";
      this.activeMenuItem = 2;
    } else if (value === "Atachapter") {
      this.currentTab = "Atachapter";
      this.activeMenuItem = 3;
    }
  }
}
