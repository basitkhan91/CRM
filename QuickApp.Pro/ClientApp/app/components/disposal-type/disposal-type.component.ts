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
    updateMode: boolean;
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;

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

    setdisposalTypeToUpdate(id: number): void {
        this.currentdisposalType = Object.assign({}, this.disposalTypeList.filter(function (disposalType) {
            return disposalType.assetDisposalTypeId == id;
        })[0]);
        this.updateMode = true;
    }

    updatedisposalType(): void {
        this.disposalTypeService.update(this.currentdisposalType).subscribe(disposalType => {
            this.alertService.showMessage('Disposal Type  updated successfully.');
            this.disposalTypeService.getAll().subscribe(disposalTypes => {
                this.disposalTypeList = disposalTypes[0];
            });
            this.updateMode = false;
            this.resetdisposalType();
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

    toggleIsDeleted(assetDisposalTypeId: number): void {
        this.setdisposalTypeToUpdate(assetDisposalTypeId);
        this.currentdisposalType.isDelete = !this.currentdisposalType.isDelete;
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
}