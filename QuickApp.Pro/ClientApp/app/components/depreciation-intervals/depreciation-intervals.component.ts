import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { DepreciationIntervalsService } from '../../services/Depreciation -intervals/depreciation-intervals.service ';
import { DepreciationIntervals } from '../../models/depriciationIntervals.model';
import { fadeInOut } from '../../services/animations';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    updateMode: boolean;
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;

    constructor(private alertService: AlertService, private depreciationIntervalsService: DepreciationIntervalsService, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.depreciationIntervalsService.getAll().subscribe(depreciationIntervals => {
            this.depreciationIntervalsList = depreciationIntervals[0];
        });
        this.currentDepreciationIntervals = new DepreciationIntervals();
    }

    adddepreciationIntervals(): void {
        if (!(this.currentDepreciationIntervals.assetDepreciationIntervalId && this.currentDepreciationIntervals.assetDepreciationIntervalName && this.currentDepreciationIntervals.assetDepreciationIntervalMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.currentDepreciationIntervals.assetDepreciationIntervalId && this.currentDepreciationIntervals.assetDepreciationIntervalName && this.currentDepreciationIntervals.assetDepreciationIntervalMemo)) {
            this.depreciationIntervalsService.add(this.currentDepreciationIntervals).subscribe(depreciationInterval => {
                this.currentDepreciationIntervals = depreciationInterval;
                this.alertService.showMessage('Depreciation Interval  added successfully.');
                this.depreciationIntervalsService.getAll().subscribe(depreciationIntervals => {
                    this.depreciationIntervalsList = depreciationIntervals[0];
                });
            });
        }
    }

    setdepreciationIntervalsToUpdate(id: number): void {
        this.currentDepreciationIntervals = Object.assign({}, this.depreciationIntervalsList.filter(function (depreciationInterval) {
            return depreciationInterval.assetDepreciationIntervalTypeId == id;
        })[0]);
        this.updateMode = true;
    }

    updatedepreciationIntervals(): void {
        this.depreciationIntervalsService.update(this.currentDepreciationIntervals).subscribe(depreciationInterval => {
            this.alertService.showMessage('Depreciation Interval  updated successfully.');
            this.depreciationIntervalsService.getAll().subscribe(depreciationIntervals => {
                this.depreciationIntervalsList = depreciationIntervals[0];
            });
            this.updateMode = false;
            this.resetdepreciationIntervals();
        });
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

    toggleIsDeleted(assetDepreciationIntervalTypeId: number): void {
        this.setdepreciationIntervalsToUpdate(assetDepreciationIntervalTypeId);
        this.currentDepreciationIntervals.isDeleted = !this.currentDepreciationIntervals.isDeleted;
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

}