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
  employeeList: any[]=[];
  
  constructor(public employeeService: EmployeeService,private salesQuoteService: SalesQuoteService,private authService: AuthService) {
    this.approvers = [];
    this.employeeList[0] = [];
    this.employeeList[1] = [];
    this.employeeList[2] = [];
    this.employeeList[3] = [];
    this.employeeList[4] = [];
 
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
    this.employeeList[0] = getEmployeeCerficationList;
    this.employeeList[1] = getEmployeeCerficationList;
    this.employeeList[2] = getEmployeeCerficationList;
    this.employeeList[3] = getEmployeeCerficationList;
    this.employeeList[4] = getEmployeeCerficationList;
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
              this.employeeList[index+1] = this.employeeListByLevel(this.employeeList[index],approver.employeeId);
              approver.level = index+1;
              approver.masterCompanyId = this.allEmployeeinfo[i].masterCompanyId;
              approver.firstName = this.allEmployeeinfo[i].firstName;
              approver.employeeCode = this.allEmployeeinfo[i].employeeCode;
              approver.email = this.allEmployeeinfo[i].email;
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

  employeeListByLevel(employeeList,employeeId){
    let employees = [];
    for (let i = 0; i < employeeList.length; i++) {
      if (employeeId != employeeList[i].employeeId) {
        employees.push(employeeList[i]);
      }
    }

    return employees;

  }
  

}
