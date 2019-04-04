﻿import { Component, OnInit } from '@angular/core';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { CreditTermsService } from '../../../../services/Credit Terms.service';
import { VendorService } from '../../../../services/vendor.service';
import { PriorityService } from '../../../../services/priority.service';
import { ConditionService } from '../../../../services/condition.service';
import { UnitOfMeasureService } from '../../../../services/unitofmeasure.service';
import { CurrencyService } from '../../../../services/currency.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { MasterCompany } from '../../../../models/mastercompany.model';
import { Router } from '@angular/router'
import { ModalService } from '../../../../services/Index';
import { empty } from 'rxjs/observable/empty';
import { EmployeeService } from '../../../../services/employee.service';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { CustomerService } from '../../../../services/customer.service';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { TreeNode, MessageService } from 'primeng/api';
import { SiteService } from '../../../../services/site.service';
import { WarehouseService } from '../../../../services/warehouse.service';
import { Site } from '../../../../models/site.model';
import { BinService } from '../../../../services/bin.service';
import { ManufacturerService } from '../../../../services/manufacturer.service';
import { StocklineService } from '../../../../services/stockline.service';

@Component({
    selector: 'app-receivng-po',
    templateUrl: './receivng-po.component.html',
    styleUrls: ['./receivng-po.component.scss']
})
/** purchase-setup component*/
export class ReceivngPoComponent {
    hasSerialized: boolean;
    showNormalQuantity: boolean;
    showFreeQuantity: boolean;
    showRestrictQuantity: boolean;
    hideSerialNumber: boolean;
    collectionofstockLine: any;
    stocklineListObj: any[]=[];
    allCustomer: any[];
    allVendorList: any[];
    allManufacturerInfo: any[] = [];
    allWareHouses: any;
    allLocations: any;
    allShelfs: any;
    wareHouseId: any;
    allBins: any;
    sourceTimeLife: any = {};
    sourceStockLineSetup: any =
        {};
    divHasData: boolean;
    BuHasData: boolean;
    DepaHasData: boolean;
    showGrid: boolean;
    public sourceSite: any = {};
    firstNamesbillTo1: any;
    firstNamesShipTo1: any[];
    vendorContactsForshipTo: any[] = [];
    vendorContactsForBillTO: any[] = [];
    firstNamesShipTo: any[] = [];
    firstNamesbillTo: any[] = [];
    billToContactData: any[] = [];
    firstNames: any[];
    shipToContactData: any[] = [];
    testData: any[] = [];
    editChildList: any[] = [];
    vendorSelectedforSplit: any[];
    spiltshipmentData: any[][];
    vendorSelectedForBillTo: any[];
    shipToCusData: any[] = [];
    vendorSelected: any[] = [];
    billToCusData: any[] = [];
    array: any[];
    returnPartsListArray: any[];
    allCustomers: any[];
    customerNames: any[];
    allSelectedParts: any[] = [];
    childDataList: any[] = [];
    savedPurchasedPart: any;
    savedInfo: any;
    allCurrencyData: any[] = [];
    allUomdata: any[] = [];
    allconditioninfo: any[] = [];
    itemTypeId: number;
    partWithId: any;
    allPartDetails: any[] = [];
    billToAddress: any = {};
    shipToAddress: any = {};
    issuedToAddress: any;
    allActions: any[] = [];
    selectedActionName: any;
    addressData: any[] = [];
    partListData: any[] = [];
    modal: NgbModalRef;
    selectedValue: any;
    allPriorityInfo: any[]=[];
    selectedValue1: any = {};
    selectedValue2: any = {};
    sourcePoApproval: any = {};
    partList: any = {};
    sourceissued: any = {};
    localCollection: any;
    maincompanylist: any[] = [];
    mainPartcompanylist: any[] = [];
    bulist: any[] = [];
    partBulist: any[] = [];
    partDepartmentList: any[] = [];
    partDivisionlist: any[] = [];
    VendorNamecoll: any[] = [];
    partId: any;
    vendorNames: any[]=[];
    bulistovh: any[] = [];
    departmentList: any[] = [];
    departmentListovh: any[] = [];
    customerNamecoll: any[] = [];
    divisionlist: any[] = [];
    divisionlistovh: any[] = [];
    ifSplitShip: boolean = false;
    allManagemtninfo: any[] = [];
    allManagementSiteData: any[] = [];
    allcreditTermInfo: any[] = [];
    disableSaveVenName: boolean;
    disableSave: boolean;
    partCollection: any[];
    disableSaveVenderName: boolean;
    vendorId: any;
    dataSource: any;
    mainArray: any[] = [];
    loadingIndicator: boolean;
    VendorCodesColl: any[] = [];
    selectedVendorCode: any;
    vendorCodes: any[]=[];
    allgeneralInfo: any[];
    isDeleteMode: boolean;
    isEditMode: boolean;
    sourceAction: any;
    isSaving: boolean;
    allComapnies: MasterCompany[];
    showCustomerAddress1: boolean;
    showCustomerCity: boolean;
    showCustomerState: boolean;
    showCustomerPostal: boolean;
    showCustomerCountry: boolean;
    userName: any;
    local: any;
    updatedCollection: {};
    allEmployeeinfo: any[] = [];
    display: boolean;
    modelValue: boolean;
    activeIndex: number;
    addressobject: any;
    selectedColumns: any[];
    firstCollection: any[]=[];
    itemclaColl: any[];
    cols: any[];
    allPartnumbersInfo: any[];
    showInput: boolean = false;
    partNumbers: any;
    pocollection: any;
    gridData: TreeNode[];
    copyOfAllManagemtninfo: any[] = [];
    cols1: any[];
    companyId: any;
    showManagement: boolean;
    address1: any;
    city: any;
    stateOrProvince: any;
    postalCode: any;
    country: any;
    allAddress: any;
    siteInfo: any;
    data1: any[] = [];
    localManagementSiteCollection: any;
    allSites: Site[];
    
    actionamecolle: any[] = [];
    selectedSite: any;
    disableSaveManufacturer: boolean;
    showDivError: boolean = false;
    sourceSplitShipment: any = {};
    showDepError: boolean = false;
    name: any;
    orderQuantity: any;
    showBuError: boolean = false;
    /** po-approval ctor */
    constructor(public stocklineser: StocklineService,public siteService: SiteService, public warehouseService: WarehouseService, public vendorService: VendorService, public customerService: CustomerService, private masterComapnyService: MasterComapnyService, public cusservice: CustomerService, private itemser: ItemMasterService, private modalService: NgbModal, private route: Router, public workFlowtService1: LegalEntityService, public currencyService: CurrencyService, public unitofmeasureService: UnitOfMeasureService, public conditionService: ConditionService, public CreditTermsService: CreditTermsService, public employeeService: EmployeeService, public workFlowtService: VendorService, public priority: PriorityService, private alertService: AlertService, public binservice: BinService, public manufacturerService: ManufacturerService) {
        //debugger;
        this.loadcustomerData();
        this.loadData();

        if (this.sourcePoApproval.purchaseOrderNumber == "" || this.sourcePoApproval.purchaseOrderNumber == undefined) {
            this.sourcePoApproval.purchaseOrderNumber = 'Creating';
        }
        if (this.workFlowtService.selectedPoCollection) {
            this.pocollection = workFlowtService.selectedPoCollection;
            if (this.pocollection.length > 0) {
                this.sourcePoApproval = this.pocollection[0];

                this.sourcePoApproval.dateRequested = new Date(this.sourcePoApproval.dateRequested);
                this.sourcePoApproval.dateApprovied = new Date(this.sourcePoApproval.dateApprovied);
                this.sourcePoApproval.needByDate = new Date(this.sourcePoApproval.needByDate);
                //this.allManagemtninfo = this.workFlowtService.selectedPoCollection;
                for (let i = 0; i < this.workFlowtService.selectedPoCollection.length; i++) {

                    if (this.workFlowtService.selectedPoCollection[i].pop.isParent == true) {
                        if (this.workFlowtService.selectedPoCollection[i].pop.needByDate) {
                            this.workFlowtService.selectedPoCollection[i].pop.needByDate = new Date(this.workFlowtService.selectedPoCollection[i].pop.needByDate);
                        }
                        else {
                            this.workFlowtService.selectedPoCollection[i].pop.needByDate = new Date();
                        }
                        this.workFlowtService.selectedPoCollection[i].pop.partId = workFlowtService.selectedPoCollection[i].partId;
                        this.workFlowtService.selectedPoCollection[i].pop.partdescription = workFlowtService.selectedPoCollection[i].partDescription;
                        this.workFlowtService.selectedPoCollection[i].pop.itemTypeId = workFlowtService.selectedPoCollection[i].itemTypeId;
                        this.workFlowtService.selectedPoCollection[i].pop.name = workFlowtService.selectedPoCollection[i].name;
                        this.workFlowtService.selectedPoCollection[i].pop.glAccountId = workFlowtService.selectedPoCollection[i].glAccountId;
                        this.workFlowtService.selectedPoCollection[i].pop.serialNumber = workFlowtService.selectedPoCollection[i].serialNumber;
                        this.workFlowtService.selectedPoCollection[i].pop.partNumber = workFlowtService.selectedPoCollection[i].partNumber;
                      //  this.GetStockLineDataBasedonItemMasterId(this.workFlowtService.selectedPoCollection[i].pop.itemTypeId);
                        this.workFlowtService.selectedPoCollection[i].pop.shortName = workFlowtService.selectedPoCollection[i].shortName;
                        this.workFlowtService.selectedPoCollection[i].pop["childList"] = [];
                        this.partListData.push(this.workFlowtService.selectedPoCollection[i].pop)

                    }
                    else {
                        if (this.workFlowtService.selectedPoCollection[i].pop.needByDate) {
                            this.workFlowtService.selectedPoCollection[i].pop.needByDate = new Date(this.workFlowtService.selectedPoCollection[i].pop.needByDate);
                        }
                        else {
                            this.workFlowtService.selectedPoCollection[i].pop.needByDate = new Date();
                        }
                        this.workFlowtService.selectedPoCollection[i].pop.shortName = workFlowtService.selectedPoCollection[i].shortName;
                        this.workFlowtService.selectedPoCollection[i].pop.partId = workFlowtService.selectedPoCollection[i].partId;
                        this.workFlowtService.selectedPoCollection[i].pop.partdescription = workFlowtService.selectedPoCollection[i].partDescription;
                        this.workFlowtService.selectedPoCollection[i].pop.itemTypeId = workFlowtService.selectedPoCollection[i].itemTypeId;
                        this.workFlowtService.selectedPoCollection[i].pop.name = workFlowtService.selectedPoCollection[i].name;
                        this.workFlowtService.selectedPoCollection[i].pop.glAccountId = workFlowtService.selectedPoCollection[i].glAccountId;
                        this.workFlowtService.selectedPoCollection[i].pop.serialNumber = workFlowtService.selectedPoCollection[i].serialNumber;
                        this.workFlowtService.selectedPoCollection[i].pop.partNumber = workFlowtService.selectedPoCollection[i].partNumber;
                        this.editChildList.push(this.workFlowtService.selectedPoCollection[i].pop)

                    }
                }
                if (this.editChildList.length > 0) {

                    for (let k = 0; k < this.partListData.length; k++) {

                        for (let m = 0; m < this.editChildList.length; m++) {

                            if (this.partListData[k].itemMasterId == this.editChildList[m].itemMasterId) {
                                this.partListData[k].ifSplitShip = true;
                                this.partListData[k]["childList"].push(this.editChildList[m]);

                            }

                        }
                    }
                }


            }
            console.log(this.partListData);
            console.log(this.editChildList);


        }

        if (workFlowtService.isEditMode == true) {
            this.localCollection = workFlowtService.vendorForPoCollection;
            this.sourcePoApproval = this.localCollection;
            console.log(this.localCollection);
            this.itemTypeId = 0;
        }
        this.workFlowtService.ShowPtab = false;
        //this.itemTypeId = 0;
        this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab);
        this.workFlowtService.currentUrl = '/vendorsmodule/vendorpages/app-purchase-setup';
        this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
    }

    //GetStockLineDataBasedonItemMasterId(itemMasterId:any)
    //{
    //    this.stocklineser.getStocklineListById(itemMasterId).subscribe(data: any => {
    //        this.assetStatusList = data[0];
    //    });
    //}
    makeNestedObj(arr, parent) {
        var out = []
		/*for (var i in arr)*/for (let i = 0; i < arr.length; i++) {
            if (arr[i].isParent == parent) {
                //var children = this.makeNestedObj(arr, arr[i].isParent)
                arr[i] = { "data": arr[i] };
                //if (children.length) {
                //	arr[i].children = children
                //}
                out.push(arr[i])
            }
        }
        return out
    }

    makeNestedObj1(arr, parent) {
        var out = []
        for (var i in arr) {
            if (arr[i].parentId == parent) {
                var children = this.makeNestedObj1(arr, arr[i].managementStructureId)
                arr[i] = { "data": arr[i] };
                if (children.length) {
                    arr[i].children = children
                }
                out.push(arr[i])
            }
        }
        return out
    }

    getBUList1(companyId) {

        this.sourcePoApproval.shipToUserType = 3; //making Address User Type as Company
        this.sourcePoApproval.billToUserType = 3;

        //Calling for Get ManagementSite Data Based on Company Structure Selection

        this.workFlowtService.getManagementSiteDataByCompanyId(companyId).subscribe(
            results => this.onManagemtntSitedataLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.companyId = companyId;
        // we are Hoding Compay Id if we select Same Management Stru Data again then we r loading after load Mana Str list
        //for Structure
        if (this.allManagemtninfo) {

            this.gridData = this.makeNestedObj1(this.allManagemtninfo, companyId);
        }

        if (this.gridData.length == 0) {
            this.workFlowtService1.getManagemententity().subscribe(
                results => this.onManagemtntdataLoad(results[0]),
                error => this.onDataLoadFailed(error)
            );

        }

        this.showManagement = true;

        this.cols1 = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' },
            //{ field: 'legalEntityId', header: 'ID' },
        ];

    }

    ngOnInit() {
        this.priorityData();
        this.loadCreditTermsData();
        this.loadManagementdata();
        this.getAddresses();
        this.loadData();
        this.loadSiteData();
        this.loadPartData();
        this.loadCurrencyData();
        this.loadManufacturerData();
        this.customerList();
        this.vendorList();
        this.loadConditionData();
        this.loadUOMData();
        this.employeedata();
        this.ptnumberlistdata();
        this.loadcustomerData();
        if (this.sourcePoApproval.purchaseOrderNumber == "" || this.sourcePoApproval.purchaseOrderNumber == undefined) {
            this.sourcePoApproval.purchaseOrderNumber = 'Creating';
        }
        this.loadDefualtObj();
    }
    private priorityData() {

        this.priority.getPriorityList().subscribe(
            results => this.onprioritySuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    loadDefualtObj() {
        let stockLineDefObj = {
            companyId: '',
            managementStructureEntityId: '',
            businessUnitId: '',
            partNumber: '',
            partDescription: '',
            isSerialized: '',
            shelfLife: '',
            isPMA: '',
            isDER: '',
            itemMasterId: '',
            glAccountId: '',
            quantity: '',
            conditionId: '',
            serialNumber: '',
            siteId: '',
            warehouseId: '',
            locationId: '',
            shelfId: '',
            binId: '',
            obtainFromType: '',
            obtainFrom: '',
            ownerType: '',
            owner: '',
            traceableToType: '',
            traceableTo: '',
            manufacturerId: '',
            manufacturerLotNumber: '',
            manufacturingDate: '',
            manufacturingBatchNumber: '',
            partCertificationNumber: '',
            certifiedBy: '',
            certifiedDate: '',
            tagDate: '',
            tagType: '',
            certifiedDueDate: '',
            orderDate: '',
            PurchaseOrderId: '',
            RepairOrderId: '',
            receivedDate: '',
            receiverNumber: '',
            reconciliationNumber: '',
            shelfLifeExpirationDate: '',
            unitSalesPrice: '',
            coreUnitCost: '',
            oem: '',
            memo: '',
            conditionList: this.allconditioninfo,
            siteList: this.allSites,
            wareHouseList: this.allWareHouses,
            locationlist: this.allLocations,
            shelflist: this.allShelfs,
            binList: this.allBins,
            manfacturerList: this.allManufacturerInfo,
            timeLifeCyclesId: '',
            

        };
        return stockLineDefObj;
    }
    private getAddresses() {

        this.workFlowtService.getSiteAddresses().subscribe(
            results => this.onaddressDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );


    }

   

    addDetailsClick(partList) {
       // debugger;
        for (let i = 0; i < this.partListData.length; i++) {
            if (this.partListData[i].partNumber == partList.partNumber) {
                partList["showGrid"] = true;
                partList["stocklineListObj"] = [];

                //partList["quantityLength"] = partList.quantityOrdered;
                this.itemser.getDescriptionbypart(partList.partNumber).subscribe((data: any) => {
                    partList["isSerialized"] = data[0][0].isSerialized;
                    partList["isTimeLife"] = data[0][0].isTimeLife;
                    partList["glAccountId"] = data[0][0].glAccountId;
                    if (partList["isSerialized"] == true) {
                        this.hideSerialNumber = true;
                        this.showRestrictQuantity = true;
                        this.showFreeQuantity = false;
                        this.showNormalQuantity = false;
                        partList["isSerialized"] = true;
                        this.hasSerialized = true; //for Knowing is Serialized or not for Serial Number 

                    }
                    else {
                        this.hideSerialNumber = false;
                        this.showRestrictQuantity = false;
                        this.showFreeQuantity = true;
                        this.showNormalQuantity = false;
                        partList["isSerialized"] = false;

                        this.hasSerialized = false; //for Knowing is Serialized or not for Serial Number 

                    }

                })
                for (let i = 0; i < partList.quantityOrdered; i++) {

                    partList["stocklineListObj"].push(this.loadDefualtObj());
                }

            }
            else {
                this.partListData[i]["showGrid"] = false;
                
            }
    }

   
       
    }
    saveStockline(partList) {
        debugger;
        if ((partList["isSerialized"] == true)) {
            let sourceTimeLife: any = {};
            for (let i = 0; i < partList["stocklineListObj"].length; i++) {
                sourceTimeLife.cyclesSinceNew = partList["stocklineListObj"][i].cyclesSinceNew;
                sourceTimeLife.cyclesSinceOVH = partList["stocklineListObj"][i].cyclesSinceOVH;
                sourceTimeLife.cyclesSinceRepair = partList["stocklineListObj"][i].cyclesSinceRepair;
                sourceTimeLife.cyclesSinceInspection = partList["stocklineListObj"][i].cyclesSinceInspection;
                sourceTimeLife.timeSinceNew = partList["stocklineListObj"][i].timeSinceNew;
                sourceTimeLife.timeSinceOVH = partList["stocklineListObj"][i].timeSinceOVH;
                sourceTimeLife.timeSinceRepair = partList["stocklineListObj"][i].timeSinceRepair;
                sourceTimeLife.timeSinceInspection = partList["stocklineListObj"][i].timeSinceInspection;
                sourceTimeLife.lastSinceNew = partList["stocklineListObj"][i].lastSinceNew;
                sourceTimeLife.lastSinceOVH = partList["stocklineListObj"][i].lastSinceOVH;
                sourceTimeLife.lastSinceInspection = partList["stocklineListObj"][i].lastSinceInspection;
                this.stocklineser.newStockLineTimeLife(sourceTimeLife).subscribe(data => {
                //this.collectionofstockLineTimeLife = data;
                partList["stocklineListObj"][i].timeLifeCyclesId = data.timeLifeCyclesId;
                if (data != null) {
                    
                        delete partList["stocklineListObj"][i].conditionList;
                        delete partList["stocklineListObj"][i].manfacturerList;
                        delete partList["stocklineListObj"][i].siteList;
                        partList["stocklineListObj"][i].itemMasterId = partList["itemMasterId"];
                        partList["stocklineListObj"][i].purchaseOrderId = partList["purchaseOrderId"];
                        partList["stocklineListObj"][i].partNumber = partList["partNumber"];
                        partList["stocklineListObj"][i].isSerialized = partList["isSerialized"];
                        //partList["stocklineListObj"][i].timeLifeCyclesId = this.sourceStockLineSetup.timeLifeCyclesId;
                        partList["stocklineListObj"][i].quantity = partList["quantityOrdered"];
                        partList["stocklineListObj"][i].orderDate = partList["createdDate"];
                        //partList["stocklineListObj"][i].purchaseOrderUnitCost = partList["unitCost"];
                        partList["stocklineListObj"][i].glAccountId = partList["glAccountId"];
                        //partList["stocklineListObj"][i].manufacturerId = partList["manufacturerId"];
                        partList["stocklineListObj"][i].isHazardousMaterial = partList["isHazardousMaterial"];
                        this.stocklineser.newStockLine(partList["stocklineListObj"][i]).subscribe(data => {
                            this.collectionofstockLine = data;
                            this.vendorService.receiveSaveddata.push(data);
                        })
                    }
                })
            }
        }
        else {
            for (let i = 0; i < partList["stocklineListObj"].length; i++) {
                delete partList["stocklineListObj"][i].conditionList;
                delete partList["stocklineListObj"][i].manfacturerList;
                delete partList["stocklineListObj"][i].siteList;
                partList["stocklineListObj"][i].itemMasterId = partList["itemMasterId"];
                partList["stocklineListObj"][i].purchaseOrderId = partList["purchaseOrderId"];
                partList["stocklineListObj"][i].partNumber = partList["partNumber"];
                partList["stocklineListObj"][i].isSerialized = partList["isSerialized"];
                partList["stocklineListObj"][i].quantity = partList["quantityOrdered"];
                partList["stocklineListObj"][i].orderDate = partList["createdDate"];
                //partList["stocklineListObj"][i].purchaseOrderUnitCost = partList["unitCost"];
                partList["stocklineListObj"][i].glAccountId = partList["glAccountId"];
                //partList["stocklineListObj"][i].manufacturerId = partList["manufacturerId"];
                partList["stocklineListObj"][i].isHazardousMaterial = partList["isHazardousMaterial"];
                this.stocklineser.newStockLine(partList["stocklineListObj"][i]).subscribe(data => {
                    this.collectionofstockLine = data;
                    this.vendorService.receiveSaveddata.push(data);
                })
            }

        }
    }
    sameDetailsforAllParts(partList) {
        //debugger;
        let orderQuantity = 1;
        let someArray = [];
        someArray = partList["stocklineListObj"][0];
        partList["stocklineListObj"] = [];
        partList["stocklineListObj"].push(someArray);
     
    }
    //passing Value of Object and Qty to receive Value for Show Data of Details of Part
    changeQuantityToReceive(partList,qtyReceiveValue)
    {
        let quantity = partList["stocklineListObj"][0].quantityToReceive;
        partList["stocklineListObj"] = [];
        for (let i = 0; i < qtyReceiveValue; i++)
        {
            partList["stocklineListObj"].push(this.loadDefualtObj());
            partList["stocklineListObj"][0].quantityToReceive = quantity;
        }
    }

    restrictedQuantitytoReceive(partList, restrictedQtyReceiveValue)
    {
        if (restrictedQtyReceiveValue > 1)
        {
           let quantity = partList["stocklineListObj"].length;
            partList["stocklineListObj"] = [];

            for (let i = 0; i < quantity; i++)
            {
                partList["stocklineListObj"].push(this.loadDefualtObj());
                partList["stocklineListObj"][i].quantityToReceive = 1;
            }

        }
    }
    getAllparts() {
        //debugger;
        //let partsArray = [];
        this.returnPartsListArray = [];
        this.array = this.partNumbers.split(',');
        if (this.array.length > 0) {
            for (let i = 0; i < this.array.length; i++) {

                this.workFlowtService.getPartDetailsWithid(this.array[i]).subscribe(returndata => {
                    if (returndata[0].length > 0) {
                        for (let k = 0; k < returndata[0].length; k++) {
                            this.returnPartsListArray.push(returndata[0][k]);
                            for (let j = 0; j < this.array.length; j++) {
                                if (this.array[j] == returndata[0][k].partNumber) {
                                    this.array.splice(j, 1)
                                }
                                else {
                                    //this.returnPartsListArray.push({ "partNumber": this.array[j] });
                                }
                            }
                        }

                    }
                    console.log(this.array);

                });



            }
        }


        console.log(this.partNumbers);
    }
    saveReceivePurchaseOrder() {
        //debugger;
        this.sourcePoApproval.createdBy = this.userName;
        this.sourcePoApproval.updatedBy = this.userName;
        this.workFlowtService.savePurchaseorder(this.sourcePoApproval).subscribe(saveddata => {
            this.savedInfo = saveddata;
            {
               
                this.route.navigateByUrl('/receivingmodule/receivingpages/app-edit-po');

            }
        });

    }
    private loadcustomerData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.cusservice.getWorkFlows().subscribe(
            results => this.oncusDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private oncusDataLoadSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allCustomers = allWorkFlows;
        if (this.sourcePoApproval.billToUserType == 1) {
            this.onBillToCustomerNameselected(this.sourcePoApproval.billToUserName);
        }
        if (this.sourcePoApproval.billToUserType == 2) {
            this.onVendorselectedForBillTo(this.sourcePoApproval.billToUserName);
        }
        if (this.sourcePoApproval.shipToUserType == 1) {
            this.onshipCustomerNameselected(this.sourcePoApproval.shipToUserName);
        }
        if (this.sourcePoApproval.shipToUserType == 2) {
            this.onVendorselectedForShipTo(this.sourcePoApproval.shipToUserName);
        }
        if (this.sourcePoApproval.billToUserType == 1) {
            this.filterNames(this.sourcePoApproval.billToUserName);
        }
        if (this.sourcePoApproval.billToUserType == 2) {
            this.filterVendorNames(this.sourcePoApproval.billToUserName);
        }
        if (this.sourcePoApproval.shipToUserType == 1) {
            this.filterNames(this.sourcePoApproval.shipToUserName);
        }
        if (this.sourcePoApproval.shipToUserType == 2) {
            this.filterVendorNames(this.sourcePoApproval.shipToUserName);
        }

        //get Shipping info
        if (this.sourcePoApproval.billToUserType == 1) {
            this.cusservice.getCustomerShipAddressGetWIthAddressId(this.sourcePoApproval.billToAddressId).subscribe(
                returnddataforbill1 => {
                    let obj = returnddataforbill1[0][0];
                    if (obj) {
                        //this.selectedValue1.siteName = obj.cs.siteName;
                        this.billToAddress.address1 = obj.ad.line1;
                        this.billToAddress.address2 = obj.ad.line2;
                        this.billToAddress.address3 = obj.ad.line3;
                        this.billToAddress.city = obj.ad.city;
                        this.billToAddress.stateOrProvince = obj.ad.stateOrProvince;
                        this.billToAddress.postalCode = obj.ad.postalCode;
                        this.billToAddress.country = obj.ad.country;
                    }
                });
        }
        if (this.sourcePoApproval.billToUserType == 2) {

            this.cusservice.getvendorShipAddressGetWIthAddressId(this.sourcePoApproval.billToAddressId).subscribe(
                returnddataforbill => {
                    let obj = returnddataforbill[0][0];
                    if (obj) {
                        //this.selectedValue1.siteName = obj.cs.siteName;
                        this.billToAddress.address1 = obj.ad.line1;
                        this.billToAddress.address2 = obj.ad.line2;
                        this.billToAddress.address3 = obj.ad.line3;
                        this.billToAddress.city = obj.ad.city;
                        this.billToAddress.stateOrProvince = obj.ad.stateOrProvince;
                        this.billToAddress.postalCode = obj.ad.postalCode;
                        this.billToAddress.country = obj.ad.country;
                    }
                });
        }
        if (this.sourcePoApproval.shipToUserType == 1) {
            this.cusservice.getCustomerShipAddressGetWIthAddressId(this.sourcePoApproval.shipToAddressId).subscribe(
                returnddataforbill => {

                    let obj = returnddataforbill[0][0];
                    if (obj) {
                        //this.selectedValue1.siteName = obj.cs.siteName;
                        this.shipToAddress.address1 = obj.ad.line1;
                        this.shipToAddress.address2 = obj.ad.line2;
                        this.shipToAddress.address3 = obj.ad.line3;
                        this.shipToAddress.city = obj.ad.city;
                        this.shipToAddress.stateOrProvince = obj.ad.stateOrProvince;
                        this.shipToAddress.postalCode = obj.ad.postalCode;
                        this.shipToAddress.country = obj.ad.country;
                    }
                });
        }
        if (this.sourcePoApproval.shipToUserType == 2) {
            this.cusservice.getvendorShipAddressGetWIthAddressId(this.sourcePoApproval.shipToAddressId).subscribe(
                returnddataforbill => {
                    let obj = returnddataforbill[0][0];
                    if (obj) {
                        //this.selectedValue1.siteName = obj.cs.siteName;
                        this.shipToAddress.address1 = obj.ad.line1;
                        this.shipToAddress.address2 = obj.ad.line2;
                        this.shipToAddress.address3 = obj.ad.line3;
                        this.shipToAddress.city = obj.ad.city;
                        this.shipToAddress.stateOrProvince = obj.ad.stateOrProvince;
                        this.shipToAddress.postalCode = obj.ad.postalCode;
                        this.shipToAddress.country = obj.ad.country;
                    }
                });
        }

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
        this.allPartnumbersInfo = allWorkFlows;



    }

    saveToVendorCustomerCompanyTable(sourceSplitShipment) //Shippment Details
    {
        if (this.sourcePoApproval.shipToUserType == 1) {
            console.log("Customer");
        }
        else if (this.sourcePoApproval.shipToUserType == 2) {
            console.log("Vendor");
        }
        else if (this.sourcePoApproval.shipToUserType == 3) {
            console.log("Company");
        }
        console.log(sourceSplitShipment);
    }

    saveToThisPO() {

    }
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

    partnmId(parentdata, event) {
        //debugger;
        this.showInput = true;

        if (this.itemclaColl) {
            for (let i = 0; i < this.itemclaColl.length; i++) {
                if (event == this.itemclaColl[i][0].partName) {
                    this.sourcePoApproval.itemMasterId = this.itemclaColl[i][0].partId;
                    //this.allSelectedParts.push(this.itemclaColl[i][0].partId);
                    //this.selectedActionName = event;
                    this.partWithId = [];
                    this.itemTypeId = 1;

                    //For Getting Data After Part Selected

                    this.workFlowtService.getPartDetailsWithidForSinglePart(this.sourcePoApproval.itemMasterId).subscribe(
                        data1 => {
                            if (data1[0][0]) {
                                this.partWithId = data1[0][0];
                                parentdata.partAlternatePartId = this.partWithId.partAlternatePartId;
                                parentdata.partId = this.partWithId.itemMasterId;
                                parentdata.partdescription = this.partWithId.partDescription;
                                parentdata.partNumber = this.partWithId.partNumber;
                                parentdata.itemTypeId = this.partWithId.itemTypeId;
                                parentdata.name = this.partWithId.name;
                                parentdata.itemMasterId = this.partWithId.itemMasterId;
                                parentdata.glAccountId = this.partWithId.glAccountId;
                                parentdata.shortName = this.partWithId.shortName;
                                parentdata.listPrice = this.partWithId.listPrice; //Initial Value
                                parentdata.purchaseDiscountOffListPrice = this.partWithId.purchaseDiscountOffListPrice; //Percentage

                                this.partList.unitCost = this.partWithId.purchaseListPriceAfterDiscount; //After Discount Value

                            }

                        })
                }
            };
        }
    }
    savePurchaseorderPart(purId) {
        if (this.workFlowtService.isEditMode == false) {
            for (let i = 0; i < this.partListData.length; i++) {
                if (this.partListData[i].purchaseOrderPartRecordId) {
                    //alert("exists");
                    let sendobj = {

                        //ifSplitShip: false,
                        purchaseOrderPartRecordId: this.partListData[i].purchaseOrderPartRecordId,
                        purchaseOrderId: purId,
                        itemMasterId: this.partListData[i].itemMasterId,
                        serialNumber: this.partListData[i].serialNumber,
                        //nonInventory: this.partListData[i].nonInventory,
                        requisitionedBy: this.sourcePoApproval.requestedBy,
                        requisitionedDate: this.sourcePoApproval.requisitionedDate,
                        approver: this.sourcePoApproval.approver,
                        approvedDate: this.sourcePoApproval.dateApprovied,
                        needByDate: this.partListData[i].needByDate,
                        manufacturer: this.partListData[i].manufacturer,
                        status: this.sourcePoApproval.statusId,
                        trace: this.partListData[i].trace,
                        conditionCode: this.partListData[i].conditionCode,
                        uomId: this.partListData[i].uomId,
                        quantityOrdered: this.partListData[i].quantityOrdered,
                        unitCost: this.partListData[i].unitCost,
                        discountPerUnit: this.partListData[i].discountPerUnit,
                        discountCostPerUnit: this.partListData[i].discountCostPerUnit,
                        extendedCost: this.partListData[i].extendedCost,
                        transactionalCurrencyId: this.partListData[i].transactionalCurrencyId,
                        functionalCurrencyId: this.partListData[i].functionalCurrencyId,
                        foreignExchangeRate: this.partListData[i].foreignExchangeRate,
                        workOrderId: this.partListData[i].workOrderId,
                        repairOrderId: this.partListData[i].repairOrderId,
                        salesOrderId: this.partListData[i].salesOrderId,
                        generalLedgerAccounId: this.partListData[i].generalLedgerAccounId,
                        memo: this.partListData[i].memo,
                        poPartSplitAddressId: this.partListData[i].poPartSplitAddressId,
                        poPartSplitUserTypeId: this.partListData[i].poPartSplitUserTypeId,
                        poPartSplitUserName: this.partListData[i].poPartSplitUserName,
                        poPartSplitAddress1: this.partListData[i].poPartSplitAddress1,
                        poPartSplitAddress2: this.partListData[i].poPartSplitAddress2,
                        poPartSplitAddress3: this.partListData[i].poPartSplitAddress3,
                        poPartSplitCity: this.partListData[i].poPartSplitCity,
                        poPartSplitState: this.partListData[i].poPartSplitState,
                        poPartSplitPostalCode: this.partListData[i].poPartSplitPostalCode,
                        poPartSplitCountry: this.partListData[i].poPartSplitCountry,
                        managementStructureId: this.partListData[i].managementStructureId,
                        createdBy: this.userName,
                        updatedBy: this.userName,
                        //createdDate: this.partListData[i].createdDate,
                        //updatedDate: this.partListData[i].updatedDate,
                        //isActive: this.partListData[i].purchaseOrderPartRecordId,
                        isParent: this.partListData[i].isParent,

                    }
                    let childDataList = [];
                    if (this.partListData[i].childList) {
                        if (this.partListData[i].childList.length > 0) {
                            for (let j = 0; j < this.partListData[i].childList.length; j++) {

                                childDataList.push(this.partListData[i].childList[j])
                            }
                        }
                    }
                    this.workFlowtService.savePurchaseorderpart(sendobj).subscribe(saveddata1 => {
                        this.savedPurchasedPart = saveddata1;
                        if (childDataList.length > 0) {
                            for (let k = 0; k < childDataList.length; k++) {
                                if (childDataList[k].purchaseOrderPartRecordId) {
                                    let childobj = {
                                        //ifSplitShip: false,
                                        purchaseOrderPartRecordId: childDataList[k].purchaseOrderPartRecordId,
                                        purchaseOrderId: purId,
                                        itemMasterId: this.partListData[i].itemMasterId,
                                        //serialNumber: this.partListData[i].serialNumber,
                                        //nonInventory: this.partListData[i].nonInventory,
                                        requisitionedBy: this.sourcePoApproval.requestedBy,
                                        requisitionedDate: this.sourcePoApproval.requisitionedDate,
                                        approver: this.sourcePoApproval.approver,
                                        approvedDate: this.sourcePoApproval.dateApprovied,
                                        needByDate: this.partListData[i].needByDate,
                                        manufacturer: this.partListData[i].manufacturer,
                                        status: this.sourcePoApproval.statusId,
                                        trace: this.partListData[i].trace,
                                        conditionCode: this.partListData[i].conditionCode,
                                        uomId: childDataList[k].uomId,
                                        quantityOrdered: childDataList[k].quantityOrdered,
                                        //unitCost: this.partListData[i].unitCost,
                                        //discountPerUnit: this.partListData[i].discountPerUnit,
                                        //discountCostPerUnit: this.partListData[i].discountCostPerUnit,
                                        //extendedCost: this.partListData[i].extendedCost,
                                        transactionalCurrencyId: this.partListData[i].transactionalCurrencyId,
                                        functionalCurrencyId: this.partListData[i].functionalCurrencyId,
                                        //foreignExchangeRate: this.partListData[i].foreignExchangeRate,
                                        //workOrderId: this.partListData[i].workOrderId,
                                        //repairOrderId: this.partListData[i].repairOrderId,
                                        //salesOrderId: this.partListData[i].salesOrderId,
                                        //generalLedgerAccounId: this.partListData[i].generalLedgerAccounId,
                                        memo: this.partListData[i].memo,
                                        poPartSplitAddressId: childDataList[k].poPartSplitAddressId,
                                        poPartSplitUserTypeId: childDataList[k].poPartSplitUserTypeId,
                                        poPartSplitUserName: childDataList[k].poPartSplitUserName,
                                        poPartSplitAddress1: childDataList[k].poPartSplitAddress1,
                                        poPartSplitAddress2: childDataList[k].poPartSplitAddress2,
                                        poPartSplitAddress3: childDataList[k].poPartSplitAddress3,
                                        poPartSplitCity: childDataList[k].poPartSplitCity,
                                        poPartSplitState: childDataList[k].poPartSplitState,
                                        poPartSplitPostalCode: childDataList[k].poPartSplitPostalCode,
                                        poPartSplitCountry: childDataList[k].poPartSplitCountry,
                                        createdBy: this.userName,
                                        updatedBy: this.userName,
                                        //managementStructureId: this.partListData[i].managementStructureId,
                                        //createdBy: this.childDataList[k].createdBy,
                                        //updatedBy: this.childDataList[k].updatedBy,
                                        //createdDate: this.childDataList[k].createdDate,
                                        //updatedDate: this.childDataList[k].updatedDate,
                                        //isActive: this.childDataList[k].purchaseOrderPartRecordId,
                                        isParent: childDataList[k].isParent,
                                    }
                                    this.workFlowtService.savePurchaseorderpart(childobj).subscribe(saveddata2 => {
                                        this.savedPurchasedPart = saveddata2;

                                    })
                                }
                                else {

                                    let childobj = {
                                        //ifSplitShip: false,
                                        //purchaseOrderPartRecordId: this.childDataList[k].purchaseOrderPartRecordId,
                                        purchaseOrderId: purId,
                                        itemMasterId: this.partListData[i].itemMasterId,
                                        //serialNumber: this.partListData[i].serialNumber,
                                        //nonInventory: this.partListData[i].nonInventory,
                                        requisitionedBy: this.sourcePoApproval.requestedBy,
                                        requisitionedDate: this.sourcePoApproval.requisitionedDate,
                                        approver: this.sourcePoApproval.approver,
                                        approvedDate: this.sourcePoApproval.dateApprovied,
                                        needByDate: this.partListData[i].needByDate,
                                        manufacturer: this.partListData[i].manufacturer,
                                        status: this.sourcePoApproval.statusId,
                                        trace: this.partListData[i].trace,
                                        conditionCode: this.partListData[i].conditionCode,
                                        uomId: childDataList[k].uomId,
                                        quantityOrdered: childDataList[k].quantityOrdered,
                                        //unitCost: this.partListData[i].unitCost,
                                        //discountPerUnit: this.partListData[i].discountPerUnit,
                                        //discountCostPerUnit: this.partListData[i].discountCostPerUnit,
                                        //extendedCost: this.partListData[i].extendedCost,
                                        transactionalCurrencyId: this.partListData[i].transactionalCurrencyId,
                                        functionalCurrencyId: this.partListData[i].functionalCurrencyId,
                                        //foreignExchangeRate: this.partListData[i].foreignExchangeRate,
                                        //workOrderId: this.partListData[i].workOrderId,
                                        //repairOrderId: this.partListData[i].repairOrderId,
                                        //salesOrderId: this.partListData[i].salesOrderId,
                                        //generalLedgerAccounId: this.partListData[i].generalLedgerAccounId,
                                        memo: this.partListData[i].memo,
                                        poPartSplitAddressId: childDataList[k].poPartSplitAddressId,
                                        poPartSplitUserTypeId: childDataList[k].poPartSplitUserTypeId,
                                        poPartSplitUserName: childDataList[k].poPartSplitUserName,
                                        poPartSplitAddress1: childDataList[k].poPartSplitAddress1,
                                        poPartSplitAddress2: childDataList[k].poPartSplitAddress2,
                                        poPartSplitAddress3: childDataList[k].poPartSplitAddress3,
                                        poPartSplitCity: childDataList[k].poPartSplitCity,
                                        poPartSplitState: childDataList[k].poPartSplitState,
                                        poPartSplitPostalCode: childDataList[k].poPartSplitPostalCode,
                                        poPartSplitCountry: childDataList[k].poPartSplitCountry,
                                        createdBy: this.userName,
                                        updatedBy: this.userName,
                                        //managementStructureId: this.partListData[i].managementStructureId,
                                        //createdBy: childDataList[k].createdBy,
                                        //updatedBy: childDataList[k].updatedBy,
                                        //createdDate: childDataList[k].createdDate,
                                        //updatedDate: childDataList[k].updatedDate,
                                        //isActive: childDataList[k].purchaseOrderPartRecordId,
                                        isParent: childDataList[k].isParent,
                                    }
                                    this.workFlowtService.savePurchaseorderpart(childobj).subscribe(saveddata2 => {
                                        this.savedPurchasedPart = saveddata2;

                                    })
                                }

                            }
                        }
                    });
                }
                else {
                    //alert("New");
                    let sendobj = {

                        //ifSplitShip: false,
                        //purchaseOrderPartRecordId: this.partListData[i].purchaseOrderPartRecordId,
                        purchaseOrderId: purId,
                        itemMasterId: this.partListData[i].itemMasterId,
                        serialNumber: this.partListData[i].serialNumber,
                        //nonInventory: this.partListData[i].nonInventory,
                        requisitionedBy: this.sourcePoApproval.requestedBy,
                        requisitionedDate: this.sourcePoApproval.requisitionedDate,
                        approver: this.sourcePoApproval.approver,
                        approvedDate: this.sourcePoApproval.dateApprovied,
                        needByDate: this.partListData[i].needByDate,
                        manufacturer: this.partListData[i].manufacturer,
                        status: this.sourcePoApproval.statusId,
                        trace: this.partListData[i].trace,
                        conditionCode: this.partListData[i].conditionCode,
                        uomId: this.partListData[i].uomId,
                        quantityOrdered: this.partListData[i].quantityOrdered,
                        unitCost: this.partListData[i].unitCost,
                        discountPerUnit: this.partListData[i].discountPerUnit,
                        discountCostPerUnit: this.partListData[i].discountCostPerUnit,
                        extendedCost: this.partListData[i].extendedCost,
                        transactionalCurrencyId: this.partListData[i].transactionalCurrencyId,
                        functionalCurrencyId: this.partListData[i].functionalCurrencyId,
                        foreignExchangeRate: this.partListData[i].foreignExchangeRate,
                        workOrderId: this.partListData[i].workOrderId,
                        repairOrderId: this.partListData[i].repairOrderId,
                        salesOrderId: this.partListData[i].salesOrderId,
                        generalLedgerAccounId: this.partListData[i].generalLedgerAccounId,
                        memo: this.partListData[i].memo,
                        poPartSplitAddressId: this.partListData[i].poPartSplitAddressId,
                        poPartSplitUserTypeId: this.partListData[i].poPartSplitUserTypeId,
                        poPartSplitUserName: this.partListData[i].poPartSplitUserName,
                        poPartSplitAddress1: this.partListData[i].poPartSplitAddress1,
                        poPartSplitAddress2: this.partListData[i].poPartSplitAddress2,
                        poPartSplitAddress3: this.partListData[i].poPartSplitAddress3,
                        poPartSplitCity: this.partListData[i].poPartSplitCity,
                        poPartSplitState: this.partListData[i].poPartSplitState,
                        poPartSplitPostalCode: this.partListData[i].poPartSplitPostalCode,
                        poPartSplitCountry: this.partListData[i].poPartSplitCountry,
                        managementStructureId: this.partListData[i].managementStructureId,
                        createdBy: this.userName,
                        updatedBy: this.userName,
                        //createdDate: this.partListData[i].createdDate,
                        //updatedDate: this.partListData[i].updatedDate,
                        //isActive: this.partListData[i].purchaseOrderPartRecordId,
                        isParent: this.partListData[i].isParent,

                    }
                    let childDataList = [];
                    if (this.partListData[i].childList) {
                        if (this.partListData[i].childList.length > 0) {
                            for (let j = 0; j < this.partListData[i].childList.length; j++) {

                                childDataList.push(this.partListData[i].childList[j])
                            }
                        }
                    }
                    this.workFlowtService.savePurchaseorderpart(sendobj).subscribe(saveddata1 => {
                        this.savedPurchasedPart = saveddata1;
                        if (childDataList.length > 0) {
                            for (let k = 0; k < childDataList.length; k++) {
                                let childobj = {
                                    //ifSplitShip: false,
                                    //purchaseOrderPartRecordId: this.childDataList[k].purchaseOrderPartRecordId,
                                    purchaseOrderId: purId,
                                    itemMasterId: this.partListData[i].itemMasterId,
                                    //serialNumber: this.partListData[i].serialNumber,
                                    //nonInventory: this.partListData[i].nonInventory,
                                    requisitionedBy: this.sourcePoApproval.requestedBy,
                                    requisitionedDate: this.sourcePoApproval.requisitionedDate,
                                    approver: this.sourcePoApproval.approver,
                                    approvedDate: this.sourcePoApproval.dateApprovied,
                                    needByDate: this.partListData[i].needByDate,
                                    manufacturer: this.partListData[i].manufacturer,
                                    status: this.sourcePoApproval.statusId,
                                    trace: this.partListData[i].trace,
                                    conditionCode: this.partListData[i].conditionCode,
                                    uomId: childDataList[k].uomId,
                                    quantityOrdered: childDataList[k].quantityOrdered,
                                    //unitCost: this.partListData[i].unitCost,
                                    //discountPerUnit: this.partListData[i].discountPerUnit,
                                    //discountCostPerUnit: this.partListData[i].discountCostPerUnit,
                                    //extendedCost: this.partListData[i].extendedCost,
                                    transactionalCurrencyId: this.partListData[i].transactionalCurrencyId,
                                    functionalCurrencyId: this.partListData[i].functionalCurrencyId,
                                    //foreignExchangeRate: this.partListData[i].foreignExchangeRate,
                                    //workOrderId: this.partListData[i].workOrderId,
                                    //repairOrderId: this.partListData[i].repairOrderId,
                                    //salesOrderId: this.partListData[i].salesOrderId,
                                    //generalLedgerAccounId: this.partListData[i].generalLedgerAccounId,
                                    memo: this.partListData[i].memo,
                                    poPartSplitAddressId: childDataList[k].poPartSplitAddressId,
                                    poPartSplitUserTypeId: childDataList[k].poPartSplitUserTypeId,
                                    poPartSplitUserName: childDataList[k].poPartSplitUserName,
                                    poPartSplitAddress1: childDataList[k].poPartSplitAddress1,
                                    poPartSplitAddress2: childDataList[k].poPartSplitAddress2,
                                    poPartSplitAddress3: childDataList[k].poPartSplitAddress3,
                                    poPartSplitCity: childDataList[k].poPartSplitCity,
                                    poPartSplitState: childDataList[k].poPartSplitState,
                                    poPartSplitPostalCode: childDataList[k].poPartSplitPostalCode,
                                    poPartSplitCountry: childDataList[k].poPartSplitCountry,
                                    createdBy: this.userName,
                                    updatedBy: this.userName,
                                    //managementStructureId: this.partListData[i].managementStructureId,
                                    //createdBy: childDataList[k].createdBy,
                                    //updatedBy: childDataList[k].updatedBy,
                                    //createdDate: childDataList[k].createdDate,
                                    //updatedDate: childDataList[k].updatedDate,
                                    //isActive: childDataList[k].purchaseOrderPartRecordId,
                                    isParent: childDataList[k].isParent,
                                }
                                this.workFlowtService.savePurchaseorderpart(childobj).subscribe(saveddata2 => {
                                    this.savedPurchasedPart = saveddata2;

                                })

                            }
                        }
                    });

                }
            }
            this.saveSuccessHelper(this.partListData[0])
        }
        if (this.partListData.length > 0 && this.workFlowtService.isEditMode == true) {
            //let index: number = 0;
            //index++;
            for (let i = 0; i < this.partListData.length; i++) {
                this.childDataList = [];
                let sendobj = {

                    //ifSplitShip: false,
                    //purchaseOrderPartRecordId: this.partListData[i].purchaseOrderPartRecordId,
                    purchaseOrderId: purId,
                    itemMasterId: this.partListData[i].itemMasterId,
                    serialNumber: this.partListData[i].serialNumber,
                    //nonInventory: this.partListData[i].nonInventory,
                    requisitionedBy: this.sourcePoApproval.requestedBy,
                    requisitionedDate: this.sourcePoApproval.requisitionedDate,
                    approver: this.sourcePoApproval.approver,
                    approvedDate: this.sourcePoApproval.dateApprovied,
                    needByDate: this.partListData[i].needByDate,
                    manufacturer: this.partListData[i].manufacturer,
                    status: this.sourcePoApproval.statusId,
                    trace: this.partListData[i].trace,
                    conditionCode: this.partListData[i].conditionCode,
                    uomId: this.partListData[i].uomId,
                    quantityOrdered: this.partListData[i].quantityOrdered,
                    unitCost: this.partListData[i].unitCost,
                    discountPerUnit: this.partListData[i].discountPerUnit,
                    discountCostPerUnit: this.partListData[i].discountCostPerUnit,
                    extendedCost: this.partListData[i].extendedCost,
                    transactionalCurrencyId: this.partListData[i].transactionalCurrencyId,
                    functionalCurrencyId: this.partListData[i].functionalCurrencyId,
                    foreignExchangeRate: this.partListData[i].foreignExchangeRate,
                    workOrderId: this.partListData[i].workOrderId,
                    repairOrderId: this.partListData[i].repairOrderId,
                    salesOrderId: this.partListData[i].salesOrderId,
                    generalLedgerAccounId: this.partListData[i].generalLedgerAccounId,
                    memo: this.partListData[i].memo,
                    poPartSplitUserTypeId: this.partListData[i].poPartSplitUserTypeId,
                    poPartSplitAddressId: this.partListData[i].poPartSplitAddressId,

                    poPartSplitUserName: this.partListData[i].poPartSplitUserName,
                    poPartSplitAddress1: this.partListData[i].poPartSplitAddress1,
                    poPartSplitAddress2: this.partListData[i].poPartSplitAddress2,
                    poPartSplitAddress3: this.partListData[i].poPartSplitAddress3,
                    poPartSplitCity: this.partListData[i].poPartSplitCity,
                    poPartSplitState: this.partListData[i].poPartSplitState,
                    poPartSplitPostalCode: this.partListData[i].poPartSplitPostalCode,
                    poPartSplitCountry: this.partListData[i].poPartSplitCountry,
                    managementStructureId: this.partListData[i].managementStructureId,
                    createdBy: this.userName,
                    updatedBy: this.userName,
                    //createdDate: this.partListData[i].createdDate,
                    //updatedDate: this.partListData[i].updatedDate,
                    //isActive: this.partListData[i].purchaseOrderPartRecordId,
                    isParent: this.partListData[i].isParent,

                }
                if (this.partListData[i].childList) {
                    if (this.partListData[i].childList.length > 0) {
                        for (let j = 0; j < this.partListData[i].childList.length; j++) {

                            this.childDataList.push(this.partListData[i].childList[j])
                        }
                    }
                }
                this.workFlowtService.savePurchaseorderpart(sendobj).subscribe(saveddata1 => {
                    this.savedPurchasedPart = saveddata1;
                    if (this.childDataList.length > 0) {
                        for (let k = 0; k < this.childDataList.length; k++) {
                            let childobj = {
                                //ifSplitShip: false,
                                //purchaseOrderPartRecordId: this.partListData[i].purchaseOrderPartRecordId,
                                purchaseOrderId: purId,
                                itemMasterId: this.partListData[i].itemMasterId,
                                //serialNumber: this.partListData[i].serialNumber,
                                //nonInventory: this.partListData[i].nonInventory,
                                requisitionedBy: this.sourcePoApproval.requestedBy,
                                requisitionedDate: this.sourcePoApproval.requisitionedDate,
                                approver: this.sourcePoApproval.approver,
                                approvedDate: this.sourcePoApproval.dateApprovied,
                                needByDate: this.partListData[i].needByDate,
                                manufacturer: this.partListData[i].manufacturer,
                                status: this.sourcePoApproval.statusId,
                                trace: this.partListData[i].trace,
                                conditionCode: this.partListData[i].conditionCode,
                                uomId: this.childDataList[k].uomId,
                                quantityOrdered: this.childDataList[k].quantityOrdered,
                                //unitCost: this.partListData[i].unitCost,
                                //discountPerUnit: this.partListData[i].discountPerUnit,
                                //discountCostPerUnit: this.partListData[i].discountCostPerUnit,
                                //extendedCost: this.partListData[i].extendedCost,
                                transactionalCurrencyId: this.partListData[i].transactionalCurrencyId,
                                functionalCurrencyId: this.partListData[i].functionalCurrencyId,
                                //foreignExchangeRate: this.partListData[i].foreignExchangeRate,
                                //workOrderId: this.partListData[i].workOrderId,
                                //repairOrderId: this.partListData[i].repairOrderId,
                                //salesOrderId: this.partListData[i].salesOrderId,
                                //generalLedgerAccounId: this.partListData[i].generalLedgerAccounId,
                                memo: this.partListData[i].memo,
                                poPartSplitAddressId: this.childDataList[k].poPartSplitAddressId,
                                poPartSplitUserTypeId: this.childDataList[k].poPartSplitUserTypeId,
                                poPartSplitUserName: this.childDataList[k].poPartSplitUserName,
                                poPartSplitAddress1: this.childDataList[k].poPartSplitAddress1,
                                poPartSplitAddress2: this.childDataList[k].poPartSplitAddress2,
                                poPartSplitAddress3: this.childDataList[k].poPartSplitAddress3,
                                poPartSplitCity: this.childDataList[k].poPartSplitCity,
                                poPartSplitState: this.childDataList[k].poPartSplitState,
                                poPartSplitPostalCode: this.childDataList[k].poPartSplitPostalCode,
                                poPartSplitCountry: this.childDataList[k].poPartSplitCountry,
                                createdBy: this.userName,
                                updatedBy: this.userName,
                                //managementStructureId: this.partListData[i].managementStructureId,
                                //createdBy: this.childDataList[k].createdBy,
                                //updatedBy: this.childDataList[k].updatedBy,
                                //createdDate: this.childDataList[k].createdDate,
                                //updatedDate: this.childDataList[k].updatedDate,
                                //isActive: this.childDataList[k].purchaseOrderPartRecordId,
                                isParent: this.childDataList[k].isParent,
                            }
                            this.workFlowtService.savePurchaseorderpart(childobj).subscribe(saveddata2 => {
                                this.savedPurchasedPart = saveddata2;

                            })

                        }
                    }
                });
            }
            this.saveSuccessHelper(this.partListData[0])
        }
    }
    getChildAddressValue(childobj, addressobj) {
        //debugger;

        //childobj["poPartSplitAddressId"] = addressobj.vendorShippingAddressId;

        childobj["poPartSplitAddress1"] = addressobj.address1;
        childobj["poPartSplitAddress2"] = addressobj.address2;
        childobj["poPartSplitAddress3"] = addressobj.address3;
        childobj["poPartSplitCity"] = addressobj.city;
        childobj["poPartSplitState"] = addressobj.stateOrProvince;
        childobj["poPartSplitPostalCode"] = addressobj.postalCode;
        childobj["poPartSplitCountry"] = addressobj.country;
    }

    filterNames(event) {

        this.customerNames = [];
        if (this.allCustomers) {
            if (this.allCustomers.length > 0) {
                for (let i = 0; i < this.allCustomers.length; i++) {
                    let name = this.allCustomers[i].name;
                    if (event.query) {
                        if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                            this.customerNamecoll.push([{
                                "customerId": this.allCustomers[i].customerId,
                                "name": name
                            }]),
                                this.customerNames.push(name);
                        }
                    }
                    else {
                        //if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                        this.customerNamecoll.push([{
                            "customerId": this.allCustomers[i].customerId,
                            "name": name
                        }]),
                            this.customerNames.push(name);
                        //}
                    }
                }
            }
        }
    }
    customereventHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {

                }
                else {

                }
            }

        }
    }
    onCustomerNameselected(partChildList, event) //Customer Ship Address Data
    {
        //debugger;
        for (let i = 0; i < this.customerNamecoll.length; i++) {
            if (event == this.customerNamecoll[i][0].name) {

                this.cusservice.getCustomerShipAddressGet(this.customerNamecoll[i][0].customerId).subscribe(returnedcusdata => {
                    this.spiltshipmentData = returnedcusdata[0];
                    partChildList["addressData"] = returnedcusdata[0];
                });


            }

        }

    }
    deleteSplitShipment(childata, index, mainindex) {

        //debugger;
        if (childata.purchaseOrderPartRecordId) {
            this.workFlowtService.deletePurchaseorderpart(childata.purchaseOrderPartRecordId).subscribe(data => {

            })
        }

        const index1: number = this.partListData.indexOf(index);

        this.partListData[mainindex].childList.splice(index, 1);


    }
    filterFirstNamesforshipto(event) {

        this.firstNamesShipTo = [];
        if (this.shipToContactData) {
            for (let i = 0; i < this.shipToContactData.length; i++) {
                let firstName = this.shipToContactData[i].firstName;

                if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.firstNamesShipTo.push(firstName);

                }
            }
        }
    }
    filterFirstNamesforshipto1(event) {

        this.firstNamesShipTo1 = [];
        if (this.vendorContactsForshipTo) {
            for (let i = 0; i < this.vendorContactsForshipTo.length; i++) {
                let firstName = this.vendorContactsForshipTo[i].firstName;

                if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.firstNamesShipTo1.push(firstName);

                }
            }
        }
    }
    filterFirstNamesforbillto(event) {

        this.firstNamesbillTo = [];
        if (this.shipToContactData) {
            for (let i = 0; i < this.shipToContactData.length; i++) {
                let firstName = this.shipToContactData[i].firstName;

                if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.firstNamesbillTo.push(firstName);

                }
            }
        }
    }
    filterFirstNamesforbillto1(event) {

        this.firstNamesbillTo1 = [];
        if (this.vendorContactsForBillTO) {
            for (let i = 0; i < this.vendorContactsForBillTO.length; i++) {
                let firstName = this.vendorContactsForBillTO[i].firstName;

                if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.firstNamesbillTo1.push(firstName);

                }
            }
        }
    }
    onBillToCustomerNameselected(event) {
        //debugger;
        for (let i = 0; i < this.customerNamecoll.length; i++) {
            if (event == this.customerNamecoll[i][0].name) {

                this.cusservice.getCustomerShipAddressGet(this.customerNamecoll[i][0].customerId).subscribe(
                    returnddataforbill => {
                        this.billToCusData = returnddataforbill[0];
                    });
                this.workFlowtService.getContacts(this.customerNamecoll[i][0].customerId).subscribe(data => {
                    //debugger;
                    this.shipToContactData = data[0];
                });
            }
        }

    }
    onshipCustomerNameselected(event) {
        //debugger;
        for (let i = 0; i < this.customerNamecoll.length; i++) {
            if (event == this.customerNamecoll[i][0].name) {

                this.cusservice.getCustomerShipAddressGet(this.customerNamecoll[i][0].customerId).subscribe(
                    returnddataforbill => {
                        this.shipToCusData = returnddataforbill[0];
                    });
                this.workFlowtService.getContacts(this.customerNamecoll[i][0].customerId).subscribe(data => {
                    //debugger;
                    this.billToContactData = data[0];
                });
            }
        }

    }

    private onaddressDataLoadSuccessful(allWorkFlows: any) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.addressData = allWorkFlows;

    }


    private loadManagementdata() {


        this.workFlowtService1.getManagemententity().subscribe(
            results => this.onManagemtntdataLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );



    }


    siteValueChange(data) //Site Valu Selection in Form
    {


        this.warehouseService.getAddressDate(data).subscribe( //calling and Subscribing for Address Data
            results => this.addressDataArray(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    siteValueChange1(data1) //Site Valu Selection in Form
    {


        this.warehouseService.getAddressDate(data1).subscribe( //calling and Subscribing for Address Data
            results => this.addressDataArrayBill(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    addressDataArrayBill(Bill: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.billToAddress = Bill;
        if (Bill) {
            this.allAddress = Bill;
            this.address1 = Bill.address1;
            //this.address2 = data.address2;
            //this.address3 = data.address3;
            this.city = Bill.city;
            this.country = Bill.country;
            this.postalCode = Bill.postalCode;
            this.stateOrProvince = Bill.stateOrProvince;
        }
    }

    openSiteedit(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.modal = this.modalService.open(content, { size: 'lg' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })

    }

    addressDataArray(data: any) //Getting Address
    {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.shipToAddress = data;
        if (data) {
            this.allAddress = data;
            this.address1 = data.address1;
            //this.address2 = data.address2;
            //this.address3 = data.address3;
            this.city = data.city;
            this.country = data.country;
            this.postalCode = data.postalCode;
            this.stateOrProvince = data.stateOrProvince;
        }
        //Storing Address Details

    }

    private onManagemtntSitedataLoad(managementSiteData: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allManagementSiteData = managementSiteData;
    }

    private onManagemtntdataLoad(getAtaMainList: any[]) {


        this.allManagemtninfo = getAtaMainList;
        if ((this.gridData) && (this.gridData.length == 0)) {
            this.gridData = this.makeNestedObj1(this.allManagemtninfo, this.companyId);
        }
        if (this.allManagemtninfo) {
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                this.copyOfAllManagemtninfo.push(JSON.parse(JSON.stringify(this.allManagemtninfo[i])));
            }
        }
        for (let i = 0; i < this.allManagemtninfo.length; i++) {

            if (this.allManagemtninfo[i].parentId == null) {
                this.bulist = [];
                this.departmentList = [];
                this.divisionlist = [];

                this.maincompanylist.push(this.allManagemtninfo[i]);
                this.mainPartcompanylist.push(this.allManagemtninfo[i]);

                this.sourcePoApproval.buid1 = null;
                this.partList.buid1 = null;
            }


        }


    }
    getBUList(masterCompanyId) {
        this.sourcePoApproval.managementStructureEntityId = masterCompanyId; //Saving Management Structure Id if there Company Id

        this.bulist = [];
        this.departmentList = [];
        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == masterCompanyId) {
                this.bulist.push(this.allManagemtninfo[i]);
            }
        }

        this.sourcePoApproval.buid1 = null;

        console.log(this.bulist);

    }

    getPartBUList(masterCompanyId) {
        this.partList.managementStructureEntityId = masterCompanyId; //Saving Management Structure Id if there Company Id

        this.partBulist = [];
        this.partDepartmentList = [];
        this.partDivisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == masterCompanyId) {
                this.partBulist.push(this.allManagemtninfo[i]);
            }
        }

        this.partList.buid1 = null;

        console.log(this.bulist);

    }

    getPartDepartmentlist(buid) {
        this.partList.managementStructureEntityId = buid; //Saving Management Structure Id if there Company Id

        this.partDepartmentList = [];
        this.partDivisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == buid) {
                this.partDepartmentList.push(this.allManagemtninfo[i]);
            }
        }
        this.partList.depid1 = null;
        console.log(this.departmentList);
    }

    getPartDivisionlist(depid) {
        this.partList.managementStructureEntityId = depid; //Saving Management Structure Id if there Company Id

        this.partDivisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == depid) {
                this.partDivisionlist.push(this.allManagemtninfo[i]);
            }
        }

        console.log(this.divisionlist);
    }

    getPartDivisionChangeManagementCode(divisionId) {
        this.partList.managementStructureEntityId = divisionId;
    }

    getDepartmentlist(buid) {
        this.sourcePoApproval.managementStructureEntityId = buid; //Saving Management Structure Id if there Company Id

        this.departmentList = [];
        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == buid) {
                this.departmentList.push(this.allManagemtninfo[i]);
            }
        }

        this.sourcePoApproval.depid1 = null;

        console.log(this.departmentList);
    }

    getDivisionlist(depid) {
        this.sourcePoApproval.managementStructureEntityId = depid; //Saving Management Structure Id if there Company Id

        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == depid) {
                this.divisionlist.push(this.allManagemtninfo[i]);
            }
        }

        this.sourcePoApproval.divid1 = true;

        console.log(this.divisionlist);
    }

    getDivisionChangeManagementCode(obj) {
        this.sourcePoApproval.managementStructureEntityId = obj;
    }
    private onprioritySuccessful(getPriorityList: any[]) {

        this.allPriorityInfo = getPriorityList;
    }
    private onDataLoadFailed(error: any) {


    }


    private loadCreditTermsData() {
        // debugger;

        this.CreditTermsService.getCreditTermsList().subscribe(
            results => this.onCreditTermsdata(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }
    private onCreditTermsdata(getCreditTermsList: any[]) {


        this.allcreditTermInfo = getCreditTermsList;
    }

    getValue(data) {
        //debugger;
        this.issuedToAddress = data;
        console.log(data);
    }
    getPartValue(parentdata, data) {
        //debugger;
        this.partWithId = [];
        this.itemTypeId = 1;
        this.workFlowtService.getPartDetailsWithid(data).subscribe(
            data1 => {
                if (data1[0][0]) {
                    this.partWithId = data1[0][0];
                    parentdata.partAlternatePartId = this.partWithId.partAlternatePartId;
                    parentdata.partId = this.partWithId.partId;
                    parentdata.partdescription = this.partWithId.description;
                    parentdata.partNumber = this.partWithId.partNumber;
                    parentdata.itemTypeId = this.partWithId.itemTypeId;
                    parentdata.name = this.partWithId.name;
                    parentdata.itemMasterId = this.partWithId.itemMasterId;
                }

            })
        console.log(this.partWithId);
    }
    getPartValueForPart(parentdata, data) {
        //debugger;
        this.partWithId = [];
        this.itemTypeId = 1;
        this.workFlowtService.getPartDetailsWithidForSinglePart(data).subscribe(
            data1 => {
                if (data1[0][0]) {
                    this.partWithId = data1[0][0];
                    parentdata.partAlternatePartId = this.partWithId.partAlternatePartId;
                    parentdata.partId = this.partWithId.partId;
                    parentdata.partdescription = this.partWithId.description;
                    parentdata.partNumber = this.partWithId.partNumber;
                    parentdata.itemTypeId = this.partWithId.itemTypeId;
                    parentdata.name = this.partWithId.name;
                    parentdata.itemMasterId = this.partWithId.itemMasterId;
                    parentdata.glAccountId = this.partWithId.glAccountId;
                    parentdata.shortName = this.partWithId.shortName;
                }

            })
        console.log(this.partWithId);
    }
    getMultiplParts(parentdata, data) {
        //debugger;
        this.partWithId = [];
        this.itemTypeId = 1;
        //this.workFlowtService.getPartDetailsWithid(data).subscribe(
        //	data1 => {
        if (data) {
            this.partWithId = data;
            parentdata.partAlternatePartId = this.partWithId.partAlternatePartId;
            parentdata.partId = this.partWithId.partId;
            parentdata.partdescription = this.partWithId.description;
            parentdata.partNumber = this.partWithId.partNumber;
            parentdata.itemTypeId = this.partWithId.itemTypeId;
            parentdata.name = this.partWithId.name;
            parentdata.itemMasterId = this.partWithId.itemMasterId;
        }

        //})
        console.log(this.partWithId);
    }
    private loadConditionData() {
        //debugger;

        this.conditionService.getConditionList().subscribe(data => {
            this.allconditioninfo = data[0];
        })


    }
    private loadUOMData() {


        this.unitofmeasureService.getUnitOfMeasureList().subscribe(uomdata => {
            this.allUomdata = uomdata[0];
        })


    }

    private loadPartListData() {
        if (this.workFlowtService.selectedPoCollection) {
            if (this.workFlowtService.selectedPoCollection.length > 0) {
                this.unitofmeasureService.getUnitOfMeasureList().subscribe(uomdata => {
                    this.allUomdata = uomdata[0];
                });
            }
            else {
                let parentObj = this.defaultPartListObj(true);
                //parentObj["childList"] = [this.emptyPartListObj(false)];
                this.partListData = [parentObj];
            }
        } else {
            let parentObj = this.defaultPartListObj(true);
            //parentObj["childList"] = [this.emptyPartListObj(false)];
            this.partListData = [parentObj];
        }
    }

    getCheckboxvalue(partList) {
        if (partList["ifSplitShip"]) {
            if (partList["itemMasterId"]) {
                if (partList["childList"].length == 0)
                    this.addRow(partList);
            } else {
                partList["ifSplitShip"] = false;
                alert("please select Part Number");
            }
        }
    }

    addAvailableParts() {
        this.partListData.splice(0, 1);

        for (let i = 0; i < this.returnPartsListArray.length; i++) {

            this.partListData.push(this.defaultPartListObj(true));
            this.getMultiplParts(this.partListData[i], this.returnPartsListArray[i])
        }
        this.modal.close();
    }
    addPartNumber() {
        //this.itemTypeId=0;
        this.partListData.push(this.defaultPartListObj(true));
    }

    addRow(partList) {
        if (partList["isParent"])
            partList["childList"].push(this.defaultPartListObj(false, partList));
    }
    private defaultPartListObj(isParent = true, parentObj = null) {
        let partListObj = {
            ifSplitShip: false,
            purchaseOrderPartRecordId: '',
            purchaseOrderId: '',
            itemMasterId: '',
            serialNumber: '',
            nonInventory: '',
            requisitionedBy: '',
            requisitionedDate: '',
            approver: '',
            approvedDate: '',
            needByDate: '',
            manufacturer: '',
            status: '',
            trace: '',
            conditionCode: '',
            uomId: '',
            quantityOrdered: '',
            unitCost: '',
            discountPerUnit: '',
            discountCostPerUnit: '',
            extendedCost: '',
            transactionalCurrencyId: '',
            functionalCurrencyId: '',
            foreignExchangeRate: '',
            workOrderId: '',
            repairOrderId: '',
            salesOrderId: '',
            generalLedgerAccounId: '',
            memo: '',
            poPartSplitAddressId: '',
            poPartSplitUserTypeId: '',
            poPartSplitUserName: '',
            poPartSplitAddress1: '',
            poPartSplitAddress2: '',
            poPartSplitAddress3: '',
            poPartSplitCity: '',
            poPartSplitState: '',
            poPartSplitPostalCode: '',
            poPartSplitCountry: '',
            managementStructureId: '',
            createdBy: '',
            updatedBy: '',
            createdDate: '',
            updatedDate: '',
            isActive: '',
            isParent: isParent,
            partListObj: this.allPartDetails,
            itemTypeId: ''
        }
        if (isParent) {
            partListObj["childList"] = [];//this.emptyPartListObj(false)
        } else if (parentObj) {
            partListObj["partId"] = parentObj["partId"];
            partListObj["partId"] = parentObj["partId"];
            //partListObj["poPartSplitUserTypeId"] = parentObj["poPartSplitUserTypeId"];
            //partListObj["poPartSplitUserName"] = parentObj["poPartSplitUserName"];
            //partListObj["poPartSplitAddress1"] = parentObj["poPartSplitAddress1"];
            //partListObj["poPartSplitAddress2"] = parentObj["poPartSplitAddress2"];
            //partListObj["poPartSplitAddress3"] = parentObj["poPartSplitAddress3"];
            //partListObj["poPartSplitCity"] = parentObj["poPartSplitCity"];
            //partListObj["poPartSplitState"] = parentObj["poPartSplitState"];
            //partListObj["poPartSplitPostalCode"] = parentObj["poPartSplitPostalCode"];
            //partListObj["poPartSplitCountry"] = parentObj["poPartSplitCountry"];
            //partListObj["needByDate"] = parentObj["needByDate"];
            //partListObj["quantityOrdered"] = parentObj["quantityOrdered"];
            partListObj["itemTypeId"] = parentObj["itemTypeId"];
        }
        return partListObj;
    }

    private loadCurrencyData() {
        // debugger;


        this.currencyService.getCurrencyList().subscribe(currencydata => {
            this.allCurrencyData = currencydata[0];
        })


    }
    getValueforShipTo(data) {
        this.shipToAddress = data;
        if (data.customerShippingAddressId) {
            this.sourcePoApproval.shipToAddressId = data.customerShippingAddressId;
        }
        else {
            this.sourcePoApproval.shipToAddressId = data.vendorShippingAddressId;
        }
        console.log(data);
    }

    getValueforBillTo(data) {
        this.billToAddress = data;
        if (data.customerShippingAddressId) {
            this.sourcePoApproval.billToAddressId = data.customerShippingAddressId;
        }
        else {
            this.sourcePoApproval.billToAddressId = data.vendorShippingAddressId;
        }
        console.log(data);
    }

    onVendorselected(partChildList, event) //Calling For Vendor Ship Data
    {
        //debugger;
        this.showInput = true;
        for (let i = 0; i < this.VendorNamecoll.length; i++) {
            if (event == this.VendorNamecoll[i][0].vendorName) {
                this.workFlowtService.getVendorShipAddressGet(this.VendorNamecoll[i][0].vendorId).subscribe(
                    returdaa => {
                        this.vendorSelectedforSplit = returdaa[0];
                        partChildList["addressData"] = returdaa[0];;
                    })
            }

        }

    }
    onVendorselectedForShipTo(event) {
        //debugger;
        this.showInput = true;
        for (let i = 0; i < this.VendorNamecoll.length; i++) {
            if (event == this.VendorNamecoll[i][0].vendorName) {
                this.workFlowtService.getVendorShipAddressGet(this.VendorNamecoll[i][0].vendorId).subscribe(
                    returdaa => {
                        this.vendorSelected = returdaa[0];
                    })
                this.workFlowtService.getContacts(this.VendorNamecoll[i][0].vendorId).subscribe(
                    returdaa => {
                        this.vendorContactsForshipTo = returdaa[0];
                    })
            }

        }

    }
    onVendorselectedForBillTo(event) {
        //debugger;
        this.showInput = true;
        for (let i = 0; i < this.VendorNamecoll.length; i++) {
            if (event == this.VendorNamecoll[i][0].vendorName) {
                this.workFlowtService.getVendorShipAddressGet(this.VendorNamecoll[i][0].vendorId).subscribe(
                    returdaa => {
                        this.vendorSelectedForBillTo = returdaa[0];
                    })
                this.workFlowtService.getContacts(this.VendorNamecoll[i][0].vendorId).subscribe(
                    returdaa => {
                        this.vendorContactsForBillTO = returdaa[0];
                    })
            }

        }

    }

    eventHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {
                    //alert("Action Name already Exists");
                    this.disableSaveVenderName = true;
                    this.disableSaveVenName = true;
                }
                else {
                    this.disableSaveVenderName = false;
                    this.disableSaveVenName = false;
                }
            }

        }
    }

    filterVendorNames(event) {

        this.vendorNames = [];
        if (this.allActions) {
            for (let i = 0; i < this.allActions.length; i++) {
                let vendorName = this.allActions[i].vendorName;
                if (event.query) {
                    if (vendorName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                        //this.vendorNames.push(vendorName);
                        this.VendorNamecoll.push([{
                            "vendorId": this.allActions[i].vendorId,
                            "vendorName": vendorName
                        }]),
                            this.vendorNames.push(vendorName);
                    }
                }
                else {
                    //if (vendorName.toLowerCase().indexOf(event.toLowerCase()) == 0) {
                    //this.vendorNames.push(vendorName);
                    this.VendorNamecoll.push([{
                        "vendorId": this.allActions[i].vendorId,
                        "vendorName": vendorName
                    }]),
                        this.vendorNames.push(vendorName);
                    //}
                }
            }
        }
    }

    private onDataLoadSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = allWorkFlows;
        this.allActions = allWorkFlows;
        if (this.sourcePoApproval.billToUserType == 1) {
            this.onBillToCustomerNameselected(this.sourcePoApproval.billToUserName);
        }
        if (this.sourcePoApproval.billToUserType == 2) {
            this.onVendorselectedForBillTo(this.sourcePoApproval.billToUserName);
        }
        if (this.sourcePoApproval.shipToUserType == 1) {
            this.onshipCustomerNameselected(this.sourcePoApproval.shipToUserName);
        }
        if (this.sourcePoApproval.shipToUserType == 2) {
            this.onVendorselectedForShipTo(this.sourcePoApproval.shipToUserName);
        }

        if (this.sourcePoApproval.billToUserType == 1) {
            this.filterNames(this.sourcePoApproval.billToUserName);
        }
        if (this.sourcePoApproval.billToUserType == 2) {
            this.filterVendorNames(this.sourcePoApproval.billToUserName);
        }
        if (this.sourcePoApproval.shipToUserType == 1) {
            this.filterNames(this.sourcePoApproval.shipToUserName);
        }
        if (this.sourcePoApproval.shipToUserType == 2) {
            this.filterVendorNames(this.sourcePoApproval.shipToUserName);
        }

    }
    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );


    }

    private loadPartData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getPartDetails().subscribe(
            data => {
                this.allPartDetails = data[0];
                this.loadPartListData();
                if (this.workFlowtService.isEditMode == false) {

                    for (let i = 0; i < this.partListData.length; i++) {
                        this.partListData[i].partListObj = this.allPartDetails;
                    }
                }
            })



    }
    eventvendorHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedVendorCode) {
                if (value == this.selectedVendorCode.toLowerCase()) {
                    //alert("Action Name already Exists");
                    this.disableSaveVenName = true;
                    this.disableSaveVenderName = true;

                }
                else {
                    this.disableSaveVenName = false;
                    this.disableSaveVenderName = false;

                }
            }

        }


    }

    onVendorCodeselected(event) {
        //debugger;

        for (let i = 0; i < this.VendorCodesColl.length; i++) {
            if (event == this.VendorCodesColl[i][0].vendorCode) {

                this.disableSaveVenName = true;
                this.disableSaveVenderName = true;
                this.selectedVendorCode = event;
            }
        }
        console.log(this.allSelectedParts);
    }

    filterVendorCodes(event) {

        this.vendorCodes = [];
        for (let i = 0; i < this.allActions.length; i++) {
            let vendorCode = this.allActions[i].vendorCode;

            if (vendorCode.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                //this.vendorCodes.push(vendorCode);
                this.VendorCodesColl.push([{
                    "vendorId": this.allActions[i].vendorClassificationId,
                    "vendorCode": vendorCode
                }]),
                    this.vendorCodes.push(vendorCode);

            }
        }
    }

    private ongeneralDataLoadSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = allWorkFlows;
        this.allgeneralInfo = allWorkFlows;
        //this.vendorname = this.allgeneralInfo[0].vendorName;
        //this.vendorCode = this.allgeneralInfo[0].vendorCode;
        //console.log(this.allgeneralInfo);
    }

    openClassification(content) {
        this.sourceissued = {};
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceissued.isActive = true;

        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })




    }

    addMultiplePartNumbers(content) {


        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })




    }
    openedit(childdata, content) {
        if (childdata.poPartSplitUserTypeId == 1) {
            alert("customer");
        } else if (childdata.poPartSplitUserTypeId == 2) {
            alert("Vendor");
        }
        else if (childdata.poPartSplitUserTypeId == 3) {
            alert("company");
        }
        this.sourceissued = {};
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceissued.isActive = true;

        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })




    }
    openeditmodel(content) {
        this.sourceissued = {};
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceissued.isActive = true;

        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })




    }
    openEditissued(content, selectedValue1) {

        this.isEditMode = true;
        this.sourceissued = selectedValue1;
        this.loadMasterCompanies();
        this.sourceissued.isActive = true;
        this.isSaving = true;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })




    }

    openEditissued1(content, selectedValue2) {

        this.isEditMode = true;
        this.sourceissued = selectedValue2;
        this.loadMasterCompanies();
        this.sourceissued.isActive = true;
        this.isSaving = true;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })




    }
    opencloseissued(content, selectedValue) {

        this.isEditMode = true;
        this.sourceissued = selectedValue;
        this.loadMasterCompanies();
        this.sourceissued.isActive = true;
        this.isSaving = true;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })




    }
    private loadMasterCompanies() {


        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.masterComapnyService.getMasterCompanies().subscribe(
            results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allComapnies = allComapnies;

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


    }

    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

    private saveSuccessHelper(role?: any) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

        this.loadData();

    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }


    editItemAndCloseModel() {
        this.isSaving = true;
        if (!(this.sourceissued.siteName && this.sourceissued.address1 && this.sourceissued.city &&
            this.sourceissued.stateOrProvince && this.sourceissued.postalCode && this.sourceissued.country
        )) {
            this.display = true;
            this.modelValue = true;
        }
        if (this.sourceissued.siteName && this.sourceissued.address1 && this.sourceissued.city &&
            this.sourceissued.stateOrProvince && this.sourceissued.postalCode && this.sourceissued.country) {
            //if (!this.sourcePoApproval.vendorId) {
            //if (!this.sourcePoApproval) {
            this.sourceissued.createdBy = this.userName;
            this.sourceissued.updatedBy = this.userName;
            this.sourceissued.masterCompanyId = 1;
            //	this.sourcePoApproval.isActive = true;
            this.sourceissued.vendorId = this.sourcePoApproval.vendorId;
            this.workFlowtService.newShippingAdd(this.sourceissued).subscribe(data => {
                this.localCollection = data;
                this.loadData();
                this.savesuccessCompleted(this.sourceissued);
                //this.updateVendorShippingAddress(this.localCollection);

            })


        }
        this.modal.close();
    }

    editItemAndModel() {
        this.isSaving = true;
        if (!(this.sourceissued.siteName && this.sourceissued.address1 && this.sourceissued.city &&
            this.sourceissued.stateOrProvince && this.sourceissued.postalCode && this.sourceissued.country
        )) {
            this.display = true;
            this.modelValue = true;
        }
        if (this.sourceissued.siteName && this.sourceissued.address1 && this.sourceissued.city &&
            this.sourceissued.stateOrProvince && this.sourceissued.postalCode && this.sourceissued.country) {
            //if (!this.sourcePoApproval.vendorId) {
            //if (!this.sourcePoApproval) {
            this.sourceissued.createdBy = this.userName;
            this.sourceissued.updatedBy = this.userName;
            this.sourceissued.masterCompanyId = 1;
            //	this.sourcePoApproval.isActive = true;
            this.sourceissued.vendorId = this.sourcePoApproval.vendorId;
            this.workFlowtService.newShippingAdd(this.sourceissued).subscribe(data => {
                this.localCollection = data;
                this.loadData();
                this.savesuccessCompleted(this.sourceissued);
                //this.updateVendorShippingAddress(this.localCollection);

            })



        }
        this.modal.close();
    }

    editItemModel() {
        this.isSaving = true;
        if (!(this.sourceissued.siteName && this.sourceissued.address1 && this.sourceissued.city &&
            this.sourceissued.stateOrProvince && this.sourceissued.postalCode && this.sourceissued.country
        )) {
            this.display = true;
            this.modelValue = true;
        }
        if (this.sourceissued.siteName && this.sourceissued.address1 && this.sourceissued.city &&
            this.sourceissued.stateOrProvince && this.sourceissued.postalCode && this.sourceissued.country) {
            //if (!this.sourcePoApproval.vendorId) {
            //if (!this.sourcePoApproval) {
            this.sourceissued.createdBy = this.userName;
            this.sourceissued.updatedBy = this.userName;
            this.sourceissued.masterCompanyId = 1;
            //	this.sourcePoApproval.isActive = true;
            this.sourceissued.vendorId = this.sourcePoApproval.vendorId;
            this.workFlowtService.newShippingAdd(this.sourceissued).subscribe(data => {
                this.localCollection = data;
                this.loadData();
                this.savesuccessCompleted(this.sourceissued);
                //this.updateVendorShippingAddress(this.localCollection);

            })



        }

        this.modal.close();
    }
    updateissued() {
        //debugger;
        this.isEditMode = true;
        this.sourcePoApproval.isActive = true;
        this.sourceissued.updatedBy = this.userName;

        this.sourcePoApproval.masterCompanyId = 1;
        this.workFlowtService.updateshippinginfo(this.sourceissued).subscribe(data => {
            this.updatedCollection = data;
            this.loadData();



        })
        this.modal.close();
    }

    private savesuccessCompleted(user?: any) {
        this.isSaving = false;


        this.alertService.showMessage("Success", `Action was added successfully`, MessageSeverity.success);



        this.loadData();
    }


    filterfirstName(event) {

        this.firstCollection = [];
        for (let i = 0; i < this.allEmployeeinfo.length; i++) {
            let firstName = this.allEmployeeinfo[i].firstName;
            if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.firstCollection.push(firstName);
            }
        }
    }

    Manufacturerdescription(event) {
        //
        if (this.allSites) {

            for (let i = 0; i < this.actionamecolle.length; i++) {
                if (event == this.actionamecolle[i][0].siteName) {
                    //this.sourceSite.name = this.allSites[i][0].name;
                    this.disableSaveManufacturer = true;

                    this.selectedSite = event;
                }

            }
        }
    }

    ManufacturerHandler(event) //auto suzition start hear and value will pass to 
    {

        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedSite) {
                if (value == this.selectedSite.toLowerCase()) {
                    //alert("Action Name already Exists");
                    this.disableSaveManufacturer = true;
                }
                else {
                    this.disableSaveManufacturer = false;

                }
            }

        }
    }

    filtermanufacturer(event) // will call when we click droup down button
    {

        this.localCollection = [];
        for (let i = 0; i < this.allSites.length; i++) {
            let siteName = this.allSites[i].name;
            if (siteName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.actionamecolle.push([{
                    "siteId": this.allSites[i].siteId,
                    "siteName": siteName
                }]),
                    this.localCollection.push(siteName)

            }
        }
    }
    private employeedata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.employeeService.getEmployeeList().subscribe(
            results => this.onempDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );



        this.selectedColumns = this.cols;

    }

    private onempDataLoadSuccessful(getEmployeeCerficationList: any[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = getEmployeeCerficationList;
        this.allEmployeeinfo = getEmployeeCerficationList;
    }

    saveSiteItemAndCloseModel() {
        this.sourceSite.createdBy = this.userName;
        this.sourceSite.updatedBy = this.userName;
        this.sourceSite.masterCompanyId = 1;
        this.sourceSite.name = this.name;
        this.siteService.newSite(this.sourceSite).subscribe(data => {
            this.siteInfo = data;
            if (data != null) {
                this.saveManagement(data.siteId, this.companyId, 1); //pushing Site Management Need Site Value so after getting SiteId we are calling

            }
            //retrive after enter siteid get and submit managementsite


        })
    }

    public saveManagement(siteId, data1, MasterCompanyId) //retriving SiteManagement Array
    {
        debugger;
        let Data = [{
            SiteId: siteId,
            ManagementStructureId: data1,
            MasterCompanyId: MasterCompanyId
        }]
        this.data1.push(Data);


        this.siteService.newManagementSite(this.data1[0][0]).subscribe(data11 => {
            this.localManagementSiteCollection = data11; //local SiteManagement Data
            this.getBUList1(this.companyId);
        })

        this.dismissModel();
    }


    quantityValueChange(event) {
        this.orderQuantity = event;
    }

   BUList(obj) {
        obj.managementStructureEntityId = obj.companyId; //Saving Management Structure Id if there Company Id

        this.bulist = [];
        this.departmentList = [];
        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == obj.companyId) {
                this.bulist.push(this.allManagemtninfo[i]);
            }
        }

        if (this.bulist.length > 0) {
            this.BuHasData = true;
        }

        console.log(this.bulist);

    }

    Departmentlist(obj) {
        obj.managementStructureEntityId = obj.businessUnitId;

        this.departmentList = [];
        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == obj.businessUnitId) {
                this.departmentList.push(this.allManagemtninfo[i]);
            }
        }

        if (this.departmentList.length > 0) {
            this.DepaHasData = true;
        }

        console.log(this.departmentList);
    }

   Divisionlist(obj) {
       obj.managementStructureEntityId = obj.departmentId;

        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == obj.departmentId) {
                this.divisionlist.push(this.allManagemtninfo[i]);
            }
        }

        if (this.divisionlist.length > 0) {
            this.divHasData = true;
        }

        console.log(this.divisionlist);
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

    private onDataLoadWareHouse(getWarehousList: any) { //Storing WareHouse Data

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allWareHouses = getWarehousList; //cha
        //this.warehouseId = this.allWareHouses.warehouseId;

    }

    private onmanufacturerSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = allWorkFlows;
        this.allManufacturerInfo = allWorkFlows;
    }

    loadManufacturerData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.manufacturerService.getWorkFlows().subscribe(
            results => this.onmanufacturerSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
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
        //this.dataSource.data = getSiteList; //need
        this.allSites = getSiteList; //Contain first array of Loaded table Data will put in Html as [value]
    }
    wareHouseValueChange(data) {

        data.allLocations = [];
        data.allShelfs = [];
        data.allBins = [];

        data.locationId = 0;
        data.shelfId = 0;
        data.binId = 0;



        this.binservice.getLocationDate(data.warehouseId).subscribe(locationdata => { data.allLocations = locationdata})
       
    }
    private onDataLoadLocation(getLocationList: any) { //Storing WareHouse Data

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allLocations = getLocationList; //cha
        //this.locationId = this.allWareHouses.locationId;

    }

    locationValueChange(data) {
        data.allShelfs = [];
        data.allBins = [];


        data.shelfId = 0;
        data.binId = 0;

        this.binservice.getShelfDate(data.locationId).subscribe(shelfdata => { data.allShelfs = shelfdata})
        
    }
    private onDataLoadShelf(getShelfList: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allShelfs = getShelfList; //cha
    }



    shelfValueChange(data) {
        data.allBins = [];


        data.binId = 0;

        this.binservice.getBinDataById(data.shelfId).subscribe(bindata => { data.allBins=bindata})
    }
    private onDataLoadBin(getBinList: any) {
        this.loadingIndicator = false;
        this.allBins = getBinList; //cha
    }

    binValueSelect(data) { }


    private customerList() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.customerService.getWorkFlows().subscribe(
            results => this.onCustomerDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onCustomerDataLoadSuccessful(allCustomerFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
       //// this.dataSource.data = allCustomerFlows;
        this.allCustomer = allCustomerFlows;

    }

    private vendorList() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.vendorService.getVendorList().subscribe(
            results => this.onVendorDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private onVendorDataLoadSuccessful(allVendorWorkFlows: any[]) {
        //debugger;
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
      //  this.dataSource.data = allVendorWorkFlows;
        this.allVendorList = allVendorWorkFlows;


    }
}


//this.testData = this.makeNestedObj(this.allManagemtninfo, true);
				//for (let i = 0; i < this.workFlowtService.selectedPoCollection.length; i++) {
				//	if (this.workFlowtService.selectedPoCollection[i].pop.isParent == true) {
				//		this.partListData.push(this.workFlowtService.selectedPoCollection[i].pop)
				//		this.partListData[i].partId = workFlowtService.selectedPoCollection[i].partId;
				//		this.partListData[i].partdescription = workFlowtService.selectedPoCollection[i].description;
				//		this.partListData[i].itemTypeId = workFlowtService.selectedPoCollection[i].itemTypeId;
				//		this.partListData[i].name = workFlowtService.selectedPoCollection[i].name;
				//		this.partListData[i].glAccountId = workFlowtService.selectedPoCollection[i].glAccountId;
				//		this.partListData[i].serialNumber = workFlowtService.selectedPoCollection[i].serialNumber;
				//		this.partListData[i].partNumber = workFlowtService.selectedPoCollection[i].partNumber;
				//		//this.partListData[i]["childList"] = [];

				//	}
				//	if (i == this.workFlowtService.selectedPoCollection.length - 1) {
				//		alert("over")
				//		for (let j = 0; j < this.partListData.length; j++) {
				//		for (let m = 0; m < this.workFlowtService.selectedPoCollection.length; m++) {

				//			if (this.workFlowtService.selectedPoCollection[m].pop.isParent == false) {
				//				if (this.partListData[j].itemMasterId == this.workFlowtService.selectedPoCollection[m].pop.itemMasterId) {
				//					this.partListData[j]["childList"] = [];
				//					this.partListData[j].ifSplitShip = true;
				//					this.workFlowtService.selectedPoCollection[m].pop.itemTypeId = workFlowtService.selectedPoCollection[m].itemTypeId;
				//					this.partListData[j]["childList"].push(this.workFlowtService.selectedPoCollection[m].pop);
				//					//this.partListData[j]["childList"].itemTypeId = workFlowtService.selectedPoCollection[i].itemTypeId;

				//				}
				//			}
				//			}
				//		}
				//	}

				//}