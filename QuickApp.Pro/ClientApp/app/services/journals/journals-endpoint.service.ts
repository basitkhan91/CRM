import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';
import { AssetStatus } from '../../models/asset-status.model';
import { JournalBatch } from '../../models/JournalBatch';

@Injectable()
export class JournelsEndpointService extends EndpointFactory {
    //Urls for Batch
    private readonly getAllBatchURL: string = "/api/Batch/getAllBatch";
    private readonly getBatchByIdURL: string = "/api/Batch/getBatchById";
    private readonly addBatchURL: string = "/api/Batch/addBatch";
    private readonly updateBatchURL: string = "/api/Batch/updateBatch";
    private readonly removeBatchByIdURL: string = "/api/Batch/removeBatchById";
    private readonly updateBatchForActive: string = "/api/Batch/updateBatchActive";
    private readonly getBatchAuditDataById: string = "/api/Batch/auditsBatch";

    //Urls for Journel
    private readonly getAllJournelURL: string = "/api/Journals/getAllJournel";
    private readonly getJournelByIdURL: string = "/api/Journals/getJournelById";
    private readonly addJournelURL: string = "/api/Journals/addJournel";
    private readonly updateJournelURL: string = "/api/Journals/updateJournel";
    private readonly removeJournelByIdURL: string = "/api/Journals/removeJournelById";
    private readonly updateJournelForActive: string = "/api/Journals/updateJournelActive";
    private readonly getJournelAuditDataById: string = "/api/Journals/auditsJournel";


    get getBatchAll() { return this.configurations.baseUrl + this.getAllBatchURL; }
    get getByIdBatch() { return this.configurations.baseUrl + this.getBatchByIdURL; }
    get batchAdd() { return this.configurations.baseUrl + this.addBatchURL; }
    get batchUpdate() { return this.configurations.baseUrl + this.updateBatchURL; }
    get removeByIdBatch() { return this.configurations.baseUrl + this.removeBatchByIdURL; }

    get getJournelAll() { return this.configurations.baseUrl + this.getAllJournelURL; }
    get getByIdJournel() { return this.configurations.baseUrl + this.getJournelByIdURL; }
    get journelAdd() { return this.configurations.baseUrl + this.addJournelURL; }
    get journelUpdate() { return this.configurations.baseUrl + this.updateJournelURL; }
    get removeByIdjournel() { return this.configurations.baseUrl + this.removeJournelByIdURL; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
        super(http, configurations, injector);
    }

    //Batch Controller
    getAllBatch<T>(): Observable<T> {
        let endpointUrl = this.getBatchAll;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllBatch());
            });
    }

    getBatchById<T>(assetId: number): Observable<T> {
        let endpointUrl = `${this.getByIdBatch}/${assetId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getBatchById(assetId));
            });
    }

    addBatch<T>(asset: JournalBatch): Observable<T> {
        let endpointUrl = this.batchAdd;

        return this.http.post<T>(endpointUrl, JSON.stringify(asset), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addBatch(asset));
            });
    }

    updateBatch<T>(assetStatus: JournalBatch): Observable<T> {
        let endpointUrl = this.batchUpdate;

        return this.http.post<T>(endpointUrl, JSON.stringify(assetStatus), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateBatch(assetStatus));
            });
    }

    removeBatchById<T>(assetId: number): Observable<T> {
        let endpointUrl = `${this.removeByIdBatch}/${assetId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.removeBatchById(assetId));
            });
    }

    getUpdateBatchForActive<T>(roleObject: any, id: number): Observable<T> {
        let endpointUrl = `${this.updateBatchForActive}/${id}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateBatchForActive(roleObject, id));
            });
    }

    getBatchAuditById<T>(assetId: number): Observable<T> {
        let endpointUrl = `${this.getBatchAuditDataById}/${assetId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getBatchAuditById(assetId));
            });
    }

    //Journel Controller

    getAllJournel<T>(): Observable<T> {
        let endpointUrl = this.getJournelAll;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllJournel());
            });
    }

    getJournelById<T>(assetId: number): Observable<T> {
        let endpointUrl = `${this.getByIdJournel}/${assetId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getJournelById(assetId));
            });
    }

    addJournel<T>(asset: AssetStatus): Observable<T> {
        let endpointUrl = this.journelAdd;

        return this.http.post<T>(endpointUrl, JSON.stringify(asset), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addJournel(asset));
            });
    }

    updateJournel<T>(assetStatus: AssetStatus): Observable<T> {
        let endpointUrl = this.journelUpdate;

        return this.http.post<T>(endpointUrl, JSON.stringify(assetStatus), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateJournel(assetStatus));
            });
    }

    removeJournelById<T>(assetId: number): Observable<T> {
        let endpointUrl = `${this.removeByIdjournel}/${assetId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.removeJournelById(assetId));
            });
    }

    getUpdateJournelForActive<T>(roleObject: any, id: number): Observable<T> {
        let endpointUrl = `${this.updateJournelForActive}/${id}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateJournelForActive(roleObject, id));
            });
    }

    getJournelAuditById<T>(assetId: number): Observable<T> {
        let endpointUrl = `${this.getJournelAuditDataById}/${assetId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getJournelAuditById(assetId));
            });
    }

}