import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
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
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { Billing } from '../../../../models/work-order-billing.model';
import * as moment from 'moment';
import { WorkOrderQuoteService } from '../../../../services/work-order/work-order-quote.service';
import { CustomerViewComponent } from '../../../../shared/components/customer/customer-view/customer-view.component';


@Component({
    selector: 'app-work-order-add',
    templateUrl: './work-order-add.component.html',
    styleUrls: ['./work-order-add.component.scss'],
    animations: [fadeInOut]
})
/** WorkOrderAdd component*/
export class WorkOrderAddComponent implements OnInit, AfterViewInit {
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
    @Input() isSubWorkOrder: boolean = false;
    @Input() subWorkOrderDetails;
    @Input() showTabsGrid = false;
    @Input() workOrderId;
    @Input() currencyList;
    @Input() legalEntityList;
    @Input() workFlowWorkOrderId = 0;
    @Input() showGridMenu = false;


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
    // showTabsGrid: Boolean = false;
    worflowId = [];
    selectedWorkFlowId: number;
    isContract = true;
    gridActiveTab: String = 'workFlow';
    subTabWorkFlow: String = '';
    // WorkOrder general Information Object Modal

    // Address Information Object Modal
    addresses: addressesForm;
    // Document Object Modal
    documents: Documents[] = [];
    // quote Object Modal
    quote: WorkOrderQuote;
    // labor Object Modal
    labor = new WorkOrderLabor();
    isWorkOrder: boolean = true;
    data: any;

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
    workOrderAssetList: any = [];
    // workOrderId;
    // workFlowWorkOrderId: any = 0;
    workOrderMaterialList: any = [];
    mpnPartNumbersList: any = [];
    stockLineList: any;
    workOrderWorkFlowOriginalData: any;
    isDisabledSteps: boolean = false;
    workFlowId: any = 0;
    editWorkFlowData: any;
    modal: NgbModalRef;

    workFlowObject = {
        materialList: [],
        equipments: [],
        charges: [],
        exclusions: []
    }
    materialStatus: any;
    workOrderLaborList: any;
    taskList: any;
    subTabOtherOptions: any = '';
    workOrderChargesList: Object;
    workOrderExclusionsList: Object;
    isEditLabor: boolean = false;
    // mpnId: any;
    billing: Billing = undefined;
    loginDetailsForCreate: any;
    workOrderPartNumberId: any;
    isEditBilling: boolean = false;
    isWorkOrderMainView: boolean = false;
    mainWorkOrderId: any = 0;
    quoteData: any;
    workOrderQuoteId: any;
    quoteExclusionList: any = [];
    quoteMaterialList: any = [];
    quoteFreightsList: any = [];
    quoteChargesList: any = [];
    quoteLaborList: any = [];
    // workScope: any;
    workScope: any;
    subTabMainComponent: any = '';
    mpnGridData: any;
    showTabsMPNGrid: boolean = false;
    businessUnitList: any;
    divisionList: any;
    departmentList: any;
    managementStructure = {
        companyId: null,
        buId: null,
        divisionId: null,
        departmentId: null,
    }



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
        private modalService: NgbModal,
        private quoteService: WorkOrderQuoteService

    ) {
        // this.workOrderPartNumbers = [];
        // this.workOrder = new WorkOrder();
        // this.workOrder.isSinglePN = true;
        // this.workOrder.customerContactId = 68;
        // this.workOrder.masterCompanyId = 1;
        this.moduleName = 'Work Order';
    }

    ngAfterViewInit() {
        this.getTaskList();
    }
    async ngOnInit() {
        this.createModeData();

        //  this.showTabsGrid = true;
        this.workOrderService.creditTerms = this.creditTerms;
        // this.workOrderService.employeesOriginalData = this.employeesOriginalData;
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


        if (!this.isSubWorkOrder) { // subWorkOrder false
            if (!this.isEdit) { // create new WorkOrder

                this.isEditLabor = true;
                this.addMPN();
                this.getAllGridModals();



            } else { // edit WorkOrder
                console.log(this.workOrderGeneralInformation);
                this.getWorkOrderQuoteDetail(this.workOrderGeneralInformation.workOrderId, this.workOrderGeneralInformation.workFlowWorkOrderId);
                const data = this.workOrderGeneralInformation;
                this.commonService.getManagementStructureDetails(data.managementStructureId).subscribe(res => {
                    this.selectedLegalEntity(res.Level1);
                    this.selectedBusinessUnit(res.Level2);
                    this.selectedDivision(res.Level3);
                    this.selectedDepartment(res.Level4);
                    this.managementStructure = {
                        companyId: res.Level1 !== undefined ? res.Level1 : null,
                        buId: res.Level2 !== undefined ? res.Level2 : null,
                        divisionId: res.Level3 !== undefined ? res.Level3 : null,
                        departmentId: res.Level4 !== undefined ? res.Level4 : null,
                    }

                })
                this.workOrderGeneralInformation = {
                    ...data,
                    workOrderTypeId: String(data.workOrderTypeId),
                    customerReference: data.customerReference,
                    csr: data.csr,
                    customerId: data.customerDetails,
                    employeeId: getObjectById('value', data.employeeId, this.employeesOriginalData),
                    salesPersonId: getObjectById('value', data.employeeId, this.employeesOriginalData),

                    partNumbers: data.partNumbers.map((x, index) => {

                        this.getRevisedpartNumberByItemMasterId(x.masterPartId, index);
                        this.getStockLineByItemMasterId(x.masterPartId, x.conditionId, index);
                        this.getConditionByItemMasterId(x.masterPartId, index);
                        this.getWorkFlowByPNandScope({ ...x, masterPartId: getObjectById('itemMasterId', x.masterPartId, this.partNumberOriginalData) });
                        this.getPartPublicationByItemMasterId(x.masterPartId);
                        return {
                            ...x,
                            technicianId: getObjectById('value', x.technicianId, this.employeesOriginalData),
                            masterPartId: getObjectById('itemMasterId', x.masterPartId, this.partNumberOriginalData),
                            mappingItemMasterId: getObjectById('mappingItemMasterId', x.mappingItemMasterId, x.revisedParts),
                        }


                    })
                }


                this.workFlowWorkOrderId = data.workFlowWorkOrderId;
                if (data.isSinglePN) {
                    this.workFlowId = data.partNumbers[0].workflowId;
                    this.workOrderPartNumberId = data.partNumbers[0].id;
                    this.workScope = data.partNumbers[0].workScope;
                    this.showTabsGrid = true;
                    this.showGridMenu = true;
                } else {
                    this.showTabsGrid = true;
                    this.showTabsMPNGrid = true;
                }

                this.workOrderId = data.workOrderId;
                this.savedWorkOrderData = this.workOrderGeneralInformation;
                this.getWorkOrderWorkFlowNos();
                // this.billingCreateOrEdit();


            }
        } else {
            console.log(this.subWorkOrderDetails);

            this.workOrderPartNumberId = this.subWorkOrderDetails.mpnid;
            this.workFlowId = this.subWorkOrderDetails.workFlowId;
            this.mainWorkOrderId = this.subWorkOrderDetails.workorderid;
            this.savedWorkOrderData = {
                workOrderId: this.workOrderId,
                workFlowId: this.workFlowId,
                workFlowWorkOrderId: this.workFlowWorkOrderId
            }
            this.getWorkOrderWorkFlowNos();

        }






    }





    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    createModeData() {
        this.loginDetailsForCreate = {
            masterCompanyId: 1,
            createdBy: this.userName,
            updatedBy: this.userName,
            createdDate: new Date(),
            updatedDate: new Date(),
            isActive: true,
            isDeleted: false
        }
    }


    // create all Forms in the Grid
    getAllGridModals() {
        this.gridActiveTab = 'workFlow';
        this.addresses = new addressesForm();
        this.documents = [new Documents()];
        this.quote = new WorkOrderQuote();
        this.labor = new WorkOrderLabor();
        this.billing = new Billing();
        // adding Form Object Dynamically
        // this.generateLaborForm();
    }




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
    viewCustomerDetails(customerId) {

        console.log();
        this.modal = this.modalService.open(CustomerViewComponent, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.componentInstance.customerId = customerId;
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    clearautoCompleteInput(currentRecord, field) {
        currentRecord[field] = null;
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


    // Change of Table Grid
    gridTabChange(value) {
        this.gridActiveTab = value;
        // if(this.gridActiveTab === 'subWO'){
        //     this.issubWorkOrderState = true;
        // }
        this.subTabWorkFlow = '';
        this.subTabOtherOptions = '';
        this.subTabMainComponent = '';
        if (value !== 'billorInvoice') {
            this.billing = undefined;
        }
        if (value == 'workOrderMain') {
            this.isWorkOrderMainView = true;
        }

    }

    selectedLegalEntity(legalEntityId) {
        if (legalEntityId) {
            this.workOrderGeneralInformation.managementStructureId = legalEntityId;
            this.commonService.getBusinessUnitListByLegalEntityId(legalEntityId).subscribe(res => {
                this.businessUnitList = res;
            })
        }

    }
    selectedBusinessUnit(businessUnitId) {
        if (businessUnitId) {
            this.workOrderGeneralInformation.managementStructureId = businessUnitId;
            this.commonService.getDivisionListByBU(businessUnitId).subscribe(res => {
                this.divisionList = res;
            })
        }

    }
    selectedDivision(divisionUnitId) {
        if (divisionUnitId) {
            this.workOrderGeneralInformation.managementStructureId = divisionUnitId;
            this.commonService.getDepartmentListByDivisionId(divisionUnitId).subscribe(res => {
                this.departmentList = res;
            })
        }

    }
    selectedDepartment(departmentId) {
        if (departmentId) {
            this.workOrderGeneralInformation.managementStructureId = departmentId;
        }
    }

    toggleDisplayMode(): void {
        this.isDetailedView = !this.isDetailedView;
    }
    // Handles radio Button single or Multiple
    toggleWorkOrderType(value): void {
        console.log(value);

        // this.workOrderGeneralInformation.isSinglePN = value;
        this.showTabsGrid = false;
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

        this.gridActiveTab = '';
        this.subTabOtherOptions = '';
        this.subTabMainComponent = '';


    }

    deleteMPN(index) {
        this.workOrderGeneralInformation.partNumber = this.workOrderGeneralInformation.partNumber.splice(index, 1);
    }



    saveWorkOrder(): void {
        this.mpnPartNumbersList = [];
        // this.showTabsGrid = true; // Show Grid Boolean
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
    createQuote() {
        window.open(` /workordersmodule/workorderspages/app-work-order-quote?workorderid=${this.workOrderId}`);
        // [routerLink]="['/workordersmodule/workorderspages/app-work-order-quote']"[queryParams]="{workOrderId: savedWorkOrderData['workOrderId']}"

    }


    saveWorkOrderGridLogic(result, data) {
        this.savedWorkOrderData = result;
        // this.loadMPNlist();
        this.getWorkFlowData();
        this.workOrderId = result.workOrderId;
        this.workOrderGeneralInformation.workOrderNumber = result.workOrderNum;


        if (this.workFlowWorkOrderId !== 0) {
            this.isDisabledSteps = true;
        }
        this.getWorkOrderWorkFlowNos();

        if (this.workOrderGeneralInformation.isSinglePN == true) {
            // get WorkFlow Equipment Details if WorFlow Exists
            this.showTabsGrid = true;  // Show Grid Boolean
            this.workOrderPartNumberId = result.partNumbers[0].id;
            this.workFlowId = result.partNumbers[0].workflowId;
            this.workFlowWorkOrderId = result.workFlowWorkOrderId;
            this.workScope = result.partNumbers[0].workScope;
            this.showGridMenu = true;
            this.getWorkFlowTabsData();
        } else {
            this.showTabsGrid = true;  // Show Grid Boolean
            this.showTabsMPNGrid = true;
        }


    }




    onSelectedPartNumber(object, currentRecord, index) {
        console.log('Sample PN');

        debugger;
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
        currentRecord.tatDaysStandard = object.tatDaysStandard === null ? '' : object.tatDaysStandard
        currentRecord.revisedPartNo = object.revisedPartNo
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
        workOrderPart.serialNumber = '';

        if ((stockLineId !== null && stockLineId !== 0) && (conditionId !== null && conditionId !== 0)) {
            this.workOrderService.getSerialNoByStockLineId(stockLineId, conditionId).subscribe(res => {
                if (res) {
                    workOrderPart.serialNumber = res.serialNumber;
                }
            })
        }
    }

    getWorkFlowByPNandScope(workOrderPart) {

        workOrderPart.workflowId = 0;
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


    getWorkFlowData() {
        this.selectedWorkFlowId = this.savedWorkOrderData.partNumbers[0].workflowId;
        if (this.selectedWorkFlowId != 0) {
            this.workFlowtService.getWorkFlowDataByIdForEdit(this.selectedWorkFlowId)
                .subscribe(
                    (workFlowData) => {
                        this.employeeService.workFlowIdData = workFlowData;
                        console.log(this.employeeService.workFlowIdData);
                    }
                )
        }
    }



    changeofMPN(data) {
        console.log(data)
        this.mpnGridData = data.datas;
        // data.workOrderWorkFlowId
        // const data = object;
        // Used to Sub WorkOrder;
        // this.mpnId = data.masterPartId;
        this.workFlowId = data.workflowId,
            this.workFlowWorkOrderId = data.workOrderWorkFlowId;
        this.workOrderPartNumberId = data.workOrderPartNumberId;
        this.workScope = data.workscope;
        this.showGridMenu = true;

        // console.log(workFlowWorkOrderId);

        this.getWorkFlowTabsData();

    }

    getWorkFlowTabsData() {

        this.getEquipmentByWorkOrderId();
        this.getMaterialListByWorkOrderId();
        this.getWorkFlowLaborList();
        this.getChargesListByWorkOrderId();
        // this.getWorkOrderWorkFlowBywfwoId(this.workFlowWorkOrderId);
    }




    // getWorkOrderWorkFlowBywfwoId(workFlowWorkOrderId) {

    //   this.workOrderService.getWorkOrderWorkFlowByWorkFlowWorkOrderId(workFlowWorkOrderId).subscribe(res => {

    //   })
    // }

    closeWorkOrderMainView(value) {
        this.isWorkOrderMainView = value;
    }

    savedWorkFlowData(workFlowDataObject) {
        this.workOrderService.createWorkFlowWorkOrder(workFlowDataObject).subscribe(res => {
            this.workFlowWorkOrderData = res;
            this.workFlowWorkOrderId = res.workFlowWorkOrderId;

            if (this.workFlowWorkOrderId !== 0) {
                this.isDisabledSteps = true;
            }
            this.getWorkOrderWorkFlowNos();
            this.getWorkFlowLaborList();
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
        console.log(this.workOrderId);
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
                            datas: x,
                            workOrderWorkFlowId: x.value,
                            workOrderNo: x.label,
                            masterPartId: x.masterPartId,
                            workflowId: x.workflowId,
                            workflowNo: x.workflowNo,
                            partNumber: x.partNumber,
                            workOrderPartNumberId: x.workOrderPartNumberId,
                            workScope: x.workscope
                        },
                        label: x.partNumber
                    }
                })
            })
        }

    }

    saveWorkOrderMaterialList(data) {

        const materialArr = data.materialList.map(x => {
            return {
                ...x,
                masterCompanyId: 1,
                isActive: true,
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
            // this.getWorkFlowLaborList();
        })

    }

    updateWorkOrderMaterialList(data) {
        const materialArr = data.materialList.map(x => {
            return {
                ...x,
                masterCompanyId: 1,
                isActive: true,
                workOrderId: this.workOrderId, workFlowWorkOrderId: this.workFlowWorkOrderId
            }
        })
        console.log(data);
        this.workOrderService.updateWorkOrderMaterialList(materialArr).subscribe(res => {
            this.workFlowObject.materialList = [];
            this.alertService.showMessage(
                this.moduleName,
                'update Work Order MaterialList  Succesfully',
                MessageSeverity.success
            );
            this.getMaterialListByWorkOrderId();

        })
    }


    getTaskList() {
        if (this.labor == undefined) {
            this.labor = new WorkOrderLabor()
        }
        this.labor.workOrderLaborList = [];
        this.labor.workOrderLaborList.push({})
        this.workOrderService.getAllTasks()
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
        this.workOrderService.createWorkOrderLabor(this.formWorkerOrderLaborJson(data)).subscribe(res => {
            this.alertService.showMessage(
                this.moduleName,
                'Saved Work Order Labor  Succesfully',
                MessageSeverity.success
            );
        })
    }


    openCurrency(content) {
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }







    saveWorkOrderEquipmentList(data) {
        const equipmentArr = data.equipments.map(x => {
            return {
                ...x,
                masterCompanyId: 1,
                isActive: true,
                workOrderId: this.workOrderId, workFlowWorkOrderId: this.workFlowWorkOrderId
            }
        })

        this.workOrderService.createWorkOrderEquipmentList(equipmentArr).subscribe(res => {
            this.workFlowObject.equipments = [];
            this.alertService.showMessage(
                this.moduleName,
                'Saved Work Order Equipment Succesfully',
                MessageSeverity.success
            );
            this.getEquipmentByWorkOrderId();
        })
    }

    updateWorkOrderEquipmentList(data) {
        const equipmentArr = data.equipments.map(x => {
            return {
                ...x,
                masterCompanyId: 1,
                isActive: true,
                workOrderId: this.workOrderId, workFlowWorkOrderId: this.workFlowWorkOrderId
            }
        })


        this.workOrderService.updateWorkOrderEquipmentList(equipmentArr).subscribe(res => {
            this.workFlowObject.equipments = [];
            this.alertService.showMessage(
                this.moduleName,
                'Updated  Work Order Equipment Succesfully',
                MessageSeverity.success
            );
            this.getEquipmentByWorkOrderId();
        })
    }



    saveWorkOrderChargesList(data) {
        const chargesArr = data.charges.map(x => {
            return {
                ...x,
                masterCompanyId: 1,
                isActive: true,
                workOrderId: this.workOrderId, workFlowWorkOrderId: this.workFlowWorkOrderId
            }
        })
        console.log(data);
        this.workOrderService.createWorkOrderChargesList(chargesArr).subscribe(res => {
            this.workFlowObject.charges = [];
            this.alertService.showMessage(
                this.moduleName,
                'Saved Work Order Charges  Succesfully',
                MessageSeverity.success
            );
            this.getChargesListByWorkOrderId();
        })
    }



    updateWorkOrderChargesList(data) {
        const chargesArr = data.charges.map(x => {
            return {
                ...x,
                masterCompanyId: 1,
                isActive: true,
                workOrderId: this.workOrderId, workFlowWorkOrderId: this.workFlowWorkOrderId
            }
        })
        console.log(data);
        this.workOrderService.updateWorkOrderChargesList(chargesArr).subscribe(res => {
            this.workFlowObject.charges = [];
            this.alertService.showMessage(
                this.moduleName,
                'Update Work Order Charges  Succesfully',
                MessageSeverity.success
            );
            this.getChargesListByWorkOrderId();
        })
    }

    formWorkerOrderLaborJson(data) {

        let result = {
            "workFlowWorkOrderId": this.workFlowWorkOrderId,
            //"workFlowWorkOrderId": data['workFlowWorkOrderId'],
            "workOrderId": data['workOrderId'],
            "dataEnteredBy": data['dataEnteredBy'],
            "expertiseId": data['expertiseId'],
            "employeeId": data['employeeId'],
            "isTaskCompletedByOne": data['isTaskCompletedByOne'],
            "workFloworSpecificTaskorWorkOrder": data['workFloworSpecificTaskorWorkOrder'],
            "hoursorClockorScan": data['hoursorClockorScan'],
            "masterCompanyId": 1,
            "CreatedBy": "admin",
            "UpdatedBy": "admin",
            "IsActive": true,
            "IsDeleted": false,
            "workOrderLaborHeaderId": data['workOrderLaborHeaderId'],
            "totalWorkHours": data['totalWorkHours'],
            "LaborList": [

            ]
        }
        for (let labList in data.workOrderLaborList) {
            for (let labSubList of data.workOrderLaborList[labList]) {
                if (labSubList['expertiseId'] != null)
                    result.LaborList.push(labSubList);
            }
        }
        return result;
    }

    saveReservedPartorIssue(alternatePartData) {
        this.workOrderService.saveReservedPartorIssue(alternatePartData).subscribe(res => {
            this.alertService.showMessage(
                this.moduleName,
                'Updated Parts Data',
                MessageSeverity.success
            );
            this.getMaterialListByWorkOrderId();
            this.getWorkFlowLaborList();
        })
    }



    getEquipmentByWorkOrderId(event?) {
        if (this.workFlowWorkOrderId !== 0 && this.workOrderId) {
            // this.workFlowWorkOrderId = this.workFlowWorkOrderData.workFlowWorkOrderId;
            this.workOrderService.getWorkOrderAssetList(this.workFlowWorkOrderId, this.workOrderId).subscribe(
                result => {
                    this.workOrderAssetList = result;
                }
            )
        }

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


    clearLaborList() {

        for (let task of this.taskList) {
            this.labor.workOrderLaborList[0][task.description.toLowerCase()] = [new AllTasks()];
        }
    }



    getWorkFlowLaborList() {


        this.clearLaborList();

        if (this.workFlowWorkOrderId !== 0 && this.workOrderId) {
            this.workOrderService.getWorkOrderLaborList(this.workFlowWorkOrderId, this.workOrderId).subscribe(res => {
                this.data = {};
                this.data = res;
                if (res) {
                    this.workOrderLaborList = {
                        ...this.data,
                        workFlowWorkOrderId: getObjectById('value', this.data.workFlowWorkOrderId, this.workOrderWorkFlowOriginalData),
                        employeeId: getObjectById('value', this.data.employeeId, this.employeesOriginalData),
                        dataEnteredBy: getObjectById('value', this.data.employeeId, this.employeesOriginalData),
                    };
                }


                if (res) {

                    for (let labList of this.data['laborList']) {
                        for (let task of this.taskList) {

                            if (task.taskId == labList['taskId']) {
                                if (this.labor.workOrderLaborList[0][task.description.toLowerCase()][0]['expertiseId'] == undefined || this.labor.workOrderLaborList[0][task.description.toLowerCase()][0]['expertiseId'] == null) {
                                    this.labor.workOrderLaborList[0][task.description.toLowerCase()].splice(0, 1);
                                }
                                let taskData = new AllTasks()
                                taskData['workOrderLaborHeaderId'] = labList['workOrderLaborHeaderId'];
                                taskData['workOrderLaborId'] = labList['workOrderLaborId'];
                                taskData['expertiseId'] = labList['expertiseId'];
                                taskData['employeeId'] = getObjectById('value', labList['employeeId'], this.employeesOriginalData);
                                //taskData['employeeId'] = labList['employeeId'];
                                taskData['billableId'] = labList['billableId'];
                                taskData['startDate'] = labList['startDate'];
                                taskData['endDate'] = labList['endDate'];
                                taskData['hours'] = labList['hours'];
                                taskData['adjustments'] = labList['adjustments'];
                                taskData['adjustedHours'] = labList['adjustedHours'];
                                taskData['memo'] = labList['memo'];
                                this.labor.workOrderLaborList[0][task.description.toLowerCase()].push(taskData);
                                break;
                            }
                        }
                    }
                }
                console.log(this.workOrderLaborList);
            })
        }
    }


    otherOptionTabSelected(value) {
        this.subTabWorkFlow = '';
        this.subTabMainComponent = '';
        this.subTabOtherOptions = value;
        if (value === 'charges') {
            this.getChargesListByWorkOrderId();
        } else if (value === 'exclusions') {
            this.getExclusionListByWorkOrderId();
        }
    }

    mainComponentTabSelected(value) {
        this.subTabMainComponent = value;

    }


    getChargesListByWorkOrderId() {
        if (this.workFlowWorkOrderId !== 0 && this.workOrderId) {
            this.workOrderService.getWorkOrderChargesList(this.workFlowWorkOrderId, this.workOrderId).subscribe(res => {
                this.workOrderChargesList = res;
            })

        }

    }


    saveWorkOrderExclusionsList(data) {
        const exclusionsArr = data.exclusions.map(x => {
            return {
                ...x,
                masterCompanyId: 1,
                isActive: true,
                workOrderId: this.workOrderId, workFlowWorkOrderId: this.workFlowWorkOrderId,
                estimtPercentOccurranceId: x.estimtPercentOccurrance
            }
        });
        this.workOrderService.createWorkOrderExclusionList(exclusionsArr).subscribe(res => {
            this.workFlowObject.charges = [];
            this.alertService.showMessage(
                this.moduleName,
                'Saved Work Order Exclusions  Succesfully',
                MessageSeverity.success
            );
            this.getExclusionListByWorkOrderId();
        })
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
        this.workOrderService.updateWorkOrderExclusionList(exclusionsArr).subscribe(res => {
            this.workFlowObject.charges = [];
            this.alertService.showMessage(
                this.moduleName,
                'Update Work Order Exclusions  Succesfully',
                MessageSeverity.success
            );
            this.getExclusionListByWorkOrderId();
        })
    }


    getExclusionListByWorkOrderId() {

        if (this.workFlowWorkOrderId !== 0 && this.workOrderId) {
            this.workOrderService.getWorkOrderExclusionsList(this.workFlowWorkOrderId, this.workOrderId).subscribe(res => {
                this.workOrderExclusionsList = res;
            })

        }

    }



    filterPartNumber(event) {
        this.partNumberList = this.partNumberOriginalData;
        // this.loadMPNlist();

        if (event.query !== undefined && event.query !== null) {
            const partNumbers = [...this.partNumberOriginalData.filter(x => {

                return x.partNumber.toLowerCase().includes(event.query.toLowerCase())
            })]
            this.partNumberList = partNumbers;
            // this.loadMPNlist();
        }
    }




    saveWorkOrderBilling(object) {
        const data = {
            ...object,
            ...this.loginDetailsForCreate,
            workOrderId: this.workOrderId,
            workFlowWorkOrderId: this.workFlowWorkOrderId,
            workOrderPartNoId: this.workOrderPartNumberId,
            itemMasterId: this.workOrderPartNumberId,
            customerId: editValueAssignByCondition('customerId', this.savedWorkOrderData.customerId),
            employeeId: editValueAssignByCondition('value', this.savedWorkOrderData.employeeId),
            soldToCustomerId: editValueAssignByCondition('customerId', object.soldToCustomerId),
            shipToCustomerId: editValueAssignByCondition('customerId', object.shipToCustomerId),
            invoiceTime: moment(object.invoiceTime, ["h:mm A"]).format("HH:mm")
        }

        if (this.isEditBilling) {
            this.workOrderService.updateBillingByWorkOrderId(data).subscribe(res => {

                // this.getQuoteIdByWfandWorkOrderId();
                this.alertService.showMessage(
                    this.moduleName,
                    'Updated Work Order Billing Succesfully',
                    MessageSeverity.success
                );
            })
        } else {
            this.workOrderService.createBillingByWorkOrderId(data).subscribe(res => {
                // this.getQuoteIdByWfandWorkOrderId();
                this.alertService.showMessage(
                    this.moduleName,
                    'Saved Work Order Billing Succesfully',
                    MessageSeverity.success
                );
            })
        }

    }

    billingCreateOrEdit() {
        this.getQuoteIdByWfandWorkOrderId();
        this.workOrderService.getBillingEditData(this.workOrderId, this.workOrderPartNumberId).subscribe(res => {
            // Edit
            this.billing = {
                ...res,
                shipDate: new Date(res.shipDate),
                printDate: new Date(res.printDate),
                woOpenDate: new Date(res.openDate),
                invoiceDate: new Date(res.invoiceDate),
                soldToCustomerId: { customerId: res.soldToCustomerId, customerName: res.soldToCustomer },
                shipToCustomerId: { customerId: res.shipToCustomerId, customerName: res.shipToCustomer },
                customerRef: res.customerReference,
                woType: res.workOrderType,
                shipAccountInfo: res.shippingAccountinfo
            }
            this.isEditBilling = true;
        }, error => {
            this.getWorkOrderDetailsFromHeader();
        })
    }

    getWorkOrderDetailsFromHeader() {
        this.workOrderService.viewWorkOrderHeader(this.workOrderId).subscribe(res => {
            const data = res;
            // create
            this.billing = new Billing();
            this.billing = {
                ...this.billing,
                customerRef: data.customerReference,
                employeeName: data.employee,
                woOpenDate: new Date(data.openDate),
                salesPerson: data.salesperson,
                woType: data.workOrderType,
                creditTerm: data.creditTerm,
                workScope: this.workScope,
                managementStructureId: data.managementStructureId

            }
        })
    }
    // getCustomerNameandCodeById(customerId, object, field) {
    //     if (customerId !== null || customerId !== undefined) {
    //         this.commonService.getCustomerNameandCodeById(customerId).subscribe(res => {
    //             object[field] = res[0];
    //         })
    //     }

    // }

    getQuoteIdByWfandWorkOrderId() {
        // this.workFlowWorkOrderId, this.workOrderId
        this.quoteService.getQuoteIdByWfandWorkOrderId(this.workFlowWorkOrderId, this.workOrderId).subscribe(res => {

            if (res) {
                this.quoteData = res;
                this.workOrderQuoteId = res.workOrderQuote.workOrderQuoteId;
                console.log(this.workOrderQuoteId, res.workOrderQuoteId, res);

                this.getQuoteCostingData();
            }

        })
    }


    getQuoteCostingData() {
        // if(this.workOrderQuoteId){
        // this.getQuoteExclusionListByWorkOrderQuoteId();
        this.getQuoteMaterialListByWorkOrderQuoteId();
        this.getQuoteFreightsListByWorkOrderQuoteId();
        this.getQuoteChargesListByWorkOrderQuoteId();
        this.getQuoteLaborListByWorkOrderQuoteId();

        // this.calculateTotalWorkOrderCost();

        // }

    }

    // getQuoteExclusionListByWorkOrderQuoteId() {

    //     this.quoteService.getQuoteExclusionList(this.workOrderQuoteId).subscribe(res => {
    //         this.quoteExclusionList = res;
    //     })
    // }

    async getQuoteMaterialListByWorkOrderQuoteId() {
        await this.quoteService.getQuoteMaterialList(this.workOrderQuoteId).subscribe(res => {
            this.quoteMaterialList = res;
            this.sumOfMaterialList();
        })
    }
    async getQuoteFreightsListByWorkOrderQuoteId() {
        await this.quoteService.getQuoteFreightsList(this.workOrderQuoteId).subscribe(res => {
            this.quoteFreightsList = res;

        })
    }
    async getQuoteChargesListByWorkOrderQuoteId() {
        await this.quoteService.getQuoteChargesList(this.workOrderQuoteId).subscribe(res => {
            this.quoteChargesList = res;
            this.sumofCharges();
        })
    }
    async getQuoteLaborListByWorkOrderQuoteId() {
        await this.quoteService.getQuoteLaborList(this.workOrderQuoteId).subscribe(res => {
            if (res) {
                this.quoteLaborList = res.laborList;
                this.sumofLaborOverHead();
            }

        })

    }

    // calculateTotalWorkOrderCost() {
    //     this.sumOfMaterialList();
    //     this.sumofCharges();
    //     this.sumofLaborOverHead();
    //     this.billing.totalWorkOrderCost = (this.billing.materialCost + this.billing.laborOverHeadCost + this.billing.miscChargesCost);

    // }
    sumOfMaterialList() {
        // this.billing = { ...this.billing, materialCost: 0 }
        this.billing.materialCost = this.quoteMaterialList.reduce((acc, x) => acc + x.materialCostPlus, 0);

    }
    sumofLaborOverHead() {
        this.billing.laborOverHeadCost = this.quoteLaborList.reduce((acc, x) => acc + x.labourCostPlus, 0);
    }

    sumofCharges() {
        this.billing.miscChargesCost = this.quoteChargesList.reduce((acc, x) => acc + x.chargesCostPlus, 0);
        this.calculateTotalWorkOrderCost();
    }

    calculateTotalWorkOrderCost() {
        this.billing.totalWorkOrderCost = (this.billing.materialCost + this.billing.laborOverHeadCost + this.billing.miscChargesCost);
    }

    getWorkOrderQuoteDetail(workOrderId, workFlowWorkOrderId) {
        this.quoteService.getWorkOrderQuoteDetail(workOrderId, workFlowWorkOrderId)
            .subscribe(
                (res: any) => {
                    if (res) {
                        this.workOrderQuoteId = res.workOrderQuote.workOrderQuoteId;
                    }
                }
            )
    }







}
