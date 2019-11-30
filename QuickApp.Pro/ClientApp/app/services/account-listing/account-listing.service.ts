import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
//import { AccountListingEndpointService } from './account-listing-endpoint.service';
import { map } from 'rxjs/operators';
import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';


@Injectable()
export class AccountListingService extends EndpointFactory {

   private readonly createGlAccountUrl: string = "/api/GlAccount/add";

   get createGlAccountUri() { return this.configurations.baseUrl + this.createGlAccountUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

   
    public getAll(): Observable<any> {
    	return this.http.get('dist/assets/data/accountlisting.json').pipe(map((response: any) => response)); 
        //return Observable.forkJoin(this.accountListEndpointservice.getData<any[]>());
    }


    createGlAccount(data: any): Observable<any> {
    	let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        return this.http.post(this.createGlAccountUri, body, this.getRequestHeaders())
            .map((response: HttpResponseBase) => {
                return <any>response;

            }).catch((error: HttpErrorResponse ) => Observable.throw(error));
    }

    
}