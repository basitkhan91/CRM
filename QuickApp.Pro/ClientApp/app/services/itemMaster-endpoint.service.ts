
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';
import {Url} from '../app.settings';
@Injectable()
export class ItemMasterEndpoint extends EndpointFactory {


    private readonly _actionsUrl: string = "/api/ItemMaster/Get";
    private readonly _actionsCapsUrl: string = "/api/ItemMaster/GetListforCapes";
	private readonly _aircraftmodelsurl: string = "/api/ItemMaster/GetAircarftmodelsdata";
	private readonly _aircraftmanafacturerurl: string = "/api/ItemMaster/aircraftManufacturerGet";
	private readonly _capesdata: string = "/api/ItemMaster/GetCapesDatawithMasterId";
	
	private readonly _listUrl: string = "/api/ItemMaster/GetitemList";
	private readonly _rolesDataUrl: string = "/api/ItemMaster/GetRolesData";
	private readonly _rolesDataByRoleId: string = "/api/ItemMaster/GetRolesDatayRoleId";
    private readonly _manufUrl: string = "/api/ItemMaster/GetManfacturerDetails";
    private readonly _partUrl: string = "/api/ItemMaster/GetParntnumberlist";
    private readonly _getCountryTypeUrl: string = "/api/ItemMaster/GetCountries";
	private readonly _actionsUrlNew: string = "/api/ItemMaster/itemMasterpost";
	private readonly _mancapPost: string = "/api/ItemMaster/Mancapespost";
	private readonly _aircraftmodelsPost: string = "/api/ItemMaster/Aircraftpost";
    private readonly _updateDeleteStatus: string = "/api/ItemMaster/updateDeleteStatus";
    private readonly _manufactureNew: string = "/api/ItemMaster/manufacturerpost";
    private readonly _warnUrlNew: string = "/api/ItemMaster/warning";
    private readonly _getwarningUrl: string = "/api/ItemMaster/getwarning";
    private readonly _actionsUrlAuditHistory: string = "/api/ItemMaster/auditHistoryById";
    private readonly _getAircraftUrl: string = "/api/ItemMaster/Aircraftget";
    private readonly _aircraftTypeUrl: string = "/api/ItemMaster/aircraftTypeGet";
    private readonly _equipUrl: string = "api/ItemMaster/getEquipmentlist";
    private readonly _equipmentNew: string = "api/ItemMaster/equipmentpost";
    private readonly _listNonstockUrl: string = "api/ItemMaster/GetItemnonstocklist";
    private readonly _liststockUrl: string = "api/ItemMaster/GetItemStocklist";
    private readonly _listeqpmntUrl: string = "api/ItemMaster/GetEquipmentlist";
    private readonly _lisUrl: string = "/api/ItemMaster/GetDescriptionbypart";
	private readonly _updateActiveInactiveforstock: string = "/api/ItemMaster/itemstockUpdateforActive";
	private readonly _stocksUrlNew: string = "/api/ItemMaster/itemMasterpost";
	private readonly _getIntegrationUrl: string = "/api/ItemMaster/IntegrationGet";
	private readonly _ItemMasterAircraftdataUrl: string = "/api/ItemMaster/saveItemmasteraircraftdata";
	private readonly _multiintegrationsdataUrl: string = "/api/ItemMaster/savemultiIntegrations";
    private readonly _multiintegrationurl: string = "/api/ItemMaster/savemultiintegrationTypes";
    private readonly _getCapabilityUrl: string = "/api/ItemMaster/capabilityGet";
    private readonly getAuditById: string = "/api/ItemMaster/audits";
    private readonly _itemclassificationUrlNew: string = "/api/ItemMaster/itemNonStockclasspost";
    private readonly _itemNonstockclassificationGetUrl: string = "/api/ItemMaster/GetNonStockClsiifications";
    private readonly _itemPNMappingUrlNew: string = "/api/ItemMaster/PNIMMappingPost";
    
    private readonly _ItemMasterAircraftPostUrlNew: string = "/api/ItemMaster/ItemMasterAircraftPost";
    private readonly _ItemMasterATAPostUrlNew: string = "/api/ItemMaster/ItemMasterATAPost";
    private readonly _ItemMasterPurcSaleUrlNew: string = "/api/ItemMaster/ItemMasterPurcSalePost";
    private readonly _getAircraftMapped: string = "/api/ItemMaster/getAircraftMapped";
    private readonly _getATAMapped: string = "/api/ItemMaster/getATAMapped";
    private readonly _ItemMasterExportInfoUrlNew: string = "/api/ItemMaster/ExportInfoPostBy_IMastID";
    private readonly _ATAMappingUrl : string = '/api/ItemMaster/ItemMasterATAPost';

    get getItemMasterAircrafPosttUrl() { return this.configurations.baseUrl + this._ItemMasterAircraftPostUrlNew }
    get getAircraftUrl() { return this.configurations.baseUrl + this._getAircraftUrl }
    get actionsUrl() { return this.configurations.baseUrl + this._actionsUrl; }
    get actionsUrlCaps() { return this.configurations.baseUrl + this._actionsCapsUrl; }
	get aircraftmodelsurl() { return this.configurations.baseUrl + this._aircraftmodelsurl; }
	get aircraftManafacturerurl() { return this.configurations.baseUrl + this._aircraftmanafacturerurl; }
	get capesdata() { return this.configurations.baseUrl + this._capesdata; }
    get partUrl() { return this.configurations.baseUrl + this._partUrl; }
    get manufUrl() { return this.configurations.baseUrl + this._manufUrl; }
    get getCountryTypeUrl() { return this.configurations.baseUrl + this._getCountryTypeUrl; }
    get getwarningUrl() { return this.configurations.baseUrl + this._getwarningUrl; }
    get getAircraftTypeUrl() { return this.configurations.baseUrl + this._aircraftTypeUrl; }
	get listUrl() { return this.configurations.baseUrl + this._listUrl; }
	get rolesDataUrl() { return this.configurations.baseUrl + this._rolesDataUrl; }
	get rolesDataByRoleId() { return this.configurations.baseUrl + this._rolesDataByRoleId; }
    get equipUrl() { return this.configurations.baseUrl + this._equipUrl; }
    get listNonstockUrl() { return this.configurations.baseUrl + this._listNonstockUrl; }
    get liststockUrl() { return this.configurations.baseUrl + this._liststockUrl; }
    get listeqpmntUrl() { return this.configurations.baseUrl + this._listeqpmntUrl; }
	get listsUrl() { return this.configurations.baseUrl + this._lisUrl; }
    get getIntegrationUrl() { return this.configurations.baseUrl + this._getIntegrationUrl; }
    get getCapabilityUrl() { return this.configurations.baseUrl + this._getCapabilityUrl; }
    get getNonstockList() { return this.configurations.baseUrl + this._itemNonstockclassificationGetUrl; }
    

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getItemMasterById<T>(id: number): Observable<T>{
        let url = `${this._actionsUrl}/${id}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getItemMasterById(id));
            });
    }

    getitemMasterEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.actionsUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getitemMasterEndpoint());
            });
    }

    getitemMasterCapsDataEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.actionsUrlCaps, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getitemMasterCapsDataEndpoint());
            });
    }
	

	getAircraftManafacturerList<T>(itemid: any): Observable<T> {
		let url = `${this.aircraftManafacturerurl}/${itemid}`;
		return this.http.get<T>(url, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getAircraftManafacturerList(itemid));
			});
	}

	getAircraftmodels<T>(): Observable<T> {

		return this.http.get<T>(this.getAircraftUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getitemMasterEndpoint());
			});
	}

	getAircraftList<T>(itemid:any): Observable<T> {
		let url = `${this.aircraftmodelsurl}/${itemid}`;
		return this.http.get<T>(url, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getAircraftList(itemid));
			});
	}
	getCpaesData<T>(itemid: any): Observable<T> {
		let url = `${this.capesdata}/${itemid}`;
		return this.http.get<T>(url, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getCpaesData(itemid));
			});
	}
    getitemListEndpoint<T>(value): Observable<T> {
        let url = `${this.listUrl}/${value}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getitemListEndpoint(value));
            });
	}
	getRolesData<T>(): Observable<T> {
		
		return this.http.get<T>(this._rolesDataUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getRolesData());
			});
	}
	getRolesDatayRoleId<T>(event): Observable<T> {
		let url = `${this.rolesDataByRoleId}/${event}`;
		return this.http.get<T>(url, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getRolesData());
			});
	}
    getStocklist<T>(): Observable<T> {

        return this.http.get<T>(this.liststockUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getStocklist());
            });
    }


    getitemNonstockListEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.listNonstockUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getitemNonstockListEndpoint());
            });
    }

    

    getitemStockListEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.liststockUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getitemStockListEndpoint());
            });
    }

    getitemEquipmentListEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.listeqpmntUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getitemEquipmentListEndpoint());
            });
    }

    getManufacturerEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.manufUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getManufacturerEndpoint());
            });
    }


    getPartnumbersEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.partUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getPartnumbersEndpoint());
            });
    }

    getEquipmentEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.equipUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEquipmentEndpoint());
            });
    }

   

    getAirccraftTypes<T>(selectedvalues: any): Observable<T> {

        let url = `${this.getAircraftTypeUrl}/${selectedvalues}`;

        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getitemMasterEndpoint());
            });
    }
    updateDeleteStatus<T>(selectedvalues: any): Observable<T> {

        let url = `${this._updateDeleteStatus}/${selectedvalues}`;

        return this.http.put<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.updateDeleteStatus(selectedvalues));
            });
    }
    getwarningdataEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.getwarningUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getwarningdataEndpoint());
            });
    }


    getCountrysTypes<T>(): Observable<T> {

        return this.http.get<T>(this.getCountryTypeUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCountrysTypes());
            });
    }

	getNewitemMasterEndpoint<T>(userObject: any): Observable<T> {

		return this.http.post<T>(this._actionsUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
				return this.handleError(error, () => this.getNewitemMasterEndpoint(userObject));
            });
	}

	saveItemmastercapesmaninfo<T>(data:any): Observable<T> {
		//debugger;
		return this.http.post<T>(this._mancapPost, JSON.stringify(data), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.saveItemmastercapesmaninfo(data));
			});
	}

	saveAircraftinfo<T>(data: any): Observable<T> {
		//debugger;
		return this.http.post<T>(this._aircraftmodelsPost, JSON.stringify(data), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.saveItemmastercapesmaninfo(data));
			});
	}

    getNewManufacturerEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._manufactureNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewManufacturerEndpoint(userObject));
            });
    }

    getNewEquipmentEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._equipmentNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewEquipmentEndpoint(userObject));
            });
    }



    getHistoryitemMasterEndpoint<T>(itemMasterId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlAuditHistory}/${itemMasterId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getHistoryitemMasterEndpoint(itemMasterId));
            });
    }

    getEdititemMasterEndpoint<T>(itemMasterId?: number): Observable<T> {
        let endpointUrl = itemMasterId ? `${this._actionsUrlNew}/${itemMasterId}` : this._actionsUrlNew;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getEdititemMasterEndpoint(itemMasterId));
            });
    }

    getUpdateitemMasterEndpoint<T>(roleObject: any, itemMasterId: number): Observable<T> {
        
        let endpointUrl = `${this._actionsUrlNew}/${roleObject.itemMasterId}`;
		let finalobj = {
			'exportCurrencyId': roleObject.exportCurrencyId,
			'aircraftTypeId': roleObject.AircraftTypeId,
			'itemMasterId': roleObject.itemMasterId,
			'isExpirationDateAvailable': roleObject.isExpirationDateAvailable,
            'partId': roleObject.partId,
            'serialNumber': roleObject.serialNumber,
            'updatedBy': roleObject.updatedBy,
            'createdBy': roleObject.createdBy,
            'certifiedBy': roleObject.certifiedBy,
            'tagDate': roleObject.tagDate,
			'partDescription': roleObject.partDescription,
            'shelfLife': roleObject.shelfLife,
            'partAlternatePartId': roleObject.partAlternatePartId,
			'isAlternatePartChecked': roleObject.isAlternatePartChecked,
            'partNumber': roleObject.partNumber,
            'createdDate': roleObject.createdDate,
            'updatedDate': roleObject.updatedDate,
            'departmentId': roleObject.departmentId,
            'divisionId': roleObject.divisionId,
            'businessUnitId': roleObject.businessUnitId,
            'companyId': roleObject.companyId,
            'masterCompanyId': roleObject.masterCompanyId,
            'findings': roleObject.findings,
            'integrateWith': roleObject.integrateWith,
            'toleranceExpected': roleObject.toleranceExpected,
            'toleranceMaximum': roleObject.toleranceMaximum,
            'toleranceMinimum': roleObject.toleranceMinimum,
            'notes': roleObject.notes,
            'leadTime': roleObject.leadTime,
            'stockLevel': roleObject.stockLevel,
            'consumeUOM': roleObject.consumeUOM,
            'storedUOM': roleObject.storedUOM,
            'discounSalesPercent': roleObject.discounSalesPercent,
            'discountPurchasePercent': roleObject.discountPurchasePercent,
            'markUpPercent': roleObject.markUpPercent,
            'currencyId': roleObject.currencyId,
            'isRFQTracking': roleObject.isRFQTracking,
            'priceDate': roleObject.priceDate,
            'listPrice': roleObject.listPrice,
            'schematicDiagramFile': roleObject.schematicDiagramFile,
            'platformId': roleObject.platformId,
            'dateVerified': roleObject.dateVerified,
            'verifiedBy': roleObject.verifiedBy,
            'exchangeDescription': roleObject.exchangeDescription,
            'repairDescription': roleObject.repairDescription,
            'certifiedDescription': roleObject.certifiedDescription,
            'distributeDescription': roleObject.distributeDescription,
            'overhaulDescription': roleObject.overhaulDescription,
            'manufacturingDescription': roleObject.manufacturingDescription,
            'capesMemo': roleObject.capesMemo,
            'isVerified': roleObject.isVerified,
            'cmmLink': roleObject.cmmLink,
            'isCMMExist': roleObject.isCMMExist,
            'entryDate': roleObject.entryDate,
            'isCapesAvailable': roleObject.isCapesAvailable,
            'isProvisioned': roleObject.isProvisioned,
            'isActive': roleObject.isActive,
            'openDate': roleObject.openDate,
            'manufacturingDate': roleObject.manufacturingDate,
            'capabilityVerificationDate': roleObject.capabilityVerificationDate,
            'capabilityVerifiedBy': roleObject.capabilityVerifiedBy,
            'unitCost': roleObject.unitCost,
            'calibrationRequired': roleObject.calibrationRequired,
            'frequencyTypeMonths': roleObject.frequencyTypeMonths,
            'frequencyTypeDays': roleObject.frequencyTypeDays,
            'certificationRequired': roleObject.certificationRequired,
            'certificationFrequency': roleObject.certificationFrequency,
            'equipmentTypeId': roleObject.equipmentTypeId,
            'equipmentValidationTypeId': roleObject.equipmentValidationTypeId,
            'assetId': roleObject.assetId,
            'equipmentId': roleObject.equipmentId,
            'componentEquipment': roleObject.componentEquipment,
            'standAloneEquipment': roleObject.standAloneEquipment,
            'salesLastSalesDiscountPercentDate': roleObject.salesLastSalesDiscountPercentDate,
            'salesLastBaselineSalesPriceDate': roleObject.salesLastBaselineSalesPriceDate,
            'salesLastMakUpPercentOnListPriceAfterDiscDate': roleObject.salesLastMakUpPercentOnListPriceAfterDiscDate,
            'salesLastMarkUpPercentOnListPriceDate': roleObject.salesLastMarkUpPercentOnListPriceDate,
            'salesDiscountPercent': roleObject.salesDiscountPercent,
            'salesBaselineSalesPrice': roleObject.salesBaselineSalesPrice,
            'salesMarkUpOnListPriceAfterDisc': roleObject.salesMarkUpOnListPriceAfterDisc,
            'salesMarkUpOnListPrice': roleObject.salesMarkUpOnListPrice,
            'salesMarkUpOnPurchaseListPriceActive': roleObject.salesMarkUpOnPurchaseListPriceActive,
            'salesLastSalePriceDate': roleObject.salesLastSalePriceDate,
            'salesCurrencyId': roleObject.salesCurrencyId,
            'salesPrice': roleObject.salesPrice,
            'salesIsFixedPrice': roleObject.salesIsFixedPrice,
            'purchaseLastListPriceAfterDiscountDate': roleObject.purchaseLastListPriceAfterDiscountDate,
            'purchaseLastDiscountPercentDate': roleObject.purchaseLastDiscountPercentDate,
            'purchaseLastListPriceDate': roleObject.purchaseLastListPriceDate,
            'purchaseCurrencyId': roleObject.purchaseCurrencyId,
            'purchaseListPriceAfterDiscount': roleObject.purchaseListPriceAfterDiscount,
            'purchaseDiscountOffListPrice': roleObject.purchaseDiscountOffListPrice,
            'purchaseListPrice': roleObject.purchaseListPrice,
            'exportClassificationId': roleObject.exportClassificationId,
            'exportSizeUnit': roleObject.exportSizeUnit,
            'exportSizeHeight': roleObject.exportSizeHeight,
            'exportSizeWidth': roleObject.exportSizeWidth,
            'exportSizeLength': roleObject.exportSizeLength,
            'exportWeightUnit': roleObject.exportWeightUnit,
            'exportWeight': roleObject.exportWeight,
            'exportValue': roleObject.exportValue,
            'exportCountryId': roleObject.exportCountryId,
            'memo': roleObject.memo,
            'warningId': roleObject.warningId,
            'integrationPortalId': roleObject.IntegrationPortalId,
            'priorityId': roleObject.priorityId,
            'soCoreCharge': roleObject.soCoreCharge,
            'poCoreCharge': roleObject.poCoreCharge,
            'partListPrice': roleObject.partListPrice,
            'overheadCost': roleObject.overheadCost,
            'exchangeListPrice': roleObject.exchangeListPrice,
            'coreValue': roleObject.coreValue,
            'isExchangeInfoAvailable': roleObject.isExchangeInfoAvailable,
            'minimumOrderQuantity': roleObject.minimumOrderQuantity,
            'reorderQuantiy': roleObject.reorderQuantiy,
            'reorderPoint': roleObject.reorderPoint,
            'leadTimeHours': roleObject.leadTimeHours,
            'leadTimeDays': roleObject.leadTimeDays,
            'consumeUnitOfMeasureId': roleObject.consumeUnitOfMeasureId,
            'stockUnitOfMeasureId': roleObject.stockUnitOfMeasureId,
			'purchaseUnitOfMeasureId': roleObject.purchaseUnitOfMeasureId,
			'exportUomId': roleObject.exportUomId,	
            'glAccountId': roleObject.glAccountId,
            'rfqTracking': roleObject.rfqTracking,
            'cse': roleObject.cse,
            'testHours': roleObject.testHours,
            'rpHours': roleObject.rpHours,
            'overhaulHours': roleObject.overhaulHours,
            'isSchematic': roleObject.isSchematic,
            'nationalStockNumber': roleObject.nationalStockNumber,
            'ataChapterId': roleObject.ataChapterId,
            'ataSubChapterId': roleObject.ataSubChapterId,
            'der': roleObject.der,
            'pma': roleObject.pma,
            'manufacturerId': roleObject.manufacturerId,
            
            'activeFlag': roleObject.activeFlag,
            'isShippedDateAvailable': roleObject.isShippedDateAvailable,
            'shippedDays': roleObject.shippedDays,
            'isOtherDateAvailable': roleObject.isOtherDateAvailable,
            'otherDays': roleObject.otherDays,
            'isAcquiredMethodBuy': roleObject.isAcquiredMethodBuy,
            'isHazardousMaterial': roleObject.isHazardousMaterial,
            'isReceivedDateAvailable': roleObject.isReceivedDateAvailable,
            'itemGroupId': roleObject.itemGroupId,
            'partsCertNum': roleObject.partsCertNum,
            'tagType': roleObject.tagType,
            'daysReceived': roleObject.daysReceived,
            'assetNumber': roleObject.assetNumber,
            'provisionId': roleObject.provisionId,
            'expirationDate': roleObject.expirationDate,
			'itemClassificationId': roleObject.itemClassificationId,
			
			'isManufacturingDateAvailable': roleObject.isManufacturingDateAvailable,
			'isTagDateAvailable': roleObject.isTagDateAvailable,
			'isOpenDateAvailable': roleObject.isOpenDateAvailable,
			'turnTimeOverhaulHours': roleObject.turnTimeOverhaulHours,
			'turnTimeRepairHours': roleObject.turnTimeRepairHours,
			'Core Value': roleObject.CoreValue,
			'manufacturingDays': roleObject.manufacturingDays,
			'tagDays': roleObject.tagDays,
			'openDays': roleObject.openDays,
			'nha': roleObject.nha,
			'isSerialized': roleObject.isSerialized,
			'soldUnitOfMeasureId': roleObject.soldUnitOfMeasureId,
            'isTimeLife': roleObject.isTimeLife,
            'itemTypeId':roleObject.itemTypeId
            

           
        }
        return this.http.put<T>(endpointUrl, JSON.stringify(finalobj), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateitemMasterEndpoint(roleObject, itemMasterId));
            });
    }

    getUpdateitemMasterNonstockEndpoint<T>(roleObject: any, itemMasterId: number): Observable<T> {

        let endpointUrl = `${this._actionsUrlNew}/${roleObject.itemMasterId}`;
        let finalobj = {
            'partId': roleObject.partId,
            'itemTypeId': roleObject.itemTypeId,
            'updatedBy': roleObject.updatedBy,
            'createdBy': roleObject.createdBy,
            'itemClassificationId': roleObject.itemClassificationId,
            'isHazardousMaterial': roleObject.isHazardousMaterial,
			'purchaseUnitOfMeasureId': roleObject.purchaseUnitOfMeasureId,
			'discountPurchasePercent': roleObject.discountPurchasePercent,
            'isAcquiredMethodBuy': roleObject.isAcquiredMethodBuy,
            'listPrice': roleObject.listPrice,
            'unitCost': roleObject.unitCost,
            'manufacturerId': roleObject.manufacturerId,
            'currencyId': roleObject.currencyId,
            'priceDate': roleObject.priceDate,
            'partdescription': roleObject.partdescription,
            'partNumber': roleObject.partNumber,
			'itemGroupId': roleObject.itemGroupId,
            'glAccountId': roleObject.glAccountId,
            'itemNonStockClassificationId': roleObject.itemNonStockClassificationId
        }
        return this.http.put<T>(endpointUrl, JSON.stringify(finalobj), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateitemMasterNonstockEndpoint(roleObject, itemMasterId));
            });
    }



    getUpdateitemMasterEquipmentEndpoint<T>(roleObject: any, itemMasterId: number): Observable<T> {

        let endpointUrl = `${this._actionsUrlNew}/${roleObject.itemMasterId}`;
        let equipmentobj = {
            'partId': roleObject.partId,
            'updatedBy': roleObject.updatedBy,
            'createdBy': roleObject.createdBy,
            'certifiedBy': roleObject.certifiedBy,
            'tagDate': roleObject.tagDate,
            'partdescription': roleObject.partdescription,
            'partNumber': roleObject.partNumber,
            'createdDate': roleObject.createdDate,
            'updatedDate': roleObject.updatedDate,
            'masterCompanyId': roleObject.masterCompanyId,
            'findings': roleObject.findings,
            'toleranceExpected': roleObject.toleranceExpected,
            'toleranceMaximum': roleObject.toleranceMaximum,
            'toleranceMinimum': roleObject.toleranceMinimum,
            'storedUOM': roleObject.storedUOM,
            'currencyId': roleObject.currencyId,
            'capesMemo': roleObject.capesMemo,
            'unitCost': roleObject.unitCost,
            'calibrationRequired': roleObject.calibrationRequired,
            'certificationRequired': roleObject.certificationRequired,
            'certificationFrequency': roleObject.certificationFrequency,
            'equipmentTypeId': roleObject.equipmentTypeId,
            'equipmentValidationTypeId': roleObject.equipmentValidationTypeId,
            'assetId': roleObject.assetId,
            'equipmentId': roleObject.equipmentId,
            'memo': roleObject.memo,
            'partListPrice': roleObject.partListPrice,
            'isSchematic': roleObject.isSchematic,
            'manufacturerId': roleObject.manufacturerId,
            'aircraftTypeId': roleObject.AircraftTypeId,
            'isAcquiredMethodBuy': roleObject.isAcquiredMethodBuy,
            'itemGroupId': roleObject.itemGroupId,
            'partsCertNum': roleObject.partsCertNum,
            'tagType': roleObject.tagType,
            'daysReceived': roleObject.daysReceived,
            'assetNumber': roleObject.assetNumber,
            'provisionId': roleObject.provisionId,
            'expirationDate': roleObject.expirationDate,
            'itemClassificationId': roleObject.itemClassificationId,
            'frequencyTypeMonths': roleObject.frequencyTypeMonths,
			'frequencyTypeDays': roleObject.frequencyTypeDays,
			'equipmentUOMId': roleObject.equipmentUOMId,
			'isManufacturingDateAvailable': roleObject.isManufacturingDateAvailable,
			'isTagDateAvailable': roleObject.isTagDateAvailable,
			'isOpenDateAvailable': roleObject.isOpenDateAvailable,
			'Core Value': roleObject.CoreValue,
			'manufacturingDays': roleObject.manufacturingDays,
			'tagDays': roleObject.tagDays,
			'openDays': roleObject.openDays,
			'isHazardousMaterial': roleObject.isHazardousMaterial,
			'isReceivedDateAvailable': roleObject.isReceivedDateAvailable,
			'isExpirationDateAvailable': roleObject.isExpirationDateAvailable,
			'isSerialized': roleObject.isSerialized,
			'parentPartId': roleObject.parentPartId,
			'standAloneEquipment': roleObject.standAloneEquipment,
			'glAccountId': roleObject.glAccountId
		

        }
        return this.http.put<T>(endpointUrl, JSON.stringify(equipmentobj), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateitemMasterEquipmentEndpoint(roleObject, itemMasterId));
            });
    }
    getDeleteitemMasterEndpoint<T>(itemMasterId: number): Observable<T> {
        let endpointUrl = `${this._actionsUrlNew}/${itemMasterId}`;

        return this.http.delete<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getDeleteitemMasterEndpoint(itemMasterId));
            });
    }
    getNewwarningEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._warnUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewwarningEndpoint(userObject));
            });
    }

	getDescriptionbypart<T>(partNumber): Observable<T> {
		let url = `${this.listsUrl}/${partNumber}`;
		return this.http.get<T>(url, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getDescriptionbypart(partNumber));
			});
	}
	getUpdatestockEndpointforActive<T>(itemmaster: any): Observable<T> {
		let endpointUrl = `${this._updateActiveInactiveforstock}/${itemmaster.itemMasterId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(itemmaster), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdatecustomerEndpointforstock(itemmaster));
			});

	}

	getUpdatecustomerEndpointforstock<T>(itemmaster: any): Observable<T> {
		let endpointUrl = `${this._stocksUrlNew}/${itemmaster.itemMasterId}`;

		return this.http.put<T>(endpointUrl, JSON.stringify(itemmaster), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getUpdatecustomerEndpointforstock(itemmaster));
			});

	}

	getIntegrationEndpoint<T>(ItemMasterId: any): Observable<T> {
		let url = `${this.getIntegrationUrl}/${ItemMasterId}`;
		return this.http.get<T>(url, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getIntegrationEndpoint(ItemMasterId));
			});
	}

    getMultiIntegrations<T>(userObject: any): Observable<T>
    {


		return this.http.post<T>(this._multiintegrationsdataUrl, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getMultiIntegrations(userObject));
			});
	}

	//For Storing Item Master Aircraft Data
	getItemMasteraircrafttypeEndpoint<T>(userObject: any): Observable<T> {


		return this.http.post<T>(this._ItemMasterAircraftdataUrl, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getItemMasteraircrafttypeEndpoint(userObject));
			});
	}
	getMultileaves<T>(userObject: any): Observable<T> {


		return this.http.post<T>(this._multiintegrationurl, JSON.stringify(userObject), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getMultileaves(userObject));
			});
    }

   

    getCapabilityDataEndpoint<T>(ItemMasterId: any): Observable<T> {
        let url = `${this.getCapabilityUrl}/${ItemMasterId}`;
        return this.http.get<T>(url, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getCapabilityDataEndpoint(ItemMasterId));
            });
    }

    getAudit<T>(ItemMasterId: number): Observable<T> {
        let endpointUrl = `${this.getAuditById}/${ItemMasterId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAudit(ItemMasterId));
            });
    }

    getitemclassificationnonStockEndpoint<T>(): Observable<T> {

        return this.http.get<T>(this.getNonstockList, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getitemclassificationnonStockEndpoint());
            });
    }

    getNewitemclassificationEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._itemclassificationUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewitemclassificationEndpoint(userObject));
            });
    }
    getNewitemAircraftEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._ItemMasterAircraftPostUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewitemAircraftEndpoint(userObject));
            });
    }
    getNewitemATAEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._ItemMasterATAPostUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewitemATAEndpoint(userObject));
            });
    }
    getNewitemPurcSaleEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._ItemMasterPurcSaleUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewitemPurcSaleEndpoint(userObject));
            });
    }

    getUpdateActionEndpoint<T>(roleObject: any, actionId: number): Observable<T> {
        let endpointUrl = `${this._itemclassificationUrlNew}/${actionId}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getUpdateActionEndpoint(roleObject, actionId));
            });
    }
    // get all aircraft models
    getAllAircraftList():any{
      const getaircraftUrl = `${Url}AircraftManufacturer/getAll`;
      return this.http.get(getaircraftUrl , this.getRequestHeaders() );
    }
    getPNIMMappingEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._itemPNMappingUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getPNIMMappingEndpoint(userObject));
            });
    }
    getAircraftMappingEndpoint<T>(ItemmasterId: number): Observable<T> {
        let endpointUrl = `${this._getAircraftMapped}/${ItemmasterId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAircraftMappingEndpoint(ItemmasterId));
            });
    }
    getATAMappingEndpoint<T>(ItemmasterId: number): Observable<T> {
        let endpointUrl = `${this._getATAMapped}/${ItemmasterId}`;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getATAMappingEndpoint(ItemmasterId));
            });
    }
    getNewitemExportInfoEndpoint<T>(userObject: any): Observable<T> {

        return this.http.post<T>(this._ItemMasterExportInfoUrlNew, JSON.stringify(userObject), this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getNewitemExportInfoEndpoint(userObject));
            });
    }
    saveATAMapping<T>(mappedData: any):Observable<T>{
        return this.http.post<T>( this._ATAMappingUrl, JSON.stringify(mappedData), this.getRequestHeaders())
        .catch(err => {
            return this.handleError( err , () => this.saveATAMapping(mappedData));
        })
    }
}