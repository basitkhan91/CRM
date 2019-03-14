
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';
import { ActionAttribute } from '../models/actionattribute.model';

@Injectable()
export class ActionAttributeEndpointService extends EndpointFactory {


    private readonly _actionsattributeUrl: string = "/api/ActionAttribute/Get";
    private readonly _actionsattributeUrlNew: string = "/api/ActionAttribute/actionsattributepost";
    private readonly _actionsUrlAuditHistory: string = "/api/ActionAttribute/auditHistoryById";



    get actionattributesUrl() { return this.configurations.baseUrl + this._actionsattributeUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getActionattributeEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.actionattributesUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getActionattributeEndpoint());
            });
    }
    getNewGatecodeEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._actionsattributeUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewGatecodeEndpoint(userObject));
            });
    }

    getEditActionEndpoint<T>(actionId?: number): Observable<T> {
        let endpointUrl = actionId ? `${this._actionsattributeUrlNew}/${actionId}` : this._actionsattributeUrlNew;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEditActionEndpoint(actionId));
            });
    }

    getUpdateActionEndpoint<T>(roleObject: any, actionId: number): Observable<T> {
        let endpointUrl = `${this._actionsattributeUrlNew}/${actionId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateActionEndpoint(roleObject, actionId));
            });
    }

    getDeleteActionEndpoint<T>(actionId: number): Observable<T> {
        let endpointUrl = `${this._actionsattributeUrlNew}/${actionId}`;

        return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeleteActionEndpoint(actionId));
            });
    }
    getHistoryActionEndpoint<T>(actionId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlAuditHistory}/${actionId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getHistoryActionEndpoint(actionId));
            });
    }
   
}