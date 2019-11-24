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
import { RepairOrder, RepairOrderPart, StockLine, DropDownData, TimeLife, ReceiveParts } from './RepairOrder.model';
import { ManagementStructure } from './managementstructure.model';
import { Dropdown } from 'primeng/dropdown';
import { AccountService } from '../../../../services/account.service';
import { CompanyService } from '../../../../services/company.service';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { AddressModel } from '../../../../models/address.model';
import { Warehouse } from '../../../../models/warehouse.model';
import { Bin } from '../../../../models/bin.model';
import { Shelf } from '../../../../models/shelf.model';
import { isInteger, toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { error } from '@angular/compiler/src/util';
import { Customer } from '../../../../models/customer.model';
import { GlAccountService } from '../../../../services/glAccount/glAccount.service';
import { Console } from '@angular/core/src/console';
import { ShippingService } from '../../../../services/shipping/shipping-service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-receiving-ro',
    templateUrl: './receiving-ro.component.html',
    styleUrls: ['./receiving-ro.component.scss']
})

export class ReceivingRoComponent implements OnInit {
    repairOrderData: RepairOrder;
    managementStructure: ManagementStructure[];
    roCompanyList: DropDownData[];
    roBusinessUnitList: DropDownData[];
    roDivisionList: DropDownData[];
    roDepartmentList: DropDownData[];
    roCreditTermInfo: DropDownData[];
    roPriorityInfo: DropDownData[];
    roStatus: DropDownData[] = [];
    roUserType: DropDownData[] = [];

    roSelectedCompanyId: number;
    roSelectedBusinessUnitId: number;
    roSelectedDivisionId: number;
    roSelectedDepartmentId: number;
    roPartManagementStructureList: string[];

    managementStructureHierarchy: ManagementStructure[][] = [];
    selectedManagementStructure: ManagementStructure[] = [];
    sites: Site[];

    CustomerList: DropDownData[] = [];
    VendorList: DropDownData[] = [];
    ManufacturerList: DropDownData[] = [];
    ConditionList: DropDownData[] = [];
    GLAccountList: DropDownData[] = [];
    ShippingReferenceList: DropDownData[];
    ShippingViaList: DropDownData[];
    ShippingAccountList: DropDownData[];

    ConditionId: number = 0;
    allPartGLAccountId: number;


    toggleIcon: boolean = false;
    currentSLIndex: number = 0;
    currentTLIndex: number = 0;
    currentSERIndex: number = 0;
    pageTitle: string = "Receive RO";
    isDisabledSNboxes: boolean = false;

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
        private glAccountService: GlAccountService,
        private shippingService: ShippingService
    ) {
        this.getAllSite();
        this.getCustomers();
        this.getVendors();
        this.getManufacturers();
        this.getConditionList();
        this.getAllGLAccount();
        this.getShippingReference();
        this.getShippingVia();
        this.getShippingAccount();
    }

    ngOnInit() {
        // this.receivingService.getPurchaseOrderDataById(this.receivingService.repairOrderId).subscribe(
        //     results => {
        //         this.receivingService.purchaseOrder = results[0];
        //         this.loadRepairOrderData(results[0])
        //     },
        //     error => {
        //         this.alertService.showMessage(this.pageTitle, "Something went wrong while loading the Repair Order detail", MessageSeverity.error);
        //         return this.route.navigate(['/receivingmodule/receivingpages/app-ro']);
        //     }
        // );

        this.roStatus = [];

        this.getAllCreditTerms();
        this.getAllPriority();
        this.getStatus();
    }

    private getItemMasterById(type: string, part: RepairOrderPart) {
        this.itemmaster.getItemMasterByItemMasterId(part.itemMaster.itemMasterId).subscribe(
            result => {
                if (result != undefined && result[0] != undefined) {
                    if (type == 'serialized') {
                        part.itemMaster.isSerialized = result[0].isSerialized;
                        part.serialNumber = '';
                    }
                    else {
                        part.itemMaster.isTimeLife = result[0].isTimeLife;
                        part.timeLifeList = [];

                        for (var i = 0; i < part.stocklineListObj.length; i++) {
                            let timeLife: TimeLife = new TimeLife();
                            timeLife.timeLifeCyclesId = 0;
                            timeLife.repairOrderId = part.repairOrderId;
                            timeLife.repairOrderPartRecordId = part.repairOrderPartRecordId;
                            timeLife.cyclesRemaining = '';
                            timeLife.cyclesSinceInspection = '';
                            timeLife.cyclesSinceNew = '';
                            timeLife.cyclesSinceOVH = '';
                            timeLife.cyclesSinceRepair = '';
                            timeLife.timeRemaining = '';
                            timeLife.timeSinceInspection = '';
                            timeLife.timeSinceNew = '';
                            timeLife.timeSinceOVH = '';
                            timeLife.timeSinceRepair = '';
                            timeLife.lastSinceNew = '';
                            timeLife.lastSinceInspection = '';
                            timeLife.lastSinceOVH = '';
                            timeLife.detailsNotProvided = false;
                            part.timeLifeList.push(timeLife);
                        }
                    }
                }

                if (type == 'serialized' && !result[0].isSerialized) {
                    this.alertService.showMessage(this.pageTitle, 'Serialized is not enabled', MessageSeverity.info);
                }
                if (type == 'timelife' && !result[0].isTimeLife) {
                    this.alertService.showMessage(this.pageTitle, 'Time Life is not enabled', MessageSeverity.info);
                }
            }
        )
    }

    private getShippingReference(): void {
        this.shippingService.getAllShippingReference().subscribe(results => {
            this.ShippingReferenceList = [];
            for (let shippingReference of results[0]) {
                var dropdown = new DropDownData();
                dropdown.Key = shippingReference.shippingReferenceId.toLocaleString();
                dropdown.Value = shippingReference.name;
                this.ShippingReferenceList.push(dropdown);
            }
        });
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

    private getShippingAccount(): void {
        this.shippingService.getAllShippingAccount().subscribe(results => {
            this.ShippingAccountList = [];
            for (let shippingAccount of results[0]) {
                var dropdown = new DropDownData();
                dropdown.Key = shippingAccount.shippingAccountId.toLocaleString();
                dropdown.Value = shippingAccount.accountNumber;
                this.ShippingAccountList.push(dropdown);
            }

        });
    }

    private getStatus() {
        this.roStatus = [];
        this.roStatus.push(<DropDownData>{ Key: '1', Value: 'Open' });
        this.roStatus.push(<DropDownData>{ Key: '2', Value: 'Pending' });
        this.roStatus.push(<DropDownData>{ Key: '3', Value: 'Fulfilling' });
        this.roStatus.push(<DropDownData>{ Key: '4', Value: 'Closed' });

        this.roUserType = [];
        this.roUserType.push(<DropDownData>{ Key: '1', Value: 'Customer' });
        this.roUserType.push(<DropDownData>{ Key: '2', Value: 'Vendor' });
        this.roUserType.push(<DropDownData>{ Key: '3', Value: 'Company' });
    }

    private getStatusById(statusId: string) {
        if (statusId == null)
            return 'NA';

        return this.roStatus.filter(function (status) {
            return status.Key == statusId;
        })[0].Value;
    }

    private getUserTypeById(userTypeId: string) {
        if (userTypeId == null)
            return 'NA';

        return this.roUserType.filter(function (status) {
            return status.Key == userTypeId;
        })[0].Value;
    }

    private getAddress(address: AddressModel): string {
        let addr: string = '';
        if (address != null) {
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
        }

        return addr;
    }

    private loadRepairOrderData(repairOrder: RepairOrder) {
        //if (this.receivingService.selectedPurchaseorderCollection != undefined) {
        //this.repairOrderData = this.receivingService.selectedPurchaseorderCollection;

        this.repairOrderData = repairOrder;
        // this.repairOrderData.openDate = this.repairOrderData.openDate ? new Date(this.repairOrderData.openDate) : '';
        // this.repairOrderData.closedDate = this.repairOrderData.closedDate ? new Date(this.repairOrderData.closedDate) : '';
        // //this.repairOrderData.dateRequested = new Date(); //new Date(this.repairOrderData.dateRequested);
        // this.repairOrderData.dateApproved = this.repairOrderData.dateApproved ? new Date(this.repairOrderData.dateApproved) : '';
        // this.repairOrderData.needByDate = this.repairOrderData.needByDate ? new Date(this.repairOrderData.needByDate) : '';
        // this.getManagementStructureCodes(this.repairOrderData.managementStructureId);
        this.getManagementStructure().subscribe(
            results => {
                this.managementStructureSuccess(this.repairOrderData.managementStructureId, results[0]);
                //this.repairOrderData.repairOderPart.forEach(part => {
                let parentPart: RepairOrderPart;
                var allParentParts = this.repairOrderData.repairOderPart.filter(x => x.isParent == true);
                for (let parent of allParentParts) {
                    parent.currentSLIndex = 0;
                    parent.currentTLIndex = 0;
                    parent.currentSERIndex = 0;
                    parent.isDisabledTLboxes = false;
                    
                    var splitParts = this.repairOrderData.repairOderPart.filter(x => !x.isParent && x.itemMaster.partNumber == parent.itemMaster.partNumber);

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

                for (let part of this.repairOrderData.repairOderPart) {
                    part.toggleIcon = false;
                    part.stocklineListObj = [];
                    part.timeLifeList = [];
                    part.currentSLIndex = 0;
                    part.currentTLIndex = 0;
                    part.currentSERIndex = 0;
                    part.isDisabledTLboxes = false;
                    part.visible = false;
                    part.showStockLineGrid = false;
                    part.isSameDetailsForAllParts = false;
                    let selectedOrgStruct: ManagementStructure[] = [];
                    //part.conditionId = 0;
                    part.eCCNAlreadyExist = part.itemMaster.exportECCN != null && part.itemMaster.exportECCN.length > 0;
                    part.itarNumberExist = part.itemMaster.itarNumber != null && part.itemMaster.itarNumber.length > 0;
                    part.quantityRejected = "0";
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
                this.repairOrderData.dateRequested = new Date(); //new Date(this.repairOrderData.dateRequested);
                this.repairOrderData.dateApprovied = new Date(this.repairOrderData.dateApprovied);
                this.repairOrderData.needByDate = new Date(); //new Date(this.repairOrderData.needByDate);
            },
            error => this.onDataLoadFailed(error)
        );


    }

    // getManagementStructureCodes(id) {
    //     this.commonService.getManagementStructureCodes(id).subscribe(res => {            
	// 		if (res.Level1) {
	// 			this.headerManagementStructure.level1 = res.Level1;
    //         }
    //         if (res.Level2) {
	// 			this.headerManagementStructure.level2 = res.Level2;
    //         }
    //         if (res.Level3) {
	// 			this.headerManagementStructure.level3 = res.Level3;
    //         }
    //         if (res.Level4) {
	// 			this.headerManagementStructure.level4 = res.Level4;
	// 		}
	// 	})
    // }

    private getManagementStructure() {
        return this.legalEntityService.getManagemententity();
    }
    private setStockLineManagementStructure(managementStructureId: number, stockLine: StockLine) {
        let stockLineManagementStructureHierarchy: ManagementStructure[][] = [[]];
        let stockLineSelectedManagementStructureHierarchy: ManagementStructure[] = [];

        if (this.managementStructure != undefined && this.managementStructure.length > 0) {
            stockLine.CompanyList = [];
            stockLine.BusinessUnitList = [];
            stockLine.DivisionList = [];
            stockLine.DepartmentList = [];


            this.getManagementStructureHierarchy(managementStructureId, stockLineManagementStructureHierarchy, stockLineSelectedManagementStructureHierarchy);
            stockLineManagementStructureHierarchy.reverse();
            stockLineSelectedManagementStructureHierarchy.reverse();

            if (stockLineManagementStructureHierarchy[0] != undefined && stockLineManagementStructureHierarchy[0].length > 0) {
                stockLine.companyId = stockLineSelectedManagementStructureHierarchy[0].managementStructureId;
                stockLine.managementStructureEntityId = stockLine.companyId;
                for (let managementStruct of stockLineManagementStructureHierarchy[0]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                    dropdown.Value = managementStruct.code;
                    stockLine.CompanyList.push(dropdown);
                }
            }
            if (stockLineManagementStructureHierarchy[1] != undefined && stockLineManagementStructureHierarchy[1].length > 0) {
                stockLine.businessUnitId = stockLineSelectedManagementStructureHierarchy[1].managementStructureId;
                stockLine.managementStructureEntityId = stockLine.businessUnitId;
                for (let managementStruct of stockLineManagementStructureHierarchy[1]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                    dropdown.Value = managementStruct.code;
                    stockLine.BusinessUnitList.push(dropdown);
                }
            }
            if (stockLineManagementStructureHierarchy[2] != undefined && stockLineManagementStructureHierarchy[2].length > 0) {
                stockLine.divisionId = stockLineSelectedManagementStructureHierarchy[2].managementStructureId;
                stockLine.managementStructureEntityId = stockLine.divisionId;
                for (let managementStruct of stockLineManagementStructureHierarchy[2]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                    dropdown.Value = managementStruct.code;
                    stockLine.DivisionList.push(dropdown);
                }
            }
            if (stockLineManagementStructureHierarchy[3] != undefined && stockLineManagementStructureHierarchy[3].length > 0) {
                stockLine.departmentId = stockLineSelectedManagementStructureHierarchy[3].managementStructureId;
                stockLine.managementStructureEntityId = stockLine.departmentId;
                for (let managementStruct of stockLineManagementStructureHierarchy[3]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                    dropdown.Value = managementStruct.code;
                    stockLine.DepartmentList.push(dropdown);
                }
            }

        }
    }

    private managementStructureSuccess(managementStructureId: number, managementStructure: ManagementStructure[]) {

        this.alertService.stopLoadingMessage();
        this.managementStructure = managementStructure;
        if (this.managementStructure != undefined && this.managementStructure.length > 0) {
            this.roCompanyList = [];
            this.roBusinessUnitList = [];
            this.roDivisionList = [];
            this.roDepartmentList = [];

            this.getManagementStructureHierarchy(managementStructureId, this.managementStructureHierarchy, this.selectedManagementStructure);
            this.managementStructureHierarchy.reverse();
            this.selectedManagementStructure.reverse();

            if (this.managementStructureHierarchy[0] != undefined && this.managementStructureHierarchy[0].length > 0) {
                this.roSelectedCompanyId = this.selectedManagementStructure[0].managementStructureId;
                for (let managementStruct of this.managementStructureHierarchy[0]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                    dropdown.Value = managementStruct.code;
                    this.roCompanyList.push(dropdown);
                }
            }
            if (this.managementStructureHierarchy[1] != undefined && this.managementStructureHierarchy[1].length > 0) {
                this.roSelectedBusinessUnitId = this.selectedManagementStructure[1].managementStructureId;
                for (let managementStruct of this.managementStructureHierarchy[1]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                    dropdown.Value = managementStruct.code;
                    this.roBusinessUnitList.push(dropdown);
                }
            }
            if (this.managementStructureHierarchy[2] != undefined && this.managementStructureHierarchy[2].length > 0) {
                this.roSelectedDivisionId = this.selectedManagementStructure[2].managementStructureId;
                for (let managementStruct of this.managementStructureHierarchy[2]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                    dropdown.Value = managementStruct.code;
                    this.roDivisionList.push(dropdown);
                }
            }
            if (this.managementStructureHierarchy[3] != undefined && this.managementStructureHierarchy[3].length > 0) {
                this.roSelectedDepartmentId = this.selectedManagementStructure[3].managementStructureId;
                for (let managementStruct of this.managementStructureHierarchy[3]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                    dropdown.Value = managementStruct.code;
                    this.roDepartmentList.push(dropdown);
                }
            }

        }
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

    private showSplitShipmentParts(purchaseOrderPart : RepairOrderPart): void {
        var selectedParts = this.repairOrderData.repairOderPart.filter(function (part) {
            return part.itemMasterId == purchaseOrderPart.itemMasterId;
        });

        selectedParts.forEach(part => {
            part.toggleIcon = !part.toggleIcon;  
            part.visible = !part.visible;
        });
    }

    private isSplitShipmentPart(itemMasterId: number): boolean {
        return this.repairOrderData.repairOderPart.filter(x => x.itemMaster.itemMasterId == itemMasterId && !x.isParent).length > 0;
    }

    private getAllPriority() {
        this.priorityService.getPriorityList().subscribe(
            results => {
                this.roPriorityInfo = [];
                for (let priority of results[0]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = priority.priorityId.toLocaleString();
                    dropdown.Value = priority.description;
                    this.roPriorityInfo.push(dropdown);
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    private getAllCreditTerms() {
        this.creditTermsService.getCreditTermsList().subscribe(
            results => {
                this.roCreditTermInfo = [];
                for (let creditTerm of results[0]) {
                    var dropdown = new DropDownData();
                    dropdown.Key = creditTerm.creditTermsId.toLocaleString();
                    dropdown.Value = creditTerm.name;
                    this.roCreditTermInfo.push(dropdown);
                }
            },
            error => this.onDataLoadFailed(error)
        );
    }

    private onDataLoadFailed(error: any): void {
        console.log(error);
        this.alertService.stopLoadingMessage();
    }

    private toggleStockLine(event: any, part: RepairOrderPart): void {
        if (part.showStockLineGrid) {
            this.addStockLine(part, false);
            return;
        }
        
        
        if (part.quantityActuallyReceived == undefined || part.quantityActuallyReceived == 0) {
            part.showStockLineGrid = false;
            this.alertService.showMessage(this.pageTitle, 'Please enter Quantity Received.', MessageSeverity.error);
            return;
        }

        let quantity: number = (part.quantityActuallyReceived != undefined || part.quantityActuallyReceived.toString()) != '' ? part.quantityActuallyReceived : 0;

        if ((part.itemMaster.isSerialized && part.stocklineListObj.length != quantity) ||
            (!part.itemMaster.isSerialized && part.stocklineListObj.length > 0 && part.stocklineListObj[0].quantity != quantity)) {

            part.stocklineListObj = []
            part.timeLifeList = [];
            part.isSameDetailsForAllParts = false;
            part.currentSLIndex = 0;
            part.currentTLIndex = 0;
            part.currentSERIndex = 0;
        }

        var POParts = this.repairOrderData.repairOderPart.filter(x =>
            x.itemMaster.partnumber == part.itemMaster.partnumber && x.itemMaster.isParent == false
        );

        if (POParts.length > 1) {
            if (quantity > part.quantityOrdered - part.stockLineCount) {
                this.alertService.showMessage(this.pageTitle, "Quantity receive can not be more than quantity ordered", MessageSeverity.error);
                return;
            }
        }
        else {
            if (quantity > part.quantityOrdered - part.stockLineCount) {
                this.alertService.showMessage(this.pageTitle, "Quantity receive can not be more than quantity ordered", MessageSeverity.error);
                return;
            }
        }

        part.visible = true;
        this.createStockLineItems(part);

        if (part.itemMaster.isTimeLife) {
            for (var i = 0; i < quantity; i++) {
                let timeLife: TimeLife = new TimeLife();
                timeLife.timeLifeCyclesId = 0;
                timeLife.repairOrderId = part.repairOrderId;
                timeLife.repairOrderPartRecordId = part.repairOrderPartRecordId;
                timeLife.cyclesRemaining = '';
                timeLife.cyclesSinceInspection = '';
                timeLife.cyclesSinceNew = '';
                timeLife.cyclesSinceOVH = '';
                timeLife.cyclesSinceRepair = '';
                timeLife.timeRemaining = '';
                timeLife.timeSinceInspection = '';
                timeLife.timeSinceNew = '';
                timeLife.timeSinceOVH = '';
                timeLife.timeSinceRepair = '';
                timeLife.lastSinceNew = '';
                timeLife.lastSinceInspection = '';
                timeLife.lastSinceOVH = '';
                timeLife.detailsNotProvided = false;
                part.timeLifeList.push(timeLife);
            }
        }

        this.addStockLine(part, true);
    }


    addStockLine(part: RepairOrderPart, visible?: boolean): void {
        if (visible == undefined) {
            part.showStockLineGrid = !part.showStockLineGrid;
        }
        else {
            part.showStockLineGrid = visible;
        }
    }

    private paginatorFocusOut(event: any, part: RepairOrderPart): void {
        if (event.target.value == '') {
            if (!part.isSameDetailsForAllParts) {
                part.currentSLIndex = 0;
                part.currentSERIndex = 0;
            }

            part.currentTLIndex = 0;
            part.currentSERIndex = 0;
        }
    }

    createStockLineItems(part: RepairOrderPart): void {
        part.stocklineListObj = [];
        part.isSameDetailsForAllParts = false;

        this.currentSLIndex = 0;
        this.currentSERIndex = 0;
        this.currentTLIndex = 0;

        if (part.itemMaster.isSerialized) {
            for (var i = 0; i < part.quantityActuallyReceived; i++) {
                let stockLine: StockLine = new StockLine();
                this.setStockLineManagementStructure(part.managementStructureId, stockLine);
                stockLine.repairOrderId = part.repairOrderId;
                stockLine.repairOrderPartRecordId = part.repairOrderPartRecordId;
                stockLine.itemMasterId = part.itemMaster.itemMasterId;
                stockLine.partNumber = part.itemMaster.partNumber;
                stockLine.quantity = 1;
                stockLine.stockLineId = 0;
                stockLine.createdDate = new Date();
                stockLine.manufacturerId = part.itemMaster.manufacturerId;
                stockLine.visible = false;
                stockLine.shippingReference = '';
                stockLine.shippingViaId = 0;
                stockLine.shelfId = null;
                stockLine.warehouseId = null;
                stockLine.binId = null;
                stockLine.repairOrderId = null;
                stockLine.locationId = null;
                stockLine.shippingAccount = '';
                stockLine.conditionId = 0;
                stockLine.masterCompanyId = 1;
                stockLine.serialNumberNotProvided = false;
                stockLine.repairOrderUnitCost = 0;
                stockLine.repairOrderExtendedCost = part.unitCost;
                stockLine.currentDate = new Date();
                
                if (part.itemMaster != undefined) {
                    stockLine.repairOrderUnitCost = part.unitCost;
                    if (!part.itemMaster.isSerialized) {
                        stockLine.repairOrderExtendedCost = part.quantityActuallyReceived * part.unitCost;
                    }
                }

                this.getStockLineSite(stockLine);
                part.stocklineListObj.push(stockLine);
            }
        }
        else {
            let stockLine: StockLine = new StockLine();
            this.setStockLineManagementStructure(part.managementStructureId, stockLine);
            stockLine.repairOrderId = part.repairOrderId;
            stockLine.repairOrderPartRecordId = part.repairOrderPartRecordId;
            stockLine.partNumber = part.itemMaster.partNumber;
            stockLine.itemMasterId = part.itemMaster.itemMasterId;
            stockLine.quantity = part.quantityActuallyReceived;
            stockLine.stockLineId = 0;
            stockLine.createdDate = new Date();
            stockLine.manufacturerId = part.itemMaster.manufacturerId;
            stockLine.visible = false;
            stockLine.shippingReference = '';
            stockLine.shippingViaId = 0;
            stockLine.shelfId = null;
            stockLine.warehouseId = null;
            stockLine.binId = null;
            stockLine.repairOrderId = null;
            stockLine.locationId = null;
            stockLine.shippingAccount = '';
            stockLine.conditionId = 0;
            stockLine.masterCompanyId = 1;
            stockLine.serialNumberNotProvided = false;
            stockLine.repairOrderUnitCost = 0;
            stockLine.repairOrderExtendedCost = part.unitCost;
            stockLine.currentDate = new Date();
            
            if (part.itemMaster != undefined) {
                stockLine.repairOrderUnitCost = part.unitCost;
                if (!part.itemMaster.isSerialized) {
                    stockLine.repairOrderExtendedCost = part.quantityActuallyReceived * part.unitCost;
                }
            }

            this.getStockLineSite(stockLine);
            part.stocklineListObj.push(stockLine);
        }
    }


    private gotoStockLinePage(event: any, part: RepairOrderPart): void {
        let value = event.target.value;
        let index: number = 0;
        if (value == '') {
            return;
        }
        index = Number.parseInt(value) - 1;
        if (index < part.stocklineListObj.length && index >= 0) {
            if (!part.isSameDetailsForAllParts && part.itemMaster.isSerialized) {
                part.currentSLIndex = index;
                part.currentSERIndex = index;
            }
            part.currentTLIndex = index;
        }
        else {
            this.alertService.showMessage(this.pageTitle, "Invalid stock line page", MessageSeverity.error);
            event.target.value = "1";
            if (!part.isSameDetailsForAllParts) {
                part.currentSLIndex = 0;
                part.currentSERIndex = 0;
            }
            part.currentTLIndex = 0;
            part.currentSERIndex = 0;
            return;
        }
    }

    moveStockLinePage(type: string, index: number, part: RepairOrderPart): void {
        var count = type == 'stockline' ? part.stocklineListObj.length : part.timeLifeList.length;
        if (index >= 0 && index < count) {
            if (part.itemMaster.isSerialized) {
                part.currentSLIndex = index;
            }
            part.currentSERIndex = index;
            part.currentTLIndex = index;
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
        stockLine.managementStructureEntityId = stockLine.companyId;
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
        if (stockLine.businessUnitId != undefined && stockLine.businessUnitId > 0) {
            stockLine.managementStructureEntityId = stockLine.businessUnitId;
        }
        else {
            stockLine.managementStructureEntityId = stockLine.companyId;
        }

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

        if (stockLine.divisionId != undefined && stockLine.divisionId > 0) {
            stockLine.managementStructureEntityId = stockLine.divisionId;
        }
        else {
            stockLine.managementStructureEntityId = stockLine.businessUnitId;
        }

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

    setStockLineDepartmentManagementStructureId(stockLine: StockLine) {
        if (stockLine.departmentId != undefined && stockLine.departmentId > 0) {
            stockLine.managementStructureEntityId = stockLine.departmentId;
        }
        else {
            stockLine.managementStructureEntityId = stockLine.divisionId;
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

    onSerialNumberNotProvided(stockLine: StockLine) {
        stockLine.isDisabledSNboxes = !stockLine.isDisabledSNboxes;
        stockLine.serialNumber = '';
        stockLine.serialNumberNotProvided = !stockLine.serialNumberNotProvided;
    }

    onChangeTimeLife(part: RepairOrderPart) {
            part.timeLifeList[part.currentTLIndex].timeLifeCyclesId = 0;
            part.timeLifeList[part.currentTLIndex].repairOrderId = part.repairOrderId;
            part.timeLifeList[part.currentTLIndex].repairOrderPartRecordId = part.repairOrderPartRecordId;
            part.timeLifeList[part.currentTLIndex].cyclesRemaining = '';
            part.timeLifeList[part.currentTLIndex].cyclesSinceInspection = '';
            part.timeLifeList[part.currentTLIndex].cyclesSinceNew = '';
            part.timeLifeList[part.currentTLIndex].cyclesSinceOVH = '';
            part.timeLifeList[part.currentTLIndex].cyclesSinceRepair = '';
            part.timeLifeList[part.currentTLIndex].timeRemaining = '';
            part.timeLifeList[part.currentTLIndex].timeSinceInspection = '';
            part.timeLifeList[part.currentTLIndex].timeSinceNew = '';
            part.timeLifeList[part.currentTLIndex].timeSinceOVH = '';
            part.timeLifeList[part.currentTLIndex].timeSinceRepair = '';
            part.timeLifeList[part.currentTLIndex].lastSinceNew = '';
            part.timeLifeList[part.currentTLIndex].lastSinceInspection = '';
            part.timeLifeList[part.currentTLIndex].lastSinceOVH = '';
    }

    onSubmitToReceive() {
        let errorMessages: string[] = this.validatePage();
        let msg = '';
        var index = 0;
        if (errorMessages.length > 0) {
            this.alertService.showMessage(this.pageTitle, errorMessages[0], MessageSeverity.error);
            return;
        }
        //let partsToPost: ReceiveParts[] = this.extractAllAllStockLines();
        let partsToPost: any = this.extractAllAllStockLines();
        this.shippingService.receiveParts(partsToPost).subscribe(data => {
            this.alertService.showMessage(this.pageTitle, 'Parts Received successfully.', MessageSeverity.success);
            return this.route.navigate(['/receivingmodule/receivingpages/app-edit-po']);
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

    extractAllAllStockLines(): ReceiveParts[] {
        let receiveParts: ReceiveParts[] = [];

        let allParts: RepairOrderPart[] = this.repairOrderData.repairOderPart.filter(x => x.quantityActuallyReceived > 0);

        for (let part of allParts) {
            let receivePart: ReceiveParts = new ReceiveParts();
            receivePart.repairOrderPartRecordId = part.repairOrderPartRecordId;
            receivePart.stockLines = part.stocklineListObj;
            receivePart.timeLife = part.timeLifeList;;
            receiveParts.push(receivePart);
        }
        return receiveParts;
    }

    validatePage() {
        let partsToFetch: RepairOrderPart[] = this.repairOrderData.repairOderPart.filter(x => x.quantityActuallyReceived > 0);
        let errorMessages: string[] = [];

        for (let item of partsToFetch) {
            if (item.itemMaster.glAccountId == 0) {
                errorMessages.push("Please select GL Account of Part No. " + item.itemMaster.partNumber);
            }
            if (item.conditionId == undefined || item.conditionId == 0) {
                errorMessages.push("Please select Condition of Part No. " + item.itemMaster.partNumber);
            }
            if (item.quantityRejected == undefined || item.quantityRejected == "") {
                errorMessages.push("Please enter Quantity Rejected of Part No." + item.itemMaster.partNumber);
            }
            if (item.stocklineListObj == undefined || item.stocklineListObj.length == 0)
                errorMessages.push("No part received for Part No." + item.itemMaster.PartNumber);

            var ofPartMsg = " of Part No. " + item.itemMaster.partNumber;
            if (item.stocklineListObj != undefined && item.stocklineListObj.length > 0) {
                for (var i = 0; i < item.stocklineListObj.length; i++) {
                    item.stocklineListObj[i].gLAccountId = item.itemMaster.glAccountId;
                    item.stocklineListObj[i].conditionId = item.conditionId;
                    item.stocklineListObj[i].quantityRejected = toInteger(item.quantityRejected);
                    item.stocklineListObj[i].isSerialized = item.itemMaster.isSerialized == undefined ? false : item.itemMaster.isSerialized;
                    item.stocklineListObj[i].isPMA = item.itemMaster.pma;
                    item.stocklineListObj[i].isDER = item.itemMaster.der;
                    item.stocklineListObj[i].repairOrderExtendedCost = item.stocklineListObj[i].repairOrderExtendedCost == undefined ||
                        item.stocklineListObj[i].repairOrderExtendedCost.toString() == '' ? 0 :
                        item.stocklineListObj[i].repairOrderExtendedCost;

                    item.stocklineListObj[i].repairOrderUnitCost = item.stocklineListObj[i].repairOrderUnitCost == undefined ||
                        item.stocklineListObj[i].repairOrderUnitCost.toString() == '' ? 0 :
                        item.stocklineListObj[i].repairOrderUnitCost;
                    //item.stocklineListObj[i].oEM = item.itemMaster.oemPNId;

                    if (item.stocklineListObj[i].companyId == undefined || item.stocklineListObj[i].companyId == 0) {
                        errorMessages.push("Please select Company in Receiving Qty - " + (i + 1).toString() + ofPartMsg);
                    }

                    if (item.stocklineListObj[i].siteId == undefined || item.stocklineListObj[i].siteId == 0) {
                        errorMessages.push("Please select Site in Receiving Qty - " + (i + 1).toString() + ofPartMsg);
                    }

                    if (item.itemMaster.isSerialized == true) {
                        item.stocklineListObj[i].serialNumber = item.stocklineListObj[i].serialNumber != undefined  ? item.stocklineListObj[i].serialNumber.trim() : '';
                        if (!item.stocklineListObj[i].serialNumberNotProvided && (item.stocklineListObj[i].serialNumber == undefined || item.stocklineListObj[i].serialNumber == '')) {
                            errorMessages.push("Please enter Serial Number in Receiving Qty - " + (i + 1).toString() + ofPartMsg);
                        }
                        if (!item.stocklineListObj[i].serialNumberNotProvided) {
                            for (var j = i + 1; j < item.stocklineListObj.length; j++) {
                                if (!item.stocklineListObj[i].serialNumberNotProvided && item.stocklineListObj[j].serialNumber == item.stocklineListObj[i].serialNumber) {
                                    errorMessages.push("Duplicate Serial Number is entered in Stock Line Page " + (i + 1).toString() + " and Page " + (j + 1).toString());
                                }
                            }
                        }
                    }
                }
            }

            if (item.timeLifeList != undefined && item.timeLifeList.length > 0) {
                // need to have some check to make sure atleast one field is entered.
                for (var i = 0; i < item.timeLifeList.length; i++) {
                    if (item.isTimeLifeUpdateLater != undefined && !item.isTimeLifeUpdateLater) {
                        var timeLife = item.timeLifeList[i];
                        if (timeLife.cyclesRemaining == '' && timeLife.cyclesSinceNew == '' && timeLife.cyclesSinceOVH == '' && timeLife.cyclesSinceInspection == '' && timeLife.cyclesSinceRepair == '' &&
                            timeLife.timeRemaining == '' && timeLife.timeSinceNew == '' && timeLife.timeSinceOVH == '' && timeLife.timeSinceInspection == '' && timeLife.timeSinceRepair == '' &&
                            timeLife.lastSinceNew == '' && timeLife.lastSinceOVH == '' && timeLife.lastSinceInspection == '') {
                            errorMessages.push("Please enter atleast one field in Time Life Page - " + (i + 1).toString() + ofPartMsg);
                        }
                    }
                }
            }

        }
        return errorMessages;
    }

    onObtainFromChange(event, stockLine) {
        stockLine.obtainFrom = '';
        stockLine.obtainFromObject = {};

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

    onOwnerChange(event, stockLine) {
        stockLine.owner = '';
        stockLine.ownerObject = {};

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

    onTraceableToChange(event, stockLine) {
        stockLine.traceableTo = '';
        stockLine.traceableToObject = {};

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
                    stockLine.filteredRecords.push(row);
                }
            }
        }
    }

    onObtainSelect(stockLine: StockLine): void {
        stockLine.obtainFrom = stockLine.obtainFromObject.Key;
    }

    onOwnerSelect(stockLine: StockLine): void {
        stockLine.owner = stockLine.ownerObject.Key;
    }

    onTraceableToSelect(stockLine: StockLine): void {
        stockLine.traceableTo = stockLine.traceableToObject.Key;
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

    toggleSameDetailsForAllParts(event: any, part: RepairOrderPart): void {
        part.isSameDetailsForAllParts = !part.isSameDetailsForAllParts;

        for (var i = part.currentSLIndex; i < part.stocklineListObj.length; i++) {
            var serialNumber = part.stocklineListObj[i].serialNumber;
            var serialNumberNotProvided = part.stocklineListObj[i].serialNumberNotProvided;

            var stockLineToCopy = { ...part.stocklineListObj[part.currentSLIndex] };
            part.stocklineListObj[i] = stockLineToCopy;
            part.stocklineListObj[i].serialNumber = serialNumber;
            part.stocklineListObj[i].serialNumberNotProvided = serialNumberNotProvided;
        }
    }

    togglePartSerialized(part: RepairOrderPart): void {

        if (part.itemMaster.isSerialized == null) {
            part.itemMaster.isSerialized == false;
        }

        this.itemmaster.updateItemMasterSerialized(part.itemMasterId, part.itemMaster.isSerialized).subscribe(
            result => {
                part.stocklineListObj = [];
                this.createStockLineItems(part);
                var childParts = this.repairOrderData.repairOderPart.filter(x => x.itemMaster.partNumber == part.itemMaster.partNumber && !x.itemMaster.isParent);
                for (let childPart of childParts) {
                    childPart.itemMaster.isSerialized = part.itemMaster.isSerialized;
                }
                this.alertService.showMessage(this.pageTitle, "Part " + part.itemMaster.partNumber + " IsSerialized feature " + (part.itemMaster.isSerialized ? "enabled" : "disabled") + " successfully.", MessageSeverity.success);
            },
            error => {
                part.itemMaster.isSerialized = !part.itemMaster.isSerialized;
                this.alertService.showMessage(this.pageTitle, 'Something went wrong while updating Item Master', MessageSeverity.error);
            });
    }

    togglePartTimeLife(part: RepairOrderPart): void {

        if (part.itemMaster.isTimeLife == null) {
            part.itemMaster.isTimeLife == false;
        }

        this.itemmaster.updateItemMasterTimeLife(part.itemMasterId, part.itemMaster.isTimeLife).subscribe(
            result => {
                part.timeLifeList = [];
                if (part.quantityActuallyReceived) {
                    if (part.itemMaster.isTimeLife == true) {
                        part.currentSLIndex = 0;
                        part.currentSERIndex = 0;
                        part.currentTLIndex = 0;
                        for (var i = 0; i < part.quantityActuallyReceived; i++) {
                            let timeLife: TimeLife = new TimeLife();
                            timeLife.timeLifeCyclesId = 0;
                            timeLife.repairOrderId = part.repairOrderId;
                            timeLife.repairOrderPartRecordId = part.repairOrderPartRecordId;
                            timeLife.cyclesRemaining = '';
                            timeLife.cyclesSinceInspection = '';
                            timeLife.cyclesSinceNew = '';
                            timeLife.cyclesSinceOVH = '';
                            timeLife.cyclesSinceRepair = '';
                            timeLife.timeRemaining = '';
                            timeLife.timeSinceInspection = '';
                            timeLife.timeSinceNew = '';
                            timeLife.timeSinceOVH = '';
                            timeLife.timeSinceRepair = '';
                            timeLife.lastSinceNew = '';
                            timeLife.lastSinceInspection = '';
                            timeLife.lastSinceOVH = '';
                            timeLife.detailsNotProvided = false;
                            part.timeLifeList.push(timeLife);
                        }
                    }
                }

                var childParts = this.repairOrderData.repairOderPart.filter(x => x.itemMaster.partNumber == part.itemMaster.partNumber && !x.itemMaster.isParent);
                for (let childPart of childParts) {
                    childPart.itemMaster.isTimeLife = part.itemMaster.isTimeLife;
                }
                this.alertService.showMessage(this.pageTitle, "Part " + part.itemMaster.partNumber + " IsTimeLife feature " + (part.itemMaster.isTimeLife ? "enabled" : "disabled") + " successfully.", MessageSeverity.success);
            },
            error => {
                part.itemMaster.isSerialized = !part.itemMaster.isSerialized;
                this.alertService.showMessage(this.pageTitle, 'Something went wrong while update Item Master', MessageSeverity.error);
            });
    }

    quantityRejectedFocusOut(event, part) {
        if (event.target.value == "") {
            event.target.value = "0";
            return true;
        }
    }

    quantityRejectedFocusIn(event, part) {
        if (event.target.value == "0") {
            event.target.value = "";
            return true;
        }
    }

    calculateExtendedCost(event, part) {
        if (part.stocklineListObj[this.currentSLIndex].repairOrderUnitCost == undefined || part.stocklineListObj[this.currentSLIndex].repairOrderUnitCost == '') {
            return;
        }
        if (part.itemMaster.isSerialized) {
            part.stocklineListObj[this.currentSLIndex].repairOrderExtendedCost = part.stocklineListObj[this.currentSLIndex].repairOrderUnitCost ;
        }
        else {
            part.stocklineListObj[this.currentSLIndex].repairOrderExtendedCost = part.stocklineListObj[this.currentSLIndex].repairOrderUnitCost * part.quantityActuallyReceived;
        }
        
    }
}