﻿
import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { laborAndOverheadCostEndpointservice } from './laborandoverheadcost-endpoint.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';

import { AuditHistory } from '../models/audithistory.model';

export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };

@Injectable()
export class LaborAndOverheadCostService {
	public static readonly roleAddedOperation: RolesChangedOperation = "add";
	public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
	public static readonly roleModifiedOperation: RolesChangedOperation = "modify";

	private _rolesChanged = new Subject<RolesChangedEventArg>();

	constructor(
		private router: Router,
		private http: HttpClient,
		private authService: AuthService,
		private laborandoverheadcostEndpoint: laborAndOverheadCostEndpointservice) { }

	getWorkFlows() {
		return Observable.forkJoin(
			this.laborandoverheadcostEndpoint.getLaborAndOverheadCostEndpoint<any[]>());
	}

	historyLaborandOverheadcost(laborOverloadCostId: number) {
		return Observable.forkJoin(this.laborandoverheadcostEndpoint.getHistoryLaborandOverheadCostEndpoint<any>(laborOverloadCostId));
	}

	newLaborandOverheadcost(action: any) {
		return this.laborandoverheadcostEndpoint.getNewLaborAndOverheadCostEndpoint<any>(action);
	}

	getLaborandOverheadcost(LaborOverloadCostId?: number) {
		return this.laborandoverheadcostEndpoint.getEditLaborAndOverheadCostEndpoint<any>(LaborOverloadCostId);
	}

	updateLaborandOverheadcost(action: any) {
		return this.laborandoverheadcostEndpoint.getUpdateLaborAndOverheadCostEndpoint(action, action.laborOverloadCostId);
	}

	deleteLaborandOverheadcost(laborOverloadCostId: number) {

		return this.laborandoverheadcostEndpoint.getDeleteLaborAndOverheadCostEndpoint(laborOverloadCostId);

	}


}