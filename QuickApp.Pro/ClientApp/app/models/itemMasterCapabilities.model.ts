
export class ItemMasterCapabilitiesModel {

    capabilityId: any;
    capabilityTypeId: any;
    companyId: any = NaN;
    buisinessUnitId: any = NaN;
    departmentId: any = NaN;
    divisionId: any = NaN;
    manufacturerId: any = NaN;
    ataChapterId: any = NaN;
    description: any = "";
    aircraftTypeId: any;
    aircraftTypeName:any;
    aircraftModelId: any;
    aircraftModelName:any;
    aircraftManufacturer: any;
    itemMasterId: any = NaN;
    entryDate: Date = new Date();
    isCMMExist: any;
    isVerified:boolean = true;

    verifiedBy: any = "";
    dateVerified: Date = new Date();
    memo: any = "";
    isActive:boolean = true;
    isDelete:boolean = false;
    componentDescription: any;
    clcfNumber: any;
    public constructor(init?: Partial<ItemMasterCapabilitiesModel>) {
        Object.assign(this, init);
    }



}