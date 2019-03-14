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
import { TaxRate } from '../../../models/taxrate.model';
import { TaxRateService } from '../../../services/taxrate.service';
import { FileUploadModule } from 'primeng/fileupload';
import { Observable } from 'rxjs/Observable';
import { localeData } from 'moment';
import { Header } from 'primeng/components/common/shared';
import { Integration } from '../../../models/integration.model';
import { ItemMasterService } from '../../../services/itemMaster.service';
import { IntegrationService } from '../../../services/integration-service';
import { CustomerClassificationService } from '../../../services/CustomerClassification.service';
import { DiscountValue } from '../../../models/discountvalue';
import { TaxTypeService } from '../../../services/taxtype.service';

@Component({
    selector: 'app-customer-financial-information',
    templateUrl: './customer-financial-information.component.html',
    // styleUrls: ['./customers-financial-information.component.scss'],
    animations: [fadeInOut]
})
/** anys component*/
export class CustomerFinancialInformationComponent implements OnInit, AfterViewInit {
	disableSaveCreditTerms: boolean;
	selectedCreditTerms: any;
	SelectedCurrencyInfo: any;
	disableSaveCurrency: boolean;
    localintegration: any[];
    integrationName: string;
    taxratecollection: any[];
    taxRateName: string;
    creditlimitData: any[]=[];
	activeIndex: number;
    fileToUpload: File;
	http: any;
	discountId: number;
    apiEndPoint: any;
    handleError: any;
    httpClient: any;
    allTaxrateInfo: any[];
    showCurrency: boolean;
    showCreditTearms: boolean;
    showCreditLimit: boolean;
    customersList: any[];
    creditTermsCollection: any[];
	creditTermName: any;
    allcreditTermInfo: any[];
    allIntegrationInfo: any[];
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
	alldiscountvalueInfo: DiscountValue[] = [];
	discountcollection: any[]=[];
    discountcolle: any;
    selectedConsume: any;
    disableSaveConsume: boolean;
	creditTermsId: any;
	taxRateValues: any[] = [];
    allTaxratedetails: any[];
    selectedActionName: any;
    disableSave: boolean;
	ngOnInit(): void {
		this.workFlowtService.currentUrl = '/customersmodule/customerpages/app-customer-financial-information';
		this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
		this.workFlowtService.ShowPtab = true;
		this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab); //steps
		this.loadDiscountData();
        this.loadCreditTermsData();
        this.loadCurrencyData();
        this.taxratedata();
		this.loadData();
		this.taxRate();
        this.integrationData();
        if (this.local) {
            this.getCustomerList();

        }

    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    filteredBrands: any[];
    displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<any>;
    allActions: any;
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    sourceCustomer: any = {};
	public sourceAction: any = {};
    public auditHisory: AuditHistory[] = [];
    private bodyText: string;
	loadingIndicator: boolean;
	allTaxTypes: any[] = [];
	actionamecolle: any[] = [];
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
    display: boolean = false;
    modelValue: boolean = false;
	/** Actions ctor */
	discontValue: string;
	namecolle: any[] = [];
	
	private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;

	constructor(public taxtypeser: TaxTypeService, private cdRef: ChangeDetectorRef, public CreditTermsService: CreditTermsService, public currencyService: CurrencyService, public customerClassificationService: CustomerClassificationService, private router: ActivatedRoute, public inteservice: IntegrationService, public taxRateService: TaxRateService, public itemser: ItemMasterService, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: CustomerService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        if (this.workFlowtService.contactCollection) {
            this.local = this.workFlowtService.contactCollection;
        }
        this.dataSource = new MatTableDataSource();
        if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {

            this.local = this.workFlowtService.listCollection.t;
            this.sourceCustomer = this.workFlowtService.listCollection.t;
        }

    }
    private getCustomerList() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getCustomerdata(this.local.customerId).subscribe(
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


    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        this.uploadFileToActivity();
    }

    uploadFileToActivity() {
        this.postFile(this.fileToUpload).subscribe(data => {

        }, error => {
            console.log(error);
        });
    }

    postFile(fileToUpload: File): Observable<boolean> {
        const endpoint = 'D:\\H1';
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        return this.httpClient
            .post(endpoint, formData, {})
            .map(() => { return true; })
            .catch((e) => this.handleError(e));
    }

    private loadFinalObject() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getFinalObj().subscribe(
            results => this.onFinalObjUrl(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onFinalObjUrl(allWorkFlows: any) {
        //debugger;
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.sourceCustomer = allWorkFlows;


    }

    private taxratedata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.taxRateService.getTaxRateList().subscribe(
            results => this.onDataLoadtaxrateSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }
    private onDataLoadtaxrateSuccessful(getTaxRateList: TaxRate[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getTaxRateList;
        this.allTaxrateInfo = getTaxRateList;
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
        for (let i = 0; i < this.allActions.length;i++) {
            this.creditlimitData.push({ 'creditlimitData': this.allActions[i].t });
        }

        //this.creditlimitData=this.all

    }

    private onCustomersLoadSuccssfull(allCustomers: any) {
        //debugger;
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allCustomers;
        //this.customersList = allCustomers[0].t;
        if (this.customersList) {
            this.sourceCustomer = this.customersList;
        }



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
    //onBlurMethod(data) {
    //    if (data == 'creditLimit') {
    //        this.showCreditLimit = false;
    //    }
    //    if (data == 'creditTearms') {
    //        this.showCreditTearms = false;
    //    }
    //    if (data == 'currency') {
    //        this.showCurrency = false;
    //    }
    //}

    //test() {


    //}
    onBlurMethod(data) {
        if (data == 'creditLimit') {
            this.showCreditLimit = false;
        }
        if (data == 'creditTermsId ') {
            this.showCreditTearms = false;
        }
        if (data == 'currencyId') {
            this.showCurrency = false;
        }
    }
    sample() {
        if (!(this.sourceCustomer.creditLimit)) {
            this.display = true;
            this.modelValue = true;
        }
    }
    editItemAndCloseModel() {

        this.isSaving = true;

		if (!(this.sourceCustomer.creditLimit && this.sourceCustomer.creditTermsId && this.sourceCustomer.currencyId)) {
            this.display = true;
            this.modelValue = true;
        }
        if (this.sourceCustomer.creditLimit && this.sourceCustomer.creditTermsId && this.sourceCustomer.currencyId) {
            if (this.sourceCustomer.customerId) {
                this.sourceCustomer.createdBy = this.userName;
                this.sourceCustomer.updatedBy = this.userName;
                this.sourceCustomer.masterCompanyId = 1;
                this.workFlowtService.updatefinanceinfo(this.sourceCustomer, this.local.customerId).subscribe(data => {
					this.localCollection = data;
					this.saveCompleted(this.sourceCustomer);
					this.workFlowtService.financeCollection = this.local;
					//this.activeIndex = 2;
					//this.workFlowtService.indexObj.next(this.activeIndex);
				//	this.route.navigateByUrl('/customersmodule/customerpages/app-customer-billing-information');
					

                })

            }
            else {

                this.sourceCustomer.updatedBy = this.userName;
                this.sourceCustomer.masterCompanyId = 1;
                //debugger;
                this.workFlowtService.updatefinanceinfo(this.sourceCustomer, this.local.customerId).subscribe(data => {
					this.localCollection = data;
					this.saveCompleted(this.sourceCustomer);
                    //this.activeIndex = 2;
                    //this.workFlowtService.indexObj.next(this.activeIndex);
					this.workFlowtService.financeCollection = this.local;
					
                    //this.route.navigateByUrl('/customersmodule/customerpages/app-customer-billing-information');
                })

				
				//this.route.navigateByUrl('/customersmodule/customerpages/app-customer-billing-information');
            }
        }
        else { }



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

	private savesuccessCompleted(user?: any) {
		this.isSaving = false;


		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);



		this.loadData();
	}
	private saveSuccessHelper(role?: any) {
		this.isSaving = false;
		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

		this.loadData();

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

    openCurrency(content) {

        this.isEditMode = false;
		this.isDeleteMode = false;
		this.disableSaveCurrency = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new Currency();
        this.sourceAction.isActive = true;
        this.currencyName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openCrediTerms(content) {

        this.isEditMode = false;
		this.isDeleteMode = false;
		this.disableSaveCreditTerms = false;
        this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceAction = new CreditTerms();
        this.sourceAction.isActive = true;
		this.creditTermName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


	CreditTermsHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedCreditTerms) {
				if (value == this.selectedCreditTerms.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSaveCreditTerms = true;

				}
				else {
					this.disableSaveCreditTerms = false;

				}
			}

		}
	}


	currencyHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.SelectedCurrencyInfo) {
				if (value == this.SelectedCurrencyInfo.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSaveCurrency = true;

				}
				else {
					this.disableSaveCurrency = false;

				}
			}

		}
	}

	CreditTermsCode(event) {
		//debugger;
		if (this.allcreditTermInfo) {

			for (let i = 0; i < this.allcreditTermInfo.length; i++) {
				if (event == this.allcreditTermInfo[i].name) {
					this.sourceAction.name = this.allcreditTermInfo[i].name;
					this.disableSaveCreditTerms = true;

					this.selectedCreditTerms = event;
				}

			}
		}
	}
	CurrencyInfo(event) {
		//debugger;
		if (this.allCurrencyInfo) {

			for (let i = 0; i < this.allCurrencyInfo.length; i++) {
				if (event == this.allCurrencyInfo[i].code) {
					this.sourceAction.code = this.allCurrencyInfo[i].code;
					this.disableSaveCurrency= true;

					this.SelectedCurrencyInfo = event;
				}

			}
		}
	}


	nextClick() {
		this.workFlowtService.contactCollection = this.local;
		this.activeIndex = 3;
		this.workFlowtService.indexObj.next(this.activeIndex);
		//this.saveCompleted(this.sourceCustomer);
		this.route.navigateByUrl('/customersmodule/customerpages/app-customer-billing-information');

	}
	backClick() {
		this.workFlowtService.contactCollection = this.local;
		this.activeIndex = 1;
		this.workFlowtService.indexObj.next(this.activeIndex);
		//this.saveCompleted(this.sourceCustomer);
		this.route.navigateByUrl('/customersmodule/customerpages/app-customer-contacts');

	}

    private loadCurrencyData() {
        // debugger;
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.currencyService.getCurrencyList().subscribe(
            results => this.onCurrecyLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }
    private onCurrecyLoad(getCurrencyList: Currency[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getCurrencyList;

        this.allCurrencyInfo = getCurrencyList;
    }
    saveCurrecy() {

        // debugger;

        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.code = this.currencyName;
            this.sourceAction.masterCompanyId = 1;
            this.currencyService.newAddcurrency(this.sourceAction).subscribe(data => {
               // this.sourceCustomer.curencyId = data.currencyId;
				this.loadCurrencyData();
				this.saveCompleted(this.sourceAction);
				this.sourceCustomer.currencyId = data.currencyId;
            });
            //role => this.saveSuccessHelper(role),
            //error => this.saveFailedHelper(error));
        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.code = this.currencyName;
            this.sourceAction.masterCompanyId = 1;
            this.currencyService.updatecurrency(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }
	filterCurrency(event) {

		this.currencyCollection = [];
		if (this.allCurrencyInfo) {

			for (let i = 0; i < this.allCurrencyInfo.length; i++) {
				let currencyName = this.allCurrencyInfo[i].code;
				if (currencyName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.currencyCollection.push(currencyName);
				}
			}
		}
	}
    //-------Credit Terms----



    private loadCreditTermsData() {
        // debugger;
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.CreditTermsService.getCreditTermsList().subscribe(
            results => this.onCreditTermsdata(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }
    private onCreditTermsdata(getCreditTermsList: CreditTerms[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getCreditTermsList;
        this.allcreditTermInfo = getCreditTermsList;
    }

    saveCreditTermsdata() {

   
        this.isSaving = true;
        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
			this.sourceAction.name = this.creditTermsId;
            this.sourceAction.masterCompanyId = 1;
            this.CreditTermsService.newAddcreditterms(this.sourceAction).subscribe(data => {
				this.loadCreditTermsData();
				this.sourceCustomer.creditTermsId = data.creditTermsId;
				this.saveCompleted(this.sourceAction);
            })
            
        }
        else {
            this.sourceAction.updatedBy = this.userName;
			this.sourceAction.name = this.creditTermsId;
            this.sourceAction.masterCompanyId = 1;
            this.CreditTermsService.updatecreditterms(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
	}

	SaveCreditModel() {

		debugger;
		this.isSaving = true;
		if (this.isEditMode == false) {
			this.sourceAction.createdBy = this.userName;
			this.sourceAction.updatedBy = this.userName;
			this.sourceAction.name = this.creditTermName;
			this.sourceAction.masterCompanyId = 1;
			this.CreditTermsService.newAddcreditterms(this.sourceAction).subscribe(data => {
				this.sourceCustomer.creditTermsId = data.creditTermsId;
				this.loadCreditTermsData();
			})
		}
		else {
			this.sourceAction.updatedBy = this.userName;
			this.sourceAction.name = this.creditTermName;
			this.sourceAction.masterCompanyId = 1;
			this.CreditTermsService.updatecreditterms(this.sourceAction).subscribe(
				response => this.saveCompleted(this.sourceAction),
				error => this.saveFailedHelper(error));
		}

		this.modal.close();
	}

    filtercreditTerms(event) {
		this.creditTermsCollection = [];
		if (this.allcreditTermInfo) {
			for (let i = 0; i < this.allcreditTermInfo.length; i++) {
				let creditTermName = this.allcreditTermInfo[i].name;
				if (creditTermName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.creditTermsCollection.push(creditTermName);
				}
			}
		}
    }

    opentaxratemodel(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;

        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new TaxRate();
        this.sourceAction.isActive = true;
        this.taxRateName = "";

        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    filterTaxRates(event) {

        this.taxratecollection = [];
        for (let i = 0; i < this.allTaxrateInfo.length; i++) {
            let taxRateName = this.allTaxrateInfo[i].taxTypeId;
            if (taxRateName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.taxratecollection.push(taxRateName);
            }
        }
    }


    taxratesavemethod() {

         debugger;

        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.taxTypeId = this.taxRateName;
            this.sourceAction.masterCompanyId = 1;
            this.taxRateService.newTaxRate(this.sourceAction).subscribe(data => { this.taxratedata() })
              
        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.taxTypeId = this.taxRateName;
            this.sourceAction.masterCompanyId = 1;
            this.taxRateService.updateTaxRate(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

       // this.modal.close();
	}

	filterTaxTypes(event) {

		this.localCollection = [];
		for (let i = 0; i < this.allTaxTypes.length; i++) {
			let taxTypeName = this.allTaxTypes[i].description;
			if (taxTypeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {

				this.actionamecolle.push([{
					"taxTypeId": this.allTaxTypes[i].taxTypeId,
					"taxTypeName": taxTypeName
				}]),

					this.localCollection.push(taxTypeName);
			}
		}
	}
	eventHandler(event) {
		let value = event.target.value.toLowerCase();
		if (this.selectedActionName) {
			if (value == this.selectedActionName.toLowerCase()) {
				this.disableSave = true;
			}
			else {
				this.disableSave = false;
			}
		}
	}
	partnmId(event) {
		//debugger;
		for (let i = 0; i < this.actionamecolle.length; i++) {
			if (event == this.actionamecolle[i][0].taxTypeName) {
				this.disableSave = true;
				this.selectedActionName = event;
			}
		}
	}
	private onTaxTypeloadsuc(allWorkFlows: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allTaxTypes = allWorkFlows;
	}

	private loadTaxTypeData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.taxtypeser.getWorkFlows().subscribe(
			results => this.onTaxTypeloadsuc(results[0]),
			error => this.onDataLoadFailed(error)
		);


		this.selectedColumns = this.cols;

	}

    private integrationData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.inteservice.getWorkFlows().subscribe(
            results => this.onDatainteSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }
    private onDatainteSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = allWorkFlows;
        this.allIntegrationInfo = allWorkFlows;
    }

    integratn(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;

        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new Integration();
        this.sourceAction.isActive = true;
        this.integrationName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    filterintegrations(event) {

        this.localintegration = [];
        for (let i = 0; i < this.allIntegrationInfo.length; i++) {
            let integrationName = this.allIntegrationInfo[i].description;
            if (integrationName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.localintegration.push(integrationName);
            }
        }
    }

    saveintegration() {

        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.integrationName;
            this.inteservice.newAction(this.sourceAction).subscribe(data => { this.integrationData() })

        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.integrationName;
            this.inteservice.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        //this.modal.close();
	}

	openDiscount(content) {
		this.isEditMode = false;
		this.isDeleteMode = false;

		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceAction = new DiscountValue();
		this.sourceAction.isActive = true;
		this.discontValue = "";
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })



	}

	filterDiscountvalue(event) {
		
		this.discountcollection = [];
		for (let i = 0; i < this.alldiscountvalueInfo.length; i++) {
			let discontValue = this.alldiscountvalueInfo[i].discontValue;
			if (discontValue.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.namecolle.push([{
					"discountId": this.alldiscountvalueInfo[i].discountId,
					"discontValue": discontValue
				}]),
					this.discountcollection.push(discontValue)
			}
			}
		}
	
	private loadDiscountData() {
		// debugger;
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getDiscountList().subscribe(
			results => this.onDataLoadClassifiSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}
	private onDataLoadClassifiSuccessful(getDiscountList: DiscountValue[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getDiscountList;

		this.alldiscountvalueInfo = getDiscountList;
	}

	editItemCloseModel() {

		// debugger;
		this.isSaving = true;
		if (this.isEditMode == false) {
			this.sourceAction.createdBy = this.userName;
			this.sourceAction.updatedBy = this.userName;
			this.sourceAction.discontValue = this.discontValue;
			//this.sourceAction.masterCompanyId = 1;
			this.workFlowtService.newAddDiscount(this.sourceAction).
				subscribe(data => {
				this.loadDiscountData()

			})

			this.activeIndex = 2;
		}
		else {
			this.sourceAction.updatedBy = this.userName;
			this.sourceAction.discontValue = this.discontValue;
			this.sourceAction.masterCompanyId = 1;
			this.workFlowtService.updatediscount(this.sourceAction).subscribe(
				response => this.saveCompleted(this.sourceAction),
				error => this.saveFailedHelper(error));

			this.activeIndex = 2;

			
		}
		this.modal.close();
	}

	discountvalueHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedConsume) {
				if (value == this.selectedConsume.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSaveConsume = true;

				}
				else {
					this.disableSaveConsume = false;

				}
			}

		}
	}

	discountvaluedesc(event) {
		//
		if (this.alldiscountvalueInfo) {

			for (let i = 0; i < this.alldiscountvalueInfo.length; i++) {
				if (event == this.alldiscountvalueInfo[i].discontValue) {
					this.sourceCustomer.itemClassificationCode = this.alldiscountvalueInfo[i].discontValue;
					this.disableSaveConsume = true;

					this.selectedConsume = event;
				}

			}
		}
	}
	private onTaxrateDetails(getEmployeeCerficationList: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getEmployeeCerficationList;
		this.allTaxratedetails = getEmployeeCerficationList;
		if (this.allTaxratedetails.length > 0) {
			for (let i = 0; i < this.allTaxratedetails.length; i++)
				this.taxRateValues.push(
					{ value: this.allTaxratedetails[i].taxTypeId, label: this.allTaxratedetails[i].description },
					//{ value: '2', label: 'Shift 1' },
					//{ value: '3', label: 'Shift 1' },
					//{ value: '4', label: 'Shift 1' },

				);
		}
	}
	private taxRate() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.taxRateService.getTaxRateList().subscribe(
			results => this.onTaxrateDetails(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
}