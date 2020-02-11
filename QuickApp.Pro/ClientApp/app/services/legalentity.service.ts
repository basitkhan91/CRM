// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


import { AuthService } from './auth.service';
import { User } from '../models/user.model';

import { Condition } from '../models/condition.model';
import { AuditHistory } from '../models/audithistory.model';
import { Role } from '../models/role.model';
import { LegalEntityEndpontService } from './legalentity-endpoint.service';
import { TreeNode } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = { roles: Role[] | string[], operation: RolesChangedOperation };

@Injectable()
export class LegalEntityService {

	public static readonly roleAddedOperation: RolesChangedOperation = "add";
	public static readonly roleDeletedOperation: RolesChangedOperation = "delete";
	public static readonly roleModifiedOperation: RolesChangedOperation = "modify";

	private _rolesChanged = new Subject<RolesChangedEventArg>();
	isEditMode: boolean;
	ShowPtab: boolean = true;
	public currentUrl = this.router.url;
	public bredcrumbObj = new Subject<any>();
	public alertObj = new Subject<any>();
	public indexObj = new Subject<any>();
	enableExternal: boolean = false;
	listCollection: any;
	private isEntityEditMode = new BehaviorSubject(false);
	currentEditModeStatus = this.isEntityEditMode.asObservable();
	isReset: boolean = false;
	activeStep = new Subject();

	constructor(
		private router: Router,
		private http: HttpClient,
		private authService: AuthService,
		private legalEntityEndpont: LegalEntityEndpontService) { }

	changeofTab(activeIndex) {
		this.activeStep.next(activeIndex);
	}

	newBillingAdd(action: any) {
		return this.legalEntityEndpont.getNewBillinginfo<any>(action);
	}

	updateBillinginfo(legalEntityBilling: any) {
		return this.legalEntityEndpont.updateBillingViainfo(legalEntityBilling, legalEntityBilling.legalEntityBillingAddressId);
	}

	getlegalEntityBillingHistory(entityId, legalEntityBillingAddressId) {
		return this.legalEntityEndpont.getlegalEntityBillingHistory(entityId, legalEntityBillingAddressId)
	}
	legalEntitysBillingUpdateforActive(id, status, updatedBy) {
		return this.legalEntityEndpont.LegalEntityBillingUpdateforActive(id, status, updatedBy)
	}
	updateDeleteBillinginfo(entityBilling: any) {
		return this.legalEntityEndpont.deleteBillingAddress(entityBilling, entityBilling.legalEntityBillingAddressId);
	}
	BillingFileUpload(file, legalEntityId) {
		return this.legalEntityEndpont.LegalEntityBillingFileUpload(file, legalEntityId);
	}

	getGeneralObj() {
		return Observable.forkJoin(
			this.legalEntityEndpont.getGeneralrobj<any>());
	}

	getEntityList() {
		return Observable.forkJoin(
			this.legalEntityEndpont.getLegalEntityEndpontService<any[]>());
	}
	getEntityDataById(entityId) {
		return this.legalEntityEndpont.getEntityDataById(entityId);
	}

	updateEntityDetails(action: any) {
		return this.legalEntityEndpont.updateEntityListDetails<any>(action);
	}

	getCountrylist() {
		return Observable.forkJoin(
			this.legalEntityEndpont.getcountryListEndpoint<any[]>());
	}

	getManagemententity() {
		return Observable.forkJoin(
			this.legalEntityEndpont.getManagemtentEntityData<any[]>());
    }

    getManagemtentLengalEntityData() {
        return Observable.forkJoin(
            this.legalEntityEndpont.getManagemtentLengalEntityData<any[]>());
	}
	loadParentEntities() {
		return Observable.forkJoin(
			this.legalEntityEndpont.loadParentEntities<any[]>());
	}
	getLedgerNamesData() {
		return Observable.forkJoin(
			this.legalEntityEndpont.getLedgerNamesData<any[]>());
	}
	getEntityforEdit() {
		return Observable.forkJoin(
			this.legalEntityEndpont.getEntityforEdit<any[]>());
	}
	newAddEntity(action: any) {
		return this.legalEntityEndpont.getNewLegalEntityEndpontService<any>(action);
	}
	getmanagementPost(action: any) {
		return this.legalEntityEndpont.getmanagementPost<any>(action);
	}

	checkEntityEditmode(val) {
		this.isEntityEditMode.next(val);
	}

	updateEntity(action: any) {
		return this.legalEntityEndpont.getUpdateLegalEntityEndpontService(action, action.legalEntityId);
	}
	updateEntitydelete(action: any) {
		return this.legalEntityEndpont.getDeleteActionEndpoint1(action);
	}
	updateManagementEntity(action: any) {
		return this.legalEntityEndpont.updateManagement(action);
	}
	delete(action: any) {
		return this.legalEntityEndpont.getDeleteActionEndpoint(action);
	}
	deleteEntity(actionId: number) {
		return this.legalEntityEndpont.getDeleteLegalEntityEndpontService(actionId);
    }
    getContacts() {
        return Observable.forkJoin(
            this.legalEntityEndpont.getContcatDetails<any>());
    }
    getEntityBillViaDetails(rowData) {
        return Observable.forkJoin(
            this.legalEntityEndpont.getEntityBillViaDetails(rowData));
    }
	getFileSystem() {
		//debugger;
		let obj: any = {
			"data":
				[
					{
						"data": {
							"name": "Documents",
							"size": "75kb",
							"type": "Folder"
						},
						"children": [
							{
								"data": {
									"name": "Work",
									"size": "55kb",
									"type": "Folder"
								},
								"children": [
									{
										"data": {
											"name": "Expenses.doc",
											"size": "30kb",
											"type": "Document"
										}
									},
									{
										"data": {
											"name": "Resume.doc",
											"size": "25kb",
											"type": "Resume"
										}
									}
								]
							},
							{
								"data": {
									"name": "Home",
									"size": "20kb",
									"type": "Folder"
								},
								"children": [
									{
										"data": {
											"name": "Invoices",
											"size": "20kb",
											"type": "Text"
										}
									}
								]
							}
						]
					},
					{
						"data": {
							"name": "Pictures",
							"size": "150kb",
							"type": "Folder"
						},
						"children": [
							{
								"data": {
									"name": "barcelona.jpg",
									"size": "90kb",
									"type": "Picture"
								}
							},
							{
								"data": {
									"name": "primeui.png",
									"size": "30kb",
									"type": "Picture"
								}
							},
							{
								"data": {
									"name": "optimus.jpg",
									"size": "30kb",
									"type": "Picture"
								}
							}
						]
					}
				]
		}
		return obj.data;
	}

	historyEntity(actionId: number) {
		return Observable.forkJoin(this.legalEntityEndpont.getHistoryLegalEntityEndpontService<AuditHistory[]>(actionId));
    }

    getEntityAccounts(entityId: number) {
        return Observable.forkJoin(this.legalEntityEndpont.getAccountsInfoById<any>(entityId));
    }


    updateLegalEntityForActive(action: any) {
        return this.legalEntityEndpont.getUpdateLegalEntityActive(action, action.legalEntityId);
	}
	
	getLegalEntityAddressById(entityId: number) {
        return Observable.forkJoin(this.legalEntityEndpont.getLegalEntityAddressById<any>(entityId));
    }

}