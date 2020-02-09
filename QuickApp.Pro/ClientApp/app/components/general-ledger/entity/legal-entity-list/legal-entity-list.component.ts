import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut } from '../../../../services/animations';
import { AuthService } from '../../../../services/auth.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { FormBuilder } from '@angular/forms';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { MasterCompany } from '../../../../models/mastercompany.model';
import { CurrencyService } from '../../../../services/currency.service';
import { Currency } from '../../../../models/currency.model';
import { TreeNode } from 'primeng/api';
import { CustomerService } from '../../../../services/customer.service';
import { MenuItem } from 'primeng/api';
@Component({
	selector: 'app-legal-entity-list',
	templateUrl: './legal-entity-list.component.html',
	styleUrls: ['./legal-entity-list.component.scss'],
	animations: [fadeInOut]
})
/** EntityEdit component*/
export class EntityEditComponent implements OnInit, AfterViewInit {
	cols1: any[];
	
	//isEditMode: boolean;
	gridData: TreeNode[];
	childCollection: any[] = [];
	/** EntityList ctor */
	allCurrencyInfo: any[];
	sourceLegalEntity: any = {};
	parentLegalEntity: any = {};
	selectedNode1: TreeNode;
	dataSource: MatTableDataSource<{}>;
	displayedColumns: any;
	display: boolean = false;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	selectedColumn: any;
	@ViewChild(MatSort) sort: MatSort;
	loadingIndicator: boolean;
	currencyName: any;
	modelValue: boolean = false;
	cols: any[];
	allComapnies: MasterCompany[] = [];
	allATAMaininfo: any[] = [];
	isSaving: boolean;
	selectedColumns: any[];
	selectedColumns1: any[];
	isEditMode: boolean = false;
	isDeleteMode: boolean;
	public sourceAction: any = [];
	public GeneralInformationValue: boolean = true;
	public LockboxValue: boolean = false;
	public domesticWireValue: boolean = false;
	public internationalValue: boolean = false;
	public GeneralInformationStyle: boolean = true;
	public LockboxStyle: boolean = false;
	public domesticWireStyle: boolean = false;
	public internationalStyle: boolean = false;
	ACHStyle: boolean;
	ACHValue: boolean;
	entityName: string;
    Active: string;
    entityViewFeilds: any = {};
    allCountryinfo: any[];
    countrycollection: any[];
    disablesave: boolean;
	selectedCountries: any;
	displayWarningModal: boolean = false;
	breadcrumbs: MenuItem[];

	constructor(private route: Router,
        private authService: AuthService, private _fb: FormBuilder, private alertService: AlertService, public currency: CurrencyService, public entityService: LegalEntityService,
        private modalService: NgbModal, private activeModal: NgbActiveModal, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private customerService: CustomerService) {

       
		this.dataSource = new MatTableDataSource();
		if (this.entityService.listCollection != null && this.entityService.isEditMode == true) {
			this.sourceLegalEntity = this.entityService.listCollection;
			this.sourceLegalEntity.createdDate = new Date();
			this.sourceLegalEntity.modifiedDate = new Date();
		}
	
	}

    ngOnInit(): void {
        this.sourceLegalEntity.isBalancingEntity = true;
		this.CurrencyData();
        this.loadData();
		this.countrylist();
		this.loadMasterCompanies();
		this.loadParentEntities();

		this.breadcrumbs = [
			{ label: 'Organization' },
			{ label: 'Legal Entity List' },
		];
	}

	modal: NgbModalRef;
	modal1: NgbModalRef;

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	public allWorkFlows: any[] = [];

	private loadParentEntities() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.entityService.loadParentEntities().subscribe(
			results => this.onloadParentEntitiesLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onloadParentEntitiesLoadSuccessful(allEntities: MasterCompany[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.parentLegalEntity = allEntities;

	}

	private loadMasterCompanies() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.masterComapnyService.getMasterCompanies().subscribe(
			results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}

	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.entityService.getEntityList().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

		this.cols = [
			//{ field: 'ataMainId', header: 'ATAMain Id' },
			{ field: 'name', header: 'Company Code' },
			{ field: 'description', header: 'Company Name' },
			{ field: 'ledgerName', header: 'Ledger Name' },
			{ field: 'currencyCode', header: 'Functional Currency' },
			{ field: 'cageCode', header: 'Cage Code' },
			{ field: 'createdBy', header: 'Created By' },
		];

		this.selectedColumns = this.cols;
	}

	private onDataLoadSuccessful(getAtaMainList: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getAtaMainList;
		this.allATAMaininfo = getAtaMainList;
	}

	makeNestedObj(arr, parent) {
		var out = []
		for (var i in arr) {
			if (arr[i].parentId == parent) {
				var children = this.makeNestedObj(arr, arr[i].legalEntityId)
				arr[i] = { "data": arr[i] };
				if (children.length) {
					arr[i].children = children
				}
				out.push(arr[i])
			}
		}
		return out
	}

	GeneralInformation() {
		this.GeneralInformationValue = true;
		this.LockboxValue = false;
		this.domesticWireValue = false;
		this.internationalValue = false;
		this.ACHValue = false;

		this.GeneralInformationStyle = true;
		this.LockboxStyle = false;
		this.domesticWireStyle = false;
		this.internationalStyle = false;
		this.ACHStyle = false;
	}

	Lockbox() {
		this.GeneralInformationValue = false;
		this.LockboxValue = true;
		this.domesticWireValue = false;
		this.internationalValue = false;
		this.ACHValue = false;

		this.GeneralInformationStyle = false;
		this.LockboxStyle = true;
		this.domesticWireStyle = false;
		this.internationalStyle = false;
		this.ACHStyle = false;
	}
	DomesticWire() {
		this.GeneralInformationValue = false;
		this.LockboxValue = false;
		this.domesticWireValue = true;
		this.internationalValue = false;
		this.ACHValue = false;

		this.GeneralInformationStyle = false;
		this.LockboxStyle = false;
		this.domesticWireStyle = true;
		this.internationalStyle = false;
		this.ACHStyle = false;
	}
	InternationalWire() {
		this.GeneralInformationValue = false;
		this.LockboxValue = false;
		this.domesticWireValue = false;
		this.internationalValue = true;
		this.ACHValue = false;

		this.GeneralInformationStyle = false;
		this.LockboxStyle = false;
		this.domesticWireStyle = false;
		this.internationalStyle = true;
		this.ACHStyle = false;
	}
	ACH() {
		this.GeneralInformationValue = false;
		this.LockboxValue = false;
		this.domesticWireValue = false;
		this.internationalValue = false;
		this.ACHValue = true;

		this.GeneralInformationStyle = false;
		this.LockboxStyle = false;
		this.domesticWireStyle = false;
		this.internationalStyle = false;
		this.ACHStyle = true;
	}
	showDomesticWire() {
		this.DomesticWire();
	}

    open(content) {
		console.log('content :', content)
		this.route.navigateByUrl(`generalledgermodule/generalledgerpage/app-legal-entity-add`);
	}

	navigateTogeneralInfo() {
		this.entityService.isEditMode = false;
		this.entityService.ShowPtab = true;
		this.entityService.currentUrl = '/generalledgermodule/generalledgerpage/app-legal-entity-add';
		this.entityService.bredcrumbObj.next(this.entityService.currentUrl);
		this.entityService.alertObj.next(this.entityService.ShowPtab);
		this.route.navigateByUrl('/generalledgermodule/generalledgerpage/app-legal-entity-add');
		this.entityService.listCollection = undefined;
	}

	private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allComapnies = allComapnies;

	}
	private CurrencyData() {
		// 
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.currency.getCurrencyList().subscribe(
			results => this.oncurrencySuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}
	private oncurrencySuccessful(getCreditTermsList: Currency[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allCurrencyInfo = getCreditTermsList;
	}
	private onDataLoadFailed(error: any) {
		// alert(error);
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

	}
	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}

	openCurrency(content) {

		this.isEditMode = false;
		this.isDeleteMode = false;

		this.isSaving = true;
		
		this.sourceAction = new Currency();
		this.sourceAction.isActive = true;
		this.currencyName = "";
		this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	editItemAndCloseModel() {

		//this.isSaving = true;

		if (!(this.sourceLegalEntity.name && this.sourceLegalEntity.description && this.sourceLegalEntity.reportingCurrencyId && this.sourceLegalEntity.reportingCurrencyId && this.sourceLegalEntity.ledgerName)) {
			this.display = true;
			this.modelValue = true;
		}
		if (this.sourceLegalEntity.name && this.sourceLegalEntity.description && this.sourceLegalEntity.reportingCurrencyId && this.sourceLegalEntity.reportingCurrencyId && this.sourceLegalEntity.ledgerName) {
			if (!this.sourceLegalEntity.legalEntityId) {
				this.sourceLegalEntity.createdBy = this.userName;
				this.sourceLegalEntity.updatedBy = this.userName;

				this.sourceLegalEntity.masterCompanyId = 1;
				this.entityService.newAddEntity(this.sourceLegalEntity).subscribe(data => {
					this.alertService.showMessage(
						'Success',
						'Legal Entity added successfully.',
						MessageSeverity.success
						);
					this.loadData();

				});
			}
			else {

				this.sourceLegalEntity.createdBy = this.userName;
				this.sourceLegalEntity.updatedBy = this.userName;
				this.sourceLegalEntity.masterCompanyId = 1;
				this.entityService.updateEntity(this.sourceLegalEntity).subscribe(data => {
					this.alertService.showMessage(
						'Success',
						'Legal Entity updated successfully.',
						MessageSeverity.success
						);
					this.loadData();
				});
			}
			if (this.modal) { this.modal.close(); }
			if (this.modal1) { this.modal1.close(); }
		}

		if (this.display == false) {
			this.dismissModel();
		}
	}

	dismissModelWarning() {
		this.displayWarningModal = true;
	}
	private saveSuccessHelper(role?: any) {
		this.isSaving = false;
		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

		//this.loadData();

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
	}

	private saveFailedHelper(error: any) {
		this.isSaving = false;
		this.alertService.stopLoadingMessage();
		this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
		this.alertService.showStickyMessage(error, null, MessageSeverity.error);
	}

	dismissModel() {
		this.isDeleteMode = false;
		this.isEditMode = false;
		if (this.modal) { this.modal.close(); }
		if (this.modal1) { this.modal1.close(); }
		
	}
    openContentEdit(content, row) {
        console.log('edit row :', row)
		this.route.navigateByUrl(`generalledgermodule/generalledgerpage/app-legal-entity-edit/${row.legalEntityId}`);
	}
	openEdit(content, row) {
		this.GeneralInformation();
		this.sourceLegalEntity = {};
		this.sourceLegalEntity = row;
		

		this.isSaving = true;
		this.sourceLegalEntity.parentId = row.legalEntityId;
		this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	openDelete(content, row) {
		this.sourceLegalEntity = row;
		this.isEditMode = false;
		this.isDeleteMode = true;
		this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	deleteItemAndCloseModel() {
		this.isSaving = true;
		this.sourceLegalEntity.updatedBy = this.userName;
		this.entityService.updateEntitydelete(this.sourceLegalEntity.legalEntityId).subscribe(
			data => {
				this.loadData();
			})
		this.modal.close();
	}
	openHist(content, row) {
		this.sourceLegalEntity = row;

    }

    toggleIsActive(rowData, e) {
        if (e.checked == false) {
            this.sourceLegalEntity = rowData;
            this.sourceLegalEntity.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceLegalEntity.isActive == false;
            this.entityService.updateLegalEntityForActive(this.sourceLegalEntity).subscribe(
                response => this.saveCompleted(this.sourceLegalEntity),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceLegalEntity = rowData;
            this.sourceLegalEntity.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceLegalEntity.isActive == true;
            this.entityService.updateLegalEntityForActive(this.sourceLegalEntity).subscribe(
                response => this.saveCompleted(this.sourceLegalEntity),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

    }
    openView(content, row) {

        this.entityViewFeilds.name = row.name;
        this.entityViewFeilds.description = row.description;
        this.entityViewFeilds.doingLegalAs = row.doingLegalAs;
        this.entityViewFeilds.address1 = row.address1;
        this.entityViewFeilds.address2 = row.address2;
        this.entityViewFeilds.city = row.city;
        this.entityViewFeilds.stateOrProvince = row.stateOrProvince;
        this.entityViewFeilds.postalCode = row.postalCode;
        this.entityViewFeilds.country = row.country;
        this.entityViewFeilds.faxNumber = row.faxNumber;
        this.entityViewFeilds.phoneNumber1 = row.phoneNumber1;
        this.entityViewFeilds.functionalCurrencyId = row.functionalCurrencyId;
        this.entityViewFeilds.reportingCurrencyId = row.reportingCurrencyId;
        this.entityViewFeilds.isBalancingEntity = row.isBalancingEntity;
        this.entityViewFeilds.cageCode = row.cageCode;
        this.entityViewFeilds.faaLicense = row.faaLicense;
        this.entityViewFeilds.taxId = row.taxId;
        this.entityViewFeilds.poBox = row.poBox;
        this.entityViewFeilds.bankStreetaddress1 = row.bankStreetaddress1;
        this.entityViewFeilds.bankStreetaddress2 = row.bankStreetaddress2;
        this.entityViewFeilds.bankCity = row.bankCity;
        this.entityViewFeilds.bankProvince = row.bankProvince;
        this.entityViewFeilds.bankcountry = row.bankcountry;
        this.entityViewFeilds.bankpostalCode = row.bankpostalCode;
        this.entityViewFeilds.domesticBankName = row.domesticBankName;
        this.entityViewFeilds.domesticIntermediateBank = row.domesticIntermediateBank;
        this.entityViewFeilds.domesticBenficiaryBankName = row.domesticBenficiaryBankName;
        this.entityViewFeilds.domesticBankAccountNumber = row.domesticBankAccountNumber;
        this.entityViewFeilds.domesticABANumber = row.domesticABANumber;
        this.entityViewFeilds.internationalBankName = row.internationalBankName;
        this.entityViewFeilds.internationalIntermediateBank = row.internationalIntermediateBank;
        this.entityViewFeilds.internationalBenficiaryBankName = row.internationalBenficiaryBankName;
        this.entityViewFeilds.internationalBankAccountNumber = row.internationalBankAccountNumber;
        this.entityViewFeilds.internationalSWIFTID = row.internationalSWIFTID;
        this.entityViewFeilds.achBankName = row.achBankName;
        this.entityViewFeilds.achIntermediateBank = row.achIntermediateBank;
        this.entityViewFeilds.achBenficiaryBankName = row.achBenficiaryBankName;
        this.entityViewFeilds.achBankAccountNumber = row.achBankAccountNumber;
        this.entityViewFeilds.achABANumber = row.achABANumber;
        this.entityViewFeilds.achSWIFTID = row.achSWIFTID;
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    private countrylist() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.customerService.getCountrylist().subscribe(
            results => this.onDatacountrySuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onDatacountrySuccessful(allCountries: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allCountryinfo = allCountries;

        this.countrycollection = [];
        if (this.allCountryinfo.length > 0) {
            for (let i = 0; i < this.allCountryinfo.length; i++) {
                let countryName = this.allCountryinfo[i].nice_name;
                if (countryName) {
                    this.countrycollection.push(countryName);
                }
            }
        }
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


    onCountrieselected(event) {
        if (this.allCountryinfo) {
            for (let i = 0; i < this.allCountryinfo.length; i++) {
                if (event == this.allCountryinfo[i].nice_name) {
                    this.sourceLegalEntity.nice_name = this.allCountryinfo[i].nice_name;
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
  
}