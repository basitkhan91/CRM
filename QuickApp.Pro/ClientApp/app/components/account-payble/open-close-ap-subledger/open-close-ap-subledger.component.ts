import { Component, OnInit } from '@angular/core';
import { AccountCalenderService } from '../../../services/account-calender/accountcalender.service';
import { ConstantPool } from '@angular/compiler';
import { AlertService } from '../../../services/alert.service';

@Component({
    selector: 'app-open-close-ap-subledger',
    templateUrl: './open-close-ap-subledger.component.html',
    styleUrls: ['./open-close-ap-subledger.component.scss']
})
/** open-close-ap-subledger component*/
export class OpenCloseApSubledgerComponent implements OnInit {
    /** open-close-ap-subledger ctor */
    calendarArray: any = {};
    finalCalendarArry: any = [];
    completeCalendarData: any[] = [];
    constructor(private calendarService: AccountCalenderService, private alertService:AlertService) {

    }
    //based on Ledger and fiscalyear and legal entity query////
    ngOnInit() {
        this.loadAccountCalendarData();
    }
    loadAccountCalendarData() {
        //debugger;
        this.calendarService.getAll().subscribe(data => {
            this.completeCalendarData = data[0];
            for (let i = 0; i < this.completeCalendarData.length; i++) {
                this.setFromDate(this.completeCalendarData[i]);
                this.seToDate(this.completeCalendarData[i]);
            }
            console.log(this.completeCalendarData);
        })
        
    }
    setFromDate(completeObj) {
        let fromDate = new Date(completeObj.fromDate);
        let todaysDate = new Date();
        let currentMonth = (1 + todaysDate.getMonth()).toString();
        let formatMonth = currentMonth.length > 1 ? currentMonth : '0' + currentMonth;
        var year = fromDate.getFullYear();
        let month = (1 + fromDate.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = fromDate.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        completeObj.fromDate = year + '-' + month + '-' + day;
        if (formatMonth == month) {
            completeObj.status = 1;
        }
        else if (formatMonth > month) {
            completeObj.status = 2;
        }
        else if (formatMonth < month) {
            completeObj.status = 4;
        }
    }
    seToDate(completeObj) {
        let fromDate = new Date(completeObj.toDate);
        var year = fromDate.getFullYear();
        var month = (1 + fromDate.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = fromDate.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        completeObj.toDate = year + '-' + month + '-' + day;
    }
    saveCalendar() {
        this.calendarService.add(this.calendarArray).subscribe(data => {
            this.alertService.showMessage('Calendar data updated successfully.');})
    }
    getDataBasedonYear(event) {
        this.finalCalendarArry = [];
        for (let i = 0; i < this.completeCalendarData.length; i++) {
            if (event == this.completeCalendarData[i].fiscalYear) {
                this.finalCalendarArry.push(this.completeCalendarData[i]);
            }
        }
        console.log(this.finalCalendarArry);
    }
}