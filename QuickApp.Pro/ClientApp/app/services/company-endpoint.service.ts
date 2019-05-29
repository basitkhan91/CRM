
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';
    
@Injectable()
export class CompanyEndpoint extends EndpointFactory {

    private readonly _getCompany: string = "/api/company/get";
    
    get getCompanyUrl() { return this.configurations.baseUrl + this._getCompany; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getCustomerEndpoint<T>(companyid: number): Observable<T> {

        return this.http.get<T>(this.getCompanyUrl + '/' + companyid, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCustomerEndpoint(companyid));
            });
    }
    
}




