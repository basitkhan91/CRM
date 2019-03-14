
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class TaxTypeEndpointService extends EndpointFactory {


	private readonly _taxTypeUrl: string = "/api/TaxType/Get";
	private readonly _taxTypeUrlNew: string = "/api/TaxType/taxType";
	private readonly _taxTypeUrlAuditHistory: string = "/api/TaxType/auditHistoryById";

	get taxTypeUrl() { return this.configurations.baseUrl + this._taxTypeUrl; }

	constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

		super(http, configurations, injector);
	}

	getTaxTypeEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this.taxTypeUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getTaxTypeEndpoint());
			});
	}

	getHistoryTaxTypeEndpoint<T>(taxTypeId: number): Observable<T> {
		let endpointUrl = `${this._taxTypeUrlAuditHistory}/${taxTypeId}`;

		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getHistoryTaxTypeEndpoint(taxTypeId));
			});
	}


	getNewTaxTypeEndpoint<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._taxTypeUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewTaxTypeEndpoint(userObject));
			});
	}

	getEditTaxTypeEndpoint<T>(taxTypeId?: number): Observable<T> {
		let endpointUrl = taxTypeId ? `${this._taxTypeUrlNew}/${taxTypeId}` : this._taxTypeUrlNew;

		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getEditTaxTypeEndpoint(taxTypeId));
			});
	}

	getUpdateTaxTypeEndpoint<T>(roleObject: any, taxTypeId: number): Observable<T> {
		let endpointUrl = `${this._taxTypeUrlNew}/${taxTypeId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdateTaxTypeEndpoint(roleObject, taxTypeId));
			});
	}

	getDeleteTaxTypeEndpoint<T>(taxTypeId: number): Observable<T> {
		let endpointUrl = `${this._taxTypeUrlNew}/${taxTypeId}`;

		return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getDeleteTaxTypeEndpoint(taxTypeId));
			});
	}



}