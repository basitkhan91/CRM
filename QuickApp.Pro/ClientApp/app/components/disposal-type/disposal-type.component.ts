import { Component, OnInit } from '@angular/core';
import { DisposalTypeService } from '../../services/disposal-type/disposaltype.service';
import { AlertService } from '../../services/alert.service';
import { DisposalType } from '../../models/disposal-type.model';
import { fadeInOut } from '../../services/animations';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

    constructor(private alertService: AlertService, private disposalTypeService: DisposalTypeService, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.disposalTypeService.getAll().subscribe(disposalTypes => {
            this.disposalTypeList = disposalTypes[0];
        });
        this.currentdisposalType = new DisposalType();
    }

    adddisposalType(): void {
        if (!(this.currentdisposalType.assetDispoalId && this.currentdisposalType.assetDisposalName && this.currentdisposalType.assetDisposalMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.currentdisposalType.assetDispoalId && this.currentdisposalType.assetDisposalName && this.currentdisposalType.assetDisposalMemo)) {
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
}