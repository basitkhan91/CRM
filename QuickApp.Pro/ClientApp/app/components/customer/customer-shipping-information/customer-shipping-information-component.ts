
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from '../../../services/auth.service';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { CustomerShippingModel } from '../../../models/customer-shipping.model';
import { CustomerInternationalShippingModel, CustomerInternationalShipVia } from '../../../models/customer-internationalshipping.model';
import { getValueFromObjectByKey, getObjectById, editValueAssignByCondition } from '../../../generic/autocomplete';
@Component({
    selector: 'app-customer-shipping-information',
    templateUrl: './customer-shipping-information.component.html',
    styleUrls: ['./customer-shipping-information.component.scss'],

})
/** anys component*/
export class CustomerShippingInformationComponent implements OnInit {

    // [x: string]: any;

    @Input() savedGeneralInformationData;
    @Input() countryListOriginal;
    @Input() editGeneralInformationData;
    @Input() editMode;
    @Output() tab = new EventEmitter();

    domesticShippingInfo = new CustomerShippingModel()
    internationalShippingInfo = new CustomerInternationalShippingModel()

    internationalShippingViaData: any;
    totalRecordsForInternationalShipVia: any;
    isEditInternationalShipVia: boolean = false;
    isEditDomesticShipVia: boolean = false;
    // countryListOriginal: any[];
    countrycollection: any[];
    domesticShippingHeaders = [
        { field: 'siteName', header: 'Site Name' },
        { field: 'address1', header: 'Address1' },
        { field: 'address2', header: 'Address2' },
        { field: 'address3', header: 'Address3' },
        { field: 'city', header: 'City' },
        { field: 'stateOrProvince', header: 'State Or Province' },
        { field: 'postalCode', header: 'Postal Code' },
        { field: 'country', header: 'Country' }
    ]
    internationalShippingHeaders = [
        { field: 'exportLicense', header: 'Export License' },
        { field: 'description', header: 'Description' },
        { field: 'isPrimary', header: 'IsDefault' },
        { field: 'startDate', header: 'Start Date' },
        { field: 'expirationDate', header: 'Expiration Date' },
        { field: 'amount', header: 'Amount' }
    ]
    selectedColumnsForDomesticTable = this.domesticShippingHeaders;
    selectedColumnsForInternationTable = this.internationalShippingHeaders;
    domesticShippingData: any[];
    sourceViewforShipping: any;
    isEditDomestic: boolean = false;
    isEditInternational: boolean = false;
    internationalShippingData: any;
    selectedrowsFromDomestic: any;
    selectedrowsFromInternational: any;
    pageIndexForInternational: number = 0;
    pageSizeForInternational: number = 10;
    pageIndexForInternationalShipVia: number = 0;
    pageSizeForInternationalShipVia: number = 10;
    totalRecordsForInternationalShipping: any;
    sourceViewforInterShipping: any;
    sourceViewforInterShippingVia: any;
    shipViaInternational = new CustomerInternationalShipVia();
    shipViaDomestic = new CustomerInternationalShipVia();
    editableRowIndexForIS: any;
    id: number;
    // selectedShipVia: any;
    selectedColumnsForInternationShipViaTable = [
        { field: 'shipVia', header: 'Ship Via' },
        { field: 'shippingAccountInfo', header: 'Shipping AccountInfo' },
        { field: 'shippingURL', header: 'Shipping URL' },
        { field: 'shippingId', header: 'shipping Id' },
        { field: 'memo', header: 'Memo' }

    ];
    selectedShipViaInternational: any;
    selectedShipViaDomestic: any;
    customerCode: any;
    customerName: any;
    constructor(private customerService: CustomerService, private authService: AuthService,
        private alertService: AlertService,
    ) { }

    ngOnInit() {
        if (this.editMode) {
           
            this.id = this.editGeneralInformationData.customerId;
            this.customerCode = this.editGeneralInformationData.customerCode;
            this.customerName = this.editGeneralInformationData.name;
            this.getDomesticShippingByCustomerId();
            this.getInternationalShippingByCustomerId();

        } else {
            this.id = this.savedGeneralInformationData.customerId;
            this.customerCode = this.savedGeneralInformationData.customerCode;
            this.customerName = this.savedGeneralInformationData.name;
            //Added By Vijay For Customer Create time IsShippingAddess is selected checkbox Then list page we are displaying list
            this.getDomesticShippingByCustomerId();
            this.getInternationalShippingByCustomerId();
        }
        // this.getInternationalShippingByCustomerId();
        // this.id = this.savedGeneralInformationData.customerId
    }


    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    filterCountries(event) {
        this.countrycollection = this.countryListOriginal;

        this.countrycollection = [...this.countryListOriginal.filter(x => {
            return x.nice_name.toLowerCase().includes(event.query.toLowerCase())
        })]

    }
    // save Domestic Shipping 
    saveDomesticShipping() {
        // const id = this.savedGeneralInformationData.customerId;
        const data = {
            ...this.domesticShippingInfo,
            createdBy: this.userName,
            updatedBy: this.userName,
            country: getValueFromObjectByKey('countries_id', this.domesticShippingInfo.country),
            masterCompanyId: 1,
            isPrimary: false,
            isActive: true,
            customerId: this.id
        }
        // create shipping 
        if (!this.isEditDomestic) {
            this.customerService.newShippingAdd(data).subscribe(() => {
                this.shipViaDomestic = new CustomerInternationalShipVia();
                this.alertService.showMessage(
                    'Success',
                    `Saved  Shipping Information Sucessfully `,
                    MessageSeverity.success
                );
                this.getDomesticShippingByCustomerId();
            })
        } else {
            // update shipping 
            this.customerService.updateshippinginfo(data).subscribe(() => {
                this.shipViaDomestic = new CustomerInternationalShipVia();
                this.alertService.showMessage(
                    'Success',
                    `Updated  Shipping Information Sucessfully `,
                    MessageSeverity.success
                );
                this.getDomesticShippingByCustomerId();
            })
        }



    }


    // get domestic shipping by customer Id 
    getDomesticShippingByCustomerId() {
        // const id = this.savedGeneralInformationData.customerId;
        this.customerService.getCustomerShipAddressGet(this.id).subscribe(res => {
            console.log(res);
            this.domesticShippingData = res[0];
        })
    }
    // View Details  data
    openShippinggView(rowData) {
        this.sourceViewforShipping = rowData;
    }
    // edit Domestic details data 
    openEditDomestic(rowData) {
        debugger
        console.log(rowData);
        this.isEditDomestic = true;
        // this.selectedShipViaDomestic = rowData;
        this.domesticShippingInfo = rowData;
        this.domesticShippingInfo = { ...rowData, country: getObjectById('countries_id', rowData.countryId, this.countryListOriginal) };
    //
        

    }
    //async openEditDomestic(rowData) {
    //    debugger

    //    await this.customerService.getCustomerShipAddressGet(rowData.customerShippingAddressId).subscribe(res => {
    //        this.isEditDomestic = true;
    //       this.domesticShippingInfo = { ...res, countryId: getObjectById('countries_id', res.countryId, this.countryListOriginal) };
    //    })
    //}
    addDomesticShipping() {
        this.domesticShippingInfo = new CustomerShippingModel();
    }
    addInternationalShipping() {
        this.internationalShippingInfo = new CustomerInternationalShippingModel();
    }
    deleteDomesticShipping(rowData) {
        const obj = {
            isActive: false,
            addressStatus: false,
            updatedBy: this.userName,
            customerShippingAddressId: rowData.customerShippingAddressId
        }
        // delete customer shipping 
        this.customerService.updateStatusHipping(obj).subscribe(() => {
            // toaster
            this.alertService.showMessage(
                'Success',
                `Deleted Shipping Sucessfully `,
                MessageSeverity.success
            );
            this.getDomesticShippingByCustomerId();
        })


    }
    saveInternationalShipping() {
        // const id = this.savedGeneralInformationData.customerId;

        const data = {
            ...this.internationalShippingInfo,
            shipToCountryId: getValueFromObjectByKey('countries_id', this.internationalShippingInfo.shipToCountryId),
            createdBy: this.userName,
            updatedBy: this.userName,
            masterCompanyId: 1,
            isActive: true,
            isDeleted: false,
            customerId: this.id

        }
        if (!this.isEditInternational) {
            // save International SDhipping 
            this.customerService.postInternationalShippingPost(data).subscribe((res) => {
                this.shipViaInternational = new CustomerInternationalShipVia();
                this.getInternationalShippingByCustomerId()
                this.alertService.showMessage(
                    'Success',
                    `Saved International Shipping Information Sucessfully `,
                    MessageSeverity.success
                );
            })
        } else {
            // update international 
            this.customerService.updateInternationalShipping(data).subscribe(res => {
                this.shipViaInternational = new CustomerInternationalShipVia();
                this.getInternationalShippingByCustomerId()
                this.alertService.showMessage(
                    'Success',
                    `Saved International Shipping Information Sucessfully `,
                    MessageSeverity.success
                );
            })

        }
    }

    // get International shipping by customer id 
    getInternationalShippingByCustomerId() {

        // const id = this.savedGeneralInformationData.customerId;

        this.customerService.getInternationalShippingByCustomerId(this.id, this.pageIndexForInternational, this.pageSizeForInternational).subscribe(res => {
            console.log(res);
            this.internationalShippingData = res.paginationList;
            this.totalRecordsForInternationalShipping = res.totalRecordsCount;
        })



    }

    internationalShippingPagination(event: { first: any; rows: number }) {
        const pageIndex = parseInt(event.first) / event.rows;
        this.pageIndexForInternational = pageIndex;
        this.pageSizeForInternational = event.rows;
        this.getInternationalShippingByCustomerId();
    }

    async updateActiveorInActiveForIS(rowData) {
        console.log(rowData);

        await this.customerService.updateStatusForInternationalShippings(rowData.internationalShippingId, rowData.isActive, this.userName).subscribe(res => {

            this.getInternationalShippingByCustomerId();
            this.alertService.showMessage(
                'Success',
                `Sucessfully Updated  International Shipping Status`,
                MessageSeverity.success
            );
        })
    }

  
    openInterShippingView(rowData) {
       
        
        this.sourceViewforInterShipping = rowData;
        // this.getShipViaDataByInternationalShippingId();

    }
    openInterShippingViewVia(rowData) {

      
        this.sourceViewforInterShippingVia = rowData;
        // this.getShipViaDataByInternationalShippingId();

    }
    
    async getInternationalShippingById(rowData) {
        debugger

        await this.customerService.getInternationalShippingById(rowData.internationalShippingId).subscribe(res => {
            this.isEditInternational = true;
            this.internationalShippingInfo = { ...res, shipToCountryId: getObjectById('countries_id', res.shipToCountryId, this.countryListOriginal) };
        })
    }
    selectedInternationalShipForShipVia(rowData) {
        this.selectedShipViaInternational = rowData;
        
       this.getShipViaDataByInternationalShippingId();
    }
    selectedDomesticForShipVia(rowData) {
        this.selectedShipViaDomestic = rowData;
    }
    closeInternationalModal() {
        this.isEditInternational = false;
        this.internationalShippingInfo = new CustomerInternationalShippingModel()
    }
    deleteInternationalShipping(rowData) {
        this.customerService.deleteInternationalShipping(rowData.internationalShippingId, this.userName).subscribe(res => {
            this.getInternationalShippingByCustomerId();
            this.alertService.showMessage(
                'Success',
                `Sucessfully Deleted International Shipping`,
                MessageSeverity.success
            );
        })
    }
    deleteInternationalShippingVia(rowData) {

        this.customerService.deleteInternationalShipViaId(rowData.shippingViaDetailsId, this.userName).subscribe(res => {
            this.getShipViaDataByInternationalShippingId();
            this.alertService.showMessage(
                'Success',
                `Sucessfully Deleted International Ship Via`,
                MessageSeverity.success
            );
        })
    }

    async saveshipViaInternational() {
        const data = {
            ...this.shipViaInternational,
            internationalShippingId: this.selectedShipViaInternational.internationalShippingId,
            customerId: this.id,
            masterCompanyId: 1,
            createdBy: this.userName,
            updatedBy: this.userName,

        }
        if (!this.isEditInternationalShipVia) {
            await this.customerService.postInternationalShipVia(data).subscribe(res => {
                this.getShipViaDataByInternationalShippingId();

                this.shipViaInternational = new CustomerInternationalShipVia()
                this.alertService.showMessage(
                    'Success',
                    `Sucessfully Added Ship via for InternationalShipping`,
                    MessageSeverity.success
                );
            })
        } else {
            await this.customerService.updateShipViaInternational(data).subscribe(res => {
                this.getShipViaDataByInternationalShippingId();
                this.isEditInternationalShipVia = false;

                this.shipViaInternational = new CustomerInternationalShipVia()
                this.alertService.showMessage(
                    'Success',
                    `Sucessfully Updated Ship via for InternationalShipping`,
                    MessageSeverity.success
                );
            })
        }


    }

    saveshipViaDomestic() {
        const data = {
            ...this.shipViaDomestic,
            customerShippingAddressId: this.selectedShipViaDomestic.customerShippingAddressId,
            customerId: this.id,
            masterCompanyId: 1,
            createdBy: this.userName,
            updatedBy: this.userName,
        }

        this.shipViaDomestic = new CustomerInternationalShipVia()
        this.customerService.newShippingViaAdd(data).subscribe(res => {

            this.getShipViaByDomesticShippingId(this.selectedShipViaDomestic.customerShippingAddressId)

            this.alertService.showMessage(
                'Success',
                `Sucessfully Updated Ship Via `,
                MessageSeverity.success
            );
        })
    }

    getShipViaByDomesticShippingId(customerShippingAddressId){
        this.customerService.getShipViaByDomesticShippingId(customerShippingAddressId).subscribe(res => {
            
            
        })
    }

    getShipViaDataByInternationalShippingId() {
        // this.selectedShipVia.internationalShippingId
        this.customerService.getShipViaByInternationalShippingId(this.selectedShipViaInternational.internationalShippingId, this.pageIndexForInternationalShipVia,
            this.pageSizeForInternationalShipVia
        ).subscribe(res => {
            this.internationalShippingViaData = res.paginationList;
            this.totalRecordsForInternationalShipVia = res.totalRecordsCount;
        })

    }

    internationalShippingViaPagination(event: { first: any; rows: number }) {

        const pageIndex = parseInt(event.first) / event.rows;
        this.pageIndexForInternationalShipVia = pageIndex;
        this.pageSizeForInternationalShipVia = this.pageSizeForInternationalShipVia;
        this.getShipViaDataByInternationalShippingId();

    }

    editInternationalShipVia(rowData) {
        this.isEditInternationalShipVia = true;
        this.shipViaInternational = { ...rowData };

    }
    resetShipViaInternational() {
        this.shipViaInternational = new CustomerInternationalShipVia();
    }
    resetShipViaDomestic() {
        this.shipViaDomestic = new CustomerInternationalShipVia();
    }

    nextClick() {
        this.tab.emit('Sales');
    }
    backClick() {
        this.tab.emit('Billing');
    }

 
    async updateActiveorInActiveForShipping(rowData) {
    
        console.log(rowData);

        await this.customerService.updateStatusForShippingDetails(rowData.customerShippingAddressId, rowData.isActive, this.userName).subscribe(res => {
            this.getDomesticShippingByCustomerId();
            this.alertService.showMessage(
                'Success',
                `Sucessfully Updated   Shipping Status`,
                MessageSeverity.success
            );
        })
    }

    // countryName: string;
    // countrycollection: any;
    // allCountryinfo: any[];
    // activeIndex: number;
    // public overlays: any[];
    // options: any;
    // //options: { center: { lat: any; lng: any; }; zoom: number; };
    // showCustomerSiteName: boolean;
    // showCustomerShipToAddress1: boolean;

    // showCustomerShipToCity: boolean;
    // showCustomerShipToStateProv: boolean;
    // showCustomerShipToPostalCode: boolean;
    // showCustomerShipToCountry: boolean;
    // shipViaCollection: any;
    // allShipViaDetails: any[];
    // updatedCollection: {};
    // CustomershippingAddressdetails: any;
    // local: any;
    // addressId: any;
    // allAddresses: any[];
    // customerId: any;
    // CustomerCode: any;
    // Customername: any;
    // allgeneralInfo: any[];
    // action_name: any = "";
    // memo: any = "";
    // createdBy: any = "";
    // updatedBy: any = "";
    // createddate: any = "";
    // updatedDate: any = "";
    // shipViaObj: any = {};
    // checkAddress: boolean = false;
    // sourceViewforShipping: any = {};
    // sourceViewforShippingforshipVia: any = {};
    // sourceViewforInterShipping: any = {};
    // selectedCountries: any;
    // selectedShipVia: any;
    // disablesave: boolean;
    // shipviacollection: any[];
    // ngOnInit(): void {
    //     this.workFlowtService.currentUrl = '/customersmodule/customerpages/app-customer-shipping-information';
    //     this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
    //     this.workFlowtService.ShowPtab = true;
    //     this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab); //steps
    //     this.countrylist();
    //     if (this.local) {
    //         this.loadData();
    //     }
    //     this.options = {
    //         center: { lat: 36.890257, lng: 30.707417 },
    //         zoom: 12
    //     };

    // }
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ViewChild(MatSort) sort: MatSort;
    // //@ViewChild('Customerclassificationcomponent') patientContactPopupModal: ModalDirective
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
    // IShippingcols: any[];
    // selectedIShippingColumns: any[];
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
    // /** Actions ctor */

    // isEditMode: boolean = false;
    // isDeleteMode: boolean = false;

    // constructor(private http: HttpClient, private router: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: CustomerService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {

    //     this.dataSource = new MatTableDataSource();
    //     if (this.workFlowtService.generalCollection) {
    //         if (this.workFlowtService.generalCollection.isAddressForBillingAndShipping == true) {
    //             this.local = this.workFlowtService.generalCollection;
    //             this.sourceCustomer.siteName = this.local.name;
    //             this.sourceCustomer.address1 = this.local.address.line1;
    //             this.sourceCustomer.address2 = this.local.address.line2;
    //             this.sourceCustomer.address3 = this.local.address.line3;
    //             this.sourceCustomer.city = this.local.address.city;
    //             this.sourceCustomer.country = this.local.address.country;
    //             this.sourceCustomer.stateOrProvince = this.local.address.stateOrProvince;
    //             this.sourceCustomer.postalCode = this.local.address.postalCode;
    //             if (this.sourceCustomer.startDate) {
    //                 this.sourceCustomer.startDate = new Date(this.sourceCustomer.startDate);
    //             }
    //             else {
    //                 this.sourceCustomer.startDate = new Date();
    //             }

    //             if (this.sourceCustomer.expirationDate) {
    //                 this.sourceCustomer.expirationDate = new Date(this.sourceCustomer.expirationDate);
    //             }
    //             else {
    //                 this.sourceCustomer.expirationDate = new Date();
    //             }
    //         }
    //     }
    //     if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
    //         this.local = this.workFlowtService.listCollection;
    //         this.loadData();
    //     }


    // }
    // public sourceCustomer: any = {};

    // ngAfterViewInit() {
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    // }
    // getlatlng(address) {

    //     //debugger;
    //     this.checkAddress = true;
    //     return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB_W96L25HhFWgqLblcikircQKjU6bgTgk').subscribe((data: any) => {
    //         //alert(data);
    //         this.options = {
    //             center: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng },
    //             zoom: 12
    //         };
    //         this.overlays = [
    //             new google.maps.Marker({ position: { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng }, title: "Konyaalti" }),
    //             //new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: "Ataturk Park" }),
    //             //new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: "Oldtown" }),
    //             //new google.maps.Polygon({
    //             //    paths: [
    //             //        { lat: 36.9177, lng: 30.7854 }, { lat: 36.8851, lng: 30.7802 }, { lat: 36.8829, lng: 30.8111 }, { lat: 36.9177, lng: 30.8159 }
    //             //    ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
    //             //}),
    //             //new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
    //             //new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
    //         ];
    //         return data;


    //     });
    // }

    // private getgeneralInnfo() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.workFlowtService.getWorkFlows().subscribe(
    //         results => this.ongeneralDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
    // }
    // private ongeneralDataLoadSuccessful(allWorkFlows: any[]) {

    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allgeneralInfo = allWorkFlows;
    //     if (this.workFlowtService.isCOntact == true) {
    //         this.Customername = this.allgeneralInfo[0].CustomerName;
    //         this.CustomerCode = this.allgeneralInfo[0].CustomerCode;
    //     }
    //     //this.isEditMode = true;
    //     this.customerId = this.allgeneralInfo[0].customerId;
    //     console.log(this.allgeneralInfo);
    // }
    // private loadAddressDara() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.workFlowtService.getAddressDetails().subscribe(
    //         results => this.onAddressDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
    //     //this.navigate();

    // }


    // private countrylist() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.workFlowtService.getCountrylist().subscribe(
    //         results => this.onDatacountrySuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
    // }

    // private onDatacountrySuccessful(allWorkFlows: any[]) {

    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allCountryinfo = allWorkFlows;


    //     //console.log(this.allActions);


    // }

    // private onAddressDataLoadSuccessful(alladdress: any[]) {

    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = alladdress;
    //     this.allAddresses = alladdress;
    //     this.addressId = this.allAddresses[0].addressId;

    // }
    // private loadData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.workFlowtService.getCustomerShipAddressGet(this.local.customerId).subscribe(
    //         results => this.onDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    //     this.cols = [
    //         { field: 'siteName', header: 'Site Name' },
    //         { field: 'address1', header: 'Address1' },
    //         { field: 'address2', header: 'Address2' },
    //         { field: 'address3', header: 'Address3' },
    //         { field: 'city', header: 'City' },
    //         { field: 'stateOrProvince', header: 'State Or Province' },
    //         { field: 'postalCode', header: 'Postal Code' },
    //         { field: 'country', header: 'Country' }
    //     ];
    //     if (!this.selectedColumns) {
    //         this.selectedColumns = this.cols;
    //     }

    //     this.IShippingcols = [
    //         { field: 'exportLicense', header: 'Export License#' },
    //         { field: 'description', header: 'Description' },
    //         { field: 'startDate', header: 'Start Date' },
    //         { field: 'expirationDate', header: 'Expiration Date' },
    //         { field: 'currency', header: 'Currency' },
    //         { field: 'amount', header: 'Amount' },
    //         { field: 'country', header: 'Country' }
    //     ];
    //     if (!this.selectedIShippingColumns) {
    //         this.selectedIShippingColumns = this.IShippingcols;
    //     }

    // }


    // private loadShipViaCollection(rowData) {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.workFlowtService.getCustomerShipViaDetails(rowData).subscribe(
    //         results => this.onShipViadetails(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    //     this.shipViacols = [

    //         { field: 'shipVia', header: 'Ship Via' },
    //         { field: 'shippingAccountinfo', header: 'Shipping Account Info' },
    //         { field: 'shippingURL', header: 'Shipping Url' },
    //         { field: 'shippingId', header: 'Shipping Id' },
    //         { field: 'memo', header: 'Memo' }
    //     ];

    //     this.selectedShipViaColumn = this.shipViacols;

    // }
    // openShipViaEdit(rowObject) {
    //     this.isEditMode = true;

    //     this.isSaving = true;
    //     this.shipViaObj = rowObject;
    //     this.loadMasterCompanies();
    // }


    // private loadMasterCompanies() {


    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.masterComapnyService.getMasterCompanies().subscribe(
    //         results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    // }
    // //openClassification(content) {
    // //	this.Customerclasscmpnt.open(content);
    // //}

    // public applyFilter(filterValue: string) {
    //     this.dataSource.filter = filterValue;
    // }

    // handleChange(rowData, e) {
    //     if (e.checked == false) {
    //         this.sourceCustomer = rowData;
    //         this.sourceCustomer.updatedBy = this.userName;
    //         this.Active = "In Active";
    //         if (this.sourceCustomer.startDate) {
    //             this.sourceCustomer.startDate = new Date(this.sourceCustomer.startDate);
    //         }
    //         else {
    //             this.sourceCustomer.startDate = new Date();
    //         }

    //         if (this.sourceCustomer.expirationDate) {
    //             this.sourceCustomer.expirationDate = new Date(this.sourceCustomer.expirationDate);
    //         }
    //         else {
    //             this.sourceCustomer.expirationDate = new Date();
    //         }
    //         this.sourceCustomer.isActive = false;
    //         this.workFlowtService.updateshippinginfo(this.sourceCustomer).subscribe(
    //             response => this.saveCompleted(this.sourceCustomer),
    //             error => this.saveFailedHelper(error));
    //         this.sourceCustomer = "";
    //     }
    //     else {
    //         this.sourceCustomer = rowData;
    //         this.sourceCustomer.updatedBy = this.userName;
    //         this.Active = "Active";
    //         this.sourceCustomer.isActive = true;
    //         if (this.sourceCustomer.startDate) {
    //             this.sourceCustomer.startDate = new Date(this.sourceCustomer.startDate);
    //         }
    //         else {
    //             this.sourceCustomer.startDate = new Date();
    //         }

    //         if (this.sourceCustomer.expirationDate) {
    //             this.sourceCustomer.expirationDate = new Date(this.sourceCustomer.expirationDate);
    //         }
    //         else {
    //             this.sourceCustomer.expirationDate = new Date();
    //         }
    //         this.workFlowtService.updateshippinginfo(this.sourceCustomer).subscribe(
    //             response => this.saveCompleted(this.sourceCustomer),
    //             error => this.saveFailedHelper(error));
    //         this.sourceCustomer = "";

    //     }

    // }

    // private refresh() {
    //     // Causes the filter to refresh there by updating with recently added data.
    //     this.applyFilter(this.dataSource.filter);
    // }
    // private onDataLoadSuccessful(allWorkFlows: any) {
    //     //debugger;
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allActions = allWorkFlows;
    // }
    // private onShipViadetails(allWorkFlows: any) {
    //     //debugger;
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allShipViaDetails = allWorkFlows;
    // }

    // filterActions(event) {

    //     this.localCollection = [];
    //     for (let i = 0; i < this.allActions.length; i++) {
    //         let actionName = this.allActions[i].description;

    //         if (actionName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //             this.localCollection.push(actionName);

    //         }
    //     }
    // }

    // private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {

    //     // debugger;
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.auditHisory = auditHistory;
    //     this.modal = this.modalService.open(content, { size: 'lg' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })

    // }

    // private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
    //     // alert('success');
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.allComapnies = allComapnies;

    // }

    // private onDataLoadFailed(error: any) {
    //     // alert(error);
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;

    // }

    // open(content) {

    //     this.isEditMode = false;
    //     this.isDeleteMode = false;
    //     this.isSaving = true;
    //     this.loadMasterCompanies();
    //     //this.sourceCustomer.isActive = true;
    //     this.actionName = "";
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }


    // openDelete(content, row) {

    //     this.isEditMode = false;
    //     this.isDeleteMode = true;
    //     this.sourceCustomer = row;
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // openEdit(row) {

    //     this.isEditMode = true;

    //     this.isSaving = true;
    //     this.sourceCustomer = row;
    //     this.loadMasterCompanies();
    //     if (this.sourceCustomer.startDate) {
    //         this.sourceCustomer.startDate = new Date(this.sourceCustomer.startDate);
    //     }
    //     else {
    //         this.sourceCustomer.startDate = new Date();
    //     }

    //     if (this.sourceCustomer.expirationDate) {
    //         this.sourceCustomer.expirationDate = new Date(this.sourceCustomer.expirationDate);
    //     }
    //     else {
    //         this.sourceCustomer.expirationDate = new Date();
    //     }
    //     // this.actionName = this.sourceCustomer.description;
    //     //this.modal = this.modalService.open(content, { size: 'sm' });
    //     //this.modal.result.then(() => {
    //     //    console.log('When user closes');
    //     //}, () => { console.log('Backdrop click') })
    // }

    // openInterEdit(row) {
    //     this.isEditMode = true;
    //     this.isSaving = true;
    //     this.sourceCustomer = row;
    // }

    // openShippinggView(content, row) {

    //     this.sourceViewforShipping = row;
    //     this.sourceViewforShippingforshipVia = row;
    //     //this.allViewforContact.firstName = row.firstName;
    //     //this.contactTitle = row.contactTitle;
    //     //this.workPhone = row.workPhone;
    //     //this.email = row.email;
    //     //this.mobilePhone = row.mobilePhone;
    //     //this.fax = row.fax;
    //     this.createdBy = row.createdBy;
    //     this.updatedBy = row.updatedBy;
    //     this.createddate = row.createdDate;
    //     this.updatedDate = row.updatedDate;
    //     this.loadMasterCompanies();
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // openInterShippingView(content, row) {

    //     this.sourceViewforInterShipping = row;
    //     //this.sourceViewforShippingforshipVia = row;
    //     this.createdBy = row.createdBy;
    //     this.updatedBy = row.updatedBy;
    //     this.createddate = row.createdDate;
    //     this.updatedDate = row.updatedDate;
    //     this.loadMasterCompanies();
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // openHelpText(content) {
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // openHist(content, row) {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;


    //     this.shipViaObj = row;


    //     this.isSaving = true;
    //     //debugger;
    //     this.workFlowtService.shipviaHistory(this.sourceCustomer.CustomerShippingId).subscribe(
    //         results => this.onHistoryLoadSuccessful(results[0], content),
    //         error => this.saveFailedHelper(error));


    // }
    // openShipaddressHistory(content, row) {
    //     //this.alertService.startLoadingMessage();
    //     //this.loadingIndicator = true;
    //     this.sourceCustomer = row;
    //     this.isSaving = true;
    //     //debugger; 
    //     /*this.workFlowtService.shipaddressHistory(this.sourceCustomer.customerShippingAddressId).subscribe(
    //         results => console.log(results),
    //         error => this.saveFailedHelper(error));*/

    // }
    // onAddShippingInfo() {
    //     this.sourceCustomer = {};
    //     this.isEditMode = false;
    // }
    // onBlurMethod(data) {
    //     if (data == 'siteName') {
    //         this.showCustomerSiteName = false;
    //     }
    //     if (data == 'address1') {
    //         this.showCustomerShipToAddress1 = false;
    //     }

    //     if (data == 'city') {
    //         this.showCustomerShipToCity = false;
    //     }
    //     if (data == 'stateOrProvince') {
    //         this.showCustomerShipToStateProv = false;
    //     }
    //     if (data == 'postalCode') {
    //         this.showCustomerShipToPostalCode = false;
    //     }
    //     if (data == 'country') {
    //         this.showCustomerShipToCountry = false;
    //     }

    // }

    // sample() {
    //     if (!(this.sourceCustomer.siteName && this.sourceCustomer.address1 &&
    //         this.sourceCustomer.city && this.sourceCustomer.stateOrProvince && this.sourceCustomer.postalCode && this.sourceCustomer.country
    //     )) {
    //         this.display = true;
    //         this.modelValue = true;
    //     }
    // }

    // editItemAndCloseModel() {
    //     if (!(this.sourceCustomer.siteName && this.sourceCustomer.address1 &&
    //         this.sourceCustomer.city && this.sourceCustomer.stateOrProvince && this.sourceCustomer.postalCode && this.sourceCustomer.country
    //     )) {
    //         //this.display = true;
    //         this.modelValue = true;
    //     }
    //     this.isSaving = true;
    //     if (this.sourceCustomer.siteName && this.sourceCustomer.address1 &&
    //         this.sourceCustomer.city && this.sourceCustomer.stateOrProvince && this.sourceCustomer.postalCode && this.sourceCustomer.country) {
    //         if (!this.sourceCustomer.customerId) {
    //             //if (!this.sourceCustomer) {
    //             this.sourceCustomer.createdBy = this.userName;
    //             this.sourceCustomer.updatedBy = this.userName;
    //             this.sourceCustomer.masterCompanyId = 1;
    //             this.sourceCustomer.isActive = true;
    //             this.sourceCustomer.customerId = this.local.customerId;
    //             this.workFlowtService.newShippingAdd(this.sourceCustomer).subscribe(data => {
    //                 this.localCollection = data;
    //                 this.loadData();
    //                 this.savesuccessCompleted(this.sourceCustomer);
    //                 //this.updateCustomerShippingAddress(this.localCollection);
    //                 this.sourceCustomer = {};
    //             })

    //             //this.router.navigateByUrl('/customersmodule/customerpages/app-customer-sales-person');

    //         }
    //         else {
    //             this.sourceCustomer.isActive = true;
    //             this.sourceCustomer.updatedBy = this.userName;
    //             this.sourceCustomer.isActive = true;
    //             this.sourceCustomer.masterCompanyId = 1;
    //             this.workFlowtService.updateshippinginfo(this.sourceCustomer).subscribe(data => {
    //                 this.updatedCollection = data;
    //                 this.loadData();
    //                 this.saveCompleted(this.sourceCustomer);
    //                 this.sourceCustomer = {};


    //             })

    //             //this.router.navigateByUrl('/customersmodule/customerpages/app-customer-sales-person');
    //         }
    //     }

    //     else { }

    // }
    // saveCustomerShipViaDetails() {
    //     //debugger;
    //     this.isSaving = true;
    //     if (!this.shipViaObj.customerShippingId) {
    //         this.shipViaObj.createdBy = this.userName;
    //         this.shipViaObj.updatedBy = this.userName;
    //         this.shipViaObj.masterCompanyId = 1;
    //         this.shipViaObj.isActive = true;
    //         //this.shipViaObj.customerId = updatedCollection.customerId;
    //         //this.shipViaObj.CustomerShippingId = updatedCollection.CustomerShippingId;
    //         this.workFlowtService.newShippingViaAdd(this.shipViaObj).subscribe(data => {
    //             this.shipViaCollection = data;
    //             this.loadShipViaCollection(this.shipViaCollection);
    //             if (this.shipViaCollection) {
    //                 this.shipViaObj.shipVia = "";
    //                 this.shipViaObj.shippingAccountinfo = "";
    //                 this.shipViaObj.shippingURL = "";
    //                 this.shipViaObj.shippingId = "";
    //                 this.shipViaObj.memo = "";


    //             }

    //             //this.updateCustomerShippingAddress(this.localCollection);

    //         })

    //     }
    //     else {

    //         this.shipViaObj.updatedBy = this.userName;
    //         this.shipViaObj.masterCompanyId = 1;
    //         this.shipViaObj.isActive = true;
    //         this.workFlowtService.updateshippingViainfo(this.shipViaObj).subscribe(data => {
    //             this.shipViaCollection = data;
    //             this.loadShipViaCollection(this.shipViaCollection);
    //             if (this.shipViaCollection) {
    //                 this.shipViaObj.shipVia = "";
    //                 this.shipViaObj.shippingAccountinfo = "";
    //                 this.shipViaObj.shippingURL = "";
    //                 this.shipViaObj.shippingId = "";
    //                 this.shipViaObj.memo = "";


    //             }
    //         })


    //     }

    // }


    // openShipVia(content, rowData) {
    //     this.isEditMode = false;
    //     this.isDeleteMode = false;
    //     this.shipViaObj = rowData;
    //     this.shipViaObj.shipVia = "";
    //     this.shipViaObj.shippingAccountinfo = "";
    //     this.shipViaObj.shippingURL = "";
    //     this.shipViaObj.shippingId = "";
    //     this.shipViaObj.memo = "";
    //     this.isSaving = true;
    //     this.loadShipViaCollection(rowData);
    //     this.loadMasterCompanies();
    //     //this.sourceAction = new CustomerClassification();
    //     this.sourceAction.isActive = true;
    //     //this.CustomerName = "";
    //     this.modal = this.modalService.open(content, { size: 'lg' });
    //     this.modal.result.then(() => {



    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // updateCustomerShippingAddress(updateObj: any) {
    //     debugger;
    //     this.workFlowtService.updateCustomershippingAddressdetails(updateObj, this.local.customerId).subscribe(data => {
    //         this.CustomershippingAddressdetails = data;
    //         this.workFlowtService.newShippingAddWithAddress(this.sourceCustomer, this.CustomershippingAddressdetails.CustomerShippingAddressId).subscribe(data => {
    //             this.localCollection = data;
    //             this.updateCustomerShippingAddress(this.localCollection);

    //         })
    //         this.loadData();
    //     })
    // }

    // deleteItemAndCloseModel(rowData) {
    //     this.isSaving = true;
    //     this.sourceCustomer.isActive = false;
    //     this.sourceCustomer.addressStatus = false;
    //     this.sourceCustomer.updatedBy = this.userName;
    //     this.sourceCustomer.customerShippingAddressId = rowData.customerShippingAddressId;
    //     this.workFlowtService.updateStatusHipping(this.sourceCustomer).subscribe(
    //         response => this.saveCompleted(this.sourceCustomer),
    //         error => this.saveFailedHelper(error));
    //     //this.modal.close();
    // }

    // deleteItemShippingCloseModel(CustomerShippingId) {
    //     this.isSaving = true;
    //     this.shipViaObj.isActive = false;
    //     this.shipViaObj.updatedBy = this.userName;
    //     this.shipViaObj.CustomerShippingId = CustomerShippingId;
    //     this.workFlowtService.deleteCustomerAcion(this.shipViaObj).subscribe(data => {
    //         this.loadShipViaCollection(data);
    //     })

    //     //this.modal.close();
    // }

    // dismissShipViaModelModel() {
    //     this.isDeleteMode = false;
    //     this.isEditMode = false;
    //     this.modal.close();
    // }
    // dismissModel() {
    //     this.isDeleteMode = false;
    //     this.isEditMode = false;
    //     this.modal.close();
    // }

    // private saveCompleted(user?: any) {
    //     this.isSaving = false;

    //     if (this.isDeleteMode == true) {
    //         this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
    //         this.isDeleteMode = false;
    //     }
    //     else {
    //         this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

    //     }

    //     this.loadData();
    // }
    // private savesuccessCompleted(user?: any) {
    //     this.isSaving = false;


    //     this.alertService.showMessage("Success", `Action was saved successfully`, MessageSeverity.success);



    //     this.loadData();
    // }


    // private saveSuccessHelper(role?: any) {
    //     this.isSaving = false;
    //     this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

    //     this.loadData();

    // }

    // get userName(): string {
    //     return this.authService.currentUser ? this.authService.currentUser.userName : "";
    // }

    // private saveFailedHelper(error: any) {
    //     this.isSaving = false;
    //     this.alertService.stopLoadingMessage();
    //     this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
    //     this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    // }

    // private getDismissReason(reason: any): string {
    //     if (reason === ModalDismissReasons.ESC) {
    //         return 'by pressing ESC';
    //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //         return 'by clicking on a backdrop';
    //     } else {
    //         return `with: ${reason}`;
    //     }
    // }

    // toggledbldisplay(data) {
    //     this.sourceCustomer = data;
    //     if (this.sourceCustomer.startDate) {
    //         this.sourceCustomer.startDate = new Date(this.sourceCustomer.startDate);
    //     }
    //     else {
    //         this.sourceCustomer.startDate = new Date();
    //     }

    //     if (this.sourceCustomer.expirationDate) {
    //         this.sourceCustomer.expirationDate = new Date(this.sourceCustomer.expirationDate);
    //     }
    //     else {
    //         this.sourceCustomer.expirationDate = new Date();
    //     }

    // }
    // nextClick() {
    //     if (this.local) {
    //         this.workFlowtService.shippingCollection = this.local;
    //     }

    //     this.activeIndex = 5;
    //     this.workFlowtService.indexObj.next(this.activeIndex);
    //     //this.saveCompleted(this.sourceCustomer);
    //     this.router.navigateByUrl('/customersmodule/customerpages/app-customer-sales-person');
    // }
    // backClick() {
    //     this.workFlowtService.contactCollection = this.local;
    //     this.activeIndex = 3;
    //     this.workFlowtService.indexObj.next(this.activeIndex);
    //     //this.saveCompleted(this.sourceCustomer);
    //     this.router.navigateByUrl('/customersmodule/customerpages/app-customer-billing-information');

    // }
    // //filtercountry(event) {

    // //    this.countrycollection = [];
    // //    if (this.allCountryinfo.length > 0) {
    // //        for (let i = 0; i < this.allCountryinfo.length; i++) {
    // //            let countryName = this.allCountryinfo[i].nice_name;
    // //            if (countryName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    // //                this.countrycollection.push(countryName);
    // //            }
    // //        }
    // //    }
    // //}
    // saveCountry() {

    //     this.sourceAction.createdBy = this.userName;
    //     this.sourceAction.updatedBy = this.userName;

    //     this.workFlowtService.newCountry(this.sourceAction).subscribe(data => { this.countrylist() })


    // }
    // opencountry(content) {

    //     this.isEditMode = false;
    //     this.isDeleteMode = false;

    //     this.isSaving = true;
    //     this.loadMasterCompanies();
    //     //this.sourceAction = new Integration();
    //     this.sourceAction.isActive = true;
    //     this.countryName = "";
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }
    // filtercountry(event) {

    //     this.countrycollection = [];
    //     if (this.allCountryinfo.length > 0) {
    //         for (let i = 0; i < this.allCountryinfo.length; i++) {
    //             let countryName = this.allCountryinfo[i].nice_name;
    //             if (countryName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                 this.countrycollection.push(countryName);
    //             }
    //         }
    //     }
    // }

    // eventShipviaHandler(event) {
    //     if (event.target.value != "") {
    //         let value = event.target.value.toLowerCase();
    //         if (this.selectedShipVia) {
    //             if (value == this.selectedShipVia.toLowerCase()) {
    //                 //alert("Action Name already Exists");
    //                 this.disablesave = true;
    //             }
    //             else {
    //                 this.disablesave = false;
    //             }
    //         }

    //     }
    // }

    // onCountrieselected(event) {
    //     if (this.allCountryinfo) {
    //         for (let i = 0; i < this.allCountryinfo.length; i++) {
    //             if (event == this.allCountryinfo[i].nice_name) {
    //                 this.sourceCustomer.nice_name = event;
    //                 this.disablesave = false;

    //                 this.selectedCountries = event;
    //             }
    //         }
    //     }
    // }

    // eventCountryHandler(event) {
    //     if (event.target.value != "") {
    //         let value = event.target.value.toLowerCase();
    //         if (this.selectedCountries) {
    //             if (value == this.selectedCountries.toLowerCase()) {
    //                 this.disablesave = false;
    //             }
    //             else {
    //                 this.disablesave = true;
    //             }
    //         }

    //     }
    // }
    // onShipVia(event) {
    //     if (this.allActions) {

    //         for (let i = 0; i < this.allActions.length; i++) {
    //             if (event == this.allActions[i].siteName) {
    //                 this.shipViaObj.siteName = this.allActions[i].siteName;


    //                 this.selectedShipVia = event;
    //             }
    //         }
    //     }
    // }
    // filterShipVia(event) {

    //     this.shipviacollection = [];
    //     if (this.allActions.length > 0) {
    //         for (let i = 0; i < this.allActions.length; i++) {
    //             let siteName = this.allActions[i].siteName;
    //             if (siteName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                 this.shipviacollection.push(siteName);
    //             }
    //         }
    //     }
    // }
}






