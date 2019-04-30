import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class GLAccountClassEndpoint extends EndpointFactory {


	private readonly _glaccountclassUrl: string = "/api/GlAccountClass/Get";
	private readonly _glaccountclassUrlNew: string = "/api/GlAccountClass/glaccountclasspost";
    private readonly _glaccountclassUrlAuditHistory: string = "/api/GlAccountClass/auditHistoryById";
    private readonly getGlById: string = "/api/GlAccountClass/audits";

	get glaccountclassUrl() { return this.configurations.baseUrl + this._glaccountclassUrl; }

	constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

		super(http, configurations, injector);
	}

	getGLAccountclassEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this.glaccountclassUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getGLAccountclassEndpoint());
			});
	}
	getNewGatecodeEndpoint<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._glaccountclassUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewGatecodeEndpoint(userObject));
			});
	}

	getEditGLAccountClassEndpoint<T>(GLAccountClassId?: number): Observable<T> {
		let endpointUrl = GLAccountClassId ? `${this._glaccountclassUrlNew}/${GLAccountClassId}` : this._glaccountclassUrlNew;

		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getEditGLAccountClassEndpoint(GLAccountClassId));
			});
	}

	getUpdateGLAccountClassEndpoint<T>(roleObject: any, glAccountClassId: number): Observable<T> {
		let endpointUrl = `${this._glaccountclassUrlNew}/${glAccountClassId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdateGLAccountClassEndpoint(roleObject, glAccountClassId));
			});
	}

	getDeleteGLAccountClassIdEndpoint<T>(glAccountClassId: number): Observable<T> {
		let endpointUrl = `${this._glaccountclassUrlNew}/${glAccountClassId}`;

		return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getDeleteGLAccountClassIdEndpoint(glAccountClassId));
			});
	}
	getHistoryGLAccountClassIdEndpoint<T>(glAccountClassId: number): Observable<T> {
		let endpointUrl = `${this._glaccountclassUrlAuditHistory}/${glAccountClassId}`;

		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getHistoryGLAccountClassIdEndpoint(glAccountClassId));
			});
    }
    getGlAccountAudit<T>(glAccountClassId: number): Observable<T> {
        let endpointUrl = `${this.getGlById}/${glAccountClassId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getGlAccountAudit(glAccountClassId));
            });
    }

}