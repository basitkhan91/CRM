import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
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
//import { VendorClassificationComponent } from '../../vendor-classification/vendor-classification.component';
import { Router, NavigationExtras } from '@angular/router';
import { VendorClassification } from '../../../models/vendorclassification.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GMapModule } from 'primeng/gmap';
import { AddActionsDialogComponent } from '../../dialogs/add-actions-dialog/add-actions-dialog.component';
import { VendorClassificationService } from '../../../services/vendorclassification.service';
import { unescapeHtml } from '@angular/platform-browser/src/browser/transfer_state';
import { FileUploadModule } from 'primeng/fileupload';
import { Message } from 'primeng/components/common/message';
import { MenuItem } from 'primeng/components/common/menuitem';
import { DialogModule } from 'primeng/dialog';//Error Validation Pop Up
import { CustomerService } from '../../../services/customer.service';
declare const google: any;
@Component({
    selector: 'app-vendor-general-information',
    templateUrl: './vendor-general-information.component.html',
    styleUrls: ['./vendor-general-information.component.scss'],
    animations: [fadeInOut]
})
/** anys component*/
export class VendorGeneralInformationComponent implements OnInit, AfterViewChecked {
    disableSaveVenderName: boolean;
    disableSaveVenderCode: boolean;
    VendorCodesColl: any[] = [];
    selectedVendorCode: any;
    disableSaveVenCode: boolean;
    disableSave: boolean;
    selectedActionName: any;
    disableSaveVenName: boolean;
    VendorNamecoll: any[] = [];
    allCapbilityClassInfo: any[];
    modelValue: boolean;
    display: boolean;
    matSpinner: boolean;
    activeIndex: number;
    showvendorContractReference: boolean;
    showvendorCode: boolean;
    showVendorName: boolean;
    showalert: boolean;
    showLable: boolean;
    venname: any;
    allVendorClassInfo: VendorClassification[];
    vendorClassName: any;
    vendorCollection: any[];
    vendorNames: any[];
    vendorCodes: any[];
    localCollections: any;
    vendorName: any;
    vendorCode: any;
    checkAddress: boolean = false;
    // vendorCode: any;
    //vendorname: any;
    allgeneralInfo: any[];
    closeCmpny: boolean = true;
    service: boolean = false;
    vendorId: any;
    addressId: any;
    allAddresses: any[];
    action_name: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createddate: any = "";
    updatedDate: any = "";
    vendorParentName: any = "";
    viewName: string = "Create";
    private items: MenuItem[];
    home: MenuItem;
    local: any;
    vendorInfoByName: any[] = [];
    sourceCustomer: any;
    allCountryinfo: any[];
    disablesave: boolean;
    countrycollection: any;
    selectedCountries: any;
    isVendorAlsoCustomer: boolean = false;

    ngOnInit(): void {
        this.matSpinner = false;
        //this.workFlowtService.MatSpinner = true;//App Mat Spinner Testing

        // debugger;
        this.workFlowtService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-general-information';
        this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
        this.workFlowtService.ShowPtab = true;
        this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab);
        this.activeIndex = 0;
        this.workFlowtService.indexObj.next(this.activeIndex);
        this.loadData();
        this.Capabilitydata();
        this.countrylist();
        this.loadDataVendorData();
        //this.sourceVendor.vendorTypeId = 2;
        this.options = {
            center: { lat: 36.890257, lng: 30.707417 },
            zoom: 12
        };
        if (this.workFlowtService.isEditMode == false) {
            this.sourceVendor.vendorTypeId = 2;
            this.viewName = "Create";
        }
        if (this.workFlowtService.enableExternal == false) {
            this.sourceVendor.vendorTypeId = 2;
        }

        if (this.workFlowtService.generalCollection) {
            this.sourceVendor = this.workFlowtService.generalCollection;
        }
    }
    ngOndestroy() {
        //this.matSpinner = false;
        //this.workFlowtService.MatSpinner = false; //APP Mat Spinner will be display

    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    //@ViewChild('vendorclassificationcomponent') patientContactPopupModal: ModalDirective
    filteredBrands: any[];
    displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<any>;
    allActions: any[] = [];
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    public sourceAction: any = {};
    public auditHisory: AuditHistory[] = [];
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    selectedColumn: any[];
    selectedColumns: any[];
    cols: any[];
    title: string = "Create";
    id: number;
    errorMessage: any;
    modal: NgbModalRef;
    actionName: string;
    Active: string = "Active";
    length: number;
    localCollection: any[] = [];
    collection: any;
    options: any;
    public overlays: any[];
    msgs: Message[];

    uploadedFiles: any[] = [];

    /** Actions ctor */

    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;

    constructor(public vendorclassificationService: VendorClassificationService, private http: HttpClient, private changeDetectorRef: ChangeDetectorRef, private router: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, public customerser: CustomerService, private alertService: AlertService, public workFlowtService: VendorService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {


        this.dataSource = new MatTableDataSource();
        if (this.local) {

            this.workFlowtService.contactCollection = this.local;
        }
        if (this.workFlowtService.generalCollection) {
            this.local = this.workFlowtService.generalCollection;
        }

        if (this.workFlowtService.listCollection != null && this.workFlowtService.isEditMode == true) {
            this.showLable = true;
            this.viewName = "Edit";
            this.local = this.workFlowtService.listCollection.t;
            this.sourceVendor = this.workFlowtService.listCollection.t;
            this.sourceVendor.address1 = this.workFlowtService.listCollection.address1;
            this.sourceVendor.address2 = this.workFlowtService.listCollection.address2;
            this.sourceVendor.address3 = this.workFlowtService.listCollection.address3;
            this.sourceVendor.city = this.workFlowtService.listCollection.city;
            this.sourceVendor.country = this.workFlowtService.listCollection.country;
            this.sourceVendor.stateOrProvince = this.workFlowtService.listCollection.stateOrProvince;
            this.sourceVendor.PostalCode = this.workFlowtService.listCollection.postalCode;

        }
        if (this.customerser.isCustomerAlsoVendor == true) {
            this.sourceVendor = this.customerser.localCollectiontoVendor;
            this.sourceVendor.vendorEmail = this.customerser.localCollectiontoVendor.email;
            this.sourceVendor.vendorPhone = this.customerser.localCollectiontoVendor.customerPhone;
            this.sourceVendor.vendorName = this.customerser.localCollectiontoVendor.name;
            this.sourceVendor.vendorCode = this.customerser.localCollectiontoVendor.customerCode;
            this.sourceVendor.doingBusinessAsName = this.customerser.localCollectiontoVendor.doingBuinessAsName;
            this.sourceVendor.PostalCode = this.customerser.localCollectiontoVendor.postalCode;
        }


    }
    sourceVendor: any = {};
    closethis() {
        this.closeCmpny = false;
    }
    ngAfterViewChecked() {
        //this.matSpinner = false;
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
    }
    public allWorkFlows: any[] = [];

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );


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

    private Capabilitydata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getCapabilibylist().subscribe(
            results => this.onCapabilitySuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );


    }
    private onCapabilitySuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allCapbilityClassInfo = allWorkFlows;

    }

    public addEntity() {

        let dialogRef = this.dialog.open(AddActionsDialogComponent,
            {
                panelClass: 'mat-dialog-md',
                data: { role: "" }
            });
        dialogRef.afterClosed().subscribe(role => {
            if (role) {
                //this.updateRoles(role);
            }
        });
    }
    private onAddressDataLoadSuccessful(alladdress: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = alladdress;
        this.allAddresses = alladdress;
        this.addressId = this.allAddresses[0].addressId;
        //this.isEditMode = true;
        //console.log(this.vendorId, this.addressId);
        //this.workFlowtService.updateAction(this.sourceVendor, this.addressId, this.vendorId).subscribe(
        //    response => this.saveCompleted(this.sourceVendor),
        //    error => this.saveFailedHelper(error));


    }

    private loadAddressDara() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getAddressDtails().subscribe(
            results => this.onAddressDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
        //this.navigate();

    }

    getlatlng(address) {

        //debugger;
        this.checkAddress = true;
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB_W96L25HhFWgqLblcikircQKjU6bgTgk').subscribe((data: any) => {
            //alert(data);
            this.options = {
                center: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng },
                zoom: 12
            };
            this.overlays = [
                new google.maps.Marker({ position: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }, title: "Konyaalti" }),
                //new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: "Ataturk Park" }),
                //new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: "Oldtown" }),
                //new google.maps.Polygon({
                //    paths: [
                //        { lat: 36.9177, lng: 30.7854 }, { lat: 36.8851, lng: 30.7802 }, { lat: 36.8829, lng: 30.8111 }, { lat: 36.9177, lng: 30.8159 }
                //    ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
                //}),
                //new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
                //new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
            ];
            return data;


        });
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
        this.isEditMode = false;
        this.isDeleteMode = false;

        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new VendorClassification();
        this.sourceAction.isActive = true;
        this.vendorName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })




    }




    saveVendorClassificationDetails() {

        // debugger;

        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.classificationName = this.vendorClassName;
            this.sourceAction.masterCompanyId = 1;
            this.vendorclassificationService.newVendorClassification(this.sourceAction).subscribe(data => {
                //debugger;
                if (data) { this.sourceVendor.vendorClassificationId = data.vendorClassificationId }

                this.loadDataVendorData();
            })
            //role => this.saveSuccessHelper(role),
            //error => this.saveFailedHelper(error));
        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.classificationName = this.vendorClassName;
            this.sourceAction.masterCompanyId = 1;
            this.vendorclassificationService.updateVendorClassification(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }
    private loadDataVendorData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.vendorclassificationService.getVendorClassificationEndpointList().subscribe(
            results => this.onVendorDataLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onVendorDataLoad(getVendorClassificationList: VendorClassification[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getVendorClassificationList;
        this.allVendorClassInfo = getVendorClassificationList;
        //this.loadDataVendorData();
    }
    filterVendors(event) {

        this.vendorCollection = [];
        for (let i = 0; i < this.allVendorClassInfo.length; i++) {
            let vendorName = this.allVendorClassInfo[i].classificationName;
            if (vendorName != "" && vendorName != null && vendorName != "Null") {

                if (vendorName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.vendorCollection.push(vendorName);
                }

            }
        }


    }
    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue;
    }


    private refresh() {
        // Causes the filter to refresh there by updating with recently added data.
        this.applyFilter(this.dataSource.filter);
    }
    private onDataLoadSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allActions = allWorkFlows;
        //this.vendorId = this.allActions[0].vendorId;
        //console.log(this.allActions);


    }
    private onvendorloadsuccessfull(allWorkFlows: any[]) {


        this.vendorInfoByName = allWorkFlows[0]
        this.sourceVendor = this.vendorInfoByName;



    }
    filterVendorNames(event) {

        this.vendorNames = [];
        for (let i = 0; i < this.allActions.length; i++) {
            let vendorName = this.allActions[i].vendorName;
            if (vendorName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                //this.vendorNames.push(vendorName);
                this.VendorNamecoll.push([{
                    "vendorId": this.allActions[i].vendorId,
                    "vendorName": vendorName
                }]),
                    this.vendorNames.push(vendorName);
            }
        }
    }
    filterVendorParentNames(event) {

        this.vendorNames = [];
        for (let i = 0; i < this.allActions.length; i++) {
            let vendorParentName = this.allActions[i].vendorName;
            if (vendorParentName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.vendorNames.push(vendorParentName);
            }
        }
    }
    selectedValue(name) {
        //alert(name);
        this.venname = name;
    }


    filterVendorCodes(event) {

        this.vendorCodes = [];
        for (let i = 0; i < this.allActions.length; i++) {
            let vendorCode = this.allActions[i].vendorCode;

            if (vendorCode.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                //this.vendorCodes.push(vendorCode);
                this.VendorCodesColl.push([{
                    "vendorId": this.allActions[i].vendorClassificationId,
                    "vendorCode": vendorCode
                }]),
                    this.vendorCodes.push(vendorCode);

            }
        }
    }

    private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {

        // debugger;
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.auditHisory = auditHistory;


        this.modal = this.modalService.open(content, { size: 'lg' });

        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })


    }

    private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allComapnies = allComapnies;

    }

    private onDataLoadFailed(error: any) {
        // alert(error);
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

    }
    private loadGeneralObject() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getGeneralObj().subscribe(
            results => this.onGeneralObjUrl(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onGeneralObjUrl(allWorkFlows: any) {
        debugger;
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.sourceVendor = allWorkFlows;


    }
    private ongeneralDataLoadSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allgeneralInfo = allWorkFlows;
        //this.vendorname = this.allgeneralInfo[0].vendorName;
        //this.vendorCode = this.allgeneralInfo[0].vendorCode;
        //console.log(this.allgeneralInfo);


    }


    open(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        //this.sourceVendor.isActive = true;
        this.actionName = "";

        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceVendor = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openEdit(content, row) {

        this.isEditMode = true;

        this.isSaving = true;
        this.sourceVendor = row;
        this.loadMasterCompanies();
        // this.actionName = this.sourceVendor.description;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openView(content, row) {

        this.sourceVendor = row;
        this.action_name = row.description;
        this.memo = row.memo;
        this.createdBy = row.createdBy;
        this.updatedBy = row.updatedBy;
        this.createddate = row.createdDate;
        this.updatedDate = row.updatedDate;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openHelpText(content) {
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openHist(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;


        this.sourceVendor = row;


        //this.isSaving = true;
        // debugger;
        //this.workFlowtService.historyAcion(this.sourceVendor.masterCompanyId).subscribe(
        //    results => this.onHistoryLoadSuccessful(results[0], content),
        //    error => this.saveFailedHelper(error));


    }
    //onBlurMethod(data) {
    //	if (data == 'vendorContractReference') {
    //		this.showvendorContractReference = false;
    //	}
    //	if (data == 'vendorName') {
    //		this.showVendorName = false;
    //	}
    //	if (data == 'vendorCode') {
    //		this.showvendorCode = false;
    //	}
    //}
    editItemAndCloseModel() {


        this.isSaving = true;
        if (!(this.sourceVendor.vendorName && this.sourceVendor.vendorCode && this.sourceVendor.vendorEmail && this.sourceVendor.vendorPhone && this.sourceVendor.address1 && this.sourceVendor.city
            && this.sourceVendor.PostalCode && this.sourceVendor.country && this.sourceVendor.vendorClassificationId

        )) {
            this.display = true;
            this.modelValue = true;
        }


        if (this.sourceVendor.vendorName && this.sourceVendor.vendorCode && this.sourceVendor.vendorEmail && this.sourceVendor.vendorPhone && this.sourceVendor.address1 && this.sourceVendor.city
            && this.sourceVendor.PostalCode && this.sourceVendor.country && this.sourceVendor.vendorClassificationId) {

            if (!this.sourceVendor.vendorId) {
                this.sourceVendor.createdBy = this.userName;
                this.sourceVendor.updatedBy = this.userName;
                this.sourceVendor.masterCompanyId = 1;
                this.sourceVendor.isActive = true;
                //this.sourceVendor.vendorName = this.vendorName;
                //this.sourceVendor.vendorCode = this.vendorCode;
                if (this.sourceVendor.parent == false || this.sourceVendor.parent == null) {
                    this.sourceVendor.vendorParentName = '';

                }
                this.workFlowtService.newAction(this.sourceVendor).subscribe(data => {
                    this.sourceVendor.updatedBy = this.userName;
                    this.localCollection = data;
                    this.sourceVendor = data;
                    this.sourceVendor.address1 = data.address.line1;
                    this.sourceVendor.address2 = data.address.line2;
                    this.sourceVendor.address3 = data.address.line3;
                    this.sourceVendor.city = data.address.city;
                    //this.sourceVendor.phone = data.address.phone;
                    this.sourceVendor.country = data.address.country;
                    this.sourceVendor.stateOrProvince = data.address.stateOrProvince;
                    this.sourceVendor.PostalCode = data.address.postalCode;
                    //this.sourceVendor = this.localCollection;
                    //this.workFlowtService.listCollection = this.localCollection;
                    this.workFlowtService.generalCollection = this.localCollection;
                    this.workFlowtService.contactCollection = this.localCollection;
                    this.workFlowtService.financeCollection = this.localCollection;
                    this.workFlowtService.paymentCollection = this.localCollection;
                    this.workFlowtService.shippingCollection = this.localCollection;
                    if (this.sourceVendor.isVendorAlsoCustomer == true) {
                        this.workFlowtService.isVendorAlsoCustomer = this.sourceVendor.isVendorAlsoCustomer;
                        this.workFlowtService.localCollectiontoCustomer = this.sourceVendor;
                    }
                    this.activeIndex = 0;
                    this.workFlowtService.indexObj.next(this.activeIndex);
                    this.savesuccessCompleted(this.sourceVendor);
                })
            }

            else {
                this.sourceVendor.updatedBy = this.userName;
                if (this.sourceVendor.parent == false || this.sourceVendor.parent == null) {
                    this.sourceVendor.vendorParentName = '';

                }
                this.workFlowtService.updateVendorDetails(this.sourceVendor).subscribe(
                    data => {
                        this.sourceVendor.updatedBy = this.userName;
                        this.localCollection = data;
                        this.sourceVendor = data;
                        this.sourceVendor.address1 = data.address.line1;
                        this.sourceVendor.address2 = data.address.line2;
                        this.sourceVendor.address3 = data.address.line3;
                        this.sourceVendor.city = data.address.city;
                        //this.sourceVendor.phone = data.address.phone;
                        this.sourceVendor.country = data.address.country;
                        this.sourceVendor.stateOrProvince = data.address.stateOrProvince;
                        this.sourceVendor.PostalCode = data.address.postalCode;
                        //this.sourceVendor = this.localCollection;
                        //this.workFlowtService.listCollection = this.localCollection;
                        this.workFlowtService.generalCollection = this.localCollection;
                        this.workFlowtService.contactCollection = this.localCollection;
                        this.workFlowtService.financeCollection = this.localCollection;
                        this.workFlowtService.paymentCollection = this.localCollection;
                        this.workFlowtService.shippingCollection = this.localCollection;
                        this.activeIndex = 0;
                        this.workFlowtService.indexObj.next(this.activeIndex);
                        this.savesuccessCompleted(this.sourceVendor);
                        //this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-contacts');

                    })

            }
        }
        else {
            //this.showalert = true;
        }
        //console.log(this.localCollection)


        //this.modal.close();
    }
    nextClick() {
        this.workFlowtService.vendorgeneralcollection = this.local;
        this.activeIndex = 1;
        this.workFlowtService.indexObj.next(this.activeIndex);
        //this.saveCompleted(this.sourceCustomer);
        this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-contacts');

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


        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);



        this.loadData();
    }
    private saveSuccessHelper(role?: any) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    private saveFailedHelper(error: any) {
        //this.isSaving = false;
        //this.alertService.stopLoadingMessage();
        //this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        //this.alertService.showStickyMessage(error, null, MessageSeverity.error);
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
    onUpload(event) {
        debugger;
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }



    eventHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {
                    //alert("Action Name already Exists");
                    this.disableSaveVenderName = true;
                    this.disableSaveVenName = true;
                }
                else {
                    this.disableSaveVenderName = false;
                    this.disableSaveVenName = false;
                }
            }

        }
    }
    onVendorselected(event) {
        //debugger;
        for (let i = 0; i < this.VendorNamecoll.length; i++) {
            if (event == this.VendorNamecoll[i][0].vendorName) {
                //alert("Action Name already Exists");
                this.disableSaveVenName = true;
                this.disableSave = true;
                this.disableSaveVenderName = true;
                this.selectedActionName = event;
            }

        }
        //this.workFlowtService.getvendorList(event).subscribe(
        //	results => this.onvendorloadsuccessfull(results[0]),
        //	error => this.onDataLoadFailed(error)
        //);
    }

    eventvendorHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedVendorCode) {
                if (value == this.selectedVendorCode.toLowerCase()) {
                    //alert("Action Name already Exists");
                    this.disableSaveVenCode = true;
                    this.disableSaveVenderCode = true;

                }
                else {
                    this.disableSaveVenCode = false;
                    this.disableSaveVenderCode = false;

                }
            }

        }


    }
    onVendorCodeselected(event) {
        //debugger;
        for (let i = 0; i < this.VendorCodesColl.length; i++) {
            if (event == this.VendorCodesColl[i][0].vendorCode) {

                this.disableSaveVenCode = true;
                this.disableSaveVenderCode = true;
                this.selectedVendorCode = event;
            }
        }
    }
    onCountrieselected(event) {
        if (this.allCountryinfo) {

            for (let i = 0; i < this.allCountryinfo.length; i++) {
                if (event == this.allCountryinfo[i].nice_name) {
                    this.sourceVendor.nice_name = this.allCountryinfo[i].nice_name;
                    this.disablesave = true;

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
                    //alert("Action Name already Exists");
                    this.disablesave = true;
                }
                else {
                    this.disablesave = false;
                }
            }

        }
    }
    filtercountry(event) {

        this.countrycollection = [];
        if (this.allCountryinfo.length > 0) {
            for (let i = 0; i < this.allCountryinfo.length; i++) {
                let countryName = this.allCountryinfo[i].nice_name;
                if (countryName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.countrycollection.push(countryName);
                }
            }
        }
    }

}