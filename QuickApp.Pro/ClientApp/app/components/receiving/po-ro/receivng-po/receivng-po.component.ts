import { Component, OnInit } from '@angular/core';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { CreditTermsService } from '../../../../services/Credit Terms.service';
import { VendorService } from '../../../../services/vendor.service';
import { PriorityService } from '../../../../services/priority.service';
import { ConditionService } from '../../../../services/condition.service';
import { UnitOfMeasureService } from '../../../../services/unitofmeasure.service';
import { CurrencyService } from '../../../../services/currency.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'
import { ModalService } from '../../../../services/Index';
import { EmployeeService } from '../../../../services/employee.service';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { CustomerService } from '../../../../services/customer.service';
import { SiteService } from '../../../../services/site.service';
import { WarehouseService } from '../../../../services/warehouse.service';
import { Site } from '../../../../models/site.model';
import { BinService } from '../../../../services/bin.service';
import { ManufacturerService } from '../../../../services/manufacturer.service';
import { StocklineService } from '../../../../services/stockline.service';
import { ReceivingService } from '../../../../services/receiving/receiving.service';
import { PurchaseOrder, PurchaseOrderPart, StockLine, DropDownData } from './PurchaseOrder.model';
import { ManagementStructure } from './managementstructure.model';
import { Dropdown } from 'primeng/dropdown';
import { AccountService } from '../../../../services/account.service';
import { CompanyService } from '../../../../services/company.service';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { AddressModel } from '../../../../models/address.model';
import { Warehouse } from '../../../../models/warehouse.model';
import { Bin } from '../../../../models/bin.model';
import { Shelf } from '../../../../models/shelf.model';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { error } from '@angular/compiler/src/util';
import { Customer } from '../../../../models/customer.model';
import { GlAccountService } from '../../../../services/glAccount/glAccount.service';
import { Console } from '@angular/core/src/console';

@Component({
    selector: 'app-receivng-po',
    templateUrl: './receivng-po.component.html',
    styleUrls: ['./receivng-po.component.scss']
})
/** purchase-setup component*/
export class ReceivngPoComponent implements OnInit {
    purchaseOrderData: PurchaseOrder;
    managementStructure: ManagementStructure[];
    poCompanyList: DropDownData[];
    poBusinessUnitList: DropDownData[];
    poDivisionList: DropDownData[];
    poDepartmentList: DropDownData[];
    poCreditTermInfo: DropDownData[];
    poPriorityInfo: DropDownData[];
    poStatus: DropDownData[] = [];
    poUserType: DropDownData[] = [];

    poSelectedCompanyId: number;
    poSelectedBusinessUnitId: number;
    poSelectedDivisionId: number;
    poSelectedDepartmentId: number;
    poPartManagementStructureList: string[];

    managementStructureHierarchy: ManagementStructure[][] = [];
    selectedManagementStructure: ManagementStructure[] = [];
    sites: Site[];

    CustomerList: DropDownData[] = [];
    VendorList: DropDownData[] = [];
    ManufacturerList: DropDownData[] = [];
    ConditionList: DropDownData[] = [];
    GLAccountList: DropDownData[] = [];
    ConditionId: number = 0;
    allPartGLAccountId: number;


    toggleIcon: boolean = false;
    currentSLIndex: number = 0;
    pageTitle: string = "Receive PO";
    isDisabledTLboxes: boolean = false;

    obtainfromcustomer: boolean = false;
    obtainfromother: boolean = false;
    obtainfromvendor: boolean = false;

    ownercustomer: boolean = false;
    ownerother: boolean = false;
    ownervendor: boolean = false;

    traceabletocustomer: boolean = false;
    traceabletoother: boolean = false;
    traceabletovendor: boolean = false;
    //showGrid: boolean;
    //userName: any;
    //collectionofstockLine: any;
    //allVendorListForStockline: any[];
    //allCustomersForStockline: any[];
    //showRestrictQuantity: boolean;
    //showFreeQuantity: boolean;
    //showNormalQuantity: boolean;
    //hasSerialized: boolean;
    //iValue: number;
    //showInput: boolean;
    //PoCollection: any;

    //stockLineItems: StockLine;

    //allPriorityInfo: any[] = [];
    //VendorCodesColl: any[] = [];
    //vendorCodes: any[] = [];
    //allActions: any[] = [];
    //selectedVendorCode: any;
    //disableSaveVenderName: boolean;
    //disableSaveVenName: boolean;
    //loadingIndicator: boolean;
    //customerNamecoll: any[] = [];
    //billToCusData: any[] = [];
    //shipToContactData: any[] = [];
    //shipToCusData: any[] = [];
    //billToContactData: any[] = [];
    //VendorNamecoll: any[] = [];
    //customerNames: any[];
    //vendorNames: any[] = [];
    //vendorSelectedForBillTo: any[];
    //vendorContactsForshipTo: any[] = [];
    //vendorContactsForBillTO: any[] = [];
    //vendorSelected: any[] = [];
    //allCustomers: any[];

    //employeeNameCollection: any[] = [];
    //allEmployeeinfo: any[] = [];
    //allManagemtninfo: any[] = [];
    //bulist: any[] = [];
    //departmentList: any[] = [];
    //divisionlist: any[] = [];
    //maincompanylist: any[] = [];
    //mainPartcompanylist: any[] = [];
    //partList: any = {};
    //QuantityReceivedDataForItemMasterId: any[];
    //partListData: any[] = [];
    //editChildList: any[] = [];
    //purchaseOrderPartManagementStructure: any[] = [];
    //allManufacturerInfo: any[] = [];
    //allconditioninfo: any[] = [];
    //allSites: Site[];

    /** po-approval ctor */
    constructor(public binservice: BinService,
        public manufacturerService: ManufacturerService,
        public legalEntityService: LegalEntityService,
        public receivingService: ReceivingService,
        public priorityService: PriorityService,
        public stocklineService: StocklineService,
        public siteService: SiteService,
        public warehouseService: WarehouseService,
        public vendorService: VendorService,
        public customerService: CustomerService,
        public companyService: CompanyService,
        private itemmaster: ItemMasterService,
        private modalService: NgbModal,
        private route: Router,
        public currencyService: CurrencyService,
        public unitofmeasureService: UnitOfMeasureService,
        public conditionService: ConditionService,
        public creditTermsService: CreditTermsService,
        public employeeService: EmployeeService,
        private alertService: AlertService,
        private accountService: AccountService,
        private glAccountService: GlAccountService) {
        this.getManagementStructure();
        this.getAllSite();
        this.getCustomers();
        this.getVendors();
        this.getManufacturers();
        this.getConditionList();
        this.getAllGLAccount();
    }

    ngOnInit() {
        //TODO : Remove this code after module is completed.
        this.receivingService.getPurchaseOrderDataById(117).subscribe(
            results => this.loadPurchaseOrderData(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.poStatus = [];

        this.getAllCreditTerms();
        this.getAllPriority();
        this.getStatus();
        //this.priorityData();
        //this.loadVendorData();

        //this.loadManufacturerData();
        //this.loadSiteData();
        //this.loadConditionData();
        //this.customerListForStockline();
        //this.vendorListForStockline();

    }

    //private getItemDetails(PurchaseOrderPart: any): void {
    //    this.itemmaster.getItemMasterById().subscribe(item => {
    //        Console.log(item[0]);
    //    });
    //}


    private getStatus() {
        this.poStatus = [];
        this.poStatus.push(<DropDownData>{ Key: '1', Value: 'Open' });
        this.poStatus.push(<DropDownData>{ Key: '2', Value: 'Pending Approval' });
        this.poStatus.push(<DropDownData>{ Key: '3', Value: 'Approved' });
        this.poStatus.push(<DropDownData>{ Key: '4', Value: 'Rejected' });
        this.poStatus.push(<DropDownData>{ Key: '5', Value: 'Fulfilled' });

        this.poUserType = [];
        this.poUserType.push(<DropDownData>{ Key: '1', Value: 'Customer' });
        this.poUserType.push(<DropDownData>{ Key: '2', Value: 'Vendor' });
        this.poUserType.push(<DropDownData>{ Key: '3', Value: 'Company' });

    }

    private getStatusById(statusId: string) {
        if (statusId == null)
            return 'NA';

        return this.poStatus.filter(function (status) {
            return status.Key == statusId;
        })[0].Value;
    }

    private getUserTypeById(userTypeId: string) {
        if (userTypeId == null)
            return 'NA';

        return this.poUserType.filter(function (status) {
            return status.Key == userTypeId;
        })[0].Value;
    }

    private getAddress(address: AddressModel): string {
        let addr: string = '';
        if (address.line1)
            addr += address.line1 + ', ';
        if (address.line2)
            addr += address.line2 + ', ';
        if (address.line3)
            addr += address.line3 + ', ';
        if (address.city)
            addr += address.city + ', ';
        if (address.stateOrProvince)
            addr += address.stateOrProvince + ', ';
        if (address.postalCode)
            addr += address.postalCode + ', ';
        if (address.country)
            addr += address.country;

        return addr;
    }

    private loadPurchaseOrderData(purchaseOrder: PurchaseOrder) {
        //if (this.receivingService.selectedPurchaseorderCollection != undefined) {
        //this.purchaseOrderData = this.receivingService.selectedPurchaseorderCollection;
        this.purchaseOrderData = purchaseOrder;
        //this.purchaseOrderData.purchaseOderPart.forEach(part => {
        let parentPart: PurchaseOrderPart;
        for (let part of this.purchaseOrderData.purchaseOderPart) {

            part.visible = false;
            part.showStockLineGrid = false;

            let selectedOrgStruct: ManagementStructure[] = [];

            if (part.isParent) {
                this.getManagementStructureHierarchy(part.managementStructureId, null, selectedOrgStruct);
                selectedOrgStruct.reverse();
                part.managementStructureName = [];
                for (let mangStructure of selectedOrgStruct) {
                    part.managementStructureName.push(mangStructure.code);
                }
                parentPart = part;
            }
            else {
                part.addressText = this.getAddress(part.poPartSplitAddress);
                if (part.poPartSplitUserTypeId == 1) {
                    this.customerService.getCustomerdata(part.poPartSplitUserId).subscribe(
                        result => {
                            part.userName = result[0][0].name;
                        },
                        error => this.onDataLoadFailed(error)
                    );
                }
                part.userTypeName = this.getUserTypeById(part.poPartSplitUserTypeId.toLocaleString());
                part.statusText = this.getStatusById(part.status);
                part.managementStructureName = parentPart.managementStructureName;
            }

        }
        this.purchaseOrderData.dateRequested = new Date(); //new Date(this.purchaseOrderData.dateRequested);
        this.purchaseOrderData.dateApprovied = new Date(this.purchaseOrderData.dateApprovied);
        this.purchaseOrderData.needByDate = new Date(); //new Date(this.purchaseOrderData.needByDate);
    }

    private getManagementStructure() {
        this.alertService.startLoadingMessage();
        this.legalEntityService.getManagemententity().subscribe(
            results => this.managementStructureSuccess(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private managementStructureSuccess(managementStructure: ManagementStructure[]) {

        this.alertService.stopLoadingMessage();
        this.managementStructure = managementStructure;
        if (this.managementStructure != undefined && this.managementStructure.length > 0) {
            this.poCompanyList = [];
            this.poBusinessUnitList = [];
            this.poDivisionList = [];
            this.poDepartmentList = [];

            this.getManagementStructureHierarchy(54, this.managementStructureHierarchy, this.selectedManagementStructure);
            this.managementStructureHierarchy.reverse();
            this.selectedManagementStructure.reverse();

            if (this.managementStructureHierarchy[0] != undefined && this.managementStructureHierarchy[0].length > 0) {
                this.poSelectedCompanyId = this.selectedManagementStructure[0].managementStructureId;
                for (let managementStruct of this.managementStructureHierarchy[0]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                    dropdown.Value = managementStruct.code;
                    this.poCompanyList.push(dropdown);
                }
            }
            if (this.managementStructureHierarchy[1] != undefined && this.managementStructureHierarchy[1].length > 0) {
                this.poSelectedBusinessUnitId = this.selectedManagementStructure[1].managementStructureId;
                for (let managementStruct of this.managementStructureHierarchy[1]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                    dropdown.Value = managementStruct.code;
                    this.poBusinessUnitList.push(dropdown);
                }
            }
            if (this.managementStructureHierarchy[2] != undefined && this.managementStructureHierarchy[2].length > 0) {
                this.poSelectedDivisionId = this.selectedManagementStructure[2].managementStructureId;
                for (let managementStruct of this.managementStructureHierarchy[2]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                    dropdown.Value = managementStruct.code;
                    this.poDivisionList.push(dropdown);
                }
            }
            if (this.managementStructureHierarchy[3] != undefined && this.managementStructureHierarchy[3].length > 0) {
                this.poSelectedDepartmentId = this.selectedManagementStructure[3].managementStructureId;
                for (let managementStruct of this.managementStructureHierarchy[3]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                    dropdown.Value = managementStruct.code;
                    this.poDepartmentList.push(dropdown);
                }
            }

            //poBusinessUnitList: DropDownData[];
            //poDivisionList: DropDownData[];
            //poDepartmentList: DropDownData[];

            //for (let company of companies) {
            //    var dropdown = new DropDownData();
            //    dropdown.Key = company.managementStructureId.toLocaleString();
            //    dropdown.Value = company.code;

            //    this.poCompanyList.push(dropdown);
            //}
        }

        //for (let i = 0; i < this.allManagemtninfo.length; i++) {
        //    if (this.allManagemtninfo[i].parentId == null) {
        //        this.bulist = [];
        //        this.departmentList = [];
        //        this.divisionlist = [];

        //        this.maincompanylist.push(this.allManagemtninfo[i]);
        //        this.mainPartcompanylist.push(this.allManagemtninfo[i]);
        //    }
        //}
    }

    private getManagementStructureHierarchy(managementStructureId: number, managementStructureHierarchy: ManagementStructure[][], selectedManagementStructure: ManagementStructure[]) {

        var selectedManagementStructures = this.managementStructure.filter(function (management) {
            return management.managementStructureId == managementStructureId;
        });

        if (selectedManagementStructures != undefined && selectedManagementStructures.length > 0) {
            var selectedMangStruc = selectedManagementStructures[0];

            if (selectedMangStruc.parentId != null) {
                var selectedMSList = this.managementStructure.filter(function (management) {
                    return management.parentId == selectedMangStruc.parentId;
                });

                if (managementStructureHierarchy != null) {
                    managementStructureHierarchy.push(selectedMSList);
                }

                if (selectedManagementStructure != null) {
                    selectedManagementStructure.push(selectedMangStruc);
                }

                this.getManagementStructureHierarchy(selectedMangStruc.parentId, managementStructureHierarchy, selectedManagementStructure);
            }
            else {
                var selectedMSList = this.managementStructure.filter(function (management) {
                    return management.parentId == null;
                });

                if (managementStructureHierarchy != null) {
                    managementStructureHierarchy.push(selectedMSList);
                }

                if (selectedManagementStructure != null) {
                    selectedManagementStructure.push(selectedMangStruc);
                }
            }
        }
    }

    private showSplitShipmentParts(itemMasterId: number): void {
        this.toggleExpandIcon();
        var selectedParts = this.purchaseOrderData.purchaseOderPart.filter(function (part) {
            return part.itemMasterId == itemMasterId;
        });

        selectedParts.forEach(part => {
            part.visible = !part.visible;
        });
    }

    private toggleExpandIcon() {
        this.toggleIcon = !this.toggleIcon;
    }

    private getAllPriority() {
        this.priorityService.getPriorityList().subscribe(
            results => {
                this.poPriorityInfo = [];
                for (let priority of results[0]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = priority.priorityId.toLocaleString();
                    dropdown.Value = priority.description;
                    this.poPriorityInfo.push(dropdown);
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    private getAllCreditTerms() {
        this.creditTermsService.getCreditTermsList().subscribe(
            results => {
                this.poCreditTermInfo = [];
                for (let creditTerm of results[0]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = creditTerm.creditTermsId.toLocaleString();
                    dropdown.Value = creditTerm.name;
                    this.poCreditTermInfo.push(dropdown);
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    private onDataLoadFailed(error: any): void {
        console.log(error);
        this.alertService.stopLoadingMessage();
    }

    private partQuantityChange(event: any, part: PurchaseOrderPart): void {
        let quantity: number = <number>event.target.value;

        if (quantity > part.quantityOrdered) {
            event.target.value = "";
            this.alertService.showMessage(this.pageTitle, "Quantity receieve can not be more than quantity ordered", MessageSeverity.error);
            return;
        }

        if (quantity == 0) {
            event.target.value = "";
            this.alertService.showMessage(this.pageTitle, "Quantity receieve can not be zero", MessageSeverity.error);
            return;
        }

        part.stocklineListObj = [];

        for (var i = 0; i < quantity; i++) {
            var stockLine = new StockLine();
            stockLine.CompanyList = [];
            stockLine.companyId = 0;
            stockLine.BusinessUnitList = [];
            stockLine.businessUnitId = 0;
            stockLine.DivisionList = [];
            stockLine.divisionId = 0;
            stockLine.DepartmentList = [];
            stockLine.departmentId = 0;
            stockLine.manufacturerId = 0;
            stockLine.visible = false;
            this.getStockLineCompanies(stockLine);
            this.getStockLineSite(stockLine);

            part.stocklineListObj.push(stockLine);
        }

        part.stocklineListObj[this.currentSLIndex].visible = true;

        this.currentSLIndex = 0;
    }

    private paginatorFocusOut(event: any): void {
        if (event.target.value == '') {
            this.currentSLIndex = 0;
        }
    }

    private gotoStockLinePage(event: any, part: PurchaseOrderPart): void {
        let value = event.target.value;
        let index: number = 0;
        if (value == '') {
            return;
        }
        index = Number.parseInt(value) - 1;
        if (index < part.stocklineListObj.length) {
            this.currentSLIndex = index;
        }
        else {
            this.alertService.showMessage(this.pageTitle, "Invalid stock line page", MessageSeverity.error);
            return;
        }
    }

    moveStockLinePage(increment: number, part: PurchaseOrderPart): void {
        let index: number = this.currentSLIndex + increment;
        if (index >= 0 && index < part.stocklineListObj.length) {
            this.currentSLIndex = index;
        }
    }

    getStockLineCompanies(stockLine: StockLine): void {
        var companies = this.managementStructure.filter(function (management) {
            return management.parentId == null;
        });

        stockLine.CompanyList = [];
        stockLine.BusinessUnitList = [];
        stockLine.DivisionList = [];
        stockLine.DepartmentList = [];
        stockLine.companyId = 0;
        stockLine.businessUnitId = 0;
        stockLine.divisionId = 0;
        stockLine.departmentId = 0;

        for (let company of companies) {
            var dropdown = new DropDownData();
            dropdown.Key = company.managementStructureId.toLocaleString();
            dropdown.Value = company.code;
            stockLine.CompanyList.push(dropdown);
        }

    }

    getStockLineBusinessUnitList(stockLine: StockLine): void {
        var businessUnits = this.managementStructure.filter(function (management) {
            return management.parentId == stockLine.companyId;
        });

        stockLine.BusinessUnitList = [];
        stockLine.DivisionList = [];
        stockLine.DepartmentList = [];
        stockLine.businessUnitId = 0;
        stockLine.divisionId = 0;
        stockLine.departmentId = 0;

        for (let businessUnit of businessUnits) {
            var dropdown = new DropDownData();
            dropdown.Key = businessUnit.managementStructureId.toLocaleString();
            dropdown.Value = businessUnit.code;
            stockLine.BusinessUnitList.push(dropdown);
        }
    }

    getStockLineDivision(stockLine: StockLine): void {
        var divisions = this.managementStructure.filter(function (management) {
            return management.parentId == stockLine.businessUnitId;
        });

        stockLine.DivisionList = [];
        stockLine.DepartmentList = [];
        stockLine.divisionId = 0;
        stockLine.departmentId = 0;
        for (let division of divisions) {
            var dropdown = new DropDownData();
            dropdown.Key = division.managementStructureId.toLocaleString();
            dropdown.Value = division.code;
            stockLine.DivisionList.push(dropdown);
        }
    }

    getStockLineDepartment(stockLine: StockLine): void {
        var departments = this.managementStructure.filter(function (management) {
            return management.parentId == stockLine.divisionId;
        });

        stockLine.DepartmentList = [];
        stockLine.departmentId = 0;
        for (let deparment of departments) {
            var dropdown = new DropDownData();
            dropdown.Key = deparment.managementStructureId.toLocaleString();
            dropdown.Value = deparment.code;
            stockLine.DepartmentList.push(dropdown);
        }
    }

    getAllSite(): void {
        this.siteService.getSiteList().subscribe(
            results => {
                this.sites = results[0];
            },
            error => this.onDataLoadFailed(error)
        );
    }

    getStockLineSite(stockLine: StockLine): void {
        stockLine.SiteList = [];
        stockLine.siteId = 0;
        stockLine.WareHouseList = [];
        stockLine.warehouseId = 0;
        stockLine.LocationList = [];
        stockLine.locationId = 0;
        stockLine.ShelfList = [];
        stockLine.shelfId = 0;
        stockLine.BinList = [];
        stockLine.binId = 0;

        for (let site of this.sites) {
            var dropdown = new DropDownData();
            dropdown.Key = site.siteId.toLocaleString();
            dropdown.Value = site.name;
            stockLine.SiteList.push(dropdown);
        }
    }

    getStockLineWareHouse(stockLine: StockLine): void {
        stockLine.WareHouseList = [];
        stockLine.warehouseId = 0;
        stockLine.LocationList = [];
        stockLine.locationId = 0;
        stockLine.ShelfList = [];
        stockLine.shelfId = 0;
        stockLine.BinList = [];
        stockLine.binId = 0;
        this.binservice.getWareHouseBySiteId(stockLine.siteId).subscribe( //calling and Subscribing for WareHouse Data
            results => {

                console.log(results);
                for (let wareHouse of results) {
                    var dropdown = new DropDownData();
                    dropdown.Key = wareHouse.warehouseId.toLocaleString();
                    dropdown.Value = wareHouse.warehouseName;
                    stockLine.WareHouseList.push(dropdown);
                }
            }, //sending WareHouse
            error => this.onDataLoadFailed(error)
        );
    }

    getStockLineLocation(stockLine: StockLine): void {
        stockLine.LocationList = [];
        stockLine.locationId = 0;
        stockLine.ShelfList = [];
        stockLine.shelfId = 0;
        stockLine.BinList = [];
        stockLine.binId = 0;
        this.binservice.getLocationByWareHouseId(stockLine.warehouseId).subscribe(
            results => {
                console.log(results);
                for (let loc of results) {
                    var dropdown = new DropDownData();
                    dropdown.Key = loc.locationId.toLocaleString();
                    dropdown.Value = loc.name;
                    stockLine.LocationList.push(dropdown);
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    getStockLineShelf(stockLine: StockLine): void {
        stockLine.ShelfList = [];
        stockLine.shelfId = 0;
        stockLine.BinList = [];
        stockLine.binId = 0;
        this.binservice.getShelfByLocationId(stockLine.locationId).subscribe(
            results => {
                console.log(results);
                for (let shelf of results) {
                    var dropdown = new DropDownData();
                    dropdown.Key = shelf.shelfId.toLocaleString();
                    dropdown.Value = shelf.name;
                    stockLine.ShelfList.push(dropdown);
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    getStockLineBin(stockLine: StockLine): void {
        stockLine.BinList = [];
        stockLine.binId = 0;
        this.binservice.getBinByShelfId(stockLine.shelfId).subscribe(
            results => {
                for (let bin of results) {
                    var dropdown = new DropDownData();
                    dropdown.Key = bin.binId.toLocaleString();
                    dropdown.Value = bin.name;
                    stockLine.BinList.push(dropdown);
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    getCustomers(): void {
        //stockLine.CustomerList = [];
        this.customerService.getCustomers().subscribe(
            results => {
                for (let customer of results[0]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = customer.customerId.toLocaleString();
                    dropdown.Value = customer.name;
                    this.CustomerList.push(dropdown);
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    getVendors(): void {
        //stockLine.VendorList = [];
        this.vendorService.getVendors().subscribe(
            vendors => {
                for (let vendor of vendors[0]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = vendor.vendorId.toLocaleString();
                    dropdown.Value = vendor.vendorName;
                    this.VendorList.push(dropdown);
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    getManufacturers() {
        this.ManufacturerList = [];
        this.manufacturerService.getManufacturers().subscribe(
            results => {
                for (let manufacturer of results[0]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = manufacturer.manufacturerId.toLocaleString();
                    dropdown.Value = manufacturer.name;
                    this.ManufacturerList.push(dropdown);
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    addStockLine(part: PurchaseOrderPart): void {
        part.showStockLineGrid = !part.showStockLineGrid;
    }

    onChangeTimeLife() {
        this.isDisabledTLboxes = !this.isDisabledTLboxes;
    }

    onSubmitToReceive() {
        return this.route.navigate(['/receivingmodule/receivingpages/app-edit-po']);
    }

    onObtainFromChange(event) {
        if (event.target.value === '1') {
            this.obtainfromcustomer = true;
            this.obtainfromother = false;
            this.obtainfromvendor = false;
        }
        if (event.target.value === '2') {
            this.obtainfromother = true;
            this.obtainfromcustomer = false;
            this.obtainfromvendor = false;
        }
        if (event.target.value === '3') {
            this.obtainfromvendor = true;
            this.obtainfromcustomer = false;
            this.obtainfromother = false;
        }
    }

    onOwnerChange(event) {
        if (event.target.value === '1') {
            this.ownercustomer = true;
            this.ownerother = false;
            this.ownervendor = false;
        }
        if (event.target.value === '2') {
            this.ownerother = true;
            this.ownercustomer = false;
            this.ownervendor = false;
        }
        if (event.target.value === '3') {
            this.ownervendor = true;
            this.ownercustomer = false;
            this.ownerother = false;
        }
    }

    onTraceableToChange(event) {
        if (event.target.value === '1') {
            this.traceabletocustomer = true;
            this.traceabletoother = false;
            this.traceabletovendor = false;
        }
        if (event.target.value === '2') {
            this.traceabletoother = true;
            this.traceabletocustomer = false;
            this.traceabletovendor = false;
        }
        if (event.target.value === '3') {
            this.traceabletovendor = true;
            this.traceabletocustomer = false;
            this.traceabletoother = false;
        }
    }

    addPageCustomer() {
        this.route.navigateByUrl('/customersmodule/customerpages/app-customer-general-information');
    }

    onFilter(event, stockLine, type): void {
        stockLine.filteredRecords = [];
        var dropdownSource = type == 1 ? this.CustomerList : this.VendorList;
        if (dropdownSource != undefined && dropdownSource.length > 0) {
            for (let row of dropdownSource) {
                if (row.Value != undefined && row.Value.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    stockLine.filteredRecords.push(row.Value);
                }
            }
        }
    }

    getConditionList(): void {
        this.conditionService.getConditionList().subscribe(
            results => {
                for (let condition of results[0]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = condition.conditionId.toLocaleString();
                    dropdown.Value = condition.description;
                    this.ConditionList.push(dropdown);
                }
            }, //sending WareHouse
            error => this.onDataLoadFailed(error)
        );
    }

    getAllGLAccount(): void {
        this.glAccountService.getAll().subscribe(glAccountData => {
            for (let glAccount of glAccountData[0]) {
                var dropdown = new DropDownData();
                dropdown.Key = glAccount.glAccountId.toLocaleString();
                dropdown.Value = glAccount.accountCode;
                this.GLAccountList.push(dropdown);
            }
        });
    }

    //});
}

