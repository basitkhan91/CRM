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
        
        let defualtCalendarObj = {
            calendarType: '',
            year: this.currentCalendarObj.fiscalYear,
            period:this.period,
            fromDate: this.currentCalendarObj.fromDate,
            toDate: this.currentCalendarObj.toDate,
            periodName: this.currentCalendarObj.calendarName
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