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
  selectedHistoricalList: any;
  workOrderLaborList: any;
  labor = new WorkOrderLabor();
  taskList: any;
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
  markupList: any;
  workFlowObject = {
    materialList: [],
    equipments: [],
    charges: [],
    exclusions: []
}
isQuote: boolean = true;




  constructor(private router: ActivatedRoute,private workOrderService: WorkOrderQuoteService, private commonService: CommonService, private _workflowService: WorkFlowtService, private alertService:AlertService, private workorderMainService: WorkOrderService) {}
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
    if(this.quotationHeader == undefined || this.quotationHeader.workOrderQuoteId == undefined){
      this.formQuoteInfo()
    }
    this.workOrderService.createOrUpdateQuotation(this.quotationHeader)
    .subscribe(
      res=>{
        this.quotationHeader = res;
        this.quoteForm.quoteNumber = res['quoteNumber'];
        this.laborPayload.WorkOrderQuoteId = this.exclusionPayload.WorkOrderQuoteId = this.chargesPayload.WorkOrderQuoteId = this.materialListPayload.WorkOrderQuoteId = res['workOrderQuoteId'];
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

  formQuoteInfo(){
    this.quotationHeader = {
      WorkOrderId: this.quoteForm.WorkOrderId,
      WorkFlowWorkOrderId: this.quoteForm.WorkFlowWorkOrderId,
      openDate:this.quoteForm.openDate,
      QuoteDueDate:this.quoteDueDate,
      ValidForDays:this.validFor,
        ExpirationDate: this.expirationDate,
        QuoteStatusId: this.quoteForm.expirationDateStatus,
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
    if(this.selectedBuildMethod == 'use historical wos' && this.selectedHistoricalList){
        this.clearQuoteData();
        if(value == 'materialList') {
          this.workOrderService.getWorkOrderMaterialListForQuote(this.selectedHistoricalList.workFlowWorkOrderId)
          .subscribe(
            (res: any[]) =>{
              this.materialListQuotation = res;
              this.workOrderMaterialList = res;
            }
          )
        }
        if(value ==  'labor') {
          this.workOrderService.getWorkOrderLaborListForQuote(this.selectedHistoricalList.workFlowWorkOrderId)
          .subscribe(
            (res: any) =>{
              this.labor = {...res, workOrderLaborList: [{}]};
              this.taskList.forEach((tl)=>{
                this.labor.workOrderLaborList[0][tl['description'].toLowerCase()] = [];
                res.laborList.forEach((rt)=>{
                  if(rt['taskId'] == tl['taskId']){
                    let labor = {}
                    labor = {...rt, expertiseId: rt.expertiseTypeId, hours: rt.estimatedHours}
                    this.labor.workOrderLaborList[0][tl['description'].toLowerCase()].push(labor);
                  }
                })
              })
              this.laborQuotation = res;
            }
          )
        }
        if(value == 'charges') {
          this.workOrderService.getWorkOrderChargesListForQuote(this.selectedHistoricalList.workFlowWorkOrderId)
          .subscribe(
            (res: any[]) =>{
              this.chargesQuotation = res;
              this.workOrderChargesList = res;
            }
          )
        }
        if(value == 'exclusions') {
          this.workOrderService.getWorkOrderExclutionsListForQuote(this.selectedHistoricalList.workFlowWorkOrderId)
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
    this.gridActiveTab = '';
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
          this.labor.workOrderLaborList[0] = {};
          this.taskList.forEach((tl)=>{
            this.labor.workOrderLaborList[0][tl['description'].toLowerCase()] = [];
            res['expertise'].forEach((rt)=>{
              if(rt['taskId'] == tl['taskId']){
                let labor = {}
                labor = {...rt, expertiseId: rt.expertiseTypeId, hours: rt.estimatedHours}
                this.labor.workOrderLaborList[0][tl['description'].toLowerCase()].push(labor);
              }
            })
          })
        }
      )
    }
    else{
      this.selectedHistoricalList = data;
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
    this.materialListPayload.WorkOrderQuoteMaterial = this.materialListQuotation.map(mList=>{
      return {
                  "WorkOrderQuoteMaterialId":0,
                  "WorkOrderQuoteDetailsId":0,
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
                  "MatMarkup":1,
                  "TotalPartsCost":155,
                  "Markup":mList.markup,
                  "CostPlusAmount":mList.quantity * mList.unitCost,
                  "FixedAmount":mList.masterCompanyId,
                  "masterCompanyId":mList.masterCompanyId,
              "CreatedBy":"admin",
              "UpdatedBy":"admin",
              "IsActive":true,
              "IsDeleted":false
                }
    })
    this.workOrderService.saveMaterialListQuote(this.materialListPayload)
    .subscribe(
      res => {
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
        this.alertService.showMessage(
          this.moduleName,
          'Quotation created  Succesfully',
          MessageSeverity.success
        );
      }
    )
  }

  createChargeQuote(data){
    this.chargesPayload.WorkOrderQuoteCharges = data.map(charge=>{
      return {
        "WorkOrderQuoteChargesId":0,
        "WorkOrderQuoteDetailsId":0,
        "ChargesTypeId":charge.workflowChargeTypeId,
        "VendorId":charge.vendorId,
        "Quantity":charge.quantity,
        "RoNumberId":1,
        "InvoiceNo":"InvoiceNo 123456",
        "Amount":100,
        "MarkupPercentageId":1,
        "CostPlusAmount":charge.quantity*charge.unitPrice,
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
        "IsDeleted":false
      }
    })
    this.workOrderService.saveChargesQuote(this.chargesPayload)
    .subscribe(
      res => {
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
                this.taskList.forEach(task => {
                    this.labor.workOrderLaborList[0][task.description.toLowerCase()] = [new AllTasks()];
                });
            },
            (error) => {
                console.log(error);
            }
        )
}

saveworkOrderLabor(data) {
  console.log(data);
  this.laborPayload.WorkOrderQuoteLaborHeader.WorkOrderQuoteLaborHeaderId = data.workOrderLaborHeaderId;
  this.laborPayload.WorkOrderQuoteLaborHeader.WorkOrderQuoteDetailsId = 0;
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
  this.laborPayload.WorkOrderQuoteLaborHeader.WorkOrderQuoteLabor = laborList.map((labor)=>{
    return {
        "WorkOrderQuoteLaborId":0,
		 		"WorkOrderQuoteLaborHeaderId":0,
		 		"ExpertiseId":labor.expertiseId,
		 		"EmployeeId":labor.employeeId,
		 		"BillableId":labor.billableId,
		 		"Hours":labor.hours,
		 		"Adjustments":labor.adjustments,
		 		"AdjustedHours":labor.adjustedHours,
		 		"Memo":labor.memo,
		 		"TaskId":labor.taskId,
		 		"CreatedBy":"admin",
        "UpdatedBy":"admin",
        "IsActive":true,
        "IsDeleted":false
    }
  }) 
  this.createLaborQuote();
}

saveWorkOrderExclusionsList(data) {
  this.exclusionPayload.WorkOrderQuoteExclusions = data.map(ex=>{
    return {
      "WorkOrderQuoteExclusionsId":0,
      "WorkOrderQuoteDetailsId":0,
      "ItemMasterId":ex.itemMasterId,
      "SourceId":1,
      "Reference":2,
      "ExstimtPercentOccuranceId":ex.estimtPercentOccurrance,
      "Memo":ex.memo,
      "Quantity":ex.quantity,
      "UnitCost":ex.unitCost,
      "ExtendedCost":ex.extendedCost,
      "MarkUpPercentageId":1,
      "CostPlusAmount":20,
      "FixedAmount":25,
      "masterCompanyId":ex.masterCompanyId,
      "CreatedBy":"admin",
      "UpdatedBy":"admin",
      "IsActive":true,
      "IsDeleted":false
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
  this.materialListQuotation = [...this.materialListQuotation, ...data['materialList']];
  $('#addNewMaterials').modal('hide');
}

getMarkup(){
  this.commonService.smartDropDownList('MarkUpPercentage', 'MarkUpPercentageId', 'MarkupValue')
  .subscribe(
    res=>{
      this.markupList = res;
    }
  )
}

markupChanged(matData){
  try{
    this.markupList.forEach((markup)=>{
      if(markup.value == matData.markup){
        matData.costPlusAmount = (matData.quantity * matData.unitCost) + ( ((matData.quantity * matData.unitCost)/100) *  Number(markup.label))
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
}
