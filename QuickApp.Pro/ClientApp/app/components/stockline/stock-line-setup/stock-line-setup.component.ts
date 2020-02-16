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
import { MessageSeverity, AlertService } from '../../../services/alert.service';

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

	
	constructor(private alertService: AlertService,private stocklineser: StocklineService, private commonService: CommonService, private conditionService: ConditionService, private binService: BinService, private siteService: SiteService, private vendorService: VendorService, private manufacturerService: ManufacturerService, private integrationService: IntegrationService, private itemMasterService: ItemMasterService, private glAccountService: GlAccountService, private router: Router, private _actRoute: ActivatedRoute, private datePipe: DatePipe) {
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

	}

	loadCustomerData() {
		this.commonService.smartDropDownList('Customer', 'CustomerId', 'Name').subscribe(response => {
			this.allCustomersList = response;
		});
	}

	loadVendorData() {
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
			this.stockLineForm.tagDays = partDetails.tagDays;
			this.stockLineForm.manufacturingDays = partDetails.manufacturingDays;
			this.stockLineForm.daysReceived = partDetails.daysReceived;
			this.stockLineForm.openDays = partDetails.openDays;
			this.stockLineForm.openDate = partDetails.openDate;
			this.stockLineForm.NHA = partDetails.nha;
			this.stockLineForm.isDER = partDetails.der;
			this.stockLineForm.isPMA = partDetails.pma;
			this.stockLineForm.IsManufacturingDateAvailable = partDetails.IsManufacturingDateAvailable;
			if (this.stockLineForm.isSerialized == true) {
				this.hideSerialNumber = false;
			}
			else {
				this.hideSerialNumber = true;
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
				if (x.listedCheckbox == true || x.integratedCheckbox == true) {
					const integrationInfo = {
						...x,
						stockLineId: res.stockLineId
					}
					this.integrationInfoList.push(integrationInfo);

				}
			});
			this.saveStocklineIntegrationPortalData(this.integrationInfoList);
			this.router.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-list');
			this.alertService.showMessage(
				'Success',
				`Saved Stockline data Sucessfully `,
				MessageSeverity.success)
		})
	}

	saveStocklineIntegrationPortalData(data) {
		this.stocklineser.saveStocklineIntegrationPortalData(data).subscribe(stocklineIntegrationPortalData => {
			console.log(stocklineIntegrationPortalData);
		})
	}

}