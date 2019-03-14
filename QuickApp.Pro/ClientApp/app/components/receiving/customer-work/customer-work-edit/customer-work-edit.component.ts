import { Component } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { PageHeaderComponent } from '../../../../shared/page-header.component';
import * as $ from 'jquery';

@Component({
    selector: 'app-customer-work-edit',
    templateUrl: './customer-work-edit.component.html',
    styleUrls: ['./customer-work-edit.component.scss'],
    animations: [fadeInOut]
})

export class CustomerWorkEditComponent {
   
    constructor() {
        

       
    }
}