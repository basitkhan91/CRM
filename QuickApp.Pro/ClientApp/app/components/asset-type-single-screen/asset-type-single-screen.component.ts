import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService } from "../../services/alert.service";
import { AssetTypeSingleScreenService } from "../../services/AssetTypeSingleScreen/assettypesinglescreen.service";
import { AssetTypeSingleScreen } from "../../models/assettypesinglescreen.model";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { SingleScreenAuditDetails } from "../../models/single-screen-audit-details.model";


@Component({
    selector: 'app-asset-type-single-screen',
    templateUrl: './asset-type-single-screen.component.html',
    styleUrls: ['./asset-type-single-screen.component.scss'],
    animations: [fadeInOut]
})
export class AssetTypeSingleScreenComponent implements OnInit {

    currentAssetTypeetStatus: AssetTypeSingleScreen;
    assetTypeList: AssetTypeSingleScreen[];
    assetTypeToUpdate: AssetTypeSingleScreen;
    updateMode: boolean;
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;
    AuditDetails: SingleScreenAuditDetails[];

    constructor(private alertService: AlertService, private assetTypeService: AssetTypeSingleScreenService, private modalService: NgbModal, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.assetTypeService.getAll().subscribe(AssetTypes => {
            this.assetTypeList = AssetTypes[0];
        });
        this.currentAssetTypeetStatus = new AssetTypeSingleScreen();
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    addAssetType(): void {
        if (!(this.currentAssetTypeetStatus.assetTypeSingleId && this.currentAssetTypeetStatus.assetTypeName && this.currentAssetTypeetStatus.assetTypeMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.currentAssetTypeetStatus.assetTypeSingleId && this.currentAssetTypeetStatus.assetTypeName && this.currentAssetTypeetStatus.assetTypeMemo)) {
            this.currentAssetTypeetStatus.createdBy = this.userName;
            this.currentAssetTypeetStatus.updatedBy = this.userName;
            this.assetTypeService.add(this.currentAssetTypeetStatus).subscribe(asset => {
                this.currentAssetTypeetStatus = asset;
                this.alertService.showMessage('Asset Type added successfully.');
                this.assetTypeService.getAll().subscribe(AssetTypes => {
                    this.assetTypeList = AssetTypes[0];
                });
                this.resetAssetTypeAdd();
            });
        }
    }

    resetAssetTypeAdd(): void {
        this.currentAssetTypeetStatus = new AssetTypeSingleScreen();
    }
   
    setAssetTypeToUpdate(editAssetTypes: any, id: number): void {
        this.assetTypeToUpdate = Object.assign({}, this.assetTypeList.filter(function (asset) {
            return asset.assetTypeSingleScreenId == id;
        })[0]);
        this.modal = this.modalService.open(editAssetTypes, { size: 'sm' });
    }

    updateAssetType(): void {
        if (!(this.assetTypeToUpdate.assetTypeSingleId && this.assetTypeToUpdate.assetTypeName && this.assetTypeToUpdate.assetTypeMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        else {
            this.currentAssetTypeetStatus.updatedBy = this.userName;
            this.assetTypeService.update(this.assetTypeToUpdate).subscribe(asset => {
                this.alertService.showMessage('Asset Type updated successfully.');
                this.assetTypeService.getAll().subscribe(AssetTypes => {
                    this.assetTypeList = AssetTypes[0];
                });
                this.updateMode = false;
                this.resetAssetType();
                this.dismissModel();
            });
        }
    }

    removeAssetType(): void {
        this.assetTypeService.remove(this.currentAssetTypeetStatus.assetTypeSingleScreenId).subscribe(response => {
            this.alertService.showMessage("Asset Type removed successfully.");
            this.assetTypeService.getAll().subscribe(AssetTypes => {
                this.assetTypeList = AssetTypes[0];
                this.modal.close();
            });
        });

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
    toggleIsActive(assetTypes: any, e) {
        if (e.checked == false) {
            this.assetTypeToUpdate = assetTypes;
            this.Active = "In Active";
            this.assetTypeToUpdate.isActive == false;
            this.assetTypeService.update(this.assetTypeToUpdate).subscribe(asset => {
                this.alertService.showMessage('Asset Type updated successfully.');
                this.assetTypeService.getAll().subscribe(assets => {
                    this.assetTypeList = assets[0];
                });

            })
        }
        else {
            this.assetTypeToUpdate = assetTypes;
            this.Active = "Active";
            this.assetTypeToUpdate.isActive == true;
            this.assetTypeService.update(this.assetTypeToUpdate).subscribe(asset => {
                this.alertService.showMessage('Asset Type updated successfully.');
                this.assetTypeService.getAll().subscribe(assets => {
                    this.assetTypeList = assets[0];
                });
            })
        }
    }

    showAuditPopup(template, assetTypeSingleScreenId): void {
        this.audit(assetTypeSingleScreenId);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    audit(assetTypeSingleScreenId: number): void {
        this.AuditDetails = [];
        this.assetTypeService.getAudit(assetTypeSingleScreenId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["assetTypeSingleScreenAuditId", "assetTypeSingleScreenId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }
}