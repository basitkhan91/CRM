﻿import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';
import { StageCode } from '../../models/stage-code.model';

@Injectable()
export class StageCodeEndpointService extends EndpointFactory {

    private readonly item: string = "StageCode";
    private readonly id: number;
    private readonly getAllItemsEndPointTemplate: string = "getAll";
    private readonly getItemByIdEndPointTemplate: string = "getById";
    private readonly addItemEndPointTemplate: string = "add";
    private readonly updateItemEndPointTemplate: string = "update";
    private readonly removeItemByIdEndPointTemplate: string = "removeById";
    private readonly getItemAuditByIdEndPointTemplate: string = "audit";


    get getAll() { return `${this.configurations.baseUrl}/api/${this.item}/${this.getAllItemsEndPointTemplate}`; }
    get getById() { return `${this.configurations.baseUrl}/api/${this.item}/${this.getItemByIdEndPointTemplate}`; }
    get add() { return `${this.configurations.baseUrl}/api/${this.item}/${this.addItemEndPointTemplate}`; }
    get update() { return `${this.configurations.baseUrl}/api/${this.item}/${this.updateItemEndPointTemplate}`; }
    get removeById() { return `${this.configurations.baseUrl}/api/${this.item}/${this.removeItemByIdEndPointTemplate}`; }
    get getAudit() { return `${this.configurations.baseUrl}/api/${this.item}/${this.getItemAuditByIdEndPointTemplate}`; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getAllItems<T>(): Observable<T> {
        let endpointUrl = this.getAll;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllItems());
            });
    }

    getItemById<T>(id: number): Observable<T> {
        let endpointUrl = `${this.getById}/${id}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getItemById(id));
            });
    }

    addItem<T>(item: StageCode): Observable<T> {
        let endpointUrl = this.add;
        return this.http.post<T>(endpointUrl, JSON.stringify(item), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addItem(item));
            });
    }

    updateItem<T>(item: StageCode): Observable<T> {
        let endpointUrl = this.update;
        return this.http.post<T>(endpointUrl, JSON.stringify(item), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateItem(item));
            });
    }

    removeItemById<T>(id: number): Observable<T> {
        let endpointUrl = `${this.removeById}/${id}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.removeItemById(id));
            });
    }

    getItemAudit<T>(id: number): Observable<T> {
        let endpointUrl = `${this.getAudit}/${id}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getItemAudit(id));
            });
    }
}