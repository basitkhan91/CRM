import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../../services/asset/Assetservice';
import { VendorService } from '../../../../services/vendor.service';
import { AlertService } from '../../../../services/alert.service';
import { Vendor } from '../../../../models/vendor.model';
import { AuthService } from '../../../../services/auth.service';
import { GlAccount } from '../../../../models/GlAccount.model';
import { GlAccountService } from '../../../../services/glAccount/glAccount.service';
import { Router } from '@angular/router';
import { Currency } from '../../../../models/currency.model';
import { CurrencyService } from '../../../../services/currency.service';

@Component({
    selector: 'app-asset-calibration',
    templateUrl: './asset-calibration.component.html',
    styleUrls: ['./asset-calibration.component.scss']
})
/** asset-calibration component*/
export class AssetCalibrationComponent implements OnInit {

    allGlInfo: GlAccount[];
    currentCalibration: any = {};
    showLable: boolean;
    currentAsset: any;
    loadingIndicator: boolean;
    allVendorInfo: Vendor[];
    local: any;
    activeIndex: number;
    localCollection: any;
    allCurrencyInfo: Currency[];
    /** asset-calibration ctor */
    constructor(private assetService: AssetService, private vendorService: VendorService, private alertService: AlertService,
        private authService: AuthService, private glAccountService: GlAccountService, private route: Router, private currencyService: CurrencyService) {
        if (this.assetService.listCollection != null && this.assetService.isEditMode == true) {

            this.showLable = true;
            this.currentAsset = this.assetService.listCollection;
            if (this.assetService.listCollection) {
                this.local = this.assetService.listCollection;
                this.currentCalibration = this.local;
            }
            if (this.currentCalibration.calibrationRequired == false) {
                this.currentCalibration.calibrationFrequencyMonths = "";
                this.currentCalibration.calibrationFrequencyDays = "";
                this.currentCalibration.calibrationDefaultVendorId = "";
                this.currentCalibration.calibrationDefaultCost = "";
                this.currentCalibration.calibrationCurrencyId = "";
                this.currentCalibration.calibrationGlAccountId = "";
                this.currentCalibration.calibrationMemo = "";
            }
            if (this.currentCalibration.certificationRequired == false) {
                this.currentCalibration.certificationFrequencyMonths = "";
                this.currentCalibration.certificationFrequencyDays = "";
                this.currentCalibration.certificationDefaultVendorId = "";
                this.currentCalibration.certificationDefaultCost = "";
                this.currentCalibration.certificationCurrencyId = "";
                this.currentCalibration.certificationGlAccountId = "";
                this.currentCalibration.certificationMemo = "";
            }
            if (this.currentCalibration.inspectionRequired == false) {
                this.currentCalibration.inspectionFrequencyMonths = "";
                this.currentCalibration.inspectionFrequencyDays = "";
                this.currentCalibration.inspectionDefaultVendorId = "";
                this.currentCalibration.inspectionDefaultCost = "";
                this.currentCalibration.inspectionCurrencyId = "";
                this.currentCalibration.inspectionGlaAccountId = "";
                this.currentCalibration.inspectionMemo = "";
            }
            if (this.currentCalibration.verificationRequired == false) {
                this.currentCalibration.verificationFrequencyMonths = "";
                this.currentCalibration.verificationFrequencyDays = "";
                this.currentCalibration.verificationDefaultVendorId = "";
                this.currentCalibration.verificationDefaultCost = "";
                this.currentCalibration.verificationCurrencyId = "";
                this.currentCalibration.verificationGlAccountId = "";
                this.currentCalibration.verificationMemo = "";
            }

        }
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    ngOnInit(): void {
        this.vendorList();
        this.glList();
        this.CurrencyData();
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

    private onGlAccountLoad(getGlList: GlAccount[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allGlInfo = getGlList;
    }

    private glList() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.glAccountService.getAll().subscribe(
            results => this.onGlAccountLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }


    private oncurrencySuccessful(getCreditTermsList: Currency[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allCurrencyInfo = getCreditTermsList;
    }

    private CurrencyData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.currencyService.getCurrencyList().subscribe(
            results => this.oncurrencySuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
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
            if (this.currentCalibration.calibrationRequired == false) {
                this.currentCalibration.calibrationFrequencyMonths = "";
                this.currentCalibration.calibrationFrequencyDays = "";
                this.currentCalibration.calibrationDefaultVendorId = "";
                this.currentCalibration.calibrationDefaultCost = "";
                this.currentCalibration.calibrationCurrencyId = "";
                this.currentCalibration.calibrationGlAccountId = "";
                this.currentCalibration.calibrationMemo = "";
            }
            if (this.currentCalibration.certificationRequired == false) {
                this.currentCalibration.certificationFrequencyMonths = "";
                this.currentCalibration.certificationFrequencyDays = "";
                this.currentCalibration.certificationDefaultVendorId = "";
                this.currentCalibration.certificationDefaultCost = "";
                this.currentCalibration.certificationCurrencyId = "";
                this.currentCalibration.certificationGlAccountId = "";
                this.currentCalibration.certificationMemo = "";
            }
            if (this.currentCalibration.inspectionRequired == false) {
                this.currentCalibration.inspectionFrequencyMonths = "";
                this.currentCalibration.inspectionFrequencyDays = "";
                this.currentCalibration.inspectionDefaultVendorId = "";
                this.currentCalibration.inspectionDefaultCost = "";
                this.currentCalibration.inspectionCurrencyId = "";
                this.currentCalibration.inspectionGlaAccountId = "";
                this.currentCalibration.inspectionMemo = "";
            }
            if (this.currentCalibration.verificationRequired == false) {
                this.currentCalibration.verificationFrequencyMonths = "";
                this.currentCalibration.verificationFrequencyDays = "";
                this.currentCalibration.verificationDefaultVendorId = "";
                this.currentCalibration.verificationDefaultCost = "";
                this.currentCalibration.verificationCurrencyId = "";
                this.currentCalibration.verificationGlAccountId = "";
                this.currentCalibration.verificationMemo = "";
            }
            
            this.currentCalibration.updatedBy = this.userName;
            this.currentCalibration.masterCompanyId = 1;            
            this.assetService.updateAsset(this.currentCalibration).subscribe(response => {
                this.alertService.showMessage('Asset calibration updated successfully.');
                this.activeIndex = 2;
                this.assetService.indexObj.next(this.activeIndex);
            })
            }

    }

    nextClick() {
        this.assetService.listCollection = this.local;
        this.activeIndex = 3;
        this.assetService.indexObj.next(this.activeIndex);
        this.route.navigateByUrl('/assetmodule/assetpages/app-asset-maintenance-warranty');
    }

    backClick() {
        this.assetService.listCollection = this.local;
        this.activeIndex = 1;
        this.assetService.indexObj.next(this.activeIndex);
        this.route.navigateByUrl('/assetmodule/assetpages/app-asset-capes');
    }
}