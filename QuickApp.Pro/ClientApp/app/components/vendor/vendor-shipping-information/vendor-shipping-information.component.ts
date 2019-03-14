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
import { VendorService } from '../../../services/vendor.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { Vendor } from '../../../models/vendor.model';
//import { VendorClassificationComponent } from '../../vendor-classification/vendor-classification.component';
import { debounce } from 'rxjs/operators/debounce';
import { HttpClient } from '@angular/common/http';
import { GMapModule } from 'primeng/gmap';
import { Router } from '@angular/router';
declare const google: any;
@Component({
    selector: 'app-vendor-shipping-information',
    templateUrl: './vendor-shipping-information.component.html',
    styleUrls: ['./vendor-shipping-information.component.scss'],
    animations: [fadeInOut]
})
/** VendorShippingInformation component*/
export class VendorShippingInformationComponent {
	modelValue: boolean;
	display: boolean;
	activeIndex: number;
	public overlays: any[];
	options: any;
	//options: { center: { lat: any; lng: any; }; zoom: number; };
	shipViaCollection: any;
	allShipViaDetails: any[];
	updatedCollection: {};
    vendorshippingAddressdetails: any;
    local: any;
    addressId: any;
    allAddresses: any[];
    vendorId: any;
    vendorCode: any;
    vendorname: any;
    allgeneralInfo: any[];
    action_name: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createddate: any = "";
    updatedDate: any = "";
	shipViaObj: any = {};
	checkAddress: boolean = false;
	viewName: string = "Create"; 
	siteName: any;
	address1: any;
	address2: any;
	address3: any;
	city: any;
	stateOrProvince: any;
	postalCode: number;
	country: any;
    selectedShipVia: any;
    shipviacollection: any[];
    ngOnInit(): void {
		this.workFlowtService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-shipping-information';
		this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl); 
		if (this.local) {
			this.loadData();
		}
		this.countrylist();
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
    public sourceAction: any = [];
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
	localCollection: any;
	allCountryinfo: any[];
	disablesave: boolean;
	countrycollection: any;
	selectedCountries: any;

    /** Actions ctor */

    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;

    constructor(private http: HttpClient, private router: Router,
        private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: VendorService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {

		this.dataSource = new MatTableDataSource();
		if (this.local) {

			this.workFlowtService.contactCollection = this.local;
		}
		if (this.workFlowtService.generalCollection) {
			this.local = this.workFlowtService.generalCollection;
		}

		if (this.workFlowtService.paymentCollection) {
			this.local = this.workFlowtService.paymentCollection;
		}
		this.dataSource = new MatTableDataSource();
		if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
			this.local = this.workFlowtService.listCollection.t;
			//this.sourceCustomer = this.workFlowtService.listCollection.t;
		}
		if (this.workFlowtService.paymentCollection) {
            this.local = this.workFlowtService.paymentCollection;

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
    public sourceVendor: any = {};
   
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
            this.vendorname = this.allgeneralInfo[0].vendorName;
            this.vendorCode = this.allgeneralInfo[0].vendorCode;
        }
        //this.isEditMode = true;
        this.vendorId = this.allgeneralInfo[0].vendorId;
        console.log(this.allgeneralInfo);
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
    private onAddressDataLoadSuccessful(alladdress: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = alladdress;
        this.allAddresses = alladdress;
        this.addressId = this.allAddresses[0].addressId;
        
    }
    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

		this.workFlowtService.getVendorShipAddressGet(this.local.vendorId).subscribe(
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

	private loadShipViaCollection(rowData) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getVendorShipViaDetails(rowData).subscribe(
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
	openShipViaEdit(rowObject) {
		this.isEditMode = true;

		this.isSaving = true;
		this.shipViaObj = rowObject;
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
    openClassification(content) {
        //this.vendorclasscmpnt.open(content);
    }

    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue;
    }
    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceVendor = rowData;
            //this.sourceVendor.updatedBy = this.userName;
            //this.Active = "In Active";
            //this.sourceVendor.isActive == false;
            //this.workFlowtService.updateshippinginfo(this.sourceVendor).subscribe(
            //    response => this.saveCompleted(this.sourceVendor),
            //    error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceVendor = rowData;
            //this.sourceVendor.updatedBy = this.userName;
            //this.Active = "Active";
            //this.sourceVendor.isActive == true;
            //this.workFlowtService.updateshippinginfo(this.sourceVendor).subscribe(
            //    response => this.saveCompleted(this.sourceVendor),
            //    error => this.saveFailedHelper(error));
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
		//this.vendorId = this.allActions[0].vendorId;
	}
	private onShipViadetails(allWorkFlows: any) {
		//debugger;
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allShipViaDetails = allWorkFlows;
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

    openEdit(row) {

        this.isEditMode = true;

        this.isSaving = true;
        this.sourceVendor = row;
        this.loadMasterCompanies();
        // this.actionName = this.sourceVendor.description;
        //this.modal = this.modalService.open(content, { size: 'sm' });
        //this.modal.result.then(() => {
        //    console.log('When user closes');
        //}, () => { console.log('Backdrop click') })
    }
    openView(content, row) {

        this.sourceVendor = row;		
		this.siteName = row.siteName;
		this.address1 = row.address1;
		this.city = row.city;
		this.stateOrProvince = row.stateOrProvince;
		this.postalCode = row.postalCode;
		this.country = row.country;		
		this.address2 = row.address2;
		this.address3 = row.address3;		
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


        this.shipViaObj = row;


        this.isSaving = true;
         //debugger;
		this.workFlowtService.shipviaHistory(this.sourceVendor.vendorShippingId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));


	}
	openShipaddressHistory(content, row) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;


		this.sourceVendor = row;


		this.isSaving = true;
		//debugger;
		this.workFlowtService.shipaddressHistory(this.sourceVendor.vendorShippingAddressId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));


	}


    editItemAndCloseModel() {
		this.isSaving = true;
		if (!(this.sourceVendor.siteName && this.sourceVendor.address1 && this.sourceVendor.city &&
			this.sourceVendor.stateOrProvince && this.sourceVendor.postalCode && this.sourceVendor.country
		)) {
			this.display = true;
			this.modelValue = true;
		}
		if (this.sourceVendor.siteName && this.sourceVendor.address1 && this.sourceVendor.city &&
			this.sourceVendor.stateOrProvince && this.sourceVendor.postalCode && this.sourceVendor.country) {
			if (!this.sourceVendor.vendorId) {
				//if (!this.sourceVendor) {
				this.sourceVendor.createdBy = this.userName;
				this.sourceVendor.updatedBy = this.userName;
				this.sourceVendor.masterCompanyId = 1;
				//	this.sourceVendor.isActive = true;
				this.sourceVendor.vendorId = this.local.vendorId;
				this.workFlowtService.newShippingAdd(this.sourceVendor).subscribe(data => {
					this.localCollection = data;
					this.loadData();
					this.savesuccessCompleted(this.sourceVendor);
					//this.updateVendorShippingAddress(this.localCollection);
					this.sourceVendor = {};
				})

			}
			else {
				this.sourceVendor.isActive = true;
				this.sourceVendor.updatedBy = this.userName;

				this.sourceVendor.masterCompanyId = 1;
				this.workFlowtService.updateshippinginfo(this.sourceVendor).subscribe(data => {
					this.updatedCollection = data;
					this.loadData();

					this.sourceVendor = {};

				})
			}

		}
		//else {
		//}
		//this.workFlowtService.shippingCollection = this.local;
		
	}
	saveVendorShipViaDetails() {
		//debugger;
		this.isSaving = true;
		if (!this.shipViaObj.vendorShippingId) {
			this.shipViaObj.createdBy = this.userName;
			this.shipViaObj.updatedBy = this.userName;
			this.shipViaObj.masterCompanyId = 1;
			this.shipViaObj.isActive = true;
			//this.shipViaObj.vendorId = updatedCollection.vendorId;
			//this.shipViaObj.vendorShippingId = updatedCollection.vendorShippingId;
			this.workFlowtService.newShippingViaAdd(this.shipViaObj).subscribe(data => {
				this.shipViaCollection = data;
				this.loadShipViaCollection(this.shipViaCollection);
			if (this.shipViaCollection) {
				this.shipViaObj.shipVia = "";
				this.shipViaObj.shippingAccountinfo = "";
				this.shipViaObj.shippingURL = "";
				this.shipViaObj.shippingId = "";
				this.shipViaObj.memo = "";

				
				}
				
				//this.updateVendorShippingAddress(this.localCollection);

			})

		}
		else {

			this.sourceVendor.updatedBy = this.userName;
			this.sourceVendor.masterCompanyId = 1;
			this.shipViaObj.isActive = true;
			this.workFlowtService.updateshippingViainfo(this.shipViaObj).subscribe(data => {
				this.shipViaCollection = data;
				this.loadShipViaCollection(this.shipViaCollection);
				if (this.shipViaCollection) {
					this.shipViaObj.shipVia = "";
					this.shipViaObj.shippingAccountinfo = "";
					this.shipViaObj.shippingURL = "";
					this.shipViaObj.shippingId = "";
					this.shipViaObj.memo = "";


				}
			})
		
				
		}

	}

	previousClick() {
		this.activeIndex = 3;
		this.workFlowtService.indexObj.next(this.activeIndex);
		this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-payment-information');
		//this.saveCompleted(this.sourceVendor);


	}
	openShipVia(content,rowData) {
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.shipViaObj = rowData;
		this.shipViaObj.shipVia = "";
		this.shipViaObj.shippingAccountinfo = "";
		this.shipViaObj.shippingURL = "";
		this.shipViaObj.shippingId = "";
		this.shipViaObj.memo = "";
		this.isSaving = true;
		this.loadShipViaCollection(rowData);
		this.loadMasterCompanies();
		//this.sourceAction = new VendorClassification();
		this.sourceAction.isActive = true;
		//this.vendorName = "";
		this.modal = this.modalService.open(content, { size: 'lg' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

    updateVendorShippingAddress(updateObj: any) {
         debugger;
        this.workFlowtService.updateVendorShippingAddressDetails(updateObj, this.local.vendorId).subscribe(data => {
            this.vendorshippingAddressdetails = data;
            this.workFlowtService.newShippingAddWithAddress(this.sourceVendor,this.vendorshippingAddressdetails.vendorShippingAddressId).subscribe(data => {
                this.localCollection = data;
                this.updateVendorShippingAddress(this.localCollection);

            })
            this.loadData();
        })
    }
    
	deleteItemAndCloseModel(vendorShippingAddressId) {
		this.isSaving = true;

		this.sourceVendor.isActive = false;
		this.sourceVendor.addressStatus = false;
		this.sourceVendor.updatedBy = this.userName;
		this.sourceVendor.vendorShippingAddressId = vendorShippingAddressId;
		this.workFlowtService.deleteAcion(this.sourceVendor).subscribe(
            response => this.saveCompleted(this.sourceVendor),
            error => this.saveFailedHelper(error));
        //this.modal.close();
    }

    deleteItemShippingCloseModel(vendorShippingId) {
		this.isSaving = true;
		this.shipViaObj.isActive = true;
        this.shipViaObj.updatedBy = this.userName;
        this.shipViaObj.vendorShippingId = vendorShippingId;
		this.workFlowtService.deleteVendorAcion(this.shipViaObj).subscribe(data => {
			this.loadShipViaCollection(data);
		})
       
        //this.modal.close();
    }

    dismissShipViaModelModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
	}
	dismissModel() {
		this.isDeleteMode = false;
		this.isEditMode = false;
		this.modal.close();
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


		this.alertService.showMessage("Success", `Action was added successfully`, MessageSeverity.success);



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

	toggledbldisplay(data) {
		this.sourceVendor = data;

	}
	nextClick() {
		if (this.local) {
			this.workFlowtService.shippingCollection = this.local;
		}
		this.activeIndex = 5;
		this.workFlowtService.indexObj.next(this.activeIndex);
		//this.saveCompleted(this.sourceVendor);
		this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-warnings');
		
	}
	handleChanges(rowData, e) {
		if (e.checked == false) {
			this.sourceVendor = rowData;
			this.sourceVendor.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceVendor.isActive == false;
			this.workFlowtService.updateActionforActiveforshipping(this.sourceVendor).subscribe(
				response => this.saveCompleted(this.sourceVendor),
				error => this.saveFailedHelper(error));
			//alert(e);
		}
		else {
			this.sourceVendor = rowData;
			this.sourceVendor.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceVendor.isActive == true;
			this.workFlowtService.updateActionforActiveforshipping(this.sourceVendor).subscribe(
				response => this.saveCompleted(this.sourceVendor),
				error => this.saveFailedHelper(error));
			//alert(e);
		}

	}

	//handleChangeforShipVia(rowData, e) {
	//	if (e.checked == false) {
	//		this.sourceAction = rowData;
	//		this.sourceAction.updatedBy = this.userName;
	//		this.Active = "In Active";
	//		this.sourceAction.isActive == false;
	//		this.workFlowtService.updateActionforActiveforshipViaDetails(this.sourceAction).subscribe(
	//			response => this.saveCompleted(this.sourceAction),
	//			error => this.saveFailedHelper(error));
	//		//alert(e);
	//	}
	//	else {
	//		this.sourceAction = rowData;
	//		this.sourceAction.updatedBy = this.userName;
	//		this.Active = "Active";
	//		this.sourceAction.isActive == true;
	//		this.workFlowtService.updateActionforActiveforshipViaDetails(this.sourceAction).subscribe(
	//			response => this.saveCompleted(this.sourceAction),
	//			error => this.saveFailedHelper(error));
	//		//alert(e);
	//	}

	//}

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
	onShipVia(event) {
		if (this.allShipViaDetails) {

			for (let i = 0; i < this.allShipViaDetails.length; i++) {
				if (event == this.allShipViaDetails[i].shipVia) {
					this.shipViaObj.shipVia = this.allShipViaDetails[i].shipVia;


					this.selectedShipVia = event;
				}
			}
		}
	}

	eventShipviaHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedShipVia) {
				if (value == this.selectedShipVia.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disablesave = true;
				}
				else {
					this.disablesave = false;
				}
			}

		}
	}
	filterShipVia(event) {

		this.shipviacollection = [];
		if (this.allShipViaDetails.length > 0) {
			for (let i = 0; i < this.allShipViaDetails.length; i++) {
				let shipName = this.allShipViaDetails[i].shipVia;
				if (shipName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.shipviacollection.push(shipName);
				}
			}
		}
	}
}
	
