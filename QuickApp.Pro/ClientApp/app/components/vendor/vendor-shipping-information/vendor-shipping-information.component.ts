import { Component, ViewChild, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { fadeInOut } from '../../../services/animations';
import { MasterCompany } from '../../../models/mastercompany.model';
import { AuditHistory } from '../../../models/audithistory.model';
import { AuthService } from '../../../services/auth.service';
import { MessageSeverity, AlertService } from '../../../services/alert.service';
import { VendorService } from '../../../services/vendor.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { Vendor } from '../../../models/vendor.model';
import { debounce } from 'rxjs/operators/debounce';
import { HttpClient } from '@angular/common/http';
import { GMapModule } from 'primeng/gmap';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { editValueAssignByCondition, getObjectById, getValueFromObjectByKey } from '../../../generic/autocomplete';
import { VendorStepsPrimeNgComponent } from '../vendor-steps-prime-ng/vendor-steps-prime-ng.component';
import { ConfigurationService } from '../../../services/configuration.service';
import { ModalService } from '../../../services/Index';
import { CustomerInternationalShippingModel } from '../../../models/customer-internationalshipping.model';
declare const google: any;
@Component({
    selector: 'app-vendor-shipping-information',
    templateUrl: './vendor-shipping-information.component.html',
    styleUrls: ['./vendor-shipping-information.component.scss'],
    animations: [fadeInOut]
})
/** VendorShippingInformation component*/
export class VendorShippingInformationComponent {
    // @ViewChild('contentShipVia') shipviapoup : ModalService;
    modelValue: boolean;
    display: boolean;
    activeIndex: number;
    public overlays: any[];
    // options: any;
    shipViaCollection: any;
    shipviaIntercollection: any;
    allShipViaDetails: any[];
    allShipViaInterDetails: any = [];
    updatedCollection: {};
    vendorshippingAddressdetails: any;
    local: any;
    addressId: any;
    allAddresses: any[];
    // vendorId: any;
    vendorCode: any;
    vendorname: any;
    allgeneralInfo: any[];
    action_name: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createddate: any = "";
    updatedDate: any = "";
    shipViaObj: any = {};
    shipViaInterObj: any = {};
    checkAddress: boolean = false;
    viewName: string = "Create";
    siteName: any;
    address1: any;
    address2: any;
    // address3: any;
    city: any;
    stateOrProvince: any;
    postalCode: number;
    country: any;
    selectedShipVia: any;
    shipviacollection: any[];
    shippingauditHisory: any[];
    isPrimary: boolean = false;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    filteredBrands: any[];
    displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<any>;
    allActions: any[] = [];
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    public sourceAction: any = [];
    public auditHisory: AuditHistory[] = [];
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    selectedColumn: any[];
    selectedInterColumn: any[];
    //selectedColumns: any[];
    selectedShipViaColumn: any[];
    selectedShipViaColumns: any[];
    cols: any[] = [
        { field: 'siteName', header: 'Site Name' },
        { field: 'address1', header: 'Address1' },
        { field: 'address2', header: 'Address2' },
        { field: 'city', header: 'City' },
        { field: 'stateOrProvince', header: 'State/Prov' },
        { field: 'postalCode', header: 'Postal Code' },
        { field: 'countryName', header: 'Country' },
        { field: 'isPrimary', header: 'IsPrimary' }
    ];
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
    selectedInternationalColumns = this.internationalShippingHeaders;
    selectedColumns: any[] = this.cols;
    shipViacols: any[];
    shipViaColumns: any[];
    title: string = "Create";
    id: number;
    errorMessage: any;
    modal: NgbModalRef;
    actionName: string;
    Active: string = "Active";
    length: number;
    localCollection: any;
    allCountryinfo: any[];
    disablesave: boolean;
    countrycollection: any;
    selectedCountries: any;
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    isEditShippingInfo: boolean = false;
    selectedRowforDelete: any;
    selectedInterRowforDelete: any = {};
    selectedInterShipViaRowforDelete: any = {};
    auditHistory: any = [];
    formData = new FormData();
    totalRecords: number = 0;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number = 0;
    public sourceVendor: any = {};
    @Input() vendorId: number = 0;
    @Input() isViewMode: boolean = false;
    isvendorEditMode: any;
    internationalShippingData: any = [];
    internationalShippingInfo = new CustomerInternationalShippingModel()
    isEditInternational: any;
    shipViaInternational: any;
    sourceViewforInterShipping: any;
    intershippingViaauditHisory: any;
    shipViaIntercols = [
        { field: 'shipVia', header: 'Ship Via' },
        { field: 'shippingAccountInfo', header: 'Shipping Account Info' },
        // { field: 'shippingURL', header: 'Shipping Url' },
        // { field: 'shippingId', header: 'Shipping Id' },
        { field: 'memo', header: 'Memo' }
    ];
    selectedShipViaInterColumns: any = [];
    auditHistoryInterShipvia: any = [];
    isEditInterShipVia: boolean = false;
    isEditDomesticShipVia: boolean = false;
    interShippingViaView: any = {};
    domesticShippingViaView: any = {};
    pageSizeForInt : number = 10;
    pageSizeForDomestic: number = 10;
    pageSizeForShipViaDomestic: number = 10;
    pageSizeForShipViaInt: number = 10;
    loaderForDomesticShipping: boolean;
    loaderForDomesticShipVia: boolean;
    loaderForInterShipping: boolean;
    loaderForInterShipVia: boolean;

    constructor(private http: HttpClient, private router: Router,
        private authService: AuthService, private modalService: NgbModal, private configurations: ConfigurationService, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public vendorService: VendorService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        if (this.vendorService.listCollection !== undefined) {
            this.vendorService.isEditMode = true;
        }
        this.dataSource = new MatTableDataSource();
        if (this.local) {
            this.vendorService.contactCollection = this.local;
        }
        if (this.vendorService.generalCollection) {
            this.local = this.vendorService.generalCollection;
        }
        if (this.vendorService.paymentCollection) {
            this.local = this.vendorService.paymentCollection;
        }
        this.dataSource = new MatTableDataSource();
        if (this.vendorService.listCollection && this.vendorService.isEditMode == true) {
            this.local = this.vendorService.listCollection.t;
        }
        if (this.vendorService.paymentCollection) {
            this.local = this.vendorService.paymentCollection;
            this.sourceVendor.siteName = this.local.vendorName;
            this.sourceVendor.address1 = this.local.address1;
            this.sourceVendor.address2 = this.local.address2;
            // this.sourceVendor.address3 = this.local.address3;
            this.sourceVendor.city = this.local.city;
            this.sourceVendor.country = this.local.country;
            this.sourceVendor.stateOrProvince = this.local.stateOrProvince;
            this.sourceVendor.postalCode = this.local.PostalCode;
        }
        if (this.vendorService.listCollection && this.vendorService.isEditMode == true) {
            this.viewName = "Edit";
            this.local = this.vendorService.listCollection;
            this.loadData();
        }
    }

    ngOnInit() {
        this.vendorService.currentEditModeStatus.subscribe(message => {
            this.isvendorEditMode = message;
        });
        if (this.local) {
            this.loadData();
        }
        this.countrylist();
        if (this.vendorId != 0) {
            this.loadData();
        } else {
            this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-shipping-information';
            this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);
        }
        this.getInternationalShippingByVendorId();
        // this.selectedShipViaInterColumns = this.shipViaIntercols;
        // this.options = {
        //     center: { lat: 36.890257, lng: 30.707417 },
        //     zoom: 12
        // };
    }

    // ngAfterViewInit() {
    // }
    // getlatlng(address) {
    //     this.checkAddress = true;
    //     return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB_W96L25HhFWgqLblcikircQKjU6bgTgk').subscribe((data: any) => {
    //         this.options = {
    //             center: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng },
    //             zoom: 12
    //         };
    //         this.overlays = [
    //             new google.maps.Marker({ position: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }, title: "Konyaalti" }),
    //         ];
    //         return data;
    //     });
    // }

    private getgeneralInnfo() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.vendorService.getWorkFlows().subscribe(
            results => this.ongeneralDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private ongeneralDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allgeneralInfo = allWorkFlows;
        if (this.vendorService.isCOntact == true) {
            this.vendorname = this.allgeneralInfo[0].vendorName;
            this.vendorCode = this.allgeneralInfo[0].vendorCode;
        }
        //this.vendorId = this.allgeneralInfo[0].vendorId;
        console.log(this.allgeneralInfo);
    }
    private loadAddressDara() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.vendorService.getAddressDtails().subscribe(
            results => this.onAddressDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private onAddressDataLoadSuccessful(alladdress: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = alladdress;
        this.allAddresses = alladdress;
        this.addressId = this.allAddresses[0].addressId;
    }
    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.loaderForDomesticShipping = true;
        const vendorId = this.vendorId != 0 ? this.vendorId : this.local.vendorId;
        this.vendorService.getVendorShipAddressGet(vendorId).subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private countrylist() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.vendorService.getCountrylist().subscribe(
            results => this.onDatacountrySuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onDatacountrySuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allCountryinfo = allWorkFlows;
    }

    private loadShipViaCollection(rowData) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.loaderForDomesticShipVia = true;
        this.vendorService.getVendorShipViaDetails(rowData).subscribe(
            results => this.onShipViadetails(results[0]),
            error => this.onDataLoadFailed(error)
        );
        this.shipViacols = [
            { field: 'shipVia', header: 'Ship Via' },
            { field: 'shippingAccountinfo', header: 'Shipping Account Info' },
            // { field: 'shippingURL', header: 'Shipping Url' },
            // { field: 'shippingId', header: 'Shipping Id' },
            { field: 'memo', header: 'Memo' }
        ];
        this.selectedShipViaColumns = this.shipViacols;
    }
    openShipViaEdit(rowObject) {
        this.isEditMode = true;
        this.isSaving = true;
        this.shipViaObj = {...rowObject};
        this.isEditDomesticShipVia = true;
        this.loadMasterCompanies();
    }
    private loadMasterCompanies() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.masterComapnyService.getMasterCompanies().subscribe(
            results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }
    openClassification(content) {
    }

    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue;
    }
    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceVendor = rowData;
        }
        else {
            this.sourceVendor = rowData;
        }

    }

    private refresh() {
        // Causes the filter to refresh there by updating with recently added data.
        this.applyFilter(this.dataSource.filter);
    }
    private onDataLoadSuccessful(allWorkFlows: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allActions = allWorkFlows;
        this.loaderForDomesticShipping = false;
    }
    private onShipViadetails(allWorkFlows: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allShipViaDetails = allWorkFlows;
        this.loaderForDomesticShipVia = false;
    }

    filterActions(event) {
        this.localCollection = [];
        for (let i = 0; i < this.allActions.length; i++) {
            let actionName = this.allActions[i].description;
            if (actionName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.localCollection.push(actionName);
            }
        }
    }

    private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.auditHisory = auditHistory;
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    private onAuditHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.shippingauditHisory = auditHistory;

        // this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        // this.modal.result.then(() => {
        //     console.log('When user closes');
        // }, () => { console.log('Backdrop click') })
    }
    private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allComapnies = allComapnies;
    }

    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.loaderForDomesticShipping = false;
        this.loaderForDomesticShipVia = false;
    }

    open(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.actionName = "";
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openDelete(content, row) {
        if(!row.isPrimary){

        this.isEditMode = false;
        this.isDeleteMode = true;
        //this.sourceVendor = row;
        this.localCollection = row;
        this.selectedRowforDelete = row;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    } else {
        $('#deleteshipping').modal('show');
    }
    }

    openEdit(row) {
        this.isEditMode = true;
        this.isSaving = true;
        this.sourceVendor = { ...row, country: getObjectById('countries_id', row.country, this.allCountryinfo) };
        this.loadMasterCompanies();
        this.isEditShippingInfo = true;
    }
    openView(content, row) {
        this.sourceVendor = row;
        this.isPrimary = row.isPrimary;
        this.siteName = row.siteName;
        this.address1 = row.address1;
        this.city = row.city;
        this.stateOrProvince = row.stateOrProvince;
        this.postalCode = row.postalCode;
        this.country = row.countryName;
        this.address2 = row.address2;
        // this.address3 = row.address3;
        this.createdBy = row.createdBy;
        this.updatedBy = row.updatedBy;
        this.createddate = row.createdDate;
        this.updatedDate = row.updatedDate;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openHelpText(content) {
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openHist(content, row) {

        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.shipViaObj = {};
        this.isSaving = true;
        this.vendorService.shipviaHistory(row.vendorShippingId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));
    }
    openShipaddressHistory(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.sourceVendor = row;
        this.isSaving = true;
        this.vendorService.getShipaddressHistory(this.sourceVendor.vendorId, this.sourceVendor.vendorShippingAddressId).subscribe(
            results => this.onAuditHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));


    }

    editItemAndCloseModel() {
        this.isSaving = true;
        // if (!(this.sourceVendor.siteName && this.sourceVendor.address1 && this.sourceVendor.city &&
        //     this.sourceVendor.stateOrProvince && this.sourceVendor.postalCode && this.sourceVendor.country
        // )) {
        //     this.display = true;
        //     this.modelValue = true;
        // }
        if (this.sourceVendor.siteName && this.sourceVendor.address1 && this.sourceVendor.city &&
            this.sourceVendor.stateOrProvince && this.sourceVendor.postalCode && this.sourceVendor.country) {
            if (!this.sourceVendor.vendorId) {
                this.sourceVendor.createdBy = this.userName;
                this.sourceVendor.updatedBy = this.userName;
                this.sourceVendor.masterCompanyId = 1;
                this.sourceVendor.vendorId = this.local.vendorId;
                this.sourceVendor.country = editValueAssignByCondition('countries_id', this.sourceVendor.country);
                this.vendorService.newShippingAdd(this.sourceVendor).subscribe(data => {
                    this.localCollection = data;
                    this.loadData();
                    this.savesuccessCompleted(this.sourceVendor);
                    this.sourceVendor = {};
                })
            }
            else {
                this.sourceVendor.isActive = true;
                this.sourceVendor.createdBy = this.userName;
                this.sourceVendor.updatedBy = this.userName;
                this.sourceVendor.country = editValueAssignByCondition('countries_id', this.sourceVendor.country);
                this.sourceVendor.masterCompanyId = 1;
                this.vendorService.updateshippinginfo(this.sourceVendor).subscribe(data => {
                    this.updatedCollection = data;
                    this.loadData();
                    this.sourceVendor = {};
                    this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
                })
            }

        }

        $('#addShippingInfo').modal('hide');
    }
    saveVendorShipViaDetails() {
        this.isSaving = true;
        if (this.shipViaObj.shipVia == null || this.shipViaObj.shipVia == "") {
            this.alertService.showMessage("Empty", 'Cannot Submit Empty', MessageSeverity.warn);
            return;
        }

        if (this.shipViaObj.vendorShippingId > 0) {
            this.shipViaObj.createdBy = this.userName;
            this.shipViaObj.updatedBy = this.userName;
            this.shipViaObj.masterCompanyId = 1;
            this.shipViaObj.isActive = true;

            this.vendorService.updateshippingViainfo(this.shipViaObj).subscribe(data => {
                this.shipViaCollection = data;
                this.loadShipViaCollection(this.shipViaCollection);
                if (this.shipViaCollection) {
                    this.shipViaObj.shipVia = "";
                    this.shipViaObj.shippingAccountinfo = "";
                    this.shipViaObj.shippingURL = "";
                    this.shipViaObj.shippingId = "";
                    this.shipViaObj.memo = "";
                    this.shipViaObj.vendorShippingId = 0;
                }
                this.isEditDomesticShipVia = false;
            })
        }
        else {
            this.shipViaObj.createdBy = this.userName;
            this.shipViaObj.updatedBy = this.userName;
            this.shipViaObj.masterCompanyId = 1;
            this.shipViaObj.isActive = true;

            this.vendorService.newShippingViaAdd(this.shipViaObj).subscribe(data => {
                this.shipViaCollection = data;
                this.loadShipViaCollection(this.shipViaCollection);
                if (this.shipViaCollection) {
                    this.shipViaObj.shipVia = "";
                    this.shipViaObj.shippingAccountinfo = "";
                    this.shipViaObj.shippingURL = "";
                    this.shipViaObj.shippingId = "";
                    this.shipViaObj.memo = "";
                    this.shipViaObj.vendorShippingId = 0;
                }
                this.isEditDomesticShipVia = false;
            })
        }

    }

    previousClick() {
        this.activeIndex = 6;
        this.vendorService.changeofTab(this.activeIndex);
        // this.vendorService.indexObj.next(this.activeIndex);
        // this.vendorService.changeStep('Payment Information');
        // this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-payment-information');
    } 
    openShipVia(rowData) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.shipViaObj = rowData;
        this.shipViaObj.shipVia = "";
        this.shipViaObj.shippingAccountinfo = "";
        this.shipViaObj.shippingURL = "";
        this.shipViaObj.shippingId = "";
        this.shipViaObj.memo = "";
        this.isSaving = true;
        this.loadShipViaCollection(rowData);
        this.loadMasterCompanies();
        this.sourceAction.isActive = true;
        // this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        // this.modal.result.then(() => {
        //     console.log('When user closes');
        // }, () => { console.log('Backdrop click') })
    }

    updateVendorShippingAddress(updateObj: any) {

        this.vendorService.updateVendorShippingAddressDetails(updateObj, this.local.vendorId).subscribe(data => {
            this.vendorshippingAddressdetails = data;
            this.vendorService.newShippingAddWithAddress(this.sourceVendor, this.vendorshippingAddressdetails.vendorShippingAddressId).subscribe(data => {
                this.localCollection = data;
                this.updateVendorShippingAddress(this.localCollection);
            })
            this.loadData();
        })
    }

    // deleteItemAndCloseModel(vendorShippingAddressId) {
    //     if(!row.isPrimary){
            
    //         this.isSaving = true;
    //         this.sourceVendor.isActive = false;
    //         this.sourceVendor.addressStatus = false;
    //         this.sourceVendor.updatedBy = this.userName;
    //         this.sourceVendor.vendorShippingAddressId = vendorShippingAddressId;
    //         this.vendorService.deleteAcion(this.sourceVendor).subscribe(
    //             response => this.saveCompleted(this.sourceVendor),
    //             error => this.saveFailedHelper(error));
    //     } else {
    //                $('#deleteshipping').modal('show');
    //            }
    // }

    deleteVendorShippingAddress() {
        this.isSaving = true;
        this.localCollection.isActive = false;
        this.localCollection.addressStatus = false;
        this.localCollection.updatedBy = this.userName;
        //this.sourceVendor.vendorShippingAddressId = vendorShippingAddressId;
        this.vendorService.deleteVendorShippingAddress(this.localCollection).subscribe(
            response => this.saveCompleted(this.sourceVendor),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    deleteItemShippingCloseModel() {

        this.isSaving = true;

        this.localCollection.isActive = false;
        this.localCollection.addressStatus = false;
        this.localCollection.updatedBy = this.userName;
        // this.shipViaObj=this.localCollection;
        // this.shipViaObj.isActive = true;
        // this.shipViaObj.updatedBy = this.userName;        
        //this.shipViaObj.vendorShippingId = vendorShippingId;

        this.vendorService.deleteVendorAcion(this.localCollection).subscribe(data => {
            this.loadShipViaCollection(this.localCollection);
        })

        // this.vendorService.deleteVendorAcion(this.localCollection).subscribe(
        // response => this.saveCompleted(this.sourceVendor),
        // error => this.saveFailedHelper(error));
        //this.loadShipViaCollection(this.localCollection);
        this.modal.close();
    }
    dismissShipViaDomesticModel() {
        // this.isDeleteMode = false;
        // this.isEditMode = false;
        // this.modal.close();
        $('#contentShipVia').modal('hide');
    }    
    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;

        this.modal.close();

    }
    private saveCompleted(user?: any) {
        this.isSaving = false;
        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
        }
        this.loadData();
    }
    private savesuccessCompleted(user?: any) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was added successfully`, MessageSeverity.success);
        this.loadData();
    }

    private saveSuccessHelper(role?: any) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

        this.loadData();
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    toggledbldisplay(data) {
        this.sourceVendor = data;
    }
    nextClick() {
        if (this.local) {
            this.vendorService.shippingCollection = this.local;
        }
        this.activeIndex = 8;
        this.vendorService.changeofTab(this.activeIndex);
        this.alertService.showMessage(
            'Success',
            `${this.isvendorEditMode ? 'Updated' : 'Saved'}  Shipping Information Sucessfully `,
            MessageSeverity.success
        );

        // this.vendorService.indexObj.next(this.activeIndex);
        // this.vendorService.changeStep('Billing Information');
        // this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-billing-information');
    }
    handleChanges(rowData, e) {
        if (e.checked == false) {
            this.sourceVendor = rowData;
            this.sourceVendor.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceVendor.isActive == false;
            this.vendorService.updateActionforActiveforshipping(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
            this.sourceVendor = "";
        }
        else {
            this.sourceVendor = rowData;
            this.sourceVendor.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceVendor.isActive == true;
            this.vendorService.updateActionforActiveforshipping(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
            this.sourceVendor = "";
        }

    }
    onCountrieselected(event) {
        if (this.allCountryinfo) {
            for (let i = 0; i < this.allCountryinfo.length; i++) {
                if (event == this.allCountryinfo[i].nice_name) {
                    this.sourceVendor.nice_name = this.allCountryinfo[i].nice_name;
                    this.disablesave = false;
                    this.selectedCountries = event;
                }
            }
        }
    }
    eventCountryHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedCountries) {
                if (value == this.selectedCountries.toLowerCase()) {
                    this.disablesave = false;
                }
                else {
                    this.disablesave = true;
                }
            }

        }
    }
    filtercountry(event) {
        //this.countrycollection = [];
        // if (this.allCountryinfo) {
        //     for (let i = 0; i < this.allCountryinfo.length; i++) {
        //         let countryName = this.allCountryinfo[i].nice_name;
        //         if (countryName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        //             this.countrycollection.push(countryName);
        //         }
        //     }
        // }
        this.countrycollection = this.allCountryinfo;
        if (event.query !== undefined && event.query !== null) {
            const countries = [...this.allCountryinfo.filter(x => {
                return x.nice_name.toLowerCase().includes(event.query.toLowerCase())
            })]
            this.countrycollection = countries;
        }
    }
    onShipVia(event) {
        if (this.allShipViaDetails) {
            for (let i = 0; i < this.allShipViaDetails.length; i++) {
                if (event == this.allShipViaDetails[i].shipVia) {
                    this.shipViaObj.shipVia = this.allShipViaDetails[i].shipVia;
                    this.selectedShipVia = event;
                }
            }
        }
    }

    eventShipviaHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedShipVia) {
                if (value == this.selectedShipVia.toLowerCase()) {
                    this.disablesave = true;
                }
                else {
                    this.disablesave = false;
                }
            }

        }
    }
    filterShipVia(event) {
        this.shipviacollection = [];
        if (this.allShipViaDetails.length > 0) {
            for (let i = 0; i < this.allShipViaDetails.length; i++) {
                let shipName = this.allShipViaDetails[i].shipVia;
                if (shipName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.shipviacollection.push(shipName);
                }
            }
        }
    }

    shippingInfoHistory(rowData) {
        const data = rowData;
        this.vendorService.getShipaddressHistory(data.vendorId, data.vendorShippingAddressId).subscribe(res => {
            this.auditHistory = res;
        })
    }
    closeAddShipViaDomestic() {
        console.log('Sample');
        // this.shipviapoup.hide();
        // $("#contentShipVia").modal("hide");
        this.modal.close();
    }

    getColorCodeForHistory(i, field, value) {
        const data = this.auditHistory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }

    onAddShippingInfo() {
        this.sourceVendor = {};
        this.internationalShippingInfo = new CustomerInternationalShippingModel();
        this.isEditShippingInfo = false;
    }

    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=VendorShipingAddress&fileName=VendorShippingAddress.xlsx`;
        window.location.assign(url);
    }

    customExcelUpload(event) {
        const file = event.target.files;

        if (file.length > 0) {
            this.formData.append('file', file[0])
            this.vendorService.ShippingFileUpload(this.formData, this.local.vendorId).subscribe(res => {
                event.target.value = '';

                this.formData = new FormData();
                this.loadData();

                this.alertService.showMessage(
                    'Success',
                    `Successfully Uploaded  `,
                    MessageSeverity.success
                );
            })
        }
    }

    getVendorName() {


        if (this.local !== undefined) {
            return editValueAssignByCondition('vendorName', this.local.vendorName) === undefined ? '' : editValueAssignByCondition('vendorName', this.local.vendorName);
        } else {
            return '';
        }
    }
    getPageCount(totalNoofRecords, pageSize) {
        return Math.ceil(totalNoofRecords / pageSize)
    }
    getColorCodeForInterShipViaHistory(i, field, value) {
        const data = this.auditHisory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }
    getColorCodeForInternationalHistory(i, field, value) {
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





    saveInternationalShipping(){
        

        const data = {
            ...this.internationalShippingInfo,
            shipToCountryId: getValueFromObjectByKey('countries_id', this.internationalShippingInfo.shipToCountryId),
            createdBy: this.userName,
            updatedBy: this.userName,
            masterCompanyId: 1,
            isActive: true,
            isDeleted: false,
            vendorId: this.local.vendorId

        }
        if (!this.isEditInternational) {
            // save International SDhipping 
            this.vendorService.postInternationalShipping(data).subscribe((res) => {
                // this.shipViaInternational = new CustomerInternationalShipVia();
                this.getInternationalShippingByVendorId()
                this.alertService.showMessage(
                    'Success',
                    `Saved International Shipping Information Sucessfully `,
                    MessageSeverity.success
                );
            })
        } else {
            // update international 
            this.vendorService.updateInternationalShipping(data).subscribe(res => {
                // this.shipViaInternational = new CustomerInternationalShipVia();
                this.getInternationalShippingByVendorId()
                this.isEditInternational = false;
                this.alertService.showMessage(
                    'Success',
                    `Saved International Shipping Information Sucessfully `,
                    MessageSeverity.success
                );
            })

        }
    }


    getInternationalShippingByVendorId(){
        this.loaderForInterShipping = true;
        const vendorId = this.local.vendorId;
        this.vendorService.getInternationalShippingByVendorId(vendorId).subscribe(res => {
            this.internationalShippingData = res;
            this.loaderForInterShipping = false;
        },
        err => {
            this.loaderForInterShipping = false;
        })
    }
    closeInternationalModal(){
        $("viewInter").modal('hide');   
        this.isEditInternational = false;
    }

    openInternationalView(rowData){
        this.vendorService.getInternationalShippingById(rowData.vendorInternationalShippingId).subscribe(res => {
            this.sourceViewforInterShipping = {...res,
                startDate: new Date(res.startDate),
                expirationDate: new Date(res.expirationDate),
                createdDate: new Date(res.expirationDate),
                updatedDate: new Date(res.expirationDate),
                shipToCountryId: getObjectById('countries_id', res.shipToCountryId, this.allCountryinfo)
            };
            $("#viewInter").modal('show');
        }) 
    }
    getInternationalShippingById(rowData){
        this.isEditInternational = true;
        this.vendorService.getInternationalShippingById(rowData.vendorInternationalShippingId).subscribe(res => {
            this.internationalShippingInfo = {...res,
                startDate: new Date(res.startDate),
                expirationDate: new Date(res.expirationDate),
                createdDate: new Date(res.expirationDate),
                updatedDate: new Date(res.expirationDate),
                shipToCountryId: getObjectById('countries_id', res.shipToCountryId, this.allCountryinfo)
            };
        })
    }

     openInterShipHistory(rowData) {
        //const { customerShippingAddressId } = rowData.customerShippingAddressId;
        //const { customerShippingId } = rowData.customerShippingId;

        
        this.vendorService.getVendorInternationalAuditHistory(rowData.vendorInternationalShippingId).subscribe(
            results => this.onAuditInterShipViaHistoryLoadSuccessful(results),
            error => this.saveFailedHelper(error));
    }
    private onAuditInterShipViaHistoryLoadSuccessful(auditHistory) {
         this.intershippingViaauditHisory = auditHistory;
        // this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        // this.modal.result.then(() => {
        //     console.log('When user closes');
        // }, () => { console.log('Backdrop click') })
    }

    deleteVendorInterShipping(row) {
        if(!row.isPrimary){
       
        this.selectedInterRowforDelete = row;
        $('#deleteInterShipInfo').modal('show');
    } else {
        $('#deleteshipping').modal('show');
    }
    }

    confirmDeleteVendorInterShipping(){
        this.vendorService.deleteVendorInternationalShipping(this.selectedInterRowforDelete.vendorId , this.userName).subscribe(res => {
            this.getInternationalShippingByVendorId();
             this.alertService.showMessage(
                    'Success',
                    `Sucessfully Deleted Record`,
                    MessageSeverity.success
                );
        })
    }

    changeOfStatusForInternationalShipping(rowData){
        this.vendorService.updateStatusForInternationalShipping(rowData.vendorInternationalShippingId , rowData.status, this.userName).subscribe(res => {
            this.alertService.showMessage(
                'Success',
                `sucessfully Updated Status`,
                MessageSeverity.success
            );
        })
    }

    openDomesticShippingViewVia(rowData) {
        this.domesticShippingViaView = {};
        this.domesticShippingViaView = rowData;
    }

    openDomesticShipViaonDbl(rowData) {
        this.openDomesticShippingViewVia(rowData);
        $('#viewDomesticVia').modal('show');
    }

    dismissShipViaInterModel() {
        $('#internationalShipVia').modal('hide');
    }

    onClickInterShipvia(rowData) {
        console.log(rowData);        
        // this.selectedShipViaInterColumns = this.shipViaIntercols;
        this.shipViaInterObj = {};
        this.loadShipViaInterCollection(rowData);
    }

    filterInterShipVia(event) {
        this.shipviaIntercollection = [];
        if (this.allShipViaInterDetails.length > 0) {
            for (let i = 0; i < this.allShipViaInterDetails.length; i++) {
                let shipName = this.allShipViaInterDetails[i].shipVia;
                if (shipName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.shipviaIntercollection.push(shipName);
                }
            }
        }
    }

    onSelectInterShipVia(event) {
        if (this.allShipViaInterDetails) {
            for (let i = 0; i < this.allShipViaInterDetails.length; i++) {
                if (event == this.allShipViaInterDetails[i].shipVia) {
                    this.shipViaInterObj.shipVia = this.allShipViaInterDetails[i].shipVia;
                    this.selectedShipVia = event;
                }
            }
        }
    }

    saveInterShipViaDetails() {
        // this.isSaving = true;
        // if (this.shipViaInterObj.shipVia == null || this.shipViaInterObj.shipVia == "") {
        //     this.alertService.showMessage("Empty", 'Cannot Submit Empty', MessageSeverity.warn);
        //     return;
        // }

       // if (this.shipViaInterObj.vendorShippingId > 0) {
            this.shipViaInterObj.createdBy = this.userName;
            this.shipViaInterObj.updatedBy = this.userName;
            this.shipViaInterObj.masterCompanyId = 1;
            this.shipViaInterObj.isActive = true;

            this.vendorService.saveInterShipViaDetails(this.shipViaInterObj).subscribe(data => {
                this.shipviaIntercollection = data;
                this.loadShipViaInterCollection(this.shipviaIntercollection);
                if (this.shipviaIntercollection) {
                    this.shipViaInterObj.shipVia = "";
                    this.shipViaInterObj.shippingAccountInfo = "";
                    // this.shipViaInterObj.shippingURL = "";
                    // this.shipViaInterObj.shippingId = "";
                    this.shipViaInterObj.memo = "";
                    this.shipViaInterObj.vendorShippingId = 0;
                }
                if(this.isEditInterShipVia) {
                    this.alertService.showMessage(
                        'Success',
                        `Sucessfully Updated Ship Via for International Shipping`,
                        MessageSeverity.success
                    );
                } else {
                    this.alertService.showMessage(
                        'Success',
                        `Sucessfully Added Ship Via for International Shipping`,
                        MessageSeverity.success
                    );
                }
                this.isEditInterShipVia = false;
            })
        //}
        // else {
        //     this.shipViaInterObj.createdBy = this.userName;
        //     this.shipViaInterObj.updatedBy = this.userName;
        //     this.shipViaInterObj.masterCompanyId = 1;
        //     this.shipViaInterObj.isActive = true;

        //     this.vendorService.saveInterShipViaDetails(this.shipViaInterObj).subscribe(data => {
        //         this.shipviaIntercollection = data;
        //         this.loadShipViaInterCollection(this.shipviaIntercollection);
        //         if (this.shipviaIntercollection) {
        //             this.shipViaInterObj.shipVia = "";
        //             this.shipViaInterObj.shippingAccountinfo = "";
        //             this.shipViaInterObj.shippingURL = "";
        //             this.shipViaInterObj.shippingId = "";
        //             this.shipViaInterObj.memo = "";
        //             this.shipViaInterObj.vendorShippingId = 0;
        //         }
        //     })
        // }
    }

    loadShipViaInterCollection(rowData) {
        // this.selectedShipViaInterColumns = this.shipViaIntercols;
        this.loaderForInterShipVia = true;
        this.vendorService.getVendorShipViaInterDetails(rowData.vendorInternationalShippingId).subscribe(res => {
            this.allShipViaInterDetails = res[0];
            this.loaderForInterShipVia = false;
        },
        err => {
            this.loaderForInterShipVia = false;
        });
    }

    openShipViaInterEdit(rowObject) {
        this.shipViaInterObj = {...rowObject};
        this.isEditInterShipVia = true;
    }

    delShipViaInter(row) {
        if(!row.isPrimary){
       // this.selectedShipViaInterColumns = this.shipViaIntercols;
       this.selectedInterShipViaRowforDelete = row;
            $('#shipViaInterDel').modal('show');  
        } else {
                   $('#deleteshipping').modal('show');
               }
       
        
 
    }
    confirmDelShipviaInter() {
        this.vendorService.getDeletevendorshipViaInter(this.selectedInterShipViaRowforDelete).subscribe(data => {
            this.loadShipViaInterCollection(this.selectedInterShipViaRowforDelete);
            this.alertService.showMessage(
                'Success',
                `Action was deleted successfully`,
                MessageSeverity.success
            );
        });
        this.modal.close();
    }

    openHistInterShipvia(row) {
        // this.selectedShipViaInterColumns = this.shipViaIntercols;
        this.shipViaInterObj = {};
        this.vendorService.getShipviaHistoryInter(row.vendorInternationalShippingId).subscribe(res => {
            this.auditHistoryInterShipvia = res[0];
            this.loadShipViaInterCollection(row);

        });
    }

    openInterShippingViewVia(rowData) {
        this.interShippingViaView = {};
        this.interShippingViaView = rowData;
    }

    openInterShipViaonDbl(rowData) {
        this.openInterShippingViewVia(rowData);
        $('#viewInterVia').modal('show');
    }

    async  updateActiveorInActiveShipViaForIS(rowData) {
        await this.vendorService.updateStatusForInternationalShippingVia(rowData.vendorInternationalShipViaDetailsId, rowData.isActive, this.userName).subscribe(res => {
            this.loadShipViaInterCollection(rowData);

            this.alertService.showMessage(
                'Success',
                `Sucessfully Updated International Ship Via Status`,
                MessageSeverity.success
            );
        })
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
        console.log(event);        
        this.pageSizeForShipViaInt = event.rows;
    }


}

