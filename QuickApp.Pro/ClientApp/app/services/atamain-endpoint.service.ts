﻿
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class ATAMainEndpoint extends EndpointFactory {


    private readonly _actionsUrl: string = "/api/ATAMain/Get";
    private readonly _actionsUrlNew: string = "/api/ATAMain/actions";
	private readonly _actionsUrlAuditHistory: string = "/api/ATAMain/ataauditHistoryById";
    private readonly getAtaChapterDataAuditById: string = "/api/ATAMain/audits";
    private readonly getATAUrl: string = "/api/ATAMain/GetATASUBS_BY_ATAMain_ID";
    private readonly getMultiATAUrl: string = "/api/ATAMain/GetMultiATASUBSBYATAMainID";
    private readonly deleteATAURL: string = "/api/ATAMain/deleteATAMAIN";
    
    get actionsUrl() { return this.configurations.baseUrl + this._actionsUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getATAMainEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.actionsUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getATAMainEndpoint());
            });
    }
    getNewATAMainEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._actionsUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewATAMainEndpoint(userObject));
            });
    }
        getHistoryATAMainEndpoint<T>(ataChapterId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlAuditHistory}/${ataChapterId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getHistoryATAMainEndpoint(ataChapterId));
            });
    }

    getEditATAMainEndpoint<T>(ataChapterId?: number): Observable<T> {
        let endpointUrl = ataChapterId ? `${this._actionsUrlNew}/${ataChapterId}` : this._actionsUrlNew;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEditATAMainEndpoint(ataChapterId));
            });
    }

    getUpdateATAMainEndpoint<T>(roleObject: any, ataChapterId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlNew}/${ataChapterId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateATAMainEndpoint(roleObject, ataChapterId));
            });
    }

    getDeleteATAMainEndpoint<T>(ataChapterId: number): Observable<T> {
        let endpointUrl = `${this.deleteATAURL}/${ataChapterId}`;

        return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeleteATAMainEndpoint(ataChapterId));
            });
    }

    
    getAtaChapterAuditById<T>(ataChapterId: number): Observable<T> {
        let endpointUrl = `${this.getAtaChapterDataAuditById}/${ataChapterId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAtaChapterAuditById(ataChapterId));
            });
    }

    getATASubByID<T>(Chid: number): Observable<T> {
        let endpointUrl = `${this.getATAUrl}/${Chid}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getATASubByID(Chid));
            });
    }

    getMultiATASubByID<T>(Chapterids: string): Observable<T> {
        let endpointUrl = `${this.getMultiATAUrl}/${Chapterids}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getMultiATASubByID(Chapterids));
            });
    }
    
   
}