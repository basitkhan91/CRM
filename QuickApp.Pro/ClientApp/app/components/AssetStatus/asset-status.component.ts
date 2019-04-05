import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService } from "../../services/alert.service";
import { AssetStatus } from "../../models/asset-status.model";
import { AssetStatusService } from "../../services/asset-status/asset-status.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'asset-status',
    templateUrl: './asset-status.component.html',
    styleUrls: [],
    animations: [fadeInOut]
})
export class AssetStatusComponent implements OnInit {

    currentAssetStatus: AssetStatus;
    assetStatusList: AssetStatus[];
    updateMode: boolean;
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;

    constructor(private alertService: AlertService, private assetStatusService: AssetStatusService, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.assetStatusService.getAll().subscribe(assets => {
            this.assetStatusList = assets[0];
        });
        this.currentAssetStatus = new AssetStatus();
    }

    addAssetStatus(): void{
        if (!(this.currentAssetStatus.identification && this.currentAssetStatus.name && this.currentAssetStatus.memo)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.currentAssetStatus.identification && this.currentAssetStatus.name && this.currentAssetStatus.memo)) {
            this.assetStatusService.add(this.currentAssetStatus).subscribe(asset => {
                this.currentAssetStatus = asset;
                this.alertService.showMessage('Asset Status added successfully.');
                this.assetStatusService.getAll().subscribe(assets => {
                    this.assetStatusList = assets[0];
                });
            });
        }
    }

    setAssetStatusToUpdate(id: number): void {
        this.currentAssetStatus = Object.assign({}, this.assetStatusList.filter(function (asset) {
            return asset.id == id;
        })[0]);
        this.updateMode = true;
    }

    updateAssetStatus(): void {
        this.assetStatusService.update(this.currentAssetStatus).subscribe(asset => {
            this.alertService.showMessage('Asset Status updated successfully.');
            this.assetStatusService.getAll().subscribe(assets => {
                this.assetStatusList = assets[0];
            });
            this.updateMode = false;
            this.resetAssetStatus();
        });
    }

    removeAssetStatus(): void {
        this.assetStatusService.remove(this.currentAssetStatus.id).subscribe(response => {
            this.alertService.showMessage("Asset Status removed successfully.");
            this.assetStatusService.getAll().subscribe(assets => {
                this.assetStatusList = assets[0];
                this.modal.close();
            });
        });

    }

    toggleIsDeleted(assetStatusId: number): void {
        this.setAssetStatusToUpdate(assetStatusId);
        this.currentAssetStatus.isDeleted = !this.currentAssetStatus.isDeleted;
    }

    resetAssetStatus(): void {
        this.updateMode = false;
        this.currentAssetStatus = new AssetStatus();
    }
    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.currentAssetStatus = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
}