﻿
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EndpointFactory } from '../services/endpoint-factory.service';
import { ConfigurationService } from '../services/configuration.service';
import { Dir } from '@angular/cdk/bidi';
import { Charge } from '../models/charge.model';

//import { EndpointFactory } from './endpoint-factory.service';
//import { ConfigurationService } from './configuration.service';

@Injectable()
export class ActionEndpoint extends EndpointFactory {


	private readonly _actionsUrl: string = "/api/Action/Get";
	private readonly _actionsUrlNew: string = "/api/Action/actions";
	private readonly _actionsUrlAuditHistory: string = "/api/Action/auditHistoryById";
	private getActionURL: string = "/api/Task/Get";
	private getActionAttributesURL: string = "/api/ActionAttribute/Get";
	private getChargesTypeURL: string = 'api/mastertest/ChargesType';
	private getChargesCurrencyURL: string = 'api/mastertest/ChargesCurrency';
	private getEquipmentAssetTypesURL: string = 'api/mastertest/EquipmentAssetType';
	private getExpertiseTypeURL: string = 'api/mastertest/ExpertiseType';
	private getMaterialConditionURL: string = 'api/mastertest/MaterialCondition';
	private getMaterialUOMURL: string = 'api/mastertest/MaterialUOM';
	private getMaterialMandatoryURL: string = 'api/mastertest/MaterialMandatory';

	private getPublcationTypeURL: string = 'api/mastertest/PublicationType';
	private getPublicationAircraftManufacturerURL: string = 'api/mastertest/PublicationAircraftManufacturer';
	private getPublicationModelURL: string = 'api/mastertest/PublicationModel';
	private getLocationsUrl: string = 'api/Location/Get';
	private getPublicationStatusURL: string = 'api/mastertest/PublicationStatus';
	private getExclusionEstimatedOccuranceURL: string = 'api/mastertest/ExclusionEstimatedOccurance';
	private getAddActionURL: string = "api/Task/add";
	private AddWorkFlowURL: string = "api/workflow/addWorkFlow";
	private AddChargesURL: string = "api/workflow/addCharges";
	private AddDirectionURL: string = "api/workflow/addDirection";
	private AddEquipmentURL: string = "api/workflow/addEquipment";
	private AddExclusionURL: string = "api/workflow/addExclusion";
	private AddExpertiseURL: string = "api/workflow/addExpertise";
	private AddMaterialListURL: string = "api/workflow/addMaterial";
	private AddMeasurementURL: string = "api/workflow/addMeasurement";
	private AddPublicationURL: string = "api/workflow/addPublication";
	private getWorkFlowURL: string = "api/workflow/getworkflow";
	private UpdateChargesURL: string = "api/workflow/updateCharges";
	private UpdateDirectionURL: string = "api/workflow/updateDirection";
	private UpdateEquipmentURL: string = "api/workflow/updateEquipment";
	private UpdateExclusionURL: string = "api/workflow/updateExclusion";
	private UpdateExpertiseURL: string = "api/workflow/updateExpertise";
	private UpdateMaterialListURL: string = "api/workflow/updateMaterial";
	private UpdateMeasurementURL: string = "api/workflow/updateMeasurement";
	private UpdatePublicationURL: string = "api/workflow/updatePublication";
	get actionsUrl() { return this.configurations.baseUrl + this._actionsUrl; }

	constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

		super(http, configurations, injector);
	}

	getWorkFlow<T>(workflowid:any): Observable<T> {
		//let endpointurl = this.getWorkFlowURL

		let endpointUrl = `${this.getWorkFlowURL}/${workflowid}`;
		return this.http.get<T>(endpointUrl, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getWorkFlow(workflowid));
			});
	}

	getNewWorkFlow<T>(workflowData: any): Observable<T> {
		let obj = {
			'workflowDescription': workflowData.workflowDescription,
			'version': workflowData.version,
			'itemMasterId': workflowData.itemMasterId,
			'flatRate': workflowData.flatRate,
			'partNumberDescription': workflowData.partNumberDescription,
			'changedPartNumber': workflowData.changedPartNumber,
			'currencyId': workflowData.currencyId,
			'customerId': workflowData.customerId,
			'workflowExpirationDate': workflowData.workflowExpirationDate,
			'isCalculatedBERThreshold': workflowData.isCalculatedBERThreshold,
			'isFixedAmount': workflowData.isFixedAmount,
			'isPercentageofNew': workflowData.isPercentageofNew,
			'costOfNew': workflowData.costOfNew,
			'fixedAmount': workflowData.fixedAmount,
			'percenatgeOfNew': workflowData.percenatgeOfNew,
			'isPercentageOfReplacement': workflowData.isPercentageOfReplacement,
			'percentageOfReplacement': workflowData.percentageOfReplacement,
			'percentageOfNew': workflowData.percentageOfNew,
			'berThresholdAmount': workflowData.berThresholdAmount,
			'costOfReplacement': workflowData.costOfReplacement,
			'pecentageOfReplacement': workflowData.pecentageOfReplacement,
			'memo': workflowData.memo,
			'customerName':workflowData.customerName,
			'partNumber': workflowData.partNumber,
			'workflowId': workflowData.workflowId,
            'workScopeId': workflowData.workScopeId,
            'customerCode': workflowData.customerCode
		}
		return this.http.post<T>(this.AddWorkFlowURL, JSON.parse(JSON.stringify(obj)), this.getRequestHeaders())
		//return this.http.post<T>(this.AddWorkFlowURL,JSON.parse(JSON.stringify((workflowData)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getNewWorkFlow(workflowData));
			});
	}

	


	addCharges<T>(charges: any): Observable<T> {
		let obj = {
			'actionId': charges.actionId,
			'workflowId': charges.workflowId,
			//'vendorPriceOrUnit': charges.vendorPriceOrUnit,
			'currencyId': charges.currencyId,
			'description': charges.description,
			'extendedCost': charges.extendedCost,
			'vendorName': charges.vendorName,
			'extendedPrice': charges.extendedPrice,
			'forexRate': charges.forexRate,
			'quantity': charges.quantity,
			'unitCost': charges.unitCost,
			'unitPrice': charges.unitPrice,
			//'vendorId': charges.vendorId,
			'vendorUnitPrice': charges.vendorUnitPrice,
			'workflowChargeTypeId': charges.workflowChargeTypeId,
			//'memo': charges.memo,
			'isDelete': charges.isDelete,

		}
		return this.http.post<T>(this.AddChargesURL, JSON.parse(JSON.stringify(obj)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.addCharges(charges));
			});
	}

	addDirection<T>(direction: any): Observable<T> {
		let obj = {
			'actionId': direction.actionId,
			'workflowId': direction.workflowId,
			'action': direction.action,
			'description': direction.description,
			'sequence': direction.sequence,
			'memo': direction.memo,
			'isDelete': direction.isDelete,
		}
		return this.http.post<T>(this.AddDirectionURL, JSON.parse(JSON.stringify(obj)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.addDirection(direction));
			});
	}
	addEquipment<T>(equipment: any): Observable<T> {
		let obj = {
			'actionId': equipment.actionId,
			'workflowId': equipment.workflowId,
			'assetDescription': equipment.assetDescription,
			'assetId': equipment.assetId,
			'assetTypeId': equipment.assetTypeId,
			'quantity': equipment.quantity,
			'memo': equipment.memo,
			'isDelete': equipment.isDelete,
			'partNumber':equipment.partNumber
		}
		return this.http.post<T>(this.AddEquipmentURL, JSON.parse(JSON.stringify(obj)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.addEquipment(equipment));
			});
	}

	addExclusion<T>(exclusion: any): Observable<T> {
		let obj = {
			'actionId': exclusion.actionId,
			'workflowId': exclusion.workflowId,
			'partDescription': exclusion.partDescription,
			'estimtPercentOccurrance': exclusion.estimtPercentOccurrance,
			'extendedCost': exclusion.extendedCost,
			'partNumber': exclusion.partNumber,
			'partName': exclusion.partName,
			'itemMasterId': exclusion.itemMasterId,
			'quantity': exclusion.quantity,
			'unitCost': exclusion.unitCost,
			'isDelete': exclusion.isDelete,
			'memo':exclusion.memo
		}
		return this.http.post<T>(this.AddExclusionURL, JSON.parse(JSON.stringify(obj)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.addExclusion(exclusion));
			});
	}
	addExpertise<T>(expertise: any): Observable<T> {
		let obj = {
			'directLaborRate': expertise.directLaborRate,
			'workflowId': expertise.workflowId,
			'estimatedHours': expertise.estimatedHours,
			'expertiseTypeId': expertise.expertiseTypeId,
			'laborDirectRate': expertise.laborDirectRate,
			'laborOverheadCost': expertise.laborOverheadCost,
			'overheadBurden': expertise.overheadBurden,
			'overheadCost': expertise.overheadCost,
			'standardRate': expertise.standardRate,
			'actionId': expertise.actionId,
			'isDelete': expertise.isDelete,

		}
		return this.http.post<T>(this.AddExpertiseURL, JSON.parse(JSON.stringify(obj)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.addExpertise(expertise));
			});
	}

	addMaterial<T>(material: any): Observable<T> {
		let obj = {
			'actionId': material.actionId,
			'conditionCodeId': material.conditionCodeId,
			'extendedCost': material.extendedCost,
			'extraCost': material.extraCost,
			'isDeferred': material.isDeferred,
			'itemClassificationId': material.itemClassificationId,
			'itemMasterId': material.itemMasterId,
			'mandatoryOrSupplemental': material.mandatoryOrSupplemental,
			'partDescription': material.partDescription,
			'memo': material.memo,
			'price': material.price,
			'provisionId': material.provisionId,
			'quantity': material.quantity,
			'unitCost': material.unitCost,
			'unitOfMeasureId': material.unitOfMeasureId,
			'workflowId': material.workflowId,
			'isDelete': material.isDelete,
			'partNumber': material.partNumber
		}
		return this.http.post<T>(this.AddMaterialListURL, JSON.parse(JSON.stringify(obj)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.addMaterial(material));
			});
	}
	addMeasurement<T>(measurement: any): Observable<T> {
		let obj = {
			'actionId': measurement.actionId,
			'itemMasterId': measurement.itemMasterId,
			'sequence': measurement.sequence,
			'stage': measurement.stage,
			'min': measurement.min,
			'max': measurement.max,
			'expected': measurement.expected,
			'diagramURL': measurement.diagramURL,
			'memo': measurement.memo,
			'isDelete': measurement.isDelete,
			'partNumber': measurement.partNumber,
			'partDescription': measurement.partDescription,
			'workflowId':measurement.workflowId
		}
		return this.http.post<T>(this.AddMeasurementURL, JSON.parse(JSON.stringify(obj)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.addMeasurement(measurement));
			});
	}

	addPublication<T>(publication: any): Observable<T> {

		return this.http.post<T>(this.AddPublicationURL, JSON.parse(JSON.stringify(publication)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.addPublication(publication));
			});
	}

	updateCharges<T>(charges: any): Observable<T> {
		let obj = {
			'actionId': charges.actionId,
			'workflowId': charges.workflowId,
			//'vendorPriceOrUnit': charges.vendorPriceOrUnit,
			'currencyId': charges.currencyId,
			'description': charges.description,
			'extendedCost': charges.extendedCost,
			'extendedPrice': charges.extendedPrice,
			'vendorName': charges.vendorName,
			'forexRate': charges.forexRate,
			'quantity': charges.quantity,
			'unitCost': charges.unitCost,
			'unitPrice': charges.unitPrice,
			'vendorId': charges.vendorId,
			'vendorUnitPrice': charges.vendorUnitPrice,
			'workflowChargeTypeId': charges.workflowChargeTypeId,
			//'memo': charges.memo,
			'isDelete': charges.isDelete,
			'workflowChargesListId': charges.workflowChargesListId

		}
		return this.http.post<T>(this.UpdateChargesURL, JSON.parse(JSON.stringify(obj)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updateCharges(charges));
			});
	}

	updateEquipment<T>(equipment: any): Observable<T> {
		let obj = {
			'actionId': equipment.actionId,
			'workflowId': equipment.workflowId,
			'assetDescription': equipment.assetDescription,
			'assetId': equipment.assetId,
			'assetTypeId': equipment.assetTypeId,
			'quantity': equipment.quantity,
			'memo': equipment.memo,
			'isDelete': equipment.isDelete,
			'workflowEquipmentListid': equipment.workflowEquipmentListid,
			'partNumber':equipment.partNumber
		}
		return this.http.post<T>(this.UpdateEquipmentURL, JSON.parse(JSON.stringify(equipment)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updateEquipment(equipment));
			});
	}


	updateDirection<T>(direction: any): Observable<T> {
		let obj = {
			'actionId': direction.actionId,
			'workflowId': direction.workflowId,
			'workflowDirectionId': direction.workflowDirectionId,
			'action': direction.action,
			'description': direction.description,
			'sequence': direction.sequence,
			'memo': direction.memo,
			'isDelete': direction.isDelete,
		}
		return this.http.post<T>(this.UpdateDirectionURL, JSON.parse(JSON.stringify(obj)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updateEquipment(direction));
			});
	}

	updateExclusion<T>(exclusion: any): Observable<T> {
		let obj = {
			'actionId': exclusion.actionId,
			'workflowId': exclusion.workflowId,
			'partDescription': exclusion.partDescription,
			'workflowExclusionId': exclusion.workflowExclusionId,
			'estimtPercentOccurrance': exclusion.estimtPercentOccurrance,
			'extendedCost': exclusion.extendedCost,
			'partNumber': exclusion.partNumber,
			'partName': exclusion.partName,
			'itemMasterId': exclusion.itemMasterId,
			'quantity': exclusion.quantity,
			'unitCost': exclusion.unitCost,
			'isDelete': exclusion.isDelete,
			'memo': exclusion.memo,

		}
		return this.http.post<T>(this.UpdateExclusionURL, JSON.parse(JSON.stringify(obj)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updateExclusion(exclusion));
			});
	}
	updateExpertise<T>(expertise: any): Observable<T> {
		let obj = {
			'directLaborRate': expertise.directLaborRate,
			'workflowId': expertise.workflowId,
			'estimatedHours': expertise.estimatedHours,
			'workflowExpertiseListId': expertise.workflowExpertiseListId,
			'expertiseTypeId': expertise.expertiseTypeId,
			'laborDirectRate': expertise.laborDirectRate,
			'laborOverheadCost': expertise.laborOverheadCost,
			'overheadBurden': expertise.overheadBurden,
			'overheadCost': expertise.overheadCost,
			'standardRate': expertise.standardRate,
			'actionId': expertise.actionId,
			'isDelete': expertise.isDelete,

		}
		return this.http.post<T>(this.UpdateExpertiseURL, JSON.parse(JSON.stringify(obj)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updateExclusion(expertise));
			});
	} 

	updateMeasurement<T>(measurement: any): Observable<T> {
		let obj = {
			'actionId': measurement.actionId,
			'workflowId': measurement.workflowId,
			'itemMasterId': measurement.itemMasterId,
			'sequence': measurement.sequence,
			'stage': measurement.stage,
			'min': measurement.min,
			'max': measurement.max,
			'expected': measurement.expected,
			'diagramURL': measurement.diagramURL,
			'memo': measurement.memo,
			'isDelete': measurement.isDelete,
			'partNumber': measurement.partNumber,
			'partDescription': measurement.partDescription,
			'workflowMeasurementId': measurement.workflowMeasurementId
		}
		return this.http.post<T>(this.UpdateMeasurementURL, JSON.parse(JSON.stringify(obj)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updateMeasurement(measurement));
			});
	} 




	updateMaterial<T>(material: any): Observable<T> {
		let obj = {
			'actionId': material.actionId,
			'conditionCodeId': material.conditionCodeId,
			'extendedCost': material.extendedCost,
			'extraCost': material.extraCost,
			'isDeferred': material.isDeferred,
			'partNumber': material.partNumber,
			'itemClassificationId': material.itemClassificationId,
			'workflowMaterialListId': material.workflowMaterialListId,
			'itemMasterId': material.itemMasterId,
			'mandatoryOrSupplemental': material.mandatoryOrSupplemental,
			'partDescription': material.partDescription,
			'memo': material.memo,
			'price': material.price,
			'provisionId': material.provisionId,
			'quantity': material.quantity,
			'unitCost': material.unitCost,
			'unitOfMeasureId': material.unitOfMeasureId,
			'workflowId': material.workflowId,
			'isDelete': material.isDelete,
		}
		return this.http.post<T>(this.UpdateMaterialListURL, JSON.parse(JSON.stringify(obj)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updateMeasurement(obj));
			});
	} 


	updatePublication<T>(expertise: any): Observable<T> {
		let obj =
			{
				"id": expertise.id,
				"publicationId": expertise.publicationId,
				"publicationDescription": expertise.publicationDescription,
				"publicationType": expertise.publicationType,
				"sequence": expertise.sequence,
				"source": expertise.source,
				"aircraftManufacturer": expertise.aircraftManufacturer,
				"model": expertise.model,
				"location": expertise.location,
				"revision": expertise.revision,
				"revisionDate": expertise.revisionDate,
				"verifiedBy": expertise.verifiedBy,
				"verifiedDate": expertise.verifiedDate,
				"status": expertise.status,
				"image": expertise.image,
				"isDeleted": expertise.isDeleted,
				"actionId": expertise.actionId,
				"workflowId": expertise.workflowId,
				"AllowEdit": expertise.AllowEdit
			};

		return this.http.post<T>(this.UpdatePublicationURL, JSON.parse(JSON.stringify(obj)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.updatePublication(expertise));
			});
	} 

	addAction<T>(action: any): Observable<T> {

		return this.http.post<T>(this.getAddActionURL, JSON.parse(JSON.stringify(action)), this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.addAction(action));
			});
	}

	

	getActions<T>(): Observable<T> {

		return this.http.get<T>(this.getActionURL, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getActions());
			});
	}
	getActionAttributes<T>(): Observable<T> {

		return this.http.get<T>(this.getActionAttributesURL, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getActionAttributes());
			});
	}


	getChargesCurrency<T>(): Observable<T> {

		return this.http.get<T>(this.getChargesCurrencyURL, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getChargesCurrency());
			});
	}

	GetExpertiseType<T>(): Observable<T> {

		return this.http.get<T>(this.getExpertiseTypeURL, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.GetExpertiseType());
			});
	}
	getEquipmentAssetType<T>(): Observable<T> {

		return this.http.get<T>(this.getEquipmentAssetTypesURL, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getEquipmentAssetType());
			});
	}
	GetMaterialMandatory<T>(): Observable<T> {

		return this.http.get<T>(this.getMaterialMandatoryURL, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.GetMaterialMandatory());
			});
	}

	GetMaterialUOM<T>(): Observable<T> {

		return this.http.get<T>(this.getMaterialUOMURL, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.GetMaterialUOM());
			});
	}

	GetExclusionEstimatedOccurance<T>(): Observable<T> {



		return this.http.get<T>(this.getExclusionEstimatedOccuranceURL, this.getRequestHeaders())

			.catch(error => {

				return this.handleError(error, () => this.GetExclusionEstimatedOccurance());

			});

	}



	GetPublicationStatus<T>(): Observable<T> {



		return this.http.get<T>(this.getPublicationStatusURL, this.getRequestHeaders())

			.catch(error => {

				return this.handleError(error, () => this.GetPublicationStatus());

			});

	}



	GetPublicationModel<T>(aircraftTypeId): Observable<T> {

		let endpointUrl = `${this.getPublicationModelURL}/${aircraftTypeId}`;

		return this.http.get<T>(endpointUrl, this.getRequestHeaders())

			.catch(error => {

				return this.handleError(error, () => this.GetPublicationModel(aircraftTypeId));

			});

	}
	getLocations<T>(): Observable<T> {

		

		return this.http.get<T>(this.getLocationsUrl, this.getRequestHeaders())

			.catch(error => {

				return this.handleError(error, () => this.getLocations());

			});

	}





	GetPublicationAircraftManufacturer<T>(): Observable<T> {



		return this.http.get<T>(this.getPublicationAircraftManufacturerURL, this.getRequestHeaders())

			.catch(error => {

				return this.handleError(error, () => this.GetPublicationAircraftManufacturer());

			});


	}



	GetPublicationType<T>(): Observable<T> {



		return this.http.get<T>(this.getPublcationTypeURL, this.getRequestHeaders())

			.catch(error => {

				return this.handleError(error, () => this.GetPublicationType());

			});


	}
	getChargesType<T>(): Observable<T> {


		return this.http.get<T>(this.getChargesTypeURL, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.getChargesType());
			});
	}

	GetMaterialCondition<T>(): Observable<T> {


		return this.http.get<T>(this.getMaterialConditionURL, this.getRequestHeaders())
			.catch(error => {
				return this.handleError(error, () => this.GetMaterialCondition());
			});
	}

}