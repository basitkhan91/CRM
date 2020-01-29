import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { MenuItem } from 'primeng/api';

import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../../services/customer.service';
import { EmployeeService } from '../../../../services/employee.service';
import { AtaMainService } from '../../../../services/atamain.service';
import { MessageSeverity, AlertService } from '../../../../services/alert.service';
import { CreditTermsService } from '../../../../services/Credit Terms.service';
import { CommonService } from '../../../../services/common.service';

import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { MasterCompany } from '../../../../models/mastercompany.model';
import { CurrencyService } from '../../../../services/currency.service';
import { Currency } from '../../../../models/currency.model';
import { LegalEntityService } from '../../../../services/legalentity.service';

@Component({
	selector: 'app-legal-entity-create',
	templateUrl: './legal-entity-steps.component.html',
	styleUrls: ['./legal-entity-steps.component.scss']
})
/** customer-steps-primeng component*/
export class LegalEntityStepsComponent {
	activeMenuItem: number = 1;
	currentTab: string = 'General';
	savedGeneralInformationData: any;
	countryListOriginal: any[];
	creditTermsListOriginal: any[];
	entityId: number;
	editMode: boolean = false;
	customerListOriginal: { customerId: any; name: any; }[];

	customerallListOriginal: { customerId: any; name: any; }[];
	editGeneralInformationData: any;
	employeeListOriginal: any[];
	isDisabledSteps: boolean = false;
	search_ataChapterList: any;
	add_ataChapterList: any;
	ataListDataValues: any[] = [];
	contactList: any;
	breadcrumbs: MenuItem[];

    loadingIndicator: boolean;
    allCurrencyInfo: any[];
    sourceLegalEntity: any = {};
    parentLegalEntity: any = {};
    allCountryinfo: any[];
    countrycollection: any[];
    disablesave: boolean;
    selectedCountries: any;
    allComapnies: MasterCompany[] = [];

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


	/** customer-steps-primeng ctor */
	constructor(private customerService: CustomerService,
		private acRouter: ActivatedRoute,
		public employeeService: EmployeeService,
		private atamain: AtaMainService,
		private alertService: AlertService,
		private route: Router,
        location: Location,
        public currency: CurrencyService,
		private commonservice: CommonService,
        public creditTermService: CreditTermsService,
        private masterComapnyService: MasterComapnyService,
        public workFlowtService: LegalEntityService,
	) {		
		console.log(location.path());
	}

	ngOnInit() {
        this.entityId = this.acRouter.snapshot.params['id'];        
        if (this.entityId) {
			this.isDisabledSteps = true;
			this.editMode = true;
		}

        this.sourceLegalEntity.isBalancingEntity = true;
        this.CurrencyData();
        //this.loadData();
        this.countrylist();
        this.loadMasterCompanies();
        this.loadParentEntities();


        this.GeneralInformation();
        this.sourceLegalEntity = {};
        this.sourceLegalEntity.isBalancingEntity = true;
        this.sourceLegalEntity.isActive = true;

		this.breadcrumbs = [
			{ label: 'Legal Entity' },
            { label: this.editMode ? 'Edit Legal Entity' : 'Create Legal Entity' },
		];
		
	}

	changeOfTab(value) {
		if (value === 'General') {
			this.currentTab = 'General';
			this.activeMenuItem = 1;

        } else if (value === 'Contacts') {
			this.currentTab = 'Contacts';
			this.activeMenuItem = 2;

		} else if (value === 'Financial') {
			this.currentTab = 'Financial';
			this.activeMenuItem = 5;
		} else if (value === 'Billing') {
			this.currentTab = 'Billing';
			this.activeMenuItem = 6;
		} else if (value === 'Shipping') {
			this.currentTab = 'Shipping';
			this.activeMenuItem = 7;
		}  else if (value === 'Documents') {
			this.currentTab = 'Documents';
			this.activeMenuItem = 10;
		}        
    }


    private CurrencyData() {        
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

    private loadParentEntities() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.loadParentEntities().subscribe(
            results => this.onloadParentEntitiesLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onloadParentEntitiesLoadSuccessful(allEntities: MasterCompany[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.parentLegalEntity = allEntities;
        console.log('this.parentLegalEntity 123 :', this.parentLegalEntity)
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


    /////
	
	generalInformationData(data) {
		this.savedGeneralInformationData = data;
		this.isDisabledSteps = true;
	}

	updateInformationData(data) {
		this.editGeneralInformationData = data;
	}
	getAllCountries() {
		this.customerService.getCountrylist().subscribe(res => {
			this.countryListOriginal = res[0];
		})
	}

	getAllCreditTerms() {
		this.commonservice.smartDropDownList('CreditTerms', 'CreditTermsId', 'Name').subscribe(res => {
			this.creditTermsListOriginal = res;

		})
	}
	getAllCustomers() {
		this.customerService.getCustomers().subscribe(res => {
			this.customerListOriginal = res[0];
			console.log(res[0]);
		})
	}

	getAllCustomersData() {
		this.customerService.getallCustomers().subscribe(res => {
			this.customerallListOriginal = res[0];
			console.log(res[0]);
		})
	}

	getallCustomers
	async getAllEmployees() {
		await this.employeeService.getEmployeeList().subscribe(res => {
			this.employeeListOriginal = res[0];
		})
	}

	getAllATAChapter() {
		this.atamain.getAtaMainList().subscribe(res => {
			const responseData = res[0];
			// used to get the complete object in the value 
			this.add_ataChapterList = responseData.map(x => {
				return {
					value: x,
					label: x.ataChapterName
				}

			})
			// used to get the id for the value 
			this.search_ataChapterList = responseData.map(x => {
				return {
					value: x.ataChapterId,
					label: x.ataChapterName
				}
			})
		});
	}

	saveCustomerContactATAMapped(ATAMappingData) {
		const data = ATAMappingData;
		this.customerService.postCustomerATAs(data).subscribe(res => {

			this.getMappedContactByCustomerId(data[0].CustomerId)
			this.getMappedATAByCustomerId(data[0].CustomerId)
			this.alertService.showMessage(
				'Success',
				'Saved ATA Mapped Data Successfully ',
				MessageSeverity.success
			);
		}, error => {
			this.alertService.showMessage(
				'Failed',
				error.error,
				MessageSeverity.error
			);
		})

	}

	getMappedATAByCustomerId(customerId) {

		// const id = this.savedGeneralInformationData.customerId;
		this.customerService.getATAMappedByCustomerId(customerId).subscribe(res => {
			this.ataListDataValues = res;
			console.log(res);

		})
	}

	getMappedContactByCustomerId(customerId) {

		// const id = this.savedGeneralInformationData.customerId;
		this.customerService.getContactsByCustomerId(customerId).subscribe(res => {
			//this.contactList = res;

			const responseData: any = res;
			this.contactList = responseData.map(x => {
				return {
					label: x.firstName, value: x.contactId
				}
			})
			console.log(res);

		})
	}

}