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
import { AlertService, MessageSeverity } from "../services/alert.service";

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
    @Output() workFlowChange = new EventEmitter();
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
    isDeferredBoolean: any = false;
    currentPage: number = 1;
    itemsPerPage: number = 10;
    variableIdOfNew: any[];
    defaultUOMId: number;
    defaultConditionId: number;
    constructor(private actionService: ActionService, private itemser: ItemMasterService, private vendorService: VendorService, private conditionService: ConditionService, public itemClassService: ItemClassificationService, public unitofmeasureService: UnitOfMeasureService, private alertService: AlertService) {

    }

    defaultMaterialMandatory: string;

    ngOnInit(): void {

        this.row = this.workFlow.materialList[0];

        this.actionService.GetMaterialMandatory().subscribe(
            mandatory => {
                this.materialMandatory = mandatory;
                this.defaultMaterialMandatory = 'Mandatory';
                if (this.workFlow.workflowId == undefined || this.workFlow.workflowId == '0') {
                    this.workFlow.materialList[0].mandatoryOrSupplemental = this.defaultMaterialMandatory;
                }
            },
            error => this.errorMessage = <any>error
        );

        this.loadConditionData();
        this.loadItemClassData();
        this.loadPartData();
        this.loadUOMData();
        this.ptnumberlistdata();

        if (this.UpdateMode) {
            this.reCalculate();

        }
    }

    reCalculate() {
        this.calculateExtendedCostSummation();
        this.calculateQtySummation();
        this.calculatePriceSummation();
    }

    filterpartItems(event) {

        this.partCollection = [];
        this.itemclaColl = [];
        if (this.allPartnumbersInfo) {
            if (this.allPartnumbersInfo.length > 0) {
                //this.partCollection.push(" ");
                for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
                    let partName = this.allPartnumbersInfo[i].partNumber;
                    if (partName) {
                        if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                            if (this.workFlow.partNumber != this.allPartnumbersInfo[i].itemMasterId) {
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
    }

    onPartSelect(event, material) {
        if (this.itemclaColl) {
            var duplicate = this.workFlow.materialList.filter(x => x.partNumber == event && x.taskId == this.workFlow.taskId);

            if (duplicate.length > 1) {
                material.itemMasterId = '';
                material.partDescription = '';
                material.partNumber = '';
                material.itemClassificationId = '';
                event = '';      
                this.alertService.showMessage("Workflow", "Part Number is already in use in Material List.", MessageSeverity.error);
                return;
            }

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
            this.defaultConditionId = this.materialCondition.filter(x => x.description.trim() == "NEW")[0].conditionId;
            if (this.workFlow.workflowId == undefined || this.workFlow.workflowId == '0') {
                this.workFlow.materialList[0].conditionCodeId = this.defaultConditionId;
            }
        })
    }

    private loadItemClassData() {
        this.itemClassService.getWorkFlows().subscribe(data => { this.itemClassInfo = data[0] });
    }

    private loadUOMData() {
        this.unitofmeasureService.getUnitOfMeasureList().subscribe(uomdata => {
            this.materialUOM = uomdata[0];
            this.defaultUOMId = this.materialUOM.filter(x => x.shortName.trim() == "Ea")[0].unitOfMeasureId;
            if (this.workFlow.workflowId == undefined || this.workFlow.workflowId == '0') {
                this.workFlow.materialList[0].unitOfMeasureId = this.defaultUOMId;
            }
        });
    }

    addRow(): void {
        var newRow = Object.assign({}, this.row);

        newRow.workflowMaterialListId = "0";
        newRow.taskId = this.workFlow.taskId;
        newRow.conditionCodeId = this.defaultConditionId;
        newRow.extendedCost = "";
        newRow.extraCost = "";
        newRow.itemClassificationId = "";
        newRow.itemMasterId = "";
        newRow.mandatoryOrSupplemental = 'Mandatory';
        newRow.partDescription = "";
        newRow.partNumber = " ";
        newRow.isDeferred = this.isDeferredBoolean;
        newRow.memo = "";
        newRow.price = "";
        newRow.provisionId = "";
        newRow.quantity = "";
        newRow.unitCost = "";
        newRow.unitOfMeasureId = this.defaultUOMId;
        newRow.isDelete = false;

        this.workFlow.materialList.push(newRow);
    }

    deleteRow(index): void {
        if (this.workFlow.materialList[index].workflowMaterialListId == undefined || this.workFlow.materialList[index].workflowMaterialListId == "0" || this.workFlow.materialList[index].workflowMaterialListId == "") {
            this.workFlow.materialList.splice(index, 1);
        }
        else {
            this.workFlow.materialList[index].isDelete = true;
        }
        this.reCalculate();
    }

    // Unused Function in both ts and html
    // calculateTotalCost(): void {
    //     this.workFlow.totalMaterialCost = 0;
    //     for (let material of this.workFlow.materialList) {
    //         var value = material.extendedCost;
    //         if (value > 0) {
    //             this.workFlow.totalMaterialCost += value;
    //         }
    //         else {
    //             this.workFlow.totalMaterialCost = 0;
    //         }
    //     }

    // }

    calculateExtendedCost(material): void {
        if (material.quantity != "" && material.unitCost) {
            material.extendedCost = material.quantity * material.unitCost;

            this.calculateExtendedCostSummation();
            // this.calculateCost()
        }
    }
    // sum of extended cost
    calculateExtendedCostSummation() {
        this.workFlow.materialExtendedCostSummation = this.workFlow.materialList.reduce((acc, x) => {
            return acc +  parseFloat(x.extendedCost == undefined || x.extendedCost === '' ? 0 : x.extendedCost)
        }, 0);
        this.workFlow.totalMaterialCostValue = this.workFlow.materialExtendedCostSummation;

    }

    // sum of the qty
    calculateQtySummation() {
        this.workFlow.materialQtySummation = this.workFlow.materialList.reduce((acc, x) => {
            return acc + parseFloat(x.quantity == undefined || x.quantity === '' ? 0 : x.quantity)
        }, 0);

    }
    // calculate the price summation 
    calculatePriceSummation() {
        this.workFlow.totalMaterialCost = this.workFlow.materialList.reduce((acc, x) => {
            return acc + parseFloat(x.price == undefined || x.price === '' ? 0 : x.price)
        }, 0);
    }

    isDeferredEnable(e) {
        if (e.target.checked) {
            this.workFlow.materialList = [...this.workFlow.materialList.map(x => {
                return {
                    ...x,
                    isDeferred: true
                }
            })]
            this.isDeferredBoolean = true;
        } else {
            this.workFlow.materialList = [...this.workFlow.materialList.map(x => {
                return {
                    ...x,
                    isDeferred: false
                }
            })]
            this.isDeferredBoolean = false;
        }
    }

}