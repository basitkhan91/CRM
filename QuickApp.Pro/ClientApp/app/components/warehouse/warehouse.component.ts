﻿import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { fadeInOut } from '../../services/animations';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AuditHistory } from '../../models/audithistory.model';
import { ATAMain } from '../../models/atamain.model';
import { AtaMainService } from '../../services/atamain.service';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { MasterCompany } from '../../models/mastercompany.model'
import { AuthService } from '../../services/auth.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageSeverity, AlertService } from '../../services/alert.service';
import { SiteService } from '../../services/site.service';
import { WarehouseService } from '../../services/warehouse.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { Site } from '../../models/site.model';
import { Warehouse } from '../../models/warehouse.model';
import { TreeNode, MenuItem } from 'primeng/api';
import { LegalEntityService } from '../../services/legalentity.service';
@Component({
    selector: 'app-warehouse',
    templateUrl: './warehouse.component.html',
	styleUrls: ['./warehouse.component.scss'],
	animations: [fadeInOut]
})
/** warehouse component*/
export class WarehouseComponent implements OnInit, AfterViewInit{
	disableSaveSiteName: boolean;

	public sourceWarehouse: any = {};

	addressId: any;
	wareHouseID: any;

	wareHouseName: any;
	siteName: any;
	memo: any = "";

	address1: any="";
	address2: any="";
	address3: any="";
	city: any="";
	state: any="";
	country: any="";
	postalCode: any="";
	
	createdBy: any = "";
	updatedBy: any = "";
	createdDate: any = "";
	updatedDate: any = "";

	siteId: any;
	warehouseId: any;
	name: any;

	countrycollection: any;
	countryName: string;
	allCountryinfo: any[];
	
	localCollection: any[] = [];
	
	private isEditMode: boolean = false;
	private isDeleteMode: boolean = false;
	dataSource: MatTableDataSource<any>;
	showLable: boolean;
	closeCmpny: boolean = true;
	loadingIndicator: boolean;
	modal: NgbModalRef;
	action_name: any = "";
	private isSaving: boolean;
	actionName: string;
	allComapnies: MasterCompany[] = [];
	public auditHisory: AuditHistory[] = [];
	allActions: Warehouse[] = [];
	displayedColumns = ['siteId', 'name', 'siteName', 'address1', 'address2', 'address3', 'city', 'stateOrProvince', 'country', 'postalCode','memo'];
	selectedColumn: Site[];
	selectedColumns: any[];
	cols: any[];
	warehouse_Name: any = "";
    allWareHouses: any[];
    stateOrProvince: any;
    zipCode: any;
	localWareHouseCollction: any[];
	allSites: any[]=[];
    selectedSiteIdValue: string;
    selectedSiteIdNumber: Number;
    allAddress: any[]=[];
	showAddress: boolean;

	gridData: TreeNode[];//Managemnt
	gridData1: TreeNode[];//Managemnt
	gridData2: TreeNode[];//Managemnt

	cols1: any[];
    allManagemtninfo: any[];
    selectedNodeTest: any;
    localManagementWarehouseCollection: any;
	showManagement: boolean;
	Active: string = "Active";
    localSiteManagementWarehouseCollection: any;
	actionamecolle: any[] = [];
	disableSaveManufacturer: boolean = false;
    selectedWareHouse: any;
    warehouseName: any;

	ngOnInit(): void
	{
		this.cols = [
			{ field: 'warehouseId', header: 'WareHosue Id' },
			{ field: 'name', header: 'Warehouse Name' },
			{ field: 'siteName', header: 'Site Name' },
			{ field: 'address1', header: 'Address Line 1' },
			{ field: 'address2', header: 'Address Line 2' },
			{ field: 'address3', header: 'Address Line 3' },
			{ field: 'city', header: 'City' },
			{ field: 'stateOrProvince', header: 'State' },
			{ field: 'country', header: 'Country' },
			{ field: 'postalCode', header: 'Zip Code' },
			{ field: 'memo', header: 'memo' }
			//{ field: 'createdBy', header: 'Created By' },
			//{ field: 'updatedBy', header: 'Updated By' },
			//{ field: 'updatedDate', header: 'Updated Date' },
			//{ field: 'createdDate', header: 'createdDate' }
		];

        this.loadData();
        this.loadManagementdata();//loading Management Data
		this.loadSiteData();
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-warehouse';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
		this.selectedColumns = this.cols;
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	
	


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	/** site ctor */
    constructor(public manageMentService: LegalEntityService,public workFlowtService1: SiteService,private breadCrumb: SingleScreenBreadcrumbService, private http: HttpClient, public ataservice: AtaMainService, private changeDetectorRef: ChangeDetectorRef, private router: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: WarehouseService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
		this.dataSource = new MatTableDataSource();
		this.sourceWarehouse = new Warehouse(); //change

	}

	closethis() {
		this.closeCmpny = false;
	}

	handleChange(rowData, e) {
		if (e.checked == false) {
			this.sourceWarehouse = rowData;
			this.sourceWarehouse.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceWarehouse.isActive == false;
			this.workFlowtService.updateWarehouse(this.sourceWarehouse).subscribe(
				response => this.saveCompleted(this.sourceWarehouse),
				error => this.saveFailedHelper(error));
			//alert(e);
		}
		else {
			this.sourceWarehouse = rowData;
			this.sourceWarehouse.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceWarehouse.isActive == true;
			this.workFlowtService.updateWarehouse(this.sourceWarehouse).subscribe(
				response => this.saveCompleted(this.sourceWarehouse),
				error => this.saveFailedHelper(error));
			//alert(e);
		}

	}

	siteValueChange(data) //Site Valu Selection in Form
	{
		this.showAddress = true;
		this.showManagement = true;
		console.log(this.sourceWarehouse.siteId);
		

		this.workFlowtService.getAddressDate(this.sourceWarehouse.siteId).subscribe( //calling and Subscribing for Address Data
			results => this.addressDataArray(results[0]),
			error => this.onDataLoadFailed(error)
		);

		this.workFlowtService.getManagementSiteData(this.sourceWarehouse.siteId).subscribe(
			data2 => {
				this.localSiteManagementWarehouseCollection = data2; //local SiteManagement Site Data for Site Date Selected
				this.gridData2 = this.makeNestedObj1(this.localSiteManagementWarehouseCollection, this.allManagemtninfo, null);
				this.selectedNodeTest = this.gridData2;
			})
		
	}

	selectedManagementSiteData(data: any)
	{

	}


	addressDataArray(data:any) //Getting Address
	{
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		if (data) {
		this.allAddress = data;
		this.address1 = data.address1;
		this.address2 = data.address2;
		this.address3 = data.address3;
		this.city = data.city;
		this.country = data.country;
		this.postalCode = data.postalCode;
		this.stateOrProvince = data.stateOrProvince;
		}
		 //Storing Address Details
		
	}

	public allWorkFlows: Warehouse[] = [];

	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getWarehouseList().subscribe( //change
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

		

		this.selectedColumns = this.cols;
	}

	//private loadSiteAddressData()
	//{
	//	this.alertService.startLoadingMessage();
	//	this.loadingIndicator = true;

	//	this.workFlowtService.getWarehouseList().subscribe( //change
	//		results => this.onDataLoadSuccessful(results[0]),
	//		error => this.onDataLoadFailed(error)
	//	);
	//}

	private loadSiteData()  //retriving Information
	{
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService1.getSiteList().subscribe(   //Getting Site List Hear
			results => this.onSaiteDataLoadSuccessful(results[0]), //Pasing first Array and calling Method
			error => this.onDataLoadFailed(error)
		);

	}
	private onSaiteDataLoadSuccessful(getSiteList: Site[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getSiteList; //need
		this.allSites = getSiteList; //Contain first array of Loaded table Data will put in Html as [value]

		//console.log(this.allSites);
    }

    private loadManagementdata() //Loading Management Structure Data
    {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.manageMentService.getManagemententity().subscribe(
            results => this.onManagemtntdataLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
        this.selectedColumns = this.cols;
    }

    private onManagemtntdataLoad(getAtaMainList: any[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getAtaMainList;
        this.allManagemtninfo = getAtaMainList;
        //debugger;
        if (this.allManagemtninfo) {
            this.gridData = this.makeNestedObj(this.allManagemtninfo, null);
        }

        this.cols1 = [
            { field: 'code', header: 'Code' },
            { field: 'description', header: 'Description' },
            { field: 'legalEntityId', header: 'ID' },
        ];
    }

    makeNestedObj(arr, parent) {
        var out = []
        for (var i in arr) {
            if (arr[i].parentId == parent) {
                var children = this.makeNestedObj(arr, arr[i].managementStructureId)
                arr[i] = { "data": arr[i] };
                if (children.length) {
                    arr[i].children = children
                }
                out.push(arr[i])
            }
        }
        return out
	}

	makeNestedObj1(child, arr, parent) {

		var out = []
		if (child) {
			for (var i = 0; i < child.length; i++)
			{
				for (var j = 0; j < arr.length; j++)
				{
					if (arr[j].data)
					{
						if (child[i].managementStructureId == arr[j].data.managementStructureId)
						{
							arr[j].data.managementWarehouseId = child[i].managementWarehouseId;
							arr[j].data.warehouseId = child[i].warehouseId;
							out.push(arr[j]);
							console.log(arr[j].data);
							break;
						}
					}
					else if (child[i].managementStructureId == arr[j].managementStructureId)
					{
						arr[j].data.managementWarehouseId = child[i].managementWarehouseId;
						arr[j].data.warehouseId = child[i].warehouseId;
						out.push(arr[j]);
						console.log(arr[j].data);
						break;
					}

				}
			}
		}
		return out;
	}

    public saveManagement(warehouseId, data1) //retriving SiteManagement Array
    {
        debugger;
        for (let i = 0; i < data1.length; i++) {
            if (data1[i].data.managementStructureId != null) {
                data1[i].data.warehouseId = warehouseId;
                this.workFlowtService.newManagementWareHouse(data1[i].data).subscribe(data11 => {
					this.localManagementWarehouseCollection = data11; //local SiteManagement Data
                })
            }
		}
		this.loadData();
    }

    nodeSelect(event) {
        debugger;
        //event.node = selected node
        console.log("selected node", event, event.node);
	}

	Manufacturerdescription(event) {
		//
		if (this.allWareHouses) {

			for (let i = 0; i < this.actionamecolle.length; i++) {
				if (event == this.actionamecolle[i][0].warehouseName) {
					//this.sourceWarehouse.name = this.allWareHouses[i][0].name;
					this.disableSaveManufacturer = true;

					this.selectedWareHouse = event;
				}

			}
		}
	}

	ManufacturerHandler(event) //auto suzition start hear and value will pass to 
	{

		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedWareHouse) {
				if (value == this.selectedWareHouse.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSaveManufacturer = true;
				}
				else {
					this.disableSaveManufacturer = false;

				}
			}

		}
	}

	filtermanufacturer(event) // will call when we click droup down button
	{

		this.localCollection = [];
		for (let i = 0; i < this.allWareHouses.length; i++) {
			let warehouseName = this.allWareHouses[i].name;
			if (warehouseName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.actionamecolle.push([{
					"warehouseId": this.allWareHouses[i].warehouseId,
					"warehouseName": warehouseName
				}]),
					this.localCollection.push(warehouseName)

			}
		}
	}

    

	//ApplyFilter
	public applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue;
	}


	//Refresh
	private refresh() {
		// Causes the filter to refresh there by updating with recently added data.
		this.applyFilter(this.dataSource.filter);
	}

	//OnDataLoadSuccessful
	private onDataLoadSuccessful(getWarehouseList: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getWarehouseList; //cha
		this.allWareHouses = getWarehouseList; //cha
		//this.localWareHouseCollction = getWarehouseList;
		
		//console.log(this.allActions);


	}

	//OnDataLoadFailed
	private onDataLoadFailed(error: any) {
		// alert(error);
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

	}

	//OnDataMasterCompaniesLoadSuccessful
	private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allComapnies = allComapnies;

	}


	//LoadMasterCompanies
	private loadMasterCompanies() {


		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.masterComapnyService.getMasterCompanies().subscribe(
			results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}

	//Open
	open(content) {

		this.isEditMode = false;
		this.isDeleteMode = false;
		this.isSaving = true;
		
		this.loadMasterCompanies();

		this.sourceWarehouse = new Warehouse(); //chang
		this.loadManagementdata(); //Calling Management Data
		this.selectedNodeTest = []; //while Open new Node Data Should Be Empty
		this.disableSaveManufacturer = false;
		this.address1 = "";
		this.address2 = "";
		this.address3 = "";
		this.city = "";
		this.country = "";
		this.postalCode = "";
		this.stateOrProvince = "";
		this.name = "";

		this.name = "";

		

		this.modal = this.modalService.open(content, { size: 'lg' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	

	//OpenDelete
	openDelete(content, row) {

		this.isEditMode = false;
		this.isDeleteMode = true;
		this.sourceWarehouse = row;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}


	//OpenEdit
	openEdit(content, row) {

		this.isEditMode = true;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.showManagement = true;
		this.disableSaveManufacturer = false;
		this.sourceWarehouse = row;//chang
		if (row.siteId) {
			this.siteValueChange(row.siteId);
		}

		this.workFlowtService.getManagementWarehouseEditData(this.sourceWarehouse.warehouseId).subscribe(data11 => {
			this.localManagementWarehouseCollection = data11; //local SiteManagement Data for Edit Collection
			if (this.localManagementWarehouseCollection) {
				if (this.gridData) 
				{
					//this.gridData = this.makeNestedObj(this.localManagementWarehouseCollection, null);
					this.gridData1 = this.makeNestedObj1(this.localManagementWarehouseCollection, this.allManagemtninfo, null);
				}
				else {
					this.gridData = this.makeNestedObj(this.allManagemtninfo, null);
				}
			}
			this.selectedNodeTest = this.gridData1;
		})

		this.name = this.sourceWarehouse.name;
		this.modal = this.modalService.open(content, { size: 'lg' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	//OpenHist
	openHist(content, row) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.sourceWarehouse = row;
		this.workFlowtService.historyWarehouse(this.sourceWarehouse.warehouseId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));
	}

	//OpenView
	openView(content, row) {

		this.sourceWarehouse = row;
		this.warehouseId = row.WarehouseId;
		this.warehouse_Name = row.name;
		this.siteName = row.siteName;
		this.address1 = row.address1;
		this.address2 = row.address2;
		this.address3 = row.address3;
		this.city = row.city;
		this.stateOrProvince = row.stateOrProvince;
		this.country = row.country;
		this.postalCode = row.postalCode;
		this.memo = row.memo;
		this.createdBy = row.createdBy;
		this.updatedBy = row.updatedBy;
		this.createdDate = row.createdDate;
		this.updatedDate = row.updatedDate;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'lg' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	//OpenHelpText
	openHelpText(content) {
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	//DeleteItemAndCloseModel
	deleteItemAndCloseModel() {
		this.isSaving = true;
		this.sourceWarehouse.updatedBy = this.userName;
		this.workFlowtService.deleteWarehouse(this.sourceWarehouse.warehouseId).subscribe(
			response => this.saveCompleted(this.sourceWarehouse),
			error => this.saveFailedHelper(error));
		this.modal.close();
	}


	//OnHistoryLoadSuccessful
	private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {

		// debugger;
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

		this.auditHisory = auditHistory;


		this.modal = this.modalService.open(content, { size: 'lg' });

		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })


	}


	


	

	//SaveCompleted
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


	


	

	//SaveSuccessHelper
	private saveSuccessHelper(role?: any) {
		this.isSaving = false;
		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);
		this.loadData();
	}


	//DismissModel
	public dismissModel() {
		this.showAddress = false;
		this.isDeleteMode = false;
		this.isEditMode = false;
		this.modal.close();
	}

	//SaveSuccessCompleted
	private savesuccessCompleted(user?: any) {
		this.isSaving = false;


		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);



		this.loadData();
	}

	
	//GetUserName
	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}


	//SaveFailedHelper
	private saveFailedHelper(error: any) {
		this.isSaving = false;
		this.alertService.stopLoadingMessage();
		this.alertService.showStickyMessage("Save Error", "The below errors occured while saving your changes:", MessageSeverity.error, error);
		this.alertService.showStickyMessage(error, null, MessageSeverity.error);
	}


	//EditItem
	editItemAndCloseModel() {
		this.isSaving = true;

        if (this.isEditMode == false) {
			this.showAddress = false;
			this.showManagement = false;
            this.sourceWarehouse.createdBy = this.userName;
            this.sourceWarehouse.updatedBy = this.userName;
            this.sourceWarehouse.masterCompanyId = 1;
            this.sourceWarehouse.name = this.name;
            //this.sourceWarehouse.siteId = this.siteId;
            //this.sourceWarehouse.siteID = this.selectedSiteIdValue;
            this.workFlowtService.newWarehouse(this.sourceWarehouse).subscribe(data => {
               
            if (data != null) {
                this.saveManagement(data.warehouseId, this.selectedNodeTest); //pushing Site Management Need Site Value so after getting SiteId we are calling

            }
			})	
			this.loadData();
		}
		else {
			this.showAddress = true;
			this.showManagement = true;
			this.sourceWarehouse.updatedBy = this.userName;
			this.sourceWarehouse.name = this.name;
			this.sourceWarehouse.masterCompanyId = 1;
			this.workFlowtService.updateWarehouse(this.sourceWarehouse).subscribe(
				response => this.saveCompleted(this.sourceWarehouse),
				error => this.saveFailedHelper(error));

			this.workFlowtService.deleteManagementWarehouse(this.selectedNodeTest).subscribe(data => {
				//alert("getting delete");
			});
			this.saveManagement(this.selectedNodeTest[0].data.warehouseId, this.selectedNodeTest); // will call ManagementSite Edit Data
			this.selectedNodeTest = []; //after Edit making empty
		}

		this.modal.close();
		this.loadData();
	}

	
}