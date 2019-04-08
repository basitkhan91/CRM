﻿
import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Role } from '../../models/role.model';
import { AuthService } from '../auth.service';
import { AuditHistory } from '../../models/audithistory.model';
import { AssetTypeEndpointService } from './assettype-endpoint.service';

export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };

@Injectable()
export class AssetTypeService {
    public static readonly roleAddedOperation: RolesChangedOperation = "add";
    public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
    public static readonly roleModifiedOperation: RolesChangedOperation = "modify";

    private _rolesChanged = new Subject<RolesChangedEventArg>();

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private assettypeEndpoint: AssetTypeEndpointService) { }

    getWorkFlows() {
        return Observable.forkJoin(
            this.assettypeEndpoint.getGateCodeEndpoint<any[]>());
    }

    newAction(action: any) {
        return this.assettypeEndpoint.getNewGatecodeEndpoint<any>(action);
    }

    getAction(actionId?: number) {
        return this.assettypeEndpoint.getEditActionEndpoint<any>(actionId);
    }

    updateAction(action: any) {
        return this.assettypeEndpoint.getUpdateActionEndpoint(action, action.gateCodeId);
    }

    deleteAcion(actionId: number) {

        return this.assettypeEndpoint.getDeleteActionEndpoint(actionId);

    }
    historyAcion(actionId: number) {
        return Observable.forkJoin(this.assettypeEndpoint.getHistoryActionEndpoint<AuditHistory[]>(actionId));
    }

}