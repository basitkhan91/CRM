import { Component, OnInit, ViewChild } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { ChargeService } from '../../services/charge.service';
import {VendorService} from '../../services/vendor.service';
import {CurrencyService} from '../../services/currency.service';
import {IntegrationService} from '../../services/integration-service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { validateRecordExistsOrNot, editValueAssignByCondition, getObjectById, selectedValueValidate, getObjectByValue } from '../../generic/autocomplete';
import { Table } from 'primeng/table';
import { ConfigurationService } from '../../services/configuration.service';

import { Charge } from '../../models/charge.model';

import { AuditHistory } from '../../models/audithistory.model';
import { MasterCompany } from '../../models/mastercompany.model';
import { LegalEntityService } from '../../services/legalentity.service';



@Component({
    selector: 'app-charges',
    templateUrl: './charges.component.html',
    styleUrls: ['./charges.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class ChargesComponent implements OnInit {
    totalRecords: number = 0;
    totalPages: number = 0;
    pageSize: number = 10;
    chargeData: any[];
    isEdit: boolean = false;
    addNewCharge: Charge= new Charge();
    chargeHeaders = [
        { field: 'chargeName', header: 'Charge' },
        { field: 'code', header: 'Code' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'description', header: 'Standard' },
        { field: 'cost', header: 'Cost' },
        { field: 'markUp', header: 'Mark up %' },
        { field: 'purchaseOrderNumber', header: 'Purchase Order' },
        { field: 'vendorName', header: 'Purchase Order' },
        { field: 'currencyId', header: 'Currency (REPL)' },
        { field: 'generalLedgerId', header: 'GL Account (REPL)' },
        { field: 'integrationPortalDescription', header: 'Integration' },
        { field: 'memo', header: 'Memo' },
    ]
    selectedColumns = this.chargeHeaders;
    selectedRowforDelete: Charge;
    viewRowData: any;
    vendorList:any[];
    integrationList:any[];
    filteredVendorList:any[];
    filteredIntegrationList:any[];
    currencyList:any[];
    constructor(private breadCrumb: SingleScreenBreadcrumbService, private configurations: ConfigurationService,
        private authService: AuthService, private alertService: AlertService, public chargeService: ChargeService ,
        public vendorService:VendorService , public currencyService:CurrencyService, public integrationService:IntegrationService) {


    }
    ngOnInit(): void {
        this.getChargeList();
        this.loadVendorData();
        this.loadCurrencyData();
        this.loadIntegrationData();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-charges';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }

    getChargeList(): void {
        this.chargeService.getChargeList().subscribe(res => {
            const responseData = res[0];
             this.chargeData = responseData;//.columnData;
            this.totalRecords = 1; //responseData.totalRecords;
            this.totalPages = 1;//Math.ceil(this.totalRecords / this.pageSize);
        })
    }
    loadVendorData():void {
		this.alertService.startLoadingMessage();
		this.vendorService.getVendorsBasic().subscribe( res=>{
            this.vendorList=res[0];
            this.alertService.stopLoadingMessage();
        });
    }
    loadIntegrationData():void{
        this.integrationService.getIntegrationsBasic().subscribe( res=>{
            this.integrationList=res;
        });
    }
    loadCurrencyData():void{
        this.currencyService.getCurrencyList().subscribe(res=>{
            this.currencyList=res[0];
        })
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    resetChargeForm(): void {
        this.addNewCharge = new Charge();
    }
    changePage(event: { first: any; rows: number }) {
        console.log(event);
        const pageIndex = (event.first / event.rows);
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }
    changeStatus(rowData):void {
        console.log(rowData);
        const data = { ...rowData }
        this.chargeService.updateCharge(data).subscribe(() => {
            // this.getUOMList();
            this.alertService.showMessage(
                'Success',
                `Updated Status Successfully  `,
                MessageSeverity.success
            );
        })

    }

    delete(rowData):void {
        this.selectedRowforDelete = rowData;

    }

    deleteConfirmation(value):void {
        if (value === 'Yes') {
            this.chargeService.deleteCharge(this.selectedRowforDelete.chargeId).subscribe(() => {
                this.getChargeList();
                this.alertService.showMessage(
                    'Success',
                    `Deleted Charge Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }
    viewSelectedRow(rowData) {
        console.log(rowData);
        this.viewRowData = rowData;
    }
    saveCharge(){

    }
    selectedCharge(rowData):void {

    }
    checkChargeExists(rowData):void{

    }
    filterVendor(event) {
        this.filteredVendorList = this.vendorList;
        //const VENDORDATA =[...this.vendorList]
        const VENDORDATA = [...this.vendorList.filter(x => {
            return x.vendorName.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.filteredVendorList = VENDORDATA;
    }
    filterIntegration(event) {
        this.filteredIntegrationList = this.integrationList;
        const INTDATA = [...this.integrationList.filter(x => {
            return x.description.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.filteredIntegrationList = INTDATA;
    }
}





//export class ChargesComponent implements OnInit {
//    chargePaginationList: any[] = [];
//    totelPages: number;
//    charge = [];
//    itemQuantity = [];
//    updatedByInputFieldValue: any;
//    createdByInputFieldValue: any;
//    memoInputFieldValue: any;
//    symbolInputFieldValue: any;
//    billableAmountInputFieldValue: any;
//    markUpInputFieldValue: any;
//    costInputFieldValue: any;
//    chargeNameInputFieldValue: any;
//    chargeIdInputFieldValue: any;
//    matvhMode: any;
//    field: any;
//    event: any;
//    selectedActionName: any;
//    disableSave: boolean;
//    actionamecolle: any[]=[];
//    charge_Name: any = "";
//    description = "";
//    cost = "";
//    purchaseOrderId = "";
//    generalLedgerId = "";
//    vendorId = "";
//    integrationPortalId = "";
//    functionalCurrencyId = "";
//    currencyId = "";
//    markUp = "";
//    quantity = "";
//    memo: any = "";
//    createdBy: any = "";
//    updatedBy: any = "";
//    createdDate: any = "";
//    updatedDate: any = "";
//    allCurrencyinfo: any[];
//    allPOinfo: any[];
//    allVendorinfo: any[];
//	allIntegrationinfo: any[];
//	allManagemtninfo: any[];
//	gridData: TreeNode[];//Managemnt
//	cols1: any[];
//	copyOfAllManagemtninfo: any[] = [];
//    showManagement: boolean;
//    copyOfAllVendorInfo: any;
//	copyOfAllIntegrationInfo: any[] = [];
//    billableAmount: any;
//    ManagementStrucurureCode: any;
//    currencySymbol: any;
//    integrationPortalDescription: any;
//    isActive: any;
//    purchaseOrderNumber: any;
//    vendorName: any;
//    gridData1: TreeNode[];
//    AuditDetails: SingleScreenAuditDetails[];
//    ngOnInit(): void
//    {
//		this.loadData();
//		this.loadCurrencyData();
//		this.loadVendorData();
//		this.loadIntegrationData();
//		this.getPOData();
//		this.loadManagementdata();

//		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-charges';
//        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
//        this.itemQuantity = Array(100).fill(1).map((x, i) => i + 1);
//    }
//    @ViewChild(MatPaginator) paginator: MatPaginator;
//    @ViewChild(MatSort) sort: MatSort;

//    displayedColumns = ['chargeId', 'poId', 'memo', 'cost', 'description', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
//    dataSource: MatTableDataSource<Charge>;
//    allChargeinfo: Charge[] = [];
//    allComapnies: MasterCompany[] = [];
//    private isSaving: boolean;
//    public sourceAction: Charge;
//    public auditHisory: AuditHistory[] = [];
//    private bodyText: string;
//    loadingIndicator: boolean;
//    closeResult: string;
//    selectedColumn: Charge[];
//    selectedColumns: any[];
//    cols: any[];
//    title: string = "Create";
//    id: number;
//    errorMessage: any;
//    modal: NgbModalRef;
//    chargeName: string;
//    filteredBrands: any[];
//    localCollection: any[] = [];
//    /** Actions ctor */

//    private isEditMode: boolean = false;
//    private isDeleteMode: boolean = false;
//    Active: string = "Active";

//    pageSearch: { query: any; field: any; };
//    first: number;
//    rows: number;
//    paginatorState: any;
//    chargePagination: Charge[];//added
//    totalRecords: number;
//    loading: boolean;

//	constructor(public workFlowtService1: LegalEntityService,private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public chargeService: ChargeService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
//        this.displayedColumns.push('action');
//        this.dataSource = new MatTableDataSource();
//        this.sourceAction = new Charge();

//    }

//    ngAfterViewInit() {
//        this.dataSource.paginator = this.paginator;
//        this.dataSource.sort = this.sort;
//    }
//    public allWorkFlows: Charge[] = [];

//    private loadData() {
//        this.alertService.startLoadingMessage();
//        this.loadingIndicator = true;

//        this.chargeService.getChargeList().subscribe(
//            results => this.onDataLoadSuccessful(results[0]),
//            error => this.onDataLoadFailed(error)
//        );

//        this.cols = [
//            { field: 'chargeId', header: 'Charge Id' },
//			{ field: 'chargeName', header: 'Charge Name' },
//			{ field: 'cost', header: 'Cost' },
//			{ field: 'markUp', header: 'Mark Up' },
//			{ field: 'billableAmount', header: 'Billable Amount' },
//			{ field: 'symbol', header: 'Currency' },  
//			{ field: 'memo', header: 'Memo' },
//            //{ field: 'purchaseOrderId', header: 'PO' },
//            //{ field: 'generalLedgerId', header: 'GL' },
//            //{ field: 'vendorId', header: 'VN' },
//            //{ field: 'integrationPortalId', header: 'IGP' },
//            //{ field: 'functionalCurrencyId', header: 'FCI' },
                    
           
//            //{ field: 'quantity', header: 'Qty' },
//            //{ field: 'description', header: 'Description' },
            
            
//            //{ field: 'createdBy', header: 'Created By' },
//            //{ field: 'updatedBy', header: 'Updated By' },
//            //{ field: 'updatedDate', header: 'Updated Date' },
//            //{ field: 'createdDate', header: 'createdDate' }
//        ];

//        this.selectedColumns = this.cols;

//	}

//	private loadCurrencyData()
//	{
//		this.alertService.startLoadingMessage();
//		this.loadingIndicator = true;

//		this.chargeService.getCurrencyData().subscribe(
//			results => this.onDataLoadCurrencySuccessful(results[0]),
//			error => this.onDataLoadFailed(error)
//		);
//	}

//	private loadManagementdata() {
//		this.alertService.startLoadingMessage();
//		this.loadingIndicator = true;

//		this.workFlowtService1.getManagemententity().subscribe(
//			results => this.onManagemtntdataLoad(results[0]),
//			error => this.onDataLoadFailed(error)
//		);


//	}

//	private onManagemtntdataLoad(getAtaMainList: any[])
//	{
//		// alert('success');
//		this.alertService.stopLoadingMessage();
//		this.loadingIndicator = false;
//		this.dataSource.data = getAtaMainList;
//		this.allManagemtninfo = getAtaMainList;

//		if (this.allManagemtninfo)
//		{
//			for (let i = 0; i < this.allManagemtninfo.length; i++)
//			{
//				this.copyOfAllManagemtninfo.push(JSON.parse(JSON.stringify(this.allManagemtninfo[i])));
//			}
//		}

//		//if (this.sourceStockLineSetup.managementStructureEntityId && this.allManagemtninfo) {
//		//	this.getBUList(this.sourceStockLineSetup.managementStructureEntityId);
//		//}

		
//	}

//	getBUList(companyId)
//	{
		
//		//for Structure
//		if (this.allManagemtninfo)
//		{

//			this.gridData = this.makeNestedObj(this.allManagemtninfo, companyId);
			
//		}

//		//if (this.gridData.length == 0) {
//		//	this.allManagemtninfo = [];
//		//	this.workFlowtService1.getManagemententity().subscribe(
//		//		results => this.onManagemtntdataLoad(results[0]),
//		//		error => this.onDataLoadFailed(error)
//		//	);
//		//	this.gridData = this.makeNestedObj(this.allManagemtninfo, companyId);
//		//}

//		this.cols1 = [
//			{ field: 'code', header: 'Code' },
//			{ field: 'name', header: 'Name' },
//			{ field: 'description', header: 'Description' },
//			//{ field: 'legalEntityId', header: 'ID' },
//		];
//		this.showManagement = true;

//		//this.bulist = [];
//		//this.departmentList = [];
//		//this.divisionlist = [];
//		//for (let i = 0; i < this.allManagemtninfo.length; i++) {
//		//	if (this.allManagemtninfo[i].parentId == companyId) {
//		//		this.bulist.push(this.allManagemtninfo[i]);
//		//	}
//	}

//	makeNestedObj(arr, parent)
//	{
//		let out = []
//		for (var i in arr)
//		{
//			if (arr[i].parentId == parent) {
//				var children = this.makeNestedObj(arr, arr[i].managementStructureId)
//				arr[i] = { "data": arr[i] };
//				if (children.length) {
//					arr[i].children = children
//				}
//				out.push(arr[i])
//			}
//		}
//		this.showManagement = true;
//		return out

		
//	}

//	private onDataLoadCurrencySuccessful(getCurrencyList: any[]) {
//		// alert('success');
//		this.alertService.stopLoadingMessage();
//		this.loadingIndicator = false;
//		this.dataSource.data = getCurrencyList;
//		this.allCurrencyinfo = getCurrencyList;
//	}

//	private getPOData() {
//		this.alertService.startLoadingMessage();
//		this.loadingIndicator = true;

//		this.chargeService.getPOData().subscribe(
//			results => this.onDataLoadPOSuccessful(results[0]),
//			error => this.onDataLoadFailed(error)
//		);
//	}

//	private onDataLoadPOSuccessful(getPOList: any[]) {
//		// alert('success');
//		this.alertService.stopLoadingMessage();
//		this.loadingIndicator = false;
//		this.dataSource.data = getPOList;
//		this.allPOinfo = getPOList;
//	}

//	private loadVendorData() {
//		this.alertService.startLoadingMessage();
//		this.loadingIndicator = true;

//		this.chargeService.getVendorData().subscribe(
//			results => this.onDataLoadVendorSuccessful(results[0]),
//			error => this.onDataLoadFailed(error)
//		);
//	}

//	private onDataLoadVendorSuccessful(getVendorList: any[]) {
//		// alert('success');
//		this.alertService.stopLoadingMessage();
//		this.loadingIndicator = false;
//		this.dataSource.data = getVendorList;
//		this.allVendorinfo = getVendorList;

		
//	}

//	private loadIntegrationData() {
//		this.alertService.startLoadingMessage();
//		this.loadingIndicator = true;

//		this.chargeService.getIntegrationData().subscribe(
//			results => this.onDataLoadIntegrationSuccessful(results[0]),
//			error => this.onDataLoadFailed(error)
//		);
//	}

//	private onDataLoadIntegrationSuccessful(getIntegarionList: any[]) {
//		// alert('success');
//		this.alertService.stopLoadingMessage();
//		this.loadingIndicator = false;
//		this.dataSource.data = getIntegarionList;
//		this.allIntegrationinfo = getIntegarionList;

//		if (this.allIntegrationinfo) {
//			for (let i = 0; i < this.allIntegrationinfo.length; i++) {
//				this.copyOfAllIntegrationInfo.push(JSON.parse(JSON.stringify(this.allIntegrationinfo[i])));
//			}
//		}
//	}

//    private loadMasterCompanies() {
//        this.alertService.startLoadingMessage();
//        this.loadingIndicator = true;

//        this.masterComapnyService.getMasterCompanies().subscribe(
//            results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
//            error => this.onDataLoadFailed(error)
//        );

//    }

//    public applyFilter(filterValue: string) {
//        this.dataSource.filter = filterValue;
//    }

//    private refresh() {
//        // Causes the filter to refresh there by updating with recently added data.
//        this.applyFilter(this.dataSource.filter);
//    }
//    private onDataLoadSuccessful(getChargeList: Charge[]) {
//        // alert('success');
//        this.loadingIndicator = false;
//        this.dataSource.data = getChargeList;
//        this.totalRecords = getChargeList.length;
//        this.allChargeinfo = getChargeList;      
//        this.alertService.stopLoadingMessage();
//    }

//    private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {

//        // debugger;
//        this.alertService.stopLoadingMessage();
//        this.loadingIndicator = false;

//        this.auditHisory = auditHistory;


//        this.modal = this.modalService.open(content, { size: 'sm' });

//        this.modal.result.then(() => {
//            console.log('When user closes');
//        }, () => { console.log('Backdrop click') })


//    }

//    private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
//        // alert('success');
//        this.alertService.stopLoadingMessage();
//        this.loadingIndicator = false;
//        this.allComapnies = allComapnies;

//    }

//    private onDataLoadFailed(error: any) {
//        // alert(error);
//        this.alertService.stopLoadingMessage();
//        this.loadingIndicator = false;

//    }
//    handleChange(rowData, e) {
//        if (e.checked == false) {
//            this.sourceAction = rowData;
//            this.sourceAction.updatedBy = this.userName;
//            this.Active = "In Active";
//            this.sourceAction.isActive == false;
//            this.chargeService.updateCharge(this.sourceAction).subscribe(
//                response => this.saveCompleted(this.sourceAction),
//                error => this.saveFailedHelper(error));
//            //alert(e);
//        }
//        else {
//            this.sourceAction = rowData;
//            this.sourceAction.updatedBy = this.userName;
//            this.Active = "Active";
//            this.sourceAction.isActive == true;
//            this.chargeService.updateCharge(this.sourceAction).subscribe(
//                response => this.saveCompleted(this.sourceAction),
//                error => this.saveFailedHelper(error));
//            //alert(e);
//        }

//    }

//    open(content) {

//        this.isEditMode = false;
//		this.isDeleteMode = false;
//		this.disableSave = false;
//		this.isSaving = true;
//		this.showManagement = false;
		
//        this.loadMasterCompanies();
//        this.sourceAction = new Charge();
//        this.sourceAction.isActive = true;
//		this.chargeName = "";

		

//        this.modal = this.modalService.open(content, { size: 'sm' });
//        this.modal.result.then(() => {



//            console.log('When user closes');
//        }, () => { console.log('Backdrop click') })
//    }


//    openDelete(content, row) {

//        this.isEditMode = false;
//        this.isDeleteMode = true;
//        this.sourceAction = row;
//        this.modal = this.modalService.open(content, { size: 'sm' });
//        this.modal.result.then(() => {
//            console.log('When user closes');
//        }, () => { console.log('Backdrop click') })
//    }

//    openEdit(content, row) {

//		this.isEditMode = true;
//		this.disableSave = false;
//		this.isSaving = true;
//		this.showManagement = true;
//		this.gridData = [];
//		this.quantity = row.quantity;
//		this.billableAmount = row.billableAmount;
//		this.chargeName = row.chargeName;
//		this.ManagementStrucurureCode = row.code;
//		this.description = row.description;
//		this.markUp = row.markUp;
//		this.memo = row.memo;
//		this.currencySymbol = row.symbol;
//		this.cost = row.cost;
//		this.integrationPortalDescription = row.integrationPortalDescription;
//		this.isActive = row.isActive;
//		this.purchaseOrderNumber = row.purchaseOrderNumber;
//		this.vendorName = row.vendorName;
//		this.sourceAction.ManagementStructureId = row.managementStructureId;

//		if (row.managementStructureId)
//		{
//			this.gridData = [];
//			this.gridData = this.makeNestedObj(this.allManagemtninfo, row.managementStructureId);
//			//if (this.gridData.length == 0)
//			//{
//			//	this.allManagemtninfo = [];
//			//	this.loadManagementdata();
				
//			//}

//			//if (this.gridData.length == 0 && this.allManagemtninfo.length > 0)
//			//{
//			//	this.gridData = this.makeNestedObj(this.allManagemtninfo, row.managementStructureId);
//			//}
			

//			this.cols1 = [
//				{ field: 'code', header: 'Code' },
//				{ field: 'name', header: 'Name' },
//				{ field: 'description', header: 'Description' },
//				//{ field: 'legalEntityId', header: 'ID' },
//			];
			
//		}
//        this.loadMasterCompanies();
//        this.sourceAction = row;
//        this.chargeName = this.sourceAction.chargeName;
//		this.loadMasterCompanies();
		
//        this.modal = this.modalService.open(content, { size: 'sm' });
//        this.modal.result.then(() => {
//            console.log('When user closes');
//        }, () => { console.log('Backdrop click') })
//    }
//    openView(content, row) {

//        this.sourceAction = row;
//        this.charge_Name = row.chargeName;
//		this.cost = row.cost;
//		this.quantity = row.quantity;
//		this.billableAmount = row.billableAmount;
//		this.chargeName = row.chargeName;
//		this.ManagementStrucurureCode = row.code;
//		this.description = row.description;
//		this.markUp = row.markUp;
//		this.memo = row.memo;
//		this.currencySymbol = row.symbol;
//		this.cost = row.cost;
//		this.integrationPortalDescription = row.integrationPortalDescription;
//		this.isActive = row.isActive;
//		this.purchaseOrderNumber = row.purchaseOrderNumber;
//		this.vendorName = row.vendorName;
//        this.description = row.description;
       
//        this.memo = row.memo;
//        this.createdBy = row.createdBy;
//        this.updatedBy = row.updatedBy;
//        this.createdDate = row.createdDate;
//        this.updatedDate = row.updatedDate;
//		this.loadMasterCompanies();
//		this.modal = this.modalService.open(content, { size: 'sm' });
//        this.modal.result.then(() => {
//            console.log('When user closes');
//        }, () => { console.log('Backdrop click') })
//    }
//    openHelpText(content) {
//        this.modal = this.modalService.open(content, { size: 'sm' });
//        this.modal.result.then(() => {
//            console.log('When user closes');
//        }, () => { console.log('Backdrop click') })
//    }



//    openHist(content, row) {
//        this.alertService.startLoadingMessage();
//        this.loadingIndicator = true;


//        this.sourceAction = row;



//        //this.isSaving = true;
//        // debugger;
//        this.chargeService.historyCharge(this.sourceAction.chargeId).subscribe(
//            results => this.onHistoryLoadSuccessful(results[0], content),
//            error => this.saveFailedHelper(error));


//    }


//    editItemAndCloseModel() {

//        // debugger;

//        this.isSaving = true;

//        if (this.isEditMode == false) {
//            this.sourceAction.createdBy = this.userName;
//            this.sourceAction.updatedBy = this.userName;
//            this.sourceAction.masterCompanyId = 1;
//            this.sourceAction.chargeName = this.chargeName;
//            this.chargeService.newCharge(this.sourceAction).subscribe(
//                role => this.saveSuccessHelper(role),
//                error => this.saveFailedHelper(error));
//        }
//        else {

//            this.sourceAction.updatedBy = this.userName;
//            this.sourceAction.chargeName = this.chargeName;
//            this.sourceAction.masterCompanyId = 1;
//            this.chargeService.updateCharge(this.sourceAction).subscribe(
//                response => this.saveCompleted(this.sourceAction),
//                error => this.saveFailedHelper(error));
//        }

//        this.modal.close();
//	}

//	makeNestedObj1(child, arr, parent) {

//		var out = []
//		if (child) {
//			for (var i = 0; i < child.length; i++) {
//				for (var j = 0; j < arr.length; j++) {
//					if (arr[j].data) {
//						if (child[i].managementStructureId == arr[j].data.managementStructureId) {
//							arr[j].data.managementWarehouseId = child[i].managementWarehouseId;
//							arr[j].data.warehouseId = child[i].warehouseId;
//							out.push(arr[j]);
//							console.log(arr[j].data);
//							break;
//						}
//					}
//					else if (child[i].managementStructureId == arr[j].managementStructureId) {
//						arr[j].data.managementWarehouseId = child[i].managementWarehouseId;
//						arr[j].data.warehouseId = child[i].warehouseId;
//						out.push(arr[j]);
//						console.log(arr[j].data);
//						break;
//					}

//				}
//			}
//		}
//		return out;
//	}

//    deleteItemAndCloseModel() {
//        this.isSaving = true;
//        this.sourceAction.updatedBy = this.userName;
//        this.chargeService.deleteCharge(this.sourceAction.chargeId).subscribe(
//            response => this.saveCompleted(this.sourceAction),
//            error => this.saveFailedHelper(error));
//        this.modal.close();
//    }
//    eventHandler(event) {
//        let value = event.target.value.toLowerCase();
//        if (this.selectedActionName) {
//            if (value == this.selectedActionName.toLowerCase()) {
//                //alert("Action Name already Exists");
//                this.disableSave = true;
//            }
//            else {
//                this.disableSave = false;
//            }
//        }

//    }
//    partnmId(event) {
//        //debugger;
//		for (let i = 0; i < this.allChargeinfo.length; i++) {
//			if (event == this.allChargeinfo[i].chargeName) {
//                //alert("Action Name already Exists");
//                this.disableSave = true;
//                this.selectedActionName = event;
//            }
//        }
//    }
//    filterCharges(event) {

//        this.localCollection = [];
//        for (let i = 0; i < this.allChargeinfo.length; i++) {
//            let chargeName = this.allChargeinfo[i].chargeName;
//            if (chargeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
//                this.actionamecolle.push([{
//                    "chargeId": this.allChargeinfo[i].chargeId,
//                    "chargeName": chargeName
//                }]),
                  
//                this.localCollection.push(chargeName);
//            }
//        }
//    }

//    dismissModel() {
//        this.isDeleteMode = false;
//		this.isEditMode = false;
//		//the Below Lines for Managemnet Structure is going into Structure Formate so we cant access second time
//		//so we need to call Managemnet Structure List again
//		//test
//		this.allManagemtninfo = [];
//		this.copyOfAllManagemtninfo = [];
//		this.loadManagementdata();
//		//test End
//        this.modal.close();
//    }

//    private saveCompleted(user?: Charge) {
//        this.isSaving = false;

//        if (this.isDeleteMode == true) {
//            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
//            this.isDeleteMode = false;
//        }
//        else {
//            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

//        }

//        this.updatePaginatorState();
//    }

//    private saveSuccessHelper(role?: Charge) {
//        this.isSaving = false;
//        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

//        this.updatePaginatorState();

//    }

//    get userName(): string {
//        return this.authService.currentUser ? this.authService.currentUser.userName : "";
//    }

//    private saveFailedHelper(error: any) {
//        this.isSaving = false;
//        this.alertService.stopLoadingMessage();
//        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
//        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
//    }

//    private getDismissReason(reason: any): string {
//        if (reason === ModalDismissReasons.ESC) {
//            return 'by pressing ESC';
//        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//            return 'by clicking on a backdrop';
//        } else {
//            return `with: ${reason}`;
//        }
//    }

//    showAuditPopup(template, id): void {
//        this.auditCharge(id);
//        this.modal = this.modalService.open(template, { size: 'sm' });
//    }

//    auditCharge(chargeId: number): void
//    {
//        this.AuditDetails = [];
//        this.chargeService.getChargeAudit(chargeId).subscribe(audits => {
//            if (audits.length > 0) {
//                this.AuditDetails = audits;
//                this.AuditDetails[0].ColumnsToAvoid = ["chargeAuditId", "chargeId", "masterCompanyId", "managementStructureId", "createdBy", "createdDate", "updatedDate"];
//            }
//        });
//    }

//    updatePaginatorState() //need to pass this Object after update or Delete to get Server Side pagination
//    {
//        this.paginatorState = {
//            rows: this.rows,
//            first: this.first
//        }
//        if (this.paginatorState) {
//            this.loadCharge(this.paginatorState);
//        }
//    }

//    loadCharge(event: LazyLoadEvent) //when page initilizes it will call this method
//    {
//        this.loading = true;
//        this.rows = event.rows;
//        this.first = event.first;
//        if (this.field)
//        {
//            this.charge.push({
//                ChargeId: this.chargeIdInputFieldValue,
//                ChargeName: this.chargeNameInputFieldValue,
//                Cost: this.costInputFieldValue,
//                MarkUp: this.markUpInputFieldValue,
//                BillableAmount: this.billableAmountInputFieldValue,
//                Symbol: this.symbolInputFieldValue,
//                Memo: this.memoInputFieldValue,
//                CreatedBy: this.createdByInputFieldValue,
//                UpdatedBy: this.updatedByInputFieldValue,
//                first: this.first,
//                page: 10,
//                pageCount: 10,
//                rows: this.rows,
//                limit: 5
//            })
//            if (this.charge) {
//                this.chargeService.getServerPages(this.charge[this.charge.length - 1]).subscribe( //we are sending event details to service
//                    pages => {
//                        this.chargePaginationList = pages;
//                        this.chargePagination = this.chargePaginationList[0].chargeList;
//                        this.totalRecords = this.chargePaginationList[0].totalRecordsCount;
//                        this.totelPages = Math.ceil(this.totalRecords / this.rows);
//                    });
//            }
//            else {
//            }
//        }
//        else {
//            setTimeout(() => {
//                if (this.allChargeinfo) {
//                    this.chargeService.getServerPages(event).subscribe( //we are sending event details to service
//                        pages => {
//                            this.chargePaginationList = pages;
//                            this.chargePagination = this.chargePaginationList[0].chargeList;
//                            this.totalRecords = this.chargePaginationList[0].totalRecordsCount;
//                            this.totelPages = Math.ceil(this.totalRecords / this.rows);
//                        });
//                    this.loading = false;
//                }
//            }, 1000);
//        }
//    }

//    inputFiledFilter(event, filed, matchMode) {
//        this.first = 0;
//        this.event = event;
//        this.field = filed;
//        this.matvhMode = matchMode;

//        if (filed == 'chargeId') {
//            this.chargeIdInputFieldValue = event;
//        }
//        if (filed == 'chargeName') {
//            this.chargeNameInputFieldValue = event;
//        }
//        if (filed == 'cost') {
//            this.costInputFieldValue = event;
//        }
//        if (filed == 'markUp') {
//            this.markUpInputFieldValue = event;
//        }
//        if (filed == 'billableAmount') {
//            this.billableAmountInputFieldValue = event;
//        }
//        if (filed == 'symbol') {
//            this.symbolInputFieldValue = event;
//        }
//        if (filed == 'memo') {
//            this.memoInputFieldValue = event;
//        }
//        if (filed == 'createdBy') {
//            this.createdByInputFieldValue = event;
//        }
//        if (filed == 'updatedBy') {
//            this.updatedByInputFieldValue = event;
//        }
//        this.charge.push({
//            ChargeId: this.chargeIdInputFieldValue,
//            ChargeName: this.chargeNameInputFieldValue,
//            Cost: this.costInputFieldValue,
//            MarkUp: this.markUpInputFieldValue,
//            BillableAmount: this.billableAmountInputFieldValue,
//            Symbol: this.symbolInputFieldValue,
//            Memo: this.memoInputFieldValue,
//            CreatedBy: this.createdByInputFieldValue,
//            UpdatedBy: this.updatedByInputFieldValue,
//            first: this.first,
//            page: 10,
//            pageCount: 10,
//            rows: this.rows,
//            limit: 5
//        })
//        if (this.charge) {
//            this.chargeService.getServerPages(this.charge[this.charge.length - 1]).subscribe( //we are sending event details to service
//                pages => {
//                    this.chargePaginationList = pages;
//                    this.chargePagination = this.chargePaginationList[0].chargeList;
//                    this.totalRecords = this.chargePaginationList[0].totalRecordsCount;
//                    this.totelPages = Math.ceil(this.totalRecords / this.rows);
//                });
//        }
//        else {
//        }
//    }
//}