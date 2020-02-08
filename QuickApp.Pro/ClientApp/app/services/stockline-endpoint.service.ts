import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class StocklineEndpoint extends EndpointFactory {
	private readonly _actionsUrlNew1: string = "/api/StockLine/stockLine";
	private readonly _deleteStockUrl: string = "/api/StockLine/deleteIntegration";
	private readonly _actionsUrlNew: string = "/api/StockLine/stockLinepost";//which will be specified in the Controller
	private readonly _actionsCompanyUrl: string = "/api/StockLine/GetCompanyData";//which will be specified in the Controller
	private readonly _actionsLegalEntityUrl: string = "/api/ManagementStrcture/ManagementGetView";
	private readonly _actionsAdjustmentToListEdit: string = "/api/StockLine/stockLineAdjustmentToListpost";//which will be specified in the Controller
	private readonly _actionsAdjustmentToListIfExist: string = "/api/StockLine/stockLineAdjustmentToListpostIfExist";//which will be specified in the Controller
	private readonly _actionsUrl: string = "/api/StockLine/Get";//which will be specified in the Controller
	private readonly _updateActionsUrl: string = "/api/StockLine/stockLineUpdateforActive";//which will be specified in the Controller
	private readonly _stockLineListUrl: string = "/api/StockLine/Get";//which will be specified in the Controller
	private readonly _actionsUrl1: string = "/api/StocklineAdjustment/Get";//which will be specified in the Controller
	private readonly _integrationPortalById: string = "/api/StockLine/IntegrationPortalGet";
	private readonly _timeLifeGetById: string = "/api/StockLine/timeLifeGetById";
	private readonly _stocklineGetById: string = "/api/StockLine/StocklineGetById";//which will be specified in the Controller
	private readonly _adjustmentUrl: string = "/api/StockLine/AdjustmentGet";//which will be specified in the Controller
	private readonly _adjustmentUrlNew: string = "/api/StockLine/stockLineAdjustmentpost";//which will be specified in the Controller 
	private readonly _actionsTimeUrlNew: string = "/api/StockLine/stockLineTimeLifeAdjustment"; // Which will be specified in the Controller
	private readonly _actionsStocklineIntegrationUrlNew: string = "/api/StockLine/stockLineIntegration"; // Which will be specified in the Controller
	private readonly _stockLineItemMasterPart: string = "/api/StockLine/itemMasterPartUpdate"; // Which will be specified in the Controller
	private readonly _stockLineTimeLifeUpdate: string = "/api/StockLine/timeLifeUpdate"; // Which will be specified in the Controller
	private readonly _stockLineAdjustmentBinBeforeChange: string = "/api/StockLine/GetBinByShelfIdAdjustmentBeforeChange"; // for Stockline Adjustemnet Show Data before Select Site
	private readonly _adjustmentReasonUrlNew: string = "/api/StockLine/stockLineAdjustmentReasonpost";//which will be specified in the Controller
	private readonly _adjustmentReasonUrl: string = "/api/StockLine/GetAdjustmentReason";
	private readonly _stockLineAdjustmentUpdate: string = "/api/StockLine/stockLineAdjustmentReasonPut";
	private readonly _stockLinePOUnitCost: string = "/api/StockLine/stockLinePOUnitCostGet";
	private readonly _POUnitCost: string = "/api/StockLine/PurchaseOrderUnitCost";
	private readonly _ROUnitCost: string = "/api/StockLine/RepairOrderUnitCost";
	private readonly _stockLineROUnitCost: string = "/api/StockLine/stockLineROUnitCostGet";
	private readonly _stockLineAdjustmentDelete: string = "/api/StockLine/stockLineAdjustmentReasonDelete";
	private readonly _searchStockLine: string = "/api/StockLine/search";
	private readonly _multiSearchStockLineUrl: string = "/api/stockline/multisearch";
	private readonly _stocklineGlobalSearch: string = '/api/StockLine/ListGlobalSearch'
	private readonly _tagTypeUrl: string = '/api/StockLine/tagType'

	get tagTypeUrl() { return this.configurations.baseUrl + this._tagTypeUrl; }
	get adjustmentReasonUrl() { return this.configurations.baseUrl + this._adjustmentReasonUrl; }
	get stocklineUrl() { return this.configurations.baseUrl + this._actionsUrl; }
	get actionsUrl() { return this.configurations.baseUrl + this._actionsUrl; }
	get updateActiveInactive() { return this.configurations.baseUrl + this._updateActionsUrl; }
	get stockListUrl() { return this.configurations.baseUrl + this._stockLineListUrl; }
	get adjustmentUrl() { return this.configurations.baseUrl + this._actionsUrl1; }
	get companyUrl() { return this.configurations.baseUrl + this._actionsCompanyUrl; }
	get legalEntityUrl() { return this.configurations.baseUrl + this._actionsLegalEntityUrl; }
	get getSearchUrl() { return this.configurations.baseUrl + this._searchStockLine };
	get getMultiSearchUrl() { return this.configurations.baseUrl + this._multiSearchStockLineUrl };

	constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
		super(http, configurations, injector);
	}
	//for getting stockline
	getStockLineListEndpoint(data) {
		return this.http.post(this.stockListUrl, JSON.stringify(data), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getStockLineListEndpoint(data));
			});
	}


	getStockLineEndpointList(data) {
		return this.http.post(this.actionsUrl, JSON.stringify(data), this.getRequestHeaders())
            .catch(error => {
				return this.handleError(error, () => this.getStockLineEndpointList(data));
            });
  }
	
	getStockLineEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this.actionsUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getStockLineEndpoint());
			});
	}

	getUpdatestockLineEndpointforActive<T>(roleObject: any, login): Observable<T> {
		let endpointUrl = `${this.updateActiveInactive}?StocklineId=${roleObject.stockLineId}&status=${roleObject.isActive}&updatedBy=${login}`;

		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdatestockLineEndpointforActive(roleObject, login));
			});

	}

	getGlobalStockLineRecords<T>(value, pageIndex, pageSize): Observable<T> {
		// let endpointUrl = this.globalSearch;
		return this.http.get<T>(`${this.configurations.baseUrl}${this._stocklineGlobalSearch}?value=${value}&pageNumber=${pageIndex}&pageSize=${pageSize}`, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getGlobalStockLineRecords(value, pageIndex, pageSize));
			});
	}

	//for getting stocklineAdjustmentDatatype table Data
	getStockLineAdjustmentDatatypeDataEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this.adjustmentUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getStockLineAdjustmentDatatypeDataEndpoint());
			});
	}

	//for getting stocklineAdjustmentDatatype table Data
	getStockLineCompanyListEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this.companyUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getStockLineCompanyListEndpoint());
			});
	}

	getManagemtentLengalEntityEndpoint<T>(): Observable<T> {
		return this.http.get<T>(this.legalEntityUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getManagemtentLengalEntityEndpoint());
			});
	}
	//for getting new stockline Adjustment Datatype
	getNewstockLineEndpoint<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._actionsUrlNew1, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewstockLineEndpoint(userObject));
			});
	}

	//for updating stockline
	getBinDataFromShelfIdBeforeChange<T>(shelfId: number): Observable<T> {

		let endpointUrl = `${this._stockLineAdjustmentBinBeforeChange}/${shelfId}`;
		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getBinDataFromShelfIdBeforeChange(shelfId));
			});
	}

	//for updating stockline
	getUpdatestockLineSetupEndpoint<T>(roleObject: any, stockLineId: number): Observable<T> {
		let endpointUrl = `${this._actionsUrlNew}/${roleObject.stockLineId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdatestockLineSetupEndpoint(roleObject, stockLineId));
			});
	}

	//For Updating Stockline TimeLife
	getUpdatestockLineTimeLifeEndpoint<T>(roleObject: any, timeLifeCyclesId: number): Observable<T> {
		let endpointUrl = `${this._stockLineTimeLifeUpdate}/${roleObject.timeLifeCyclesId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdatestockLineTimeLifeEndpoint(roleObject, timeLifeCyclesId));
			});
	}

	//for updating stockline Adjustment to StockLine List
	getUpdateStockLineAdjustmentToListEndpoint<T>(roleObject: any, stockLineId: number): Observable<T> {
		let endpointUrl = `${this._actionsAdjustmentToListEdit}/${roleObject.StockLineId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdateStockLineAdjustmentToListEndpoint(roleObject, stockLineId));
			});
	}


	//for updating stockline Adjustment to StockLine List if Already Exist
	getUpdateStockAdjustmentToListIfExistEndpoint<T>(roleObject: any, stockLineId: number): Observable<T> {
		let endpointUrl = `${this._actionsAdjustmentToListIfExist}/${roleObject.stockLineId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdateStockAdjustmentToListIfExistEndpoint(roleObject, stockLineId));
			});
	}


	//for getting IntegrationPortal Get
	getStockLineIntegrationPortalByIdEndpoint<T>(stockLineId: any): Observable<T> {
		let endpointUrl = `${this._integrationPortalById}/${stockLineId}`;

		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getStockLineIntegrationPortalByIdEndpoint(stockLineId));
			});
	}

	//for getting TieLife By Id Get
	getStockLineTimeLifeByIdEndpoint<T>(timeLifeCycleId: any): Observable<T> {
		let endpointUrl = `${this._timeLifeGetById}/${timeLifeCycleId}`;

		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getStockLineTimeLifeByIdEndpoint(timeLifeCycleId));
			});
	}

	getStockLineByIdEndpoint<T>(stockLineId: any): Observable<T> {
		let endpointUrl = `${this._stocklineGetById}/${stockLineId}`;
		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getStockLineAdjustmentEndpoint(stockLineId));
			});
	}

	//for getting stockline adjustment
	getStockLineAdjustmentEndpoint<T>(stockLineId: any): Observable<T> {
		let endpointUrl = `${this._adjustmentUrl}/${stockLineId}`;

		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getStockLineAdjustmentEndpoint(stockLineId));
			});
	}

	//for  new stocklineadjustment Data
	getNewstockLineAdjustmentEndpoint<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._adjustmentUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewstockLineAdjustmentEndpoint(userObject));
			});
	}

	//for updating stockline adjustment in Part-A
	getUpdatestockLineAdjustmentEndpoint<T>(roleObject: any, stockLineId: number): Observable<T> {
		let endpointUrl = `${this._adjustmentUrlNew}/${roleObject.stockLineId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdatestockLineAdjustmentEndpoint(roleObject, stockLineId));
			});
	}


	getNewstockLineTimeAdjustmentEndpoint<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._actionsTimeUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewstockLineTimeAdjustmentEndpoint(userObject));
			});
	}



	saveStocklineIntegrationPortalDataEndpoint<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._actionsStocklineIntegrationUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.saveStocklineIntegrationPortalDataEndpoint(userObject));
			});
	}
	
	////for updating stockline
	//getUpdateItemMasterDetEndpoint<T>(stocklineObject: any): Observable<T> {
	//	let endpointUrl = `${this._actionsStocklineItemMasterUpdate}/${stocklineObject.itemMasterId}`;

	//	return this.http.put<T>(endpointUrl, JSON.stringify(stocklineObject), this.getRequestHeaders())
	//		.catch(error => {
	//			return this.handleError(error, () => this.getUpdateItemMasterDetEndpoint(stocklineObject));
	//		});
	//}

	getUpdatestockLineTimeAdjustmentEndpoint<T>(roleObject: any, stockLineId: number): Observable<T> {
		let endpointUrl = `${this._adjustmentUrlNew}/${roleObject.stockLineId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdatestockLineTimeAdjustmentEndpoint(roleObject, stockLineId));
			});
	}

	getUpdateItemMasterPartEndpoint<T>(roleObject: any): Observable<T> {
		let endpointUrl = `${this._stockLineItemMasterPart}/${roleObject.itemMasterId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdateItemMasterPartEndpoint(roleObject));
			});
	}

	//for Stockline Adjustment Reason

	getStocklineAdjustmentReasonEndpoint<T>(): Observable<T> {

		return this.http.get<T>(this.adjustmentReasonUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getStocklineAdjustmentReasonEndpoint());
			});
	}

	getAllTagTypes<T>(): Observable<T> {
		return this.http.get<T>(this.tagTypeUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getAllTagTypes());
			});
	}


	getNewstockLineAdjustmentReasonEndpoint<T>(userObject: any): Observable<T> {
		return this.http.post<T>(this._adjustmentReasonUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewstockLineAdjustmentReasonEndpoint(userObject));
			});
	}

	getUpdateStocklineAdjustmentReasonEndpoint<T>(roleObject: any): Observable<T> {
		let endpointUrl = `${this._stockLineAdjustmentUpdate}/${roleObject.adjustmentReasonId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdateStocklineAdjustmentReasonEndpoint(roleObject));
			});
	}

	getDeleteStocklineAdjustmentReasonEndpoin<T>(roleObject: any): Observable<T> {
		let endpointUrl = `${this._stockLineAdjustmentDelete}/${roleObject.adjustmentReasonId}`;

		return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getDeleteStocklineAdjustmentReasonEndpoin(roleObject));
			});
	}

	getPurchaseOrderUnitCostEndpoint<T>(POId: any): Observable<T> {
		let endpointUrl = `${this._POUnitCost}/${POId}`;

		return this.http.post<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getPurchaseOrderUnitCostEndpoint(POId));
			});
	}

	
	getRepairOrderUnitCostEndpoint<T>(ROId: any): Observable<T> {
		let endpointUrl = `${this._ROUnitCost}/${ROId}`;
		return this.http.post<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getRepairOrderUnitCostEndpoint(ROId));
			});
	}

	getPOUnitCostEndpoint<T>(roleObject: any): Observable<T> {
		//let endpointUrl = `${this._stockLinePOUnitCost}/${roleObject.itemMasterId}`;

		return this.http.post<T>(this._stockLinePOUnitCost, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getPOUnitCostEndpoint(roleObject));
			});
	}


	getROUnitCostEndpoint<T>(roleObject: any): Observable<T> {
		//let endpointUrl = `${this._stockLinePOUnitCost}/${roleObject.itemMasterId}`;

		return this.http.post<T>(this._stockLineROUnitCost, JSON.stringify(roleObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getROUnitCostEndpoint(roleObject));
			});
	}

	//getDeleteIntegrationEndpoint

	getDeleteIntegrationEndpoint<T>(actionId: number): Observable<T> {
		let endpointUrl = `${this._deleteStockUrl}/${actionId}`;

		return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getDeleteIntegrationEndpoint(actionId));
			});
	}


	//updatestocklinelistStattus<T>(rowData: any): Observable<T> {
	//	let endpointUrl = `${this._updateliststatus}/${rowData.sourceStockLine}`;

	//	return this.http.put<T>(endpointUrl, JSON.stringify(rowData), this.getRequestHeaders())
	//		.catch(error => {
	//			return this.handleError(error, () => this.updatestocklinelistStattus(rowData));
	//		});
	//}

	//getdeleteStockLineAction<T>(roleObject: any): Observable<T> {
	//	let endpointUrl = `${this._customerBillingUrlNew}/${roleObject.customerBillingId}`;
	//	return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
	//		.catch(error => {
	//			return this.handleError(error, () => this.getdeleteStockLineAction(roleObject));
	//		});
	//}

	searchItemMaster<T>(searchParameters: any): Observable<T> {
		return this.http.post<T>(this.getSearchUrl, JSON.stringify(searchParameters), this.getRequestHeaders())
			.catch(err => {
				return this.handleError(err, () => this.searchItemMaster(searchParameters));
			})
	}
	multiSearch<T>(searchParameters: any): Observable<T> {
        return this.http.post<T>(this.getMultiSearchUrl, JSON.stringify(searchParameters), this.getRequestHeaders())
            .catch(err => {
                return this.handleError(err, () => this.multiSearch(searchParameters));
            })
    }
	

	getStockLineDetailsByStockLineId(stockLineId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/workOrder/stocklinedetails?stockLineId=${stockLineId}`, this.getRequestHeaders())
	}
	
	getWareHouseDataBySiteId(SiteId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/stockline/warehousedata?siteId=${SiteId}`, this.getRequestHeaders())
	}

	getLocationDataByWarehouseId(warehouseId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/stockline/locationdata?warehouseId=${warehouseId}`, this.getRequestHeaders())
	}

	getShelfDataByLocationId(locationId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/stockline/shelfdata?locationId=${locationId}`, this.getRequestHeaders())
	}
	
	getBinDataByShelfId(shelfId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/stockline/bindata?shelfId=${shelfId}`, this.getRequestHeaders())
	}

    getStockLineReportViewList(payload) {
        return this.http.post(`${this.configurations.baseUrl}/api/stockline/stocklinereoprtview`, payload);
    }

    downloadStockLineReport() {

        const url = `${this.configurations.baseUrl}/api/stockLine/stocklinereoprt`;
        window.location.assign(url);
	}
	
	getStockLineDetailsById(stockLineId) {
        return this.http.get<any>(`${this.configurations.baseUrl}/api/StockLine/StocklineDataById/${stockLineId}`, this.getRequestHeaders())
	}

    //downloadStockLineReport(payload) {

    //    return this.http.post(`${this.configurations.baseUrl}/api/stockline/downloadstocklinereoprt`, payload);

        
    //}
}