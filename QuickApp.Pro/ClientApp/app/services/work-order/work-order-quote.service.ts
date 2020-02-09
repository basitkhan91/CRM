// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { WorkOrderEndpointService } from '../work-order/work-order-endpoint.service';
import { QuoteEndpointService } from './work-order-quote.endpoint.service';

@Injectable()
export class WorkOrderQuoteService {

    creditTerms: any;
    employeesOriginalData: any[];
    constructor(private workOrderEndpointService: WorkOrderEndpointService,
        private quoteEndPointService: QuoteEndpointService) {
    }

    createOrUpdateQuotation(data) {
        return this.workOrderEndpointService.createOrUpdateQuotation(data);
    }

    getWorkOrderById(workOrderId) {
        return this.workOrderEndpointService.getWorkOrderById(workOrderId,0);
    }

    getPartsDetail(workOrderId) {
        return this.workOrderEndpointService.getPartsDetail(workOrderId);
    }

    getWorkOrderWorkFlowNumbers(workOrderId) {
        return this.workOrderEndpointService.getWorkOrderWorkFlowNumbers(workOrderId);
    }

    getBuildDetailsFromWorkFlow(partId, workScopeId) {
        return this.workOrderEndpointService.getBuildDetailsFromWorkFlow(partId, workScopeId);
    }
    getBuildDetailsFromHistoricalWorkOrder(partId, workScopeId) {
        return this.workOrderEndpointService.getBuildDetailsFromHistoricalWorkOrder(partId, workScopeId);
    }

    getWorkFlowDetails(workFlowId) {
        return this.workOrderEndpointService.getWorkFlowDetails(workFlowId);
    }

    getWorkOrderMaterialListForQuote(wfwoId) {
        return this.workOrderEndpointService.getWorkOrderMaterialListForQuote(wfwoId);
    }

    getWorkOrderLaborListForQuote(wfwoId) {
        return this.workOrderEndpointService.getWorkOrderLaborListForQuote(wfwoId);
    }

    getWorkOrderChargesListForQuote(wfwoId) {
        return this.workOrderEndpointService.getWorkOrderChargesListForQuote(wfwoId);
    }

    getWorkOrderExclutionsListForQuote(wfwoId) {
        return this.workOrderEndpointService.getWorkOrderExclutionsListForQuote(wfwoId);
    }

    getWorkOrderFreightListForQuote(wfwoId) {
        return this.workOrderEndpointService.getWorkOrderFreightListForQuote(wfwoId);
    }

    saveMaterialListQuote(data) {
        return this.workOrderEndpointService.saveMaterialListQuote(data);
    }

    saveFreightsListQuote(data) {
        return this.workOrderEndpointService.saveFreightsListQuote(data);
    }

    saveLaborListQuote(data) {
        return this.workOrderEndpointService.saveLaborListQuote(data);
    }

    saveChargesQuote(data) {
        return this.workOrderEndpointService.saveChargesQuote(data);
    }

    saveExclusionsQuote(data) {
        return this.workOrderEndpointService.saveExclusionsQuote(data);
    }
    getQuoteIdByWfandWorkOrderId(wfwoId, workOrderId) {
        return this.quoteEndPointService.getQuoteIdByWfandWorkOrderId(wfwoId, workOrderId);
    }
    getQuoteExclusionList(workOrderQuoteId, buildMethodId) {
        return this.quoteEndPointService.getQuoteExclusionList(workOrderQuoteId, buildMethodId);
    }
    getQuoteMaterialList(workOrderQuoteId, buildMethodId) {
        return this.quoteEndPointService.getQuoteMaterialList(workOrderQuoteId, buildMethodId);
    }
    getQuoteFreightsList(workOrderQuoteId, buildMethodId) {
        return this.quoteEndPointService.getQuoteFreightsList(workOrderQuoteId, buildMethodId);
    }
    getQuoteChargesList(workOrderQuoteId, buildMethodId) {
        return this.quoteEndPointService.getQuoteChargesList(workOrderQuoteId, buildMethodId);
    }
    getQuoteLaborList(workOrderQuoteId, buildMethodId) {
        return this.quoteEndPointService.getQuoteLaborList(workOrderQuoteId, buildMethodId);
    }
    getWorkOrderQuoteDetail(workOrderId, workFlowWorkOrderId){
        return this.quoteEndPointService.getWorkOrderQuoteDetail(workOrderId, workFlowWorkOrderId)
    }
    getWorkOrderQuoteList(payload){
        return this.quoteEndPointService.getWorkOrderQuoteList(payload);
    }
    getWorkOrderQuoteData(workOrderQuoteId) {
        return this.quoteEndPointService.getWorkOrderQuoteData(workOrderQuoteId);
    }
    getSavedQuoteDetails(wfwoid){
        return this.quoteEndPointService.getSavedQuoteDetails(wfwoid);
    }


}