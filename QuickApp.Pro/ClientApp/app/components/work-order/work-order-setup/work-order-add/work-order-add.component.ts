import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { PageHeaderComponent } from '../../../../shared/page-header.component';
import * as $ from 'jquery';
import { WorkOrder } from '../../../../models/work-order.model';
import { WorkOrderPartNumber } from '../../../../models/work-order-partnumber.model';
import { CreditTerms } from '../../../../models/credit-terms.model';
import {
  WorkOrderType,
  WorkOrderStatus,
  WorkScope,
  WorkOrderStage
} from '../../../../models/work-order-type.model';
import { Customer } from '../../../../models/customer.model';
import {
  AlertService,
  MessageSeverity
} from '../../../../services/alert.service';
import { workOrderGeneralInfo } from '../../../../models/work-order-generalInformation.model';
import { addressesForm } from '../../../../models/work-order-address.model';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { CreditTermsService } from '../../../../services/Credit Terms.service';
import { CustomerService } from '../../../../services/customer.service';
import { EmployeeService } from '../../../../services/employee.service';
import { StocklineService } from '../../../../services/stockline.service';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { WorkOrderPartNumberService } from '../../../../services/work-order/work-order-part-number.service';
import { Documents } from '../../../../models/work-order-documents.modal';
import { WorkOrderQuote } from '../../../../models/work-order-quote.modal';
import {
  WorkOrderLabor,
  AllTasks
} from '../../../../models/work-order-labor.modal';
import { CommonService } from '../../../../services/common.service';
import { validateRecordExistsOrNot, selectedValueValidate, getValueFromObjectByKey, getObjectById, getObjectByValue, editValueAssignByCondition } from '../../../../generic/autocomplete';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { WorkFlowtService } from '../../../../services/workflow.service';

@Component({
  selector: 'app-work-order-add',
  templateUrl: './work-order-add.component.html',
  styleUrls: ['./work-order-add.component.scss'],
  animations: [fadeInOut]
})
/** WorkOrderAdd component*/
export class WorkOrderAddComponent implements OnInit {
  // workOrder: WorkOrder;
  // workOrderPartNumbers: WorkOrderPartNumber[];

  @Input() isEdit;
  @Input() workOrderTypes;
  @Input() workOrderStatusList;
  @Input() creditTerms;
  @Input() employeesOriginalData;
  @Input() workScopesList;
  @Input() workOrderStagesList;
  @Input() priorityList;
  @Input() partNumberOriginalData;
  @Input() workOrderGeneralInformation;
  // @Output() viewWorkFlow = new EventEmitter();

  // workOrderTypes: WorkOrderType[];
  // workOrderStatusList: any;
  // workScopesList: any;
  // workOrderStagesList: any;
  // creditTerms: any;
  // customers: Customer[];
  selectedCustomer: Customer;
  selectedEmployee: any;
  selectedsalesPerson: any;
  customerNamesList: any;
  filteredCustomerNames: any[];
  customerCodes: any[];
  filteredCustomerCode: any[];
  employeeNames: any[];
  filteredEmployeeNames: any[];
  // employeesOriginalData: any;
  customersOriginalData: any;
  contactInfo: any;
  sourceVendor: any;
  mpnFlag: boolean;
  isDetailedView: boolean;
  selectedRadioButtonValue: boolean;
  moduleName: string;
  showTableGrid: Boolean = false;
  worflowId = [];
  isContract = true;
  gridActiveTab: String = 'workFlow';
  subTabWorkFlow: String;
  // WorkOrder general Information Object Modal

  // Address Information Object Modal
  addresses: addressesForm;
  // Document Object Modal
  documents: Documents[] = [];
  // quote Object Modal
  quote: WorkOrderQuote;
  // labor Object Modal
  labor: WorkOrderLabor;
  isWorkOrder: boolean = true;

  workFlowList: any;

  technicalStationsList = [
    {
      label: 'Station 1',
      value: 20
    }
  ]
  tearDownReportList = [{
    label: 'Station 2',
    value: 20
  }]
  WorkOrderMPN = { ...new WorkOrderPartNumber() };
  employeeList: any[];
  salesPersonList: any[];
  technicianList: any[];
  partNumberList: any;
  // partNumberOriginalData: any;
  // revisedPartOriginalData: any;
  // revisedPartNumberList: any;
  // stockLineList: any;
  // conditionList: any;
  cmmList: any;
  // priorityList: Object;
  savedWorkOrderData: any;
  workFlowWorkOrderData: any;
  workOrderAssetList: any;
  workOrderId;
  workFlowWorkOrderId: any = 0;
  workOrderMaterialList: any;
  mpnPartNumbersList: any = [];
  stockLineList: any;
  workOrderWorkFlowOriginalData: any;
  isDisabledSteps: boolean = false;
  workFlowId: any;
  editWorkFlowData: any;
  workFlowObject = {
    materialList: []
  }
  materialStatus: any;


  constructor(
    private alertService: AlertService,
    private workOrderService: WorkOrderService,
    private creditTermsService: CreditTermsService,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private itemMasterService: ItemMasterService,
    private workOrderPartNumberService: WorkOrderPartNumberService,
    private stocklineService: StocklineService,
    private commonService: CommonService,
    private authService: AuthService,
    private acRouter: ActivatedRoute,
    private workFlowtService: WorkFlowtService,

  ) {
    // this.workOrderPartNumbers = [];
    // this.workOrder = new WorkOrder();
    // this.workOrder.isSinglePN = true;
    // this.workOrder.customerContactId = 68;
    // this.workOrder.masterCompanyId = 1;
    this.moduleName = 'Work Order';
  }

  async ngOnInit() {
    //  this.showTableGrid = true;
    this.mpnFlag = true;
    this.isDetailedView = true;
    this.selectedCustomer = new Customer();
    // this.getAllWorkOrderTypes();
    // this.getAllWorkOrderStatus();
    // this.getAllCreditTerms();
    // // this.getAllCustomers();
    // this.getAllEmployees();
    // this.getAllWorkScpoes();
    // this.getAllWorkOrderStages();
    // this.getMultiplePartsNumbers();
    // this.getAllPriority();
    // this.getStockLines();
    if (!this.isEdit) {

      this.addMPN();
      this.getAllGridModals();
    } else {
      const data = this.workOrderGeneralInformation;
      this.workOrderGeneralInformation = {
        ...data,
        workOrderTypeId: String(data.workOrderTypeId),
        customerReference: data.customerDetails.customerRef,
        csr: data.customerDetails.csrName,
        customerId: data.customerDetails,
        partNumbers: data.partNumbers.map((x, index) => {

          this.getRevisedpartNumberByItemMasterId(x.masterPartId, index);
          this.getStockLineByItemMasterId(x.masterPartId, x.conditionId, index);
          this.getConditionByItemMasterId(x.masterPartId, index);
          return {
            ...x,
            masterPartId: getObjectById('itemMasterId', x.masterPartId, this.partNumberOriginalData),
            mappingItemMasterId: getObjectById('mappingItemMasterId', x.mappingItemMasterId, x.revisedParts),
          }

        })
      }
      this.showTableGrid = true;
      this.workFlowWorkOrderId = data.workFlowWorkOrderId;
      this.workOrderId = data.workOrderId;
      this.savedWorkOrderData = this.workOrderGeneralInformation;
      this.getWorkOrderWorkFlowNos();

    }


  }



  get userName(): string {
    return this.authService.currentUser ? this.authService.currentUser.userName : "";
  }


  // create all Forms in the Grid
  getAllGridModals() {
    this.gridActiveTab = 'workFlow';
    this.addresses = new addressesForm();
    this.documents = [new Documents()];
    this.quote = new WorkOrderQuote();
    this.labor = new WorkOrderLabor();
    // adding Form Object Dynamically
    this.generateLaborForm();
  }

  generateLaborForm() {
    const keysArray = Object.keys(this.labor.workOrderLaborList[0]);
    for (let i = 0; i < keysArray.length; i++) {
      this.labor = {
        ...this.labor,
        workOrderLaborList: [{ ...this.labor.workOrderLaborList[0], [keysArray[i]]: [new AllTasks()] }]
      };
    }
    console.log(this.labor);
  }








  // getAllWorkOrderTypes(): void {
  //   this.workOrderService.getAllWorkOrderTypes().subscribe(
  //     result => {
  //       this.workOrderTypes = result;
  //     }
  //   );
  // }

  // getAllWorkOrderStatus(): void {
  //   this.commonService.smartDropDownList('WorkOrderStatus', 'ID', 'Description').subscribe(res => {
  //     this.workOrderStatusList = res.sort(function (a, b) { return a.value - b.value; });
  //   })
  // }

  // getAllCreditTerms(): void {
  //   this.commonService.smartDropDownList('CreditTerms', 'CreditTermsId', 'Name').subscribe(res => {
  //     this.creditTerms = res;
  //   })
  // }

  // getAllCustomers(): void {
  //   this.customerService.getAllCustomersInfo().subscribe(
  //     result => {
  //       this.customersOriginalData = result;
  //     }
  //   );
  // }

  filterCustomerName(event) {
    const value = event.query.toLowerCase()
    this.commonService.getCustomerNameandCode(value).subscribe(res => {
      this.customerNamesList = res;
    })
  }

  selectCustomer(object, currentRecord) {
    currentRecord.customerReference = object.customerRef,
      currentRecord.csr = object.csrName;
    currentRecord.creditLimit = object.creditLimit;
    currentRecord.creditTermsId = object.creditTermsId;

  }

  clearautoCompleteInput(currentRecord, field) {
    currentRecord[field] = null;
  }


  // async getAllEmployees() {
  //   await this.commonService.smartDropDownList('Employee', 'EmployeeId', 'FirstName').subscribe(res => {
  //     this.employeesOriginalData = res;
  //   })
  // }


  filterEmployee(event): void {

    this.employeeList = this.employeesOriginalData;

    if (event.query !== undefined && event.query !== null) {
      const employee = [...this.employeesOriginalData.filter(x => {
        return x.label.toLowerCase().includes(event.query.toLowerCase())
      })]
      this.employeeList = employee;
    }
  }

  filterSalesPerson(event): void {

    this.salesPersonList = this.employeesOriginalData;

    if (event.query !== undefined && event.query !== null) {
      const salesPerson = [...this.employeesOriginalData.filter(x => {
        return x.label.toLowerCase().includes(event.query.toLowerCase())
      })]
      this.salesPersonList = salesPerson;
    }

  }

  filterTechnician(event): void {

    this.technicianList = this.employeesOriginalData;

    if (event.query !== undefined && event.query !== null) {
      const technician = [...this.employeesOriginalData.filter(x => {
        return x.label.toLowerCase().includes(event.query.toLowerCase())
      })]
      this.technicianList = technician;
    }
  }


  // getAllWorkScpoes(): void {
  //   this.workOrderService.getAllWorkScopes().subscribe(
  //     result => {
  //       this.workScopesList = result.map(x => {
  //         return {
  //           label: x.description,
  //           value: x.workScopeId
  //         }
  //       })
  //     }
  //   );
  // }

  // getAllWorkOrderStages(): void {
  //   this.commonService.smartDropDownList('WorkOrderStage', 'ID', 'Description').subscribe(res => {
  //     this.workOrderStagesList = res;
  //   })
  // }

  // getAllPriority() {
  //   this.commonService.smartDropDownList('Priority', 'PriorityId', 'Description').subscribe(res => {
  //     this.priorityList = res;
  //   })
  // }




  toggleDisplayMode(): void {
    this.isDetailedView = !this.isDetailedView;
  }
  // Handles radio Button single or Multiple
  toggleWorkOrderType(value): void {
    console.log(value);

    // this.workOrderGeneralInformation.isSinglePN = value;
    this.showTableGrid = false;
    this.getAllGridModals();
  }
  // Handles type of the WorkOrder Dealer
  woDealerChange(value) {
    this.workOrderGeneralInformation.workOrderTypeId = value;
  }
  // added new MPN
  addMPN() {
    this.workOrderGeneralInformation.partNumbers.push(new WorkOrderPartNumber());
  }
  // subtab in grid change
  subTabWorkFlowChange(value) {

    this.subTabWorkFlow = value;

    if (value === 'editworkFlow') {
      this.editWorkFlowData = undefined;
      this.workFlowtService.getWorkFlowDataByIdForEdit(this.workFlowId).subscribe(res => {
        console.log(res);

        this.workFlowtService.listCollection = res[0];
        this.workFlowtService.enableUpdateMode = true;
        this.workFlowtService.currentWorkFlowId = res.workflowId;
        this.editWorkFlowData = res;

      })

    }



    // if(value === 'viewworkFlow'){
    //   this.viewWorkFlow.emit(this.workFlowWorkOrderId)
    // }
    this.gridActiveTab = '';
  }

  deleteMPN(index) {
    this.workOrderGeneralInformation.partNumber = this.workOrderGeneralInformation.partNumber.splice(index, 1);
  }


  saveWorkOrder(): void {
    this.mpnPartNumbersList = [];
    // this.showTableGrid = true; // Show Grid Boolean
    const generalInfo = this.workOrderGeneralInformation;
    const data = {
      ...generalInfo,
      customerId: getValueFromObjectByKey('customerId', generalInfo.customerId),
      employeeId: getValueFromObjectByKey('value', generalInfo.employeeId),
      salesPersonId: getValueFromObjectByKey('value', generalInfo.salesPersonId),
      masterCompanyId: 1,
      customerContactId: 68,
      createdBy: this.userName,
      updatedBy: this.userName,
      partNumbers: generalInfo.partNumbers.map(x => {
        // if (this.workOrderGeneralInformation.isSinglePN == false) {
        //   this.mpnPartNumbersList.push({ label: x.masterPartId.partNumber, value: x.workflowId })
        // }


        return {
          ...x,

          masterPartId: getValueFromObjectByKey('itemMasterId', x.masterPartId),
          // mappingItemMasterId: getValueFromObjectByKey('itemMasterId', x.masterPartId),
          mappingItemMasterId: getValueFromObjectByKey('mappingItemMasterId', x.mappingItemMasterId),
          technicianId: getValueFromObjectByKey('value', x.technicianId),
          createdBy: this.userName,
          updatedBy: this.userName
        }
      })
    };

    if (this.isEdit) {
      this.workOrderService.updateNewWorkOrder(data).subscribe(
        result => {
          this.saveWorkOrderGridLogic(result, generalInfo)
          // this.workOrder = result;
          this.alertService.showMessage(
            this.moduleName,
            'Work Order Updated Succesfully',
            MessageSeverity.success
          );
        }
      );
    } else {
      this.workOrderService.createNewWorkOrder(data).subscribe(
        result => {
          this.isEdit = true;
          this.saveWorkOrderGridLogic(result, generalInfo)
          // this.workOrder = result;
          this.alertService.showMessage(
            this.moduleName,
            'Work Order Added Succesfully',
            MessageSeverity.success
          );
        }
      );
    }


  }

  saveWorkOrderGridLogic(result, data) {
    this.savedWorkOrderData = result;

    this.workOrderId = result.workOrderId;
    this.workOrderGeneralInformation.workOrderNumber = result.workOrderNum;


    if (this.workFlowWorkOrderId !== 0) {
      this.isDisabledSteps = true;
    }


    this.getWorkOrderWorkFlowNos();
    if (this.workOrderGeneralInformation.isSinglePN == true) {
      // get WOrkFlow Equipment Details if WorFlow Exists
      this.getWorkFlowTabsData();
      this.workFlowId = data.partNumbers[0].workflowId;
      this.workFlowWorkOrderId = result.workFlowWorkOrderId;

    }
    this.showTableGrid = true; // Show Grid Boolean
  }



  changeofMPN(data) {
    console.log(data)
    // data.workOrderWorkFlowId
    // const data = object;
    this.workFlowId = data.workflowId,
      this.workFlowWorkOrderId = data.workOrderWorkFlowId;
    // console.log(workFlowWorkOrderId);

    this.getWorkFlowTabsData();

  }

  getWorkFlowTabsData() {

    this.getEquipmentByWorkOrderId();
    this.getMaterialListByWorkOrderId();
    // this.getWorkOrderWorkFlowBywfwoId(this.workFlowWorkOrderId);
  }




  // getWorkOrderWorkFlowBywfwoId(workFlowWorkOrderId) {

  //   this.workOrderService.getWorkOrderWorkFlowByWorkFlowWorkOrderId(workFlowWorkOrderId).subscribe(res => {

  //   })
  // }


  savedWorkFlowData(workFlowDataObject) {
    this.workOrderService.createWorkFlowWorkOrder(workFlowDataObject).subscribe(res => {
      this.workFlowWorkOrderData = res;
      this.workFlowWorkOrderId = res.workFlowWorkOrderId;

      if (this.workFlowWorkOrderId !== 0) {
        this.isDisabledSteps = true;
      }
      this.getWorkOrderWorkFlowNos();
      this.alertService.showMessage(
        '',
        'Work Order Work Flow Saved Succesfully',
        MessageSeverity.success
      );
    })

    // this.workFlowWorkOrderData = responseData;
    // this.workFlowWorkOrderId = responseData.workFlowWorkOrderId;
  }

  getWorkOrderWorkFlowNos() {

    if (this.workOrderId) {
      this.workOrderService.getWorkOrderWorkFlowNumbers(this.workOrderId).subscribe(res => {
        this.workOrderWorkFlowOriginalData = res;

        if (this.isEdit && res.length === 1 && this.workOrderGeneralInformation.isSinglePN == true) {
          this.workFlowId = res[0].workflowId;
        }
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
            label: x.workflowNo
          }
        })
      })
    }

  }

  saveWorkOrderLabor(data) {
    this.workOrderService.createWorkOrderLabor(data).subscribe(res => {
      this.alertService.showMessage(
        this.moduleName,
        'Saved Work Order Labor  Succesfully',
        MessageSeverity.success
      );
    })
  }

  saveWorkOrderMaterialList(data) {

    const materialArr = data.materialList.map(x => {
      return {
        ...x,
        workOrderId: this.workOrderId, workFlowWorkOrderId: this.workFlowWorkOrderId
      }
    })
    console.log(data);
    this.workOrderService.createWorkOrderMaterialList(materialArr).subscribe(res => {
      this.workFlowObject.materialList = [];
      this.alertService.showMessage(
        this.moduleName,
        'Saved Work Order MaterialList  Succesfully',
        MessageSeverity.success
      );
      this.getMaterialListByWorkOrderId();
    })

  }

  saveReservedPartorIssue(alternatePartData) {
    this.workOrderService.saveReservedPartorIssue(alternatePartData).subscribe(res => {
      this.alertService.showMessage(
        this.moduleName,
        'Updated Parts Data',
        MessageSeverity.success
      );
      this.getMaterialListByWorkOrderId();
    })
  }



  getEquipmentByWorkOrderId() {
    // if (this.workFlowWorkOrderId !== 0 && this.workOrderId) {
    // this.workFlowWorkOrderId = this.workFlowWorkOrderData.workFlowWorkOrderId;
    this.workOrderService.getWorkOrderAssetList(84, 101).subscribe(
      result => {
        this.workOrderAssetList = result;
      }
    )
    // }

  }

  getMaterialListByWorkOrderId() {
    // this.workFlowWorkOrderId, this.workOrderId
    // 89,102
    if (this.workFlowWorkOrderId !== 0 && this.workOrderId) {
      this.workOrderService.getWorkOrderMaterialList(this.workFlowWorkOrderId, this.workOrderId).subscribe(res => {


        this.workOrderMaterialList = res;

        if (res.length > 0) {

          this.materialStatus = res[0].partStatusId;


        }

      })

    }
  }







  // grid Service Calls
  // getMultiplePartsNumbers() {
  //   this.workOrderService.getMultipleParts().subscribe(res => {
  //     this.partNumberOriginalData = res;
  //   })
  // }

  filterPartNumber(event) {
    this.partNumberList = this.partNumberOriginalData;

    if (event.query !== undefined && event.query !== null) {
      const partNumbers = [...this.partNumberOriginalData.filter(x => {

        return x.partNumber.toLowerCase().includes(event.query.toLowerCase())
      })]
      this.partNumberList = partNumbers;
    }
  }

  onSelectedPartNumber(object, currentRecord, index) {
    console.log('Sample PN');


    // currentRecord = new WorkOrderPartNumber();

    const { itemMasterId } = object;
    // this.mpnPartNumbers.push(object.partNumber)

    // const { partNumber } = object;

    // const { conditionId } = currentRecord;

    this.getRevisedpartNumberByItemMasterId(itemMasterId, index)
    // this.getStockLineByItemMasterId(itemMasterId)
    this.getConditionByItemMasterId(itemMasterId, index)
    this.getPartPublicationByItemMasterId(itemMasterId)
    currentRecord.description = object.partDescription
    currentRecord.nte = object.nte;
    currentRecord.isPMA = object.pma === null ? false : object.pma;
    currentRecord.isDER = object.der === null ? false : object.der;
  }



  // onUnSelectPartNumber(event, currentRecord) {
  //   console.log(event.target.value, currentRecord)
  //   if (event.target.value !== currentRecord.partNumber) {
  //     currentRecord = { ...new WorkOrderPartNumber() };
  //   }
  // }

  // onClearPartNumber(currentRecord) {
  //   currentRecord = { ...new WorkOrderPartNumber() };

  //   console.log(currentRecord);

  // }


  async  getRevisedpartNumberByItemMasterId(itemMasterId, index) {

    await this.workOrderService.getRevisedPartNumbers(itemMasterId).subscribe(res => {
      this['revisedPartOriginalData' + index] = res;


    })

  }
  getStockLineByItemMasterIdOnChangePN(workOrderPart, index) {
    this.getStockLineByItemMasterId(workOrderPart.masterPartId, workOrderPart.conditionId, index);
  }

  async getStockLineByItemMasterId(itemMasterId, conditionId, index) {
    itemMasterId = editValueAssignByCondition('itemMasterId', itemMasterId)
    // const { conditionId } = workOrderPart;
    // const { itemMasterId } = workOrderPart.masterPartId;
    if (itemMasterId !== 0 && conditionId !== null) {
      await this.workOrderService.getStockLineByItemMasterId(itemMasterId, conditionId).subscribe(res => {
        this['stockLineList' + index] = res.map(x => {
          return {
            label: x.stockLineNumber,
            value: x.stockLineId,
          }
        });

      })
    }
  }




  // async getStockLineByItemMasterId(workOrderPart) {
  //   const { conditionId } = workOrderPart;
  //   const { itemMasterId } = workOrderPart.masterPartId;

  //   if (itemMasterId !== 0 && conditionId !== 0) {
  //     await this.workOrderService.getStockLineByItemMasterId(itemMasterId, conditionId).subscribe(res => {
  //       if (res.length > 0) {
  //         const responseData = res[0];
  //         workOrderPart.stockLineId = responseData.stockLineId;
  //         workOrderPart.stockLineNumber = responseData.stockLineNumber;
  //         workOrderPart.serialNumber = responseData.serialNumber;

  //       }
  //     })
  //   }
  // }

  async getConditionByItemMasterId(itemMasterId, index) {
    await this.workOrderService.getConditionByItemMasterId(itemMasterId).subscribe(res => {
      this['conditionList' + index] = res.map(x => {
        return {
          label: x.description,
          value: x.conditionId,
        }
      })
    })
  }
  // getDynamicVariableData(variable, index) {
  //   return this[variable + index];
  // }
  // getConditionDyVariable(variable, index) {
  //   return this[variable + index];
  // }
  // getRevisedPNDyVariable(variable, index) {
  //   return this[variable + index]
  // }

  getDynamicVariableData(variable, index) {
    return this[variable + index]
  }

  async getPartPublicationByItemMasterId(itemMasterId) {
    await this.workOrderService.getPartPublicationByItemMaster(itemMasterId).subscribe(res => {
      this.cmmList = res.map(x => {
        return {
          value: x.publicationRecordId,
          label: x.publicationId
        }
      });
    })
  }






  filterRevisedPartNumber(event, index) {
    this['revisedPartNumberList' + index] = this['revisedPartOriginalData' + index]
    // this.revisedPartNumberList = this.revisedPartOriginalData;

    if (event.query !== undefined && event.query !== null) {
      const partNumbers = [...this['revisedPartOriginalData' + index].filter(x => {

        return x.revisedPartNo.toLowerCase().includes(event.query.toLowerCase())
      })]
      this['revisedPartNumberList' + index] = partNumbers;
    }
  }






  getSerialNoByStockLineId(workOrderPart) {
    const { stockLineId } = workOrderPart;
    const { conditionId } = workOrderPart;
    if ((stockLineId !== null && stockLineId !== 0) && (conditionId !== null && conditionId !== 0)) {
      this.workOrderService.getSerialNoByStockLineId(stockLineId, conditionId).subscribe(res => {
        if (res) {
          workOrderPart.serialNumber = res.serialNumber;
        }
      })
    }
  }

  getWorkFlowByPNandScope(workOrderPart) {
    const itemMasterId = getValueFromObjectByKey('itemMasterId', workOrderPart.masterPartId)
    const { workOrderScopeId } = workOrderPart;

    if ((itemMasterId !== 0 && itemMasterId !== null) && (workOrderScopeId !== null && workOrderScopeId !== 0)) {
      this.workOrderService.getWorkFlowByPNandScope(itemMasterId, workOrderScopeId).subscribe(res => {
        this.workFlowList = res.map(x => {
          return {
            label: x.workFlowNo,
            value: x.workFlowId
          }
        })
      })
    }

  }



  // Change of Table Grid
  gridTabChange(value) {
    this.gridActiveTab = value;
    this.subTabWorkFlow = '';
  }
  // changeSinglePN(event): void {
  //   this.workOrder.isSinglePN = !this.workOrder.isSinglePN;
  // }
  // (change)="changeWorkOrderType($event)"
  // changeWorkOrderType(event): void {
  //   this.workOrder.workOrderTypeId = Number.parseInt(
  //     event.target.value.split('_')[1]
  //   );
  // }



  // getStockLines(): void {
  //   this.stocklineService.getStockLineList().subscribe(
  //     result => { },
  //     error => {
  //       this.alertService.showMessage(
  //         this.moduleName,
  //         'Something Went Wrong',
  //         MessageSeverity.error
  //       );
  //     }
  //   );
  // }

  // getAllIterMasters(): void {
  //   this.itemMasterService
  //     .getItemMasterList()
  //     .subscribe(result => { }, error => { });
  // }



  // onCustomerSelected(event, selectionType): void {
  //   if (selectionType == 'name') {
  //     for (let i = 0; i < this.customers.length; i++) {
  //       if (event == this.customers[i].name) {
  //         this.workOrder.customerId = this.customers[i].customerId;
  //         this.selectedCustomer = new Customer();
  //         this.selectedCustomer = this.customers[i];
  //         //this.selectedCustomer.p
  //       }
  //     }
  //   } else {
  //     for (let i = 0; i < this.customers.length; i++) {
  //       if (event == this.customers[i].customerCode) {
  //         this.workOrder.customerId = this.customers[i].customerId;
  //         this.selectedCustomer = new Customer();
  //         this.selectedCustomer = this.customers[i];
  //       }
  //     }
  //   }
  // }


}
