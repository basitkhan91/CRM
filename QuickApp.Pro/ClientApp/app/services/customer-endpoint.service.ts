
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class CustomerEndpoint extends EndpointFactory {

    private readonly _getContactHistroty: string = "/api/Customer/getContactHistroty";
    private readonly _customersUrl: string = "/api/Customer/Get";
    private readonly _customerTypeUrl: string = "/api/Customer/CustomerTypeGet";
    private readonly _aircraftTypeUrl: string = "/api/Customer/aircraftTypeGet";
    private readonly _updateShipAddressDetails: string = "/api/Customer/updateShipAddress";
    private readonly _customersUrlNew: string = "/api/Customer/customers";
    private readonly _updateActiveInactive: string = "/api/Customer/customersUpdateforActive";
    //private readonly _ataUrlNew: string = "/api/Customer/atachapter";
    private readonly _insertToaddAudit: string = "/api/Customer/insertToAuditaddress";
    private readonly _updateToaddressaudit: string = "/api/Customer/updateToAuditaddress";
    private readonly _deleteShipingData: string = "/api/Customer/deleteCustomerShipping";
    private readonly _updatelists: string = "/api/Customer/updatelistStatus";
    private readonly _generalurl: string = "/api/Customer/customergeneralinfo";
    private readonly _addressUrl: string = "/api/Customer/AddressGet";
    private readonly _customerBillAddressUrl = "/api/Customer/customerAddressGet";
    private readonly _cusShippingGeturl = "/api/Customer/cusshippingGet";
    private readonly _cusShippingGeturlwithId = "/api/Vendor/cusshippingGetwithid";

    private readonly __venshipwithid = "/api/Vendor/venshippingGetwithid";
    private readonly _customerBillViaDetails = "/api/Customer/getCustomerBillViaDetails";
    private readonly _getBilladdresshistory = "/api/Customer/getCustomerBillAddressHistory";
    private readonly _billingInfoUrl: string = "/api/Customer/CustomerBillingPost";
    private readonly _updateBillAddressDetails: string = "/api/Customer/customerBillAddressdetails";
    private readonly _updatshippingAddressDetails: string = "/api/Customer/cusShippingUpdate";
    private readonly _updateStatusCustomerShipping: string = "/api/Customer/updateStatusCustomerShipping";
    private readonly _saveBillViaDetails: string = "/api/Customer/addShipViaDetails";
    private readonly _customerShipViaDetails: string = "/api/Customer/getCustomerShipViaDetails";
    private readonly _updateBillingViaDetails: string = "/api/Customer/customerBillAddressdetails";
    private readonly _deleteBillingCusDettilas: string = "/api/Customer/updateStatusCustomerBilling";
    private readonly _customerBillAddressdetails: string = "/api/Customer/customerBillAddressdetails";
    private readonly _customerBillingUrlNew: string = "/api/Customer/updateStatusCustomerBilling";
    private readonly _contacturl: string = "/api/Customer/ContactGet";
    private readonly _getATAchapterUrl: string = "/api/Customer/AtachapterGet";
    private readonly _fianlurl: string = "/api/Customer/fianlEmptyObj";
    private readonly _customerListWithId: string = "/api/Customer/CustomerlistIdGet";
    private readonly _customerRowBySearchId: string = "/api/Customer/CustomerRowByIdGet";
    private readonly _salesListWithId: string = "/api/Customer/Saleslist";
    private readonly _contactGeturl: string = "/api/Vendor/ContactCompleteGet";
    private readonly _deleteContactUrl: string = "/api/Customer/CustomerContact";
    private readonly _CustomerContactUrlNew: string = "/api/Customer/updateStatusCusShippingAddress";
    private readonly _CustomerContctUrl: string = "/api/Customer/CustomerContactPost";
    private readonly _CustomerUpdateContctUrl: string = "/api/Customer/ContactPost";
    private readonly _contactsEmptyObjurl: string = "/api/Customer/contactEmptyObj";
    private readonly _getShipViaHistory: string = "/api/Customer/getShipViaHistory";
    private readonly _shippingInfoUrl: string = "/api/Customer/CustomerShippingPost";
    private readonly _saveShipViaDetails: string = "/api/Customer/addShipViaDetails";
    private readonly _updateShippingViaDetails: string = "/api/Customer/updateShipViaDetails";
    private readonly _CustomerShipAddressdetails: string = "/api/Customer/CustomerShippingAddressDetails";
    private readonly _CustomerShippingUrlNew: string = "/api/Customer/updateStatusCustomerShipping";
    private readonly _customerFinanceUrl: string = "/api/Customer/customerFinancePost";
    private readonly _customerSalesUrl: string = "/api/Customer/customerSalesPost";
    private readonly _CustomerwarningUrl: string = "/api/Customer/saveCustomerWarnings";
    private readonly _CustomerdataUrl: string = "/api/Customer/saveCustomeraircraftdata";
    private readonly _countryUrl: string = "/api/Customer/GetcountryList";
    private readonly _countryUrlNew: string = "api/Customer/postCountryList";
    private readonly _actionsUrl: string = "api/customer/Getdiscount";
    private readonly _discountPutUrl: string = "api/Customer/updatediscount";
    private readonly _newDiscount: string = "api/Customer/insertDiscount";
    private readonly _Customerwarningget: string = "/api/Customer/CustomerWarningsget";
    private readonly _aircraftmodelsPost: string = "/api/Customer/Aircraftpost";
    private readonly _getAircraftUrl: string = "/api/Customer/Aircraftget";
    //private readonly _customersUrlAuditHistory: string = "/api/customer/auditHistoryById";
    private readonly _listUrl: string = "/api/Customer/GetCustomerBynameList";
    private readonly _aircraftmodelsurl: string = "/api/Customer/GetAircarftmodelsdata";
    private readonly _updateActiveInactiveforBilling: string = "/api/Customer/billingUpdateforActive";
    private readonly _updateActiveInactiveforshipping: string = "/api/Customer/shippingUpdateforActive";
    private readonly _getAircraftManufacturerUrl: string = "/api/Customer/aircraftManufacturerGet";
    private readonly _multiintegrationsdataUrl: string = "/api/Customer/savemultiIntegrations";
    private readonly _getIntegrationUrl: string = "/api/Customer/IntegrationGet";
    private readonly _listsUrl: string = "/api/Customer/GetDescriptionbypart";
    private readonly getMarkup: string = "api/customer/getMarkUpValues";
    private readonly addMarkUp: string = "/api/customer/addMarkUp";
    private readonly getAllCustomersURL: string = "/api/customer/getAllCustomers";
    private readonly getAllCustomersInfoURL: string = "/api/customer/getAllCustomersInfo";
    private readonly getCustomer: string = "/api/customer/pagination";
    private readonly getGlobalCustomer: string = "/api/customer/globalSearch";


    private readonly _getAircraftMapped: string = "/api/Customer/getAircraftMapped";
    private readonly _CustomerAircraftPostUrl: string = "/api/Customer/CustomerAircraftPost";
    private readonly _CustomerATAPostUrl: string = "/api/Customer/CustomerATAPost";
    private readonly _getATAMapped: string = "/api/Customer/getATAMapped";

    get globalSearch() { return this.configurations.baseUrl + this.getGlobalCustomer; }
    get paginate() { return this.configurations.baseUrl + this.getCustomer; }
    get customerBillAddressUrl() { return this.configurations.baseUrl + this._customerBillAddressUrl; }
    get cusShippingUrl() { return this.configurations.baseUrl + this._cusShippingGeturl; }
    get cusShippingUrlwithaddressid() { return this.configurations.baseUrl + this._cusShippingGeturlwithId; }
    get venShippingUrlwithaddressid() { return this.configurations.baseUrl + this.__venshipwithid; }
    get customerBillViaDetails() { return this.configurations.baseUrl + this._customerBillViaDetails; }
    get getBilladdresshistory() { return this.configurations.baseUrl + this._getBilladdresshistory; }
    get customerShipViaDetails() { return this.configurations.baseUrl + this._customerShipViaDetails; }
    get getContactHistory() { return this.configurations.baseUrl + this._getContactHistroty; }
    get customersUrl() { return this.configurations.baseUrl + this._customersUrl; }
    get getCustomerTypeUrl() { return this.configurations.baseUrl + this._customerTypeUrl; }
    get getAircraftTypeUrl() { return this.configurations.baseUrl + this._aircraftTypeUrl; }
    get generalurl() { return this.configurations.baseUrl + this._generalurl; }
    get customerListWithId() { return this.configurations.baseUrl + this._customerListWithId; }
    get customerRowById() { return this.configurations.baseUrl + this._customerRowBySearchId; }
    get addressUrl() { return this.configurations.baseUrl + this._addressUrl }
    get customersattributesUrl() { return this.configurations.baseUrl + this._customersUrl; }
    get contctsCompleteUrl() { return this.configurations.baseUrl + this._contactGeturl; }
    get contctsUrl() { return this.configurations.baseUrl + this._contacturl; }
    get contactEmptyurl() { return this.configurations.baseUrl + this._contactsEmptyObjurl }
    get getATAchapterUrl() { return this.configurations.baseUrl + this._getATAchapterUrl }
    get getAircraftUrl() { return this.configurations.baseUrl + this._getAircraftUrl }
    get salesListWithId() { return this.configurations.baseUrl + this._salesListWithId }
    get fianlurl() { return this.configurations.baseUrl + this._fianlurl }
    get getShipViaHistory() { return this.configurations.baseUrl + this._getShipViaHistory; }
    get CustomerWarningsDetails() { return this.configurations.baseUrl + this._Customerwarningget; }
    get countryUrl() { return this.configurations.baseUrl + this._countryUrl; }
    //get actionsUrl() { return this.configurations.baseUrl + this._actionsUrl; } 
    //get discountPutUrl() { return this.configurations.baseUrl + this._discountPutUrl; }
    //get discountPostUrl() { return this.configurations.baseUrl + this._discountPostUrl; }
    get listUrl() { return this.configurations.baseUrl + this._listUrl; }
    get aircraftmodelsurl() { return this.configurations.baseUrl + this._aircraftmodelsurl; }
    get actionsUrl() { return this.configurations.baseUrl + this._actionsUrl; }
    get getAircraftManufacturerUrl() { return this.configurations.baseUrl + this._getAircraftManufacturerUrl; }
    get getIntegrationUrl() { return this.configurations.baseUrl + this._getIntegrationUrl; }
    get listsUrl() { return this.configurations.baseUrl + this._listsUrl; }

    get getCustomerAircrafPosttUrl() { return this.configurations.baseUrl + this._CustomerAircraftPostUrl }
    get getCustomerATAPosttUrl() { return this.configurations.baseUrl + this._CustomerATAPostUrl }
    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    //getcustomerEndpoint<T>(): Observable<T> {

    //    return this.http.get<T>(this.customersUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getcustomerEndpoint());
    //        });
    //}

    postCustomerAircraft<T>(postData) {
        return this.http.post<T>(this.getCustomerAircrafPosttUrl, JSON.stringify(postData), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.postCustomerAircraft(postData));
            });
    }

    getNewitemAircraftEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._CustomerAircraftPostUrl, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewitemAircraftEndpoint(userObject));
            });
    }

    getNewitemATAEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._CustomerATAPostUrl, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewitemATAEndpoint(userObject));
            });
    }

    getcustomerEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.customersUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }

    getcountryListEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.countryUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcountryListEndpoint());
            });
    }

    //Added by Vishnu:
    getCustomerTypes<T>(): Observable<T> {

        return this.http.get<T>(this.getCustomerTypeUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }

    getAirccraftTypes<T>(selectedvalues: any): Observable<T> {

        let url = `${this.getAircraftTypeUrl}/${selectedvalues}`;

        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }

    getATAChapters<T>(): Observable<T> {

        return this.http.get<T>(this.getATAchapterUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }

    getAircraftmodels<T>(): Observable<T> {

        return this.http.get<T>(this.getAircraftUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }

    getFinalrobj<T>(): Observable<T> {
        return this.http.get<T>(this.fianlurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }

    getUpdateFinanceInfo<T>(roleObject: any, customerId: number): Observable<T> {
        let endpointUrl = `${this._customerFinanceUrl}/${customerId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateFinanceInfo(roleObject, customerId));
            });
    }

    getUpdateSalesInfo<T>(roleObject: any, customerId: number): Observable<T> {
        let endpointUrl = `${this._customerSalesUrl}/${customerId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateSalesInfo(roleObject, customerId));
            });
    }


    getGeneralrobj<T>(): Observable<T> {
        return this.http.get<T>(this.generalurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }

    getCustomersDatawithid<T>(customerId: any): Observable<T> {
        let endpointurl = `${this.customerListWithId}/${customerId}`;
        return this.http.get<T>(endpointurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCustomersDatawithid(customerId));
            });
    }

    getCustomerListByid<T>(customerId: any): Observable<T> {
        let endpointurl = `${this.customerRowById}/${customerId}`;
        return this.http.get<T>(endpointurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCustomerListByid(customerId));
            });
    }

    getsalespersonwithid<T>(customerId: any): Observable<T> {
        let endpointurl = `${this.salesListWithId}/${customerId}`;
        return this.http.get<T>(endpointurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCustomersDatawithid(customerId));
            });
    }


    //getHistorycustomerEndpoint<T>(customerId: number): Observable<T> {
    //    let endpointUrl = `${this._customersUrlAuditHistory}/${customerId}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getHistorycustomerEndpoint(customerId));
    //        });
    //}
    getNewCustomerContactInfo<T>(param: any): Observable<any> {
        //debugger;
        delete param.contactId;
        delete param.masterCompanyId;
        let body = JSON.stringify(param);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        return this.http.post(this._CustomerContctUrl, body, this.getRequestHeaders())
            .map((response: Response) => {
                return <any>response;

            }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    //getNewCustomerContactInfo<T>(param: any): Observable<any> {
    //    //debugger;
    //    delete param.contactId;
    //    delete param.masterCompanyId;
    //    let body = JSON.stringify(param);
    //    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
    //    return this.http.post(this._CustomerContctUrl, body, this.getRequestHeaders())
    //        .map((response: Response) => {
    //            return <any>response;

    //        }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    //}

    getNewcustomerEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._customersUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewcustomerEndpoint(userObject));
            });
    }


    getNewcountryEndpoint<T>(userObject: any): Observable<T> {


        return this.http.post<T>(this._countryUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewcountryEndpoint(userObject));
            });
    }

    insertToaddressAudit<T>(userObject: any): Observable<T> {

        debugger;
        return this.http.post<T>(this._insertToaddAudit, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.insertToaddressAudit(userObject));
            });
    }
    AddCustomerContactDetails<T>(param: any): Observable<any> {
        let body = JSON.stringify(param);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        return this.http.post(this._CustomerUpdateContctUrl, body, this.getRequestHeaders())
            .map((response: Response) => {
                return <any>response;

            }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getEditcustomerEndpoint<T>(customerId?: number): Observable<T> {
        let endpointUrl = customerId ? `${this._customersUrlNew}/${customerId}` : this._customersUrlNew;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEditcustomerEndpoint(customerId));
            });
    }

    getUpdatecustomerEndpoint<T>(roleObject: any, customerId: number): Observable<T> {
        let endpointUrl = `${this._customersUrlNew}/${roleObject.customerId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdatecustomerEndpoint(roleObject, customerId));
            });

    }
    getUpdatecustomerEndpointforActive<T>(roleObject: any, customerId: number): Observable<T> {
        let endpointUrl = `${this._updateActiveInactive}/${roleObject.customerId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdatecustomerEndpoint(roleObject, customerId));
            });

    }
    updateAuditaddress<T>(roleObject: any, customerId: number): Observable<T> {
        debugger;
        let endpointUrl = `${this._updateToaddressaudit}/${roleObject.addressId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdatecustomerEndpoint(roleObject, customerId));
            });
    }
    getHistoryCustomerEndpoint<T>(CustomerId: number): Observable<T> {
        let endpointUrl = `${this.getContactHistory}/${CustomerId}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getHistoryCustomerEndpoint(CustomerId));
            });
    }
    getDeletecustomerEndpoint<T>(customerId: number): Observable<T> {
        let endpointUrl = `${this._customersUrlNew}/${customerId}`;

        return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeletecustomerEndpoint(customerId));
            });
    }


    removeById<T>(customerId: number): Observable<T> {
        let endpointUrl = `${this._updatelists}/${customerId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.removeById(customerId));
            });
    }
    getDeleteShippingEndpoint<T>(customerId: number): Observable<T> {
        let endpointUrl = `${this._deleteShipingData}/${customerId}`;

        return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeleteShippingEndpoint(customerId));
            });
    }


    getContcatDetails<T>(CustomerId: any): Observable<T> {
        let endpointUrl = `${this.contctsUrl}/${CustomerId}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }
    getContcatCompleteDetails<T>(): Observable<T> {

        return this.http.get<T>(this.contctsCompleteUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }

    getCustomerBillAddressdetails<T>(customerId: any): Observable<T> {
        let endpointurl = `${this.customerBillAddressUrl}/${customerId}`;
        return this.http.get<T>(endpointurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }
    getCusHippingaddresdetails<T>(customerId: any): Observable<T> {
        let endpointurl = `${this.cusShippingUrl}/${customerId}`;
        return this.http.get<T>(endpointurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }
    getCusHippingaddresdetailswithid<T>(customerId: any): Observable<T> {
        let endpointurl = `${this.cusShippingUrlwithaddressid}/${customerId}`;
        return this.http.get<T>(endpointurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }
    getvenHippingaddresdetailswithid<T>(customerId: any): Observable<T> {
        let endpointurl = `${this.venShippingUrlwithaddressid}/${customerId}`;
        return this.http.get<T>(endpointurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }

    getCustomerBillViaDetails<T>(roleObject: any): Observable<T> {
        let endpointUrl = `${this.customerBillViaDetails}/${roleObject}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCustomerBillViaDetails(roleObject));
            });
    }


    getBillviaHistory<T>(customerId: number): Observable<T> {
        let endpointUrl = `${this.getBillviaHistory}/${customerId}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getBillviaHistory(customerId));
            });
    }

    getAircraftMappingEndpoint<T>(customerId: number): Observable<T> {
        let endpointUrl = `${this._getAircraftMapped}/${customerId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAircraftMappingEndpoint(customerId));
            });
    }

    getATAMappingEndpoint<T>(customerId: number): Observable<T> {
        let endpointUrl = `${this._getATAMapped}/${customerId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getATAMappingEndpoint(customerId));
            });
    }

    getShipaddressHistory<T>(customerId: number): Observable<T> {
        let endpointUrl = `${this.getBilladdresshistory}/${customerId}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getShipaddressHistory(customerId));
            });
    }

    getNewBillinginfo<T>(param: any): Observable<T> {

        let body = JSON.stringify(param);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        //let options = new RequestOptions({ headers: headers });  // create a request option

        // post request to create new book
        return this.http
            .post(this._billingInfoUrl, body, this.getRequestHeaders())
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUpdateContactInfo<T>(roleObject: any, vendorId: number): Observable<T> {
        let endpointUrl = `${this._CustomerContctUrl}/${vendorId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateContactInfo(roleObject, vendorId));
            });
    }

    updateShippinginfo<T>(roleObject: any, customerId: any): Observable<T> {
        let endpointUrl = `${this._updatshippingAddressDetails}/${roleObject.customerShippingAddressId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateShippinginfo(roleObject, customerId));
            });
    }
    updateBillingInfo<T>(roleObject: any, customerId: any): Observable<T> {
        let endpointUrl = `${this._updatshippingAddressDetails}/${roleObject.customerShippingAddressId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateShippinginfo(roleObject, customerId));
            });
    }

    updateStatusShippinginfo<T>(roleObject: any, customerId: any): Observable<T> {
        let endpointUrl = `${this._updateStatusCustomerShipping}/${roleObject.customerShippingAddressId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateShippinginfo(roleObject, customerId));
            });
    }
    getDeleteCustomerEndpoint<T>(roleObject: any): Observable<T> {
        let endpointUrl = `${this._CustomerContactUrlNew}/${roleObject.CustomerShippingAddressId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeleteCustomerEndpoint(roleObject));
            });
    }

    saveBillViaDetails<T>(param: any): Observable<T> {

        let body = JSON.stringify(param);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        //let options = new RequestOptions({ headers: headers });  // create a request option

        // post request to create new book
        return this.http
            .post(this._saveBillViaDetails, body, this.getRequestHeaders())
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getCustomerShipViaDetails<T>(roleObject: any): Observable<T> {
        let endpointUrl = `${this.customerShipViaDetails}/${roleObject.customerShippingAddressId}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCustomerShipViaDetails(roleObject));
            });
    }
    deleteContact<T>(contactId: any): Observable<T> {
        let endpointUrl = `${this._deleteContactUrl}/${contactId}`;
        return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeleteCustomerEndpoint(contactId));
            });
    }

    updateBillingViainfo<T>(roleObject: any, customerId: any): Observable<T> {
        let endpointUrl = `${this._updateBillingViaDetails}/${customerId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateShippinginfo(roleObject, customerId));
            });
    }

    deleteBillingAddress<T>(roleObject: any, customerId: any): Observable<T> {
        let endpointUrl = `${this._deleteBillingCusDettilas}/${customerId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateShippinginfo(roleObject, customerId));
            });
    }


    getNewBillinginfoWithAddressId<T>(param: any, addressId: any): Observable<T> {
        param.vendorShippingAddressId = addressId;
        let body = JSON.stringify(param);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        //let options = new RequestOptions({ headers: headers });  // create a request option

        // post request to create new book
        return this.http
            .post(this._billingInfoUrl, body, this.getRequestHeaders())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }





    getShipviaHistory<T>(CustomerId: number): Observable<T> {
        let endpointUrl = `${this.getShipViaHistory}/${CustomerId}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getShipviaHistory(CustomerId));
            });
    }


    getDeleteCustomerBillingEndpoint<T>(roleObject: any): Observable<T> {
        let endpointUrl = `${this._customerBillingUrlNew}/${roleObject.customerBillingId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeleteCustomerBillingEndpoint(roleObject));
            });
    }
    getNewShipppinginfo<T>(param: any): Observable<T> {

        let body = JSON.stringify(param);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        //let options = new RequestOptions({ headers: headers });  // create a request option

        // post request to create new book
        return this.http
            .post(this._shippingInfoUrl, body, this.getRequestHeaders())
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getAddressDetails<T>(): Observable<T> {
        return this.http.get<T>(this.addressUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCustomerEndpoint());
            });
    }




    getEmptyrobj<T>(): Observable<T> {
        return this.http.get<T>(this.contactEmptyurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCustomerEndpoint());
            });
    }
    getCustomerEndpoint<T>(): Observable<T> {
        return this.http.get<T>(this.customersattributesUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCustomerEndpoint());
            });
    }


    saveShipViaDetails<T>(param: any): Observable<T> {

        let body = JSON.stringify(param);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        //let options = new RequestOptions({ headers: headers });  // create a request option

        // post request to create new book
        return this.http
            .post(this._saveShipViaDetails, body, this.getRequestHeaders())
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    updateShippingViainfo<T>(roleObject: any, CustomerId: any): Observable<T> {
        let endpointUrl = `${this._updateShippingViaDetails}/${CustomerId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateShippinginfo(roleObject, CustomerId));
            });
    }
    updateCustomershippingAddressDetails<T>(param: any, CustomerId: any): Observable<any> {
        param.CustomerId = CustomerId;
        let body = JSON.stringify(param);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        return this.http.post(this._CustomerShipAddressdetails, body, this.getRequestHeaders())
            .map((response: Response) => {
                return <any>response;

            }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getNewShipppinginfoWithAddressId<T>(param: any, addressId: any): Observable<T> {
        param.CustomerShippingAddressId = addressId;
        let body = JSON.stringify(param);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        //let options = new RequestOptions({ headers: headers });  // create a request option

        // post request to create new book
        return this.http
            .post(this._shippingInfoUrl, body, this.getRequestHeaders())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getDeletecustomershippingEndpoint<T>(roleObject: any): Observable<T> {
        let endpointUrl = `${this._CustomerShippingUrlNew}/${roleObject.customerShippingId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeletecustomershippingEndpoint(roleObject));
            });
    }



    updateCustomerBillingAddressDetails<T>(param: any, customerId: any): Observable<any> {
        param.customerId = customerId;
        let body = JSON.stringify(param);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        return this.http.post(this._customerBillAddressdetails, body, this.getRequestHeaders())
            .map((response: Response) => {
                return <any>response;

            }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }



    getAddressDeatails<T>(): Observable<T> {
        return this.http.get<T>(this.addressUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCustomerEndpoint());
            });
    }
    getCustomerwarnigs<T>(CustomerId: any): Observable<T> {
        let endpointurl = `${this.CustomerWarningsDetails}/${CustomerId}`;
        return this.http.get<T>(endpointurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCustomerEndpoint());
            });
    }
    saveCustomerWarningdata<T>(param: any): Observable<any> {
        let body = JSON.stringify(param);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        return this.http.post(this._CustomerwarningUrl, body, this.getRequestHeaders())
            .map((response: Response) => {
                return <any>response;

            }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    updateCustomerWarnings<T>(roleObject: any): Observable<T> {
        let endpointUrl = `${this._CustomerwarningUrl}/${roleObject.customerWarningId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateCustomerWarnings(roleObject));
            });
    }
    //getcustomeraircrafttypeEndpoint<T>(roleObject: any): Observable<T> {
    //    let endpointUrl = `${this._CustomerdataUrl}/${roleObject.aircraftModelId}`;
    //    return this.http.post<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getcustomeraircrafttypeEndpoint(roleObject));
    //        });
    //}

    getcustomeraircrafttypeEndpoint<T>(userObject: any): Observable<T> {


        return this.http.post<T>(this._CustomerdataUrl, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomeraircrafttypeEndpoint(userObject));
            });
    }

    getDiscountEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this._actionsUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDiscountEndpoint());
            });
    }




    getNewDiscount<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._newDiscount, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewDiscount(userObject));
            });
    }


    getupdateDiscount<T>(roleObject: any, discountId: number): Observable<T> {
        let endpointUrl = `${this._discountPutUrl}/${discountId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getupdateDiscount(roleObject, discountId));
            });
    }
    getCustomerByname<T>(name): Observable<T> {
        let url = `${this.listUrl}/${name}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCustomerByname(name));
            });
    }
    saveAircraftinfo<T>(data: any): Observable<T> {
        //debugger;
        return this.http.post<T>(this._aircraftmodelsPost, JSON.stringify(data), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.saveAircraftinfo(data));
            });
    }
    geticustomertemMasterEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.actionsUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }
    getAircraftList<T>(cusId: any): Observable<T> {
        let url = `${this.aircraftmodelsurl}/${cusId}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }
    getUpdateBillingEndpointforActive<T>(roleObject: any, customerBillingAddressId: number): Observable<T> {
        let endpointUrl = `${this._updateActiveInactiveforBilling}/${roleObject.customerBillingAddressId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateBillingEndpoint(roleObject, customerBillingAddressId));
            });

    }

    getUpdateBillingEndpoint<T>(roleObject: any, customerBillingAddressId: number): Observable<T> {
        let endpointUrl = `${this._customerBillAddressdetails}/${roleObject.customerBillingAddressId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdatecustomerEndpoint(roleObject, customerBillingAddressId));
            });

    }
    getUpdateshippingEndpointforActive<T>(roleObject: any, customerShippingAddressId: number): Observable<T> {
        let endpointUrl = `${this._updateActiveInactiveforshipping}/${roleObject.customerShippingAddressId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateshippingEndpoint(roleObject, customerShippingAddressId));
            });

    }
    getUpdateshippingEndpoint<T>(roleObject: any, customerShippingAddressId: number): Observable<T> {
        let endpointUrl = `${this._updateShippingViaDetails}/${roleObject.customerShippingAddressId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdatecustomerEndpoint(roleObject, customerShippingAddressId));
            });

    }

    getAircraftManufacturerEndpoint<T>(cusId: any): Observable<T> {
        let url = `${this.getAircraftManufacturerUrl}/${cusId}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getcustomerEndpoint());
            });
    }

    getMultiIntegrations<T>(userObject: any): Observable<T> {


        return this.http.post<T>(this._multiintegrationsdataUrl, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getMultiIntegrations(userObject));
            });
    }
    getIntegrationEndpoint<T>(customerId: any): Observable<T> {
        let url = `${this.getIntegrationUrl}/${customerId}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getIntegrationEndpoint(customerId));
            });
    }
    getDescriptionbypart<T>(name): Observable<T> {
        let url = `${this.listsUrl}/${name}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDescriptionbypart(name));
            });
    }

    getMarkUpEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.getMarkup, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getMarkUpEndpoint());
            });
    }

    newMarkUp<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this.addMarkUp, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.newMarkUp(userObject));
            });
    }
    updateMarkUp<T>(roleObject: any, markUpPercentageId: number): Observable<T> {
        let endpointUrl = `${this.addMarkUp}/${markUpPercentageId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateMarkUp(roleObject, markUpPercentageId));
            });
    }

    getAllCustomers<T>(): Observable<T> {
        let endPointUrl = this.getAllCustomersURL;
        return this.http.get<T>(endPointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllCustomers());
            });
    }

    getAllCustomerInfo<T>(): Observable<T> {
        let endPointURL = this.getAllCustomersInfoURL;

        return this.http.get<T>(endPointURL, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllCustomerInfo());
            });
    }

    getCustomerRecords<T>(paginationOption: any): Observable<T> {
        let endpointUrl = this.paginate;
        return this.http.post<T>(endpointUrl, JSON.stringify(paginationOption), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCustomerRecords(paginationOption));
            });
    }
    getGlobalCustomerRecords<T>(paginationOption: any): Observable<T> {
        let endpointUrl = this.globalSearch;
        return this.http.post<T>(endpointUrl, JSON.stringify(paginationOption), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCustomerRecords(paginationOption));
            });
    }
}




