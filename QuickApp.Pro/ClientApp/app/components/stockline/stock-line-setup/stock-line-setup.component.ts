import { Component,  OnInit } from '@angular/core';
import { ConditionService } from '../../../services/condition.service';
import { Condition } from '../../../models/condition.model';
import { fadeInOut } from '../../../services/animations';
import { IntegrationService } from '../../../services/integration-service';
import { StocklineService } from '../../../services/stockline.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SiteService } from '../../../services/site.service';
import { Site } from '../../../models/site.model';
import { BinService } from '../../../services/bin.service';
import { VendorService } from '../../../services/vendor.service';
import { ItemMasterService } from '../../../services/itemMaster.service';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { CommonService } from '../../../services/common.service';
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators';
import { GlAccountService } from '../../../services/glAccount/glAccount.service';
import { getValueFromArrayOfObjectById, getValueFromObjectByKey, editValueAssignByCondition, getObjectById } from '../../../generic/autocomplete';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-stock-line-setup',
	templateUrl: './stock-line-setup.component.html',
	styleUrls: ['./stock-line-setup.component.scss'],
	animations: [fadeInOut],
	providers: [DatePipe]
})
/** stock-line-setup component*/
export class StockLineSetupComponent implements OnInit {

	isEditMode: boolean = false;
	legalEntityList: any;	
	businessUnitList: any;
    divisionList: any;
	departmentList: any;
	stockLineForm: any = {};
	allCustomersList: any = []; 
	allVendorsList: any = []; 
	allCompanyList: any = []; 
	allPartnumbersList: any = [];
	allEmployeeList: any = [];
	partNumbersCollection: any = [];
	allConditionInfo: Condition[] = [];
	minDateValue: Date = new Date();
	private onDestroy$: Subject<void> = new Subject<void>();
	managementStructure = {
        companyId: 0,
        buId: 0,
        divisionId: 0,
        departmentId: 0,
	}
	allWareHouses: any;
    allLocations: any;
	allShelfs: any;
	allBins: any;
	allSites: Site[];
	customerNames: any[];
	vendorNames: any[];
	companyNames: any[];
	certifyByNames: any[];
	allManufacturerInfo: any = [];
	allTagTypes: any = [];
	allPolistInfo: any = [];
	allRolistInfo: any = [];
	allGlAccountInfo: any = [];
	textAreaInfo: string;
	textAreaLabel: string;
	allIntegrationInfo: any = [];
	integrationInfoList: any = [];
	sourceTimeLife: any = {};
	hideSerialNumber: boolean = true;
	disableMagmtStruct: boolean = true;
	disableCondition: boolean = true;
	disableSiteName: boolean = true;
	stockLineId: number;
	timeLifeCyclesId: number;

	// public sourceBin: any = {};
	// allTagTypes: any;
    // wareHouseId: any;
    // bulist: any[];
    // departmentList: any[];
	// divisionlist: any[];
    // allManagemtninfo: any[] = [];
	// copyOfAllManagemtninfo: any[] = [];
	// maincompanylist: any[] = [];
	// divisionId: any;
	// departmentId: any;
	// businessUnitId: any;
	// companyId: any;
    // locationId: any;
    // warehouseId: any;
    // allintegrationdetails: any[];
    // integrationvalues: any[]=[];
    // allCustomer: any[];
    // allVendorList: any[];
    // allGLAccountClassData: any[];
    // partCollection: any[];
    // itemclaColl: any[];
	// allPartnumbersInfo: any[];
	// getCompanyListList: any[];
    // selectedActionName: any;
    // descriptionbyPart: any;
    // sourcePartAction: any;
	// selectedPartId: any;
	// gridData: TreeNode[];
	// cols1: any[];
    // showManagement: boolean;
    // allCompanys: any[];
	// selectedOwnerFromValue: string = '';    
	// allPolistInfo: any[] = [];
	// allRolistInfo: any[] = [];
	// allEmployeeList: any[] = [];
    // showRestrictQuantity: boolean;
	// showFreeQuantity: boolean = true;
	// stocklinePOObject: any[] = [];
	// stocklineROObject: any[] = [];
	// allIntegrationInfo: any[] = [];
	// selectedModels: any[] = [];
    // collectionofstocklineIntegrationPortalData: any;
    // collectionofstockLineTimeLife: any;
	// showPartNumberError: boolean;
	// disableSaveglAccount: boolean;
	// glAccountcla: any[];
	// glAccountCollection: any[];
	// allglAccountInfo: any[];
	// showCompanyError: boolean;
    // showPartDescriptionError: boolean;
    // showConditionError: boolean;
    // showSiteError: boolean;
    // showReceiveDateError: boolean;
    // showReceiverNumberError: boolean;
    // showGlAccountNumberError: boolean;
    // QuantityOnHandError: boolean;
    // hasSerialized: boolean;
    // showSerialNumberError: boolean;
    // disableSavepartNumber: boolean;
    // alllegalEntityInfo: any[] = [];
    // managementStructureData: any[];
    // quantityAvailable: any;
    // PurchaseOrderId: any;
    // minDateValue: Date;
	// selectedObtainFromValue: string = '';
	// selectedTracableToValue: string = '';
	// showLable: boolean;
	// //sourceStockLine: any = {};
	// sourceStockLineSetup: any = {};
	// sourceItemMaster: any = {};
	// private isSaving: boolean;
	// loadingIndicator: boolean;
	// private isDeleteMode: boolean = false;
	// isDisabled = true;
	// collectionofstockLine: any;
	// value: number;
	// displayError: boolean=false;
	// modal: NgbModalRef;
	// timeLifeEditAllow: any;
	// allConditionInfo: Condition[] = [];
    // availableQty: number;
    // invalidQtyError: boolean;

    // stocklineCreationForm = new FormGroup({
    //     companyId: new FormControl('companyId', Validators.minLength(1)),

	// });
	
	constructor(private stocklineser: StocklineService, private commonService: CommonService, private conditionService: ConditionService, private binService: BinService, private siteService: SiteService, private vendorService: VendorService, private manufacturerService: ManufacturerService, private integrationService: IntegrationService, private itemMasterService: ItemMasterService, private glAccountService: GlAccountService, private router: Router, private _actRoute: ActivatedRoute, private datePipe: DatePipe) {
		this.stockLineForm.siteId = 0;
		this.stockLineForm.warehouseId = 0;
		this.stockLineForm.locationId = 0;
		this.stockLineForm.shelfId = 0;
		this.stockLineForm.binId = 0;
		this.stockLineForm.obtainFromType = 0;
		this.stockLineForm.ownerType = 0;
		this.stockLineForm.traceableToType = 0;
		this.stockLineForm.manufacturerId = 0;
		this.stockLineForm.tagType = 0;
		this.stockLineForm.purchaseOrderId = 0;
		this.stockLineForm.repairOrderId = 0;
		this.stockLineForm.conditionId = 0;
		this.stockLineForm.oem = true;
		// this.stockLineForm.certifiedDate = this.minDateValue;
		// this.stockLineForm.tagDate = this.minDateValue;
		// this.stockLineForm.certifiedDueDate = this.minDateValue;
		this.stockLineForm.stockLineNumber = 'Generating';
		this.stockLineForm.controlNumber = 'Generating';
		this.stockLineForm.idNumber = 'Generating';
	}

	ngOnInit() {
        this.stocklineser.currentUrl = '/stocklinemodule/stocklinepages/app-stock-line-setup';
		this.stocklineser.bredcrumbObj.next(this.stocklineser.currentUrl);
		this.loadCustomerData();
		this.loadVendorData();
		this.loadCompanyData();
		this.loadPartNumData();
		this.getLegalEntity();
		this.loadConditionData();
		this.loadSiteData();
		this.loadEmployeeData();
		this.loadTagTypes();
		this.loadIntegrationPortal();
		this.loadGlAccountData();
		this.loadManufacturerData();

		this.stockLineId = this._actRoute.snapshot.params['id'];
		if(this.stockLineId) {
			this.isEditMode = true;
			this.getStockLineDetailsById(this.stockLineId);
		}

        // this.loadManagementdata();
        // this.loadData();
        // this.loadEmployeeData();
        // this.loadSiteData();
        // this.Integration();
        // this.loadManufacturerData();
        // this.glAccountlistdata();
        // this.customerList();
        // this.vendorList();
        // this.loadGlAccountData();
        // this.ptnumberlistdata();
        // this.minDateValue = new Date();
        // this.sourceStockLineSetup.oem = true;
	}

	loadCustomerData() {
		this.commonService.smartDropDownList('Customer', 'CustomerId', 'Name').subscribe(response => {
			this.allCustomersList = response;
		});
	}

	loadVendorData() {
		// this.vendorService.getWorkFlows().subscribe(res => {
		// 	this.allVendorsList = res[0];
		// });
		this.commonService.smartDropDownList('Vendor', 'VendorId', 'VendorName').subscribe(response => {
			this.allVendorsList = response;
		});
	}

	loadCompanyData() {
		this.commonService.smartDropDownList('LegalEntity', 'LegalEntityId', 'Name').subscribe(res => {
			this.allCompanyList = res;
		})
	}

	private loadPartNumData() {
		this.commonService.smartDropDownList('ItemMaster', 'ItemMasterId', 'partnumber').subscribe(response => {
			this.allPartnumbersList = response;
		});
	}

	private loadConditionData() {
		this.conditionService.getConditionList().subscribe( res => {
			this.allConditionInfo = res[0];
		});
	}

	private loadSiteData() {
		this.siteService.getSiteList().subscribe(res => {
			this.allSites = res[0];
		});
	}

	loadManufacturerData() {
		this.manufacturerService.getWorkFlows().subscribe(res => {
			this.allManufacturerInfo = res[0]; 
		});
	}

	loadEmployeeData() {
		this.commonService.smartDropDownList('Employee', 'employeeId', 'firstName').subscribe(res => {
			this.allEmployeeList = res;
		})
	}

	private loadTagTypes() {
		this.stocklineser.getAllTagTypes().subscribe(res => {
			this.allTagTypes = res;
		});
	}

	loadPOData(itemMasterId) {
        this.vendorService.getPurchaseOrderByItemId(itemMasterId).subscribe(res => {
			this.allPolistInfo = res[0];
		});
	}

	loadROData(itemMasterId) {
        this.vendorService.getRepairOrderByItemId(itemMasterId).subscribe(res => {
			this.allRolistInfo = res[0];
		});
	}

	private loadIntegrationPortal() {
		this.integrationService.getWorkFlows().subscribe(res => {
			this.allIntegrationInfo = res[0];
		});
	}

	private loadGlAccountData() {
		this.glAccountService.getAll().subscribe(res => {
			this.allGlAccountInfo = res[0];
		});
	}

	getStockLineDetailsById(stockLineId) {
		this.stocklineser.getStockLineDetailsById(stockLineId).subscribe(res => {
			console.log(res);
			this.stockLineForm = {
				...res,
				itemMasterId: getObjectById('value', res.itemMasterId, this.allPartnumbersList),
				certifiedDate: res.certifiedDate ? new Date(res.certifiedDate) : '',
				certifiedDueDate: res.certifiedDueDate ? new Date(res.certifiedDueDate) : '',
				manufacturingDate: res.manufacturingDate ? new Date(res.manufacturingDate) : '',
				orderDate: res.orderDate ? new Date(res.orderDate) : '',
				receivedDate: res.receivedDate ? new Date(res.receivedDate) : '',
				shelfLifeExpirationDate: res.shelfLifeExpirationDate ? new Date(res.shelfLifeExpirationDate) : '',
				certifiedBy: getObjectById('value', res.certifiedBy, this.allEmployeeList),
				receiverNumber: res.receiver,
			};
			this.onPartNumberSelected(res.itemMasterId)
			this.getManagementStructureOnEdit(res.managementStructureId);
			this.getSiteDetailsOnEdit(res);
			this.getIntergrationWithOnEdit(res.stockLineId);
			this.getObtainOwnerTraceOnEdit(res);
			this.onSelectConditionType(res.conditionId);
			
			if(res.timeLifeCyclesId != null  && res.timeLifeCyclesId != 0) {
                this.timeLifeCyclesId = res.timeLifeCyclesId;
                this.getTimeLifeOnEdit(res.timeLifeCyclesId);
            }  
		});
	}

	getManagementStructureOnEdit(managementStructureId) {
        this.commonService.getManagementStructureDetails(managementStructureId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.selectedLegalEntity(res.Level1);
            this.selectedBusinessUnit(res.Level2);
            this.selectedDivision(res.Level3);
            this.selectedDepartment(res.Level4);
            this.managementStructure = {
                companyId: res.Level1 !== undefined ? res.Level1 : 0,
                buId: res.Level2 !== undefined ? res.Level2 : 0,
                divisionId: res.Level3 !== undefined ? res.Level3 : 0,
                departmentId: res.Level4 !== undefined ? res.Level4 : 0,
			}
			this.onSelectManagementStruc();
        })
    }

    getSiteDetailsOnEdit(res) {
		this.onSelectSiteName(res.siteId);
        this.getWareHouseList(res.siteId);
        this.getLocationList(res.warehouseId);
        this.getShelfList(res.locationId);
        this.getBinList(res.binId);
        this.stockLineForm.warehouseId = res.warehouseId;
        this.stockLineForm.locationId = res.locationId;
        this.stockLineForm.shelfId = res.shelfId;
		this.stockLineForm.binId = res.binId;
	}
	
	getIntergrationWithOnEdit(stockLineId) {
		this.stocklineser.getStockLineIntegrationList(stockLineId).subscribe(res => {
			console.log(res);	
			//this.allIntegrationInfo = res;		
		});
	}

    getObtainOwnerTraceOnEdit(res) {
        //obtain from
        if(res.obtainFromType == 1) {
            this.stockLineForm.obtainFrom = getObjectById('value', res.obtainFrom, this.allCustomersList);
        }
        else if(res.obtainFromType == 2) {
            this.stockLineForm.obtainFrom = getObjectById('value', res.obtainFrom, this.allVendorsList);
        }
        else if(res.obtainFromType == 3) {
            this.stockLineForm.obtainFrom = getObjectById('value', res.obtainFrom, this.allCompanyList);
        }
        else if(res.obtainFromType == 4) {
            this.stockLineForm.obtainFrom = res.obtainFrom;
        }

        //owner
        if(res.ownerType == 1) {
            this.stockLineForm.owner = getObjectById('value', res.owner, this.allCustomersList);
        }
        else if(res.ownerType == 2) {
            this.stockLineForm.owner = getObjectById('value', res.owner, this.allVendorsList);
        }
        else if(res.ownerType == 3) {
            this.stockLineForm.owner = getObjectById('value', res.owner, this.allCompanyList);
        }
        else if(res.ownerType == 4) {
            this.stockLineForm.owner = res.owner;
        }

        //traceable to
        if(res.traceableToType == 1) {
            this.stockLineForm.traceableTo = getObjectById('value', res.traceableTo, this.allCustomersList);
        }
        else if(res.traceableToType == 2) {
            this.stockLineForm.traceableTo = getObjectById('value', res.traceableTo, this.allVendorsList);
        }
        else if(res.traceableToType == 3) {
            this.stockLineForm.traceableTo = getObjectById('value', res.traceableTo, this.allCompanyList);
        }
        else if(res.traceableToType == 4) {
            this.stockLineForm.traceableTo = res.traceableTo;
        }
	}
	
	getTimeLifeOnEdit(timeLifeId) {
        this.stocklineser.getStockLineTimeLifeList(timeLifeId).subscribe(res => {
            console.log(res);
            this.sourceTimeLife = res[0];
        });
    }

	filterPartNumbers(event) {
		this.partNumbersCollection = this.allPartnumbersList;
		if (event.query !== undefined && event.query !== null) {
			const partNumberFilter = [...this.allPartnumbersList.filter(x => {
				return x.label.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.partNumbersCollection = partNumberFilter;
		}
	}

	filterCustomerNames(event) {
		this.customerNames = this.allCustomersList;

		if (event.query !== undefined && event.query !== null) {
			const customers = [...this.allCustomersList.filter(x => {
				return x.label.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.customerNames = customers;
		}
	}

	filterVendorNames(event) {
		this.vendorNames = this.allVendorsList;

		if (event.query !== undefined && event.query !== null) {
			const vendors = [...this.allVendorsList.filter(x => {
				return x.label.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.vendorNames = vendors;
		}
	}

	filterCompanyNames(event) {
		this.companyNames = this.allCompanyList;

		if (event.query !== undefined && event.query !== null) {
			const companies = [...this.allCompanyList.filter(x => {
				return x.label.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.companyNames = companies;
		}
	}

	filterEmployees(event) {
		this.certifyByNames = this.allEmployeeList;

		if (event.query !== undefined && event.query !== null) {
			const empFirstName = [...this.allEmployeeList.filter(x => {
				return x.label;
			})]
			this.certifyByNames = empFirstName;
		}
	}

	onPartNumberSelected(itemMasterId) {
		this.loadPOData(itemMasterId);
		this.loadROData(itemMasterId);
		this.itemMasterService.getItemMasterById(itemMasterId).subscribe(res => {
			console.log(res[0][0]);
			const partDetails = res[0][0];
			this.stockLineForm.partDescription = partDetails.partDescription;
			this.stockLineForm.shelfLife = partDetails.shelfLife;
			this.stockLineForm.isSerialized = partDetails.isSerialized;
			this.stockLineForm.ITARNumber = partDetails.itarNumber;
			this.stockLineForm.nationalStockNumber = partDetails.nationalStockNumber;
			this.stockLineForm.ExportECCN = partDetails.exportECCN;
			// this.stockLineForm.NHA = partDetails.t.nha;
			// this.stockLineForm.tagDate = partDetails.t.TagDate;
			// this.stockLineForm.openDate = partDetails.t.openDate;
			this.stockLineForm.tagDays = partDetails.tagDays;
			this.stockLineForm.manufacturingDays = partDetails.manufacturingDays;
			this.stockLineForm.daysReceived = partDetails.daysReceived;
			this.stockLineForm.openDays = partDetails.openDays;
			this.stockLineForm.IsManufacturingDateAvailable = partDetails.IsManufacturingDateAvailable;
			if (this.stockLineForm.isSerialized == true) {
				this.hideSerialNumber = false;
				// this.showRestrictQuantity = true;
				// this.showFreeQuantity = false;
			}
			else {
				this.hideSerialNumber = true;
				// this.showRestrictQuantity = false;
				// this.showFreeQuantity = true;
			}
			this.stockLineForm.isPMA = partDetails.isPma;
			this.stockLineForm.isDER = partDetails.der;			
			this.sourceTimeLife.timeLife = partDetails.isTimeLife;
			this.stockLineForm.glAccountName = partDetails.glAccountId ? getValueFromArrayOfObjectById('accountName', 'glAccountId', partDetails.glAccountId, this.allGlAccountInfo) : '';
		});
	}
	
	getLegalEntity() {
        this.commonService.getLegalEntityList().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.legalEntityList = res;
        })
	}
	
	selectedLegalEntity(legalEntityId) {
		this.businessUnitList = [];
		this.divisionList = [];
		this.departmentList = [];
		this.managementStructure.buId = 0;
		this.managementStructure.divisionId = 0;
		this.managementStructure.departmentId = 0;

        if (legalEntityId != 0 && legalEntityId != null && legalEntityId != undefined) {
            this.stockLineForm.managementStructureId = legalEntityId;
            this.commonService.getBusinessUnitListByLegalEntityId(legalEntityId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
                this.businessUnitList = res;
			});
		}	
		this.onSelectManagementStruc();
	}

	onSelectManagementStruc() {
		if (this.managementStructure.companyId != 0) {            
			this.disableMagmtStruct = false;
		} else {
			this.disableMagmtStruct = true;
		}
	}	

    selectedBusinessUnit(businessUnitId) {
		this.divisionList = [];
		this.departmentList = [];
		this.managementStructure.divisionId = 0;
		this.managementStructure.departmentId = 0;

        if (businessUnitId != 0 && businessUnitId != null && businessUnitId != undefined) {
            this.stockLineForm.managementStructureId = businessUnitId;
            this.commonService.getDivisionListByBU(businessUnitId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
                this.divisionList = res;
            })
        }
    }
    selectedDivision(divisionUnitId) {
		this.departmentList = [];
		this.managementStructure.departmentId = 0;

        if (divisionUnitId != 0 && divisionUnitId != null && divisionUnitId != undefined) {
            this.stockLineForm.managementStructureId = divisionUnitId;
            this.commonService.getDepartmentListByDivisionId(divisionUnitId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
                this.departmentList = res;
            })
        }
    }
    selectedDepartment(departmentId) {
        if (departmentId != 0 && departmentId != null && departmentId != undefined) {
            this.stockLineForm.managementStructureId = departmentId;
        }
	}
	
	calculateQtyAvailable() {
        
        if (this.stockLineForm.quantityOnHand) { 
			this.stockLineForm.quantityAvailable = this.stockLineForm.quantityOnHand 
		}
        if (this.stockLineForm.quantityOnHand && this.stockLineForm.quantityReserved) {
            this.stockLineForm.quantityAvailable = this.stockLineForm.quantityOnHand - this.stockLineForm.quantityReserved
        }
        if (this.stockLineForm.quantityOnHand && this.stockLineForm.quantityReserved && this.stockLineForm.quantityIssued) {
            this.stockLineForm.quantityAvailable = this.stockLineForm.quantityOnHand - this.stockLineForm.quantityReserved - this.stockLineForm.quantityIssued;
        }
        //this.stockLineForm.quantityAvailable = this.availableQty;
	}
	
	getWareHouseList(siteId) {
		this.allWareHouses = [];
		this.allLocations = [];
		this.allShelfs = [];
		this.allBins = [];
		this.stockLineForm.warehouseId = 0;
		this.stockLineForm.locationId = 0;
		this.stockLineForm.shelfId = 0;
		this.stockLineForm.binId = 0;
		
		if(siteId != 0) {
			this.binService.getWareHouseDate(siteId).subscribe( res => {
				this.allWareHouses = res;
			});
		}
		this.onSelectSiteName(siteId);
	}

	onSelectSiteName(siteId) {
		if(siteId != 0) {
			this.disableSiteName = false;
		} else {
			this.disableSiteName = true;
		}
	}

	getLocationList(warehouseId) {
		this.allLocations = [];
		this.allShelfs = [];
		this.allBins = [];
		this.stockLineForm.locationId = 0;
		this.stockLineForm.shelfId = 0;
		this.stockLineForm.binId = 0;

		if(warehouseId != 0) {
			this.binService.getLocationDate(warehouseId).subscribe(res => {
				this.allLocations = res;
			});
		}		
	}

	getShelfList(locationId) {
		this.allShelfs = [];
		this.allBins = [];		
		this.stockLineForm.shelfId = 0;
		this.stockLineForm.binId = 0;
		
		if(locationId != 0) {
			this.binService.getShelfDate(locationId).subscribe(res => {
				this.allShelfs = res;
			});
		}
	}

	getBinList(shelfId) {
		this.allBins = [];
		this.stockLineForm.binId = 0;

		if(shelfId != 0) {
			this.binService.getBinDataById(shelfId).subscribe(res => {
				this.allBins = res;
			});	
		}		
	}

	onSelectObrainFrom() {
		this.stockLineForm.obtainFrom = undefined;
	}

	onSelectOwner() {
		this.stockLineForm.owner = undefined;
	}

	onSelectTraceableTo() {
		this.stockLineForm.traceableTo = undefined;
	}

	onChangePONum(purchaseOrderId) {
        this.stocklineser.getPurchaseOrderUnitCost(purchaseOrderId).subscribe(res => {
			this.stockLineForm.purchaseOrderUnitCost = res[0].unitCost;
		});
	}
	
	onChangeRONum(repairOrderId) {
        this.stocklineser.getRepairOrderUnitCost(repairOrderId).subscribe(res => {
			this.stockLineForm.repairOrderUnitCost = res[0].unitCost;
		});
    }

	onAddTextAreaInfo(value) {
		if(value == 'blackListedReason') {
			this.textAreaLabel = 'BlackListed Reason';
			this.textAreaInfo = this.stockLineForm.blackListedReason;
		}
		else if(value == 'incidentReason') {
			this.textAreaLabel = 'Incident Reason';
			this.textAreaInfo = this.stockLineForm.incidentReason;
		}
		else if(value == 'accidentReason') {
			this.textAreaLabel = 'Accident Reason';
			this.textAreaInfo = this.stockLineForm.accidentReason;
		}
		else if(value == 'memo') {
			this.textAreaLabel = 'Memo';
			this.textAreaInfo = this.stockLineForm.memo;
		}
	}

	onSaveTextAreaInfo() {
		if(this.textAreaLabel == 'BlackListed Reason') {
			this.stockLineForm.blackListedReason = this.textAreaInfo;
		}
		else if(this.textAreaLabel == 'Incident Reason') {
			this.stockLineForm.incidentReason = this.textAreaInfo;
		}
		else if(this.textAreaLabel == 'Accident Reason') {
			this.stockLineForm.accidentReason = this.textAreaInfo;
		}	
		else if(this.textAreaLabel == 'Memo') {
			this.stockLineForm.memo = this.textAreaInfo;
		}
	}

	onSelectConditionType(value) {
		if (value != 0) {
			this.disableCondition = false;
		} else {
			this.disableCondition = true;
		}
	}

	onSaveStockLine() {
		console.log(this.stockLineForm);
		console.log(this.sourceTimeLife);
		this.stockLineForm = {
			...this.stockLineForm,
			certifiedDate: this.datePipe.transform(this.stockLineForm.certifiedDate, "MM/dd/yyyy"),
			tagDate: this.datePipe.transform(this.stockLineForm.tagDate, "MM/dd/yyyy"),
			certifiedDueDate: this.datePipe.transform(this.stockLineForm.certifiedDueDate, "MM/dd/yyyy"),
			shelfLifeExpirationDate: this.datePipe.transform(this.stockLineForm.shelfLifeExpirationDate, "MM/dd/yyyy"),
			receivedDate: this.datePipe.transform(this.stockLineForm.receivedDate, "MM/dd/yyyy"),
			manufacturingDate: this.datePipe.transform(this.stockLineForm.manufacturingDate, "MM/dd/yyyy"),
			itemMasterId: getValueFromObjectByKey('value', this.stockLineForm.itemMasterId),
			partNumber: getValueFromObjectByKey('label', this.stockLineForm.itemMasterId),
			obtainFrom: this.stockLineForm.obtainFrom ? editValueAssignByCondition('value', this.stockLineForm.obtainFrom) : '',
			owner: this.stockLineForm.owner ? editValueAssignByCondition('value', this.stockLineForm.owner) : '',
			traceableTo: this.stockLineForm.traceableTo ? editValueAssignByCondition('value', this.stockLineForm.traceableTo) : '',
			certifiedBy: this.stockLineForm.certifiedBy ? getValueFromObjectByKey('value', this.stockLineForm.certifiedBy) : '',
			timeLifes: {...this.sourceTimeLife, timeLifeCyclesId: this.timeLifeCyclesId, updatedDate: new Date()}  
		}
		console.log(this.stockLineForm);

		this.stocklineser.newStockLine(this.stockLineForm).subscribe(res => {
			console.log(res);
			this.allIntegrationInfo.map(x => {
				if(x.listedCheckbox == true || x.integratedCheckbox == true) {
					const integrationInfo = {
						...x,
						stockLineId: res.stockLineId
					}
					this.integrationInfoList.push(integrationInfo);
				}				
			});
			this.saveStocklineIntegrationPortalData(this.integrationInfoList);
			// if (this.sourceTimeLife.timeLife) {
			// 	this.stocklineser.newStockLineTimeLife(this.sourceTimeLife).subscribe(res => {
			// 		console.log(res);
			// 	});
			// }
			this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list');
		})

		// if(!this.isEditMode) {
		// 	this.stocklineser.newStockLine(this.stockLineForm).subscribe(data => {
		// 		console.log(data);
		// 		this.allIntegrationInfo.map(x => {
		// 			if(x.listedCheckbox == true || x.integratedCheckbox == true) {
		// 				const integrationInfo = {
		// 					...x,
		// 					stockLineId: data.stockLineId
		// 				}
		// 				this.integrationInfoList.push(integrationInfo);
		// 			}				
		// 		});
		// 		//this.collectionofstockLine = data;
		// 		this.saveStocklineIntegrationPortalData(this.integrationInfoList); //for Saving Integration Data
		// 		if (this.sourceTimeLife.timeLife) {
		// 			this.stocklineser.newStockLineTimeLife(this.sourceTimeLife).subscribe(res => {
		// 				console.log(res);				
		// 			});
		// 		}
		// 		//this.saveItemMasterDetails(this.sourceStockLineSetup);
		// 		this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list');
		// 	})
		// }
		// else {
		// 	this.stocklineser.updateStockSetupLine(this.stockLineForm).subscribe(data => {
		// 		console.log(data);
		// 		this.allIntegrationInfo.map(x => {
		// 			if(x.listedCheckbox == true || x.integratedCheckbox == true) {
		// 				const integrationInfo = {
		// 					...x,
		// 					stockLineId: data.stockLineId
		// 				}
		// 				this.integrationInfoList.push(integrationInfo);
		// 			}				
		// 		});
		// 		this.saveStocklineIntegrationPortalData(this.integrationInfoList); //for Saving Integration Data
		// 		// if (this.sourceTimeLife.timeLifeCyclesId) {
		// 		// 	this.stocklineser.updateStockLineTimelife(this.sourceTimeLife).subscribe(res => {
		// 		// 		console.log(res);				
		// 		// 	});
		// 		// }
		// 		this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list');
		// 	})
		// }
				
	}

	saveStocklineIntegrationPortalData(data) {
		this.stocklineser.saveStocklineIntegrationPortalData(data).subscribe(stocklineIntegrationPortalData => {
			console.log(stocklineIntegrationPortalData);
			//this.collectionofstocklineIntegrationPortalData = stocklineIntegrationPortalData;
		})
	}

	//public getSelectedItem(selectedRow, event) {
		//console.log(selectedRow);
		
		// //;
		// let ischange = false;
		// selectedRow.isListed = true;
		// if (this.selectedModels.length > 0) {
		// 	//praveen's code//
		// 	this.selectedModels.map((row) => {
		// 		if (selectedRow.integrationPortalId == row.integrationPortalId) {
		// 			ischange = true;
		// 		}
		// 	});
		// }
		// if (!ischange) {
		// 	this.selectedModels.push(selectedRow);
		// }
		// console.log(this.selectedModels);
    //}


    // constructor(private fb: FormBuilder, public integrationService: IntegrationService,private empService: EmployeeService,public vendorservice: VendorService,public manufacturerService: ManufacturerService,public itemser: ItemMasterService,public glAccountService: GLAccountClassService,public vendorService: VendorService,public customerService: CustomerService,public inteService: IntegrationService,public workFlowtService1: LegalEntityService,public workFlowtService: BinService,public siteService: SiteService,public integration: IntegrationService, public stocklineser: StocklineService, private http: HttpClient, public ataservice: AtaMainService, private changeDetectorRef: ChangeDetectorRef, private router: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public conditionService: ConditionService, private dialog: MatDialog)
	// {
    //     this.dataSource = new MatTableDataSource();

    //     this.stocklineCreationForm = fb.group({
    //         'companyId': [0, Validators.compose([Validators.required, Validators.minLength(1)])],
    //         'BusinessUnitId': [0],
    //         'divisionId': [0],
    //         'departmentId': [0],
    //     });

	// }

	// private ptnumberlistdata() {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;

	// 	this.itemser.getPrtnumberslistList().subscribe(
	// 		results => this.onptnmbersSuccessful(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }

	// private onptnmbersSuccessful(allWorkFlows: any[]) {

	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.dataSource.data = allWorkFlows;
	// 	this.allPartnumbersInfo = allWorkFlows;
	// 	//console.log(this.allActions);
	// }

	// private glAccountlistdata() {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;
	// 	let value = "Stock";
	// 	this.itemser.getItemStockList(value).subscribe(
	// 		results => this.onglAccountSuccessful(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }

	// private onglAccountSuccessful(allWorkFlows: any[]) {

	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.dataSource.data = allWorkFlows;
	// 	this.allglAccountInfo = allWorkFlows;
	// 	//console.log(this.allActions);
	// }

	// loadPoData()
	// {
	// 	this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.vendorservice.getPurchaseOrderByItemId(this.sourceItemMaster.partId).subscribe(
	// 		results => this.onPoListDataLoadSuccessful(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }

	// onPoListDataLoadSuccessful(getCreditTermsList: any[])
	// {
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.dataSource.data = getCreditTermsList;

	// 	this.allPolistInfo = getCreditTermsList;
	// }

	// onRoListDataLoadSuccessful(getCreditTermsList: any[]) {
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.dataSource.data = getCreditTermsList;

	// 	this.allRolistInfo = getCreditTermsList;
	// }

	// loadRoData()
	// {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.vendorservice.getRepairOrderByItemId(this.sourceItemMaster.partId).subscribe(
	// 		results => this.onRoListDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
	// }
	// onDataLoadRepairOrderDataSuccessful(getCreditTermsList: any[])
	// {
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.dataSource.data = getCreditTermsList;
	// 	this.allRolistInfo = getCreditTermsList;

	// }

	// private Integration() {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;

	// 	this.inteService.getWorkFlows().subscribe(
	// 		results => this.onIntegrationData(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }

	// loadManufacturerData()
	// {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;
	// 	this.manufacturerService.getWorkFlows().subscribe(
	// 		results => this.onmanufacturerSuccessful(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }

	// private onmanufacturerSuccessful(allWorkFlows: any[]) {

	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	//this.dataSource.data = allWorkFlows;
	// 	this.allManufacturerInfo = allWorkFlows; 
	// }

	// private onIntegrationData(getEmployeeCerficationList: any[]) {
	// 	// alert('success');
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.dataSource.data = getEmployeeCerficationList;
	// 	this.allintegrationdetails = getEmployeeCerficationList;
	// 	if (this.allintegrationdetails.length > 0) {
	// 		for (let i = 0; i < this.allintegrationdetails.length; i++)
	// 			this.integrationvalues.push(
	// 				{ value: this.allintegrationdetails[i].integrationPortalId, label: this.allintegrationdetails[i].description },


	// 			);
	// 	}

	// }

	// private loadIntegrationPortal() {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;

	// 	this.integrationService.getWorkFlows().subscribe(
	// 		results => this.onDataLoadIntegrationSuccessful(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }

	// private onDataLoadIntegrationSuccessful(allWorkFlows: Integration[]) {

	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.dataSource.data = allWorkFlows;
	// 	this.allIntegrationInfo = allWorkFlows;
	// }

	// public saveSelectedModel(selectedRow, indeex) {

	// 	selectedRow.isBoolean = indeex;
	// 	if (!selectedRow.isListed)
	// 	{
	// 		selectedRow.isListed = false;
	// 	}
	// 	let ischange = false;
	// 	if (this.selectedModels.length > 0) {
	// 		this.selectedModels.map((row) => {
	// 			if (selectedRow.integrationPortalId == row.integrationPortalId)
	// 			{
	// 				ischange = true;
	// 			}
	// 		});
	// 	}
	// 	if (!ischange)
	// 	{
	// 		this.selectedModels.push(selectedRow);
	// 	}
	// }
	// public getSelectedItem(selectedRow, event) {
	// 	//;
	// 	let ischange = false;
	// 	selectedRow.isListed = true;
	// 	if (this.selectedModels.length > 0) {
	// 		//praveen's code//
	// 		this.selectedModels.map((row) => {
	// 			if (selectedRow.integrationPortalId == row.integrationPortalId) {
	// 				ischange = true;
	// 			}
	// 		});
	// 	}
	// 	if (!ischange) {
	// 		this.selectedModels.push(selectedRow);
	// 	}
	// 	console.log(this.selectedModels);
    // }


    // filterpartItems(event) {
    //     this.partCollection = [];
    //     this.itemclaColl = [];
    //     if (this.allPartnumbersInfo) {
    //         if (this.allPartnumbersInfo.length > 0) {
                
    //             for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
    //                 let partName = this.allPartnumbersInfo[i].partNumber;
    //                 console.log(partName);
    //                 if (partName) {
    //                     if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                         this.itemclaColl.push([{
    //                             "partId": this.allPartnumbersInfo[i].itemMasterId,
    //                             "partName": partName
    //                         }]),
                                
    //                             this.partCollection.push(partName);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    // calculateQtyAvailable(event) {
        
    //     if (this.sourceStockLineSetup.QuantityOnHand) { this.availableQty = this.sourceStockLineSetup.QuantityOnHand };
    //     if (this.sourceStockLineSetup.QuantityOnHand && this.sourceStockLineSetup.QuantityReserved) {
    //         this.availableQty = this.sourceStockLineSetup.QuantityOnHand - this.sourceStockLineSetup.QuantityReserved
    //     }
    //     if (this.sourceStockLineSetup.QuantityOnHand && this.sourceStockLineSetup.QuantityReserved && this.sourceStockLineSetup.QuantityIssued) {
    //         this.availableQty = this.sourceStockLineSetup.QuantityOnHand - this.sourceStockLineSetup.QuantityReserved - this.sourceStockLineSetup.QuantityIssued;
    //     }
    //     this.sourceStockLineSetup.quantityAvailable = this.availableQty;
    // }

	// partnmId(event) {
	// 	if (this.itemclaColl) {
	// 		for (let i = 0; i < this.itemclaColl.length; i++) {
	// 			if (event == this.itemclaColl[i][0].partName) {
	// 				this.sourceItemMaster.partId = this.itemclaColl[i][0].partId;
	// 				this.selectedPartId = this.itemclaColl[i][0].partId; //Storing PartId in Local
    //                 this.selectedActionName = event;
    //                 this.disableSavepartNumber = false;
	// 			}
	// 		}
    //         this.itemser.getDescriptionbypart(event).subscribe(
	// 			results => this.onpartnumberloadsuccessfull(results[0]),
	// 			error => this.onDataLoadFailed(error)
	// 		);
	// 	}
	// }

	// private onpartnumberloadsuccessfull(allWorkFlows: any[])
    // {
    //     this.loadPoData();
    //     this.loadRoData();
	// 	this.descriptionbyPart = allWorkFlows[0]
	// 	this.sourcePartAction = this.descriptionbyPart;
    //     this.sourceStockLineSetup.partDescription = allWorkFlows[0].partDescription; //Passing Part Description based on Change Part
    //     this.sourceStockLineSetup.shelfLife = allWorkFlows[0].t.shelfLife;
    //     this.sourceStockLineSetup.isSerialized = allWorkFlows[0].isSerialized;
	// 	this.sourceStockLineSetup.ITARNumber = allWorkFlows[0].t.itarNumber;
	// 	this.sourceStockLineSetup.nationalStockNumber = allWorkFlows[0].t.nationalStockNumber;
	// 	this.sourceStockLineSetup.ExportECCN = allWorkFlows[0].t.exportECCN;
	// 	this.sourceStockLineSetup.NHA = allWorkFlows[0].t.nha;
    //     this.sourceStockLineSetup.tagDate = allWorkFlows[0].t.TagDate;
    //     this.sourceStockLineSetup.openDate = allWorkFlows[0].t.openDate;
    //     this.sourceStockLineSetup.tagDays = allWorkFlows[0].t.tagDays;
    //     this.sourceStockLineSetup.manufacturingDays = allWorkFlows[0].t.manufacturingDays
	// 	this.sourceStockLineSetup.daysReceived = allWorkFlows[0].t.daysReceived
	// 	this.sourceStockLineSetup.openDays = allWorkFlows[0].t.openDays
    //     this.sourceStockLineSetup.IsManufacturingDateAvailable = allWorkFlows[0].t.IsManufacturingDateAvailable;

	// 	if (this.sourceStockLineSetup.isSerialized == true) {
	// 		this.hideSerialNumber = true;
	// 		this.showRestrictQuantity = true;
	// 		this.showFreeQuantity = false;
	// 		this.hasSerialized = true; //for Knowing is Serialized or not for Serial Number 

	// 	}
	// 	else
	// 	{
	// 		this.hideSerialNumber = false;
	// 		this.showRestrictQuantity = false;
	// 		this.showFreeQuantity = true;
	// 		this.hasSerialized = false; //for Knowing is Serialized or not for Serial Number 
	// 	}

    //     this.sourceStockLineSetup.isPMA = allWorkFlows[0].IsPMA;
    //     this.sourceStockLineSetup.isDER = allWorkFlows[0].IsDER;
    //     this.sourceStockLineSetup.oem = allWorkFlows[0].OEM;
    //     this.sourceStockLineSetup.oem = true;
    //     this.sourceStockLineSetup.certifiedDate = this.minDateValue;
    //     this.sourceStockLineSetup.tagDate = this.minDateValue;
    //     this.sourceStockLineSetup.certifiedDueDate = this.minDateValue;

	// 	this.sourceTimeLife.timeLife = allWorkFlows[0].isTimeLife;

	// 	if (this.sourceTimeLife.timeLife == true) {
	// 		this.sourceTimeLife.timeLife = true;
	// 	}

	// 	else
	// 	{
	// 		this.sourceTimeLife.timeLife = false;
	// 	}

	// 	this.sourceStockLineSetup.itemMasterId = allWorkFlows[0].itemMasterId;
    //     this.sourceStockLineSetup.glAccountId = allWorkFlows[0].glAccountId;
    //     this.sourceStockLineSetup.glAccountName = allWorkFlows[0].accountName;
    //     //this.sourceStockLineSetup.NHA = allWorkFlows[0].NHA;
       
	// }

	// private customerList()
	// {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;

	// 	this.customerService.getWorkFlows().subscribe(
	// 		results => this.onCustomerDataLoadSuccessful(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }

	// private onCustomerDataLoadSuccessful(allCustomerFlows: any[])
	// {
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.dataSource.data = allCustomerFlows;
	// 	this.allCustomer = allCustomerFlows;
		
	// }

	// private vendorList()
	// {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;
	// 	this.vendorService.getVendorList().subscribe(
	// 		results => this.onVendorDataLoadSuccessful(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }
	// private onVendorDataLoadSuccessful(allVendorWorkFlows: any[])
	// {
	// 	//debugger;
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.dataSource.data = allVendorWorkFlows;
	// 	this.allVendorList = allVendorWorkFlows;
	// }

	// loadEmployeeData()
	// {
	// 	this.empService.getEmployeeList().subscribe(
	// 		results => this.onDataLoadEmployeeSuccessful(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }
	// onDataLoadEmployeeSuccessful(allWorkFlows: any[])
	// {
    //     this.dataSource.data = allWorkFlows;
    //     this.allEmployeeList = allWorkFlows;
    //     this.loadCompanyData();
	// }

	// private loadTagTypes() {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;
	// 	this.stocklineser.getAllTagTypes().subscribe(
	// 		results => this.onLoadloadTagTypesSuccessful(results),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }

	// private onLoadloadTagTypesSuccessful(allWorkFlows: any) {
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.allTagTypes = allWorkFlows;
	// }

	// private loadGlAccountData() {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;
	// 	this.glAccountService.getGlAccountClassList().subscribe(
	// 		results => this.onDataLoadGlAccountSuccessful(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }

	// private onDataLoadGlAccountSuccessful(allWorkFlows: any[]) {

	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	//this.dataSource.data = allWorkFlows;
	// 	this.allGLAccountClassData = allWorkFlows;
	// }

	// private loadSiteData()  //retriving SIte Information
	// {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;

	// 	this.siteService.getSiteList().subscribe(   //Getting Site List Hear
	// 		results => this.onSaiteDataLoadSuccessful(results[0]), //Pasing first Array and calling Method
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }
	

	// private onDataLoadWareHouse(getWarehousList: any) { //Storing WareHouse Data

	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.allWareHouses = getWarehousList; //cha
	// 	//this.warehouseId = this.allWareHouses.warehouseId;
	// }

	// //GL Account

	// glAccountHandler(event) {
	// 	if (event.target.value != "") {
	// 		let value = event.target.value.toLowerCase();
	// 		if (this.selectedActionName) {
	// 			if (value == this.selectedActionName.toLowerCase()) {
	// 				this.disableSaveglAccount = true;
	// 			}
	// 			else {
	// 				this.disableSaveglAccount = false;
	// 			}
	// 		}

	// 	}
	// }

	// glAccountId(event) {
	// 	//
	// 	if (this.glAccountcla) {
	// 		for (let i = 0; i < this.glAccountcla.length; i++) {
	// 			if (event == this.glAccountcla[i][0].glAccountId) {
	// 				this.sourceStockLineSetup.itemMasterId = this.itemclaColl[i][0].ItemMasterId;
	// 			}
	// 		}
	// 	}
	// }

	// filterglAccount(event) {

	// 	this.glAccountCollection = [];
	// 	this.glAccountcla = [];
	// 	if (this.allglAccountInfo) {
	// 		for (let i = 0; i < this.allglAccountInfo.length; i++) {
	// 			let glAccountId = this.allglAccountInfo[i].glAccountId;

	// 			if (glAccountId) {
	// 				this.glAccountCollection.push(glAccountId);
	// 			}
	// 		}
	// 	}
	// }

	
	// private onDataLoadLocation(getLocationList: any) { //Storing WareHouse Data

	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.allLocations = getLocationList; //cha
	// 	//this.locationId = this.allWareHouses.locationId;
	// }

	// private onDataLoadShelf(getShelfList: any) {
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.allShelfs = getShelfList; //cha
	// }

	// private onDataLoadBin(getBinList: any)
	// {
	// 	this.loadingIndicator = false;
	// 	this.allBins = getBinList; //cha
	// }
	// private onSaiteDataLoadSuccessful(getSiteList: Site[])
	// { //Storing Site Data
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.dataSource.data = getSiteList; //need
	// 	this.allSites = getSiteList; //Contain first array of Loaded table Data will put in Html as [value]
	// }

	// siteValueChange(data) //Site Valu Selection in Form
	// {
	// 	this.allWareHouses = [];
	// 	this.allLocations = [];
	// 	this.allShelfs = [];
	// 	this.allBins = [];

	// 	this.sourceStockLineSetup.warehouseId = 0
	// 	this.sourceStockLineSetup.locationId = 0;
	// 	this.sourceStockLineSetup.shelfId = 0;
	// 	this.sourceStockLineSetup.binId = 0;
		
	// 	this.workFlowtService.getWareHouseDate(this.sourceStockLineSetup.siteId).subscribe( //calling and Subscribing for WareHouse Data
	// 			results => this.onDataLoadWareHouse(results), //sending WareHouse
	// 			error => this.onDataLoadFailed(error)
	// 		);
		
	// }

	// wareHouseValueChange(warehouseId)
	// {

	// 	this.allLocations = [];
	// 	this.allShelfs = [];
	// 	this.allBins = [];

	// 	this.sourceStockLineSetup.locationId = 0;
	// 	this.sourceStockLineSetup.shelfId = 0;
	// 	this.sourceStockLineSetup.binId = 0;



	// 	this.workFlowtService.getLocationDate(warehouseId).subscribe( //calling and Subscribing for Location Data
	// 		results => this.onDataLoadLocation(results), //sending Location
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }

	// eventHandler(event) {
	// 	if (event.target.value != "") {
	// 		let value = event.target.value.toLowerCase();
	// 		if (this.selectedActionName) {
    //             if (value == this.selectedActionName.toLowerCase()) {
    //                 this.disableSavepartNumber = false;

	// 			}
    //             else {
    //                 this.disableSavepartNumber = true
					
	// 			}
	// 		}

	// 	}
    // }

	// locationValueChange(locationId)
	// {
	// 	this.allShelfs = [];
	// 	this.allBins = [];
		
	// 	this.sourceStockLineSetup.shelfId = 0;
	// 	this.sourceStockLineSetup.binId = 0;
		
	// 	this.workFlowtService.getShelfDate(locationId).subscribe( //calling and Subscribing for Location Data
	// 		results => this.onDataLoadShelf(results), //sending Location
	// 		error => this.onDataLoadFailed(error)
	// 	);

	// }

	// shelfValueChange(binId)
	// {
	// 	this.allBins = [];
		
	// 	this.sourceStockLineSetup.binId = 0;
	// 	this.workFlowtService.getBinDataById(binId).subscribe(
	// 		results => this.onDataLoadBin(results), //sending Location
	// 		error => this.onDataLoadFailed(error));	
		
	// }

	// binValueSelect(data) { }

	// //Company,Business Unit, Department, Devivision Unit 

	// private loadManagementdata()
	// {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;

	// 	this.workFlowtService1.getManagemententity().subscribe(
	// 		results => this.onManagemtntdataLoad(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }

	// makeNestedObj(arr, parent) {
	// 	var out = []
	// 	for (var i in arr) {
	// 		if (arr[i].parentId == parent) {
	// 			var children = this.makeNestedObj(arr, arr[i].managementStructureId)
	// 			arr[i] = { "data": arr[i] };
	// 			if (children.length) {
	// 				arr[i].children = children
	// 			}
	// 			out.push(arr[i])
	// 		}
	// 	}
	// 	return out
	// }

    // private onManagemtntdataLoad(getAtaMainList: any[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = getAtaMainList;
    //     this.allManagemtninfo = getAtaMainList;
    //     for (let i = 0; i < this.allManagemtninfo.length; i++) {
    //         if (this.allManagemtninfo[i].parentId == null) {
    //             this.maincompanylist.push(this.allManagemtninfo[i]);
    //         }
    //     }
    //     if (this.sourceStockLineSetup.managmentLegalEntity != null && this.sourceStockLineSetup.divmanagmentLegalEntity != null && this.sourceStockLineSetup.biumanagmentLegalEntity != null && this.sourceStockLineSetup.compmanagmentLegalEntity != null) {
    //         this.stocklineCreationForm.controls['companyId'].setValue(this.sourceStockLineSetup.compmanagmentLegalEntity.managementStructureId);
    //         this.stocklineCreationForm.controls['BusinessUnitId'].setValue(this.sourceStockLineSetup.biumanagmentLegalEntity.managementStructureId);
    //         this.stocklineCreationForm.controls['divisionId'].setValue(this.sourceStockLineSetup.divmanagmentLegalEntity.managementStructureId);
    //         this.stocklineCreationForm.controls['departmentId'].setValue(this.sourceStockLineSetup.managementStructeInfo.managementStructureId);
    //     }
    //     else if (this.sourceStockLineSetup.biumanagmentLegalEntity != null && this.sourceStockLineSetup.divmanagmentLegalEntity != null && this.sourceStockLineSetup.managmentLegalEntity != null) {
    //         this.stocklineCreationForm.controls['companyId'].setValue(this.sourceStockLineSetup.biumanagmentLegalEntity.managementStructureId);
    //         this.stocklineCreationForm.controls['BusinessUnitId'].setValue(this.sourceStockLineSetup.divmanagmentLegalEntity.managementStructureId);
    //         this.stocklineCreationForm.controls['divisionId'].setValue(this.sourceStockLineSetup.managmentLegalEntity.managementStructureId);
    //     }
    //     else if (this.sourceStockLineSetup.divmanagmentLegalEntity != null && this.sourceStockLineSetup.managmentLegalEntity != null) {
    //         this.stocklineCreationForm.controls['companyId'].setValue(this.sourceStockLineSetup.divmanagmentLegalEntity.managementStructureId);
    //         this.stocklineCreationForm.controls['BusinessUnitId'].setValue(this.sourceStockLineSetup.managmentLegalEntity.managementStructureId);
    //     }
    //     else if (this.sourceStockLineSetup.managementStructeInfo != null) {
    //         this.stocklineCreationForm.controls['companyId'].setValue(this.sourceStockLineSetup.managmentLegalEntity.managementStructureId);
    //     }
    //     else {
    //         console.log("no Info Presnts")
    //     }
    //     this.setManagementStrucureData(this.sourceStockLineSetup);
    // }

    // setManagementStrucureData(obj) {
    //     this.managementStructureData = [];
    //     this.checkMSParents(obj.managementStructureId);
    //     if (this.managementStructureData.length == 4) {
    //         this.sourceStockLineSetup.companyId = this.managementStructureData[3];
    //         this.sourceStockLineSetup.buisinessUnitId = this.managementStructureData[2];
    //         this.sourceStockLineSetup.departmentId = this.managementStructureData[1];
    //         this.sourceStockLineSetup.divisionId = this.managementStructureData[0];
    //         this.getBUList2(this.sourceStockLineSetup.companyId);
    //         this.getDepartmentlist2(this.sourceStockLineSetup.buisinessUnitId);
    //         this.getDivisionlist(this.sourceStockLineSetup.departmentId);
    //     }
    //     if (this.managementStructureData.length == 3) {
    //         this.sourceStockLineSetup.companyId = this.managementStructureData[2];
    //         this.sourceStockLineSetup.buisinessUnitId = this.managementStructureData[1];
    //         this.sourceStockLineSetup.departmentId = this.managementStructureData[0];
    //         this.getBUList2(this.sourceStockLineSetup.companyId);
    //         this.getDepartmentlist2(this.sourceStockLineSetup.buisinessUnitId);
    //     }
    //     if (this.managementStructureData.length == 2) {
    //         this.sourceStockLineSetup.companyId = this.managementStructureData[1];
    //         this.sourceStockLineSetup.buisinessUnitId = this.managementStructureData[0];
    //         this.getBUList2(this.sourceStockLineSetup.companyId);
    //     }
    //     if (this.managementStructureData.length == 1) {
    //         this.sourceStockLineSetup.companyId = this.managementStructureData[0];
    //     }
    // }
    // getDepartmentlist2(value) {
    //         this.sourceStockLineSetup.departmentId = "";
    //         this.sourceStockLineSetup.divisionId = "";
    //         this.sourceStockLineSetup.managementStructureId = value;
    //         this.departmentList = [];
    //         this.divisionlist = [];
    //         for (let i = 0; i < this.allManagemtninfo.length; i++) {
    //             if (this.allManagemtninfo[i].parentId == value) {
    //                 this.departmentList.push(this.allManagemtninfo[i]);
    //             }
    //         }
    // }

    // getBUList2(id) {
    //     var companyId = id;
    //         this.sourceStockLineSetup.buisinessUnitId = "";
    //         this.sourceStockLineSetup.departmentId = "";
    //         this.sourceStockLineSetup.divisionId = "";
    //         this.sourceStockLineSetup.managementStructureId = companyId;
    //         this.departmentList = [];
    //         this.divisionlist = [];
    //         this.bulist = [];
    //         for (let i = 0; i < this.allManagemtninfo.length; i++) {
    //             if (this.allManagemtninfo[i].parentId == companyId) {
    //                 this.bulist.push(this.allManagemtninfo[i])
    //             }
    //         }
    // }

    // checkMSParents(msId) {
    //     this.managementStructureData.push(msId);
    //     for (let a = 0; a < this.allManagemtninfo.length; a++) {
    //         if (this.allManagemtninfo[a].managementStructureId == msId) {
    //             if (this.allManagemtninfo[a].parentId) {
    //                 this.checkMSParents(this.allManagemtninfo[a].parentId);
    //                 break;
    //             }
    //         }
    //     }
    // }

    // getBUList(event) {

    //     var companyId = this.stocklineCreationForm.controls['companyId'].value;

    //     this.sourceStockLineSetup.buisinessUnitId = "";
    //     this.sourceStockLineSetup.departmentId = "";
    //     this.sourceStockLineSetup.divisionId = "";
    //     this.sourceStockLineSetup.managementStructureId = companyId;
    //     this.departmentList = [];
    //     this.divisionlist = [];
    //     this.bulist = [];
    //     for (let i = 0; i < this.allManagemtninfo.length; i++) {
    //         if (this.allManagemtninfo[i].parentId == companyId) {
    //             this.bulist.push(this.allManagemtninfo[i])
    //         }
    //     }
    // }

	// getDepartmentlist(businessUnitId) {
	// 	var businessUnitId = this.stocklineCreationForm.controls['BusinessUnitId'].value;
	// 	console.log(businessUnitId);
	// 	this.sourceStockLineSetup.departmentId = "";
	// 	this.sourceStockLineSetup.divisionId = "";
	// 	this.sourceStockLineSetup.managementStructureId = businessUnitId;
	// 	this.departmentList = [];
	// 	this.divisionlist = [];
	// 	for (let i = 0; i < this.allManagemtninfo.length; i++) {
	// 		if (this.allManagemtninfo[i].parentId == businessUnitId) {
	// 			this.departmentList.push(this.allManagemtninfo[i]);
	// 		}
	// 	}
	// }

    // getDivisionlist(value) {
    //     var departmentId = this.stocklineCreationForm.controls['divisionId'].value;;
    //     this.sourceStockLineSetup.divisionId = "";
    //     this.sourceStockLineSetup.managementStructureId = departmentId;
    //         this.divisionlist = [];
    //         for (let i = 0; i < this.allManagemtninfo.length; i++) {
    //             if (this.allManagemtninfo[i].parentId == departmentId) {
    //                 this.divisionlist.push(this.allManagemtninfo[i]);
    //             }
    //         }
    // }

    // divisionChange(divisionId) {
    //     this.sourceStockLineSetup.managementStructureId = divisionId;
    // }

    // POValueChange(purchaseOrderId)
    // {
    //     this.stocklineser.getPurchaseOrderUnitCost(purchaseOrderId).subscribe(   //Getting Site List Hear
    //         results => this.onPOUnitCostLoadSuccessful(results), //Pasing first Array and calling Method
    //         error => this.onDataLoadFailed(error)
    //     );
    // }

    // onPOUnitCostLoadSuccessful(getPOCost: any) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;

    //     this.sourceStockLineSetup.purchaseOrderUnitCost = getPOCost[0].unitCost;

        
    // }

    // onROUnitCostLoadSuccessful(getROCost: any) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;

    //     this.sourceStockLineSetup.repairOrderUnitCost = getROCost[0].unitCost;
    // }

	// ROValueChange(RoId)
    // {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.stocklineser.getRepairOrderUnitCost(RoId).subscribe(
    //         results => this.onROUnitCostLoadSuccessful(results),
    //         error => this.onDataLoadFailed(error)
    //     );
	// }

	// private onDataLoadFailed(error: any)
	// {
	// 	// alert(error);
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;

	// }
	// get userName(): string {
	// 	return this.authService.currentUser ? this.authService.currentUser.userName : "";
	// }
	
	// private saveCompleted(user?: any) {
	// 	this.isSaving = false;
	// 	//this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
	// 	if (this.isDeleteMode == true) {
	// 		this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
	// 		this.isDeleteMode = false;
	// 	}
	// 	else {
	// 		this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

	// 	}
	// }

	// private saveFailedHelper(error: any) {
	// 	this.isSaving = false;
	// 	this.alertService.stopLoadingMessage();
	// 	this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
	// 	this.alertService.showStickyMessage(error, null, MessageSeverity.error);
	// }

	// savestockLineclose()
	// {
	// 	if ((!this.sourceStockLineSetup.partNumber)) {
	// 		this.showPartNumberError = true;
	// 		this.displayError = true;
	// 	}
	// 	else
	// 	{
	// 		this.showPartNumberError = false;
	// 	}

	// 	if (this.stocklineCreationForm.get('companyId').value) {
	// 		this.showCompanyError = false;
	// 	}
	// 	else {
	// 	this.showCompanyError = true;
	// 		this.displayError = true;
	// 	}

	// 	if (this.sourceStockLineSetup.partDescription) {
	// 		this.showPartDescriptionError = false;
	// 	}
	// 	else {
	// 	this.showPartDescriptionError = true;
	// 		this.displayError = true;
	// 	}

    //     if (this.sourceStockLineSetup.conditionId) {
	// 		this.showConditionError = false;
	// 	}
	// 	else {
	// 		this.showConditionError = true;
	// 		this.displayError = true;
	// 	}

	// 	if (this.sourceStockLineSetup.siteId) {
	// 		this.showSiteError = false;
	// 	}
	// 	else {
	// 		this.showSiteError = true;
	// 		this.displayError = true;
	// 	}

	// 	if (this.sourceStockLineSetup.receivedDate) {
	// 		this.showReceiveDateError = false;
	// 	}
	// 	else {
	// 	this.showReceiveDateError = true;
	// 		this.displayError = true;
	// 	}

	// 	if (this.sourceStockLineSetup.receiverNumber) {
	// 		this.showReceiverNumberError = false;
	// 	}
	// 	else {
	// 	this.showReceiverNumberError = true;
	// 		this.displayError = true;
	// 	}

    //     if (this.sourceStockLineSetup.QuantityOnHand) {
    //         this.QuantityOnHandError = false;
    //     }
	// 	else {
	// 	this.QuantityOnHandError = true;
	// 		this.displayError = true;
	// 	}

	// 	if ((this.hasSerialized == true) && (this.sourceStockLineSetup.serialNumber)) {
	// 		this.showSerialNumberError = false;
	// 	}
	// 	else if ((this.hasSerialized == false) && (!this.sourceStockLineSetup.serialNumber)) {
	// 		this.showSerialNumberError = false;
	// 	}
	// 	else
	// 	{
	// 		this.showSerialNumberError = true;
	// 		this.displayError = true;
	// 	}

	// 	if (this.availableQty > 0) {
	// 		this.invalidQtyError = false;
	// 	}
	// 	else {
	// 		this.invalidQtyError = true;
	// 		this.displayError = true;
	// 	}

    //     this.isSaving = true;

	// 	if (!this.displayError)
	// 	{
    //         if (!this.sourceStockLineSetup.stockLineId) {
    //             this.sourceStockLineSetup.createdBy = this.userName;
    //             this.sourceStockLineSetup.updatedBy = this.userName;
    //             this.sourceStockLineSetup.masterCompanyId = 1;
    //             this.sourceStockLineSetup.itemTypeId = 1;

    //             if (this.stocklineCreationForm.get('departmentId').value != null && this.stocklineCreationForm.get('departmentId').value > 0) {
    //                 this.sourceStockLineSetup.managementStructureId = this.stocklineCreationForm.get('departmentId').value;
    //             }
    //             else if (this.stocklineCreationForm.get('divisionId').value != null && this.sourceStockLineSetup.departmentId == '' && this.sourceStockLineSetup.departmentId > 0) {
    //                 this.sourceStockLineSetup.managementStructureId = this.stocklineCreationForm.get('divisionId').value;
    //             }
    //             else if (this.stocklineCreationForm.get('BusinessUnitId').value != null && this.sourceStockLineSetup.departmentId == '' && this.sourceStockLineSetup.divisionId == '' && this.sourceStockLineSetup.divisionId > 0) {
    //                 this.sourceStockLineSetup.managementStructureId = this.stocklineCreationForm.get('BusinessUnitId').value;
    //             }
    //             else {
    //                 this.sourceStockLineSetup.managementStructureId = this.stocklineCreationForm.get('companyId').value;
    //             }
    //             this.sourceStockLineSetup.legalEntityId = this.stocklineCreationForm.get('companyId').value;
	// 			//for Saving timeLife,Stockline,Integration
	// 			if ((this.sourceTimeLife != null) || (this.sourceTimeLife != "null"))
	// 				{
	// 				if (this.sourceTimeLife.timeLife) {
	// 					this.stocklineser.newStockLineTimeLife(this.sourceTimeLife).subscribe(data => {
	// 						this.collectionofstockLineTimeLife = data;
    //                         this.sourceStockLineSetup.timeLifeCyclesId = data.timeLifeCyclesId;
	// 						this.value = 1;
	// 						this.stocklineser.newStockLine(this.sourceStockLineSetup).subscribe(data => {
	// 							this.collectionofstockLine = data;
	// 							this.saveStocklineIntegrationPortalData(data.stockLineId, this.selectedModels); //for Saving Integration Data
	// 							//this.saveItemMasterDetails(this.sourceStockLineSetup);
	// 							this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
	// 							this.value = 1;
	// 						})
	// 					})
	// 				}

	// 				else //for Saving Stockline and Integration
	// 				{
	// 						this.stocklineser.newStockLine(this.sourceStockLineSetup).subscribe(data => {
	// 							this.collectionofstockLine = data;
	// 							this.saveStocklineIntegrationPortalData(data.stockLineId, this.selectedModels); //for Saving Integration Data
	// 							//this.saveItemMasterDetails(this.sourceStockLineSetup);
	// 							this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list')
	// 							this.value = 1;

	// 						})
	// 					}
	// 			}
	// 		}
	// 	}

	// }
	// private loadData()
	// {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;

	// 	this.conditionService.getConditionList().subscribe(
	// 		results => this.onDataLoadSuccessful(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }

    // loadLegalEntityData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.stocklineser.getManagemtentLengalEntityData().subscribe(
    //         results => this.onManagemtntlegaldataLoad(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
    // }

    // private onManagemtntlegaldataLoad(getAtaMainList: any[]) {
    //     // alert('success');
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.alllegalEntityInfo = getAtaMainList;
    //     for (let i = 0; i < this.alllegalEntityInfo.length; i++) {
    //         if (this.alllegalEntityInfo[i].parentId == null) {
    //             this.maincompanylist.push(this.alllegalEntityInfo[i]);
    //         }
    //     }
    // }

	// private loadCompanyData() {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;

	// 	this.stocklineser.getStockCompanyList().subscribe(
	// 		results => this.onDataLoadCompanySuccessful(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }

	// private onDataLoadCompanySuccessful(getCompanyListList: any[])
	// {
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.dataSource.data = getCompanyListList;
    //     this.allCompanys = getCompanyListList;
	// }

	// private onDataLoadSuccessful(getConditionList: Condition[])
	// {
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.dataSource.data = getConditionList;
	// 	this.allConditionInfo = getConditionList;
	// }
	// dataSource: MatTableDataSource<any>;

    // triggerSomeEvent()
	// {
	// 	this.isDisabled = !this.isDisabled;
	// 	return;
	// }

	// //saveItemMasterDetails(sourceStockLine: any) {
	// //	this.stocklineser.updateItemMasterEndpoint(sourceStockLine);
	// //}
	// //for Saving Integration Data

	// saveStocklineIntegrationPortalData(id,models)
	// {
	// 	for (let i = 0; i < models.length; i++)
	// 	{
	// 		models[i].StocklineId = id;
	// 		//data[i].partId = partid;
	// 		this.stocklineser.saveStocklineIntegrationPortalData(models[i]).subscribe(stocklineIntegrationPortalData => {
	// 			this.collectionofstocklineIntegrationPortalData = stocklineIntegrationPortalData;
	// 		})

	// 	}
	// }
}