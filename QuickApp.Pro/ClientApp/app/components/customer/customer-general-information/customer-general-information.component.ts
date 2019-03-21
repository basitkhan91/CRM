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
import { CustomerService } from '../../../services/customer.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { Customer } from '../../../models/customer.model';
import { Router, NavigationExtras } from '@angular/router';
import { CustomerClassification } from '../../../models/customer-classification.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GMapModule } from 'primeng/gmap';
import { AddActionsDialogComponent } from '../../dialogs/add-actions-dialog/add-actions-dialog.component';
import { unescapeHtml } from '@angular/platform-browser/src/browser/transfer_state';
import { FileUploadModule } from 'primeng/fileupload';
import { Message } from 'primeng/components/common/message';
import { CustomerClassificationService } from '../../../services/CustomerClassification.service';
import { Integration } from '../../../models/integration.model';
import { IntegrationService } from '../../../services/integration-service';
import { DialogModule } from 'primeng/dialog';
import { timeInterval } from 'rxjs/operator/timeInterval';
import { BaseRowDef } from '@angular/cdk/table';
import { ATAMain } from '../../../models/atamain.model';
import { AtaMainService } from '../../../services/atamain.service';
import { VendorService } from '../../../services/vendor.service';
import { ATAChapter } from '../../../models/atachapter.model';
declare const google: any;

@Component({
    selector: 'app-customer-general-information',
    templateUrl: './customer-general-information.component.html',
	styleUrls: ['./customer-general-information.component.scss'],
	animations: [fadeInOut]
})

export class CustomerGeneralInformationComponent implements OnInit, AfterViewInit {
    disableSaveCusCode: boolean;
	disableSaveCusName: boolean;
	disableSaveContries: boolean = false;
    disableSaveCustomerCode: boolean;
    selectedCustomerCode: any;
    customerCodesColl: any[]=[];
	selectedActionName: any;
	address1: string;
	//selectedAtaChapterName: any;
	disableSave: boolean;
    customerNamecoll: any[]=[];
    countrycollection: any[];
    countryName: string;
	allCountryinfo: any[];
	allATAMaininfo: ATAChapter[] = [];
	selectedAircraftTypes: any[]=[];
	//onRepositorySelected: any[];
	activeIndex: number;
	ATAChapterId: number;
    ataChapterName: any;
    atachaptercollection: any[];
    addressObj: any;
    allAircraftinfo: any[];
	allaircraftInfo: any;
	allatachapterInfo: any[];
	atachapterName: any[];
	customertypes: any[];
	showCustomerClassificationId: boolean;
	showCustomerCountry: boolean;
	showCustomerPostal: boolean;
	showCustomerState: boolean;
	showCustomerCity: boolean;
	showCustomerAddress1: boolean;
	showCustomerPhone: boolean;
	showCustomerEmail: boolean;
	showCustomerCode: boolean;
	showCustomerName: boolean;
	showCustomerTypeId: boolean;
    integrationCollection: any[];
    shiftValues: any[] = [];
    classificollection: any[];
    showcontractReference: boolean;
    showcustomerCode: boolean;
	showcustomerName: boolean;
	isEnabeCapes: boolean = false;
	//disablesaveclassificationName: boolean;
    showalert: boolean;
    showLable: boolean;
	cusname: any;

	//selectedclassification: any;
    allCustomerClassInfo: CustomerClassification[];
    allcustomerclassificationInfo: CustomerClassification[] = [];
    allIntegrationInfo: Integration[] = [];
    customerClassName: any;
    customerCollection: any[];
    customerNames: any[];
    customerCodes: any[];
    localCollection: any;
    auditHistoryCollection: any = {};
    public sourceAuditHistory: any = {};
    customerName: any;
    customerCode: any;
    checkAddress: boolean = false;
    // vendorCode: any;
    //vendorname: any;
    allgeneralInfo: any[];
    closeCmpny: boolean = true;
    service: boolean = false;
    customerId: any;
    addressId: any;
    allAddresses: any[];
    description: any = "";
    modelName: any = "";
    action_name: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createddate: any = "";
    updatedDate: any = "";
    customerParentName: any = "";
    local: any;
	CustomerInfoByName: any[] = [];
	selectedModels: any[] = [];
	manfacturerAircraftmodelsarray: any[] = [];
	distributionAircraftmodelsarray: any[] = [];
	overhaulAircraftmodelsarray: any[] = [];
	certificationarrayAircraftmodelsarray: any[] = [];
	repairAircraftmodelsarray: any[] = [];
	exchangeAircraftmodelsarray: any[] = [];
	showInput: boolean;
	capesCollection: any[] = [];
	//vendorgeneralcollection: any[] = [];
	customergeneralCollection: any[] = [];
    data: any;
    //allCountryinfo: any[];
    disablesave: boolean;
    selectedCountries: any;
	localCountrycollecton: any[];
	allAircraftManufacturer: any[] = [];
	integrationvalues: any[] = [];
	allintegrationdetails: any;
    ngOnInit(): void {
		// debugger;
		
		this.workFlowtService.currentUrl = '/customersmodule/customerpages/app-customer-general-information';
		this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
		this.workFlowtService.ShowPtab = true;
		this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab); //steps
		this.activeIndex = 0;
		this.getAircraftModelsData();
		this.workFlowtService.indexObj.next(this.activeIndex);
        //if (this.workFlowtService.isEditMode == true) {
        //    this.sourceCustomer.customerAffiliationId = "";
        //}
       
        if (this.workFlowtService.enableExternal == false) {
            this.sourceCustomer.customerAffiliationId = 2;
        }
        this.loadData();
        //this.aircrafttypeData();
        this.loadDataCustomerData();
		this.integrationalData();
        this.customertypeData();
        this.atamaindata();
        this.aircraftmodelData();
		this.countrylist();
		this.Integration();
        //this.sourceCustomer.customerAffiliationId = 2;
        this.loadCustomerClassifiData();
        this.options = {
            center: { lat: 36.890257, lng: 30.707417 },
            zoom: 12
        };
        if (this.workFlowtService.generalCollection) {
            this.sourceCustomer = this.workFlowtService.generalCollection;
        }
        //this.sourceCustomer.annualRevenuePotential = "$";
        //this.sourceCustomer.annualQuota = "$";
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
	public sourceClassification: any = {};
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
    //length: number;
    collection: any;
    options: any;
    public overlays: any[];
    msgs: Message[];
    classificationName: string;
    integrationName: string;
	uploadedFiles: any[] = [];
	display: boolean = false; //prime ng Model
	modelValue: boolean = false;
	enablePopupData: boolean = false;
	allManagemtninfo: any[] = [];
	bulist: any[] = [];
	bulistovh: any[] = [];
	departmentList: any[] = [];
	departmentListovh: any[] = [];
	divisionlist: any[] = [];
	divisionlistovh: any[] = [];
	maincompanylist: any[] = [];
    /** Actions ctor */
	collectionofItemMaster: any;
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
	allAircraftsGet: any[] = [];
	isCustomerAlsoVendor: boolean = false;
	enablePlus: boolean = false;
	ataChapterId: any;
	selectedIntegrationTypes: any[];
	constructor( public integration: IntegrationService, public customerClassificationService: CustomerClassificationService, private http: HttpClient, public ataservice: AtaMainService, private changeDetectorRef: ChangeDetectorRef, private router: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: CustomerService, public vendorser: VendorService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {

        this.dataSource = new MatTableDataSource();
        
        if (this.workFlowtService.listCollection!=null && this.workFlowtService.isEditMode == true) {
            //debugger;
			this.showLable = true;
			this.local = this.workFlowtService.listCollection.t;
            this.sourceCustomer = this.workFlowtService.listCollection.t;
            this.sourceCustomer.address1 = this.workFlowtService.listCollection.address1;
            this.sourceCustomer.address2 = this.workFlowtService.listCollection.address2;
            this.sourceCustomer.address3 = this.workFlowtService.listCollection.address3;
            this.sourceCustomer.city = this.workFlowtService.listCollection.city;
            this.sourceCustomer.country = this.workFlowtService.listCollection.country;
            this.sourceCustomer.stateOrProvince = this.workFlowtService.listCollection.stateOrProvince;
            this.sourceCustomer.postalCode = this.workFlowtService.listCollection.postalCode;
            this.sourceAuditHistory = this.workFlowtService.listCollection.ad;
            this.sourceAuditHistory.addressId = this.workFlowtService.listCollection.ad.addressId;
            this.sourceAuditHistory.line1 = this.workFlowtService.listCollection.ad.line1;
            this.sourceAuditHistory.line2 = this.workFlowtService.listCollection.ad.line2;
            this.sourceAuditHistory.line3 = this.workFlowtService.listCollection.ad.line3;
            this.sourceAuditHistory.city = this.workFlowtService.listCollection.ad.city;
            this.sourceAuditHistory.country = this.workFlowtService.listCollection.ad.country;
            this.sourceAuditHistory.stateOrProvince = this.workFlowtService.listCollection.ad.stateOrProvince;
            this.sourceAuditHistory.postalCode = this.workFlowtService.listCollection.ad.postalCode;
            this.sourceCustomer.customerAffiliationId = this.sourceCustomer.customerAffiliationId;
		}
		if (this.vendorser.isVendorAlsoCustomer == true) {
			this.sourceCustomer = this.vendorser.localCollectiontoCustomer;

        }

	}


    sourceCustomer: any = {};
    closethis() {
        this.closeCmpny = false;
    }
    ngAfterViewInit() {
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
    }
    public allWorkFlows: any[] = [];

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    public addEntity() {

        let dialogRef = this.dialog.open(AddActionsDialogComponent,
            {
                panelClass: 'mat-dialog-md',
                data: { role: "" }
            });
        dialogRef.afterClosed().subscribe(role => {
            if (role) {``
                //this.updateRoles(role);
            }
        });
    }
    private onAddressDataLoadSuccessful(alladdress: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = alladdress;
        this.allAddresses = alladdress;
        this.addressId = this.allAddresses[0].addressId;
        //this.isEditMode = true;
        //console.log(this.vendorId, this.addressId);
        //this.workFlowtService.updateAction(this.sourceCustomer, this.addressId, this.vendorId).subscribe(
        //    response => this.saveCompleted(this.sourceCustomer),
        //    error => this.saveFailedHelper(error));


    }
    private integrationalData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.integration.getWorkFlows().subscribe(
            results => this.onDataLoadintegratnSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

	}

	private customertypeData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getCustomerTypes().subscribe(
			results => this.onDataLoadcustomertypeSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}
	public onATASelectChange(event: any) {
		var val = event.target.value;
		this.ataChapterId = val.substring(val.indexOf(':') + 1, val.length);
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
        

        //console.log(this.allActions);


    }

    //private aircrafttypeData() {
    //    this.alertService.startLoadingMessage();
    //    this.loadingIndicator = true;

    //    this.workFlowtService.getAircraftTypes().subscribe(
    //        results => this.onDataLoadaircrafttypeSuccessful(results[0]),
    //        error => this.onDataLoadFailed(error)
    //    );

    //    this.cols = [
    //        //{ field: 'customerClassificationId', header: 'Customer Classification ID' },
    //        { field: 'description', header: 'Aircraft Type' },
    //        { field: 'modelName', header: 'Model' },
            
           
    //    ];
    //    this.selectedColumns = this.cols;



    //} 

    private atamaindata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.ataservice.getAtaMainList().subscribe(
            results => this.onSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

	private onSuccessful(getAtaMainList: ATAChapter[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = getAtaMainList;
        this.allATAMaininfo = getAtaMainList;
    }
	//public onChange(event) {
	//	const newVal = event.target.value;
	//	console.log(newVal);
	//}

    private onDataLoadintegratnSuccessful(allWorkFlows: Integration[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allIntegrationInfo = allWorkFlows;
    }
	private onDataLoadcustomertypeSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.customertypes = allWorkFlows;
    }

    //private onDataLoadaircrafttypeSuccessful(allWorkFlows: any[]) {

    //    this.alertService.stopLoadingMessage();
    //    this.loadingIndicator = false;
    //    this.dataSource.data = allWorkFlows;
    //    this.allAircraftinfo = allWorkFlows;
        
    //}
	private onDataLoadaircrafttypeSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		if (this.workFlowtService.isEditMode == false) {
			this.allAircraftinfo = allWorkFlows;
		}
		if (this.enablePopupData == true) {
			this.allAircraftinfo = allWorkFlows;
		}
		if (this.selectedModels.length > 0) {

			let ischange1 = false;
			if (this.selectedModels.length > 0) {
				this.selectedModels.map((row) => {
					for (let i = 0; i < this.allAircraftinfo.length; i++) {
						if (this.allAircraftinfo[i].aircraftModelId == row.aircraftModelId) {
							this.allAircraftinfo[i].priority = row.priority;
							this.allAircraftinfo[i].checkbox = row.checkbox;
							ischange1 = true;
						}
					}

				});
			}
			//if (!ischange1) {
			//	this.selectedModels.push(selectedRow);
			//}

		}

	}


	

	private aircraftmodelData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getAircraft().subscribe(
			results => this.onDataLoadaircraftmodelSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}


	private onDataLoadaircraftmodelSuccessful(allWorkFlows: any) {
		console.log(1);
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allAircraftinfo = allWorkFlows;
		if (this.allAircraftinfo.length > 0) {
			this.shiftValues = [];
			for (let i = 0; i < this.allAircraftinfo.length; i++)
				this.shiftValues.push(
					{ value: this.allAircraftinfo[i].aircraftTypeId, label: this.allAircraftinfo[i].description },

				);
		}
		
		let valAirCraft = [];
		this.workFlowtService.getAircraftManufacturer(this.sourceCustomer.customerId)
			.subscribe(results => {
				this.allAircraftManufacturer = results;
				if (results != null) {
					for (let i = 0; i < this.allAircraftManufacturer.length; i++) {
						valAirCraft.push(this.allAircraftManufacturer[i].aircraftTypeId);
					}
					this.selectedAircraftTypes = valAirCraft;
					console.log(this.selectedAircraftTypes);
				}

			},
				error => this.onDataLoadFailed(error)
			);
	

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
    private loadCustomerClassifiData() {
        // debugger;
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.customerClassificationService.getCustomerClassificationList().subscribe(
            results => this.onDataLoadClassifiSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }	
    private onDataLoadClassifiSuccessful(getCustomerClassificationList: CustomerClassification[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getCustomerClassificationList;

        this.allcustomerclassificationInfo = getCustomerClassificationList;
    }


    getlatlng(address) {

        //debugger;
        this.checkAddress = true;
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB_W96L25HhFWgqLblcikircQKjU6bgTgk').subscribe((data: any) => {
            //alert(data);
            this.options = {
                center: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng },
                zoom: 1,
               // new google.maps.Center({ position: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }, title: "Ataturk Park" }),
            };
            //console.log(this.options);
            this.overlays = [
                new google.maps.Marker({ position: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }, title: "Konyaalti" }),
               
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



    private loadMasterCompanies() {


        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.masterComapnyService.getMasterCompanies().subscribe(
            results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    
    openClassification(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;

        this.isSaving = true;
        this.loadMasterCompanies();
		this.sourceClassification = new CustomerClassification();
		this.sourceClassification.isActive = true;
        this.customerName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })



    }


        //openatachapter(content) {
        //    this.isEditMode = false;
        //    this.isDeleteMode = false;

        //    this.isSaving = true;
        //    this.loadMasterCompanies();
        //   // this.sourceAction = new CustomerClassification();
        //    this.sourceAction.isActive = true;
        //    this.customerName = "";
        //    this.modal = this.modalService.open(content, { size: 'sm' });
        //    this.modal.result.then(() => {



        //        console.log('When user closes');
        //    }, () => { console.log('Backdrop click') })




        //}
	openModelPopup(content) {

		//alert(this.itemser.isEditMode);
		if (this.workFlowtService.isEditMode == false) {
			this.modal = this.modalService.open(content, { size: 'sm' });
			this.modal.result.then(() => {



				console.log('When user closes');
			}, () => { console.log('Backdrop click') })


			var arr = this.selectedAircraftTypes;
			var selectedvalues = arr.join(",");
			this.workFlowtService.getAircraftTypes(selectedvalues).subscribe(
				results => this.onDataLoadaircrafttypeSuccessful(results[0]),
				error => this.onDataLoadFailed(error)
			);
			this.cols = [
				//{ field: 'customerClassificationId', header: 'Customer Classification ID' },
				{ field: 'description', header: 'Aircraft Type' },
				{ field: 'modelName', header: 'Model' },


			];
			this.selectedColumns = this.cols;
		}
		if (this.workFlowtService.isEditMode == true) {

			this.modal = this.modalService.open(content, { size: 'sm' });
			this.modal.result.then(() => {



				console.log('When user closes');
			}, () => { console.log('Backdrop click') })
			if (this.allAircraftinfo) {
				if (this.allAircraftinfo.length >= 0) {
					this.enablePopupData = true;
					var arr = this.selectedAircraftTypes;
					if (this.selectedAircraftTypes) {
						var selectedvalues = arr.join(",");
						this.workFlowtService.getAircraftTypes(selectedvalues).subscribe(
							results => this.onDataLoadaircrafttypeSuccessful(results[0]),
							error => this.onDataLoadFailed(error)
						)
					}
				}
			}
		}

	}
 //   openModelPopup(content) {
        
 //       this.modal = this.modalService.open(content, { size: 'sm' });
 //       this.modal.result.then(() => {



 //           console.log('When user closes');
 //       }, () => { console.log('Backdrop click') })


	//	var arr = this.selectedAircraftTypes;
	//	var selectedvalues = arr.join(",");
	//	this.workFlowtService.getAircraftTypes(selectedvalues).subscribe(
	//		results => this.onDataLoadaircrafttypeSuccessful(results[0]),
	//		error => this.onDataLoadFailed(error)
	//	);
	//	this.cols = [
	//		//{ field: 'customerClassificationId', header: 'Customer Classification ID' },
	//		{ field: 'description', header: 'Aircraft Type' },
	//		{ field: 'modelName', header: 'Model' },


	//	];
	//	this.selectedColumns = this.cols;

	//}

 


    opencountry(content) {
		//debugger
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

    filterintegrations(event) {

        this.integrationCollection = [];
        if (this.allIntegrationInfo.length > 0) {
            for (let i = 0; i < this.allIntegrationInfo.length; i++) {
                let integrationName = this.allIntegrationInfo[i].description;
                if (integrationName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.integrationCollection.push(integrationName);
                }
            }
        }
	}



    editItemIntegrationalCloseModel() {

        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.integrationName;
			this.sourceAction.masterCompanyId = 1;
            this.integration.newAction(this.sourceAction).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.integrationName;
            this.integration.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }
	//editItemCloseModel() {

	//	// debugger;

	//	this.isSaving = true;

	//	if (this.isEditMode == false) {
	//		this.sourceAction.createdBy = this.userName;
	//		this.sourceAction.updatedBy = this.userName;
	//		this.sourceAction.description = this.classificationName;
	//		this.sourceAction.masterCompanyId = 1;
	//		this.customerClassificationService.newAddcustomerclass(this.sourceAction).subscribe(data => {
	//			this.loadCustomerClassifiData();
	//			this.saveCompleted(this.sourceAction);
	//			this.sourceCustomer.customerClassificationId = data.customerClassificationId;
	//		});
	//	}
	//	else {

	//		this.sourceAction.updatedBy = this.userName;
	//		this.sourceAction.description = this.classificationName;
	//		this.sourceAction.masterCompanyId = 1;
	//		this.customerClassificationService.updatecustomerclass(this.sourceAction).subscribe(
	//			response => this.saveCompleted(this.sourceAction),
	//			error => this.saveFailedHelper(error));
	//	}

	//	this.modal.close();
	//}

	editItemCloseModel() {

		// debugger;

		this.isSaving = true;

		if (this.isEditMode == false) {
			this.sourceClassification.createdBy = this.userName;
			this.sourceClassification.updatedBy = this.userName;
			this.sourceClassification.description = this.classificationName;
			this.sourceClassification.masterCompanyId = 1;
			this.customerClassificationService.newAddcustomerclass(this.sourceClassification).subscribe(data => {
				//debugger;
				if (data) { this.sourceCustomer.customerClassificationId = data.customerClassificationId }

				this.loadCustomerClassifiData();
			})
			//role => this.saveSuccessHelper(role),
			//error => this.saveFailedHelper(error));
		}
		else {

			this.sourceClassification.updatedBy = this.userName;
			this.sourceClassification.description = this.classificationName;
			this.sourceClassification.masterCompanyId = 1;
			this.customerClassificationService.updatecustomerclass(this.sourceClassification).subscribe(
				response => this.saveCompleted(this.sourceClassification),
				error => this.saveFailedHelper(error));
		}

		this.modal.close();
	}

    //saveVendorClassificationDetails() {

    //    debugger;

    //    this.isSaving = true;

    //    if (this.isEditMode == false) {
    //        this.sourceAction.createdBy = this.userName;
    //        this.sourceAction.updatedBy = this.userName;
    //        this.sourceAction.classificationName = this.customerClassName;
    //        this.sourceAction.masterCompanyId = 1;
    //        this.customerClassificationService.newAddcustomerclass(this.sourceAction).subscribe(data => {
              
    //            this.loadDataCustomerData();
    //        })
          
    //    }
    //    else {

    //        this.sourceAction.updatedBy = this.userName;
    //        this.sourceAction.classificationName = this.customerClassName;
    //        this.sourceAction.masterCompanyId = 1;
    //        this.customerClassificationService.updatecustomerclass(this.sourceAction).subscribe(
    //            response => this.saveCompleted(this.sourceAction),
    //            error => this.saveFailedHelper(error));
    //    }

    //    this.modal.close();
    //}
    private loadDataCustomerData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.customerClassificationService.getCustomerClassificationList().subscribe(
            results => this.onVendorDataLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onVendorDataLoad(getCustomerClassificationList: CustomerClassification[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getCustomerClassificationList;
        this.allCustomerClassInfo = getCustomerClassificationList;
        //this.loadDataVendorData();
    }
    //filterVendors(event) {

    //    this.vendorCollection = [];
    //    for (let i = 0; i < this.allVendorClassInfo.length; i++) {
    //        let vendorName = this.allVendorClassInfo[i].classificationName;
    //        if (vendorName != "" && vendorName != null && vendorName != "Null") {

    //            if (vendorName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                this.vendorCollection.push(vendorName);
    //            }
    //        }
    //    }
    //}
    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue;
    }


    private refresh() {
        // Causes the filter to refresh there by updating with recently added data.
        this.applyFilter(this.dataSource.filter);
    }
    private onDataLoadSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allActions = allWorkFlows;
        if (this.allActions.length > 0) {
            this.customerId = this.allActions[0].customerId;
        }
        
        //console.log(this.allActions);


    }


    eventHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {
                    //alert("Action Name already Exists");
                    this.disableSaveCusCode = true;
                    this.disableSaveCusName = true;
                }
                else {
                    this.disableSaveCusCode = false;
                    this.disableSaveCusName = false;
                }}
            
        }
    }
    onCustomerNameselected(event) {
        //debugger;
        for (let i = 0; i < this.customerNamecoll.length; i++) {
            if (event == this.customerNamecoll[i][0].name) {
                //alert("Action Name already Exists");
                this.disableSaveCusName = true;
                this.disableSave = true;
                this.selectedActionName = event;
            }
		}
		//this.workFlowtService.getcustomerByNameList(event).subscribe(
		//	results => this.oncustomerloadsuccessfull(results[0]),
		//	error => this.onDataLoadFailed(error)
		//);
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
	filterCountries(event) {

		this.countrycollection = [];
		for (let i = 0; i < this.allCountryinfo.length; i++) {
			let country = this.allCountryinfo[i].nice_name;
			if (country.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.allCountryinfo.push([{
					"countries_id": this.allCountryinfo[i].countries_id,
					"country": country
				}]),
					this.countrycollection.push(country)

			}
		}
	}
	private oncustomerloadsuccessfull(allWorkFlows: any[]) {


		this.CustomerInfoByName = allWorkFlows[0]
		this.sourceCustomer = this.CustomerInfoByName;



	}
    filterNames(event) {

        this.customerNames = [];
        if (this.allActions.length > 0) {
            for (let i = 0; i < this.allActions.length; i++) {
                let name = this.allActions[i].name;
                if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.customerNamecoll.push([{
                        "customerId": this.allActions[i].customerId,
                        "name": name
                    }]),
                    this.customerNames.push(name);
                }
            }
        }
    }
    filterCustomerParentNames(event) {

        this.customerNames = [];
        if (this.allActions.length > 0) {
            for (let i = 0; i < this.allActions.length; i++) {
                let customerParentName = this.allActions[i].name;
                if (customerParentName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.customerNames.push(customerParentName);
                }
            }
        }
    }
    selectedValue(name) {
        //alert(name);
        this.cusname = name;
    }
    filterclassifications(event) {
        this.classificollection = [];
        if (this.allcustomerclassificationInfo.length > 0) {
            for (let i = 0; i < this.allcustomerclassificationInfo.length; i++) {
                let classificationName = this.allcustomerclassificationInfo[i].description;
                if (classificationName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.classificollection.push(classificationName);
                }
            }
        }
    }
    eventCustCodeselection(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedCustomerCode) {
                if (value == this.selectedCustomerCode.toLowerCase()) {
                    //alert("Action Name already Exists");
                    this.disableSaveCusCode = true;
                    this.disableSaveCustomerCode = true;
                }
                else {
                    this.disableSaveCusCode = false;
                    this.disableSaveCustomerCode = false;
                }
            }

        }
        

    }
    onCustomercodeSelected(event) {
        //debugger;
        for (let i = 0; i < this.customerCodesColl.length; i++) {
            if (event == this.customerCodesColl[i][0].customerCode) {
                //alert("Action Name already Exists");
                this.disableSaveCusCode = true;
                this.disableSaveCustomerCode = true;
                this.selectedCustomerCode = event;
            }
        }
    }
    

    filterCustomerCodes(event) {

        this.customerCodes = [];
        if (this.allActions.length > 0) {
            for (let i = 0; i < this.allActions.length; i++) {
                let customerCode = this.allActions[i].customerCode;

                if (customerCode.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.customerCodesColl.push([{
                        "customerId": this.allActions[i].customerId,
                        "customerCode": customerCode
                    }]),
                    this.customerCodes.push(customerCode);

                }
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
    private loadGeneralObject() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getGeneralObj().subscribe(
            results => this.onGeneralObjUrl(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onGeneralObjUrl(allWorkFlows: any) {
        debugger;
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.sourceCustomer = allWorkFlows;


    }
    private ongeneralDataLoadSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allgeneralInfo = allWorkFlows;
        //this.vendorname = this.allgeneralInfo[0].vendorName;
        //this.vendorCode = this.allgeneralInfo[0].vendorCode;
        //console.log(this.allgeneralInfo);


    }


    open(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        //this.sourceCustomer.isActive = true;
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

    openEdit(content, row) {

        this.isEditMode = true;

        this.isSaving = true;
        this.sourceCustomer = row;
        this.loadMasterCompanies();
        // this.actionName = this.sourceCustomer.description;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
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


        this.sourceCustomer = row;


        //this.isSaving = true;
        // debugger;
        //this.workFlowtService.historyAcion(this.sourceCustomer.masterCompanyId).subscribe(
        //    results => this.onHistoryLoadSuccessful(results[0], content),
        //    error => this.saveFailedHelper(error));


    }
    onBlurMethod(data) {
		if (data == 'CustomerTypeId') {
			this.showCustomerTypeId = false;
		}
		if (data == 'name') {
			this.showCustomerName = false;
		}
		if (data == 'customerCode') {
			this.showCustomerCode = false;
		}
		if (data == 'email') {
			this.showCustomerEmail = false;
		}
		if (data == 'customerPhone') {
			this.showCustomerPhone = false;
		}
		if (data == 'address1') {
			this.showCustomerAddress1 = false;
		}
		if (data == 'city') {
			this.showCustomerCity = false;
		}
		if (data == 'stateOrProvince') {
			this.showCustomerState = false;
		}
		if (data == 'postal') {
			this.showCustomerPostal = false;
		}
		if (data == 'country') {
			this.showCustomerCountry = false;
		}
		if (data == 'customerClassificationId') {
			this.showCustomerClassificationId = false;
		}
	}

	sample()
	{
		

		//if (!this.sourceCustomer.name) {
		//	this.showCustomerName = true;
		//}
		//if (!this.sourceCustomer.customerCode) {
		//	this.showCustomerCode = true;
		//}
		//if (!this.sourceCustomer.email) {
		//	this.showCustomerEmail = true;
		//}

		//if (!this.sourceCustomer.customerPhone) {
		//	this.showCustomerPhone = true;
		//}
		//if (!this.sourceCustomer.address1) {
		//	this.showCustomerAddress1 = true;
		//}
		//if (!this.sourceCustomer.city) {
		//	this.showCustomerCity = true;
		//}

		//if (!this.sourceCustomer.stateOrProvince) {
		//	this.showCustomerState = true;
		//}
		//if (!this.sourceCustomer.postal) {
		//	this.showCustomerPostal = true;
		//}
		//if (!this.sourceCustomer.country) {
		//	this.showCustomerCountry = true;
		//}
		//if (!this.sourceCustomer.customerClassificationId) {
		//	this.showCustomerClassificationId = true;
		//}

		
		
	}

	
    editItemAndCloseModel() {


       
		if (!(this.sourceCustomer.name && this.sourceCustomer.customerCode && this.sourceCustomer.customerPhone && this.sourceCustomer.email
			&& this.sourceCustomer.city && this.sourceCustomer.stateOrProvince && this.sourceCustomer.postalCode && this.sourceCustomer.country && this.sourceCustomer.customerClassificationId
			)) {
			this.display = true;
			this.modelValue = true;
		}
		if (this.sourceCustomer.name && this.sourceCustomer.customerCode && this.sourceCustomer.customerPhone && this.sourceCustomer.email
			&& this.sourceCustomer.city && this.sourceCustomer.customerClassificationId && this.sourceCustomer.stateOrProvince && this.sourceCustomer.postalCode && this.sourceCustomer.country
		) {
			this.isSaving = true;

            if (!this.sourceCustomer.customerId) {
                this.sourceCustomer.createdBy = this.userName;
                this.sourceCustomer.updatedBy = this.userName;
                this.sourceCustomer.masterCompanyId = 1;
                this.sourceCustomer.isActive = true;
                if (this.sourceCustomer.parent == false || this.sourceCustomer.parent == null) {
                    this.sourceCustomer.customerParentName = '';

                }
                this.workFlowtService.newAction(this.sourceCustomer).subscribe(data => {
                    this.sourceCustomer.updatedBy = this.userName;
					this.localCollection = data;
					this.sourceCustomer = data;
					this.savesuccessCompleted(this.sourceCustomer);
					this.workFlowtService.generalCollection = this.localCollection;
					this.workFlowtService.financeCollection = this.localCollection;
					this.workFlowtService.contactCollection = this.localCollection;
					this.workFlowtService.billingCollection = this.localCollection;
					this.workFlowtService.shippingCollection = this.localCollection;
					if (this.workFlowtService.generalCollection.address) {
						this.sourceCustomer.address1 = this.workFlowtService.generalCollection.address.line1;
						this.sourceCustomer.address2 = this.workFlowtService.generalCollection.address.line2;
						this.sourceCustomer.address3 = this.workFlowtService.generalCollection.address.line3;
						this.sourceCustomer.city = this.workFlowtService.generalCollection.address.city;
						this.sourceCustomer.stateOrProvince = this.workFlowtService.generalCollection.address.stateOrProvince;
						this.sourceCustomer.postalCode = this.workFlowtService.generalCollection.address.postalCode;
						this.sourceCustomer.country = this.workFlowtService.generalCollection.address.country;

					}
					if (data != null) {
						if (this.selectedModels.length > 0) {

							this.saveAircraftmodelinfo(data.customerId, this.selectedModels);

						}
					}
					if (this.isCustomerAlsoVendor == true) {
						this.workFlowtService.isCustomerAlsoVendor = this.isCustomerAlsoVendor;
						this.workFlowtService.localCollectiontoVendor = data;
					}
					this.alertService.startLoadingMessage();
					//this.AddCustomerAircraftdata(this.localCollection);
					this.activeIndex = 0;
					this.workFlowtService.indexObj.next(this.activeIndex);
					
					//this.router.navigateByUrl('/customersmodule/customerpages/app-customer-contacts');
					
                  
                })
				if (this.selectedIntegrationTypes != null) //separting Array which is having ","
				{
					this.sourceCustomer.IntegrationPortalId = this.selectedIntegrationTypes.toString().split(",");
				}


            }

			else {
				if (this.selectedAircraftTypes != null) {
					this.sourceCustomer.AircraftTypeId = this.selectedAircraftTypes.toString().split(",");
				}

				if (this.selectedIntegrationTypes != null) //separting Array whic is having ","
				{
					this.sourceCustomer.IntegrationPortalId = this.selectedIntegrationTypes.toString().split(",");
				}
                this.sourceCustomer.updatedBy = this.userName;
                if (this.sourceCustomer.parent == false || this.sourceCustomer.parent == null) {
                    this.sourceCustomer.customerParentName = '';

                }
				this.workFlowtService.updateAction(this.sourceCustomer).subscribe(data => {
					this.sourceCustomer.updatedBy = this.userName;
					this.localCollection = data;
					this.sourceCustomer = data;
					this.savesuccessCompleted(this.sourceCustomer);
					this.workFlowtService.generalCollection = this.localCollection;
					this.workFlowtService.financeCollection = this.localCollection;
					this.workFlowtService.contactCollection = this.localCollection;
					this.workFlowtService.billingCollection = this.localCollection;
					this.workFlowtService.shippingCollection = this.localCollection;
					if (this.workFlowtService.generalCollection.address) {
						this.sourceCustomer.address1 = this.workFlowtService.generalCollection.address.line1;
						this.sourceCustomer.address2 = this.workFlowtService.generalCollection.address.line2;
						this.sourceCustomer.address3 = this.workFlowtService.generalCollection.address.line3;
						this.sourceCustomer.city = this.workFlowtService.generalCollection.address.city;
						this.sourceCustomer.stateOrProvince = this.workFlowtService.generalCollection.address.stateOrProvince;
						this.sourceCustomer.postalCode = this.workFlowtService.generalCollection.address.postalCode;
						this.sourceCustomer.country = this.workFlowtService.generalCollection.address.country;

					}
					if (data != null) {
						if (this.selectedModels.length > 0) {

							this.saveAircraftmodelinfo(data.customerId, this.selectedModels);

						}
					}
					if (this.isCustomerAlsoVendor == true) {
						this.workFlowtService.isCustomerAlsoVendor = this.isCustomerAlsoVendor;
						this.workFlowtService.localCollectiontoVendor = data;
					}
					this.alertService.startLoadingMessage();
					//this.AddCustomerAircraftdata(this.localCollection);
					this.activeIndex = 0;
					this.workFlowtService.indexObj.next(this.activeIndex);

					//this.router.navigateByUrl('/customersmodule/customerpages/app-customer-contacts');


				})
				// this.router.navigateByUrl('/customersmodule/customerpages/app-customer-contacts');

            }
        }
        else { }

	}
	nextClick() {
		this.workFlowtService.contactCollection = this.local;
		this.activeIndex = 1;
		this.workFlowtService.indexObj.next(this.activeIndex);
		//this.saveCompleted(this.sourceCustomer);
		this.router.navigateByUrl('/customersmodule/customerpages/app-customer-contacts');

	}

	saveAircraftmodelinfo(cusId, data) {

		for (let i = 0; i < data.length; i++) {
			data[i].customerId = cusId;
			//data[i].partId = partid;
			data[i].createdBy = this.userName;
			data[i].updatedBy = this.userName;


			this.workFlowtService.saveAircraftinfo(data[i]).subscribe(aircraftdata => {
				this.collectionofItemMaster = aircraftdata;
			})

		}
	}
	private savesuccessCompleted(user?: any) {
		this.isSaving = false;


		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);



		this.loadData();
	}
	
	
    public updateToaduithistory(auditServiceCollection) {
        this.workFlowtService.updTeAuditAddress(auditServiceCollection).subscribe(data => {
            this.auditHistoryCollection = data;
            this.workFlowtService.auditServiceCollection = this.auditHistoryCollection;
        })

    }
	public commasepetrated() {
		debugger;
		var arr = this.selectedAircraftTypes;
		var selectedvalues = arr.join(",");
		this.workFlowtService.getAircraftTypes(selectedvalues).subscribe(
			results => this.onDataLoadaircrafttypeSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
		this.cols = [
			//{ field: 'customerClassificationId', header: 'Customer Classification ID' },
			{ field: 'description', header: 'Aircraft Type' },
			{ field: 'modelName', header: 'Model' },


		];
		this.selectedColumns = this.cols;
	}

	public AddCustomerAircraftdata(customerobject) {
		for (let i = 0; i < this.selectedAircraftTypes.length; i++) {
			customerobject.aircraftTypeId = this.selectedAircraftTypes[i];
			this.workFlowtService.Addcustomeraircrafttype(customerobject).subscribe(data => {
				this.localCollection = data;
				this.workFlowtService.customerobject = this.localCollection;
			})
		}


	}


    public dismissModel() {
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

    private saveSuccessHelper(role?: any) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    private saveFailedHelper(error: any) {
        //this.isSaving = false;
        //this.alertService.stopLoadingMessage();
        //this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        //this.alertService.showStickyMessage(error, null, MessageSeverity.error);
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
    onUpload(event) {
        debugger;
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
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

    saveCountry() {

            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
        
            this.workFlowtService.newCountry(this.sourceAction).subscribe(data => { this.countrylist() })

 
	}

	dismissAircraftModel() {
		if (this.selectedModels.length > 0) {
			//this.manfacturerAircraftmodelsarray = [];
			//this.distributionAircraftmodelsarray = [];
			//this.overhaulAircraftmodelsarray = [];
			//this.certificationarrayAircraftmodelsarray = [];
			//this.repairAircraftmodelsarray = [];
			//this.exchangeAircraftmodelsarray = [];
			this.isDeleteMode = false;
			this.isEditMode = false;
			this.modal.close();
			if (this.workFlowtService.isEditMode == false || (this.workFlowtService.isEditMode == true && this.selectedModels.length > 0)) {

				//this.manfacturerAircraftmodelsarray = this.manfacturerAircraftDataParsing(JSON.parse(JSON.stringify(this.selectedModels)));
				//this.distributionAircraftmodelsarray = JSON.parse(JSON.stringify(this.selectedModels));
				//this.overhaulAircraftmodelsarray = JSON.parse(JSON.stringify(this.selectedModels));
				//this.certificationarrayAircraftmodelsarray = JSON.parse(JSON.stringify(this.selectedModels));
				//this.repairAircraftmodelsarray = JSON.parse(JSON.stringify(this.selectedModels));
				//this.exchangeAircraftmodelsarray = JSON.parse(JSON.stringify(this.selectedModels));
			}
		}
		this.showInput = true;
		this.modal.close();
	}
	
	public saveSelectedModel(selectedRow, indeex) {

		selectedRow.isBoolean = indeex;

	}

	public getSelectedItem(selectedRow, event) {
		//;
		let ischange = false;
		if (this.selectedModels.length > 0) {
			//praveen's code//
			this.selectedModels.map((row) => {
				if (selectedRow.aircraftModelId == row.aircraftModelId) {
					row.priority = event.target.value;
					ischange = true;
				}
			});
		}
		if (!ischange) {
			this.selectedModels.push(selectedRow);
		}

	}
	
	getAircraftModelsData(): any {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getAircaftList(this.sourceCustomer.customerId

		).subscribe(
			results => this.onAircarftmodelloadsuccessfull(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	private onAircarftmodelloadsuccessfull(allWorkFlows: any[]) {
		//
		for (let i = 0; i < allWorkFlows.length; i++) {
			allWorkFlows[i].checkbox = true;
		}
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allAircraftsGet = allWorkFlows;
		if (this.allAircraftsGet) {
			this.enablePlus = true;
			this.allAircraftinfo = JSON.parse(JSON.stringify(this.allAircraftsGet));
			this.isDeleteMode = false;
			this.isEditMode = false;
			this.isEnabeCapes = true;

		}
	}
	private onIntegrationData(getEmployeeCerficationList: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getEmployeeCerficationList;
		this.allintegrationdetails = getEmployeeCerficationList;
		if (this.allintegrationdetails.length > 0) {
			for (let i = 0; i < this.allintegrationdetails.length; i++)
				this.integrationvalues.push(
					{ value: this.allintegrationdetails[i].integrationPortalId, label: this.allintegrationdetails[i].description },


				);
		}
		let valAirCraft = [];
		this.workFlowtService.getintegrationtypes(this.sourceCustomer.customerId)
			.subscribe(results => {
				this.allIntegrationInfo = results;
				if (results != null) {
					for (let i = 0; i < this.allIntegrationInfo.length; i++) {
						valAirCraft.push(this.allIntegrationInfo[i].integrationPortalId);
					}
					this.selectedIntegrationTypes = valAirCraft;
					console.log(this.selectedIntegrationTypes);
				}

			},
				error => this.onDataLoadFailed(error)
			);
	}

	public Addintegration(imObj) {
		for (let i = 0; i < this.selectedIntegrationTypes.length; i++) {
			imObj.aircraftTypeId = this.selectedIntegrationTypes[i];
			this.workFlowtService.Addmultiintegrations(imObj).subscribe(data => {
				this.localCollection = data;
			})
		}
	}
	private Integration() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.integration.getWorkFlows().subscribe(
			results => this.onIntegrationData(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	keyPress(event: any) {
		const pattern = /[0-9\+\-\ ]/;

		let inputChar = String.fromCharCode(event.charCode);
		if (event.keyCode != 8 && !pattern.test(inputChar)) {
			event.preventDefault();
		}
	}
}