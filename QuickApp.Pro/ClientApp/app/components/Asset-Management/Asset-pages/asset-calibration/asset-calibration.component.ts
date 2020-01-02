import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../../services/asset/Assetservice';
import { VendorService } from '../../../../services/vendor.service';
//import { AlertService } from '../../../../services/alert.service';
import { Vendor } from '../../../../models/vendor.model';
import { AuthService } from '../../../../services/auth.service';
import { GlAccount } from '../../../../models/GlAccount.model';
import { GlAccountService } from '../../../../services/glAccount/glAccount.service';
//import { Router } from '@angular/router';
import { Currency } from '../../../../models/currency.model';
import { CurrencyService } from '../../../../services/currency.service';
import { AlertService, DialogType, MessageSeverity } from '../../../../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    calibrationRequired: boolean;
    certificationRequired: boolean;
    inspectionRequired: boolean;
    verificationRequired: boolean;
    currentAsset: any;
    loadingIndicator: boolean;
    allVendorInfo: Vendor[];
    local: any;
    activeIndex: number;
    localCollection: any;
    allCurrencyInfo: Currency[];
    AssetId: any;
    static assetService;
    /** asset-calibration ctor */
    constructor(private router: ActivatedRoute, private assetService: AssetService, private vendorService: VendorService, private alertService: AlertService,
        private authService: AuthService, private glAccountService: GlAccountService, private route: Router, private currencyService: CurrencyService) {
        this.AssetId = this.router.snapshot.params['id'];
        if (this.assetService.listCollection == undefined) {
            this.GetAssetData(this.AssetId);
        }
        if ((this.assetService.listCollection != null) || (this.assetService.generalCollection != null)) {

            if (this.assetService.listCollection != null && this.assetService.isEditMode == true) {
                this.showLable = true;
                this.currentAsset = this.assetService.listCollection;
                if (this.assetService.listCollection) {
                    this.local = this.assetService.listCollection;
                    this.currentCalibration = this.local;
                }
            }
            else if (this.assetService.generalCollection != null) {
                this.showLable = true;
                this.currentAsset = this.assetService.generalCollection;
                if (this.assetService.generalCollection) {
                    this.local = this.assetService.generalCollection;
                    this.currentCalibration = this.local;
                }
            }
            if (this.currentCalibration.calibrationRequired == false) {
                this.currentCalibration.calibrationFrequencyMonths = null;
                this.currentCalibration.calibrationFrequencyDays = null;
                this.currentCalibration.calibrationDefaultVendorId = null;
                this.currentCalibration.calibrationDefaultCost = null;
                this.currentCalibration.calibrationCurrencyId = null;
                this.currentCalibration.calibrationGlAccountId = null;
                this.currentCalibration.calibrationMemo = null;
                this.currentCalibration.minTolerance1 = null;
                this.currentCalibration.minTolerance2 = null;
                this.currentCalibration.maxTolerance1 = null;
                this.currentCalibration.maxTolerance2 = null;
                this.currentCalibration.expectedTolerance1 = null;
                this.currentCalibration.expectedTolerance2 = null;
                this.currentCalibration.toleranceMemo = null;
            }
            if (this.currentCalibration.certificationRequired == false) {
                this.currentCalibration.certificationFrequencyMonths = null;
                this.currentCalibration.certificationFrequencyDays = null;
                this.currentCalibration.certificationDefaultVendorId = null;
                this.currentCalibration.certificationDefaultCost = null;
                this.currentCalibration.certificationCurrencyId = null;
                this.currentCalibration.certificationGlAccountId = null;
                this.currentCalibration.certificationMemo = null;
            }
            if (this.currentCalibration.inspectionRequired == false) {
                this.currentCalibration.inspectionFrequencyMonths = null;
                this.currentCalibration.inspectionFrequencyDays = null;
                this.currentCalibration.inspectionDefaultVendorId = null;
                this.currentCalibration.inspectionDefaultCost = null;
                this.currentCalibration.inspectionCurrencyId = null;
                this.currentCalibration.inspectionGlaAccountId = null;
                this.currentCalibration.inspectionMemo = null;
            }
            if (this.currentCalibration.verificationRequired == false) {
                this.currentCalibration.verificationFrequencyMonths = null;
                this.currentCalibration.verificationFrequencyDays = null;
                this.currentCalibration.verificationDefaultVendorId = null;
                this.currentCalibration.verificationDefaultCost = null;
                this.currentCalibration.verificationCurrencyId = null;
                this.currentCalibration.verificationGlAccountId = null;
                this.currentCalibration.verificationMemo = null;
            }

        }
    }
    private GetAssetData(assetid) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.assetService.getByAssetId(assetid).subscribe(
            results => this.onassetdataSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onassetdataSuccessful(getAssetData: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.assetService.isEditMode = true;
        this.activeIndex = 2;
        this.assetService.indexObj.next(this.activeIndex);
        this.assetService.listCollection = getAssetData;
        if (this.assetService.listCollection != null) {
            this.showLable = true;
            this.currentAsset = this.assetService.listCollection;
            if (this.assetService.listCollection) {
                this.local = this.assetService.listCollection;
                this.currentCalibration = this.local;
            }
        }
        else if (this.assetService.generalCollection != null) {
            this.showLable = true;
            this.currentAsset = this.assetService.generalCollection;
            if (this.assetService.generalCollection) {
                this.local = this.assetService.generalCollection;
                this.currentCalibration = this.local;
            }
        }
        if (this.currentCalibration.calibrationRequired == false) {
            this.currentCalibration.calibrationFrequencyMonths = null;
            this.currentCalibration.calibrationFrequencyDays = null;
            this.currentCalibration.calibrationDefaultVendorId = null;
            this.currentCalibration.calibrationDefaultCost = null;
            this.currentCalibration.calibrationCurrencyId = null;
            this.currentCalibration.calibrationGlAccountId = null;
            this.currentCalibration.calibrationMemo = null;
            this.currentCalibration.minTolerance1 = null;
            this.currentCalibration.minTolerance2 = null;
            this.currentCalibration.maxTolerance1 = null;
            this.currentCalibration.maxTolerance2 = null;
            this.currentCalibration.expectedTolerance1 = null;
            this.currentCalibration.expectedTolerance2 = null;
            this.currentCalibration.toleranceMemo = null;
        }
        if (this.currentCalibration.certificationRequired == false) {
            this.currentCalibration.certificationFrequencyMonths = null;
            this.currentCalibration.certificationFrequencyDays = null;
            this.currentCalibration.certificationDefaultVendorId = null;
            this.currentCalibration.certificationDefaultCost = null;
            this.currentCalibration.certificationCurrencyId = null;
            this.currentCalibration.certificationGlAccountId = null;
            this.currentCalibration.certificationMemo = null;
        }
        if (this.currentCalibration.inspectionRequired == false) {
            this.currentCalibration.inspectionFrequencyMonths = null;
            this.currentCalibration.inspectionFrequencyDays = null;
            this.currentCalibration.inspectionDefaultVendorId = null;
            this.currentCalibration.inspectionDefaultCost = null;
            this.currentCalibration.inspectionCurrencyId = null;
            this.currentCalibration.inspectionGlaAccountId = null;
            this.currentCalibration.inspectionMemo = null;
        }
        if (this.currentCalibration.verificationRequired == false) {
            this.currentCalibration.verificationFrequencyMonths = null;
            this.currentCalibration.verificationFrequencyDays = null;
            this.currentCalibration.verificationDefaultVendorId = null;
            this.currentCalibration.verificationDefaultCost = null;
            this.currentCalibration.verificationCurrencyId = null;
            this.currentCalibration.verificationGlAccountId = null;
            this.currentCalibration.verificationMemo = null;
        }
        this.vendorList();
        this.glList();
        this.CurrencyData();
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    ngOnInit(): void {

        this.AssetId = this.router.snapshot.params['id'];
        if (this.assetService.listCollection == undefined) {
            this.GetAssetData(this.AssetId);
        }
        this.assetService.bredcrumbObj.next(this.assetService.currentUrl);
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
                //this.activeIndex = 2;
                this.activeIndex = 3;
                this.assetService.indexObj.next(this.activeIndex);
                const { assetId } = this.local;
                this.route.navigateByUrl(`/assetmodule/assetpages/app-asset-maintenance-warranty/${assetId}`);
            })
        }
        else {
            if (this.currentCalibration.calibrationRequired == false) {
                this.currentCalibration.calibrationFrequencyMonths = null;
                this.currentCalibration.calibrationFrequencyDays = null;
                this.currentCalibration.calibrationDefaultVendorId = null;
                this.currentCalibration.calibrationDefaultCost = null;
                this.currentCalibration.calibrationCurrencyId = null;
                this.currentCalibration.calibrationGlAccountId = null;
                this.currentCalibration.calibrationMemo = null;
            }
            if (this.currentCalibration.certificationRequired == false) {
                this.currentCalibration.certificationFrequencyMonths = null;
                this.currentCalibration.certificationFrequencyDays = null;
                this.currentCalibration.certificationDefaultVendorId = null;
                this.currentCalibration.certificationDefaultCost = null;
                this.currentCalibration.certificationCurrencyId = null;
                this.currentCalibration.certificationGlAccountId = null;
                this.currentCalibration.certificationMemo = null;
            }
            if (this.currentCalibration.inspectionRequired == false) {
                this.currentCalibration.inspectionFrequencyMonths = null;
                this.currentCalibration.inspectionFrequencyDays = null;
                this.currentCalibration.inspectionDefaultVendorId = null;
                this.currentCalibration.inspectionDefaultCost = null;
                this.currentCalibration.inspectionCurrencyId = null;
                this.currentCalibration.inspectionGlaAccountId = null;
                this.currentCalibration.inspectionMemo = null;
            }
            if (this.currentCalibration.verificationRequired == false) {
                this.currentCalibration.verificationFrequencyMonths = null;
                this.currentCalibration.verificationFrequencyDays = null;
                this.currentCalibration.verificationDefaultVendorId = null;
                this.currentCalibration.verificationDefaultCost = null;
                this.currentCalibration.verificationCurrencyId = null;
                this.currentCalibration.verificationGlAccountId = null;
                this.currentCalibration.verificationMemo = null;
            }
            this.currentCalibration.updatedBy = this.userName;
            this.currentCalibration.masterCompanyId = 1;
            this.assetService.updateAsset(this.currentCalibration).subscribe(data => {
                this.currentCalibration.updatedBy = this.userName;
                this.localCollection = data;
                //this.alertService.showMessage('Asset calibration updated successfully.');
                this.alertService.showMessage("Success", `Asset calibration updated successfully.`, MessageSeverity.success);
                //this.activeIndex = 2;
                this.activeIndex = 3;
                this.assetService.indexObj.next(this.activeIndex);
                const { assetId } = this.local;
                this.route.navigateByUrl(`/assetmodule/assetpages/app-asset-maintenance-warranty/${assetId}`);
            })
        }

    }

    nextClick() {
        this.assetService.listCollection = this.local;
        this.activeIndex = 3;
        this.assetService.indexObj.next(this.activeIndex);
        const { assetId } = this.local;
        this.route.navigateByUrl(`/assetmodule/assetpages/app-asset-maintenance-warranty/${assetId}`);
    }

    backClick() {
        this.assetService.listCollection = this.local;
        this.activeIndex = 1;
        this.assetService.indexObj.next(this.activeIndex);
        const { assetId } = this.local;
        this.route.navigateByUrl(`/assetmodule/assetpages/app-asset-capes/${assetId}`);
    }
}