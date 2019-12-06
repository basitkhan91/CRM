import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';



@Component({
    selector: 'app-sub-work-order',
    templateUrl: './work-order-subwo.component.html',
})
/** WorkOrderShipping component*/
export class SubWorkOrderComponent implements OnInit {
    issubWorkOrderState: Boolean = true;

    constructor(private router: Router) { }

    ngOnInit() {

    }


}