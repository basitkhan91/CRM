import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
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
import { getObjectById, editValueAssignByCondition } from '../../../generic/autocomplete';
import { VendorStepsPrimeNgComponent } from '../vendor-steps-prime-ng/vendor-steps-prime-ng.component';
import { ConfigurationService } from '../../../services/configuration.service';
declare const google: any;
@Component({
    selector: 'app-vendor-billing-information',
    templateUrl: './vendor-billing-information.component.html',
    styleUrls: ['./vendor-billing-information.component.scss'],
    animations: [fadeInOut]
})
/** VendorBillingInformation component*/
export class VendorBillingInformationComponent {
    modelValue: boolean;
    display: boolean;
    activeIndex: number;
    public overlays: any[];
    // options: any;
    shipViaCollection: any;
    allShipViaDetails: any[];
    updatedCollection: {};
    vendorbillingAddressdetails: any;
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
    isPrimary: boolean = false;
    shipViaObj: any = {};
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
    formData = new FormData();
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
    // selectedColumns: any[];
    selectedShipViaColumn: any[];
    selectedShipViaColumns: any[];
    // cols: any[];
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
    selectedColumns: any[] = this.cols;
    billingauditHisory: any[];
    shipViacols: any[];
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
    isEditBillingInfo: boolean = false;
    selectedRowforDelete: any;
    totalRecords: number = 0;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number = 0;
    public sourceVendor: any = {};
    @Input() vendorId: number = 0;
    @Input() isViewMode: boolean = false;
    isvendorEditMode: any;
    loaderForBillingInfo: boolean;
    constructor(private http: HttpClient, private router: Router,
        private authService: AuthService, private modalService: NgbModal,
        private activeModal: NgbActiveModal, private _fb: FormBuilder,
        private alertService: AlertService,
        public vendorService: VendorService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private configurations: ConfigurationService) {
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
            this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-billing-information';
            this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);
        }
        // this.options = {
        //     center: { lat: 36.890257, lng: 30.707417 },
        //     zoom: 12
        // };
    }

    ngAfterViewInit() {
    }
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
        // this.vendorId = this.allgeneralInfo[0].vendorId;
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
        this.loaderForBillingInfo = true;
        const vendorId = this.vendorId != 0 ? this.vendorId : this.local.vendorId;
        this.vendorService.getVendorBillAddressGet(vendorId).subscribe(
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
        this.vendorService.getVendorShipViaDetails(rowData).subscribe(
            results => this.onShipViadetails(results[0]),
            error => this.onDataLoadFailed(error)
        );
        this.shipViacols = [
            { field: 'shipVia', header: 'Ship Via' },
            { field: 'billingAccountinfo', header: 'Billing Account Info' },
            { field: 'billingURL', header: 'Billing Url' },
            { field: 'billingId', header: 'Billing Id' },
            { field: 'memo', header: 'Memo' }
        ];
        this.selectedShipViaColumn = this.shipViacols;
    }
    openShipViaEdit(rowObject) {
        this.isEditMode = true;
        this.isSaving = true;
        this.shipViaObj = rowObject;
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
        this.loaderForBillingInfo = false;
    }
    private onShipViadetails(allWorkFlows: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allShipViaDetails = allWorkFlows;
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

    private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allComapnies = allComapnies;
    }

    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.loaderForBillingInfo = false;
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
        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceVendor = row;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openEdit(row) {
        this.isEditMode = true;
        this.isEditBillingInfo = true;
        this.isSaving = true;
        //this.sourceVendor = {...row};
        this.sourceVendor = { ...row, country: getObjectById('countries_id', row.country, this.allCountryinfo) };
        this.loadMasterCompanies();
    }
    openView(content, row) {
        this.sourceVendor = row;
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
        this.isPrimary = row.isPrimary;
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
        this.shipViaObj = row;
        this.isSaving = true;
        this.vendorService.shipviaHistory(this.sourceVendor.vendorBillingId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));
    }
    openBilladdressHistory(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.sourceVendor = row;
        this.isSaving = true;
        this.vendorService.getVendorBillingAuditHistory(this.sourceVendor.vendorId, this.sourceVendor.vendorBillingAddressId).subscribe(
            results => this.onAuditHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));
    }
    private onAuditHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.billingauditHisory = auditHistory;

        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    editItemAndCloseModel() {
        this.isSaving = true;
        if (!(this.sourceVendor.siteName && this.sourceVendor.address1 && this.sourceVendor.city &&
            this.sourceVendor.stateOrProvince && this.sourceVendor.postalCode && this.sourceVendor.country
        )) {
            this.display = true;
            this.modelValue = true;
        }
        if (this.sourceVendor.siteName && this.sourceVendor.address1 && this.sourceVendor.city &&
            this.sourceVendor.stateOrProvince && this.sourceVendor.postalCode && this.sourceVendor.country) {
            if (!this.sourceVendor.vendorId) {
                this.sourceVendor.createdBy = this.userName;
                this.sourceVendor.updatedBy = this.userName;
                this.sourceVendor.masterCompanyId = 1;
                this.sourceVendor.vendorId = this.local.vendorId;
                this.sourceVendor.country = editValueAssignByCondition('countries_id', this.sourceVendor.country);
                //this.vendorService.newBillingAdd(this.sourceVendor).subscribe(data => {
                //    this.localCollection = data;
                //    this.loadData();
                //    this.savesuccessCompleted(this.sourceVendor);
                //    this.sourceVendor = {};
                //})
                this.vendorService.createNewBillinginfo(this.sourceVendor).subscribe(data => {
                    this.localCollection = data;
                    this.loadData();
                    this.savesuccessCompleted(this.sourceVendor);
                    this.sourceVendor = {};
                })
            }
            else {
                this.sourceVendor.isActive = true;
                this.sourceVendor.updatedBy = this.userName;
                this.sourceVendor.country = editValueAssignByCondition('countries_id', this.sourceVendor.country);
                this.sourceVendor.masterCompanyId = 1;
                this.vendorService.updateBillAddressdetails(this.sourceVendor).subscribe(data => {
                    this.updatedCollection = data;
                    this.loadData();
                    this.sourceVendor = {};
                    this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
                })
            }

        }
        $('#addBillingInfo').modal('hide');
    }
    saveVendorShipViaDetails() {
        this.isSaving = true;
        if (!this.shipViaObj.vendorBillingId) {
            this.shipViaObj.createdBy = this.userName;
            this.shipViaObj.updatedBy = this.userName;
            this.shipViaObj.masterCompanyId = 1;
            this.shipViaObj.isActive = true;
            this.vendorService.newBillingViaAdd(this.shipViaObj).subscribe(data => {
                this.shipViaCollection = data;
                this.loadShipViaCollection(this.shipViaCollection);
                if (this.shipViaCollection) {
                    this.shipViaObj.shipVia = "";
                    this.shipViaObj.billingAccountinfo = "";
                    this.shipViaObj.billingURL = "";
                    this.shipViaObj.billingId = "";
                    this.shipViaObj.memo = "";
                }
            })
        }
        else {

            this.sourceVendor.updatedBy = this.userName;
            this.sourceVendor.masterCompanyId = 1;
            this.shipViaObj.isActive = true;
            this.vendorService.updateBillingViainfo(this.shipViaObj).subscribe(data => {
                this.shipViaCollection = data;
                this.loadShipViaCollection(this.shipViaCollection);
                if (this.shipViaCollection) {
                    this.shipViaObj.shipVia = "";
                    this.shipViaObj.billingAccountinfo = "";
                    this.shipViaObj.billingURL = "";
                    this.shipViaObj.billingId = "";
                    this.shipViaObj.memo = "";
                }
            })
        }

    }

    previousClick() {
        this.activeIndex = 5;
        this.vendorService.changeofTab(this.activeIndex);
        // this.vendorService.indexObj.next(this.activeIndex);
        // this.vendorService.changeStep('Shipping Information');
        // this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-shipping-information');
    }
    openShipVia(content, rowData) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.shipViaObj = rowData;
        this.shipViaObj.shipVia = "";
        this.shipViaObj.billingAccountinfo = "";
        this.shipViaObj.billingURL = "";
        this.shipViaObj.billingId = "";
        this.shipViaObj.memo = "";
        this.isSaving = true;
        this.loadShipViaCollection(rowData);
        this.loadMasterCompanies();
        this.sourceAction.isActive = true;
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    updateVendorBillingAddress(updateObj: any) {

        this.vendorService.updateVendorBillingAddressDetails(updateObj, this.local.vendorId).subscribe(data => {
            this.vendorbillingAddressdetails = data;
            this.vendorService.newBillingAddWithAddress(this.sourceVendor, this.vendorbillingAddressdetails.vendorBillingAddressId).subscribe(data => {
                this.localCollection = data;
                this.updateVendorBillingAddress(this.localCollection);
            })
            this.loadData();
        })
    }

    // deleteItemAndCloseModel(vendorBillingAddressId) {
    //     this.isSaving = true;
    //     this.sourceVendor.isActive = false;
    //     this.sourceVendor.addressStatus = false;
    //     this.sourceVendor.updatedBy = this.userName;
    //     this.sourceVendor.vendorBillingAddressId = vendorBillingAddressId;
    //     this.vendorService.deleteAcion(this.sourceVendor).subscribe(
    //         response => this.saveCompleted(this.sourceVendor),
    //         error => this.saveFailedHelper(error));
    // }

    deleteBillingInfo(rowData) {
        this.selectedRowforDelete = rowData;
    }
    deleteConformation(value) {
        if (value === 'Yes') {
            this.vendorService.GetVendorBillingAddressDelete(this.selectedRowforDelete.vendorBillingAddressId, this.userName).subscribe(() => {
                this.loadData();
                this.alertService.showMessage(
                    'Success',
                    `Action was deleted successfully`,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    deleteItemBillingCloseModel(row) {

        if (!row.isPrimary) {


            this.isSaving = true;
            this.shipViaObj.isActive = true;
            this.shipViaObj.updatedBy = this.userName;
            this.shipViaObj.vendorBillingId = row.vendorBillingId;
            this.vendorService.deleteVendorAcion(this.shipViaObj).subscribe(data => {
                this.loadShipViaCollection(data);
            })
        } else {
            $('#deletebilling').modal('show');
        }
    }
    dismissShipViaModelModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
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

    // toggledbldisplay(data) {
    //     this.sourceVendor = data;
    // }
    nextClick() {
        if (this.local) {
            this.vendorService.billingCollection = this.local;
        }
        this.activeIndex = 7;
        this.vendorService.changeofTab(this.activeIndex);
        // this.vendorService.indexObj.next(this.activeIndex);
        // this.vendorService.changeStep('Warnings');
        // this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-warnings');
        this.alertService.showMessage(
            'Success',
            `${this.isvendorEditMode ? 'Updated' : 'Saved'}  Billing Information Sucessfully `,
            MessageSeverity.success
        );
    }
    handleChanges(rowData, e) {
        console.log(rowData);
        if (e.checked == false) {
            this.sourceVendor = rowData;
            this.sourceVendor.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceVendor.isActive == false;
            // this.vendorService.updateActionforActiveforBilling(this.sourceVendor).subscribe(
            //     response => this.saveCompleted(this.sourceVendor),
            //     error => this.saveFailedHelper(error));
            this.vendorService.GetUpdateVendorBillingAddressStatus(this.sourceVendor.vendorBillingAddressId, this.sourceVendor.isActive, this.userName).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
            this.sourceVendor = "";

        }
        else {
            this.sourceVendor = rowData;
            this.sourceVendor.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceVendor.isActive == true;
            // this.vendorService.updateActionforActiveforBilling(this.sourceVendor).subscribe(
            //     response => this.saveCompleted(this.sourceVendor),
            //     error => this.saveFailedHelper(error));
            this.vendorService.GetUpdateVendorBillingAddressStatus(this.sourceVendor.vendorBillingAddressId, this.sourceVendor.isActive, this.userName).subscribe(
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
        // this.countrycollection = [];
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

    onAddBillingInfo() {
        this.sourceVendor = {};
        this.isEditBillingInfo = false;
    }

    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=VendorBillingAddress&fileName=VendorBillingInfo.xlsx`;
        window.location.assign(url);
    }

    customExcelUpload(event) {
        const file = event.target.files;

        if (file.length > 0) {
            this.formData.append('file', file[0])
            this.vendorService.BillingFileUpload(this.formData, this.local.vendorId).subscribe(res => {
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
        console.log(this.local);

        if (this.local !== undefined) {
            return editValueAssignByCondition('vendorName', this.local.vendorName) === undefined ? '' : editValueAssignByCondition('vendorName', this.local.vendorName);
        } else {
            return '';
        }
    }

    getPageCount(totalNoofRecords, pageSize) {
        return Math.ceil(totalNoofRecords / pageSize)
    }
    pageIndexChange(event) {
        this.pageSize = event.rows;
    }


}

