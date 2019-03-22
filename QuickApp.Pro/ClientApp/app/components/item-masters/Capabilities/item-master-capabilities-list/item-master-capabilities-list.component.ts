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
import { fadeInOut } from '../../../../services/animations';
import { MasterCompany } from '../../../../models/mastercompany.model';
import { AuditHistory } from '../../../../models/audithistory.model';
import { AuthService } from '../../../../services/auth.service';
import { MessageSeverity, AlertService } from '../../../../services/alert.service';
import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { ItemMasterService } from '../../../../services/itemMaster.service';

@Component({
    selector: 'app-item-master-capabilities-list',
    templateUrl: './item-master-capabilities-list.component.html',
    styleUrls: ['./item-master-capabilities-list.component.scss'],
    animations: [fadeInOut]

})
/** item-master-capabilities-list component*/
export class ItemMasterCapabilitiesListComponent implements OnInit
{
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
    allItemMasterCapsList: any[] = [];
    selectedColumn: any;
    getSelectedCollection: any;
    /** item-master-capabilities-list ctor */
    constructor(private itemMasterService: ItemMasterService, private modalService: NgbModal, private authService: AuthService, private _route: Router, private alertService: AlertService)
    {
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit()
    {
        this.loadData();
        this.activeIndex = 0;
        //this.workFlowtService.currentUrl = '/stocklinemodule/stocklinepages/app-stock-line-list';
        // this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
    }

    dataSource: MatTableDataSource<any>;
    cols: any[];
    paginator: MatPaginator;
    sort: MatSort;

    private onDataLoadFailed(error: any)
    {
    }

     private loadData()
     {
         this.itemMasterService.getItemMasterCapsList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        // To display the values in header and column name values
        this.cols = [
            //{ field: 'actionId', header: 'Action Id' },

            { field: 'partNumber', header: 'PN' },
            { field: 'partDescription', header: 'Description' },
            { field: 'isHazardousMaterial', header: 'Hazardous Material' },
            { field: 'itemMasterId', header: 'Item Master Id' },
            //{field: 'materialType', header: 'Material Type' },
            { field: 'vendorRanking', header: 'Material Type' },
            { field: 'provision', header: 'Provision' },
            { field: 'manufacturer', header: 'Manufacturer' },
            //{ field: 'partCertificationNumber', header: 'Part Certification Num' }
            //{ field: 'createdBy', header: 'Created By' },
            //{ field: 'updatedBy', header: 'Updated By' },
            //{ field: 'updatedDate', header: 'Updated Date' },
            //{ field: 'createdDate', header: 'Created Date' }

        ];

        this.selectedColumns = this.cols;

    }

    private onDataLoadSuccessful(allWorkFlows: any[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allItemMasterCapsList = allWorkFlows;

        console.log(allWorkFlows);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public applyFilter(filterValue: string)
    {
        this.dataSource.filter = filterValue;
    }

    private refresh()
    {
        // Causes the filter to refresh there by updating with recently added data.
        this.applyFilter(this.dataSource.filter);
    }
    dismissModel()
    {
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

    openDelete(content, row)
    {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceAction = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openEdits(row) //this is for Edit Data get
    {
        this.itemMasterService.isCapsEditMode = true;
        this.isSaving = true;
        this.itemMasterService.listCollection = row; //Storing Row Data  and saving Data in Service that will used in StockLine Setup

        this.itemMasterService.getCapabilityData(row.itemMasterId).subscribe(data => {
            this.getSelectedCollection = data;
            this.itemMasterService.capabilityCollection = this.getSelectedCollection;

        });
       

        this._route.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-create-capabilities');
    }

    private saveCompleted(user?: any)
    {
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

    private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content)
    {
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
        this.itemMasterService.isCapsEditMode = false;
        this.itemMasterService.enableExternal = false;
        this._route.navigateByUrl('stocklinemodule/stocklinepages/app-stock-line-setup');

    }
}