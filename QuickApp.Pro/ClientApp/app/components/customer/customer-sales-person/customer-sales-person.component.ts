import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { AuthService } from '../../../services/auth.service';
import { CustomerService } from '../../../services/customer.service';
import { EmployeeService } from '../../../services/employee.service';
import { VendorService } from '../../../services/vendor.service';
import { getValueFromObjectByKey, getObjectById, editValueAssignByCondition, getObjectByValue, getValueFromArrayOfObjectById, getValueByFieldFromArrayofObject } from '../../../generic/autocomplete';
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { LocalStoreManager } from '../../../services/local-store-manager.service';
import { DBkeys } from '../../../services/db-Keys';
import { CommonService } from '../../../services/common.service';

@Component({
    selector: 'app-customer-sales-person',
    templateUrl: './customer-sales-person.component.html',
    styleUrls: ['./customer-sales-person.component.scss'],
    animations: [fadeInOut]
})
/** anys component*/
export class CustomerSalesPersonComponent implements OnInit {
    @Input() savedGeneralInformationData;
    @Input() editGeneralInformationData;
    @Input() editMode;
    @Input() employeeListOriginal: any = [];
    @Input() jobTitles;
    @Output() tab = new EventEmitter();
    employeeList: any[];
    employeeTypeList: any[];
    // employeeListOriginal: any[];
    id: number;
    customerName: any;
    customerCode: any;
    numberValidate = "^\d+$";
    globalSettings: any = {};
    global_lang: any;
    csrOriginalList: any;
    csrList: any;
    agentsOriginalList: any;
    agentList: any[];
    salesPersonOriginalList: any;
    primarySPList: any[] = [];
    secondarySPList: any[] = [];
    secondarySPListFilterData: any[];
    primarySPListFilterData: any[];


    constructor(public vendorservice: VendorService, public customerService: CustomerService,
        // public conditionService: ConditionService, 
        // public itemser: ItemMasterService, 
        public employeeService: EmployeeService,
        private commonService: CommonService,
        // public CreditTermsService: CreditTermsService, 
        // public currencyService: CurrencyService, 
        // public workFlowtService: CustomerService ,
        private authService: AuthService,
        private alertService: AlertService,
        private localStorage: LocalStoreManager,
    ) {
    }
    salesInfo = {
        primarySalesPersonId: undefined,
        secondarySalesPersonId: undefined,
        csrId: "",
        saId: "",
        annualRevenuePotential: "",
        annualQuota: "",
    }
    // activeIndex: number;
    // showCurrency: boolean;
    // showCreditTearms: boolean;
    // showCreditLimit: boolean;
    // customersList: any[];
    // creditTermsCollection: any[];
    // creditTermName: any;
    // allcreditTermInfo: any[];
    // currencyName: any;
    // allCurrencyInfo: any[];
    // currencyCollection: any[];
    // customerId: any;
    // allgeneralInfo: any[];
    // local: any;
    // action_name: any = "";
    // memo: any = "";
    // createdBy: any = "";
    // updatedBy: any = "";
    // createddate: any = "";
    // updatedDate: any = "";
    // sub: any;
    // allEmployeeinfo: any[] = [];
    // firstCollection: any[];
    // disableSavepartDescription: boolean;
    // itemclaColl: any[];
    // partCollection: any[];
    // allPartnumbersInfo: any[];
    // disableSavepartNumber: boolean;
    // selectedActionName: any;
    // descriptionbyPart: any[] = [];
    // allConditionInfo: Condition[] = [];
    // allCustomer: any[];
    // allVendorList: any[];
    // ngOnInit(): void {
    //     this.workFlowtService.currentUrl = '/customersmodule/customerpages/app-customer-sales-person';
    //     this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
    //     this.workFlowtService.ShowPtab = true;
    //     this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab); //steps

    //     if (this.local) {
    //         this.getSalesperson();

    //     }
    //     this.employeedata();
    //     this.loadItemmasterData();
    //     //this.ptnumberlistdata();
    //     this.loadDataForCondition();
    //     this.customerList();
    //     this.vendorList();
    // }
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ViewChild(MatSort) sort: MatSort;
    // filteredBrands: any[];
    // displayedColumns = ['actionId', 'companyName', 'description', 'memo', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    // dataSource: MatTableDataSource<any>;
    // allActions: any[] = [];
    // allComapnies: MasterCompany[] = [];
    // private isSaving: boolean;
    // sourceCustomer: any = {};
    // public sourceAction: any = [];
    // public auditHisory: AuditHistory[] = [];
    // private bodyText: string;
    // loadingIndicator: boolean;
    // closeResult: string;
    // selectedColumn: any[];
    // selectedColumns: any[];
    // cols: any[];
    // title: string = "Create";
    // id: number;
    // errorMessage: any;
    // modal: NgbModalRef;
    // actionName: string;
    // Active: string = "Active";
    // length: number;
    // localCollection: any;

    /** Actions ctor */

    // private isEditMode: boolean = false;
    // private isDeleteMode: boolean = false;
    ngOnInit() {
        this.getGlobalSettings();
        this.getCSRList();
        this.getAgentsList();
        this.getSalesPersonList();
        if (this.editMode) {

            console.log(this.editGeneralInformationData);

            this.id = this.editGeneralInformationData.customerId
            this.salesInfo = {
                ...this.editGeneralInformationData,
                primarySalesPersonId: getObjectById('employeeId', this.editGeneralInformationData.primarySalesPersonId, this.employeeListOriginal),
                secondarySalesPersonId: getObjectById('employeeId', this.editGeneralInformationData.secondarySalesPersonId, this.employeeListOriginal),
                csrId: getObjectById('employeeId', this.editGeneralInformationData.csrId, this.employeeListOriginal),
                saId: getObjectById('employeeId', this.editGeneralInformationData.saId, this.employeeListOriginal)
            };
            console.log(this.salesInfo)



            this.customerCode = this.editGeneralInformationData.customerCode;
            this.customerName = this.editGeneralInformationData.name;


            // this.primarySalesPersonId: getValueFromObjectByKey('employeeId', this.salesInfo.primarySalesPersonId),
            // secondarySalesPersonId

        } else {
            this.id = this.savedGeneralInformationData.customerId;
            this.customerCode = this.savedGeneralInformationData.customerCode;
            this.customerName = this.savedGeneralInformationData.name;
        }

    }




    getGlobalSettings() {
        this.globalSettings = this.localStorage.getDataObject<any>(DBkeys.GLOBAL_SETTINGS) || {};
        this.global_lang = this.globalSettings.cultureName;

    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    getCSRList() {
        console.log(this.jobTitles);
        const id = getValueByFieldFromArrayofObject('jobTitle', 'CSR', this.jobTitles);
        if (id !== undefined) {
            this.commonService.getEmployeesByCategory(id[0].jobTitleId).subscribe(res => {
                this.csrOriginalList = res;
            })
        }
    }
    getAgentsList() {
        console.log(this.jobTitles);
        const id = getValueByFieldFromArrayofObject('jobTitle', 'Agents', this.jobTitles);
        if (id !== undefined) {
            this.commonService.getEmployeesByCategory(id[0].jobTitleId).subscribe(res => {
                this.agentsOriginalList = res;
            })
        }
    }
    getSalesPersonList() {
        console.log(this.jobTitles);
        const id = getValueByFieldFromArrayofObject('jobTitle', 'Sales', this.jobTitles);
        console.log(id);
        if (id !== undefined) {
            this.commonService.getEmployeesByCategory(id[0].jobTitleId).subscribe(res => {
                console.log(res);
                this.salesPersonOriginalList = res;
            })
        }
    }

    filterPrimary(event) {
        let data;
        if (!this.editMode) {
            if (this.salesInfo.secondarySalesPersonId !== undefined && this.salesInfo.secondarySalesPersonId !== '' && this.salesInfo.secondarySalesPersonId !== null) {
                data = this.primarySPListFilterData;
            } else {
                data = this.salesPersonOriginalList;
            }
        } else {
            console.log(this.salesInfo.secondarySalesPersonId);

            if (this.salesInfo.secondarySalesPersonId !== undefined) {
                data = [...this.salesPersonOriginalList.filter(x => {
                    if (this.salesInfo.secondarySalesPersonId.employeeId !== x.employeeId) {
                        return x;
                    }
                })]
            } else {
                data = this.salesPersonOriginalList;
            }


        }
        console.log(data);
        this.primarySPList = data;

        const primarySPData = [...data.filter(x => {
            return x.name.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.primarySPList = primarySPData;
    }

    filterSecondary(event) {
        let data;
        if (!this.editMode) {
            if (this.salesInfo.primarySalesPersonId !== undefined && this.salesInfo.primarySalesPersonId !== '' && this.salesInfo.primarySalesPersonId !== null) {
                data = this.secondarySPListFilterData;
            } else {
                data = this.salesPersonOriginalList;
            }
        } else {
            if (this.salesInfo.primarySalesPersonId !== undefined) {
                data = [...this.salesPersonOriginalList.filter(x => {
                    if (this.salesInfo.primarySalesPersonId.employeeId !== x.employeeId) {
                        return x;
                    }
                })]
            } else {
                data = this.salesPersonOriginalList;
            }

        }


        this.secondarySPList = data;

        const secondarySPData = [...data.filter(x => {
            return x.name.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.secondarySPList = secondarySPData;
    }



    filterCSR(event) {
        this.csrList = this.csrOriginalList;

        const CSRData = [...this.csrOriginalList.filter(x => {
            return x.name.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.csrList = CSRData;
    }

    filterAgents(event) {
        this.agentList = this.agentsOriginalList;

        const agentData = [...this.agentsOriginalList.filter(x => {
            return x.name.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.agentList = agentData;
    }


    selectedSalesPerson(object, type) {
        if (type === 'PrimarySalesPerson') {
            this.secondarySPListFilterData = [...this.salesPersonOriginalList.filter(x => {
                if (object.employeeId !== x.employeeId) {
                    return x;
                }
            })]


        } else if (type === 'SecondarySalesPerson') {
            this.primarySPListFilterData = [...this.salesPersonOriginalList.filter(x => {
                if (object.employeeId !== x.employeeId) {
                    return x;
                }
            })]
        }
    }

    // selectedSalesPersonOnKeyup(value, type) {
    //     (onKeyUp)="
    //     selectedSalesPersonOnKeyup(
    //       $event.target.value,
    //       'SecondarySalesPerson'
    //     )
    //   "

    //     (onKeyUp)="
    //     selectedSalesPersonOnKeyup(
    //       $event.target.value,
    //       'SecondarySalesPerson'
    //     )
    //   "
    //     //     console.log(value);
    //     if (value == '') {

    //         this.secondarySPListFilterData = this.salesPersonOriginalList;
    //         this.primarySPListFilterData = this.salesPersonOriginalList;
    //     }
    //     // if (value == '' && type === 'PrimarySalesPerson') {
    //     //     this.secondarySPListFilterData = this.salesPersonOriginalList;
    //     // } else if (value == '' && type === 'SecondarySalesPerson') {
    //     //     this.primarySPListFilterData = this.salesPersonOriginalList;
    //     // }
    // }
    // this.partListForPMA = this.generalInformation.restrictedPMAParts.reduce((acc, obj) => {
    //     return acc.filter(x => x.value.itemMasterId !== obj.masterPartId)
    // }, this.partListOriginal)



    saveSalesInformation() {
        this.customerService.updatesalesinfo({
            ...this.salesInfo,
            primarySalesPersonId: editValueAssignByCondition('employeeId', this.salesInfo.primarySalesPersonId),
            secondarySalesPersonId: editValueAssignByCondition('employeeId', this.salesInfo.secondarySalesPersonId),
            csrId: editValueAssignByCondition('employeeId', this.salesInfo.csrId),
            saId: editValueAssignByCondition('employeeId', this.salesInfo.saId),
            createdBy: this.userName,
            updatedBy: this.userName,
            masterCompanyId: 1
        }, this.id).subscribe(
            res => {
                this.nextClick();
                this.alertService.showMessage(
                    'Success',
                    `${this.editMode ? 'Updated' : 'Saved'} Customer Sales Infromation Successfully `,
                    MessageSeverity.success
                );

            }
        )
    }
    formatannualRevenuePotential(val) {
        if (val) {
            if (isNaN(val) == true) {
                val = Number(val.replace(/[^0-9.-]+/g, ""));
            }
            this.salesInfo.annualRevenuePotential = new Intl.NumberFormat(this.global_lang, { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val)
            return this.salesInfo.annualRevenuePotential;
        }

    }
    formatannualQuota(val) {
        if (val) {

            if (isNaN(val) == true) {
                val = Number(val.replace(/[^0-9.-]+/g, ""));
            }
            this.salesInfo.annualQuota = new Intl.NumberFormat(this.global_lang, { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val)
            return this.salesInfo.annualQuota;
        }
    }


    nextClick() {
        this.tab.emit('Warnings');
    }
    backClick() {
        this.tab.emit('Shipping');
    }

    //     if (this.workFlowtService.shippingCollection) {
    //         this.local = this.workFlowtService.shippingCollection;
    //     }
    //     this.dataSource = new MatTableDataSource();
    //     if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
    //         this.local = this.workFlowtService.listCollection.t;
    //         this.sourceCustomer = this.workFlowtService.listCollection.t;
    //     }

    // }
    // private getSalesperson() {

    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.workFlowtService.getSalespersondata(this.local.customerId).subscribe(
    //         results => this.onCustomersLoadSuccssfull(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    // }

    // ngAfterViewChecked() {

    //     this.cdRef.detectChanges();
    // }
    // ngAfterViewInit() {
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    // }
    // public allWorkFlows: any[] = [];

    // private loadData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.workFlowtService.getWorkFlows().subscribe(
    //         results => this.onDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );


    //     this.cols = [
    //         //{ field: 'actionId', header: 'Action Id' },
    //         { field: 'description', header: 'Action Name' },
    //         { field: 'memo', header: 'Memo' },
    //         { field: 'createdBy', header: 'Created By' },
    //         { field: 'updatedBy', header: 'Updated By' },
    //         { field: 'updatedDate', header: 'Updated Date' },
    //         { field: 'createdDate', header: 'Created Date' }

    //     ];

    //     this.selectedColumns = this.cols;

    // }

    // private loadMasterCompanies() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.masterComapnyService.getMasterCompanies().subscribe(
    //         results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    // }

    // public applyFilter(filterValue: string) {
    //     this.dataSource.filter = filterValue;
    // }


    // nextClick() {
    //     if (this.local) {
    //         this.workFlowtService.shippingCollection = this.local;
    //     }

    //     this.activeIndex = 6;
    //     this.workFlowtService.indexObj.next(this.activeIndex);
    //     //this.saveCompleted(this.sourceCustomer);
    //     this.editItemAndCloseModel();
    //     this.route.navigateByUrl('/customersmodule/customerpages/app-customer-warnings');
    // }
    // backClick() {
    //     this.workFlowtService.contactCollection = this.local;
    //     this.activeIndex = 4;
    //     this.workFlowtService.indexObj.next(this.activeIndex);
    //     //this.saveCompleted(this.sourceCustomer);
    //     this.route.navigateByUrl('/customersmodule/customerpages/app-customer-shipping-information');

    // }



    // handleChange(rowData, e) {
    //     if (e.checked == false) {
    //         this.sourceCustomer = rowData;
    //         //this.sourceCustomer.updatedBy = this.userName;
    //         this.Active = "In Active";
    //         //this.sourceCustomer.isActive == false;
    //         //this.workFlowtService.updatefinanceinfo(this.sourceCustomer).subscribe(
    //         //    response => this.saveCompleted(this.sourceCustomer),
    //         //    error => this.saveFailedHelper(error));
    //         //alert(e);
    //     }
    //     else {
    //         this.sourceCustomer = rowData;
    //         //this.sourceCustomer.updatedBy = this.userName;
    //         this.Active = "Active";
    //         //this.sourceCustomer.isActive == true;
    //         //this.workFlowtService.updatefinanceinfo(this.sourceCustomer).subscribe(
    //         //    response => this.saveCompleted(this.sourceCustomer),
    //         //    error => this.saveFailedHelper(error));
    //         //alert(e);
    //     }

    // }

    // private refresh() {
    //     // Causes the filter to refresh there by updating with recently added data.
    //     this.applyFilter(this.dataSource.filter);
    // }
    // private onDataLoadSuccessful(allWorkFlows: any[]) {

    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allActions = allWorkFlows;


    // }

    // private onCustomersLoadSuccssfull(allCustomers: any) {
    //     debugger;
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allCustomers;
    //     this.customersList = allCustomers[0].t;
    //     if (this.customersList) {
    //         this.sourceCustomer = this.customersList;
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

    // openEdit(content, row) {

    //     this.isEditMode = true;

    //     this.isSaving = true;
    //     this.sourceCustomer = row;
    //     this.loadMasterCompanies();
    //     // this.actionName = this.sourceCustomer.description;
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }
    // openView(content, row) {

    //     this.sourceCustomer = row;
    //     this.action_name = row.description;
    //     this.memo = row.memo;
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


    //     this.sourceCustomer = row;




    // }
    // private savesuccessCompleted(user?: any) {
    //     this.isSaving = false;


    //     this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);



    //     this.loadData();
    // }


    // editItemAndCloseModel() {

    //     this.isSaving = true;

    //     if (this.sourceCustomer.customerId) {
    //         this.sourceCustomer.createdBy = this.userName;
    //         this.sourceCustomer.updatedBy = this.userName;
    //         this.sourceCustomer.masterCompanyId = 1;
    //         this.workFlowtService.updatesalesinfo(this.sourceCustomer, this.sourceCustomer.customerId).subscribe(data => {
    //             this.localCollection = data;
    //             this.workFlowtService.salesCollection = this.local;
    //             this.activeIndex = 5;
    //             this.workFlowtService.indexObj.next(this.activeIndex);
    //             this.savesuccessCompleted(this.sourceCustomer);


    //         })

    //     }
    //     else {

    //         this.sourceCustomer.updatedBy = this.userName;
    //         this.sourceCustomer.masterCompanyId = 1;
    //         //debugger;
    //         this.workFlowtService.updatesalesinfo(this.sourceCustomer, this.local.customerId).subscribe(data => {
    //             this.localCollection = data;
    //             this.saveCompleted(this.sourceCustomer);
    //             this.workFlowtService.salesCollection = this.local;

    //         })
    //         this.activeIndex = 5;
    //         this.workFlowtService.indexObj.next(this.activeIndex);



    //     }



    //     //this.modal.close();
    // }

    // deleteItemAndCloseModel() {
    //     this.isSaving = true;
    //     //this.sourceCustomer.updatedBy = this.userName;
    //     //this.workFlowtService.deleteAcion(this.sourceCustomer.masterCompanyId).subscribe(
    //     //    response => this.saveCompleted(this.sourceCustomer),
    //     //    error => this.saveFailedHelper(error));
    //     //this.modal.close();
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

    // private employeedata() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.employeeService.getEmployeeList().subscribe(
    //         results => this.onempDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );



    //     this.selectedColumns = this.cols;

    // }

    // private onempDataLoadSuccessful(getEmployeeCerficationList: any[]) {
    //     // alert('success');
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     //this.dataSource.data = getEmployeeCerficationList;
    //     this.allEmployeeinfo = getEmployeeCerficationList;
    // }

    // filterfirstName(event) {

    //     this.firstCollection = [];
    //     for (let i = 0; i < this.allEmployeeinfo.length; i++) {
    //         let firstName = this.allEmployeeinfo[i].firstName;
    //         if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //             this.firstCollection.push(firstName);
    //         }
    //     }
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
    // private onitemmasterSuccessful(allWorkFlows: any[]) {

    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allActions = allWorkFlows;
    // }
    // private loadItemmasterData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.itemser.getItemMasterList().subscribe(
    //         results => this.onitemmasterSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
    // }
    // partnmId(event) {
    //     //
    //     if (this.itemclaColl) {
    //         for (let i = 0; i < this.itemclaColl.length; i++) {
    //             if (event == this.itemclaColl[i][0].partName) {
    //                 this.sourceCustomer.partId = this.itemclaColl[i][0].partId;
    //                 this.disableSavepartNumber = true;
    //                 this.selectedActionName = event;
    //             }
    //         }
    //         this.itemser.getDescriptionbypart(event).subscribe(
    //             results => this.onpartnumberloadsuccessfull(results[0]),
    //             error => this.onDataLoadFailed(error)


    //         );
    //         this.disableSavepartDescription = true;
    //     }
    // }
    // eventHandler(event) {
    //     if (event.target.value != "") {
    //         let value = event.target.value.toLowerCase();
    //         if (this.selectedActionName) {
    //             if (value == this.selectedActionName.toLowerCase()) {
    //                 //alert("Action Name already Exists");
    //                 this.disableSavepartNumber = true;

    //             }
    //             else {
    //                 this.disableSavepartNumber = false;
    //                 this.sourceCustomer.partDescription = "";
    //                 this.disableSavepartDescription = false;
    //             }
    //         }

    //     }
    // }
    // private onpartnumberloadsuccessfull(allWorkFlows: any[]) {
    //     this.descriptionbyPart = allWorkFlows[0]
    //     this.sourceAction = this.descriptionbyPart;
    //     this.sourceCustomer.partDescription = allWorkFlows[0].partDescription;
    // }

    // private onDataLoadSuccessfulForCondition(getConditionList: Condition[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = getConditionList;
    //     this.allConditionInfo = getConditionList;
    // }
    // private loadDataForCondition() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.conditionService.getConditionList().subscribe(
    //         results => this.onDataLoadSuccessfulForCondition(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
    // }
    // private onCustomerDataLoadSuccessful(allCustomerFlows: any[]) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allCustomerFlows;
    //     this.allCustomer = allCustomerFlows;

    // }
    // private customerList() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.customerService.getWorkFlows().subscribe(
    //         results => this.onCustomerDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );
    // }
    // private onVendorDataLoadSuccessful(allVendorWorkFlows: any[]) {
    //     //debugger;
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allVendorWorkFlows;
    //     this.allVendorList = allVendorWorkFlows;
    // }
    // private vendorList() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.vendorservice.getVendorList().subscribe(
    //         results => this.onVendorDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

}