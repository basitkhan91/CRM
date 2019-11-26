import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { ConfigurationService } from '../configuration.service';
import { Observable } from 'rxjs';
import { EndpointFactory } from '../endpoint-factory.service';

@Injectable()
export class AssetEndpoint extends EndpointFactory  {

    private readonly _assetlistUrl: string = "/api/AssetModule/Get";
    private readonly _allAssetlistUrl: string = "/api/AssetModule/GetAll";
    private readonly _addAssetUrlNew: string = "/api/AssetModule/addAsset";
    private readonly removeByIdURL: string = "/api/AssetModule/removeById";
    private readonly _updateAssetUrl: string = "/api/AssetModule/updateAsset";
    private readonly _capabilityListUrl: string = "/api/AssetModule/GetCapes";
    private readonly _getCapabilityUrl: string = "/api/AssetModule/capabilityGet";
    private readonly getAuditById: string = "/api/AssetModule/audits";
    private readonly capesPost: string = "/api/AssetModule/Mancapespost";
    private readonly addassetcapes: string = "/api/AssetModule/addAssetCapes";

    get allAssetListURL() { return this.configurations.baseUrl + this._allAssetlistUrl; }
    get assetListurl() { return this.configurations.baseUrl + this._assetlistUrl; }
    get removeById() { return this.configurations.baseUrl + this.removeByIdURL; }
    get capabilityTypeListUrl() { return this.configurations.baseUrl + this._capabilityListUrl; }
    get getCapabilityUrl() { return this.configurations.baseUrl + this._getCapabilityUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
        super(http, configurations, injector);
    }


    getAllAssetList<T>(): Observable<T> {

        return this.http.get<T>(this.allAssetListURL, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllAssetList());
            });
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

    addNewAssetCapesInfo<T>(data: any): Observable<T> {
        return this.http.post<T>(this.addassetcapes, JSON.stringify(data), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addNewAssetCapesInfo(data));
            });
    }


    getCapabilityTypeListEndpoint<T>(assetRecordId): Observable<T> {
        let endpointUrl = `${this.capabilityTypeListUrl}/${assetRecordId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCapabilityTypeListEndpoint(assetRecordId));
            });
    }


    getCapabilityDataEndpoint<T>(assetRecordId: any): Observable<T> {
        let url = `${this.getCapabilityUrl}/${assetRecordId}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCapabilityDataEndpoint(assetRecordId));
            });
    }

    //Audit method in end pont services

    //getAudit<T>(assetRecordId: number): Observable<T> {
    //    let endpointUrl = `${this.getAuditById}/${assetRecordId}`;

    //    return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getAudit(assetRecordId));
    //        });
    //}
}