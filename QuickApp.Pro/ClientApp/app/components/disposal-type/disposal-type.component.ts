import { Component, OnInit } from '@angular/core';
import { DisposalTypeService } from '../../services/disposal-type/disposaltype.service';
import { AlertService } from '../../services/alert.service';
import { DisposalType } from '../../models/disposal-type.model';
import { fadeInOut } from '../../services/animations';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { SingleScreenAuditDetails } from '../../models/single-screen-audit-details.model';

@Component({
    selector: 'app-disposal-type',
    templateUrl: './disposal-type.component.html',
    styleUrls: ['./disposal-type.component.scss'],
    animations: [fadeInOut]
})
/** DisposalType component*/
export class DisposalTypeComponent implements OnInit {
    currentdisposalType: DisposalType;
    disposalTypeList: DisposalType[];
    assetDisposalToUpdate: DisposalType;
    updateMode: boolean;
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;
    AuditDetails: SingleScreenAuditDetails[];

    constructor(private alertService: AlertService, private disposalTypeService: DisposalTypeService, private authService: AuthService, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.disposalTypeService.getAll().subscribe(disposalTypes => {
            this.disposalTypeList = disposalTypes[0];
        });
        this.currentdisposalType = new DisposalType();
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    adddisposalType(): void {
        if (!(this.currentdisposalType.assetDisposalId && this.currentdisposalType.assetDisposalName && this.currentdisposalType.assetDisposalMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.currentdisposalType.assetDisposalId && this.currentdisposalType.assetDisposalName && this.currentdisposalType.assetDisposalMemo)) {
            this.currentdisposalType.createdBy = this.userName;
            this.currentdisposalType.updatedBy = this.userName;
            this.disposalTypeService.add(this.currentdisposalType).subscribe(disposalType => {
                this.currentdisposalType = disposalType;
                this.alertService.showMessage('Disposal Type added successfully.');
                this.disposalTypeService.getAll().subscribe(disposalTypes => {
                    this.disposalTypeList = disposalTypes[0];
                });
            });
        }
    }
    

    setdisposalTypeToUpdate(editDisposal: any, id: number): void {
        this.assetDisposalToUpdate = Object.assign({}, this.disposalTypeList.filter(function (assetConvention) {
            return assetConvention.assetDisposalTypeId == id;
        })[0]);
        this.modal = this.modalService.open(editDisposal, { size: 'sm' });
    }


    updatedisposalType(): void {
        if (!(this.assetDisposalToUpdate.assetDisposalId && this.assetDisposalToUpdate.assetDisposalName && this.assetDisposalToUpdate.assetDisposalMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        else {
            this.currentdisposalType.updatedBy = this.userName;
            this.disposalTypeService.update(this.assetDisposalToUpdate).subscribe(disposalType => {
                this.alertService.showMessage('Disposal Type  updated successfully.');
                this.disposalTypeService.getAll().subscribe(disposalTypes => {
                    this.disposalTypeList = disposalTypes[0];
                });
                this.updateMode = false;
                this.resetdisposalType();
                this.dismissModel();
            });
        }
    }

    removedisposalType(): void {
        this.disposalTypeService.remove(this.currentdisposalType.assetDisposalTypeId).subscribe(response => {
            this.alertService.showMessage("Disposal Type  removed successfully.");
            this.disposalTypeService.getAll().subscribe(disposalTypes => {
                this.disposalTypeList = disposalTypes[0];
                this.modal.close();
            });
        });

    }
    
    resetdisposalType(): void {
        this.updateMode = false;
        this.currentdisposalType = new DisposalType();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.currentdisposalType = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    toggleIsActive(assetTypes: any, e) {
        if (e.checked == false) {
            this.assetDisposalToUpdate = assetTypes;
            this.Active = "In Active";
            this.assetDisposalToUpdate.isActive == false;
            this.disposalTypeService.update(this.assetDisposalToUpdate).subscribe(asset => {
                this.alertService.showMessage('Disposal Type updated successfully.');
                this.disposalTypeService.getAll().subscribe(assets => {
                    this.disposalTypeList = assets[0];
                });

            })
        }
        else {
            this.assetDisposalToUpdate = assetTypes;
            this.Active = "Active";
            this.assetDisposalToUpdate.isActive == true;
            this.disposalTypeService.update(this.assetDisposalToUpdate).subscribe(asset => {
                this.alertService.showMessage('Disposal Type updated successfully.');
                this.disposalTypeService.getAll().subscribe(assets => {
                    this.disposalTypeList = assets[0];
                });
            })
        }
    }

    showAuditPopup(template, assetDisposalId): void {
        this.auditDisposal(assetDisposalId);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditDisposal(assetDisposalId: number): void {
        this.disposalTypeService.getDisposalAudit(assetDisposalId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["assetDisposalTypeAuditId", "assetDisposalTypeId", "createdBy", "createdDate", "updatedDate", "masterCompanyId"];
            }
        });
    }
}