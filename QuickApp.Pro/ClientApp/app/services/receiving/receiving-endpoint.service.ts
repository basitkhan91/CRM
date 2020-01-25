﻿
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';
import { ReceiveParts, StockLine } from '../../components/receiving/repair-order/receiving-ro/RepairOrder.model';


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
    private readonly _receivePartsUrl: string = "/api/receivingro/receiveParts";
    private readonly _updateStockLinesUrl: string = "/api/receivingro/UpdateStockLines";
    private readonly _createStockLinesUrl: string = "/api/receivingPart/CreateStockLine";

    get getAll() { return this.configurations.baseUrl + this.getAllURL; }
    get removeById() { return this.configurations.baseUrl + this.removeByIdURL; }
    get itemMasterDataGet() { return this.configurations.baseUrl + this.itemMasterDataById; }
    get receivingPurchaseOrderDataGet() { return this.configurations.baseUrl + this.receivingPurchaseOrderDataById; }
    get receivingPurchaseOrderForEditDataGet() { return this.configurations.baseUrl + this.receivingPurchaseOrderDataForEditById; }
    get receivingPurchaseOrderForViewDataGet() { return this.configurations.baseUrl + this.receivingPurchaseOrderDataForViewById; }
    get ReceivePartsURL() { return this.configurations.baseUrl + this._receivePartsUrl; }
    get UpdateStockLinesURL() { return this.configurations.baseUrl + this._updateStockLinesUrl; }
    get CreateStockLinesURL() { return this.configurations.baseUrl + this._createStockLinesUrl; }

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

    getReceivingPOHeaderById(purchaseOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/receivingpart/getPurchaseOrderHeaderById/${purchaseOrderId}`)
    }

    getReceivingPOPartsForViewById(repairOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/receivingPart/GetReceivePOPartsForSummary/${repairOrderId}`)
    }

    getReceivingRODataById(repairOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/receivingPart/GetReceivingRepairList/${repairOrderId}`)
    }

    getReceivingROHeaderById(repairOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/receivingRO/getRepairOrderHeaderById/${repairOrderId}`)
    }

    getReceivingROPartById(repairOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/receivingro/getRepairOrderPartById/${repairOrderId}`)
    }

    receiveParts<T>(receiveParts: ReceiveParts[]): Observable<T> {
        var listObj = [];

        for (let part of receiveParts) {
            let Obj = {
                'repairOrderPartRecordId': part.repairOrderPartRecordId,
                'stockLines': part.stockLines,
                'timeLife': part.timeLife
            };

            listObj.push(Obj);
        }

        return this.http.post<T>(this.ReceivePartsURL, JSON.parse(JSON.stringify(listObj)), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.receiveParts(receiveParts));
            });

    }

    getReceivingROPartsForViewById(repairOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/receivingro/GetReceieveROPartsForView/${repairOrderId}`)
    }

    getReceivingROPartsForEditById(repairOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/receivingro/GetReceieveROPartsForEdit/${repairOrderId}`)
    }

    updateStockLine<T>(receiveParts: ReceiveParts[]): Observable<T> {
        var listObj = [];

        for (let part of receiveParts) {
            let stockLines: StockLine[] = [];

            part.stockLines.forEach(SL => {
                var stockLine = new StockLine();

                stockLine.stockLineNumber = SL.stockLineNumber;
                stockLine.owner = SL.owner;
                stockLine.ownerType = SL.ownerType;
                stockLine.obtainFrom = SL.obtainFrom;
                stockLine.obtainFromType = SL.obtainFromType;
                stockLine.traceableTo = SL.traceableTo;
                stockLine.traceableToType = SL.traceableToType;
                stockLine.engineSerialNumber = SL.engineSerialNumber;
                stockLine.shippingAccount = SL.shippingAccount;
                stockLine.shippingReference = SL.shippingReference;
                stockLine.shippingViaId = SL.shippingViaId;
                stockLine.partCertificationNumber = SL.partCertificationNumber;
                stockLine.stockLineId = SL.stockLineId;
                stockLine.conditionId = SL.conditionId;
                stockLine.quantityRejected = 0;
                stockLine.repairOrderUnitCost = SL.repairOrderUnitCost;
                stockLine.repairOrderExtendedCost = SL.repairOrderExtendedCost;
                stockLine.manufacturingTrace = SL.manufacturingTrace;
                stockLine.manufacturerLotNumber = SL.manufacturerLotNumber;
                stockLine.manufacturingDate = SL.manufacturingDate;
                stockLine.manufacturingBatchNumber = SL.manufacturingBatchNumber;

                stockLine.certifiedDate = SL.certifiedDate;
                stockLine.certifiedBy = SL.certifiedBy;
                stockLine.tagDate = SL.tagDate;
                stockLine.expirationDate = SL.expirationDate;
                stockLine.certifiedDueDate = SL.certifiedDueDate;
                stockLine.managementStructureEntityId = SL.managementStructureEntityId;
                stockLine.siteId = SL.siteId;
                stockLine.warehouseId = SL.warehouseId;
                stockLine.locationId = SL.locationId;
                stockLine.shelfId = SL.shelfId;
                stockLine.binId = SL.binId;

                stockLines.push(stockLine);
            });
            let Obj = {
                'repairOrderPartRecordId': part.repairOrderPartRecordId,
                'stockLines': stockLines,
                'timeLife': part.timeLife,
            };

            listObj.push(Obj);
        }

        return this.http.post<T>(this.UpdateStockLinesURL, JSON.parse(JSON.stringify(listObj)), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateStockLine(receiveParts));
            });
    }

    CreateStockLine(purchaseOrderId: any) {
        let url = `${this.CreateStockLinesURL}/${purchaseOrderId}`;
        return this.http.get<any>(url);
    }
}