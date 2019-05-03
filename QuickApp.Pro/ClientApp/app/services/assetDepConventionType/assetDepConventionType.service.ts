import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { AssetDepConventionType } from '../../models/assetDepConventionType.model';
import { AssetDepConventionTypeEndpointService } from './assetDepConventionType-endpoint.service';
@Injectable()
export class AssetDepConventionTypeService {

    constructor(private assetDepConventionTypeEndpointService: AssetDepConventionTypeEndpointService) {
    }

    getAll() {
        return Observable.forkJoin(
            this.assetDepConventionTypeEndpointService.getAllAssetDeps<AssetDepConventionType[]>());
    }

    getById(assetDepConventionTypeId: number) {
        return Observable.forkJoin(
            this.assetDepConventionTypeEndpointService.getAssetDepById<AssetDepConventionType>(assetDepConventionTypeId)
        );
    }

    add(assetDepConventionType: AssetDepConventionType) {
        return this.assetDepConventionTypeEndpointService.addAssetDep<AssetDepConventionType>(assetDepConventionType);
    }

    update(assetDepConventionType: AssetDepConventionType) {
        return this.assetDepConventionTypeEndpointService.updateAssetDep<AssetDepConventionType>(assetDepConventionType);
    }

    remove(assetDepConventionTypeId: number) {
        return this.assetDepConventionTypeEndpointService.removeAssetDepById(assetDepConventionTypeId);
    }

    getAudit(assetDepConventionTypeId: number) {
        return this.assetDepConventionTypeEndpointService.getDepAudit<any[]>(assetDepConventionTypeId);
    }
}