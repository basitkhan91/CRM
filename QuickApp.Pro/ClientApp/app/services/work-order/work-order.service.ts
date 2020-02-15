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

    creditTerms: any;
    constructor(private workOrderEndpointService: WorkOrderEndpointService) {
    }

    getAll() {
        return this.workOrderEndpointService.getAllWorkOrders<WorkOrder[]>();
    }

    // getById(workOrderId: number) {
    //     return this.workOrderEndpointService.getWorkOrderById<WorkOrder>(workOrderId);
    // }

    getWorkOrderById(workOrderId, receivingCustomerId) {
        return this.workOrderEndpointService.getWorkOrderById(workOrderId, receivingCustomerId);
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

    getWorkOrderStageAndStatus(){
        return this.workOrderEndpointService.getWorkOrderStageAndStatus()
    }

    getWorkFlowByPNandScope(itemMasterId, workScopeId) {
        return this.workOrderEndpointService.getWorkFlowByPNandScope(itemMasterId, workScopeId)
    }
    getNTEandSTDByItemMasterId(itemMasterId, workScopeName) {
        return this.workOrderEndpointService.getNTEandSTDByItemMasterId(itemMasterId, workScopeName)
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
    getWorkOrderList(paginationData) {
        return this.workOrderEndpointService.getWorkOrderList(paginationData);
    }
    getWorkOrderGlobalSearch(value, pageIndex, pageSize) {
        return this.workOrderEndpointService.getWorkOrderGlobalSearch(value, pageIndex, pageSize);
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
    updateWorkOrderMaterialList(data) {
        return this.workOrderEndpointService.updateWorkOrderMaterialList(data);
    }
    deleteWorkOrderMaterialListById(workOrderMaterialId, updatedBy) {
        return this.workOrderEndpointService.deleteWorkOrderMaterialListById(workOrderMaterialId, updatedBy);
    }
    createWorkOrderEquipmentList(data) {
        return this.workOrderEndpointService.createWorkOrderEquipmentList(data);
    }
    updateWorkOrderEquipmentList(data) {
        return this.workOrderEndpointService.updateWorkOrderEquipmentList(data);
    }
    createWorkOrderChargesList(data) {
        return this.workOrderEndpointService.createWorkOrderChargesList(data);
    }

    updateWorkOrderChargesList(data) {
        return this.workOrderEndpointService.updateWorkOrderChargesList(data);
    }

    createWorkOrderExclusionList(data) {
        return this.workOrderEndpointService.createWorkOrderExclusionList(data);
    }
    updateWorkOrderExclusionList(data) {
        return this.workOrderEndpointService.updateWorkOrderExclusionList(data);
    }

    createWorkOrderFreightList(data){
        return this.workOrderEndpointService.createWorkOrderFreightList(data);
    }

    updateWorkOrderFreightList(data){
        return this.workOrderEndpointService.updateWorkOrderFreightList(data);
    }
    deleteWorkOrderFreightList(workOrderFreightId , updatedBy){
        return this.workOrderEndpointService. deleteWorkOrderFreightList(workOrderFreightId , updatedBy);
    }

    getAllTasks() {
        return this.workOrderEndpointService.getTasks();
    }
    getWorkOrderMaterialList(workFlowWorkOrderId, workOrderId) {
        return this.workOrderEndpointService.getWorkOrderMaterialList(workFlowWorkOrderId, workOrderId)
    }
    deleteWorkOrderMaterialList(workOrderMaterialsId, updatedBy) {
        return this.workOrderEndpointService.deleteWorkOrderMaterialList(workOrderMaterialsId, updatedBy)
    }

    getWorkOrderPublicationList(workFlowWorkOrderId, workOrderId) {
        return this.workOrderEndpointService.getWorkOrderPublicationList(workFlowWorkOrderId, workOrderId)
    }

    getWorkOrderChargesList(workFlowWorkOrderId, workOrderId) {
        return this.workOrderEndpointService.getWorkOrderChargesList(workFlowWorkOrderId, workOrderId)
    }

    deleteWorkOrderChargesByChargesId(workOrderChargeId, updatedBy) {
        return this.workOrderEndpointService.deleteWorkOrderChargesByChargesId(workOrderChargeId, updatedBy)
    }

    getWorkOrderExclusionsList(workFlowWorkOrderId, workOrderId) {
        return this.workOrderEndpointService.getWorkOrderExclusionsList(workFlowWorkOrderId, workOrderId)
    }
    deleteWorkOrderExclusionByExclusionId(workOrderExclusionsId, updatedBy) {
        return this.workOrderEndpointService.deleteWorkOrderExclusionByExclusionId(workOrderExclusionsId, updatedBy)
    }
    getWorkOrderFrieghtsList(workFlowWorkOrderId, workOrderId){
        return this.workOrderEndpointService.getWorkOrderFrieghtsList(workFlowWorkOrderId, workOrderId)
    }
    getWorkOrderLaborList(workFlowWorkOrderId, workOrderId) {
        return this.workOrderEndpointService.getWorkOrderLaborList(workFlowWorkOrderId, workOrderId)
    }

    getWorkOrderDirectionList(workFlowWorkOrderId, workOrderId) {
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

    getReservedPartsByWorkFlowWOId(WorkFlowWorkOrderId, statusId) {
        return this.workOrderEndpointService.getReservedPartsByWorkFlowWOId(WorkFlowWorkOrderId, statusId);
    }
    saveReservedPartorIssue(alternatePart) {
        return this.workOrderEndpointService.saveReservedPartorIssue(alternatePart)
    }
    assetsCheckInByWorkOrderAssetsId(assetcheckin) {
        return this.workOrderEndpointService.assetsCheckInByWorkOrderAssetsId(assetcheckin);
    }
    assetsCheckOutByWorkOrderAssetsId(assetcheckout) {
        return this.workOrderEndpointService.assetsCheckOutByWorkOrderAssetsId(assetcheckout);
    }
    assetsHistoryByWorkOrderAssetId(workOrderAssetId){
        return this.workOrderEndpointService.assetsHistoryByWorkOrderAssetId(workOrderAssetId);
    }
    deleteWorkOrderAssetByAssetId(workOrderAssetId, updatedBy) {
        return this.workOrderEndpointService.deleteWorkOrderAssetByAssetId(workOrderAssetId, updatedBy);
    }

    createQuote(data) {
        return this.workOrderEndpointService.createOrUpdateQuotation(data);
    }

    getSubWorkOrderListByWorkOrderId(workOrderId) {
        return this.workOrderEndpointService.getSubWorkOrderListByWorkOrderId(workOrderId);
    }

    getSubWorkOrderView(subWorkOrderId) {
        return this.workOrderEndpointService.getSubWorkOrderDataBySubWorkOrderId(subWorkOrderId);
    }

    // subWorkOrder 
    getSubWorkOrderHeaderByWorkOrderId(workOrderId, workOrderPartNumberId) {
        return this.workOrderEndpointService.getSubWorkOrderHeaderByWorkOrderId(workOrderId, workOrderPartNumberId);
    }

    getSubWorkOrderDataBySubWorkOrderId(subWorkOrderId) {
        return this.workOrderEndpointService.getSubWorkOrderDataBySubWorkOrderId(subWorkOrderId);
    }


    createSubWorkOrderHeaderByWorkOrderId(data) {
        return this.workOrderEndpointService.createSubWorkOrderHeaderByWorkOrderId(data);
    }
    updateSubWorkOrderHeaderBySubWorkOrderId(data) {
        return this.workOrderEndpointService.updateSubWorkOrderHeaderBySubWorkOrderId(data);
    }


    createBillingByWorkOrderId(data) {
        return this.workOrderEndpointService.createBillingByWorkOrderId(data);
    }
    updateBillingByWorkOrderId(data) {
        return this.workOrderEndpointService.updateBillingByWorkOrderId(data);
    }

    getExistingWOROList() {
        return this.workOrderEndpointService.getExistingWOROList();
    }

    createNewWORO(workOrderPartNoId) {
        return this.workOrderEndpointService.createNewWORO(workOrderPartNoId);
    }





    getPartsDetail(workOrderId) {
        return this.workOrderEndpointService.getPartsDetail(workOrderId);
    }

    getBuildDetailsFromWorkFlow(partId, workScopeId) {
        return this.workOrderEndpointService.getBuildDetailsFromWorkFlow(partId, workScopeId);
    }

    getBillingEditData(workOrderId, workOrderPartNoId) {
        return this.workOrderEndpointService.getBillingEditData(workOrderId, workOrderPartNoId);
    }

    getPartNosByCustomer(customerId) {
        return this.workOrderEndpointService.getPartNosByCustomer(customerId);
    }
    
    getReceivingCustomerreference(customerId) {
        return this.workOrderEndpointService.getReceivingCustomerreference(customerId);
    }

    getDocumentsList(wfWoId, workOrderId){
        return this.workOrderEndpointService.getDocumentsList(wfWoId, workOrderId);
    }
    createDocuments(data){
        return this.workOrderEndpointService.createDocuments(data);
    }
    updateWorkOrderDocumentStatus(workOrderDocumentsId,status, updatedBy){
        return this.workOrderEndpointService.updateWorkOrderDocumentStatus(workOrderDocumentsId,status, updatedBy);
    }
    deleteWorkOrderDocuments(workOrderDocumentId, updatedBy){
        return this.workOrderEndpointService.deleteWorkOrderDocuments(workOrderDocumentId, updatedBy);
    }
}