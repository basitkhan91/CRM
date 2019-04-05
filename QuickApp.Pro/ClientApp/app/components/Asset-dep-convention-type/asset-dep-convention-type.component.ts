import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService } from "../../services/alert.service";
import { AssetDepConventionType } from "../../models/assetDepConventionType.model";
import { AssetDepConventionTypeService } from "../../services/assetDepConventionType/assetDepConventionType.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-asset-dep-convention-type',
    templateUrl: './asset-dep-convention-type.component.html',
        styleUrls: ['./asset-dep-convention-type.component.scss'],
        animations: [fadeInOut]
})

export class AssetDepConventionTypeComponent implements OnInit {

    currentAssetDep: AssetDepConventionType;
    assetDepList: AssetDepConventionType[];
    updateMode: boolean;
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;

    constructor(private alertService: AlertService, private assetDepConventionTypeService: AssetDepConventionTypeService, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.assetDepConventionTypeService.getAll().subscribe(assetDeps => {
            this.assetDepList = assetDeps[0];
        });
        this.currentAssetDep = new AssetDepConventionType();
    }

    addAssetDepConventionType(): void {
        if (!(this.currentAssetDep.assetDepConventionId && this.currentAssetDep.assetDepConventionName && this.currentAssetDep.assetDepConventionMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.currentAssetDep.assetDepConventionId && this.currentAssetDep.assetDepConventionName && this.currentAssetDep.assetDepConventionMemo)) {
            this.assetDepConventionTypeService.add(this.currentAssetDep).subscribe(assetDep => {
                this.currentAssetDep = assetDep;
                this.alertService.showMessage('Asset Dep Convention added successfully.');
                this.assetDepConventionTypeService.getAll().subscribe(assetDeps => {
                    this.assetDepList = assetDeps[0];
                });
            });
        }
    }

    setAssetDepConventionTypeToUpdate(id: number): void {
        this.currentAssetDep = Object.assign({}, this.assetDepList.filter(function (assetDep) {
            return assetDep.assetDepConventionTypeId == id;
        })[0]);
        this.updateMode = true;
    }

    updateAssetDepConventionType(): void {
        this.assetDepConventionTypeService.update(this.currentAssetDep).subscribe(assetDep => {
            this.alertService.showMessage('Asset Dep Convention updated successfully.');
            this.assetDepConventionTypeService.getAll().subscribe(assetDep => {
                this.assetDepList = assetDep[0];
            });
            this.updateMode = false;
            this.resetAssetDepConventionType();
        });
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

    toggleIsDeleted(assetDepConventionTypeId: number): void {
        this.setAssetDepConventionTypeToUpdate(assetDepConventionTypeId);
       // this.currentAssetDep.isDelete = !this.currentAssetDep.isDelete;
        this.currentAssetDep.isActive = !this.currentAssetDep.isActive;
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

}