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
        billingInvoicingId: 0,
        // "WorkOrderId":10074,
        // "WorkOrderWorkFlowId":10064,
        // "WorkOrderPartNoId":10068,
        // "ItemMasterId":10633,
        woOpenDate: null,

        customerRef: '',
        workScope: '',
        invoiceTypeId: 1,
        invoiceNo: '',
        customerId: null,
        invoiceDate: null,
        invoiceTime: null,
        printDate: null,
        shipDate: null,
        noofPieces: null,
        employee: 1,
        revType: 1,
        gateStatus: 60,
        soldToCustomerId: 1,
        soldToSiteId: 1,
        shipToCustomerId: 2,
        shipToSiteId: 3,
        shipToAttention: '',
        managementStructureId: 1,
        managementEmpId: 10,
        notes: '',
        costPlusType: '',
        totalWorkOrder: false,
        totalWorkOrderValue: 0,
        material: true,
        materialValue: 10,
        laborOverHead: true,
        laborOverHeadValue: 12,
        miscCharges: false,
        miscChargesValue: 0,
        proForma: false,
        partialInvoice: false,
        costPlusRateCombo: false,
        shipViaId: 10,
        wayBillRef: '',
        tracking: '',
        currenyId: null,
        salesPerson: '',
        availableCredit: null,
        creditTerms: null,



        // "masterCompanyId":1,
        // "CreatedBy":"admin",
        // "UpdatedBy":"admin",
        // "CreatedDate":"2019-10-31T09:06:59.68",
        // "UpdatedDate":"2019-10-31T09:06:59.68",
        // "IsActive":true,
        // "IsDeleted":false
    }


}