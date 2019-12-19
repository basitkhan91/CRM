import { Component, Input } from "@angular/core";
import { ISalesQuote } from "../../../../../models/sales/ISalesQuote.model";

@Component({
  selector: "app-sales-part-number",
  templateUrl: "./sales-part-number.component.html",
  styleUrls: ["./sales-part-number.component.css"]
})
export class SalesPartNumberComponent {
  show: boolean;
  @Input() customer: any;
  @Input() salesQuote:ISalesQuote;
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
