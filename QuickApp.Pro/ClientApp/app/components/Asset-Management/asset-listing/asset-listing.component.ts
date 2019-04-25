import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { AssetService } from '../../../services/asset/Assetservice';
import { Router } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOut } from '../../../services/animations';

@Component({
    selector: 'app-asset-listing',
    templateUrl: './asset-listing.component.html',
    styleUrls: ['./asset-listing.component.scss'],
    animations: [fadeInOut]
})
/** Asset-listing component*/
export class AssetListingComponent implements OnInit {
    isSaving: boolean;
    activeIndex: number;
    assetViewList: any = {};
    modal: NgbModalRef;
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    manufacturerId: any;
    currencyId: any;
    glAccountId: any;
    Active: string;
    assetTypeToUpdate: any;
    unitOfMeasureId: any;
    assetTypeId: any;
    selectedColumn: any;
    ngOnInit(): void {
        this.loadData();
        this.activeIndex = 0;
        this.assetService.indexObj.next(this.activeIndex);
    }
    /** Asset-listing ctor */
    loadingIndicator: boolean;
    allAssetInfo: any[] = [];
    cols: { field: string; header: string; }[];
    selectedColumns: { field: string; header: string; }[];
    constructor(private alertService: AlertService, private assetService: AssetService, private _route: Router, private modalService: NgbModal) {
        this.assetService.isEditMode = false;
    }

    private onDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allAssetInfo = allWorkFlows;
    }

    private loadData() {

        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.assetService.getAssetList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.cols = [

            { field: 'assetId', header: 'Asset Id' },
            { field: 'alternateAssetId', header: 'Alt Asset Id' },
            { field: 'name', header: 'Asset Name' },
            { field: 'manufacturedId', header: 'Manufacturer' },
            { field: 'currencyId', header: 'Currency ' },
        ];

        this.selectedColumns = this.cols;
    }
    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

    }

    public navigateTogeneralInfo() {
        this.assetService.isEditMode = false;
        this.assetService.enableExternal = false;
        this._route.navigateByUrl('assetmodule/assetpages/app-create-asset');

    }

    openAssetToEdit(row) {
        this.assetService.isEditMode = true;
        this.isSaving = true;
       // this.assetService.currentAssetId = row.assetRecordId;
        this.assetService.listCollection = row;
        this._route.navigateByUrl('assetmodule/assetpages/app-create-asset');
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    removeAsset(): void {
        this.assetService.remove(this.assetService.listCollection.assetRecordId).subscribe(response => {
            this.alertService.showMessage("Asset removed successfully.");
            this.assetService.getAssetList().subscribe(asset => {
                this.allAssetInfo = asset[0];
                this.modal.close();
            });
        });

    }

    toggleIsActive(asset: any, e) {
        if (e.checked == false) {
            this.assetTypeToUpdate = asset;
            this.Active = "In Active";
            this.assetTypeToUpdate.isActive == false;
            this.assetService.updateAsset(this.assetTypeToUpdate).subscribe(asset => {
                this.alertService.showMessage('Asset Type updated successfully.');
                this.assetService.getAssetList().subscribe(assets => {
                    this.allAssetInfo = assets[0];
                });

            })
        }
        else {
            this.assetTypeToUpdate = asset;
            this.Active = "Active";
            this.assetTypeToUpdate.isActive == true;
            this.assetService.updateAsset(this.assetTypeToUpdate).subscribe(asset => {
                this.alertService.showMessage('Asset Type updated successfully.');
                this.assetService.getAssetList().subscribe(assets => {
                    this.allAssetInfo = assets[0];
                });
            })
        }
    }

    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.assetService.listCollection = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openView(content, row) {

        this.assetViewList.assetId = row.assetId;
        this.assetViewList.alternateAssetId = row.alternateAssetId;
        this.assetViewList.name = row.name;
        this.assetViewList.description = row.description;
        this.assetViewList.companyId = row.companyId;
        this.assetViewList.businessUnitId = row.businessUnitId;
        this.assetViewList.departmentId = row.departmentId;
        this.assetViewList.divisionId = row.divisionId;
        this.assetViewList.calibrationRequired = row.calibrationRequired;
        this.assetViewList.certificationRequired = row.certificationRequired;
        this.assetViewList.inspectionRequired = row.inspectionRequired;
        this.assetViewList.verificationRequired = row.verificationRequired;
        this.assetViewList.model = row.model;
        this.assetViewList.assetAcquisitionTypeId = row.assetAcquisitionTypeId;
        if (row.manufacturer) {
            this.manufacturerId = row.manufacturer.name;
        }
        else { this.manufacturerId = "" }
        if (row.currency) {
            this.currencyId = row.currency.symbol;
        }
        else
        {
            this.currencyId = ""
        }
        if (row.glAccount) {
            this.glAccountId = row.glAccount.accountName;
        }
        else { this.glAccountId = "" }
        this.assetViewList.inspectionFrequencyMonths = row.inspectionFrequencyMonths;
        this.assetViewList.inspectionFrequencyDays = row.inspectionFrequencyDays;
        this.assetViewList.inspectionDefaultVendorId = row.inspectionDefaultVendorId;
        this.assetViewList.inspectionDefaultCost = row.inspectionDefaultCost;
        this.assetViewList.inspectionGlaAccountId = row.inspectionGlaAccountId;
        this.assetViewList.inspectionMemo = row.inspectionMemo;
        this.assetViewList.manufacturedDate = row.manufacturedDate;
        this.assetViewList.isSerialized = row.isSerialized;        
        if (row.unitOfMeasure) {
            this.unitOfMeasureId = row.unitOfMeasure.description;
        }
        else { this.unitOfMeasureId = "" }

        if (row.glAccount) {
            this.glAccountId = row.glAccount.accountName;
        }
        else {
            this.glAccountId = "";
        }

        if (row.assetType) {
            this.assetTypeId = row.assetType.assetTypeName;
        }
        else {
            this.assetTypeId = "";
        }
        this.assetViewList.unitCost = row.unitCost;
        this.assetViewList.expirationDate = row.expirationDate;
        this.assetViewList.asset_Location = row.asset_Location;
        this.assetViewList.assetParentId = row.assetParentId;
        this.assetViewList.memo = row.memo;
        this.assetViewList.assetTypeSingleScreenId = row.assetTypeSingleScreenId;
        this.assetViewList.assetIsMaintenanceReqd = row.assetIsMaintenanceReqd;
        this.assetViewList.maintenanceFrequencyMonths = row.maintenanceFrequencyMonths;
        this.assetViewList.assetMaintenanceIsContract = row.assetMaintenanceIsContract;
        this.assetViewList.defaultVendorId = row.defaultVendorId;
        this.assetViewList.maintenanceMemo = row.maintenanceMemo;
        this.assetViewList.isWarrantyRequired = row.isWarrantyRequired;
        this.assetViewList.assetCalibrationMin = row.assetCalibrationMin;
        this.assetViewList.assetCalibrationMinTolerance = row.assetCalibrationMinTolerance;
        this.assetViewList.assetCalibratonMax = row.assetCalibratonMax;
        this.assetViewList.assetCalibrationMaxTolerance = row.assetCalibrationMaxTolerance;
        this.assetViewList.assetCalibrationExpected = row.assetCalibrationExpected;
        this.assetViewList.assetCalibrationExpectedTolerance = row.assetCalibrationExpectedTolerance;
        this.assetViewList.assetCalibrationMemo = row.assetCalibrationMemo;
        this.modal = this.modalService.open(content, { size: 'lg' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

}