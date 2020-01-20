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
    getQuoteExclusionList(workOrderQuoteId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/quoteexclusions?workOrderQuoteId=${workOrderQuoteId}`, this.getRequestHeaders())
    }
    getQuoteMaterialList(workOrderQuoteId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/quotematerials?workOrderQuoteId=${workOrderQuoteId}`, this.getRequestHeaders())
    }
    getQuoteFreightsList(workOrderQuoteId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/quotefreights?workOrderQuoteId=${workOrderQuoteId}`, this.getRequestHeaders())
    }
    getQuoteChargesList(workOrderQuoteId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/quotecharges?workOrderQuoteId=${workOrderQuoteId}`, this.getRequestHeaders())
    }
    getQuoteLaborList(workOrderQuoteId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/quotelabor?workOrderQuoteId=${workOrderQuoteId}`, this.getRequestHeaders())
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

}