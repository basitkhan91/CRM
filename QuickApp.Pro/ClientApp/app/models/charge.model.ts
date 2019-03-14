import { MasterCompany } from './mastercompany.model';

export class Charge {
    ManagementStructureId: any;
    
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
    constructor(masterCompany?: MasterCompany, chargeId?: number, isActive?: boolean, chargeName?: string, quantity?: number, markUp?: number, currencyId?: number, purchaseOrderId?: number, vendorId?: number, integrationPortalId?: number, generalLedgerId?: number, functionalCurrencyId ?: number, masterCompanyId?: number, createdBy?: string, createdDate?: Date, updatedDate?: Date, updatedBy?: string, memo?: string) {

        this.chargeId = chargeId;
        this.currencyId = currencyId;
        this.purchaseOrderId = purchaseOrderId;
        this.vendorId = vendorId;
        this.integrationPortalId = integrationPortalId;
        this.generalLedgerId = generalLedgerId;
        this.functionalCurrencyId = functionalCurrencyId;
        this.markUp = markUp;
        this.chargeName = chargeName;
        this.quantity = quantity;
        this.masterCompanyId = masterCompanyId;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.updatedBy = updatedBy;
        this.isActive = isActive;
        this.memo = memo;
    }

    public chargeId: number;
    public currencyId: number;
    public purchaseOrderId: number;
    public vendorId: number;
    public integrationPortalId: number;
    public generalLedgerId: number;
    public functionalCurrencyId: number;
    public markUp: number;
    public chargeName: string;
    public quantity: number;
    public isActive?: boolean;
    public masterCompany: MasterCompany;

    public masterCompanyId: number;
    public createdBy: string;
    public updatedBy: string;
    public createdDate: Date;
    public updatedDate: Date;
    public memo: string;
}