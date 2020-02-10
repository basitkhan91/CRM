import { Component, OnInit, Input, EventEmitter, Output, ViewChild, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemMasterService } from '../../../services/itemMaster.service';

import { DashNumberService } from '../../../services/dash-number/dash-number.service';
import { AircraftModelService } from '../../../services/aircraft-model/aircraft-model.service';
import { CustomerService } from '../../../services/customer.service';
import { AuthService } from '../../../services/auth.service';
import { AlertService, MessageSeverity } from '../../../services/alert.service';

import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { error } from '@angular/compiler/src/util';
import { HttpErrorResponse } from '@angular/common/http';
import * as $ from 'jquery';
@Component({
    selector: 'app-customer-aircraft',
    templateUrl: './customer-aircraft.component.html',
    styleUrls: ['./customer-aircraft.component.scss'],

})
/** CustomerEdit component*/
export class CustomerAircraftComponent implements OnInit {
    @Input() savedGeneralInformationData: any = {};
    @Input() editGeneralInformationData;
    // @Input() editCustomerId;
    @Input() editMode;
    @Output() tab = new EventEmitter();
    @ViewChild("aircraftForm") aircraftForm: any;
    @Input() customerDataFromExternalComponents: any;
    // for disabled form submit buttons
    disableSave: boolean = true;
    // aircraft Type used for both 
    manufacturerData: { value: any; label: any; }[];
    // search Variables
    search_AircraftModelList: any = [];
    search_AircraftDashNumberList: any;
    // used for search in aircrafts
    selectAircraftManfacturer: any = '';
    // selectAircraftManfacturer: any = [];
    selectedAircraftModel = [];
    selectedDashNumbers = [];
    selectedmemo: any = '';
    viewAircraftData: any;
    modal: NgbModalRef;
    // add craft inventory variables 
    add_SelectedAircraftId: any;
    add_SelectedModel: any = [];
    add_SelectedDashNumber: any;

    isDeleteMode: boolean = false;
    add_AircraftModelList: any = [];
    add_AircraftDashNumberList: any = [];
    // temp data for the pop inventory
    tempAircraftType: any;
    tempAircraftModel: any;
    // search aircraft pramas
    aircraftManfacturerIdsUrl: string = '';
    aircraftModelsIdUrl: string = '';
    dashNumberIdUrl: string = '';
    searchAircraftParams: string = '';
    multipleModelUrl: any = '';
    tempAircraftDashNumber: any;
    modelUnknown: boolean = false;
    airCraftMappingId: number;
    inventoryData: any = [];
    editAirCraftData: any = [];
    selectedRowForDelete: any;
    aircraftdata: any = [];
    aircraftauditHisory: any[];
    colaircraft: any[] = [
        { field: "AircraftType", header: "Aircraft" },
        { field: "AircraftModel", header: "Model" },
        { field: "DashNumber", header: "Dash Numbers" },

    ];
    colsaircraftLD = [
        { field: "aircraftType", header: "Aircraft" },
        { field: "aircraftModel", header: "Model" },
        { field: "dashNumber", header: "Dash Numbers" },
        { field: "inventory", header: "Inventory" },
        { field: "memo", header: "Memo" }

    ]
    selectedColumns = this.colsaircraftLD;
    dashNumberUnknown: boolean = false;
    aircraftListDataValues: any = [];
    id: number;
    customerCode: any;
    customerName: any;
    public sourceCustomer: any = {}
    totalRecords: any;
    totalPages: number;
    pageSize: number = 10;
    showAdvancedSearchCard: boolean = false;
    isViewMode: boolean = false;

    stopmulticlicks:boolean;
    constructor(private route: ActivatedRoute, private itemser: ItemMasterService,
        private aircraftModelService: AircraftModelService,
        private Dashnumservice: DashNumberService,
        public customerService: CustomerService,
        private authService: AuthService,
        private alertService: AlertService,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
    ) {
        this.stopmulticlicks=false;
     }
    ngOnInit() {
        if (this.editMode) {
            this.id = this.editGeneralInformationData.customerId;
            this.customerCode = this.editGeneralInformationData.customerCode;
            this.customerName = this.editGeneralInformationData.name;
            this.getAircraftMappedDataByCustomerId();
            this.isViewMode = false;

        } else {
            if (this.customerDataFromExternalComponents) {
                this.id = this.customerDataFromExternalComponents.customerId;
                this.customerCode = this.customerDataFromExternalComponents.customerCode;
                this.customerName = this.customerDataFromExternalComponents.name;
                this.getAircraftMappedDataByCustomerId();
                this.isViewMode = true;
            } else {
                this.id = this.savedGeneralInformationData.customerId;
                this.customerCode = this.savedGeneralInformationData.customerCode;
                this.customerName = this.savedGeneralInformationData.name;
                this.isViewMode = false;
            }

        }

        this.route.data.subscribe(data => {
            console.log(data);
        })
        this.getAllAircraftManfacturer();
        this.getAllAircraftModels();
        this.getAllDashNumbers();


    }
    ngOnChanges(changes: SimpleChanges) {

        for (let property in changes) {
            if (property == 'customerDataFromExternalComponents') {

                if (changes[property].currentValue != {}) {
                    this.id = this.customerDataFromExternalComponents.customerId;
                    this.customerCode = this.customerDataFromExternalComponents.customerCode;
                    this.customerName = this.customerDataFromExternalComponents.name;
                    this.getAircraftMappedDataByCustomerId();
                    this.isViewMode = true;

                }
            }
        }

    }
    enableSave() {
        console.log('hello ,directive');
        this.disableSave = false;

    }
    closeMyModel() {
        $("#editAirCraftDetails").modal("hide");
        this.disableSave = true;
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }


    getAllAircraftManfacturer() {
        this.itemser.getAircraft().subscribe(res => {
            this.manufacturerData = res[0].map(x => {
                return {
                    value: x.aircraftTypeId, label: x.description
                }
            })
        });
    }

    // get all Aircraft Models
    getAllAircraftModels() {

        this.aircraftModelService.getAll().subscribe(models => {
            const responseValue = models[0];
            const aircraftModelList = responseValue.map(models => {
                return {
                    label: models.modelName,
                    value: models.aircraftModelId
                };
            });
            this.search_AircraftModelList = aircraftModelList;
            this.add_AircraftModelList = aircraftModelList;
        });
    }
    viewAircraftdbldisplay(data) {
        this.viewAircraftData = data;

        $('#viewAircraft').modal('show');



    }

    // get all dashnumber
    getAllDashNumbers() {
        this.Dashnumservice.getAll().subscribe(dashnumbers => {
            const responseData = dashnumbers[0];
            const dashNumberList = responseData.map(dashnumbers => {
                return {
                    label: dashnumbers.dashNumber,
                    value: dashnumbers.dashNumberId
                };
            });
            this.search_AircraftDashNumberList = dashNumberList;
            this.add_AircraftDashNumberList = dashNumberList;
        });
    }
    editAirCraft(rowData) {

        console.log('air');
        console.log(rowData);

        this.editAirCraftData = rowData;
        this.aircraftdata = rowData;
    }

    searchByFieldUrlCreateforAircraftInformation() {

        this.aircraftManfacturerIdsUrl = this.selectAircraftManfacturer;


        if (this.selectedAircraftModel.length > 0) {

            const aircraftModelIds = this.selectedAircraftModel.reduce((acc, id) => {
                return `${acc},${id}`;
            }, '');
            this.aircraftModelsIdUrl = aircraftModelIds.substr(1);
        } else {
            this.aircraftModelsIdUrl = '';
        }
        if (this.selectedDashNumbers.length > 0) {
            const dashNumberIds = this.selectedDashNumbers.reduce((acc, id) => {
                return `${acc},${id}`;
            }, '');
            this.dashNumberIdUrl = dashNumberIds.substr(1);
        } else {
            this.dashNumberIdUrl = '';
        }

    }

    async getAircraftModelByManfacturerType(id) {
        this.selectAircraftManfacturer = String(id);
        // construct url from array
        await this.searchByFieldUrlCreateforAircraftInformation();
        // reset the dropdowns
        this.selectedAircraftModel = [];
        this.selectedDashNumbers = []
        // checks where multi select is empty or not and calls the service
        if (this.selectAircraftManfacturer !== '') {
            this.aircraftModelService
                .getAircraftModelListByManufactureId(this.selectAircraftManfacturer)
                .subscribe(models => {
                    const responseValue = models[0];
                    this.search_AircraftModelList = responseValue.map(models => {
                        return {
                            label: models.modelName,
                            value: models.aircraftModelId
                        };
                    });
                });
        } else {
            this.getAllAircraftModels();
            this.getAllDashNumbers();
        }
    }
    async getDashNumberByManfacturerandModel() {
        // construct url from array
        await this.searchByFieldUrlCreateforAircraftInformation();
        // reset dropdown
        this.selectedDashNumbers = []
        // checks where multi select is empty or not and calls the service

        if (this.aircraftManfacturerIdsUrl !== '' && this.aircraftModelsIdUrl !== '') {
            this.Dashnumservice.getDashNumberByModelTypeId(
                this.aircraftModelsIdUrl,
                this.aircraftManfacturerIdsUrl
            ).subscribe(dashnumbers => {
                const responseData = dashnumbers;
                this.search_AircraftDashNumberList = responseData.map(dashnumbers => {

                    return {
                        label: dashnumbers.dashNumber,
                        value: dashnumbers.dashNumberId
                    };
                });
            });
        }
    }

    //  search aircraft information by all parameter
    async searchAircraftInformation() {

        await this.searchByFieldUrlCreateforAircraftInformation();
        this.searchAircraftParams = '';

        // checks where multi select is empty or not and calls the service
        if (
            this.aircraftManfacturerIdsUrl !== '' &&
            this.aircraftModelsIdUrl !== '' &&
            this.dashNumberIdUrl !== '' &&
            this.selectedmemo !== ''
        ) {

            this.searchAircraftParams = `AircraftTypeId=${this.aircraftManfacturerIdsUrl}&AircraftModelId=${this.aircraftModelsIdUrl}&DashNumberId=${this.dashNumberIdUrl}&memo=${this.selectedmemo}`;
        }
        else if (
            this.aircraftManfacturerIdsUrl !== '' &&
            this.aircraftModelsIdUrl !== '' &&
            this.dashNumberIdUrl !== ''

        ) {

            this.searchAircraftParams = `AircraftTypeId=${this.aircraftManfacturerIdsUrl}&AircraftModelId=${this.aircraftModelsIdUrl}&DashNumberId=${this.dashNumberIdUrl}`;
        }
        // search only by manfacturer and Model and  publicationId
        else if (
            this.aircraftManfacturerIdsUrl !== '' &&
            this.aircraftModelsIdUrl !== ''
        ) {
            this.searchAircraftParams = `AircraftTypeId=${this.aircraftManfacturerIdsUrl}&AircraftModelId=${this.aircraftModelsIdUrl}`;
        }

        else if (
            this.aircraftManfacturerIdsUrl !== '' &&
            this.dashNumberIdUrl !== ''
        ) {
            this.searchAircraftParams = `AircraftTypeId=${this.aircraftManfacturerIdsUrl}&DashNumberId=${this.dashNumberIdUrl}`;
        }
        else if (
            this.aircraftModelsIdUrl !== '' &&
            this.dashNumberIdUrl !== ''
        ) {
            this.searchAircraftParams = `AircraftModelId=${this.aircraftModelsIdUrl}&DashNumberId=${this.dashNumberIdUrl}`;
        }


        else if (this.aircraftManfacturerIdsUrl !== '') {
            this.searchAircraftParams = `AircraftTypeId=${this.aircraftManfacturerIdsUrl}`;
        }
        // search only by model and publicationId
        else if (this.aircraftModelsIdUrl !== '') {
            this.searchAircraftParams = `AircraftModelId=${this.aircraftModelsIdUrl}`;
        }
        // search only by dashNumber and publicationId
        else if (this.dashNumberIdUrl !== '') {
            this.searchAircraftParams = `DashNumberId=${this.dashNumberIdUrl}`;
        }

        else if (this.selectedmemo != '') {

            this.searchAircraftParams = `memo=${this.selectedmemo}`;
        }

        else if (this.selectedmemo != '' && this.dashNumberIdUrl !== '' && this.aircraftModelsIdUrl !== '') {

            this.searchAircraftParams = `AircraftModelId=${this.aircraftModelsIdUrl}&DashNumberId=${this.dashNumberIdUrl}&memo=${this.selectedmemo}`;
        }
        else if (this.selectedmemo != '' && this.dashNumberIdUrl !== '') {

            this.searchAircraftParams = `DashNumberId=${this.dashNumberIdUrl}&memo=${this.selectedmemo}`;
        }
        else if (this.selectedmemo != '' && this.aircraftModelsIdUrl !== '') {

            this.searchAircraftParams = `AircraftModelId=${this.aircraftModelsIdUrl}&memo=${this.selectedmemo}`;
        }

        this.customerService.searchAirMappedByMultiTypeIDModelIDDashIDByCustomerId(this.id, this.searchAircraftParams).subscribe(res => {
            this.aircraftListDataValues = res;
            if (this.aircraftListDataValues.length > 0) {
                this.totalRecords = this.aircraftListDataValues.length;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }

            // this.aircraftManfacturerIdsUrl = '';
            // this.aircraftModelsIdUrl = '';
            // this.dashNumberIdUrl = '';
            // this.selectedmemo = '';
            // this.selectAircraftManfacturer = '';
            // this.selectedAircraftModel = [];
            // this.selectedDashNumbers = [];
        });

    }
    getPageCount(totalNoofRecords, pageSize) {
        return Math.ceil(totalNoofRecords / pageSize)
    }
    paginateAircraftTable(event, totalNoofRecords) {
        this.totalPages = Math.ceil(totalNoofRecords / event.rows)

    }


    // add Inventory pop Functions

    getAircraftModelByManfacturer(value) {
        this.tempAircraftType = value.originalEvent.target.textContent;

        if (this.tempAircraftType) {
            this.aircraftModelService.getAircraftModelListByManufactureId(this.add_SelectedAircraftId).subscribe(models => {

                const responseValue = models[0];
                this.add_AircraftModelList = responseValue.map(models => {
                    return {
                        label: models.modelName,
                        value: models
                    }
                });

            });
            this.add_SelectedModel = [];
            this.add_AircraftDashNumberList = [];
        }
    }

    // get dashNumbers by Type and Model 
    getDashNumberByTypeandModel(value) {
        this.tempAircraftModel = value.originalEvent.target.textContent;
        console.log(this.add_SelectedModel)
        this.multipleModelUrl = this.add_SelectedModel.reduce((acc, obj) => {

            return `${acc},${obj.aircraftModelId}`
        }, '')
        this.multipleModelUrl = this.multipleModelUrl.substr(1);

        this.Dashnumservice.getDashNumberByModelTypeId(this.multipleModelUrl, this.add_SelectedAircraftId).subscribe(dashnumbers => {
            const responseData = dashnumbers;
            this.add_AircraftDashNumberList = responseData.map(dashnumbers => {
                return {
                    label: dashnumbers.dashNumber,
                    value: dashnumbers.dashNumberId
                }
            });

        });
    }

    selectedDashnumbervalue(value) {
        this.tempAircraftDashNumber = value.originalEvent.target.textContent;
    }

    mapAircraftInventory() {


        // Selected All 
        if (this.add_SelectedAircraftId !== undefined && this.add_SelectedModel.length > 0 && this.add_SelectedDashNumber !== undefined) {
            this.Dashnumservice.getAllDashModels(this.multipleModelUrl, this.add_SelectedAircraftId, this.add_SelectedDashNumber).subscribe(aircraftdata => {
                const responseValue = aircraftdata;
                this.inventoryData = responseValue.map(x => {
                    return {
                        AircraftTypeId: x.typeid,
                        AircraftType: x.aircraft,
                        AircraftModel: x.model,
                        DashNumber: x.dashNumber,
                        AircraftModelId: x.modelid,
                        DashNumberId: x.dashNumberId,
                        Inventory: null,
                        Memo: '',
                        IsChecked: false
                    }
                })
            })
        }

        if (this.add_SelectedAircraftId !== undefined && this.modelUnknown) {
            this.inventoryData = [{
                AircraftTypeId: this.add_SelectedAircraftId,
                AircraftType: this.tempAircraftType,
                AircraftModel: 'Unknown',
                DashNumber: 'Unknown',
                AircraftModelId: '',
                DashNumberId: '',
                Inventory: null,
                Memo: '',
                IsChecked: false
            }]
        }
        console.log(this.add_SelectedAircraftId !== undefined, this.add_SelectedModel.length > 0, this.dashNumberUnknown)
        if (this.add_SelectedAircraftId !== undefined && this.add_SelectedModel.length >= 0 && this.dashNumberUnknown) {
            this.inventoryData = this.add_SelectedModel.map(x => {
                return {
                    AircraftTypeId: this.add_SelectedAircraftId,
                    AircraftType: this.tempAircraftType,
                    AircraftModel: x.modelName,
                    DashNumber: 'Unknown',
                    AircraftModelId: x.aircraftModelId,
                    DashNumberId: '',
                    Inventory: null,
                    Memo: '',
                    IsChecked: false
                }
            })
        }



    }
    resetAircraftModelsorDashNumbers() {
        if (this.modelUnknown) {
            this.add_SelectedModel = [];
            this.add_SelectedDashNumber = undefined;

        }
        if (this.dashNumberUnknown) {

            this.add_SelectedDashNumber = undefined;

        }

    }
    updateCustomerAircraft() {

        const data = {
            ...this.editAirCraftData,
            customerAircraftMappingId: this.aircraftdata.customerAircraftMappingId,
            dashNumberId: this.aircraftdata.dashNumberId,
            aircraftModelId: this.aircraftdata.aircraftModelId,
            customerId: this.id,
            createdBy: this.userName,
            updatedBy: this.userName,
            aircraftType: this.aircraftdata.aircraftType,
            aircraftTypeId: this.aircraftdata.aircraftTypeId,
            dashNumber: this.aircraftdata.dashNumber,
            masterCompanyId: 1,
            isActive: true,
            isDeleted: false,
            aircraftModel: this.aircraftdata.aircraftModel

        }
        this.customerService.updatecustomeraircraft(data, this.aircraftdata.customerAircraftMappingId).subscribe(res => {

            this.getAircraftMappedDataByCustomerId();
            this.alertService.showMessage(
                'Success',
                `Updated Aircraft Sucessfully `,
                MessageSeverity.success
            );
        })

        $("#editAirCraftDetails").modal("hide");
        this.disableSave = true;

    }
    openAddInventoryPopup(content) {
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    inventoryValidation(event) {
        console.log(event.target.value, "event.target.value");
        if (event.target.value > 0) {
            return true;
        } else {
            this.alertService.showMessage(
                'Warn',
                'Inventory should be greater then 0',
                MessageSeverity.warn
            );
            event.target.value = undefined;

        }
    }

    saveAircraft(form) {
        // this.alertService.showMessage(
        //             'Warn',
        //             'Inventory should be greater then 0',
        //             MessageSeverity.warn
        //         );
        // const inventoryData = this.inventoryData.filter(x => {
        //     if (x.IsChecked) {
        //         return x;
        //     }
        // })
        //Inventory
        console.log(this.inventoryData, "this.inventoryData+");
        const data = this.inventoryData.map(obj => {
            // delete obj['IsChecked']
            return {
                ...obj,
                DashNumberId: obj.DashNumber === 'Unknown' ? null : obj.DashNumberId,
                AircraftModelId: obj.AircraftModel === 'Unknown' ? null : obj.AircraftModelId,
                CustomerId: this.id,
                MasterCompanyId: 1,
                createdBy: this.userName,
                updatedBy: this.userName,
                IsDeleted: false,

            }
        })
        this.customerService.postCustomerAircrafts(data).subscribe(res => {

            this.alertService.showMessage(
                'Success',
                'Mapped Aircraft Inventory Successfully',
                MessageSeverity.success
            );

            this.inventoryData = []
            this.add_SelectedAircraftId = undefined;
            this.add_SelectedModel = [];
            this.add_SelectedDashNumber = undefined;
            this.dashNumberUnknown = false;
            this.modelUnknown = false;
            this.dismissModel();
            this.getAircraftMappedDataByCustomerId()
        }, error => {
            this.alertService.showMessage(
                'Failed',
                error.error,
                MessageSeverity.error
            );
            this.inventoryData = []
            this.add_SelectedAircraftId = undefined;
            this.add_SelectedModel = [];
            this.add_SelectedDashNumber = undefined;
            this.dashNumberUnknown = false;
            this.modelUnknown = false;
            this.getAircraftMappedDataByCustomerId()

        })
        // } else {
        //     this.alertService.showMessage(
        //         'Warn',
        //         'Inventory should be greater then 0',
        //         MessageSeverity.warn
        //     );
        // }



    }

    getAircraftMappedDataByCustomerId() {
        this.customerService.getMappedAirCraftDetails(this.id).subscribe(res => {
            console.log(res);
            this.aircraftListDataValues = res;
            if (this.aircraftListDataValues.length > 0) {
                this.totalRecords = this.aircraftListDataValues.length;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }
        })
    }
    getCustomerAircraftHistory(row) {
        const { customerAircraftMappingId } = row;
        // this.alertService.startLoadingMessage();
        this.customerService.getMappedAirCraftDetailsAudit(customerAircraftMappingId).subscribe(res => {
            this.aircraftauditHisory = res;
        });
    }
    // private onAuditHistoryLoadSuccessful(auditHistory, content) {
    //     this.alertService.stopLoadingMessage();


    //     this.aircraftauditHisory = auditHistory;

    //     this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }
    openAircraftView(data) {
        console.log(data);
        this.viewAircraftData = data;

    }
    getColorCodeForHistory(i, field, value) {
        const data = this.aircraftauditHisory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }

    dismissModel() {
        this.modal.close();
    }
    // dismissModelHist() {
    //     $('#contentAuditHist').modal('hide');
    // }
    deleteAircraftMappedInventory(content, rowData) {

        this.isDeleteMode = true;
        this.selectedRowForDelete = rowData;

        this.airCraftMappingId = rowData.customerAircraftMappingId;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    deleteItemAndCloseModel() {

        let airCraftingMappingId = this.airCraftMappingId;
        if (airCraftingMappingId > 0) {

            this.customerService.deleteAircraftInvetoryById(airCraftingMappingId).subscribe(
                response => this.saveCompleted(this.sourceCustomer),
                error => this.saveFailedHelper(error));
        }
        this.modal.close();
    }
    nextClick() {
        this.stopmulticlicks=true;
      this.tab.emit('Atachapter');
        this.alertService.showMessage(
            'Success',
            ` ${this.editMode ? 'Updated' : 'Saved'} Aircraft Information Sucessfully `,
            MessageSeverity.success
        );
        setTimeout(()=>{
            this.stopmulticlicks=false;
        },500)
    }
    backClick() {

        this.tab.emit('Contacts');
    }
    private saveCompleted(user?: any) {

        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
            this.saveCompleted
        }
        this.getAircraftMappedDataByCustomerId();
    }
    private saveFailedHelper(error: any) {

        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

    enableDisableAdvancedSearch(val) {
        this.showAdvancedSearchCard = val;
        // this.search_SelectedContact = [];
        // this.search_SelectedATA = [];
        // this.search_SelectedATASubChapter = [];
        // this.getMappedATAByCustomerId();
        this.selectAircraftManfacturer = '';
        this.selectedAircraftModel = [];
        this.selectedDashNumbers = [];
        this.aircraftManfacturerIdsUrl = '';
        this.aircraftModelsIdUrl = '';
        this.dashNumberIdUrl = '';
        this.selectedmemo = '';
        this.getAircraftMappedDataByCustomerId();
    }



}