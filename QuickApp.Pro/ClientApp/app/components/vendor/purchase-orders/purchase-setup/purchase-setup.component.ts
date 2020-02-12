import { Component, OnInit, ViewChild } from '@angular/core';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { CreditTermsService } from '../../../../services/Credit Terms.service';
import { VendorService } from '../../../../services/vendor.service';
import { PriorityService } from '../../../../services/priority.service';
import { ConditionService } from '../../../../services/condition.service';
import { UnitOfMeasureService } from '../../../../services/unitofmeasure.service';
import { CurrencyService } from '../../../../services/currency.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../services/employee.service';
import { CustomerService } from '../../../../services/customer.service';
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
import { PurchaseOrderService } from '../../../../services/purchase-order.service';
import { AddressNew } from '../../../../models/address-new-model';
import { PercentService } from '../../../../services/percent.service';
import { VendorCapabilitiesService } from '../../../../services/vendorcapabilities.service';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-purchase-setup',
	templateUrl: './purchase-setup.component.html',
	styleUrls: ['./purchase-setup.component.scss'],
	providers: [DatePipe]
})
/** purchase-setup component*/
export class PurchaseSetupComponent implements OnInit {
	firstNamesbillTo1: any;
	firstNamesShipTo1: any[];
	vendorContactsForshipTo: any[] = [];
	vendorContactsForBillTO: any[] = [];
	firstNamesShipTo: any[] = [];
	firstNamesbillTo: any[] = [];
	billToContactData: any[] = [];
	shipToContactData: any = [];
	//vendorSelectedforSplit: any[];
	vendorSelectedForBillTo: any;
	shipToCusData: any[] = [];
	vendorSelected: any[] = [];
	billToCusData: any;
	allCustomers: any = [];
	customerNames: any[];
	childDataList: any[] = [];
	savedInfo: any;
	allCurrencyData: any[] = [];
	allUomdata: any[] = [];
	allconditioninfo: any[] = [];
	itemTypeId: number;
	partWithId: any;
	allPartDetails: any[] = [];
	billToAddress: any = {};
	shipToAddress: any = {};
	tempshipToAddress: any = {};
	tempbillToAddress: any = {};
	tempshipVia: any = {};
	allActions: any[] = [];
	selectedActionName: any;
	partListData: any[] = [];
	allPriorityInfo: any = [];
	sourcePoApproval: any = {};
	sourcePoApprovalObj: any = {};
	partList: any = {};
	maincompanylist: any[] = [];
	bulist: any[] = [];
	vendorNames: any[];
	allPriorityDetails: any[];
	vendorContactsHeader: any[];
	vendorPhoneNum: any[];
	departmentList: any[] = [];
	divisionlist: any[] = [];
	ifSplitShip: boolean = false;
	allManagemtninfo: any[] = [];
	allcreditTermInfo: any[] = [];
	disableSaveVenName: boolean;
	partCollection: any[];
	disableSaveVenderName: boolean;
	vendorId: any;
	loadingIndicator: boolean;
	vendorCodes: any[];
	isEditMode: boolean;
	allPartnumbersInfo: any = [];
	showInput: boolean = false;
	partNumbers: any;
	tempMemo: any;
	///checkAllPartsList: boolean;
	multiplePNDetails: boolean;
	addressMemoLabel: string;
	addressHeader: string;
	vendorCapesCols: any[];
	vendorCapesInfo: any[] = [];
	tempVendorId: number;
	needByTempDate: Date = new Date();
	conditionList: any[];
	functionalCurrList: any[];
	functionalTransList: any[];
	@ViewChild('createPOForm') createPOForm: NgForm;
	purchaseOrderId: any;
	purchaseOrderPartRecordId: any;
	addAllMultiPN: boolean = false;
	allGlInfo: GlAccount[];
	childObject: any = {};
	parentObject: any = {};
	childObjectArray: any[] = [];
	childObjectArrayEdit: any = [];
	parentObjectArray: any[] = [];
	tempParentData: any;
	requisitionerList: any[];
	approverList: any[];
	approversList: any[];
	newPNList: any = [];
	newPartsList: any = [];
	splitVendorNames: any[];
	parentManagementInfo: any[] = [];
	childManagementInfo: any[] = [];
	vendorContactList: any[];
	addressSiteNameHeader: string;
	addressSiteName: any = {};
	splitUserTypeAddress: any = {};
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
	poApproverListEdit: any = [];
	approverIds: any = [];
	multiplePNIdArray: any = [];
	tempNewPNArray: any = [];
	newObjectForParent = new CreatePOPartsList();
	newObjectForChild = new PartDetails();
	addressFormForShipping = new CustomerShippingModel()
	addressFormForBilling = new CustomerShippingModel()
	legalEntity: any;
	legalEntityList_ForShipping: Object;
	legalEntityList_ForBilling: Object;
	addShipViaFormForShipping = new CustomerInternationalShipVia()
	shipViaList: any = [];
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
	tempBillTOAddressId: any;
	shipToSelectedvalue: any;
	billToSelectedvalue: any;
	addNewAddress = new AddressNew();
	gridSelectedVendorId: any;
	gridSelectedCustomerId: any;
	legalEntityList_Forgrid: any;
	discountPercentList: any = [];
	allPercentData: any = [];
	splitcustomersList: any = [];
	splitAddressData: any = [];
	tempSplitAddressData: any = [];
	approveListEdit: any = [];
	poApproverId: number;
	vendorIdByParams: number;
	tempSplitPart: any;
	tempSplitAddress: any;
	isEditModeShipping: boolean = false;
	isEditModeBilling: boolean = false;
	isEditModeShipVia: boolean = false;
	isEditModeSplitAddress: boolean = false;
	addressFormForShippingCompany: any;
	parentIndex: number;
	childIndex: number;
	allCountriesList: any = [];
	countriesList: any = [];
	inputValidCheck: any;
	vendorContactInfo: any = {}
	venContactList: any = [];
	venContactFirstNames: any = [];
	venContactLastNames: any = [];
	venContactMiddleNames: any = [];
	workOrderPartNumberId: any = 0;
	managementValidCheck: boolean;
	shipToUserTypeValidCheck: boolean;
	shipToSiteNameValidCheck: boolean;
	shipViaValidCheck: boolean;
	billToUserTypeValidCheck: boolean;
	billToSiteNameValidCheck: boolean;
	vendorCapesGeneralInfo: any = {};
    aircraftListDataValues: any;
    colsaircraftLD: any[] = [
        { field: "aircraft", header: "Aircraft" },
        { field: "model", header: "Model" },
        { field: "dashNumber", header: "Dash Numbers" },
        { field: "memo", header: "Memo" }
    ];
	

	constructor(private route: Router,
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
		private purchaseOrderService: PurchaseOrderService,
		private percentService: PercentService,
		private vendorCapesService: VendorCapabilitiesService,
		private itemser: ItemMasterService,
		private datePipe: DatePipe) {

		this.vendorService.ShowPtab = false;
		this.vendorService.alertObj.next(this.vendorService.ShowPtab);
		this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-purchase-setup';
		this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);
	}

	ngOnInit() {
		this.priorityData();
		this.loadCreditTermsData();
		this.loadManagementdata();
		this.loadData();
		this.loadCurrencyData();
		this.loadConditionData();
		this.loadUOMData();
		this.employeedata();
		this.ptnumberlistdata();
		this.loadcustomerData();
		this.glAccountData();
		this.getLegalEntity();
		this.getCountriesList();
		this.loadPercentData();
		this.loadVendorContactInfo();
		this.sourcePoApproval.companyId = "null";
		this.sourcePoApproval.buId = 0;
		this.sourcePoApproval.divisionId = 0;
		this.sourcePoApproval.departmentId = 0;
		if (this.sourcePoApproval.purchaseOrderNumber == "" || this.sourcePoApproval.purchaseOrderNumber == undefined) {
			this.sourcePoApproval.purchaseOrderNumber = 'Creating';
		}

		this.vendorCapesCols = [
			//{ field: 'vcId', header: 'VCID' },
			{ field: 'vendorRanking', header: 'Ranking' },
			{ field: 'partNumber', header: 'PN' },
			{ field: 'partDescription', header: 'PN Description' },
			{ field: 'capabilityType', header: 'Capability Type' },
			{ field: 'cost', header: 'Cost' },
			{ field: 'tat', header: 'TAT' },
			{ field: 'manufacturerName', header: 'PN Mfg' },
		];

		this.sourcePoApproval.statusId = 1;
		this.sourcePoApproval.openDate = new Date();
		//this.sourcePoApproval.closedDate = new Date();
		//this.sourcePoApproval.dateRequested = new Date();
		this.sourcePoApproval.shipToUserTypeId = 3;
		this.sourcePoApproval.billToUserTypeId = 3;

		this.vendorIdByParams = this._actRoute.snapshot.params['vendorId'];
		this.loadvendorDataById(this.vendorIdByParams);

		this.poId = this._actRoute.snapshot.params['id'];
		this.workOrderPartNumberId = this._actRoute.snapshot.params['mpnid'];

		if (this.poId !== 0 && this.poId !== undefined) {
			this.isEditMode = true;
			this.getVendorPOById(this.poId);
			this.getApproversListById(this.poId);
			this.getPurchaseOrderPartsById(this.poId);
		} else if (this.poId === 0) {
			this.getPurchaseOrderPartsById(this.poId);
		}



		// console.log(this.roId);
		// if (this.roId !== 0 && this.roId !== undefined) {
		// 	this.isEditMode = true;
		// 	this.getVendorROById(this.roId);
		// 	this.getApproversListById(this.roId);
		// 	this.getRepairOrderPartsById(this.roId);
		// }
		// else if (this.roId === 0) {
		// 	this.getRepairOrderPartsById(this.roId);
		// }

		//grid childlist disable on load
		if (!this.isEditMode) {
			this.partListData = [this.newObjectForParent];
			for (let i = 0; i < this.partListData.length; i++) {
				if (!this.partListData[i].ifSplitShip) {
					this.partListData[i].childList = [];
				}
			}
		}
	}

	loadvendorDataById(vendorId) {
		this.vendorService.getWorkFlows().subscribe(res => {
			this.allActions = res[0];
			this.vendorContactList = [];
			this.getVendorContactsListByID(vendorId);
			this.getVendorCapesByID(vendorId);
			//this.sourcePoApproval.vendorName = value.vendorName;
			this.sourcePoApproval.vendorId = getObjectById('vendorId', vendorId, this.allActions);
			this.sourcePoApproval.vendorCode = getObjectById('vendorId', vendorId, this.allActions);
			this.sourcePoApproval.creditLimit = getValueFromArrayOfObjectById('creditLimit', 'vendorId', vendorId, this.allActions);
			this.sourcePoApproval.creditTermsId = getValueFromArrayOfObjectById('creditTermsId', 'vendorId', vendorId, this.allActions);
			if (this.sourcePoApproval.creditTermsId) {
				this.sourcePoApproval.creditTerms = getValueFromArrayOfObjectById('name', 'creditTermsId', this.sourcePoApproval.creditTermsId, this.allcreditTermInfo);
			}
		});
	}

	getManagementStructureDetails(id) {
		this.commonService.getManagementStructureDetails(id).subscribe(res => {
			if (res.Level1) {
				this.tempPOHeaderAddress.companyId = res.Level1;
				this.getBUList(res.Level1);
			} else
				this.tempPOHeaderAddress.companyId = 0;

			if (res.Level2) {
				this.tempPOHeaderAddress.buId = res.Level2;
				this.getDivisionlist(res.Level2);
			} else
				this.tempPOHeaderAddress.buId = 0;

			if (res.Level3) {
				this.tempPOHeaderAddress.divisionId = res.Level3;
				this.getDepartmentlist(res.Level3);
			} else
				this.tempPOHeaderAddress.divisionId = 0;

			if (res.Level4) {
				this.tempPOHeaderAddress.departmentId = res.Level4;
				this.getDepartmentId(res.Level4);
			} else
				this.tempPOHeaderAddress.departmentId = 0;

		})
	}

	getVendorPOById(poId) {
		this.vendorService.getWorkFlows().subscribe(
			response => {
				this.vendorList = response[0];

				this.purchaseOrderService.getVendorPOById(poId).subscribe(response => {
					const res = response.po;
					this.tempPOHeaderAddress = {
						purchaseOrderNumber: res.purchaseOrderNumber,
						openDate: new Date(res.openDate),
						closedDate: res.closedDate ? new Date(res.closedDate) : '',
						needByDate: new Date(res.needByDate),
						priorityId: getObjectById('value', res.priorityId, this.allPriorityInfo),
						deferredReceiver: res.deferredReceiver,
						vendorId: getObjectById('vendorId', res.vendorId, this.vendorList),
						vendorCode: getObjectById('vendorId', res.vendorId, this.vendorList),
						vendorContactId: this.getVendorContactsListByIDEdit(res),
						vendorContactPhone: this.getVendorContactsListByIDEdit(res),
						vendorName: getValueFromArrayOfObjectById('vendorName', 'vendorId', res.vendorId, this.vendorList),
						creditLimit: res.creditLimit,
						creditTerms: res.creditTermsId ? getValueFromArrayOfObjectById('name', 'creditTermsId', res.creditTermsId, this.allcreditTermInfo) : null,
						creditTermsId: res.creditTermsId,
						requisitionerId: getObjectById('value', res.requestedBy, this.allEmployeeList),
						approverId: getObjectById('value', res.approverId, this.allEmployeeList),
						approvedDate: res.dateApproved ? new Date(res.dateApproved) : '',
						statusId: res.statusId,
						resale: res.resale,
						companyId: this.getManagementStructureDetails(res.managementStructureId),
						// buId: 0,
						// divisionId: 0,
						// departmentId: 0,
						poMemo: res.notes,
						shipToUserTypeId: res.shipToUserType,
						//shipToUserId: res.shipToUserId,
						shipToSiteName: res.shipToSiteName,
						shipToAddress1: res.shipToAddress1,
						shipToAddress2: res.shipToAddress2,
						// shipToAddress3: res.shipToAddress3,
						shipToCity: res.shipToCity,
						shipToStateOrProvince: res.shipToStateOrProvince,
						shipToPostalCode: res.shipToPostalCode,
						shipToCountry: res.shipToCountry,
						//shipToContactId: getObjectById('contactId', res.shipToContactId, this.shipToContactData),
						shipToMemo: res.shipToMemo,
						shipViaId: res.shipViaId,
						shipVia: res.shipVia,
						shippingCost: res.shippingCost,
						handlingCost: res.handlingCost,
						//shippingAcctNum: res.shippingAcctNum,
						//shippingId: res.shippingId,
						//shippingURL: res.shippingURL,
						billToUserTypeId: res.billToUserType,
						//billToUserId: res.billToUserId,
						billToAddress1: res.billToAddress1,
						billToAddress2: res.billToAddress2,
						// billToAddress3: res.billToAddress3,
						billToCity: res.billToCity,
						billToStateOrProvince: res.billToState,
						billToPostalCode: res.billToPostalCode,
						billToCountry: res.billToCountry,
						billToAddressId: res.billToAddressId,
						billToContactId: res.billToContactId,
						billToMemo: res.billToMemo,
						shipToUserId: this.getShipToUserIdEdit(res),
						shipToAddressId: this.tempShipTOAddressId ? this.tempShipTOAddressId : 0,
						billToUserId: this.getBillToUserIdEdit(res),

					};
					this.getVendorCapesByID(res.vendorId);
					// this.shipToAddress.shipToAddress1 = this.tempPOHeaderAddress.shipToAddress1;
					// this.shipToAddress.shipToAddress2 = this.tempPOHeaderAddress.shipToAddress2;
					// this.shipToAddress.shipToAddress3 = this.tempPOHeaderAddress.shipToAddress3;
					// this.shipToAddress.city = this.tempPOHeaderAddress.shipToCity;
					// this.shipToAddress.stateOrProvince = this.tempPOHeaderAddress.shipToState;
					// this.shipToAddress.shipToAddress3 = this.tempPOHeaderAddress.shipToPostalCode;
					// this.shipToAddress.shipToAddress3 = this.tempPOHeaderAddress.shipToCountry;
					// console.log(this.tempPOHeaderAddress);
					// console.log(this.shipToAddress);					
					this.sourcePoApproval = this.tempPOHeaderAddress;
				})
			}
		);
	}

	getPurchaseOrderPartsById(poId) {
		this.vendorService.getWorkFlows().subscribe(
			response => {
				this.vendorList = response[0];

				this.purchaseOrderService.getPurchaseOrderPartsById(poId, this.workOrderPartNumberId).subscribe(res => {
					console.log(res);
					this.newPartsList = [this.newObjectForParent];
					//this.partListData = res;
					res.map((x, pindex) => {
						this.newPartsList = {
							...x,
							partNumberId: getObjectById('value', x.itemMasterId, this.allPartnumbersInfo),
							ifSplitShip: x.purchaseOrderSplitParts.length > 0 ? true : false,
							partNumber: x.partNumber,
							partDescription: x.partDescription,
							needByDate: x.needByDate ? new Date(x.needByDate) : '',
							conditionId: getObjectById('conditionId', x.conditionId, this.allconditioninfo),
							discountPercent: getObjectById('percentId', x.discountPercent, this.allPercentData),
							discountPerUnit: x.discountPerUnit,
							functionalCurrencyId: getObjectById('currencyId', x.functionalCurrencyId, this.allCurrencyData),
							reportCurrencyId: getObjectById('currencyId', x.reportCurrencyId, this.allCurrencyData),
							discountAmount: x.discountAmount,
							//parentCompanyId: this.getManagementStructureForParentEdit(x),
							childList: this.getPurchaseOrderSplitPartsEdit(x, pindex),

						}
						this.getManagementStructureForParentEdit(this.newPartsList);
						console.log(this.newPartsList);
						this.getPNDetailsById(this.newPartsList);
						if (!this.newPartsList.childList) {
							this.newPartsList.childList = [];
						}
						this.partListData.push(this.newPartsList);
					})
					console.log(this.partListData);
				})
			});
	}

	getPurchaseOrderSplitPartsEdit(partList, pindex) {
		if (partList.purchaseOrderSplitParts) {
			return partList.purchaseOrderSplitParts.map((y, cindex) => {
				const splitpart = {
					...y,
					needByDate: y.needByDate ? new Date(y.needByDate) : '',
					partListUserTypeId: y.poPartSplitUserTypeId,
					partListUserId: this.getPartSplitUserIdEdit(y, pindex, cindex),
					partListAddressId: y.poPartSplitAddressId ? y.poPartSplitAddressId : 0,
					//childCompanyId: this.getManagementStructureForChildEdit(y),
				}
				this.getManagementStructureForChildEdit(splitpart);
				return splitpart;
			})
		}
	}

	getManagementStructureForParentEdit(partList) {
		const msId = partList.managementStructureId ? partList.managementStructureId : this.sourcePoApproval.managementStructureId;
		this.commonService.getManagementStructureDetails(msId).subscribe(msparent => {
			if (msparent.Level1) {
				partList.parentCompanyId = msparent.Level1;
				this.getParentBUList(partList);
			} else
				partList.parentCompanyId = 0;

			if (msparent.Level2) {
				partList.parentbuId = msparent.Level2;
				this.getParentDivisionlist(partList);
			} else
				partList.parentbuId = 0;

			if (msparent.Level3) {
				partList.parentDivisionId = msparent.Level3;
				this.getParentDeptlist(partList);
			} else
				partList.parentDivisionId = 0;

			if (msparent.Level4) {
				partList.parentDeptId = msparent.Level4;
				this.getParentDeptId(partList);
			} else
				partList.parentDeptId = 0;

		})
	}

	getManagementStructureForChildEdit(partChildList) {
		this.commonService.getManagementStructureDetails(partChildList.managementStructureId).subscribe(mschild => {
			if (mschild.Level1) {
				partChildList.childCompanyId = mschild.Level1;
				this.getChildBUList(partChildList);
			} else
				partChildList.childCompanyId = 0;

			if (mschild.Level2) {
				partChildList.childbuId = mschild.Level2;
				this.getChildDivisionlist(partChildList);
			} else
				partChildList.childbuId = 0;

			if (mschild.Level3) {
				partChildList.childDivisionId = mschild.Level3;
				this.getChildDeptlist(partChildList);
			} else
				partChildList.childDivisionId = 0;

			if (mschild.Level4) {
				partChildList.childDeptId = mschild.Level4;
				this.getChildDeptId(partChildList);
			} else
				partChildList.childDeptId = 0;

		})
	}

	getApproversListById(poId) {
		this.purchaseOrderService.getPOApproverList(poId).subscribe(response => {
			console.log(response);
			this.approveListEdit = response.map(x => {
				return {
					...x,
					label: x.employeeName,
					value: x.employeeId,
				}
			});
			if (this.approveListEdit) {
				for (let i = 0; i < this.approveListEdit.length; i++) {
					this.poApproverId = this.approveListEdit[i].poApproverId;
					if (this.approveListEdit[i].level == 1) {
						this.approversData.approver1 = this.approveListEdit[i];
						this.onSelectApprover('approver1', this.approversData.approver1)
					} else if (this.approveListEdit[i].level == 2) {
						this.approversData.approver2 = this.approveListEdit[i];
						this.onSelectApprover('approver2', this.approversData.approver2)
					} else if (this.approveListEdit[i].level == 3) {
						this.approversData.approver3 = this.approveListEdit[i];
						this.onSelectApprover('approver3', this.approversData.approver3)
					} else if (this.approveListEdit[i].level == 4) {
						this.approversData.approver4 = this.approveListEdit[i];
						this.onSelectApprover('approver4', this.approversData.approver4)
					} else if (this.approveListEdit[i].level == 5) {
						this.approversData.approver5 = this.approveListEdit[i];
						this.onSelectApprover('approver5', this.approversData.approver5)
					}
				}
			}
		})
	}

	getShipToUserIdEdit(data) {
		if (data.shipToUserType === 1) {
			this.tempShipTOAddressId = data.shipToAddressId;
			this.onShipToCustomerSelected(data.shipToUserId, data);
			this.getShipViaEdit(data);
			return getObjectById('value', data.shipToUserId, this.allCustomers);
		}
		if (data.shipToUserType === 2) {
			this.tempShipTOAddressId = data.shipToAddressId;
			this.onShipToVendorSelected(data.shipToUserId, data);
			this.getShipViaEdit(data);
			return getObjectById('vendorId', data.shipToUserId, this.vendorList);
		}
		if (data.shipToUserType === 3) {
			this.tempShipTOAddressId = data.shipToAddressId;
			/*bind adress and contact and shipvia values in edit*/
			this.shipToSelectedvalue = data.shipToUserId;
			this.companyService.getShippingCompanySiteNames(this.shipToSelectedvalue).subscribe(response => {
				this.companySiteList_Shipping = response;
				if (this.isEditMode) {
					if (data.shipToAddressId == 0) {
						this.companySiteList_Shipping.push({ legalEntityShippingAddressId: 0, siteName: data.shipToSiteName });

						this.shipToAddress.address1 = data.shipToAddress1;
						this.shipToAddress.address2 = data.shipToAddress2;
						// this.shipToAddress.address3 = data.shipToAddress3;
						this.shipToAddress.city = data.shipToCity;
						this.shipToAddress.stateOrProvince = data.shipToState;
						this.shipToAddress.postalCode = data.shipToPostalCode;
						this.shipToAddress.country = data.shipToCountry;
					} else {
						this.onShipToGetCompanyAddress(this.companySiteList_Shipping[0].legalEntityShippingAddressId);
					}
				}
			})
			this.companyService.getCompanyContacts(this.shipToSelectedvalue).subscribe(response => {
				this.contactListForCompanyShipping = response;
				this.tempPOHeaderAddress.shipToContactId = getObjectById('contactId', data.shipToContactId, this.contactListForCompanyShipping);
			})
			this.getShipViaEdit(data);
			/* ./bind adress and contact values in edit*/
			//this.onShipCompanySelected(data);
			return getObjectById('value', data.shipToUserId, this.legalEntity);
		}
	}

	getShipViaEdit(data) {
		this.commonService.getShipViaDetailsByModule(data.shipToUserType, this.shipToSelectedvalue).subscribe(response => {
			this.shipViaList = response;
			data.shippingAcctNum = data.shippingAccountNo;
			this.sourcePoApproval.shipViaId = data.shipViaId;
			if (data.shipViaId == 0) {
				this.shipViaList.push({ shippingViaId: 0, name: data.shipVia, shippingAccountInfo: data.shippingAcctNum, shippingId: data.shippingId, shippingURL: data.shippingURL });
				this.sourcePoApproval.shippingAcctNum = data.shippingAcctNum;
				this.sourcePoApproval.shippingId = data.shippingId;
				this.sourcePoApproval.shippingURL = data.shippingURL;
			} else {
				this.getShipViaDetails(data.shipViaId);
			}
		})
	}

	getBillToUserIdEdit(data) {
		if (data.billToUserType === 1) {
			this.tempBillTOAddressId = data.billToAddressId;
			this.onBillToCustomerSelected(data.billToUserId, data);
			return getObjectById('value', data.billToUserId, this.allCustomers);
		}
		if (data.billToUserType === 2) {
			this.tempBillTOAddressId = data.billToAddressId;
			this.onBillToVendorSelected(data.billToUserId, data);
			return getObjectById('vendorId', data.billToUserId, this.vendorList);
		}
		if (data.billToUserType === 3) {
			this.tempBillTOAddressId = data.billToAddressId;
			/*bind adress and contact values in edit*/
			this.billToSelectedvalue = data.billToUserId;
			this.companyService.getBillingCompanySiteNames(this.billToSelectedvalue).subscribe(response => {
				this.companySiteList_Billing = response;
				if (this.isEditMode) {
					if (data.billToAddressId == 0) {
						this.companySiteList_Billing.push({ legalEntityBillingAddressId: 0, siteName: data.billToSiteName });

						this.billToAddress.address1 = data.billToAddress1;
						this.billToAddress.address2 = data.billToAddress2;
						// this.billToAddress.address3 = data.billToAddress3;
						this.billToAddress.city = data.billToCity;
						this.billToAddress.stateOrProvince = data.billToState;
						this.billToAddress.postalCode = data.billToPostalCode;
						this.billToAddress.country = data.billToCountry;
					} else {
						this.onBillToGetCompanyAddress(this.companySiteList_Billing[0].legalEntityBillingAddressId);
					}
				}
			})
			this.companyService.getCompanyContacts(this.billToSelectedvalue).subscribe(response => {
				this.contactListForCompanyBilling = response;
				this.tempPOHeaderAddress.billToContactId = getObjectById('contactId', data.billToContactId, this.contactListForCompanyBilling);
			})
			/* ./bind adress and contact values in edit*/
			return getObjectById('value', data.billToUserId, this.legalEntity);
		}
	}

	getPartSplitUserIdEdit(data, pindex, cindex) {
		if (data.poPartSplitUserTypeId === 1) {
			//this.tempBillTOAddressId = data.billToAddressId;
			//this.onBillToCustomerSelected(data.billToUserId, data);
			// this.customerService.getWorkFlows().subscribe(res => {
			// 	this.allCustomers = res[0];

			// });
			this.onCustomerNameChange(data.poPartSplitUserId, data, pindex, cindex);
			return getObjectById('value', data.poPartSplitUserId, this.allCustomers);
		}
		if (data.poPartSplitUserTypeId === 2) {
			this.onVendorNameChange(data.poPartSplitUserId, data, pindex, cindex);
			return getObjectById('vendorId', data.poPartSplitUserId, this.vendorList);
		}
		if (data.poPartSplitUserTypeId === 3) {
			this.onCompanyNameChange(data.poPartSplitUserId, data, pindex, cindex);
			return getObjectById('value', data.poPartSplitUserId, this.legalEntity);
		}
	}

	getLegalEntity() {
		this.commonService.smartDropDownList('LegalEntity', 'LegalEntityId', 'Name').subscribe(res => {
			this.legalEntity = res;
		})
	}

	getCountriesList() {
		this.commonService.smartDropDownList('Countries', 'countries_id', 'nice_name').subscribe(res => {
			this.allCountriesList = res;
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

	private loadVendorContactInfo() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.vendorService.getContactsFirstName().subscribe(results => {
			this.venContactList = results[0];
		});
	}

	private priorityData() {
		this.commonService.smartDropDownList('Priority', 'PriorityId', 'Description').subscribe(res => {
			this.allPriorityInfo = res;
		})
		// this.priority.getPriorityList().subscribe(
		// 	results => this.onprioritySuccessful(results[0]),
		// 	error => this.onDataLoadFailed(error)
		// );
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
	}

	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}

	//savePurchaseOrder() {
	//	console.log(this.sourcePoApproval);
	
	//	for (let i = 0; i < this.partListData.length; i++) {
			
	//		if ( this.partListData[i].partNumberId == undefined || this.partListData[i].partNumberId == "null" ) {
	//			this.alertService.showMessage('PN ', "Please enter required PN field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
	//		}
	//		if (this.partListData[i].needByDate == undefined || this.partListData[i].needByDate == "null") {
	//			this.alertService.showMessage('needByDate ', "Please enter required needByDate field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
	//		}


	//		if (this.partListData[i].conditionId == undefined || this.partListData[i].conditionId == "null") {
	//			this.alertService.showMessage('condition ', "Please enter required condition field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
	//		}
	//		if (this.partListData[i].quantityOrdered == undefined || this.partListData[i].quantityOrdered == "null") {
	//			this.alertService.showMessage('quantity Ordered ', "Please enter required quantity Ordered field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
	//		}

	//		if (this.partListData[i].functionalCurrencyId == undefined || this.partListData[i].functionalCurrencyId == "null") {
	//			this.alertService.showMessage('functionalCurrency ', "Please enter required functionalCurrency field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
 //           }
	//		if (this.partListData[i].foreignExchangeRate == undefined || this.partListData[i].foreignExchangeRate == "null") {
	//			this.alertService.showMessage('foreignExchangeRate  ', "Please enter required foreignExchangeRate field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
	//		}

	//		if (this.partListData[i].reportCurrencyId == undefined || this.partListData[i].reportCurrencyId == "null") {
	//			this.alertService.showMessage('reportCurrency ', "Please enter required reportCurrency field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
 //           }

	//		if (this.partListData[i].unitCost == undefined || this.partListData[i].unitCost == "null") {
	//			this.alertService.showMessage('unitCost ', "Please enter required unitCost field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
 //           }
	//		if (this.partListData[i].discountPercent == undefined || this.partListData[i].discountPercent == "null") {
	//			this.alertService.showMessage('discount Percent  ', "Please enter required discountPercent field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
 //           }
 //            	}
        

	//	if (this.createPOForm.invalid)
	//		//|| this.sourcePoApproval.companyId == "null" || this.sourcePoApproval.shipToUserTypeId == "null" || this.sourcePoApproval.shipToAddressId == "null" || this.sourcePoApproval.shipViaId == "null" || this.sourcePoApproval.billToUserTypeId == "null" || this.sourcePoApproval.billToAddressId == "null")
 //       {
	//		// alert('Please enter required fields!');
	//		//this.alertService.showMessage('Purchase Order', "Please enter required highlighted fields!", MessageSeverity.error);
	//		//this.inputValidCheck = true;

	//		if (this.sourcePoApproval.openDate == "null" || this.sourcePoApproval.openDate == undefined) {
	//			this.alertService.showMessage('openDate ', "Please enter required openDate field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
	//		}
	//		if (this.sourcePoApproval.needByDate == "null" || this.sourcePoApproval.needByDate == undefined) {
	//			this.alertService.showMessage('needByDate ', "Please enter required needByDate field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
	//		} 
	//		if (this.sourcePoApproval.priorityId == "null" || this.sourcePoApproval.priorityId == undefined) {
	//			this.alertService.showMessage('priority ', "Please enter required priority field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
	//		}
	//		if (this.sourcePoApproval.vendorId == "null" || this.sourcePoApproval.vendorId == undefined) {
	//			this.alertService.showMessage('vendor Name ', "Please enter required vendor Name field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
	//		}
	//		if (this.sourcePoApproval.vendorCode == "null" || this.sourcePoApproval.vendorCode == undefined) {
	//			this.alertService.showMessage('vendorCode ', "Please enter required vendorCode field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
	//		} 

	//		if (this.sourcePoApproval.vendorContactId == "null" || this.sourcePoApproval.vendorContactId == undefined) {
	//			this.alertService.showMessage('vendor Contact ', "Please enter required vendorContact field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
	//		}
	//		if (this.sourcePoApproval.requisitionerId == "null" || this.sourcePoApproval.requisitionerId == undefined) {
	//			this.alertService.showMessage('requisitioner ', "Please enter required requisitioner field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
	//		}
	//		if (this.sourcePoApproval.statusId == "null" || this.sourcePoApproval.statusId == undefined) {
	//			this.alertService.showMessage('status ', "Please enter required status field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
	//		}

	//		//if (this.childDataList.partNNumberId == "null" || this.childDataList.partNNumberId == undefined) {
 //  //             this.alertService.showMessage('status ', "Please enter required status field!", MessageSeverity.error);
 //  //             this.managementValidCheck = true;
 //  //         }

			
	//		if (this.sourcePoApproval.shipToUserTypeId == 1 && this.sourcePoApproval.shipToContactId == "null" || this.sourcePoApproval.shipToContactId == undefined) {
	//			this.alertService.showMessage('ship Contact Name ', "Please enter required ship Contact Name  field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
	//		}

	//		if (this.sourcePoApproval.shipToUserTypeId == 2 && this.sourcePoApproval.shipToContactId == "null" || this.sourcePoApproval.shipToContactId == undefined) {
 //               this.alertService.showMessage('Bill Contact Name ', "Please enter required Bill Contact Name  field!", MessageSeverity.error);
 //               this.managementValidCheck = true;
 //           }

	//		if (this.sourcePoApproval.companyId == "null" || this.sourcePoApproval.companyId == undefined) {
	//			this.alertService.showMessage('Legal Entity ', "Please enter required Legal Entity field!", MessageSeverity.error);
	//			this.managementValidCheck = true;
	//		}
	//		if (this.sourcePoApproval.shipToUserTypeId == "null" || this.sourcePoApproval.shipToUserTypeId == undefined) {
	//			this.alertService.showMessage('shipToUserType ', "Please enter required shipToUserType field!", MessageSeverity.error);
	//			this.shipToUserTypeValidCheck = true;
	//		}
	//		if (this.sourcePoApproval.shipToAddressId == "null" || this.sourcePoApproval.shipToAddressId == undefined) {
	//			this.alertService.showMessage('shipToAddress ', "Please enter required shipToAddress field!", MessageSeverity.error);
	//			this.shipToSiteNameValidCheck = true;
	//		}
	//		if (this.sourcePoApproval.shipViaId == "null" || this.sourcePoApproval.shipViaId == undefined) {
	//			this.alertService.showMessage('shipVia ', "Please enter required shipVia field!", MessageSeverity.error);
	//			this.shipViaValidCheck = true;
	//		}
	//		if (this.sourcePoApproval.billToUserTypeId == "null" || this.sourcePoApproval.billToUserTypeId == undefined) {
	//			this.alertService.showMessage('billToUserType ', "Please enter required billToUserType field!", MessageSeverity.error);
	//			this.billToUserTypeValidCheck = true;
	//		}
	//		if (this.sourcePoApproval.billToAddressId == "null" || this.sourcePoApproval.billToAddressId == undefined) {
	//			this.alertService.showMessage('billToAddress ', "Please enter required billToAddress field!", MessageSeverity.error);
	//			this.billToSiteNameValidCheck = true;
	//		}
	//	}
	//	else {
	//		this.sourcePoApprovalObj = {
	//			purchaseOrderNumber: this.sourcePoApproval.purchaseOrderNumber,
	//			openDate: this.datePipe.transform(this.sourcePoApproval.openDate, "MM/dd/yyyy"),//new Date(this.sourcePoApproval.openDate),
	//			closedDate: this.datePipe.transform(this.sourcePoApproval.closedDate, "MM/dd/yyyy"),
	//			needByDate: this.datePipe.transform(this.sourcePoApproval.needByDate, "MM/dd/yyyy"),
	//			priorityId: this.sourcePoApproval.priorityId ? this.getPriorityId(this.sourcePoApproval.priorityId) : 0,
	//			deferredReceiver: this.sourcePoApproval.deferredReceiver ? this.sourcePoApproval.deferredReceiver : false,
	//			vendorId: this.sourcePoApproval.vendorId ? this.getVendorId(this.sourcePoApproval.vendorId) : 0,
	//			//vendorId: 671,
	//			vendorContactId: this.sourcePoApproval.vendorContactId ? this.getVendorContactId(this.sourcePoApproval.vendorContactId) : 0,
	//			//vendorContactId: 200,
	//			vendorContactPhone: this.sourcePoApproval.vendorContactPhone ? this.getVendorContactPhone(this.sourcePoApproval.vendorContactPhone) : '',
	//			creditLimit: this.sourcePoApproval.creditLimit ? this.sourcePoApproval.creditLimit : '',
	//			creditTermsId: this.sourcePoApproval.creditTermsId ? this.sourcePoApproval.creditTermsId : 0,
	//			requisitionerId: this.sourcePoApproval.requisitionerId ? this.getEmployeeId(this.sourcePoApproval.requisitionerId) : 0,
	//			approverId: this.sourcePoApproval.approverId ? this.getEmployeeId(this.sourcePoApproval.approverId) : 0,
	//			approvedDate: this.datePipe.transform(this.sourcePoApproval.approvedDate, "MM/dd/yyyy"),
	//			statusId: this.sourcePoApproval.statusId ? this.sourcePoApproval.statusId : 0,
	//			resale: this.sourcePoApproval.resale ? this.sourcePoApproval.resale : false,
	//			managementStructureId: this.sourcePoApproval.managementStructureId ? this.sourcePoApproval.managementStructureId : 0,
	//			poMemo: this.sourcePoApproval.poMemo ? this.sourcePoApproval.poMemo : '',
	//			shipToUserTypeId: this.sourcePoApproval.shipToUserTypeId ? parseInt(this.sourcePoApproval.shipToUserTypeId) : 0,
	//			shipToUserId: this.sourcePoApproval.shipToUserId ? this.getShipToBillToUserId(this.sourcePoApproval.shipToUserId) : 0,
	//			shipToAddressId: this.sourcePoApproval.shipToAddressId ? this.sourcePoApproval.shipToAddressId : 0,
	//			//shipToContactId: this.sourcePoApproval.shipToContactId ? this.getShipBillContactId(this.sourcePoApproval.shipToContactId) : 0,
	//			shipToContactId: this.sourcePoApproval.shipToContactId ? editValueAssignByCondition('contactId', this.sourcePoApproval.shipToContactId) : 0,
	//			shipViaId: this.sourcePoApproval.shipViaId,
	//			shippingCost: this.sourcePoApproval.shippingCost,
	//			handlingCost: this.sourcePoApproval.handlingCost,
	//			shipVia: this.sourcePoApproval.shipVia,
	//			shippingAcctNum: this.sourcePoApproval.shippingAcctNum,
	//			shippingURL: this.sourcePoApproval.shippingURL,
	//			shippingId: this.sourcePoApproval.shippingId,
	//			shipToMemo: this.sourcePoApproval.shipToMemo ? this.sourcePoApproval.shipToMemo : '',
	//			billToUserTypeId: this.sourcePoApproval.billToUserTypeId ? parseInt(this.sourcePoApproval.billToUserTypeId) : 0,
	//			billToUserId: this.sourcePoApproval.billToUserId ? this.getShipToBillToUserId(this.sourcePoApproval.billToUserId) : 0,
	//			billToAddressId: this.sourcePoApproval.billToAddressId ? this.sourcePoApproval.billToAddressId : 0,
	//			//billToContactId: this.sourcePoApproval.billToContactId ? this.getShipBillContactId(this.sourcePoApproval.billToContactId) : 0,
	//			billToContactId: this.sourcePoApproval.billToContactId ? editValueAssignByCondition('contactId', this.sourcePoApproval.billToContactId) : 0,
	//			billToMemo: this.sourcePoApproval.billToMemo ? this.sourcePoApproval.billToMemo : '',
	//			shipToSiteName: this.postSiteNameForShipping(this.sourcePoApproval.shipToUserTypeId, this.sourcePoApproval.shipToAddressId),
	//			shipToAddress1: this.shipToAddress.address1,
	//			shipToAddress2: this.shipToAddress.address2,
	//			// shipToAddress3: this.shipToAddress.address3,
	//			shipToCity: this.shipToAddress.city,
	//			shipToStateOrProvince: this.shipToAddress.stateOrProvince,
	//			shipToPostalCode: this.shipToAddress.postalCode,
	//			shipToCountry: this.shipToAddress.country,
	//			billToSiteName: this.postSiteNameForBilling(this.sourcePoApproval.billToUserTypeId, this.sourcePoApproval.billToAddressId),
	//			billToAddress1: this.billToAddress.address1,
	//			billToAddress2: this.billToAddress.address2,
	//			// billToAddress3: this.billToAddress.address3,
	//			billToCity: this.billToAddress.city,
	//			billToStateOrProvince: this.billToAddress.stateOrProvince,
	//			billToPostalCode: this.billToAddress.postalCode,
	//			billToCountry: this.billToAddress.country,
	//			shipToSiteId: this.sourcePoApproval.shipToAddressId ? this.sourcePoApproval.shipToAddressId : 0,
	//			billToSiteId: this.sourcePoApproval.billToAddressId ? this.sourcePoApproval.billToAddressId : 0,
	//			createdBy: this.userName,
	//			updatedBy: this.userName
	//		}
	//		console.log(this.sourcePoApprovalObj);

	//		// header save 
	//		if (!this.isEditMode) {
	//			this.vendorService.savePurchaseorder({ ...this.sourcePoApprovalObj }).subscribe(saveddata => {
	//				this.route.navigate(['/vendorsmodule/vendorpages/app-polist'])
	//				this.purchaseOrderId = saveddata.purchaseOrderId;
	//				this.savedInfo = saveddata;
	//				console.log(saveddata);
	//				this.tempVendorId = null;
	//				this.savePurchaseorderPart(saveddata.purchaseOrderId);
	//				this.savePOApproverData(saveddata.purchaseOrderId);
	//			});
	//		} else {
	//			const poHeaderEdit = { ...this.sourcePoApprovalObj, purchaseOrderId: parseInt(this.poId) };
	//			this.vendorService.savePurchaseorder({ ...poHeaderEdit }).subscribe(saveddata => {
	//				this.route.navigate(['/vendorsmodule/vendorpages/app-polist'])
	//				this.purchaseOrderId = saveddata.purchaseOrderId;
	//				this.savedInfo = saveddata;
	//				console.log(saveddata);
	//				this.tempVendorId = null;
	//				this.savePurchaseorderPart(saveddata.purchaseOrderId);
	//				//this.savePOApproverData(saveddata.purchaseOrderId);
	//			});
	//		}
	//	}
	//}


	savePurchaseOrder() {
		console.log(this.sourcePoApproval);

		for (let i = 0; i < this.partListData.length; i++) {

			var str = "";

			if (this.partListData[i].partNumberId == undefined || this.partListData[i].partNumberId == "null") {
				str += "    Please enter required PN field!";
				//  this.validate(pn);
				//this.alertService.showMessage('PN ', "Please enter required PN field!", MessageSeverity.error);
				// this.managementValidCheck = true;
			}
			if (this.partListData[i].needByDate == undefined || this.partListData[i].needByDate == "null") {
				str += "    Please enter required needByDate field Grid!";
				//this.validate(needByDate);
				//this.alertService.showMessage('needByDate ', "Please enter required needByDate field!", MessageSeverity.error);
				// this.managementValidCheck = true;
			}


			if (this.partListData[i].conditionId == undefined || this.partListData[i].conditionId == "null") {
				str += "    Please enter required condition field!";
				//this.alertService.showMessage('condition ', "Please enter required condition field!", MessageSeverity.error);
				//this.managementValidCheck = true;
			}
			if (this.partListData[i].quantityOrdered == undefined || this.partListData[i].quantityOrdered == "null") {
				str += "    Please enter required quantityOrdered field!";
				//this.alertService.showMessage('quantity Ordered ', "Please enter required quantity Ordered field!", MessageSeverity.error);
				// this.managementValidCheck = true;
			}

			if (this.partListData[i].functionalCurrencyId == undefined || this.partListData[i].functionalCurrencyId == "null") {
				str += "    Please enter required functionalCurrency field!";
				//	this.alertService.showMessage('functionalCurrency ', "Please enter required functionalCurrency field!", MessageSeverity.error);
				//  this.managementValidCheck = true;
			}
			if (this.partListData[i].foreignExchangeRate == undefined || this.partListData[i].foreignExchangeRate == "null") {
				str += "    Please enter required foreignExchangeRate field!";
				//this.alertService.showMessage('foreignExchangeRate  ', "Please enter required foreignExchangeRate field!", MessageSeverity.error);
				// this.managementValidCheck = true;
			}

			if (this.partListData[i].reportCurrencyId == undefined || this.partListData[i].reportCurrencyId == "null") {
				str += "    Please enter required reportCurrency field!";
				//this.alertService.showMessage('reportCurrency ', "Please enter required reportCurrency field!", MessageSeverity.error);
				// this.managementValidCheck = true;
			}

			if (this.partListData[i].unitCost == undefined || this.partListData[i].unitCost == "null") {
				str += "    Please enter required unitCost field!";
				//this.alertService.showMessage('unitCost ', "Please enter required unitCost field!", MessageSeverity.error);
				// this.managementValidCheck = true;
			}
			if (this.partListData[i].discountPercent == undefined || this.partListData[i].discountPercent == "null") {
				str += "    Please enter required discountPercent field!";
				//this.alertService.showMessage('discount Percent  ', "Please enter required discountPercent field!", MessageSeverity.error);
				//  this.managementValidCheck = true;
			}
		}



		if (this.createPOForm.invalid)
		//|| this.sourcePoApproval.companyId == "null" || this.sourcePoApproval.shipToUserTypeId == "null" || this.sourcePoApproval.shipToAddressId == "null" || this.sourcePoApproval.shipViaId == "null" || this.sourcePoApproval.billToUserTypeId == "null" || this.sourcePoApproval.billToAddressId == "null")
		{
			// alert('Please enter required fields!');
			//this.alertService.showMessage('Purchase Order', "Please enter required highlighted fields!", MessageSeverity.error);
			//this.inputValidCheck = true;

			if (this.sourcePoApproval.openDate == "null" || this.sourcePoApproval.openDate == undefined) {
				str += "    Please enter required openDate field!";
				//this.alertService.showMessage('openDate ', "Please enter required openDate field!", MessageSeverity.error);
				// this.managementValidCheck = true;
			}
			if (this.sourcePoApproval.needByDate == "null" || this.sourcePoApproval.needByDate == undefined) {
				str += "    Please enter required needByDate field!";
				//this.alertService.showMessage('needByDate ', "Please enter required needByDate field!", MessageSeverity.error);
				// this.managementValidCheck = true;
			}
			if (this.sourcePoApproval.priorityId == "null" || this.sourcePoApproval.priorityId == undefined) {
				str += "    Please enter required priority field!";
				//this.alertService.showMessage('priority ', "Please enter required priority field!", MessageSeverity.error);
				// this.managementValidCheck = true;
			}
			if (this.sourcePoApproval.vendorId == "null" || this.sourcePoApproval.vendorId == undefined) {
				str += "    Please enter required vendor Name field!";
				//this.alertService.showMessage('vendor Name ', "Please enter required vendor Name field!", MessageSeverity.error);
				// this.managementValidCheck = true;
			}
			if (this.sourcePoApproval.vendorCode == "null" || this.sourcePoApproval.vendorCode == undefined) {
				str += "    Please enter required vendorCode field!";
				//this.alertService.showMessage('vendorCode ', "Please enter required vendorCode field!", MessageSeverity.error);
				//  this.managementValidCheck = true;
			}

			if (this.sourcePoApproval.vendorContactId == "null" || this.sourcePoApproval.vendorContactId == undefined) {
				str += "    Please enter required vendorContact field!";
				//this.alertService.showMessage('vendor Contact ', "Please enter required vendorContact field!", MessageSeverity.error);
				// this.managementValidCheck = true;
			}
			if (this.sourcePoApproval.requisitionerId == "null" || this.sourcePoApproval.requisitionerId == undefined) {
				str += "    Please enter required requisitioner field!";
				//	this.alertService.showMessage('requisitioner ', "Please enter required requisitioner field!", MessageSeverity.error);
				//   this.managementValidCheck = true;
			}
			if (this.sourcePoApproval.statusId == "null" || this.sourcePoApproval.statusId == undefined) {
				str += "    Please enter required status field!";
				//this.alertService.showMessage('status ', "Please enter required status field!", MessageSeverity.error);
				// this.managementValidCheck = true;
			}



			if (this.sourcePoApproval.shipToUserTypeId == 1 && this.sourcePoApproval.shipToContactId == "null" || this.sourcePoApproval.shipToContactId == undefined) {
				str += "    Please enter required ship Contact Name field!";
				//  this.alertService.showMessage('ship Contact Name ', "Please enter required ship Contact Name  field!", MessageSeverity.error);
				// this.managementValidCheck = true;
			}

			if (this.sourcePoApproval.shipToUserTypeId == 2 && this.sourcePoApproval.shipToContactId == "null" || this.sourcePoApproval.shipToContactId == undefined) {
				str += "    Please enter required Bill Contact Name field!";
				//  this.alertService.showMessage('Bill Contact Name ', "Please enter required Bill Contact Name  field!", MessageSeverity.error);
				//  this.managementValidCheck = true;
			}

			if (this.sourcePoApproval.companyId == "null" || this.sourcePoApproval.companyId == undefined) {
				str += "    Please enter required Legal Entity field!";
				//  this.alertService.showMessage('Legal Entity ', "Please enter required Legal Entity field!", MessageSeverity.error);
				//this.managementValidCheck = true;
			}
			if (this.sourcePoApproval.shipToUserTypeId == "null" || this.sourcePoApproval.shipToUserTypeId == undefined) {
				str += "    Please enter required shipToUserType field!";
				//  this.alertService.showMessage('shipToUserType ', "Please enter required shipToUserType field!", MessageSeverity.error);
				//this.shipToUserTypeValidCheck = true;
			}
			if (this.sourcePoApproval.shipToAddressId == "null" || this.sourcePoApproval.shipToAddressId == undefined) {

				str += "    Please enter required shipToAddress field!";
				//   this.alertService.showMessage('shipToAddress ', "Please enter required shipToAddress field!", MessageSeverity.error);
				//	this.shipToSiteNameValidCheck = true;
			}
			if (this.sourcePoApproval.shipViaId == "null" || this.sourcePoApproval.shipViaId == undefined) {
				str += "    Please enter required shipVia field!";
				//  this.alertService.showMessage('shipVia ', "Please enter required shipVia field!", MessageSeverity.error);
				//this.shipViaValidCheck = true;
			}
			if (this.sourcePoApproval.billToUserTypeId == "null" || this.sourcePoApproval.billToUserTypeId == undefined) {
				str += "    Please enter required billToUserType field!";
				// this.alertService.showMessage('billToUserType ', "Please enter required billToUserType field!", MessageSeverity.error);
				//this.billToUserTypeValidCheck = true;
			}
			if (this.sourcePoApproval.billToAddressId == "null" || this.sourcePoApproval.billToAddressId == undefined) {
				str += "    Please enter required billToAddress field!";
				// this.alertService.showMessage('billToAddress ', "Please enter required billToAddress field!", MessageSeverity.error);
				// var discountPercent = "Please enter required discountPercent field!";this.billToSiteNameValidCheck = true;
			}

			this.alertService.showMessage(" ", str, MessageSeverity.error);
		}
		else {
			this.sourcePoApprovalObj = {
				purchaseOrderNumber: this.sourcePoApproval.purchaseOrderNumber,
				openDate: this.datePipe.transform(this.sourcePoApproval.openDate, "MM/dd/yyyy"),//new Date(this.sourcePoApproval.openDate),
				closedDate: this.datePipe.transform(this.sourcePoApproval.closedDate, "MM/dd/yyyy"),
				needByDate: this.datePipe.transform(this.sourcePoApproval.needByDate, "MM/dd/yyyy"),
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
				approvedDate: this.datePipe.transform(this.sourcePoApproval.approvedDate, "MM/dd/yyyy"),
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
				shipVia: this.sourcePoApproval.shipVia,
				shippingAcctNum: this.sourcePoApproval.shippingAcctNum,
				shippingURL: this.sourcePoApproval.shippingURL,
				shippingId: this.sourcePoApproval.shippingId,
				shipToMemo: this.sourcePoApproval.shipToMemo ? this.sourcePoApproval.shipToMemo : '',
				billToUserTypeId: this.sourcePoApproval.billToUserTypeId ? parseInt(this.sourcePoApproval.billToUserTypeId) : 0,
				billToUserId: this.sourcePoApproval.billToUserId ? this.getShipToBillToUserId(this.sourcePoApproval.billToUserId) : 0,
				billToAddressId: this.sourcePoApproval.billToAddressId ? this.sourcePoApproval.billToAddressId : 0,
				//billToContactId: this.sourcePoApproval.billToContactId ? this.getShipBillContactId(this.sourcePoApproval.billToContactId) : 0,
				billToContactId: this.sourcePoApproval.billToContactId ? editValueAssignByCondition('contactId', this.sourcePoApproval.billToContactId) : 0,
				billToMemo: this.sourcePoApproval.billToMemo ? this.sourcePoApproval.billToMemo : '',
				shipToSiteName: this.postSiteNameForShipping(this.sourcePoApproval.shipToUserTypeId, this.sourcePoApproval.shipToAddressId),
				shipToAddress1: this.shipToAddress.address1,
				shipToAddress2: this.shipToAddress.address2,
				// shipToAddress3: this.shipToAddress.address3,
				shipToCity: this.shipToAddress.city,
				shipToStateOrProvince: this.shipToAddress.stateOrProvince,
				shipToPostalCode: this.shipToAddress.postalCode,
				shipToCountry: this.shipToAddress.country,
				billToSiteName: this.postSiteNameForBilling(this.sourcePoApproval.billToUserTypeId, this.sourcePoApproval.billToAddressId),
				billToAddress1: this.billToAddress.address1,
				billToAddress2: this.billToAddress.address2,
				// billToAddress3: this.billToAddress.address3,
				billToCity: this.billToAddress.city,
				billToStateOrProvince: this.billToAddress.stateOrProvince,
				billToPostalCode: this.billToAddress.postalCode,
				billToCountry: this.billToAddress.country,
				shipToSiteId: this.sourcePoApproval.shipToAddressId ? this.sourcePoApproval.shipToAddressId : 0,
				billToSiteId: this.sourcePoApproval.billToAddressId ? this.sourcePoApproval.billToAddressId : 0,
				createdBy: this.userName,
				updatedBy: this.userName
			}
			console.log(this.sourcePoApprovalObj);

			// header save 
			if (!this.isEditMode) {
				this.vendorService.savePurchaseorder({ ...this.sourcePoApprovalObj }).subscribe(saveddata => {
					this.route.navigate(['/vendorsmodule/vendorpages/app-polist'])
					this.purchaseOrderId = saveddata.purchaseOrderId;
					this.savedInfo = saveddata;
					console.log(saveddata);
					this.tempVendorId = null;
					this.savePurchaseorderPart(saveddata.purchaseOrderId);
					this.savePOApproverData(saveddata.purchaseOrderId);
				});
			} else {
				const poHeaderEdit = { ...this.sourcePoApprovalObj, purchaseOrderId: parseInt(this.poId) };
				this.vendorService.savePurchaseorder({ ...poHeaderEdit }).subscribe(saveddata => {
					this.route.navigate(['/vendorsmodule/vendorpages/app-polist'])
					this.purchaseOrderId = saveddata.purchaseOrderId;
					this.savedInfo = saveddata;
					console.log(saveddata);
					this.tempVendorId = null;
					this.savePurchaseorderPart(saveddata.purchaseOrderId);
					//this.savePOApproverData(saveddata.purchaseOrderId);
				});
			}
		}
	}

	savePurchaseorderPart(purId) {
		//if (!this.isEditMode) {
		for (let i = 0; i < this.partListData.length; i++) {
			//alert("New");
			let childDataList = [];
			this.childObjectArray = [];
			this.childObjectArrayEdit = [];
			//this.parentObjectArray = [];
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
					console.log(this["splitAddressData" + i + j]);
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
						poPartSplitAddress1: this["splitAddressData" + i + j].length > 0 ? getValueFromArrayOfObjectById('address1', 'addressId', childDataList[j].partListAddressId, this["splitAddressData" + i + j]) : '',
						poPartSplitAddress2: this["splitAddressData" + i + j].length > 0 ? getValueFromArrayOfObjectById('address2', 'addressId', childDataList[j].partListAddressId, this["splitAddressData" + i + j]) : '',
						// poPartSplitAddress3: this["splitAddressData"+i+j].length > 0 ? getValueFromArrayOfObjectById('address3', 'addressId', childDataList[j].partListAddressId, this["splitAddressData"+i+j]) : '',
						poPartSplitCity: this["splitAddressData" + i + j].length > 0 ? getValueFromArrayOfObjectById('city', 'addressId', childDataList[j].partListAddressId, this["splitAddressData" + i + j]) : '',
						poPartSplitStateOrProvince: this["splitAddressData" + i + j].length > 0 ? getValueFromArrayOfObjectById('stateOrProvince', 'addressId', childDataList[j].partListAddressId, this["splitAddressData" + i + j]) : '',
						poPartSplitPostalCode: this["splitAddressData" + i + j].length > 0 ? getValueFromArrayOfObjectById('postalCode', 'addressId', childDataList[j].partListAddressId, this["splitAddressData" + i + j]) : '',
						poPartSplitCountry: this["splitAddressData" + i + j].length > 0 ? getValueFromArrayOfObjectById('country', 'addressId', childDataList[j].partListAddressId, this["splitAddressData" + i + j]) : '',
						UOMId: this.partListData[i].UOMId ? this.partListData[i].UOMId : 0,
						quantityOrdered: childDataList[j].quantityOrdered ? childDataList[j].quantityOrdered : 0,
						needByDate: this.datePipe.transform(childDataList[j].needByDate, "MM/dd/yyyy"),
						managementStructureId: childDataList[j].managementStructureId ? childDataList[j].managementStructureId : 0, //109
						//createdBy: this.userName,
						//updatedBy: this.userName,
					}

					this.childObjectArray.push(this.childObject)
					this.childObjectArrayEdit.push({
						...this.childObject,
						purchaseOrderPartRecordId: childDataList[j].purchaseOrderPartRecordId ? childDataList[j].purchaseOrderPartRecordId : 0
					})
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
				//needByDate: this.partListData[i].needByDate,
				needByDate: this.datePipe.transform(this.partListData[i].needByDate, "MM/dd/yyyy"),
				conditionId: this.partListData[i].conditionId ? this.getConditionIdByObject(this.partListData[i].conditionId) : 0,
				quantityOrdered: this.partListData[i].quantityOrdered ? this.partListData[i].quantityOrdered : 0,
				unitCost: this.partListData[i].unitCost ? this.partListData[i].unitCost : 0,
				discountPerUnit: this.partListData[i].discountPerUnit ? this.partListData[i].discountPerUnit : 0,
				discountPercent: this.partListData[i].discountPercent ? this.getDiscPercentIdByObject(this.partListData[i].discountPercent) : 0,
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
				//poPartSplits: this.childObjectArray					
			}
			if (!this.isEditMode) {
				this.parentObjectArray.push({
					...this.parentObject,
					poPartSplits: this.childObjectArray
					//purchaseOrderPartRecordId: this.partListData[i].purchaseOrderPartRecordId
				})
				//this.parentObjectArray.push(this.parentObject)
			} else {
				this.parentObjectArray.push({
					...this.parentObject,
					poPartSplits: this.childObjectArrayEdit,
					purchaseOrderPartRecordId: this.partListData[i].purchaseOrderPartRecordId ? this.partListData[i].purchaseOrderPartRecordId : 0
				})
			}
			console.log(this.parentObjectArray);
		}

		if (!this.isEditMode) {
			this.vendorService.savePurchaseorderpart(this.parentObjectArray).subscribe(res => {
				console.log(res);
				this.alertService.showMessage(
					'Success',
					`Created New PO Successfully`,
					MessageSeverity.success
				);
			});
		} else {
			this.vendorService.savePurchaseorderpart(this.parentObjectArray).subscribe(res => {
				console.log(res);
				this.alertService.showMessage(
					'Success',
					`Updated PO Successfully`,
					MessageSeverity.success
				);
			});
		}
		//}
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
				return getValueFromArrayOfObjectById('siteName', 'customerBillingAddressId', currentbillToAddressId, this.billToCusData);
			} else
				if (moduleId == 2) {
					return getValueFromArrayOfObjectById('siteName', 'vendorBillingAddressId', currentbillToAddressId, this.vendorSelectedForBillTo);
				} else
					if (moduleId == 3) {
						return getValueFromArrayOfObjectById('siteName', 'legalEntityBillingAddressId', currentbillToAddressId, this.companySiteList_Billing);
					}
		}
	}

	savePOApproverData(purchaseOrderId) {
		console.log(this.approversData);
		this.approverIds = [];
		this.poApproverList = [];
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
		}
		this.poApproverData = {
			purchaseOrderId: purchaseOrderId ? purchaseOrderId : this.poId,
			purchaseOrderApproverList: this.poApproverList
		}
		if (this.poApproverList.length > 0) {
			this.purchaseOrderService.saveCreatePOApproval(this.poApproverData).subscribe(res => {
				console.log(res);
				if (this.isEditMode) {
					this.getApproversListById(this.poId);
					this.alertService.showMessage(
						'Success',
						`Added Approvers Successfully`,
						MessageSeverity.success
					);
				}
			})
		}
	}

	updatePOApproverData() {
		console.log(this.approversData);
		this.approverIds = [];
		this.poApproverList = [];
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
				poApproverId: this.getApproverIdUpdate(i + 1, 'id'),
				poApproverListId: this.getApproverIdUpdate(i + 1, 'listId'),
				statusId: 1,
				createdBy: "admin",
				updatedBy: "admin"
			}
			this.poApproverList.push(poapprover);
		}
		this.poApproverData = {
			purchaseOrderId: parseInt(this.poId),
			poApproverId: this.poApproverId,
			purchaseOrderApproverList: this.poApproverList
		}

		// this.poApproverData = {
		// 	purchaseOrderId: parseInt(this.poId),
		// 	poApproverId: this.approversData[0].poApproverId,
		// 	purchaseOrderApproverList: this.poApproverListEdit
		// }
		console.log(this.poApproverData);
		this.purchaseOrderService.updatePOApproval(this.poApproverData).subscribe(res => {
			console.log(res);
			this.alertService.showMessage(
				'Success',
				`Updated Approvers Successfully`,
				MessageSeverity.success
			);
		})
	}

	getApproverIdUpdate(level, value) {
		for (let i = 0; i < this.approveListEdit.length; i++) {
			if (level == this.approveListEdit[i].level) {
				if (value == 'id') {
					return getValueFromArrayOfObjectById('poApproverId', 'level', level, this.approveListEdit);
				}
				if (value == 'listId') {
					return getValueFromArrayOfObjectById('poApproverListId', 'level', level, this.approveListEdit);
				}
			}
		}
	}

	loadcustomerData() {
		this.commonService.smartDropDownList('Customer', 'CustomerId', 'Name').subscribe(response => {
			this.allCustomers = response;
		});
	}

	private ptnumberlistdata() {
		this.commonService.smartDropDownList('ItemMaster', 'ItemMasterId', 'partnumber').subscribe(response => {
			this.allPartnumbersInfo = response;
		});
	}

	filterpartItems(event) {
		this.partCollection = this.allPartnumbersInfo;

		if (event.query !== undefined && event.query !== null) {
			const partNumberFilter = [...this.allPartnumbersInfo.filter(x => {
				return x.label.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.partCollection = partNumberFilter;
		}
	}

	getPNDetailsById(parentdata) {
		console.log(parentdata)
		this.showInput = true;
		const itemMasterId = getValueFromObjectByKey('value', parentdata.partNumberId)
		this.sourcePoApproval.itemMasterId = itemMasterId;
		this.partWithId = [];
		this.itemTypeId = 1;

		//For Getting Data After Part Selected
		this.vendorService.getPartDetailsWithidForSinglePart(itemMasterId).subscribe(
			data1 => {
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
				}
			})
	}

	filterNames(event) {
		this.customerNames = this.allCustomers;

		if (event.query !== undefined && event.query !== null) {
			const customers = [...this.allCustomers.filter(x => {
				return x.label.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.customerNames = customers;
		}
	}

	onCustomerNameChange(customerId, data?, pindex?, cindex?) {
		//this.gridSelectedCustomerId = customer ? customer.value : this.gridSelectedCustomerId;
		//console.log(part, customer)
		// part.poPartSplitUserId = customer.customerId;

		this.customerService.getCustomerShipAddressGet(customerId).subscribe(returnedcustomerAddressses => {
			//this["splitAddressData"+index] = returnedcustomerAddressses[0];
			//console.log(this["splitAddressData"+index])
			//this.splitAddressData = returnedcustomerAddressses[0];
			this["splitAddressData" + pindex + cindex] = [];
			this["splitAddressData" + pindex + cindex] = returnedcustomerAddressses[0];
			if (this.isEditMode) {
				if (data.poPartSplitAddressId == 0) {
					this["splitAddressData" + pindex + cindex].push({ addressId: 0, address1: data.poPartSplitAddress1, address2: data.poPartSplitAddress2, city: data.poPartSplitCity, stateOrProvince: data.poPartSplitState, postalCode: data.poPartSplitPostalCode, country: data.poPartSplitCountry })
				}
				this["splitAddressData" + pindex + cindex].map(x => {
					if (x.addressId == 0) {
						data.partListAddressId = x.addressId;
					}
				});
				console.log(this["splitAddressData" + pindex + cindex]);
				//this.onShipToGetAddress(data, data.poPartSplitAddressId);
			}
			//part.poPartSplitAddressId = 0;
			data.poPartSplitAddressId = null;
			data.partListAddressId = null;
		});
	}

	getAddressDetails(variable, pindex, cindex) {
		return this[variable + pindex + cindex]
	}
	filterCustomersSplit(event): void {
		this.splitcustomersList = this.allCustomers;

		if (event.query !== undefined && event.query !== null) {
			const customers = [...this.allCustomers.filter(x => {
				return x.label.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.splitcustomersList = customers;
		}
	}

	onVendorNameChange(vendorId, data?, pindex?, cindex?): void {
		//console.log(part, vendor)
		//this.gridSelectedVendorId = vendor ? vendor.vendorId : this.gridSelectedVendorId;
		//part.poPartSplitUserId = vendor.vendorId;
		this.vendorService.getVendorShipAddressGet(vendorId).subscribe(
			vendorAddresses => {
				//this.vendorSelectedforSplit = vendorAddresses[0];
				this["splitAddressData" + pindex + cindex] = [];
				this["splitAddressData" + pindex + cindex] = vendorAddresses[0].map(x => {
					return {
						...x,
						countryName: x.country
						//countryName: x.country ? getValueFromArrayOfObjectById('label', 'value', x.country, this.allCountriesList) : ''
					}
				});
				console.log(this["splitAddressData" + pindex + cindex]);

				//part.addressData = vendorAddresses[0];;
				//this.splitAddressData = vendorAddresses[0];
				if (this.isEditMode) {
					if (data.poPartSplitAddressId == 0) {
						this["splitAddressData" + pindex + cindex].push({ addressId: 0, address1: data.poPartSplitAddress1, address2: data.poPartSplitAddress2, city: data.poPartSplitCity, stateOrProvince: data.poPartSplitState, postalCode: data.poPartSplitPostalCode, country: data.poPartSplitCountry })
					}
					//this.onShipToGetAddress(data, data.poPartSplitAddressId);
				}
				data.poPartSplitAddressId = null;
				data.partListAddressId = null;
			})
	}

	onCompanyNameChange(companyId, data?, pindex?, cindex?) {
		this.legalEntityService.getLegalEntityAddressById(companyId).subscribe(response => {
			this["splitAddressData" + pindex + cindex] = [];
			this["splitAddressData" + pindex + cindex] = response[0].map(x => {
				return {
					...x,
					address1: x.line1,
					address2: x.line2,
					// address3: x.line3,
					countryName: x.country
				}
			});
			if (this.isEditMode) {
				if (data.poPartSplitAddressId == 0) {
					this["splitAddressData" + pindex + cindex].push({ addressId: 0, address1: data.poPartSplitAddress1, address2: data.poPartSplitAddress2, city: data.poPartSplitCity, country: data.poPartSplitCountry, postalCode: data.poPartSplitPostalCode, stateOrProvince: data.poPartSplitState });
				}
			} else {
				this.onShipToGetCompanyAddress(this.companySiteList_Shipping[0].legalEntityShippingAddressId);
			}
			data.poPartSplitAddressId = null;
			data.partListAddressId = null;
		})
	}

	onGetSplitAddress(splitPart) {
		console.log(splitPart);
	}

	filterSplitVendorNames(event) {
		this.splitVendorNames = this.allActions;

		if (event.query !== undefined && event.query !== null) {
			const vendorNames = [...this.allActions.filter(x => {
				return x.vendorName.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.splitVendorNames = vendorNames;
		}
	}

	onSelectSplitUserType(part, pindex, cindex) {
		part.addressData = [];
		part.partListUserId = {};
		part.partListAddressId = null;
		this["splitAddressData" + pindex + cindex] = [];
	}

	deleteSplitShipment(childata, index, mainindex) {
		// if (childata.purchaseOrderPartRecordId) {
		// 	this.vendorService.deletePurchaseorderpart(childata.purchaseOrderPartRecordId).subscribe(data => {

		// 	})
		// }
		// const index1: number = this.partListData.indexOf(index);
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
	}

	filterVendorContactsForBillTo(event) {
		this.firstNamesbillTo1 = this.vendorContactsForBillTO;

		if (event.query !== undefined && event.query !== null) {
			const vendorContacts = [...this.vendorContactsForBillTO.filter(x => {
				return x.firstName.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.firstNamesbillTo1 = vendorContacts;
		}
	}

	// ship to
	onShipToCustomerSelected(customerId, res?, id?) {
		this.clearInputOnClickUserIdShipTo();
		this.shipToSelectedvalue = customerId;
		this.customerService.getCustomerShipAddressGet(customerId).subscribe(
			returnddataforbill => {
				this.shipToCusData = returnddataforbill[0];
				if (id) {
					res.shipToAddressId = id;
				}
				if (this.isEditMode) {
					if (res.shipToAddressId == 0) {
						this.shipToCusData.push({ customerShippingAddressId: 0, address1: res.shipToAddress1, address2: res.shipToAddress2, city: res.shipToCity, stateOrProvince: res.shipToStateOrProvince, postalCode: res.shipToPostalCode, country: res.shipToCountry, siteName: res.shipToSiteName })
					}
				}
				this.onShipToGetAddress(res, res.shipToAddressId);
			});
		this.customerService.getContacts(customerId).subscribe(data => {
			this.shipToContactData = data[0];
			if (this.isEditMode) {
				this.tempPOHeaderAddress.shipToContactId = getObjectById('contactId', res.shipToContactId, this.shipToContactData);
			}
		});
		this.getShipViaDetailsForShipTo();
	}

	onShipToVendorSelected(vendorId, res?, id?) {
		this.clearInputOnClickUserIdShipTo();
		this.shipToSelectedvalue = vendorId;
		this.showInput = true;
		this.vendorService.getVendorShipAddressGet(vendorId).subscribe(
			returdaa => {
				console.log(returdaa);
				this.vendorSelected = returdaa[0];
				if (id) {
					res.shipToAddressId = id;
				}
				if (this.isEditMode) {
					if (res.shipToAddressId == 0) {
						this.vendorSelected.push({ vendorShippingAddressId: 0, address1: res.shipToAddress1, address2: res.shipToAddress2, city: res.shipToCity, stateOrProvince: res.shipToStateOrProvince, postalCode: res.shipToPostalCode, country: res.shipToCountry, siteName: res.shipToSiteName })
					}
				}
				this.onShipToGetAddress(res, res.shipToAddressId);
			});
		this.vendorService.getContacts(vendorId).subscribe(data => {
			this.vendorContactsForshipTo = data[0]; //vendorContactsForshipTo
			if (this.isEditMode) {
				this.tempPOHeaderAddress.shipToContactId = getObjectById('contactId', res.shipToContactId, this.vendorContactsForshipTo);
			}
			console.log(this.vendorContactsForshipTo);

			this.commonService.getShipViaDetailsByModule(this.sourcePoApproval.shipToUserTypeId, vendorId).subscribe(res => {
				this.shipViaList = res;
			})
			this.getShipViaDetailsForShipTo();
		});
	}

	onShipToCompanySelected(object?, res?, id?) {
		this.clearInputOnClickUserIdShipTo();
		this.shipToSelectedvalue = object ? object.value : this.shipToSelectedvalue;

		this.companyService.getShippingCompanySiteNames(this.shipToSelectedvalue).subscribe(response => {
			this.companySiteList_Shipping = response;
			if (id) {
				res.shipToAddressId = id;
				this.onShipToGetCompanyAddress(id);
			}
		})
		this.companyService.getCompanyContacts(this.shipToSelectedvalue).subscribe(response => {
			this.contactListForCompanyShipping = response;
		})
		this.getShipViaDetailsForShipTo();
	}

	onShipToGetAddress(data, id) {
		console.log(data, id);
		this.shipToAddress = {};

		if (data.shipToUserTypeId == 1 || data.shipToUserType == 1) {
			this.shipToAddress = getObjectById('customerShippingAddressId', id, this.shipToCusData);
		}
		else if (data.shipToUserTypeId == 2 || data.shipToUserType == 2) {
			this.shipToAddress = getObjectById('vendorShippingAddressId', id, this.vendorSelected);
		}
		this.shipToAddress = { ...this.shipToAddress, country: this.shipToAddress.countryName ? this.shipToAddress.countryName : this.shipToAddress.country }

		// if (this.isEditMode) {
		// 	if (data.shipToUserType == 1) {
		// 		this.shipToAddress = getObjectById('customerShippingAddressId', id, this.shipToCusData);
		// 	} else if (data.shipToUserType == 2) {
		// 		this.shipToAddress = getObjectById('vendorShippingAddressId', id, this.vendorSelected);
		// 	}
		// }
	}

	onShipToGetCompanyAddress(id) {
		this.shipToAddress = {};
		this.companyService.getShippingAddress(id).subscribe(res => {
			const resp = res;
			if (resp) {
				this.shipToAddress.address1 = resp.line1;
				this.shipToAddress.address2 = resp.line2;
				// this.shipToAddress.address3 = resp.line3;
				this.shipToAddress.city = resp.city;
				this.shipToAddress.stateOrProvince = resp.stateOrProvince;
				this.shipToAddress.postalCode = resp.postalCode;
				this.shipToAddress.country = resp.country;
			} else {
				this.shipToAddress.address1 = '';
				this.shipToAddress.address2 = '';
				// this.shipToAddress.address3 = '';
				this.shipToAddress.city = '';
				this.shipToAddress.stateOrProvince = '';
				this.shipToAddress.postalCode = '';
				this.shipToAddress.country = '';
			}
		})
	}

	// onShipToGetCompanyAddressThisPO() {

	// }

	onClickShipMemo() {
		this.addressMemoLabel = 'Edit Ship';
		this.tempMemo = this.sourcePoApproval.shipToMemo;
	}

	getShipViaDetails(id) {
		//this.sourcePoApproval.shippingCost = null;
		//this.sourcePoApproval.handlingCost = null;
		this.sourcePoApproval.shippingAcctNum = null;
		this.sourcePoApproval.shippingId = null;
        this.sourcePoApproval.shippingURL = '';
        var userType = this.sourcePoApproval.shipToUserTypeId ? parseInt(this.sourcePoApproval.shipToUserTypeId) : 0;

        this.commonService.getShipViaDetailsById(id, userType).subscribe(res => {
			const responseData = res;
			this.sourcePoApproval.shippingAcctNum = responseData.shippingAccountInfo;
			this.sourcePoApproval.shippingURL = responseData.shippingURL;
			this.sourcePoApproval.shippingId = responseData.shippingId;
			this.sourcePoApproval.shipVia = responseData.shipVia;
			console.log(res)
		})
	}

	onClickShipSiteName(value, data?) {
		this.resetAddressShippingForm();
		if (value === 'AddCusSiteName') {
			this.addressSiteNameHeader = 'Add Ship To Customer Details';
		}
		if (value === 'EditCusSiteName') {
			this.addressSiteNameHeader = 'Edit Ship To Customer Details';
			this.isEditModeShipping = true;
			this.tempshipToAddress = getObjectById('customerShippingAddressId', data.shipToAddressId, this.shipToCusData);
			// this.tempshipToAddress.country = this.tempshipToAddress.country ?  getValueFromArrayOfObjectById('label', 'value', this.tempshipToAddress.country, this.countriesList) : '';
			// const countryName = this.tempshipToAddress.country.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
			if (typeof this.tempshipToAddress.country == 'number') {
				this.addressFormForShipping = { ...this.tempshipToAddress, country: getObjectByValue('value', this.tempshipToAddress.country, this.allCountriesList) };
			} else {
				this.addressFormForShipping = { ...this.tempshipToAddress, country: getObjectByValue('label', this.tempshipToAddress.country, this.allCountriesList) };
			}

		}
		if (value === 'AddVenSiteName') {
			this.addressSiteNameHeader = 'Add Ship To Vendor Details';
		}
		if (value === 'EditVenSiteName') {
			this.addressSiteNameHeader = 'Edit Ship To Vendor Details';
			this.isEditModeShipping = true;
			this.tempshipToAddress = getObjectById('vendorShippingAddressId', data.shipToAddressId, this.vendorSelected);
			// const countryName = this.tempshipToAddress.country.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
			// this.addressFormForShipping = {...this.tempshipToAddress, country: getObjectByValue('label', countryName, this.allCountriesList)};
			if (typeof this.tempshipToAddress.country == 'number') {
				this.addressFormForShipping = { ...this.tempshipToAddress, country: getObjectByValue('value', this.tempshipToAddress.country, this.allCountriesList) };
			} else {
				this.addressFormForShipping = { ...this.tempshipToAddress, country: getObjectByValue('label', this.tempshipToAddress.country, this.allCountriesList) };
			}
		}
		if (value === 'AddComSiteName') {
			this.addressSiteNameHeader = 'Add Ship To Company Details';
		}
		if (value === 'EditComSiteName') {
			this.addressSiteNameHeader = 'Edit Ship To Company Details';
			this.isEditModeShipping = true;
			this.tempshipToAddress = getObjectById('legalEntityShippingAddressId', data.shipToAddressId, this.companySiteList_Shipping);
			//this.onShipToGetCompanyAddress(data.shipToAddressId);

			if (data.shipToAddressId != 0) {
				this.shipToAddress = {};
				this.companyService.getShippingAddress(data.shipToAddressId).subscribe(res => {
					const resp = res;
					this.shipToAddress.address1 = resp.line1;
					this.shipToAddress.address2 = resp.line2;
					// this.shipToAddress.address3 = resp.line3;
					this.shipToAddress.city = resp.city;
					this.shipToAddress.stateOrProvince = resp.stateOrProvince;
					this.shipToAddress.postalCode = resp.postalCode;
					this.shipToAddress.country = resp.country;

					const tempShipToAdd = this.shipToAddress;
					// const countryName = tempShipToAdd.country.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
					this.addressFormForShipping = { ...tempShipToAdd, siteName: this.tempshipToAddress.siteName, legalEntityShippingAddressId: this.tempshipToAddress.legalEntityShippingAddressId };
					if (typeof this.addressFormForShipping.country == 'number') {
						this.addressFormForShipping = { ...this.addressFormForShipping, country: getObjectByValue('value', this.addressFormForShipping.country, this.allCountriesList) };
					} else {
						this.addressFormForShipping = { ...this.addressFormForShipping, country: getObjectByValue('label', this.addressFormForShipping.country, this.allCountriesList) };
					}
				})
			} else {
				// const countryName = this.tempshipToAddress.country.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
				this.addressFormForShipping = { ...this.tempshipToAddress, siteName: this.tempshipToAddress.siteName, legalEntityShippingAddressId: this.tempshipToAddress.legalEntityShippingAddressId };
				if (typeof this.addressFormForShipping.country == 'number') {
					this.addressFormForShipping = { ...this.addressFormForShipping, country: getObjectByValue('value', this.addressFormForShipping.country, this.allCountriesList) };
				} else {
					this.addressFormForShipping = { ...this.addressFormForShipping, country: getObjectByValue('label', this.addressFormForShipping.country, this.allCountriesList) };
				}
			}
		}
	}

	// bill to
	onBillToCustomerSelected(customerId, res?, id?) {
		console.log(res);
		if(res) {
			res.billToStateOrProvince = res.billToState ? res.billToState : '';
		}		
		this.clearInputOnClickUserIdBillTo();
		this.billToSelectedvalue = customerId;
		this.customerService.getCustomerBillViaDetails(customerId).subscribe(
			returnddataforbill => {
				this.billToCusData = returnddataforbill[0];
				if (id) {
					res.billToAddressId = id;
				}
				if (this.isEditMode) {
					if (res.billToAddressId == 0) {
						this.billToCusData.push({ customerBillingAddressId: 0, address1: res.billToAddress1, address2: res.billToAddress2, city: res.billToCity, stateOrProvince: res.billToStateOrProvince, postalCode: res.billToPostalCode, country: res.billToCountry, siteName: res.billToSiteName })
					}
				}
				this.onBillToGetAddress(res, res.billToAddressId);
			});
		this.customerService.getContacts(customerId).subscribe(data => {
			this.billToContactData = data[0];
			if (this.isEditMode) {
				this.tempPOHeaderAddress.billToContactId = getObjectById('contactId', res.billToContactId, this.billToContactData);
			}
		});
	}

	async onBillToVendorSelected(vendorId, res?, id?) {
		this.clearInputOnClickUserIdBillTo();
		this.billToSelectedvalue = vendorId;
		this.showInput = true;
		await this.vendorService.getVendorSiteNames(vendorId).subscribe(
			returdaa => {
				this.vendorSelectedForBillTo = returdaa;
				if (id) {
					res.billToAddressId = id;
					this.onBillToGetAddress(res, res.billToAddressId);
				}
				if (this.isEditMode) {
					if (res.billToAddressId == 0) {
						this.vendorSelectedForBillTo.push({ vendorBillingAddressId: 0, siteName: res.billToSiteName });

						this.billToAddress.address1 = res.billToAddress1;
						this.billToAddress.address2 = res.billToAddress2;
						// this.billToAddress.address3 = res.billToAddress3;
						this.billToAddress.city = res.billToCity;
						this.billToAddress.stateOrProvince = res.billToState;
						this.billToAddress.postalCode = res.billToPostalCode;
						this.billToAddress.country = res.billToCountry;
					} else {
						this.onBillToGetAddress(res, res.billToAddressId);
					}
				}
			})
		this.vendorService.getContacts(vendorId).subscribe(
			returdaa => {
				this.vendorContactsForBillTO = returdaa[0];
				if (this.isEditMode) {
					this.tempPOHeaderAddress.billToContactId = getObjectById('contactId', res.billToContactId, this.vendorContactsForBillTO);
				}
			})
	}

	onBillToCompanySelected(object?, response?, id?) {
		this.clearInputOnClickUserIdBillTo();
		this.billToSelectedvalue = object ? object.value : this.billToSelectedvalue;

		this.companyService.getBillingCompanySiteNames(this.billToSelectedvalue).subscribe(res => {
			this.companySiteList_Billing = res;
			if (id) {
				response.billToAddressId = id;
				this.onBillToGetCompanyAddress(id);
			}
		})
		this.companyService.getCompanyContacts(this.billToSelectedvalue).subscribe(res => {
			this.contactListForCompanyBilling = res;
		})

		this.commonService.getShipViaDetailsByModule(this.sourcePoApproval.billToUserTypeId, this.billToSelectedvalue).subscribe(res => {
			this.shipViaList = res;
		})
	}

	onBillToGetAddress(data, id) {
		console.log(data, id);
		console.log(this.billToCusData);		
		if (data.billToUserTypeId == 1 || data.billToUserType == 1) {
			// this.customerService.getCustomerBillViaDetails(id).subscribe(res => {
			const resp = getObjectById('customerBillingAddressId', id, this.billToCusData);
			console.log(resp, id)

			if (resp) {
				this.billToAddress.address1 = resp.address1;
				this.billToAddress.address2 = resp.address2;
				// this.billToAddress.address3 = resp.address3;
				this.billToAddress.city = resp.city;
				this.billToAddress.stateOrProvince = resp.stateOrProvince;
				this.billToAddress.postalCode = resp.postalCode;
				this.billToAddress.country = resp.countryName ? resp.countryName : resp.country;
				// this.billToAddress.country = resp.country ? getValueFromArrayOfObjectById('label', 'value', resp.country, this.countriesList) : '';
			} else {
				this.billToAddress.address1 = '';
				this.billToAddress.address2 = '';
				// this.billToAddress.address3 = '';
				this.billToAddress.city = '';
				this.billToAddress.stateOrProvince = '';
				this.billToAddress.postalCode = '';
				this.billToAddress.country = '';
			}
			// })
			// this.billToAddress = getObjectById('customerShippingAddressId', id, this.billToCusData);
		} else if (data.billToUserTypeId == 2 || data.billToUserType == 2) {
			this.vendorService.getVendorAddressById(id).subscribe(res => {
				const resp = res;
				if (resp) {
					this.billToAddress.address1 = resp.line1;
					this.billToAddress.address2 = resp.line2;
					// this.billToAddress.address3 = resp.line3;
					this.billToAddress.city = resp.city;
					this.billToAddress.stateOrProvince = resp.stateOrProvince;
					this.billToAddress.postalCode = resp.postalCode;
					this.billToAddress.country = resp.country;
				} else {
					this.billToAddress.address1 = '';
					this.billToAddress.address2 = '';
					// this.billToAddress.address3 = '';
					this.billToAddress.city = '';
					this.billToAddress.stateOrProvince = '';
					this.billToAddress.postalCode = '';
					this.billToAddress.country = '';
				}
			})
		}
	}

	onBillToGetCompanyAddress(id) {
		this.companyService.getBillingAddress(id).subscribe(res => {
			const resp = res;
			if (resp) {
				this.billToAddress.address1 = resp.line1;
				this.billToAddress.address2 = resp.line2;
				// this.billToAddress.address3 = resp.line3;
				this.billToAddress.city = resp.city;
				this.billToAddress.stateOrProvince = resp.stateOrProvince;
				this.billToAddress.postalCode = resp.postalCode;
				this.billToAddress.country = resp.country;
			} else {
				this.billToAddress.address1 = '';
				this.billToAddress.address2 = '';
				// this.billToAddress.address3 = '';
				this.billToAddress.city = '';
				this.billToAddress.stateOrProvince = '';
				this.billToAddress.postalCode = '';
				this.billToAddress.country = '';
			}
		})
	}

	onClickBillMemo() {
		this.addressMemoLabel = 'Edit Bill';
		this.tempMemo = this.sourcePoApproval.billToMemo;
	}

	onClickBillSiteName(value, data?) {
		this.resetAddressBillingForm();
		if (value === 'AddCusSiteName') {
			this.addressSiteNameHeader = 'Add Bill To Customer Details';
		}
		if (value === 'EditCusSiteName') {
			this.addressSiteNameHeader = 'Edit Bill To Customer Details';
			this.isEditModeBilling = true;
			this.tempbillToAddress = getObjectById('customerBillingAddressId', data.billToAddressId, this.billToCusData);
			// this.tempshipToAddress.country = this.tempshipToAddress.country ?  getValueFromArrayOfObjectById('label', 'value', this.tempshipToAddress.country, this.countriesList) : '';
			// const countryName = this.tempbillToAddress.country.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');			
			if (typeof this.tempbillToAddress.country == 'number') {
				this.addressFormForBilling = { ...this.tempbillToAddress, country: getObjectByValue('value', this.tempbillToAddress.country, this.allCountriesList) };
			} else {
				this.addressFormForBilling = { ...this.tempbillToAddress, country: getObjectByValue('label', this.tempbillToAddress.country, this.allCountriesList) };
			}
		}

		if (value === 'AddVenSiteName') {
			this.addressSiteNameHeader = 'Add Bill To Vendor Details';
		}
		if (value === 'EditVenSiteName') {
			this.addressSiteNameHeader = 'Edit Bill To Vendor Details';
			this.isEditModeBilling = true;
			this.tempbillToAddress = getObjectById('vendorBillingAddressId', data.billToAddressId, this.vendorSelectedForBillTo);
			this.onBillToGetAddress(data, data.billToAddressId);
			const tempBillToAdd = this.billToAddress;
			// const countryName = tempBillToAdd.country.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
			this.addressFormForBilling = { ...tempBillToAdd, siteName: this.tempbillToAddress.siteName, vendorBillingAddressId: this.tempbillToAddress.vendorBillingAddressId };
			if (typeof this.addressFormForBilling.country == 'number') {
				this.addressFormForBilling = { ...this.addressFormForBilling, country: getObjectByValue('value', this.addressFormForBilling.country, this.allCountriesList) };
			} else {
				this.addressFormForBilling = { ...this.addressFormForBilling, country: getObjectByValue('label', this.addressFormForBilling.country, this.allCountriesList) };
			}
		}
		if (value === 'AddComSiteName') {
			this.addressSiteNameHeader = 'Add Bill To Company Details';
		}
		if (value === 'EditComSiteName') {
			this.addressSiteNameHeader = 'Edit Bill To Company Details';
			this.isEditModeBilling = true;
			this.tempbillToAddress = getObjectById('legalEntityBillingAddressId', data.billToAddressId, this.companySiteList_Billing);
			//this.addressFormForBilling = {...this.tempbillToAddress};

			if (data.billToAddressId != 0) {
				this.billToAddress = {};
				this.companyService.getBillingAddress(data.billToAddressId).subscribe(res => {
					const resp = res;
					this.billToAddress.address1 = resp.line1;
					this.billToAddress.address2 = resp.line2;
					// this.billToAddress.address3 = resp.line3;
					this.billToAddress.city = resp.city;
					this.billToAddress.stateOrProvince = resp.stateOrProvince;
					this.billToAddress.postalCode = resp.postalCode;
					this.billToAddress.country = resp.country;

					const tempBillToAdd = this.billToAddress;
					// const countryName = tempBillToAdd.country.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
					this.addressFormForBilling = { ...tempBillToAdd, siteName: this.tempbillToAddress.siteName, legalEntityBillingAddressId: this.tempbillToAddress.legalEntityBillingAddressId };
					if (typeof this.addressFormForBilling.country == 'number') {
						this.addressFormForBilling = { ...this.addressFormForBilling, country: getObjectByValue('value', this.addressFormForBilling.country, this.allCountriesList) };
					} else {
						this.addressFormForBilling = { ...this.addressFormForBilling, country: getObjectByValue('label', this.addressFormForBilling.country, this.allCountriesList) };
					}
				})
			} else {
				// const countryName = this.tempbillToAddress.country.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
				this.addressFormForBilling = { ...this.tempbillToAddress, siteName: this.tempbillToAddress.siteName, legalEntityBillingAddressId: this.tempbillToAddress.legalEntityBillingAddressId };
				if (typeof this.addressFormForBilling.country == 'number') {
					this.addressFormForBilling = { ...this.addressFormForBilling, country: getObjectByValue('value', this.addressFormForBilling.country, this.allCountriesList) };
				} else {
					this.addressFormForBilling = { ...this.addressFormForBilling, country: getObjectByValue('label', this.addressFormForBilling.country, this.allCountriesList) };
				}
			}

		}
	}

	private loadManagementdata() {
		this.legalEntityService.getManagemententity().subscribe(
			results => this.onManagemtntdataLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);
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

	private onDataLoadFailed(error: any) { }

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
		this.tempNewPNArray = [];
		let newParentObject = new CreatePOPartsList()
		if (this.newData) {
			const data = this.newData.map(x => {
				if (x.addAllMultiPNRows) {

					const newObject = {
						...newParentObject,
						partNumberId: getObjectById('value', x.itemMasterId, this.allPartnumbersInfo)
					}
					this.getManagementStructureForParentEdit(newObject);
					this.getPNDetailsById(newObject)
					this.partListData = [...this.partListData, newObject]
				}
			})

			for (let i = 0; i < this.partListData.length; i++) {
				if (!this.partListData[i].ifSplitShip) {
					this.partListData[i].childList = [];
				}
			}
		}
		this.partNumbers = null;
		this.addAllMultiPN = false;
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
		//this.array = [];
		this.newPNList = [];
		this.newData = [];
		this.addAllMultiPN = false;
	}

	addPartNumber() {
		this.inputValidCheck = false;
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

	addRow(partList) {
		partList.childList.push(new PartDetails());
		if (partList.parentCompanyId) {
			for (let i = 0; i < partList.childList.length; i++) {
				if (i == partList.childList.length - 1) {
					partList.childList[i].childCompanyId = partList.parentCompanyId;
					this.getChildBUList(partList.childList[i]);
				}
			}
		}
		if (partList.parentbuId) {
			for (let i = 0; i < partList.childList.length; i++) {
				if (i == partList.childList.length - 1 && partList.childList[i].childCompanyId !== 0) {
					partList.childList[i].childbuId = partList.parentbuId;
					this.getChildDivisionlist(partList.childList[i]);
				}
			}
		}
		if (partList.parentDivisionId) {
			for (let i = 0; i < partList.childList.length; i++) {
				if (i == partList.childList.length - 1 && partList.childList[i].childbuId !== 0) {
					partList.childList[i].childDivisionId = partList.parentDivisionId;
					this.getChildDeptlist(partList.childList[i]);
				}
			}
		}
		if (partList.parentDeptId) {
			for (let i = 0; i < partList.childList.length; i++) {
				if (i == partList.childList.length - 1 && partList.childList[i].childDivisionId !== 0) {
					partList.childList[i].childDeptId = partList.parentDeptId;
					this.getChildDeptId(partList.childList[i]);
				}
			}
		}
	}

	// addRow(partList) {
	// 	console.log(partList);

	// 	partList.childList.push(new PartDetails());
	// 	for (let i = 0; i < partList.childList.length; i++) {
	// 		if (i == partList.childList.length - 1) {
	// 			partList.childList.map(x => {
	// 				console.log(x);
	// 				console.log(partList.managementStructureId);
	// 				return {
	// 					...x,
	// 					childCompanyId: this.getAddRowCompanyId(partList),
	// 					childbuId: this.getAddRowBUId(partList),
	// 					childDivisionId: this.getAddRowDivisionId(partList),
	// 					childDeptId: this.getAddRowDeptId(partList),
	// 					managementStructureId: partList.managementStructureId,

	// 				}
	// 			})
	// 			this.splitAddressData = [];
	// 			console.log(partList.childList);
	// 		}
	// 	}
	// }	


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

	private loadCurrencyData() {
		this.currencyService.getCurrencyList().subscribe(currencydata => {
			console.log(currencydata)
			this.allCurrencyData = currencydata[0];
		})
	}

	clearInputShipTo() {
		this.sourcePoApproval.shipToUserId = null;
		this.sourcePoApproval.shipToAddressId = "null";
		this.sourcePoApproval.shipToContactId = null;
		this.sourcePoApproval.shipToMemo = '';
		this.sourcePoApproval.shipViaId = "null";
		this.sourcePoApproval.shippingCost = null;
		this.sourcePoApproval.handlingCost = null;
		this.sourcePoApproval.shippingAcctNum = null;
		this.sourcePoApproval.shippingId = null;
		this.sourcePoApproval.shippingURL = '';
		this.shipToAddress = {};
		this.shipViaList = [];
		this.shipToCusData = [];
		this.vendorSelected = [];
		this.companySiteList_Shipping = [];
	}

	clearInputOnClickUserIdShipTo() {
		this.sourcePoApproval.shipToAddressId = "null";
		this.sourcePoApproval.shipToContactId = null;
		this.sourcePoApproval.shipToMemo = '';
		this.sourcePoApproval.shipViaId = "null";
		this.sourcePoApproval.shippingCost = null;
		this.sourcePoApproval.handlingCost = null;
		this.sourcePoApproval.shippingAcctNum = null;
		this.sourcePoApproval.shippingId = null;
		this.sourcePoApproval.shippingURL = '';
		this.shipToAddress = {};
		this.shipViaList = [];
		this.shipToCusData = [];
		this.vendorSelected = [];
		this.companySiteList_Shipping = [];
	}

	clearInputBillTo() {
		this.sourcePoApproval.billToUserId = null;
		this.sourcePoApproval.billToAddressId = "null";
		this.sourcePoApproval.billToContactId = null;
		this.billToAddress = {};
		this.sourcePoApproval.billToMemo = '';
		this.billToCusData = [];
		this.vendorSelectedForBillTo = [];
		this.companySiteList_Billing = [];
	}

	clearInputOnClickUserIdBillTo() {
		this.sourcePoApproval.billToAddressId = "null";
		this.sourcePoApproval.billToContactId = null;
		this.billToAddress = {};
		this.sourcePoApproval.billToMemo = '';
		this.billToCusData = [];
		this.vendorSelectedForBillTo = [];
		this.companySiteList_Billing = [];
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

	filterVendorNames(event) {
		this.vendorNames = this.allActions;

		if (event.query !== undefined && event.query !== null) {
			const vendorFilter = [...this.allActions.filter(x => {
				return x.vendorName.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.vendorNames = vendorFilter;
		}
	}

	selectedVendorName(value) {
		console.log(value);
		this.vendorContactList = [];
		this.getVendorContactsListByID(value.vendorId);
		this.getVendorCapesByID(value.vendorId);
		this.sourcePoApproval.vendorName = value.vendorName;
		this.sourcePoApproval.vendorCode = getObjectById('vendorId', value.vendorId, this.allActions);
		this.sourcePoApproval.creditLimit = value.creditLimit;
		this.sourcePoApproval.creditTermsId = value.creditTermsId;
        if (this.sourcePoApproval.creditTerms != undefined) {
            this.sourcePoApproval.creditTerms = getValueFromArrayOfObjectById('name ',
                'creditTermsId',
                value.creditTermsId,
                this.allcreditTermInfo);
        }
        //this.sourcePoApproval.creditTermsId = getObjectById('creditTermsId', value.creditTermsId, this.allcreditTermInfo);				
	}

	getVendorCapesByID(vendorId) {

		const status = 'active';

        if(vendorId != undefined) {
            this.vendorService.getVendorCapabilityList(status, vendorId).subscribe(                
               
                results => this.onDataLoadVendorCapsSuccessful(results[0]),
                error => this.onDataLoadFailed(error)
            );
        }

		// this.vendorCapesService.getVendorCapesById(vendorId).subscribe(res => {
		// 	this.vendorCapesInfo = res;
		// })
	}
	public onDataLoadVendorCapsSuccessful(allWorkFlows: any[]) {
       
      
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;      
        this.vendorCapesInfo = allWorkFlows;       
    }

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
				return x.label.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.allPriorityDetails = priority;
		}
	}

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

	filterDiscountPercent(event) {
		this.discountPercentList = this.allPercentData;
		if (event.query !== undefined && event.query !== null) {
			const percentList = [...this.allPercentData.filter(x => {
				return x.percentValue;
			})]
			this.discountPercentList = percentList;
		}
	}

	filterCountries(event) {
		this.countriesList = this.allCountriesList;
		if (event.query !== undefined && event.query !== null) {
			const countries = [...this.allCountriesList.filter(x => {
				return x.label.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.countriesList = countries;
		}
	}

	private loadPercentData() {
		//  this.commonService.smartDropDownList('Percent', 'PercentId', 'PercentValue').subscribe(res => {
		// 	this.allPercentData = res;
		//  })
		this.percentService.getPercentages().subscribe(res => {
			this.allPercentData = res[0];
		})
	}

	private onDataLoadSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allActions = allWorkFlows;

	}
	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.vendorService.getWorkFlows().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
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

	employeedata() {
		this.commonService.smartDropDownList('Employee', 'employeeId', 'firstName').subscribe(res => {
			console.log(res);
			this.allEmployeeList = res;
		})
	}

	onDelPNRow(index) {
		this.partListData.splice(index, 1);
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
	}

	onSelectNeedByDate() {
		this.needByTempDate = this.sourcePoApproval.needByDate;
		//if (this.vendorService.isEditMode == false) {
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
		//}
	}

	onGetDiscPerUnit(partList) {
		if (partList.unitCost !== null && partList.discountPercent !== null) {
			const discountPercentValue = getValueFromObjectByKey('percentValue', partList.discountPercent);
			partList.discountPerUnit = Math.round((partList.unitCost * discountPercentValue) / 100);
			//partList.discountPerUnit = Math.round(partList.unitCost * ((discountPercentValue / 100)-1));
		}
	}

	onGetDiscAmount(partList) {
		if (partList.discountPerUnit !== null && partList.quantityOrdered !== null) {
			//const discountPerUnitValue = getValueFromObjectByKey('percentValue', partList.discountPerUnit)
			partList.discountAmount = partList.discountPerUnit * partList.quantityOrdered;
		}
	}

	onGetExtCost(partList) {
		if (partList.quantityOrdered !== null && partList.unitCost !== null && partList.discountAmount !== null) {
			partList.extendedCost = (partList.quantityOrdered * partList.unitCost) - partList.discountAmount;
		}
	}

	async getVendorContactsListByID(vendorId) {
		await this.vendorService.getVendorContactsListByID(vendorId).subscribe(data => {
			console.log(data)
			this.vendorContactList = data[0];
			const isDefaultContact = this.vendorContactList.filter(x => {
				if (x.isDefaultContact === true) {
					return x;
				} else return x;
			})
			this.sourcePoApproval.vendorContactId = isDefaultContact[0];
			this.sourcePoApproval.vendorContactPhone = isDefaultContact[0];
		})
	}

	async getVendorContactsListByIDEdit(res) {
		await this.vendorService.getVendorContactsListByID(res.vendorId).subscribe(data => {
			this.vendorContactList = data[0];
			const isContact = this.vendorContactList.filter(x => {
				if (x.vendorContactId === res.vendorContactId) {
					return x;
				}
			})
			this.sourcePoApproval.vendorContactId = isContact[0];
			this.sourcePoApproval.vendorContactPhone = isContact[0];
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
		if (obj.value) {
			return obj.value;
		}
	}

	getDiscPercentIdByObject(obj) {
		if (obj.percentId) {
			return obj.percentId;
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
		if (obj.value) {
			return obj.value;
		}
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
		if (obj.value) {
			return obj.value;
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

	getShipViaDetailsForShipTo(id?) {
		this.commonService.getShipViaDetailsByModule(this.sourcePoApproval.shipToUserTypeId, this.shipToSelectedvalue).subscribe(response => {
			this.shipViaList = response;
			if (id) {
				this.sourcePoApproval.shipViaId = id;
				this.getShipViaDetails(id);
			}
		})
	}

	resetAddressShippingForm() {
		this.addressFormForShipping = new CustomerShippingModel();
		this.isEditModeShipping = false;
	}

	resetAddressBillingForm() {
		this.addressFormForBilling = new CustomerShippingModel();
		this.isEditModeBilling = false;
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
			const customerData = { ...data, isPrimary: true, customerId: getValueFromObjectByKey('value', this.sourcePoApproval.shipToUserId), country: getValueFromObjectByKey('value', data.country) }
			if (!this.isEditModeShipping) {
				await this.customerService.newShippingAdd(customerData).subscribe(response => {
					this.onShipToCustomerSelected(customerData.customerId, this.sourcePoApproval, response.customerShippingId);
					// this.addressFormForShipping = new CustomerShippingModel()
					this.alertService.showMessage(
						'Success',
						`Saved Shipping Information Successfully`,
						MessageSeverity.success
					);
				})
			} else {
				await this.customerService.newShippingAdd(customerData).subscribe(response => {
					this.onShipToCustomerSelected(customerData.customerId, this.sourcePoApproval, response.customerShippingId);
					this.alertService.showMessage(
						'Success',
						`Updated Shipping Information Successfully`,
						MessageSeverity.success
					);
				})
			}
		}
		if (this.sourcePoApproval.shipToUserTypeId == 2) {
			const vendorData = { ...data, vendorId: getValueFromObjectByKey('vendorId', this.sourcePoApproval.shipToUserId), country: getValueFromObjectByKey('label', data.country) }
			if (!this.isEditModeShipping) {
				await this.vendorService.newShippingAdd(vendorData).subscribe(response => {
					this.onShipToVendorSelected(vendorData.vendorId, this.sourcePoApproval, response.vendorShippingAddressId);
					// this.addressFormForShipping = new CustomerShippingModel()
					this.alertService.showMessage(
						'Success',
						`Saved Shipping Information Successfully `,
						MessageSeverity.success
					);

				})
			} else {
				await this.vendorService.newShippingAdd(vendorData).subscribe(response => {
					this.onShipToVendorSelected(vendorData.vendorId, this.sourcePoApproval, response.vendorShippingAddressId);
					this.alertService.showMessage(
						'Success',
						`Updated Shipping Information Successfully`,
						MessageSeverity.success
					);
				})
			}
		}
		if (this.sourcePoApproval.shipToUserTypeId == 3) {
			const companyData = { ...data, legalentityId: getValueFromObjectByKey('value', this.sourcePoApproval.shipToUserId), country: getValueFromObjectByKey('label', data.country) }
			if (!this.isEditModeShipping) {
				await this.companyService.addNewShippingAddress(companyData).subscribe(response => {
					this.onShipToCompanySelected(null, this.sourcePoApproval, response.legalEntityShippingAddressId);
					// this.addressFormForShipping = new CustomerShippingModel()
					this.alertService.showMessage(
						'Success',
						`Saved Shipping Information Successfully `,
						MessageSeverity.success
					);
				})
			} else {
				// const companyData = {
				// 	...this.addressFormForShippingCompany,
				// 	createdBy: this.userName,
				// 	updatedBy: this.userName,
				// 	masterCompanyId: 1,
				// 	isActive: true,	
				// 	legalentityId: getValueFromObjectByKey('value', this.sourcePoApproval.shipToUserId)
				// }
				await this.companyService.addNewShippingAddress(companyData).subscribe(response => {
					this.onShipToCompanySelected(null, this.sourcePoApproval, response.legalEntityShippingAddressId);
					this.alertService.showMessage(
						'Success',
						`Updated Shipping Information Successfully`,
						MessageSeverity.success
					);
				})
			}
		}
	}

	saveShippingAddressToPO() {
		if (this.sourcePoApproval.shipToUserTypeId == 1) {
			for (let i = 0; i < this.shipToCusData.length; i++) {
				if (this.shipToCusData[i].customerShippingAddressId == 0) {
					this.shipToCusData.splice(i, 1);;
				}
			}
			const addressInfo = {
				...this.addressFormForShipping,
				country: getValueFromObjectByKey('label', this.addressFormForShipping.country),
				countryName: getValueFromObjectByKey('label', this.addressFormForShipping.country),
				customerShippingAddressId: 0
			}
			this.shipToCusData.push(addressInfo);
			this.shipToCusData.map(x => {
				if (x.customerShippingAddressId == 0) {
					this.sourcePoApproval.shipToAddressId = x.customerShippingAddressId;
				}
			});
			this.onShipToGetAddress(this.sourcePoApproval, this.sourcePoApproval.shipToAddressId);
		}
		if (this.sourcePoApproval.shipToUserTypeId == 2) {
			for (let i = 0; i < this.vendorSelected.length; i++) {
				if (this.vendorSelected[i].vendorShippingAddressId == 0) {
					this.vendorSelected.splice(i, 1);;
				}
			}
			const addressInfo = {
				...this.addressFormForShipping,
				country: getValueFromObjectByKey('label', this.addressFormForShipping.country),
				countryName: getValueFromObjectByKey('label', this.addressFormForShipping.country),
				vendorShippingAddressId: 0
			}
			this.vendorSelected.push(addressInfo);
			this.vendorSelected.map(x => {
				if (x.vendorShippingAddressId == 0) {
					this.sourcePoApproval.shipToAddressId = x.vendorShippingAddressId;
				}
			});
			this.onShipToGetAddress(this.sourcePoApproval, this.sourcePoApproval.shipToAddressId);
		}
		if (this.sourcePoApproval.shipToUserTypeId == 3) {
			for (let i = 0; i < this.companySiteList_Shipping.length; i++) {
				if (this.companySiteList_Shipping[i].legalEntityShippingAddressId == 0) {
					this.companySiteList_Shipping.splice(i, 1);;
				}
			}
			const addressInfo = {
				...this.addressFormForShipping,
				country: getValueFromObjectByKey('label', this.addressFormForShipping.country),
				countryName: getValueFromObjectByKey('label', this.addressFormForShipping.country),
				legalEntityShippingAddressId: 0
			}
			this.companySiteList_Shipping.push(addressInfo);
			this.companySiteList_Shipping.map(x => {
				if (x.legalEntityShippingAddressId == 0) {
					this.sourcePoApproval.shipToAddressId = x.legalEntityShippingAddressId;
				}
			});
			this.shipToAddress = addressInfo;
			if (this.shipToAddress.country) {
				this.shipToAddress.country = addressInfo.country ? getValueFromArrayOfObjectById('label', 'value', addressInfo.country, this.countriesList) : '';
			}

			//this.onShipToGetCompanyAddressThisPO(this.sourcePoApproval.shipToAddressId);
		}
		if (!this.isEditModeShipping) {
			this.alertService.showMessage(
				'Success',
				`Saved Shipping Information Successfully`,
				MessageSeverity.success
			);
		} else {
			this.alertService.showMessage(
				'Success',
				`Updated Shipping Information Successfully`,
				MessageSeverity.success
			);
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
			const customerData = { ...data, customerId: getValueFromObjectByKey('value', this.sourcePoApproval.billToUserId), country: getValueFromObjectByKey('value', data.country) }
			if (!this.isEditModeBilling) {
				await this.customerService.newBillingAdd(customerData).subscribe(response => {
					this.onBillToCustomerSelected(customerData.customerId, this.sourcePoApproval, response.customerBillingAddressId);
					// this.addressFormForBilling = new CustomerShippingModel()
					this.alertService.showMessage(
						'Success',
						`Saved  Billing Information Sucessfully `,
						MessageSeverity.success
					);
				})
			} else {
				await this.customerService.newBillingAdd(customerData).subscribe(response => {
					this.onBillToCustomerSelected(customerData.customerId, this.sourcePoApproval, response.customerBillingAddressId);
					this.alertService.showMessage(
						'Success',
						`Updated Billing Information Successfully`,
						MessageSeverity.success
					);
				})
			}

		}
		if (this.sourcePoApproval.billToUserTypeId == 2) {
			const vendorData = { ...data, vendorId: getValueFromObjectByKey('vendorId', this.sourcePoApproval.billToUserId), country: getValueFromObjectByKey('label', data.country) }
			if (!this.isEditModeBilling) {
				await this.vendorService.addNewBillingAddress(vendorData).subscribe(response => {
					this.onBillToVendorSelected(vendorData.vendorId, this.sourcePoApproval, response.vendorBillingAddressId);
					//this.onBillCompanySelected();
					// this.addressFormForBilling = new CustomerShippingModel()
					this.alertService.showMessage(
						'Success',
						`Saved  Billing Information Sucessfully `,
						MessageSeverity.success
					);
				})
			} else {
				await this.vendorService.addNewBillingAddress(vendorData).subscribe(response => {
					this.onBillToVendorSelected(vendorData.vendorId, this.sourcePoApproval, response.vendorBillingAddressId);
					this.alertService.showMessage(
						'Success',
						`Updated Billing Information Successfully`,
						MessageSeverity.success
					);
				})
			}
		}
		if (this.sourcePoApproval.billToUserTypeId == 3) {
			const companyData = { ...data, legalentityId: getValueFromObjectByKey('value', this.sourcePoApproval.billToUserId), country: getValueFromObjectByKey('label', data.country) }
			if (!this.isEditModeBilling) {
				await this.companyService.addNewBillingAddress(companyData).subscribe(response => {
					this.onBillToCompanySelected(null, this.sourcePoApproval, response.legalEntityBillingAddressId);
					// this.addressFormForBilling = new CustomerShippingModel()
					this.alertService.showMessage(
						'Success',
						`Saved  Billing Information Sucessfully `,
						MessageSeverity.success
					);
				})
			} else {
				await this.companyService.addNewBillingAddress(companyData).subscribe(response => {
					this.onBillToCompanySelected(null, this.sourcePoApproval, response.legalEntityBillingAddressId);
					this.alertService.showMessage(
						'Success',
						`Updated Billing Information Successfully`,
						MessageSeverity.success
					);
				})
			}
		}
		// this.onBillCompanySelected();
	}

	saveBillingAddressToPO() {
		if (this.sourcePoApproval.billToUserTypeId == 1) {
			for (let i = 0; i < this.billToCusData.length; i++) {
				if (this.billToCusData[i].customerBillingAddressId == 0) {
					this.billToCusData.splice(i, 1);;
				}
			}
			const addressInfo = {
				...this.addressFormForBilling,
				country: getValueFromObjectByKey('label', this.addressFormForBilling.country),
				countryName: getValueFromObjectByKey('label', this.addressFormForBilling.country),
				customerBillingAddressId: 0
			}
			this.billToCusData.push(addressInfo);
			this.billToCusData.map(x => {
				if (x.customerBillingAddressId == 0) {
					this.sourcePoApproval.billToAddressId = x.customerBillingAddressId;
				}
			});
			this.onBillToGetAddress(this.sourcePoApproval, this.sourcePoApproval.billToAddressId);
		}
		if (this.sourcePoApproval.billToUserTypeId == 2) {
			for (let i = 0; i < this.vendorSelectedForBillTo.length; i++) {
				if (this.vendorSelectedForBillTo[i].vendorBillingAddressId == 0) {
					this.vendorSelectedForBillTo.splice(i, 1);;
				}
			}
			const addressInfo = {
				...this.addressFormForBilling,
				country: getValueFromObjectByKey('label', this.addressFormForBilling.country),
				countryName: getValueFromObjectByKey('label', this.addressFormForBilling.country),
				vendorBillingAddressId: 0
			}
			this.vendorSelectedForBillTo.push(addressInfo);
			this.vendorSelectedForBillTo.map(x => {
				if (x.vendorBillingAddressId == 0) {
					this.sourcePoApproval.billToAddressId = x.vendorBillingAddressId;
				}
			});
			this.billToAddress = addressInfo;
			// if(this.billToAddress.country) {
			// 	this.billToAddress.country = this.addressFormForBilling.country ? getValueFromArrayOfObjectById('label', 'value', this.addressFormForBilling.country, this.countriesList) : '';
			// }

			//this.onBillToGetAddress(this.sourcePoApproval, this.sourcePoApproval.billToAddressId);
		}
		if (this.sourcePoApproval.billToUserTypeId == 3) {
			for (let i = 0; i < this.companySiteList_Billing.length; i++) {
				if (this.companySiteList_Billing[i].legalEntityBillingAddressId == 0) {
					this.companySiteList_Billing.splice(i, 1);;
				}
			}
			const addressInfo = {
				...this.addressFormForBilling,
				country: getValueFromObjectByKey('label', this.addressFormForBilling.country),
				countryName: getValueFromObjectByKey('label', this.addressFormForBilling.country),
				legalEntityBillingAddressId: 0
			}
			this.companySiteList_Billing.push(addressInfo);
			this.companySiteList_Billing.map(x => {
				if (x.legalEntityBillingAddressId == 0) {
					this.sourcePoApproval.billToAddressId = x.legalEntityBillingAddressId;
				}
			});
			this.billToAddress = addressInfo;
			// if(this.billToAddress.country) {
			// 	this.billToAddress.country = addressInfo.country ? getValueFromArrayOfObjectById('label', 'value', addressInfo.country, this.countriesList) : '';
			// }			
		}
		if (!this.isEditModeBilling) {
			this.alertService.showMessage(
				'Success',
				`Saved Billing Information Successfully`,
				MessageSeverity.success
			);
		} else {
			this.alertService.showMessage(
				'Success',
				`Updated Billing Information Successfully`,
				MessageSeverity.success
			);
		}
	}


	resetAddressShipViaForm() {
		this.addShipViaFormForShipping = new CustomerInternationalShipVia();
		this.isEditModeShipVia = false;
	}

	async saveShipViaForShipTo() {
		this.sourcePoApproval.shipViaId = "null";
		this.sourcePoApproval.shippingAcctNum = '';
		this.sourcePoApproval.shippingId = '';
		this.sourcePoApproval.shippingURL = '';
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
            const customerData = { ...data, ReferenceId: getValueFromObjectByKey('value', this.sourcePoApproval.shipToUserId), AddressId: this.sourcePoApproval.shipToAddressId ? this.sourcePoApproval.shipToAddressId : 0 }
			if (!this.isEditModeShipVia) {
				await this.commonService.createShipVia(customerData).subscribe(response => {
					this.getShipViaDetailsForShipTo(response.shippingViaId);
					// this.addressFormForShipping = new CustomerShippingModel()
					this.alertService.showMessage(
						'Success',
						`Saved Ship Via Information Sucessfully `,
						MessageSeverity.success
					);
				})
			} else {
				await this.commonService.createShipVia(customerData).subscribe(response => {
					this.getShipViaDetailsForShipTo(response.shippingViaId);
					this.alertService.showMessage(
						'Success',
						`Updated Ship Via Information Sucessfully`,
						MessageSeverity.success
					);
				})
			}
		}
		if (this.sourcePoApproval.shipToUserTypeId == 2) {
            const vendorData = { ...data, ReferenceId: getValueFromObjectByKey('vendorId', this.sourcePoApproval.shipToUserId), AddressId: this.sourcePoApproval.shipToAddressId ? this.sourcePoApproval.shipToAddressId : 0 }
			if (!this.isEditModeShipVia) {
				await this.commonService.createShipVia(vendorData).subscribe(response => {
					this.getShipViaDetailsForShipTo(response.shippingViaId);
					// this.addressFormForShipping = new CustomerShippingModel()
					this.alertService.showMessage(
						'Success',
						`Saved  Ship Via Information Sucessfully `,
						MessageSeverity.success
					);

				})
			} else {
				await this.commonService.createShipVia(vendorData).subscribe(response => {
					this.getShipViaDetailsForShipTo(response.shippingViaId);
					this.alertService.showMessage(
						'Success',
						`Updated Ship Via Information Sucessfully`,
						MessageSeverity.success
					);
				})
			}

		}
		if (this.sourcePoApproval.shipToUserTypeId == 3) {
            const companyData = { ...data, ReferenceId: getValueFromObjectByKey('value', this.sourcePoApproval.shipToUserId), AddressId: this.sourcePoApproval.shipToAddressId ? this.sourcePoApproval.shipToAddressId : 0 }
			if (!this.isEditModeShipVia) {
				await this.commonService.createShipVia(companyData).subscribe(response => {
					this.getShipViaDetailsForShipTo(response.shippingViaId);
					// this.addressFormForShipping = new CustomerShippingModel()
					this.alertService.showMessage(
						'Success',
						`Saved  Ship Via Information Sucessfully `,
						MessageSeverity.success
					);
				})
			} else {
				await this.commonService.createShipVia(companyData).subscribe(response => {
					this.getShipViaDetailsForShipTo(response.shippingViaId);
					this.alertService.showMessage(
						'Success',
						`Updated Ship Via Information Sucessfully`,
						MessageSeverity.success
					);
				})
			}
		}
	}

	resetAddressForm() {
		this.addNewAddress = new AddressNew();
		this.isEditModeSplitAddress = false;
	}
	// createNewAddress() {
	// 	const data = {
	// 		...this.addNewAddress,
	// 		createdBy: this.userName,
	// 		updatedBy: this.userName,
	// 		masterCompanyId: 1,
	// 		isActive: true,
	// 	}
	// 	this.commonService.createAddress(data).subscribe(res => {
	// 		this.onCustomerNameChange();
	// 		this.onVendorNameChange();

	// 		// this.resetAddressForm();
	// 		this.alertService.showMessage(
	// 			'Success',
	// 			`Saved Address  Sucessfully `,
	// 			MessageSeverity.success
	// 		);
	// 	})
	// }

	async saveSplitAddress() {
		const data = {
			...this.addNewAddress,
			address1: this.addNewAddress.line1,
			address2: this.addNewAddress.line2,
			// address3: this.addNewAddress.line3,
			createdBy: this.userName,
			updatedBy: this.userName,
			masterCompanyId: 1,
			isActive: true,
			//customerShippingAddressId: null,
		}
		if (this.tempSplitPart.partListUserTypeId == 1) {
			const customerData = { ...data, isPrimary: true, customerId: getValueFromObjectByKey('value', this.tempSplitPart.partListUserId), country: getValueFromObjectByKey('value', data.country) }
			if (!this.isEditModeSplitAddress) {
				await this.customerService.newShippingAdd(customerData).subscribe(res => {
					this.onCustomerNameChange(customerData.customerId, null, this.parentIndex, this.childIndex); //res.customerId
					this.alertService.showMessage(
						'Success',
						`Saved Address Successfully`,
						MessageSeverity.success
					);
				})
			} else {
				await this.customerService.newShippingAdd(customerData).subscribe(res => {
					this.onCustomerNameChange(customerData.customerId, null, this.parentIndex, this.childIndex);
					this.alertService.showMessage(
						'Success',
						`Updated Address Successfully`,
						MessageSeverity.success
					);
				})
			}
		}
		if (this.tempSplitPart.partListUserTypeId == 2) {
			const vendorData = { ...data, vendorId: getValueFromObjectByKey('vendorId', this.tempSplitPart.partListUserId), country: getValueFromObjectByKey('label', data.country) }
			if (!this.isEditModeSplitAddress) {
				await this.vendorService.newShippingAdd(vendorData).subscribe(res => {
					this.onVendorNameChange(vendorData.vendorId, null, this.parentIndex, this.childIndex);
					this.alertService.showMessage(
						'Success',
						`Saved Address Successfully`,
						MessageSeverity.success
					);
				})
			} else {
				await this.vendorService.newShippingAdd(vendorData).subscribe(res => {
					this.onVendorNameChange(vendorData.vendorId, null, this.parentIndex, this.childIndex);
					this.alertService.showMessage(
						'Success',
						`Updated Address Successfully`,
						MessageSeverity.success
					);
				})
			}
		}
		if (this.tempSplitPart.partListUserTypeId == 3) {
			const companyData = { ...data, legalentityId: getValueFromObjectByKey('value', this.tempSplitPart.partListUserId), siteName: "", country: getValueFromObjectByKey('label', data.country) }
			if (!this.isEditModeSplitAddress) {
				await this.companyService.addNewShippingAddress(companyData).subscribe(res => {
					this.onCompanyNameChange(companyData.legalentityId, null, this.parentIndex, this.childIndex); //res.legalEntityId
					this.alertService.showMessage(
						'Success',
						`Saved Address Successfully`,
						MessageSeverity.success
					);
				})
			} else {
				await this.companyService.addNewShippingAddress(companyData).subscribe(res => {
					this.onCompanyNameChange(companyData.legalentityId, null, this.parentIndex, this.childIndex);
					this.alertService.showMessage(
						'Success',
						`Updated Address Successfully`,
						MessageSeverity.success
					);
				})
			}
		}
	}

	saveSplitAddressToPO() {
		//if (this.tempSplitPart.partListUserTypeId == 1) {
		for (let i = 0; i < this.tempSplitAddressData.length; i++) {
			if (this.tempSplitAddressData[i].addressId == 0) {
				this.tempSplitAddressData.splice(i, 1);;
			}
		}
		const addressInfo = {
			...this.addNewAddress,
			country: getValueFromObjectByKey('label', this.addNewAddress.country),
			countryName: getValueFromObjectByKey('label', this.addNewAddress.country),
			addressId: 0,
			address1: this.addNewAddress.line1,
			address2: this.addNewAddress.line2,
			// address3: this.addNewAddress.line3,
		}
		this.tempSplitAddressData.push(addressInfo);
		this.tempSplitAddressData.map(x => {
			if (x.addressId == 0) {
				this.tempSplitPart.partListAddressId = x.addressId;
				//this.tempSplitPart.address1 = addressInfo.address1;
			}
		});
		this["splitAddressData" + this.parentIndex + this.childIndex] = this.tempSplitAddressData;

		if (!this.isEditModeSplitAddress) {
			this.alertService.showMessage(
				'Success',
				`Saved Address Successfully`,
				MessageSeverity.success
			);
		} else {
			this.alertService.showMessage(
				'Success',
				`Updated Address Successfully`,
				MessageSeverity.success
			);
		}
		//this.shipToAddress = getObjectById('customerShippingAddressId', id, this.shipToCusData);
		//this.onShipToGetAddress(this.sourcePoApproval, this.sourcePoApproval.shipToAddressId);
		//}
		// if (this.tempSplitPart.partListUserTypeId == 2) {
		// 	for(let i=0; i < this.vendorSelected.length; i++) {
		// 		if(this.vendorSelected[i].vendorShippingAddressId == 0) {
		// 			this.vendorSelected.splice(i, 1);;
		// 		}
		// 	}
		// 	const addressInfo = {
		// 		...this.addressFormForShipping,
		// 		vendorShippingAddressId: 0
		// 	}
		// 	this.vendorSelected.push(addressInfo);
		// 	this.vendorSelected.map(x => {
		// 		if(x.vendorShippingAddressId == 0) {
		// 			this.sourcePoApproval.shipToAddressId = x.vendorShippingAddressId;
		// 		}
		// 	});
		// 	this.onShipToGetAddress(this.sourcePoApproval, this.sourcePoApproval.shipToAddressId);
		// }
		// if (this.tempSplitPart.partListUserTypeId == 3) {
		// 	for(let i=0; i < this.companySiteList_Shipping.length; i++) {
		// 		if(this.companySiteList_Shipping[i].legalEntityShippingAddressId == 0) {
		// 			this.companySiteList_Shipping.splice(i, 1);;
		// 		}
		// 	}
		// 	const addressInfo = {
		// 		...this.addressFormForShipping,
		// 		legalEntityShippingAddressId: 0
		// 	}
		// 	this.companySiteList_Shipping.push(addressInfo);
		// 	this.companySiteList_Shipping.map(x => {
		// 		if(x.legalEntityShippingAddressId == 0) {
		// 			this.sourcePoApproval.shipToAddressId = x.legalEntityShippingAddressId;
		// 		}
		// 	});
		// 	this.shipToAddress = this.addressFormForShipping;
		// 	//this.onShipToGetCompanyAddressThisPO(this.sourcePoApproval.shipToAddressId);
		// }
	}

	onEditShipVia(data) {
		//if(value == 'EditCustShipVia') {
		this.tempshipVia = getObjectById('shippingViaId', data.shipViaId, this.shipViaList);
		this.addShipViaFormForShipping = { ...this.tempshipVia, shipVia: this.tempshipVia.name };
		console.log(this.addShipViaFormForShipping);
		this.isEditModeShipVia = true;
		//}
	}

	saveShipToShipViaDetailsToPO() {
		//if (this.sourcePoApproval.shipToUserTypeId == 1) {
		for (let i = 0; i < this.shipViaList.length; i++) {
			if (this.shipViaList[i].shippingViaId == 0) {
				this.shipViaList.splice(i, 1);;
			}
		}
		const shipViaInfo = {
			...this.addShipViaFormForShipping,
			shippingViaId: 0,
			name: this.addShipViaFormForShipping.shipVia,
		}
		this.shipViaList.push(shipViaInfo);
		this.shipViaList.map(x => {
			if (x.shippingViaId == 0) {
				this.sourcePoApproval.shipViaId = x.shippingViaId;
			}
		});
		this.sourcePoApproval.shipVia = this.addShipViaFormForShipping.shipVia;
		this.sourcePoApproval.shippingAcctNum = this.addShipViaFormForShipping.shippingAccountInfo;
		this.sourcePoApproval.shippingURL = this.addShipViaFormForShipping.shippingURL;
		this.sourcePoApproval.shippingId = this.addShipViaFormForShipping.shippingId;
		if (!this.isEditModeShipVia) {
			this.alertService.showMessage(
				'Success',
				`Saved ShipVia Successfully`,
				MessageSeverity.success
			);
		} else {
			this.alertService.showMessage(
				'Success',
				`Updated ShipVia Successfully`,
				MessageSeverity.success
			);
		}

		//}
	}

	onClickPartsListAddress(value, splitPart, pindex?, cindex?) {
		this.tempSplitPart = splitPart;
		this.parentIndex = pindex;
		this.childIndex = cindex;
		this.tempSplitAddressData = this["splitAddressData" + pindex + cindex];
		if (value === 'Add') {
			this.addressHeader = 'Add Split Shipment Address';
			this.resetAddressForm();
		}
		if (value === 'Edit') {
			this.addressHeader = 'Edit Split Shipment Address';
			this.isEditModeSplitAddress = true;
			this.tempSplitAddress = getObjectById('addressId', splitPart.partListAddressId, this["splitAddressData" + pindex + cindex]);
			// const countryName = this.tempSplitAddress.country.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
			this.addNewAddress = {
				...this.tempSplitAddress,
				line1: this.tempSplitAddress.address1,
				line2: this.tempSplitAddress.address2,
				// line3: this.tempSplitAddress.address3,
				//country: getObjectByValue('value', this.tempSplitAddress.country, this.allCountriesList)
			};
			if (typeof this.tempSplitAddress.country == 'number') {
				this.addNewAddress = { ...this.addNewAddress, country: getObjectByValue('value', this.tempSplitAddress.country, this.allCountriesList) }
			} else {
				this.addNewAddress = { ...this.addNewAddress, country: getObjectByValue('label', this.tempSplitAddress.country, this.allCountriesList) }
			}

		}
	}



	onChangeParentQtyOrdered(event, partList) {
		console.log(partList);
		this.parentQty = event.target.value;
		if (partList.childList) {
			this.onChangeChildQtyOrdered(partList);
		}
	}

	onChangeChildQtyOrdered(partList) {
		this.childOrderQtyArray = [];
		this.childOrderQtyTotal = null;
		this.parentQty = this.parentQty ? this.parentQty : partList.quantityOrdered;
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

	filterVenContactFirstNames(event) {
		this.venContactFirstNames = this.venContactList;
		if (event.query !== undefined && event.query !== null) {
			const firstNames = [...this.venContactList.filter(x => {
				return x.firstName.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.venContactFirstNames = firstNames;
		}
	}
	filterVenContactLastNames(event) {
		this.venContactLastNames = this.venContactList;
		if (event.query !== undefined && event.query !== null) {
			const lastNames = [...this.venContactList.filter(x => {
				return x.lastName.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.venContactLastNames = lastNames;
		}
	}
	filterVenContactMiddleNames(event) {
		this.venContactMiddleNames = this.venContactList;
		if (event.query !== undefined && event.query !== null) {
			const middleNames = [...this.venContactList.filter(x => {
				return x.middleName;
				//.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.venContactLastNames = middleNames;
		}
	}

	resetVenContactInfo() {
		this.vendorContactInfo = new Object();
	}

	addContactForVendor() {
		console.log(this.sourcePoApproval.vendorId);
		let vendorContactInfo = {
			...this.vendorContactInfo,
			firstName: editValueAssignByCondition('firstName', this.vendorContactInfo.firstName),
			middleName: editValueAssignByCondition('middleName', this.vendorContactInfo.middleName),
			lastName: editValueAssignByCondition('lastName', this.vendorContactInfo.lastName),
			vendorId: editValueAssignByCondition('vendorId', this.sourcePoApproval.vendorId)
		}
		this.vendorService.newAddContactInfo(vendorContactInfo).subscribe(res => {
			console.log(res);
			this.getVendorContactsListByID(vendorContactInfo.vendorId);
		})

		// if (!(this.sourceVendor.firstName && this.sourceVendor.lastName && this.sourceVendor.workPhone &&
		//     this.sourceVendor.email
		// )) {
		//     //this.display = true;
		//     this.modelValue = true;
		// }
		// if (this.sourceVendor.firstName && this.sourceVendor.lastName && this.sourceVendor.workPhone &&
		//     this.sourceVendor.email) {
		//     if (!this.sourceVendor.vendorId) {
		//         this.sourceVendor.createdBy = this.userName;
		//         this.sourceVendor.updatedBy = this.userName;
		//         this.sourceVendor.masterCompanyId = 1;
		//         this.isDefault = this.sourceVendor.isDefaultContact;
		//         if(!this.sourceVendor.isDefaultContact){
		//             this.sourceVendor.isDefaultContact = false;
		//         }
		//         // before you commit make sure u don't have conlog, debug, commented code...
		//         this.workFlowtService.newAddContactInfo(this.sourceVendor).subscribe(data => {
		//             console.log(data)
		//             this.localCollection = data;
		//             this.sourceVendor = new Object();
		//             this.localCollection.VendorId = this.local.vendorId;
		//             this.localCollection.ContactId = this.local.contactId;
		//             this.loadData();
		//             if (data) {
		//                 this.updateVendorContact(this.localCollection);
		//                 this.localCollection.isDefaultContact = this.isDefault;
		//                 this.loadData(); // use proper naming conventions
		//             }

		//             this.workFlowtService.contactCollection = this.local;
		//             this.saveCompleted(this.sourceVendor);
		//             this.sourceVendor = {};
		//         })
		//     }
		//     else {
		//         this.sourceVendor.updatedBy = this.userName;
		//         this.sourceVendor.masterCompanyId = 1;
		//         this.workFlowtService.updateContactinfo(this.sourceVendor).subscribe(data => {
		//             this.loadData();
		//             if (data) { this.sourceVendor = new Object(); }
		//             this.savesuccessCompleted(this.sourceVendor);
		//             this.sourceVendor = {};
		//         })
		//     }
		// }

		// else {
		// }       
		// this.workFlowtService.contactCollection = this.local;        
	}

	getFXRate(partList) {
		console.log(partList);
		if ((partList.reportCurrencyId != null || partList.reportCurrencyId != undefined) && (partList.functionalCurrencyId != null || partList.functionalCurrencyId != undefined)) {
			const funcCurrency = editValueAssignByCondition('currencyId', partList.functionalCurrencyId);
			const reportCurrency = editValueAssignByCondition('currencyId', partList.reportCurrencyId);
			if (funcCurrency == reportCurrency) {
				partList.foreignExchangeRate = 1;
			}
		}
	}

	checkValidOnChange(condition, value) {
		if(condition != 'null' && value == "companyId") {
			this.managementValidCheck = false;
		}
		if(condition != 'null' && value == "shipToUserTypeId") {
			this.shipToUserTypeValidCheck = false;
		}
		if(condition != 'null' && value == "shipToAddressId") {
			this.shipToSiteNameValidCheck = false;
		}
		if(condition != 'null' && value == "shipViaId") {
			this.shipViaValidCheck = false;
		}
		if(condition != 'null' && value == "billToUserTypeId") {
			this.billToUserTypeValidCheck = false;
		}
		if(condition != 'null' && value == "billToAddressId") {
			this.billToSiteNameValidCheck = false;
		}
	}

	// getShipToSiteName(data, id) {
	// 	this.shipToAddress = {};
	// 	if (data.shipToUserTypeId == 1) {
	// 		this.shipToAddress = getObjectById('customerShippingAddressId', id, this.shipToCusData);
	// 	} else if (data.shipToUserTypeId == 2) {
	// 		this.shipToAddress = getObjectById('vendorShippingAddressId', id, this.vendorSelected);
	// 	}
	// }

	viewSelectedCapsRow(rowData) {       
        const {vendorCapabilityId} = rowData;
        this.getVendorCapabilitiesView(vendorCapabilityId);     
        this.getVendorCapesAircraftView(vendorCapabilityId);     
    }
    getVendorCapabilitiesView(vendorCapesId) {
		this.vendorCapesService.getVendorCapabilitybyId(vendorCapesId).subscribe(res => {			
			this.vendorCapesGeneralInfo = res;
		})
	}

	getVendorCapesAircraftView(vendorCapesId) {
		this.vendorCapesService.getVendorAircraftGetDataByCapsId(vendorCapesId).subscribe(res => {          
            this.aircraftListDataValues = res.map(x => {
                return {
                    ...x,
                    aircraft: x.aircraftType,
                    model: x.aircraftModel,
                    dashNumber: x.dashNumber,
                    memo: x.memo,
                }
            })
		})
	}

}