import { Component, Input } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import * as $ from 'jquery';
import { CommonService } from '../../../../services/common.service';
import { AddressModel } from '../../../../models/address.model';

@Component({
    selector: 'app-work-order-billing',
    templateUrl: './work-order-billing.component.html',
    styleUrls: ['./work-order-billing.component.scss'],
    animations: [fadeInOut]
})
/** WorkOrderBilling component*/
export class WorkOrderBillingComponent {
    @Input() employeesOriginalData;
    employeeList: any;
    customerNamesList: Object;
    soldCustomerSiteList = [];
    shipCustomerSiteList = [];
    soldCustomerAddress = new AddressModel();
    shipCustomerAddress = new AddressModel();
    managementStructure = {
        companyId: null,
        buId: null,
        divisionId: null,
        departmentId: null,
    }


    //     this.addressId = addressId;
    // this.line1 = line1;
    // this.line2 = line2;
    // this.country = country;
    // this.postalCode = postalCode;
    // this.recordModifiedDate = recordModifiedDate;
    // this.stateOrProvince = stateOrProvince;
    // this.city = city;
    // this.masterCompanyId = masterCompanyId;
    // this.createdBy = createdBy;
    // this.createdDate = createdDate;
    // this.updatedDate = updatedDate;
    // this.updatedBy = updatedBy;
    // this.masterCompany = masterCompany;
    // this.isActive = isActive;
    // this.memo = memo;
    constructor(private commonService: CommonService) {

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


    filterCustomerName(event) {
        const value = event.query.toLowerCase()
        this.commonService.getCustomerNameandCode(value).subscribe(res => {
            this.customerNamesList = res;
        })
    }
    selectCustomer(event) {

    }

    billingorInvoiceForm = {
        // "BillingInvoicingId":0,
        // "WorkOrderId":10074,
        // "WorkOrderWorkFlowId":10064,
        // "WorkOrderPartNoId":10068,
        // "ItemMasterId":10633,
        // "InvoiceTypeId":1,
        // "InvoiceNo":"INV123456",
        // "CustomerId":10,
        // "InvoiceDate":"2019-10-31T09:06:59.68",
        // "InvoiceTime":"10:10",
        // "PrintDate":"2019-10-31T09:06:59.68",
        // "ShipDate":"2019-10-31T09:06:59.68",
        // "NoofPieces":10,
        // "EmployeeId":1,
        // "RevType":1,
        // "GateStatus":"60",
        // "SoldToCustomerId":1,
        // "SoldToSiteId":1,
        // "ShipToCustomerId":2,
        // "ShipToSiteId":3,
        // "ShipToAttention":"ShipToAttention",
        // "ManagementStructureId":1,
        // "ManagementEmpId":10,
        // "Notes":"Notes",
        // "CostPlusType":"Cost Plus",
        // "TotalWorkOrder":false,
        // "TotalWorkOrderValue":0,
        // "Material":true,
        // "MaterialValue":10,
        // "LaborOverHead":true,
        // "LaborOverHeadValue":12,
        // "MiscCharges":false,
        // "MiscChargesValue":0,
        // "ProForma":false,
        // "PartialInvoice":false,
        // "CostPlusRateCombo":false,
        // "ShipViaId":10,
        // "WayBillRef":"Ref 121212",
        // "Tracking":"Tracking 1234",
        // "masterCompanyId":1,
        // "CreatedBy":"admin",
        // "UpdatedBy":"admin",
        // "CreatedDate":"2019-10-31T09:06:59.68",
        // "UpdatedDate":"2019-10-31T09:06:59.68",
        // "IsActive":true,
        // "IsDeleted":false
    }


}