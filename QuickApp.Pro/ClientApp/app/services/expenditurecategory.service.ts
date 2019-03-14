// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { ExpenditureCategoryEndpoint } from './expenditurecategory-endpoint.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { ExpenditureCategory } from '../models/expenditurecategory.model';
import { AuditHistory } from '../models/audithistory.model';

export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };

@Injectable()
export class ExpenditureCategoryService {
    public static readonly roleAddedOperation: RolesChangedOperation = "add";
    public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
    public static readonly roleModifiedOperation: RolesChangedOperation = "modify";

    private _rolesChanged = new Subject<RolesChangedEventArg>();

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private expenditurecategoryEndpoint: ExpenditureCategoryEndpoint) { }

    getExpenditureCategoryList() {
        return Observable.forkJoin(
            this.expenditurecategoryEndpoint.getExpenditureCategoryEndpoint<ExpenditureCategory[]>());
    }
    newExpenditureCategory(expenditurecategory: ExpenditureCategory) {
        return this.expenditurecategoryEndpoint.getNewExpenditureCategoryEndpoint<ExpenditureCategory>(expenditurecategory);
    }

    getExpenditureCategory(expenditurecategoryId?: number) {
        return this.expenditurecategoryEndpoint.getEditExpenditureCategoryEndpoint<ExpenditureCategory>(expenditurecategoryId);
    }

    updateExpenditureCategory(expenditurecategory: ExpenditureCategory) {
        return this.expenditurecategoryEndpoint.getUpdateExpenditureCategoryEndpoint(expenditurecategory, expenditurecategory.expenditureCategoryId);
    }

    deleteExpenditureCategory(priorityId: number) {

        return this.expenditurecategoryEndpoint.getDeleteExpenditureCategoryEndpoint(priorityId);

    }
    historyExpenditureCategory(expenditurecategoryId: number) {
        return Observable.forkJoin(this.expenditurecategoryEndpoint.getHistoryExpenditureCategoryEndpoint<AuditHistory[]>(expenditurecategoryId));
    }

}