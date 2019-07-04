import { Component, Input, OnChanges, OnInit, EventEmitter, Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { ActionService } from "../Workflow/ActionService";
import { IEquipmentAssetType } from "../Workflow/EquipmentAssetType";
import { IEquipmentList } from "../Workflow/EquipmentList";
import { VendorService } from "../services/vendor.service";
import { ItemMasterService } from "../services/itemMaster.service";
import { AssetService } from "../services/asset/Assetservice";

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

    constructor(private itemser: ItemMasterService, private actionService: ActionService, private vendorService: VendorService, private assetService: AssetService) {
    }

    ngOnInit(): void {
        this.row = this.workFlow.equipments[0];
        //this.assetService.getAllAssetList().subscribe(
        //    result => {
        //        console.log('this is asset list');
        //        console.log(result);
        //    },
        //);
        this.actionService.getEquipmentAssetType().subscribe(
            equipmentAssetType => {
                this.equipmentAssetType = equipmentAssetType;
            },
            error => this.errorMessage = <any>error
        );
        //this.loadPartData();
        this.ptnumberlistdata();
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
        if (this.workFlow.equipments[index].workflowEquipmentListid == "0" || this.workFlow.equipments[index].workflowEquipmentListid == "") {
            this.workFlow.equipments.splice(index, 1);
        }
        else {
            this.workFlow.equipments[index].isDelete = true;
        }
    }

    onPartSelect(event, equipment) {
        if (this.itemclaColl) {
            for (let i = 0; i < this.itemclaColl.length; i++) {
                if (event == this.itemclaColl[i][0].partName) {
                    equipment.itemMasterId = this.itemclaColl[i][0].partId;
                    equipment.assetDescription = this.itemclaColl[i][0].description;
                    equipment.partNumber = this.itemclaColl[i][0].partName;

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
