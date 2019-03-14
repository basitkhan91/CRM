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


import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';

import { GateCodeComponent } from '../components/gate-code/gate-code.component';
import { GatecodeEndpointService } from './gatecode-endpoint.service';
import { GateCode } from '../models/gatecode.model';
import { AuditHistory } from '../models/audithistory.model';


export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };

@Injectable()
export class GatecodeService {
    public static readonly roleAddedOperation: RolesChangedOperation = "add";
    public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
    public static readonly roleModifiedOperation: RolesChangedOperation = "modify";

    private _rolesChanged = new Subject<RolesChangedEventArg>();

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private gateCodeEndpoint: GatecodeEndpointService) { }

    getWorkFlows() {
        return Observable.forkJoin(
            this.gateCodeEndpoint.getGateCodeEndpoint<GateCode[]>());
    }

    newAction(action: GateCode) {
        return this.gateCodeEndpoint.getNewGatecodeEndpoint<GateCode>(action);
    }

    getAction(actionId?: number) {
        return this.gateCodeEndpoint.getEditActionEndpoint<GateCode>(actionId);
    }

    updateAction(action: GateCode) {
        return this.gateCodeEndpoint.getUpdateActionEndpoint(action, action.gateCodeId);
    }

    deleteAcion(actionId: number) {

        return this.gateCodeEndpoint.getDeleteActionEndpoint(actionId);

    }
    historyAcion(actionId: number) {
        return Observable.forkJoin(this.gateCodeEndpoint.getHistoryActionEndpoint<AuditHistory[]>(actionId));
    }

}