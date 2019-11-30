import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { PartDetail } from "../../models/part-detail";

@Component({
  selector: "app-sales-margin",
  templateUrl: "./sales-margin.component.html",
  styleUrls: ["./sales-margin.component.css"]
})
export class SalesMarginComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() save: EventEmitter<PartDetail> = new EventEmitter<PartDetail>();
  @Input() part: PartDetail;
  @Input() display: boolean;

  percentage: any[] = [];
  constructor() {

  }

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.percentage.push({ value: i.toString(), text: i.toString() });
    }
  }

  onClose(event: Event): void {
    event.preventDefault();
    this.close.emit(true);
    //this.showPartNumberModal();
  }

  onSave(event: Event): void {
    event.preventDefault();
    this.save.emit(this.part);
    this.showPartNumberModal();
  }

  showPartNumberModal() {
    var btnPartDetail: any = document.querySelector("#addPartNumber");
    if (btnPartDetail) {
      btnPartDetail.click();
    }
  }

  calculate() {
    if (this.part) {
      this.part.calculate();
    }
  }
}
