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
import { AlertService, DialogType, MessageSeverity } from '../../../services/alert.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

import { StocklineService } from '../../../services/stockline.service';
import { fadeInOut } from '../../../services/animations';
import { AuthService } from '../../../services/auth.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { AuditHistory } from '../../../models/audithistory.model';
import { MasterCompany } from '../../../models/mastercompany.model';
import { Stockline } from '../../../models/stockline.model';

@Component({
    selector: 'app-stock-line-list',
    templateUrl: './stock-line-list.component.html',
    styleUrls: ['./stock-line-list.component.scss'],
    animations: [fadeInOut]
})
/** stock-line-list component*/
export class StockLineListComponent implements OnInit {
    activeIndex: number;
    modal: any;
    //sourceAction: any;
    public sourceAction: Stockline;
    isSaving: boolean;
    isDeleteMode: boolean;
    isEditMode: boolean;
    loadingIndicator: boolean;
    auditHisory: any[];
    selectedreason: any;
    disableSave: boolean;
    allComapnies: MasterCompany[];
    paginator: MatPaginator;
    sort: MatSort;
    sourceViewOptions: any = {};
    public sourceStockLine: any = {};
    selectedColumn: any[];
    selectedColumns: any[];
    createdBy: any = "";
    quantity: any = "";
    memo: any = "";
    //shelfLife: any = "";
    stockLineNumber: any = "";
    stocklineMatchKey: any = "";
    partNumber: any = "";
    purchaseOrderUnitCost: any = "";
    repairOrderUnitCost: any = "";
    receiverNumber: any = "";
    reconciliationNumber: any = "";
    unitSalesPrice: any = "";
    coreUnitCost: any = "";
    glAccountId: any = "";
    assetId: any = "";
    updatedBy: any = "";
    updatedDate: any = "";
    createdDate: any = "";
    oem: any = "";
    enableExternal: boolean = false;
    businessUnitName: any;
    company: any;
    division: any;
    departmentName: any;
    partDescription: any;
    isSerialized: any;
    controlNumber: any;
    condition: any;
    serialNumber: any;
    shelfLife: any;
    shelfLifeExpirationDate: any;
    site: any;
    warehouse: any;
    location: any;
    shelf: any;
    bin: any;
    obtainFrom: any;
    owner: any;
    traceableTo: any;
    manufacturer: any;
    manufacturerLotNumber: any;
    manufacturingDate: any;
    manufacturingBatchNumber: any;
    partCertificationNumber: any;
    certifiedBy: any;
    certifiedDate: any;
    tagType: any;
    certifiedDueDate: any;
    calibrationMemo: any;
    orderDate: any;
    purchaseOrderNumber: any;
    repairOrderNumber: any;
    receivedDate: any;
    isHazardousMaterial: any;
    isPMA: any;
    isDER: any;
    isAdjustSaving: boolean;
    tagdate: any;
    idNumber: any;
    manufacturerId: any;
    ngOnInit(): void {

        this.loadData();
        this.activeIndex = 0;
        this.workFlowtService.currentUrl = '/stocklinemodule/stocklinepages/app-stock-line-list';
        this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);

    }

    //displayedColumns = ['actionId', 'companyName', 'description', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<any>;
    cols: any[];
    //allVendorList: any[] = [];
    allStockInfo: StockLineListComponent[] = [];
    /** stock-line-list ctor */
    constructor(private workFlowtService: StocklineService, private _route: Router, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        //this.displayedColumns.push('StockLine');
        this.dataSource = new MatTableDataSource();
        this.loadData();

    }

    private onDataLoadFailed(error: any) {


    }

    public allWorkFlows: StockLineListComponent[] = [];


    private loadData() {
        this.workFlowtService.getStockLineList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        // To display the values in header and column name values
        this.cols = [
            { field: 'partNumber', header: 'PN' },
            { field: 'partDescription', header: 'PN DESCRIPTION' },
            { field: 'itemCategory', header: 'ITEM CATEGORY' },
            { field: 'itemGroup', header: 'ITEM GROUP' },
            { field: 'stockLineNumber', header: 'SL NUM' },
            { field: 'serialNumber', header: 'SERIAL NUM' },

            { field: 'location', header: 'LOCATION' },
            { field: 'partCertificationNumber', header: 'PART CERT NUM' },

            { field: 'condition', header: 'COND' },
            { field: 'quantity', header: 'QTY ON HAND' },
            { field: 'quantity', header: 'QTY AVAIL' },
            { field: 'glAccountId', header: 'GL ACCT' }

        ];
        this.selectedColumns = this.cols;
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    routeToPo() {
        this._route.navigateByUrl('/vendorsmodule/vendorpages/app-create-po');
    }

    routeToRo() {
        this._route.navigateByUrl('/vendorsmodule/vendorpages/app-create-ro');
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

    private refresh() {
        // Causes the filter to refresh there by updating with recently added data.
        this.applyFilter(this.dataSource.filter);
    }
    private onDataLoadSuccessful(allWorkFlows: any[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allStockInfo = allWorkFlows;
        console.log(allWorkFlows);
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allComapnies = allComapnies;

    }

    //private onDataLoadFailed(error: any) {
    //	// alert(error);
    //	this.alertService.stopLoadingMessage();
    //	this.loadingIndicator = false;

    //}

    //open(content) {

    //	this.isEditMode = false;
    //	this.isDeleteMode = false;

    //	this.isSaving = true;
    //	this.loadMasterCompanies();
    //	this.sourceAction = new Reason();
    //	this.sourceAction.isActive = true;
    //	this.reasonName = "";

    //	this.modal = this.modalService.open(content, { size: 'sm' });
    //	this.modal.result.then(() => {



    //		console.log('When user closes');
    //	}, () => { console.log('Backdrop click') })
    //}

    //To Display all the values when clicked on view  
    openView(content, row) {

        this.sourceViewOptions = row;
        //this.reason_Name = row.reasonCode;
        //this.reasonForRemoval = row.reasonForRemoval;
        //this.shelfLife = row.shelfLife;
        this.company = row.companyName;
        this.businessUnitName = row.businessUnitName;
        this.division = row.divisionName;
        this.departmentName = row.departmentName;
        this.partNumber = row.partNumber;
        this.glAccountId = row.glAccountId;
        this.partDescription = row.partDescription;
        this.stockLineNumber = row.stockLineNumber;
        if (row.isSerialized) {
            this.isSerialized = row.isSerialized;
        }
        else {
            this.isSerialized = false;
        }

        this.controlNumber = row.controlNumber;
        this.quantity = row.quantity;
        this.condition = row.condition;
        this.serialNumber = row.serialNumber;
        this.shelfLife = row.shelfLife;
        this.shelfLifeExpirationDate = row.shelfLifeExpirationDate;
        this.site = row.siteName;
        this.warehouse = row.warehouse;
        this.location = row.location;
        this.shelf = row.shelfName;
        this.bin = row.binName;

        this.obtainFrom = row.obtainFrom;
        this.owner = row.owner;
        this.traceableTo = row.traceableTo;
        //this.manufacturer = row.manufacturer;
        if (row.man) {
            this.manufacturerId = row.man.name;
        }
        else { this.manufacturerId = "" }
        this.manufacturerLotNumber = row.manufacturerLotNumber;
        this.manufacturingDate = row.manufacturingDate;
        this.manufacturingBatchNumber = row.manufacturingBatchNumber;
        this.partCertificationNumber = row.partCertificationNumber;
        this.certifiedBy = row.certifiedBy;
        this.certifiedDate = row.certifiedDate;
        this.tagdate = row.tagDate;
        this.tagType = row.tagType;
        this.certifiedDueDate = row.certifiedDueDate;
        this.calibrationMemo = row.calibrationMemo;
        this.orderDate = row.orderDate;
        this.purchaseOrderNumber = row.purchaseOrderNumber;
        this.purchaseOrderUnitCost = row.purchaseOrderUnitCost;
        this.repairOrderNumber = row.repairOrderNumber;
        this.repairOrderUnitCost = row.repairOrderUnitCost;


        this.receivedDate = row.receivedDate;
        this.receiverNumber = row.receiver;
        this.reconciliationNumber = row.reconciliationNumber;
        this.unitSalesPrice = row.unitSalesPrice;
        this.coreUnitCost = row.coreUnitCost;
        this.glAccountId = row.glAccountId;
        this.assetId = row.assetId;
        if (row.isHazardousMaterial) {
            this.isHazardousMaterial = row.isHazardousMaterial;
        }
        else { this.isHazardousMaterial = false; }

        this.isPMA = row.isPMA;
        this.isDER = row.isDER;
        this.oem = row.oem;
        this.memo = row.memo;
        this.idNumber = row.idNumber;




        this.createdBy = row.createdBy;
        this.updatedBy = row.updatedBy;
        this.createdDate = row.createdDate;
        this.updatedDate = row.updatedDate;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'lg' });
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

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceAction = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openEdits(row) {
        this.workFlowtService.isEditMode = true;
        this.isSaving = true;
        this.workFlowtService.listCollection = row; //Storing Row Data  and saving Data in Service that will used in StockLine Setup
        this._route.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-line-edit');
    }

    openAdjustment(row) {
        this.workFlowtService.isAdjustment = true;
        this.isAdjustSaving = true;
        this.workFlowtService.adjustmentCollection = row;
        this._route.navigateByUrl('/stocklinemodule/stocklinepages/app-stock-adjustment');
    }
    //deleteItemAndCloseModel(rowData) {
    //	this.isSaving = true;
    //	this.sourceAction = rowData;
    //	this.sourceAction.updatedBy = this.userName;
    //	this.sourceAction.isActive = false;
    //	this.sourceAction.sourceStockLine = rowData.sourceStockLine;
    //	this.stocklineser.deleteStockLineAction(this.sourceAction).subscribe(
    //		response => this.saveCompleted(this.sourceAction),
    //		error => this.saveFailedHelper(error));
    //	//  this.modal.close();
    //}

    private saveCompleted(user?: any) {
        this.isSaving = false;
        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
        }

        //this.itemclass();
    }
    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

    //eventHandler(event) {
    //	let value = event.target.value.toLowerCase()
    //	if (this.selectedreason) {
    //		if (value == this.selectedreason.toLowerCase()) {
    //			this.disableSave = true;
    //		}
    //		else {
    //			this.disableSave = false;
    //		}
    //	}
    //}



    //itemId(event) {
    //	for (let i = 0; i < this.allreasn.length; i++) {
    //		if (event == this.allreasn[i][0].reasonName) {

    //			this.disableSave = true;
    //			this.selectedreason = event;
    //		}

    //	}
    //}





    //filterReasons(event) {

    //	this.localCollection = [];
    //	for (let i = 0; i < this.allReasonsInfo.length; i++) {
    //		let reasonName = this.allReasonsInfo[i].reasonCode;
    //		if (reasonName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //			this.allreasn.push([{
    //				"reasonId": this.allReasonsInfo[i].reasonId,
    //				"reasonName": reasonName
    //			}]),
    //				this.localCollection.push(reasonName);
    //		}
    //	}
    //}

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

    public navigateTogeneralInfo() {
        //this.workFlowtService.listCollection = [];
        this.workFlowtService.isEditMode = false;
        this.workFlowtService.enableExternal = false;
        this._route.navigateByUrl('stocklinemodule/stocklinepages/app-stock-line-setup');

    }
}




