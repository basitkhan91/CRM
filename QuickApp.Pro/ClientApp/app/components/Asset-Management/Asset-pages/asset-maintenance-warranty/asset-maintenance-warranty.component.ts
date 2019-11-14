import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../../services/asset/Assetservice';
import { AuthService } from '../../../../services/auth.service';
//import { AlertService } from '../../../../services/alert.service';
import { GlAccount } from '../../../../models/GlAccount.model';
import { GlAccountService } from '../../../../services/glAccount/glAccount.service';
import { VendorService } from '../../../../services/vendor.service';
import { Vendor } from '../../../../models/vendor.model';
import { AlertService, DialogType, MessageSeverity } from '../../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-asset-maintenance-warranty',
    templateUrl: './asset-maintenance-warranty.component.html',
    styleUrls: ['./asset-maintenance-warranty.component.scss']
})
/** asset-maintenance-warranty component*/
export class AssetMaintenanceWarrantyComponent implements OnInit {
   

    currentMaintenance: any = {};
    localCollection: any;
    activeIndex: number;
    showLable: boolean;
    local: any;
    loadingIndicator: boolean;
    allGlInfo: GlAccount[];
    allVendorInfo: Vendor[];
    /** asset-maintenance-warranty ctor */
    constructor(private assetService: AssetService, private vendorService: VendorService, private route: Router,
        private authService: AuthService, private alertService: AlertService, private glAccountService: GlAccountService) {
        if ((this.assetService.listCollection != null && this.assetService.isEditMode == true) || (this.assetService.generalCollection != null)) {

            if (this.assetService.listCollection != null && this.assetService.isEditMode == true) {
                this.showLable = true;
                this.currentMaintenance = this.assetService.listCollection;
            }
            else if (this.assetService.generalCollection != null) {
                this.showLable = true;
                this.currentMaintenance = this.assetService.generalCollection;}

            if (this.currentMaintenance.warrantyEndDate) {
                this.currentMaintenance.warrantyEndDate = new Date(this.currentMaintenance.warrantyEndDate);
            }
            else {
                this.currentMaintenance.warrantyEndDate = new Date();
            }
            if (this.currentMaintenance.warrantyStartDate) {
                this.currentMaintenance.warrantyStartDate = new Date(this.currentMaintenance.warrantyStartDate);
            }
            else {
                this.currentMaintenance.warrantyStartDate = new Date();
            }
            if (this.assetService.listCollection) {
                this.local = this.assetService.listCollection;
                this.currentMaintenance = this.local;
            }
            else if (this.assetService.generalCollection) {
                this.local = this.assetService.generalCollection;
                this.currentMaintenance = this.local;
            }
        }
    }
    ngOnInit(): void {
        this.activeIndex = 3;
        this.glList();
        this.vendorList();
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    saveWarrenty() {
        if (!this.currentMaintenance.assetRecordId) {
            this.currentMaintenance.createdBy = this.userName;
            this.currentMaintenance.updatedBy = this.userName;
            this.currentMaintenance.masterCompanyId = 1;
            this.assetService.addAsset(this.currentMaintenance).subscribe(data => {
                this.currentMaintenance.updatedBy = this.userName;
                this.localCollection = data;
                this.assetService.generalCollection = this.localCollection;
                this.activeIndex = 3;
            })
        }
        else {
            this.currentMaintenance.updatedBy = this.userName;
            this.currentMaintenance.masterCompanyId = 1;
            if (this.currentMaintenance.assetIsMaintenanceReqd == false || this.currentMaintenance.isDepreciable == false) {
                this.currentMaintenance.assetMaintenanceIsContract = false;
                this.currentMaintenance.assetMaintenanceContractFile = "";
                this.currentMaintenance.maintenanceFrequencyMonths = "";
                this.currentMaintenance.maintenanceFrequencyDays = "";
                this.currentMaintenance.maintenanceMemo = "";
                this.currentMaintenance.defaultVendorId = "";
                this.currentMaintenance.glAccountId = "";
            }
            if (this.currentMaintenance.isWarrantyRequired == false || this.currentMaintenance.isDepreciable == false) {
                this.currentMaintenance.warranty = "";
                this.currentMaintenance.warrantyCompany = "";
                this.currentMaintenance.warrantyStartDate = "";
                this.currentMaintenance.warrantyEndDate = "";
                this.currentMaintenance.warrantyStatus = "";
                this.currentMaintenance.unexpiredTime = "";
            }
            this.assetService.updateAsset(this.currentMaintenance).subscribe(data => {
                this.currentMaintenance.updatedBy = this.userName;
                this.localCollection = data;                
                //this.alertService.showMessage('Asset Maintance updated successfully.');
                this.alertService.showMessage("Success", `Asset Maintenance updated successfully.`, MessageSeverity.success);
                this.route.navigateByUrl('assetmodule/assetpages/app-asset-listing');
                //this.activeIndex = 3;
                //this.assetService.indexObj.next(this.activeIndex);
            })
        }
    }

    customExcelUpload(event) {
        

    }
    sampleExcelDownload() {
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

    backClick() {
        this.assetService.listCollection = this.local;
        this.activeIndex = 2;
        this.assetService.indexObj.next(this.activeIndex);
        this.route.navigateByUrl('/assetmodule/assetpages/app-asset-calibration');
    }
}