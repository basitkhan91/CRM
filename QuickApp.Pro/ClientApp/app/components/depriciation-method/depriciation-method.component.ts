﻿import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { DepriciationMethodService } from '../../services/depriciation-method/depriciation.service';
import { DepriciationMethod } from '../../models/depriciation-method.model';
import { fadeInOut } from '../../services/animations';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-depriciation-method',
    templateUrl: './depriciation-method.component.html',
    styleUrls: ['./depriciation-method.component.scss'],
    animations: [fadeInOut]
})
/** DepriciationMethod component*/
export class DepriciationMethodComponent implements OnInit {
    currentDepriciationmethod: DepriciationMethod;
    depriciationMethodList: DepriciationMethod[];
    updateMode: boolean;
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;

    /** DepriciationMethod ctor */
    constructor(private alertService: AlertService, private depriciationMethodService: DepriciationMethodService, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.depriciationMethodService.getAll().subscribe(depriciationmethods => {
            this.depriciationMethodList = depriciationmethods[0];
        });
        this.currentDepriciationmethod = new DepriciationMethod();
    }

    adddepriciationmethod(): void {
        if (!(this.currentDepriciationmethod.assetDepreciationMethodName && this.currentDepriciationmethod.assetDepreciationBasis && this.currentDepriciationmethod.assetDepreciationMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.currentDepriciationmethod.assetDepreciationMethodName && this.currentDepriciationmethod.assetDepreciationBasis && this.currentDepriciationmethod.assetDepreciationMemo)) {
            this.depriciationMethodService.add(this.currentDepriciationmethod).subscribe(depriciationmethod => {
                this.currentDepriciationmethod = depriciationmethod;
                this.alertService.showMessage('Depriciationmethod  added successfully.');
                this.depriciationMethodService.getAll().subscribe(depriciationmethods => {
                    this.depriciationMethodList = depriciationmethods[0];
                });
            });
        }
    }

    setdepriciationmethodToUpdate(assetDepreciationMethodId: number): void {
        this.currentDepriciationmethod = Object.assign({}, this.depriciationMethodList.filter(function (depriciationmethod) {
            return depriciationmethod.assetDepreciationMethodId == assetDepreciationMethodId;
        })[0]);
        this.updateMode = true;
    }

    updatedepriciationmethod(): void {
        this.depriciationMethodService.update(this.currentDepriciationmethod).subscribe(depriciationmethod => {
            this.alertService.showMessage('Depriciationmethod  updated successfully.');
            this.depriciationMethodService.getAll().subscribe(depriciationmethods => {
                this.depriciationMethodList = depriciationmethods[0];
            });
            this.updateMode = false;
            this.resetdepriciationmethod();
        });
    }

    removedepriciationmethod(): void {
        this.depriciationMethodService.remove(this.currentDepriciationmethod.assetDepreciationMethodId).subscribe(response => {
            this.alertService.showMessage("Depriciationmethod  removed successfully.");
            this.depriciationMethodService.getAll().subscribe(depriciationmethods => {
                this.depriciationMethodList = depriciationmethods[0];
                this.modal.close();
            });
        });

    }

    toggleIsDeleted(assetDepreciationMethodId: number): void {
        this.setdepriciationmethodToUpdate(assetDepreciationMethodId);
        this.currentDepriciationmethod.isDelete = !this.currentDepriciationmethod.isDelete;
    }

    resetdepriciationmethod(): void {
        this.updateMode = false;
        this.currentDepriciationmethod = new DepriciationMethod();
    }
    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.currentDepriciationmethod = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

}