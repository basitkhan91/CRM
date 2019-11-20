import { Component, OnInit, ViewChild } from '@angular/core';
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
    pageSize: number = 10;
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
    constructor(private workOrderService: WorkOrderService,
        private route: Router,
        private authService: AuthService,
        private alertService: AlertService
    ) {

    }
    ngOnInit() {
        // this.getAllWorkOrderList()
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
        const { workOrderId } = rowData;
        const { workFlowWorkOrderId } = rowData;
        await this.workOrderService.viewWorkOrderHeader(workOrderId).subscribe(res => {
            this.viewWorkOrderHeader = res;
        })

        await this.workOrderService.viewWorkOrderPartNumber(workOrderId).subscribe(res => {
            this.viewWorkOrderMPN = res;
        })

        this.getEquipmentByWorkOrderId(workFlowWorkOrderId);
        this.getMaterialListByWorkOrderId(workFlowWorkOrderId, workOrderId)


    }


    getEquipmentByWorkOrderId(workFlowWorkOrderId) {
        if (workFlowWorkOrderId !== 0) {
            // this.workFlowWorkOrderId = this.workFlowWorkOrderData.workFlowWorkOrderId;
            this.workOrderService.getWorkOrderAssetList(workFlowWorkOrderId).subscribe(
                result => {
                    this.workOrderAssetList = result;
                }
            )
        }

    }

    getMaterialListByWorkOrderId(workFlowWorkOrderId, workOrderId) {
        if (workFlowWorkOrderId !== 0 && workOrderId) {
            this.workOrderService.getMaterialList(workFlowWorkOrderId, workOrderId).subscribe(res => {

                this.workOrderMaterialList = res;

            })

        }
    }


    edit(rowData) {
        this.workOrderService.getWorkOrderById(rowData).subscribe(res => {
            const { workOrderId } = rowData;
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



}