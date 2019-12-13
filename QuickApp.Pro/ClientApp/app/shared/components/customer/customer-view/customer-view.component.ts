import { Component, OnInit, AfterViewInit, ViewChild,Input } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { CustomerService } from '../../../../services/customer.service';
import { CommonService } from '../../../../services/common.service';
import { NgbModal, NgbActiveModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';



@Component({
    selector: 'app-customer-view',
    templateUrl: './customer-view.component.html',
    styleUrls: ['./customer-view.component.scss'],
    animations: [fadeInOut]
})

export class CustomerViewComponent implements OnInit {
  
    @Input() public customerId;
    viewDataGeneralInformation: any[];
    viewDataclassification: any[];
    customerContacts: any;
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
        { field: 'memo', header: 'Memo' },
    ];
    customerDERColumns = [
        { field: 'partNumber', header: 'Part Number' },
        { field: 'memo', header: 'Memo' },
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
    constructor(public customerService: CustomerService,private commonService: CommonService,private activeModal: NgbActiveModal,) {
      

    }
    ngOnInit(): void {
        let customerId = this.customerId;
        this.customerService.getCustomerdataById(customerId).subscribe(res => {
            this.viewDataGeneralInformation = res[0];
        })
        this.getAllCustomerContact(customerId);
        this.getAircraftMappedDataByCustomerId(customerId);
        this.getMappedATAByCustomerId(customerId);
        this.getBillingDataById(customerId);
        this.getDomesticShippingByCustomerId(customerId);
        this.getInternationalShippingByCustomerId(customerId);
        this.getCustomerWaringByCustomerId(customerId);
        this.getCustomerDocumentsByCustomerId(customerId);
        this.getMappedTaxTypeRateDetails(customerId);
        this.getCustomerRestrictedPMAByCustomerId(customerId);
        this.getCustomerRestrictedDERByCustomerId(customerId);
        this.getCustomerClassificationByCustomerId(customerId) 
       
    }

    getAllCustomerContact(customerId) {
        // get Customer Contatcs 
        this.customerService.getContacts(customerId).subscribe(res => {
            this.customerContacts = res[0]
        })
    }

    getAircraftMappedDataByCustomerId(customerId) {
        // const id = this.savedGeneralInformationData.customerId;
        this.customerService.getMappedAirCraftDetails(customerId).subscribe(res => {
            this.aircraftListDataValues = res;
        })
    }
    getMappedATAByCustomerId(customerId) {
        // const id = this.savedGeneralInformationData.customerId;
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
        // const id = this.savedGeneralInformationData.customerId;
        this.customerService.getCustomerShipAddressGet(customerId).subscribe(res => {
            console.log(res);
            this.domesticShippingData = res[0];
        })
    }

    getInternationalShippingByCustomerId(customerId) {

        // const id = this.savedGeneralInformationData.customerId;

        this.customerService.getInternationalShippingByCustomerId(customerId, 0, 20).subscribe(res => {
            console.log(res);
            this.internationalShippingData = res.paginationList;
            // this.totalRecordsForInternationalShipping = res.totalRecordsCount;
        })



    }

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

            this.commonService.getRestrictedParts(1, customerId, 'PMA').subscribe(res => {
             
            this.restrictedPMAParts = res;
            
           
    })
    }


    getCustomerRestrictedDERByCustomerId(customerId) {
     
            this.commonService.getRestrictedParts(1, customerId, 'DER').subscribe(res => {

            this.restrictedDERParts = res;


        })
    }

      getCustomerClassificationByCustomerId(customerId) {

         this.customerService.getCustomerClassificationMapping(customerId).subscribe(res => {
             this.viewDataclassification = res.map(x => x.description);
            
            // console.log(this.generalInformation.customerClassificationIds);
        });
    }
    dismissModel() {
        //this.isDeleteMode = false;
      
        this.activeModal.close();
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