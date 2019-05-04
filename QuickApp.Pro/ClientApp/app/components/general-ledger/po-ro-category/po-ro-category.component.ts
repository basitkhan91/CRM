import { OnInit, Component } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { forEach } from "@angular/router/src/utils/collection";
import { fadeInOut } from "../../../services/animations";
import { POROCategory } from "../../../models/po-ro-category.model";
import { SingleScreenAuditDetails } from "../../../models/single-screen-audit-details.model";
import { AlertService } from "../../../services/alert.service";
import { AuthService } from "../../../services/auth.service";
import { POROCategoryService } from "../../../services/porocategory/po-ro-category.service";

@Component({
    selector: 'app-po-ro-category',
    templateUrl: './po-ro-category.component.html',
    styleUrls: ['./po-ro-category.component.scss'],
    animations: [fadeInOut]
})
export class PoRoCategoryComponent implements OnInit {

    currentporo: POROCategory;
    poroCategoryToUpdate: POROCategory;
    poroCategoryToRemove: POROCategory;
    poroCategoryList: POROCategory[];
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;
    AuditDetails: SingleScreenAuditDetails[];

    constructor(private alertService: AlertService, private poroCategoryService: POROCategoryService, private modalService: NgbModal, private authService: AuthService) {


    }

    ngOnInit(): void {
        this.poroCategoryService.getAll().subscribe(assets => {
            this.poroCategoryList = assets[0];
            this.poroCategoryList.forEach(function (poroCategory) {
                poroCategory.isActive = poroCategory.isActive == false ? false : true;
            });
        });
        this.currentporo = new POROCategory();
    }


    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    addporoCategory(): void {
        if (!(this.currentporo.categoryName)) {
            this.display = true;
            return;
        }
        this.currentporo.createdBy = this.userName;
        this.currentporo.updatedBy = this.userName;
        this.poroCategoryService.add(this.currentporo).subscribe(asset => {
            this.alertService.showMessage(' PO-RO-Category Added successfully.');
            this.poroCategoryService.getAll().subscribe(assets => {
                this.poroCategoryList = assets[0];
            });
            this.resetAddporoCategory();
        });

    }

    setporoCategoryToUpdate(editporoCategoryPopup: any, id: number): void {
        this.poroCategoryToUpdate = Object.assign({}, this.poroCategoryList.filter(function (asset) {
            return asset.poroCategoryId == id;
        })[0]);
        this.modal = this.modalService.open(editporoCategoryPopup, { size: 'sm' });
    }

    updateporoCategory(): void {
        this.currentporo.updatedBy = this.userName;
        this.poroCategoryService.update(this.poroCategoryToUpdate).subscribe(asset => {
            this.alertService.showMessage(' PO-RO-Category updated successfully.');
            this.poroCategoryService.getAll().subscribe(assets => {
                this.poroCategoryList = assets[0];
            });
            this.resetUpdatePoro();
            this.dismissModel();
        });
    }

    removeporoCategory(): void {
        this.poroCategoryService.remove(this.poroCategoryToRemove.poroCategoryId).subscribe(response => {
            this.alertService.showMessage(" PO-RO-Category removed successfully.");
            this.poroCategoryService.getAll().subscribe(assets => {
                this.poroCategoryList = assets[0];
                this.modal.close();
            });
        });

    }
    resetAddporoCategory(): void {
        this.currentporo = new POROCategory();
    }

    resetUpdatePoro(): void {
        this.poroCategoryToUpdate = new POROCategory();
    }

    dismissModel(): void {
        if (this.modal != undefined) {
            this.modal.close();
        }
    }

    confirmDelete(content, id): void {
        this.poroCategoryToRemove = Object.assign({}, this.poroCategoryList.filter(function (poroCategory) {
            return poroCategory.poroCategoryId == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm' });
    }

    toggleIsActive(poroCategory: any, event): void {
        this.poroCategoryToUpdate = poroCategory;
        this.poroCategoryToUpdate.isActive = event.checked == false ? false : true;
        this.updateporoCategory();
    }

    showAuditPopup(template, id): void {
        this.auditPOROCategory(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditPOROCategory(poroCategoryId: number): void {
        this.AuditDetails = [];
        this.poroCategoryService.getAudit(poroCategoryId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["poroCategoryAuditId", "poroCategoryId","masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }
}