export class Billing {
    woOpenDate: Date;
    customerRef: string;
    workScope: string;
    invoiceTypeId: number;
    invoiceNo: string;
    customerId: number;
    invoiceDate: Date;
    invoiceTime: Date;
    printDate: Date;
    shipDate: Date;
    noofPieces: number;
    employeeId: number;
    employeeName: string;
    revType: number;
    gateStatus: string;
    soldToCustomerId: number;
    soldToSiteId: number;
    shipToCustomerId: number;
    shipToSiteId: number;
    shipToAttention: '';
    managementStructureId: number;
    woType: string;
    notes: string;
    costPlusType: string;
    totalWorkOrder: boolean;
    totalWorkOrderValue: number;
    material: boolean;
    materialValue: number;
    laborOverHead: boolean;
    laborOverHeadValue: number;
    miscCharges: boolean;
    miscChargesValue: number;
    proForma: boolean;
    partialInvoice: boolean;
    costPlusRateCombo: boolean;
    shipViaId: number;
    wayBillRef: string;
    tracking: string;
    currencyId: number;
    salesPerson: string;
    availableCredit: number;
    creditTerm: string;
    shipAccount: string;
    constructor() {
        this.woOpenDate = null;
        this.customerRef = '';
        this.workScope = '';
        this.invoiceTypeId = null;
        this.invoiceNo = '';
        this.customerId = null;
        this.invoiceDate = null;
        this.invoiceTime = null;
        this.printDate = null;
        this.shipDate = null;
        this.noofPieces = null;
        this.employeeId = null;
        this.employeeName = '';
        this.revType = null;
        this.gateStatus = null;
        this.soldToCustomerId = null;
        this.soldToSiteId = null;
        this.shipToCustomerId = null;
        this.shipToSiteId = null;
        this.shipToAttention = '';
        this.managementStructureId = 1;
        this.woType = '';
        this.notes = '';
        this.costPlusType = 'Cost Plus';
        this.totalWorkOrder = false;
        this.totalWorkOrderValue = 0;
        this.material = false;
        this.materialValue = null;
        this.laborOverHead = false;
        this.laborOverHeadValue = null;
        this.miscCharges = false;
        this.miscChargesValue = null;
        this.proForma = false;
        this.partialInvoice = false;
        this.costPlusRateCombo = false;
        this.shipViaId = null;
        this.wayBillRef = '';
        this.tracking = '';
        this.currencyId = null;
        this.salesPerson = '';
        this.availableCredit = null;
        this.creditTerm = '';
        this.shipAccount = '';
    }
}