import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
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
    @Input() itemMasterId ; 
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
    capabilityTypeId = null;
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
        { field: "AircraftType", header: "Aircraft" },
        { field: "AircraftModel", header: "Model" },
        { field: "DashNumber", header: "Dash Numbers" },
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
    constructor(public itemser: ItemMasterService,
        private aircraftModelService: AircraftModelService,
        private Dashnumservice: DashNumberService,
        private commonService: CommonService,
        private workOrderService: WorkOrderService,
        private alertService: AlertService,
        private authService: AuthService,
        public vendorser: VendorService,
        private atasubchapter1service: AtaSubChapter1Service,
    ) { }
    ngOnInit() {
        this.getCapabilityTypesList();
        this.getAircraftTypesList();
        // this.getAtAChapters();
        // this.getIntergationWithList();
        // this.getAllEmployees();
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
            console.log(res);

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



    mapAircraftInformation() {
        console.log(this.selectedDashnumber)
        this.viewTable = true;
        // Selected All 
        if (this.selectedAircraftId !== undefined && this.selectedModelId !== undefined && this.selectedDashnumber !== undefined) {
            this.Dashnumservice.getAllDashModels(this.dashNumberUrl, this.selectedAircraftId, this.selectedDashnumber).subscribe(aircraftdata => {
                const responseValue = aircraftdata;
                this.aircraftData = responseValue.map(x => {
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
                       
                        capailityTypeId:  this.capabilityTypeId,
                        capailityTypeName:  getValueFromArrayOfObjectById ('label','value', this.capabilityTypeId ,this.capabalityTypeList),
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
            })
        }
        if (this.selectedAircraftId !== undefined && this.modelUnknown) {
            this.aircraftData = [{
                AircraftType: this.newValue,
                aircraftTypeId: this.selectedAircraftId,
                AircraftModel: 'Unknown',
                DashNumber: 'Unknown',
                AircraftModelId: '',
                DashNumberId: '',
                Memo: '',
                IsChecked: false,
                // ...this.capes
                capailityTypeId:  this.capabilityTypeId,
                capailityTypeName:  getValueFromArrayOfObjectById ('label','value', this.capabilityTypeId ,this.capabalityTypeList),
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
        }

        if (this.selectedAircraftId !== undefined && this.selectedModelId !== undefined && this.dashNumberUnknown) {
            this.aircraftData = this.selectedModelId.map(x => {
                return {
                    AircraftType: this.newValue,
                    aircraftTypeId: this.selectedAircraftId,
                    AircraftModel: x.modelName,
                    DashNumber: 'Unknown',
                    AircraftModelId: x.aircraftModelId,
                    DashNumberId: '',
                    Memo: '',
                    IsChecked: false,
                    // ...this.capes,
                    capailityTypeId:  this.capabilityTypeId,
                    capailityTypeName: getValueFromArrayOfObjectById ('label','value', this.capabilityTypeId ,this.capabalityTypeList),
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
        }

        this.getPartPublicationByItemMasterId();
        this.getAtAChapters();
        this.getIntergationWithList();
        this.getAllEmployees();
        this.getLegalEntity();

    }

    
    getDynamicVariableData(variable, index) {
        return this[variable + index]
    }



    async getPartPublicationByItemMasterId() {
        await this.workOrderService.getPartPublicationByItemMaster(this.itemMasterId).subscribe(res => {
            this.cmmList = res.map(x => {
                return {
                    value: x.publicationRecordId,
                    label: x.publicationId
                }
            });
        })
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
            this['ataSubChapaters' + index] = responseData.map(x => {
				return {
					label: x.description,
					value: x.ataChapterId
				}
			})
		})
	}

    saveCapability(){
        const capesData = [
            ...this.aircraftData.map(x => { 
                return {
                    ...x,
                    aircraftDashNumberId : x.DashNumberId,
                    itemMasterId : 19,
                    masterCompanyId:1,
                    createdBy: this.userName,
                    updatedBy: this.userName,
                    createdDate:new Date(),
                    updatedDate:new Date(),
                    isActive:true,
                    isDeleted:false
                }
            }),

        ]
        this.itemser.saveItemMasterCapes(capesData).subscribe(res => {
            this.aircraftData = [];
            this.alertService.showMessage(
                this.moduleName,
                'Saved Capes Details Successfully',
                MessageSeverity.success
            );
        })
    }
}