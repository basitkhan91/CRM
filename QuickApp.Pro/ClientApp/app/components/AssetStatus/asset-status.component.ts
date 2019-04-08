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
    assetStatusToUpdate: AssetStatus;
    assetStatusToRemove: AssetStatus;
    assetStatusList: AssetStatus[];
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;

    constructor(private alertService: AlertService, private assetStatusService: AssetStatusService, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.assetStatusService.getAll().subscribe(assets => {
            this.assetStatusList = assets[0];
        });
        this.currentAssetStatus = new AssetStatus();
    }

    addAssetStatus(): void {
        if (!(this.currentAssetStatus.identification && this.currentAssetStatus.name && this.currentAssetStatus.memo)) {
            this.display = true;
            return;
        }

        this.assetStatusService.add(this.currentAssetStatus).subscribe(asset => {
            this.alertService.showMessage('Asset Status added successfully.');
            this.assetStatusService.getAll().subscribe(assets => {
                this.assetStatusList = assets[0];
            });
            this.resetAddAssetStatus();
        });

    }

    setAssetStatusToUpdate(editAssetStatusPopup: any, id: number): void {
        this.assetStatusToUpdate = Object.assign({}, this.assetStatusList.filter(function (asset) {
            return asset.id == id;
        })[0]);
        this.modal = this.modalService.open(editAssetStatusPopup, { size: 'sm' });
    }

    updateAssetStatus(): void {
        this.assetStatusService.update(this.assetStatusToUpdate).subscribe(asset => {
            this.alertService.showMessage('Asset Status updated successfully.');
            this.assetStatusService.getAll().subscribe(assets => {
                this.assetStatusList = assets[0];
            });
            this.resetUpdateAssetStatus();
            this.dismissModel();
        });
    }

    removeAssetStatus(): void {
        this.assetStatusService.remove(this.assetStatusToRemove.id).subscribe(response => {
            this.alertService.showMessage("Asset Status removed successfully.");
            this.assetStatusService.getAll().subscribe(assets => {
                this.assetStatusList = assets[0];
                this.modal.close();
            });
        });

    }

    //toggleIsActive(assetStatusId: number): void {
    //    this.assetStatusToUpdate = Object.assign({}, this.assetStatusList.filter(function (asset) {
    //        return asset.id == assetStatusId;
    //    })[0]);
    //    this.Active = "In Active";
    //    this.assetStatusToUpdate.isActive == false;
    //   // this.assetStatusToUpdate.isActive = this.assetStatusToUpdate.isActive != null ? !this.assetStatusToUpdate.isActive : false;
    //    this.assetStatusService.update(this.assetStatusToUpdate).subscribe(asset => {
    //        this.alertService.showMessage('Asset Status updated successfully.');
    //        this.assetStatusService.getAll().subscribe(assets => {
    //            this.assetStatusList = assets[0];
    //        });
    //        this.resetUpdateAssetStatus();
    //        this.dismissModel();
    //    });
    //}

    resetAddAssetStatus(): void {
        this.currentAssetStatus = new AssetStatus();
    }

    resetUpdateAssetStatus(): void {
        this.assetStatusToUpdate = new AssetStatus();
    }

    dismissModel() {
        if (this.modal != undefined) {
            this.modal.close();
        }
    }

    confirmDelete(content, id) {
        this.assetStatusToRemove = Object.assign({}, this.assetStatusList.filter(function (asset) {
            return asset.id == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm' });
    }


    toggleIsActive(assetStatus: any,e) {
        if (e.checked == false) {
            this.assetStatusToUpdate = assetStatus;
            this.Active = "In Active";
            this.assetStatusToUpdate.isActive == false;
            this.assetStatusService.update(this.assetStatusToUpdate).subscribe(asset => {
                this.alertService.showMessage('Asset Status updated successfully.');
                this.assetStatusService.getAll().subscribe(assets => {
                    this.assetStatusList = assets[0];
                });
             
            })
        }
        else {
            this.assetStatusToUpdate = assetStatus;
            this.Active = "Active";
            this.assetStatusToUpdate.isActive == true;
            this.assetStatusService.update(this.assetStatusToUpdate).subscribe(asset => {
                this.alertService.showMessage('Asset Status updated successfully.');
                this.assetStatusService.getAll().subscribe(assets => {
                    this.assetStatusList = assets[0];
                });
            })
        }

    }
}