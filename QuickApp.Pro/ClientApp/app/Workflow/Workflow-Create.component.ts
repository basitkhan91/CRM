import { Component, OnInit, ViewChild, AfterViewInit, Input } from "@angular/core";
import { ActionService } from "./ActionService";
import { IAction } from "./Action";
import { IActionAttrbutes } from "./ActionAttributes";
import { IWorkFlow } from "./WorkFlow";
import { ICharges } from "./Charges";
import { IDirections } from "./Directions";
import { IEquipmentList } from "./EquipmentList";
import { IExpertise } from "./Expertise";
import { IMaterialList } from "./MaterialList";
import { IPublication } from "./Publication";
import { IExclusion } from "./Exclusion";
import { IMeasurement } from "./Measurement";
// import { ChargesCreateComponent } from "../shared/Charges-Create.component";
// import { DirectionsCreateComponent } from "../shared/Directions-Create.component";
// import { EquipmentCreateComponent } from "../shared/Equipment-Create.component";
// import { ExclusionsCreateComponent } from "../shared/Exclusions-Create.component";
// import { ExpertiseCreateComponent } from "../shared/Expertise-Create.component";
// import { MaterialListCreateComponent } from "../shared/Material-List-Create.component";
// import { MeasurementCreateComponent } from "../shared/Measurement-Create.component";
// import { PublicationCreateComponent } from "../shared/Publication-Create.component";
import { ActivatedRoute, Router } from "@angular/router";
//import { $ } from "protractor";
import { VirtualTimeScheduler } from "rxjs";
import { SelectItem } from "primeng/api";
import { VendorService } from "../services/vendor.service";
import { EmployeeExpertiseService } from "../services/employeeexpertise.service";
import { WorkScopeService } from "../services/workscope.service";
import { CustomerService } from "../services/customer.service";
import { ItemClassificationService } from "../services/item-classfication.service";
import { CurrencyService } from "../services/currency.service";
import { UnitOfMeasureService } from "../services/unitofmeasure.service";
import { ConditionService } from "../services/condition.service";
import { WorkFlowtService } from "../services/workflow.service";
import { ItemMasterService } from "../services/itemMaster.service";

@Component({
	selector: 'wf-create',
	templateUrl: './workflow-Create.component.html',
	styleUrls: ['./workflow-Create.component.css']
})
export class WorkflowCreateTestComponent implements OnInit, AfterViewInit {
	UpdateMode: boolean;
	workFlow: any;
	workFlowList: any[];
	actions: IAction[];
	actionAttributes: IActionAttrbutes[];

	actionList: IAction[];
	currentActionId: string = "0";
	selectedActionId: number;
	selectedActionAttributeId: number;

	errorMessage: string;
	showActionAttribute: boolean = false;
	showMainPage: boolean = false;
	actionAttributesList = [];
	selectedItems = [];
	dropdownSettings = {};
	newAction: IAction;
	workFlowActions: IAction[];
	sourceWorkFlow: any = {}; employeeExplist: any[] = [];
	materailTypeList: any[] = [];
	allCustomers: any[] = [];
	customerNamecoll: any[] = [];
	customerNames: any[] = [];
	percentreplcae: boolean;
	ispercent: boolean;
	isFixed: boolean;
	isFlat: boolean;
	isCalculate: boolean;
	allCurrencyData: any[] = [];
	worksScopeCollection: any[] = [];
	partWithId: any;
	partCollection: any[] = [];
	itemclaColl: any[] = [];
	/** workflow-create ctor */
	// Variables Declaration

	workflowCharges: any[][];
	workflowEquipment: any[][];
	workflowMaterails: any[][];
	workflowExpertise: any[][];
	itemClassInfo: any[][];
	allUomdata: any[] = [];
	allconditioninfo: any[] = [];
	allPartDetails: any[] = [];
	allPartnumbersInfo: any[] = [];
	//sourceWorkFlow: any = {};
	workflowactionAttributes: any[] = [];
	//actionAttributes: any[] = [];
	workflowActions: any[] = [];
	equipmentListObj: any[] = [];
	expertiseListObj: any[] = [];
	expertiseList: boolean;

	directionListObj: any[] = [];
	directionList: boolean;

	exclusionListObj: any[] = [];
	exclusionList: boolean;
	equipmentList: boolean;
	partListData: any[] = [];
	chargeList: boolean;
	selectedActionAttribute: any;
	materialList: boolean;
	materialListObj: any[] = [];
	chargeListObj: any[] = [];
	/** workflow-create ctor */
	cars: SelectItem[];
	selectedValues: any[] = [];
	isWorkFlowEdit: boolean = false;
	selectedWorkflow: any;
	workflowActionAttribues: any[] = [];//For Tabs
	loadedDDs: any = {};
	selectedActionAttributes: any[] = [];//For DropDown
	actionValue: any;//dropdown selected value

	addedActionIds: number[] = [];
	selectedAction: any;//selected tab value

	actionsDD: any[] = [];
	actionsAttributesDD: SelectItem[] = [];
	chargesDL: any[] = [];
	directionsDL: any[] = [];
	equipmentDL: any[] = [];
	exclusionsDL: any[] = [];
	expertiseDL: any[] = [];
	materialListDL: any[] = [];
	measurementsDL: any[] = [];
	publicationsDL: any[] = [];

	actionAttributeTabs: any[] = [
		{ visible: false, selected: false, label: "Material List" },
		{ visible: false, selected: false, label: "Charges" },
		{ visible: false, selected: false, label: "Equipment" },
		{ visible: false, selected: false, label: "Expertise" },
		{ visible: false, selected: false, label: "Directions" },
		{ visible: false, selected: false, label: "Exclusions" },
		{ visible: false, selected: false, label: "Publications" },
		{ visible: false, selected: false, label: "Measurements" }
	];


	constructor(private actionService: ActionService, private route: ActivatedRoute, private router: Router, private expertiseService: EmployeeExpertiseService, private cusservice: CustomerService, public workscopeService: WorkScopeService, public currencyService: CurrencyService, public itemClassService: ItemClassificationService, public unitofmeasureService: UnitOfMeasureService, private conditionService: ConditionService, private _workflowService: WorkFlowtService, private itemser: ItemMasterService, private vendorService: VendorService) {
	}

	GetChildData(): void {

	}

	ngAfterViewInit() {
		// document.getElementById('tab_' + this.workFlowActions[0].Id);
	}

	setSelectedItems(workFlow: any): void {
		//debugger;
		this.selectedItems = [];
		if (workFlow.charges != undefined && workFlow.charges.length > 0) {
			var chargesItem = this.actionAttributes.filter(x => x.Name == "Charges")[0];
			this.selectedItems.push(chargesItem);
		}
		if (workFlow.directions != undefined && workFlow.directions.length > 0) {
			var directionsItem = this.actionAttributes.filter(x => x.Name == "Directions")[0];
			this.selectedItems.push(directionsItem);
		}
		if (workFlow.equipments != undefined && workFlow.equipments.length > 0) {
			var equipmentItem = this.actionAttributes.filter(x => x.Name == "Equipment")[0];
			this.selectedItems.push(equipmentItem);
		}
		if (workFlow.exclusions != undefined && workFlow.exclusions.length > 0) {
			var exclusionsItem = this.actionAttributes.filter(x => x.Name == "Exclusions")[0];
			this.selectedItems.push(exclusionsItem);
		}
		if (workFlow.expertise != undefined && workFlow.expertise.length > 0) {
			var expertiseItem = this.actionAttributes.filter(x => x.Name == "Expertise")[0];
			this.selectedItems.push(expertiseItem);
		}
		if (workFlow.materialList != undefined && workFlow.materialList.length > 0) {
			var materialItem = this.actionAttributes.filter(x => x.Name == "Material List")[0];
			this.selectedItems.push(materialItem);
		}
		if (workFlow.measurements != undefined && workFlow.measurements.length > 0) {
			var measurementsItem = this.actionAttributes.filter(x => x.Name == "Measurements")[0];
			this.selectedItems.push(measurementsItem);
		}
		if (workFlow.publication != undefined && workFlow.publication.length > 0) {
			var publicationItem = this.actionAttributes.filter(x => x.Name == "Publication")[0];
			this.selectedItems.push(publicationItem);
		}
		this.workFlow.selectedItems = this.selectedItems;

	}
	updateWorkFlowId: string;
	updateMode(): void {
		
		this.actionService.getWorkFlow(this.updateWorkFlowId).subscribe(

			workFlow => {
				console.log(workFlow);
				this.actionService.getActions().subscribe(
					actions => {
						this.actionService.getActionAttributes().subscribe(
							actionAttributes => {
								this.workFlowList = [];
								var ids = [];
								var actionIds = [];
								if (workFlow[0].charges != undefined) {

									 actionIds = workFlow[0].charges.map(item => item.actionId)
										.filter((value, index, self) => self.indexOf(value) === index);
								}
								if (workFlow[0].directions!=undefined) {
									ids = workFlow[0].directions.map(item => item.actionId)
										.filter((value, index, self) => self.indexOf(value) === index);
								}
								if (workFlow[0].equipments != undefined) {
									actionIds = actionIds.concat(ids);
									ids = workFlow[0].equipments.map(item => item.actionId)
										.filter((value, index, self) => self.indexOf(value) === index);
								}
								if (workFlow[0].exclusions != undefined) {
									actionIds = actionIds.concat(ids);
									ids = workFlow[0].exclusions.map(item => item.actionId)
										.filter((value, index, self) => self.indexOf(value) === index);
								}
								if (workFlow[0].expertise != undefined) {
									actionIds = actionIds.concat(ids);
									ids = workFlow[0].expertise.map(item => item.actionId)
										.filter((value, index, self) => self.indexOf(value) === index);
								}
								if (workFlow[0].materialList != undefined) {
									actionIds = actionIds.concat(ids);
									ids = workFlow[0].materialList.map(item => item.actionId)
										.filter((value, index, self) => self.indexOf(value) === index);
								}
								if (workFlow[0].measurements != undefined) {
									actionIds = actionIds.concat(ids);
									ids = workFlow[0].measurements.map(item => item.actionId)
										.filter((value, index, self) => self.indexOf(value) === index);
								}
								if (workFlow[0].publication != undefined) {
									actionIds = actionIds.concat(ids);
									ids = workFlow[0].publication.map(item => item.actionId)
										.filter((value, index, self) => self.indexOf(value) === index);
								}
								
									actionIds = actionIds.concat(ids);

									actionIds = actionIds.map(item => item)
										.filter((value, index, self) => self.indexOf(value) === index);
								

								actionIds = actionIds.sort();
								this.workFlowActions = [];
								for (let actId of actionIds) {
									var action = actions.filter(x => x.actionId == actId)[0];
									this.workFlowActions.push(action);
									let wf = this.GetWorkFlow();
									wf.ActionId = action.actionId;
									wf.ActionName = action.description;
									wf.selectedItems = [];
									if (this.UpdateMode) {
										wf.workflowId = this.updateWorkFlowId;
										//charge[0].ActionId = this.currentActionId;
										//charge[0].WorkFlowId = this.updateWorkFlowId;

									}

									if (workFlow[0].charges != undefined && workFlow[0].charges.length > 0) {
										var charges = workFlow[0].charges.filter(charge => charge.actionId == action.actionId);
										wf.charges = charges;
									}
									if (workFlow[0].directions != undefined && workFlow[0].directions.length > 0) {
										var direction = workFlow[0].directions.filter(direction => direction.actionId == action.actionId);
										wf.directions = direction;
									}
									if (workFlow[0].equipments != undefined && workFlow[0].equipments.length > 0) {
										var equipment = workFlow[0].equipments.filter(equipment => equipment.actionId == action.actionId);
										wf.equipments = equipment;
									}
									if (workFlow[0].exclusions != undefined && workFlow[0].exclusions.length > 0) {
										var exclusion = workFlow[0].exclusions.filter(exclusion => exclusion.actionId == action.actionId);
										wf.exclusions = exclusion;
									}
									if (workFlow[0].expertise != undefined && workFlow[0].expertise.length > 0) {
										var expertise = workFlow[0].expertise.filter(expertise => expertise.actionId == action.actionId);
										wf.expertise = expertise;
									}
									if (workFlow[0].materialList != undefined && workFlow[0].materialList.length > 0) {
										var material = workFlow[0].materialList.filter(material => material.actionId == action.actionId);
										wf.materialList = material;
									}
									if (workFlow[0].measurements != undefined && workFlow[0].measurements.length > 0) {
										var measurement = workFlow[0].measurements.filter(measurement => measurement.actionId == action.actionId);
										wf.measurements = measurement;
									}
									if (workFlow[0].publication != undefined && workFlow[0].publication.length > 0) {
										var publication = workFlow[0].publication.filter(publication => publication.actionId == action.actionId);
										wf.publication = publication;
									}

									this.workFlowList.push(wf);

								}
								this.workFlow = this.workFlowList[0];
								this.setSelectedItems(this.workFlow);
								this.showMainPage = true;
								console.log();
							},
							error => this.errorMessage = <any>error
						);
					},
					error => this.errorMessage = <any>error
				);

			},
			error => this.errorMessage = <any>error
		);
	}

	ngOnInit(): void {
		
		this.loadCurrencyData();
		//this.loadCurrencyData();
		this.loadWorkScopedata();
		this.loadItemClassData();
		this.loadPartData();
		this.ptnumberlistdata();
		if (!this.sourceWorkFlow.workFlowId) {
			this.sourceWorkFlow.workOrderNumber = 'Creating';
		}
		this.getMaterialType();
		this.loadcustomerData();
		this.loadExpertiseData();
		//this.router.events.subscribe((res) => {
		if (this._workflowService.enableUpdateMode == true && !this.UpdateMode) {
			//debugger;
			if (this._workflowService.listCollection) {
				this.sourceWorkFlow = this._workflowService.listCollection.im;
				if (this.sourceWorkFlow.isCalculatedBERThreshold == true) {
					this.isCalculatedBERThreshold('calculate');
				}
				else {
					this.isCalculatedBERThreshold('flat');
				}
				if (this.sourceWorkFlow.isFixedAmount == true) {
					this.isFixedcheck('fixed');
				}
				if (this.sourceWorkFlow.isPercentageOfNew == true) {
					this.isFixedcheck('percentage');
				}
				if (this.sourceWorkFlow.isPercentageOfReplacement == true) {
					this.isFixedcheck('percentreplace');
				}
				this.sourceWorkFlow.workflowExpirationDate = new Date(this._workflowService.listCollection.im.workflowExpirationDate);
				this.sourceWorkFlow.partNumber = this._workflowService.listCollection.partNumber;
				//this.sourceWorkFlow.fixedAmount1 = this.sourceWorkFlow.fixedAmount;
				if (this.sourceWorkFlow.costOfNew && this.sourceWorkFlow.percentageOfNew) {
					this.onPercentOfNew(this.sourceWorkFlow.costOfNew, this.sourceWorkFlow.percentageOfNew);
				}
				if (this.sourceWorkFlow.costOfReplacement && this.sourceWorkFlow.percentageOfReplacement) {
					this.onPercentOfReplcaement(this.sourceWorkFlow.costOfReplacement, this.sourceWorkFlow.percentageOfReplacement);
				}
				this.updateWorkFlowId = this.sourceWorkFlow.workflowId;
				this.UpdateMode = true;
				this.updateMode();
			}
		}
		//});

		this.newAction = { Id: "0", Name: "" };
		this.getAllActions();
		this.actionService.getActionAttributes().subscribe(
			actionAttributes => {
				this.actionAttributes = [];

				for (let attr of actionAttributes) {
					this.actionAttributes.push({ Id: attr.actionAttributeId, Name: attr.description })
				}
			},
			error => this.errorMessage = <any>error
		);

		this.dropdownSettings = {
			singleSelection: false,
			idField: 'Id',
			textField: 'Name',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 1,
			allowSearchFilter: false
		};

	}
	getActionsDD() {
		this._workflowService.getWorkFlowActions().subscribe((data: any) => {
			if (data && data[0].length > 0) {
				this.actionsDD = [{ actionId: "", description: "" }].concat(data[0]);
			}
			this.loadedDDs["actions"] = true;
			if (this.loadedDDs["actionAttributes"])
				this.getSelectedWorkflowActions();
		});
	}
	getMaterialType() {
		this._workflowService.getMaterialType().subscribe(data => { this.materailTypeList = data; });
	}
	private loadExpertiseData() {


		this.expertiseService.getWorkFlows().subscribe(data => { this.employeeExplist = data; });

	}
	getActionAttributesDD() {
		this._workflowService.getActionAttributes().subscribe((data: any) => {
			if (data && data[0].length > 0) {
				let _attrList: any[] = [];
				for (let i = 0; i < data[0].length; i++)
					_attrList.push({ value: data[0][i].actionAttributeId, label: data[0][i].description });
				this.actionsAttributesDD = _attrList;

				this.actionsAttributesDD.forEach(obj => {
					this.actionAttributeTabs.forEach((tab) => {
						if (tab.label == obj["label"])
							tab["value"] = obj["value"];
					});
				});
			}
			this.loadedDDs["actionAttributes"] = true;
			if (this.loadedDDs["actions"])
				this.getSelectedWorkflowActions();
		});
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
	public isCalculatedBERThreshold(event) {
		if (event == 'calculate') {
			this.isCalculate = true;
			this.isFlat = false;
		} if (event == 'flat') {
			this.isCalculate = false;
			this.isFlat = true;
		}
	}

	private isFixedcheck(event) {
		if (event == 'fixed') {
			this.isFixed = true;
			this.ispercent = false;
			this.percentreplcae = false;
			this.sourceWorkFlow.isFixedAmount = true;
			this.sourceWorkFlow.isPercentageofNew = false;
			this.sourceWorkFlow.isPercentageOfReplacement = false;
		}
		if (event == 'percentage') {
			this.isFixed = false;
			this.ispercent = true;
			this.percentreplcae = false;
			this.sourceWorkFlow.isFixedAmount = false;
			this.sourceWorkFlow.isPercentageofNew = true;
			this.sourceWorkFlow.isPercentageOfReplacement = false;
		}
		if (event == 'percentreplace') {
			this.isFixed = false;
			this.ispercent = false;
			this.percentreplcae = true;
			this.sourceWorkFlow.isFixedAmount = false;
			this.sourceWorkFlow.isPercentageofNew = false;
			this.sourceWorkFlow.isPercentageOfReplacement = true;
		}
	}

	private loadWorkScopedata() {

		this.workscopeService.getWorkScopeList().subscribe(
			data => { this.worksScopeCollection = data[0] })

	}
	private loadCurrencyData() {
		// debugger;


		this.currencyService.getCurrencyList().subscribe(currencydata => {
			this.allCurrencyData = currencydata[0];
		})


	}

	onCustomerNameselected(event) //Customer Ship Address Data
	{
		//debugger;
		for (let i = 0; i < this.customerNamecoll.length; i++) {
			if (event == this.customerNamecoll[i][0].name) {

				this.sourceWorkFlow.customerId = this.customerNamecoll[i][0].customerId;
				//this.cusservice.getCustomerShipAddressGet(this.customerNamecoll[i][0].customerId).subscribe(returnedcusdata => {
				//	this.spiltshipmentData = returnedcusdata[0];
				//	partChildList["addressData"] = returnedcusdata[0];
				//});


			}

		}

	}
	filterNames(event) {

		this.customerNames = [];
		if (this.allCustomers) {
			if (this.allCustomers.length > 0) {
				for (let i = 0; i < this.allCustomers.length; i++) {
					let name = this.allCustomers[i].name;
					if (event.query) {
						if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
							this.customerNamecoll.push([{
								"customerId": this.allCustomers[i].customerId,
								"name": name
							}]),
								this.customerNames.push(name);
						}
					}
					else {
						//if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
						this.customerNamecoll.push([{
							"customerId": this.allCustomers[i].customerId,
							"name": name
						}]),
							this.customerNames.push(name);
						//}
					}
				}
			}
		}
	}

	private loadcustomerData() {


		this.cusservice.getWorkFlows().subscribe(data => { this.allCustomers = data[0] });
	}
	onPartSelect(event) {
		if (this.itemclaColl) {
			for (let i = 0; i < this.itemclaColl.length; i++) {
				if (event == this.itemclaColl[i][0].partName) {
					this.sourceWorkFlow.itemMasterId = this.itemclaColl[i][0].partId;
					this.sourceWorkFlow.partNumberDescription = this.itemclaColl[i][0].description;
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
	partnmId(parentdata, event) {
		//debugger;

		if (this.itemclaColl) {
			for (let i = 0; i < this.itemclaColl.length; i++) {
				if (event == this.itemclaColl[i][0].partName) {
					this.sourceWorkFlow.itemMasterId = this.itemclaColl[i][0].partId;
					//this.allSelectedParts.push(this.itemclaColl[i][0].partId);
					//this.selectedActionName = event;
					this.partWithId = [];

					this.vendorService.getPartDetailsWithidForSinglePart(this.sourceWorkFlow.itemMasterId).subscribe(
						data1 => {
							if (data1[0][0]) {
								this.partWithId = data1[0][0];
								parentdata.partAlternatePartId = this.partWithId.partAlternatePartId;
								parentdata.partId = this.partWithId.itemMasterId;
								parentdata.partdescription = this.partWithId.partDescription;
								parentdata.partNumber = this.partWithId.partNumber;
								parentdata.itemTypeId = this.partWithId.itemTypeId;
								parentdata.name = this.partWithId.name;
								parentdata.itemMasterId = this.partWithId.itemMasterId;
								parentdata.glAccountId = this.partWithId.glAccountId;
								parentdata.shortName = this.partWithId.shortName;
							}

						})
				}
			};
		}
	}

	//Get Business Data 
	getSelectedWorkflowActions() {
		if (this.isWorkFlowEdit) {
			this._workflowService.getWorkflowActionAttributes(this.selectedWorkflow["workflowId"]).subscribe(data => {
				if (data && data[0].length > 0) {
					this.workflowActions = data[0];
					this.addedActionIds = this.workflowActions.map(action => action["actionId"]);
				}
			});
		}
		this.workflowActions = [
			{ workflowId: "", actionId: 2, workflowActionAttributeIds: "11,12,13" },
			{ workflowId: "", actionId: 3, workflowActionAttributeIds: "14,15,16" },
			{ workflowId: "", actionId: 4, workflowActionAttributeIds: "16,17,36" }
		];
		this.addedActionIds = [2, 3, 4];
		// select First Action
		this.displaySelectedAction(this.workflowActions[0]);
	}
	//On Action Dropdown value change
	onActionValueChange(selectedvalue) {
		if (Number(selectedvalue.target.value) > 0) {
			this.selectedActionAttributes = [];
			let indx = this.addedActionIds.indexOf(Number(selectedvalue.target.value));
			if (indx >= 0)
				this.selectedActionAttributes = this.workflowActions[indx].workflowActionAttributeIds.split(",");
		} else {
			this.selectedActionAttributes = [];
		}
	}
	//one of the Actions Tab Click
	onActionSelect(action) {
		let selAction = this.workflowActions.find(obj => obj.actionId == action.actionId);
		if (selAction)
			this.displaySelectedAction(selAction);
	}

	//ex: accepted format -> selAction = { workflowId: "1", actionId: 2, workflowActionAttributeIds: "11,12,13" }
	displaySelectedAction(selAction, loadAttrData = false) {
		//Display Action Label
		let action = this.actionsDD.find(action => action["actionId"] == selAction["actionId"]);
		if (this.selectedAction != action) {
			this.selectedAction = action;
		}

		//Hide all attribute tabs
		this.actionAttributeTabs.forEach(attr => { attr.visible = false; attr.selected = false; });
		//Display Selected Attribute Tabs
		selAction["workflowActionAttributeIds"].split(",").forEach(attr_id => {
			this.actionAttributeTabs.forEach(attr => {
				if (attr["value"] == attr_id)
					attr.visible = true;
			});
		});
		let selAttr = this.actionAttributeTabs.find(attr => attr.visible);
		if (selAttr) selAttr.selected = true;
		if (loadAttrData) {
			if (this.isWorkFlowEdit) {

			} else {

			}
		}
	}

	// On Add Button Click
	addActionAttributes() {
		if (this.actionValue && this.actionValue != "" && this.selectedActionAttributes && this.selectedActionAttributes.length > 0) {
			let currAction = { workflowId: "", actionId: Number(this.actionValue), workflowActionAttributeIds: this.selectedActionAttributes.join(",") }
			let selAction = this.workflowActions.find(obj => obj.actionId == this.actionValue)
			if (selAction) {
				
				selAction["workflowActionAttributeIds"] = currAction["workflowActionAttributeIds"]
			} else {
				this.workflowActions.push(currAction);
				this.addedActionIds.push(Number(this.actionValue));
				selAction = currAction;
			}
			this.displaySelectedAction(selAction);
		}

	}
    onPercentOfNew(myValue, percentValue) {
        this.sourceWorkFlow.percentOfNew = "";
        if (myValue && percentValue) {
            let afterpercent = myValue / 100;
            this.sourceWorkFlow.percentOfNew = afterpercent * percentValue;
            
        }
	}
	onPercentOfReplcaement(myValue, percentValue) {
        this.sourceWorkFlow.percentOfReplaceMent = "";
        if (myValue && percentValue) {
            let afterpercent = myValue / 100;
            this.sourceWorkFlow.percentOfReplaceMent = afterpercent * percentValue;
          
        }
	}
	private defualtChargesListobj() {
		let partListObj = {
			//ifSplitShip: false, //partListObj: this.allPartDetails, //itemTypeId: ''
			type: '', qty: '', unitcost: '', extcost: '', actionId: ''
		}
		return partListObj;
	}

	private defualtDrectObj() {
		let partListObj = { //ifSplitShip: false, //partListObj: this.allPartDetails, //itemTypeId: ''
			action: '', directionName: '', sequence: '', memo: '',
		}
		return partListObj;
	}

	private defualtEquipmentObj() {
		let partListObj = { //ifSplitShip: false, //partListObj: this.allPartDetails, //itemTypeId: ''
			partNumber: '', partDescription: '', itemClassification: '', qty: '',
		}
		return partListObj;
	}

	private defualtExclsuionObj() {
		let partListObj = { //ifSplitShip: false, //partListObj: this.allPartDetails, //itemTypeId: ''
			epn: '', epndescription: '', cost: '', notes: '',
		}
		return partListObj;
	}

	private defualtExpertiseObj() {
		let partListObj = {
			//ifSplitShip: false, //partListObj: this.allPartDetails, //itemTypeId: ''
			expertiseType: '', estimatedHours: '', standardRate: '', estimatedRate: '',
		}
		return partListObj;
	}

	private defualtMaterialListobj() {
		let partListObj = {
			//ifSplitShip: false, //partListObj: this.allPartDetails, //itemTypeId: ''
			partNumber: '', partDescription: '', itemClassification: '', qty: '', uom: '', condition: '',
			unitcost: '', extcost: '', provision: '', deffered: '', figureId: '', actionId: ''
		}
		return partListObj;
	}

	getWorkFlowMaterial() {
		this._workflowService.getWorkFlowMaterial().subscribe(data => {
			this.workflowMaterails = data;


		});

	}
	getWorkFlowChargeList() {
		this._workflowService.getChargeList().subscribe(data => {
			this.workflowCharges = data;


		});

	}

	getWorkFlowEquipment() {
		this._workflowService.getWorkFlowEquipmentList().subscribe(data => {
			this.workflowEquipment = data;


		});

	}

	getWorkFlowExpertise() {
		this._workflowService.getWorkflowExpertise().subscribe(data => {
			this.workflowExpertise = data;


		});

	}
	private ptnumberlistdata() {


		this.itemser.getPrtnumberslistList().subscribe(
			results => this.onptnmbersSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	private onptnmbersSuccessful(allWorkFlows: any[]) {



		this.allPartnumbersInfo = allWorkFlows;



	}
	private loadPartData() {


		this.vendorService.getPartDetails().subscribe(
			data => {
				this.allPartDetails = data[0];
				this.loadPartListData();
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
			this.allconditioninfo = data[0];
		})


	}
	private loadUOMData() {


		this.unitofmeasureService.getUnitOfMeasureList().subscribe(uomdata => {
			this.allUomdata = uomdata[0];
		})


	}
	private loadItemClassData() {


		this.itemClassService.getWorkFlows().subscribe(data => { this.itemClassInfo = data });

	}
	private loadPartListData() {
		//if (this.workFlowtService.purchasepartcollection) {
		//	if (this.workFlowtService.purchasepartcollection.length > 0) {
		//		this.unitofmeasureService.getUnitOfMeasureList().subscribe(uomdata => {
		//			this.allUomdata = uomdata[0];
		//		});
		//	}
		//	else {
		//		let parentObj = this.defaultPartListObj(true);
		//		//parentObj["childList"] = [this.emptyPartListObj(false)];
		//		this.partListData = [parentObj];
		//	}
		//} else {
		//	let parentObj = this.defaultPartListObj(true);
		//	//parentObj["childList"] = [this.emptyPartListObj(false)];
		//	this.partListData = [parentObj];
		//}
	}
	private onDataLoadFailed(error: any) {


	}

	getAllActions(): void {
		this.actionService.getActions().subscribe(
			actions => {
				//this.actions = actions;
				this.actions = [];
				for (let attr of actions) {
					this.actions.push({ Id: attr.actionId, Name: attr.description })
				}
			},
			error => this.errorMessage = <any>error
		);
	}

	setCurrentPanel(panelId): void {
		var list = document.getElementsByClassName('pan');
		for (var i = 0; i < list.length; i++) {
			list[i].classList.remove('active');
			list[i].classList.remove('in');
		}
		var elem = document.getElementById('tab' + panelId);
		if (elem != null) {
			document.getElementById('tab' + panelId).classList.add('in');
			document.getElementById('tab' + panelId).classList.add('active');
		}
	}

	SetCurrectTab(workFlowId): void {
		var workflow = this.workFlowList[0];
		var list = document.getElementsByClassName('actrmv');
		for (var i = 0; i < list.length; i++) {
			list[i].classList.remove('active');
		}
		document.getElementById('tab_' + workFlowId).classList.add('active');
		this.workFlowList.forEach(function (value, index) {
			//debugger;
			if (value.ActionId == workFlowId) {
				workflow = value;
			}
		});

		for (var i = 0; i < this.workFlowList.length; i++) {
			//debugger;
			if (workflow.ActionId == this.workFlowList[i].ActionId) {
				this.workFlowList[i] = workflow;
			}
		}
		this.onActionChange();
		this.selectedItems = workflow.selectedItems;
		this.currentActionId = workflow.ActionId;
		this.workFlow = workflow;
		this.setSelectedItems(this.workFlow);
	}

	AddActionAttribute(): void {
		//debugger;
		if (this.selectedItems.length > 0) {

			if (this.workFlowList != undefined && this.workFlowList.length > 0) {
				var currentWorkFlow = this.GetWorkFlow();
				var isWorkFlowExist = false;
				// var attributeArray = [
				//     { "Name" : "Charges", Event:this.GetCharges},
				//     { "Name" : "Directions", Event:this.GetDirections},
				//     { "Name" : "Equipments", Event:this.GetEquipmentList},
				//     { "Name" : "Expertise", Event:this.GetExpertise},
				//     { "Name" : "MaterialList", Event:this.GetMaterialList},
				//     { "Name" : "Publication", Event:this.GetPublication},
				//     { "Name" : "Exclusions", Event:this.GetExclusions},
				//     { "Name" : "Measurements", Event:this.GetMeasurements}];

				// for(let workflow of this.workFlowList)
				// {
				//     if (workflow.ActionId == this.currentActionId) {
				//         isWorkFlowExist = true;
				//         for(let item of this.selectedItems)
				//         {
				//             for(let attribute of attributeArray)
				//             {

				//                 if (item.Name == attribute.Name && Object.keys(workflow)[attribute.Name]  == undefined) {
				//                     Object.keys(workflow)[attribute.Name] = attribute.Event();
				//                     break;
				//                 }
				//             }
				//         }
				//         currentWorkFlow.selectedItems = this.selectedItems;
				//         this.workFlowList[i] = currentWorkFlow;
				//     }
				// }


				for (var i = 0; i < this.workFlowList.length; i++) {
					//debugger;
					if (this.workFlowList[i].ActionId == currentWorkFlow.ActionId) {
						isWorkFlowExist = true;
						for (var j = 0; j < this.selectedItems.length; j++) {
							if (this.selectedItems[j].Name == 'Charges' && (this.workFlowList[i].charges == undefined || (this.workFlowList[i].charges != undefined && this.workFlowList[i].charges.length == 0))) {
								var charge: any[];
								charge = this.GetCharges();
								if (this.UpdateMode) {
									charge[0].actionId = this.currentActionId;
									charge[0].workflowId = this.updateWorkFlowId;
								}
								this.workFlowList[i].charges = charge;
							}
							if (this.selectedItems[j].Name == 'Directions' && (this.workFlowList[i].directions == undefined || (this.workFlowList[i].directions != undefined && this.workFlowList[i].directions.length == 0))) {
								var direction: any[];
								direction = this.GetDirections();
								if (this.UpdateMode) {
									direction[0].actionId = this.currentActionId;
									direction[0].workflowId = this.updateWorkFlowId;
								}
								this.workFlowList[i].directions = direction;
							}
							if (this.selectedItems[j].Name == 'Equipment' && (this.workFlowList[i].equipments == undefined || (this.workFlowList[i].equipments != undefined && this.workFlowList[i].equipments.length == 0))) {
								var equipment: any[];
								equipment = this.GetEquipmentList();
								if (this.UpdateMode) {
									equipment[0].actionId = this.currentActionId;
									equipment[0].workflowId = this.updateWorkFlowId;
								}
								this.workFlowList[i].equipments = equipment;


							}
							if (this.selectedItems[j].Name == 'Expertise' && (this.workFlowList[i].expertise == undefined || (this.workFlowList[i].expertise != undefined && this.workFlowList[i].expertise.length == 0))) {
								var expertise: any[];
								expertise = this.GetExpertise();
								if (this.UpdateMode) {
									expertise[0].actionId = this.currentActionId;
									expertise[0].workflowId = this.updateWorkFlowId;
								}
								this.workFlowList[i].expertise = expertise;
							}
							if (this.selectedItems[j].Name == 'Material List' && (this.workFlowList[i].materialList == undefined || (this.workFlowList[i].materialList != undefined && this.workFlowList[i].materialList.length == 0))) {
								var material: any[];
								material = this.GetMaterialList();
								if (this.UpdateMode) {
									material[0].actionId = this.currentActionId;
									material[0].workflowId = this.updateWorkFlowId;
								}
								this.workFlowList[i].materialList = material;


							}
							if (this.selectedItems[j].Name == 'Publication' && (this.workFlowList[i].publication == undefined || (this.workFlowList[i].publication != undefined && this.workFlowList[i].publication.length == 0))) {
								var publication: any[];
								publication = this.GetPublication();
								if (this.UpdateMode) {
									publication[0].actionId = this.currentActionId;
									publication[0].workflowId = this.updateWorkFlowId;
								}
								this.workFlowList[i].publication = publication;

							}
							if (this.selectedItems[j].Name == 'Exclusions' && (this.workFlowList[i].exclusions == undefined || (this.workFlowList[i].exclusions != undefined && this.workFlowList[i].exclusions.length == 0))) {
								//debugger;
								var exclusion: any[];
								exclusion = this.GetExclusions();
								if (this.UpdateMode) {
									exclusion[0].actionId = this.currentActionId;
									exclusion[0].workflowId = this.updateWorkFlowId;
								}
								this.workFlowList[i].exclusions = exclusion;

							}
							if (this.selectedItems[j].Name == 'Measurements' && (this.workFlowList[i].measurements == undefined || (this.workFlowList[i].measurements != undefined && this.workFlowList[i].measurements.length == 0))) {
								var measurement: any[];
								measurement = this.GetMeasurements();
								if (this.UpdateMode) {
									measurement[0].actionId = this.currentActionId;
									measurement[0].workflowId = this.updateWorkFlowId;
								}
								this.workFlowList[i].measurements = measurement;

							}
						}

						// TODO :  need to write delete action code here



						this.workFlowList[i].selectedItems = this.selectedItems;
						//this.workFlowList[i] = currentWorkFlow;
					}
				}

				if (!isWorkFlowExist) {
					for (var i = 0; i < this.selectedItems.length; i++) {
						if (this.selectedItems[i].Name == 'Charges') {
							var charge: any[];
							charge = this.GetCharges();
							if (this.UpdateMode) {
								charge[0].actionId = this.currentActionId;
								charge[0].workflowId = this.updateWorkFlowId;
							}
							currentWorkFlow.charges = charge;
						}
						if (this.selectedItems[i].Name == 'Directions') {
							var direction: any[];
							direction = this.GetDirections();
							if (this.UpdateMode) {
								direction[0].actionId = this.currentActionId;
								direction[0].workflowId = this.updateWorkFlowId;
							}
							currentWorkFlow.directions = direction
						}
						if (this.selectedItems[i].Name == 'Equipment') {
							var equipment: any[];
							equipment = this.GetEquipmentList();
							if (this.UpdateMode) {
								equipment[0].actionId = this.currentActionId;
								equipment[0].workflowId = this.updateWorkFlowId;
							}
							currentWorkFlow.equipments = equipment;
						}
						if (this.selectedItems[i].Name == 'Expertise') {
							var expertise: any[];
							expertise = this.GetExpertise();
							if (this.UpdateMode) {
								expertise[0].actionId = this.currentActionId;
								expertise[0].workflowId = this.updateWorkFlowId;
							}
							currentWorkFlow.expertise = expertise;
						}
						if (this.selectedItems[i].Name == 'Material List') {
							var material: any[];
							material = this.GetMaterialList();
							if (this.UpdateMode) {
								material[0].actionId = this.currentActionId;
								material[0].workflowId = this.updateWorkFlowId;
							}
							currentWorkFlow.materialList = material;
						}
						if (this.selectedItems[i].Name == 'Publications') {
							var publication: any[];
							publication = this.GetPublication();
							if (this.UpdateMode) {
								publication[0].actionId = this.currentActionId;
								publication[0].workflowId = this.updateWorkFlowId;
							}

							currentWorkFlow.publication = publication;
						}
						if (this.selectedItems[i].Name == 'Exclusions') {
							var exclusion: any[];
							exclusion = this.GetExclusions();
							if (this.UpdateMode) {
								exclusion[0].actionId = this.currentActionId;
								exclusion[0].workflowId = this.updateWorkFlowId;
							}
							currentWorkFlow.exclusions = exclusion;
						}
						if (this.selectedItems[i].Name == 'Measurements') {
							var measurement: any[];
							measurement = this.GetMeasurements();
							if (this.UpdateMode) {
								measurement[0].actionId = this.currentActionId;
								measurement[0].workflowId = this.updateWorkFlowId;
							}
							currentWorkFlow.measurements = measurement;
						}

					}
					currentWorkFlow.selectedItems = this.selectedItems;
					this.workFlowList.push(currentWorkFlow);
				}
			}
			else {
				this.workFlowList = [];
				var currentWorkFlow = this.GetWorkFlow();
				currentWorkFlow.selectedItems = this.selectedItems;
				this.workFlowList.push(currentWorkFlow);

				for (var i = 0; i < this.selectedItems.length; i++) {
					if (this.selectedItems[i].Name == 'Charges') {
						var charge: any[];
						charge = this.GetCharges();
						if (this.UpdateMode) {
							charge[0].actionId = this.currentActionId;
							charge[0].workflowId = this.updateWorkFlowId;
						}
						this.workFlowList[0].charges = charge;
						//this.workFlowList[0].charges = this.GetCharges();
					}
					if (this.selectedItems[i].Name == 'Directions') {
						var direction: any[];
						direction = this.GetDirections();
						if (this.UpdateMode) {
							direction[0].actionId = this.currentActionId;
							direction[0].workflowId = this.updateWorkFlowId;
						}
						this.workFlowList[0].directions = direction;
						//this.workFlowList[0].directions = this.GetDirections();
					}
					if (this.selectedItems[i].Name == 'Equipment') {
						var equipment: any[];
						equipment = this.GetEquipmentList();
						if (this.UpdateMode) {
							equipment[0].actionId = this.currentActionId;
							equipment[0].workflowId = this.updateWorkFlowId;
						}
						this.workFlowList[0].equipments = equipment;

						//this.workFlowList[0].equipments = this.GetEquipmentList();
					}
					if (this.selectedItems[i].Name == 'Expertise') {
						var expertise: any[];
						expertise = this.GetExpertise();
						if (this.UpdateMode) {
							expertise[0].actionId = this.currentActionId;
							expertise[0].workflowId = this.updateWorkFlowId;
						}
						this.workFlowList[0].expertise = expertise;

					}
					if (this.selectedItems[i].Name == 'Material List') {
						var material: any[];
						material = this.GetMaterialList();
						if (this.UpdateMode) {
							material[0].actionId = this.currentActionId;
							material[0].workflowId = this.updateWorkFlowId;
						}
						this.workFlowList[0].materialList = material;

					}
					if (this.selectedItems[i].Name == 'Publications') {
						var publication: any[];
						publication = this.GetPublication();
						if (this.UpdateMode) {
							publication[0].actionId = this.currentActionId;
							publication[0].workflowId = this.updateWorkFlowId;
						}
						this.workFlowList[0].publication = publication;

						//this.workFlowList[0].publication = this.GetPublication();
					}
					if (this.selectedItems[i].Name == 'Exclusions') {
						var exclusion: any[];
						exclusion = this.GetExclusions();
						if (this.UpdateMode) {
							exclusion[0].actionId = this.currentActionId;
							exclusion[0].workflowId = this.updateWorkFlowId;
						}
						this.workFlowList[0].exclusions = exclusion;

						//this.workFlowList[0].exclusions = this.GetExclusions();
					}
					if (this.selectedItems[i].Name == 'Measurements') {
						var measurement: any[];
						measurement = this.GetMeasurements();
						if (this.UpdateMode) {
							measurement[0].actionId = this.currentActionId;
							measurement[0].workflowId = this.updateWorkFlowId;
						}
						this.workFlowList[0].measurements = measurement;


					}
				}
			}
			this.workFlow = this.workFlowList[this.workFlowList.length - 1];
		}
		else {
			//debugger;
			var wf = this.workFlowList.filter(x => x.ActionId == this.currentActionId);
			if (wf != undefined && wf.length > 0) {
				var position = 0;
				this.workFlowList.forEach(function (value, index) {
					if (value.workflowId == wf[0].workflowId) {
						position = index;
					}
				});
				this.workFlowList.splice(position, 1);
			}

		}
		this.showMainPage = true;
		//this.SetCurrectTab(this.workFlow.ActionId);
	}

	GetWorkFlow(): any {

		var actionId = this.currentActionId != undefined ? this.currentActionId : "0";
		var actionName = "";
		this.actions.forEach(function (value, index) {
			if (value.Id == actionId) {
				actionName = value.Name;
			}
		});

		return {
			workflowId: "0",
			ActionId: actionId,
			ActionName: actionName,
			charges: undefined,
			directions: undefined,
			equipments: undefined,
			expertise: undefined,
			materialList: undefined,
			publication: undefined,
			exclusions: undefined,
			measurements: undefined,
			selectedItems: [],
		};
	}

	openTab(evt, tabId): void {
		var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}

		document.getElementById(tabId).style.display = "block";
		evt.currentTarget.className += " active";
	}

	GetMeasurements(): any[] {
		var measurement = [{
			workflowMeasurementId: "0",
			itemMasterId: "",
			sequence: "",
			stage: "",
			min: "",
			max: "",
			expected: "",
			diagramURL: "",
			memo: "",
			actionId: "",
			masterCompanyId:'',
			workflowId: "",
			AllowEdit: true,
			isDelete: false,
		}];
		return measurement;
	}

	GetExclusions(): any[] {
		var exclusion = [{
			workFlowExclusionId: "0",
			itemMasterId:'',
			unitCost: "",
			quantity: "",
			extendedCost: "",
			estimtPercentOccurrance: "",
			memo: "",
			masterCompanyId:'',
			actionId: "",
			workflowId: "",
			AllowEdit: true,
			isDelete: false,
		}];
		return exclusion;
	}

	GetPublication(): any[] {
		var publication = [{
			id: "0",
			publicationId: "",
			publicationDescription: "",
			publicationType: "",
			sequence: "",
			source: "",
			aircraftManufacturer: "",
			model: "",
			location: "",
			revision: "",
			revisionDate: "",
			verifiedBy: "",
			verifiedDate: "",
			status: "",
			image: "",
			actionId: "",
			workflowId: "",
			AllowEdit: true,
			IsDeleted: false,
		}];
		return publication;
	}

	GetCharges(): any[] {
		var charges = [{
			workflowChargesListId: "0",
			workflowChargeTypeId: "",
			description: "",
			quantity: "",
			unitCost: "",
			extendedCost: "",
			unitPrice: "",
			extendedPrice: "",
			currencyId: "",
			forexRate: "",
			vendorId: "",
			vendorUnitPrice: "",
			masterCompanyId:'',
			actionId: "",
			workflowId: "",
			AllowEdit: true,
			IsDelete: false,

		}];
		return charges;
	}

	GetEquipmentList(): any[] {
		var equipmentList = [{
			workflowEquipmentListId: "0",
			assetId: "",
			assetTypeId: "",
			assetDescription: "",
			quantity: "",
			actionId: "",
			workflowId: "",
			masterCompanyId: '',
			AllowEdit: true,
			IsDelete: false,
		}];
		return equipmentList;
	}

	GetExpertise(): any[] {
		var expertise = [{
			workflowExpertiseListId: "0",
			expertiseTypeId: "",
			estimatedHours: "",
			laborDirectRate: "",
			directLaborRate: "",
			overheadBurden: "",
			overheadCost: "",
			standardRate:'',
			laborOverheadCost: "",
			actionId: "",
			workflowId: "",
			masterCompanyId: '',
			AllowEdit: true,
			IsDelete: false,
		}];

		return expertise;
	}
	GetMaterialList(): any[] {
		var material = [{
			workflowMaterialListId: "0",
			itemMasterId:'',
			conditionCodeId: "",
			mandatoryOrSupplemental: "",
			itemClassificationId: "",
			quantity: "",
			unitOfMeasureId: "",
			unitCost: "",
			extendedCost: "",
			price: "",
			provisionId:'',
			isDeferred:'',
			memo: "",
			
			actionId: "",
			workflowId: "",
			masterCompanyId: '',
			AllowEdit: true,
			IsDelete: false,
		}];

		return material;
	}


	GetDirections(): any[] {
		var directions = [{
			workflowDirectionId: "0",
			action: "",
			description: "",
			sequence: "",
			memo: "",
			actionId: "",
			workflowId: "",
			masterCompanyId: '',
			AllowEdit: true,
			isDelete: false,

		}];
		return directions;
	}

	onActionChange(): void {
		this.selectedItems = [];
		this.showActionAttribute = this.currentActionId != "0";
	}

	addAction(): void {
		this.actionService.addAction(this.newAction).subscribe(
			data => {
				this.getAllActions();
			},
			error => this.errorMessage = <any>error
		);
	}

	addWorkFlow(): void {
		//debugger;
        this.sourceWorkFlow.workflowId = undefined;
        
        this.sourceWorkFlow.berThresholdAmount = (Math.min((this.sourceWorkFlow.fixedAmount == undefined ? Infinity : this.sourceWorkFlow.fixedAmount), (this.sourceWorkFlow.percentOfNew == undefined ? Infinity : this.sourceWorkFlow.percentOfNew), (this.sourceWorkFlow.percentOfReplaceMent == undefined ? Infinity : this.sourceWorkFlow.percentOfReplaceMent)));
       
		this.actionService.getNewWorkFlow(this.sourceWorkFlow).subscribe(
			data => {
				this.SaveWorkFlow(data);
			},
			error => this.errorMessage = <any>error
		);
	}

	updateWorkFlow(): void {
		//debugger;
		this.sourceWorkFlow.berThresholdAmount = (Math.min(this.sourceWorkFlow.fixedAmount, this.sourceWorkFlow.percentOfReplaceMent, this.sourceWorkFlow.percentOfNew));
		this.actionService.getNewWorkFlow(this.sourceWorkFlow).subscribe(data => { })
		for (let workflow of this.workFlowList) {
			if (workflow.charges) {
				var charges = workflow.charges.filter(x => (x.AllowEdit == true && x.isDelete != true && x.workflowChargesListId != "0") || (x.isDelete == true && x.workflowChargesListId != "0") || (x.isDelete != true && x.workflowChargesListId == "0"));
				for (let charge of charges) {
					if ((charge.AllowEdit == true && charge.isDelete != true && charge.workflowChargesListId != "0") || (charge.isDelete == true && charge.workflowChargesListId != "0")) {
						this.actionService.updateCharges(charge).subscribe(data => {
						}, error => console.log(error));
					}
					else if (charge.isDelete != true && charge.workflowChargesListId == "0") {
						// charge.ActionId = this.currentActionId;
						// charge.WorkFlowId = this.updateWorkFlowId;
						this.actionService.addCharges(charge).subscribe(data => {
						}, error => console.log(error));
					}
				}
			}
			if (workflow.directions) {
				//debugger;
				var directions = workflow.directions.filter(x => x.AllowEdit == true || (x.isDelete == true) || (x.workflowDirectionId == "0" || x.workflowDirectionId == ""));
				for (let direction of directions) {
					if ((direction.AllowEdit == true && direction.isDelete != true && direction.workflowDirectionId != "0") || (direction.isDelete == true && direction.workflowDirectionId != "0")) {
						this.actionService.updateDirection(direction).subscribe(data => {
						}, error => console.log(error));
					}
					else if (direction.isDelete != true && direction.workflowDirectionId == "0") {
						this.actionService.addDirection(direction).subscribe(data => {
						}, error => console.log(error));
					}

				}
			}
			if (workflow.equipments) {
				var equipments = workflow.equipments.filter(x => x.AllowEdit == true || (x.isDelete == true) || (x.workflowEquipmentListid == "0" || x.workflowEquipmentListid == ""));
				for (let equipment of equipments) {
					if ((equipment.AllowEdit == true && equipment.isDelete != true && equipment.workflowEquipmentListid != "0") || (equipment.isDelete == true && equipment.workflowEquipmentListid != "0")) {
						this.actionService.updateEquipment(equipment).subscribe(data => {
						}, error => console.log(error));
					}
					else if (equipment.isDelete != true && equipment.workflowEquipmentListid == "0") {
						this.actionService.addEquipment(equipment).subscribe(data => {
						}, error => console.log(error));
					}
				}
			}
			if (workflow.exclusions) {
				var exclusions = workflow.exclusions.filter(x => x.AllowEdit == true || (x.isDelete == true) || (x.workflowExclusionId == "0" || x.workflowExclusionId == ""));
				for (let exclusion of exclusions) {
					if ((exclusion.AllowEdit == true && exclusion.isDelete != true && exclusion.workflowExclusionId != "0") || (exclusion.isDelete == true && exclusion.workflowExclusionId != "0")) {
						this.actionService.updateExclusion(exclusion).subscribe(data => {
						}, error => console.log(error));
					}
					else if (exclusion.isDelete != true && exclusion.workflowExclusionId == "0") {
						this.actionService.addExclusion(exclusion).subscribe(data => {
						}, error => console.log(error));
					}
				}
			}
			if (workflow.expertise) {
				var expertise = workflow.expertise.filter(x => x.AllowEdit == true || (x.isDelete == true) || (x.workflowExpertiseListId == "0" || x.workflowExpertiseListId == ""));
				for (let expert of expertise) {
					if ((expert.AllowEdit == true && expert.isDelete != true && expert.workflowExpertiseListId != "0") || (expert.isDelete == true && expert.workflowExpertiseListId != "0")) {
						this.actionService.updateExpertise(expert).subscribe(data => {
						}, error => console.log(error));
					}
					else if (expert.isDelete != true && expert.workflowExpertiseListId == "0") {
						this.actionService.addExpertise(expert).subscribe(data => {
						}, error => console.log(error));
					}
				}
			}
			if (workflow.materialList) {
				var materials = workflow.materialList.filter(x => x.AllowEdit == true || (x.isDelete == true) || (x.workflowMaterialListId == "0" || x.workflowMaterialListId == ""));
				for (let material of materials) {
					if ((material.AllowEdit == true && material.isDelete != true && material.workflowMaterialListId != "0") || (material.isDelete == true && material.workflowMaterialListId != "0")) {
						this.actionService.updateMaterial(material).subscribe(data => {
						}, error => console.log(error));
					}
					else if (material.isDelete != true && material.workflowMaterialListId == "0") {
						this.actionService.addMaterial(material).subscribe(data => {
						}, error => console.log(error));
					}
				}
			}
			if (workflow.measurements) {
				var measurements = workflow.measurements.filter(x => x.AllowEdit == true || (x.isDelete == true) || (x.workflowMeasurementId == "0" || x.workflowMeasurementId == ""));
				for (let measurement of measurements) {
					if ((measurement.AllowEdit == true && measurement.isDelete != true && measurement.workflowMeasurementId != "0") || (measurement.isDelete == true && measurement.workflowMeasurementId != "0")) {
						this.actionService.updateMeasurement(measurement).subscribe(data => {
						}, error => console.log(error));
					}
					else if (measurement.isDelete != true && measurement.workflowMeasurementId == "0") {
						this.actionService.addMeasurement(measurement).subscribe(data => {
						}, error => console.log(error));
					}
				}
			}
			if (workflow.publication) {
				var publications = workflow.publication.filter(x => x.AllowEdit == true || (x.IsDeleted == true) || (x.id == "0" || x.id == ""));
				for (let publication of publications) {
					if ((publication.AllowEdit == true && publication.isDeleted != true && publication.id != "0") || (publication.isDeleted == true && publication.id != "0")) {
						this.actionService.updatePublication(publication).subscribe(data => {
						}, error => console.log(error));
					}
					else if (publication.IsDeleted != true && publication.id == "0") {
						this.actionService.addPublication(publication).subscribe(data => {
						}, error => console.log(error));
					}
				}
			}

		}
		alert('Workflow updated');
	}


	SaveWorkFlow(newWorkFlow: any): void {

		if (this.workFlowList != undefined && this.workFlowList.length > 0) {

			for (let workflow of this.workFlowList) {
				if (workflow.charges != undefined) {
					for (let charge of workflow.charges) {
						charge.workflowId = newWorkFlow.workflowId;
						charge.actionId = workflow.ActionId;
						this.actionService.addCharges(charge).subscribe(data => {
						}, error => { console.log(error); alert('Error while adding data'); });
					}
				}
				if (workflow.directions != undefined) {
					for (let direction of workflow.directions) {
						direction.workflowId = newWorkFlow.workflowId;
						direction.actionId = workflow.ActionId;
						direction.workflowDirectionId = undefined;
						direction.AllowEdit = undefined;
						this.actionService.addDirection(direction).subscribe(data => { }, error => { console.log(error); alert('Error while adding data'); });
					}
				}
				if (workflow.equipments != undefined) {
					for (let equipment of workflow.equipments) {
						equipment.workflowId = newWorkFlow.workflowId;
						equipment.actionId = workflow.ActionId;
						this.actionService.addEquipment(equipment).subscribe(data => { }, error => { console.log(error); alert('Error while adding data'); });
					}
				}
				if (workflow.exclusions != undefined) {
					for (let exclusion of workflow.exclusions) {
						exclusion.workflowId = newWorkFlow.workflowId;
						exclusion.actionId = workflow.ActionId;
						this.actionService.addExclusion(exclusion).subscribe(data => { }, error => { console.log(error); alert('Error while adding data'); });
					}
				}
				if (workflow.expertise != undefined) {
					for (let expertise of workflow.expertise) {
						expertise.workflowId = newWorkFlow.workflowId;
						expertise.actionId = workflow.ActionId;
						this.actionService.addExpertise(expertise).subscribe(data => { }, error => { console.log(error); alert('Error while adding data'); });
					}
				}
				if (workflow.materialList != undefined) {
					for (let materialList of workflow.materialList) {
						materialList.workflowId = newWorkFlow.workflowId;
						materialList.actionId = workflow.ActionId;
						this.actionService.addMaterial(materialList).subscribe(data => { }, error => { console.log(error); alert('Error while adding data'); });
					}
				}
				if (workflow.measurements != undefined) {
					for (let measurement of workflow.measurements) {
						measurement.workflowId = newWorkFlow.workflowId;
						measurement.actionId = workflow.ActionId;
						this.actionService.addMeasurement(measurement).subscribe(data => { }, error => { console.log(error); alert('Error while adding data'); });
					}
				}
				if (workflow.publication != undefined) {
					for (let publication of workflow.publication) {
						publication.workflowId = newWorkFlow.workflowId;
						publication.actionId = workflow.ActionId;
						this.actionService.addPublication(publication).subscribe(data => { }, error => { console.log(error); alert('Error while adding data'); });
					}
				}

			}
			alert('Records Added');
			this.resetPage();
		}

	}

	resetPage(): void {
		this.selectedItems = [];
		this.workFlowList = [];
		this.currentActionId = "0";
		this.showMainPage = false;
		this.showActionAttribute = false;
	}

	onDeSelect(item: any) {
		//    if(this.workFlow.ActionId == this.currentActionId)
		//    {
		//     var position = 0;
		//     this.workFlow.selectedItems.forEach(function(value,index){
		//         if(value.Id == item.Id){
		//             position=index;
		//         }
		//     });
		//        this.workFlow.selectedItems.splice(position,1);
		//        this.selectedItems = this.workFlow.selectedItems;
		//    }
	}

	onItemSelect(item: any) {
		//     if(this.workFlow.ActionId == this.currentActionId)
		//    {
		//     this.workFlow.selectedItems.push(item);
		//    }
	}
	onSelectAll(items: any) {
		console.log(items);
	}

}