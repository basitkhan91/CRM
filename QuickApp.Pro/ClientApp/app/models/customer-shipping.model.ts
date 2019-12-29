﻿import { MasterCompany } from './mastercompany.model';
import { Customer } from './customer.model';
export class CustomerShippingModel {
  

            constructor() {

                this.siteName = "";
                this.address1 ="";
                this.address2 ="";
                this.address3 ="";
                this.city ="";
                this.stateOrProvince = "";
                this.postalCode ="";
                this.country ="" ;
                this.customerId = null;
                this.vendorId = null;
                this.isPrimary = false;
        
                // this.CustomerShippingId = CustomerShippingId;
                // this.CustomerId = CustomerId;
                // this.AddressId = AddressId;
                // this.SiteName = SiteName;
                // this.ShipVia = ShipVia;
                // this.ShippingURL = ShippingURL;
                // this.SiteName = SiteName;
                // this.masterCompanyId = masterCompanyId;
                // this.createdBy = createdBy;
                // this.createdDate = createdDate;
                // this.updatedDate = updatedDate;
                // this.updatedBy = updatedBy;
            }
        
            public siteName : string;
            public address1 : string;
            public address2 : string;
            public address3 : string;
            public city : string;
            public stateOrProvince : string;
            public postalCode: string;
            public country : string;
            public customerId : number;
    public vendorId: number;
    public isPrimary: boolean;
        
            // public CustomerShippingId: number;
            // public CustomerId: number;
            // public AddressId: number;
            // public SiteName: string;
            // public ShipVia: string;
            // public ShippingId: string;
            // public ShippingURL: string;
            // public masterCompanyId: number;
            // public createdBy: string;
            // public updatedBy: string;
            // public createdDate: Date;
            // public updatedDate: Date;
            // public masterCompany: MasterCompany;
            // public Customer: Customer;
}