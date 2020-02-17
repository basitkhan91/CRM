import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { AuthService } from '../../../../services/auth.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { getValueFromObjectByKey } from '../../../../generic/autocomplete';
import * as $ from 'jquery'
import { NgForm } from '@angular/forms';
@Component({
    selector: 'app-work-order-assets',
    templateUrl: './work-order-assets.component.html',
    styleUrls: ['./work-order-assets.component.css']
})
export class WorkOrderAssetsComponent implements OnInit {
    //@Input() workOrderAssetList: any;
    @Input() savedWorkOrderData: any
    @Input() workOrderAssetList: any
    @Input() isWorkOrder;
    @Input() employeesOriginalData;
    @Input() workFlowObject;
    @Output() refreshData = new EventEmitter();
    @Output() saveEquipmentListForWO = new EventEmitter();
    @Output() updateEquipmentListForWO = new EventEmitter();
    moduleName = "Tool";
    assetRecordId: any;
    addNewMaterial: any;
    assets = {
        description: '',
        assetIdNumber: null,
        employeeId: null,
        date: new Date(),
        assetId: null,
        assetStatus: null
    }
    assetsform = { ...this.assets }
    status: any;
    currentRecord: any;
    employeeList: any;
    generalInfoForm: NgForm;
    isEdit: boolean = false;
    editData: any;
    assetAuditHistory: any;

    ngOnInit(): void {
        console.log(this.workFlowObject);

        // this.getWorkOrderAssetList();
        console.log(this.workOrderAssetList)
    }

    constructor(private workOrderService: WorkOrderService, private authService: AuthService,
        private alertService: AlertService, private cdRef: ChangeDetectorRef) {


    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
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
    viewAsstes(rowData) {
        this.assetRecordId = rowData.assetRecordId;
    }

    checkStatus(rowData, value) {
        this.assetsform = {
            ...this.assetsform, description: rowData.description,
            assetIdNumber: rowData.rowData, assetId: rowData.assetId, assetStatus: value,
        }
        this.currentRecord = rowData;
        this.status = value;
    }

    saveAssets() {

        const data = {
            ...this.assetsform,
            employeeId: getValueFromObjectByKey('value', this.assetsform.employeeId),
        }

        if (this.status === 'checkIn') {

            const assetcheckin = {
                workOrderAssetId: this.currentRecord.workOrderAssetId,
                checkedInById: data.employeeId,
                checkedInDate: data.date,
                updatedBy: this.userName,
                checkInOutStatus: 2

            }

            this.workOrderService.assetsCheckInByWorkOrderAssetsId(assetcheckin).subscribe(res => {
                this.assetsform = { ...this.assets };
                this.refreshData.emit();
                this.alertService.showMessage(
                    '',
                    'Updated WorkOrder Asset Status Successfully',
                    MessageSeverity.success
                );
            })
        } else {

            const assetcheckout = {
                workOrderAssetId: this.currentRecord.workOrderAssetId,
                checkedOutById: data.employeeId,
                checkedOutDate: data.date,
                updatedBy: this.userName,
                checkInOutStatus: 1

            }
            this.workOrderService.assetsCheckOutByWorkOrderAssetsId(assetcheckout).subscribe(res => {
                this.assetsform = { ...this.assets };
                this.refreshData.emit();
                this.alertService.showMessage(
                    '',
                    'Updated WorkOrder Asset Status Successfully',
                    MessageSeverity.success
                );
            })
        }

    }
    createNew() {
        this.isEdit = false;
        this.editData = undefined;
    }
    edit(rowData) {
        this.createNew();
        this.cdRef.detectChanges();
        this.isEdit = true;
        this.editData = rowData;
    }
    getAuditHistoryById(rowData) {
        const { workOrderAssetId } = rowData;
        this.workOrderService.assetsHistoryByWorkOrderAssetId(workOrderAssetId).subscribe(res => {
            this.assetAuditHistory = res;
        })

    }
    delete(rowData) {
        const { workOrderAssetId } = rowData;
        this.workOrderService.deleteWorkOrderAssetByAssetId(workOrderAssetId, this.userName).subscribe(res => {
            this.refreshData.emit();
            this.alertService.showMessage(
                '',
                'Deleted WorkOrder Asset  Successfully',
                MessageSeverity.success
            );
        })
    }


    saveEquipmentList(event) {
        this.saveEquipmentListForWO.emit(event)
        $('#addNewEquipments').modal('hide');
    }

    updateEquipmentList(event) {
        this.updateEquipmentListForWO.emit(event)
        this.isEdit = false;
        $('#addNewEquipments').modal('hide');
    }

    getColorCodeForHistory(i, field, value) {
        const data = this.assetAuditHistory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }

    // getWorkOrderAssetList(): void {
    //     this.workOrderService.getWorkOrderAssetList(7).subscribe(
    //         result => {
    //             this.workOrderAssetList = result;
    //         }
    //     );
    // }

}
