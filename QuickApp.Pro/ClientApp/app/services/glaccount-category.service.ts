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
import { Role } from '../models/role.model';
import { GLAccountCategoryEndpointservice } from './glaccountcategory-endpoint.service';


import { AuditHistory } from '../models/audithistory.model';

export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };

@Injectable()
export class GLAccountCategoryService {
	public static readonly roleAddedOperation: RolesChangedOperation = "add";
	public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
	public static readonly roleModifiedOperation: RolesChangedOperation = "modify";

	private _rolesChanged = new Subject<RolesChangedEventArg>();

	constructor(
		private router: Router,
		private http: HttpClient,
		private authService: AuthService,
		private glaccountcategoryEndpoint: GLAccountCategoryEndpointservice) { }

	getWorkFlows() {
		return Observable.forkJoin(
			this.glaccountcategoryEndpoint.getGLaccountcategoryEndpoint<any[]>());
	}
	newGLAccountCategory(action: any) {
		return this.glaccountcategoryEndpoint.getNewGatecodeEndpoint<any>(action);
	}

	getGLAccountCategory(GLAccountCategoryId?: number) {
		return this.glaccountcategoryEndpoint.getEditGLAccountCategoryEndpoint<any>(GLAccountCategoryId);
	}

	updateGLAccountCategory(action: any) {
		return this.glaccountcategoryEndpoint.getUpdateGLAccountCategoryEndpoint(action, action.glAccountCategoryId);
	}

	deleteGLAccountCategory(glAccountCategoryId: number) {

		return this.glaccountcategoryEndpoint.getDeleteGLAccountCategoryEndpoint(glAccountCategoryId);

	}
	historyGLAccountCategory(GLAccountCategoryId: number) {
		return Observable.forkJoin(this.glaccountcategoryEndpoint.getHistoryGLAccountCategoryEndpoint<AuditHistory[]>(GLAccountCategoryId));
	}
    
    getGlAccountcategoryAudit(GLAccountCategoryId: number) {
        return this.glaccountcategoryEndpoint.getGlAccountCategoryAuditById<any>(GLAccountCategoryId);
    }

}