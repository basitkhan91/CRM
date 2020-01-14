// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { AssetAcquistionType } from '../../models/asset-acquistion-type.model';
import { AssetAcquistionTypeEndpointService } from './asset-acquistion-type-endpoint.service';

@Injectable()
export class AssetAcquistionTypeService {

    constructor(private assetAcquistionTypeEndpoint: AssetAcquistionTypeEndpointService) {
    }

    getAll() {
        return Observable.forkJoin(
            this.assetAcquistionTypeEndpoint.getAllAssets<any>());
    }

    getById(assetAcquistionTypeId: number) {
        return Observable.forkJoin(
            this.assetAcquistionTypeEndpoint.getAssetById<AssetAcquistionType>(assetAcquistionTypeId)
        );
    }

    add(assetAcquistionType: AssetAcquistionType) {
        return this.assetAcquistionTypeEndpoint.addAsset<AssetAcquistionType>(assetAcquistionType);
    }

    update(assetAcquistionType: AssetAcquistionType) {
        return this.assetAcquistionTypeEndpoint.updateAsset<AssetAcquistionType>(assetAcquistionType);
    }

    remove(assetAcquistionTypeId: number) {     
        return this.assetAcquistionTypeEndpoint.removeAssetById(assetAcquistionTypeId);
    }
    updateActive(assetAcquistionType: any) {
        return this.assetAcquistionTypeEndpoint.getUpdateForActive(assetAcquistionType, assetAcquistionType.id);
    }
    getAssetAudit(assetId:number) {
        return this.assetAcquistionTypeEndpoint.getAssetAcquistionTypeAuditById<any[]>(assetId);
    }
    
    AssetAcquistionTypeCustomUpload(file) {
        return this.assetAcquistionTypeEndpoint.AssetAcquistionTypeCustomUpload(file);
    }
}