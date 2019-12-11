import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import * as $ from 'jquery';


@Component({
    selector: 'app-sub-work-orderlist',
    templateUrl: './work-order-subwo-list.component.html',
})
/** WorkOrderShipping component*/
export class SubWorkOrderListComponent implements OnInit {
    workOrderPublicationList: Object;
    workOrderChargesList: Object;
    workOrderExclusionsList: Object;
    workOrderLaborList: any;
    workOrderDirectionList: Object;
    @Input() workOrderId;
    @Input() mpnId;
    subWorkOrderData: any;
    subWorkOrderCols = [
        { field: 'subWorkOrderNo', header: 'Sub WorkOrderNo' },
        { field: 'masterPartNo', header: 'Part' },
        { field: 'masterPartDescription', header: 'Description' },
        { field: 'revisedPartNo', header: 'Revised PartNo' },
        { field: 'workScope', header: 'Work Scope' },
        { field: 'openDate', header: 'Open Date' },
        { field: 'needDate', header: 'NeedDate' },
        { field: 'stage', header: 'Stage' },

    ]
    subWorkOrderHeader: any;
    showTableGrid: boolean = false;
    activeIndex: number;
    workOrderAssetList: any;
    workOrderMaterialList: any;

    constructor(public _router: Router, private workOrderService: WorkOrderService) { }

    ngOnInit() {
        this.getSubWorkOrderByWorkOrderId();
    }

    getSubWorkOrderByWorkOrderId() {
        console.log(this.workOrderId);
        this.workOrderService.getSubWorkOrderListByWorkOrderId(this.workOrderId).subscribe(res => {
            this.subWorkOrderData = res;
        })
    }

    openNewSubWorkOrder() {
        // { workorderid: workorderid, mpnid: workorderid, subworkorderid: 0 }
        // console.log('test');
        // &mpn/mpnid=15&subworkOrder
        // const workorderid = 54;
        // const mpnid = 0;
        const subworkorderid = 0;
        window.open(`/workordersmodule/workorderspages/app-sub-work-order?workorderid=${this.workOrderId}&mpnid=${this.mpnId}&subworkorderid=${subworkorderid}`);
        // window.location.href = "https://www.google.com";
    }

    view(rowData) {
        console.log(rowData);
        const { subWorkOrderId } = rowData;

        this.workOrderService.getSubWorkOrderView(subWorkOrderId).subscribe(res => {
            this.subWorkOrderHeader = res;
            // $('view').modal('show');
            this.getAllTabsData(res.workFlowWorkOrderId, subWorkOrderId);
        })

    }


    getAllTabsData(workFlowWorkOrderId, workOrderId) {
        this.getEquipmentByWorkOrderId(workFlowWorkOrderId, workOrderId);
        this.getMaterialListByWorkOrderId(workFlowWorkOrderId, workOrderId);
        this.getPublicationListByWorkOrderId(workFlowWorkOrderId, workOrderId);
        this.getChargesListByWorkOrderId(workFlowWorkOrderId, workOrderId);
        this.getExclusionListByWorkOrderId(workFlowWorkOrderId, workOrderId);
        this.getLaborListByWorkOrderId(workFlowWorkOrderId, workOrderId);
        this.getDirectionByWorkOrderId(workFlowWorkOrderId, workOrderId);
        this.showTableGrid = true;
        this.activeIndex = 0;
    }


    getEquipmentByWorkOrderId(workFlowWorkOrderId, workOrderId) {


        // if (workFlowWorkOrderId || workFlowWorkOrderId === 0) {
        // this.workFlowWorkOrderId = this.workFlowWorkOrderData.workFlowWorkOrderId;
        if (workFlowWorkOrderId) {
            this.workOrderService.getWorkOrderAssetList(workFlowWorkOrderId, workOrderId).subscribe(
                result => {
                    console.log(result);
                    this.workOrderAssetList = result;
                }
            )
        }

    }

    getMaterialListByWorkOrderId(workFlowWorkOrderId, workOrderId) {
        if (workFlowWorkOrderId) {
            this.workOrderService.getWorkOrderMaterialList(workFlowWorkOrderId, workOrderId).subscribe(res => {

                this.workOrderMaterialList = res;

            })

        }
    }

    getPublicationListByWorkOrderId(workFlowWorkOrderId, workOrderId) {

        if (workFlowWorkOrderId) {
            this.workOrderService.getWorkOrderPublicationList(workFlowWorkOrderId, workOrderId).subscribe(res => {
                this.workOrderPublicationList = res;
            })

        }
    }

    getChargesListByWorkOrderId(workFlowWorkOrderId, workOrderId) {

        if (workFlowWorkOrderId) {
            this.workOrderService.getWorkOrderChargesList(workFlowWorkOrderId, workOrderId).subscribe(res => {
                this.workOrderChargesList = res;
            })

        }

    }

    getExclusionListByWorkOrderId(workFlowWorkOrderId, workOrderId) {

        if (workFlowWorkOrderId) {
            this.workOrderService.getWorkOrderExclusionsList(workFlowWorkOrderId, workOrderId).subscribe(res => {
                this.workOrderExclusionsList = res;
            })

        }

    }

    getLaborListByWorkOrderId(workFlowWorkOrderId, workOrderId) {

        if (workFlowWorkOrderId) {
            this.workOrderService.getWorkOrderLaborList(workFlowWorkOrderId, workOrderId).subscribe(res => {
                this.workOrderLaborList = res.laborList;

            })

        }

    }

    getDirectionByWorkOrderId(workFlowWorkOrderId, workOrderId) {
        if (workFlowWorkOrderId) {
            this.workOrderService.getWorkOrderDirectionList(workFlowWorkOrderId, workOrderId).subscribe(res => {
                this.workOrderDirectionList = res;
            })

        }
    }

    edit(rowData) {
        const { subWorkOrderId } = rowData;
        window.open(`/workordersmodule/workorderspages/app-sub-work-order?workorderid=${this.workOrderId}&mpnid=${this.mpnId}&subworkorderid=${subWorkOrderId}`);
    }
    delete(rowData) {

    }



    // openNewSubWorkOrder() {

    //     // { workorderid: workorderid, mpnid: workorderid, subworkorderid: 0 }
    //     // console.log('test');
    //     // &mpn/mpnid=15&subworkOrder
    //     const workorderid = 200;
    //     const mpnid = 0;
    //     const subworkorderid = 0;
    //     this._router.navigateByUrl(`/receivingmodule/receivingpages/app-receiving-ro?workorderid=${workorderid}&mpnid=${mpnid}&subworkorderid=${subworkorderid}`);
    //     // window.location.href = "https://www.google.com";
    // }

}