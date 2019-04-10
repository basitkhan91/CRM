import { Component, OnInit } from '@angular/core';
import { AssetTypeService } from '../../../../../services/AssetType/assettype.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../../services/alert.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-assettypelisting',
    templateUrl: './assettypelisting.component.html',
    styleUrls: ['./assettypelisting.component.scss']
})
/** assettypelisting component*/
export class AssettypelistingComponent implements OnInit {
    /** assettypelisting ctor */
    assetTypeCollection: any[] = [];
    assetTypeToRemove: any;
    modal: NgbModalRef;
    constructor(private assetTypeService: AssetTypeService, private router: Router, private alertService: AlertService, private modalService: NgbModal) {

    }
    ngOnInit(): void {
        this.assetTypeService.assetrowSelection = null;
        this.assetTypeService.getAll().subscribe(glAccountData => {
            this.assetTypeCollection = glAccountData[0];
        });
    }
    private assetTypeObjEdit(assetData) {
        this.assetTypeService.assetrowSelection = assetData;
        this.router.navigateByUrl('/generalledgermodule/generalledgerpage/app-assetcreate')
    }

    
    confirmDelete(content, id) {
        this.assetTypeToRemove = Object.assign({}, this.assetTypeCollection.filter(function (asset) {
            return asset.assetTypeId == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm' });
    }
    removeAssetType(): void {
        this.assetTypeService.deleteAssetType(this.assetTypeToRemove.assetTypeId).subscribe(response => {
            this.alertService.showMessage("Asset Status removed successfully.");
            this.assetTypeService.getAll().subscribe(assets => {
                this.assetTypeCollection = assets[0];
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