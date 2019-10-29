import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../../../services/vendor.service';
import { ConditionService } from '../../../../services/condition.service';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { ManufacturerService } from '../../../../services/manufacturer.service';
import { BinService } from '../../../../services/bin.service';
import { SiteService } from '../../../../services/site.service';
import { PriorityService } from '../../../../services/priority.service';
import { ReceivingService } from '../../../../services/receiving/receiving.service';
import { PurchaseOrder, DropDownData, PurchaseOrderPart } from '../receivng-po/PurchaseOrder.model';
import { MessageSeverity, AlertService } from '../../../../services/alert.service';
import { ManagementStructure } from '../receivng-po/managementstructure.model';
import { UnitOfMeasureService } from '../../../../services/unitofmeasure.service';

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
    purchaseOrderData: PurchaseOrder;
    pageTitle: string = 'Edit Receieve PO';
    poStatus: DropDownData[];
    poUserType: DropDownData[];
    managementStructure: ManagementStructure[];
    ConditionList: DropDownData[] = [];
    managementStructureHierarchy: ManagementStructure[][] = [];
    selectedManagementStructure: ManagementStructure[] = [];
    UOMList: any[];
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
    ) {
        //        debugger;
        // this.localData = this.receivingService.selectedPurchaseorderCollection;
        this.localPoData = this.vendorService.selectedPoCollection;
        this.editPoData = this.localData[0];

    }

    ngOnInit(): void {

        this.receivingService.getPurchaseOrderDataForEditById(126).subscribe(
            results => {
                console.log(results[0]);
                this.purchaseOrderData = results[0];
                this.purchaseOrderData.openDate = new Date(results[0].openDate).toLocaleDateString();
                this.purchaseOrderData.needByDate = new Date(results[0].needByDate);
                this.purchaseOrderData.dateApproved = new Date(results[0].dateApproved).toLocaleDateString();

                this.getManagementStructure().subscribe(
                    results => {
                        this.managementStructure = results[0];
                        let parentPart: PurchaseOrderPart;
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
                            let managementHierarchy: ManagementStructure[][] = [];
                            this.getManagementStructureHierarchy(part.managementStructureId, managementHierarchy, null);
                            managementHierarchy.reverse();
                            if (managementHierarchy[0] != undefined && managementHierarchy[0].length > 0) {
                                part.CompanyList = [];
                                for (let managementStruct of managementHierarchy[0]) {
                                    var dropdown = new DropDownData();
                                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                                    dropdown.Value = managementStruct.code;
                                    part.CompanyList.push(dropdown);
                                }
                            }
                            if (managementHierarchy[1] != undefined && managementHierarchy[1].length > 0) {
                                part.BusinessUnitList = [];
                                for (let managementStruct of managementHierarchy[1]) {
                                    var dropdown = new DropDownData();
                                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                                    dropdown.Value = managementStruct.code;
                                    part.BusinessUnitList.push(dropdown);
                                }
                            }
                            if (managementHierarchy[2] != undefined && managementHierarchy[2].length > 0) {
                                part.DivisionList = [];
                                for (let managementStruct of managementHierarchy[2]) {
                                    var dropdown = new DropDownData();
                                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                                    dropdown.Value = managementStruct.code;
                                    part.DivisionList.push(dropdown);
                                }
                            }
                            if (managementHierarchy[3] != undefined && managementHierarchy[3].length > 0) {
                                part.DepartmentList = [];
                                for (let managementStruct of managementHierarchy[3]) {
                                    var dropdown = new DropDownData();
                                    dropdown.Key = managementStruct.managementStructureId.toLocaleString();
                                    dropdown.Value = managementStruct.code;
                                    part.DepartmentList.push(dropdown);
                                }
                            }
                        }

                        this.purchaseOrderData.dateRequested = new Date(); //new Date(this.purchaseOrderData.dateRequested);
                        this.purchaseOrderData.dateApprovied = new Date(this.purchaseOrderData.dateApprovied);
                        this.purchaseOrderData.needByDate = new Date(); //new Date(this.purchaseOrderData.needByDate);

                        this.getStatus();
                        this.getUOMList();
                        this.getConditionList();
                        this.loadManagementdata();
                        this.loadManufacturerData();
                        this.loadSiteData();
                        this.priorityData();
                        this.loadReceivingPOEditGrid();
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

    private loadReceivingPOEditGrid() {

    }

    private loadManagementdata() {
        this.legalEntityService.getManagemententity().subscribe(data => {
            this.managementInfo = data[0]
        });
    }

    getStockLineBusinessUnitList(part: PurchaseOrderPart): void {
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

    loadManufacturerData() {

        this.manufacturerService.getWorkFlows().subscribe(data => {
            this.allManufacturerInfo = data[0];
        });
    }

    private loadSiteData()  //retriving SIte Information
    {

        this.siteService.getSiteList().subscribe(   //Getting Site List Hear
            results => this.onSaiteDataLoadSuccessful(results[0]), //Pasing first Array and calling Method
            error => this.onDataLoadFailed(error)
        );
    }
    private onSaiteDataLoadSuccessful(getSiteList: any[]) { //Storing Site Data

        //this.dataSource.data = getSiteList; //need
        this.allSites = getSiteList; //Contain first array of Loaded table Data will put in Html as [value]
    }
    svalueChange(data) //Site Valu Selection in Form
    {

        data.allWareHouses = [];
        data.allLocations = [];
        data.allShelfs = [];
        data.allBins = [];
        data.warehouseId = 0
        data.locationId = 0;
        data.shelfId = 0;
        data.binId = 0;

        this.binservice.getWareHouseDate(data.siteId).subscribe(warehousedata => {
            data.allWareHouses = warehousedata;
        })


    }

    wareHouseValueChange(data) {
        data.allLocations = [];
        data.allShelfs = [];
        data.allBins = [];
        data.locationId = 0;
        data.shelfId = 0;
        data.binId = 0;
        this.binservice.getLocationDate(data.warehouseId).subscribe(locationdata => { data.allLocations = locationdata })

    }
    locationValueChange(data) {
        data.allShelfs = [];
        data.allBins = [];
        data.shelfId = 0;
        data.binId = 0;
        this.binservice.getShelfDate(data.locationId).subscribe(shelfdata => { data.allShelfs = shelfdata })

    }
    shelfValueChange(data) {
        data.allBins = [];
        data.binId = 0;
        this.binservice.getBinDataById(data.shelfId).subscribe(bindata => { data.allBins = bindata })
    }

    private priorityData() {

        this.priority.getPriorityList().subscribe(
            results => this.onprioritySuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onprioritySuccessful(getPriorityList: any[]) {

        this.allPriorityInfo = getPriorityList;
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
    onEditParentGridFields() {
        this.rpoEditPF = false;
    }
    //remove once add dynamic content
    onEditChildGridFields() {
        this.rpoEditCF = false;
    }
    //remove once add dynamic content
    onEditGridFields() {
        this.rpoEditPF = false;
        this.rpoEditCF = false;
    }

    onSubmit() {
        return this.route.navigate(['/receivingmodule/receivingpages/app-view-po']);
    }
}

