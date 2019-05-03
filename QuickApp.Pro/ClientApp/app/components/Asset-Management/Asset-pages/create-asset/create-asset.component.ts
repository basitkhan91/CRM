import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../../services/asset/Assetservice';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { UnitOfMeasureService } from '../../../../services/unitofmeasure.service';
import { Currency } from '../../../../models/currency.model';
import { CurrencyService } from '../../../../services/currency.service';
import { AuthService } from '../../../../services/auth.service';
import { AssetIntangibleTypeService } from '../../../../services/AssetIntangibleType/AssetIntangibleType.service';
import { GlAccount } from '../../../../models/GlAccount.model';
import { GlAccountService } from '../../../../services/glAccount/glAccount.service';
import { AssetTypeService } from '../../../../services/AssetType/assettype.service';
import { DepriciationMethodService } from '../../../../services/depriciation-method/depriciation.service';
import { DepriciationMethod } from '../../../../models/depriciation-method.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-asset',
    templateUrl: './create-asset.component.html',
    styleUrls: ['./create-asset.component.scss']
})
/** create-asset component*/
export class CreateAssetComponent implements OnInit {
    activeIndex: number;
    currentAsset: any = {};
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
    allIntangibleInfo: any[];
    display: boolean = false;
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
    disableSave: boolean;
    onSelectedId: any;
    localCollection: any[];
    managementStructureData: any = [];
    updateMode: boolean = false;
    allGlInfo: GlAccount[];
    currentSelectedIntangibleAssetType: any = {};
    currentSelectedAssetType: any = {};
    depriciationMethodList: DepriciationMethod[];
    allAssets: any[]=[];

    constructor(private glAccountService: GlAccountService, private intangibleTypeService: AssetIntangibleTypeService, private route: Router, private assetService: AssetService, private legalEntityServices: LegalEntityService, private alertService: AlertService, public itemMasterservice: ItemMasterService,
        public unitService: UnitOfMeasureService, public currencyService: CurrencyService, public assetTypeService: AssetTypeService, private depriciationMethodService: DepriciationMethodService,  private authService: AuthService, ) {
       
        if (this.assetService.listCollection != null && this.assetService.isEditMode == true) {

            this.showLable = true;
            this.currentAsset = this.assetService.listCollection;
            this.updateMode = true;

            if (this.currentAsset.isIntangible ==true) {
                this.currentAsset.isDepreciable = false;
                this.currentAsset.isIntangible = true;
            }
            else {
                this.currentAsset.isDepreciable = true;
                this.currentAsset.isIntangible = false;
            }
           
        }
        if (this.currentAsset.expirationDate) {
            this.currentAsset.expirationDate = new Date(this.currentAsset.expirationDate);
        }
        else {
            this.currentAsset.expirationDate = new Date();
        }
        if (this.currentAsset.manufacturedDate) {
            this.currentAsset.manufacturedDate = new Date(this.currentAsset.manufacturedDate);
        }
        else {
            this.currentAsset.manufacturedDate = new Date();
        }
     
    }

    ngOnInit() {

        this.currentAsset.isDepreciable = true;
        this.assetService.currentUrl = '/assetmodule/assetpages/app-create-asset';
        this.assetService.bredcrumbObj.next(this.assetService.currentUrl);
        //steps Code  Start
        this.assetService.ShowPtab = true;
        this.getAssetsList();
        this.assetService.alertObj.next(this.assetService.ShowPtab); //steps
        this.activeIndex = 0;
        this.loadManagementdata();
        this.manufacturerdata();
        this.unitOfMeasureList();
        this.CurrencyData();
        this.assetTypeData();
        this.intangibleData();
        this.glList();
        this.loadDepricationMethod();
    }

    private getAssetsList() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.assetService.getAssetList().subscribe(
            results => this.onAssetListLoaded(results[0]),
            error => this.onDataLoadFailed(error)
        );
        this.selectedColumns = this.cols;
    }

    private onAssetListLoaded(assetList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allAssetInfo = assetList;
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    
    onAssetIdselection(event) {
        if (this.allAssets) {

            for (let i = 0; i < this.allAssets.length; i++) {
                if (event == this.allAssets[i][0].assetId) {
                    this.currentAsset.assetId = this.allAssets[i].assetId;
                    this.disableSave = true;

                    this.onSelectedId = event;
                }
            }
        }
    }

    assetIdHandler(event) {
        if (event) {
        if (event.target.value != "") {
            
                let value = event.target.value.toLowerCase();
                if (this.onSelectedId) {
                    if (value == this.onSelectedId.toLowerCase()) {
                        this.disableSave = true;
                    }
                    else {
                        this.disableSave = false;
                    }
                }
            }
           
        }
    }

    filterAssetId(event) {

        this.localCollection = [];
        if (this.allAssetInfo) {
            for (let i = 0; i < this.allAssetInfo.length; i++) {
                let assetId = this.allAssetInfo[i].assetId;
                if (assetId) {
                    if (assetId.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                        this.allAssets.push([{
                            "assetRecordId": this.allAssetInfo[i].assetRecordId,
                            "assetId": this.allAssetInfo[i].assetId
                        }]),
                            this.localCollection.push(assetId)

                    }
                }
            }
        }
    }

    checkMSParents(msId) {
        this.managementStructureData.push(msId);
        for (let a = 0; a < this.allManagemtninfo.length; a++) {
            if (this.allManagemtninfo[a].managementStructureId == msId) {
                if (this.allManagemtninfo[a].parentId) {
                    this.checkMSParents(this.allManagemtninfo[a].parentId);
                    break;
                }
            }
        }

    }

    setManagementStrucureData(obj) {
        this.managementStructureData = [];
        this.checkMSParents(obj.managementStructureId);
        if (this.managementStructureData.length == 4) {
            this.currentAsset.companyId = this.managementStructureData[3];
            this.currentAsset.buisinessUnitId = this.managementStructureData[2];
            this.currentAsset.departmentId = this.managementStructureData[1];
            this.currentAsset.divisionId = this.managementStructureData[0];
            this.getBUList(this.currentAsset.companyId);
            this.getDepartmentlist(this.currentAsset.buisinessUnitId);
            this.getDivisionlist(this.currentAsset.departmentId);
        }
        if (this.managementStructureData.length == 3) {
            this.currentAsset.companyId = this.managementStructureData[2];
            this.currentAsset.buisinessUnitId = this.managementStructureData[1];
            this.currentAsset.departmentId = this.managementStructureData[0];
            this.getBUList(this.currentAsset.companyId);
            this.getDepartmentlist(this.currentAsset.buisinessUnitId);
        }
        if (this.managementStructureData.length == 2) {
            this.currentAsset.companyId = this.managementStructureData[1];
            this.currentAsset.buisinessUnitId = this.managementStructureData[0];
            this.getBUList(this.currentAsset.companyId);
        }
        if (this.managementStructureData.length == 1) {
            this.currentAsset.companyId = this.managementStructureData[0];
        }

    }

    getBUList(companyId) {
        if (this.updateMode == false) {
            this.currentAsset.buisinessUnitId = "";
            this.currentAsset.departmentId = "";
            this.currentAsset.divisionId = "";
            this.currentAsset.managementStructureId = companyId;
            this.departmentList = [];
            this.divisionlist = [];
            this.bulist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == companyId) {
                    this.bulist.push(this.allManagemtninfo[i])
                }
            }

        }
        else {
            this.departmentList = [];
            this.divisionlist = [];
            this.bulist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == companyId) {
                    this.bulist.push(this.allManagemtninfo[i])
                }
            }
        }
    }

    getDepartmentlist(businessUnitId) {
        if (this.updateMode == false) {
            this.currentAsset.departmentId = "";
            this.currentAsset.divisionId = "";
            this.currentAsset.managementStructureId = businessUnitId;
            this.departmentList = [];
            this.divisionlist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == businessUnitId) {
                    this.departmentList.push(this.allManagemtninfo[i]);
                }
            }

        }
        else {
            this.departmentList = [];
            this.divisionlist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == businessUnitId) {
                    this.departmentList.push(this.allManagemtninfo[i]);
                }
            }
        }
    }

    getDivisionlist(departmentId) {
        if (this.updateMode == false) {
            this.currentAsset.divisionId = "";
            this.currentAsset.managementStructureId = departmentId;
            this.divisionlist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == departmentId) {
                    this.divisionlist.push(this.allManagemtninfo[i]);
                }
            }
        }
        else {
            this.divisionlist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == departmentId) {
                    this.divisionlist.push(this.allManagemtninfo[i]);
                }
            }
        }
    }

    divisionChange(divisionId) {
        this.currentAsset.managementStructureId = divisionId;
    }

    private onManagemtntdataLoad(getAtaMainList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allManagemtninfo = getAtaMainList;

        for (let i = 0; i < this.allManagemtninfo.length; i++) {

            if (this.allManagemtninfo[i].parentId == null) {
                this.maincompanylist.push(this.allManagemtninfo[i]);
            }
        }

        this.setManagementStrucureData(this.currentAsset);

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

    private onAssetTypeLoad(getAssetTypeList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allAssetTypeInfo = getAssetTypeList;
        if (this.assetService.isEditMode == true && this.currentAsset.assetTypeId) {
            this.getSelectedAssetType(this.currentAsset.assetTypeId);
        }
    }

    private onIntangibletypeLoad(getAssetTypeList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allIntangibleInfo = getAssetTypeList;
        if (this.assetService.isEditMode == true && this.currentAsset.assetIntangibleTypeId) {
            this.getSelectedIntangible(this.currentAsset.assetIntangibleTypeId);
        }
    }

    private assetTypeData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.assetTypeService.getAll().subscribe(
            results => this.onAssetTypeLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
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

    private intangibleData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.intangibleTypeService.getAll().subscribe(
            results => this.onIntangibletypeLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    onDepreciable() {
        this.currentAsset.isDepreciable = true;
        this.currentAsset.isIntangible = false;
    }

    onIntangible() {
        this.currentAsset.isIntangible = true;
        this.currentAsset.isDepreciable = false;
    }
    
    saveAsset(): void {

        if (this.currentAsset.isDepreciable == true) {
            if (!(this.currentAsset.assetId && this.currentAsset.alternateAssetId && this.currentAsset.name && this.currentAsset.unitOfMeasureId
                && this.currentAsset.currencyId && this.currentAsset.assetTypeId && this.currentAsset.assetAcquisitionTypeId)) {
                this.display = true;
                this.modelValue = true;
            }
        }
        if (this.currentAsset.assetId && this.currentAsset.alternateAssetId && this.currentAsset.name && this.currentAsset.unitOfMeasureId
            && this.currentAsset.currencyId && this.currentAsset.assetTypeId && this.currentAsset.assetAcquisitionTypeId)

            if (this.currentAsset.isIntangible == true) {
                if (!(this.currentAsset.assetId && this.currentAsset.alternateAssetId && this.currentAsset.name && this.currentAsset.assetIntangibleTypeId)) {
                    this.display = true;
                    this.modelValue = true;
                }
            }
        if ((this.currentAsset.assetId && this.currentAsset.alternateAssetId && this.currentAsset.name && this.currentAsset.assetIntangibleTypeId)
            || (this.currentAsset.assetId && this.currentAsset.alternateAssetId && this.currentAsset.name && this.currentAsset.unitOfMeasureId
            && this.currentAsset.currencyId && this.currentAsset.assetTypeId && this.currentAsset.assetAcquisitionTypeId)) {
            this.isSaving = true;

            if (!this.currentAsset.assetRecordId) {
                this.currentAsset.createdBy = this.userName;
                this.currentAsset.updatedBy = this.userName;
                this.currentAsset.masterCompanyId = 1;
                this.currentAsset.isActive = true;
                if (this.currentAsset.isIntangible == true) {
                    this.currentAsset.isDepreciable = false;
                    this.currentAsset.isSerialized = false;
                    this.currentAsset.calibrationRequired = 0;
                    this.currentAsset.certificationRequired = 0;
                    this.currentAsset.inspectionRequired = 0;
                    this.currentAsset.verificationRequired = 0;
                    this.currentAsset.manufacturerId = "";
                    this.currentAsset.currencyId = "";
                    this.currentAsset.memo = "";
                    this.currentAsset.unitOfMeasureId = "";
                    this.currentAsset.unitCost = "";
                    this.currentAsset.model = "";
                    this.currentAsset.assetAcquisitionTypeId = "";
                    this.currentAsset.manufacturedDate = "";
                    this.currentAsset.asset_Location = "";
                    this.currentAsset.assetTypeId = "";
                    this.currentSelectedAssetType.selectedObj = "";
                    delete this.currentAsset.assetType;
                    delete this.currentAsset.currency;
                    delete this.currentAsset.manufacturer;
                    delete this.currentAsset.unitOfMeasure;
                }
                if (this.currentAsset.isDepreciable == true) {
                    this.currentAsset.isIntangible = false;
                    this.currentSelectedIntangibleAssetType.selectedAssetObj = {};
                    this.currentAsset.assetIntangibleTypeId = "";
                }
                if (this.currentAsset.calibrationRequired == false) {
                    this.currentAsset.calibrationFrequencyMonths = null;
                    this.currentAsset.calibrationFrequencyDays = null;
                    this.currentAsset.calibrationDefaultVendorId = null;
                    this.currentAsset.calibrationDefaultCost = null;
                    this.currentAsset.calibrationCurrencyId = null;
                    this.currentAsset.calibrationGlAccountId = null;
                    this.currentAsset.calibrationMemo = null;
                    this.currentAsset.minTolerance1 = null;
                    this.currentAsset.minTolerance2 = null;
                    this.currentAsset.maxTolerance1 = null;
                    this.currentAsset.maxTolerance2 = null;
                    this.currentAsset.expectedTolerance1 = null;
                    this.currentAsset.expectedTolerance2 = null;
                    this.currentAsset.toleranceMemo = null;
                }
                if (this.currentAsset.certificationRequired == false) {
                    this.currentAsset.certificationFrequencyMonths = null;
                    this.currentAsset.certificationFrequencyDays = null;
                    this.currentAsset.certificationDefaultVendorId = null;
                    this.currentAsset.certificationDefaultCost = null;
                    this.currentAsset.certificationCurrencyId = null;
                    this.currentAsset.certificationGlAccountId = null;
                    this.currentAsset.certificationMemo = null;
                }
                if (this.currentAsset.inspectionRequired == false) {
                    this.currentAsset.inspectionFrequencyMonths = null;
                    this.currentAsset.inspectionFrequencyDays = null;
                    this.currentAsset.inspectionDefaultVendorId = null;
                    this.currentAsset.inspectionDefaultCost = null;
                    this.currentAsset.inspectionCurrencyId = null;
                    this.currentAsset.inspectionGlaAccountId = null;
                    this.currentAsset.inspectionMemo = null;
                }
                if (this.currentAsset.verificationRequired == false) {
                    this.currentAsset.verificationFrequencyMonths = null;
                    this.currentAsset.verificationFrequencyDays = null;
                    this.currentAsset.verificationDefaultVendorId = null;
                    this.currentAsset.verificationDefaultCost = null;
                    this.currentAsset.verificationCurrencyId = null;
                    this.currentAsset.verificationGlAccountId = null;
                    this.currentAsset.verificationMemo = null;
                }

                this.assetService.addAsset(this.currentAsset).subscribe(data => {
                    this.currentAsset.updatedBy = this.userName;
                    this.listCollection = data;
                    this.assetService.generalCollection = this.listCollection;
                    this.alertService.showMessage('Asset Created successfully.');
                    this.activeIndex = 0;
                })
            }
            else {
                this.currentAsset.updatedBy = this.userName;
                this.currentAsset.masterCompanyId = 1;
                if (this.currentAsset.isIntangible == true) {
                    this.currentAsset.isDepreciable = false;
                    this.currentAsset.isSerialized = false;
                    this.currentAsset.calibrationRequired = 0;
                    this.currentAsset.certificationRequired = 0;
                    this.currentAsset.inspectionRequired = 0;
                    this.currentAsset.verificationRequired = 0;
                    this.currentAsset.manufacturerId = "";
                    this.currentAsset.currencyId = "";
                    this.currentAsset.memo = "";
                    this.currentAsset.unitOfMeasureId = "";
                    this.currentAsset.unitCost = "";
                    this.currentAsset.model = "";
                    this.currentAsset.assetAcquisitionTypeId = "";
                    this.currentAsset.manufacturedDate = "";
                    this.currentAsset.asset_Location = "";
                    this.currentAsset.assetTypeId = "";
                    this.currentSelectedAssetType.selectedObj = "";
                    delete this.currentAsset.assetType;
                    delete this.currentAsset.currency;
                    delete this.currentAsset.manufacturer;
                    delete this.currentAsset.unitOfMeasure;
                }
                if (this.currentAsset.isDepreciable == true) {
                    this.currentAsset.isIntangible = false;
                    this.currentSelectedIntangibleAssetType.selectedAssetObj = {};
                    this.currentAsset.assetIntangibleTypeId = "";
                    delete this.currentAsset.assetType;
                    delete this.currentAsset.currency;
                    delete this.currentAsset.manufacturer;
                    delete this.currentAsset.unitOfMeasure;
                }
                if (this.currentAsset.calibrationRequired == false) {
                    this.currentAsset.calibrationFrequencyMonths = null;
                    this.currentAsset.calibrationFrequencyDays = null;
                    this.currentAsset.calibrationDefaultVendorId = null;
                    this.currentAsset.calibrationDefaultCost = null;
                    this.currentAsset.calibrationCurrencyId = null;
                    this.currentAsset.calibrationGlAccountId = null;
                    this.currentAsset.calibrationMemo = null;
                    this.currentAsset.minTolerance1 = null;
                    this.currentAsset.minTolerance2 = null;
                    this.currentAsset.maxTolerance1 = null;
                    this.currentAsset.maxTolerance2 = null;
                    this.currentAsset.expectedTolerance1 = null;
                    this.currentAsset.expectedTolerance2 = null;
                    this.currentAsset.toleranceMemo = null;
                }
                if (this.currentAsset.certificationRequired == false) {
                    this.currentAsset.certificationFrequencyMonths = null;
                    this.currentAsset.certificationFrequencyDays = null;
                    this.currentAsset.certificationDefaultVendorId = null;
                    this.currentAsset.certificationDefaultCost = null;
                    this.currentAsset.certificationCurrencyId = null;
                    this.currentAsset.certificationGlAccountId = null;
                    this.currentAsset.certificationMemo = null;
                }
                if (this.currentAsset.inspectionRequired == false) {
                    this.currentAsset.inspectionFrequencyMonths = null;
                    this.currentAsset.inspectionFrequencyDays = null;
                    this.currentAsset.inspectionDefaultVendorId = null;
                    this.currentAsset.inspectionDefaultCost = null;
                    this.currentAsset.inspectionCurrencyId = null;
                    this.currentAsset.inspectionGlaAccountId = null;
                    this.currentAsset.inspectionMemo = null;
                }
                if (this.currentAsset.verificationRequired == false) {
                    this.currentAsset.verificationFrequencyMonths = null;
                    this.currentAsset.verificationFrequencyDays = null;
                    this.currentAsset.verificationDefaultVendorId = null;
                    this.currentAsset.verificationDefaultCost = null;
                    this.currentAsset.verificationCurrencyId = null;
                    this.currentAsset.verificationGlAccountId = null;
                    this.currentAsset.verificationMemo = null;
                }

                this.assetService.updateAsset(this.currentAsset).subscribe(data => {
                    this.currentAsset.updatedBy = this.userName;
                    this.listCollection = data;
                    this.assetService.generalCollection = this.listCollection;
                    this.alertService.showMessage('Asset Updated successfully.');
                    this.activeIndex = 0;
                })
            }
        }
    }
    getSelectedIntangible(selectedObj) {
        this.currentSelectedIntangibleAssetType = Object.assign({}, this.allIntangibleInfo.filter(function (intangible) {
            return intangible.assetIntangibleTypeId == selectedObj;
        })[0]);;
       
      
    }

    getSelectedAssetType(selectedAssetObj) {
        
        this.currentSelectedAssetType = Object.assign({}, this.allAssetTypeInfo.filter(function (asset) {
            return asset.assetTypeId == selectedAssetObj;
        })[0]);;
    }

    loadDepricationMethod() {
        this.depriciationMethodService.getAll().subscribe(depriciationmethods => {
            this.depriciationMethodList = depriciationmethods[0];
        });
    }

    nextClick() {
        this.activeIndex = 1;
        this.assetService.indexObj.next(this.activeIndex);
        this.route.navigateByUrl('/assetmodule/assetpages/app-asset-capes');
    }
}
