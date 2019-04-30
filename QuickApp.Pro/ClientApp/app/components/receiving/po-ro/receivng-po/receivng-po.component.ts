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
import { ReceivingService } from '../../../../services/receiving/receiving.service';
import { PurchaseOrder, PurchaseOrderPart, StockLine } from './PurchaseOrder.model';
import { Stockline } from '../../../../models/stockline.model';

@Component({
    selector: 'app-receivng-po',
    templateUrl: './receivng-po.component.html',
    styleUrls: ['./receivng-po.component.scss']
})
/** purchase-setup component*/
export class ReceivngPoComponent implements OnInit {
    showGrid: boolean;
    purchaseOrderdata: any;
    userName: any;
    collectionofstockLine: any;
    allVendorListForStockline: any[];
    allCustomersForStockline: any[];
    showRestrictQuantity: boolean;
    showFreeQuantity: boolean;
    showNormalQuantity: boolean;
    hasSerialized: boolean;
    iValue: number;
    showInput: boolean;
    PoCollection: any;
    purchaseOrderData: PurchaseOrder;
    stockLineItems: StockLine;

    allPriorityInfo: any[] = [];
    VendorCodesColl: any[] = [];
    vendorCodes: any[] = [];
    allActions: any[] = [];
    selectedVendorCode: any;
    disableSaveVenderName: boolean;
    disableSaveVenName: boolean;
    loadingIndicator: boolean;
    customerNamecoll: any[] = [];
    billToCusData: any[] = [];
    shipToContactData: any[] = [];
    shipToCusData: any[] = [];
    billToContactData: any[] = [];
    VendorNamecoll: any[] = [];
    customerNames: any[];
    vendorNames: any[] = [];
    vendorSelectedForBillTo: any[];
    vendorContactsForshipTo: any[] = [];
    vendorContactsForBillTO: any[] = [];
    vendorSelected: any[] = [];
    allCustomers: any[];
    allcreditTermInfo: any[] = [];
    employeeNameCollection: any[] = [];
    allEmployeeinfo: any[] = [];
    allManagemtninfo: any[] = [];
    bulist: any[] = [];
    departmentList: any[] = [];
    divisionlist: any[] = [];
    maincompanylist: any[] = [];
    mainPartcompanylist: any[] = [];
    partList: any = {};
    QuantityReceivedDataForItemMasterId: any[];
    partListData: any[] = [];
    editChildList: any[] = [];
    purchaseOrderPartManagementStructure: any[] = [];
    allManufacturerInfo: any[] = [];
    allconditioninfo: any[] = [];
    allSites: Site[];

    /** po-approval ctor */
    constructor(public binservice: BinService, public manufacturerService: ManufacturerService, public legalEntityservice: LegalEntityService, public receivingService: ReceivingService, public priorityService: PriorityService, public stocklineService: StocklineService, public siteService: SiteService, public warehouseService: WarehouseService, public vendorService: VendorService, public customerService: CustomerService, private masterComapnyService: MasterComapnyService, public customerservice: CustomerService, private itemmaster: ItemMasterService, private modalService: NgbModal, private route: Router, public legalEntityService: LegalEntityService, public currencyService: CurrencyService, public unitofmeasureService: UnitOfMeasureService, public conditionService: ConditionService, public CreditTermsService: CreditTermsService, public employeeService: EmployeeService, public vendorservice: VendorService, private alertService: AlertService)
    {
        this.loadManagementdata();//calling because we need Management Structure Data for Purchase Order part Management Structure
        this.loadReceivePurchaseOrderData();

       
    }
    
    ngOnInit()
    {
        this.priorityData();
        this.loadVendorData();
        this.loadCreditTermsData();
        this.loadManufacturerData();
        this.loadSiteData();
        this.loadConditionData();
        this.customerListForStockline();
        this.vendorListForStockline();
       
    }

    //Toggling the show hide for splitshipment.
    showSplitShipmentRows(itemMasterId:number): void {
        var selectedParts = this.purchaseOrderData.purchaseOderPart.filter(function (part) {
            return part.itemMasterId == itemMasterId;
        });

        selectedParts.forEach(part => {
            part.visible = !part.visible;
        });
    }

    loadReceivePurchaseOrderData()
    {
        if (this.receivingService.selectedPurchaseorderCollection) {
            debugger
            this.purchaseOrderData = this.receivingService.selectedPurchaseorderCollection;

            this.purchaseOrderData.purchaseOderPart.forEach(part => {
                part.visible = false;
                part.showStockLineGrid = false;
            });

            this.purchaseOrderData.dateRequested = new Date(this.purchaseOrderData.dateRequested);
            this.purchaseOrderData.dateApprovied = new Date(this.purchaseOrderData.dateApprovied);
            this.purchaseOrderData.needByDate = new Date(this.purchaseOrderData.needByDate);
            
        }
            //this.PoCollection = this.receivingService.selectedPurchaseorderCollection; //getting selected PurchaseOrder Collection

            //if (this.PoCollection.length > 0) {

            //    this.purchaseOrderData = this.PoCollection[0]; //for Top Grid in HTML
            //    //this.purchaseOrderData will contain Vendor Collection as this.purchaseOrderData.vendordata
            //    //[(ngModel)]="purchaseOrderData.resale" like we are using
            //    //if i want vendor Data i should use
            //    //[(ngModel)]="purchaseOrderData.vendor.vendorCode"

            //    this.purchaseOrderData.dateRequested = new Date(this.purchaseOrderData.dateRequested);
            //    this.purchaseOrderData.dateApprovied = new Date(this.purchaseOrderData.dateApprovied);
            //    this.purchaseOrderData.needByDate = new Date(this.purchaseOrderData.needByDate);
            //}
            //for (let i = 0; i < this.receivingService.selectedPurchaseorderCollection.length; i++)
            //{
            //    this.iValue = i;
            //    if (this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.isParent == true) {
            //        if (this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.needByDate) {
            //            this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.needByDate = new Date(this.vendorservice.selectedPoCollection[i].purchaseOderPart.needByDate);
            //        }
            //        else {
            //            this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.needByDate = new Date();
            //        }
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.partId = this.receivingService.selectedPurchaseorderCollection[i].partId;
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.partdescription = this.receivingService.selectedPurchaseorderCollection[i].partDescription;
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.itemTypeId = this.receivingService.selectedPurchaseorderCollection[i].itemTypeId;
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.name = this.receivingService.selectedPurchaseorderCollection[i].name;
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.glAccountId = this.receivingService.selectedPurchaseorderCollection[i].glAccountId;
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.serialNumber = this.receivingService.selectedPurchaseorderCollection[i].serialNumber;
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.partNumber = this.receivingService.selectedPurchaseorderCollection[i].partNumber;

            //        //calling Below for get Quantity Received from Stockline and find Quantity Back Order Value
            //        this.GetStockLineDataBasedonItemMasterId(this.receivingService.selectedPurchaseorderCollection[i], this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.itemMasterId);
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.shortName = this.receivingService.selectedPurchaseorderCollection[i].shortName;

            //        //getting Management Structure Id
            //        this.receivingService.selectedPurchaseorderCollection[i].managementStructureId = this.receivingService.selectedPurchaseorderCollection[i].managementStructureId;

            //        //Forming Management Structure Based on Management Structure Id
            //        this.formingManagementStructureForPurchaseOrderPart(this.allManagemtninfo, this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.managementStructureId, i);

            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart["childList"] = [];
            //        this.partListData.push(this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart)

            //    }
            //    else {
            //        if (this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.needByDate) {
            //            this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.needByDate = new Date(this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.needByDate);
            //        }
            //        else {
            //            this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.needByDate = new Date();
            //        }
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.shortName = this.receivingService.selectedPurchaseorderCollection[i].shortName;
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.partId = this.receivingService.selectedPurchaseorderCollection[i].partId;
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.partdescription = this.receivingService.selectedPurchaseorderCollection[i].partDescription;
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.itemTypeId = this.receivingService.selectedPurchaseorderCollection[i].itemTypeId;
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.name = this.receivingService.selectedPurchaseorderCollection[i].name;
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.glAccountId = this.receivingService.selectedPurchaseorderCollection[i].glAccountId;
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.serialNumber = this.receivingService.selectedPurchaseorderCollection[i].serialNumber;
            //        this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart.partNumber = this.receivingService.selectedPurchaseorderCollection[i].partNumber;
            //        this.editChildList.push(this.receivingService.selectedPurchaseorderCollection[i].purchaseOderPart)

            //    }
            //}

            //if (this.editChildList.length > 0) {

            //    for (let k = 0; k < this.partListData.length; k++)
            //    {
            //        for (let m = 0; m < this.editChildList.length; m++)
            //        {
            //            if ((this.partListData[k].itemMasterId == this.editChildList[m].itemMasterId) && (this.partListData[k].purchaseOrderId == this.editChildList[m].purchaseOrderId)) {
            //                this.partListData[k].ifSplitShip = true;
            //                this.partListData[k]["childList"].push(this.editChildList[m]);

            //            }

            //        }
            //    }
            //}
        
    }
    private priorityData()
    {
        this.priorityService.getPriorityList().subscribe(
            results => this.onprioritySuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private onprioritySuccessful(getPriorityList: any[])
    {
        this.allPriorityInfo = getPriorityList;
    }
    onVendorCodeselected(event)
    {
        for (let i = 0; i < this.VendorCodesColl.length; i++) {
            if (event == this.VendorCodesColl[i][0].vendorCode) {

                this.disableSaveVenName = true;
                this.disableSaveVenderName = true;
                this.selectedVendorCode = event;
            }
        }
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
    filterVendorCodes(event)
    {
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
    private loadVendorData()
    {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.vendorservice.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onDataLoadSuccessful(allWorkFlows: any[])
    {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allActions = allWorkFlows;
        if (this.purchaseOrderData.billToUserType == 1) {
            this.onBillToCustomerNameselected(this.purchaseOrderData.billToUserName);
        }
        if (this.purchaseOrderData.billToUserType == 2) {
            this.onVendorselectedForBillTo(this.purchaseOrderData.billToUserName);
        }
        if (this.purchaseOrderData.shipToUserType == 1) {
            this.onshipCustomerNameselected(this.purchaseOrderData.shipToUserName);
        }
        if (this.purchaseOrderData.shipToUserType == 2) {
            this.onVendorselectedForShipTo(this.purchaseOrderData.shipToUserName);
        }

        if (this.purchaseOrderData.billToUserType == 1) {
            this.filterNames(this.purchaseOrderData.billToUserName);
        }
        if (this.purchaseOrderData.billToUserType == 2) {
            this.filterVendorNames(this.purchaseOrderData.billToUserName);
        }
        if (this.purchaseOrderData.shipToUserType == 1) {
            this.filterNames(this.purchaseOrderData.shipToUserName);
        }
        if (this.purchaseOrderData.shipToUserType == 2) {
            this.filterVendorNames(this.purchaseOrderData.shipToUserName);
        }

    }

    onBillToCustomerNameselected(event) {
        //debugger;
        for (let i = 0; i < this.customerNamecoll.length; i++) {
            if (event == this.customerNamecoll[i][0].name) {

                this.customerService.getCustomerShipAddressGet(this.customerNamecoll[i][0].customerId).subscribe(
                    returnddataforbill => {
                        this.billToCusData = returnddataforbill[0];
                    });
                this.vendorservice.getContacts(this.customerNamecoll[i][0].customerId).subscribe(data => {
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

                this.customerService.getCustomerShipAddressGet(this.customerNamecoll[i][0].customerId).subscribe(
                    returnddataforbill => {
                        this.shipToCusData = returnddataforbill[0];
                    });
                this.vendorservice.getContacts(this.customerNamecoll[i][0].customerId).subscribe(data => {
                    //debugger;
                    this.billToContactData = data[0];
                });
            }
        }

    }

    onVendorselectedForBillTo(event) {
        //debugger;
        this.showInput = true;
        for (let i = 0; i < this.VendorNamecoll.length; i++) {
            if (event == this.VendorNamecoll[i][0].vendorName) {
                this.vendorservice.getVendorShipAddressGet(this.VendorNamecoll[i][0].vendorId).subscribe(
                    returdaa => {
                        this.vendorSelectedForBillTo = returdaa[0];
                    })
                this.vendorservice.getContacts(this.VendorNamecoll[i][0].vendorId).subscribe(
                    returdaa => {
                        this.vendorContactsForBillTO = returdaa[0];
                    })
            }

        }

    }
    onVendorselectedForShipTo(event) {
        //debugger;
        this.showInput = true;
        for (let i = 0; i < this.VendorNamecoll.length; i++) {
            if (event == this.VendorNamecoll[i][0].vendorName) {
                this.vendorservice.getVendorShipAddressGet(this.VendorNamecoll[i][0].vendorId).subscribe(
                    returdaa => {
                        this.vendorSelected = returdaa[0];
                    })
                this.vendorservice.getContacts(this.VendorNamecoll[i][0].vendorId).subscribe(
                    returdaa => {
                        this.vendorContactsForshipTo = returdaa[0];
                    })
            }

        }

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

    private loadCreditTermsData()
    {
        this.CreditTermsService.getCreditTermsList().subscribe(
            results => this.onCreditTermsdata(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }
    private onCreditTermsdata(getCreditTermsList: any[])
    {
        this.allcreditTermInfo = getCreditTermsList;
    }

    private employeedata()
    {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.employeeService.getEmployeeList().subscribe(
            results => this.onempDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
        //this.selectedColumns = this.cols;
    }
    private onempDataLoadSuccessful(getEmployeeCerficationList: any[])
    {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allEmployeeinfo = getEmployeeCerficationList;
    }

    filterfirstName(event)
    {
        this.employeeNameCollection = [];
        for (let i = 0; i < this.allEmployeeinfo.length; i++) {
            let firstName = this.allEmployeeinfo[i].firstName;
            if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.employeeNameCollection.push(firstName);
            }
        }
    }

    private loadManagementdata()
    {
        this.legalEntityservice.getManagemententity().subscribe(
            results => this.onManagemtntdataLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
       
    }
    private onManagemtntdataLoad(getAtaMainList: any[])
    {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.allManagemtninfo = getAtaMainList;
        this.loadReceivePurchaseOrderData();//calling the PurchaseOrder Data
        
        for (let i = 0; i < this.allManagemtninfo.length; i++)
        {
            if (this.allManagemtninfo[i].parentId == null)
            {
                this.bulist = [];
                this.departmentList = [];
                this.divisionlist = [];

                this.maincompanylist.push(this.allManagemtninfo[i]);
                this.mainPartcompanylist.push(this.allManagemtninfo[i]);

                //this.purchaseOrderData.buid1 = null;
               // this.partList.buid1 = null;
            }
        }
    }
    getBUList(masterCompanyId)
    {
        //this.purchaseOrderData.managementStructureEntityId = masterCompanyId; //Saving Management Structure Id if there Company Id

        this.bulist = [];
        this.departmentList = [];
        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == masterCompanyId) {
                this.bulist.push(this.allManagemtninfo[i]);
            }
        }
       // this.purchaseOrderData.buid1 = null;
        console.log(this.bulist);
    }

    getDepartmentlist(buid) {
       // this.purchaseOrderData.managementStructureEntityId = buid; //Saving Management Structure Id if there Company Id

        this.departmentList = [];
        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == buid) {
                this.departmentList.push(this.allManagemtninfo[i]);
            }
        }

       // this.purchaseOrderData.depid1 = null;

        console.log(this.departmentList);
    }

    getDivisionlist(depid) {
       // this.purchaseOrderData.managementStructureEntityId = depid; //Saving Management Structure Id if there Company Id

        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == depid) {
                this.divisionlist.push(this.allManagemtninfo[i]);
            }
        }
       // this.purchaseOrderData.divid1 = true;
    }

    getDivisionChangeManagementCode(obj)
    {
        //this.purchaseOrderData.managementStructureEntityId = obj;
    }

    GetStockLineDataBasedonItemMasterId(Collection, itemMasterId: any) {

        this.stocklineService.getStocklineListById(itemMasterId).subscribe(results =>
            this.onDataLoadQuantityReceive(Collection, results),
            error => this.onDataLoadFailed(error)
        )
    }

    onDataLoadQuantityReceive(Collection, results: any)
    {
        this.QuantityReceivedDataForItemMasterId = results;

        let data = 0;
        for (let i = 0; i < results.length; i++) {
            data += results[i].quantityToReceive;
        }
        this.receivingService.selectedPurchaseorderCollection[this.iValue].purchaseOderPart.quantityReceived = data;
        this.receivingService.selectedPurchaseorderCollection[this.iValue].purchaseOderPart.quantityBackOrdered = this.receivingService.selectedPurchaseorderCollection[this.iValue].purchaseOderPart.quantityOrdered - this.receivingService.selectedPurchaseorderCollection[this.iValue].purchaseOderPart.quantityReceived;
        this.iValue = 0;
        console.log(data)

    }

    managementStructureFormation(arr, parent) {
        var out = []
        let out1 = [];
        var k = 0;
        for (var i in arr) {
            if (arr[i].managementStructureId == parent) {
                out.push(arr[i]);
                out1.push(arr[i]);
                this.purchaseOrderPartManagementStructure.push(arr[i]);
                this.managementStructureFormation(arr, arr[i].parentId)
                out.push(arr[i])
                k++;
            }
        }
        return this.purchaseOrderPartManagementStructure;
    }

    formingManagementStructureForPurchaseOrderPart(allManagemtninfo, managementStructureId,purchaseOrderpartIvalue)
    {
        this.managementStructureFormation(this.allManagemtninfo, managementStructureId);

        switch (this.purchaseOrderPartManagementStructure.length) {
            case 1:
                this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.companyId = this.purchaseOrderPartManagementStructure[0].managementStructureId;
                break;
            case 2:
                this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.businessUnitId = this.purchaseOrderPartManagementStructure[0].managementStructureId;
                this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.companyId = this.purchaseOrderPartManagementStructure[1].managementStructureId;
                break;
            case 3:
                this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.departmentId = this.purchaseOrderPartManagementStructure[0].managementStructureId;
                this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.businessUnitId = this.purchaseOrderPartManagementStructure[1].managementStructureId;
                this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.companyId = this.purchaseOrderPartManagementStructure[2].managementStructureId;
                break;
            case 4:
                this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.divisionId = this.purchaseOrderPartManagementStructure[0].managementStructureId;
                this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.departmentId = this.purchaseOrderPartManagementStructure[1].managementStructureId;
                this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.businessUnitId = this.purchaseOrderPartManagementStructure[2].managementStructureId;
                this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.companyId = this.purchaseOrderPartManagementStructure[3].managementStructureId;
                break;
        }

        this.getBUList(this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.companyId); //default BU
        this.getDepartmentlist(this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.businessUnitId); //default BU
        this.getDivisionlist(this.receivingService.selectedPurchaseorderCollection[purchaseOrderpartIvalue].purchaseOderPart.departmentId); //default BU

        //this.sourceStockLineSetup.comId = null;
    }
    
    
    addDetailsClick(part:PurchaseOrderPart):void
    {
        part.showStockLineGrid = !part.showStockLineGrid;

        this.itemmaster.getDescriptionbypart(part.itemMaster.partNumber).subscribe((data: any) => {
            part["isSerialized"] = data[0][0].isSerialized;
            part["isTimeLife"] = data[0][0].isTimeLife;
            part["glAccountId"] = data[0][0].glAccountId;
            if (part["isSerialized"] == true) {
               // this.hideSerialNumber = true;
                this.showRestrictQuantity = true;
                this.showFreeQuantity = false;
                this.showNormalQuantity = false;
                part["isSerialized"] = true;
                this.hasSerialized = true; //for Knowing is Serialized or not for Serial Number 

            }
            else {
               // this.hideSerialNumber = false;
                this.showRestrictQuantity = false;
                this.showFreeQuantity = true;
                this.showNormalQuantity = false;
                part["isSerialized"] = false;

                this.hasSerialized = false; //for Knowing is Serialized or not for Serial Number 

            }

        })

        for (let i = 0; i < part.quantityOrdered;i++)
        {
             part.stocklineListObj[i] = new StockLine(); 
            //part["stocklineListObj"].push(this.loadDefualtObj());
        }
       // var stockLineCount = part.quantityOrdered - this.purchaseOrderData.stockLine.quantityToReceive;
    }

    loadDefualtObj() {

        let stocklineObject: StockLine;
        return stocklineObject;
        //let stockLineDefObj = {
        //    companyId: '',
        //    managementStructureEntityId: '',
        //    businessUnitId: '',
        //    partNumber: '',
        //    partDescription: '',
        //    isSerialized: '',
        //    shelfLife: '',
        //    isPMA: '',
        //    isDER: '',
        //    itemMasterId: '',
        //    glAccountId: '',
        //    quantity: '',
        //    conditionId: '',
        //    serialNumber: '',
        //    siteId: '',
        //    warehouseId: '',
        //    locationId: '',
        //    shelfId: '',
        //    binId: '',
        //    obtainFromType: '',
        //    obtainFrom: '',
        //    ownerType: '',
        //    owner: '',
        //    traceableToType: '',
        //    traceableTo: '',
        //    manufacturerId: '',
        //    manufacturerLotNumber: '',
        //    manufacturingDate: '',
        //    manufacturingBatchNumber: '',
        //    partCertificationNumber: '',
        //    certifiedBy: '',
        //    certifiedDate: '',
        //    tagDate: '',
        //    tagType: '',
        //    certifiedDueDate: '',
        //    orderDate: '',
        //    PurchaseOrderId: '',
        //    RepairOrderId: '',
        //    receivedDate: '',
        //    receiverNumber: '',
        //    reconciliationNumber: '',
        //    shelfLifeExpirationDate: '',
        //    unitSalesPrice: '',
        //    coreUnitCost: '',
        //    oem: '',
        //    memo: '',
        //    conditionList: this.allconditioninfo,
        //    //siteList: this.allSites,
        //    //wareHouseList: this.allWareHouses,
        //    //locationlist: this.allLocations,
        //    //shelflist: this.allShelfs,
        //    //binList: this.allBins,
        //    manfacturerList: this.allManufacturerInfo,
        //    timeLifeCyclesId: '',


        //};
        //return stockLineDefObj;
    }


    restrictedQuantitytoReceive(partList, restrictedQtyReceiveValue)
    {
        if (restrictedQtyReceiveValue > 1) {
            let quantity = partList["stocklineListObj"].length;
            partList["stocklineListObj"] = [];
            for (let i = 0; i < restrictedQtyReceiveValue; i++) {
                partList["stocklineListObj"].push(this.loadDefualtObj());
                partList["stocklineListObj"][i].quantityToReceive = 1;
            }
        }
    }

    //passing Value of Object and Qty to receive Value for Show Data of Details of Part
    changeQuantityToReceive(partList, qtyReceiveValue)
    {
        let quantity = partList["stocklineListObj"][0].quantityToReceive;
        partList["stocklineListObj"] = [];
        for (let i = 0; i < qtyReceiveValue; i++) {
            partList["stocklineListObj"].push(this.loadDefualtObj());
            partList["stocklineListObj"][0].quantityToReceive = quantity;
        }
    }

    private loadConditionData()
    {
        this.conditionService.getConditionList().subscribe(data => {
            this.allconditioninfo = data[0];
        })
    }

    private loadSiteData()  //retriving SIte Information
    {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.siteService.getSiteList().subscribe(  
            results => this.onSaiteDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onSaiteDataLoadSuccessful(getSiteList: Site[]) { //Storing Site Data
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = getSiteList; //need
        this.allSites = getSiteList; //Contain first array of Loaded table Data will put in Html as [value]
    }

    //private onDataLoadWareHouse(getWarehousList: any) { //Storing WareHouse Data

    //    this.alertService.stopLoadingMessage();
    //    this.loadingIndicator = false;
    //    this.allWareHouses = getWarehousList; //cha
    //    //this.warehouseId = this.allWareHouses.warehouseId;

    //}

    loadManufacturerData()
    {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.manufacturerService.getWorkFlows().subscribe(
            results => this.onmanufacturerSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private onmanufacturerSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allManufacturerInfo = allWorkFlows;
    }

    //Details of part for Stockline Code Start

    DetailsPartBUList(obj) {
        obj.managementStructureEntityId = obj.companyId; //Saving Management Structure Id if there Company Id

        this.bulist = [];
        this.departmentList = [];
        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == obj.companyId) {
                this.bulist.push(this.allManagemtninfo[i]);
            }
        }
    }

    DetailsPartDepartmentlist(obj) {
        obj.managementStructureEntityId = obj.businessUnitId;

        this.departmentList = [];
        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == obj.businessUnitId) {
                this.departmentList.push(this.allManagemtninfo[i]);
            }
        }
        console.log(this.departmentList);
    }

    DetailsPartDivisionlist(obj) {
        obj.managementStructureEntityId = obj.departmentId;

        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == obj.departmentId) {
                this.divisionlist.push(this.allManagemtninfo[i]);
            }
        }
    }

    DetailsPartgetDivisionChangeManagementCode(obj) {
        obj.managementStructureEntityId = obj.divisionId;
    }

    siteValueChange(data) //Site Valu Selection in Form
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

    private customerListForStockline() {
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
        this.allCustomersForStockline = allCustomerFlows;

    }

    private vendorListForStockline() {
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
        this.allVendorListForStockline = allVendorWorkFlows;
    }

    sameDetailsforAllParts(partList)
    {
        let orderQuantity = 1;
        let someArray = [];
        someArray = partList["stocklineListObj"][0];
        partList["stocklineListObj"] = [];
        partList["stocklineListObj"].push(someArray);

    }

    saveStockline(partList)
    {
        debugger;
        if ((partList["isSerialized"] == true))
        {
            let sourceTimeLife: any = {};
            for (let i = 0; i < partList["stocklineListObj"].length; i++)
            {
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
                this.stocklineService.newStockLineTimeLife(sourceTimeLife).subscribe(data => {
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
                        this.stocklineService.newStockLine(partList["stocklineListObj"][i]).subscribe(stocklineData => {
                            this.collectionofstockLine = stocklineData;
                            this.vendorService.receiveSaveddata.push(stocklineData);

                            if (stocklineData != null)
                            {
                                let partStockline: any = {};

                                partStockline.purchaseOrderPartId = stocklineData.purchaseOrderId;
                                partStockline.stockLineId = stocklineData.stockLineId;
                                debugger;
                                this.receivingService.addPartStocklineMapper(partStockline).subscribe(data => {
                                    this.collectionofstockLine = data;
                                })
                            }

                        })
                    }
                })
            }
        }
        else
        {
            for (let i = 0; i < partList["stocklineListObj"].length; i++)
            {
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
                this.stocklineService.newStockLine(partList["stocklineListObj"][i]).subscribe(data => {
                    this.collectionofstockLine = data;
                    this.vendorService.receiveSaveddata.push(data);
                })
            }

        }
    }

    saveReceivePurchaseOrder()
    {
        //this.purchaseOrderData.createdBy = this.userName;
       // this.purchaseOrderData.updatedBy = this.userName;
        this.vendorservice.savePurchaseorder(this.purchaseOrderData).subscribe(purchaseOrderdata => {
            this.purchaseOrderdata = purchaseOrderdata;
            {
                this.route.navigateByUrl('/receivingmodule/receivingpages/app-edit-po');

            }
        });

    }

    private onDataLoadFailed(error: any)
    {
    }

   
   

}

