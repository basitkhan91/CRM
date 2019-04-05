import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService } from "../../services/alert.service";
import { AssetTypeSingleScreenService } from "../../services/AssetTypeSingleScreen/assettypesinglescreen.service";
import { AssetTypeSingleScreen } from "../../models/assettypesinglescreen.model";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-asset-type-single-screen',
    templateUrl: './asset-type-single-screen.component.html',
    styleUrls: ['./asset-type-single-screen.component.scss'],
    animations: [fadeInOut]
})
export class AssetTypeSingleScreenComponent implements OnInit {

    currentAssetTypeetStatus: AssetTypeSingleScreen;
    AssetTypeList: AssetTypeSingleScreen[];
    updateMode: boolean;
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;

    constructor(private alertService: AlertService, private AssetTypeService: AssetTypeSingleScreenService, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.AssetTypeService.getAll().subscribe(AssetTypes => {
            this.AssetTypeList = AssetTypes[0];
        });
        this.currentAssetTypeetStatus = new AssetTypeSingleScreen();
    }

    addAssetType(): void {
        if (!(this.currentAssetTypeetStatus.assetTypeSingleId && this.currentAssetTypeetStatus.assetTypeName && this.currentAssetTypeetStatus.assetTypeMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.currentAssetTypeetStatus.assetTypeSingleId && this.currentAssetTypeetStatus.assetTypeName && this.currentAssetTypeetStatus.assetTypeMemo)) {
            this.AssetTypeService.add(this.currentAssetTypeetStatus).subscribe(asset => {
                this.currentAssetTypeetStatus = asset;
                this.alertService.showMessage('Asset Type added successfully.');
                this.AssetTypeService.getAll().subscribe(AssetTypes => {
                    this.AssetTypeList = AssetTypes[0];
                });
            });
        }
    }

    setAssetTypeToUpdate(id: number): void {
        this.currentAssetTypeetStatus = Object.assign({}, this.AssetTypeList.filter(function (asset) {
            return asset.assetTypeSingleScreenId == id;
        })[0]);
        this.updateMode = true;
    }

    updateAssetType(): void {
        this.AssetTypeService.update(this.currentAssetTypeetStatus).subscribe(asset => {
            this.alertService.showMessage('Asset Type updated successfully.');
            this.AssetTypeService.getAll().subscribe(AssetTypes => {
                this.AssetTypeList = AssetTypes[0];
            });
            this.updateMode = false;
            this.resetAssetType();
        });
    }

    removeAssetType(): void {
        this.AssetTypeService.remove(this.currentAssetTypeetStatus.assetTypeSingleScreenId).subscribe(response => {
            this.alertService.showMessage("Asset Type removed successfully.");
            this.AssetTypeService.getAll().subscribe(AssetTypes => {
                this.AssetTypeList = AssetTypes[0];
                this.modal.close();
            });
        });

    }

    toggleIsDeleted(assetTypeSingleScreenId: number): void {
        this.setAssetTypeToUpdate(assetTypeSingleScreenId);
        this.currentAssetTypeetStatus.isDelete = !this.currentAssetTypeetStatus.isDelete;
    }

    resetAssetType(): void {
        this.updateMode = false;
        this.currentAssetTypeetStatus = new AssetTypeSingleScreen();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.currentAssetTypeetStatus = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
}