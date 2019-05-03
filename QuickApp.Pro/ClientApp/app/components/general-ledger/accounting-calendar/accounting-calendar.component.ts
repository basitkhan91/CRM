﻿import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { AccountCalenderService } from '../../../services/account-calender/accountcalender.service';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';

@Component({
    selector: 'app-accounting-calendar',
    templateUrl: './accounting-calendar.component.html',
    styleUrls: ['./accounting-calendar.component.scss'],
    animations: [fadeInOut]
})
/** AccountingCalendar component*/
export class AccountingCalendarComponent implements OnInit {
    /** AccountingCalendar ctor */
    calendarArray: any[] = [];
    currentCalendarObj: any = {};
    selectedPeriod: any;
    showTable: boolean;
    showCheckBox: boolean = false;
    showManual: boolean = false;
    period: number = 1;
    selectedName: any;
    display: boolean = false; //prime ng Model
    showCalendarMonths: boolean;
    showFiscal: boolean;
    showDefualt: boolean = true;
    completeCalendarData: any[] = [];
    isBoolean: boolean = false;
    public minDate: Date = new Date();
    constructor(private calendarService: AccountCalenderService, private authService: AuthService, private alertService:AlertService) {
     
    }
    //add Legal Entity///
    ngOnInit() {
        this.calendarService.getAll().subscribe(data => {
            this.completeCalendarData = data[0];
         
        })
    }
    setSelectedAttribute(value) {
        this.selectedPeriod = value;
    }


    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    

    loaddefualtObj(selectedMonth) {
        
        if (selectedMonth == 0) {
             this.isBoolean = true;
        }
        if (this.selectedPeriod == '12' || this.selectedPeriod == '13') {
            this.showManual = false;
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
            if (this.calendarArray.length <= 11) {
                let month = selectedMonth + 1;
                if (month <= 9) {
                    if (this.isBoolean) {
                        var fiscalYear = Number(this.currentCalendarObj.fiscalYear) + 1;
                    }
                    else {
                        var fiscalYear = Number(this.currentCalendarObj.fiscalYear);
                    }
                    var fromdate = fiscalYear + '-' + '0' + month + '-' + '01';
                    var date = new Date(fromdate);
                    if (this.isBoolean) {
                        var year = date.getFullYear() + 1;
                    }
                    else {
                        var year = date.getFullYear();
                    }
                    var year = date.getFullYear();
                    var lastmonth = date.getMonth();
                    var lastday = new Date(year, lastmonth + 1, 0).getDate();
                    var toDate = year + '-' + '0' + month + '-' + lastday;

                }
                else {
                    var fromdate = this.currentCalendarObj.fiscalYear + '-' + month + '-' + '01';
                    var date = new Date(fromdate);
                    var year = date.getFullYear();
                    var lastmonth = date.getMonth();
                    var lastday = new Date(year, lastmonth + 1, 0).getDate();
                    var toDate = year + '-' + month + '-' + lastday;
                }

                let defualtCalendarObj = {

                    fiscalName: months[selectedMonth],
                    fiscalYear: this.currentCalendarObj.fiscalYear,
                    period: this.period,
                    quater: this.currentCalendarObj.quarter,
                    fromDate: fromdate,
                    toDate: toDate,
                    periodName: months[selectedMonth] + ' ' + this.currentCalendarObj.fiscalYear,
                    name: this.currentCalendarObj.name,
                    description: this.currentCalendarObj.description,
                    createdBy: this.userName,
                    updatedBy: this.userName,
                }
                this.period++;
                return defualtCalendarObj;
            }
            else {
                let month = selectedMonth + 1;
                if (month <= 9) {

                    var fromdate = this.currentCalendarObj.fiscalYear + '-' + '0' + month + '-' + '01';
                    var date = new Date(fromdate);
                    var year = date.getFullYear();
                    var lastmonth = date.getMonth();
                    var lastday = new Date(year, lastmonth + 1, 0).getDate();
                    var toDate = year + '-' + '0' + month + '-' + lastday;

                }
                else {
                    var fromdate = this.currentCalendarObj.fiscalYear + '-' + month + '-' + '01';
                    var date = new Date(fromdate);
                    var year = date.getFullYear();
                    var lastmonth = date.getMonth();
                    var lastday = new Date(year, lastmonth + 1, 0).getDate();
                    var toDate = year + '-' + month + '-' + lastday;
                }

                let defualtCalendarObj = {

                    fiscalName: 'ADJ - PD ',
                    fiscalYear: this.currentCalendarObj.fiscalYear,
                    period: this.period,
                    quater: this.currentCalendarObj.quarter,
                    fromDate: this.calendarArray[11].toDate,
                    toDate: this.calendarArray[11].toDate,
                    periodName: 'ADJ - PD -' + ' ' + this.currentCalendarObj.fiscalYear,
                    name: this.currentCalendarObj.name,
                    description: this.currentCalendarObj.description,
                    createdBy: this.userName,
                    updatedBy: this.userName,
                    adjusting: 'yes'
                }
                this.period++;
                return defualtCalendarObj;
            }
        }
        else if (this.selectedPeriod == '16') {
            
            this.showManual = false;
            var monthData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
            let month = selectedMonth + 1;
            if (month <= 9) {
                if (this.isBoolean) {
                    var fiscalYear = Number(this.currentCalendarObj.fiscalYear) + 1;
                }
                else {
                    var fiscalYear = Number(this.currentCalendarObj.fiscalYear);
                }
                var fromdate = fiscalYear + '-' + '0' + month + '-' + '01';
                var date = new Date(fromdate);
                if (this.isBoolean) {
                    var year = date.getFullYear() + 1;
                }
                else {
                    var year = date.getFullYear();
                }
                var year = date.getFullYear();
                var lastmonth = date.getMonth();
                var lastday = new Date(year, lastmonth + 1, 0).getDate();
                var toDate = year + '-' + '0' + month + '-' + lastday;

            }
            else {
                var fromdate = this.currentCalendarObj.fiscalYear + '-' + month + '-' + '01';
                var date = new Date(fromdate);
                var year = date.getFullYear();
                var lastmonth = date.getMonth();
                var lastday = new Date(year, lastmonth + 1, 0).getDate();
                var toDate = year + '-' + month + '-' + lastday;
            }

            if (this.calendarArray.length == 3) {
                var fiscalName = 'ADJ - PD -' + this.calendarArray[0].fiscalName + '-' + this.calendarArray[2].fiscalName;
                let defualtCalendarObj = {
                    fiscalName: fiscalName,
                    fiscalYear: this.currentCalendarObj.fiscalYear,
                    period: this.period,
                    quater: this.currentCalendarObj.quarter,
                    fromDate: toDate,
                    toDate: toDate,
                    periodName: fiscalName + ' - ' + this.currentCalendarObj.fiscalYear,
                    name: this.currentCalendarObj.name,
                    description: this.currentCalendarObj.description,
                    createdBy: this.userName,
                    updatedBy: this.userName,
                    adjusting:'yes'

                }
                this.period++;
                
                return defualtCalendarObj;
            }
            else if (this.calendarArray.length == 7) {
                var fiscalName = 'ADJ - PD -' + this.calendarArray[4].fiscalName + '-' + this.calendarArray[6].fiscalName;
                let defualtCalendarObj = {
                    fiscalName: fiscalName,
                    fiscalYear: this.currentCalendarObj.fiscalYear,
                    period: this.period,
                    quater: this.currentCalendarObj.quarter,
                    fromDate: toDate,
                    toDate: toDate,
                    periodName: fiscalName + ' - ' + this.currentCalendarObj.fiscalYear,
                    name: this.currentCalendarObj.name,
                    description: this.currentCalendarObj.description,
                    createdBy: this.userName,
                    updatedBy: this.userName,
                    adjusting: 'yes'

                }
                this.period++;
                return defualtCalendarObj;
            }
            else if (this.calendarArray.length == 11) {
                var fiscalName = 'ADJ - PD -' + this.calendarArray[8].fiscalName + '-' + this.calendarArray[10].fiscalName;
                let defualtCalendarObj = {
                    fiscalName: fiscalName,
                    fiscalYear: this.currentCalendarObj.fiscalYear,
                    period: this.period,
                    quater: this.currentCalendarObj.quarter,
                    fromDate: toDate,
                    toDate: toDate,
                    periodName: fiscalName + ' - ' + this.currentCalendarObj.fiscalYear,
                    name: this.currentCalendarObj.name,
                    description: this.currentCalendarObj.description,
                    createdBy: this.userName,
                    updatedBy: this.userName,
                    adjusting: 'yes'

                }
                this.period++;
                return defualtCalendarObj;
            }
            else if (this.calendarArray.length == 15) {
                var fiscalName = 'ADJ - PD -' + this.calendarArray[12].fiscalName + '-' + this.calendarArray[14].fiscalName;
                let defualtCalendarObj = {
                    fiscalName: fiscalName,
                    fiscalYear: this.currentCalendarObj.fiscalYear,
                    period: this.period,
                    quater: this.currentCalendarObj.quarter,
                    fromDate: this.calendarArray[14].toDate,
                    toDate: this.calendarArray[14].toDate,
                    periodName: fiscalName+ ' - ' + this.currentCalendarObj.fiscalYear,
                    name: this.currentCalendarObj.name,
                    description: this.currentCalendarObj.description,
                    createdBy: this.userName,
                    updatedBy: this.userName,
                    adjusting: 'yes'

                }
                this.period++;
                return defualtCalendarObj;
            }
            else {
                let defualtCalendarObj = {
                    fiscalName: monthData[selectedMonth],
                    fiscalYear: this.currentCalendarObj.fiscalYear,
                    period: this.period,
                    quater: this.currentCalendarObj.quarter,
                    fromDate: fromdate,
                    toDate: toDate,
                    periodName: monthData[selectedMonth] + ' - ' + this.currentCalendarObj.fiscalYear,
                    name: this.currentCalendarObj.name,
                    description: this.currentCalendarObj.description,
                    createdBy: this.userName,
                    updatedBy: this.userName,

                }
                this.period++;
                return defualtCalendarObj;
            }
        }
        else {
           
            this.showManual = true;
            var months = ["Select","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var qtr = [1, 2, 3,4,5,6,7,8,9,10,11,12];
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
        this.isBoolean = false;
        if (!(this.currentCalendarObj.name && this.currentCalendarObj.description && this.currentCalendarObj.fiscalYear && this.currentCalendarObj.fromDate && this.currentCalendarObj.toDate && this.currentCalendarObj.periodType && this.currentCalendarObj.fiscalYear
            && this.currentCalendarObj.noOfPeriods)) {
            this.display = true;
        }
        if (!this.display) {
            this.calendarArray = [];
            var date2 = new Date(this.currentCalendarObj.fromDate);
            var date1 = new Date(this.currentCalendarObj.toDate);
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (dayDifference == 365 || dayDifference==364) {
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
                        this.calendarArray.push(this.loaddefualtObj(month));
                        month++;
                        if (month == 12) {
                            month = 0;
                        }
                    }
                }
                if (this.selectedPeriod == 16) {
                    this.period = 1;
                    this.showCheckBox = true;

                    for (let i = 0; i < this.selectedPeriod; i++) {
                        if (this.calendarArray.length == 3) {
                            month = month - 1;
                        }
                        if (this.calendarArray.length == 7) {
                            month = month - 1;
                        }
                        if (this.calendarArray.length == 11) {
                            month = month - 1;
                        }
                        this.calendarArray.push(this.loaddefualtObj(month));
                        month++;
                        if (month == 12) {
                            month = 0;
                        }

                    }
                }
                if (this.selectedPeriod == 'Manual') {
                    this.period = 1;
                    this.calendarArray.push(this.loaddefualtObj(this.selectedPeriod));
                }
            }
            else {
                alert("Please select valid start date and end date");
            }
        }
        else {

        }
    }
    saveCalendar() {
        let date = new Date(this.currentCalendarObj.fromDate);
        let year = date.getFullYear();
        let addDetails = false;
        if (this.completeCalendarData.length > 0) {
            for (let i = 0; i < this.completeCalendarData.length; i++) {
                if (year == this.completeCalendarData[i].fiscalYear) {
                    addDetails = true;
                    alert("We already have data with this Calendar Year");
                    break;
                   
                }
                if (!addDetails) {
                    this.calendarService.add(this.calendarArray).subscribe(data => {
                        this.alertService.showMessage('Calendar data added successfully.');

                    })
                }
            }
        }
        else {
            this.calendarService.add(this.calendarArray).subscribe(data => {
                this.alertService.showMessage('Calendar data added successfully.');

            })
        }
       
    }
    addPeriodName(obj, selectedName) {
        //debugger;
        obj["periodName"] = selectedName + ' - ' + obj.fiscalYear
    }
    addPeriod() {
        this.period++;
        this.calendarArray.push(this.loaddefualtObj(this.selectedPeriod));
    }
    showNumofPeriods(event) {
       // debugger;
        if (event == 'Calendar Months') {
            this.showFiscal = false;
            this.showCalendarMonths = true;
            this.showDefualt = false;
        }
        else if (event == 'Fiscal Month') {
            this.showCalendarMonths = false;
            this.showFiscal = true;
            this.showDefualt = false;
        }
        else if (event == 'Select') {
            this.showDefualt = true;
            this.showCalendarMonths = false;
            this.showFiscal = false;
        }
    }
}