import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService } from "../../services/alert.service";
import { AssetStatus } from "../../models/asset-status.model";
import { AssetStatusService } from "../../services/asset-status/asset-status.service";

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

    constructor(private alertService: AlertService,private assetStatusService :AssetStatusService) {
    }

    ngOnInit(): void {
        this.assetStatusService.getAll().subscribe(assets => {
            this.assetStatusList = assets[0];
        });
        this.currentAssetStatus = new AssetStatus();
    }

    addAssetStatus(): void{
        this.assetStatusService.add(this.currentAssetStatus).subscribe(asset => {
            this.currentAssetStatus = asset;
            this.alertService.showMessage('Asset Status added successfully.');
            this.assetStatusService.getAll().subscribe(assets => {
                this.assetStatusList = assets[0];
            });
        });
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

    removeAssetStatus(assetStatusId: number): void {
        this.assetStatusService.remove(assetStatusId).subscribe(response => {
            this.alertService.showMessage("Asset Status removed successfully.");
            this.assetStatusService.getAll().subscribe(assets => {
                this.assetStatusList = assets[0];
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

    
}