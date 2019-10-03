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
    currentPage: number = 1;
    itemsPerPage: number = 10;
   

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
        // this.calculateTotalExpertiseCost();
        // for edit workflow to add the sum of amount 


        // summation of all values in edit mode 
        if (this.UpdateMode) {
            this.reCalculate();
        }

    }


    ngOnChanges(): void {

    }
    reCalculate() {
        this.calculateEstimatedHoursSummation();
        this.calculateLabourDirectCost();
        this.calculateOHCostSummation();
        this.calculateLabourOHCostSummation();
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
        if (this.workFlow.expertise[index].workflowExpertiseListId != undefined  || this.workFlow.expertise[index].workflowExpertiseListId == "0" || this.workFlow.expertise[index].workflowExpertiseListId == "") {
            this.workFlow.expertise.splice(index, 1);
        }
        else {
            this.workFlow.expertise[index].isDelete = true;
        }
        this.reCalculate();
    }

    calculateLabourCost(expertise): void {
        var value = Number.parseFloat(expertise.estimatedHours) * Number.parseFloat(expertise.laborDirectRate);
        if (value > 0) {
            expertise.directLaborRate = parseFloat((Number.parseFloat(expertise.estimatedHours) * Number.parseFloat(expertise.laborDirectRate)).toFixed(2));
            // this.calculateTotalExpertiseCost();
        }
        else {
            expertise.directLaborRate = "";
        }
        this.calculateEstimatedHoursSummation();
        this.calculateLabourDirectCost();
    }

    // sum of the estimated Hrs
    calculateEstimatedHoursSummation() {
        this.workFlow.sumofestimatedhrs = this.workFlow.expertise.reduce((acc, x) => {
            return acc + parseFloat(x.estimatedHours === undefined || x.estimatedHours === '' ? 0 : x.estimatedHours)
        }, 0);
    }

    // sum of labour direct cost 
    calculateLabourDirectCost() {
        this.workFlow.sumofLabourDirectCost = this.workFlow.expertise.reduce((acc, x) => {
            return acc + parseFloat(x.directLaborRate === undefined || x.directLaborRate === '' ? 0 : x.directLaborRate)
        }, 0);
        
    }

    calculateOHCost(expertise): void {
        const percentageCal = parseFloat((((expertise.directLaborRate) * (expertise.overheadBurden)) / 100).toFixed(2));
        if (percentageCal > 0) {
            expertise.overheadCost = percentageCal;
        }
        else {
            expertise.overheadCost = '';
        }

        this.calculateLabourOHCost(expertise);
        this.calculateOHCostSummation();
    }

    calculateOHCostSummation() {
        this.workFlow.sumOfOHCost = this.workFlow.expertise.reduce((acc, x) => {
            return acc + parseFloat(x.overheadCost === undefined || x.overheadCost === '' ? 0 : x.overheadCost)
        }, 0);

        this.workFlow.sumOfOHCost = parseFloat((this.workFlow.sumOfOHCost).toFixed(2));
    }

    // used to calculate the LabourOH cost 
    calculateLabourOHCost(expertise): void {
        const sumOfLabourOHCost = parseFloat((expertise.directLaborRate + Number(expertise.overheadCost)));
        if (sumOfLabourOHCost > 0) {
            expertise.laborOverheadCost = sumOfLabourOHCost.toFixed(2);
        }
        else {
            expertise.laborOverheadCost = '';
        }

        this.calculateLabourOHCostSummation();
    }
    calculateLabourOHCostSummation() {
        this.workFlow.totalExpertiseCost = this.workFlow.expertise.reduce((acc, x) => {
            return acc + parseFloat(x.laborOverheadCost === undefined || x.laborOverheadCost === '' ? 0 : x.laborOverheadCost)
        }, 0);

        this.workFlow.totalExpertiseCost = parseFloat((this.workFlow.totalExpertiseCost).toFixed(2));
    }

}
