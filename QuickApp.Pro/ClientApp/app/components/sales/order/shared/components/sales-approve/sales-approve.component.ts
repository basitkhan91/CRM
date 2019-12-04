import { Component } from "@angular/core";

@Component({
  selector: "app-sales-approve",
  templateUrl: "./sales-approve.component.html",
  styleUrls: ["./sales-approve.component.css"]
})
export class SalesApproveComponent {
  selectedApprover1: any;
  approvers: any[];
  constructor() {
    this.approvers = [];
  }
}
