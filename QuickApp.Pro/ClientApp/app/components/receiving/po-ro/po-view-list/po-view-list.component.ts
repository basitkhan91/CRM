import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-po-view-list',
  templateUrl: './po-view-list.component.html',
  styleUrls: ['./po-view-list.component.scss']
})

export class POViewListComponent implements OnInit {

    toggleIcon: boolean = false;
    toggleAddDetails: boolean = false;

    constructor() {}
    
    ngOnInit() {
       
    }

    toggleExpandIcon() {
        this.toggleIcon = !this.toggleIcon;
    }

    addStockLine() {
        this.toggleAddDetails = !this.toggleAddDetails;
    }
}