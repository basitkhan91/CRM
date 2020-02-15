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
import { ConfigurationService } from '../../../services/configuration.service';
import { VendorCapabilitiesService } from '../../../services/vendorcapabilities.service';
import { MenuItem } from 'primeng/api';
import { listSearchFilterObjectCreation } from '../../../generic/autocomplete';

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
    // description: any = "";
    // doingBusinessAsName: any = "";
    // parent: any = "";
    // vendorParentName: any = "";
    // address1: any = "";
    // address2: any = "";
    //address3: any = "";
    // city: any = "";
    // stateOrProvince: any = "";
    // postal: any = "";
    // country: any = "";
    // classificationName: any = "";
    // isPreferredVendor: any = "";
    // vendorContractReference: any = "";
    // licenseNumber: any = "";
    // capabilityId: any = "";
    // vendorCapabilityName: any = "";
    // vendorURL: any = "";
    // postalCode: any = "";
    // vendorClassificationId: any = "";
    // vendorClassificationName: any = "";
    creditlimit: any = "";
    creditTermsId: any = "";
    currencyId: any = "";
    discountLevel: any = "";
    // vendorPhoneNo: any = "";
    // vendorPhoneExt: any = "";
    is1099Required: any = "";
    isCertified: boolean = false;
    // isVendorAudit: boolean = false;
    // isVendorCustomer:any="";
    showGeneralData: boolean = true;
    showcontactdata: boolean = true;
    showfinancialdata: boolean = true;
    allContacts: any[] = [];
    allpayments: any[] = [];
    selectedPaymentColumns: any[];
    allShippings: any[] = [];
    shippingCol: any[];
    selectedShippingColumns: any[];
    selectedRow: any;
    billingInfoList: any[] = [];
    selectedBillingColumns: any[];
    billingCol: any[];
    warningInfoList: any[] = [];
    selectedWarningColumns: any[];
    warninggCol: any[];
    allVendorPOROList: any[] = [];
    memoCols: any[];
    vendorDocumentsData: any = [];
    vendorDocumentsColumns: any[];
    totalRecords: number = 0;
    totalPages: number = 0;
    pageSize: number = 10;
    pageIndex: number = 0;
    isVendorList: boolean;
    @Input() isCreatePO: boolean = false;
    @Input() isCreateRO: boolean = false;
    purchaseOrderList: any = [];
    poCols: any = [];
    selectedPOColumns: any[];
    selectedPOColumn: any[];
    // isAllowNettingAPAR: boolean = false;
    vendorStatus: boolean = false;
    isIsBillingAddress: boolean = false;
    isIsShippingAddress: boolean = false;
    vendorcreatedBy: any;
    vendorCreatedDate: any;
    vendorIntegration: any;
    edi: boolean = false;
    aeroExchange: boolean = false;
    ediDescription: any;
    aeroExchangeDesc: any;
    vendorProcess1099Data: any;
    checkedCheckboxesList: any = [];
    status: string = 'active';

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    filteredBrands: any[];
    displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<any>;
    allVendorList: any[] = [];
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    public sourceVendor: any = {};
    public domesticSaveObj: any = {};
    public internationalSaveObj: any = {};
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
    allVendorGeneralDocumentsList: any = [];
    //updateActiveData: any;
    updateActiveData = {
        vendorId: 0,
        updatedBy: '',
        isActive: false,
        isdeleted: false
    }
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    public allWorkFlows: any[] = [];
    isEnablePOList: boolean = true;
    isEnableROList: boolean = true;
    vendorId: number;
    isActive: boolean = false;
    defaultPaymentData: any = {};
    internationalwithVendor: any[];
    defaultwithVendor: any[];
    domesticWithVedor: any[];
    paymentTypeName: any;
    allvendorCapsList: any[] = [];
    selectedCapsColumns: any[];
    capsCols: any[];
    vendorCapesGeneralInfo: any = {};
    aircraftListDataValues: any;
    colsaircraftLD: any[] = [
        { field: "aircraft", header: "Aircraft" },
        { field: "model", header: "Model" },
        { field: "dashNumber", header: "Dash Numbers" },
        { field: "memo", header: "Memo" }
    ];
    breadcrumbs: MenuItem[];

    sourceViewforDocument: any;
    sourceViewforDocumentList: any = [];
    vendorData: any = {};
    viewPageSize: number = 5;
    lazyLoadEventData: any;
    lazyLoadEventDataInput: any;
    filterText: any = '';
    globalfilter: string;
    isViewMode: boolean = true;
    // purchaseOrderData: any;
    // poPageSize: number = 10;
    // poPageIndex: number = 0;

    constructor(private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public vendorService: VendorService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private configurations: ConfigurationService, private vendorCapesService: VendorCapabilitiesService) {
        this.local = this.vendorService.financeCollection;
        this.dataSource = new MatTableDataSource();
        this.vendorService.listCollection = null;
    }

    ngOnInit() {
        // this.loadData();
        this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-vendors-list';
        this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);
        this.vendorService.ShowPtab = false;
        this.vendorService.alertObj.next(this.vendorService.ShowPtab);
        this.isVendorList = true;

        this.breadcrumbs = [
            { label: 'Vendors' },
            { label: 'Vendors List' },
        ];

        this.cols = [
            { field: 'vendorName', header: 'Vendor Name' },
            { field: 'vendorCode', header: 'Vendor Code' },
            { field: 'description', header: 'Vendor Type' },
            // { field: 'vendorRanking', header: 'Vendor Ranking' },
            { field: 'classificationName', header: 'Vendor Classification' },
            { field: 'vendorCapabilityName', header: 'Vendor Capabilities' },
            { field: 'vendorEmail', header: 'Email' },
            { field: 'city', header: 'Vendor City' },
            { field: 'stateOrProvince', header: 'Vendor State' },
            { field: 'vendorPhoneContact', header: 'Vendor Contact' }
            // { field: 'createdBy', header: 'Created By' },
            // { field: 'updatedBy', header: 'Updated By' },
            // { field: 'updatedDate', header: 'Updated Date' },
            // { field: 'createdDate', header: 'Created Date' }
        ];
        this.selectedColumns = this.cols;

        // this.poCols = [
        //     { field: 'purchaseOrderNumber', header: 'PO Num' },
        //     { field: 'openDate', header: 'Open Date' },
        //     { field: 'closedDate', header: 'Closed/Cancelled Date' },
        //     { field: 'vendorName', header: 'Vendor Name' },
        //     { field: 'vendorCode', header: 'Vendor Code' },
        //     { field: 'status', header: 'Status' },
        //     { field: 'requestedBy', header: 'Requested By' },
        //     { field: 'approvedBy', header: 'Approved By' }
        // ];
        // this.selectedPOColumns = this.poCols;
    }

    navigateTogeneralInfo() {
        this.vendorService.isEditMode = false;
        this.vendorService.ShowPtab = true;
        this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-general-information';
        this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);
        this.vendorService.alertObj.next(this.vendorService.ShowPtab);
        this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');
        this.vendorService.listCollection = undefined;
        // this.vendorService.changeofTab(1);
        // this.vendorService.isEditMode = false;
        // this.vendorService.enableExternal = false;
        // this.activeIndex = 0;
        // this.vendorService.indexObj.next(this.activeIndex);
        // this.vendorService.isEditMode = false;
        // this.vendorService.enableExternal = false;
        // this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information')

    }

    //Load Data for Vendor List

    loadData(event) {
        //this.lazyLoadEventData = null;
        this.lazyLoadEventData = event;
        const pageIndex = parseInt(event.first) / event.rows;;
        this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        event.first = pageIndex;
        this.lazyLoadEventDataInput = event;
        //openDate: this.todayDate
        // if(this.isEnablePOList) {
        //     this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, vendorId: this.vendorId }
        // }
        if (this.isCreatePO || this.isCreateRO) {
            // this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, status: 'active' }
            this.isActive = true;
        }
        console.log(this.filterText);
        if (this.filterText == '') {
            this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, status: this.status }
            const PagingData = { ...this.lazyLoadEventDataInput, filters: listSearchFilterObjectCreation(this.lazyLoadEventDataInput.filters) }
            this.getList(PagingData);
        } else {
            this.globalSearch(this.filterText);
        }
        console.log(event);
    }

    getList(data) {
        this.vendorService.getAllVendorList(data).subscribe(res => {
            console.log(res);
            const vList: any = res[0];
            this.allVendorList = vList;
            if (this.allVendorList.length > 0) {
                this.totalRecords = vList[0].totalRecords;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            } else {
                this.totalRecords = 0;
                this.totalPages = 0;
            }
        })
    }

    globalSearch(value) {
        this.pageIndex = 0;
        this.filterText = value;
        this.vendorService.vendorListGlobalSearch(value, this.pageIndex, this.pageSize, this.isActive).subscribe(res => {
            this.pageIndex = 0;
            this.allVendorList = res;
            if (this.allVendorList.length > 0) {
                this.totalRecords = res[0].totalRecords;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }
        })
    }

    resetGlobalFilter() {
        this.filterText = '';
        this.globalfilter = '';
    }

    getVenListByStatus(status) {
        this.status = status;
        this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, status: status };
        const PagingData = { ...this.lazyLoadEventDataInput, filters: listSearchFilterObjectCreation(this.lazyLoadEventDataInput.filters) }
        this.getList(PagingData);
    }

    // private loadData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     if (!this.isCreatePO && !this.isCreateRO) {
    //         this.isActive = false;
    //     }

    //     // this.vendorService.getAllVendorList(data).subscribe(res => {
    //     //     console.log(res);            
    //     // })
    //     this.vendorService.getVendorListForVendor(this.isActive).subscribe(
    //         results => this.onDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );


    // }

    // private onDataLoadSuccessful(allWorkFlows: any[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allVendorList = allWorkFlows;
    //     if (allWorkFlows.length > 0) {
    //         this.totalRecords = allWorkFlows.length;
    //         this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    //     }
    // }

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
            this.vendorService.updateContactinfo(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
        }
        else {
            this.sourceVendor = rowData;
            this.Active = "Active";
            this.vendorService.updateContactinfo(this.sourceVendor).subscribe(
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
            this.vendorService.updateActionforActive(this.updateActiveData).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
        }
        else {
            //this.sourceVendor = rowData;
            //this.sourceVendor.updatedBy = this.userName;
            this.Active = "Active";
            //this.sourceVendor.isActive == true;
            this.updateActiveData.isActive = true;
            this.vendorService.updateActionforActive(this.updateActiveData).subscribe(
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
        console.log(this.auditHisory);
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    getColorCodeForHistory(i, field, value) {
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
        this.modal = this.modalService.open(content1, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    //View Edit
    openEdit(row) {
        this.vendorService.checkVendorEditmode(true);
        // this.isEditMode = true;
        // this.vendorService.isEditMode = true;
        // this.isSaving = true;
        // this.sourceVendor = row;
        // this.vendorService.isReset = true;
        // // this.loadMasterCompanies();
        // this.vendorService.listCollection = this.sourceVendor;
        // this.activeIndex = 0;
        // this.vendorService.enableExternal = true;
        // this.vendorService.indexObj.next(this.activeIndex);
        const { vendorId } = row;
        this.route.navigateByUrl(`/vendorsmodule/vendorpages/app-vendor-general-information/edit/${vendorId}`);
        // this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');
    }
    private loadContactDataData(vendorId) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.vendorService.getContacts(vendorId).subscribe(
            results => this.onContactDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.contactcols = [
            { field: 'firstName', header: 'First Name' },
            { field: 'lastName', header: 'Last  Name' },
            { field: 'contactTitle', header: 'Contact Title' },
            { field: 'email', header: 'Email' },
            //{ field: 'mobilePhone', header: 'Mobile Phone' },
            { field: 'mobilePhone', header: 'Mobile Phone' },
            { field: 'fullContactNo', header: 'Work Phone' },
            { field: 'fax', header: 'Fax' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
            { field: 'updatedDate', header: 'Updated Date' },
            { field: 'createdDate', header: 'Created Date' }
        ];
        this.selectedContactColumns = this.contactcols;
    }
    //load Shipping Data
    // private loadShippingData(vendorId) {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.vendorService.getVendorShipAddressGet(vendorId).subscribe(
    //         results => this.onShippingDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    //     this.shippingCol = [
    //         { field: 'siteName', header: 'Site Name' },
    //         { field: 'address1', header: 'Address1' },
    //         { field: 'address2', header: 'Address2' },
    //         //{ field: 'address3', header: 'Address3' },
    //         { field: 'city', header: 'City' },
    //         { field: 'stateOrProvince', header: 'State/Prov' },
    //         { field: 'postalCode', header: 'Postal Code' },
    //         { field: 'countryName', header: 'Country' }
    //     ];

    //     this.selectedShippingColumns = this.shippingCol;
    // }

    // private loadBillingData(vendorId) {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.vendorService.getVendorBillAddressGet(vendorId).subscribe(
    //         results => this.onBillingDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );


    //     this.billingCol = [
    //         { field: 'siteName', header: 'Site Name' },
    //         { field: 'address1', header: 'Address1' },
    //         { field: 'address2', header: 'Address2' },
    //         { field: 'city', header: 'City' },
    //         { field: 'stateOrProvince', header: 'State/Prov' },
    //         { field: 'postalCode', header: 'Postal Code' },
    //         { field: 'countryName', header: 'Country' }
    //     ];

    //     this.selectedBillingColumns = this.billingCol;
    // }

    private loadWarningsData(vendorId) {
        this.vendorService.getVendorWarnings(vendorId).subscribe(
            data => {
                this.warningInfoList = data[0].map(x => {
                    return {
                        ...x,
                        sourceModule: `${x.t.sourceModule == null ? '' : x.t.sourceModule}`,
                        warningMessage: `${x.t.warningMessage == null ? '' : x.t.warningMessage}`,
                        restrictMessage: `${x.t.restrictMessage == null ? '' : x.t.restrictMessage}`
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

        this.vendorService.getVendorPOMemolist(vendorId).subscribe(
            res => {
                this.allVendorPOROList = res;
            });

        this.vendorService.getVendorROMemolist(vendorId).subscribe(
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


    // private loadVendorDocumentsData(vendorId) {

    //     this.vendorService.getDocumentList(vendorId).subscribe(res => {
    //         this.vendorDocumentsData = res;
    //     });

    //     this.vendorDocumentsColumns = [
    //         { field: 'docName', header: 'Name' },
    //         { field: 'docDescription', header: 'Description' },
    //         { field: 'documents', header: 'Documents' },
    //         { field: 'docMemo', header: 'Memo' }
    //     ];
    // }

    // private onBillingDataLoadSuccessful(allWorkFlows: any[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.billingInfoList = allWorkFlows;
    // }

    // private onShippingDataLoadSuccessful(allWorkFlows: any[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allShippings = allWorkFlows;
    // }

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
        this.vendorService.getCheckPaymentobj(vendorId).subscribe(
            results => this.onPaymentDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
        this.paymentcols = [
            { field: 'siteName', header: 'Site Name' },
            { field: 'address1', header: 'Address' },
            { field: 'city', header: 'City' },
            { field: 'stateOrProvince', header: 'State/Prov' },
            { field: 'postalCode', header: 'Postal Code' },
            { field: 'countryName', header: 'Country' }
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
        this.vendorId = row.vendorId;
        console.log(this.vendorId);
        this.vendorService.getVendorDataById(row.vendorId).subscribe(res => {
            console.log(res,row);
            this.vendorData = res;
        }); 

        // this.loadVendorCapsData(row.vendorId);
        this.toGetVendorGeneralDocumentsList(row.vendorId);
        this.getVendorProcess1099FromTransaction(row.vendorId);
        this.getDomesticWithVendorId(row.vendorId);
        this.InternatioalWithVendorId(row.vendorId);
        this.DefaultWithVendorId(row.vendorId);
        //this.loadContactDataData(row.vendorId);
        this.loadPayamentData(row.vendorId);
        // this.loadShippingData(row.vendorId);
        // this.loadBillingData(row.vendorId);
        this.loadWarningsData(row.vendorId);
        this.loadMemosData(row.vendorId);
        // this.loadVendorDocumentsData(row.vendorId);
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
        $('#step1').collapse('show');

        //     this.vendorCode = row.vendorCode;
        //     this.vendorName = row.vendorName;
        //     this.vendorTypeId = row.t.vendorTypeId;
        //     this.description=row.description;
        //     console.log(this.vendorClassificationName);
        //     this.doingBusinessAsName = row.t.doingBusinessAsName;
        //     this.parent = row.t.parent;

        //     console.log(row);

        //     this.vendorParentName=row.t.vendorParentName;
        //     if (row.currency) {
        //         this.currencyId = row.currency.symbol;
        //     }
        //     else {
        //         this.currencyId = row.currencyId;
        //     }

        //     if (row.creditterms) {
        //         this.creditTermsId = row.creditterms.name;
        //     }
        //     else {
        //         this.creditTermsId = row.creditTermsId;
        //     }

        //     this.address1 = row.address1;
        //     this.address2 = row.address2;
        //    // this.address3 = row.address3;
        //     this.city = row.city;
        //     this.stateOrProvince = row.stateOrProvince;
        //     this.postalCode = row.postalCode;
        //     this.country = row.countryName;
        //     this.vendorPhoneNo = row.t.vendorPhone;
        //     this.vendorPhoneExt = row.t.vendorPhoneExt;
        //     this.vendorEmail = row.vendorEmail;
        //     //this.vendorClassificationId = row.t.vendorClassificationId;
        //     this.vendorClassificationName = row.classificationName;
        //     this.vendorContractReference = row.t.vendorContractReference;
        //     this.isPreferredVendor = row.t.isPreferredVendor;
        //     this.licenseNumber = row.t.licenseNumber;
        //     this.capabilityId = row.capabilityId;
        //     this.vendorCapabilityName=row.vendorCapabilityName;
        //     this.vendorURL = row.t.vendorURL;
        //     this.creditlimit = row.t.creditLimit;
        //     this.discountLevel = row.discountLevel;
        //     this.is1099Required = row.t.is1099Required;       
        //     this.vendorStatus= row.t.isActive;
        //     this.edi = row.t.edi;
        //     this.aeroExchange = row.t.aeroExchange;
        //     this.ediDescription = row.t.ediDescription;
        //     this.aeroExchangeDesc = row.t.aeroExchangeDescription;

        //     this.isIsBillingAddress= row.t.isAddressForBilling;
        //     this.isIsShippingAddress= row.t.isAddressForShipping;	
        //     this.vendorcreatedBy= row.t.createdBy;
        //     this.vendorCreatedDate= row.t.createdDate;
        //     this.vendorIntegration= row.integrationPortalNames; 	


        //     this.isCertified= row.t.isCertified;
        //     this.isVendorAudit= row.t.vendorAudit;
        //     this.isVendorCustomer= row.t.isVendorAlsoCustomer;
        //     this.isAllowNettingAPAR= row.t.isAllowNettingAPAR;        
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
        this.sourceVendor = row;
        this.isSaving = true;
        this.selectedRow = row;
        this.vendorService.getHistoryForVendor(this.sourceVendor.vendorId).subscribe(
            results => this.onHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));
    }
    AddPage() {
        this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');
    }
    deleteItemAndCloseModel() {

        this.isSaving = true;
        this.isDeleteMode = true;
        this.updateActiveData.vendorId = this.sourceVendor.vendorId;
        //this.sourceVendor.isdelete = true;
        this.updateActiveData.isdeleted = true;
        //this.sourceVendor = content;
        this.updateActiveData.updatedBy = this.userName;
        this.vendorService.updatevendorstatus(this.updateActiveData).subscribe(
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
        // this.loadData();
        this.getList(this.lazyLoadEventData);
    }

    private saveSuccessHelper(role?: any) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);
        // this.loadData();
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
            this.vendorService.updateContactforActive(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
        }
        else {
            this.sourceVendor = rowData;
            this.sourceVendor.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceVendor.isActive == true;
            this.vendorService.updateContactforActive(this.sourceVendor).subscribe(
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
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    deleteItemAndCloseModelforContact(contactId) {
        this.isSaving = true;
        this.vendorService.deleteContact(contactId).subscribe(
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
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
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
            this.vendorService.updateContactforActive(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
        }
        else {
            this.sourceVendor = rowData;
            this.sourceVendor.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceVendor.isActive == true;
            this.vendorService.updateContactforActive(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
        }
    }

    openHistforcontact(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.sourceVendor = row;
        this.isSaving = true;
        this.vendorService.historyAcion(this.sourceVendor.contactId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));
    }
    openContactList(content, row) {
        this.vendorId = row.vendorId;
        this.selectedRow = row;
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
        this.loadContactDataData(row.vendorId);
    }

    ExpandAllVenodrDetailsModel() {
        $('#step1').collapse('show');
        $('#step2').collapse('show');
        $('#step3').collapse('show');
        $('#step4').collapse('show');
        $('#step5').collapse('show');
        $('#step6').collapse('show');
        $('#step7').collapse('show');

        $('#step9').collapse('show');
        $('#step10').collapse('show');
        $('#step11').collapse('show');
    }
    CloseAllVenodrDetailsModel() {
        $('#step1').collapse('hide');
        $('#step2').collapse('hide');
        $('#step3').collapse('hide');
        $('#step4').collapse('hide');
        $('#step5').collapse('hide');
        $('#step6').collapse('hide');
        $('#step7').collapse('hide');

        $('#step9').collapse('hide');
        $('#step10').collapse('hide');
        $('#step11').collapse('hide');
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
    navigateToCreatePO() {
        $('#purchaseOrderList').modal('hide');
        this.route.navigateByUrl(`vendorsmodule/vendorpages/app-purchase-setup/vendor/${this.vendorId}`);
    }
    navigateToCreateRO() {
        $('#repairOrderList').modal('hide');
        this.route.navigateByUrl(`vendorsmodule/vendorpages/app-ro-setup/vendor/${this.vendorId}`);
    }

    toGetVendorGeneralDocumentsList(vendorId) {
        var moduleId = 3;
        this.vendorService.GetVendorGeneralDocumentsList(vendorId, moduleId).subscribe(res => {
            this.allVendorGeneralDocumentsList = res;

        })
    }
    downloadFileUpload(rowData) {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadattachedfile?filePath=${rowData.link}`;
        window.location.assign(url);
    }

    getVendorId(rowData) {
        this.vendorId = rowData.vendorId;
    }

    resetVendorId() {
        this.vendorId = null;
    }

    public getVendorProcess1099FromTransaction(vendorId) {

        // this.alertService.startLoadingMessage();
        //this.loadingIndicator = true;
        this.vendorService.getVendorProcess1099DataFromTransaction(vendorId).subscribe(res => {
            if (res[0].length != 0) {
                this.vendorProcess1099Data = res[0].map(x => {
                    return {
                        ...x

                    }
                });
console.log("vendor_1099",this.vendorProcess1099Data);
                for (let j = 0; j < this.vendorProcess1099Data.length; j++) {
                    if (this.vendorProcess1099Data[j].isDefaultRadio == true || this.vendorProcess1099Data[j].isDefaultRadio == "true") {
                        this.vendorProcess1099Data[j].isDefaultRadio = this.vendorProcess1099Data[j].description
                    }
                    if (this.vendorProcess1099Data[j].isDefaultCheck == true) {
                        this.checkedCheckboxesList.push(j);
                    }
                }

            }

        })


    }



    public getDomesticWithVendorId(vendorId) {

        this.vendorService.getDomesticvedor(vendorId).subscribe(
            // res => {
            //     if(res[0].length>0)
            //     {
            //         this.domesticSaveObj = res[0][0];
            //         console.log(this.domesticSaveObj);
            //         console.log(this.domesticSaveObj.aba);
            //     }             

            // }    
            results => this.onDomestciLoad(results[0]),
            error => this.onDataLoadFailed(error)

        );
    }
    private onDomestciLoad(allWorkFlows: any) {

        this.domesticWithVedor = allWorkFlows;
        if (this.domesticWithVedor.length > 0) {
            this.domesticSaveObj = allWorkFlows[0];
        }
    }


    public InternatioalWithVendorId(vendorId) {

        this.vendorService.getInternationalWire(vendorId).subscribe(
            // res => {
            //     if(res[0].length>0)
            //     {
            //     this.internationalSaveObj = res[0][0];
            //     console.log(this.internationalSaveObj);
            //     }
            // }
            results => this.onInternatioalLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    public onInternatioalLoad(allWorkFlows: any) {

        this.internationalwithVendor = allWorkFlows;
        if (this.internationalwithVendor.length > 0) {
            this.internationalSaveObj = allWorkFlows[0];
        }
    }

    public DefaultWithVendorId(vendorId) {

        this.vendorService.getDefaultlist(vendorId).subscribe(
            res => {
                this.defaultPaymentData = res[0];
                if (this.defaultPaymentData != null && this.defaultPaymentData.paymentType != null) {
                    this.paymentTypeName = this.defaultPaymentData.paymentType;
                }
            }
        );
    }

    // public loadVendorCapsData(vendorId) {

    //     const status = 'active';

    //     if (vendorId != undefined) {
    //         this.vendorService.getVendorCapabilityList(status, vendorId).subscribe(

    //             // res => {
    //             //     this.allvendorCapsList = res[0];
    //             //     console.log(this.allvendorCapsList);        
    //             // }
    //             results => this.onDataLoadVendorCapsSuccessful(results[0]),
    //             error => this.onDataLoadFailed(error)
    //         );
    //     }

    //     // To display the values in header and column name values
    //     this.capsCols = [
    //         { field: 'vendorCode', header: 'Vendor Code' },
    //         { field: 'vendorName', header: 'Vendor Name' },
    //         //{ field: 'capabilityType', header: 'Caps Type' },      
    //         { field: 'capabilityType', header: 'Vendor Caps' },
    //         { field: 'partNumber', header: 'PN' },
    //         { field: 'partDescription', header: 'PN Description' },
    //         { field: 'vendorRanking', header: ' Vendor Ranking' },
    //         { field: 'tat', header: 'TAT' },
    //     ];

    //     this.selectedCapsColumns = this.capsCols;

    // }

    // public onDataLoadVendorCapsSuccessful(allWorkFlows: any[]) {

    //     // alert('success');
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allvendorCapsList = allWorkFlows;
    //     console.log(this.allvendorCapsList);
    // }

    // viewSelectedCapsRow(rowData) {
    //     const { vendorCapabilityId } = rowData;
    //     this.getVendorCapabilitiesView(vendorCapabilityId);
    //     this.getVendorCapesAircraftView(vendorCapabilityId);
    // }

    // viewSelectedCapsRowonDbl(rowData) {
    //     this.viewSelectedCapsRow(rowData);
    //     $('#vendorCapesView').modal('show');
    // }

    // getVendorCapabilitiesView(vendorCapesId) {
    //     this.vendorCapesService.getVendorCapabilitybyId(vendorCapesId).subscribe(res => {
    //         this.vendorCapesGeneralInfo = res;
    //     })
    // }

    // getVendorCapesAircraftView(vendorCapesId) {
    //     this.vendorCapesService.getVendorAircraftGetDataByCapsId(vendorCapesId).subscribe(res => {
    //         this.aircraftListDataValues = res.map(x => {
    //             return {
    //                 ...x,
    //                 aircraft: x.aircraftType,
    //                 model: x.aircraftModel,
    //                 dashNumber: x.dashNumber,
    //                 memo: x.memo,
    //             }
    //         })
    //     })
    // }

    viewFileSelectedCapsRow(rowData) {
        this.sourceViewforDocument = rowData;
        this.toGetUploadDocumentsList(rowData.attachmentId, rowData.vendorId, 3);
    }

    viewSelectedDocsRowonDbl(rowData) {
        this.viewFileSelectedCapsRow(rowData);
        $('#fileDocview').modal('show');
    }

    toGetUploadDocumentsList(attachmentId, vendorId, moduleId) {
        this.vendorService.toGetUploadDocumentsList(attachmentId, vendorId, moduleId).subscribe(res => {
            this.sourceViewforDocumentList = res;
        })
    }

    getPageCount(totalNoofRecords, viewPageSize) {
        return Math.ceil(totalNoofRecords / viewPageSize)
    }




}