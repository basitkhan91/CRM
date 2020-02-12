import { Component, Input, EventEmitter, Output } from '@angular/core';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { OnInit, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from '../../../../services/auth.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { legalEntityShippingModel } from '../../../../models/legalEntity-shipping.model';
import { legalEntityInternationalShippingModel, legalEntityInternationalShipVia } from '../../../../models/legalEntity-internationalshipping.model';
import { getValueFromObjectByKey, getObjectById, editValueAssignByCondition } from '../../../../generic/autocomplete';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { CommonService } from '../../../../services/common.service';
import { ConfigurationService } from '../../../../services/configuration.service';
@Component({
    selector: 'app-legal-entity-shipping',
    templateUrl: './legal-entity-shipping.component.html',
    styleUrls: ['./legal-entity-shipping.component.scss'],

})
/** anys component*/
export class EntityShippingComponent implements OnInit {
    @Input() savedGeneralInformationData;
    @Input() countryListOriginal;
    @Input() editGeneralInformationData;
    @Input() editMode;
    @Output() tab = new EventEmitter();
    @Input() selectedlegalEntityTab: string = "";
    @Input() legalEntityDataFromExternalComponents: any;
    disableSave: boolean = true;
    domesticShippingInfo = new legalEntityShippingModel()
    internationalShippingInfo = new legalEntityInternationalShippingModel()

    internationalShippingViaData: any = [];
    demosticShippingViaData: any = [];
    totalRecordsForInternationalShipVia: any;
    isEditInternationalShipVia: boolean = false;
    isEditDomesticShipVia: boolean = false;
    // countryListOriginal: any[];
    countrycollection: any[];
    legalEntityShippingAddressId: number;
    selectedRowForDelete: any;
    selectedRowForDeleteInter: any;
    public sourcelegalEntity: any = {}
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
    pageSizeForInternational: number = 10;
    pageIndexForInternationalShipVia: number = 0;
    pageSizeForInternationalShipVia: number = 10;
    totalRecordsForInternationalShipping: any;
    sourceViewforInterShipping: any;
    sourceViewforInterShippingVia: any;
    sourceViewforDomesticShippingVia: any;
    shipViaInternational = new legalEntityInternationalShipVia();
    shipViaDomestic = new legalEntityInternationalShipVia();
    editableRowIndexForIS: any;
    id: number;
    modal: NgbModalRef;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    totalRecordsInter: any;
    totalPagesInter: number;
    totalRecordsShipVia: any;
    totalPagesShipVia: number;
    interTotalRecords: number = 0;
    interTotalPages: number = 0;
    selectedColumnsForInternationShipViaTable = [
        { field: 'shipVia', header: 'Ship Via' },
        { field: 'shippingAccountInfo', header: 'Shipping AccountInfo' },
        { field: 'memo', header: 'Memo' }

    ];
    selectedShipViaInternational: any;
    selectedShipViaDomestic: any;

    legalEntityCode: any;
    legalEntityName: any;
    isDeleteMode: boolean = false;
    legalEntityShippingId: number;
    shippingViaDetailsId: number;
    selectedRowForDeleteVia: any;
    selectedRowForDeleteInterVia: any;
    selectedColumnsForDomesticShipVia = this.selectedColumnsForInternationShipViaTable;
    isViewMode: boolean = false;
    totalRecordsInternationalShipping: any = 0;
    totalPagesInternationalShipping: number = 0;

    constructor(private legalEntityService: LegalEntityService, private authService: AuthService,
        private alertService: AlertService, private activeModal: NgbActiveModal, private modalService: NgbModal, private configurations: ConfigurationService,
        private commonService: CommonService,
    ) { }

    ngOnInit() {

        if (this.editMode) {

            this.id = this.editGeneralInformationData.legalEntityId;
            this.legalEntityCode = this.editGeneralInformationData.legalEntityCode;
            this.legalEntityName = this.editGeneralInformationData.name;
            this.getDomesticShippingBylegalEntityId();
            this.getInternationalShippingBylegalEntityId();
            this.isViewMode = false;

        } else {

            if (this.legalEntityDataFromExternalComponents) {
                this.id = this.legalEntityDataFromExternalComponents.legalEntityId;
                this.legalEntityCode = this.legalEntityDataFromExternalComponents.legalEntityCode;
                this.legalEntityName = this.legalEntityDataFromExternalComponents.name;
                this.isViewMode = true;
            } else {
                this.id = this.savedGeneralInformationData.legalEntityId;
                this.legalEntityCode = this.savedGeneralInformationData.legalEntityCode;
                this.legalEntityName = this.savedGeneralInformationData.name;
                this.isViewMode = false;
            }

            this.getDomesticShippingBylegalEntityId();
            this.getInternationalShippingBylegalEntityId();
        }
    }

    ngOnChanges(changes: SimpleChanges) {

        for (let property in changes) {
            if (property == 'selectedlegalEntityTab') {
                if (changes[property].currentValue == "Shipping") {
                    this.getDomesticShippingBylegalEntityId()
                }
            }
            if (property == 'legalEntityDataFromExternalComponents') {

                if (changes[property].currentValue != {}) {
                    this.id = this.legalEntityDataFromExternalComponents.legalEntityId;
                    this.legalEntityCode = this.legalEntityDataFromExternalComponents.legalEntityCode;
                    this.legalEntityName = this.legalEntityDataFromExternalComponents.name;
                    this.isViewMode = true;
                    // this.getList();
                    this.getDomesticShippingBylegalEntityId();
                    this.getInternationalShippingBylegalEntityId();
                }
            }
        }

    }
    enableSave() {
        console.log('hello ,directive');
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
            legalEntityId: this.id
        }
        // create shipping 
        if (!this.isEditDomestic) {
            this.legalEntityService.newShippingAdd(data).subscribe(() => {
                this.shipViaDomestic = new legalEntityInternationalShipVia();
                this.alertService.showMessage(
                    'Success',
                    `Saved  Shipping Information Sucessfully `,
                    MessageSeverity.success
                );
                this.getDomesticShippingBylegalEntityId();
            })
        } else {
            // update shipping 
            this.legalEntityService.updateshippinginfo(data).subscribe(() => {
                this.shipViaDomestic = new legalEntityInternationalShipVia();
                this.alertService.showMessage(
                    'Success',
                    `Updated  Shipping Information Sucessfully `,
                    MessageSeverity.success
                );
                this.getDomesticShippingBylegalEntityId();
            })
        }

        $("#addShippingInfo").modal("hide");
        this.disableSave = true;

    }


    // get domestic shipping by legalEntity Id 
    getDomesticShippingBylegalEntityId() {
        this.legalEntityService.getlegalEntityShipAddressGet(this.id).subscribe(res => {
            console.log(res);

            this.domesticShippingData = res;
            if (res.length > 0) {
                this.totalRecords = this.domesticShippingData.length;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }
        })
    }
    // View Details  data
    openShippinggView(rowData) {
        this.sourceViewforShipping = rowData;
    }
    // edit Domestic details data 
    openEditDomestic(rowData) {

        console.log(rowData);
        this.isEditDomestic = true;
        this.domesticShippingInfo = rowData;
        this.domesticShippingInfo = { ...rowData, country: getObjectById('countries_id', rowData.country, this.countryListOriginal) };
    }
    addDomesticShipping() {
        this.isEditDomestic = false;
        this.domesticShippingInfo = new legalEntityShippingModel();
    }
    addInternationalShipping() {
        this.isEditInternational = false;
        this.internationalShippingInfo = new legalEntityInternationalShippingModel();
    }

    deleteDomesticShipping(content, rowData) {
        this.isDeleteMode = true;
        this.selectedRowForDelete = rowData;
        this.legalEntityShippingAddressId = rowData.legalEntityShippingAddressId

        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    deleteItemAndCloseModel() {
        const obj = {
            isActive: false,
            addressStatus: false,
            updatedBy: this.userName,
            legalEntityShippingAddressId: this.legalEntityShippingAddressId
        }

        if (this.legalEntityShippingAddressId > 0) {

            this.legalEntityService.updateStatusHipping(obj).subscribe(
                response => this.saveCompleted(this.sourcelegalEntity),
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
        this.getDomesticShippingBylegalEntityId();
    }
    private saveFailedHelper(error: any) {

        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }
    deleteInternationalShipping(content, rowData) {
        this.isDeleteMode = true;
        this.selectedRowForDeleteInter = rowData;
        this.internationalShippingId = rowData.internationalShippingId

        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    deleteItemAndCloseModel1() {

        if (this.internationalShippingId > 0) {

            this.legalEntityService.deleteInternationalShipping(this.internationalShippingId, this.userName).subscribe(
                response => this.saveCompleted1(this.sourcelegalEntity),
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
        this.getInternationalShippingBylegalEntityId();
    }
    private saveFailedHelper1(error: any) {

        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

    deleteShipVia(content, rowData) {
        this.isDeleteMode = true;
        this.selectedRowForDeleteVia = rowData;
        this.legalEntityShippingAddressId = rowData.legalEntityShippingAddressId;
        this.legalEntityShippingId = rowData.legalEntityShippingId

        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    deleteItemAndCloseModel2() {

        if (this.legalEntityShippingId > 0) {

            this.legalEntityService.deleteShipViaDetails(this.legalEntityShippingId, this.userName).subscribe(
                response => this.saveCompleted2(this.sourcelegalEntity),
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
        this.getShipViaByDomesticShippingId(this.legalEntityShippingAddressId)
    }
    private saveFailedHelper2(error: any) {

        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

    deleteInternationalShippingVia(content, rowData) {
        this.isDeleteMode = true;
        this.selectedRowForDeleteInterVia = rowData;
        this.shippingViaDetailsId = rowData.shippingViaDetailsId;
        this.getShipViaDataByInternationalShippingId();

        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    deleteItemAndCloseModel3() {

        if (this.shippingViaDetailsId > 0) {

            this.legalEntityService.deleteInternationalShipViaId(this.shippingViaDetailsId, this.userName).subscribe(
                response => this.saveCompleted3(this.sourcelegalEntity),
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

    dismissModel() {
        this.modal.close();
    }
    saveInternationalShipping() {
        const data = {
            ...this.internationalShippingInfo,
            shipToCountryId: getValueFromObjectByKey('countries_id', this.internationalShippingInfo.shipToCountryId),
            createdBy: this.userName,
            updatedBy: this.userName,
            masterCompanyId: 1,
            isActive: true,
            isDeleted: false,
            legalEntityId: this.id

        }
        if (!this.isEditInternational) {
            // save International SDhipping 
            this.legalEntityService.postInternationalShippingPost(data).subscribe((res) => {
                this.shipViaInternational = new legalEntityInternationalShipVia();
                this.getInternationalShippingBylegalEntityId()
                this.alertService.showMessage(
                    'Success',
                    `Saved International Shipping Information Sucessfully `,
                    MessageSeverity.success
                );
            })
        } else {
            // update international 
            this.legalEntityService.updateInternationalShipping(data).subscribe(res => {
                this.shipViaInternational = new legalEntityInternationalShipVia();
                this.getInternationalShippingBylegalEntityId()
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

    getInternationalShippingBylegalEntityId() {
        this.legalEntityService.getInternationalShippingBylegalEntityId(this.id, this.pageIndexForInternational, this.pageSizeForInternational).subscribe(res => {
            console.log(res);
            this.internationalShippingData = res.paginationList;
            this.totalRecordsForInternationalShipping = res.totalRecordsCount;
            if (this.internationalShippingData.length > 0) {
                this.totalRecordsInternationalShipping = this.internationalShippingData.length;
                this.totalPagesInternationalShipping = Math.ceil(this.totalRecordsInternationalShipping / this.pageSize);
            }
        })
    }


    getPageCount(totalNoofRecords, pageSize) {
        return Math.ceil(totalNoofRecords / pageSize)
    }


    internationalShippingPagination(event: { first: any; rows: number }) {
        const pageIndex = parseInt(event.first) / event.rows;
        this.pageIndexForInternational = pageIndex;
        this.pageSizeForInternational = event.rows;
        this.getInternationalShippingBylegalEntityId();
    }

    async updateActiveorInActiveForIS(rowData) {
        console.log(rowData);

        await this.legalEntityService.updateStatusForInternationalShippings(rowData.internationalShippingId, rowData.isActive, this.userName).subscribe(res => {

            this.getInternationalShippingBylegalEntityId();
            this.alertService.showMessage(
                'Success',
                `Sucessfully Updated  International Shipping Status`,
                MessageSeverity.success
            );
        })
    }
    async  updateActiveorInActiveShipViaForIS(rowData) {
        console.log(rowData);

        await this.legalEntityService.updateStatusForInternationalShippingsVia(rowData.shippingViaDetailsId, rowData.isActive, this.userName).subscribe(res => {
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
        await this.legalEntityService.Shippingdetailsviastatus(rowData.legalEntityShippingId, rowData.isActive, this.userName).subscribe(res => {
            this.getShipViaByDomesticShippingId(rowData.legalEntityShippingAddressId)
            this.alertService.showMessage(
                'Success',
                `Sucessfully Updated   Shipping Via Status`,
                MessageSeverity.success
            );
        })
    }
    openInterShippingView(rowData) {
        this.sourceViewforInterShipping = rowData;
    }
    openInterShippingViewVia(rowData) {
        this.sourceViewforInterShippingVia = rowData;
    }
    openDomesticShippingViewVia(rowData) {
        this.sourceViewforDomesticShippingVia = rowData;
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

        await this.legalEntityService.getInternationalShippingById(rowData.internationalShippingId).subscribe(res => {
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
        this.getShipViaByDomesticShippingId(rowData.legalEntityShippingAddressId)

    }
    closeInternationalModal() {
        this.isEditInternational = false;
        this.internationalShippingInfo = new legalEntityInternationalShippingModel()
    }
    
    async saveshipViaInternational() {
        const data = {
            ...this.shipViaInternational,
            internationalShippingId: this.selectedShipViaInternational.internationalShippingId,
            legalEntityId: this.id,
            masterCompanyId: 1,
            createdBy: this.userName,
            updatedBy: this.userName,

        }
        if (!this.isEditInternationalShipVia) {
            await this.legalEntityService.postInternationalShipVia(data).subscribe(res => {
                this.getShipViaDataByInternationalShippingId();

                this.shipViaInternational = new legalEntityInternationalShipVia()
                this.alertService.showMessage(
                    'Success',
                    `Sucessfully Added Ship via for InternationalShipping`,
                    MessageSeverity.success
                );
            })
        } else {
            await this.legalEntityService.updateShipViaInternational(data).subscribe(res => {
                this.getShipViaDataByInternationalShippingId();
                this.isEditInternationalShipVia = false;

                this.shipViaInternational = new legalEntityInternationalShipVia()
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
            legalEntityShippingAddressId: this.selectedShipViaDomestic.legalEntityShippingAddressId,
            legalEntityId: this.id,
            masterCompanyId: 1,
            createdBy: this.userName,
            updatedBy: this.userName,

        }
        if (!this.isEditDomesticShipVia) {
            await this.legalEntityService.newShippingViaAdd(data).subscribe(res => {
                this.getShipViaByDomesticShippingId(this.selectedShipViaDomestic.legalEntityShippingAddressId)

                this.shipViaDomestic = new legalEntityInternationalShipVia()
                this.alertService.showMessage(
                    'Success',
                    `Sucessfully Added Ship via for Shipping`,
                    MessageSeverity.success
                );
            })
        } else {

            await this.legalEntityService.updateshippingViainfo(data).subscribe(res => {
                this.getShipViaByDomesticShippingId(this.selectedShipViaDomestic.legalEntityShippingAddressId)
                this.isEditDomesticShipVia = false;

                this.shipViaDomestic = new legalEntityInternationalShipVia()
                this.alertService.showMessage(
                    'Success',
                    `Sucessfully Updated Ship via for Shipping`,
                    MessageSeverity.success
                );
            })
        }
    }

    getShipViaByDomesticShippingId(legalEntityShippingAddressId) {
        this.legalEntityService.getShipViaByDomesticShippingId(legalEntityShippingAddressId).subscribe(res => {
            this.demosticShippingViaData = res;
            if (this.demosticShippingViaData.length > 0) {
                this.totalRecordsShipVia = this.demosticShippingViaData.length;
                this.totalPagesShipVia = Math.ceil(this.totalRecords / this.pageSize);
            }
        })
    }

    getShipViaDataByInternationalShippingId() {
        this.legalEntityService.getInternationalShipViaByInternationalShippingId(this.selectedShipViaInternational.internationalShippingId

        ).subscribe(res => {
            this.internationalShippingViaData = res;
            if (this.internationalShippingViaData.length > 0) {
                this.interTotalRecords = this.internationalShippingViaData.length;
                this.interTotalPages = Math.ceil(this.interTotalRecords / this.pageSize);
            }
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
        this.shipViaInternational = new legalEntityInternationalShipVia();
    }
    resetShipViaDomestic() {
        this.shipViaDomestic = new legalEntityInternationalShipVia();
    }

    nextClick() {
        this.tab.emit('Sales');
        this.alertService.showMessage(
            'Success',
            ` ${this.editMode ? 'Updated' : 'Saved'} legalEntity Shipping Information Sucessfully `,
            MessageSeverity.success
        );
    }
    backClick() {
        this.tab.emit('Billing');
    }


    async updateActiveorInActiveForShipping(rowData) {

        console.log(rowData);

        await this.legalEntityService.updateStatusForShippingDetails(rowData.legalEntityShippingAddressId, rowData.isActive, this.userName).subscribe(res => {
            this.getDomesticShippingBylegalEntityId();
            this.alertService.showMessage(
                'Success',
                `Sucessfully Updated   Shipping Status`,
                MessageSeverity.success
            );
        })
    }
    openShipaddressHistory(content, row) {
        const { legalEntityShippingAddressId } = row;
        this.alertService.startLoadingMessage();

        this.legalEntityService.getlegalEntityShippingHistory(this.id, legalEntityShippingAddressId).subscribe(
            results => this.onAuditHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));
    }
    private onAuditHistoryLoadSuccessful(auditHistory, content) {
        this.alertService.stopLoadingMessage();


        this.shippingauditHisory = auditHistory;

        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
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

        this.legalEntityService.getlegalEntityInterShippingHistory(this.id, internationalShippingId).subscribe(
            results => this.onInterAuditHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));
    }
    private onInterAuditHistoryLoadSuccessful(auditHistory, content) {
        this.alertService.stopLoadingMessage();


        this.interShippingauditHisory = auditHistory;

        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
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

        this.legalEntityService.getlegalEntityShipViaHistory(this.id, rowData.legalEntityShippingAddressId, rowData.legalEntityShippingId).subscribe(
            results => this.onAuditShipViaHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));
    }
    private onAuditShipViaHistoryLoadSuccessful(auditHistory, content) {
        this.alertService.stopLoadingMessage();


        this.shippingViaauditHisory = auditHistory;

        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
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
        this.legalEntityService.getlegalEntityInterShipViaHistory(this.id, rowData.internationalShippingId, rowData.shippingViaDetailsId).subscribe(
            results => this.onAuditInterShipViaHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));
    }
    private onAuditInterShipViaHistoryLoadSuccessful(auditHistory, content) {
        this.alertService.stopLoadingMessage();


        this.intershippingViaauditHisory = auditHistory;

        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
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
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=legalEntityShippingAddress&fileName=legalEntityShippingAddress.xlsx`;
        window.location.assign(url);
    }
    customShippingExcelUpload(event) {
        const file = event.target.files;
        console.log(file);
        if (file.length > 0) {
            this.formData.append('file', file[0])
            this.legalEntityService.ShippingFileUpload(this.formData, this.id).subscribe(res => {
                event.target.value = '';
                this.formData = new FormData();
                this.getDomesticShippingBylegalEntityId();
                this.alertService.showMessage(
                    'Success',
                    `Successfully Uploaded  `,
                    MessageSeverity.success
                );
            })
        }
    }

    sampleExcelDownloadForInternationalShipping() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=legalEntityInternationalShipping&fileName=legalEntityInternationalShipping.xlsx`;
        window.location.assign(url);
    }
    customInternationalShippingExcelUpload(event) {
        const file = event.target.files;
        console.log(file);
        if (file.length > 0) {
            this.formData.append('file', file[0])
            this.legalEntityService.InternationalShippingUpload(this.formData, this.id).subscribe(res => {
                event.target.value = '';
                this.formData = new FormData();
                this.getInternationalShippingBylegalEntityId();
                this.alertService.showMessage(
                    'Success',
                    `Successfully Uploaded  `,
                    MessageSeverity.success
                );
            })
        }
    }
}






