
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class LegalEntityEndpontService extends EndpointFactory {


	private readonly _entityurl: string = "/api/legalEntity/Get";

	private readonly _managementUrl: string = "/api/ManagementStrcture/ManagementGet";
	private readonly _entityediturl: string = "/api/legalEntity/GetforEdigt";
	private readonly _entityUrlNew: string = "/api/legalEntity/legalEntitypost";
	private readonly _managementposturl: string = "/api/ManagementStrcture/managementEntitypost";
	private readonly _deleteLegalEntity: string = "/api/legalEntity/deleteLegalEntity";

	private readonly _JobTilesUrlAuditHistory: string = "/api/legalEntity/auditHistoryById";

	get entityurl() { return this.configurations.baseUrl + this._entityurl; }
	get managemententityurl() { return this.configurations.baseUrl + this._managementUrl; }
	get entityediturl() { return this.configurations.baseUrl + this._entityediturl; }

	constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

		super(http, configurations, injector);
	}

	getLegalEntityEndpontService<T>(): Observable<T> {

		return this.http.get<T>(this.entityurl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getLegalEntityEndpontService());
			});
	}

	getManagemtentEntityData<T>(): Observable<T> {

		return this.http.get<T>(this.managemententityurl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getLegalEntityEndpontService());
			});
	}

	getEntityforEdit<T>(): Observable<T> {

		return this.http.get<T>(this.entityediturl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getLegalEntityEndpontService());
			});
	}
	getNewLegalEntityEndpontService<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._entityUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewLegalEntityEndpontService(userObject));
			});
	}
	getmanagementPost<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._managementposturl, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getmanagementPost(userObject));
			});
	}
	updateManagement<T>(userObject: any): Observable<T> {
		let endpointUrl = `${this._managementposturl}/${userObject.managementStructureId}`;
		return this.http.put<T>(endpointUrl, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updateManagement(userObject));
			});
	}
	getDeleteActionEndpoint<T>(actionId: number): Observable<T> {
		let endpointUrl = `${this._managementposturl}/${actionId}`;

		return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getDeleteActionEndpoint(actionId));
			});
	}
	getDeleteActionEndpoint1<T>(actionId: number): Observable<T> {
		let endpointUrl = `${this._deleteLegalEntity}/${actionId}`;

		return this.http.put<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getDeleteActionEndpoint(actionId));
			});
	}

	//getEditJobTitleEndpoint<T>(actionId?: number): Observable<T> {
	//	let endpointUrl = actionId ? `${this._JobTilesUrlNew}/${actionId}` : this._JobTilesUrlNew;

	//	return this.http.get<T>(endpointUrl, this.getRequestHeaders())
	//		.catch(error => {
	//			return this.handleError(error, () => this.getEditJobTitleEndpoint(actionId));
	//		});
	//}

	getUpdateLegalEntityEndpontService<T>(roleObject: any, actionId: number): Observable<T> {
		let endpointUrl = `${this._entityUrlNew}/${actionId}`;
		let obj = {
			'name': roleObject.name,
			'description': roleObject.description,
			'doingLegalAs': roleObject.doingLegalAs,
			'address1': roleObject.address1,
			'address2': roleObject.address2,
			'city': roleObject.city,
			'stateOrProvince': roleObject.stateOrProvince,
			'postalCode': roleObject.postalCode,
			'country': roleObject.country,
			'faxNumber': roleObject.faxNumber,
			'phoneNumber1': roleObject.phoneNumber1,
			'functionalCurrencyId': roleObject.functionalCurrencyId,
			'reportingCurrencyId': roleObject.reportingCurrencyId,
			'isBalancingEntity': roleObject.isBalancingEntity,
			'cageCode': roleObject.cageCode,
			'faaLicense': roleObject.faaLicense,
			'taxId': roleObject.taxId,
			'isBankingInfo': roleObject.isBankingInfo,
			'isLastLevel': roleObject.isLastLevel,
			'poBox': roleObject.poBox,
			'bankStreetaddress1': roleObject.bankStreetaddress1,
			'bankStreetaddress2': roleObject.bankStreetaddress2,
			'bankCity': roleObject.bankCity,
			'bankProvince': roleObject.bankProvince,
			'bankcountry': roleObject.bankcountry,
			'bankpostalCode': roleObject.bankpostalCode,
			'domesticBankName': roleObject.domesticBankName,
			'domesticIntermediateBank': roleObject.domesticIntermediateBank,
			'domesticBenficiaryBankName': roleObject.domesticBenficiaryBankName,
			'domesticBankAccountNumber': roleObject.domesticBankAccountNumber,
			'domesticABANumber': roleObject.domesticABANumber,
			'internationalBankName': roleObject.internationalBankName,
			'internationalIntermediateBank': roleObject.internationalIntermediateBank,
			'internationalBenficiaryBankName': roleObject.internationalBenficiaryBankName,
			'internationalBankAccountNumber': roleObject.internationalBankAccountNumber,
			'internationalSWIFTID': roleObject.internationalSWIFTID,
			'achBankName': roleObject.achBankName,
			'achIntermediateBank': roleObject.achIntermediateBank,
			'achBenficiaryBankName': roleObject.achBenficiaryBankName,
			'achBankAccountNumber': roleObject.achBankAccountNumber,
			'achABANumber': roleObject.achABANumber,
			'achSWIFTID': roleObject.achSWIFTID,
			'legalEntityId': roleObject.legalEntityId,
			'createdBy': roleObject.createdBy,
			'updatedBy':roleObject.updatedBy

		}
		return this.http.put<T>(endpointUrl, JSON.stringify(obj), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdateLegalEntityEndpontService(roleObject, actionId));
			});
	}

	getDeleteLegalEntityEndpontService<T>(actionId: number): Observable<T> {
		let endpointUrl = `${this._entityUrlNew}/${actionId}`;

		return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getDeleteLegalEntityEndpontService(actionId));
			});
	}

	getHistoryLegalEntityEndpontService<T>(jobTitleId: number): Observable<T> {
		let endpointUrl = `${this._JobTilesUrlAuditHistory}/${jobTitleId}`;

		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getHistoryLegalEntityEndpontService(jobTitleId));
			});
	}
}