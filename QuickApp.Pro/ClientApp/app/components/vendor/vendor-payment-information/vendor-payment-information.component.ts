import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
	activeIndex: number;
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
	//public defaultPaymentValue: boolean = true;

	public domasticWireValue: boolean = false;
	public internationalValue: boolean = false;
	public checkStyle: boolean = false;
	public domesticWireStyle: boolean = false;
	public internationalStyle: boolean = false;
	vendorId: any;
	updatedCollection: {};
    siteName: any;
    address1: any;
    city: any;
	stateOrProvince: any;
	postalCode: number;
    country: any;
    ngOnInit(): void {
		this.workFlowtService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-payment-information';
		this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl); 
        // //debugger;
		if (this.local) {
			//debugger;
			//this.local = this.workFlowtService.listCollection;
			this.loadData();
			this.defaultPaymentValue = true;
			this.getDomesticWithVendorId();
			this.InternatioalWithVendorId();
			this.DefaultWithVendorId();
			this.showDefault();
		}
		this.countrylist();
		this.options = {
			center: { lat: 36.890257, lng: 30.707417 },
			zoom: 12
		};
		this.getbencus();
     }
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
    public sourceAction: any = [];
    public auditHisory: AuditHistory[] = [];
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    selectedColumn: any[];
    selectedColumns: any[];
    cols: any[];
    title: string = "Create";
    id: number;
    errorMessage: any;
    modal: NgbModalRef;
    actionName: string;
    Active: string = "Active";
    length: number;
    localCollection: any[] = [];
    //collection: any;
    options: any;
	public overlays: any[];
	allCountryinfo: any[];
	disablesave: boolean;
	countrycollection: any;
	selectedCountries: any;

    /** Actions ctor */

    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;

	constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef, private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: VendorService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
		if (this.workFlowtService.financeCollection) {
			this.local = this.workFlowtService.financeCollection;
		}
		this.dataSource = new MatTableDataSource();
		if (this.local) {

			this.workFlowtService.contactCollection = this.local;
		}
		if (this.workFlowtService.generalCollection) {
			this.local = this.workFlowtService.generalCollection;
		}
		if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
			this.viewName = "Edit";
			//debugger;
			this.local = this.workFlowtService.listCollection;
			this.loadData();
		}
		if (this.workFlowtService.generalCollection) {
			this.local = this.workFlowtService.generalCollection;

			this.sourceVendor.siteName = this.local.vendorName;
			this.sourceVendor.address1 = this.local.address1;
			this.sourceVendor.address2 = this.local.address2;
			this.sourceVendor.address3 = this.local.address3;
			this.sourceVendor.city = this.local.city;
			this.sourceVendor.country = this.local.country;
			this.sourceVendor.stateOrProvince = this.local.stateOrProvince;
			this.sourceVendor.postalCode = this.local.PostalCode;

		}
		if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
			this.viewName = "Edit";
			this.local = this.workFlowtService.listCollection;
			this.loadData();
		}
    }
	
    ngAfterViewInit() {
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
    }
    public allWorkFlows: any[] = [];
    private getgeneralInnfo() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getWorkFlows().subscribe(
            results => this.ongeneralDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
	}

	check()
	{
		this.checkValue = true;
		this.domasticWireValue = false;
		this.internationalValue = false;
		this.defaultPaymentValue = false;

		this.checkStyle = true;
		this.domesticWireStyle = false;
		this.internationalStyle = false;
		this.defaultPaymentStyle = false;
	}

	domesticWire()
	{
		this.checkValue = false;
		this.domasticWireValue = true;
		this.internationalValue = false;
		this.defaultPaymentValue = false;

		this.checkStyle = false;
		this.domesticWireStyle = true;
		this.internationalStyle = false;
		this.defaultPaymentStyle = false;
	}
	internationalWire()
	{
		this.checkValue = false;
		this.domasticWireValue = false;
		this.internationalValue = true;
		this.defaultPaymentValue = false;

		this.checkStyle = false;
		this.domesticWireStyle = false;
		this.internationalStyle = true;
		this.defaultPaymentStyle = false;
	}
	defaultPayment()
	{
		this.checkValue = false;
		this.domasticWireValue = false;
		this.internationalValue = false;
		this.defaultPaymentValue = true;

		this.checkStyle = false;
		this.domesticWireStyle = false;
		this.internationalStyle = false;
		this.defaultPaymentStyle = true;
	}

	showDomesticWire()
	{
		//this.checkValue = false;
		//this.domasticWireValue = true;
		//this.internationalValue = false;
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

		this.workFlowtService.getDomesticvedor(this.local.vendorId).subscribe(
			results => this.onDomestciLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	private InternatioalWithVendorId() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getInternationalWire(this.local.vendorId).subscribe(
			results => this.onInternatioalLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private DefaultWithVendorId() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getDefaultlist(this.local.vendorId).subscribe(
			results => this.onDefaultLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}


	private countrylist() {
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


    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

		this.workFlowtService.getCheckPaymentobj(this.local.vendorId).subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
		);

		

        this.cols = [
            //{ field: 'actionId', header: 'Action Id' },
            { field: 'siteName', header: 'Site Name' },
            { field: 'address1', header: 'Address' },
            { field: 'city', header: 'City' },
            { field: 'stateOrProvince', header: 'State/Prov' },
			{ field: 'postalCode', header: 'Postal Code' },
            { field: 'country', header: 'Country' }

        ];

        this.selectedColumns = this.cols;

	}

	public getbencus() {
		this.workFlowtService.getBeneficiaryCustomer().subscribe(
			results => this.onBencustomerLoad(results[0]),
			error => this.onDataLoadFailed(error)
		); }

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
			this.workFlowtService.updateActiveforpayment(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceVendor = rowData;
            this.sourceVendor.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceVendor.isActive == true;
			this.workFlowtService.updateActiveforpayment(this.sourceVendor).subscribe(
                response => this.saveCompleted(this.sourceVendor),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

    }

    private refresh() {
        // Causes the filter to refresh there by updating with recently added data.
        this.applyFilter(this.dataSource.filter);
    }
    private onDataLoadSuccessful(allWorkFlows: any[]) {
        //debugger;
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
		this.allActions = allWorkFlows;
		


	}
	private onBencustomerLoad(allWorkFlows: any) {
		//debugger;
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
		//debugger;
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.domesticWithVedor = allWorkFlows;
		
		if (this.domesticWithVedor.length > 0) {
			this.domesticSaveObj = allWorkFlows[0];
		}

	}

	private onInternatioalLoad(allWorkFlows: any) {
		//debugger;
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.internationalwithVendor = allWorkFlows;
		if (this.internationalwithVendor.length > 0) {
			this.internationalSaveObj = allWorkFlows[0];
		}
		
	}

	private onDefaultLoad(allWorkFlows: any) {
		//debugger;
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.defaultwithVendor = allWorkFlows;
		if (allWorkFlows) {
			this.defaultSaveObj = allWorkFlows;
		}
		

	}




    private loadPaymentObject() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getPaymentObj().subscribe(
            results => this.onPaymentObjUrl(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onPaymentObjUrl(allWorkFlows: any) {
        ////debugger;
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.sourceVendor = allWorkFlows;


    }
    //private ongeneralDataLoadSuccessful(allWorkFlows: any[]) {

    //    this.alertService.stopLoadingMessage();
    //    this.loadingIndicator = false;
    //    this.dataSource.data = allWorkFlows;
    //    this.allgeneralInfo = allWorkFlows;
    //    this.vendorname = this.allgeneralInfo[0].vendorName;
    //    this.vendorCode = this.allgeneralInfo[0].vendorCode;
    //    console.log(this.allgeneralInfo);


    //}

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

        // //debugger;
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
        this.sourceVendor = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openEdit(content, row) {

        this.isEditMode = true;
        this.isSaving = true;
        this.sourceVendor = row;
        this.loadMasterCompanies();
        // this.actionName = this.sourceVendor.description;

    }
    openView(content, row) {

        this.sourceVendor = row;
		this.siteName = row.siteName;
		this.address1 = row.address1;
		this.city = row.city;
		this.stateOrProvince = row.stateOrProvince;
		this.postalCode = row.postalCode;
		this.country = row.country;
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


        this.sourceVendor = row;


        this.isSaving = true;
         //debugger;
		this.workFlowtService.paymentHist(this.sourceVendor.checkPaymentId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));


	}

	toggledbldisplay(data) {
		this.sourceVendor = data;

	}

	
    private onAddressDataLoadSuccessful(alladdress: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = alladdress;
        this.allAddresses = alladdress;
        this.addressId = this.allAddresses[0].addressId;
        //this.isEditMode = true;
        //console.log(this.vendorId, this.addressId);
        //this.workFlowtService.updateAction(this.sourceVendor, this.addressId, this.vendorId).subscribe(
        //    response => this.saveCompleted(this.sourceVendor),
        //    error => this.saveFailedHelper(error));


    }


    private loadAddressDara() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getAddressDtails().subscribe(
            results => this.onAddressDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
        //this.navigate();

    }


    getlatlng(address) {
        this.checkAddress = true;
        ////debugger;
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB_W96L25HhFWgqLblcikircQKjU6bgTgk').subscribe((data: any) => {
            //alert(data);
            this.options = {
                center: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng },
                zoom: 50
            };
            this.overlays = [
                new google.maps.Marker({ position: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }, title: "" }),
                //new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: "Ataturk Park" }),
                //new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: "Oldtown" }),
                //new google.maps.Polygon({
                //    paths: [
                //        { lat: 36.9177, lng: 30.7854 }, { lat: 36.8851, lng: 30.7802 }, { lat: 36.8829, lng: 30.8111 }, { lat: 36.9177, lng: 30.8159 }
                //    ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
                //}),
                new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
                new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
            ];
            return data;


        });
    }

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

		//debugger;
		this.loadData();
		this.isSaving = true;
		if (!(this.sourceVendor.siteName && this.sourceVendor.address1 && this.sourceVendor.city &&
			this.sourceVendor.stateOrProvince && this.sourceVendor.postalCode && this.sourceVendor.country
		)) {
			this.display = true;
			this.modelValue = true;
			
		}

		
		if (this.sourceVendor.siteName && this.sourceVendor.address1 && this.sourceVendor.city &&
			this.sourceVendor.stateOrProvince && this.sourceVendor.postalCode && this.sourceVendor.country)
		{
			if (!this.sourceVendor.checkPaymentId &&!this.sourceVendor.vendorId) {
				this.sourceVendor.createdBy = this.userName;
				this.sourceVendor.updatedBy = this.userName;
				this.sourceVendor.masterCompanyId = 1;
				this.sourceVendor.isActive = true;
				this.sourceVendor.vendorId = this.local.vendorId;
				this.workFlowtService.addCheckinfo(this.sourceVendor).subscribe(data => {
					//debugger;
					this.loadData();
					this.localCollection = data;
					this.savesuccessCompleted(this.sourceVendor);
					this.sourceVendor = new Object();
					this.updateVendorCheckPayment(this.localCollection);
					this.sourceVendor = {};
				})


			}
			else {

				this.sourceVendor.updatedBy = this.userName;
				this.sourceVendor.masterCompanyId = 1;
				this.workFlowtService.updateCheckPaymentInfo(this.sourceVendor).subscribe(data => {
					if (data) { this.sourceVendor = new Object(); }
					this.updatedCollection = data;
					this.loadData();

				})
				this.saveCompleted(this.sourceVendor);
				this.sourceVendor = {};
			}

		}

		else
		{
		}
		
        
        //this.modal.close();
	}

	

    saveDomesticPaymentInfo() {

        //debugger;
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
				this.workFlowtService.addDomesticinfo(this.domesticSaveObj).subscribe(data => {
					//debugger;
					this.loadData();
					this.localCollection = data;
					this.savesuccessCompleted(this.sourceVendor);
					this.sourceVendor = new Object();
					this.updateVendorDomesticWirePayment(this.localCollection);
				})


			}
			else {

				this.sourceVendor.updatedBy = this.userName;
				this.sourceVendor.masterCompanyId = 1;
				this.workFlowtService.updateDomesticBankPaymentinfo(this.domesticSaveObj).subscribe(
					response => this.saveCompleted(this.sourceVendor),
					error => this.saveFailedHelper(error));
				
			}
			
			//this.modal.close();
			this.showDomesticWire();
			this.domasticWireValue = true;
			this.internationalValue = false;
		}
    }

	saveInternationalPaymentInfo() {

		//debugger;

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

				this.workFlowtService.addInternationalinfo(this.internationalSaveObj).subscribe(data => {
					//debugger;
					this.localCollection = data;
					this.workFlowtService.paymentCollection = this.local;
					this.activeIndex = 4;
					this.workFlowtService.indexObj.next(this.activeIndex);
					this.savesuccessCompleted(this.sourceVendor);
					//	this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-shipping-information');
					this.updateVendorInternationalWirePayment(this.localCollection);
					
				})


			}
			else {

				this.sourceVendor.updatedBy = this.userName;
				this.sourceVendor.masterCompanyId = 1;
				this.workFlowtService.vendorInternationalUpdate(this.internationalSaveObj).subscribe(
					data => {
						this.workFlowtService.paymentCollection = this.local;
						this.saveCompleted(this.sourceVendor);
						//this.activeIndex = 4;
						//this.workFlowtService.indexObj.next(this.activeIndex);
						//this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-shipping-information');
					})
			}
			this.showInternational();
			this.internationalValue = true;
			this.defaultPaymentValue = false;
			//this.modal.close();
		}
	}
	

	saveDefaultPaymentInfo() {
		//debugger;
		if (!this.defaultSaveObj.vendorPaymentId) {
			//if (this.defaultSaveObj.vendorPaymentId && this.sourceVendor.vendorId) {
				this.sourceVendor.createdBy = this.userName;
				this.sourceVendor.updatedBy = this.userName;
				this.sourceVendor.masterCompanyId = 1;
			    this.defaultSaveObj.vendorId = this.local.vendorId;
			//this.defaultSaveObj.defaultPaymentMethod = this.local.defaultPaymentMethod;
				this.workFlowtService.addDefaultinfo(this.defaultSaveObj).subscribe(data => {
					//this.localCollection = data;
					//this.workFlowtService.paymentCollection = this.local;
					this.activeIndex = 3;
					this.workFlowtService.indexObj.next(this.activeIndex);
					this.savesuccessCompleted(this.sourceVendor);
				})
			}
			else {

				this.sourceVendor.updatedBy = this.userName;
				this.sourceVendor.masterCompanyId = 1;
				this.workFlowtService.vendorDefaultUpdate(this.defaultSaveObj).subscribe(
					data => {
						this.workFlowtService.paymentCollection = this.local;
						this.saveCompleted(this.sourceVendor);

					})
			}
		}
	
		
			
	deleteItemAndCloseModel(checkPaymentId) {
	
        this.isSaving = true;
        this.sourceVendor.updatedBy = this.userName;
		this.workFlowtService.deleteCheckPayment(checkPaymentId).subscribe(
            response => this.saveCompleted(this.sourceVendor),
            error => this.saveFailedHelper(error));
        //this.modal.close();
    }

    updateVendorCheckPayment(updateObj: any) {
        // //debugger;
        this.workFlowtService.updateVendorCheckpayment(updateObj, this.local.vendorId).subscribe(data => {
            this.loadData();
        })
    }

    updateVendorDomesticWirePayment(updateObj: any) {
        // //debugger;
        this.workFlowtService.updateVendorDomesticWirePayment(updateObj, this.local.vendorId).subscribe(data => {
            this.loadData();
        })
    }


    updateVendorInternationalWirePayment(updateObj: any) {
        // //debugger;
        this.workFlowtService.updateVendorInternationalWirePayment(updateObj, this.local.vendorId).subscribe(data => {
            this.loadData();
        })
	}
	//updateVendorDefaultMethod(updateObj: any) {
	//	// //debugger;
	//	this.workFlowtService.updateVendorDefault(updateObj, this.local.vendorId).subscribe(data => {
	//		this.loadData();
	//	})
	//}


	previousClick() {
		this.activeIndex = 2;
		this.workFlowtService.indexObj.next(this.activeIndex);
		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-financial-information');
		//this.saveCompleted(this.sourceVendor);


	}
	nextClick() {

		
			this.workFlowtService.contactCollection = this.local;
			this.activeIndex = 4;
			this.workFlowtService.indexObj.next(this.activeIndex);
			//this.saveCompleted(this.sourceCustomer);
		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-shipping-information');

		
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
			//this.sourceVendor = rowData;
			this.sourceVendor.checkPaymentId = rowData.checkPaymentId;
			this.sourceVendor.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceVendor.isActive = false;
			this.workFlowtService.updateActiveforpayment(this.sourceVendor).subscribe(
				response => this.saveCompleted(this.sourceVendor),
				error => this.saveFailedHelper(error));
			//alert(e);
		}
		else {
			//this.sourceVendor = rowData;
			this.sourceVendor.checkPaymentId = rowData.checkPaymentId;
			this.sourceVendor.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceVendor.isActive = true;
			this.workFlowtService.updateActiveforpayment(this.sourceVendor).subscribe(
				response => this.saveCompleted(this.sourceVendor),
				error => this.saveFailedHelper(error));
			//alert(e);
		}

	}
	onCountrieselected(event) {
		if (this.allCountryinfo) {

			for (let i = 0; i < this.allCountryinfo.length; i++) {
				if (event == this.allCountryinfo[i].nice_name) {
					this.sourceVendor.nice_name = this.allCountryinfo[i].nice_name;
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
	filtercountry(event) {

		this.countrycollection = [];
		if (this.allCountryinfo) {
			for (let i = 0; i < this.allCountryinfo.length; i++) {
				let countryName = this.allCountryinfo[i].nice_name;
				if (countryName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.countrycollection.push(countryName);
				}
			}
		}
	}
}