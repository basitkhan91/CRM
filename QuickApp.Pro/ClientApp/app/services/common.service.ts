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


    // http://localhost:5050/api/Common/binddropdowns?tableName=AircraftType&primaryColumn=AircraftTypeId&textColumn=Description

}