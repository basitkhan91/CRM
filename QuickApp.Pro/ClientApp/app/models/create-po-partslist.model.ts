export class CreatePOPartsList {
    purchaseOrderId: number;
    isParent: boolean;
    serialNumber: number;
    itemMasterId: number;
    assetId: number;
    partNumberId: number;
    altPartNumberId: number;
    itemTypeId: number;
    manufacturerId: number;
    glAccountId: number;
    UOMId: number;
    needByDate: Date;
    conditionId: number;
    quantityOrdered: number;
    unitCost: number;
    discountPerUnit: number;
    discountAmount: number;
    extendedCost: number;
    functionalCurrencyId: number;
    foreignExchangeRate: number;
    reportCurrencyId: number;
    workOrderId: number;
    repairOrderId: number;
    salesOrderId: number;
    managementStructureId: number;
    memo: string;
    masterCompanyId: number;
    childList: PartDetails[];
    //extra
    ifSplitShip: boolean;
    purchaseOrderPartRecordId: number;
    companyId: number;
    //partBusinessUnitId: number;
    //partDivisionId: number;
    //partDepartmentId: number;
    parentBulist: any[];
    parentDivisionlist: any[];
    parentDepartmentlist: any[];
    parentCompanyId: number;
    parentbuId: number;
    parentDivisionId: number;
    parentDeptId: number;

    constructor() {
        this.purchaseOrderId = null;
        this.isParent = true;
        this.serialNumber = null;
        this.itemMasterId = null;
        this.assetId = null;
        this.partNumberId = null;
        this.altPartNumberId = null;
        this.itemTypeId = 0;
        this.manufacturerId = null;
        this.glAccountId = null;
        this.UOMId = null;
        this.needByDate = new Date();
        this.conditionId = null;
        this.quantityOrdered = null;
        this.unitCost = null;
        this.discountPerUnit = null;
        this.discountAmount = null;
        this.extendedCost = 2; //null
        this.functionalCurrencyId = null;
        this.foreignExchangeRate = null;
        this.reportCurrencyId = null;
        this.workOrderId = null;
        this.repairOrderId = null;
        this.salesOrderId = null;
        this.managementStructureId = null;
        this.memo = '';
        this.masterCompanyId = 1;
        this.childList = [new PartDetails()];
        this.ifSplitShip = false;
        this.purchaseOrderPartRecordId = null;
        this.companyId = null;
        //this.partBusinessUnitId = null;
        //this.partDivisionId = null;
        //this.partDepartmentId = null;
        this.parentBulist = [];
        this.parentDivisionlist = [];
        this.parentDepartmentlist = [];
        this.parentCompanyId = 0;
        this.parentbuId = 0;
        this.parentDivisionId = 0;
        this.parentDeptId = 0;
    }
}

export class PartDetails {   
        purchaseOrderId: number;
        isParent: boolean;
        serialNumber: number;
        itemMasterId: number;
        assetId: number;
        partNumberId: number;
        partListUserTypeId: number;
        partListUserId: number;
        partListAddressId: number;
        UOMId: number;
        quantityOrdered: number;
        needByDate: Date;
        managementStructureId: number;
        masterCompanyId: number;
        childBulist: any[];
        childDivisionlist: any[];
        childDepartmentlist: any[];
        childCompanyId: number;
        childbuId: number;
        childDivisionId: number;
        childDeptId: number;

        constructor() {
            this.purchaseOrderId = null;
            this.isParent = false;
            this.serialNumber = null;
            this.itemMasterId = null;
            this.assetId = null;
            this.partNumberId = null;
            this.partListUserTypeId = null;
            this.partListUserId = null;
            this.partListAddressId = null;
            this.UOMId = null;
            this.quantityOrdered = null;
            this.needByDate = new Date();
            this.managementStructureId = null;
            this.masterCompanyId = 1;
            this.childBulist = [];
            this.childDivisionlist = [];
            this.childDepartmentlist = [];
            this.childCompanyId = 0;
            this.childbuId = 0;
            this.childDivisionId = 0;
            this.childDeptId = 0;
        }   
}

