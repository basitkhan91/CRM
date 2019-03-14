
import { MasterCompany } from './mastercompany.model';

export class GateCode {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
	constructor(masterCompany?: MasterCompany, gateCodeId?: number, gateCode?: string, sequence?: string, description?: string, masterCompanyId?: number, createdBy?: string, createdDate?: Date, updatedDate?: Date, updatedBy?: string, isActive?: boolean, memo?: string) {

        this.gateCodeId = gateCodeId;
        this.gateCode = gateCode;
        this.description = description;
        this.sequence = sequence;
        this.masterCompanyId = masterCompanyId;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.updatedBy = updatedBy;
        this.masterCompany = masterCompany;
		this.isActive = isActive;
		this.memo = memo;
    }

    public gateCodeId: number;
    public gateCode: string;
    public description: string;
    public sequence: string;
    public masterCompanyId: number;
    public createdBy: string;
    public updatedBy: string;
    public createdDate: Date;
    public updatedDate: Date;
    public masterCompany?: MasterCompany;
	public isActive: boolean;
	public memo: string;
}