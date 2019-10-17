import { EndpointFactory } from './endpoint-factory.service';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class PercentageEndpoint extends EndpointFactory {
    private readonly _percentageUrl: string = "/api/percentage/Get";
    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getPercentageEndpoint<T>(): Observable<T> {
        return this.http.get<T>(this._percentageUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getPercentageEndpoint());
            });
    }
}