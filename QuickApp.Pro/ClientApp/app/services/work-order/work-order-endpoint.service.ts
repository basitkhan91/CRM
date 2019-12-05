// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from '../endpoint-factory.service';
import { ConfigurationService } from '../configuration.service';
import { WorkOrder } from '../../models/work-order.model';

@Injectable()
export class WorkOrderEndpointService extends EndpointFactory {

    private readonly getAllURL: string = "/api/WorkOrder/getAll";
    private readonly getByIdURL: string = "/api/WorkOrder/getWorkOrderDataByID";
    private readonly addURL: string = "/api/WorkOrder/createworkorder";
    private readonly updateURL: string = "/api/WorkOrder/updateWO";
    private readonly removeByIdURL: string = "/api/WorkOrder/remove";
    private readonly getAssetAuditById: string = "/api/WorkOrder/audits";
    private readonly getAllWorkOrderTypesURL: string = "/api/WorkOrder/workOrderTypes";
    private readonly getAllWorkOrderStatusURL: string = "/api/WorkOrder/workOrderStatus";
    private readonly getAllWorkScopesURL: string = "/api/WorkOrder/getAllworkScopes";
    private readonly getAllWorkOrderStagesURL: string = "/api/WorkOrder/getStages";
    private readonly createQuote: string = "/api/workOrder/createworkorderquote"

    private readonly addLabourURL: string = "/api/WorkOrder/WorkOrderLabourPost";


    get getAll() { return this.configurations.baseUrl + this.getAllURL; }
    get getById() { return this.configurations.baseUrl + this.getByIdURL; }
    get add() { return this.configurations.baseUrl + this.addURL; }
    get update() { return this.configurations.baseUrl + this.updateURL; }
    get removeById() { return this.configurations.baseUrl + this.removeByIdURL; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getAllWorkOrders<T>(): Observable<T> {
        let endpointUrl = this.getAll;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllWorkOrders());
            });
    }

    // getWorkOrderById<T>(workOrderId: number): Observable<T> {
    //     let endpointUrl = `${this.getById}/${workOrderId}`;

    //     return this.http.get<T>(endpointUrl, this.getRequestHeaders())
    //         .catch(error => {
    //             return this.handleError(error, () => this.getWorkOrderById(workOrderId));
    //         });
    // }

    createNewWorkOrder<T>(workOrder: WorkOrder): Observable<T> {


        return this.http.post<T>(`${this.configurations.baseUrl}/api/workOrder/createworkorder`, JSON.stringify(workOrder), this.getRequestHeaders())

    }




    updateNewWorkOrder<T>(workOrder: WorkOrder): Observable<T> {
        return this.http.post<T>(`${this.configurations.baseUrl}/api/workOrder/updateworkorder`, JSON.stringify(workOrder), this.getRequestHeaders())
    }

    removeWorkOrderById<T>(workOrderId: number): Observable<T> {
        let endpointUrl = `${this.removeById}/${workOrderId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.removeWorkOrderById(workOrderId));
            });
    }

    getAllWorkOrderTypes<T>(): Observable<T> {
        let endPointUrl = this.getAllWorkOrderTypesURL;

        return this.http.get<T>(endPointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllWorkOrderTypes());
            });
    }

    getAllWorkOrderStatus<T>(): Observable<T> {
        let endPointUrl = this.getAllWorkOrderStatusURL;

        return this.http.get<T>(endPointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllWorkOrderStatus());
            });
    }

    getAllWorkScopes<T>(): Observable<T> {
        let endPointUrl = this.getAllWorkScopesURL;
        return this.http.get<T>(endPointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllWorkScopes());
            });
    }

    getAllWorkOrderStages<T>(): Observable<T> {
        let endPointURL = this.getAllWorkOrderStagesURL;
        return this.http.get<T>(endPointURL, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllWorkOrderStages());
            });
    }

    getAssetStatusAuditById<T>(workOrderId: number): Observable<T> {
        let endpointUrl = `${this.getAssetAuditById}/${workOrderId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAssetStatusAuditById(workOrderId));
            });
    }
    postLabourEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this.addLabourURL, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.postLabourEndpoint(userObject));
            });
    }

    getWorkFlowByPNandScope(itemMasterId, workScopeId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/workflownos?partId=${itemMasterId}&workScopeId=${workScopeId}`)
    }

    // get Part Number Bases on Repair Order and Purchase Orders
    getMultipleParts() {
        return this.http.get(`${this.configurations.baseUrl}/api/workOrder/workorderpartdetails`, this.getRequestHeaders())
    }

    getRevisedPartNumbers(itemMasterId) {
        return this.http.get(`${this.configurations.baseUrl}/api/workOrder/revisedparts?itemMasterId=${itemMasterId}&mappingType=${1}`, this.getRequestHeaders())
    }
    getStockLineByItemMasterId(itemMasterId, conditionId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/stocklinedetailsbypartno?itemMasterId=${itemMasterId}&conditionId=${conditionId}`, this.getRequestHeaders())
    }

    getPartPublicationByItemMaster(itemMasterId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/partpublications?itemMasterId=${itemMasterId}`, this.getRequestHeaders())
    }

    getSerialNoByStockLineId(stockLineId, conditionId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/partserialno?stockLineId=${stockLineId}&conditionId=${conditionId}`, this.getRequestHeaders())
    }

    getConditionByItemMasterId(itemMasterId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/conditiondetailsbypartno?itemMasterId=${itemMasterId}`, this.getRequestHeaders())
    }

    getWorkOrderList(pageIndex, pageSize) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/workorderlist?pageNo=${pageIndex}&pageSize=${pageSize}`, this.getRequestHeaders())
    }

    updateWorkOrderStatus(data, login) {
        return this.http.get(`${this.configurations.baseUrl}/api/workOrder/updateworkorderstatus?workOrderId=${data.workOrderId}&status=${data.isActive}&updatedBy=${login}`, this.getRequestHeaders())
    }
    deleteWorkOrder(workOrderId) {
        return this.http.get(`${this.configurations.baseUrl}/api/workOrder/deleteworkorder?workOrderId=${workOrderId}`, this.getRequestHeaders())
    }

    getWorkOrderPartListByWorkOrderId(workOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/workorderpartlist?workOrderId=${workOrderId}`, this.getRequestHeaders());
    }
    createWorkFlowWorkOrder(object) {
        return this.http.post<any>(`${this.configurations.baseUrl}/api/workOrder/updateworkorderworkFlow`, JSON.stringify(object), this.getRequestHeaders())
    }
    getWorkOrderWorkFlowNumbers(workOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/workorderworkflownos?workOrderId=${workOrderId}`, this.getRequestHeaders())
    }


    getWorkOrderAssetList(workFlowWorkOrderId, workOrderId) {

        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/workorderassetlist?wfwoId=${workFlowWorkOrderId}&workOrderId=${workOrderId}`, this.getRequestHeaders())
    }

    createWorkOrderLabor(data) {
        return this.http.post(`${this.configurations.baseUrl}/api/workOrder/createworkorderlabor`, JSON.stringify(data), this.getRequestHeaders())
    }
    createWorkOrderMaterialList(data) {
        return this.http.post<any>(`${this.configurations.baseUrl}/api/workOrder/createworkordermaterials`, JSON.stringify(data), this.getRequestHeaders())
    }

    updateWorkOrderMaterialList(data) {
        return this.http.post<any>(`${this.configurations.baseUrl}/api/workOrder/updateworkordermaterials`, JSON.stringify(data), this.getRequestHeaders())
    }
    deleteWorkOrderMaterialListById(workOrderMaterialId, updatedBy) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/deleteworkordermaterial?workOrderMaterialsId=${workOrderMaterialId}&updatedBy=${updatedBy}`, this.getRequestHeaders())

    }



    createWorkOrderEquipmentList(data) {
        return this.http.post<any>(`${this.configurations.baseUrl}/api/workOrder/createworkorderassets`, JSON.stringify(data), this.getRequestHeaders())
    }

    updateWorkOrderEquipmentList(data) {
        return this.http.post<any>(`${this.configurations.baseUrl}/api/workOrder/updateworkorderassets`, JSON.stringify(data), this.getRequestHeaders())

    }

    createWorkOrderChargesList(data) {
        return this.http.post<any>(`${this.configurations.baseUrl}/api/workOrder/createworkordercharges`, JSON.stringify(data), this.getRequestHeaders())
    }


    updateWorkOrderChargesList(data) {
        return this.http.post<any>(`${this.configurations.baseUrl}/api/workOrder/updateworkordercharges`, JSON.stringify(data), this.getRequestHeaders())
    }



    createWorkOrderExclusionList(data) {
        return this.http.post<any>(`${this.configurations.baseUrl}/api/workOrder/createworkorderexclusions`, JSON.stringify(data), this.getRequestHeaders());
    }

    updateWorkOrderExclusionList(data) {
        return this.http.post<any>(`${this.configurations.baseUrl}/api/workOrder/updateworkorderexclusions`, JSON.stringify(data), this.getRequestHeaders());
    }


    getTasks() {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/Task/Get`, this.getRequestHeaders())
    }

    getWorkOrderMaterialList(workFlowWorkOrderId, workOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/workordermateriallist?wfwoId=${workFlowWorkOrderId}&workOrderId=${workOrderId}`)
    }

    deleteWorkOrderMaterialList(workOrderMaterialsId, updatedBy) {
        return this.http.get(`${this.configurations.baseUrl}/api/workorder/deleteworkordermaterial?workOrderMaterialsId=${workOrderMaterialsId}&updatedBy=${updatedBy}`, this.getRequestHeaders())

    }

    getWorkOrderPublicationList(workFlowWorkOrderId, workOrderId) {
        return this.http.get(`${this.configurations.baseUrl}/api/workorder/getworkorderpublications?wfwoId=${workFlowWorkOrderId}&workOrderId=${workOrderId}`, this.getRequestHeaders())
    }

    getWorkOrderChargesList(workFlowWorkOrderId, workOrderId) {
        return this.http.get(`${this.configurations.baseUrl}/api/workorder/getworkflowworkorderchargeslist?wfwoId=${workFlowWorkOrderId}&workOrderId=${workOrderId}`, this.getRequestHeaders())
    }

    deleteWorkOrderChargesByChargesId(workOrderChargeId, updatedBy) {
        return this.http.get(`${this.configurations.baseUrl}/api/workorder/deleteworkordercharge?workOrderChargeId=${workOrderChargeId}&updatedBy=${updatedBy}`, this.getRequestHeaders())

    }

    getWorkOrderExclusionsList(workFlowWorkOrderId, workOrderId) {

        return this.http.get(`${this.configurations.baseUrl}/api/workorder/getworkflowworkorderexclusionslist?wfwoId=${workFlowWorkOrderId}&workOrderId=${workOrderId}`, this.getRequestHeaders())

    }

    deleteWorkOrderExclusionByExclusionId(workOrderExclusionsId, updatedBy) {
        return this.http.get(`${this.configurations.baseUrl}/api/workorder/deleteworkorderexclusions?workOrderExclusionsId=${workOrderExclusionsId}&updatedBy=${updatedBy}`, this.getRequestHeaders())

    }

    getWorkOrderLaborList(workFlowWorkOrderId, workOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workorder/getworkflowworkorderlabourlist?wfwoId=${workFlowWorkOrderId}&workOrderId=${workOrderId}`, this.getRequestHeaders())

    }

    getWorkOrderDirectionList(workFlowWorkOrderId, workOrderId) {
        return this.http.get(`${this.configurations.baseUrl}/api/workorder/workorderdirections?wfwoId=${workFlowWorkOrderId}&workOrderId=${workOrderId}`, this.getRequestHeaders())


    }


    getWorkOrderWorkFlowByWorkFlowWorkOrderId(workFlowWorkOrderId) {

        return this.http.get(`${this.configurations.baseUrl}/api/workorder/workorderworkflowview?workFlowWorkOrderId=${workFlowWorkOrderId}`, this.getRequestHeaders())

    }




    getWorkOrderById(workOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/workorderbyid?workOrderId=${workOrderId}`, this.getRequestHeaders())
    }

    viewWorkOrderHeader(workOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/workorderheaderview?workOrderId=${workOrderId}`, this.getRequestHeaders())
    }
    viewWorkOrderPartNumber(workOrderId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/workorderpartsview?workOrderId=${workOrderId}`, this.getRequestHeaders())
    }

    getReservedPartsByWorkFlowWOId(WorkFlowWorkOrderId, statusId) {
        let urlType;
        if (statusId == 1) {
            urlType = 'getreservedparts'
        } else if (statusId == 2) {
            urlType = 'getissuedparts'
        } else if (statusId == 3) {
            urlType = 'getreservedissuesparts'
        } else if (statusId == 4) {
            urlType = 'getunissuedParts'
        } else if (statusId == 5) {
            urlType = 'getunreservedparts'
        }

        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/${urlType}?workFlowWorkOrderId=${WorkFlowWorkOrderId}&statusId=${statusId}`, this.getRequestHeaders())

        // if (statusId == 1)
        //     return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/getreservedparts?workFlowWorkOrderId=${WorkFlowWorkOrderId}&statusId=${statusId}`)
        // else if (statusId == 2)
        //     return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/getissuedparts?workFlowWorkOrderId=${WorkFlowWorkOrderId}&statusId=${statusId}`)
        // else if (statusId == 3)
        //     return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/getreservedissuesparts?workFlowWorkOrderId=${WorkFlowWorkOrderId}&statusId=${statusId}`)
        // else if (statusId == 4)
        //     return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/getunissuedParts?workFlowWorkOrderId=${WorkFlowWorkOrderId}&statusId=${statusId}`)
        // else if (statusId == 5)
        //     return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/getunreservedparts?workFlowWorkOrderId=${WorkFlowWorkOrderId}&statusId=${statusId}`)
        // else
        //     return null;
    }

    saveReservedPartorIssue(alternatePart) {
        return this.http.post<any>(`${this.configurations.baseUrl}/api/workOrder/savereserveissuesparts`, JSON.stringify(alternatePart), this.getRequestHeaders());
    }

    assetsCheckInByWorkOrderAssetsId(assetcheckin) {
        //return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/saveassetcheckedin?WorkOrderAssetId=${workOrderAssetId}&checkedInById=${employeeId}&checkedInDate=${checkedInDate}&updatedBy=${updatedBy}`)  
        return this.http.post<any>(`${this.configurations.baseUrl}/api/workOrder/saveassetcheckedin`, JSON.stringify(assetcheckin), this.getRequestHeaders());
    }

    assetsCheckOutByWorkOrderAssetsId(assetcheckout) {
        // return this.http.post<any>(`${this.configurations.baseUrl}/api/workOrder/saveassetcheckedout?WorkOrderAssetId=${workOrderAssetId}&checkedInById=${employeeId}&checkedInDate=${checkedInDate}&updatedBy=${updatedBy}`)  
        return this.http.post<any>(`${this.configurations.baseUrl}/api/workOrder/saveassetcheckedout`, JSON.stringify(assetcheckout), this.getRequestHeaders());
    }

    deleteWorkOrderAssetByAssetId(workOrderAssetId, updatedBy) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/deleteworkorderasset?workOrderAssetId=${workOrderAssetId}&updatedBy=${updatedBy}`, this.getRequestHeaders())
    }

    createQuotation(data) {
        return this.http.post(`${this.configurations.baseUrl}/api/workOrder/createworkorderquote`, JSON.stringify(data), this.getRequestHeaders())
    }




}