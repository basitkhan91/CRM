﻿
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class ReceivingCustomerWorkEndpoint extends EndpointFactory {


	private readonly _actionsUrl: string = "/api/ReceivingCustomerWork/Get";
	private readonly _actionsUrlNew: string = "/api/ReceivingCustomerWork/receivingCustomerWork";
	private readonly _actionsUpdateUrlNew: string = "/api/ReceivingCustomerWork/UpdatereceivingCustomerWork";
	private readonly _actionDeleteUrlNew: string = "/api/ReceivingCustomerWork/deletereceivingCustomerWork";
    private readonly _actionsUrlAuditHistory: string = "/api/ReceivingCustomerWork/auditHistoryById";
    private readonly _actionsTimeUrlNew: string = "/api/ReceivingCustomerWork/PostTimeLine";
    private readonly _TimeLifeUpdate: string = "/api/ReceivingCustomerWork/timeLifeUpdate";

	// private readonly _workflowActionsNewUrl: string = "/api/WorkflowAction/Get";
	// private readonly _actionsUrlNew: string = "/api/Action/actions";
	get actionsUrl() { return this.configurations.baseUrl + this._actionsUrl; }

	constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

		super(http, configurations, injector);
	}

	getReasonEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this.actionsUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getReasonEndpoint());
			});
	}
	getNewReasonEndpoint<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._actionsUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewReasonEndpoint(userObject));
			});
	}

	getHistoryReasonEndpoint<T>(receivingCustomerWorkId: number): Observable<T> {
		let endpointUrl = `${this._actionsUrlAuditHistory}/${receivingCustomerWorkId}`;

		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getHistoryReasonEndpoint(receivingCustomerWorkId));
			});
	}

	getEditReasonEndpoint<T>(receivingCustomerWorkId?: number): Observable<T> {
		let endpointUrl = receivingCustomerWorkId ? `${this._actionsUrl}/${receivingCustomerWorkId}` : this._actionsUrl;

		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getEditReasonEndpoint(receivingCustomerWorkId));
			});
	}

	getUpdateReasonEndpoint<T>(roleObject: any, receivingCustomerWorkId: number): Observable<T> {
		//let endpointUrl = `${this._actionsUpdateUrlNew}/${receivingCustomerWorkId}`;
        let json = {
            "receivingCustomerWorkId": roleObject.receivingCustomerWorkId,
            "customerId": roleObject.customerId,
            "receivingCustomerNumber": roleObject.receivingCustomerNumber,
            "customerReference": roleObject.customerReference,
            "isSerialized": roleObject.isSerialized,
            "itemMasterId": roleObject.itemMasterId,
            "customerClassificationId": roleObject.customerClassificationId,
            "scopeId": roleObject.scopeId,
            "priorityId": roleObject.priorityId,
            "statusId": roleObject.statusId,
            "contactId": roleObject.contactId,
            "changePartNumber": roleObject.changePartNumber,
            "partCertificationNumber": roleObject.partCertificationNumber,
            "quantity": roleObject.quantity,
            "conditionId": roleObject.conditionId,
            "siteId": roleObject.siteId,
            "binId": roleObject.binId,
            "shelfId": roleObject.shelfId,
            "warehouseId": roleObject.warehouseId,
            "workOrderId": roleObject.workOrderId,
            "locationId": roleObject.locationId,
            "owner": roleObject.owner,
            "ownerType": roleObject.ownerType,
            "isMFGDate": roleObject.isMFGDate,
            "isCustomerStock": roleObject.isCustomerStock,
            "traceableToCustomerId": roleObject.traceableToCustomerId,
            "traceableToVendorId": roleObject.traceableToVendorId,
            "traceableToOther": roleObject.traceableToOther,
            "manufacturingDate": roleObject.manufacturingDate,
            "expirationDate": roleObject.expirationDate,
            "timeLifeDate": roleObject.timeLifeDate,
            "timeLifeOrigin": roleObject.timeLifeOrigin,
            "timeLifeCyclesId": roleObject.timeLifeCyclesId,
            "manufacturingTrace": roleObject.manufacturingTrace,
            "manufacturingLotNumber": roleObject.manufacturingLotNumber,
            "reasonForRemoval": roleObject.reasonForRemoval,
            "employeeId": roleObject.employeeId,
            "serialNumber": roleObject.serialNumber,
            "certifiedBy": roleObject.certifiedBy,
            "tagDate": roleObject.tagDate,
            "tagType": roleObject.tagType,
            "traceableTo": roleObject.traceableTo,
            "obtainFrom": roleObject.obtainFrom,
            "obtainFromType": roleObject.obtainFromType,
            "isTimeLife": roleObject.isTimeLife,
            "timeLifeId": roleObject.timeLifeId,
            "manufacturer": roleObject.manufacturer,
            "manufacturerLotNumber": roleObject.manufacturerLotNumber,
            "companyId": roleObject.companyId,
            "businessUnitId": roleObject.businessUnitId,
            "divisionId": roleObject.divisionId,
            "departmentId": roleObject.departmentId,
            "obtainFromVendorId": roleObject.obtainFromVendorId,
            "obtainFromCustomerId": roleObject.obtainFromCustomerId,
            "obtainFromOther": roleObject.obtainFromOther,
            "masterCompanyId": roleObject.masterCompanyId ,
            "isActive": roleObject.isActive,
            "isDelete": roleObject.isDelete,
            "isExpirationDate": roleObject.isExpirationDate,
            "partNumber": roleObject.partNumber,
            "partDescription": roleObject.partDescription,
            "createdBy": roleObject.createdBy,
            "updatedBy": roleObject.updatedBy,
            "updatedDate": roleObject.updatedDate ,
            "createdDate": roleObject.createdDate,
            "name": roleObject.name,
            "traceableToType": roleObject.traceableToType,
            "workPhone": roleObject.workPhone
        }

        return this.http.put<T>(this._actionsUpdateUrlNew, JSON.stringify(json), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdateReasonEndpoint(roleObject, receivingCustomerWorkId));
			});
	}

	getDeleteReasonEndpoint<T>(receivingCustomerWorkId: number): Observable<T> {
		let endpointUrl = `${this._actionDeleteUrlNew}/${receivingCustomerWorkId}`;

		return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getDeleteReasonEndpoint(receivingCustomerWorkId));
			});
	}
    getNewTimeAdjustmentEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._actionsTimeUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewTimeAdjustmentEndpoint(userObject));
            });
    }
    getUpdatestockLineTimeLifeEndpoint<T>(roleObject: any, timeLifeCyclesId: number): Observable<T> {
        //let endpointUrl = `${this._TimeLifeUpdate}/${roleObject.timeLifeCyclesId}`;

        return this.http.put<T>(this._TimeLifeUpdate, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdatestockLineTimeLifeEndpoint(roleObject, timeLifeCyclesId));
            });
    }
}


