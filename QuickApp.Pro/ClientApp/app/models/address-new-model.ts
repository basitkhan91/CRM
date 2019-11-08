// export class Address {

//     public siteName: string;
//     public address: AddressNew[];

// }

export class AddressNew {
    public line1: string;
    public line2: string;
    public line3: string;
    public city: string;
    public stateOrProvince: string;
    public postalCode: string;
    public country: string;

    constructor() {
        this.line1 = ''
        this.line2 = ''
        this.line3 = ''
        this.city = ''
        this.stateOrProvince = ''
        this.postalCode = ''
        this.country = ''
    }
}