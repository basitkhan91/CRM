import { Component } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { AccountCalenderService } from '../../../services/account-calender/accountcalender.service';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-accounting-calendar',
    templateUrl: './accounting-calendar.component.html',
    styleUrls: ['./accounting-calendar.component.scss'],
    animations: [fadeInOut]
})
/** AccountingCalendar component*/
export class AccountingCalendarComponent {
    /** AccountingCalendar ctor */
    calendarArray: any[] = [];
    currentCalendarObj: any = {};
    selectedPeriod: any;
    showTable: boolean;
    showCheckBox: boolean = false;
    showManual: boolean = false;
    period: number = 1;
    selectedName: any;
    constructor(private calendarService: AccountCalenderService, private authService:AuthService) {
     
    }

    setSelectedAttribute(value) {
        this.selectedPeriod = value;
    }


    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    loaddefualtObj(selectedMonth) {
        if (this.selectedPeriod == '12' || this.selectedPeriod == '13') {
            this.showManual = false;
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "ADJ-PD"];
            if (this.period <= 3) {
                this.currentCalendarObj.quarter = 1;
            }
            if (this.period >= 4 && this.period <= 6) {
                this.currentCalendarObj.quarter = 2;
            }
            if (this.period >= 7 && this.period <= 9) {
                this.currentCalendarObj.quarter = 3;
            }
            if (this.period >= 10 && this.period <= 13) {
                this.currentCalendarObj.quarter = 4;
            }
            
             let defualtCalendarObj = {
                fiscalName: months[selectedMonth],
                fiscalYear: this.currentCalendarObj.fiscalYear,
                period: this.period,
                quater: this.currentCalendarObj.quarter,
                fromDate: this.currentCalendarObj.fromDate,
                toDate: this.currentCalendarObj.toDate,
                periodName: months[selectedMonth] + ' ' + this.currentCalendarObj.fiscalYear,
                name: this.currentCalendarObj.name,
                description: this.currentCalendarObj.description,
                createdBy: this.userName,
                updatedBy: this.userName,
            }
            this.period++;
            return defualtCalendarObj;
        }
        else if (this.selectedPeriod == '16') {
            this.showManual = false;
            var monthData = ["Jan", "Feb", "Mar", "ADJ-PD-Jan-Mar", "Apr", "May", "Jun", "ADJ-PD-Apr-Jun", "Jul", "Aug", "Sep", "ADJ-PD-Jul-Sep", "Oct", "Nov", "Dec", "ADJ-PD-Oct-Dec"];
            if (this.period <= 4) {
                this.currentCalendarObj.quarter = 1;
            }
            if (this.period >= 5 && this.period <= 8) {
                this.currentCalendarObj.quarter = 2;
            }
            if (this.period >= 9 && this.period <= 12) {
                this.currentCalendarObj.quarter = 3;
            }
            if (this.period >= 13 && this.period <= 16) {
                this.currentCalendarObj.quarter = 4;
            }
            let defualtCalendarObj = {
                fiscalName: monthData[this.period],
                fiscalYear: this.currentCalendarObj.fiscalYear,
                period: this.period,
                quater: this.currentCalendarObj.quarter,
                fromDate: this.currentCalendarObj.fromDate,
                toDate: this.currentCalendarObj.toDate,
                periodName: monthData[this.period] + ' - ' + this.currentCalendarObj.fiscalYear,
                name: this.currentCalendarObj.name,
                description: this.currentCalendarObj.description,
                createdBy: this.userName,
                updatedBy: this.userName,

            }
            this.period++;
            return defualtCalendarObj;
        }
        else {
           
            this.showManual = true;
            var months = ["Select","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var qtr = [1, 2, 3,4,5,6,7,8,9,10,11,12];
            //this.period = 1;
            let defualtCalendarObj = {
                fiscalNameData: months,
                fiscalYear: this.currentCalendarObj.fiscalYear,
                period: this.period,
                quaterData: qtr,
                fromDate: this.currentCalendarObj.fromDate,
                toDate: this.currentCalendarObj.toDate,
                periodName: '',
                name: this.currentCalendarObj.name,
                description: this.currentCalendarObj.description,
                createdBy: this.userName,
                updatedBy: this.userName,
            }
            
            return defualtCalendarObj;
        }
        
    }
    addCalendar() {
        this.showTable = true;
        this.calendarArray = [];
        var date = new Date(this.currentCalendarObj.fromDate);
        var month = date.getMonth();
        
        if (this.selectedPeriod == 12) {
            this.period = 1;
            
            for (let i = 0; i < this.selectedPeriod; i++) {
                this.calendarArray.push(this.loaddefualtObj(month));
                month++;
                if (month == 12) {
                    month = 0;
                }
            }

        }
        if (this.selectedPeriod == 13) {
            this.period = 1;
            this.showCheckBox = true;
            for (let i = 0; i < this.selectedPeriod; i++) {
                this.calendarArray.push(this.loaddefualtObj(this.selectedPeriod));
            }
        }
        if (this.selectedPeriod == 16) {
            this.period = 1;
            this.showCheckBox = true;
            for (let i = 0; i < this.selectedPeriod; i++) {
                this.calendarArray.push(this.loaddefualtObj(this.selectedPeriod));
            }
        }
        if (this.selectedPeriod == 'Manual') {
            this.period = 1;
            this.calendarArray.push(this.loaddefualtObj(this.selectedPeriod));
        }
    }
    saveCalendar() {
        this.calendarService.add(this.calendarArray).subscribe(data => { })
    }
    addPeriodName(obj, selectedName) {
        //debugger;
        obj["periodName"] = selectedName + ' - ' + obj.fiscalYear
    }
    addPeriod() {
        this.period++;
        this.calendarArray.push(this.loaddefualtObj(this.selectedPeriod));
    }
}