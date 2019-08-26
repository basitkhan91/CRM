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
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
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
    public sourceCustomer: any = {};
	private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    xlocation: string[];


	constructor(private http: HttpClient, private router: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: CustomerService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
		if (this.workFlowtService.financeCollection) {
			this.local = this.workFlowtService.financeCollection;
		}
		this.dataSource = new MatTableDataSource();
		if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
			this.local = this.workFlowtService.listCollection.t;
		}
        this.dataSource = new MatTableDataSource();
        if (this.local){
           // if (this.workFlowtService.generalCollection.isAddressForBillingAndShipping == true) {
                //this.local = this.workFlowtService.generalCollection;
                this.sourceCustomer.siteName = this.local.name;
                this.sourceCustomer.address1 = this.local.address.line1;
                this.sourceCustomer.address2 = this.local.address.line2;
                this.sourceCustomer.address3 = this.local.address.line3;
                this.sourceCustomer.city = this.local.address.city;
                this.sourceCustomer.country = this.local.address.country;
                this.sourceCustomer.stateOrProvince = this.local.address.stateOrProvince;
                this.sourceCustomer.postalCode = this.local.address.postalCode;
            //}
        }
	}


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

	ngAfterViewInit() {
	
    }

    // Get Map Data
	getlatlng(address) {
        this.checkAddress = true;
		return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB_W96L25HhFWgqLblcikircQKjU6bgTgk').subscribe((data: any) => {
			this.options = {
				center: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng },
				zoom: 12
			};
			this.overlays = [
                new google.maps.Marker({ location: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }, title: "Konyaalti" }),
				
			];
			return data;


		});
	}



	// Load Countries//

    private countrieslist() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getCountrylist().subscribe(
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

    // Back Click
   	backClick() {
		this.workFlowtService.contactCollection = this.local;
		this.activeIndex = 2;
		this.workFlowtService.indexObj.next(this.activeIndex);
		this.router.navigateByUrl('/customersmodule/customerpages/app-customer-financial-information');

    }

    // Model Popup Close
    public dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    // Load Customer Bill details
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

    openBillViaEdit(rowObject) {
		this.isEditMode = true;
		this.isSaving = true;
		this.billViaObj = rowObject;
		this.loadMasterCompanies();
	}

    // Load Master Companies
	private loadMasterCompanies() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.masterComapnyService.getMasterCompanies().subscribe(
			results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}
    private onDataLoadSuccessful(allWorkFlows: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allActions = allWorkFlows;
    }
	
    



	public applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue;
	}
	

	handleChange(rowData, e) {
		if (e.checked == false) {
			this.sourceCustomer = rowData;
			this.sourceCustomer.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceCustomer.isActive == false;
			this.workFlowtService.updateActionforActiveforBilling(this.sourceCustomer).subscribe(
				response => this.saveCompleted(this.sourceCustomer),
				error => this.saveFailedHelper(error));
            this.sourceCustomer = "";
		}
		else {
			this.sourceCustomer = rowData;
			this.sourceCustomer.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceCustomer.isActive == true;
			this.workFlowtService.updateActionforActiveforBilling(this.sourceCustomer).subscribe(
				response => this.saveCompleted(this.sourceCustomer),
				error => this.saveFailedHelper(error));
            this.sourceCustomer = "";
		}

	}
	private refresh() {
		// Causes the filter to refresh there by updating with recently added data.
		this.applyFilter(this.dataSource.filter);
	}
	
	private onDataLoadFailed(error: any) {
		// alert(error);
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

	}

    // Filter Details
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
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.auditHisory = auditHistory;
		this.modal = this.modalService.open(content, { size: 'lg' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })


	}

	private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
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
		this.workFlowtService.billaddressHistory(this.sourceCustomer.customerBillingAddressId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));

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


    // Save Billing Info

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
    // Update Billing address
	updateCustomerBillingAddress(updateObj: any) {
		//debugger;
		this.workFlowtService.updateCustomerBillingAddressDetails(updateObj, this.local.customerId).subscribe(data => {
			this.customerBillingdetails = data;
            this.workFlowtService
                .newBillingAddWithAddress(this.sourceCustomer,
                    this.customerBillingAddressdetails.customerBillingAddressId).subscribe(data => {
                    this.localCollection = data;
                    this.updateCustomerBillingAddress(this.localCollection);

                });
			this.loadData();
		})
	}

    // Delete Billing data
	deleteItemAndCloseModel(rowData) {
        this.isSaving = true;
        this.sourceCustomer.isDelete = true;
		this.sourceCustomer.addressStatus = false;
		this.sourceCustomer.updatedBy = this.userName;
        this.sourceCustomer.customerBillingAddressId = rowData.customerBillingAddressId;
        this.workFlowtService.updateDeleteBillinginfo(this.sourceCustomer).subscribe(
			response => this.saveCompleted(this.sourceCustomer),
			error => this.saveFailedHelper(error));
	}

    //deleteItemAndCloseModel(customerBillingAddressId) {
    //    this.isSaving = true;
    //    this.sourceCustomer.isDelete = true;
    //    this.workFlowtService.updateDeleteBillinginfo(customerBillingAddressId).subscribe(
    //        response => this.saveCompleted(this.sourceCustomer),
    //        error => this.saveFailedHelper(error));
    //}
  
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
		})

		//this.modal.close();
	}

	dismissBillViaModelModel() {
		this.isDeleteMode = false;
		this.isEditMode = false;
	}

	private savesuccessCompleted(user?: any) {
		this.isSaving = false;

		this.alertService.showMessage("Success", `Action was saved successfully`, MessageSeverity.success);



		this.loadData();
	}

    // Next Click
	nextClick() {
		if (this.local) {
			this.workFlowtService.financeCollection = this.local;
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



    // Filter Country
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

    // Save Country
    saveCountryList() {
        this.sourceAction.createdBy = this.userName;
        this.sourceAction.updatedBy = this.userName;

        this.workFlowtService.newCountry(this.sourceAction).subscribe(data => { this.countrieslist() });


    }


    opencountry(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction.isActive = true;
        this.countryName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
                console.log('When user closes');
            },
            () => { console.log('Backdrop click') });
    }

    // on country selected
    onCountrieselected(event) {
        if (this.allCountryinfo) {
            for (let i = 0; i < this.allCountryinfo.length; i++) {
                if (event == this.allCountryinfo[i].nice_name) {
                    this.sourceCustomer.nice_name = event;
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

    // Open Billing
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
            },
            () => { console.log('Backdrop click') });
    }
}











