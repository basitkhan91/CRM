import { MasterCompany } from './mastercompany.model';
import { Customer } from './customer.model';
export class CustomerBillingAddressModel {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
	constructor(masterCompany?: MasterCompany, CustomerBillingAddressId?: number, CustomerId?: number, AddressId?: number, IsPrimary?: boolean, SiteName?: string, displayName?: string, masterCompanyId?: number, createdBy?: string, createdDate?: Date, updatedDate?: Date, updatedBy?: string) {

        this.CustomerBillingAddressId = CustomerBillingAddressId;
        this.CustomerId = CustomerId;
        this.AddressId = AddressId;
        this.IsPrimary = IsPrimary;
        this.SiteName = SiteName;
        this.displayName = displayName;
        this.masterCompanyId = masterCompanyId;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.updatedBy = updatedBy;
    }

    public CustomerBillingAddressId: number;
    public CustomerId: number;
    public AddressId: number;
    public IsPrimary: boolean;
    public SiteName: string;
    public displayName: string;
    public masterCompanyId: number;
    public createdBy: string;
    public updatedBy: string;
    public createdDate: Date;
    public updatedDate: Date;
    public masterCompany: MasterCompany;
	public Customer: Customer;
}