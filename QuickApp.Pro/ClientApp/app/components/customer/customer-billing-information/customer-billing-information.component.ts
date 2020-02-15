import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { CustomerBillingAddressModel } from '../../../models/customer-billing-address.model';
import { AuthService } from '../../../services/auth.service';
import { getValueFromObjectByKey, getObjectByValue, editValueAssignByCondition } from '../../../generic/autocomplete';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuditHistory } from '../../../models/audithistory.model';
import * as $ from 'jquery';
import { ConfigurationService } from '../../../services/configuration.service';
import { CommonService } from '../../../services/common.service';

@Component({
    selector: 'app-customer-billing-information',
    templateUrl: './customer-billing-information.component.html',
    styleUrls: ['./customer-billing-information.component.scss'],

})

/** anys component*/
export class CustomerBillingInformationComponent {
    @Input() savedGeneralInformationData: any = {};
    @Input() countryListOriginal;
    @Input() editGeneralInformationData;
    @Input() editMode;
    @Output() tab = new EventEmitter<any>();
    @Input() selectedCustomerTab: string = "";
    @Input() customerDataFromExternalComponents: any;
    disableSave: boolean = true;
    countryList: any[];
    // countryListOriginal: any[];
    selectedRowForDelete: any;
    billingInfo = new CustomerBillingAddressModel()
    billingInfoList: any = [];
    billingInfoTableHeaders = [
        { field: 'siteName', header: 'Site Name' },
        { field: 'address1', header: 'Address1' },
        { field: 'address2', header: 'Address2' },

        { field: 'city', header: 'City' },
        { field: 'stateOrProvince', header: 'State / Prov' },
        { field: 'postalCode', header: 'Postal Code' },
        { field: 'countryName', header: 'Country' },
        { field: 'isPrimary', header: 'IsPrimary' }
    ]
    selectedColumns = this.billingInfoTableHeaders;
    viewData: any;
    id: number;
    customerCode: any;
    customerName: any;
    isEditMode: boolean = false;
    billingHistoryData: Object;
    modal: NgbModalRef;
    isDeleteMode: boolean = false;
    customerBillingAddressId: number;
    public sourceCustomer: any = {}
    public auditHisory: AuditHistory[] = [];
    billingauditHisory: any[];
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    formData = new FormData();
    isViewMode: boolean = false;
    loader: boolean = true;


    constructor(public customerService: CustomerService, private authService: AuthService, private alertService: AlertService, private modalService: NgbModal, private configurations: ConfigurationService,
        private activeModal: NgbActiveModal, private commonService: CommonService, ) {

    }


    ngOnInit(): void {

        if (this.editMode) {
            this.id = this.editGeneralInformationData.customerId;
            this.customerCode = this.editGeneralInformationData.customerCode;
            this.customerName = this.editGeneralInformationData.name;
            this.getBillingDataById()
            this.isViewMode = false;

        } else {
            if (this.customerDataFromExternalComponents) {
                this.id = this.customerDataFromExternalComponents.customerId;
                this.customerCode = this.customerDataFromExternalComponents.customerCode;
                this.customerName = this.customerDataFromExternalComponents.name;
                this.getBillingDataById();
                this.isViewMode = true;
            } else {
                this.id = this.savedGeneralInformationData.customerId;
                this.customerCode = this.savedGeneralInformationData.customerCode;
                this.customerName = this.savedGeneralInformationData.name;
                //Added By Vijay For Customer Create time IsBillingAddess is selected checkbox Then list page we are displaying list
                this.getBillingDataById()
                this.isViewMode = false;
            }

        }




    }

    ngOnChanges(changes: SimpleChanges) {
        for (let property in changes) {
            if (property == 'selectedCustomerTab') {
                if (changes[property].currentValue == "Billing") {
                    this.getBillingDataById()
                }
            }
            if (property == 'customerDataFromExternalComponents') {

                if (changes[property].currentValue != {}) {
                    this.id = this.customerDataFromExternalComponents.customerId;
                    this.customerCode = this.customerDataFromExternalComponents.customerCode;
                    this.customerName = this.customerDataFromExternalComponents.name;
                    this.getBillingDataById()
                    this.isViewMode = true;

                }
            }
        }

    }
    enableSave() {
        console.log('hello ,directive');
        this.disableSave = false;

    }
    closeMyModel() {
        $("#addBillingInfo").modal("hide");
        this.disableSave = true;
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }





    filtercountry(event) {
        this.countryList = this.countryListOriginal;


        const countryData = [...this.countryListOriginal.filter(x => {
            return x.countries_name.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.countryList = countryData;

    }
    saveBillingInformation() {

        const data = {
            ...this.billingInfo,
            createdBy: this.userName,
            updatedBy: this.userName,
            country: getValueFromObjectByKey('countries_id', this.billingInfo.country),
            masterCompanyId: 1,
            // isPrimary: false,
            isActive: true,
            customerId: this.id

        }
        // create shipping 
        if (!this.isEditMode) {
            this.customerService.newBillingAdd(data).subscribe(() => {
                this.billingInfo = new CustomerBillingAddressModel();
                this.alertService.showMessage(
                    'Success',
                    `Saved  Billing Information Sucessfully `,
                    MessageSeverity.success
                );
                this.getBillingDataById();
            })
        } else {
            // update shipping 
            this.customerService.updateBillinginfo(data).subscribe(() => {
                this.billingInfo = new CustomerBillingAddressModel();
                this.alertService.showMessage(
                    'Success',
                    `Updated  Billing Information Sucessfully `,
                    MessageSeverity.success
                );
                this.getBillingDataById();
            })
        }


        $("#addBillingInfo").modal("hide");
        this.disableSave = true;
    }


    addBillingIfo() {
        this.isEditMode = false;
        this.billingInfo = new CustomerBillingAddressModel();
    }
    getBillingDataById() {
        this.customerService.getCustomerBillViaDetails(this.id).subscribe(res => {
            this.billingInfoList = res[0]
            this.loader = false;

            // if (res.length > 0) {
            //     this.totalRecords = this.billingInfoList.length;
            //     this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            // }

        }, err => {
            this.loader = false;
        })
    }

    getPageCount(totalNoofRecords, pageSize) {
        return Math.ceil(totalNoofRecords / pageSize)
    }
    pageIndexChange(event) {
        this.pageSize = event.rows;
    }

    openBillingView(data) {
        console.log(data);
        this.viewData = data;

        // this.isViewModel = false;
    }
    toggledbldisplay(data) {
        this.viewData = data;

        $('#view').modal('show');



    }
    nextClick() {
        this.tab.emit('Shipping');
        this.alertService.showMessage(
            'Success',
            ` ${this.editMode ? 'Updated' : 'Saved'} Billing Information Sucessfully `,
            MessageSeverity.success
        );

    }
    backClick() {
        this.tab.emit('Financial');
    }
    openEdit(rowData) {

        this.isEditMode = true;
        this.billingInfo = { ...rowData, country: getObjectByValue('countries_id', rowData.country, this.countryListOriginal) };
    }


    getCustomerBillingHistory(content, row) {
        const { customerBillingAddressId } = row;
        this.alertService.startLoadingMessage();

        this.customerService.getCustomerBillingHistory(this.id, customerBillingAddressId).subscribe(
            results => this.onAuditHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));
    }
    private onAuditHistoryLoadSuccessful(auditHistory, content) {
        this.alertService.stopLoadingMessage();


        this.billingauditHisory = auditHistory;

        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, windowClass: "popup-blur" });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    getColorCodeForHistory(i, field, value) {
        const data = this.billingauditHisory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }


    async updateActiveorInActiveForBilling(rowData) {

        console.log(rowData);

        await this.customerService.CustomersBillingUpdateforActive(rowData.customerBillingAddressId, rowData.isActive, this.userName).subscribe(res => {

            this.getBillingDataById();
            this.alertService.showMessage(
                'Success',
                `Sucessfully Updated  Billing Status`,
                MessageSeverity.success
            );
        })
    }



    dismissModel() {
        this.modal.close();
    }
    deleteBillingInfo(content, rowData) {

        if (!rowData.isPrimary) {
            this.selectedRowForDelete = rowData;
            this.isDeleteMode = true;


            this.customerBillingAddressId = rowData.customerBillingAddressId
            this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
            this.modal.result.then(() => {
                console.log('When user closes');
            }, () => { console.log('Backdrop click') })
        } else {
            $('#deleteoopsBilling').modal('show');
        }
    }
    deleteItemAndCloseModel() {
        const obj = {
            isActive: false,
            addressStatus: false,
            updatedBy: this.userName,
            customerBillingAddressId: this.customerBillingAddressId
        }

        if (this.customerBillingAddressId > 0) {

            this.customerService.updateDeleteBillinginfo(obj).subscribe(
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
        this.getBillingDataById();
    }
    private saveFailedHelper(error: any) {

        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }


    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=CustomerBillingAddress&fileName=CustomerBillingAddress.xlsx`;
        window.location.assign(url);
    }
    customExcelUpload(event) {
        const file = event.target.files;

        console.log(file);
        if (file.length > 0) {

            this.formData.append('file', file[0])
            this.customerService.BillingFileUpload(this.formData, this.id).subscribe(res => {
                event.target.value = '';

                this.formData = new FormData();
                this.getBillingDataById();
                this.alertService.showMessage(
                    'Success',
                    `Successfully Uploaded  `,
                    MessageSeverity.success
                );
            })



        }

    }



}











