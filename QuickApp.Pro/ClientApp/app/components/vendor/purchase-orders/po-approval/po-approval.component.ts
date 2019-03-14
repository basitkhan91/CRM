import { Component, OnInit } from '@angular/core';
//import { WorkflowEditComponent } from '../../../workflow/workflow-edit/workflow-edit.component';
import { VendorService } from '../../../../services/vendor.service';
import { PriorityService } from '../../../../services/priority.service';
import { CreditTermsService } from '../../../../services/Credit Terms.service';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { AlertService } from '../../../../services/alert.service';

@Component({
    selector: 'app-po-approval',
    templateUrl: './po-approval.component.html',
    styleUrls: ['./po-approval.component.scss']
})
/** po-approval component*/
export class PoApprovalComponent implements OnInit {
	issuedToAddress: any;
	addressData: any[] = [];
	selectedValue: any;
	allPriorityInfo: any[];
	sourcePoApproval: any = {};
	localCollection: any;
	maincompanylist: any[] = [];
	bulist: any[] = [];
	bulistovh: any[] = [];
	departmentList: any[] = [];
	departmentListovh: any[] = [];
	divisionlist: any[] = [];
	divisionlistovh: any[] = [];
	
	allManagemtninfo: any[] = [];
	allcreditTermInfo: any[]=[];
    VendorNamecoll: any[]=[];
    disableSaveVenName: boolean;
    disableSave: boolean;
    disableSaveVenderName: boolean;
    selectedActionName: any;
    vendorNames: any[];
    allActions: any[]=[];
    loadingIndicator: boolean;
    vendorId: any;
    selectedVendorCode: any;
    VendorCodesColl: any[]=[];
    vendorCodes: any[];
    allgeneralInfo: any[];
	/** po-approval ctor */
	constructor(public workFlowtService1: LegalEntityService, public CreditTermsService: CreditTermsService, public workFlowtService: VendorService, public priority: PriorityService, private alertService: AlertService) {
		if (workFlowtService.vendorForPoCollection != null) {
			this.localCollection = workFlowtService.vendorForPoCollection;
			this.sourcePoApproval = this.localCollection;
			console.log(this.localCollection)
		}
		this.workFlowtService.ShowPtab = false;

		this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab);
	}
	ngOnInit() {
		this.priorityData();
		this.loadCreditTermsData();
		this.loadManagementdata();
		this.getAddresses();
	}
	private priorityData() {

		this.priority.getPriorityList().subscribe(
			results => this.onprioritySuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private getAddresses() {
		this.workFlowtService.getAddressDtails().subscribe(data => {
		
			this.addressData = data[0];
		});
		
	}
	getValue(data) {
		//debugger;
		this.issuedToAddress = data;
		console.log(data);
	}

	private loadManagementdata() {
		

		this.workFlowtService1.getManagemententity().subscribe(
			results => this.onManagemtntdataLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);


	}
	private onManagemtntdataLoad(getAtaMainList: any[]) {
		// alert('success');
		
		this.allManagemtninfo = getAtaMainList;
		for (let i = 0; i < this.allManagemtninfo.length; i++) {

			if (this.allManagemtninfo[i].parentId == null) {
				this.maincompanylist.push(this.allManagemtninfo[i]);

			}

			//console.log(this.maincompanylist);
		}


	}
	getBUList(masterCompanyId) {
		this.bulist = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == masterCompanyId) {
				this.bulist.push(this.allManagemtninfo[i]);
			}
		}
		
		console.log(this.bulist);

	}

	getDepartmentlist(buid) {
		this.departmentList= [];
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == buid) {
				this.departmentList.push(this.allManagemtninfo[i]);
			}
		}
		
		console.log(this.departmentList);
	}
	getDivisionlist(depid) {
		this.divisionlist = [];
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].parentId == depid) {
				this.divisionlist.push(this.allManagemtninfo[i]);
			}
		}
		
		console.log(this.divisionlist);
	}
	private onprioritySuccessful(getPriorityList: any[]) {
		
		this.allPriorityInfo = getPriorityList;
	}
	private onDataLoadFailed(error: any) {
		

	}
	private loadCreditTermsData() {
		// debugger;
		
		this.CreditTermsService.getCreditTermsList().subscribe(
			results => this.onCreditTermsdata(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}
	private onCreditTermsdata(getCreditTermsList: any[]) {
		
	
		this.allcreditTermInfo = getCreditTermsList;
	}

	onVendorselected(event) {
		//debugger;
		for (let i = 0; i < this.VendorNamecoll.length; i++) {
			if (event == this.VendorNamecoll[i][0].vendorName) {
				//alert("Action Name already Exists");
				this.disableSaveVenName = true;
				this.disableSave = true;
				this.disableSaveVenderName = true;
				this.selectedActionName = event;
			}

		}
		//this.workFlowtService.getvendorList(event).subscribe(
		//	results => this.onvendorloadsuccessfull(results[0]),
		//	error => this.onDataLoadFailed(error)
		//);
	}

	eventHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedActionName) {
				if (value == this.selectedActionName.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSaveVenderName = true;
					this.disableSaveVenName = true;
				}
				else {
					this.disableSaveVenderName = false;
					this.disableSaveVenName = false;
				}
			}

		}
	}

	filterVendorNames(event) {

		this.vendorNames = [];
		for (let i = 0; i < this.allActions.length; i++) {
			let vendorName = this.allActions[i].vendorName;
			if (vendorName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				//this.vendorNames.push(vendorName);
				this.VendorNamecoll.push([{
					"vendorId": this.allActions[i].vendorClassificationId,
					"vendorName": vendorName
				}]),
					this.vendorNames.push(vendorName);
			}
		}
	}

	private onDataLoadSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = allWorkFlows;
		this.allActions = allWorkFlows;
		this.vendorId = this.allActions[0].vendorId;
		//console.log(this.allActions);


	}
	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getWorkFlows().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);


	}

	eventvendorHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedVendorCode) {
				if (value == this.selectedVendorCode.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSaveVenName = true;
					this.disableSaveVenderName = true;

				}
				else {
					this.disableSaveVenName = false;
					this.disableSaveVenderName = false;

				}
			}

		}


	}

	onVendorCodeselected(event) {
		//debugger;
		for (let i = 0; i < this.VendorCodesColl.length; i++) {
			if (event == this.VendorCodesColl[i][0].vendorCode) {

				this.disableSaveVenName = true;
				this.disableSaveVenderName = true;
				this.selectedVendorCode = event;
			}
		}
	}

	filterVendorCodes(event) {

		this.vendorCodes = [];
		for (let i = 0; i < this.allActions.length; i++) {
			let vendorCode = this.allActions[i].vendorCode;

			if (vendorCode.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				//this.vendorCodes.push(vendorCode);
				this.VendorCodesColl.push([{
					"vendorId": this.allActions[i].vendorClassificationId,
					"vendorCode": vendorCode
				}]),
					this.vendorCodes.push(vendorCode);

			}
		}
	}

	private ongeneralDataLoadSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = allWorkFlows;
		this.allgeneralInfo = allWorkFlows;
		//this.vendorname = this.allgeneralInfo[0].vendorName;
		//this.vendorCode = this.allgeneralInfo[0].vendorCode;
		//console.log(this.allgeneralInfo);


	}
}