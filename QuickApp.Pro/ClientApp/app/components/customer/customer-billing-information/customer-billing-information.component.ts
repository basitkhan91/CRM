import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { CustomerBillingAddressModel } from '../../../models/customer-billing-address.model';
import { AuthService } from '../../../services/auth.service';
import { getValueFromObjectByKey, getObjectByValue, editValueAssignByCondition } from '../../../generic/autocomplete';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuditHistory } from '../../../models/audithistory.model';
@Component({
	selector: 'app-customer-billing-information',
	templateUrl: './customer-billing-information.component.html',
	styleUrls: ['./customer-billing-information.component.scss'],

})
/** anys component*/
export class CustomerBillingInformationComponent {
	@Input() savedGeneralInformationData;
	@Input() countryListOriginal;
	@Input() editGeneralInformationData;
	@Input() editMode;
	@Output() tab = new EventEmitter<any>();
	countryList: any[];
	// countryListOriginal: any[];
    selectedRowForDelete: any;
	billingInfo = new CustomerBillingAddressModel()
	billingInfoList: any;
	billingInfoTableHeaders = [
		{ field: 'siteName', header: 'Site Name' },
		{ field: 'address1', header: 'Address1' },
		{ field: 'address2', header: 'Address2' },
	
		{ field: 'city', header: 'City' },
		{ field: 'stateOrProvince', header: 'State/Prov' },
		{ field: 'postalCode', header: 'Postal Code' },
		{ field: 'countryName', header: 'Country' }
	]
	viewData: any;
	id: number;
	customerCode: any;
	customerName: any;
	isEditMode: boolean = false;
    billingHistoryData: Object;
    modal: NgbModalRef;
    isDeleteMode: boolean = false;
    customerBillingAddressId: number;
    public sourceCustomer: any = {}
    public auditHisory: AuditHistory[] = [];
    billingauditHisory: any[];
	// isViewModel : boolean = false



	// countryName: string;
	// countrycollection: any[];
	// allCountryinfo: any[];
	// activeIndex: number;
	// showCustomerSiteName: boolean;
	// showCustomerBillToAddress1: boolean;
	// showCustomerBillToAddress2: boolean;
	// showCustomerBillToAddress3: boolean;
	// showCustomerBillToCity: boolean;
	// showCustomerBillToStateProv: boolean;
	// showCustomerBillToPostalCode: boolean;
	// showCustomerBillToCountry: boolean;
	// customerBillingdetails: any;
	// public overlays: any[]; //Prime Ng Google Map
	// options: any; // Prime Ng Google Map
	// billCollection: any;
	// allBillDetails: any[];
	// updatedCollection: {};
	// customerBillingAddressdetails: any;
	// local: any;
	// addressId: any;
	// allAddresses: any[];
	// customerId: any;
	// customerCode: any;
	// customerName: any;
	// allgeneralInfo: any[];
	// action_name: any = "";
	// memo: any = "";
	// createdBy: any = "";
	// updatedBy: any = "";
	// createddate: any = "";
	// updatedDate: any = "";
	// billViaObj: any = {};
	// checkAddress: boolean = false;
	// disablesave: boolean;
	// selectedCountries: any;
	// sourcebillingInfo: any = {};
	// @ViewChild(MatPaginator) paginator: MatPaginator;
	// @ViewChild(MatSort) sort: MatSort;
	// filteredBrands: any[];
	// displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
	// dataSource: MatTableDataSource<any>;
	// allActions: any[] = [];
	// allComapnies: MasterCompany[] = [];
	// private isSaving: boolean;
	// public sourceAction: any = {};
	// public auditHisory: AuditHistory[] = [];
	// private bodyText: string;
	// loadingIndicator: boolean;
	// closeResult: string;
	// selectedColumn: any[];
	// selectedColumns: any[];
	// selectedShipViaColumn: any[];
	// selectedShipViaColumns: any[];
	// cols: any[];
	// shipViacols: any[];
	// title: string = "Create";
	// id: number;
	// errorMessage: any;
	// modal: NgbModalRef;
	// actionName: string;
	// Active: string = "Active";
	// length: number;
	// localCollection: any[] = [];
	// display: boolean = false; 
	// modelValue: boolean = false;
	// public sourceCustomer: any = {};
	// isEditMode: boolean = false;
	// isDeleteMode: boolean = false;
	// xlocation: string[];


    constructor(public customerService: CustomerService, private authService: AuthService, private alertService: AlertService, private modalService: NgbModal,
        private activeModal: NgbActiveModal,) {
		// if (this.workFlowtService.financeCollection) {
		// 	this.local = this.workFlowtService.financeCollection;
		// }
		// this.dataSource = new MatTableDataSource();
		// if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
		// 	this.local = this.workFlowtService.listCollection.t;
		// }
		// this.dataSource = new MatTableDataSource();
		// if (this.local){
		//    // if (this.workFlowtService.generalCollection.isAddressForBillingAndShipping == true) {
		//         //this.local = this.workFlowtService.generalCollection;
		//         this.sourceCustomer.siteName = this.local.name;
		//         this.sourceCustomer.address1 = this.local.address.line1;
		//         this.sourceCustomer.address2 = this.local.address.line2;
		//         this.sourceCustomer.address3 = this.local.address.line3;
		//         this.sourceCustomer.city = this.local.address.city;
		//         this.sourceCustomer.country = this.local.address.country;
		//         this.sourceCustomer.stateOrProvince = this.local.address.stateOrProvince;
		//         this.sourceCustomer.postalCode = this.local.address.postalCode;
		//     //}
		// }
	}


	ngOnInit(): void {

		if (this.editMode) {
			this.id = this.editGeneralInformationData.customerId;
			this.customerCode = this.editGeneralInformationData.customerCode;
			this.customerName = this.editGeneralInformationData.name;
			this.getBillingDataById()
		} else {
			this.id = this.savedGeneralInformationData.customerId;
			this.customerCode = this.savedGeneralInformationData.customerCode;
            this.customerName = this.savedGeneralInformationData.name;
            //Added By Vijay For Customer Create time IsBillingAddess is selected checkbox Then list page we are displaying list
            this.getBillingDataById()
		}


		// this.getAllcountrieslist();
		// this.workFlowtService.currentUrl = '/customersmodule/customerpages/app-customer-billing-information';
		// this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);//Bread Crumb
		// this.workFlowtService.ShowPtab = true;
		// this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab); //steps
		// this.countrieslist();

		// if (this.local) {
		//     this.loadData();

		// }
		// this.options = {
		//     center: { lat: 36.890257, lng: 30.707417 },
		//     zoom: 12
		// };

	}

	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}



	// getAllcountrieslist() {
	// 	this.customerService.getCountrylist().subscribe(
	// 		res => {
	// 			console.log(res)
	// 			this.countryListOriginal = res[0];
	// 		}
	// 	);
	// }


	filtercountry(event) {
		this.countryList = this.countryListOriginal;


		const countryData = [...this.countryListOriginal.filter(x => {
			return x.countries_name.toLowerCase().includes(event.query.toLowerCase())
		})]
		this.countryList = countryData;

	}
    saveBillingInformation() {
    
            const data = {
                ...this.billingInfo,
                createdBy: this.userName,
                updatedBy: this.userName,
                country: getValueFromObjectByKey('countries_id', this.billingInfo.country),
	      masterCompanyId: 1,
               // isPrimary: false,
                isActive: true,
                customerId: this.id
             
            }
            // create shipping 
            if (!this.isEditMode) {
                this.customerService.newBillingAdd(data).subscribe(() => {
                    this.billingInfo = new CustomerBillingAddressModel();
                    this.alertService.showMessage(
                        'Success',
                        `Saved  Billing Information Sucessfully `,
                        MessageSeverity.success
                    );
                    this.getBillingDataById();
                })
            } else {
                // update shipping 
                this.customerService.updateBillinginfo(data).subscribe(() => {
                    this.billingInfo = new CustomerBillingAddressModel();
                    this.alertService.showMessage(
                        'Success',
                        `Updated  Billing Information Sucessfully `,
                        MessageSeverity.success
                    );
                    this.getBillingDataById();
                })
            }



        }

	
    addBillingIfo() {
        this.isEditMode = false;
        this.billingInfo = new CustomerBillingAddressModel();
    }
	getBillingDataById() {
		this.customerService.getCustomerBillViaDetails(this.id).subscribe(res => {
			this.billingInfoList = res[0]
		})
	}

	openBillingView(data) {
		console.log(data);
        this.viewData = data;

		// this.isViewModel = false;
	}
	nextClick() {
		this.tab.emit('Shipping');
	}
	backClick() {
		this.tab.emit('Financial');
	}
    openEdit(rowData) {
        
      	this.isEditMode = true;
        this.billingInfo = { ...rowData, country: getObjectByValue('countries_id', rowData.country, this.countryListOriginal) };
	}

  //  getCustomerBillingHistory(content,rowData){
	 // const {customerBillingAddressId} = rowData;
		//this.customerService.getCustomerBillingHistory(this.id, customerBillingAddressId).subscribe(res => {
  //          this.billingHistoryData = res;
  //          this.modal = this.modalService.open(content, { size: 'lg' });
  //          this.modal.result.then(() => {
  //              console.log('When user closes');
  //          }, () => { console.log('Backdrop click') })
		//})
  //  }
    getCustomerBillingHistory(content, row) {
        const { customerBillingAddressId } = row;
        this.alertService.startLoadingMessage();
     
        this.customerService.getCustomerBillingHistory(this.id, customerBillingAddressId).subscribe(
            results => this.onAuditHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));
    }
    private onAuditHistoryLoadSuccessful(auditHistory, content) {
        this.alertService.stopLoadingMessage();

        
        this.billingauditHisory = auditHistory;
      
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    getColorCodeForHistory(i, field, value) {
        const data = this.billingauditHisory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }

    //deleteBillingInfo(rowData) {
    //    const obj = {
    //        isActive: false,
    //        addressStatus: false,
    //        updatedBy: this.userName,
    //        customerBillingAddressId: rowData.customerBillingAddressId
    //    }
    //    // delete customer shipping 
    //    this.customerService.updateDeleteBillinginfo(obj).subscribe(() => {
    //        // toaster
    //        this.alertService.showMessage(
    //            'Success',
    //            `Deleted Billing Sucessfully `,
    //            MessageSeverity.success
    //        );
    //        this.getBillingDataById();
    //    })


    //}

    async updateActiveorInActiveForBilling(rowData) {
  
        console.log(rowData);

        await this.customerService.CustomersBillingUpdateforActive(rowData.customerBillingAddressId, rowData.isActive, this.userName).subscribe(res => {

            this.getBillingDataById();
            this.alertService.showMessage(
                'Success',
                `Sucessfully Updated  Billing Status`,
                MessageSeverity.success
            );
        })
    }



    dismissModel() {
        this.modal.close();
    }
    deleteBillingInfo(content, rowData) {

        this.selectedRowForDelete = rowData;
        this.isDeleteMode = true;

     
        this.customerBillingAddressId = rowData.customerBillingAddressId
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    deleteItemAndCloseModel() {
        const obj = {
            isActive: false,
            addressStatus: false,
            updatedBy: this.userName,
            customerBillingAddressId: this.customerBillingAddressId
        }
      
        if (this.customerBillingAddressId>0) {

            this.customerService.updateDeleteBillinginfo(obj).subscribe(
                response => this.saveCompleted(this.sourceCustomer),
                error => this.saveFailedHelper(error));
        }
        this.modal.close();
    }
    private saveCompleted(user?: any) {

        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
            this.saveCompleted
        }
        this.getBillingDataById();
    }
    private saveFailedHelper(error: any) {

        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }


	// openEdit(data){
	// 	this.billingInfo = data;
	// }
	// ngAfterViewInit() {

	// }

	// Get Map Data
	//getlatlng(address) {
	//       this.checkAddress = true;
	//	return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB_W96L25HhFWgqLblcikircQKjU6bgTgk').subscribe((data: any) => {
	//		this.options = {
	//			center: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng },
	//			zoom: 12
	//		};
	//		this.overlays = [
	//               new google.maps.Marker({ location: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }, title: "Konyaalti" }),

	//		];
	//		return data;


	//	});
	//}



	// Load Countries//


	// private onDatacountrySuccessful(allWorkFlows: any[]) {
	//     this.alertService.stopLoadingMessage();
	//     this.loadingIndicator = false;
	//     this.dataSource.data = allWorkFlows;
	//     this.allCountryinfo = allWorkFlows;

	// }

	// Back Click
	// backClick() {
	// 	this.workFlowtService.contactCollection = this.local;
	// 	this.activeIndex = 2;
	// 	this.workFlowtService.indexObj.next(this.activeIndex);
	// 	this.router.navigateByUrl('/customersmodule/customerpages/app-customer-financial-information');

	// }

	//     // Model Popup Close
	//     public dismissModel() {
	//         this.isDeleteMode = false;
	//         this.isEditMode = false;
	//         this.modal.close();
	//     }

	//     // Load Customer Bill details
	// 	private loadData() {
	// 		this.alertService.startLoadingMessage();
	// 		this.loadingIndicator = true;
	//         this.workFlowtService.getCustomerBillViaDetails(this.local.customerId).subscribe(
	// 			results => this.onDataLoadSuccessful(results[0]),
	// 			error => this.onDataLoadFailed(error)
	// 		);

	// 		this.cols = [
	// 			{ field: 'siteName', header: 'Site Name' },
	// 			{ field: 'address1', header: 'Address1' },
	// 			{ field: 'address2', header: 'Address2' },
	// 			{ field: 'address3', header: 'Address3' },
	// 			{ field: 'city', header: 'City' },
	// 			{ field: 'stateOrProvince', header: 'State/Prov' },
	// 			{ field: 'postalCode', header: 'Postal Code' },
	// 			{ field: 'country', header: 'Country' }

	// 		];
	// 		this.selectedColumns = this.cols;

	// 	}

	//     openBillViaEdit(rowObject) {
	// 		this.isEditMode = true;
	// 		this.isSaving = true;
	// 		this.billViaObj = rowObject;
	// 		this.loadMasterCompanies();
	// 	}

	//     // Load Master Companies
	// 	private loadMasterCompanies() {
	// 		this.alertService.startLoadingMessage();
	// 		this.loadingIndicator = true;

	// 		this.masterComapnyService.getMasterCompanies().subscribe(
	// 			results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
	// 			error => this.onDataLoadFailed(error)
	// 		);

	// 	}
	//     private onDataLoadSuccessful(allWorkFlows: any) {
	//         this.alertService.stopLoadingMessage();
	//         this.loadingIndicator = false;
	//         this.dataSource.data = allWorkFlows;
	//         this.allActions = allWorkFlows;
	//     }





	// 	public applyFilter(filterValue: string) {
	// 		this.dataSource.filter = filterValue;
	// 	}


	// 	handleChange(rowData, e) {
	// 		if (e.checked == false) {
	// 			this.sourceCustomer = rowData;
	// 			this.sourceCustomer.updatedBy = this.userName;
	// 			this.Active = "In Active";
	// 			this.sourceCustomer.isActive == false;
	// 			this.workFlowtService.updateActionforActiveforBilling(this.sourceCustomer).subscribe(
	// 				response => this.saveCompleted(this.sourceCustomer),
	// 				error => this.saveFailedHelper(error));
	//             this.sourceCustomer = "";
	// 		}
	// 		else {
	// 			this.sourceCustomer = rowData;
	// 			this.sourceCustomer.updatedBy = this.userName;
	// 			this.Active = "Active";
	// 			this.sourceCustomer.isActive == true;
	// 			this.workFlowtService.updateActionforActiveforBilling(this.sourceCustomer).subscribe(
	// 				response => this.saveCompleted(this.sourceCustomer),
	// 				error => this.saveFailedHelper(error));
	//             this.sourceCustomer = "";
	// 		}

	// 	}
	// 	private refresh() {
	// 		// Causes the filter to refresh there by updating with recently added data.
	// 		this.applyFilter(this.dataSource.filter);
	// 	}

	// 	private onDataLoadFailed(error: any) {
	// 		// alert(error);
	// 		this.alertService.stopLoadingMessage();
	// 		this.loadingIndicator = false;

	// 	}

	//     // Filter Details
	// 	filterActions(event) {
	// 		this.localCollection = [];
	// 		for (let i = 0; i < this.allActions.length; i++) {
	// 			let actionName = this.allActions[i].description;
	// 			if (actionName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
	// 				this.localCollection.push(actionName);

	// 			}
	// 		}
	// 	}

	// 	private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
	// 		this.alertService.stopLoadingMessage();
	// 		this.loadingIndicator = false;
	// 		this.auditHisory = auditHistory;
	// 		this.modal = this.modalService.open(content, { size: 'lg' });
	// 		this.modal.result.then(() => {
	// 			console.log('When user closes');
	// 		}, () => { console.log('Backdrop click') })


	// 	}

	// 	private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
	// 		this.alertService.stopLoadingMessage();
	// 		this.loadingIndicator = false;
	// 		this.allComapnies = allComapnies;

	// 	}
	// 	toggledbldisplay(data) {
	// 		this.sourceCustomer = data;
	// 	}

	// 	open(content) {
	// 		this.isEditMode = false;
	// 		this.isDeleteMode = false;
	// 		this.isSaving = true;
	// 		this.loadMasterCompanies();
	// 		this.actionName = "";
	// 		this.modal = this.modalService.open(content, { size: 'sm' });
	// 		this.modal.result.then(() => {
	// 			console.log('When user closes');
	// 		}, () => { console.log('Backdrop click') })
	// 	}

	// 	openDelete(content, row) {

	// 		this.isEditMode = false;
	// 		this.isDeleteMode = true;
	// 		this.sourceCustomer = row;
	// 		this.modal = this.modalService.open(content, { size: 'sm' });
	// 		this.modal.result.then(() => {
	// 			console.log('When user closes');
	// 		}, () => { console.log('Backdrop click') })
	// 	}

	// 	openEdit(row) {
	// 		this.isEditMode = true;
	// 		this.isSaving = true;
	//         this.sourceCustomer = {...row};
	// 		this.loadMasterCompanies();

	//     }
	//     onAddBillingInfo() {
	//         this.sourceCustomer = {};
	//         this.isEditMode = false;
	//     }

	// 	openView(content, row) {

	// 		this.sourceCustomer = row;
	// 		this.action_name = row.description;
	// 		this.memo = row.memo;
	// 		this.createdBy = row.createdBy;
	// 		this.updatedBy = row.updatedBy;
	// 		this.createddate = row.createdDate;
	// 		this.updatedDate = row.updatedDate;
	// 		this.loadMasterCompanies();
	// 		this.modal = this.modalService.open(content, { size: 'sm' });
	// 		this.modal.result.then(() => {
	// 			console.log('When user closes');
	// 		}, () => { console.log('Backdrop click') })
	// 	}
	// 	openHelpText(content) {
	// 		this.modal = this.modalService.open(content, { size: 'sm' });
	// 		this.modal.result.then(() => {
	// 			console.log('When user closes');
	// 		}, () => { console.log('Backdrop click') })
	// 	}

	// 	openHist(content, row) {
	// 		this.alertService.startLoadingMessage();
	// 		this.loadingIndicator = true;
	// 		this.billViaObj = row;
	// 		this.isSaving = true;
	// 		//debugger;
	// 		this.workFlowtService.BillviaHistory(this.sourceCustomer.customerBillingAddressId).subscribe(
	// 			results => this.onHistoryLoadSuccessful(results[0], content),
	// 			error => this.saveFailedHelper(error));


	// 	}

	// 	openShipaddressHistory(content, row) {
	// 		//this.alertService.startLoadingMessage();
	// 		//this.loadingIndicator = true;
	// 		//this.sourceCustomer = row;
	// 		//this.isSaving = true;
	// 		//this.workFlowtService.billaddressHistory(this.sourceCustomer.customerBillingAddressId).subscribe(
	// 		//	results => this.onHistoryLoadSuccessful(results[0], content),
	//   //          error => this.saveFailedHelper(error));
	//         this.modal = this.modalService.open(content, { size: 'lg' });
	//         this.modal.result.then(() => {
	//             console.log('When user closes');
	//         },
	//             () => { console.log('Backdrop click') });

	// 	}


	// 	get userName(): string {
	// 		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	// 	}

	// 	onBlurMethod(data) {
	// 		if (data == 'siteName') {
	// 			this.showCustomerSiteName = false;
	// 		}
	// 		if (data == 'address1') {
	// 			this.showCustomerBillToAddress1 = false;
	// 		}

	// 		if (data == 'city') {
	// 			this.showCustomerBillToCity = false;
	// 		}
	// 		if (data == 'stateOrProvince') {
	// 			this.showCustomerBillToStateProv = false;
	// 		}
	// 		if (data == 'postalCode') {
	// 			this.showCustomerBillToPostalCode = false;
	// 		}
	// 		if (data == 'country') {
	// 			this.showCustomerBillToCountry = false;
	// 		}

	// 	}


	//     // Save Billing Info

	//     editItemAndCloseModel() {
	//         if (!(this.sourceCustomer.siteName && this.sourceCustomer.address1 
	//             && this.sourceCustomer.city && this.sourceCustomer.stateOrProvince && this.sourceCustomer.postalCode && this.sourceCustomer.country
	//         )) {
	//             //this.display = true;
	//             this.modelValue = true;
	//         }
	//         this.isSaving = true;
	//         if (this.sourceCustomer.siteName && this.sourceCustomer.address1 
	// 			&& this.sourceCustomer.city && this.sourceCustomer.stateOrProvince && this.sourceCustomer.postalCode && this.sourceCustomer.country) {
	// 			if (!this.sourceCustomer.customerId) {
	//                     this.sourceCustomer.createdBy = this.userName;
	//                     this.sourceCustomer.updatedBy = this.userName;
	//                     this.sourceCustomer.masterCompanyId = 1;
	//                     this.sourceCustomer.customerId = this.local.customerId;
	//                     this.workFlowtService.newBillingAdd(this.sourceCustomer).subscribe(data => {
	//                         this.localCollection = data;
	// 						this.loadData();
	// 						this.savesuccessCompleted(this.sourceCustomer);
	// 						this.sourceCustomer = {};
	// 						})
	// 					this.activeIndex = 3;
	// 					this.workFlowtService.indexObj.next(this.activeIndex);
	//                 }
	//                 else {
	//                     this.sourceCustomer.isActive = true;
	//                     this.sourceCustomer.updatedBy = this.userName;
	//                     this.sourceCustomer.createdBy = this.userName;
	//                     this.sourceCustomer.masterCompanyId = 1;
	//                     this.workFlowtService.updateBillinginfo(this.sourceCustomer).subscribe(data => {
	//                         this.updatedCollection = data;
	// 						this.loadData();
	// 						this.saveCompleted(this.sourceCustomer);
	// 						this.sourceCustomer = {};
	// 					})

	// 					this.activeIndex = 3;
	// 					//this.workFlowtService.indexObj.next(this.activeIndex);
	// 					//this.router.navigateByUrl('/customersmodule/customerpages/app-customer-shipping-information');
	//             }


	//         }
	//         else {

	//         }


	//     }
	//     // Update Billing address
	// 	updateCustomerBillingAddress(updateObj: any) {
	// 		//debugger;
	// 		this.workFlowtService.updateCustomerBillingAddressDetails(updateObj, this.local.customerId).subscribe(data => {
	// 			this.customerBillingdetails = data;
	//             this.workFlowtService
	//                 .newBillingAddWithAddress(this.sourceCustomer,
	//                     this.customerBillingAddressdetails.customerBillingAddressId).subscribe(data => {
	//                     this.localCollection = data;
	//                     this.updateCustomerBillingAddress(this.localCollection);

	//                 });
	// 			this.loadData();
	// 		})
	// 	}

	//     // Delete Billing data
	// 	deleteItemAndCloseModel(rowData) {
	//         this.isSaving = true;
	//         this.sourceCustomer.isDelete = true;
	// 		this.sourceCustomer.addressStatus = false;
	// 		this.sourceCustomer.updatedBy = this.userName;
	//         this.sourceCustomer.customerBillingAddressId = rowData.customerBillingAddressId;
	//         this.workFlowtService.updateDeleteBillinginfo(this.sourceCustomer).subscribe(
	// 			response => this.saveCompleted(this.sourceCustomer),
	// 			error => this.saveFailedHelper(error));
	// 	}

	//     //deleteItemAndCloseModel(customerBillingAddressId) {
	//     //    this.isSaving = true;
	//     //    this.sourceCustomer.isDelete = true;
	//     //    this.workFlowtService.updateDeleteBillinginfo(customerBillingAddressId).subscribe(
	//     //        response => this.saveCompleted(this.sourceCustomer),
	//     //        error => this.saveFailedHelper(error));
	//     //}

	// 	private saveCompleted(user?: any) {
	// 		this.isSaving = false;

	// 		if (this.isDeleteMode == true) {
	// 			this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
	// 			this.isDeleteMode = false;
	// 		}
	// 		else {
	// 			this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

	// 		}

	// 		this.loadData();
	// 	}

	// 	deleteItemShippingCloseModel(customerBillingId) {
	// 		this.isSaving = true;
	// 		this.billViaObj.isActive = false;
	// 		this.billViaObj.updatedBy = this.userName;
	// 		this.billViaObj.customerBillingId = customerBillingId;
	//         this.workFlowtService.deleteCustomerAcion(this.billViaObj).subscribe(data => {
	// 		})

	// 		//this.modal.close();
	// 	}

	// 	dismissBillViaModelModel() {
	// 		this.isDeleteMode = false;
	// 		this.isEditMode = false;
	// 	}

	// 	private savesuccessCompleted(user?: any) {
	// 		this.isSaving = false;

	// 		this.alertService.showMessage("Success", `Action was saved successfully`, MessageSeverity.success);



	// 		this.loadData();
	// 	}

	//     // Next Click
	// 	nextClick() {
	// 		if (this.local) {
	// 			this.workFlowtService.financeCollection = this.local;
	// 		}
	// 		this.activeIndex = 4;
	// 		this.workFlowtService.indexObj.next(this.activeIndex);
	// 		this.router.navigateByUrl('/customersmodule/customerpages/app-customer-shipping-information');

	// 	}


	// 	private saveFailedHelper(error: any) {
	// 		this.isSaving = false;
	// 		this.alertService.stopLoadingMessage();
	// 		this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
	// 		this.alertService.showStickyMessage(error, null, MessageSeverity.error);
	//     }



	//     // Filter Country
	//     filtercountry(event) {
	//         this.countrycollection = [];
	//         if (this.allCountryinfo.length > 0) {
	//             for (let i = 0; i < this.allCountryinfo.length; i++) {
	// 				let countryName = this.allCountryinfo[i].nice_name;
	//                 if (countryName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
	//                     this.countrycollection.push(countryName);
	//                 }
	//             }
	//         }
	//     }

	//     // Save Country
	//     saveCountryList() {
	//         this.sourceAction.createdBy = this.userName;
	//         this.sourceAction.updatedBy = this.userName;

	//         this.workFlowtService.newCountry(this.sourceAction).subscribe(data => { this.countrieslist() });


	//     }


	//     opencountry(content) {
	//         this.isEditMode = false;
	//         this.isDeleteMode = false;
	//         this.isSaving = true;
	//         this.loadMasterCompanies();
	//         this.sourceAction.isActive = true;
	//         this.countryName = "";
	//         this.modal = this.modalService.open(content, { size: 'sm' });
	//         this.modal.result.then(() => {
	//                 console.log('When user closes');
	//             },
	//             () => { console.log('Backdrop click') });
	//     }

	//     // on country selected
	//     onCountrieselected(event) {
	//         if (this.allCountryinfo) {
	//             for (let i = 0; i < this.allCountryinfo.length; i++) {
	//                 if (event == this.allCountryinfo[i].nice_name) {
	//                     this.sourceCustomer.nice_name = event;
	//                     this.disablesave = false;

	//                     this.selectedCountries = event;
	//                 }
	//             }
	//         }
	//     }

	//     eventCountryHandler(event) {
	//         if (event.target.value != "") {
	//             let value = event.target.value.toLowerCase();
	//             if (this.selectedCountries) {
	//                 if (value == this.selectedCountries.toLowerCase()) {
	//                     this.disablesave = false;
	//                 }
	//                 else {
	//                     this.disablesave = true;
	//                 }
	//             }

	//         }
	//     }

	//     // Open Billing
	// 	openBillingView(content, row) {
	// 		this.sourcebillingInfo = row;
	// 		this.createdBy = row.createdBy;
	// 		this.updatedBy = row.updatedBy;
	// 		this.createddate = row.createdDate;
	// 		this.updatedDate = row.updatedDate;
	// 		this.loadMasterCompanies();
	// 		this.modal = this.modalService.open(content, { size: 'sm' });
	//         this.modal.result.then(() => {
	//                 console.log('When user closes');
	//             },
	//             () => { console.log('Backdrop click') });
	// }
}











