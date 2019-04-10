
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';



@Injectable()
export class AssetIntangibleTypeEndpointService extends EndpointFactory {


    private readonly getAllURL: string = "/api/AssetIntangibleType/getAllIntangibleTypes";
    private readonly getByIdURL: string = "/api/AssetIntangibleType/getById";
    private readonly addURL: string = "/api/AssetIntangibleType/addintangibleType";
    private readonly updateURL: string = "/api/AssetIntangibleType/update";
    private readonly removeglId: string = "/api/AssetIntangibleType/removeintangibleTypeById";

    get getAll() { return this.configurations.baseUrl + this.getAllURL; }
    get getById() { return this.configurations.baseUrl + this.getByIdURL; }
    get add() { return this.configurations.baseUrl + this.addURL; }
    get update() { return this.configurations.baseUrl + this.updateURL; }
    get removeintangibleType() { return this.configurations.baseUrl + this.removeglId; }


    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getAllintangibleTypes<T>(): Observable<T> {
        let endpointUrl = this.getAll;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllintangibleTypes());
            });
    }

    getintangibleTypeById<T>(intangibleTypeId: number): Observable<T> {
        let endpointUrl = `${this.getById}/${intangibleTypeId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getintangibleTypeById(intangibleTypeId));
            });
    }

    addintangibleType<T>(intangibleType: any): Observable<T> {
        let endpointUrl = this.add;

        return this.http.post<T>(endpointUrl, JSON.stringify(intangibleType), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addintangibleType(intangibleType));
            });
    }

    updateintangibleType<T>(intangibleType: any): Observable<T> {
        let endpointUrl = this.update;

        return this.http.put<T>(endpointUrl, JSON.stringify(intangibleType), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateintangibleType(intangibleType));
            });
    }

    removeintangibleTypeById<T>(assetIntangibleTypeId: number): Observable<T> {
        let endpointUrl = `${this.removeintangibleType}/${assetIntangibleTypeId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.removeintangibleTypeById(assetIntangibleTypeId));
            });
    }
   
}