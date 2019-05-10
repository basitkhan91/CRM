import { Component, Input, OnChanges, OnInit, EventEmitter , Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { IExpertiseType } from "../Workflow/ExpertiseType";
import { ActionService } from "../Workflow/ActionService";
import { IExpertise } from "../Workflow/Expertise";

@Component({
    selector:'grd-expertise',
    templateUrl:'./Expertise-Create.component.html',
    styleUrls :['./Expertise-Create.component.css']
    })
export class ExpertiseCreateComponent implements OnInit,OnChanges{
    @Input() workFlow : IWorkFlow;
    @Input() UpdateMode : boolean;
    @Output() notify : EventEmitter<IWorkFlow> = 
    new EventEmitter<IWorkFlow>();
    expertiseTypes:any[]=[];
    row:any;

    errorMessage:string;
    
    constructor(private actionService: ActionService) {
    }

	ngOnInit(): void {
		//debugger;
		this.row = this.workFlow.expertise[0];
        
        this.actionService.GetExpertiseType().subscribe(
            expertiseTypes => {
                this.expertiseTypes = expertiseTypes;
            },
            error => this.errorMessage = <any>error
        );
    }

    ngOnChanges():void{
        
    }

    addRow():void{
        var newRow = Object.assign({},this.row);
        //if(this.UpdateMode)
        //{
			newRow.workflowExpertiseListId = "0";
            newRow.AllowEdit=true;
			newRow.taskId = this.workFlow.taskId;
			newRow.estimatedHours = "";
			newRow.expertiseTypeId = "";
			newRow.directLaborRate = "";
			newRow.laborDirectRate = "";
			newRow.laborOverheadCost = "";
			newRow.overheadBurden = "";
			newRow.overheadCost = "";
			newRow.standardRate = "";
			newRow.memo = "";
		//}
		this.workFlow.expertise.push(newRow);
    }

	deleteRow(index): void{
		this.workFlow.expertise[index].isDelete = true;
    }

    allowEdit(expertise:IExpertise):boolean{
        return this.UpdateMode && !expertise.AllowEdit;
    }
    
    editRow(expertise:IExpertise):void{
        expertise.AllowEdit = true;
    }


}
