﻿import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ConditionService } from '../../../services/condition.service';
import { Condition } from '../../../models/condition.model';
import { fadeInOut } from '../../../services/animations';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Integration } from '../../../models/integration.model';
import { IntegrationService } from '../../../services/integration-service';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { AtaMainService } from '../../../services/atamain.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MenuItem } from 'primeng/api';
import { StocklineService } from '../../../services/stockline.service';
import { MessageSeverity, AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { SiteService } from '../../../services/site.service';
import { Site } from '../../../models/site.model';
import { BinService } from '../../../services/bin.service';
import { LegalEntityService } from '../../../services/legalentity.service';
import { CustomerService } from '../../../services/customer.service';
import { VendorService } from '../../../services/vendor.service';
import { GLAccountClassService } from '../../../services/glaccountclass.service';
import { ItemMasterService } from '../../../services/itemMaster.service';
import { TreeNode, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';//Error Validation Pop Up
import { ManufacturerService } from '../../../services/manufacturer.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
	selector: 'app-stock-line-setup',
	templateUrl: './stock-line-setup.component.html',
	styleUrls: ['./stock-line-setup.component.scss'],
	animations: [fadeInOut]
})
/** stock-line-setup component*/
export class StockLineSetupComponent implements OnInit, AfterViewInit {
	allSites: Site[]
	public sourceBin: any = {};
    allWareHouses: any;
    allLocations: any;
    allShelfs: any;
    wareHouseId: any;
    allBins: any;
    bulist: any[];
    departmentList: any[];
	divisionlist: any[];
	allManagemtninfo: any[] = [];
	copyOfAllManagemtninfo: any[] = [];
	maincompanylist: any[] = [];
	divisionId: any;
	departmentId: any;
	businessUnitId: any;
	companyId: any;
    locationId: any;
    warehouseId: any;
    allintegrationdetails: any[];
    integrationvalues: any[]=[];
    allCustomer: any[];
    allVendorList: any[];
    allGLAccountClassData: any[];
    partCollection: any[];
    itemclaColl: any[];
	allPartnumbersInfo: any[];
	getCompanyListList: any[];
    selectedActionName: any;
    descriptionbyPart: any;
    sourcePartAction: any;
	selectedPartId: any;
	gridData: TreeNode[];
	cols1: any[];
    showManagement: boolean;
    allCompanys: any[];
	selectedOwnerFromValue: string = '';
    AllowEdit: boolean;
    hideSerialNumber: boolean;
	modelValue: boolean;
	allPolistInfo: any[] = [];
	allRolistInfo: any[] = [];
	allEmployeeList: any[] = [];
    showRestrictQuantity: boolean;
	showFreeQuantity: boolean;
	stocklinePOObject: any[] = [];
	stocklineROObject: any[] = [];
	allIntegrationInfo: any[] = [];
	selectedModels: any[] = [];
    collectionofstocklineIntegrationPortalData: any;
    collectionofstockLineTimeLife: any;
	showPartNumberError: boolean;
	disableSaveglAccount: boolean;
	glAccountcla: any[];
	glAccountCollection: any[];
	allglAccountInfo: any[];
	showCompanyError: boolean;
	showNormalQuantity: boolean = true;
    showPartDescriptionError: boolean;
    showConditionError: boolean;
    showSiteError: boolean;
    showReceiveDateError: boolean;
    showReceiverNumberError: boolean;
    showGlAccountNumberError: boolean;
    disableSave: boolean;
    BuHasData: boolean;
    DepaHasData: boolean;
    divHasData: boolean;
    showBuError: boolean;
    showDivError: boolean;
    showDepError: boolean;
    hasSerialized: boolean;
    showSerialNumberError: boolean;
	ngOnInit(): void
	{
		this.stocklineser.currentUrl = '/stocklinemodule/stocklinepages/app-stock-line-setup';
		this.stocklineser.bredcrumbObj.next(this.stocklineser.currentUrl);
		this.loadData();
		this.loadCompanyData();
		this.loadManagementdata();
		this.loadSiteData();
		this.Integration();
		this.loadManufacturerData();
		this.loadPoData();
		this.loadRoData();
		this.loadEmployeeData();
		this.loadIntegrationPortal();
		this.glAccountlistdata();
		
		//this.onDataLoadWareHouse();
		//this.onDataLoadLocation();
		

		
		this.customerList();
		this.vendorList();
		this.loadGlAccountData();
		this.ptnumberlistdata();

		
	}
	selectedObtainFromValue: string = '';
	selectedTracableToValue: string = '';
	showLable: boolean;
	sourceStockLine: any = {};
	sourceStockLineSetup: any = {};
	sourceTimeLife: any = {};
	sourceItemMaster: any = {};
	private isSaving: boolean;
	loadingIndicator: boolean;
	private isEditMode: boolean = false;
	private isDeleteMode: boolean = false;
	isDisabled = true;
	collectionofstockLine: any;
	value: number;
	display: boolean;
	modal: NgbModalRef;
	timeLifeEditAllow: any;
	allConditionInfo: Condition[] = [];
	allManufacturerInfo: any[] = [];

	constructor(public integrationService: IntegrationService,private empService: EmployeeService,public vendorservice: VendorService,public manufacturerService: ManufacturerService,public itemser: ItemMasterService,public glAccountService: GLAccountClassService,public vendorService: VendorService,public customerService: CustomerService,public inteService: IntegrationService,public workFlowtService1: LegalEntityService,public workFlowtService: BinService,public siteService: SiteService,public integration: IntegrationService, public stocklineser: StocklineService, private http: HttpClient, public ataservice: AtaMainService, private changeDetectorRef: ChangeDetectorRef, private router: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public conditionService: ConditionService, private dialog: MatDialog)
	{
		this.dataSource = new MatTableDataSource();
		
		

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
		this.dataSource.data = allWorkFlows;
		this.allPartnumbersInfo = allWorkFlows;


		//console.log(this.allActions);


	}

	private glAccountlistdata() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		let value = "Stock";
		this.itemser.getItemStockList(value).subscribe(
			results => this.onglAccountSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onglAccountSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allglAccountInfo = allWorkFlows;


		//console.log(this.allActions);


	}

	loadPoData()
	{
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.vendorservice.getPurchaseOrderlist().subscribe(
			results => this.onPoListDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	onPoListDataLoadSuccessful(getCreditTermsList: any[])
	{
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getCreditTermsList;

		this.allPolistInfo = getCreditTermsList;

	}

	loadRoData()
	{
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.vendorservice.getRepaireOrderlist().subscribe(
			results => this.onDataLoadRepairOrderDataSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	onDataLoadRepairOrderDataSuccessful(getCreditTermsList: any[])
	{
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getCreditTermsList;
		this.allRolistInfo = getCreditTermsList;

	}

	private Integration() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.inteService.getWorkFlows().subscribe(
			results => this.onIntegrationData(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	loadManufacturerData()
	{
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.manufacturerService.getWorkFlows().subscribe(
			results => this.onmanufacturerSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onmanufacturerSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = allWorkFlows;
		this.allManufacturerInfo = allWorkFlows; 
	}

	private onIntegrationData(getEmployeeCerficationList: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getEmployeeCerficationList;
		this.allintegrationdetails = getEmployeeCerficationList;
		if (this.allintegrationdetails.length > 0) {
			for (let i = 0; i < this.allintegrationdetails.length; i++)
				this.integrationvalues.push(
					{ value: this.allintegrationdetails[i].integrationPortalId, label: this.allintegrationdetails[i].description },


				);
		}
		//let valAirCraft = [];
		//this.itemser.getAircraftManufacturer(this.sourceItemMaster.itemMasterId)
		//	.subscribe(results => {
		//		this.allIntegrationInfo = results;
		//		if (results != null) {
		//			for (let i = 0; i < this.allIntegrationInfo.length; i++) {
		//				valAirCraft.push(this.allIntegrationInfo[i].integrationPortalId);
		//			}
		//			this.selectedAircraftTypes = valAirCraft;
		//			console.log(this.selectedAircraftTypes);
		//		}

		//	},
		//		error => this.onDataLoadFailed(error)
		//	);


	}

	private loadIntegrationPortal() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.integrationService.getWorkFlows().subscribe(
			results => this.onDataLoadIntegrationSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onDataLoadIntegrationSuccessful(allWorkFlows: Integration[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allIntegrationInfo = allWorkFlows;
	}

	public saveSelectedModel(selectedRow, indeex) {

		selectedRow.isBoolean = indeex;
		if (!selectedRow.isListed)
		{
			selectedRow.isListed = false;
		}
		//Moveing getSelectedItem from here Below Code
		let ischange = false;
		if (this.selectedModels.length > 0) {
			//praveen's code//
			this.selectedModels.map((row) => {
				if (selectedRow.integrationPortalId == row.integrationPortalId)
				{
					ischange = true;
				}
			});
		}
		if (!ischange)
		{
			this.selectedModels.push(selectedRow);
		}
		console.log(this.selectedModels);

	}
	public getSelectedItem(selectedRow, event) {
		//;
		let ischange = false;
		selectedRow.isListed = true;
		if (this.selectedModels.length > 0) {
			//praveen's code//
			this.selectedModels.map((row) => {
				if (selectedRow.integrationPortalId == row.integrationPortalId) {
					//selectedRow.isListed = true;
					//row.isListed = event.target.value;
					ischange = true;
				}
			});
		}
		if (!ischange) {
			this.selectedModels.push(selectedRow);
		}
		console.log(this.selectedModels);
    }


    filterpartItems(event) {

        this.partCollection = [];
        this.itemclaColl = [];
        if (this.allPartnumbersInfo) {
            if (this.allPartnumbersInfo.length > 0) {

                for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
                    let partName = this.allPartnumbersInfo[i].partNumber;
                    if (partName) {
                        if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                            this.itemclaColl.push([{
                                "partId": this.allPartnumbersInfo[i].itemMasterId,
                                "partName": partName
                            }]),

                                this.partCollection.push(partName);
                        }
                    }
                }
            }
        }
    }

	//filterpartItems(event) {
	//	this.partCollection = [];
	//	this.itemclaColl = [];
 //       if (this.allPartnumbersInfo && this.allPartnumbersInfo.length > 0) {
 //           this.itemclaColl = this.allPartnumbersInfo.filter(function (partNumberInfo) {
 //               if (partNumberInfo.partNumber.toLowerCase() == event.query.toLowerCase()) {
 //                   this.partCollection.push(partNumberInfo.partNumber);
 //                   return {
 //                       "partId": partNumberInfo.itemMasterId,
 //                       "partName": event.query.toLowerCase()
 //                   };
 //               }
 //           });
 //       }
	//}



	partnmId(event) {
        debugger;
		if (this.itemclaColl) {
			for (let i = 0; i < this.itemclaColl.length; i++) {
				if (event == this.itemclaColl[i][0].partName) {
					this.sourceItemMaster.partId = this.itemclaColl[i][0].partId;
					this.selectedPartId = this.itemclaColl[i][0].partId; //Storing PartId in Local
					//this.disableSavepartNumber = true;
					this.selectedActionName = event;
				}
			}
			this.itemser.getDescriptionbypart(event).subscribe(
				results => this.onpartnumberloadsuccessfull(results[0]),
				error => this.onDataLoadFailed(error)


			);
			//this.disableSavepartDescription = true;
		}
	}



	private onpartnumberloadsuccessfull(allWorkFlows: any[])
	{
		//in This we are Getiing isSerialized,PartDescription,Tage Date,shelfLife,tagType,isPMA,isDER Basedon Part Selection

		this.descriptionbyPart = allWorkFlows[0]
		this.sourcePartAction = this.descriptionbyPart;
        this.sourceStockLineSetup.partDescription = allWorkFlows[0].partDescription; //Passing Part Description based on Change Part
        this.sourceStockLineSetup.shelfLife = allWorkFlows[0].t.shelfLife;
		this.sourceStockLineSetup.isSerialized = allWorkFlows[0].isSerialized;

		if (this.sourceStockLineSetup.isSerialized == true) {
			this.hideSerialNumber = true;
			this.showRestrictQuantity = true;
			this.showFreeQuantity = false;
			this.showNormalQuantity = false;

			this.hasSerialized = true; //for Knowing is Serialized or not for Serial Number 

		}
		else
		{
			this.hideSerialNumber = false;
			this.showRestrictQuantity = false;
			this.showFreeQuantity = true;
			this.showNormalQuantity = false;

			this.hasSerialized = false; //for Knowing is Serialized or not for Serial Number 

		}

		if (allWorkFlows[0].isShelfLifeAvailable == null)
		{
			this.sourceStockLineSetup.shelfLife = false;
		}
		else
		{
			this.sourceStockLineSetup.shelfLife = allWorkFlows[0].isShelfLifeAvailable;
		}

		//if (allWorkFlows[0].tagType == null) {
		//	this.sourceStockLineSetup.tagType = false;
		//}
		//else {
		//	this.sourceStockLineSetup.tagType = allWorkFlows[0].tagType;
		//}
		
		//this.sourceStockLineSetup.tagDate = new Date(allWorkFlows[0].tagDate);

		//if (this.sourceStockLineSetup.tagDate == "0001-01-01T00:00:00" || this.sourceStockLineSetup.tagDate == undefined || this.sourceStockLineSetup.tagDate == "undefined") {
		//	this.sourceStockLineSetup.tagDate = new Date();
		//}
		//else {
		//	this.sourceStockLineSetup.tagDate = new Date(this.sourceStockLineSetup.tagDate);
		//}

		
		this.sourceStockLineSetup.isPMA = allWorkFlows[0].pma;
		this.sourceStockLineSetup.isDER = allWorkFlows[0].der;

		this.sourceTimeLife.timeLife = allWorkFlows[0].isTimeLife;

		if (this.sourceTimeLife.timeLife == true) {
			this.sourceTimeLife.timeLife = true;
		}

		else
		{
			this.sourceTimeLife.timeLife = false;
		}

		this.sourceStockLineSetup.itemMasterId = allWorkFlows[0].itemMasterId;
		this.sourceStockLineSetup.glAccountId = allWorkFlows[0].glAccountId;

	}

	private customerList()
	{
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.customerService.getWorkFlows().subscribe(
			results => this.onCustomerDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onCustomerDataLoadSuccessful(allCustomerFlows: any[])
	{
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allCustomerFlows;
		this.allCustomer = allCustomerFlows;
		
	}

	private vendorList()
	{
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.vendorService.getVendorList().subscribe(
			results => this.onVendorDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	private onVendorDataLoadSuccessful(allVendorWorkFlows: any[])
	{
		//debugger;
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allVendorWorkFlows;
		this.allVendorList = allVendorWorkFlows;


	}

	loadEmployeeData()
	{
		this.empService.getEmployeeList().subscribe(
			results => this.onDataLoadEmployeeSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	onDataLoadEmployeeSuccessful(allWorkFlows: any[])
	{
		this.dataSource.data = allWorkFlows;
		this.allEmployeeList = allWorkFlows;
	}


	private loadGlAccountData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.glAccountService.getWorkFlows().subscribe(
			results => this.onDataLoadGlAccountSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onDataLoadGlAccountSuccessful(allWorkFlows: any[]) {

		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = allWorkFlows;
		this.allGLAccountClassData = allWorkFlows;

	}

	private loadSiteData()  //retriving SIte Information
	{
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.siteService.getSiteList().subscribe(   //Getting Site List Hear
			results => this.onSaiteDataLoadSuccessful(results[0]), //Pasing first Array and calling Method
			error => this.onDataLoadFailed(error)
		);
	}
	

	private onDataLoadWareHouse(getWarehousList: any) { //Storing WareHouse Data

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allWareHouses = getWarehousList; //cha
		//this.warehouseId = this.allWareHouses.warehouseId;

	}

	//GL Account

	glAccountHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedActionName) {
				if (value == this.selectedActionName.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSaveglAccount = true;

				}
				else {
					this.disableSaveglAccount = false;

				}
			}

		}
	}

	glAccountId(event) {
		//
		if (this.glAccountcla) {
			for (let i = 0; i < this.glAccountcla.length; i++) {
				if (event == this.glAccountcla[i][0].glAccountId) {
					this.sourceStockLineSetup.itemMasterId = this.itemclaColl[i][0].ItemMasterId;
				}
			}
		}
	}

	filterglAccount(event) {

		this.glAccountCollection = [];
		this.glAccountcla = [];
		if (this.allglAccountInfo) {
			for (let i = 0; i < this.allglAccountInfo.length; i++) {
				let glAccountId = this.allglAccountInfo[i].glAccountId;

				if (glAccountId) {
					this.glAccountCollection.push(glAccountId);
				}
			}
		}
	}

	
	//private onIntegrationData(getEmployeeCerficationList: any[]) {
	//	// alert('success');
	//	this.alertService.stopLoadingMessage();
	//	this.loadingIndicator = false;
	//	this.dataSource.data = getEmployeeCerficationList;
	//	this.allintegrationdetails = getEmployeeCerficationList;
	//	if (this.allintegrationdetails.length > 0) {
	//		for (let i = 0; i < this.allintegrationdetails.length; i++)
	//			this.integrationvalues.push(
	//				{ value: this.allintegrationdetails[i].integrationPortalId, label: this.allintegrationdetails[i].description },
	//				//{ value: '2', label: 'Shift 1' },
	//				//{ value: '3', label: 'Shift 1' },
	//				//{ value: '4', label: 'Shift 1' },

	//			);
	//	}
	//}



	private onDataLoadLocation(getLocationList: any) { //Storing WareHouse Data

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allLocations = getLocationList; //cha
		//this.locationId = this.allWareHouses.locationId;

	}

	private onDataLoadShelf(getShelfList: any) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allShelfs = getShelfList; //cha
	}

	private onDataLoadBin(getBinList: any)
	{
		this.loadingIndicator = false;
		this.allBins = getBinList; //cha
	}
	private onSaiteDataLoadSuccessful(getSiteList: Site[])
	{ //Storing Site Data
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getSiteList; //need
		this.allSites = getSiteList; //Contain first array of Loaded table Data will put in Html as [value]
	}

	siteValueChange(data) //Site Valu Selection in Form
	{
		
		this.allWareHouses = [];
		this.allLocations = [];
		this.allShelfs = [];
		this.allBins = [];

		this.sourceStockLineSetup.warehouseId = 0
		this.sourceStockLineSetup.locationId = 0;
		this.sourceStockLineSetup.shelfId = 0;
		this.sourceStockLineSetup.binId = 0;
		
		
		
		this.workFlowtService.getWareHouseDate(this.sourceStockLineSetup.siteId).subscribe( //calling and Subscribing for WareHouse Data
				results => this.onDataLoadWareHouse(results), //sending WareHouse
				error => this.onDataLoadFailed(error)
			);
		
	}

	wareHouseValueChange(warehouseId)
	{

		this.allLocations = [];
		this.allShelfs = [];
		this.allBins = [];

		this.sourceStockLineSetup.locationId = 0;
		this.sourceStockLineSetup.shelfId = 0;
		this.sourceStockLineSetup.binId = 0;



		this.workFlowtService.getLocationDate(warehouseId).subscribe( //calling and Subscribing for Location Data
			results => this.onDataLoadLocation(results), //sending Location
			error => this.onDataLoadFailed(error)
		);
	}

	//eventHandler(event) {
	//	if (event.target.value != "") {
	//		let value = event.target.value.toLowerCase();
	//		if (this.selectedActionName) {
	//			if (value == this.selectedActionName.toLowerCase()) {
					

	//			}
	//			else {
					

	//			}
	//		}

	//	}
	//}

	eventHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedActionName) {
				if (value == this.selectedActionName.toLowerCase()) {
					//alert("Action Name already Exists");
					//this.disableSavepartNumber = true;

				}
				else {
					//this.disableSavepartNumber = false;
					this.sourceStockLineSetup.partDescription = "";
					//alert("Please Select Correct PN Number")
					
				}
			}

		}
	}
	locationValueChange(locationId)
	{
		this.allShelfs = [];
		this.allBins = [];

		
		this.sourceStockLineSetup.shelfId = 0;
		this.sourceStockLineSetup.binId = 0;
		
		this.workFlowtService.getShelfDate(locationId).subscribe( //calling and Subscribing for Location Data
			results => this.onDataLoadShelf(results), //sending Location
			error => this.onDataLoadFailed(error)
		);

	}

	shelfValueChange(binId)
	{
		this.allBins = [];

		
		this.sourceStockLineSetup.binId = 0;

		this.workFlowtService.getBinDataById(binId).subscribe(
			results => this.onDataLoadBin(results), //sending Location
			error => this.onDataLoadFailed(error));	
		
	}

	binValueSelect(data) { }

	//Company,Business Unit, Department, Devivision Unit 

	private loadManagementdata()
	{
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService1.getManagemententity().subscribe(
			results => this.onManagemtntdataLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);
		
		
	}

	makeNestedObj(arr, parent) {
		var out = []
		for (var i in arr) {
			if (arr[i].parentId == parent) {
				var children = this.makeNestedObj(arr, arr[i].managementStructureId)
				arr[i] = { "data": arr[i] };
				if (children.length) {
					arr[i].children = children
				}
				out.push(arr[i])
			}
		}
		return out
	}

	private onManagemtntdataLoad(getAtaMainList: any[])
	{
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getAtaMainList;
		this.allManagemtninfo = getAtaMainList;

		//if (this.allManagemtninfo)
		//{
		//	for (let i = 0; i < this.allManagemtninfo.length; i++)
		//	{
		//		this.copyOfAllManagemtninfo.push(JSON.parse(JSON.stringify(this.allManagemtninfo[i])));
		//	}
		//}


		//this.copyOfAllManagemtninfo = getAtaMainList;
		// i am Showing Managemnet Structure Data which Already has
		//if (this.sourceStockLineSetup.managementStructureEntityId && this.allManagemtninfo) {
		//	this.getBUList(this.sourceStockLineSetup.managementStructureEntityId);
		//}

		

		for (let i = 0; i < this.allManagemtninfo.length; i++)
		{

			if (this.allManagemtninfo[i].parentId == null)
			{
				this.maincompanylist.push(this.allManagemtninfo[i]);

			}

			//console.log(this.maincompanylist);
		}
		
	}

	//Management Structure Wrong One Start

			//getBUList(companyId) {

			//	//for Structure
			//	if (this.allManagemtninfo) {

			//		this.gridData = this.makeNestedObj(this.allManagemtninfo, companyId);
			//	}

			//	if (this.gridData.length == 0)
			//	{
			//		this.workFlowtService1.getManagemententity().subscribe(
			//			results => this.onManagemtntdataLoad(results[0]),
			//			error => this.onDataLoadFailed(error)
			//		);

			//	}

			//	if (this.gridData.length == 0)
			//	{
			//		this.gridData = this.makeNestedObj(this.allManagemtninfo, companyId);
			//	}

			//	this.cols1 = [
			//		{ field: 'code', header: 'Code' },
			//		{ field: 'name', header: 'Name' },
			//		{ field: 'description', header: 'Description' },
			//		//{ field: 'legalEntityId', header: 'ID' },
			//	];
			//	this.showManagement = true;
			//}


	//Management Structure Wrong One End



		//this.bulist = [];
		//this.departmentList = [];
		//this.divisionlist = [];
		//for (let i = 0; i < this.allManagemtninfo.length; i++) {
		//	if (this.allManagemtninfo[i].parentId == companyId) {
		//		this.bulist.push(this.allManagemtninfo[i]);
		//	}
	

	getBUList(companyId)
	{
		this.sourceStockLineSetup.managementStructureEntityId = companyId; //Saving Management Structure Id if there Company Id

		this.bulist = [];
		this.departmentList = [];
		this.divisionlist = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++)
		{
			if (this.allManagemtninfo[i].parentId == companyId)
			{
				this.bulist.push(this.allManagemtninfo[i]);
			}
		}

		if (this.bulist.length > 0)
		{
			this.BuHasData = true;
		}

		console.log(this.bulist);

	}

	getDepartmentlist(businessUnitId)
	{
		this.sourceStockLineSetup.managementStructureEntityId = businessUnitId;

		this.departmentList = [];
		this.divisionlist = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++)
		{
			if (this.allManagemtninfo[i].parentId == businessUnitId)
			{
				this.departmentList.push(this.allManagemtninfo[i]);
			}
		}

		if (this.departmentList.length > 0)
		{
			this.DepaHasData = true;
		}

		console.log(this.departmentList);
	}

	getDivisionlist(departmentId)
	{
		this.sourceStockLineSetup.managementStructureEntityId = departmentId;

		this.divisionlist = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++)
		{
			if (this.allManagemtninfo[i].parentId == departmentId) {
				this.divisionlist.push(this.allManagemtninfo[i]);
			}
		}

		if (this.divisionlist.length > 0)
		{
			this.divHasData = true;
		}

		console.log(this.divisionlist);
	}

	

	getDivisionChangeManagementCode(divisionId)
	{
		this.sourceStockLineSetup.managementStructureEntityId = divisionId;
	}

	POValueChange(POId)
	{
		let data = [{ itemMasterId: this.sourceStockLineSetup.itemMasterId, PurchaseOrderId: this.sourceStockLineSetup.PurchaseOrderId }]
		this.stocklinePOObject.push(data);
		this.stocklineser.getPOUnitCost(this.stocklinePOObject[0][0]).subscribe(data => { });
		//this.stocklineser.updateStockLineAdjustmentToList(this.stocklineAdjustmentObject[0][0]).subscribe(data => { });
	}
	ROValueChange(RoId)
	{
		let data = [{ itemMasterId: this.sourceStockLineSetup.itemMasterId, RepairOrderId: this.sourceStockLineSetup.RepairOrderId }]
		this.stocklineROObject.push(data);
		this.stocklineser.getROUnitCost(this.stocklineROObject[0][0]).subscribe(data => { });

	}



	private onDataLoadFailed(error: any)
	{
		// alert(error);
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

	}
	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}
	
	private saveCompleted(user?: any) {
		this.isSaving = false;
		//this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
		if (this.isDeleteMode == true) {
			this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
			this.isDeleteMode = false;
		}
		else {
			this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

		}
	}

	private saveFailedHelper(error: any) {
		this.isSaving = false;
		this.alertService.stopLoadingMessage();
		this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
		this.alertService.showStickyMessage(error, null, MessageSeverity.error);
	}

	savestockLineclose()
	{
		if ((this.sourceStockLineSetup.partNumber == undefined) || (this.sourceStockLineSetup.partNumber == "undefined")) {
			this.showPartNumberError = true;
		}
		else
		{
			this.showPartNumberError = false;
		}


		if (this.sourceStockLineSetup.companyId) {
			this.showCompanyError = false;
		}
		else { this.showCompanyError = true; }

		if ((this.BuHasData == true) && (!this.sourceStockLineSetup.businessUnitId)) {
			this.showBuError = true;
		}
		else
		{
			this.showBuError = false;
		}

		if ((this.DepaHasData == true) && (!this.sourceStockLineSetup.departmentId)) {
			this.showDivError = true;
		}
		else {
			this.showDivError = false;
		}

		if ((this.divHasData == true) && (!this.sourceStockLineSetup.divisionId)) {
			this.showDepError = true;
		}
		else {
			this.showDepError = false;
		}


		if (this.sourceStockLineSetup.partDescription) {
			this.showPartDescriptionError = false;
		}
		else { this.showPartDescriptionError = true; }


		if (this.sourceStockLineSetup.conditionId) {
			this.showConditionError = false;
		}
		else { this.showConditionError = true; }


		if (this.sourceStockLineSetup.siteId) {
			this.showSiteError = false;
		}
		else { this.showSiteError = true; }


		if (this.sourceStockLineSetup.receivedDate) {
			this.showReceiveDateError = false;
		}
		else { this.showReceiveDateError = true; }


		if (this.sourceStockLineSetup.receiverNumber) {
			this.showReceiverNumberError = false;
		}
		else { this.showReceiverNumberError = true; }


		if (this.sourceStockLineSetup.glAccountId) {
			this.showGlAccountNumberError = false;
		}
		else { this.showGlAccountNumberError = true; }

		if ((this.hasSerialized == true) && (this.sourceStockLineSetup.serialNumber)) {
			this.showSerialNumberError = false;
		}
		else if ((this.hasSerialized == false) && (!this.sourceStockLineSetup.serialNumber)) {
			this.showSerialNumberError = false;
		}
		else
		{
			this.showSerialNumberError = true;
		}




		this.isSaving = true;
		if (
			((this.sourceStockLineSetup.partNumber == undefined) || (this.sourceStockLineSetup.partNumber == "undefined"))
			|| ((this.sourceStockLineSetup.isSerialized == true) && (!this.sourceStockLineSetup.serialNumber))
			|| (!this.sourceStockLineSetup.companyId) || (!this.sourceStockLineSetup.partNumber) || (!this.sourceStockLineSetup.partDescription)
			|| (!this.sourceStockLineSetup.conditionId) || (!this.sourceStockLineSetup.siteId) || (!this.sourceStockLineSetup.receivedDate)
			|| (!this.sourceStockLineSetup.receiverNumber) || (!this.sourceStockLineSetup.glAccountId)
		) {
			this.display = true;
			this.disableSave = true;

			this.modelValue = true;
		}

		else
		{
			this.disableSave = false;
		}

		if (
			((this.sourceStockLineSetup.partNumber != undefined) && (this.sourceStockLineSetup.partNumber != "undefined")) &&
			((this.sourceStockLineSetup.isSerialized == true) && (this.sourceStockLineSetup.serialNumber)) &&
			(this.sourceStockLineSetup.companyId) && (this.sourceStockLineSetup.partNumber) && (this.sourceStockLineSetup.partDescription)
			|| (this.sourceStockLineSetup.conditionId) && (this.sourceStockLineSetup.siteId) && (this.sourceStockLineSetup.receivedDate)
			|| (this.sourceStockLineSetup.receiverNumber) && (this.sourceStockLineSetup.glAccountId)
		)
		{
			if (!this.sourceStockLine.stockLineId) {
				this.sourceStockLine.createdBy = this.userName;
				this.sourceStockLine.updatedBy = this.userName;
				this.sourceStockLine.masterCompanyId = 1;
				this.sourceStockLine.itemTypeId = 1;
				//for Saving timeLife,Stockline,Integration
				if ((this.sourceTimeLife != null) || (this.sourceTimeLife != "null"))
					{
					if (this.sourceTimeLife.timeLife) {
						this.stocklineser.newStockLineTimeLife(this.sourceTimeLife).subscribe(data => {
							this.collectionofstockLineTimeLife = data;
							this.sourceStockLineSetup.timeLifeCyclesId = data.timeLifeCyclesId;
							this.value = 1;

							this.stocklineser.newStockLine(this.sourceStockLineSetup).subscribe(data => {
								this.collectionofstockLine = data;

								this.saveStocklineIntegrationPortalData(data.stockLineId, this.selectedModels); //for Saving Integration Data
								this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
								this.value = 1;

							})
						})
					}

				else //for Saving Stockline and Integration
				{
						this.stocklineser.newStockLine(this.sourceStockLineSetup).subscribe(data => {
							this.collectionofstockLine = data;

							this.saveStocklineIntegrationPortalData(data.stockLineId, this.selectedModels); //for Saving Integration Data
							this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
							this.value = 1;

						})
					}

				}


			}
		}

		//if ((this.sourceStockLineSetup.isSerialized == true) && (this.sourceStockLineSetup.serialNumber)) {
		//	if (!this.sourceStockLine.stockLineId) {
		//		this.sourceStockLine.createdBy = this.userName;
		//		this.sourceStockLine.updatedBy = this.userName;
		//		this.sourceStockLine.masterCompanyId = 1;
		//		this.sourceStockLine.itemTypeId = 1;
		//		this.stocklineser.newStockLine(this.sourceStockLineSetup).subscribe(data => {
		//			this.collectionofstockLine = data;

		//			this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
		//			this.value = 1;

		//		})
		//	}
		//	else {

		//		this.sourceStockLine.updatedBy = this.userName;
		//		this.sourceStockLine.masterCompanyId = 1;
		//		this.sourceItemMaster.itemMasterId = this.sourceStockLineSetup.itemMasterId;
		//		this.sourceItemMaster.partId = this.selectedPartId
		//		//Update Item Master
		//		this.stocklineser.updateItemMasterPartPost(this.sourceItemMaster).subscribe(data => { });
		//		//Updating Part

		//		this.stocklineser.updateStockSetupLine(this.sourceStockLineSetup).subscribe(
		//			response => this.saveCompleted(this.sourceStockLineSetup),
		//			error => this.saveFailedHelper(error));

		//		if (this.sourceStockLineSetup.timeLifeCyclesId) {
		//			console.log("Update Timelife");
		//			this.stocklineser.updateStockLineTimelife(this.sourceTimeLife).subscribe(data => {
		//				this.collectionofstockLine = data;
		//				this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
		//			})

		//		}
		//		else {
		//			this.stocklineser.newStockLineTimeLife(this.sourceTimeLife).subscribe(data => {
		//				this.collectionofstockLine = data;

		//				this.value = 1;
		//				this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
		//			})
		//		}



		//	}
		//}
		//else
		//{
			
		//}
		
	}

	closethis()
	{

	}
	ngAfterViewInit()
	{
	}

	private loadData()
	{
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.conditionService.getConditionList().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private loadCompanyData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.stocklineser.getStockCompanyList().subscribe(
			results => this.onDataLoadCompanySuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onDataLoadCompanySuccessful(getCompanyListList: any[])
	{
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getCompanyListList;
		this.allCompanys = getCompanyListList;
	}

	private onDataLoadSuccessful(getConditionList: Condition[])
	{
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getConditionList;
		this.allConditionInfo = getConditionList;
	}

	dataSource: MatTableDataSource<any>;

	
	triggerSomeEvent()
	{
		this.isDisabled = !this.isDisabled;
		return;
	}

	//isTimeLifeEdit(isEdit)
	//{
	//	if (isEdit == true)
	//	{
	//		this.AllowEdit = true;
	//	}

	//	else
	//	{
	//		this.AllowEdit = false;
	//	}
	//}

	//for Saving Integration Data

	saveStocklineIntegrationPortalData(id,models)
	{
		for (let i = 0; i < models.length; i++)
		{
			models[i].StocklineId = id;
			//data[i].partId = partid;


			this.stocklineser.saveStocklineIntegrationPortalData(models[i]).subscribe(stocklineIntegrationPortalData => {
				this.collectionofstocklineIntegrationPortalData = stocklineIntegrationPortalData;
			})

		}
	}


}