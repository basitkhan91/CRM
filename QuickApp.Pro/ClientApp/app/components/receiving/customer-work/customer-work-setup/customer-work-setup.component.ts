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
import { Router } from '@angular/router';


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
    sourceTimeLife: any = {};
    allCustomer: any[];
    allVendorList: any[];
    chargeName: any;
    allEmpActions: any[]=[];
    sourceAction: any;
    showRestrictQuantity: boolean;
    showFreeQuantity: boolean;
    showNormalQuantity: boolean = true;
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
    display: boolean;
    modelValue: boolean;
    alldata: any;
    firstNames: any[];
    workPhone: any[]=[];
    local: any;
    collectionofstockLineTimeLife: any;
    value: number;
    collectionofstockLine: any;
    showLable: boolean;
    showCustomer: boolean;
    showOther: boolean;
    showVendor: boolean;
    showCompany: boolean;
    showCustomer1: boolean;
    showOther1: boolean;
    showVendor1: boolean;
    showCompany1: boolean;
    showCustomer2: boolean;
    showOther2: boolean;
    showVendor2: boolean;
    showCompany2: boolean;
    obtainFrom: string;
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
        this.loadDataCustomerconct();
        this.loadManagementdata();
        if (!this.sourcereceving.receivingCustomerWorkId) {
            this.sourcereceving.receivingCustomerNumber = 'Creating';
        }

	}

    constructor(private _route: Router,public workFlowtService: CustomerService,private conditionService: ConditionService, public workFlowtService1: LegalEntityService, private siteService: SiteService, private binService: BinService, private vendorservice: VendorService, public employeeService: EmployeeService, private alertService: AlertService, public itemser: ItemMasterService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, public receivingCustomerWorkService: ReceivingCustomerWorkService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private customerservices: CustomerService) {
        this.dataSource = new MatTableDataSource();
        if (this.receivingCustomerWorkService.isEditMode == false) {
            this.receivingCustomerWorkService.listCollection = {};
        }
        if (this.receivingCustomerWorkService.listCollection && this.receivingCustomerWorkService.isEditMode == true) {
            
            this.showLable = true;
            this.sourcereceving = this.receivingCustomerWorkService.listCollection;
            this.sourcereceving.serialNumber = this.receivingCustomerWorkService.listCollection.serialNumber;
            if (this.receivingCustomerWorkService.listCollection.customer) {
                this.sourcereceving.customerId = this.receivingCustomerWorkService.listCollection.customer.customerId;
                this.sourcereceving.name = this.receivingCustomerWorkService.listCollection.customer.name;
            }
            if (this.receivingCustomerWorkService.listCollection.employee) {
                this.sourcereceving.employeeId = this.receivingCustomerWorkService.listCollection.employee.employeeId;
                this.sourcereceving.firstName = this.receivingCustomerWorkService.listCollection.employee.firstName;
            }
            //this.sourcereceving.timeLifeCyclesId = this.collectionofstockLineTimeLife.timeLifeCyclesId;
            if (this.receivingCustomerWorkService.listCollection.ti) {
                this.sourceTimeLife = this.receivingCustomerWorkService.listCollection.ti;
            }
            if (this.sourcereceving.serialNumber) {
                this.sourcereceving.isSerialized = true;
            }

            if (this.sourcereceving.serialNumber == null) {
                this.sourcereceving.isSerialized = false;
            }
            if (this.sourcereceving.siteId) {
                this.binService.getWareHouseDate(this.sourcereceving.siteId).subscribe(
                    results => this.onDataLoadWareHouse(results),
                    error => this.onDataLoadFailed(error)
                );
            }
            if (this.sourcereceving.warehouseId) {
                this.binService.getLocationDate(this.sourcereceving.warehouseId).subscribe(
                    results => this.onDataLoadLocation(results),
                    error => this.onDataLoadFailed(error)
                );
            }
            if (this.sourcereceving.locationId) {
                this.binService.getShelfDate(this.sourcereceving.locationId).subscribe(
                    results => this.onDataLoadShelf(results),
                    error => this.onDataLoadFailed(error)
                );
            }

            if (this.sourcereceving.shelfId) {
                this.binService.getBinDataById(this.sourcereceving.shelfId).subscribe(
                    results => this.onDataLoadBin(results),
                    error => this.onDataLoadFailed(error));
            }

            if (this.sourcereceving.timeLifeDate) {
                this.sourcereceving.timeLifeDate = new Date(this.sourcereceving.timeLifeDate);
            }
            else {
                this.sourcereceving.timeLifeDate = new Date();
            }

            if (this.sourcereceving.manufacturingDate) {
                this.sourcereceving.manufacturingDate = new Date(this.sourcereceving.manufacturingDate);
            }
            else {
                this.sourcereceving.manufacturingDate = new Date();
            }
            if (this.sourcereceving.tagDate) {
                this.sourcereceving.tagDate = new Date(this.sourcereceving.tagDate);
            }
            else {
                this.sourcereceving.tagDate = new Date();
            }

            if (this.sourcereceving.expirationDate) {
                this.sourcereceving.expirationDate = new Date(this.sourcereceving.expirationDate);
            }
            else {
                this.sourcereceving.expirationDate = new Date();
            }

            switch (this.sourcereceving.obtainFromType)
            {
                case 1: {
                    this.showCustomer1 = true;
                    break;
                }
                case 2: {
                    this.showOther1 = true;
                    break;
                }
                case 3: {
                    this.showVendor1 = true;
                    break;
                }
                case 4: {
                    this.showCompany1 = true;
                    break;
                }
            }

            switch (this.sourcereceving.ownerType) {
                case 1: {
                    this.showCustomer2 = true;
                    break;
                }
                case 2: {
                    this.showOther2 = true;
                    break;
                }
                case 3: {
                    this.showVendor2 = true;
                    break;
                }
                case 4: {
                    this.showCompany2 = true;
                    break;
                }
            }

            switch (this.sourcereceving.traceableToType) {
                case 1: {
                    this.showCustomer = true;
                    break;
                }
                case 2: {
                    this.showOther = true;
                    break;
                }
                case 3: {
                    this.showVendor = true;
                    break;
                }
                case 4: {
                    this.showCompany = true;
                    break;
                }
            }
        }

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
	
	openHelpText(content) {
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
    
    saveCustomerwork() {
        
        if (!(this.sourcereceving.partNumber && this.sourcereceving.partDescription && this.sourcereceving.siteId && this.sourcereceving.customerId) ) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.sourcereceving.partNumber && this.sourcereceving.partDescription && this.sourcereceving.siteId && this.sourcereceving.customerId)) {

            this.isSaving = true;

            if (!this.sourcereceving.receivingCustomerWorkId) {
                this.sourcereceving.createdBy = this.userName;
                this.sourcereceving.updatedBy = this.userName;
                this.sourcereceving.masterCompanyId = 1;
                if ((this.sourceTimeLife != null) || (this.sourceTimeLife != "null")) {
                    if (this.sourcereceving.isTimeLife) {
                        this.receivingCustomerWorkService.newStockLineTimeLife(this.sourceTimeLife).subscribe(data => {
                            this.collectionofstockLineTimeLife = data;
                            this.sourcereceving.timeLifeCyclesId = data.timeLifeCyclesId;
                            this.value = 1;
                            if (this.sourcereceving.isSerialized == null || this.sourcereceving.isSerialized == false) {
                                this.sourcereceving.serialNumber = '';
                                this.sourcereceving.certifiedBy = '';
                                this.sourcereceving.tagDate = '';
                                this.sourcereceving.tagType = '';
                                this.sourcereceving.partCertificationNumber = '';
                            }
                            if (this.sourcereceving.isTimeLife == null || this.sourcereceving.isTimeLife == false) {
                                this.sourcereceving.timeLifeDate = '';
                                this.sourcereceving.timeLifeOrigin = '';
                            }
                            this.receivingCustomerWorkService.newReason(this.sourcereceving).subscribe(
                                role => this.saveSuccessHelper(role),
                                error => this.saveFailedHelper(error));
                            this.sourcereceving = {};
                        })
                    }

                    else {
                        this.receivingCustomerWorkService.newReason(this.sourcereceving).subscribe(
                            role => this.saveSuccessHelper(role),
                            error => this.saveFailedHelper(error));
                    }
                    this.sourcereceving = {};
                    this._route.navigateByUrl('receivingmodule/receivingpages/app-customer-works-list');
                }
            }

            else {
                if ((this.sourcereceving.isTimeLife) && (this.sourcereceving.timeLifeCyclesId == null || this.sourcereceving.timeLifeCyclesId == undefined)) {
                 
                    this.receivingCustomerWorkService.newStockLineTimeLife(this.sourceTimeLife).subscribe(data => {
                        this.collectionofstockLine = data;
                        this.sourcereceving.timeLifeCyclesId = data.timeLifeCyclesId;
                        this.value = 1;
                        if (data != null) {
                            this.receivingCustomerWorkService.updateReason(this.sourcereceving).subscribe(
                                response => this.saveCompleted(this.sourcereceving),
                                error => this.saveFailedHelper(error));
                        }
                    })
                }
                else {
                    this.receivingCustomerWorkService.updateReason(this.sourcereceving).subscribe(
                        response => this.saveCompleted(this.sourcereceving),
                        error => this.saveFailedHelper(error));
                    this.receivingCustomerWorkService.updateStockLineTimelife(this.sourceTimeLife).subscribe(data => {
                        this.collectionofstockLine = data;
                    })
                }

                this.sourcereceving = {};
                this._route.navigateByUrl('receivingmodule/receivingpages/app-customer-works-list');
            }
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

    filterFirstNames(event) {

        this.firstNames = [];
        for (let i = 0; i < this.allActions.length; i++) {
            let firstName = this.allActions[i].firstName;
        
            if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.firstNames.push(firstName);

            }
        }
    }

    filterContacts(event) {

        this.workPhone = [];
        if (this.allActions) {
            if (this.allActions.length > 0) {
                for (let i = 0; i < this.allActions.length; i++) {
                    let workPhone = this.allActions[i].workPhone;
                    if (workPhone.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                        this.workPhone.push(workPhone);
                    }
                }
            }
        }
    }

    private onDataLoadSuccessfulCustomer(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allActions = allWorkFlows;


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

    private loadDataCustomerconct() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getContactsFirstName().subscribe(
            results => this.onDataLoadSuccessfulCustomer(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

	partnmId(event) {
		//
		if (this.itemclaColl) {
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
		this.sourcereceving.partDescription = allWorkFlows[0].partDescription;
        this.sourcereceving.isSerialized = allWorkFlows[0].isSerialized;

        this.sourcereceving.isTimeLife = allWorkFlows[0].isTimeLife;
		if (this.sourcereceving.isSerialized == true) {
			this.showRestrictQuantity = true;
			this.showFreeQuantity = false;
            this.showNormalQuantity = false; 
            this.sourcereceving.expirationDate = allWorkFlows[0].expirationDate;
		}
		else {
			this.showRestrictQuantity = false;
			this.showFreeQuantity = true;
            this.showNormalQuantity = false;
            this.sourcereceving.serialNumber = '';
            this.sourcereceving.certifiedBy = '';
            this.sourcereceving.tagDate = '';
            this.sourcereceving.tagType = '';
            this.sourcereceving.partCertificationNumber = '';
            this.sourcereceving.expirationDate = '';
        }
        
        if (this.sourcereceving.isTimeLife == true) {
            this.sourcereceving.isTimeLife = true;
            this.sourcereceving.timeLifeDate = '';
            this.sourcereceving.timeLifeOrigin = '';
        }
        else {
            this.sourcereceving.isTimeLife == false;
            this.sourcereceving.timeLifeCyclesId = '';
        }

        if (allWorkFlows[0].isTimeLife == null) {
            this.sourcereceving.timeLife = false;
            this.sourceTimeLife.timeLifeDate = '';
            this.sourceTimeLife.timeLifeOrigin = '';
         
        }
        else {
            this.sourcereceving.timeLife = allWorkFlows[0].isTimeLife;
        }
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

    customerNameId(event) {
        //
        if (this.allCustomer) {
            for (let i = 0; i < this.allCustomer.length; i++) {
                if (event == this.allCustomer[i].name) {
                    this.sourcereceving.customerId = this.allCustomer[i].customerId;
                    this.selectedActionName = event;
                }
            }
            this.customerservices.getDescriptionbypart(event).subscribe(
                results => this.oncustomernumberloadsuccessfull(results[0]),
                error => this.onDataLoadFailed(error)
            );
        }
    }
    customerContactId(event) {
        //
        if (this.allActions) {
            for (let i = 0; i < this.allActions.length; i++) {
                if (event == this.allActions[i].firstName) {
                    this.sourcereceving.contactId = this.allActions[i].contactId;
                    this.sourcereceving.customerContactName = this.allActions[i].firstName;
                    this.selectedActionName = event;
                }
            }
        }
    }

    empnameId(event) {
        //
        if (this.allEmployeeinfo) {
            for (let i = 0; i < this.allEmployeeinfo.length; i++) {
                if (event == this.allEmployeeinfo[i].firstName) {
                    this.sourcereceving.employeeId = this.allEmployeeinfo[i].employeeId;
                    this.selectedActionName = event;
                }
            }
            //this.customerservices.getDescriptionbypart(event).subscribe(
            //    results => this.oncustomernumberloadsuccessfull(results[0]),
            //    error => this.onDataLoadFailed(error)
            //);
        }
    }

    private oncustomernumberloadsuccessfull(allWorkFlows: any[]) {
      // this.sourcereceving.customerReference = this.allCustomer[i][0].contractReference;
        
    }

    getTracabletoType(value)
    {
        if (value == 1)
        {
            this.showCustomer = true;
            this.showOther = false;
            this.showVendor = false;
            this.showCompany = false;
        }
        if (value == 2) {
            this.showCustomer = false;
            this.showOther = true;
            this.showVendor = false;
            this.showCompany = false;
        }
        if (value == 3) {
            this.showCustomer = false;
            this.showOther = false;
            this.showVendor = true;
            this.showCompany = false;
        }
        if (value == 4) {
            this.showCustomer = false;
            this.showOther = false;
            this.showVendor = false;
            this.showCompany = true;
        }
    }


    getObtaintoType(value) {
        if (value == 1) {
            this.showCustomer1 = true;
            this.showOther1 = false;
            this.showVendor1 = false;
            this.showCompany1 = false;
        }
        if (value == 2) {
            this.showCustomer1 = false;
            this.obtainFrom = '';
            this.showOther1 = true;
            this.showVendor1 = false;
            this.showCompany1 = false;
        }
        if (value == 3) {
            this.showCustomer1 = false;
            this.showOther1 = false;
            this.showVendor1 = true;
            this.showCompany1 = false;
        }
        if (value == 4) {
            this.showCustomer1 = false;
            this.showOther1 = false;
            this.showVendor1 = false;
            this.showCompany1 = true;
        }
    }
    getOwnerType(value) {
        if (value == 1) {
            this.showCustomer2 = true;
            this.showOther2 = false;
            this.showVendor2 = false;
            this.showCompany2 = false;
        }
        if (value == 2) {
            this.showCustomer2 = false;
            this.showOther2= true;
            this.showVendor2 = false;
            this.showCompany2 = false;
        }
        if (value == 3) {
            this.showCustomer2 = false;
            this.showOther2 = false;
            this.showVendor2 = true;
            this.showCompany2 = false;
        }
        if (value == 4) {
            this.showCustomer2 = false;
            this.showOther2 = false;
            this.showVendor2 = false;
            this.showCompany2 = true;
        }
    }
}