﻿
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class EmployeeEndpoint extends EndpointFactory {


	private readonly _actionsUrl: string = "/api/Employee/Get";
	private readonly _getView: string = "/api/Employee/GetforView";
	
	private readonly _rolesUrl: string = "/api/Employee/RolesGet";
	private readonly _userRolelevelList: string = "/api/Employee/UserRolelevelList";
	private readonly _shiftUrl: string = "/api/Employee/shiftGet";
	private readonly _CountriesUrl: string = "/api/Employee/CountriesGet";
	private readonly _EmployeeLeaveTypeUrl: string = "/api/Employee/EmployeeLeaveTypeGet";
	private readonly _EmployeeTrainingTypeUrl: string = "/api/Employee/GetEmployeeTrainingType";
    private readonly _actionsUrlNew: string = "/api/Employee/employeepost";
    private readonly _actionsUrlNewUpdate: string = "/api/Employee/employeelistgpost";

    
    private readonly _certificationUrlNew: string = "/api/Employee/employeecertificationpost";
    private readonly _actionsUrlLeaveTypeMap: string = "/api/Employee/employeepostAddLeaveType";
    private readonly _actionsUrlShiftTypeMap: string = "/api/Employee/employeepostAddShiftType";
	private readonly _trainUrlNew: string = "/api/Employee/EmpTrainingGet";
	private readonly _trainingTypeUrlNew: string = "/api/Employee/empTrainingTypesGet";
    private readonly _actionsUrlAuditHistory: string = "/api/Employee/auditHistoryById";
	private readonly _certifiUrlNew: string = "/api/Employee/employeecertifi";
	private readonly _addRolesData: string = "/api/Employee/AddRolesData";
	private readonly _trainingUrlNew: string = "/api/Employee/employeetraingpost";
    private readonly _employeeUpdateUrl: string = "/api/Employee/employeelistgpost";
    private readonly _certifiUpdateUrl: string = "/api/Employee/certifilistgpost";
    private readonly _trainingUpdateUrl: string = "/api/Employee/traininglistgpost";
	private readonly _updateActiveInactive: string = "/api/Employee/employeeUpdateforActive";
	private readonly _deleteRoleById: string = "/api/Employee/DeleteRoleById";
	private readonly _getMultipleShiftvaluesUrl: string = "/api/Employee/multiShiftValuesGet";
	private readonly _aircraftTypeUrl: string = "/api/Employee/aircraftTypeGet";
	private readonly _getLeaveListUrl: string = "/api/Employee/leaveListGet";
	private readonly _newLeavesUrlNew: string = "/api/Employee/newLeavepost";
	private readonly _multishiftsdataUrl: string = "/api/Employee/saveShifts";
	private readonly _getemployeeshifturl: string = "/api/Employee/getshiftdata";
	private readonly _getemployeeLeaveurl: string = "/api/Employee/getleavelistdata";
	private readonly _multileavesurl: string = "/api/Employee/savemultileavetypes";
	private readonly _shiftsurl: string = "/api/Employee/saveShifts";
    private readonly _getMultiLeaveListUrl: string = "/api/Employee/GetLeaveData";
    private readonly _getAllEmployeeInfoURL: string = "/api/Employee/GetAllEmployeeInfo";
	private readonly _getEmpTrainingInfo: string = "/api/Employee/EmpTrainingGet";
	private readonly _getEmpDataByid: string = "/api/Employee/employeedata";
 
    

	get actionsUrl() { return this.configurations.baseUrl + this._actionsUrl; }
	get getView() { return this.configurations.baseUrl + this._getView; }
	get rolesUrl() { return this.configurations.baseUrl + this._rolesUrl; }
	get userrolevelList() { return this.configurations.baseUrl + this._userRolelevelList; }
	get getshiftUrl() { return this.configurations.baseUrl + this._shiftUrl; }
	get getCountriesUrl() { return this.configurations.baseUrl + this._CountriesUrl; }
	get getEmployeeLeaveTypeUrl() { return this.configurations.baseUrl + this._EmployeeLeaveTypeUrl; }
	get getEmployeeTrainingTypeUrl() { return this.configurations.baseUrl + this._EmployeeTrainingTypeUrl; }
    get certificationUrlNew() { return this.configurations.baseUrl + this._certificationUrlNew; }
	get trainUrlNew() { return this.configurations.baseUrl + this._trainUrlNew; }
	get trainingTypeUrlNew() { return this.configurations.baseUrl + this._trainingTypeUrlNew; }
    //get certifiUrlNew() { return this.configurations.baseUrl + this._certifiUrlNew; }
   // get trainingUrlNew() { return this.configurations.baseUrl + this._trainingUrlNew; }
	get getShiftvaluesUrl() { return this.configurations.baseUrl + this._getMultipleShiftvaluesUrl; }
	get getAircraftTypeUrl() { return this.configurations.baseUrl + this._aircraftTypeUrl; }
	get getleaveListUrl() { return this.configurations.baseUrl + this._getLeaveListUrl; }
	get getemployeeshiftsListUrl() { return this.configurations.baseUrl + this._getemployeeshifturl; }
	get getemployeeleaveListUrl() { return this.configurations.baseUrl + this._getemployeeLeaveurl; }
	get getLeavesListUrl() { return this.configurations.baseUrl + this._getMultiLeaveListUrl; }
	get getEmpDataByid() { return this.configurations.baseUrl + this._getEmpDataByid; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {



        super(http, configurations, injector);
    }

    getEmployeeEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.actionsUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEmployeeEndpoint());
            });
	}
	getEmployeeEndpointforView<T>(employeeId): Observable<T> {
		let endpointUrl = `${this.getView}/${employeeId}`;
		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getEmployeeEndpoint());
			});
    }

    getEmployeeCertifications<T>(employeeId): Observable<T> {

      
        let endpointUrl = `${this._certificationUrlNew}/${employeeId}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEmployeeEndpoint());
            });
    }

	getNewLeaveEndpoint<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._newLeavesUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewLeaveEndpoint(userObject));
			});
	}


    employeeLeavetypeAdd<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._actionsUrlLeaveTypeMap, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewEmployeeEndpoint(userObject));
            });
    }
    employeeShifttypeAdd<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._actionsUrlShiftTypeMap, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewEmployeeEndpoint(userObject));
            });
    }

	getRolesSetupEntityData<T>(): Observable<T> {

		return this.http.get<T>(this.rolesUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getEmployeeEndpoint());
			});
	}
	getUserRolelevelList<T>(): Observable<T> {

		return this.http.get<T>(this.userrolevelList, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getEmployeeEndpoint());
			});
	}
	getshiftEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this.getshiftUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getEmployeeEndpoint());
			});
	}

	getCountriesEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this.getCountriesUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getEmployeeEndpoint());
			});
	}

	getEmployeeLeaveTypeEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this.getEmployeeLeaveTypeUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getEmployeeEndpoint());
			});
	}

	getEmployeeTrainingTypeEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this.getEmployeeTrainingTypeUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getEmployeeEndpoint());
			});
	}
    getNewEmployeeEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._actionsUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewEmployeeEndpoint(userObject));
            });
    }

    getNewCertification<T>(userObject: any): Observable<T> {
       // debugger;
        return this.http.post<T>(this._certifiUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewCertification(userObject));
            });
	}

	addRolesData<T>(userObject: any): Observable<T> {
		// debugger;
		return this.http.post<T>(this._addRolesData, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.addRolesData(userObject));
			});
	}

	deleteRoleData<T>(userObject: any): Observable<T> {
		// debugger;
		let endpointUrl = `${this._deleteRoleById}/${userObject}`;

		return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.deleteRoleData(userObject));
			});
	
	}

    getNewTrainingEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._trainingUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewTrainingEndpoint(userObject));
            });
    }

    //getCerEmployeeEndpoint<T>(employeeLicensureId: any): Observable<T> {

    //    return this.http.post<T>(this._certificationUrlNew, JSON.stringify(employeeLicensureId), this.getRequestHeaders())
    //        .catch(error => {
    //            return this.handleError(error, () => this.getCerEmployeeEndpoint(employeeLicensureId));
    //        });
    //}
   

    getCerEmployeeEndpoint<T>(employeeLicensureId: any): Observable<T> {
        let endpointurl = `${this.certificationUrlNew}/${employeeLicensureId}`;
        return this.http.get<T>(endpointurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEmployeeEndpoint());
            });
    }

    getTrainEmployeeEndpoint<T>(employeeTrainingId: any): Observable<T> {
        let endpointurl = `${this.trainUrlNew}/${employeeTrainingId}`;
        return this.http.get<T>(endpointurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEmployeeEndpoint());
            });
    }

	getTrainingType<T>(): Observable<T> {
		
		return this.http.get<T>(this.trainingTypeUrlNew, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getEmployeeEndpoint());
			});
	}

    getHistoryEmployeeEndpoint<T>(employeeId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlAuditHistory}/${employeeId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getHistoryEmployeeEndpoint(employeeId));
            });
    }

    getEditEmployeeEndpoint<T>(employeeId?: number): Observable<T> {
        let endpointUrl = employeeId ? `${this._actionsUrlNew}/${employeeId}` : this._actionsUrlNew;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEditEmployeeEndpoint(employeeId));
            });
    } 

    getUpdateEmployeeEndpoint<T>(roleObject: any, employeeId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlNewUpdate}/${employeeId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateEmployeeEndpoint(roleObject, employeeId));
            });
    }

    updateEmployeeListDetails<T>(roleObject: any): Observable<T> {
      
        let endpointUrl = `${this._employeeUpdateUrl}/${roleObject.employeeId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateEmployeeListDetails(roleObject));
            });
    }

    updateCertificationListDetails<T>(roleObject: any): Observable<T> {

        let endpointUrl = `${this._certifiUpdateUrl}/${roleObject.employeeLicensureId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateCertificationListDetails(roleObject));
            });
    }

    updateTrainingListDetails<T>(roleObject: any): Observable<T> {

        let endpointUrl = `${this._trainingUpdateUrl}/${roleObject.employeeTrainingId}`;
        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateTrainingListDetails(roleObject));
            });
    }

    getDeleteEmployeeEndpoint<T>(employye: any): Observable<T> {
		let endpointUrl = `${this._actionsUrlNew}/${employye.employeeId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(employye), this.getRequestHeaders())
            .catch(error => {
				return this.handleError(error, () => this.getDeleteEmployeeEndpoint(employye));
            });
    }
	getUpdatecustomerEndpointforActive<T>(roleObject: any, employeeId: number): Observable<T> {
		let endpointUrl = `${this._updateActiveInactive}/${roleObject.employeeId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdatecustomerEndpoint(roleObject, employeeId));
			});

	}
	getUpdatecustomerEndpoint<T>(roleObject: any, employeeId: number): Observable<T> {
		let endpointUrl = `${this._actionsUrlNew}/${roleObject.employeeId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdatecustomerEndpoint(roleObject, employeeId));
			});

	}

	getEmployeeShiftEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this._actionsUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getEmployeeEndpoint());
			});
	}
	getemployeeshiftsList<T>(action: any): Observable<T> {
		let url = `${this.getemployeeshiftsListUrl}/${action}`;
		return this.http.get<T>(url, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getemployeeshiftsList(action));
			});
	}

	getShifts<T>(userObject: any): Observable<T> {


		return this.http.post<T>(this._shiftsurl, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getShifts(userObject));
			});
	}

	getMultileaves<T>(userObject: any): Observable<T> {


		return this.http.post<T>(this._multileavesurl, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getMultileaves(userObject));
			});
	}
	getleavedata<T>(employeeId: any): Observable<T> {
		let url = `${this.getLeavesListUrl}/${employeeId}`;
		return this.http.get<T>(url, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getleavedata(employeeId));
			});
    }

    getAllEmployeesInfo<T>(): Observable<T> {
        let endPointURL = this._getAllEmployeeInfoURL;
        return this.http.get<T>(endPointURL, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAllEmployeesInfo());
            });

	}
	
	getEmployeeDataById<T>(employeeId): Observable<T> {
        let endpointUrl = `${this._getEmpDataByid}/${employeeId}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEmployeeDataById(employeeId));
            });
    }
}


