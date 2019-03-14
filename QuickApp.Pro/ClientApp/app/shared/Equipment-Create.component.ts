import { Component, Input, OnChanges, OnInit, EventEmitter , Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { ActionService } from "../Workflow/ActionService";
import { IEquipmentAssetType } from "../Workflow/EquipmentAssetType";
import { IEquipmentList } from "../Workflow/EquipmentList";
import { VendorService } from "../services/vendor.service";
import { ItemMasterService } from "../services/itemMaster.service";

@Component({
    selector:'grd-equipment',
    templateUrl:'./Equipment-Create.component.html',
    styleUrls :['./Equipment-Create.component.css']
    })
export class EquipmentCreateComponent implements OnInit,OnChanges{
	partCollection: any[];
    @Input() workFlow : IWorkFlow;
    @Input() UpdateMode : boolean;
    @Output() notify : EventEmitter<IWorkFlow> =
	new EventEmitter<IWorkFlow>();
	allUomdata: any[] = [];
	itemClassInfo: any[] = [];
	allconditioninfo: any;
	allPartDetails: any[] = [];
	partListData: any;
    equipmentAssetType:IEquipmentAssetType[];
    errorMessage:string;
	row: any;
	itemclaColl: any[];
	allPartnumbersInfo: any[] = [];
	constructor(private itemser: ItemMasterService,private actionService: ActionService, private vendorService: VendorService, ) {
    }

    ngOnInit(): void {
        this.row = this.workFlow.equipments[0];
        this.actionService.getEquipmentAssetType().subscribe(
            equipmentAssetType => {
                this.equipmentAssetType = equipmentAssetType;
            },
            error => this.errorMessage = <any>error
		);
		//this.loadPartData();
		this.ptnumberlistdata();
    }

    ngOnChanges():void{
        
    }

    addRow():void{
        var newRow = Object.assign({},this.row);
        //if(this.UpdateMode)
        //{
			newRow.workflowEquipmentListid = "0";
            newRow.AllowEdit=true;
			newRow.actionId = this.workFlow.ActionId;
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
        //}
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
    deleteRow(index):void{
        this.workFlow.equipments[index].isDelete=true;
    }
    
    allowEdit(equipment:IEquipmentList):boolean{
        return this.UpdateMode && !equipment.AllowEdit;
    }
    
    editRow(equipment:IEquipmentList):void{
        equipment.AllowEdit=true;
    }
	onPartSelect(event, measurement) {
		if (this.itemclaColl) {
			for (let i = 0; i < this.itemclaColl.length; i++) {
				if (event == this.itemclaColl[i][0].partName) {
					measurement.itemMasterId = this.itemclaColl[i][0].partId;
					measurement.assetDescription = this.itemclaColl[i][0].description;
					//measurement.partNumber = this.itemclaColl[i][0].partName;

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
