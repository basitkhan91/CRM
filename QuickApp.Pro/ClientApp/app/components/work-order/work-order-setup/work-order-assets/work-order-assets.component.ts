import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { AuthService } from '../../../../services/auth.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { getValueFromObjectByKey } from '../../../../generic/autocomplete';
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
  @Output() getEquipmentData = new EventEmitter();
  @Output() saveEquipmentListForWO = new EventEmitter();
    assetRecordId: any;
    addNewMaterial: any;
  assets = {
    description: '',
    assetIdNumber: null,
    employeeId: null,
    date: null
  }
  assetsform = { ...this.assets }
  status: any;
  currentRecord: any;
  employeeList: any;

  ngOnInit(): void {
    console.log(this.workFlowObject);

    // this.getWorkOrderAssetList();
    console.log(this.workOrderAssetList)
  }

  constructor(private workOrderService: WorkOrderService, private authService: AuthService,
    private alertService: AlertService, ) {


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
      assetIdNumber: rowData.rowData,
    }
    this.currentRecord = rowData;
    this.status = value;
  }

  saveAssets() {

    const data = {
      ...this.assetsform,
      employeeId: getValueFromObjectByKey('value', this.assetsform.employeeId),
    }

    if (this.status = 'checkIn') {

      this.workOrderService.assetsCheckInByWorkOrderAssetsId(this.currentRecord.workOrderAssetId, data.employeeId, data.date, this.userName).subscribe(res => {
        this.assetsform = { ...this.assets };
        this.alertService.showMessage(
          '',
          'Updated WorkOrder Asstes Status Successfully',
          MessageSeverity.success
        );
      })
    } else {

      this.workOrderService.assetsCheckOutByWorkOrderAssetsId(this.currentRecord.workOrderAssetId, data.employeeId, data.date, this.userName).subscribe(res => {
        this.assetsform = { ...this.assets };
        this.alertService.showMessage(
          '',
          'Updated WorkOrder Asstes Status Successfully',
          MessageSeverity.success
        );
      })
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
