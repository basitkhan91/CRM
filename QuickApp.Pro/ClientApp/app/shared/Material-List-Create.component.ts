import { Component, Input, OnChanges, OnInit, EventEmitter, Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { IMaterialCondition } from "../Workflow/MaterialCondition";
import { IMaterialMandatory } from "../Workflow/MaterialMandatory";
import { IMaterialUOM } from "../Workflow/MaterialUOM";
import { ActionService } from "../Workflow/ActionService";
import { IMaterialList } from "../Workflow/MaterialList";
import { VendorService } from "../services/vendor.service";
import { ConditionService } from "../services/condition.service";
import { ItemClassificationService } from "../services/item-classfication.service";
import { UnitOfMeasureService } from "../services/unitofmeasure.service";
import { ItemMasterService } from "../services/itemMaster.service";

@Component({
    selector: 'grd-material',
    templateUrl: './Material-List-Create.component.html',
    styleUrls: ['./Material-List-Create.component.css']
})
export class MaterialListCreateComponent implements OnInit {
    partCollection: any[] = [];
    itemclaColl: any[] = [];
    allPartnumbersInfo: any[] = [];
    allUomdata: any[] = [];
    itemClassInfo: any[] = [];
    allconditioninfo: any[] = [];
    partListData: any[] = [];
    @Input() workFlow: IWorkFlow;
    @Input() UpdateMode: boolean;
    @Output() notify: EventEmitter<IWorkFlow> =
        new EventEmitter<IWorkFlow>();
    materialCondition: any[] = [];
    materialMandatory: IMaterialMandatory[];
    materialUOM: any[] = [];
    row: any;
    sourceWorkFlow: any = {};
    errorMessage: string;
    allPartDetails: any[] = [];
    totalCost: number = 0;
    globalDeffered = false;
    constructor(private actionService: ActionService, private itemser: ItemMasterService, private vendorService: VendorService, private conditionService: ConditionService, public itemClassService: ItemClassificationService, public unitofmeasureService: UnitOfMeasureService) {

    }

    private calculateCost() {
        this.totalCost = 0;
        if (this.workFlow.materialList.length > 0) {
            for (let material of this.workFlow.materialList) {
                this.totalCost += (material.quantity * material.unitCost);
            }
        }
        else {
            this.totalCost = Number.parseFloat(this.totalCost.toFixed(2));
        }
    }

    ngOnInit(): void {
        this.row = this.workFlow.materialList[0];

        this.actionService.GetMaterialMandatory().subscribe(
            mandatory => {
                this.materialMandatory = mandatory;
            },
            error => this.errorMessage = <any>error
        );
        this.loadConditionData();
        this.loadItemClassData();
        this.loadPartData();
        this.loadUOMData();
        this.ptnumberlistdata();
        this.calculateCost();
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
                                "description": this.allPartnumbersInfo[i].partDescription,
                                "itemClassificationId": this.allPartnumbersInfo[i].itemClassificationId,
                            }]);

                            this.partCollection.push(partName);
                        }
                    }
                }
            }
        }
    }

    onPartSelect(event, material) {
        if (this.itemclaColl) {
            for (let i = 0; i < this.itemclaColl.length; i++) {
                if (event == this.itemclaColl[i][0].partName) {
                    material.itemMasterId = this.itemclaColl[i][0].partId;
                    material.partDescription = this.itemclaColl[i][0].description;
                    material.partNumber = this.itemclaColl[i][0].partName;
                    material.itemClassificationId = this.itemclaColl[i][0].itemClassificationId;
                }
            };
        }
    }
    private ptnumberlistdata() {
        this.itemser.getPrtnumberslistList().subscribe(
            results => this.onptnmbersSuccessful(results[0]),
        );
    }

    private onptnmbersSuccessful(allWorkFlows: any[]) {
        this.allPartnumbersInfo = allWorkFlows;
    }

    private loadPartData() {
        this.vendorService.getPartDetails().subscribe(
            data => {
                this.allPartDetails = data[0];

                if (this.vendorService.isEditMode == false) {

                    for (let i = 0; i < this.partListData.length; i++) {
                        this.partListData[i].partListObj = this.allPartDetails;
                    }
                }
            })
    }

    private loadConditionData() {
        this.conditionService.getConditionList().subscribe(data => {
            this.materialCondition = data[0];
        })
    }

    private loadItemClassData() {
        this.itemClassService.getWorkFlows().subscribe(data => { this.itemClassInfo = data[0] });
    }

    private loadUOMData() {
        this.unitofmeasureService.getUnitOfMeasureList().subscribe(uomdata => {
            this.materialUOM = uomdata[0];
        })
    }

    addRow(): void {
        var newRow = Object.assign({}, this.row);

        newRow.workflowMaterialListId = "0";
        newRow.taskId = this.workFlow.taskId;
        newRow.conditionCodeId = "";
        newRow.extendedCost = "";
        newRow.extraCost = "";
        newRow.itemClassificationId = "";
        newRow.itemMasterId = "";
        newRow.mandatoryOrSupplemental = "";
        newRow.partDescription = "";
        newRow.partNumber = "";
        newRow.isDeferred = false;
        newRow.memo = "";
        newRow.price = "";
        newRow.provisionId = "";
        newRow.quantity = "";
        newRow.unitCost = "";
        newRow.unitOfMeasureId = "";
        newRow.isDelete = false;

        this.workFlow.materialList.push(newRow);
    }

    deleteRow(index): void {
        if (this.workFlow.materialList[index].workflowMaterialListId == "0" || this.workFlow.materialList[index].workflowMaterialListId == "") {
            this.workFlow.materialList.splice(index, 1);
        }
        else {
            this.workFlow.materialList[index].isDelete = true;
        }
    }

    calculateExtendedCost(material): void {
        if (material.quantity != "" && material.unitCost) {
            material.extendedCost = material.quantity * material.unitCost;
            this.calculateCost()
        }
    }

}