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
import { AuthService } from "../../../services/auth.service";
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
    constructor(private legalEntityservice: LegalEntityService, private authService: AuthService,private glcashFlowClassifcationService:GlCashFlowClassificationService,private alertService: AlertService, private glAccountService: GlAccountService, private currencyService: CurrencyService, public glAccountClassService: GLAccountClassService) {
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
        this.currentGLAccount.createdBy = this.userName;
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
        this.currencyService.getCurrencyList().subscribe(currencydata => {
            this.allCurrencyInfo = currencydata[0];
        });
    }

    private loadGLAccountTypeData() {
        this.glAccountClassService.getWorkFlows().subscribe(Glaccountdata => {
            this.allGLAccountClassInfo = Glaccountdata[0];
        })
    }

    private loadGLCashFlowClassification() {
        this.glcashFlowClassifcationService.getWorkFlows().subscribe(cahsFlowClassdata => {
            this.allGLCashFlowClassInfo = cahsFlowClassdata[0];
        })
    }

    private loadCompaniesData() {
        this.legalEntityservice.getEntityList().subscribe(entitydata => {
            this.companyList = entitydata[0];
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

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
}