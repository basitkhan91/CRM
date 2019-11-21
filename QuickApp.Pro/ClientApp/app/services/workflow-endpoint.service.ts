﻿// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class WorkFlowEndpoint extends EndpointFactory {


	private readonly _workflowActionsUrl: string = "/api/WorkflowAction/Get";
	private readonly _workflowUrl: string = "/api/WorkflowAction/GetWorkFlows";
	public readonly _workFlowMaterialTypes = "/api/WorkflowAction/GetMaterialType";
	private readonly _actionAttributes: string = "/api/WorkflowAction/GetActionAttributes";
	private readonly _workflowactionAttributes: string = "/api/WorkflowAction/GetWorkflowActionAttributes";
	private readonly _workflowMaterail: string = "/api/WorkflowAction/GetWorkflowMaterail";
	private readonly _workflowEquipmet: string = "/api/WorkflowAction/GetWorkflowequipment";
	private readonly _workflowExpertise: string = "/api/WorkflowAction/GetWorkflowExpertise";
	private readonly _workflowCharge: string = "/api/WorkflowAction/GetWorkflowCharge";
	private readonly _workflowActionsNewUrl: string = "/api/WorkflowAction/Get";
	private readonly _saveMaterialList: string = "/api/WorkflowAction/SaveMaterialList";
	private readonly _saveChargeList: string = "/api/WorkflowAction/SaveChargeList";

	private readonly _saveEquipment: string = "/api/WorkflowAction/SaveEquipment";
	private readonly _saveExclusions: string = "/api/WorkflowAction/SaveExclusions";
	private readonly _saveExpertise: string = "/api/WorkflowAction/SaveExpertise";
	private readonly _addWorkFlow: string = "/api/WorkflowAction/AddWorkFlow";
	private readonly _addworkFlowactionattributes: string = "/api/WorkflowAction/AddWorkFlowActionAttributes";

	get workflowActionsUrl() { return this.configurations.baseUrl + this._workflowActionsUrl; }
	get workflowsUrl() { return this.configurations.baseUrl + this._workflowUrl; }
	get workFlowMaterialTypes() { return this.configurations.baseUrl + this._workFlowMaterialTypes; }
	get workflowactionAttributes() { return this.configurations.baseUrl + this._workflowactionAttributes; }
	get workflowMaterails() { return this.configurations.baseUrl + this._workflowMaterail; }
	get workflowEquipment() { return this.configurations.baseUrl + this._workflowEquipmet; }
	get workflowExpertise() { return this.configurations.baseUrl + this._workflowExpertise; }
	get workflowCharge() { return this.configurations.baseUrl + this._workflowCharge; }
	get actionAttributes() { return this.configurations.baseUrl + this._actionAttributes; }


	constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

		super(http, configurations, injector);
	}

	getNewWorkFlowEndpoint<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._workflowActionsNewUrl, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewWorkFlowEndpoint(userObject));
			});
	}
	addMatList<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._saveMaterialList, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewWorkFlowEndpoint(userObject));
			});
	}
	addchargelist<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._saveChargeList, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewWorkFlowEndpoint(userObject));
			});
	}


	addEquipmentList<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._saveEquipment, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewWorkFlowEndpoint(userObject));
			});
	}
	addExclusionsList<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._saveExclusions, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewWorkFlowEndpoint(userObject));
			});
	}

	addExpertiseList<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._saveExpertise, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewWorkFlowEndpoint(userObject));
			});
	}





	addWorkflowdetails<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._addWorkFlow, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewWorkFlowEndpoint(userObject));
			});
	}

	addWorkflowactionattributes<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._addworkFlowactionattributes, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewWorkFlowEndpoint(userObject));
			});
	}

	getWorkFlowEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this.workflowsUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getWorkFlowEndpoint());
			});
	}

	getWorkFlowActions<T>(): Observable<T> {

		return this.http.get<T>(this.workflowActionsUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getWorkFlowEndpoint());
			});

	}
	getMaterialTypes<T>(): Observable<T> {

		return this.http.get<T>(this.workFlowMaterialTypes, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getWorkFlowEndpoint());
			});

	}
	getworkflowActionAttributesCollection<T>(workflowId: number): Observable<T> {
		let url = `${this.workflowactionAttributes}/${workflowId}`;

		return this.http.get<T>(url, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getWorkFlowEndpoint());
			});

	}
	getworkflowMaterailCollection<T>(): Observable<T> {

		return this.http.get<T>(this.workflowMaterails, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getWorkFlowEndpoint());
			});

	}

	getworkflowEquipmentCollection<T>(): Observable<T> {

		return this.http.get<T>(this.workflowEquipment, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getWorkFlowEndpoint());
			});

	}

	getChargeListcollection<T>(): Observable<T> {

		return this.http.get<T>(this.workflowCharge, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getWorkFlowEndpoint());
			});

	}
	getworkflowExpertiseCollection<T>(): Observable<T> {

		return this.http.get<T>(this.workflowExpertise, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getWorkFlowEndpoint());
			});

	}

	getActionAttributesCollection<T>(): Observable<T> {

		return this.http.get<T>(this.actionAttributes, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getWorkFlowEndpoint());
			});

	}

	getWorkFlowDataById(workFlowId) {
		return this.http.get<any>(`${this.configurations.baseUrl}/api/workflow/getWorkFlow/${workFlowId}`)
	}


	getWorkFlowDataByIdForEdit(workFlowId) {
		return this.http.get<any>(`${this.configurations.baseUrl}/api/workflowAction/GetWorkFlowbyIdforEdit?workFlowId=${workFlowId}`)
	}



}