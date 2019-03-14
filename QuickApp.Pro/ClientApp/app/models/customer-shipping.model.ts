import { MasterCompany } from './mastercompany.model';
import { Customer } from './customer.model';
export class CustomerShippingModel {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
    constructor(masterCompany?: MasterCompany, CustomerShippingId?: number, CustomerId?: number, AddressId?: number, SiteName?: string,
        ShipVia?: string, ShippingId?: number, ShippingURL?: string,
		masterCompanyId?: number, createdBy?: string, createdDate?: Date, updatedDate?: Date, updatedBy?: string) {

        this.CustomerShippingId = CustomerShippingId;
        this.CustomerId = CustomerId;
        this.AddressId = AddressId;
        this.SiteName = SiteName;
        this.ShipVia = ShipVia;
        this.ShippingURL = ShippingURL;
        this.SiteName = SiteName;
        this.masterCompanyId = masterCompanyId;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.updatedBy = updatedBy;
    }

    public CustomerShippingId: number;
    public CustomerId: number;
    public AddressId: number;
    public SiteName: string;
    public ShipVia: string;
    public ShippingId: string;
    public ShippingURL: string;
    public masterCompanyId: number;
    public createdBy: string;
    public updatedBy: string;
    public createdDate: Date;
    public updatedDate: Date;
    public masterCompany: MasterCompany;
	public Customer: Customer;
}