import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { PageHeaderComponent } from '../../../shared/page-header.component';
import * as $ from 'jquery';
import { WorkOrderService } from '../../../services/work-order/work-order.service';
import { Table } from 'primeng/table';
import { AuthService } from '../../../services/auth.service';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-work-order-list',
    templateUrl: './work-order-list.component.html',
    styleUrls: ['./work-order-list.component.scss'],
    animations: [fadeInOut]
})
/** WorkOrderList component*/
export class WorkOrderListComponent implements OnInit {
    /** WorkOrderList ctor */
    workOrderData: any;
    isWorkOrder = true;
    pageSize: number = 10;
    @Input() isSubWorkOrder = false;
    @Input() isWorkOrderMainView = false;
    @Input() workOrderId: any;
    @Output() closeView = new EventEmitter();

    @ViewChild('dt')
    private table: Table;
    lazyLoadEventData: any;
    headers = [
        // { field: 'workOrderNum', header: 'WorkOrder Number' },
        { field: 'name', header: 'Customer Name' },
        { field: 'customerCode', header: 'customerCode' },
        { field: 'workOrderType', header: 'WorkOrder Type' },
        { field: 'openDate', header: 'Open Date' },
        { field: 'workOrderStatus', header: 'WorkOrder Status' },
    ]
    selectedColumns = this.headers;
    pageIndex: number = 0;
    totalRecords: any;
    totalPages: number;
    workOrderPartListData: any;
    workOrderPartListDataKeys: string[];
    viewWorkOrderHeader: any;
    viewWorkOrderMPN: any;
    workOrderAssetList: any;
    workOrderMaterialList: Object;
    workOrderPublicationList: Object;
    workOrderChargesList: Object;
    workOrderExclusionsList: Object;
    workOrderLaborList: Object;
    mpnPartNumbersList: any;
    // workOrderId: any;
    workFlowId: any;
    showTableGrid: boolean = false;
    showMPN: boolean = false;
    workOrderDirectionList: Object;
    otherOptions = [
        { label: 'Other Options', value: '' },
        { label: 'Freight', value: 'freight' },
        { label: 'ContactGrid', value: 'contactGrid' },
        { label: 'Accounting', value: 'accounting' },
        { label: 'Charges', value: 'charges' },
        { label: 'Exclusion', value: 'exclusion' },

    ]
    selectedOtherSubTask: string = ''
    activeIndex: number;
    otherOptionShow: boolean = false;
    constructor(private workOrderService: WorkOrderService,
        private route: Router,
        private authService: AuthService,
        private alertService: AlertService
    ) {

    }
    ngOnInit() {
        // this.getAllWorkOrderList()
        console.log('sample');
        if (this.isWorkOrderMainView) {
            this.view({ workOrderId: this.workOrderId })
        }
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }







    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        this.table.reset();
        // this.getList();
        // this.table.sortOrder = 0;
        // this.table.sortField = '';


    }

    loadData(event) {
        this.lazyLoadEventData = event;
        const pageIndex = parseInt(event.first) / event.rows;;
        this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        event.first = pageIndex;
        this.getAllWorkOrderList(event)
    }

    getAllWorkOrderList(data) {
        this.workOrderService.getWorkOrderList(this.pageIndex, this.pageSize).subscribe(res => {
            this.workOrderData = res;
            if (res.length > 0) {
                this.totalRecords = res[0].totalRecords;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }

        })
    }
    otherOptionSelected(value) {
        this.selectedOtherSubTask = value;
        this.otherOptionShow = false;
    }

    globalSearch(value) {
        // this.pageIndex = 0;
        // this.workOrderService.getGlobalSearch(value, this.pageIndex, this.pageSize).subscribe(res => {
        //     this.data = res;
        //     if (res.length > 0) {
        //         this.totalRecords = res[0].totalRecords;
        //         this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        //     }
        // })
    }


    async view(rowData) {

        this.workOrderId = rowData.workOrderId;




        // const { workFlowWorkOrderId } = rowData;
        // const workOrderId = 46;
        // const workFlowWorkOrderId = 0;

        await this.workOrderService.viewWorkOrderHeader(this.workOrderId).subscribe(res => {
            this.viewWorkOrderHeader = res;

            if (res.singleMPN === "Single MPN") {
                this.showMPN = false;
                this.getAllTabsData(res.workFlowWorkOrderId, 0);

            } else {
                this.showMPN = true;
            }
            this.workFlowId = res.workFlowId;

        })

        await this.workOrderService.viewWorkOrderPartNumber(this.workOrderId).subscribe(res => {
            this.viewWorkOrderMPN = res;
        })

        console.log(rowData);
        // data-toggle="modal" data-target="#view"


        // this.workOrderId = 0;
        this.getWorkOrderWorkFlowNos(this.workOrderId)




    }




    getWorkOrderWorkFlowNos(workOrderId) {
        if (workOrderId) {
            this.workOrderService.getWorkOrderWorkFlowNumbers(workOrderId).subscribe(res => {

                this.mpnPartNumbersList = res.map(x => {


                    return {
                        value: { workflowId: x.workflowId, workFlowWorkOrderId: x.value },
                        label: x.workflowNo
                    }
                })

                // if (this.viewWorkOrderHeader.singleMPN === 'Single MPN') {
                //     const data = this.mpnPartNumbersList;

                //     if (data.length === 1) {
                //         this.getAllTabsData(data[0].value.workFlowWorkOrderId, this.workOrderId);
                //         this.showTableGrid = true;
                //     }
                // }
                // else {
                //     this.showTableGrid = true;
                // }

            })
        }

    }

    changeofMPN(object) {
        console.log(this.showTableGrid);


        this.workFlowId = object.workflowId;
        this.getAllTabsData(object.workFlowWorkOrderId, this.workOrderId);

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
        console.log('Testing');

        // $('#viewWorkOrder').modal('show');

    }


    getEquipmentByWorkOrderId(workFlowWorkOrderId, workOrderId) {
        console.log(workFlowWorkOrderId, workOrderId);

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
        const { workOrderId } = rowData;
        this.workOrderService.getWorkOrderById(workOrderId).subscribe(res => {
            this.route.navigate([`workordersmodule/workorderspages/app-work-order-edit/${workOrderId}`]);
        })
    }

    changeStatus(rowData) {
        this.workOrderService.updateActionforWorkOrder(rowData, this.userName).subscribe(res => {
            this.alertService.showMessage("Success", `Successfully Updated Status`, MessageSeverity.success);
        })

    }

    delete(rowData) {
        this.workOrderService.deleteActionforWorkOrder(rowData.workOrderId).subscribe(res => {
            this.getAllWorkOrderList(this.lazyLoadEventData);
            this.alertService.showMessage("Success", `Successfully Deleted Record`, MessageSeverity.success);

        })
    }

    getWorkOrderPartListByWorkOrderId(rowData) {
        const { workOrderId } = rowData;
        this.workOrderService.getWorkOrderPartListByWorkOrderId(workOrderId).subscribe(res => {
            if (res.length > 0) {
                this.workOrderPartListDataKeys = Object.keys(res[0]);
                this.workOrderPartListData = res;
            }
        })

    }

    showOtherOptions() {
        this.otherOptionShow = !this.otherOptionShow;
    }


}