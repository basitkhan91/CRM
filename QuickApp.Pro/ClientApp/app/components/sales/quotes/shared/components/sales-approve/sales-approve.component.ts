import { Component } from "@angular/core";
import { ISalesOrderQuoteApproverList } from '../../../../../../models/sales/ISalesOrderQuoteApproverList';
import { SalesOrderQuoteApproverList } from '../../../../../../models/sales/SalesOrderQuoteApproverList';
import { ISalesOrderQuote } from "../../../../../../models/sales/ISalesOrderQuote";
import { SalesQuoteService } from "../../../../../../services/salesquote.service";
import { EmployeeService } from '../../../../../../services/employee.service';
import { AuthService } from '../../../../../../services/auth.service';
import { ISalesQuote } from "../../../../../../models/sales/ISalesQuote.model";

@Component({
  selector: "app-sales-approve",
  templateUrl: "./sales-approve.component.html",
  styleUrls: ["./sales-approve.component.css"]
})
export class SalesApproveComponent {
  selectedApprover1: any;
  salesOrderQuote: ISalesOrderQuote;
  approvers: any[];
  allEmployeeinfo: any[] = [];
  employeeList: any[] = [];
  
  constructor(public employeeService: EmployeeService,private salesQuoteService: SalesQuoteService,private authService: AuthService) {
    this.approvers = [];
 
  }
  ngOnInit(): void {

    this.salesQuoteService
    .getSalesOrderQuteInstance()
    .subscribe(data => {
      this.salesOrderQuote = data;
      this.getApprovers();
    });
   
    this.getEmployeedata();
  }
  private getApprovers() {
    this.salesQuoteService
    .getSalesOrderQuteApprovers()
    .subscribe(data => {
      this.approvers = data;
      if(!this.salesOrderQuote.salesOrderQuoteId){
       
      }
     
    });
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
  onApproverSelect(approver,index) {
    console.log(approver);
    if (this.allEmployeeinfo) {
        for (let i = 0; i < this.allEmployeeinfo.length; i++) {
            if (approver.employeeId == this.allEmployeeinfo[i].employeeId) {
              //approver.level = this.allEmployeeinfo[i].managementStructureId;
              approver.level = index+1;
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
