import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService, DialogType, MessageSeverity } from '../../../services/alert.service';
import { StocklineService } from '../../../services/stockline.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { ThrowStmt } from '@angular/compiler';
import { fadeInOut } from '../../../services/animations';
import { SiteService } from '../../../services/site.service';
import { Site } from '../../../models/site.model';
import { BinService } from '../../../services/bin.service';
import { WarehouseService } from '../../../services/warehouse.service';
import { LocationService } from '../../../services/location.service';
import { ShelfService } from '../../../services/shelf.service';
import { ItemMasterService } from '../../../services/itemMaster.service';
import { Warehouse } from '../../../models/warehouse.model';
import { LegalEntityService } from '../../../services/legalentity.service';
import { TreeNode, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';//Error Validation Pop Up
@Component({
	selector: 'app-stock-adjustment',
	templateUrl: './stock-adjustment.component.html',
	styleUrls: ['./stock-adjustment.component.scss'],
	animations: [fadeInOut]
})
/** stock-adjustment component*/
export class StockAdjustmentComponent implements OnInit {
	isEditMode: boolean = false;

	/** stock-adjustment ctor */
	allSites: Site[];
	activeIndex: number;
	private isSaving: boolean;
	private isDeleteMode: boolean = false;
	dataSource: MatTableDataSource<any>;
	selectedColumns: any[];
	cols: any[];
	loadingIndicator: boolean;
	isCompanyChecked: boolean;
	allStockInfo: any[] = [];
	public sourceStockLine: any = {};
	warehouseAllow: boolean = false;

	showLable: boolean;
	collectionofstockLine: any;
	value: number;
	valv: number;
	isTimeLife: boolean = true; //For TimeLife Adjustment
	sourceStockAdjustment: any = {};
	sourceStockLineSetup: any = {};
	sourceStockLineAdjustmentNew: any = {}
	showSite: boolean;
	showEditSite: boolean;
	hideSite: boolean;
	siteAllow: boolean;
	reValueStockAllow: boolean;
	showRevalueCost: boolean;
	hideRevalueCost: boolean;
    showCostAdjustments: boolean;
    hideCostAdjustments: boolean;
    hideDiscountSales: boolean;
    shwDiscountSales: boolean;
    showUnitSale: boolean;
    hideUnitSale: boolean;
    hideUnit: boolean;
    showUnit: boolean;
    hideQuantity: boolean;
    showQuantity: boolean=false;
    showSerial: boolean;
    hideSerial: boolean;
    hidePart: boolean;
    showPart: boolean;
    hideCategory: boolean;
    showCategory: boolean;
    showBin: boolean;
    hideBin: boolean;
    hideShelf: boolean;
    showShelf: boolean;
    hideLocation: boolean;
    showLocation: boolean;
    showWarehouse: boolean;
	hideWarehouse: boolean;
	managementAllow: boolean;
	locationAllow: boolean;
	shelfAllow: boolean;
	binAllow: boolean;
	categoryAllow: boolean;
	partAllow: boolean;
	serialAllow: boolean;
	quantityAllow: boolean;
	unitAllow: boolean;
	comapnyAllow: boolean;
	unitSaleAllow: boolean;
	discountSalesAllow: boolean;
	costAdjustmentAllow: boolean;
    allLocations: any[];
	allWareHouses: any[];
    allShelfs: any[];
    allBins: any[];
    warehouseId: any;
	locationId: any;
	allPartnumbersInfo: any[];
	partCollection: any[];
	itemclaColl: any[];
	adjustmentDatatypeData: any[];
	stockAdjustmentDataArray: any[]=[];
    selectedActionName: any;
	selectedPartId: any;
	stocklineAdjustmentObject: any[] = [];
	//sourceStockLineSetup.itemTypeId = 0;
	disableSave: boolean = true; allStockAdjustementInfo: any;
	stockAdjustmentDataArrayUpdated: boolean = true;
	stockAdjustmentDataArrayNew: boolean;
	sourceTimeLife: any = {}
	allManagemtninfo: any[] = [];
	copyOfAllManagemtninfo: any[] = [];
	maincompanylist: any[] = [];
	gridData: TreeNode[];
	cols1: any[];
    showManagement: boolean;
    hideManagement: boolean;
    showManagementData: boolean;
    hideManagementData: boolean;
	allAdjustmentReasons: any[] = [];
	companyId: any;
	showUnitDiscountSalePrice: boolean;
	showUnitRevalueStockCost: boolean;
	showUnitOther: boolean;
	showSalesDiscountSalePrice: boolean;
	showSalesRevalueStockCost: boolean;
	showSalesOther: boolean;
	timeLifeEditAllow: any;
	AllowEdit: boolean;
	sourceItemMaster: any = {};
    siteValueTrytoChnage: boolean;
    warehouseValueTrytoChange: boolean;
    locationValueTrytoChange: boolean;
    shelfValueTrytoChange: boolean;
    binValueTrytoChange: boolean;
    categoryValueTryChange: boolean;
    partValueTryChange: boolean;
    serialValueTryChange: boolean;
    quantityValueTryChange: boolean;
    unitcostValueTryChange: boolean;
    unitsalepriceTryValueChange: boolean;
    display: boolean;
    modelValue: boolean;
    CategorryError: boolean;
    unitcostTypeTryChange: boolean;
    unitSaleTypeTryChange: boolean;
    unitCostReasonTryChange: boolean;
    unitSaleReasonTryChange: boolean;
    partError: boolean;
    serialError: boolean;
    quantityError: boolean;
    unitCostValuError: boolean;
    unitCostTypeError: boolean;
    unitSaleValueError: boolean;
    unitSaleTypeError: boolean;
    unitCostAdjustmentReasonTypeChange: boolean;
    unitSaleAdjustmentReasonTypeChange: boolean;
    unitSaleAdjustmentReasonError: boolean;
    unitCostAdjustmentReasonError: boolean;
    descriptionbyPart: any;
    PartAdjustmentDataTypeId: any;
    partAdjustmentMemo: any;
	partBeforepart: any;
	testManagementStructure: any[] = [];
    showCompany: boolean;
    hideCompany: boolean;
    showDivision: boolean;
    hideDivision: boolean;
    showDepartment: boolean;
    hideDepartment: boolean;
    showBusiness: boolean;
	hideBusiness: boolean;
	bulist: any[] = [];
	departmentList: any[] = [];
	divisionlist: any[] = [];
    BuId: any;
    divId: any;
    depId: any;
    showRestrictQuantity: boolean;
    showFreeQuantity: boolean=false;
    hideSerialNumber: boolean;
    departmentAllow: boolean;
    divisionAllow: boolean;
    businessAllow: boolean;
	previousIsSerialized: any;
	partSerializedAdjustmentReasonError: boolean;
    serializedValue: any;
	//collectionofstockLine: any;
	ngOnInit(): void {
		
		this.loadData(); //for Loading StockLine Adjustment Data
		
		this.loadSiteData(); //Load Site Data
		this.loadWarehouseDataBeforeChange(); //Load Warehouse Data Before Change
		this.loadLocationDataBeforeChange();
		this.loadShelfDataBeforeChange();
		this.loadBinDataBeforeChange();
		this.loadAdjustmentReasonData();//for Stock Adjustment Reason Data
		this.disableSave = true;
		this.loadManagementdata();
		
		
		//this.loadWareHouseBeforeChange();
		//this.loadLocationBeforeChange();
		//this.loadShelfBeforeChange();
		//this.loadWarehouseData();
		//this.loadLocationData();
		//this.loadShelfData();
		//this.loadBinData();
		this.ptnumberlistdata();
		this.activeIndex = 0;
		this.stocklineser.currentUrl = '/stocklinemodule/stocklinepages/app-stock-adjustment';
		this.stocklineser.bredcrumbObj.next(this.stocklineser.currentUrl);

		this.filterpartItems(this.sourceStockLineSetup.partNumber);
		this.partnmIdOnLoad1(this.sourceStockLineSetup.partNumber);

	}
	constructor(public workFlowtService1: LegalEntityService, public itemser: ItemMasterService, public binService: BinService, public shelfService: ShelfService, public locationService: LocationService, public wareHouseService: WarehouseService, public workFlowtService: BinService, public siteService: SiteService, private _route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public stocklineser: StocklineService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private router: Router) {
		//this.displayedColumns.push('StockLine');
		this.dataSource = new MatTableDataSource();
		if (this.stocklineser.adjustmentCollection && this.stocklineser.isAdjustment == true) {
			//debugger;
			this.showLable = true;
			this.sourceStockAdjustment = this.stocklineser.adjustmentCollection;
		
			this.sourceStockLineSetup.partNumber = this.sourceStockAdjustment.partNumber;
			this.sourceStockLineSetup.partDescription = this.sourceStockAdjustment.partDescription;
			this.sourceStockLineSetup.partDescription = this.sourceStockAdjustment.partDescription;
			this.sourceStockLineSetup.stockLineId = this.sourceStockAdjustment.stl.stockLineId;
			this.sourceStockLineSetup.stockLineNumber = this.sourceStockAdjustment.stockLineNumber;
			this.sourceStockLineSetup.isSerialized = this.sourceStockAdjustment.im.isSerialized;
			if (this.sourceStockLineSetup.isSerialized) {
				this.hideSerialNumber = false;
			}

			if (this.sourceStockLineSetup.isSerialized == true) {
				this.hideSerialNumber = false;
				//this.showRestrictQuantity = true;
				this.showFreeQuantity = false;
			}
			else {
				this.hideSerialNumber = true;
				//this.showRestrictQuantity = false;
				this.showFreeQuantity = true;

			}

			if (this.sourceStockLineSetup.isSerialized == null || this.sourceStockLineSetup.isSerialized == 'null') {
				this.hideSerialNumber = true;
				///this.showRestrictQuantity = false;
				this.showFreeQuantity = true;
			}

			if (this.sourceStockLineSetup.isSerialized == 'undefined' || this.sourceStockLineSetup.isSerialized == undefined) {
				this.hideSerialNumber = true;
				//this.showRestrictQuantity = false;
				this.showFreeQuantity = true;
			}
			else { this.hideSerialNumber = false;}
			this.sourceStockLineSetup.controlNumber = this.sourceStockAdjustment.controlNumber;
			this.sourceStockLineSetup.stockLineId = this.sourceStockAdjustment.stockLineId;
			//this.sourceStockLineSetup.BeforecompanyId = this.sourceStockAdjustment.com.companyId;
			//this.sourceStockLineSetup.BeforebusinessUnitId = this.sourceStockAdjustment.bu.businessUnitId;
			//this.sourceStockLineSetup.BeforedepartmentId = this.sourceStockAdjustment.de.departmentId;
			//this.sourceStockLineSetup.BeforedivisionId = this.sourceStockAdjustment.di.divisionId;
			this.sourceStockLineSetup.BeforepartId = this.sourceStockAdjustment.partId;
			this.sourceStockLineSetup.BeforepartNumber = this.sourceStockAdjustment.partNumber;
			this.sourceStockLineSetup.Beforequantity = this.sourceStockAdjustment.quantity;
			this.sourceStockLineSetup.BeforeserialNumber = this.sourceStockAdjustment.serialNumber;
			this.sourceStockLineSetup.Beforesite = this.sourceStockAdjustment.siteName;
			this.sourceStockLineSetup.Beforewarehouse = this.sourceStockAdjustment.warehouse;
			this.sourceStockLineSetup.Beforelocation = this.sourceStockAdjustment.location;
			this.sourceStockLineSetup.Beforeshelf = this.sourceStockAdjustment.shelfName;
			this.sourceStockLineSetup.Beforebin = this.sourceStockAdjustment.binName;
			this.sourceStockLineSetup.BeforesiteId = this.sourceStockAdjustment.siteId;
			this.sourceStockLineSetup.BeforewarehouseId = this.sourceStockAdjustment.warehouseId;
			this.sourceStockLineSetup.BeforelocationId = this.sourceStockAdjustment.locationId;
			this.sourceStockLineSetup.BeforeshelfId = this.sourceStockAdjustment.shelfId;
			this.sourceStockLineSetup.BeforebinId = this.sourceStockAdjustment.binId;
			this.sourceStockLineSetup.BeforeunitSalesPrice = this.sourceStockAdjustment.unitSalesPrice;
			this.sourceStockLineSetup.BeforecoreUnitCost = this.sourceStockAdjustment.coreUnitCost;
			this.sourceStockLineSetup.managementCode = this.sourceStockAdjustment.code
			this.sourceStockLineSetup.beforeManagementStructureEntityId = this.sourceStockAdjustment.managementStructureEntityId;
			this.sourceTimeLife.timeLife = this.sourceStockAdjustment.timeLife;
			this.sourceStockLineSetup.timeLifeCyclesId = this.sourceStockAdjustment.timeLifeCyclesId  //TimeLifeId
			this.sourceStockLineSetup.itemTypeId = this.sourceStockAdjustment.itemTypeId;
			this.sourceStockLineSetup.unitCostAdjustmentReasonTypeId = this.sourceStockAdjustment.unitCostAdjustmentReasonTypeId
			
			if (this.sourceStockLineSetup.unitCostAdjustmentReasonTypeId == 7) {
				this.showUnitDiscountSalePrice = true;
				this.showUnitRevalueStockCost = false;
				this.showUnitOther = false;
			}
			else if (this.sourceStockLineSetup.unitCostAdjustmentReasonTypeId == 8) {
				this.showUnitDiscountSalePrice = false;
				this.showUnitRevalueStockCost = true;
				this.showUnitOther = false;
			} else {
				this.showUnitDiscountSalePrice = false;
				this.showUnitRevalueStockCost = false;
				this.showUnitOther = true;
			}
			
			this.sourceStockLineSetup.unitSalePriceAdjustmentReasonTypeId = this.sourceStockAdjustment.unitSalePriceAdjustmentReasonTypeId;

			if (this.sourceStockLineSetup.unitSalePriceAdjustmentReasonTypeId == 7) {
				this.showSalesDiscountSalePrice = true;
				this.showSalesRevalueStockCost = false;
				this.showSalesOther = false;
			}
			else if (this.sourceStockLineSetup.unitSalePriceAdjustmentReasonTypeId == 8) {
				this.showSalesDiscountSalePrice = false;
				this.showSalesRevalueStockCost = true;
				this.showSalesOther = false;
			} else {
				this.showUnitDiscountSalePrice = false;
				this.showUnitRevalueStockCost = false;
				this.showSalesOther = true;
			}

			//TimeLife
			this.sourceTimeLife.timeLifeCyclesId = this.sourceStockAdjustment.timeLifeCyclesId
			this.sourceTimeLife.cyclesSinceNew = this.sourceStockAdjustment.cyclesSinceNew;
			this.sourceTimeLife.cyclesSinceOVH = this.sourceStockAdjustment.cyclesSinceOVH;
			this.sourceTimeLife.cyclesSinceRepair = this.sourceStockAdjustment.cyclesSinceRepair;
			this.sourceTimeLife.cyclesSinceInspection = this.sourceStockAdjustment.cyclesSinceInspection;
			this.sourceTimeLife.timeSinceNew = this.sourceStockAdjustment.timeSinceNew;
			this.sourceTimeLife.timeSinceOVH = this.sourceStockAdjustment.timeSinceOVH;
			this.sourceTimeLife.timeSinceRepair = this.sourceStockAdjustment.timeSinceRepair;
			this.sourceTimeLife.timeSinceInspection = this.sourceStockAdjustment.timeSinceInspection;
			this.sourceTimeLife.lastSinceNew = this.sourceStockAdjustment.lastSinceNew;
			this.sourceTimeLife.lastSinceOVH = this.sourceStockAdjustment.lastSinceOVH;
			this.sourceTimeLife.lastSinceInspection = this.sourceStockAdjustment.lastSinceInspection;


		}
	}

	private onStocklineAdjustmentDatatypeData()
	{
		this.stocklineser.getStockLineAdjustmentDatatypeList().subscribe(   //Getting Site List Hear
			results => this.onAdjustmentDataLoadSuccessful(results[0]), //Pasing first Array and calling Method
			error => this.onDataLoadFailed(error)
		);
	}

	private onAdjustmentDataLoadSuccessful(allWorkFlows: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.adjustmentDatatypeData = allWorkFlows;
		console.log(allWorkFlows);
	}

	private loadManagementdata() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService1.getManagemententity().subscribe(
			results => this.onManagemtntdataLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private loadAdjustmentReasonData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.stocklineser.getStocklineAdjustmentreason().subscribe(
			results => this.onDataLoadAdjustmentReasonSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onDataLoadAdjustmentReasonSuccessful(allWorkFlows: any) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		
		this.allAdjustmentReasons = allWorkFlows;
		//this.allAdjustmentReasons

	}

	makeNestedObj(arr, parent) {
		var out = []
		let out1 = [];
		var k = 0;
		for (var i in arr) {
			if (arr[i].managementStructureId == parent) {
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

		for (let i = 0; i < this.allManagemtninfo.length; i++)
		{

			if (this.allManagemtninfo[i].parentId == null) {
				this.maincompanylist.push(this.allManagemtninfo[i]);

			}

		}

		

		//Implimention Management Structure Reverece
		this.gridData = this.makeNestedObj(this.allManagemtninfo, this.sourceStockLineSetup.beforeManagementStructureEntityId);



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

		this.getBusUList(this.sourceStockLineSetup.companyId); //default BU
		this.getDepartmentlist(this.sourceStockLineSetup.businessUnitId); //default BU
		this.getDivisionlist(this.sourceStockLineSetup.departmentId); //default BU

		this.sourceStockLineSetup.comId = null;

	}

	//private onManagemtntdataLoad(getAtaMainList: any[])
	//{
	//	// alert('success');
	//	this.alertService.stopLoadingMessage();
	//	this.loadingIndicator = false;
	//	this.dataSource.data = getAtaMainList;
	//	this.allManagemtninfo = getAtaMainList;
		

	//	if (this.allManagemtninfo)
	//	{
	//		for (let i = 0; i < this.allManagemtninfo.length; i++) {
	//			this.copyOfAllManagemtninfo.push(JSON.parse(JSON.stringify(this.allManagemtninfo[i])));
	//		}
	//	}

		
	//	if (this.sourceStockLineSetup.managementStructureEntityId && this.allManagemtninfo)
	//	{
	//		this.getBUList(1, this.sourceStockLineSetup.managementStructureEntityId, this.sourceStockLineSetup.ManagementStructureReason);
	//	}
	//}

	getBusUList(companyId) {
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

		this.sourceStockLineSetup.buId = null;

		console.log(this.bulist);

	}
	getDepartmentlist(businessUnitId) {
		this.sourceStockLineSetup.managementStructureEntityId = businessUnitId;

		this.departmentList = [];
		this.divisionlist = [];

		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == businessUnitId) {
				this.departmentList.push(this.allManagemtninfo[i]);
			}
		}
		this.sourceStockLineSetup.deId = null;

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

	getComtoBusList(AdjustmentDataTypeId, companyId, AdjustmentMemo)
	{
		this.sourceStockLineSetup.managementStructureEntityId = companyId;

		if (this.sourceStockLineSetup.comId)
		{
			this.bulist = [];
			this.departmentList = [];
			this.divisionlist = [];
			
			this.getBusUList(this.sourceStockLineSetup.comId); //getting By change
		}
		else
		{
			this.bulist = [];
			this.departmentList = [];
			this.divisionlist = [];
			//this.sourceStockLineSetup.buId = null;
			this.getBusUList(this.sourceStockLineSetup.companyId);//getting By Default
		}
		
		this.getBUList(AdjustmentDataTypeId, this.sourceStockLineSetup.managementStructureEntityId, AdjustmentMemo)
	}
	getBustoDepList(AdjustmentDataTypeId, companyId, AdjustmentMemo)
	{
		this.sourceStockLineSetup.managementStructureEntityId = companyId;
		//this.BuId = this.sourceStockLineSetup.managementStructureEntityId;
		if (this.sourceStockLineSetup.buId)
		{
			this.departmentList = [];
			this.divisionlist = [];
			
			this.getDepartmentlist(this.sourceStockLineSetup.buId);
				//getting By change
		}
		else {
			this.departmentList = [];
			this.divisionlist = [];
			
			this.getDepartmentlist(this.sourceStockLineSetup.businessUnitId);//getting By Default
		}
		
		this.getBUList(AdjustmentDataTypeId, this.sourceStockLineSetup.managementStructureEntityId, AdjustmentMemo)
	}
	getDepoDivList(AdjustmentDataTypeId, companyId, AdjustmentMemo) {
		this.sourceStockLineSetup.managementStructureEntityId = companyId;
		//this.depId = this.sourceStockLineSetup.managementStructureEntityId;
		if (this.sourceStockLineSetup.deId)
		{
			this.divisionlist = [];
		
			this.getDivisionlist(this.sourceStockLineSetup.deId); //getting By change
		}
		else
		{
			this.divisionlist = [];
			this.getDivisionlist(this.sourceStockLineSetup.departmentId);//getting By Default
		}
		//this.getDivisionlist(this.sourceStockLineSetup.deId);
		this.getBUList(AdjustmentDataTypeId, this.sourceStockLineSetup.managementStructureEntityId, AdjustmentMemo)
	}
	getDivFinalList(AdjustmentDataTypeId, companyId, AdjustmentMemo)
	{
		this.sourceStockLineSetup.managementStructureEntityId = companyId;
		this.getBUList(AdjustmentDataTypeId, this.sourceStockLineSetup.managementStructureEntityId, AdjustmentMemo)
	}



	getBUList(AdjustmentDataTypeId, companyId, AdjustmentMemo)
	{
		//this.bulist = [];
		//this.departmentList = [];
		//this.divisionlist = [];

		//this.companyId = companyId;
		//for (let i = 0; i < this.allManagemtninfo.length; i++) {
		//	if (this.allManagemtninfo[i].parentId == companyId) {
		//		this.bulist.push(this.allManagemtninfo[i]);
		//	}
		//}
		//for Structure
		//if (this.allManagemtninfo)
		//{

		//	this.gridData = this.makeNestedObj(this.allManagemtninfo, companyId);
		//}

		//if (this.gridData.length == 0)
		//{
		//	this.workFlowtService1.getManagemententity().subscribe(
		//		results => this.onManagemtntdataLoad(results[0]),
		//		error => this.onDataLoadFailed(error)
		//	);

		//}

		//if (this.gridData.length == 0)
		//{
		//	this.gridData = this.makeNestedObj(this.allManagemtninfo, companyId);
		//}

		//this.cols1 = [
		//	{ field: 'code', header: 'Code' },
		//	{ field: 'name', header: 'Name' },
		//	//{ field: 'description', header: 'Description' },
		//	//{ field: 'legalEntityId', header: 'ID' },
		//];
		this.showManagement = true;

		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.beforeManagementStructureEntityId, afterSite: this.sourceStockLineSetup.managementStructureEntityId, adjustmentMemo: AdjustmentMemo}]
		if (this.stockAdjustmentDataArray.length <= 0) {
			this.stockAdjustmentDataArray.push(data);
		}
		else {
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);
		}
	}

	
	unitCostAdjustmentType(adjustmentReasonId)
	{


		if (adjustmentReasonId == 7) {
			this.showUnitDiscountSalePrice = true;
			this.showUnitRevalueStockCost = false;
			this.showUnitOther = false;
		}
		else if (adjustmentReasonId == 8) {
			this.showUnitDiscountSalePrice = false;
			this.showUnitRevalueStockCost = true;
			this.showUnitOther = false;
		} else {
			this.showUnitDiscountSalePrice = false;
			this.showUnitRevalueStockCost = false;
			this.showUnitOther = true;
		}
	}

	unitSalesAdjustmentType(adjustmentReasonId) {
		if (adjustmentReasonId == 7) {
			this.showSalesDiscountSalePrice = true;
			this.showSalesRevalueStockCost = false;
			this.showSalesOther = false;
		}
		else if (adjustmentReasonId == 8) {
			this.showSalesDiscountSalePrice = false;
			this.showSalesRevalueStockCost = true;
			this.showSalesOther = false;
		} else {
			this.showUnitDiscountSalePrice = false;
			this.showUnitRevalueStockCost = false;
			this.showUnitOther = true;
		}

	}

	private onDataLoadSuccessful(allWorkFlows:any) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allStockAdjustementInfo = allWorkFlows;
		console.log(allWorkFlows); 
	}

	private onDataLoadFailed(error: any) {
		// alert(error);
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

	}

	isManagemnetEnable(managementAllow)
	{
		if (managementAllow == "A")
		{
			this.showManagementData = true;
			this.hideManagementData = false;
		}
		if (managementAllow == "B")
		{
			this.showManagementData = false;
			this.hideManagementData = true;
		}

	}

	public isSiteEnable(siteAllow) {

		

		if (siteAllow == "A") {
			this.showSite = true;
			this.hideSite = false;

			this.showWarehouse = true; this.hideWarehouse = false;
			this.showLocation = true; this.hideLocation = false;
			this.showShelf = true; this.hideShelf = false;
			this.showBin = true; this.hideBin = false;


			this.warehouseAllow = true;
			this.locationAllow = true;
			this.shelfAllow = true;
			this.binAllow = true;	

			//this.siteValueTrytoChnage = true;
			//this.warehouseValueTrytoChange = false;
			//this.locationValueTrytoChange = false;
			//this.shelfValueTrytoChange = false;
			//this.binValueTrytoChange = false;
		}

		if (siteAllow == "B") {
			this.hideSite = true;
			this.showSite = false;

			this.hideWarehouse = true; this.showWarehouse = false;
			this.hideLocation = true; this.showLocation = false;
			this.hideShelf = true; this.showShelf = false;
			this.hideBin = true; this.showBin = false;

			this.warehouseAllow = false;
			this.locationAllow = false;
			this.shelfAllow = false;
			this.binAllow = false;	

			//this.siteValueTrytoChnage = false;
			//this.warehouseValueTrytoChange = false;
			//this.locationValueTrytoChange = false;
			//this.shelfValueTrytoChange = false;
			//this.binValueTrytoChange = false;
		}
	}

	public iswarehouseEnable(warehouseAllow)
	{
		

		if (warehouseAllow == "A") {
			this.showWarehouse = true;
			this.hideWarehouse = false;

			this.showLocation = true; this.hideLocation = false;
			this.showShelf = true; this.hideShelf = false;
			this.showBin = true; this.hideBin = false;

			this.locationAllow = true;
			this.shelfAllow = true;
			this.binAllow = true;	

			//this.warehouseValueTrytoChange = true; 
			//this.locationValueTrytoChange = false;
			//this.shelfValueTrytoChange = false;
			//this.binValueTrytoChange = false;

		}

		if (warehouseAllow == "B") {
			this.hideWarehouse = true;
			this.showWarehouse = false;

			this.hideLocation = true; this.showLocation = false;
			this.hideShelf = true; this.showShelf = false;
			this.hideBin = true; this.showBin = false;

			this.locationAllow = false;
			this.shelfAllow = false;
			this.binAllow = false;	


			//this.warehouseValueTrytoChange = false;
			//this.locationValueTrytoChange = false;
			//this.shelfValueTrytoChange = false;
			//this.binValueTrytoChange = false;
		}
	}
	public isLocationEnable(locationAllow)
	{
		

		if (locationAllow == "A") {
			this.showLocation = true;
			this.hideLocation = false;

			this.showShelf = true; this.hideShelf = false;
			this.showBin = true; this.hideBin = false;

			this.shelfAllow = true;
			this.binAllow = true;	

			//this.locationValueTrytoChange = true;
			//this.shelfValueTrytoChange = false;
			//this.binValueTrytoChange = false;

		}

		if (locationAllow == "B") {
			this.hideLocation = true;
			this.showLocation = false;

			this.hideShelf = true; this.showShelf = false;
			this.hideBin = true; this.showBin = false;

			this.shelfAllow = false;
			this.binAllow = false;	

			//this.locationValueTrytoChange = false;
			//this.shelfValueTrytoChange = false;
			//this.binValueTrytoChange = false;
		}
	}
	public isShelfEnable(shelfAllow)
	{
		

		if (shelfAllow == "A") {
			this.showShelf = true;
			this.hideShelf = false;


			this.showBin = true; this.hideBin = false;

			this.binAllow = true;	


			//this.shelfValueTrytoChange = true;
			//this.binValueTrytoChange = false;
		}

		if (shelfAllow == "B") {
			this.hideShelf = true;
			this.showShelf = false;

			this.hideBin = true; this.showBin = false;

			this.binAllow = false;	


			//this.shelfValueTrytoChange = false;
			//this.binValueTrytoChange = false;
		}
	}
	public isBinEnable(binAllow)
	{
		

		if (binAllow == "A") {
			this.showBin = true;
			this.hideBin = false;

			//this.binValueTrytoChange = true;

		}

		if (binAllow == "B") {
			this.hideBin = true;
			this.showBin = false;

			//this.binValueTrytoChange = false;
		}
	}
	public isCategoryEnable(categoryAllow)
	{
		

		if (categoryAllow == "A") {
			this.showCategory = true;
			this.hideCategory = false;

			this.categoryValueTryChange = true;

		}

		if (categoryAllow == "B") {
			this.hideCategory = true;
			this.showCategory = false;

			this.categoryValueTryChange = false;
		}
	}
	public isPartEnable(partAllow)
	{
		

		if (partAllow == "A") {
			this.showPart = true;
			this.hidePart = false;

			this.partValueTryChange = true;

		}

		if (partAllow == "B") {
			this.hidePart = true;
			this.showPart = false;

			this.partValueTryChange = false;
		}
	}
	public isSerialEnable(serialAllow)
	{
		

		if (serialAllow == "A") {
			this.showSerial = true;
			this.hideSerial = false;

			this.serialValueTryChange = true;

		}

		if (serialAllow == "B") {
			this.hideSerial = true;
			this.showSerial = false;

			this.serialValueTryChange = false;
		}
	}

	public isQuantityEnable(quantityAllow)
	{
		

		if (quantityAllow == "A") {
			this.showQuantity = true;
			this.hideQuantity = false;

			this.quantityValueTryChange = true;

		}

		if (quantityAllow == "B") {
			this.hideQuantity = true;
			this.showQuantity = false;

			this.quantityValueTryChange = false;

			this.sourceStockLineSetup.Afterquantity = null;
		}
	}

	public isUnitEnable(unitAllow)
	{
		

		if (unitAllow == "A") {
			this.showUnit = true;
			this.hideUnit = false;

			this.unitcostValueTryChange = true;
			this.unitcostTypeTryChange = true;
			this.unitCostReasonTryChange = true;
			this.unitCostAdjustmentReasonTypeChange = true; 

		}

		if (unitAllow == "B") {
			this.hideUnit = true;
			this.showUnit = false;

			this.unitcostValueTryChange = false;
			this.unitcostTypeTryChange = false;
			this.unitCostReasonTryChange = false;
			this.unitCostAdjustmentReasonTypeChange =  false; 
		}
	}

	isCompanyEnable(comapnyAllow)
	{
		if (comapnyAllow == "A")
		{
			this.bulist = [];
			this.departmentList = [];
			this.divisionlist = [];

			this.showCompany = true;
			this.showBusiness = true;
			this.showDepartment = true;
			this.showDivision = true;

			this.hideCompany = false;
			this.hideBusiness = false;
			this.hideDepartment = false;
			this.hideDivision = false;

			this.comapnyAllow = true;
			this.businessAllow = true;
			this.departmentAllow = true;
			this.divisionAllow = true;



			//this.hideCompany = false;
			//this.hideBusiness = true;
			//this.hideDepartment = true;
			//this.hideDivision = true;
			//this.unitcostValueTryChange = true;
			//this.unitcostTypeTryChange = true;
			//this.unitCostReasonTryChange = true;
			//this.unitCostAdjustmentReasonTypeChange = true;

		}

		if (comapnyAllow == "B") {

			this.bulist = [];
			this.departmentList = [];
			this.divisionlist = [];

			this.hideCompany = true;
			this.hideBusiness = true;
			this.hideDepartment = true;
			this.hideDivision = true;

			this.showCompany = false;
			this.showBusiness = false;
			this.showDepartment = false;
			this.showDivision = false;

			this.comapnyAllow = false;
			this.businessAllow = false;
			this.departmentAllow = false;
			this.divisionAllow = false;

			this.sourceStockLineSetup.comId = null;
			this.sourceStockLineSetup.buId = null;
			this.sourceStockLineSetup.deId = null;


			//this.showCompany = false;

			//this.unitcostValueTryChange = false;
			//this.unitcostTypeTryChange = false;
			//this.unitCostReasonTryChange = false;
			//this.unitCostAdjustmentReasonTypeChange = false;
		}

	}
	isBusinessEnable(businessAllow)
	{
		if (businessAllow == "A")
		{

			this.departmentList = [];
			this.divisionlist = [];

			if (this.sourceStockLineSetup.comId)
			{
				this.getBusUList(this.sourceStockLineSetup.comId);
			}
			else
			{
				this.getBusUList(this.sourceStockLineSetup.companyId);//getting By Default
			}

			this.showBusiness = true;
			this.showDepartment = true;
			this.showDivision = true;

			this.hideBusiness = false;
			this.hideDepartment = false;
			this.hideDivision = false;
			//this.hideBusiness = false;

			this.businessAllow = true;
			this.departmentAllow = true;
			this.divisionAllow = true;
			
		}

		if (businessAllow == "B")
		{
			this.hideBusiness = true;
			this.hideBusiness = true;
			this.hideDepartment = true;

			this.showBusiness = false;
			this.showDepartment = false;
			this.showDivision = false;

			this.businessAllow = false;
			this.departmentAllow = false;
			this.divisionAllow = false;

			//this.showBusiness = false;
			this.getBusUList(this.sourceStockLineSetup.companyId);//getting By Default
			this.sourceStockLineSetup.comId = null;
		}

	}

	isDepartmentEnable(departmentAllow)
	{
		if (departmentAllow == "A")
		{

			this.divisionlist = [];
			if (this.sourceStockLineSetup.buId)
			{
				this.getDepartmentlist(this.sourceStockLineSetup.buId);
			}
			else
			{
				this.getDepartmentlist(this.sourceStockLineSetup.businessUnitId);//getting By Default
			}

			this.showDepartment = true;
			this.showDivision = true;

			this.hideDepartment = false;
			this.hideDivision = false;

			this.departmentAllow = true;
			this.divisionAllow = true;
			//this.hideDepartment = false;

			
			

		}

		if (departmentAllow == "B")
		{
			this.hideDepartment = true;
			this.hideDivision = true;

			this.showDepartment = false;
			this.showDivision = false;

			this.departmentAllow = false;
			this.divisionAllow = false;
			//this.showDepartment = false;

			this.getDepartmentlist(this.sourceStockLineSetup.businessUnitId);//getting By Default
			this.sourceStockLineSetup.buId = null;

		}

	}
	isDivisionEnable(divisionAllow) {
		if (divisionAllow == "A") {
			this.showDivision = true;

			this.hideDivision = false;

			this.divisionAllow = true;
			//this.hideDivision = false;

			if (this.sourceStockLineSetup.deId) {
				this.getDivisionlist(this.sourceStockLineSetup.deId); //getting By change
			}
			else {
				this.getDivisionlist(this.sourceStockLineSetup.departmentId);//getting By Default
			}
			

		}

		if (divisionAllow == "B") {
			this.hideDivision = true;

			this.showDivision = false;

			this.divisionAllow = false;
			//this.showDivision = false;

			this.getDivisionlist(this.sourceStockLineSetup.departmentId);//getting By Default
			this.sourceStockLineSetup.deId = null;
		}

	}

	public isUnitSaleEnable(unitSaleAllow)
	{
		
		if (unitSaleAllow == "A") {
			this.showUnitSale = true;
			this.hideUnitSale = false;

			this.unitsalepriceTryValueChange = true;
			this.unitSaleTypeTryChange = true;
			this.unitSaleReasonTryChange = true;
			this.unitSaleAdjustmentReasonTypeChange = true; 


		}

		if (unitSaleAllow == "B") {
			this.hideUnitSale = true;
			this.showUnitSale = false;

			this.unitsalepriceTryValueChange = false;
			this.unitSaleTypeTryChange = false;
			this.unitSaleReasonTryChange = false;
			this.unitSaleAdjustmentReasonTypeChange = true; 

		}

	}

	isDiscountSalesEnable(discountSalesAllow)
	{
		if (discountSalesAllow == "A") {
			this.shwDiscountSales = true;
			this.hideDiscountSales = false;

		}

		if (discountSalesAllow == "B") {
			this.hideDiscountSales = true;
			this.shwDiscountSales = false;
		}
	}

	isCostAdjustmentEnable(costAdjustmentAllow)
	{
		if (costAdjustmentAllow == "A") {
			this.showCostAdjustments = true;
			this.hideCostAdjustments = false;

		}

		if (costAdjustmentAllow == "B") {
			this.hideCostAdjustments = true;
			this.showCostAdjustments = false;
		}

	}

	isRevalueStockCostEnable(reValueStockAllow)
	{
		if (reValueStockAllow == "A") {
			this.showRevalueCost = true;
			this.hideRevalueCost = false;

		}

		if (reValueStockAllow == "B") {
			this.hideRevalueCost = true;
			this.showRevalueCost = false;
		}
	}
	private loadData() {
		this.stocklineser.getStockLineAdjustmentList(this.sourceStockLineSetup.stockLineId).subscribe(
			results => this.onDataLoadSuccessful(results),
			error => this.onDataLoadFailed(error)
		);
		
		this.selectedColumns = this.cols;

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
	

	private onSaiteDataLoadSuccessful(getSiteList: Site[]) { //Storing Site Data
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getSiteList; //need
		this.allSites = getSiteList; //Contain first array of Loaded table Data will put in Html as [value]
	}

	private loadWarehouseDataBeforeChange()  //retriving SIte Information
	{
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.binService.getWareHouseDate(this.sourceStockLineSetup.BeforesiteId).subscribe(   //Getting Site List Hear
			results => this.onWareHouseDataLoadSuccessfulBeforeChange(results), //Pasing first Array and calling Method
			error => this.onDataLoadFailed(error)
		);
	}

	private loadLocationDataBeforeChange()
	{
		this.binService.getLocationDate(this.sourceStockLineSetup.BeforewarehouseId).subscribe(   //Getting Site List Hear
			results => this.onLocationDataLoadSuccessfulBeforeChange(results), //Pasing first Array and calling Method
			error => this.onDataLoadFailed(error)
		);

	}

	private loadShelfDataBeforeChange()
	{
		this.binService.getShelfDate(this.sourceStockLineSetup.BeforelocationId).subscribe(   //Getting Site List Hear
			results => this.onShelfDataLoadSuccessfulBeforeChange(results), //Pasing first Array and calling Method
			error => this.onDataLoadFailed(error)
		);
	}

	private loadBinDataBeforeChange() {
		this.stocklineser.getStockLineBinDateBeforeChange(this.sourceStockLineSetup.BeforeshelfId).subscribe(   //Getting Site List Hear
			results => this.onBinDataLoadSuccessfulBeforeChange(results), //Pasing first Array and calling Method
			error => this.onDataLoadFailed(error)
		);
	}


	

	onWareHouseDataLoadSuccessfulBeforeChange(getWarehouseList: any)
	{
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getWarehouseList; //need
		//var arr = new Array(getWarehouseList);
		this.allWareHouses = getWarehouseList; //Contain first array of Loaded table Data will put in Html as [value]
	}

	onLocationDataLoadSuccessfulBeforeChange(getLocationList: any)
	{
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getLocationList; //need
		//var arr = new Array(getWarehouseList);
		this.allLocations = getLocationList; //Contain first array of Loaded table Data will put in Html as [value]

	}

	onShelfDataLoadSuccessfulBeforeChange(getShelfList: any)
	{
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getShelfList; //need
		//var arr = new Array(getWarehouseList);
		this.allShelfs = getShelfList; //Contain first array of Loaded table Data will put in Html as [value]

	}

	onBinDataLoadSuccessfulBeforeChange(getBinList: any)
	{
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getBinList; //need
		//var arr = new Array(getWarehouseList);
		this.allBins = getBinList; //Contain first array of Loaded table Data will put in Html as [value]
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

	partnmIdOnLoad(event) {
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
	partnmIdOnLoad1(event) {
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
			this.itemser.getDescriptionbypart(event).subscribe((data:any) => {
				if (data) {
					this.descriptionbyPart = data[0]
					//this.sourcePartAction = this.descriptionbyPart;

					this.sourceStockLineSetup.partDescription = data[0][0].partDescription; //Passing Part Description based on Change Part

					this.sourceStockLineSetup.isSerialized = data[0][0].isSerialized;
					//this.serializedValue = this.sourceStockLineSetup.isSerialized;

					if (this.sourceStockLineSetup.isSerialized) {
						this.showFreeQuantity = false;
						this.hideSerialNumber = false
					}

					else
					{
						this.showFreeQuantity = true;
						this.hideSerialNumber = true;
					}

					this.previousIsSerialized = this.sourceStockLineSetup.isSerialized;

				}});
			
		}
	}

	partnmId(event, AdjustmentDataTypeId, Beforepart, Afterpart, AdjustmentMemo)
	{
		this.PartAdjustmentDataTypeId = AdjustmentDataTypeId;
		this.partAdjustmentMemo = AdjustmentMemo;
		this.partBeforepart = Beforepart;

		this.partValueTryChange = false;

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
		//in This we are Getiing isSerialized,PartDescription,Tage Date,shelfLife,tagType,isPMA,isDER Basedon Part Selection

		this.partValueSelect(this.PartAdjustmentDataTypeId, this.partBeforepart, this.selectedPartId, this.partAdjustmentMemo);
		if (allWorkFlows)
		{
			this.descriptionbyPart = allWorkFlows[0]
			//this.sourcePartAction = this.descriptionbyPart;

			this.sourceStockLineSetup.partDescription = allWorkFlows[0].partDescription; //Passing Part Description based on Change Part

			this.sourceStockLineSetup.isSerialized = allWorkFlows[0].isSerialized;

			if (this.sourceStockLineSetup.isSerialized)
			{
				this.showFreeQuantity = false;
				this.hideSerialNumber = false
			}

			else
			{
				this.showFreeQuantity = true;
				this.hideSerialNumber = true;
				this.sourceStockLineSetup.isSerialized = false;
			}

			if (this.previousIsSerialized == true && this.sourceStockLineSetup.isSerialized == false)
			{
				this.partSerializedAdjustmentReasonError = true;
				this.display = true;
				this.modelValue = true;
			}
			else {
				this.partSerializedAdjustmentReasonError = false;
				this.display = false;
				this.modelValue = false;
			}

		}
		

		if (this.sourceStockLineSetup.isSerialized == true) {
			this.hideSerialNumber = false;
			//this.showRestrictQuantity = true;
			this.showFreeQuantity = false;
		}
		else {
			this.hideSerialNumber = true;
			//this.showRestrictQuantity = false;
			this.showFreeQuantity = true;

		}

		if (this.sourceStockLineSetup.isSerialized == 'undefined') {
			this.hideSerialNumber = false;
			//this.showRestrictQuantity = false;
			this.showFreeQuantity = true;
		}

		

		if (allWorkFlows[0].isShelfLifeAvailable == null)
		{
			this.sourceStockLineSetup.shelfLife = false;
		}
		else
		{
			this.sourceStockLineSetup.shelfLife = allWorkFlows[0].isShelfLifeAvailable;
		}


		this.sourceStockLineSetup.isPMA = allWorkFlows[0].pma;
		this.sourceStockLineSetup.isDER = allWorkFlows[0].der;

		this.sourceTimeLife.timeLife = allWorkFlows[0].isTimeLife;

		this.sourceStockLineSetup.itemMasterId = allWorkFlows[0].itemMasterId;

	}


	//filterpartItems(event) {

	//	this.partCollection = [];
	//	this.itemclaColl = [];
	//	if (this.allPartnumbersInfo) {
	//		if (this.allPartnumbersInfo.length > 0) {

	//			for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
	//				let partName = this.allPartnumbersInfo[i].partNumber;
	//				if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
	//					this.itemclaColl.push([{
	//						"partId": this.allPartnumbersInfo[i].partId,
	//						"partName": partName
	//					}]),

	//						this.partCollection.push(partName);
	//				}
	//			}
	//		}
	//	}

	
	//}

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
	

	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
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

		//this.itemclass();
	}
	private saveFailedHelper(error: any) {
		this.isSaving = false;
		this.alertService.stopLoadingMessage();
		this.alertService.showStickyMessage("Save Error", "The below errors occured while saving your changes:", MessageSeverity.error, error);
		this.alertService.showStickyMessage(error, null, MessageSeverity.error);
	}

	closeDialoge()
	{
		this.display = false;
	}

	savestockLineadjustmentclose()
	{
		if ((this.categoryValueTryChange == true) && (!this.sourceStockLineSetup.afterItemTypeId)) {
			this.CategorryError = true;
		}
		else
		{
			this.CategorryError = false;
		}

		if ((this.partValueTryChange == true) && (!this.sourceStockLineSetup.AfterpartNumber)) {
			this.partError = true;
		}
		else
		{
			this.partError = false;
		}

		if ((this.serialValueTryChange == true) && (!this.sourceStockLineSetup.AfterserialNumber)) {
			this.serialError = true;
		}
		else
		{
			this.serialError = false;
		}

		//if ((this.quantityValueTryChange == true) && (this.sourceStockLineSetup.Afterquantity >= 0))
		//{
		//	this.quantityError = false;
		//}
		//else if (this.quantityValueTryChange == true)
		//{
		//	this.quantityError = true;
		//}

		if ((this.unitcostValueTryChange == true) && (!this.sourceStockLineSetup.AfterUnitCost)) {
			
			this.unitCostValuError = true;
		}
		else
		{
			this.unitCostValuError = false;
		}


		if ((this.unitcostTypeTryChange == true) && (!this.sourceStockLineSetup.unitCostAdjustmentReasonTypeId)) {
			this.unitCostTypeError = true;
		}

		else
		{
			this.unitCostTypeError = false;
		}

		if ((this.unitsalepriceTryValueChange == true) && (!this.sourceStockLineSetup.AfterunitSalesPrice)) {
			this.unitSaleValueError = true;
		}

		else {
			this.unitSaleValueError = false;
		}

		if ((this.unitSaleTypeTryChange == true) && (!this.sourceStockLineSetup.unitSalePriceAdjustmentReasonTypeId)) {
			this.unitSaleTypeError = true;
		}

		else {
			this.unitSaleTypeError = false;
		}

		if ((this.unitCostAdjustmentReasonTypeChange == true) && (!this.sourceStockLineSetup.UnitCostAdjustmentReason)) {
			this.unitCostAdjustmentReasonError = true;
		}

		else {
			this.unitCostAdjustmentReasonError = false;
		}

		if ((this.unitSaleAdjustmentReasonTypeChange == true) && (!this.sourceStockLineSetup.unitSalesPriceAdjustmentReason)) {
			this.unitSaleAdjustmentReasonError = true;
		}

		else {
			this.unitSaleAdjustmentReasonError = false;
		}

		if ((this.CategorryError == true) || (this.partError == true) || (this.serialError == true)  || (this.unitCostValuError == true)
			|| (this.unitCostTypeError == true) || (this.unitSaleValueError == true) || (this.unitSaleTypeError == true) || (this.unitCostAdjustmentReasonError == true) || (this.unitSaleAdjustmentReasonError == true))
		{
			this.display = true;
			this.modelValue = true;
		}


		if ((this.CategorryError == false) && (this.partError == false) && (this.serialError == false)  && (this.unitCostValuError == false)
			&& (this.unitCostTypeError == false) && (this.unitSaleValueError == false) && (this.unitSaleTypeError == false) && (this.unitCostAdjustmentReasonError == false) && (this.unitSaleAdjustmentReasonError == false))
		{
			if (this.allStockAdjustementInfo.length > 0) {
				//for (let i = 0; i <= this.stockAdjustmentDataArray.length; i++) {
				//	this.stockAdjustmentDataArray[i][0].stockLineId = this.sourceStockLineSetup.stockLineId;
				//	//calling Service for Stockline Adjustment updateStockAdjustmentToListIfExist
				//	this.stocklineser.updateStockAdjustmentToListIfExist(this.stockAdjustmentDataArray[i][0]).subscribe(data => {

				//	});

				//}

				for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
					this.stockAdjustmentDataArrayNew = true;

					for (let j = 0; j < this.allStockAdjustementInfo.length; j++) {
						if (this.stockAdjustmentDataArray.length > 0) {
							if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == this.allStockAdjustementInfo[j].stocklineAdjustmentDataTypeId) {

								console.log("update");
								this.stockAdjustmentDataArray[i][0].stockLineId = this.sourceStockLineSetup.stockLineId; //adding StockLine Id for Array

								//Calling Service for Updating Stockline Adjustment
								this.stocklineser.updateStockAdjustmentToListIfExist(this.stockAdjustmentDataArray[i][0]).subscribe();

								//for Update in StockLine List
								this.updateStockLineAdjustmentToListMethod();

								this.stockAdjustmentDataArray.splice(i, 1);
								j = 0;
								
								//this.stockAdjustmentDataArrayUpdated = false;
								//break;
							}
							
						}
						
					}



					if ((this.stockAdjustmentDataArray.length > 0)) {
						console.log('new');
						this.stockAdjustmentDataArray[i][0].stockLineId = this.sourceStockLineSetup.stockLineId; //adding StockLine Id for Array
						//for New Stockline Adjustment if Not Exist
						this.stocklineser.newStockLineAdjustment(this.stockAdjustmentDataArray[i][0]).subscribe();

						//After New Need to Update StocLine List
						this.updateStockLineAdjustmentToListMethod();

					}

					//if Data is There in the Adjustment Table with Stockline Id But Adding New Adjustment value


				}
				this.savesuccessCompleted(this.sourceStockLineSetup);

			}


			else {
				this.isSaving = true;

				if (!this.sourceStockLineSetup.stockLineId) {


					this.sourceStockLine.createdBy = this.userName;
					this.sourceStockLine.updatedBy = this.userName;
					// this.sourceAction.defaultMessageCode = this.messageName;
					this.sourceStockLine.masterCompanyId = 1;
					//this.sourceStockLine.itemTypeId = 1;
					this.savesuccessCompleted(this.sourceStockLineSetup);


					//this.stocklineser.newStockLineAdjustment(this.stockAdjustmentDataArray).subscribe(data => {
					//	this.collectionofstockLine = data;
					//	this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-adjustment')
					//	this.value = 1;
					//	this.savestocklineadsaveclose();
					//})


				}
				else {

					this.sourceStockLine.updatedBy = this.userName;
					this.sourceStockLine.masterCompanyId = 1;

					//sitetryChange: this.siteValueTrytoChnage,
					//	warehousetryChange: this.warehouseValueTrytoChange,
					//		locationtryChange: this.locationValueTrytoChange,
					//			shelftryChange: this.shelfValueTrytoChange,
					//				bintryChnage: this.binValueTrytoChange,
					//					StockLineId: this.sourceStockLineSetup.stockLineId,
					//						SiteId: this.sourceStockLineSetup.AftersiteId,
					//							WarehouseId: this.sourceStockLineSetup.AfterwarehouseId,
					//								LocationId: this.sourceStockLineSetup.afterlocationId,
					//									ShelfId: this.sourceStockLineSetup.aftershelfId,
					//										BinId: this.sourceStockLineSetup.afterbinId,
					//											SerialNumber: this.sourceStockLineSetup.AfterserialNumber,
					//												partNumber: this.sourceStockLineSetup.AfterpartNumber,
					//													Quantity: this.sourceStockLineSetup.Afterquantity,
					//														CoreUnitCost: this.sourceStockLineSetup.AfterUnitCost,
					//															UnitSalesPrice: this.sourceStockLineSetup.AfterunitSalesPrice,
					//																DiscountSalesPrice: this.sourceStockLineSetup.AfterDiscountSalesPrice,
					//																	LotCostAdjustment: this.sourceStockLineSetup.AfterLotCostAdjustment,
					//																		RevalueStockCost: this.sourceStockLineSetup.AfterRevalueStockCost,
					//																			UnitCostAdjustmentReasonTypeId: this.sourceStockLineSetup.unitCostAdjustmentReasonTypeId,
					//																				UnitSalePriceAdjustmentReasonTypeId: this.sourceStockLineSetup.unitSalePriceAdjustmentReasonTypeId

					//for Stocklist Update Storing in Object
					let Data = [{
						sitetryChange: this.siteValueTrytoChnage,
						warehousetryChange: this.warehouseValueTrytoChange,
						locationtryChange: this.locationValueTrytoChange,
						shelftryChange: this.shelfValueTrytoChange,
						bintryChnage: this.binValueTrytoChange,
						StockLineId: this.sourceStockLineSetup.stockLineId,
						SiteId: this.sourceStockLineSetup.AftersiteId,
						WarehouseId: this.sourceStockLineSetup.AfterwarehouseId,
						LocationId: this.sourceStockLineSetup.afterlocationId,
						ShelfId: this.sourceStockLineSetup.aftershelfId,
						BinId: this.sourceStockLineSetup.afterbinId,
						SerialNumber: this.sourceStockLineSetup.AfterserialNumber,
						partNumber: this.sourceStockLineSetup.AfterpartNumber,
						Quantity: this.sourceStockLineSetup.Afterquantity,
						CoreUnitCost: this.sourceStockLineSetup.AfterUnitCost,
						UnitSalesPrice: this.sourceStockLineSetup.AfterunitSalesPrice,
						DiscountSalesPrice: this.sourceStockLineSetup.AfterDiscountSalesPrice,
						LotCostAdjustment: this.sourceStockLineSetup.AfterLotCostAdjustment,
						RevalueStockCost: this.sourceStockLineSetup.AfterRevalueStockCost,
						ManagementStructureEntityId: this.sourceStockLineSetup.managementStructureEntityId,
						UnitCostAdjustmentReasonTypeId: this.sourceStockLineSetup.unitCostAdjustmentReasonTypeId,
						UnitSalePriceAdjustmentReasonTypeId: this.sourceStockLineSetup.unitSalePriceAdjustmentReasonTypeId,
						isSerialized: this.sourceStockLineSetup.isSerialized
						
					}]
					this.stocklineAdjustmentObject.push(Data);



					this.stocklineser.updateStockLineAdjustmentToList(this.stocklineAdjustmentObject[0][0]).subscribe(data => { });

					//StockLine List Edit




					//StockLine Adjustment Save
					for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
						this.stockAdjustmentDataArray[i][0].stockLineId = this.sourceStockLineSetup.stockLineId;
						//calling Service for Stockline Adjustment
						this.stocklineser.newStockLineAdjustment(this.stockAdjustmentDataArray[i][0]).subscribe(data => {

						});

					}

					this.stocklineser.updateStockLineAdjustment(this.sourceStockLineSetup).subscribe(data => { });
					this.savestocklineadsaveclose();
				}

			}

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



			this.sourceItemMaster.itemMasterId = this.sourceStockAdjustment.im.itemMasterId;
			this.sourceItemMaster.partId = this.selectedPartId;
			//this.sourceItemMaster.itemTypeId = parseInt(this.sourceStockLineSetup.afterItemTypeId);
			////Update Item Master
			//this.stocklineser.updateItemMasterPartPost(this.sourceItemMaster).subscribe(data => { });


		// this.modal.close();
			
		}

		
		
	}

	//
	openAdjustment(row) {
		this._route.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-adjustment');
	}

	


	updateStockLineAdjustmentToListMethod()
	{
		let Data = [{
			sitetryChange: this.siteValueTrytoChnage,
			warehousetryChange: this.warehouseValueTrytoChange,
			locationtryChange: this.locationValueTrytoChange,
			shelftryChange: this.shelfValueTrytoChange,
			bintryChnage: this.binValueTrytoChange,
			StockLineId: this.sourceStockLineSetup.stockLineId,
			SiteId: this.sourceStockLineSetup.AftersiteId,
			WarehouseId: this.sourceStockLineSetup.AfterwarehouseId,
			LocationId: this.sourceStockLineSetup.afterlocationId,
			ShelfId: this.sourceStockLineSetup.aftershelfId,
			BinId: this.sourceStockLineSetup.afterbinId,
			SerialNumber: this.sourceStockLineSetup.AfterserialNumber,
			partNumber: this.sourceStockLineSetup.AfterpartNumber,
			Quantity: this.sourceStockLineSetup.Afterquantity,
			CoreUnitCost: this.sourceStockLineSetup.AfterUnitCost,
			UnitSalesPrice: this.sourceStockLineSetup.AfterunitSalesPrice,
			DiscountSalesPrice: this.sourceStockLineSetup.AfterDiscountSalesPrice,
			LotCostAdjustment: this.sourceStockLineSetup.AfterLotCostAdjustment,
			RevalueStockCost: this.sourceStockLineSetup.AfterRevalueStockCost,
			ManagementStructureEntityId: this.sourceStockLineSetup.managementStructureEntityId,
			UnitCostAdjustmentReasonTypeId: this.sourceStockLineSetup.unitCostAdjustmentReasonTypeId,
			UnitSalePriceAdjustmentReasonTypeId: this.sourceStockLineSetup.unitSalePriceAdjustmentReasonTypeId,
			isSerialized:this.sourceStockLineSetup.isSerialized
		}]
		
		this.stocklineAdjustmentObject.push(Data);
		if (this.sourceStockLineSetup.Afterquantity == 0) {
			this.stocklineAdjustmentObject[0][0].isQunatity = true;
		}


		this.stocklineser.updateStockLineAdjustmentToList(this.stocklineAdjustmentObject[0][0]).subscribe(data => { });

		

		}

	// debugger;



	//	if (!this.sourceStockLine.stockLineId) {
	//		this.sourceStockLine.createdBy = this.userName;
	//		this.sourceStockLine.updatedBy = this.userName;
	//		// this.sourceAction.defaultMessageCode = this.messageName;
	//		this.sourceStockLine.masterCompanyId = 1;
	//		//this.sourceStockLine.itemTypeId = 1;
	//		this.stocklineser.newStockLineAdjustment(this.sourceStockLine).subscribe(data => {
	//			this.collectionofstockLine = data;
	//			this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-adjustment')
	//			this.value = 1;

	//		})


	//	}
	//	else {

	//		this.sourceStockLine.updatedBy = this.userName;
	//		//this.sourceItemMaster.defaultMessageCode = this.messageName;
	//		this.sourceStockLine.masterCompanyId = 1;
	//		this.stocklineser.updateStockLineAdjustment(this.sourceStockLine).subscribe(
	//			response => this.saveCompleted(this.sourceStockLine),
	//			error => this.saveFailedHelper(error));
	//	}

	//	// this.modal.close();
	//}


	//private saveSuccessHelper(role?: any) {
	//	this.isSaving = false;
	//	this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

	//	this.loadData();

	//}
	








	// debugger;



	//	if (!this.sourceStockLine.stockLineId) {
	//		this.sourceStockLine.createdBy = this.userName;
	//		this.sourceStockLine.updatedBy = this.userName;
	//		// this.sourceAction.defaultMessageCode = this.messageName;
	//		this.sourceStockLine.masterCompanyId = 1;
	//		//this.sourceStockLine.itemTypeId = 1;
	//		this.stocklineser.newStockLineAdjustment(this.sourceStockLine).subscribe(data => {
	//			this.collectionofstockLine = data;
	//			this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-adjustment')
	//			this.value = 1;

	//		})


	//	}
	//	else {

	//		this.sourceStockLine.updatedBy = this.userName;
	//		//this.sourceItemMaster.defaultMessageCode = this.messageName;
	//		this.sourceStockLine.masterCompanyId = 1;
	//		this.stocklineser.updateStockLineAdjustment(this.sourceStockLine).subscribe(
	//			response => this.saveCompleted(this.sourceStockLine),
	//			error => this.saveFailedHelper(error));
	//	}

	//	// this.modal.close();
	//}


	private saveSuccessHelper(role?: any) {
		this.isSaving = false;
		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);
		
		

	}
	public applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue;
	}

	private refresh() {
		// Causes the filter to refresh there by updating with recently added data.
		this.applyFilter(this.dataSource.filter);
	}
	
	savestocklineadsaveclose()
	{

		// debugger;

		this.isSaving = true;

		if (this.isEditMode == false)
		{
			this.sourceStockLine.createdBy = this.userName;
			this.sourceStockLine.updatedBy = this.userName;

			this.sourceStockLine.masterCompanyId = 1;
			//this.stocklineser.newStockLineTimeAdjustment(this.sourceStockLine).subscribe(data => {
			//	this.valv = data.timeLifeCyclesId;
			//	this.sourceStockLine.timeLifeId = this.valv;
			//	this.stocklineser.updateStockSetupLine(this.sourceStockLine).subscribe(
			//		response => this.saveCompleted(this.sourceStockLine),
			//		error => this.saveFailedHelper(error));
			//	this.sourceStockLine = {};
			//})

		}
		else
		{

			this.sourceStockLine.updatedBy = this.userName;

			this.sourceStockLine.masterCompanyId = 1;
			this.stocklineser.updateStockLineTimeAdjustment(this.sourceStockLine).subscribe(
				response => this.saveCompleted(this.sourceStockLine),
				error => this.saveFailedHelper(error));
		}
		//this.savestockLineadjustmentclose();
		//this.modal.close();
	}

	

	siteValueChange(AdjustmentDataTypeId, Beforesite, Aftersite, AdjustmentMemo) //Site Valu Selection in Form
	{

		this.siteValueTrytoChnage = true;
		this.warehouseValueTrytoChange = false;
		this.locationValueTrytoChange = false;
		this.shelfValueTrytoChange = false;
		this.binValueTrytoChange = false;

		this.allWareHouses = [];
		this.allLocations = [];
		this.allShelfs = [];
		this.allBins = [];
		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforesiteId, afterSite: Aftersite, adjustmentMemo: AdjustmentMemo }]

		//Based on Site Value Change we will Compare in Array and Insert if not Inserted othere wise removes Previous Value and Adds
		if (this.stockAdjustmentDataArray.length <= 0)
		{
			this.stockAdjustmentDataArray.push(data);
		}
		else
		{
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++)
			{
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId)
				{
					this.stockAdjustmentDataArray.splice(i,1);
				}
				
			}

			this.stockAdjustmentDataArray.push(data);
			
		}
		

		this.workFlowtService.getWareHouseDate(this.sourceStockLineSetup.AftersiteId).subscribe( //calling and Subscribing for WareHouse Data
			results => this.onDataLoadWareHouse(results), //sending WareHouse
			error => this.onDataLoadFailed(error)
		);

	}

	siteValueChange1(AdjustmentDataTypeId, Beforesite, Aftersite, AdjustmentMemo) //Site Valu Selection in Form
	{

		this.siteValueTrytoChnage = true;
		this.warehouseValueTrytoChange = false;
		this.locationValueTrytoChange = false;
		this.shelfValueTrytoChange = false;
		this.binValueTrytoChange = false;

		this.allWareHouses = [];
		this.allLocations = [];
		this.allShelfs = [];
		this.allBins = [];
		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforesiteId, afterSite: Aftersite, adjustmentMemo: AdjustmentMemo }]

		//Based on Site Value Change we will Compare in Array and Insert if not Inserted othere wise removes Previous Value and Adds
		if (this.stockAdjustmentDataArray.length <= 0) {
			this.stockAdjustmentDataArray.push(data);
		}
		else {
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);

		}


		this.workFlowtService.getWareHouseDate(this.sourceStockLineSetup.AftersiteId).subscribe( //calling and Subscribing for WareHouse Data
			results => this.onDataLoadWareHouse(results), //sending WareHouse
			error => this.onDataLoadFailed(error)
		);

	} //Site Valu Selection in Form


	wareHouseValueChange(AdjustmentDataTypeId, BeforeWarehouse, AfterWarehouse, AdjustmentMemo)
	{
		this.warehouseValueTrytoChange = true;
		this.locationValueTrytoChange = false;
		this.shelfValueTrytoChange = false;
		this.binValueTrytoChange = false;

		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforewarehouseId, afterSite: AfterWarehouse, adjustmentMemo: AdjustmentMemo }]
		//Based on Site Value Change we will Compare in Array and Insert if not Inserted othere wise removes Previous Value and Adds
		if (this.stockAdjustmentDataArray.length <= 0) {
			this.stockAdjustmentDataArray.push(data);
		}
		else {
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);
			
		}

		this.workFlowtService.getLocationDate(AfterWarehouse).subscribe( //calling and Subscribing for Location Data
			results => this.onDataLoadLocation(results), //sending Location
			error => this.onDataLoadFailed(error)
		);
	}

	wareHouseValueChange1(AdjustmentDataTypeId, BeforeWarehouse, AfterWarehouse, AdjustmentMemo)
	{
		this.warehouseValueTrytoChange = true;
		this.locationValueTrytoChange = false;
		this.shelfValueTrytoChange = false;
		this.binValueTrytoChange = false;

		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforewarehouseId, afterSite: this.sourceStockLineSetup.AfterwarehouseId, adjustmentMemo: AdjustmentMemo }]
		//Based on Site Value Change we will Compare in Array and Insert if not Inserted othere wise removes Previous Value and Adds
		if (this.stockAdjustmentDataArray.length <= 0) {
			this.stockAdjustmentDataArray.push(data);
		}
		else {
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);

		}

		this.workFlowtService.getLocationDate(this.sourceStockLineSetup.AfterwarehouseId).subscribe( //calling and Subscribing for Location Data
			results => this.onDataLoadLocation(results), //sending Location
			error => this.onDataLoadFailed(error)
		);
	}

	locationValueChange(AdjustmentDataTypeId, BeforeLocation, AfterLocation, AdjustmentMemo)
	{
		this.locationValueTrytoChange = true;
		this.shelfValueTrytoChange = false;
		this.binValueTrytoChange = false;

		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforelocationId, afterSite: AfterLocation, adjustmentMemo: AdjustmentMemo }]
		this.sourceStockLineSetup.afterlocationId = AfterLocation;
		//Based on Site Value Change we will Compare in Array and Insert if not Inserted othere wise removes Previous Value and Adds
		if (this.stockAdjustmentDataArray.length <= 0) {
			this.stockAdjustmentDataArray.push(data);
		}
		else {
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);
			
		}

		this.workFlowtService.getShelfDate(AfterLocation).subscribe( //calling and Subscribing for Location Data
			results => this.onDataLoadShelf(results), //sending Location
			error => this.onDataLoadFailed(error)
		);

	}

	locationValueChange1(AdjustmentDataTypeId, BeforeLocation, AfterLocation, AdjustmentMemo)
	{

		this.locationValueTrytoChange = true;
		this.shelfValueTrytoChange = false;
		this.binValueTrytoChange = false;

		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforelocationId, afterSite: this.sourceStockLineSetup.afterlocationId, adjustmentMemo: AdjustmentMemo }]
		//Based on Site Value Change we will Compare in Array and Insert if not Inserted othere wise removes Previous Value and Adds
		if (this.stockAdjustmentDataArray.length <= 0) {
			this.stockAdjustmentDataArray.push(data);
		}
		else {
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);

		}

		this.workFlowtService.getShelfDate(this.sourceStockLineSetup.afterlocationId).subscribe( //calling and Subscribing for Location Data
			results => this.onDataLoadShelf(results), //sending Location
			error => this.onDataLoadFailed(error)
		);

	}

	shelfValueChange(AdjustmentDataTypeId, BeforeShelf, AfterShelf, AdjustmentMemo)
	{
		this.shelfValueTrytoChange = true;
		this.binValueTrytoChange = false;

		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforeshelfId, afterSite: AfterShelf, adjustmentMemo: AdjustmentMemo }]
		//Based on Site Value Change we will Compare in Array and Insert if not Inserted othere wise removes Previous Value and Adds
		if (this.stockAdjustmentDataArray.length <= 0) {
			this.stockAdjustmentDataArray.push(data);
		}
		else {
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);
			
		}

		this.workFlowtService.getBinDataById(AfterShelf).subscribe(
			results => this.onDataLoadBin(results), //sending Location
			error => this.onDataLoadFailed(error));

	}
	shelfValueChange1(AdjustmentDataTypeId, BeforeShelf, AfterShelf, AdjustmentMemo)
	{

		this.shelfValueTrytoChange = true;
		this.binValueTrytoChange = false;

		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforeshelfId, afterSite: this.sourceStockLineSetup.aftershelfId, adjustmentMemo: AdjustmentMemo }]
		//Based on Site Value Change we will Compare in Array and Insert if not Inserted othere wise removes Previous Value and Adds
		if (this.stockAdjustmentDataArray.length <= 0) {
			this.stockAdjustmentDataArray.push(data);
		}
		else {
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);

		}

		this.workFlowtService.getBinDataById(this.sourceStockLineSetup.aftershelfId).subscribe(
			results => this.onDataLoadBin(results), //sending Location
			error => this.onDataLoadFailed(error));

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

	private onDataLoadBin(getBinList: any) {
		this.loadingIndicator = false;
		this.allBins = getBinList; //cha
	}

	binValueSelect(AdjustmentDataTypeId, BeforeBin, AfterBin, AdjustmentMemo)
	{
		this.binValueTrytoChange = true;

		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforebinId, afterSite: AfterBin, adjustmentMemo: AdjustmentMemo }]
		//Based on Site Value Change we will Compare in Array and Insert if not Inserted othere wise removes Previous Value and Adds

		if (this.stockAdjustmentDataArray.length <= 0)
		{
			this.stockAdjustmentDataArray.push(data);
		}
		else
		{
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);
			
		}
		//console.log(this.stockAdjustmentDataArray);
	}
	binValueSelect1(AdjustmentDataTypeId, BeforeBin, AfterBin, AdjustmentMemo)
	{

		this.binValueTrytoChange = true;

		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforebinId, afterSite: this.sourceStockLineSetup.afterbinId, adjustmentMemo: AdjustmentMemo }]
		//Based on Site Value Change we will Compare in Array and Insert if not Inserted othere wise removes Previous Value and Adds

		if (this.stockAdjustmentDataArray.length <= 0) {
			this.stockAdjustmentDataArray.push(data);
		}
		else {
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);

		}
		//console.log(this.stockAdjustmentDataArray);
	}

	categoryChange(AdjustmentDataTypeId, BeforeserialNumber, AfterSerial, AdjustmentMemo)
	{
		this.categoryValueTryChange = false;

		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.itemTypeId, afterSite: AfterSerial, adjustmentMemo: AdjustmentMemo }]
		if (this.stockAdjustmentDataArray.length <= 0) {
			this.stockAdjustmentDataArray.push(data);
		}
		else {
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);
			console.log(this.stockAdjustmentDataArray);
		}

	}
	serialNumberValuechange(AdjustmentDataTypeId, BeforeSerial, AfterSerial, AdjustmentMemo)
	{
		this.serialValueTryChange = false;

		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforeserialNumber, afterSite: AfterSerial, adjustmentMemo: AdjustmentMemo }]
		if (this.stockAdjustmentDataArray.length <= 0)
		{
			this.stockAdjustmentDataArray.push(data);
		}
		else
		{
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++)
			{
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId)
				{
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);
			console.log(this.stockAdjustmentDataArray);
		}

		//console.log(this.stockAdjustmentDataArray);
	}

	QuantityNumberValuechange(AdjustmentDataTypeId, BeforeQuantity, AfterQuantity, AdjustmentMemo)
	{
		if (this.sourceStockLineSetup.Afterquantity >= 0) {
			this.quantityValueTryChange = true;
			this.disableSave = false;
		} else {
			this.quantityValueTryChange = false;
			this.disableSave = true;
		}

		//if Quantity Greater Than 1 then Submit Buton Should be Disabled
		if (this.sourceStockLineSetup.isSerialized && this.sourceStockLineSetup.Afterquantity > 1)
		{
			this.disableSave = false;
		}

		else
		{
			this.disableSave = true;
		}
		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.Beforequantity, afterSite: AfterQuantity, adjustmentMemo: AdjustmentMemo }]
		if (this.stockAdjustmentDataArray.length <= 0) {
			this.stockAdjustmentDataArray.push(data);
		}
		else {
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);
			console.log(this.stockAdjustmentDataArray);
		}

		//console.log(this.stockAdjustmentDataArray);
	}

	UnitCostNumberValuechange(AdjustmentDataTypeId, BeforeUnitCost, AfterUnitCost, AdjustmentMemo)
	{
		this.unitcostValueTryChange = false;

		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforecoreUnitCost, afterSite: AfterUnitCost, adjustmentMemo: AdjustmentMemo }]
		if (this.stockAdjustmentDataArray.length <= 0) {
			this.stockAdjustmentDataArray.push(data);
		}
		else {
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);
			console.log(this.stockAdjustmentDataArray);
		}

		//console.log(this.stockAdjustmentDataArray);
	}

	UnitCostNumberValuechange1(AdjustmentDataTypeId, BeforeUnitCost, AfterUnitCost, AdjustmentMemo)

	{
		if (this.sourceStockLineSetup.UnitCostAdjustmentReason) {
			this.unitCostAdjustmentReasonTypeChange = false;
		}
		else
		{
			this.unitCostAdjustmentReasonTypeChange = true;
		}
		

		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforecoreUnitCost, afterSite: AfterUnitCost, adjustmentMemo: AdjustmentMemo }]
		if (this.stockAdjustmentDataArray.length <= 0) {
			this.stockAdjustmentDataArray.push(data);
		}
		else {
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);
			console.log(this.stockAdjustmentDataArray);
		}

		//console.log(this.stockAdjustmentDataArray);
	}

	UnitSalePriceNumberValuechange(AdjustmentDataTypeId, BeforeUnitSaleprice, AfterUnitSaleprice, AdjustmentMemo)
	{
		this.unitsalepriceTryValueChange = false;

		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforeunitSalesPrice, afterSite: AfterUnitSaleprice, adjustmentMemo: AdjustmentMemo }]
		if (this.stockAdjustmentDataArray.length <= 0) {
			this.stockAdjustmentDataArray.push(data);
		}
		else {
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);
			console.log(this.stockAdjustmentDataArray);
		}

		//console.log(this.stockAdjustmentDataArray);

	}

	UnitSalePriceNumberValuechange1(AdjustmentDataTypeId, BeforeUnitSaleprice, AfterUnitSaleprice, AdjustmentMemo)
	{
		if (this.sourceStockLineSetup.unitSalesPriceAdjustmentReason)
		{
			this.unitCostAdjustmentReasonTypeChange = false;
		}
		else
		{
			this.unitCostAdjustmentReasonTypeChange = true;
		}
		

		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforeunitSalesPrice, afterSite: AfterUnitSaleprice, adjustmentMemo: AdjustmentMemo }]
		if (this.stockAdjustmentDataArray.length <= 0) {
			this.stockAdjustmentDataArray.push(data);
		}
		else {
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);
			console.log(this.stockAdjustmentDataArray);
		}

		//console.log(this.stockAdjustmentDataArray);

	}

	partValueSelect(AdjustmentDataTypeId, Beforepart, Afterpart, AdjustmentMemo)
	{
		let data = [{ adjustmentDataTypeId: AdjustmentDataTypeId, beforeSite: this.sourceStockLineSetup.BeforepartId, afterSite: Afterpart, adjustmentMemo: AdjustmentMemo }]
		//Based on Site Value Change we will Compare in Array and Insert if not Inserted othere wise removes Previous Value and Adds

		if (this.stockAdjustmentDataArray.length <= 0)
		{
			this.stockAdjustmentDataArray.push(data);
		}
		else
		{
			for (let i = 0; i < this.stockAdjustmentDataArray.length; i++) {
				if (this.stockAdjustmentDataArray[i][0].adjustmentDataTypeId == AdjustmentDataTypeId) {
					this.stockAdjustmentDataArray.splice(i, 1);
				}

			}

			this.stockAdjustmentDataArray.push(data);
			console.log(this.stockAdjustmentDataArray);
		}

	}
	private savesuccessCompleted(user?: any) {
		this.isSaving = false;


		this.alertService.showMessage("Success", `Action was Edited successfully`, MessageSeverity.success);



		this.loadData();
	}


	private onDataLoadWareHouse(getWarehousList: any) { //Storing WareHouse Data

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allWareHouses = getWarehousList; //cha
		//this.warehouseId = this.allWareHouses.warehouseId;

	}

	//isTimeLifeEdit(isEdit)
	//{
	//	if (isEdit == true) {
	//		this.AllowEdit = true;
	//	}

	//	else {
	//		this.AllowEdit = false;
	//	}
	//}


}

