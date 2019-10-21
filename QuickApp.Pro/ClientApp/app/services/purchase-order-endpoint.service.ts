import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class PurchaseOrderEndpoint extends EndpointFactory {

    private readonly _purchaseOrderLiteUrl: string = "/api/PurchaseOrder/basic";

    get purchaseOrderBasicListUrl() { return this.configurations.baseUrl + this._purchaseOrderLiteUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getPurchaseOrderBasicList<T>(): Observable<T> {
        return this.http.get<T>(this._purchaseOrderLiteUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getPurchaseOrderBasicList());
            });
    }
}