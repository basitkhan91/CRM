export class CreatePOPartsList {
    checkPartList: boolean;
    isSplitShipment: boolean;
    partNumber: string;
    altPartNumber: string;
    pnDescription: string;
    itemType: string;
    mfr: string;
    glAccount: string;
    uom: string;
    needBy: Date;
    cond: string;
    orderQty: number;
    unitCost: number;
    discPerUnit: number;
    discCostPerUnit: number;
    extCost: number;
    functionalCUR: string;
    fxRate: string;
    reportCUR: string;
    wo: string;
    ro: string;
    so: string;
    company: string;
    bu: string;
    division: string;
    dept: string;
    memo: string;
    partListDetails: PartDetails[];

    constructor() {
        this.checkPartList = false;
        this.isSplitShipment = false;
        this.partNumber = '';
        this.altPartNumber = '';
        this.pnDescription = '';
        this.itemType = '';
        this.mfr = '';
        this.glAccount = '';
        this.uom = '';
        this.needBy = new Date();
        this.cond = '';
        this.orderQty = null;
        this.unitCost = null;
        this.discPerUnit = null;
        this.discCostPerUnit = null;
        this.extCost = null;
        this.functionalCUR = '';
        this.fxRate = '';
        this.reportCUR = '';
        this.wo = '';
        this.ro = '';
        this.so = '';
        this.company = '0';
        this.bu = '0';
        this.division = '0';
        this.dept = '0';
        this.memo = '';
        this.partListDetails = [new PartDetails()];
    }
}

export class PartDetails {   
        partNumber: string;
        pnDescription: string;
        userType: string;
        name: string;
        address: string;
        uom: string;
        orderQty: number;
        needBy: Date;
        company: string;
        bu: string;
        division: string;
        dept: string;

        constructor() {
            this.partNumber = '';
            this.pnDescription = '';
            this.userType = '1';
            this.name = '';
            this.address = '';
            this.uom = '';
            this.orderQty = null;
            this.needBy = new Date();
            this.company = '0';
            this.bu = '0';
            this.division = '0';
            this.dept = '0';
        }
    
}
