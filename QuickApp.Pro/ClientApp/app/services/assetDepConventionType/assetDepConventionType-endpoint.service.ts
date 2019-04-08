// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';
import { AssetDepConventionType } from '../../models/assetDepConventionType.model';

@Injectable()
export class AssetDepConventionTypeEndpointService extends EndpointFactory {

    private readonly getAllURL: string = "/api/assetDepConventionType/getAll";
    private readonly getByIdURL: string = "/api/assetDepConventionType/getById";
    private readonly addURL: string = "/api/assetDepConventionType/add";
    private readonly updateURL: string = "/api/assetDepConventionType/update";
    private readonly removeByIdURL: string = "/api/assetDepConventionType/removeById";



    get getAll() { return this.configurations.baseUrl + this.getAllURL; }
    get getById() { return this.configurations.baseUrl + this.getByIdURL; }
    get add() { return this.configurations.baseUrl + this.addURL; }
    get update() { return this.configurations.baseUrl + this.updateURL; }
    get removeById() { return this.configurations.baseUrl + this.removeByIdURL; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getAllAssetDeps<T>(): Observable<T> {
        let endpointUrl = this.getAll;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllAssetDeps());
            });
    }

    getAssetDepById<T>(assetDepConventionTypeId: number): Observable<T> {
        let endpointUrl = `${this.getById}/${assetDepConventionTypeId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAssetDepById(assetDepConventionTypeId));
            });
    }

    addAssetDep<T>(asset: AssetDepConventionType): Observable<T> {
        let endpointUrl = this.add;

        return this.http.post<T>(endpointUrl, JSON.stringify(asset), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addAssetDep(asset));
            });
    }

    updateAssetDep<T>(assetDepConventionType: AssetDepConventionType): Observable<T> {
        let endpointUrl = this.update;

        return this.http.post<T>(endpointUrl, JSON.stringify(assetDepConventionType), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateAssetDep(assetDepConventionType));
            });
    }

    removeAssetDepById<T>(assetDepConventionTypeId: number): Observable<T> {
        let endpointUrl = `${this.removeById}/${assetDepConventionTypeId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.removeAssetDepById(assetDepConventionTypeId));
            });
    }

}