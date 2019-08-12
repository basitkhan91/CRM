import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../configuration.service';
import { Observable } from 'rxjs';
import { EndpointFactory } from '../endpoint-factory.service';
import { PurchaseOrderPart, PurchaseOrder } from '../../components/receiving/po-ro/receivng-po/PurchaseOrder.model';

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

    receiveParts<T>(purchaseOrder: PurchaseOrder): Observable<T> {
        let Obj = {
            'purchaseOrderId': purchaseOrder.purchaseOrderId,
            'PurchaseOrderNumber': purchaseOrder.purchaseOrderNumber,
            'ManagementStructureId': purchaseOrder.managementStructureId,
            'PurchaseOderPart': purchaseOrder.purchaseOderPart,
        };

        return this.http.post<T>(this.ReceivePartsURL, JSON.parse(JSON.stringify(Obj)), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.receiveParts(purchaseOrder));
            });
    }
}