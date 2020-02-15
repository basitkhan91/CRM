import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';
import { AircraftModelService } from '../../../../services/aircraft-model/aircraft-model.service';
import { DashNumberService } from '../../../../services/dash-number/dash-number.service';
import { CommonService } from '../../../../services/common.service';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import { getValueFromObjectByKey, getValueFromArrayOfObjectById } from '../../../../generic/autocomplete';
import { AuthService } from '../../../../services/auth.service';
import { VendorService } from '../../../../services/vendor.service';
import { AtaSubChapter1Service } from '../../../../services/atasubchapter1.service';

@Component({
    selector: 'app-item-master-create-capabilities',
    templateUrl: './item-master-create-capabilities.component.html',
    styleUrls: ['./item-master-create-capabilities.component.scss'],
    animations: [fadeInOut]
})
/** item-master-create-capabilities component*/
export class ItemMasterCreateCapabilitiesComponent implements OnInit {
    @Input() itemMasterId;
    @Input() isCapViewMode : any = false;
    manufacturerData: any = [];
    LoadValues: any;
    selectedAircraftId: any;
    modelUnknown = false;
    dashNumberUnknown = false;
    dashNumberUrl = '';
    selectedModelId: any;
    LoadDashnumber = [];
    selectedDashnumber = undefined;
    newDashnumValue: any = [];
    newModelValue: any = [];
    viewTable: boolean = false;
    aircraftData: any;
    newValue: any;
    capabilityTypeId: any = [];
    // ataSubChapaters = [];
    ataChapters = [];
    intergationList = [];
    cmmList = [];
    employeeList = [];
    // capesObject = {
    //     capailityTypeId: null,
    //     capailityTypeName: '',
    //     managementStructureId: null,
    //     description: '',
    //     ataChapterId: null,
    //     ataSubChapterId: null,
    //     entryDate: new Date(),
    //     cmmId: null,
    //     integrateWithId: null,
    //     isVerified: false,
    //     verifiedById: null,
    //     verifiedDate: new Date(),
    //     memo: '',
    //     companyId: null,
    //     buId: null,
    //     divisionId: null,
    //     departmentId: null,
    // }
    // capes = {...this.capesObject};
    moduleName = 'Capes';

    colaircraft: any[] = [
        // {field: 'capailityTypeName' , header: 'Capability Type' },
        // {field: 'managementStructureId', header: 'ManagementStructure'},
        // { field: "AircraftType", header: "Aircraft" },
        // { field: "AircraftModel", header: "Model" },
        // { field: "DashNumber", header: "Dash Numbers" },
        // {field: 'description', header:'Description'},
        // {field: 'ataChapterId' , header : 'ATA Chapter'},
        // {field: 'ataSubChapterId', header: 'ATA SubChapter'},
        // {field: 'entryDate', header: 'EntryDate'},
        // {field: 'cmmId', header: 'CMM'},
        // {field: 'integrateWithId', header: 'IntegrateWith'},
        // {field: 'isVerified', header: 'Verified'},
        // {field: 'verifiedById', header: 'VerifiedBy'},
        // {field: 'verifiedDate', header: 'VerifiedDate'},
        // {field: 'memo', header: 'Memo'},


    ];
    capabalityTypeList: any;
    legalEntityList: any = [];
    pnData: any = [];
    itemMasterIDFromPartNumberSelection: any;
    @Output() loadCapesList = new EventEmitter<any>();
    @Output() closeCapesPopup = new EventEmitter<any>();
    @Input() isEnableCapesList: boolean = false;
    selectedAircraftName: any;
    partData: any = {};
    itemMastersList: any[] = [];

    constructor(public itemser: ItemMasterService,
        private aircraftModelService: AircraftModelService,
        private Dashnumservice: DashNumberService,
        private commonService: CommonService,
        private workOrderService: WorkOrderService,
        private alertService: AlertService,
        private authService: AuthService,
        public vendorser: VendorService,
        private atasubchapter1service: AtaSubChapter1Service,
        private activatedRoute: ActivatedRoute,
        private _router: Router,
    ) {
        this.itemser.currentUrl = '/itemmastersmodule/itemmasterpages/app-item-master-create-capabilities';
            this.itemser.bredcrumbObj.next(this.itemser.currentUrl);//Bread Crumb
     }
    ngOnInit() {
        console.log(this.itemMasterId, "itemMasterId")
        console.log(this.isCapViewMode, "isCapViewMode++s")
        this.getCapabilityTypesList();
        this.getAircraftTypesList();
        // this.getAtAChapters();
        // this.getIntergationWithList();
        // this.getAllEmployees();
        this.getItemMasterList();
        this.resetFormData();

    }
    getItemMasterList() {


        this.itemser.getItemStockList("Stock").subscribe(res => {
            console.log(res);
            let resData = res[0];
            this.itemMastersList = resData;
            if (resData) {
                for (let i = 0; i < resData.length; i++) {
                    this.pnData.push({
                        label: resData[i].partNumber, value: resData[i].itemMasterId
                    })
                    if(this.itemMasterId){
                        if(resData[i].itemMasterId == this.itemMasterId){
                            this.partData = {
                                partNumber: resData[i].partNumber,
                                partDescription: resData[i].partDescription,
                                manufacturerName: resData[i].manufacturer.name
                            }
                        }
                    }
                   
                }
            }

        })
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    getCapabilityTypesList() {
        this.commonService.smartDropDownList('CapabilityType', 'CapabilityTypeId', 'Description').subscribe(res => {
            this.capabalityTypeList = res;
        })
    }



    getAircraftTypesList() {
        this.itemser.getAircraft().subscribe(res => {
            const allaircraftInfo = res[0];


            if (allaircraftInfo) {
                if (allaircraftInfo.length > 0) {
                    for (let i = 0; i < allaircraftInfo.length; i++)
                        this.manufacturerData.push(
                            { value: allaircraftInfo[i].aircraftTypeId, label: allaircraftInfo[i].description },
                        );
                }
            }
        })
    }

    getAircraftModelByManfacturer(value) {
        // this.newValue = value.originalEvent.target.textContent;
        let airtCraftObject = this.manufacturerData.find(element => element.value == this.selectedAircraftId);
        this.selectedAircraftName = airtCraftObject.label;
        // if (this.newValue) {
        this.aircraftModelService.getAircraftModelListByManufactureId(this.selectedAircraftId).subscribe(models => {

            const responseValue = models[0];
            this.LoadValues = responseValue.map(models => {
                return {
                    label: models.modelName,
                    value: models
                }
            });

        });
        this.selectedModelId = undefined;
        this.selectedDashnumber = undefined;
    }

    getDashNumberByTypeandModel(value) {
        this.newModelValue = value.originalEvent.target.textContent;
        this.dashNumberUrl = this.selectedModelId.reduce((acc, obj) => {

            return `${acc},${obj.aircraftModelId}`
        }, '')
        this.dashNumberUrl = this.dashNumberUrl.substr(1);
        this.Dashnumservice.getDashNumberByModelTypeId(this.dashNumberUrl, this.selectedAircraftId).subscribe(dashnumbers => {
            const responseData = dashnumbers;
            this.LoadDashnumber = responseData.map(dashnumbers => {
                return {
                    label: dashnumbers.dashNumber,
                    value: dashnumbers.dashNumberId
                }
            });
            this.filterDashNumberDropdown(this.aircraftData)

        });
    }

    selectedDashnumbervalue(value) {
        this.newDashnumValue = value.originalEvent.target.textContent;
        console.log()
    }


    resetAircraftModelsorDashNumbers() {
        if (this.modelUnknown) {
            this.selectedModelId = undefined;
            this.selectedDashnumber = undefined;

        }
        if (this.dashNumberUnknown) {

            this.selectedDashnumber = undefined;

        }

    }

    mapAircraftInformation(){
        this.viewTable = true;
        // const responseValue = aircraftdata;
        console.log(this.capabilityTypeId, "this.capabilityTypeId+++")
            let mappedAircraftData = this.capabilityTypeId.map(x => {
                console.log(x, "x capid")
                return {
                    Memo: '',
                    IsChecked: false,
                    // ...this.capes

                    capabilityTypeId: x,
                    capailityTypeName: getValueFromArrayOfObjectById('label', 'value', x, this.capabalityTypeList),
                    managementStructureId: null,
                    description: '',
                    
                    entryDate: new Date(),                   
                    isVerified: false,
                    verifiedById: null,
                    verifiedDate: new Date(),
                    memo: '',
                    companyId: null,
                    buId: null,
                    divisionId: null,
                    departmentId: null,
                }
            })
            for(let i=0; i<mappedAircraftData.length; i++){
                this.aircraftData = [...this.aircraftData, mappedAircraftData[i]]
            }
            console.log(this.aircraftData, "this.aircarftdata");
            this.getLegalEntity();
            this.getAllEmployees();
            this.filterCapabilityListDropdown(this.aircraftData);

            // this.filterDashNumberDropdown(this.aircraftData);
    }

    mapAircraftInformationOld() {
    console.log(this.selectedDashnumber)
    this.viewTable = true;
    // Selected All 
    if (this.selectedAircraftId !== undefined && this.selectedModelId !== undefined && this.selectedDashnumber !== undefined) {
        this.Dashnumservice.getAllDashModels(this.dashNumberUrl, this.selectedAircraftId, this.selectedDashnumber).subscribe(aircraftdata => {
            const responseValue = aircraftdata;
            let mappedAircraftData = responseValue.map(x => {
                return {
                    AircraftType: x.aircraft,
                    aircraftTypeId: this.selectedAircraftId,
                    AircraftModel: x.model,
                    DashNumber: x.dashNumber,
                    AircraftModelId: x.modelid,
                    DashNumberId: x.dashNumberId,
                    Memo: '',
                    IsChecked: false,
                    // ...this.capes

                    capabilityTypeId: this.capabilityTypeId,
                    capailityTypeName: getValueFromArrayOfObjectById('label', 'value', this.capabilityTypeId, this.capabalityTypeList),
                    managementStructureId: null,
                    description: '',
                    ataChapterId: null,
                    ataSubChapterId: null,
                    entryDate: new Date(),
                    cmmId: null,
                    integrateWithId: null,
                    isVerified: false,
                    verifiedById: null,
                    verifiedDate: new Date(),
                    memo: '',
                    companyId: null,
                    buId: null,
                    divisionId: null,
                    departmentId: null,
                }
            })
            for(let i=0; i<mappedAircraftData.length; i++){
                this.aircraftData = [...this.aircraftData, mappedAircraftData[i]]
            }
            console.log(this.aircraftData, "this.aircarftdata");
            this.filterDashNumberDropdown(this.aircraftData);

        })
    }
    if (this.selectedAircraftId !== undefined && this.modelUnknown) {
        let mappedAircraftData  = [{
            AircraftType: this.newValue,
            aircraftTypeId: this.selectedAircraftId,
            AircraftModel: 'Unknown',
            DashNumber: 'Unknown',
            AircraftModelId: 0,
            DashNumberId: 0,
            Memo: '',
            IsChecked: false,
            // ...this.capes
            capabilityTypeId: this.capabilityTypeId,
            capailityTypeName: getValueFromArrayOfObjectById('label', 'value', this.capabilityTypeId, this.capabalityTypeList),
            managementStructureId: null,
            description: '',
            ataChapterId: null,
            ataSubChapterId: null,
            entryDate: new Date(),
            cmmId: null,
            integrateWithId: null,
            isVerified: false,
            verifiedById: null,
            verifiedDate: new Date(),
            memo: '',
            companyId: null,
            buId: null,
            divisionId: null,
            departmentId: null,
        }]
        for(let i=0; i<mappedAircraftData.length; i++){
            this.aircraftData = [...this.aircraftData, mappedAircraftData[i]]
        }
    }

    if (this.selectedAircraftId !== undefined && this.selectedModelId !== undefined && this.dashNumberUnknown) {
        let mappedAircraftData = this.selectedModelId.map(x => {
            return {
                AircraftType: this.newValue,
                aircraftTypeId: this.selectedAircraftId,
                AircraftModel: x.modelName,
                DashNumber: 'Unknown',
                AircraftModelId: x.aircraftModelId,
                DashNumberId: 0,
                Memo: '',
                IsChecked: false,
                // ...this.capes,
                capabilityTypeId: this.capabilityTypeId,
                capailityTypeName: getValueFromArrayOfObjectById('label', 'value', this.capabilityTypeId, this.capabalityTypeList),
                managementStructureId: null,
                description: '',
                ataChapterId: null,
                ataSubChapterId: null,
                entryDate: new Date(),
                cmmId: null,
                integrateWithId: null,
                isVerified: false,
                verifiedById: null,
                verifiedDate: new Date(),
                memo: '',
                companyId: null,
                buId: null,
                divisionId: null,
                departmentId: null,
            }
        })
        for(let i=0; i<mappedAircraftData.length; i++){
            this.aircraftData = [...this.aircraftData, mappedAircraftData[i]]
        }
    }
    console.log(this.aircraftData, "this.aircraftData+++")
    this.getPartPublicationByItemMasterId(this.itemMasterId);
    this.getAtAChapters();
    this.getIntergationWithList();
    this.getAllEmployees();
    this.getLegalEntity();

    }


    getDynamicVariableData(variable, index) {
        return this[variable + index]
    }



    async getPartPublicationByItemMasterId(itemMasterId) {
        this.capabilityTypeId = [];
        this.aircraftData = [];
        let iMid = this.activatedRoute.snapshot.paramMap.get('id');
        if (!iMid) {
            iMid = this.itemMasterIDFromPartNumberSelection;
        }
        for(let i=0; i<this.itemMastersList.length; i++){
            if(this.itemMastersList[i].itemMasterId == iMid){
                this.partData = {
                    partNumber: this.itemMastersList[i].partNumber,
                    partDescription: this.itemMastersList[i].partDescription,
                    manufacturerName: this.itemMastersList[i].manufacturer.name
                }
            }
        }
        
        // await this.workOrderService.getPartPublicationByItemMaster(iMid).subscribe(res => {
        //     this.cmmList = res.map(x => {
        //         return {
        //             value: x.publicationRecordId,
        //             label: x.publicationId
        //         }
        //     });
        // })
    }

    resetVerified(rowData, value) {
        if (value === false) {
            rowData.verifiedById = null;
            rowData.verifiedDate = new Date();
        }
    }

    getAtAChapters() {
        this.commonService.smartDropDownList('ATAChapter', 'ATAChapterId', 'ATAChapterName').subscribe(res => {
            this.ataChapters = res;
        })
    }
    getIntergationWithList() {
        this.commonService.smartDropDownList('IntegrationPortal', 'IntegrationPortalId', 'Description').subscribe(res => {
            this.intergationList = res;
        })
    }
    async getAllEmployees() {
        await this.commonService.smartDropDownList('Employee', 'EmployeeId', 'FirstName').subscribe(res => {
            this.employeeList = res;
        })
    }


    getLegalEntity() {
        this.commonService.getLegalEntityList().subscribe(res => {
            this.legalEntityList = res;
        })
    }


    selectedLegalEntity(legalEntityId, index) {
        console.log(index);
        if (legalEntityId) {
            this.aircraftData[index].managementStructureId = legalEntityId;
            this.commonService.getBusinessUnitListByLegalEntityId(legalEntityId).subscribe(res => {
                this['businessUnitList' + index] = res;

            })
        }

    }
    selectedBusinessUnit(businessUnitId, index) {
        if (businessUnitId) {
            this.aircraftData[index].managementStructureId = businessUnitId;
            this.commonService.getDivisionListByBU(businessUnitId).subscribe(res => {

                this['divisionList' + index] = res;
            })
        }

    }
    selectedDivision(divisionUnitId, index) {
        if (divisionUnitId) {
            this.aircraftData[index].managementStructureId = divisionUnitId;
            this.commonService.getDepartmentListByDivisionId(divisionUnitId).subscribe(res => {
                this['departmentList' + index] = res;
            })
        }

    }
    selectedDepartment(departmentId, index) {
        if (departmentId) {
            this.aircraftData[index].managementStructureId = departmentId;
        }
    }





    // get subchapter by Id in the add ATA Mapping
    getATASubChapterByATAChapter(value, index) {


        this.atasubchapter1service.getATASubChapterListByATAChapterId(value).subscribe(atasubchapter => {
            const responseData = atasubchapter[0];
            console.log(atasubchapter[0]);
            this["ataSubChapaters" + index] = responseData.map(x => {
                return {
                    label: x.description,
                    value: x.ataChapterId
                }
            })
            console.log(this["ataSubChapaters" + index]);
        })
    }

    saveCapability() {
        let iMid = this.activatedRoute.snapshot.paramMap.get('id');
        if (!iMid) {
            iMid = this.itemMasterIDFromPartNumberSelection;
        }


        const capesData = [
            ...this.aircraftData.map(x => {
                return {
                    ...x,
                    aircraftDashNumberId: x.DashNumberId,
                    itemMasterId: iMid,
                    masterCompanyId: 1,
                    createdBy: this.userName,
                    updatedBy: this.userName,
                    createdDate: new Date(),
                    updatedDate: new Date(),
                    isActive: true,
                    isDeleted: false
                }
            }),

        ]
        this.itemser.saveItemMasterCapes(capesData).subscribe(res => {
            this.aircraftData = [];
            this.resetFormData();
            this.loadCapesList.emit(true);
            this.alertService.showMessage(
                this.moduleName,
                'Saved Capes Details Successfully',
                MessageSeverity.success
            );
            let iMid = this.activatedRoute.snapshot.paramMap.get('id');
            if (!iMid) {
                this._router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-capabilities-list');
            }
            
        })
        // this.onCloseCapes();
        
    }

    resetFormData() {
        this.capabilityTypeId  = [] ;
        this.selectedAircraftId = null;
        this.selectedAircraftName = "";
        this.modelUnknown = false;
        this.selectedModelId = null;
        this.LoadValues = [];
        this.dashNumberUnknown = false;
        this.LoadDashnumber = [];
        this.newDashnumValue = [];
        this.newModelValue = [];
        this.aircraftData  = [];
        this.viewTable = false;
    }
    onCloseCapes() {
        this.closeCapesPopup.emit(true);
    }
    filterDashNumberDropdown (aircraft){        
        var props =  ['label', 'value'];
        var result = this.LoadDashnumber.filter(function(o1){
            return !aircraft.some(function(o2){
                return o1.value === o2.DashNumberId;          // assumes unique id
            });
        }).map(function(o){  
            return props.reduce(function(newo, name){
                newo[name] = o[name];
                return newo;
            }, {});
        });
        this.LoadDashnumber = result;
        this.selectedDashnumber = undefined;
        console.log(this.LoadDashnumber, "this.LoadDashnumber +++")
    }

    filterCapabilityListDropdown (aircraft){        
        var props =  ['label', 'value'];
        var result = this.capabalityTypeList.filter(function(o1){
            return !aircraft.some(function(o2){
                return o1.value === o2.capabilityTypeId;          // assumes unique id
            });
        }).map(function(o){  
            return props.reduce(function(newo, name){
                newo[name] = o[name];
                return newo;
            }, {});
        });
        this.capabalityTypeList = result;
        this.capabilityTypeId = undefined;
        console.log(this.capabalityTypeList, "this.LoadDashnumber +++")
    }
}