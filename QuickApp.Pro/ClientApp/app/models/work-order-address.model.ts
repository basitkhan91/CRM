export interface Addresses {
  wOId?: string;
  shipTo: AddressDetails;
  billTo: AddressDetails;
}

export interface AddressDetails {
  siteName: string;
  address: string;
  city: string;
  stateorProvince: string;
  country: string;
  contactName: string;
}

export class addressesForm {
  constructor() {
    this.woId = '';
    this.shipTo = {
      siteName: '',
      address: '',
      city: '',
      stateorProvince: '',
      country: '',
      contactName: ''
    };
    this.billTo = {
      siteName: '',
      address: '',
      city: '',
      stateorProvince: '',
      country: '',
      contactName: ''
    };
  }

  woId: string;
  shipTo: object;
  billTo: object;
}
