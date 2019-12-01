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
	selector: 'app-stock-line-setup',
	templateUrl: './stock-line-setup.component.html',
	styleUrls: ['./stock-line-setup.component.scss'],
	animations: [fadeInOut]
})
/** stock-line-setup component*/
export class StockLineSetupComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
        throw new Error("Method not implemented.");
    }
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
    QuantityOnHandError: boolean;
    disableSave: boolean;
    BuHasData: boolean;
    DepaHasData: boolean;
    divHasData: boolean;
    showBuError: boolean;
    showDivError: boolean;
    showDepError: boolean;
    hasSerialized: boolean;
    showSerialNumberError: boolean;
    disableSavepartNumber: boolean;

    alllegalEntityInfo: any[] = [];
    //sourceEmployee: any = {};
    managementStructureData: any[];
    updateMode: boolean = false;
    quantityAvailable: any;
    PurchaseOrderId: any;
    minDateValue: Date;

	ngOnInit(): void
	{
        this.stocklineser.currentUrl = '/stocklinemodule/stocklinepages/app-stock-line-setup';
        this.stocklineser.bredcrumbObj.next(this.stocklineser.currentUrl);
        this.loadManagementdata();
        this.loadData();
        this.loadEmployeeData();
        this.loadSiteData();
        this.Integration();
        this.loadManufacturerData();
        this.loadIntegrationPortal();
        this.glAccountlistdata();
        this.customerList();
        this.vendorList();
        this.loadGlAccountData();
        this.ptnumberlistdata();

        this.minDateValue = new Date();
        this.sourceStockLineSetup.oem = true;
    }

	selectedObtainFromValue: string = '';
	selectedTracableToValue: string = '';
	showLable: boolean;
	//sourceStockLine: any = {};
	sourceStockLineSetup: any = {};
	sourceTimeLife: any = {};
	sourceItemMaster: any = {};
	private isSaving: boolean;
	loadingIndicator: boolean;
	private isDeleteMode: boolean = false;
	isDisabled = true;
	collectionofstockLine: any;
	value: number;
	display: boolean;
	modal: NgbModalRef;
	timeLifeEditAllow: any;
	allConditionInfo: Condition[] = [];
    allManufacturerInfo: any[] = [];
    availableQty: number;
    invalidQty: boolean;
    invalidQtyError: boolean;

    stocklineCreationForm = new FormGroup({
        companyId: new FormControl('companyId', Validators.minLength(1)),

    });

    constructor(private fb: FormBuilder, public integrationService: IntegrationService,private empService: EmployeeService,public vendorservice: VendorService,public manufacturerService: ManufacturerService,public itemser: ItemMasterService,public glAccountService: GLAccountClassService,public vendorService: VendorService,public customerService: CustomerService,public inteService: IntegrationService,public workFlowtService1: LegalEntityService,public workFlowtService: BinService,public siteService: SiteService,public integration: IntegrationService, public stocklineser: StocklineService, private http: HttpClient, public ataservice: AtaMainService, private changeDetectorRef: ChangeDetectorRef, private router: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public conditionService: ConditionService, private dialog: MatDialog)
	{
        this.dataSource = new MatTableDataSource();

        this.stocklineCreationForm = fb.group({
            'companyId': [0, Validators.compose([Validators.required, Validators.minLength(1)])],
            'BusinessUnitId': [0],
            'divisionId': [0],
            'departmentId': [0],
        });

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
        this.vendorservice.getPurchaseOrderByItemId(this.sourceItemMaster.partId).subscribe(
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
        this.vendorservice.getRepairOrderByItemId(this.sourceItemMaster.partId).subscribe(
            results => this.onPoListDataLoadSuccessful(results[0]),
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
		let ischange = false;
		if (this.selectedModels.length > 0) {
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
	}
	public getSelectedItem(selectedRow, event) {
		//;
		let ischange = false;
		selectedRow.isListed = true;
		if (this.selectedModels.length > 0) {
			//praveen's code//
			this.selectedModels.map((row) => {
				if (selectedRow.integrationPortalId == row.integrationPortalId) {
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
                    console.log(partName);
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

    calculateQtyAvailable(event) {
        
        if (this.sourceStockLineSetup.QuantityOnHand) { this.availableQty = this.sourceStockLineSetup.QuantityOnHand };
        if (this.sourceStockLineSetup.QuantityOnHand && this.sourceStockLineSetup.QuantityReserved) {
            this.availableQty = this.sourceStockLineSetup.QuantityOnHand - this.sourceStockLineSetup.QuantityReserved
        }
        if (this.sourceStockLineSetup.QuantityOnHand && this.sourceStockLineSetup.QuantityReserved && this.sourceStockLineSetup.QuantityIssued) {
            this.availableQty = this.sourceStockLineSetup.QuantityOnHand - this.sourceStockLineSetup.QuantityReserved - this.sourceStockLineSetup.QuantityIssued;
        }
        this.sourceStockLineSetup.quantityAvailable = this.availableQty;
    }

	partnmId(event) {
		if (this.itemclaColl) {
			for (let i = 0; i < this.itemclaColl.length; i++) {
				if (event == this.itemclaColl[i][0].partName) {
					this.sourceItemMaster.partId = this.itemclaColl[i][0].partId;
					this.selectedPartId = this.itemclaColl[i][0].partId; //Storing PartId in Local
                    this.selectedActionName = event;
                    this.disableSavepartNumber = false;
				}
			}
            this.itemser.getDescriptionbypart(event).subscribe(
				results => this.onpartnumberloadsuccessfull(results[0]),
				error => this.onDataLoadFailed(error)
			);
		}
	}

	private onpartnumberloadsuccessfull(allWorkFlows: any[])
    {
        this.loadPoData();
        this.loadRoData();
		this.descriptionbyPart = allWorkFlows[0]
		this.sourcePartAction = this.descriptionbyPart;
        this.sourceStockLineSetup.partDescription = allWorkFlows[0].partDescription; //Passing Part Description based on Change Part
        this.sourceStockLineSetup.shelfLife = allWorkFlows[0].t.shelfLife;
        this.sourceStockLineSetup.isSerialized = allWorkFlows[0].isSerialized;
        this.sourceStockLineSetup.ITARNumber = allWorkFlows[0].t.ITARNumber;
        this.sourceStockLineSetup.tagDate = allWorkFlows[0].t.TagDate;
        this.sourceStockLineSetup.openDate = allWorkFlows[0].t.OpenDate;
        this.sourceStockLineSetup.tagDays = allWorkFlows[0].t.TagDays;
        this.sourceStockLineSetup.manufacturingDays = allWorkFlows[0].t.ManufacturingDays
        this.sourceStockLineSetup.daysReceived = allWorkFlows[0].t.DaysReceived
        this.sourceStockLineSetup.openDays = allWorkFlows[0].t.OpenDays;
        this.sourceStockLineSetup.IsManufacturingDateAvailable = allWorkFlows[0].t.IsManufacturingDateAvailable;

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

        this.sourceStockLineSetup.isPMA = allWorkFlows[0].IsPMA;
        this.sourceStockLineSetup.isDER = allWorkFlows[0].IsDER;
        this.sourceStockLineSetup.oem = allWorkFlows[0].OEM;
        this.sourceStockLineSetup.oem = true;
        this.sourceStockLineSetup.certifiedDate = this.minDateValue;
        this.sourceStockLineSetup.tagDate = this.minDateValue;
        this.sourceStockLineSetup.certifiedDueDate = this.minDateValue;

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
        this.sourceStockLineSetup.glAccountName = allWorkFlows[0].accountName;
        this.sourceStockLineSetup.NHA = allWorkFlows[0].NHA;
       
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
       // this.sourceEmployee = allWorkFlows;
        this.allEmployeeList = allWorkFlows;
        this.loadCompanyData();

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

	eventHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {
                    this.disableSavepartNumber = false;

				}
                else {
                    this.disableSavepartNumber = true
					
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

    private onManagemtntdataLoad(getAtaMainList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getAtaMainList;
        this.allManagemtninfo = getAtaMainList;
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == null) {
                this.maincompanylist.push(this.allManagemtninfo[i]);
            }
        }
        if (this.sourceStockLineSetup.managmentLegalEntity != null && this.sourceStockLineSetup.divmanagmentLegalEntity != null && this.sourceStockLineSetup.biumanagmentLegalEntity != null && this.sourceStockLineSetup.compmanagmentLegalEntity != null) {
            this.stocklineCreationForm.controls['companyId'].setValue(this.sourceStockLineSetup.compmanagmentLegalEntity.managementStructureId);
            this.stocklineCreationForm.controls['BusinessUnitId'].setValue(this.sourceStockLineSetup.biumanagmentLegalEntity.managementStructureId);
            this.stocklineCreationForm.controls['divisionId'].setValue(this.sourceStockLineSetup.divmanagmentLegalEntity.managementStructureId);
            this.stocklineCreationForm.controls['departmentId'].setValue(this.sourceStockLineSetup.managementStructeInfo.managementStructureId);
        }
        else if (this.sourceStockLineSetup.biumanagmentLegalEntity != null && this.sourceStockLineSetup.divmanagmentLegalEntity != null && this.sourceStockLineSetup.managmentLegalEntity != null) {
            this.stocklineCreationForm.controls['companyId'].setValue(this.sourceStockLineSetup.biumanagmentLegalEntity.managementStructureId);
            this.stocklineCreationForm.controls['BusinessUnitId'].setValue(this.sourceStockLineSetup.divmanagmentLegalEntity.managementStructureId);
            this.stocklineCreationForm.controls['divisionId'].setValue(this.sourceStockLineSetup.managmentLegalEntity.managementStructureId);
        }
        else if (this.sourceStockLineSetup.divmanagmentLegalEntity != null && this.sourceStockLineSetup.managmentLegalEntity != null) {
            this.stocklineCreationForm.controls['companyId'].setValue(this.sourceStockLineSetup.divmanagmentLegalEntity.managementStructureId);
            this.stocklineCreationForm.controls['BusinessUnitId'].setValue(this.sourceStockLineSetup.managmentLegalEntity.managementStructureId);
        }
        else if (this.sourceStockLineSetup.managementStructeInfo != null) {
            this.stocklineCreationForm.controls['companyId'].setValue(this.sourceStockLineSetup.managmentLegalEntity.managementStructureId);
        }
        else {
            console.log("no Info Presnts")
        }
        this.setManagementStrucureData(this.sourceStockLineSetup);
    }

    setManagementStrucureData(obj) {
        this.managementStructureData = [];
        this.checkMSParents(obj.managementStructureId);
        if (this.managementStructureData.length == 4) {
            this.sourceStockLineSetup.companyId = this.managementStructureData[3];
            this.sourceStockLineSetup.buisinessUnitId = this.managementStructureData[2];
            this.sourceStockLineSetup.departmentId = this.managementStructureData[1];
            this.sourceStockLineSetup.divisionId = this.managementStructureData[0];
            this.getBUList2(this.sourceStockLineSetup.companyId);
            this.getDepartmentlist2(this.sourceStockLineSetup.buisinessUnitId);
            this.getDivisionlist(this.sourceStockLineSetup.departmentId);
        }
        if (this.managementStructureData.length == 3) {
            this.sourceStockLineSetup.companyId = this.managementStructureData[2];
            this.sourceStockLineSetup.buisinessUnitId = this.managementStructureData[1];
            this.sourceStockLineSetup.departmentId = this.managementStructureData[0];
            this.getBUList2(this.sourceStockLineSetup.companyId);
            this.getDepartmentlist2(this.sourceStockLineSetup.buisinessUnitId);
        }
        if (this.managementStructureData.length == 2) {
            this.sourceStockLineSetup.companyId = this.managementStructureData[1];
            this.sourceStockLineSetup.buisinessUnitId = this.managementStructureData[0];
            this.getBUList2(this.sourceStockLineSetup.companyId);
        }
        if (this.managementStructureData.length == 1) {
            this.sourceStockLineSetup.companyId = this.managementStructureData[0];
        }
    }
    getDepartmentlist2(value) {
            this.sourceStockLineSetup.departmentId = "";
            this.sourceStockLineSetup.divisionId = "";
            this.sourceStockLineSetup.managementStructureId = value;
            this.departmentList = [];
            this.divisionlist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == value) {
                    this.departmentList.push(this.allManagemtninfo[i]);
                }
            }
    }

    getBUList2(id) {
        var companyId = id;
            this.sourceStockLineSetup.buisinessUnitId = "";
            this.sourceStockLineSetup.departmentId = "";
            this.sourceStockLineSetup.divisionId = "";
            this.sourceStockLineSetup.managementStructureId = companyId;
            this.departmentList = [];
            this.divisionlist = [];
            this.bulist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == companyId) {
                    this.bulist.push(this.allManagemtninfo[i])
                }
            }
    }

    checkMSParents(msId) {
        this.managementStructureData.push(msId);
        for (let a = 0; a < this.allManagemtninfo.length; a++) {
            if (this.allManagemtninfo[a].managementStructureId == msId) {
                if (this.allManagemtninfo[a].parentId) {
                    this.checkMSParents(this.allManagemtninfo[a].parentId);
                    break;
                }
            }
        }
    }

    getBUList(event) {

        var companyId = this.stocklineCreationForm.controls['companyId'].value;

        this.sourceStockLineSetup.buisinessUnitId = "";
        this.sourceStockLineSetup.departmentId = "";
        this.sourceStockLineSetup.divisionId = "";
        this.sourceStockLineSetup.managementStructureId = companyId;
        this.departmentList = [];
        this.divisionlist = [];
        this.bulist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == companyId) {
                this.bulist.push(this.allManagemtninfo[i])
            }
        }
    }

	getDepartmentlist(businessUnitId)
    {
        var businessUnitId = this.stocklineCreationForm.controls['BusinessUnitId'].value;
        console.log(businessUnitId);
        if (this.updateMode == false) {
            this.sourceStockLineSetup.departmentId = "";
            this.sourceStockLineSetup.divisionId = "";
            this.sourceStockLineSetup.managementStructureId = businessUnitId;
            this.departmentList = [];
            this.divisionlist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == businessUnitId) {
                    this.departmentList.push(this.allManagemtninfo[i]);
                }
            }

        }
	}

    getDivisionlist(value) {
        var departmentId = this.stocklineCreationForm.controls['divisionId'].value;;
        this.sourceStockLineSetup.divisionId = "";
        this.sourceStockLineSetup.managementStructureId = departmentId;
            this.divisionlist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == departmentId) {
                    this.divisionlist.push(this.allManagemtninfo[i]);
                }
            }
    }

    divisionChange(divisionId) {
        this.sourceStockLineSetup.managementStructureId = divisionId;
    }

    POValueChange(purchaseOrderId)
    {
        this.stocklineser.getPurchaseOrderUnitCost(purchaseOrderId).subscribe(   //Getting Site List Hear
            results => this.onPOUnitCostLoadSuccessful(results), //Pasing first Array and calling Method
            error => this.onDataLoadFailed(error)
        );
    }

    onPOUnitCostLoadSuccessful(getPOCost: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.sourceStockLineSetup.purchaseOrderUnitCost = getPOCost[0].unitCost;

        
    }

    onROUnitCostLoadSuccessful(getROCost: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.sourceStockLineSetup.repairOrderUnitCost = getROCost[0].unitCost;
    }

	ROValueChange(RoId)
    {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.stocklineser.getRepairOrderUnitCost(RoId).subscribe(
            results => this.onROUnitCostLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
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
		if ((this.sourceStockLineSetup.partNumber)) {
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

        if (this.sourceStockLineSetup.QuantityOnHand) {
            this.QuantityOnHandError = false;
        }
        else { this.QuantityOnHandError = true; }

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

        if (this.availableQty < 0) {
            this.invalidQty = true;
            this.invalidQtyError = true;
        }
        this.isSaving = true;

		if (
			((this.sourceStockLineSetup.partNumber == undefined) || (this.sourceStockLineSetup.partNumber == "undefined"))
			|| ((this.sourceStockLineSetup.isSerialized == true) && (!this.sourceStockLineSetup.serialNumber))
			|| (!this.sourceStockLineSetup.companyId) || (!this.sourceStockLineSetup.partNumber) || (!this.sourceStockLineSetup.partDescription)
			|| (!this.sourceStockLineSetup.conditionId) || (!this.sourceStockLineSetup.siteId) || (!this.sourceStockLineSetup.receivedDate)
			|| (!this.sourceStockLineSetup.receiverNumber) || (!this.sourceStockLineSetup.glAccountId)
        )
        {
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
            || (this.invalidQty)
		)
		{
            if (!this.sourceStockLineSetup.stockLineId) {
                this.sourceStockLineSetup.createdBy = this.userName;
                this.sourceStockLineSetup.updatedBy = this.userName;
                this.sourceStockLineSetup.masterCompanyId = 1;
                this.sourceStockLineSetup.itemTypeId = 1;

                if (this.stocklineCreationForm.get('departmentId').value != null && this.stocklineCreationForm.get('departmentId').value > 0) {
                    this.sourceStockLineSetup.managementStructureId = this.stocklineCreationForm.get('departmentId').value;
                }
                else if (this.stocklineCreationForm.get('divisionId').value != null && this.sourceStockLineSetup.departmentId == '' && this.sourceStockLineSetup.departmentId > 0) {
                    this.sourceStockLineSetup.managementStructureId = this.stocklineCreationForm.get('divisionId').value;
                }
                else if (this.stocklineCreationForm.get('BusinessUnitId').value != null && this.sourceStockLineSetup.departmentId == '' && this.sourceStockLineSetup.divisionId == '' && this.sourceStockLineSetup.divisionId > 0) {
                    this.sourceStockLineSetup.managementStructureId = this.stocklineCreationForm.get('BusinessUnitId').value;
                }
                else {
                    this.sourceStockLineSetup.managementStructureId = this.stocklineCreationForm.get('companyId').value;
                }
                this.sourceStockLineSetup.legalEntityId = this.stocklineCreationForm.get('companyId').value;
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

    loadLegalEntityData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.stocklineser.getManagemtentLengalEntityData().subscribe(
            results => this.onManagemtntlegaldataLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onManagemtntlegaldataLoad(getAtaMainList: any[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.alllegalEntityInfo = getAtaMainList;
        for (let i = 0; i < this.alllegalEntityInfo.length; i++) {
            if (this.alllegalEntityInfo[i].parentId == null) {
                this.maincompanylist.push(this.alllegalEntityInfo[i]);
            }
        }
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