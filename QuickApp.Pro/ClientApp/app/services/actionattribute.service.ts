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

import { ActionEndpoint } from './action-endpoint.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { ActionAttributeEndpointService } from './actionattribute-endpoint';
import { ActionAttribute } from '../models/actionattribute.model';
import { AuditHistory } from '../models/audithistory.model';

export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };

@Injectable()
export class ActionAttributeService {
    public static readonly roleAddedOperation: RolesChangedOperation = "add";
    public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
    public static readonly roleModifiedOperation: RolesChangedOperation = "modify";

    private _rolesChanged = new Subject<RolesChangedEventArg>();

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private actionEndpoint: ActionAttributeEndpointService) { }

    getWorkFlows() {
        return Observable.forkJoin(
            this.actionEndpoint.getActionattributeEndpoint<ActionAttribute[]>());
    }
    newAction(action: ActionAttribute) {
        return this.actionEndpoint.getNewGatecodeEndpoint<ActionAttribute>(action);
    }

    getAction(actionId?: number) {
        return this.actionEndpoint.getEditActionEndpoint<ActionAttribute>(actionId);
    }

    updateAction(action: ActionAttribute) {
        return this.actionEndpoint.getUpdateActionEndpoint(action, action.actionAttributeId);
    }

    deleteAcion(actionId: number) {

        return this.actionEndpoint.getDeleteActionEndpoint(actionId);

    }
    historyAcion(actionId: number) {
        return Observable.forkJoin(this.actionEndpoint.getHistoryActionEndpoint<AuditHistory[]>(actionId));
    }

    getTaskAttributeAuditeDetails(actionAttributeId: number) {
        return this.actionEndpoint.getTaskAttributeAuditeDetails<any[]>(actionAttributeId);
    }

}