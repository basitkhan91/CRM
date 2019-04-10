import { Component, OnInit } from '@angular/core';
import { GlAccountService } from '../../../../../services/glAccount/glAccount.service';
import { GlAccount } from '../../../../../models/GlAccount.model';
import { LegalEntityService } from '../../../../../services/legalentity.service';
import { AlertService } from '../../../../../services/alert.service';
import { AssetIntangibleTypeService } from '../../../../../services/AssetIntangibleType/AssetIntangibleType.service';

@Component({
    selector: 'app-create-intangibletype',
    templateUrl: './create-intangibletype.component.html',
    styleUrls: ['./create-intangibletype.component.scss']
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
    constructor(private alertService: AlertService, private legalEntityservice: LegalEntityService, private glAccountService: GlAccountService,private intangibleService:AssetIntangibleTypeService) {
        if (this.intangibleService.intangibleTypeEditCollection) {
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
    getBUList(companyId) {
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

    getDepartmentlist(businessUnitId) {

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

    getDivisionlist(departmentId) {
        this.currentIntangibleType.divisionId = "";
        this.currentIntangibleType.managementStructureId = departmentId;
        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == departmentId) {
                this.divisionlist.push(this.allManagemtninfo[i]);
            }
        }


    }
    divisionChange(divisionId) {
        this.currentIntangibleType.managementStructureId = divisionId;
    }
}