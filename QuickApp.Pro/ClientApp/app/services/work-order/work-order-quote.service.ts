// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { WorkOrder } from '../../models/work-order.model';
import { WorkOrderType, WorkOrderStatus, WorkScope, WorkOrderStage } from '../../models/work-order-type.model';

import { WorkOrderEndpointService } from '../work-order/work-order-endpoint.service';

@Injectable()
export class WorkOrderQuoteService {

    creditTerms: any;
    employeesOriginalData: any[];
    constructor(private workOrderEndpointService: WorkOrderEndpointService) {
    }

    createOrUpdateQuotation(data) {
        return this.workOrderEndpointService.createOrUpdateQuotation(data);
    }

    getWorkOrderById(workOrderId) {
        return this.workOrderEndpointService.getWorkOrderById(workOrderId);
    }

    getPartsDetail(workOrderId){
        return this.workOrderEndpointService.getPartsDetail(workOrderId);
    }

    getWorkOrderWorkFlowNumbers(workOrderId) {
        return this.workOrderEndpointService.getWorkOrderWorkFlowNumbers(workOrderId);
    }

    getBuildDetailsFromWorkFlow(partId, workScopeId){
        return this.workOrderEndpointService.getBuildDetailsFromWorkFlow(partId, workScopeId);
    }
    getBuildDetailsFromHistoricalWorkOrder(partId, workScopeId){
        return this.workOrderEndpointService.getBuildDetailsFromHistoricalWorkOrder(partId, workScopeId);
    }

    getWorkFlowDetails(workFlowId){
        return this.workOrderEndpointService.getWorkFlowDetails(workFlowId);
    }

    getWorkOrderMaterialListForQuote(wfwoId){
        return this.workOrderEndpointService.getWorkOrderMaterialListForQuote(wfwoId);
    }

    getWorkOrderLaborListForQuote(wfwoId){
        return this.workOrderEndpointService.getWorkOrderLaborListForQuote(wfwoId);
    }

    getWorkOrderChargesListForQuote(wfwoId){
        return this.workOrderEndpointService.getWorkOrderChargesListForQuote(wfwoId);
    }

    getWorkOrderExclutionsListForQuote(wfwoId){
        return this.workOrderEndpointService.getWorkOrderExclutionsListForQuote(wfwoId);
    }

    getWorkOrderFreightListForQuote(wfwoId){
        return this.workOrderEndpointService.getWorkOrderFreightListForQuote(wfwoId);
    }

    saveMaterialListQuote(data){
        return this.workOrderEndpointService.saveMaterialListQuote(data);
    }

    saveLaborListQuote(data){
        return this.workOrderEndpointService.saveLaborListQuote(data);
    }

    saveChargesQuote(data){
        return this.workOrderEndpointService.saveChargesQuote(data);
    }

    saveExclusionsQuote(data){
        return this.workOrderEndpointService.saveExclusionsQuote(data);
    }


}