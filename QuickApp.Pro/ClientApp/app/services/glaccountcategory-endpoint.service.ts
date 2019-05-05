import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class GLAccountCategoryEndpointservice extends EndpointFactory {


    private readonly _glaccountcategoryUrl: string = "/api/GLAccountCategory/Get";
    private readonly _glaccountcategoryUrlNew: string = "/api/GLAccountCategory/glaccountcategorypost";
    private readonly _glaccountcategoryUrlAuditHistory: string = "/api/GLAccountCategory/auditHistoryById";
    private readonly _auditUrl: string = '/api/GLAccountCategory/audits';
    

    get glaccountcategoryUrl() { return this.configurations.baseUrl + this._glaccountcategoryUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getGLaccountcategoryEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.glaccountcategoryUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getGLaccountcategoryEndpoint());
            });
    }
    getNewGatecodeEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._glaccountcategoryUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewGatecodeEndpoint(userObject));
            });
    }

    getEditGLAccountCategoryEndpoint<T>(GLAccountCategoryId?: number): Observable<T> {
        let endpointUrl = GLAccountCategoryId ? `${this._glaccountcategoryUrlNew}/${GLAccountCategoryId}` : this._glaccountcategoryUrlNew;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEditGLAccountCategoryEndpoint(GLAccountCategoryId));
            });
    }

    getUpdateGLAccountCategoryEndpoint<T>(roleObject: any, GLAccountCategoryId: number): Observable<T> {
        let endpointUrl = `${this._glaccountcategoryUrlNew}/${GLAccountCategoryId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateGLAccountCategoryEndpoint(roleObject, GLAccountCategoryId));
            });
    }

    getDeleteGLAccountCategoryEndpoint<T>(glAccountCategoryId: number): Observable<T> {
        let endpointUrl = `${this._glaccountcategoryUrlNew}/${glAccountCategoryId}`;

        return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeleteGLAccountCategoryEndpoint(glAccountCategoryId));
            });
    }
    getHistoryGLAccountCategoryEndpoint<T>(GLAccountCategoryId: number): Observable<T> {
        let endpointUrl = `${this._glaccountcategoryUrlAuditHistory}/${GLAccountCategoryId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getHistoryGLAccountCategoryEndpoint(GLAccountCategoryId));
            });
    }

    getGLAccountCategoryAuditDetails<T>(Id: number): Observable<T> {
        let endPointUrl = `${this._auditUrl}/${Id}`;

        return this.http.get<T>(endPointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getGLAccountCategoryAuditDetails(Id));
            });
    }

}
