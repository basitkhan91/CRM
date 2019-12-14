import { Component } from "@angular/core";
import { ISalesOrderQuoteApproverList } from '../../../../../../models/sales/ISalesOrderQuoteApproverList';
import { SalesOrderQuoteApproverList } from '../../../../../../models/sales/SalesOrderQuoteApproverList';
import { ISalesOrderQuote } from "../../../../../../models/sales/ISalesOrderQuote";
import { SalesOrderQuote } from "../../../../../../models/sales/SalesOrderQuote";
import { SalesQuoteService } from "../../../../../../services/salesquote.service";
import { EmployeeService } from '../../../../../../services/employee.service';
import { AuthService } from '../../../../../../services/auth.service';

@Component({
  selector: "app-sales-approve",
  templateUrl: "./sales-approve.component.html",
  styleUrls: ["./sales-approve.component.css"]
})
export class SalesApproveComponent {
  selectedApprover1: any;
  approvers: any[];
  allEmployeeinfo: any[] = [];
  employeeList: any[] = [];
  
  constructor(public employeeService: EmployeeService,private salesQuoteService: SalesQuoteService,private authService: AuthService) {
    this.approvers = [];
 
  }
  ngOnInit(): void {
    this.salesQuoteService
    .getSalesOrderQuteApprovers()
    .subscribe(data => {
      this.approvers = data;
      this.approvers.push(new SalesOrderQuoteApproverList());
      this.approvers.push(new SalesOrderQuoteApproverList());
      this.approvers.push(new SalesOrderQuoteApproverList());
      this.approvers.push(new SalesOrderQuoteApproverList());
      this.approvers.push(new SalesOrderQuoteApproverList());
    });
    this.getEmployeedata();
	}

  private getEmployeedata() {
    this.employeeService.getEmployeeList().subscribe(
      results => this.onempDataLoadSuccessful(results[0]),
      error => this.onDataLoadFailed(error)
    );
  }
  
  private onempDataLoadSuccessful(getEmployeeCerficationList: any[]) {
    this.allEmployeeinfo = getEmployeeCerficationList;
  }
  private onDataLoadFailed(error: any) {
    // alert(error);
  }
  get userName(): string {
    return this.authService.currentUser ? this.authService.currentUser.userName : "";
}
  onApproverSelect(approver) {
    console.log(approver);
    if (this.allEmployeeinfo) {
        for (let i = 0; i < this.allEmployeeinfo.length; i++) {
            if (approver.employeeId == this.allEmployeeinfo[i].employeeId) {
              approver.level = this.allEmployeeinfo[i].managementStructureId;
              approver.masterCompanyId = this.allEmployeeinfo[i].masterCompanyId;
              approver.statusId = 1;
              approver.createdBy=this.userName;
              approver.updatedBy=this.userName;
              approver.createdOn = new Date().toDateString();
              approver.updatedOn = new Date().toDateString();
            }
          }
        }
        console.log(approver);
      }
  

}
