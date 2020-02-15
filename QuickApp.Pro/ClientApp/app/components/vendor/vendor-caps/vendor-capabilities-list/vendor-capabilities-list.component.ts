import { Component, ViewChild, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AlertService, DialogType, MessageSeverity } from '../../../../services/alert.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { fadeInOut } from '../../../../services/animations';
import { AuthService } from '../../../../services/auth.service';
import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { AuditHistory } from '../../../../models/audithistory.model';
import { MasterCompany } from '../../../../models/mastercompany.model';
import { VendorService } from '../../../../services/vendor.service';
import * as $ from 'jquery';
import { VendorCapabilitiesService } from '../../../../services/vendorcapabilities.service';

@Component({
    selector: 'app-vendor-capabilities-list',
    templateUrl: './vendor-capabilities-list.component.html',
    styleUrls: ['./vendor-capabilities-list.component.scss'],
    animations: [fadeInOut]
})
/** vendor-capabilities-list component*/
export class VendorCapabilitiesListComponent implements OnInit {
    /** vendor-capabilities-list ctor */
    activeIndex: number;
    selectedColumns: any[];
    isDeleteMode: boolean;
    isEditMode: boolean;
    loadingIndicator: boolean;
    auditHisory: any[];
    selectedreason: any;
    disableSave: boolean;
    allComapnies: MasterCompany[];
    modal: any;
    sourceAction: any;
    isSaving: boolean;
    allvendorCapsList: any[] = [];
    Active: string = "Active";
    selectedColumn: any;
    capabilityauditHisory: any[];
    vendorCapesGeneralInfo: any = {};
    aircraftListDataValues: any;
    status: string = "active";
    colsaircraftLD: any[] = [
        { field: "aircraft", header: "Aircraft" },
        { field: "model", header: "Model" },
        { field: "dashNumber", header: "Dash Numbers" },
        { field: "memo", header: "Memo" }
    ];
    vendorNameHist: any;
    @Input() isEnableVendor: boolean;
    @Input() vendorId: number = 0;
    @Output() vendorCapabilityId = new EventEmitter<any>();
    totalRecords: number = 0;
    totalPages: number = 0;
    pageSize: number = 10;
    @Input() isViewMode: boolean = false;
    loaderForVendorCapesList: boolean;

    constructor(private vendorService: VendorService, private modalService: NgbModal, private authService: AuthService, private _route: Router, private alertService: AlertService, private vendorCapesService: VendorCapabilitiesService) {
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit() {
        this.loadData(this.status);
        if (!this.vendorId) {
            this.activeIndex = 0;
            this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-capabilities-list';

            this.vendorService.ShowPtab = false;
            this.vendorService.alertObj.next(this.vendorService.ShowPtab);

            this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);
        }
    }

    dataSource: MatTableDataSource<any>;
    cols: any[];
    paginator: MatPaginator;
    sort: MatSort;

    private onDataLoadFailed(error: any) {
        this.loaderForVendorCapesList = false;
    }

    private loadData(status) {
        //const status = 'active';
        this.loaderForVendorCapesList = true;
        if (this.vendorId != undefined) {
            this.vendorService.getVendorCapabilityList(status, this.vendorId).subscribe(
                results => this.onDataLoadSuccessful(results[0]),
                error => this.onDataLoadFailed(error)
            );
        }

        // To display the values in header and column name values
        this.cols = [
            { field: 'vendorCode', header: 'Vendor Code' },
            { field: 'vendorName', header: 'Vendor Name' },
            { field: 'capabilityType', header: 'Vendor Caps' },
            { field: 'partNumber', header: 'PN' },
            { field: 'partDescription', header: 'PN Description' },
            //{ field: 'capabilityType', header: 'Caps Type' },            
            { field: 'vendorRanking', header: ' Vendor Ranking' },
            { field: 'tat', header: 'TAT' },
        ];

        this.selectedColumns = this.cols;

    }

    private onDataLoadSuccessful(allWorkFlows: any[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allvendorCapsList = allWorkFlows;

        if (this.allvendorCapsList.length > 0) {
            this.totalRecords = this.allvendorCapsList.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        }
        this.loaderForVendorCapesList = false;
        //console.log(this.allvendorCapsList);
    }

    getVenCapesListByStatus(status) {
        this.status = status;
        this.loaderForVendorCapesList = true;
        this.vendorService.getVendorCapabilityList(status, this.vendorId).subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue;
    }

    private refresh() {
        // Causes the filter to refresh there by updating with recently added data.
        this.applyFilter(this.dataSource.filter);
    }
    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
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
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openEdits(row) {
        if (this.isEnableVendor) {
            const { vendorCapabilityId } = row;
            this.vendorCapabilityId.emit(vendorCapabilityId);
        } 
        else {
            this.vendorService.isEditMode = true;
            this.isSaving = true;
            this.vendorService.listCollection = row; //Storing Row Data  and saving Data in Service that will used in StockLine Setup
            const { vendorCapabilityId } = row
            this._route.navigateByUrl(`/vendorsmodule/vendorpages/app-add-vendor-capabilities/edit/${vendorCapabilityId}`);
        }

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

        this.loadData(this.status);
        //this.itemclass();
    }
    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
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

    public navigateTogeneralInfo() {
        //this.workFlowtService.listCollection = [];
        this.vendorService.isEditMode = false;
        this.vendorService.enableExternal = false;
        this._route.navigateByUrl('vendorsmodule/vendorpages/app-add-vendor-capabilities');

    }

    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceAction.isActive == false;
            this.vendorService.updateVendorCapability(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive == true;
            this.vendorService.updateVendorCapability(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.vendorService.deleteVendorCapability(this.sourceAction.vendorCapabilityId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }
    openHistory(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.isSaving = true;
        this.vendorNameHist = row.vendorName;
        this.vendorService.getVendorCapabilityAuditHistory(row.vendorCapabilityId, row.vendorId).subscribe(
            results => this.onAuditHistoryLoadSuccessful(results, content),
            error => this.saveFailedHelper(error));



    }
    private onAuditHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.capabilityauditHisory = auditHistory;

        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    getColorCodeForHistory(i, field, value) {
        const data = this.capabilityauditHisory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }

    gotoCreatePO(rowData) {

        console.log(rowData);
        const { vendorId } = rowData;
        this._route.navigateByUrl(`vendorsmodule/vendorpages/app-purchase-setup/vendor/${vendorId}`);
    }
    gotoCreateRO(rowData) {

        console.log(rowData);
        const { vendorId } = rowData;
        this._route.navigateByUrl(`vendorsmodule/vendorpages/app-ro-setup/vendor/${vendorId}`);
    }

    viewSelectedRow(rowData) {
        // console.log(rowData);ole.log(rowData);
        // const { vendorCapabilityId } = rowData;
        this.getVendorCapabilitiesView(rowData.vendorCapabilityId);
        this.getVendorCapesAircraftView(rowData.vendorCapabilityId);
        //$('#vendorCapesView').modal('show');
    }

    getVendorCapabilitiesView(vendorCapesId) {
        this.vendorCapesService.getVendorCapabilitybyId(vendorCapesId).subscribe(res => {
            // console.log(res);
            this.vendorCapesGeneralInfo = res;
            console.log(this.vendorCapesGeneralInfo);
        })
    }

    getVendorCapesAircraftView(vendorCapesId) {
        this.vendorCapesService.getVendorAircraftGetDataByCapsId(vendorCapesId).subscribe(res => {
            // console.log(res);

            this.aircraftListDataValues = res.map(x => {
                return {
                    ...x,
                    aircraft: x.aircraftType,
                    model: x.aircraftModel,
                    dashNumber: x.dashNumber,
                    memo: x.memo,
                }
            })
        })
    }

    viewSelectedRowdbl(rowData) {
        this.viewSelectedRow(rowData);
        $('#vendorCapesView').modal('show');
    }

    getPageCount(totalNoofRecords, pageSize) {
        return Math.ceil(totalNoofRecords / pageSize)
    }
}