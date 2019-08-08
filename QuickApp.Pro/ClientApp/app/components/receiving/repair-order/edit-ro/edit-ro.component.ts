import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-edit-ro',
    templateUrl: './edit-ro.component.html',
    styleUrls: ['./edit-ro.component.scss']
})

export class EditRoComponent implements OnInit {
    toggle_ero_header: boolean = false;
    memoNotes: string;
    localData: any[];
    obtainfromcustomer: boolean = false;
    obtainfromother: boolean = false;
    obtainfromvendor: boolean = false;
    ownercustomer: boolean = false;
    ownerother: boolean = false;
    ownervendor: boolean = false;
    traceabletocustomer: boolean = false;
    traceabletoother: boolean = false;
    traceabletovendor: boolean = false;
    rroEditPF: boolean = true; //remove once add dynamic content
    rroEditCF: boolean = true; //remove once add dynamic content

    constructor(public route: Router) {
        
    }

    ngOnInit() {
        //TODO: Remove once we load dynamic content
        this.localData = [
            { partNumber: 'PN123' }
        ]
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

    //remove once add dynamic content
    onEditParentGridFields() {
        this.rroEditPF = false;
    }
    //remove once add dynamic content
    onEditChildGridFields() {
        this.rroEditCF = false;
    }
    //remove once add dynamic content
    onEditGridFields() {
        this.rroEditPF = false;
        this.rroEditCF = false;
    }

    onSubmit() {
        return this.route.navigate(['/receivingmodule/receivingpages/app-view-ro']);
    }
}