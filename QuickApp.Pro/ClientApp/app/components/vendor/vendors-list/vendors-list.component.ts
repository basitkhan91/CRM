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
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import $ from "jquery";

@Component({
    selector: 'app-vendors-list',
    templateUrl: './vendors-list.component.html',
    styleUrls: ['./vendors-list.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class VendorsListComponent implements OnInit {
    activeIndex: number;
    vendorCode: any = "";
    vendorname: any = "";
    vendorEmail: any = "";
    VendorTypeId: any = "";
    allgeneralInfo: any[];
    collection: any;
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createddate: any = "";
    updatedDate: any = "";
    sub: any;
    local: any;
    vendorName: any;
    lastName: any = "";
    firstName: any = "";
    contactTitle: any = "";
    email: any = "";
    mobilePhone: number;
    fax: any = "";
    vendorTypeId: any = "";
    description: any = "";
    doingBusinessAsName: any = "";
    parent: any = "";
    vendorParentName: any = "";
    address1: any = "";
    address2: any = "";
    //address3: any = "";
    city: any = "";
    stateOrProvince: any = "";
    postal: any = "";
    country: any = "";
    classificationName: any = "";
    isPreferredVendor: any = "";
    vendorContractReference: any = "";
    licenseNumber: any = "";
    capabilityId: any = "";
    vendorCapabilityName: any = "";
    vendorURL: any = "";
    postalCode: any = "";
    vendorClassificationId: any = "";
    vendorClassificationName: any = "";
    creditlimit: any = "";
    creditTermsId: any = "";
    currencyId: any = "";
    discountLevel: any = "";
    vendorPhoneNo: any = "";
    vendorPhoneExt: any = "";
    is1099Required: any = "";      
    showGeneralData: boolean = true;
    showcontactdata: boolean = true;
    showfinancialdata: boolean = true;
    allContacts: any[] = [];
    allpayments: any[] = [];
    selectedPaymentColumns: any[];
    allShippings: any[];  
    shippingCol: any[];
    selectedShippingColumns: any[];
    selectedRow: any;
    billingInfoList: any[];
    selectedBillingColumns: any[];
    billingCol: any[];
    warningInfoList: any[];
    selectedWarningColumns: any[];
    warninggCol: any[];
    allVendorPOROList: any[];
    memoCols:any[];
    vendorDocumentsData: any=[];
    vendorDocumentsColumns :any[];    
    totalRecords: number = 0;
    totalPages: number = 0;
    pageSize: number = 10;
    pageIndex: number = 0;
    isVendorList: boolean;
    @Input() isCreatePO: boolean;
    @Input() isCreateRO: boolean;
    purchaseOrderList: any = [];
    poCols: any = [];
    selectedPOColumns: any[];
    selectedPOColumn: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    filteredBrands: any[];
    displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<any>;
    allVendorList: any[] = [];
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    public sourceVendor: any = {};
    public domesticSaveObj: Object = {
    }
    public internationalSaveObj: Object = {
    }
    public sourceAction: any = [];
    public auditHisory: AuditHistory[] = [];
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    selectedColumn: any[];
    selectedColumns: any[];
    selectedContactColumns: any[];
    cols: any[];
    contactcols: any[];
    paymentcols: any[];
    title: string = "Create";
    id: number;
    errorMessage: any;
    modal: NgbModalRef;
    actionName: string;
    Active: string = "Active";
    length: number;
    localCollection: any;  
    //updateActiveData: any;
    updateActiveData = {
		vendorId:0,
		updatedBy: '',
        isActive: false,
        isdelete:false
	}
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    public allWorkFlows: any[] = [];

    constructor(private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: VendorService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.local = this.workFlowtService.financeCollection;
        this.dataSource = new MatTableDataSource();
        this.workFlowtService.listCollection = null;
    }

    ngOnInit() {
        this.loadData();
        this.workFlowtService.currentUrl = '/vendorsmodule/vendorpages/app-vendors-list';
        this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
        this.workFlowtService.ShowPtab = false;
        this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab);
        this.isVendorList = true;

        this.poCols = [
            { field: 'status', header: 'Status' },            
            { field: 'numOfItems', header: 'No of Items' },
            { field: 'purchaseOrderNumber', header: 'PO Num' },
            { field: 'openDate', header: 'Open Date' },
            { field: 'closedDate', header: 'Closed/Cancelled Date' },
            { field: 'vendorName', header: 'Vendor Name' },
            { field: 'vendorCode', header: 'Vendor Code' },            
            { field: 'requestedBy', header: 'Requested By' },
            { field: 'approvedBy', header: 'Approved By' }
        ];
        this.selectedPOColumns = this.poCols;
    }

    public navigateTogeneralInfo() {
        this.activeIndex = 0;
        this.workFlowtService.indexObj.next(this.activeIndex);
        this.workFlowtService.isEditMode = false;
        this.workFlowtService.enableExternal = false;
        this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information')

    }

    //Load Data for Vendor List

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getVendorList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.cols = [
            { field: 'vendorName', header: 'Vendor Name' },
            { field: 'vendorCode', header: 'Vendor Code' },
            { field: 'description', header: 'Vendor Type' },
            { field: 'stateOrProvince', header: 'Vendor Classification' },
            { field: 'vendorEmail', header: 'Vendor Email' },
            { field: 'city', header: 'Vendor City' },
            { field: 'stateOrProvince', header: 'Vendor State' },
            { field: 'vendorPhoneContact', header: 'Vendor Contact' }
            // { field: 'createdBy', header: 'Created By' },
            // { field: 'updatedBy', header: 'Updated By' },
            // { field: 'updatedDate', header: 'Updated Date' },
            // { field: 'createdDate', header: 'Created Date' }
        ];
        this.selectedColumns = this.cols;
    }

    private onDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allVendorList = allWorkFlows;
        if (allWorkFlows.length > 0) {
            this.totalRecords = allWorkFlows.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        }
    }

    //load master Companies

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

    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue;
    }
    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceVendor = rowData;
            this.Active = "In Active";
            this.workFlowtService.updateContactinfo(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
        }
        else {
            this.sourceVendor = rowData;
            this.Active = "Active";
            this.workFlowtService.updateContactinfo(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
        }

    }

    handleChanges(rowData, e) {
      
        this.updateActiveData.updatedBy = this.userName;
        this.updateActiveData.vendorId = rowData.vendorId;
      
        if (e.checked == false) {
            this.sourceVendor = rowData;
           // this.sourceVendor.updatedBy = this.userName;
            this.Active = "In Active";
            this.updateActiveData.isActive = false;
            //this.sourceVendor.isActive == false;
            this.workFlowtService.updateActionforActive(this.updateActiveData).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
        }
        else {
            //this.sourceVendor = rowData;
            //this.sourceVendor.updatedBy = this.userName;
            this.Active = "Active";
            //this.sourceVendor.isActive == true;
            this.updateActiveData.isActive = true;
            this.workFlowtService.updateActionforActive(this.updateActiveData).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
        }
    }

    private refresh() {
        this.applyFilter(this.dataSource.filter);
    }

    private ongeneralDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allgeneralInfo = allWorkFlows;
        this.vendorname = this.allgeneralInfo[0].vendorName;
        this.vendorCode = this.allgeneralInfo[0].vendorCode;
        console.log(this.allgeneralInfo);
    }

    filterActions(event) {
        this.localCollection = [];
        for (let i = 0; i < this.allVendorList.length; i++) {
            let actionName = this.allVendorList[i].description;
            if (actionName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.localCollection.push(actionName);
            }
        }
    }

    private onHistoryLoadSuccessful(auditHistory: any, content) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.auditHisory = auditHistory;
        this.modal = this.modalService.open(content, { size: 'lg' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
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
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openGeneralInfo() {
        this.showGeneralData = true;
        this.showcontactdata = false;
        this.showfinancialdata = false;
    }
    openFinancialInfo() {
        this.showGeneralData = false;
        this.showcontactdata = false;
        this.showfinancialdata = true;
    }

    openDelete(content1, rowData) {
        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceVendor = rowData;
        this.modal = this.modalService.open(content1, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    //View Edit
    openEdit(row) {
        this.isEditMode = true;
        this.workFlowtService.isEditMode = true;
        this.isSaving = true;
        this.sourceVendor = row;
        this.workFlowtService.isReset = true;
        this.loadMasterCompanies();
        this.workFlowtService.listCollection = this.sourceVendor;
        this.activeIndex = 0;
        this.workFlowtService.enableExternal = true;
        this.workFlowtService.indexObj.next(this.activeIndex);
        this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');
    }
    private loadContactDataData(vendorId) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getContacts(vendorId).subscribe(
            results => this.onContactDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.contactcols = [
            { field: 'firstName', header: 'First Name' },
            { field: 'lastName', header: 'Last  Name' },
            { field: 'contactTitle', header: 'Contact Title' },
            { field: 'email', header: 'Email' },
            { field: 'mobilePhone', header: 'Mobile Phone' },
            { field: 'fax', header: 'Fax' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
            { field: 'updatedDate', header: 'Updated Date' },
            { field: 'createdDate', header: 'Created Date' }
        ];
        this.selectedContactColumns = this.contactcols;
    }
    //load Shipping Data
    private loadShippingData(vendorId) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getVendorShipAddressGet(vendorId).subscribe(
            results => this.onShippingDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.shippingCol = [
            { field: 'siteName', header: 'Site Name' },
            { field: 'address1', header: 'Address1' },
            { field: 'address2', header: 'Address2' },
            //{ field: 'address3', header: 'Address3' },
            { field: 'city', header: 'City' },
            { field: 'stateOrProvince', header: 'State/Prov' },
            { field: 'postalCode', header: 'Postal Code' },
            { field: 'country', header: 'Country' }
        ];

        this.selectedShippingColumns = this.shippingCol;
    }

   private loadBillingData(vendorId) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getVendorBillAddressGet(vendorId).subscribe(
            results => this.onBillingDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
      

        this.billingCol = [
            { field: 'siteName', header: 'Site Name' },
            { field: 'address1', header: 'Address1' },
            { field: 'address2', header: 'Address2' },           
            { field: 'city', header: 'City' },
            { field: 'stateOrProvince', header: 'State/Prov' },
            { field: 'postalCode', header: 'Postal Code' },
            { field: 'country', header: 'Country' }
        ];

        this.selectedBillingColumns = this.billingCol;
    }

     private loadWarningsData(vendorId) {
        this.workFlowtService.getVendorWarnings(vendorId).subscribe(
            data => {
             this.warningInfoList = data[0].map(x => {
            return {
                ...x,
                sourceModule: `${x.t.sourceModule == null ?'': x.t.sourceModule}`, 
                warningMessage: `${x.t.warningMessage == null ?'': x.t.warningMessage}`,    
                restrictMessage: `${x.t.restrictMessage == null ?'': x.t.restrictMessage}`   
                };
            });
              
            });

            this.warninggCol = [
                { field: 'sourceModule', header: 'Module' },
                { field: 'warningMessage', header: 'Warning Message' },
                { field: 'restrictMessage', header: 'Restrict Message' }          
              
            ];    
            this.selectedWarningColumns = this.warninggCol;


    }

    private loadMemosData(vendorId) {

      this.workFlowtService.getVendorPOMemolist(vendorId).subscribe(
            res => {             
                this.allVendorPOROList = res;              
        });

        this.workFlowtService.getVendorROMemolist(vendorId).subscribe(
            res => {        
                for (let value of res) {
                    this.allVendorPOROList.push(value);
                }                    
        });

    this.memoCols = [
		{ field: 'module', header: 'Module' },			
		{ field: 'orderNumber', header: 'Id' },
        { field: 'notes', header: 'Memo text' }  
        ];    
   }  


   private loadVendorDocumentsData(vendorId){

    this.workFlowtService.getDocumentList(vendorId).subscribe(res => {
        this.vendorDocumentsData = res;			
    });

    this.vendorDocumentsColumns = [
		{ field: 'docName', header: 'Name' },
		{ field: 'docDescription', header: 'Description' },
		//{ field: 'documents', header: 'Documents' },
		{ field: 'docMemo', header: 'Memo' }
	];
   }

    private onBillingDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.billingInfoList = allWorkFlows;      
    }

    private onShippingDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allShippings = allWorkFlows;
    }

    private onContactDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allContacts = allWorkFlows;
    }
    //Load Payment Data
    private loadPayamentData(vendorId) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getCheckPaymentobj(vendorId).subscribe(
            results => this.onPaymentDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
        this.paymentcols = [
            { field: 'siteName', header: 'Site Name' },
            { field: 'address1', header: 'Address' },
            { field: 'city', header: 'City' },
            { field: 'stateOrProvince', header: 'State/Prov' },
            { field: 'postalCode', header: 'Postal Code' },
            { field: 'country', header: 'Country' }
        ];
        this.selectedPaymentColumns = this.paymentcols;
    }
    private onPaymentDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allpayments = allWorkFlows;
    }

    openView(content, row) {       
        this.vendorCode = row.vendorCode;
        this.vendorName = row.vendorName;
        this.vendorTypeId = row.t.vendorTypeId;
        this.description=row.description;
        console.log(this.vendorClassificationName);
        this.doingBusinessAsName = row.t.doingBusinessAsName;
        this.parent = row.t.parent;
      
        this.vendorParentName=row.t.vendorParentName;
        if (row.currency) {
            this.currencyId = row.currency.symbol;
        }
        else {
            this.currencyId = row.currencyId;
        }

        if (row.creditterms) {
            this.creditTermsId = row.creditterms.name;
        }
        else {
            this.creditTermsId = row.creditTermsId;
        }
       
        this.address1 = row.address1;
        this.address2 = row.address2;
       // this.address3 = row.address3;
        this.city = row.city;
        this.stateOrProvince = row.stateOrProvince;
        this.postalCode = row.postalCode;
        this.country = row.country;
        this.vendorPhoneNo = row.t.vendorPhone;
        this.vendorPhoneExt = row.t.vendorPhoneExt;
        this.vendorEmail = row.vendorEmail;
        //this.vendorClassificationId = row.t.vendorClassificationId;
        this.vendorClassificationName = row.classificationName;
        this.vendorContractReference = row.t.vendorContractReference;
        this.isPreferredVendor = row.t.isPreferredVendor;
        this.licenseNumber = row.t.licenseNumber;
        this.capabilityId = row.capabilityId;
        this.vendorCapabilityName=row.vendorCapabilityName;
        this.vendorURL = row.t.vendorURL;
        this.creditlimit = row.t.creditLimit;        
        this.discountLevel = row.discountLevel;
        this.is1099Required = row.t.is1099Required;
        this.loadContactDataData(row.vendorId);
        this.loadPayamentData(row.vendorId);
        this.loadShippingData(row.vendorId);
        this.loadBillingData(row.vendorId);
        this.loadWarningsData(row.vendorId);
        this.loadMemosData(row.vendorId);
        this.loadVendorDocumentsData(row.vendorId);
        this.modal = this.modalService.open(content, { size: 'lg' });
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
        this.isSaving = true;
        this.selectedRow = row;
        this.workFlowtService.vendorHistory(this.sourceVendor.vendorId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));
    }
    AddPage() {
        this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');
    }
    deleteItemAndCloseModel() {       
       
        this.isSaving = true;
        this.isDeleteMode = true;
        this.updateActiveData.vendorId=this.sourceVendor.vendorId;
        //this.sourceVendor.isdelete = true;
        this.updateActiveData.isdelete=true;
        //this.sourceVendor = content;
        this.updateActiveData.updatedBy = this.userName;
        this.workFlowtService.updatevendorstatus(this.updateActiveData).subscribe(
            response => this.saveCompleted(this.sourceVendor),
            error => this.saveFailedHelper(error));
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
    handleChangesforcontacts(rowData, e) {
        if (e.checked == false) {
            this.sourceVendor = rowData;
            this.sourceVendor.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceVendor.isActive == false;
            this.workFlowtService.updateContactforActive(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
        }
        else {
            this.sourceVendor = rowData;
            this.sourceVendor.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceVendor.isActive == true;
            this.workFlowtService.updateContactforActive(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
        }
    }
    opencontactView(content, row) {
        this.sourceVendor = row;
        this.firstName = row.firstName;
        this.lastName = row.lastName;
        this.contactTitle = row.contactTitle;
        this.email = row.email;
        this.mobilePhone = row.mobilePhone;
        this.fax = row.fax;
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

    deleteItemAndCloseModelforContact(contactId) {
        this.isSaving = true;
        this.workFlowtService.deleteContact(contactId).subscribe(
            response => this.saveCompleted(this.sourceVendor),
            error => this.saveFailedHelper(error));
    }
    openEditforcontact(content, row) {
        this.isEditMode = true;
        this.isSaving = true;
        this.sourceVendor = row;
        this.loadMasterCompanies();
    }
    openViewforfinance(content, row) {
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'lg' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    handleChangesforcontact(rowData, e) {
        if (e.checked == false) {
            this.sourceVendor = rowData;
            this.sourceVendor.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceVendor.isActive == false;
            this.workFlowtService.updateContactforActive(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
        }
        else {
            this.sourceVendor = rowData;
            this.sourceVendor.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceVendor.isActive == true;
            this.workFlowtService.updateContactforActive(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
        }
    }

    openHistforcontact(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.sourceVendor = row;
        this.isSaving = true;
        this.workFlowtService.historyAcion(this.sourceVendor.contactId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));
    }
    openContactList(content, row) {
        this.selectedRow = row;
        this.modal = this.modalService.open(content, { size: 'lg' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
        this.loadContactDataData(row.vendorId);
    }

    ExpandAllVenodrDetailsModel()
    {
        $('#step1').collapse('show');
        $('#step2').collapse('show');
        $('#step3').collapse('show');
        $('#step4').collapse('show');
        $('#step5').collapse('show');
        $('#step6').collapse('show');
        $('#step7').collapse('show');

        $('#step9').collapse('show');
        $('#step10').collapse('show');
    }
    CloseAllVenodrDetailsModel()
    {
        $('#step1').collapse('hide');
        $('#step2').collapse('hide');
        $('#step3').collapse('hide');
        $('#step4').collapse('hide');
        $('#step5').collapse('hide');
        $('#step6').collapse('hide');
        $('#step7').collapse('hide');

        $('#step9').collapse('hide');
        $('#step10').collapse('hide');
    }

    gotoCreatePO(rowData) {
		console.log(rowData);		
        const { vendorId } = rowData;
        this.route.navigateByUrl(`vendorsmodule/vendorpages/app-purchase-setup/vendor/${vendorId}`);
    }    
    gotoCreateRO(rowData) {
        const { vendorId } = rowData;
        this.route.navigateByUrl(`vendorsmodule/vendorpages/app-ro-setup/vendor/${vendorId}`);
    }

}