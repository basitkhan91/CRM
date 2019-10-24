import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { GLAccountCategory } from '../../models/gl-account-category.model';
import { GLAccountCategoryEndpointService } from './gl-account-category-endpoint.service';
@Injectable()
export class GLAccountCategoryService {

    constructor(private endpointService: GLAccountCategoryEndpointService) {
    }

    getAll() {
        return Observable.forkJoin(
            this.endpointService.getAllItems<GLAccountCategory[]>()
        );
    }

    getById(id: number) {
        return Observable.forkJoin(
            this.endpointService.getItemById<GLAccountCategory>(id)
        );
    }

    add(item: GLAccountCategory) {
        return Observable.forkJoin(
            this.endpointService.addItem<GLAccountCategory>(item)
        );
    }

    update(item: GLAccountCategory) {
        return Observable.forkJoin(
            this.endpointService.updateItem<GLAccountCategory>(item)
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

    bulkUpload(file: any): Observable<object> {
        return this.endpointService.bulkItemUpload(file);
    }
}