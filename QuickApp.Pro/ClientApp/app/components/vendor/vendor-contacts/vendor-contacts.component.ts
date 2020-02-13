import { Component, ViewChild, OnInit, AfterViewInit, Input, QueryList, Directive, HostListener } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';
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
import { Row } from 'primeng/components/common/shared';
import { CustomerService } from '../../../services/customer.service';
import { VendorStepsPrimeNgComponent } from '../vendor-steps-prime-ng/vendor-steps-prime-ng.component';
import { ConfigurationService } from '../../../services/configuration.service';
import { getValueFromArrayOfObjectById, editValueAssignByCondition } from '../../../generic/autocomplete';

import * as $ from 'jquery'


// @Directive({ selector: 'changeDetect' })
// export class ChangeInForm {
//     @HostListener('mouseover') ChangeDetect() {
//         console.log('Sampless');
//     }

// }

@Component({
    selector: 'app-vendor-contacts',
    templateUrl: './vendor-contacts.component.html',
    styleUrls: ['./vendor-contacts.component.scss'],
    animations: [fadeInOut]
})
/** anys component*/
export class VendorContactsComponent implements OnInit {
    // @ViewChild('addContactForm') addContactForm: FormControl;

    modelValue: boolean;
    display: boolean;
    matSpinner: boolean;
    activeIndex: any = 3;
    showFirstName: boolean;
    showemail: boolean;
    showworkPhone: boolean;
    showmobilePhone: boolean;
    showLastName: boolean;
    showvendorContractReference: boolean;
    alldata: any[];
    middleNames: any[];
    lastNames: any;
    isDefault: boolean = false;
    firstNames: any;
    vendorCode: any = "";
    vendorname: any = "";
    allgeneralInfo: any[];
    contactauditHisory: any[];
    collection: any;
    action_name: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createddate: any = "";
    updatedDate: any = "";
    sub: any;
    local: any;
    viewName: string = "Create";
    lastName: any = "";
    firstName: any = "";
    contactTitle: any = "";
    email: any = "";
    mobilePhone: number;
    fax: any;
    sourceVendorforView: any = {};
    selectedFirstName: any;
    disablesaveForFirstname: boolean;
    disablesaveForlastname: boolean;
    disablesaveForMiddlename: boolean;
    formData = new FormData();
    totalRecords: number = 0;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number = 0;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    filteredBrands: any[];
    displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<any>;
    allActions: any[] = [];
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    public sourceVendor: any = {}
    public sourceAction: any = [];
    public auditHisory: AuditHistory[] = [];
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    selectedColumn: any[];
    cols: any[];
    title: string = "Create";
    id: number;
    errorMessage: any;
    modal: NgbModalRef;
    actionName: string;
    Active: string = "Active";
    length: number;
    localCollection: any;
    comName: string;
    isEditMode: boolean = false;
    isDeleteMode: boolean = false;
    isEditContactInfo: boolean = false;
    selectedRowforDelete: any;
    vendorContactsColumns = [
        { field: 'firstName', header: 'First Name' },
        { field: 'lastName', header: 'Last Name' },
        { field: 'contactTitle', header: 'Contact Title' },
        { field: 'email', header: 'Email' },
        { field: 'mobilePhone', header: 'Mobile Phone' },
        { field: 'fullContactNo', header: 'Work Phone' },
        // { field: 'mobilePhone', header: 'Mobile Phone' },
        { field: 'fax', header: 'FAX' },
        { field: 'isDefaultContact', header: 'IsPrimary' }
        // { field: 'isDefaultContact', header: 'Primary Contact' },
        // { field: 'notes', header: 'Memo' }
        //{ field: 'updatedDate', header: 'Updated Date' },
        //{ field: 'createdDate', header: 'Created Date' }
    ];

    selectedColumns = this.vendorContactsColumns;
    @Input() vendorId: number = 0;
    @Input() isViewMode: boolean = false;
    isvendorEditMode: any;
    disableSave: boolean = true;
    constructor(private router: ActivatedRoute, private route: Router, private customerser: CustomerService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public vendorService: VendorService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private configurations: ConfigurationService) {



        if (this.vendorService.listCollection !== undefined) {
            this.vendorService.isEditMode = true;
        }
        if (this.local) {
            this.vendorService.contactCollection = this.local;
        }
        if (this.vendorService.generalCollection) {
            this.local = this.vendorService.generalCollection;
        }
        if (this.customerser.isCustomerAlsoVendor == true) {
            this.sourceVendor = this.customerser.localCollectiontoVendor;
        }
        this.dataSource = new MatTableDataSource();
        if (this.vendorService.listCollection && this.vendorService.isEditMode == true) {
            this.local = this.vendorService.listCollection;
            this.loadData();
        }
        this.alertService.stopLoadingMessage();
    }




    ngOnInit(): void {
        this.vendorService.currentEditModeStatus.subscribe(message => {
            this.isvendorEditMode = message;
        });
        this.sourceVendor.isdefaultContact = true;
        this.matSpinner = true;
        if (this.local) {
            this.loadData();
        }
        this.loadCompleteddata();
        this.loadEmptyObject();
        this.router.queryParams.subscribe((params: Params) => {
        });
        if (this.vendorId != 0) {
            this.loadData();
        } else {
            this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-contacts';
            this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);
        }
    }


    filterFirstNames(event) {
        this.firstNames = [];
        for (let i = 0; i < this.alldata.length; i++) {
            let firstName = this.alldata[i].firstName;
            if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.firstNames.push(firstName);
            }
        }
    }
    filterLastNames(event) {
        this.lastNames = [];
        for (let i = 0; i < this.alldata.length; i++) {
            let lastName = this.alldata[i].lastName;
            if (lastName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.lastNames.push(lastName);
            }
        }
    }
    filterMiddleNames(event) {
        this.middleNames = [];
        for (let i = 0; i < this.alldata.length; i++) {
            let middleName = this.alldata[i].middleName;
            if (middleName != "" && middleName != null && middleName != "Null") {
                if (middleName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.middleNames.push(middleName);
                }
            }
        }
    }
    public allWorkFlows: any[] = [];
    private getgeneralInnfo() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.vendorService.getWorkFlows().subscribe(
            results => this.ongeneralDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private loadEmptyObject() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.vendorService.getEmptyObj().subscribe(
            results => this.onEmptyObjUrl(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }


    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        const vendorId = this.vendorId != 0 ? this.vendorId : this.local.vendorId;
        this.vendorService.getContacts(vendorId).subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private loadCompleteddata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.vendorService.getContactsFirstName().subscribe(
            results => this.ondata(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private loadMasterCompanies() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.masterComapnyService.getMasterCompanies().subscribe(
            results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue;
    }
    handleChanges(rowData, e) {
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

    private refresh() {
        this.applyFilter(this.dataSource.filter);
    }
    private onDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allActions = allWorkFlows;
        //console.log(this.allActions);
        //const responseData = allWorkFlows;
        // this.allActions = allWorkFlows.map(x => {
        //   return {
        //       ...x,
        //     workPhone: `${x.workPhone} - ${x.workPhoneExtn}`,            

        //   };
        // });         
    }
    private ondata(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.alldata = allWorkFlows;
    }

    dismissModel() {
        this.modal.close();
    }
    private onEmptyObjUrl(allWorkFlows: any) {
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
        this.vendorname = this.allgeneralInfo[0].vendorName;
        this.vendorCode = this.allgeneralInfo[0].vendorCode;
        console.log(this.allgeneralInfo);
    }

    filterActions(event) {
        this.localCollection = [];
        for (let i = 0; i < this.alldata.length; i++) {
            let actionName = this.alldata[i].description;
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
        if (!row.isPrimary) {


            this.isEditMode = false;
            this.isDeleteMode = true;
            delete row.updatedBy;
            this.localCollection = row;
            this.selectedRowforDelete = row;
            this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
            this.modal.result.then(() => {
                console.log('When user closes');
            }, () => { console.log('Backdrop click') })
        } else {
            $('#deleteoops').modal('show');
        }
    }

    openEdit(content, row) {
        this.isEditMode = true;
        this.isSaving = true;
        this.sourceVendor = { ...row };
        this.loadMasterCompanies();
        this.isEditContactInfo = true;
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

    //openHist(content, row) {
    //    this.alertService.startLoadingMessage();
    //    this.loadingIndicator = true;
    //    this.sourceVendor = row;
    //    this.isSaving = true;
    //    this.vendorService.historyAcion(this.sourceVendor.contactId).subscribe(
    //        results => this.onHistoryLoadSuccessful(results[0], content),
    //        error => this.saveFailedHelper(error));
    //}
    openHist(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.sourceVendor = row;
        this.isSaving = true;
        this.vendorService.getVendorContactAuditHistory(this.sourceVendor.vendorId, this.sourceVendor.contactId).subscribe(
            results => this.onAuditHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));



    }
    private onAuditHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.contactauditHisory = auditHistory;

        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    getColorCodeForHistory(i, field, value) {
        const data = this.contactauditHisory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }

    onBlurMethod(data) {
        if (data == 'firstName') {
            this.showFirstName = false;
        }
        if (data == 'lastName') {
            this.showLastName = false;
        }
        if (data == 'workPhone') {
            this.showworkPhone = false;
        }
        if (data == 'email') {
            this.showemail = false;
        }
    }

    editItemAndCloseModel() {
        this.isSaving = true;
        if (!(this.sourceVendor.firstName && this.sourceVendor.lastName && this.sourceVendor.workPhone &&
            this.sourceVendor.email
        )) {
            //this.display = true;
            this.modelValue = true;
        }
        if (this.sourceVendor.firstName && this.sourceVendor.lastName && this.sourceVendor.workPhone &&
            this.sourceVendor.email) {
            if (!this.sourceVendor.vendorId) {
                this.sourceVendor.createdBy = this.userName;
                this.sourceVendor.updatedBy = this.userName;
                this.sourceVendor.masterCompanyId = 1;
                this.isDefault = this.sourceVendor.isDefaultContact;
                if (!this.sourceVendor.isDefaultContact) {
                    this.sourceVendor.isDefaultContact = false;
                }
                // before you commit make sure u don't have conlog, debug, commented code...
                this.vendorService.newAddContactInfo(this.sourceVendor).subscribe(data => {
                    console.log(data)
                    this.localCollection = data;
                    this.sourceVendor = new Object();
                    this.localCollection.VendorId = this.local.vendorId;
                    this.localCollection.ContactId = this.local.contactId;
                    this.loadData();
                    if (data) {
                        this.updateVendorContact(this.localCollection);
                        this.localCollection.isDefaultContact = this.isDefault;
                        this.loadData(); // use proper naming conventions
                    }

                    this.vendorService.contactCollection = this.local;
                    this.saveCompleted(this.sourceVendor);
                    this.sourceVendor = {};
                })
            }
            else {
                this.sourceVendor.updatedBy = this.userName;
                this.sourceVendor.masterCompanyId = 1;
                this.vendorService.updateContactinfo(this.sourceVendor).subscribe(data => {
                    this.loadData();
                    if (data) { this.sourceVendor = new Object(); }
                    this.savesuccessCompleted(this.sourceVendor);
                    this.sourceVendor = {};
                })
            }
        }

        else {
        }
        this.vendorService.contactCollection = this.local;
    }


    toggledbldisplay(data) {
        this.sourceVendor = data;
    }

    previousClick() {
        this.activeIndex = 2;
        this.vendorService.changeofTab(this.activeIndex);
        // this.vendorService.indexObj.next(this.activeIndex);
        // this.vendorService.changeStep('Capabilities');
        // this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-capes');
    }
    nextClick() {
        this.activeIndex = 4;
        this.vendorService.changeofTab(this.activeIndex);
        this.alertService.showMessage(
            'Success',
            `${this.isvendorEditMode ? 'Updated' : 'Saved'}  Contacts Sucessfully `,
            MessageSeverity.success
        );
        // this.vendorService.indexObj.next(this.activeIndex);
        // this.vendorService.changeStep('Financial Information');
        // this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-financial-information');
    }

    deleteItemAndCloseModel() {
        let contactId = this.localCollection.contactId;
        if (contactId > 0) {
            this.isSaving = true;
            this.vendorService.deleteContact(contactId).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
        }
        this.modal.close();
    }

    updateVendorContact(updateObj: any) {
        this.vendorService.newAddvendorContact(updateObj).subscribe(data => {
            this.loadData();
        })
    }

    private saveCompleted(user?: any) {
        this.isSaving = false;
        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
            this.saveCompleted
        }
        this.loadData();
    }
    private savesuccessCompleted(user?: any) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was saved successfully`, MessageSeverity.success);
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
    opencontactView(content, row) {

        this.sourceVendorforView = row;
        console.log(this.sourceVendorforView);
        this.firstName = row.firstName;
        this.lastName = row.lastName;
        this.contactTitle = row.contactTitle;
        this.email = row.email;
        this.mobilePhone = row.mobilePhone;
        this.fax = row.fax;
        //this.createdBy = row.createdBy;
        //this.updatedBy = row.updatedBy;
        //this.createddate = row.createdDate;
        //this.updatedDate = row.updatedDate;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    enableSave() {
        this.disableSave = false;

    }

    // onFirstNameSelected(event) {
    //     if (this.alldata) {
    //         for (let i = 0; i < this.alldata.length; i++) {
    //             if (event == this.alldata[i].firstName) {
    //                 this.sourceVendor.firstName = event;
    //                 this.disablesaveForFirstname = true;
    //                 this.selectedFirstName = event;
    //             }
    //         }
    //     }
    // }
    // eventFirstNameHandler(event) {
    //     if (event.target.value != "") {
    //         let value = event.target.value.toLowerCase();
    //         if (this.selectedFirstName) {
    //             if (value == this.selectedFirstName.toLowerCase()) {
    //                 this.disablesaveForFirstname = true;
    //             }
    //             else {
    //                 this.disablesaveForFirstname = false;
    //             }
    //         }
    //     }
    // }

    // onLastNameSelected(event) {
    //     if (this.alldata) {
    //         for (let i = 0; i < this.alldata.length; i++) {
    //             if (event == this.alldata[i].lastName) {
    //                 this.sourceVendor.lastName = event;
    //                 this.disablesaveForlastname = true;
    //                 this.selectedFirstName = event;
    //             }
    //         }
    //     }
    // }
    // eventlastNameHandler(event) {
    //     if (event.target.value != "") {
    //         let value = event.target.value.toLowerCase();
    //         if (this.selectedFirstName) {
    //             if (value == this.selectedFirstName.toLowerCase()) {
    //                 this.disablesaveForlastname = true;
    //             }
    //             else {
    //                 this.disablesaveForlastname = false;
    //             }
    //         }
    //     }
    // }

    // onMiddleNameSelected(event) {
    //     if (this.alldata) {
    //         for (let i = 0; i < this.alldata.length; i++) {
    //             if (event == this.alldata[i].middleName) {
    //                 this.sourceVendor.middleName = event;
    //                 this.disablesaveForMiddlename = true;
    //                 this.selectedFirstName = event;
    //             }
    //         }
    //     }
    // }
    // eventMiddleNameHandler(event) {
    //     if (event.target.value != "") {
    //         let value = event.target.value.toLowerCase();
    //         if (this.selectedFirstName) {
    //             if (value == this.selectedFirstName.toLowerCase()) {
    //                 this.disablesaveForMiddlename = true;
    //             }
    //             else {
    //                 this.disablesaveForMiddlename = false;
    //             }
    //         }
    //     }
    // }

    onAddContactInfo() {
        this.sourceVendor = {};
        this.isEditContactInfo = false;
    }

    patternMobilevalidationWithSpl(event: any) {
        const pattern = /[0-9\+\-()\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }

    }


    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=VendorContacts&fileName=VendorContact.xlsx`;
        window.location.assign(url);
    }

    customExcelUpload(event) {
        const file = event.target.files;

        if (file.length > 0) {
            this.formData.append('file', file[0])
            this.vendorService.ContactUpload(this.formData, this.local.vendorId).subscribe(res => {
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

    pageIndexChange(event) {
        this.pageSize = event.rows;
    }
}