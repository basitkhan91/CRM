import { Component, Input, OnChanges, OnInit, EventEmitter , Output } from "@angular/core";
import { IWorkFlow } from "../Workflow/WorkFlow";
import { IMeasurement } from "../Workflow/Measurement";
import { ItemMasterService } from "../services/itemMaster.service";
import { ActionService } from "../Workflow/ActionService";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeExpertiseService } from "../services/employeeexpertise.service";
import { ItemClassificationService } from "../services/item-classfication.service";
import { UnitOfMeasureService } from "../services/unitofmeasure.service";
import { ConditionService } from "../services/condition.service";
import { VendorService } from "../services/vendor.service";

@Component({
    selector:'grd-measurement',
    templateUrl:'./Measurement-Create.component.html',
    styleUrls :['./Measurement-Create.component.css']
    })
export class MeasurementCreateComponent implements OnInit,OnChanges{
	allPartnumbersInfo: any[]=[];
	itemclaColl: any[];
	partCollection: any[];
    @Input() workFlow : IWorkFlow;
    @Input() UpdateMode : boolean;
    @Output() notify : EventEmitter<IWorkFlow> = 
    new EventEmitter<IWorkFlow>();
    row:any;
	constructor(private actionService: ActionService, private route: ActivatedRoute, private router: Router, private expertiseService: EmployeeExpertiseService, public itemClassService: ItemClassificationService, public unitofmeasureService: UnitOfMeasureService, private conditionService: ConditionService,private itemser: ItemMasterService, private vendorService: VendorService) {
	}
	ngOnInit(): void {
		//debugger;
		this.row = this.workFlow.measurements[0]; 
		this.ptnumberlistdata();
    }
	
    ngOnChanges():void{
        
    }

    addRow():void{
        var newRow = Object.assign({},this.row);
        //if(this.UpdateMode)
        //{
			newRow.workflowMeasurementId = "0";
            newRow.AllowEdit=true;
			newRow.actionId = this.workFlow.ActionId;
			newRow.partNumber = "";
			newRow.sequence = "";
			newRow.stage = "";
			newRow.min = "";
			newRow.max = "";
			newRow.expected = "";
			newRow.memo = "";
		//}
		

		this.workFlow.measurements.push(newRow);
		this.ptnumberlistdata();
		
    }

    deleteRow(index):void{
        this.workFlow.measurements[index].isDelete=true;
    }
	onPartSelect(event, measurement) {
		if (this.itemclaColl) {
			for (let i = 0; i < this.itemclaColl.length; i++) {
				if (event == this.itemclaColl[i][0].partName) {
					measurement.itemMasterId = this.itemclaColl[i][0].partId;
					measurement.partDescription = this.itemclaColl[i][0].description;
				
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
allowEdit(measurement:any):boolean{
    return this.UpdateMode && !measurement.AllowEdit;
}

editRow(measurement:any):void{
    measurement.AllowEdit=true;
}
}