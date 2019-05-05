// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { Injectable } from '@angular/core';
//import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRoleEndPointService } from './user-role-endpoint.service';
import { ModuleHierarchyMaster, UserRole } from './ModuleHierarchyMaster.model';

@Injectable()
export class UserRoleService {

    constructor(
        private router: Router,
        private http: HttpClient,
        //private authService: AuthService,
        private userRoleEndpoint: UserRoleEndPointService) { }

    getAllModuleHierarchies() {
        return Observable.forkJoin(
            this.userRoleEndpoint.getAllModuleHierarchies<ModuleHierarchyMaster[]>());
    }

    add(userRole: UserRole) {
        return this.userRoleEndpoint.addUserRole<UserRole>(userRole);
    }

}