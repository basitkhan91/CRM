import { AircraftType } from "./AircraftType.model";
import { AircraftModel } from "./aircraft-model.model";

export class AircraftDashNumber {
    dashNumberId: number;
    aircraftTypeId: number;
    aircraftModelId: number;
    dashNumber: string;
    createdBy: string;
    updatedBy: string;
    createdDate: Date;
    updatedDate: Date;
    isDeleted: boolean;
    isActive: boolean;
    aircraftType: AircraftType;
    aircraftModel: AircraftModel;
    aircraftDashNumberList: AircraftDashNumber[];

}