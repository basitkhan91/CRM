import { MasterCompany } from './mastercompany.model';

export class GLAccountClass {
    glaccountclassname: string;
   
  
	// Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
	constructor(masterCompany?: MasterCompany, GLAccountClassId?: number, GLCID?: number, GLAccountClassName?: string, masterCompanyId?: number, createdBy?: string, createdDate?: Date, updatedDate?: Date, updatedBy?: string, isActive?: boolean, memo?: string) {

		this.GLAccountClassId = GLAccountClassId;
		this.GLCID = GLCID;
		this.GLAccountClassName = GLAccountClassName;
		this.masterCompanyId = masterCompanyId;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.updatedDate = updatedDate;
		this.updatedBy = updatedBy;
		this.masterCompany = masterCompany;
		this.isActive = isActive;
		this.memo = memo;

	}

	public GLAccountClassId: number;
	public GLCID: number;
	public  GLAccountClassName: string;
	public masterCompanyId: number;
	public createdBy: string;
	public updatedBy: string;
	public createdDate: Date;
	public updatedDate: Date;
	public masterCompany?: MasterCompany;
	public isActive: boolean;
	public memo: string;




}