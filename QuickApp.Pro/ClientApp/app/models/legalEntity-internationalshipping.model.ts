export class legalEntityInternationalShippingModel {
    constructor() {
        this.exportLicense = "";
        this.startDate = undefined;
        this.amount = null;
        this.isPrimary = false;
        this.description = "";
        this.expirationDate = undefined;
        this.shipToCountryId = null;
    }
    public exportLicense: string;
    public startDate: Date;
    public amount: number;
    public isPrimary: boolean;
    public description: string;
    public expirationDate: Date;
    public shipToCountryId: number;
}

export class legalEntityInternationalShipVia {
    constructor() {
        this.shipVia = '';
        this.shippingAccountInfo = '';
        this.shippingId = '';
        this.shippingURL = '';
        this.memo = '';
        this.isPrimary = false;
    }
    public shipVia: string;
    public shippingAccountInfo: string;
    public shippingId: string;
    public shippingURL: string;
    public memo: string;
    public isPrimary: boolean;

}

