import { Component } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { PageHeaderComponent } from '../../../../shared/page-header.component';
import * as $ from 'jquery';
import { EmployeeService } from '../../../../services/employee.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuItem } from 'primeng/api';//bread crumb
import { Charge } from '../../../../models/charge.model';
import { MasterCompany } from '../../../../models/mastercompany.model';
import { AuditHistory } from '../../../../models/audithistory.model';
import { AuthService } from '../../../../services/auth.service';
import { ReceivingCustomerWorkService } from '../../../../services/receivingcustomerwork.service';
import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { CustomerService } from '../../../../services/customer.service';
import { Condition } from '../../../../models/condition.model';
import { ConditionService } from '../../../../services/condition.service';
import { VendorService } from '../../../../services/vendor.service';
import { BinService } from '../../../../services/bin.service';
import { SiteService } from '../../../../services/site.service';
import { Site } from '../../../../models/site.model';
import { LegalEntityService } from '../../../../services/legalentity.service';


@Component({
    selector: 'app-customer-work-setup',
    templateUrl: './customer-work-setup.component.html',
    styleUrls: ['./customer-work-setup.component.scss'],
    animations: [fadeInOut]
})

export class CustomerWorkSetupComponent {
    firstCollection: any[];
	allEmployeeinfo: any[] = [];
    loadingIndicator: boolean;
    dataSource: any;
    disableSavepartNumber: boolean;
    selectedActionName: any;
	itemclaColl: any[]=[];
    allPartnumbersInfo: any[] =[];
    partCollection: any[];
    isSaving: boolean;
	isDeleteMode: boolean;
	isEditMode: boolean = false;
    modal: any;
    Active: string;
    allComapnies: MasterCompany[];
    auditHisory: any[];
    allRecevinginfo: any[]=[];
	allActions: any[] = [];
	customerId: any;
    customerNames: any[];
    customerNamecoll: any;
    selectedColumns: any;
    cols: any;
    disableSavepartDescription: boolean;
    descriptionbyPart: any[]=[];
    allConditionInfo: Condition[];
    allCustomer: any[];
    allVendorList: any[];
    chargeName: any;
    allEmpActions: any[]=[];
    sourceAction: any;
    showRestrictQuantity: boolean;
    showFreeQuantity: boolean;
    showNormalQuantity: boolean;
    allWareHouses: any[];
    allLocations: any[];
    allShelfs: any[];
	allBins: any[];
	allSites: Site[];
	allManagemtninfo: any[] = [];
	maincompanylist: any[] = [];
    disableSaveCusCode: boolean;
    CustomerInfoByName: any[] = [];
    disableSaveCusName: boolean;
	ngOnInit(): void {
		this.sourcereceving.isCustomerStock = true;

		this.employeedata();
		this.loadData();
		this.ptnumberlistdata();
		this.Receveingcustomerlist();
		this.loadDataForCondition();
		this.customerList();
		this.loadItemmasterData();
		this.vendorList();
		this.loadSiteData();
        this.loadManagementdata();
        if (!this.sourcereceving.receivingCustomerWorkId) {
            this.sourcereceving.receivingCustomerNumber = 'Creating';
        }

	}

	constructor(private conditionService: ConditionService, public workFlowtService1: LegalEntityService, private siteService: SiteService, private binService: BinService, private vendorservice: VendorService, public employeeService: EmployeeService, private alertService: AlertService, public itemser: ItemMasterService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, public receivingCustomerWorkService: ReceivingCustomerWorkService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private customerservices: CustomerService) {
		this.dataSource = new MatTableDataSource();
            

	}

	sourcereceving: any = {};
	ngAfterViewInit() {
	
	}
	public allWorkFlows: any[] = [];


	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.employeeService.getEmployeeList().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	private onDataLoadSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allEmpActions = allWorkFlows;
	}
    private loadMasterCompanies() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.masterComapnyService.getMasterCompanies().subscribe(
            results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
	public applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue;
	}

	private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {

		 debugger;
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

		this.auditHisory = auditHistory;


		this.modal = this.modalService.open(content, { size: 'lg' });

		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })


	}

	private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allComapnies = allComapnies;

	}

	private onDataLoadFailed(error: any) {
		// alert(error);
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

	}
	handleChange(rowData, e) {
		if (e.checked == false) {
			this.sourcereceving = rowData;
			this.sourcereceving.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourcereceving.isActive == false;
			this.receivingCustomerWorkService.updateReason(this.sourcereceving).subscribe(
				response => this.saveCompleted(this.sourcereceving),
				error => this.saveFailedHelper(error));
			alert(e);
		}
		else {
			this.sourcereceving = rowData;
			this.sourcereceving.updatedBy = this.userName;
			this.Active = "Active";
			this.sourcereceving.isActive == true;
			this.receivingCustomerWorkService.updateReason(this.sourcereceving).subscribe(
				response => this.saveCompleted(this.sourcereceving),
				error => this.saveFailedHelper(error));
			alert(e);
		}

	}

	open(content) {

		this.isEditMode = false;
		this.isDeleteMode = false;

		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourcereceving.isActive = true;
		this.chargeName = "";
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}


	openDelete(content, row) {

		this.isEditMode = false;
		this.isDeleteMode = true;
		this.sourcereceving = row;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openEdit(content, row) {

		this.isEditMode = true;

		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourcereceving = row;
		this.chargeName = this.sourcereceving.chargeName;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	openView(content, row) {

		this.sourceAction = row;
		//this.charge_Name = row.chargeName;
		//this.cost = row.cost;
		//this.description = row.description;
		//this.purchaseOrderId = row.purchaseOrderId;
		//this.generalLedgerId = row.generalLedgerId;
		//this.integrationPortalId = row.integrationPortalId;
		//this.vendorId = row.vendorId;
		//this.functionalCurrencyId = row.functionalCurrencyId;
		//this.currencyId = row.currencyId;
		//this.memo = row.memo;
		//this.createdBy = row.createdBy;
		//this.updatedBy = row.updatedBy;
		//this.createdDate = row.createdDate;
		//this.updatedDate = row.updatedDate;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	openHelpText(content) {
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}



	//openHist(content, row) {
	//	this.alertService.startLoadingMessage();
	//	this.loadingIndicator = true;
	//	this.sourcereceving = row;
	//	this.isSaving = true;
	//	 debugger;
	//	this.receivingCustomerWorkService.historyCharge(this.sourcereceving.chargeId).subscribe(
	//		results => this.onHistoryLoadSuccessful(results[0], content),
	//		error => this.saveFailedHelper(error));


	//}


	editItemAndCloseModel() {

		 //debugger;

		this.isSaving = true;

		if (this.isEditMode == false) {
			this.sourcereceving.createdBy = this.userName;
            this.sourcereceving.updatedBy = this.userName;
            this.sourcereceving.customerId = this.allCustomer[0].customerId;
            this.sourcereceving.employeeId = this.allEmpActions[0].employeeId;
            //this.sourcereceving.obtainFromCustomerId = this.allCustomer[0].customerId;
            this.sourcereceving.obtainFromVendorId = this.allVendorList[0].vendorId;
			this.sourcereceving.masterCompanyId = 1;
			this.receivingCustomerWorkService.newReason(this.sourcereceving).subscribe(
				role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
            //this.sourcereceving = {};
		}
		else {

			this.sourcereceving.updatedBy = this.userName;
			this.sourcereceving.createdBy = this.userName;
			this.sourcereceving.masterCompanyId = 1;
			this.receivingCustomerWorkService.updateReason(this.sourcereceving).subscribe(
				response => this.saveCompleted(this.sourcereceving),
                error => this.saveFailedHelper(error));
            this.sourcereceving = {};
		}
	}

	deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourcereceving.updatedBy = this.userName;
        this.receivingCustomerWorkService.deleteReason(this.sourcereceving.receivingCustomerWorkId).subscribe(
			response => this.saveCompleted(this.sourceAction),
			error => this.saveFailedHelper(error));
		this.modal.close();
	}
	dismissModel() {
		this.isDeleteMode = false;
		this.isEditMode = false;
		//this.modal.close();
	}

	private saveCompleted(user?: any) {
		this.isSaving = false;

		if (this.isDeleteMode == true) {
			this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
			this.isDeleteMode = false;
		}
		else {
			this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

		}

		this.loadData();
	}

	private saveSuccessHelper(role?: true) {
		this.isSaving = false;
		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

		this.loadData();

	}

	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}

	private saveFailedHelper(error: any) {
		this.isSaving = false;
		this.alertService.stopLoadingMessage();
		this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
		this.alertService.showStickyMessage(error, null, MessageSeverity.error);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	private Receveingcustomerlist() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.receivingCustomerWorkService.getReceiveCustomerList().subscribe(
			results => this.onDataLoadrecevingSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}

	private onDataLoadrecevingSuccessful(getEmployeeCerficationList: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getEmployeeCerficationList;
		this.allRecevinginfo = getEmployeeCerficationList;
	}
	
	private employeedata() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.employeeService.getEmployeeList().subscribe(
			results => this.onempDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);



		this.selectedColumns = this.cols;

	}

	private onempDataLoadSuccessful(getEmployeeCerficationList: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = getEmployeeCerficationList;
		this.allEmployeeinfo = getEmployeeCerficationList;
	}

	filterfirstName(event) {

		this.firstCollection = [];
		for (let i = 0; i < this.allEmployeeinfo.length; i++) {
			let firstName = this.allEmployeeinfo[i].firstName;
			if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.firstCollection.push(firstName);
			}
		}
	}
	private onptnmbersSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allPartnumbersInfo = allWorkFlows;
	}


	private ptnumberlistdata() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.itemser.getPrtnumberslistList().subscribe(
			results => this.onptnmbersSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
    }
    filterNames(event) {

        this.customerNames = [];
        if (this.allCustomer) {
            if (this.allCustomer.length > 0) {
                for (let i = 0; i < this.allCustomer.length; i++) {
                    let name = this.allCustomer[i].name;
                    if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                        this.customerNames.push(name);
                    }
                }
            }
        }
    }
    //onCustomerNameselected(event) {
    //    //debugger;
    //    for (let i = 0; i < this.allCustomer.length; i++) {
    //        if (event == this.allCustomer[i][0].name) {
    //            //this.disableSaveCusName = true;
    //            //this.disableSave = true;
    //            this.selectedActionName = event;
    //        }
    //    }

    //    this.customerservices.getcustomerByNameList(event).subscribe(
    //    	results => this.oncustomerloadsuccessfull(results[0]),
    //    	error => this.onDataLoadFailed(error)
    //    );
    //}
    //private oncustomerloadsuccessfull(allWorkFlows: any[]) {
    //    this.CustomerInfoByName = allWorkFlows[0];
    //    this.sourcereceving.customerReference = this.allCustomer[0].contractReference;

    //}
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
	private onitemmasterSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allActions = allWorkFlows;
	}
	private loadItemmasterData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.itemser.getItemMasterList().subscribe(
			results => this.onitemmasterSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	partnmId(event) {
		//
		if (this.itemclaColl) {
			//for (let i = 0; i < this.itemclaColl.length; i++) {
			//	if (event == this.itemclaColl[i][0].partName) {
			//		this.sourcereceving.partId = this.itemclaColl[i][0].partId;
			//		this.selectedActionName = event;
			//	}
			//}
			this.itemser.getDescriptionbypart(event).subscribe(
				results => this.onpartnumberloadsuccessfull(results[0]),
				error => this.onDataLoadFailed(error)
			);
		}
	}
	eventHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedActionName) {
				if (value == this.selectedActionName.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSavepartNumber = true;

				}
				else {
					this.disableSavepartNumber = false;
					this.sourcereceving.partDescription = "";
					this.disableSavepartDescription = false;
				}
			}

		}
	}
	private onpartnumberloadsuccessfull(allWorkFlows: any[]) {
		//this.descriptionbyPart = allWorkFlows[0]
		this.sourcereceving.partDescription = allWorkFlows[0].partDescription;
		this.sourcereceving.isSerialized = allWorkFlows[0].isSerialized;
		if (this.sourcereceving.isSerialized == true) {
			this.showRestrictQuantity = true;
			this.showFreeQuantity = false;
			this.showNormalQuantity = false;
		}
		else {
			this.showRestrictQuantity = false;
			this.showFreeQuantity = true;
			this.showNormalQuantity = false;

		}
		this.sourcereceving.timeLife = allWorkFlows[0].isTimeLife;
	}

	private onDataLoadSuccessfulForCondition(getConditionList: Condition[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getConditionList;
		this.allConditionInfo = getConditionList;
	}
	private loadDataForCondition() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.conditionService.getConditionList().subscribe(
			results => this.onDataLoadSuccessfulForCondition(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	private onCustomerDataLoadSuccessful(allCustomerFlows: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allCustomerFlows;
		this.allCustomer = allCustomerFlows;

	}
	private customerList() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.customerservices.getWorkFlows().subscribe(
			results => this.onCustomerDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	private onVendorDataLoadSuccessful(allVendorWorkFlows: any[]) {
		//debugger;
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allVendorWorkFlows;
		this.allVendorList = allVendorWorkFlows;
	}
	private vendorList() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.vendorservice.getVendorList().subscribe(
			results => this.onVendorDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	siteValueChange(data) //Site Valu Selection in Form
	{

		this.allWareHouses = [];
		this.allLocations = [];
		this.allShelfs = [];
		this.allBins = [];
		this.sourcereceving.warehouseId = 0
		this.sourcereceving.locationId = 0;
		this.sourcereceving.shelfId = 0;
		this.sourcereceving.binId = 0;
		this.binService.getWareHouseDate(this.sourcereceving.siteId).subscribe( //calling and Subscribing for WareHouse Data
			results => this.onDataLoadWareHouse(results), //sending WareHouse
			error => this.onDataLoadFailed(error)
		);
	}
	private onDataLoadWareHouse(getWarehousList: any) { //Storing WareHouse Data

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allWareHouses = getWarehousList; //cha
		//this.warehouseId = this.allWareHouses.warehouseId;
	}
	wareHouseValueChange(warehouseId) {

		this.allLocations = [];
		this.allShelfs = [];
		this.allBins = [];

		this.sourcereceving.locationId = 0;
		this.sourcereceving.shelfId = 0;
		this.sourcereceving.binId = 0;
		this.binService.getLocationDate(warehouseId).subscribe( //calling and Subscribing for Location Data
			results => this.onDataLoadLocation(results), //sending Location
			error => this.onDataLoadFailed(error)
		);
	}
	private onDataLoadLocation(getLocationList: any) { //Storing WareHouse Data

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allLocations = getLocationList; //cha
		//this.locationId = this.allWareHouses.locationId;
	}
	locationValueChange(locationId) {
		this.allShelfs = [];
		this.allBins = [];
		this.sourcereceving.shelfId = 0;
		this.sourcereceving.binId = 0;

		this.binService.getShelfDate(locationId).subscribe( //calling and Subscribing for Location Data
			results => this.onDataLoadShelf(results), //sending Location
			error => this.onDataLoadFailed(error)
		);
	}

	private onDataLoadShelf(getShelfList: any) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allShelfs = getShelfList; //cha
	}
	shelfValueChange(binId) {
		this.allBins = [];
		this.sourcereceving.binId = 0;

		this.binService.getBinDataById(binId).subscribe(
			results => this.onDataLoadBin(results), //sending Location
			error => this.onDataLoadFailed(error));
	}
	private onDataLoadBin(getBinList: any) {
		this.loadingIndicator = false;
		this.allBins = getBinList; //cha
	}
	binValueSelect(data) {
		//All the data in structure
	}

	private loadSiteData()  //retriving SIte Information
	{
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.siteService.getSiteList().subscribe(   //Getting Site List Hear
			results => this.onSaiteDataLoadSuccessful(results[0]), //Pasing first Array and calling Method
			error => this.onDataLoadFailed(error)
		);
	}
	private onSaiteDataLoadSuccessful(getSiteList: Site[]) { //Storing Site Data
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getSiteList; //need
		this.allSites = getSiteList; //Contain first array of Loaded table Data will put in Html as [value]
	}
	private onManagemtntdataLoad(getAtaMainList: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getAtaMainList;
		this.allManagemtninfo = getAtaMainList;
		for (let i = 0; i < this.allManagemtninfo.length; i++) {

			if (this.allManagemtninfo[i].parentId == null) {
				this.maincompanylist.push(this.allManagemtninfo[i]);

			}
		}
    }
	private loadManagementdata() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService1.getManagemententity().subscribe(
			results => this.onManagemtntdataLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
}