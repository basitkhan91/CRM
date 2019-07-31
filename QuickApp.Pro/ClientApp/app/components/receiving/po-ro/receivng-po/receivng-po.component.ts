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

    toggleIcon: boolean = false;
    currentSLIndex: number = 0;
    pageTitle: string = "Receive PO";
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
        private accountService: AccountService) {
        //this.loadPurchaseOrderData();
        this.getManagementStructure();
        this.getAllSite();
        this.getCustomers();
        this.getVendors();
        this.getManufacturers();
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

    private getStatus() {
        this.poStatus = [];
        this.poStatus.push(<DropDownData>{ Key: '1', Value: 'Open' });
        this.poStatus.push(<DropDownData>{ Key: '2', Value: 'Pending Approval' });
        this.poStatus.push(<DropDownData>{ Key: '3', Value: 'Approved' });
        this.poStatus.push(<DropDownData>{ Key: '4', Value: 'Rejected' });
        this.poStatus.push(<DropDownData>{ Key: '4', Value: 'Fulfilled' });

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
        console.log(this.purchaseOrderData);
        this.purchaseOrderData.dateRequested = new Date(); //new Date(this.purchaseOrderData.dateRequested);
        this.purchaseOrderData.dateApprovied = new Date(this.purchaseOrderData.dateApprovied);
        this.purchaseOrderData.needByDate = new Date(); //new Date(this.purchaseOrderData.needByDate);
        //}
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
        let quantity : number = <number> event.target.value;

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

    private gotoStockLinePage(event: any, part: PurchaseOrderPart): void {
        let value = event.target.value;
        let index: number = 0;
        if (value == '') {
            this.currentSLIndex = 0;
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

    private moveStockLinePage(increment: number, part: PurchaseOrderPart): void {
        let index: number = this.currentSLIndex + increment;
        if (index < part.stocklineListObj.length) {
            this.currentSLIndex = index;
        }
    }

    private getStockLineCompanies(stockLine: StockLine): void {
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

    private getStockLineBusinessUnitList(stockLine: StockLine): void {
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

    private getStockLineDivision(stockLine: StockLine): void {
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

    private getStockLineDepartment(stockLine: StockLine): void {
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

    private getAllSite(): void {
        this.siteService.getSiteList().subscribe(
            results => {
                this.sites = results[0];
            },
            error => this.onDataLoadFailed(error)
        );
    }

    private getStockLineSite(stockLine: StockLine): void {
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

    private getStockLineWareHouse(stockLine: StockLine): void {
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

    private getStockLineLocation(stockLine: StockLine): void {
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

    private getStockLineShelf(stockLine: StockLine): void {
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

    private getStockLineBin(stockLine: StockLine): void {
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

    private getCustomers(): void {
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

    private getVendors(): void {
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

    private getManufacturers() {
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

    //private getAllWareHouse(siteId: number): void {
    //    this.warehouseService.getWarehouseList().subscribe( //calling and Subscribing for WareHouse Data
    //        results => {
    //            console.log(results[0]);

    //            this.wareHouses = results[0];
    //        }, //sending WareHouse
    //        error => this.onDataLoadFailed(error)
    //    );
    //}


    //private getLocation(wareHouseId: number): void {
    //    this.loca
    //}

    //onVendorCodeselected(event)
    //{
    //    for (let i = 0; i < this.VendorCodesColl.length; i++) {
    //        if (event == this.VendorCodesColl[i][0].vendorCode) {

    //            this.disableSaveVenName = true;
    //            this.disableSaveVenderName = true;
    //            this.selectedVendorCode = event;
    //        }
    //    }
    //}
    //eventvendorHandler(event) {
    //    if (event.target.value != "") {
    //        let value = event.target.value.toLowerCase();
    //        if (this.selectedVendorCode) {
    //            if (value == this.selectedVendorCode.toLowerCase()) {
    //                //alert("Action Name already Exists");
    //                this.disableSaveVenName = true;
    //                this.disableSaveVenderName = true;

    //            }
    //            else {
    //                this.disableSaveVenName = false;
    //                this.disableSaveVenderName = false;
    //            }
    //        }
    //    }
    //}
    //filterVendorCodes(event)
    //{
    //    this.vendorCodes = [];
    //    for (let i = 0; i < this.allActions.length; i++) {
    //        let vendorCode = this.allActions[i].vendorCode;

    //        if (vendorCode.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //            //this.vendorCodes.push(vendorCode);
    //            this.VendorCodesColl.push([{
    //                "vendorId": this.allActions[i].vendorClassificationId,
    //                "vendorCode": vendorCode
    //            }]),
    //                this.vendorCodes.push(vendorCode);
    //        }
    //    }
    //}
    //private loadVendorData()
    //{
    //    this.alertService.startLoadingMessage();
    //    this.loadingIndicator = true;

    //    this.vendorservice.getWorkFlows().subscribe(
    //        results => this.onDataLoadSuccessful(results[0]),
    //        error => this.onDataLoadFailed(error)
    //    );
    //}

    //private onDataLoadSuccessful(allWorkFlows: any[])
    //{
    //    this.alertService.stopLoadingMessage();
    //    this.loadingIndicator = false;
    //    this.allActions = allWorkFlows;
    //    if (this.purchaseOrderData.billToUserType == 1) {
    //        this.onBillToCustomerNameselected(this.purchaseOrderData.billToUserName);
    //    }
    //    if (this.purchaseOrderData.billToUserType == 2) {
    //        this.onVendorselectedForBillTo(this.purchaseOrderData.billToUserName);
    //    }
    //    if (this.purchaseOrderData.shipToUserType == 1) {
    //        this.onshipCustomerNameselected(this.purchaseOrderData.shipToUserName);
    //    }
    //    if (this.purchaseOrderData.shipToUserType == 2) {
    //        this.onVendorselectedForShipTo(this.purchaseOrderData.shipToUserName);
    //    }

    //    if (this.purchaseOrderData.billToUserType == 1) {
    //        this.filterNames(this.purchaseOrderData.billToUserName);
    //    }
    //    if (this.purchaseOrderData.billToUserType == 2) {
    //        this.filterVendorNames(this.purchaseOrderData.billToUserName);
    //    }
    //    if (this.purchaseOrderData.shipToUserType == 1) {
    //        this.filterNames(this.purchaseOrderData.shipToUserName);
    //    }
    //    if (this.purchaseOrderData.shipToUserType == 2) {
    //        this.filterVendorNames(this.purchaseOrderData.shipToUserName);
    //    }

    //}

    //onBillToCustomerNameselected(event) {
    //    //debugger;
    //    for (let i = 0; i < this.customerNamecoll.length; i++) {
    //        if (event == this.customerNamecoll[i][0].name) {

    //            this.customerService.getCustomerShipAddressGet(this.customerNamecoll[i][0].customerId).subscribe(
    //                returnddataforbill => {
    //                    this.billToCusData = returnddataforbill[0];
    //                });
    //            this.vendorservice.getContacts(this.customerNamecoll[i][0].customerId).subscribe(data => {
    //                //debugger;
    //                this.shipToContactData = data[0];
    //            });
    //        }
    //    }

    //}
    //onshipCustomerNameselected(event) {
    //    //debugger;
    //    for (let i = 0; i < this.customerNamecoll.length; i++) {
    //        if (event == this.customerNamecoll[i][0].name) {

    //            this.customerService.getCustomerShipAddressGet(this.customerNamecoll[i][0].customerId).subscribe(
    //                returnddataforbill => {
    //                    this.shipToCusData = returnddataforbill[0];
    //                });
    //            this.vendorservice.getContacts(this.customerNamecoll[i][0].customerId).subscribe(data => {
    //                //debugger;
    //                this.billToContactData = data[0];
    //            });
    //        }
    //    }

    //}

    //onVendorselectedForBillTo(event) {
    //    //debugger;
    //    this.showInput = true;
    //    for (let i = 0; i < this.VendorNamecoll.length; i++) {
    //        if (event == this.VendorNamecoll[i][0].vendorName) {
    //            this.vendorservice.getVendorShipAddressGet(this.VendorNamecoll[i][0].vendorId).subscribe(
    //                returdaa => {
    //                    this.vendorSelectedForBillTo = returdaa[0];
    //                })
    //            this.vendorservice.getContacts(this.VendorNamecoll[i][0].vendorId).subscribe(
    //                returdaa => {
    //                    this.vendorContactsForBillTO = returdaa[0];
    //                })
    //        }

    //    }

    //}
    //onVendorselectedForShipTo(event) {
    //    //debugger;
    //    this.showInput = true;
    //    for (let i = 0; i < this.VendorNamecoll.length; i++) {
    //        if (event == this.VendorNamecoll[i][0].vendorName) {
    //            this.vendorservice.getVendorShipAddressGet(this.VendorNamecoll[i][0].vendorId).subscribe(
    //                returdaa => {
    //                    this.vendorSelected = returdaa[0];
    //                })
    //            this.vendorservice.getContacts(this.VendorNamecoll[i][0].vendorId).subscribe(
    //                returdaa => {
    //                    this.vendorContactsForshipTo = returdaa[0];
    //                })
    //        }

    //    }

    //}

    //filterNames(event) {

    //    this.customerNames = [];
    //    if (this.allCustomers) {
    //        if (this.allCustomers.length > 0) {
    //            for (let i = 0; i < this.allCustomers.length; i++) {
    //                let name = this.allCustomers[i].name;
    //                if (event.query) {
    //                    if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                        this.customerNamecoll.push([{
    //                            "customerId": this.allCustomers[i].customerId,
    //                            "name": name
    //                        }]),
    //                            this.customerNames.push(name);
    //                    }
    //                }
    //                else {
    //                    //if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                    this.customerNamecoll.push([{
    //                        "customerId": this.allCustomers[i].customerId,
    //                        "name": name
    //                    }]),
    //                        this.customerNames.push(name);
    //                    //}
    //                }
    //            }
    //        }
    //    }
    //}

    //filterVendorNames(event) {

    //    this.vendorNames = [];
    //    if (this.allActions) {
    //        for (let i = 0; i < this.allActions.length; i++) {
    //            let vendorName = this.allActions[i].vendorName;
    //            if (event.query) {
    //                if (vendorName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                    //this.vendorNames.push(vendorName);
    //                    this.VendorNamecoll.push([{
    //                        "vendorId": this.allActions[i].vendorId,
    //                        "vendorName": vendorName
    //                    }]),
    //                        this.vendorNames.push(vendorName);
    //                }
    //            }
    //            else {
    //                //if (vendorName.toLowerCase().indexOf(event.toLowerCase()) == 0) {
    //                //this.vendorNames.push(vendorName);
    //                this.VendorNamecoll.push([{
    //                    "vendorId": this.allActions[i].vendorId,
    //                    "vendorName": vendorName
    //                }]),
    //                    this.vendorNames.push(vendorName);
    //                //}
    //            }
    //        }
    //    }
    //}


    //private employeedata()
    //{
    //    this.alertService.startLoadingMessage();
    //    this.loadingIndicator = true;
    //    this.employeeService.getEmployeeList().subscribe(
    //        results => this.onempDataLoadSuccessful(results[0]),
    //        error => this.onDataLoadFailed(error)
    //    );
    //    //this.selectedColumns = this.cols;
    //}
    //private onempDataLoadSuccessful(getEmployeeCerficationList: any[])
    //{
    //    this.alertService.stopLoadingMessage();
    //    this.loadingIndicator = false;
    //    this.allEmployeeinfo = getEmployeeCerficationList;
    //}

    //filterfirstName(event)
    //{
    //    this.employeeNameCollection = [];
    //    for (let i = 0; i < this.allEmployeeinfo.length; i++) {
    //        let firstName = this.allEmployeeinfo[i].firstName;
    //        if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //            this.employeeNameCollection.push(firstName);
    //        }
    //    }
    //}



    //getBUList(masterCompanyId)
    //{
    //    //this.purchaseOrderData.managementStructureEntityId = masterCompanyId; //Saving Management Structure Id if there Company Id

    //    this.bulist = [];
    //    this.departmentList = [];
    //    this.divisionlist = [];
    //    for (let i = 0; i < this.allManagemtninfo.length; i++) {
    //        if (this.allManagemtninfo[i].parentId == masterCompanyId) {
    //            this.bulist.push(this.allManagemtninfo[i]);
    //        }
    //    }
    //   // this.purchaseOrderData.buid1 = null;
    //    console.log(this.bulist);
    //}

    //getDepartmentlist(buid) {
    //   // this.purchaseOrderData.managementStructureEntityId = buid; //Saving Management Structure Id if there Company Id

    //    this.departmentList = [];
    //    this.divisionlist = [];
    //    for (let i = 0; i < this.allManagemtninfo.length; i++) {
    //        if (this.allManagemtninfo[i].parentId == buid) {
    //            this.departmentList.push(this.allManagemtninfo[i]);
    //        }
    //    }

    //   // this.purchaseOrderData.depid1 = null;

    //    console.log(this.departmentList);
    //}

    //getDivisionlist(depid) {
    //   // this.purchaseOrderData.managementStructureEntityId = depid; //Saving Management Structure Id if there Company Id

    //    this.divisionlist = [];
    //    for (let i = 0; i < this.allManagemtninfo.length; i++) {
    //        if (this.allManagemtninfo[i].parentId == depid) {
    //            this.divisionlist.push(this.allManagemtninfo[i]);
    //        }
    //    }
    //   // this.purchaseOrderData.divid1 = true;
    //}

    //getDivisionChangeManagementCode(obj)
    //{
    //    //this.purchaseOrderData.managementStructureEntityId = obj;
    //}

    //GetStockLineDataBasedonItemMasterId(Collection, itemMasterId: any) {

    //    this.stocklineService.getStocklineListById(itemMasterId).subscribe(results =>
    //        this.onDataLoadQuantityReceive(Collection, results),
    //        error => this.onDataLoadFailed(error)
    //    )
    //}

    //onDataLoadQuantityReceive(Collection, results: any)
    //{
    //    this.QuantityReceivedDataForItemMasterId = results;

    //    let data = 0;
    //    for (let i = 0; i < results.length; i++) {
    //        data += results[i].quantityToReceive;
    //    }
    //    this.receivingService.selectedPurchaseorderCollection[this.iValue].purchaseOderPart.quantityReceived = data;
    //    this.receivingService.selectedPurchaseorderCollection[this.iValue].purchaseOderPart.quantityBackOrdered = this.receivingService.selectedPurchaseorderCollection[this.iValue].purchaseOderPart.quantityOrdered - this.receivingService.selectedPurchaseorderCollection[this.iValue].purchaseOderPart.quantityReceived;
    //    this.iValue = 0;
    //    console.log(data)

    //}

    //managementStructureFormation(arr, parent) {
    //    var out = []
    //    let out1 = [];
    //    var k = 0;
    //    for (var i in arr) {
    //        if (arr[i].managementStructureId == parent) {
    //            out.push(arr[i]);
    //            out1.push(arr[i]);
    //            this.purchaseOrderPartManagementStructure.push(arr[i]);
    //            this.managementStructureFormation(arr, arr[i].parentId)
    //            out.push(arr[i])
    //            k++;
    //        }
    //    }
    //    return this.purchaseOrderPartManagementStructure;
    //}

    //formingManagementStructureForPurchaseOrderPart(allManagemtninfo, managementStructureId,purchaseOrderpartIvalue)
    //{
    //    this.managementStructureFormation(this.allManagemtninfo, managementStructureId);

    //    switch (this.purchaseOrderPartManagementStructure.length) {
    //        case 1:
    //            this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.companyId = this.purchaseOrderPartManagementStructure[0].managementStructureId;
    //            break;
    //        case 2:
    //            this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.businessUnitId = this.purchaseOrderPartManagementStructure[0].managementStructureId;
    //            this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.companyId = this.purchaseOrderPartManagementStructure[1].managementStructureId;
    //            break;
    //        case 3:
    //            this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.departmentId = this.purchaseOrderPartManagementStructure[0].managementStructureId;
    //            this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.businessUnitId = this.purchaseOrderPartManagementStructure[1].managementStructureId;
    //            this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.companyId = this.purchaseOrderPartManagementStructure[2].managementStructureId;
    //            break;
    //        case 4:
    //            this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.divisionId = this.purchaseOrderPartManagementStructure[0].managementStructureId;
    //            this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.departmentId = this.purchaseOrderPartManagementStructure[1].managementStructureId;
    //            this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.businessUnitId = this.purchaseOrderPartManagementStructure[2].managementStructureId;
    //            this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.companyId = this.purchaseOrderPartManagementStructure[3].managementStructureId;
    //            break;
    //    }

    //    this.getBUList(this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.companyId); //default BU
    //    this.getDepartmentlist(this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.businessUnitId); //default BU
    //    this.getDivisionlist(this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.departmentId); //default BU

    //    //this.sourceStockLineSetup.comId = null;
    //}

    addStockLine(part: PurchaseOrderPart): void {
        part.showStockLineGrid = !part.showStockLineGrid;
    }


    //addDetailsClick(part:PurchaseOrderPart):void
    //{
    //    part.showStockLineGrid = !part.showStockLineGrid;

    //    this.itemmaster.getDescriptionbypart(part.itemMaster.partNumber).subscribe((data: any) => {
    //        part["isSerialized"] = data[0][0].isSerialized;
    //        part["isTimeLife"] = data[0][0].isTimeLife;
    //        part["glAccountId"] = data[0][0].glAccountId;
    //        if (part["isSerialized"] == true) {
    //           // this.hideSerialNumber = true;
    //            this.showRestrictQuantity = true;
    //            this.showFreeQuantity = false;
    //            this.showNormalQuantity = false;
    //            part["isSerialized"] = true;
    //            this.hasSerialized = true; //for Knowing is Serialized or not for Serial Number 

    //        }
    //        else {
    //           // this.hideSerialNumber = false;
    //            this.showRestrictQuantity = false;
    //            this.showFreeQuantity = true;
    //            this.showNormalQuantity = false;
    //            part["isSerialized"] = false;

    //            this.hasSerialized = false; //for Knowing is Serialized or not for Serial Number 

    //        }

    //    })

    //    for (let i = 0; i < part.quantityOrdered;i++)
    //    {
    //         part.stocklineListObj[i] = new StockLine(); 
    //        //part["stocklineListObj"].push(this.loadDefualtObj());
    //    }
    //   // var stockLineCount = part.quantityOrdered - this.purchaseOrderData.stockLine.quantityToReceive;
    //}

    //loadDefualtObj() {

    //    let stocklineObject: StockLine;
    //    return stocklineObject;
    //    //let stockLineDefObj = {
    //    //    companyId: '',
    //    //    managementStructureEntityId: '',
    //    //    businessUnitId: '',
    //    //    partNumber: '',
    //    //    partDescription: '',
    //    //    isSerialized: '',
    //    //    shelfLife: '',
    //    //    isPMA: '',
    //    //    isDER: '',
    //    //    itemMasterId: '',
    //    //    glAccountId: '',
    //    //    quantity: '',
    //    //    conditionId: '',
    //    //    serialNumber: '',
    //    //    siteId: '',
    //    //    warehouseId: '',
    //    //    locationId: '',
    //    //    shelfId: '',
    //    //    binId: '',
    //    //    obtainFromType: '',
    //    //    obtainFrom: '',
    //    //    ownerType: '',
    //    //    owner: '',
    //    //    traceableToType: '',
    //    //    traceableTo: '',
    //    //    manufacturerId: '',
    //    //    manufacturerLotNumber: '',
    //    //    manufacturingDate: '',
    //    //    manufacturingBatchNumber: '',
    //    //    partCertificationNumber: '',
    //    //    certifiedBy: '',
    //    //    certifiedDate: '',
    //    //    tagDate: '',
    //    //    tagType: '',
    //    //    certifiedDueDate: '',
    //    //    orderDate: '',
    //    //    PurchaseOrderId: '',
    //    //    RepairOrderId: '',
    //    //    receivedDate: '',
    //    //    receiverNumber: '',
    //    //    reconciliationNumber: '',
    //    //    shelfLifeExpirationDate: '',
    //    //    unitSalesPrice: '',
    //    //    coreUnitCost: '',
    //    //    oem: '',
    //    //    memo: '',
    //    //    conditionList: this.allconditioninfo,
    //    //    //siteList: this.allSites,
    //    //    //wareHouseList: this.allWareHouses,
    //    //    //locationlist: this.allLocations,
    //    //    //shelflist: this.allShelfs,
    //    //    //binList: this.allBins,
    //    //    manfacturerList: this.allManufacturerInfo,
    //    //    timeLifeCyclesId: '',


    //    //};
    //    //return stockLineDefObj;
    //}


    //restrictedQuantitytoReceive(partList, restrictedQtyReceiveValue)
    //{
    //    if (restrictedQtyReceiveValue > 1) {
    //        let quantity = partList["stocklineListObj"].length;
    //        partList["stocklineListObj"] = [];
    //        for (let i = 0; i < restrictedQtyReceiveValue; i++) {
    //            partList["stocklineListObj"].push(this.loadDefualtObj());
    //            partList["stocklineListObj"][i].quantityToReceive = 1;
    //        }
    //    }
    //}

    ////passing Value of Object and Qty to receive Value for Show Data of Details of Part
    //changeQuantityToReceive(partList, qtyReceiveValue)
    //{
    //    let quantity = partList["stocklineListObj"][0].quantityToReceive;
    //    partList["stocklineListObj"] = [];
    //    for (let i = 0; i < qtyReceiveValue; i++) {
    //        partList["stocklineListObj"].push(this.loadDefualtObj());
    //        partList["stocklineListObj"][0].quantityToReceive = quantity;
    //    }
    //}

    //private loadConditionData()
    //{
    //    this.conditionService.getConditionList().subscribe(data => {
    //        this.allconditioninfo = data[0];
    //    })
    //}

    //private loadSiteData()  //retriving SIte Information
    //{
    //    this.alertService.startLoadingMessage();
    //    this.loadingIndicator = true;

    //    this.siteService.getSiteList().subscribe(  
    //        results => this.onSaiteDataLoadSuccessful(results[0]),
    //        error => this.onDataLoadFailed(error)
    //    );
    //}

    //private onSaiteDataLoadSuccessful(getSiteList: Site[]) { //Storing Site Data
    //    this.alertService.stopLoadingMessage();
    //    this.loadingIndicator = false;
    //    //this.dataSource.data = getSiteList; //need
    //    this.allSites = getSiteList; //Contain first array of Loaded table Data will put in Html as [value]
    //}

    ////private onDataLoadWareHouse(getWarehousList: any) { //Storing WareHouse Data

    ////    this.alertService.stopLoadingMessage();
    ////    this.loadingIndicator = false;
    ////    this.allWareHouses = getWarehousList; //cha
    ////    //this.warehouseId = this.allWareHouses.warehouseId;

    ////}

    //loadManufacturerData()
    //{
    //    this.alertService.startLoadingMessage();
    //    this.loadingIndicator = true;
    //    this.manufacturerService.getWorkFlows().subscribe(
    //        results => this.onmanufacturerSuccessful(results[0]),
    //        error => this.onDataLoadFailed(error)
    //    );
    //}
    //private onmanufacturerSuccessful(allWorkFlows: any[]) {

    //    this.alertService.stopLoadingMessage();
    //    this.loadingIndicator = false;
    //    this.allManufacturerInfo = allWorkFlows;
    //}

    ////Details of part for Stockline Code Start

    //DetailsPartBUList(obj) {
    //    obj.managementStructureEntityId = obj.companyId; //Saving Management Structure Id if there Company Id

    //    this.bulist = [];
    //    this.departmentList = [];
    //    this.divisionlist = [];
    //    for (let i = 0; i < this.allManagemtninfo.length; i++) {
    //        if (this.allManagemtninfo[i].parentId == obj.companyId) {
    //            this.bulist.push(this.allManagemtninfo[i]);
    //        }
    //    }
    //}

    //DetailsPartDepartmentlist(obj) {
    //    obj.managementStructureEntityId = obj.businessUnitId;

    //    this.departmentList = [];
    //    this.divisionlist = [];
    //    for (let i = 0; i < this.allManagemtninfo.length; i++) {
    //        if (this.allManagemtninfo[i].parentId == obj.businessUnitId) {
    //            this.departmentList.push(this.allManagemtninfo[i]);
    //        }
    //    }
    //    console.log(this.departmentList);
    //}

    //DetailsPartDivisionlist(obj) {
    //    obj.managementStructureEntityId = obj.departmentId;

    //    this.divisionlist = [];
    //    for (let i = 0; i < this.allManagemtninfo.length; i++) {
    //        if (this.allManagemtninfo[i].parentId == obj.departmentId) {
    //            this.divisionlist.push(this.allManagemtninfo[i]);
    //        }
    //    }
    //}

    //DetailsPartgetDivisionChangeManagementCode(obj) {
    //    obj.managementStructureEntityId = obj.divisionId;
    //}

    //siteValueChange(data) //Site Valu Selection in Form
    //{
    //    data.allWareHouses = [];
    //    data.allLocations = [];
    //    data.allShelfs = [];
    //    data.allBins = [];

    //    data.warehouseId = 0
    //    data.locationId = 0;
    //    data.shelfId = 0;
    //    data.binId = 0;

    //    this.binservice.getWareHouseDate(data.siteId).subscribe(warehousedata => {
    //        data.allWareHouses = warehousedata;
    //    })
    //}

    //wareHouseValueChange(data) {

    //    data.allLocations = [];
    //    data.allShelfs = [];
    //    data.allBins = [];

    //    data.locationId = 0;
    //    data.shelfId = 0;
    //    data.binId = 0;

    //    this.binservice.getLocationDate(data.warehouseId).subscribe(locationdata => { data.allLocations = locationdata })
    //}

    //locationValueChange(data) {
    //    data.allShelfs = [];
    //    data.allBins = [];

    //    data.shelfId = 0;
    //    data.binId = 0;

    //    this.binservice.getShelfDate(data.locationId).subscribe(shelfdata => { data.allShelfs = shelfdata })

    //}

    //shelfValueChange(data) {
    //    data.allBins = [];

    //    data.binId = 0;

    //    this.binservice.getBinDataById(data.shelfId).subscribe(bindata => { data.allBins = bindata })
    //}

    //private customerListForStockline() {
    //    this.alertService.startLoadingMessage();
    //    this.loadingIndicator = true;

    //    this.customerService.getWorkFlows().subscribe(
    //        results => this.onCustomerDataLoadSuccessful(results[0]),
    //        error => this.onDataLoadFailed(error)
    //    );
    //}

    //private onCustomerDataLoadSuccessful(allCustomerFlows: any[]) {
    //    this.alertService.stopLoadingMessage();
    //    this.loadingIndicator = false;
    //    this.allCustomersForStockline = allCustomerFlows;

    //}

    //private vendorListForStockline() {
    //    this.alertService.startLoadingMessage();
    //    this.loadingIndicator = true;
    //    this.vendorService.getVendorList().subscribe(
    //        results => this.onVendorDataLoadSuccessful(results[0]),
    //        error => this.onDataLoadFailed(error)
    //    );
    //}
    //private onVendorDataLoadSuccessful(allVendorWorkFlows: any[]) {
    //    //debugger;
    //    this.alertService.stopLoadingMessage();
    //    this.loadingIndicator = false;
    //    this.allVendorListForStockline = allVendorWorkFlows;
    //}

    //sameDetailsforAllParts(partList)
    //{
    //    let orderQuantity = 1;
    //    let someArray = [];
    //    someArray = partList["stocklineListObj"][0];
    //    partList["stocklineListObj"] = [];
    //    partList["stocklineListObj"].push(someArray);

    //}

    //saveStockline(partList)
    //{
    //    debugger;
    //    if ((partList["isSerialized"] == true))
    //    {
    //        let sourceTimeLife: any = {};
    //        for (let i = 0; i < partList["stocklineListObj"].length; i++)
    //        {
    //            sourceTimeLife.cyclesSinceNew = partList["stocklineListObj"][i].cyclesSinceNew;
    //            sourceTimeLife.cyclesSinceOVH = partList["stocklineListObj"][i].cyclesSinceOVH;
    //            sourceTimeLife.cyclesSinceRepair = partList["stocklineListObj"][i].cyclesSinceRepair;
    //            sourceTimeLife.cyclesSinceInspection = partList["stocklineListObj"][i].cyclesSinceInspection;
    //            sourceTimeLife.timeSinceNew = partList["stocklineListObj"][i].timeSinceNew;
    //            sourceTimeLife.timeSinceOVH = partList["stocklineListObj"][i].timeSinceOVH;
    //            sourceTimeLife.timeSinceRepair = partList["stocklineListObj"][i].timeSinceRepair;
    //            sourceTimeLife.timeSinceInspection = partList["stocklineListObj"][i].timeSinceInspection;
    //            sourceTimeLife.lastSinceNew = partList["stocklineListObj"][i].lastSinceNew;
    //            sourceTimeLife.lastSinceOVH = partList["stocklineListObj"][i].lastSinceOVH;
    //            sourceTimeLife.lastSinceInspection = partList["stocklineListObj"][i].lastSinceInspection;
    //            this.stocklineService.newStockLineTimeLife(sourceTimeLife).subscribe(data => {
    //                //this.collectionofstockLineTimeLife = data;
    //                partList["stocklineListObj"][i].timeLifeCyclesId = data.timeLifeCyclesId;
    //                if (data != null) {

    //                    delete partList["stocklineListObj"][i].conditionList;
    //                    delete partList["stocklineListObj"][i].manfacturerList;
    //                    delete partList["stocklineListObj"][i].siteList;
    //                    partList["stocklineListObj"][i].itemMasterId = partList["itemMasterId"];
    //                    partList["stocklineListObj"][i].purchaseOrderId = partList["purchaseOrderId"];
    //                    partList["stocklineListObj"][i].partNumber = partList["partNumber"];
    //                    partList["stocklineListObj"][i].isSerialized = partList["isSerialized"];
    //                    //partList["stocklineListObj"][i].timeLifeCyclesId = this.sourceStockLineSetup.timeLifeCyclesId;
    //                    partList["stocklineListObj"][i].quantity = partList["quantityOrdered"];
    //                    partList["stocklineListObj"][i].orderDate = partList["createdDate"];
    //                    //partList["stocklineListObj"][i].purchaseOrderUnitCost = partList["unitCost"];
    //                    partList["stocklineListObj"][i].glAccountId = partList["glAccountId"];
    //                    //partList["stocklineListObj"][i].manufacturerId = partList["manufacturerId"];
    //                    partList["stocklineListObj"][i].isHazardousMaterial = partList["isHazardousMaterial"];
    //                    this.stocklineService.newStockLine(partList["stocklineListObj"][i]).subscribe(stocklineData => {
    //                        this.collectionofstockLine = stocklineData;
    //                        this.vendorService.receiveSaveddata.push(stocklineData);

    //                        if (stocklineData != null)
    //                        {
    //                            let partStockline: any = {};

    //                            partStockline.purchaseOrderPartId = stocklineData.purchaseOrderId;
    //                            partStockline.stockLineId = stocklineData.stockLineId;
    //                            debugger;
    //                            this.receivingService.addPartStocklineMapper(partStockline).subscribe(data => {
    //                                this.collectionofstockLine = data;
    //                            })
    //                        }

    //                    })
    //                }
    //            })
    //        }
    //    }
    //    else
    //    {
    //        for (let i = 0; i < partList["stocklineListObj"].length; i++)
    //        {
    //            delete partList["stocklineListObj"][i].conditionList;
    //            delete partList["stocklineListObj"][i].manfacturerList;
    //            delete partList["stocklineListObj"][i].siteList;
    //            partList["stocklineListObj"][i].itemMasterId = partList["itemMasterId"];
    //            partList["stocklineListObj"][i].purchaseOrderId = partList["purchaseOrderId"];
    //            partList["stocklineListObj"][i].partNumber = partList["partNumber"];
    //            partList["stocklineListObj"][i].isSerialized = partList["isSerialized"];
    //            partList["stocklineListObj"][i].quantity = partList["quantityOrdered"];
    //            partList["stocklineListObj"][i].orderDate = partList["createdDate"];
    //            //partList["stocklineListObj"][i].purchaseOrderUnitCost = partList["unitCost"];
    //            partList["stocklineListObj"][i].glAccountId = partList["glAccountId"];
    //            //partList["stocklineListObj"][i].manufacturerId = partList["manufacturerId"];
    //            partList["stocklineListObj"][i].isHazardousMaterial = partList["isHazardousMaterial"];
    //            this.stocklineService.newStockLine(partList["stocklineListObj"][i]).subscribe(data => {
    //                this.collectionofstockLine = data;
    //                this.vendorService.receiveSaveddata.push(data);
    //            })
    //        }

    //    }
    //}

    //saveReceivePurchaseOrder()
    //{
    //    //this.purchaseOrderData.createdBy = this.userName;
    //   // this.purchaseOrderData.updatedBy = this.userName;
    //    this.vendorservice.savePurchaseorder(this.purchaseOrderData).subscribe(purchaseOrderdata => {
    //        this.purchaseOrderdata = purchaseOrderdata;
    //        {
    //            this.route.navigateByUrl('/receivingmodule/receivingpages/app-edit-po');

    //        }
    //    });

    //}

    isDisabledTLboxes: boolean = false;
    onChangeTimeLife() {
        this.isDisabledTLboxes = !this.isDisabledTLboxes;
    }

    onSubmitToReceive() {
        return this.route.navigate(['/receivingmodule/receivingpages/app-edit-po']);
    }

    obtainfromcustomer: boolean = false;
    obtainfromother: boolean = false;
    obtainfromvendor: boolean = false;

    ownercustomer: boolean = false;
    ownerother: boolean = false;
    ownervendor: boolean = false;

    traceabletocustomer: boolean = false;
    traceabletoother: boolean = false;
    traceabletovendor: boolean = false;

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


}

