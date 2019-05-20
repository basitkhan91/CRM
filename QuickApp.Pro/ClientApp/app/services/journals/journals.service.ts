import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { JournelsEndpointService } from './journals-endpoint.service';
import { JournalBatch } from '../../models/JournalBatch';
import { AssetStatus } from '../../models/asset-status.model';

@Injectable()
export class JournelService {

    constructor(private journelsEndpoint: JournelsEndpointService) {
    }

    getAllBatch() {
        return Observable.forkJoin(
            this.journelsEndpoint.getAllBatch<JournalBatch[]>());
    }

    getBatchById(batchId: number) {
        return Observable.forkJoin(
            this.journelsEndpoint.getBatchById<JournalBatch>(batchId)
        );
    }

    addBatch(batch: JournalBatch) {
        return this.journelsEndpoint.addBatch<JournalBatch>(batch);
    }

    updateBatch(batch: JournalBatch) {
        return this.journelsEndpoint.updateBatch<JournalBatch>(batch);
    }

    removeBatch(batchId: number) {
        return this.journelsEndpoint.removeBatchById(batchId);
    }
    updateActiveBatch(batch: any) {
        return this.journelsEndpoint.getUpdateBatchForActive(batch, batch.id);
    }
    getBatchAudit(batchId: number) {
        return this.journelsEndpoint.getBatchAuditById<any>(batchId);
    }

    getAllJournel() {
        return Observable.forkJoin(
            this.journelsEndpoint.getAllJournel<AssetStatus[]>());
    }

    getJournelById(journelId: number) {
        return Observable.forkJoin(
            this.journelsEndpoint.getJournelById<AssetStatus>(journelId)
        );
    }

    addJournel(assetStatus: AssetStatus) {
        return this.journelsEndpoint.addJournel<AssetStatus>(assetStatus);
    }

    updateJournel(assetStatus: AssetStatus) {
        return this.journelsEndpoint.updateJournel<AssetStatus>(assetStatus);
    }

    removeJournel(batchId: number) {
        return this.journelsEndpoint.removeJournelById(batchId);
    }
    updateActiveJournel(assetStatus: any) {
        return this.journelsEndpoint.getUpdateJournelForActive(assetStatus, assetStatus.id);
    }
    getJournelAudit(journelId: number) {
        return this.journelsEndpoint.getJournelAuditById<any>(journelId);
    }
}