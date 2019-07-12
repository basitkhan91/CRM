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
        this.calculateTotalExpertiseCost();
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
            this.calculateTotalExpertiseCost();
        }
        else {
            expertise.directLaborRate = "";
        }
    }

    calculateLabourOHCost(expertise): void {
        var value = Number.parseFloat(expertise.overheadBurden) * Number.parseFloat(expertise.overheadCost);
        if (value > 0) {
            expertise.laborOverheadCost = Number.parseFloat(expertise.overheadBurden) * Number.parseFloat(expertise.overheadCost);
            this.calculateTotalExpertiseCost();
        }
        else {
            expertise.laborOverheadCost = "";
        }
    }

    calculateTotalExpertiseCost() {
        this.workFlow.totalExpertiseCost = 0;
        for (let expertise of this.workFlow.expertise) {
            var value = Number.parseFloat(expertise.directLaborRate) + Number.parseFloat(expertise.laborOverheadCost);
            if (value > 0) {
                this.workFlow.totalExpertiseCost += value;
            }
            else {
                this.workFlow.totalExpertiseCost = 0;
            }
            
        }
    }
    
}
