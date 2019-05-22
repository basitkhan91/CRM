import { Component, OnInit } from '@angular/core';
//import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/components/common/message';
import { AssetService } from '../../../../services/asset/Assetservice';
@Component({
    selector: 'app-asset-steps',
    templateUrl: './asset-steps.component.html',
    styleUrls: ['./asset-steps.component.scss']
})
/** Asset-Steps component*/
export class AssetStepsComponent implements OnInit {
    ifvalue: boolean;
    generalcollection: any;
    collection: any;
    currentUrl: any;
    items: MenuItem[];
    readonly = true;
    read = false;
    msgs: Message[] = [];
    activeIndex: number;
    showComponentPTab: boolean;
    constructor(private router: ActivatedRoute, private route: Router, private assetService: AssetService) {
       // debugger
        let currentUrl = this.route.url;
        this.assetService.alertChangeObject$.subscribe(value => {
            this.showComponentPTab = value;

        });
        this.assetService.indexObjChangeObject$.subscribe(value => {
            this.activeIndex = value;

        });
    } ngOnInit() {
        //debugger
        this.showComponentPTab = this.assetService.ShowPtab;
        this.currentUrl = this.route.url;
        //
        if (this.currentUrl == '/assetmodule/assetpages/app-asset-listing') {
            this.showComponentPTab = false;
            this.activeIndex = 0;

        }
        else if (this.currentUrl == '/assetmodule/assetpages/app-create-asset') {
            this.activeIndex = 0;

        }
        else if (this.currentUrl == '/assetmodule/assetpages/app-asset-capes') {
            //	this.showComponentPTab = this.vendorService.ShowPtab;
            this.activeIndex = 1;
        }

        else if (this.currentUrl == '/assetmodule/assetpages/app-asset-calibration') {

            this.activeIndex = 2;
        }
        else if (this.currentUrl == '/assetmodule/assetpages/app-asset-maintenance-warranty') {

            this.activeIndex = 3;
        }
       


        this.items = [{
            label: 'General Information',
            command: (event: any) => {
                this.activeIndex = 0;
                this.msgs.length = 0;
             this.msgs.push({ severity: 'info', summary: 'Create Asset', detail: event.item.label });
                this.route.navigateByUrl('/assetmodule/assetpages/app-create-asset');

            }
        },
        {
            label: 'Capes',
            command: (event: any) => {
                this.assetService.financial = true;
                this.activeIndex = 1;
                this.msgs.length = 0;
                this.msgs.push({ severity: 'info', summary: 'Capes', detail: event.item.label });
                this.route.navigateByUrl('/assetmodule/assetpages/app-asset-capes');
            }
        },
        {
            label: 'Calibration',
            command: (event: any) => {
                this.activeIndex = 2;
                this.msgs.length = 0;
                this.msgs.push({ severity: 'info', summary: 'Calibration', detail: event.item.label });
                this.route.navigateByUrl('/assetmodule/assetpages/app-asset-calibration');
            }
        },
        {
            label: 'Maintance & Warrenty',
            command: (event: any) => {
                this.activeIndex = 3;
                this.msgs.length = 0;
                this.msgs.push({ severity: 'info', summary: 'Maintance & Warrenty', detail: event.item.label });                
                this.route.navigateByUrl('/assetmodule/assetpages/app-asset-maintenance-warranty');
            }
        },
        ];
    }
}