import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { PageHeaderComponent } from '../../../shared/page-header.component';
import { PaginatorModule } from 'primeng/paginator';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Params, ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { MasterCompany } from '../../../models/mastercompany.model';
import { AuditHistory } from '../../../models/audithistory.model';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { Customer } from '../../../models/Customer.model';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { CustomerService } from '../../../services/customer.service';


@Component({
    selector: 'app-customer-contacts',
    templateUrl: './customer-contacts.component.html',
    styleUrls: ['./customer-contacts.component.scss'],
    animations: [fadeInOut]
})
/** CustomerEdit component*/
export class CustomerContactsComponent implements OnInit, AfterViewInit {
	activeIndex: number;
	showFirstName: boolean;
	showemail: boolean;
	showworkPhone: boolean;
	showmobilePhone: boolean;
	showLastName: boolean;
	showcustomerContractReference: boolean;
	alldata: any[];
	middleNames: any[];
	lastNames: any;
	firstNames: any;
	customerCode: any = "";
	customername: any = "";
	allgeneralInfo: any[];
	collection: any;
	action_name: any = "";
	memo: any = "";
	createdBy: any = "";
	updatedBy: any = "";
	createddate: any = "";
	updatedDate: any = "";
	sub: any;
	local: any;
    isCustomerAlsoVendor: boolean=false;
	allViewforContact: any = {};
	sourceViewforContact: any = {};
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	filteredBrands: any[];
	displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
	dataSource: MatTableDataSource<any>;
	allActions: any[] = [];
	allComapnies: MasterCompany[] = [];
	private isSaving: boolean;
	public sourceCustomer: any = {};
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
	isDefault: boolean = false;
	comName: string;
	display: boolean = false;
	modelValue: boolean = false;
	private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    public allWorkFlows: any[] = [];
    isDefaultContact: any;
    selectedFirstName: any;
    disableSaveFirstName: boolean;
    disableSaveMiddleName: boolean;
    selectedMiddleName: any;
    disableSaveName: any;
    disableSavelastName: any;
    disableSaveLastName: boolean;
	constructor(private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: CustomerService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {

			//this.comName = companyDirective.companyName;
		if (this.workFlowtService.generalCollection) {

			this.local = this.workFlowtService.generalCollection;
		}
		if (this.local) {

			this.workFlowtService.contactCollection = this.local;
		}

		this.dataSource = new MatTableDataSource();
		if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
			this.local = this.workFlowtService.listCollection.t;
			this.loadData();
		}
        this.alertService.stopLoadingMessage();
    }

    ngOnInit(): void {
        this.workFlowtService.currentUrl = '/customersmodule/customerpages/app-customer-contacts';
        this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
        this.workFlowtService.ShowPtab = true;
        this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab); //steps
        if (this.local) {
            this.loadData();
        }
        this.loadCompleteddata();
        this.router.queryParams.subscribe((params: Params) => {
        });
    }
    //Filter Customer First Name//
	filterFirstNames(event) {
        this.firstNames = [];
        if (this.alldata) {
            for (let i = 0; i < this.alldata.length; i++) {
                let firstName = this.alldata[i].firstName;

                if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.firstNames.push(firstName);

                }
            }
		}
    }

    // filter Last Name of Customer//
	filterLastNames(event) {
		this.lastNames = [];
		for (let i = 0; i < this.alldata.length; i++) {
			let lastName = this.alldata[i].lastName;

			if (lastName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.lastNames.push(lastName);

			}
		}
    }

    // filter Middle Name of Customer//
	filterMiddleNames(event) {
		this.middleNames = [];
		for (let i = 0; i < this.alldata.length; i++) {
			let middleName = this.alldata[i].middleName;
			if (middleName != "" && middleName != null && middleName != "Null") {
				if (middleName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.middleNames.push(middleName);

				}

			}
		}
    }
    private onDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allActions = allWorkFlows;


    }
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	//Load Contacts//
	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.workFlowtService.getContacts(this.local.customerId).subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
		this.cols = [
			{ field: 'firstName', header: 'First Name' },
			{ field: 'lastName', header: 'Last  Name' },
			{ field: 'contactTitle', header: 'Contact Title' },
			{ field: 'email', header: 'Email' },
			{ field: 'workPhone', header: 'Work Phone' },
            { field: 'mobilePhone', header: 'Mobile Phone' },
            { field: 'fax', header: 'Fax' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' },
			{ field: 'updatedDate', header: 'Updated Date' },
			{ field: 'createdDate', header: 'Created Date' }

		];

		this.selectedColumns = this.cols;

	}

    // Load Compamiesdata//
	private loadCompleteddata() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.workFlowtService.getContactsFirstName().subscribe(
			results => this.ondata(results[0]),
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
    private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allComapnies = allComapnies;

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
			this.workFlowtService.updateContactinfo(this.sourceCustomer).subscribe(
				response => this.saveCompleted(this.sourceCustomer),
                error => this.saveFailedHelper(error));
            this.sourceCustomer = "";
        
		}
		else {
			this.sourceCustomer = rowData;
			this.sourceCustomer.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceCustomer.isActive == true;
			this.workFlowtService.updateContactinfo(this.sourceCustomer).subscribe(
				response => this.saveCompleted(this.sourceCustomer),
                error => this.saveFailedHelper(error));
            this.sourceCustomer = "";
		}

	}

	private refresh() {
		this.applyFilter(this.dataSource.filter);
	}
	
	private ondata(allWorkFlows: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.alldata = allWorkFlows;
	}

	dismissModel() {
		this.modal.close();
	}
	

    // Filter Values//
	filterActions(event) {
		this.localCollection = [];
		for (let i = 0; i < this.alldata.length; i++) {
			let actionName = this.alldata[i].description;
			if (actionName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.localCollection.push(actionName);
                }
		}
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
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}


	openDelete(content, row) {
		this.isEditMode = false;
		this.isDeleteMode = true;
		delete row.updatedBy;
		this.localCollection = row;
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
		this.loadData();

	}
	opencontactView(content, row) {
		this.sourceViewforContact = row;
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

    //Open History
	openHist(content, row) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.sourceCustomer = row;
		this.isSaving = true;
		this.workFlowtService.historyAcion(this.sourceCustomer.contactId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));
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
	onBlurMethod(data) {
		if (data == 'firstName') {
			this.showFirstName = false;
		}
		if (data == 'lastName') {
			this.showLastName = false;
		}
		if (data == 'workPhone') {
			this.showworkPhone = false;
		}
		if (data == 'email') {
			this.showemail = false;
		}
	}


    // Save Customer Contact Info
	editItemAndCloseModel() {
        if (!(this.sourceCustomer.firstName && this.sourceCustomer.lastName &&
            this.sourceCustomer.workPhone && this.sourceCustomer.email
        )) {
            //this.display = true;
            this.modelValue = true;
        }
		if (this.sourceCustomer.firstName && this.sourceCustomer.lastName && this.sourceCustomer.workPhone && this.sourceCustomer.email) {

			this.isSaving = true;
			if (!this.sourceCustomer.customerContactId) {
				this.sourceCustomer.createdBy = this.userName;
				this.sourceCustomer.updatedBy = this.userName;
                this.sourceCustomer.masterCompanyId = 1;
                this.sourceCustomer.isDefaultContact = true; 
                this.isDefault = this.sourceCustomer.isDefaultContact;
				this.workFlowtService.newAddContactInfo(this.sourceCustomer).subscribe(data => {

					this.localCollection = data;
					this.sourceCustomer= new Object();
					this.localCollection.CustomerId = this.local.customerId;
					this.localCollection.ContactId = this.local.contactId;
                    this.loadData();
                    if (data) {
                        this.localCollection.isDefaultContact = this.isDefault;
                        this.updateCustomerContact(this.localCollection);
                        this.loadData();
                    }
					if (this.sourceCustomer.isCustomerAlsoVendor == true) {
						this.workFlowtService.isCustomerAlsoVendor = this.isCustomerAlsoVendor;
						this.workFlowtService.localCollectiontoVendor = data;
					}
					this.workFlowtService.contactCollection = this.local;
					this.savesuccessCompleted(this.sourceCustomer);
					this.activeIndex = 1;
					this.workFlowtService.indexObj.next(this.activeIndex);
					
				})


			}
			else {
				
				this.activeIndex = 1;
				this.sourceCustomer.updatedBy = this.userName;
                this.sourceCustomer.masterCompanyId = 1;
                this.isDefault = this.sourceCustomer.isDefaultContact;
              
				this.workFlowtService.updateContactinfo(this.sourceCustomer).subscribe(data => {
                    this.loadData();                  
					if (data) { this.sourceCustomer = new Object(); }

				})
				this.saveCompleted(this.sourceCustomer);
			}

		}

		else {
		}
		
    }

	toggledbldisplay(data) {
		this.sourceCustomer = data;

    }
    // Next Click
    nextClick() {
        this.workFlowtService.contactCollection = this.local;
		this.activeIndex = 2;
		this.workFlowtService.indexObj.next(this.activeIndex);
		this.route.navigateByUrl('/customersmodule/customerpages/app-customer-financial-information');
		
    }

    // Back Click
	backClick() {
		this.workFlowtService.contactCollection = this.local;
		this.activeIndex = 0;
		this.workFlowtService.indexObj.next(this.activeIndex);
		this.route.navigateByUrl('/customersmodule/customerpages/app-customer-general-information');

	}

	deleteItemAndCloseModel(contactId) {
		this.isSaving = true;
		this.workFlowtService.deleteContact(contactId).subscribe(
			response => this.saveCompleted(this.sourceCustomer),
			error => this.saveFailedHelper(error));
	}

	updateCustomerContact(updateObj: any) {
		this.workFlowtService.newAddCustomerContact(updateObj).subscribe(data => {
			this.loadData();
		})
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

    // Tried For Keypress event 
    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    onKeyUpFirstNames(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedFirstName) {
                if (value == this.selectedFirstName.toLowerCase()) {
                    this.disableSaveFirstName = true;

                }
                else {
                    this.disableSaveFirstName = false;

                }
            }

        }
    }

    onSelectFirstName(event) {
        if (this.alldata) {
            for (let i = 0; i < this.alldata.length; i++) {
                if (event == this.alldata[i].firstName) {
                    this.sourceCustomer.firstName = this.alldata[i].firstName;
                    this.disableSaveFirstName = true;

                    this.selectedFirstName = event;
                }

            }
        }
    }

    onKeyUpMiddleNames(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.disableSaveName) {
                if (value == this.disableSaveName.toLowerCase()) {
                    this.disableSaveMiddleName = true;

                }
                else {
                    this.disableSaveMiddleName = false;

                }
            }

        }
    }

    onSelectMiddleName(event) {
        if (this.alldata) {
            for (let i = 0; i < this.alldata.length; i++) {
                if (event == this.alldata[i].middleName) {
                    this.sourceCustomer.middleName = this.alldata[i].middleName;
                    this.disableSaveMiddleName = true;

                    this.disableSaveName = event;
                }

            }
        }
    }

    onKeyUpLastNames(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.disableSavelastName) {
                if (value == this.disableSavelastName.toLowerCase()) {
                    this.disableSaveLastName = true;

                }
                else {
                    this.disableSaveLastName = false;

                }
            }

        }
    }

    onSelectLastName(event) {
        if (this.alldata) {
            for (let i = 0; i < this.alldata.length; i++) {
                if (event == this.alldata[i].lastName) {
                    this.sourceCustomer.lastName = this.alldata[i].lastName;
                    this.disableSaveLastName = true;

                    this.disableSavelastName = event;
                }

            }
        }
    }

}


