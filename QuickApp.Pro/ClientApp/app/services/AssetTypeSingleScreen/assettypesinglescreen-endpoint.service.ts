import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';
import { AssetIntangibleTypeSingleScreen } from '../../models/assetIntangibleTypeSingleScreen.model';
import { AssetTypeSingleScreen } from '../../models/assettypesinglescreen.model';

@Injectable()
export class AssetTypeSingleScreenEndpointService extends EndpointFactory {

    private readonly getAllURL: string = "/api/AssetType/getAll";
    private readonly getByIdURL: string = "/api/AssetType/getById";
    private readonly addURL: string = "/api/AssetType/add";
    private readonly updateURL: string = "/api/AssetType/update";
    private readonly removeByIdURL: string = "/api/AssetType/removeById";
    private readonly getAuditById: string = "/api/AssetType/audits";

    get getAll() { return this.configurations.baseUrl + this.getAllURL; }
    get getById() { return this.configurations.baseUrl + this.getByIdURL; }
    get add() { return this.configurations.baseUrl + this.addURL; }
    get update() { return this.configurations.baseUrl + this.updateURL; }
    get removeById() { return this.configurations.baseUrl + this.removeByIdURL; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getAllAssetTypes<T>(): Observable<T> {
        let endpointUrl = this.getAll;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllAssetTypes());
            });
    }

    getAssetTypeById<T>(assetTypeSingleScreenId: number): Observable<T> {
        let endpointUrl = `${this.getById}/${assetTypeSingleScreenId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAssetTypeById(assetTypeSingleScreenId));
            });
    }

    addAssetType<T>(assetTypeSingleScreen: AssetTypeSingleScreen): Observable<T> {
        let endpointUrl = this.add;

        return this.http.post<T>(endpointUrl, JSON.stringify(assetTypeSingleScreen), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addAssetType(assetTypeSingleScreen));
            });
    }

    updateAssetType<T>(assetTypeSingleScreen: AssetTypeSingleScreen): Observable<T> {
        let endpointUrl = this.update;

        return this.http.post<T>(endpointUrl, JSON.stringify(assetTypeSingleScreen), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateAssetType(assetTypeSingleScreen));
            });
    }

    removeAssetTypeById<T>(assetTypeSingleScreenId: number): Observable<T> {
        let endpointUrl = `${this.removeById}/${assetTypeSingleScreenId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.removeAssetTypeById(assetTypeSingleScreenId));
            });
    }

    getAudit<T>(assetTypeSingleScreenId: number): Observable<T> {
        let endpointUrl = `${this.getAuditById}/${assetTypeSingleScreenId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAudit(assetTypeSingleScreenId));
            });
    }
}