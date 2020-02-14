export class CustomerGeneralInformation {

    isAddressForBilling: boolean;
    isAddressForShipping: boolean;
    customerAffiliationId: any;
    customerTypeId: number;
    name: string;
    customerPhone: string;
    customerPhoneExt: string;
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
    isParent: boolean;
    parentId: string;
    customerURL: string;
    generalCurrencyId: number;
    customerClassificationIds: any;
    contractReference: string;
    isPBHCustomer: boolean;
    pbhCustomerMemo: string;
    restrictPMA: boolean;
    restrictedPMAParts: Array<any>;
    restrictedDERParts: Array<any>;
    integrationPortalId: Array<any>;
    // restictPMAIds: any
    // restrictPMAMemo: string;
    restrictBER: boolean;
    // restictBERIds : any;
    // restrictBERMemo: string;
    // scanDocuments: boolean;
    isCustomerAlsoVendor: boolean;
    // edi: boolean;
    // ediDescription: string;
    // isAeroExchange: boolean;
    // aeroExchangeDescription: string;
    createdBy: string;
    updatedBy: string;
    masterCompanyId: number;
    isActive: boolean;
    constructor() {



        this.isAddressForBilling = true;
        this.isAddressForShipping = true;
        this.customerAffiliationId = 2;
        this.customerTypeId = null;
        this.name = '';
        this.customerPhone = '';
        this.customerPhoneExt = '';
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
        this.isParent = false;
        this.parentId = '';
        this.customerURL = '';
        this.generalCurrencyId = null;
        this.customerClassificationIds = [];
        this.contractReference = '';
        this.isPBHCustomer = false;
        this.pbhCustomerMemo = '';
        this.restrictPMA = false;
        // this.restrictsPMAList = []
        // this.restictPMAIds = [];
        // this.restrictPMAMemo = '';
        this.restrictBER = false;
        this.restrictedPMAParts = [];
        this.restrictedDERParts = [];
        this.integrationPortalId = [];
        // this.restictBERIds = [];
        // this.restrictBERMemo = '';
        // this.scanDocuments = false;

        this.isCustomerAlsoVendor = false;
        // this.edi = false;
        // this.ediDescription = '';
        // this.isAeroExchange = false;
        // this.aeroExchangeDescription = '';
        this.createdBy = '';
        this.updatedBy = '';
        this.masterCompanyId = null;
        this.isActive = true;
    }


}