import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { fadeInOut } from '../../../services/animations';
import { AccountCalenderService } from '../../../services/account-calender/accountcalender.service';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { LegalEntityService } from '../../../services/legalentity.service';
import { AccountListingService } from '../../../services/account-listing/account-listing.service'

import { TableModule, Table } from 'primeng/table';

@Component({
    selector: 'app-accounting-listing-calendar',
    templateUrl: './accounting-listing-calendar.component.html',
    styleUrls: ['./accounting-listing-calendar.component.scss'],
    animations: [fadeInOut]
})
/** AccountingCalendar component*/
export class AccountingListingCalendarComponent implements OnInit {
    totalRecords: number = 0;
    totalPages: number = 0;
    headers = [
        { field: 'ledgerName', header: 'Ledger Name' },
        { field: 'ledgerDescription', header: 'Ledger Description' },
        { field: 'fiscalYear', header: 'Fiscal Year' },
        { field: 'startDate', header: 'Start Date' },       
        { field: 'endDate', header: 'End Date' },
        { field: 'noOfPeriod', header: 'Period' },
        { field: 'periodType', header: 'Period Type' }
    ]
    selectedColumns = this.headers;
    data: any;
    pageSize: number = 10;
    pageIndex: number = 0;
    first = 0;
    @ViewChild('dt')
    private table: Table;
    lazyLoadEventData: any;

    filterKeysByValue: object = {};

    constructor(private legalEntityservice: LegalEntityService,
        private route: ActivatedRoute,
        private router: Router,        
        private accountListingService: AccountListingService,
        private calendarService: AccountCalenderService,
        private authService: AuthService,
        private alertService: AlertService) {
        
    }
   
    ngOnInit() {
       
    }

    getCalendarData(data: any) {
        
        this.calendarService.getCalendarListData().subscribe(
            datalist => {
                var calendarData = datalist[0]['accountList'];   
                if (data && data.sortField) {
                    if (data.sortOrder == -1)
                        calendarData = this.sortCalendarData(calendarData, data.sortField, false);
                }
                this.data = calendarData;                
                if (calendarData.length > 0) {
                    this.totalRecords = calendarData.filter(items => items).length;
                    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
                }
            },
            error => {
                console.log('error in getting information')
            }
        );
    }

    sortCalendarData(array, key, descendingOrder = true) {
        if (key == 'glAccountId' || key == 'fiscalYear' || key == 'noOfPeriod') {
            return this.calendarService.sortBy(array, {
                prop: key,
                desc: descendingOrder
            });
        } else if (key == 'startDate' || key == 'endDate') {
            return this.calendarService.sortBy(array, {
                prop: key,
                desc: descendingOrder,
                parser: function (item) {
                    return new Date(item);
                }
            });
        } else {
            return this.calendarService.sortBy(array, {
                prop: key,
                desc: descendingOrder,
                parser: function (item) {
                    return item.toLowerCase();
                }
            });
        }
    }

    loadCalendarList(event) {
        this.lazyLoadEventData = event;
        const pageIndex = parseInt(event.first) / event.rows;;
        this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        event.first = pageIndex;
        this.getCalendarData(event)
        console.log(event);
    }

    editCalendarData(data) {
        this.calendarService.emitCalendarDetails(data);        
        this.router.navigate(['/generalledgermodule/generalledgerpage/app-accounting-calendar']);
        //const params = JSON.stringify(data)
        //this.router.navigate(['/generalledgermodule/generalledgerpage/app-accounting-calendar'], { queryParams: { calendarSelectedData: params}, skipLocationChange: true, replaceUrl: false });        
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    ngOnDestroy() {
        
    }
}