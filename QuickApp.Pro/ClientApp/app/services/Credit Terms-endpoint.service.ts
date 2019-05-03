﻿import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class CreditTermsEndpoint extends EndpointFactory {


    private readonly _creditermsUrl: string = "/api/CreditTerms/Get";
    private readonly _credittermsPosturl: string = "/api/CreditTerms/Creditermspost";
    private readonly _actionsUrlNewAuditHistory: string = "/api/CreditTerms/auditHistoryById";
    private readonly getCreditTermsAuditById: string = "/api/CreditTerms/audits";

    get creditermsUrl() { return this.configurations.baseUrl + this._creditermsUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getCreditTermsEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.creditermsUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCreditTermsEndpoint());
            });
    }
    getNewCreditermEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._credittermsPosturl, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewCreditermEndpoint(userObject));
            });
    }
    getEditcredittermsEndpoint<T>(credittermsId?: number): Observable<T> {
        let endpointUrl = credittermsId ? `${this._credittermsPosturl}/${credittermsId}` : this._credittermsPosturl;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEditcredittermsEndpoint(credittermsId));
            });
    }

    getUpdatecredittermsEndpoint<T>(roleObject: any, credittermsId: number): Observable<T> {
        let endpointUrl = `${this._credittermsPosturl}/${credittermsId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdatecredittermsEndpoint(roleObject, credittermsId));
            });
    }
    getDeletecredittermsEndpoint<T>(actionId: number): Observable<T> {
        let endpointUrl = `${this._credittermsPosturl}/${actionId}`;

        return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeletecredittermsEndpoint(actionId));
            });
    }

    getHistorycredittermsEndpoint<T>(actionId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlNewAuditHistory}/${actionId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getHistorycredittermsEndpoint(actionId));
            });
    }

    
    getCreaditTermsAuditById<T>(creditTermId: number): Observable<T> {
        let endpointUrl = `${this.getCreditTermsAuditById}/${creditTermId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCreaditTermsAuditById(creditTermId));
            });
    }
}