import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';
import { GlAccount } from '../../models/GlAccount.model';

@Injectable()
export class GlAccountEndpointService extends EndpointFactory {

    private readonly getAllURL: string = "/api/GlAccount/getAll";
    private readonly getByIdURL: string = "/api/GlAccount/getById";
    private readonly addURL: string = "/api/GlAccount/add";
    private readonly updateURL: string = "/api/GlAccount/update";
    private readonly removeByIdURL: string = "/api/GlAccount/removeById";

    private readonly getMiscdataURL: string = '/api/GlAccount/getMiscData';

    get getAll() { return this.configurations.baseUrl + this.getAllURL; }
    get getById() { return this.configurations.baseUrl + this.getByIdURL; }
    get add() { return this.configurations.baseUrl + this.addURL; }
    get update() { return this.configurations.baseUrl + this.updateURL; }
    get removeById() { return this.configurations.baseUrl + this.removeByIdURL; }
    get getMiscdata() { return this.configurations.baseUrl + this.getMiscdataURL; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getAllGlAccounts<T>(): Observable<T> {
        let endpointUrl = this.getAll;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllGlAccounts());
            });
    }

    getGlAccountById<T>(glAccountId: number): Observable<T> {
        let endpointUrl = `${this.getById}/${glAccountId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getGlAccountById(glAccountId));
            });
    }

    addGlAccount<T>(glAccount: GlAccount): Observable<T> {
        let endpointUrl = this.add;

        return this.http.post<T>(endpointUrl, JSON.stringify(glAccount), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addGlAccount(glAccount));
            });
    }

    updateGlAccount<T>(glAccount: GlAccount): Observable<T> {
        let endpointUrl = this.update;

        return this.http.post<T>(endpointUrl, JSON.stringify(glAccount), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateGlAccount(glAccount));
            });
    }

    removeGlAccountById<T>(glAccountId: number): Observable<T> {
        let endpointUrl = `${this.removeById}/${glAccountId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.removeGlAccountById(glAccountId));
            });
    }
    getMiscData<T>(): Observable<T> {
        let endpointUrl = this.getMiscdata;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getMiscData());
            });
    }
}