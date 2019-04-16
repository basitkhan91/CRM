﻿import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { ConfigurationService } from '../configuration.service';
import { Observable } from 'rxjs';
import { EndpointFactory } from '../endpoint-factory.service';

@Injectable()
export class AssetEndpoint extends EndpointFactory  {

    private readonly _assetlistUrl: string = "/api/AssetModule/Get";
    private readonly _addAssetUrlNew: string = "/api/AssetModule/addAsset";
    private readonly removeByIdURL: string = "/api/AssetModule/removeById";
    private readonly _updateAssetUrl: string = "/api/AssetModule/updateAsset";
    private readonly _capabilityListUrl: string = "/api/AssetModule/capabilityTypeList";

    private readonly capesPost: string = "/api/AssetModule/Mancapespost";

    get assetListurl() { return this.configurations.baseUrl + this._assetlistUrl; }
    get removeById() { return this.configurations.baseUrl + this.removeByIdURL; }
    get capabilityTypeListUrl() { return this.configurations.baseUrl + this._capabilityListUrl; }

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


    removeAssetById<T>(assetRecordId: number): Observable<T> {
        let endpointUrl = `${this.removeById}/${assetRecordId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.removeAssetById(assetRecordId));
            });
    }

    //For Capes Saving//
    saveAssetCapesInfo<T>(data: any): Observable<T> {
        return this.http.post<T>(this.capesPost, JSON.stringify(data), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.saveAssetCapesInfo(data));
            });
    }


    getCapabilityTypeListEndpoint<T>(): Observable<T> {
        return this.http.get<T>(this.capabilityTypeListUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCapabilityTypeListEndpoint());
            });
    }
}