import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class PurchaseOrderEndpoint extends EndpointFactory {

    private readonly _purchaseOrderLiteUrl: string = "/api/PurchaseOrder/basic";
    private readonly _poByIdUrl: string = "/api/purchaseorder/pobyid";
    private readonly _saveCreatePOApproval: string = "/api/purchaseorder/createpoapprover";
    private readonly _updatePOApproval: string = "/api/purchaseorder/updatepoapprover";

    get purchaseOrderBasicListUrl() { return this.configurations.baseUrl + this._purchaseOrderLiteUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getPurchaseOrderBasicList<T>(): Observable<T> {
        return this.http.get<T>(this._purchaseOrderLiteUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getPurchaseOrderBasicList());
            });
    }
    /*vendor PO*/
    getVendorPOById<T>(Id: number): Observable<T> {
		let endPointUrl = `${this._poByIdUrl}?purchaseOrderId=${Id}`;
	
		return this.http.get<T>(endPointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getVendorPOById(Id));
			});
    }

    saveCreatePOApproval<T>(param: any): Observable<any> {
		let body = JSON.stringify(param);
		let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
		return this.http.post(this._saveCreatePOApproval, body, this.getRequestHeaders())
			.map((response: Response) => {
				return <any>response;

			}).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	updatePOApproval<T>(param: any): Observable<any> {
		let body = JSON.stringify(param);
		let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
		return this.http.post(this._updatePOApproval, body, this.getRequestHeaders())
			.map((response: Response) => {
				return <any>response;

			}).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getPOApproverList(purchaseOrderId) {
		return this.http.get<any>(`${this.configurations.baseUrl}/api/purchaseorder/poapproverslist?purchaseOrderId=${purchaseOrderId}`)
    }
    
    getPurchaseOrderPartsById(purchaseOrderId) {
		return this.http.get<any>(`${this.configurations.baseUrl}/api/purchaseorder/purchaseorderparts?purchaseOrderId=${purchaseOrderId}`)
	}
    /* ./vendor PO*/
}