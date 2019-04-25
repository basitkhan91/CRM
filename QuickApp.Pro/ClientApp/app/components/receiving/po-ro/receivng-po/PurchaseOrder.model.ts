import { Vendor } from "../../../../models/vendor.model";
import { Stockline } from "../../../../models/stockline.model";

export class PurchaseOrder {

    purchaseOrderId: number;
    purchaseOrderNumber: string;
    referenceId: string;
    priorityId: number;
    requestedBy: string
    dateRequested: Date;
    approver: string
    dateApprovied: Date
    needByDate: Date;
    statusId: number;
    employeeId: string;
    vendorId: number;
    vendorContactId: number;
    shipToCompanyId: number;
    shipViaAccountId: number;
    terms: string;
    creditLimit: number;
    notes: string;
    siteId: number;
    locationId: number;
    issuedToAddressId: number;
    issuedToContactName: string;
    issuedToMemo: string;
    shipToAddressId: number;
    shipToContactName: string;
    shipToMemo: string;
    billToAddressId: number;
    billToContactName: string;
    billToMemo: string;
    masterCompanyId: number;
    shipToUserType: number;
    billToUserType: number;
    shipToUserName: string;
    billToUserName: string;
    deferredReceiver: boolean;
    resale: boolean;
    isActive: boolean;

    purchaseOderPart: PurchaseOrderPart[];
    vendor: Vendor;
    stockline: StockLine;
}

export class PurchaseOrderPart {
    purchaseOrderPartRecordId: number;
    purchaseOrderId: number;
    itemMasterId: number;
    serialNumber: string;
    nonInventory: boolean;
    requisitionedBy: string;
    requisitionedDate: Date;
    approver: string;
    approvedDate: Date;
    needByDate: Date;
    manufacturer: string;
    status: string;
    trace: string;
    conditionCode: string;
    uOMId: number;
    quantityOrdered: number;
    unitCost: number;
    discountPerUnit: number;
    discountCostPerUnit: number;
    extendedCost: number;
    transactionalCurrencyId: number;
    functionalCurrencyId: number;
    foreignExchangeRate: number;
    workOrderId: number;
    repairOrderId: number;
    salesOrderId: number;
    generalLedgerAccounId: number;
    memo: string;
    pOPartSplitUserTypeId: number;
    pOPartSplitUserId: number;
    pOPartSplitAddress1: string;
    pOPartSplitAddress2: string;
    pOPartSplitAddress3: string;
    pOPartSplitCity: string;
    pOPartSplitState: string;
    pOPartSplitPostalCodestring; string;
    pOPartSplitCountry: string;
    pOPartSplitAddressId: number;
    managementStructureId: number;
    createdBy: string;
    updatedBy: string;
    createdDate: Date;
    updatedDate: Date;
    isActive: boolean;
    isParent: boolean;
    itemMaster: any;
    visible: boolean;
}

export class ItemMaster {

}

export class StockLine {
    stockLineId: number;
    partNumber: string;
    stockLineNumber: string;
    stocklineMatchKey: string;
    controlNumber: string;
    itemMasterId: number;
    quantity: number;
    conditionId: number;
    serialNumber: string;
    shelfLife: boolean;
    shelfLifeExpirationDate: Date;
    siteId: number;
    shelfId: number;
    binId: number;
    warehouseId: number;
    locationId: number;
    obtainFrom: string;
    owner: string;
    traceableTo: string;
    manufacturerId: number;
    manufacturer: string;
    manufacturerLotNumber: string;
    manufacturingDate: Date;
    manufacturingBatchNumber: string;
    partCertificationNumber: string;
    certifiedBy: string;
    certifiedDate: Date;
    tagDate: Date;
    tagType: string;
    certifiedDueDate: Date;
    calibrationMemo: string;
    orderDate: Date;
    purchaseOrderId: number;
    purchaseOrderUnitCost: number;
    inventoryUnitCost: number;
    repairOrderId: number;
    repairOrderUnitCost: number;
    receivedDate: Date;
    receiverNumber: string;
    reconciliationNumber: string;
    unitSalesPrice: number;
    coreUnitCost: number;
    gLAccountId: number;
    assetId: number;
    isHazardousMaterial: boolean;
    isPMA: boolean;
    isDER: boolean;
    oEM: boolean;
    memo: string;
    managementStructureEntityId: number;
    timeLifeCyclesId: number;
    site: string;
    shelf: string;
    bin: string;
    obtainFromType: number;
    ownerType: number;
    traceableToType: number;
    timeLife: boolean;
    timeLifeId: number;
    unitCostAdjustmentReasonTypeId: number;
    unitSalePriceAdjustmentReasonTypeId: number;
    masterCompanyId: number;
    companyId: number;
    businessUnitId: number;
    divisionId: number;
    departmentId: number;
    quantityToReceive: number;
    isSerialized: boolean;
    idNumber: number;

}

export class TimeLife {

    timeLifeCyclesId: number;
    cyclesRemaining: number;
    cyclesSinceNew: number;
    cyclesSinceOVH: number;
    cyclesSinceInspection: number;
    cyclesSinceRepair: number;
    timeRemaining: number;
    timeSinceNew: number;
    timeSinceOVH: number;
    timeSinceInspection: number;
    timeSinceRepair: number;
    lastSinceNew: number;
    lastSinceOVH: number;
    lastSinceInspection: number;
    masterCompanyId: number;
    isActive: boolean;
}

