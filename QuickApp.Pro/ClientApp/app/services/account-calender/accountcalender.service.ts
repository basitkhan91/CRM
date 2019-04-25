
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { AccountCalenderEndpointService } from './accountcalender-endpoint.service';



@Injectable()
export class AccountCalenderService {

   
    constructor(private calendarEndpointService: AccountCalenderEndpointService) {
    }

   
    add(calendarObj: any) {
        return this.calendarEndpointService.addCalendar<any>(calendarObj);
    }

    
}