import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { Site } from '../../models/site.model';
import { LegalEntityService } from '../../services/legalentity.service';
import { TreeNode, MenuItem } from 'primeng/api';
import { ConfigurationService } from '../../services/configuration.service';
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";

@Component({
	selector: 'app-site',
	templateUrl: './site.component.html',
	styleUrls: ['./site.component.scss'],
	animations: [fadeInOut]
})
/** site component*/
export class SiteComponent implements OnInit, AfterViewInit {
	disableSaveSiteName: boolean;
	sourceSite: Site;
	siteId: any;
	siteName: any;
	address1: any;
	address2: any;
	address3: any;
	city: any;
	state: any;
	country: any;
	postalCode: any;
	memo: any = "";
	createdBy: any = "";
	updatedBy: any = "";
	createdDate: any = "";
	updatedDate: any = "";
	name: any;
	addressId: any;
	countrycollection: any;
	countryName: string;
	allCountryinfo: any[];

	localCollection: any[] = [];
	totalRecords: number;
	rows: number;

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
	allSites: Site[] = [];
	displayedColumns = ['SiteId', 'name', 'Address1', 'Address2', 'Address3', 'City', 'StateOrProvince', 'Country', 'PostalCode', 'Memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
	selectedColumn: Site[];
	selectedColumns: any[];
	cols: any[];
	site_Name: any = "";
	selectedActionName: any;
	disableSave: boolean;
	stateOrProvince: any;
	allManagemtninfo: any[];
	gridData: TreeNode[];//Managemnt
	gridData1: TreeNode[];//Managemnt
	cols1: any[];
	localSelectedManagement: any[] = [];
	selectedManagementValues: any;
	index: any;
	selectedNodes3: any;
	selectedNodeTest: TreeNode[];
	siteInfo: Site;
	localManagementSiteCollection: any;
	localManagementSiteEditCollection: TreeNode[];
	Active: string = "Active";
	actionamecolle: any[] = [];
	selectedSiteName: any;
	disableSaveManufacturer: boolean;
	selectedSite: any;
	siteNamecolle: any;
	AuditDetails: any[];
	HasAuditDetails: boolean;
	AuditHistoryTitle: string = 'History of Site'
	totelPages: number;
	formData: FormData; 
	uploadedRecords: Object;

	ngOnInit(): void {

		//This Headers will Place in Html
		this.cols = [

			{ field: 'siteId', header: 'Site ID' },
			{ field: 'name', header: 'Site Name' },
			{ field: 'address1', header: 'Address Line 1' },
			{ field: 'address2', header: 'Address Line 2' },
			{ field: 'address3', header: 'Address Line 3' },
			{ field: 'city', header: 'City' },
			{ field: 'stateOrProvince', header: 'State' },
			{ field: 'country', header: 'Country' },
			{ field: 'postalCode', header: 'Zip Code' },
			{ field: 'memo', header: 'memo' }
		];

		this.loadData(); //Calling Method
		this.loadManagementdata(); //Calling Management Data
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-site';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
		this.selectedColumns = this.cols;
		this.HasAuditDetails = false;
		this.formData = new FormData();
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	/** site ctor */
    constructor(public manageMentService: LegalEntityService, private configurations: ConfigurationService, private breadCrumb: SingleScreenBreadcrumbService, private http: HttpClient, public ataservice: AtaMainService, private changeDetectorRef: ChangeDetectorRef, private router: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: SiteService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
		this.dataSource = new MatTableDataSource();
		this.sourceSite = new Site();

	}

	closethis() {
		this.closeCmpny = false;
    }
    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=Site&fileName=Site.xlsx`;

        window.location.assign(url);
    }


	public allWorkFlows: Site[] = [];

	private loadData()  //retriving Information
	{
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getSiteList().subscribe(
			results => this.onDataLoadSuccessful(results[0]), //Pasing first Array and calling Method
			error => this.onDataLoadFailed(error)
		);

	}

	//private atamaindata() {
	//	this.alertService.startLoadingMessage();
	//	this.loadingIndicator = true;

	//	this.ataservice.getAtaMainList().subscribe(onloadmaster
	//		results => this.onSuccessful(results[0]),
	//		error => this.onDataLoadFailed(error)
	//	);
	//}

	//private onSuccessful(getAtaMainList: ATAMain[]) {
	//	// alert('success');
	//	this.alertService.stopLoadingMessage();
	//	this.loadingIndicator = false;
	//	//this.dataSource.data = getAtaMainList;
	//	this.allATAMaininfo = getAtaMainList;
	//}

	handleChange(rowData, e) {
		if (e.checked == false) {
			this.sourceSite = rowData;
			this.sourceSite.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceSite.isActive == false;
			this.workFlowtService.updateSite(this.sourceSite).subscribe(
				response => this.saveCompleted(this.sourceSite),
				error => this.saveFailedHelper(error));
			//alert(e);
		}
		else {
			this.sourceSite = rowData;
			this.sourceSite.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceSite.isActive == true;
			this.workFlowtService.updateSite(this.sourceSite).subscribe(
				response => this.saveCompleted(this.sourceSite),
				error => this.saveFailedHelper(error));
			//alert(e);
		}

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
			{ field: 'name', header: 'Name' },
			{ field: 'description', header: 'Description' },

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
			for (var i = 0; i < child.length; i++) {
				for (var j = 0; j < arr.length; j++) {
					if (arr[j].data) {
						if (child[i].managementStructureId == arr[j].data.managementStructureId) {
							arr[j].data.managementSiteId = child[i].managementSiteId;
							arr[j].data.siteId = child[i].siteId;
							out.push(arr[j]);
							console.log(arr[j].data);
							break;
						}
					}
					else if (child[i].managementStructureId == arr[j].managementStructureId) {
						arr[j].data.managementSiteId = child[i].managementSiteId;
						arr[j].data.siteId = child[i].siteId;
						out.push(arr[j]);
						console.log(arr[j].data);
						break;

					}
				}
			}
		}
		return out;
	}

	nodeSelect(event) {
		debugger;
		//event.node = selected node
		console.log("selected node", event, event.node);
	}

	managementStructureClick(data) {
		console.log(this.selectedNodeTest);
		//this.localSelectedManagement.push(this.selectedNodeTest);
		//console.log(this.localSelectedManagement);
		//let j = this.localSelectedManagement.length; //for Getting Selected Data Based on Click Event
		//if (j > 0)
		//{
		//	let spliceed:boolean = true;
		//	for (let i in this.localSelectedManagement)
		//	{
		//		this.index = i;
		//		if (data.managementStructureId == this.localSelectedManagement[i].managementStructureId)
		//		{
		//			console.log("entered");
		//			console.log(this.index);
		//			this.localSelectedManagement.splice(this.index,1);
		//			spliceed = false;
		//		}
		//	}

		//	if (spliceed)
		//	{
		//		data.selectedManagementValues = true;
		//		this.localSelectedManagement.push(data);
		//	}


		//}
		//else
		//{
		//	data.selectedManagementValues = true;
		//	this.localSelectedManagement.push(data);
		//}

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
	private onDataLoadSuccessful(getSiteList: Site[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getSiteList;
		//need
		this.allSites = getSiteList; //Contain first array of Loaded table Data will put in Html as [value]
		this.totalRecords = this.allSites.length;
		//this.totelPages = Math.ceil(this.totalRecords / this.rows);
		//console.log(this.allSites);


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
		//Getting Master Company Data
		this.masterComapnyService.getMasterCompanies().subscribe(
			results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}

	//Open
	open(content) //it will Open Form and Creating New Site Object
	{
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.loadManagementdata();
		this.sourceSite = new Site();
		this.sourceSite.isActive = true;
		//Calling Management Data
		this.disableSaveManufacturer = false;
		this.sourceSite = new Site(); //Creating sourceSite Object and use in [(ngModel)]
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
		this.sourceSite = row;
		this.name = row.name
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	localManagementSiteCollectionEdit(data) {
		console.log(data);
	}
	//OpenEdit
	openEdit(content, row) {
		this.isEditMode = true;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.disableSaveManufacturer = false;
		this.sourceSite = row;
		//Getting ManagementSite Data
		this.workFlowtService.getManagementSiteEditData(this.sourceSite.siteId).subscribe(data11 => {
			this.localManagementSiteEditCollection = data11; //local SiteManagement Data for Edit Collection
			if (this.localManagementSiteEditCollection) {
				if (this.gridData) {
					//this.gridData = this.makeNestedObj(this.localManagementSiteEditCollection, null);
					this.gridData1 = this.makeNestedObj1(this.localManagementSiteEditCollection, this.allManagemtninfo, null);
				}
				else {
					this.gridData = this.makeNestedObj(this.allManagemtninfo, null);
				}
			}
			//this.selectedNodeTest = this.localManagementSiteEditCollection;
			this.selectedNodeTest = this.gridData1;
		})
		this.name = this.sourceSite.name;
		this.modal = this.modalService.open(content, { size: 'lg' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	//OpenHist
	openHist(content, row) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.sourceSite = row;
		this.workFlowtService.historySite(this.sourceSite.siteId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));
	}

	//OpenView
	openView(content, row) {
		this.sourceSite = row;
		this.name = row.name;
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

	Manufacturerdescription(event) {
		//
		if (this.allSites) {

			for (let i = 0; i < this.actionamecolle.length; i++) {
				if (event == this.actionamecolle[i][0].siteName) {
					//this.sourceSite.name = this.allSites[i][0].name;
					this.disableSaveManufacturer = true;

					this.selectedSite = event;
				}

			}
		}
	}

	ManufacturerHandler(event) //auto suzition start hear and value will pass to 
	{

		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedSite) {
				if (value == this.selectedSite.toLowerCase()) {
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
		for (let i = 0; i < this.allSites.length; i++) {
			let siteName = this.allSites[i].name;
			if (siteName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.actionamecolle.push([{
					"siteId": this.allSites[i].siteId,
					"siteName": siteName
				}]),
					this.localCollection.push(siteName)

			}
		}
	}





	//DeleteItemAndCloseModel
	deleteItemAndCloseModel() {
		this.isSaving = true;
		this.sourceSite.updatedBy = this.userName;
		this.workFlowtService.deleteSite(this.sourceSite.siteId).subscribe(
			response => this.saveCompleted(this.sourceSite),
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
	private saveCompleted(user?: Site) {
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

	public saveManagement(siteId, data1) //retriving SiteManagement Array
	{
		debugger;
		for (let i = 0; i < data1.length; i++) {
			if (data1[i].data.managementStructureId != null) {
				data1[i].data.siteId = siteId;
				this.workFlowtService.newManagementSite(data1[i].data).subscribe(data11 => {
					response => this.saveCompleted(this.sourceSite)
					error => this.saveFailedHelper(error)
					this.localManagementSiteCollection = data11;
					//local SiteManagement Data
				})
			}
		}

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
	SaveandEditsite() {
		this.isSaving = true;
		if (this.isEditMode == false) {
			this.sourceSite.createdBy = this.userName;
			this.sourceSite.updatedBy = this.userName;
			this.sourceSite.masterCompanyId = 1;
			this.sourceSite.name = this.name;
			this.workFlowtService.newSite(this.sourceSite).subscribe(data => {
				this.siteInfo = data;
				this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);
				response => this.saveCompleted(this.sourceSite)
				error => this.saveFailedHelper(error)
				//retrive after enter siteid get and submit managementsite
				if (data != null) {
					this.saveManagement(data.siteId, this.selectedNodeTest); //pushing Site Management Need Site Value so after getting SiteId we are calling
					this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);
					response => this.saveCompleted(this.sourceSite)
					error => this.saveFailedHelper(error)
				}
			})
			this.loadData();
		}
		else {

			this.sourceSite.updatedBy = this.userName;
			this.sourceSite.name = this.name;
			this.sourceSite.masterCompanyId = 1;
			this.workFlowtService.updateSite(this.sourceSite).subscribe(		

				this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success));

			if (this.selectedNodeTest && this.selectedNodeTest.length > 0) {
				this.workFlowtService.deleteManagementSite(this.selectedNodeTest).subscribe(data => {
				});
			}

			if (this.selectedNodeTest && this.selectedNodeTest.length > 0) {
				this.saveManagement(this.selectedNodeTest[0].data.siteId, this.selectedNodeTest); // will call ManagementSite Edit Data

			}
			this.selectedNodeTest = []; //after Edit making empty
		}

		this.modal.close();
		this.loadData();
	}

	showAuditPopup(template, id): void {
		this.auditAssetStatus(id);
		this.modal = this.modalService.open(template, { size: 'sm' });
	}

	auditAssetStatus(siteId: number): void {
		this.AuditDetails  = [];
		this.HasAuditDetails = this.AuditDetails.length > 0;
		this.workFlowtService.getSiteAudit(siteId).subscribe(audits => {
			if (audits.length > 0) {
				this.AuditDetails = audits[0].result;
				this.HasAuditDetails = this.AuditDetails.length > 0;
			}
		});
	}

	/* 
	    Bulk site upload
	*/

	bulkUpload(event) {

		this.formData = new FormData();

		this.uploadedRecords = null;

		const file = event.target.files;
		
        console.log(file);
		
		if (file.length > 0) {

			this.formData.append('file', file[0])
			
            this.workFlowtService.bulkUpload(this.formData).subscribe(response => {
				
				event.target.value = '';

                this.uploadedRecords = response;
				
				this.loadData();
				
                this.alertService.showMessage(
                    'Success',
                    `Successfully Uploaded  `,
                    MessageSeverity.success
                );
            })
        }

	}
	
}