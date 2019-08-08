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

    /** edit-po ctor */
    constructor(public receivingService: ReceivingService, public priority: PriorityService, private vendorService: VendorService, public conditionService: ConditionService, public siteService: SiteService, public binservice: BinService, public legalEntityService: LegalEntityService, public manufacturerService: ManufacturerService, public route: Router) {
        //        debugger;
       // this.localData = this.receivingService.selectedPurchaseorderCollection;
        this.localPoData = this.vendorService.selectedPoCollection;
        this.editPoData = this.localData[0];

    }
    ngOnInit(): void
    {
        this.loadConditionData();
        this.loadManagementdata();
        this.loadManufacturerData();
        this.loadSiteData();
        this.priorityData();

        this.loadReceivingPOEditGrid();

        //TODO: Remove once we load dynamic content
        this.localData = [
            { partNumber: 'PN123' }
        ]
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

