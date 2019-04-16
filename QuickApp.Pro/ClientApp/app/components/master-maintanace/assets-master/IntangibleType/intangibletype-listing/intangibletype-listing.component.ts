import { Component } from '@angular/core';
import { AssetIntangibleTypeService } from '../../../../../services/AssetIntangibleType/AssetIntangibleType.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../../../services/alert.service';
import { Router } from '@angular/router';
import { fadeInOut } from '../../../../../services/animations';

@Component({
    selector: 'app-intangibletype-listing',
    templateUrl: './intangibletype-listing.component.html',
    styleUrls: ['./intangibletype-listing.component.scss'],
    animations: [fadeInOut]
})
/** intangibletype-listing component*/
export class IntangibletypeListingComponent {
    /** intangibletype-listing ctor */
    intangibleTypeList: any[];
    intangibleToRemove: any;
    
    modal: NgbModalRef;
    intangibleTypeUpdate: any;
    Active: string;
    constructor(private intangibleTypeService: AssetIntangibleTypeService, private router: Router, private modalService: NgbModal, private alertService: AlertService) {

    }
    ngOnInit(): void {
        this.intangibleTypeService.intangibleTypeEditCollection = null;
        this.intangibleTypeService.getAll().subscribe(intangibleTypeData => {
            this.intangibleTypeList = intangibleTypeData[0];
        });
    }
    private intangibleTypeEdit(intangibleType) {
        this.intangibleTypeService.intangibleTypeEditCollection = intangibleType;
        this.router.navigateByUrl('/mastermodule/masterpages/app-create-intangibletype')
    }


    confirmDelete(content, id) {
        //debugger;
        this.intangibleToRemove = Object.assign({}, this.intangibleTypeList.filter(function (intangibleType) {
            return intangibleType.assetIntangibleTypeId == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm' });
    }
    removeIntangibleType(): void {
       
        this.intangibleTypeService.remove(this.intangibleToRemove.assetIntangibleTypeId).subscribe(response => {
            this.alertService.showMessage("Intangible Type removed successfully.");
            this.intangibleTypeService.getAll().subscribe(intangibleTypes => {
                this.intangibleTypeList = intangibleTypes[0];
                this.modal.close();
            });
        });

    }
    dismissModel() {
        if (this.modal != undefined) {
            this.modal.close();
        }
    }
    toggleIsActive(intangibleType: any, e) {
        if (e.checked == false) {
            this.intangibleTypeUpdate = intangibleType;
            this.Active = "In Active";
            this.intangibleTypeUpdate.isActive == false;
            this.intangibleTypeService.update(this.intangibleTypeUpdate).subscribe(intangibleTypes => {
                this.alertService.showMessage('Intangible Type updated successfully.');
                this.intangibleTypeService.getAll().subscribe(intangibleTypes => {
                    this.intangibleTypeList = intangibleTypes[0];
                });

            })
        }
        else {
            this.intangibleTypeUpdate = intangibleType;
            this.Active = "Active";
            this.intangibleTypeUpdate.isActive == true;
            this.intangibleTypeService.update(this.intangibleTypeUpdate).subscribe(intangibleTypes => {
                this.alertService.showMessage('Intangible Type updated successfully.');
                this.intangibleTypeService.getAll().subscribe(intangibleTypes => {
                    this.intangibleTypeList = intangibleTypes[0];
                });
            })
        }

    }
}