import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { ActionService } from "../Workflow/ActionService";
import { IDirections } from "../Workflow/Directions";

@Component({
    selector: 'grd-directions',
    templateUrl: './Directions-Create.component.html',
    styleUrls: ['./Directions-Create.component.css']
})
export class DirectionsCreateComponent implements OnInit, OnChanges {
    @Input() workFlow: IWorkFlow;
    @Input() UpdateMode: boolean;
    @Output() notify: EventEmitter<IWorkFlow> =
        new EventEmitter<IWorkFlow>();
    errorMessage: string;
    row: any;
    currentPage : number = 1;
    itemsPerPage : number = 10;

    ngOnInit(): void {
        //debugger;
        this.row = this.workFlow.directions[0];
    }

    ngOnChanges(): void {

    }

    addRow(): void {

        var newRow = Object.assign({}, this.row);
        newRow.workflowDirectionId = "0";
        newRow.taskId = this.workFlow.taskId;
        newRow.workflowDirectionId = "0";
        newRow.action = "";
        newRow.description = "";
        newRow.sequence = "";
        newRow.memo = "";
        newRow.isDelete = false;
        this.workFlow.directions.push(newRow);
    }

    deleteRow(index): void {
        if (this.workFlow.directions[index].workflowDirectionId == "0" || this.workFlow.directions[index].workflowDirectionId == "") {
            this.workFlow.directions.splice(index, 1);
        }
        else {
            this.workFlow.directions[index].isDelete = true;
        }
    }

}