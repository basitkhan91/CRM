﻿// ===============================
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
import { ItemClassificationEndpointService } from './item-classification-endpoint.service';
import { ItemClassificationModel } from '../models/item-classification.model';
import { AuditHistory } from '../models/audithistory.model';




export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };

@Injectable()
export class ItemClassificationService {
    public static readonly roleAddedOperation: RolesChangedOperation = "add";
    public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
    public static readonly roleModifiedOperation: RolesChangedOperation = "modify";

    private _rolesChanged = new Subject<RolesChangedEventArg>();

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private itemclassificationEndpoint: ItemClassificationEndpointService) { }

    getWorkFlows() {
        return Observable.forkJoin(
            this.itemclassificationEndpoint.getitemclassificationEndpoint<ItemClassificationModel[]>());
    }

    newAction(action: ItemClassificationModel) {
        return this.itemclassificationEndpoint.getNewitemclassificationEndpoint<ItemClassificationModel>(action);
    }

    getAction(actionId?: number) {
        return this.itemclassificationEndpoint.getEditActionEndpoint<ItemClassificationModel>(actionId);
    }

    updateAction(action: any) {
        return this.itemclassificationEndpoint.getUpdateActionEndpoint(action, action.itemClassificationId);
    }

    deleteAcion(actionId: number) {

        return this.itemclassificationEndpoint.getDeleteActionEndpoint(actionId);

    }
    historyAcion(actionId: number) {
        return Observable.forkJoin(this.itemclassificationEndpoint.getHistoryActionEndpoint<AuditHistory[]>(actionId));
    }
    getItemClassificationAudit(classificationAuditId: number) {
        return this.itemclassificationEndpoint.getItemClassificationDataAuditById<any>(classificationAuditId);
    }
}