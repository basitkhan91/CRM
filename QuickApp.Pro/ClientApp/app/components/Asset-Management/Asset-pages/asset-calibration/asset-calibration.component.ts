import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../../services/asset/Assetservice';
import { VendorService } from '../../../../services/vendor.service';
import { AlertService } from '../../../../services/alert.service';
import { Vendor } from '../../../../models/vendor.model';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-asset-calibration',
    templateUrl: './asset-calibration.component.html',
    styleUrls: ['./asset-calibration.component.scss']
})
/** asset-calibration component*/
export class AssetCalibrationComponent implements OnInit {
  
    currentCalibration: any = {};
    showLable: boolean;
    sourceAssetSetup: any;
    loadingIndicator: boolean;
    allVendorInfo: Vendor[];
    local: any;
    activeIndex: number;
    localCollection: any;
    /** asset-calibration ctor */
    constructor(private assetService: AssetService, private vendorService: VendorService, private alertService: AlertService, private authService: AuthService) {
        if (this.assetService.listCollection != null && this.assetService.isEditMode == true) {

            this.showLable = true;
            this.sourceAssetSetup = this.assetService.listCollection;
            if (this.assetService.listCollection) {
                this.local = this.assetService.listCollection;
                this.currentCalibration = this.local;
            }
        }
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    ngOnInit(): void {
        this.vendorList();
    }
    private onVendorNameLoad(getVendorList: Vendor[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allVendorInfo = getVendorList;
    }
    private vendorList() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.vendorService.getWorkFlows().subscribe(
            results => this.onVendorNameLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
    }

    saveCalibration() {
        if (!this.currentCalibration.assetRecordId) {
            this.currentCalibration.createdBy = this.userName;
            this.currentCalibration.updatedBy = this.userName;
            this.currentCalibration.masterCompanyId = 1;
            this.assetService.addAsset(this.currentCalibration).subscribe(data => {
                this.currentCalibration.updatedBy = this.userName;
                this.localCollection = data;
                this.assetService.generalCollection = this.localCollection;
                this.activeIndex = 2;
            })
        }
        else {
            this.currentCalibration.updatedBy = this.userName;
            this.currentCalibration.masterCompanyId = 1;            
            this.assetService.updateAsset(this.currentCalibration).subscribe(response => {
                this.alertService.showMessage('Asset calibration updated successfully.');
                this.activeIndex = 2;
                this.assetService.indexObj.next(this.activeIndex);
            })
        }
    }
}