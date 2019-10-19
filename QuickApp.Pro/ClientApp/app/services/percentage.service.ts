
import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PercentageEndpoint } from './percentage-endpoint.service';
import { AuthService } from './auth.service';



@Injectable()
export class PercentageService {



    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private percentageEndpoint: PercentageEndpoint) { }

    getPercentageList() {
        return Observable.forkJoin(
            this.percentageEndpoint.getPercentageEndpoint<any[]>());
    }
}