import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService } from "../../services/alert.service";
import { AssetIntangibleTypeSingleScreen } from "../../models/assetIntangibleTypeSingleScreen.model";
import { AssetIntangibleTypeSingleScreenService } from "../../services/AssetIntangibleTypeSingleScreen/assetIntangibleTypeSingleScreen.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
     selector: 'app-asset-intangible-type-single-screen',
     templateUrl: './asset-intangible-type-single-screen.component.html',
     styleUrls: [],
     animations: [fadeInOut]
})
export class AssetIntangibleTypeSingleScreenComponent implements OnInit {

    currentAssetIntangible: AssetIntangibleTypeSingleScreen;
    assetIntangibleList: AssetIntangibleTypeSingleScreen[];
    updateMode: boolean;
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;

    constructor(private alertService: AlertService, private assetStatusService: AssetIntangibleTypeSingleScreenService, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.assetStatusService.getAll().subscribe(assetIntangible => {
            this.assetIntangibleList = assetIntangible[0];
        });
        this.currentAssetIntangible = new AssetIntangibleTypeSingleScreen();
    }

    addAssetIntangible(): void {
        if (!(this.currentAssetIntangible.assetIntangibleSingleId && this.currentAssetIntangible.assetIntangibleName && this.currentAssetIntangible.assetIntangibleMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.currentAssetIntangible.assetIntangibleSingleId && this.currentAssetIntangible.assetIntangibleName && this.currentAssetIntangible.assetIntangibleMemo)) {
            this.assetStatusService.add(this.currentAssetIntangible).subscribe(assetIntangible => {
                this.currentAssetIntangible = assetIntangible;
                this.alertService.showMessage('Asset Intangible added successfully.');
                this.assetStatusService.getAll().subscribe(assetIntangible => {
                    this.assetIntangibleList = assetIntangible[0];
                });
            });
        }
    }

    setAssetIntangibleToUpdate(id: number): void {
        this.currentAssetIntangible = Object.assign({}, this.assetIntangibleList.filter(function (assetIntangible) {
            return assetIntangible.assetIntangibleTypeSingleId == id;
        })[0]);
        this.updateMode = true;
    }

    updateAssetIntangible(): void {
        this.assetStatusService.update(this.currentAssetIntangible).subscribe(assetIntangible => {
            this.alertService.showMessage('Asset Intangible updated successfully.');
            this.assetStatusService.getAll().subscribe(assetIntangible => {
                this.assetIntangibleList = assetIntangible[0];
            });
            this.updateMode = false;
            this.resetAssetIntangible();
        });
    }

    removeAssetIntangible(): void {
        this.assetStatusService.remove(this.currentAssetIntangible.assetIntangibleTypeSingleId).subscribe(response => {
            this.alertService.showMessage("Asset Intangible removed successfully.");
            this.assetStatusService.getAll().subscribe(assets => {
                this.assetIntangibleList = assets[0];
                this.modal.close();
            });
        });
   }

    toggleIsDeleted(assetIntangibleTypeSingleId: number): void {
        this.setAssetIntangibleToUpdate(assetIntangibleTypeSingleId);
        this.currentAssetIntangible.isDelete = !this.currentAssetIntangible.isDelete;
    }

    resetAssetIntangible(): void {
        this.updateMode = false;
        this.currentAssetIntangible = new AssetIntangibleTypeSingleScreen();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.currentAssetIntangible = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
}