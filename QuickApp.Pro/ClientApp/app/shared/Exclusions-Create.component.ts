import { Component, Input, OnChanges, OnInit, EventEmitter, Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { ActionService } from "../Workflow/ActionService";
import { IExclusionEstimatedOccurance } from "../Workflow/ExclusionEstimatedOccurance";
import { IExclusion } from "../Workflow/Exclusion";
import { ItemMasterService } from "../services/itemMaster.service";
import { AlertService, MessageSeverity } from "../services/alert.service";

@Component({
    selector: 'grd-exclusions',
    templateUrl: './Exclusions-Create.component.html',
    styleUrls: ['./Exclusions-Create.component.css']
})
export class ExclusionsCreateComponent implements OnInit, OnChanges {
    @Input() isWorkOrder = false;
    @Input() workFlow: IWorkFlow;
    @Input() UpdateMode: boolean;
    @Input() isEdit = false;
    @Input() isQuote = false;
    @Input() markupList;
    @Input() editData;
    @Output() saveExclusionsListForWO = new EventEmitter();
    @Output() updateExclusionsListForWO = new EventEmitter();

    @Output() notify: EventEmitter<IWorkFlow> =
        new EventEmitter<IWorkFlow>();

    exclusionEstimatedOccurances: any = [];
    row: any;
    allPartnumbersInfo: any[] = [];
    itemclaColl: any[];
    partCollection: any[];
    errorMessage: string;
    currentPage: number = 1;
    itemsPerPage: number = 10;


    constructor(private actionService: ActionService, private itemser: ItemMasterService, private alertService: AlertService) {
        for (var i = 0; i <= 100; i++) {
            this.exclusionEstimatedOccurances.push({ id: i, name: String(i) });
        }
    }

    ngOnInit(): void {

        if (this.isEdit) {
            this.workFlow.exclusions = [];
            const data = {
                ...this.editData,
                partDescription: this.editData.epnDescription,
                partNumber: this.editData.epn

            }
            this.workFlow.exclusions.push(data);
            this.reCalculate();
        } else {
            if (!this.UpdateMode) {
                this.workFlow.exclusions = [];
                this.row = this.workFlow.exclusions[0];
                this.addRow();
            }
        }
        if (this.isWorkOrder) {
            this.row = this.workFlow.exclusions[0];
            
            // this.row = this.workFlow.exclusions[0];
            // this.addRow();
        } else {
            this.row = this.workFlow.exclusions[0];
            if (this.row == undefined) {
                this.row = {};
            }
            this.row.taskId = this.workFlow.taskId;
        }

        this.ptnumberlistdata();
        if (this.UpdateMode) {
            this.reCalculate();
        }
    }


    ngOnChanges(): void {
        console.log(this.isEdit);
        console.log(this.isQuote);
    }
    reCalculate() {
        this.calculateQtySummation();
        this.calculateExtendedCostSummation();
    }

    addRow(): void {
        var newRow = Object.assign({}, this.row);
        newRow.workflowExclusionId = "0";
        newRow.taskId = this.workFlow.taskId;
        newRow.partDescription = "";
        newRow.estimtPercentOccurrance = "";
        newRow.extendedCost = "";
        newRow.partName = "";
        newRow.partNumber = " ";
        newRow.itemMasterId = "";
        newRow.quantity = "";
        newRow.unitCost = "";
        newRow.memo = "";
        newRow.itemMasterId = "";
        newRow.isDelete = false;
        this.workFlow.exclusions.push(newRow);
    }

    deleteRow(index): void {
        if (this.workFlow.exclusions[index].workflowExclusionId == undefined || this.workFlow.exclusions[index].workflowExclusionId == "0" || this.workFlow.exclusions[index].workflowExclusionId == "") {
            this.workFlow.exclusions.splice(index, 1);
        }
        else {
            this.workFlow.exclusions[index].isDelete = true;
        }
        this.reCalculate();
    }

    onPartSelect(event, exclusion) {
        var isEpnExist = this.workFlow.exclusions.filter(x => x.partNumber == exclusion.partNumber && x.taskId == this.workFlow.taskId);

        if (isEpnExist.length > 1) {
            exclusion.itemMasterId = "";
            exclusion.partDescription = "";
            exclusion.partNumber = "";
            event = "";
            this.alertService.showMessage("Workflow", "EPN is already in use in Exclusion List.", MessageSeverity.error);
            return;
        }
        else {
            if (this.itemclaColl) {
                for (let i = 0; i < this.itemclaColl.length; i++) {
                    if (event == this.itemclaColl[i][0].partName) {
                        exclusion.itemMasterId = this.itemclaColl[i][0].partId;
                        exclusion.partDescription = this.itemclaColl[i][0].description;
                        exclusion.partNumber = this.itemclaColl[i][0].partName;
                    }
                }
            }
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
                            }]);

                            this.partCollection.push(partName);
                        }
                    }
                }
            }
        }
    }

    validateQuantity(event, exclusion): void {

        event.target.value = event.target.value == '' ? '' : parseInt(exclusion.quantity);
        if (event.target.value != '') {
            exclusion.quantity = parseInt(exclusion.quantity);
        }
    }

    calculateExtendedCost(exclusion): void {
        var value = parseFloat((Number.parseInt(exclusion.quantity) * Number.parseFloat(exclusion.unitCost)).toFixed(2));
        if (value > 0) {
            exclusion.extendedCost = value;
            this.calculateExtendedCostSummation()
        }
        else {
            exclusion.extendedCost = "";
        }

    }

    // sum of the qty
    calculateQtySummation() {
        this.workFlow.sumofQty = this.workFlow.exclusions.filter(x => x.isDelete != true).reduce((acc, x) => {
            return acc + parseFloat(x.quantity == undefined || x.quantity === '' ? 0 : x.quantity)
        }, 0);

    }
    // sum of extended cost
    calculateExtendedCostSummation() {
        this.workFlow.sumofExtendedCost = this.workFlow.exclusions.filter(x => x.isDelete != true).reduce((acc, x) => {
            return acc + parseFloat(x.extendedCost == undefined || x.extendedCost === '' ? 0 : x.extendedCost)
        }, 0);
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

    saveExclusionsWorkOrder() {

        this.saveExclusionsListForWO.emit(this.workFlow)
    }

    updateExclusionsWorkOrder() {
        this.updateExclusionsListForWO.emit(this.workFlow);
    }

    markupChanged(matData) {
        try {
            this.markupList.forEach((markup) => {
            if (markup.value == matData.markupPercentageId) {
                matData.costPlusAmount = (matData.extendedPrice) + (((matData.extendedPrice) / 100) * Number(markup.label))
            }
            })
        }
        catch (e) {
            console.log(e);
        }
    }

}