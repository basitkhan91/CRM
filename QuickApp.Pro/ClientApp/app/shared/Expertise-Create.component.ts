import { Component, Input, OnChanges, OnInit, EventEmitter, Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { IExpertiseType } from "../Workflow/ExpertiseType";
import { ActionService } from "../Workflow/ActionService";
import { IExpertise } from "../Workflow/Expertise";

@Component({
    selector: 'grd-expertise',
    templateUrl: './Expertise-Create.component.html',
    styleUrls: ['./Expertise-Create.component.css']
})
export class ExpertiseCreateComponent implements OnInit, OnChanges {
    @Input() workFlow: IWorkFlow;
    @Input() UpdateMode: boolean;
    @Output() notify: EventEmitter<IWorkFlow> =
        new EventEmitter<IWorkFlow>();
    expertiseTypes: any[] = [];
    row: any;
    ccRegex: RegExp = /[0-9]+(\.[0-9]{1,2})$/; 
    errorMessage: string;

    constructor(private actionService: ActionService) {
    }

    ngOnInit(): void {
        this.row = this.workFlow.expertise[0];

        this.actionService.GetExpertiseType().subscribe(
            expertiseTypes => {
                this.expertiseTypes = expertiseTypes;
            },
            error => this.errorMessage = <any>error
        );
    }

    ngOnChanges(): void {

    }

    addRow(): void {
        var newRow = Object.assign({}, this.row);
        newRow.workflowExpertiseListId = "0";
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
        newRow.isDelete = false;
        this.workFlow.expertise.push(newRow);
    }

    deleteRow(index): void {
        if (this.workFlow.expertise[index].workflowExpertiseListId == "0" || this.workFlow.expertise[index].workflowExpertiseListId == "") {
            this.workFlow.expertise.splice(index, 1);
        }
        else {
            this.workFlow.expertise[index].isDelete = true;
        }
    }

    calculateLabourCost(expertise): void {
        var value = Number.parseFloat(expertise.estimatedHours) * Number.parseFloat(expertise.laborDirectRate);
        if (value > 0) {
            expertise.directLaborRate = Number.parseFloat(expertise.estimatedHours) * Number.parseFloat(expertise.laborDirectRate);
        }
        else {
            expertise.directLaborRate = "";
        }
    }

    calculateLabourOHCost(expertise): void {
        var value = Number.parseFloat(expertise.overheadBurden) * Number.parseFloat(expertise.overheadCost);
        if (value > 0) {
            expertise.laborOverheadCost = Number.parseFloat(expertise.overheadBurden) * Number.parseFloat(expertise.overheadCost);
        }
        else {
            expertise.laborOverheadCost = "";
        }
    }

}
