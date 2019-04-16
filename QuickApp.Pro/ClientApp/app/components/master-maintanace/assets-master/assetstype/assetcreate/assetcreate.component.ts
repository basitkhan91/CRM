import { Component, OnInit } from '@angular/core';
import { AssetTypeSingleScreenService } from '../../../../../services/AssetTypeSingleScreen/assettypesinglescreen.service';
import { AssetTypeSingleScreen } from '../../../../../models/assettypesinglescreen.model';
import { AssetDepConventionTypeService } from '../../../../../services/assetDepConventionType/assetDepConventionType.service';
import { AssetDepConventionType } from '../../../../../models/assetDepConventionType.model';
import { DepriciationMethodService } from '../../../../../services/depriciation-method/depriciation.service';
import { DepriciationMethod } from '../../../../../models/depriciation-method.model';
import { GlAccountService } from '../../../../../services/glAccount/glAccount.service';
import { GlAccount } from '../../../../../models/GlAccount.model';
import { LegalEntityService } from '../../../../../services/legalentity.service';
import { AlertService } from '../../../../../services/alert.service';
import { AssetTypeService } from '../../../../../services/AssetType/assettype.service';
import { Router } from '@angular/router';
import { fadeInOut } from '../../../../../services/animations';
import { AuthService } from '../../../../../services/auth.service';

@Component({
    selector: 'app-assetcreate',
    templateUrl: './assetcreate.component.html',
    styleUrls: ['./assetcreate.component.scss'],
    animations: [fadeInOut]
})
/** assetcreate component*/
export class AssetcreateComponent implements OnInit {
    /** assetcreate ctor */
    AssetTypeList: AssetTypeSingleScreen[];
    assetDepList: AssetDepConventionType[];
    depriciationMethodList: DepriciationMethod[];
    glAccountList: GlAccount[];
    allManagemtninfo: any[]=[];
    companyList: any[] = [];
    currentAssetObj: any = {};
    assetTypeList: any[]=[];
    buList: any[];
    divisionlist: any[];
    departmentList: any[];
    assetTypeSingleScreenList: AssetTypeSingleScreen[] = [];
    managementStructureData: any = [];
    updateMode: boolean=false;
    constructor(private assetTypeService: AssetTypeService, private assetTypeSingleScreenService: AssetTypeSingleScreenService, private authService:AuthService,private router:Router,private AssetTypeService: AssetTypeSingleScreenService, private alertService:AlertService, private legalEntityservice:LegalEntityService, private glAccountService: GlAccountService, private assetDepConventionTypeService: AssetDepConventionTypeService, private depriciationMethodService: DepriciationMethodService,) {
        if (this.assetTypeService.assetrowSelection) {
            this.updateMode = true;
            this.currentAssetObj = this.assetTypeService.assetrowSelection;
                       
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
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    loadAssetTypes() {
        this.assetTypeSingleScreenService.getAll().subscribe(AssetTypes => {
            this.assetTypeSingleScreenList = AssetTypes[0];
        });
    }
    setManagementStrucureData(obj) {
        this.managementStructureData = [];
        this.checkMSParents(obj.managementStructureId);
        if (this.managementStructureData.length == 4) {
            this.currentAssetObj.companyId = this.managementStructureData[3];
            this.currentAssetObj.buisinessUnitId = this.managementStructureData[2];
            this.currentAssetObj.departmentId = this.managementStructureData[1];
            this.currentAssetObj.divisionId = this.managementStructureData[0];
            this.getBUList(this.currentAssetObj.companyId);
            this.getDepartmentlist(this.currentAssetObj.buisinessUnitId);
            this.getDivisionlist(this.currentAssetObj.departmentId);
        }
        if (this.managementStructureData.length == 3) {
            this.currentAssetObj.companyId = this.managementStructureData[2];
            this.currentAssetObj.buisinessUnitId = this.managementStructureData[1];
            this.currentAssetObj.departmentId = this.managementStructureData[0];
            this.getBUList(this.currentAssetObj.companyId);
            this.getDepartmentlist(this.currentAssetObj.buisinessUnitId);
        }
        if (this.managementStructureData.length == 2) {
            this.currentAssetObj.companyId = this.managementStructureData[1];
            this.currentAssetObj.buisinessUnitId = this.managementStructureData[0];
            this.getBUList(this.currentAssetObj.companyId);
        }
        if (this.managementStructureData.length == 1) {
            this.currentAssetObj.companyId = this.managementStructureData[0];
        }

    }
    ngOnInit() {
        this.loadAssetTypedata();
        this.loadCoventionType();
        this.loadDepricationMethod();
        this.loadGLAccountData();
        this.loadCompaniesData();
        this.loadAssetTypes();

    }
    loadAssetTypedata() {
        this.AssetTypeService.getAll().subscribe(AssetTypes => {
            this.AssetTypeList = AssetTypes[0];
        });
    }
    loadCoventionType() {
         this.assetDepConventionTypeService.getAll().subscribe(assetDeps => {
            this.assetDepList = assetDeps[0];
        });
    }
    loadDepricationMethod() {
        this.depriciationMethodService.getAll().subscribe(depriciationmethods => {
            this.depriciationMethodList = depriciationmethods[0];
        });
    }
    loadGLAccountData() {
        this.glAccountService.getAll().subscribe(glAccountData => {
            this.glAccountList = glAccountData[0];
        });
    }
    loadCompaniesData() {
        this.legalEntityservice.getManagemententity().subscribe(data => {
            this.allManagemtninfo = data[0];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == null) {
                    this.companyList.push(this.allManagemtninfo[i]);
                }
            }
            this.setManagementStrucureData(this.currentAssetObj);
        });
    }

    addAsset(): void {
        if (!this.currentAssetObj.assetTypeId) {
            if (this.currentAssetObj.residualPercentage == null || this.currentAssetObj.residualPercentage == undefined) {
                this.currentAssetObj.residualValue = 0;
            }
            else {
                this.currentAssetObj.residualValue = null;
            }
            this.currentAssetObj.createdBy = this.userName;
            this.currentAssetObj.updatedBy = this.userName;
            this.assetTypeService.addAssetType(this.currentAssetObj).subscribe(assetData => {
                this.currentAssetObj = assetData;
                this.alertService.showMessage('Asset Type added successfully.');
                this.assetTypeService.getAll().subscribe(assetTypeData => {
                    this.assetTypeList = assetTypeData[0];
                    this.router.navigateByUrl('/mastermodule/masterpages/app-assettypelisting');
                });
            });
        }
        else {
            this.currentAssetObj.updatedBy = this.userName;
            this.assetTypeService.updateAssetType(this.currentAssetObj).subscribe(asset => {
                this.alertService.showMessage('Asset Type updated successfully.');
                this.assetTypeService.getAll().subscribe(assetTypeData => {
                    this.assetTypeList = assetTypeData[0];
                });
                
                //this.resetAsset();
            });
        }

    }
    resetAsset(): void {
        this.currentAssetObj = {};
    }
    getBUList(companyId) {
        if (this.updateMode == false) {
            this.currentAssetObj.buisinessUnitId = "";
            this.currentAssetObj.departmentId = "";
            this.currentAssetObj.divisionId = "";
            this.currentAssetObj.managementStructureId = companyId;
            this.departmentList = [];
            this.divisionlist = [];
            this.buList = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == companyId) {
                    this.buList.push(this.allManagemtninfo[i])
                }
            }

        }
        else {
            this.departmentList = [];
            this.divisionlist = [];
            this.buList = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == companyId) {
                    this.buList.push(this.allManagemtninfo[i])
                }
            }
        }
    }

    getDepartmentlist(businessUnitId) {
        if (this.updateMode == false) {
            this.currentAssetObj.departmentId = "";
            this.currentAssetObj.divisionId = "";
            this.currentAssetObj.managementStructureId = businessUnitId;
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
            this.currentAssetObj.divisionId = "";
            this.currentAssetObj.managementStructureId = departmentId;
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
        this.currentAssetObj.managementStructureId=divisionId;
    }

}