import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Role } from '../../models/role.model';
import { AuthService } from '../auth.service';
import { AssetEndpoint } from './Asset-endpoint.service';


export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };


@Injectable()
export class AssetService {
    currentAssetId: number;
    generalcustomer: boolean = false;
    contacts: boolean = false;
    financial: boolean = false;
    billing: boolean = false;
    shipping: boolean = false;
    sales: boolean = false;
    warnings: boolean = false;
    readonly = true;
    read = true;
    enableExternal: boolean = false;
    customerobject: any[];
    financeCollection: any;
    CapeslistCollection: any;
    paymentCollection: any;
    salesCollection: any;
    shippingCollection: any;
    isEditMode: boolean = false;
    listCollection: any;
    generalCollection: any;
    auditServiceCollection: any = {};
    ShowPtab: boolean = true;
    contactCollection: any;
    customergeneralcollection: any;
    public static readonly roleAddedOperation: RolesChangedOperation = "add";
    public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
    public static readonly roleModifiedOperation: RolesChangedOperation = "modify";
    
    //for steps start
    public alertObj = new Subject<any>();
    public alertChangeObject$ = this.alertObj.asObservable();
    public indexObj = new Subject<any>();
    public indexObjChangeObject$ = this.indexObj.asObservable();
      //for steps End

    public currentUrl = this.router.url;
    public navigationObj = new Subject<any>();
    navigationObjChangeObject$ = this.navigationObj.asObservable();
    public bredcrumbObj = new Subject<any>();
    public bredcrumbObjChangeObject$ = this.bredcrumbObj.asObservable();
    isCapsEditMode: boolean;
    capabilityCollection: any;
         

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private assetEndpoint: AssetEndpoint) { }


    addAsset(asset: any) {
        return this.assetEndpoint.getNewAsset<any>(asset);
    }
    //To get List from Database//
    getAssetList() {
        return Observable.forkJoin(this.assetEndpoint.getAssetList<any[]>());
    }

    getAssetCapesAudit(assetcapesId: number) {
        return this.assetEndpoint.getAssetCapesAuditById<any[]>(assetcapesId);
    }

    getAllAssetList() {
        return Observable.forkJoin(this.assetEndpoint.getAllAssetList<any[]>());
    }

    getByAssetId(assetId?: string) {
        return this.assetEndpoint.getByAssetIdDataEndpoint<any>(assetId);
    }

    updateAsset(asset: any) {
        return this.assetEndpoint.updateAsset(asset, asset.assetRecordId);
    }

    remove(assetRecordId: number) {
        return this.assetEndpoint.removeAssetById(assetRecordId);
    }
    removeCapesById(AssetCapesId: number) {
        return this.assetEndpoint.removeAssetCapesById(AssetCapesId);
    }
    //For Saving of Capes//
    saveManfacturerinforcapes(data) {
        return this.assetEndpoint.saveAssetCapesInfo<any>(data);
    }

    addNewAssetInfocapes(data) {
        return this.assetEndpoint.addNewAssetCapesInfo<any>(data);
    }
    

    getcapabilityListData(assetRecordId) {
        return Observable.forkJoin(
            this.assetEndpoint.getCapabilityTypeListEndpoint<any[]>(assetRecordId));
    }

    getCapabilityData(assetRecordId?: number) {
        return this.assetEndpoint.getCapabilityDataEndpoint<any>(assetRecordId);
    }

    getAssetCapabilityData(assetCapesId?: number) {
        return this.assetEndpoint.getAssetCapabilityDataEndpoint<any>(assetCapesId);
    }

    getAssetsById(assetsRecordsId){
        return this.assetEndpoint.getAssetsById(assetsRecordsId);
    }
    //Audit method in services
    //getAudit(assetRecordId: number) {
    //    return this.assetEndpoint.getAudit<any[]>(assetRecordId);
    //}

    updateCapes(assetcapes: any) {
        return this.assetEndpoint.updateCapes(assetcapes, assetcapes.AssetCapesId);
    }

    getAssetWarrantyStatus() {
        return Observable.forkJoin(this.assetEndpoint.getAssetWarrantyStatus<any[]>());
    }

}