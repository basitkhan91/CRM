import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
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
import { CustomerService } from '../../../services/customer.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { Customer } from '../../../models/customer.model';
//import { VendorClassificationComponent } from '../../vendor-classification/vendor-classification.component';
import { debounce } from 'rxjs/operators/debounce';
import { HttpClient } from '@angular/common/http';
import { GMapModule } from 'primeng/gmap';
import { Router } from '@angular/router';
declare const google: any;
@Component({
    selector: 'app-customer-billing-information',
    templateUrl: './customer-billing-information.component.html',
    //styleUrls: ['./customers-billing-information.component.scss'],
    animations: [fadeInOut]
})
/** anys component*/
export class CustomerBillingInformationComponent
{
    countryName: string;
    countrycollection: any[];
    allCountryinfo: any[];
	activeIndex: number;
	showCustomerSiteName: boolean;
	showCustomerBillToAddress1: boolean;
	showCustomerBillToAddress2: boolean;
	showCustomerBillToAddress3: boolean;
	showCustomerBillToCity: boolean;
	showCustomerBillToStateProv: boolean;
	showCustomerBillToPostalCode: boolean;
	showCustomerBillToCountry: boolean;
	customerBillingdetails: any;
	public overlays: any[]; //Prime Ng Google Map
	options: any; // Prime Ng Google Map
	billCollection: any;
	allBillDetails: any[];
	updatedCollection: {};
	customerBillingAddressdetails: any;
	local: any;
	addressId: any;
	allAddresses: any[];
	customerId: any;
	customerCode: any;
	customerName: any;
	allgeneralInfo: any[];
	action_name: any = "";
	memo: any = "";
	createdBy: any = "";
	updatedBy: any = "";
	createddate: any = "";
	updatedDate: any = "";
	billViaObj: any = {};
	checkAddress: boolean = false;
    disablesave: boolean;
    selectedCountries: any;
	sourcebillingInfo: any = {};
	ngOnInit(): void {

		this.workFlowtService.currentUrl = '/customersmodule/customerpages/app-customer-billing-information';
		this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);//Bread Crumb
		this.workFlowtService.ShowPtab = true;
		this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab); //steps
        this.countrieslist();

		if (this.local) {
            this.loadData();
           
		}
		this.options = {
			center: { lat: 36.890257, lng: 30.707417 },
			zoom: 12
		};

	}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	//@ViewChild('vendorclassificationcomponent') patientContactPopupModal: ModalDirective
	filteredBrands: any[];
	displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
	dataSource: MatTableDataSource<any>;
	allActions: any[] = [];
	allComapnies: MasterCompany[] = [];
	private isSaving: boolean;
    public sourceAction: any = {};
	public auditHisory: AuditHistory[] = [];
	private bodyText: string;
	loadingIndicator: boolean;
	closeResult: string;
	selectedColumn: any[];
	selectedColumns: any[];
	selectedShipViaColumn: any[];
	selectedShipViaColumns: any[];
	cols: any[];
	shipViacols: any[];
	title: string = "Create";
	id: number;
	errorMessage: any;
	modal: NgbModalRef;
	actionName: string;
	Active: string = "Active";
	length: number;
	localCollection: any[] = [];
	display: boolean = false; 
	modelValue: boolean = false;
	/** Actions ctor */

	private isEditMode: boolean = false;
	private isDeleteMode: boolean = false;

	constructor(private http: HttpClient, private router: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: CustomerService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {

		if (this.workFlowtService.financeCollection) {
			this.local = this.workFlowtService.financeCollection;
		}
		this.dataSource = new MatTableDataSource();
		if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
			this.local = this.workFlowtService.listCollection.t;
			//this.sourceCustomer = this.workFlowtService.listCollection.t;
		}
		this.dataSource = new MatTableDataSource();
		if (this.workFlowtService.generalCollection) {
			this.local = this.workFlowtService.generalCollection;
			this.sourceCustomer.siteName = this.local.name;
			this.sourceCustomer.address1 = this.local.address.line1;
			this.sourceCustomer.address2 = this.local.address.line2;
			this.sourceCustomer.address3 = this.local.address.line3;
			this.sourceCustomer.city = this.local.address.city;
			this.sourceCustomer.country = this.local.address.country;
			this.sourceCustomer.stateOrProvince = this.local.address.stateOrProvince;
			this.sourceCustomer.postalCode = this.local.address.postalCode;
		}
	}

	public sourceCustomer: any = {};

	ngAfterViewInit() {
		//this.dataSource.paginator = this.paginator;
		//this.dataSource.sort = this.sort;
	}
	getlatlng(address) {

		//debugger;
		this.checkAddress = true;
		return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB_W96L25HhFWgqLblcikircQKjU6bgTgk').subscribe((data: any) => {
			//alert(data);
			this.options = {
				center: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng },
				zoom: 12
			};
			this.overlays = [
				new google.maps.Marker({ position: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }, title: "Konyaalti" }),
				//new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: "Ataturk Park" }),
				//new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: "Oldtown" }),
				//new google.maps.Polygon({
				//    paths: [
				//        { lat: 36.9177, lng: 30.7854 }, { lat: 36.8851, lng: 30.7802 }, { lat: 36.8829, lng: 30.8111 }, { lat: 36.9177, lng: 30.8159 }
				//    ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
				//}),
				//new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
				//new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
			];
			return data;


		});
	}

	private getgeneralInnfo() {
	this.alertService.startLoadingMessage();
	this.loadingIndicator = true;

	this.workFlowtService.getWorkFlows().subscribe(
		results => this.ongeneralDataLoadSuccessful(results[0]),
		error => this.onDataLoadFailed(error)
	);
	}

	private ongeneralDataLoadSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allgeneralInfo = allWorkFlows;
		if (this.workFlowtService.isCOntact == true) {
			this.customerName = this.allgeneralInfo[0].customerName;
			this.customerCode = this.allgeneralInfo[0].customerCode;
		}
		//this.isEditMode = true;
		this.customerId = this.allgeneralInfo[0].customerId;
		console.log(this.allgeneralInfo);
	}
	
	private onAddressDataLoadSuccessful(alladdress: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = alladdress;
		this.allAddresses = alladdress;
		this.addressId = this.allAddresses[0].addressId;

    }

    private countrieslist() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getCountrylist().subscribe(
            results => this.onDatacountrySuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
	
	backClick() {
		this.workFlowtService.contactCollection = this.local;
		this.activeIndex = 2;
		this.workFlowtService.indexObj.next(this.activeIndex);
		//this.saveCompleted(this.sourceCustomer);
		this.router.navigateByUrl('/customersmodule/customerpages/app-customer-financial-information');

	}
    private onDatacountrySuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allCountryinfo = allWorkFlows;


        //console.log(this.allActions);


    }


    public dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }


	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

        this.workFlowtService.getCustomerBillViaDetails(this.local.customerId).subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

		this.cols = [

			{ field: 'siteName', header: 'Site Name' },
			{ field: 'address1', header: 'Address1' },
			{ field: 'address2', header: 'Address2' },
			{ field: 'address3', header: 'Address3' },
			{ field: 'city', header: 'City' },
			{ field: 'stateOrProvince', header: 'State/Prov' },
			{ field: 'postalCode', header: 'Postal Code' },
			{ field: 'country', header: 'Country' }

		];

		this.selectedColumns = this.cols;

	}

	private loadBillViaCollection(rowData) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getCustomerBillViaDetails(rowData).subscribe(
			results => this.onShipViadetails(results[0]),
			error => this.onDataLoadFailed(error)
		);

		this.shipViacols = [

			//{ field: 'siteName', header: 'Shipping SiteName' },
			{ field: 'shipVia', header: 'Ship Via' },
			{ field: 'shippingAccountinfo', header: 'Shipping Account Info' },
			{ field: 'shippingURL', header: 'Shipping Url' },
			{ field: 'shippingId', header: 'Shipping Id' },
			{ field: 'memo', header: 'Memo' }
		];

		this.selectedShipViaColumn = this.shipViacols;

	}

	openBillViaEdit(rowObject) {
		this.isEditMode = true;

		this.isSaving = true;
		this.billViaObj = rowObject;
		this.loadMasterCompanies();
	}

	private loadMasterCompanies() {


		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.masterComapnyService.getMasterCompanies().subscribe(
			results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}

	
	//openClassification(content) {
	//	this.vendorclasscmpnt.open(content);
	//}

	public applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue;
	}
	//handleChange(rowData, e) {
	//	if (e.checked == false) {
	//		this.sourceCustomer = rowData;
	//		this.sourceVendor.updatedBy = this.userName;
	//		this.Active = "In Active";
	//		this.sourceVendor.isActive == false;
	//		this.workFlowtService.updateshippinginfo(this.sourceVendor).subscribe(
	//		    response => this.saveCompleted(this.sourceVendor),
	//		    error => this.saveFailedHelper(error));
	//		alert(e);
	//	}
	//	else {
	//		this.sourceCustomer = rowData;
	//		this.sourceVendor.updatedBy = this.userName;
	//		this.Active = "Active";
	//		this.sourceVendor.isActive == true;
	//	  this.workFlowtService.updateshippinginfo(this.sourceVendor).subscribe(
	//		    response => this.saveCompleted(this.sourceVendor),
	//		    error => this.saveFailedHelper(error));
	//		alert(e);
	//	}

	//}

	handleChange(rowData, e) {
		if (e.checked == false) {
			this.sourceCustomer = rowData;
			this.sourceCustomer.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceCustomer.isActive == false;
			this.workFlowtService.updateActionforActiveforBilling(this.sourceCustomer).subscribe(
				response => this.saveCompleted(this.sourceCustomer),
				error => this.saveFailedHelper(error));
			//alert(e);
		}
		else {
			this.sourceCustomer = rowData;
			this.sourceCustomer.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceCustomer.isActive == true;
			this.workFlowtService.updateActionforActiveforBilling(this.sourceCustomer).subscribe(
				response => this.saveCompleted(this.sourceCustomer),
				error => this.saveFailedHelper(error));
			//alert(e);
		}

	}
	private refresh() {
		// Causes the filter to refresh there by updating with recently added data.
		this.applyFilter(this.dataSource.filter);
	}
	private onDataLoadSuccessful(allWorkFlows: any) {
		//debugger;
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allActions = allWorkFlows;
	}
	





	private onDataLoadFailed(error: any) {
		// alert(error);
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

	}

	private onShipViadetails(allWorkFlows: any) {
		//debugger;
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allBillDetails = allWorkFlows;
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

	private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allComapnies = allComapnies;

	}
	toggledbldisplay(data) {
		this.sourceCustomer = data;
	}

	open(content) {

		this.isEditMode = false;
		this.isDeleteMode = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		//this.sourceVendor.isActive = true;
		this.actionName = "";
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openDelete(content, row) {

		this.isEditMode = false;
		this.isDeleteMode = true;
		this.sourceCustomer = row;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openEdit(row) {

		this.isEditMode = true;

		this.isSaving = true;
		this.sourceCustomer = row;
		this.loadMasterCompanies();
		// this.actionName = this.sourceVendor.description;
		//this.modal = this.modalService.open(content, { size: 'sm' });
		//this.modal.result.then(() => {
		//    console.log('When user closes');
		//}, () => { console.log('Backdrop click') })
	}

	openView(content, row) {

		this.sourceCustomer = row;
		this.action_name = row.description;
		this.memo = row.memo;
		this.createdBy = row.createdBy;
		this.updatedBy = row.updatedBy;
		this.createddate = row.createdDate;
		this.updatedDate = row.updatedDate;
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

	openHist(content, row) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;


		this.billViaObj = row;


		this.isSaving = true;
		//debugger;
		this.workFlowtService.BillviaHistory(this.sourceCustomer.customerBillingAddressId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));


	}

	openShipaddressHistory(content, row) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;


		this.sourceCustomer = row;


		this.isSaving = true;
		//debugger;
		this.workFlowtService.billaddressHistory(this.sourceCustomer.customerBillingAddressId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));

	}
	
	private loadShipViaCollection(rowData) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getCustomerShipViaDetails(rowData).subscribe(
			results => this.onShipViadetails(results[0]),
			error => this.onDataLoadFailed(error)
		);

		this.shipViacols = [

			//{ field: 'siteName', header: 'Shipping SiteName' },
			{ field: 'shipVia', header: 'Ship Via' },
			{ field: 'shippingAccountinfo', header: 'Shipping Account Info' },
			{ field: 'shippingURL', header: 'Shipping Url' },
			{ field: 'shippingId', header: 'Shipping Id' },
			{ field: 'memo', header: 'Memo' }
		];

		this.selectedShipViaColumn = this.shipViacols;

	}
	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}

	onBlurMethod(data) {
		if (data == 'siteName') {
			this.showCustomerSiteName = false;
		}
		if (data == 'address1') {
			this.showCustomerBillToAddress1 = false;
		}
		
		if (data == 'city') {
			this.showCustomerBillToCity = false;
		}
		if (data == 'stateOrProvince') {
			this.showCustomerBillToStateProv = false;
		}
		if (data == 'postalCode') {
			this.showCustomerBillToPostalCode = false;
		}
		if (data == 'country') {
			this.showCustomerBillToCountry = false;
		}
		
	}

	sample() {
		if (!(this.sourceCustomer.siteName && this.sourceCustomer.address1 
			&& this.sourceCustomer.city && this.sourceCustomer.stateOrProvince && this.sourceCustomer.postalCode && this.sourceCustomer.country
			)) {
			this.display = true;
			this.modelValue = true;
		}
	}

    editItemAndCloseModel() {
        if (!(this.sourceCustomer.siteName && this.sourceCustomer.address1 
            && this.sourceCustomer.city && this.sourceCustomer.stateOrProvince && this.sourceCustomer.postalCode && this.sourceCustomer.country
        )) {
            this.display = true;
            this.modelValue = true;
        }
        this.isSaving = true;
        if (this.sourceCustomer.siteName && this.sourceCustomer.address1 
			&& this.sourceCustomer.city && this.sourceCustomer.stateOrProvince && this.sourceCustomer.postalCode && this.sourceCustomer.country) {
			if (!this.sourceCustomer.customerId) {
                    this.sourceCustomer.createdBy = this.userName;
                    this.sourceCustomer.updatedBy = this.userName;
                    this.sourceCustomer.masterCompanyId = 1;
                    //this.sourceCustomer.isActive = true;
                    this.sourceCustomer.customerId = this.local.customerId;
                    this.workFlowtService.newBillingAdd(this.sourceCustomer).subscribe(data => {
                        this.localCollection = data;
						this.loadData();
						this.savesuccessCompleted(this.sourceCustomer);
						this.sourceCustomer = {};
						})
					this.activeIndex = 3;
					this.workFlowtService.indexObj.next(this.activeIndex);
                }
                else {
                    this.sourceCustomer.isActive = true;
                    this.sourceCustomer.updatedBy = this.userName;
                    this.sourceCustomer.masterCompanyId = 1;
                    this.workFlowtService.updateBillinginfo(this.sourceCustomer).subscribe(data => {
                        this.updatedCollection = data;
						this.loadData();
						this.saveCompleted(this.sourceCustomer);
						this.sourceCustomer = {};
					})
					
					this.activeIndex = 3;
					//this.workFlowtService.indexObj.next(this.activeIndex);
					//this.router.navigateByUrl('/customersmodule/customerpages/app-customer-shipping-information');
            }
            

        }
        else {

        }
	

	}
	//saveCustomerBillViaDetails() {
	//	//debugger;
	//	this.isSaving = true;
	//	if (!this.billViaObj.vendorShippingId) {
	//		this.billViaObj.createdBy = this.userName;
	//		this.billViaObj.updatedBy = this.userName;
	//		this.billViaObj.masterCompanyId = 1;
	//		this.billViaObj.isActive = true;
	//		//this.shipViaObj.vendorId = updatedCollection.vendorId;
	//		//this.shipViaObj.vendorShippingId = updatedCollection.vendorShippingId;
	//		this.workFlowtService.newShippingViaAdd(this.billViaObj).subscribe(data => {
	//			this.billCollection = data;
	//			this.loadShipViaCollection(this.billCollection);
	//			if (this.billCollection) {
	//				this.billViaObj.shipVia = "";
	//				this.billViaObj.shippingAccountinfo = "";
	//				this.billViaObj.shippingURL = "";
	//				this.billViaObj.shippingId = "";
	//				this.billViaObj.memo = "";


	//			}

	//			//this.updateVendorShippingAddress(this.localCollection);

	//		})

	//	}
	//	else {

	//		this.sourceCustomer.updatedBy = this.userName;
	//		this.sourceCustomer.masterCompanyId = 1;
	//		this.billViaObj.isActive = true;
	//		this.workFlowtService.updatebillingViainfo(this.billViaObj).subscribe(data => {
	//			this.billCollection = data;
	//			this.loadShipViaCollection(this.billCollection);
	//			if (this.billCollection) {
	//				this.billViaObj.shipVia = "";
	//				this.billViaObj.shippingAccountinfo = "";
	//				this.billViaObj.shippingURL = "";
	//				this.billViaObj.shippingId = "";
	//				this.billViaObj.memo = "";


	//			}
	//		})


	//	}

	//}

	//openShipVia(content, rowData) {
	//	this.isEditMode = false;
	//	this.isDeleteMode = false;
	//	this.billViaObj = rowData;
	//	this.billViaObj.shipVia = "";
	//	this.billViaObj.shippingAccountinfo = "";
	//	this.billViaObj.shippingURL = "";
	//	this.billViaObj.shippingId = "";
	//	this.billViaObj.memo = "";
	//	this.isSaving = true;
	//	this.loadShipViaCollection(rowData);
	//	this.loadMasterCompanies();
	//	//this.sourceAction = new VendorClassification();
	//	this.sourceAction.isActive = true;
	//	//this.vendorName = "";
	//	this.modal = this.modalService.open(content, { size: 'lg' });
	//	this.modal.result.then(() => {



	//		console.log('When user closes');
	//	}, () => { console.log('Backdrop click') })
	//}

	

	updateCustomerBillingAddress(updateObj: any) {
		//debugger;
		this.workFlowtService.updateCustomerBillingAddressDetails(updateObj, this.local.customerId).subscribe(data => {
			this.customerBillingdetails = data;
			this.workFlowtService.newBillingAddWithAddress(this.sourceCustomer, this.customerBillingAddressdetails.customerBillingAddressId).subscribe(data => {
				this.localCollection = data;
				this.updateCustomerBillingAddress(this.localCollection);

			})
			this.loadData();
		})
	}

	deleteItemAndCloseModel(rowData) {
		this.isSaving = true;
		this.sourceCustomer.isActive = false;
		this.sourceCustomer.addressStatus = false;
		this.sourceCustomer.updatedBy = this.userName;
        this.sourceCustomer.customerBillingAddressId = rowData.customerBillingAddressId;
        this.workFlowtService.updateDeleteBillinginfo(this.sourceCustomer).subscribe(
			response => this.saveCompleted(this.sourceCustomer),
			error => this.saveFailedHelper(error));
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

	deleteItemShippingCloseModel(customerBillingId) {
		this.isSaving = true;
		this.billViaObj.isActive = false;
		this.billViaObj.updatedBy = this.userName;
		this.billViaObj.customerBillingId = customerBillingId;
        this.workFlowtService.deleteCustomerAcion(this.billViaObj).subscribe(data => {
			this.loadShipViaCollection(data);
		})

		//this.modal.close();
	}

	dismissBillViaModelModel() {
		this.isDeleteMode = false;
		this.isEditMode = false;
		//this.modal.close();
	}

	private savesuccessCompleted(user?: any) {
		this.isSaving = false;


		this.alertService.showMessage("Success", `Action was saved successfully`, MessageSeverity.success);



		this.loadData();
	}

	private saveSuccessHelper(role?: any) {
		this.isSaving = false;
		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

		

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

	nextClick() {
		if (this.local) {
			this.workFlowtService.financeCollection = this.local;
			//this.saveCompleted(this.sourceCustomer);
		}

		this.activeIndex = 4;
		this.workFlowtService.indexObj.next(this.activeIndex);
		this.router.navigateByUrl('/customersmodule/customerpages/app-customer-shipping-information');
	
	}


	private saveFailedHelper(error: any) {
		this.isSaving = false;
		this.alertService.stopLoadingMessage();
		this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
		this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }



    filtercountry(event) {

        this.countrycollection = [];
        if (this.allCountryinfo.length > 0) {
            for (let i = 0; i < this.allCountryinfo.length; i++) {
				let countryName = this.allCountryinfo[i].nice_name;
                if (countryName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.countrycollection.push(countryName);
                }
            }
        }
    }

    saveCountryList() {

        this.sourceAction.createdBy = this.userName;
        this.sourceAction.updatedBy = this.userName;

        this.workFlowtService.newCountry(this.sourceAction).subscribe(data => { this.countrieslist() })


    }
    opencountry(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;

        this.isSaving = true;
        this.loadMasterCompanies();
        //this.sourceAction = new Integration();
        this.sourceAction.isActive = true;
        this.countryName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
	}

	onCountrieselected(event) {
		if (this.allCountryinfo) {

			for (let i = 0; i < this.allCountryinfo.length; i++) {
				if (event == this.allCountryinfo[i].nice_name) {
					this.sourceCustomer.nice_name = this.allCountryinfo[i].nice_name;
					this.disablesave = true;

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
					//alert("Action Name already Exists");
					this.disablesave = true;
				}
				else {
					this.disablesave = false;
				}
			}

		}
	}

	openBillingView(content, row) {

		this.sourcebillingInfo = row;
		this.createdBy = row.createdBy;
		this.updatedBy = row.updatedBy;
		this.createddate = row.createdDate;
		this.updatedDate = row.updatedDate;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
}











