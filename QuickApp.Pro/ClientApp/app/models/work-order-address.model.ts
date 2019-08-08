interface AddressDetails {
  siteName: string;
  address: string;
  city: string;
  stateorProvince: string;
  country: string;
  contactName: string;
}

export class addressesForm {
  woId: string;
  shipTo: AddressDetails;
  billTo: AddressDetails;
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
}
