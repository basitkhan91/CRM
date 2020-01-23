﻿import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard.service';
import { AssetmanagementComponent } from './assetmanagement.component';
import { AssetListingComponent } from '../components/Asset-Management/asset-listing/asset-listing.component';
import { AssetCalibrationComponent } from '../components/Asset-Management/Asset-pages/asset-calibration/asset-calibration.component';
import { AssetCapesComponent } from '../components/Asset-Management/Asset-pages/asset-capes/asset-capes.component';
import { AssetGeneralInformationComponent } from '../components/Asset-Management/Asset-pages/asset-general-information/asset-general-information.component';
import { AssetMaintenanceWarrantyComponent } from '../components/Asset-Management/Asset-pages/asset-maintenance-warranty/asset-maintenance-warranty.component';
import { CreateAssetComponent } from '../components/Asset-Management/Asset-pages/create-asset/create-asset.component';
import { ViewAssetComponent } from '../components/Asset-Management/Asset-pages/view-asset/view-asset.component';
import { AssetAdjustmentComponent } from '../components/Asset-Management/Asset-pages/asset-adjustment/asset-adjustment.component';
const assetPagesRoutes: Routes = [
    {
        path: 'assetpages',
        component: AssetmanagementComponent,
        children: [
            { path: "app-asset-listing", component: AssetListingComponent, data: { title: "Asset List" } },
            { path: "app-asset-calibration/:id", component: AssetCalibrationComponent, data: { title: "Asset Calibration" } },
            { path: "app-asset-capes/:id", component: AssetCapesComponent, data: { title: "Asset Capes" } },
            { path: "app-asset-general-information", component: AssetGeneralInformationComponent, data: { title: "Asset GeneralInformation" } },
            { path: "app-asset-maintenance-warranty/:id", component: AssetMaintenanceWarrantyComponent, data: { title: "Asset Maintenance-Warranty" } },
            { path: "app-create-asset", component: CreateAssetComponent, data: { title: "Asset Create" } },
            { path: "app-edit-asset/:id", component: CreateAssetComponent, data: { title: "Asset Edit" } },
            { path: "app-view-asset", component: ViewAssetComponent, data: { title: "Asset View" } },
            { path: "app-asset-adjustment/:id", component: AssetAdjustmentComponent, data: { title: "Asset Adjustment" } },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(assetPagesRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthService, AuthGuard
    ]
})
export class AssetmanagementRoutingModule { }