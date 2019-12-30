import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
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
declare const google: any;
@Component({
    selector: 'app-vendor-shipping-information',
    templateUrl: './vendor-shipping-information.component.html',
    styleUrls: ['./vendor-shipping-information.component.scss'],
    animations: [fadeInOut]
})
/** VendorShippingInformation component*/
export class VendorShippingInformationComponent {
    modelValue: boolean;
    display: boolean;
    activeIndex: number;
    public overlays: any[];
    options: any;
    shipViaCollection: any;
    allShipViaDetails: any[];
    updatedCollection: {};
    vendorshippingAddressdetails: any;
    local: any;
    addressId: any;
    allAddresses: any[];
    vendorId: any;
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
    ngOnInit(): void {
        this.workFlowtService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-shipping-information';
        this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
        if (this.local) {
            this.loadData();
        }
        this.countrylist();
        this.options = {
            center: { lat: 36.890257, lng: 30.707417 },
            zoom: 12
        };

    }
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
    selectedColumns: any[];
    selectedShipViaColumn: any[];
    selectedShipViaColumns: any[];
    cols: any[];
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
    auditHistory: any = [];

    constructor(private http: HttpClient, private router: Router,
        private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: VendorService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.dataSource = new MatTableDataSource();
        if (this.local) {
            this.workFlowtService.contactCollection = this.local;
        }
        if (this.workFlowtService.generalCollection) {
            this.local = this.workFlowtService.generalCollection;
        }
        if (this.workFlowtService.paymentCollection) {
            this.local = this.workFlowtService.paymentCollection;
        }
        this.dataSource = new MatTableDataSource();
        if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
            this.local = this.workFlowtService.listCollection.t;
        }
        if (this.workFlowtService.paymentCollection) {
            this.local = this.workFlowtService.paymentCollection;
            this.sourceVendor.siteName = this.local.vendorName;
            this.sourceVendor.address1 = this.local.address1;
            this.sourceVendor.address2 = this.local.address2;
            // this.sourceVendor.address3 = this.local.address3;
            this.sourceVendor.city = this.local.city;
            this.sourceVendor.country = this.local.country;
            this.sourceVendor.stateOrProvince = this.local.stateOrProvince;
            this.sourceVendor.postalCode = this.local.PostalCode;
        }
        if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
            this.viewName = "Edit";
            this.local = this.workFlowtService.listCollection;
            this.loadData();
        }
    }
    public sourceVendor: any = {};

    ngAfterViewInit() {
    }
    getlatlng(address) {
        this.checkAddress = true;
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB_W96L25HhFWgqLblcikircQKjU6bgTgk').subscribe((data: any) => {
            this.options = {
                center: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng },
                zoom: 12
            };
            this.overlays = [
                new google.maps.Marker({ position: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }, title: "Konyaalti" }),
            ];
            return data;
        });
    }

    private getgeneralInnfo() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getWorkFlows().subscribe(
            results => this.ongeneralDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private ongeneralDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allgeneralInfo = allWorkFlows;
        if (this.workFlowtService.isCOntact == true) {
            this.vendorname = this.allgeneralInfo[0].vendorName;
            this.vendorCode = this.allgeneralInfo[0].vendorCode;
        }
        this.vendorId = this.allgeneralInfo[0].vendorId;
        console.log(this.allgeneralInfo);
    }
    private loadAddressDara() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getAddressDtails().subscribe(
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
        this.workFlowtService.getVendorShipAddressGet(this.local.vendorId).subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
        this.cols = [
            { field: 'siteName', header: 'Site Name' },
            { field: 'address1', header: 'Address1' },
            { field: 'address2', header: 'Address2' },
            // { field: 'address3', header: 'Address3' },
            { field: 'city', header: 'City' },
            { field: 'stateOrProvince', header: 'State/Prov' },
            { field: 'postalCode', header: 'Postal Code' },
            { field: 'country', header: 'Country' }
        ];  
        this.selectedColumns = this.cols;            
    }

    private countrylist() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getCountrylist().subscribe(
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
        this.workFlowtService.getVendorShipViaDetails(rowData).subscribe(
            results => this.onShipViadetails(results[0]),
            error => this.onDataLoadFailed(error)
        );
        this.shipViacols = [
            { field: 'shipVia', header: 'Ship Via' },
            { field: 'shippingAccountinfo', header: 'Shipping Account Info' },
            { field: 'shippingURL', header: 'Shipping Url' },
            { field: 'shippingId', header: 'Shipping Id' },
            { field: 'memo', header: 'Memo' }
        ];
        this.selectedShipViaColumns = this.shipViacols;
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
        //this.sourceVendor = row;
        this.localCollection = row;
        this.selectedRowforDelete = row;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openEdit(row) {
        this.isEditMode = true;
        this.isSaving = true;
        this.sourceVendor = {...row};
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
        this.country = row.country;
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
        this.shipViaObj = row;
        this.isSaving = true;
        this.workFlowtService.shipviaHistory(this.sourceVendor.vendorShippingId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));
    }
    openShipaddressHistory(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.sourceVendor = row;
        this.isSaving = true;
        this.workFlowtService.getShipaddressHistory(this.sourceVendor.vendorId, this.sourceVendor.vendorShippingAddressId).subscribe(
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
                this.workFlowtService.newShippingAdd(this.sourceVendor).subscribe(data => {
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

                this.sourceVendor.masterCompanyId = 1;
                this.workFlowtService.updateshippinginfo(this.sourceVendor).subscribe(data => {
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
            if(this.shipViaObj.shipVia == null || this.shipViaObj.shipVia=="" )
            {
               this.alertService.showMessage("Empty", 'Cannot Submit Empty', MessageSeverity.warn);
                return;
            }

        if (this.shipViaObj.vendorShippingId>0) {            
            this.shipViaObj.createdBy = this.userName;
            this.shipViaObj.updatedBy = this.userName;
            this.shipViaObj.masterCompanyId = 1;
            this.shipViaObj.isActive = true;
           
            this.workFlowtService.updateshippingViainfo(this.shipViaObj).subscribe(data => {
                this.shipViaCollection = data;
                this.loadShipViaCollection(this.shipViaCollection);
                if (this.shipViaCollection) {
                    this.shipViaObj.shipVia = "";
                    this.shipViaObj.shippingAccountinfo = "";
                    this.shipViaObj.shippingURL = "";
                    this.shipViaObj.shippingId = "";
                    this.shipViaObj.memo = "";
                    this.shipViaObj.vendorShippingId=0;
                }
            })
        }
        else {
            this.shipViaObj.createdBy = this.userName;
            this.sourceVendor.updatedBy = this.userName;
            this.sourceVendor.masterCompanyId = 1;
            this.shipViaObj.isActive = true;

            this.workFlowtService.newShippingViaAdd(this.shipViaObj).subscribe(data => {
                this.shipViaCollection = data;
                this.loadShipViaCollection(this.shipViaCollection);
                if (this.shipViaCollection) {
                    this.shipViaObj.shipVia = "";
                    this.shipViaObj.shippingAccountinfo = "";
                    this.shipViaObj.shippingURL = "";
                    this.shipViaObj.shippingId = "";
                    this.shipViaObj.memo = "";
                    this.shipViaObj.vendorShippingId=0;
                }
            })            
        }

    }

    previousClick() {
        this.activeIndex = 3;
        this.workFlowtService.indexObj.next(this.activeIndex);
        this.workFlowtService.changeStep('Payment Information');
        this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-payment-information');
    }
    openShipVia(content, rowData) {
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
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    updateVendorShippingAddress(updateObj: any) {
       
        this.workFlowtService.updateVendorShippingAddressDetails(updateObj, this.local.vendorId).subscribe(data => {
            this.vendorshippingAddressdetails = data;
            this.workFlowtService.newShippingAddWithAddress(this.sourceVendor, this.vendorshippingAddressdetails.vendorShippingAddressId).subscribe(data => {
                this.localCollection = data;
                this.updateVendorShippingAddress(this.localCollection);
            })
            this.loadData();
        })
    }

    deleteItemAndCloseModel(vendorShippingAddressId) {
        this.isSaving = true;
        this.sourceVendor.isActive = false;
        this.sourceVendor.addressStatus = false;
        this.sourceVendor.updatedBy = this.userName;
        this.sourceVendor.vendorShippingAddressId = vendorShippingAddressId;
        this.workFlowtService.deleteAcion(this.sourceVendor).subscribe(
            response => this.saveCompleted(this.sourceVendor),
            error => this.saveFailedHelper(error));
    }

    deleteVendorShippingAddress() {             
        this.isSaving = true;       
        this.localCollection.isActive = false;
        this.localCollection.addressStatus = false;
        this.localCollection.updatedBy = this.userName;
        //this.sourceVendor.vendorShippingAddressId = vendorShippingAddressId;
        this.workFlowtService.deleteVendorShippingAddress(this.localCollection).subscribe(
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

        this.workFlowtService.deleteVendorAcion(this.localCollection).subscribe(data => {
            this.loadShipViaCollection(this.localCollection);
        })

        // this.workFlowtService.deleteVendorAcion(this.localCollection).subscribe(
        // response => this.saveCompleted(this.sourceVendor),
        // error => this.saveFailedHelper(error));
        //this.loadShipViaCollection(this.localCollection);
        this.modal.close();
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

    toggledbldisplay(data) {
        this.sourceVendor = data;
    }
    nextClick() {
        if (this.local) {
            this.workFlowtService.shippingCollection = this.local;
        }
        this.activeIndex = 6;
        this.workFlowtService.indexObj.next(this.activeIndex);
        this.workFlowtService.changeStep('Billing Information');
        this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-billing-information');
    }
    handleChanges(rowData, e) {
        if (e.checked == false) {
            this.sourceVendor = rowData;
            this.sourceVendor.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceVendor.isActive == false;
            this.workFlowtService.updateActionforActiveforshipping(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
            this.sourceVendor = "";
        }
        else {
            this.sourceVendor = rowData;
            this.sourceVendor.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceVendor.isActive == true;
            this.workFlowtService.updateActionforActiveforshipping(this.sourceVendor).subscribe(
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
        this.countrycollection = [];
        if (this.allCountryinfo) {
            for (let i = 0; i < this.allCountryinfo.length; i++) {
                let countryName = this.allCountryinfo[i].nice_name;
                if (countryName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.countrycollection.push(countryName);
                }
            }
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
        this.sourceVendor = rowData;
        this.workFlowtService.getShipaddressHistory(this.sourceVendor.vendorId, this.sourceVendor.vendorShippingAddressId).subscribe(res => {
            this.auditHistory = res;
        })
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
        this.isEditShippingInfo = false;
    }



}

