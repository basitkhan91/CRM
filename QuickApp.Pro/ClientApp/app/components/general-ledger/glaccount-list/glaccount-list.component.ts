import { Component, OnInit } from '@angular/core';
import { GlAccountService } from '../../../services/glAccount/glAccount.service';
import { GlAccount } from '../../../models/GlAccount.model';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../services/alert.service';

@Component({
    selector: 'app-glaccount-list',
    templateUrl: './glaccount-list.component.html',
    styleUrls: ['./glaccount-list.component.scss']
})
/** GLAccountList component*/
export class GlaccountListComponent implements OnInit {
    glAccountList: GlAccount[];
    glaccountToRemove: any;
    assetTypeCollection: any[] = [];
    modal: NgbModalRef;
    /** GLAccountList ctor */
    constructor(private glAccountService: GlAccountService, private router: Router, private modalService: NgbModal, private alertService: AlertService) {

    }

    ngOnInit(): void {
        this.glAccountService.glAccountEditCollection = null;
        this.glAccountService.getAll().subscribe(glAccountData => {
            this.glAccountList = glAccountData[0];
        });
    }
    private glAccountEdit(glAccount) {
        this.glAccountService.glAccountEditCollection = glAccount;
        this.router.navigateByUrl('/generalledgermodule/generalledgerpage/app-glaccount-create')
    }


    confirmDelete(content, id) {
        debugger;
        this.glaccountToRemove = Object.assign({}, this.glAccountList.filter(function (glAccount) {
            return glAccount.glAccountId == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm' });
    }
    removeAssetType(): void {
        debugger;
        this.glAccountService.remove(this.glaccountToRemove.glAccountId).subscribe(response => {
            this.alertService.showMessage("Asset Status removed successfully.");
            this.glAccountService.getAll().subscribe(glAccounts => {
                this.glAccountList = glAccounts[0];
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