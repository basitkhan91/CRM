import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
    selector: 'app-stock-line-edit',
    templateUrl: './stock-line-edit.component.html',
	styleUrls: ['./stock-line-edit.component.scss'],
	animations: [fadeInOut]
})
/** stock-line-edit component*/
export class StockLineEditComponent implements OnInit, AfterViewInit
{
	showNormalQuantity: boolean = true;
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
	managementStructureList: any[] = [];
	divisionId: any;
	departmentId: any;
	businessUnitId: any;
	companyId: any;
	locationId: any;
	warehouseId: any;
	allintegrationdetails: any[];
	integrationvalues: any[] = [];
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
	testManagementStructure: any[] = [];
	currentStocklineIntegrationPortalData: any[];
	selectedModels: any[] = [];
    showRestrictQuantity: boolean;
    showFreeQuantity: boolean;
    showquantity: boolean;
	collectionofstocklineIntegrationPortalData: any;
	attempToDelete: boolean = false;
	ngOnInit(): void
	{
		this.stocklineser.currentUrl = '/stocklinemodule/stocklinepages/app-stock-line-edit';
		this.stocklineser.bredcrumbObj.next(this.stocklineser.currentUrl);
		this.loadData();
		this.loadCompanyData();
		this.loadManagementdata();
		this.loadSiteData();
		this.Integration();
		this.loadManufacturerData();
		this.loadPoData();
		this.loadRoData();
		this.loadIntegrationPortal();
		this.loadEmployeeData();
		this.glAccountlistdata();
		
		//this.onDataLoadWareHouse();
		//this.onDataLoadLocation();



		this.customerList();
		this.vendorList();
		this.loadGlAccountData();
		this.ptnumberlistdata();

		this.filterpartItems(this.sourceStockLineSetup.PartNumber);
		this.partnmId(this.sourceStockLineSetup.PartNumber);
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
	allIntegrationInfo: any[] = [];
	disableSaveglAccount: boolean;
	glAccountcla: any[];
	glAccountCollection: any[];
	allglAccountInfo: any[];
    /** stock-line-edit ctor */
	constructor(private empService: EmployeeService,public integrationService: IntegrationService,public vendorservice: VendorService, public manufacturerService: ManufacturerService, public itemser: ItemMasterService, public glAccountService: GLAccountClassService, public vendorService: VendorService, public customerService: CustomerService, public inteService: IntegrationService, public workFlowtService1: LegalEntityService, public workFlowtService: BinService, public siteService: SiteService, public integration: IntegrationService, public stocklineser: StocklineService, private http: HttpClient, public ataservice: AtaMainService, private changeDetectorRef: ChangeDetectorRef, private router: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public conditionService: ConditionService, private dialog: MatDialog) {
		this.dataSource = new MatTableDataSource();

		if (this.stocklineser.listCollection && this.stocklineser.isEditMode == true) {

			this.showLable = true;

			this.sourceStockLine = this.stocklineser.listCollection; // Storing List Collection into this
			this.sourceStockLineSetup.managementStructureEntityId = this.sourceStockLine.managementStructureEntityId;
			this.sourceStockLineSetup.itemMasterId = this.sourceStockLine.im.itemMasterId;
			this.sourceStockLineSetup.repairOrderId = this.sourceStockLine.ro.repairOrderId;
			this.sourceStockLineSetup.purchaseOrderId = this.sourceStockLine.po.purchaseOrderId;
			this.sourceStockLineSetup.stockLineId = this.sourceStockLine.stl.stockLineId;
			this.sourceStockLineSetup.PartNumber = this.sourceStockLine.partNumber;
			this.sourceStockLineSetup.CompanyId = this.sourceStockLine.com.companyId;
			this.sourceStockLineSetup.businessUnitId = this.sourceStockLine.bu.businessUnitId;
			this.sourceStockLineSetup.departmentId = this.sourceStockLine.de.departmentId;
			this.sourceStockLineSetup.divisionId = this.sourceStockLine.di.divisionId;
			this.sourceStockLineSetup.partId = this.sourceStockLine.partId;
			this.selectedPartId = this.sourceStockLineSetup.partId //By Default Value
			this.sourceStockLineSetup.partNumber = this.sourceStockLine.partNumber;
			this.sourceStockLineSetup.partDescription = this.sourceStockLine.partDescription;
			this.sourceStockLineSetup.stockLineNumber = this.sourceStockLine.stockLineNumber;
			this.sourceStockLineSetup.controlNumber = this.sourceStockLine.controlNumber;
			this.sourceStockLineSetup.isSerialized = this.sourceStockLine.isSerialized;
			
			this.sourceStockLineSetup.quantity = this.sourceStockLine.quantity;
			this.sourceStockLineSetup.condition = this.sourceStockLine.condition;
			this.sourceStockLineSetup.conditionId = this.sourceStockLine.conditionId;
			this.sourceStockLineSetup.serialNumber = this.sourceStockLine.serialNumber;
			if (this.sourceStockLineSetup.serialNumber)
			{
				this.sourceStockLineSetup.isSerialized = true;
			}

			if (this.sourceStockLineSetup.serialNumber == null)
			{
				this.sourceStockLineSetup.isSerialized = false;
			}


			if (this.sourceStockLineSetup.isSerialized == false) {
				this.hideSerialNumber = false;
			}
			else {
				this.hideSerialNumber = true;
			}
			this.sourceStockLineSetup.shelfLife = this.sourceStockLine.shelfLife;
			this.sourceStockLineSetup.shelfLifeExpirationDate = this.sourceStockLine.shelfLifeExpirationDate;
			this.sourceStockLineSetup.siteId = this.sourceStockLine.siteId;
			this.sourceStockLineSetup.warehouseId = this.sourceStockLine.warehouseId;
			this.sourceStockLineSetup.locationId = this.sourceStockLine.locationId;
			this.sourceStockLineSetup.obtainFrom = this.sourceStockLine.obtainFrom;
			this.sourceStockLineSetup.obtainFromType = this.sourceStockLine.obtainFromType;
			this.sourceStockLineSetup.ownerType = this.sourceStockLine.ownerType;
			this.sourceStockLineSetup.traceableToType = this.sourceStockLine.traceableToType;
			this.sourceStockLineSetup.unitCostAdjustmentReasonTypeId = this.sourceStockLine.unitCostAdjustmentReasonTypeId;
			this.sourceStockLineSetup.unitSalePriceAdjustmentReasonTypeId = this.sourceStockLine.unitSalePriceAdjustmentReasonTypeId;
			this.sourceStockLineSetup.idNumber = this.sourceStockLine.idNumber;


			this.sourceStockLineSetup.owner = this.sourceStockLine.owner;

			this.sourceStockLineSetup.traceableTo = this.sourceStockLine.traceableTo;

			this.sourceStockLineSetup.manufacturer = this.sourceStockLine.manufacturer;
			this.sourceStockLineSetup.manufacturerLotNumber = this.sourceStockLine.manufacturerLotNumber;
			this.sourceStockLineSetup.manufacturingDate = this.sourceStockLine.manufacturingDate;
			this.sourceStockLineSetup.manufacturingBatchNumber = this.sourceStockLine.manufacturingBatchNumber;
			this.sourceStockLineSetup.partCertificationNumber = this.sourceStockLine.partCertificationNumber;
			this.sourceStockLineSetup.certifiedBy = this.sourceStockLine.certifiedBy;
			this.sourceStockLineSetup.certifiedDate = this.sourceStockLine.certifiedDate;
			this.sourceStockLineSetup.tagDate = this.sourceStockLine.tagDate;
			this.sourceStockLineSetup.tagType = this.sourceStockLine.tagType;
			this.sourceStockLineSetup.certifiedDueDate = this.sourceStockLine.certifiedDueDate;
			this.sourceStockLineSetup.calibrationMemo = this.sourceStockLine.calibrationMemo;
			this.sourceStockLineSetup.orderDate = this.sourceStockLine.orderDate;
			this.sourceStockLineSetup.purchaseOrderNumber = this.sourceStockLine.purchaseOrderNumber;
			this.sourceStockLineSetup.purchaseOrderUnitCost = this.sourceStockLine.purchaseOrderUnitCost;
			this.sourceStockLineSetup.repairOrderNumber = this.sourceStockLine.repairOrderNumber;
			this.sourceStockLineSetup.repairOrderUnitCost = this.sourceStockLine.repairOrderUnitCost;
			this.sourceStockLineSetup.receivedDate = this.sourceStockLine.receivedDate;
			this.sourceStockLineSetup.receiverNumber = this.sourceStockLine.receiver;
			this.sourceStockLineSetup.reconciliationNumber = this.sourceStockLine.reconciliationNumber;
			this.sourceStockLineSetup.unitSalesPrice = this.sourceStockLine.unitSalesPrice;
			this.sourceStockLineSetup.coreUnitCost = this.sourceStockLine.coreUnitCost;
			this.sourceStockLineSetup.glAccountId = this.sourceStockLine.glAccountId;
			this.sourceStockLineSetup.assetId = this.sourceStockLine.assetId;
			this.sourceStockLineSetup.isHazardousMaterial = this.sourceStockLine.isHazardousMaterial;
			this.sourceStockLineSetup.isPMA = this.sourceStockLine.isPMA;
			this.sourceStockLineSetup.isDER = this.sourceStockLine.isDER;
			this.sourceStockLineSetup.oem = this.sourceStockLine.oem;
			this.sourceStockLineSetup.memo = this.sourceStockLine.memo;
			this.sourceStockLineSetup.siteId = this.sourceStockLine.siteId;
			this.sourceStockLineSetup.shelfId = this.sourceStockLine.shelfId;
			this.sourceStockLineSetup.binId = this.sourceStockLine.binId;
			this.sourceStockLineSetup.controlNumber = this.sourceStockLine.controlNumber;
			this.sourceStockLineSetup.inventoryUnitCost = this.sourceStockLine.inventoryUnitCost;
			this.sourceStockLineSetup.timeLife = this.sourceStockLine.timeLife;
			this.sourceTimeLife.timeLife = this.sourceStockLine.timeLife;
			this.sourceStockLineSetup.timeLifeCyclesId = this.sourceStockLine.timeLifeCyclesId  //TimeLifeId
			this.sourceStockLineSetup.managementCode = this.sourceStockLine.code
			this.sourceStockLineSetup.itemTypeId = this.sourceStockLine.itemTypeId
			this.sourceStockLineSetup.PurchaseOrderId=this.sourceStockLine.po.purchaseOrderId
			this.sourceStockLineSetup.RepairOrderId = this.sourceStockLine.ro.repairOrderId
			this.sourceStockLineSetup.manufacturerId = this.sourceStockLine.manufacturerId;


			//TimeLife
			this.sourceTimeLife.timeLifeCyclesId = this.sourceStockLine.timeLifeCyclesId
			this.sourceTimeLife.cyclesSinceNew = this.sourceStockLine.cyclesSinceNew;
			this.sourceTimeLife.cyclesSinceOVH = this.sourceStockLine.cyclesSinceOVH;
			this.sourceTimeLife.cyclesSinceRepair = this.sourceStockLine.cyclesSinceRepair;
			this.sourceTimeLife.cyclesSinceInspection = this.sourceStockLine.cyclesSinceInspection;
			this.sourceTimeLife.timeSinceNew = this.sourceStockLine.timeSinceNew;
			this.sourceTimeLife.timeSinceOVH = this.sourceStockLine.timeSinceOVH;
			this.sourceTimeLife.timeSinceRepair = this.sourceStockLine.timeSinceRepair;
			this.sourceTimeLife.timeSinceInspection = this.sourceStockLine.timeSinceInspection;
			this.sourceTimeLife.lastSinceNew = this.sourceStockLine.lastSinceNew;
			this.sourceTimeLife.lastSinceOVH = this.sourceStockLine.lastSinceOVH;
			this.sourceTimeLife.lastSinceInspection = this.sourceStockLine.lastSinceInspection;


			//Loading Site,WareHouse,Location Values Based on Dependencies
			if (this.sourceStockLineSetup.siteId) {
				this.workFlowtService.getWareHouseDate(this.sourceStockLineSetup.siteId).subscribe( //calling and Subscribing for WareHouse Data
					results => this.onDataLoadWareHouse(results), //sending WareHouse
					error => this.onDataLoadFailed(error)
				);
			}
			if (this.sourceStockLineSetup.warehouseId) {
				this.workFlowtService.getLocationDate(this.sourceStockLineSetup.warehouseId).subscribe( //calling and Subscribing for Location Data
					results => this.onDataLoadLocation(results), //sending Location
					error => this.onDataLoadFailed(error)
				);
			}
			if (this.sourceStockLineSetup.locationId) {
				this.workFlowtService.getShelfDate(this.sourceStockLineSetup.locationId).subscribe( //calling and Subscribing for Location Data
					results => this.onDataLoadShelf(results), //sending Location
					error => this.onDataLoadFailed(error)
				);
			}

			if (this.sourceStockLineSetup.shelfId) {
				this.workFlowtService.getBinDataById(this.sourceStockLineSetup.shelfId).subscribe(
					results => this.onDataLoadBin(results), //sending Location
					error => this.onDataLoadFailed(error));
			}


			if (this.sourceStockLine.certifiedDate == "0001-01-01T00:00:00" || this.sourceStockLine.certifiedDate == undefined || this.sourceStockLine.certifiedDate == "undefined") {
				this.sourceStockLineSetup.certifiedDate = new Date();
			}
			else {
				this.sourceStockLineSetup.certifiedDate = new Date(this.sourceStockLine.certifiedDate);
			}
			if (this.sourceStockLine.certifiedDueDate == "0001-01-01T00:00:00" || this.sourceStockLine.certifiedDueDate == undefined || this.sourceStockLine.certifiedDueDate == "undefined") {
				this.sourceStockLineSetup.certifiedDueDate = new Date();
			}
			else {
				this.sourceStockLineSetup.certifiedDueDate = new Date(this.sourceStockLine.certifiedDueDate);
			}
			if (this.sourceStockLine.shelfLifeExpirationDate == "0001-01-01T00:00:00" || this.sourceStockLine.shelfLifeExpirationDate == undefined || this.sourceStockLine.shelfLifeExpirationDate == "undefined") {
				this.sourceStockLineSetup.shelfLifeExpirationDate = new Date();
			}
			else {
				this.sourceStockLineSetup.shelfLifeExpirationDate = new Date(this.sourceStockLine.shelfLifeExpirationDate);
			}
			if (this.sourceStockLine.manufacturingDate == "0001-01-01T00:00:00" || this.sourceStockLine.manufacturingDate == undefined || this.sourceStockLine.manufacturingDate == "undefined") {
				this.sourceStockLineSetup.manufacturingDate = new Date();
			}
			else {
				this.sourceStockLineSetup.manufacturingDate = new Date(this.sourceStockLine.manufacturingDate);
			}
			if (this.sourceStockLine.tagDate == "0001-01-01T00:00:00" || this.sourceStockLine.tagDate == undefined || this.sourceStockLine.tagDate == "undefined") {
				this.sourceStockLineSetup.tagDate = new Date();
			}
			else {
				this.sourceStockLineSetup.tagDate = new Date(this.sourceStockLine.tagDate);
			}
			if (this.sourceStockLine.orderDate == "0001-01-01T00:00:00" || this.sourceStockLine.orderDate == undefined || this.sourceStockLine.orderDate == "undefined") {
				this.sourceStockLineSetup.orderDate = new Date();
			}
			else {
				this.sourceStockLineSetup.orderDate = new Date(this.sourceStockLine.orderDate);
			}
			if (this.sourceStockLine.receivedDate == "0001-01-01T00:00:00" || this.sourceStockLine.receivedDate == undefined || this.sourceStockLine.receivedDate == "undefined") {
				this.sourceStockLineSetup.receivedDate = new Date();
			}
			else {
				this.sourceStockLineSetup.receivedDate = new Date(this.sourceStockLine.receivedDate);
			}
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
	private onptnmbersSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allPartnumbersInfo = allWorkFlows;


		//console.log(this.allActions);


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

	loadEmployeeData() {
		this.empService.getEmployeeList().subscribe(
			results => this.onDataLoadEmployeeSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	onDataLoadEmployeeSuccessful(allWorkFlows: any[]) {
		this.dataSource.data = allWorkFlows;
		this.allEmployeeList = allWorkFlows;
	}

	ChnageValue(value) {
		this.sourceStockLineSetup.obtainFrom = "";
		this.sourceStockLineSetup.obtainFrom = null;
		this.sourceStockLineSetup.obtainFrom = '';

	}
	ChnageOwnerValue(value)
	{
		this.sourceStockLineSetup.owner = "";
	}
	ChnageTracebleValue(value)
	{
		this.sourceStockLineSetup.traceableTo = "";
	}
	loadPoData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.vendorservice.getPurchaseOrderlist().subscribe(
			results => this.onPoListDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	onPoListDataLoadSuccessful(getCreditTermsList: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getCreditTermsList;

		this.allPolistInfo = getCreditTermsList;

	}

	loadRoData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.vendorservice.getRepaireOrderlist().subscribe(
			results => this.onDataLoadRepairOrderDataSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	onDataLoadRepairOrderDataSuccessful(getCreditTermsList: any[]) {
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

	loadManufacturerData() {
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

	filterpartItems(event) {

		this.partCollection = [];
		this.itemclaColl = [];
		if (this.allPartnumbersInfo) {
			if (this.allPartnumbersInfo.length > 0) {

				for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
					let partName = this.allPartnumbersInfo[i].partNumber;
					if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
						this.itemclaColl.push([{
							"partId": this.allPartnumbersInfo[i].partId,
							"partName": partName
						}]),

							this.partCollection.push(partName);
					}
				}
			}
		}


	}


	partnmId(event) {
		//debugger;
		if (this.itemclaColl) {
			for (let i = 0; i < this.itemclaColl.length; i++) {
				if (event == this.itemclaColl[i][0].partName) {
					//this.sourceItemMaster.partId = this.itemclaColl[i][0].partId;
					this.selectedPartId = this.itemclaColl[i][0].partId; //Storing PartId in Local

					console.log(this.selectedPartId);
					this.selectedActionName = event;
				}
			}
			this.itemser.getDescriptionbypart(event).subscribe(
				results => this.onpartnumberloadsuccessfull(results[0]),
				error => this.onDataLoadFailed(error)
			);
		}
	}

	private onpartnumberloadsuccessfull(allWorkFlows: any[]) {


		this.descriptionbyPart = allWorkFlows[0]
		this.sourcePartAction = this.descriptionbyPart;
		this.sourceStockLineSetup.partDescription = allWorkFlows[0].partDescription; //Passing Part Description based on Change Part

		this.sourceStockLineSetup.isSerialized = allWorkFlows[0].isSerialized;

		if (this.sourceStockLineSetup.isSerialized == true) {
			this.hideSerialNumber = true;
			this.showRestrictQuantity = true;
			this.showFreeQuantity = false;
			this.showNormalQuantity = false;
		}
		else {
			this.hideSerialNumber = false;
			this.showRestrictQuantity = false;
			this.showFreeQuantity = true;
			this.showNormalQuantity = false;

		}

		if (this.sourceStockLineSetup.isSerialized == null)
		{
			this.sourceStockLineSetup.isSerialized == false;
		}
	}

	private customerList() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.customerService.getWorkFlows().subscribe(
			results => this.onCustomerDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onCustomerDataLoadSuccessful(allCustomerFlows: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allCustomerFlows;
		this.allCustomer = allCustomerFlows;

	}

	private vendorList() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.vendorService.getVendorList().subscribe(
			results => this.onVendorDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	private onVendorDataLoadSuccessful(allVendorWorkFlows: any[]) {
		//debugger;
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allVendorWorkFlows;
		this.allVendorList = allVendorWorkFlows;


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

		this.loadIntegrationPortalDataIfIdExist();//loading Data Based on Id
	}

	private loadIntegrationPortalDataIfIdExist()
	{
		this.stocklineser.getStockLineIntegrationList(this.sourceStockLineSetup.stockLineId).subscribe(
			results => this.onDataIntegrationPortalForStockId(results),
			error => this.onDataLoadFailed(error)
		);
		
	}
	onDataIntegrationPortalForStockId(allWorkFlows: any[])
	{
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = allWorkFlows;
		this.currentStocklineIntegrationPortalData = allWorkFlows;
			if (allWorkFlows)
			{
				for (let i = 0; i < allWorkFlows.length; i++)
				{
					allWorkFlows[i].attempToDelete = false;
					this.selectedModels.push(JSON.parse(JSON.stringify(allWorkFlows[i])));
					//this.selectedModels.push(allWorkFlows[i].attempToDelete)
			}
		}
		//this.selectedModels = allWorkFlows;//we are storing Data for for Edit Save

		if ((this.allIntegrationInfo) && (this.currentStocklineIntegrationPortalData))
		{
			for (let i = 0; i < this.currentStocklineIntegrationPortalData.length; i++)
			{
				for (let j = 0; j < this.allIntegrationInfo.length; j++)
				{
					if (this.allIntegrationInfo[j].integrationPortalId == this.currentStocklineIntegrationPortalData[i].integrationPortalId)
					{
						this.allIntegrationInfo[j].integratedCheckbox = true;

						if (this.currentStocklineIntegrationPortalData[i].isListed == true)
						{
							this.allIntegrationInfo[j].listedCheckbox = true;
						}

					}
				}
			}
		}
	}

	//private loadTimeLifeDataIfIdExist() {
	//	this.stocklineser.getStockLineTimeLifeList(this.sourceStockLineSetup.timeLifeCyclesId).subscribe(
	//		results => this.onDataTimeLifeForTimeLifeCycleId(results[0]),
	//		error => this.onDataLoadFailed(error)
	//	);

	//}

	//onDataTimeLifeForTimeLifeCycleId(allWorkFlows:any[])
	//{

	//}

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
		this.allWareHouses = getWarehousList; //chaallIntegrationInfo
		//this.warehouseId = this.allWareHouses.warehouseId;

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

	private onDataLoadBin(getBinList: any) {
		this.loadingIndicator = false;
		this.allBins = getBinList; //cha
	}
	private onSaiteDataLoadSuccessful(getSiteList: Site[]) { //Storing Site Data
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

	wareHouseValueChange(warehouseId) {

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

				}
			}

		}
	}
	locationValueChange(locationId) {
		this.allShelfs = [];
		this.allBins = [];


		this.sourceStockLineSetup.shelfId = 0;
		this.sourceStockLineSetup.binId = 0;

		this.workFlowtService.getShelfDate(locationId).subscribe( //calling and Subscribing for Location Data
			results => this.onDataLoadShelf(results), //sending Location
			error => this.onDataLoadFailed(error)
		);

	}

	shelfValueChange(binId) {
		this.allBins = [];


		this.sourceStockLineSetup.binId = 0;

		this.workFlowtService.getBinDataById(binId).subscribe(
			results => this.onDataLoadBin(results), //sending Location
			error => this.onDataLoadFailed(error));

	}

	binValueSelect(data) { }

	//Company,Business Unit, Department, Devivision Unit 

	private loadManagementdata() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService1.getManagemententity().subscribe(
			results => this.onManagemtntdataLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);


	}

	makeNestedObj(arr, parent) {
		var out = []
		let out1 = [];
		var k = 0;
		for (var i in arr) {
			if (arr[i].managementStructureId == parent)
			{
				out.push(arr[i]);
				out1.push(arr[i]);
				this.testManagementStructure.push(arr[i]);
				 this.makeNestedObj(arr, arr[i].parentId)
				//arr[i] = { "data": arr[i] };
				//if (children.length) {
				//	arr[i].children = children
				//}
				out.push(arr[i])
				k++;
			}
		}
		console.log(out1);
		console.log(out);
		console.log(this.testManagementStructure);
		return this.testManagementStructure;
	}

	private onManagemtntdataLoad(getAtaMainList: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getAtaMainList;
		this.allManagemtninfo = getAtaMainList;

		//Implimention Management Structure Reverece
		this.gridData = this.makeNestedObj(this.allManagemtninfo, this.sourceStockLineSetup.managementStructureEntityId);

		

		switch (this.testManagementStructure.length)
		{
			case 1:
				this.sourceStockLineSetup.companyId = this.testManagementStructure[0].managementStructureId;
				break;
			case 2:
				this.sourceStockLineSetup.businessUnitId = this.testManagementStructure[0].managementStructureId;
				this.sourceStockLineSetup.companyId = this.testManagementStructure[1].managementStructureId;
				break;
			case 3:
				this.sourceStockLineSetup.departmentId = this.testManagementStructure[0].managementStructureId;
				this.sourceStockLineSetup.businessUnitId = this.testManagementStructure[1].managementStructureId;
				this.sourceStockLineSetup.companyId = this.testManagementStructure[2].managementStructureId;
				break;
			case 4:
				this.sourceStockLineSetup.divisionId = this.testManagementStructure[0].managementStructureId;
				this.sourceStockLineSetup.departmentId = this.testManagementStructure[1].managementStructureId;
				this.sourceStockLineSetup.businessUnitId = this.testManagementStructure[2].managementStructureId;
				this.sourceStockLineSetup.companyId = this.testManagementStructure[3].managementStructureId;
				break;
		}
		
			//for (let i = (this.testManagementStructure.length-1); this.testManagementStructure.length > 0;)
			//{
			//	this.sourceStockLineSetup.companyId = this.testManagementStructure[i].managementStructureId;
			//	this.sourceStockLineSetup.businessUnitId = this.testManagementStructure[i-1].managementStructureId;
			//	this.sourceStockLineSetup.departmentId = this.testManagementStructure[i-2].managementStructureId;
			//}
		
		



		//for (let i = 0; i < this.allManagemtninfo.length; i++) {

		//	if (this.allManagemtninfo[i].parentId == null) {
		//		this.maincompanylist.push(this.allManagemtninfo[i]);

		//	}
		//}

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


	getBUList(companyId) {
		this.sourceStockLineSetup.managementStructureEntityId = companyId; //Saving Management Structure Id if there Company Id

		this.bulist = [];
		this.departmentList = [];
		this.divisionlist = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == companyId) {
				this.bulist.push(this.allManagemtninfo[i]);
			}
		}

		console.log(this.bulist);

	}

	getDepartmentlist(businessUnitId) {
		this.sourceStockLineSetup.managementStructureEntityId = businessUnitId;

		this.departmentList = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == businessUnitId) {
				this.departmentList.push(this.allManagemtninfo[i]);
			}
		}

		console.log(this.departmentList);
	}

	getDivisionlist(departmentId) {
		this.sourceStockLineSetup.managementStructureEntityId = departmentId;

		this.divisionlist = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == departmentId) {
				this.divisionlist.push(this.allManagemtninfo[i]);
			}
		}

		console.log(this.divisionlist);
	}

	getDivisionChangeManagementCode(divisionId) {
		this.sourceStockLineSetup.managementStructureEntityId = divisionId;
	}

	POValueChange(POId) {
		//let data = [{ itemMasterId: , PurchaseOrderId: this.sourceStockLineSetup.PurchaseOrderId }]
	}
	ROValueChange(RoId) {
	}



	private onDataLoadFailed(error: any) {
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

	savestockLineclose() {
		if ((this.sourceStockLineSetup.quantity == true)) {
			this.showquantity = true;
		}
		else {
			this.showquantity = false;
		}
		this.isSaving = true;
		if ((this.sourceStockLineSetup.isSerialized == true) && (!this.sourceStockLineSetup.serialNumber))
		{
			this.display = true;
			this.modelValue = true;
		}

		if ((this.sourceStockLineSetup.isSerialized == true) && (this.sourceStockLineSetup.serialNumber)) {
			if (!this.sourceStockLine.stockLineId) {
				this.sourceStockLine.createdBy = this.userName;
				this.sourceStockLine.updatedBy = this.userName;
				this.sourceStockLine.masterCompanyId = 1;
				this.sourceStockLine.itemTypeId = 1;
				this.stocklineser.newStockLine(this.sourceStockLine).subscribe(data => {
					this.collectionofstockLine = data;
					this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
					this.value = 1;

				})
			}
			else {

				this.sourceStockLine.updatedBy = this.userName;
				this.sourceStockLine.masterCompanyId = 1;
				this.sourceItemMaster.itemMasterId = this.sourceStockLineSetup.itemMasterId;
				this.sourceItemMaster.partId = this.selectedPartId
				//Update Item Master
				//this.stocklineser.updateItemMasterPartPost(this.sourceItemMaster).subscribe(data => { });
				//Updating Part

				this.stocklineser.updateStockSetupLine(this.sourceStockLineSetup).subscribe(
					data => {
						if (data) {
							this.saveCompleted(this.sourceStockLineSetup);
							//for Saving Time Life start
							if (this.sourceStockLineSetup.timeLifeCyclesId)
							{
								console.log("Update Timelife");
								this.stocklineser.updateStockLineTimelife(this.sourceTimeLife).subscribe(data => {
									this.collectionofstockLine = data;
									this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
								})

							}
							else {
								this.stocklineser.newStockLineTimeLife(this.sourceTimeLife).subscribe(data => {
									this.collectionofstockLine = data;

									this.value = 1;
									this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
								})
							}
							//for Saving Time Life End

							//for Saving Integration Multiselect Start

							if (this.selectedModels.length > 0) {
								//in this while Edit if we unselect Check box that also treating as a select only
								//so we have list before edi
								//if list in previous and selected Model Data Has same PortalId then i will pop in Previous list

								if (this.selectedModels.length > 0) {
									this.stocklineser.deleteIntegrationById(this.sourceStockLineSetup.stockLineId).subscribe();
								}

								for (let i = 0; i < this.currentStocklineIntegrationPortalData.length; i++) {
									for (let j = 0; j < this.selectedModels.length; j++) {
										if (this.currentStocklineIntegrationPortalData[i].integrationPortalId == this.selectedModels[j].integrationPortalId) {
											if ((this.attempToDelete == true) && (this.selectedModels[j].attempToDelete == true)) {
												this.selectedModels.splice(j, 1);
											}

											//this.stocklineser.deleteIntegrationById(this.currentStocklineIntegrationPortalData[i].stocklineIntegrationPortalId).subscribe();

											//if (this.selectedModels[j].isListed == true)
											//{
											//	this.currentStocklineIntegrationPortalData[i].isListed = false;
											//}
											//else
											//{
											//	this.stocklineser.deleteIntegrationById(this.currentStocklineIntegrationPortalData[i].stocklineIntegrationPortalId).subscribe();
											//	this.currentStocklineIntegrationPortalData.splice(i, 1);
											//}
										}
									}
								}

								//for (let i = 0; i < this.currentStocklineIntegrationPortalData.length; i++)
								//{
								//	//if (this.currentStocklineIntegrationPortalData == this.sourceStockLineSetup )
								//	//{

								//	//}
								//	this.selectedModels.push(this.currentStocklineIntegrationPortalData[i]);
								//}

								this.saveStocklineIntegrationPortalData(this.sourceStockLineSetup.stockLineId, this.selectedModels);

								console.log(this.selectedModels);
							}

							//if (this.selectedModels.length > 0)
							//{
							//	//for (let i = 0; i < this.currentStocklineIntegrationPortalData.length;i++)
							//	//{
							//	//	this.selectedModels.push(this.currentStocklineIntegrationPortalData[i]);
							//	//}

							//	this.saveStocklineIntegrationPortalData(this.sourceStockLineSetup.stockLineId, this.selectedModels);

							//	console.log(this.selectedModels);
							//}
							//for Saving Integration Multiselect End



						}
					});
					//response => this.saveCompleted(this.sourceStockLineSetup),
					//error => this.saveFailedHelper(error));

				//if (this.sourceStockLineSetup.timeLifeCyclesId) {
				//	console.log("Update Timelife");
				//	this.stocklineser.updateStockLineTimelife(this.sourceTimeLife).subscribe(data => {
				//		this.collectionofstockLine = data;
				//		this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
				//	})

				//}
				//else {
				//	this.stocklineser.newStockLineTimeLife(this.sourceTimeLife).subscribe(data => {
				//		this.collectionofstockLine = data;

				//		this.value = 1;
				//		this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
				//	})
				//}



			}
		}

		else if (((this.sourceStockLineSetup.isSerialized == false) || (this.sourceStockLineSetup.isSerialized == undefined) || (this.sourceStockLineSetup.isSerialized == "undefined") || (this.sourceStockLineSetup.isSerialized == null)) && (!this.sourceStockLineSetup.serialNumber))
		{

			this.sourceStockLine.updatedBy = this.userName;
			this.sourceStockLine.masterCompanyId = 1;
			this.sourceItemMaster.itemMasterId = this.sourceStockLineSetup.itemMasterId;
			this.sourceItemMaster.partId = this.selectedPartId
			//Update Item Master
			//this.stocklineser.updateItemMasterPartPost(this.sourceItemMaster).subscribe(data => { });
			//Updating Part

			this.stocklineser.updateStockSetupLine(this.sourceStockLineSetup).subscribe(
				//response => this.saveCompleted(this.sourceStockLineSetup),
				//error => this.saveFailedHelper(error));
				data => {
					this.saveCompleted(this.sourceStockLineSetup);

					if (this.sourceStockLineSetup.timeLifeCyclesId) {
						console.log("Update Timelife");
						this.stocklineser.updateStockLineTimelife(this.sourceTimeLife).subscribe(data => {
							this.collectionofstockLine = data;
							this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
						})

					}
					else {
						this.stocklineser.newStockLineTimeLife(this.sourceTimeLife).subscribe(data => {
							this.collectionofstockLine = data;

							this.value = 1;
							this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
						})
					}

					if (this.selectedModels.length > 0)
					{
						//in this while Edit if we unselect Check box that also treating as a select only
						//so we have list before edi
						//if list in previous and selected Model Data Has same PortalId then i will pop in Previous list

						if (this.selectedModels.length > 0)
						{
							this.stocklineser.deleteIntegrationById(this.sourceStockLineSetup.stockLineId).subscribe();
						}

						for (let i = 0; i < this.currentStocklineIntegrationPortalData.length;i++)
						{
							for (let j = 0; j < this.selectedModels.length; j++)
							{
								if (this.currentStocklineIntegrationPortalData[i].integrationPortalId == this.selectedModels[j].integrationPortalId  )
								{
									if ((this.attempToDelete == true) && (this.selectedModels[j].attempToDelete == true))
									{
										this.selectedModels.splice(j, 1);
									}
									
									//this.stocklineser.deleteIntegrationById(this.currentStocklineIntegrationPortalData[i].stocklineIntegrationPortalId).subscribe();

									//if (this.selectedModels[j].isListed == true)
									//{
									//	this.currentStocklineIntegrationPortalData[i].isListed = false;
									//}
									//else
									//{
									//	this.stocklineser.deleteIntegrationById(this.currentStocklineIntegrationPortalData[i].stocklineIntegrationPortalId).subscribe();
									//	this.currentStocklineIntegrationPortalData.splice(i, 1);
									//}
								}
							}
						}

						//for (let i = 0; i < this.currentStocklineIntegrationPortalData.length; i++)
						//{
						//	//if (this.currentStocklineIntegrationPortalData == this.sourceStockLineSetup )
						//	//{

						//	//}
						//	this.selectedModels.push(this.currentStocklineIntegrationPortalData[i]);
						//}

						this.saveStocklineIntegrationPortalData(this.sourceStockLineSetup.stockLineId, this.selectedModels);

						console.log(this.selectedModels);
					}

				})

			//if (this.sourceStockLineSetup.timeLifeCyclesId) {
			//	console.log("Update Timelife");
			//	this.stocklineser.updateStockLineTimelife(this.sourceTimeLife).subscribe(data => {
			//		this.collectionofstockLine = data;
			//		this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
			//	})

			//}
			//else {
			//	this.stocklineser.newStockLineTimeLife(this.sourceTimeLife).subscribe(data => {
			//		this.collectionofstockLine = data;

			//		this.value = 1;
			//		this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
			//	})
			//}


		}

	}

	closethis() {

	}
	ngAfterViewInit() {
	}

	private loadData() {
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

	private onDataLoadCompanySuccessful(getCompanyListList: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getCompanyListList;
		this.allCompanys = getCompanyListList;
	}

	private onDataLoadSuccessful(getConditionList: Condition[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getConditionList;
		this.allConditionInfo = getConditionList;
	}
	public getSelectedItem(selectedRow, event) {
		//;
		let ischange = false;
		selectedRow.isListed = true;
		if (this.selectedModels.length > 0) {
			//praveen's code//
			this.selectedModels.map((row) => {
				if (selectedRow.integrationPortalId == row.integrationPortalId)
				{
					if (selectedRow.integratedCheckbox) //Added
					{
						row.isListed = false;
						ischange = true;
					}
					if ((row.isListed == false) && (selectedRow.listedCheckbox == true))
					{
						selectedRow.isListed = true;
						row.isListed = true;
						ischange = false;
					}
					

					//selectedRow.isListed = true;
					//row.isListed = event.target.value;
					
				}
				
			});
		}
		if (!ischange) {
			this.selectedModels.push(selectedRow);
		}

		console.log(this.selectedModels);
	}
	public saveSelectedModel(selectedRow, indeex) {

		selectedRow.isBoolean = indeex;
		if (!selectedRow.isListed) {
			selectedRow.isListed = false;
		}
		//Moveing getSelectedItem from here Below Code
		let ischange = false; 
		if (this.selectedModels.length > 0) {
			//praveen's code//
			this.selectedModels.map((row) => {
				if (selectedRow.integrationPortalId == row.integrationPortalId)
				{
					if ( selectedRow.isListed == false) //Added
					{
						this.attempToDelete = true;
						selectedRow.attempToDelete = true;
						ischange = false;
						
					}
					
					
				}
				
			});
		}
		if (!ischange) {
			this.selectedModels.push(selectedRow);
		}
		console.log(this.selectedModels);

	}

	dataSource: MatTableDataSource<any>;


	triggerSomeEvent() {
		this.isDisabled = !this.isDisabled;
		return;
	}

	saveStocklineIntegrationPortalData(id, models)
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

	//isTimeLifeEdit(isEdit) {
	//	if (isEdit == true) {
	//		this.AllowEdit = true;
	//	}

	//	else {
	//		this.AllowEdit = false;
	//	}
	//}


}