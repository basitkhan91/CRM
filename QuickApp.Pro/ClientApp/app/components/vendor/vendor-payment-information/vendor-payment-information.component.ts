import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { fadeInOut } from '../../../services/animations';
import { MasterCompany } from '../../../models/mastercompany.model';
import { AuditHistory } from '../../../models/audithistory.model';
import { AuthService } from '../../../services/auth.service';
import { MessageSeverity, AlertService } from '../../../services/alert.service';
import { VendorService } from '../../../services/vendor.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { Vendor } from '../../../models/vendor.model';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { GMapModule } from 'primeng/gmap';
import * as $ from 'jquery';
import { getObjectById, editValueAssignByCondition } from '../../../generic/autocomplete';
import { VendorStepsPrimeNgComponent } from '../vendor-steps-prime-ng/vendor-steps-prime-ng.component';
import { ConfigurationService } from '../../../services/configuration.service';
declare const google: any;

@Component({
	selector: 'app-vendor-payment-information',
	templateUrl: './vendor-payment-information.component.html',
	styleUrls: ['./vendor-payment-information.component.scss'],
	animations: [fadeInOut]
})
/** VendorPaymentInformation component*/
export class VendorPaymentInformationComponent implements OnInit, AfterViewInit {

	modelValue: boolean;
	display: boolean;
	defaultPaymentStyle: boolean = true;
	defaultPaymentValue: boolean = true;
	activeIndex: number = 5;
	showcountry: boolean;
	showpostalCode: boolean;
	showstateOrProvince: boolean;
	showCity: boolean;
	showAddress1: boolean;
	showSiteName: boolean;
	alldata: any;
	step: string;
	internationalwithVendor: any[];
	defaultwithVendor: any[];
	domesticWithVedor: any[];
	checkAddress: boolean = false;
	vendorCode: any = "";
	vendorname: any = "";
	allgeneralInfo: any[];
	collection: any;
	action_name: any = "";
	allAddresses: any[];
	addressId: any;
	memo: any = "";
	createdBy: any = "";
	updatedBy: any = "";
	createddate: any = "";
	updatedDate: any = "";
	viewName: string = "Create";
	sub: any;
	local: any;
	closeCmpny: boolean = true;
	service: boolean = false;
	public checkValue: boolean = false;
	public domasticWireValue: boolean = false;
	public internationalValue: boolean = false;
	public checkStyle: boolean = false;
	public domesticWireStyle: boolean = false;
	public internationalStyle: boolean = false;
	//vendorId: any;
	updatedCollection: {};
	siteName: any;
	address1: any;
	address2: any;
	isPrimary: boolean = false;
	city: any;
	stateOrProvince: any;
	postalCode: number;
	country: any;
	defaultPaymentMethod: number;
	disablesaveforCountry: boolean;
	disablesavefoInternalrCountry: boolean;
	disablesaveforBeneficiary: boolean;
	selectedRowforDelete: any;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	filteredBrands: any[];
	displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
	dataSource: MatTableDataSource<any>;
	allActions: any[] = [];
	allComapnies: MasterCompany[] = [];
	private isSaving: boolean;
	public sourceVendor: any = {};
	public domesticSaveObj: any = {};
	public internationalSaveObj: any = {};
	public defaultSaveObj: any = {};
	public defaultPaymentObj: any = {};
	public sourceAction: any = [];
	public auditHisory: AuditHistory[] = [];
	private bodyText: string;
	loadingIndicator: boolean;
	closeResult: string;
	selectedColumn: any[];
	selectedColumns: any[] = [];
	cols: any[];
	title: string = "Create";
	id: number;
	errorMessage: any;
	modal: NgbModalRef;
	actionName: string;
	Active: string = "Active";
	length: number;
	localCollection: any[] = [];
	//options: any;
	public overlays: any[];
	allCountryinfo: any[];
	disablesave: boolean;
	countrycollection: any;
	selectedCountries: any;
	private isEditMode: boolean = false;
	private isDeleteMode: boolean = false;
	isEditPaymentInfo: boolean = false;
	pageSize: number = 10;
	@Input() vendorId: number = 0;
	@Input() isViewMode: boolean = false;
	isvendorEditMode: any;
	formData = new FormData();
	disableSave: boolean = true;
	constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef, private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public vendorService: VendorService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private configurations: ConfigurationService) {

		if (this.vendorService.listCollection !== undefined) {
			this.vendorService.isEditMode = true;
		}

		if (this.vendorService.financeCollection) {
			this.local = this.vendorService.financeCollection;
		}
		if (this.defaultPaymentMethod == 1) {
			this.showPament();
		}
		if (this.defaultPaymentMethod == 2) {
			this.showDomesticWire();
		}

		this.cols = [
			{ field: 'siteName', header: 'Site Name' },
			{ field: 'address1', header: 'Address1' },
			{ field: 'address2', header: 'Address2' },
			{ field: 'city', header: 'City' },
			{ field: 'stateOrProvince', header: 'State/Prov' },
			{ field: 'postalCode', header: 'Postal Code' },
			{ field: 'countryName', header: 'Country' },
			{ field: 'isPrimayPayment', header: 'IsPrimary' }
		];
		this.selectedColumns = this.cols;

		this.countrylist();
		this.dataSource = new MatTableDataSource();
		if (this.local) {
			this.vendorService.contactCollection = this.local;
		}
		if (this.vendorService.generalCollection) {
			this.local = this.vendorService.generalCollection;
		}
		if (this.vendorService.listCollection && this.vendorService.isEditMode == true) {
			this.viewName = "Edit";
			this.local = this.vendorService.listCollection;
			this.loadData();

		}
		if (this.vendorService.generalCollection) {
			this.local = this.vendorService.generalCollection;
			this.sourceVendor.siteName = this.local.vendorName;
			this.sourceVendor.address1 = this.local.address1;
			this.sourceVendor.address2 = this.local.address2;
			this.sourceVendor.address3 = this.local.address3;
			this.sourceVendor.city = this.local.city;
			this.sourceVendor.country = this.local.country;
			this.sourceVendor.stateOrProvince = this.local.stateOrProvince;
			this.sourceVendor.postalCode = this.local.PostalCode;
		}
		if (this.vendorService.listCollection && this.vendorService.isEditMode == true) {
			this.viewName = "Edit";
			this.local = this.vendorService.listCollection;
			this.loadData();
		}
	}

	ngOnInit() {
		this.vendorService.currentEditModeStatus.subscribe(message => {
			this.isvendorEditMode = message;
		});
		this.defaultSaveObj.defaultPaymentMethod = 1;
		this.countrylist();
		if (this.local) {

			this.loadData();
			this.defaultPaymentValue = true;
			this.getDomesticWithVendorId();
			this.InternatioalWithVendorId();
			this.DefaultWithVendorId();
			this.showDefault();

		}
		//this.countrylist();
		// this.options = {
		// 	center: { lat: 36.890257, lng: 30.707417 },
		// 	zoom: 12
		// };
		this.getbencus();
		if (this.vendorId != 0) {
			this.loadData();
		} else {
			this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-payment-information';
			this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);
		}

	}

	ngAfterViewInit() {
	}
	public allWorkFlows: any[] = [];
	private getgeneralInnfo() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.vendorService.getWorkFlows().subscribe(
			results => this.ongeneralDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	check() {
		this.checkValue = true;
		this.domasticWireValue = false;
		this.internationalValue = false;
		this.defaultPaymentValue = false;

		this.checkStyle = true;
		this.domesticWireStyle = false;
		this.internationalStyle = false;
		this.defaultPaymentStyle = false;
	}

	domesticWire() {
		this.checkValue = false;
		this.domasticWireValue = true;
		this.internationalValue = false;
		this.defaultPaymentValue = false;

		this.checkStyle = false;
		this.domesticWireStyle = true;
		this.internationalStyle = false;
		this.defaultPaymentStyle = false;
	}
	internationalWire() {
		this.checkValue = false;
		this.domasticWireValue = false;
		this.internationalValue = true;
		this.defaultPaymentValue = false;

		this.checkStyle = false;
		this.domesticWireStyle = false;
		this.internationalStyle = true;
		this.defaultPaymentStyle = false;
	}
	defaultPayment() {
		this.checkValue = false;
		this.domasticWireValue = false;
		this.internationalValue = false;
		this.defaultPaymentValue = true;

		this.checkStyle = false;
		this.domesticWireStyle = false;
		this.internationalStyle = false;
		this.defaultPaymentStyle = true;
	}

	showDomesticWire() {
		this.domesticWire();
	}
	showPament() {
		this.check();
	}

	showInternational() {
		this.internationalWire();
	}

	showDefault() {
		this.defaultPayment();
	}

	private getDomesticWithVendorId() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.vendorService.getDomesticvedor(this.local.vendorId).subscribe(
			results => this.onDomestciLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	private InternatioalWithVendorId() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.vendorService.getInternationalWire(this.local.vendorId).subscribe(
			results => this.onInternatioalLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private DefaultWithVendorId() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.vendorService.getDefaultlist(this.local.vendorId).subscribe(
			results => this.onDefaultLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}


	private countrylist() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.vendorService.getCountrylist().subscribe(
			results => this.onDatacountrySuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onDatacountrySuccessful(allWorkFlows: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allCountryinfo = allWorkFlows;
	}


	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		const vendorId = this.vendorId != 0 ? this.vendorId : this.local.vendorId;
		this.vendorService.getCheckPaymentobj(vendorId).subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	public getbencus() {
		this.vendorService.getBeneficiaryCustomer().subscribe(
			results => this.onBencustomerLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);
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
	handleChange(rowData, e) {
		if (e.checked == false) {
			this.sourceVendor = rowData;
			this.sourceVendor.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceVendor.isActive == false;
			this.vendorService.updateActiveforpayment(this.sourceVendor).subscribe(
				response => this.saveCompleted(this.sourceVendor),
				error => this.saveFailedHelper(error));
			this.sourceVendor = "";
		}
		else {
			this.sourceVendor = rowData;
			this.sourceVendor.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceVendor.isActive == true;
			this.vendorService.updateActiveforpayment(this.sourceVendor).subscribe(
				response => this.saveCompleted(this.sourceVendor),
				error => this.saveFailedHelper(error));
			this.sourceVendor = "";
		}
	}

	private refresh() {
		this.applyFilter(this.dataSource.filter);
	}
	private onDataLoadSuccessful(allWorkFlows: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allActions = allWorkFlows;
	}
	private onBencustomerLoad(allWorkFlows: any) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.alldata = allWorkFlows;
	}
	private ongeneralDataLoadSuccessful(allWorkFlows: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allgeneralInfo = allWorkFlows;
		this.vendorname = this.allgeneralInfo[0].vendorName;
		this.vendorCode = this.allgeneralInfo[0].vendorCode;
		console.log(this.allgeneralInfo);
	}

	private onDomestciLoad(allWorkFlows: any) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.domesticWithVedor = allWorkFlows;
		if (this.domesticWithVedor.length > 0) {
			this.domesticSaveObj = allWorkFlows[0];

			if (this.domesticSaveObj.country != null) {
				this.domesticSaveObj.country = getObjectById('countries_id', this.domesticSaveObj.country, this.allCountryinfo);
			}
		}
	}
	private onInternatioalLoad(allWorkFlows: any) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.internationalwithVendor = allWorkFlows;
		if (this.internationalwithVendor.length > 0) {

			this.internationalSaveObj = allWorkFlows[0];

			if (this.internationalSaveObj.country != null) {
				this.internationalSaveObj.country = getObjectById('countries_id', this.internationalSaveObj.country, this.allCountryinfo);
			}



		}
	}

	private onDefaultLoad(allWorkFlows: any) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.defaultwithVendor = allWorkFlows;

		if (allWorkFlows) {
			this.defaultSaveObj = allWorkFlows;
			if (this.defaultSaveObj.defaultPaymentMethod == 1) {
				this.showPament();
			}
			else if (this.defaultSaveObj.defaultPaymentMethod == 2) {
				this.showDomesticWire();
			}
			else if (this.defaultSaveObj.defaultPaymentMethod == 3) {
				this.showInternational();
			}
			else {
				this.showPament();
			}

		}
	}


	private loadPaymentObject() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.vendorService.getPaymentObj().subscribe(
			results => this.onPaymentObjUrl(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onPaymentObjUrl(allWorkFlows: any) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.sourceVendor = allWorkFlows;
	}
	filterActions(event) {
		this.localCollection = [];
		for (let i = 0; i < this.allActions.length; i++) {
			let actionName = this.allActions[i].description;
			if (actionName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.localCollection.push(actionName);
			}
		}
	}
	filterbencus(event) {
		this.localCollection = [];
		for (let i = 0; i < this.alldata.length; i++) {
			let actionName = this.alldata[i].beneficiaryCustomer;
			if (actionName) {
				if (actionName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.localCollection.push(actionName);
				}
			}
		}
	}

	private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.auditHisory = auditHistory;
		this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allComapnies = allComapnies;
	}

	private onDataLoadFailed(error: any) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
	}

	open(content) {
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.actionName = "";
		this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}


	openDelete(content, row) {

		if (!row.isPrimary) {


			this.isEditMode = false;
			this.isDeleteMode = true;
			this.sourceVendor = row;
			this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
			this.modal.result.then(() => {
				console.log('When user closes');
			}, () => { console.log('Backdrop click') })
		} else {
			$('#deletePayment').modal('show');
		}
	}

	openEdit(row) {
		this.isEditMode = true;
		this.isSaving = true;
		this.sourceVendor = { ...row, country: getObjectById('countries_id', row.country, this.allCountryinfo) };
		this.loadMasterCompanies();
		this.isEditPaymentInfo = true;
	}
	openView(content, row) {

		this.sourceVendor = row;
		this.siteName = row.siteName;
		this.address1 = row.address1;
		this.address2 = row.address2;
		this.isPrimary = row.isPrimayPayment ? row.isPrimayPayment : false;
		this.city = row.city;
		this.stateOrProvince = row.stateOrProvince;
		this.postalCode = row.postalCode;
		this.country = row.countryName;
		this.createdBy = row.createdBy;
		this.updatedBy = row.updatedBy;
		this.createddate = row.createdDate;
		this.updatedDate = row.updatedDate;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	openHelpText(content) {
		this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openHist(content, row) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.sourceVendor = row;
		this.isSaving = true;
		this.vendorService.paymentHist(this.sourceVendor.checkPaymentId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));
	}

	// toggledbldisplay(data) {
	// 	this.sourceVendor = data;
	// }

	private onAddressDataLoadSuccessful(alladdress: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = alladdress;
		this.allAddresses = alladdress;
		this.addressId = this.allAddresses[0].addressId;
	}

	private loadAddressDara() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.vendorService.getAddressDtails().subscribe(
			results => this.onAddressDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	// getlatlng(address) {
	// 	this.checkAddress = true;
	// 	return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB_W96L25HhFWgqLblcikircQKjU6bgTgk').subscribe((data: any) => {
	// 		this.options = {
	// 			center: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng },
	// 			zoom: 50
	// 		};
	// 		this.overlays = [
	// 			new google.maps.Marker({ position: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }, title: "" }),

	// 			new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
	// 			new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
	// 		];
	// 		return data;
	// 	});
	// }

	onBlurMethod(data) {
		if (data == 'siteName') {
			this.showSiteName = false;
		}
		if (data == 'address1') {
			this.showAddress1 = false;
		}
		if (data == 'city') {
			this.showCity = false;
		}
		if (data == 'stateOrProvince') {
			this.showstateOrProvince = false;

		}
		if (data == 'postalCode') {
			this.showpostalCode = false;
		}
		if (data == 'country') {
			this.showcountry = false;
		}
	}

	saveCheckPaymentInfo() {
		// this.loadData();
		this.isSaving = true;
		if (!(this.sourceVendor.siteName && this.sourceVendor.address1 && this.sourceVendor.city &&
			this.sourceVendor.stateOrProvince && this.sourceVendor.postalCode && this.sourceVendor.country
		)) {
			this.display = true;
			this.modelValue = true;
		}

		if (this.sourceVendor.siteName && this.sourceVendor.address1 && this.sourceVendor.city &&
			this.sourceVendor.stateOrProvince && this.sourceVendor.postalCode && this.sourceVendor.country) {
			if (!this.sourceVendor.checkPaymentId && !this.sourceVendor.vendorId) {
				this.sourceVendor.createdBy = this.userName;
				this.sourceVendor.updatedBy = this.userName;
				this.sourceVendor.masterCompanyId = 1;
				this.sourceVendor.isActive = true;
				this.sourceVendor.vendorId = this.local.vendorId;
				this.sourceVendor.country = editValueAssignByCondition('countries_id', this.sourceVendor.country);
				this.vendorService.addCheckinfo(this.sourceVendor).subscribe(data => {
					this.loadData();
					this.localCollection = data;
					this.savesuccessCompleted(this.sourceVendor);
					this.sourceVendor = new Object();
					this.updateVendorCheckPayment(this.localCollection);
					this.sourceVendor = {};
				})
			}
			else {
				this.sourceVendor.createdBy = this.userName;
				this.sourceVendor.updatedBy = this.userName;
				this.sourceVendor.updatedBy = this.userName;
				this.sourceVendor.masterCompanyId = 1;
				this.sourceVendor.vendorId = this.local.vendorId;
				this.sourceVendor.country = editValueAssignByCondition('countries_id', this.sourceVendor.country);
				this.vendorService.updateCheckPaymentInfo(this.sourceVendor).subscribe(data => {
					if (data) { this.sourceVendor = new Object(); }
					this.updatedCollection = data;
					this.loadData();
				})
				this.saveCompleted(this.sourceVendor);
				this.sourceVendor = {};
			}
		}
		else {
		}
		$('#addPaymentInfo').modal('hide');
	}


	saveDomesticPaymentInfo() {
		this.isSaving = true;
		if (!(this.domesticSaveObj.aba && this.domesticSaveObj.accountNumber && this.domesticSaveObj.bankName
		)) {
			this.display = true;
			this.modelValue = true;
		}
		if (this.domesticSaveObj.aba && this.domesticSaveObj.accountNumber && this.domesticSaveObj.bankName) {
			if (!this.domesticSaveObj.domesticWirePaymentId && !this.sourceVendor.vendorId) {
				this.sourceVendor.createdBy = this.userName;
				this.sourceVendor.updatedBy = this.userName;
				this.sourceVendor.masterCompanyId = 1;
				this.sourceVendor.isActive = true;
				this.sourceVendor.vendorId = this.local.vendorId;
				this.domesticSaveObj.country = editValueAssignByCondition('countries_id', this.domesticSaveObj.country);
				this.vendorService.addDomesticinfo(this.domesticSaveObj).subscribe(data => {
					this.loadData();
					this.localCollection = {
						...data, createdBy: this.userName,
						updatedBy: this.userName
					};
					this.savesuccessCompleted(this.sourceVendor);
					this.sourceVendor = new Object();
					this.updateVendorDomesticWirePayment(this.localCollection);
				})
			}
			else {
				this.sourceVendor.updatedBy = this.userName;
				this.sourceVendor.masterCompanyId = 1;
				this.domesticSaveObj.country = editValueAssignByCondition('countries_id', this.domesticSaveObj.country);
				this.vendorService.updateDomesticBankPaymentinfo(this.domesticSaveObj).subscribe(
					response => this.saveCompleted(this.sourceVendor),
					error => this.saveFailedHelper(error));
			}
			this.showDomesticWire();
			this.domasticWireValue = true;
			this.internationalValue = false;
		}
		// this.domesticSaveObj = {};

	}

	saveInternationalPaymentInfo() {
		this.isSaving = true;
		if (!(this.internationalSaveObj.swiftCode)) {
			this.display = true;
			this.modelValue = true;
		}
		if (this.internationalSaveObj.swiftCode) {
			if (!this.internationalSaveObj.internationalWirePaymentId && !this.sourceVendor.vendorId) {
				this.sourceVendor.createdBy = this.userName;
				this.sourceVendor.updatedBy = this.userName;
				this.sourceVendor.masterCompanyId = 1;
				{ }
				// this.internationalSaveObj.country = editValueAssignByCondition('countries_id', this.internationalSaveObj.country);
				this.vendorService.addInternationalinfo({
					...this.internationalSaveObj,
					country: editValueAssignByCondition('countries_id', this.internationalSaveObj.country),
				}).subscribe(data => {
					this.localCollection = {
						...data, createdBy: this.userName,

						updatedBy: this.userName
					};
					this.vendorService.paymentCollection = this.local;
					// this.activeIndex = 4;
					// this.vendorService.indexObj.next(this.activeIndex);
					this.savesuccessCompleted(this.sourceVendor);
					this.updateVendorInternationalWirePayment(this.localCollection);
				})
			}
			else {

				this.sourceVendor.updatedBy = this.userName;
				this.sourceVendor.masterCompanyId = 1;
				// this.internationalSaveObj.country = editValueAssignByCondition('countries_id', this.internationalSaveObj.country);
				this.vendorService.vendorInternationalUpdate({
					...this.internationalSaveObj,
					country: editValueAssignByCondition('countries_id', this.internationalSaveObj.country),
				}).subscribe(
					data => {
						this.vendorService.paymentCollection = this.local;
						this.saveCompleted(this.sourceVendor);
					})
			}
			this.showInternational();
			this.internationalValue = true;
			this.defaultPaymentValue = false;
		}
		// this.internationalSaveObj = {};
	}

	saveDefaultPaymentInfo() {

		if (this.defaultSaveObj.vendorPaymentId > 0) {

			this.defaultPaymentObj.vendorPaymentId = this.defaultSaveObj.vendorPaymentId;
			this.defaultPaymentObj.vendorId = this.defaultSaveObj.vendorId;
			this.defaultPaymentObj.updatedBy = this.userName;
			this.defaultPaymentObj.masterCompanyId = 1;
			this.defaultPaymentObj.isActive = true;
			this.defaultPaymentObj.defaultPaymentMethod = this.defaultSaveObj.defaultPaymentMethod;

			this.vendorService.vendorDefaultUpdate(this.defaultPaymentObj).subscribe(
				data => {
					this.vendorService.paymentCollection = this.local;
					this.saveCompleted(this.sourceVendor);
				})
		}
		else {

			this.defaultPaymentObj.createdBy = this.userName;
			this.defaultPaymentObj.updatedBy = this.userName;
			this.defaultPaymentObj.masterCompanyId = 1;
			this.defaultPaymentObj.vendorId = this.local.vendorId;
			this.defaultPaymentObj.defaultPaymentMethod = this.defaultSaveObj.defaultPaymentMethod;
			this.defaultPaymentObj.isActive = true;

			this.vendorService.addDefaultinfo(this.defaultPaymentObj).subscribe(data => {
				// this.activeIndex = 3;
				// this.vendorService.indexObj.next(this.activeIndex);
				this.savesuccessCompleted(this.sourceVendor);
			})
		}
	}



	// deleteItemAndCloseModel(checkPaymentId) {
	//     this.isSaving = true;
	//     this.sourceVendor.isActive = false;
	//     this.sourceVendor.updatedBy = this.userName;
	// 	this.vendorService.deleteCheckPayment(checkPaymentId).subscribe(
	//         response => this.saveCompleted(this.sourceVendor),
	//         error => this.saveFailedHelper(error));
	// }

	deletePaymentInfo(rowData) {
		this.selectedRowforDelete = rowData;
	}

	deleteConformation(value) {
		if (value === 'Yes') {
			this.vendorService.deleteCheckPayment(this.selectedRowforDelete.checkPaymentId).subscribe(() => {
				this.loadData();
				this.alertService.showMessage(
					'Success',
					`Action was deleted successfully`,
					MessageSeverity.success
				);
			})
		} else {
			this.selectedRowforDelete = undefined;
		}
	}

	updateVendorCheckPayment(updateObj: any) {
		this.vendorService.updateVendorCheckpayment(updateObj, this.local.vendorId).subscribe(data => {
			this.loadData();
		})
	}

	updateVendorDomesticWirePayment(updateObj: any) {

		this.vendorService.updateVendorDomesticWirePayment(updateObj, this.local.vendorId).subscribe(data => {
			this.loadData();
		})
	}


	updateVendorInternationalWirePayment(updateObj: any) {
		this.vendorService.updateVendorInternationalWirePayment(updateObj, this.local.vendorId).subscribe(data => {
			this.loadData();
		})
	}
	previousClick() {
		this.activeIndex = 4;
		this.vendorService.changeofTab(this.activeIndex);
		// this.vendorService.indexObj.next(this.activeIndex);
		// this.vendorService.changeStep('Financial Information');
		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-financial-information');
	}
	nextClick() {
		this.vendorService.contactCollection = this.local;
		this.activeIndex = 6;
		this.vendorService.changeofTab(this.activeIndex);
		// this.vendorService.indexObj.next(this.activeIndex);
		// this.vendorService.changeStep('Shipping Information');
		this.alertService.showMessage(
			'Success',
			`${this.isvendorEditMode ? 'Updated' : 'Saved'}  Payment Information Sucessfully `,
			MessageSeverity.success
		);
		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-shipping-information');
		//this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-billing-information');
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

	onInternalBankCountrieselected(event) {
		if (this.allCountryinfo) {
			for (let i = 0; i < this.allCountryinfo.length; i++) {
				if (event == this.allCountryinfo[i].nice_name) {
					this.sourceVendor.nice_name = this.allCountryinfo[i].nice_name;
					this.disablesavefoInternalrCountry = false;
					this.selectedCountries = event;
				}
			}
		}
	}
	eventInternalBankCountryHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedCountries) {
				if (value == this.selectedCountries.toLowerCase()) {
					this.disablesavefoInternalrCountry = false;
				}
				else {
					this.disablesavefoInternalrCountry = true;
				}
			}

		}
	}
	private savesuccessCompleted(user?: any) {
		this.isSaving = false;
		this.alertService.showMessage("Success", `Action was saved successfully`, MessageSeverity.success);
		this.loadData();
	}

	private saveSuccessHelper(role?: any) {
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
	dismissModel() { this.modal.close(); }
	handleChanges(rowData, e) {

		if (e.checked == false) {
			this.sourceVendor.checkPaymentId = rowData.checkPaymentId;
			this.sourceVendor.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceVendor.isActive = false;
			this.vendorService.updateActiveforpayment(this.sourceVendor).subscribe(
				response => this.saveCompleted(this.sourceVendor),
				error => this.saveFailedHelper(error));
		}
		else {
			this.sourceVendor.checkPaymentId = rowData.checkPaymentId;
			this.sourceVendor.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceVendor.isActive = true;
			this.vendorService.updateActiveforpayment(this.sourceVendor).subscribe(
				response => this.saveCompleted(this.sourceVendor),
				error => this.saveFailedHelper(error));
		}

	}
	onCountrieselected(event) {
		if (this.allCountryinfo) {
			for (let i = 0; i < this.allCountryinfo.length; i++) {
				if (event == this.allCountryinfo[i].nice_name) {
					this.sourceVendor.nice_name = this.allCountryinfo[i].nice_name;
					this.disablesave = false;
					this.selectedCountries = event;
				}
			}
		}
	}
	eventCountryHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedCountries) {
				if (value == this.selectedCountries.toLowerCase()) {
					this.disablesave = false;
				}
				else {
					this.disablesave = true;
				}
			}

		}
	}
	filtercountry(event) {

		// this.countrycollection = [];
		// if (this.allCountryinfo) {
		// 	for (let i = 0; i < this.allCountryinfo.length; i++) {
		// 		let countryName = this.allCountryinfo[i].nice_name;
		// 		if (countryName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
		// 			this.countrycollection.push(countryName);
		// 		}
		// 	}
		// }
		this.countrycollection = this.allCountryinfo;
		if (event.query !== undefined && event.query !== null) {
			const countries = [...this.allCountryinfo.filter(x => {
				return x.nice_name.toLowerCase().includes(event.query.toLowerCase())
			})]
			this.countrycollection = countries;
		}
	}

	onBankCountrieselected(event) {
		if (this.allCountryinfo) {
			for (let i = 0; i < this.allCountryinfo.length; i++) {
				if (event == this.allCountryinfo[i].nice_name) {
					this.sourceVendor.nice_name = this.allCountryinfo[i].nice_name;
					this.disablesaveforCountry = false;
					this.selectedCountries = event;
				}
			}
		}
	}
	eventBankCountryHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedCountries) {
				if (value == this.selectedCountries.toLowerCase()) {
					this.disablesaveforCountry = false;
				}
				else {
					this.disablesaveforCountry = true;
				}
			}

		}
	}


	onBeneficiaryselected(event) {
		if (this.alldata) {
			for (let i = 0; i < this.alldata.length; i++) {
				if (event == this.alldata[i].beneficiaryCustomer) {
					this.sourceVendor.beneficiaryCustomer = event;
					this.disablesaveforBeneficiary = false;
					this.selectedCountries = event;
					break;
				}
			}
		}
	}
	eventBeneficiaryHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedCountries) {
				if (value == this.selectedCountries.toLowerCase()) {
					this.disablesaveforBeneficiary = false;
				}
				else {
					this.disablesaveforBeneficiary = true;
				}
			}

		}
	}

	onAddPaymentInfo() {
		this.sourceVendor = {};
		this.isEditPaymentInfo = false;
	}

	getPageCount(totalNoofRecords, pageSize) {
		return Math.ceil(totalNoofRecords / pageSize)
	}
	pageIndexChange(event) {
		this.pageSize = event.rows;
	}

	getVendorName() {


		if (this.local !== undefined) {
			return editValueAssignByCondition('vendorName', this.local.vendorName) === undefined ? '' : editValueAssignByCondition('vendorName', this.local.vendorName);
		} else {
			return '';
		}
	}


	getColorCodeForHistory(i, field, value) {
		const data = this.auditHisory;
		const dataLength = data.length;
		if (i >= 0 && i <= dataLength) {
			if ((i + 1) === dataLength) {
				return true;
			} else {
				return data[i + 1][field] === value
			}
		}
	}


	sampleExcelDownload() {
		const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=VendorPaymentInfo&fileName=VendorPaymentInfo.xlsx`;
		window.location.assign(url);
	}

	customExcelUpload(event) {
		const file = event.target.files;

		if (file.length > 0) {
			this.formData.append('file', file[0])
			this.vendorService.PaymentCheckUpload(this.formData, this.local.vendorId).subscribe(res => {
				event.target.value = '';

				this.formData = new FormData();
				this.loadData();

				this.alertService.showMessage(
					'Success',
					`Successfully Uploaded  `,
					MessageSeverity.success
				);
			})
		}
	}
	enableSave() {
		this.disableSave = false;

	}
}