
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';



@Injectable()
export class AssetTypeEndpointService extends EndpointFactory {


    private readonly getAllURL: string = "/api/AssetType/getAllAssetTypes";
    private readonly addURL: string = "/api/AssetType/addAssetType";
    private readonly updateURL: string = "/api/AssetType/update";
    private readonly removeByIdURL: string = "/api/AssetType/removeAssetTypeById";
    get getAll() { return this.configurations.baseUrl + this.getAllURL; }
    get removeById() { return this.configurations.baseUrl + this.removeByIdURL; }
    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getAllAssets<T>(): Observable<T> {

        return this.http.get<T>(this.getAll, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllAssets());
            });
    }

    addAssetType<T>(assetObj: any): Observable<T> {

        return this.http.post<T>(this.addURL, JSON.stringify(assetObj), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addAssetType(assetObj));
            });
    }

    editAssetType<T>(assetTypeId?: number): Observable<T> {
        let endpointUrl = assetTypeId ? `${this.addURL}/${assetTypeId}` : this.addURL;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.editAssetType(assetTypeId));
            });
    }

    updateAssetType<T>(assetObj: any): Observable<T> {
        let endpointUrl = this.updateURL; 

        return this.http.put<T>(endpointUrl, JSON.stringify(assetObj), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateAssetType(assetObj));
            });
    }

    deleteAssetType<T>(assetTypeId: number): Observable<T> {
        let endpointUrl = `${this.removeById}/${assetTypeId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.deleteAssetType(assetTypeId));
            });
    }


    
}