﻿
import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { CompanyEndpoint } from './company-endpoint.service';
import { Company } from '../models/company.model';


@Injectable()
export class CompanyService {

    constructor(
        private router: Router,
        private http: HttpClient,
        private companyEndpoint: CompanyEndpoint) {

    }

    getCompanyById(companyId: number) {
        return Observable.forkJoin(
            this.companyEndpoint.getCustomerEndpoint<Company>(companyId));
    }
}