
export class JobType {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
    constructor(jobTypeId?: number,jobTypeName?: string, jobTypeDescription?: string,  createdBy?: string, createdDate?: Date, updatedDate?: Date, updatedBy?: string, isActive?: boolean, isDeleted?: boolean
        ) {
        this.jobTypeId = jobTypeId;
        this.jobTypeName = jobTypeName;
        this.jobTypeDescription = jobTypeDescription;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.updatedBy = updatedBy;
        this.isActive = isActive;
        this.isDeleted = isDeleted;


    }
    public jobTypeId: number;
    public jobTypeName: string;
    public jobTypeDescription: string;
    public isActive: boolean;
    public isDeleted: boolean;
    public createdBy: string;
    public updatedBy: string;
    public createdDate: Date;
    public updatedDate: Date;

}