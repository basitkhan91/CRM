import { Component, Input, OnChanges, OnInit, EventEmitter, Output, OnDestroy } from "@angular/core";
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
import { WorkOrderQuoteService } from "../services/work-order/work-order-quote.service";

@Component({
    selector: 'grd-material',
    templateUrl: './Material-List-Create.component.html',
    styleUrls: ['./Material-List-Create.component.css']
})
export class MaterialListCreateComponent implements OnInit, OnChanges {
    @Input() workFlowObject;
    partCollection: any[] = [];
    itemclaColl: any[] = [];
    allPartnumbersInfo: any[] = [];
    allUomdata: any[] = [];
    itemClassInfo: any[] = [];
    allconditioninfo: any[] = [];
    partListData: any[] = [];
    @Input() isWorkOrder;
    @Input() isEdit = false;
    @Input() editData;
    @Input() isQuote = false;
    @Input() taskList: any = [];
    @Input() workFlow: IWorkFlow;
    @Input() markupList;
    @Input() UpdateMode: boolean;
    @Input() isWorkFlow: boolean = false;
    @Output() workFlowChange = new EventEmitter();
    @Output() saveMaterialListForWO = new EventEmitter();
    @Output() updateMaterialListForWO = new EventEmitter();


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
    defaultConditionId: any;

    constructor(private actionService: ActionService, private itemser: ItemMasterService, private vendorService: VendorService, private conditionService: ConditionService, public itemClassService: ItemClassificationService, public unitofmeasureService: UnitOfMeasureService, private alertService: AlertService, private workOrderQuoteService: WorkOrderQuoteService) {

    }

    defaultMaterialMandatory: string;

    ngOnInit(): void {

        // this.row = this.workFlow.materialList[0];
        // if (this.row == undefined) {
        //     this.row = {};
        // }
        // this.row.taskId = this.workFlow.taskId;


        if (this.isWorkOrder) {
            this.row = this.workFlow.materialList[0];
            console.log(this.editData)
            if (this.isEdit) {
                this.workFlow.materialList = [];
                // const data = {
                //     ...this.editData,
                //     partDescription: this.editData.epnDescription,
                //     partNumber: this.editData.epn,

                // }
                this.workFlow.materialList.push(this.editData);
                this.reCalculate();
            } else {
                this.workFlow.materialList = [];
                this.row = this.workFlow.materialList[0];
                this.addRow();
                this.workFlow.materialQtySummation = 0;
                this.workFlow.materialExtendedCostSummation = 0;
                this.workFlow.totalMaterialCost = 0;
                this.workFlow.materialExtendedPriceSummation = 0;
            }

        } else {
            this.row = this.workFlow.materialList[0];
            if (this.row == undefined) {
                this.row = {};
            }
            this.row.taskId = this.workFlow.taskId;
        }

        if (this.isQuote && this.editData.length > 0) {
            this.workFlow.materialList = this.editData;
        }
        else if (this.isQuote) {
            this.workFlow.materialList = [];
            this.addRow();
        }





        this.actionService.GetMaterialMandatory().subscribe(
            mandatory => {
                this.materialMandatory = mandatory;
                this.defaultMaterialMandatory = 'Mandatory';
                if ((this.workFlow.workflowId == undefined || this.workFlow.workflowId == '0') && this.workFlow.materialList[0] != undefined) {
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



    ngOnChanges() {
        if (this.isQuote && this.editData.length > 0) {
            this.workFlow.materialList = this.editData;
        }
        else if (this.isQuote) {
            this.workFlow.materialList = [];
        }
        if (!this.isWorkFlow) {
            this.addRow();
        }
    }

    reCalculate() {
        this.calculateExtendedCostSummation();
        this.calculateQtySummation();
        this.calculatePriceSummation();
        this.calculateExtendedPriceSummation();
    }

    filterpartItems(event) {
        this.partCollection = [];
        this.itemclaColl = [];

        if (this.allPartnumbersInfo != undefined && this.allPartnumbersInfo.length > 0) {
            for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
                let partName = this.allPartnumbersInfo[i].partNumber;

                if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {

                    var alreadySelected = this.workFlow.materialList.find(x => x.itemMasterId == this.allPartnumbersInfo[i].itemMasterId && this.workFlow.taskId == x.taskId);
                    if (this.workFlow.partNumber != this.allPartnumbersInfo[i].itemMasterId && alreadySelected == undefined) {
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

    onPartSelect(event, material) {
        if (this.itemclaColl) {
            var materialObj = this.workFlow.materialList.find(x => x.partNumber == event && x.taskId == this.workFlow.taskId);

            var itemMasterId = this.itemclaColl.find(x => x[0].partName == event)[0].partId;

            if (materialObj != undefined) {
                if (this.workFlow.exclusions) {
                    var isPartExcluded = this.workFlow.exclusions.find(x => x.itemMasterId != '' && x.itemMasterId == itemMasterId && x.taskId == this.workFlow.taskId)
                    if (isPartExcluded != undefined) {
                        material.itemMasterId = '';
                        material.partDescription = '';
                        material.partNumber = '';
                        material.itemClassificationId = '';
                        material.partName = '';
                        event = '';
                        this.alertService.showMessage("Workflow", "Part Number already exist in Exclusion List.", MessageSeverity.error);
                        return;
                    }
                }
            }

            for (let i = 0; i < this.itemclaColl.length; i++) {
                if (event == this.itemclaColl[i][0].partName) {
                    material.itemMasterId = this.itemclaColl[i][0].partId;
                    material.partDescription = this.itemclaColl[i][0].description;
                    material.partNumber = this.itemclaColl[i][0].partName;
                    material.itemClassificationId = this.itemclaColl[i][0].itemClassificationId;
                    material.unitOfMeasureId = this.allPartDetails.find(x => x.itemMasterId == material.itemMasterId).purchaseUnitOfMeasureId;
                }
            };
            this.getPNDetails(material);
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
            var defaultCondition = this.materialCondition.find(x => x.description.trim().toLowerCase() == "new");

            this.defaultConditionId = defaultCondition != undefined ? defaultCondition.conditionId : 0;

            if ((this.workFlow.workflowId == undefined || this.workFlow.workflowId == '0') && !this.isEdit && this.workFlow.materialList[0] != undefined) {
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
            var defaultUOM = this.materialUOM.find(x => x.shortName.trim().toLowerCase() == "ea".toLowerCase());
            this.defaultUOMId = defaultUOM != undefined ? defaultUOM.defaultUOMId : 0;

            console.log(this.isEdit)


            if ((this.workFlow.workflowId == undefined || this.workFlow.workflowId == '0') && !this.isEdit && this.workFlow.materialList[0] != undefined) {

                this.workFlow.materialList[0].unitOfMeasureId = this.defaultUOMId;
            }


        });
    }

    addRow(): void {
        var newRow = Object.assign({}, this.row);

        newRow.workflowMaterialListId = "0";
        if (this.taskList) {
            this.taskList.forEach(
                task => {
                    if (task.description == "Assemble") {
                        newRow.taskId = task.taskId;
                    }
                }
            )
        }
        newRow.conditionCodeId = this.defaultConditionId;
        newRow.extendedCost = "";
        newRow.extraCost = "";
        newRow.itemClassificationId = "";
        newRow.itemMasterId = "";
        newRow.mandatoryOrSupplemental = 'Mandatory';
        newRow.partDescription = "";
        newRow.partNumber = "";
        newRow.isDeferred = this.isDeferredBoolean;
        newRow.memo = "";
        newRow.price = "";
        newRow.provisionId = "";
        newRow.quantity = "";
        newRow.unitCost = "";
        newRow.unitOfMeasureId = this.defaultUOMId;
        newRow.isDelete = false;
        newRow.extendedPrice = '';
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


    calculateExtendedCost(material): void {
        if (material.quantity != "" && material.unitCost) {
            material.extendedCost = parseFloat((material.quantity * material.unitCost).toString()).toFixed(2);
        }
        else {
            material.extendedCost = "";
        }
        this.calculateExtendedCostSummation();
    }


    // sum of extended cost
    calculateExtendedCostSummation() {
        this.workFlow.materialExtendedCostSummation = this.workFlow.materialList.reduce((acc, x) => {
            return acc + parseFloat(x.extendedCost == undefined || x.extendedCost === '' ? 0 : x.extendedCost)
        }, 0);

        this.workFlow.totalMaterialCostValue = parseFloat(this.workFlow.materialExtendedCostSummation.toFixed(2));
    }

    calculateExtendedPrice(material): void {
        if (material.quantity != "" && material.price != "") {
            material.extendedPrice = parseFloat((material.quantity * material.price).toFixed(2));
        }
        else {
            material.extendedPrice = "";
        }
        this.calculateExtendedPriceSummation();
    }


    // sum of extended cost
    calculateExtendedPriceSummation() {
        this.workFlow.materialExtendedPriceSummation = this.workFlow.materialList.reduce((acc, x) => {
            return acc + parseFloat(x.extendedPrice == undefined || x.extendedPrice === '' ? 0 : x.extendedPrice)
        }, 0);

        this.workFlow.materialExtendedPriceSummation = parseFloat(this.workFlow.materialExtendedPriceSummation.toFixed(2));
    }

    // sum of the qty
    calculateQtySummation() {
        this.workFlow.materialQtySummation = this.workFlow.materialList.reduce((acc, x) => {
            return acc + parseInt((x.quantity == undefined || x.quantity === '' ? 0 : x.quantity))
        }, 0);

        this.workFlow.materialList.forEach(function (material) {
            material.quantity = material.quantity != '' ? parseInt(material.quantity) : '';
        });
    }

    validateQuantity(event, material): void {

        if (material.quantity != "") {
            event.target.value = parseInt(material.quantity);
            material.quantity = parseInt(material.quantity);
        }
        else {
            material.quantity = 0;
        }
    }

    // calculate the price summation 
    calculatePriceSummation() {
        this.workFlow.totalMaterialCost = this.workFlow.materialList.reduce((acc, x) => {
            return acc + parseFloat(x.price == undefined || x.price === '' ? 0 : x.price)
        }, 0);

        this.workFlow.totalMaterialCost = parseFloat(this.workFlow.totalMaterialCost.toFixed(2));
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

    saveMaterialsWorkOrder() {
        this.saveMaterialListForWO.emit(this.workFlow);
        this.workFlow.materialList = [];
        this.addRow();
        this.workFlow.materialQtySummation = 0;
        this.workFlow.materialExtendedCostSummation = 0;
        this.workFlow.totalMaterialCost = 0;
        this.workFlow.materialExtendedPriceSummation = 0;
    }

    updateMaterialsWorkOrder() {
        this.updateMaterialListForWO.emit(this.workFlow);
        this.workFlow.materialList = [];
        this.addRow();
        this.workFlow.materialQtySummation = 0;
        this.workFlow.materialExtendedCostSummation = 0;
        this.workFlow.totalMaterialCost = 0;
        this.workFlow.materialExtendedPriceSummation = 0;
    }

    markupChanged(matData) {
        try {
            this.markupList.forEach((markup) => {
                if (markup.value == matData.markupPercentageId) {
                    matData.materialCostPlus = (matData.extendedPrice) + (((matData.extendedPrice) / 100) * Number(markup.label))
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    getTotalCostPlusAmount() {
        let total = 0;
        this.workFlow.materialList.forEach(
            (material) => {
                if (material.materialCostPlus) {
                    total += material.materialCostPlus;
                }
            }
        )
        return total;
    }

    getTotalFixedAmount() {
        let total = 0;
        this.workFlow.materialList.forEach(
            (material) => {
                if (material.fixedAmount) {
                    total += Number(material.fixedAmount);
                }
            }
        )
        return total;
    }

    getPNDetails(part) {
        if (part.partNumber && part.conditionCodeId) {
            this.allPartDetails.forEach(
                pn => {
                    if (pn.partNumber == part.partNumber) {
                        this.workOrderQuoteService.getPartDetails(pn.itemMasterId, part.conditionCodeId)
                            .subscribe(
                                partDetail => {
                                    if (partDetail) {
                                        part.unitCost = partDetail["pP_UnitPurchasePrice"];
                                        part.billingRate = partDetail["sP_FSP_FlatPriceAmount"];
                                        part.markupPercentageId = partDetail["sP_CalSPByPP_MarkUpPercOnListPrice"];
                                    }
                                }
                            )
                    }
                }
            )
        }
    }


}