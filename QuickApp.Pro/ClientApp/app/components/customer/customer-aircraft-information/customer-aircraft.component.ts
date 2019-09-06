import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemMasterService } from '../../../services/itemMaster.service';

import { DashNumberService } from '../../../services/dash-number/dash-number.service';
import { AircraftModelService } from '../../../services/aircraft-model/aircraft-model.service';
import { CustomerService } from '../../../services/customer.service';
import { AuthService } from '../../../services/auth.service';



@Component({
    selector: 'app-customer-aircraft',
    templateUrl: './customer-aircraft.component.html',
    styleUrls: ['./customer-aircraft.component.scss'],

})
/** CustomerEdit component*/
export class CustomerAircraftComponent implements OnInit {
    @Input() savedGeneralInformationData;
    // aircraft Type used for both 
    manufacturerData: { value: any; label: any; }[];
    // search Variables
    search_AircraftModelList: any = [];
    search_AircraftDashNumberList: any;
    selectAircraftManfacturer: any = [];
    selectedAircraftModel = [];
    selectedDashNumbers = [];


    // add craft inventory variables 
    add_SelectedAircraftId: any;
    add_SelectedModel: any = [];
    add_SelectedDashNumber: any;


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
    inventoryData: any = [];
    colaircraft: any[] = [
        { field: "AircraftType", header: "Aircraft" },
        { field: "AircraftModel", header: "Model" },
        { field: "DashNumber", header: "Dash Numbers" },
    ];
    dashNumberUnknown: boolean = false;




    constructor(private route: ActivatedRoute, private itemser: ItemMasterService,
        private aircraftModelService: AircraftModelService,
        private Dashnumservice: DashNumberService,
        public customerService: CustomerService,
        private authService: AuthService,
    ) { }
    ngOnInit() {

        this.route.data.subscribe(data => {
            console.log(data);
        })
        this.getAllAircraftManfacturer();
        this.getAllAircraftModels();
        this.getAllDashNumbers();


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
        }

        );
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


    searchByFieldUrlCreateforAircraftInformation() {
        if (this.selectAircraftManfacturer.length > 0) {
            const aircraftTypeIds = this.selectAircraftManfacturer.reduce(
                (acc, value) => {
                    return `${acc},${value}`;
                },
                ''
            );
            this.aircraftManfacturerIdsUrl = aircraftTypeIds.substr(1);
        } else {
            this.aircraftManfacturerIdsUrl = '';
        }

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

    async getAircraftModelByManfacturerType() {
        // construct url from array
        await this.searchByFieldUrlCreateforAircraftInformation();
        // reset the dropdowns
        this.selectedAircraftModel = [];
        this.selectedDashNumbers = []
        // checks where multi select is empty or not and calls the service
        if (this.aircraftManfacturerIdsUrl !== '') {
            this.aircraftModelService
                .getAircraftModelListByManufactureId(this.aircraftManfacturerIdsUrl)
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
            this.dashNumberIdUrl !== ''
        ) {
            this.searchAircraftParams = `aircraftTypeID=${this.aircraftManfacturerIdsUrl}&aircraftModelID=${this.aircraftModelsIdUrl}&dashNumberId=${this.dashNumberIdUrl}`;
        }
        // search only by manfacturer and Model and  publicationId
        else if (
            this.aircraftManfacturerIdsUrl !== '' &&
            this.aircraftModelsIdUrl !== ''
        ) {
            this.searchAircraftParams = `aircraftTypeID=${this.aircraftManfacturerIdsUrl}&aircraftModelID=${this.aircraftModelsIdUrl}`;
        } else if (this.aircraftManfacturerIdsUrl !== '') {
            this.searchAircraftParams = `aircraftTypeID=${this.aircraftManfacturerIdsUrl}`;
        }
        // search only by model and publicationId
        else if (this.aircraftModelsIdUrl !== '') {
            this.searchAircraftParams = `aircraftModelID=${this.aircraftModelsIdUrl}`;
        }
        // search only by dashNumber and publicationId
        else if (this.dashNumberIdUrl !== '') {
            this.searchAircraftParams = `dashNumberId=${this.dashNumberIdUrl}`;
        }

        // const ItemMasterID = this.isEdit === true ? this.itemMasterId : this.collectionofItemMaster.itemMasterId;

        // this.itemser.searchAirMappedByMultiTypeIdModelIDDashID(ItemMasterID, this.searchAircraftParams).subscribe(res => {
        //     this.aircraftListDataValues = res.map(x => {
        //         return {
        //             aircraft: x.aircraftType,
        //             model: x.aircraftModel,
        //             dashNumber: x.dashNumber,
        //             memo: x.memo,
        //         }
        //     })
        // });
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

        console.log(this.add_SelectedModel);
        // Selected All 
        if (this.add_SelectedAircraftId !== undefined && this.add_SelectedModel.length > 0 && this.add_SelectedDashNumber !== undefined) {
            this.Dashnumservice.getAllDashModels(this.multipleModelUrl, this.add_SelectedAircraftId, this.add_SelectedDashNumber).subscribe(aircraftdata => {
                const responseValue = aircraftdata;
                this.inventoryData = responseValue.map(x => {
                    return {
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
                AircraftType: this.tempAircraftType,
                AircraftModel: 'Unknown',
                DashNumber: 'Unknown',
                AircraftModelId: '',
                DashNumberId: '',
                Memo: '',
                IsChecked: false
            }]
        }
        console.log(this.add_SelectedAircraftId !== undefined, this.add_SelectedModel.length > 0, this.dashNumberUnknown)
        if (this.add_SelectedAircraftId !== undefined && this.add_SelectedModel.length >= 0 && this.dashNumberUnknown) {
            this.inventoryData = this.add_SelectedModel.map(x => {
                return {
                    AircraftType: this.tempAircraftType,
                    AircraftModel: x.modelName,
                    DashNumber: 'Unknown',
                    AircraftModelId: x.aircraftModelId,
                    DashNumberId: '',
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
    saveAircraft() {
        const id = this.savedGeneralInformationData.CustomerId
        const data = this.inventoryData.map(x => {
            return {
                ...x,
                CustomerId: id,
                MasterCompanyId: 1,
                createdBy: this.userName,
                updatedBy: this.userName,
            }
        })
        this.customerService.postCustomerAircrafts(data).subscribe(res => {
            console.log(res)
        })
    }
}