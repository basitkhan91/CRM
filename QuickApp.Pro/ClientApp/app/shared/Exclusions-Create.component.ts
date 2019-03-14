import { Component, Input, OnChanges, OnInit, EventEmitter , Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { ActionService } from "../Workflow/ActionService";
import { IExclusionEstimatedOccurance } from "../Workflow/ExclusionEstimatedOccurance";
import { IExclusion } from "../Workflow/Exclusion";
import { ItemMasterService } from "../services/itemMaster.service";

@Component({
    selector:'grd-exclusions',
    templateUrl:'./Exclusions-Create.component.html',
    styleUrls :['./Exclusions-Create.component.css']
    })
export class ExclusionsCreateComponent implements OnInit,OnChanges{
    @Input() workFlow : IWorkFlow;
    @Input() UpdateMode : boolean;
    @Output() notify : EventEmitter<IWorkFlow> = 
    new EventEmitter<IWorkFlow>();
    exclusionEstimatedOccurances:IExclusionEstimatedOccurance[];
	row: any;
	allPartnumbersInfo: any[] = [];
	itemclaColl: any[];
	partCollection: any[];
    errorMessage:string;
    
	constructor(private actionService: ActionService, private itemser:ItemMasterService) {
    }
    
	ngOnInit(): void {
		//debugger;
		console.log("nginit");
        this.row = this.workFlow.exclusions[0];
        this.actionService.GetExclusionEstimatedOccurance().subscribe(
            type => {
				this.exclusionEstimatedOccurances = type;
				console.log(type);
            },
            error => this.errorMessage = <any>error
		);
		this.ptnumberlistdata();
    }

    ngOnChanges():void{
        
    }

	addRow(): void{
		//debugger;
        var newRow = Object.assign({},this.row);
        //if(this.UpdateMode)
        //{
			newRow.workflowExclusionId = "0";
            newRow.AllowEdit=true;
			newRow.actionId = this.workFlow.ActionId;
			newRow.partDescription = "";
			newRow.estimtPercentOccurrance = "";
			newRow.extendedCost = "";
			newRow.partName = "";
			newRow.itemMasterId = "";
			newRow.quantity = "";
			newRow.unitCost = "";
			newRow.memo = "";
			newRow.partNumber = "";

			
       // }
        this.workFlow.exclusions.push(newRow);
    }

    deleteRow(index):void{
        this.workFlow.exclusions[index].isDelete=true;
    }

    allowEdit(exclussion:IExclusion):boolean{
        return this.UpdateMode && !exclussion.AllowEdit;
    }
    
    editRow(exclussion:IExclusion):void{
        exclussion.AllowEdit=true;
    }
	onPartSelect(event, measurement) {
		if (this.itemclaColl) {
			for (let i = 0; i < this.itemclaColl.length; i++) {
				if (event == this.itemclaColl[i][0].partName) {
					measurement.itemMasterId = this.itemclaColl[i][0].partId;
					measurement.partDescription = this.itemclaColl[i][0].description;
					measurement.partNumber = this.itemclaColl[i][0].partName;
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