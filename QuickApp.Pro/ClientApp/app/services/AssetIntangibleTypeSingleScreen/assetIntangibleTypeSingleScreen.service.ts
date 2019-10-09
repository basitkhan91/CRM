import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { AssetIntangibleTypeSingleScreen } from '../../models/assetIntangibleTypeSingleScreen.model';
import { AssetIntangibleTypeSingleScreenEndpointService } from './assetIntangibleTypeSingleScreen-endpoint';
@Injectable()
export class AssetIntangibleTypeSingleScreenService {

    constructor(private assetIntangibleTypeSingleScreenEndpointService: AssetIntangibleTypeSingleScreenEndpointService) {
    }
    // get all Asset
    getAll() {
        return Observable.forkJoin(
            this.assetIntangibleTypeSingleScreenEndpointService.getAllAssetIntangible<any>());
    }

    getById(assetIntangibleTypeSingleId: number) {
        return Observable.forkJoin(
            this.assetIntangibleTypeSingleScreenEndpointService.getAssetIntangibleById<AssetIntangibleTypeSingleScreen>(assetIntangibleTypeSingleId)
        );
    }

    add(assetIntangibleTypeSingleScreen: AssetIntangibleTypeSingleScreen) {
        return this.assetIntangibleTypeSingleScreenEndpointService.addAssetIntangible<AssetIntangibleTypeSingleScreen>(assetIntangibleTypeSingleScreen);
    }

    update(assetIntangibleTypeSingleScreen: AssetIntangibleTypeSingleScreen) {
        return this.assetIntangibleTypeSingleScreenEndpointService.updateAssetIntangible<AssetIntangibleTypeSingleScreen>(assetIntangibleTypeSingleScreen);
    }

    remove(assetIntangibleTypeSingleId: number) {
        return this.assetIntangibleTypeSingleScreenEndpointService.removeAssetIntangibleById(assetIntangibleTypeSingleId);
    }

    getAssetIntangibleAudit(assetIntangibleTypeSingleId: number) {
        return this.assetIntangibleTypeSingleScreenEndpointService.getAssetIntangibleAudit<any[]>(assetIntangibleTypeSingleId);
    }
}