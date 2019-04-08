import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { AssetService } from '../../../services/asset/Assetservice';
import { Router } from '@angular/router';

@Component({
    selector: 'app-asset-listing',
    templateUrl: './asset-listing.component.html',
    styleUrls: ['./asset-listing.component.scss']
})
/** Asset-listing component*/
export class AssetListingComponent implements OnInit {
    isSaving: boolean;

    ngOnInit(): void {
        this.loadData();
    }
    /** Asset-listing ctor */
    loadingIndicator: boolean;
    allAssetInfo: any[] = [];
    cols: { field: string; header: string; }[];
    selectedColumns: { field: string; header: string; }[];
    constructor(private alertService: AlertService, private assetService: AssetService, private _route: Router) {
        this.assetService.isEditMode = false;
    }
    private onDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allAssetInfo = allWorkFlows;
        console.log(allWorkFlows);
    }

    private loadData() {

        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.assetService.getAssetList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.cols = [

            { field: 'assetId', header: 'Asset Id' },
            { field: 'alternateAssetId', header: 'Alt Asset Id' },
            { field: 'name', header: 'Asset Name' },
            { field: 'assetTypeSingleScreenId', header: 'Asset Type ' },
            { field: 'unitOfMeasureId', header: 'UOM ' },
            { field: 'currencyId', header: 'Currency ' },
        ];

        this.selectedColumns = this.cols;
    }
    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

    }

    openAssetToEdit(row) {
        this.assetService.isEditMode = true;
        this.isSaving = true;
        this.assetService.listCollection = row;
        this._route.navigateByUrl('assetmodule/assetpages/app-create-asset');
    }

}