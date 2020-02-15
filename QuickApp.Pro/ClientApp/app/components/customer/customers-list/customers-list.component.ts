
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../../services/animations';
import { PageHeaderComponent } from '../../../shared/page-header.component';
import * as $ from 'jquery';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatIcon } from '@angular/material';
import { AuthService } from '../../../services/auth.service';
import { NgbModal, NgbActiveModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, DialogType, MessageSeverity } from '../../../services/alert.service';
import { CustomerService } from '../../../services/customer.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { AuditHistory } from '../../../models/audithistory.model';
import { MasterCompany } from '../../../models/mastercompany.model';
import { Customer } from '../../../models/customer.model';
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Router } from '@angular/router';
import { Globals } from '../../../globals'
import { LazyLoadEvent, SortEvent, MenuItem } from 'primeng/api';
import { listSearchFilterObjectCreation } from '../../../generic/autocomplete';
import { CommonService } from '../../../services/common.service';
import { CustomerViewComponent } from '../../../shared/components/customer/customer-view/customer-view.component';
import { ConfigurationService } from '../../../services/configuration.service';
import { CustomerShippingInformationComponent } from '../customer-shipping-information/customer-shipping-information-component'



@Component({
    selector: 'app-customers-list',
    templateUrl: './customers-list.component.html',
    styleUrls: ['./customers-list.component.scss'],
    animations: [fadeInOut]
})
/** CustomersList component*/
export class CustomersListComponent implements OnInit {

    totalRecords: number = 0;
    totalPages: number = 0;
    isDeleteMode: boolean = false;
    allCustomerFinanceDocumentsList: any = [];
    customerId: number = 0;
    sourceViewforShippingInfo: any;
    sourceViewInterforShippingInfo: any;
    demosticShippingViaDataInfo: any;
    demosticInterShippingViaDataInfo: any;
    sourceViewforDocument: any;
    home: any;
    sourceViewforContact: any;
    selectedColumnsForInternationShipViaTable = [
        { field: 'shipVia', header: 'Ship Via' },
        { field: 'shippingAccountInfo', header: 'Shipping AccountInfo' },
        //{ field: 'shippingURL', header: 'Shipping URL' },
        //{ field: 'shippingId', header: 'shipping Id' },
        { field: 'memo', header: 'Memo' }

    ];
    selectedColumnsForDomesticShipVia = this.selectedColumnsForInternationShipViaTable;

    headers = [
        { field: 'name', header: 'Name' },
        { field: 'customerCode', header: 'Code' },
        { field: 'accountType', header: 'Account Type' },
        { field: 'customerType', header: 'Type' },

        { field: 'customerClassification', header: 'Classification' },
        { field: 'email', header: 'Email' },
        { field: 'city', header: 'City' },
        { field: 'stateOrProvince', header: 'State' },
        { field: 'contact', header: 'Contact' },
        { field: 'salesPersonPrimary', header: 'Sales Person' }


    ]
    selectedColumns = this.headers;
    data: any;
    pageSize: number = 10;
    pageIndex: number = 0;
    first = 0;
    tax: boolean = false;
    @ViewChild('dt')
    private table: Table;
    lazyLoadEventData: any;
    viewData: any[];
    modal: NgbModalRef;
    viewDataGeneralInformation: any[];
    viewDataclassification: any[];
    viewDocumnets: any;

    viewDataIntegration: any[];
    customerContacts: any;
    selectedRow: any;
    contactcols: any[];
    selectedContactColumns: any[];
    allContacts: any[] = [];
    customerauditHisory: any[];
    selectedRowforDelete: any;
    pageIndexForInternationalShipVia: number = 0;
    pageSizeForInternationalShipVia: number = 10;
    customerContactsColumns = [
        { field: 'tag', header: 'Tag' },
        { field: 'firstName', header: 'First Name' },
        { field: 'lastName', header: 'Last Name' },
        { field: 'contactTitle', header: 'Contact Title' },
        { field: 'email', header: 'Email' },

        { field: 'workPhone', header: 'Work Phone' },
        { field: 'mobilePhone', header: 'Mobile Phone' },
        { field: 'fax', header: 'Fax' },

    ];
    colsaircraftLD: any = [
        { field: "aircraftType", header: "Aircraft" },
        { field: "aircraftModel", header: "Model" },
        { field: "dashNumber", header: "Dash Numbers" },
        { field: "inventory", header: "Inventory" },
        { field: "memo", header: "Memo" }

    ]

    ataHeaders = [
        { field: 'firstName', header: 'Contact' },

        { field: 'ataChapterName', header: 'ATA Chapter' },
        { field: 'ataSubChapterDescription', header: 'ATA Sub-Chapter' }

    ]
    billingInfoTableHeaders = [
        { field: 'siteName', header: 'Site Name' },
        { field: 'address1', header: 'Address1' },
        { field: 'address2', header: 'Address2' },

        { field: 'city', header: 'City' },
        { field: 'stateOrProvince', header: 'State/Prov' },
        { field: 'postalCode', header: 'Postal Code' },
        { field: 'countryName', header: 'Country' }
    ]
    domesticShippingHeaders = [
        { field: 'siteName', header: 'Site Name' },
        { field: 'address1', header: 'Address1' },
        { field: 'address2', header: 'Address2' },

        { field: 'city', header: 'City' },
        { field: 'stateOrProvince', header: 'State Or Province' },
        { field: 'postalCode', header: 'Postal Code' },
        { field: 'countryName', header: 'Country' }
    ]
    internationalShippingHeaders = [
        { field: 'exportLicense', header: 'Export License' },
        { field: 'description', header: 'Description' },
        { field: 'isPrimary', header: 'IsDefault' },
        { field: 'startDate', header: 'Start Date' },
        { field: 'expirationDate', header: 'Expiration Date' },
        { field: 'amount', header: 'Amount' }
    ]

    warningHeaders = [
        { field: 'sourceModule', header: 'Module' },
        { field: 'warningMessage', header: 'Warning Message' },
        { field: 'restrictMessage', header: 'Restrict Message' }

    ]
    customerDocumentsColumns = [

        { field: 'docName', header: 'Name' },
        { field: 'docDescription', header: 'Description' },
        //{ field: 'documents', header: 'Documents' },
        { field: 'docMemo', header: 'Memo' },

    ];
    customerPMAColumns = [
        { field: 'partNumber', header: 'Part Number' },
        { field: 'partDescription', header: 'Description' },
        { field: 'manufacturerName', header: 'Manufacturer' }
    ];
    customerDERColumns = [
        { field: 'partNumber', header: 'Part Number' },
        //{ field: 'memo', header: 'Memo' },
        { field: 'partDescription', header: 'Description' },
        { field: 'manufacturerName', header: 'Manufacturer' }


    ];
    aircraftListDataValues: any;
    ataListDataValues: any;
    billingInfoList: any;
    waringInfoList: any;
    DocumentsList: any;
    domesticShippingData: any[];
    internationalShippingData: any;

    filterKeysByValue: object = {};
    taxTypeRateMapping: any;
    restrictedPMAParts: any;
    restrictedDERParts: any;
    disableRestrictedPMA: boolean = false;
    classificationIds: any[];
    filteredText: string;
    dataSource: MatTableDataSource<any>;
    breadcrumbs: MenuItem[];

    constructor(private _route: Router,
        private authService: AuthService,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private _fb: FormBuilder,
        private alertService: AlertService,
        public customerService: CustomerService,
        private dialog: MatDialog,
        private masterComapnyService: MasterComapnyService,
        private commonService: CommonService,
        private configurations: ConfigurationService) {
        this.dataSource = new MatTableDataSource();


    }
    ngOnInit() {
        // this.getList();
        this.breadcrumbs = [
            { label: 'Customers' },
            { label: 'Customers List' },
        ];
    }

    getList(data) {

        console.log(data.sortField);
        const PagingData = { ...data, filters: listSearchFilterObjectCreation(data.filters) }
        this.customerService.getCustomerAll(PagingData).subscribe(res => {
            this.data = res;
            if (res.length > 0) {
                this.totalRecords = res[0].totalRecords;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }

        })
    }






    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        if (this.filteredText != "" && this.filteredText != null && this.filteredText != undefined) {
            this.globalSearch(this.filteredText);
        }
        else {
            this.table.reset();
        }


    }
    loadData(event) {

        this.lazyLoadEventData = event;
        const pageIndex = parseInt(event.first) / event.rows;;
        this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        event.first = pageIndex;
        this.getList(event)

        console.log(event);
    }



    filterData(data) {
        console.log(data);
    }
    getPageCount(totalNoofRecords, pageSize) {
        return Math.ceil(totalNoofRecords / pageSize)
    }
    changeStatus(rowData) {

        this.customerService.updateActionforActive(rowData, this.userName).subscribe(res => {
            this.alertService.showMessage("Success", `Successfully Updated Status`, MessageSeverity.success);
        })

    }
    edit(rowData) {
        const { customerId } = rowData;
        this._route.navigateByUrl(`customersmodule/customerpages/app-customer-edit/${customerId}`);
    }


    viewSelectedRow(rowData) {
        const { customerId } = rowData;
        this.modal = this.modalService.open(CustomerViewComponent, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.componentInstance.customerId = customerId;
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })

    }

    viewSelectedRowdbl(content, rowData) {


        const { customerId } = rowData;
        this.customerService.getCustomerdataById(customerId).subscribe(res => {
            this.viewDataGeneralInformation = res[0];

            console.log(this.viewDataGeneralInformation);


        })
        this.getAllCustomerContact(customerId);
        this.getAircraftMappedDataByCustomerId(customerId);
        this.getMappedATAByCustomerId(customerId);
        this.getBillingDataById(customerId);
        this.getDomesticShippingByCustomerId(customerId);
        // this.getInternationalShippingByCustomerId(customerId);
        this.getCustomerWaringByCustomerId(customerId);
        this.getCustomerDocumentsByCustomerId(customerId);
        this.getMappedTaxTypeRateDetails(customerId);
        this.getCustomerRestrictedPMAByCustomerId(customerId);
        this.getCustomerRestrictedDERByCustomerId(customerId);
        this.getCustomerClassificationByCustomerId(customerId);
        this.getCustomerIntegrationTypesByCustomerId(customerId);
        this.toGetCustomerFinanceDocumentsList(customerId);

        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })

    }

    getAllCustomerContact(customerId) {
        this.customerService.getContacts(customerId).subscribe(res => {
            this.customerContacts = res[0]
        })
    }

    getAircraftMappedDataByCustomerId(customerId) {
        this.customerService.getMappedAirCraftDetails(customerId).subscribe(res => {
            this.aircraftListDataValues = res;
        })
    }
    getMappedATAByCustomerId(customerId) {
        this.customerService.getATAMappedByCustomerId(customerId).subscribe(res => {
            this.ataListDataValues = res;
            console.log(res);

        })
    }
    getBillingDataById(customerId) {
        this.customerService.getCustomerBillViaDetails(customerId).subscribe(res => {
            this.billingInfoList = res[0]
        })
    }


    // get domestic shipping by customer Id 
    getDomesticShippingByCustomerId(customerId) {
        this.customerService.getCustomerShipAddressGet(customerId).subscribe(res => {
            console.log(res);
            this.domesticShippingData = res[0];
        })
    }

    // getInternationalShippingByCustomerId(customerId) {


    //     this.customerService.getInternationalShippingByCustomerId(customerId, 0, 20).subscribe(res => {
    //         console.log(res);
    //         this.internationalShippingData = res.paginationList;
    //        })



    // }

    getCustomerWaringByCustomerId(customerId) {
        this.customerService.getCustomerWarnings(customerId).subscribe(res => {
            this.waringInfoList = res[0].map(x => {
                return {
                    ...x,
                    sourceModule: `${x.t.sourceModule == null ? '' : x.t.sourceModule}`,
                    warningMessage: `${x.t.warningMessage == null ? '' : x.t.warningMessage}`,
                    restrictMessage: `${x.t.restrictMessage == null ? '' : x.t.restrictMessage}`
                };
            });


        })
    }

    getCustomerDocumentsByCustomerId(customerId) {
        const id = customerId
        this.customerService.getDocumentList(customerId).subscribe(res => {
            this.DocumentsList = res;



        })
    }

    getMappedTaxTypeRateDetails(customerId) {

        this.customerService.getMappedTaxTypeRateDetails(customerId).subscribe(res => {
            this.taxTypeRateMapping = res;

        })
    }

    getCustomerRestrictedPMAByCustomerId(customerId) {

        this.commonService.getRestrictedPartsWithDesc(1, customerId, 'PMA').subscribe(res => {

            this.restrictedPMAParts = res;
            console.log(this.restrictedPMAParts, "this.restrictedPMAParts++++")

        })
    }


    getCustomerRestrictedDERByCustomerId(customerId) {

        this.commonService.getRestrictedPartsWithDesc(1, customerId, 'DER').subscribe(res => {

            this.restrictedDERParts = res;


        })
    }

    getCustomerClassificationByCustomerId(customerId) {

        this.customerService.getCustomerClassificationMapping(customerId).subscribe(res => {
            this.viewDataclassification = res.map(x => x.description);

        });
    }
    getCustomerIntegrationTypesByCustomerId(customerId) {

        this.commonService.getIntegrationMapping(customerId, 1).subscribe(res => {
            this.viewDataIntegration = res.map(x => x.description);

        });


    }
    toGetCustomerFinanceDocumentsList(customerId) {
        var moduleId = 1;
        this.customerService.GetCustomerFinanceDocumentsList(customerId, moduleId).subscribe(res => {
            this.allCustomerFinanceDocumentsList = res;

        })
    }
    toGetUploadDocumentsList(attachmentId, customerId) {


        this.customerService.toGetUploadDocumentsList(attachmentId, customerId, 1).subscribe(res => {
            this.viewDocumnets = res;
        })
    }
    openDocument(content, row) {
        this.customerService.toGetUploadDocumentsList(row.attachmentId, row.customerId, 1).subscribe(res => {
            this.viewDocumnets = res;

            this.sourceViewforDocument = row;
        })

    }
    globalSearch(value) {
        this.pageIndex = 0;
        this.filteredText = value;
        this.customerService.getGlobalSearch(value, this.pageIndex, this.pageSize).subscribe(res => {
            this.data = res;
            if (res.length > 0) {
                this.totalRecords = res[0].totalRecords;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }
        })
    }
    ExpandAllCustomerDetailsModel() {
        $('#step1').collapse('show');
        $('#step2').collapse('show');
        $('#step3').collapse('show');
        $('#step4').collapse('show');
        $('#step5').collapse('show');
        $('#step6').collapse('show');
        $('#step7').collapse('show');
        $('#step8').collapse('show');
        $('#step9').collapse('show');
        $('#step10').collapse('show');
    }
    CloseAllCustomerDetailsModel() {
        $('#step1').collapse('hide');
        $('#step2').collapse('hide');
        $('#step3').collapse('hide');
        $('#step4').collapse('hide');
        $('#step5').collapse('hide');
        $('#step6').collapse('hide');
        $('#step7').collapse('hide');
        $('#step8').collapse('hide');
        $('#step9').collapse('hide');
        $('#step10').collapse('hide');

    }


    dblExpandAllCustomerDetailsModel() {
        $('#step11').collapse('show');
        $('#step12').collapse('show');
        $('#step13').collapse('show');
        $('#step14').collapse('show');
        $('#step15').collapse('show');
        $('#step16').collapse('show');
        $('#step17').collapse('show');
        $('#step18').collapse('show');
        $('#step19').collapse('show');
        $('#step20').collapse('show');
    }
    dblCloseAllCustomerDetailsModel() {
        $('#step11').collapse('hide');
        $('#step12').collapse('hide');
        $('#step13').collapse('hide');
        $('#step14').collapse('hide');
        $('#step15').collapse('hide');
        $('#step16').collapse('hide');
        $('#step17').collapse('hide');
        $('#step18').collapse('hide');
        $('#step19').collapse('hide');
        $('#step20').collapse('hide');

    }




    dismissModel() {
        this.isDeleteMode = false;

        this.modal.close();
    }
    delete(content, rowData) {

        this.isDeleteMode = true;

        this.selectedRowforDelete = rowData;
        this.customerId = rowData.customerId;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    deleteItemAndCloseModel() {
        let customerId = this.customerId;

        if (customerId > 0) {

            this.customerService.updateListstatus(customerId).subscribe(
                response => this.saveCompleted(''),
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
        this.getList(this.lazyLoadEventData);
    }
    private saveFailedHelper(error: any) {

        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

    openContactList(content, row) {
        this.selectedRow = row;
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
        this.loadContactDataData(row.customerId);
    }

    openSitesList(content, row) {
        this.selectedRow = row;
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
        // this.loadContactDataData(row.customerId);
    }

    openDocumentsList(content, row) {
        this.selectedRow = row;
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    private loadContactDataData(customerId) {
        this.alertService.startLoadingMessage();

        this.customerService.getContacts(customerId).subscribe(
            results => this.onContactDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.contactcols = [
            { field: 'tag', header: 'Tag' },
            { field: 'firstName', header: 'First Name' },
            { field: 'lastName', header: 'Last  Name' },
            { field: 'contactTitle', header: 'Contact Title' },
            { field: 'email', header: 'Email' },
            { field: 'workPhone', header: 'Work Phone' },
            { field: 'mobilePhone', header: 'Mobile Phone' },
            { field: 'fax', header: 'Fax' }
        ];
        this.selectedContactColumns = this.contactcols;
    }
    private onContactDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();

        this.dataSource.data = allWorkFlows;
        this.allContacts = allWorkFlows;

        console.log(this.allContacts);
    }
    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();

    }
    getAuditHistoryById(content, row) {

        this.alertService.startLoadingMessage();

        this.customerService.getCustomerHistory(row.customerId).subscribe(
            results => this.onAuditHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));
    }
    private onAuditHistoryLoadSuccessful(auditHistory, content) {
        this.alertService.stopLoadingMessage();


        this.customerauditHisory = auditHistory;

        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    getColorCodeForHistory(i, field, value) {
        const data = this.customerauditHisory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }
    downloadFileUpload(rowData) {

        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadattachedfile?filePath=${rowData.link}`;
        window.location.assign(url);
    }

    viewContactSelectedRow(rowData) {
        this.sourceViewforContact = rowData;

    }




}



