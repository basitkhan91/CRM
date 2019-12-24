import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import * as $ from 'jquery';
import { CommonService } from '../../../../services/common.service';
import { AddressModel } from '../../../../models/address.model';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { CustomerService } from '../../../../services/customer.service';
import { getObjectById, editValueAssignByCondition } from '../../../../generic/autocomplete';
import { Billing } from '../../../../models/work-order-billing.model';
import { getModuleIdByName } from '../../../../generic/enums';
import { WorkOrderQuoteService } from '../../../../services/work-order/work-order-quote.service';

@Component({
    selector: 'app-work-order-billing',
    templateUrl: './work-order-billing.component.html',
    styleUrls: ['./work-order-billing.component.scss'],
    animations: [fadeInOut]
})
/** WorkOrderBilling component*/

export class WorkOrderBillingComponent implements OnInit {
    @Input() employeesOriginalData;
    @Input() billingorInvoiceForm;
    @Input() savedWorkOrderData;
    @Input() currencyList;
    @Input() isEditBilling = false;
    @Input() workOrderQuoteId = 0;
    @Input() quoteExclusionList;
    @Input() quoteMaterialList;
    @Input() quoteFreightsList;
    @Input() quoteChargesList;
    @Input() quoteLaborList;
    @Input() legalEntityList;

    @Output() saveWOBilling = new EventEmitter();
    @Output() updateWOBilling = new EventEmitter();
    employeeList: any;
    customerNamesList: Object;
    soldCustomerSiteList = [];
    shipCustomerSiteList = [];
    shipToAttention;
    soldCustomerAddress: any = new AddressModel();
    shipCustomerAddress: any = new AddressModel();
    managementStructure = {
        companyId: null,
        buId: null,
        divisionId: null,
        departmentId: null,
    }
    soldCustomerShippingOriginalData: any[];
    shipCustomerShippingOriginalData: any[];
    workOrderId: any;
    shipViaList: Object;
    customerId: any;
    // legalEntityList: any;
    businessUnitList: any;
    divisionList: any;
    departmentList: any;
    markUpList: any;
    // numberData = [{ label: 1, value: 1 }];
    invoiceTypeList: any;
    shipViaData: any;

    constructor(private commonService: CommonService, private workOrderService: WorkOrderService,
        private customerService: CustomerService, private quoteService: WorkOrderQuoteService

    ) {

    }
    ngOnInit() {
        const data = this.billingorInvoiceForm;
        this.workOrderId = this.savedWorkOrderData.workOrderId;
        this.customerId = editValueAssignByCondition('customerId', this.savedWorkOrderData.customerId);
        // this.getCustomerDetailsFromHeader();
        this.getShipViaByCustomerId();
        // this.getLegalEntity();
        // this.generateNumbers();
        this.getPercentageList();
        this.getInvoiceList();


        if (this.isEditBilling) {
            this.getSiteNamesBySoldCustomerId(data.soldToCustomerId);
            this.getSiteNamesByShipCustomerId(data.shipToCustomerId);
            this.commonService.getManagementStructureDetails(data.managementStructureId).subscribe(res => {
                this.selectedLegalEntity(res.Level1);
                this.selectedBusinessUnit(res.Level2);
                this.selectedDivision(res.Level3);
                this.selectedDepartment(res.Level4);
                this.managementStructure = {
                    companyId: res.Level1 !== undefined ? res.Level1 : null,
                    buId: res.Level2 !== undefined ? res.Level2 : null,
                    divisionId: res.Level3 !== undefined ? res.Level3 : null,
                    departmentId: res.Level4 !== undefined ? res.Level4 : null,
                }

            })
            if (this.billingorInvoiceForm.soldToCustomerId) {
                this.soldCustomerAddress = {
                    city: data.city,
                    country: data.country,
                    line1: data.line1,
                    line2: data.line2,
                    postalCode: parseInt(data.postalCode),
                    stateOrProvince: data.stateOrProvince
                }

            }
            if (this.billingorInvoiceForm.shipToCustomerId) {
                this.shipCustomerAddress = {
                    city: data.shipToCity,
                    country: data.country,
                    line1: data.line1,
                    line2: data.shipToLine2,
                    postalCode: parseInt(data.shipToPostalCode),
                    stateOrProvince: data.shipToState
                }

            }





        }
    }

    getPercentageList(){
        this.commonService.smartDropDownList('[Percent]', 'PercentId', 'PercentValue').subscribe(res => {
            this.markUpList =  res;
        })
    }

    // generateNumbers() {
    //     for (var i = 1; i <= 10; i++) {
    //         this.numberData.push({ label: i * 10, value: i * 10 });

    //     }

    // }
    getInvoiceList() {
        this.commonService.smartDropDownList('InvoiceType', 'InvoiceTypeId', 'Description').subscribe(res => {
            this.invoiceTypeList = res;
        })
    }

    // getLegalEntity() {
    //     this.commonService.getLegalEntityList().subscribe(res => {
    //         this.legalEntityList = res;
    //     })
    // }





    getShipViaByCustomerId() {
        this.commonService.getShipViaDetailsByModule(getModuleIdByName('Customer'), this.customerId).subscribe(res => {
            this.shipViaData = res;
            this.shipViaList = res.map(x => {
                return {
                    label: x.name,
                    value: x.shippingViaId
                }
            });
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
    async getSiteNamesBySoldCustomerId(object) {
        const { customerId } = object;
        await this.customerService.getCustomerShipAddressGet(customerId).subscribe(res => {

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

    changeOfShipVia(value) {
        console.log(value);

        const data = getObjectById('shippingViaId', value, this.shipViaData);

        if (data) {
            this.billingorInvoiceForm.shipAccountInfo = data.shippingAccountInfo;
        }
    }

    async  getSiteNamesByShipCustomerId(object) {
        const { customerId } = object;
        await this.customerService.getCustomerShipAddressGet(customerId).subscribe(res => {
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

    selectedLegalEntity(legalEntityId) {
        if (legalEntityId) {
            this.billingorInvoiceForm.managementStructureId = legalEntityId;
            this.commonService.getBusinessUnitListByLegalEntityId(legalEntityId).subscribe(res => {
                this.businessUnitList = res;
            })
        }

    }
    selectedBusinessUnit(businessUnitId) {
        if (businessUnitId) {
            this.billingorInvoiceForm.managementStructureId = businessUnitId;
            this.commonService.getDivisionListByBU(businessUnitId).subscribe(res => {
                this.divisionList = res;
            })
        }

    }
    selectedDivision(divisionUnitId) {
        if (divisionUnitId) {
            this.billingorInvoiceForm.managementStructureId = divisionUnitId;
            this.commonService.getDepartmentListByDivisionId(divisionUnitId).subscribe(res => {
                this.departmentList = res;
            })
        }

    }
    selectedDepartment(departmentId) {
        if (departmentId) {
            this.billingorInvoiceForm.managementStructureId = departmentId;
        }
    }

    resetOtherOptions() {
        // this.billingorInvoiceForm.totalWorkOrderCost = 0;
        this.billingorInvoiceForm.totalWorkOrderValue = null;
        this.billingorInvoiceForm.totalWorkOrderCostPlus = 0;

        if (this.billingorInvoiceForm.totalWorkOrder === true) {
            this.resetMisCharges();
            this.resetMaterial();
            this.resetLaborOverHead();
            this.calculateTotalWorkOrderCost();

        }
    }

    calculateTotalWorkOrderCost() {
        this.sumOfMaterialList();
        this.sumofCharges();
        this.sumofLaborOverHead();
        this.billingorInvoiceForm.totalWorkOrderCost = (this.billingorInvoiceForm.materialCost + this.billingorInvoiceForm.miscChargesCost + this.billingorInvoiceForm.laborOverHeadCost);
        this.calculateTotalWorkOrderCostPlus(0);
    }

    calculateTotalWorkOrderCostPlus(value) {
        const materialCostPlus = this.billingorInvoiceForm.materialCost + ((this.billingorInvoiceForm.materialCost * value) / 100)
        const misChargeCostPlus = this.billingorInvoiceForm.miscChargesCost + ((this.billingorInvoiceForm.miscChargesCost * value) / 100)
        const laborOverHeadCostPlus = this.billingorInvoiceForm.laborOverHeadCost + ((this.billingorInvoiceForm.laborOverHeadCost * value) / 100);
        this.billingorInvoiceForm.totalWorkOrderCostPlus = Math.round(materialCostPlus + misChargeCostPlus + laborOverHeadCostPlus)
        // this.calculateGrandTotal();
    }

    resetMaterial() {
        console.log(this.billingorInvoiceForm.material);
        if (this.billingorInvoiceForm.material === false || this.billingorInvoiceForm.totalWorkOrder === true) {
            this.billingorInvoiceForm.material = false
            this.billingorInvoiceForm.materialValue = null;
            // this.billingorInvoiceForm.materialCost = 0;
            this.billingorInvoiceForm.materialCostPlus = 0;
        } else {
            this.sumOfMaterialList();
            this.calculateMaterialCostPlus(0);
        }
    }

    resetLaborOverHead() {
        if (this.billingorInvoiceForm.laborOverHead === false || this.billingorInvoiceForm.totalWorkOrder === true) {
            this.billingorInvoiceForm.laborOverHead = false
            this.billingorInvoiceForm.laborOverHeadValue = null;
            // this.billingorInvoiceForm.miscChargesCost = 0;
            this.billingorInvoiceForm.laborOverHeadCostPlus = 0;
        } else {
            this.sumofLaborOverHead();
            this.calculateLaborOverHeadCostPlus(0);
        }

    }

    resetMisCharges() {
        if (this.billingorInvoiceForm.miscCharges === false || this.billingorInvoiceForm.totalWorkOrder === true) {
            this.billingorInvoiceForm.miscCharges = false
            this.billingorInvoiceForm.miscChargesValue = null;
            // this.billingorInvoiceForm.miscChargesCost = 0;
            this.billingorInvoiceForm.miscChargesCostPlus = 0;
        } else {
            this.sumofCharges();
            this.calculateMiscChargesCostPlus(0);
        }

    }



    sumOfMaterialList() {
        this.billingorInvoiceForm.materialCost = this.quoteMaterialList.reduce((acc, x) => acc + x.materialCostPlus, 0);
    }
    calculateMaterialCostPlus(value) {
        this.billingorInvoiceForm.materialCostPlus = this.billingorInvoiceForm.materialCost + ((this.billingorInvoiceForm.materialCost * value) / 100);
        // this.calculateGrandTotal();
    }
    sumofLaborOverHead() {
        this.billingorInvoiceForm.laborOverHeadCost = this.quoteLaborList.reduce((acc, x) => acc + x.labourCostPlus, 0);
    }
    calculateLaborOverHeadCostPlus(value) {
        this.billingorInvoiceForm.laborOverHeadCostPlus = this.billingorInvoiceForm.laborOverHeadCost + ((this.billingorInvoiceForm.laborOverHeadCost * value) / 100);
    }


    sumofCharges() {
        this.billingorInvoiceForm.miscChargesCost = this.quoteChargesList.reduce((acc, x) => acc + x.chargesCostPlus, 0);
    }
    calculateMiscChargesCostPlus(value) {
        this.billingorInvoiceForm.miscChargesCostPlus = this.billingorInvoiceForm.miscChargesCost + ((this.billingorInvoiceForm.miscChargesCost * value) / 100);
        // this.calculateGrandTotal();
    }

    calculateGrandTotal() {

        if (this.billingorInvoiceForm.totalWorkOrder === false) {
            const materialAmount = this.billingorInvoiceForm.materialValue === null ? this.billingorInvoiceForm.materialCost : this.billingorInvoiceForm.materialCostPlus;
            const misChargesAmount = this.billingorInvoiceForm.miscChargesValue === null ? this.billingorInvoiceForm.miscChargesCost : this.billingorInvoiceForm.miscChargesCostPlus;
            const laborOverHeadAmount = this.billingorInvoiceForm.laborOverHeadValue === null ? this.billingorInvoiceForm.laborOverHeadCost : this.billingorInvoiceForm.laborOverHeadCostPlus;

            // console.log(this.billingorInvoiceForm.miscChargesCost, this.billingorInvoiceForm.miscChargesCostPlus)
            // console.log(this.billingorInvoiceForm.laborOverHeadCost, this.billingorInvoiceForm.laborOverHeadCostPlus)
            // console.log(materialAmount, misChargesAmount, laborOverHeadAmount);

            this.billingorInvoiceForm.grandTotal = (materialAmount + misChargesAmount + laborOverHeadAmount);

        } else {
            const totalWorkOrderCostPlus = this.billingorInvoiceForm.totalWorkOrder === null ? this.billingorInvoiceForm.totalWorkOrderCost : this.billingorInvoiceForm.totalWorkOrderCostPlus;
            this.billingorInvoiceForm.grandTotal = (totalWorkOrderCostPlus);
        }


    }



    saveWorkOrderBilling() {
        this.saveWOBilling.emit(this.billingorInvoiceForm);

        // this.getQuoteCostingData();
    }
    updateWorkOrderBilling() {
        this.updateWOBilling.emit(this.billingorInvoiceForm);
        // this.getQuoteCostingData();
    }









}