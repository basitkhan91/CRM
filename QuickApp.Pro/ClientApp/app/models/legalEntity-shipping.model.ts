﻿

    export class legalEntityShippingModel
    {
        constructor() {
            this.siteName = "";
            this.address1 = "";
            this.address2 = "";
            this.address3 = "";
            this.city = "";
            this.stateOrProvince = "";
            this.postalCode = "";
            this.country = "";
            this.legalEntityId = null;
            this.vendorId = null;
            this.isPrimary = false;
        }

        public siteName: string;
        public address1: string;
        public address2: string;
        public address3: string;
        public city: string;
        public stateOrProvince: string;
        public postalCode: string;
        public country: string;
        public legalEntityId: number;
        public vendorId: number;
        public isPrimary: boolean;
    }
