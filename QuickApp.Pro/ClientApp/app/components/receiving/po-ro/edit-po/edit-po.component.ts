import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../../services/vendor.service';
import { ConditionService } from '../../../../services/condition.service';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { ManufacturerService } from '../../../../services/manufacturer.service';
import { BinService } from '../../../../services/bin.service';
import { SiteService } from '../../../../services/site.service';
import { PriorityService } from '../../../../services/priority.service';
import { ReceivingService } from '../../../../services/receiving/receiving.service';
import { PurchaseOrder, DropDownData, PurchaseOrderPart, StockLine, ReceiveParts } from '../receivng-po/PurchaseOrder.model';
import { MessageSeverity, AlertService } from '../../../../services/alert.service';
import { ManagementStructure } from '../receivng-po/managementstructure.model';
import { UnitOfMeasureService } from '../../../../services/unitofmeasure.service';
import { GlAccountService } from '../../../../services/glAccount/glAccount.service';
import { GlAccount } from '../../../../models/GlAccount.model';
import { ShippingService } from '../../../../services/shipping/shipping-service';
import { CommonService } from '../../../../services/common.service';

@Component({
    selector: 'app-edit-po',
    templateUrl: './edit-po.component.html',
    styleUrls: ['./edit-po.component.scss']
})
/** edit-po component*/
export class EditPoComponent implements OnInit {
    localPoData: any;
    editPoData: any;
    allSites: any[];
    allManufacturerInfo: any[] = [];
    partList: any;
    managementInfo: any[] = [];
    allconditioninfo: any[] = [];
    localData: any[] = [];
    partBulist: any[] = [];
    partDepartmentList: any[] = [];
    partDivisionlist: any[] = [];
    allPriorityInfo: any[] = [];
    toggle_epo_header: boolean = false;
    obtainfromcustomer: boolean = false;
    obtainfromother: boolean = false;
    obtainfromvendor: boolean = false;
    ownercustomer: boolean = false;
    ownerother: boolean = false;
    ownervendor: boolean = false;
    traceabletocustomer: boolean = false;
    traceabletoother: boolean = false;
    traceabletovendor: boolean = false;
    rpoEditPF: boolean = true; //remove once add dynamic content
    rpoEditCF: boolean = true; //remove once add dynamic content
    memoNotes: string;
    purchaseOrderData: any = {};
    pageTitle: string = 'Edit Receieve PO';
    poStatus: DropDownData[];
    poUserType: DropDownData[];
    managementStructure: ManagementStructure[];
    ConditionList: DropDownData[] = [];
    managementStructureHierarchy: ManagementStructure[][] = [];
    selectedManagementStructure: ManagementStructure[] = [];
    UOMList: any[];
    ManufacturerList: DropDownData[] = [];
    SiteList: any[];
    GLAccountList: GlAccount[];
    currentDate: Date;
    ShippingViaList: DropDownData[];
    purchaseOrderId: number;
    purchaseOrderHeaderData: any;
    headerManagementStructure: any = {};

    /** edit-po ctor */
    constructor(public receivingService: ReceivingService,
        public priority: PriorityService,
        private vendorService: VendorService,
        public conditionService: ConditionService,
        public siteService: SiteService,
        public binservice: BinService,
        public legalEntityService: LegalEntityService,
        public manufacturerService: ManufacturerService,
        public route: Router,
        private alertService: AlertService,
        private uomService: UnitOfMeasureService,
        private glAccountService: GlAccountService,
        private shippingService: ShippingService,
        private _actRoute: ActivatedRoute,
        private commonService : CommonService,
    ) {

        this.localPoData = this.vendorService.selectedPoCollection;
        this.editPoData = this.localData[0];
        this.currentDate = new Date();
    }

    ngOnInit() {
        this.receivingService.purchaseOrderId = this._actRoute.snapshot.queryParams['purchaseorderid'];
        if (this.receivingService.purchaseOrderId == undefined && this.receivingService.purchaseOrderId == null) {
            this.alertService.showMessage(this.pageTitle, "No purchase order is selected to edit.", MessageSeverity.error);
            return this.route.navigate(['/receivingmodule/receivingpages/app-purchase-order']);
        }

        this.receivingService.getReceivingPOHeaderById(this.receivingService.purchaseOrderId).subscribe(
            res => {
                this.purchaseOrderData = res;
                this.purchaseOrderData.openDate = this.purchaseOrderData.openDate ? new Date(this.purchaseOrderData.openDate) : '';
                this.purchaseOrderData.closedDate = this.purchaseOrderData.closedDate ? new Date(this.purchaseOrderData.closedDate) : '';
                this.purchaseOrderData.dateApproved = this.purchaseOrderData.dateApproved ? new Date(this.purchaseOrderData.dateApproved) : '';
                this.purchaseOrderData.needByDate = this.purchaseOrderData.needByDate ? new Date(this.purchaseOrderData.needByDate) : '';
                this.getManagementStructureCodes(this.purchaseOrderData.managementStructureId);

            },
            error => { }
        );

        this.receivingService.getPurchaseOrderDataForEditById(this.receivingService.purchaseOrderId).subscribe(
            results => {
                if (results[0] == null || results[0] == undefined) {
                    this.alertService.showMessage(this.pageTitle, "No purchase order is selected to edit.", MessageSeverity.error);
                    return this.route.navigate(['/receivingmodule/receivingpages/app-purchase-order']);
                }
                this.purchaseOrderId = results[0][0].purchaseOrderId;
                this.purchaseOrderData.purchaseOderPart = results[0];
                
                this.getManagementStructure().subscribe(
                    results => {
                        this.managementStructure = results[0];
                        var allParentParts = this.purchaseOrderData.purchaseOderPart.filter(x => x.isParent == true);
                        for (let parent of allParentParts) {
                            var splitParts = this.purchaseOrderData.purchaseOderPart.filter(x => !x.isParent && x.itemMaster.partNumber == parent.itemMaster.partNumber);

                            if (splitParts.length > 0) {

                                parent.hasChildren = true;
                                parent.quantityOrdered = 0;
                                for (let childPart of splitParts) {
                                    parent.stockLineCount += childPart.stockLineCount;
                                    childPart.managementStructureId = parent.managementStructureId;
                                    childPart.managementStructureName = parent.managementStructureName;
                                    parent.quantityOrdered += childPart.quantityOrdered;
                                }
                            }
                            else {
                                parent.hasChildren = false;
                            }
                        }


                        for (let part of this.purchaseOrderData.purchaseOderPart) {
                            part.isEnabled = false;
                            part.conditionId = 0;
                            let managementHierarchy: ManagementStructure[][] = [];
                            let selectedManagementStructure: ManagementStructure[] = [];
                            this.getManagementStructureHierarchy(part.managementStructureId, managementHierarchy, selectedManagementStructure);
                            managementHierarchy.reverse();
                            selectedManagementStructure.reverse();

                            if (managementHierarchy[0] != undefined && managementHierarchy[0].length > 0) {
                                part.companyId = selectedManagementStructure[0].managementStructureId;
                                part.CompanyList = [];
                                for (let managementStruct of managementHierarchy[0]) {
                                    var dropdown = new DropDownData();
                                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                                    dropdown.Value = managementStruct.code;
                                    part.CompanyList.push(dropdown);
                                }
                            }
                            if (managementHierarchy[1] != undefined && managementHierarchy[1].length > 0) {
                                part.businessUnitId = selectedManagementStructure[1].managementStructureId;
                                part.BusinessUnitList = [];
                                for (let managementStruct of managementHierarchy[1]) {
                                    var dropdown = new DropDownData();
                                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                                    dropdown.Value = managementStruct.code;
                                    part.BusinessUnitList.push(dropdown);
                                }
                            }
                            if (managementHierarchy[2] != undefined && managementHierarchy[2].length > 0) {
                                part.divisionId = selectedManagementStructure[2].managementStructureId;
                                part.DivisionList = [];
                                for (let managementStruct of managementHierarchy[2]) {
                                    var dropdown = new DropDownData();
                                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                                    dropdown.Value = managementStruct.code;
                                    part.DivisionList.push(dropdown);
                                }
                            }
                            if (managementHierarchy[3] != undefined && managementHierarchy[3].length > 0) {
                                part.departmentId = selectedManagementStructure[3].managementStructureId;
                                part.DepartmentList = [];
                                for (let managementStruct of managementHierarchy[3]) {
                                    var dropdown = new DropDownData();
                                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                                    dropdown.Value = managementStruct.code;
                                    part.DepartmentList.push(dropdown);
                                }
                            }

                            if (part.stockLine != null) {
                                for (var SL of part.stockLine) {
                                    SL.isEnabled = false;
                                    let stockLinemanagementHierarchy: ManagementStructure[][] = [];
                                    let stockLineSelectedManagementStructure: ManagementStructure[] = [];
                                    this.getManagementStructureHierarchy(SL.managementStructureEntityId, stockLinemanagementHierarchy, stockLineSelectedManagementStructure);
                                    stockLinemanagementHierarchy.reverse();
                                    stockLineSelectedManagementStructure.reverse();

                                    if (stockLinemanagementHierarchy[0] != undefined && stockLinemanagementHierarchy[0].length > 0) {
                                        SL.companyId = stockLineSelectedManagementStructure[0].managementStructureId;
                                        SL.CompanyList = [];
                                        for (let managementStruct of stockLinemanagementHierarchy[0]) {
                                            var dropdown = new DropDownData();
                                            dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                                            dropdown.Value = managementStruct.code;
                                            SL.CompanyList.push(dropdown);
                                        }
                                    }
                                    if (stockLinemanagementHierarchy[1] != undefined && stockLinemanagementHierarchy[1].length > 0) {
                                        SL.businessUnitId = stockLineSelectedManagementStructure[1].managementStructureId;
                                        SL.BusinessUnitList = [];
                                        for (let managementStruct of stockLinemanagementHierarchy[1]) {
                                            var dropdown = new DropDownData();
                                            dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                                            dropdown.Value = managementStruct.code;
                                            SL.BusinessUnitList.push(dropdown);
                                        }
                                    }
                                    if (stockLinemanagementHierarchy[2] != undefined && stockLinemanagementHierarchy[2].length > 0) {
                                        SL.divisionId = stockLineSelectedManagementStructure[2].managementStructureId;
                                        SL.DivisionList = [];
                                        for (let managementStruct of stockLinemanagementHierarchy[2]) {
                                            var dropdown = new DropDownData();
                                            dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                                            dropdown.Value = managementStruct.code;
                                            SL.DivisionList.push(dropdown);
                                        }
                                    }
                                    if (stockLinemanagementHierarchy[3] != undefined && stockLinemanagementHierarchy[3].length > 0) {
                                        SL.departmentId = stockLineSelectedManagementStructure[3].managementStructureId;
                                        SL.DepartmentList = [];
                                        for (let managementStruct of stockLinemanagementHierarchy[3]) {
                                            var dropdown = new DropDownData();
                                            dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                                            dropdown.Value = managementStruct.code;
                                            SL.DepartmentList.push(dropdown);
                                        }
                                    }


                                }

                            }

                        }

                        this.purchaseOrderData.dateRequested = new Date(); //new Date(this.purchaseOrderData.dateRequested);
                        this.purchaseOrderData.dateApprovied = new Date(this.purchaseOrderData.dateApprovied);
                        this.purchaseOrderData.needByDate = new Date(); //new Date(this.purchaseOrderData.needByDate);
                        this.getManufacturers();
                        this.getStatus();
                        this.getUOMList();
                        this.getConditionList();
                        this.loadManagementdata();
                        this.loadManufacturerData();
                        this.getAllSite();
                        this.getAllGLAccount();
                        this.getShippingVia();
                    },
                    error => this.onDataLoadFailed(error)
                );
            },
            error => {
                this.alertService.showMessage(this.pageTitle, "Something went wrong while loading the Purchase Order detail", MessageSeverity.error);
                return this.route.navigate(['/receivingmodule/receivingpages/app-purchase-order']);
            }
        );



        this.localData = [
            { partNumber: 'PN123' }
        ]
    }

    private getManagementStructure() {
        return this.legalEntityService.getManagemententity();
    }

    private getUOMList() {
        this.uomService.getUnitOfMeasureList().subscribe(
            result => {
                this.UOMList = result[0];
                for (var part of this.purchaseOrderData.purchaseOderPart) {
                    var uom = this.UOMList.filter(x => x.unitOfMeasureId == part.uomId)[0];
                    if (uom != undefined) {
                        part.UOMText = uom.shortName;
                    }
                }
            }
        );
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

    private getConditionList(): void {
        this.conditionService.getConditionList().subscribe(
            results => {
                for (let condition of results[0]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = condition.conditionId.toLocaleString();
                    dropdown.Value = condition.description;
                    this.ConditionList.push(dropdown);
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    private getStatus() {
        this.poStatus = [];
        this.poStatus.push(<DropDownData>{ Key: '1', Value: 'Open' });
        this.poStatus.push(<DropDownData>{ Key: '2', Value: 'Pending' });
        this.poStatus.push(<DropDownData>{ Key: '3', Value: 'Fulfilling' });
        this.poStatus.push(<DropDownData>{ Key: '4', Value: 'Closed' });

        this.poUserType = [];
        this.poUserType.push(<DropDownData>{ Key: '1', Value: 'Customer' });
        this.poUserType.push(<DropDownData>{ Key: '2', Value: 'Vendor' });
        this.poUserType.push(<DropDownData>{ Key: '3', Value: 'Company' });
    }

    private loadManagementdata() {
        this.legalEntityService.getManagemententity().subscribe(data => {
            this.managementInfo = data[0]
        });
    }

    private getPartBusinessUnitList(part: PurchaseOrderPart): void {
        part.managementStructureId = part.companyId;
        var businessUnits = this.managementStructure.filter(function (management) {
            return management.parentId == part.companyId;
        });

        part.BusinessUnitList = [];
        part.DivisionList = [];
        part.DepartmentList = [];
        part.businessUnitId = 0;
        part.divisionId = 0;
        part.departmentId = 0;

        for (let businessUnit of businessUnits) {
            var dropdown = new DropDownData();
            dropdown.Key = businessUnit.managementStructureId.toLocaleString();
            dropdown.Value = businessUnit.code;
            part.BusinessUnitList.push(dropdown);
        }
    }

    private getPartDivision(part: PurchaseOrderPart): void {
        if (part.businessUnitId != undefined && part.businessUnitId > 0) {
            part.managementStructureId = part.businessUnitId;
        }
        else {
            part.managementStructureId = part.companyId;
        }

        var divisions = this.managementStructure.filter(function (management) {
            return management.parentId == part.businessUnitId;
        });

        part.DivisionList = [];
        part.DepartmentList = [];
        part.divisionId = 0;
        part.departmentId = 0;

        for (let division of divisions) {
            var dropdown = new DropDownData();
            dropdown.Key = division.managementStructureId.toLocaleString();
            dropdown.Value = division.code;
            part.DivisionList.push(dropdown);
        }
    }

    private getPartDepartment(part: PurchaseOrderPart): void {

        if (part.divisionId != undefined && part.divisionId > 0) {
            part.managementStructureId = part.divisionId;
        }
        else {
            part.managementStructureId = part.businessUnitId;
        }

        var departments = this.managementStructure.filter(function (management) {
            return management.parentId == part.divisionId;
        });

        part.DepartmentList = [];
        part.departmentId = 0;
        for (let deparment of departments) {
            var dropdown = new DropDownData();
            dropdown.Key = deparment.managementStructureId.toLocaleString();
            dropdown.Value = deparment.code;
            part.DepartmentList.push(dropdown);
        }
    }

    private setPartDepartmentManagementStructureId(part: PurchaseOrderPart) {
        if (part.departmentId != undefined && part.departmentId > 0) {
            part.managementStructureId = part.departmentId;
        }
        else {
            part.managementStructureId = part.divisionId;
        }
    }

    private getStockLineBusinessUnitList(SL: StockLine): void {
        SL.managementStructureEntityId = SL.companyId;
        var businessUnits = this.managementStructure.filter(function (management) {
            return management.parentId == SL.companyId;
        });

        SL.BusinessUnitList = [];
        SL.DivisionList = [];
        SL.DepartmentList = [];
        SL.businessUnitId = 0;
        SL.divisionId = 0;
        SL.departmentId = 0;

        for (let businessUnit of businessUnits) {
            var dropdown = new DropDownData();
            dropdown.Key = businessUnit.managementStructureId.toLocaleString();
            dropdown.Value = businessUnit.code;
            SL.BusinessUnitList.push(dropdown);
        }
    }

    private getStockLineDivision(SL: StockLine): void {
        if (SL.businessUnitId != undefined && SL.businessUnitId > 0) {
            SL.managementStructureEntityId = SL.businessUnitId;
        }
        else {
            SL.managementStructureEntityId = SL.companyId;
        }

        var divisions = this.managementStructure.filter(function (management) {
            return management.parentId == SL.businessUnitId;
        });

        SL.DivisionList = [];
        SL.DepartmentList = [];
        SL.divisionId = 0;
        SL.departmentId = 0;

        for (let division of divisions) {
            var dropdown = new DropDownData();
            dropdown.Key = division.managementStructureId.toLocaleString();
            dropdown.Value = division.code;
            SL.DivisionList.push(dropdown);
        }
    }

    private getStockLineDepartment(SL: StockLine): void {

        if (SL.divisionId != undefined && SL.divisionId > 0) {
            SL.managementStructureEntityId = SL.divisionId;
        }
        else {
            SL.managementStructureEntityId = SL.businessUnitId;
        }

        var departments = this.managementStructure.filter(function (management) {
            return management.parentId == SL.divisionId;
        });

        SL.DepartmentList = [];
        SL.departmentId = 0;
        for (let deparment of departments) {
            var dropdown = new DropDownData();
            dropdown.Key = deparment.managementStructureId.toLocaleString();
            dropdown.Value = deparment.code;
            SL.DepartmentList.push(dropdown);
        }
    }

    private setStockLineDepartmentManagementStructureId(SL: StockLine) {
        if (SL.departmentId != undefined && SL.departmentId > 0) {
            SL.managementStructureEntityId = SL.departmentId;
        }
        else {
            SL.managementStructureEntityId = SL.divisionId;
        }
    }

    private getAllSite(): void {
        this.siteService.getSiteList().subscribe(
            results => {
                this.SiteList = results[0];
                for (var part of this.purchaseOrderData.purchaseOderPart) {
                    if (part.stockLine) {
                        part.siteId = 0;
                        part.warehouseId = 0;
                        part.locationId = 0;
                        part.shelfId = 0;
                        part.binId = 0;
                        part.SiteList = [];
                        for (var site of results[0]) {
                            var row = new DropDownData();
                            row.Key = site.siteId.toLocaleString();
                            row.Value = site.name;
                            part.SiteList.push(row);
                        }

                        for (var SL of part.stockLine) {
                            SL.SiteList = [];

                            for (var site of results[0]) {
                                var row = new DropDownData();
                                row.Key = site.siteId.toLocaleString();
                                row.Value = site.name;
                                SL.SiteList.push(row);
                            }

                            if (SL.siteId > 0) {
                                this.getStockLineWareHouse(SL, true);
                            }
                            if (SL.warehouseId > 0) {
                                this.getStockLineLocation(SL, true);
                            }
                            if (SL.locationId > 0) {
                                this.getStockLineShelf(SL, true);
                            }
                            if (SL.shelfId > 0) {
                                this.getStockLineBin(SL, true);
                            }
                        }
                    }
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    private getStockLineSite(stockLine: StockLine, onPageLoad: boolean): void {
        stockLine.SiteList = [];
        stockLine.WareHouseList = [];
        stockLine.LocationList = [];
        stockLine.ShelfList = [];
        stockLine.BinList = [];

        if (!onPageLoad) {
            stockLine.siteId = 0;
            stockLine.warehouseId = 0;
            stockLine.locationId = 0;
            stockLine.shelfId = 0;
            stockLine.binId = 0;
        }

        for (let site of this.SiteList) {
            var dropdown = new DropDownData();
            dropdown.Key = site.siteId.toLocaleString();
            dropdown.Value = site.name;
            stockLine.SiteList.push(dropdown);
        }
    }

    private getStockLineWareHouse(stockLine: StockLine, onPageLoad: boolean): void {
        stockLine.WareHouseList = [];
        stockLine.LocationList = [];
        stockLine.ShelfList = [];
        stockLine.BinList = [];

        if (!onPageLoad) {
            stockLine.warehouseId = 0;
            stockLine.locationId = 0;
            stockLine.shelfId = 0;
            stockLine.binId = 0;
        }

        this.binservice.getWareHouseBySiteId(stockLine.siteId).subscribe(
            results => {
                for (let wareHouse of results) {
                    var dropdown = new DropDownData();
                    dropdown.Key = wareHouse.warehouseId.toLocaleString();
                    dropdown.Value = wareHouse.warehouseName;
                    stockLine.WareHouseList.push(dropdown);
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    private getStockLineLocation(stockLine: StockLine, onPageLoad: boolean): void {
        stockLine.LocationList = [];
        stockLine.ShelfList = [];
        stockLine.BinList = [];

        if (!onPageLoad) {
            stockLine.locationId = 0;
            stockLine.shelfId = 0;
            stockLine.binId = 0;
        }

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

    private getStockLineShelf(stockLine: StockLine, onPageLoad: boolean): void {
        stockLine.ShelfList = [];
        stockLine.BinList = [];

        if (!onPageLoad) {
            stockLine.shelfId = 0;
            stockLine.binId = 0;
        }

        this.binservice.getShelfByLocationId(stockLine.locationId).subscribe(
            results => {

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

    private getPartWareHouse(part: PurchaseOrderPart): void {
        part.WareHouseList = [];
        part.LocationList = [];
        part.ShelfList = [];
        part.BinList = [];

        part.warehouseId = 0;
        part.locationId = 0;
        part.shelfId = 0;
        part.binId = 0;

        if (part.stockLine) {
            for (var SL of part.stockLine) {
                SL.siteId = part.siteId;
                SL.warehouseId = 0;
                SL.locationId = 0;
                SL.shelfId = 0;
                SL.binId = 0;

                SL.WareHouseList = [];
                SL.LocationList = [];
                SL.ShelfList = [];
                SL.BinList = [];
            }
        }

        this.binservice.getWareHouseBySiteId(part.siteId).subscribe(
            results => {
                for (let wareHouse of results) {
                    var dropdown = new DropDownData();
                    dropdown.Key = wareHouse.warehouseId.toLocaleString();
                    dropdown.Value = wareHouse.warehouseName;
                    part.WareHouseList.push(dropdown);

                    if (part.stockLine) {
                        for (var SL of part.stockLine) {
                            SL.WareHouseList.push(dropdown);
                        }
                    }
                }


            },
            error => this.onDataLoadFailed(error)
        );
    }

    private getPartLocation(part: PurchaseOrderPart): void {
        part.LocationList = [];
        part.ShelfList = [];
        part.BinList = [];

        part.locationId = 0;
        part.shelfId = 0;
        part.binId = 0;

        if (part.stockLine) {
            for (var SL of part.stockLine) {
                SL.warehouseId = part.warehouseId;
                SL.locationId = 0;
                SL.shelfId = 0;
                SL.binId = 0;
                SL.LocationList = [];
                SL.ShelfList = [];
                SL.BinList = [];
            }
        }

        this.binservice.getLocationByWareHouseId(part.warehouseId).subscribe(
            results => {
                for (let loc of results) {
                    var dropdown = new DropDownData();
                    dropdown.Key = loc.locationId.toLocaleString();
                    dropdown.Value = loc.name;
                    part.LocationList.push(dropdown);

                    if (part.stockLine) {
                        for (var SL of part.stockLine) {
                            SL.LocationList.push(dropdown);
                        }
                    }
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    private getPartShelf(part: PurchaseOrderPart): void {
        part.ShelfList = [];
        part.BinList = [];

        part.shelfId = 0;
        part.binId = 0;

        if (part.stockLine) {
            for (var SL of part.stockLine) {
                SL.locationId = part.locationId;
                SL.shelfId = 0;
                SL.binId = 0;

                SL.ShelfList = [];
                SL.BinList = [];
            }
        }

        this.binservice.getShelfByLocationId(part.locationId).subscribe(
            results => {
                for (let shelf of results) {
                    var dropdown = new DropDownData();
                    dropdown.Key = shelf.shelfId.toLocaleString();
                    dropdown.Value = shelf.name;
                    part.ShelfList.push(dropdown);

                    if (part.stockLine) {
                        for (var SL of part.stockLine) {
                            SL.ShelfList.push(dropdown);
                        }
                    }
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    private getPartBin(part: PurchaseOrderPart): void {
        part.BinList = [];
        part.binId = 0;

        if (part.stockLine) {
            for (var SL of part.stockLine) {
                SL.shelfId = part.shelfId;
                SL.binId = 0;
                SL.BinList = [];
            }
        }

        this.binservice.getBinByShelfId(part.shelfId).subscribe(
            results => {
                for (let bin of results) {
                    var dropdown = new DropDownData();
                    dropdown.Key = bin.binId.toLocaleString();
                    dropdown.Value = bin.name;
                    part.BinList.push(dropdown);
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    private setPartBinIdToStockline(part: PurchaseOrderPart): void {
        if (part.stockLine) {
            for (var SL of part.stockLine) {
                SL.binId = part.binId;
            }
        }
    }

    private conditionChange(part: PurchaseOrderPart) {
        if (part.stockLine) {
            for (var SL of part.stockLine) {
                SL.conditionId = part.conditionId;
            }
        }

    }

    private getStockLineBin(stockLine: StockLine, onPageLoad: boolean): void {
        stockLine.BinList = [];

        if (!onPageLoad) {
            stockLine.binId = 0;
        }

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

    private getAllGLAccount(): void {
        this.glAccountService.getAll().subscribe(glAccountData => {
            this.GLAccountList = glAccountData[0];

            for (var part of this.purchaseOrderData.purchaseOderPart) {
                if (part.stockLine) {
                    for (var SL of part.stockLine) {
                        if (SL.glAccountId > 0) {
                            var glAccount = this.GLAccountList.filter(x => x.glAccountId == SL.glAccountId)[0];
                            SL.glAccountText = glAccount.accountCode + " (" + glAccount.accountDescription + ")";
                        }
                    }
                }
            }

        });
    }

    calculateExtendedCost(part: any, stockLine: any): void {
        if (stockLine.purchaseOrderUnitCost == undefined || stockLine.purchaseOrderUnitCost == '') {
            return;
        }
        if (part.itemMaster.isSerialized) {
            stockLine.purchaseOrderExtendedCost = stockLine.purchaseOrderUnitCost;
        }
        else {
            stockLine.purchaseOrderExtendedCost = stockLine.purchaseOrderUnitCost * part.quantityActuallyReceived;
        }
    }

    calculatePartExtendedCost(part: any): void {
        if (part.unitCost == undefined || part.unitCost == '') {
            return;
        }
        if (part.itemMaster.isSerialized) {
            part.extendedCost = part.unitCost;
        }
        else {
            part.extendedCost = part.unitCost * part.quantityActuallyReceived;
        }

        if (part.stockLine) {
            for (var SL of part.stockLine) {
                SL.purchaseOrderUnitCost = part.unitCost;
                SL.purchaseOrderExtendedCost = part.extendedCost;
            }
        }
    }

    private loadManufacturerData() {

        this.manufacturerService.getWorkFlows().subscribe(data => {
            this.allManufacturerInfo = data[0];
        });
    }

    private onDataLoadFailed(error: any) {
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

    //remove once add dynamic content
    editPart(part: PurchaseOrderPart) {
        part.isEnabled = !part.isEnabled;
        if (part.stockLine) {
            for (var sl of part.stockLine) {
                sl.isEnabled = part.isEnabled;
                sl.quantityRejected = 0;
            }
        }
    }

    editStockLine(stockLine: StockLine) {
        stockLine.isEnabled = !stockLine.isEnabled;
        stockLine.quantityRejected = 0;
    }

    updateStockLine() {
        let receiveParts: ReceiveParts[] = [];

        for (var part of this.purchaseOrderData.purchaseOderPart) {
            if (part.stockLine) {

                var timeLife = [];
                var stockLineToUpdate = part.stockLine.filter(x => x.isEnabled);
                var index = 1;
                for (var stockLine of stockLineToUpdate) {

                    if (stockLine.conditionId == undefined || stockLine.conditionId == 0) {
                        this.alertService.showMessage(this.pageTitle, "Please select Condition in Part No. " + part.itemMaster.partNumber + " at stockline " + stockLine.stockLineNumber, MessageSeverity.error);
                        return;
                    }

                    if (stockLine.siteId == undefined || stockLine.siteId == 0) {
                        this.alertService.showMessage(this.pageTitle, "Please select Site in Part No. " + part.itemMaster.partNumber + " of stockline " + stockLine.stockLineNumber, MessageSeverity.error);
                        return;
                    }

                    for (var tl of part.timeLife) {
                        if (tl.stockLineId == stockLine.stockLineId) {
                            timeLife.push(tl);
                        }
                    }
                    index +=1;
                }

                if (stockLineToUpdate.length > 0) {
                    let receivePart: ReceiveParts = new ReceiveParts();
                    receivePart.purchaseOrderPartRecordId = part.purchaseOrderPartRecordId;
                    receivePart.stockLines = stockLineToUpdate;
                    receivePart.timeLife = timeLife;
                    receiveParts.push(receivePart);
                }
            }
        }
        if (receiveParts.length > 0) {
            this.shippingService.updateStockLine(receiveParts).subscribe(data => {
                this.alertService.showMessage(this.pageTitle, 'Stock Line updated successfully.', MessageSeverity.success);
                //return this.route.navigate(['/receivingmodule/receivingpages/app-purchase-order']);
                this.route.navigateByUrl(`/receivingmodule/receivingpages/app-view-po?purchaseOrderId=${this.purchaseOrderId}`);
            },
                error => {
                    var message = '';
                    if (error.error.constructor == Array) {
                        message = error.error[0].errorMessage;
                    }
                    else {
                        message = error.error.Message;
                    }
                    this.alertService.showMessage(this.pageTitle, message, MessageSeverity.error);
                }
            );
        }
        else {
            this.alertService.showMessage(this.pageTitle, 'Please edit Stock Line to update.', MessageSeverity.info);
        }

        //this.alertService.showMessage(this.pageTitle, 'Stock Lines update successfully.', MessageSeverity.success)
        //return this.route.navigate(['/receivingmodule/receivingpages/app-view-po']);
    }

    private getShippingVia(): void {
        this.shippingService.getAllShippingVia().subscribe(results => {
            this.ShippingViaList = [];
            for (let shippingVia of results[0]) {
                var dropdown = new DropDownData();
                dropdown.Key = shippingVia.shippingViaId.toLocaleString();
                dropdown.Value = shippingVia.name;
                this.ShippingViaList.push(dropdown);
            }
        });
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

    getManagementStructureCodes(id) {
        this.commonService.getManagementStructureCodes(id).subscribe(res => {
            if (res.Level1) {
                this.headerManagementStructure.level1 = res.Level1;
            }
            if (res.Level2) {
                this.headerManagementStructure.level2 = res.Level2;
            }
            if (res.Level3) {
                this.headerManagementStructure.level3 = res.Level3;
            }
            if (res.Level4) {
                this.headerManagementStructure.level4 = res.Level4;
            }
        })
    }
}

