
export class StageCode {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
    constructor(stageCodeId?: number, gateCode?: string, sequence?: string, memo?: string, description?: string, masterCompanyId?: number, createdBy?: string, createdDate?: Date, updatedDate?: Date, updatedBy?: string, isActive?: boolean, isDelete?: boolean) {

        this.stageCodeId = stageCodeId;
        this.gateCode = gateCode;
        this.description = description;
        this.sequence = sequence;
		this.memo = memo;
        this.masterCompanyId = masterCompanyId;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.updatedBy = updatedBy;
		this.isActive = isActive;
        this.isDelete = isDelete;
    }

    public stageCodeId: number;
    public gateCode: string;
    public description: string;
    public sequence: string;
	public memo: string;
    public masterCompanyId: number;
    public createdBy: string;
    public updatedBy: string;
    public createdDate: Date;
    public updatedDate: Date;
	public isActive: boolean;
    public isDelete: boolean;
}