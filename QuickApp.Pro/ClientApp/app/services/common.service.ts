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

export class CommonService {
    baseUrl = this.configurations.baseUrl
    constructor(private http: HttpClient, private configurations: ConfigurationService, private authService: EndpointFactory) { }

    smartDropDownList(tableName, primaryKeyColumn, labelColumn, count?) {

        return this.http.get<any>(`${this.baseUrl}/api/Common/binddropdowns?tableName=${tableName}&primaryColumn=${primaryKeyColumn}&textColumn=${labelColumn}&count=${count !== undefined ? count : 0}`, this.authService.getRequestHeaders())

    }
    createShipVia(object) {
        return this.http.post<any>(`${this.baseUrl}/api/Common/createshipvia`, JSON.stringify(object), this.authService.getRequestHeaders())
    }

    getShipViaDetailsByModule(moduleId, referenceId) {
        return this.http.get<any>(`${this.baseUrl}/api/Common/bindshipviadetails?userType=${moduleId}&referenceId=${referenceId}`, this.authService.getRequestHeaders())
    }
    getShipViaDetailsById(shipViaId, userType) {
        return this.http.get<any>(`${this.baseUrl}/api/Common/shippingviadetails?shippingViaId=${shipViaId}&userType=${userType}`, this.authService.getRequestHeaders())

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

    getManagementStructureCodes(id) {
        return this.http.get<any>(`${this.baseUrl}/api/Common/managementstructurecodes?manmgStrucId=${id}`, this.authService.getRequestHeaders())
    }

    getCustomerNameandCode(value) {
        return this.http.get(`${this.baseUrl}/api/customer/customernameandcodes?value=${value}`, this.authService.getRequestHeaders())
    }

    getCustomerNameandCodeById(customerId) {
        return this.http.get(`${this.baseUrl}/api/Customer/customernameandcodesbyId?customerId=${customerId}`, this.authService.getRequestHeaders())
    }

    getCustomerContactsById(id) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/common/customercontacts?customerId=${id}`)
    }

    getReceiveCustomerPartDetailsById(id) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/ReceivingCustomerWork/receivecustomerpartdetails?itemMasterId=${id}`)
    }

    getItemMasterDetails() {
        return this.http.get(`${this.baseUrl}/api/itemMaster/GetPartDetailsDropDown`, this.authService.getRequestHeaders())
    }

    getRestrictedParts(moduleId, referenceId, partType) {
        return this.http.get<any>(`${this.baseUrl}/api/Common/getrestrictedparts?moduleId=${moduleId}&referenceId=${referenceId}&partType=${partType}`)
    }

    getDefaultCurrency(id) {
        return this.http.get<any>(`${this.baseUrl}/api/Common/defaultcurrency?legalEntityId=${id}`, this.authService.getRequestHeaders())
    }

    getClassificationMapping(id, moduleId) {
        return this.http.get<any>(`${this.baseUrl}/api/Common/classificationmappings?referenceId=${id}&moduleId=${moduleId}`, this.authService.getRequestHeaders())
    }

    getIntegrationMapping(id, moduleId) {
        return this.http.get<any>(`${this.baseUrl}/api/Common/integrationmappings?referenceId=${id}&moduleId=${moduleId}`, this.authService.getRequestHeaders())
    }

    getLegalEntityList() {
        return this.http.get<any>(`${this.baseUrl}/api/common/levelonedata`, this.authService.getRequestHeaders());
    }
    getBusinessUnitListByLegalEntityId(legalEntityId) {
        return this.http.get<any>(`${this.baseUrl}/api/common/leveltwodata?parentId=${legalEntityId}`, this.authService.getRequestHeaders());
    }
    getDivisionListByBU(businessUnitId) {
        return this.http.get<any>(`${this.baseUrl}/api/common/levelthreedata?parentId=${businessUnitId}`, this.authService.getRequestHeaders());
    }
    getDepartmentListByDivisionId(divisionId) {
        return this.http.get<any>(`${this.baseUrl}/api/common/levelfourdata?parentId=${divisionId}`, this.authService.getRequestHeaders());
    }

    getRestrictedPartsWithDesc(moduleId, referenceId, partType) {
        return this.http.get<any>(`${this.baseUrl}/api/Common/getrestrictedpartswithdesc?moduleId=${moduleId}&referenceId=${referenceId}&partType=${partType}`)
    }

    GetDocumentsList(referenceId, moduleId) {
        return this.http.get<any>(`${this.baseUrl}/api/FileUpload/getFileDocumentDetail/${referenceId}?moduleId=${moduleId}`, this.authService.getRequestHeaders())
    }

    GetAttachmentDeleteById(attachmentDetailId, updatedBy) {
        return this.http.delete(`${this.baseUrl}/api/FileUpload/AttachmentDelete/${attachmentDetailId}?updatedBy=${updatedBy}`, this.authService.getRequestHeaders())
    }

    uploadDocumentsEndpoint<T>(file: any): Observable<T> {
        const headers = new Headers({ 'Content-Type': 'multipart/form-data' });
        return this.http.post<T>(`${this.baseUrl}/api/FileUpload/commonDocumentUpload`, file);
    }

    toDownLoadFile(fileUrl) {
        const url = `${this.baseUrl}/api/FileUpload/downloadattachedfile?filePath=${fileUrl}`;
        window.location.assign(url);
    }

    getReceivingCustomers(value) {
        return this.http.get(`${this.baseUrl}/api/receivingcustomerwork/getreceivingcustomerslist?value=${value}`, this.authService.getRequestHeaders());
    }

    getJobTitles() {
        return this.http.get<any>(`${this.baseUrl}/api/common/jobtitletypes?masterCompanyId=1`, this.authService.getRequestHeaders());
    }

    getEmployeesByCategory(value) {
        return this.http.get<any>(`${this.baseUrl}/api/common/employeesbyjobtitle?jobTitleId=${value}`, this.authService.getRequestHeaders());
    }
    getExpertise() {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/common/expertisetypes?masterCompanyId=1 `, this.authService.getRequestHeaders());
    }
    getExpertiseEmployeesByCategory(value) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/common/employeesbyexpertise?expertiseId=${value}`, this.authService.getRequestHeaders());
    }

}