﻿// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { AircraftModelEndpointService } from './aircraft-model-endpoint.service';
import { AircraftModel } from '../../models/aircraft-model.model';

@Injectable()
export class AircraftModelService {

    constructor(private aircraftModelEndpoint: AircraftModelEndpointService) {
    }

    getAll() {
        return Observable.forkJoin(
            this.aircraftModelEndpoint.getAllAircraftModel<AircraftModel[]>());
    }

    getById(aircraftModelId: number) {
        return Observable.forkJoin(
            this.aircraftModelEndpoint.getAircraftModelById<AircraftModel>(aircraftModelId)
        );
    }

    add(aircraftModel: AircraftModel) {
        return this.aircraftModelEndpoint.addAircraftModel<AircraftModel>(aircraftModel);
    }

    update(aircraftModel: AircraftModel) {
        return this.aircraftModelEndpoint.updateAircraftModel<AircraftModel>(aircraftModel);
    }

    remove(aircraftModelId: number) {
        return this.aircraftModelEndpoint.removeAircraftModelById(aircraftModelId);
    }
    updateActive(aircraftModel: any) {
        return this.aircraftModelEndpoint.getUpdateForActive(aircraftModel, aircraftModel.aircraftModelId);
    }
    getAudit(aircraftModelId: number) {
        return this.aircraftModelEndpoint.getAudit<any[]>(aircraftModelId);
    }

    getAircraftModelListByManufactureId(aircraftModelId: number)
    {
        return Observable.forkJoin(
            this.aircraftModelEndpoint.getAircraftModelListByAircraftManufacturerId<AircraftModel[]>(aircraftModelId));
    }

}