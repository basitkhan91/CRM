import { Component } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { PageHeaderComponent } from '../../../shared/page-header.component';
import * as $ from 'jquery';
import { forEach } from '@angular/router/src/utils/collection';

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
    period: number=1;
    constructor() {
     
    }

    setSelectedAttribute(value) {
        this.selectedPeriod = value;
        
        
    }
    loaddefualtObj(selectedPeriod) {
        var months = ["", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        if (this.period<=3) {
            this.currentCalendarObj.quarter = 1;
        }
        if (this.period >= 4 && this.period<=6) {
            this.currentCalendarObj.quarter = 2;
        }
        if (this.period >= 7 && this.period <= 9) {
            this.currentCalendarObj.quarter = 3;
        }
        if (this.period >= 10 && this.period <= 12) {
            this.currentCalendarObj.quarter = 4;
        }
        let defualtCalendarObj = {
            calendarType: months[this.period],
            fiscalYear: this.currentCalendarObj.fiscalYear,
            period: this.period,
            quarter:this.currentCalendarObj.quarter,
            fromDate: this.currentCalendarObj.fromDate,
            toDate: this.currentCalendarObj.toDate,
            periodName: months[this.period] + ' ' + this.currentCalendarObj.fiscalYear
        }
        this.period++;
        return defualtCalendarObj;
    }
    addCalendar() {
        this.showTable = true;
        debugger;
        
        if (this.selectedPeriod == 12) {
            for (let i = 0; i < this.selectedPeriod; i++) {
                this.calendarArray.push(this.loaddefualtObj(this.selectedPeriod));
            }

        }
    }
}