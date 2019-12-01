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
   private readonly updateGlAccountUrl: string = "/api/GlAccount/update";
   private readonly editGlAccountUrl: string = "/api/GlAccount/getById";
   private readonly getGlAccountUrl: string = "/api/GlAccount/getAllGLAccount";

   get createGlAccountUri() { return this.configurations.baseUrl + this.createGlAccountUrl; }
   get updateGlAccountUri() { return this.configurations.baseUrl + this.updateGlAccountUrl; }
   get editGlAccountUri() { return this.configurations.baseUrl + this.editGlAccountUrl; }
   get getGlAccountUri() { return this.configurations.baseUrl + this.getGlAccountUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

   
    public getAll(): Observable<any> {
        //return this.http.get('dist/assets/data/accountlisting.json').pipe(map((response: any) => response)); 
    	return this.http.get(`${this.getGlAccountUri}`).pipe(map((response: any) => response)); 
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

    updateGlAccount(data: any): Observable<any> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        return this.http.post(this.updateGlAccountUri, body, this.getRequestHeaders())
            .map((response: HttpResponseBase) => {
                return <any>response;

            }).catch((error: HttpErrorResponse ) => Observable.throw(error));
    }

    public editGlAccountById(accountId): Observable<any> {
        //return this.http.get('dist/assets/data/accountlisting.json').pipe(map((response: any) => response)); 
        return this.http.get(`${this.editGlAccountUri}/${accountId}`).pipe(map((response: any) => response)); 
        //return Observable.forkJoin(this.accountListEndpointservice.getData<any[]>());
    }

    
}