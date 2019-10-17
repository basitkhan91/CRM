import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class PercentEndpoint extends EndpointFactory {

    private readonly _currencyUrl: string = "/api/percent/getall";

    get GetPercentURL() { return this.configurations.baseUrl + this._currencyUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getAllPercentages<T>(): Observable<T> {

        return this.http.get<T>(this.GetPercentURL, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllPercentages());
            });
    }
}