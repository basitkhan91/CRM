import { Component, Input, OnChanges, OnInit, EventEmitter, Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { ActionService } from "../Workflow/ActionService";
import { IEquipmentAssetType } from "../Workflow/EquipmentAssetType";
import { IEquipmentList } from "../Workflow/EquipmentList";
import { VendorService } from "../services/vendor.service";
import { ItemMasterService } from "../services/itemMaster.service";
import { AssetService } from "../services/asset/Assetservice";
import { MessageSeverity, AlertService } from "../services/alert.service";

@Component({
    selector: 'grd-equipment',
    templateUrl: './Equipment-Create.component.html',
    styleUrls: ['./Equipment-Create.component.css']
})
export class EquipmentCreateComponent implements OnInit, OnChanges {
    partCollection: any[];
    @Input() workFlow: IWorkFlow;
    @Input() UpdateMode: boolean;
    @Output() notify: EventEmitter<IWorkFlow> =
        new EventEmitter<IWorkFlow>();
    allUomdata: any[] = [];
    itemClassInfo: any[] = [];
    allconditioninfo: any;
    allPartDetails: any[] = [];
    partListData: any;
    equipmentAssetType: IEquipmentAssetType[];
    errorMessage: string;
    row: any;
    itemclaColl: any[];
    allPartnumbersInfo: any[] = [];
    currentPage : number = 1;
    itemsPerPage : number = 10;

    constructor(private itemser: ItemMasterService, private actionService: ActionService, private vendorService: VendorService, private assetService: AssetService, private alertService : AlertService) {
    }

    ngOnInit(): void {
       // if (this.workFlow.equipments.length > 0) {
            this.row = this.workFlow.equipments[0];
            this.row.taskId = this.workFlow.taskId;
            this.actionService.getEquipmentAssetType().subscribe(
                equipmentAssetType => {
                    this.equipmentAssetType = equipmentAssetType;
                },
                error => this.errorMessage = <any>error
            );
            this.ptnumberlistdata();
        //}        
    }

    ngOnChanges(): void {

    }

    addRow(): void {
        var newRow = Object.assign({}, this.row);
        newRow.workflowEquipmentListid = "0";
        newRow.taskId = this.workFlow.taskId;
        newRow.assetDescription = "";
        newRow.assetId = "";
        newRow.assetTypeId = "";
        newRow.quantity = "";
        newRow.memo = "";
        newRow.quantity = "";
        newRow.unitCost = "";
        newRow.unitPrice = "";
        newRow.vendorUnitPrice = "";
        newRow.workflowChargeTypeId = "";
        newRow.partNumber = "";
        newRow.isDelete = false;
        this.workFlow.equipments.push(newRow);
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


    deleteRow(index): void {
        if (this.workFlow.equipments[index].workflowEquipmentListid == undefined || this.workFlow.equipments[index].workflowEquipmentListid == "0" || this.workFlow.equipments[index].workflowEquipmentListid == "") {
            this.workFlow.equipments.splice(index, 1);
        }
        else {	
            this.workFlow.equipments[index].isDelete = true;	
        }	
    }

    onPartSelect(event, equipment) {
        if (this.itemclaColl) {

            var anyEquipment = this.workFlow.equipments.filter(equipment =>
                equipment.taskId == this.workFlow.taskId && equipment.partNumber == event);

            if (anyEquipment.length > 1) {
                equipment.assetId = "";
                equipment.partNumber = "Select";
                equipment.assetDescription = "";
                equipment.assetTypeId = "";
                event = "";
                this.alertService.showMessage("Workflow", "Asset Id is already in use in Equipment List", MessageSeverity.error);
            }
            else {
                for (let i = 0; i < this.itemclaColl.length; i++) {
                    if (event == this.itemclaColl[i][0].assetId) {
                        equipment.assetId = this.itemclaColl[i][0].assetRecordId;
                        equipment.partNumber = this.itemclaColl[i][0].assetId;
                        equipment.assetDescription = this.itemclaColl[i][0].description;
                        equipment.assetTypeId = this.itemclaColl[i][0].assetTypeId;
                    }
                };
            }

            
        }
    }
    filterpartItems(event) {

        this.partCollection = [];
        this.itemclaColl = [];
        if (this.allPartnumbersInfo) {
            if (this.allPartnumbersInfo.length > 0) {
                this.partCollection.push("Select");

                this.itemclaColl.push([{
                    "assetRecordId": "",
                    "assetId": "Select",
                    "assetTypeId": "",
                    "assetTypeName": "",
                    "description": ""
                }]);

                for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
                    let assetId = this.allPartnumbersInfo[i].assetId;
                    if (assetId) {
                        if (assetId.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                            this.itemclaColl.push([{
                                "assetRecordId": this.allPartnumbersInfo[i].assetRecordId,
                                "assetId": this.allPartnumbersInfo[i].assetId,
                                "assetTypeId": this.allPartnumbersInfo[i].assetTypeId,
                                "assetTypeName": this.allPartnumbersInfo[i].assetType.assetTypeName,
                                "description": this.allPartnumbersInfo[i].description
                            }]);

                            this.partCollection.push(assetId);
                        }
                    }
                }
            }
        }
    }
    private ptnumberlistdata() {
        this.assetService.getAllAssetList().subscribe(results => {
            this.onptnmbersSuccessful(results[0]);
        });
        
    }
    private onptnmbersSuccessful(allWorkFlows: any[]) {
        
        this.allPartnumbersInfo = allWorkFlows;

    }
}
