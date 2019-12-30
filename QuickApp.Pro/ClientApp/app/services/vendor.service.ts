﻿// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

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
import { AuditHistory } from '../models/audithistory.model';
import { VendorEndpointService } from './vendor-endpoint.service';
import { Vendor } from '../models/vendor.model';
import { DiscountValue } from '../models/discountvalue';
import { ATASubChapter } from '../models/atasubchapter.model';
import { BehaviorSubject } from 'rxjs';
import { VendorProcess1099 } from '../models/vendorprocess1099.model';


export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };



@Injectable()
export class VendorService {

    enableExternal: boolean = false;
    shippingCollection: any;
    billingCollection: any;
    purchasepartcollection: any[] = [];
    repairecollection: any;
    isEditMode: boolean = false;
    isReset: boolean = false;
    paymentCollection: any;
    listCollection: any;
    generalCollection: any;
    contactCollection: any;
    vendorForPoCollection: any;
    financeCollection: any;
    ShowPtab: boolean = true;
    receiveSaveddata: any[] = [];
    private stepDataSubject = new BehaviorSubject('');
    public stepData$ = this.stepDataSubject.asObservable();
    public static readonly roleAddedOperation: RolesChangedOperation = "add";
    public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
    public static readonly roleModifiedOperation: RolesChangedOperation = "modify";
    public alertObj = new Subject<any>();
    public alertChangeObject$ = this.alertObj.asObservable();
    public contactobj = new Subject<any>();
    public contactobjChangeObject$ = this.contactobj.asObservable();
    public indexObj = new Subject<any>();
    public indexObjChangeObject$ = this.indexObj.asObservable();
    public bredcrumbObj = new Subject<any>();
    public bredcrumbObjChangeObject$ = this.bredcrumbObj.asObservable();
    public isCOntact: boolean = false;
    private _rolesChanged = new Subject<RolesChangedEventArg>();
    //	public generalCollection: any;
    public mySubject = new Subject();
    public vendorObser$ = this.mySubject.asObservable();
    public currentUrl = this.router.url;
    public isVendorAlsoCustomer: boolean = false;
    vendorgeneralcollection: any;
    localcollection: any;
    localCollectiontoCustomer: any;
    localCollectiontoVendor: any;
    selectedPoCollection: any;
    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private actionEndpoint: VendorEndpointService) { let currentUrl = this.router.url; }

    //pass(data) {
    //	this.mySubject.next(data);
    //}

    changeStep(stepVal) {
        this.stepDataSubject.next(stepVal);
    }
    getWorkFlows() {
        return Observable.forkJoin(
            this.actionEndpoint.getvendorEndpoint<any[]>());
    }

    getVendorCapabilityList(status) {
        return Observable.forkJoin(
            this.actionEndpoint.getvendorCapabilityListEndpoint<any[]>(status));
    }


    getcapabilityListData() {
        return Observable.forkJoin(
            this.actionEndpoint.getCapabilityTypeListEndpoint<any[]>());
    }


    getManagementSiteDataByCompanyId(companyId) {
        return Observable.forkJoin(
            this.actionEndpoint.getManagementSiteDataByCompanyIdEdpoint<any[]>(companyId));
    }
    getpurchasevendorlist(vendorId) {
        return Observable.forkJoin(
            this.actionEndpoint.getpurchasevendorlist<any[]>(vendorId));
    }

    getrepairevendorlist(vendorId) {
        return Observable.forkJoin(
            this.actionEndpoint.getrepairevendorlist<any[]>(vendorId));
    }
    getPartDetails() {
        return Observable.forkJoin(
            this.actionEndpoint.getCompletePartDetails<any[]>());
    }
    getPartDetailsWithid(partId) {
        return Observable.forkJoin(
            this.actionEndpoint.getPartDetailsWithid<any>(partId));
    }
    getPartDetailsWithidForSinglePart(partId) {

        return this.actionEndpoint.getPartDetailsWithidForSinglePart<any>(partId);
    }


    getCapabilibylist() {
        return Observable.forkJoin(
            this.actionEndpoint.getCapabilityEndpoint<any[]>());
    }

    getVendordataForPo(details: any) {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorPoDetails<any>(details));
    }

    getDomesticvedor(vendorId: any) {
        return Observable.forkJoin(
            this.actionEndpoint.getDomesticWire<any>(vendorId));
    }
    getInternationalWire(vendorId: any) {
        return Observable.forkJoin(
            this.actionEndpoint.getInternational<any>(vendorId));
    }
    getDefaultlist(vendorId: any) {
        return Observable.forkJoin(
            this.actionEndpoint.getDefault<any>(vendorId));
    }

    getVendorsBasic() {
        return Observable.forkJoin(
            this.actionEndpoint.getvendorBasicEndpoint<any[]>());
    }
    getVendorshipViaDetails() {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorShipvia<any[]>());
    }

    getVendorShipAddressGet(vendorId: any) {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorShipAddressdetails<any[]>(vendorId));
    }
    getVendorBillAddressGet(vendorId: any) {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorBillAddressdetails<any[]>(vendorId));
    }
    getSiteAddresses() {
        return Observable.forkJoin(
            this.actionEndpoint.getSiteAddresses<any[]>());
    }
    getVendorWarnings(vendorId: any) {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorwarnigs<any>(vendorId));
    }
    getVendorShipViaDetails(rowData) {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorShipViaDetails(rowData));
    }
    getVendorBillViaDetails(rowData) {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorBillViaDetails(rowData));
    }
    getVendorList() {
        return Observable.forkJoin(
            this.actionEndpoint.getvendorList<any[]>());
    }
    getVendorListForVendor(isActive) {
        return Observable.forkJoin(
            this.actionEndpoint.getvendorListForVendor<any[]>(isActive));
    }
    getVendors() {
        return Observable.forkJoin(
            this.actionEndpoint.getvendorList<Vendor[]>());
    }
    getVendordata(vendorid: any) {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorsDatawithid<any>(vendorid));
    }


    getContacts(vendorId: any) {
        return Observable.forkJoin(
            this.actionEndpoint.getContcatDetails<any>(vendorId));
    }
    getContactsFirstName() {
        return Observable.forkJoin(
            this.actionEndpoint.getContcatCompleteDetails<any>());
    }

    getCheckPaymentobj(vendorId: any) {
        return Observable.forkJoin(
            this.actionEndpoint.getCheckPaymnetDetails<any>(vendorId));
    }
    getBeneficiaryCustomer() {
        return Observable.forkJoin(
            this.actionEndpoint.getBeneficiaryCustomerDetails<any>());
    }
    getEmptyObj() {
        return Observable.forkJoin(
            this.actionEndpoint.getEmptyrobj<any>());
    }

    getFinalObj() {
        return Observable.forkJoin(
            this.actionEndpoint.getFinalrobj<any>());
    }

    getGeneralObj() {
        return Observable.forkJoin(
            this.actionEndpoint.getGeneralrobj<any>());
    }

    getPaymentObj() {
        return Observable.forkJoin(
            this.actionEndpoint.getPaymentrobj<any>());
    }
    getAddressDtails() {
        return Observable.forkJoin(
            this.actionEndpoint.getAddressDeatails<any[]>());
    }

    historyAcion(actionId: number) {
        return Observable.forkJoin(this.actionEndpoint.getHistoryvendorEndpoint<AuditHistory[]>(actionId));
    }
    paymentHist(actionId: number) {
        return Observable.forkJoin(this.actionEndpoint.getCheckPaymentHist<AuditHistory[]>(actionId));
    }
    vendorHistory(actionId: number) {
        return Observable.forkJoin(this.actionEndpoint.getVendndorhistory<any>(actionId));
    }
    historyofcheck(actionId: number) {
        return Observable.forkJoin(this.actionEndpoint.gethistoryOfcheckpayment<AuditHistory[]>(actionId));
    }
    shipviaHistory(actionId: number) {
        return Observable.forkJoin(this.actionEndpoint.getShipviaHistory<AuditHistory[]>(actionId));
    }
    billviaHistory(actionId: number) {
        return Observable.forkJoin(this.actionEndpoint.getBillviaHistory<AuditHistory[]>(actionId));
    }
    shipaddressHistory(actionId: number) {
        return Observable.forkJoin(this.actionEndpoint.getShipaddressHistory<AuditHistory[]>(actionId));
    }
    billaddressHistory(actionId: number) {
        return Observable.forkJoin(this.actionEndpoint.getBilladdressHistory<AuditHistory[]>(actionId));
    }

    newAction(action: any) {

        return this.actionEndpoint.getNewVendorEndpoint<any>(action);
    }
    saveVendorwarnings(action: any) {

        return this.actionEndpoint.saveVendorWarningdata<any>(action);
    }
    savePurchaseorder(action: any) {

        return this.actionEndpoint.savePurchaseorderdetails<any>(action);
    }
    saveRepairorder(action: any) {

        return this.actionEndpoint.savesaveRepairorderorderdetails<any>(action);
    }
    savePurchaseorderpart(action: any) {

        return this.actionEndpoint.savePurchaseorderdetailspart<any>(action);
    }

    saveRepaireorderpart(action: any) {

        return this.actionEndpoint.saveRepaireorderpartrdetailspart<any>(action);
    }
    getAction(actionId?: number) {
        return this.actionEndpoint.getEditvendorEndpoint<any>(actionId);
    }

    updateAction(action: any, addressId: any, vendorId: any) {
        return this.actionEndpoint.getUpdatevendorEndpoint(action, addressId, vendorId);
    }
    updatevendorstatus(action: any) {
        return this.actionEndpoint.updatevendorstatus(action);
    }
    updateVendorWarnings(action: any) {
        return this.actionEndpoint.updateVendorWarnings(action);
    }

    updateVendorDetails(action: any) {
        return this.actionEndpoint.updateVendorListDetails<any>(action);
    }


    deleteCheckPayment(actionId: any) {

        return this.actionEndpoint.deleteCheckPayment(actionId);

    }
    deleteAcion(vendorId: any) {

        return this.actionEndpoint.getDeletevendorEndpoint(vendorId);

    }
    deletePurchaseorderpart(purchaseOrderPartRecordId: any) {

        return this.actionEndpoint.deletePOPart(purchaseOrderPartRecordId);

    }
    deleterepairorderpart(repiarOrderPartRecordId: any) {

        return this.actionEndpoint.deleteROPart(repiarOrderPartRecordId);

    }
    deleteContact(actionId: any) {

        return this.actionEndpoint.deleteContact(actionId);

    }

    deleteVendorAcion(actionId: any) {

        return this.actionEndpoint.getDeletevendorshippingViaEndpoint(actionId);

    }

    deleteVendorShippingAddress(actionId: any) {

        return this.actionEndpoint.getDeletevendorshippingEndpoint(actionId);

    }

    newAddContactInfo(vendorcntct: any) {
        return this.actionEndpoint.getNewVendorContactInfo<any>(vendorcntct);
    }

    addCheckinfo(vendorcntct: any) {
        return this.actionEndpoint.addPaymentCheckinfo<any>(vendorcntct);
    }

    addDomesticinfo(vendorcntct: any) {
        return this.actionEndpoint.addPaymentDomesticinfo<any>(vendorcntct);
    }

    addInternationalinfo(vendorcntct: any) {
        return this.actionEndpoint.addPaymentInternationalinfo<any>(vendorcntct);
    }

    addDefaultinfo(vendorcntct: any) {
        return this.actionEndpoint.addPaymentDefaultinfo<any>(vendorcntct);
    }


    newAddvendorContact(vendorcntct: any) {
        return this.actionEndpoint.AddvendorContactDetails<any>(vendorcntct);
    }

    updateVendorCheckpayment(vendorcntct: any, vendorId: any) {
        return this.actionEndpoint.updateVendorCheckpayment<any>(vendorcntct, vendorId);
    }
    updateVendorShippingAddressDetails(vendorcntct: any, vendorId: any) {
        return this.actionEndpoint.updateVendorAddressDetails<any>(vendorcntct, vendorId);
    }
    updateVendorBillingAddressDetails(vendorcntct: any, vendorId: any) {
        return this.actionEndpoint.updateVendorAddressDetails<any>(vendorcntct, vendorId);
    }

    updateVendorDomesticWirePayment(vendorcntct: any, vendorId: any) {
        return this.actionEndpoint.updateVendorDomesticWirePayment<any>(vendorcntct, vendorId);
    }



    updateVendorInternationalWirePayment(vendorcntct: any, vendorId: any) {
        return this.actionEndpoint.updateVendorInternationalWirePayment<any>(vendorcntct, vendorId);
    }

    //updateVendorDefault(vendorcntct: any, vendorId: any) {
    //	return this.actionEndpoint.updateVendorDefault<any>(vendorcntct, vendorId);
    //}

    vendorInternationalUpdate(vendorcntct: any) {
        return this.actionEndpoint.updateInternational<any>(vendorcntct);
    }
    vendorDefaultUpdate(vendorcntct: any) {
        return this.actionEndpoint.updateDefault<any>(vendorcntct);
    }

    updateContactinfo(vendorcntct: any) {
        return this.actionEndpoint.getUpdateContactInfo(vendorcntct, vendorcntct.contactId);
    }
    updateCheckPaymentInfo(vendorcntct: any) {
        return this.actionEndpoint.updateCheckPaymentInfo(vendorcntct, vendorcntct.addressId);
    }

    updateDomesticBankPaymentinfo(vendorcntct: any) {
        return this.actionEndpoint.updateDomestic(vendorcntct);
    }


    newAddfinanceInfo(vendorcntct: any) {
        return this.actionEndpoint.getNewVendorfinanceInfo<any>(vendorcntct);
    }
    updatefinanceinfo(vendorcntct: any, vendorid: any) {
        return this.actionEndpoint.getUpdateFinanceInfo(vendorcntct, vendorid);
    }
    newShippingAdd(action: any) {

        return this.actionEndpoint.getNewShipppinginfo<any>(action);
    }
    newBillingAdd(action: any) {

        return this.actionEndpoint.getNewBillinginfo<any>(action);
    }

    addNewBillingAddress(object) {
        return this.actionEndpoint.postNewBillingAddress<any>(object);
    }
    //updateShipAddressdetails(action: any) {

    //	return this.actionEndpoint.updateShipAddressDetails(action, action.vendorShippingId);
    //}
    newShippingViaAdd(action: any) {

        return this.actionEndpoint.saveShipViaDetails<any>(action);
    }
    newBillingViaAdd(action: any) {

        return this.actionEndpoint.saveBillViaDetails<any>(action);
    }
    addShipViaDetails(action: any) {

        return this.actionEndpoint.addShipViaDetails<any>(action, action.vendorShippingId);
    }
    newShippingAddWithAddress(action: any, shippingAddressId: any) {

        return this.actionEndpoint.getNewShipppinginfoWithAddressId<any>(action, shippingAddressId);
    }
    newBillingAddWithAddress(action: any, billingAddressId: any) {

        return this.actionEndpoint.getNewBillinginfoWithAddressId<any>(action, billingAddressId);
    }
    updateshippinginfo(vendorshipping: any) {
        return this.actionEndpoint.updateShippinginfo(vendorshipping, vendorshipping.vendorShippingAddressId);
    }
    updateBillinginfo(vendorbilling: any) {
        return this.actionEndpoint.updateShippinginfo(vendorbilling, vendorbilling.vendorBillingAddressId);
    }


    updateshippingViainfo(vendorshipping: any) {
        return this.actionEndpoint.updateShippingViainfo(vendorshipping, vendorshipping.vendorShippingId);
    }
    updateBillingViainfo(vendorbilling: any) {
        return this.actionEndpoint.updateBillingViainfo(vendorbilling, vendorbilling.vendorBillingId);
    }
    getDiscountList() {
        return Observable.forkJoin(
            this.actionEndpoint.getDiscountEndpoint<DiscountValue[]>());
    }


    newAddDiscount(action: DiscountValue) {
        return this.actionEndpoint.getNewDiscount<DiscountValue>(action);
    }

    updatediscount(action: DiscountValue) {
        return this.actionEndpoint.getupdateDiscount(action, action.discountId);
    }

    getvendorList(vendorName) {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorByNameList<any[]>(vendorName));
    }
    updateActionforActive(action: any) {
        return this.actionEndpoint.getUpdatevendorEndpointforActive(action, action.vendorId);
    }
    updateContactforActive(action: any) {
        return this.actionEndpoint.getUpdatevendorContactEndpointforActive(action, action.contactId);
    }
    updateActiveforpayment(checkpayment: any) {
        return this.actionEndpoint.getUpdatevendorpaymentEndpointforActive(checkpayment);
    }

    updateActionforActiveforshipping(vendorshipping: any) {
        return this.actionEndpoint.getUpdatevendorEndpointforActiveforshipping(vendorshipping, vendorshipping.vendorShippingAddressId);
    }
    updateActionforActiveforBilling(vendorbilling: any) {
        return this.actionEndpoint.getUpdatevendorEndpointforActiveforbilling(vendorbilling, vendorbilling.vendorBillingAddressId);
    }

    updateActionforActiveforshipViaDetails(vendorshipping: any) {
        return this.actionEndpoint.getUpdatevendorEndpointforActiveforshipViaDetails(vendorshipping, vendorshipping.vendorShippingId);
    }

    getPurchaseOrderlist() {
        return Observable.forkJoin(
            this.actionEndpoint.getPurchaseOrderList<any>());
    }
    getPOList(data) {
        return Observable.forkJoin(
            this.actionEndpoint.getPOList(data));
    }


    getCountrylist() {
        return Observable.forkJoin(
            this.actionEndpoint.getcountryListEndpoint<any[]>());
    }

    getRepaireOrderlist() {
        return Observable.forkJoin(
            this.actionEndpoint.getRepaireOrderList<any>());
    }

    getATASubchapterData(AtaMainId: any) {
        return Observable.forkJoin(this.actionEndpoint.getATASubchapterDataEndpoint<any>(AtaMainId));
        //return this.actionEndpoint.getATASubchapterDataEndpoint<ATASubChapter[]>(AtaMainId);
    }



    newVendorCapability(action: any) {

        return this.actionEndpoint.newVendorCapabilityEndPoint<any>(action);
    }

    addVendorCapabilityTypeList(action: any) {

        return this.actionEndpoint.newVendorCapabilityTypeListEndPoint<any>(action);
    }

    addVendorCapabilityAircraftType(action: any) {

        return this.actionEndpoint.newVendorCapabilityAircraftTypeEndPoint<any>(action);
    }
    addVendorCapabiltiyAircraftModel(action: any) {

        return this.actionEndpoint.newVendorCapabiltiyAircraftModelEndPoint<any>(action);
    }

    getVendorCapabilityListById(vendorId: any) {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorCapabilityListEndpoint<any[]>(vendorId));
    }

    getVendorCapabilityAircraftManafacturerList(vendorId: any) {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorCapabilityAircraftManafacturerListEndpoint<any[]>(vendorId));
    }

    getVendorCapabilityAircraftManafacturerModelList(vendorId: any) {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorCapabilityAircraftManafacturerModelListEndpoint<any[]>(vendorId));
    }

    //For updating the Vendor Capability
    updateVendorCapability(sourceVendorCap: any) {
        return this.actionEndpoint.getupdateVendorCapabilityEndpoint<any>(sourceVendorCap, sourceVendorCap.vendorCapabilityId);
    }

    DeletevendorCapability(actionId: any) {

        return this.actionEndpoint.getDeletevendorCapabilityTypeEndpoint(actionId);

    }

    DeletevendorCapabilityAircraftManafacturer(actionId: any) {

        return this.actionEndpoint.getDeletevendorCapabilityAircraftManafacturerEndpoint(actionId);

    }

    DeletevendorCapabilityAircraftModel(actionId: any) {

        return this.actionEndpoint.getDeletevendorCapabilityAircraftModelEndpoint(actionId);

    }

    deleteVendorCapability(actionId: any) {

        return this.actionEndpoint.deleteVendorCapabilityEndpoint(actionId);

    }
    getVendorContactList(vendorId: any, isDContact: any) {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorContactEndpoint<any[]>(vendorId, isDContact));
    }

    saveManfacturerinforcapes(data) {
        return this.actionEndpoint.saveVendorCapesmaninfo<any>(data);
    }

    getVendorCapesData(vendorID: any) {
        return this.actionEndpoint.getVendorCapesData(vendorID);
    }

    getVendorContactsListByID(vendorId: any) {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorContactsByIDEndpoint<any[]>(vendorId));
    }

    getVendorsForDropdown() {
        return this.actionEndpoint.getVendorsForDropdownEndPoint<any[]>();
    }

    getVendorSiteNames(vendorId) {
        return this.actionEndpoint.getVendorbillingsitenames(vendorId);
    }
    getVendorAddressById(vendorId) {
        return this.actionEndpoint.getVendorAddressById(vendorId)
    }

    getReceivingPOListing() {
        return this.actionEndpoint.getReceivingPOListing();
    }

    saveRepairOrder(action: any) {
        return this.actionEndpoint.saveRepairorderdetails<any>(action);
    }

    saveRepairOrderPart(action: any) {
        return this.actionEndpoint.saveRepairorderdetailspart<any>(action);
    }

    getVendorROById(Id: number) {
        return this.actionEndpoint.getVendorROById<any>(Id);
    }

    getRepairOrderPartsById(Id: number, workOrderPartNumberId) {
        return Observable.forkJoin(this.actionEndpoint.getRepairOrderPartsById<any>(Id, workOrderPartNumberId));
    }

    getPurchaseOrderByItemId(Id: number) {
        return Observable.forkJoin(this.actionEndpoint.getPurchaseOrderByItemId<any>(Id));
    }

    getRepairOrderByItemId(Id: number) {
        return Observable.forkJoin(this.actionEndpoint.getRepiarOrderByItemId<any>(Id));
    }

    getROStatus(repairOrderId, isActive, updatedBy) {
        return this.actionEndpoint.getROStatus(repairOrderId, isActive, updatedBy);
    }

    deleteRO(repairOrderId, updatedBy) {
        return this.actionEndpoint.deleteRO(repairOrderId, updatedBy);
    }

    getROHistory(repairOrderId) {
        return this.actionEndpoint.getROHistory(repairOrderId);
    }

    getROViewById(purchaseOrderId) {
        return this.actionEndpoint.getROViewById(purchaseOrderId);
    }

    getROPartsViewById(purchaseOrderId) {
        return this.actionEndpoint.getROPartsViewById(purchaseOrderId);
    }

    getROList(data) {
        return Observable.forkJoin(
            this.actionEndpoint.getROList(data));
    }

    saveCreateROApproval(action: any) {
        return this.actionEndpoint.saveCreateROApproval<any>(action);
    }

    updateROApproval(action: any) {
        return this.actionEndpoint.updateROApproval<any>(action);
    }

    getROApproverList(purchaseOrderId) {
        return this.actionEndpoint.getROApproverList(purchaseOrderId);
    }

    getReceivingROList() {
        return this.actionEndpoint.getReceivingROList();
    }

    getVendorPOMemolist(vendorId) {
        return this.actionEndpoint.getVendorPOMemolist<any>(vendorId);
    }

    getVendorROMemolist(vendorId) {
        return this.actionEndpoint.getVendorROMemolist<any>(vendorId);
    }

    updateVendorPOROmemolist(id, type, memoText, updatedBy) {
        return this.actionEndpoint.updateVendorPOROmemolist(id, type, memoText, updatedBy);
    }

    getDocumentList(vendorId) {
        return this.actionEndpoint.getDocumentList(vendorId)
    }


    documentUploadAction(action: any) {
        return this.actionEndpoint.getDocumentUploadEndpoint<any>(action);
    }

    getDocumentListbyId(vendorDocumentId) {
        return this.actionEndpoint.getDocumentListbyId(vendorDocumentId)
    }


    documentUpdateUploadAction(action: any) {
        return this.actionEndpoint.getUpdateDocumentUploadEndpoint<any>(action);
    }

    toGetUploadDocumentsList(attachmentId, vendorId, moduleId) {
        return this.actionEndpoint.GetUploadDocumentsList(attachmentId, vendorId, moduleId);
    }

    getDeleteDocumentListbyId(vendorDocumentId) {
        return this.actionEndpoint.getdeleteDocumentListbyId(vendorDocumentId)
    }

    getShipaddressHistory(vendorId, vendorShippingAddressId) {
        return this.actionEndpoint.getVendorShippingAuditHistory(vendorId, vendorShippingAddressId);
    }
    getVendorBillingAuditHistory(vendorId, vendorBillingaddressId) {
        return this.actionEndpoint.getVendorBillingAuditHistory(vendorId, vendorBillingaddressId);
    }
    getVendorContactAuditHistory(vendorId, vendorContactId) {
        return this.actionEndpoint.getVendorContactAuditHistory(vendorId, vendorContactId);
    }

    getVendorDocumentAuditHistory(id) {
        return this.actionEndpoint.getVendorDocumentAuditHistory(id);
    }
    getVendorCapabilityAuditHistory(VendorCapabilityId, VendorId) {
        return this.actionEndpoint.getVendorCapabilityAuditHistory(VendorCapabilityId, VendorId);
    }
    createNewBillinginfo(action: any) {

        return this.actionEndpoint.createNewBillinginfo<any>(action);
    }

    updateBillAddressdetails(action: any) {

        return this.actionEndpoint.updateBillAddressDetails(action, action.vendorBillingAddressId);
    }

    vendorGeneralDocumentUploadEndpoint(action: any, vendorId, moduleId, moduleName, uploadedBy, masterCompanyId) {
        return this.actionEndpoint.vendorGeneralDocumentUploadEndpoint(action, vendorId, moduleId, moduleName, uploadedBy, masterCompanyId);
    }

    vendorGeneralFileUpload(action: any) {

        return this.actionEndpoint.vendorGeneralFileUploadEndpoint<any>(action);
    }

    GetVendorGeneralDocumentsList(vendorId, moduleId) {
        return this.actionEndpoint.GetVendorGeneralDocumentsListEndpoint(vendorId, moduleId);
    }

    GetVendorAttachmentDelete(attachmentDetailId, updatedBy) {
        return this.actionEndpoint.GetVendorAttachmentDeleteEndpoint(attachmentDetailId, updatedBy);
    }
    getVendorProcess1099Data(companyId: number) {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorProcess1099id<any>(companyId));
    }
    getVendorProcess1099DataFromTransaction(vendorId: number) {
        return Observable.forkJoin(
            this.actionEndpoint.getVendorProcess1099idFromTransaction<any>(vendorId));
    }

    repairOrderGlobalSearch(filterText, pageNumber, pageSize, vendorId){
        return this.actionEndpoint.repairOrderGlobalSearch(filterText, pageNumber, pageSize, vendorId);
      }
}



