import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';//bread crumb
import { ItemMasterService } from "../../../services/itemMaster.service";
import { fadeInOut } from '../../../services/animations';
import { AuthService } from '../../../services/auth.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { MasterCompany } from '../../../models/mastercompany.model';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { CommonService } from '../../../services/common.service';

@Component({
	selector: 'app-item-master-list',
	templateUrl: './item-master-list.component.html',
	styleUrls: ['./item-master-list.component.scss'],
	animations: [fadeInOut]
})
/** item-master-list component*/
export class ItemMasterListComponent implements OnInit, AfterViewInit {
	viewItemMaster: any = {};
	EquipmentDelete: boolean = false;
	isDeleteMode: boolean = false;
	allitemstockinfo: any[] = [];
	Active: string;
	partNumber: any = "";
	partDescription: any = "";
	isAlternatePartChecked: any = "";
	isSerialized: any = "";
	isTimeLife: any = "";
	nha: any = "";
	nationalStockNumber: any = "";
	itemClassificationId: any = "";
	itemGroupId: any = "";
	isAcquiredMethodBuy: any = "";
	expirationDate: any = "";
	isReceivedDateAvailable: any = "";
	isManufacturingDateAvailable: any = "";
	isTagDateAvailable: any = "";
	isOpenDateAvailable: any = "";
	isShippedDateAvailable: any = "";
	isOtherDateAvailable: any = "";
	provisionId: any = "";
	manufacturerId: any = "";
	isHazardousMaterial: any = "";
	selectedAircraftTypes: any = "";
	isEnabeCapes: any = "";
	pma: any = "";
	der: any = "";
	ataMainId: any = "";
	isSchematic: any = "";
	overhaulHours: any = "";
	rpHours: any = "";
	testHours: any = "";
	turnTimeOverhaulHours: any = "";
	turnTimeRepairHours: any = "";
	rfqTracking: any = "";
	glAccountId: any = "";
	purchaseUnitOfMeasureId: any = "";
	stockUnitOfMeasureId: any = "";
	consumeUnitOfMeasureId: any = "";
	soldUnitOfMeasureId: any = "";
	leadTimeDays: any = "";
	leadTimeHours: any = "";
	stockLevel: any = "";
	reorderPoint: any = "";
	reorderQuantiy: any = "";
	minimumOrderQuantity: any = "";
	isExchangeInfoAvailable: any = "";
	createdBy: any = "";
	updatedBy: any = "";
	createddate: any = "";
	updatedDate: any = "";

	EquipmentView: boolean = false;
	partdescription: any = "";
	itemClassificationCode: any = "";
	isActive: any = "";
	currencyId: any = "";
	exportCurrencyId: any = ""
	discountPurchasePercent: any = "";
	unitCost: any = "";
	listPrice: any = "";
	priceDate: any = "";
	descriptionName: any = "";
	manufacturingDays: any;
	salesMarkUpOnListPrice: any = "";
	EquipmentAdd: boolean = false;
	EquipmentUpdate: boolean = false;
	NonstockDelete: boolean = false;
	selectedColumns1: any[];
	cols1: any[];
	cols2: any[];
	selectedstockColumn: any[];
	selectedNonstockColumn: any[];
	selectedEquipmentColumn: any[];
	selectedColumns2: any[];
	getSelectedCollection: any;
	NonstockView: boolean = false;
	NonstockAdd: boolean = false; priorityId: any;
	exportCountryId: any;
	memo: any;
	exportWeight: any;
	exportValue: any;
	exportSizeLength: any;
	exportClassificationId: any;
	description: any;
	exportSizeWidth: any;
	exportSizeHeight: any;
	;
	NonstockUpdate: boolean = false;
	Delete: boolean = false;
	View: boolean = false;
	Add: boolean = false;
	Update: boolean = false;
	allRolesInfo: any[] = [];
	activeIndex: number;
	sourceItemMaster: any;
	allEquipmentInfo: any[];
	// allStockInfo: any[];
	allNonstockInfo: any[];
	loanTable: boolean;
	exchangeTable: any;
	equipmentTable: boolean;
	nonStockTable: boolean;
	public sourceAction: any = {};
	stockTable: boolean;
	radioButtonValue: string = "Stock";
	cols: any[];
	allStockInfo: any[] = [];
	selectedColumns: any[];
	//selectedColumn: any[];
	loadingIndicator: boolean;
	dataSource: any;
	allActions: any[];
	selectedColumn: any;
	modal: NgbModalRef;
	isEditMode: boolean;
	isSaving: boolean;
	itemName: string;
	allUploadedDocumentsList: any = [];
	//selectedColumns: any;
	/** item-master-list ctor */
	constructor(private authService: AuthService, private route: Router, private alertService: AlertService, private router: Router, public itemMasterService: ItemMasterService, private modalService: NgbModal, private masterComapnyService: MasterComapnyService, public commonService: CommonService) {
		this.itemMasterService.currentUrl = '/itemmastersmodule/itemmasterpages/app-item-master-list';
		this.itemMasterService.bredcrumbObj.next(this.itemMasterService.currentUrl);//Bread Crumb
		this.itemMasterService.listCollection = null;
		//this.itemMasterService.stockableObjChangeObject$.subscribe(data => { this.onRadioChange(data) });
		if (itemMasterService.listStock == true) {
			this.onRadioChange(0);
			this.stockTable = true;
			//this.StockList();
		}
		if (itemMasterService.listNonstock == true) {
			this.onRadioChange(1);
			this.nonStockTable = true;
			//this.nonstockList();
		}

	}
	ngOnInit(): void {
		if (this.itemMasterService.listStock == true) { this.loaddata('Stock'); }
		this.itemMasterService.currentUrl = '/itemmastersmodule/itemmasterpages/app-item-master-list';
		this.itemMasterService.bredcrumbObj.next(this.itemMasterService.currentUrl);//Bread Crumb
		//this.nonstockList();
		//this.StockList();
		//this.EuipmentList();
		this.loadRolesData();
	}
	openHist() {
		// alert("Functionality not yet done");

	}

	openEdit(row) {

		const { itemMasterId } = row;
		// this.itemMasterService.isEditMode = true;

		// this.sourceItemMaster = row;

		// this.itemMasterService.listCollection = this.sourceItemMaster;
		this.activeIndex = 0;

		//this.itemMasterService.indexObj.next(this.activeIndex);
		this.router.navigateByUrl(`/itemmastersmodule/itemmasterpages/app-item-master-stock/edit/${itemMasterId}`);
		// this.actionName = this.sourceItemMaster.description;

	}

	toggledbldisplay(content, row) {
		this.isEditMode = true;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceAction = row;
		this.itemName = this.sourceAction.itemClassificationCode;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openEdits(row) {


		this.itemMasterService.isEditMode = true;

		this.itemMasterService.getCapabilityData(row.itemMasterId).subscribe(data => {
			this.getSelectedCollection = data;
			this.itemMasterService.capsCollection = this.getSelectedCollection;
		});

		this.sourceItemMaster = row;

		this.itemMasterService.listNonStockCollection = this.sourceItemMaster;
		this.activeIndex = 1;

		//this.itemMasterService.indexObj.next(this.activeIndex);

		this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-non-stock');

		// this.actionName = this.sourceItemMaster.description;

	}


	openEdited(row) {


		this.itemMasterService.isEditMode = true;

		this.sourceItemMaster = row;



		this.itemMasterService.listEquipmentCollection = this.sourceItemMaster;
		this.activeIndex = 2;

		//this.itemMasterService.indexObj.next(this.activeIndex);
		this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-equipment');
		// this.actionName = this.sourceItemMaster.description;

	}


	ngAfterViewInit() { }

	public onRadioChange(val: any) {
		if (val == 0) {
			this.radioButtonValue = "Stock";
			this.stockTable = true;
			this.nonStockTable = false;
			this.equipmentTable = false;
			this.exchangeTable = false;
			this.loanTable = false;
			this.loaddata(this.radioButtonValue);
		}
		else if (val == 1) {
			this.radioButtonValue = "Non-stock";
			this.stockTable = false;
			this.nonStockTable = true;
			this.equipmentTable = false;
			this.exchangeTable = false;
			this.loanTable = false;
			this.loaddata(this.radioButtonValue);

		}
		else if (val == 2) {
			this.radioButtonValue = "Equipment";
			this.stockTable = false;
			this.nonStockTable = false;
			this.equipmentTable = true;
			this.exchangeTable = false;
			this.loanTable = false;
			//this.loaddata(this.radioButtonValue);
		}
		else if (val == 3) {
			this.radioButtonValue = "Exchange";
			this.stockTable = false;
			this.nonStockTable = false;
			this.equipmentTable = false;
			this.exchangeTable = true;
			this.loanTable = false;
			this.loaddata(this.radioButtonValue);
		}
		else if (val == 4) {
			this.radioButtonValue = "Loan";
			this.stockTable = false;
			this.nonStockTable = false;
			this.equipmentTable = false;
			this.exchangeTable = false;
			this.loanTable = true;
		}
	}

	private loaddata(value) {
		//this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.itemMasterService.getItemStockList(value).subscribe(
			results => this.onitemmasterSuccessful(results[0], value),
			error => this.onDataLoadFailed(error)
		);
	}
	private loadRolesData() {
		//this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.itemMasterService.getRolesData().subscribe(
			results => this.onRolesLoadSuccessfull(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	private onDataLoadSuccessful(allWorkFlows: any[]) {
		//debugger;
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allitemstockinfo = allWorkFlows;


	}
	private onitemmasterSuccessful(allWorkFlows: any[], value) {
		//debugger;
		if (value == "Stock") {
			this.stockTable = true;
			this.cols = [
				{ field: 'partNumber', header: 'PN' },
				{ field: 'partDescription', header: 'PN Description' },
				{ field: 'isHazardousMaterial', header: 'Is Hazardous Material' },
				//{ field: '', header: 'Material Type' },
				{ field: 'provisiondesc', header: 'Provision' },
				//{ field: '', header: 'capes' },
				{ field: 'manufacturerdesc', header: 'Manufacturer' },
				//{ field: '', header: ' Aircraft Manufacturer' },
				{ field: 'nationalStockNumber', header: 'NSN' },
				{ field: 'prioritydesc', header: 'Priority' },
				//{ field: 'updatedDate', header: 'Updated Date' },
				//{ field: 'createdDate', header: 'Created Date' }
			];
			this.selectedColumns = this.cols;
			this.loadingIndicator = false;
			this.allStockInfo = allWorkFlows;
		}
		else if (value == "Non-stock") {
			this.cols1 = [];
			this.selectedColumns1 = [];
			this.cols1 = [
				//{ field: 'actionId', header: 'Action Id' },
				{ field: 'partNumber', header: 'PN' },
				{ field: 'partDescription', header: 'Description' },
				{ field: 'isHazardousMaterial', header: 'Is Hazardous Material' },
				{ field: 'manufacturerdesc', header: 'Manufacturer' },
				{ field: 'unitCost', header: 'Unit Cost' },
				{ field: 'listPrice', header: 'List Price' },

				//{ field: 'updatedDate', header: 'Updated Date' },
				//{ field: 'createdDate', header: 'Created Date' }


			];
			this.selectedColumns1 = this.cols1;
			this.allNonstockInfo = allWorkFlows;
		}
		else if (value == "Equipment") {
			this.cols2 = [];
			this.selectedColumns2 = [];
			this.cols2 = [
				//{ field: 'actionId', header: 'Action Id' },
				{ field: 'partNumber', header: 'Equipment Id' },
				{ field: 'partdescription', header: 'Description' },
				{ field: 'certificationRequired', header: 'Certification' },
				{ field: 'equipmentValidationDescription', header: 'Equipment Validation Type' },

				{ field: 'manufacturerdesc', header: 'Manufacturer' },
				//{ field: 'unitCost', header: 'Unit Cost' },
				//{ field: 'listPrice', header: 'List Price' },


				//{ field: 'updatedDate', header: 'Updated Date' },
				//{ field: 'createdDate', header: 'Created Date' }

			];
			this.selectedColumns2 = this.cols2;
			this.allEquipmentInfo = allWorkFlows;
		}



	}

	private onRolesLoadSuccessfull(allWorkFlows: any[]) {
		//debugger;
		//this.selectedColumns = this.cols;
		this.allRolesInfo = allWorkFlows;
		if (this.allRolesInfo.length > 0) {

			for (let i = 0; i < this.allRolesInfo.length; i++) {

				if (this.allRolesInfo[i].entityName = 'ItemMasterMain') {

					if (this.allRolesInfo[i].permittedEditActionDescription = 'Add') {
						this.Add = true;
						this.NonstockAdd = true;
						this.EquipmentAdd = true;
					}
					if (this.allRolesInfo[i].permittedEditActionDescription = 'View') {
						this.View = true;
						this.NonstockView = true;
						this.EquipmentView = true;
					}
					if (this.allRolesInfo[i].permittedEditActionDescription = 'Delete') {
						this.Delete = true;
						this.NonstockDelete = true;
						this.EquipmentDelete = true;
					}

				}
				if (this.allRolesInfo[i].screenName == 'Stock') {

					if (this.allRolesInfo[i].permittedEditActionDescription = 'Add') {
						this.Add = true;
					}
					if (this.allRolesInfo[i].permittedEditActionDescription = 'View') {
						this.View = true;
					}
					if (this.allRolesInfo[i].permittedEditActionDescription = 'Delete') {
						this.Delete = true;
					}
				}
				else if (this.allRolesInfo[i].screenName == 'Non Stock') {
					if (this.allRolesInfo[i].permittedEditActionDescription = 'Add') {
						this.NonstockAdd = true;
					}
					if (this.allRolesInfo[i].permittedEditActionDescription = 'View') {
						this.NonstockView = true;
					}
					if (this.allRolesInfo[i].permittedEditActionDescription = 'Delete') {
						this.NonstockDelete = true;
					}
				}
				else if (this.allRolesInfo[i].screenName == 'Equipment') {
					if (this.allRolesInfo[i].permittedEditActionDescription = 'Add') {
						this.EquipmentAdd = true;
					}
					if (this.allRolesInfo[i].permittedEditActionDescription = 'View') {
						this.EquipmentView = true;
					}
					if (this.allRolesInfo[i].permittedEditActionDescription = 'Delete') {
						this.EquipmentDelete = true;
					}
				}

			}
		}

	}




	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}
	deleteItemAndCloseModel() {
		this.isSaving = true;
		this.isDeleteMode = true;
		this.sourceItemMaster.isdelete = false;
		//this.sourceVendor = content;
		this.sourceItemMaster.updatedBy = this.userName;
		this.itemMasterService.updaateEquipmentDelete(this.sourceItemMaster.itemMasterId).subscribe(
			data => {

				this.loaddata(this.radioButtonValue);

				console.log(this.radioButtonValue);
			});
		this.saveCompleted(this.sourceItemMaster);
		this.modal.close();
	}


	// deleteItemAndCloseModel(content, row) {
	//	this.isEditMode = false;
	//	this.isDeleteMode = true;
	//	this.sourceItemMaster = row;
	//	this.modal = this.modalService.open(content, { size: 'sm' });
	//	this.modal.result.then(() => {
	//		console.log('When user closes');
	//	}, () => { console.log('Backdrop click') })
	//	//debugger;
	//	this.isEditMode = false;
	//	this.isDeleteMode = true;
	//	this.sourceItemMaster = content;
	//	this.sourceItemMaster.isActive = false;
	//	this.sourceItemMaster.updatedBy = this.userName;

	//	this.itemMasterService.updaateEquipmentDelete(this.sourceItemMaster.itemMasterId).subscribe(
	//		data => {

	//			this.loaddata(this.radioButtonValue);

	//			console.log(this.radioButtonValue);
	//		});
	//	this.saveCompleted(this.sourceItemMaster);
	//}

	//openDelete(content, row) {
	//	this.isEditMode = false;
	//	this.isDeleteMode = true;
	//	this.sourceItemMaster = row;
	//	this.modal = this.modalService.open(content, { size: 'sm' });
	//	this.modal.result.then(() => {
	//		console.log('When user closes');
	//	}, () => { console.log('Backdrop click') })
	//	this.isSaving = true;
	//	this.sourceItemMaster.updatedBy = this.userName;
	//	this.itemMasterService.updaateEquipmentDelete(this.sourceItemMaster.itemMasterId).subscribe(
	//		response => this.saveCompleted(this.sourceItemMaster),
	//		error => this.saveFailedHelper(error));
	//	this.modal.close();
	//}

	openDelete(content, row) {

		this.isEditMode = false;
		this.isDeleteMode = true;
		this.sourceItemMaster = row;
		this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	private nonstockList() {
		//this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.itemMasterService.getItemNonstockList().subscribe(
			results => this.onitemnonstockSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onitemnonstockSuccessful(allWorkFlows: any[]) {
		//debugger;
		this.loadingIndicator = false;
		this.allNonstockInfo = allWorkFlows;

	}

	private StockList() {
		//this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.itemMasterService.getItemeStockList().subscribe(
			results => this.onitemStockSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onitemStockSuccessful(allWorkFlows: any[]) {
		//debugger;
		this.loadingIndicator = false;
		//this.allStockInfo = allWorkFlows;

	}

	private EuipmentList() {
		//this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.itemMasterService.getItemEquipmentList().subscribe(
			results => this.onitemequipmntSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onitemequipmntSuccessful(allWorkFlows: any[]) {
		//debugger;
		this.loadingIndicator = false;
		this.allEquipmentInfo = allWorkFlows;

	}


	private onDataLoadFailed(error: any) {
		// alert(error);
		//this.alertService.stopLoadingMessage();
		// this.loadingIndicator = false;

	}
	private loadMasterCompanies() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.masterComapnyService.getMasterCompanies().subscribe(
			results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}

	private onDataMasterCompaniesLoadSuccessful(allStockInfo: MasterCompany[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.allStockInfo = allStockInfo;

	}

	dismissModel() {
		this.isDeleteMode = false;
		this.isEditMode = false;
		this.modal.close();
	}
	handleChangeforstock(rowData, e) {
		if (e.checked == false) {
			this.sourceAction.itemMasterId = rowData.itemMasterId;
			//this.sourceAction = rowData;
			this.sourceAction.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceAction.isActive = false;
			this.itemMasterService.updateActionforActiveforstock(this.sourceAction).subscribe(
				response => this.saveCompleted(this.sourceAction),
				error => this.saveFailedHelper(error));
			//alert(e);
		}
		else {
			//this.sourceAction = rowData;
			this.sourceAction.itemMasterId = rowData.itemMasterId;
			this.sourceAction.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceAction.isActive = true;
			this.itemMasterService.updateActionforActiveforstock(this.sourceAction).subscribe(
				response => this.saveCompleted(this.sourceAction),
				error => this.saveFailedHelper(error));
			//alert(e);
		}

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

		//this.onitemmasterSuccessful(results[0], value);
	}

	private saveFailedHelper(error: any) {
		this.isSaving = false;
		this.alertService.stopLoadingMessage();
		this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
		this.alertService.showStickyMessage(error, null, MessageSeverity.error);
	}
	openView(content, row) {
		
		this.toGetAllDocumentsList(row.itemMasterId);
		this.getItemMasterById(row.itemMasterId);
        // this.viewItemMaster = row;
		this.partNumber = row.partNumber;
		this.description = row.partDescription;
		if (row.isAlternatePartChecked) {
			this.isAlternatePartChecked = true;
		}
		else {
			this.isAlternatePartChecked = false;
		}
		this.isSerialized = row.isSerialized;
		this.isTimeLife = row.isTimeLife;
		this.nha = row.nha;
		this.stockLevel = row.stockLevel;
		this.nationalStockNumber = row.nationalStockNumber;
		if (row.itemClassification) {
			this.itemClassificationId = row.itemClassification.description;
		}
		else { this.itemClassificationId = "" }
		if (row.manufacturer) {
			this.manufacturerId = row.manufacturer.name;
		}
		else { this.manufacturerId = "" }

		if (row.priority) {
			this.priorityId = row.priority.description;
		}
		else { this.priorityId = "" }

		//this.currencyId = row.currencyId;

		if (row.currency) {
			this.currencyId = row.currency.symbol;
		}
		else { this.currencyId = "" }

		//if (row.countries) {
		//	this.exportCountryId = row.countries.nice_name;
		//}
		//else { this.exportCountryId = "" }

		//if (row.UnitOfMeasure) {
		//	this.purchaseUnitOfMeasureId = row.UnitOfMeasure.shortName;
		//}
		//else { this.purchaseUnitOfMeasureId = "" }

		//if (row.UnitOfMeasure) {
		//	this.stockUnitOfMeasureId = row.UnitOfMeasure.shortName;
		//}
		//else { this.stockUnitOfMeasureId = "" }
		this.exportCountryId = row.exportCountryId;
		this.stockUnitOfMeasureId = row.stockUnitOfMeasureId;
		this.purchaseUnitOfMeasureId = row.purchaseUnitOfMeasureId;
		this.itemGroupId = row.itemGroupId;
		this.isAcquiredMethodBuy = row.isAcquiredMethodBuy;
		this.expirationDate = row.expirationDate;
		this.isReceivedDateAvailable = row.isReceivedDateAvailable;
		this.isManufacturingDateAvailable = row.isManufacturingDateAvailable;
		this.isTagDateAvailable = row.isTagDateAvailable;
		this.isOpenDateAvailable = row.isOpenDateAvailable;
		this.isShippedDateAvailable = row.isShippedDateAvailable;
		this.isOtherDateAvailable = row.isOtherDateAvailable;
		this.provisionId = row.provisionId;
		this.isHazardousMaterial = row.isHazardousMaterial;
		this.selectedAircraftTypes = row.selectedAircraftTypes;
		this.isEnabeCapes = row.isEnabeCapes;
		this.pma = row.pma;
		this.der = row.der;
		this.ataMainId = row.ataMainId;
		this.isSchematic = row.isSchematic;
		this.overhaulHours = row.overhaulHours;
		this.rpHours = row.rpHours;
		this.testHours = row.testHours;
		this.turnTimeOverhaulHours = row.turnTimeOverhaulHours;
		this.turnTimeRepairHours = row.turnTimeRepairHours;
		this.rfqTracking = row.rfqTracking;
		this.manufacturingDays = row.manufacturingDays;
		this.listPrice = row.listPrice;
		this.glAccountId = row.glAccountId;
		this.exportCurrencyId = row.exportCurrencyId;
		this.consumeUnitOfMeasureId = row.consumeUnitOfMeasureId;
		this.soldUnitOfMeasureId = row.soldUnitOfMeasureId;
		this.leadTimeDays = row.leadTimeDays;
		this.leadTimeHours = row.leadTimeHours;
		this.stockLevel = row.stockLevel;
		this.reorderPoint = row.reorderPoint;
		this.reorderQuantiy = row.reorderQuantiy;
		this.minimumOrderQuantity = row.minimumOrderQuantity;
		this.isExchangeInfoAvailable = row.isExchangeInfoAvailable;
		this.exportWeight = row.exportWeight;
		this.exportValue = row.exportValue;
		this.salesMarkUpOnListPrice = row.salesMarkUpOnListPrice;
		this.createdBy = row.createdBy;
		//this.exportClassificationId = row.exportClassificationId;
		if (row.exportClassification) {
			this.exportClassificationId = row.exportClassification.description;
		}
		else {
			this.exportClassificationId = "";
		}
		this.exportSizeLength = row.exportSizeLength;
		this.exportSizeWidth = row.exportSizeWidth;
		this.exportSizeHeight = row.exportSizeHeight;
		this.updatedBy = row.updatedBy;
		this.exportCountryId = row.exportCountryId;
		this.memo = row.memo;
		this.createddate = row.createdDate;
		this.updatedDate = row.updatedDate;

		//Purchase Price List
		//this.listPrice = row.listPrice
		//this.purchaseCurrencyId = row.purchaseCurrencyId
		//this.purchaseDiscountOffListPrice = row.purchaseDiscountOffListPrice
		//this.purchaseLastDiscountPercentDate = row.purchaseLastDiscountPercentDate
		//this.purchaseLastListPriceAfterDiscountDate = row.purchaseLastListPriceAfterDiscountDate
		//this.purchaseListPriceAfterDiscount = row.purchaseListPriceAfterDiscount

		//Sales Price
		//this.salesPrice = row.salesPrice
		//this.salesBaselineSalesPrice = row.salesBaselineSalesPrice
		//this.salesCurrencyId = row.salesCurrencyId
		//this.salesDiscountPercent = row.salesDiscountPercent
		//this.salesIsFixedPrice = row.salesIsFixedPrice
		//this.salesLastBaselineSalesPriceDate = row.salesLastBaselineSalesPriceDate
		//this.salesLastMakUpPercentOnListPriceAfterDiscDate = row.salesLastMakUpPercentOnListPriceAfterDiscDate
		//this.salesLastMarkUpPercentOnListPriceDate = row.salesLastMarkUpPercentOnListPriceDate
		//this.salesLastSalePriceDate = row.salesLastSalePriceDate
		//this.salesLastSalesDiscountPercentDate = row.salesLastSalesDiscountPercentDate
		//this.salesMarkUpOnListPriceAfterDisc = row.salesMarkUpOnListPriceAfterDisc


		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	getItemMasterById(itemMasterId){
		this.itemMasterService.getItemMasterDetailById(itemMasterId).subscribe(res => {
			this.viewItemMaster = res[0];
		})
	}
	openViewforNonstock(content, row) {

		//this.sourceAction = row;
		this.partNumber = row.partNumber;
		this.description = row.partDescription;
		if (row.itemClassification) {
			this.itemClassificationId = row.itemClassification.description;
		}
		else { this.itemClassificationId = "" }
		if (row.manufacturer) {
			this.manufacturerId = row.manufacturer.name;
		}
		else { this.manufacturerId = "" }
		this.isAcquiredMethodBuy = row.isAcquiredMethodBuy;
		this.isActive = row.isActive;
		if (row.currency) {
			this.currencyId = row.currency.symbol;
		}
		else { this.currencyId = "" }
		//this.currencyId = row.currencyId;
		this.stockUnitOfMeasureId = row.stockUnitOfMeasureId;
		this.purchaseUnitOfMeasureId = row.purchaseUnitOfMeasureId;

		//if (row.UnitOfMeasure) {
		//	this.purchaseUnitOfMeasureId = row.UnitOfMeasure.shortName;
		//}
		//else { this.purchaseUnitOfMeasureId = "" }

		//if (row.UnitOfMeasure) {
		//	this.stockUnitOfMeasureId = row.UnitOfMeasure.shortName;
		//}
		//else { this.stockUnitOfMeasureId = "" }

		this.discountPurchasePercent = row.discountPurchasePercent;
		this.isHazardousMaterial = row.isHazardousMaterial;
		this.unitCost = row.unitCost;
		this.listPrice = row.listPrice;
		this.priceDate = row.priceDate;
		this.createdBy = row.createdBy;
		this.updatedBy = row.updatedBy;
		this.createddate = row.createdDate;
		this.updatedDate = row.updatedDate;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}



	openHelpText(content) {
		this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	public navigateTogeneralInfostock() {
		//this.workFlowtService.listCollection = [];
		this.activeIndex = 0;
		this.itemMasterService.indexObj.next(this.activeIndex);
		this.itemMasterService.isEditMode = false;
		this.itemMasterService.enableExternal = false;
		this.route.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-stock')

	}

	public navigateTogeneralInfononstock() {
		//this.workFlowtService.listCollection = [];
		this.activeIndex = 0;
		this.itemMasterService.indexObj.next(this.activeIndex);
		this.itemMasterService.isEditMode = false;
		this.itemMasterService.enableExternal = false;
		this.route.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-non-stock')

	}
	public navigateTogeneralInfoequipment() {
		//this.workFlowtService.listCollection = [];
		this.activeIndex = 0;
		this.itemMasterService.indexObj.next(this.activeIndex);
		this.itemMasterService.isEditMode = false;
		this.itemMasterService.enableExternal = false;
		this.route.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-equipment')

	}

	toGetAllDocumentsList(itemMasterId)
	{       
        var moduleId=22;
        this.commonService.GetDocumentsList(itemMasterId,moduleId).subscribe(res => {
			this.allUploadedDocumentsList = res;
			//console.log(this.allEmployeeTrainingDocumentsList);
		})
	}
	downloadFileUpload(rowData) {	       
		this.commonService.toDownLoadFile(rowData.link);		
    }
}