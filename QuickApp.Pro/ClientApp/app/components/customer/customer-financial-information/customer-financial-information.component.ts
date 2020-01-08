import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
@Component({
    selector: 'app-customer-financial-information',
    templateUrl: './customer-financial-information.component.html',
    styleUrls: ['./customers-financial-information.component.scss'],
    animations: [fadeInOut]
})
/** anys component*/
export class CustomerFinancialInformationComponent implements OnInit {
    @Input() savedGeneralInformationData: any;
    @Input() editGeneralInformationData;
    @Input() editMode;
    @Output() tab = new EventEmitter();
    // creditTermList: import("c:/Users/Jyotsna/source/repos/PAS_DEV/QuickApp.Pro/ClientApp/app/models/credit-terms.model").CreditTerms[][];
    // discountList: import("c:/Users/Jyotsna/source/repos/PAS_DEV/QuickApp.Pro/ClientApp/app/models/discountvalue").DiscountValue[][];
    // markUpList: import("c:/Users/Jyotsna/source/repos/PAS_DEV/QuickApp.Pro/ClientApp/app/models/markUpPercentage.model").MarkUpPercentage[][];
    taxRatesList: any = [];
    creditTermList: any;
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
        taxTypeId:'',
       taxRateId:0,
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
    // discountNew = {


    //     discObj.DiscontValue = discountViewModel.DiscontValue;
    //     discObj.MasterCompanyId = 1;
    //     discObj.CreatedBy = discountViewModel.CreatedBy;
    //     discObj.UpdatedBy = discountViewModel.UpdatedBy;
    //     discObj.CreatedDate = System.DateTime.UtcNow;
    //     discObj.UpdatedDate = discountViewModel.UpdatedDate;

    // }

    //    "masterCompanyId":1,
    //    "createdBy":"admin",
    //    "updatedBy":"admin",


    // markUpList: import("c:/Users/Jyotsna/source/repos/PAS_DEV/QuickApp.Pro/ClientApp/app/models/markUpPercentage.model").MarkUpPercentage[][];
    // disableSaveCreditTerms: boolean;
    // selectedCreditTerms: any;
    // SelectedCurrencyInfo: any;
    // disableSaveCurrency: boolean;
    // localintegration: any[];
    // integrationName: string;
    // taxratecollection: any[];
    // taxRateName: string;
    // creditlimitData: any[]=[];
    // activeIndex: number;
    // fileToUpload: File;
    // http: any;
    // discountId: number;
    // apiEndPoint: any;
    // handleError: any;
    // httpClient: any;
    // allTaxrateInfo: any[];
    // showCurrency: boolean;
    // showCreditTearms: boolean;
    // showCreditLimit: boolean;
    // customersList: any[];
    // creditTermsCollection: any[];
    // creditTermName: any;
    // allcreditTermInfo: any[];
    // allIntegrationInfo: any[];
    // currencyName: any;
    // allCurrencyInfo: any[];
    // currencyCollection: any[];
    // customerId: any;
    // allgeneralInfo: any[];
    // local: any;
    // action_name: any = "";
    // memo: any = "";
    // createdBy: any = "";
    // updatedBy: any = "";
    // createddate: any = "";
    // updatedDate: any = "";
    // sub: any;
    // alldiscountvalueInfo: DiscountValue[] = [];
    // discountcollection: any[]=[];
    // discountcolle: any;
    // selectedConsume: any;
    // disableSaveConsume: boolean;
    // creditTermsId: any;
    // taxRateValues: any[] = [];
    // allTaxratedetails: any[];
    // selectedActionName: any;
    // disableSave: boolean;
    // disableSavefoMarkUp: boolean;
    // allMarkUpList: MarkUpPercentage[];
    // markUpCollection: any[];
    // markUppercentageCollection: any;
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ViewChild(MatSort) sort: MatSort;
    // filteredBrands: any[];
    // displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    // dataSource: MatTableDataSource<any>;
    // allActions: any;
    // allComapnies: MasterCompany[] = [];
    // sourceCustomer: any = {};
    // public sourceAction: any = {};
    // currentMarkUp: MarkUpPercentage;
    // public auditHisory: AuditHistory[] = [];
    // loadingIndicator: boolean;
    // allTaxTypes: any[] = [];
    // actionamecolle: any[] = [];
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
    // length: number;
    // localCollection: any;
    // display: boolean = false;
    // modelValue: boolean = false;
    // /** Actions ctor */
    // discontValue: string;
    // namecolle: any[] = [];
    // public allWorkFlows: any[] = [];
    // markUpValue: any;
    // markUpPercentageId: any;
    // itemQuantity = [];
    // itemQuantity1 = [];
    // itemQuantity2 = [];
    // isCustomerAlsoVendor: boolean;

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
        private configurations: ConfigurationService
      

    ) {
        // if (this.workFlowtService.contactCollection) {
        //     this.local = this.workFlowtService.contactCollection;
        // }
        // this.dataSource = new MatTableDataSource();
        // if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {

        //     this.local = this.workFlowtService.listCollection.t;
        //     this.sourceCustomer = this.workFlowtService.listCollection.t;
        // }

    }
    // taxType
    taxtypesList = [];


    ngOnInit(): void {

        if (this.editMode) {

            this.id = this.editGeneralInformationData.customerId
         
            this.savedGeneralInformationData = this.editGeneralInformationData;
            this.customerCode = this.editGeneralInformationData.customerCode;
            this.customerName = this.editGeneralInformationData.name;
        
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

        // this.id = this.savedGeneralInformationData.customerId;
        //this.generateValue();
        this.getAllcreditTermList();
        this.getAllDiscountList();
       // this.getAllMarkUp();
        this.getAllTaxList();
        this.getAllCurrency();
        this.getAllPercentage();
        this.getAllTaxTypes();
        this.getTaxRates();
        this.getAllDiscountList1();
        this.getAllTaxRates();
    
    }


    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    //generateValue() {
    //    for (var i = 1; i <= 100; i++) {
    //        this.taxRatesList.push({ label: `${i}%`, value: `${i}%` });


    //    }
    //}
    getAllcreditTermList() {
        this.commonservice.smartDropDownList('CreditTerms', 'CreditTermsId', 'Name').subscribe(res => {
            this.creditTermList = res;

        })
        // this.creditTermsService.getCreditTermsList().subscribe(res => {
        //     this.creditTermList = res[0];
        // })
    }
    getAllCurrency() {
       
        this.currencyService.getCurrencyList().subscribe(res => {

            this.allCurrencyInfo = res[0];
        })
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
    
        //this.percentService.getPercentages().subscribe(res => {
            this.percentageList = res;
        })
    }
    getAllTaxRates() {
        this.commonservice.smartDropDownList('[Percent]', 'PercentId', 'PercentValue').subscribe(res => {

            //this.percentService.getPercentages().subscribe(res => {
            this.taxRatesList = res;
        })
    }
    //getTaxRates() {
    //    this.taxRateService.getTaxRateList().subscribe(res => {
    //        this.taxRateList = res[0];
    //    })
    //}

    getTaxRates() {
        this.commonservice.smartDropDownList('[TaxRate]', 'TaxRateId', 'TaxRate').subscribe(res => {

            //this.percentService.getPercentages().subscribe(res => {
            this.taxRateList = res;
        })
    }

    getAllTaxTypes() {
        //this.taxtypeser.getWorkFlows().subscribe(res => {
            this.commonservice.smartDropDownList('TaxType', 'TaxTypeId', 'Description').subscribe(res => {
                this.taxTypeList = res;
           // this.taxTypeList = res[0];
        })
    }
    

    filterCreditTerms(event) {
        this._creditTermList = this.creditTermList;

        this._creditTermList = [...this.creditTermList.filter(x => {
            return x.label.toLowerCase().includes(event.query.toLowerCase())
        })]

    }

    checkCreditTermsExists(field, value) {
        
        const exists = validateRecordExistsOrNot(field, value, this.creditTermList)
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
        })
    }
   
    getAllDiscountList1() {
        this.commonservice.smartDropDownList('[Discount]', 'DiscountId', 'DiscontValue').subscribe(res => {
            this.discountList1 = res;
        })
    }

   

    filterDiscount(event) {
     
        console.log();
        this._discountList = this.discountList1;
    

        this._discountList = [...this.discountList1.filter(x => {
            console.log(x);
            return x.label.includes(event.query.toLowerCase())

           
        })]
    }

   

    checkDiscountExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.creditTermList)
        console.log(exists);
        if (exists.length > 0) {
            this.isDiscountExists = true;
        } else {
            this.isDiscountExists = false;
        }
    }
    checkDiscountExistss(value) {
      
        this.isDiscountExists = false;

        for (let i = 0; i < this.discountList1.length; i++) {
            if (this.discontValue == this.discountList1[i].label || value == this.discountList[i].label) {
                this.isDiscountExists = true;
                // this.disableSave = true;

                return;
            }

        }
    }

    selectedDiscount() {
        this.isDiscountExists = true;
    }
    //getAllMarkUp() {
    //    this.customerService.getMarkUpList().subscribe(res => {
    //        this.markUpList = res[0];
    //    })
    //}
    checkPercentExists(value) {

        this.isTaxRateExists = false;

        for (let i = 0; i < this.percentageList.length; i++) {
            if (this.discontValue == this.percentageList[i].label || value == this.percentageList[i].label) {
                this.isTaxRateExists = true;
                // this.disableSave = true;

                return;
            }

        }
    }


    getAllTaxList() {
        this.taxRateService.getTaxRateList().subscribe(res => {
            // this.taxrateList = res[0];
            const responseData = res[0];
            this.taxtypesList = responseData.map(x => {
                return {
                    label: x.taxTypeId, value: x.taxTypeId
                }
            })

        })
    }
    


    getMappedTaxTypeRateDetails() {
        
        this.customerService.getMappedTaxTypeRateDetails(this.id).subscribe(res => {
            this.taxTypeRateMapping = res;
                
        })
    }
    mapTaxTypeandRate() {
        if(this.selectedTaxRates && this.selectedTaxType){ 
            const index = this.taxTypeRateMapping.findIndex(item=> item.taxType === getValueFromArrayOfObjectById('label', 'value', this.selectedTaxType, this.taxTypeList) && item.taxRate === this.selectedTaxRates);
            if(index > -1){
                this.alertService.showMessage(
                    'Duplicate',
                    `Already Exists `,
                    MessageSeverity.warn
                );
                this.selectedTaxRates = null;
                this.selectedTaxType = null;
            } else {
                this.taxTypeRateMapping.push({
                    customerId: this.id,
                    taxType: getValueFromArrayOfObjectById('label', 'value', this.selectedTaxType, this.taxTypeList),
                    taxRate: this.selectedTaxRates
                })
                this.selectedTaxRates = null;
                this.selectedTaxType = null;
            }
            
            
        }
        console.log(this.taxTypeRateMapping, "this.taxTypeRateMapping+++")
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
            //this.vendorService.vendorGeneralDocumentUploadEndpoint(this.formData, this.sourceVendor.vendorId,3,'Vendor',this.userName,1);
            this.customerService.customerFinanceFileUpload(this.formData).subscribe(res => {
                this.formData = new FormData();
                this.toGetCustomerFinanceDocumentsList(this.savedGeneralInformationData.customerId);
            });

            this.alertService.showMessage(
                'Success',
                `Saved Financal Infromation`,
                MessageSeverity.success
            );
            this.nextClick();
        })
    }
    downloadFileUpload(rowData) {
     
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadattachedfile?filePath=${rowData.link}`;
        window.location.assign(url);
    }

    toGetCustomerFinanceDocumentsList(customerId) {
        var moduleId = 1;
        this.customerService.GetCustomerFinanceDocumentsList(customerId, moduleId).subscribe(res => {
            this.allCustomerFinanceDocumentsList = res;
            console.log(this.allCustomerFinanceDocumentsList);
        })
    }

    CustomerAttachmentDelete(rowData) {
        let attachmentDetailId = rowData.attachmentDetailId;
        let updatedBy = this.userName;

        this.customerService.GetCustomerAttachmentDelete(attachmentDetailId, updatedBy).subscribe(res => {
            this.toGetCustomerFinanceDocumentsList(this.id);
        
        })
    }

    saveMarkUpPercentage() {
        const data = {
            ...this.addNewIntergration,
            createdBy: this.userName,
            updatedBy: this.userName,
        }
        this.customerService.newMarkUp(data).subscribe(data => {
            //this.getAllMarkUp();
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
            this.resetCreditTermsPopUp()
            this.savedGeneralInformationData.creditTermsId = data.creditTermsId;

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
        //const data = {
        //    ...this.addNewTaxRate,
        //    masterCompanyId: 1,
        //    createdBy: this.userName,
        //    updatedBy: this.userName,
        //    createdDate: new Date(),
        //    updatedDate: new Date()
        //}
        const data = {
            ...this.addNewTaxRate, createdBy: this.userName, updatedBy: this.userName, masterCompanyId: 1,

            percentValue: editValueAssignByCondition('percentValue', this.addNewTaxRate.taxRate),

        };

    
        //data.percentValue = parseFloat(this.addNewTaxRate.percentValue);
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
        //this.taxRateService.newTaxRate(data).subscribe(data => {
        //    this.getAllTaxTypes();
        //    this.getAllTaxRates();
        //    this.alertService.showMessage(
        //        'Success',
        //        `Added New Tax Rate  Successfully `,
        //        MessageSeverity.success
        //    );
        //    this.resetTaxType();
        //    //this.savedGeneralInformationData.discountId = data.discountId;
        //})




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
   

   // deleteTaxTypeRate(i) {
    //    debugger

    //    if (i.ustomerTaxTypeRateMappingId > 0) {
    //        this.customerService.deleteCustomerTaxTypeRateById()
    //    }
    //    else {
    //        //  this.partListForPMA = [{ label: rowData.partNumber, value: rowData }, ...this.partListForPMA];
    //        this.taxTypeRateMapping.splice(i, 1);
    //  }

      

    //}

    // newAddDiscount
    //     this.itemQuantity = Array(100).fill(1).map((x, i) => i + 1);
    //     this.itemQuantity1 = Array(30).fill(1).map((x, i) => i + 1);
    //     this.itemQuantity2 = Array(366).fill(1).map((x, i) => i + 1);
    //     this.workFlowtService.currentUrl = '/customersmodule/customerpages/app-customer-financial-information';
    //     this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
    //     this.workFlowtService.ShowPtab = true;
    //     this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab); //steps
    //     this.loadDiscountData();
    //     this.loadCreditTermsData();
    //     this.loadCurrencyData();
    //     this.taxratedata();
    //     this.loadData();
    //     this.taxRate();
    //     this.loadMarkUpData();
    //     this.integrationData();
    //     if (this.local) {
    //         this.getCustomerList();
    //     }
    //     if (this.workFlowtService.isEditMode == false) {
    //         this.sourceCustomer.allowPartialBilling = true;
    //         this.sourceCustomer.allowProformaBilling = true;
    //     }

    // }
    // private getCustomerList() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.workFlowtService.getCustomerdata(this.local.customerId).subscribe(
    //         results => this.onCustomersLoadSuccssfull(results[0]),
    //         error => this.onDataLoadFailed()
    //     );

    // }

    // private onCustomersLoadSuccssfull(allCustomers: any) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allCustomers;
    //     this.isCustomerAlsoVendor = allCustomers[0].t.isCustomerAlsoVendor;
    //     if (this.customersList) {
    //         this.sourceCustomer = this.customersList;
    //     }

    // }

    // // Load Customer data//

    // private loadData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.workFlowtService.getWorkFlows().subscribe(
    //         results => this.onDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed()
    //     );
    //     this.cols = [
    //         { field: 'description', header: 'Action Name' },
    //         { field: 'memo', header: 'Memo' },
    //         { field: 'createdBy', header: 'Created By' },
    //         { field: 'updatedBy', header: 'Updated By' },
    //         { field: 'updatedDate', header: 'Updated Date' },
    //         { field: 'createdDate', header: 'Created Date' }

    //     ];

    //     this.selectedColumns = this.cols;

    // }

    // private onDataLoadSuccessful(allWorkFlows: any[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allActions = allWorkFlows;
    //     for (let i = 0; i < this.allActions.length; i++) {
    //         this.creditlimitData.push({ 'creditlimitData': this.allActions[i].t });
    //     }


    // }
    // // Load Master compamies
    // private loadMasterCompanies() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.masterComapnyService.getMasterCompanies().subscribe(
    //         results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed()
    //     );

    // }


    // private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
    //     // alert('success');
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.allComapnies = allComapnies;

    // }
    // public applyFilter(filterValue: string) {
    //     this.dataSource.filter = filterValue;
    // }


    // handleFileInput(files: FileList) {
    //     this.fileToUpload = files.item(0);
    //     this.uploadFileToActivity();
    // }

    // // tried for File upload
    // uploadFileToActivity() {
    //     this.postFile(this.fileToUpload).subscribe(() => {

    //     }, error => {
    //         console.log(error);
    //     });
    // }

    // postFile(fileToUpload: File): Observable<boolean> {
    //     const endpoint = 'D:\\H1';
    //     const formData: FormData = new FormData();
    //     formData.append('fileKey', fileToUpload, fileToUpload.name);
    //     return this.httpClient
    //         .post(endpoint, formData, {})
    //         .map(() => { return true; })
    //         .catch((e) => this.handleError(e));
    // }

    // // Load Tax Rate data
    //  private taxratedata() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.taxRateService.getTaxRateList().subscribe(
    //         results => this.onDataLoadtaxrateSuccessful(results[0]),
    //         error => this.onDataLoadFailed()
    //     );

    // }
    // private onDataLoadtaxrateSuccessful(getTaxRateList: TaxRate[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = getTaxRateList;
    //     this.allTaxrateInfo = getTaxRateList;
    // }


    // handleChange(rowData, e) {
    //     if (e.checked == false) {
    //         this.sourceCustomer = rowData;
    //         this.Active = "In Active";
    //     }
    //     else {
    //         this.sourceCustomer = rowData;
    //         this.Active = "Active";
    //     }

    // }


    // // Filter Name
    // filterActions(event) {
    //     this.localCollection = [];
    //     for (let i = 0; i < this.allActions.length; i++) {
    //         let actionName = this.allActions[i].description;
    //         if (actionName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //             this.localCollection.push(actionName);
    //         }
    //     }
    // }



    // private onDataLoadFailed() {
    //     // alert(error);
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;

    // }

    // open(content) {
    //     this.isEditMode = false;
    //     this.isDeleteMode = false;
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
    //     this.sourceCustomer = row;
    //     this.loadMasterCompanies();
    //     // this.actionName = this.sourceCustomer.description;
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

    // openHist(row) {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.sourceCustomer = row;
    // }
    // onBlurMethod(data) {
    //     if (data == 'creditLimit') {
    //         this.showCreditLimit = false;
    //     }
    //     if (data == 'creditTermsId ') {
    //         this.showCreditTearms = false;
    //     }
    //     if (data == 'currencyId') {
    //         this.showCurrency = false;
    //     }
    // }


    // // Save Finance Info
    // editItemAndCloseModel() {
    // 	if (!(this.sourceCustomer.creditLimit && this.sourceCustomer.creditTermsId && this.sourceCustomer.currencyId)) {
    //         this.display = true;
    //         this.modelValue = true;
    //     }
    //     if (this.sourceCustomer.creditLimit && this.sourceCustomer.creditTermsId && this.sourceCustomer.currencyId) {
    //         if (this.sourceCustomer.customerId) {
    //             this.sourceCustomer.createdBy = this.userName;
    //             this.sourceCustomer.updatedBy = this.userName;
    //             this.sourceCustomer.masterCompanyId = 1;
    //             this.workFlowtService.updatefinanceinfo(this.sourceCustomer, this.local.customerId).subscribe(data => {
    // 				this.localCollection = data;
    // 				this.saveCompleted();
    // 				this.workFlowtService.financeCollection = this.local;

    //             })

    //         }
    //         else {

    //             this.sourceCustomer.updatedBy = this.userName;
    //             this.sourceCustomer.masterCompanyId = 1;
    //             this.workFlowtService.updatefinanceinfo(this.sourceCustomer, this.local.customerId).subscribe(data => {
    // 				this.localCollection = data;
    // 				this.saveCompleted();
    // 				this.workFlowtService.financeCollection = this.local;
    //             })

    //         }
    //     }
    //     else { }



    //     //this.modal.close();
    // }

    // deleteItemAndCloseModel() {

    // }	


    // dismissModel() {
    //     this.isDeleteMode = false;
    //     this.isEditMode = false;
    //     this.modal.close();
    // }

    // private saveCompleted() {

    //     if (this.isDeleteMode == true) {
    //         this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
    //         this.isDeleteMode = false;
    //     }
    //     else {
    //         this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

    //     }

    //     this.loadData();
    // }



    // get userName(): string {
    //     return this.authService.currentUser ? this.authService.currentUser.userName : "";
    // }

    // private saveFailedHelper(error: any) {
    //     this.alertService.stopLoadingMessage();
    //     this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
    //     this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    // }


    // openCurrency(content) {
    //     this.isEditMode = false;
    // 	this.isDeleteMode = false;
    // 	this.disableSaveCurrency = false;
    //     this.loadMasterCompanies();
    //     this.sourceAction = new Currency();
    //     this.sourceAction.isActive = true;
    //     this.currencyName = "";
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }
    // openTaxRateStateProv(content) {
    //     this.isEditMode = false;
    //     this.isDeleteMode = false;
    //     this.sourceAction.isActive = true;
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }
    // openCrediTerms(content) {
    //     this.isEditMode = false;
    // 	this.isDeleteMode = false;
    // 	this.disableSaveCreditTerms = false;
    // 	this.loadMasterCompanies();
    // 	this.sourceAction = new CreditTerms();
    //     this.sourceAction.isActive = true;
    //     this.creditTermName = "";
    //     this.creditTermsId = "";
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }


    // // Loading Credit Terms
    // CreditTermsHandler(event) {
    // 	if (event.target.value != "") {
    // 		let value = event.target.value.toLowerCase();
    // 		if (this.selectedCreditTerms) {
    // 			if (value == this.selectedCreditTerms.toLowerCase()) {
    // 				this.disableSaveCreditTerms = true;

    // 			}
    // 			else {
    // 				this.disableSaveCreditTerms = false;

    // 			}
    // 		}

    // 	}
    // }


    // // Currency Filter
    // currencyHandler(event) {
    // 	if (event.target.value != "") {
    // 		let value = event.target.value.toLowerCase();
    // 		if (this.SelectedCurrencyInfo) {
    // 			if (value == this.SelectedCurrencyInfo.toLowerCase()) {
    // 				this.disableSaveCurrency = true;

    // 			}
    // 			else {
    // 				this.disableSaveCurrency = false;

    // 			}
    // 		}

    // 	}
    // }

    // CreditTermsCode(event) {
    // 	if (this.allcreditTermInfo) {

    // 		for (let i = 0; i < this.allcreditTermInfo.length; i++) {
    // 			if (event == this.allcreditTermInfo[i].name) {
    // 				this.sourceAction.name = this.allcreditTermInfo[i].name;
    // 				this.disableSaveCreditTerms = true;

    // 				this.selectedCreditTerms = event;
    // 			}

    // 		}
    // 	}
    // }
    // CurrencyInfo(event) {
    // 	if (this.allCurrencyInfo) {
    // 		for (let i = 0; i < this.allCurrencyInfo.length; i++) {
    // 			if (event == this.allCurrencyInfo[i].code) {
    // 				this.sourceAction.code = this.allCurrencyInfo[i].code;
    // 				this.disableSaveCurrency= true;

    // 				this.SelectedCurrencyInfo = event;
    // 			}

    // 		}
    // 	}
    // }


    // nextClick() {
    // 	this.workFlowtService.contactCollection = this.local;
    // 	this.activeIndex = 3;
    //     this.workFlowtService.indexObj.next(this.activeIndex);
    //     this.editItemAndCloseModel();
    // 	this.route.navigateByUrl('/customersmodule/customerpages/app-customer-billing-information');

    // }
    // backClick() {
    // 	this.workFlowtService.contactCollection = this.local;
    // 	this.activeIndex = 1;
    // 	this.workFlowtService.indexObj.next(this.activeIndex);
    // 	this.route.navigateByUrl('/customersmodule/customerpages/app-customer-contacts');

    // }

    // // Load Currency data
    // private loadCurrencyData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.currencyService.getCurrencyList().subscribe(
    //         results => this.onCurrecyLoad(results[0]),
    //         error => this.onDataLoadFailed()
    //     );

    // }
    // private onCurrecyLoad(getCurrencyList: Currency[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = getCurrencyList;

    //     this.allCurrencyInfo = getCurrencyList;
    // }

    // // Save Currency
    // saveCurrecy() {
    //     if (this.currencyName.toLowerCase().trim() == "") {
    //         this.alertService.showMessage("Empty", 'Cannot Submit Empty', MessageSeverity.warn);
    //         return;
    //     }

    //     for (let i = 0; i < this.allCurrencyInfo.length; i++) {
    //         if (this.allCurrencyInfo[i].code.toLowerCase().localeCompare(this.currencyName.toLowerCase()) == 0) {
    //             this.alertService.showMessage("Duplicate", 'Already Exist', MessageSeverity.warn);
    //             return;
    //         }
    //         else {
    //         }
    //     }
    //     if (this.isEditMode == false) {
    //         this.sourceAction.createdBy = this.userName;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.code = this.currencyName;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.currencyService.newAddcurrency(this.sourceAction).subscribe(data => {
    // 			this.loadCurrencyData();
    // 			this.saveCompleted();
    // 			this.sourceCustomer.currencyId = data.currencyId;
    //         });
    //     }
    //     else {

    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.code = this.currencyName;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.currencyService.updatecurrency(this.sourceAction).subscribe(
    //             () => this.saveCompleted(),
    //             error => this.saveFailedHelper(error));
    //     }

    //     this.modal.close();
    // }

    // // Filetr Currency
    // filterCurrency(event) {
    // 	this.currencyCollection = [];
    // 	if (this.allCurrencyInfo) {
    // 		for (let i = 0; i < this.allCurrencyInfo.length; i++) {
    // 			let currencyName = this.allCurrencyInfo[i].code;
    //             if (currencyName.toLowerCase().localeCompare(event.query.toLowerCase()) == 0) {
    // 				this.currencyCollection.push(currencyName);
    // 			}
    // 		}
    // 	}
    // }


    // //-------Credit Terms----
    // private loadCreditTermsData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.CreditTermsService.getCreditTermsList().subscribe(
    //         results => this.onCreditTermsdata(results[0]),
    //         error => this.onDataLoadFailed()
    //     );

    // }
    // private onCreditTermsdata(getCreditTermsList: CreditTerms[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = getCreditTermsList;
    //     this.allcreditTermInfo = getCreditTermsList;
    // }


    // // Save Credit Terms
    // saveCreditTermsdata() {
    //     if (this.creditTermsId.toLowerCase().trim() == "") {
    //         this.alertService.showMessage("Empty", 'Cannot Submit Empty', MessageSeverity.warn);
    //         return;
    //     }
    //     for (let i = 0; i < this.allcreditTermInfo.length; i++) {
    //         if (this.allcreditTermInfo[i].name.toLowerCase().localeCompare(this.creditTermsId.toLowerCase()) == 0) {
    //             this.alertService.showMessage("Duplicate", 'Already Exist', MessageSeverity.warn);
    //             return;
    //         }
    //     }
    //     if (this.isEditMode == false) {
    //         this.sourceAction.createdBy = this.userName;
    //         this.sourceAction.updatedBy = this.userName;
    // 		this.sourceAction.name = this.creditTermsId;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.CreditTermsService.newAddcreditterms(this.sourceAction).subscribe(data => {
    // 			this.loadCreditTermsData();
    // 			this.sourceCustomer.creditTermsId = data.creditTermsId;
    // 			this.saveCompleted();
    //         })

    //     }
    //     else {
    //         this.sourceAction.updatedBy = this.userName;
    // 		this.sourceAction.name = this.creditTermsId;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.CreditTermsService.updatecreditterms(this.sourceAction).subscribe(
    //             () => this.saveCompleted(),
    //             error => this.saveFailedHelper(error));
    //     }

    //     this.modal.close();
    // }


    // SaveCreditModel() {
    // 	if (this.isEditMode == false) {
    // 		this.sourceAction.createdBy = this.userName;
    // 		this.sourceAction.updatedBy = this.userName;
    // 		this.sourceAction.name = this.creditTermName;
    // 		this.sourceAction.masterCompanyId = 1;
    // 		this.CreditTermsService.newAddcreditterms(this.sourceAction).subscribe(data => {
    // 			this.sourceCustomer.creditTermsId = data.creditTermsId;
    // 			this.loadCreditTermsData();
    // 		})
    // 	}
    // 	else {
    // 		this.sourceAction.updatedBy = this.userName;
    // 		this.sourceAction.name = this.creditTermName;
    // 		this.sourceAction.masterCompanyId = 1;
    // 		this.CreditTermsService.updatecreditterms(this.sourceAction).subscribe(
    // 			() => this.saveCompleted(),
    // 			error => this.saveFailedHelper(error));
    // 	}

    // 	this.modal.close();
    // }

    // // Filetr Credit Terms
    // filtercreditTerms(event) {
    // 	this.creditTermsCollection = [];
    // 	if (this.allcreditTermInfo) {
    // 		for (let i = 0; i < this.allcreditTermInfo.length; i++) {
    // 			let creditTermName = this.allcreditTermInfo[i].name;
    // 			if (creditTermName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    // 				this.creditTermsCollection.push(creditTermName);
    // 			}
    // 		}
    // 	}
    // }


    // opentaxratemodel(content) {
    //     this.isEditMode = false;
    //     this.isDeleteMode = false;
    //     this.loadMasterCompanies();
    //     this.sourceAction = new TaxRate();
    //     this.sourceAction.isActive = true;
    //     this.taxRateName = "";
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // // Filter Taxrates///
    // filterTaxRates(event) {
    //     this.taxratecollection = [];
    //     for (let i = 0; i < this.allTaxrateInfo.length; i++) {
    //         let taxRateName = this.allTaxrateInfo[i].taxTypeId;
    //         if (taxRateName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //             this.taxratecollection.push(taxRateName);
    //         }
    //     }
    // }

    // // Save Taxrate
    // taxratesavemethod() {
    //     if (this.isEditMode == false) {
    //         this.sourceAction.createdBy = this.userName;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.taxTypeId = this.taxRateName;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.taxRateService.newTaxRate(this.sourceAction).subscribe(() => { this.taxratedata() })

    //     }
    //     else {
    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.taxTypeId = this.taxRateName;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.taxRateService.updateTaxRate(this.sourceAction).subscribe(
    //             () => this.saveCompleted(),
    //             error => this.saveFailedHelper(error));
    //     }
    // }

    // // Filetr Tax types
    // filterTaxTypes(event) {
    // 	this.localCollection = [];
    // 	for (let i = 0; i < this.allTaxTypes.length; i++) {
    // 		let taxTypeName = this.allTaxTypes[i].description;
    // 		if (taxTypeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    // 			this.actionamecolle.push([{
    // 				"taxTypeId": this.allTaxTypes[i].taxTypeId,
    // 				"taxTypeName": taxTypeName
    // 			}]),

    // 				this.localCollection.push(taxTypeName);
    // 		}
    // 	}
    // }
    // eventHandler(event) {
    // 	let value = event.target.value.toLowerCase();
    // 	if (this.selectedActionName) {
    // 		if (value == this.selectedActionName.toLowerCase()) {
    // 			this.disableSave = true;
    // 		}
    // 		else {
    // 			this.disableSave = false;
    // 		}
    // 	}
    // }

    // //Filter Part//
    // partnmId(event) {
    // 	for (let i = 0; i < this.actionamecolle.length; i++) {
    // 		if (event == this.actionamecolle[i][0].taxTypeName) {
    // 			this.disableSave = true;
    // 			this.selectedActionName = event;
    // 		}
    // 	}
    // }
    // private onTaxTypeloadsuc(allWorkFlows: any[]) {
    // 	// alert('success');
    // 	this.alertService.stopLoadingMessage();
    // 	this.loadingIndicator = false;
    // 	this.dataSource.data = allWorkFlows;
    // 	this.allTaxTypes = allWorkFlows;
    // }


    // // Load Integration Data
    // private integrationData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.inteservice.getWorkFlows().subscribe(
    //         results => this.onDatainteSuccessful(results[0]),
    //         error => this.onDataLoadFailed()
    //     );

    // }

    // private onDatainteSuccessful(allWorkFlows: any[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.allIntegrationInfo = allWorkFlows;
    // }

    // integratn(content) {
    //     this.isEditMode = false;
    //     this.isDeleteMode = false;
    //     this.loadMasterCompanies();
    //     this.sourceAction = new Integration();
    //     this.sourceAction.isActive = true;
    //     this.integrationName = "";
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // // Filter Integration//
    // filterintegrations(event) {
    //     this.localintegration = [];
    //     for (let i = 0; i < this.allIntegrationInfo.length; i++) {
    //         let integrationName = this.allIntegrationInfo[i].description;
    //         if (integrationName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //             this.localintegration.push(integrationName);
    //         }
    //     }
    // }

    // // Save Integration
    // saveintegration() {
    //     if (this.isEditMode == false) {
    //         this.sourceAction.createdBy = this.userName;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.description = this.integrationName;
    //         this.inteservice.newAction(this.sourceAction).subscribe(() => { this.integrationData() })

    //     }
    //     else {
    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.description = this.integrationName;
    //         this.inteservice.updateAction(this.sourceAction).subscribe(
    //             () => this.saveCompleted(),
    //             error => this.saveFailedHelper(error));
    //     }
    // }

    // openDiscount(content) {
    // 	this.isEditMode = false;
    // 	this.isDeleteMode = false;
    // 	this.loadMasterCompanies();
    // 	this.sourceAction = new DiscountValue();
    // 	this.sourceAction.isActive = true;
    // 	this.discontValue = "";
    // 	this.modal = this.modalService.open(content, { size: 'sm' });
    // 	this.modal.result.then(() => {
    // 		console.log('When user closes');
    // 	}, () => { console.log('Backdrop click') })



    // }

    // // Filter Discount
    // filterDiscountvalue(event) {
    // 	this.discountcollection = [];
    // 	for (let i = 0; i < this.alldiscountvalueInfo.length; i++) {
    // 		let discontValue = this.alldiscountvalueInfo[i].discontValue;
    // 		if (discontValue.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    // 			this.namecolle.push([{
    // 				"discountId": this.alldiscountvalueInfo[i].discountId,
    // 				"discontValue": discontValue
    // 			}]),
    // 				this.discountcollection.push(discontValue)
    // 		}
    // 		}
    // 	}

    // // Load Discount data
    // private loadDiscountData() {
    // 	this.alertService.startLoadingMessage();
    // 	this.loadingIndicator = true;

    // 	this.workFlowtService.getDiscountList().subscribe(
    // 		results => this.onDataLoadClassifiSuccessful(results[0]),
    // 		error => this.onDataLoadFailed()
    // 	);

    // }
    // private onDataLoadClassifiSuccessful(getDiscountList: DiscountValue[]) {
    // 	// alert('success');
    // 	this.alertService.stopLoadingMessage();
    // 	this.loadingIndicator = false;
    // 	this.dataSource.data = getDiscountList;

    // 	this.alldiscountvalueInfo = getDiscountList;
    // }




    // // Add Discount
    // editItemCloseModel() {
    //     if (this.discontValue.toLowerCase().trim() == "") {
    //         this.alertService.showMessage("Empty", 'Cannot Submit Empty', MessageSeverity.warn);
    //         return;
    //     }
    //     for (let i = 0; i < this.alldiscountvalueInfo.length; i++) {
    //         if (this.alldiscountvalueInfo[i].discontValue.toLowerCase().localeCompare(this.discontValue.toLowerCase()) == 0) {
    //             this.alertService.showMessage("Duplicate", 'Already Exist', MessageSeverity.warn);
    //             return;
    //         }
    //         else {
    //         }
    //     }
    // 	if (this.isEditMode == false) {
    // 		this.sourceAction.createdBy = this.userName;
    // 		this.sourceAction.updatedBy = this.userName;
    // 		this.sourceAction.discontValue = this.discontValue;
    // 		this.workFlowtService.newAddDiscount(this.sourceAction).
    // 			subscribe(() => {
    // 			this.loadDiscountData()

    // 		})

    // 		this.activeIndex = 2;
    // 	}
    // 	else {
    // 		this.sourceAction.updatedBy = this.userName;
    // 		this.sourceAction.discontValue = this.discontValue;
    // 		this.sourceAction.masterCompanyId = 1;
    // 		this.workFlowtService.updatediscount(this.sourceAction).subscribe(
    // 			() => this.saveCompleted(),
    // 			error => this.saveFailedHelper(error));

    // 		this.activeIndex = 2;


    // 	}
    // 	this.modal.close();
    // }

    // discountvalueHandler(event) {
    // 	if (event.target.value != "") {
    // 		let value = event.target.value.toLowerCase();
    // 		if (this.selectedConsume) {
    // 			if (value == this.selectedConsume.toLowerCase()) {
    // 				this.disableSaveConsume = true;

    // 			}
    // 			else {
    // 				this.disableSaveConsume = false;

    // 			}
    // 		}

    // 	}
    // }

    // discountvaluedesc(event) {
    // 	if (this.alldiscountvalueInfo) {
    // 		for (let i = 0; i < this.alldiscountvalueInfo.length; i++) {
    // 			if (event == this.alldiscountvalueInfo[i].discontValue) {
    // 				this.sourceCustomer.itemClassificationCode = this.alldiscountvalueInfo[i].discontValue;
    // 				this.disableSaveConsume = true;

    // 				this.selectedConsume = event;
    // 			}

    // 		}
    // 	}
    // }
    // private onTaxrateDetails(getEmployeeCerficationList: any[]) {
    // 	this.alertService.stopLoadingMessage();
    // 	this.loadingIndicator = false;
    // 	this.dataSource.data = getEmployeeCerficationList;
    // 	this.allTaxratedetails = getEmployeeCerficationList;
    // 	if (this.allTaxratedetails.length > 0) {
    // 		for (let i = 0; i < this.allTaxratedetails.length; i++)
    // 			this.taxRateValues.push(
    // 				{ value: this.allTaxratedetails[i].taxTypeId, label: this.allTaxratedetails[i].description },

    // 			);
    // 	}
    // }
    // // Load Taxrate
    // private taxRate() {
    // 	this.alertService.startLoadingMessage();
    // 	this.loadingIndicator = true;
    // 	this.taxRateService.getTaxRateList().subscribe(
    // 		results => this.onTaxrateDetails(results[0]),
    // 		error => this.onDataLoadFailed()
    // 	);
    // }
    // openMarkUpPercentage(content) {

    //     this.isEditMode = false;
    //     this.isDeleteMode = false;
    //     this.loadMasterCompanies();
    //     this.currentMarkUp = new MarkUpPercentage();
    //     this.sourceCustomer.markUpValue = this.sourceCustomer.markUpValue;
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }


    // onKeymarkUp(event) {
    //     if (event.target.value != "") {
    //         let value = event.target.value.toLowerCase();
    //         if (this.selectedConsume) {
    //             if (value == this.selectedConsume.toLowerCase()) {
    //                 this.disableSavefoMarkUp = true;
    //             }
    //             else {
    //                 this.disableSavefoMarkUp = false;

    //             }
    //         }
    //     }
    // }



    // onSelectmarkUp(event) {
    //     if (this.allMarkUpList) {
    //         for (let i = 0; i < this.allMarkUpList.length; i++) {
    //             if (event == this.allMarkUpList[i].markUpValue) {
    //                 this.sourceCustomer.itemClassificationCode = this.allMarkUpList[i].markUpValue; 
    //                 this.disableSaveConsume = true;

    //                 this.selectedConsume = event;
    //             }
    //         }
    //     }
    // }

    // // Load markup data
    // private loadMarkUpData() {
    //     this.loadingIndicator = true;
    //     this.workFlowtService.getMarkUpList().subscribe(
    //         results => this.markUpLoadData(results[0]),
    //         error => this.onDataLoadFailed()
    //     );
    // }
    // private markUpLoadData(getMarkUpValues: MarkUpPercentage[]) {
    //     this.loadingIndicator = false;
    //     this.dataSource.data = getMarkUpValues;
    //     this.allMarkUpList = getMarkUpValues;
    // }


    // // Filter Markup

    // filterForMarkUp(event) {
    //     this.markUpCollection = [];
    //     if (this.allMarkUpList) {
    //         for (let i = 0; i < this.allMarkUpList.length; i++) {

    //             let markUpValue = this.allMarkUpList[i].markUpValue;
    //             if (markUpValue.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                     this.markUppercentageCollection.push([{
    //                         "markUpPercentageId": this.allMarkUpList[i].markUpPercentageId,
    //                         "markUpValue": markUpValue
    //                     }]),
    //                         this.markUpCollection.push(markUpValue)                    
    //             }
    //         }
    //     }
    // }

    // //save MarkUp//
    // saveMarkUpPercentage() {
    //     if (this.isEditMode == false) {
    //         this.sourceCustomer.createdBy = this.userName;
    //         this.sourceCustomer.updatedBy = this.userName;
    //         this.sourceCustomer.markUpValue = this.markUpValue;
    //         this.workFlowtService.newMarkUp(this.sourceCustomer).subscribe(data => {
    //             this.sourceCustomer.markUpPercentageId = data.markUpPercentageId;
    //                 this.loadMarkUpData()

    //             })

    //         this.activeIndex = 2;
    //     }
    //     else {
    //         this.sourceCustomer.updatedBy = this.userName;
    //         this.sourceCustomer.markUpValue = this.markUpValue;
    //         this.sourceCustomer.masterCompanyId = 1;
    //         this.workFlowtService.updateMarkUp(this.sourceCustomer).
    //             subscribe(() => {
    //                 this.loadMarkUpData()
    //             })

    //         this.activeIndex = 2;
    //     }
    //     this.modal.close();
    // }
} 