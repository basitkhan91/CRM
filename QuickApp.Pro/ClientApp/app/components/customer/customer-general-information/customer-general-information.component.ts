import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
    selectedRowForDeleteRestrictPMA: any = {};
    selectedRowForDeleteRestrictDER: any = {};
    disableAccountType: boolean = false;
    modal: NgbModalRef;
    parentCustomer = [];
    parentCustomerOriginal = []
    stopmulticlicks:boolean;



    constructor(public integrationService: IntegrationService, private modalService: NgbModal, public customerClassificationService: CustomerClassificationService, public ataservice: AtaMainService, private authService: AuthService, private alertService: AlertService,
        public customerService: CustomerService, public itemService: ItemMasterService, public vendorser: VendorService, private currencyService: CurrencyService, private commonService: CommonService) {

            this.stopmulticlicks=false;




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
        // if (this.isEdit) {
        this.getAllIntegrations();
        // }

        console.log(this.customerListOriginal);

        if (this.isEdit) {
            this.customerService.getCustomerdataById(this.id).subscribe(response => {
                console.log(response);

                const res = response[0];

                this.editGeneralInformation.emit(res);
                this.editData = res;
                this.parentCustomerList(this.id);

                this.generalInformation = {
                    ...this.editData,
                    name: getObjectByValue('name', res.name, this.customerallListOriginal),
                    country: getObjectById('countries_id', res.country, this.countryListOriginal),
                    parentId: getObjectById('customerId', res.parentId, this.customerallListOriginal),
                    customerCode: getObjectByValue('customerCode', res.customerCode, this.customerallListOriginal),
                    customerAffiliationId: String(res.customerAffiliationId)

                };
                this.generalInformation1 = {
                    ...this.editData,

                    country: getObjectById('countries_id', res.country, this.countryListOriginal),
                    parentId: getObjectByValue('customerId', res.parentId, this.customerallListOriginal),
                    customerCode: getObjectByValue('customerCode', res.customerCode, this.customerallListOriginal),


                };

                if (this.generalInformation.customerAffiliationId == 1 || this.generalInformation.customerAffiliationId == 3) {
                    this.disableAccountType = true;

                }


            });



            setTimeout(() => {
                this.getCustomerRestrictedPMAByCustomerId();
            }, 1000);

            setTimeout(() => {
                this.getCustomerRestrictedDERByCustomerId();
            }, 1000);

            setTimeout(() => {
                this.getCustomerClassificationByCustomerId();
            }, 1000);
            setTimeout(() => {
                this.getCustomerIntegrationTypesByCustomerId();
            }, 1000);



        } else {
            this.generalInformation = {
                ...this.generalInformation,
                customerAffiliationId: String(this.generalInformation.customerAffiliationId)
            }
            this.parentCustomerOriginal = this.customerListOriginal;
        }
    }


    async  getCustomerClassificationByCustomerId() {

        await this.customerService.getCustomerClassificationMapping(this.id).subscribe(res => {
            this.generalInformation.customerClassificationIds = res.map(x => x.customerClassificationId);
            // console.log(this.generalInformation.customerClassificationIds);
        });
    }



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
            for (let i = 0; i < this.generalInformation.restrictedPMAParts.length; i++) {
                this.generalInformation.restrictedPMAParts[i]['itemMasterId'] = this.generalInformation.restrictedPMAParts[i]['masterPartId']
            }

            this.restictPMAtempList = res.map(x => x.rescrictedPartId);
            this.partListForPMA = this.generalInformation.restrictedPMAParts.reduce((acc, obj) => {
                return acc.filter(x => x.value.itemMasterId !== obj.masterPartId)
            }, this.partListOriginal)


        })

    }

    async getCustomerRestrictedDERByCustomerId() {
        //await this.commonService.getRestrictedParts(1, this.id, 'DER').subscribe(res => {
        await this.commonService.getRestrictedPartsWithDesc(1, this.id, 'DER').subscribe(res => {

            this.generalInformation.restrictedDERParts = res;
            if (this.generalInformation.restrictedDERParts.length > 0) {
                this.disableRestrictedDER = true;
            }
            for (let i = 0; i < this.generalInformation.restrictedDERParts.length; i++) {
                this.generalInformation.restrictedDERParts[i]['itemMasterId'] = this.generalInformation.restrictedDERParts[i]['masterPartId']
            }
            this.restictDERtempList = res.map(x => x.rescrictedPartId);
            this.partListForDER = this.generalInformation.restrictedDERParts.reduce((acc, obj) => {
                return acc.filter(x => x.value.itemMasterId !== obj.masterPartId)
            }, this.partListOriginal)


        })
    }


    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }



    getAllPartList() {
        this.itemService.getPrtnumberslistListwithManufacturer().subscribe(res => {
            const data = res[0];

            this.partListOriginal = data.map(x => {
                return {
                    label: x.partNumber, value: { masterPartId: x.itemMasterId, itemMasterId: x.itemMasterId, partNumber: x.partNumber, memo: x.memo, createdBy: this.userName, updatedBy: this.userName, partDescription: x.partDescription, manufacturerName: x.manufacturerName }
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

    async getAllCustomerClassification() {
        await this.commonService.smartDropDownList('CustomerClassification', 'CustomerClassificationId', 'Description').subscribe(res => {
            this.allcustomerclassificationInfo = res;
        });

    }
    selectedPartForPMA(event) {
        console.log(event)

    }
    restrictPMAClick(event: any) {
        if (!this.generalInformation.restrictPMA) {
            this.generalInformation.restrictedPMAParts = [];
        }
    }

    restrictDERClick(event: any) {

        if (!this.generalInformation.restrictBER) {
            this.generalInformation.restrictedDERParts = [];
        }
    }

    restrictPBHClick(event: any) {
        if (!this.generalInformation.isPBHCustomer) {
            this.generalInformation.pbhCustomerMemo = "";
        }
    }



    addRestrictPMA() {
        if (this.generalInformation.restrictedPMAParts == undefined) {
            this.generalInformation.restrictedPMAParts = []
        }

        if (this.restictPMAtempList.length > 0) {
            this.disableRestrictedPMA = true;
            for (let i = 0; i < this.restictPMAtempList.length; i++) {
                if (this.restictPMAtempList[i] != undefined) {
                    this.generalInformation.restrictedPMAParts = [...this.generalInformation.restrictedPMAParts, this.restictPMAtempList[i]];
                }
            }
            this.generalInformation.restrictedPMAParts = this.generalInformation.restrictedPMAParts.slice();
            this.partListForPMA = this.generalInformation.restrictedPMAParts.reduce((acc, obj) => {
                return acc.filter(x => x.value.itemMasterId !== obj.masterPartId)
            }, this.partListOriginal)
            this.restictPMAtempList = [];
        }
    }



    deleteRestirctPMA() {

        console.log(this.selectedRowForDeleteRestrictPMA);

        // deleteRestirctPMA(i, rowData) {
        //     this.partListForPMA = [{ label: rowData.partNumber, value: rowData }, ...this.partListForPMA];
        //     this.generalInformation.restrictedPMAParts.splice(i, 1);
        // }

        if (this.selectedRowForDeleteRestrictPMA.restrictedPartId > 0) {

            this.customerService.deleteRestrictedPartsById(this.selectedRowForDeleteRestrictPMA.restrictedPartId, this.userName).subscribe(res => {
                this.alertService.showMessage(
                    'Success',
                    `Sucessfully Deleted Restricted Part`,
                    MessageSeverity.success
                );
            })
        }


        console.log(this.selectedRowForDeleteRestrictPMA);

        this.partListForPMA = [{ label: this.selectedRowForDeleteRestrictPMA.partNumber, value: this.selectedRowForDeleteRestrictPMA }, ...this.partListForPMA];
        console.log(this.partListForPMA);

        this.generalInformation.restrictedPMAParts.splice(this.selectedRowForDeleteRestrictPMA.index, 1);
        this.dismissModel()

        if (this.generalInformation.restrictedPMAParts.length == 0) {
            this.disableRestrictedPMA = false;
        }

    }
    openPopupForDeleteRestrictPMA(i, rowData, content) {
        this.selectedRowForDeleteRestrictPMA = rowData;
        this.selectedRowForDeleteRestrictPMA['index'] = i;

        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });

    }
    openPopupForDeleteRestrictDER(i, rowData, content) {
        this.selectedRowForDeleteRestrictDER = rowData;
        this.selectedRowForDeleteRestrictDER['index'] = i;

        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });

    }
    patternMobilevalidationWithSpl(event: any) {
        const pattern = /[0-9\+\-()\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }

    }
    checkaddress() {

        this.generalInformation.isAddressForBilling = true;
        this.generalInformation.isAddressForShipping = true;
    }
    addRestrictBER() {
        if (this.generalInformation.restrictedDERParts == undefined) {
            this.generalInformation.restrictedDERParts = []
        }
        if (this.restictDERtempList.length > 0) {
            this.disableRestrictedDER = true;
            for (let i = 0; i < this.restictDERtempList.length; i++) {
                if (this.restictDERtempList[i] != undefined) {
                    this.generalInformation.restrictedDERParts = [...this.generalInformation.restrictedDERParts, this.restictDERtempList[i]];
                }
            }
            this.generalInformation.restrictedDERParts = this.generalInformation.restrictedDERParts.slice();
            this.partListForDER = this.generalInformation.restrictedDERParts.reduce((acc, obj) => {
                return acc.filter(x => x.value.itemMasterId !== obj.masterPartId)
            }, this.partListOriginal)
            this.restictDERtempList = [];
        }

    }
    deleteRestirctDER() {
        if (this.selectedRowForDeleteRestrictDER.restrictedPartId > 0) {

            this.customerService.deleteRestrictedPartsById(this.selectedRowForDeleteRestrictDER.restrictedPartId, this.userName).subscribe(res => {
                this.alertService.showMessage(
                    'Success',
                    `Sucessfully Deleted Restricted Part`,
                    MessageSeverity.success
                );
            })
        }
        this.dismissModel()
        this.partListForDER = [{ label: this.selectedRowForDeleteRestrictDER.partNumber, value: this.selectedRowForDeleteRestrictDER }, ...this.partListForDER];
        this.generalInformation.restrictedDERParts.splice(this.selectedRowForDeleteRestrictDER.index, 1);


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


    parentCustomerList(id) {
        console.log(id);
        console.log(this.customerListOriginal);

        this.parentCustomerOriginal = [... this.customerallListOriginal.filter(x => {
            if (x.customerId != id) {
                return x;
            }
        })]
        console.log(this.parentCustomerOriginal);

    }



    // filterParentCustomer(event){

    // }
    filterCustomerCode(event) {
        this.customerCodes = this.customerallListOriginal;
        this.customerCodes = [...this.customerallListOriginal.filter(x => {
            return x.customerCode.toLowerCase().includes(event.query.toLowerCase())
        })]

    }
    filterCustomerParentNames(event) {
        this.parentCustomer = this.parentCustomerOriginal;

        this.parentCustomer = [...this.parentCustomerOriginal.filter(x => {
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
        this.memoPopupValue = value;
    }

    onClickPopupSave() {

        if (this.memoPopupValue == 'PBHCustomer') {
            this.generalInformation.pbhCustomerMemo = this.memoPopupContent;
        }
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





    checkCustomerCodeExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.customerallListOriginal)
        if (exists.length > 0) {

            this.isCustomerCodeAlreadyExists = true;
        } else {
            this.isCustomerCodeAlreadyExists = false;
        }

    }
    
    saveGeneralInformation() {
        this.stopmulticlicks=true;
        if (!this.isEdit) {
          
            this.customerService.newAction({
                ...this.generalInformation,
                country: getValueFromObjectByKey('countries_id', this.generalInformation.country),

                restrictedDERParts: (typeof this.generalInformation.restrictedDERParts === 'undefined') ? null : this.generalInformation.restrictedDERParts.map(x => { return { ...x, partType: 'DER' } }),
                restrictedPMAParts: typeof this.generalInformation.restrictedPMAParts === 'undefined' ? null : this.generalInformation.restrictedPMAParts.map(x => { return { ...x, partType: 'PMA' } }),
                parentId: getValueFromObjectByKey('customerId', this.generalInformation.parentId),
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
                parentId: getValueFromObjectByKey('customerId', this.generalInformation.parentId),
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
        setTimeout(()=>{
            this.stopmulticlicks=false;
        },500)
    }
    checkClassificationExists(field, value) {

        const exists = validateRecordExistsOrNot(field, value, this.allcustomerclassificationInfo, this.selectedClassificationRecordForEdit);
        if (exists.length > 0) {
            this.isClassificationAlreadyExists = true;
        }
        else {
            this.isClassificationAlreadyExists = false;
        }

        // this.isClassificationAlreadyExists = false;

        // for (let i = 0; i < this.allcustomerclassificationInfo.length; i++) {
        //     if (this.addNewclassification.description == this.allcustomerclassificationInfo[i].label || value == this.allcustomerclassificationInfo[i].label) {
        //         this.isClassificationAlreadyExists = true;
        //         // this.disableSave = true;

        //         return;
        //     }

        // }


    }


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





    // // Close Model Popup

    public dismissModel() {
        this.selectedRowForDeleteRestrictPMA = {};
        this.modal.close();
    }

    selectedCustomerType(event) {
        console.log(event)
        if (event == 1 || event == 3) {
            this.generalInformation.customerTypeId = 3;
            this.disableAccountType = true;
        }
        else {
            this.disableAccountType = false;

        }


    }

    onClearParent() {
        this.generalInformation.parentId = undefined;
    }


}