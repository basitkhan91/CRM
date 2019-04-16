
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
import { AssetIntangibleTypeEndpointService } from './assetIntangibletype-endpoint.service';


export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };

@Injectable()
export class AssetIntangibleTypeService {
    public static readonly roleAddedOperation: RolesChangedOperation = "add";
    public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
    public static readonly roleModifiedOperation: RolesChangedOperation = "modify";

    private _rolesChanged = new Subject<RolesChangedEventArg>();
    public intangibleTypeEditCollection: any;
    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private assettypeEndpoint: AssetIntangibleTypeEndpointService) { }

    getAll() {
        return Observable.forkJoin(
            this.assettypeEndpoint.getAllintangibleTypes<any[]>());
    }

    getById(intangibleTypeId: number) {
        return Observable.forkJoin(
            this.assettypeEndpoint.getintangibleTypeById<any>(intangibleTypeId)
        );
    }

    add(intangibleType: any) {
        return this.assettypeEndpoint.addintangibleType<any>(intangibleType);
    }

    update(intangibleType: any) {
        return this.assettypeEndpoint.updateintangibleType<any>(intangibleType);
    }

    remove(intangibleTypeId: number) {
        return this.assettypeEndpoint.removeintangibleTypeById(intangibleTypeId);
    }
   


}