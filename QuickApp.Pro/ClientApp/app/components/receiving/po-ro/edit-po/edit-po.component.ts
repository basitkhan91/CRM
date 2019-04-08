﻿import { Component } from '@angular/core';
import { VendorService } from '../../../../services/vendor.service';

@Component({
    selector: 'app-edit-po',
    templateUrl: './edit-po.component.html',
    styleUrls: ['./edit-po.component.scss']
})
/** edit-po component*/
export class EditPoComponent {
    receivingPoEditCollection: any;
    data: any;
    localData: any[]=[];
    /** edit-po ctor */
    constructor(private vendorService: VendorService) {
        debugger;
        this.vendorService.receiveSaveddata = this.localData;
        this.receivingPoEditCollection = this.vendorService.selectedPoCollection;
        //this.receivingPoEditCollection = this.vendorService.vendorForPoCollection;
    }
}