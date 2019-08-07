import { Component, OnInit } from '@angular/core';

import { RepairOrder, DropDownData } from './RepairOrder.model';
import { ManufacturerService } from '../../../../services/manufacturer.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../services/alert.service';

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
    poStatus: DropDownData[] = [];
    poUserType: DropDownData[] = [];
    ConditionList: DropDownData[] = [];
    ManufacturerList: DropDownData[] = [];

    toggleIcon: boolean = false;
    toggleAddDetails: boolean = false;
    isDisabledTLboxes: boolean = false;

    obtainfromcustomer: boolean = false;
    obtainfromother: boolean = false;
    obtainfromvendor: boolean = false;
    ownercustomer: boolean = false;
    ownerother: boolean = false;
    ownervendor: boolean = false;
    traceabletocustomer: boolean = false;
    traceabletoother: boolean = false;
    traceabletovendor: boolean = false;
    memoPopupText: string;
    memoNotes: string = 'This is Repair Order memo of Vendor named Albert Einstein.'; //TODO: remove dummy content later

    constructor(public manufacturerService: ManufacturerService,
                public alertService: AlertService,
                public route: Router) {
        this.getConditionList();
        this.getManufacturers();
    }

    ngOnInit() {
        this.poStatus = [];
        this.getStatus();
        //this.memoPopupText = this.memoNotes;
    }

    getStatus() {
        this.poStatus = [];
        this.poStatus.push(<DropDownData>{ Key: '1', Value: 'Open' });
        this.poStatus.push(<DropDownData>{ Key: '2', Value: 'Pending Approval' });
        this.poStatus.push(<DropDownData>{ Key: '3', Value: 'Approved' });
        this.poStatus.push(<DropDownData>{ Key: '4', Value: 'Rejected' });
        this.poStatus.push(<DropDownData>{ Key: '5', Value: 'Fulfilled' });

        this.poUserType = [];
        this.poUserType.push(<DropDownData>{ Key: '1', Value: 'Customer' });
        this.poUserType.push(<DropDownData>{ Key: '2', Value: 'Vendor' });
        this.poUserType.push(<DropDownData>{ Key: '3', Value: 'Company' });
    }

    toggleExpandIcon() {
        this.toggleIcon = !this.toggleIcon;
    }

    addStockLine() {
        this.toggleAddDetails = !this.toggleAddDetails;
    }

    getConditionList() {
        this.ConditionList.push(<DropDownData>{ Key: '1', Value: 'New' });
        this.ConditionList.push(<DropDownData>{ Key: '1', Value: 'Replace' });
        this.ConditionList.push(<DropDownData>{ Key: '1', Value: 'Servicable' });
    }

    getManufacturers() {
        this.ManufacturerList = [];
        this.manufacturerService.getManufacturers().subscribe(
            results => {
                for (let manufacturer of results[0]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = manufacturer.manufacturerId.toLocaleString();
                    dropdown.Value = manufacturer.name;
                    this.ManufacturerList.push(dropdown);
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    onChangeTimeLife() {
        this.isDisabledTLboxes = !this.isDisabledTLboxes;
    }

    onDataLoadFailed(error: any): void {
        console.log(error);
        this.alertService.stopLoadingMessage();
    }

    onObtainFromChange(event) {
        if (event.target.value === '1') {
            this.obtainfromcustomer = true;
            this.obtainfromother = false;
            this.obtainfromvendor = false;
        }
        if (event.target.value === '2') {
            this.obtainfromother = true;
            this.obtainfromcustomer = false;
            this.obtainfromvendor = false;
        }
        if (event.target.value === '3') {
            this.obtainfromvendor = true;
            this.obtainfromcustomer = false;
            this.obtainfromother = false;
        }
    }

    onOwnerChange(event) {
        if (event.target.value === '1') {
            this.ownercustomer = true;
            this.ownerother = false;
            this.ownervendor = false;
        }
        if (event.target.value === '2') {
            this.ownerother = true;
            this.ownercustomer = false;
            this.ownervendor = false;
        }
        if (event.target.value === '3') {
            this.ownervendor = true;
            this.ownercustomer = false;
            this.ownerother = false;
        }
    }

    onTraceableToChange(event) {
        if (event.target.value === '1') {
            this.traceabletocustomer = true;
            this.traceabletoother = false;
            this.traceabletovendor = false;
        }
        if (event.target.value === '2') {
            this.traceabletoother = true;
            this.traceabletocustomer = false;
            this.traceabletovendor = false;
        }
        if (event.target.value === '3') {
            this.traceabletovendor = true;
            this.traceabletocustomer = false;
            this.traceabletoother = false;
        }
    }

    addPageCustomer() {
        this.route.navigateByUrl('/customersmodule/customerpages/app-customer-general-information');
    }

    onSubmitToReceive() {
        return this.route.navigate(['/receivingmodule/receivingpages/app-edit-ro']);
    }

    onAddMemoToPopup() {
        this.memoPopupText = this.memoNotes;
    }

    onSaveMemo() {
        this.memoNotes = this.memoPopupText;
    }
}