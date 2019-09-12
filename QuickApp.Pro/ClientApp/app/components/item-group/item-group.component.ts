import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';
import { Itemgroup } from '../../models/item-group.model';
import { ItemGroupService } from '../../services/item-group.service';
import { AuditHistory } from '../../models/audithistory.model';
import { MenuItem, LazyLoadEvent } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";

@Component({
    selector: 'app-item-group',
    templateUrl: './item-group.component.html',
    styleUrls: ['./item-group.component.scss'],
    animations: [fadeInOut]

})
/** Actions component*/
export class ItemGroupComponent implements OnInit, AfterViewInit {
    itemGroupPaginationList: any[] = [];
    totelPages: number;
    itemGroup = [];
    updatedByInputFieldValue: any;
    createdByInputFieldValue: any;
    memoInputFieldValue: any;
    descriptionInputFieldValue: any;
    itemGroupCodeInputFieldValue: any;
    matchMode: any;
    field: any;
    event: any;
    selectedreason: any;
    allreasn: any[]=[];
    itemGroup_Name: any = "";
    description: any = "";   
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    disableSave: boolean = false;
    AuditDetails: SingleScreenAuditDetails[];

    auditHisory: AuditHistory[];
    Active: string = "Active";
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    cols: any[];
    selectedColumns: any[];
    displayedColumns = ['itemgroupId', 'itemGroupCode', 'description'];
    //, 'Sequence', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'
    dataSource: MatTableDataSource<Itemgroup>;
    allitemgroupobjInfo: Itemgroup[] = [];
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    public sourceAction: Itemgroup;
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    selectedColumn: Itemgroup[];
    title: string = "Create";
    id: number;
    errorMessage: any;
    modal: NgbModalRef;
    itemGroupName: string;
    filteredBrands: any[];
    localCollection: any[] = [];

    /** Actions ctor */

    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;

    paginatorState: { rows: number; first: number; };
    totalRecords: number;
    first: number;
    rows: number;
    loading: boolean;
    itemGroupPagination: Itemgroup[];//added

	constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: ItemGroupService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.sourceAction = new Itemgroup();

    }
  

    ngOnInit(): void {
        this.loadData();
        this.cols = [
            //{ field: 'itemGroupId', header: 'Item Group Id' },
            { field: 'itemGroupCode', header: 'Item Group ID' },
            { field: 'description', header: 'Item Group Name' },
            { field: 'memo', header: 'Memo' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
            //{ field: 'updatedDate', header: 'Updated Date' },
            //{ field: 'createdDate', header: 'Created Date' }
		];
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-item-group';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        this.selectedColumns = this.cols;
    }
 

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    public allWorkFlows: Itemgroup[] = [];

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

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
    private onDataLoadSuccessful(allWorkFlows: Itemgroup[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.totalRecords = allWorkFlows.length
        this.allitemgroupobjInfo = allWorkFlows;
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
		this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
		this.sourceAction = new Itemgroup();
        this.sourceAction.isActive = true;
        this.itemGroupName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    openDelete(content, row) {
        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceAction = row;
        this.itemGroup_Name = row.itemGroupCode;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openEdit(content, row) {
		this.disableSave = false;
        this.isEditMode = true;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = row;
        this.itemGroupName = this.sourceAction.itemGroupCode;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openHist(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.sourceAction = row;
        this.isSaving = true;
        this.workFlowtService.historyAcion(this.sourceAction.itemGroupId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));


    }

    openView(content, row) {

        this.sourceAction = row;
        this.itemGroup_Name = row.itemGroupCode;
        this.description = row.description;      
        this.memo = row.memo;
        this.createdBy = row.createdBy;
        this.updatedBy = row.updatedBy;
        this.createdDate = row.createdDate;
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

    eventHandler(event) {
        let value = event.target.value.toLowerCase()
        if (this.selectedreason) {
        if (value == this.selectedreason.toLowerCase()) {
            this.disableSave = true;
        }
        else {
            this.disableSave = false;
            }
        }
    }




    itemGroupId(event) {
        for (let i = 0; i < this.allreasn.length; i++) {
            if (event == this.allreasn[i][0].itemGroupName) {


                this.disableSave = true;
                this.selectedreason = event;
            }




        }
    }







    filterItemgroups(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allitemgroupobjInfo.length; i++) {
            let itemGroupName = this.allitemgroupobjInfo[i].itemGroupCode;
            if (itemGroupName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {

                this.allreasn.push([{
                    "itemGroupId": this.allitemgroupobjInfo[i].itemGroupId,
                    "itemGroupName": itemGroupName
                }]),
                this.localCollection.push(itemGroupName);
            }
        }
    }
    private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {


        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.auditHisory = auditHistory;


        this.modal = this.modalService.open(content, { size: 'lg' });

        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })


    }


    editItemAndCloseModel() {

        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.itemGroupCode = this.itemGroupName;
            this.sourceAction.masterCompanyId = 1;
            this.workFlowtService.newAction(this.sourceAction).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.itemGroupCode = this.itemGroupName;
            this.sourceAction.masterCompanyId = 1;
            this.workFlowtService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }
    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceAction.isActive == false;
            this.workFlowtService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive == true;
            this.workFlowtService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

    }
    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.workFlowtService.deleteAcion(this.sourceAction.itemGroupId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    private saveCompleted(user?: Itemgroup) {
        this.isSaving = false;

        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

        }

        this.updatePaginatorState();
    }

    private saveSuccessHelper(role?: Itemgroup) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

        this.updatePaginatorState();

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

    showAuditPopup(template, id): void {
        this.auditItemGroup(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditItemGroup(itemGroupId: number): void {
        this.AuditDetails = [];
        this.workFlowtService.getItemGroupAudit(itemGroupId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["itemGroupAuditId", "itemGroupId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }

    loadItemGroup(event: LazyLoadEvent) //when page initilizes it will call this method
    {
        this.loading = true;
        this.rows = event.rows;
        this.first = event.first;
        if (this.field) {
            this.itemGroup.push({
                ItemGroupCode: this.itemGroupCodeInputFieldValue,
                description: this.descriptionInputFieldValue,
                memo: this.memoInputFieldValue,
                Memo: this.memoInputFieldValue,
                CreatedBy: this.createdByInputFieldValue,
                UpdatedBy: this.updatedByInputFieldValue,
                first: this.first,
                page: 10,
                pageCount: 10,
                rows: this.rows,
                limit: 5
            })
            if (this.itemGroup) {
                this.workFlowtService.getServerPages(this.itemGroup[this.itemGroup.length - 1]).subscribe( //we are sending event details to service
                    pages => {
                        this.itemGroupPaginationList = pages;
                        this.itemGroupPagination = this.itemGroupPaginationList[0].itemGroupList;
                        this.totalRecords = this.itemGroupPaginationList[0].totalRecordsCount;
                        this.totelPages = Math.ceil(this.totalRecords / this.rows);
                    });
            }
            else {
            }
        }

        else
        {
            setTimeout(() => {
                if (this.allitemgroupobjInfo) {
                    this.workFlowtService.getServerPages(event).subscribe( //we are sending event details to service
                        pages => {
                            this.itemGroupPaginationList = pages;
                            this.itemGroupPagination = this.itemGroupPaginationList[0].itemGroupList;
                            this.totalRecords = this.itemGroupPaginationList[0].totalRecordsCount;
                            this.totelPages = Math.ceil(this.totalRecords / this.rows);
                        });
                    this.loading = false;
                }
            }, 1000);
        }
        
    }

    updatePaginatorState() //need to pass this Object after update or Delete to get Server Side pagination
    {
        this.paginatorState = {
            rows: this.rows,
            first: this.first
        }
        if (this.paginatorState) {
            this.loadItemGroup(this.paginatorState);
        }
    }

    inputFiledFilter(event, filed, matchMode) {
        this.first = 0;
        this.event = event;
        this.field = filed;
        this.matchMode = matchMode;

        if (filed == 'itemGroupCode') {
            this.itemGroupCodeInputFieldValue = event;
        }
        if (filed == 'description') {
            this.descriptionInputFieldValue = event;
        }
        if (filed == 'memo') {
            this.memoInputFieldValue = event;
        }
        if (filed == 'createdBy') {
            this.createdByInputFieldValue = event;
        }
        if (filed == 'updatedBy') {
            this.updatedByInputFieldValue = event;
        }
       
        this.itemGroup.push({
            ItemGroupCode: this.itemGroupCodeInputFieldValue,
            description: this.descriptionInputFieldValue,
            memo: this.memoInputFieldValue,
            Memo: this.memoInputFieldValue,
            CreatedBy: this.createdByInputFieldValue,
            UpdatedBy: this.updatedByInputFieldValue,
            first: this.first,
            page: 10,
            pageCount: 10,
            rows: this.rows,
            limit: 5
        })
        if (this.itemGroup) {
            this.workFlowtService.getServerPages(this.itemGroup[this.itemGroup.length - 1]).subscribe( //we are sending event details to service
                pages => {
                    this.itemGroupPaginationList = pages;
                    this.itemGroupPagination = this.itemGroupPaginationList[0].itemGroupList;
                    this.totalRecords = this.itemGroupPaginationList[0].totalRecordsCount;
                    this.totelPages = Math.ceil(this.totalRecords / this.rows);
                });
        }
        else {
        }
    }
}