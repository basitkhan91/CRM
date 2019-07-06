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
    publications: Publication[];
    dropdownSettings: any;
    constructor(private actionService: ActionService, private employeeService: EmployeeService, private publicationService: PublicationService, private alertService : AlertService) {

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
        if (this.UpdateMode == true && this.workFlow.publication.length >= 0) {
            for (let i = 0; i < this.workFlow.publication.length; i++) {
                if (this.workFlow.publication[i].aircraftManufacturer != null) {
                    this.actionService.GetPublicationModel(this.workFlow.publication[i].aircraftManufacturer).subscribe(
                        model => {
                            this.workFlow.publication[i]["publicationModels"] = model;
                        },
                        error => this.errorMessage = <any>error
                    );

                }
            }
        }
        this.actionService.GetPublicationType().subscribe(
            type => {
                this.publicationTypes = type;
            },
            error => this.errorMessage = <any>error()
        );

        this.actionService.GetPublicationAircraftManufacturer().subscribe(
            aircraftManufacturer => {
                this.publicationAircraftManufacturers = aircraftManufacturer;
            },
            error => this.errorMessage = <any>error
        );

        this.actionService.getLocations().subscribe(
            location => {
                this.locations = location;
            },
            error => this.errorMessage = <any>error
        );

        this.actionService.GetPublicationStatus().subscribe(
            status => {
                this.publicationStatuses = status;
            },
            error => this.errorMessage = <any>error
        );
        this.employeeService.getEmployeeList().subscribe(

            data => {
                this.allEmployeeinfo = data[0]
            });

    }

    Browse(): void {
        var brws = document.getElementById("myFile");
        //brws.disabled = true;
    }

    ngOnChanges(): void {

    }

    public getAircraftModels(publication, aircraftTypeId: any) {
        publication["publicationModels"] = [];
        this.actionService.GetPublicationModel(aircraftTypeId).subscribe(
            model => {
                publication["publicationModels"] = model;
            },
            error => this.errorMessage = <any>error
        );

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
            newRow.publicationId = "";
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

    getDashNumbers(publication): void {
        publication.allDashNumbers = [];
        this.actionService.GetDashNumbersByModelId(publication.model).subscribe(result => {
            publication.allDashNumbers = result;
        });
   }

    private getAllPublicationTypes(): void {
        this.publicationService.getAllPublications().subscribe(
            result => {
                this.publications = result[0];
            });
    }

    private onPublicationChange(row) {
        // check for unique selection
        var anyPublication = this.workFlow.publication.filter(publication =>
            publication.taskId == this.workFlow.taskId && publication.publicationId == row.publicationId);

        if (anyPublication.length > 1) {
            row.publicationId = "";
            row.publicationDescription = "";
            this.alertService.showMessage("Workflow", "Publication is already in use", MessageSeverity.error);
            
        }
        else {
            var selectedPublication = this.publications.filter(function (publication) {
                return publication.publicationRecordId == row.publicationId;
            });

            if (selectedPublication != null && selectedPublication.length > 0) {
                row.publicationDescription = selectedPublication[0].description;
            }
            else {
                row.publicationDescription = "";
            }
        }     
    }

    onDeSelect(publication,item: any) {
        //publication.workflowPublicationDashNumbers = [];
    }

    onItemSelect(publication, item: any) {
        //var workflowPublicationDashNumber = {
        //    workflowId: this.workFlow.workflowId,
        //    aircraftDashNumberId: item.dashNumber,
        //    taskId: this.workFlow.taskId,
        //    publicationsId: publication.id
        //};

        //var item = publication.workflowPublicationDashNumbers.push(workflowPublicationDashNumber);
        
    }

    onSelectAll(publication,items: any) {

    }

}