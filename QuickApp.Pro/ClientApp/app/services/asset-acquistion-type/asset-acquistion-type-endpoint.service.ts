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
import { AssetAcquistionType } from '../../models/asset-acquistion-type.model';

@Injectable()
export class AssetAcquistionTypeEndpointService extends EndpointFactory {

    private readonly getAllURL: string = "/api/assetacquistion/getAll";
    private readonly getByIdURL: string = "/api/assetacquistion/getById";
    private readonly addURL: string = "/api/assetacquistion/add";
    private readonly updateURL: string = "/api/assetacquistion/update";
    private readonly removeByIdURL: string = "/api/assetacquistion/removeById";
    private readonly updateForActive: string = "/api/assetacquistion/updateActive";
    private readonly getAssetAuditById: string = "/api/assetacquistion/assetacquistionauditdetails";
    private readonly excelUpload: string = "/api/assetacquistion/UploadAssetAcquistionTypeCustomData";


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

    addAsset<T>(asset: AssetAcquistionType): Observable<T> {
        let endpointUrl = this.add;

        return this.http.post<T>(endpointUrl, JSON.stringify(asset), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addAsset(asset));
            });
    }

    updateAsset<T>(assetAcquistionType: AssetAcquistionType): Observable<T> {
        let endpointUrl = this.update;

        return this.http.post<T>(endpointUrl, JSON.stringify(assetAcquistionType), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateAsset(assetAcquistionType));
            });
    }

    removeAssetById<T>(assetId: number): Observable<T> {
        let endpointUrl = `${this.removeById}/${assetId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.removeAssetById(assetId));
            });
    }

    getUpdateForActive<T>(roleObject: any, id: number): Observable<T> {
        let endpointUrl = `${this.updateForActive}/${id}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateForActive(roleObject, id));
            });
    }

    getAssetAcquistionTypeAuditById<T>(assetId: number): Observable<T> {
        let endpointUrl = `${this.getAssetAuditById}/${assetId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAssetAcquistionTypeAuditById(assetId));
            });
    }

    AssetAcquistionTypeCustomUpload(file) {
        return this.http.post(`${this.configurations.baseUrl}${this.excelUpload}`, file)


    }
    
}