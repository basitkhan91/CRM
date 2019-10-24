﻿import { Component, OnInit, ViewChild } from '@angular/core';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { CreditTermsService } from '../../../../services/Credit Terms.service';
import { VendorService } from '../../../../services/vendor.service';
import { PriorityService } from '../../../../services/priority.service';
import { ConditionService } from '../../../../services/condition.service';
import { UnitOfMeasureService } from '../../../../services/unitofmeasure.service';
import { CurrencyService } from '../../../../services/currency.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { MasterCompany } from '../../../../models/mastercompany.model';
import { Router, ActivatedRoute } from '@angular/router'
import { ModalService } from '../../../../services/Index';
import { empty } from 'rxjs/observable/empty';
import { EmployeeService } from '../../../../services/employee.service';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { CustomerService } from '../../../../services/customer.service';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { TreeNode, MessageService } from 'primeng/api';
import { SiteService } from '../../../../services/site.service';
import { WarehouseService } from '../../../../services/warehouse.service';
import { Site } from '../../../../models/site.model';
import { CreatePOPartsList, PartDetails } from '../../../../models/create-po-partslist.model';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { GlAccountService } from '../../../../services/glAccount/glAccount.service';
import { GlAccount } from '../../../../models/GlAccount.model';
import { getValueFromObjectByKey, getObjectByValue, getValueFromArrayOfObjectById, getObjectById, editValueAssignByCondition } from '../../../../generic/autocomplete';
import { AuthService } from '../../../../services/auth.service';
import { CommonService } from '../../../../services/common.service';
import { CustomerShippingModel } from '../../../../models/customer-shipping.model';
import { CompanyService } from '../../../../services/company.service';
import { CustomerInternationalShipVia } from '../../../../models/customer-internationalshipping.model';
import { getModuleNameById } from '../../../../generic/enums';
import { PurchaseOrderService } from '../../../../services/purchase-order.service';
import { AddressNew } from '../../../../models/address-new-model';

@Component({
	selector: 'app-purchase-setup',
	templateUrl: './purchase-setup.component.html',
	styleUrls: ['./purchase-setup.component.scss']
})
/** purchase-setup component*/
export class PurchaseSetupComponent {
	public sourceSite: any = {};
	firstNamesbillTo1: any;
	firstNamesShipTo1: any[];
	vendorContactsForshipTo: any[] = [];
	vendorContactsForBillTO: any[] = [];
	firstNamesShipTo: any[] = [];
	firstNamesbillTo: any[] = [];
	billToContactData: any[] = [];
	firstNames: any[];
	shipToContactData: any = [];
	testData: any[] = [];
	editChildList: any[] = [];
	vendorSelectedforSplit: any[];
	spiltshipmentData: any[][];
	vendorSelectedForBillTo: any;
	shipToCusData: any[] = [];
	vendorSelected: any[] = [];
	billToCusData: any;
	array: any[];
	returnPartsListArray: any = [];
	allCustomers: any[];
	customerNames: any[];
	allSelectedParts: any[] = [];
	childDataList: any[] = [];
	savedPurchasedPart: any;
	savedInfo: any;
	allCurrencyData: any[] = [];
	allUomdata: any[] = [];
	allconditioninfo: any[] = [];
	itemTypeId: number;
	partWithId: any;
	allPartDetails: any[] = [];
	billToAddress: any = {};
	shipToAddress: any = {};
	issuedToAddress: any;
	allActions: any[] = [];
	selectedActionName: any;
	addressData: any[] = [];
	//partListData: CreatePOPartsList[] = [];
	partListData: any[] = [];
	modal: NgbModalRef;
	selectedValue: any;
	allPriorityInfo: any[];
	selectedValue1: any = {};
	selectedValue2: any = {};
	sourcePoApproval: any = {};
	sourcePoApprovalObj: any = {};
	partList: any = {};
	sourceissued: any = {};
	localCollection: any;
	maincompanylist: any[] = [];
	mainPartcompanylist: any[] = [];
	bulist: any[] = [];
	partBulist: any[] = [];
	partDepartmentList: any[] = [];
	partDivisionlist: any[] = [];
	VendorNamecoll: any[] = [];
	partId: any;
	vendorNames: any[];
	allPriorityDetails: any[];
	vendorContactsHeader: any[];
	vendorPhoneNum: any[];
	bulistovh: any[] = [];
	departmentList: any[] = [];
	departmentListovh: any[] = [];
	//customerNamecoll: any[] = [];
	divisionlist: any[] = [];
	divisionlistovh: any[] = [];
	ifSplitShip: boolean = false;
	allManagemtninfo: any[] = [];
	allManagementSiteData: any[] = [];
	allcreditTermInfo: any[] = [];
	disableSaveVenName: boolean;
	disableSave: boolean;
	partCollection: any[];
	disableSaveVenderName: boolean;
	vendorId: any;
	dataSource: any;
	mainArray: any[] = [];
	loadingIndicator: boolean;
	VendorCodesColl: any[] = [];
	selectedVendorCode: any;
	vendorCodes: any[];
	allgeneralInfo: any[];
	isDeleteMode: boolean;
	isEditMode: boolean;
	sourceAction: any;
	isSaving: boolean;
	allComapnies: MasterCompany[];
	showCustomerAddress1: boolean;
	showCustomerCity: boolean;
	showCustomerState: boolean;
	showCustomerPostal: boolean;
	showCustomerCountry: boolean;
	//userName: any;
	local: any;
	updatedCollection: {};
	allEmployeeinfo: any[] = [];
	display: boolean;
	modelValue: boolean;
	activeIndex: number;
	addressobject: any;
	selectedColumns: any[];
	firstCollection: any[];
	itemclaColl: any[];
	cols: any[];
	allPartnumbersInfo: any[];
	showInput: boolean = false;
	partNumbers: any;
	tempMemo: any;
	memoData: any;
	pocollection: any;
	gridData: TreeNode[];
	copyOfAllManagemtninfo: any[] = [];
	cols1: any[];
	companyId: any;
	showManagement: boolean;
	address1: any;
	city: any;
	stateOrProvince: any;
	postalCode: any;
	country: any;
	allAddress: any;
	siteInfo: any;
	data1: any[] = [];
	localManagementSiteCollection: any;
	allSites: Site[] = [];
	actionamecolle: any[] = [];
	selectedSite: any;
	disableSaveManufacturer: boolean;
	sourceSplitShipment: any = {};
	name: any;
	orderQuantity: any;
	//createPOPartsList: any[];
	checkAllPartsList: boolean;
	multiplePNDetails: boolean;
	shipUserTypeCustomer: boolean = false;
	shipUserTypeVendor: boolean = false;
	shipUserTypeCompany: boolean = false;
	billUserTypeCustomer: boolean = false;
	billUserTypeVendor: boolean = false;
	billUserTypeCompany: boolean = false;
	addressMemoLabel: string;
	enableSiteName: boolean;
	addressHeader: string;
	vendorCapesCols: any[];
	vendorCapesInfo: any[] = [];
	tempVendorId: number;
	vName: any;
	needByTempDate: Date = new Date();
	//creditTermsList: any[];
	conditionList: any[];
	functionalCurrList: any[];
	functionalTransList: any[];
	@ViewChild('createPOForm') createPOForm: NgForm;
	purchaseOrderId: any;
	purchaseOrderPartRecordId: any;
	glAccountTemp: any;
	//addAllMultiPNRows: boolean = false;
	addAllMultiPN: boolean = false;
	allGlInfo: GlAccount[];
	selectedMasterCompany: any;
	childObject: any = {};
	parentObject: any = {};
	childObjectArray: any[] = [];
	parentObjectArray: any[] = [];
	tempParentData: any;
	requisitionerList: any[];
	approverList: any[];
	approversList: any[];
	newPNList: any = [];
	newPartsList: CreatePOPartsList;
	splitVendorNames: any[];
	parentManagementInfo: any[] = [];
	childManagementInfo: any[] = [];
	vendorContactList: any[];
	addressSiteNameHeader: string;
	addressSiteName: any = {};
	splitUserTypeAddress: any = {};
	// shipToShipViaDetails: any = {};
	tempMultiplePNArray: any[];
	partNumberNames: any[];
	tempPartListData: any[];
	tempMultiplePN = {};
	parentQty: any;
	newData: any = [];
	childOrderQtyArray: any = [];
	childOrderQtyTotal: any;
	arraySearch: any = [];
	responseData: any;
	approversData: any = {};
	approver1: any = {};
	approver2: any = {};
	approver3: any = {};
	approver4: any = {};
	approver5: any = {};
	allEmployeeList: any = [];
	poApproverData: any = {};
	poApproverList: any = [];
	approverIds: any = [];
	multiplePNIdArray: any = [];
	tempNewPNArray: any = [];
	newObjectForParent = new CreatePOPartsList();
	addressFormForShipping = new CustomerShippingModel()
	addressFormForBilling = new CustomerShippingModel()
	legalEntity: any;
	legalEntityList_ForShipping: Object;
	legalEntityList_ForBilling: Object;
	addShipViaFormForShipping = new CustomerInternationalShipVia()
	shipViaList: Object;
	companySiteList_Shipping: any;
	contactListForShippingCompany: any;
	contactListForCompanyShipping: any;
	companySiteList_Billing: any;
	contactListForCompanyBilling: any;
	contactListForBillingCompany: any;
	poId: any;
	tempPOHeaderAddress: any = {};
	vendorList: any = [];
	tempShipTOAddressId: any;
	shipToSelectedvalue: any;
	billToSelectedvalue: any;
	addNewAddress = new AddressNew();
	gridSelectedVendorId: any;
	gridSelectedCustomerId: any;
	legalEntityList_Forgrid: any;


	// this.siteName ="";
	// this.address1 ="";
	// this.address3 ="";
	// this.address2 ="";
	// this.city ="";
	// this.stateOrProvince = "";
	// this.postalCode ="";
	// this.country ="" ;

	/** po-approval ctor */
	constructor(public siteService: SiteService,
		public warehouseService: WarehouseService,
		private masterComapnyService: MasterComapnyService,
		// public customerService: CustomerService, 
		private itemser: ItemMasterService,
		private modalService: NgbModal,
		private route: Router,
		public legalEntityService: LegalEntityService,
		public currencyService: CurrencyService,
		public unitofmeasureService: UnitOfMeasureService,
		public conditionService: ConditionService,
		public CreditTermsService: CreditTermsService,
		public employeeService: EmployeeService,
		public vendorService: VendorService,
		public priority: PriorityService,
		private alertService: AlertService,
		public glAccountService: GlAccountService,
		private authService: AuthService,
		private customerService: CustomerService,
		private companyService: CompanyService,
		private commonService: CommonService,
		private _actRoute: ActivatedRoute,
		private purchaseOrderService: PurchaseOrderService) {

		//this.loadcustomerData();
		//this.loadData();
		//this.createPOPartsList = [new CreatePOPartsList()];
		this.partListData = [this.newObjectForParent]; //CreatePOPartsListParent

		/*if (this.sourcePoApproval.purchaseOrderNumber == "" || this.sourcePoApproval.purchaseOrderNumber == undefined) {
			this.sourcePoApproval.purchaseOrderNumber = 'Creating';
		}
		if (this.vendorService.purchasepartcollection) {
			this.pocollection = vendorService.purchasepartcollection;
			if (this.pocollection.length > 0) {
				this.sourcePoApproval = this.pocollection[0];
				console.log(this.sourcePoApproval);

				this.sourcePoApproval.dateRequested = new Date(this.sourcePoApproval.dateRequested);
				this.sourcePoApproval.dateApprovied = new Date(this.sourcePoApproval.dateApprovied);
				this.sourcePoApproval.needByDate = new Date(this.sourcePoApproval.needByDate);
				//this.allManagemtninfo = this.vendorService.purchasepartcollection;
				for (let i = 0; i < this.vendorService.purchasepartcollection.length; i++) {




					if (this.vendorService.purchasepartcollection[i].pop.isParent == true) {


						if (this.vendorService.purchasepartcollection[i].pop.needByDate) {
							this.vendorService.purchasepartcollection[i].pop.needByDate = new Date(this.vendorService.purchasepartcollection[i].pop.needByDate);
						}
						else {
							this.vendorService.purchasepartcollection[i].pop.needByDate = new Date();
						}
						this.vendorService.purchasepartcollection[i].pop.partId = vendorService.purchasepartcollection[i].partId;
						this.vendorService.purchasepartcollection[i].pop.partdescription = vendorService.purchasepartcollection[i].partDescription;
						this.vendorService.purchasepartcollection[i].pop.itemTypeId = vendorService.purchasepartcollection[i].itemTypeId;
						this.vendorService.purchasepartcollection[i].pop.name = vendorService.purchasepartcollection[i].name;
						this.vendorService.purchasepartcollection[i].pop.glAccountId = vendorService.purchasepartcollection[i].glAccountId;
						this.vendorService.purchasepartcollection[i].pop.serialNumber = vendorService.purchasepartcollection[i].serialNumber;
						this.vendorService.purchasepartcollection[i].pop.partNumber = vendorService.purchasepartcollection[i].partNumber;
						this.vendorService.purchasepartcollection[i].pop.shortName = vendorService.purchasepartcollection[i].shortName;

						this.vendorService.purchasepartcollection[i].pop["childList"] = [];
						this.partListData.push(this.vendorService.purchasepartcollection[i].pop)

					}
					else {
						if (this.vendorService.purchasepartcollection[i].pop.needByDate) {
							this.vendorService.purchasepartcollection[i].pop.needByDate = new Date(this.vendorService.purchasepartcollection[i].pop.needByDate);
						}
						else {
							this.vendorService.purchasepartcollection[i].pop.needByDate = new Date();
						}
						this.vendorService.purchasepartcollection[i].pop.shortName = vendorService.purchasepartcollection[i].shortName;
						this.vendorService.purchasepartcollection[i].pop.partId = vendorService.purchasepartcollection[i].partId;
						this.vendorService.purchasepartcollection[i].pop.partdescription = vendorService.purchasepartcollection[i].partDescription;
						this.vendorService.purchasepartcollection[i].pop.itemTypeId = vendorService.purchasepartcollection[i].itemTypeId;
						this.vendorService.purchasepartcollection[i].pop.name = vendorService.purchasepartcollection[i].name;
						this.vendorService.purchasepartcollection[i].pop.glAccountId = vendorService.purchasepartcollection[i].glAccountId;
						this.vendorService.purchasepartcollection[i].pop.serialNumber = vendorService.purchasepartcollection[i].serialNumber;
						this.vendorService.purchasepartcollection[i].pop.partNumber = vendorService.purchasepartcollection[i].partNumber;
						this.editChildList.push(this.vendorService.purchasepartcollection[i].pop)

					}
				}
				if (this.editChildList.length > 0) {

					for (let k = 0; k < this.partListData.length; k++) {

						for (let m = 0; m < this.editChildList.length; m++) {

							if (this.partListData[k].itemMasterId == this.editChildList[m].itemMasterId) {
								this.partListData[k].ifSplitShip = true;
								this.partListData[k]["childList"].push(this.editChildList[m]);

							}

						}
					}
				}


			}
			//console.log(this.partListData);
			//console.log(this.editChildList);


		}*/

		// if (vendorService.isEditMode == true) {
		// 	this.localCollection = vendorService.vendorForPoCollection;
		// 	this.sourcePoApproval = this.localCollection;
		// 	console.log(this.localCollection);
		// 	this.itemTypeId = 0;
		// }
		this.vendorService.ShowPtab = false;
		//this.itemTypeId = 0;
		this.vendorService.alertObj.next(this.vendorService.ShowPtab);
		this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-purchase-setup';
		this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);
	}

	ngOnInit() {
		this.priorityData();
		this.loadCreditTermsData();
		this.loadManagementdata();
		//this.getAddresses();
		this.loadData();
		//this.loadPartData();
		this.loadCurrencyData();
		this.loadConditionData();
		this.loadUOMData();
		this.employeedata();
		this.ptnumberlistdata();
		this.loadcustomerData();
		this.loadvendorData();
		this.glAccountData();
		this.getLegalEntity();
		//this.getAllPartNumbers();
		this.sourcePoApproval.companyId = 0;
		this.sourcePoApproval.buId = 0;
		this.sourcePoApproval.divisionId = 0;
		this.sourcePoApproval.departmentId = 0;
		if (this.sourcePoApproval.purchaseOrderNumber == "" || this.sourcePoApproval.purchaseOrderNumber == undefined) {
			this.sourcePoApproval.purchaseOrderNumber = 'Creating';
		}

		this.vendorCapesCols = [
			{ field: 'vcid', header: 'VCID' },
			{ field: 'ranking', header: 'Ranking' },
			{ field: 'pn', header: 'PN' },
			{ field: 'pnDescription', header: 'PN Description' },
			{ field: 'capabilityType', header: 'Capability Type' },
			{ field: 'cost', header: 'Cost' },
			{ field: 'tat', header: 'TAT' },
			{ field: 'pnMfg', header: 'PN Mfg' },
			{ field: 'updatedDate', header: 'Updated Date' },
		];
		this.vendorCapesInfo = [
			{ 'vcid': 1, 'ranking': 11 },
			{ 'vcid': 2, 'ranking': 11 },
			{ 'vcid': 3, 'ranking': 11 },
		];

		console.log(this.sourcePoApproval);
		this.sourcePoApproval.statusId = 1;
		this.sourcePoApproval.openDate = new Date();
		this.sourcePoApproval.closedDate = new Date();
		this.sourcePoApproval.dateRequested = new Date();
		this.sourcePoApproval.shipToUserTypeId = 3;
		this.sourcePoApproval.billToUserTypeId = 3;
		//grid childlist disable on load
		if (!this.isEditMode) {
			for (let i = 0; i < this.partListData.length; i++) {
				if (!this.partListData[i].ifSplitShip) {
					this.partListData[i].childList = [];
				}
			}
		}

		this.poId = this._actRoute.snapshot.params['id'];
		if (this.poId) {
			this.isEditMode = true;
			this.getVendorPOById(this.poId);
		}

	}

	getManagementStructureDetails(id) {
		this.commonService.getManagementStructureDetails(id).subscribe(res => {
			console.log(res);
			if (res.Level1) {
				this.tempPOHeaderAddress.companyId = res.Level1;
				this.getBUList(res.Level1);
			} else 
				this.tempPOHeaderAddress.companyId = 0;

			if(res.Level2) {
				this.tempPOHeaderAddress.buId = res.Level2;
				this.getDivisionlist(res.Level2);
			} else
				this.tempPOHeaderAddress.buId = 0;

			if(res.Level3) {
				this.tempPOHeaderAddress.divisionId = res.Level3;
				this.getDepartmentlist(res.Level3);
			} else 
				this.tempPOHeaderAddress.divisionId = 0;

			if(res.Level4) {
				this.tempPOHeaderAddress.departmentId = res.Level4;
			} else
				this.tempPOHeaderAddress.departmentId = 0;

		})
	}

	getVendorPOById(poId) {
		this.vendorService.getWorkFlows().subscribe(
			response => {
				console.log(response);
				this.vendorList = response[0];

				this.purchaseOrderService.getVendorPOById(poId).subscribe(res => {
					console.log(res);
					this.tempPOHeaderAddress = {
						purchaseOrderNumber: res.purchaseOrderNumber,
						openDate: new Date(res.openDate),
						closedDate: new Date(res.closedDate),
						needByDate: new Date(res.needByDate),
						priorityId: getObjectById('priorityId', res.priorityId, this.allPriorityInfo),
						deferredReceiver: res.deferredReceiver,
						vendorId: getObjectById('vendorId', res.vendorId, this.vendorList),
						vendorCode: getObjectById('vendorId', res.vendorId, this.vendorList),
						vendorContactId: this.getVendorContactsListByID(res.vendorId),
						vendorContactPhone: this.getVendorContactsListByID(res.vendorId),
						creditLimit: res.creditLimit,
						creditTerms: res.creditTermsId ? getValueFromArrayOfObjectById('name', 'creditTermsId', res.creditTermsId, this.allcreditTermInfo) : null,
						requisitionerId: getObjectById('value', res.requestedBy, this.allEmployeeList),						
						approverId: getObjectById('value', res.approverId, this.allEmployeeList),
						approvedDate: new Date(res.dateApproved),
						statusId: res.statusId,
						resale: res.resale,
						companyId: this.getManagementStructureDetails(res.managementStructureId),
						// buId: 0,
						// divisionId: 0,
						// departmentId: 0,
						poMemo: res.notes,
						shipToUserTypeId: res.shipToUserType,
						//shipToUserId: res.shipToUserId,
						shipToUserId: this.getShipToUserIdEdit(res),
						shipToAddressId: this.tempShipTOAddressId ? this.tempShipTOAddressId : 0,
						shipToContactId: res.shipToContactId,
						shipToMemo: res.shipToMemo,
						shipViaId: res.shipViaAccountId,
						//shippingCost: res.shippingCost,
						//handlingCost: res.handlingCost,
						//shippingAcctNum: res.shippingAcctNum,
						//shippingId: res.shippingId,
						//shippingURL: res.shippingURL,
						billToUserTypeId: res.billToUserType,
						//billToUserId: res.billToUserId,
						billToUserId: this.getBillToUserIdEdit(res.billToUserType, res.billToUserId),
						billToAddressId: res.billToAddressId,
						billToContactId: res.billToContactId,
						billToMemo: res.billToMemo,

					};
					console.log(this.tempPOHeaderAddress);
					this.sourcePoApproval = this.tempPOHeaderAddress;
				})
			}
		);


	}

	getShipToUserIdEdit(data) {
		if (data.shipToUserType === 1) {
			this.tempShipTOAddressId = data.shipToAddressId;
			//this.onshipCustomerNameselected(data.shipToUserId);
			this.getValueforShipTo(data, data.shipToAddressId);
			return getObjectById('customerId', data.shipToUserId, this.allCustomers);


		}
		if (data.shipToUserType === 2) {
			return getObjectById('vendorId', data.shipToUserId, this.vendorList);
		}
		if (data.shipToUserType === 3) {
			return getObjectById('value', data.shipToUserId, this.legalEntity);
		}
	}

	getBillToUserIdEdit(billToUserTypeId, billToUserId) {
		if (billToUserTypeId === 1) {
			return getObjectById('customerId', billToUserId, this.allCustomers);
		}
		if (billToUserTypeId === 2) {
			return getObjectById('vendorId', billToUserId, this.vendorList);
		}
		if (billToUserTypeId === 3) {
			return getObjectById('value', billToUserId, this.legalEntity);
		}
	}

	getLegalEntity() {
		this.commonService.smartDropDownList('LegalEntity', 'LegalEntityId', 'Name').subscribe(res => {
			this.legalEntity = res;
		})
	}

	filterCompanyNameforgrid(event) {
		this.legalEntityList_Forgrid = this.legalEntity;


		const legalFilter = [...this.legalEntity.filter(x => {
			return x.label.toLowerCase().includes(event.query.toLowerCase())
		})]

		this.legalEntityList_Forgrid = legalFilter;
	}
	filterCompanyNameforShipping(event) {
		this.legalEntityList_ForShipping = this.legalEntity;


		const legalFilter = [...this.legalEntity.filter(x => {
			return x.label.toLowerCase().includes(event.query.toLowerCase())
		})]

		this.legalEntityList_ForShipping = legalFilter;
	}

	filterCompanyNameforBilling(event) {
		this.legalEntityList_ForBilling = this.legalEntity;
		const legalFilter = [...this.legalEntity.filter(x => {
			return x.label.toLowerCase().includes(event.query.toLowerCase())
		})]

		this.legalEntityList_ForBilling = legalFilter;

	}
	/*getAllPartNumbers() {
		this.commonService.smartDropDownList('ItemMaster', 'ItemMasterId', 'partnumber').subscribe(res => {
			console.log(res);			
		})
	}*/

	makeNestedObj(arr, parent) {
		var out = []
		/*for (var i in arr)*/for (let i = 0; i < arr.length; i++) {
			if (arr[i].isParent == parent) {
				//var children = this.makeNestedObj(arr, arr[i].isParent)
				arr[i] = { "data": arr[i] };
				//if (children.length) {
				//	arr[i].children = children
				//}
				out.push(arr[i])
			}
		}
		return out
	}

	makeNestedObj1(arr, parent) {
		var out = []
		for (var i in arr) {
			if (arr[i].parentId == parent) {
				var children = this.makeNestedObj1(arr, arr[i].managementStructureId)
				arr[i] = { "data": arr[i] };
				if (children.length) {
					arr[i].children = children
				}
				out.push(arr[i])
			}
		}
		return out
	}

	getBUList1(companyId) {

		this.sourcePoApproval.shipToUserType = 3; //making Address User Type as Company
		this.sourcePoApproval.billToUserType = 3;

		//Calling for Get ManagementSite Data Based on Company Structure Selection

		this.vendorService.getManagementSiteDataByCompanyId(companyId).subscribe(
			results => this.onManagemtntSitedataLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);

		this.companyId = companyId;
		// we are Hoding Compay Id if we select Same Management Stru Data again then we r loading after load Mana Str list
		//for Structure
		if (this.allManagemtninfo) {

			this.gridData = this.makeNestedObj1(this.allManagemtninfo, companyId);
		}

		if (this.gridData.length == 0) {
			this.legalEntityService.getManagemententity().subscribe(
				results => this.onManagemtntdataLoad(results[0]),
				error => this.onDataLoadFailed(error)
			);

		}

		this.showManagement = true;

		this.cols1 = [
			{ field: 'code', header: 'Code' },
			{ field: 'name', header: 'Name' },
			{ field: 'description', header: 'Description' },
			//{ field: 'legalEntityId', header: 'ID' },
		];

	}


	private priorityData() {

		this.priority.getPriorityList().subscribe(
			results => this.onprioritySuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private glAccountData() {
		this.glAccountService.getAll().subscribe(
			results => this.onGlAccountLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onGlAccountLoad(getGlList: GlAccount[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allGlInfo = getGlList;
		console.log(this.allGlInfo)
		//const abc = this.autoCompleteBindById('glAccountId', 7, this.allGlInfo);
		//console.log(abc);
	}


	// private getAddresses() {
	// 	this.vendorService.getSiteAddresses().subscribe(
	// 		data => {
	// 			console.log(data);
	// 			this.vendorSiteAddress = data[0];
	// 		});
	// }	

	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}

	savePurchaseOrder() {
		console.log(this.sourcePoApproval);

		this.sourcePoApprovalObj = {
			purchaseOrderNumber: this.sourcePoApproval.purchaseOrderNumber,
			openDate: new Date(this.sourcePoApproval.openDate),
			closedDate: new Date(this.sourcePoApproval.closedDate),
			needByDate: new Date(this.sourcePoApproval.needByDate),
			priorityId: this.sourcePoApproval.priorityId ? this.getPriorityId(this.sourcePoApproval.priorityId) : 0,
			deferredReceiver: this.sourcePoApproval.deferredReceiver ? this.sourcePoApproval.deferredReceiver : false,
			vendorId: this.sourcePoApproval.vendorId ? this.getVendorId(this.sourcePoApproval.vendorId) : 0,
			//vendorId: 671,
			vendorContactId: this.sourcePoApproval.vendorContactId ? this.getVendorContactId(this.sourcePoApproval.vendorContactId) : 0,
			//vendorContactId: 200,
			vendorContactPhone: this.sourcePoApproval.vendorContactPhone ? this.getVendorContactPhone(this.sourcePoApproval.vendorContactPhone) : '',
			creditLimit: this.sourcePoApproval.creditLimit ? this.sourcePoApproval.creditLimit : '',
			creditTermsId: this.sourcePoApproval.creditTermsId ? this.sourcePoApproval.creditTermsId : 0,
			requisitionerId: this.sourcePoApproval.requisitionerId ? this.getEmployeeId(this.sourcePoApproval.requisitionerId) : 0,
			approverId: this.sourcePoApproval.approverId ? this.getEmployeeId(this.sourcePoApproval.approverId) : 0,
			approvedDate: new Date(this.sourcePoApproval.approvedDate),
			statusId: this.sourcePoApproval.statusId ? this.sourcePoApproval.statusId : 0,
			resale: this.sourcePoApproval.resale ? this.sourcePoApproval.resale : false,
			managementStructureId: this.sourcePoApproval.managementStructureId ? this.sourcePoApproval.managementStructureId : 0,
			poMemo: this.sourcePoApproval.poMemo ? this.sourcePoApproval.poMemo : '',
			shipToUserTypeId: this.sourcePoApproval.shipToUserTypeId ? parseInt(this.sourcePoApproval.shipToUserTypeId) : 0,
			shipToUserId: this.sourcePoApproval.shipToUserId ? this.getShipToBillToUserId(this.sourcePoApproval.shipToUserId) : 0,
			shipToAddressId: this.sourcePoApproval.shipToAddressId ? this.sourcePoApproval.shipToAddressId : 0,
			//shipToContactId: this.sourcePoApproval.shipToContactId ? this.getShipBillContactId(this.sourcePoApproval.shipToContactId) : 0,
			shipToContactId: this.sourcePoApproval.shipToContactId ? editValueAssignByCondition('contactId', this.sourcePoApproval.shipToContactId) : 0,
			shipViaId: this.sourcePoApproval.shipViaId,
			shippingCost: this.sourcePoApproval.shippingCost,
			handlingCost: this.sourcePoApproval.handlingCost,
			shippingId: this.sourcePoApproval.shippingId,
			shippingURL: this.sourcePoApproval.shippingURL,
			shipToMemo: this.sourcePoApproval.shipToMemo ? this.sourcePoApproval.shipToMemo : '',
			billToUserTypeId: this.sourcePoApproval.billToUserTypeId ? parseInt(this.sourcePoApproval.billToUserTypeId) : 0,
			billToUserId: this.sourcePoApproval.billToUserId ? this.getShipToBillToUserId(this.sourcePoApproval.billToUserId) : 0,
			billToAddressId: this.sourcePoApproval.billToAddressId ? this.sourcePoApproval.billToAddressId : 0,
			//billToContactId: this.sourcePoApproval.billToContactId ? this.getShipBillContactId(this.sourcePoApproval.billToContactId) : 0,
			billToContactId: this.sourcePoApproval.billToContactId ? editValueAssignByCondition('contactId', this.sourcePoApproval.billToContactId) : 0,
			billToMemo: this.sourcePoApproval.billToMemo ? this.sourcePoApproval.billToMemo : '',
			shipToSiteName: this.postSiteNameForShipping(this.sourcePoApproval.shipToUserTypeId, this.sourcePoApproval.shipToAddressId),
			billToSiteName: this.postSiteNameForBilling(this.sourcePoApproval.billToUserTypeId, this.sourcePoApproval.billToAddressId),
			createdBy: this.userName,
			updatedBy: this.userName
		}
		console.log(this.sourcePoApprovalObj);
		console.log(this.sourcePoApproval.shipToUserId)

		if (this.createPOForm.invalid) { //invalid
			//  $('.createPO-form input.ng-invalid, .createPO-form select.ng-invalid, .createPO-form p-calendar.ng-invalid input').addClass('border-red-clr');
			//  $('.createPO-form input.ng-valid, .createPO-form select.ng-valid').removeClass('border-red-clr');
			alert('Please enter required fields!');
		}
		else {
			//this.userName = 'admin';
			// this.sourcePoApproval.vendorId = this.tempVendorId;
			//this.sourcePoApproval.createdBy = this.userName;
			//this.sourcePoApproval.updatedBy = this.userName;
			// this.sourcePoApproval.masterCompanyId = 1;

			/*if (!this.sourcePoApproval.deferredReceiver) {
				this.sourcePoApproval.deferredReceiver = 0;
			}
			if (!this.sourcePoApproval.resale) {
				this.sourcePoApproval.resale = 0;
			}*/
			console.log(this.sourcePoApproval);
			// header save 
			this.vendorService.savePurchaseorder({
				...this.sourcePoApprovalObj,

				// shipToAddressId: getValueFromObjectByKey('customerShippingAddressId' , this.sourcePoApproval.shipToAddressId ),
				// billToAddressId : getValueFromObjectByKey('customerShippingAddressId' , this.sourcePoApproval.billToAddressId ),
				/*masterCompanyId : 1,
				managementStructureId : getValueFromArrayOfObjectById( 'managementStructureId', 'managementStructureId' ,  this.sourcePoApproval.masterCompanyId , this.maincompanylist),
				vendorId : getValueFromObjectByKey('vendorId', this.sourcePoApproval.vendorId),
				purchaseOrderId : this.purchaseOrderId,
				priorityId: this.sourcePoApproval.priorityId.priorityId !== undefined ? this.sourcePoApproval.priorityId.priorityId : 0,
				creditTermsId: this.sourcePoApproval.creditTermsId !== undefined ? this.sourcePoApproval.creditTermsId.creditTermsId : 0*/
			}).subscribe(saveddata => {
				this.purchaseOrderId = saveddata.purchaseOrderId;
				this.savedInfo = saveddata;
				console.log(saveddata);
				this.tempVendorId = null;
				this.savePurchaseorderPart(saveddata.purchaseOrderId);
				this.savePOApproverData(saveddata.purchaseOrderId);
			});
		}

	}


	postSiteNameForShipping(moduleId, currentshipToAddressId) {

		console.log(moduleId, currentshipToAddressId);


		if (moduleId !== undefined && currentshipToAddressId !== undefined) {

			moduleId = parseInt(moduleId)
			if (moduleId == 1) {
				return getValueFromArrayOfObjectById('siteName', 'customerShippingAddressId', currentshipToAddressId, this.shipToCusData);
			} else
				if (moduleId == 2) {
					return getValueFromArrayOfObjectById('siteName', 'vendorShippingAddressId', currentshipToAddressId, this.vendorSelected);
				} else
					if (moduleId == 3) {
						return getValueFromArrayOfObjectById('siteName', 'legalEntityShippingAddressId', currentshipToAddressId, this.companySiteList_Shipping);
					}
		}

	}

	postSiteNameForBilling(moduleId, currentbillToAddressId) {

		if (moduleId !== undefined && currentbillToAddressId !== undefined) {
			moduleId = parseInt(moduleId)
			if (moduleId == 1) {
				return getValueFromArrayOfObjectById('siteName', 'customerShippingAddressId', currentbillToAddressId, this.billToCusData);
			} else
				if (moduleId == 2) {
					return getValueFromArrayOfObjectById('siteName', 'vendorShippingAddressId', currentbillToAddressId, this.vendorSelectedForBillTo);
				} else
					if (moduleId == 3) {
						return getValueFromArrayOfObjectById('siteName', 'legalEntityBillingAddressId', currentbillToAddressId, this.companySiteList_Billing);
					}
		}
	}

	savePOApproverData(purchaseOrderId) {
		console.log(this.approversData);
		if (this.approversData.approver1) {
			this.approverIds.push(this.approversData.approver1.value);
		}
		if (this.approversData.approver2) {
			this.approverIds.push(this.approversData.approver2.value);
		}
		if (this.approversData.approver3) {
			this.approverIds.push(this.approversData.approver3.value);
		}
		if (this.approversData.approver4) {
			this.approverIds.push(this.approversData.approver4.value);
		}
		if (this.approversData.approver5) {
			this.approverIds.push(this.approversData.approver5.value);
		}
		console.log(this.approverIds);

		for (let i = 0; i < this.approverIds.length; i++) {
			const poapprover = {
				employeeId: this.approverIds[i],
				level: i + 1,
				statusId: 1,
				createdBy: "admin",
				updatedBy: "admin"
			}
			this.poApproverList.push(poapprover);
			console.log(this.poApproverList);
		}
		this.poApproverData = {
			purchaseOrderId: purchaseOrderId,
			purchaseOrderApproverList: this.poApproverList
		}
		console.log(this.poApproverData);
		this.vendorService.saveCreatePOApproval(this.poApproverData).subscribe(res => {
			console.log(res);
		})
	}

	private loadcustomerData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.customerService.getWorkFlows().subscribe(
			results => this.oncusDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private loadvendorData() {
		//this.alertService.startLoadingMessage();
		//this.loadingIndicator = true;

		this.vendorService.getWorkFlows().subscribe(
			// res => {
			// 	console.log(res);				
			// 	this.allVendors = res;
			// }
			// results => this.oncusDataLoadSuccessful(results[0]),
			// error => this.onDataLoadFailed(error)
		);
	}

	private oncusDataLoadSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allCustomers = allWorkFlows;
		if (this.sourcePoApproval.billToUserType == 1) {
			this.onBillToCustomerNameselected(this.sourcePoApproval.billToUserName);
		}
		if (this.sourcePoApproval.billToUserType == 2) {
			this.onVendorselectedForBillTo(this.sourcePoApproval.billToUserName);
		}
		if (this.sourcePoApproval.shipToUserType == 1) {
			this.onshipCustomerNameselected(this.sourcePoApproval.shipToUserName);
		}
		if (this.sourcePoApproval.shipToUserType == 2) {
			this.onVendorselectedForShipTo(this.sourcePoApproval.shipToUserName);
		}
		if (this.sourcePoApproval.billToUserType == 1) {
			this.filterNames(this.sourcePoApproval.billToUserName);
		}
		if (this.sourcePoApproval.billToUserType == 2) {
			this.filterVendorNames(this.sourcePoApproval.billToUserName);
		}
		if (this.sourcePoApproval.shipToUserType == 1) {
			this.filterNames(this.sourcePoApproval.shipToUserName);
		}
		if (this.sourcePoApproval.shipToUserType == 2) {
			this.filterVendorNames(this.sourcePoApproval.shipToUserName);
		}

		//get Shipping info
		if (this.sourcePoApproval.billToUserType == 1) {
			this.customerService.getCustomerShipAddressGetWIthAddressId(this.sourcePoApproval.billToAddressId).subscribe(
				returnddataforbill1 => {
					let obj = returnddataforbill1[0][0];
					if (obj) {
						//this.selectedValue1.siteName = obj.cs.siteName;
						this.billToAddress.address1 = obj.ad.line1;
						this.billToAddress.address2 = obj.ad.line2;
						this.billToAddress.address3 = obj.ad.line3;
						this.billToAddress.city = obj.ad.city;
						this.billToAddress.stateOrProvince = obj.ad.stateOrProvince;
						this.billToAddress.postalCode = obj.ad.postalCode;
						this.billToAddress.country = obj.ad.country;
					}
				});
		}
		if (this.sourcePoApproval.billToUserType == 2) {

			this.customerService.getvendorShipAddressGetWIthAddressId(this.sourcePoApproval.billToAddressId).subscribe(
				returnddataforbill => {
					let obj = returnddataforbill[0][0];
					if (obj) {
						//this.selectedValue1.siteName = obj.cs.siteName;
						this.billToAddress.address1 = obj.ad.line1;
						this.billToAddress.address2 = obj.ad.line2;
						this.billToAddress.address3 = obj.ad.line3;
						this.billToAddress.city = obj.ad.city;
						this.billToAddress.stateOrProvince = obj.ad.stateOrProvince;
						this.billToAddress.postalCode = obj.ad.postalCode;
						this.billToAddress.country = obj.ad.country;
					}
				});
		}
		if (this.sourcePoApproval.shipToUserType == 1) {
			this.customerService.getCustomerShipAddressGetWIthAddressId(this.sourcePoApproval.shipToAddressId).subscribe(
				returnddataforbill => {

					let obj = returnddataforbill[0][0];
					if (obj) {
						//this.selectedValue1.siteName = obj.cs.siteName;
						this.shipToAddress.address1 = obj.ad.line1;
						this.shipToAddress.address2 = obj.ad.line2;
						this.shipToAddress.address3 = obj.ad.line3;
						this.shipToAddress.city = obj.ad.city;
						this.shipToAddress.stateOrProvince = obj.ad.stateOrProvince;
						this.shipToAddress.postalCode = obj.ad.postalCode;
						this.shipToAddress.country = obj.ad.country;
					}
				});
		}
		if (this.sourcePoApproval.shipToUserType == 2) {
			this.customerService.getvendorShipAddressGetWIthAddressId(this.sourcePoApproval.shipToAddressId).subscribe(
				returnddataforbill => {
					let obj = returnddataforbill[0][0];
					if (obj) {
						//this.selectedValue1.siteName = obj.cs.siteName;
						this.shipToAddress.address1 = obj.ad.line1;
						this.shipToAddress.address2 = obj.ad.line2;
						this.shipToAddress.address3 = obj.ad.line3;
						this.shipToAddress.city = obj.ad.city;
						this.shipToAddress.stateOrProvince = obj.ad.stateOrProvince;
						this.shipToAddress.postalCode = obj.ad.postalCode;
						this.shipToAddress.country = obj.ad.country;
					}
				});
		}

	}
	private ptnumberlistdata() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.itemser.getPrtnumberslistList().subscribe(
			results => this.onptnmbersSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onptnmbersSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allPartnumbersInfo = allWorkFlows;
		//debugger;
		console.log(this.allPartnumbersInfo);


	}

	// saveToVendorCustomerCompanyTable(sourceSplitShipment) //Shippment Details
	// {
	// 	if (this.sourcePoApproval.shipToUserType == 1) {
	// 		console.log("Customer");
	// 	}
	// 	else if (this.sourcePoApproval.shipToUserType == 2) {
	// 		console.log("Vendor");
	// 	}
	// 	else if (this.sourcePoApproval.shipToUserType == 3) {
	// 		console.log("Company");
	// 	}
	// 	console.log(sourceSplitShipment);
	// }

	filterpartItems(event) {



		this.partCollection = this.allPartnumbersInfo;

		if (event.query !== undefined && event.query !== null) {
			const partNumberFilter = [...this.allPartnumbersInfo.filter(x => {
				return x.partNumber.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.partCollection = partNumberFilter;
		}

		// this.partCollection = [];
		// this.itemclaColl = [];
		// if (this.allPartnumbersInfo) {
		// 	if (this.allPartnumbersInfo.length > 0) {

		// 		for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
		// 			let partName = this.allPartnumbersInfo[i].partNumber;
		// 			if (partName) {
		// 				if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
		// 					this.itemclaColl.push([{
		// 						"partId": this.allPartnumbersInfo[i].itemMasterId,
		// 						"partName": partName
		// 					}]),

		// 						this.partCollection.push(partName);
		// 				}
		// 			}
		// 		}
		// 	}
		// }
	}

	// filterpartItems(event) {
	// 	this.partCollection = this.allPartnumbersInfo;

	// 	if (event.query !== undefined && event.query !== null) {
	// 		const partnum = [...this.allPartnumbersInfo.filter(x => {
	// 			return x.partNumber.toLowerCase().includes(event.query.toLowerCase())
	// 		})]
	// 		this.partCollection = partnum;
	// 	}}

	partnmId(parentdata) {
		console.log(parentdata)

		this.showInput = true;

		// if (this.itemclaColl) {
		// 	for (let i = 0; i < this.itemclaColl.length; i++) {
		// 		if (event == this.itemclaColl[i][0].partName) {
		// 			this.sourcePoApproval.itemMasterId = this.itemclaColl[i][0].partId;
		//this.allSelectedParts.push(this.itemclaColl[i][0].partId);
		//this.selectedActionName = event;


		const itemMasterId = getValueFromObjectByKey('itemMasterId', parentdata.partNumberId)
		console.log(itemMasterId);

		this.sourcePoApproval.itemMasterId = itemMasterId;

		this.partWithId = [];
		this.itemTypeId = 1;

		//For Getting Data After Part Selected

		this.vendorService.getPartDetailsWithidForSinglePart(this.sourcePoApproval.itemMasterId).subscribe(
			data1 => {
				console.log(data1);
				if (data1[0]) {
					this.partWithId = data1[0];
					parentdata.partId = this.partWithId.itemMasterId;
					parentdata.altPartNumberId = this.partWithId.partAlternatePartId;
					parentdata.partDescription = this.partWithId.partDescription;
					parentdata.itemTypeId = this.partWithId.itemTypeId;
					parentdata.manufacturerId = this.partWithId.manufacturerId;
					parentdata.manufacturerName = this.partWithId.name;
					parentdata.glAccountId = this.partWithId.glAccountId;
					parentdata.glAccount = getObjectById('glAccountId', this.partWithId.glAccountId, this.allGlInfo);
					parentdata.UOMId = this.partWithId.purchaseUnitOfMeasureId;
					parentdata.UOMShortName = this.partWithId.shortName;
					parentdata.partNumber = this.partWithId.partNumber;
					parentdata.itemMasterId = this.partWithId.itemMasterId;
					//parentdata.partNumberId = this.partWithId.itemMasterId;

					/*	//this.glAccountTemp = this.partWithId.glAccountId;								
						//parentdata.glAccountId = this.partWithId.glAccountId;
						//console.log(parentdata.glAccount.accountName)
						parentdata.shortName = this.partWithId.shortName;
						parentdata.listPrice = this.partWithId.listPrice; //Initial Value
						parentdata.purchaseDiscountOffListPrice = this.partWithId.purchaseDiscountOffListPrice; //Percentage
						parentdata.manufacturerId = this.partWithId.manufacturerId;
						this.partList.unitCost = this.partWithId.purchaseListPriceAfterDiscount; //After Discount Value
						*/
				}

			})
		// 		}
		// 	};
		// }
	}
	ddlModel: any;

	savePurchaseorderPart(purId) {

		if (this.vendorService.isEditMode == false) {
			for (let i = 0; i < this.partListData.length; i++) {
				//alert("New");
				let childDataList = [];
				this.childObjectArray = [];
				this.parentObject = {};
				this.childObject = {};
				console.log(this.partListData[i].childList);
				if (this.partListData[i].childList) {
					if (this.partListData[i].childList.length > 0) {
						for (let j = 0; j < this.partListData[i].childList.length; j++) {

							childDataList.push(this.partListData[i].childList[j])
						}
					}
				}

				if (childDataList.length > 0) {
					console.log(childDataList);

					for (let j = 0; j < childDataList.length; j++) {
						this.childObject = {
							purchaseOrderId: purId,
							//isParent: false,
							//serialNumber: j+1,
							itemMasterId: this.partListData[i].itemMasterId ? this.partListData[i].itemMasterId : 0,
							assetId: this.partListData[i].assetId ? this.partListData[i].assetId : 0,
							partNumberId: this.partListData[i].itemMasterId ? this.partListData[i].itemMasterId : 0,
							poPartSplitUserTypeId: childDataList[j].partListUserTypeId ? childDataList[j].partListUserTypeId : 0,
							poPartSplitUserId: childDataList[j].partListUserId ? this.getIdByObject(childDataList[j].partListUserId) : 0,
							poPartSplitAddressId: childDataList[j].partListAddressId ? childDataList[j].partListAddressId : 0,
							UOMId: this.partListData[i].UOMId ? this.partListData[i].UOMId : 0,
							quantityOrdered: childDataList[j].quantityOrdered ? childDataList[j].quantityOrdered : 0,
							needByDate: childDataList[j].needByDate,
							managementStructureId: childDataList[j].managementStructureId ? childDataList[j].managementStructureId : 0, //109
							//createdBy: this.userName,
							//updatedBy: this.userName,
						}

						this.childObjectArray.push(this.childObject)
						console.log(this.childObjectArray);
					}
				}

				this.parentObject = {
					purchaseOrderId: purId,
					isParent: true,
					//serialNumber: i+1,
					itemMasterId: this.partListData[i].itemMasterId ? this.partListData[i].itemMasterId : 0,
					assetId: this.partListData[i].assetId ? this.partListData[i].assetId : 0,
					partNumberId: this.partListData[i].itemMasterId ? this.partListData[i].itemMasterId : 0,
					altPartNumberId: this.partListData[i].altPartNumberId ? this.partListData[i].altPartNumberId : 0,
					itemTypeId: this.partListData[i].itemTypeId ? this.partListData[i].itemTypeId : 0,
					manufacturerId: this.partListData[i].manufacturerId ? this.partListData[i].manufacturerId : 0,
					glAccounId: this.partListData[i].glAccountId ? this.partListData[i].glAccountId : 0,
					UOMId: this.partListData[i].UOMId ? this.partListData[i].UOMId : 0,
					needByDate: this.partListData[i].needByDate,
					conditionId: this.partListData[i].conditionId ? this.getConditionIdByObject(this.partListData[i].conditionId) : 0,
					quantityOrdered: this.partListData[i].quantityOrdered ? this.partListData[i].quantityOrdered : 0,
					unitCost: this.partListData[i].unitCost ? this.partListData[i].unitCost : 0,
					discountPerUnit: this.partListData[i].discountPerUnit ? this.partListData[i].discountPerUnit : 0,
					discountAmount: this.partListData[i].discountAmount ? this.partListData[i].discountAmount : 0,
					extendedCost: this.partListData[i].extendedCost ? this.partListData[i].extendedCost : 0,
					functionalCurrencyId: this.partListData[i].functionalCurrencyId ? this.getCurrencyIdByObject(this.partListData[i].functionalCurrencyId) : 1,
					foreignExchangeRate: this.partListData[i].foreignExchangeRate ? this.partListData[i].foreignExchangeRate : 0,
					//reportCurrencyId: this.partListData[i].reportCurrencyId ? this.partListData[i].reportCurrencyId : 1,
					reportCurrencyId: this.partListData[i].reportCurrencyId ? this.getCurrencyIdByObject(this.partListData[i].reportCurrencyId) : 1,
					workOrderId: this.partListData[i].workOrderId ? this.partListData[i].workOrderId : 0,
					repairOrderId: this.partListData[i].repairOrderId ? this.partListData[i].repairOrderId : 0,
					salesOrderId: this.partListData[i].salesOrderId ? this.partListData[i].salesOrderId : 0,
					managementStructureId: this.partListData[i].managementStructureId ? this.partListData[i].managementStructureId : 0,
					memo: this.partListData[i].memo,
					masterCompanyId: 1,
					createdBy: this.userName,
					updatedBy: this.userName,
					poPartSplits: this.childObjectArray,
				}
				this.parentObjectArray.push(this.parentObject)
				console.log(this.parentObjectArray);



			}
			this.vendorService.savePurchaseorderpart(this.parentObjectArray).subscribe(res => {
				console.log(res);
				this.alertService.showMessage(
					'Success',
					`Created New PO Successfully`,
					MessageSeverity.success
				);
			});
			//this.saveSuccessHelper(this.partListData[0])
		}
	}

	//getManagementStructureForPart(parts) {
	//    parts.forEach(part => {
	//        if (part.companyId != 0) {
	//            part.managementStructureId = part.companyId;
	//        }
	//    });
	//}
	getChildAddressValue(childobj, addressobj) {


		//childobj["poPartSplitAddressId"] = addressobj.vendorShippingAddressId;

		childobj["poPartSplitAddress1"] = addressobj.address1;
		childobj["poPartSplitAddress2"] = addressobj.address2;
		childobj["poPartSplitAddress3"] = addressobj.address3;
		childobj["poPartSplitCity"] = addressobj.city;
		childobj["poPartSplitState"] = addressobj.stateOrProvince;
		childobj["poPartSplitPostalCode"] = addressobj.postalCode;
		childobj["poPartSplitCountry"] = addressobj.country;
	}


	/*filterNames(event) {

		this.customerNames = [];
		if (this.allCustomers) {
			if (this.allCustomers.length > 0) {
				for (let i = 0; i < this.allCustomers.length; i++) {
					let name = this.allCustomers[i].name;
					if (event.query) {
						if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
							this.customerNamecoll.push([{
								"customerId": this.allCustomers[i].customerId,
								"name": name
							}]),
								this.customerNames.push(name);
						}
					}
					else {
						//if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
						this.customerNamecoll.push([{
							"customerId": this.allCustomers[i].customerId,
							"name": name
						}]),
							this.customerNames.push(name);
						//}
					}
				}
			}
		}
	}*/

	filterNames(event) {
		this.customerNames = this.allCustomers;

		if (event.query !== undefined && event.query !== null) {
			const customers = [...this.allCustomers.filter(x => {
				return x.name.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.customerNames = customers;
		}
	}


	customereventHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedActionName) {
				if (value == this.selectedActionName.toLowerCase()) {

				}
				else {

				}
			}

		}
	}
	onCustomerNameChange(part?, customer?): void {
		this.gridSelectedCustomerId = customer ? customer.customerId : this.gridSelectedCustomerId;
		console.log(part, customer)
		// part.poPartSplitUserId = customer.customerId;

		this.customerService.getCustomerShipAddressGet(this.gridSelectedCustomerId).subscribe(returnedcustomerAddressses => {
			this.spiltshipmentData = returnedcustomerAddressses[0];
			part.addressData = returnedcustomerAddressses[0];
			//part.poPartSplitAddressId = 0;
		});

	}
	getPartyNames(part, event): void {
		if (this.allCustomers && this.allCustomers.length > 0) {
			var customers = this.allCustomers.filter(function (customer) {
				return customer.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0;
			});
			part.customers = [];
			customers.forEach(customer => {
				part.customers.push({
					"customerId": customer.customerId,
					"customername": customer.name
				});
			});

		}
	}

	ddlVendorModel: any;
	vendoreventHandler(event): void {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedActionName) {
				if (value == this.selectedActionName.toLowerCase()) {

				}
				else {

				}
			}

		}
	}
	onVendorNameChange(part?, vendor?): void {
		console.log(part, vendor)
		this.gridSelectedVendorId = vendor ? vendor.vendorId : this.gridSelectedVendorId;
		//part.poPartSplitUserId = vendor.vendorId;
		this.vendorService.getVendorShipAddressGet(this.gridSelectedVendorId).subscribe(
			vendorAddresses => {
				this.vendorSelectedforSplit = vendorAddresses[0];
				part.addressData = vendorAddresses[0];;
			})
	}
	onCompanyNameChange(part?, company?) {
		// this.

	}

	// getVendorPartyNames(part, event): void {
	// 	if (this.allActions && this.allActions.length > 0) {
	// 		var vendors = this.allActions.filter(function (vendor) {
	// 			return vendor.vendorName.toLowerCase().indexOf(event.query.toLowerCase()) == 0;
	// 		});
	// 		part.vendors = [];
	// 		vendors.forEach(vendor => {
	// 			part.vendors.push({
	// 				"vendorId": vendor.vendorId,
	// 				"vendorName": vendor.vendorName
	// 			});
	// 		});

	// 	}
	// }
	filterSplitVendorNames(event) {
		this.splitVendorNames = this.allActions;

		if (event.query !== undefined && event.query !== null) {
			const vendorNames = [...this.allActions.filter(x => {
				return x.vendorName.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.splitVendorNames = vendorNames;
		}
	}
	onSelectSplitUserType(part) {
		part.addressData = [];
		part.partListUserId = {};
	}


	/*onCustomerNameselected(partChildList, event): void {
		//Customer Ship Address Data

		for (let i = 0; i < this.customerNamecoll.length; i++) {
			if (event == this.customerNamecoll[i][0].name) {

				this.customerService.getCustomerShipAddressGet(this.customerNamecoll[i][0].customerId).subscribe(returnedcusdata => {
					this.spiltshipmentData = returnedcusdata[0];
					partChildList["addressData"] = returnedcusdata[0];
				});
			}
		}
	}*/

	deleteSplitShipment(childata, index, mainindex) {

		if (childata.purchaseOrderPartRecordId) {
			this.vendorService.deletePurchaseorderpart(childata.purchaseOrderPartRecordId).subscribe(data => {

			})
		}
		const index1: number = this.partListData.indexOf(index);
		this.partListData[mainindex].childList.splice(index, 1);
	}
	filterCustomerContactsForShipTo(event) {
		this.firstNamesShipTo = this.shipToContactData;

		if (event.query !== undefined && event.query !== null) {
			const customerContacts = [...this.shipToContactData.filter(x => {
				return x.firstName.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.firstNamesShipTo = customerContacts;
		}


		// this.firstNamesShipTo = [];
		// if (this.shipToContactData) {
		// 	for (let i = 0; i < this.shipToContactData.length; i++) {
		// 		let firstName = this.shipToContactData[i].firstName;

		// 		if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
		// 			this.firstNamesShipTo.push(firstName);

		// 		}
		// 	}
		// }
	}
	filterVendorContactsForShipTo(event) {
		this.firstNamesShipTo1 = this.vendorContactsForshipTo;

		if (event.query !== undefined && event.query !== null) {
			const vendorContacts = [...this.vendorContactsForshipTo.filter(x => {
				return x.firstName.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.firstNamesShipTo1 = vendorContacts;
			console.log(this.firstNamesShipTo1);

		}

		// this.firstNamesShipTo1 = [];
		// console.log(this.vendorContactsForshipTo)
		// if (this.vendorContactsForshipTo) {
		// 	for (let i = 0; i < this.vendorContactsForshipTo.length; i++) {
		// 		let firstName = this.vendorContactsForshipTo[i].firstName;

		// 		if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
		// 			this.firstNamesShipTo1.push(firstName);

		// 		}
		// 	}
		// }
	}
	filterShippingContacts(event) {
		this.contactListForShippingCompany = this.contactListForCompanyShipping;
		const customerContacts = [...this.contactListForCompanyShipping.filter(x => {
			return x.firstName.toLowerCase().includes(event.query.toLowerCase())
		})]
		this.contactListForShippingCompany = customerContacts;
	}

	filterBillingContact(event) {
		this.contactListForBillingCompany = this.contactListForCompanyBilling;
		const customerContacts = [...this.contactListForCompanyBilling.filter(x => {
			return x.firstName.toLowerCase().includes(event.query.toLowerCase())
		})]
		this.contactListForBillingCompany = customerContacts;
	}


	filterCustomerContactsForBillTo(event) {
		this.firstNamesbillTo = this.billToContactData;

		if (event.query !== undefined && event.query !== null) {
			const customerContacts = [...this.billToContactData.filter(x => {
				return x.firstName.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.firstNamesbillTo = customerContacts;
		}

		// this.firstNamesbillTo = [];
		// if (this.billToContactData) {
		// 	for (let i = 0; i < this.billToContactData.length; i++) {
		// 		let firstName = this.billToContactData[i].firstName;

		// 		if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
		// 			this.firstNamesbillTo.push(firstName);

		// 		}
		// 	}
		// }
	}
	filterVendorContactsForBillTo(event) {
		this.firstNamesbillTo1 = this.vendorContactsForBillTO;

		if (event.query !== undefined && event.query !== null) {
			const vendorContacts = [...this.vendorContactsForBillTO.filter(x => {
				return x.firstName.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.firstNamesbillTo1 = vendorContacts;

		}

		// this.firstNamesbillTo1 = [];
		// if (this.vendorContactsForBillTO) {
		// 	for (let i = 0; i < this.vendorContactsForBillTO.length; i++) {
		// 		let firstName = this.vendorContactsForBillTO[i].firstName;

		// 		if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
		// 			this.firstNamesbillTo1.push(firstName);

		// 		}
		// 	}
		// }
	}
	onBillToCustomerNameselected(customerId) {
		this.billToSelectedvalue = customerId;
		for (let i = 0; i < this.allCustomers.length; i++) {
			if (customerId == this.allCustomers[i].customerId) {

				this.customerService.getCustomerBillViaDetails(customerId).subscribe(
					returnddataforbill => {
						this.billToCusData = returnddataforbill[0];
					});
				this.customerService.getContacts(customerId).subscribe(data => {
					this.billToContactData = data[0];//shipToContactData
				});
				break;
			}
		}

	}
	onshipCustomerNameselected(customerId) {
		this.shipToSelectedvalue = customerId;
		//console.log(event);		
		for (let i = 0; i < this.allCustomers.length; i++) {
			//if (event.name == this.customerNames[i].name) {
			if (customerId == this.allCustomers[i].customerId) {
				this.customerService.getCustomerShipAddressGet(customerId).subscribe(
					returnddataforbill => {
						this.shipToCusData = returnddataforbill[0];
					});
				this.customerService.getContacts(customerId).subscribe(data => {
					this.shipToContactData = data[0];
					// this.sourcePoApproval.shipToContactId = data[0];
					// this.adressPOPUPDropdown = this.shipToContactData ;
				});
				this.getShipViaDetailsForShipTo();

				// for (let i = 0; i < this.customerNames.length; i++) {
				// 	//if (event.name == this.customerNames[i].name) {
				// 	if (customerId == this.customerNames[i].customerId) {
				// 		this.customerService.getCustomerShipAddressGet(this.customerNames[i].customerId).subscribe(
				// 			returnddataforbill => {
				// 				this.shipToCusData = returnddataforbill[0];
				// 			});
				// 		this.customerService.getContacts(this.customerNames[i].customerId).subscribe(data => {


				// 			this.shipToContactData = data[0];
				// 			// this.sourcePoApproval.shipToContactId = data[0];
				// 			// this.adressPOPUPDropdown = this.shipToContactData ;
				// 		});

				// let moduleId = 0;
				// if(this.sourcePoApproval.shipToUserId == 1){

				// 	moduleId = getValueFromObjectByKey('customerId', this.sourcePoApproval.shipToUserId)
				// } else if(this.sourcePoApproval.shipToUserId == 2){

				// 	moduleId = getValueFromObjectByKey('vendorId', this.sourcePoApproval.shipToUserId)
				// }else if(this.sourcePoApproval.shipToUserId == 2){

				// 	moduleId = getValueFromObjectByKey('vendorId', this.sourcePoApproval.shipToUserId)
				// }


				// this.commonService.getShipViaDetailsByModule(this.sourcePoApproval.shipToUserTypeId, customerId).subscribe(res => {
				// 	this.shipViaList = res; //this.customerNames[i].customerId
				// })				
			}
		}

	}
	// onShipCompanySelected(object) {
	// 	console.log(object)
	// 	this.companyService.getShippingCompanySiteNames(object.value).subscribe(res => {
	// 		this.companySiteList_Shipping = res;
	// 	})
	// 	this.companyService.getCompanyContacts(object.value).subscribe(res => {
	// 		this.contactListForCompanyShipping = res;
	// 	})
	// }

	// onBillCompanySelected(object) {
	// 	this.companyService.getBillingCompanySiteNames(object.value).subscribe(res => {
	// 		this.companySiteList_Billing = res;
	// 	})
	// 	this.companyService.getCompanyContacts(object.value).subscribe(res => {
	// 		this.contactListForCompanyBilling = res;
	// 	})
	// }

	// private onaddressDataLoadSuccessful(allWorkFlows: any) {

	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;

	// 	this.addressData = allWorkFlows;

	// }


	private loadManagementdata() {


		this.legalEntityService.getManagemententity().subscribe(
			results => this.onManagemtntdataLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);



	}


	siteValueChange(data) //Site Valu Selection in Form
	{
		this.warehouseService.getAddressDate(data).subscribe( //calling and Subscribing for Address Data
			results => this.addressDataArray(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}

	siteValueChange1(data1) //Site Valu Selection in Form
	{
		this.warehouseService.getAddressDate(data1).subscribe( //calling and Subscribing for Address Data
			results => this.addressDataArrayBill(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}

	addressDataArrayBill(Bill: any) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.billToAddress = Bill;
		if (Bill) {
			this.allAddress = Bill;
			this.address1 = Bill.address1;
			//this.address2 = data.address2;
			//this.address3 = data.address3;
			this.city = Bill.city;
			this.country = Bill.country;
			this.postalCode = Bill.postalCode;
			this.stateOrProvince = Bill.stateOrProvince;
		}
	}

	openSiteedit(content) {
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.modal = this.modalService.open(content, { size: 'lg' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })

	}

	addressDataArray(data: any) //Getting Address
	{
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.shipToAddress = data;
		if (data) {
			this.allAddress = data;
			this.address1 = data.address1;
			//this.address2 = data.address2;
			//this.address3 = data.address3;
			this.city = data.city;
			this.country = data.country;
			this.postalCode = data.postalCode;
			this.stateOrProvince = data.stateOrProvince;
		}
		//Storing Address Details

	}

	private onManagemtntSitedataLoad(managementSiteData: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allManagementSiteData = managementSiteData;
	}

	private onManagemtntdataLoad(managementInfo: any[]) {
		console.log(managementInfo);
		this.allManagemtninfo = managementInfo;
		this.parentManagementInfo = managementInfo;
		this.childManagementInfo = managementInfo;
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == null) {
				this.bulist = [];
				this.divisionlist = [];
				this.departmentList = [];
				this.maincompanylist.push(this.allManagemtninfo[i]);
			}
		}
	}

	getBUList(companyId) {
		this.sourcePoApproval.managementStructureId = companyId;
		this.bulist = [];
		this.divisionlist = [];
		this.departmentList = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == companyId) {
				this.bulist.push(this.allManagemtninfo[i]);
			}
		}
		for (let i = 0; i < this.partListData.length; i++) {
			this.partListData[i].parentCompanyId = companyId;
			this.getParentBUList(this.partListData[i]);
			if (this.partListData[i].childList) {
				for (let j = 0; j < this.partListData[i].childList.length; j++) {
					this.partListData[i].childList[j].childCompanyId = companyId;
					this.getChildBUList(this.partListData[i].childList[j]);
				}
			}
		}

	}

	getDivisionlist(buId) {
		this.sourcePoApproval.managementStructureId = buId;
		this.divisionlist = [];
		this.departmentList = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == buId) {
				this.divisionlist.push(this.allManagemtninfo[i]);
			}
		}
		for (let i = 0; i < this.partListData.length; i++) {
			this.partListData[i].parentbuId = buId;
			this.getParentDivisionlist(this.partListData[i]);
			if (this.partListData[i].childList) {
				for (let j = 0; j < this.partListData[i].childList.length; j++) {
					this.partListData[i].childList[j].childbuId = buId;
					this.getChildDivisionlist(this.partListData[i].childList[j]);
				}
			}
		}
	}

	getDepartmentlist(divisionId) {
		this.sourcePoApproval.managementStructureId = divisionId;
		this.departmentList = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == divisionId) {
				this.departmentList.push(this.allManagemtninfo[i]);
			}
		}
		for (let i = 0; i < this.partListData.length; i++) {
			this.partListData[i].parentDivisionId = divisionId;
			this.getParentDeptlist(this.partListData[i]);
			if (this.partListData[i].childList) {
				for (let j = 0; j < this.partListData[i].childList.length; j++) {
					this.partListData[i].childList[j].childDivisionId = divisionId;
					this.getChildDeptlist(this.partListData[i].childList[j]);
				}
			}
		}
	}

	getDepartmentId(departmentId) {
		this.sourcePoApproval.managementStructureId = departmentId;
		for (let i = 0; i < this.partListData.length; i++) {
			this.partListData[i].parentDeptId = departmentId;
		}
		for (let i = 0; i < this.partListData.length; i++) {
			this.partListData[i].parentDeptId = departmentId;
			this.getParentDeptId(this.partListData[i]);
			if (this.partListData[i].childList) {
				for (let j = 0; j < this.partListData[i].childList.length; j++) {
					this.partListData[i].childList[j].childDeptId = departmentId;
					this.getChildDeptId(this.partListData[i].childList[j]);
				}
			}
		}
	}

	getParentBUList(partList) {
		partList.managementStructureId = partList.parentCompanyId;
		partList.parentBulist = []
		partList.parentDivisionlist = [];
		partList.parentDepartmentlist = [];
		for (let i = 0; i < this.parentManagementInfo.length; i++) {
			if (this.parentManagementInfo[i].parentId == partList.parentCompanyId) {
				partList.parentBulist.push(this.parentManagementInfo[i]);
			}
		}
	}

	getParentDivisionlist(partList) {
		partList.managementStructureId = partList.parentbuId;
		partList.parentDivisionlist = [];
		partList.parentDepartmentlist = [];
		for (let i = 0; i < this.parentManagementInfo.length; i++) {
			if (this.parentManagementInfo[i].parentId == partList.parentbuId) {
				partList.parentDivisionlist.push(this.parentManagementInfo[i]);
			}
		}
	}

	getParentDeptlist(partList) {
		partList.managementStructureId = partList.parentDivisionId;
		partList.parentDepartmentlist = [];
		for (let i = 0; i < this.parentManagementInfo.length; i++) {
			if (this.parentManagementInfo[i].parentId == partList.parentDivisionId) {
				partList.parentDepartmentlist.push(this.parentManagementInfo[i]);
			}
		}
	}

	getParentDeptId(partList) {
		partList.managementStructureId = partList.parentDeptId;
	}

	getChildBUList(partChildList) {
		partChildList.managementStructureId = partChildList.childCompanyId;
		console.log(partChildList.managementStructureId);

		partChildList.childBulist = [];
		partChildList.childDivisionlist = [];
		partChildList.childDepartmentlist = [];
		for (let i = 0; i < this.childManagementInfo.length; i++) {
			if (this.childManagementInfo[i].parentId == partChildList.childCompanyId) {
				partChildList.childBulist.push(this.childManagementInfo[i]);
			}
		}
	}

	getChildDivisionlist(partChildList) {
		partChildList.managementStructureId = partChildList.childbuId;
		partChildList.childDivisionlist = [];
		partChildList.childDepartmentlist = [];
		for (let i = 0; i < this.childManagementInfo.length; i++) {
			if (this.childManagementInfo[i].parentId == partChildList.childbuId) {
				partChildList.childDivisionlist.push(this.childManagementInfo[i]);
			}
		}
	}

	getChildDeptlist(partChildList) {
		partChildList.managementStructureId = partChildList.childDivisionId;
		partChildList.childDepartmentlist = [];
		for (let i = 0; i < this.childManagementInfo.length; i++) {
			if (this.childManagementInfo[i].parentId == partChildList.childDivisionId) {
				partChildList.childDepartmentlist.push(this.childManagementInfo[i]);
			}
		}
	}

	getChildDeptId(partChildList) {
		partChildList.managementStructureId = partChildList.childDeptId;
	}

	/*private onManagemtntdataLoad(getAtaMainList: any[]) {


		this.allManagemtninfo = getAtaMainList;
		if ((this.gridData) && (this.gridData.length == 0)) {
			this.gridData = this.makeNestedObj1(this.allManagemtninfo, this.companyId);
		}
		if (this.allManagemtninfo) {
			for (let i = 0; i < this.allManagemtninfo.length; i++) {
				this.copyOfAllManagemtninfo.push(JSON.parse(JSON.stringify(this.allManagemtninfo[i])));
			}
		}
		for (let i = 0; i < this.allManagemtninfo.length; i++) {

			if (this.allManagemtninfo[i].parentId == null) {
				this.bulist = [];
				this.departmentList = [];
				this.divisionlist = [];

				this.maincompanylist.push(this.allManagemtninfo[i]);
				this.mainPartcompanylist.push(this.allManagemtninfo[i]);


				//this.sourcePoApproval.buid1 = null;
				this.partList.buid1 = null;
			}


		}


	}
	getBUList(masterCompanyId) {
		// this.selectedMasterCompany = masterCompanyId;
	
		// this.sourcePoApproval.managementStructureId = masterCompanyId; //Saving Management Structure Id if there Company Id

		this.bulist = [];
		this.departmentList = [];
		this.divisionlist = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == masterCompanyId) {
				this.bulist.push(this.allManagemtninfo[i]);
			}
		}

		//this.sourcePoApproval.buid1 = null;

		for (let i = 0; i < this.partListData.length; i++) {
			if (this.partListData[i].companyId == 0) {
				this.partListData[i].companyId = masterCompanyId;
				this.onPartCompanyChange(this.partListData[i]);
			}
		}


		console.log(this.bulist);

	}

	onPartCompanyChange(part) {
		this.partList.managementStructureId = part.companyId; //Saving Management Structure Id if there Company Id

		part.partDepartmentList = [];
		part.partDepartmentId = 0;
		part.partDivisionList = [];
		part.partDivisionId = 0;
		part.managementStructureId = part.companyId;
		part.partBusinessUnitId = 0;
		part.partBulist = this.allManagemtninfo.filter(function (management) {
			return management.parentId == part.companyId;
		});
	}

	onPartBusinessUnitChange(part) {
		this.partList.managementStructureId = part.partDepartmentId; //Saving Management Structure Id if there Company Id

		part.partDeparmentId = 0;
		part.partDepartmentList = [];
		part.partDivisionId = 0;
		part.managementStructureId = part.partBusinessUnitId;
		part.partDivisionList = this.allManagemtninfo.filter(function (management) {
			return management.parentId == part.partBusinessUnitId;
		});
	}

	onPartDivisionChange(part): void {
		this.partList.managementStructureId = part.partDivisionId; //Saving Management Structure Id if there Company Id
		part.partDepartmentId = 0;
		part.managementStructureId = part.partDivisionId;
		part.partDepartmentList = this.allManagemtninfo.filter(function (management) {
			return management.parentId == part.partDivisionId;
		});
	}



	onPartDepartmentChange(part): void {
		part.managementStructureId = part.partDepartmentId;
		//this.partList.managementStructureId = divisionId;
	}

	getDepartmentlist(buid) {
		this.sourcePoApproval.managementStructureId = buid; //Saving Management Structure Id if there Company Id

		this.departmentList = [];
		this.divisionlist = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == buid) {
				this.divisionlist.push(this.allManagemtninfo[i]);
			}
		}

		//this.sourcePoApproval.depid1 = null;
		for (let i = 0; i < this.partListData.length; i++) {
			this.partListData[i].partBusinessUnitId = buid;
			this.onPartBusinessUnitChange(this.partListData[i]);
		}
	}

	getDivisionlist(divid) {
		this.sourcePoApproval.managementStructureId = divid; //Saving Management Structure Id if there Company Id
		this.departmentList = [];
		console.log(this.sourcePoApproval)
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == divid) {
				this.departmentList.push(this.allManagemtninfo[i]);
				console.log(this.departmentList)
			}
		}

		//this.sourcePoApproval.divid1 = true;
		for (let i = 0; i < this.partListData.length; i++) {
			this.partListData[i].partDivisionId = divid;
			this.onPartDivisionChange(this.partListData[i]);
		}

		console.log(this.departmentList);
	}

	getDivisionChangeManagementCode(depid) {
		this.sourcePoApproval.managementStructureId = depid;
		for (let i = 0; i < this.partListData.length; i++) {
			this.partListData[i].partDepartmentId = depid;
			this.onPartDepartmentChange(this.partListData[i]);
		}
	}*/
	private onprioritySuccessful(getPriorityList: any[]) {

		this.allPriorityInfo = getPriorityList;
	}
	private onDataLoadFailed(error: any) {


	}


	private loadCreditTermsData() {

		this.CreditTermsService.getCreditTermsList().subscribe(
			results => {
				this.onCreditTermsdata(results[0].columnData)
			},
			error => this.onDataLoadFailed(error)
		);

	}
	private onCreditTermsdata(getCreditTermsList: any[]) {
		this.allcreditTermInfo = getCreditTermsList;
	}

	getValue(data) {
		this.issuedToAddress = data;
		console.log(data);
	}
	/*getPartValue(parentdata, data) {
		this.partWithId = [];
		this.itemTypeId = 1;
		this.vendorService.getPartDetailsWithid(data).subscribe(
			data1 => {
				if (data1[0][0]) {
					this.partWithId = data1[0][0];
					parentdata.partAlternatePartId = this.partWithId.partAlternatePartId;
					parentdata.partId = this.partWithId.partId;
					parentdata.partdescription = this.partWithId.description;
					parentdata.partNumber = this.partWithId.partNumber;
					parentdata.itemTypeId = this.partWithId.itemTypeId;
					parentdata.name = this.partWithId.name;
					parentdata.itemMasterId = this.partWithId.itemMasterId;
				}

			})
		console.log(this.partWithId);
	}
	getPartValueForPart(parentdata, data) {
		this.partWithId = [];
		this.itemTypeId = 1;
		this.vendorService.getPartDetailsWithidForSinglePart(data).subscribe(
			data1 => {
				if (data1[0][0]) {
					this.partWithId = data1[0][0];
					parentdata.partAlternatePartId = this.partWithId.partAlternatePartId;
					parentdata.partId = this.partWithId.partId;
					parentdata.partdescription = this.partWithId.description;
					parentdata.partNumber = this.partWithId.partNumber;
					parentdata.itemTypeId = this.partWithId.itemTypeId;
					parentdata.name = this.partWithId.name;
					parentdata.itemMasterId = this.partWithId.itemMasterId;
					parentdata.glAccountId = this.partWithId.glAccountId;
					parentdata.shortName = this.partWithId.shortName;
				}

			})
		console.log(this.partWithId);
	}
	getMultiplParts(parentdata, data) {
		this.partWithId = [];
		this.itemTypeId = 1;
		if (data) {
			this.partWithId = data;
			parentdata.partAlternatePartId = this.partWithId.partAlternatePartId;
			//parentdata.partId = this.partWithId.partId;
			parentdata.partdescription = this.partWithId.description;
			parentdata.partNumber = this.partWithId.partNumber;
			parentdata.itemTypeId = this.partWithId.itemTypeId;
			parentdata.name = this.partWithId.name;
			parentdata.itemMasterId = this.partWithId.itemMasterId;
		}

		console.log(this.partWithId);
    }*/

	private loadConditionData() {

		this.conditionService.getConditionList().subscribe(data => {
			this.allconditioninfo = data[0];
		})


	}
	private loadUOMData() {


		this.unitofmeasureService.getUnitOfMeasureList().subscribe(uomdata => {
			this.allUomdata = uomdata[0];
		})


	}

	/*private loadPartListData() {
		if (this.vendorService.purchasepartcollection) {
			if (this.vendorService.purchasepartcollection.length > 0) {
				this.unitofmeasureService.getUnitOfMeasureList().subscribe(uomdata => {
					this.allUomdata = uomdata[0];
				});
			}
			else {
				let parentObj = this.defaultPartListObj(true);
				//parentObj["childList"] = [this.emptyPartListObj(false)];
				this.partListData = [parentObj];
			}
		} else {
			let parentObj = this.defaultPartListObj(true);
			//parentObj["childList"] = [this.emptyPartListObj(false)];
			this.partListData = [parentObj];
		}
	}*/

	// getCheckboxvalue(partList , parentRowIndex) {
	// 	console.log(partList);
	// 	if (partList["ifSplitShip"]) {
	// 		if (partList["partId"]) {
	// 			if (partList["childList"].length == 0)
	// 				this.addRow(partList);
	// 		} else {								
	// 			partList["ifSplitShip"] = false;
	// 			alert("please select Part Number");
	// 		}
	// 	} else {
	// 		partList['childList'] = [];
	// 	}
	// }

	ifSplitShipment(partList, event) {
		if (partList.ifSplitShip) {
			if (partList.partNumberId !== null && partList.partNumberId !== undefined) {
				//if(partList.childList.length == 0) {
				this.addRow(partList);
				//}
			} else {
				alert("Please select Part Number!");
				event.target.checked = false;
				partList.ifSplitShip = false;
			}
		} else {
			partList.childList = [];
		}
	}

	addAvailableParts() {
		// console.log(this.partListData)
		// console.log(this.newData);
		this.tempNewPNArray = [];
		let newParentObject = new CreatePOPartsList()
		if (this.newData) {
			const data = this.newData.map(x => {
				if (x.addAllMultiPNRows) {

					const newObject = {
						...newParentObject,
						partNumberId: getObjectById('itemMasterId', x.itemMasterId, this.allPartnumbersInfo)
					}
					this.partnmId(newObject)
					this.partListData = [...this.partListData, newObject]


				}



			})
			console.log(data);
			console.log(this.partListData);

			// for (let i = 0; i < this.newData.length; i++) {

			// 	if(this.newData[i].addAllMultiPNRows)
			// 					// if (this.newData[i].addAllMultiPNRows) {
			// 					// 	this.tempNewPNArray.push(new CreatePOPartsList());
			// 					// }
			// 					// partListData




			// }
			// this.tempNewPNArray.map(x => {
			// 	const pnobj = {
			// 		...x,
			// 		//partNumberId: getObjectById('itemMasterId', this.newData[i].itemMasterId, this.allActions)
			// 	}
			// 	this.partListData.push(pnobj);



			// })

			//this.partListData.push(new CreatePOPartsList());
			//grid childlist disable on load
			for (let i = 0; i < this.partListData.length; i++) {
				if (!this.partListData[i].ifSplitShip) {
					this.partListData[i].childList = [];
				}
			}
		}

		// this.tempPartListData = this.returnPartsListArray;
		// this.tempPartListData.map(x => {
		// 	partNumberId: x.partNumberId
		// })
		// for (let i = 0; i < this.returnPartsListArray.length; i++) {
		// 	if (this.returnPartsListArray[i].addAllMultiPNRows) {
		// 		this.partListData.push(this.returnPartsListArray[i]);

		// 		//this.partListData.push(this.defaultPartListObj(true));
		// 	//this.getMultiplParts(this.partListData[i], this.returnPartsListArray[i])
		// 	}			
		// }
		this.partNumbers = null;
		// this.returnPartsListArray = [];
		this.addAllMultiPN = false;
		//this.array = [];
		//this.modal.close();
	}

	onChangeAddAllMultiPN(event) {
		if (event.target.checked) {
			if (this.newData) {
				for (let i = 0; i < this.newData.length; i++) {
					this.newData[i].addAllMultiPNRows = true;
				}
			}
			//this.addAllMultiPNRows = true;
		} else {
			if (this.newData) {
				for (let i = 0; i < this.newData.length; i++) {
					this.newData[i].addAllMultiPNRows = false;
				}
			}
			//this.addAllMultiPNRows = false;
		}
	}

	onAddMultParts() {
		this.partNumbers = null;
		// this.returnPartsListArray = [];
		//this.array = [];
		this.newPNList = [];
		this.newData = [];
		this.addAllMultiPN = false;
	}

	// async getAllparts() {
	// 	console.log('getallparts function');
	// 	//let partsArray = [];
	// 	// this.returnPartsListArray = [];
	// 	this.newPNList = [];
	// 	this.array = this.partNumbers.split(',');

	//     // const tempData = []
	// 	if (this.array.length > 0) {
	// 		for (let i = 0; i < this.array.length; i++) {
	// 			await this.vendorService.getPartDetailsWithid(this.array[i]).subscribe(data => {

	// 				const responseData = data[0].map(x => {
	// 					// console.log(x);
	// 					this.newData.push({
	// 						...x,
	// 						addAllMultiPNRows: false
	// 					});
	// 				})
	// 				// console.log(this.newData);

	// 				// this.returnPartsListArray.push( {...responseData, addAllMultiPNRows: false } );
	// 			});				
	// 		}
	// 		// console.log(this.newData);

	// 		// console.log(this.array);

	// 			// this.newPNList = [...this.array.reduce((acc,x) => {
	// 			// 	// console.log(acc,  x)
	// 			// 	 return acc.filter(y => y.partNumber.toLowerCase() !== x.toLowerCase())  

	// 			// 	//  .x.partNumber.toLowerCase() !== x.toLowerCase()
	// 			// }, this.newData)]

	// 			this.newPNList = this.array;

	// 			console.log(this.newPNList);
	// 	}



	// }

	// async getAllparts() {
	// 		this.newPNList = [];
	// 		this.arraySearch = this.partNumbers.split(',');
	// 		this.array = [];
	// 		let ary = [];

	// 	    // const tempData = []
	// 		if (this.arraySearch.length > 0) {
	// 			for (let i = 0; i < this.arraySearch.length; i++) {
	// 				let flag = false;
	// 				await this.vendorService.getPartDetailsWithid(this.arraySearch[i]).subscribe(data => {
	// 					const responseData = data[0].map(x => {
	// 						if(x.partNumber.toLowerCase().trim() == this.arraySearch[i].toLowerCase().trim()){

	// 							ary.push(x.partNumber);
	// 							console.log(ary);
	// 						}
	// 						this.newData.push({
	// 							...x,
	// 							addAllMultiPNRows: false
	// 						});
	// 					})
	// 				});	

	// 			}

	// 			console.log('array length');
	// 			console.log(ary.length);


	// 				// this.newPNList = [...this.array.reduce((acc,x) => {
	// 				// 	// console.log(acc,  x)
	// 				// 	 return acc.filter(y => y.partNumber.toLowerCase() !== x.toLowerCase())  

	// 				// 	//  .x.partNumber.toLowerCase() !== x.toLowerCase()
	// 				// }, this.newData)]

	// 				this.array.forEach(element => {
	// 					console.log(element);
	// 				});



	// 				this.newPNList = this.array;
	// 		}



	// 	}

	getAllparts() {
		this.arraySearch = this.partNumbers;
		console.log(this.arraySearch);
		this.newData = [];
		this.newPNList = [];

		if (this.arraySearch.length > 0) {
			this.itemser.getPartDetailsByid(this.arraySearch).subscribe(data => {
				console.log(data);
				this.newData = data.multiParts.map(x => {
					return {
						...x,
						addAllMultiPNRows: false
					}
				})
				this.newPNList = data.partsNotFound;
			})


		}



	}


	addPartNumber() {
		//this.itemTypeId=0;		
		if (this.vendorService.isEditMode == false) {
			this.partListData.push(new CreatePOPartsList()); //CreatePOPartsListParent
			//grid childlist disable on load
			for (let i = 0; i < this.partListData.length; i++) {
				if (!this.partListData[i].ifSplitShip) {
					this.partListData[i].childList = [];
				}
			}
			if (this.sourcePoApproval.companyId) {
				for (let i = 0; i < this.partListData.length; i++) {
					if (i == this.partListData.length - 1) {
						this.partListData[i].parentCompanyId = this.sourcePoApproval.companyId;
						this.getParentBUList(this.partListData[i]);
					}
				}
			}
			if (this.sourcePoApproval.buId) {
				for (let i = 0; i < this.partListData.length; i++) {
					if (i == this.partListData.length - 1) {
						this.partListData[i].parentbuId = this.sourcePoApproval.buId;
						this.getParentDivisionlist(this.partListData[i]);
					}
				}
			}
			if (this.sourcePoApproval.divisionId) {
				for (let i = 0; i < this.partListData.length; i++) {
					if (i == this.partListData.length - 1) {
						this.partListData[i].parentDivisionId = this.sourcePoApproval.divisionId;
						this.getParentDeptlist(this.partListData[i]);
					}
				}
			}
			if (this.sourcePoApproval.departmentId) {
				for (let i = 0; i < this.partListData.length; i++) {
					if (i == this.partListData.length - 1) {
						this.partListData[i].parentDeptId = this.sourcePoApproval.departmentId;
						this.getParentDeptId(this.partListData[i]);
					}
				}
			}
		}
	}

	addRow(partList) {
		console.log(partList);

		partList.childList.push(new PartDetails());
		for (let i = 0; i < partList.childList.length; i++) {
			if (i == partList.childList.length - 1) {
				partList.childList.map(x => {
					console.log(x);
					console.log(partList.managementStructureId);
					return {
						...x,
						childCompanyId: this.getAddRowCompanyId(partList),
						childbuId: this.getAddRowBUId(partList),
						childDivisionId: this.getAddRowDivisionId(partList),
						childDeptId: this.getAddRowDeptId(partList),
						managementStructureId: partList.managementStructureId
					}
				})
				console.log(partList.childList);
			}
		}
	}


	getAddRowCompanyId(partList) {
		for (let i = 0; i < partList.childList.length; i++) {
			if (i == partList.childList.length - 1) {
				partList.childList[i].childCompanyId = partList.parentCompanyId;
				this.getChildBUList(partList.childList[i]);
			}
		}
	}

	getAddRowBUId(partList) {
		for (let i = 0; i < partList.childList.length; i++) {
			if (i == partList.childList.length - 1 && partList.childList[i].childCompanyId !== 0) {
				partList.childList[i].childbuId = partList.parentbuId;
				this.getChildDivisionlist(partList.childList[i]);
			}
		}
	}

	getAddRowDivisionId(partList) {
		for (let i = 0; i < partList.childList.length; i++) {
			if (i == partList.childList.length - 1 && partList.childList[i].childbuId !== 0) {
				partList.childList[i].childDivisionId = partList.parentDivisionId;
				this.getChildDeptlist(partList.childList[i]);
			}
		}
	}

	getAddRowDeptId(partList) {
		for (let i = 0; i < partList.childList.length; i++) {
			if (i == partList.childList.length - 1 && partList.childList[i].childDivisionId !== 0) {
				partList.childList[i].childDeptId = partList.parentDeptId;
				this.getChildDeptId(partList.childList[i]);
			}
		}
	}

	/*private defaultPartListObj(isParent = true, parentObj = null) {
		let partListObj = {
			ifSplitShip: false,
			purchaseOrderPartRecordId: '',
			purchaseOrderId: '',
			itemMasterId: '',
			serialNumber: '',
			nonInventory: '',
			requisitionedBy: '',
			requisitionedDate: '',
			approver: '',
			approvedDate: '',
			needByDate: this.needByTempDate,
			manufacturer: '',
			status: '',
			trace: '',
			conditionCode: '',
			uomId: '',
			quantityOrdered: '',
			unitCost: '',
			discountPerUnit: '',
			discountCostPerUnit: '',
			extendedCost: '',
			transactionalCurrencyId: '',
			functionalCurrencyId: '',
			foreignExchangeRate: '',
			workOrderId: '',
			repairOrderId: '',
			salesOrderId: '',
			generalLedgerAccounId: '',
			memo: '',
			poPartSplitAddressId: '',
			poPartSplitUserTypeId: '',
			poPartSplitUserId: '',
			poPartSplitAddress1: '',
			poPartSplitAddress2: '',
			poPartSplitAddress3: '',
			poPartSplitCity: '',
			poPartSplitState: '',
			poPartSplitPostalCode: '',
			poPartSplitCountry: '',
			managementStructureId: 0,
			createdBy: '',
			updatedBy: '',
			createdDate: '',
			updatedDate: '',
			isActive: '',
			isParent: isParent,
			partListObj: this.allPartDetails,
			itemTypeId: '',
			addressData: [],
			companyList: [],
			partBulist: [],
			partDepartmentList: [],
			partDivisionList: [],
			companyId: 0,
			partBusinessUnitId: 0,
			partDepartmentId: 0,
			partDivisionId: 0,
			customers: [],
			vendors: []
		}
		if (isParent) {
			partListObj["childList"] = [];//this.emptyPartListObj(false)
		} else if (parentObj) {
			partListObj["partId"] = parentObj["partId"];
			partListObj["partId"] = parentObj["partId"];
			// partListObj["poPartSplitUserTypeId"] = parentObj["poPartSplitUserTypeId"];
			// partListObj["poPartSplitUserName"] = parentObj["poPartSplitUserName"];
			// partListObj["poPartSplitAddress1"] = parentObj["poPartSplitAddress1"];
			// partListObj["poPartSplitAddress2"] = parentObj["poPartSplitAddress2"];
			// partListObj["poPartSplitAddress3"] = parentObj["poPartSplitAddress3"];
			// partListObj["poPartSplitCity"] = parentObj["poPartSplitCity"];
			// partListObj["poPartSplitState"] = parentObj["poPartSplitState"];
			// partListObj["poPartSplitPostalCode"] = parentObj["poPartSplitPostalCode"];
			// partListObj["poPartSplitCountry"] = parentObj["poPartSplitCountry"];
			// partListObj["needByDate"] = parentObj["needByDate"];
			// partListObj["quantityOrdered"] = parentObj["quantityOrdered"];
			partListObj["itemTypeId"] = parentObj["itemTypeId"];
		}
		return partListObj;
	}*/

	private loadCurrencyData() {

		this.currencyService.getCurrencyList().subscribe(currencydata => {
			console.log(currencydata)
			this.allCurrencyData = currencydata[0];
		})


	}
	clearInputShipTo() {
		this.sourcePoApproval.shipToUserId = '';


	}
	clearInputBillTo() {
		this.sourcePoApproval.billToUserId = '';
	}
	getValueforShipTo(data, id) {
		console.log(data, id);

		if (data.shipToUserTypeId == 1) {
			this.shipToAddress = getObjectById('customerShippingAddressId', id, this.shipToCusData);
		} else if (data.shipToUserTypeId == 2) {
			this.shipToAddress = getObjectById('vendorShippingAddressId', id, this.vendorSelected);
		}

		if (this.isEditMode) {
			if (data.shipToUserType == 1) {
				this.shipToAddress = getObjectById('customerShippingAddressId', id, this.shipToCusData);
			} else if (data.shipToUserType == 2) {
				this.shipToAddress = getObjectById('vendorShippingAddressId', id, this.vendorSelected);
			}
		}
		// if (data.customerShippingAddressId) {
		// 	this.sourcePoApproval.shipToAddressId = data.customerShippingAddressId;
		// }
		// else {
		// 	this.sourcePoApproval.shipToAddressId = data.vendorShippingAddressId;
		// }
		// console.log(data);
	}

	getValueforBillTo(data, id) {
		console.log(data, id);
		if (data.billToUserTypeId == 1) {



				// this.customerService.getCustomerBillViaDetails(id).subscribe(res => {
			 

					const resp =  getObjectById('customerBillingAddressId', id , this.billToCusData );
					console.log(resp , id )
			
				if (resp) {
					this.billToAddress.address1 = resp.address1;
					this.billToAddress.address2 = resp.address2;
					this.billToAddress.address3 = resp.address3;
					this.billToAddress.city = resp.city;
					this.billToAddress.stateOrProvince = resp.stateOrProvince;
					this.billToAddress.postalCode = resp.postalCode;
					this.billToAddress.country = resp.country;
				} else {
					this.billToAddress.address1 = '';
					this.billToAddress.address2 = '';
					this.billToAddress.address3 = '';
					this.billToAddress.city = '';
					this.billToAddress.stateOrProvince = '';
					this.billToAddress.postalCode = '';
					this.billToAddress.country = '';
				}

				// })


			// this.billToAddress = getObjectById('customerShippingAddressId', id, this.billToCusData);
		} else if (data.billToUserTypeId == 2) {
             this.vendorService.getVendorAddressById(id).subscribe(res => {
				const resp = res;
				if (resp) {
					this.billToAddress.address1 = resp.line1;
					this.billToAddress.address2 = resp.line2;
					this.billToAddress.address3 = resp.line3;
					this.billToAddress.city = resp.city;
					this.billToAddress.stateOrProvince = resp.stateOrProvince;
					this.billToAddress.postalCode = resp.postalCode;
					this.billToAddress.country = resp.country;
				} else {
					this.billToAddress.address1 = '';
					this.billToAddress.address2 = '';
					this.billToAddress.address3 = '';
					this.billToAddress.city = '';
					this.billToAddress.stateOrProvince = '';
					this.billToAddress.postalCode = '';
					this.billToAddress.country = '';
				}
			})

			// this.billToAddress = getObjectById('vendorShippingAddressId', id, this.vendorSelectedForBillTo);
		}

		// if (data.customerShippingAddressId) {
		// 	this.sourcePoApproval.billToAddressId = data.customerShippingAddressId;
		// }
		// else {
		// 	this.sourcePoApproval.billToAddressId = data.vendorShippingAddressId;
		// }
		// console.log(data);
	}

	onVendorselected(partChildList, event) //Calling For Vendor Ship Data
	{
		this.showInput = true;
		for (let i = 0; i < this.VendorNamecoll.length; i++) {
			if (event == this.VendorNamecoll[i][0].vendorName) {
				this.vendorService.getVendorShipAddressGet(this.VendorNamecoll[i][0].vendorId).subscribe(
					returdaa => {
						this.vendorSelectedforSplit = returdaa[0];
						partChildList["addressData"] = returdaa[0];;
					})
			}

		}

	}
	onVendorselectedForShipTo(vendorId) {
		this.shipToSelectedvalue = vendorId;
		this.showInput = true;
		this.vendorService.getVendorShipAddressGet(vendorId).subscribe(
			returdaa => {
				this.vendorSelected = returdaa[0];
			});
		this.vendorService.getContacts(vendorId).subscribe(data => {
			this.vendorContactsForshipTo = data[0]; //vendorContactsForshipTo

			console.log(this.vendorContactsForshipTo);

			// this.commonService.getShipViaDetailsByModule(this.sourcePoApproval.shipToUserTypeId, vendorId).subscribe(res => {
			// 	this.shipViaList = res;
			// })
			this.getShipViaDetailsForShipTo();
		});


		//for (let i = 0; i < this.VendorNamecoll.length; i++) {
		//	if (event == this.VendorNamecoll[i][0].vendorName) {
		//		this.vendorService.getVendorShipAddressGet(this.VendorNamecoll[i][0].vendorId).subscribe(
		//			returdaa => {
		//				this.vendorSelected = returdaa[0];
		//			})
		//		this.vendorService.getContacts(this.VendorNamecoll[i][0].vendorId).subscribe(
		//			returdaa => {
		//				this.vendorContactsForshipTo = returdaa[0];
		//                  })
		//              break;
		//	}
		//}
	}
	getShipViaDetails(id) {

		this.commonService.getShipViaDetailsById(id).subscribe(res => {
			const responseData = res;
			this.sourcePoApproval.shippingAcctNum = responseData.shippingAccountInfo;
			this.sourcePoApproval.shippingURL = responseData.shippingURL;
			this.sourcePoApproval.shippingId = responseData.shippingId;
			console.log(res)
		})
	}

    /*onshipCustomerNameselected(event) {

        for (let i = 0; i < this.customerNamecoll.length; i++) {
            if (event == this.customerNamecoll[i][0].name) {

                this.customerService.getCustomerShipAddressGet(this.customerNamecoll[i][0].customerId).subscribe(
                    returnddataforbill => {
                        this.shipToCusData = returnddataforbill[0];
                    });
                this.customerService.getContacts(this.customerNamecoll[i][0].customerId).subscribe(data => {

                    this.shipToContactData = data[0];
                });
                break;
            }
        }

    }*/

	async onVendorselectedForBillTo(vendorId) {
		// this.showInput = true;
		// for (let i = 0; i < this.VendorNamecoll.length; i++) {
		// 	if (event == this.VendorNamecoll[i][0].vendorName) {
		// 		this.vendorService.getVendorShipAddressGet(this.VendorNamecoll[i][0].vendorId).subscribe(
		// 			returdaa => {
		// 				this.vendorSelectedForBillTo = returdaa[0];
		// 			})
		// 		this.vendorService.getContacts(this.VendorNamecoll[i][0].vendorId).subscribe(
		// 			returdaa => {
		// 				this.vendorContactsForBillTO = returdaa[0];
		// 			})
		//         break;
		// 	}

		// }
		this.billToSelectedvalue = vendorId;
		this.showInput = true;
		//console.log(this.VendorNamecoll)
	await 	this.vendorService.getVendorSiteNames(vendorId).subscribe(
			returdaa => {
				this.vendorSelectedForBillTo = returdaa;
			})
		this.vendorService.getContacts(vendorId).subscribe(
			returdaa => {
				this.vendorContactsForBillTO = returdaa[0];
			})
	}

	eventHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedActionName) {
				if (value == this.selectedActionName.toLowerCase()) {
					this.disableSaveVenderName = true;
					this.disableSaveVenName = true;
				}
				else {
					this.disableSaveVenderName = false;
					this.disableSaveVenName = false;
				}
			}

		}
	}

	getSelectedContactObjectById() {
		//  return this.vendorContactList.filter(x => {
		//     if(x.isDefaultContact === true){
		// 		return x;
		// 	}
		//  })
	}

	filterVendorNames(event) {
		this.vendorNames = this.allActions;

		if (event.query !== undefined && event.query !== null) {
			const vendorFilter = [...this.allActions.filter(x => {
				return x.vendorName.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.vendorNames = vendorFilter;
		}

		//this.VendorNamecoll = vendorFilter;
		//   for (let i = 0; i < this.allActions.length; i++) { 
		//   let vendorName = this.allActions[i].vendorName;
		//   		 		if (event.query) {
		//	if (vendorName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
		//		//this.vendorNames.push(vendorName);
		//		this.VendorNamecoll.push([{
		//			"vendorId": this.allActions[i].vendorId,
		//			"vendorName": vendorName
		//		}]),
		//                           this.vendorNames.push(vendorName);

		//	}
		//}
		//   }
		//const vendorFilterData = [...this.allActions.filter(x => {
		//    return x.vendorName.toLowerCase().includes(event.query.toLowerCase())
		//})]
		//this.vendorNames = vendorFilterData;

		// if (this.allActions) {
		// 	for (let i = 0; i < this.allActions.length; i++) {
		// 		let vendorName = this.allActions[i].vendorName;
		// 		if (event.query) {
		// 			if (vendorName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
		// 				//this.vendorNames.push(vendorName);
		// 				this.VendorNamecoll.push([{
		// 					"vendorId": this.allActions[i].vendorId,
		// 					"vendorName": vendorName
		// 				}]),
		// 					this.vendorNames.push(vendorName);
		// 			}
		// 		}
		// 		else {
		// 			//if (vendorName.toLowerCase().indexOf(event.toLowerCase()) == 0) {
		// 			//this.vendorNames.push(vendorName);
		// 			this.VendorNamecoll.push([{
		// 				"vendorId": this.allActions[i].vendorId,
		// 				"vendorName": vendorName
		// 			}]),
		// 				this.vendorNames.push(vendorName);
		// 			//}
		// 		}
		// 	}
		// }
	}

	// autoCompleteBindById(field: string, id: any, originalData: any) {
	// 	const data = originalData.filter(x => {
	// 		if (x[field] === id) {
	// 			return x;
	// 		}
	// 	})
	// 	return data[0];
	// }

	selectedVendorName(value) {
		console.log(value);
		this.vendorContactList = [];
		this.getVendorContactsListByID(value.vendorId);
		this.sourcePoApproval.vendorName = value.vendorName;
		this.sourcePoApproval.vendorCode = getObjectById('vendorId', value.vendorId, this.allActions);
		this.sourcePoApproval.creditLimit = value.creditLimit;
		this.sourcePoApproval.creditTermsId = value.creditTermsId;
		this.sourcePoApproval.creditTerms = getValueFromArrayOfObjectById('name', 'creditTermsId', value.creditTermsId, this.allcreditTermInfo);
		//this.sourcePoApproval.creditTermsId = getObjectById('creditTermsId', value.creditTermsId, this.allcreditTermInfo);				
	}

	// filterVendorContacts(event) {
	// 	console.log(this.allActions)
	// 	this.vendorContactsHeader = this.allActions;

	// 	if (event.query !== undefined && event.query !== null) {
	// 		const vendorFilter = [...this.allActions.filter(x => {
	// 			return x.vendorContact.toLowerCase().includes(event.query.toLowerCase())
	// 		})]
	// 		this.vendorContactsHeader = vendorFilter;
	// 	}
	// }

	filterVendorContacts(event) {
		this.vendorContactsHeader = this.vendorContactList;

		if (event.query !== undefined && event.query !== null) {
			const vendorFilter = [...this.vendorContactList.filter(x => {
				return x.csrName.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.vendorContactsHeader = vendorFilter;
		}
	}

	filterVendorPhone(event) {
		this.vendorPhoneNum = this.vendorContactList;

		if (event.query !== undefined && event.query !== null) {
			const vendorPhone = [...this.vendorContactList.filter(x => {
				return x.workPhone;
			})]
			this.vendorPhoneNum = vendorPhone;
			console.log(this.vendorPhoneNum)
		}
	}

	filterPriorityNames(event) {
		this.allPriorityDetails = this.allPriorityInfo;

		if (event.query !== undefined && event.query !== null) {
			const priority = [...this.allPriorityInfo.filter(x => {
				return x.description.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.allPriorityDetails = priority;
		}
	}

	// filtercreditTerms(event) {
	// 	this.creditTermsList = this.allcreditTermInfo;

	// 	if (event.query !== undefined && event.query !== null) {
	// 		const creditterms = [...this.allcreditTermInfo.filter(x => {
	// 			return x.name.toLowerCase().includes(event.query.toLowerCase())
	// 		})]
	// 		this.creditTermsList = creditterms;
	// 	}
	// }

	filterCond(event) {
		this.conditionList = this.allconditioninfo;
		if (event.query !== undefined && event.query !== null) {
			const condlist = [...this.allconditioninfo.filter(x => {
				return x.description.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.conditionList = condlist;
		}
	}

	filterFunctionalCurrency(event) {
		this.functionalCurrList = this.allCurrencyData;
		if (event.query !== undefined && event.query !== null) {
			const funcCurrlist = [...this.allCurrencyData.filter(x => {
				return x.symbol.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.functionalCurrList = funcCurrlist;
		}
	}

	filterTransCurrency(event) {
		this.functionalTransList = this.allCurrencyData;
		if (event.query !== undefined && event.query !== null) {
			const transCurrlist = [...this.allCurrencyData.filter(x => {
				return x.symbol.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.functionalTransList = transCurrlist;
		}
	}

	private onDataLoadSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = allWorkFlows;
		this.allActions = allWorkFlows;
		if (this.sourcePoApproval.billToUserType == 1) {
			this.onBillToCustomerNameselected(this.sourcePoApproval.billToUserName);
		}
		if (this.sourcePoApproval.billToUserType == 2) {
			this.onVendorselectedForBillTo(this.sourcePoApproval.billToUserName);
		}
		if (this.sourcePoApproval.shipToUserType == 1) {
			this.onshipCustomerNameselected(this.sourcePoApproval.shipToUserName);
		}
		if (this.sourcePoApproval.shipToUserType == 2) {
			this.onVendorselectedForShipTo(this.sourcePoApproval.shipToUserName);
		}

		if (this.sourcePoApproval.billToUserType == 1) {
			this.filterNames(this.sourcePoApproval.billToUserName);
		}
		if (this.sourcePoApproval.billToUserType == 2) {
			this.filterVendorNames(this.sourcePoApproval.billToUserName);
		}
		if (this.sourcePoApproval.shipToUserType == 1) {
			this.filterNames(this.sourcePoApproval.shipToUserName);
		}
		if (this.sourcePoApproval.shipToUserType == 2) {
			this.filterVendorNames(this.sourcePoApproval.shipToUserName);
		}

	}
	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.vendorService.getWorkFlows().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);


	}

	/*private loadPartData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.vendorService.getPartDetails().subscribe(
			data => {
				this.allPartDetails = data[0];
				this.loadPartListData();
				if (this.vendorService.isEditMode == false) {

					for (let i = 0; i < this.partListData.length; i++) {
						this.partListData[i].partListObj = this.allPartDetails;
					}
				}
			})
	}*/

	// eventvendorHandler(event) {
	// 	if (event.target.value != "") {
	// 		let value = event.target.value.toLowerCase();
	// 		if (this.selectedVendorCode) {
	// 			if (value == this.selectedVendorCode.toLowerCase()) {
	// 				//alert("Action Name already Exists");
	// 				this.disableSaveVenName = true;
	// 				this.disableSaveVenderName = true;

	// 			}
	// 			else {
	// 				this.disableSaveVenName = false;
	// 				this.disableSaveVenderName = false;

	// 			}
	// 		}
	// 	}
	// }

	onVendorCodeselected(event) {

		for (let i = 0; i < this.VendorCodesColl.length; i++) {
			if (event == this.VendorCodesColl[i][0].vendorCode) {

				this.disableSaveVenName = true;
				this.disableSaveVenderName = true;
				this.selectedVendorCode = event;
			}
		}
		//console.log(this.allSelectedParts);


		//this.vendorNames = [];
		//this.vendorNames = this.allActions;
		//console.log(this.allActions);

		//const vendorNameFilterData = [...this.allActions.filter(x => {
		//    if (x.vendorCode === event) {
		//        this.vName = x.vendorName;
		//        console.log(this.vName)
		//        return this.vName;
		//    }           
		//})]
		//this.sourcePoApproval.vendorName = vendorNameFilterData;

	}

	filterVendorCodes(event) {
		this.vendorCodes = this.allActions;

		if (event.query !== undefined && event.query !== null) {
			const vendorCodesTemp = [...this.allActions.filter(x => {
				return x.vendorCode.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.vendorCodes = vendorCodesTemp;
		}
	}

	private ongeneralDataLoadSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = allWorkFlows;
		this.allgeneralInfo = allWorkFlows;
		//this.vendorname = this.allgeneralInfo[0].vendorName;
		//this.vendorCode = this.allgeneralInfo[0].vendorCode;
		//console.log(this.allgeneralInfo);
	}

	openClassification(content) {
		this.sourceissued = {};
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceissued.isActive = true;

		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })




	}

	addMultiplePartNumbers(content) {


		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })




	}
	openedit(childdata, content) {
		if (childdata.poPartSplitUserTypeId == 1) {
			alert("customer");
		} else if (childdata.poPartSplitUserTypeId == 2) {
			alert("Vendor");
		}
		else if (childdata.poPartSplitUserTypeId == 3) {
			alert("company");
		}
		this.sourceissued = {};
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceissued.isActive = true;

		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })




	}
	openeditmodel(content) {
		this.sourceissued = {};
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceissued.isActive = true;

		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })




	}
	openEditissued(content, selectedValue1) {

		this.isEditMode = true;
		this.sourceissued = selectedValue1;
		this.loadMasterCompanies();
		this.sourceissued.isActive = true;
		this.isSaving = true;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })




	}

	openEditissued1(content, selectedValue2) {

		this.isEditMode = true;
		this.sourceissued = selectedValue2;
		this.loadMasterCompanies();
		this.sourceissued.isActive = true;
		this.isSaving = true;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })




	}
	opencloseissued(content, selectedValue) {

		this.isEditMode = true;
		this.sourceissued = selectedValue;
		this.loadMasterCompanies();
		this.sourceissued.isActive = true;
		this.isSaving = true;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })




	}
	private loadMasterCompanies() {


		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.masterComapnyService.getMasterCompanies().subscribe(
			results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}

	private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allComapnies = allComapnies;

	}



	private saveCompleted(user?: any) {
		this.isSaving = false;

		if (this.isDeleteMode == true) {
			this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
			this.isDeleteMode = false;
		}
		else {
			this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

		}


	}

	/*private saveFailedHelper(error: any) {
		this.isSaving = false;
		this.alertService.stopLoadingMessage();
		this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
		this.alertService.showStickyMessage(error, null, MessageSeverity.error);
	}

	private saveSuccessHelper(role?: any) {
		this.isSaving = false;
		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

		this.loadData();

	}*/

	dismissModel() {
		this.isDeleteMode = false;
		this.isEditMode = false;
		this.modal.close();
	}


	editItemAndCloseModel() {
		this.isSaving = true;
		if (!(this.sourceissued.siteName && this.sourceissued.address1 && this.sourceissued.city &&
			this.sourceissued.stateOrProvince && this.sourceissued.postalCode && this.sourceissued.country
		)) {
			this.display = true;
			this.modelValue = true;
		}
		if (this.sourceissued.siteName && this.sourceissued.address1 && this.sourceissued.city &&
			this.sourceissued.stateOrProvince && this.sourceissued.postalCode && this.sourceissued.country) {
			//if (!this.sourcePoApproval.vendorId) {
			//if (!this.sourcePoApproval) {
			this.sourceissued.createdBy = this.userName;
			this.sourceissued.updatedBy = this.userName;
			this.sourceissued.masterCompanyId = 1;
			//	this.sourcePoApproval.isActive = true;
			this.sourceissued.vendorId = this.sourcePoApproval.vendorId;
			this.vendorService.newShippingAdd(this.sourceissued).subscribe(data => {
				this.localCollection = data;
				this.loadData();
				this.savesuccessCompleted(this.sourceissued);
				//this.updateVendorShippingAddress(this.localCollection);

			})


		}
		this.modal.close();
	}

	editItemAndModel() {
		this.isSaving = true;
		if (!(this.sourceissued.siteName && this.sourceissued.address1 && this.sourceissued.city &&
			this.sourceissued.stateOrProvince && this.sourceissued.postalCode && this.sourceissued.country
		)) {
			this.display = true;
			this.modelValue = true;
		}
		if (this.sourceissued.siteName && this.sourceissued.address1 && this.sourceissued.city &&
			this.sourceissued.stateOrProvince && this.sourceissued.postalCode && this.sourceissued.country) {
			//if (!this.sourcePoApproval.vendorId) {
			//if (!this.sourcePoApproval) {
			this.sourceissued.createdBy = this.userName;
			this.sourceissued.updatedBy = this.userName;
			this.sourceissued.masterCompanyId = 1;
			//	this.sourcePoApproval.isActive = true;
			this.sourceissued.vendorId = this.sourcePoApproval.vendorId;
			this.vendorService.newShippingAdd(this.sourceissued).subscribe(data => {
				this.localCollection = data;
				this.loadData();
				this.savesuccessCompleted(this.sourceissued);
				//this.updateVendorShippingAddress(this.localCollection);

			})



		}
		this.modal.close();
	}

	editItemModel() {
		this.isSaving = true;
		if (!(this.sourceissued.siteName && this.sourceissued.address1 && this.sourceissued.city &&
			this.sourceissued.stateOrProvince && this.sourceissued.postalCode && this.sourceissued.country
		)) {
			this.display = true;
			this.modelValue = true;
		}
		if (this.sourceissued.siteName && this.sourceissued.address1 && this.sourceissued.city &&
			this.sourceissued.stateOrProvince && this.sourceissued.postalCode && this.sourceissued.country) {
			//if (!this.sourcePoApproval.vendorId) {
			//if (!this.sourcePoApproval) {
			this.sourceissued.createdBy = this.userName;
			this.sourceissued.updatedBy = this.userName;
			this.sourceissued.masterCompanyId = 1;
			//	this.sourcePoApproval.isActive = true;
			this.sourceissued.vendorId = this.sourcePoApproval.vendorId;
			this.vendorService.newShippingAdd(this.sourceissued).subscribe(data => {
				this.localCollection = data;
				this.loadData();
				this.savesuccessCompleted(this.sourceissued);
				//this.updateVendorShippingAddress(this.localCollection);

			})



		}

		this.modal.close();
	}
	updateissued() {
		//this.isEditMode = true;
		this.sourcePoApproval.isActive = true;
		this.sourceissued.updatedBy = this.userName;

		this.sourcePoApproval.masterCompanyId = 1;
		this.vendorService.updateshippinginfo(this.sourceissued).subscribe(data => {
			this.updatedCollection = data;
			this.loadData();



		})
		this.modal.close();
	}

	private savesuccessCompleted(user?: any) {
		this.isSaving = false;


		this.alertService.showMessage("Success", `Action was added successfully`, MessageSeverity.success);



		this.loadData();
	}


	// filterfirstName(event) {

	// 	this.firstCollection = [];
	// 	for (let i = 0; i < this.allEmployeeinfo.length; i++) {
	// 		let firstName = this.allEmployeeinfo[i].firstName;
	// 		if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
	// 			this.firstCollection.push(firstName);
	// 		}
	// 	}
	// }

	filterRequisitioner(event) {
		this.requisitionerList = this.allEmployeeList;

		if (event.query !== undefined && event.query !== null) {
			const empFirstName = [...this.allEmployeeList.filter(x => {
				return x.label;
			})]
			this.requisitionerList = empFirstName;
		}
	}

	filterApprover(event) {
		this.approverList = this.allEmployeeList;

		if (event.query !== undefined && event.query !== null) {
			const empFirstName = [...this.allEmployeeList.filter(x => {
				return x.label;
			})]
			this.approverList = empFirstName;
		}
	}

	filterApproversList(event) {
		this.approversList = this.allEmployeeList;
		if (event.query !== undefined && event.query !== null) {
			const empFirstName = [...this.allEmployeeList.filter(x => {
				return x.label;
			})]
			this.approversList = empFirstName;
		}
	}

	Manufacturerdescription(event) {
		//
		if (this.allSites) {

			for (let i = 0; i < this.actionamecolle.length; i++) {
				if (event == this.actionamecolle[i][0].siteName) {
					//this.sourceSite.name = this.allSites[i][0].name;
					this.disableSaveManufacturer = true;

					this.selectedSite = event;
				}

			}
		}
	}

	ManufacturerHandler(event) //auto suzition start hear and value will pass to 
	{

		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedSite) {
				if (value == this.selectedSite.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSaveManufacturer = true;
				}
				else {
					this.disableSaveManufacturer = false;

				}
			}

		}
	}

	filtermanufacturer(event) // will call when we click droup down button
	{

		this.localCollection = [];
		for (let i = 0; i < this.allSites.length; i++) {
			let siteName = this.allSites[i].name;
			if (siteName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.actionamecolle.push([{
					"siteId": this.allSites[i].siteId,
					"siteName": siteName
				}]),
					this.localCollection.push(siteName)

			}
		}
	}
	employeedata() {
		this.commonService.smartDropDownList('Employee', 'employeeId', 'firstName').subscribe(res => {
			console.log(res);
			this.allEmployeeList = res;
		})
	}

	// private employeedata() {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;

	// 	this.employeeService.getEmployeeList().subscribe(
	// 		results => { console.log(results), this.onempDataLoadSuccessful(results[0]) },
	// 		error => this.onDataLoadFailed(error)
	// 	);

	// 	//this.selectedColumns = this.cols;

	// }

	// private onempDataLoadSuccessful(getEmployeeCerficationList: any[]) {
	// 	// alert('success');
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	//this.dataSource.data = getEmployeeCerficationList;
	// 	this.allEmployeeinfo = getEmployeeCerficationList;
	// 	console.log(this.allEmployeeinfo);
	// }

	saveSiteItemAndCloseModel() {
		this.sourceSite.createdBy = this.userName;
		this.sourceSite.updatedBy = this.userName;
		this.sourceSite.masterCompanyId = 1;
		this.sourceSite.name = this.name;
		this.siteService.newSite(this.sourceSite).subscribe(data => {
			this.siteInfo = data;
			if (data != null) {
				this.saveManagement(data.siteId, this.companyId, 1); //pushing Site Management Need Site Value so after getting SiteId we are calling

			}

		})
	}

	public saveManagement(siteId, data1, MasterCompanyId) //retriving SiteManagement Array
	{
		let Data = [{
			SiteId: siteId,
			ManagementStructureId: data1,
			MasterCompanyId: MasterCompanyId
		}]
		this.data1.push(Data);

		this.siteService.newManagementSite(this.data1[0][0]).subscribe(data11 => {
			this.localManagementSiteCollection = data11; //local SiteManagement Data
			this.getBUList1(this.companyId);
		})

		this.dismissModel();
	}


	quantityValueChange(event) {
		this.orderQuantity = event;
	}

	// addPageCustomer() {
	// 	this.route.navigateByUrl('/customersmodule/customerpages/app-customer-general-information');
	// }

	onDelPNRow(index) {
		this.partListData.splice(index, 1);
	}

	// checkAllPartDetails() {
	// 	this.partListData.map(x => {
	// 		if (!this.checkAllPartsList) {
	// 			x.checkPartList = true;
	// 		} else {
	// 			x.checkPartList = false;
	// 		}
	// 	})
	// }

	// onAddPartNum() {
	// 	this.route.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-stock');
	// }

	// onAddAllMultiPN() {
	// 	this.addAllMultiPNRows = !this.addAllMultiPNRows;
	// }

	shipUserType(event) {
		if (event.target.value === '1') {
			this.shipUserTypeCustomer = true;
			this.shipUserTypeCompany = false;
			this.shipUserTypeVendor = false;
		}
		if (event.target.value === '2') {
			this.shipUserTypeCompany = false;
			this.shipUserTypeCustomer = false;
			this.shipUserTypeVendor = true;
		}
		if (event.target.value === '3') {
			this.shipUserTypeVendor = false;
			this.shipUserTypeCustomer = false;
			this.shipUserTypeCompany = true;
		}
	}

	billUserType(event) {
		if (event.target.value === '1') {
			this.billUserTypeCustomer = true;
			this.billUserTypeCompany = false;
			this.billUserTypeVendor = false;
		}
		if (event.target.value === '2') {
			this.billUserTypeCompany = false;
			this.billUserTypeCustomer = false;
			this.billUserTypeVendor = true;
		}
		if (event.target.value === '3') {
			this.billUserTypeVendor = false;
			this.billUserTypeCustomer = false;
			this.billUserTypeCompany = true;
		}
	}

	onClickShipMemo() {
		this.addressMemoLabel = 'Edit Ship';
		this.tempMemo = this.sourcePoApproval.shipToMemo;
	}

	onClickBillMemo() {
		this.addressMemoLabel = 'Edit Bill';
		this.tempMemo = this.sourcePoApproval.billToMemo;
	}

	onSaveAddressMemo() {
		if (this.addressMemoLabel == 'Edit Ship') {
			this.sourcePoApproval.shipToMemo = this.tempMemo;
		}
		if (this.addressMemoLabel == 'Edit Bill') {
			this.sourcePoApproval.billToMemo = this.tempMemo;
		}
	}

	onAddMemo() {
		this.tempMemo = this.sourcePoApproval.poMemo;
	}
	onSaveMemo() {
		this.sourcePoApproval.poMemo = this.tempMemo;
		console.log(this.tempMemo)
	}


	onSelectShipUserType() {
		this.sourcePoApproval.shipToUserId = null;
		this.sourcePoApproval.shipToAddressId = null;
		this.sourcePoApproval.shipToContactId = null;
		this.sourcePoApproval.shipToMemo = '';
		//this.selectedValue1 = '';
		this.shipToAddress = {};


	}

	onSelectBillUserType() {
		this.sourcePoApproval.billToUserId = null;
		this.sourcePoApproval.billToAddressId = null;
		this.sourcePoApproval.billToContactId = null;
		//this.selectedValue2 = '';
		this.billToAddress = {};
		this.sourcePoApproval.billToMemo = '';
	}

	onSelectNeedByDate() {
		this.needByTempDate = this.sourcePoApproval.needByDate;
		const data = this.sourcePoApproval;
		console.log(data);

		//  partList["isParent"].partList["childList"];
		//     const y =  data.map(x => {
		// 		 ...x,

		// 	 })

		// }


		if (this.vendorService.isEditMode == false) {
			if (this.partListData) {
				for (let i = 0; i < this.partListData.length; i++) {
					this.partListData[i].needByDate = this.needByTempDate;
				}
			}

			for (let i = 0; i < this.partListData.length; i++) {
				if (this.partListData[i].childList) {
					if (this.partListData[i].childList.length > 0) {
						for (let j = 0; j < this.partListData[i].childList.length; j++) {
							this.partListData[i].childList[j].needByDate = this.needByTempDate;
						}
					}
				}
			}
		}



	}

	onGetDiscCostPerUnit(partList) {
		if (partList.unitCost !== null && partList.discountPerUnit !== null) {
			partList.discountCostPerUnit = Math.round((partList.unitCost * partList.discountPerUnit) / 100);
		}
	}

	onGetExtCost(partList) {
		if (partList.unitCost !== null && partList.discountPerUnit !== null) {
			partList.extendedCost = partList.unitCost - partList.discountPerUnit;
		}
	}

	async getVendorContactsListByID(vendorId) {
		await this.vendorService.getVendorContactsListByID(vendorId).subscribe(data => {
			console.log(data)
			this.vendorContactList = data[0];
			const isDefaultContact = this.vendorContactList.filter(x => {
				if (x.isDefaultContact === true) {
					return x;
				}
			})
			this.sourcePoApproval.vendorContactId = isDefaultContact[0];
			this.sourcePoApproval.vendorContactPhone = isDefaultContact[0];
		})


	}

	getConditionIdByObject(obj) {
		if (obj.conditionId) {
			return obj.conditionId;
		}
	}

	getIdByObject(obj) {
		if (obj.customerId) {
			return obj.customerId;
		}
		if (obj.vendorId) {
			return obj.vendorId;
		}
	}

	getCurrencyIdByObject(obj) {
		if (obj.currencyId) {
			return obj.currencyId;
		}
	}

	getShipToBillToUserId(obj) {
		if (obj.vendorId) {
			return obj.vendorId;
		}
		if (obj.customerId) {
			return obj.customerId;
		}
		// if (obj.value) {
		// 	return obj.value;
		// }
	}

	getEmployeeId(obj) {
		if (obj.value) {
			return obj.value;
		} else {
			return 0;
		}
	}

	getShipBillContactId(obj) {
		if (obj.contactId) {
			return obj.contactId;
		} else {
			return 0;
		}
	}

	getVendorContactId(obj) {
		if (obj.vendorContactId) {
			return obj.vendorContactId;
		} else {
			return 0;
		}
	}

	getVendorContactPhone(obj) {
		if (obj.vendorPhone) {
			return obj.vendorPhone;
		} else {
			return 0;
		}
	}

	getPriorityId(obj) {
		if (obj.priorityId) {
			return obj.priorityId;
		} else {
			return 0;
		}
	}

	getVendorId(obj) {
		if (obj.vendorId) {
			return obj.vendorId;
		} else {
			return 0;
		}
	}


	// onshipCustomerNameselected(event) {
	// 	for (let i = 0; i < this.customerNames.length; i++) {
	// 		if (event.name == this.customerNames[i].name) {

	// 			this.customerService.getCustomerShipAddressGet(this.customerNames[i].customerId).subscribe(
	// 				returnddataforbill => {
	// 					this.shipToCusData = returnddataforbill[0];
	// 				});
	// 			this.customerService.getContacts(this.customerNames[i].customerId).subscribe(data => {


	// 				this.shipToContactData = data[0];
	// 				// this.sourcePoApproval.shipToContactId = data[0];
	// 				// this.adressPOPUPDropdown = this.shipToContactData ;
	// 			});

	// 			// let moduleId = 0;
	// 			// if(this.sourcePoApproval.shipToUserId == 1){

	// 			// 	moduleId = getValueFromObjectByKey('customerId', this.sourcePoApproval.shipToUserId)
	// 			// } else if(this.sourcePoApproval.shipToUserId == 2){

	// 			// 	moduleId = getValueFromObjectByKey('vendorId', this.sourcePoApproval.shipToUserId)
	// 			// }else if(this.sourcePoApproval.shipToUserId == 2){

	// 			// 	moduleId = getValueFromObjectByKey('vendorId', this.sourcePoApproval.shipToUserId)
	// 			// }


	// 			this.commonService.getShipViaDetailsByModule(this.sourcePoApproval.shipToUserTypeId, this.customerNames[i].customerId).subscribe(res => {
	// 				this.shipViaList = res;
	// 			})
	// 		}
	// 	}

	// }
	onShipCompanySelected(object?) {
		this.shipToSelectedvalue = object ? object.value : this.shipToSelectedvalue;
		this.companyService.getShippingCompanySiteNames(this.shipToSelectedvalue).subscribe(res => {
			this.companySiteList_Shipping = res;
		})
		this.companyService.getCompanyContacts(this.shipToSelectedvalue).subscribe(res => {
			this.contactListForCompanyShipping = res;
		})
		this.getShipViaDetailsForShipTo();
	}

	getShipViaDetailsForShipTo() {
		this.commonService.getShipViaDetailsByModule(this.sourcePoApproval.shipToUserTypeId, this.shipToSelectedvalue).subscribe(res => {
			this.shipViaList = res;
		})
	}

	onBillCompanySelected(object?) {
		this.billToSelectedvalue = object ? object.value : this.billToSelectedvalue;

		this.companyService.getBillingCompanySiteNames(this.billToSelectedvalue).subscribe(res => {
			this.companySiteList_Billing = res;
		})
		this.companyService.getCompanyContacts(this.billToSelectedvalue).subscribe(res => {
			this.contactListForCompanyBilling = res;
		})

		this.commonService.getShipViaDetailsByModule(this.sourcePoApproval.billToUserTypeId, this.billToSelectedvalue).subscribe(res => {
			this.shipViaList = res;
		})
	}




	shippingSiteNameChange(id) {
		this.companyService.getShippingAddress(id).subscribe(res => {
			const resp = res;
			if (resp) {
				this.shipToAddress.address1 = resp.line1;
				this.shipToAddress.address2 = resp.line2;
				this.shipToAddress.address3 = resp.line3;
				this.shipToAddress.city = resp.city;
				this.shipToAddress.stateOrProvince = resp.stateOrProvince;
				this.shipToAddress.postalCode = resp.postalCode;
				this.shipToAddress.country = resp.country;
			} else {
				this.shipToAddress.address1 = '';
				this.shipToAddress.address2 = '';
				this.shipToAddress.address3 = '';
				this.shipToAddress.city = '';
				this.shipToAddress.stateOrProvince = '';
				this.shipToAddress.postalCode = '';
				this.shipToAddress.country = '';
			}


		})
	}
	billingSiteNameChange(id) {
		this.companyService.getBillingAddress(id).subscribe(res => {
			const resp = res;
			if (resp) {
				this.billToAddress.address1 = resp.line1;
				this.billToAddress.address2 = resp.line2;
				this.billToAddress.address3 = resp.line3;
				this.billToAddress.city = resp.city;
				this.billToAddress.stateOrProvince = resp.stateOrProvince;
				this.billToAddress.postalCode = resp.postalCode;
				this.billToAddress.country = resp.country;
			} else {
				this.billToAddress.address1 = '';
				this.billToAddress.address2 = '';
				this.billToAddress.address3 = '';
				this.billToAddress.city = '';
				this.billToAddress.stateOrProvince = '';
				this.billToAddress.postalCode = '';
				this.billToAddress.country = '';
			}
		})
	}
	resetAddressShippingForm() {
		this.addressFormForShipping = new CustomerShippingModel()
	}

	resetAddressBillingForm() {
		this.addressFormForBilling = new CustomerShippingModel()
	}
	async saveShippingAddress() {
		const data = {
			...this.addressFormForShipping,
			createdBy: this.userName,
			updatedBy: this.userName,
			masterCompanyId: 1,
			isActive: true,

		}
		if (this.sourcePoApproval.shipToUserTypeId == 1) {
			const customerData = { ...data, isPrimary: true, customerId: getValueFromObjectByKey('customerId', this.sourcePoApproval.shipToUserId) }

			await this.customerService.newShippingAdd(customerData).subscribe(() => {

				//this.onShipCompanySelected();
				this.onshipCustomerNameselected(customerData.customerId);
				// this.addressFormForShipping = new CustomerShippingModel()
				this.alertService.showMessage(
					'Success',
					`Saved  Shipping Information Sucessfully `,
					MessageSeverity.success
				);

			})
		}
		if (this.sourcePoApproval.shipToUserTypeId == 2) {
			const vendorData = { ...data, vendorId: getValueFromObjectByKey('vendorId', this.sourcePoApproval.shipToUserId) }

			await this.vendorService.newShippingAdd(vendorData).subscribe(() => {
				this.onVendorselectedForShipTo(vendorData.vendorId);				
				//this.onShipCompanySelected();
				// this.addressFormForShipping = new CustomerShippingModel()
				this.alertService.showMessage(
					'Success',
					`Saved  Shipping Information Sucessfully `,
					MessageSeverity.success
				);

			})
		}
		if (this.sourcePoApproval.shipToUserTypeId == 3) {
			const companyData = { ...data, legalentityId: getValueFromObjectByKey('value', this.sourcePoApproval.shipToUserId) }
			await this.companyService.addNewShippingAddress(companyData).subscribe(() => {
				this.onShipCompanySelected();
				// this.addressFormForShipping = new CustomerShippingModel()
				this.alertService.showMessage(
					'Success',
					`Saved  Shipping Information Sucessfully `,
					MessageSeverity.success
				);

			})
		}
		// this.onShipCompanySelected();



	}

	saveShippingAddressToPO() {
		const data = {
			...this.addressFormForShipping,
			createdBy: this.userName,
			updatedBy: this.userName,
			masterCompanyId: 1,
			isActive: true,

		}
		if (this.sourcePoApproval.shipToUserTypeId == 1) {
			const customerData = { ...data, customerId: getValueFromObjectByKey('customerId', this.sourcePoApproval.shipToUserId) }

			this.commonService.createAddress(customerData).subscribe(() => {
				// this.addressFormForShipping = new CustomerShippingModel()
				this.alertService.showMessage(
					'Success',
					`Saved  Shipping Information Sucessfully `,
					MessageSeverity.success
				);

			})
		}
		if (this.sourcePoApproval.shipToUserTypeId == 2) {
			const vendorData = { ...data, vendorId: getValueFromObjectByKey('vendorId', this.sourcePoApproval.shipToUserId) }

			this.commonService.createAddress(vendorData).subscribe(() => {
				// this.addressFormForShipping = new CustomerShippingModel()
				this.alertService.showMessage(
					'Success',
					`Saved  Shipping Information Sucessfully `,
					MessageSeverity.success
				);

			})
		}
		if (this.sourcePoApproval.shipToUserTypeId == 3) {
			const companyData = { ...data, legalentityId: getValueFromObjectByKey('value', this.sourcePoApproval.shipToUserId) }
			this.commonService.createAddress(companyData).subscribe(() => {
				// this.addressFormForShipping = new CustomerShippingModel()
				this.alertService.showMessage(
					'Success',
					`Saved  Shipping Information Sucessfully `,
					MessageSeverity.success
				);

			})
		}
	}



	async saveBillingAddress() {
		const data = {
			...this.addressFormForBilling,
			createdBy: this.userName,
			updatedBy: this.userName,
			masterCompanyId: 1,
			isActive: true,
			isPrimary: true

		}
		if (this.sourcePoApproval.billToUserTypeId == 1) {
			const customerData = { ...data, customerId: getValueFromObjectByKey('customerId', this.sourcePoApproval.billToUserId) }
			await this.customerService.newBillingAdd(customerData).subscribe(() => {
				this.onBillToCustomerNameselected(customerData.customerId);
				//this.onBillCompanySelected();
				// this.addressFormForBilling = new CustomerShippingModel()
				this.alertService.showMessage(
					'Success',
					`Saved  Billing Information Sucessfully `,
					MessageSeverity.success
				);
			})
		}
		if (this.sourcePoApproval.billToUserTypeId == 2) {
			const vendorData = { ...data, vendorId: getValueFromObjectByKey('vendorId', this.sourcePoApproval.billToUserId) }
			await this.vendorService.addNewBillingAddress(vendorData).subscribe(() => {
				this.onVendorselectedForBillTo(vendorData.vendorId);
				//this.onBillCompanySelected();
				// this.addressFormForBilling = new CustomerShippingModel()
				this.alertService.showMessage(
					'Success',
					`Saved  Billing Information Sucessfully `,
					MessageSeverity.success
				);

			})
		}
		if (this.sourcePoApproval.billToUserTypeId == 3) {
			const companyData = { ...data, legalentityId: getValueFromObjectByKey('value', this.sourcePoApproval.billToUserId) }
			await this.companyService.addNewBillingAddress(companyData).subscribe(() => {
				this.onBillCompanySelected();
				// this.addressFormForBilling = new CustomerShippingModel()
				this.alertService.showMessage(
					'Success',
					`Saved  Billing Information Sucessfully `,
					MessageSeverity.success
				);

			})
		}
		// this.onBillCompanySelected();

	}


	resetAddressShipViaForm() {
		this.addShipViaFormForShipping = new CustomerInternationalShipVia()
	}

	async saveShipViaForShipTo() {
		const data = {
			...this.addShipViaFormForShipping,
			name: this.addShipViaFormForShipping.shipVia,
			createdBy: this.userName,
			updatedBy: this.userName,
			masterCompanyId: 1,
			isActive: true,
			UserType: parseInt(this.sourcePoApproval.shipToUserTypeId)
		}

		if (this.sourcePoApproval.shipToUserTypeId == 1) {
			const customerData = { ...data, ReferenceId: getValueFromObjectByKey('customerId', this.sourcePoApproval.shipToUserId) }

			await this.commonService.createShipVia(customerData).subscribe(() => {
				this.getShipViaDetailsForShipTo();
				// this.addressFormForShipping = new CustomerShippingModel()
				this.alertService.showMessage(
					'Success',
					`Saved  Ship Via Information Sucessfully `,
					MessageSeverity.success
				);

			})
		}
		if (this.sourcePoApproval.shipToUserTypeId == 2) {
			const vendorData = { ...data, ReferenceId: getValueFromObjectByKey('vendorId', this.sourcePoApproval.shipToUserId) }

			await this.commonService.createShipVia(vendorData).subscribe(() => {
				this.getShipViaDetailsForShipTo();
				// this.addressFormForShipping = new CustomerShippingModel()
				this.alertService.showMessage(
					'Success',
					`Saved  Ship Via Information Sucessfully `,
					MessageSeverity.success
				);

			})
		}
		if (this.sourcePoApproval.shipToUserTypeId == 3) {
			const companyData = { ...data, ReferenceId: getValueFromObjectByKey('value', this.sourcePoApproval.shipToUserId) }
			await this.commonService.createShipVia(companyData).subscribe(() => {
				this.getShipViaDetailsForShipTo();
				// this.addressFormForShipping = new CustomerShippingModel()
				this.alertService.showMessage(
					'Success',
					`Saved  Ship Via Information Sucessfully `,
					MessageSeverity.success
				);

			})
		}

	}





	// saveSplitAddress() {
	// 	console.log(this.splitUserTypeAddress);

	// }
	resetAddressForm() {
		this.addNewAddress = new AddressNew();
	}
	createNewAddress() {
		const data = {
			...this.addNewAddress,
			createdBy: this.userName,
			updatedBy: this.userName,
			masterCompanyId: 1,
			isActive: true,
		}
		this.commonService.createAddress(data).subscribe(res => {
			this.onCustomerNameChange();
			this.onVendorNameChange();

			// this.resetAddressForm();
			this.alertService.showMessage(
				'Success',
				`Saved Address  Sucessfully `,
				MessageSeverity.success
			);
		})
	}

	saveSplitAddressToPO() {

	}

	// saveShipToShipViaDetails() {

	// }

	saveShipToShipViaDetailsToPO() {

	}

	onClickPartsListAddress(value) {
		this.enableSiteName = false;
		if (value === 'Add') {
			this.addressHeader = 'Add Split Shipment Address';
		}
		if (value === 'Edit') {
			this.addressHeader = 'Edit Split Shipment Address';
		}
	}

	onClickShipSiteName(value) {
		if (value === 'AddCusSiteName') {
			this.addressSiteNameHeader = 'Add Ship To Customer Details';
		}
		if (value === 'EditCusSiteName') {
			this.addressSiteNameHeader = 'Edit Ship To Customer Details';
		}
		if (value === 'AddVenSiteName') {
			this.addressSiteNameHeader = 'Add Ship To Vendor Details';
		}
		if (value === 'EditVenSiteName') {
			this.addressSiteNameHeader = 'Edit Ship To Vendor Details';
		}
		if (value === 'AddComSiteName') {
			this.addressSiteNameHeader = 'Add Ship To Company Details';
		}
		if (value === 'EditComSiteName') {
			this.addressSiteNameHeader = 'Edit Ship To Company Details';
		}
	}

	onClickBillSiteName(value) {
		if (value === 'AddCusSiteName') {
			this.addressSiteNameHeader = 'Add Bill To Customer Details';
		}
		if (value === 'EditCusSiteName') {
			this.addressSiteNameHeader = 'Edit Bill To Customer Details';
		}
		if (value === 'AddVenSiteName') {
			this.addressSiteNameHeader = 'Add Bill To Vendor Details';
		}
		if (value === 'EditVenSiteName') {
			this.addressSiteNameHeader = 'Edit Bill To Vendor Details';
		}
		if (value === 'AddComSiteName') {
			this.addressSiteNameHeader = 'Add Bill To Company Details';
		}
		if (value === 'EditComSiteName') {
			this.addressSiteNameHeader = 'Edit Bill To Company Details';
		}
	}

	onChangeParentQtyOrdered(event) {
		this.parentQty = event.target.value;
	}
	onChangeChildQtyOrdered(partList) {
		this.childOrderQtyArray = [];
		console.log(partList.childList);
		for (let i = 0; i < partList.childList.length; i++) {
			if (partList.childList[i].quantityOrdered === null || partList.childList[i].quantityOrdered === undefined) {
				partList.childList[i].quantityOrdered = 0;
			}
			this.childOrderQtyArray.push(parseInt(partList.childList[i].quantityOrdered));
			this.childOrderQtyTotal = this.childOrderQtyArray.reduce((acc, val) => acc + val, 0);
			console.log(this.childOrderQtyTotal);
			if (this.childOrderQtyTotal > this.parentQty) {
				partList.childList[i].quantityOrdered = 0;
			}
		}
		if (this.childOrderQtyTotal > this.parentQty) {
			alert('Total Child Order Quantity exceeded the Parent Quantity!');
		}
	}
	onSelectApprover(value, data) {
		console.log(data);
		this.employeeService.getEmployeeDataById(data.value).subscribe(response => {
			console.log(response);
			if (value === 'approver1') {
				this.approver1 = response;
			}
			if (value === 'approver2') {
				this.approver2 = response;
			}
			if (value === 'approver3') {
				this.approver3 = response;
			}
			if (value === 'approver4') {
				this.approver4 = response;
			}
			if (value === 'approver5') {
				this.approver5 = response;
			}
		})
	}

}



//this.testData = this.makeNestedObj(this.allManagemtninfo, true);
				//for (let i = 0; i < this.vendorService.purchasepartcollection.length; i++) {
				//	if (this.vendorService.purchasepartcollection[i].pop.isParent == true) {
				//		this.partListData.push(this.vendorService.purchasepartcollection[i].pop)
				//		this.partListData[i].partId = vendorService.purchasepartcollection[i].partId;
				//		this.partListData[i].partdescription = vendorService.purchasepartcollection[i].description;
				//		this.partListData[i].itemTypeId = vendorService.purchasepartcollection[i].itemTypeId;
				//		this.partListData[i].name = vendorService.purchasepartcollection[i].name;
				//		this.partListData[i].glAccountId = vendorService.purchasepartcollection[i].glAccountId;
				//		this.partListData[i].serialNumber = vendorService.purchasepartcollection[i].serialNumber;
				//		this.partListData[i].partNumber = vendorService.purchasepartcollection[i].partNumber;
				//		//this.partListData[i]["childList"] = [];

				//	}
				//	if (i == this.vendorService.purchasepartcollection.length - 1) {
				//		alert("over")
				//		for (let j = 0; j < this.partListData.length; j++) {
				//		for (let m = 0; m < this.vendorService.purchasepartcollection.length; m++) {

				//			if (this.vendorService.purchasepartcollection[m].pop.isParent == false) {
				//				if (this.partListData[j].itemMasterId == this.vendorService.purchasepartcollection[m].pop.itemMasterId) {
				//					this.partListData[j]["childList"] = [];
				//					this.partListData[j].ifSplitShip = true;
				//					this.vendorService.purchasepartcollection[m].pop.itemTypeId = vendorService.purchasepartcollection[m].itemTypeId;
				//					this.partListData[j]["childList"].push(this.vendorService.purchasepartcollection[m].pop);
				//					//this.partListData[j]["childList"].itemTypeId = vendorService.purchasepartcollection[i].itemTypeId;

				//				}
				//			}
				//			}
				//		}
				//	}

				//}