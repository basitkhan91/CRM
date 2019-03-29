import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';

@Injectable()
export class NodeSetupEndpointService extends EndpointFactory {

    private readonly getAllURL: string = "/api/nodesetup/getAll";
    private readonly getByIdURL: string = "/api/nodesetup/getById";
    private readonly addURL: string = "/api/nodesetup/add";
    private readonly updateURL: string = "/api/nodesetup/update";
    private readonly removeByIdURL: string = "/api/nodesetup/removeById";



    get getAll() { return this.configurations.baseUrl + this.getAllURL; }
    get getById() { return this.configurations.baseUrl + this.getByIdURL; }
    get add() { return this.configurations.baseUrl + this.addURL; }
    get update() { return this.configurations.baseUrl + this.updateURL; }
    get removeById() { return this.configurations.baseUrl + this.removeByIdURL; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getAllAssets<T>(): Observable<T> {
        let endpointUrl = this.getAll;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllAssets());
            });
    }

    getAssetById<T>(assetId: number): Observable<T> {
        let endpointUrl = `${this.getById}/${assetId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAssetById(assetId));
            });
    }

    addAsset<T>(asset: AssetStatus): Observable<T> {
        let endpointUrl = this.add;

        return this.http.post<T>(endpointUrl, JSON.stringify(asset), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addAsset(asset));
            });
    }

    updateAsset<T>(assetStatus: AssetStatus): Observable<T> {
        let endpointUrl = this.update;

        return this.http.post<T>(endpointUrl, JSON.stringify(assetStatus), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateAsset(assetStatus));
            });
    }

    removeAssetById<T>(assetId: number): Observable<T> {
        let endpointUrl = `${this.removeById}/${assetId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.removeAssetById(assetId));
            });
    }

}