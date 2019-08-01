import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../../../services/vendor.service';
import { ConditionService } from '../../../../services/condition.service';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { ManufacturerService } from '../../../../services/manufacturer.service';
import { BinService } from '../../../../services/bin.service';
import { SiteService } from '../../../../services/site.service';
import { PriorityService } from '../../../../services/priority.service';
import { ReceivingService } from '../../../../services/receiving/receiving.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-po',
  templateUrl: './view-po.component.html',
  styleUrls: ['./view-po.component.scss']
})
/** view-po component*/
export class ViewPoComponent implements OnInit {
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
    toggle_vpo_header: boolean = false;
    /** edit-po ctor */
    constructor(public receivingService: ReceivingService, public priority: PriorityService, private vendorService: VendorService, public conditionService: ConditionService, public siteService: SiteService, public binservice: BinService, public legalEntityService: LegalEntityService, public manufacturerService: ManufacturerService, public route: Router) {
        //        debugger;
       // this.localData = this.receivingService.selectedPurchaseorderCollection;
        this.localPoData = this.vendorService.selectedPoCollection;
        this.editPoData = this.localData[0];
        console.log(this.vendorService.selectedPoCollection);

    }
    ngOnInit(): void
    {
        this.loadConditionData();
        this.loadManagementdata();
        this.loadManufacturerData();
        this.loadSiteData();
        this.priorityData();

        this.loadReceivingPOEditGrid();
    }
    private loadReceivingPOEditGrid()
    {
        //this.receivingService.loadReceivingPOEditGrid().subscribe(data => {
        //    this.allconditioninfo = data[0];
        //})
    }

    private loadConditionData() {
        //debugger;
        this.conditionService.getConditionList().subscribe(data => {
            this.allconditioninfo = data[0];
        })

    }

    private loadManagementdata() {
        this.legalEntityService.getManagemententity().subscribe(data => {
            this.managementInfo = data[0]
        });
    }
    getPartBUList(masterCompanyId) {
        this.partList.managementStructureEntityId = masterCompanyId; //Saving Management Structure Id if there Company Id

        this.partBulist = [];
        this.partDepartmentList = [];
        this.partDivisionlist = [];
        for (let i = 0; i < this.managementInfo.length; i++) {
            if (this.managementInfo[i].parentId == masterCompanyId) {
                this.partBulist.push(this.managementInfo[i]);
            }
        }

        this.partList.buid1 = null;



    }

    getPartDepartmentlist(buid) {
        this.partList.managementStructureEntityId = buid; //Saving Management Structure Id if there Company Id

        this.partDepartmentList = [];
        this.partDivisionlist = [];
        for (let i = 0; i < this.managementInfo.length; i++) {
            if (this.managementInfo[i].parentId == buid) {
                this.partDepartmentList.push(this.managementInfo[i]);
            }
        }
        this.partList.depid1 = null;

    }

    getPartDivisionlist(depid) {
        this.partList.managementStructureEntityId = depid; //Saving Management Structure Id if there Company Id

        this.partDivisionlist = [];
        for (let i = 0; i < this.managementInfo.length; i++) {
            if (this.managementInfo[i].parentId == depid) {
                this.partDivisionlist.push(this.managementInfo[i]);
            }
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

    onSearchPO() {
        return this.route.navigate(['/receivingmodule/receivingpages/app-purchase-order']);
    }
}

