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
import { Params, ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Currency } from '../../../models/currency.model';
import { CurrencyService } from '../../../services/currency.service';
import { CreditTerms } from '../../../models/credit-terms.model';
import { CreditTermsService } from '../../../services/Credit Terms.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChangeDetectorRef } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { ItemMasterService } from '../../../services/itemMaster.service';
import { Condition } from '../../../models/condition.model';
import { ConditionService } from '../../../services/condition.service';
import { VendorService } from '../../../services/vendor.service';

@Component({
    selector: 'app-customer-sales-person',
    templateUrl: './customer-sales-person.component.html',
    styleUrls: ['./customer-sales-person.component.scss'],
    animations: [fadeInOut]
})
/** anys component*/
export class CustomerSalesPersonComponent implements OnInit, AfterViewInit {
	activeIndex: number;
    showCurrency: boolean;
    showCreditTearms: boolean;
    showCreditLimit: boolean;
    customersList: any[];
    creditTermsCollection: any[];
    creditTermName: any;
    allcreditTermInfo: any[];
    currencyName: any;
    allCurrencyInfo: any[];
    currencyCollection: any[];
    customerId: any;
    allgeneralInfo: any[];
    local: any;
    action_name: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createddate: any = "";
    updatedDate: any = "";
	sub: any;
	allEmployeeinfo: any[] = [];
    firstCollection: any[];
    lastCollection: any[];
	disableSavepartDescription: boolean;
	itemclaColl: any[];
	partCollection: any[];
	allPartnumbersInfo: any[];
    disableSavepartNumber: boolean;
	selectedActionName: any;
	descriptionbyPart: any[] = [];
	allConditionInfo: Condition[] = [];
	allCustomer: any[];
	allVendorList: any[];
    ngOnInit(): void {
		this.workFlowtService.currentUrl = '/customersmodule/customerpages/app-customer-sales-person';
		this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
		this.workFlowtService.ShowPtab = true;
		this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab); //steps

        if (this.local) {
            this.getSalesperson();

        }
		this.employeedata();
		this.loadItemmasterData();
		//this.ptnumberlistdata();
		this.loadDataForCondition();
		this.customerList();
		this.vendorList();
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    filteredBrands: any[];
    displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<any>;
    allActions: any[] = [];
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    sourceCustomer: any = {};
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
    localCollection: any;

    /** Actions ctor */

    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;

	constructor(public vendorservice: VendorService,public customerService: CustomerService,public conditionService: ConditionService, public itemser: ItemMasterService,private cdRef: ChangeDetectorRef, public employeeService: EmployeeService, public CreditTermsService: CreditTermsService, public currencyService: CurrencyService, private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: CustomerService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        if (this.workFlowtService.shippingCollection) {
            this.local = this.workFlowtService.shippingCollection;
        }
        this.dataSource = new MatTableDataSource();
        if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
            this.local = this.workFlowtService.listCollection.t;
            this.sourceCustomer = this.workFlowtService.listCollection.t;
        }

    }
    private getSalesperson() {
   
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getSalespersondata(this.local.customerId).subscribe(
            results => this.onCustomersLoadSuccssfull(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    ngAfterViewChecked() {

        this.cdRef.detectChanges();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    public allWorkFlows: any[] = [];

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );


        this.cols = [
            //{ field: 'actionId', header: 'Action Id' },
            { field: 'description', header: 'Action Name' },
            { field: 'memo', header: 'Memo' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
            { field: 'updatedDate', header: 'Updated Date' },
            { field: 'createdDate', header: 'Created Date' }

        ];

        this.selectedColumns = this.cols;

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

   
	nextClick() {
		if (this.local) {
			this.workFlowtService.shippingCollection = this.local;
        }
        		
		//this.saveCompleted(this.sourceCustomer);
        this.editItemAndCloseModel();
        this.activeIndex = 8;
        this.workFlowtService.indexObj.next(this.activeIndex);
		this.route.navigateByUrl('/customersmodule/customerpages/app-customer-warnings');
	}
	backClick() {
		this.workFlowtService.contactCollection = this.local;
		this.activeIndex = 6;
		this.workFlowtService.indexObj.next(this.activeIndex);
		//this.saveCompleted(this.sourceCustomer);
		this.route.navigateByUrl('/customersmodule/customerpages/app-customer-shipping-information');

	}
   


    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceCustomer = rowData;
            //this.sourceCustomer.updatedBy = this.userName;
            this.Active = "In Active";
            //this.sourceCustomer.isActive == false;
            //this.workFlowtService.updatefinanceinfo(this.sourceCustomer).subscribe(
            //    response => this.saveCompleted(this.sourceCustomer),
            //    error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceCustomer = rowData;
            //this.sourceCustomer.updatedBy = this.userName;
            this.Active = "Active";
            //this.sourceCustomer.isActive == true;
            //this.workFlowtService.updatefinanceinfo(this.sourceCustomer).subscribe(
            //    response => this.saveCompleted(this.sourceCustomer),
            //    error => this.saveFailedHelper(error));
            //alert(e);
        }

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


    }

    private onCustomersLoadSuccssfull(allCustomers: any) {
        debugger;
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allCustomers;
        this.customersList = allCustomers[0].t;
        if (this.customersList) {
            this.sourceCustomer = this.customersList;
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


        

    }
	private savesuccessCompleted(user?: any) {
		this.isSaving = false;


		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);



		this.loadData();
	}
	

    editItemAndCloseModel() {

        this.isSaving = true;

        if (this.sourceCustomer.customerId) {
            this.sourceCustomer.createdBy = this.userName;
            this.sourceCustomer.updatedBy = this.userName;
            this.sourceCustomer.masterCompanyId = 1;
            this.workFlowtService.updatesalesinfo(this.sourceCustomer, this.sourceCustomer.customerId).subscribe(data => {
                this.localCollection = data;
				this.workFlowtService.salesCollection = this.local;
				this.activeIndex = 8;
				this.workFlowtService.indexObj.next(this.activeIndex);
				this.savesuccessCompleted(this.sourceCustomer);
            

            })

        }
        else {

            this.sourceCustomer.updatedBy = this.userName;
            this.sourceCustomer.masterCompanyId = 1;
            //debugger;
            this.workFlowtService.updatesalesinfo(this.sourceCustomer, this.local.customerId).subscribe(data => {
                this.localCollection = data;
				this.saveCompleted(this.sourceCustomer);
                this.workFlowtService.salesCollection = this.local;
               
            })
			this.activeIndex = 8;
			this.workFlowtService.indexObj.next(this.activeIndex);
		
			

        }



        //this.modal.close();
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        //this.sourceCustomer.updatedBy = this.userName;
        //this.workFlowtService.deleteAcion(this.sourceCustomer.masterCompanyId).subscribe(
        //    response => this.saveCompleted(this.sourceCustomer),
        //    error => this.saveFailedHelper(error));
        //this.modal.close();
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

	private employeedata() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.employeeService.getEmployeeList().subscribe(
			results => this.onempDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);



		this.selectedColumns = this.cols;

	}

	private onempDataLoadSuccessful(getEmployeeCerficationList: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = getEmployeeCerficationList;
        this.allEmployeeinfo = getEmployeeCerficationList;
        //console.log(this.allEmployeeinfo);
    }
	filterfirstName(event) {

		this.firstCollection = [];
		for (let i = 0; i < this.allEmployeeinfo.length; i++) {
			let firstName = this.allEmployeeinfo[i].firstName;
			if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.firstCollection.push(firstName);
			}
		}
    }
    
    // filterlastName(event) {

	// 	this.lastCollection = [];
	// 	for (let i = 0; i < this.allEmployeeinfo.length; i++) {
	// 		let lastName = this.allEmployeeinfo[i].lastName;
	// 		if (lastName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
	// 			this.lastCollection.push(lastName);
	// 		}
	// 	}
	// }
	//private onptnmbersSuccessful(allWorkFlows: any[]) {

	//	this.alertService.stopLoadingMessage();
	//	this.loadingIndicator = false;
	//	this.dataSource.data = allWorkFlows;
	//	this.allPartnumbersInfo = allWorkFlows;
	//}


	//private ptnumberlistdata() {
	//	this.alertService.startLoadingMessage();
	//	this.loadingIndicator = true;

	//	this.itemser.getPrtnumberslistList().subscribe(
	//		results => this.onptnmbersSuccessful(results[0]),
	//		error => this.onDataLoadFailed(error)
	//	);
	//}
	//filterpartItems(event) {

	//	this.partCollection = [];
	//	this.itemclaColl = [];
	//	if (this.allPartnumbersInfo) {
	//		if (this.allPartnumbersInfo.length > 0) {

	//			for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
	//				let partName = this.allPartnumbersInfo[i].partNumber;
	//				if (partName) {
	//					if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
	//						this.itemclaColl.push([{
	//							"partId": this.allPartnumbersInfo[i].itemMasterId,
	//							"partName": partName
	//						}]),

	//							this.partCollection.push(partName);
	//					}
	//				}
	//			}
	//		}
	//	}
	//}
	private onitemmasterSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allActions = allWorkFlows;
	}
	private loadItemmasterData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.itemser.getItemMasterList().subscribe(
			results => this.onitemmasterSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	partnmId(event) {
		//
		if (this.itemclaColl) {
			for (let i = 0; i < this.itemclaColl.length; i++) {
				if (event == this.itemclaColl[i][0].partName) {
					this.sourceCustomer.partId = this.itemclaColl[i][0].partId;
					this.disableSavepartNumber = true;
					this.selectedActionName = event;
				}
			}
			this.itemser.getDescriptionbypart(event).subscribe(
				results => this.onpartnumberloadsuccessfull(results[0]),
				error => this.onDataLoadFailed(error)


			);
			this.disableSavepartDescription = true;
		}
	}
	eventHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedActionName) {
				if (value == this.selectedActionName.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSavepartNumber = true;

				}
				else {
					this.disableSavepartNumber = false;
					this.sourceCustomer.partDescription = "";
					this.disableSavepartDescription = false;
				}
			}

		}
	}
	private onpartnumberloadsuccessfull(allWorkFlows: any[]) {
		this.descriptionbyPart = allWorkFlows[0]
		this.sourceAction = this.descriptionbyPart;
		this.sourceCustomer.partDescription = allWorkFlows[0].partDescription;
	}

	private onDataLoadSuccessfulForCondition(getConditionList: Condition[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getConditionList;
		this.allConditionInfo = getConditionList;
	}
	private loadDataForCondition() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.conditionService.getConditionList().subscribe(
			results => this.onDataLoadSuccessfulForCondition(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	private onCustomerDataLoadSuccessful(allCustomerFlows: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allCustomerFlows;
		this.allCustomer = allCustomerFlows;

	}
	private customerList() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.customerService.getWorkFlows().subscribe(
			results => this.onCustomerDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	private onVendorDataLoadSuccessful(allVendorWorkFlows: any[]) {
		//debugger;
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allVendorWorkFlows;
		this.allVendorList = allVendorWorkFlows;
	}
	private vendorList() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.vendorservice.getVendorList().subscribe(
			results => this.onVendorDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
}