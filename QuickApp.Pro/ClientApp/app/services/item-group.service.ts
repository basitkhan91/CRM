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
import { ItemgroupEndpointService } from './item-group-endpoint.service';
import { Itemgroup } from '../models/item-group.model';
import { AuditHistory } from '../models/audithistory.model';




export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };

@Injectable()
export class ItemGroupService {
    public static readonly roleAddedOperation: RolesChangedOperation = "add";
    public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
    public static readonly roleModifiedOperation: RolesChangedOperation = "modify";

    private _rolesChanged = new Subject<RolesChangedEventArg>();

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private ItemgroupEndpoint: ItemgroupEndpointService) { }

    getWorkFlows() {
        return Observable.forkJoin(
            this.ItemgroupEndpoint.getItemgroupEndpoint<Itemgroup[]>());
    }

    newAction(itemgroup: any) {
        return this.ItemgroupEndpoint.getNewItemgroupEndpoint<any>(itemgroup);
    }

    getAction(actionId?: number) {
        return this.ItemgroupEndpoint.getEditActionEndpoint<Itemgroup>(actionId);
    }

    updateAction(action: Itemgroup) {
        return this.ItemgroupEndpoint.getUpdateActionEndpoint(action, action.itemGroupId);
    }

    deleteAcion(actionId: number) {

        return this.ItemgroupEndpoint.getDeleteActionEndpoint(actionId);

    }
    historyAcion(actionId: number) {
        return Observable.forkJoin(this.ItemgroupEndpoint.getHistoryActionEndpoint<AuditHistory[]>(actionId));
    }

}