
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class PublicationEndpointService extends EndpointFactory {


    private readonly _publicationGetUrl: string = "/api/Publication/Get";
    private readonly _publicationUrlNew: string = "/api/Publication/publicationpost";
    private readonly _actionsUrlAuditHistory: string = "/api/Publication/auditHistoryById";
    private readonly getPublicationAuditById: string = "/api/Publication/audits";
    private readonly getDash: string = "/api/Publication/GetDashNoByID";
    private readonly getATAUrl: string = "/api/Publication/GetATASUBS";
    
    get getCodeUrl() { return this.configurations.baseUrl + this._publicationGetUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getpublicationEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.getCodeUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getpublicationEndpoint());
            });
    }

    getNewpublicationEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._publicationUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewpublicationEndpoint(userObject));
            });
    }

    getEditActionEndpoint<T>(actionId?: number): Observable<T> {
        let endpointUrl = actionId ? `${this._publicationUrlNew}/${actionId}` : this._publicationUrlNew;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEditActionEndpoint(actionId));
            });
    }

    getUpdateActionEndpoint<T>(roleObject: any, actionId: any): Observable<T> {
        let endpointUrl = `${this._publicationUrlNew}/${actionId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateActionEndpoint(roleObject, actionId));
            });
    }

    getDeleteActionEndpoint<T>(actionId: number): Observable<T> {
        let endpointUrl = `${this._publicationUrlNew}/${actionId}`;

        return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeleteActionEndpoint(actionId));
            });
    }
    getHistoryActionEndpoin<T>(actionId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlAuditHistory}/${actionId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getHistoryActionEndpoin(actionId));
            });
    }

    getPublincationAuditById<T>(publicationId: number): Observable<T> {
        let endpointUrl = `${this.getPublicationAuditById}/${publicationId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getPublincationAuditById(publicationId));
            });
    }
    getDashNumberById<T>(Mid: string, Tid: number): Observable<T> {
        let endpointUrl = `${this.getDash}/${Mid}/${Tid}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDashNumberById(Mid,Tid));
            });
    }
    getATASubByID<T>(Mid: number, Tid: number): Observable<T> {
        let endpointUrl = `${this.getATAUrl}/${Mid}/${Tid}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getATASubByID(Mid, Tid));
            });
    }
}