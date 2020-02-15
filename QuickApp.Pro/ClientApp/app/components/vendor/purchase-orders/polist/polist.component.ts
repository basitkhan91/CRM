import { Component, OnInit, AfterViewInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuditHistory } from '../../../../models/audithistory.model';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MasterCompany } from '../../../../models/mastercompany.model';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/auth.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { VendorService } from '../../../../services/vendor.service';
import { fadeInOut } from '../../../../services/animations';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { PurchaseOrderService } from '../../../../services/purchase-order.service';
import { VendorCapabilitiesService } from '../../../../services/vendorcapabilities.service';
import { CommonService } from '../../../../services/common.service';
import * as $ from 'jquery';

@Component({
	selector: 'app-polist',
	templateUrl: './polist.component.html',
	styleUrls: ['./polist.component.scss'],
    animations: [fadeInOut],
    providers: [DatePipe]
})

export class PolistComponent implements OnInit {

    totalRecords: number = 0;
    totalPages: number = 0;
    headers = [
		{ field: 'purchaseOrderNumber', header: 'PO Num' },
        { field: 'openDate', header: 'Open Date' },
        { field: 'closedDate', header: 'Closed/Cancelled Date' },
        { field: 'vendorName', header: 'Vendor Name' },
        { field: 'vendorCode', header: 'Vendor Code' },
        { field: 'status', header: 'Status' },
        { field: 'requestedBy', header: 'Requested By' },
        { field: 'approvedBy', header: 'Approved By' },
    ]
    selectedColumns = this.headers;
    data: any;
    pageSize: number = 10;
    pageIndex: number = 0;
    @ViewChild('dt')
    private table: Table;
    lazyLoadEventData: any;
    lazyLoadEventDataInput: any;
    auditHistory: AuditHistory[];
    rowDataToDelete: any = {};
    poHeaderAdd: any = {};
    poPartsList: any = [];
    approveList: any = [];
    vendorCapesInfo: any = [];
    vendorCapesCols: any[];
    headerManagementStructure: any = {};
    purchaseOrderNoInput: any;
    openDateInput: any;
    closedDateInput: any;
    vendorNameInput: any;
    vendorCodeInput: any;
    statusIdInput: any;
    requestedByInput: any;
    approvedByInput: any;
    // isPOList: boolean;
    @Input() isEnablePOList: boolean;
    @Input() vendorId: number;
    currentStatusPO: string = 'open';
    modal: NgbModalRef;
    filterText: any = '';
    //currentdate: any = new Date(); //this.datePipe.transform(new Date(), "MM/dd/yyyy");
    //todayDate: any = this.datePipe.transform(new Date(), "yyyy-MM-dd");

    constructor(private _route: Router,
        private authService: AuthService,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private _fb: FormBuilder,
        private alertService: AlertService,
        public vendorService: VendorService,
        private dialog: MatDialog,
        private masterComapnyService: MasterComapnyService,
        private purchaseOrderService: PurchaseOrderService,
        private vendorCapesService: VendorCapabilitiesService,
        private commonService: CommonService,
        private datePipe: DatePipe) {
        // this.displayedColumns.push('Customer');
        // this.dataSource = new MatTableDataSource();
        // this.activeIndex = 0;
        // this.workFlowtService.listCollection = null;
        //this.sourceCustomer = new Customer();

    }
    ngOnInit() {
        // this.getList();        
        this.vendorCapesCols = [
			//{ field: 'vcId', header: 'VCID' },
			{ field: 'ranking', header: 'Ranking' },
			{ field: 'partNumber', header: 'PN' },
			{ field: 'partDescription', header: 'PN Description' },
			{ field: 'capabilityType', header: 'Capability Type' },
			{ field: 'cost', header: 'Cost' },
			{ field: 'tat', header: 'TAT' },
			{ field: 'name', header: 'PN Mfg' },
        ];

    }

    getPOListByStatus(status) {
        const pageIndex = parseInt(this.lazyLoadEventDataInput.first) / this.lazyLoadEventDataInput.rows;;
        this.pageIndex = pageIndex;
        this.pageSize = this.lazyLoadEventDataInput.rows;
        this.lazyLoadEventDataInput.first = pageIndex;
        if(status == 'open') {            
            this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, status: 'open' };            
        } 
        else if(status == 'closed') {
            this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, status: 'closed' };
        }
        else if(status == 'pending') {
            this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, status: 'pending' };
        }
        else if(status == 'fulfilling') {
            this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, status: 'fulfilling' };
        }
        else if(status == 'canceled') {
            this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, status: 'canceled' };
        }
        this.getList(this.lazyLoadEventDataInput);
    }

    getList(data) {
        console.log("purchase order data list", data)
        this.vendorService.getPOList(data).subscribe(res => {
			console.log(res);			
             this.data = res[0];
            if (this.data.length > 0) {
                this.totalRecords = res[0][0].totalRecords;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }else {
                this.data=[];
                this.totalRecords=0;
                this.totalPages=0;
            } 

        })
    } 

    getManagementStructureCodes(id) {
        this.commonService.getManagementStructureCodes(id).subscribe(res => {
			if (res.Level1) {
				this.headerManagementStructure.level1 = res.Level1;
            }
            if (res.Level2) {
				this.headerManagementStructure.level2 = res.Level2;
            }
            if (res.Level3) {
				this.headerManagementStructure.level3 = res.Level3;
            }
            if (res.Level4) {
				this.headerManagementStructure.level4 = res.Level4;
			}
		})
    }
    
    getManagementStructureCodesParent(partList) {
        this.commonService.getManagementStructureCodes(partList.managementStructureId).subscribe(res => {
			if (res.Level1) {
				partList.level1 = res.Level1;
            }
            if (res.Level2) {
				partList.level2 = res.Level2;
            }
            if (res.Level3) {
				partList.level3 = res.Level3;
            }
            if (res.Level4) {
				partList.level4 = res.Level4;
			}
		})
    }

    getManagementStructureCodesChild(partChild) {
        this.commonService.getManagementStructureCodes(partChild.managementStructureId).subscribe(res => {
			if (res.Level1) {
				partChild.level1 = res.Level1;
            }
            if (res.Level2) {
				partChild.level2 = res.Level2;
            }
            if (res.Level3) {
				partChild.level3 = res.Level3;
            }
            if (res.Level4) {
				partChild.level4 = res.Level4;
			}
		})
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        this.table.reset();
        // this.getList();
        // this.table.sortOrder = 0;
        // this.table.sortField = '';


    }
    loadData(event) {
        //this.lazyLoadEventData = null;
        this.lazyLoadEventData = event;
        const pageIndex = parseInt(event.first) / event.rows;;
        this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        event.first = pageIndex;
        this.lazyLoadEventDataInput = event;
        this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, status: 'open' } //openDate: this.todayDate
        if(this.isEnablePOList) {
            this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, vendorId: this.vendorId }
        }
        console.log(this.filterText);
        if(this.filterText == '') {
            this.getList(this.lazyLoadEventDataInput);
        } else {
            this.globalSearch(this.filterText);
        }        
        console.log(event);
    }

    onChangeInputField(value, field, el) {
        console.log(value, field);
        if (value === '') { el.classList.add("hidePlaceHolder"); }
        else el.classList.remove("hidePlaceHolder");
        // if(field == "purchaseOrderId") {
        //     this.purchaseOrderIdInput = value;
        // }
        if(field == "purchaseOrderNumber") {
            this.purchaseOrderNoInput = value;
        }
        if(field == "openDate") {
            this.openDateInput = value;
        }
        if(field == "closedDate") {
            this.closedDateInput = value;
        }
        if(field == "vendorName") {
            this.vendorNameInput = value;
        }
        if(field == "vendorCode") {
            this.vendorCodeInput = value;
        }
        if(field == "status") {
            this.statusIdInput = value;
        }
        if(field == "requestedBy") {
            this.requestedByInput = value;
        }
        if(field == "approvedBy") {
            this.approvedByInput = value;
        }

        this.lazyLoadEventDataInput.filters = {
            purchaseOrderNo: this.purchaseOrderNoInput,
            openDate: this.openDateInput,
            closedDate: this.closedDateInput,
            vendorName: this.vendorNameInput,
            vendorCode: this.vendorCodeInput,
            status: this.statusIdInput ? this.statusIdInput : this.currentStatusPO,
            requestedBy: this.requestedByInput,
            approvedBy: this.approvedByInput,
            vendorId: this.vendorId ? this.vendorId : null
        }
        console.log(this.lazyLoadEventDataInput);        
        //this.loadData(event);
        this.getList(this.lazyLoadEventDataInput);
    }

    changeStatus(rowData) {
        console.log(rowData);
        
        this.purchaseOrderService.getPOStatus(rowData.purchaseOrderId, rowData.isActive, this.userName).subscribe(res => {
            this.alertService.showMessage("Success", `Successfully Updated Status`, MessageSeverity.success);
        })

    }
    edit(rowData) {
		console.log(rowData);		
        const { purchaseOrderId } = rowData;
        this._route.navigateByUrl(`vendorsmodule/vendorpages/app-purchase-setup/edit/${purchaseOrderId}`);
    }
    delete(rowData) {
        this.rowDataToDelete = rowData;
    }
    deletePO() {
        const { purchaseOrderId } = this.rowDataToDelete;
        this.purchaseOrderService.deletePO(purchaseOrderId, this.userName).subscribe(res => {
            this.getList(this.lazyLoadEventData);
            this.alertService.showMessage("Success", `Successfully Deleted Record`, MessageSeverity.success);

        })
    }

    viewSelectedRow(rowData) { 
        console.log(rowData);
        this.getPOViewById(rowData.purchaseOrderId);
        this.getPOPartsViewById(rowData.purchaseOrderId);
        this.getApproversListById(rowData.purchaseOrderId);
    }

    viewSelectedRowdbl(rowData) {
        this.viewSelectedRow(rowData);
        $('#poView').modal('show');
    }

    getPOViewById(poId) {
        this.purchaseOrderService.getPOViewById(poId).subscribe(res => {
            console.log(res);  
            this.poHeaderAdd = res;
            this.getVendorCapesByID(this.poHeaderAdd.vendorId);
            this.getManagementStructureCodes(res.managementStructureId);
        });
    }
    getPOPartsViewById(poId) {
        this.poPartsList = [];
        this.purchaseOrderService.getPOPartsViewById(poId).subscribe(res => {
            console.log(res);  
            res.map(x => {
                const partList = {
                    ...x,
                    purchaseOrderSplitParts: this.getPurchaseOrderSplit(x)              
                }
                this.getManagementStructureCodesParent(partList);
                this.poPartsList.push(partList);
            });
        });
    }

    getPurchaseOrderSplit(partList) {
        if(partList.purchaseOrderSplitParts) {
			return partList.purchaseOrderSplitParts.map(y => {
				const splitpart = {
					...y,					
				}
				this.getManagementStructureCodesChild(splitpart);
				return splitpart;
			})
		}
    }

    getApproversListById(poId) {
		this.purchaseOrderService.getPOApproverList(poId).subscribe(response => {
			console.log(response);			
			this.approveList = response;
        });
    }

    getVendorCapesByID(vendorId) {
		this.vendorCapesService.getVendorCapesById(vendorId).subscribe(res => {
			this.vendorCapesInfo = res;
		})
	}


    // changePage(event: { first: any; rows: number }) {
    //     console.log(event);
    //     this.pageIndex = (event.first / event.rows);
    //     // this.pageIndex = pageIndex;
    //     this.pageSize = event.rows;
    //     this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    // }
    globalSearch(value) {
        this.pageIndex = 0;
        this.filterText = value;
        this.vendorId = this.vendorId ? this.vendorId : 0;
        this.purchaseOrderService.purchaseOrderGlobalSearch(value, this.pageIndex, this.pageSize, this.vendorId).subscribe(res => {
            this.pageIndex = 0;
            this.data = res;
            if (this.data.length > 0) {
                this.totalRecords = res[0].totalRecords;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }
        })
        //this.pageIndex = 0;
        // this.customerService.getGlobalSearch(value, this.pageIndex, this.pageSize).subscribe(res => {
        //     this.data = res;
        //     if (res.length > 0) {
        //         this.totalRecords = res[0].totalRecords;
        //         this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        //     }
        // })
    }
    getAuditHistoryById(rowData) {
        this.purchaseOrderService.getPOHistory(rowData.purchaseOrderId).subscribe(res => {
            console.log(res);            
            this.auditHistory = res;
        })
    }
    getColorCodeForHistory(i, field, value) {
        const data = this.auditHistory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }

    closeViewModal() {
        $("#poView").modal("hide");
    }

    closeHistoryModal() {
        $("#poHistory").modal("hide");
    }

    closeDeleteModal() {
        $("#poDelete").modal("hide");
    }    

}


// import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
// import { AuditHistory } from '../../../../models/audithistory.model';
// import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
// import { FormGroup, FormBuilder } from '@angular/forms';
// import { MasterCompany } from '../../../../models/mastercompany.model';
// import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { AuthService } from '../../../../services/auth.service';
// import { AlertService, MessageSeverity } from '../../../../services/alert.service';
// import { MasterComapnyService } from '../../../../services/mastercompany.service';
// import { VendorService } from '../../../../services/vendor.service';
// import { fadeInOut } from '../../../../services/animations';
// import { Router } from '@angular/router';



// @Component({
// 	selector: 'app-polist',
// 	templateUrl: './polist.component.html',
// 	styleUrls: ['./polist.component.scss'],
// 	 animations: [fadeInOut]
// })
// /** Polist component*/
// export class PolistComponent implements OnInit, AfterViewInit {
// 	purchaseOrderNumber: any = "";
// 	requestedBy: any = "";
// 	dateApprovied: any = "";
// 	approver: any = "";
// 	createdBy: any = "";
// 	updatedBy: any = "";
// 	createdDate: any = "";
// 	updatedDate: any = "";
// 	selectedActionName: any;
// 	disableSave: boolean;
// 	actionamecolle: any[] = [];


// 	auditHisory: AuditHistory[];
// 	Active: string = "Active";
// 	/** Currency ctor */

// 	@ViewChild(MatPaginator) paginator: MatPaginator;
// 	@ViewChild(MatSort) sort: MatSort;

// 	displayedColumns = ['currencyId', 'code', 'symbol', 'displayName', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
// 	dataSource: MatTableDataSource<any>;
// 	allCurrencyInfo: any[] = [];
// 	sourceAction: any = {};

// 	loadingIndicator: boolean;

// 	actionForm: FormGroup;
// 	title: string = "Create";
// 	id: number;
	
// 	cols: any[];
// 	selectedColumns: any[];
// 	private isEditMode: boolean = false;
// 	private isDeleteMode: boolean = false;
// 	allComapnies: MasterCompany[];
// 	private isSaving: boolean;
// 	modal: NgbModalRef;
// 	selectedColumn: any[];
// 	currencyName: string;
// 	filteredBrands: any[];
// 	localCollection: any[] = [];
// 	allPolistInfo: any[] = [];
// 	allPurchaseorderInfo: any[] = [];
// 	/** Currency ctor */
// 	constructor(private authService: AuthService, private _fb: FormBuilder, public _router: Router, private alertService: AlertService, private masterComapnyService: MasterComapnyService, private modalService: NgbModal, public vendorservice: VendorService, private dialog: MatDialog) {
// 		this.displayedColumns.push('action');
// 		this.dataSource = new MatTableDataSource();
// 		this.vendorservice.ShowPtab = false;
// 		this.vendorservice.alertObj.next(this.vendorservice.ShowPtab);
// 		this.vendorservice.currentUrl = '/vendorsmodule/vendorpages/app-polist';
// 		this.vendorservice.bredcrumbObj.next(this.vendorservice.currentUrl);
// 	}
// 	ngOnInit(): void {
// 		//this.purchaseorderlist();
// 		this.loadData();
// 		this.cols = [
// 			//{ field: 'statusId', header: 'Status' },
// 			{ field: 'purchaseOrderNumber', header: 'PO Number' },
// 			{ field: 'requestedBy', header: 'Requested By' },
// 			{ field: 'dateRequested', header: 'Open Date' },
// 			{ field: 'requestedBy', header: 'Requested By' },
// 			{ field: 'dateApprovied', header: ' Date Approvied ' },
// 			{ field: 'approver', header: ' Approvied By' },
// 			{ field: 'createdBy', header: 'Created By' },
// 			{ field: 'updatedBy', header: 'Updated By' }
// 		];
// 		//this.breadCrumb.currentUrl = '/singlepages/singlepages/app-currency';
// 		//this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
// 		this.selectedColumns = this.cols;
		
// 	}
// 	ngAfterViewInit() {
// 		this.dataSource.paginator = this.paginator;
// 		this.dataSource.sort = this.sort;
// 	}

// 	private loadData() {
// 		// debugger;
// 		this.alertService.startLoadingMessage();
// 		this.loadingIndicator = true;

// 		this.vendorservice.getPurchaseOrderlist().subscribe(
// 			results => this.onDataLoadSuccessful(results[0]),
// 			error => this.onDataLoadFailed(error)
// 		);

// 	}
// 	public applyFilter(filterValue: string) {
// 		this.dataSource.filter = filterValue;
// 	}

// 	private refresh() {
// 		// Causes the filter to refresh there by updating with recently added data.
// 		this.applyFilter(this.dataSource.filter);
// 	}
// 	private onDataLoadSuccessful(getCreditTermsList: any[]) {
// 		// alert('success');
// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.dataSource.data = getCreditTermsList;

// 		this.allPolistInfo = getCreditTermsList;
// 	}

// 	private onDataLoadFailed(error: any) {
// 		// alert(error);
// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;

// 	}
// 	private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
// 		// alert('success');
// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.allComapnies = allComapnies;

// 	}
	

    

// 	private onDataLoadordrSuccessful(getCreditTermsList: any[]) {
// 		// alert('success');
// 		this.vendorservice.purchasepartcollection = [];
// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;
// 		this.dataSource.data = getCreditTermsList;

// 		this.allPurchaseorderInfo = getCreditTermsList;
// 		//if (this.allPurchaseorderInfo.length > 0) {
// 			this.vendorservice.isEditMode = false;
// 			this.vendorservice.purchasepartcollection = this.allPurchaseorderInfo;
// 			this._router.navigateByUrl('/vendorsmodule/vendorpages/app-purchase-setup');
// 		//}
// 	}
// 	//handleChange(rowData, e) {
// 	//	if (e.checked == false) {
// 	//		this.sourceAction = rowData;
// 	//		this.sourceAction.updatedBy = this.userName;
// 	//		this.Active = "In Active";
// 	//		this.sourceAction.isActive == false;
// 	//		this.vendorservice.updatecurrency(this.sourceAction).subscribe(
// 	//			response => this.saveCompleted(this.sourceAction),
// 	//			error => this.saveFailedHelper(error));
// 	//		//alert(e);
// 	//	}
// 	//	else {
// 	//		this.sourceAction = rowData;
// 	//		this.sourceAction.updatedBy = this.userName;
// 	//		this.Active = "Active";
// 	//		this.sourceAction.isActive == true;
// 	//		this.vendorservice.updatecurrency(this.sourceAction).subscribe(
// 	//			response => this.saveCompleted(this.sourceAction),
// 	//			error => this.saveFailedHelper(error));
// 	//		//alert(e);
// 	//	}

// 	//}



// 	open() {

// 		this._router.navigateByUrl('/vendorsmodule/vendorpages/app-create-po')
// 	}


// 	openDelete(content, row) {

// 		this.isEditMode = false;
// 		this.isDeleteMode = true;
// 		this.sourceAction = row;
// 		this.modal = this.modalService.open(content, { size: 'sm' });
// 		this.modal.result.then(() => {
// 			console.log('When user closes');
// 		}, () => { console.log('Backdrop click') })
// 	}
// 	private loadMasterCompanies() {
// 		this.alertService.startLoadingMessage();
// 		this.loadingIndicator = true;

// 		this.masterComapnyService.getMasterCompanies().subscribe(
// 			results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
// 			error => this.onDataLoadFailed(error)
// 		);

// 	}
// 	openEdit(row) {

		
// 		this.vendorservice.getpurchasevendorlist(row.purchaseOrderId).subscribe(
// 			results => this.onDataLoadordrSuccessful(results[0]),
// 			error => this.onDataLoadFailed(error)
// 		);
// 		//this.modal = this.modalService.open(content, { size: 'sm' });
// 		//this.modal.result.then(() => {
// 		//	console.log('When user closes');
// 		//}, () => { console.log('Backdrop click') })
// 	}

// 	//openHist(content, row) {
// 	//	this.alertService.startLoadingMessage();
// 	//	this.loadingIndicator = true;


// 	//	this.sourceAction = row;



// 	//	this.isSaving = true;

// 	//	this.vendorservice.historycurrency(this.sourceAction.currencyId).subscribe(
// 	//		results => this.onHistoryLoadSuccessful(results[0], content),
// 	//		error => this.saveFailedHelper(error));


// 	//}
// 	private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {


// 		this.alertService.stopLoadingMessage();
// 		this.loadingIndicator = false;

// 		this.auditHisory = auditHistory;


// 		this.modal = this.modalService.open(content, { size: 'lg' });

// 		this.modal.result.then(() => {
// 			console.log('When user closes');
// 		}, () => { console.log('Backdrop click') })


// 	}
// 	//openView(content, row) {

// 	//	this.sourceAction = row;
// 	//	this.currency_Name = row.code;
// 	//	this.symbol = row.symbol;
// 	//	this.displayName = row.displayName;
// 	//	this.memo = row.memo;
// 	//	this.createdBy = row.createdBy;
// 	//	this.updatedBy = row.updatedBy;
// 	//	this.createdDate = row.createdDate;
// 	//	this.updatedDate = row.updatedDate;
// 	//	this.loadMasterCompanies();
// 	//	this.modal = this.modalService.open(content, { size: 'sm' });
// 	//	this.modal.result.then(() => {
// 	//		console.log('When user closes');
// 	//	}, () => { console.log('Backdrop click') })
// 	//}
// 	openHelpText(content) {
// 		this.modal = this.modalService.open(content, { size: 'sm' });
// 		this.modal.result.then(() => {
// 			console.log('When user closes');
// 		}, () => { console.log('Backdrop click') })
// 	}
// 	eventHandler(event) {
// 		let value = event.target.value.toLowerCase();
// 		if (this.selectedActionName) {
// 			if (value == this.selectedActionName.toLowerCase()) {
// 				//alert("Action Name already Exists");
// 				this.disableSave = true;
// 			}
// 			else {
// 				this.disableSave = false;
// 			}
// 		}
// 	}
// 	partnmId(event) {
// 		//debugger;
// 		for (let i = 0; i < this.actionamecolle.length; i++) {
// 			if (event == this.actionamecolle[i][0].currencyName) {
// 				//alert("Action Name already Exists");
// 				this.disableSave = true;
// 				this.selectedActionName = event;
// 			}
// 		}
// 	}


// 	filterCurrency(event) {

// 		this.localCollection = [];
// 		for (let i = 0; i < this.allCurrencyInfo.length; i++) {
// 			let currencyName = this.allCurrencyInfo[i].code;
// 			if (currencyName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
// 				this.actionamecolle.push([{
// 					"currencyId": this.allCurrencyInfo[i].currencyId,
// 					"currencyName": currencyName
// 				}]),
// 					this.localCollection.push(currencyName);
// 			}
// 		}
// 	}


// 	//editItemAndCloseModel() {

// 	//	// debugger;

// 	//	this.isSaving = true;

// 	//	if (this.isEditMode == false) {
// 	//		this.sourceAction.createdBy = this.userName;
// 	//		this.sourceAction.updatedBy = this.userName;
// 	//		this.sourceAction.code = this.currencyName;
// 	//		this.sourceAction.masterCompanyId = 1;
// 	//		this.vendorservice.newAddcurrency(this.sourceAction).subscribe(
// 	//			role => this.saveSuccessHelper(role),
// 	//			error => this.saveFailedHelper(error));
// 	//	}
// 	//	else {

// 	//		this.sourceAction.updatedBy = this.userName;
// 	//		this.sourceAction.code = this.currencyName;
// 	//		this.sourceAction.masterCompanyId = 1;
// 	//		this.vendorservice.updatecurrency(this.sourceAction).subscribe(
// 	//			response => this.saveCompleted(this.sourceAction),
// 	//			error => this.saveFailedHelper(error));
// 	//	}

// 	//	this.modal.close();
// 	//}

// 	//deleteItemAndCloseModel() {
// 	//	this.isSaving = true;
// 	//	this.sourceAction.updatedBy = this.userName;
// 	//	this.vendorservice.deletecurrency(this.sourceAction.currencyId).subscribe(
// 	//		response => this.saveCompleted(this.sourceAction),
// 	//		error => this.saveFailedHelper(error));
// 	//	this.modal.close();
// 	//}

// 	dismissModel() {
// 		this.isDeleteMode = false;
// 		this.isEditMode = false;
// 		this.modal.close();
// 	}

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

// 	private saveSuccessHelper(role?: any) {
// 		this.isSaving = false;
// 		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

// 		this.loadData();

// 	}

// 	get userName(): string {
// 		return this.authService.currentUser ? this.authService.currentUser.userName : "";
// 	}

// 	private saveFailedHelper(error: any) {
// 		this.isSaving = false;
// 		this.alertService.stopLoadingMessage();
// 		this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
// 		this.alertService.showStickyMessage(error, null, MessageSeverity.error);
// 	}

// 	//private getDismissReason(reason: any): string {
// 	//	if (reason === ModalDismissReasons.ESC) {
// 	//		return 'by pressing ESC';
// 	//	} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
// 	//		return 'by clicking on a backdrop';
// 	//	} else {
// 	//		return `with: ${reason}`;
// 	//	}
// 	//}

// }
