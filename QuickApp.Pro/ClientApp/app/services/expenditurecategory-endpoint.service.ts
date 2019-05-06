import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class ExpenditureCategoryEndpoint extends EndpointFactory {


    private readonly _actionsUrl: string = "/api/ExpenditureCategory/Get";
    private readonly _actionsUrlNew: string = "/api/ExpenditureCategory/expenditurecategory";
    private readonly _actionsUrlNewAuditHistory: string = "/api/ExpenditureCategory/auditHistoryById";
    private readonly getExpenditureCategoryAuditById: string = "/api/ExpenditureCategory/audits";

    get actionsUrl() { return this.configurations.baseUrl + this._actionsUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getExpenditureCategoryEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.actionsUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getExpenditureCategoryEndpoint());
            });
    }

    getNewExpenditureCategoryEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._actionsUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewExpenditureCategoryEndpoint(userObject));
            });
    }

    getEditExpenditureCategoryEndpoint<T>(expenditurecategoryId?: number): Observable<T> {
        let endpointUrl = expenditurecategoryId ? `${this._actionsUrlNew}/${expenditurecategoryId}` : this._actionsUrlNew;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEditExpenditureCategoryEndpoint(expenditurecategoryId));
            });
    }

    getUpdateExpenditureCategoryEndpoint<T>(roleObject: any, expenditurecategoryId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlNew}/${expenditurecategoryId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateExpenditureCategoryEndpoint(roleObject, expenditurecategoryId));
            });
    }

    getDeleteExpenditureCategoryEndpoint<T>(expenditurecategoryId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlNew}/${expenditurecategoryId}`;

        return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeleteExpenditureCategoryEndpoint(expenditurecategoryId));
            });
    }
    getHistoryExpenditureCategoryEndpoint<T>(expenditurecategoryId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlNewAuditHistory}/${expenditurecategoryId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getHistoryExpenditureCategoryEndpoint(expenditurecategoryId));
            });
    }

    
    getExpenditureAuditById<T>(expenditurecategoryId: number): Observable<T> {
        let endpointUrl = `${this.getExpenditureCategoryAuditById}/${expenditurecategoryId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getExpenditureAuditById(expenditurecategoryId));
            });
    }
}