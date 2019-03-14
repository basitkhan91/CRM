import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ConditionService } from '../../../../services/condition.service';
import { Condition } from '../../../../models/condition.model';
import { fadeInOut } from '../../../../services/animations';
import { MessageSeverity, AlertService } from '../../../../services/alert.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MultiSelectModule } from 'primeng/multiselect';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { AtaMainService } from '../../../../services/atamain.service';
import { ATAMain } from '../../../../models/atamain.model';

@Component({
    selector: 'app-item-master-create-capabilities',
    templateUrl: './item-master-create-capabilities.component.html',
	styleUrls: ['./item-master-create-capabilities.component.scss'],
	animations: [fadeInOut]
})
/** item-master-create-capabilities component*/
export class ItemMasterCreateCapabilitiesComponent implements OnInit{
    /** item-master-create-capabilities ctor */
	matSpinner: boolean;
	loadingIndicator: boolean;

	partCollection: any[];
	selectedActionName: any;
	disableSavepartNumber: boolean;
	sourceItemMasterCap: any = {};
	disableSavepartDescription: boolean;
	itemclaColl: any[];
	descriptionbyPart: any[] = [];
	allPartnumbersInfo: any[];
	allManagemtninfo: any[] = [];
	maincompanylist: any[] = [];
	bulist: any[];
	departmentList: any[];
    divisionlist: any[];
    shiftValues: any[] = [];
    allAircraftinfo: any[];
    completeAircraftManfacturerData: any[];
    allaircraftInfo: any[];
    selectedAircraftTypes: any;
    selectedAircraftDataModels: any[] = [];
    enablePopupData: boolean = false;
    currentVendorModels: any[] = [];
    selectedModels: any[] = [];
    allManufacturerInfo: any[];
    allATAMaininfo1: ATAMain[];

    constructor(public ataservice: AtaMainService,public workFlowtService1: LegalEntityService,private modalService: NgbModal, private alertService: AlertService, public itemser: ItemMasterService)
	{
		//this.dataSource = new MatTableDataSource();
	}

	ngOnInit(): void {
		
		//this.workFlowtService.MatSpinner = true;//App Mat Spinner Testing
		// debugger;
		//this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-add-vendor-capabilitiesn';
		//this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);

		this.ptnumberlistdata(); //calling for getting Item Master Parts List Data

        this.loadManagementdata(); // Loading Management Data from Company,BU,DIV,DEP

        this.aircraftManfacturerData();

        this.manufacturerdata();
        this.atamaindata();
	}

    private atamaindata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.ataservice.getAtaMainList().subscribe(
            results => this.onDataLoadATAMainDataSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    onDataLoadATAMainDataSuccessful(getAtaMainList: any[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = getAtaMainList;
        this.allATAMaininfo1 = getAtaMainList;
    }

	private loadManagementdata()
	{
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService1.getManagemententity().subscribe(
			results => this.onManagemtntdataLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	//calling for COM,BU,DIV,DEP Data Start
	private onManagemtntdataLoad(getAtaMainList: any[])
	{
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = getAtaMainList;
		this.allManagemtninfo = getAtaMainList;

		for (let i = 0; i < this.allManagemtninfo.length; i++) {

			if (this.allManagemtninfo[i].parentId == null) {
				this.maincompanylist.push(this.allManagemtninfo[i]);

			}
        }

        this.sourceItemMasterCap.businessUnitId = "";
	}


    getBUList(companyId) {
        this.sourceItemMasterCap.businessUnitId = "";
		this.sourceItemMasterCap.managementStructureEntityId = companyId; //Saving Management Structure Id if there Company Id

		this.bulist = [];
		this.departmentList = [];
		this.divisionlist = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == companyId) {
				this.bulist.push(this.allManagemtninfo[i]);
			}
		}

	}

	getDepartmentlist(businessUnitId) {
		this.sourceItemMasterCap.managementStructureEntityId = businessUnitId; //Saving Management Structure Id if there businessUnitId
        this.sourceItemMasterCap.departmentId = "";
		this.departmentList = [];
		this.divisionlist = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == businessUnitId) {
				this.departmentList.push(this.allManagemtninfo[i]);
			}
		}
	}

    getDivisionlist(departmentId) {
        this.sourceItemMasterCap.divisionId = "";
		this.sourceItemMasterCap.managementStructureEntityId = departmentId; //Saving Management Structure Id if there departmentId

		this.divisionlist = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == departmentId) {
				this.divisionlist.push(this.allManagemtninfo[i]);
			}
		}
	}



	getDivisionChangeManagementCode(divisionId) {
		this.sourceItemMasterCap.managementStructureEntityId = divisionId; //Saving Management Structure Id if theredivisionId
	}


	//calling for COM,BU,DIV,DEP Data End

	private ptnumberlistdata()
	{
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.itemser.getPrtnumberslistList().subscribe(
			results => this.onptnmbersSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onptnmbersSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = allWorkFlows;
		this.allPartnumbersInfo = allWorkFlows;
	}

	private onDataLoadFailed(error: any)
	{
		// alert(error);
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

	}

	private onpartnumberloadsuccessfull(allWorkFlows: any[]) //getting Part Description
	{


		this.descriptionbyPart = allWorkFlows[0]
		//this.sourceAction = this.descriptionbyPart;
		this.sourceItemMasterCap.partDescription = allWorkFlows[0].partDescription;


	}


	partEventHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedActionName) {
				if (value == this.selectedActionName.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSavepartNumber = true;

				}
				else {
					this.disableSavepartNumber = false;
					this.sourceItemMasterCap.partDescription = "";
					this.disableSavepartDescription = false;
				}
			}

		}
	}

	partnmId(event)
	{
		//
		if (this.itemclaColl) {
			for (let i = 0; i < this.itemclaColl.length; i++) {
				if (event == this.itemclaColl[i][0].partName) {
					this.sourceItemMasterCap.partId = this.itemclaColl[i][0].partId;
					this.disableSavepartNumber = true;
					this.selectedActionName = event;
				}
			}
			this.itemser.getDescriptionbypart(event).subscribe(
				results => this.onpartnumberloadsuccessfull(results[0]),
				error => this.onDataLoadFailed(error)


			);
			this.disableSavepartDescription = true;
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
								"partName": partName
							}]),

								this.partCollection.push(partName);
						}
					}
				}
			}
		}
    }

    private aircraftManfacturerData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemser.getAircraft().subscribe(
            results => this.onDataLoadaircraftManfacturerSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    private onDataLoadaircraftManfacturerSuccessful(allWorkFlows: any[]) //While oading
    {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = allWorkFlows;
        this.allaircraftInfo = allWorkFlows; //Complete Aircraft Data

        this.completeAircraftManfacturerData = allWorkFlows;

        if (this.allaircraftInfo) {
            if (this.allaircraftInfo.length > 0) {
                for (let i = 0; i < this.allaircraftInfo.length; i++)
                    this.shiftValues.push(
                        { value: this.allaircraftInfo[i].aircraftTypeId, label: this.allaircraftInfo[i].description },

                    );
            }

            //Adding

            //	let valAirCraft = [];
            //	//we are Passing Customer Id for getting Edit Data and make it check 
            //	this.itemser.getAircaftManafacturerList(this.sourceItemMaster.itemMasterId)
            //		.subscribe(results => {
            //			this.allAircraftManufacturer = results[0];
            //			if (results != null) {
            //				for (let i = 0; i < this.allAircraftManufacturer.length; i++) {
            //					valAirCraft.push(this.allAircraftManufacturer[i].aircraftTypeId);
            //				}
            //				this.selectedAircraftTypes = valAirCraft; //if there is Aircraft Data with ItemMasterId that will be Checked 
            //				console.log(this.selectedAircraftTypes);
            //			}

            //		},
            //			error => this.onDataLoadFailed(error)
            //		);


        }
    }

    openModelPopups(content)
    {

        //alert(this.itemser.isEditMode);
        if (this.itemser.isEditMode == false)
        {
            
            //Adding for Aircraft manafacturer List Has empty then List Should be null
            if (this.selectedAircraftTypes.length > 0) {
                var arr = this.selectedAircraftTypes;
                var selectedvalues = arr.join(",");
                this.itemser.getAircraftTypes(selectedvalues).subscribe(
                    results => this.onDataLoadaircrafttypeSuccessful(results[0]),
                    error => this.onDataLoadFailed(error)
                );
            }
            else {
                this.allAircraftinfo = []; //Making empty if selecting is null
            }
        }
        //if (this.itemser.isEditMode == true)
        //{

        //	this.modal = this.modalService.open(content, { size: 'sm' });
        //	this.modal.result.then(() => {

        //		console.log('When user closes');
        //	}, () => { console.log('Backdrop click') })
        //	if (this.allAircraftinfo) {
        //		if (this.allAircraftinfo.length >= 0) {
        //			this.enablePopupData = true;
        //			var arr = this.selectedAircraftTypes;
        //			if (this.selectedAircraftTypes) {
        //				var selectedvalues = arr.join(",");
        //				//this.loadData();
        //				this.itemser.getAircraftTypes(selectedvalues).subscribe(
        //					results => this.onDataLoadaircrafttypeSuccessful(results[0]),
        //					error => this.onDataLoadFailed(error)

        //				)
        //			}
        //		}
        //	}
        //}

    }

    private onDataLoadaircrafttypeSuccessful(allWorkFlows: any[]) //getting Models Based on Manfacturer Selection
    {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = allWorkFlows;
        this.selectedAircraftDataModels = allWorkFlows; //selected Aircraft Models based on Aircraft Data Selection

        
        //for Open Model for Edit Data
        if (this.itemser.isEditMode == true) //in this we are Making all the Models and Getting Checked if data is thete with Item Master Id 
        {
            {

                for (let i = 0; i < this.currentVendorModels.length; i++) {
                    for (let j = 0; j < this.allAircraftinfo.length; j++) {
                        if (this.currentVendorModels[i].aircraftModelId == this.allAircraftinfo[j].aircraftModelId) {
                            this.allAircraftinfo[j].priority = this.currentVendorModels[i].priority;
                            this.allAircraftinfo[j].checkbox = this.currentVendorModels[i].checkbox;

                        }


                    }
                }
            }
        }


        if (this.selectedModels.length > 0)
        {

            let ischange1 = false;
            if (this.selectedModels.length > 0) {
                this.selectedModels.map((row) => {
                    for (let i = 0; i < this.allAircraftinfo.length; i++) {
                        if (this.allAircraftinfo[i].aircraftModelId == row.aircraftModelId) {
                            this.allAircraftinfo[i].priority = row.priority;
                            this.allAircraftinfo[i].checkbox = row.checkbox;
                            ischange1 = true;
                        }
                    }

                });
            }
            //if (!ischange1) {
            //	this.selectedModels.push(selectedRow);
            //}

        }
        
    }

    private manufacturerdata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemser.getManufacturerList().subscribe(
            results => this.onmanufacturerSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onmanufacturerSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = allWorkFlows;
        this.allManufacturerInfo = allWorkFlows;
    }

}