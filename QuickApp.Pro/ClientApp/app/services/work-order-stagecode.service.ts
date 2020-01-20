import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigurationService } from './configuration.service';
import { EndpointFactory } from './endpoint-factory.service';

@Injectable()


// module Types : 
// Customer : 1
// Vendor : 2 
// Company or Legacy : 3 

export class StageService {
    baseUrl = this.configurations.baseUrl
    constructor(private http: HttpClient, private configurations: ConfigurationService, private authService: EndpointFactory) { }


    getWorkOrderStageList() {
        return this.http.get<any>(`${this.baseUrl}/api/workOrderStage/workorderstagelist`, this.authService.getRequestHeaders())

    }
    createShipVia(object) {
        return this.http.post<any>(`${this.baseUrl}/api/Common/createshipvia`, JSON.stringify(object), this.authService.getRequestHeaders())
    }
    

}