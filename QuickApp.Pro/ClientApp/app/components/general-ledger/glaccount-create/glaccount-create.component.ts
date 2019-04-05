import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../../services/animations";
import { AlertService } from "../../../services/alert.service";
import { GlAccount } from "../../../models/GlAccount.model";
import { GlAccountService } from "../../../services/glAccount/glAccount.service";
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
@Component({
    selector: 'app-glaccount-create',
    templateUrl: './glaccount-create.component.html',
    styleUrls: ['./glaccount-create.component.scss'],
    animations: [fadeInOut]
})
/** GLAccountCreate component*/
export class GlaccountCreateComponent implements OnInit {
    /** GLAccountCreate ctor */
    currentGLAccount: any = {};
    glAccountList: GlAccount[];
    updateMode: boolean;

    constructor(private alertService: AlertService, private glAccountService: GlAccountService) {
       
    }

    ngOnInit(): void {
        // this.currentGLAccount = new GlAccount();
        this.glAccountService.getAll().subscribe(glAccountData => {
            this.glAccountList = glAccountData[0];
        });
       
    }

    addAssetStatus(): void {
        this.glAccountService.add(this.currentGLAccount).subscribe(glData => {
            this.currentGLAccount = glData;
            this.alertService.showMessage('Asset Status added successfully.');
            this.glAccountService.getAll().subscribe(glAccountData => {
                this.glAccountList = glAccountData[0];
            });
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