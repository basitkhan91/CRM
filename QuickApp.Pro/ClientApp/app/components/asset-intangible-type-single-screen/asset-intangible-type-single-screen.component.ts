import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService } from "../../services/alert.service";
import { AssetIntangibleTypeSingleScreen } from "../../models/assetIntangibleTypeSingleScreen.model";
import { AssetIntangibleTypeSingleScreenService } from "../../services/AssetIntangibleTypeSingleScreen/assetIntangibleTypeSingleScreen.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { SingleScreenAuditDetails } from "../../models/single-screen-audit-details.model";
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";

@Component({
     selector: 'app-asset-intangible-type-single-screen',
     templateUrl: './asset-intangible-type-single-screen.component.html',
     styleUrls: [],
     animations: [fadeInOut]
})
export class AssetIntangibleTypeSingleScreenComponent implements OnInit {

    currentAssetIntangible: AssetIntangibleTypeSingleScreen;
    assetIntangibleList: AssetIntangibleTypeSingleScreen[];
    assetIntangibleToUpdate: AssetIntangibleTypeSingleScreen;
    updateMode: boolean;
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;
    AuditDetails: SingleScreenAuditDetails[];

    constructor(private breadCrumb: SingleScreenBreadcrumbService,private alertService: AlertService, private assetIntangibleService: AssetIntangibleTypeSingleScreenService, private modalService: NgbModal, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-asset-intangible-type-single-screen';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    

        this.assetIntangibleService.getAll().subscribe(assetIntangible => {
            this.assetIntangibleList = assetIntangible[0];
        });
        this.currentAssetIntangible = new AssetIntangibleTypeSingleScreen();
    }


    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    addAssetIntangible(): void {
        if (!(this.currentAssetIntangible.assetIntangibleSingleId && this.currentAssetIntangible.assetIntangibleName && this.currentAssetIntangible.assetIntangibleMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.currentAssetIntangible.assetIntangibleSingleId && this.currentAssetIntangible.assetIntangibleName && this.currentAssetIntangible.assetIntangibleMemo)) {
            this.currentAssetIntangible.updatedBy = this.userName;
            this.currentAssetIntangible.createdBy = this.userName;
            this.assetIntangibleService.add(this.currentAssetIntangible).subscribe(assetIntangible => {
                this.currentAssetIntangible = assetIntangible;
                this.alertService.showMessage('Asset Intangible added successfully.');
                this.assetIntangibleService.getAll().subscribe(assetIntangible => {
                    this.assetIntangibleList = assetIntangible[0];
                });
                this.resetAssetIntangible();
            });
        }
    }

    setAssetIntangibleToUpdate(editassetConvention: any, id: number): void {
        this.assetIntangibleToUpdate = Object.assign({}, this.assetIntangibleList.filter(function (assetIntangible) {
            return assetIntangible.assetIntangibleTypeSingleId == id;
        })[0]);
        this.modal = this.modalService.open(editassetConvention, { size: 'sm' });
    }
    updateAssetIntangible(): void {
        if (!(this.assetIntangibleToUpdate.assetIntangibleSingleId && this.assetIntangibleToUpdate.assetIntangibleName && this.assetIntangibleToUpdate.assetIntangibleMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        else {
            this.currentAssetIntangible.updatedBy = this.userName;
            this.assetIntangibleService.update(this.assetIntangibleToUpdate).subscribe(assetIntangible => {
                this.alertService.showMessage('Asset Intangible updated successfully.');
                this.assetIntangibleService.getAll().subscribe(assetIntangible => {
                    this.assetIntangibleList = assetIntangible[0];
                });
                this.updateMode = false;
                this.resetAssetIntangible();
                this.dismissModel();
            });
        }
    }

    removeAssetIntangible(): void {
        this.assetIntangibleService.remove(this.currentAssetIntangible.assetIntangibleTypeSingleId).subscribe(response => {
            this.alertService.showMessage("Asset Intangible removed successfully.");
            this.assetIntangibleService.getAll().subscribe(assets => {
                this.assetIntangibleList = assets[0];
                this.modal.close();
            });
        });
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

    toggleIsActive(intangibleTypes: any, e) {
        if (e.checked == false) {
            this.assetIntangibleToUpdate = intangibleTypes;
            this.Active = "In Active";
            this.assetIntangibleToUpdate.isActive == false;
            this.assetIntangibleService.update(this.assetIntangibleToUpdate).subscribe(asset => {
                this.alertService.showMessage('Asset Intangible updated successfully.');
                this.assetIntangibleService.getAll().subscribe(assets => {
                    this.assetIntangibleList = assets[0];
                });

            })
        }
        else {
            this.assetIntangibleToUpdate = intangibleTypes;
            this.Active = "Active";
            this.assetIntangibleToUpdate.isActive == true;
            this.assetIntangibleService.update(this.assetIntangibleToUpdate).subscribe(asset => {
                this.alertService.showMessage('Asset Intangible updated successfully.');
                this.assetIntangibleService.getAll().subscribe(assets => {
                    this.assetIntangibleList = assets[0];
                });
            })
        }
    }

    showAuditPopup(template, assetIntangibleTypeSingleId): void {
        this.auditIntangible(assetIntangibleTypeSingleId);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditIntangible(assetIntangibleTypeSingleId: number): void {
        this.AuditDetails = [];
        this.assetIntangibleService.getAssetIntangibleAudit(assetIntangibleTypeSingleId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["assetIntangibleTypeSingleAuditId", "assetIntangibleTypeSingleId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }

}