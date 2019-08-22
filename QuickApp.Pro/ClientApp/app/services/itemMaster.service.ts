﻿// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { ItemMasterEndpoint } from './itemMaster-endpoint.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
//import { ItemMaster } from '../models/itemMaster.model';
import { AuditHistory } from '../models/audithistory.model';

export type RolesChangedOperation = 'add' | 'delete' | 'modify';
export type RolesChangedEventArg = {
  roles: Role[] | string[];
  operation: RolesChangedOperation;
};

@Injectable()
export class ItemMasterService {
	enableExternal: boolean = false;
	listEquipmentCollection: any;
	itemmasterObj: any[];
    listNonStockCollection: any;
    listCollection: any;
    isEditMode: boolean=false;
    listNonstock: boolean;
    listEquipment: boolean;
    listStock: boolean=true;
    public static readonly roleAddedOperation: RolesChangedOperation = "add";
    public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
    public static readonly roleModifiedOperation: RolesChangedOperation = "modify";
	public indexObj = new Subject<any>();
	private _rolesChanged = new Subject<RolesChangedEventArg>();
	public currentUrl = this.router.url;
	public alertObj = new Subject<any>();
	public alertChangeObject$ = this.alertObj.asObservable();
	public bredcrumbObj = new Subject<any>();
	public bredcrumbObjChangeObject$ = this.bredcrumbObj.asObservable();
    public stockable = new Subject<any>();
    public stockableObjChangeObject$ = this.stockable.asObservable();
    isCapsEditMode: boolean;
    capabilityCollection: any;
    capsCollection: any;
   
   
    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private itemMasterEndpoint: ItemMasterEndpoint) { }

    getItemMasterById(id: number) {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getItemMasterById<any[]>(id));
    }

    getItemMasterByItemMasterId(id: number) {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getItemMasterById<any>(id));
    }

    getItemMasterList() {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getitemMasterEndpoint<any[]>());
    }

    getItemMasterCapsList() {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getitemMasterCapsDataEndpoint<any[]>());
    }

	getAircaftManafacturerList(itemid:any) {
		return Observable.forkJoin(
			this.itemMasterEndpoint.getAircraftManafacturerList<any[]>(itemid));
	}

	getAircaftList(itemid: any) {
		return Observable.forkJoin(
			this.itemMasterEndpoint.getAircraftList<any[]>(itemid));
	}
	getCpaesData(itemid: any) {
		return Observable.forkJoin(
			this.itemMasterEndpoint.getCpaesData<any[]>(itemid));
	}
    getItemStockList(value) {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getitemListEndpoint<any[]>(value));
	}
	getRolesData() {
		return Observable.forkJoin(
			this.itemMasterEndpoint.getRolesData<any[]>());
	}
	getRolesDataByUserId(event) {
		return Observable.forkJoin(
			this.itemMasterEndpoint.getRolesDatayRoleId<any[]>(event));
	}
    getItemstock() {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getStocklist<any[]>());
    }


    getItemNonstockList() {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getitemNonstockListEndpoint<any[]>());
    }

    updaateEquipmentDelete(action: any) {
        return this.itemMasterEndpoint.updateDeleteStatus(action);
    }

    getItemeStockList() {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getitemStockListEndpoint<any[]>());
    }

    getItemEquipmentList() {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getitemEquipmentListEndpoint<any[]>());
    }

    getManufacturerList() {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getManufacturerEndpoint<any[]>());
    }

    getPrtnumberslistList () {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getPartnumbersEndpoint<any>());
    }

    geteuipmentList() {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getEquipmentEndpoint<any[]>());
    }


    getAircraft() {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getAircraftmodels<any[]>());
    }

    getAircraftTypes(selectedvalues) {

        return Observable.forkJoin(
            this.itemMasterEndpoint.getAirccraftTypes<any>(selectedvalues));
    }

    getWarningdata() {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getwarningdataEndpoint<any[]>());
    } 

    getCountrydata() {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getCountrysTypes<any>());
    }
	newItemMaster(itemMaster: any) {
		return this.itemMasterEndpoint.getNewitemMasterEndpoint<any>(itemMaster);
	}
	saveManfacturerinforcapes(data) {
		return this.itemMasterEndpoint.saveItemmastercapesmaninfo<any>(data);
	}
	saveAircraftinfo(data) {
		return this.itemMasterEndpoint.saveAircraftinfo<any>(data);
	}

    savemanufacutrer(itemMaster: any) {
        return this.itemMasterEndpoint.getNewManufacturerEndpoint<any>(itemMaster);
    }

    saveequipment(itemMaster: any) {
        return this.itemMasterEndpoint.getNewEquipmentEndpoint<any>(itemMaster);
    }


    historyItemMaster(itemMasterId: number) {
        return Observable.forkJoin(this.itemMasterEndpoint.getHistoryitemMasterEndpoint<AuditHistory[]>(itemMasterId));
    }

    getItemMaster(itemMasterId?: number) {
        return this.itemMasterEndpoint.getEdititemMasterEndpoint<any>(itemMasterId);
    }

    updateItemMaster(itemMaster: any) {
        return this.itemMasterEndpoint.getUpdateitemMasterEndpoint<any>(itemMaster,itemMaster);
    }

    updateNonStockItemMaster(itemMaster: any) {
        return this.itemMasterEndpoint.getUpdateitemMasterNonstockEndpoint<any>(itemMaster, itemMaster);
    }


    updateEquipment(itemMaster: any) {
        return this.itemMasterEndpoint.getUpdateitemMasterEquipmentEndpoint<any>(itemMaster, itemMaster);
    }

    deleteItemMaster(itemMasterId: number) {

        return this.itemMasterEndpoint.getDeleteitemMasterEndpoint(itemMasterId);

    }
    newWarning(itemMaster: any) {
        return this.itemMasterEndpoint.getNewwarningEndpoint<any>(itemMaster);
    }

	getDescriptionbypart(partNumber) {
		return Observable.forkJoin(
			this.itemMasterEndpoint.getDescriptionbypart<any[]>(partNumber));
	}
	
	updateActionforActiveforstock(itemmaster: any) {
		return this.itemMasterEndpoint.getUpdatestockEndpointforActive(itemmaster);
	}

	getintegrationtypes(itemMasterId: any) {
		return this.itemMasterEndpoint.getIntegrationEndpoint<any[]>(itemMasterId);
	}
	Addmultiintegrations(action: any) {
		return this.itemMasterEndpoint.getMultiIntegrations<any>(action);
	}

	//for Storing Air craft Type,Data
	AddItemMasteraircrafttype(action: any) {
		return this.itemMasterEndpoint.getItemMasteraircrafttypeEndpoint<any>(action);
	}
	Addmultileaves(action: any) {
		return this.itemMasterEndpoint.getMultileaves<any>(action);
    }

    getCapabilityData(itemMasterId?: number) {
        return this.itemMasterEndpoint.getCapabilityDataEndpoint<any>(itemMasterId);
    }

    getAudit(itemMasterId: number) {
        return this.itemMasterEndpoint.getAudit<any[]>(itemMasterId);
    }

    getAllNonStockitems() {
        return Observable.forkJoin(
            this.itemMasterEndpoint.getitemclassificationnonStockEndpoint<any[]>());
    }

    newNonstockClass(action: any) {
        return this.itemMasterEndpoint.getNewitemclassificationEndpoint<any>(action);
    }
    

    updateNonstockClass(action: any) {
        return this.itemMasterEndpoint.getUpdateActionEndpoint(action, action.itemNonClassificationId);
    }
     // get all aircraft models
    getAllAirCraftModels(){
        return this.itemMasterEndpoint.getAllAircraftList();
    }
    newPNIMMapping(action: any) {
        return this.itemMasterEndpoint.getPNIMMappingEndpoint<any>(action);
    }
    newItemMasterAircarftClass(action: any) {
        return this.itemMasterEndpoint.getNewitemAircraftEndpoint<any>(action);
    }
    newItemMasterATAClass(action: any) {
        return this.itemMasterEndpoint.getNewitemATAEndpoint<any>(action);
    }
    newItemMasterPurcSaleClass(action: any) {
        return this.itemMasterEndpoint.getNewitemPurcSaleEndpoint<any>(action);
    }
    getMappedAirCraftDetails(ItemmasterId: number) {
        return this.itemMasterEndpoint.getAircraftMappingEndpoint<any>(ItemmasterId);
    }
    getMappedATADetails(ItemmasterId: number) {
        return this.itemMasterEndpoint.getATAMappingEndpoint<any>(ItemmasterId);
    } 
    newItemMasterExportInfoClass(action: any) {
        return this.itemMasterEndpoint.getNewitemPurcSaleEndpoint<any>(action);
    }
   
    updateItemMasterAircraft(ItemMasterAircraftMappingId: number) {
        return this.itemMasterEndpoint.updateItemMasterAircraftEndpoint<any>(ItemMasterAircraftMappingId);
    }
    updateItemMasterATA(ItemMasterATAMappingId: number) {
        return this.itemMasterEndpoint.updateItemMasterATAEndpoint<any>(ItemMasterATAMappingId);
    }
    updateItemMasterPurchaseSale(ItemMasterPurchaseSaleId: number) {
        return this.itemMasterEndpoint.updateItemMasterPurchaseSaleEndpoint<any>(ItemMasterPurchaseSaleId);
    }
    postATAMapping(action: any) {
        return this.itemMasterEndpoint.saveATAMapping<any>(action);
    }
    getItemAirMappedByMultiTypeIdModelIDDashID(ItemmasterId: number, AircraftTypeID: string, AircraftModelID: string, DashNumberId: string) {
        return this.itemMasterEndpoint.getAirMappedByMultiTypeIDModelIDDashID<any>(ItemmasterId, AircraftTypeID, AircraftModelID, DashNumberId);
    }
    getItemATAMappedByMultiTypeIdModelIDDashID(ItemmasterId: number, ATAID: string, ATASubID: string) {
        return this.itemMasterEndpoint.getATAMappedByMultiATAIDATASUBID<any>(ItemmasterId, ATAID, ATASubID);
    }
    deleteItemMasterATA(ItemMasterATAMappingId: number) {
        return this.itemMasterEndpoint.deleteitemMasterMappedATAEndpoint<any>(ItemMasterATAMappingId);
    }
    deleteItemMasterAir(ItemMasterAirMappingId: number) {
        return this.itemMasterEndpoint.deleteitemMasterMappedAirEndpoint<any>(ItemMasterAirMappingId);
    }
    deleteItemMasterPurcSale(ItemMasterPurcSaleId: number) {
        return this.itemMasterEndpoint.deleteitemMasterMappedPurcSaleEndpoint<any>(ItemMasterPurcSaleId);
    }
    searchgetAirMappedByMultiTypeIDModelIDDashID(ItemmasterId: number) {
        return this.itemMasterEndpoint.searchGetAirMappedByMultiTypeIDModelIDDashID<any>(ItemmasterId);
    }
    searchgetATAMappedByMultiTypeIDModelIDDashID(ItemmasterId: number) {
        return this.itemMasterEndpoint.searchgetATAMappedByMultiATAIDATASUBID<any>(ItemmasterId);
    }
    
}
