import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard.service';
import { MastermaintanacepagesComponent } from './mastermaintanacepages.component';
import { IntangibletypeListingComponent } from '../components/master-maintanace/assets-master/IntangibleType/intangibletype-listing/intangibletype-listing.component';
import { AssetcreateComponent } from '../components/master-maintanace/assets-master/assetstype/assetcreate/assetcreate.component';
import { AssettypelistingComponent } from '../components/master-maintanace/assets-master/assetstype/assettypelisting/assettypelisting.component';
import { CreateIntangibletypeComponent } from '../components/master-maintanace/assets-master/IntangibleType/create-intangibletype/create-intangibletype.component';



const maintanancePagesRoutes: Routes = [
    {
        path: 'masterpages',
        component: MastermaintanacepagesComponent,
        children: [
           
            { path: "app-assetcreate", component: AssetcreateComponent, data: { title: "Asset Create" } },
            { path: "app-assettypelisting", component: AssettypelistingComponent, data: { title: "Asset Type Listing" } },
            { path: "app-create-intangibletype", component: CreateIntangibletypeComponent, data: { title: "Create Asset Intangibletype" } },
            { path: "app-intangibletype-listing", component: IntangibletypeListingComponent, data: { title: "Intangible Type List" } },
            

        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(maintanancePagesRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthService, AuthGuard
    ]
})
export class MastermaintanacepagesRoutingModule { }