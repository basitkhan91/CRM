import { Component, Input, OnInit } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import * as $ from 'jquery';
import { CommonService } from '../../../../services/common.service';
import { AddressModel } from '../../../../models/address.model';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { CustomerService } from '../../../../services/customer.service';
import { getObjectById } from '../../../../generic/autocomplete';
import { Billing } from '../../../../models/work-order-billing.model';

@Component({
    selector: 'app-work-order-billing',
    templateUrl: './work-order-billing.component.html',
    styleUrls: ['./work-order-billing.component.scss'],
    animations: [fadeInOut]
})
/** WorkOrderBilling component*/
export class WorkOrderBillingComponent implements OnInit {
    @Input() employeesOriginalData;
    @Input() billingorInvoiceForm: Billing;
    @Input() savedWorkOrderData;
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
    soldCustomerShippingOriginalData: any[];
    shipCustomerShippingOriginalData: any[];
    workOrderId: any;
    constructor(private commonService: CommonService, private workOrderService: WorkOrderService,
        private customerService: CustomerService

    ) {

    }
    ngOnInit() {
        this.workOrderId = this.savedWorkOrderData.workOrderId;
        this.getCustomerDetailsFromHeader();
    }

    getCustomerDetailsFromHeader() {
        this.workOrderService.viewWorkOrderHeader(this.workOrderId).subscribe(res => {
            const data = res;
            this.billingorInvoiceForm = {
                ...this.billingorInvoiceForm,
                customerRef: data.customerReference,
                employee: data.employee,
                woOpenDate: data.openDate,
                salesPerson: data.salesperson,
                woType: data.workOrderType,
                creditTerms: data.creditTerm

            }
        })
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
    selectSoldToCustomer(object) {
        const { customerId } = object;
        this.customerService.getCustomerShipAddressGet(customerId).subscribe(res => {
            this.soldCustomerShippingOriginalData = res[0];
            this.soldCustomerSiteList = res[0].map(x => {
                return {
                    label: x.siteName,
                    value: x.customerShippingAddressId

                }
            });
        })
    }

    changeOfSoldSiteName(value) {
        console.log(value);

        const data = getObjectById('customerShippingAddressId', value, this.soldCustomerShippingOriginalData);

        if (data) {
            this.soldCustomerAddress.line1 = data.address1;
            this.soldCustomerAddress.line2 = data.address2;
            this.soldCustomerAddress.country = data.country;
            this.soldCustomerAddress.postalCode = data.postalCode;
            this.soldCustomerAddress.stateOrProvince = data.stateOrProvince;
            this.soldCustomerAddress.city = data.city;
        } else {
            this.soldCustomerAddress = new AddressModel();
        }
    }

    selectShipToCustomer(object) {
        const { customerId } = object;
        this.customerService.getCustomerShipAddressGet(customerId).subscribe(res => {
            this.shipCustomerShippingOriginalData = res[0];
            this.shipCustomerSiteList = res[0].map(x => {
                return {
                    label: x.siteName,
                    value: x.customerShippingAddressId

                }
            });
        })
    }

    changeOfShipSiteName(value) {
        console.log(value);

        const data = getObjectById('customerShippingAddressId', value, this.shipCustomerShippingOriginalData);

        if (data) {
            this.shipCustomerAddress.line1 = data.address1;
            this.shipCustomerAddress.line2 = data.address2;
            this.shipCustomerAddress.country = data.country;
            this.shipCustomerAddress.postalCode = data.postalCode;
            this.shipCustomerAddress.stateOrProvince = data.stateOrProvince;
            this.shipCustomerAddress.city = data.city;
        } else {
            this.shipCustomerAddress = new AddressModel();
        }
    }

    clearAddress(type, value) {
        if (value === '' && type === 'SoldTo') {
            this.soldCustomerAddress = new AddressModel();
        } else if (value === '' && type === 'shipTo') {
            this.shipCustomerAddress = new AddressModel();
        }
    }




}