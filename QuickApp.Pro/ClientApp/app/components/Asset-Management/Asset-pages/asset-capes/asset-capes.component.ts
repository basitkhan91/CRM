import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ConditionService } from '../../../../services/condition.service';
import { Condition } from '../../../../models/condition.model';
import { fadeInOut } from '../../../../services/animations';
import { MessageSeverity, AlertService } from '../../../../services/alert.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MultiSelectModule } from 'primeng/multiselect';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { AtaMainService } from '../../../../services/atamain.service';
import { ATAMain } from '../../../../models/atamain.model';
import { ItemMasterCapabilitiesModel } from '../../../../models/itemMasterCapabilities.model';
import { Router } from '@angular/router';
import { AssetService } from '../../../../services/asset/Assetservice';
import { DashNumberService } from '../../../../services/dash-number/dash-number.service';
import { AircraftModel } from "../../../../models/aircraft-model.model";
import { CommonService } from '../../../../services/common.service';

@Component({
    selector: 'app-asset-capes',
    templateUrl: './asset-capes.component.html',
    styleUrls: ['./asset-capes.component.scss'],
    animations: [fadeInOut]
})

export class AssetCapesComponent implements OnInit {
    matSpinner: boolean;
    loadingIndicator: boolean;
    local: any;
    partCollection: any[];
    itemclaColl: any[];
    selectedActionName: any;
    disableSavepartNumber: boolean;
    sourceItemMasterCap: any = {};
    disableSavepartDescription: boolean;
    descriptionbyPart: any[] = [];
    allPartnumbersInfo: any[];
    alldashnumberinfo: any[];
    allManagemtninfo: any[] = [];
    maincompanylist: any[] = [];
    bulist: any[];
    departmentList: any[];
    divisionlist: any[];
    activeIndex: number;
    manufacturerData: any[] = [];
    allAircraftinfo: any[];
    completeAircraftManfacturerData: any[];
    allaircraftInfo: any[];
    selectedAircraftTypes: any;
    selectedAircraftDataModels: any[] = [];
    enablePopupData: boolean = false;
    currentVendorModels: any[] = [];
    selectedModels: any[] = [];
    allManufacturerInfo: any[];
    allDashnumberInfo: any[];
    allATAMaininfo1: ATAMain[];
    assetRecordId: number = 0;
    selectedColumn: any;
    selectedManufacturer: any = [];//To Store selected Aircraft Manufacturer Data
    selectedModel: any = [];//To Store selected Aircraft Modal Data
    capabilitiesForm: FormGroup;
    capabilityEditCollection: any[] = [];
    AssetCapesId: number;
    modal: NgbModalRef;
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    allAssetInfo: any[];
    allAssets: any[] = [];
    localCollection: any[];
    currentAsset: any;
    disableSave: boolean;
    onSelectedId: any;
    itemMasterId: number;
    showLable: boolean;
    allCapesInfo: ItemMasterCapabilitiesModel[] = [];
    selectedColumns: any;
    cols: { field: string; header: string; }[];
    isSaving: boolean;
    currentCapes: any = {};
    search_AircraftDashNumberList: any;
    capabilityTypeData:any[];

    constructor(private modalService: NgbModal, private alertService: AlertService, public itemMasterService: ItemMasterService, private route: Router,
        private assetServices: AssetService, private dashnumberservices: DashNumberService, private formBuilder: FormBuilder,private commonservice: CommonService) {

        if (this.assetServices.listCollection != null && this.assetServices.isEditMode == true) {

            this.showLable = true;
            this.currentAsset = this.assetServices.listCollection;
            if (this.assetServices.listCollection) {
                this.local = this.assetServices.listCollection;
            }
            this.loadCapesData();
            this.aircraftManfacturerData();
            this.manufacturerdata();
        }
        else if (this.assetServices.generalCollection != null) {
            this.showLable = true;
            this.currentAsset = this.assetServices.generalCollection;
            if (this.assetServices.generalCollection) {
                this.local = this.assetServices.generalCollection;
                this.currentCapes = this.local;
            }
            this.loadCapesData();
            this.aircraftManfacturerData();
            this.manufacturerdata();
        }

    }

    capabilityForm: any ={
        selectedCap:"",CapabilityTypeId: 0, selectedPartId: [], selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: [], selectedDashNumbers: [],selectedDashNumbers2: []
    };

  /*  capabilityTypeData: any = [{
        CapabilityTypeId: 1, Description: 'Manufacturing', formArrayName: 'mfgForm', selectedPartId: [], selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: [], selectedDashNumbers: []
    },
    {
        CapabilityTypeId: 2, Description: 'Overhaul', formArrayName: 'overhaulForm', selectedPartId: [], selectedAircraftDataModels: []
        , selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: [], selectedDashNumbers: []
    },
    {
        CapabilityTypeId: 3, Description: 'Distribution', formArrayName: 'distributionForm', selectedPartId: [], selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: [], selectedDashNumbers: []
    },
    {
        CapabilityTypeId: 4, Description: 'Certification', formArrayName: 'certificationForm', selectedPartId: [], selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: [], selectedDashNumbers: []
    },
    {
        CapabilityTypeId: 5, Description: 'Repair', formArrayName: 'repairForm', selectedPartId: [], selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: [], selectedDashNumbers: []
    },
    {
        CapabilityTypeId: 6, Description: 'Exchange', formArrayName: 'exchangeForm', selectedPartId: [], selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: [], selectedDashNumbers: []
    }];*/

    ngOnInit(): void {
        this.capabilitiesForm = this.formBuilder.group({
            mfgForm: this.formBuilder.array([]),
            overhaulForm: this.formBuilder.array([]),
            distributionForm: this.formBuilder.array([]),
            certificationForm: this.formBuilder.array([]),
            repairForm: this.formBuilder.array([]),
            exchangeForm: this.formBuilder.array([])
        });
       /* this.capabilityTypeData.forEach(element => {
            this.resetFormArray(element);
        });*/

        this.getAssetsList(); //calling for getting Asset List Data
        this.ptnumberlistdata();
        this.aircraftManfacturerData();
        this.loadCapesData();
        this.manufacturerdata();
        this.getAllDashNumbers();
        this.getCapabilityTypeData();
    }

    getCapabilityTypeData() {
        this.commonservice.smartDropDownList('CapabilityType', 'CapabilityTypeId', 'Description').subscribe(res => {
            this.capabilityTypeData = res;

        })
    }

    private ptnumberlistdata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemMasterService.getPrtnumberslistList().subscribe(
            results => this.onptnmbersSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onptnmbersSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = allWorkFlows;
        this.allPartnumbersInfo = allWorkFlows;
    }

    get mfgFormArray(): FormArray {
        return this.capabilitiesForm.get('mfgForm') as FormArray;
    }

    get overhaulFormArray(): FormArray {
        return this.capabilitiesForm.get('overhaulForm') as FormArray;
    }


    get distributionFormArray(): FormArray {
        return this.capabilitiesForm.get('distributionForm') as FormArray;
    }

    get certificationFormArray(): FormArray {
        return this.capabilitiesForm.get('certificationForm') as FormArray;
    }

    get repairFormArray(): FormArray {
        return this.capabilitiesForm.get('repairForm') as FormArray;
    }

    get exchangeFormArray(): FormArray {
        return this.capabilitiesForm.get('exchangeForm') as FormArray;
    }

    private onAssetListLoaded(assetList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allAssetInfo = assetList;
    }

    private getAssetsList() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.assetServices.getAssetList().subscribe(
            results => this.onAssetListLoaded(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }


    private onDataLoadFailed(error: any) {
        // alert(error);
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

    }
    partEventHandler(event) {
        if (event) {
            if (event.target.value != "") {

                let value = event.target.value.toLowerCase();
                if (this.onSelectedId) {
                    if (value == this.onSelectedId.toLowerCase()) {
                        this.disableSave = true;
                    }
                    else {
                        this.disableSave = false;
                    }
                }
            }
        }
    }

    partPNentHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {
                    //alert("Action Name already Exists");
                    this.disableSavepartNumber = true;

                }
                else {
                    this.disableSavepartNumber = false;
                    this.sourceItemMasterCap.partDescription = "";
                    this.disableSavepartDescription = false;
                }
            }

        }
    }
    private onpartnumberloadsuccessfull(allWorkFlows: any[]) //getting Part Description
    {


        this.descriptionbyPart = allWorkFlows[0]
        this.sourceItemMasterCap.partDescription = allWorkFlows[0].partDescription;


    }
    onCapabilityTypeSelection(event) {
        if (this.capabilityTypeData) {
            for (let i = 0; i < this.capabilityTypeData.length; i++) {
                if (event == this.capabilityTypeData[i].value) {
                   this.capabilityForm.selectedCap = this.capabilityTypeData[i].label;
                }
            }
        }
    }
    
    partnmId(event) {
        //
        if (this.itemclaColl) {
            for (let i = 0; i < this.itemclaColl.length; i++) {
                if (event == this.itemclaColl[i][0].partName) {
                    this.sourceItemMasterCap.partId = this.itemclaColl[i][0].partId;
                    this.itemMasterId = this.itemclaColl[i][0].partId;
                    this.disableSavepartNumber = true;
                    this.selectedActionName = event;
                }
            }
            this.itemMasterService.getDescriptionbypart(event).subscribe(
                results => this.onpartnumberloadsuccessfull(results[0]),
                error => this.onDataLoadFailed(error)


            );
            this.disableSavepartDescription = true;
        }
    }

    filterPNpartItems(event) {

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
    onPartIdselection(event) {
        if (this.itemclaColl) {

            for (let i = 0; i < this.itemclaColl.length; i++) {
                if (event == this.itemclaColl[i][0].partId) {
                    this.disableSave = true;

                    this.onSelectedId = event;
                }
            }
        }
    }
    onAssetIdselection(event) {
        if (this.allAssets) {

            for (let i = 0; i < this.allAssets.length; i++) {
                if (event == this.allAssets[i][0].assetId) {
                    this.currentAsset.assetRecordId = this.allAssets[i][0].assetRecordId;
                    this.disableSave = true;

                    this.onSelectedId = event;
                }
            }
        }
    }

    filterpartItems(event) {

        this.localCollection = [];
        this.allAssets = [];
        for (let i = 0; i < this.allAssetInfo.length; i++) {
            let assetId = this.allAssetInfo[i].assetId;
            if (assetId) {
                if (assetId.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.allAssets.push([{
                        "assetRecordId": this.allAssetInfo[i].assetRecordId,
                        "assetId": this.allAssetInfo[i].assetId
                    }]),
                        this.localCollection.push(assetId)

                }
            }
        }
    }

    private aircraftManfacturerData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemMasterService.getAircraft().subscribe(
            results => this.onDataLoadaircraftManfacturerSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    private onDataLoadaircraftManfacturerSuccessful(allWorkFlows: any[]) //While loading
    {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allaircraftInfo = allWorkFlows; //Complete Aircraft Data

        this.completeAircraftManfacturerData = allWorkFlows;

        if (this.allaircraftInfo) {
            if (this.allaircraftInfo.length > 0) {
                for (let i = 0; i < this.allaircraftInfo.length; i++)
                    this.manufacturerData.push(
                        { value: this.allaircraftInfo[i].aircraftTypeId, label: this.allaircraftInfo[i].description },

                    );
            }
        }

    }
    loadModalsForExistingRecords(capData) {
        if (capData.selectedAircraftTypes.length > 0) {

            let arr = [];
            capData.selectedAircraftTypes.forEach(element => {
                arr.push(element);
            });
            var selectedvalues = arr.join(",");
            this.itemMasterService.getAircraftTypes(selectedvalues).subscribe(
                results => this.onDataLoadaircrafttypeSuccessfulForExisting(results[0], capData),

                error => this.onDataLoadFailed(error)
            );
        }
    }

    private onDataLoadaircrafttypeSuccessfulForExisting(allWorkFlows: any[], capData) //getting Models Based on Manfacturer Selection
    {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        capData.selectedAircraftDataModels = [];
        allWorkFlows.forEach(element => {
            for (let z = 0; z < capData.selectedAircraftModelTypes.length; z++) {
                if (element.aircraftModelId == capData.selectedAircraftModelTypes[z]) {
                    capData.selectedModel.push({ value: element.aircraftModelId, label: element.modelName, aircraftTypeId: element.aircraftTypeId })
                }
            }
            capData.selectedAircraftDataModels.push({ value: element.aircraftModelId, label: element.modelName, aircraftTypeId: element.aircraftTypeId })
        });
        this.displayModalNames(capData);
    }
    displayModalNames(capData) {
        switch (capData.formArrayName) {
            case "mfgForm":
                this.mfgFormArray.controls.forEach(mfg => {
                    mfg['controls']['aircraftModelName'].setValue(this.getAirCraftModalName(capData.selectedAircraftDataModels, mfg['controls']['aircraftModelId'].value));
                    this.mfgFormArray.updateValueAndValidity();
                });
                break;
            case "overhaulForm":
                this.overhaulFormArray.controls.forEach(orl => {
                    orl['controls']['aircraftModelName'].setValue(this.getAirCraftModalName(capData.selectedAircraftDataModels, orl['controls']['aircraftModelId'].value));
                });
                break;
            case "distributionForm":
                this.distributionFormArray.controls.forEach(dist => {
                    dist['controls']['aircraftModelName'].setValue(this.getAirCraftModalName(capData.selectedAircraftDataModels, dist['controls']['aircraftModelId'].value));
                });
                break;
            case "certificationForm":
                this.certificationFormArray.controls.forEach(cert => {
                    cert['controls']['aircraftModelName'].setValue(this.getAirCraftModalName(capData.selectedAircraftDataModels, cert['controls']['aircraftModelId'].value));
                });
                break;
            case "repairForm":
                this.repairFormArray.controls.forEach(rep => {
                    rep['controls']['aircraftModelName'].setValue(this.getAirCraftModalName(capData.selectedAircraftDataModels, rep['controls']['aircraftModelId'].value));
                });
                break;
            case "exchangeForm":
                this.exchangeFormArray.controls.forEach(ex => {
                    ex['controls']['aircraftModelName'].setValue(this.getAirCraftModalName(capData.selectedAircraftDataModels, ex['controls']['aircraftModelId'].value));
                });
                break;
        }

    }

    openModelPopups(capData) {
        if (this.itemMasterService.isEditMode == false) {

            //Adding for Aircraft manafacturer List Has empty then List Should be null
            if (capData.selectedAircraftTypes.length > 0) {
                var arr = capData.selectedAircraftTypes;
                var selectedvalues = arr.join(",");
                this.itemMasterService.getAircraftTypes(selectedvalues).subscribe(
                    results => this.onDataLoadaircrafttypeSuccessful(results[0], capData),
                    error => this.onDataLoadFailed(error)
                );
            }
            else {
                this.allAircraftinfo = []; //Making empty if selecting is null
            }
        }
    }

    private onDataLoadaircrafttypeSuccessful(allWorkFlows: any[], capData) //getting Models Based on Manfacturer Selection
    {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        capData.selectedAircraftDataModels = [];
        allWorkFlows.forEach(element => {
            capData.selectedAircraftDataModels.push({ value: element.aircraftModelId, label: element.modelName, aircraftTypeId: element.aircraftTypeId })
        });

    }

    private manufacturerdata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemMasterService.getManufacturerList().subscribe(
            results => this.onmanufacturerSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onmanufacturerSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = allWorkFlows;
        this.allManufacturerInfo = allWorkFlows;
    }

    private ondashnumberSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allDashnumberInfo = allWorkFlows;
    }

    getAircraftDashNumber(event): any {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.dashnumberservices.getByModelId(event).subscribe(
            results => this.ondashnumberSuccessful(results),
            error => this.onDataLoadFailed(error)
        );
    }

    getAllDashNumbers() {
        this.dashnumberservices.getAll().subscribe(dashnumbers => {
            const responseData = dashnumbers[0];
            const dashNumberList = responseData.map(dashnumbers => {
                return {
                    label: dashnumbers.dashNumber,
                    value: dashnumbers.dashNumberId
                };
            });
            this.search_AircraftDashNumberList = dashNumberList;
            
        });
    }

    aircraftModalChange(event, capData) {
        let selectedData = event.value;
        capData.selectedModel = [];
        selectedData.forEach(element1 => {
            capData.selectedAircraftDataModels.forEach(element2 => {
                if (element1 == element2.value) {
                    //this.getAircraftDashNumber(selectedData);


                    capData.selectedDashNumbers2 = []
                    // checks where multi select is empty or not and calls the service

                    if (capData.selectedAircraftTypes !== '' && capData.selectedAircraftModelTypes !== '') {
                        this.dashnumberservices.getDashNumberByModelTypeId(
                            capData.selectedAircraftModelTypes,
                            capData.selectedAircraftTypes
                        ).subscribe(dashnumbers => {
                            const responseData = dashnumbers;
                            this.search_AircraftDashNumberList = responseData.map(dashnumbers => {
                                console.log(dashnumbers);
                                return {
                                    label: dashnumbers.dashNumber,
                                    value: dashnumbers.dashNumberId,
                                    modelId:dashnumbers.aircraftModelId,
                                };
                            });
                        });
                    }
                    capData.selectedModel.push(element2);
                }
            })
        })
    }
    dashNumberChange(event, capData) {
        let selectedData = event.value;
        capData.selectedDashNumbers2 = [];
        selectedData.forEach(element1 => {
            this.search_AircraftDashNumberList.forEach(element2 => {
                if (element1 == element2.value) {
                    capData.selectedDashNumbers2.push(element2);
                }
            })
        })
        console.log(capData.selectedDashNumbers2);
    }
    cunstructFormForEdit() {
        if (this.manufacturerData.length > 0) {
            this.cunstructItemMastars();
        }
    }
    cunstructItemMastars() {
        let mfgData: any = [];
        this.capabilityEditCollection.forEach(element1 => {
            let element = element1.capability;
            if (element.isDelete != true) {
                this.currentAsset.assetRecordId = element.assetRecordId;
                let index = element.capabilityTypeId - 1;
                let capData = this.capabilityTypeData[index];
                let typeIndex = capData.selectedAircraftTypes.indexOf(element.aircraftTypeId);
                if (typeIndex == -1) {
                    capData.selectedAircraftTypes.push(element.aircraftTypeId);
                    capData.selectedManufacturer.push({ value: element.aircraftTypeId, label: this.getAircraftTypeName(element.aircraftTypeId) });
                }
                capData.selectedAircraftModelTypes.push(element.aircraftModelId);
                // capData.selectedModel.push({ value: element.aircraftModelId, label: this.getAirCraftModalName([], element.aircraftModelId) });
                this.addExistingData(capData, element)
            }
        });
        this.capabilityTypeData.forEach(element1 => {
            if (element1.selectedAircraftModelTypes.length > 0) {
                this.loadModalsForExistingRecords(element1);
                // if(this.mfgFormArray)
            }
        });

    }

    getAircraftTypeName(aircraftTypeId) {
        let label = "";
        for (let i = 0; i < this.manufacturerData.length; i++) {
            if (this.manufacturerData[i].value == aircraftTypeId) {
                label = this.manufacturerData[i].label
                break;
            }
        }
        return label;
    }
    getAirCraftModalName(modalData, modalId) {
        let label = "";
        for (let i = 0; i < modalData.length; i++) {
            if (modalData[i].value == modalId) {
                label = modalData[i].label
                break;
            }
        }
        return label;
    }
    getExistingRowBuList(companyId, formArray) {
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == companyId) {
                // this.bulist.push(this.allManagemtninfo[i]);
                formArray['buList'].push(this.allManagemtninfo[i])
            }
        }
    }

    getExistingRowDepartmentlist(businessUnitId, formArray) {
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == businessUnitId) {
                formArray.departmentList.push(this.allManagemtninfo[i]);
            }
        }
    }

    getExistingRowDivisionlist(departmentId, formArray) {
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == departmentId) {
                formArray.divisionlist.push(this.allManagemtninfo[i]);
            }
        }
    }
    managementStructureData: any = [];
    setManagementStrucureData(capObj) {
        this.managementStructureData = [];
        this.checkMSParents(capObj.managementStructureId);
        if (this.managementStructureData.length == 4) {
            capObj.companyId = this.managementStructureData[3];
            capObj.buisinessUnitId = this.managementStructureData[2];
            capObj.departmentId = this.managementStructureData[1];
            capObj.divisionId = this.managementStructureData[0];
        }
        if (this.managementStructureData.length == 3) {
            capObj.companyId = this.managementStructureData[2];
            capObj.buisinessUnitId = this.managementStructureData[1];
            capObj.departmentId = this.managementStructureData[0];
        }
        if (this.managementStructureData.length == 2) {
            capObj.companyId = this.managementStructureData[1];
            capObj.buisinessUnitId = this.managementStructureData[0];
        }
        if (this.managementStructureData.length == 1) {
            capObj.companyId = this.managementStructureData[0];
        }

    }
    checkMSParents(msId) {
        this.managementStructureData.push(msId);
        for (let a = 0; a < this.allManagemtninfo.length; a++) {
            if (this.allManagemtninfo[a].managementStructureId == msId) {
                if (this.allManagemtninfo[a].parentId) {
                    this.checkMSParents(this.allManagemtninfo[a].parentId);
                    break;
                }
            }
        }

    }
    addExistingData(capData, data) {
        let capbilitiesObj = data;
        capbilitiesObj.aircraftTypeName = this.getAircraftTypeName(data.aircraftTypeId);
        capbilitiesObj.aircraftModelName = "";
        // this.geAircraftModalName(data.aircraftModelId);
        capbilitiesObj.entryDate = new Date()
        capbilitiesObj.isVerified = false;
        capbilitiesObj.isActive = true;
        capbilitiesObj.verifiedBy = "";

        capbilitiesObj.aircraftManufacturer = this.getAircraftTypeName(data.aircraftTypeId);
        capbilitiesObj.dateVerified = new Date();
        this.setManagementStrucureData(capbilitiesObj);
        // capData.push(data);
        let mfObj = this.formBuilder.group(capbilitiesObj);
        switch (capData.formArrayName) {
            case "mfgForm":
                this.mfgFormArray.push(mfObj);
                let mfgIndex = this.mfgFormArray.controls.length - 1;


                break;
            case "overhaulForm":
                this.overhaulFormArray.push(mfObj);
                let overIndex = this.overhaulFormArray.controls.length - 1;

                break;
            case "distributionForm":
                this.distributionFormArray.push(mfObj);
                let distIndex = this.distributionFormArray.controls.length - 1;

                break;
            case "certificationForm":
                this.certificationFormArray.push(mfObj);
                let certIndex = this.certificationFormArray.controls.length - 1;

                break;
            case "repairForm":
                this.repairFormArray.push(mfObj);
                let repIndex = this.repairFormArray.controls.length - 1;

                break;
            case "exchangeForm":
                this.exchangeFormArray.push(mfObj);
                let excngIndex = this.exchangeFormArray.controls.length - 1;


                break;
        }
    }
    checkIsExisted(capId,type, modal, myForm, capData) {
        let itemExisted = false;
        myForm.controls.forEach(data => {
            if (data['controls']['capabilityTypeId'].value == capId && data['controls']['aircraftTypeId'].value == type && data['controls']['aircraftModelId'].value == modal) {
                itemExisted = true;
                data['controls']['isDelete'].setValue(false);
            } else {
                let typeId = data['controls']['aircraftTypeId'].value;
                let typeIndex = capData.selectedAircraftTypes.indexOf(typeId);
                if (typeIndex == -1) {
                  //  data['controls']['isDelete'].setValue(true);
                }
                let modaleId = data['controls']['aircraftModelId'].value;
                let modalIndex = capData.selectedAircraftModelTypes.indexOf(modaleId);
                if (modalIndex == -1) {
                   // data['controls']['isDelete'].setValue(true);
                }
            }


        });
        return itemExisted;
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }


    addModels(capData) {
        //this.capabilityTypeData.for
        let capbilitiesObj = new ItemMasterCapabilitiesModel;
      // let selectedCap = capData.selectedCap;
        // this.resetFormArray(capData);
        capData.selectedManufacturer.forEach(element1 => {
            capbilitiesObj.assetRecordId = this.currentAsset.assetRecordId;
            capbilitiesObj.aircraftTypeId = element1.value;
            capbilitiesObj.aircraftTypeName = element1.label;
            capbilitiesObj.capabilityTypeId = capData.CapabilityTypeId;
            capbilitiesObj.capabilityTypeName = capData.selectedCap;
            capbilitiesObj.aircraftManufacturer = element1.label;
            capbilitiesObj.PartId = capData.selectedPartId;
            capbilitiesObj.itemMasterId = this.itemMasterId;
            capbilitiesObj.AssetCapesId = this.AssetCapesId;
            capbilitiesObj.aircraftModelName = 'Undefined';
            capbilitiesObj.DashNumber = 'Undefined';
           // capbilitiesObj.AircraftDashNumberId = capData.selectedDashNumbers;
            console.log(capData);

            if(capData.selectedModel.length==0){
                let mfObj = this.formBuilder.group(capbilitiesObj);
                this.mfgFormArray.push(mfObj);
                    let mfgIndex = this.mfgFormArray.controls.length - 1;
                    this.mfgFormArray.controls[mfgIndex]['buList'] = [];
                    this.mfgFormArray.controls[mfgIndex]['departmentList'] = [];
                    this.mfgFormArray.controls[mfgIndex]['divisionlist'] = [];
            }

            capData.selectedModel.forEach(element2 => {
                if (element2.aircraftTypeId == element1.value) {
                    capbilitiesObj.aircraftModelName = element2.label;
                    capbilitiesObj.aircraftModelId = element2.value;

                    if(capData.selectedDashNumbers2.length==0){
                        let mfObj = this.formBuilder.group(capbilitiesObj);
                        let mfgItemExisted = this.checkIsExisted(capData.CapabilityTypeId,element1.value, element2.value, this.mfgFormArray, capData);
                        if (mfgItemExisted == false) {
                            this.mfgFormArray.push(mfObj);
                            let mfgIndex = this.mfgFormArray.controls.length - 1;
                            this.mfgFormArray.controls[mfgIndex]['buList'] = [];
                            this.mfgFormArray.controls[mfgIndex]['departmentList'] = [];
                            this.mfgFormArray.controls[mfgIndex]['divisionlist'] = [];
    
                        }
                    }
            
                    capData.selectedDashNumbers2.forEach(element3 => {
                        if (element3.modelId == element2.value) {
        
                            capbilitiesObj.DashNumber = element3.label;
                            capbilitiesObj.AircraftDashNumberId = element3.value;
                           
                            let index = capData.CapabilityTypeId - 1;
                            let mfObj = this.formBuilder.group(capbilitiesObj);
                            let mfgItemExisted = this.checkIsExisted(capData.CapabilityTypeId,element1.value, element2.value, this.mfgFormArray, capData);
                            if (mfgItemExisted == false) {
                                this.mfgFormArray.push(mfObj);
                                let mfgIndex = this.mfgFormArray.controls.length - 1;
                                this.mfgFormArray.controls[mfgIndex]['buList'] = [];
                                this.mfgFormArray.controls[mfgIndex]['departmentList'] = [];
                                this.mfgFormArray.controls[mfgIndex]['divisionlist'] = [];
        
                            }
                           
                        }else{
                            let mfObj = this.formBuilder.group(capbilitiesObj);
                            let mfgItemExisted = this.checkIsExisted(capData.CapabilityTypeId,element1.value, element2.value, this.mfgFormArray, capData);
                            if (mfgItemExisted == false) {
                                this.mfgFormArray.push(mfObj);
                                let mfgIndex = this.mfgFormArray.controls.length - 1;
                                this.mfgFormArray.controls[mfgIndex]['buList'] = [];
                                this.mfgFormArray.controls[mfgIndex]['departmentList'] = [];
                                this.mfgFormArray.controls[mfgIndex]['divisionlist'] = [];
        
                            }
                        }
        
                    });
                   
                }

            });

           

        });

    }

    
    openDelete(content2, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.assetServices.CapeslistCollection = row;
        this.modal = this.modalService.open(content2, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    
    removeAsset(): void {
        this.assetServices.removeCapesById(this.assetServices.CapeslistCollection.assetCapesId).subscribe(response => {
            this.alertService.showMessage("Success", `Asset Capes removed successfully.`, MessageSeverity.success);
            this.assetServices.getcapabilityListData(this.assetServices.listCollection.assetRecordId).subscribe(asset => {
                this.allCapesInfo = asset[0];
                this.modal.close();
            });
        });

    }

    resetFormArray(capData) {
        switch (capData.formArrayName) {
            case "mfgForm":
                this.mfgFormArray.controls = [];
                break;
            case "overhaulForm":
                this.overhaulFormArray.controls = [];
                break;
            case "distributionForm":
                this.distributionFormArray.controls = [];
                break;
            case "certificationForm":
                this.certificationFormArray.controls = [];
                break;
            case "repairForm":
                this.repairFormArray.controls = [];
                break;
            case "exchangeForm":
                this.exchangeFormArray.controls = [];
                break;
        }
    }

    manufacturerChange(event, capData) {
        let selectedData = event.value;
        capData.selectedManufacturer = [];
        selectedData.forEach(element1 => {
            this.manufacturerData.forEach(element2 => {
                if (element1 == element2.value) {
                    capData.selectedManufacturer.push(element2);
                }
            })
        })
    }

    saveCapabilities() {
        let capbilitiesForm = this.capabilitiesForm.value;
        let capabilityCollection: any = [];
        let mfgForm = capbilitiesForm.mfgForm;
        let overhaulForm = capbilitiesForm.overhaulForm;
        let distributionForm = capbilitiesForm.distributionForm;
        let certificationForm = capbilitiesForm.certificationForm;
        let repairForm = capbilitiesForm.repairForm;
        let exchangeForm = capbilitiesForm.exchangeForm;
        mfgForm.forEach(element => {
           // element.capabilityTypeId = 1;
            element.assetRecordId = this.currentAsset.assetRecordId;
            capabilityCollection.push(element);
        });
        overhaulForm.forEach(element => {
            element.capabilityTypeId = 2;
            element.assetRecordId = this.currentAsset.assetRecordId;
            capabilityCollection.push(element);
        });
        distributionForm.forEach(element => {
            element.capabilityTypeId = 3;
            element.assetRecordId = this.currentAsset.assetRecordId;
            capabilityCollection.push(element);
        });
        certificationForm.forEach(element => {
            element.capabilityTypeId = 4;
            element.assetRecordId = this.currentAsset.assetRecordId;
            capabilityCollection.push(element);
        });
        repairForm.forEach(element => {
            element.capabilityTypeId = 5;
            element.assetRecordId = this.currentAsset.assetRecordId;
            capabilityCollection.push(element);
        });
        exchangeForm.forEach(element => {
            element.capabilityTypeId = 6;
            element.assetRecordId = this.currentAsset.assetRecordId;
            capabilityCollection.push(element);
        });

        this.assetServices.saveManfacturerinforcapes(capabilityCollection).subscribe(data11 => {
            this.alertService.showMessage("Success", `Asset capes saved successfully.`, MessageSeverity.success);
            this.loadCapesData();
        })
        this.mfgFormArray.controls = [];
        this.modal.close();
    }


    addBtnTitle(item) {
        let addBtnTitle = '';
        if (this.currentAsset.assetRecordId < 1) {
            addBtnTitle = "Please Select PN";
        } else {
            if (item.selectedAircraftTypes.length == 0) {
                addBtnTitle = "Please Select Aircraft Type";
            } else if (item.selectedAircraftModelTypes.length == 0) {
                addBtnTitle = "Please Select Aircraft Modal";
            } else {
                addBtnTitle = 'Add ' + item.Description;
            }
        }
        return addBtnTitle;
    }

    validateForm(form, fieldName: any) {
        let className = '';
        if (form.get(fieldName).valid) {
            // className = "form-validation-success";
        } else {
            className = 'form-validation-error';
        }
        return className;
    };


    openCapes(content) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.mfgFormArray.controls = [];
        this.modal = this.modalService.open(content, { size: 'lg' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    private onCapesLoaded(allCapes: ItemMasterCapabilitiesModel[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allCapesInfo = allCapes;
    }

    private loadCapesData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        if (this.currentAsset) {
            this.assetServices.getcapabilityListData(this.currentAsset.assetRecordId).subscribe(
                results => this.onCapesLoaded(results[0]),
                error => this.onDataLoadFailed(error)
            );

            this.cols = [

                { field: 'partNumber', header: 'PN' },
                { field: 'partDescription', header: 'PN Description' },
                { field: 'captypedescription', header: 'Capability Type' },
                { field: 'manufacturer', header: 'Aircraft Manufacturer' },
                { field: 'modelname', header: 'Models' },
                { field: 'dashnumber', header: 'Dash Number' }
            ];
            this.selectedColumns = this.cols;
        }
    }


    opencapesToEdit(content, row) //this is for Edit Data get
    {
        this.mfgFormArray.controls = [];
        this.overhaulFormArray.controls = [];
        this.distributionFormArray.controls = [];
        this.certificationFormArray.controls = [];
        this.repairFormArray.controls = [];
        this.exchangeFormArray.controls = [];
        this.capabilityEditCollection = [];
        let getSelectedCollection = [];
        this.assetServices.isCapsEditMode = true;
        this.isSaving = true;
        this.assetServices.getCapabilityData(row.assetCapesId).subscribe(data => {
            getSelectedCollection = data;
            if (getSelectedCollection) {
                this.capabilityEditCollection = getSelectedCollection;
                this.cunstructFormForEdit()
            }
        });

        this.modal = this.modalService.open(content, { size: 'lg' });
         this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    saveCapes() {
        this.assetServices.listCollection = this.local;
        this.activeIndex = 2;
        this.assetServices.indexObj.next(this.activeIndex);
        this.route.navigateByUrl('/assetmodule/assetpages/app-asset-calibration');
    }

    backClick() {
        this.assetServices.listCollection = this.local;
        this.activeIndex = 0;
        this.assetServices.indexObj.next(this.activeIndex);
        this.assetServices.isEditMode = true;
        this.isSaving = true;
        const { assetId } = this.local;
        this.route.navigateByUrl(`/assetmodule/assetpages/app-edit-asset/${assetId}`);
    }
}