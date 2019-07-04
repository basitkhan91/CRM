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
export class WorkOrderService {

    constructor(private workOrderEndpointService: WorkOrderEndpointService) {
    }

    getAll() {
        return this.workOrderEndpointService.getAllWorkOrders<WorkOrder[]>();
    }

    getById(workOrderId: number) {
        return this.workOrderEndpointService.getWorkOrderById<WorkOrder>(workOrderId);
    }

    add(workOrder: WorkOrder) {
        return this.workOrderEndpointService.addWorkOrder<WorkOrder>(workOrder);
    }

    update<T>(workOrder: WorkOrder) {
        return this.workOrderEndpointService.updateWorkOrder<T>(workOrder);
    }

    remove(workOrderId: number) {
        return this.workOrderEndpointService.removeWorkOrderById(workOrderId);
    }

    updateActive(assetStatus: any) {
        //return this.assetStatusEndpoint.getUpdateForActive(assetStatus, assetStatus.id);
    }

    getAssetAudit(assetId: number) {
        //return this.assetStatusEndpoint.getAssetStatusAuditById<any>(assetId);
    }

    getAllWorkOrderTypes() {
        return this.workOrderEndpointService.getAllWorkOrderTypes<WorkOrderType[]>();
    }

    getAllWorkOrderStatus() {
        return this.workOrderEndpointService.getAllWorkOrderStatus<WorkOrderStatus[]>(); 
    }

    getAllWorkScopes() {
        return this.workOrderEndpointService.getAllWorkScopes<WorkScope[]>();
    }

    getAllWorkOrderStages() {
        return this.workOrderEndpointService.getAllWorkOrderStages<WorkOrderStage[]>();
    }
}