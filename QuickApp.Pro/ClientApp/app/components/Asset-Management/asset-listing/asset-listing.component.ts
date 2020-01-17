﻿import { Component, OnInit, Input } from '@angular/core';
//import { AlertService } from '../../../services/alert.service';
import { AssetService } from '../../../services/asset/Assetservice';
import { Router } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOut } from '../../../services/animations';
import { SingleScreenAuditDetails } from '../../../models/single-screen-audit-details.model';
import { AlertService, DialogType, MessageSeverity } from '../../../services/alert.service';
import { GlAccountService } from '../../../services/glAccount/glAccount.service';
import { VendorEndpointService } from '../../../services/vendor-endpoint.service';
import { Vendor } from '../../../models/vendor.model';
import { GlAccount } from '../../../models/GlAccount.model';
import { LegalEntityService } from '../../../services/legalentity.service';
import { AssetAttributeTypeService } from '../../../services/asset-attribute-type/asset-attribute-type.service';
import { AssetIntangibleTypeService } from '../../../services/asset-intangible-type/asset-intangible-type.service';
import { AssetIntangibleAttributeTypeService } from '../../../services/asset-intangible-attribute-type/asset-intangible-attribute-type.service';
import { DepriciationMethodService } from '../../../services/depriciation-method/depriciation.service';
import { DepriciationMethod } from '../../../models/depriciation-method.model';
import { CommonService } from '../../../services/common.service';
import { ItemMasterCapabilitiesModel } from '../../../models/itemMasterCapabilities.model';

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
    currentAsset: any = {};
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
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    updateMode: boolean = false;
    allManagemtninfo: any[] = [];
    bulist: any[] = [];
    departmentList: any[] = [];
    divisionlist: any[] = [];
    maincompanylist: any[] = [];
    allManufacturerInfo: any[] = [];
    managementStructureData: any = [];
    depriciationMethodList: DepriciationMethod[] = [];
    depreciationFrequencyList: any[];
    assetAcquisitionTypeList: any[];
    GLAccountList: any[] = [];
    allCapesInfo: ItemMasterCapabilitiesModel[] = [];
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
    allAssetInfoNew: any[] = [];
    cols: { field: string; header: string; }[];
    selectedColumns: { field: string; header: string; }[];
    selectedCol: { field: string; header: string; }[];
    constructor(private alertService: AlertService, private assetService: AssetService, private _route: Router,
        private modalService: NgbModal, private glAccountService: GlAccountService,
        public assetattrService1: AssetAttributeTypeService, public assetIntangibleService: AssetIntangibleAttributeTypeService,
        private vendorEndpointService: VendorEndpointService, private depriciationMethodService: DepriciationMethodService, private commonservice: CommonService,
        private legalEntityServices: LegalEntityService
    ) {
        this.assetService.isEditMode = false;
        this.assetService.listCollection = null;
    }

    //Functionality for pagination.
    //to-do: Build lazy loading
    changePage(event: { first: any; rows: number }) {
        const pageIndex = (event.first / event.rows);
        this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }

    private onDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allAssetInfo = allWorkFlows;
        console.log(this.allAssetInfo);
        this.totalRecords = this.allAssetInfo.length;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.loadManagementdata();
    }

    private loadData() {

        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.assetService.getAssetList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.cols = [

            { field: 'name', header: 'Asset Name' },
            { field: 'assetId', header: 'Asset ID' },
            { field: 'alternateAssetId', header: 'Alt Asset ID' },
            { field: 'manufacturerName', header: 'Manufacturer' },
            { field: 'isSerializedNew', header: 'Serial Num' },
            { field: 'calibrationRequiredNew', header: 'Calibrated' },
            { field: 'companyName', header: 'Co' },
            { field: 'buName', header: 'BU' },
            { field: 'deptName', header: 'Div' },
            { field: 'divName', header: 'Dept' },
            { field: 'assetClass', header: 'Asset Category' },
            { field: 'assetType', header: 'Asset Class' },
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
        //console.log(getGl);
        //console.log(getGl[0]);
        if (getGl && getGl[0] != undefined) {
            this.alertService.stopLoadingMessage();
            this.loadingIndicator = false;
            this.assetViewList.inspectionGlaAccountName = getGl[0].accountName;
        }
    }

    private getInspecVendorName() {
        console.log('129', this.assetViewList.inspectionDefaultVendorId);
        this.vendorEndpointService.getVendorsDatawithid(this.assetViewList.inspectionDefaultVendorId).subscribe(
            results => this.onVendorLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onVendorLoad(vendor: Vendor) {
        console.log(vendor);
        if (vendor) {
            //console.log(vendor);
            this.alertService.stopLoadingMessage();
            this.loadingIndicator = false;
            this.assetViewList.inspectionDefaultVendorName = vendor.vendorName;
        }
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
                this.totalRecords = this.allAssetInfo.length;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
                this.modal.close();
                this.loadManagementdata();
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
                    this.loadManagementdata();
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
                    this.loadManagementdata();
                });
            })
        }
    }

    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.assetService.listCollection = row;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    loadDepricationMethod() {
        this.depriciationMethodService.getAll().subscribe(depriciationmethods => {
            this.depriciationMethodList = depriciationmethods[0].columnData;
            console.log(this.depriciationMethodList);
        });
    }
    openView(content, row) {
        console.log('row @170 ', row);
        this.assetViewList.entryDate = row.entryDate;
        this.assetViewList.assetId = row.assetId;
        this.assetViewList.alternateAssetId = row.alternateAssetId;
        this.assetViewList.name = row.name;
        this.assetViewList.description = row.description;
        this.assetViewList.companyName = row.companyName;
        this.assetViewList.buName = row.buName;
        this.assetViewList.deptName = row.deptName;
        this.assetViewList.divName = row.divName;
        this.assetViewList.depreOrIntang = row.isDepreciable == true ? 'Depreciable' : 'Intangible';
        this.assetViewList.calibrationRequired = row.calibrationRequired;
        this.assetViewList.certificationRequired = row.certificationRequired;
        this.assetViewList.inspectionRequired = row.inspectionRequired;
        this.assetViewList.verificationRequired = row.verificationRequired;
        this.assetViewList.model = row.model;
        this.getAssetAcquisitionTypeList();
        this.assetViewList.assetAcquisitionTypeId = this.getAssetAcqName(row.assetAcquisitionTypeId);
        this.assetViewList.manufacturerName = row.manufacturerName;
        this.assetViewList.manufacturedDate = row.manufacturedDate;
        this.assetViewList.model = row.model;
        this.assetViewList.isSerialized = row.isSerialized == true ? 'Yes' : 'No';
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
        this.assetViewList.calibrationFrequencyMonths = row.calibrationFrequencyMonths;
        this.assetViewList.calibrationFrequencyDays = row.calibrationFrequencyDays;
        this.assetViewList.calibrationDefaultVendorId = row.calibrationDefaultVendorId;
        this.assetViewList.calibrationDefaultCost = row.calibrationDefaultCost;
        this.assetViewList.calibrationGlAccountId = row.calibrationGlAccountId;

        this.assetViewList.certificationFrequencyMonths = row.certificationFrequencyMonths;
        this.assetViewList.certificationFrequencyDays = row.certificationFrequencyDays;
        this.assetViewList.certificationDefaultVendorId = row.certificationDefaultVendorId;
        this.assetViewList.certificationDefaultCost = row.certificationDefaultCost;
        this.assetViewList.certificationGlAccountId = row.certificationGlAccountId;

        this.assetViewList.inspectionFrequencyMonths = row.inspectionFrequencyMonths;
        this.assetViewList.inspectionFrequencyDays = row.inspectionFrequencyDays;
        this.assetViewList.inspectionDefaultVendorId = row.inspectionDefaultVendorId;
        this.assetViewList.inspectionDefaultCost = row.inspectionDefaultCost;
        this.assetViewList.inspectionGlaAccountId = row.inspectionGlaAccountId;

        this.assetViewList.verificationFrequencyMonths = row.verificationFrequencyMonths;
        this.assetViewList.verificationFrequencyDays = row.verificationFrequencyDays;
        this.assetViewList.verificationDefaultVendorId = row.verificationDefaultVendorId;
        this.assetViewList.verificationDefaultCost = row.verificationDefaultCost;
        this.assetViewList.verificationGlaAccountId = row.verificationGlaAccountId;

        this.getInsecGLAccName();
        this.getInspecVendorName();
        this.loadDepricationMethod();
        this.glList();
        this.getDepreciationFrequencyList();
        this.assetViewList.inspectionMemo = row.inspectionMemo;
        this.assetViewList.manufacturedDate = row.manufacturedDate;
        this.assetViewList.isSerialized = row.isSerialized;
        if (row.unitOfMeasure) {
            this.assetViewList.unitOfMeasureId = row.unitOfMeasure.shortName;
        }
        else { this.assetViewList.unitOfMeasureId = "" }

        if (row.glAccount) {
            this.assetViewList.glAccountId = row.glAccount.accountName;
        }
        else {
            this.assetViewList.glAccountId = "";
        }

        this.assetattrService1.getByAssetTypeId(row.assetTypeId).subscribe(
            audits => this.onSuccessfulAssetType(audits)
        );

        if (row.assetType) {
            this.assetViewList.assetTypeId = row.assetType;
        }
        else {
            this.assetViewList.assetTypeId = "";
        }
        this.assetService.getcapabilityListData(row.assetRecordId).subscribe(
            results => this.onCapesLoaded(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.cols = [

            { field: 'partNumber', header: 'PN' },
            { field: 'partDescription', header: 'PN Description' },
            { field: 'captypedescription', header: 'Capability Type' },
            { field: 'manufacturer', header: 'Aircraft Manufacturer' },
            { field: 'modelname', header: 'Models' },
            { field: 'dashnumber', header: 'Dash Number' }
        ];
        this.selectedCol = this.cols;
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

            this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
            this.modal.result.then(() => {
                console.log('When user closes');
            }, () => { console.log('Backdrop click') })
        }
    }
    private onCapesLoaded(allCapes: ItemMasterCapabilitiesModel[]) {
        this.allCapesInfo = allCapes;
    }
    
    getAssetAcqName(id) {
        for (let i = 0; i < this.assetAcquisitionTypeList.length; i++) {
            if (id == this.assetAcquisitionTypeList[i].value)
                return this.assetAcquisitionTypeList[i].label;
        }
    }

    getDeprMethodName(id) {
        for (let i = 0; i < this.depriciationMethodList.length; i++) {
            if (id == this.depriciationMethodList[i].assetDepreciationMethodId)
                return this.depriciationMethodList[i].name;
        }
    }

    getDeprFrequencyName(id) {
        for (let i = 0; i < this.depreciationFrequencyList.length; i++) {
            if (id == this.depreciationFrequencyList[i].value)
                return this.depreciationFrequencyList[i].label;
        }
    }

    getGLAccountName(id) {
        for (let i = 0; i < this.GLAccountList.length; i++) {
            if (id == this.GLAccountList[i].glAccountId)
                return this.GLAccountList[i].accountName;
        }
    }

    getGLAccountCode(id) {
        for (let i = 0; i < this.GLAccountList.length; i++) {
            if (id == this.GLAccountList[i].glAccountId)
                return this.GLAccountList[i].accountCode;
        }
    }


    onSuccessfulAssetType(audits: any[]) {
        if (audits && audits[0]) {
            this.assetViewList.assetAttributeTypeId = audits[0].assetAttributeTypeId;
            this.assetViewList.assetAttributeTypeName = audits[0].assetAttributeTypeName;
            this.assetViewList.description = audits[0].description;
            this.assetViewList.conventionType = audits[0].conventionType;
            this.assetViewList.depreciationMethod = audits[0].depreciationMethod;
            this.assetViewList.depreciationMethodObj = this.getDeprMethodName(audits[0].depreciationMethod);
            this.assetViewList.residualPercentage = audits[0].residualPercentage;
            this.assetViewList.residualValue = audits[0].residualValue;
            this.assetViewList.assetLife = audits[0].assetLife;
            this.assetViewList.depreciationFrequencyId = audits[0].depreciationFrequencyId;
            this.assetViewList.depreciationFrequencyObj = this.getDeprFrequencyName(audits[0].depreciationFrequencyId);
            this.assetViewList.acquiredGLAccountId = audits[0].acquiredGLAccountId;
            this.assetViewList.acquiredGLAccountObj = this.getGLAccountName(audits[0].acquiredGLAccountId);
            this.assetViewList.deprExpenseGLAccountId = audits[0].deprExpenseGLAccountId;
            this.assetViewList.deprExpenseGLAccountObj = this.getGLAccountName(audits[0].deprExpenseGLAccountId);
            this.assetViewList.adDepsGLAccountId = audits[0].adDepsGLAccountId;
            this.assetViewList.adDepsGLAccountObj = this.getGLAccountName(audits[0].adDepsGLAccountId);
            this.assetViewList.assetSale = audits[0].assetSale;
            this.assetViewList.assetSaleObj = this.getGLAccountCode(audits[0].assetSale);
            this.assetViewList.assetWriteOff = audits[0].assetWriteOff;
            this.assetViewList.assetWriteOffObj = this.getGLAccountCode(audits[0].assetWriteOff);
            this.assetViewList.assetWriteDown = audits[0].assetWriteDown;
            this.assetViewList.assetWriteDownObj = this.getGLAccountCode(audits[0].assetWriteDown);
            this.assetViewList.createdBy = audits[0].createdBy;
            this.assetViewList.updatedBy = audits[0].updatedBy;
            this.assetViewList.createdDate = audits[0].createdDate;
            this.assetViewList.updatedDate = audits[0].updatedDate;
            this.assetViewList.isDelete = audits[0].isDelete;
            this.assetViewList.isActive = audits[0].isActive;
        }
    }

    getAssetAcquisitionTypeList() {
        this.commonservice.smartDropDownList('AssetAcquisitionType', 'AssetAcquisitionTypeId', 'Name').subscribe(res => {
            this.assetAcquisitionTypeList = res;

        })
    }

    private onGlAccountLoad_1(getGlList: GlAccount[]) {
        this.GLAccountList = getGlList;
    }

    private glList() {
        this.glAccountService.getAll().subscribe(
            results => this.onGlAccountLoad_1(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    getDepreciationFrequencyList() {
        this.commonservice.smartDropDownList('AssetDepreciationFrequency', 'AssetDepreciationFrequencyId', 'Name').subscribe(res => {
            this.depreciationFrequencyList = res;

        })
    }
    private loadManagementdata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.legalEntityServices.getManagemententity().subscribe(
            results => this.onManagemtntdataLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
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

        for (let i = 0; i < this.allAssetInfo.length; i++) {
            this.currentAsset = { ...this.allAssetInfo[i] };
            let companyName = '';
            let buName = '';
            let deptName = '';
            let divName = '';
            let manufacturerName = '';
            this.setManagementStrucureData(this.currentAsset);
            if (this.currentAsset.companyId) {
                companyName = this.getNameById(this.currentAsset.companyId);
            }
            if (this.currentAsset.buisinessUnitId) {
                buName = this.getNameById(this.currentAsset.buisinessUnitId);
            }
            if (this.currentAsset.departmentId) {
                deptName = this.getNameById(this.currentAsset.departmentId);
            }
            if (this.currentAsset.divisionId) {
                divName = this.getNameById(this.currentAsset.divisionId);
            }
            if (this.currentAsset.manufacturer) {
                manufacturerName = this.currentAsset.manufacturer.name
            }

            if (this.currentAsset.isDepreciable) {

            }

            this.currentAsset = {
                ...this.currentAsset,
                companyName: companyName,
                buName: buName,
                deptName: deptName,
                divName: divName,
                manufacturerName: manufacturerName,
                isSerializedNew: this.currentAsset.isSerialized == true ? 'Yes' : 'No',
                calibrationRequiredNew: this.currentAsset.calibrationRequired == true ? 'Yes' : 'No',
                assetClass: this.currentAsset.isDepreciable == true ? 'Tangible' : 'Intangible',
                assetType: this.currentAsset.assetType.assetTypeName,              
            };
            
            this.allAssetInfoNew.push(this.currentAsset);
        }
        console.log(this.allManagemtninfo);
        console.log(this.allAssetInfoNew);

        //this.allAssetInfo = { ...this.allAssetInfoNew}
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
        console.log(this.managementStructureData.length);
        if (this.managementStructureData.length == 4) {
            this.currentAsset.companyId = this.managementStructureData[3];
            this.currentAsset.buisinessUnitId = this.managementStructureData[2];
            this.currentAsset.departmentId = this.managementStructureData[1];
            this.currentAsset.divisionId = this.managementStructureData[0];
            //this.getBUList(this.currentAsset.companyId);
            //this.getDepartmentlist(this.currentAsset.buisinessUnitId);
            //this.getDivisionlist(this.currentAsset.departmentId);
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

    getNameById(id) {
        for (let i = 0; i < this.allManagemtninfo.length; i++) {

            if (this.allManagemtninfo[i].managementStructureId == id) {
                return this.allManagemtninfo[i].code;
            }
        }
        return '';
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