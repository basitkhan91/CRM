import { Component } from '@angular/core';
import { AssetIntangibleTypeService } from '../../../../../services/AssetIntangibleType/AssetIntangibleType.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-intangibletype-listing',
    templateUrl: './intangibletype-listing.component.html',
    styleUrls: ['./intangibletype-listing.component.scss']
})
/** intangibletype-listing component*/
export class IntangibletypeListingComponent {
    /** intangibletype-listing ctor */
    intangibleTypeList: any[];
    intangibleToRemove: any;
    
    modal: NgbModalRef;
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
        this.router.navigateByUrl('generalledgermodule/generalledgerpage/app-create-intangibletype')
    }


    confirmDelete(content, id) {
        debugger;
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
}