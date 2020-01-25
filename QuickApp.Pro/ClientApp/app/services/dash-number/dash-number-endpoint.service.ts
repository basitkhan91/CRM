﻿import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';
import { AircraftDashNumber } from '../../models/dashnumber.model';

@Injectable()
export class DashNumberEndpointService extends EndpointFactory {

    private readonly getAllURL: string = "/api/dashnumber/getAll";
    private readonly getByIdURL: string = "/api/dashnumber/getById";
    private readonly getAllModelIDURL: string = "/api/dashnumber/getByModelId";
    private readonly addURL: string = "/api/dashnumber/add";
    private readonly updateURL: string = "/api/dashnumber/update";
    private readonly removeByIdURL: string = "/api/dashnumber/removeById";
    private readonly updateForActive: string = "/api/dashnumber/updateActive";
    private readonly getDashNumberAuditById: string = "/api/dashnumber/audits";
    private readonly getDashNumber: string = "/api/dashnumber/pagination";
    private readonly getDashListByIdsURL: string = "/api/dashnumber/getDashListByModel_Type_Dash_IDS";
    private readonly getDash: string = "/api/dashnumber/GetDashNoBy_Model_TypeID";
    private readonly getCapesDash: string = "/api/dashnumber/GetCapesDashNoBy_Model_TypeID";
    private readonly getDashListByMultiIdsURL: string = "/api/dashnumber/getDashListBy_MUTLI_MID_TID_DID";

    get getAll() { return this.configurations.baseUrl + this.getAllURL; }
    get getByModelId() { return this.configurations.baseUrl + this.getAllModelIDURL; }
    get getById() { return this.configurations.baseUrl + this.getByIdURL; }
    get add() { return this.configurations.baseUrl + this.addURL; }
    get update() { return this.configurations.baseUrl + this.updateURL; }
    get removeById() { return this.configurations.baseUrl + this.removeByIdURL; }
    get paginate() { return this.configurations.baseUrl + this.getDashNumber; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getAllDashNumbers<T>(): Observable<T> {
        let endpointUrl = this.getAll;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllDashNumbers());
            });
    }

    getDashNumberById<T>(dashNumberId: number): Observable<T> {
        let endpointUrl = `${this.getById}/${dashNumberId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDashNumberById(dashNumberId));
            });
    }

    getDashNumberByModelId<T>(AircraftModelId: number): Observable<T> {
        let endpointUrl = `${this.getByModelId}/${AircraftModelId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDashNumberByModelId(AircraftModelId));
            });
    }

    addDashNumber<T>(dashNumber: AircraftDashNumber): Observable<T> {
        let endpointUrl = this.add;

        return this.http.post<T>(endpointUrl, JSON.stringify(dashNumber), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addDashNumber(dashNumber));
            });
    }

    updateDashNumber<T>(dashNumberStatus: AircraftDashNumber): Observable<T> {
        let endpointUrl = this.update;

        return this.http.post<T>(endpointUrl, JSON.stringify(dashNumberStatus), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateDashNumber(dashNumberStatus));
            });
    }

    removeDashNumberById<T>(dashNumberId: number): Observable<T> {
        let endpointUrl = `${this.removeById}/${dashNumberId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.removeDashNumberById(dashNumberId));
            });
    }

    getUpdateForActive<T>(roleObject: any, id: number): Observable<T> {
        let endpointUrl = `${this.updateForActive}/${id}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateForActive(roleObject, id));
            });
    }

    getDashNumberStatusAuditById<T>(dashNumberId: number): Observable<T> {
        let endpointUrl = `${this.getDashNumberAuditById}/${dashNumberId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDashNumberStatusAuditById(dashNumberId));
            });
    }
    getAircraftDashNumberRecords<T>(paginationOption: any): Observable<T> {
        let endpointUrl = this.paginate;
        return this.http.post<T>(endpointUrl, JSON.stringify(paginationOption), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAircraftDashNumberRecords(paginationOption));
            });
    }
    getDASHLISTByID<T>(Mid: string, Tid: number, Did: string): Observable<T> {
        let endpointUrl = `${this.getDashListByIdsURL}/${Mid}/${Tid}/${Did}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDASHLISTByID(Mid, Tid, Did));
            });
    }
    getDashNumberByModelTypeId<T>(Mid: string, Tid: string): Observable<T> {
        let endpointUrl = `${this.getDash}/${Mid}/${Tid}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDashNumberByModelTypeId(Mid, Tid));
            });
    }
    getCapesDashNumberByModelTypeId<T>(Mid: string, Tid: string): Observable<T> {
        let endpointUrl = `${this.getCapesDash}/${Mid}/${Tid}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCapesDashNumberByModelTypeId(Mid, Tid));
            });
    }
    getDASHLISTBy_MultiID<T>(Mid: string, Tid: number, Did: string): Observable<T> {
        let endpointUrl = `${this.getDashListByMultiIdsURL}/${Mid}/${Tid}/${Did}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDASHLISTBy_MultiID(Mid, Tid, Did));
            });
    }
}