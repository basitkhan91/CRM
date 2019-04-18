import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { DepriciationMethodService } from '../../services/depriciation-method/depriciation.service';
import { DepriciationMethod } from '../../models/depriciation-method.model';
import { fadeInOut } from '../../services/animations';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

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
    depriciationToUpdate: DepriciationMethod;
    updateMode: boolean;
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;

    /** DepriciationMethod ctor */
    constructor(private alertService: AlertService, private authService: AuthService, private depriciationMethodService: DepriciationMethodService, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.depriciationMethodService.getAll().subscribe(depriciationmethods => {
            this.depriciationMethodList = depriciationmethods[0];
        });
        this.currentDepriciationmethod = new DepriciationMethod();
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    adddepriciationmethod(): void {
        if (!(this.currentDepriciationmethod.assetDepreciationId && this.currentDepriciationmethod.assetDepreciationMethodName && this.currentDepriciationmethod.assetDepreciationBasis && this.currentDepriciationmethod.assetDepreciationMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.currentDepriciationmethod.assetDepreciationMethodName && this.currentDepriciationmethod.assetDepreciationId  && this.currentDepriciationmethod.assetDepreciationBasis && this.currentDepriciationmethod.assetDepreciationMemo)) {
            this.currentDepriciationmethod.createdBy = this.userName;
            this.currentDepriciationmethod.updatedBy = this.userName;
            this.depriciationMethodService.add(this.currentDepriciationmethod).subscribe(depriciationmethod => {
                this.currentDepriciationmethod = depriciationmethod;
                this.alertService.showMessage('Depriciation Method  added successfully.');
                this.depriciationMethodService.getAll().subscribe(depriciationmethods => {
                    this.depriciationMethodList = depriciationmethods[0];
                });
                this.resetdepriciationmethod();
            });
        }
    }
    
    setdepriciationmethodToUpdate(editAssetStatusPopup: any, id: number): void {
        this.depriciationToUpdate = Object.assign({}, this.depriciationMethodList.filter(function (depriciationmethod) {
            return depriciationmethod.assetDepreciationMethodId == id;
        })[0]);
        this.modal = this.modalService.open(editAssetStatusPopup, { size: 'sm' });
    }

    updatedepriciationmethod(): void {
        if (!(this.depriciationToUpdate.assetDepreciationMethodName && this.currentDepriciationmethod.assetDepreciationId  && this.depriciationToUpdate.assetDepreciationBasis && this.depriciationToUpdate.assetDepreciationMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        else {
            this.currentDepriciationmethod.updatedBy = this.userName;
            this.depriciationMethodService.update(this.depriciationToUpdate).subscribe(depriciationmethod => {
                this.alertService.showMessage('Depriciation Method  updated successfully.');
                this.depriciationMethodService.getAll().subscribe(depriciationmethods => {
                    this.depriciationMethodList = depriciationmethods[0];
                });
                this.updateMode = false;
                this.resetdepriciationmethod();
                this.dismissModel();
            });
        }
    }

    removedepriciationmethod(): void {
        this.depriciationMethodService.remove(this.currentDepriciationmethod.assetDepreciationMethodId).subscribe(response => {
            this.alertService.showMessage("Depriciation Method  removed successfully.");
            this.depriciationMethodService.getAll().subscribe(depriciationmethods => {
                this.depriciationMethodList = depriciationmethods[0];
                this.modal.close();
            });
        });

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

    toggleIsActive(depriciationMethod: any, e) {
        if (e.checked == false) {
            this.depriciationToUpdate = depriciationMethod;
            this.Active = "In Active";
            this.depriciationToUpdate.isActive == false;
            this.depriciationMethodService.update(this.depriciationToUpdate).subscribe(asset => {
                this.alertService.showMessage('Depriciation Method updated successfully.');
                this.depriciationMethodService.getAll().subscribe(assets => {
                    this.depriciationMethodList = assets[0];
                });

            })
        }
        else {
            this.depriciationToUpdate = depriciationMethod;
            this.Active = "Active";
            this.depriciationToUpdate.isActive == true;
            this.depriciationMethodService.update(this.depriciationToUpdate).subscribe(asset => {
                this.alertService.showMessage('Depriciation Method updated successfully.');
                this.depriciationMethodService.getAll().subscribe(assets => {
                    this.depriciationMethodList = assets[0];
                });
            })
        }
    }
}