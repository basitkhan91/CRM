

import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { Action } from '../models/action.model';
import { AuditHistory } from '../models/audithistory.model';
import { CustomerEndpoint } from './customer-endpoint.service';
import { Customer } from '../models/customer.model';
import { DiscountValue } from '../models/discountvalue';
import { MarkUpPercentage } from '../models/markUpPercentage.model';

export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };

@Injectable()
export class CustomerService {
    generalcustomer: boolean = false;
    contacts: boolean = false;
    financial: boolean = false;
    billing: boolean = false;
    shipping: boolean = false;
    sales: boolean = false;
    warnings: boolean = false;
    readonly = true;
    read = true;
    enableExternal: boolean = false;
    customerobject: any[];
    financeCollection: any;
    paymentCollection: any;
    salesCollection: any;
    shippingCollection: any;
    isEditMode: boolean = false;
    listCollection: any;
    generalCollection: any;
    auditServiceCollection: any = {};
    ShowPtab: boolean = true;
    contactCollection: any;
    customergeneralcollection: any;
    public static readonly roleAddedOperation: RolesChangedOperation = "add";
    public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
    public static readonly roleModifiedOperation: RolesChangedOperation = "modify";
    public isGeneralInfo: boolean = false;
    public isContact: boolean = false;
    public isFinanicialInfo: boolean = false;
    public isBillingInfo: boolean = false;
    public isShippingInfo: boolean = false;
    public isPerson: boolean = false;
    public isInternationalShipping: boolean = false;
    private _rolesChanged = new Subject<RolesChangedEventArg>();
    public isCOntact: boolean = false;
    public navigationObj = new Subject<any>();
    public billingCollection: any;
    public currentUrl = this.router.url;
    navigationObjChangeObject$ = this.navigationObj.asObservable();
    public bredcrumbObj = new Subject<any>();
    public bredcrumbObjChangeObject$ = this.bredcrumbObj.asObservable();
    //for steps
    public alertObj = new Subject<any>();
    public alertChangeObject$ = this.alertObj.asObservable();
    //steps end
    public indexObj = new Subject<any>();
    public indexObjChangeObject$ = this.indexObj.asObservable();
    public isCustomerAlsoVendor: boolean = false;
    customergeneralCollection: any;
    localCollectiontoVendor: any;
    name: any;
    sourceCustomer: any;
    isVendorAlsoCustomer: boolean = false;

    // sourceCustomer: any;

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private customerEndpoint: CustomerEndpoint) { }

    //getWorkFlows() {
    //    return Observable.forkJoin(
    //        this.customerEndpoint.getcustomerEndpoint<any[]>());
    //}

    getWorkFlows() {
        return Observable.forkJoin(
            this.customerEndpoint.getcustomerEndpoint<any[]>());
    }

    getCustomers() {
        return Observable.forkJoin(
            this.customerEndpoint.getcustomerEndpoint<any[]>());
    }
    getallCustomers() {
        return Observable.forkJoin(
            this.customerEndpoint.getAllcustomerEndpoint<any[]>());
    }

    getCountrylist() {
        return Observable.forkJoin(
            this.customerEndpoint.getcountryListEndpoint<any[]>());
    }

    //Added by Vishnu:
    getCustomerTypes() {
        return Observable.forkJoin(
            this.customerEndpoint.getCustomerTypes<any[]>());
    }

    getAircraftTypes(selectedvalues) {

        return Observable.forkJoin(
            this.customerEndpoint.getAirccraftTypes<any>(selectedvalues));
    }

    getATAchapter() {
        return Observable.forkJoin(
            this.customerEndpoint.getATAChapters<any[]>());
    }

    getAircraft() {
        return Observable.forkJoin(
            this.customerEndpoint.getAircraftmodels<any[]>());
    }

    getMappedAirCraftDetails(customerId: number) {
        return this.customerEndpoint.getAircraftMappingEndpoint<any>(customerId);
    }

    getATAMappedByCustomerId(customerId: number) {
        return this.customerEndpoint.getATAMappingByCustomerId<any>(customerId)
    }


    getATAMappedByContactId(contactId: number) {
        return this.customerEndpoint.getATAMappingByContactId<any>(contactId);
    }


    getMappedTaxTypeRateDetails(customerId: number) {
        return this.customerEndpoint.getTaxTypeRateMappingEndpoint<any>(customerId);
    }

    deleteATAMappedByContactId(contactId) {
        return this.customerEndpoint.deleteATAMappedByContactId(contactId);
    }


    getFinalObj() {
        return Observable.forkJoin(
            this.customerEndpoint.getFinalrobj<any>());
    }

    updatefinanceinfo(customercntct: any, customerId: any) {
        return this.customerEndpoint.getUpdateFinanceInfo(customercntct, customerId);
    }

    updatesalesinfo(customercntct: any, customerId: any) {
        return this.customerEndpoint.getUpdateSalesInfo(customercntct, customerId);
    }


    getGeneralObj() {
        return Observable.forkJoin(
            this.customerEndpoint.getGeneralrobj<any>());
    }

    getCustomerdata(customerId: any) {
        return Observable.forkJoin(
            this.customerEndpoint.getCustomersDatawithid<any>(customerId));
    }

    getCustomerdataById(customerId: any) {

        return this.customerEndpoint.getCustomerListByid<any>(customerId);
    }

    getSalespersondata(customerId: any) {
        return Observable.forkJoin(
            this.customerEndpoint.getsalespersonwithid<any>(customerId));
    }

    //historyAcion(actionId: number) {
    //    return Observable.forkJoin(this.customerEndpoint.getHistorycustomerEndpoint<AuditHistory[]>(actionId));
    //}

    newAction(action: any) {
        return this.customerEndpoint.getNewcustomerEndpoint<any>(action);
    }

    newCountry(action: any) {
        return this.customerEndpoint.getNewcountryEndpoint<any>(action);
    }

    //ATAChapterAction(action: any) {
    //    return this.customerEndpoint.getNewATACHapterEndpoint<any>(action);
    //}

    insertToAuditAddress(action: any) {
        return this.customerEndpoint.insertToaddressAudit<any>(action);
    }

    getAction(actionId?: number) {
        return this.customerEndpoint.getEditcustomerEndpoint<any>(actionId);
    }
    getEmptyObj() {
        return Observable.forkJoin(
            this.customerEndpoint.getEmptyrobj<any>());
    } getAddressDetails() {
        return Observable.forkJoin(
            this.customerEndpoint.getAddressDetails<any[]>());
    }

    shipaddressHistory(actionId: number) {
        return Observable.forkJoin(this.customerEndpoint.getShipaddressHistory<AuditHistory[]>(actionId));
    }
    shipviaHistory(actionId: number) {
        return Observable.forkJoin(this.customerEndpoint.getShipviaHistory<AuditHistory[]>(actionId));
    }
    newShippingAdd(action: any) {

        return this.customerEndpoint.getNewShipppinginfo<any>(action);
    }
    updateshippinginfo(Customershipping: any) {
        return this.customerEndpoint.updateShippinginfo(Customershipping, Customershipping.CustomerShippingAddressId);
    }
    updateStatusHipping(Customershipping: any) {
        return this.customerEndpoint.updateStatusShippinginfo(Customershipping, Customershipping.CustomerShippingAddressId);
    }
    updateAction(action: any) {
        return this.customerEndpoint.getUpdatecustomerEndpoint<any>(action, action.customerId);
    }

    getCustomerAll(data) {
        return this.customerEndpoint.getCustomerAll(data);
    }

    updateActionforActive(action, login) {
        return this.customerEndpoint.getUpdatecustomerEndpointforActive(action, login);
    }

    updTeAuditAddress(action: any) {
        return this.customerEndpoint.updateAuditaddress(action, action.addressId);
    }
    updateCustomershippingAddressdetails(Customercntct: any, CustomerId: any) {
        return this.customerEndpoint.updateCustomershippingAddressDetails<any>(Customercntct, CustomerId);
    }

    newShippingAddWithAddress(action: any, shippingAddressId: any) {

        return this.customerEndpoint.getNewShipppinginfoWithAddressId<any>(action, shippingAddressId);
    }
    deleteAcion(actionId: number) {

        return this.customerEndpoint.getDeletecustomerEndpoint(actionId);

    }
    updateListstatus(customerId: number) {

        return this.customerEndpoint.removeById(customerId);

    }
    updateshippingViainfo(Customershipping: any) {
        return this.customerEndpoint.updateShippingViainfo(Customershipping, Customershipping.customerShippingId);
    }
    deleteCustomer(CustomerId: number) {

        return this.customerEndpoint.getDeletecustomerEndpoint(CustomerId);

    }
    deleteContact(CustomerId: any, updatedBy: string) {

        return this.customerEndpoint.deleteContact(CustomerId, updatedBy);
    }

    getCustomerShipAddressGet(customerId: any) {
        return Observable.forkJoin(
            this.customerEndpoint.getCusHippingaddresdetails<any[]>(customerId));
    }
    getCustomerShipAddressGetWIthAddressId(customerId: any) {
        return Observable.forkJoin(
            this.customerEndpoint.getCusHippingaddresdetailswithid<any>(customerId));
    }
    getvendorShipAddressGetWIthAddressId(customerId: any) {
        return Observable.forkJoin(
            this.customerEndpoint.getvenHippingaddresdetailswithid<any>(customerId));
    }



    BillviaHistory(actionId: number) {
        return Observable.forkJoin(this.customerEndpoint.getBillviaHistory<AuditHistory[]>(actionId));
    }

    billaddressHistory(actionId: number) {
        return Observable.forkJoin(this.customerEndpoint.getShipaddressHistory<AuditHistory[]>(actionId));
    }
    newAddCustomerContact(Customer: any) {
        return this.customerEndpoint.AddCustomerContactDetails<any>(Customer);
    }
    newBillingAdd(action: any) {
        return this.customerEndpoint.getNewBillinginfo<any>(action);
    }

    newAddContactInfo(Customercontact: any) {
        return this.customerEndpoint.getNewCustomerContactInfo<any>(Customercontact);
    }
    updateBillinginfo(customerBilling: any) {
        return this.customerEndpoint.updateBillingViainfo(customerBilling, customerBilling.customerBillingAddressId);
    }
    updateDeleteBillinginfo(customerBilling: any) {
        return this.customerEndpoint.deleteBillingAddress(customerBilling, customerBilling.customerBillingAddressId);
    }


    newShippingViaAdd(action: any) {

        return this.customerEndpoint.postDomesticShipVia<any>(action);
    }
    getCustomerShipViaDetails(rowData) {
        return Observable.forkJoin(
            this.customerEndpoint.getCustomerShipViaDetails(rowData));
    }
    updateContactinfo(CustomerContact: any) {
        return this.customerEndpoint.getUpdateContactInfo(CustomerContact, CustomerContact.contactId);
    }

    updatebillingViainfo(customerBilling: any) {
        return this.customerEndpoint.updateBillingViainfo(customerBilling, customerBilling.customerBillingId);
    }
    getContacts(CustomerId: any) {
        return Observable.forkJoin(
            this.customerEndpoint.getContcatDetails<any>(CustomerId));
    }

    getGlobalSearch(value, pageIndex, pageSize) {

        return this.customerEndpoint.getGlobalCustomerRecords<any>(value, pageIndex, pageSize);
    }

    updateCustomerBillingAddressDetails(customercntct: any, customerId: any) {
        debugger
        return this.customerEndpoint.updateCustomerBillingAddressDetails<any>(customercntct, customerId);
    }
    newBillingAddWithAddress(action: any, billingAddressId: any) {

        return this.customerEndpoint.getNewBillinginfoWithAddressId<any>(action, billingAddressId);
    }
    deleteCustomerAcion(actionId: any) {

        return this.customerEndpoint.getDeleteCustomerBillingEndpoint(actionId);

    }
    getContactsFirstName() {
        return Observable.forkJoin(
            this.customerEndpoint.getContcatCompleteDetails<any>());
    }
    getCustomerBillViaDetails(rowData) {
        return Observable.forkJoin(
            this.customerEndpoint.getCustomerBillViaDetails(rowData));
    }
    historyAcion(actionId: number) {
        return Observable.forkJoin(this.customerEndpoint.getHistoryCustomerEndpoint<AuditHistory[]>(actionId));


    }
    getAddressDtails() {
        return Observable.forkJoin(
            this.customerEndpoint.getAddressDeatails<any[]>());
    }
    getCustomerWarnings(CustomerId: any) {
        return Observable.forkJoin(
            this.customerEndpoint.getCustomerwarnigs<any[]>(CustomerId));
    }
    saveCustomerwarnings(action: any) {

        return this.customerEndpoint.saveCustomerWarningdata<any>(action);
    }
    updateCustomerWarnings(action: any, customerWarningId) {
        return this.customerEndpoint.updateCustomerWarnings(action, customerWarningId);
    }
    Addcustomeraircrafttype(action: any) {
        return this.customerEndpoint.getcustomeraircrafttypeEndpoint<any>(action);
    }


    getDiscountList() {
        return Observable.forkJoin(
            this.customerEndpoint.getDiscountEndpoint<DiscountValue[]>());
    }


    newAddDiscount(action) {
        return this.customerEndpoint.getNewDiscount<DiscountValue>(action);
    }

    updatediscount(action: DiscountValue) {
        return this.customerEndpoint.getupdateDiscount(action, action.discountId);
    }
    getcustomerByNameList(name) {
        return Observable.forkJoin(
            this.customerEndpoint.getCustomerByname<any[]>(name));
    }
    saveAircraftinfo(data) {
        return this.customerEndpoint.saveAircraftinfo<any>(data);
    }
    getAircaftList(cusId: any) {
        return Observable.forkJoin(
            this.customerEndpoint.getAircraftList<any[]>(cusId));
    }
    updateActionforActiveforBilling(customerBilling: any) {
        return this.customerEndpoint.getUpdateBillingEndpointforActive(customerBilling, customerBilling.customerBillingAddressId);
    }

    updateActionforActiveforShiping(Customershipping: any) {
        return this.customerEndpoint.getUpdateshippingEndpointforActive(Customershipping, Customershipping.customerShippingAddressId);
    }
    getAircraftManufacturer(cusId: any) {
        return this.customerEndpoint.getAircraftManufacturerEndpoint<any[]>(cusId);
    }
    Addmultiintegrations(action: any) {
        return this.customerEndpoint.getMultiIntegrations<any>(action);
    }
    getintegrationtypes(customerId: any) {
        return this.customerEndpoint.getIntegrationEndpoint<any[]>(customerId);
    }
    getDescriptionbypart(name) {
        return Observable.forkJoin(
            this.customerEndpoint.getDescriptionbypart<any[]>(name));
    }

    getMarkUpList() {
        return Observable.forkJoin(
            this.customerEndpoint.getMarkUpEndpoint<MarkUpPercentage[]>());
    }

    newMarkUp(markUp: any) {
        return this.customerEndpoint.newMarkUp<any>(markUp);
    }
    updateMarkUp(markUp: any) {
        return this.customerEndpoint.updateMarkUp(markUp, markUp.markUpPercentageId);
    }

    getAllCustomers() {
        return this.customerEndpoint.getAllCustomers();
    }

    getAllCustomersInfo() {
        return this.customerEndpoint.getAllCustomerInfo<Customer[]>();
    }

    getServerPages(serverSidePagesData: any) {
        return Observable.forkJoin(
            this.customerEndpoint.getCustomerRecords<Customer[]>(serverSidePagesData));
    }


    postCustomerAircrafts(data) {
        return Observable.forkJoin(this.customerEndpoint.postCustomerAircraft<any>(data));
    }
    postCustomerATAs(data) {
        return this.customerEndpoint.postCustomerATA(data);
    }
    postCustomerTaxTypeRate(data) {
        return Observable.forkJoin(this.customerEndpoint.postCustomerTaxTypeRate<any>(data));
    }
    updateCustomerTaxTypeRate(data) {
        return this.customerEndpoint.updateCustomerTaxTypeRate(data);
    }
    getAuditHistoryForTaxType(customerTaxTypeRateMappingId) {
        return this.customerEndpoint.getAuditHistoryForTaxType(customerTaxTypeRateMappingId);
    }
    newItemMasterAircarftClass(action: any) {
        return this.customerEndpoint.getNewitemAircraftEndpoint<any>(action);
    }
    newItemMasterATAClass(action: any) {
        return this.customerEndpoint.getNewitemATAEndpoint<any>(action);
    }

    postInternationalShippingPost(data) {
        return this.customerEndpoint.postInternationalShippingPost(data);
    }
    getInternationalShippingByCustomerId(customerId) {
        return this.customerEndpoint.getInternationalShippingByCustomerId(customerId);
    }
    updateStatusForInternationalShippings(id, status, updatedBy) {
        return this.customerEndpoint.updateStatusForInternationalShipping(id, status, updatedBy)
    }
    updateStatusForInternationalShippingsVia(id, status, updatedBy) {
        return this.customerEndpoint.updateStatusForInternationalShippingVia(id, status, updatedBy)
    }


    deleteInternationalShipping(id, updatedBy) {
        return this.customerEndpoint.deleteInternationalShipping(id, updatedBy)
    }
    getInternationalShippingById(id) {
        return this.customerEndpoint.getInternationalShippingById(id);
    }
    updateInternationalShipping(data) {
        return this.customerEndpoint.updateInternationalShipping(data);
    }
    postInternationalShipVia(data) {
        return this.customerEndpoint.postInternationalShipVia(data);
    }

    getShipViaByInternationalShippingId(id, pageIndex, pageSize) {
        return this.customerEndpoint.getShipViaByInternationalShippingId(id, pageIndex, pageSize);
    }

    updateShipViaInternational(data) {
        return this.customerEndpoint.updateShipViaInternational(data);
    }
    searchAirMappedByMultiTypeIDModelIDDashIDByCustomerId(customerId, searchUrl) {
        return this.customerEndpoint.searchAirMappedByMultiTypeIDModelIDDashIDByCustomerId<any>(customerId, searchUrl);
    }
    searchATAMappedByMultiATAIDATASUBIDByCustomerId(customerId, searchUrl) {
        return this.customerEndpoint.searchATAMappedByMultiATAIDATASUBIDByCustomerId<any>(customerId, searchUrl);
    }

    // deleteATAMappings(id) {
    //     return this.customerEndpoint.deleteATAMappedDataById(id);
    // }
    deleteAircraftInvetoryById(id) {
        return this.customerEndpoint.deleteAircraftInvetoryById(id);
    }
    deleteCustomerTaxTypeRateById(id) {
        return this.customerEndpoint.deleteTaxTypeRateMappedDataById(id);
    }
    documentUploadAction(action: any) {
        return this.customerEndpoint.getDocumentUploadEndpoint<any>(action);
    }

    deleteDocumentAction(actionId: any) {
        return this.customerEndpoint.getDeleteDocumentEndpoint(actionId);
    }

    getCustomerContactAuditDetails(customerContactId, customerId) {
        return this.customerEndpoint.getCustomerContactAuditDetails<any>(customerContactId, customerId)
    }
    getDocumentList(customerId) {
        return this.customerEndpoint.getDocumentList(customerId)
    }

    getCustomerWarningsById(customerId) {
        return this.customerEndpoint.getCustomerWarningsById(customerId);
    }
    getShipViaByDomesticShippingId(customerShippingId) {
        return this.customerEndpoint.getShipViaByDomesticShippingId(customerShippingId);
    }
    getCustomerBillingHistory(customerId, customerBillingAddressId) {
        return this.customerEndpoint.getCustomerBillingHistory(customerId, customerBillingAddressId)
    }

    getCustomerClassificationMapping(customerId) {
        return this.customerEndpoint.getCustomerClassificationMapping(customerId);
    }
    deleteInternationalShipViaId(id, updatedBy) {
        return this.customerEndpoint.deleteInternationalShipViaId(id, updatedBy)
    }
    deleteShipViaDetails(id, updatedBy) {
        return this.customerEndpoint.deleteShipViaDetails(id, updatedBy)
    }
    deleteRestrictedPartsById(id, updatedBy) {
        return this.customerEndpoint.deleteRestrictedPartsById(id, updatedBy)
    }
    updateStatusForShippingDetails(id, status, updatedBy) {
        return this.customerEndpoint.updateStatusForShippingDetails(id, status, updatedBy)
    }
    Shippingdetailsviastatus(id, status, updatedBy) {
        return this.customerEndpoint.Shippingdetailsviastatus(id, status, updatedBy)
    }

    CustomersBillingUpdateforActive(id, status, updatedBy) {
        return this.customerEndpoint.CustomersBillingUpdateforActive(id, status, updatedBy)
    }
    toGetUploadDocumentsList(attachmentId, customerId, moduleId) {
        return this.customerEndpoint.GetUploadDocumentsList(attachmentId, customerId, moduleId);
    }
    getDeleteDocumentListbyId(customerDocumentId) {
        return this.customerEndpoint.getdeleteDocumentListbyId(customerDocumentId)
    }
    UpdateCustomerDocument(action: any) {
        return this.customerEndpoint.UpdateDocumentUpload<any>(action);
    }
    customerFinanceFileUpload(action: any) {

        return this.customerEndpoint.customerFinanceFileUploadEndpoint<any>(action);
    }
    GetCustomerFinanceDocumentsList(customerId, moduleId) {
        return this.customerEndpoint.GetCustomerFinanceDocumentsListEndpoint(customerId, moduleId);
    }
    GetCustomerAttachmentDelete(attachmentDetailId, updatedBy) {
        return this.customerEndpoint.GetCustomerAttachmentDeleteEndpoint(attachmentDetailId, updatedBy);
    }
    getContactsByCustomerId(customerId) {
        return this.customerEndpoint.getContactsByCustomerId(customerId);
    }
    updatecustomeraircraft(customercntct: any, customerAircraftId: any) {
        return this.customerEndpoint.getUpdateAircraft(customercntct, customerAircraftId);
    }

    getCustomerHistory(customerId) {
        return this.customerEndpoint.getCustomerHistory(customerId)
    }
    getMappedAirCraftDetailsAudit(customerAircraftMappingId: number) {
        return this.customerEndpoint.getAircraftMappingEndpointAudit<any>(customerAircraftMappingId);
    }

    getCustomerShippingHistory(customerId, customerShippingAddressId) {
        return this.customerEndpoint.getCustomerShippingHistory(customerId, customerShippingAddressId)
    }
    getCustomerInterShippingHistory(customerId, customerInterShippingId) {
        return this.customerEndpoint.getCustomerInterShippingHistory(customerId, customerInterShippingId)
    }

    getCustomerShipViaHistory(customerId, customerShippingAddressId, customerShippingId) {
        return this.customerEndpoint.getCustomerShipViaHistory(customerId, customerShippingAddressId, customerShippingId)
    }
    getCustomerInterShipViaHistory(customerId, internationalShippingId, shippingViaDetailsId) {
        return this.customerEndpoint.getCustomerInterShipViaHistory(customerId, internationalShippingId, shippingViaDetailsId)
    }
    getCustomerDocumentHistory(id, customerId) {
        return this.customerEndpoint.getCustomerDocumentAuditHistory(id, customerId)
    }

    BillingFileUpload(file, customerId) {
        return this.customerEndpoint.CustomerBillingFileUpload(file, customerId);
    }
    ShippingFileUpload(file, customerId) {
        return this.customerEndpoint.CustomerShippingFileUpload(file, customerId);
    }
    InternationalShippingUpload(file, customerId) {
        return this.customerEndpoint.CustomerInternationalShippingFileUpload(file, customerId);
    }
    ContactUpload(file, customerId) {
        return this.customerEndpoint.CustomerContactFileUpload(file, customerId);
    }

    getInternationalShipViaByInternationalShippingId(id) {
        return this.customerEndpoint.getInternationalShipViaByInternationalShippingId(id);
    }
    getCustomerContactATAAuditDetails(id) {
        return this.customerEndpoint.getCustomerContactATAAuditDetails<any>(id)
    }
    updateCustomerContactATAMApped(data) {
        return this.customerEndpoint.updateCustomerContactATAMApped(data);
    }
}
