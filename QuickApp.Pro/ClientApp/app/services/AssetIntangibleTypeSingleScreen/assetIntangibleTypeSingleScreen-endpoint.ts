import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';
import { AssetIntangibleTypeSingleScreen } from '../../models/assetIntangibleTypeSingleScreen.model';

@Injectable()
export class AssetIntangibleTypeSingleScreenEndpointService extends EndpointFactory {

    private readonly getAllURL: string = "/api/AssetIntangible/getAll";
    private readonly getByIdURL: string = "/api/AssetIntangible/getById";
    private readonly addURL: string = "/api/AssetIntangible/add";
    private readonly updateURL: string = "/api/AssetIntangible/update";
    private readonly removeByIdURL: string = "/api/AssetIntangible/removeById";
    private readonly getAuditById: string = "/api/AssetIntangible/audits";


    get getAll() { return this.configurations.baseUrl + this.getAllURL; }
    get getById() { return this.configurations.baseUrl + this.getByIdURL; }
    get add() { return this.configurations.baseUrl + this.addURL; }
    get update() { return this.configurations.baseUrl + this.updateURL; }
    get removeById() { return this.configurations.baseUrl + this.removeByIdURL; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getAllAssetIntangible<T>(): Observable<T> {
        let endpointUrl = this.getAll;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllAssetIntangible());
            });
    }

    getAssetIntangibleById<T>(assetIntangibleTypeSingleId: number): Observable<T> {
        let endpointUrl = `${this.getById}/${assetIntangibleTypeSingleId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAssetIntangibleById(assetIntangibleTypeSingleId));
            });
    }

    addAssetIntangible<T>(assetIntangibleTypeSingleScreen: AssetIntangibleTypeSingleScreen): Observable<T> {
        let endpointUrl = this.add;

        return this.http.post<T>(endpointUrl, JSON.stringify(assetIntangibleTypeSingleScreen), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addAssetIntangible(assetIntangibleTypeSingleScreen));
            });
    }

    updateAssetIntangible<T>(assetIntangibleTypeSingleScreen: AssetIntangibleTypeSingleScreen): Observable<T> {
        let endpointUrl = this.update;

        return this.http.post<T>(endpointUrl, JSON.stringify(assetIntangibleTypeSingleScreen), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateAssetIntangible(assetIntangibleTypeSingleScreen));
            });
    }

    removeAssetIntangibleById<T>(assetIntangibleTypeSingleId: number): Observable<T> {
        let endpointUrl = `${this.removeById}/${assetIntangibleTypeSingleId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.removeAssetIntangibleById(assetIntangibleTypeSingleId));
            });
    }

    getAssetIntangibleAudit<T>(assetIntangibleTypeSingleId: number): Observable<T> {
        let endpointUrl = `${this.getAuditById}/${assetIntangibleTypeSingleId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAssetIntangibleAudit(assetIntangibleTypeSingleId));
            });
    }
}