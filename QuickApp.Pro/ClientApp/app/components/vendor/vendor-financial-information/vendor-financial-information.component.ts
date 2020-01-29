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
import { Params, ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Currency } from '../../../models/currency.model';
import { CurrencyService } from '../../../services/currency.service';
import { CreditTerms } from '../../../models/credit-terms.model';
import { CreditTermsService } from '../../../services/Credit Terms.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChangeDetectorRef } from '@angular/core';
import { DiscountValue } from '../../../models/discountvalue';
import { CommonService } from '../../../services/common.service';
import { VendorStepsPrimeNgComponent } from '../vendor-steps-prime-ng/vendor-steps-prime-ng.component';
@Component({
    selector: 'app-vendor-financial-information',
    templateUrl: './vendor-financial-information.component.html',
    styleUrls: ['./vendor-financial-information.component.scss'],
    animations: [fadeInOut]
})
/** anys component*/
export class VendorFinancialInformationComponent implements OnInit, AfterViewInit {
    @ViewChild(VendorStepsPrimeNgComponent) stepper: VendorStepsPrimeNgComponent;
    modelValue: boolean;
    display: boolean;
    activeIndex: any = 4;
    showCurrency: boolean;
    showCreditTearms: boolean;
    showCreditLimit: boolean;
    vendorsList: any[];
    creditTermsCollection: any[];
    creditTermName: any;
    allcreditTermInfo: any[];
    currencyName: any;
    allCurrencyInfo: any[];
    currencyCollection: any[];
    vendorId: any;
    vendorCode: any;
    vendorname: any;
    allgeneralInfo: any[];
    local: any;
    action_name: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createddate: any = "";
    updatedDate: any = "";
    viewName: string = "Create";
    sub: any;
    actionamecolle: any[] = [];
    alldiscountvalueInfo: DiscountValue[] = [];
    discountcollection: any[] = [];
    namecolle: any[] = [];
    selectedConsume: any;
    disableSaveConsume: boolean;
    disableSave: boolean;
    selectedActionName: any;
    creditTermsId: any;
    disableSaveCurrency: boolean;
    SelectedCurrencyInfo: any;
    vendorProcess1099Data: any;
    checkedCheckboxesList: any = [];
    listOfErrors: any[];

    ngOnInit(): void {
        this.workFlowtService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-financial-information';
        this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
        this.loadCreditTermsData();
        this.sourceVendor.v1099RentDefault = true;
        this.sourceVendor.is1099Required = true;
        this.loadDiscountData();
        this.loadCurrencyData();
        if (this.local) {
            this.getVendorsList();
        }
        this.sourceVendor.aeroExchange = true;
        this.sourceVendor.edi = true;

        // this.commonservice.smartDropDownList('Discount', 'DiscountId', 'DiscountValue').subscribe(res => {
        //     console.log(res);
        // })

    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    filteredBrands: any[];
    displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<any>;
    allActions: any[] = [];
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    sourceVendor: any = {};
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
    discontValue: string;
    public allWorkFlows: any[] = [];
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;

    constructor(private cdRef: ChangeDetectorRef, public CreditTermsService: CreditTermsService, public currencyService: CurrencyService, private router: ActivatedRoute, private route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: VendorService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private commonservice: CommonService) {
        if (this.workFlowtService.listCollection !== undefined) {
            this.workFlowtService.isEditMode = true;
        }
        if (this.workFlowtService.contactCollection) {
            this.local = this.workFlowtService.contactCollection;
            this.sourceVendor = this.local;
        }
        this.dataSource = new MatTableDataSource();
        if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
            this.viewName = "Edit";
            this.local = this.workFlowtService.listCollection;
            this.sourceVendor = this.workFlowtService.listCollection;
            this.getVendorProcess1099FromTransaction(this.sourceVendor.vendorId);
        }
        else {
            this.getVendorProcess1099();
        }

        //if(this.sourceVendor.v1099GrossProceedsPaidToAttorneyDefault)
        //{
        //    console.log(this.sourceVendor);
        //}
        //console.log(this.sourceVendor);

    }
    private getVendorsList() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getVendordata(this.local.vendorId).subscribe(
            results => this.onVendorsLoadSuccssfull(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    ngAfterViewChecked() {
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
        this.cols = [
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
        this.isEditMode = true;
        this.vendorId = this.allgeneralInfo[0].vendorId;
        console.log(this.allgeneralInfo);
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
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.sourceVendor = allWorkFlows;
    }

    private getVendorProcess1099() {
        let companyId = 1;
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getVendorProcess1099Data(companyId).subscribe(res => {
            console.log(res[0], "res[0]")
            this.vendorProcess1099Data = res[0].map(x => {
                return {
                    ...x,
                    isDefaultCheck: false,
                    isDefaultRadio: false,
                    isRadioDisabled: true
                }
            });


            console.log(this.vendorProcess1099Data);
        })


    }
    private getVendorProcess1099FromTransaction(vendorId) {

        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getVendorProcess1099DataFromTransaction(vendorId).subscribe(res => {
            if (res[0].length != 0) {
                this.vendorProcess1099Data = res[0].map(x => {
                    return {
                        ...x


                    }
                });
                console.log(this.vendorProcess1099Data);
                console.log(this.checkedCheckboxesList);
                for (let j = 0; j < this.vendorProcess1099Data.length; j++) {
                    if (this.vendorProcess1099Data[j].isDefaultRadio == true || this.vendorProcess1099Data[j].isDefaultRadio == "true") {
                        this.vendorProcess1099Data[j].isDefaultRadio = this.vendorProcess1099Data[j].description
                    }
                    if (this.vendorProcess1099Data[j].isDefaultCheck == true) {
                        this.checkedCheckboxesList.push(j);
                    }
                }
                console.log(this.checkedCheckboxesList, "checkedCheckboxesList++++");
                console.log(this.vendorProcess1099Data);
            } else {
                this.getVendorProcess1099();
            }

        })


    }

    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceVendor = rowData;
            this.Active = "In Active";
        }
        else {
            this.sourceVendor = rowData;
            this.Active = "Active";
        }
    }

    private refresh() {
        this.applyFilter(this.dataSource.filter);
    }
    private onDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allActions = allWorkFlows;
    }

    private onVendorsLoadSuccssfull(allVendors: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allVendors;
        //     console.log(allVendors, "allVendors++++")   
        //    // debugger
        //     if(allVendors[0].t != null)
        //     {
        //         this.sourceVendor.v1099RentDefault=allVendors[0].t.v1099RentDefault;
        //         this.sourceVendor.v1099RoyaltiesDefault=allVendors[0].t.v1099RoyaltiesDefault;
        //         this.sourceVendor.v1099OtherIncomeDefault=allVendors[0].t.v1099OtherIncomeDefault;
        //         this.sourceVendor.v1099MedicalHealthPaymentsDefault=allVendors[0].t.v1099MedicalHealthPaymentsDefault;
        //         this.sourceVendor.v1099NonEmployeeCompDefault=allVendors[0].t.v1099NonEmployeeCompDefault;
        //         this.sourceVendor.v1099GoldenParachuteDefault=allVendors[0].t.v1099GoldenParachuteDefault;
        //         this.sourceVendor.v1099GrossProceedsPaidToAttorneyDefault=allVendors[0].t.v1099GrossProceedsPaidToAttorneyDefault;
        //     }


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
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.auditHisory = auditHistory;
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
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
        this.disableSave = false;
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.disableSaveCurrency = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.actionName = "";
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    openDelete(content, row) {
        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceVendor = row;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openEdit(content, row) {
        this.isEditMode = true;
        this.disableSave = false;
        this.isSaving = true;
        this.sourceVendor = row;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openView(content, row) {
        this.sourceVendor = row;
        this.action_name = row.description;
        this.memo = row.memo;
        this.createdBy = row.createdBy;
        this.updatedBy = row.updatedBy;
        this.createddate = row.createdDate;
        this.updatedDate = row.updatedDate;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openHelpText(content) {
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openHist(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.sourceVendor = row;
    }
    onBlurMethod(data) {
        if (data == 'creditLimit') {
            this.showCreditLimit = false;
        }
        if (data == 'creditTearms') {
            this.showCreditTearms = false;
        }
        if (data == 'currency') {
            this.showCurrency = false;
        }
    }

    // changevalue(value) {
    //     debugger
    //     this.sourceVendor.v1099RentDefault = false;
    //     this.sourceVendor.v1099RoyaltiesDefault = false;
    //     this.sourceVendor.v1099OtherIncomeDefault = false;
    //     this.sourceVendor.v1099MedicalHealthPaymentsDefault = false;
    //     this.sourceVendor.v1099NonEmployeeCompDefault = false;
    //     this.sourceVendor.v1099GoldenParachuteDefault = false;
    //     this.sourceVendor.v1099GrossProceedsPaidToAttorneyDefault = false;

    //     if (value == "sourceVendor.v1099RentDefault") {
    //         this.sourceVendor.v1099RentDefault = true;            
    //     }
    //     else if (value == "sourceVendor.v1099RoyaltiesDefault") {
    //         this.sourceVendor.v1099RoyaltiesDefault = true;          
    //     }
    //     else if (value == "sourceVendor.v1099OtherIncomeDefault") {
    //         this.sourceVendor.v1099OtherIncomeDefault = true;            
    //     }
    //     else if (value == "sourceVendor.v1099MedicalHealthPaymentsDefault") {
    //         this.sourceVendor.v1099MedicalHealthPaymentsDefault = true;            
    //     }
    //     else if (value == "sourceVendor.v1099NonEmployeeCompDefault") {
    //         this.sourceVendor.v1099NonEmployeeCompDefault = true;            
    //     }
    //     else if (value == "sourceVendor.v1099GoldenParachuteDefault") {
    //         this.sourceVendor.v1099GoldenParachuteDefault = true;          
    //     }
    //     else if (value == "sourceVendor.v1099GrossProceedsPaidToAttorneyDefault") {
    //         this.sourceVendor.v1099GrossProceedsPaidToAttorneyDefault = true;         
    //     }
    //     else{
    //         this.sourceVendor.v1099RentDefault = true;   
    //     }
    // }

    changeCheck1099Required(event, index) {
        if (event.target.checked) {
            this.checkedCheckboxesList.push(index);
            this.vendorProcess1099Data[index].isRadioDisabled = false;
            if (this.checkedCheckboxesList.length == 1) {
                this.vendorProcess1099Data[index].isDefaultRadio = event.target.value;
            }
        } else {
            let checkedArrayIndex;
            this.vendorProcess1099Data[index].isDefaultRadio = false;
            checkedArrayIndex = this.checkedCheckboxesList.indexOf(index);
            this.checkedCheckboxesList.splice(checkedArrayIndex, 1);
            this.vendorProcess1099Data[index].isRadioDisabled = true;
            if (this.checkedCheckboxesList.length >= 1) {
                this.checkedCheckboxesList = this.checkedCheckboxesList.sort();
                this.vendorProcess1099Data[this.checkedCheckboxesList[0]].isRadioDisabled = false;
                this.vendorProcess1099Data[this.checkedCheckboxesList[0]].isDefaultRadio = this.vendorProcess1099Data[this.checkedCheckboxesList[0]].description;
            } else {
                for (let i = 0; i < this.vendorProcess1099Data.length; i++) {
                    this.vendorProcess1099Data[i].isDefaultRadio = false;
                }
            }
        }
    }
    changevalue(event, index) {
        for (let i = 0; i < this.vendorProcess1099Data.length; i++) {
            this.vendorProcess1099Data[i].isDefaultRadio = false;
        }
        this.vendorProcess1099Data[index].isDefaultRadio = this.vendorProcess1099Data[index].description;
    }


    editItemAndCloseModel(userForm, isGoNxt?: boolean) {
        this.isSaving = true;
        let errors;
        this.listOfErrors = [];

        if (userForm.status === "INVALID") {
            Object.keys(userForm.controls).map(key => {
                errors = userForm.controls[key].errors;
                if (errors === null) { return null; }
                if (errors['required']) {
                    let titlevalue = key;
                    if (document.getElementById(key)) {
                        titlevalue = document.getElementById(key).getAttribute('title');
                    }
                    this.listOfErrors.push(`${titlevalue} is required`); //test
                } else {
                    this.listOfErrors.push(`${key} has an unknown error`);
                }
            });

            this.display = true;
            this.modelValue = true;
            return false

        }
        // if (!(this.sourceVendor.creditLimit && this.sourceVendor.creditTermsId && this.sourceVendor.currencyId)) {
        //     this.display = true;
        //     this.modelValue = true;
        // }
        if (this.sourceVendor.country != null) {
            this.sourceVendor.country = "99";
        }

        if (!this.creditTermName) {
            this.showCreditTearms = true;
        }
        if (this.sourceVendor.creditLimit && this.sourceVendor.creditTermsId && this.sourceVendor.currencyId) {


            if (this.sourceVendor.v1099RentDefault == true) {
                this.sourceVendor.v1099RentDefault = true;
            }
            else if (this.sourceVendor.v1099RoyaltiesDefault == true) {
                this.sourceVendor.v1099RoyaltiesDefault = true;
            }
            else if (this.sourceVendor.v1099OtherIncomeDefault == true) {
                this.sourceVendor.v1099OtherIncomeDefault = true;
            }
            else if (this.sourceVendor.v1099RoyaltiesDefault == true) {
                this.sourceVendor.v1099RoyaltiesDefault = true;
            }
            else if (this.sourceVendor.v1099NonEmployeeCompDefault == true) {
                this.sourceVendor.v1099NonEmployeeCompDefault = true;
            }
            else if (this.sourceVendor.v1099GoldenParachuteDefault == true) {
                this.sourceVendor.v1099GoldenParachuteDefault = true;
            }
            else if (this.sourceVendor.v1099GrossProceedsPaidToAttorneyDefault == true) {
                this.sourceVendor.v1099GrossProceedsPaidToAttorneyDefault = true;
            }
            else {
                this.sourceVendor.v1099RentDefault = true;
            }


            if (this.sourceVendor.v1099RentDefault == 1) {
                this.sourceVendor.v1099RentDefault = true;
            }
            if (this.sourceVendor.v1099RoyaltiesDefault == 2) {
                this.sourceVendor.v1099RoyaltiesDefault = true;
            }
            if (this.sourceVendor.v1099OtherIncomeDefault == 3) {
                this.sourceVendor.v1099OtherIncomeDefault = true;
            }
            if (this.sourceVendor.v1099RoyaltiesDefault == 4) {
                this.sourceVendor.v1099RoyaltiesDefault = true;
            }
            if (this.sourceVendor.v1099NonEmployeeCompDefault == 5) {
                this.sourceVendor.v1099NonEmployeeCompDefault = true;
            }
            if (this.sourceVendor.v1099GoldenParachuteDefault == 6) {
                this.sourceVendor.v1099GoldenParachuteDefault = true;
            }
            if (this.sourceVendor.v1099GrossProceedsPaidToAttorneyDefault == 7) {
                this.sourceVendor.v1099GrossProceedsPaidToAttorneyDefault = true;
            }
            this.sourceVendor.masterCompanyId = 1;


            if (this.sourceVendor.vendorId) {
                this.sourceVendor.createdBy = this.userName;
                this.sourceVendor.updatedBy = this.userName;
                for (let i = 0; i < this.vendorProcess1099Data.length; i++) {
                    if (this.vendorProcess1099Data[i].isDefaultRadio != true && this.vendorProcess1099Data[i].isDefaultRadio != false) {
                        this.vendorProcess1099Data[i].isDefaultRadio = true;
                    }
                }
                this.sourceVendor.master1099s = this.vendorProcess1099Data;
                this.workFlowtService.updatefinanceinfo(this.sourceVendor, this.sourceVendor.vendorId).subscribe(data => {
                    this.localCollection = data;
                    this.workFlowtService.financeCollection = this.local;
                    // this.activeIndex = 4;
                    this.getVendorProcess1099FromTransaction(this.sourceVendor.vendorId);
                    // this.workFlowtService.indexObj.next(this.activeIndex);
                    this.savesuccessCompleted(this.sourceVendor, isGoNxt);

                })
            }
            else {
                this.sourceVendor.updatedBy = this.userName;
                this.workFlowtService.updatefinanceinfo(this.sourceVendor, this.local.vendorId).subscribe(data => {
                    this.localCollection = data;
                    this.saveCompleted(this.sourceVendor);
                    this.workFlowtService.financeCollection = this.local;
                    // this.activeIndex = 3;
                    // this.workFlowtService.indexObj.next(this.activeIndex);
                    this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-payment-information');
                })
            }
        }
        else {
        }
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
    }
    NextClick() {
        this.workFlowtService.contactCollection = this.local;
        this.activeIndex = 5;
        this.stepper.changeStep(this.activeIndex);
        // this.workFlowtService.indexObj.next(this.activeIndex);
        // this.workFlowtService.changeStep('Payment Information');
        this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-payment-information');
    }
    previousClick() {
        this.activeIndex = 3;
        this.stepper.changeStep(this.activeIndex);
        // this.workFlowtService.indexObj.next(this.activeIndex);
        // this.workFlowtService.changeStep('Contacts');
        this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-contacts');
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
    private savesuccessCompleted(user?: any, isGoNxt?: boolean) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was saved successfully`, MessageSeverity.success);
        if (isGoNxt) {
            this.NextClick();
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
    openCurrency(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.disableSaveCurrency = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new Currency();
        this.sourceAction.isActive = true;
        this.currencyName = "";
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openCrediTerms(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;
        this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new CreditTerms();
        this.sourceAction.isActive = true;
        this.sourceAction.isDeleted = false;
        this.creditTermName = "";
        this.creditTermsId = "";
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    private loadCurrencyData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.currencyService.getCurrencyList().subscribe(
            results => this.onCurrecyLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private onCurrecyLoad(getCurrencyList: Currency[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getCurrencyList;
        this.allCurrencyInfo = getCurrencyList;
    }
    saveCurrecy() {
        this.isSaving = true;
        if (this.currencyName.toLowerCase().trim() == "") {
            this.alertService.showMessage("Empty", 'Code Cannot Submit Empty', MessageSeverity.warn);
            return;
        }

        if (!(this.sourceAction.symbol)) {
            this.alertService.showMessage("Empty", 'Symbol Cannot Be Empty', MessageSeverity.warn);
            return;
        }
        if (!(this.sourceAction.displayName)) {
            this.alertService.showMessage("Empty", 'Name Cannot Be Empty', MessageSeverity.warn);
            return;
        }

        for (let i = 0; i < this.allCurrencyInfo.length; i++) {
            if (this.allCurrencyInfo[i].code.toLowerCase().localeCompare(this.currencyName.toLowerCase()) == 0) {
                this.alertService.showMessage("Duplicate", 'Currency Code Already Exist', MessageSeverity.warn);
                return;
            }
            else {
            }
        }

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.code = this.currencyName;
            this.sourceAction.masterCompanyId = 1;
            this.currencyService.newAddcurrency(this.sourceAction).subscribe(data => {
                this.loadCurrencyData();
                this.sourceVendor.currencyId = data.currencyId;
            });
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
        for (let i = 0; i < this.allCurrencyInfo.length; i++) {
            let currencyName = this.allCurrencyInfo[i].code;
            if (currencyName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.actionamecolle.push([{
                    "currencyId": this.allCurrencyInfo[i].currencyId,
                    "currencyName": currencyName
                }]),
                    this.currencyCollection.push(currencyName);
            }
        }
    }
    currencyHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.SelectedCurrencyInfo) {
                if (value == this.SelectedCurrencyInfo.toLowerCase()) {
                    this.disableSaveCurrency = true;
                }
                else {
                    this.disableSaveCurrency = false;

                }
            }

        }
    }

    CurrencyInfo(event) {
        if (this.allCurrencyInfo) {
            for (let i = 0; i < this.allCurrencyInfo.length; i++) {
                if (event == this.allCurrencyInfo[i].code) {
                    this.sourceVendor.code = this.allCurrencyInfo[i].code;
                    this.disableSaveCurrency = true;
                    this.SelectedCurrencyInfo = event;
                }
            }
        }
    }

    private loadCreditTermsData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.CreditTermsService.getCreditTermsList().subscribe(
            results => this.onCreditTermsdata(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private onCreditTermsdata(getCreditTermsList: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getCreditTermsList;
        this.allcreditTermInfo = getCreditTermsList.columnData;
    }
    saveCreditTermsdata() {
        this.isSaving = true;
        if (this.creditTermsId.toLowerCase().trim() == "") {
            this.alertService.showMessage("Empty", 'Cannot Submit Empty', MessageSeverity.warn);
            return;
        }
        for (let i = 0; i < this.allcreditTermInfo.length; i++) {
            if (this.allcreditTermInfo[i].name.toLowerCase().localeCompare(this.creditTermsId.toLowerCase()) == 0) {
                this.alertService.showMessage("Duplicate", 'Already Exist', MessageSeverity.warn);
                return;
            }
            else {
            }
        }
        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.name = this.creditTermsId;
            this.sourceAction.masterCompanyId = 1;
            this.CreditTermsService.newAddcreditterms(this.sourceAction).subscribe(data => {
                this.loadCreditTermsData();
                this.sourceVendor.creditTermsId = data.creditTermsId;
            })
        }
        else {
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.name = this.creditTermsId;
            this.sourceAction.masterCompanyId = 1;
            this.CreditTermsService.updatecreditterms(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            this.loadCreditTermsData();
        }
        this.modal.close();
    }
    filtercreditTerms(event) {
        this.creditTermsCollection = [];
        for (let i = 0; i < this.allcreditTermInfo.length; i++) {
            let creditTermName = this.allcreditTermInfo[i].name;
            if (creditTermName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.actionamecolle.push([{
                    "creditTermsId": this.allcreditTermInfo[i].creditTermsId,
                    "creditTermName": creditTermName
                }]),
                    this.creditTermsCollection.push(creditTermName);
            }
        }
    }
    partnmId(event) {
        if (this.allcreditTermInfo) {
            for (let i = 0; i < this.allcreditTermInfo.length; i++) {
                if (event == this.allcreditTermInfo[i].name) {
                    this.sourceVendor.creditTermName = this.allcreditTermInfo[i].creditTermName;
                    this.disableSave = true;
                    this.selectedActionName = event;
                }
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
    filterDiscountvalue(event) {
        this.discountcollection = [];
        for (let i = 0; i < this.alldiscountvalueInfo.length; i++) {
            let discontValue = this.alldiscountvalueInfo[i].discontValue;

            if (discontValue.toString().indexOf(event.query)) {
                this.namecolle.push([{
                    "discountId": this.alldiscountvalueInfo[i].discountId,
                    "discontValue": discontValue
                }]),
                    this.discountcollection.push(discontValue)
            }
        }
    }

    private loadDiscountData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getDiscountList().subscribe(
            results => this.onDataLoadClassifiSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }
    private onDataLoadClassifiSuccessful(getDiscountList: DiscountValue[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getDiscountList;
        this.alldiscountvalueInfo = getDiscountList;
    }
    editItemCloseModel() {
        this.isSaving = true;
        if (this.discontValue.toLowerCase().trim() == "") {
            this.alertService.showMessage("Empty", 'Cannot Submit Empty', MessageSeverity.warn);
            return;
        }
        for (let i = 0; i < this.alldiscountvalueInfo.length; i++) {
            if (this.alldiscountvalueInfo[i].discontValue.toString().localeCompare(this.discontValue.toLowerCase()) == 0) {
                this.alertService.showMessage("Duplicate", 'Already Exist', MessageSeverity.warn);
                return;
            }
            else {
            }
        }
        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.discontValue = this.discontValue;
            this.workFlowtService.newAddDiscount(this.sourceAction).
                subscribe(data => {
                    this.loadDiscountData()
                })
            // this.activeIndex = 2;
        }
        else {
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.discontValue = this.discontValue;
            this.sourceAction.masterCompanyId = 1;
            this.workFlowtService.updatediscount(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));

            // this.activeIndex = 2;
        }
        this.modal.close();
    }

    discountvalueHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedConsume) {
                if (value == this.selectedConsume.toLowerCase()) {
                    this.disableSaveConsume = true;
                }
                else {
                    this.disableSaveConsume = false;

                }
            }

        }
    }
    openDiscount(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new DiscountValue();
        this.sourceAction.isActive = true;
        this.discontValue = "";
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    discountvaluedesc(event) {
        if (this.alldiscountvalueInfo) {
            for (let i = 0; i < this.alldiscountvalueInfo.length; i++) {
                if (event == this.alldiscountvalueInfo[i].discontValue) {
                    this.sourceVendor.itemClassificationCode = event;
                    this.disableSaveConsume = true;
                    this.selectedConsume = event;
                }
            }
        }
    }
}









