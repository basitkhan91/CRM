
import { MasterCompany } from './mastercompany.model';

export class Publication {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
	constructor(masterCompany?: MasterCompany, isActive?: boolean, publicationRecordId?: number, publicationId?: string, PartNumber?: string, Platform?: string, description?: string, Model?: string, ATAMain?: string, ATASubChapter?: string, ATAPositionZone?: string, IsActive?: boolean, masterCompanyId?: number, createdBy?: string, createdDate?: Date, updatedDate?: Date, updatedBy?: string, memo?: string) {
        this.publicationRecordId = publicationRecordId;
        this.publicationId = publicationId;
        this.PartNumber = PartNumber;
        this.description = description;
        this.isActive = isActive;
        this.Platform = Platform;
        this.Model = Model;
        this.ATAMain = ATAMain;
        this.ATASubChapter = ATASubChapter;
        this.ATAPositionZone = ATAPositionZone;
        this.masterCompanyId = masterCompanyId;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.updatedBy = updatedBy;
        this.IsActive = IsActive;
        this.masterCompany = masterCompany;
		this.memo = memo;
    }

    public publicationRecordId: number;
    public publicationId: string;
    public isActive: boolean;
    public PartNumber: string;
    public description: string;
    public Platform: string;
    public Model: string;
    public ATAMain:string;
    public ATASubChapter:string;
    public ATAPositionZone:string;
    public masterCompanyId: number;
    public createdBy: string;
    public updatedBy: string;
    public createdDate: Date;
    public updatedDate: Date;
    public IsActive: boolean;
    public masterCompany?: MasterCompany;
	public memo: string;

}