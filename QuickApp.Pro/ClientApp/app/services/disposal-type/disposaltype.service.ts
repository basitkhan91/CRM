﻿// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { DisposalType } from '../../models/disposal-type.model';
import { DisposalTypeEndpointService } from './disposaltype-endpoint.service';

@Injectable()
export class DisposalTypeService {

    constructor(private disposalTypeEndpoint: DisposalTypeEndpointService) {
    }

    getAll() {
        return Observable.forkJoin(
            this.disposalTypeEndpoint.getAllDisposalType<DisposalType[]>());
    }

    getById(assetDisposalTypeId: number) {
        return Observable.forkJoin(
            this.disposalTypeEndpoint.getdisposalTypeById<DisposalType>(assetDisposalTypeId)
        );
    }

    add(disposalType: DisposalType) {
        return this.disposalTypeEndpoint.addDisposalType<DisposalType>(disposalType);
    }

    update(disposalType: DisposalType) {
        return this.disposalTypeEndpoint.updateDisposalType<DisposalType>(disposalType);
    }

    remove(assetDisposalTypeId: number) {
        return this.disposalTypeEndpoint.removeDisposalTypeById(assetDisposalTypeId);
    }

    getDisposalAudit(assetDisposalTypeId: number) {
        return this.disposalTypeEndpoint.getDisposalAudit<any[]>(assetDisposalTypeId);
    }

}