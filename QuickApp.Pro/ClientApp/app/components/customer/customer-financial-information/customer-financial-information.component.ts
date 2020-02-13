import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { fadeInOut } from '../../../services/animations';
import { CustomerService } from '../../../services/customer.service';
import { CurrencyService } from '../../../services/currency.service';
import { CreditTermsService } from '../../../services/Credit Terms.service';
import { TaxRateService } from '../../../services/taxrate.service';
import { ItemMasterService } from '../../../services/itemMaster.service';
import { IntegrationService } from '../../../services/integration-service';
import { CustomerClassificationService } from '../../../services/CustomerClassification.service';
import { TaxTypeService } from '../../../services/taxtype.service';
import { AuthService } from '../../../services/auth.service';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { validateRecordExistsOrNot, editValueAssignByCondition, getValueFromArrayOfObjectById } from '../../../generic/autocomplete';
import { CommonService } from '../../../services/common.service';
import { PercentService } from '../../../services/percent.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationService } from '../../../services/configuration.service';
import { getValueFromObjectByKey, getObjectByValue, getObjectById, selectedValueValidate } from '../../../generic/autocomplete';
import { Pipe, PipeTransform } from '@angular/core';
import { DBkeys } from '../../../services/db-Keys';
import { LocalStoreManager } from '../../../services/local-store-manager.service';
// import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-customer-financial-information',
    templateUrl: './customer-financial-information.component.html',
    styleUrls: ['./customers-financial-information.component.scss'],
    animations: [fadeInOut],
    // providers: [DatePipe]
})
/** anys component*/
export class CustomerFinancialInformationComponent implements OnInit {
    @Input() savedGeneralInformationData: any;
    @Input() editGeneralInformationData;
    @Input() creditTermsListOriginal
    @Input() editMode;
    @Output() tab = new EventEmitter();
    @ViewChild('taxExemptFileUploadInput') taxExemptFileUploadInput: any;
    taxRatesList: any = [];
    pageSize: number = 10;
    discountList: any;
    discountList1: any;

    markUpList: any;
    taxrateList: any;
    state_taxRateList: any;
    id: number;
    legalEntityId: number;
    selectedRowForDelete: any;
    intergationNew = {
        allowPartialBilling: true,
        allowProformaBilling: true,
        markUpValue: "",
    }
    addNewIntergration = { ...this.intergationNew }
    creditTermsNew = {
        name: '',
        percentage: '',
        days: '',
        netDays: '',
        isActive: true,
        isDeleted: false,
        memo: ''
    }

    taxTyeNew = {
        description: '',

        isActive: true,
        isDeleted: false,
        memo: ''
    }

    taxRateNew = {
        taxTypeId: '',
        taxRateId: 0,
        taxRate: '',
        isActive: true,
        isDeleted: false,
        memo: ''
    }

    addNewCreditTerms = { ...this.creditTermsNew }

    addNewTaxType = { ...this.taxTyeNew }
    addNewTaxRate = { ...this.taxRateNew }

    isCreditTermsExists: boolean = false;
    isPercentageExists: boolean = false;
    isTaxTypeExists: boolean = false;
    isTaxRateExists: boolean = false;
    customerTaxRateMappingId: number;
    isDeleteMode: boolean = false;
    _creditTermList: any[];
    _creditTermsList: any[];
    _creditTermPercentageList: any;
    _TaxTypeList: any;
    _TaxRateList: any;
    percentValue = null;
    percentageList: any;
    taxTypeList: any;
    taxRateList: any;
    discontValue = null;
    _discountList: any;
    isDiscountExists: boolean = false;
    allCurrencyInfo: any;
    customerCode: any;
    customerName: any;
    selectedTaxRates: any;

    selectedTaxType: any;
    taxTypeRateMapping: any = [];
    selectedConsume: any;
    disableSaveConsume: boolean;
    discountcollection: any[] = [];
    namecolle: any[] = [];
    modal: NgbModalRef;
    localcollection: any;

    formData = new FormData();
    allCustomerFinanceDocumentsList: any = [];
    taxInfoTableColumns: any[] = [
        { field: "taxType", header: "Tax Type" },
        { field: "taxRate", header: "Tax Rate" },
    ];


    taxExemptTableColumns: any[] = [
        { field: "fileName", header: "File Name" },
        { field: 'createdDate', header: 'Created Date' },
        { field: 'createdBy', header: 'CreatedBy' },
        { field: 'updatedDate', header: 'Updated Date' },
        { field: 'updatedBy', header: 'UpdatedBy' },
        { field: 'download', header: 'Download' },
        { field: 'delete', header: 'Delete' },
    ];
    globalSettings: any = {};
    _discountListForDropdown: any = [];
    selectedRowFileForDelete: any;
    taxRateEditData: any;
    indexForTaxRate: any = 1;
    auditDataForTaxData: any = [];
    global_lang: string;
    showAllowNettingOfAPAR: boolean = false;
    customerGeneralInformation: any = {};
    @Input() selectedCustomerTab: string = "";


    constructor(public taxtypeser: TaxTypeService, public creditTermsService: CreditTermsService,
        public currencyService: CurrencyService,
        public customerClassificationService: CustomerClassificationService,
        public inteservice: IntegrationService,
        public taxRateService: TaxRateService,
        public itemser: ItemMasterService, public customerService: CustomerService,
        private authService: AuthService,
        private alertService: AlertService,
        private commonservice: CommonService,
        public percentService: PercentService,
        private modalService: NgbModal, private activeModal: NgbActiveModal,
        private configurations: ConfigurationService,
        public creditTermService: CreditTermsService,
        private localStorage: LocalStoreManager,
        // private datePipe: DatePipe

    ) {


    }
    // taxType
    taxtypesList = [];


    ngOnInit(): void {
        this.getGlobalSettings();
        this.savedGeneralInformationData = this.savedGeneralInformationData || {}

        console.log(this.creditTermsListOriginal);

        // this.getCreditTermList();

        // this.getAllcreditTermList();


        if (this.editMode) {

            this.id = this.editGeneralInformationData.customerId

            this.savedGeneralInformationData = this.editGeneralInformationData;
            this.customerCode = this.editGeneralInformationData.customerCode;
            this.customerName = this.editGeneralInformationData.name;

            this.savedGeneralInformationData = {
                ...this.editGeneralInformationData,
                creditTermsId: getObjectById('value', this.editGeneralInformationData.creditTermsId, this.creditTermsListOriginal)
            }
            this.savedGeneralInformationData.creditLimit = this.formatCreditLimit(this.editGeneralInformationData.creditLimit);




            if (this.editGeneralInformationData.currency == null || this.editGeneralInformationData.currency == 0) {
                this.getDefaultCurrency();
            }
            this.getMappedTaxTypeRateDetails();
            this.toGetCustomerFinanceDocumentsList(this.id);
        } else {

            this.id = this.savedGeneralInformationData.customerId;
            this.customerCode = this.savedGeneralInformationData.customerCode;
            this.customerName = this.savedGeneralInformationData.name;
            this.getDefaultCurrency();
        }

        this.getAllDiscountList();
        this.getAllTaxList();
        this.getAllCurrency();
        this.getAllPercentage();
        this.getAllTaxTypes();
        this.getTaxRates();
        this.getAllDiscountList1();
        this.getAllTaxRates();


    }
    ngOnChanges(changes: SimpleChanges) {
        for (let property in changes) {
            if (property == 'selectedCustomerTab') {
                if (changes[property].currentValue == "Financial") {
                    this.getCustomerGeneralInformation()
                }
            }
        }

    }

    getCustomerGeneralInformation() {
        this.customerService.getCustomerdataById(this.id).subscribe(response => {
            console.log(response);

            const res = response[0];
            this.customerGeneralInformation = res;
            if (this.customerGeneralInformation.isCustomerAlsoVendor == true && this.customerGeneralInformation.type == 'Customer') {
                this.showAllowNettingOfAPAR = true;
            } else {
                this.showAllowNettingOfAPAR = false;
            }
        })
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    getGlobalSettings() {
        this.globalSettings = this.localStorage.getDataObject<any>(DBkeys.GLOBAL_SETTINGS) || {};
        this.global_lang = this.globalSettings.cultureName;
    }


    getAllcreditTermList() {
        this.commonservice.smartDropDownList('CreditTerms', 'CreditTermsId', 'Name').subscribe(res => {
            this.creditTermsListOriginal = res;
        })
    }

    // getCreditTermList() {
    //     this.creditTermService.getCreditTermsList().subscribe(res => {
    //         const respData = res[0];
    //         this.creditTermData = respData.columnData;
    //         console.log(this.creditTermData, 'creditdata')
    //     });
    // }
    getAllCurrency() {

        this.currencyService.getCurrencyList().subscribe(res => {

            this.allCurrencyInfo = res[0];
        })
    }

    formatCreditLimit(val) {
        if (val) {
            if (isNaN(val) == true) {
                val = Number(val.replace(/[^0-9.-]+/g, ""));
            }
            this.savedGeneralInformationData.creditLimit = new Intl.NumberFormat(this.global_lang, { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val)
            return this.savedGeneralInformationData.creditLimit;
        }

    }
    getDefaultCurrency() {
        this.legalEntityId = 19;
        this.commonservice.getDefaultCurrency(this.legalEntityId).subscribe(res => {
            console.log(res);
            this.savedGeneralInformationData.generalCurrencyId = res.currencyId;
        })
    }



    getAllPercentage() {
        this.commonservice.smartDropDownList('[Percent]', 'PercentId', 'PercentValue').subscribe(res => {

            this.percentageList = res;
        })
    }
    getAllTaxRates() {
        this.commonservice.smartDropDownList('[TaxRate]', 'TaxRateId', 'TaxRate').subscribe(res => {

            this.taxRatesList = res;
        })
    }


    getTaxRates() {
        this.commonservice.smartDropDownList('[TaxRate]', 'TaxRateId', 'TaxRate').subscribe(res => {

            this.taxRateList = res;
        })
    }

    getAllTaxTypes() {
        this.commonservice.smartDropDownList('TaxType', 'TaxTypeId', 'Description').subscribe(res => {
            this.taxTypeList = res;
        })
    }


    filterCreditTerms(event) {
        this._creditTermList = this.creditTermsListOriginal;

        this._creditTermList = [...this.creditTermsListOriginal.filter(x => {
            return x.label.toLowerCase().includes(event.query.toLowerCase())
        })]

    }

    filterCreditTerm(event) {
        this._creditTermsList = this.creditTermsListOriginal;

        const CREDITTERMDATA = [...this.creditTermsListOriginal.filter(x => {
            return x.label.toLowerCase().includes(event.query.toLowerCase())
        })]
        this._creditTermsList = CREDITTERMDATA;
    }


    checkCreditTermsExists(field, value) {

        const exists = validateRecordExistsOrNot(field, value, this.creditTermsListOriginal)
        console.log(exists);
        if (exists.length > 0) {
            this.isCreditTermsExists = true;
        } else {
            this.isCreditTermsExists = false;
        }
    }

    selectedCreditTerm() {
        this.isCreditTermsExists = true;
    }


    filterPercentage(event) {
        console.log(parseInt(event.query));
        this._creditTermPercentageList = this.percentageList;

        this._creditTermPercentageList = [...this.percentageList.filter(x => {
            console.log(x);

            return x.percentValue.includes(parseInt(event.query))
        })]
    }

    checkPercentageExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.percentageList)
        console.log(exists);
        if (exists.length > 0) {
            this.isPercentageExists = true;
        } else {
            this.isPercentageExists = false;
        }
    }

    selectedPercentage() {
        this.isPercentageExists = true;
    }



    filterTaxType(event) {

        console.log(parseInt(event.query));
        this._TaxTypeList = this.taxTypeList;

        this._TaxTypeList = [...this.taxTypeList.filter(x => {
            console.log(x);
            return x.label.toLowerCase().includes(event.query.toLowerCase())


        })]
    }

    filterTaxRate(event) {

        console.log(parseInt(event.query));
        this._TaxRateList = this.percentageList;

        this._TaxRateList = [...this.percentageList.filter(x => {
            console.log(x);
            return x.label.includes(event.query.toLowerCase())


        })]
    }


    checkTaxTypeExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.taxTypeList)
        console.log(exists);
        if (exists.length > 0) {

            this.isTaxTypeExists = true;
        } else {
            this.isTaxTypeExists = false;
        }
    }
    checkTaxRateExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.taxTypeList)
        console.log(exists);
        if (exists.length > 0) {

            this.isTaxRateExists = true;
        } else {
            this.isTaxRateExists = false;
        }
    }


    selectedTaxTypes() {
        this.isTaxTypeExists = true;
    }

    selectedTaxRate() {
        this.isTaxRateExists = true;
    }






    getAllDiscountList() {
        this.customerService.getDiscountList().subscribe(res => {
            this.discountList = res[0];
            // console.log(this.discountList, "this.discuontList++++")
            for (let i = 0; i < this.discountList.length; i++) {
                if (this.discountList[i].discontValue >= 0 && this.discountList[i].discontValue <= 100) {
                    this._discountListForDropdown.push({ label: this.discountList[i].discontValue.toString(), value: this.discountList[i].discontValue })
                }
            }
            // console.log(this._discountListForDropdown, "this._discountListForDropdown++++")


        })
    }

    getAllDiscountList1() {
        this.commonservice.smartDropDownList('[Discount]', 'DiscountId', 'DiscontValue').subscribe(res => {
            this.discountList1 = res;
        })
    }



    filterDiscount(event) {
        // this._discountListForDropdown = this._discountListForDropdown;
        this._discountListForDropdown = [...this._discountListForDropdown.filter(x => {
            // console.log(x);
            return x.label.includes(event.query.toLowerCase())


        })]
        // console.log("this._discountListForDropdown",this._discountListForDropdown);
        setTimeout(() => {
            this._discountListForDropdown = this._discountListForDropdown;
        }, 1000)
    }

    // checkShortNameExists(field, value) {
    //     // console.log(this.selectedRecordForEdit);
    //     const exists = validateRecordExistsOrNot(field, value, this.uomData, this.selectedRecordForEdit);
    //     if (exists.length > 0) {
    //         this.isDiscountExists = true;
    //     }
    //     else {
    //         this.disableSaveForShortName = false;
    //     }

    // }

    checkDiscountExists(value) {
        this.getAllDiscountList();
        console.log("value", value);
        this.isCountdisable = false;
        this._discountListForDropdown = this._discountListForDropdown;
        const exists = validateRecordExistsOrNot('field', value, this._discountListForDropdown);
        // console.log(exists);
        if (this.discontValue == undefined && this.discontValue == undefined && this.discontValue == null && this.discontValue == '') {
            // this._discountListForDropdown = this._discountListForDropdown;
            this.isCountdisable = false;
            this.discontValue == null
        }
        else if (this.discontValue < 0 || this.discontValue > 100) {
            this.isCountdisable = true;
            this.discontValue == null
            // this._discountListForDropdown = this._discountListForDropdown;
        }
        if (exists && exists.length > 0) {
            this.isDiscountExists = true;
        }
        else if (this.discontValue < 0 || this.discontValue > 100) {
            return this.isDiscountExists = false;
        } else {
            this.isDiscountExists = false;
        }
    }
    isCountdisable: boolean = false;
    checkDiscountExistss(value) {
        // console.log("value" ,value)
        this.isDiscountExists = false;

        if (this.discontValue == undefined && this.discontValue == undefined && this.discontValue == null && this.discontValue == '') {
            // this._discountListForDropdown = this._discountListForDropdown;
            this.isCountdisable = false;
        }
        else if (this.discontValue < 0 || this.discontValue > 100) {
            this.isCountdisable = true;
            // this._discountListForDropdown = this._discountListForDropdown;
        } else {
            this._discountListForDropdown = this._discountListForDropdown;
            for (let i = 0; i < this._discountListForDropdown.length; i++) {
                if (this.discontValue == this._discountListForDropdown[i].label || value == this._discountListForDropdown[i].label) {
                    this.isDiscountExists = true;

                    return;
                } else {
                    this.isDiscountExists = false;
                }
            }
        }

    }

    selectedDiscount() {
        this.isDiscountExists = true;
    }
    checkPercentExists(value) {

        this.isTaxRateExists = false;

        for (let i = 0; i < this.percentageList.length; i++) {
            if (this.discontValue == this.percentageList[i].label || value == this.percentageList[i].label) {
                this.isTaxRateExists = true;

                return;
            }

        }
    }


    getAllTaxList() {
        this.taxRateService.getTaxRateList().subscribe(res => {
            const responseData = res[0];
            this.taxtypesList = responseData.map(x => {
                return {
                    label: x.taxTypeId, value: x.taxTypeId
                }
            })

        })
    }

    getPageCount(totalNoofRecords, pageSize) {
        return Math.ceil(totalNoofRecords / pageSize)
    }
    pageIndexChange(event) {
        this.pageSize = event.rows;
    }
    getMappedTaxTypeRateDetails() {

        this.customerService.getMappedTaxTypeRateDetails(this.id).subscribe(res => {
            this.taxTypeRateMapping = res;

        })
    }
    mapTaxTypeandRate() {
        console.log(this.selectedTaxRates, this.selectedTaxType);

        // let arr = [];
        if (this.selectedTaxRates && this.selectedTaxType) {
            const index = this.taxTypeRateMapping.findIndex(item => item.taxType === getValueFromArrayOfObjectById('label', 'value', this.selectedTaxType, this.taxTypeList));
            if (index > -1) {
                this.alertService.showMessage(
                    'Duplicate',
                    `Already Exists `,
                    MessageSeverity.warn
                );
                this.selectedTaxRates = null;
                this.selectedTaxType = null;
                // this.alertService.showMessage(
                //     'Success',
                //     `Successfully Added Tax Type and  Tax Rate`,
                //     MessageSeverity.success
                // );
            } else {

                this.taxTypeRateMapping.push({
                    customerId: this.id,
                    id: this.indexForTaxRate,
                    taxTypeId: this.selectedTaxType,
                    taxRateId: this.selectedTaxRates,
                    taxType: getValueFromArrayOfObjectById('label', 'value', this.selectedTaxType, this.taxTypeList),
                    taxRate: getValueFromObjectByKey('label', getObjectById('value', this.selectedTaxRates, this.taxRatesList))


                })
                console.log("this.sdfsfsf",this.taxTypeRateMapping)
                // this.taxTypeRateMapping = []

                // [...this.taxTypeRateMapping.map((x, index) => {
                //     return {
                //         customerId: x.id,
                //         id: index,
                //         taxTypeId: this.selectedTaxType,
                //         taxRateId: this.selectedTaxRates,
                //         taxType: getValueFromArrayOfObjectById('label', 'value', this.selectedTaxType, this.taxTypeList),
                //         taxRate: getValueFromObjectByKey('label', getObjectById('value', this.selectedTaxRates, this.taxRatesList))
                //     }
                // })];

                this.selectedTaxRates = null;
                this.selectedTaxType = null;
                // this.alertService.showMessage(
                //     'Success',
                //     `Successfully Added Tax Type and  Tax Rate`,
                //     MessageSeverity.success
                // );
            }
            // this.taxTypeRateMapping = arr;


        }
        console.log(this.taxTypeRateMapping)
    }
    editTaxtRate(rowData) {
        this.taxRateEditData = { ...rowData };
        console.log(this.taxRateEditData);

    }

    updateTaxTypeandRate() {
        if (this.taxRateEditData.customerTaxTypeRateMappingId) {
            this.customerService.updateCustomerTaxTypeRate(this.taxRateEditData).subscribe(res => {
                this.taxRateEditData = undefined;
                this.getMappedTaxTypeRateDetails();
                this.alertService.showMessage(
                    'Success',
                    `Successfully Update Tax Type and Tax Rate`,
                    MessageSeverity.success
                );
            })
        } else {
            const data = [...this.taxTypeRateMapping.map(x => {
                if (x.id == this.taxRateEditData.id) {
                    return {
                        ...this.taxRateEditData,
                        taxType: getValueFromArrayOfObjectById('label', 'value', this.taxRateEditData.taxTypeId, this.taxTypeList),
                        taxRate: getValueFromObjectByKey('label', getObjectById('value', this.taxRateEditData.taxRateId, this.taxRatesList))
                    };
                } else {
                    return x;
                }
            })];
            this.taxTypeRateMapping = data;
            this.alertService.showMessage(
                'Success',
                `Successfully Update Tax Type and  Tax Rate`,
                MessageSeverity.success
            );
        }


    }
    getAuditHistoryById(content, data) {
        const { customerTaxTypeRateMappingId } = data;
        this.customerService.getAuditHistoryForTaxType(customerTaxTypeRateMappingId).subscribe(res => {
            this.auditDataForTaxData = res;

        })
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    fileUpload(event, fileType) {
        if (event.files.length === 0)
            return;

        for (let file of event.files) {        // console.log(fileType);   
            this.formData.append(fileType, file);
            console.log(this.formData);
        }

    }

    saveFinancialInformation() {


        this.customerService.updatefinanceinfo({
            ...this.savedGeneralInformationData,
            CustomerTaxTypeRateMapping: this.taxTypeRateMapping,
            updatedBy: this.userName,
            creditTermsId: this.savedGeneralInformationData.creditTermsId.value
        }, this.id).subscribe(res => {


            const vdata = {
                customerId: this.savedGeneralInformationData.customerId,
                masterCompanyId: 1,
                createdBy: this.userName,
                updatedBy: this.userName
            }

            for (var key in vdata) {
                this.formData.append(key, vdata[key]);
            }
            console.log(this.taxExemptFileUploadInput, "this.taxExemptFileUploadInput");
            if (this.taxExemptFileUploadInput) {
                this.taxExemptFileUploadInput.clear()
            }
            this.customerService.customerFinanceFileUpload(this.formData).subscribe(res => {
                this.formData = new FormData();
                this.toGetCustomerFinanceDocumentsList(this.savedGeneralInformationData.customerId);
            });
            this.alertService.showMessage(
                'Success',
                ` ${this.editMode ? 'Updated' : 'Saved'}  Customer Financal Infromation Sucessfully`,
                MessageSeverity.success
            );
            this.getMappedTaxTypeRateDetails();
            this.nextClick();
        })
    }
    downloadFileUpload(rowData) {

        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadattachedfile?filePath=${rowData.link}`;
        window.location.assign(url);
    }
    CREDITTERMDATA:any=[];
    toGetCustomerFinanceDocumentsList(customerId) {
        var moduleId = 1;
        this.customerService.GetCustomerFinanceDocumentsList(customerId, moduleId).subscribe(res => {
            this.allCustomerFinanceDocumentsList = res;
            console.log(this.allCustomerFinanceDocumentsList);
        })
    } 

    deleteFile(rowData) {
        this.selectedRowFileForDelete = rowData;
    }
    deleteConformationForFile(value) {

        // let attachmentDetailId = rowData.attachmentDetailId;
        // let updatedBy = this.userName;
        if (value === 'Yes') {
            this.customerService.GetCustomerAttachmentDelete(this.selectedRowFileForDelete.attachmentDetailId, this.userName).subscribe(res => {
                this.alertService.showMessage(
                    'Success',
                    `deleted File`,
                    MessageSeverity.success
                );
                this.toGetCustomerFinanceDocumentsList(this.id);

            })
        } else {
            this.selectedRowFileForDelete = undefined;
        }

    }


    saveMarkUpPercentage() {
        const data = {
            ...this.addNewIntergration,
            createdBy: this.userName,
            updatedBy: this.userName,

        }
        this.customerService.newMarkUp(data).subscribe(data => {
            this.alertService.showMessage(
                'Success',
                `Add MarkUp Sucessfully `,
                MessageSeverity.success
            );
            this.savedGeneralInformationData.markUpPercentageId = data.markUpPercentageId;

        })

    }

    restMarkUpPopUp() {
        this.addNewIntergration = { ...this.intergationNew }
    }

    newCreditTermAdd() {
        const data = {
            ...this.addNewCreditTerms,
            masterCompanyId: 1,
            createdBy: this.userName,
            updatedBy: this.userName,
        }
        this.creditTermsService.newAddcreditterms(data).subscribe(data => {
            this.getAllcreditTermList();
            this.alertService.showMessage(
                'Success',
                `Added New Credit Term Successfully `,
                MessageSeverity.success
            );
            this.resetCreditTermsPopUp();

            this.savedGeneralInformationData.creditTermsId = data.creditTermsId;
            console.log(this.savedGeneralInformationData.creditTermsId);

        })
    }
    resetCreditTermsPopUp() {
        this.addNewCreditTerms = { ...this.creditTermsNew }
    }

    newDiscountAdd() {
        const data = {
            discontValue: this.discontValue,
            masterCompanyId: 1,
            createdBy: this.userName,
            updatedBy: this.userName,
            createdDate: new Date(),
            updatedDate: new Date()
        }

        this.customerService.newAddDiscount(data).subscribe(data => {
            this.getAllDiscountList();
            this.alertService.showMessage(
                'Success',
                `Added New Discount  Successfully `,
                MessageSeverity.success
            );
            this.restDiscount();
            this.savedGeneralInformationData.discountId = data.discontValue;
        })

    }


    restDiscount() {
        this.discontValue = null;
        this.isDiscountExists = false;
        this.isCountdisable = false;
    }



    newTaxTypeAdd() {
        const data = {
            ...this.addNewTaxType,
            masterCompanyId: 1,
            createdBy: this.userName,
            updatedBy: this.userName,
            createdDate: new Date(),
            updatedDate: new Date()
        }
        this.taxtypeser.newAction(data).subscribe(data => {
            this.getAllTaxTypes();
            this.alertService.showMessage(
                'Success',
                `Added New Tax Type  Successfully `,
                MessageSeverity.success
            );
            this.resetTaxType();
            //this.savedGeneralInformationData.discountId = data.discountId;
        })

    }
    newTaxRateAdd() {
        console.log(this.addNewTaxRate);

        const data = {
            ...this.addNewTaxRate, createdBy: this.userName, updatedBy: this.userName, masterCompanyId: 1,

            percentValue: editValueAssignByCondition('percentValue', this.addNewTaxRate.taxRate),

        };


        this.percentService.newPercentage(data).subscribe(() => {
            this.resetTaxType();
            this.getAllTaxTypes();
            this.getAllTaxRates();
            this.getAllPercentage();
            this.addNewTaxRate = { ...this.taxRateNew }

            this.alertService.showMessage(
                'Success',
                `Added New Tax Rate  Successfully`,
                MessageSeverity.success
            );
        })

    }

    resetTaxType() {
        this.addNewTaxType = { ...this.taxTyeNew }

    }
    resetTaxRate() {
        this.addNewTaxRate = { ...this.taxRateNew }

    }
    nextClick() {
        this.tab.emit('Billing');
    }
    backClick() {
        this.tab.emit('Atachapter');
    }

    deleteTaxTypeRate(content, rowData) {

        this.isDeleteMode = true;
        this.localcollection = rowData;
        this.selectedRowForDelete = rowData;

        this.customerTaxRateMappingId = rowData.customerTaxTypeRateMappingId;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    deleteItemAndCloseModel() {

        let customerTaxRateMappingId = this.customerTaxRateMappingId;
        if (customerTaxRateMappingId > 0) {

            this.customerService.deleteCustomerTaxTypeRateById(customerTaxRateMappingId).subscribe(
                response => {
                    this.saveCompleted('');

                    this.getMappedTaxTypeRateDetails();

                },
                error => this.saveFailedHelper(error));



        }
        else {
            this.taxTypeRateMapping.splice(this.localcollection, 1);
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



    }
    private saveFailedHelper(error: any) {

        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }
    dismissModel() {
        this.modal.close();
    }
    getColorCodeForHistory(i, field, value) {
        const data = this.auditDataForTaxData;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }






} 