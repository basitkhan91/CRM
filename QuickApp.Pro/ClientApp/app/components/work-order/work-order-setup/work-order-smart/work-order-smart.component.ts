import { Component, OnInit } from '@angular/core';
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
import { getObjectById } from '../../../../generic/autocomplete';
import { workOrderGeneralInfo } from '../../../../models/work-order-generalInformation.model';


@Component({
    selector: 'app-work-order-smart',
    templateUrl: './work-order-smart.component.html',
})
/** WorkOrderShipping component*/
export class WorkOrderSmartComponent implements OnInit {
    creditTerms: any;
    employeesOriginalData: any;
    workScopesList: { label: string; value: number; }[];
    workOrderStagesList: any;
    priorityList: any;
    workOrderTypes: any;
    workOrderStatusList: any;
    partNumberOriginalData: Object;
    workOrderId: any;
    editWorkOrderGeneralInformation: any;
    workOrderGeneralInformation: workOrderGeneralInfo = new workOrderGeneralInfo();
    isEdit: boolean = false;
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
        this.getAllWorkOrderTypes();
        this.getAllWorkOrderStatus();
        this.getAllCreditTerms();
        // this.getAllCustomers();
        this.getAllEmployees();
        this.getAllWorkScpoes();
        this.getAllWorkOrderStages();
        this.getMultiplePartsNumbers();
        this.getAllPriority();

        this.workOrderId = this.acRouter.snapshot.params['id'];
        if (this.workOrderId) {


            this.workOrderService.getWorkOrderById(this.workOrderId).subscribe(res => {
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
                console.log(this.editWorkOrderGeneralInformation);
            })
        }

    }





    getCustomerNameandCodeById(object) {
        const { customerId } = object;
        this.commonService.getCustomerNameandCodeById(customerId).subscribe(res => {
            object.customer = res;
        })
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
            this.workOrderStatusList = res.sort(function (a, b) { return a.value - b.value; });
        })
    }

    getAllCreditTerms(): void {
        this.commonService.smartDropDownList('CreditTerms', 'CreditTermsId', 'Name').subscribe(res => {
            this.creditTerms = res;
        })
    }


    async getAllEmployees() {
        await this.commonService.smartDropDownList('Employee', 'EmployeeId', 'FirstName').subscribe(res => {
            this.employeesOriginalData = res;
        })
    }

    getAllWorkScpoes(): void {
        this.workOrderService.getAllWorkScopes().subscribe(
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
        this.commonService.smartDropDownList('WorkOrderStage', 'ID', 'Description').subscribe(res => {
            this.workOrderStagesList = res;
        })
    }

    getAllPriority() {
        this.commonService.smartDropDownList('Priority', 'PriorityId', 'Description').subscribe(res => {
            this.priorityList = res;
        })
    }


    getMultiplePartsNumbers() {
        this.workOrderService.getMultipleParts().subscribe(res => {
            this.partNumberOriginalData = res;
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