import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../../services/configuration.service';
import { Observable } from 'rxjs';
import { EndpointFactory } from '../../services/endpoint-factory.service';
import { UserRole } from './ModuleHierarchyMaster.model';


@Injectable()
export class UserRoleEndPointService extends EndpointFactory {

    private readonly getAllModuleURL: string = "api/userrolepermission/getAllModuleHierarchy";
    private readonly addUserRoleURL: string = "api/userrolepermission/addUserRole";

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
        super(http, configurations, injector);
    }

    getAllModuleHierarchies<T>(): Observable<T> {
        return this.http.get<T>(this.getAllModuleURL, this.getRequestHeaders()).catch(error => {
            return this.handleError(error, () => this.getAllModuleHierarchies());
        });
    }
    
    addUserRole<T>(userRole: UserRole): Observable<T> {
        let endpointUrl = this.addUserRoleURL;

        return this.http.post<T>(endpointUrl, JSON.stringify(userRole), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.addUserRole(userRole));
            });
    }
}