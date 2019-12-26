import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { IMaterialMandatory } from '../../../../Workflow/MaterialMandatory';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { VendorService } from '../../../../services/vendor.service';
import { ConditionService } from '../../../../services/condition.service';
import { ItemClassificationService } from '../../../../services/item-classfication.service';
import { UnitOfMeasureService } from '../../../../services/unitofmeasure.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { ActionService } from '../../../../Workflow/ActionService';
import { WorkOrderService } from '../../../../services/work-order/work-order.service';
import * as $ from 'jquery'
import { AuthService } from '../../../../services/auth.service';
// import { PageHeaderComponent } from '../../../../shared/page-header.component';
// import * as $ from 'jquery';
// import * as $ from 'jquery';

@Component({
    selector: 'app-work-order-complete-material-list',
    templateUrl: './work-order-complete-material-list.component.html',
    styleUrls: ['./work-order-complete-material-list.component.scss'],
    animations: [fadeInOut]
})
/** WorkOrderCompleteMaterialList component*/
export class WorkOrderCompleteMaterialListComponent {
    @Input() workOrderMaterialList;
    @Input() isWorkOrder;
    @Input() workFlowObject;
    @Input() savedWorkOrderData;
    @Input() materialStatus;
    @Input() mpnId;
    @Output() saveMaterialListForWO = new EventEmitter();
    @Output() updateMaterialListForWO = new EventEmitter();
    @Output() saveRIParts = new EventEmitter();
    @Output() refreshData = new EventEmitter();
    statusId = null;

    // workflow Variables 
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
    partCollection: any[] = [];
    itemclaColl: any[] = [];
    allPartnumbersInfo: any[] = [];
    allUomdata: any[] = [];
    itemClassInfo: any[] = [];
    allconditioninfo: any[] = [];
    partListData: any[] = [];
    addNewMaterial: boolean = false;
    defaultMaterialMandatory: string;
    workFlowWorkOrderId: any;
    reservedList: any;
    alternatePartData: any = [];
    checkedParts: any = [];
    isEdit: boolean = false;
    editData: any;



    /** WorkOrderCompleteMaterialList ctor */
    constructor(private actionService: ActionService, private itemser: ItemMasterService,
        private vendorService: VendorService,
        private workOrderService: WorkOrderService,
        private conditionService: ConditionService,
        public itemClassService: ItemClassificationService,
        public unitofmeasureService: UnitOfMeasureService,
        private authService: AuthService,
        private cdRef: ChangeDetectorRef,
        private alertService: AlertService) {

    }




    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    ngOnInit() {
        console.log(this.materialStatus);
        this.workFlowWorkOrderId = this.savedWorkOrderData.workFlowWorkOrderId;

        // this.workFlowWorkOrderId = this.savedWorkOrderData.workFlowWorkOrderId;
        // this.addRow();

        // this.actionService.GetMaterialMandatory().subscribe(
        //     mandatory => {
        //         this.materialMandatory = mandatory;
        //         this.defaultMaterialMandatory = 'Mandatory';
        //         if ((this.workFlow.workflowId == undefined || this.workFlow.workflowId == '0') && this.workFlow.materialList[0]) {
        //             this.workFlow.materialList[0].mandatoryOrSupplemental = this.defaultMaterialMandatory;
        //         }
        //     },
        //     error => this.errorMessage = <any>error
        // );




        // this.loadConditionData();
        // this.loadItemClassData();
        // this.loadPartData();
        // this.loadUOMData();
        // this.ptnumberlistdata();
    }










    // // code for workFlow
    // reCalculate() {
    //     this.calculateExtendedCostSummation();
    //     this.calculateQtySummation();
    //     this.calculatePriceSummation();
    //     this.calculateExtendedPriceSummation();
    // }

    // addNew() {
    //     this.addNewMaterial = true;        // if (this.workFlow.materialList.length === 0) {
    //     //     this.addRow();
    //     // }

    // }

    closeAddNew() {
        this.addNewMaterial = false;
    }
    // filterpartItems(event) {

    //     this.partCollection = [];
    //     this.itemclaColl = [];
    //     if (this.allPartnumbersInfo) {
    //         if (this.allPartnumbersInfo.length > 0) {
    //             //this.partCollection.push(" ");
    //             for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
    //                 let partName = this.allPartnumbersInfo[i].partNumber;
    //                 if (partName) {
    //                     if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                         if (this.workFlow.partNumber != this.allPartnumbersInfo[i].itemMasterId) {
    //                             this.itemclaColl.push([{
    //                                 "partId": this.allPartnumbersInfo[i].itemMasterId,
    //                                 "partName": partName,
    //                                 "description": this.allPartnumbersInfo[i].partDescription,
    //                                 "itemClassificationId": this.allPartnumbersInfo[i].itemClassificationId,
    //                             }]);


    //                             this.partCollection.push(partName);
    //                         }

    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    // onPartSelect(event, material) {
    //     if (this.itemclaColl) {
    //         var duplicate = this.workFlow.materialList.filter(x => x.partNumber == event && x.taskId == this.workFlow.taskId);

    //         if (duplicate.length > 1) {
    //             material.itemMasterId = '';
    //             material.partDescription = '';
    //             material.partNumber = '';
    //             material.itemClassificationId = '';
    //             event = '';
    //             this.alertService.showMessage("Workflow", "Part Number is already in use in Material List.", MessageSeverity.error);
    //             return;
    //         }

    //         for (let i = 0; i < this.itemclaColl.length; i++) {
    //             if (event == this.itemclaColl[i][0].partName) {
    //                 material.itemMasterId = this.itemclaColl[i][0].partId;
    //                 material.partDescription = this.itemclaColl[i][0].description;
    //                 material.partNumber = this.itemclaColl[i][0].partName;
    //                 material.itemClassificationId = this.itemclaColl[i][0].itemClassificationId;
    //             }
    //         };

    //     }
    // }

    // private ptnumberlistdata() {
    //     this.itemser.getPrtnumberslistList().subscribe(
    //         results => this.onptnmbersSuccessful(results[0]),
    //     );
    // }

    // private onptnmbersSuccessful(allWorkFlows: any[]) {
    //     this.allPartnumbersInfo = allWorkFlows;
    // }

    // private loadPartData() {
    //     this.vendorService.getPartDetails().subscribe(
    //         data => {
    //             this.allPartDetails = data[0];

    //             if (this.vendorService.isEditMode == false) {

    //                 for (let i = 0; i < this.partListData.length; i++) {
    //                     this.partListData[i].partListObj = this.allPartDetails;
    //                 }
    //             }
    //         })
    // }

    // private loadConditionData() {
    //     this.conditionService.getConditionList().subscribe(data => {
    //         this.materialCondition = data[0];
    //         this.defaultConditionId = this.materialCondition.filter(x => x.description.trim() == "NEW")[0]?this.materialCondition.filter(x => x.description.trim() == "NEW")[0].conditionId:'';
    //         if ((this.workFlow.workflowId == undefined || this.workFlow.workflowId == '0') && this.workFlow.materialList[0]) {
    //             this.workFlow.materialList[0].conditionCodeId = this.defaultConditionId;
    //         }
    //     })
    // }

    // private loadItemClassData() {
    //     this.itemClassService.getWorkFlows().subscribe(data => { this.itemClassInfo = data[0] });
    // }

    // private loadUOMData() {
    //     this.unitofmeasureService.getUnitOfMeasureList().subscribe(uomdata => {
    //         this.materialUOM = uomdata[0];
    //         this.defaultUOMId = this.materialUOM.filter(x => x.shortName.trim() == "Ea")[0]?this.materialUOM.filter(x => x.shortName.trim() == "Ea")[0].unitOfMeasureId:'';
    //         if ((this.workFlow.workflowId == undefined || this.workFlow.workflowId == '0') && this.workFlow.materialList[0]) {
    //             this.workFlow.materialList[0].unitOfMeasureId = this.defaultUOMId;
    //         }
    //     });
    // }

    // addRow(): void {
    //     var newRow = Object.assign({}, this.row);

    //     newRow.workflowMaterialListId = "0";
    //     newRow.taskId = this.workFlow.taskId;
    //     newRow.conditionCodeId = this.defaultConditionId;
    //     newRow.extendedCost = "";
    //     newRow.extraCost = "";
    //     newRow.itemClassificationId = "";
    //     newRow.itemMasterId = "";
    //     newRow.mandatoryOrSupplemental = 'Mandatory';
    //     newRow.partDescription = "";
    //     newRow.partNumber = " ";
    //     newRow.isDeferred = this.isDeferredBoolean;
    //     newRow.memo = "";
    //     newRow.price = "";
    //     newRow.provisionId = "";
    //     newRow.quantity = "";
    //     newRow.unitCost = "";
    //     newRow.unitOfMeasureId = this.defaultUOMId;
    //     newRow.isDelete = false;
    //     newRow.extendedPrice = '';
    //     this.workFlow.materialList.push(newRow);
    // }

    // deleteRow(index): void {
    //     if (this.workFlow.materialList[index].workflowMaterialListId == undefined || this.workFlow.materialList[index].workflowMaterialListId == "0" || this.workFlow.materialList[index].workflowMaterialListId == "") {
    //         this.workFlow.materialList.splice(index, 1);
    //     }
    //     else {
    //         this.workFlow.materialList[index].isDelete = true;
    //     }
    //     this.reCalculate();
    // }


    // calculateExtendedCost(material): void {
    //     if (material.quantity != "" && material.unitCost) {
    //         material.extendedCost = parseFloat((material.quantity * material.unitCost).toString()).toFixed(2);
    //     }
    //     else {
    //         material.extendedCost = "";
    //     }
    //     this.calculateExtendedCostSummation();
    // }


    // // sum of extended cost
    // calculateExtendedCostSummation() {
    //     this.workFlow.materialExtendedCostSummation = this.workFlow.materialList.reduce((acc, x) => {
    //         return acc + parseFloat(x.extendedCost == undefined || x.extendedCost === '' ? 0 : x.extendedCost)
    //     }, 0);

    //     this.workFlow.totalMaterialCostValue = parseFloat(this.workFlow.materialExtendedCostSummation.toFixed(2));
    // }

    // calculateExtendedPrice(material): void {
    //     if (material.quantity != "" && material.price != "") {
    //         material.extendedPrice = parseFloat((material.quantity * material.price).toFixed(2));
    //     }
    //     else {
    //         material.extendedPrice = "";
    //     }
    //     this.calculateExtendedPriceSummation();
    // }


    // // sum of extended cost
    // calculateExtendedPriceSummation() {
    //     this.workFlow.materialExtendedPriceSummation = this.workFlow.materialList.reduce((acc, x) => {
    //         return acc + parseFloat(x.extendedPrice == undefined || x.extendedPrice === '' ? 0 : x.extendedPrice)
    //     }, 0);

    //     this.workFlow.materialExtendedPriceSummation = parseFloat(this.workFlow.materialExtendedPriceSummation.toFixed(2));
    // }

    // // sum of the qty
    // calculateQtySummation() {
    //     this.workFlow.materialQtySummation = this.workFlow.materialList.reduce((acc, x) => {
    //         return acc + parseInt((x.quantity == undefined || x.quantity === '' ? 0 : x.quantity))
    //     }, 0);

    //     this.workFlow.materialList.forEach(function (material) {
    //         material.quantity = parseInt(material.quantity);
    //     });

    // }

    // validateQuantity(event, material): void {
    //     event.target.value = parseInt(material.quantity);
    //     material.quantity = parseInt(material.quantity);
    // }

    // // calculate the price summation 
    // calculatePriceSummation() {
    //     this.workFlow.totalMaterialCost = this.workFlow.materialList.reduce((acc, x) => {
    //         return acc + parseFloat(x.price == undefined || x.price === '' ? 0 : x.price)
    //     }, 0);

    //     this.workFlow.totalMaterialCost = parseFloat(this.workFlow.totalMaterialCost.toFixed(2));
    // }

    // isDeferredEnable(e) {
    //     if (e.target.checked) {
    //         this.workFlow.materialList = [...this.workFlow.materialList.map(x => {
    //             return {
    //                 ...x,
    //                 isDeferred: true
    //             }
    //         })]
    //         this.isDeferredBoolean = true;
    //     } else {
    //         this.workFlow.materialList = [...this.workFlow.materialList.map(x => {
    //             return {
    //                 ...x,
    //                 isDeferred: false
    //             }
    //         })]
    //         this.isDeferredBoolean = false;
    //     }
    // }

    createNew() {
        this.isEdit = false;
        this.editData = undefined;
        this.addNewMaterial = true;
    }
    edit(rowData) {
        this.createNew();
        this.cdRef.detectChanges();
        this.isEdit = true;
        this.addNewMaterial = true;
        this.editData = rowData;
    }
    delete(rowData) {


        const { workOrderMaterialsId } = rowData;

        this.workOrderService.deleteWorkOrderMaterialList(workOrderMaterialsId, this.userName).subscribe(res => {
            this.refreshData.emit();
            this.alertService.showMessage(
                '',
                'Deleted WorkOrder Material Successfully',
                MessageSeverity.success
            );
        })

    }

    saveMaterialList(event) {

        this.saveMaterialListForWO.emit(event);
        $('#addNewMaterials').modal('hide');
    }

    updateMaterialList(event) {
        this.updateMaterialListForWO.emit(event);
        $('#addNewMaterials').modal('hide');
    }

    validatePartsQuantity(data) {
        if (this.statusId === 1 || this.statusId === 4) {
            if ((data.quantityAlreadyReserved + data.quantityReserved) > data.quantity) {
                alert('Quantity Reserved and Quantity Available Cant be greater the Quantity Available');
                data.quantityReserved = null;
            }
        } else if (this.statusId === 2) {
            if (data.quantityIssued > data.quantityAlreadyReserved) {
                alert('Quantity Issued  is greater than Quantity Reserved');
                data.quantityIssued = null;
            }
        } else if (this.statusId === 3) {
            if (data.quantity > (data.quantityReserved + data.quantityIssued)) {
                alert('Quantity Issued is greater than Quantity Available');
                data.quantity = null;
            }
        }

    }

    partsIssueRI(statusId) {
        this.statusId = statusId;
        this.reservedList = [];
        this.alternatePartData = [];
        if (this.workFlowWorkOrderId) {
            this.workOrderService.getReservedPartsByWorkFlowWOId(this.workFlowWorkOrderId, statusId).subscribe(res => {
                this.reservedList = res.map(x => {

                    return {
                        ...x,
                        isParentChecked: false,
                        woReservedIssuedAltParts: x.woReservedIssuedAltParts.map(y => {
                            return {
                                ...y,
                                isChildChecked: false
                            }
                        })
                    }

                });
            }, err => {
                this.reservedList = []
            })
        }

    }

    showAlternateParts(isChecked, childPart) {
        this.alternatePartData = []
        this.alternatePartData = childPart;
        if (isChecked === false) {
            this.alternatePartData = []
        }
    }

    selectedParts() {
        this.checkedParts = [];
        this.reservedList.map(x => {
            if (x.isParentChecked) {
                const { woReservedIssuedAltParts, ...rest } = x
                this.checkedParts.push({ ...rest, partStatusId: this.statusId });
            }
            x.woReservedIssuedAltParts.map(c => {
                if (c.isChildChecked) {
                    this.checkedParts.push({ ...c, partStatusId: this.statusId });
                }

            })
        })
        console.log(this.checkedParts)

    }
    saveRIPart() {
        this.checkedParts = []
        const checkedData = this.reservedList.map(x => {
            if (x.isParentChecked) {
                const { woReservedIssuedAltParts, ...rest } = x
                this.checkedParts.push({ ...rest, partStatusId: this.statusId });
            }
            x.woReservedIssuedAltParts.map(c => {
                if (c.isChildChecked) {
                    this.checkedParts.push({ ...c, partStatusId: this.statusId });
                }

            })
        })
        console.log
        this.saveRIParts.emit(this.checkedParts);



    }
    createNewPoWorkOrder(){
        window.open(`/vendorsmodule/vendorpages/workorder-po-create/${0}/${this.mpnId}`)
    }




}