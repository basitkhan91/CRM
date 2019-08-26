import { AircraftType } from "./AircraftType.model";
import { AircraftModel } from "./aircraft-model.model";

export class AircraftDashNumber {
    //dashNumberId: number;
    //aircraftTypeId: number;
    //aircraftModelId: number;
    //memo: string;
    //dashNumber: string;
    //createdBy: string;
    //updatedBy: string;
    //createdDate: Date;
    //updatedDate: Date;
    //isDeleted: boolean;
    //isActive: boolean;
    //aircraftType: AircraftType;
    //aircraftModel: AircraftModel;
    //aircraftDashNumberList: AircraftDashNumber[];
    constructor(aircraftTypeId?: number, aircraftModelId?: number, isActive?: boolean, isDelete?: boolean, dashNumber?: string, masterCompanyId?: number, createdBy?: string, createdDate?: Date, updatedDate?: Date, updatedBy?: string, memo?: string) {
        this.aircraftTypeId = aircraftTypeId;
        this.aircraftModelId = aircraftModelId;   
        this.masterCompanyId = masterCompanyId;
        this.dashNumber = dashNumber;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.updatedBy = updatedBy;
        this.isActive = isActive;
        this.isDelete = isDelete;
        this.memo = memo;
    }

    public aircraftTypeId: number;
    public aircraftModelId: number;  
    public dashNumber: string;
    public isActive: boolean;
    public isDelete: boolean;
    public masterCompanyId: number;
    public createdBy: string;
    public updatedBy: string;
    public createdDate: Date;
    public updatedDate: Date;
    public memo: string;
    aircraftType: AircraftType;
    aircraftModel: AircraftModel;
    aircraftDashNumberList: AircraftDashNumber[];
}


