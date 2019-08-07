import { Component, OnInit } from '@angular/core';

import { RepairOrder, DropDownData } from './RepairOrder.model';

@Component({
    selector: 'app-receiving-ro',
    templateUrl: './receiving-ro.component.html',
    styleUrls: ['./receiving-ro.component.scss']
})

export class ReceivingRoComponent implements OnInit {
    repairOrderData: RepairOrder;
    roCompanyList: DropDownData[];
    roBusinessUnitList: DropDownData[];
    roDepartmentList: DropDownData[];
    roPriorityInfo: DropDownData[];
    roCreditTermInfo: DropDownData[];
    roDivisionList: DropDownData[];

    constructor() {

    }

    ngOnInit() {
        
    }
}