import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOut } from '../../../services/animations';
import { AuthService } from '../../../services/auth.service';
import { MessageSeverity, AlertService } from '../../../services/alert.service';
import { CustomerService } from '../../../services/customer.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { Router } from '@angular/router';
import { CustomerClassification } from '../../../models/customer-classification.model';
import { HttpClient } from '@angular/common/http';
import { CustomerClassificationService } from '../../../services/CustomerClassification.service';
import { IntegrationService } from '../../../services/integration-service';
import { AtaMainService } from '../../../services/atamain.service';
import { VendorService } from '../../../services/vendor.service';
import { Currency } from '../../../models/currency.model';
import { CurrencyService } from '../../../services/currency.service';
import { CustomerGeneralInformation } from '../../../models/customer-general.model';
import { getValueFromObjectByKey, getObjectByValue, validateRecordExistsOrNot, editValueAssignByCondition, getObjectById, selectedValueValidate } from '../../../generic/autocomplete';
import { ItemMasterService } from '../../../services/itemMaster.service';
import { CommonService } from '../../../services/common.service';
import { emailPattern, urlPattern } from '../../../validations/validation-pattern';

@Component({
    selector: 'app-customer-general-information',
    templateUrl: './customer-general-information.component.html',
    styleUrls: ['./customer-general-information.component.scss'],
    animations: [fadeInOut]
})

export class CustomerGeneralInformationComponent implements OnInit {
    @Input() countryListOriginal;
    @Input() editCustomerId;
    @Input() editMode;
    @Input() customerListOriginal;
    @Input() customerallListOriginal;
    @Output() tab = new EventEmitter<any>();
    @Output() saveGeneralInformationData = new EventEmitter<any>();

    @Output() editGeneralInformation = new EventEmitter<any>();

    generalInformation = new CustomerGeneralInformation();
    generalInformation1 = new CustomerGeneralInformation();
    emailPattern = emailPattern();
    urlPattern = urlPattern();
    customertypes: any[];
    customerNames: { customerId: any; name: any; }[];
    //customerListOriginal: { customerId: any; name: any; }[];


    customerCodes: { customerId: any; name: any; }[];
    // countryListOriginal: any[];
    countrycollection: any[];
    allcustomerclassificationInfo;
    integrationOriginalList = [
        
    ];
    allCurrencyInfo: Currency[];
    memoPopupContent: any;
    memoPopupValue: any;
    isCustomerNameAlreadyExists: boolean = false;
    isCustomerCodeAlreadyExists: boolean = false;
    //emailPattern = "[a-zA-Z0-9.-]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z0-9]{2,}";
    //urlPattern = "^((ht|f)tp(s?))\://([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(/\S*)?$";

    classificationNew = {
        description: '',
        isActive: true
    }
    addNewclassification = { ...this.classificationNew }
    classificationList: any;
    isClassificationAlreadyExists: boolean = false;
    intergrationNew = {
        isActive: true,
        description: '',
        memo: '',
        portalURL: '',
    }
    addNewIntergation = { ...this.intergrationNew }
    isIntegrationAlreadyExists: boolean = false;
    integrationList: any[];
    selectedIntegrations = []
    isEdit: any = false;
    id: number;
    editData: any;
    partListForPMA: any;
    partListForDER: any;
    partListOriginal: any;
    selectedActionName: any;
    disableSaveCustomerName: boolean;
    disableSaveParentName: boolean;
    disableRestrictedDER: boolean = false;
    disableRestrictedPMA: boolean = false;
    // restrictsPMAList: any;
    // restrictBERList: any;
    restictDERtempList: any = [];
    restictPMAtempList: any = [];
  
    restrictedDERParts: any = [];
    restrictedPMAParts: any = [];
    restrictHeaders = [
        { field: 'partNumber', header: 'PN' },
        { field: 'partDescription', header: 'Description' },
        { field: 'manufacturerName', header: 'Manufacturer' },

    ];
    selectedClassificationRecordForEdit: any;
    tempClassifciatonIds: any = [];
    tempIntegrationIds: any = [];
    changeName: boolean = false;
    ataListDataValues: any;
    // editData: any;

    // selectedCustomerCodeData: any;

    // enteredTextForCustomerName: any;
    // customerCodeAlreadyExists: boolean = false;









    // displayCustomerClassification: boolean;
    // disableSaveCustomerClassificationSave: boolean;
    // cityError: boolean;
    // customerAddressLine1Error: boolean;
    // customerTypeError: boolean;
    // customerClassificationError: boolean;
    // customerCountryError: boolean;
    // customerPostalCodeError: boolean;
    // customerCurrencyError: boolean;
    // customerStateOrProvidenceError: boolean;
    // customerEmailError: boolean;
    // customerPhoneError: boolean;
    // customerCodeError: boolean;
    // customerNameError: boolean;
    // //mobnumPattern = "^((\\+91-?)|0)?[0-9]{13}$";
    // emailPattern = "[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}";

    // allSubChapter: ATAChapter[];

    // disableSaveCusCode: boolean;
    // disableSaveCusName: boolean;
    // disableSaveContries: boolean = false;
    // disableSaveCustomerCode: boolean;
    // selectedCustomerCode: any;
    // customerCodesColl: any[] = [];
    // selectedActionName: any;
    // address1: string;
    // disableSave: boolean;
    // customerNamecoll: any[] = [];
    // countrycollection: any[];
    // countryName: string;
    // allCountryinfo: any[];
    // allATAMaininfo: ATAChapter[] = [];
    // selectedAircraftTypes: any;
    // activeIndex: number;
    // ATAChapterId: number;
    // ataChapterName: any;
    // atachaptercollection: any[];
    // addressObj: any;
    // allAircraftinfo: any[];
    // allaircraftInfo: any;
    // allatachapterInfo: any[];
    // atachapterName: any[];
    // customertypes: any[];
    // showCustomerClassificationId: boolean;
    // showCustomerCountry: boolean;
    // showCustomerPostal: boolean;
    // showCustomerState: boolean;
    // showCustomerCity: boolean;
    // showCustomerAddress1: boolean;
    // showCustomerPhone: boolean;
    // showCustomerEmail: boolean;
    // showCustomerCode: boolean;
    // showCustomerName: boolean;
    // showCustomerTypeId: boolean;
    // integrationCollection: any[];
    // shiftValues: any[] = [];
    // classificollection: any[];
    // showcontractReference: boolean;
    // showcustomerCode: boolean;
    // showcustomerName: boolean;
    // isEnabeCapes: boolean = false;
    // showalert: boolean;
    // showLable: boolean;
    // cusname: any;
    // allCustomerClassInfo: CustomerClassification[];
    // allcustomerclassificationInfo: CustomerClassification[] = [];
    // allIntegrationInfo: Integration[] = [];
    // customerClassName: any;
    // customerCollection: any[];
    // customerNames: any[];
    // customerCodes: any[];
    // localCollection: any;
    // auditHistoryCollection: any = {};
    // public sourceAuditHistory: any = {};
    // customerName: any;
    // customerCode: any;
    // checkAddress: boolean = false;
    // allgeneralInfo: any[];
    // closeCmpny: boolean = true;
    // service: boolean = false;
    // customerId: any;
    // addressId: any;
    // allAddresses: any[];
    // description: any = "";
    // modelName: any = "";
    // action_name: any = "";
    // memo: any = "";
    // createdBy: any = "";
    // updatedBy: any = "";
    // createddate: any = "";
    // updatedDate: any = "";
    // customerParentName: any = "";
    // local: any;
    // CustomerInfoByName: any[] = [];
    // selectedModels: any[] = [];
    // manfacturerAircraftmodelsarray: any[] = [];
    // distributionAircraftmodelsarray: any[] = [];
    // overhaulAircraftmodelsarray: any[] = [];
    // certificationarrayAircraftmodelsarray: any[] = [];
    // repairAircraftmodelsarray: any[] = [];
    // exchangeAircraftmodelsarray: any[] = [];
    // showInput: boolean;
    // capesCollection: any[] = [];
    // customergeneralCollection: any[] = [];
    // data: any;
    // disablesave: boolean;
    // selectedCountries: any;
    // localCountrycollecton: any[];
    // allAircraftManufacturer: any[] = [];
    // integrationvalues: any[] = [];
    // allintegrationdetails: any;
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ViewChild(MatSort) sort: MatSort;
    // filteredBrands: any[];
    // displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    // dataSource: MatTableDataSource<any>;
    // allActions: any[] = [];
    // allComapnies: MasterCompany[] = [];
    // private isSaving: boolean;
    // public sourceAction: any = {};
    // public sourceClassification: any = {};
    // public auditHisory: AuditHistory[] = [];
    // private bodyText: string;
    // loadingIndicator: boolean;
    // closeResult: string;
    // selectedColumn: any[];
    // selectedColumns: any[];
    // cols: any[];
    // title: string = "Create";
    // id: number;
    // errorMessage: any;
    // modal: NgbModalRef;
    // actionName: string;
    // Active: string = "Active";
    // collection: any;
    // options: any;
    // public overlays: any[];
    // msgs: Message[];
    // classificationName: string;
    // integrationName: string;
    // uploadedFiles: any[] = [];
    // display: boolean = false; //prime ng Model
    // modelValue: boolean = false;
    // enablePopupData: boolean = false;
    // allManagemtninfo: any[] = [];
    // bulist: any[] = [];
    // bulistovh: any[] = [];
    // departmentList: any[] = [];
    // departmentListovh: any[] = [];
    // divisionlist: any[] = [];
    // divisionlistovh: any[] = [];
    // maincompanylist: any[] = [];
    // /** Actions ctor */
    // collectionofItemMaster: any;
    // private isEditMode: boolean = false;
    // private isDeleteMode: boolean = false;
    // allAircraftsGet: any[] = [];
    // isCustomerAlsoVendor: boolean = false;
    // enablePlus: boolean = false;
    // ataChapterId: any;
    // selectedIntegrationTypes: any[];
    // public allWorkFlows: any[] = [];
    // sourceCustomer: any = {};
    // allCurrencyInfo: any[];
    // selectedCustomerClassification: any;
    // disableSaveCustomerClassification: boolean;
    // disableSaveParentName: boolean;
    // integrationCols: any[];
    // intSelectedColumns: any[];
    // memoPopupContent: string;
    // memoPopupValue: string;
    // //@ViewChild('generalInfoForm') gIForm: NgForm;

    // ngOnInit(): void {
    //     //if (this.workFlowtService.isEditMode == false) {
    //     //    this.gIForm.resetForm();
    //     //}
    //     this.sourceCustomer.isAddressForBilling = true;
    //     this.sourceCustomer.isAddressForShipping = true;
    //     this.workFlowtService.currentUrl = '/customersmodule/customerpages/app-customer-general-information';
    //     this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
    //     //steps Code  Start
    //     this.workFlowtService.ShowPtab = true;
    //     this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab); //steps
    //     this.activeIndex = 0;
    //     //steps Code  End
    //     this.getAircraftModelsData();
    //     this.workFlowtService.indexObj.next(this.activeIndex);
    //     if (this.workFlowtService.enableExternal == false) {
    //         this.sourceCustomer.customerAffiliationId = 2;
    //     }
    //     this.loadData();
    //     this.loadDataCustomerData();
    //     this.integrationalData();
    //     this.customertypeData();
    //     this.atamaindata();
    //     this.aircraftmodelData();
    //     this.countrylist();
    //     this.Integration();
    //     this.loadCustomerClassifiData();
    //     this.options = {
    //         center: { lat: 36.890257, lng: 30.707417 },
    //         zoom: 12
    //     };
    //     if (this.workFlowtService.generalCollection) {
    //         this.sourceCustomer = this.workFlowtService.generalCollection;
    //     }

    //     this.loadCurrencyData();

    //     if (!this.classificationName) {
    //         this.disableSaveCustomerClassificationSave = true;
    //     }


    //     if (!this.intSelectedColumns) {
    //         this.intSelectedColumns = this.cols;
    //     }

    // }


    constructor(public integrationService: IntegrationService, public customerClassificationService: CustomerClassificationService, public ataservice: AtaMainService, private authService: AuthService, private alertService: AlertService,
        public customerService: CustomerService, public itemService: ItemMasterService, public vendorser: VendorService, private currencyService: CurrencyService, private commonService: CommonService) {


        //     this.dataSource = new MatTableDataSource();

        //     // if (this.workFlowtService.listCollection != null && this.workFlowtService.isEditMode == true) {
        //     //     //debugger;
        //     //     this.showLable = true;
        //     //     this.local = this.workFlowtService.listCollection.t;
        //     //     this.sourceCustomer = this.workFlowtService.listCollection.t;
        //     //     this.sourceCustomer.address1 = this.workFlowtService.listCollection.address1;
        //     //     this.sourceCustomer.address2 = this.workFlowtService.listCollection.address2;
        //     //     this.sourceCustomer.address3 = this.workFlowtService.listCollection.address3;
        //     //     this.sourceCustomer.city = this.workFlowtService.listCollection.city;
        //     //     this.sourceCustomer.country = this.workFlowtService.listCollection.country;
        //     //     this.sourceCustomer.stateOrProvince = this.workFlowtService.listCollection.stateOrProvince;
        //     //     this.sourceCustomer.postalCode = this.workFlowtService.listCollection.postalCode;
        //     //     this.sourceAuditHistory = this.workFlowtService.listCollection.ad;
        //     //     this.sourceAuditHistory.addressId = this.workFlowtService.listCollection.ad.addressId;
        //     //     this.sourceAuditHistory.line1 = this.workFlowtService.listCollection.ad.line1;
        //     //     this.sourceAuditHistory.line2 = this.workFlowtService.listCollection.ad.line2;
        //     //     this.sourceAuditHistory.line3 = this.workFlowtService.listCollection.ad.line3;
        //     //     this.sourceAuditHistory.city = this.workFlowtService.listCollection.ad.city;
        //     //     this.sourceAuditHistory.country = this.workFlowtService.listCollection.ad.country;
        //     //     this.sourceAuditHistory.stateOrProvince = this.workFlowtService.listCollection.ad.stateOrProvince;
        //     //     this.sourceAuditHistory.postalCode = this.workFlowtService.listCollection.ad.postalCode;
        //     //     this.sourceCustomer.customerAffiliationId = this.sourceCustomer.customerAffiliationId;
        //     //     if (this.workFlowtService.listCollection.t.ataChapterId) {
        //     //         this.getATASubChapterData(this.workFlowtService.listCollection.t.ataChapterId);
        //     //     }

        //     // }
        //     // if (this.vendorser.isVendorAlsoCustomer == true) {
        //     //     this.sourceCustomer = this.vendorser.localCollectiontoCustomer;
        //     //     this.sourceCustomer.email = this.vendorser.localCollectiontoCustomer.vendorEmail;
        //     //     this.sourceCustomer.customerPhone = this.vendorser.localCollectiontoCustomer.vendorPhone;
        //     //     this.sourceCustomer.name = this.vendorser.localCollectiontoCustomer.vendorName;
        //     //     this.sourceCustomer.customerCode = this.vendorser.localCollectiontoCustomer.vendorCode;
        //     //     this.sourceCustomer.doingBuinessAsName = this.vendorser.localCollectiontoCustomer.doingBusinessAsName;
        //     //     this.sourceCustomer.postalCode = this.vendorser.localCollectiontoCustomer.PostalCode;

        //     // }

    }


    ngOnInit() {
        this.id = this.editCustomerId;
        this.isEdit = this.editMode;


        this.getAllCustomerTypes();
        this.getAllPartList();
        //this.getAllCustomers();

        this.getAllCustomerClassification();
        // this.getAllCurrency();
        // this.getAllClassification();
        this.getAllIntegrations()

        if (this.isEdit) {
            this.customerService.getCustomerdataById(this.id).subscribe(response => {
                console.log(response);

                const res = response[0];

                this.editGeneralInformation.emit(res);
                this.editData = res;

                this.generalInformation = {
                    ...this.editData,
                    name: getObjectByValue('name', res.name, this.customerallListOriginal),
                    country: getObjectById('countries_id', res.country, this.countryListOriginal),
                    customerParentName: getObjectByValue('name', res.customerParentName, this.customerallListOriginal),
                    customerCode: getObjectByValue('customerCode', res.customerCode, this.customerallListOriginal)

                };
                this.generalInformation1 = {
                    ...this.editData,
                  
                    country: getObjectById('countries_id', res.country, this.countryListOriginal),
                    customerParentName: getObjectByValue('name', res.customerParentName, this.customerallListOriginal),
                    customerCode: getObjectByValue('customerCode', res.customerCode, this.customerallListOriginal),

                    
                };


                // this.editData = {
                //     addressId: res.addressId,
                //     isAddressForBilling: res.t.isAddressForBilling,
                //     isAddressForShipping: res.t.isAddressForShipping,
                //     customerAffiliationId: res.customerAffiliationId,
                //     customerTypeId: res.t.customerTypeId,
                //     //name: res.name,
                //     name: getObjectByValue('name', res.name, this.customerListOriginal),
                //     customerPhone: res.t.customerPhone,
                //     email: res.email,
                //     address1: res.ad.line1,
                //     address2: res.ad.line2,
                //     address3: res.ad.line3,
                //     city: res.ad.city,
                //     stateOrProvince: res.ad.stateOrProvince,
                //     postalCode: res.ad.postalCode,
                //     country: getObjectByValue('nice_name', res.ad.country, this.countryListOriginal),
                //     //customerCode: res.customerCode,
                //     customerCode: getObjectByValue('customerCode', res.customerCode, this.customerListOriginal),
                //     doingBuinessAsName: res.doingBuinessAsName,
                //     parent: res.parent,
                //     customerParentName: getObjectByValue('name', res.t.customerParentName, this.customerListOriginal),
                //     customerURL: res.customerURL,
                //     generalCurrencyId: res.t.generalCurrencyId,
                //     customerClassificationId: res.customerClassificationId,
                //     contractReference: res.contractReference,
                //     isPBHCustomer: res.t.isPBHCustomer,
                //     pbhCustomerMemo: res.t.pbhCustomerMemo,
                //     restrictPMA: res.t.restrictPMA,
                //     restrictPMAMemo: res.t.restrictPMAMemo,
                //     restrictBER: res.t.restrictBER,
                //     restrictBERMemo: res.t.restrictBERMemo,
                //     scanDocuments: res.t.scanDocuments,
                //     isCustomerAlsoVendor: res.t.isCustomerAlsoVendor,
                //     edi: res.t.edi,
                //     ediDescription: res.t.ediDescription,
                //     isAeroExchange: res.t.isAeroExchange,
                //     aeroExchangeDescription: res.t.aeroExchangeDescription,
                //     createdBy: res.createdBy,
                //     updatedBy: res.updatedBy,
                //     masterCompanyId: res.t.masterCompanyId,
                //     isActive: res.t.isActive

                // }


            });

        
            this.getCustomerIntegrationTypesByCustomerId();

            setTimeout(() => { 
                this.getCustomerRestrictedPMAByCustomerId();
            }, 1000);

            setTimeout(() => { 
                this.getCustomerRestrictedDERByCustomerId();
            }, 1000);

            setTimeout(() => { 
                this.getCustomerClassificationByCustomerId();
            }, 1000);

            
        }
    }

   
    async  getCustomerClassificationByCustomerId() {
       
        await this.customerService.getCustomerClassificationMapping(this.id).subscribe(res => {
            this.generalInformation.customerClassificationIds = res.map(x => x.customerClassificationId);
            // console.log(this.generalInformation.customerClassificationIds);
        });
    }

    //async getCustomerIntegrationTypesByCustomerId() {
    //    await this.customerService.getintegrationtypes(this.id).subscribe(res => {
    //        this.generalInformation.integrationPortalId = res.map(x => x.integrationPortalId)
    //        console.log(this.generalInformation.integrationPortalId);
    //    });
    //}

    async  getCustomerIntegrationTypesByCustomerId() {
        if (this.id > 0) {
            await this.commonService.getIntegrationMapping(this.id, 1).subscribe(res => {
                this.generalInformation.integrationPortalId = res.map(x => x.integrationPortalId);

            });
        }

    }


    async    getCustomerRestrictedPMAByCustomerId() {
       
     //await    this.commonService.getRestrictedParts(1, this.id, 'PMA').subscribe(res => {
        await this.commonService.getRestrictedPartsWithDesc(1, this.id, 'PMA').subscribe(res => {
        
           this.generalInformation.restrictedPMAParts = res;
            if (this.generalInformation.restrictedPMAParts.length > 0) {
                this.disableRestrictedPMA = true;
            }
            

            this.restictPMAtempList = res.map(x => x.rescrictedPartId);
            this.partListForPMA = this.generalInformation.restrictedPMAParts.reduce((acc, obj) => {
                return acc.filter(x => x.value.masterPartId !== obj.masterPartId)
            }, this.partListOriginal) 
            // this.generalInformation.restrictedPMAParts = res.map(x => {
            //     return  { 
            //          masterPartId: x.itemMasterId,
            //          partNumber: x.partNumber, 
            //          memo: x.memo, 
            //          createdBy: x.createdBy,
            //          updatedBy: x.updatedBy
            //     }
            // });

        })
        
    }

    async getCustomerRestrictedDERByCustomerId() {
        //await this.commonService.getRestrictedParts(1, this.id, 'DER').subscribe(res => {
        await this.commonService.getRestrictedPartsWithDesc(1, this.id, 'DER').subscribe(res => {

            this.generalInformation.restrictedDERParts = res;
            if (this.generalInformation.restrictedDERParts.length > 0) {
                this.disableRestrictedDER = true;
            }
            this.restictDERtempList = res.map(x => x.itemMasterId);
            this.partListForDER = this.generalInformation.restrictedDERParts.reduce((acc, obj) => {
                return acc.filter(x => x.value.masterPartId !== obj.masterPartId)
            }, this.partListOriginal)
            // this.generalInformation.restrictedDERParts = res.map(x => {
            //     return  { 
            //          masterPartId: x.itemMasterId,
            //          partNumber: x.partNumber, 
            //          memo: x.memo, 
            //          createdBy: x.createdBy,
            //          updatedBy: x.updatedBy
            //     }
            // });

        })
    }


    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    // getAllClassification(){
    //     this.customerClassificationService.getCustomerClassificationList().subscribe(
    //                 res => {
    //                     this.classificationList = res;
    //                 }
    //             );
    // }

    getAllPartList() {
        this.itemService.getPrtnumberslistListwithManufacturer().subscribe(res => {
            const data = res[0];

            this.partListOriginal = data.map(x => {
                return {
                    label: x.partNumber, value: { masterPartId: x.itemMasterId, partNumber: x.partNumber, memo: x.memo, createdBy: this.userName, updatedBy: this.userName, partDescription: x.partDescription, manufacturerName: x.manufacturerName }
                }
            })
            this.partListForPMA = [...this.partListOriginal];
            this.partListForDER = [...this.partListOriginal];
        })
    }
    getAllIntegrations() {
        this.integrationService.getWorkFlows().subscribe(res => {
            const responseData = res[0]
            this.integrationOriginalList = responseData.map(x => {
                return {
                    label: x.description, value: x.integrationPortalId
                }
            })
            console.log(this.integrationOriginalList)

        })
    }
    getAllCustomerTypes() {
        this.customerService.getCustomerTypes().subscribe(res => {
            const responseData = res[0];
            this.customertypes = responseData;
        })
    }
    addclassification() {
        this.isClassificationAlreadyExists = false;
        this.addNewclassification.description = '';
    }

    // async getAllCustomers() {
    //     await this.customerService.getCustomers().subscribe(res => {
    //         this.customerListOriginal = res[0];
    //         console.log(this.customerListOriginal)
    //     })
    // }
    // getAllCountries() {
    //     this.customerService.getCountrylist().subscribe(res => {
    //         this.countryListOriginal = res[0];
    //     })
    // }
    async getAllCustomerClassification() {
        await this.commonService.smartDropDownList('CustomerClassification', 'CustomerClassificationId', 'Description').subscribe(res => {
            this.allcustomerclassificationInfo = res;
        });
        //await this.customerClassificationService.getCustomerClassificationList().subscribe(res => {
        //    const responseData = res[0];
        //    this.allcustomerclassificationInfo = responseData.map(x => {
        //        return {
        //            label: x.description, value: x.customerClassificationId
        //        }
        //        // console.log(this.allcustomerclassificationInfo);
        //        // if (x.isActive === true) {
        //        //     return x;
        //        // }
        //    })

        //})
    }
    selectedPartForPMA(event) {
        console.log(event)

    }
    // filterpartItems(event){
    //     this.partList = this.partListOriginal;


    //     this.partList = [...this.partListOriginal.filter(x => {
    //         return x.partNumber.toLowerCase().includes(event.query.toLowerCase())
    //     })] 
    // }

    addRestrictPMA() {
        if (this.restictPMAtempList.length > 0) {
            this.disableRestrictedPMA = true;
            for(let i=0; i<this.restictPMAtempList.length; i++){
                if(this.restictPMAtempList[i] != undefined){
                    this.generalInformation.restrictedPMAParts = [...this.generalInformation.restrictedPMAParts, this.restictPMAtempList[i]];
                }
            }
            this.generalInformation.restrictedPMAParts=this.generalInformation.restrictedPMAParts.slice();
            this.partListForPMA = this.generalInformation.restrictedPMAParts.reduce((acc, obj) => {
                return acc.filter(x => x.value.masterPartId !== obj.masterPartId)
            }, this.partListOriginal)                
        this.restictPMAtempList = [];                            
        }
    }
    deleteRestirctPMA(i, rowData) {
      
        if (rowData.restrictedPartId > 0) {

            this.customerService.deleteRestrictedPartsById(rowData.restrictedPartId, this.userName).subscribe(res => {
                this.alertService.showMessage(
                    'Success',
                    `Sucessfully Deleted Restricted Part`,
                    MessageSeverity.success
                );
            })
        }
        this.partListForPMA = [{ label: rowData.partNumber, value: rowData }, ...this.partListForPMA];
        this.generalInformation.restrictedPMAParts.splice(i, 1);
       
        if (this.generalInformation.restrictedPMAParts.length == 0) {
            this.disableRestrictedPMA = false;
        }
       
    }
    patternMobilevalidationWithSpl(event: any) {
        const pattern = /[0-9\+\-()\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }

    }
    checkaddress() {
       
        this.generalInformation.isAddressForBilling= true;
        this.generalInformation.isAddressForShipping= true;
    }
    addRestrictBER() {        
        if (this.restictDERtempList.length > 0) {
            this.disableRestrictedDER = true;
            for(let i=0; i<this.restictDERtempList.length; i++){
                if(this.restictDERtempList[i] != undefined){
                    this.generalInformation.restrictedDERParts = [...this.generalInformation.restrictedDERParts, this.restictDERtempList[i]];
                }
            }
            this.generalInformation.restrictedDERParts=this.generalInformation.restrictedDERParts.slice();
            this.partListForDER = this.generalInformation.restrictedDERParts.reduce((acc, obj) => {
                return acc.filter(x => x.value.masterPartId !== obj.masterPartId)
            }, this.partListOriginal)                
        this.restictDERtempList = [];                            
        }
            
    }
    deleteRestrictDER(i, rowData) {
        if (rowData.restrictedPartId > 0) {

            this.customerService.deleteRestrictedPartsById(rowData.restrictedPartId, this.userName).subscribe(res => {
                this.alertService.showMessage(
                    'Success',
                    `Sucessfully Deleted Restricted Part`,
                    MessageSeverity.success
                );
            })
        }
        this.partListForDER = [{ label: rowData.partNumber, value: rowData }, ...this.partListForDER];
        this.generalInformation.restrictedDERParts.splice(i, 1);
        if (this.generalInformation.restrictedDERParts.length == 0) {
            this.disableRestrictedDER = false;
        }

    }


    filterclassifications(event) {
        this.classificationList = this.allcustomerclassificationInfo;

        this.classificationList = [...this.allcustomerclassificationInfo.filter(x => {
            return x.label.toLowerCase().includes(event.query.toLowerCase());
            })
        ];

    }
    filterCustomerNames(event) {
        // this.enteredTextForCustomerName = event.query.toLowerCase();

        this.customerNames = this.customerallListOriginal;

        this.customerNames = [...this.customerallListOriginal.filter(x => {
            return x.name.toLowerCase().includes(event.query.toLowerCase())
        })]
    }
    filterCustomerCode(event) {
        this.customerCodes = this.customerallListOriginal;
        this.customerCodes = [...this.customerallListOriginal.filter(x => {
            return x.customerCode.toLowerCase().includes(event.query.toLowerCase())
        })]

    }
    filterCustomerParentNames(event) {
        this.customerNames = this.customerListOriginal;

        this.customerNames = [...this.customerListOriginal.filter(x => {
            return x.name.toLowerCase().includes(event.query.toLowerCase())
        })]

    }
    filterCountries(event) {
        this.countrycollection = this.countryListOriginal;

        this.countrycollection = [...this.countryListOriginal.filter(x => {
            return x.nice_name.toLowerCase().includes(event.query.toLowerCase())
        })]

    }

    onClickPBHCustomer(value) {
        if (value == 'PBHCustomer') {
            this.memoPopupContent = this.generalInformation.pbhCustomerMemo;
        }
        // if (value == 'restrictPMA') {
        //     this.memoPopupContent = this.generalInformation.restrictPMAMemo;
        // }
        // if (value == 'restrictBER') {
        //     this.memoPopupContent = this.generalInformation.restrictBERMemo;
        // }
        this.memoPopupValue = value;
    }

    onClickPopupSave() {

        if (this.memoPopupValue == 'PBHCustomer') {
            this.generalInformation.pbhCustomerMemo = this.memoPopupContent;
        }
        // if (this.memoPopupValue == 'restrictPMA') {
        //     this.generalInformation.restrictPMAMemo = this.memoPopupContent;
        // }
        // if (this.memoPopupValue == 'restrictBER') {
        //     this.generalInformation.restrictBERMemo = this.memoPopupContent;
        // }
        this.memoPopupContent = '';
    }
    selectedCustomerName() {
       
        this.isCustomerNameAlreadyExists = true;
    }
    selectedCustomerCode() {
        this.isCustomerCodeAlreadyExists = true;
    }


    checkCustomerNameExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.customerallListOriginal)
        if (exists.length > 0) {
            this.isCustomerNameAlreadyExists = true;
        } else {
            this.isCustomerNameAlreadyExists = false;
        }
    }

    checkCustomerNameExist(value) {
        this.changeName = true;
       
        this.isCustomerNameAlreadyExists = false;
        this.disableSaveCustomerName = false;
        if (value != this.generalInformation1.name) {
            for (let i = 0; i < this.customerallListOriginal.length; i++) {

                if (this.generalInformation.name == this.customerallListOriginal[i].name || value == this.customerallListOriginal[i].name) {
                    this.isCustomerNameAlreadyExists = true;
                    // this.disableSave = true;
                    this.disableSaveCustomerName = true;
                    this.selectedActionName = event;
                    return;
                }

            }
        }

    }
    selectedParentName(event) {
       
        if (this.changeName == false) {
            if (event.name === this.generalInformation1.name) {
                this.disableSaveParentName = true;
            }
            else {
                this.disableSaveParentName = false;
            }
        }
        else {
            if (event.name === this.generalInformation.name) {
                this.disableSaveParentName = true;
            }
            else {
                this.disableSaveParentName = false;
            }
        }
        
    }
    checkWithName(event) {
      
        if (this.changeName == false) {
            if (event === this.generalInformation1.name) {
                this.disableSaveParentName = true;
            }
            else {
                this.disableSaveParentName = false;
            }
        }
        else {
            if (event === this.generalInformation.name) {
                this.disableSaveParentName = true;
            }
            else {
                this.disableSaveParentName = false;
            }
        }
    }
    checkCustomerCodeExist(value) {
     
        this.isCustomerCodeAlreadyExists = false;
     
        for (let i = 0; i < this.customerallListOriginal.length; i++) {
            if (this.generalInformation.customerCode == this.customerallListOriginal[i].customerCode || value == this.customerallListOriginal[i].customerCode) {
                this.isCustomerCodeAlreadyExists = true;
                // this.disableSave = true;
            
                return;
            }

        }

    }
   
    //onCustomerselected(event) {
    //    debugger
    //    for (let i = 0; i < this.customerListOriginal.length; i++) {
    //        if (event == this.customerListOriginal[i].name) {
    //            this.isCustomerNameAlreadyExists = true;
    //            //this.disableSave = true;
    //            this.disableSaveCustomerName = true;
    //            this.selectedActionName = event;
    //        }
    //    }
    //}



    checkCustomerCodeExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.customerallListOriginal)
        if (exists.length > 0) {

            this.isCustomerCodeAlreadyExists = true;
        } else {
            this.isCustomerCodeAlreadyExists = false;
        }

    }
    saveGeneralInformation() {
       
      
        if (!this.isEdit) {
            this.customerService.newAction({
                ...this.generalInformation,
                country: getValueFromObjectByKey('countries_id', this.generalInformation.country),

                restrictedDERParts: (typeof this.generalInformation.restrictedDERParts === 'undefined') ? null : this.generalInformation.restrictedDERParts.map(x => { return { ...x, partType: 'DER' } }),
                restrictedPMAParts: typeof this.generalInformation.restrictedPMAParts === 'undefined' ? null : this.generalInformation.restrictedPMAParts.map(x => { return { ...x, partType: 'PMA' } }),
                customerParentName: getValueFromObjectByKey('name', this.generalInformation.customerParentName),
                createdBy: this.userName, updatedBy: this.userName, masterCompanyId: 1
            }).subscribe(res => {
                this.alertService.showMessage(
                    'Success',
                    `Saved Customer General Information Sucessfully `,
                    MessageSeverity.success
                );
                this.tab.emit('Contacts');
                this.saveGeneralInformationData.emit(res);
                this.id = res.customerId;
                this.editData = res;
                this.isEdit = true;
            })
        } else {


            //if (this.generalInformation.isAddressForBilling == true) {
            //    if (this.generalInformation1.address1 != this.generalInformation.address1 || this.generalInformation1.address2 != this.generalInformation.address2 || this.generalInformation1.city != this.generalInformation.city || this.generalInformation1.stateOrProvince != this.generalInformation.stateOrProvince || this.generalInformation1.country != this.generalInformation.country || this.generalInformation1.postalCode != this.generalInformation.postalCode) {

            //        this.generalInformation.isAddressForBilling = true;
            //    }
            //    else {
            //        this.generalInformation.isAddressForBilling = false;
            //    }

            //}
            //if (this.generalInformation.isAddressForShipping == true) {
            //    {
            //        if (this.generalInformation1.address1 != this.generalInformation.address1 || this.generalInformation1.address2 != this.generalInformation.address2 || this.generalInformation1.city != this.generalInformation.city || this.generalInformation1.stateOrProvince != this.generalInformation.stateOrProvince || this.generalInformation1.country != this.generalInformation.country || this.generalInformation1.postalCode != this.generalInformation.postalCode) {

            //            this.generalInformation.isAddressForShipping = true;
            //        }
            //        else {
            //            this.generalInformation.isAddressForShipping = false;
            //        }

            //    }
            //}
            this.customerService.updateAction({
                ...this.generalInformation,
                addressId: this.editData.addressId,
                customerId: this.id,

                restrictedDERParts: (typeof this.generalInformation.restrictedDERParts === 'undefined') ? null : this.generalInformation.restrictedDERParts.map(x => { return { ...x, partType: 'DER' } }),
                restrictedPMAParts: typeof this.generalInformation.restrictedPMAParts === 'undefined' ? null : this.generalInformation.restrictedPMAParts.map(x => { return { ...x, partType: 'PMA' } }),
                name: editValueAssignByCondition('name', this.generalInformation.name),
                customerCode: editValueAssignByCondition('customerCode', this.generalInformation.customerCode),
                //country: getValueFromObjectByKey('nice_name', this.generalInformation.country),
                country: getValueFromObjectByKey('countries_id', this.generalInformation.country),
                customerParentName: getValueFromObjectByKey('name', this.generalInformation.customerParentName),
                createdBy: this.userName, updatedBy: this.userName, masterCompanyId: 1
            }).subscribe(res => {
                this.alertService.showMessage(
                    'Success',
                    `Upated  Customer General Information Sucessfully `,
                    MessageSeverity.success
                );
                //this.generalInformation = new CustomerGeneralInformation();
                //this.isEdit = true;
                this.tab.emit('Contacts');
               
                //this.saveGeneralInformationData.emit(res);
                this.editGeneralInformation.emit(res);
                this.id = res.customerId;
                this.editData = res;

                 this.isEdit = true;
            })
        }



    }
    checkClassificationExists(value) {
    
        this.isClassificationAlreadyExists = false;

        for (let i = 0; i < this.allcustomerclassificationInfo.length; i++) {
            if (this.addNewclassification.description == this.allcustomerclassificationInfo[i].label || value == this.allcustomerclassificationInfo[i].label) {
                this.isClassificationAlreadyExists = true;
                // this.disableSave = true;

                return;
            }

        }


    }
    //checkClassificationExists(field, value, ) {
        
    //    const exists = validateRecordExistsOrNot(field, value, this.allcustomerclassificationInfo)


    //    if (exists.length > 0) {

    //        this.isClassificationAlreadyExists = true;
    //    } else {
    //        this.isClassificationAlreadyExists = false;
    //    }
    //}

    selectedClassification(object) {
        const exists = selectedValueValidate('label', object, this.selectedClassificationRecordForEdit)

        this.isClassificationAlreadyExists = !exists;
    }






    addClassification() {
        const data = {
            ...this.addNewclassification,
            masterCompanyId: 1,
            createdBy: this.userName,
            updatedBy: this.userName,
        }

        this.customerClassificationService.newAddcustomerclass(data).subscribe(res => {
            this.getAllCustomerClassification();
            this.resetClassificationPopUp();
            this.alertService.showMessage(
                'Success',
                `Added New Classification  Sucessfully `,
                MessageSeverity.success
            );

            // this.generalInformation.customerClassificationId = res.customerClassificationId;

        })

    }


    resetClassificationPopUp() {
        this.addNewclassification = { ...this.classificationNew }
    }
    filterIntegrations(event) {
        this.integrationList = this.integrationOriginalList;
        this.integrationList = [...this.integrationOriginalList.filter(x => {
            return x.label.toLowerCase().includes(event.query.toLowerCase())
        })]
    }
    checkIntergationExists(field, value) {
     
        const exists = validateRecordExistsOrNot(field, value, this.integrationOriginalList)
        if (exists.length > 0) {

            this.isIntegrationAlreadyExists = true;
        } else {
            this.isIntegrationAlreadyExists = false;
        }
    }
    selectedWebSite() {
        this.isIntegrationAlreadyExists = true;
    }
    newIntegrationAdd() {
        const data = {
            ...this.addNewIntergation,
            masterCompanyId: 1,
            createdBy: this.userName,
            updatedBy: this.userName
        }
        this.integrationService.newAction(data).subscribe(() => {
            this.getAllIntegrations()
            this.resetIntegrationPopUp()
            this.alertService.showMessage(
                'Success',
                `Added New Integration  Sucessfully `,
                MessageSeverity.success
            );



        })

    }
    resetIntegrationPopUp() {
        this.addNewIntergation = { ...this.intergrationNew }
    }




    // //calling for ATA Subchapter Data

    // getATASubChapterData(ataMainId) {
    //     this.allSubChapter = [];
    //     this.vendorser.getATASubchapterData(ataMainId).subscribe( //calling and Subscribing for Address Data
    //         results => this.onDataLoadAtaSubChapterDataSuccessful(results[0]), //sending Address
    //         error => this.onDataLoadFailed(error)
    //     );
    // }

    // private onDataLoadAtaSubChapterDataSuccessful(data: any) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.allSubChapter = data;
    // }

    // closethis() {
    //     this.closeCmpny = false;
    // }

    // // loading Customer details//
    // private loadData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.workFlowtService.getWorkFlows().subscribe(
    //         results => this.onDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
    // }
    // private onDataLoadSuccessful(allWorkFlows: any[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allActions = allWorkFlows;
    //     if (this.allActions.length > 0) {
    //         this.customerId = this.allActions[0].customerId;
    //     }

    // }

    // //Tried for dialog component instead of ng-template//
    // public addEntity() {
    //     let dialogRef = this.dialog.open(AddActionsDialogComponent,
    //         {
    //             panelClass: 'mat-dialog-md',
    //             data: { role: "" }
    //         });
    //     dialogRef.afterClosed().subscribe(role => {
    //         if (role) {
    //             ``
    //         }
    //     });
    // }

    // //loading integrationData//
    // private integrationalData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.integration.getWorkFlows().subscribe(
    //         results => this.onDataLoadintegratnSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    // }
    // private onDataLoadintegratnSuccessful(allWorkFlows: Integration[]) {

    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allIntegrationInfo = allWorkFlows;
    // }

    // //To load Currency Information//
    // private onCurrecyLoad(getCurrencyList: Currency[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.allCurrencyInfo = getCurrencyList;
    // }
    // // Load Currency data
    // private loadCurrencyData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.currencyService.getCurrencyList().subscribe(
    //         results => this.onCurrecyLoad(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    // }

    // //loading customer type data//
    // private customertypeData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.workFlowtService.getCustomerTypes().subscribe(
    //         results => this.onDataLoadcustomertypeSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    // }
    // private onDataLoadcustomertypeSuccessful(allWorkFlows: any[]) {

    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.customertypes = allWorkFlows;
    // }

    // //bing the id to dropdown //
    // public onATASelectChange(event: any) {
    //     var val = event.target.value;
    //     this.ataChapterId = val.substring(val.indexOf(':') + 1, val.length);
    // }

    // //loading country list//
    // private countrylist() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.workFlowtService.getCountrylist().subscribe(
    //         results => this.onDatacountrySuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
    // }
    // private onDatacountrySuccessful(allWorkFlows: any[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allCountryinfo = allWorkFlows;

    //     this.countrycollection = [];
    //     if (this.allCountryinfo.length > 0) {
    //         for (let i = 0; i < this.allCountryinfo.length; i++) {
    //             let countryName = this.allCountryinfo[i].nice_name;
    //             if (countryName) {
    //                 this.countrycollection.push(countryName);
    //             }
    //         }
    //     }

    // }

    // // loading ATAMain data
    // private atamaindata() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.ataservice.getAtaMainList().subscribe(
    //         results => this.onSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
    // }
    // private onSuccessful(getAtaMainList: ATAChapter[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.allATAMaininfo = getAtaMainList;
    // }

    // //To Open Model Popup based on Aircraft Type//
    // openModelPopups(content) {
    //     if (this.workFlowtService.isEditMode == false) {
    //         this.modal = this.modalService.open(content, { size: 'sm' });
    //         this.modal.result.then(() => {
    //             console.log('When user closes');
    //         }, () => { console.log('Backdrop click') })
    //         var arr = this.selectedAircraftTypes;
    //         var selectedvalues = arr.join(",");
    //         this.workFlowtService.getAircraftTypes(selectedvalues).subscribe(
    //             results => this.onDataLoadaircrafttypeSuccessful(results[0]),
    //             error => this.onDataLoadFailed(error)
    //         );
    //         this.cols = [
    //             { field: 'description', header: 'Aircraft Type' },
    //             { field: 'modelName', header: 'Model' },
    //         ];
    //         this.selectedColumns = this.cols;
    //     }
    //     if (this.workFlowtService.isEditMode == true) {

    //         this.modal = this.modalService.open(content, { size: 'sm' });
    //         this.modal.result.then(() => {
    //             console.log('When user closes');
    //         }, () => { console.log('Backdrop click') })
    //         if (this.allAircraftinfo) {
    //             if (this.allAircraftinfo.length >= 0) {
    //                 this.enablePopupData = true;
    //                 var arr = this.selectedAircraftTypes;
    //                 if (this.selectedAircraftTypes) {
    //                     var selectedvalues = arr.join(",");
    //                     this.workFlowtService.getAircraftTypes(selectedvalues).subscribe(
    //                         results => this.onDataLoadaircrafttypeSuccessful(results[0]),
    //                         error => this.onDataLoadFailed(error)
    //                     )
    //                 }
    //             }
    //         }
    //     }

    // }
    // private onDataLoadaircrafttypeSuccessful(allWorkFlows: any[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     if (this.workFlowtService.isEditMode == false) {
    //         this.allAircraftinfo = allWorkFlows;
    //     }
    //     if (this.enablePopupData == true) {
    //         this.allAircraftinfo = allWorkFlows;
    //     }
    //     if (this.selectedModels.length > 0) {

    //         let ischange1 = false;
    //         if (this.selectedModels.length > 0) {
    //             this.selectedModels.map((row) => {
    //                 for (let i = 0; i < this.allAircraftinfo.length; i++) {
    //                     if (this.allAircraftinfo[i].aircraftModelId == row.aircraftModelId) {
    //                         this.allAircraftinfo[i].priority = row.priority;
    //                         this.allAircraftinfo[i].checkbox = row.checkbox;
    //                         ischange1 = true;
    //                     }
    //                 }

    //             });
    //         }

    //     }

    // }

    // // Load AircarftModel Data//
    // private aircraftmodelData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.workFlowtService.getAircraft().subscribe(
    //         results => this.onDataLoadaircraftmodelSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    // }

    // private onDataLoadaircraftmodelSuccessful(allWorkFlows: any) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allAircraftinfo = allWorkFlows;
    //     if (this.allAircraftinfo.length > 0) {
    //         this.shiftValues = [];
    //         for (let i = 0; i < this.allAircraftinfo.length; i++)
    //             this.shiftValues.push(
    //                 { value: this.allAircraftinfo[i].aircraftTypeId, label: this.allAircraftinfo[i].description },

    //             );
    //     }
    //     let valAirCraft = [];
    //     this.workFlowtService.getAircraftManufacturer(this.sourceCustomer.customerId)
    //         .subscribe(results => {
    //             this.allAircraftManufacturer = results;
    //             if (results != null) {
    //                 for (let i = 0; i < this.allAircraftManufacturer.length; i++) {
    //                     valAirCraft.push(this.allAircraftManufacturer[i].aircraftTypeId);
    //                 }
    //                 this.selectedAircraftTypes = valAirCraft;
    //                 console.log(this.selectedAircraftTypes);
    //             }

    //         },
    //             error => this.onDataLoadFailed(error)
    //         );


    // }

    // // Load customer classification data//
    // private loadCustomerClassifiData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.customerClassificationService.getCustomerClassificationList().subscribe(
    //         results => this.onDataLoadClassifiSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    // }
    // private onDataLoadClassifiSuccessful(getCustomerClassificationList: CustomerClassification[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;

    //     this.dataSource.data = getCustomerClassificationList.filter(obj => obj.isActive.toString().toLowerCase() == "true");

    //     this.allcustomerclassificationInfo = getCustomerClassificationList.filter(obj => obj.isActive.toString().toLowerCase() == "true");
    // }

    // //For google Maps
    // getlatlng(address) {
    //     this.checkAddress = true;
    //     return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB_W96L25HhFWgqLblcikircQKjU6bgTgk').subscribe((data: any) => {
    //         this.options = {
    //             center: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng },
    //             zoom: 1,
    //         };
    //         this.overlays = [
    //             new google.maps.Marker({ position: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }, title: "Konyaalti" }),

    //         ];
    //         return data;

    //     });
    // }

    // //Load Master companies
    // private loadMasterCompanies() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.masterComapnyService.getMasterCompanies().subscribe(
    //         results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    // }
    // private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.allComapnies = allComapnies;

    // }


    // openClassification(content) {
    //     this.isEditMode = false;
    //     this.isDeleteMode = false;
    //     this.isSaving = true;
    //     this.loadMasterCompanies();
    //     this.sourceClassification = new CustomerClassification();
    //     this.sourceClassification.isActive = true;
    //     this.classificationName = "";
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })

    // }


    // opencountry(content) {
    //     this.isEditMode = false;
    //     this.isDeleteMode = false;
    //     this.isSaving = true;
    //     this.loadMasterCompanies();
    //     this.sourceAction.isActive = true;
    //     this.countryName = "";
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }
    // // Filetr Integration
    // filterintegrations(event) {
    //     this.integrationCollection = [];
    //     if (this.allIntegrationInfo.length > 0) {
    //         for (let i = 0; i < this.allIntegrationInfo.length; i++) {
    //             let integrationName = this.allIntegrationInfo[i].description;
    //             if (integrationName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                 this.integrationCollection.push(integrationName);
    //             }
    //         }
    //     }
    // }
    // //Integration Save
    // editItemIntegrationalCloseModel() {
    //     this.isSaving = true;
    //     if (this.isEditMode == false) {
    //         this.sourceAction.createdBy = this.userName;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.description = this.integrationName;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.integration.newAction(this.sourceAction).subscribe(
    //             role => this.saveSuccessHelper(role),
    //             error => this.saveFailedHelper(error));
    //     }
    //     else {

    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.description = this.integrationName;
    //         this.integration.updateAction(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //     }

    //     this.modal.close();
    // }

    // // save Customer Info//
    // editItemCloseModel() {
    //     if (this.classificationName.toLowerCase().trim() == "") {
    //         this.alertService.showMessage("Empty", 'Cannot Submit Empty', MessageSeverity.warn);
    //         return;
    //     }
    //     for (let i = 0; i < this.allcustomerclassificationInfo.length; i++) {
    //         let description = this.allcustomerclassificationInfo[i].description;
    //         if (description.toLowerCase().localeCompare(this.classificationName.toLowerCase()) == 0) {
    //             this.alertService.showMessage("Duplicate", 'Already Exist', MessageSeverity.warn);
    //             return;
    //         }
    //         else {
    //         }
    //     }
    //     if (!(this.classificationName)) {
    //         this.displayCustomerClassification = true;
    //         this.customerClassificationError = true;
    //         this.modelValue = true;
    //     }
    //     if (this.classificationName) {
    //         this.isSaving = true;
    //         if (this.isEditMode == false) {
    //             this.sourceClassification.createdBy = this.userName;
    //             this.sourceClassification.updatedBy = this.userName;
    //             this.sourceClassification.description = this.classificationName;
    //             this.sourceClassification.masterCompanyId = 1;
    //             this.customerClassificationService.newAddcustomerclass(this.sourceClassification).subscribe(data => {
    //                 if (data) { this.sourceCustomer.customerClassificationId = data.customerClassificationId }
    //                 this.loadCustomerClassifiData();
    //             })
    //         }
    //         else {

    //             this.sourceClassification.updatedBy = this.userName;
    //             this.sourceClassification.description = this.classificationName;
    //             this.sourceClassification.masterCompanyId = 1;
    //             this.customerClassificationService.updatecustomerclass(this.sourceClassification).subscribe(
    //                 response => this.saveCompleted(this.sourceClassification),
    //                 error => this.saveFailedHelper(error));
    //         }

    //         this.displayCustomerClassification = false;
    //         this.customerClassificationError = false;
    //         this.modal.close();
    //     }




    // }

    // // Load  Customer Clasfication data
    // private loadDataCustomerData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.customerClassificationService.getCustomerClassificationList().subscribe(
    //         results => this.onVendorDataLoad(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
    // }

    // private onVendorDataLoad(getCustomerClassificationList: CustomerClassification[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;

    //     this.dataSource.data = getCustomerClassificationList;
    //     this.allCustomerClassInfo = getCustomerClassificationList;
    // }

    // public applyFilter(filterValue: string) {
    //     this.dataSource.filter = filterValue;
    // }



    // private refresh() {
    //     this.applyFilter(this.dataSource.filter);
    // }

    // eventHandler(event) {
    //     if (event.target.value != "") {
    //         let value = event.target.value.toLowerCase();
    //         if (this.selectedActionName) {
    //             if (value == this.selectedActionName.toLowerCase()) {
    //                 this.disableSaveCusCode = true;
    //                 this.disableSaveCusName = true;
    //             }
    //             else {
    //                 this.disableSaveCusCode = false;
    //                 this.disableSaveCusName = false;
    //             }
    //         }

    //     }
    // }

    // //on Selection of Customer Name//
    // onCustomerNameselected(event) {
    //     for (let i = 0; i < this.customerNamecoll.length; i++) {
    //         if (event == this.customerNamecoll[i][0].name) {
    //             this.disableSaveCusName = true;
    //             this.disableSave = true;
    //             this.selectedActionName = event;
    //         }
    //     }
    // }

    // // On Country selected//
    // onCountrieselected(event) {
    //     if (this.allCountryinfo) {
    //         for (let i = 0; i < this.allCountryinfo.length; i++) {
    //             if (event == this.allCountryinfo[i].nice_name) {
    //                 this.sourceCustomer.nice_name = this.allCountryinfo[i].nice_name;
    //                 this.disablesave = false;

    //                 this.selectedCountries = event;
    //             }
    //         }
    //     }
    // }

    // eventCountryHandler(event) {
    //     if (event.target.value != "") {
    //         let value = event.target.value.toLowerCase();
    //         if (this.selectedCountries) {
    //             if (value == this.selectedCountries.toLowerCase()) {
    //                 this.disablesave = false;
    //             }
    //             else {
    //                 this.disablesave = true;
    //             }
    //         }

    //     }
    // }
    // //Filetr countiries//
    // filterCountries(event) {

    //     this.countrycollection = [];
    //     for (let i = 0; i < this.allCountryinfo.length; i++) {
    //         let country = this.allCountryinfo[i].nice_name;
    //         if (country.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //             this.allCountryinfo.push([{
    //                 "countries_id": this.allCountryinfo[i].countries_id,
    //                 "country": country
    //             }]),
    //                 this.countrycollection.push(country)

    //         }
    //     }
    // }

    // // Filter Name//
    // filterNames(event) {
    //     this.customerNames = [];
    //     if (this.allActions.length > 0) {
    //         for (let i = 0; i < this.allActions.length; i++) {
    //             let name = this.allActions[i].name;
    //             if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                 this.customerNamecoll.push([{
    //                     "customerId": this.allActions[i].customerId,
    //                     "name": name
    //                 }]),
    //                     this.customerNames.push(name);
    //             }
    //         }
    //     }
    // }


    // // Filter Customer Parent name//
    // filterCustomerParentNames(event) {
    //     this.customerNames = [];
    //     if (this.allActions.length > 0) {
    //         for (let i = 0; i < this.allActions.length; i++) {
    //             let customerParentName = this.allActions[i].name;
    //             if (customerParentName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                 this.customerNames.push(customerParentName);
    //             }
    //         }
    //     }
    // }

    // selectedValue(name) {
    //     this.cusname = name;
    // }
    // // Filter Classification data//
    // filterclassifications(event) {
    //     this.classificollection = [];
    //     if (this.allcustomerclassificationInfo.length > 0) {
    //         for (let i = 0; i < this.allcustomerclassificationInfo.length; i++) {
    //             let classificationName = this.allcustomerclassificationInfo[i].description;
    //             if (classificationName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                 this.classificollection.push(classificationName);
    //             }
    //         }
    //     }
    // }

    // eventCustCodeselection(event) {
    //     if (event.target.value != "") {
    //         let value = event.target.value.toLowerCase();
    //         if (this.selectedCustomerCode) {
    //             if (value == this.selectedCustomerCode.toLowerCase()) {
    //                 this.disableSaveCusCode = true;
    //                 this.disableSaveCustomerCode = true;
    //             }
    //             else {
    //                 this.disableSaveCusCode = false;
    //                 this.disableSaveCustomerCode = false;
    //             }
    //         }

    //     }


    // }
    // onCustomercodeSelected(event) {
    //     for (let i = 0; i < this.customerCodesColl.length; i++) {
    //         if (event == this.customerCodesColl[i][0].customerCode) {
    //             this.disableSaveCusCode = true;
    //             this.disableSaveCustomerCode = true;
    //             this.selectedCustomerCode = event;
    //         }
    //     }
    // }


    // filterCustomerCodes(event) {
    //     this.customerCodes = [];
    //     if (this.allActions.length > 0) {
    //         for (let i = 0; i < this.allActions.length; i++) {
    //             let customerCode = this.allActions[i].customerCode;
    //             if (customerCode.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                 this.customerCodesColl.push([{
    //                     "customerId": this.allActions[i].customerId,
    //                     "customerCode": customerCode
    //                 }]),
    //                     this.customerCodes.push(customerCode);

    //             }
    //         }
    //     }
    // }


    // private onDataLoadFailed(error: any) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;

    // }

    // private onGeneralObjUrl(allWorkFlows: any) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.sourceCustomer = allWorkFlows;
    // }

    // open(content) {
    //     this.isEditMode = false;
    //     this.isDeleteMode = false;
    //     this.isSaving = true;
    //     this.loadMasterCompanies();
    //     this.actionName = "";
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }


    // openDelete(content, row) {
    //     this.isEditMode = false;
    //     this.isDeleteMode = true;
    //     this.sourceCustomer = row;
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // openEdit(content, row) {
    //     this.isEditMode = true;
    //     this.isSaving = true;
    //     this.sourceCustomer = row;
    //     this.loadMasterCompanies();
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }
    // openView(content, row) {

    //     this.sourceCustomer = row;
    //     this.action_name = row.description;
    //     this.memo = row.memo;
    //     this.createdBy = row.createdBy;
    //     this.updatedBy = row.updatedBy;
    //     this.createddate = row.createdDate;
    //     this.updatedDate = row.updatedDate;
    //     this.loadMasterCompanies();
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }
    // openHelpText(content) {
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // openHist(content, row) {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.sourceCustomer = row;

    // }
    // onBlurMethod(data) {
    //     if (data == 'CustomerTypeId') {
    //         this.showCustomerTypeId = false;
    //     }
    //     if (data == 'name') {
    //         this.showCustomerName = false;
    //     }
    //     if (data == 'customerCode') {
    //         this.showCustomerCode = false;
    //     }
    //     if (data == 'email') {
    //         this.showCustomerEmail = false;
    //     }
    //     if (data == 'customerPhone') {
    //         this.showCustomerPhone = false;
    //     }
    //     if (data == 'address1') {
    //         this.showCustomerAddress1 = false;
    //     }
    //     if (data == 'city') {
    //         this.showCustomerCity = false;
    //     }
    //     if (data == 'stateOrProvince') {
    //         this.showCustomerState = false;
    //     }
    //     if (data == 'postal') {
    //         this.showCustomerPostal = false;
    //     }
    //     if (data == 'country') {
    //         this.showCustomerCountry = false;
    //     }
    //     if (data == 'customerClassificationId') {
    //         this.showCustomerClassificationId = false;
    //     }
    // }


    // // Save Customer Data//
    // editItemAndCloseModel() {
    //     if (!(this.sourceCustomer.address1 && this.sourceCustomer.customerTypeId && this.sourceCustomer.name && this.sourceCustomer.customerCode && this.sourceCustomer.customerPhone && this.sourceCustomer.email
    //         && this.sourceCustomer.city && this.sourceCustomer.stateOrProvince && this.sourceCustomer.generalCurrencyId && this.sourceCustomer.postalCode && this.sourceCustomer.country && this.sourceCustomer.customerClassificationId
    //     )) {
    //         //this.display = true;
    //         this.modelValue = true;

    //         // if (!this.sourceCustomer.address1) {
    //         //     this.customerAddressLine1Error = true;
    //         // }
    //         // else {
    //         //     this.customerAddressLine1Error = false;
    //         // }

    //         // if (!this.sourceCustomer.customerTypeId) {
    //         //     this.customerTypeError = true;
    //         // }
    //         // else {
    //         //     this.customerTypeError = false;
    //         // }

    //         // if (!this.sourceCustomer.name) {
    //         //     this.customerNameError = true;
    //         // }
    //         // else {
    //         //     this.customerNameError = false;
    //         // }
    //         // if (!this.sourceCustomer.customerCode) {
    //         //     this.customerCodeError = true;
    //         // }
    //         // else {
    //         //     this.customerCodeError = false;
    //         // }
    //         // if (!this.sourceCustomer.customerPhone) {
    //         //     this.customerPhoneError = true;
    //         // }
    //         // else {
    //         //     this.customerPhoneError = false;
    //         // }
    //         // if (!this.sourceCustomer.email) {
    //         //     this.customerEmailError = true;
    //         // }
    //         // else {
    //         //     this.customerEmailError = false;
    //         // }
    //         // if (!this.sourceCustomer.stateOrProvince) {
    //         //     this.customerStateOrProvidenceError = true;
    //         // }
    //         // else {
    //         //     this.customerStateOrProvidenceError = false;
    //         // }
    //         // if (!this.sourceCustomer.generalCurrencyId) {
    //         //     this.customerCurrencyError = true;
    //         // }
    //         // else {
    //         //     this.customerCurrencyError = false;
    //         // }
    //         // if (!this.sourceCustomer.postalCode) {
    //         //     this.customerPostalCodeError = true;
    //         // }
    //         // else {
    //         //     this.customerPostalCodeError = false;
    //         // }
    //         // if (!this.sourceCustomer.country) {
    //         //     this.customerCountryError = true;
    //         // }
    //         // else {
    //         //     this.customerCountryError = false;
    //         // }
    //         // if (!this.sourceCustomer.customerClassificationId) {
    //         //     this.customerClassificationError = true;
    //         // }
    //         // else {
    //         //     this.customerClassificationError = false;
    //         // }
    //         // if (!this.sourceCustomer.city) {
    //         //     this.cityError = true;
    //         // }
    //         // else {
    //         //     this.cityError = false;
    //         // }
    //     }
    //     if (this.sourceCustomer.name && this.sourceCustomer.customerCode && this.sourceCustomer.customerPhone && this.sourceCustomer.email
    //         && this.sourceCustomer.city && this.sourceCustomer.customerClassificationId && this.sourceCustomer.generalCurrencyId && this.sourceCustomer.stateOrProvince && this.sourceCustomer.postalCode && this.sourceCustomer.country
    //     ) {
    //         this.isSaving = true;
    //         if (!this.sourceCustomer.customerId) {
    //             this.sourceCustomer.createdBy = this.userName;
    //             this.sourceCustomer.updatedBy = this.userName;
    //             this.sourceCustomer.masterCompanyId = 1;
    //             this.sourceCustomer.isActive = true;
    //             if (this.sourceCustomer.parent == false || this.sourceCustomer.parent == null) {
    //                 this.sourceCustomer.customerParentName = '';

    //             }
    //             this.workFlowtService.newAction(this.sourceCustomer).subscribe(data => {
    //                 this.sourceCustomer.updatedBy = this.userName;
    //                 this.saveGeneralInformationData.emit(data);
    //                 // this.localCollection = data;
    //                 this.sourceCustomer = data;
    //                 this.savesuccessCompleted(this.sourceCustomer);
    //                 // this.workFlowtService.generalCollection = this.localCollection;
    //                 // this.workFlowtService.financeCollection = this.localCollection;
    //                 // this.workFlowtService.contactCollection = this.localCollection;
    //                 // this.workFlowtService.billingCollection = this.localCollection;
    //                 // this.workFlowtService.shippingCollection = this.localCollection;
    //                 // if (this.workFlowtService.generalCollection.address) {
    //                 //     this.sourceCustomer.address1 = this.workFlowtService.generalCollection.address.line1;
    //                 //     this.sourceCustomer.address2 = this.workFlowtService.generalCollection.address.line2;
    //                 //     this.sourceCustomer.address3 = this.workFlowtService.generalCollection.address.line3;
    //                 //     this.sourceCustomer.city = this.workFlowtService.generalCollection.address.city;
    //                 //     this.sourceCustomer.stateOrProvince = this.workFlowtService.generalCollection.address.stateOrProvince;
    //                 //     this.sourceCustomer.postalCode = this.workFlowtService.generalCollection.address.postalCode;
    //                 //     this.sourceCustomer.country = this.workFlowtService.generalCollection.address.country;

    //                 // }
    //                 if (data != null) {
    //                     if (this.selectedModels.length > 0) {

    //                         this.saveAircraftmodelinfo(data.customerId, this.selectedModels);

    //                     }
    //                 }
    //                 if (this.sourceCustomer.isCustomerAlsoVendor == true) {
    //                     this.workFlowtService.isCustomerAlsoVendor = this.sourceCustomer.isCustomerAlsoVendor;
    //                     this.workFlowtService.localCollectiontoVendor = data;
    //                 }
    //                 this.alertService.startLoadingMessage();
    //                 this.activeIndex = 0;
    //                 this.workFlowtService.indexObj.next(this.activeIndex);


    //                 this.nextClick();//I am calling After Data is Saved

    //             })
    //             if (this.selectedIntegrationTypes != null) //separting Array which is having ","
    //             {
    //                 this.sourceCustomer.IntegrationPortalId = this.selectedIntegrationTypes.toString().split(",");
    //             }


    //         }

    //         else {
    //             if (this.selectedAircraftTypes != null) {
    //                 this.sourceCustomer.AircraftTypeId = this.selectedAircraftTypes.toString().split(",");
    //             }

    //             if (this.selectedIntegrationTypes != null) //separting Array whic is having ","
    //             {
    //                 this.sourceCustomer.IntegrationPortalId = this.selectedIntegrationTypes.toString().split(",");
    //             }
    //             this.sourceCustomer.updatedBy = this.userName;
    //             if (this.sourceCustomer.parent == false || this.sourceCustomer.parent == null) {
    //                 this.sourceCustomer.customerParentName = '';

    //             }
    //             this.workFlowtService.updateAction(this.sourceCustomer).subscribe(data => {
    //                 this.sourceCustomer.updatedBy = this.userName;
    //                 this.localCollection = data;
    //                 this.sourceCustomer = data;
    //                 this.savesuccessCompleted(this.sourceCustomer);
    //                 this.workFlowtService.generalCollection = this.localCollection;
    //                 this.workFlowtService.financeCollection = this.localCollection;
    //                 this.workFlowtService.contactCollection = this.localCollection;
    //                 this.workFlowtService.billingCollection = this.localCollection;
    //                 this.workFlowtService.shippingCollection = this.localCollection;
    //                 if (this.workFlowtService.generalCollection.address) {
    //                     this.sourceCustomer.address1 = this.workFlowtService.generalCollection.address.line1;
    //                     this.sourceCustomer.address2 = this.workFlowtService.generalCollection.address.line2;
    //                     this.sourceCustomer.address3 = this.workFlowtService.generalCollection.address.line3;
    //                     this.sourceCustomer.city = this.workFlowtService.generalCollection.address.city;
    //                     this.sourceCustomer.stateOrProvince = this.workFlowtService.generalCollection.address.stateOrProvince;
    //                     this.sourceCustomer.postalCode = this.workFlowtService.generalCollection.address.postalCode;
    //                     this.sourceCustomer.country = this.workFlowtService.generalCollection.address.country;

    //                 }
    //                 if (data != null) {
    //                     if (this.selectedModels.length > 0) {

    //                         this.saveAircraftmodelinfo(data.customerId, this.selectedModels);

    //                     }
    //                 }
    //                 if (this.sourceCustomer.isCustomerAlsoVendor == true) {
    //                     this.workFlowtService.isCustomerAlsoVendor = this.sourceCustomer.isCustomerAlsoVendor;
    //                     this.workFlowtService.localCollectiontoVendor = data;
    //                 }
    //                 this.alertService.startLoadingMessage();
    //                 this.activeIndex = 0;
    //                 this.workFlowtService.indexObj.next(this.activeIndex);

    //                 this.nextClick();
    //             })

    //         }
    //     }
    //     else { }

    // }
    // // For nexxt click
    // nextClick() {
    //     this.workFlowtService.contactCollection = this.local;
    //     this.activeIndex = 1;
    //     this.workFlowtService.indexObj.next(this.activeIndex);
    //     this.tab.emit('Contacts');
    //     // this.router.navigateByUrl('/customersmodule/customerpages/app-customer-contacts');

    // }

    // // Save Aircraft Model Info
    // saveAircraftmodelinfo(cusId, data) {
    //     for (let i = 0; i < data.length; i++) {
    //         data[i].customerId = cusId;
    //         data[i].createdBy = this.userName;
    //         data[i].updatedBy = this.userName;
    //         this.workFlowtService.saveAircraftinfo(data[i]).subscribe(aircraftdata => {
    //             this.collectionofItemMaster = aircraftdata;
    //         })

    //     }
    // }
    // private savesuccessCompleted(user?: any) {
    //     this.isSaving = false;
    //     this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);
    //     this.loadData();
    // }

    // public updateToaduithistory(auditServiceCollection) {
    //     this.workFlowtService.updTeAuditAddress(auditServiceCollection).subscribe(data => {
    //         this.auditHistoryCollection = data;
    //         this.workFlowtService.auditServiceCollection = this.auditHistoryCollection;
    //     })

    // }
    // public commasepetrated() {
    //     var arr = this.selectedAircraftTypes;
    //     var selectedvalues = arr.join(",");
    //     this.workFlowtService.getAircraftTypes(selectedvalues).subscribe(
    //         results => this.onDataLoadaircrafttypeSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
    //     this.cols = [
    //         { field: 'description', header: 'Aircraft Type' },
    //         { field: 'modelName', header: 'Model' },


    //     ];
    //     this.selectedColumns = this.cols;
    // }

    // // Add customer Aircraft type data
    // public AddCustomerAircraftdata(customerobject) {
    //     for (let i = 0; i < this.selectedAircraftTypes.length; i++) {
    //         customerobject.aircraftTypeId = this.selectedAircraftTypes[i];
    //         this.workFlowtService.Addcustomeraircrafttype(customerobject).subscribe(data => {
    //             this.localCollection = data;
    //             this.workFlowtService.customerobject = this.localCollection;
    //         })
    //     }


    // }

    // // Close Model Popup

    // public dismissModel() {
    //     this.isDeleteMode = false;
    //     this.isEditMode = false;
    //     this.modal.close();
    // }



    // private saveCompleted(user?: any) {
    //     this.isSaving = false;
    //     if (this.isDeleteMode == true) {
    //         this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
    //         this.isDeleteMode = false;
    //     }
    //     else {
    //         this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

    //     }
    //     this.loadData();
    // }

    // private saveSuccessHelper(role?: any) {
    //     this.isSaving = false;
    //     this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);
    // }

    // get userName(): string {
    //     return this.authService.currentUser ? this.authService.currentUser.userName : "";
    // }

    // private saveFailedHelper(error: any) {

    // }


    // onUpload(event) {
    //     for (let file of event.files) {
    //         this.uploadedFiles.push(file);
    //     }
    //     this.msgs = [];
    //     this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    // }

    // filtercountry(event) {
    //     this.countrycollection = [];
    //     if (this.allCountryinfo.length > 0) {
    //         for (let i = 0; i < this.allCountryinfo.length; i++) {
    //             let countryName = this.allCountryinfo[i].nice_name;
    //             if (countryName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                 this.countrycollection.push(countryName);
    //             }
    //         }
    //     }
    // }

    // saveCountry() {
    //     this.sourceAction.createdBy = this.userName;
    //     this.sourceAction.updatedBy = this.userName;
    //     this.workFlowtService.newCountry(this.sourceAction).subscribe(data => { this.countrylist() })


    // }

    // dismissAircraftModel() {
    //     if (this.selectedModels.length > 0) {
    //         this.isDeleteMode = false;
    //         this.isEditMode = false;
    //         this.modal.close();
    //         if (this.workFlowtService.isEditMode == false || (this.workFlowtService.isEditMode == true && this.selectedModels.length > 0)) {
    //         }
    //     }
    //     this.showInput = true;
    //     this.modal.close();
    // }
    // // Save Selected Model From Model Popup
    // public saveSelectedModel(selectedRow, indeex) {
    //     selectedRow.isBoolean = indeex;

    // }

    // public getSelectedItem(selectedRow, event) {
    //     let ischange = false;
    //     if (this.selectedModels.length > 0) {
    //         this.selectedModels.map((row) => {
    //             if (selectedRow.aircraftModelId == row.aircraftModelId) {
    //                 row.priority = event.target.value;
    //                 ischange = true;
    //             }
    //         });
    //     }
    //     if (!ischange) {
    //         this.selectedModels.push(selectedRow);
    //     }

    // }

    // getAircraftModelsData(): any {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.workFlowtService.getAircaftList(this.sourceCustomer.customerId

    //     ).subscribe(
    //         results => this.onAircarftmodelloadsuccessfull(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
    // }
    // private onAircarftmodelloadsuccessfull(allWorkFlows: any[]) {
    //     for (let i = 0; i < allWorkFlows.length; i++) {
    //         allWorkFlows[i].checkbox = true;
    //     }
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allAircraftsGet = allWorkFlows;
    //     if (this.allAircraftsGet) {
    //         this.allAircraftinfo = JSON.parse(JSON.stringify(this.allAircraftsGet));
    //         this.isDeleteMode = false;
    //         this.isEditMode = false;
    //         this.isEnabeCapes = true;

    //     }
    // }
    // private onIntegrationData(getEmployeeCerficationList: any[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = getEmployeeCerficationList;
    //     this.allintegrationdetails = getEmployeeCerficationList;
    //     if (this.allintegrationdetails.length > 0) {
    //         for (let i = 0; i < this.allintegrationdetails.length; i++)
    //             this.integrationvalues.push(
    //                 { value: this.allintegrationdetails[i].integrationPortalId, label: this.allintegrationdetails[i].description },


    //             );
    //     }
    //     let valAirCraft = [];
    //     this.workFlowtService.getintegrationtypes(this.sourceCustomer.customerId)
    //         .subscribe(results => {
    //             this.allIntegrationInfo = results;
    //             if (results != null) {
    //                 for (let i = 0; i < this.allIntegrationInfo.length; i++) {
    //                     valAirCraft.push(this.allIntegrationInfo[i].integrationPortalId);
    //                 }
    //                 this.selectedIntegrationTypes = valAirCraft;
    //                 console.log(this.selectedIntegrationTypes);
    //             }

    //         },
    //             error => this.onDataLoadFailed(error)
    //         );
    // }

    // // Add integarion//
    // public Addintegration(imObj) {
    //     for (let i = 0; i < this.selectedIntegrationTypes.length; i++) {
    //         imObj.aircraftTypeId = this.selectedIntegrationTypes[i];
    //         this.workFlowtService.Addmultiintegrations(imObj).subscribe(data => {
    //             this.localCollection = data;
    //         })
    //     }
    // }
    // private Integration() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.integration.getWorkFlows().subscribe(
    //         results => this.onIntegrationData(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
    // }

    // // Tried For Keypress event 
    // keyPress(event: any) {
    //     const pattern = /[0-9\+\-\ ]/;
    //     let inputChar = String.fromCharCode(event.charCode);
    //     if (event.keyCode != 8 && !pattern.test(inputChar)) {
    //         event.preventDefault();
    //     }
    // }

    // onKeyClassification(event) {
    //     if (event.target.value != "") {
    //         let value = event.target.value.toLowerCase();
    //         if (this.selectedCustomerClassification) {
    //             if (value == this.selectedCustomerClassification.toLowerCase()) {
    //                 this.disableSaveCustomerClassification = true;
    //                 this.disableSaveCustomerClassificationSave = true;
    //             }
    //             else {
    //                 this.disableSaveCustomerClassification = false;
    //                 this.disableSaveCustomerClassificationSave = false;
    //             }
    //         }
    //     }
    // }

    // onCustomerclassifiactionSelected(event) {
    //     for (let i = 0; i < this.allcustomerclassificationInfo.length; i++) {
    //         if (event == this.allcustomerclassificationInfo[i].description) {
    //             this.disableSaveCustomerClassification = true;
    //             this.selectedCustomerClassification = event;
    //         }
    //     }
    // }

    // parentEventHandler(event) {
    //     if (event.target.value != "") {
    //         let value = event.target.value.toLowerCase();
    //         if (this.selectedActionName) {
    //             if (value == this.selectedActionName.toLowerCase()) {
    //                 this.disableSaveParentName = false;

    //             }
    //             else {
    //                 this.disableSaveParentName = true;

    //             }
    //         }

    //     }
    // }

    // onParentNameselected(event) {
    //     if (this.allActions) {
    //         for (let i = 0; i < this.allActions.length; i++) {
    //             if (event == this.allActions[i].name) {
    //                 this.sourceCustomer.customerParentName = event;

    //                 this.disableSaveParentName = false;

    //                 this.selectedActionName = event;
    //             }

    //         }
    //     }
    // }

    // onAddIntegrationWith() {
    //     this.router.navigate(['/singlepages/singlepages/app-integration']);
    // }




    // onClickPBHCustomer(value) {
    //     if (value == 'PBHCustomer') {
    //         this.memoPopupContent = this.sourceCustomer.pbhCustomerMemo;
    //     }
    //     if (value == 'restrictPMA') {
    //         this.memoPopupContent = this.sourceCustomer.restrictPMAMemo;
    //     }
    //     if (value == 'restrictBER') {
    //         this.memoPopupContent = this.sourceCustomer.restrictBERMemo;
    //     }
    //     this.memoPopupValue = value;
    // }

    // onClickPopupSave() {
    //     console.log(this.memoPopupValue);
    //     if (this.memoPopupValue == 'PBHCustomer') {
    //         this.sourceCustomer.pbhCustomerMemo = this.memoPopupContent;
    //     }
    //     if (this.memoPopupValue == 'restrictPMA') {
    //         this.sourceCustomer.restrictPMAMemo = this.memoPopupContent;
    //     }
    //     if (this.memoPopupValue == 'restrictBER') {
    //         this.sourceCustomer.restrictBERMemo = this.memoPopupContent;
    //     }
    //     this.memoPopupContent = '';
    // }

}