import { Component } from "@angular/core";
import { CalendarModule } from "primeng/calendar";
@Component({
  selector: "app-create-publication",
  templateUrl: "./create-publication.component.html",
  styleUrls: ["./create-publication.component.scss"]
})
/** Create-publication component*/
export class CreatePublicationComponent {
  activeMenuItem: number = 1;
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

  changeOfTab(value) {
    if (value === "General") {
      this.currentTab = "General";
      this.activeMenuItem = 1;
    } else if (value === "Aircraft") {
      this.currentTab = "Aircraft";
      this.activeMenuItem = 2;
    }
  }
}
