import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { Router } from '@angular/router';
import { fadeInOut } from '../../../../services/animations';

@Component({
    selector: 'app-view-asset',
    templateUrl: './view-asset.component.html',
    styleUrls: ['./view-asset.component.scss'],
    animations: [fadeInOut]
})
/** View-Asset component*/
export class ViewAssetComponent implements OnInit {

    @Input() assetViewList: any;

    ngOnInit(): void {
        // console.log('childMessage' + JSON.stringify(this.assetViewList));
    }

    constructor(private alertService: AlertService,
          private _route: Router, ) {
    }
 }