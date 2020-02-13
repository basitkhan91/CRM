import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';


@Injectable()
export class QuoteEndpointService extends EndpointFactory {
    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
        super(http, configurations, injector);
    }

    getQuoteIdByWfandWorkOrderId(wfwoId, workOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/getworkorderquote?wfwoId=${wfwoId}&workOrderId=${workOrderId}`, this.getRequestHeaders())
    }
    getQuoteExclusionList(workOrderQuoteId, buildMethodId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/quoteexclusions?workOrderQuoteDetailsId=${workOrderQuoteId}&buildMethodId=${buildMethodId}`, this.getRequestHeaders())
    }
    getQuoteMaterialList(workOrderQuoteId, buildMethodId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/quotematerials?workOrderQuoteDetailsId=${workOrderQuoteId}&buildMethodId=${buildMethodId}`, this.getRequestHeaders())
    }
    getQuoteFreightsList(workOrderQuoteId, buildMethodId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/quotefreights?workOrderQuoteDetailsId=${workOrderQuoteId}&buildMethodId=${buildMethodId}`, this.getRequestHeaders())
    }
    getQuoteChargesList(workOrderQuoteId, buildMethodId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/quotecharges?workOrderQuoteDetailsId=${workOrderQuoteId}&buildMethodId=${buildMethodId}`, this.getRequestHeaders())
    }
    getQuoteLaborList(workOrderQuoteId, buildMethodId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/quotelabor?workOrderQuoteDetailsId=${workOrderQuoteId}&buildMethodId=${buildMethodId}`, this.getRequestHeaders())
    }
    getWorkOrderQuoteDetail(workOrderId, workFlowWorkOrderId) {
        return this.http.get(`${this.configurations.baseUrl}/api/workorder/getworkorderquote?wfwoId=${workFlowWorkOrderId}&workOrderId=${workOrderId}`);
    }
    getWorkOrderQuoteList(payload) {
        return this.http.post(`${this.configurations.baseUrl}/api/workorder/woquotelist`, payload);
    }
    getWorkOrderQuoteData(workOrderQuoteId) {
        return this.http.get(`${this.configurations.baseUrl}/api/workorder/woquoteview?workOrderQuoteId=${workOrderQuoteId}`);
    }
    getSavedQuoteDetails(wfwoid) {
        return this.http.get(`${this.configurations.baseUrl}/api/workorder/buildmethoddetails?workflowWorkorderId=${wfwoid}`);
    }
    getPartDetails(itemMasterId, conditionId){
        return this.http.get(`${this.configurations.baseUrl}/api/common/partpurchasesaledetails?itemMasterId=${itemMasterId}&condition=${conditionId}`);
    }


}