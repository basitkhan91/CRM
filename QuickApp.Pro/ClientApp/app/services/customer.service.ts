// ===============================
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
import { Action } from '../models/action.model';
import { AuditHistory } from '../models/audithistory.model';
import { CustomerEndpoint } from './customer-endpoint.service';
import { Customer } from '../models/customer.model';
import { DiscountValue } from '../models/discountvalue';

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
    enableExternal: boolean=false;
    customerobject: any[];
    financeCollection: any;
    paymentCollection: any;
    salesCollection: any;
    shippingCollection: any;
    isEditMode: boolean=false;
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
	public alertObj = new Subject<any>();
	public alertChangeObject$ = this.alertObj.asObservable();
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

	updateActionforActive(action: any) {
		return this.customerEndpoint.getUpdatecustomerEndpointforActive(action, action.customerId);
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
    updateListstatus(actionId: any) {

        return this.customerEndpoint.updatelistStattus(actionId);

    }
    updateshippingViainfo(Customershipping: any) {
        return this.customerEndpoint.updateShippingViainfo(Customershipping, Customershipping.customerShippingId);
    }
    deleteCustomer(CustomerId: number) {

        return this.customerEndpoint.getDeletecustomerEndpoint(CustomerId);

    }
    deleteContact(CustomerId: any) {

        return this.customerEndpoint.deleteContact(CustomerId);
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

        return this.customerEndpoint.saveBillViaDetails<any>(action);
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

    updateCustomerBillingAddressDetails(customercntct: any, customerId: any) {
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
    updateCustomerWarnings(action: any) {
        return this.customerEndpoint.updateCustomerWarnings(action);
    }
    Addcustomeraircrafttype(action: any) {
        return this.customerEndpoint.getcustomeraircrafttypeEndpoint<any>(action);
	}


	getDiscountList() {
		return Observable.forkJoin(
			this.customerEndpoint.getDiscountEndpoint<DiscountValue[]>());
	}
	

	newAddDiscount(action: DiscountValue) {
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
}
