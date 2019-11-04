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
import { validateRecordExistsOrNot, selectedValueValidate, getValueFromObjectByKey } from '../../../../generic/autocomplete';
import { AuthService } from '../../../../services/auth.service';

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
  workOrderTypes: WorkOrderType[];
  workOrderStatusList: any;
  workScopesList: any;
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
  isWorkOrder : boolean = true;

  workFlowItems: any;

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
  employeeList: any[];
  salesPersonList: any[];
  technicianList: any[];
  partNumberList: any;
  partNumberOriginalData: any;
  revisedPartOriginalData: any;
  revisedPartNumberList: any;
  stockLineList: any;
  conditionList: any;
  cmmList: any;
  priorityList: Object;
  savedWorkOrderData: any;


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
  ) {
    // this.workOrderPartNumbers = [];
    // this.workOrder = new WorkOrder();
    // this.workOrder.isSinglePN = true;
    // this.workOrder.customerContactId = 68;
    // this.workOrder.masterCompanyId = 1;
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
    // this.getAllCustomers();
    this.getAllEmployees();
    this.getAllWorkScpoes();
    this.getAllWorkOrderStages();
    this.getMultiplePartsNumbers();
    this.getAllPriority();
    // this.getStockLines();
    this.addMPN();
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
    const keysArray = Object.keys(this.labor.tasks[0]);
    for (let i = 0; i < keysArray.length; i++) {
      this.labor = {
        ...this.labor,
        tasks: [{ ...this.labor.tasks[0], [keysArray[i]]: [new AllTasks()] }]
      };
    }
    console.log(this.labor);
  }






  getAllWorkOrderTypes(): void {
    this.workOrderService.getAllWorkOrderTypes().subscribe(
      result => {
        this.workOrderTypes = result;
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

  selectCustomer(object, currentData) {
    console.log(object);

    currentData.customerReference = object.customerRef,
      currentData.csr = object.csrName;

  }



  getAllEmployees(): void {
    this.commonService.smartDropDownList('Employee', 'EmployeeId', 'FirstName').subscribe(res => {
      this.employeesOriginalData = res;
    })
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


  getAllWorkScpoes(): void {
    this.workOrderService.getAllWorkScopes().subscribe(
      result => {
        this.workScopesList = result.map(x => {
          return {
            label: x.workScopeCode,
            value: x.workScopeId
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
    this.gridActiveTab = '';
  }


  saveWorkOrder(): void {
    // this.showTableGrid = true; // Show Grid Boolean
    const generalInfo = this.workOrderGeneralInformation
    const data = {
      ...generalInfo,
      customerId: getValueFromObjectByKey('customerId', generalInfo.customerId),
      employeeId: getValueFromObjectByKey('value', generalInfo.employeeId),
      salesPersonId: getValueFromObjectByKey('value', generalInfo.salesPersonId),
      masterCompanyId: 1,
      "customerContactId": 68,
      createdBy: this.userName,
      updatedBy: this.userName,
      partNumbers: generalInfo.partNumbers.map(x => {
        return {
          ...x,

          masterPartId: getValueFromObjectByKey('itemMasterId', x.masterPartId),
          mappingItemMasterId : getValueFromObjectByKey('itemMasterId', x.masterPartId),
          // mappingItemMasterId: getValueFromObjectByKey('mappingItemMasterId', x.mappingItemMasterId),
          technicianId: getValueFromObjectByKey('value', x.technicianId),
          createdBy: this.userName,
          updatedBy: this.userName
        }
      })
    };

    this.workOrderService.createNewWorkOrder(data).subscribe(
      result => {
        this.savedWorkOrderData = result;
        this.showTableGrid = true; // Show Grid Boolean
        // this.workOrder = result;
        this.alertService.showMessage(
          this.moduleName,
          'Work Order Added Succesfully',
          MessageSeverity.success
        );
      }
    );
  }




  // grid Service Calls
  getMultiplePartsNumbers() {
    this.workOrderService.getMultipleParts().subscribe(res => {
      this.partNumberOriginalData = res;
    })
    // this.commonService.getItemMasterDetails().subscribe(res => {
    //   this.partNumberOriginalData = res;
    // })
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

  onSelectedPartNumber(object, currentRecord) {
    console.log('Sample PN');

    const { itemMasterId } = object;
    const { partNumber } = object;

    this.getRevisedpartNumberByItemMasterId(itemMasterId)
    this.getStockLineByItemMasterId(itemMasterId)
    this.getConditionByItemMasterId(itemMasterId)
    this.getPartPublicationByItemMasterId(itemMasterId)
    currentRecord.description = object.partDescription

  }


  async  getRevisedpartNumberByItemMasterId(itemMasterId) {

    await this.workOrderService.getRevisedPartNumbers(itemMasterId).subscribe(res => {
      this.revisedPartOriginalData = res;
    })

  }
  async getStockLineByItemMasterId(itemMasterId) {
    await this.workOrderService.getStockLineByItemMasterId(itemMasterId).subscribe(res => {
      this.stockLineList = res.map(x => {
        return {
          label: x.stockLineNumber,
          value: x.stockLineId,
        }
      });

    })
  }

  async getConditionByItemMasterId(itemMasterId) {
    await this.workOrderService.getConditionByItemMasterId(itemMasterId).subscribe(res => {
      this.conditionList = res.map(x => {
        return {
          label: x.description,
          value: x.conditionId,
        }
      })
    })
  }

  async getPartPublicationByItemMasterId(itemMasterId) {
    await this.workOrderService.getPartPublicationByItemMaster(itemMasterId).subscribe(res => {
      this.cmmList = res;
    })
  }





  filterRevisedPartNumber(event) {
    this.revisedPartNumberList = this.revisedPartOriginalData;

    if (event.query !== undefined && event.query !== null) {
      const partNumbers = [...this.revisedPartOriginalData.filter(x => {

        return x.revisedPartNo.toLowerCase().includes(event.query.toLowerCase())
      })]
      this.revisedPartNumberList = partNumbers;
    }
  }


  getSerialNoByStockLineId(workOrderPart) {
    const { stockLineId } = workOrderPart;
    const { conditionId } = workOrderPart;
    if (stockLineId !== 0 && conditionId !== 0) {
      this.workOrderService.getSerialNoByStockLineId(stockLineId, conditionId).subscribe(res => {
        if (res) {
          workOrderPart.stockLineNumber = res.serialNumber;
        }
      })
    }
  }

  getWorkFlowByPNandScope(workOrderPart) {
    const itemMasterId = getValueFromObjectByKey('itemMasterId', workOrderPart.masterPartId)
    const { workOrderScopeId } = workOrderPart;
    console.log(workOrderPart);


    if (itemMasterId !== 0 && workOrderScopeId !== 0) {
      this.workOrderService.getWorkFlowByPNandScope(itemMasterId, workOrderScopeId).subscribe(res => {
        this.workFlowItems = res.map(x => {
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
