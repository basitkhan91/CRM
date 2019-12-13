import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { CommonService } from '../../../../services/common.service';
import { MessageSeverity, AlertService } from '../../../../services/alert.service';
import { AuthService } from '../../../../services/auth.service';



@Component({
    selector: 'app-sub-work-order',
    templateUrl: './work-order-subwo.component.html',
    styleUrls: ['./work-order-subwo.component.scss']
})
/** WorkOrderShipping component*/
export class SubWorkOrderComponent implements OnInit {
    issubWorkOrderState: Boolean = true;
    subWorkOrderHeader: any;

    workOrderDetails: any;
    workOrderId: any;
    mpnId: any;
    subWorkOrderId: any;

    subWorkOrderGeneralInformation: any;
    workOrderStagesList: any;
    workOrderStatusList: any;
    cmmList: any;
    workFlowList: any;
    isEdit: boolean = false;
    showTabsGrid: boolean;
    workFlowWorkOrderId: any;


    constructor(private router: Router,
        private commonService: CommonService,
        private acRouter: ActivatedRoute,
        private alertService: AlertService,
        private authService: AuthService,
        private cdRef: ChangeDetectorRef,
        private workOrderService: WorkOrderService) { }

    ngOnInit() {

        console.log(this.acRouter.snapshot.queryParams)

        const queryParamsData = this.acRouter.snapshot.queryParams;


        this.workOrderId = parseInt(queryParamsData.workorderid);
        this.subWorkOrderId = parseInt(queryParamsData.subworkorderid);
        this.mpnId = parseInt(queryParamsData.mpnid);
        this.workOrderDetails = queryParamsData;

        if (this.subWorkOrderId !== 0) {
            this.isEdit = true;
            this.showTabsGrid = true;
        }



        this.getSubWorkOrderEditData();
        // this.getAllWorkOrderStages(); // for stages dropdown
        this.getAllWorkOrderStatus();



    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }


    getSubWorkOrderEditData() {
        this.workOrderService.getSubWorkOrderDataBySubWorkOrderId(this.subWorkOrderId).subscribe(res => {
            this.getDataFormating(res);
            this.isEdit = true;
            this.getHeaderDetailsForCreateSubWO();
        }, error => {
            this.getHeaderDetailsForCreateSubWO();
            this.isEdit = false;
        })

    }
    getHeaderDetailsForCreateSubWO() {
        console.log('test');

        if (this.workOrderId && this.mpnId) {
            this.workOrderService.getSubWorkOrderHeaderByWorkOrderId(this.workOrderId, this.mpnId).subscribe(res => {
                this.subWorkOrderHeader = res;
                this.workFlowWorkOrderId = res.workFlowWorkOrderId;
                this.workOrderDetails = {
                    ...this.workOrderDetails,
                    workFlowId: res.workFlowId,
                    workFlowWorkOrderId: res.workFlowWorkOrderId
                }
                if (this.isEdit === false) {
                    this.getDataFormating(res);
                }


                // this.subWorkOrderGeneralInformation = {
                //     ...res,
                //     openDate: new Date(res.openDate),
                //     estimatedCompletionDate: new Date(res.estimatedCompletionDate),
                //     needDate: new Date(res.needDate),
                // };
                // this.getWorkFlowByPNandScope(res.itemMasterId, res.workOrderScopeId);
                this.getPartPublicationByItemMasterId(res.itemMasterId);


            })
        }

    }

    getDataFormating(res) {
        this.subWorkOrderGeneralInformation = {
            ...res,
            openDate: new Date(res.openDate),
            estimatedCompletionDate: new Date(res.estimatedCompletionDate),
            needDate: new Date(res.needDate),
        };
    }





    getAllWorkOrderStages(): void {
        this.commonService.smartDropDownList('WorkOrderStage', 'ID', 'Description').subscribe(res => {
            this.workOrderStagesList = res;
        })
    }

    getAllWorkOrderStatus(): void {
        this.commonService.smartDropDownList('WorkOrderStatus', 'ID', 'Description').subscribe(res => {
            this.workOrderStatusList = res.sort(function (a, b) { return a.value - b.value; });
        })
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


    getWorkFlowByPNandScope(itemMasterId, workOrderScopeId) {
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

    saveSubWorkOrder() {
        const data = {
            workOrderNum: this.subWorkOrderGeneralInformation.workOrderNum,
            subWorkOrderId: this.subWorkOrderId,
            workOrderId: this.workOrderId,
            workFlowId: this.subWorkOrderGeneralInformation.workFlowId,
            workOrderPartNumberId: this.mpnId,
            subWorkOrderNo: this.subWorkOrderGeneralInformation.subWorkOrderNo,
            needDate: this.subWorkOrderGeneralInformation.needDate,
            estCompDate: this.subWorkOrderGeneralInformation.estimatedCompletionDate,
            stageId: this.subWorkOrderGeneralInformation.stageId,
            statusId: this.subWorkOrderGeneralInformation.statusId,
            cmmId: this.subWorkOrderGeneralInformation.cmmId,
            isPMA: this.subWorkOrderGeneralInformation.isPMA,
            IsDER: this.subWorkOrderGeneralInformation.isDER,
            masterCompanyId: 1,
            createdBy: this.userName,
            updatedBy: this.userName,
            createdDate: new Date(),
            updatedDate: new Date(),
            isActive: true,
            isDeleted: false
        }

        if (!this.isEdit) {
            this.workOrderService.createSubWorkOrderHeaderByWorkOrderId(data).subscribe(res => {
                this.isEdit = true;
                this.showTabsGrid = true;
                this.subWorkOrderGeneralInformation = res;
                this.subWorkOrderId = res.subWorkOrderId;
                this.updateURLParams();
                this.alertService.showMessage(
                    '',
                    'Sub WorkOrder Saved Successfully',
                    MessageSeverity.success
                );

            })
        } else {
            this.workOrderService.updateSubWorkOrderHeaderBySubWorkOrderId(data).subscribe(res => {
                this.isEdit = true;
                this.showTabsGrid = true;
                this.subWorkOrderGeneralInformation = res;
                this.subWorkOrderId = res.subWorkOrderId;
                this.updateURLParams();
                this.alertService.showMessage(
                    '',
                    'Sub WorkOrder Updated Successfully',
                    MessageSeverity.success
                );
            })
        }
        console.log(this.subWorkOrderId);



    }
    updateURLParams() {
        window.history.replaceState({}, '', `/workordersmodule/workorderspages/app-sub-work-order?workorderid=${this.workOrderId}&mpnid=${this.mpnId}&subworkorderid=${this.subWorkOrderId}`);
    }

}