﻿
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class UnitOfMeasureEndpoint extends EndpointFactory {


    private readonly _actionsUrl: string = "/api/UnitOfMeasure/Get";
    private readonly _actionsUrlNew: string = "/api/UnitOfMeasure/unitofmeasure";
    private readonly _actionsUrlAuditHistory: string = "/api/UnitOfMeasure/auditHistoryById";
    private readonly getUnitOfMeasureAuditDataById: string = "/api/UnitOfMeasure/audits";


    get actionsUrl() { return this.configurations.baseUrl + this._actionsUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getUnitOfMeasureEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.actionsUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUnitOfMeasureEndpoint());
            });
    }
    getNewUnitOfMeasureEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._actionsUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewUnitOfMeasureEndpoint(userObject));
            });
    }

    getHistoryUnitOfMeasureEndpoint<T>(unitofmeasureId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlAuditHistory}/${unitofmeasureId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getHistoryUnitOfMeasureEndpoint(unitofmeasureId));
            });
    }

    getEditUnitOfMeasureEndpoint<T>(unitofmeasureId?: number): Observable<T> {
        let endpointUrl = unitofmeasureId ? `${this._actionsUrlNew}/${unitofmeasureId}` : this._actionsUrlNew;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEditUnitOfMeasureEndpoint(unitofmeasureId));
            });
    }

    getUpdateUnitOfMeasureEndpoint<T>(roleObject: any, unitofmeasureId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlNew}/${unitofmeasureId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateUnitOfMeasureEndpoint(roleObject, unitofmeasureId));
            });
    }

    getDeleteUnitOfMeasureEndpoint<T>(unitofmeasureId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlNew}/${unitofmeasureId}`;

        return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeleteUnitOfMeasureEndpoint(unitofmeasureId));
            });
    }

    getUnitOfMeasureAuditById<T>(assetId: number): Observable<T> {
        let endpointUrl = `${this.getUnitOfMeasureAuditDataById}/${assetId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUnitOfMeasureAuditById(assetId));
            });
    }


}


