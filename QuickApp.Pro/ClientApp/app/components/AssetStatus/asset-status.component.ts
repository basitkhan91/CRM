import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService } from "../../services/alert.service";
import { AssetStatus } from "../../models/asset-status.model";
import { AssetStatusService } from "../../services/asset-status/asset-status.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AssetStatusAudit} from "../../models/asset-status-audit.model";
import { forEach } from "@angular/router/src/utils/collection";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { AuthService } from "../../services/auth.service";

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
    assetStatusAuditList: AssetStatusAudit[];
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;
    AuditDetails: SingleScreenAuditDetails[];

    constructor(private alertService: AlertService, private assetStatusService: AssetStatusService, private modalService: NgbModal, private authService: AuthService) {

    
    }

    ngOnInit(): void {
        this.assetStatusService.getAll().subscribe(assets => {
            this.assetStatusList = assets[0];
            this.assetStatusList.forEach(function (assetStatus) {
                assetStatus.isActive = assetStatus.isActive == false ? false : true;
            });
        });
        this.currentAssetStatus = new AssetStatus();
    }


    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    addAssetStatus(): void {
        if (!(this.currentAssetStatus.identification && this.currentAssetStatus.name && this.currentAssetStatus.memo)) {
            this.display = true;
            return;
        }
        this.currentAssetStatus.createdBy = this.userName;
        this.currentAssetStatus.updatedBy = this.userName;
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
        this.currentAssetStatus.updatedBy = this.userName;
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
     resetAddAssetStatus(): void {
        this.currentAssetStatus = new AssetStatus();
    }

    resetUpdateAssetStatus(): void {
        this.assetStatusToUpdate = new AssetStatus();
    }

    dismissModel(): void {
        if (this.modal != undefined) {
            this.modal.close();
        }
    }

    confirmDelete(content, id): void {
        this.assetStatusToRemove = Object.assign({}, this.assetStatusList.filter(function (asset) {
            return asset.id == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm' });
    }

    toggleIsActive(assetStatus: any, event): void {
        this.assetStatusToUpdate = assetStatus;
        this.assetStatusToUpdate.isActive = event.checked == false ? false : true;
        this.updateAssetStatus();
    }

    showAuditPopup(template, id): void {
        this.auditAssetStatus(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditAssetStatus(assetStatusId: number): void {
        this.AuditDetails = [];
        this.assetStatusService.getAssetAudit(assetStatusId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["assetStatusAuditId", "id", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }
}