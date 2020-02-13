
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { OnInit, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from '../../../services/auth.service';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { CustomerShippingModel } from '../../../models/customer-shipping.model';
import { CustomerInternationalShippingModel, CustomerInternationalShipVia } from '../../../models/customer-internationalshipping.model';
import { getValueFromObjectByKey, getObjectById, editValueAssignByCondition } from '../../../generic/autocomplete';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { ConfigurationService } from '../../../services/configuration.service';
import { CommonService } from '../../../services/common.service';
@Component({
    selector: 'app-customer-shipping-information',
    templateUrl: './customer-shipping-information.component.html',
    styleUrls: ['./customer-shipping-information.component.scss'],
})
/** anys component*/
export class CustomerShippingInformationComponent implements OnInit {

    // [x: string]: any;

    @Input() savedGeneralInformationData;
    @Input() countryListOriginal;
    @Input() editGeneralInformationData;
    @Input() editMode;
    @Output() tab = new EventEmitter();
    @Input() selectedCustomerTab: string = "";
    @Input() customerDataFromExternalComponents: any;
    disableSave: boolean = true;
    domesticShippingInfo = new CustomerShippingModel()
    internationalShippingInfo = new CustomerInternationalShippingModel()
    internationalShippingViaData: any = [];
    demosticShippingViaData: any = [];
    totalRecordsForInternationalShipVia: any;
    isEditInternationalShipVia: boolean = false;
    isEditDomesticShipVia: boolean = false;
    // countryListOriginal: any[];
    countrycollection: any[];
    customerShippingAddressId: number;
    selectedRowForDelete: any;
    selectedRowForDeleteInter: any;
    public sourceCustomer: any = {}
    internationalShippingId: number;
    shippingauditHisory: any[];
    shippingViaauditHisory: any[];
    intershippingViaauditHisory: any[];
    interShippingauditHisory: any[];
    formData = new FormData();
    domesticShippingHeaders = [
        { field: 'siteName', header: 'Site Name' },
        { field: 'address1', header: 'Address1' },
        { field: 'address2', header: 'Address2' },
        // { field: 'isPrimary', header: 'Is Primary' },
        { field: 'city', header: 'City' },
        { field: 'stateOrProvince', header: 'State / Prov' },
        { field: 'postalCode', header: 'Postal Code' },
        { field: 'countryName', header: 'Country' },
        { field: 'isPrimary', header: 'IsPrimary' }
    ]
    internationalShippingHeaders = [
        { field: 'exportLicense', header: 'Export License' },
        { field: 'description', header: 'Description' },
        // { field: 'isPrimary', header: 'Is Primary' },
        { field: 'startDate', header: 'Start Date' },
        { field: 'expirationDate', header: 'Expiration Date' },
        { field: 'amount', header: 'Amount' },
        { field: 'shipToCountry', header: 'Country' },
        { field: 'isPrimary', header: 'IsPrimary' }
    ]
    selectedColumnsForDomesticTable = this.domesticShippingHeaders;
    selectedColumnsForInternationTable = this.internationalShippingHeaders;
    domesticShippingData: any[] = [];
    sourceViewforShipping: any;
    isEditDomestic: boolean = false;
    isEditInternational: boolean = false;
    internationalShippingData: any[] = [];
    selectedrowsFromDomestic: any;
    selectedrowsFromInternational: any;
    pageIndexForInternational: number = 0;
    pageIndexForInternationalShipVia: number = 0;
    pageSizeForInternationalShipVia: number = 10;
    totalRecordsForInternationalShipping: any;
    sourceViewforInterShipping: any;
    sourceViewforInterShippingVia: any;
    sourceViewforDomesticShippingVia: any;
    shipViaInternational = new CustomerInternationalShipVia();
    shipViaDomestic = new CustomerInternationalShipVia();
    editableRowIndexForIS: any;
    id: number;
    modal: NgbModalRef;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    pageSizeForDomestic: number = 10;
    totalPages: number;
    totalRecordsInter: any;
    totalPagesInter: number;
    totalRecordsShipVia: any;
    totalPagesShipVia: number;
    interTotalRecords: number = 0;
    interTotalPages: number = 0;
    // selectedShipVia: any;
    selectedColumnsForInternationShipViaTable = [
        { field: 'shipVia', header: 'Ship Via' },
        { field: 'shippingAccountInfo', header: 'Shipping AccountInfo' },
        //{ field: 'shippingURL', header: 'Shipping URL' },
        //{ field: 'shippingId', header: 'shipping Id' },
        { field: 'memo', header: 'Memo' }
    ];
    selectedShipViaInternational: any;
    selectedShipViaDomestic: any;
    customerCode: any;
    customerName: any;
    isDeleteMode: boolean = false;
    customerShippingId: number;
    shippingViaDetailsId: number;
    selectedRowForDeleteVia: any;
    selectedRowForDeleteInterVia: any;
    selectedColumnsForDomesticShipVia = this.selectedColumnsForInternationShipViaTable;
    isViewMode: boolean = false;
    totalRecordsInternationalShipping: any = 0;
    totalPagesInternationalShipping: number = 0;
    loaderForDomestic: boolean = true;
    loaderForInternational: boolean = true;
    loaderForDomesticShipVia: boolean = true;
    loaderForInternationalShipVia: boolean = true;
    pageSizeForInt: number = 10;
    pageSizeForShipViaDomestic: number = 10;
    pageSizeForShipViaInt: number = 10;
    currentDate = new Date();

    constructor(private customerService: CustomerService, private authService: AuthService,
        private alertService: AlertService, private activeModal: NgbActiveModal, private modalService: NgbModal, private configurations: ConfigurationService,
        private commonService: CommonService,
    ) { }
    ngOnInit() {
        if (this.editMode) {
            this.id = this.editGeneralInformationData.customerId;
            console.log("this.check id on ngonint", this.editGeneralInformationData.customerId, this.editGeneralInformationData);
            this.customerCode = this.editGeneralInformationData.customerCode;
            this.customerName = this.editGeneralInformationData.name;
            // this.getDomesticShippingByCustomerId();
            // this.getInternationalShippingByCustomerId();
            this.isViewMode = false;
            this.getDomesticShippingByCustomerId();
            this.getInternationalShippingByCustomerId();
        } else {
            // this.getDomesticShippingByCustomerId();
            // this.getInternationalShippingByCustomerId();
            if (this.customerDataFromExternalComponents) {
                this.id = this.customerDataFromExternalComponents.customerId;
                console.log("this.check id view if", this.customerDataFromExternalComponents.customerId, this.customerDataFromExternalComponents);
                this.customerCode = this.customerDataFromExternalComponents.customerCode;
                this.customerName = this.customerDataFromExternalComponents.name;
                this.isViewMode = true;
                this.getDomesticShippingByCustomerId();
                this.getInternationalShippingByCustomerId();
            } else {
                console.log("this.check id view else", this.savedGeneralInformationData.customerId, this.savedGeneralInformationData);
                this.id = this.savedGeneralInformationData.customerId;
                this.customerCode = this.savedGeneralInformationData.customerCode;
                this.customerName = this.savedGeneralInformationData.name;
                this.isViewMode = false;
                this.getDomesticShippingByCustomerId();
                this.getInternationalShippingByCustomerId();
            }


            //Added By Vijay For Customer Create time IsShippingAddess is selected checkbox Then list page we are displaying list
            // this.getDomesticShippingByCustomerId();
            // this.getInternationalShippingByCustomerId();
        }
    }
    ngOnChanges(changes: SimpleChanges) {
        for (let property in changes) {
            if (property == 'selectedCustomerTab') {
                if (changes[property].currentValue == "Shipping") {
                    this.getDomesticShippingByCustomerId()
                    //                this.getInternationalShippingByCustomerId()
                    //                this.getShipViaDataByInternationalShippingId()
                }
            }
            if (property == 'customerDataFromExternalComponents') {

                if (changes[property].currentValue != {}) {
                    this.id = this.customerDataFromExternalComponents.customerId;
                    this.customerCode = this.customerDataFromExternalComponents.customerCode;
                    this.customerName = this.customerDataFromExternalComponents.name;
                    this.isViewMode = true;
                    // this.getList();
                    this.getDomesticShippingByCustomerId();
                    this.getInternationalShippingByCustomerId();
                }
            }
        }
    }
    enableSave() {
        this.disableSave = false;
    }
    closeMyModel(type) {
        $(type).modal("hide");
        this.disableSave = true;
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    filterCountries(event) {
        this.countrycollection = this.countryListOriginal;
        this.countrycollection = [...this.countryListOriginal.filter(x => {
            return x.nice_name.toLowerCase().includes(event.query.toLowerCase())
        })]
    }
    // save Domestic Shipping 
    saveDomesticShipping() {
        const data = {
            ...this.domesticShippingInfo,
            createdBy: this.userName,
            updatedBy: this.userName,
            country: getValueFromObjectByKey('countries_id', this.domesticShippingInfo.country),
            masterCompanyId: 1,
            customerId: this.id
        }
        // create shipping 
        if (!this.isEditDomestic) {
            this.customerService.newShippingAdd(data).subscribe(() => {
                this.shipViaDomestic = new CustomerInternationalShipVia();
                this.alertService.showMessage(
                    'Success',
                    `Saved  Shipping Information Sucessfully `,
                    MessageSeverity.success
                );
                this.getDomesticShippingByCustomerId();
            })
        } else {
            // update shipping 
            this.customerService.updateshippinginfo(data).subscribe(() => {
                this.shipViaDomestic = new CustomerInternationalShipVia();
                this.alertService.showMessage(
                    'Success',
                    `Updated  Shipping Information Sucessfully `,
                    MessageSeverity.success
                );
                this.getDomesticShippingByCustomerId();
            })
        }
        $("#addShippingInfo").modal("hide");
        this.disableSave = true;
    }
    // get domestic shipping by customer Id 
    getDomesticShippingByCustomerId() {
        console.log("doemstic shipping", this.id);
        this.customerService.getCustomerShipAddressGet(this.id).subscribe(res => {
            console.log("myresponse domestic", res);

            this.domesticShippingData = res[0];
            this.loaderForDomestic = false;


            // if (res.length > 0) {
            //     this.totalRecords = this.domesticShippingData.length;
            //     this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            // }


        }, err => {
            this.loaderForDomestic = false;
        })
    }
    // View Details  data
    openShippinggView(rowData) {
        this.sourceViewforShipping = rowData;
    }
    // edit Domestic details data 
    openEditDomestic(rowData) {
        this.isEditDomestic = true;
        // this.selectedShipViaDomestic = rowData;
        this.domesticShippingInfo = rowData;
        this.domesticShippingInfo = { ...rowData, country: getObjectById('countries_id', rowData.country, this.countryListOriginal) };
        //
    }
    //async openEditDomestic(rowData) {
    //    debugger

    //    await this.customerService.getCustomerShipAddressGet(rowData.customerShippingAddressId).subscribe(res => {
    //        this.isEditDomestic = true;
    //       this.domesticShippingInfo = { ...res, countryId: getObjectById('countries_id', res.countryId, this.countryListOriginal) };
    //    })
    //}
    addDomesticShipping() {
        this.isEditDomestic = false;
        this.domesticShippingInfo = new CustomerShippingModel();
    }
    addInternationalShipping() {
        this.isEditInternational = false;
        this.internationalShippingInfo = new CustomerInternationalShippingModel();
    }
    //deleteDomesticShipping(rowData) {
    //    const obj = {
    //        isActive: false,
    //        addressStatus: false,
    //        updatedBy: this.userName,
    //        customerShippingAddressId: rowData.customerShippingAddressId
    //    }
    //    // delete customer shipping 
    //    this.customerService.updateStatusHipping(obj).subscribe(() => {
    //        // toaster
    //        this.alertService.showMessage(
    //            'Success',
    //            `Deleted Shipping Sucessfully `,
    //            MessageSeverity.success
    //        );
    //        this.getDomesticShippingByCustomerId();
    //    })


    //}
    deleteDomesticShipping(content, rowData) {
        if (!rowData.isPrimary) {

            this.isDeleteMode = true;
            this.selectedRowForDelete = rowData;
            this.customerShippingAddressId = rowData.customerShippingAddressId

            this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
            this.modal.result.then(() => {
                console.log('When user closes');
            }, () => { console.log('Backdrop click') })
        } else {
            $('#deleteoopsShipping').modal('show');
        }
    }
    deleteItemAndCloseModel() {
        const obj = {
            isActive: false,
            addressStatus: false,
            updatedBy: this.userName,
            customerShippingAddressId: this.customerShippingAddressId
        }
        if (this.customerShippingAddressId > 0) {
            this.customerService.updateStatusHipping(obj).subscribe(
                response => this.saveCompleted(this.sourceCustomer),
                error => this.saveFailedHelper(error));
        }
        this.modal.close();
    }
    private saveCompleted(user?: any) {
        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
            this.saveCompleted
        }
        this.getDomesticShippingByCustomerId();
    }
    private saveFailedHelper(error: any) {
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }
    deleteInternationalShipping(content, rowData) {
        if (!rowData.isPrimary) {
            this.isDeleteMode = true;
            this.selectedRowForDeleteInter = rowData;
            this.internationalShippingId = rowData.internationalShippingId

            this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
            this.modal.result.then(() => {
                console.log('When user closes');
            }, () => { console.log('Backdrop click') })
        } else {
            $('#deleteoopsShipping').modal('show');
        }
    }
    deleteItemAndCloseModel1() {
        if (this.internationalShippingId > 0) {

            this.customerService.deleteInternationalShipping(this.internationalShippingId, this.userName).subscribe(
                response => this.saveCompleted1(this.sourceCustomer),
                error => this.saveFailedHelper1(error));
        }
        this.modal.close();
    }
    private saveCompleted1(user?: any) {
        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
            this.saveCompleted
        }
        this.getInternationalShippingByCustomerId();
    }
    private saveFailedHelper1(error: any) {
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }
    deleteShipVia(content, rowData) {
        if (!rowData.isPrimary) {
            this.isDeleteMode = true;
            this.selectedRowForDeleteVia = rowData;
            this.customerShippingAddressId = rowData.customerShippingAddressId;
            this.customerShippingId = rowData.customerShippingId

            this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
            this.modal.result.then(() => {
                console.log('When user closes');
            }, () => { console.log('Backdrop click') })
        } else {
            $('#deleteoopsShipping').modal('show');
        }
    }
    deleteItemAndCloseModel2() {
        if (this.customerShippingId > 0) {
            this.customerService.deleteShipViaDetails(this.customerShippingId, this.userName).subscribe(
                response => this.saveCompleted2(this.sourceCustomer),
                error => this.saveFailedHelper2(error));
        }
        this.modal.close();
    }
    private saveCompleted2(user?: any) {
        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
            this.saveCompleted
        }
        this.getShipViaByDomesticShippingId(this.customerShippingAddressId)
    }
    private saveFailedHelper2(error: any) {
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }
    deleteInternationalShippingVia(content, rowData) {
        if (!rowData.isPrimary) {
            this.isDeleteMode = true;
            this.selectedRowForDeleteInterVia = rowData;
            this.shippingViaDetailsId = rowData.shippingViaDetailsId;
            //this.customerShippingId = rowData.customerShippingId
            this.getShipViaDataByInternationalShippingId();

            this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
            this.modal.result.then(() => {
                console.log('When user closes');
            }, () => { console.log('Backdrop click') })
        } else {
            $('#deleteoopsShipping').modal('show');
        }

    }
    deleteItemAndCloseModel3() {
        if (this.shippingViaDetailsId > 0) {
            this.customerService.deleteInternationalShipViaId(this.shippingViaDetailsId, this.userName).subscribe(
                response => this.saveCompleted3(this.sourceCustomer),
                error => this.saveFailedHelper3(error));
        }
        this.modal.close();
    }
    private saveCompleted3(user?: any) {

        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
            this.saveCompleted
        }
        this.getShipViaDataByInternationalShippingId();
    }
    private saveFailedHelper3(error: any) {

        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }
    //deleteShipVia(rowData) {

    //    this.customerService.deleteShipViaDetails(rowData.customerShippingId, this.userName).subscribe(res => {
    //        this.getShipViaByDomesticShippingId(rowData.customerShippingAddressId)

    //        this.alertService.showMessage(
    //            'Success',
    //            `Sucessfully Deleted  Ship Via`,
    //            MessageSeverity.success
    //        );

    //    })
    //}

    //deleteInternationalShippingVia(rowData) {

    //    this.customerService.deleteInternationalShipViaId(rowData.shippingViaDetailsId, this.userName).subscribe(res => {
    //        this.getShipViaDataByInternationalShippingId();
    //        this.alertService.showMessage(
    //            'Success',
    //            `Sucessfully Deleted International Ship Via`,
    //            MessageSeverity.success
    //        );
    //    })
    //}
    dismissModel() {
        this.modal.close();
    }
    saveInternationalShipping() {
        // const id = this.savedGeneralInformationData.customerId;
        const data = {
            ...this.internationalShippingInfo,
            shipToCountryId: getValueFromObjectByKey('countries_id', this.internationalShippingInfo.shipToCountryId),
            createdBy: this.userName,
            updatedBy: this.userName,
            masterCompanyId: 1,
            isActive: true,
            isDeleted: false,
            customerId: this.id
        }
        if (!this.isEditInternational) {
            // save International SDhipping 
            this.customerService.postInternationalShippingPost(data).subscribe((res) => {
                this.shipViaInternational = new CustomerInternationalShipVia();
                this.getInternationalShippingByCustomerId()
                this.alertService.showMessage(
                    'Success',
                    `Saved International Shipping Information Sucessfully `,
                    MessageSeverity.success
                );
            })
        } else {
            // update international 
            this.customerService.updateInternationalShipping(data).subscribe(res => {
                this.shipViaInternational = new CustomerInternationalShipVia();
                this.getInternationalShippingByCustomerId()
                this.isEditInternational = false;
                this.alertService.showMessage(
                    'Success',
                    `Saved International Shipping Information Sucessfully `,
                    MessageSeverity.success
                );
            })
        }
        $("#addInternationalShippingInfo").modal("hide");
        this.disableSave = true;
    }
    // get International shipping by customer id 
    getInternationalShippingByCustomerId() {
        // const id = this.savedGeneralInformationData.customerId;

        console.log(this.id);

        this.customerService.getInternationalShippingByCustomerId(this.id).subscribe(res => {
            this.loaderForInternational = false;
            this.internationalShippingData = res;
            // this.totalRecordsForInternationalShipping = res.totalRecordsCount;
            // if (this.internationalShippingData.length > 0) {
            //     this.totalRecordsInternationalShipping = this.internationalShippingData.length;
            //     this.totalPagesInternationalShipping = Math.ceil(this.totalRecordsInternationalShipping / this.pageSize);
            // }
        }, err => {
            this.loaderForInternational = false;
        })
    }


    getPageCount(totalNoofRecords, pageSize) {
        return Math.ceil(totalNoofRecords / pageSize)
    }
    pageIndexChangeForDomestic(event) {
        this.pageSizeForDomestic = event.rows;
    }
    pageIndexChangeForInt(event) {
        this.pageSizeForInt = event.rows;
    }

    pageIndexChangeForShipViaDom(event) {
        this.pageSizeForShipViaDomestic = event.rows;
    }
    pageIndexChangeForShipViaInt(event) {
        this.pageSizeForShipViaInt = event.rows;
    }




    internationalShippingPagination(event: { first: any; rows: number }) {
        const pageIndex = parseInt(event.first) / event.rows;
        // this.pageIndexForInternational = pageIndex;
        // this.pageSizeForInternational = event.rows;
        this.getInternationalShippingByCustomerId();
    }
    async updateActiveorInActiveForIS(rowData) {
        await this.customerService.updateStatusForInternationalShippings(rowData.internationalShippingId, rowData.isActive, this.userName).subscribe(res => {
            this.getInternationalShippingByCustomerId();
            this.alertService.showMessage(
                'Success',
                `Sucessfully Updated  International Shipping Status`,
                MessageSeverity.success
            );
        })
    }
    async  updateActiveorInActiveShipViaForIS(rowData) {
        await this.customerService.updateStatusForInternationalShippingsVia(rowData.shippingViaDetailsId, rowData.isActive, this.userName).subscribe(res => {
            this.getShipViaDataByInternationalShippingId();

            this.alertService.showMessage(
                'Success',
                `Sucessfully Updated  International Shipping Via Status`,
                MessageSeverity.success
            );
        })
    }
    async updateActiveorInActiveForS(rowData) {
        console.log(rowData);
        await this.customerService.Shippingdetailsviastatus(rowData.customerShippingId, rowData.isActive, this.userName).subscribe(res => {
            this.getShipViaByDomesticShippingId(rowData.customerShippingAddressId)
            this.alertService.showMessage(
                'Success',
                `Sucessfully Updated   Shipping Via Status`,
                MessageSeverity.success
            );
        })
    }
    openInterShippingView(rowData) {
        this.sourceViewforInterShipping = rowData;
        // this.getShipViaDataByInternationalShippingId();
    }
    openInterShippingViewVia(rowData) {
        this.sourceViewforInterShippingVia = rowData;
        // this.getShipViaDataByInternationalShippingId();
    }
    openDomesticShippingViewVia(rowData) {
        this.sourceViewforDomesticShippingVia = rowData;
        // this.getShipViaDataByInternationalShippingId();
    }
    viewSelectedRowdbl(data) {
        this.sourceViewforShipping = data;
        $('#viewShipping').modal('show');
    }
    viewInterShipping(data) {
        this.sourceViewforInterShipping = data;
        $('#viewInter').modal('show');

    }
    toggledbldisplay(data) {
        this.sourceViewforDomesticShippingVia = data;
        $('#viewDomesticVia').modal('show');
    }
    toggledbldisplayShipVia(data) {
        this.sourceViewforInterShippingVia = data;
        $('#viewInterVia').modal('show');
    }
    async getInternationalShippingById(rowData) {
        await this.customerService.getInternationalShippingById(rowData.internationalShippingId).subscribe(res => {
            this.isEditInternational = true;
            this.internationalShippingInfo = {
                ...res,
                startDate: new Date(res.startDate),
                expirationDate: new Date(res.expirationDate),
                createdDate: new Date(res.expirationDate),
                updatedDate: new Date(res.expirationDate),
                shipToCountryId: getObjectById('countries_id', res.shipToCountryId, this.countryListOriginal)
            };
        })
    }
    selectedInternationalShipForShipVia(rowData) {
        this.selectedShipViaInternational = rowData;

        this.getShipViaDataByInternationalShippingId();
    }
    selectedDomesticForShipVia(rowData) {
        this.selectedShipViaDomestic = rowData;
        this.getShipViaByDomesticShippingId(rowData.customerShippingAddressId)

    }
    closeInternationalModal() {
        this.isEditInternational = false;
        this.internationalShippingInfo = new CustomerInternationalShippingModel()
    }
    //deleteInternationalShipping(rowData) {
    //    this.customerService.deleteInternationalShipping(rowData.internationalShippingId, this.userName).subscribe(res => {
    //        this.getInternationalShippingByCustomerId();
    //        this.alertService.showMessage(
    //            'Success',
    //            `Sucessfully Deleted International Shipping`,
    //            MessageSeverity.success
    //        );
    //    })
    //}
    async saveshipViaInternational() {
        const data = {
            ...this.shipViaInternational,
            internationalShippingId: this.selectedShipViaInternational.internationalShippingId,
            customerId: this.id,
            masterCompanyId: 1,
            createdBy: this.userName,
            updatedBy: this.userName,
        }
        if (!this.isEditInternationalShipVia) {
            await this.customerService.postInternationalShipVia(data).subscribe(res => {
                this.getShipViaDataByInternationalShippingId();

                this.shipViaInternational = new CustomerInternationalShipVia()
                this.alertService.showMessage(
                    'Success',
                    `Sucessfully Added Ship via for InternationalShipping`,
                    MessageSeverity.success
                );
            })
        } else {
            await this.customerService.updateShipViaInternational(data).subscribe(res => {
                this.getShipViaDataByInternationalShippingId();
                this.isEditInternationalShipVia = false;

                this.shipViaInternational = new CustomerInternationalShipVia()
                this.alertService.showMessage(
                    'Success',
                    `Sucessfully Updated Ship via for InternationalShipping`,
                    MessageSeverity.success
                );
            })
        }
    }
    async   saveshipViaDomestic() {
        const data = {
            ...this.shipViaDomestic,
            customerShippingAddressId: this.selectedShipViaDomestic.customerShippingAddressId,
            customerId: this.id,
            masterCompanyId: 1,
            createdBy: this.userName,
            updatedBy: this.userName,
        }
        if (!this.isEditDomesticShipVia) {
            await this.customerService.newShippingViaAdd(data).subscribe(res => {
                this.getShipViaByDomesticShippingId(this.selectedShipViaDomestic.customerShippingAddressId)
                this.shipViaDomestic = new CustomerInternationalShipVia()
                this.alertService.showMessage(
                    'Success',
                    `Sucessfully Added Ship via for Shipping`,
                    MessageSeverity.success
                );
            })
        } else {
            await this.customerService.updateshippingViainfo(data).subscribe(res => {
                this.getShipViaByDomesticShippingId(this.selectedShipViaDomestic.customerShippingAddressId)
                this.isEditDomesticShipVia = false;
                this.shipViaDomestic = new CustomerInternationalShipVia()
                this.alertService.showMessage(
                    'Success',
                    `Sucessfully Updated Ship via for Shipping`,
                    MessageSeverity.success
                );
            })
        }
    }
    getShipViaByDomesticShippingId(customerShippingAddressId) {
        this.customerService.getShipViaByDomesticShippingId(customerShippingAddressId).subscribe(res => {
            this.demosticShippingViaData = res;
            this.loaderForDomesticShipVia = false;
            // if (this.demosticShippingViaData.length > 0) {
            //     this.totalRecordsShipVia = this.demosticShippingViaData.length;
            //     this.totalPagesShipVia = Math.ceil(this.totalRecords / this.pageSize);
            // }
        }, err => {
            this.loaderForDomesticShipVia = false;
        })
    }
    getShipViaDataByInternationalShippingId() {
        // this.selectedShipVia.internationalShippingId
        this.customerService.getInternationalShipViaByInternationalShippingId(this.selectedShipViaInternational.internationalShippingId
        ).subscribe(res => {
            //this.internationalShippingViaData = res.paginationList;
            //this.totalRecordsForInternationalShipVia = res.totalRecordsCount;
            //if (this.internationalShippingViaData.length > 0) {
            //    this.interTotalRecords = res.totalRecordsCount;
            //    this.interTotalPages = Math.ceil(this.interTotalRecords / this.pageSize);
            //} else {
            //    this.interTotalRecords = 0;
            //    this.interTotalPages = 0;
            //}
            this.internationalShippingViaData = res;
            this.loaderForInternationalShipVia = false
            if (this.internationalShippingViaData.length > 0) {
                this.interTotalRecords = this.internationalShippingViaData.length;
                this.interTotalPages = Math.ceil(this.interTotalRecords / this.pageSize);
            }
        }, err => {
            this.loaderForInternationalShipVia = false;
        })
    }
    internationalShippingViaPagination(event: { first: any; rows: number }) {
        const pageIndex = parseInt(event.first) / event.rows;
        this.pageIndexForInternationalShipVia = pageIndex;
        this.pageSizeForInternationalShipVia = this.pageSizeForInternationalShipVia;
        this.getShipViaDataByInternationalShippingId();
    }
    editInternationalShipVia(rowData) {
        this.isEditInternationalShipVia = true;
        this.shipViaInternational = { ...rowData };
    }
    editDomesticShipVia(rowData) {
        this.isEditDomesticShipVia = true;
        this.shipViaDomestic = { ...rowData };
    }
    resetShipViaInternational() {
        this.shipViaInternational = new CustomerInternationalShipVia();
    }
    resetShipViaDomestic() {
        this.shipViaDomestic = new CustomerInternationalShipVia();
    }

    nextClick() {
        this.tab.emit('Sales');
        this.alertService.showMessage(
            'Success',
            ` ${this.editMode ? 'Updated' : 'Saved'} Customer Shipping Information Sucessfully `,
            MessageSeverity.success
        );
    }
    backClick() {
        this.tab.emit('Billing');
    }
    async updateActiveorInActiveForShipping(rowData) {

        console.log(rowData);

        await this.customerService.updateStatusForShippingDetails(rowData.customerShippingAddressId, rowData.isActive, this.userName).subscribe(res => {
            this.getDomesticShippingByCustomerId();
            this.alertService.showMessage(
                'Success',
                `Sucessfully Updated   Shipping Status`,
                MessageSeverity.success
            );
        })
    }
    openShipaddressHistory(content, row) {
        const { customerShippingAddressId } = row;
        this.alertService.startLoadingMessage();
        this.customerService.getCustomerShippingHistory(this.id, customerShippingAddressId).subscribe(
            results => this.onAuditHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));
    }
    private onAuditHistoryLoadSuccessful(auditHistory, content) {
        this.alertService.stopLoadingMessage();
        this.shippingauditHisory = auditHistory;
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
        }, () => { console.log('Backdrop click') })
    }
    getColorCodeForHistory(i, field, value) {
        const data = this.shippingauditHisory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }
    openInterShippingHistory(content, row) {
        const { internationalShippingId } = row;
        this.alertService.startLoadingMessage();
        this.customerService.getCustomerInterShippingHistory(this.id, internationalShippingId).subscribe(
            results => this.onInterAuditHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));
    }
    private onInterAuditHistoryLoadSuccessful(auditHistory, content) {
        this.alertService.stopLoadingMessage();
        this.interShippingauditHisory = auditHistory;
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
        }, () => { console.log('Backdrop click') })
    }
    getColorCodeForInterHistory(i, field, value) {
        const data = this.interShippingauditHisory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }
    openShipViaHistory(content, rowData) {
        this.alertService.startLoadingMessage();
        this.customerService.getCustomerShipViaHistory(this.id, rowData.customerShippingAddressId, rowData.customerShippingId).subscribe(
            results => this.onAuditShipViaHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));
    }
    private onAuditShipViaHistoryLoadSuccessful(auditHistory, content) {
        this.alertService.stopLoadingMessage();
        this.shippingViaauditHisory = auditHistory;
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
        }, () => { console.log('Backdrop click') })
    }
    getColorCodeForShipViaHistory(i, field, value) {
        const data = this.shippingViaauditHisory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }
    openInterShipViaHistory(content, rowData) {
        this.alertService.startLoadingMessage();
        this.customerService.getCustomerInterShipViaHistory(this.id, rowData.internationalShippingId, rowData.shippingViaDetailsId).subscribe(
            results => this.onAuditInterShipViaHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));
    }
    private onAuditInterShipViaHistoryLoadSuccessful(auditHistory, content) {
        this.alertService.stopLoadingMessage();
        this.intershippingViaauditHisory = auditHistory;
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
        }, () => { console.log('Backdrop click') })
    }
    getColorCodeForInterShipViaHistory(i, field, value) {
        const data = this.intershippingViaauditHisory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }
    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=CustomerShippingAddress&fileName=CustomerShippingAddress.xlsx`;
        window.location.assign(url);
    }
    customShippingExcelUpload(event) {
        const file = event.target.files;
        if (file.length > 0) {
            this.formData.append('file', file[0])
            this.customerService.ShippingFileUpload(this.formData, this.id).subscribe(res => {
                event.target.value = '';

                this.formData = new FormData();
                this.getDomesticShippingByCustomerId();
                this.alertService.showMessage(
                    'Success',
                    `Successfully Uploaded  `,
                    MessageSeverity.success
                );
            })
        }
    }
    sampleExcelDownloadForInternationalShipping() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=CustomerInternationalShipping&fileName=CustomerInternationalShipping.xlsx`;
        window.location.assign(url);
    }
    customInternationalShippingExcelUpload(event) {
        const file = event.target.files;
        if (file.length > 0) {
            this.formData.append('file', file[0])
            this.customerService.InternationalShippingUpload(this.formData, this.id).subscribe(res => {
                event.target.value = '';
                this.formData = new FormData();
                this.getInternationalShippingByCustomerId();
                this.alertService.showMessage(
                    'Success',
                    `Successfully Uploaded  `,
                    MessageSeverity.success
                );
            })
        }
    }


}
