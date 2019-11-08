import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigurationService } from './configuration.service';
import { EndpointFactory } from './endpoint-factory.service';

@Injectable()


// module Types : 
// Customer : 1
// Vendor : 2 
// Company or Legacy : 3 

export class CommonService {
    baseUrl = this.configurations.baseUrl
    constructor(private http: HttpClient, private configurations: ConfigurationService, private authService: EndpointFactory) { }

    smartDropDownList(tableName, primaryKeyColumn, labelColumn, count?) {

        return this.http.get<any>(`${this.baseUrl}/api/Common/binddropdowns?tableName=${tableName}&primaryColumn=${primaryKeyColumn}&textColumn=${labelColumn}&count=${count !== undefined ? count : 0}`, this.authService.getRequestHeaders())

    }
    createShipVia(object) {
        return this.http.post(`${this.baseUrl}/api/Common/createshipvia`, JSON.stringify(object), this.authService.getRequestHeaders())
    }

    getShipViaDetailsByModule(moduleId, referenceId) {
        return this.http.get(`${this.baseUrl}/api/Common/bindshipviadetails?userType=${moduleId}&referenceId=${referenceId}`, this.authService.getRequestHeaders())
    }
    getShipViaDetailsById(shipViaId) {
        return this.http.get<any>(`${this.baseUrl}/api/Common/shippingviadetails?shippingViaId=${shipViaId}`, this.authService.getRequestHeaders())

    }
    createAddress(object) {
        return this.http.post(`${this.baseUrl}/api/Common/createaddress`, JSON.stringify(object), this.authService.getRequestHeaders())
    }
    smartExcelFileUpload(file) {
        return this.http.post(`${this.baseUrl}/api/FileUpload/uploadcustomFile`, file)
        //this.http.post(`${this.configurations.baseUrl}${this.excelUpload}`, file)
    }
    getManagementStructureDetails(id) {
        return this.http.get<any>(`${this.baseUrl}/api/Common/managementstructure?manmgStrucId=${id}`, this.authService.getRequestHeaders())
    }

    getCustomerNameandCode(value){
        return this.http.get(`${this.baseUrl}/api/customer/customernameandcodes?value=${value}` , this.authService.getRequestHeaders())
    }

    getItemMasterDetails(){
        return this.http.get(`${this.baseUrl}/api/itemMaster/GetPartDetailsDropDown` , this.authService.getRequestHeaders())
    }





}