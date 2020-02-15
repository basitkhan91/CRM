import { Component, OnInit } from '@angular/core';
import { AssetAttributeType } from '../../../../models/asset-attribute-type.model';
import { AssetAttributeTypeService } from '../../../../services/asset-attribute-type/asset-attribute-type.service';
import { AssetLocation } from '../../../../models/asset-location.model';
import { AssetLocationService } from '../../../../services/asset-location/asset-location.service';
import { AssetAcquisitionType } from '../../../../models/asset-acquisition-type.model';
import { AssetAcquisitionTypeService } from '../../../../services/asset-acquisition-type/asset-acquisition-type.service';
import { AssetService } from '../../../../services/asset/Assetservice';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { UnitOfMeasureService } from '../../../../services/unitofmeasure.service';
import { Currency } from '../../../../models/currency.model';
import { CurrencyService } from '../../../../services/currency.service';
import { AuthService } from '../../../../services/auth.service';
import { AssetIntangibleTypeService } from '../../../../services/asset-intangible-type/asset-intangible-type.service';
import { AssetIntangibleAttributeTypeService } from '../../../../services/asset-intangible-attribute-type/asset-intangible-attribute-type.service';
import { GlAccount } from '../../../../models/GlAccount.model';
import { GlAccountService } from '../../../../services/glAccount/glAccount.service';
import { AssetTypeService } from '../../../../services/asset-type/asset-type.service';
import { DepriciationMethodService } from '../../../../services/depriciation-method/depriciation.service';
import { DepriciationMethod } from '../../../../models/depriciation-method.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetIntangibleType } from '../../../../models/asset-intangible-type.model';
import { AssetIntangibleAttributeType } from '../../../../models/asset-intangible-attribute-type.model';
import { CommonService } from '../../../../services/common.service';
import { forEach } from '@angular/router/src/utils/collection';
import { validateRecordExistsOrNot, getObjectById, selectedValueValidate, editValueAssignByCondition } from '../../../../generic/autocomplete';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

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
    departmentList: any[] = [];
    divisionlist: any[] = [];
    selAssetLocationId: any;
    assetLocationList: AssetLocation[] = [];
    allreasn: any[] = [];
    acqallreasn: any[] = [];
    currentRow: AssetAttributeType;
    currentIntangibleRow: AssetIntangibleAttributeType;
    BuData: boolean;
    DepData: boolean;
    divData: boolean;
    loadingIndicator: boolean;
    modal: NgbModalRef;
    maincompanylist: any[] = [];
    allManufacturerInfo: any[] = [];
    allUnitOfMeasureinfo: any[] = [];
    allCurrencyInfo: any[] = [];
    allAssetAttrInfo: any[] = [];
    allAssetIntanAttrInfo: any[] = [];
    allAssetLocations: any[] = [];
    allAssetTypeInfo: any[] = [];
    allIntangibleInfo: any[] = [];
    allAssetLocationInfo: any[] = [];
    display: boolean = false;
    modelValue: boolean;
    isDepreciable: boolean = true;
    AssetAcquisitionTypeList: AssetAcquisitionType[] = [];
    isSaving: boolean;
    listCollection: any = {};
    recordExists: boolean = false;
    intangible: boolean;
    showLable: boolean;
    isDeleteMode: boolean;
    selectedColumns: any;
    cols: any;
    allAssetInfo: any[] = [];
    excludedAssetInfo: any[] = [];
    disableSave: boolean;
    onSelectedId: any;
    onAssetSelectedId: any;
    localCollection: any[];
    acqlocalCollection: any[];
    localCollectionExc: any[];
    managementStructureData: any = [];
    updateMode: boolean = false;
    allGlInfo: GlAccount[];
    currentSelectedIntangibleAssetType: any = {};
    selAssetAcquisitionTypeId: any;
    currentSelectedLocation: any = {};
    currentSelectedAssetType: any = {};
    currentSelectedAssetAttributeType: any = {};
    depriciationMethodList: DepriciationMethod[] = [];
    allAssets: any[] = [];
    auditHistory: any[];
    amortizationFrequencyList: any[] = [];
    depreciationFrequencyList: any[] = [];
    assetAcquisitionTypeList: any[] = [];
    GLAccountList: any[] = [];
    AssetId: any;
    managementValidCheck: boolean;
    static assetService;
    code: any = "";
    codeName: string = "";
    name: any = "";
    memo: any = "";
    selectedreason: any;
    assetLocationId: number = 0;
    public sourceAction: AssetLocation;
    private isDelete: boolean = false;

    public acqsourceAction: AssetAcquisitionType;

    constructor(private router: ActivatedRoute, private glAccountService: GlAccountService, private modalService: NgbModal, private activeModal: NgbActiveModal, private intangibleTypeService: AssetIntangibleTypeService, private route: Router, private assetService: AssetService, private legalEntityServices: LegalEntityService, private alertService: AlertService, public itemMasterservice: ItemMasterService,
        public unitService: UnitOfMeasureService, public currencyService: CurrencyService, public assetTypeService: AssetTypeService, private depriciationMethodService: DepriciationMethodService, private authService: AuthService, public assetattrService1: AssetAttributeTypeService, public assetIntangibleService: AssetIntangibleAttributeTypeService, private commonservice: CommonService, private assetLocationService: AssetLocationService, private AssetAcquisitionTypeService: AssetAcquisitionTypeService) {

        this.AssetId = this.router.snapshot.params['id'];
        this.sourceAction = new AssetLocation();

        /*this.currentAsset.companyId = "null";
        this.currentAsset.buisinessUnitId = 0;
        this.currentAsset.departmentId = 0;
        this.currentAsset.divisionId = 0;
        this.currentAsset.assetIntangibleTypeId = 0;*/
        this.loadDepricationMethod();
        this.assetLocationData();
        this.loadData();
        this.AcquisitionloadData();

        if (this.AssetId) {
            this.assetService.isEditMode = true;
            this.assetService.currentUrl = '/assetmodule/assetpages/app-edit-asset';
        } else {
            this.assetService.isEditMode = false;
            this.assetService.listCollection = null;
            this.assetService.currentUrl = '/assetmodule/assetpages/app-create-asset';
        }
        if (this.assetService.listCollection == undefined && this.AssetId != null) {
            this.GetAssetData(this.AssetId);
        }

        if (this.assetService.listCollection != null && this.assetService.isEditMode == true) {
            this.showLable = true;
            this.currentAsset = this.assetService.listCollection;
            this.onAssetSelectedId = this.currentAsset.assetId;
            this.onSelectedId = this.currentAsset.assetId;
            this.updateMode = true;
            if (this.currentAsset.isIntangible == true) {
                this.currentAsset.isDepreciable = false;
                this.currentAsset.isIntangible = true;
                this.showItemEdit(this.currentAsset.assetIntangibleTypeId);
            }
            else {
                this.currentAsset.isDepreciable = true;
                this.currentAsset.isIntangible = false;
                this.showItemEdit(this.currentAsset.assetTypeId);
            }

        }
        else {
            //this.currentAsset.companyId = "null";
        }
        if (this.currentAsset.expirationDate) {
            this.currentAsset.expirationDate = new Date(this.currentAsset.expirationDate);
        }
        //else {
        //    this.currentAsset.expirationDate = new Date();
        //}
        if (this.currentAsset.manufacturedDate) {
            this.currentAsset.manufacturedDate = new Date(this.currentAsset.manufacturedDate);
        }
        //else {
        //    this.currentAsset.manufacturedDate = new Date();
        //}
        if (this.currentAsset.entryDate) {
            this.currentAsset.entryDate = new Date(this.currentAsset.entryDate);
        }
        else {
            console.log(new Date().getDate());
            this.currentAsset.entryDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        }

    }

    ngOnInit() {

        this.AssetId = this.router.snapshot.params['id'];
        if (this.assetService.listCollection == undefined && this.AssetId != null) {
            this.GetAssetData(this.AssetId);
        }
        if (this.AssetId) {
            this.assetService.isEditMode = true;
            this.assetService.currentUrl = '/assetmodule/assetpages/app-edit-asset';
        } else {
            this.assetService.isEditMode = false;
            this.assetService.listCollection = null;
            this.assetService.currentUrl = '/assetmodule/assetpages/app-create-asset';
        }

        this.currentAsset.isDepreciable = true;

        this.assetService.bredcrumbObj.next(this.assetService.currentUrl);
        //steps Code  Start
        this.assetService.ShowPtab = true;
        this.AssetAttData();
        this.AssetIntanAttData();
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
        //this.loadDepricationMethod();
        this.getAmortizationFrequencyList();
        this.getDepreciationFrequencyList();
        this.getAssetAcquisitionTypeList();
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
        this.activeIndex = 0;
        this.assetService.indexObj.next(this.activeIndex);
        this.assetService.listCollection = getAssetData;
        if (this.assetService.listCollection != null && this.assetService.isEditMode == true) {
            this.showLable = true;
            this.currentAsset = this.assetService.listCollection;
            this.updateMode = true;
            if (this.currentAsset.isIntangible == true) {
                this.currentAsset.isDepreciable = false;
                this.currentAsset.isIntangible = true;
                this.showItemEdit(this.currentAsset.assetIntangibleTypeId);
            }
            else {
                this.currentAsset.isDepreciable = true;
                this.currentAsset.isIntangible = false;
                this.showItemEdit(this.currentAsset.assetTypeId);
            }

        }
        if (this.currentAsset.expirationDate) {
            this.currentAsset.expirationDate = new Date(this.currentAsset.expirationDate);
        }
        if (this.currentAsset.manufacturedDate) {
            this.currentAsset.manufacturedDate = new Date(this.currentAsset.manufacturedDate);
        }
        if (this.currentAsset.entryDate) {
            this.currentAsset.entryDate = new Date(this.currentAsset.entryDate);
        }
        else {
            this.currentAsset.entryDate = new Date();
        }

        this.currentAsset.isDepreciable = true;

        this.assetService.bredcrumbObj.next(this.assetService.currentUrl);
        //steps Code  Start
        this.assetService.ShowPtab = true;
        this.AssetAttData();

        this.getAssetsList();
        this.assetService.alertObj.next(this.assetService.ShowPtab); //steps
        this.activeIndex = 0;
        //this.loadManagementdata();
        this.manufacturerdata();
        this.unitOfMeasureList();
        this.CurrencyData();
        this.assetTypeData();
        this.intangibleData();
        this.glList();
        //this.loadDepricationMethod();
        this.getAmortizationFrequencyList();
        this.getDepreciationFrequencyList();
        this.getAssetAcquisitionTypeList();
        this.assetLocationData();

    }

    private AssetAttData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.assetattrService1.getAll().subscribe(
            results => this.onattrSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
        this.selectedColumns = this.cols;
    }

    private onattrSuccessful(getAssetAttrType: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allAssetAttrInfo = getAssetAttrType;
    }

    private AssetIntanAttData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.assetIntangibleService.getAll().subscribe(
            results => this.onIntangibleAttrSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onIntangibleAttrSuccessful(getAssetIntanAttrType: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allAssetIntanAttrInfo = getAssetIntanAttrType;
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
        this.excludedAssetInfo = assetList;
        if (this.AssetId != null && this.AssetId != undefined) {
            if (assetList != null && assetList != undefined) {
                for (let i = 0; i < assetList.length; i++) {
                    //console.log(assetList[i]);
                    if (assetList[i].assetId.toLowerCase() == this.AssetId) {
                        this.excludedAssetInfo.splice(i, 1);
                    }
                }
            }
        }
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    onAssetIdselection(event) {
        if (this.allAssets) {
            console.log(this.currentAsset);

            for (let i = 0; i < this.allAssets.length; i++) {
                console.log(this.allAssets[i][0]);
                if (event == this.allAssets[i][0].assetId) {
                    this.currentAsset.assetId = this.allAssets[i][0].assetId;
                    if (this.allAssets[i][0].assetId != this.onAssetSelectedId) {
                        this.disableSave = true;
                    }
                    else { this.disableSave = false; }
                    this.onSelectedId = event;
                }
            }
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

    getAmortFrequencyName(id) {
        for (let i = 0; i < this.amortizationFrequencyList.length; i++) {
            if (id == this.amortizationFrequencyList[i].value)
                return this.depreciationFrequencyList[i].label;
        }
    }
    showItemEdit(rowData): void {

        if (this.currentAsset.isDepreciable == true) {
            this.currentSelectedAssetAttributeType = {};
            this.loadDepricationMethod();
            this.glList();
            this.getDepreciationFrequencyList();
            this.currentRow = rowData as AssetAttributeType;
            this.assetattrService1.getByAssetTypeId(rowData).subscribe(
                audits => this.onSuccessfulAssetType(audits)
            );
        }
        else {
            this.currentSelectedIntangibleAssetType = {};
            this.loadDepricationMethod();
            this.glList();
            this.getAmortizationFrequencyList();
            this.currentIntangibleRow = rowData as AssetIntangibleAttributeType;
            this.assetIntangibleService.getById(rowData).subscribe(
                audits => this.onSuccessfulAssetIntanType(audits)
            );
        }
    }

    open(content) {
        this.recordExists = false;
        this.disableSave = true;
        this.isSaving = true;
        this.sourceAction = new AssetLocation();
        this.sourceAction.isActive = true;
        this.codeName = "";
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openacquisition(content) {
        this.recordExists = false;
        this.disableSave = true;
        this.isSaving = true;
        this.acqsourceAction = new AssetAcquisitionType();
        this.acqsourceAction.isActive = true;
        this.codeName = "";
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    acqeventHandler(event) {
        let value = event.target.value.toLowerCase()
        if (this.selectedreason) {
            console.log(191);
            if (value == this.selectedreason.toLowerCase()) {
                this.disableSave = true;
                this.recordExists = true;
            }
            else {
                this.disableSave = false;
                this.recordExists = false;
            }
        }
    }

    acqpartnmId(event) {
        //console.log(this.allreasn);
        console.log(event);
        for (let i = 0; i < this.acqallreasn.length; i++) {
            if (event == this.acqallreasn[i][0].codeName) {
                this.selectedreason = event;
                this.recordExists = false;
                this.disableSave = true;
                this.recordExists = true;
                this.selAssetAcquisitionTypeId = this.acqallreasn[i][0].AssetAcquisitionTypeId;
                this.selectedreason = event;
                console.log(this.acqallreasn[i][0]);
            }
        }
    }

    filterAssetAcquisitionType(event) {
        this.acqlocalCollection = [];

        for (let i = 0; i < this.AssetAcquisitionTypeList.length; i++) {

            let codeName = this.AssetAcquisitionTypeList[i].code
                ;

            if (codeName != null && codeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                console.log(codeName);
                this.acqallreasn.push([{
                    "AssetAcquisitionTypeId": this.AssetAcquisitionTypeList[i].assetAcquisitionTypeId,
                    "codeName": codeName
                }]),
                    this.acqlocalCollection.push(codeName);
            }
        }
    }


    eventHandler(event) {
        let value = event.target.value.toLowerCase();
        if (this.selectedreason) {
            console.log(191);
            if (value == this.selectedreason.toLowerCase()) {
                this.disableSave = true;
                this.recordExists = true;
            }
            else {
                this.disableSave = false;
                this.recordExists = false;
            }
        }
    }

    partnmId(event) {
        for (let i = 0; i < this.allreasn.length; i++) {
            if (event == this.allreasn[i][0].codeName) {
                this.disableSave = true;
                this.recordExists = true;
                this.selAssetLocationId = this.allreasn[i][0].assetLocationId;
                this.selectedreason = event;
                console.log(this.allreasn[i][0]);
            }
        }
    }

    filterAssetLocation(event) {
        this.localCollection = [];

        for (let i = 0; i < this.assetLocationList.length; i++) {

            let codeName = this.assetLocationList[i].code
                ;

            if (codeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                console.log(codeName);
                this.allreasn.push([{
                    "assetLocationId": this.assetLocationList[i].assetLocationId,
                    "codeName": codeName
                }]),
                    this.localCollection.push(codeName);
            }
        }
    }
    dismissModel() {
        this.modal.close();
    }



    SaveandEditAssetAcquisitionType() {
        // debugger;


        this.isSaving = true;
        console.log(this.sourceAction);

        const params = <any>{
            createdBy: this.userName,
            updatedBy: this.userName,
            Code: this.codeName,
            Name: this.acqsourceAction.name,
            Memo: this.acqsourceAction.memo,
            //AssetAcquisitionTypeId: this.sourceAction.assetAcquisitionTypeId,
            IsActive: this.acqsourceAction.isActive,
            IsDeleted: this.isDelete,
            masterCompanyId: 1
        };
        this.AssetAcquisitionTypeService.add(params).subscribe(
            role => this.acqsaveSuccessHelper(role),
            error => this.acqsaveFailedHelper(error));

        this.modal.close();
        this.getAssetAcquisitionTypeList();
    }

    private acqsaveSuccessHelper(role?: AssetAcquisitionType) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Asset Acquisition Type created successfully`, MessageSeverity.success);
        this.AcquisitionloadData();
        this.alertService.stopLoadingMessage();
    }

    private acqsaveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

    SaveandEditAssetLocation() {
        // debugger;


        this.isSaving = true;
        console.log(this);

        const params = <any>{
            createdBy: this.userName,
            updatedBy: this.userName,
            Code: this.codeName,
            Name: this.sourceAction.name,
            Memo: this.sourceAction.memo,
            assetLocationId: this.sourceAction.assetLocationId,
            IsActive: this.sourceAction.isActive,
            IsDeleted: false,
            masterCompanyId: 1
        };
        this.assetLocationService.add(params).subscribe(
            role => this.saveSuccessHelper(role),
            error => this.saveFailedHelper(error));

        this.modal.close();
        this.assetLocationData();
    }

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.assetLocationService.getAll().subscribe(data => {
            this.assetLocationList = data[0].columnData;
            console.log(this.assetLocationList);
        });
    }

    private AcquisitionloadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.AssetAcquisitionTypeService.getAll().subscribe(data => {
            this.AssetAcquisitionTypeList = data[0].columnData;
            console.log(this.AssetAcquisitionTypeList);
        });
    }


    private saveSuccessHelper(role?: AssetLocation) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Asset Location added successfully`, MessageSeverity.success);
        this.loadData();
        this.alertService.stopLoadingMessage();
    }

    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }
    onSuccessfulAssetType(audits: any[]) {
        if (audits && audits[0]) {
            this.currentSelectedAssetAttributeType.assetAttributeTypeId = audits[0].assetAttributeTypeId;
            this.currentSelectedAssetAttributeType.assetAttributeTypeName = audits[0].assetAttributeTypeName;
            this.currentSelectedAssetAttributeType.description = audits[0].description;
            this.currentSelectedAssetAttributeType.conventionType = audits[0].conventionType;
            this.currentSelectedAssetAttributeType.depreciationMethod = audits[0].depreciationMethod;
            console.log(this.getDeprMethodName(audits[0].depreciationMethod));
            //if(this.depriciationMethodList)
            //    console.log(getObjectById('assetDepreciationMethodId', audits[0].depreciationMethod, this.depriciationMethodList));
            this.currentSelectedAssetAttributeType.depreciationMethodObj = this.getDeprMethodName(audits[0].depreciationMethod);
            this.currentSelectedAssetAttributeType.residualPercentage = audits[0].residualPercentage;
            this.currentSelectedAssetAttributeType.residualValue = audits[0].residualValue;
            this.currentSelectedAssetAttributeType.assetLife = audits[0].assetLife;
            this.currentSelectedAssetAttributeType.depreciationFrequencyId = audits[0].depreciationFrequencyId;
            this.currentSelectedAssetAttributeType.depreciationFrequencyObj = this.getDeprFrequencyName(audits[0].depreciationFrequencyId);
            this.currentSelectedAssetAttributeType.acquiredGLAccountId = audits[0].acquiredGLAccountId;
            this.currentSelectedAssetAttributeType.acquiredGLAccountObj = this.getGLAccountName(audits[0].acquiredGLAccountId);
            this.currentSelectedAssetAttributeType.deprExpenseGLAccountId = audits[0].deprExpenseGLAccountId;
            this.currentSelectedAssetAttributeType.deprExpenseGLAccountObj = this.getGLAccountName(audits[0].deprExpenseGLAccountId);
            this.currentSelectedAssetAttributeType.adDepsGLAccountId = audits[0].adDepsGLAccountId;
            this.currentSelectedAssetAttributeType.adDepsGLAccountObj = this.getGLAccountName(audits[0].adDepsGLAccountId);
            this.currentSelectedAssetAttributeType.assetSale = audits[0].assetSale;
            this.currentSelectedAssetAttributeType.assetSaleObj = this.getGLAccountCode(audits[0].assetSale);
            this.currentSelectedAssetAttributeType.assetWriteOff = audits[0].assetWriteOff;
            this.currentSelectedAssetAttributeType.assetWriteOffObj = this.getGLAccountCode(audits[0].assetWriteOff);
            this.currentSelectedAssetAttributeType.assetWriteDown = audits[0].assetWriteDown;
            this.currentSelectedAssetAttributeType.assetWriteDownObj = this.getGLAccountCode(audits[0].assetWriteDown);
            this.currentSelectedAssetAttributeType.createdBy = audits[0].createdBy;
            this.currentSelectedAssetAttributeType.updatedBy = audits[0].updatedBy;
            this.currentSelectedAssetAttributeType.createdDate = audits[0].createdDate;
            this.currentSelectedAssetAttributeType.updatedDate = audits[0].updatedDate;
            this.currentSelectedAssetAttributeType.isDelete = audits[0].isDelete;
            this.currentSelectedAssetAttributeType.isActive = audits[0].isActive;
        }
    }

    onSuccessfulAssetIntanType(audits: any[]) {
        console.log('onSuccessfulAssetIntanType', audits[0]);
        if (audits && audits.length > 0 && audits[0]) {
            console.log(audits[0].assetIntangibleTypeId);
            this.currentSelectedIntangibleAssetType.assetIntangibleTypeId = audits[0].assetIntangibleTypeId;
            this.currentSelectedIntangibleAssetType.assetDepreciationMethodId = audits[0].assetDepreciationMethodId;
            this.currentSelectedIntangibleAssetType.assetDepreciationMethodObj = this.getDeprMethodName(audits[0].assetDepreciationMethodId);
            this.currentSelectedIntangibleAssetType.intangibleLife = audits[0].intangibleLifeYears;
            this.currentSelectedIntangibleAssetType.amortizationFrequency = audits[0].assetAmortizationIntervalId;
            this.currentSelectedIntangibleAssetType.amortizationFrequencyObj = this.getDeprFrequencyName(audits[0].assetAmortizationIntervalId);
            this.currentSelectedIntangibleAssetType.intangibleGLAccountId = audits[0].intangibleGLAccountId;
            this.currentSelectedIntangibleAssetType.intangibleGLAccountObj = this.getGLAccountCode(audits[0].intangibleGLAccountId);
            this.currentSelectedIntangibleAssetType.amortExpenseGLAccountId = audits[0].amortExpenseGLAccountId;
            this.currentSelectedIntangibleAssetType.amortExpenseGLAccountObj = this.getGLAccountCode(audits[0].amortExpenseGLAccountId);
            this.currentSelectedIntangibleAssetType.accAmortDeprGLAccountId = audits[0].accAmortDeprGLAccountId;
            this.currentSelectedIntangibleAssetType.accAmortDeprGLAccountObj = this.getGLAccountCode(audits[0].accAmortDeprGLAccountId);
            this.currentSelectedIntangibleAssetType.intangibleWriteDownGLAccountId = audits[0].intangibleWriteDownGLAccountId;
            this.currentSelectedIntangibleAssetType.intangibleWriteDownGLAccountObj = this.getGLAccountCode(audits[0].intangibleWriteDownGLAccountId);
            this.currentSelectedIntangibleAssetType.intangibleWriteOffGLAccountId = audits[0].intangibleWriteOffGLAccountId;
            this.currentSelectedIntangibleAssetType.intangibleWriteOffGLAccountObj = this.getGLAccountCode(audits[0].intangibleWriteOffGLAccountId);
            this.currentSelectedIntangibleAssetType.managementStructureId = audits[0].managementStructureId;
            this.currentSelectedIntangibleAssetType.masterCompanyId = audits[0].masterCompanyId;
            this.currentSelectedIntangibleAssetType.createdBy = audits[0].createdBy;
            this.currentSelectedIntangibleAssetType.updatedBy = audits[0].updatedBy;
            this.currentSelectedIntangibleAssetType.createdDate = audits[0].createdDate;
            this.currentSelectedIntangibleAssetType.updatedDate = audits[0].updatedDate;
            this.currentSelectedIntangibleAssetType.isDelete = audits[0].isDelete;
            this.currentSelectedIntangibleAssetType.isActive = audits[0].isActive;
        }
        console.log(this.currentSelectedIntangibleAssetType);
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
                    if (assetId != this.currentAsset.alternateAssetId && assetId != this.currentAsset.assetParentId) {
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
    }

    filterExcAssetId(event) {

        this.localCollectionExc = [];
        if (this.excludedAssetInfo) {
            for (let i = 0; i < this.excludedAssetInfo.length; i++) {
                let assetId = this.excludedAssetInfo[i].assetId;
                if (this.onSelectedId != assetId) {
                    if (assetId) {
                        if (assetId.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                            this.allAssets.push([{
                                "assetRecordId": this.excludedAssetInfo[i].assetRecordId,
                                "assetId": this.excludedAssetInfo[i].assetId
                            }]),
                                this.localCollectionExc.push(assetId)

                        }
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
        let assetTypeList: any[] = [];
        console.log('getAssetTypeList', getAssetTypeList);
        console.log('allAssetAttrInfo', this.allAssetAttrInfo);
        if (getAssetTypeList) {
            for (let i = 0; i < getAssetTypeList.length; i++) {
                //console.log(getAssetTypeList[i].isActive);
                if (getAssetTypeList[i].isActive == true)
                    for (let j = 0; j < this.allAssetAttrInfo.length; j++) {
                        if (this.allAssetAttrInfo[j].assetTypeId == getAssetTypeList[i].assetTypeId &&
                            this.allAssetAttrInfo[j].isActive == true)
                            assetTypeList.push(getAssetTypeList[i]);
                    }
            }
        }
        //console.log('assetTypeList',assetTypeList);
        this.allAssetTypeInfo = assetTypeList;
        if (this.assetService.isEditMode == true && this.currentAsset.assetTypeId) {
            this.getSelectedAssetType(this.currentAsset.assetTypeId);
        }
    }

    private onAssetLocationLoad(getAssetTypeList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allAssetLocations = [];
        console.log('allAssetLocations', getAssetTypeList);
        //console.log('allAssetLocations', this.allAssetLocations);
        if (getAssetTypeList) {
            for (let i = 0; i < getAssetTypeList.length; i++) {
                //console.log(getAssetTypeList[i].isActive);
                if (getAssetTypeList[i].isActive == true) {
                    this.allAssetLocations.push(getAssetTypeList[i]);
                }
            }
        }
        console.log('getAssetTypeList', getAssetTypeList);
        this.allAssetLocationInfo = getAssetTypeList;
        console.log('this.currentAsset.asset_Location', this.currentAsset.asset_Location);
        this.currentAsset.asset_Location = Number(this.currentAsset.asset_Location);
        //this.currentAsset.asset_Location = getObjectById('assetLocationId', this.currentAsset.asset_Location, this.allAssetLocations);
        //console.log('this.currentAsset.asset_Location', this.currentAsset.asset_Location);
        //this.allIntangibleInfo = getAssetTypeList;
        if (this.assetService.isEditMode == true && this.currentAsset.asset_Location) {
            this.getSelectedLocation(this.currentAsset.asset_Location);
        }
    }

    private onIntangibletypeLoad(getAssetTypeList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        let assetTypeList: any[] = [];
        console.log('getAssetIntanTypeList', getAssetTypeList);
        console.log('allAssetIntanAttrInfo', this.allAssetIntanAttrInfo);
        if (getAssetTypeList) {
            for (let i = 0; i < getAssetTypeList.length; i++) {
                //console.log(getAssetTypeList[i].isActive);
                if (getAssetTypeList[i].isActive == true) {
                    for (let j = 0; j < this.allAssetIntanAttrInfo.length; j++) {
                        if (this.allAssetIntanAttrInfo[j].isActive == true &&
                            this.allAssetIntanAttrInfo[j].assetIntangibleTypeId == getAssetTypeList[i].assetIntangibleTypeId)
                            assetTypeList.push(getAssetTypeList[i]);
                    }
                }
            }
        }
        //console.log('assetTypeList',assetTypeList);
        this.allIntangibleInfo = assetTypeList;
        //this.allIntangibleInfo = getAssetTypeList;
        if (this.assetService.isEditMode == true && this.currentAsset.assetIntangibleTypeId) {
            this.getSelectedIntangible(this.currentAsset.assetIntangibleTypeId);
        }
    }

    private assetTypeData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.assetTypeService.getAllActive().subscribe(
            results => this.onAssetTypeLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
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
                this.route.navigateByUrl(`/assetmodule/assetpages/app-asset-calibration/${assetId}`);
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
        this.GLAccountList = getGlList;
        // console.log(this.allGlInfo);
    }

    private glList() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.glAccountService.getAll().subscribe(
            results => this.onGlAccountLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    getAssetAcquisitionTypeList() {
        this.commonservice.smartDropDownList('AssetAcquisitionType', 'AssetAcquisitionTypeId', 'Name').subscribe(res => {
            this.assetAcquisitionTypeList = res;

        })
    }
    getAmortizationFrequencyList() {
        this.commonservice.smartDropDownList('AssetAmortizationInterval', 'AssetAmortizationIntervalId', 'AssetAmortizationIntervalCode').subscribe(res => {
            this.amortizationFrequencyList = res;

        })
    }
    getDepreciationFrequencyList() {
        this.commonservice.smartDropDownList('AssetDepreciationFrequency', 'AssetDepreciationFrequencyId', 'Name').subscribe(res => {
            this.depreciationFrequencyList = res;

        })
    }

    private intangibleData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.intangibleTypeService.getAll().subscribe(
            results => this.onIntangibletypeLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private assetLocationData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.assetLocationService.getAll().subscribe(
            results => this.onAssetLocationLoad(results[0].columnData),
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
        console.log(this.currentAsset.alternateAssetId, this.currentAsset.assetId);
        if (this.currentAsset.isDepreciable == true) {
            if (!(this.currentAsset.assetId && this.currentAsset.name && this.currentAsset.unitOfMeasureId
                && this.currentAsset.currencyId && this.currentAsset.assetTypeId && this.currentAsset.assetAcquisitionTypeId
                && this.currentAsset.companyId // && this.currentAsset.buisinessUnitId && this.currentAsset.departmentId && this.currentAsset.divisionId
            )) {
                this.display = true;
                this.modelValue = true;
            }
        }
        if (this.currentAsset.assetId && this.currentAsset.name && this.currentAsset.unitOfMeasureId
            && this.currentAsset.currencyId && this.currentAsset.assetTypeId && this.currentAsset.assetAcquisitionTypeId)

            if (this.currentAsset.isIntangible == true) {
                if (!(this.currentAsset.assetId && this.currentAsset.alternateAssetId && this.currentAsset.name && this.currentAsset.assetIntangibleTypeId
                    && this.currentAsset.companyId // && this.currentAsset.buisinessUnitId && this.currentAsset.departmentId && this.currentAsset.divisionId
                )) {
                    this.display = true;
                    this.modelValue = true;
                }
            }
        if (this.currentAsset.assetId != null && this.currentAsset.assetParentId != null) {
            if (this.currentAsset.assetId == this.currentAsset.assetParentId) {
                this.isSaving = false;
                this.alertService.stopLoadingMessage();
                this.alertService.showMessage("", `Asset Parent cannot be equal to Asset ID.`, MessageSeverity.error);
                return;
            }
        }
        if (this.currentAsset.alternateAssetId != null && this.currentAsset.assetParentId != null) {
            if (this.currentAsset.alternateAssetId == this.currentAsset.assetParentId) {
                this.isSaving = false;
                this.alertService.stopLoadingMessage();
                this.alertService.showMessage("", `Asset Parent and Alternate Asset can't be same.`, MessageSeverity.error);
                return;
            }
        }
        if (this.currentAsset.alternateAssetId != null && this.currentAsset.assetId != null) {
            if (this.currentAsset.alternateAssetId == this.currentAsset.assetId) {
                this.isSaving = false;
                this.alertService.stopLoadingMessage();
                this.alertService.showMessage("", `Asset Id and Alternate Asset Id can't be same.`, MessageSeverity.error);
                return;
            }
        }
        if (this.currentAsset.manufacturedDate != null && this.currentAsset.expirationDate != null) {
            if (this.currentAsset.manufacturedDate > this.currentAsset.expirationDate) {
                this.isSaving = false;
                this.alertService.stopLoadingMessage();
                this.alertService.showMessage("", `Expiration date cannot be earlier than Manufacturerd Date.`, MessageSeverity.error);
                return;
            }
        }
        if (this.currentAsset.expirationDate != null && this.currentAsset.entryDate != null) {
            console.log(this.currentAsset.expirationDate, this.currentAsset.entryDate);
            if (this.currentAsset.expirationDate < this.currentAsset.entryDate) {
                this.isSaving = false;
                this.alertService.stopLoadingMessage();
                this.alertService.showMessage("", `Expiration date cannot be later than entry date.`, MessageSeverity.error);
                return;
            }
        }
        if (this.currentAsset.manufacturedDate != null && this.currentAsset.entryDate != null) {
            console.log(this.currentAsset.entryDate, this.currentAsset.manufacturedDate);
            if (this.currentAsset.entryDate < this.currentAsset.manufacturedDate) {
                this.isSaving = false;
                this.alertService.stopLoadingMessage();
                this.alertService.showMessage("", `Entry date cannot be later than Manufatured date.`, MessageSeverity.error);
                return;
            }
        }
        //&& this.currentAsset.buisinessUnitId && this.currentAsset.departmentId && this.currentAsset.divisionId
        if ((this.currentAsset.assetId && this.currentAsset.name && this.currentAsset.assetIntangibleTypeId)
            || (this.currentAsset.assetId && this.currentAsset.name && this.currentAsset.unitOfMeasureId
                && this.currentAsset.currencyId && this.currentAsset.assetTypeId && this.currentAsset.assetAcquisitionTypeId
                && this.currentAsset.companyId)) {
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
                    this.currentAsset.entryDate = "";
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
                    //this.alertService.showMessage('Asset Created successfully.');
                    this.alertService.showMessage("Success", `Asset Created successfully.`, MessageSeverity.success);
                    this.activeIndex = 1;
                    this.currentAsset = this.assetService.listCollection;
                    this.assetService.indexObj.next(this.activeIndex);
                    const { assetId } = data;
                    this.route.navigateByUrl(`/assetmodule/assetpages/app-asset-capes/${data.assetRecordId}`);


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
                    this.currentAsset.entryDate = "";
                    this.currentAsset.asset_Location = "";
                    this.currentAsset.assetTypeId = "";
                    this.currentSelectedAssetType.selectedObj = "";
                    this.currentAsset.assetIsMaintenanceReqd = "";
                    this.currentAsset.isWarrantyRequired = "";
                    delete this.currentAsset.assetType;
                    delete this.currentAsset.currency;
                    delete this.currentAsset.manufacturer;
                    delete this.currentAsset.unitOfMeasure;
                    if (this.currentAsset.assetIsMaintenanceReqd == false || this.currentAsset.isDepreciable == false) {
                        this.currentAsset.assetMaintenanceIsContract = false;
                        this.currentAsset.assetMaintenanceContractFile = "";
                        this.currentAsset.maintenanceFrequencyMonths = "";
                        this.currentAsset.maintenanceFrequencyDays = "";
                        this.currentAsset.maintenanceMemo = "";
                        this.currentAsset.defaultVendorId = "";
                        this.currentAsset.glAccountId = "";
                    }
                    if (this.currentAsset.isWarrantyRequired == false || this.currentAsset.isDepreciable == false) {
                        this.currentAsset.warranty = "";
                        this.currentAsset.warrantyCompany = "";
                        this.currentAsset.warrantyStartDate = "";
                        this.currentAsset.warrantyEndDate = "";
                        this.currentAsset.warrantyStatus = "";
                        this.currentAsset.unexpiredTime = "";
                    }
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
                    //this.alertService.showMessage('Asset Updated successfully.');
                    this.alertService.showMessage("Success", `Asset Updated successfully.`, MessageSeverity.success);
                    this.activeIndex = 1;
                    this.currentAsset = this.assetService.listCollection;
                    this.assetService.indexObj.next(this.activeIndex);
                    const { assetId } = this.listCollection;
                    this.route.navigateByUrl(`/assetmodule/assetpages/app-asset-capes/${this.listCollection.assetRecordId}`);

                })
            }
        }
    }
    getSelectedIntangible(selectedObj) {
        this.currentSelectedIntangibleAssetType = Object.assign({}, this.allIntangibleInfo.filter(function (intangible) {
            return intangible.assetIntangibleTypeId == selectedObj;
        })[0]);;


    }

    getSelectedLocation(selectedObj) {
        this.currentSelectedLocation = Object.assign({}, this.allAssetLocations.filter(function (location) {
            return location.assetLocationId == selectedObj;
        })[0]);;


    }
    getSelectedAssetType(selectedAssetObj) {

        this.currentSelectedAssetType = Object.assign({}, this.allAssetTypeInfo.filter(function (asset) {
            return asset.assetTypeId == selectedAssetObj;
        })[0]);;
    }

    loadDepricationMethod() {
        this.depriciationMethodService.getAll().subscribe(depriciationmethods => {
            this.depriciationMethodList = depriciationmethods[0].columnData;
            console.log(this.depriciationMethodList);
        });
    }

    nextClick() {
        this.currentAsset = this.assetService.listCollection;
        this.activeIndex = 1;
        this.assetService.indexObj.next(this.activeIndex);
        const { assetId } = this.currentAsset;
        this.route.navigateByUrl(`/assetmodule/assetpages/app-asset-capes/${assetId}`);
    }
    checkValidOnChange(condition, value) {
        if (condition != 'null' && value == "companyId") {
            this.managementValidCheck = false;
        }
    }
}
