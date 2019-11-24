﻿
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';



@Injectable()
export class ReceivingEndpointService extends EndpointFactory {


    private readonly getAllURL: string = "/api/AssetType/getAllAssetTypes";
    private readonly addURL: string = "/api/AssetType/addAssetType";
    private readonly updateURL: string = "/api/AssetType/update";
    private readonly removeByIdURL: string = "/api/AssetType/removeAssetTypeById";
    private readonly itemMasterDataById: string = "/api/receivingPart/getById";
    private readonly receivingPurchaseOrderDataById: string = "/api/receivingPart/GetReceivingPurchaseList";
    private readonly receivingPurchaseOrderDataForEditById: string = "/api/receivingPart/GetReceivingPurchaseForEdit";
    private readonly receivingPurchaseOrderDataForViewById: string = "/api/receivingPart/GetReceivingPurchaseForView";
    private readonly addStocklineMapperData: string = "/api/receivingPart/addStocklineMapperData";

    get getAll() { return this.configurations.baseUrl + this.getAllURL; }
    get removeById() { return this.configurations.baseUrl + this.removeByIdURL; }
    get itemMasterDataGet() { return this.configurations.baseUrl + this.itemMasterDataById; }
    get receivingPurchaseOrderDataGet() { return this.configurations.baseUrl + this.receivingPurchaseOrderDataById; }
    get receivingPurchaseOrderForEditDataGet() { return this.configurations.baseUrl + this.receivingPurchaseOrderDataForEditById; }
    get receivingPurchaseOrderForViewDataGet() { return this.configurations.baseUrl + this.receivingPurchaseOrderDataForViewById; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getAllReceivingData<T>(): Observable<T> {

        return this.http.get<T>(this.getAll, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllReceivingData());
            });
    }

    addReceivingData<T>(assetObj: any): Observable<T> {

        return this.http.post<T>(this.addURL, JSON.stringify(assetObj), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addReceivingData(assetObj));
            });
    }

    editReceivingData<T>(assetTypeId?: number): Observable<T> {
        let endpointUrl = assetTypeId ? `${this.addURL}/${assetTypeId}` : this.addURL;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.editReceivingData(assetTypeId));
            });
    }

    updateReceivingData<T>(assetObj: any): Observable<T> {
        let endpointUrl = this.updateURL;

        return this.http.put<T>(endpointUrl, JSON.stringify(assetObj), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateReceivingData(assetObj));
            });
    }

    deleteReceivingData<T>(assetTypeId: number): Observable<T> {
        let endpointUrl = `${this.removeById}/${assetTypeId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.deleteReceivingData(assetTypeId));
            });
    }
    

    getItemMasterDataById<T>(itemid: any): Observable<T> {
        let url = `${this.itemMasterDataGet}/${itemid}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getItemMasterDataById(itemid));
            });
    }

    getReceivingPODataById<T>(receivingId: any): Observable<T> {
        let url = `${this.receivingPurchaseOrderDataGet}/${receivingId}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getReceivingPODataById(receivingId));
            });
    }

    getReceivingPODataForEditById<T>(receivingId: any): Observable<T> {

        let url = `${this.receivingPurchaseOrderForEditDataGet}/${receivingId}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getReceivingPODataForEditById(receivingId));
            });
    }

    getReceivingPurchaseForView<T>(receivingId: any): Observable<T> {

        let url = `${this.receivingPurchaseOrderForViewDataGet}/${receivingId}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getReceivingPurchaseForView(receivingId));
            });
    }

    addPartStocklineMapper<T>(mapperObject: any): Observable<T>
    {
        debugger;
        return this.http.post<T>(this.addStocklineMapperData, JSON.stringify(mapperObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addPartStocklineMapper(mapperObject));
            });
    }

    getReceivingRODataById(repairOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/receivingPart/GetReceivingRepairList/${repairOrderId}`)
    }

    getReceivingROHeaderById(repairOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/receivingRO/getRepairOrderHeaderById/${repairOrderId}`)
    }


}