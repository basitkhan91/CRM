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
    @Input() employeesOriginalData;
    @Input() isWorkOrder;
    @Input() workFlowObject;
    @Input() savedWorkOrderData;
    @Input() taskList: any[] = [];
    @Input() materialStatus;
    @Input() mpnId;
    @Output() saveMaterialListForWO = new EventEmitter();
    @Output() updateMaterialListForWO = new EventEmitter();
    @Output() saveRIParts = new EventEmitter();
    @Output() refreshData = new EventEmitter();
    statusId = null;

    // workflow Variables 
    // materialCondition: any[] = [];
    // materialMandatory: IMaterialMandatory[];
    // materialUOM: any[] = [];
    // row: any;
    // sourceWorkFlow: any = {};
    // errorMessage: string;
    // allPartDetails: any[] = [];
    // totalCost: number = 0;
    // globalDeffered = false;
    // isDeferredBoolean: any = false;
    // currentPage: number = 1;
    // itemsPerPage: number = 10;
    // variableIdOfNew: any[];
    // defaultUOMId: number;
    // defaultConditionId: number;
    // partCollection: any[] = [];
    // itemclaColl: any[] = [];
    // allPartnumbersInfo: any[] = [];
    // allUomdata: any[] = [];
    // itemClassInfo: any[] = [];
    // allconditioninfo: any[] = [];
    // partListData: any[] = [];
    addNewMaterial: boolean = false;
    // defaultMaterialMandatory: string;
    workFlowWorkOrderId: any;
    reservedList: any;
    alternatePartData: any = [];
    checkedParts: any = [];
    isEdit: boolean = false;
    editData: any;
    isShowEqPN: boolean = false;
    isShowAlternatePN: boolean = false;
    eqPartData: any[] = [];


    cols = [
        {field: 'partNumber' , header:'Part Number'},
        {field: 'partDescription' , header:'Part Description'},
        {field: 'altPartNumber' , header:'Alternate PN'},
        {field: 'serialNumber' , header:'SerialNumber'},
        {field : 'provision', header: 'Provision'},
        {field : 'oem', header: 'OEM'},
        {field : 'control', header: 'Control'},
        {field : 'condition', header: 'Condition'},
        {field : 'itemType', header: 'Item Type'},
        {field : 'qunatityRequried', header: 'Quantity Requried'},
        {field : 'quantityReserved', header: 'Quantity Reserved'},
        {field : 'quantityTurnIn', header: 'Quantity TurnIn'},
        {field : 'quantityIssued', header: 'Quantity Issued'},
        {field : 'quantityBackOrder', header: 'Quantity BackOrder'},
        {field : 'qunatityRemaining', header: 'Quantity Remaining'},
        {field : 'unitCost', header: 'Unit Cost'},
        {field : 'extendedCost', header: 'Extended Cost'},
        {field : 'currency', header: 'Currency'},
        {field : 'purchaseOrderNumber', header: 'Purchase OrderNumber'},
        {field : 'repairOrderNumber', header: 'Repair OrderNumber'},
        {field : 'partQuantityOnHand', header: 'Part Quantity OnHand'},
        {field : 'partQuantityAvailable', header: 'Part Quantity Available'},
        {field : 'partQuantityOnOrder', header: 'Part Quantity OnOrder'},
        {field : 'receiver' , header: 'Receiver'},
        {field : 'workOrderNumber', header: 'WorkOrder Number'},
        {field : 'subWorkOrder', header: 'Sub WorkOrder'},
        {field : 'salesOrder', header: 'SalesOrder'},
        {field : 'condition', header: 'Condition'},
        {field : 'timeLife', header: 'TimeLife'},
        {field : 'wareHouse', header: 'Ware House'},
        {field : 'location', header: 'Location'},
        {field : 'shelf', header: 'Shelf'},
        {field : 'bin', header: 'Bin'},
    ]



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

    }








    closeAddNew() {
        this.addNewMaterial = false;
    }


    createNew() {
        this.isEdit = false;
        this.editData = undefined;
        this.addNewMaterial = true;
    }
    edit(rowData) {
        // this.createNew();
        // this.isEdit = false;
        this.editData = undefined;
        this.cdRef.detectChanges();
        this.isEdit = true;
        this.addNewMaterial = true;
        this.editData = { ...rowData };
        console.log(rowData);
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


    // used to get Parts from the Servers Bases on the Status Id
    partsIssueRI(statusId) {
        this.statusId = statusId;
        this.reservedList = [];
        this.alternatePartData = [];
        this.eqPartData = [];
        this.isShowEqPN = false;
        this.isShowAlternatePN = false;
        if (this.workFlowWorkOrderId) {
            this.workOrderService.getReservedPartsByWorkFlowWOId(this.workFlowWorkOrderId, statusId).subscribe(res => {
                this.reservedList = res.map(x => {

                    return {
                        ...x,
                        isParentSelected: false,
                        showAlternateParts: false,
                        showEqParts: false,
                        reservedDate: new Date(x.reservedDate),
                        issuedDate: new Date(x.issuedDate),
                        woReservedIssuedAltParts: x.woReservedIssuedAltParts.map(y => {
                            return {
                                ...y,
                                isChildSelected: false,
                                reservedDate: new Date(y.reservedDate),
                                issuedDate: new Date(y.issuedDate),
                            }
                        }),
                        woReservedIssuedEquParts: x.woReservedIssuedEquParts.map(y => {
                            return {
                                ...y,
                                isChildSelected: false,
                                reservedDate: new Date(y.reservedDate),
                                issuedDate: new Date(y.issuedDate),

                            }
                        })
                    }

                });
            }, err => {
                this.reservedList = []
            })
        }

    }
    resetAlternateParts() {
        this.alternatePartData = [];
        this.reservedList = this.reservedList.map(x => {

            return {
                ...x,
                showAlternateParts: false,
                woReservedIssuedAltParts: x.woReservedIssuedAltParts.map(y => {
                    return {
                        ...y,
                        isChildSelected: false
                    }
                }),

            }

        });
    }
    resetEqParts() {
        this.eqPartData = [];
        this.reservedList = this.reservedList.map(x => {
            return {
                ...x,
                showAlternateParts: false,
                woReservedIssuedEquParts: x.woReservedIssuedEquParts.map(y => {
                    return {
                        ...y,
                        isChildSelected: false
                    }
                })

            }

        });
    }

    showAlternateParts(isChecked, childPart) {
        this.alternatePartData = []
        this.alternatePartData = childPart;
        if (isChecked === false) {
            this.alternatePartData = []
        }
    }

    showEquantParts(isChecked, childPart) {
        this.eqPartData = []
        this.eqPartData = childPart;
        if (isChecked === false) {
            this.eqPartData = []
        }
    }

    selectedParts() {
        this.checkedParts = [];
        this.reservedList.map(x => {
            if (x.isParentSelected) {
                const { woReservedIssuedAltParts, ...rest } = x
                this.checkedParts.push({ ...rest, partStatusId: this.statusId });
            }
            x.woReservedIssuedAltParts.map(c => {
                if (c.isChildSelected) {
                    this.checkedParts.push({
                        ...c,
                        itemMasterId: c.altPartId,
                        partNumber: c.altPartNumber,
                        partStatusId: this.statusId
                    });
                }

            })
            x.woReservedIssuedEquParts.map(c => {
                if (c.isChildSelected) {
                    this.checkedParts.push({
                        ...c,
                        equPartId: c.altPartId,
                        equPartNumber: c.altPartNumber,
                        partStatusId: this.statusId
                    });
                }

            })

        })


    }
    saveRIPart() {
        this.checkedParts = []
        this.selectedParts();
        // const checkedData = this.reservedList.map(x => {
        //     if (x.isParentSelected) {
        //         const { woReservedIssuedAltParts, ...rest } = x
        //         this.checkedParts.push({ ...rest, partStatusId: this.statusId });
        //     }
        //     x.woReservedIssuedAltParts.map(c => {
        //         if (c.isChildSelected) {
        //             this.checkedParts.push({ ...c, partStatusId: this.statusId });
        //         }

        //     })
        //     x.woReservedIssuedEquParts.map(c => {
        //         if (c.isChildSelected) {
        //             this.checkedParts.push({ ...c, partStatusId: this.statusId });
        //         }

        //         })
        // })
        // console.log

        this.saveRIParts.emit(this.checkedParts);



    }
    createNewPoWorkOrder(rowData) {
        const { workOrderMaterialsId } = rowData;
        window.open(`/vendorsmodule/vendorpages/workorder-po-create/${0}/${workOrderMaterialsId}`)
    }




}