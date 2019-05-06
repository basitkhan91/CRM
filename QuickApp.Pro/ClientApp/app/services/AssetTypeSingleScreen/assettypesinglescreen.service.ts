import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { AssetTypeSingleScreen } from '../../models/assettypesinglescreen.model';
import { AssetTypeSingleScreenEndpointService } from './assettypesinglescreen-endpoint.service';
@Injectable()
export class AssetTypeSingleScreenService {

    constructor(private assetIntangibleTypeSingleScreenEndpointService: AssetTypeSingleScreenEndpointService) {
    }

    getAll() {
        return Observable.forkJoin(
            this.assetIntangibleTypeSingleScreenEndpointService.getAllAssetTypes<AssetTypeSingleScreen[]>());
    }

    getById(assetTypeSingleScreenId: number) {
        return Observable.forkJoin(
            this.assetIntangibleTypeSingleScreenEndpointService.getAssetTypeById<AssetTypeSingleScreen>(assetTypeSingleScreenId)
        );
    }

    add(assetIntangibleTypeSingleScreen: AssetTypeSingleScreen) {
        return this.assetIntangibleTypeSingleScreenEndpointService.addAssetType<AssetTypeSingleScreen>(assetIntangibleTypeSingleScreen);
    }

    update(assetIntangibleTypeSingleScreen: AssetTypeSingleScreen) {
        return this.assetIntangibleTypeSingleScreenEndpointService.updateAssetType<AssetTypeSingleScreen>(assetIntangibleTypeSingleScreen);
    }

    remove(assetTypeSingleScreenId: number) {
        return this.assetIntangibleTypeSingleScreenEndpointService.removeAssetTypeById(assetTypeSingleScreenId);
    }

    getAudit(assetTypeSingleScreenId: number) {
        return this.assetIntangibleTypeSingleScreenEndpointService.getAudit<any[]>(assetTypeSingleScreenId);
    }
}