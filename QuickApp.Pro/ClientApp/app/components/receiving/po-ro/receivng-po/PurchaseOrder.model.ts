﻿import { Vendor } from "../../../../models/vendor.model";
import { AddressModel } from "../../../../models/address.model";
import { Dropdown } from "primeng/dropdown";

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
    stockLine: StockLine[];
}

export class PartStockLineMapper
{
    id: number;
    purchaseOrderPartRecordId: number;
    stockLineId: number;
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
    poPartSplitUserTypeId: number;
    poPartSplitUserId: number;
    poPartSplitAddress1: string;
    poPartSplitAddress2: string;
    poPartSplitAddress3: string;
    poPartSplitCity: string;
    poPartSplitState: string;
    poPartSplitPostalCodestring; string;
    poPartSplitCountry: string;
    poPartSplitAddressId: number;
    managementStructureId: number;
    createdBy: string;
    updatedBy: string;
    createdDate: Date;
    updatedDate: Date;
    isActive: boolean;
    isParent: boolean;
    itemMaster: any;
    visible: boolean;
   
    stocklineListObj: StockLine[];
    poPartSplitAddress: AddressModel;
    // UI Properties
    // below properties does not play role on the server side and are being used to show the data on UI and should be limited to UI only.

    managementStructureName: string[];
    statusText: string;
    userTypeName: string;
    userName: string;
    addressText: string;
    showStockLineGrid: boolean;
    quantityToReceive: number;


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

export class StockLine
{
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

    //View Properties
    CompanyList: DropDownData[];
    BusinessUnitList: DropDownData[];
    DivisionList: DropDownData[];
    DepartmentList: DropDownData[];
    SiteList: DropDownData[];
    WareHouseList: DropDownData[];
    LocationList: DropDownData[];
    ShelfList: DropDownData[];
    BinList: DropDownData[];
    CustomerList: DropDownData[];
    VendorList: DropDownData[];
    visible: boolean;
}

export class DropDownData {
    contructor(key: string, value: string) {
        this.Key = key;
        this.Value = value;
    }

    Key: string;
    Value: string;
}

