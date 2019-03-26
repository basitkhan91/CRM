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

@Component({
    selector: 'app-item-master-create-capabilities',
    templateUrl: './item-master-create-capabilities.component.html',
    styleUrls: ['./item-master-create-capabilities.component.scss'],
    animations: [fadeInOut]
})
/** item-master-create-capabilities component*/
export class ItemMasterCreateCapabilitiesComponent implements OnInit {
    /** item-master-create-capabilities ctor */
    matSpinner: boolean;
    loadingIndicator: boolean;

    partCollection: any[];
    selectedActionName: any;
    disableSavepartNumber: boolean;
    sourceItemMasterCap: any = {};
    disableSavepartDescription: boolean;
    itemclaColl: any[];
    descriptionbyPart: any[] = [];
    allPartnumbersInfo: any[];
    allManagemtninfo: any[] = [];
    maincompanylist: any[] = [];
    bulist: any[];
    departmentList: any[];
    divisionlist: any[];
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
    allATAMaininfo1: ATAMain[];
    ItemMasterId: number = 0;
    selectedManufacturer: any = [];//To Store selected Aircraft Manufacturer Data
    selectedModel: any = [];//To Store selected Aircraft Modal Data
    // itemMasterCreateCapabilitiesModel = new ItemMasterCapabilitiesModel()
    capabilitiesForm: FormGroup;
    capabilityEditCollection: any;
    constructor(public ataservice: AtaMainService, public workFlowtService1: LegalEntityService, private modalService: NgbModal, private alertService: AlertService, public itemser: ItemMasterService,
        private formBuilder: FormBuilder, private router: Router) {
        //this.dataSource = new MatTableDataSource();


    }

    capabilityTypeData: any = [{
        CapabilityTypeId: 1, Description: 'Manufacturing', formArrayName: 'mfgForm', selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: []
    },
    {
        CapabilityTypeId: 2, Description: 'Overhaul', formArrayName: 'overhaulForm', selectedAircraftDataModels: []
        , selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: []
    },
    {
        CapabilityTypeId: 3, Description: 'Distribution', formArrayName: 'distributionForm', selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: []
    },
    {
        CapabilityTypeId: 4, Description: 'Certification', formArrayName: 'certificationForm', selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: []
    },
    {
        CapabilityTypeId: 5, Description: 'Repair', formArrayName: 'repairForm', selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: []
    },
    {
        CapabilityTypeId: 6, Description: 'Exchange', formArrayName: 'exchangeForm', selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: []
    }];

    ngOnInit(): void {
        this.capabilitiesForm = this.formBuilder.group({
            mfgForm: this.formBuilder.array([]),
            overhaulForm: this.formBuilder.array([]),
            distributionForm: this.formBuilder.array([]),
            certificationForm: this.formBuilder.array([]),
            repairForm: this.formBuilder.array([]),
            exchangeForm: this.formBuilder.array([])
        });
        this.capabilityTypeData.forEach(element => {
            this.resetFormArray(element);
        });
        //this.workFlowtService.MatSpinner = true;//App Mat Spinner Testing
        // debugger;
        //this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-add-vendor-capabilitiesn';
        //this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);

        this.ptnumberlistdata(); //calling for getting Item Master Parts List Data

        this.loadManagementdata(); // Loading Management Data from Company,BU,DIV,DEP

        this.aircraftManfacturerData();

        this.manufacturerdata();
        this.atamaindata();




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



    private atamaindata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.ataservice.getAtaMainList().subscribe(
            results => this.onDataLoadATAMainDataSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    onDataLoadATAMainDataSuccessful(getAtaMainList: any[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = getAtaMainList;
        this.allATAMaininfo1 = getAtaMainList;
    }

    private loadManagementdata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService1.getManagemententity().subscribe(
            results => this.onManagemtntdataLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    //calling for COM,BU,DIV,DEP Data Start
    private onManagemtntdataLoad(getAtaMainList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = getAtaMainList;
        this.allManagemtninfo = getAtaMainList;

        for (let i = 0; i < this.allManagemtninfo.length; i++) {

            if (this.allManagemtninfo[i].parentId == null) {
                this.maincompanylist.push(this.allManagemtninfo[i]);

            }
        }

        this.sourceItemMasterCap.businessUnitId = "";

        if (this.itemser.capabilityCollection) {
            this.capabilityEditCollection = this.itemser.capabilityCollection;
            this.cunstructFormForEdit()
        }
    }


    getBUList(companyId, formArray) {
        // this.sourceItemMasterCap.businessUnitId = "";
        // this.sourceItemMasterCap.managementStructureEntityId = companyId; //Saving Management Structure Id if there Company Id

        // this.bulist = [];
        formArray.controls['buisinessUnitId'].setValue("");
        formArray.controls['departmentId'].setValue("");
        formArray.controls['divisionId'].setValue("");
        formArray.controls['managementStructureId'].setValue(companyId);
        formArray.departmentList = [];
        formArray.divisionlist = [];
        formArray['buList'] = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == companyId) {
                // this.bulist.push(this.allManagemtninfo[i]);
                formArray['buList'].push(this.allManagemtninfo[i])
            }
        }

        this.setValidations(formArray);
    }

    setValidations(formArray) {
        //   formArray.controls['divisionId'].clearValidators();
        //   formArray.controls['departmentId'].clearValidators();
        formArray.controls['buisinessUnitId'].clearValidators();
        formArray.updateValueAndValidity();
        if (formArray['buList'].length == 0) {
            formArray.controls['buisinessUnitId'].setValidators([Validators.required]);
            formArray.updateValueAndValidity();
        }

        // if(formArray['departmentList'].length == 0){
        //     formArray.controls['departmentId'].setValidators([Validators.required]);
        //     formArray.updateValueAndValidity();
        // }
        // if(formArray['divisionlist'].length == 0){
        //     formArray.controls['divisionId'].setValidators([Validators.required]);
        //     formArray.updateValueAndValidity();
        // }
    }

    getDepartmentlist(businessUnitId, formArray) {
        // this.sourceItemMasterCap.managementStructureEntityId = businessUnitId; //Saving Management Structure Id if there businessUnitId
        // this.sourceItemMasterCap.departmentId = "";
        formArray.controls['departmentId'].setValue("");
        formArray.controls['divisionId'].setValue("");
        formArray.controls['managementStructureId'].setValue(businessUnitId);
        formArray.departmentList = [];
        formArray.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == businessUnitId) {
                formArray.departmentList.push(this.allManagemtninfo[i]);
            }
        }

        this.setValidations(formArray);
    }

    getDivisionlist(departmentId, formArray) {
        // this.sourceItemMasterCap.divisionId = "";
        // this.sourceItemMasterCap.managementStructureEntityId = departmentId; //Saving Management Structure Id if there departmentId
        formArray.controls['divisionId'].setValue("");
        formArray.controls['managementStructureId'].setValue(departmentId);
        formArray.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == departmentId) {
                formArray.divisionlist.push(this.allManagemtninfo[i]);
            }
        }

        this.setValidations(formArray);
    }
    divisionChange(divisionId, formArray) {
        formArray.controls['managementStructureId'].setValue(divisionId);
    }


    getDivisionChangeManagementCode(divisionId) {
        // this.sourceItemMasterCap.managementStructureEntityId = divisionId; //Saving Management Structure Id if theredivisionId
    }


    //calling for COM,BU,DIV,DEP Data End

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
        //this.dataSource.data = allWorkFlows;
        this.allPartnumbersInfo = allWorkFlows;
    }

    private onDataLoadFailed(error: any) {
        // alert(error);
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

    }

    private onpartnumberloadsuccessfull(allWorkFlows: any[]) //getting Part Description
    {


        this.descriptionbyPart = allWorkFlows[0]
        //this.sourceAction = this.descriptionbyPart;
        this.sourceItemMasterCap.partDescription = allWorkFlows[0].partDescription;


    }


    partEventHandler(event) {
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

    partnmId(event) {
        //
        if (this.itemclaColl) {
            for (let i = 0; i < this.itemclaColl.length; i++) {
                if (event == this.itemclaColl[i][0].partName) {
                    this.sourceItemMasterCap.partId = this.itemclaColl[i][0].partId;
                    this.ItemMasterId = this.itemclaColl[i][0].partId;
                    this.disableSavepartNumber = true;
                    this.selectedActionName = event;
                }
            }
            this.itemser.getDescriptionbypart(event).subscribe(
                results => this.onpartnumberloadsuccessfull(results[0]),
                error => this.onDataLoadFailed(error)


            );
            this.disableSavepartDescription = true;
        }
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

    private aircraftManfacturerData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemser.getAircraft().subscribe(
            results => this.onDataLoadaircraftManfacturerSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    private onDataLoadaircraftManfacturerSuccessful(allWorkFlows: any[]) //While oading
    {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = allWorkFlows;
        this.allaircraftInfo = allWorkFlows; //Complete Aircraft Data

        this.completeAircraftManfacturerData = allWorkFlows;

        if (this.allaircraftInfo) {
            if (this.allaircraftInfo.length > 0) {
                for (let i = 0; i < this.allaircraftInfo.length; i++)
                    this.manufacturerData.push(
                        { value: this.allaircraftInfo[i].aircraftTypeId, label: this.allaircraftInfo[i].description },

                    );
            }

            //Adding

            //	let valAirCraft = [];
            //	//we are Passing Customer Id for getting Edit Data and make it check 
            //	this.itemser.getAircaftManafacturerList(this.sourceItemMaster.itemMasterId)
            //		.subscribe(results => {
            //			this.allAircraftManufacturer = results[0];
            //			if (results != null) {
            //				for (let i = 0; i < this.allAircraftManufacturer.length; i++) {
            //					valAirCraft.push(this.allAircraftManufacturer[i].aircraftTypeId);
            //				}
            //				this.selectedAircraftTypes = valAirCraft; //if there is Aircraft Data with ItemMasterId that will be Checked 
            //				console.log(this.selectedAircraftTypes);
            //			}

            //		},
            //			error => this.onDataLoadFailed(error)
            //		);


        }
        if (this.itemser.capabilityCollection) {
            this.capabilityEditCollection = this.itemser.capabilityCollection;
            this.cunstructFormForEdit()
        }
    }
    loadModalsForExistingRecords(capData) {
        if (capData.selectedAircraftTypes.length > 0) {

            let arr = [];
            capData.selectedAircraftTypes.forEach(element => {
                arr.push(element);
            });
            var selectedvalues = arr.join(",");
            this.itemser.getAircraftTypes(selectedvalues).subscribe(
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

        //alert(this.itemser.isEditMode);
        if (this.itemser.isEditMode == false) {

            //Adding for Aircraft manafacturer List Has empty then List Should be null
            if (capData.selectedAircraftTypes.length > 0) {
                var arr = capData.selectedAircraftTypes;
                var selectedvalues = arr.join(",");
                this.itemser.getAircraftTypes(selectedvalues).subscribe(
                    results => this.onDataLoadaircrafttypeSuccessful(results[0], capData),
                    error => this.onDataLoadFailed(error)
                );
            }
            else {
                this.allAircraftinfo = []; //Making empty if selecting is null
            }
        }
        //if (this.itemser.isEditMode == true)
        //{

        //	this.modal = this.modalService.open(content, { size: 'sm' });
        //	this.modal.result.then(() => {

        //		console.log('When user closes');
        //	}, () => { console.log('Backdrop click') })
        //	if (this.allAircraftinfo) {
        //		if (this.allAircraftinfo.length >= 0) {
        //			this.enablePopupData = true;
        //			var arr = this.selectedAircraftTypes;
        //			if (this.selectedAircraftTypes) {
        //				var selectedvalues = arr.join(",");
        //				//this.loadData();
        //				this.itemser.getAircraftTypes(selectedvalues).subscribe(
        //					results => this.onDataLoadaircrafttypeSuccessful(results[0]),
        //					error => this.onDataLoadFailed(error)

        //				)
        //			}
        //		}
        //	}
        //}

    }

    private onDataLoadaircrafttypeSuccessful(allWorkFlows: any[], capData) //getting Models Based on Manfacturer Selection
    {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = allWorkFlows;
        // this.selectedAircraftDataModels = allWorkFlows; //selected Aircraft Models based on Aircraft Data Selection
        capData.selectedAircraftDataModels = [];
        allWorkFlows.forEach(element => {
            capData.selectedAircraftDataModels.push({ value: element.aircraftModelId, label: element.modelName, aircraftTypeId: element.aircraftTypeId })
        });


        //for Open Model for Edit Data
        // if (this.itemser.isEditMode == true) //in this we are Making all the Models and Getting Checked if data is thete with Item Master Id 
        // {
        //     {

        //         for (let i = 0; i < this.currentVendorModels.length; i++) {
        //             for (let j = 0; j < this.allAircraftinfo.length; j++) {
        //                 if (this.currentVendorModels[i].aircraftModelId == this.allAircraftinfo[j].aircraftModelId) {
        //                     this.allAircraftinfo[j].priority = this.currentVendorModels[i].priority;
        //                     this.allAircraftinfo[j].checkbox = this.currentVendorModels[i].checkbox;

        //                 }


        //             }
        //         }
        //     }
        // }


        // if (this.selectedModels.length > 0)
        // {

        //     let ischange1 = false;
        //     if (this.selectedModels.length > 0) {
        //         this.selectedModels.map((row) => {
        //             for (let i = 0; i < this.allAircraftinfo.length; i++) {
        //                 if (this.allAircraftinfo[i].aircraftModelId == row.aircraftModelId) {
        //                     this.allAircraftinfo[i].priority = row.priority;
        //                     this.allAircraftinfo[i].checkbox = row.checkbox;
        //                     ischange1 = true;
        //                 }
        //             }

        //         });
        //     }
        //     //if (!ischange1) {
        //     //	this.selectedModels.push(selectedRow);
        //     //}

        // }

    }

    private manufacturerdata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemser.getManufacturerList().subscribe(
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

    aircraftModalChange(event, capData) {
        let selectedData = event.value;
        capData.selectedModel = [];
        selectedData.forEach(element1 => {
            capData.selectedAircraftDataModels.forEach(element2 => {
                if (element1 == element2.value) {
                    capData.selectedModel.push(element2);
                }
            })
        })
    }
    cunstructFormForEdit() {
        if (this.manufacturerData.length > 0 && this.allManagemtninfo.length > 0) {
            this.cunstructItemMastars();
        }
    }
    cunstructItemMastars() {
        let mfgData: any = [];
        this.capabilityEditCollection.forEach(element => {
            this.ItemMasterId = element.itemMasterId;
            let index = element.capabilityTypeId - 1;
            let capData = this.capabilityTypeData[index];
            capData.selectedAircraftTypes.push(element.aircraftTypeId);
            capData.selectedAircraftModelTypes.push(element.aircraftModelId);
            this.addExistingData(capData, element)
        });
        this.capabilityTypeData.forEach(element => {
            if (element.selectedAircraftModelTypes.length > 0) {
                this.loadModalsForExistingRecords(element);
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
                this.mfgFormArray.controls[mfgIndex]['buList'] = [];
                this.mfgFormArray.controls[mfgIndex]['departmentList'] = [];
                this.mfgFormArray.controls[mfgIndex]['divisionlist'] = [];
                if (this.mfgFormArray.controls[mfgIndex]['controls']['companyId'].value) {
                    this.getExistingRowBuList(this.mfgFormArray.controls[mfgIndex]['controls']['companyId'].value, this.mfgFormArray.controls[mfgIndex]);
                }
                if (this.mfgFormArray.controls[mfgIndex]['controls']['buisinessUnitId'].value) {
                    this.getExistingRowDepartmentlist(this.mfgFormArray.controls[mfgIndex]['controls']['buisinessUnitId'].value, this.mfgFormArray.controls[mfgIndex]);
                }
                if (this.mfgFormArray.controls[mfgIndex]['controls']['departmentId'].value) {
                    this.getExistingRowDivisionlist(this.mfgFormArray.controls[mfgIndex]['controls']['departmentId'].value, this.mfgFormArray.controls[mfgIndex]);
                }

                break;
            case "overhaulForm":
                this.overhaulFormArray.push(mfObj);
                let overIndex = this.overhaulFormArray.controls.length - 1;
                this.overhaulFormArray.controls[overIndex]['buList'] = [];
                this.overhaulFormArray.controls[overIndex]['departmentList'] = [];
                this.overhaulFormArray.controls[overIndex]['divisionlist'] = [];
                if (this.overhaulFormArray.controls[overIndex]['controls']['companyId'].value) {
                    this.getExistingRowBuList(this.overhaulFormArray.controls[overIndex]['controls']['companyId'].value, this.overhaulFormArray.controls[overIndex]);
                }
                if (this.overhaulFormArray.controls[overIndex]['controls']['buisinessUnitId'].value) {
                    this.getExistingRowDepartmentlist(this.overhaulFormArray.controls[overIndex]['controls']['buisinessUnitId'].value, this.overhaulFormArray.controls[overIndex]);
                }
                if (this.overhaulFormArray.controls[overIndex]['controls']['departmentId'].value) {
                    this.getExistingRowDivisionlist(this.overhaulFormArray.controls[overIndex]['controls']['departmentId'].value, this.overhaulFormArray.controls[overIndex]);
                }
                break;
            case "distributionForm":
                this.distributionFormArray.push(mfObj);
                let distIndex = this.distributionFormArray.controls.length - 1;
                this.distributionFormArray.controls[distIndex]['buList'] = [];
                this.distributionFormArray.controls[distIndex]['departmentList'] = [];
                this.distributionFormArray.controls[distIndex]['divisionlist'] = [];
                if (this.distributionFormArray.controls[distIndex]['controls']['companyId'].value) {
                    this.getExistingRowBuList(this.distributionFormArray.controls[distIndex]['controls']['companyId'].value, this.distributionFormArray.controls[distIndex]);
                }
                if (this.distributionFormArray.controls[distIndex]['controls']['buisinessUnitId'].value) {
                    this.getExistingRowDepartmentlist(this.distributionFormArray.controls[distIndex]['controls']['buisinessUnitId'].value, this.distributionFormArray.controls[distIndex]);
                }
                if (this.distributionFormArray.controls[distIndex]['controls']['departmentId'].value) {
                    this.getExistingRowDivisionlist(this.distributionFormArray.controls[distIndex]['controls']['departmentId'].value, this.distributionFormArray.controls[distIndex]);
                }
                break;
            case "certificationForm":
                this.certificationFormArray.push(mfObj);
                let certIndex = this.certificationFormArray.controls.length - 1;
                this.certificationFormArray.controls[certIndex]['buList'] = [];
                this.certificationFormArray.controls[certIndex]['departmentList'] = [];
                this.certificationFormArray.controls[certIndex]['divisionlist'] = [];
                if (this.certificationFormArray.controls[certIndex]['controls']['companyId'].value) {
                    this.getExistingRowBuList(this.certificationFormArray.controls[certIndex]['controls']['companyId'].value, this.certificationFormArray.controls[certIndex]);
                }
                if (this.certificationFormArray.controls[certIndex]['controls']['buisinessUnitId'].value) {
                    this.getExistingRowDepartmentlist(this.certificationFormArray.controls[certIndex]['controls']['buisinessUnitId'].value, this.certificationFormArray.controls[certIndex]);
                }
                if (this.certificationFormArray.controls[certIndex]['controls']['departmentId'].value) {
                    this.getExistingRowDivisionlist(this.certificationFormArray.controls[certIndex]['controls']['departmentId'].value, this.certificationFormArray.controls[certIndex]);
                }
                break;
            case "repairForm":
                this.repairFormArray.push(mfObj);
                let repIndex = this.repairFormArray.controls.length - 1;
                this.repairFormArray.controls[repIndex]['buList'] = [];
                this.repairFormArray.controls[repIndex]['departmentList'] = [];
                this.repairFormArray.controls[repIndex]['divisionlist'] = [];
                if (this.repairFormArray.controls[repIndex]['controls']['companyId'].value) {
                    this.getExistingRowBuList(this.repairFormArray.controls[repIndex]['controls']['companyId'].value, this.repairFormArray.controls[repIndex]);
                }
                if (this.repairFormArray.controls[repIndex]['controls']['buisinessUnitId'].value) {
                    this.getExistingRowDepartmentlist(this.repairFormArray.controls[repIndex]['controls']['buisinessUnitId'].value, this.repairFormArray.controls[repIndex]);
                }
                if (this.repairFormArray.controls[repIndex]['controls']['departmentId'].value) {
                    this.getExistingRowDivisionlist(this.repairFormArray.controls[repIndex]['controls']['departmentId'].value, this.repairFormArray.controls[repIndex]);
                }
                break;
            case "exchangeForm":
                this.exchangeFormArray.push(mfObj);
                let excngIndex = this.exchangeFormArray.controls.length - 1;
                this.exchangeFormArray.controls[excngIndex]['buList'] = [];
                this.exchangeFormArray.controls[excngIndex]['departmentList'] = [];
                this.exchangeFormArray.controls[excngIndex]['divisionlist'] = [];
                if (this.exchangeFormArray.controls[excngIndex]['controls']['companyId'].value) {
                    this.getExistingRowBuList(this.exchangeFormArray.controls[excngIndex]['controls']['companyId'].value, this.exchangeFormArray.controls[excngIndex]);
                }
                if (this.exchangeFormArray.controls[excngIndex]['controls']['buisinessUnitId'].value) {
                    this.getExistingRowDepartmentlist(this.exchangeFormArray.controls[excngIndex]['controls']['buisinessUnitId'].value, this.exchangeFormArray.controls[excngIndex]);
                }
                if (this.exchangeFormArray.controls[excngIndex]['controls']['departmentId'].value) {
                    this.getExistingRowDivisionlist(this.exchangeFormArray.controls[excngIndex]['controls']['departmentId'].value, this.exchangeFormArray.controls[excngIndex]);
                }
                break;
        }
    }
    checkIsExisted(type, modal, myForm) {
        let itemExisted = false;
        myForm.controls.forEach(data => {
            if (data['controls']['aircraftTypeId'].value == type && data['controls']['aircraftModelId'].value == modal) {
                itemExisted = true;
                return itemExisted;
            }
        });
        return itemExisted;
    }
    addModels(capData) {
        this.capabilityTypeData.for
        let capbilitiesObj = new ItemMasterCapabilitiesModel;
        // this.resetFormArray(capData);
        capData.selectedManufacturer.forEach(element1 => {
            capbilitiesObj.itemMasterId = this.ItemMasterId;
            capbilitiesObj.aircraftTypeId = element1.value;
            capbilitiesObj.aircraftTypeName = element1.label;
            capbilitiesObj.capabilityTypeId = capData.CapabilityTypeId;
            capbilitiesObj.aircraftManufacturer = element1.label;
            capData.selectedModel.forEach(element2 => {
                if (element2.aircraftTypeId == element1.value) {
                    capbilitiesObj.aircraftModelName = element2.label;
                    capbilitiesObj.aircraftModelId = element2.value;
                    let mfObj = this.formBuilder.group(capbilitiesObj);
                    switch (capData.formArrayName) {
                        case "mfgForm":
                            let mfgItemExisted = this.checkIsExisted(element1.value, element2.value, this.mfgFormArray);
                            if (mfgItemExisted == false) {
                                this.mfgFormArray.push(mfObj);
                                let mfgIndex = this.mfgFormArray.controls.length - 1;
                                this.mfgFormArray.controls[mfgIndex]['buList'] = [];
                                this.mfgFormArray.controls[mfgIndex]['departmentList'] = [];
                                this.mfgFormArray.controls[mfgIndex]['divisionlist'] = [];
                            }

                            break;
                        case "overhaulForm":
                            let oralItemExisted = this.checkIsExisted(element1.value, element2.value, this.overhaulFormArray);
                            if (oralItemExisted == false) {
                                this.overhaulFormArray.push(mfObj);
                                let overIndex = this.overhaulFormArray.controls.length - 1;
                                this.overhaulFormArray.controls[overIndex]['buList'] = [];
                                this.overhaulFormArray.controls[overIndex]['departmentList'] = [];
                                this.overhaulFormArray.controls[overIndex]['divisionlist'] = [];
                            }
                            break;
                        case "distributionForm":
                            let distExisted = this.checkIsExisted(element1.value, element2.value, this.distributionFormArray);
                            if (distExisted == false) {
                                this.distributionFormArray.push(mfObj);
                                let distIndex = this.distributionFormArray.controls.length - 1;
                                this.distributionFormArray.controls[distIndex]['buList'] = [];
                                this.distributionFormArray.controls[distIndex]['departmentList'] = [];
                                this.distributionFormArray.controls[distIndex]['divisionlist'] = [];
                            }
                            break;
                        case "certificationForm":
                            let certExisted = this.checkIsExisted(element1.value, element2.value, this.certificationFormArray);
                            if (certExisted == false) {
                                this.certificationFormArray.push(mfObj);
                                let certIndex = this.certificationFormArray.controls.length - 1;
                                this.certificationFormArray.controls[certIndex]['buList'] = [];
                                this.certificationFormArray.controls[certIndex]['departmentList'] = [];
                                this.certificationFormArray.controls[certIndex]['divisionlist'] = [];
                            }
                            break;
                        case "repairForm":
                            let repairExisted = this.checkIsExisted(element1.value, element2.value, this.repairFormArray);
                            if (repairExisted == false) {
                                this.repairFormArray.push(mfObj);
                                let repIndex = this.repairFormArray.controls.length - 1;
                                this.repairFormArray.controls[repIndex]['buList'] = [];
                                this.repairFormArray.controls[repIndex]['departmentList'] = [];
                                this.repairFormArray.controls[repIndex]['divisionlist'] = [];
                            }
                            break;
                        case "exchangeForm":
                            let exchangeExisted = this.checkIsExisted(element1.value, element2.value, this.exchangeFormArray);
                            if (exchangeExisted == false) {
                                this.exchangeFormArray.push(mfObj);
                                let excngIndex = this.exchangeFormArray.controls.length - 1;
                                this.exchangeFormArray.controls[excngIndex]['buList'] = [];
                                this.exchangeFormArray.controls[excngIndex]['departmentList'] = [];
                                this.exchangeFormArray.controls[excngIndex]['divisionlist'] = [];
                            }
                            break;
                    }
                }

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
            capabilityCollection.push(element);
        });
        overhaulForm.forEach(element => {
            capabilityCollection.push(element);
        });
        distributionForm.forEach(element => {
            capabilityCollection.push(element);
        });
        certificationForm.forEach(element => {
            capabilityCollection.push(element);
        });
        repairForm.forEach(element => {
            capabilityCollection.push(element);
        });
        exchangeForm.forEach(element => {
            capabilityCollection.push(element);
        });

        this.itemser.saveManfacturerinforcapes(capabilityCollection).subscribe(data11 => {
            //this.collectionofItemMaster = data11;
            this.router.navigateByUrl("/itemmastersmodule/itemmasterpages/app-item-master-capabilities-list");
            // alert("success");
        })

    }

    /**disableAddButton() for diable Add Button*/
    disableAddButton(item) {
        let isDisable = false;
        if (this.ItemMasterId > 0 && (item.selectedAircraftTypes.length > 0 && item.selectedAircraftModelTypes.length > 0)) {
            isDisable = false;
        } else {
            isDisable = true;
        }
        return isDisable;
    }

    addBtnTitle(item) {
        let addBtnTitle = '';
        if (this.ItemMasterId < 1) {
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

    disableSaveBtn() {
        let isDisable = false;
        let capbilitiesForm = this.capabilitiesForm.value;
        if (this.ItemMasterId > 0 && (capbilitiesForm.mfgForm.length > 0 || capbilitiesForm.overhaulForm.length || capbilitiesForm.distributionForm.length
            || capbilitiesForm.certificationForm.length || capbilitiesForm.repairForm.length || capbilitiesForm.exchangeForm.length)) {
            isDisable = false;
        } else {
            isDisable = true;
        }
        return isDisable;
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
}