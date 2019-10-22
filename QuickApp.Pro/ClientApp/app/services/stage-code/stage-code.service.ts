import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { StageCode } from '../../models/stage-code.model';
import { StageCodeEndpointService } from './stage-code-endpoint.service';
import { AuditHistory } from '../../models/audithistory.model';
@Injectable()
export class StageCodeService {

    constructor(private endpointService: StageCodeEndpointService) {
    }

    getAll() {
        return Observable.forkJoin(
            this.endpointService.getAllItems<StageCode[]>()
        );
    }

    getById(id: number) {
        return Observable.forkJoin(
            this.endpointService.getItemById<StageCode>(id)
        );
    }

    add(item: StageCode) {
        return Observable.forkJoin(
            this.endpointService.addItem<StageCode>(item)
        );
    }

    update(item: StageCode) {
        return Observable.forkJoin(
            this.endpointService.updateItem<StageCode>(item)
        );
    }

    remove(id: number) {
        return Observable.forkJoin(
            this.endpointService.removeItemById(id)
        );
    }

    getItemAuditById(id: number) {
        return Observable.forkJoin(
            this.endpointService.getItemAudit<any[]>(id)
        );
    }
}