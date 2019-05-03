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

import { PublicationEndpointService } from './publication-endpoint.service';
import { Publication } from '../models/publication.model';
import { AuditHistory } from '../models/audithistory.model';


export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };

@Injectable()
export class PublicationService {
    public static readonly roleAddedOperation: RolesChangedOperation = "add";
    public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
    public static readonly roleModifiedOperation: RolesChangedOperation = "modify";

    private _rolesChanged = new Subject<RolesChangedEventArg>();

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private publicationEndpoint: PublicationEndpointService) { }

    getWorkFlows() {
        return Observable.forkJoin(
            this.publicationEndpoint.getpublicationEndpoint<Publication[]>());
    }

    newAction(action: Publication) {
        return this.publicationEndpoint.getNewpublicationEndpoint<Publication>(action);
    }

    getAction(actionId?: any) {
        return this.publicationEndpoint.getEditActionEndpoint<Publication>(actionId);
    }

    updateAction(action: Publication) {
        return this.publicationEndpoint.getUpdateActionEndpoint(action, action.publicationRecordId);
    }

    deleteAcion(actionId: any) {

        return this.publicationEndpoint.getDeleteActionEndpoint(actionId);

    }
    historyAcion(actionId: number) {
        return Observable.forkJoin(this.publicationEndpoint.getHistoryActionEndpoin<AuditHistory[]>(actionId));
    }

    getPublicationAudit(publicationId: number) {
        return this.publicationEndpoint.getPublincationAuditById<any>(publicationId);
    }


}