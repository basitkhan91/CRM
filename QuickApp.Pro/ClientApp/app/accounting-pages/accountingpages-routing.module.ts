import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard.service';
import { AccountingPagesComponent } from './accounting-pages.component';
import { NodeSetupComponent } from '../components/accounting/general-ledger/node-setup/node-setup.component';

const accountingPagesRoutes: Routes = [
    {
        path: 'accountpages',
        component: AccountingPagesComponent,
        children: [

            //{ path: "app-node-setup", component: NodeSetupComponent, data: { title: "Nodes" } },
            
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(accountingPagesRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthService, AuthGuard
    ]
})
export class AccountingPagesRoutingModule { }