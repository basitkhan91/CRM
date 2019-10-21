import { Component, Input, OnChanges, OnInit, EventEmitter, Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { ActionService } from "../Workflow/ActionService";
import { IPublicationType } from "../Workflow/PublicationType";
import { IPublicationAircraftManufacturer } from "../Workflow/PublicationAircraftManufacturer";
import { IPublicationModel } from "../Workflow/PublicationModel";
import { IPublicationStatus } from "../Workflow/PublicationStatus";
import { IPublication } from "../Workflow/Publication";
import { EmployeeService } from "../services/employee.service";
import { PublicationService } from "../services/publication.service";
import { Publication } from "../models/publication.model";
import { AlertService, MessageSeverity } from "../services/alert.service";
import { forEach } from "@angular/router/src/utils/collection";

@Component({
    selector: 'grd-publication',
    templateUrl: './Publication-Create.component.html',
    styleUrls: ['./Publication-Create.component.css']
})
export class PublicationCreateComponent implements OnInit, OnChanges {
    allEmployeeinfo: any[] = [];
    firstCollection: any[] = [];
    @Input() workFlow: IWorkFlow;
    @Input() UpdateMode: boolean;
    @Output() notify: EventEmitter<IWorkFlow> =
        new EventEmitter<IWorkFlow>();
    publicationTypes: IPublicationType[];
    publicationAircraftManufacturers: IPublicationAircraftManufacturer[];
    publicationModels: IPublicationModel[];
    publicationStatuses: IPublicationStatus[];
    row: any;
    errorMessage: string;
    locations: any[] = [];
    updateModeforModels: boolean = false;
    publications: any[];
    dropdownSettings: any;
    currentPage: number = 1;
    itemsPerPage: number = 10;
    constructor(private actionService: ActionService, private employeeService: EmployeeService, private publicationService: PublicationService, private alertService: AlertService) {

    }


    ngOnInit(): void {
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'dashNumberId',
            textField: 'dashNumber',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 1,
            allowSearchFilter: false
        };

        this.getAllPublicationTypes();

        this.row = this.workFlow.publication[0];
        if (this.row == undefined) {
            this.row = {};
        }
        this.row.taskId = this.workFlow.taskId;

        if (this.UpdateMode == true && this.workFlow.publication.length >= 0) {
            this.publications = [];
            for (let i = 0; i < this.workFlow.publication.length; i++) {
                this.loadPublicationById(this.workFlow.publication[i], false);
            }
        }
        else {
            this.row.publicationId = "0";
            this.row.publicationRecordId = "0";
        }

        this.actionService.GetPublicationType().subscribe(
            type => {
                this.publicationTypes = type;
            },
            error => this.errorMessage = <any>error()
        );

    }

    Browse(): void {
        var brws = document.getElementById("myFile");
    }

    ngOnChanges(): void {

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

    addRow(): void {
        var newRow = Object.assign({}, this.row);
        newRow.id = "0";
        newRow.taskId = this.workFlow.taskId;
        newRow.publicationId = "0";
        newRow.publicationRecordId = "0";
        newRow.publicationDescription = "";
        newRow.publicationType = "";
        newRow.sequence = "";
        newRow.source = "";
        newRow.aircraftManufacturer = "";
        newRow.model = "";
        newRow.location = "";
        newRow.revision = "";
        newRow.revisionDate = "";
        newRow.verifiedBy = "";
        newRow.status = "";
        newRow.verifiedDate = "";
        newRow.aircraft = [];
        newRow.aircraftModels = [];
        newRow.workflowPublicationDashNumbers = [];
        newRow.allDashNumbers = [];
        newRow.isDeleted = false;
        this.workFlow.publication.push(newRow);
    }

    deleteRow(index): void {
        if (this.workFlow.publication[index].id == "0" || this.workFlow.publication[index].id == "") {
            this.workFlow.publication.splice(index, 1);
        }
        else {
            this.workFlow.publication[index].isDeleted = true;
        }
    }

    publicationDropdown: any[];
    private getAllPublicationTypes(): void {
        if (this.publications == undefined || this.publications.length == 0) {
            this.publicationService.getAllPublicationsDropdown().subscribe(
                result => {
                    this.publicationDropdown = result[0];
                });
        }
    }

    private onPublicationChange(event, wfPublication) {
        if (wfPublication.publicationId == 0) {
            this.setPublicationData(null, wfPublication);
            return;
        }
        if (this.publications != undefined) {
            var selectedPublication = this.publications.filter(function (publication) {
                return publication.publicationRecordId == wfPublication.publicationId;
            });
            if (selectedPublication.length == 0) {
                this.loadPublicationById(wfPublication, true);
            }
            else {
                this.setPublicationData(selectedPublication[0], wfPublication);
            }
        }
        else {
            this.publications = [];
            this.loadPublicationById(wfPublication, true);
        }
    }

    private getUniqueAircraft(aircraftMapping: any[]): any[] {
        var aircraft = [];
        var distinctAircraftIds = [];

        for (var i = 0; i < aircraftMapping.length; i++) {
            if (aircraftMapping[i].aircraftTypeId != undefined && distinctAircraftIds.indexOf(aircraftMapping[i].aircraftTypeId) == -1) {
                aircraft.push(aircraftMapping[i]);
                distinctAircraftIds.push(aircraftMapping[i].aircraftTypeId);
            }
        }

        return aircraft;
    }

    private getUniqueAircraftModels(publication: any): any[] {
        var aircraftModels = [];
        var distinctAircraftModelIds = [];

        for (var i = 0; i < publication.itemMasterAircraftMapping.length; i++) {
            if (publication.itemMasterAircraftMapping[i].aircraftModelId != undefined &&
                publication.itemMasterAircraftMapping[i].aircraftTypeId == publication.aircraftManufacturer &&
                distinctAircraftModelIds.indexOf(publication.itemMasterAircraftMapping[i].aircraftModelId) == -1) {
                aircraftModels.push(publication.itemMasterAircraftMapping[i]);
                distinctAircraftModelIds.push(publication.itemMasterAircraftMapping[i].aircraftModelId);
            }
        }

        return aircraftModels;
    }

    private getUniqueAircraftDashNumbers(publication: any): any[] {
        var aircraftDashNumbers = [];
        var distinctAircraftaircraftDashNumbersIds = [];

        for (var i = 0; i < publication.itemMasterAircraftMapping.length; i++) {
            if (publication.itemMasterAircraftMapping[i].dashNumberId != undefined &&
                publication.itemMasterAircraftMapping[i].aircraftTypeId == publication.aircraftManufacturer &&
                publication.itemMasterAircraftMapping[i].aircraftModelId == publication.model &&

                distinctAircraftaircraftDashNumbersIds.indexOf(publication.itemMasterAircraftMapping[i].dashNumberId) == -1) {
                aircraftDashNumbers.push(publication.itemMasterAircraftMapping[i]);
                distinctAircraftaircraftDashNumbersIds.push(publication.itemMasterAircraftMapping[i].aircraftTypeId);
            }
        }

        return aircraftDashNumbers;
    }

    private loadPublicationById(wfPublication: any, isDropdownChange: boolean) {
        this.publicationService.getPublicationForWorkFlow(wfPublication.publicationId).subscribe(
            result => {
                if (result[0] != undefined && result[0] != null) {
                    this.publications.push(result[0]);
                    if (wfPublication.publicationId == result[0].publicationRecordId) {
                        wfPublication.itemMasterAircraftMapping = result[0].itemMasterAircraftMapping;

                        wfPublication.aircraft = this.getUniqueAircraft(result[0].itemMasterAircraftMapping);

                        if (!isDropdownChange) {
                            wfPublication.aircraftModels = this.getUniqueAircraftModels(wfPublication);
                            wfPublication.allDashNumbers = this.getUniqueAircraftDashNumbers(wfPublication);

                        }
                        else {
                            wfPublication.aircraftModels = [];
                            wfPublication.allDashNumbers = [];
                            wfPublication.workflowPublicationDashNumbers = [];
                        }

                        if (isDropdownChange) {
                            this.setPublicationData(result[0], wfPublication);
                        }
                    }
                }
            }
        );
    }

    private filterUniqueCombination(publication: any): void {
        var pubs = [];

        for (var imm of publication.itemMasterAircraftMapping) {
            var existingPublication = pubs.filter(x =>
                x.aircraftTypeId == imm.aircraftTypeId
                && x.aircraftModelId == imm.aircraftModelId
                && x.dashNumberId == imm.dashNumberId);

            if (existingPublication.length == 0) {
                pubs.push(imm);
            }

        }
        publication.itemMasterAircraftMapping = pubs;
    }

    private setPublicationData(selectedPublication: any, row: any) {
        if (selectedPublication != null) {
            row.publicationDescription = selectedPublication.description != null ? selectedPublication.description : '';
            row.revisionDate = selectedPublication.revisionDate != null ? new Date(selectedPublication.revisionDate).toLocaleDateString() : '';
            row.publicationType = selectedPublication.publicationTypeId != null ? selectedPublication.publicationTypeId : '';
            row.sequence = selectedPublication.sequence != null ? selectedPublication.sequence : '';
            row.aircraftManufacturer = '0';
            row.itemMasterAircraftMapping = selectedPublication.itemMasterAircraftMapping;
            row.aircraft = this.getUniqueAircraft(selectedPublication.itemMasterAircraftMapping);
            row.source = selectedPublication.asd != null ? selectedPublication.asd : '';
            row.model = '0';
            row.aircraftModels = [];
            row.allDashNumbers = [];
            row.location = selectedPublication.location != null ? selectedPublication.location : '';
            row.verifiedBy = selectedPublication.verifiedBy != null ? selectedPublication.verifiedBy : '';
            row.status = selectedPublication.isActive != null ? selectedPublication.isActive : '';
            row.verifiedDate = selectedPublication.verifiedDate != undefined ? new Date(selectedPublication.verifiedDate).toLocaleDateString() : '';
        }
        else {
            row.publicationDescription = '';
            row.revisionDate = '';
            row.publicationType = 0;
            row.sequence = '';
            row.aircraftManufacturer = '0';
            row.aircraft = [];
            row.source = '';
            row.model = '0';
            row.workflowPublicationDashNumbers = [];
            row.itemMasterAircraftMapping = [];
            row.aircraftModels = [];
            row.allDashNumbers = [];
            row.location = '';
            row.verifiedBy = '';
            row.status = 0;
            row.verifiedDate = '';
        }
    }

    public getAircraftModels(publication) {
        publication.aircraftModels = this.getUniqueAircraftModels(publication);// publication.aircraft.filter(x => x.aircraftTypeId == publication.aircraftManufacturer);
        publication.model = '0';
        publication.workflowPublicationDashNumbers = [];
        publication.allDashNumbers = [];
    }

    getDashNumbers(event, publication): void {
        var uniquePublication = this.workFlow.publication.filter(x => x.taskId == this.workFlow.taskId && x.publicationId == publication.publicationId
            && x.aircraftManufacturer == publication.aircraftManufacturer
            && x.model == publication.model);

        if (uniquePublication.length > 1) {
            event.target.value = '0';
            this.alertService.showMessage('Publication', 'Same combination is already in use, try other combination', MessageSeverity.error);
            return;
        }

        publication.allDashNumbers = this.getUniqueAircraftDashNumbers(publication);// publication.aircraft.filter(x => x.aircraftModelId == publication.model);
    }


    onDeSelect(publication, item: any) {

    }

    onItemSelect(publication, item: any) {


    }

    onSelectAll(publication, items: any) {

    }

}