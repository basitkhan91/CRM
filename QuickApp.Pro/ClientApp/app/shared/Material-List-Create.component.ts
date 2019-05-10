import { Component, Input, OnChanges, OnInit, EventEmitter , Output } from "@angular/core";
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
    selector:'grd-material',
    templateUrl:'./Material-List-Create.component.html',
    styleUrls :['./Material-List-Create.component.css']
    })
export class MaterialListCreateComponent implements OnInit,OnChanges{
	partCollection: any[]=[];
	itemclaColl: any[]=[];
	allPartnumbersInfo: any[]=[];
	allUomdata: any[]=[];
	itemClassInfo: any[]=[];
	allconditioninfo: any[]=[];
	partListData: any[]=[];
    @Input() workFlow : IWorkFlow;
    @Input() UpdateMode : boolean;
    @Output() notify : EventEmitter<IWorkFlow> = 
    new EventEmitter<IWorkFlow>();
    materialCondition:any[]=[];
    materialMandatory:IMaterialMandatory[];
    materialUOM : any[]=[];
	row: any;
	sourceWorkFlow: any = {};
    errorMessage:string;
	allPartDetails: any[] = [];
	constructor(private actionService: ActionService,private itemser:ItemMasterService, private vendorService: VendorService, private conditionService: ConditionService, public itemClassService: ItemClassificationService, public unitofmeasureService: UnitOfMeasureService) {

    }


	ngOnInit(): void {
		this.row = this.workFlow.materialList[0];
        //this.actionService.GetMaterialCondition().subscribe(
        //    condition => {
        //        this.materialCondition = condition;
        //    },
        //    error => this.errorMessage = <any>error
        //);
        this.actionService.GetMaterialMandatory().subscribe(
            mandatory => {
                this.materialMandatory = mandatory;
            },
            error => this.errorMessage = <any>error
        );
        //this.actionService.GetMaterialUOM().subscribe(
        //    uom => {
        //        this.materialUOM = uom;
        //    },
        //    error => this.errorMessage = <any>error
        //);
		this.loadConditionData();
		this.loadItemClassData();
		this.loadPartData();
		this.loadUOMData();
		this.ptnumberlistdata();
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
	onPartSelect(event, material) {
		if (this.itemclaColl) {
			for (let i = 0; i < this.itemclaColl.length; i++) {
				if (event == this.itemclaColl[i][0].partName) {
					material.itemMasterId = this.itemclaColl[i][0].partId;
					material.partDescription = this.itemclaColl[i][0].description;
					material.partNumber = this.itemclaColl[i][0].partName;
					//this.allSelectedParts.push(this.itemclaColl[i][0].partId);
					//this.selectedActionName = event;
					//this.partWithId = [];

					//this.vendorService.getPartDetailsWithidForSinglePart(this.sourceWorkFlow.itemMasterId).subscribe(
					//	data1 => {
					//		//if (data1[0][0]) {
					//		//	this.partWithId = data1[0][0];
					//		//	parentdata.partAlternatePartId = this.partWithId.partAlternatePartId;
					//		//	parentdata.partId = this.partWithId.itemMasterId;
					//		//	parentdata.partdescription = this.partWithId.partDescription;
					//		//	parentdata.partNumber = this.partWithId.partNumber;
					//		//	parentdata.itemTypeId = this.partWithId.itemTypeId;
					//		//	parentdata.name = this.partWithId.name;
					//		//	parentdata.itemMasterId = this.partWithId.itemMasterId;
					//		//	parentdata.glAccountId = this.partWithId.glAccountId;
					//		//	parentdata.shortName = this.partWithId.shortName;
					//		//}

					//	})
				}
			};
		}
	}
	private ptnumberlistdata() {


		this.itemser.getPrtnumberslistList().subscribe(
			results => this.onptnmbersSuccessful(results[0]),
			//error => this.onDataLoadFailed(error)
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
		// debugger;

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
    ngOnChanges():void{
        
    }

    addNewCharges():void{
        //workFlow.Charges
    }

    addRow():void{
        var newRow = Object.assign({},this.row);
        //if(this.UpdateMode)
        //{
			newRow.workflowMaterialListId = "0";
            newRow.AllowEdit=true;
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
        //}
        this.workFlow.materialList.push(newRow);
    }

    deleteRow(index):void{
        this.workFlow.materialList[index].isDelete = true;
    }

    allowEdit(material:IMaterialList):boolean{
        return this.UpdateMode && !material.AllowEdit;
    }
    
    editRow(material:IMaterialList):void{
        material.AllowEdit=true;
    }


}