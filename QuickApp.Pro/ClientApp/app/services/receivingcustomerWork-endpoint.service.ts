
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class ReceivingCustomerWorkEndpoint extends EndpointFactory {


	private readonly _actionsUrl: string = "/api/ReceivingCustomerWork/Get";
	private readonly _actionsUrlNew: string = "/api/ReceivingCustomerWork/receivingCustomerWork";
	private readonly _actionsUpdateUrlNew: string = "/api/ReceivingCustomerWork/UpdatereceivingCustomerWork";
	private readonly _actionDeleteUrlNew: string = "/api/ReceivingCustomerWork/deletereceivingCustomerWork";
	private readonly _actionsUrlAuditHistory: string = "/api/ReceivingCustomerWork/auditHistoryById";

	// private readonly _workflowActionsNewUrl: string = "/api/WorkflowAction/Get";
	// private readonly _actionsUrlNew: string = "/api/Action/actions";
	get actionsUrl() { return this.configurations.baseUrl + this._actionsUrl; }

	constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

		super(http, configurations, injector);
	}

	getReasonEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this.actionsUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getReasonEndpoint());
			});
	}
	getNewReasonEndpoint<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._actionsUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewReasonEndpoint(userObject));
			});
	}

	getHistoryReasonEndpoint<T>(receivingCustomerWorkId: number): Observable<T> {
		let endpointUrl = `${this._actionsUrlAuditHistory}/${receivingCustomerWorkId}`;

		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getHistoryReasonEndpoint(receivingCustomerWorkId));
			});
	}

	getEditReasonEndpoint<T>(receivingCustomerWorkId?: number): Observable<T> {
		let endpointUrl = receivingCustomerWorkId ? `${this._actionsUrlNew}/${receivingCustomerWorkId}` : this._actionsUrlNew;

		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getEditReasonEndpoint(receivingCustomerWorkId));
			});
	}

	getUpdateReasonEndpoint<T>(roleObject: any, receivingCustomerWorkId: number): Observable<T> {
		let endpointUrl = `${this._actionsUpdateUrlNew}/${receivingCustomerWorkId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdateReasonEndpoint(roleObject, receivingCustomerWorkId));
			});
	}

	getDeleteReasonEndpoint<T>(receivingCustomerWorkId: number): Observable<T> {
		let endpointUrl = `${this._actionDeleteUrlNew}/${receivingCustomerWorkId}`;

		return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getDeleteReasonEndpoint(receivingCustomerWorkId));
			});
	}


}


