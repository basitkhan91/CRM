import { Injectable, Injector } from '@angular/core';
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
    private readonly addURL: string = "/api/dashnumber/add";
    private readonly updateURL: string = "/api/dashnumber/update";
    private readonly removeByIdURL: string = "/api/dashnumber/removeById";
    private readonly updateForActive: string = "/api/dashnumber/updateActive";
    private readonly getDashNumberAuditById: string = "/api/dashnumber/audits";


    get getAll() { return this.configurations.baseUrl + this.getAllURL; }
    get getById() { return this.configurations.baseUrl + this.getByIdURL; }
    get add() { return this.configurations.baseUrl + this.addURL; }
    get update() { return this.configurations.baseUrl + this.updateURL; }
    get removeById() { return this.configurations.baseUrl + this.removeByIdURL; }

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

}