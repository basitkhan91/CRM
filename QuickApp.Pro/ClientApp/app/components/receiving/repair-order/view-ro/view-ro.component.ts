import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-view-ro',
    templateUrl: './view-ro.component.html',
    styleUrls: ['./view-ro.component.scss']
})

export class ViewRoComponent {
    toggle_vro_header: boolean = false;
    memoNotes: string;
    localData: any[];

    constructor(public route: Router) {
        
    }

    ngOnInit() {
        //TODO: Remove once we load dynamic content
        this.localData = [
            { partNumber: 'PN123' }
        ]
    }

    onSearchRO() {
        return this.route.navigate(['/receivingmodule/receivingpages/app-ro']);
    }
}