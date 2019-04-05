import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { ConfigurationService } from '../configuration.service';
import { Observable } from 'rxjs';
import { EndpointFactory } from '../endpoint-factory.service';

@Injectable()
export class AssetEndpoint extends EndpointFactory  {

    private readonly _assetlistUrl: string = "/api/AssetModule/Get";
    private readonly _addAssetUrlNew: string = "/api/AssetModule/addAsset";
    private readonly _updateAssetUrl: string = "/api/AssetModule/updateAsset";

    get assetListurl() { return this.configurations.baseUrl + this._assetlistUrl; }
    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
        super(http, configurations, injector);
    }

    getNewAsset<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._addAssetUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewAsset(userObject));
            });
    }
    getAssetList<T>(): Observable<T> {

        return this.http.get<T>(this.assetListurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAssetList());
            });
    }
    updateAsset<T>(roleObject: any, assetRecordId: number): Observable<T> {
        //let endpointUrl = `${this._updateAssetUrl}/${roleObject.assetRecordId}`;

        return this.http.put<T>(this._updateAssetUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateAsset(roleObject, assetRecordId));
            });

    }
}