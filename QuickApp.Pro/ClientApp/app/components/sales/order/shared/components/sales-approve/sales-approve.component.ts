import { Component } from "@angular/core";

@Component({
  selector: "app-sales-order-approve",
  templateUrl: "./sales-approve.component.html",
  styleUrls: ["./sales-approve.component.css"]
})
export class SalesOrderApproveComponent {
  selectedApprover1: any;
  approvers: any[];
  constructor() {
    this.approvers = [];
  }
}
