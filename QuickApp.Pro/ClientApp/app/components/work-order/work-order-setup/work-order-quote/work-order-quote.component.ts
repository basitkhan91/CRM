import { Component, Input, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import {
  WorkOrderQuote,
  multiParts,
  partsDetail
} from '../../../../models/work-order-quote.modal';

import { WorkOrderQuoteService } from '../../../../services/work-order/work-order-quote.service';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { CommonService } from '../../../../services/common.service';
import { WorkFlowtService } from '../../../../services/workflow.service';
import { CurrencyService } from '../../../../services/currency.service';
import * as $ from 'jquery'
import {
  AlertService,
  MessageSeverity
} from '../../../../services/alert.service';
import {
  WorkOrderLabor,
  AllTasks,
  WorkOrderQuoteLabor,
  ExclusionQuote,
  ChargesQuote,
  QuoteMaterialList
} from '../../../../models/work-order-labor.modal';


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
  quoteDueDate: Date = new Date();
  validFor: number;
  expirationDate: Date;
  quoteStatus: string;
  woNum: string;
  creditTerm: any;
  salesPerson: string;
  csr: any;
  employeeName: any;
  currency: number;
  workOrderNumber: string;
  mpnPartNumbersList: any[];
  selectedPartNumber: string = "";
  dso: string;
  moduleName: string;
  workOrderPartsDetail: partsDetail[];
  selectedBuildMethod: string = "";
  buildWorkOrderList: any[];
  buildHistoricalList: any[];
  gridActiveTab: string;
    quotationHeader: any;
  materialListQuotation: any[];
  chargesQuotation: any[];
  exclusionsQuotation: any[];
  laborQuotation: any[];
  selectedWorkFlowOrWorkOrder: any;
  workOrderLaborList: any;
  labor = new WorkOrderLabor();
  taskList: any;
  currencyList: any[];
  savedWorkOrderData: any;
  laborPayload = new WorkOrderQuoteLabor();
  exclusionPayload = new ExclusionQuote();
  chargesPayload = new ChargesQuote();
  materialListPayload = new QuoteMaterialList();
  workFlowWorkOrderId: number = 0;
  workOrderId: number = 0;
  workOrderExclusionsList: Object;
  workOrderMaterialList: any;
  workOrderChargesList: any;
  accountsReceivableBalance: any;
  warnings: any;
  memo: any;
  markupList: any;
  isEdit: boolean = false;
  workFlowObject = {
    materialList: [],
    equipments: [],
    charges: [],
    exclusions: []
}
isQuote: boolean = true;
editMatData: any[] = [];




  constructor(private router: ActivatedRoute,private workOrderService: WorkOrderQuoteService, private commonService: CommonService, private _workflowService: WorkFlowtService, private alertService:AlertService, private workorderMainService: WorkOrderService, private currencyService:CurrencyService) {}
  ngOnInit() {
    if(this.quoteForm == undefined){
      this.quoteForm = new WorkOrderQuote();
    }
    this.moduleName = "Quote Information";
    console.log(this.quoteForm);
    this.router.queryParams.subscribe((params: Params) => {
      if(params['workorderid']){
        this.getWorkOrderInfo(params['workorderid']);
        this.getMPNDetails(params['workorderid']);
        this.getTaskList();
        this.getMarkup();
        this.loadCurrency();
      }
    });
  }

  calculateExpiryDate() {
    console.log(this.validFor);
    console.log(this.quoteDueDate);
    if(this.validFor && this.quoteDueDate){
      this.expirationDate = new Date();
      this.expirationDate.setDate(this.quoteDueDate.getDate() + this.validFor);
    }
  }

  saveQuoteDetails() {
    
    this.formQuoteInfo(this.quoteForm);
    this.workOrderService.createOrUpdateQuotation(this.quotationHeader)
    .subscribe(
      res=>{
        this.quotationHeader = res;
        this.quoteForm.quoteNumber = res['quoteNumber'];
        this.setWorkOrderQuoteId(res['workOrderQuoteId']);
        this.laborPayload.StatusId = this.exclusionPayload.StatusId = this.chargesPayload.StatusId = this.materialListPayload.StatusId = res['quoteStatusId']
        this.alertService.showMessage(
          this.moduleName,
          'Labor quotation created  Succesfully',
          MessageSeverity.success
        );
      }
    )
  } 
  // addMPN() {
  //   this.quoteForm.partsDetails.push(new multiParts());
  // }

  formQuoteInfo(quoteHeader){
    
    let quotationHeader = {
      WorkOrderId: (quoteHeader.workOrderId)?quoteHeader.workOrderId:quoteHeader.WorkOrderId,
      WorkFlowWorkOrderId: (quoteHeader.workFlowWorkOrderId)?quoteHeader.workFlowWorkOrderId:quoteHeader.WorkFlowWorkOrderId,
      openDate:quoteHeader.openDate,
      QuoteDueDate:this.quoteDueDate,
      ValidForDays:this.validFor,
      ExpirationDate: this.expirationDate,
      QuoteStatusId: quoteHeader.expirationDateStatus,
      CustomerId:quoteHeader.CustomerId,
      CurrencyId: Number(this.currency),
      AccountsReceivableBalance:this.accountsReceivableBalance,
      SalesPersonId:quoteHeader.SalesPersonId,
      EmployeeId:quoteHeader.EmployeeId,
      masterCompanyId:quoteHeader.masterCompanyId,
      createdBy:"admin",
      updatedBy:"admin",
      IsActive:true,
      IsDeleted:false,
      DSO: this.dso,
      Warnings: this.warnings,
      Memo: this.memo,
      creditLimit: this.creditLimit,
      creditTerm: this.creditTerm,
      customerContact: this.customerContact,
      customerEmail: this.customerEmail,
      customerName: this.customerName,
      customerPhone: this.customerPhone,
      customerReference: this.customerRef,
      employeeName: this.employeeName,
      salesPersonName: this.salesPerson,
        workOrderNumber: this.workOrderNumber,
        workOrderQuoteId:0
    }
    if(quoteHeader.quoteNumber){
      quotationHeader['quoteNumber'] = quoteHeader.quoteNumber;
    }
    if(this.quotationHeader !== undefined && this.quotationHeader['workOrderQuoteId'] !== undefined){
        quotationHeader['workOrderQuoteId'] = this.quotationHeader['workOrderQuoteId'];
    }
    this.quotationHeader = quotationHeader;
    return this.quotationHeader;
  }

  getWorkOrderInfo(getWorkOrderInfo){
    this.workOrderService.getWorkOrderById(getWorkOrderInfo).subscribe(res => {
      this.savedWorkOrderData = res;
      this.customerCode = res.customerDetails.customerId;
      this.customerName = res.customerDetails.customerName;
      this.customerContact = res.customerDetails.customerContact;
      this.customerRef = res.customerDetails.customerRef;
        this.csr = res.customerDetails.csrName;
        this.customerEmail = res.customerDetails.customerEmail;
        this.customerPhone = res.customerDetails.customerPhone;


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
      this.workOrderService.getWorkOrderQuoteDetail(res.workOrderId, res["workFlowWorkOrderId"])
      .subscribe(
        (res : any)=>{
          if(res){
            this.isEdit = true;
            this.setWorkOrderQuoteId(res['workOrderQuote']['workOrderQuoteId']);
            this.quotationHeader = this.formQuoteInfo(res.workOrderQuote);
            this.quotationHeader['workOrderQuoteId'] = res.workOrderQuote.workOrderQuoteId;
            this.dso = res.workOrderQuote.dso;
            this.validFor = res.workOrderQuote.validForDays;
            this.quoteForm = {...res.workOrderQuote, WorkOrderId: res.workOrderId,
              WorkFlowWorkOrderId: res["workFlowWorkOrderId"], quoteNumber: res.workOrderQuote.quoteNumber, expirationDateStatus: res.workOrderQuote.quoteStatusId};
            this.quoteDueDate = new Date(res.workOrderQuote.quoteDueDate);
            this.expirationDate = new Date(res.workOrderQuote.expirationDate);
            this.currency = res.workOrderQuote.currencyId;
            this.accountsReceivableBalance = res.workOrderQuote.accountsReceivableBalance;
            this.warnings = res.warnings;
            this.memo = res.memo;
            this.getQuoteTabData();

          }
        }
      )

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
            partNumber: x.partNumber,
            workOrderScopeId: x.workOrderScopeId
          },
          label: x.partNumber
        }
      })
    })
  }

  partNumberSelected(){
    this.gridActiveTab = '';
    this.clearQuoteData();
    this.savedWorkOrderData.partNumbers.forEach((pns)=>{
      if(this.selectedPartNumber == pns['description']){
        this.laborPayload.IsDER = this.exclusionPayload.IsDER = this.chargesPayload.IsDER = this.materialListPayload.IsDER = pns['isDER'];
        this.laborPayload.IsPMA = this.exclusionPayload.IsPMA = this.chargesPayload.IsPMA = this.materialListPayload.IsPMA = pns['isPMA'];
        this.laborPayload.ItemMasterId = this.exclusionPayload.ItemMasterId = this.chargesPayload.ItemMasterId = this.materialListPayload.ItemMasterId = pns['masterPartId'];
        this.laborPayload.CMMId = this.exclusionPayload.CMMId = this.chargesPayload.CMMId = this.materialListPayload.CMMId = pns['cmmId'];
        this.laborPayload.SelectedId = this.exclusionPayload.SelectedId = this.chargesPayload.SelectedId = this.materialListPayload.SelectedId = pns['id'];
        this.laborPayload.EstCompDate = this.exclusionPayload.EstCompDate = this.chargesPayload.EstCompDate = this.materialListPayload.EstCompDate = pns['estimatedCompletionDate'];
        this.laborPayload.StatusId = this.exclusionPayload.StatusId = this.chargesPayload.StatusId = this.materialListPayload.StatusId = pns['workOrderStatusId'];
      }
    })
    // for(let pn of this.mpnPartNumbersList){
    //   if(pn['label'] == this.selectedPartNumber){
    //     this._workflowService.getWorkFlowDataById(pn['value']['workflowId']).subscribe(data => {
    //     });
    //   }
    // }
  
  }

  getMPNDetails(workOrderId){
    this.workOrderService.getPartsDetail(workOrderId)
    .subscribe(
      (workOrderParts: partsDetail[])=>{
        this.workOrderPartsDetail = workOrderParts;
      }
    )
  }

  buildMethodSelected(buildType: string){
    this.selectedBuildMethod = buildType;
    this.gridActiveTab = '';
    this.selectedWorkFlowOrWorkOrder = undefined;
    var partId;
    var workScopeId;
    this.mpnPartNumbersList.forEach(element => {
      if(element['label'] == this.selectedPartNumber){
        partId = element['value']['masterPartId'];
        workScopeId = element['value']['workOrderScopeId'];
      }
      
    });
    if(buildType == 'use work flow'){
      this.workOrderService.getBuildDetailsFromWorkFlow(partId, workScopeId)
      .subscribe(
        (res: any[]) => {
          this.buildWorkOrderList = res;
        }
      )
    }
    else if(buildType == 'use historical wos'){
      this.workOrderService.getBuildDetailsFromHistoricalWorkOrder(partId, workScopeId)
      .subscribe(
        (res: any[]) => {
          this.buildHistoricalList = res;
        }
      )
    }
    
    
  }
  gridTabChange(value) {
    this.gridActiveTab = value;
    if(this.selectedBuildMethod == 'use historical wos' && this.selectedWorkFlowOrWorkOrder){
        this.clearQuoteData();
        if(value == 'materialList') {
          this.workOrderService.getWorkOrderMaterialListForQuote(this.selectedWorkFlowOrWorkOrder.workFlowWorkOrderId)
          .subscribe(
            (res: any[]) =>{
              this.materialListQuotation = res;
              this.workOrderMaterialList = res;
            }
          )
        }
        if(value ==  'labor') {
          this.savedWorkOrderData.workFlowWorkOrderId = 0;
          this.workOrderService.getWorkOrderLaborListForQuote(this.selectedWorkFlowOrWorkOrder.workFlowWorkOrderId)
          .subscribe(
            (res: any) =>{
              if(res){
                let laborList = this.labor.workOrderLaborList;
                this.labor = {...res, workOrderLaborList: laborList};
                this.taskList.forEach((tl)=>{
                  res.laborList.forEach((rt)=>{
                    if(rt['taskId'] == tl['taskId']){
                      if(this.labor.workOrderLaborList[0][tl['description'].toLowerCase()][0]['expertiseId'] == null && this.labor.workOrderLaborList[0][tl['description'].toLowerCase()][0]['employeeId'] == null){
                        this.labor.workOrderLaborList[0][tl['description'].toLowerCase()] = [];
                      }
                      let labor = {}
                      labor = {...rt, employeeId: {'label':rt.employeeName, 'value': rt.employeeId}}
                      this.labor.workOrderLaborList[0][tl['description'].toLowerCase()].push(labor);
                    }
                  })
                })
              }
              this.laborQuotation = res;
            }
          )
        }
        if(value == 'charges') {
          this.workOrderService.getWorkOrderChargesListForQuote(this.selectedWorkFlowOrWorkOrder.workFlowWorkOrderId)
          .subscribe(
            (res: any[]) =>{
              this.chargesQuotation = res;
              this.workOrderChargesList = res;
            }
          )
        }
        if(value == 'exclusions') {
          this.workOrderService.getWorkOrderExclutionsListForQuote(this.selectedWorkFlowOrWorkOrder.workFlowWorkOrderId)
          .subscribe(
            (res: any[]) =>{
              this.exclusionsQuotation = res;
              this.workOrderExclusionsList = res;
            }
          )
        }
    }
  }
  getQuoteInfo(data) {
    this.selectedWorkFlowOrWorkOrder = data;
    this.gridActiveTab = '';
    this.formTaskList();
    if(this.selectedBuildMethod == 'use work flow'){
      this.workOrderService.getWorkFlowDetails(data.workFlowId)
      .subscribe(
        res => {
          this.materialListQuotation = res['materialList'];
          this.workOrderMaterialList = res['materialList'];
          this.laborQuotation = res['expertise'];
          this.chargesQuotation, this.workOrderChargesList = res['charges'];
          this.exclusionsQuotation = res['exclusions'].map(exclusion=>{
            return {
              ...exclusion,
              epn: exclusion.partNumber,
              epnDescription: exclusion.partDescription
            }
          });
          this.workOrderExclusionsList = res['exclusions'].map(exclusion=>{
            return {
              ...exclusion,
              epn: exclusion.partNumber,
              epnDescription: exclusion.partDescription
            }
          });
          // this.labor.workOrderLaborList[0] = {};
          this.taskList.forEach((tl)=>{
            res['expertise'].forEach((rt)=>{
              if(rt['taskId'] == tl['taskId']){
                if(this.labor.workOrderLaborList[0][tl['description'].toLowerCase()][0]['expertiseId'] == null && this.labor.workOrderLaborList[0][tl['description'].toLowerCase()][0]['employeeId'] == null){
                  this.labor.workOrderLaborList[0][tl['description'].toLowerCase()] = [];
                }
                let labor = {}
                labor = {...rt, expertiseId: rt.expertiseTypeId, hours: rt.estimatedHours, employeeId: {'label':rt.employeeName, 'value': rt.employeeId}}
                this.labor.workOrderLaborList[0][tl['description'].toLowerCase()].push(labor);
              }
            })
          })
          this.labor.workFloworSpecificTaskorWorkOrder = 'workFlow';
          this.savedWorkOrderData.workFlowWorkOrderId = undefined;
        }
      )
    }
    else{
      this.clearQuoteData();
    }
  }

  clearQuoteData(){ 
    this.materialListQuotation = [];
    this.laborQuotation = [];
    this.chargesQuotation = [];
    this.exclusionsQuotation = [];
  }

  createMaterialQuote(){
    this.materialListPayload.BuildMethodId = this.getBuildMethodId();
    this.materialListPayload.WorkOrderQuoteMaterial = this.materialListQuotation.map(mList=>{
      if(mList.workOrderQuoteDetailsId && mList.workOrderQuoteDetailsId != 0){
        this.materialListPayload.WorkOrderQuoteDetailsId = mList.workOrderQuoteDetailsId
      }
      return {
                  "WorkOrderQuoteMaterialId":(mList.workOrderQuoteMaterialId)?mList.workOrderQuoteMaterialId:0,
                  "WorkOrderQuoteDetailsId":(mList.workOrderQuoteDetailsId)?mList.workOrderQuoteDetailsId:0,
                  "ItemMasterId":mList.itemMasterId,
                  "ConditionCodeId":mList.conditionCodeId,
                  "MandatoryOrSupplemental":mList.mandatoryOrSupplemental,
                  "ItemClassificationId":mList.itemClassificationId,
                  "Quantity":mList.quantity,
                  "UnitOfMeasureId":mList.unitOfMeasureId,
                  "UnitCost":mList.unitCost,
                  "ExtendedCost":mList.extendedCost,
                  "Price":mList.price,
                  "ExtendedPrice":mList.extendedPrice,
                  "Memo":mList.memo,
                  "IsDefered":mList.isDeferred,
                  "markupPercentageId":mList.markupPercentageId,
                  "TotalPartsCost":155,
                  "Markup":mList.markup,
                  "MaterialCostPlus":mList.materialCostPlus,
                  "FixedAmount":mList.fixedAmount,
                  "masterCompanyId":mList.masterCompanyId,
              "CreatedBy":"admin",
              "UpdatedBy":"admin",
              "IsActive":true,
              "IsDeleted":mList.isDeleted
                }
    })
    this.workOrderService.saveMaterialListQuote(this.materialListPayload)
    .subscribe(
      res => {
        this.materialListQuotation = res.workOrderQuoteMaterial;
        this.updateWorkOrderQuoteDetailsId(res.workOrderQuoteDetailsId);
        this.alertService.showMessage(
            this.moduleName,
            'Quotation for material list created successfully',
            MessageSeverity.success
        );
      }
    )
  }

  createLaborQuote(){
    this.workOrderService.saveLaborListQuote(this.laborPayload)
    .subscribe(
      res => {
        if(res){
          let laborList = this.labor.workOrderLaborList;
          this.labor = {...res.workOrderQuoteLaborHeader, workOrderLaborList: laborList};
          this.taskList.forEach((tl)=>{
            this.labor.workOrderLaborList[0][tl['description'].toLowerCase()] = [new AllTasks()];
            res.workOrderQuoteLaborHeader.workOrderQuoteLabor.forEach((rt)=>{
              if(rt['taskId'] == tl['taskId']){
                if(this.labor.workOrderLaborList[0][tl['description'].toLowerCase()][0]['expertiseId'] == null && this.labor.workOrderLaborList[0][tl['description'].toLowerCase()][0]['employeeId'] == null){
                  this.labor.workOrderLaborList[0][tl['description'].toLowerCase()] = [];
                }
                let labor = {}
                labor = {...rt, employeeId: {'label':rt.employeeName, 'value': rt.employeeId}}
                this.labor.workOrderLaborList[0][tl['description'].toLowerCase()].push(labor);
              }
            })
          })
        }
        this.updateWorkOrderQuoteDetailsId(res.workOrderQuoteDetailsId);
        this.alertService.showMessage(
          this.moduleName,
          'Quotation created  Succesfully',
          MessageSeverity.success
        );
      }
    )
  }

  createChargeQuote(data){
    this.chargesPayload.BuildMethodId = this.getBuildMethodId();
    this.chargesPayload.WorkOrderQuoteCharges = data.map(charge=>{
      if(charge.workOrderQuoteDetailsId && charge.workOrderQuoteDetailsId != 0){
        this.chargesPayload.WorkOrderQuoteDetailsId = charge.workOrderQuoteDetailsId
      }
      return {
        "WorkOrderQuoteChargesId":(charge.workOrderQuoteChargesId)?charge.workOrderQuoteChargesId:0,
        "WorkOrderQuoteDetailsId":(charge.workOrderQuoteDetailsId)?charge.workOrderQuoteDetailsId:0,
        "ChargesTypeId":charge.workflowChargeTypeId,
        "VendorId":charge.vendorId,
        "Quantity":charge.quantity,
        "RoNumberId":1,
        "InvoiceNo":"InvoiceNo 123456",
        "Amount":100,
        "MarkupPercentageId":charge.markupPercentageId,
        "ChargesCostPlus":charge.chargesCostPlus,
        "FixedAmount":charge.fixedAmount,
        "Description":charge.description,
        "UnitCost":charge.unitCost,
        "ExtendedCost":charge.extendedCost,
        "UnitPrice":charge.unitPrice,
        "ExtendedPrice":charge.extendedPrice,
        "masterCompanyId":charge.masterCompanyId,
        "CreatedBy":"admin",
        "UpdatedBy":"admin",
        "IsActive":true,
        "IsDeleted":charge.isDeleted
      }
    })
    this.workOrderService.saveChargesQuote(this.chargesPayload)
    .subscribe(
      res => {
        this.workOrderChargesList = res.workOrderQuoteCharges;
        this.updateWorkOrderQuoteDetailsId(res.workOrderQuoteDetailsId);
        this.alertService.showMessage(
          this.moduleName,
          'Quotation created  Succesfully',
          MessageSeverity.success
        );
      }
    )
  }
  createExclusionsQuote(){
    this.workOrderService.saveExclusionsQuote(this.exclusionsQuotation)
    .subscribe(
      res => {
        this.workOrderExclusionsList = res.workOrderQuoteExclusions;
        this.updateWorkOrderQuoteDetailsId(res.workOrderQuoteDetailsId);
        console.log(res);
      }
    )
  }

  getTaskList() {
    if (this.labor == undefined) {
        this.labor = new WorkOrderLabor()
    }
    this.labor.workOrderLaborList = [];
    this.labor.workOrderLaborList.push({})
    this.workorderMainService.getAllTasks()
        .subscribe(
            (taskList) => {
                this.labor.workOrderLaborList[0] = {}
                this.taskList = taskList;
                this.formTaskList();
            },
            (error) => {
                console.log(error);
            }
        )
}

formTaskList(){
  this.taskList.forEach(task => {
      this.labor.workOrderLaborList[0][task.description.toLowerCase()] = [new AllTasks()];
  });
}

saveworkOrderLabor(data) {
  console.log(data);
  this.laborPayload.BuildMethodId = this.getBuildMethodId();
  this.laborPayload.WorkOrderQuoteLaborHeader.WorkOrderQuoteLaborHeaderId = data.workOrderLaborHeaderId;
  this.laborPayload.WorkOrderQuoteLaborHeader.WorkOrderQuoteDetailsId = 0;
  if(this.laborPayload.WorkOrderQuoteLaborHeader['workOrderQuoteDetailsId']){
    this.laborPayload.WorkOrderQuoteDetailsId = this.laborPayload.WorkOrderQuoteLaborHeader['workOrderQuoteDetailsId'];
  }
  
  this.laborPayload.WorkOrderQuoteLaborHeader.DataEnteredBy = data.dataEnteredBy;
  this.laborPayload.WorkOrderQuoteLaborHeader.HoursorClockorScan = data.hoursorClockorScan;
  this.laborPayload.WorkOrderQuoteLaborHeader.IsTaskCompletedByOne = data.isTaskCompletedByOne;
  this.laborPayload.WorkOrderQuoteLaborHeader.WorkOrderHoursType = 1;
  this.laborPayload.WorkOrderQuoteLaborHeader.LabourMemo = "";
  this.laborPayload.WorkOrderQuoteLaborHeader.EmployeeId = data.employeeId;
  this.laborPayload.WorkOrderQuoteLaborHeader.ExpertiseId = data.expertiseId;
  this.laborPayload.WorkOrderQuoteLaborHeader.TotalWorkHours = data.totalWorkHours
  this.laborPayload.WorkOrderQuoteLaborHeader.masterCompanyId = data.masterCompanyId; 
  this.laborPayload.WorkOrderQuoteLaborHeader.CreatedBy = "admin"
  this.laborPayload.WorkOrderQuoteLaborHeader.UpdatedBy = "admin" 
  this.laborPayload.WorkOrderQuoteLaborHeader.IsActive = true 
  this.laborPayload.WorkOrderQuoteLaborHeader.IsDeleted = false;
  var laborList = [];
  for (let labor in data.workOrderLaborList){
    laborList = [...laborList, ...data.workOrderLaborList[labor]];
  }
  this.laborPayload.WorkOrderQuoteLaborHeader.WorkOrderQuoteLabor = []
  laborList.forEach((labor)=>{
    if(labor.expertiseId){
      this.laborPayload.WorkOrderQuoteLaborHeader.WorkOrderQuoteLabor.push({
        "WorkOrderQuoteLaborId":(labor.workOrderQuoteLaborId)?labor.workOrderQuoteLaborId:0,
        "WorkOrderQuoteLaborHeaderId":(labor.workOrderQuoteLaborHeaderId)?labor.workOrderQuoteLaborHeaderId:0,
        "ExpertiseId":labor.expertiseId,
        "EmployeeId":labor.employeeId,
        "BillableId":labor.billableId,
        "Hours":labor.hours,
        "Adjustments":labor.adjustments,
        "AdjustedHours":labor.adjustedHours,
        "Memo":labor.memo,
        "TaskId":labor.taskId,
        "LabourCostPlus": labor.labourCostPlus,
        "laborOverheadCost": labor.laborOverheadCost,
        "markupPercentageId": labor.markupPercentageId,
        "directLaborOHCost": labor.directLaborOHCost,
        "CreatedBy":"admin",
        "UpdatedBy":"admin",
        "IsActive":true,
        "IsDeleted":labor.isDeleted
    })
    }
  })
  // this.laborPayload.WorkOrderQuoteLaborHeader.WorkOrderQuoteLabor = laborList.map((labor)=>{
  //     return {
  //         "WorkOrderQuoteLaborId":0,
  //         "WorkOrderQuoteLaborHeaderId":0,
  //         "ExpertiseId":labor.expertiseId,
  //         "EmployeeId":labor.employeeId,
  //         "BillableId":labor.billableId,
  //         "Hours":labor.hours,
  //         "Adjustments":labor.adjustments,
  //         "AdjustedHours":labor.adjustedHours,
  //         "Memo":labor.memo,
  //         "TaskId":labor.taskId,
  //         "LabourCostPlus": labor.costPlusAmount,
  //         "FixedAmount": labor.fixedAmount,
  //         "laborOverheadCost": labor.laborOverheadCost,
  //         "markupPercentageId": labor.markupPercentageId,
  //         "CreatedBy":"admin",
  //         "UpdatedBy":"admin",
  //         "IsActive":true,
  //         "IsDeleted":labor.isDeleted
  //     }
  // }) 

  this.createLaborQuote();
}

getBuildMethodId(){
  if(this.selectedBuildMethod === 'use work flow') return 1;
  else if(this.selectedBuildMethod === 'use historical wos') return 2;
  else if(this.selectedBuildMethod === 'build from scratch') return 3;
  else if(this.selectedBuildMethod === 'display 3rd party') return 4;
}

saveWorkOrderExclusionsList(data) {
  this.exclusionPayload.BuildMethodId = this.getBuildMethodId();
  this.exclusionPayload.WorkOrderQuoteExclusions = data.map(ex=>{
    if(ex.workOrderQuoteDetailsId && ex.workOrderQuoteDetailsId != 0){
      this.exclusionPayload.WorkOrderQuoteDetailsId = ex.workOrderQuoteDetailsId;
    }
    return {
      "WorkOrderQuoteExclusionsId":ex.workOrderQuoteExclusionsId?ex.workOrderQuoteExclusionsId:0,
      "WorkOrderQuoteDetailsId":ex.workOrderQuoteDetailsId?ex.workOrderQuoteDetailsId:0,
      "ItemMasterId":ex.itemMasterId,
      "SourceId":1,
      "Reference":2,
      "ExstimtPercentOccuranceId":ex.estimtPercentOccurrance,
      "Memo":ex.memo,
      "Quantity":ex.quantity,
      "UnitCost":ex.unitCost,
      "ExtendedCost":ex.extendedCost,
      "MarkUpPercentageId":ex.markupPercentageId,
      "CostPlusAmount":ex.CostPlusAmount,
      "FixedAmount":ex.fixedAmount,
      "masterCompanyId":ex.masterCompanyId,
      "CreatedBy":"admin",
      "UpdatedBy":"admin",
      "IsActive":true,
      "IsDeleted":ex.isDeleted
    }
  })
  this.workOrderService.saveExclusionsQuote(this.exclusionPayload)
    .subscribe(
      res => {
        this.alertService.showMessage(
          this.moduleName,
          'Quotation created  Succesfully',
          MessageSeverity.success
        );
      }
    )
  console.log(data);
}

updateWorkOrderExclusionsList(data) {
  const exclusionsArr = data.exclusions.map(x => {
      return {
          ...x,
          masterCompanyId: 1,
          isActive: true,
          workOrderId: this.workOrderId, workFlowWorkOrderId: this.workFlowWorkOrderId
      }
  });
  this.workorderMainService.updateWorkOrderExclusionList(exclusionsArr).subscribe(res => {
      this.workFlowObject.materialList = [];
      this.alertService.showMessage(
          this.moduleName,
          'Update Work Order Exclusions  Succesfully',
          MessageSeverity.success
      );
      this.getExclusionListByWorkOrderId();
  })
}

getExclusionListByWorkOrderId(){
  if (this.workFlowWorkOrderId !== 0 && this.workOrderId) {
    this.workorderMainService.getWorkOrderExclusionsList(this.workFlowWorkOrderId, this.workOrderId).subscribe(res => {
        this.workFlowObject.materialList = [];
        this.workOrderExclusionsList = res;
    })

  }
}

saveWorkOrderChargesList(data){
  console.log(data);
  this.workOrderChargesList = [...this.workOrderChargesList, ...data['charges']];
}

saveMaterialListForWO(data){
  if(!this.editMatData || this.editMatData.length == 0){
    this.materialListQuotation = [...this.materialListQuotation, ...data['materialList']];
  }
  else {
    this.editMatData = [];
  }
  $('#addNewMaterials').modal('hide');
}

getMarkup(){
  this.commonService.smartDropDownList('[Percent]', 'PercentId', 'PercentValue')
  .subscribe(
    res=>{
      this.markupList = res;
    }
  )
}

loadCurrency(){
  this.commonService.smartDropDownList('Currency', 'CurrencyId', 'symbol').subscribe(
    results => this.currencyList = results,
    error => {}
);
}

markupChanged(matData){
  try{
    this.markupList.forEach((markup)=>{
      if(markup.value == matData.markup){
        matData.materialCostPlus = (matData.quantity * matData.unitCost) + ( ((matData.quantity * matData.unitCost)/100) *  Number(markup.label))
      }
    })
  }
  catch(e){
    console.log(e);
  }
}

saveBuildFromScratch(data){
  console.log(data);
}

editMaterialList(matData, index){
  this.editMatData = [matData];
}

deleteMaterialList(index){
  this.materialListQuotation[index].isDeleted = true;
}
updateWorkOrderChargesList(data){
  console.log(data);
}
checkValidQuote(){
  if(this.quoteDueDate && this.validFor && this.currency && this.dso)
  {
    return false;
  }
  else{
    return true;
  }
}

updateWorkOrderQuoteDetailsId(id){
  this.laborPayload.WorkOrderQuoteDetailsId = id;
  this.chargesPayload.WorkOrderQuoteDetailsId = id;
  this.exclusionPayload.WorkOrderQuoteDetailsId = id;
  this.materialListPayload.WorkOrderQuoteDetailsId = id; 
}
setWorkOrderQuoteId(id){
  this.laborPayload.WorkOrderQuoteId = id;
  this.exclusionPayload.WorkOrderQuoteId = id;
  this.chargesPayload.WorkOrderQuoteId = id;
  this.materialListPayload.WorkOrderQuoteId = id;;
  
}

getQuoteTabData() {
  // if(this.workOrderQuoteId){
  this.getQuoteExclusionListByWorkOrderQuoteId();
  this.getQuoteMaterialListByWorkOrderQuoteId();
  this.getQuoteChargesListByWorkOrderQuoteId();
  this.getQuoteLaborListByWorkOrderQuoteId();

  // this.calculateTotalWorkOrderCost();

  // }

}
getQuoteExclusionListByWorkOrderQuoteId() {
  this.workOrderService.getQuoteExclusionList(this.quotationHeader['workOrderQuoteId']).subscribe(res => {
      this.workOrderExclusionsList = res;
  })
}
getQuoteMaterialListByWorkOrderQuoteId() {
  this.workOrderService.getQuoteMaterialList(this.quotationHeader['workOrderQuoteId']).subscribe(res => {
      this.materialListQuotation = res;
  })
}
 getQuoteChargesListByWorkOrderQuoteId() {
  this.workOrderService.getQuoteChargesList(this.quotationHeader['workOrderQuoteId']).subscribe(res => {
      this.workOrderChargesList = res;
  })
}
 getQuoteLaborListByWorkOrderQuoteId() {
  this.workOrderService.getQuoteLaborList(this.quotationHeader['workOrderQuoteId']).subscribe(res => {
      if (res) {
          // this.workOrderLaborList = res;
          this.laborPayload.WorkOrderQuoteLaborHeader = res;
          if(res){
            let laborList = this.labor.workOrderLaborList;
            this.labor = {...res, workOrderLaborList: laborList};
            this.taskList.forEach((tl)=>{
              res.laborList.forEach((rt)=>{
                if(rt['taskId'] == tl['taskId']){
                  if(this.labor.workOrderLaborList[0][tl['description'].toLowerCase()][0]['expertiseId'] == null && this.labor.workOrderLaborList[0][tl['description'].toLowerCase()][0]['employeeId'] == null){
                    this.labor.workOrderLaborList[0][tl['description'].toLowerCase()] = [];
                  }
                  let labor = {}
                  labor = {...rt, employeeId: {'label':rt.employeeName, 'value': rt.employeeId}}
                  this.labor.workOrderLaborList[0][tl['description'].toLowerCase()].push(labor);
                }
              })
            })
          }
      }

  })

}
}
