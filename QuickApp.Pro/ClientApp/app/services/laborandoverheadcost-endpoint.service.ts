import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class laborAndOverheadCostEndpointservice extends EndpointFactory {


    private readonly _laborandoverheadcostUrl: string = "/api/LaborAndOverheadCost/Get";
    private readonly _laborandoverheadcostUrlNew: string = "/api/LaborAndOverheadCost/labourpost";
    private readonly _laborandoverheadcostUrlAuditHistory: string = "/api/LaborAndOverheadCost/auditHistoryById";
    private readonly _auditUrl: string = '/api/LaborAndOverheadCost/audits';



    get laborandoverheadcostUrl() { return this.configurations.baseUrl + this._laborandoverheadcostUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getLaborAndOverheadCostEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.laborandoverheadcostUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getLaborAndOverheadCostEndpoint());
            });
    }
    getNewLaborAndOverheadCostEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._laborandoverheadcostUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewLaborAndOverheadCostEndpoint(userObject));
            });
    }

    getEditLaborAndOverheadCostEndpoint<T>(LaborOverloadCostId?: number): Observable<T> {
        let endpointUrl = LaborOverloadCostId ? `${this._laborandoverheadcostUrlNew}/${LaborOverloadCostId}` : this._laborandoverheadcostUrlNew;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEditLaborAndOverheadCostEndpoint(LaborOverloadCostId));
            });
    }

    getUpdateLaborAndOverheadCostEndpoint<T>(roleObject: any, LaborOverloadCostId: number): Observable<T> {
        let endpointUrl = `${this._laborandoverheadcostUrlNew}/${LaborOverloadCostId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateLaborAndOverheadCostEndpoint(roleObject, LaborOverloadCostId));
            });
    }

    getDeleteLaborAndOverheadCostEndpoint<T>(LaborOverloadCostId: number): Observable<T> {
        let endpointUrl = `${this._laborandoverheadcostUrlNew}/${LaborOverloadCostId}`;

        return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeleteLaborAndOverheadCostEndpoint(LaborOverloadCostId));
            });
    }
    getHistoryLaborandOverheadCostEndpoint<T>(LaborOverloadCostId: number): Observable<T> {
        let endpointUrl = `${this._laborandoverheadcostUrlAuditHistory}/${LaborOverloadCostId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getHistoryLaborandOverheadCostEndpoint(LaborOverloadCostId));
            });
    }

    getHistoryLaborandOverheadCostAuditDetails<T>(Id: number): Observable<T> {
        let endpointUrl = `${this._auditUrl}/${Id}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getHistoryLaborandOverheadCostAuditDetails(Id));
            });
    }

}
