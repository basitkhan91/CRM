
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class CurrencyEndpoint extends EndpointFactory {


    private readonly _currencyUrl: string = "/api/Currency/Get";
    // private readonly _workflowActionsNewUrl: string = "/api/WorkflowAction/Get";
    private readonly _currencyPostUrl: string = "/api/Currency/CurrencyPost";
    private readonly _actionsUrlNewAuditHistory: string = "/api/Currency/auditHistoryById";
    get CurrencyUrl() { return this.configurations.baseUrl + this._currencyUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getCurrencyEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.CurrencyUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCurrencyEndpoint());
            });
    }
    getNewCurrencyEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._currencyPostUrl, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewCurrencyEndpoint(userObject));
            });
    }
    getEditcurrencyEndpoint<T>(currencyId?: number): Observable<T> {
        let endpointUrl = currencyId ? `${this._currencyPostUrl}/${currencyId}` : this._currencyPostUrl;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEditcurrencyEndpoint(currencyId));
            });
    }

    getUpdatecurrencyEndpoint<T>(roleObject: any, currencyId: number): Observable<T> {
        let endpointUrl = `${this._currencyPostUrl}/${currencyId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdatecurrencyEndpoint(roleObject, currencyId));
            });
    }
    getDeletecurrencyEndpoint<T>(actionId: number): Observable<T> {
        let endpointUrl = `${this._currencyPostUrl}/${actionId}`;

        return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeletecurrencyEndpoint(actionId));
            });
    }
    getHistorycurrencyEndpoint<T>(actionId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlNewAuditHistory}/${actionId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getHistorycurrencyEndpoint(actionId));
            });
    }


}