﻿// ===============================
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

    creditTerms: any;
    employeesOriginalData: any[];
    constructor(private workOrderEndpointService: WorkOrderEndpointService) {
    }

    getAll() {
        return this.workOrderEndpointService.getAllWorkOrders<WorkOrder[]>();
    }

    // getById(workOrderId: number) {
    //     return this.workOrderEndpointService.getWorkOrderById<WorkOrder>(workOrderId);
    // }

    getWorkOrderById(workOrderId) {
        return this.workOrderEndpointService.getWorkOrderById(workOrderId);
    }

    createNewWorkOrder(workOrder) {
        return this.workOrderEndpointService.createNewWorkOrder<any>(workOrder);
    }

    updateNewWorkOrder(workOrder: WorkOrder) {
        return this.workOrderEndpointService.updateNewWorkOrder<any>(workOrder);
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
    postLabour(action: any) {
        return this.workOrderEndpointService.postLabourEndpoint<any>(action);
    }

    getWorkFlowByPNandScope(itemMasterId, workScopeId) {
        return this.workOrderEndpointService.getWorkFlowByPNandScope(itemMasterId, workScopeId)
    }

    getMultipleParts() {
        return this.workOrderEndpointService.getMultipleParts()
    }

    getRevisedPartNumbers(itemMasterId) {
        return this.workOrderEndpointService.getRevisedPartNumbers(itemMasterId)
    }
    getStockLineByItemMasterId(itemMasterId, conditionId) {
        return this.workOrderEndpointService.getStockLineByItemMasterId(itemMasterId, conditionId);
    }
    getPartPublicationByItemMaster(itemMasterId) {
        return this.workOrderEndpointService.getPartPublicationByItemMaster(itemMasterId);
    }
    getSerialNoByStockLineId(stockLineId, conditionId) {
        return this.workOrderEndpointService.getSerialNoByStockLineId(stockLineId, conditionId)
    }
    getConditionByItemMasterId(itemMasterId) {
        return this.workOrderEndpointService.getConditionByItemMasterId(itemMasterId);
    }
    getWorkOrderList(pageIndex, pageSize) {
        return this.workOrderEndpointService.getWorkOrderList(pageIndex, pageSize);
    }

    updateActionforWorkOrder(action, login) {
        return this.workOrderEndpointService.updateWorkOrderStatus(action, login);
    }
    deleteActionforWorkOrder(workOrderId) {
        return this.workOrderEndpointService.deleteWorkOrder(workOrderId);
    }

    getWorkOrderPartListByWorkOrderId(workOrderId) {
        return this.workOrderEndpointService.getWorkOrderPartListByWorkOrderId(workOrderId);
    }

    createWorkFlowWorkOrder(data) {
        return this.workOrderEndpointService.createWorkFlowWorkOrder(data);
    }

    getWorkOrderWorkFlowNumbers(workOrderId) {
        return this.workOrderEndpointService.getWorkOrderWorkFlowNumbers(workOrderId);
    }

    getWorkOrderAssetList(workFlowWorkOrderId, workOrderId) {
        return this.workOrderEndpointService.getWorkOrderAssetList(workFlowWorkOrderId, workOrderId);
    }
    createWorkOrderLabor(data) {
        return this.workOrderEndpointService.createWorkOrderLabor(data);
    }

    createWorkOrderMaterialList(data) {
        return this.workOrderEndpointService.createWorkOrderMaterialList(data);
    }
    createWorkOrderEquipmentList(data){
        return this.workOrderEndpointService.createWorkOrderEquipmentList(data);
    }
    getAllTasks() {
        return this.workOrderEndpointService.getTasks();
    }
    getWorkOrderMaterialList(workFlowWorkOrderId, workOrderId) {
        return this.workOrderEndpointService.getWorkOrderMaterialList(workFlowWorkOrderId, workOrderId)
    }
    getWorkOrderPublicationList(workFlowWorkOrderId, workOrderId) {
        return this.workOrderEndpointService.getWorkOrderPublicationList(workFlowWorkOrderId, workOrderId)
    }

    getWorkOrderChargesList(workFlowWorkOrderId, workOrderId) {
        return this.workOrderEndpointService.getWorkOrderChargesList(workFlowWorkOrderId, workOrderId)
    }

    getWorkOrderExclusionsList(workFlowWorkOrderId, workOrderId) {
        return this.workOrderEndpointService.getWorkOrderExclusionsList(workFlowWorkOrderId, workOrderId)
    }
    getWorkOrderLaborList(workFlowWorkOrderId, workOrderId) {
        return this.workOrderEndpointService.getWorkOrderLaborList(workFlowWorkOrderId, workOrderId)
    }

    getWorkOrderDirectionList(workFlowWorkOrderId, workOrderId){
        return this.workOrderEndpointService.getWorkOrderDirectionList(workFlowWorkOrderId, workOrderId)
    }

    getWorkOrderWorkFlowByWorkFlowWorkOrderId(workFlowWorkOrderId) {
        return this.workOrderEndpointService.getWorkOrderWorkFlowByWorkFlowWorkOrderId(workFlowWorkOrderId)
    }

    viewWorkOrderHeader(workOrderId) {
        return this.workOrderEndpointService.viewWorkOrderHeader(workOrderId);
    }
    viewWorkOrderPartNumber(workOrderId) {
        return this.workOrderEndpointService.viewWorkOrderPartNumber(workOrderId);
    }

    getReservedPartsByWorkFlowWOId(WorkFlowWorkOrderId) {
        return this.workOrderEndpointService.getReservedPartsByWorkFlowWOId(WorkFlowWorkOrderId);
    }
    saveReservedPartorIssue(alternatePart){
        return this.workOrderEndpointService.saveReservedPartorIssue(alternatePart)
    }
    assetsCheckInByWorkOrderAssetsId(workOrderAssetId,employeeId,checkedInDate,updatedBy){
        return this.workOrderEndpointService.assetsCheckInByWorkOrderAssetsId(workOrderAssetId,employeeId,checkedInDate,updatedBy);
    }
    assetsCheckOutByWorkOrderAssetsId(workOrderAssetId,employeeId,checkedInDate,updatedBy){ 
        return this.workOrderEndpointService.assetsCheckOutByWorkOrderAssetsId(workOrderAssetId,employeeId,checkedInDate,updatedBy);
    }

    createQuote(data){
        return this.workOrderEndpointService.createQuotation(data);
    }


}