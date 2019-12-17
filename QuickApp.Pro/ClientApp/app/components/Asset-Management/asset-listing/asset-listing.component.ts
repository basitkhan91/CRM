import { Component, OnInit, Input } from '@angular/core';
//import { AlertService } from '../../../services/alert.service';
import { AssetService } from '../../../services/asset/Assetservice';
import { Router } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOut } from '../../../services/animations';
import { SingleScreenAuditDetails } from '../../../models/single-screen-audit-details.model';
import { AlertService, DialogType, MessageSeverity } from '../../../services/alert.service';
import { GlAccountService } from '../../../services/glAccount/glAccount.service';
import { GlAccount } from '../../../models/GlAccount.model';

@Component({
    selector: 'app-asset-listing',
    templateUrl: './asset-listing.component.html',
    styleUrls: ['./asset-listing.component.scss'],
    animations: [fadeInOut]
})
/** Asset-listing component*/
export class AssetListingComponent implements OnInit {
    @Input() isWorkOrder = false;
    @Input() assetsId;
    // isWorkOrder = false;
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

    // comented for asset audit
    //AuditDetails: SingleScreenAuditDetails[];


    ngOnInit(): void {
        this.loadData();
        this.activeIndex = 0;
        this.assetService.ShowPtab = false;
        this.assetService.alertObj.next(this.assetService.ShowPtab); //steps
        this.assetService.indexObj.next(this.activeIndex);
        if (this.isWorkOrder) {
            this.assetService.getAssetsById(this.assetsId).subscribe(res => {
                this.openView('', res[0]);
            })
        }

    }
    /** Asset-listing ctor */
    loadingIndicator: boolean;
    allAssetInfo: any[] = [];
    cols: { field: string; header: string; }[];
    selectedColumns: { field: string; header: string; }[];
    constructor(private alertService: AlertService, private assetService: AssetService, private _route: Router, private modalService: NgbModal, private glAccountService: GlAccountService) {
        this.assetService.isEditMode = false;
        this.assetService.listCollection = null;
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

    private getInsecGLAccName() {
        console.log('107', this.assetViewList.inspectionGlaAccountId);
        this.glAccountService.getById(this.assetViewList.inspectionGlaAccountId).subscribe(
            results => this.onGlAccountLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onGlAccountLoad(getGl: GlAccount) {
        console.log(getGl);
        console.log(getGl[0]);
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.assetViewList.inspectionGlaAccountName = getGl[0].accountName;
    }

    openAssetToEdit(row) {
        this.assetService.isEditMode = true;
        this.isSaving = true;
        // this.assetService.currentAssetId = row.assetRecordId;
        this.assetService.listCollection = row;
        const { assetId } = row;
        this._route.navigateByUrl(`assetmodule/assetpages/app-edit-asset/${assetId}`);
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    removeAsset(): void {
        this.assetService.remove(this.assetService.listCollection.assetRecordId).subscribe(response => {
            //this.alertService.showMessage("Asset removed successfully.");
            this.alertService.showMessage("Success", `Asset removed successfully.`, MessageSeverity.success);
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
                //this.alertService.showMessage('Asset Type updated successfully.');
                this.alertService.showMessage("Success", `Asset Type updated successfully.`, MessageSeverity.success);
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
                //this.alertService.showMessage('Asset Type updated successfully.');
                this.alertService.showMessage("Success", `Asset Type updated successfully.`, MessageSeverity.success);
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
        console.log('row @170 ',row);
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
            this.assetViewList.manufacturerId = row.manufacturer.name;
        }
        else { this.assetViewList.manufacturerId = "" }
        if (row.currency) {
            this.assetViewList.currencyId = row.currency.symbol;
        }
        else {
            this.assetViewList.currencyId = ""
        }
        if (row.glAccount) {
            this.assetViewList.glAccountId = row.glAccount.accountName;
        }
        else { this.assetViewList.glAccountId = "" }
        this.assetViewList.inspectionFrequencyMonths = row.inspectionFrequencyMonths;
        this.assetViewList.inspectionFrequencyDays = row.inspectionFrequencyDays;
        this.assetViewList.inspectionDefaultVendorId = row.inspectionDefaultVendorId;
        this.assetViewList.inspectionDefaultCost = row.inspectionDefaultCost;
        this.assetViewList.inspectionGlaAccountId = row.inspectionGlaAccountId;
        this.getInsecGLAccName();
        this.assetViewList.inspectionMemo = row.inspectionMemo;
        this.assetViewList.manufacturedDate = row.manufacturedDate;
        this.assetViewList.isSerialized = row.isSerialized;
        if (row.unitOfMeasure) {
            this.assetViewList.unitOfMeasureId = row.unitOfMeasure.description;
        }
        else { this.assetViewList.unitOfMeasureId = "" }

        if (row.glAccount) {
            this.assetViewList.glAccountId = row.glAccount.accountName;
        }
        else {
            this.assetViewList.glAccountId = "";
        }

        if (row.assetType) {
            this.assetViewList.assetTypeId = row.assetType.assetTypeName;
        }
        else {
            this.assetViewList.assetTypeId = "";
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

        if (!this.isWorkOrder) {

            this.modal = this.modalService.open(content, { size: 'lg' });
            this.modal.result.then(() => {
                console.log('When user closes');
            }, () => { console.log('Backdrop click') })
        }
    }

    // AssetCreation Audit please check
    //showAuditPopup(template, assetRecordId): void {
    //    this.audit(assetRecordId);
    //    this.modal = this.modalService.open(template, { size: 'sm' });
    //}

    //audit(assetRecordId: number): void {
    //    this.AuditDetails = [];
    //    this.assetService.getAudit(assetRecordId).subscribe(audits => {
    //        if (audits.length > 0) {
    //            this.AuditDetails = audits;
    //            this.AuditDetails[0].ColumnsToAvoid = ["assetRecordAuditId", "assetRecordId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
    //        }
    //    });
    //}
}