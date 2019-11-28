import { Component, Input, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import {
  WorkOrderQuote,
  multiParts
} from '../../../../models/work-order-quote.modal';

import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { CommonService } from '../../../../services/common.service';
import { WorkFlowtService } from '../../../../services/workflow.service';
import {
  AlertService,
  MessageSeverity
} from '../../../../services/alert.service';


@Component({
  selector: 'app-work-order-quote',
  templateUrl: './work-order-quote.component.html',
  styleUrls: ['./work-order-quote.component.scss']
})
/** WorkOrderQuote component*/
export class WorkOrderQuoteComponent implements OnInit {
  @Input() quoteForm: WorkOrderQuote;
  customerName: string;
  creditLimit: any;
  creditTerms: any;
  customerCode: any;
  customerEmail: string;
  customerPhone: number;
  customerContact: string;
  customerRef: any;
  quoteDueDate: Date;
  validFor: number;
  expirationDate: Date;
  quoteStatus: string;
  woNum: string;
  creditTerm: any;
  salesPerson: string;
  csr: any;
  employeeName: any;
  currency: any;
  workOrderNumber: string;
  mpnPartNumbersList: any[];
  selectedPartNumber: string = "";
  dso: string;
  moduleName: string;



  constructor(private router: ActivatedRoute,private workOrderService: WorkOrderService, private commonService: CommonService, private _workflowService: WorkFlowtService, private alertService:AlertService) {}
  ngOnInit() {
    if(this.quoteForm == undefined){
      this.quoteForm = new WorkOrderQuote();
    }
    this.moduleName = "Quote Information";
    console.log(this.quoteForm);
    this.router.queryParams.subscribe((params: Params) => {
      if(params['workorderid']){
        this.getWorkOrderInfo(params['workorderid'])
      }
    });
  }
  saveQuoteDetails() {
    this.workOrderService.createQuote(this.formQuoteInfo())
    .subscribe(
      res=>{
        this.alertService.showMessage(
          this.moduleName,
          'Quotation created  Succesfully',
          MessageSeverity.success
        );
      }
    )
  } 
  // addMPN() {
  //   this.quoteForm.partsDetails.push(new multiParts());
  // }

  formQuoteInfo(){
    let result = {
      WorkOrderId: this.quoteForm.WorkOrderId,
      WorkFlowWorkOrderId: this.quoteForm.WorkFlowWorkOrderId,
      openDate:this.quoteForm.openDate,
      QuoteDueDate:this.quoteDueDate,
      ValidForDays:this.validFor,
      ExpirationDate:this.expirationDate,
      QuoteStatusId:1,
      CustomerId:this.quoteForm.CustomerId,
      CurrencyId:1,
      AccountsReceivableBalance:1000.012,
      SalesPersonId:this.quoteForm.SalesPersonId,
      EmployeeId:this.quoteForm.EmployeeId,
      masterCompanyId:this.quoteForm.masterCompanyId,
      createdBy:"admin",
      updatedBy:"admin",
      IsActive:true,
      IsDeleted:false,
      DSO: this.dso
    }
    return result;
  }

  getWorkOrderInfo(getWorkOrderInfo){
    this.workOrderService.getWorkOrderById(getWorkOrderInfo).subscribe(res => {
      console.log(res);
      this.customerCode = res.customerDetails.customerId;
      this.customerName = res.customerDetails.customerName;
      this.customerContact = res.customerDetails.customerContact;
      this.customerRef = res.customerDetails.customerRef;
      this.csr = res.customerDetails.csrName;
      this.creditLimit = res.creditLimit;
      this.workOrderNumber = res.workOrderNum;
      this.quoteForm.WorkOrderId = res.workOrderId;
      this.quoteForm.WorkFlowWorkOrderId = res["workFlowWorkOrderId"];
      this.quoteForm.openDate = new Date(res["openDate"])
      this.quoteForm.CustomerId = res['customerId'];
      this.quoteForm.SalesPersonId = res['salesPersonId'];
      this.quoteForm.EmployeeId = res['employeeId'];
      this.quoteForm.masterCompanyId = res['masterCompanyId'];
      this.quoteForm.creditTermsandLimit = res.customerDetails.creditLimit;

      this.getCreditTerms(res.creditTermsId);
      this.getEmployeeList(res.employeeId,res.salesPersonId);
      this.getMPNList(res.workOrderId);
  })
  }

  getCreditTerms(ctermId){
    this.commonService.smartDropDownList('CreditTerms','CreditTermsId','Name')
    .subscribe(
      (creditTermList: any[])=>{

        for(let cTerm of creditTermList){
          if(cTerm.value == ctermId){
            this.creditTerms = cTerm.label;
          }
        }
      }
    )
  }
  getEmployeeList(empId, salesPerId){
    this.commonService.smartDropDownList('Employee','EmployeeId','FirstName')
    .subscribe(
      (employeeList: any[])=>{
        for(let emp of employeeList){
          if(emp.value == empId){
            this.employeeName = emp.label;
          }
          if(emp.value == salesPerId){
            this.salesPerson = emp.label;
          }
        }
      }
    )
  }

  getMPNList(workOrderId){
    this.workOrderService.getWorkOrderWorkFlowNumbers(workOrderId).subscribe(res => {
      console.log(res);
      this.mpnPartNumbersList = res.map(x => {
        return {
          value:
          {
            workOrderWorkFlowId: x.value,
            workOrderNo: x.label,
            masterPartId: x.masterPartId,
            workflowId: x.workflowId,
            workflowNo: x.workflowNo,
            partNumber: x.partNumber
          },
          label: x.partNumber
        }
      })
    })
  }

  partNumberSelected(){
    console.log(this.selectedPartNumber);
    for(let pn of this.mpnPartNumbersList){
      if(pn['label'] == this.selectedPartNumber){
        this._workflowService.getWorkFlowDataById(pn['value']['workflowId']).subscribe(data => {
            console.log(data);
        });
      }
    }
  
  }
}
