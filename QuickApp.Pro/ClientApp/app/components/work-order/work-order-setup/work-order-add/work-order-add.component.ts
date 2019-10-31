import { Component, OnInit } from '@angular/core';
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
import { validateRecordExistsOrNot, selectedValueValidate } from '../../../../generic/autocomplete';

@Component({
  selector: 'app-work-order-add',
  templateUrl: './work-order-add.component.html',
  styleUrls: ['./work-order-add.component.scss'],
  animations: [fadeInOut]
})
/** WorkOrderAdd component*/
export class WorkOrderAddComponent implements OnInit {
  workOrder: WorkOrder;
  workOrderPartNumbers: WorkOrderPartNumber[];
  workOrderTypes: WorkOrderType[];
  workOrderStatusList: any;
  workScopes: any ;
  workOrderStagesList: any;
  creditTerms: any;
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
  employeesOriginalData: any;
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
  workOrderGeneralInformation: workOrderGeneralInfo = new workOrderGeneralInfo();
  // Address Information Object Modal
  addresses: addressesForm;
  // Document Object Modal
  documents: Documents[] = [];
  // quote Object Modal
  quote: WorkOrderQuote;
  // labor Object Modal
  labor: WorkOrderLabor;

  workFlowItems = [
    {
      label: 'WO123',
      value: 'WO123'
    },
    {
      label: 'WO124',
      value: 'WO124'
    },
    {
      label: 'WO125',
      value: 'WO125'
    }
  ];

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
  WorkOrderMPN = new WorkOrderPartNumber();
  // workOrderMPN = {



  //    workOrderScopeId:1,
  //    promisedDate: new Date(),
  //    estimatedShipDate : new Date(),
  //    customerRequestDate : new Date(),
  //    estimatedCompletionDate : new Date(),
  //    nTE : '' , 
  //    quantity : 1,
  //    stockLineId: 0,
  //    cMMId : 0 ,
  //    workflowId : 0,
  //    workOrderStageId : 0,
  //    workOrderStatusId: 0,
  //    workOrderPriorityId: 0,
  //    isPMA: false,
  //    isDER: false,
  //    techStationId: 0,
  //    tearDownReport: 0,
  //    tATDaysStandard: 0,
  //    technicianId : 0,
  //    mappingPartId: 0,
  //    conditionId : 0,



  //   // "EstimatedShipDate":"2019-10-28T06:02:16.016Z",
  //   // "CustomerRequestDate":"2019-10-28T06:02:16.016Z",
  //   // "PromisedDate":"2019-10-28T06:02:16.016Z",
  //   // "EstimatedCompletionDate":"2019-10-28T06:02:16.016Z",
  //   // "NTE":"NTE",
  //   // "Quantity":1,
  //   // "StockLineId":1,
  //   // "CMMId":1,
  //   // "WorkflowId":1,
  //   // "WorkOrderStageId":1,
  //   // "WorkOrderStatusId":1,
  //   // "WorkOrderPriorityId":1,
  //   // "IsPMA":true,
  //   // "IsDER":false,
  //   // "TechStationId":1,
  //   // "TearDownReport":1,
  //   // "TATDaysStandard":1,
  //   // "masterCompanyId":1,
  //   // "createdBy":"admin",
  //   // "updatedBy":"admin",
  //   // "MasterPartId":720,
  //   // "TechnicianId":1,
  //   // "UpdatedDate":"2019-10-28T06:02:16.016Z",
  //   // "CreatedDate":"2019-10-28T06:02:16.016Z",
  //   // "IsActive":true,
  //   // "IsDelete":false


  //   // iD: 0,
  //   // description: '',
  //   // workOrderId: 0,
  //   // itemMasterId: 0,
  //   // workOrderScopeId: 0,
  //   // nTE: '',
  //   // quantity: 0,
  //   // stockLineId: 0,
  //   // cMMId: 0,
  //   // workflowId: 0,
  //   // workOrderStageId: 0,
  //   // workOrderStatusId: 0,
  //   // workOrderPriorityId: 0,
  //   // customerRequestDate: new Date(),
  //   // promisedDate: new Date(),
  //   // estimatedCompletionDate: new Date(),
  //   // estimatedShipDate: new Date(),
  //   // isPMA: false,
  //   // isDER: false,
  //   // technicianName: '',
  //   // techStationId: 0,
  //   // tearDownReport: 0,
  //   // tATDaysStandard: 0,
  //   // masterCompanyId: 1,
  //   // createdBy: 'Admin',
  //   // updatedBy: '',
  //   // createdDate: new Date(),
  //   // updatedDate: new Date(),
  //   // isActive: true,
  //   // isDelete: false
  // };
  employeeList: any[];
  salesPersonList: any[];
  technicianList: any[];
  partNumberList: any;
  partNumberOriginalData: any;
  revisedPartOriginalData: Object;
  revisedPartNumberList: any;
  stockLineList: any;
  conditionList: any;
  cmmList: any;
  priorityList: Object;


  constructor(
    private alertService: AlertService,
    private workOrderService: WorkOrderService,
    private creditTermsService: CreditTermsService,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private itemMasterService: ItemMasterService,
    private workOrderPartNumberService: WorkOrderPartNumberService,
    private stocklineService: StocklineService,
    private commonService: CommonService
  ) {
    this.workOrderPartNumbers = [];
    this.workOrder = new WorkOrder();
    this.workOrder.isSinglePN = true;
    this.workOrder.customerContactId = 68;
    this.workOrder.masterCompanyId = 1;
    this.moduleName = 'Work Order';
  }

  ngOnInit(): void {
    this.getAllGridModals();
    this.mpnFlag = true;
    this.isDetailedView = true;
    this.selectedCustomer = new Customer();
    this.getAllWorkOrderTypes();
    this.getAllWorkOrderStatus();
    this.getAllCreditTerms();
    this.getAllCustomers();
    this.getAllEmployees();
    this.getAllWorkScpoes();
    this.getAllWorkOrderStages();
    this.getMultiplePartsNumbers();
    this.getAllPriority();
    // this.getStockLines();
    this.addMPN();
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
    console.log('Test');
    const keysArray = Object.keys(this.labor.tasks[0]);
    for (let i = 0; i < keysArray.length; i++) {
      this.labor = {
        ...this.labor,
        tasks: [{ ...this.labor.tasks[0], [keysArray[i]]: [new AllTasks()] }]
      };
    }
    console.log(this.labor);
  }

  toggleDisplayMode(): void {
    this.isDetailedView = !this.isDetailedView;
  }
  // Handles radio Button single or Multiple
  toggleWorkOrderType(value): void {
    this.workOrderGeneralInformation.isSinglePN = value;
    this.showTableGrid = false;
    this.getAllGridModals();
  }
  // Handles type of the WorkOrder Dealer
  woDealerChange(value) {
    this.workOrderGeneralInformation.workOrderTypeId = value;
  }
  // added new MPN
  addMPN() {
    this.workOrderPartNumbers.push(new WorkOrderPartNumber());
  }
  // subtab in grid change
  subTabWorkFlowChange(value) {
    this.subTabWorkFlow = value;
    this.gridActiveTab = '';
  }


  addWorkOrder(): void {
    console.log(this.workOrderGeneralInformation);
    this.showTableGrid = true; // Show Grid Boolean
    this.workOrderService.add(this.workOrder).subscribe(
      result => {
        this.workOrder = result;
        this.alertService.showMessage(
          this.moduleName,
          'Work Order Added Succesfully',
          MessageSeverity.success
        );
        for (var i = 0; i < this.workOrderPartNumbers.length; i++) {
          // this.workOrderPartNumbers[i].workOrderId = this.workOrder.iD;
          this.workOrderPartNumberService
            .add(this.workOrderPartNumbers[i])
            .subscribe(
              result => { },

            );
        }
      }
    );
  }


  // grid Service Calls
  getMultiplePartsNumbers() {
    this.commonService.getItemMasterDetails().subscribe(res => {
      this.partNumberOriginalData = res;
    })
  }
  filterPartNumber(event) {
    this.partNumberList = this.partNumberOriginalData;

    if (event.query !== undefined && event.query !== null) {
      const partNumbers = [...this.partNumberOriginalData.filter(x => {

        return x.partNumber.toLowerCase().includes(event.query.toLowerCase())
      })]
      this.partNumberList = partNumbers;
    }
  }

  // getWorkOrderStage(){

  // }
  onSelectedPartNumber(object, currentRecord) {
    const { itemMasterId } = object;
    const { partNumber } = object;

    this.getRevisedpartNumberByItemMasterId(itemMasterId)
    this.getStockLineByPartNumber(partNumber)
    this.getPartPublicationByItemMasterId(itemMasterId)
    console.log(object, currentRecord);
    currentRecord.description = object.partDescription

  }


  async  getRevisedpartNumberByItemMasterId(itemMasterId) {

    await this.itemMasterService.getRevisedPartNumbers(itemMasterId).subscribe(res => {
      this.revisedPartOriginalData = res;
    })

  }
  async getStockLineByPartNumber(partNumber) {
    await this.itemMasterService.getStockLineByPartNumber(partNumber).subscribe(res => {
      this.stockLineList = res.map(x => {
        return {
          label: x.stockLineNumber,
          value: x.stockLineId,
        }
      });
      this.conditionList = res.map(x => {
        return {
          label: x.description,
          value: x.conditionId,
        }
      })
    })
  }
  async getPartPublicationByItemMasterId(itemMasterId) {
    await this.itemMasterService.getPartPublicationByItemMaster(itemMasterId).subscribe(res => {
      this.cmmList = res;
    })
  }





  filterRevisedPartNumber(event) {
    this.revisedPartNumberList = this.revisedPartOriginalData;

    if (event.query !== undefined && event.query !== null) {
      const partNumbers = [...this.partNumberOriginalData.filter(x => {

        return x.partNumber.toLowerCase().includes(event.query.toLowerCase())
      })]
      this.revisedPartNumberList = partNumbers;
    }
  }

  // Change of Table Grid
  gridTabChange(value) {
    this.gridActiveTab = value;
    this.subTabWorkFlow = '';
  }
  changeSinglePN(event): void {
    this.workOrder.isSinglePN = !this.workOrder.isSinglePN;
  }

  changeWorkOrderType(event): void {
    this.workOrder.workOrderTypeId = Number.parseInt(
      event.target.value.split('_')[1]
    );
  }

  getAllWorkOrderTypes(): void {
    this.workOrderService.getAllWorkOrderTypes().subscribe(
      result => {
        this.workOrderTypes = result;
      },
      error => {
        this.alertService.showMessage(
          this.moduleName,
          'Something Went Wrong',
          MessageSeverity.error
        );
      }
    );
  }

  getAllWorkOrderStatus(): void {
    this.commonService.smartDropDownList('WorkOrderStatus', 'ID', 'Description').subscribe(res => {
      this.workOrderStatusList = res;
    })
  }

  getAllCreditTerms(): void {
    this.commonService.smartDropDownList('CreditTerms', 'CreditTermsId', 'Name').subscribe(res => {
      this.creditTerms = res;
    })
  }

  getAllCustomers(): void {
    this.customerService.getAllCustomersInfo().subscribe(
      result => {
        this.customersOriginalData = result;
      }
    );
  }

  getAllEmployees(): void {
    this.commonService.smartDropDownList('Employee', 'EmployeeId', 'FirstName').subscribe(res => {
      this.employeesOriginalData = res;
    })
  }



  getAllWorkScpoes(): void {
    this.workOrderService.getAllWorkScopes().subscribe(
      result => {
        this.workScopes = result.map(x =>{
          return {

          }
        })
      }
    );
  }

  getAllWorkOrderStages(): void {
    this.commonService.smartDropDownList('WorkOrderStage', 'ID', 'Description').subscribe(res => {
      this.workOrderStagesList = res;
    })
  }

  getAllPriority() {
    this.commonService.smartDropDownList('Priority', 'PriorityId', 'Description').subscribe(res => {
      this.priorityList = res;
    })
  }

  getSerialNoByStockLineId(workOrderPart) {
    const { stockLineId } = workOrderPart;
    const { conditionId } = workOrderPart;
    this.itemMasterService.getSerialNoByStockLineId(stockLineId, conditionId).subscribe(res => {
      return workOrderPart.stockLineNumber = res;
    })
  }



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




  filterCustomerName(event) {
    const value = event.query.toLowerCase()
    this.commonService.getCustomerNameandCode(value).subscribe(res => {
      this.customerNamesList = res;
    })
    // this.customerNames = this.customers;

    // if (event.query !== undefined && event.query !== null) {
    // 	const customers = [...this.customers.filter(x => {
    // 		return x.name.toLowerCase().includes(event.query.toLowerCase())
    // 	})]
    // 	this.customerNames = customers;
    // }
  }



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

}
