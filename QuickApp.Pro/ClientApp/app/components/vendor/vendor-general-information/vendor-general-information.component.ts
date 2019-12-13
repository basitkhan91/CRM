import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, AfterViewChecked, OnDestroy } from '@angular/core';
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
import { CommonService } from '../../../services/common.service';
import { IntegrationService } from '../../../services/integration-service';
declare const google: any;
@Component({
    selector: 'app-vendor-general-information',
    templateUrl: './vendor-general-information.component.html',
    styleUrls: ['./vendor-general-information.component.scss'],
    animations: [fadeInOut]
})
/** anys component*/
export class VendorGeneralInformationComponent implements OnInit, OnDestroy {
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
    disableSaveParentName: boolean;
    disablesaveForClassification: boolean;
    selectedClass: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
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
    isEditMode: boolean = false;
    isDeleteMode: boolean = false;
    integrationOriginalList;
    intSelectedColumns: any[];
    dropDownVendorCapabilitiesList: any[];
    form: any;
    //phoneNumberPattern = "[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}";
    allvendorclassificationInfo;
    //@ViewChild('f') form: any;

    constructor(public vendorclassificationService: VendorClassificationService, private http: HttpClient, private changeDetectorRef: ChangeDetectorRef, private router: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, public customerser: CustomerService, private alertService: AlertService, public vendorService: VendorService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, public commonService: CommonService,public integrationService: IntegrationService) {
        this.dataSource = new MatTableDataSource();
       
        if (this.local) {
            this.vendorService.contactCollection = this.local;
        }
        if (this.vendorService.generalCollection) {
            this.local = this.vendorService.generalCollection;          
        }        

        if (this.vendorService.listCollection != null && this.vendorService.isEditMode == true) {
            this.showLable = true;
            this.viewName = "Edit";
            this.local = this.vendorService.listCollection.t;
            this.sourceVendor = this.vendorService.listCollection.t;
            this.sourceVendor.address1 = this.vendorService.listCollection.address1;
            this.sourceVendor.address2 = this.vendorService.listCollection.address2;
            this.sourceVendor.address3 = this.vendorService.listCollection.address3;
            this.sourceVendor.city = this.vendorService.listCollection.city;
            this.sourceVendor.country = this.vendorService.listCollection.country;
            this.sourceVendor.stateOrProvince = this.vendorService.listCollection.stateOrProvince;
            this.sourceVendor.PostalCode = this.vendorService.listCollection.postalCode;

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

        //if(!this.vendorService.isEditMode)
        //{            
        //    if(this.viewName == "Create")
        //    {
        //        this.vendorService.listCollection=[];
        //        this.local=[];
        //        this.sourceVendor="";
        //        this.vendorService.isEditMode=false;
        //    }         

        //}        

        // if(this.viewName == "Create")
        // {
        //     alert(this.viewName);
        //     this.form.reset();
        // }
        // else{
        //     alert(this.viewName);

        // }
    }

    ngOnInit(): void {
        
        this.sourceVendor.vendorTypeId=2;
        this.matSpinner = false;
        this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-general-information';
        this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);
        this.vendorService.ShowPtab = true;
        this.vendorService.alertObj.next(this.vendorService.ShowPtab);
        this.activeIndex = 0;
        this.vendorService.indexObj.next(this.activeIndex);
        this.loadData();
        this.Capabilitydata();
        this.countrylist();
        this.loadDataVendorData();
        this.getAllVendorCapabilities();
        this.getAllVendorClassification();
        this.getVendorClassificationByVendorrId();
        this.getAllIntegrations();
        this.getVendorIntegrationByVendorrId();

        this.options = {
            center: { lat: 36.890257, lng: 30.707417 },
            zoom: 12
        };
        this.sourceVendor.vendorTypeId = 1;
        if (this.vendorService.isEditMode == false) {
            this.sourceVendor.vendorTypeId = 2;
            this.viewName = "Create";
        }
        if (this.vendorService.enableExternal == false) {
            this.sourceVendor.vendorTypeId = 2;
        }

        if (this.vendorService.generalCollection) {
            this.sourceVendor = this.vendorService.generalCollection;
        }

        // this.integrationCols = [
        //     { field: '145.com', header: '145.com' },
        //     { field: 'Aeroxchange', header: 'Aeroxchange' },
        //     { field: 'AvRef', header: 'AvRef' },
        //     { field: 'ILS', header: 'ILS' },
        //     { field: 'partsBase', header: 'Parts base' },
        // ];
        if (!this.intSelectedColumns) {
            this.intSelectedColumns = this.cols;
        }
        this.CreateVendorOnClick();
        //console.log(this.sourceVendor, this.isEditMode, this.viewName, "vendor Information ");
       
        if (!this.vendorService.isReset) {   
            if(this.viewName !="Edit")
            {
                this.sourceVendor = {};
                this.sourceVendor.vendorTypeId=2;
            }            
        }
    }
    ngOnDestroy(): void {
        this.sourceVendor = {};
        this.vendorService.isReset = false;
    }
    sourceVendor: any = {};
    closethis() {
        this.closeCmpny = false;
    }
    public allWorkFlows: any[] = [];
    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.vendorService.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private onDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allActions = allWorkFlows;
    }

    //get Country List
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
    //Load Capability Data
    private Capabilitydata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.vendorService.getCapabilibylist().subscribe(
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
            }
        });
    }
    //Load Address 
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

    //getlatlng(address) {
    //    this.checkAddress = true;
    //    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB_W96L25HhFWgqLblcikircQKjU6bgTgk').subscribe((data: any) => {
    //        this.options = {
    //            center: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng },
    //            zoom: 12
    //        };
    //        this.overlays = [
    //            new google.maps.Marker({ position: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }, title: "Konyaalti" }),
    //        ];
    //        return data;
    //    });
    //}
    //Load Master Companies
    private loadMasterCompanies() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.masterComapnyService.getMasterCompanies().subscribe(
            results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allComapnies = allComapnies;
    }
    openClassification(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new VendorClassification();
        this.sourceAction.isActive = true;
        this.vendorName = "";
        this.vendorClassName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });

        // below line doing nothing
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    saveVendorClassificationDetails() {
        this.isSaving = true;
        if (this.vendorClassName.toLowerCase().trim() == "") {
            this.alertService.showMessage("Empty", 'Cannot Submit Empty', MessageSeverity.warn);
            return;
        }
        for (let i = 0; i < this.allVendorClassInfo.length; i++) {
            let vendorName = this.allVendorClassInfo[i].classificationName;
            if (vendorName.toLowerCase().localeCompare(this.vendorClassName.toLowerCase()) == 0) {
                this.alertService.showMessage("Duplicate", 'Already Exist', MessageSeverity.warn);
                return;
            }
            else {
            }
        }
        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.classificationName = this.vendorClassName;
            this.sourceAction.masterCompanyId = 1;
            this.vendorclassificationService.newVendorClassification(this.sourceAction).subscribe(data => {
                if (data) {
                    this.sourceVendor.vendorClassificationId = data.vendorClassificationId
                }
                this.alertService.showMessage("Success", 'Added New Vendor Classification Successfully.', MessageSeverity.success);

                this.loadDataVendorData();
            })
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

    async getAllVendorClassification() {
        await this.commonService.smartDropDownList('VendorClassification', 'VendorClassificationId', 'ClassificationName').subscribe(res => {
            this.allvendorclassificationInfo = res;
        });        
    }

    async  getVendorClassificationByVendorrId() {
       if(this.sourceVendor.vendorId >0)
       {
        await this.commonService.getClassificationMapping(this.sourceVendor.vendorId,3).subscribe(res => {
            this.sourceVendor.vendorClassificationIds = res.map(x => x.vendorClassificationId);
            
        });
       }
       
    }

   async getAllIntegrations() {
        await this.integrationService.getWorkFlows().subscribe(res => {
            const responseData = res[0]
             this.integrationOriginalList = responseData.map(x => {
                return {
                    label: x.description, value: x.integrationPortalId
                }
            })          

        })
    }


    async  getVendorIntegrationByVendorrId() {
       if(this.sourceVendor.vendorId >0)
       {
        await this.commonService.getIntegrationMapping(this.sourceVendor.vendorId,3).subscribe(res => {
            this.sourceVendor.integrationPortalIds = res.map(x => x.integrationPortalId);
            
        });
       }
       
    }
    

    //Load Vendor Data
    private loadDataVendorData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.vendorclassificationService.getActiveVendorClassificationEndpointList().subscribe(
            results => this.onVendorDataLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private onVendorDataLoad(getActiveVendorClassificationList: VendorClassification[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getActiveVendorClassificationList;
        this.allVendorClassInfo = getActiveVendorClassificationList;
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
        this.applyFilter(this.dataSource.filter);
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

    filterVendorCodes(event) {
        this.vendorCodes = [];
        for (let i = 0; i < this.allActions.length; i++) {
            let vendorCode = this.allActions[i].vendorCode;
            if (vendorCode.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.VendorCodesColl.push([{
                    "vendorId": this.allActions[i].vendorClassificationId,
                    "vendorCode": vendorCode
                }]),
                    this.vendorCodes.push(vendorCode);
            }
        }
    }

    private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.auditHisory = auditHistory;
        this.modal = this.modalService.open(content, { size: 'lg' });
        // does nothing here too
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
    }
    private loadGeneralObject() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.vendorService.getGeneralObj().subscribe(
            results => this.onGeneralObjUrl(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private onGeneralObjUrl(allWorkFlows: any) {
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
    }
    open(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.actionName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        //remove
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
    }
    editItemAndCloseModel(goNxt?: any) {
      
        this.isSaving = true;
        this.isEditMode = true;
        if (!(this.sourceVendor.vendorName && this.sourceVendor.vendorCode && this.sourceVendor.vendorEmail && this.sourceVendor.vendorPhone && this.sourceVendor.address1 && this.sourceVendor.city
            && this.sourceVendor.PostalCode && this.sourceVendor.country && this.sourceVendor.vendorClassificationIds
        )) {
            //this.display = true;
            this.modelValue = true;
        }
        if (this.sourceVendor.vendorName && this.sourceVendor.vendorCode && this.sourceVendor.vendorEmail && this.sourceVendor.vendorPhone && this.sourceVendor.address1 && this.sourceVendor.city
            && this.sourceVendor.PostalCode && this.sourceVendor.country && this.sourceVendor.vendorClassificationIds) {


            if (!this.sourceVendor.vendorId) {
                this.sourceVendor.createdBy = this.userName;
                this.sourceVendor.updatedBy = this.userName;
                this.sourceVendor.masterCompanyId = 1;
                this.sourceVendor.isActive = true;
                if (this.sourceVendor.parent == false || this.sourceVendor.parent == null) {
                    this.sourceVendor.vendorParentName = '';
                }
                
                this.vendorService.newAction(this.sourceVendor).subscribe(data => {
                    this.sourceVendor.updatedBy = this.userName;
                    this.localCollection = data;
                    this.sourceVendor = data;
                    this.sourceVendor.address1 = data.address.line1;
                    this.sourceVendor.address2 = data.address.line2;
                    this.sourceVendor.address3 = data.address.line3;
                    this.sourceVendor.city = data.address.city;
                    this.sourceVendor.country = data.address.country;
                    this.sourceVendor.stateOrProvince = data.address.stateOrProvince;
                    this.sourceVendor.PostalCode = data.address.postalCode;
                    this.vendorService.generalCollection = this.localCollection;
                    this.vendorService.contactCollection = this.localCollection;
                    this.vendorService.financeCollection = this.localCollection;
                    this.vendorService.paymentCollection = this.localCollection;
                    this.vendorService.shippingCollection = this.localCollection;
                    if (this.sourceVendor.isVendorAlsoCustomer == true) {
                        this.vendorService.isVendorAlsoCustomer = this.sourceVendor.isVendorAlsoCustomer;
                        this.vendorService.localCollectiontoCustomer = this.sourceVendor;
                    }
                    this.viewName="Edit";
                    this.vendorService.isEditMode=true;
                    this.activeIndex = 0;
                    this.vendorService.indexObj.next(this.activeIndex);
                    this.savesuccessCompleted(this.sourceVendor, goNxt);
                })
            }

            else {
                this.sourceVendor.updatedBy = this.userName;
                if (this.sourceVendor.parent == false || this.sourceVendor.parent == null) {
                    this.sourceVendor.vendorParentName = '';
                }
                this.vendorService.updateVendorDetails(this.sourceVendor).subscribe(
                    data => {
                        this.sourceVendor.updatedBy = this.userName;
                        this.localCollection = data;
                        this.sourceVendor = data;
                        this.sourceVendor.address1 = data.address.line1;
                        this.sourceVendor.address2 = data.address.line2;
                        this.sourceVendor.address3 = data.address.line3;
                        this.sourceVendor.city = data.address.city;
                        this.sourceVendor.country = data.address.country;
                        this.sourceVendor.stateOrProvince = data.address.stateOrProvince;
                        this.sourceVendor.PostalCode = data.address.postalCode;
                        this.vendorService.generalCollection = this.localCollection;
                        this.vendorService.contactCollection = this.localCollection;
                        this.vendorService.financeCollection = this.localCollection;
                        this.vendorService.paymentCollection = this.localCollection;
                        this.vendorService.shippingCollection = this.localCollection;
                        this.activeIndex = 0;
                        this.vendorService.indexObj.next(this.activeIndex);
                        this.savesuccessCompleted(this.sourceVendor, goNxt);
                    })
            }
        }
        else {
        }
        

    }

    nextClick() {
        this.vendorService.vendorgeneralcollection = this.local;
        this.activeIndex = 1;
        this.vendorService.indexObj.next(this.activeIndex);
        this.vendorService.changeStep('Contacts');
        this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-contacts');
    }

    CreateVendorOnClick() {
        this.activeIndex = 1;
        this.vendorService.indexObj.next(this.activeIndex);
        this.vendorService.changeStep('General Information');
        this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');
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

    private savesuccessCompleted(user?: any, goNxt?: any) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);
        if (goNxt === 'goNext') {
            this.nextClick();
        }
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
        for (let i = 0; i < this.VendorNamecoll.length; i++) {
            if (event == this.VendorNamecoll[i][0].vendorName) {
                this.disableSaveVenName = true;
                this.disableSave = true;
                this.disableSaveVenderName = true;
                this.selectedActionName = event;
            }
        }
    }

    checkVendorExist() {
        this.disableSaveVenderName = false;
        for (let i = 0; i < this.VendorNamecoll.length; i++) {
            if (this.sourceVendor.vendorName == this.VendorNamecoll[i][0].vendorName) {
                this.disableSaveVenName = true;
                this.disableSave = true;
                this.disableSaveVenderName = true;
                this.selectedActionName = event;
                return;
            }
        }

    }

    eventvendorHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedVendorCode) {
                if (value == this.selectedVendorCode.toLowerCase()) {
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
                    this.disablesave = false;
                    this.selectedCountries = event;
                }
            }
        }
    }
    //Added by Vijay For Capabilities dropdown binding

    getAllVendorCapabilities(): void {

        this.commonService.smartDropDownList('VendorCapabiliy', 'VendorCapabilityId', 'capabilityDescription').subscribe(res => {
            this.dropDownVendorCapabilitiesList = res;
        })
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
        if (this.allCountryinfo.length > 0) {
            for (let i = 0; i < this.allCountryinfo.length; i++) {
                let countryName = this.allCountryinfo[i].nice_name;
                if (countryName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.countrycollection.push(countryName);
                }
            }
        }
    }

    parentEventHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {
                    this.disableSaveParentName = false;

                }
                else {
                    this.disableSaveParentName = true;

                }
            }

        }
    }

    onParentNameselected(event) {
        if (this.allActions) {
            for (let i = 0; i < this.allActions.length; i++) {
                if (event == this.allActions[i].vendorName) {
                    this.sourceVendor.vendorParentName = event;

                    this.disableSaveParentName = false;

                    this.selectedActionName = event;
                }

            }
        }
    }

    onClassificationelected(event) {
        if (this.allVendorClassInfo) {
            for (let i = 0; i < this.allVendorClassInfo.length; i++) {
                if (event == this.allVendorClassInfo[i].classificationName) {
                    this.sourceVendor.vendorClassificationId = event;
                    this.disablesaveForClassification = true;
                    this.selectedClass = event;
                }
            }
        }
    }
    
    eventClassificationHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedClass) {
                if (value == this.selectedClass.toLowerCase()) {
                    this.disablesaveForClassification = true;
                }
                else {
                    this.disablesaveForClassification = false;
                }
            }
        }
    }

    onAddIntegrationWith() {
        this.router.navigate(['/singlepages/singlepages/app-integration']);
    }

    onAddCapabilities() {
        this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-capabilities-list');
    }

    patternMobilevalidationWithSpl(event: any) {
        const pattern = /[0-9\+\-()\ ]/;
    
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
        }
        
      }

    

}