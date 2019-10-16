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

import { JobTitleEndpontService } from './job-title-endpoint.service';
import { JobTitle } from '../models/jobtitle.model';
import { JobType } from '../models/jobtype.model';
import { AuditHistory } from '../models/audithistory.model';

export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };

@Injectable()
export class JobTitleService {
    public static readonly roleAddedOperation: RolesChangedOperation = "add";
    public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
    public static readonly roleModifiedOperation: RolesChangedOperation = "modify";

    private _rolesChanged = new Subject<RolesChangedEventArg>();

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private jobTitleEndpoint: JobTitleEndpontService) { }

    getWorkFlows() {
        return Observable.forkJoin(
            this.jobTitleEndpoint.getJobtitleEndpoint<JobTitle[]>());
    }

    getjobTypeWorkFlows() {
        return Observable.forkJoin(
            this.jobTitleEndpoint.getJobtypeEndpoint<JobType[]>());
    }
    newAction(action: JobTitle) {
        return this.jobTitleEndpoint.getNewjobtitleEndpoint<JobTitle>(action);
    }

    newAction2(action: JobType) {
        return this.jobTitleEndpoint.getNewjobtitleEndpoint2<JobType>(action);
    }

    getAction(actionId?: number) {
        return this.jobTitleEndpoint.getEditJobTitleEndpoint<JobTitle>(actionId);
    }

    updateAction(action: JobTitle) {     
        return this.jobTitleEndpoint.getUpdateJobtitleEndpoint(action, action.jobTitleId);
    }

    deleteAcion(actionId: number) {

		return this.jobTitleEndpoint.getDeleteJobTitleEndpoint(actionId);

    }

	historyJobTitle(actionId: number) {
		return Observable.forkJoin(this.jobTitleEndpoint.getHistoryJobTitleEndpoint<AuditHistory[]>(actionId));
    }

    
    getJobTitleAudit(jobTitleId: number) {
        return this.jobTitleEndpoint.getJobTitleAuditById<any>(jobTitleId);
    }


}