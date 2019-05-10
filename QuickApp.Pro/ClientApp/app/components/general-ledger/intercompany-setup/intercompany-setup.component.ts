import { Component, OnInit } from '@angular/core';
import { GlAccountService } from '../../../services/glAccount/glAccount.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../services/alert.service';

@Component({
    selector: 'app-intercompany-setup',
    templateUrl: './intercompany-setup.component.html',
    styleUrls: ['./intercompany-setup.component.scss']
})
/** GLAccountList component*/
export class InterCompanySetupComponent implements OnInit {
    GLAccountList: any[];
    constructor(private router: Router, private modalService: NgbModal, private alertService: AlertService) {

    }
    ngOnInit(): void {
        debugger;
        this.GLAccountList = [
            { id: 1, name: '120122' },
            { id: 2, name: '120123' },
            { id: 3, name: '120124' },
            { id: 4, name: '120125' },
            { id: 5, name: '120126' },
            { id: 6, name: '120127' }
        ];
        console.log(this.GLAccountList);
    }
}