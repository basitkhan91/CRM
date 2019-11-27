import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
//import { AccountListingEndpointService } from './account-listing-endpoint.service';
import { map } from 'rxjs/operators';


@Injectable()
export class AccountListingService {

   
    constructor(private http: HttpClient) {

    }

   
    public getAll(): Observable<any> {
    	return this.http.get('dist/assets/data/accountlisting.json').pipe(map((response: any) => response)); 
        //return Observable.forkJoin(this.accountListEndpointservice.getData<any[]>());
    }

    
}