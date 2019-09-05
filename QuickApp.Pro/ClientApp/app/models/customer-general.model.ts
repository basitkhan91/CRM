export class CustomerGeneralInformation {

    isAddressForBilling: boolean;
    isAddressForShipping: boolean;
    customerAffiliationId: number;
    customerTypeId: number;
    name: string;
    customerPhone: string;
    email: string;
    address1: string;
    address2: string;
    address3: string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    country: string;
    customerCode: string;
    doingBuinessAsName: string;
    parent: boolean;
    customerParentName: string;
    customerURL: string;
    generalCurrencyId: number;
    customerClassificationId: number;
    contractReference: string;
    isPBHCustomer: boolean;
    pbhCustomerMemo: string;
    restrictPMA: boolean;
    restrictPMAMemo: string;
    restrictBER: boolean;
    restrictBERMemo: string;
    scanDocuments: boolean;
    isCustomerAlsoVendor: boolean;
    edi: boolean;
    ediDescription: string;
    isAeroExchange: boolean;
    aeroExchangeDescription: string;
    createdBy: string;
    updatedBy: string;
    masterCompanyId: number;
    isActive: boolean;
    constructor() {



        this.isAddressForBilling = false;
        this.isAddressForShipping = false;
        this.customerAffiliationId = 2;
        this.customerTypeId = null;
        this.name = '';
        this.customerPhone = '';
        this.email = '';
        this.address1 = '';
        this.address2 = '';
        this.address3 = '';
        this.city = '';
        this.stateOrProvince = '';
        this.postalCode = '';
        this.country = '';
        this.customerCode = '';
        this.doingBuinessAsName = '';
        this.parent = false;
        this.customerParentName = '';
        this.customerURL = '';
        this.generalCurrencyId = null;
        this.customerClassificationId = null;
        this.contractReference = '';
        this.isPBHCustomer = false;
        this.pbhCustomerMemo = '';
        this.restrictPMA = false;
        this.restrictPMAMemo = '';
        this.restrictBER = false;
        this.restrictBERMemo = '';
        this.scanDocuments = false;
        this.isCustomerAlsoVendor = false;
        this.edi = false;
        this.ediDescription = '';
        this.isAeroExchange = false;
        this.aeroExchangeDescription = '';
        this.createdBy = '';
        this.updatedBy = '';
        this.masterCompanyId = null;
        this.isActive = false;
    }


}