
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
	private readonly _managementLegalUrl: string = "/api/ManagementStrcture/ManagementGetView"; 
	private readonly _parentEntityUrl: string = "/api/legalEntity/ParentEntities"; 
	private readonly _ledgerUrl: string = "/api/ManagementStrcture/LedgerNames";
	private readonly _entityediturl: string = "/api/legalEntity/GetforEdigt";
	private readonly _entityUrlNew: string = "/api/legalEntity/legalEntitypost";
	private readonly _managementposturl: string = "/api/ManagementStrcture/managementEntitypost";
	private readonly _deleteLegalEntity: string = "/api/legalEntity/deleteLegalEntity";

    private readonly _JobTilesUrlAuditHistory: string = "/api/legalEntity/auditHistoryById";
    private readonly getEntitySetupAccounts: string = "/api/legalEntity/legalEntityAccountsById";

	private readonly _activeUrl: string = "/api/legalEntity/UpdateActive";
	private readonly getLegalEntityAddressByIdURL: string = "/api/legalEntity/legalentityaddressbyid";
    private readonly _contactUrl: string = "/api/LegalEntity/legalentitycontacts";
    private readonly _entityBillViaDetails = "/api/LegalEntity/legalentitybillingaddressbyid";
	private readonly _countryUrl: string = "/api/legalEntity/GetcountryList";
	private readonly _entityUpdateUrl: string = "/api/LegalEntity/UpdateLegalEntityDetails";
	private readonly _generalEmptyObjurl: string = "/api/LegalEntity/generalEmptyObj";
	private readonly _billingInfoUrl: string = "/api/LegalEntity/LegalEntityBillingPost";
	private readonly _updateBillingViaDetails: string = "/api/LegalEntity/LegalEntityBillAddressdetails";
	private readonly _legalEntityBillingHistory: string = "/api/LegalEntity/getLegalEntityBillingHistory"
	private readonly _legalEntityBillingUpdateforActive: string = '/api/LegalEntity/LegalEntityBillingUpdateStatus'
	private readonly _deleteBillingEntityDettilas: string = "/api/LegalEntity/updateStatusElgalEntityBilling";
	private readonly excelUpload: string = "/api/LegalEntity/uploadLegalEntitybillingaddress"
	private readonly _getlegalEntityDocumentAttachmentslist: string = "/api/FileUpload/getattachmentdetails";
	private readonly _addDocumentDetails: string = '/api/LegalEntity/legalEntityDocumentUpload';
	private readonly _deleteLegalEntityDocuments: string = '/api/LegalEntity/deleteLegalEntityDocuments';
	private readonly _getlegalEntityDocumentHistory: string = "/api/LegalEntity/getLegalEntityDocumentAudit"

	private readonly _updateShippingViaDetails: string = "/api/legalEntity/updateShipViaDetails";
	private readonly _legalEntityShipAddressdetails: string = "/api/legalEntity/legalEntityShippingAddressDetails";
	private readonly _legalEntityShippingUrlNew: string = "/api/legalEntity/updateStatuslegalEntityShipping";
	private readonly _getShipViaByShippingId: string = "/api/legalEntity/GetShipVia";
	private readonly _getShipViaHistory: string = "/api/legalEntity/getShipViaHistory";
	private readonly _shippingInfoUrl: string = "/api/legalEntity/legalEntityShippingPost";
	private readonly _saveShipViaDetails: string = "/api/legalEntity/addShipViaDetails";
	private readonly _updatshippingAddressDetails: string = "/api/legalEntity/cusShippingUpdate";
	private readonly _updateStatuslegalEntityShipping: string = "/api/legalEntity/updateStatuslegalEntityShipping";
	private readonly _legalEntityShipViaDetails: string = "/api/legalEntity/getlegalEntityShipViaDetails";
	private readonly _cusShippingGeturl = "/api/legalEntity/cusshippingGet";
	private readonly _cusShippingGeturlwithId = "/api/Vendor/cusshippingGetwithid";
	private readonly _internationalshippingpost: string = '/api/legalEntity/createinternationalshipping'
	private readonly _internationalshippingget: string = '/api/legalEntity/internationalshippingdetaillist'
	private readonly _internationalstatus: string = '/api/legalEntity/internationalshippingdetailsstatus'
	private readonly _internationalShippingDelete: string = '/api/legalEntity/deleteinternationalshipping';
	private readonly _internationalshippingdetailsbyid: string = '/api/legalEntity/internationalshippingdetailsbyid';
	private readonly _updateinternationalshipping: string = '/api/legalEntity/updateinternationalshipping';
	private readonly _createinternationalshippingviadetails: string = '/api/legalEntity/createshippingviadetails';
	private readonly _internationalShipViaList: string = '/api/legalEntity/getshippingviadetails';
	private readonly _updateshippingviadetails: string = '/api/legalEntity/updateshippingviadetails';
	private readonly excelUploadShipping: string = "/api/legalEntity/uploadlegalEntityshippingaddress"
	private readonly excelUploadInterShipping: string = "/api/legalEntity/uploadlegalEntityinternationalshipping"
	private readonly _legalEntityShippingHistory: string = "/api/legalEntity/getlegalEntityShippingHistory"
	private readonly _legalEntityInterShippingHistory: string = "/api/legalEntity/GetlegalEntityInternationalShippingAuditHistoryByid";
	private readonly _legalEntityShipViaHistory: string = "/api/legalEntity/GetShipViaAudit"
	private readonly _legalEntityInterShipViaHistory: string = "/api/legalEntity/getauditshippingviadetailsbyid"
	private readonly _deleteInternationalShippingViaMapUrl: string = '/api/legalEntity/deleteshippingviadetails';
	private readonly _deleteShipVia: string = '/api/legalEntity/deleteshipviadetails';
	private readonly _internationalShipViaByShippingIdList: string = '/api/legalEntity/getinternationalshippingviadetails';
	private readonly _addShipViaDetails: string = '/api/legalEntity/addShipViaDetails';
	private readonly _shippingDetailsStatus: string = '/api/legalEntity/shippingdetailsstatus';
	private readonly _shippingdetailsviastatus: string = '/api/legalEntity/shippingdetailsviastatus'

	get cusShippingUrl() { return this.configurations.baseUrl + this._cusShippingGeturl; }
	get cusShippingUrlwithaddressid() { return this.configurations.baseUrl + this._cusShippingGeturlwithId; }

	get entityurl() { return this.configurations.baseUrl + this._entityurl; }
    get managemententityurl() { return this.configurations.baseUrl + this._managementUrl; }
	get managementlengalentityurl() { return this.configurations.baseUrl + this._managementLegalUrl; } 
	get parentEntityUrl() { return this.configurations.baseUrl + this._parentEntityUrl; }  
	get ledgerNamesurl() { return this.configurations.baseUrl + this._ledgerUrl; }
	get entityediturl() { return this.configurations.baseUrl + this._entityediturl; }
    get contactUrl() { return this.configurations.baseUrl + this._contactUrl; }
    get entityBillViaDetails() { return this.configurations.baseUrl + this._entityBillViaDetails; }
	get countryUrl() { return this.configurations.baseUrl + this._countryUrl; }
	get generalurl() { return this.configurations.baseUrl + this._generalEmptyObjurl }
	get legalEntityBillingUpdateforActive() { return this.configurations.baseUrl + this._legalEntityBillingUpdateforActive }
	get InternationalShippingPost() { return this.configurations.baseUrl + this._internationalshippingpost }
	get InternationalShippingList() { return this.configurations.baseUrl + this._internationalshippingget }
	get InternationalShippingStatus() { return this.configurations.baseUrl + this._internationalstatus }
	get InternationalShippingDelete() { return this.configurations.baseUrl + this._internationalShippingDelete }
	get InternationalShippingById() { return this.configurations.baseUrl + this._internationalshippingdetailsbyid }
	get UpdateInternationalshipping() { return this.configurations.baseUrl + this._updateinternationalshipping }
	get InternationalShipVia() { return this.configurations.baseUrl + this._createinternationalshippingviadetails }
	get ShipViaByInternationalShippingId() { return this.configurations.baseUrl + this._internationalShipViaList }
	get UpdateShipViaInternational() { return this.configurations.baseUrl + this._updateshippingviadetails }
	get deleteShipVia() { return this.configurations.baseUrl + this._deleteShipVia; }
	get InternatioanlShipViaByInternationalShippingId() { return this.configurations.baseUrl + this._internationalShipViaByShippingIdList }
	get domesticShipVia() { return this.configurations.baseUrl + this._addShipViaDetails }
	get ShippingDetailsStatus() { return this.configurations.baseUrl + this._shippingDetailsStatus }
	get shippingdetailsviastatus() { return this.configurations.baseUrl + this._shippingdetailsviastatus }

	constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

		super(http, configurations, injector);
	}

	updateShippingViainfo<T>(roleObject: any, legalEntityId: any): Observable<T> {
		let endpointUrl = `${this._updateShippingViaDetails}/${legalEntityId}`;
		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updateShippingViainfo(roleObject, legalEntityId));
			});
	}
	updateShippinginfo<T>(roleObject: any, legalEntityId: any): Observable<T> {
		let endpointUrl = `${this._updatshippingAddressDetails}/${roleObject.legalEntityShippingAddressId}`;
		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updateShippinginfo(roleObject, legalEntityId));
			});
	}

	updateStatusShippinginfo<T>(roleObject: any, legalEntityId: any): Observable<T> {
		let endpointUrl = `${this._updateStatuslegalEntityShipping}/${roleObject.legalEntityShippingAddressId}`;
		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updateStatusShippinginfo(roleObject, legalEntityId));
			});
	}
	getCusHippingaddresdetails<T>(legalEntityId: any): Observable<T> {
		let endpointurl = `${this.cusShippingUrl}/${legalEntityId}`;
		return this.http.get<T>(endpointurl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getlegalEntityEndpoint());
			});
	}
	getCusHippingaddresdetailswithid<T>(legalEntityId: any): Observable<T> {
		let endpointurl = `${this.cusShippingUrlwithaddressid}/${legalEntityId}`;
		return this.http.get<T>(endpointurl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getlegalEntityEndpoint());
			});
	}

	getlegalEntityEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this._entityUrlNew, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getlegalEntityEndpoint());
			});
	}

	legalEntityShippingFileUpload(file, legalEntityId) {
		return this.http.post(`${this.configurations.baseUrl}${this.excelUploadShipping}?legalEntityId=${legalEntityId}`, file)
	}
	legalEntityInternationalShippingFileUpload(file, legalEntityId) {
		return this.http.post(`${this.configurations.baseUrl}${this.excelUploadInterShipping}?legalEntityId=${legalEntityId}`, file)
	}
	getlegalEntityShippingHistory(legalEntityId, legalEntityShippingAddressId) {
		return this.http.get(`${this.configurations.baseUrl}/${this._legalEntityShippingHistory}?legalEntityId=${legalEntityId}&legalEntityShippingAddressId=${legalEntityShippingAddressId}`)
	}
	getlegalEntityInterShippingHistory(legalEntityId, legalEntityInterShippingId) {
		return this.http.get(`${this.configurations.baseUrl}/${this._legalEntityInterShippingHistory}?legalEntityId=${legalEntityId}&internationalShippingId=${legalEntityInterShippingId}`)
	}

	getlegalEntityShipViaHistory(legalEntityId, legalEntityShippingAddressId, legalEntityShippingId) {
		return this.http.get(`${this.configurations.baseUrl}/${this._legalEntityShipViaHistory}?legalEntityId=${legalEntityId}&legalEntityShippingAddressId=${legalEntityShippingAddressId}&legalEntityShippingId=${legalEntityShippingId}`)
	}
	getlegalEntityInterShipViaHistory(legalEntityId, internationalShippingId, shippingViaDetailsId) {
		return this.http.get(`${this.configurations.baseUrl}/${this._legalEntityInterShipViaHistory}?legalEntityId=${legalEntityId}&internationalShippingId=${internationalShippingId}&shippingViaDetailsId=${shippingViaDetailsId}`)
	}

	getNewShipppinginfo<T>(param: any): Observable<T> {

		let body = JSON.stringify(param);
		let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
		return this.http
			.post(this._shippingInfoUrl, body, this.getRequestHeaders())
			.map((res: Response) => res)
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	updateStatusForShippingDetails<T>(id, status, updatedBy) {
		return this.http.get<T>(`${this.ShippingDetailsStatus}?id=${id}&status=${status}&updatedBy=${updatedBy}`)
			.catch(error => {
				return this.handleError(error, () => this.updateStatusForShippingDetails(id, status, updatedBy));
			});
	}
	Shippingdetailsviastatus<T>(id, status, updatedBy) {
		return this.http.get<T>(`${this.shippingdetailsviastatus}?id=${id}&status=${status}&updatedBy=${updatedBy}`)
			.catch(error => {
				return this.handleError(error, () => this.Shippingdetailsviastatus(id, status, updatedBy));
			});
	}

	getInternationalShipViaByInternationalShippingId<T>(id) {
		return this.http.get<T>(`${this.InternatioanlShipViaByInternationalShippingId}?internationalShippingId=${id}`)
			.catch(error => {
				return this.handleError(error, () => this.getInternationalShipViaByInternationalShippingId(id));
			});
	}
	getShipViaByDomesticShippingId(legalEntityShippingId) {
		return this.http.get(`${this.configurations.baseUrl}/${this._getShipViaByShippingId}/${legalEntityShippingId}`, this.getRequestHeaders())

	}
	postDomesticShipVia<T>(postData) {
		return this.http.post<T>(this.domesticShipVia, JSON.stringify(postData), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.postDomesticShipVia(postData));
			});
	}

	updateShipViaInternational<T>(postData) {

		return this.http.post<T>(this.UpdateShipViaInternational, JSON.stringify(postData), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updateShipViaInternational(postData));
			});
	}
	getShipViaByInternationalShippingId<T>(id, pageIndex, pageSize) {
		return this.http.get<T>(`${this.ShipViaByInternationalShippingId}?internationalShippingId=${id}&pageNumber=${pageIndex}&pageSize=${pageSize}`)
			.catch(error => {
				return this.handleError(error, () => this.getShipViaByInternationalShippingId(id, pageIndex, pageSize));
			});
	}
	postInternationalShipVia<T>(postData) {

		return this.http.post<T>(this.InternationalShipVia, JSON.stringify(postData), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.postInternationalShipVia(postData));
			});
	}

	updateInternationalShipping<T>(postData) {

		return this.http.post<T>(this.UpdateInternationalshipping, JSON.stringify(postData), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updateInternationalShipping(postData));
			});
	}

	getInternationalShippingById<T>(id) {
		return this.http.get<T>(`${this.InternationalShippingById}?id=${id}`)
			.catch(error => {
				return this.handleError(error, () => this.getInternationalShippingById(id));
			});
	}

	deleteInternationalShipping<T>(id, updatedBy) {
		return this.http.get<T>(`${this.InternationalShippingDelete}?id=${id}&updatedBy=${updatedBy}`)
			.catch(error => {
				return this.handleError(error, () => this.deleteInternationalShipping(id, updatedBy));
			});
	}

	updateStatusForInternationalShipping<T>(id, status, updatedBy) {
		return this.http.get<T>(`${this.InternationalShippingStatus}?id=${id}&status=${status}&updatedBy=${updatedBy}`)
			.catch(error => {
				return this.handleError(error, () => this.updateStatusForInternationalShipping(id, status, updatedBy));
			});
	}
	updateStatusForInternationalShippingVia(id, status, updatedBy) {
		return this.http.get(`${this.configurations.baseUrl}/api/legalEntity/shippingviadetailsstatus?id=${id}&status=${status}&updatedBy=${updatedBy}`)

	}

	getInternationalShippingBylegalEntityId<T>(legalEntityId, pageIndex, pageSize) {
		return this.http.get<T>(`${this.InternationalShippingList}?legalEntityId=${legalEntityId}&pageNumber=${pageIndex}&pageSize=${pageSize}`)
			.catch(error => {
				return this.handleError(error, () => this.getInternationalShippingBylegalEntityId(legalEntityId, pageIndex, pageSize));
			});
	}

	deleteInternationalShipViaId<T>(id, updatedBy) {
		return this.http.get<T>(`${this._deleteInternationalShippingViaMapUrl}?id=${id}&updatedBy=${updatedBy}`)
			.catch(error => {
				return this.handleError(error, () => this.deleteInternationalShipViaId(id, updatedBy));
			});
	}

	deleteShipViaDetails<T>(id, updatedBy) {
		return this.http.get<T>(`${this._deleteShipVia}?id=${id}&updatedBy=${updatedBy}`)
			.catch(error => {
				return this.handleError(error, () => this.deleteShipViaDetails(id, updatedBy));
			});
	}

	postInternationalShippingPost<T>(postData) {
		return this.http.post<T>(this.InternationalShippingPost, JSON.stringify(postData), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.postInternationalShippingPost(postData));
			});
	}


	GetUploadDocumentsList(attachmentId, legalEntityId, moduleId) {
		return this.http.get<any>(`${this._getlegalEntityDocumentAttachmentslist}?attachmentId=${attachmentId}&referenceId=${legalEntityId}&moduleId=${moduleId}`, this.getRequestHeaders())
	}

	getDocumentList(legalEntityId) {
		return this.http.get(`${this.configurations.baseUrl}/api/legalEntity/getlegalEntityDocumentDetail/${legalEntityId}`, this.getRequestHeaders())
	}

	getDocumentUploadEndpoint<T>(file: any): Observable<T> {
		const headers = new Headers({ 'Content-Type': 'multipart/form-data' });
		return this.http.post<T>(`${this._addDocumentDetails}`, file);
	}

	getdeleteDocumentListbyId(legalEntityDocumentId) {
		return this.http.delete(`${this._deleteLegalEntityDocuments}/${legalEntityDocumentId}`, this.getRequestHeaders())
	}
	getLegalEntityDocumentAuditHistory(id, legalEntityId) {
		return this.http.get<any>(`${this._getlegalEntityDocumentHistory}?id=${id}&legalEntityId=${legalEntityId}`, this.getRequestHeaders())
	}

	LegalEntityBillingFileUpload(file, entityId) {
		return this.http.post(`${this.configurations.baseUrl}${this.excelUpload}?legalEntityId=${entityId}`, file)
	}

	deleteBillingAddress<T>(roleObject: any, legalEntityId: any): Observable<T> {
		let endpointUrl = `${this._deleteBillingEntityDettilas}/${legalEntityId}`;
		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.deleteBillingAddress(roleObject, legalEntityId));
			});
	}

	getNewBillinginfo<T>(param: any): Observable<T> {

		let body = JSON.stringify(param);
		let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
		return this.http
			.post(this._billingInfoUrl, body, this.getRequestHeaders())
			.map((res: Response) => res)
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	updateBillingViainfo<T>(roleObject: any, entityId: any): Observable<T> {
		let endpointUrl = `${this._updateBillingViaDetails}/${entityId}`;
		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updateBillingViainfo(roleObject, entityId));
			});
	}

	getlegalEntityBillingHistory(legalEntityId, legalEntityBillingAddressId) {
		return this.http.get(`${this.configurations.baseUrl}/${this._legalEntityBillingHistory}?legalEntityId=${legalEntityId}&legalEntityBillingaddressId=${legalEntityBillingAddressId}`)
	}

	LegalEntityBillingUpdateforActive<T>(id, status, updatedBy) {
		return this.http.get<T>(`${this.legalEntityBillingUpdateforActive}?id=${id}&status=${status}&updatedBy=${updatedBy}`)
			.catch(error => {
				return this.handleError(error, () => this.LegalEntityBillingUpdateforActive(id, status, updatedBy));
			});
	}

	getGeneralrobj<T>(): Observable<T> {
		return this.http.get<T>(this.generalurl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getGeneralrobj());
			});
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

	getEntityDataById(entityId) {
		return this.http.get<any>(`${this.configurations.baseUrl}/api/legalEntity/getEntitydatabyid/${entityId}`)
	}

	updateEntityListDetails<T>(roleObject: any): Observable<T> {
		let endpointUrl = `${this._entityUpdateUrl}/${roleObject.legalEntityId}`;
		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updateEntityListDetails(roleObject));
			});
	}

	getcountryListEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this.countryUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getcountryListEndpoint());
			});
	}

    getManagemtentLengalEntityData<T>(): Observable<T> {

        return this.http.get<T>(this.managementlengalentityurl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getLegalEntityEndpontService());
            });
    }

	loadParentEntities<T>(): Observable<T> {
		return this.http.get<T>(this.parentEntityUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getLegalEntityEndpontService());
			});
	}

	getLedgerNamesData<T>(): Observable<T> {

		return this.http.get<T>(this.ledgerNamesurl, this.getRequestHeaders())
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

    getContcatDetails<T>(): Observable<T> {
        let endpointUrl = `${this.contactUrl}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getContcatDetails());
            });
    }

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
			'ledgerName': roleObject.ledgerName,
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
            'updatedBy': roleObject.updatedBy,

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

    getAccountsInfoById<T>(entityId: number): Observable<T> {
        let endpointUrl = `${this.getEntitySetupAccounts}/${entityId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAccountsInfoById(entityId));
            });
    }

    getUpdateLegalEntityActive<T>(roleObject: any, legalEntityId: number): Observable<T> {
       // let endpointUrl = `${this._entityUrlNew}/${legalEntityId}`;

        return this.http.put<T>(this._activeUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateLegalEntityActive(roleObject, legalEntityId));
            });
	}
	
	getLegalEntityAddressById<T>(entityId: number): Observable<T> {
        let endpointUrl = `${this.getLegalEntityAddressByIdURL}/${entityId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getLegalEntityAddressById(entityId));
            });
    }

    getEntityBillViaDetails<T>(roleObject: any): Observable<T> {
        let endpointUrl = `${this.entityBillViaDetails}/${roleObject}`;
        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEntityBillViaDetails(roleObject));
            });
    }
}