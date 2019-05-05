import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { DepreciationIntervalsService } from '../../services/Depreciation -intervals/depreciation-intervals.service ';
import { DepreciationIntervals } from '../../models/depriciationIntervals.model';
import { fadeInOut } from '../../services/animations';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { SingleScreenAuditDetails } from '../../models/single-screen-audit-details.model';

@Component({
    selector: 'app-depreciation-intervals',
    templateUrl: './depreciation-intervals.component.html',
    styleUrls: ['./depreciation-intervals.component.scss'],
    animations: [fadeInOut]
})
/** Depreciation-Intervals component*/
export class DepreciationIntervalsComponent implements OnInit {

    currentDepreciationIntervals: DepreciationIntervals;
    depreciationIntervalsList: DepreciationIntervals[];
    depriciationIntervalsToUpdate: DepreciationIntervals;
    updateMode: boolean;
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;
    AuditDetails: SingleScreenAuditDetails[];

    constructor(private alertService: AlertService, private authService: AuthService, private depreciationIntervalsService: DepreciationIntervalsService, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.depreciationIntervalsService.getAll().subscribe(depreciationIntervals => {
            this.depreciationIntervalsList = depreciationIntervals[0];
        });
        this.currentDepreciationIntervals = new DepreciationIntervals();
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    adddepreciationIntervals(): void {
        if (!(this.currentDepreciationIntervals.assetDepreciationIntervalId && this.currentDepreciationIntervals.assetDepreciationIntervalName && this.currentDepreciationIntervals.assetDepreciationIntervalMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.currentDepreciationIntervals.assetDepreciationIntervalId && this.currentDepreciationIntervals.assetDepreciationIntervalName && this.currentDepreciationIntervals.assetDepreciationIntervalMemo)) {
            this.currentDepreciationIntervals.createdBy = this.userName;
            this.currentDepreciationIntervals.updatedBy = this.userName;
            this.depreciationIntervalsService.add(this.currentDepreciationIntervals).subscribe(depreciationInterval => {
                this.currentDepreciationIntervals = depreciationInterval;
                this.alertService.showMessage('Depreciation Interval  added successfully.');
                this.depreciationIntervalsService.getAll().subscribe(depreciationIntervals => {
                    this.depreciationIntervalsList = depreciationIntervals[0];
                });
                this.resetDepreciationInterval();
            });
        }
    }
    resetDepreciationInterval(): void {
        this.updateMode = false;
        this.currentDepreciationIntervals = new DepreciationIntervals();
    }
    
    setdepreciationIntervalsToUpdate(editassetConvention: any, id: number): void {
        this.depriciationIntervalsToUpdate = Object.assign({}, this.depreciationIntervalsList.filter(function (assetConvention) {
            return assetConvention.assetDepreciationIntervalTypeId == id;
        })[0]);
        this.modal = this.modalService.open(editassetConvention, { size: 'sm' });
    }

    updatedepreciationIntervals(): void {
        if (!(this.depriciationIntervalsToUpdate.assetDepreciationIntervalId && this.depriciationIntervalsToUpdate.assetDepreciationIntervalName && this.depriciationIntervalsToUpdate.assetDepreciationIntervalMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        else {
            this.currentDepreciationIntervals.updatedBy = this.userName;
            this.depreciationIntervalsService.update(this.depriciationIntervalsToUpdate).subscribe(depreciationInterval => {
                this.alertService.showMessage('Depreciation Interval  updated successfully.');
                this.depreciationIntervalsService.getAll().subscribe(depreciationIntervals => {
                    this.depreciationIntervalsList = depreciationIntervals[0];
                });
                this.updateMode = false;
                this.resetdepreciationIntervals();
                this.dismissModel();
            });
        }
    }

    removedepreciationIntervals(): void {
        this.depreciationIntervalsService.remove(this.currentDepreciationIntervals.assetDepreciationIntervalTypeId).subscribe(response => {
            this.alertService.showMessage("Depreciation Interval  removed successfully.");
            this.depreciationIntervalsService.getAll().subscribe(depreciationIntervals => {
                this.depreciationIntervalsList = depreciationIntervals[0];
                this.modal.close();
            });
        });

    }

    resetdepreciationIntervals(): void {
        this.updateMode = false;
        this.currentDepreciationIntervals = new DepreciationIntervals();
    }
    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.currentDepreciationIntervals = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    toggleIsActive(assetTypes: any, e) {
        if (e.checked == false) {
            this.depriciationIntervalsToUpdate = assetTypes;
            this.Active = "In Active";
            this.depriciationIntervalsToUpdate.isActive == false;
            this.depreciationIntervalsService.update(this.depriciationIntervalsToUpdate).subscribe(asset => {
                this.alertService.showMessage('Asset Depreciation Interval Type updated successfully.');
                this.depreciationIntervalsService.getAll().subscribe(assets => {
                    this.depreciationIntervalsList = assets[0];
                });

            })
        }
        else {
            this.depriciationIntervalsToUpdate = assetTypes;
            this.Active = "Active";
            this.depriciationIntervalsToUpdate.isActive == true;
            this.depreciationIntervalsService.update(this.depriciationIntervalsToUpdate).subscribe(asset => {
                this.alertService.showMessage('Asset Depreciation Interval Type updated successfully.');
                this.depreciationIntervalsService.getAll().subscribe(assets => {
                    this.depreciationIntervalsList = assets[0];
                });
            })
        }
    }

    showAuditPopup(template, assetDepreciationIntervalTypeId): void {
        this.auditInterval(assetDepreciationIntervalTypeId);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditInterval(assetDepreciationIntervalTypeId: number): void {
        this.AuditDetails = [];
        this.depreciationIntervalsService.getAudit(assetDepreciationIntervalTypeId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["assetDepreciationIntervalTypeAuditId", "assetDepreciationIntervalTypeId", "createdBy", "createdDate", "updatedDate", "masterCompanyId","isActive"];
            }
        });
    }
}