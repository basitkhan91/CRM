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
import { FormBuilder, NgForm } from '@angular/forms';
import { LegalEntityService } from '../../../../services/legalentity.service';

@Component({
    selector: 'app-asset-adjustment',
    templateUrl: './asset-adjustment.component.html',
    styleUrls: ['./asset-adjustment.component.scss']
})
/** asset-maintenance-warranty component*/
export class AssetAdjustmentComponent implements OnInit {
   

    currentAsset: any = {};
    localCollection: any[];
    activeIndex: number;
    showLable: boolean;
    local: any;
    loadingIndicator: boolean;
    AssetId: any;
    static assetService;
    cols:any[]=[];
    data:any[]=[];
    maincompanylist: any[] = [];
    bulist: any[];
    allManagemtninfo: any[] = [];
    departmentList: any[] = [];
    divisionlist: any[] = [];
    managementStructureData: any = [];
    updateMode: boolean = false;
    allAssetInfo: any[] = [];
    allAssets: any[] = [];
    disableSave: boolean;
    onSelectedId: any;
    formData = new FormData();

    constructor(private router: ActivatedRoute,private assetService: AssetService, private vendorService: VendorService, private route: Router,
        private authService: AuthService, private alertService: AlertService, private legalEntityServices: LegalEntityService) {
        this.AssetId = this.router.snapshot.params['id'];
        this.activeIndex = 3;
        if (this.assetService.listCollection == undefined) {
            this.GetAssetData(this.AssetId);
        }
        if (this.assetService.listCollection) {
            this.local = this.assetService.listCollection;
            this.currentAsset = this.local;
        }
    }
    ngOnInit(): void {
        this.loadData();
        this.AssetId = this.router.snapshot.params['id'];
        if (this.assetService.listCollection == undefined) {
            this.GetAssetData(this.AssetId);
        }
        this.getAssetsList();
        this.loadManagementdata();

    }
   
    private loadData() {



        this.cols = [
            { field: 'fieldName', header: 'Field Name',width:'100px' },
            { field: 'existingValue', header: 'Existing Value',width:'100px' },
            { field: 'changeValueTo', header: 'Change Value To',width:'100px' },
            { field: 'adjustmentReason', header: 'Adjustment Reason',width:'100px' },
            { field: 'documents', header: 'Documents',width:'100px' },
           
        ];

        this.data = [
            { field: 'company',selected:false, fieldName: 'company',existingValue:'0',changeValueTo:'',adjustmentReason:'',documents:'' },
            { field: 'bu',selected:false, fieldName: 'BU',existingValue:'0',changeValueTo:'',adjustmentReason:'',documents:'' },
            { field: 'dept',selected:false, fieldName: 'Dept',existingValue:'0',changeValueTo:'',adjustmentReason:'',documents:'' },
            { field: 'div',selected:false, fieldName: 'Div',existingValue:'0',changeValueTo:'',adjustmentReason:'',documents:'' },
            { field: 'revaluation',selected:false, fieldName: 'Revaluation',existingValue:'0',changeValueTo:'',adjustmentReason:'',documents:'' },
            { field: 'usefulLife',selected:false, fieldName: 'Useful Life',existingValue:'0',changeValueTo:'',adjustmentReason:'',documents:'' },
            { field: 'assetId',selected:false, fieldName: 'Asset ID',existingValue:'',changeValueTo:'',adjustmentReason:'',documents:'' },
            { field: 'location',selected:false, fieldName: 'Location',existingValue:'',changeValueTo:'',adjustmentReason:'',documents:'' },
            { field: 'depreciationExpense',selected:false, fieldName: 'DepreciationExpense',existingValue:'0',changeValueTo:'',adjustmentReason:'',documents:'' },
            { field: 'accumulatedDepreciation',selected:false, fieldName: 'Accumulated Depreciation',existingValue:'0',changeValueTo:'',adjustmentReason:'',documents:'' },
            
        ];

       
    }
    private getAssetsList() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.assetService.getAssetList().subscribe(
            results => this.onAssetListLoaded(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onAssetListLoaded(assetList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allAssetInfo = assetList;
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
            this.currentAsset = this.assetService.listCollection;
        }
       
        if (this.assetService.listCollection) {
            this.local = this.assetService.listCollection;
            this.currentAsset = this.local;
        }
        

    }
    private loadManagementdata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.legalEntityServices.getManagemententity().subscribe(
            results => this.onManagemtntdataLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
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

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
    }

    fileUpload(event) {
		if (event.files.length === 0)
			return;

		for (let file of event.files)
			this.formData.append(file.name, file);
    }
    removeFile(file: File,uploader) {
        const index = uploader.files.indexOf(file);
        uploader.remove(index);
       console.log(file);
       // this.formData.delete(file.name);
    }
    saveAssetAdjustment() {
      console.log(this.data);
    }
    backClick() {
    
        this.route.navigateByUrl('assetmodule/assetpages/app-asset-listing');
    }


}