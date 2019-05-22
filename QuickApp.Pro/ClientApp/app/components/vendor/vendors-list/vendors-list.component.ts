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
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

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
    doingBusinessAsName: any = "";
    parent: any = "";
    address1: any = "";
    address2: any = "";
    address3: any = "";
    city: any = "";
    stateOrProvince: any = "";
    postal: any = "";
    country: any = "";
    classificationName: any = "";
    isPreferredVendor: any = "";
    vendorContractReference: any = "";
    licenseNumber: any = "";
    capabilityId: any = "";
    vendorURL: any = "";
    postalCode: any = "";
    vendorClassificationId: any = "";
    creditlimit: any = "";
    creditTermsId: any = "";
    currencyId: any = "";
    discountLevel: any = "";
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
    ngOnInit() {
        this.loadData();
        this.workFlowtService.currentUrl = '/vendorsmodule/vendorpages/app-vendors-list';
        this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
        this.workFlowtService.ShowPtab = false;
        this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab);
    }

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
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    public allWorkFlows: any[] = [];

    constructor(private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: VendorService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.local = this.workFlowtService.financeCollection;
        this.dataSource = new MatTableDataSource();
        this.workFlowtService.listCollection = null;
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
            { field: 'vendorCode', header: 'Vendor Code' },
            { field: 'vendorName', header: 'Vendor Name' },
            { field: 'description', header: 'Vendor Type' },
            { field: 'vendorEmail', header: 'Vendor Email' },
            { field: 'city', header: 'City' },
            { field: 'stateOrProvince', header: 'StateOrProvince' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
            { field: 'updatedDate', header: 'Updated Date' },
            { field: 'createdDate', header: 'Created Date' }
        ];
        this.selectedColumns = this.cols;
    }

    private onDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allVendorList = allWorkFlows;
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
        if (e.checked == false) {
            this.sourceVendor = rowData;
            this.sourceVendor.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceVendor.isActive == false;
            this.workFlowtService.updateActionforActive(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
        }
        else {
            this.sourceVendor = rowData;
            this.sourceVendor.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceVendor.isActive == true;
            this.workFlowtService.updateActionforActive(this.sourceVendor).subscribe(
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
            { field: 'address3', header: 'Address3' },
            { field: 'city', header: 'City' },
            { field: 'stateOrProvince', header: 'State/Prov' },
            { field: 'postalCode', header: 'Postal Code' },
            { field: 'country', header: 'Country' }
        ];

        this.selectedShippingColumns = this.shippingCol;
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
        this.doingBusinessAsName = row.t.doingBusinessAsName;
        this.parent = row.t.parent;
        if (row.currency) {
            this.currencyId = row.currency.symbol;
        }
        else {
            this.currencyId = "";
        }

        if (row.creditterms) {
            this.creditTermsId = row.creditterms.name;
        }
        else {
            this.creditTermsId = "";
        }
        this.address1 = row.address1;
        this.address2 = row.address2;
        this.address3 = row.address3;
        this.city = row.city;
        this.stateOrProvince = row.stateOrProvince;
        this.postalCode = row.postalCode;
        this.country = row.country;
        this.vendorEmail = row.vendorEmail;
        this.vendorClassificationId = row.t.vendorClassificationId;
        this.vendorContractReference = row.t.vendorContractReference;
        this.isPreferredVendor = row.t.isPreferredVendor;
        this.licenseNumber = row.t.licenseNumber;
        this.capabilityId = row.capabilityId;
        this.vendorURL = row.t.vendorURL;
        this.creditlimit = row.t.creditlimit;
        this.discountLevel = row.t.discountLevel;
        this.is1099Required = row.t.is1099Required;
        this.loadContactDataData(row.vendorId);
        this.loadPayamentData(row.vendorId);
        this.loadShippingData(row.vendorId);
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
        this.sourceVendor.isdelete = false;
        //this.sourceVendor = content;
        this.sourceVendor.updatedBy = this.userName;
        this.workFlowtService.updatevendorstatus(this.sourceVendor).subscribe(
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
        this.modal = this.modalService.open(content, { size: 'lg' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
        this.loadContactDataData(row.vendorId);
    }
}