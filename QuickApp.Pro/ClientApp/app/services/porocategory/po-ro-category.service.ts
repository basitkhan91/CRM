import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { POROCategory } from '../../models/po-ro-category.model';
import { POROCategoryEndpoint } from './po-ro-category-endpoint.service';

@Injectable()
export class POROCategoryService {

    constructor(private POROCategoryEndpointService: POROCategoryEndpoint) {
    }

    getAll() {
        return Observable.forkJoin(
            this.POROCategoryEndpointService.getAllPOROCategory<POROCategory[]>());
    }

    getById(poroCategoryId: number) {
        return Observable.forkJoin(
            this.POROCategoryEndpointService.getPOROCategoryById<POROCategory>(poroCategoryId)
        );
    }

    add(POROCategory: POROCategory) {
        return this.POROCategoryEndpointService.addPOROCategory<POROCategory>(POROCategory);
    }

    update(poroCategory: POROCategory) {
        return this.POROCategoryEndpointService.updatePOROCategory<POROCategory>(poroCategory);
    }

    remove(poroCategoryId: number) {
        return this.POROCategoryEndpointService.removePOROCategoryById(poroCategoryId);
    }

    getAudit(poroCategoryId: number) {
        return this.POROCategoryEndpointService.getAudit<any[]>(poroCategoryId);
    }
}