import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigurationService } from './configuration.service';
import { EndpointFactory } from './endpoint-factory.service';

@Injectable()
export class CommonService {
    constructor(private http: HttpClient, private configurations: ConfigurationService, private authService: EndpointFactory) { }

    smartDropDownList(tableName, primaryKeyColumn, labelColumn, count?) {
        return this.http.get(`${this.configurations.baseUrl}/api/Common/binddropdowns?tableName=${tableName}&primaryColumn=${primaryKeyColumn}&textColumn=${labelColumn}&count=${count !== undefined ? count : 0}`, this.authService.getRequestHeaders())

    }
    createShipVia(object) {
        return this.http.post(`${this.configurations.baseUrl}/api/Common/createshipvia`, JSON.stringify(object), this.authService.getRequestHeaders())
    }

    smartAdressCreate(object, moduleid) {

    }

    //     postNewAddress<T>(object) {
    // 	let url = `${this.configurations.baseUrl}/api/Company/createvendorbillingaddress`
    // 	return this.http.post<T>(url, JSON.stringify(object), this.getRequestHeaders())
    // 		.catch(error => {
    // 			return this.handleError(error, () => this.postNewAddress(object));
    // 		});
    // } 




}