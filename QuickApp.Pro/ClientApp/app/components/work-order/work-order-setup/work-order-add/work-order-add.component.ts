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
import {
  addressesForm,
  Addresses
} from '../../../../models/work-order-address.model';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { CreditTermsService } from '../../../../services/Credit Terms.service';
import { CustomerService } from '../../../../services/customer.service';
import { EmployeeService } from '../../../../services/employee.service';
import { StocklineService } from '../../../../services/stockline.service';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { WorkOrderPartNumberService } from '../../../../services/work-order/work-order-part-number.service';
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
  workOrderStatus: WorkOrderStatus[];
  workScopes: WorkScope[];
  workOrderStages: WorkOrderStage[];
  creditTerms: CreditTerms[];
  customers: Customer[];
  selectedCustomer: Customer;
  selectedEmployee: any;
  selectedsalesPerson: any;
  customerNames: any[];
  filteredCustomerNames: any[];
  customerCodes: any[];
  filteredCustomerCode: any[];
  employeeNames: any[];
  filteredEmployeeNames: any[];
  employees: any[];
  contactInfo: any;
  mpnFlag: boolean;
  isDetailedView: boolean;
  selectedRadioButtonValue: boolean;
  moduleName: string;
  showTableGrid: Boolean = false;
  worflowId = [];
  isContract = true;
  gridActiveTab: String = 'workFlow';
  subTabWorkFlow: String;
  // WorkOrder general Information JSON
  workOrderGeneralInformation = workOrderGeneralInfo;
  // Address Information JSON
  addresses = addressesForm;

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
  workOrderMPN = {
    iD: 0,
    workOrderId: 0,
    itemMasterId: 0,
    workOrderScopeId: 0,
    nTE: '',
    quantity: 0,
    stockLineId: 0,
    cMMId: 0,
    workflowId: 0,
    workOrderStageId: 0,
    workOrderStatusId: 0,
    workOrderPriorityId: 0,
    customerRequestDate: new Date(),
    promisedDate: new Date(),
    estimatedCompletionDate: new Date(),
    estimatedShipDate: new Date(),
    isPMA: false,
    isDER: false,
    technicianName: '',
    techStationId: 0,
    tearDownReport: 0,
    tATDaysStandard: 0,
    masterCompanyId: 1,
    createdBy: 'Admin',
    updatedBy: '',
    createdDate: new Date(),
    updatedDate: new Date(),
    isActive: true,
    isDelete: false
  };
  labor = {
    WOId: '',
    DataEnteredBy: null,
    Expertise: '',
    EmployeeId: null,
    IsTaskCompletedByOne: false,
    WorkFloworSpecificTaskorWorkOrder: 'workFlow',
    HoursorClockorScan: 'labourHours',
    Tasks: [
      {
        Receive: [],
        Inspect: [],
        Evaluate: [],
        TearDown: [],
        Disassemble: [],
        Assemble: [],
        Testing: [],
        QualityControl: [],
        Ship: [],
        Clean: []
      }
    ]
  };
  documents = [
    {
      WOId: '',
      Comp: '',
      BU: '',
      Div: '',
      Dep: '',
      DocumentCode: '',
      Description: 'Contract',
      DocLink: '',
      IsActive: false
    }
  ];

  quote = {
    QuoteNumber: '',
    OpenDate: '',
    QuoteDueDate: '',
    ValidForDays: null,
    ExpDate: '',
    ExpDateStatus: '',
    WoNumber: '',
    CustomerId: null,
    CustomerCodeId: null,
    CustomerContact: null,
    CustomerEmail: '',
    CustomerPhone: null,
    CustomerReference: '',
    IsContract: false,
    Contract: '',
    Quantity: null,
    customerRequestDate: '',
    PromiseDate: '',
    EstCompletionDate: '',
    EstShipDate: '',
    CreditTerms: '',
    CreditTermsandLimit: '',
    ItemCount: null,
    SalesPersonId: null,
    CSR: '',
    EmployeeId: null,
    Currency: '',
    DSO: '',
    ARBal: '',
    partsDetails: []
  };

  constructor(
    private alertService: AlertService,
    private workOrderService: WorkOrderService,
    private creditTermsService: CreditTermsService,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private itemMasterService: ItemMasterService,
    private workOrderPartNumberService: WorkOrderPartNumberService,
    private stocklineService: StocklineService
  ) {
    this.workOrderPartNumbers = [];
    // this.workOrderPartNumbers.push(new WorkOrderPartNumber());
    this.workOrder = new WorkOrder();
    this.workOrder.isSinglePN = true;
    this.workOrder.customerContactId = 68;
    this.workOrder.masterCompanyId = 1;
    //this.workOrder.openDate = new Date();
    //this.workOrder.promiseDate = new Date;
    //this.workOrder.estimatedCompletionDate = new Date;
    //this.workOrder.estimatedShipDate = new Date;
    this.moduleName = 'Work Order';
  }

  ngOnInit(): void {
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
    this.getStockLines();
    this.addMPN();
  }

  toggleDisplayMode(): void {
    this.isDetailedView = !this.isDetailedView;
  }
  // Handles radio Button single or Multiple
  toggleWorkOrderType(value): void {
    // this.workOrderGeneralInformation.workOrderType = value;
    this.showTableGrid = false;
  }
  // Handles type of the WorkOrder Dealer
  woDealerChange(value) {
    // this.workOrderGeneralInformation.workOrderDealerType = value;
  }
  // added new MPN
  addMPN() {
    this.workOrderPartNumbers.push({ ...this.workOrderMPN });
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
          this.workOrderPartNumbers[i].workOrderId = this.workOrder.iD;
          this.workOrderPartNumberService
            .add(this.workOrderPartNumbers[i])
            .subscribe(
              result => {},
              error => {
                var message = '';
                if (error.error.constructor == Array) {
                  message = error.error[0].errorMessage;
                } else {
                  if (
                    error.error.Message != undefined &&
                    error.error.Message != null
                  ) {
                    message = error.error.Message;
                  } else {
                    message = error.error;
                  }
                }
                this.alertService.showMessage(
                  this.moduleName,
                  message,
                  MessageSeverity.error
                );
              }
            );
        }

        this.alertService.showMessage(
          this.moduleName,
          'Work Order Successfully Added : ' + this.workOrder.workOrderNum,
          MessageSeverity.success
        );
      },
      error => {
        var message = '';
        if (error.error.constructor == Array) {
          message = error.error[0].errorMessage;
        } else {
          if (error.error.Message != undefined && error.error.Message != null) {
            message = error.error.Message;
          } else {
            message = error.error;
          }
        }
        this.alertService.showMessage(
          this.moduleName,
          message,
          MessageSeverity.error
        );
      }
    );
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
    this.workOrderService.getAllWorkOrderStatus().subscribe(
      result => {
        this.workOrderStatus = result;
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

  getAllCreditTerms(): void {
    this.creditTermsService.getCreditTermsList().subscribe(
      result => {
        this.creditTerms = result[0];
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

  getAllCustomers(): void {
    this.customerService.getAllCustomersInfo().subscribe(
      result => {
        this.customers = result;
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

  getAllEmployees(): void {
    this.employeeService.getEmployeeList().subscribe(
      result => {
        this.employees = result[0];
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

  getAllWorkScpoes(): void {
    this.workOrderService.getAllWorkScopes().subscribe(
      result => {
        this.workScopes = result;
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

  getAllWorkOrderStages(): void {
    this.workOrderService.getAllWorkOrderStages().subscribe(
      result => {
        this.workOrderStages = result;
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

  getStockLines(): void {
    this.stocklineService.getStockLineList().subscribe(
      result => {},
      error => {
        this.alertService.showMessage(
          this.moduleName,
          'Something Went Wrong',
          MessageSeverity.error
        );
      }
    );
  }

  getAllIterMasters(): void {
    this.itemMasterService
      .getItemMasterList()
      .subscribe(result => {}, error => {});
  }

  onCustomerSelected(event, selectionType): void {
    if (selectionType == 'name') {
      for (let i = 0; i < this.customers.length; i++) {
        if (event == this.customers[i].name) {
          this.workOrder.customerId = this.customers[i].customerId;
          this.selectedCustomer = new Customer();
          this.selectedCustomer = this.customers[i];
          //this.selectedCustomer.p
        }
      }
    } else {
      for (let i = 0; i < this.customers.length; i++) {
        if (event == this.customers[i].customerCode) {
          this.workOrder.customerId = this.customers[i].customerId;
          this.selectedCustomer = new Customer();
          this.selectedCustomer = this.customers[i];
        }
      }
    }
  }

  filterCustomer(event, selectionType): void {
    if (selectionType == 'name') {
      this.customerNames = []; //['abc','aaa','aa1'];
      this.filteredCustomerNames = [];
      if (this.customers.length > 0) {
        for (let i = 0; i < this.customers.length; i++) {
          let name: string = this.customers[i].name;
          if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredCustomerNames.push([
              {
                customerId: this.customers[i].customerId,
                name: name
              }
            ]),
              this.customerNames.push(name);
          }
        }
      }
    } else {
      this.customerCodes = []; //['abc','aaa','aa1'];
      this.filteredCustomerCode = [];
      if (this.customers.length > 0) {
        for (let i = 0; i < this.customers.length; i++) {
          let name: string = this.customers[i].customerCode;
          if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredCustomerCode.push([
              {
                customerId: this.customers[i].customerId,
                name: name
              }
            ]),
              this.customerCodes.push(name);
          }
        }
      }
    }
  }

  filterEmployee(event): void {
    this.employeeNames = [];
    this.filteredEmployeeNames = [];
    if (this.employees.length > 0) {
      for (let i = 0; i < this.employees.length; i++) {
        let employeeName: string = this.employees[i].firstName;
        if (
          employeeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0
        ) {
          this.filteredEmployeeNames.push({
            employeeId: this.employees[i].employeeId,
            employeeName: employeeName
          });
          this.employeeNames.push(employeeName);
        }
      }
    }
  }

  onEmployeeSelected(event, selection): void {
    for (let i = 0; i < this.employees.length; i++) {
      let employeeName: string = this.employees[i].firstName;
      if (employeeName.toLowerCase().indexOf(event.toLowerCase()) == 0) {
        if (selection == 'employee') {
          this.workOrder.employeeId = this.employees[i].employeeId;
        } else {
          this.workOrder.salesPerson = this.employees[i].firstName;
        }
      }
    }
  }
}
