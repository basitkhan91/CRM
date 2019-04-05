import { Component } from '@angular/core';
import { AssetService } from '../../../../services/asset/Assetservice';

@Component({
    selector: 'app-asset-calibration',
    templateUrl: './asset-calibration.component.html',
    styleUrls: ['./asset-calibration.component.scss']
})
/** asset-calibration component*/
export class AssetCalibrationComponent {
    showLable: boolean;
    sourceAssetSetup: any;
    /** asset-calibration ctor */
    constructor(private assetService: AssetService) {
        if (this.assetService.listCollection != null && this.assetService.isEditMode == true) {

            this.showLable = true;
            this.sourceAssetSetup = this.assetService.listCollection;
        }
    }
}