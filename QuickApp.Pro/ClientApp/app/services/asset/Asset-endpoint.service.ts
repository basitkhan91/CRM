import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { ConfigurationService } from '../configuration.service';
import { Observable } from 'rxjs';
import { EndpointFactory } from '../endpoint-factory.service';

@Injectable()
export class AssetEndpoint extends EndpointFactory {

    private readonly _assetlistUrl: string = "/api/AssetModule/Get";
    private readonly _allAssetlistUrl: string = "/api/AssetModule/GetAll";
    private readonly _addAssetUrlNew: string = "/api/AssetModule/addAsset";
    private readonly removeByIdURL: string = "/api/AssetModule/removeById";
    private readonly removeCapByIdURL: string = "/api/AssetModule/removeCapesById";
    private readonly _updateAssetUrl: string = "/api/AssetModule/updateAsset";
    private readonly _capabilityListUrl: string = "/api/AssetModule/GetCapes";
    private readonly _getCapabilityUrl: string = "/api/AssetModule/capabilityGet";
    private readonly _getAssetCapabilityUrl: string = "/api/AssetModule/AssetcapabilityGet";
    private readonly getAuditById: string = "/api/AssetModule/audits";
    private readonly capesPost: string = "/api/AssetModule/Mancapespost";
    private readonly addassetcapes: string = "/api/AssetModule/addAssetCapes";
    private readonly _updatecapesUrl: string = "/api/AssetModule/updatecapes";
    private readonly _getAssetUrl: string = "/api/AssetModule/GetAsset";
    private readonly _getAssetcapesUrl: string = "/api/AssetModule/GetAssetCapesAudit";
    private readonly _assetwarrantystatusListurl: string = "/api/AssetModule/GetWarrantyStatus";

    get allAssetListURL() { return this.configurations.baseUrl + this._allAssetlistUrl; }
    get assetListurl() { return this.configurations.baseUrl + this._assetlistUrl; }
    get removeById() { return this.configurations.baseUrl + this.removeByIdURL; }
    get removeCapesById() { return this.configurations.baseUrl + this.removeCapByIdURL; }
    get capabilityTypeListUrl() { return this.configurations.baseUrl + this._capabilityListUrl; }
    get getCapabilityUrl() { return this.configurations.baseUrl + this._getCapabilityUrl; }
    get getAsetCapabilityUrl() { return this.configurations.baseUrl + this._getAssetCapabilityUrl; }
    get getAssetUrl() { return this.configurations.baseUrl + this._getAssetUrl; }
    get getAssetcapesUrl() { return this.configurations.baseUrl + this._getAssetcapesUrl; }


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

    getByAssetIdDataEndpoint<T>(assetId: any): Observable<T> {
        let url = `${this.getAssetUrl}/${assetId}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getByAssetIdDataEndpoint(assetId));
            });
    }
    getAssetCapesAuditById<T>(assetcapesId: any): Observable<T> {
        let url = `${this.getAssetcapesUrl}/${assetcapesId}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAssetCapesAuditById(assetcapesId));
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


    removeAssetCapesById<T>(assetCapesById: number): Observable<T> {
        let endpointUrl = `${this.removeCapesById}/${assetCapesById}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.removeAssetCapesById(assetCapesById));
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

    getAssetCapabilityDataEndpoint<T>(assetCapesId: any): Observable<T> {
        let url = `${this.getAsetCapabilityUrl}/${assetCapesId}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAssetCapabilityDataEndpoint(assetCapesId));
            });
    }

    getAssetsById(assetRecordId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/workorderassetview?assetRecordId=${assetRecordId}`, this.getRequestHeaders());
    }

    updateCapes<T>(roleObject: any, assetCapesId: number): Observable<T> {
        return this.http.put<T>(this._updatecapesUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateCapes(roleObject, assetCapesId));
            });
    }

    getAssetWarrantyStatus<T>(): Observable<T> {

        return this.http.get<T>(this._assetwarrantystatusListurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAssetWarrantyStatus());
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