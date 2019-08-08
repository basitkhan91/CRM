import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatIcon } from '@angular/material';
import { Router } from '@angular/router';

import { fadeInOut } from '../../../../services/animations';

@Component({
    selector: 'app-ro',
    templateUrl: './ro.component.html',
    styleUrls: ['./ro.component.scss'],
    animations: [fadeInOut]
})

export class RoComponent implements OnInit {

    cols: any[];
    selectedColumns: any[];
    selectedColumn: any[];
    allPolistInfo: any[] = [];
    dataSource: MatTableDataSource<any>;
    paginator: MatPaginator;
    sort: MatSort;

    constructor(public _router: Router) {
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit(): void {
        this.cols = [
            { field: 'status', header: 'Status' },
            { field: 'noOfItems', header: '# of Items' },
            { field: 'purchaseOrderNumber', header: 'PO Number' },
            { field: 'currency', header: 'Currency' },
            { field: 'poTotalCost', header: 'PO Total Cost' },
            { field: 'vendorName', header: 'Vendor Name' },
            { field: 'vendorContact', header: 'Vendor Contact' },
            { field: 'employeeName', header: 'Employee Name' },
            { field: 'contactPhone', header: 'Contact Phone' },
            { field: 'dateRequested', header: 'Open Date' },
            { field: 'reference', header: 'Ref' },
            { field: 'requestedBy', header: 'Requested By' },
        ];
        this.selectedColumns = this.cols;
        this.allPolistInfo = [
            { status: 'Open', noOfItems: '10'},
            { status: 'Open', noOfItems: '1'},
            { status: 'Open', noOfItems: '7'},
            { status: 'Open', noOfItems: '8'},
            { status: 'Open', noOfItems: '5'},
            { status: 'Open', noOfItems: '2'},
            { status: 'Open', noOfItems: '6'},
            { status: 'Open', noOfItems: '1'},
        ];
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public getSelectedRow() {
            this._router.navigateByUrl('/receivingmodule/receivingpages/app-receiving-ro');
    }

    onCreateRO() {
        this._router.navigateByUrl('/vendorsmodule/vendorpages/app-create-ro');
    }
}