import { Component, OnInit } from '@angular/core';
import { GlAccountService } from '../../../services/glAccount/glAccount.service';
import { GlAccount } from '../../../models/GlAccount.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-glaccount-list',
    templateUrl: './glaccount-list.component.html',
    styleUrls: ['./glaccount-list.component.scss']
})
/** GLAccountList component*/
export class GlaccountListComponent implements OnInit {
    glAccountList: GlAccount[];
    /** GLAccountList ctor */
    constructor(private glAccountService: GlAccountService,private router:Router) {

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
}