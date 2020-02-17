import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { CreditTermsService } from '../../../../services/Credit Terms.service';
import { CustomerService } from '../../../../services/customer.service';
import { EmployeeService } from '../../../../services/employee.service';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { WorkOrderPartNumberService } from '../../../../services/work-order/work-order-part-number.service';
import { StocklineService } from '../../../../services/stockline.service';
import { CommonService } from '../../../../services/common.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { getObjectById, getValueByFieldFromArrayofObject } from '../../../../generic/autocomplete';
import { workOrderGeneralInfo } from '../../../../models/work-order-generalInformation.model';
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators';


@Component({
    selector: 'app-work-order-smart',
    templateUrl: './work-order-smart.component.html',
})
/** WorkOrderShipping component*/
export class WorkOrderSmartComponent implements OnInit {
    @Input() isSubWorkOrder = false;
    @Input() paramsData;
    @Input() showTabsGrid;
    @Input() showGridMenu;
    @Input() subWorkOrderId;
    @Input() workFlowWorkOrderId;

    creditTerms: any;
    employeesOriginalData: any;
    workScopesList: { label: string; value: number; }[];
    workOrderStagesList: any;
    priorityList: any;
    workOrderTypes: any;
    workOrderStatusList: any;
    partNumberOriginalData: Object;
    workOrderId: any;
    recCustmoerId: any;
    editWorkOrderGeneralInformation: any;
    workOrderGeneralInformation: workOrderGeneralInfo = new workOrderGeneralInfo();
    isEdit: boolean = false;
    currencyList: any;
    legalEntityList: any;
    private onDestroy$: Subject<void> = new Subject<void>();
    conditionList: any;
    workOrderOriginalStageList: any;
    conditionId: any;
    jobTitles: any;
    salesPersonOriginalList: Object;
    csrOriginalList: Object;
    /** WorkOrderShipping ctor */
    constructor(private alertService: AlertService,
        private workOrderService: WorkOrderService,
        private creditTermsService: CreditTermsService,
        private customerService: CustomerService,
        private employeeService: EmployeeService,
        private itemMasterService: ItemMasterService,
        private workOrderPartNumberService: WorkOrderPartNumberService,
        private stocklineService: StocklineService,
        private commonService: CommonService,
        private authService: AuthService,
        private acRouter: ActivatedRoute
    ) { }


    ngOnInit() {

        this.getConditionsList();
        this.getAllWorkOrderTypes();
        this.getAllWorkOrderStatus();
        this.getAllCreditTerms();
        // this.getAllCustomers();
        this.getAllEmployees();
        this.getJobTitles();
        this.getAllWorkScpoes();
        this.getAllWorkOrderStages();
        //this.getMultiplePartsNumbers();
        this.getAllPriority();
        this.getCurrency();
        this.getLegalEntity();

        if (this.isSubWorkOrder) {
            this.subWorkOrderId = this.subWorkOrderId;
            // this.workOrderId = this.acRouter.snapshot.params['id'];
            // this.workOrderId = this.paramsData.workorderid;
        } else {
            // get the workOrderId on Edit Mode
            this.workOrderId = this.acRouter.snapshot.params['id'];
            this.recCustmoerId = this.acRouter.snapshot.params['rcustid'];

        }

        if (this.workOrderId || this.recCustmoerId) {
            if (this.recCustmoerId) {
                this.showTabsGrid = false;
                this.workOrderId = 0;
            }
            else {

                this.recCustmoerId = 0;
            }
            this.workOrderService.getWorkOrderById(this.workOrderId, this.recCustmoerId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

                this.getPartNosByCustomer(res.customerId);

                this.isEdit = true;


                const workOrderData = res;
                const data = {
                    ...res,
                    workOrderNumber: res.workOrderNum,
                    openDate: new Date(res.openDate),
                    customerId: res.customerId,
                    partNumbers: res.partNumbers.map(x => {
                        return {
                            ...x,


                            customerRequestDate: new Date(x.customerRequestDate),
                            promisedDate: new Date(x.promisedDate),
                            estimatedCompletionDate: new Date(x.estimatedCompletionDate),
                            estimatedShipDate: new Date(x.estimatedShipDate),

                        }

                    })
                }
                this.editWorkOrderGeneralInformation = data;
            })
        }



    }


    ngOnDestroy(): void {
        this.onDestroy$.next();
    }





    getCustomerNameandCodeById(object) {
        const { customerId } = object;
        this.commonService.getCustomerNameandCodeById(customerId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            object.customer = res;
        })
    }

    getAllWorkOrderTypes(): void {
        this.workOrderService.getAllWorkOrderTypes().pipe(takeUntil(this.onDestroy$)).subscribe(
            result => {
                this.workOrderTypes = result;
            }
        );
    }


    getAllWorkOrderStatus(): void {
        this.commonService.smartDropDownList('WorkOrderStatus', 'ID', 'Description').pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.workOrderStatusList = res.sort(function (a, b) { return a.value - b.value; });
        })
    }

    getAllCreditTerms(): void {
        this.commonService.smartDropDownList('CreditTerms', 'CreditTermsId', 'Name').pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.creditTerms = res;
        })
    }

    getJobTitles() {
        this.commonService.getJobTitles().subscribe(res => {
            this.jobTitles = res;
            // console.log(this.jobTitles);
            this.getSalesPersonList();
            this.getCSRList();
        })
    }
    getSalesPersonList() {
        console.log(this.jobTitles);
        const id = getValueByFieldFromArrayofObject('jobTitle', 'Sales', this.jobTitles);
        console.log(id);
        if (id !== undefined) {
            this.commonService.getEmployeesByCategory(id[0].jobTitleId).subscribe(res => {
                console.log(res);
                this.salesPersonOriginalList = res;
            })
        }
    }

    getCSRList() {
        console.log(this.jobTitles);
        const id = getValueByFieldFromArrayofObject('jobTitle', 'CSR', this.jobTitles);
        if (id !== undefined) {
            this.commonService.getEmployeesByCategory(id[0].jobTitleId).subscribe(res => {
                this.csrOriginalList = res;
            })
        }
    }


    async getAllEmployees() {
        await this.commonService.smartDropDownList('Employee', 'EmployeeId', 'FirstName').pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.employeesOriginalData = res.map(x => {
                return {
                    ...x,
                    employeeId: x.value,
                    name: x.label
                }
            });
        })
    }

    getAllWorkScpoes(): void {
        this.workOrderService.getAllWorkScopes().pipe(takeUntil(this.onDestroy$)).subscribe(
            result => {
                this.workScopesList = result.map(x => {
                    return {
                        label: x.description,
                        value: x.workScopeId
                    }
                })
            }
        );
    }


    getAllWorkOrderStages(): void {
        this.workOrderService.getWorkOrderStageAndStatus().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.workOrderOriginalStageList = res;
            this.workOrderStagesList = res.map(x => {
                return {
                    value: x,
                    label: x.workOrderStage
                }
            });

        })



    }

    getAllPriority() {
        this.commonService.smartDropDownList('Priority', 'PriorityId', 'Description').pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.priorityList = res;
        })
    }


    getMultiplePartsNumbers() {
        this.workOrderService.getMultipleParts().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.partNumberOriginalData = res;
        })
    }


    async getPartNosByCustomer(customerId) {
        // this.partNumberOriginalData = null;
        //this.workOrderService.getPartNosByCustomer(customerId).subscribe(res => {
        await this.workOrderService.getPartNosByCustomer(customerId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

            this.partNumberOriginalData = res;
        });
    }

    getCurrency() {
        this.commonService.smartDropDownList('Currency', 'CurrencyId', 'symbol').pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.currencyList = res;
        })
    }

    getLegalEntity() {
        this.commonService.getLegalEntityList().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.legalEntityList = res;
        })
    }

    getConditionsList() {
        this.commonService.smartDropDownList('Condition', 'ConditionId', 'Description').pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.conditionList = res;
            console.log(res);

            const conditionId = res.find(x => x.label.includes('As Removed'));
            this.workOrderGeneralInformation = {
                ...this.workOrderGeneralInformation,
                partNumbers: this.workOrderGeneralInformation.partNumbers.map(x => {
                    return {
                        ...x,
                        conditionId: conditionId !== undefined ? conditionId.value : null
                    }
                })
            }
        })
    }

}


    //  [workOrderTypes]="workOrderTypes"
    //  [workOrderStatusList]="workOrderStatusList"
    //  [creditTerms]="creditTerms"
    //  [employeesOriginalData]="employeesOriginalData"
    //  [workScopesList]="workScopesList"
    // [workOrderStagesList]="workOrderStagesList"
    // [priorityList]="priorityList"
    // [partNumberOriginalData]="partNumberOriginalData"


// workOrderTypes
// workOrderStatusList
// creditTerms
// employeesOriginalData
// workScopesList
// workOrderStagesList
// priorityList
// partNumberOriginalData 