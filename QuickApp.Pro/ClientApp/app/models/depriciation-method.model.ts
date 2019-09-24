import { MasterCompany } from './mastercompany.model';

export class DepriciationMethod {
    constructor(masterCompany?: MasterCompany,
        assetDepreciationMethodId?: number,
        assetDepreciationMethodName?: string,
        assetDepreciationBasis?: string,
        assetDepreciationMemo?: string,
        assetDepreciationId?: string,
        masterCompanyId?: number,
        createdBy?: string,
        updatedBy?: string,
        createdDate?: Date,
        updatedDate?: Date,
        isDelete?: boolean,
        isActive?: boolean) {
        this.assetDepreciationMethodId = assetDepreciationMethodId;
        this.assetDepreciationMethodName = assetDepreciationMethodName;
        this.assetDepreciationBasis = assetDepreciationBasis;
        this.assetDepreciationMemo = assetDepreciationMemo;
        this.assetDepreciationId = assetDepreciationId;
        this.masterCompanyId = masterCompanyId;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.isDelete = isDelete;
        this.isActive = isActive;
    }

    public assetDepreciationMethodId: number;
    public assetDepreciationMethodName: string;
    public assetDepreciationBasis: string;
    public assetDepreciationMemo: string;
    public assetDepreciationId: string;
    public masterCompanyId: number;
    public createdBy: string;
    public updatedBy: string;
    public createdDate: Date;
    public updatedDate: Date;
    public isDelete: boolean;
    public isActive: boolean;

}