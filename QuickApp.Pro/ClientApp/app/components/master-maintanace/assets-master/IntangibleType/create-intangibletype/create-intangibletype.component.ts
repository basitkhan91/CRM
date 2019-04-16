import { Component, OnInit } from '@angular/core';
import { GlAccountService } from '../../../../../services/glAccount/glAccount.service';
import { GlAccount } from '../../../../../models/GlAccount.model';
import { LegalEntityService } from '../../../../../services/legalentity.service';
import { AlertService } from '../../../../../services/alert.service';
import { AssetIntangibleTypeService } from '../../../../../services/AssetIntangibleType/AssetIntangibleType.service';
import { Router } from '@angular/router';
import { fadeInOut } from '../../../../../services/animations';

@Component({
    selector: 'app-create-intangibletype',
    templateUrl: './create-intangibletype.component.html',
    styleUrls: ['./create-intangibletype.component.scss'],
    animations: [fadeInOut]
})
/** create-intangibletype component*/
export class CreateIntangibletypeComponent implements OnInit {
    /** create-intangibletype ctor */
    currentIntangibleType: any = {};
    intangibleTypeList: any[];
    glAccountList: GlAccount[];
    allManagemtninfo: any[] = [];
    companyList: any[] = [];
    buList: any[];
    divisionlist: any[];
    departmentList: any[];
    managementStructureData: any = [];
    updateMode: boolean = false;
    constructor(private alertService: AlertService, private router:Router, private legalEntityservice: LegalEntityService, private glAccountService: GlAccountService,private intangibleService:AssetIntangibleTypeService) {
        if (this.intangibleService.intangibleTypeEditCollection) {
            this.updateMode = true;
            this.currentIntangibleType = this.intangibleService.intangibleTypeEditCollection;
        }
    }
    ngOnInit() {
        this.loadCompaniesData();
        this.loadGLAccountData();
    }
    loadCompaniesData() {
        this.legalEntityservice.getManagemententity().subscribe(data => {
            this.allManagemtninfo = data[0];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == null) {
                    this.companyList.push(this.allManagemtninfo[i]);
                }
            }
            this.setManagementStrucureData(this.currentIntangibleType);
        });
    }
    loadGLAccountData() {
        this.glAccountService.getAll().subscribe(glAccountData => {
            this.glAccountList = glAccountData[0];
        });
    }
    addIntangibileType(): void {
        if (!this.currentIntangibleType.assetIntangibleTypeId) {
            this.intangibleService.add(this.currentIntangibleType).subscribe(intangibleData => {
                this.currentIntangibleType = intangibleData;
                this.alertService.showMessage('Intangible Type added successfully.');
                this.intangibleService.getAll().subscribe(intangibleTypeData => {
                    this.intangibleTypeList = intangibleTypeData[0];
                    this.router.navigateByUrl('/generalledgermodule/generalledgerpage/app-intangibletype-listing');
                });
            });
        }
        else {
            this.intangibleService.update(this.currentIntangibleType).subscribe(intangible => {
                this.alertService.showMessage('Intangible Type updated successfully.');
                this.intangibleService.getAll().subscribe(intangibleTypeData => {
                    this.intangibleTypeList = intangibleTypeData[0];
                });

                
            });
        }

    }
    setManagementStrucureData(obj) {
        this.managementStructureData = [];
        this.checkMSParents(obj.managementStructureId);
        if (this.managementStructureData.length == 4) {
            this.currentIntangibleType.companyId = this.managementStructureData[3];
            this.currentIntangibleType.buisinessUnitId = this.managementStructureData[2];
            this.currentIntangibleType.departmentId = this.managementStructureData[1];
            this.currentIntangibleType.divisionId = this.managementStructureData[0];
            this.getBUList(this.currentIntangibleType.companyId);
            this.getDepartmentlist(this.currentIntangibleType.buisinessUnitId);
            this.getDivisionlist(this.currentIntangibleType.departmentId);
        }
        if (this.managementStructureData.length == 3) {
            this.currentIntangibleType.companyId = this.managementStructureData[2];
            this.currentIntangibleType.buisinessUnitId = this.managementStructureData[1];
            this.currentIntangibleType.departmentId = this.managementStructureData[0];
            this.getBUList(this.currentIntangibleType.companyId);
            this.getDepartmentlist(this.currentIntangibleType.buisinessUnitId);
        }
        if (this.managementStructureData.length == 2) {
            this.currentIntangibleType.companyId = this.managementStructureData[1];
            this.currentIntangibleType.buisinessUnitId = this.managementStructureData[0];
            this.getBUList(this.currentIntangibleType.companyId);
        }
        if (this.managementStructureData.length == 1) {
            this.currentIntangibleType.companyId = this.managementStructureData[0];
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
    getBUList(companyId) {
        if (this.updateMode == false) {
            this.currentIntangibleType.buisinessUnitId = "";
            this.currentIntangibleType.departmentId = "";
            this.currentIntangibleType.divisionId = "";
            this.currentIntangibleType.managementStructureId = companyId;
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
            this.currentIntangibleType.departmentId = "";
            this.currentIntangibleType.divisionId = "";
            this.currentIntangibleType.managementStructureId = businessUnitId;
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
            this.currentIntangibleType.divisionId = "";
            this.currentIntangibleType.managementStructureId = departmentId;
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
        this.currentIntangibleType.managementStructureId = divisionId;
    }
}