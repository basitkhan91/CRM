import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../configuration.service';
import { Observable } from 'rxjs';
import { EndpointFactory } from '../endpoint-factory.service';
import { PurchaseOrderPart, PurchaseOrder, StockLine, ReceiveParts } from '../../components/receiving/po-ro/receivng-po/PurchaseOrder.model';

@Injectable()
export class ShippingEndpoint extends EndpointFactory {

    private readonly _shippingReferenceUrl: string = "/api/Shipping/GetShippingReference";
    private readonly _shippingViaUrl: string = "/api/Shipping/getShippingVia";
    private readonly _shippingAccountUrl: string = "/api/Shipping/getShippingAccount";
    private readonly _receivePartsUrl: string = "/api/receivingPart/receiveParts";

    get ShippingRefenceURL() { return this.configurations.baseUrl + this._shippingReferenceUrl; }
    get ShippingViaURL() { return this.configurations.baseUrl + this._shippingViaUrl; }
    get ShippingAccountURL() { return this.configurations.baseUrl + this._shippingAccountUrl; }
    get ReceivePartsURL() { return this.configurations.baseUrl + this._receivePartsUrl; }
    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
        super(http, configurations, injector);
    }

    getAllShippingReference<T>(): Observable<T> {

        return this.http.get<T>(this.ShippingRefenceURL, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllShippingReference<T>());
            });
    }

    getAllShippingVia<T>(): Observable<T> {

        return this.http.get<T>(this.ShippingViaURL, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllShippingVia<T>());
            });
    }

    getAllShippingAccount<T>(): Observable<T> {

        return this.http.get<T>(this.ShippingAccountURL, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllShippingAccount<T>());
            });
    }

    receiveParts<T>(receiveParts: ReceiveParts[]): Observable<T> {
        var listObj = [];

        for (let part of receiveParts) {
            let Obj = {
                'purchaseOrderPartRecordId': part.purchaseOrderPartRecordId,
                'stockLines': part.stockLines,
                'timeLife': part.timeLife
                //'stockLineId': stockLine.stockLineId,part
                //'partNumber': stockLine.partNumber,
                //'stockLineNumber': stockLine.stockLineNumber,
                //'stocklineMatchKey': stockLine.stocklineMatchKey,
                //'controlNumber': stockLine.controlNumber,
                //'itemMasterId': stockLine.itemMasterId,
                //'quantity': stockLine.quantity,
                //'quantityRejected': stockLine.quantityRejected,
                //'conditionId': stockLine.conditionId,
                //'serialNumber': stockLine.serialNumber,
                //'shelfLife': stockLine.shelfLife,
                //'shelfLifeExpirationDate': stockLine.shelfLifeExpirationDate,
                //'siteId': stockLine.siteId,
                //'shelfId': stockLine.shelfId,
                //'binId': stockLine.binId,
                //'warehouseId': stockLine.warehouseId,
                //'locationId': stockLine.locationId,
                //'obtainFrom': stockLine.obtainFrom,
                //'owner': stockLine.owner,
                //'traceableTo': stockLine.traceableTo,
                //'manufacturerId': stockLine.manufacturerId,
                //'manufacturer': stockLine.manufacturer,
                //'manufacturerLotNumber': stockLine.manufacturerLotNumber,
                //'manufacturingDate': stockLine.manufacturingDate,
                //'expirationDate': stockLine.expirationDate,
                //'manufacturingBatchNumber': stockLine.manufacturingBatchNumber,
                //'partCertificationNumber': stockLine.partCertificationNumber,
                //'certifiedBy': stockLine.certifiedBy,
                //'certifiedDate': stockLine.certifiedDate,
                //'tagDate': stockLine.tagDate,
                //'tagType': stockLine.tagType,
                //'certifiedDueDate': stockLine.certifiedDueDate,
                //'calibrationMemo': stockLine.calibrationMemo,
                //'orderDate': stockLine.orderDate,
                //'purchaseOrderId': stockLine.purchaseOrderId,
                //'purchaseOrderUnitCost': stockLine.purchaseOrderUnitCost,
                //'purchaseOrderExtendedCost': stockLine.purchaseOrderExtendedCost,
                //'inventoryUnitCost': stockLine.inventoryUnitCost,
                //'repairOrderId': stockLine.repairOrderId,
                //'repairOrderUnitCost': stockLine.repairOrderUnitCost,
                //'receivedDate': stockLine.receivedDate,
                //'receiverNumber': stockLine.receiverNumber,
                //'reconciliationNumber': stockLine.reconciliationNumber,
                //'unitSalesPrice': stockLine.unitSalesPrice,
                //'coreUnitCost': stockLine.coreUnitCost,
                //'gLAccountId': stockLine.gLAccountId,
                //'assetId': stockLine.assetId,
                //'isHazardousMaterial': stockLine.isHazardousMaterial,
                //'isPMA': stockLine.isPMA,
                //'isDER': stockLine.isDER,
                //'oEM': stockLine.oEM,
                //'memo': stockLine.memo,
                //'managementStructureEntityId': stockLine.managementStructureEntityId,
                //'timeLifeCyclesId': stockLine.timeLifeCyclesId,
                //'site': stockLine.site,
                //'shelf': stockLine.shelf,
                //'bin': stockLine.bin,
                //'obtainFromType': stockLine.obtainFromType,
                //'ownerType': stockLine.ownerType,
                //'traceableToType': stockLine.traceableToType,
                //'timeLife': stockLine.timeLife,
                //'timeLifeId': stockLine.timeLifeId,
                //'unitCostAdjustmentReasonTypeId': stockLine.unitCostAdjustmentReasonTypeId,
                //'unitSalePriceAdjustmentReasonTypeId': stockLine.unitSalePriceAdjustmentReasonTypeId,
                //'masterCompanyId': stockLine.masterCompanyId,
                //'companyId': stockLine.companyId,
                //'businessUnitId': stockLine.businessUnitId,
                //'divisionId': stockLine.divisionId,
                //'departmentId': stockLine.departmentId,
                //'quantityToReceive': stockLine.quantityToReceive,
                //'isSerialized': stockLine.isSerialized,
                //'idNumber': stockLine.idNumber,
                //'aircraftTailNumber': stockLine.aircraftTailNumber,
                //'shippingReferenceId': stockLine.shippingReferenceId,
                //'shippingViaId': stockLine.shippingViaId,
                //'shippingAccountId': stockLine.shippingAccountId,
                //'engineSerialNumber': stockLine.engineSerialNumber,
                //'createdDate': stockLine.createdDate
            };

            listObj.push(Obj);
        }

        return this.http.post<T>(this.ReceivePartsURL, JSON.parse(JSON.stringify(listObj)) , this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.receiveParts(receiveParts));
            });

    }
}