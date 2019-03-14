import { Injectable } from "@angular/core";
import { IAction } from "./Action";
import { IActionAttrbutes } from "./ActionAttributes";

import { Observable } from "rxjs";
import {tap,catchError} from "rxjs/operators"
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { IChargesType } from "./ChargesType";
import { IChargesCurrency } from "./ChargesCurrency";
import { ICharges } from "./Charges";
import { IEquipmentAssetType } from "./EquipmentAssetType";
import { IExpertiseType } from "./ExpertiseType";
import { IMaterialCondition } from "./MaterialCondition";
import { IMaterialMandatory } from "./MaterialMandatory";
import { IMaterialUOM } from "./MaterialUOM";
import { IPublicationType } from "./PublicationType";
import { IPublicationAircraftManufacturer } from "./PublicationAircraftManufacturer";
import { IPublicationModel } from "./PublicationModel";
import { IPublicationStatus } from "./PublicationStatus";
import { IExclusionEstimatedOccurance } from "./ExclusionEstimatedOccurance";
import { IWorkFlow } from "./WorkFlow";
import { IDirections } from "./Directions";
import { IEquipmentList } from "./EquipmentList";
import { IExclusion } from "./Exclusion";
import { IExpertise } from "./Expertise";
import { IMaterialList } from "./MaterialList";
import { IMeasurement } from "./Measurement";
import { IPublication } from "./Publication";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ActionEndpoint } from "./action-endpoint.service";
import { Action } from "../models/action.model";
import { ActionAttribute } from "../models/actionattribute.model";


@Injectable()
export class ActionService
{


	constructor(
		private router: Router,
		private http: HttpClient,
		private authService: AuthService,
		private actionEndpoint: ActionEndpoint) { }

/// Charges Section





	GetExclusionEstimatedOccurance() {

		return this.actionEndpoint.GetExclusionEstimatedOccurance<IExclusionEstimatedOccurance[]>();

	}





	GetPublicationStatus() {

		return this.actionEndpoint.GetPublicationStatus<IPublicationStatus[]>();

	}





	GetPublicationModel(aircraftTypeId) {

		return this.actionEndpoint.GetPublicationModel<any[]>(aircraftTypeId);

	}

	getLocations() {

		return this.actionEndpoint.getLocations<any[]>();

	}





	GetPublicationAircraftManufacturer() {

		return this.actionEndpoint.GetPublicationAircraftManufacturer<any[]>();

	}





	GetPublicationType() {

		return this.actionEndpoint.GetPublicationType<IPublicationType[]>();

	}





	GetMaterialUOM() {

		return this.actionEndpoint.GetMaterialUOM<IMaterialUOM[]>();

	}





	GetMaterialMandatory() {

		return this.actionEndpoint.GetMaterialMandatory<IMaterialMandatory[]>();

	}



	GetMaterialCondition() {

		return this.actionEndpoint.GetMaterialCondition<IMaterialCondition[]>();

	}

	GetExpertiseType() {

		return this.actionEndpoint.GetExpertiseType<any[]>();

	}

	getEquipmentAssetType() {

		return this.actionEndpoint.getEquipmentAssetType<IEquipmentAssetType[]>();

	}

	getChargesCurrency() {

		return this.actionEndpoint.getChargesCurrency<IChargesCurrency[]>();

	}

	getChargesType() {

		return this.actionEndpoint.getChargesType<any[]>();

	}



	getActionAttributes() {

		return this.actionEndpoint.getActionAttributes<ActionAttribute[]>();

	}

	getActions() {

		return this.actionEndpoint.getActions<any>();

	}

	addAction(action:IAction) {

		return this.actionEndpoint.addAction<IAction>(action);

	}

	updatePublication(publication: IPublication) {

		return this.actionEndpoint.updatePublication<IPublication>(publication);

	}







	updateMeasurement(measurement: any) {

		return this.actionEndpoint.updateMeasurement<any>(measurement);

	}

	updateMaterial(material: any) {

		return this.actionEndpoint.updateMaterial<any>(material);

	}

	updateExpertise(expertise: any) {

		return this.actionEndpoint.updateExpertise<any>(expertise);

	}

	updateExclusion(exclusion: any) {

		return this.actionEndpoint.updateExclusion<any>(exclusion);

	}





	updateEquipment(equipment: any) {

		return this.actionEndpoint.updateEquipment<any>(equipment);

	}

	updateDirection(direction: any) {

		return this.actionEndpoint.updateDirection<any>(direction);

	}

	updateCharges(charges: any) {

		return this.actionEndpoint.updateCharges<any>(charges);



	}

	addPublication(publication: IPublication) {

	return this.actionEndpoint.addPublication<IPublication>(publication);

	}

	addMeasurement(measurement: any) {

		return this.actionEndpoint.addMeasurement<any>(measurement);

	}

	addMaterial(material:any) {

		return this.actionEndpoint.addMaterial<any>(material);

	}



	addExpertise(expertise: any) {

		return this.actionEndpoint.addExpertise<any>(expertise);

	}

	addExclusion(exclusion: any) {

		return this.actionEndpoint.addExclusion<any>(exclusion);

	}

	addEquipment(equipment: any) {

		return this.actionEndpoint.addEquipment<any>(equipment);

	}

	addDirection(direction: any) {

		return this.actionEndpoint.addDirection<any>(direction);

	}



	addCharges(charges: any) {

		return this.actionEndpoint.addCharges<any>(charges);

	}



	getNewWorkFlow(workflowData:any) {

		return this.actionEndpoint.getNewWorkFlow<any>(workflowData);

	}

	getWorkFlow(workflowid:string) {

		//return this.actionEndpoint.getWorkFlow<IWorkFlow>(workflowid);

		return Observable.forkJoin(
			this.actionEndpoint.getWorkFlow<any>(workflowid));

	}
}