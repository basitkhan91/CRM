import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';
import { User } from '../models/user.model';



import { ManufacturerEndpoint } from './manufacturer-endpoint.service';
import { Role } from '../models/role.model';

export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };

@Injectable()
export class ManufacturerService {
	public static readonly roleAddedOperation: RolesChangedOperation = "add";
	public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
	public static readonly roleModifiedOperation: RolesChangedOperation = "modify";
	private _rolesChanged = new Subject<RolesChangedEventArg>();

	constructor(
		private router: Router,
		private http: HttpClient,
		private authService: AuthService,
		private manufacturerEndpoint: ManufacturerEndpoint) { }

	getWorkFlows() {
		return Observable.forkJoin(
			this.manufacturerEndpoint.getManufacturerEndpoint<any[]>());
	}

	historyManufacturer(ManufacturerId: number) {
		return Observable.forkJoin(this.manufacturerEndpoint.getHistoryManufacturerIdEndpoint<any>(ManufacturerId));
	}

	newManufacturer(action: any) {
		return this.manufacturerEndpoint.getNewGatecodeEndpoint<any>(action);
	}

	getManufacturer(ManufacturerId?: number) {
		return this.manufacturerEndpoint.getEditManufacturerEndpoint<any>(ManufacturerId);
	}

	updateManufacturer(action: any) {
		return this.manufacturerEndpoint.getUpdateManufacturerEndpoint(action, action.manufacturerId);
	}

	deleteManufacturer(manufacturerId: number) {

		return this.manufacturerEndpoint.getDeleteManufacturerIdEndpoint(manufacturerId);

	}

}