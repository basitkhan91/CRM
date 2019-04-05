import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../../services/asset/Assetservice';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { MatTableDataSource } from '@angular/material';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { UnitOfMeasureService } from '../../../../services/unitofmeasure.service';
import { Currency } from '../../../../models/currency.model';
import { CurrencyService } from '../../../../services/currency.service';
import { AssetTypeSingleScreenService } from '../../../../services/AssetTypeSingleScreen/assettypesinglescreen.service';
import { AssetTypeSingleScreen } from '../../../../models/assettypesinglescreen.model';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-create-asset',
    templateUrl: './create-asset.component.html',
    styleUrls: ['./create-asset.component.scss']
})
/** create-asset component*/
export class CreateAssetComponent implements OnInit {
    activeIndex: number;
    sourceAssetSetup: any = {};
    bulist: any[];
    allManagemtninfo: any[] = [];
    departmentList: any[];
    divisionlist: any[];
    BuData: boolean;
    DepData: boolean;
    divData: boolean;
    loadingIndicator: boolean;
    maincompanylist: any[] = [];
    allManufacturerInfo: any[];
    allUnitOfMeasureinfo: any[];
    allCurrencyInfo: any[];
    allAssetTypeInfo: any[];
    display: boolean;
    modelValue: boolean;
    isDepreciable: boolean = true;
    isSaving: boolean;
    listCollection: any = {};
    intangible: boolean;
    showLable: boolean;
    isDeleteMode: boolean;
    selectedColumns: any;
    cols: any;
    allAssetInfo: any[];
    constructor(private assetService: AssetService, private legalEntityServices: LegalEntityService, private alertService: AlertService, public itemMasterservice: ItemMasterService,
        public unitService: UnitOfMeasureService, public currencyService: CurrencyService, public assetTypeSingleService: AssetTypeSingleScreenService, private authService: AuthService, ) {
        this.dataSource = new MatTableDataSource();

        if (this.assetService.listCollection != null && this.assetService.isEditMode == true) {

            this.showLable = true;
            this.sourceAssetSetup = this.assetService.listCollection;
        }
        if (this.sourceAssetSetup.expirationDate) {
            this.sourceAssetSetup.expirationDate = new Date(this.sourceAssetSetup.expirationDate);
        }
        else {
            this.sourceAssetSetup.expirationDate = new Date();
        }
        if (this.sourceAssetSetup.manufacturedDate) {
            this.sourceAssetSetup.manufacturedDate = new Date(this.sourceAssetSetup.manufacturedDate);
        }
        else {
            this.sourceAssetSetup.manufacturedDate = new Date();
        }
    }

    ngOnInit() {

        this.sourceAssetSetup.isDepreciable = true;
        this.assetService.currentUrl = '/assetmodule/assetpages/app-create-asset';
        this.assetService.bredcrumbObj.next(this.assetService.currentUrl);
        //steps Code  Start
        this.assetService.ShowPtab = true;
        this.loadData();
        this.assetService.alertObj.next(this.assetService.ShowPtab); //steps
        this.activeIndex = 0;
        this.loadManagementdata();
        this.manufacturerdata();
        this.unitOfMeasureList();
        this.CurrencyData();
        this.assetTypeData();
    }

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.assetService.getAssetList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
        this.selectedColumns = this.cols;
    }
    private onDataLoadSuccessful(getAssetList: any[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getAssetList;
        this.allAssetInfo = getAssetList;
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    dataSource: MatTableDataSource<any>;
    getBUList(companyId) {
        this.sourceAssetSetup.managementStructureId = companyId;

        this.bulist = [];
        this.departmentList = [];
        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == companyId) {
                this.bulist.push(this.allManagemtninfo[i]);
            }
        }

        if (this.bulist.length > 0) {
            this.BuData = true;
        }

        console.log(this.bulist);

    }

    getDepartmentlist(businessUnitId) {
        this.sourceAssetSetup.managementStructureId = businessUnitId;

        this.departmentList = [];
        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == businessUnitId) {
                this.departmentList.push(this.allManagemtninfo[i]);
            }
        }

        if (this.departmentList.length > 0) {
            this.DepData = true;
        }

        console.log(this.departmentList);
    }

    getDivisionlist(departmentId) {
        this.sourceAssetSetup.managementStructureId = departmentId;

        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == departmentId) {
                this.divisionlist.push(this.allManagemtninfo[i]);
            }
        }

        if (this.divisionlist.length > 0) {
            this.divData = true;
        }

        console.log(this.divisionlist);
    }
    getDivisionChangeManagementCode(divisionId) {
        this.sourceAssetSetup.managementStructureEntityId = divisionId;
    }
    private onManagemtntdataLoad(getAtaMainList: any[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getAtaMainList;
        this.allManagemtninfo = getAtaMainList;

        for (let i = 0; i < this.allManagemtninfo.length; i++) {

            if (this.allManagemtninfo[i].parentId == null) {
                this.maincompanylist.push(this.allManagemtninfo[i]);
            }
        }

    }

    private manufacturerdata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemMasterservice.getManufacturerList().subscribe(
            results => this.onmanufacturerSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private onmanufacturerSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = allWorkFlows;
        this.allManufacturerInfo = allWorkFlows;
    }
    private loadManagementdata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.legalEntityServices.getManagemententity().subscribe(
            results => this.onManagemtntdataLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private onDataLoadFailed(error: any) {
        // alert(error);
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

    }

    private onDataUnitGet(getUnitOfMeasureList: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allUnitOfMeasureinfo = getUnitOfMeasureList;
    }
    private unitOfMeasureList() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.unitService.getUnitOfMeasureList().subscribe(
            results => this.onDataUnitGet(results[0]),
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
    private onAssetTypeLoad(getAssetTypeList: AssetTypeSingleScreen[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allAssetTypeInfo = getAssetTypeList;
    }
    private assetTypeData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.assetTypeSingleService.getAll().subscribe(
            results => this.onAssetTypeLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    onDepreciable() {
        this.sourceAssetSetup.isDepreciable = true;
        this.sourceAssetSetup.isIntangible = false;
    }
    onIntangible() {
        this.sourceAssetSetup.isIntangible = true;
        this.sourceAssetSetup.isDepreciable = false;
    }

    private saveCompleted(user?: any) {
        this.isSaving = false;

        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
        }

        this.loadData();
    }

    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }


    saveAsset() {
        if (this.sourceAssetSetup.isDepreciable == true) {
            if (!(this.sourceAssetSetup.assetId && this.sourceAssetSetup.alternateAssetId && this.sourceAssetSetup.name && this.sourceAssetSetup.unitOfMeasureId
                && this.sourceAssetSetup.currencyId && this.sourceAssetSetup.assetTypeSingleScreenId
            )) {
                this.display = true;
                this.modelValue = true;
            }
        }        
        if (this.sourceAssetSetup.assetId && this.sourceAssetSetup.alternateAssetId && this.sourceAssetSetup.name && this.sourceAssetSetup.unitOfMeasureId
            && this.sourceAssetSetup.currencyId && this.sourceAssetSetup.assetTypeSingleScreenId
        )

            if (this.sourceAssetSetup.isIntangible == true) {
            if (!(this.sourceAssetSetup.assetId && this.sourceAssetSetup.alternateAssetId && this.sourceAssetSetup.name)) {
                this.display = true;
                this.modelValue = true;
            }
        }        
        if (this.sourceAssetSetup.assetId && this.sourceAssetSetup.alternateAssetId && this.sourceAssetSetup.name)
        {
            this.isSaving = true;

            if (!this.sourceAssetSetup.assetRecordId) {
                this.sourceAssetSetup.createdBy = this.userName;
                this.sourceAssetSetup.updatedBy = this.userName;
                this.sourceAssetSetup.masterCompanyId = 1;
                this.sourceAssetSetup.isActive = true;
                if (this.sourceAssetSetup.isIntangible == true) {
                    this.sourceAssetSetup.isDepreciable = false;
                    this.sourceAssetSetup.isSerialized = false;
                    this.sourceAssetSetup.manufacturerId = "";
                    this.sourceAssetSetup.currencyId = "";
                    this.sourceAssetSetup.memo = "";
                    this.sourceAssetSetup.unitOfMeasureId = "";
                    this.sourceAssetSetup.unitCost = "";
                    this.sourceAssetSetup.model = "";
                    this.sourceAssetSetup.assetAcquisitionTypeId = "";
                    this.sourceAssetSetup.manufacturedDate = "";
                    this.sourceAssetSetup.asset_Location = "";
                    this.sourceAssetSetup.assetTypeSingleScreenId = "";
                }
                if (this.sourceAssetSetup.isDepreciable == true) {
                    this.sourceAssetSetup.isIntangible = false;
                }
                this.assetService.addAsset(this.sourceAssetSetup).subscribe(data => {
                    this.sourceAssetSetup.updatedBy = this.userName;
                    this.listCollection = data;
                    this.assetService.generalCollection = this.listCollection;
                    this.activeIndex = 0;
                })
            }
            else {
                this.sourceAssetSetup.updatedBy = this.userName;
                this.sourceAssetSetup.masterCompanyId = 1;
                if (this.sourceAssetSetup.isIntangible == true) {
                    this.sourceAssetSetup.isDepreciable = false;
                    this.sourceAssetSetup.isSerialized = false;
                    this.sourceAssetSetup.manufacturerId = "";
                    this.sourceAssetSetup.currencyId = "";
                    this.sourceAssetSetup.memo = "";
                    this.sourceAssetSetup.unitOfMeasureId = "";
                    this.sourceAssetSetup.unitCost = "";
                    this.sourceAssetSetup.model = "";
                    this.sourceAssetSetup.assetAcquisitionTypeId = "";
                    this.sourceAssetSetup.manufacturedDate = "";
                    this.sourceAssetSetup.asset_Location = "";
                    this.sourceAssetSetup.assetTypeSingleScreenId = "";
                }
                if (this.sourceAssetSetup.isDepreciable == true) {
                    this.sourceAssetSetup.isIntangible = false;
                }
                this.assetService.updateAsset(this.sourceAssetSetup).subscribe(
                    response => this.saveCompleted(this.sourceAssetSetup),
                    error => this.saveFailedHelper(error));
                this.activeIndex = 0;
                this.assetService.indexObj.next(this.activeIndex);
            }
        }
    }
}
