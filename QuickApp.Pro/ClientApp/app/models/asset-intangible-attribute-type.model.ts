

export class AssetIntangibleAttributeType {

    constructor(assetintangibleAttributeTypeId?: number, assetIntangibleTypeId?: number, assetDepreciationMethodId?: number, intangibleLife?: number,
        amortizationFrequency?: string, assetAmortizationIntervalId?: number, intangibleGLAccountId?: number, amortExpenseGLAccountId?: number, accAmortDeprGLAccountId?: number, depreciationMethod?: number, intangibleWriteDownGLAccountId?: number,
        intangibleWriteOffGLAccountId?: number, amortizationMethod?: number, managementStructureId?: number, masterCompanyId?: number, intangibleLifeYears?: number, createdBy?: string, updatedBy?: string, createdDate?: Date, updatedDate?: Date,
        isActive?: boolean, isDelete?: boolean) {

        this.assetintangibleAttributeTypeId = assetintangibleAttributeTypeId;
        this.assetIntangibleTypeId = assetIntangibleTypeId || 0;
        this.assetDepreciationMethodId = assetDepreciationMethodId || 0;
        this.amortizationMethod = amortizationMethod || 0;
        this.intangibleLife = intangibleLife || 0;
        this.amortizationFrequency = amortizationFrequency || "";
        this.assetAmortizationIntervalId = assetAmortizationIntervalId || 0;
        this.intangibleGLAccountId = intangibleGLAccountId || 0;
        this.amortExpenseGLAccountId = amortExpenseGLAccountId || 0;
        this.accAmortDeprGLAccountId = accAmortDeprGLAccountId || 0;
        this.depreciationMethod = depreciationMethod || 0;
        this.intangibleWriteDownGLAccountId = intangibleWriteDownGLAccountId || 0;
        this.intangibleWriteOffGLAccountId = intangibleWriteOffGLAccountId || 0;
        this.managementStructureId = managementStructureId || 0;
        this.masterCompanyId = masterCompanyId || 0;
        this.intangibleLifeYears = intangibleLifeYears || 0;
        this.createdBy = createdBy || "admin";
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.updatedBy = updatedBy;
        this.isActive = isActive;
        this.isDelete = isDelete;
    }

    assetintangibleAttributeTypeId: number;
    assetIntangibleTypeId: number;
    assetDepreciationMethodId: number;
    intangibleLife: number;
    amortizationFrequency: string;
    assetAmortizationIntervalId: number;
    amortizationMethod: number;
    intangibleGLAccountId: number;
    amortExpenseGLAccountId: number;
    accAmortDeprGLAccountId: number;
    intangibleWriteDownGLAccountId: number;
    intangibleWriteOffGLAccountId: number;
    managementStructureId: number;
    depreciationMethod: number;
    masterCompanyId: number;
    intangibleLifeYears: number;
    createdBy: string;
    updatedBy: string;
    createdDate: Date;
    updatedDate: Date;
    isDelete: boolean = false;
    isActive: boolean = false;
}

export class AssetIntangibleAttributeTypeSingleScreen extends AssetIntangibleAttributeType {

}
