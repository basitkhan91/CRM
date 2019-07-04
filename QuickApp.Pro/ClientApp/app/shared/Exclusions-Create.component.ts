import { Component, Input, OnChanges, OnInit, EventEmitter, Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { ActionService } from "../Workflow/ActionService";
import { IExclusionEstimatedOccurance } from "../Workflow/ExclusionEstimatedOccurance";
import { IExclusion } from "../Workflow/Exclusion";
import { ItemMasterService } from "../services/itemMaster.service";

@Component({
    selector: 'grd-exclusions',
    templateUrl: './Exclusions-Create.component.html',
    styleUrls: ['./Exclusions-Create.component.css']
})
export class ExclusionsCreateComponent implements OnInit, OnChanges {
    @Input() workFlow: IWorkFlow;
    @Input() UpdateMode: boolean;
    @Output() notify: EventEmitter<IWorkFlow> =
        new EventEmitter<IWorkFlow>();
    exclusionEstimatedOccurances: IExclusionEstimatedOccurance[];
    row: any;
    allPartnumbersInfo: any[] = [];
    itemclaColl: any[];
    partCollection: any[];
    errorMessage: string;

    constructor(private actionService: ActionService, private itemser: ItemMasterService) {
    }

    ngOnInit(): void {
        this.row = this.workFlow.exclusions[0];
        this.actionService.GetExclusionEstimatedOccurance().subscribe(
            type => {
                this.exclusionEstimatedOccurances = type;
                console.log(type);
            },
            error => this.errorMessage = <any>error
        );
        this.ptnumberlistdata();
    }

    ngOnChanges(): void {

    }

    addRow(): void {
        var newRow = Object.assign({}, this.row);
        newRow.workflowExclusionId = "0";
        newRow.taskId = this.workFlow.taskId;
        newRow.partDescription = "";
        newRow.estimtPercentOccurrance = "";
        newRow.extendedCost = "";
        newRow.partName = "";
        newRow.itemMasterId = "";
        newRow.quantity = "";
        newRow.unitCost = "";
        newRow.memo = "";
        newRow.itemMasterId = "";
        newRow.isDelete = false;
        this.workFlow.exclusions.push(newRow);
    }

    deleteRow(index): void {
        if (this.workFlow.exclusions[index].workflowExclusionId == "0" || this.workFlow.exclusions[index].workflowExclusionId == "") {
            this.workFlow.exclusions.splice(index, 1);
        }
        else {
            this.workFlow.exclusions[index].isDelete = true;
        }
    }

    onPartSelect(event, exclusion) {
        if (this.itemclaColl) {
            for (let i = 0; i < this.itemclaColl.length; i++) {
                if (event == this.itemclaColl[i][0].partName) {
                    exclusion.itemMasterId = this.itemclaColl[i][0].partId;
                    exclusion.partDescription = this.itemclaColl[i][0].description;
                    exclusion.partNumber = this.itemclaColl[i][0].partName;
                }
            };
        }
    }
    filterpartItems(event) {

        this.partCollection = [];
        this.itemclaColl = [];
        if (this.allPartnumbersInfo) {
            if (this.allPartnumbersInfo.length > 0) {

                for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
                    let partName = this.allPartnumbersInfo[i].partNumber;
                    if (partName) {
                        if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                            this.itemclaColl.push([{
                                "partId": this.allPartnumbersInfo[i].itemMasterId,
                                "partName": partName,
                                "description": this.allPartnumbersInfo[i].partDescription
                            }]),

                                this.partCollection.push(partName);
                        }
                    }
                }
            }
        }


    }
    private ptnumberlistdata() {


        this.itemser.getPrtnumberslistList().subscribe(
            results => this.onptnmbersSuccessful(results[0])
            //error => this.onDataLoadFailed(error)
        );
    }
    private onptnmbersSuccessful(allWorkFlows: any[]) {



        this.allPartnumbersInfo = allWorkFlows;



    }

}