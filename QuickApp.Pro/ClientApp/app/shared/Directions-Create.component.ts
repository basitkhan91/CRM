import { Component, Input, OnInit, OnChanges, EventEmitter , Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { ActionService } from "../Workflow/ActionService";
import { IDirections } from "../Workflow/Directions";

@Component({
    selector:'grd-directions',
    templateUrl:'./Directions-Create.component.html',
    styleUrls :['./Directions-Create.component.css']
    })
export class DirectionsCreateComponent implements OnInit,OnChanges{
    @Input() workFlow : IWorkFlow;
    @Input() UpdateMode : boolean;
    @Output() notify : EventEmitter<IWorkFlow> = 
    new EventEmitter<IWorkFlow>();
    errorMessage:string;
    row:any;

    
	ngOnInit(): void{
		//debugger;
        this.row=this.workFlow.directions[0];
    }

    ngOnChanges():void{
        
    }

	addRow(): void{
		
        var newRow = Object.assign({},this.row);
        //if(this.UpdateMode)
        //{
			newRow.workflowDirectionId = "0";
            newRow.AllowEdit=true;
			newRow.taskId = this.workFlow.taskId;
			newRow.workflowDirectionId = "0";
			newRow.action = "";
			newRow.description = "";
			newRow.sequence = "";
			newRow.memo = "";
			
        //}
        this.workFlow.directions.push(newRow);
    }

    deleteRow(index):void{
        this.workFlow.directions[index].isDelete=true;
    }
   
    allowEdit(direction:any):boolean{
        return this.UpdateMode && !direction.AllowEdit;
    }
    
    editRow(direction:any):void{
        direction.AllowEdit=true;
    }

}