import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../../services/asset/Assetservice';
import { AuthService } from '../../../../services/auth.service';
//import { AlertService } from '../../../../services/alert.service';
import { GlAccount } from '../../../../models/GlAccount.model';
import { GlAccountService } from '../../../../services/glAccount/glAccount.service';
import { VendorService } from '../../../../services/vendor.service';
import { Vendor } from '../../../../models/vendor.model';
import { AlertService, DialogType, MessageSeverity } from '../../../../services/alert.service';
//import { Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../../services/common.service';

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
    AssetId: any;
    static assetService;
    isSaving: boolean;
    assetwarrantystatusList: any[] = [];
    /** asset-maintenance-warranty ctor */
    constructor(private router: ActivatedRoute, private assetService: AssetService, private vendorService: VendorService, private route: Router,
        private authService: AuthService, private alertService: AlertService, private glAccountService: GlAccountService, private commonservice: CommonService, ) {
        this.AssetId = this.router.snapshot.params['id'];
        this.activeIndex = 3;
        if (this.assetService.listCollection == undefined) {
            this.GetAssetData(this.AssetId);
        }
        if ((this.assetService.listCollection != null && this.assetService.isEditMode == true) || (this.assetService.generalCollection != null)) {

            if (this.assetService.listCollection != null && this.assetService.isEditMode == true) {
                this.showLable = true;
                this.currentMaintenance = this.assetService.listCollection;
            }
            else if (this.assetService.generalCollection != null) {
                this.showLable = true;
                this.currentMaintenance = this.assetService.generalCollection;
            }
            if (this.currentMaintenance.warrantyEndDate) {
                this.currentMaintenance.warrantyEndDate = new Date(this.currentMaintenance.warrantyEndDate);
            }
            else {
                //this.currentMaintenance.warrantyEndDate = new Date();
            }
            if (this.currentMaintenance.warrantyStartDate) {
                this.currentMaintenance.warrantyStartDate = new Date(this.currentMaintenance.warrantyStartDate);
            }
            else {
                //this.currentMaintenance.warrantyStartDate = new Date();
            }
            if (this.assetService.listCollection) {
                this.local = this.assetService.listCollection;
                this.currentMaintenance = this.local;
            }
            else if (this.assetService.generalCollection) {
                this.local = this.assetService.generalCollection;
                this.currentMaintenance = this.local;
            }
            this.currentMaintenance.warrantyStatus = this.getwarrantystatus(this.currentMaintenance.warrantyStatus);
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
        this.activeIndex = 3;
        this.assetService.indexObj.next(this.activeIndex);
        this.assetService.listCollection = getAssetData;
        if (this.assetService.listCollection != null) {
            this.showLable = true;
            this.currentMaintenance = this.assetService.listCollection;
        }
        if (this.currentMaintenance.warrantyEndDate) {
            this.currentMaintenance.warrantyEndDate = new Date(this.currentMaintenance.warrantyEndDate);
        }
        //else {
        //    this.currentMaintenance.warrantyEndDate = new Date();
        //}
        if (this.currentMaintenance.warrantyStartDate) {
            this.currentMaintenance.warrantyStartDate = new Date(this.currentMaintenance.warrantyStartDate);
        }
        //else {
        //    this.currentMaintenance.warrantyStartDate = new Date();
        //}
        if (this.assetService.listCollection) {
            this.local = this.assetService.listCollection;
            this.currentMaintenance = this.local;
        }
        else if (this.assetService.generalCollection) {
            this.local = this.assetService.generalCollection;
            this.currentMaintenance = this.local;
        }
        this.glList();
        this.vendorList();
        this.GetAssetWarrantyStatus();
    }
    ngOnInit(): void {
        this.AssetId = this.router.snapshot.params['id'];
        if (this.assetService.listCollection == undefined) {
            this.GetAssetData(this.AssetId);
        }
        this.activeIndex = 3;
        this.glList();
        this.vendorList();
        this.GetAssetWarrantyStatus();
        this.currentMaintenance.warrantyStatus = this.getwarrantystatus(this.currentMaintenance.warrantyStatus);
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    getwarrantystatus(id) {
        for (let i = 0; i < this.assetwarrantystatusList.length; i++) {
            if (id == this.assetwarrantystatusList[i].assetWarrantyStatusId)
                return this.assetwarrantystatusList[i].warrantyStatus;
        }
    }
    //getAssetWarrantyStatus() {
    //    this.commonservice.smartDropDownList('AssetWarrantyStatus', 'AssetWarrantyStatusId', 'warrantyStatus').subscribe(res => {
    //        this.assetwarrantystatusList = res;

    //    })
    //}

    private GetAssetWarrantyStatus() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.assetService.getAssetWarrantyStatus().subscribe(
            results => this.onwarrantystatusSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onwarrantystatusSuccessful(assetwarrantystatus: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.assetwarrantystatusList = assetwarrantystatus;
    }
    saveWarrenty() {
        delete this.currentMaintenance.assetType;
        delete this.currentMaintenance.currency;
        delete this.currentMaintenance.manufacturer;
        delete this.currentMaintenance.unitOfMeasure;
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
            this.isSaving = true;
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
            else {
                if (this.currentMaintenance.warrantyStartDate != null && this.currentMaintenance.warrantyEndDate != null) {
                    console.log(this.currentMaintenance.warrantyStartDate, this.currentMaintenance.warrantyEndDate);
                    if (this.currentMaintenance.warrantyEndDate < this.currentMaintenance.warrantyStartDate) {
                        this.alertService.stopLoadingMessage();
                        //console.log('End date > start date');
                        this.isSaving = false;
                        this.alertService.showMessage("", `Warranty Start Date cannot be later than End date.`, MessageSeverity.error);
                        return;
                    }
                    else {
                        let startDate = new Date(this.currentMaintenance.warrantyStartDate);
                        let endDate = new Date(this.currentMaintenance.warrantyEndDate);
                        this.currentMaintenance.warrantyEndDate = new Date(endDate.getFullYear(), endDate.getMonth(),
                            endDate.getDate());
                        this.currentMaintenance.warrantyStartDate = new Date(startDate.getFullYear(), startDate.getMonth(),
                            startDate.getDate());
                    }
                }
            }
            if (this.isSaving)
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

    changeOfTab(value) {
        console.log('invoked');
        console.log(`Parent master id ${this.AssetId}`);
        const { assetId } = this.AssetId;
        if (this.assetService.isEditMode == true) {
            if (value === 'General') {
                this.activeIndex = 0;
                this.route.navigateByUrl(`assetmodule/assetpages/app-edit-asset/${this.AssetId}`);
            } else if (value === 'Capes') {
                this.activeIndex = 1;
                this.route.navigateByUrl(`/assetmodule/assetpages/app-asset-capes/${this.AssetId}`);
            } else if (value === 'Calibration') {
                this.activeIndex = 2;
                this.route.navigateByUrl(`/assetmodule/assetpages/app-asset-calibration/${this.AssetId}`);
            } else if (value == "Maintenance") {
                this.activeIndex = 3;
                this.route.navigateByUrl(`/assetmodule/assetpages/app-asset-maintenance-warranty/${this.AssetId}`);
            }
        }

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
        const { assetId } = this.local;
        this.route.navigateByUrl(`/assetmodule/assetpages/app-asset-calibration/${this.local.assetRecordId}`);
    }
}