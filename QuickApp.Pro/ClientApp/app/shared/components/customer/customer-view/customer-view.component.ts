import { Component, OnInit, AfterViewInit, ViewChild, Input, ContentChildren } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { CustomerService } from '../../../../services/customer.service';
import { CommonService } from '../../../../services/common.service';
import { NgbModal, NgbActiveModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { ConfigurationService } from '../../../../services/configuration.service';
import { EmployeeService } from '../../../../services/employee.service';



@Component({
    selector: 'app-customer-view',
    templateUrl: './customer-view.component.html',
    styleUrls: ['./customer-view.component.scss'],
    animations: [fadeInOut]
})

export class CustomerViewComponent implements OnInit {

    @Input() customerId;
    viewDataGeneralInformation: any = {};
    viewDataclassification: any[];
    customerContacts: any = [];
    customerContactsColumns: any[];
    pageSize: number = 5;
    restrictHeaders = [
        { field: 'partNumber', header: 'PN' },
        { field: 'partDescription', header: 'Description' },
        { field: 'manufacturerName', header: 'Manufacturer' },

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
        { field: 'documents', header: 'Documents' },
        { field: 'docMemo', header: 'Memo' }
    ];
    customerPMAColumns = [
        { field: 'partNumber', header: 'Part Number' },
        { field: 'partDescription', header: 'Description' },
        { field: 'manufacturerName', header: 'Manufacturer' }
    ];
    customerDERColumns = [
        { field: 'partNumber', header: 'Part Number' },
        { field: 'partDescription', header: 'Description' },
        { field: 'manufacturerName', header: 'Manufacturer' }
    ];
    contactTableColumns = [
        { field: 'tag', header: 'Tag' },
        { field: 'firstName', header: 'First Name' },
        { field: 'lastName', header: 'Last Name' },
        { field: 'contactTitle', header: 'Contact Title' },
        { field: 'email', header: 'Email' },
        { field: 'workPhone', header: 'Work Phone' },
        { field: 'mobilePhone', header: 'Mobile Phone' },
        { field: 'fax', header: 'Fax' },

    ]
    taxTypeRateMappingColumns = [
        { field: 'taxType', header: 'Tax Type' },
        { field: 'taxRate', header: 'Tax Rate' }
    ]
    allCustomerFinanceDocumentsListColumns = [
        { field: 'fileName', header: 'File Name' },
    ]
    aircraftListDataValues: any = [];
    ataListDataValues: any = [];
    billingInfoList: any = [];
    waringInfoList: any = [];
    DocumentsList: any = [];
    domesticShippingData: any;
    internationalShippingData: any = [];
    // loader:boolean=true;
    ataloader:boolean=true;
    salesloader:boolean=true;
    warningsloader:boolean=true;
    filterKeysByValue: object = {};
    taxTypeRateMapping: any = [];
    restrictedPMAParts: any = [];
    restrictedDERParts: any = [];
    disableRestrictedPMA: boolean = false;
    classificationIds: any[];
    viewDataIntegration: any;
    allCustomerFinanceDocumentsList: any = [];
    countOfRestrictDerParts: any = 0;
    countOfRestrictPMAParts: any = 0;
    employeeListOriginal: any = [];
    constructor(public customerService: CustomerService, private commonService: CommonService, private activeModal: NgbActiveModal, private configurations: ConfigurationService, public employeeService: EmployeeService
    ) {


    }
    ngOnInit(): void {

        this.customerContactsColumns = [
            { field: 'tag', header: 'Tag' },
            { field: 'firstName', header: 'First Name' },
            { field: 'lastName', header: 'Last Name' },
            { field: 'contactTitle', header: 'Contact Title' },
            { field: 'email', header: 'Email' },
            { field: 'workPhone', header: 'Work Phone' },
            { field: 'mobilePhone', header: 'Mobile Phone' },
            { field: 'fax', header: 'Fax' },

        ];
        let customerId = this.customerId;
        this.customerService.getCustomerdataById(customerId).subscribe(res => {
            this.salesloader=false;
            this.getAllEmployees();
            // this.getAllCustomerContact(customerId);
            this.getAircraftMappedDataByCustomerId(customerId);
            this.getMappedATAByCustomerId(customerId);
            // this.getBillingDataById(customerId);
            // this.getDomesticShippingByCustomerId(customerId);
            // this.getInternationalShippingByCustomerId(customerId);
            this.getCustomerWaringByCustomerId(customerId);
            this.getCustomerDocumentsByCustomerId(customerId);
            this.getMappedTaxTypeRateDetails(customerId);
            this.getCustomerRestrictedPMAByCustomerId(customerId);
            this.getCustomerRestrictedDERByCustomerId(customerId);
            this.getCustomerClassificationByCustomerId(customerId);
            this.getCustomerIntegrationTypesByCustomerId(customerId);
            this.toGetCustomerFinanceDocumentsList(customerId);
            this.viewDataGeneralInformation = res[0];
            //debugger
            console.log(this.viewDataGeneralInformation);
        
       }, err => {
            this.salesloader=false;
        })
        // this.openStep1();


    }

    getPageCount(totalNoofRecords, pageSize) {
        return Math.ceil(totalNoofRecords / pageSize)
    }

    async getAllEmployees() {
        await this.employeeService.getEmployeeList().subscribe(res => {
            this.employeeListOriginal = res[0];
            const primarySName1 = this.employeeListOriginal.find(x => x.employeeId == this.viewDataGeneralInformation.primarySalesPersonId)
            this.viewDataGeneralInformation.primarySalesPersonFirstName = primarySName1.firstName + " " + primarySName1.lastName
            const secondarySName1 = this.employeeListOriginal.find(x => x.employeeId == this.viewDataGeneralInformation.secondarySalesPersonId)
            this.viewDataGeneralInformation.secondarySalesPersonName = secondarySName1.firstName + " " + secondarySName1.lastName
            const csrName1 = this.employeeListOriginal.find(x => x.employeeId == this.viewDataGeneralInformation.csrId)
            this.viewDataGeneralInformation.csrName = csrName1.firstName + " " + csrName1.lastName
            const saName1 = this.employeeListOriginal.find(x => x.employeeId == this.viewDataGeneralInformation.saId)
            this.viewDataGeneralInformation.agentName = saName1.firstName + " " + saName1.lastName



        })
    }



    getAllCustomerContact(customerId) {
        // get Customer Contatcs 
        this.customerService.getContacts(customerId).subscribe(res => {
            this.customerContacts = res[0] || [];
        })
    }

    getAircraftMappedDataByCustomerId(customerId) {
        // const id = this.savedGeneralInformationData.customerId;
        this.customerService.getMappedAirCraftDetails(customerId).subscribe(res => {
            this.aircraftListDataValues = res || [];
        })
    }
    async getMappedATAByCustomerId(customerId) {
        // const id = this.savedGeneralInformationData.customerId;
        await this.customerService.getATAMappedByCustomerId(customerId).subscribe(res => {
            this.ataListDataValues = res || [];
            this.ataloader=false;
        }, err => {
            this.ataloader=false;
        })
    }
    async getBillingDataById(customerId) {
        await this.customerService.getCustomerBillViaDetails(customerId).subscribe(res => {
            this.billingInfoList = res[0] || []
        })
    }


    // get domestic shipping by customer Id 
    async getDomesticShippingByCustomerId(customerId) {
        // const id = this.savedGeneralInformationData.customerId;
        await this.customerService.getCustomerShipAddressGet(customerId).subscribe(res => {
            this.domesticShippingData = res[0] || [];
        })
    }

    async getInternationalShippingByCustomerId(customerId) {

        // const id = this.savedGeneralInformationData.customerId;

        await this.customerService.getInternationalShippingByCustomerId(customerId, 0, 20).subscribe(res => {
            this.internationalShippingData = res.paginationList || [];
            // this.totalRecordsForInternationalShipping = res.totalRecordsCount;
            // this.loader = true;
        }, err => {
            // this.loader = false;
            })



    }

    async getCustomerWaringByCustomerId(customerId) {
        await this.customerService.getCustomerWarnings(customerId).subscribe(res => {
            this.warningsloader=false;
            this.waringInfoList = res[0].map(x => {
                return {
                    ...x,
                    sourceModule: `${x.t.sourceModule == null ? '' : x.t.sourceModule}`,
                    warningMessage: `${x.t.warningMessage == null ? '' : x.t.warningMessage}`,
                    restrictMessage: `${x.t.restrictMessage == null ? '' : x.t.restrictMessage}`
                };
            }) || [];


        }, err => {
            this.warningsloader=false;
        })
    }

    async getCustomerDocumentsByCustomerId(customerId) {

        await this.customerService.getDocumentList(customerId).subscribe(res => {
            this.DocumentsList = res || [];
        })
    }

    async getMappedTaxTypeRateDetails(customerId) {

        await this.customerService.getMappedTaxTypeRateDetails(customerId).subscribe(res => {
            this.taxTypeRateMapping = res || [];

        })
    }

    getCustomerRestrictedPMAByCustomerId(customerId) {

        this.commonService.getRestrictedPartsWithDesc(1, customerId, 'PMA').subscribe(res => {
            this.restrictedPMAParts = res || [];

        })
    }


    getCustomerRestrictedDERByCustomerId(customerId) {

        this.commonService.getRestrictedPartsWithDesc(1, customerId, 'DER').subscribe(res => {

            this.restrictedDERParts = res || [];


        })
    }

    async getCustomerClassificationByCustomerId(customerId) {

        await this.customerService.getCustomerClassificationMapping(customerId).subscribe(res => {
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
    downloadFileUpload(rowData) {

        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadattachedfile?filePath=${rowData.link}`;
        window.location.assign(url);
    }
    dismissModel() {
        //this.isDeleteMode = false;

        this.activeModal.close();
    }
    openStep1() {
        $('#step1').collapse('show');
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




}