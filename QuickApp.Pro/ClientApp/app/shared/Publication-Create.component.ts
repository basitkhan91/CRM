import { Component, Input, OnChanges, OnInit, EventEmitter , Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { ActionService } from "../Workflow/ActionService";
import { IPublicationType } from "../Workflow/PublicationType";
import { IPublicationAircraftManufacturer } from "../Workflow/PublicationAircraftManufacturer";
import { IPublicationModel } from "../Workflow/PublicationModel";
import { IPublicationStatus } from "../Workflow/PublicationStatus";
import { IPublication } from "../Workflow/Publication";
import { EmployeeService } from "../services/employee.service";

@Component({
    selector:'grd-publication',
    templateUrl:'./Publication-Create.component.html',
    styleUrls :['./Publication-Create.component.css']
    })
export class PublicationCreateComponent implements OnInit,OnChanges{
	allEmployeeinfo: any[]=[];
	firstCollection: any[]=[];
    @Input() workFlow : IWorkFlow;
    @Input() UpdateMode : boolean;
    @Output() notify : EventEmitter<IWorkFlow> = 
    new EventEmitter<IWorkFlow>();
    publicationTypes:IPublicationType[];
    publicationAircraftManufacturers:IPublicationAircraftManufacturer[];
    publicationModels:IPublicationModel[];
    publicationStatuses:IPublicationStatus[];
    row:any;
	errorMessage: string;
	locations: any[] = [];
	updateModeforModels: boolean = false;
    
	constructor(private actionService: ActionService, private employeeService:EmployeeService) {
    }


	ngOnInit(): void {
		//debugger;
		this.row = this.workFlow.publication[0];
		if (this.UpdateMode == true && this.workFlow.publication.length >= 0) {
			for (let i = 0; i < this.workFlow.publication.length; i++) {
				if (this.workFlow.publication[i].aircraftManufacturer != null) {
					this.actionService.GetPublicationModel(this.workFlow.publication[i].aircraftManufacturer).subscribe(
						model => {
							//debugger;
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
            error => this.errorMessage = <any>error
        );

        this.actionService.GetPublicationAircraftManufacturer().subscribe(
			aircraftManufacturer => {
				//debugger;
                this.publicationAircraftManufacturers = aircraftManufacturer;
            },
            error => this.errorMessage = <any>error
        );

		this.actionService.getLocations().subscribe(
			location => {
				//debugger;
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
				//debugger;
				this.allEmployeeinfo = data[0]
			});

    }

    Browse():void{
        var brws = document.getElementById("myFile");
        //brws.disabled = true;
    }

    ngOnChanges():void{
        
	}
	public getAircraftModels(publication,aircraftTypeId: any) {
		publication["publicationModels"] = [];
		this.actionService.GetPublicationModel(aircraftTypeId).subscribe(
			model => {
				//debugger;
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

    addRow():void{
        var newRow = Object.assign({},this.row);
        if(this.UpdateMode)
        {
            newRow.id = "";
            newRow.AllowEdit=true;
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
        }

        this.workFlow.publication.push(newRow);
    }

    deleteRow(index):void{

		this.workFlow.publication[index].IsDeleted = true;
    }

    allowEdit(publication:IPublication):boolean{
        return this.UpdateMode && !publication.AllowEdit;
    }
    
    editRow(publication:IPublication):void{
        publication.AllowEdit=true;
    }

}