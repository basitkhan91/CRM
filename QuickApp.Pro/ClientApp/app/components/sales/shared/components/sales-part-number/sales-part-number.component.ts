import { Component } from "@angular/core";

@Component({
  selector: "app-sales-part-number",
  templateUrl: "./sales-part-number.component.html",
  styleUrls: ["./sales-part-number.component.css"]
})
export class SalesPartNumberComponent {
  show: boolean;
  constructor() {
    this.show = false;
  }

  addPartNumber(value) {
    this.show = true;
  }

  onClose(event) {
    this.show = false;
  }
}
