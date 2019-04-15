import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService } from "../../services/alert.service";
import { AssetDepConventionType } from "../../models/assetDepConventionType.model";
import { AssetDepConventionTypeService } from "../../services/assetDepConventionType/assetDepConventionType.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-asset-dep-convention-type',
    templateUrl: './asset-dep-convention-type.component.html',
        styleUrls: ['./asset-dep-convention-type.component.scss'],
        animations: [fadeInOut]
})

export class AssetDepConventionTypeComponent implements OnInit {

    currentAssetDep: AssetDepConventionType;
    assetDepList: AssetDepConventionType[];
    assetDepConventionToUpdate: AssetDepConventionType;
    updateMode: boolean;
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;

    constructor(private alertService: AlertService, private assetDepConventionTypeService: AssetDepConventionTypeService, private modalService: NgbModal, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.assetDepConventionTypeService.getAll().subscribe(assetDeps => {
            this.assetDepList = assetDeps[0];
        });
        this.currentAssetDep = new AssetDepConventionType();
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    addAssetDepConventionType(): void {
        if (!(this.currentAssetDep.assetDepConventionId && this.currentAssetDep.assetDepConventionName && this.currentAssetDep.assetDepConventionMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.currentAssetDep.assetDepConventionId && this.currentAssetDep.assetDepConventionName && this.currentAssetDep.assetDepConventionMemo)) {
            this.currentAssetDep.updatedBy = this.userName;
            this.currentAssetDep.createdBy = this.userName;
            this.assetDepConventionTypeService.add(this.currentAssetDep).subscribe(assetDep => {
                this.currentAssetDep = assetDep;
                this.alertService.showMessage('Asset Dep Convention added successfully.');
                this.assetDepConventionTypeService.getAll().subscribe(assetDeps => {
                    this.assetDepList = assetDeps[0];
                });
                this.resetAssetDepConventionType();
            });
        }
    }
    
    setAssetDepConventionTypeToUpdate(editassetConvention: any, id: number): void {
        this.assetDepConventionToUpdate = Object.assign({}, this.assetDepList.filter(function (assetConvention) {
            return assetConvention.assetDepConventionTypeId == id;
        })[0]);
        this.modal = this.modalService.open(editassetConvention, { size: 'sm' });
    }

    updateAssetDepConventionType(): void {
        if (!(this.assetDepConventionToUpdate.assetDepConventionId && this.assetDepConventionToUpdate.assetDepConventionName && this.assetDepConventionToUpdate.assetDepConventionMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        else {
            this.currentAssetDep.updatedBy = this.userName;
            this.assetDepConventionTypeService.update(this.assetDepConventionToUpdate).subscribe(assetDep => {
                this.alertService.showMessage('Asset Dep Convention updated successfully.');
                this.assetDepConventionTypeService.getAll().subscribe(assetDep => {
                    this.assetDepList = assetDep[0];
                });
                this.updateMode = false;
                this.resetAssetDepConventionType();
                this.dismissModel();
            });
        }
    }

    removeAssetDepConventionType(): void {
        this.assetDepConventionTypeService.remove(this.currentAssetDep.assetDepConventionTypeId).subscribe(response => {
            this.alertService.showMessage("Asset Dep Convention removed successfully.");
            this.assetDepConventionTypeService.getAll().subscribe(assetDeps => {
                this.assetDepList = assetDeps[0];
                this.modal.close();
            });
        });

    }
   
    resetAssetDepConventionType(): void {
        this.updateMode = false;
        this.currentAssetDep = new AssetDepConventionType();
    }
    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.currentAssetDep = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    toggleIsActive(assetDepConventions: any, e) {
        if (e.checked == false) {
            this.assetDepConventionToUpdate = assetDepConventions;
            this.Active = "In Active";
            this.assetDepConventionToUpdate.isActive == false;
            this.assetDepConventionTypeService.update(this.assetDepConventionToUpdate).subscribe(asset => {
                this.alertService.showMessage('Asset Dep Convention updated successfully.');
                this.assetDepConventionTypeService.getAll().subscribe(assets => {
                    this.assetDepList = assets[0];
                });

            })
        }
        else {
            this.assetDepConventionToUpdate = assetDepConventions;
            this.Active = "Active";
            this.assetDepConventionToUpdate.isActive == true;
            this.assetDepConventionTypeService.update(this.assetDepConventionToUpdate).subscribe(asset => {
                this.alertService.showMessage('Asset Dep Convention updated successfully.');
                this.assetDepConventionTypeService.getAll().subscribe(assets => {
                    this.assetDepList = assets[0];
                });
            })
        }
    }
}