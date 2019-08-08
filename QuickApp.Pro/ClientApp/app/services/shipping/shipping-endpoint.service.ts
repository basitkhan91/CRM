import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../configuration.service';
import { Observable } from 'rxjs';
import { EndpointFactory } from '../endpoint-factory.service';

@Injectable()
export class ShippingEndpoint extends EndpointFactory {

    private readonly _shippingReferenceUrl: string = "/api/Shipping/GetShippingReference";
    private readonly _shippingViaUrl: string = "/api/Shipping/getShippingVia";
    private readonly _shippingAccountUrl: string = "/api/Shipping/getShippingAccount";
    
    get ShippingRefenceURL() { return this.configurations.baseUrl + this._shippingReferenceUrl; }
    get ShippingViaURL() { return this.configurations.baseUrl + this._shippingViaUrl; }
    get ShippingAccountURL() { return this.configurations.baseUrl + this._shippingAccountUrl; }
    
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
}