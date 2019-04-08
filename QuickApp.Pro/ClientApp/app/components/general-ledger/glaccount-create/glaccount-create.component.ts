import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../../services/animations";
import { AlertService } from "../../../services/alert.service";
import { GlAccount } from "../../../models/GlAccount.model";
import { GlAccountService } from "../../../services/glAccount/glAccount.service";
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
import { CurrencyService } from "../../../services/currency.service";
import { GLAccountClassService } from "../../../services/glaccountclass.service";
import { GlCashFlowClassificationService } from "../../../services/gl-cash-flow-classification.service";
import { LegalEntityService } from "../../../services/legalentity.service";
@Component({
    selector: 'app-glaccount-create',
    templateUrl: './glaccount-create.component.html',
    styleUrls: ['./glaccount-create.component.scss'],
    animations: [fadeInOut]
})
/** GLAccountCreate component*/
export class GlaccountCreateComponent implements OnInit {
    /** GLAccountCreate ctor */
    currentGLAccount: GlAccount;
    glAccountList: GlAccount[];
    updateMode: boolean;
    allCurrencyInfo: any[] = [];
    allGLAccountClassInfo: any[] = [];
    allGLCashFlowClassInfo: any[] = [];
    allManagemtninfo: any[] = [];
    companyList: any[] = [];
    miscData: any[] = [];
    constructor(private legalEntityservice:LegalEntityService,private glcashFlowClassifcationService:GlCashFlowClassificationService,private alertService: AlertService, private glAccountService: GlAccountService, private currencyService: CurrencyService, public glAccountClassService: GLAccountClassService) {
        if (this.glAccountService.glAccountEditCollection) {
            this.currentGLAccount = this.glAccountService.glAccountEditCollection;
        }
    }

    ngOnInit(): void {
        if (this.glAccountService.glAccountEditCollection == null) {
            this.currentGLAccount = new GlAccount();
        }
        this.glAccountService.getAll().subscribe(glAccountData => {
            this.glAccountList = glAccountData[0];
        });
        this.loadcurrencyData();
        this.loadGLAccountTypeData();
        this.loadCompaniesData();
        this.load1099Miscdata();
        this.loadGLCashFlowClassification();
       
    }

    addGLAccount(): void {
        if (!this.currentGLAccount.glAccountId) {
            this.glAccountService.add(this.currentGLAccount).subscribe(glData => {
                this.currentGLAccount = glData;
                this.alertService.showMessage('Asset Status added successfully.');
                this.glAccountService.getAll().subscribe(glAccountData => {
                    this.glAccountList = glAccountData[0];
                });
            });
        }
        else {
            this.glAccountService.update(this.currentGLAccount).subscribe(asset => {
                this.alertService.showMessage('Asset Status updated successfully.');
                this.glAccountService.getAll().subscribe(assets => {
                    this.glAccountList = assets[0];
                });
                this.updateMode = false;
                this.resetAssetStatus();
            });
        }
       
    }

    private loadcurrencyData() {
        this.currencyService.getCurrencyList().subscribe(data => {
            this.allCurrencyInfo = data[0];
        });
    }

    private loadGLAccountTypeData() {
        this.glAccountClassService.getWorkFlows().subscribe(data => {
            this.allGLAccountClassInfo = data[0];
        })
    }

    private loadGLCashFlowClassification() {
        this.glcashFlowClassifcationService.getWorkFlows().subscribe(data => {
            this.allGLCashFlowClassInfo = data[0];
        })
    }

    private loadCompaniesData() {
        this.legalEntityservice.getManagemententity().subscribe(data => {
            this.allManagemtninfo = data[0];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {

                if (this.allManagemtninfo[i].parentId == null) {                   
                    this.companyList.push(this.allManagemtninfo[i]);
                }
            }
        });
    }

    private load1099Miscdata() {
        this.glAccountService.getMiscdata().subscribe(miscData => {
            this.miscData = miscData[0];
        });
    } 

    setAssetStatusToUpdate(id: number): void {
        this.currentGLAccount = Object.assign({}, this.glAccountList.filter(function (asset) {
            return asset.glAccountId == id;
        })[0]);
        this.updateMode = true;
    }

    updateAssetStatus(): void {
        this.glAccountService.update(this.currentGLAccount).subscribe(asset => {
            this.alertService.showMessage('Asset Status updated successfully.');
            this.glAccountService.getAll().subscribe(assets => {
                this.glAccountList = assets[0];
            });
            this.updateMode = false;
            this.resetAssetStatus();
        });
    }

    removeAssetStatus(assetStatusId: number): void {
        this.glAccountService.remove(assetStatusId).subscribe(response => {
            this.alertService.showMessage("Asset Status removed successfully.");
            this.glAccountService.getAll().subscribe(assets => {
                this.glAccountList = assets[0];
            });
        });

    }

    toggleIsDeleted(assetStatusId: number): void {
        this.setAssetStatusToUpdate(assetStatusId);
        this.currentGLAccount.isDeleted = !this.currentGLAccount.isDeleted;
    }

    resetAssetStatus(): void {
        this.updateMode = false;
        this.currentGLAccount = new GlAccount();
    }
}