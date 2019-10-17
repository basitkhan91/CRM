import { Component, OnInit, ViewChild } from '@angular/core';
import { fadeInOut } from "../../services/animations";
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AssetIntangibleTypeSingleScreen } from "../../models/assetIntangibleTypeSingleScreen.model";
import { AssetIntangibleTypeSingleScreenService } from "../../services/AssetIntangibleTypeSingleScreen/assetIntangibleTypeSingleScreen.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { SingleScreenAuditDetails } from "../../models/single-screen-audit-details.model";
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuditHistory } from '../../models/audithistory.model';
import { MasterCompany } from '../../models/mastercompany.model';
import { MasterComapnyService } from '../../services/mastercompany.service';

@Component({
     selector: 'app-asset-intangible-type-single-screen',
     templateUrl: './asset-intangible-type-single-screen.component.html',
     styleUrls: [],
     animations: [fadeInOut]
})
/** IntangibleType component*/
export class AssetIntangibleTypeSingleScreenComponent implements OnInit {

    currentAssetIntangible: AssetIntangibleTypeSingleScreen;
    dataSource: MatTableDataSource<AssetIntangibleTypeSingleScreen>;
    assetIntangibleList: AssetIntangibleTypeSingleScreen[] = [];
    assetIntangibleToUpdate: AssetIntangibleTypeSingleScreen;
    updateMode: boolean;
    selectedData: any;
    public auditHisory: AuditHistory[] = [];
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    public sourceAction: AssetIntangibleTypeSingleScreen;
    display: boolean = false;
    modelValue: boolean = false;
    allComapnies: MasterCompany[] = [];
    Active: string;
    code: any = "";
    name: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    selectedColumns: any[];
    allreasn: any[] = [];
    loadingIndicator: boolean;
    displayedColumns = ['Code', 'Name', 'Memo'];
    cols: any[];
    selectedreason: any;
    AuditDetails: SingleScreenAuditDetails[];
    allunitData: any;
    code_Name: any = "";
    localCollection: any[] = [];
    disableSave: boolean = false;
    isSaving: boolean;
    private isDelete: boolean = false;
    codeName: string = "";

    isEdit: boolean = false;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    /** IntangibleType ctor */

    paginatorState: { rows: number; first: number; };
    totalRecords: number;
    first: number;
    rows: number;
    loading: boolean;
    intangibleTypePagination: AssetIntangibleTypeSingleScreen[];

    constructor(private breadCrumb: SingleScreenBreadcrumbService, private alertService: AlertService, private assetIntangibleService: AssetIntangibleTypeSingleScreenService, private modalService: NgbModal, private authService: AuthService, private masterComapnyService: MasterComapnyService) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.sourceAction = new AssetIntangibleTypeSingleScreen();
    }

    ngOnInit(): void {
        this.loadData();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-asset-intangible-type-single-screen';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.assetIntangibleService.getAll().subscribe(data => {
            this.allunitData = data[0].columHeaders;
            this.assetIntangibleList = data[0].columnData;
            console.log(this.assetIntangibleList);
            this.totalRecords = this.assetIntangibleList.length;
            this.cols = [
                console.log(this.allunitData),
                this.selectedColumns = this.allunitData
            ];
            this.selectedData = this.selectedColumns
        });
    }


    changePage(event: { first: any; rows: number }) {
        console.log(event);
        const pageIndex = (event.first / event.rows);
        // this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
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

    public allWorkFlows: AssetIntangibleTypeSingleScreen[] = [];

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
    
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    validateRecordExistsOrNot(field: string, currentInput: any, originalData: any) {
        console.log(field, currentInput, originalData)
        if ((field !== '' || field !== undefined) && (currentInput !== '' || currentInput !== undefined) && (originalData !== undefined)) {
            const data = originalData.filter(x => {
                return x[field].toLowerCase() === currentInput.toLowerCase()
            })
            return data;
        }
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

    partnmId(event) {
        for (let i = 0; i < this.allreasn.length; i++) {
            if (event == this.allreasn[i][0].codeName) {
                this.disableSave = true;
                this.selectedreason = event;
            }
        }
    }

    filterIntangibleType(event) {
        this.localCollection = [];

        for (let i = 0; i < this.assetIntangibleList.length; i++) {

            let codeName = this.assetIntangibleList[i].code
                ;

            if (codeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                console.log(codeName);
                this.allreasn.push([{
                    "assetIntangibleTypeId": this.assetIntangibleList[i].assetIntangibleTypeId,
                    "codeName": codeName
                }]),
                    this.localCollection.push(codeName);
            }
        }
    }
       
    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    open(content) {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new AssetIntangibleTypeSingleScreen();
        this.sourceAction.isActive = true;

        this.codeName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openEdit(content, row) {

        this.isEditMode = true;
        this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = row;

        this.codeName = row.code;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    SaveandEditIntangibleType() {
        // debugger;

        this.isSaving = true;
        console.log(this);

        const params = <any>{
            createdBy: this.userName,
            updatedBy: this.userName,
            AssetIntangibleCode: this.codeName,
            AssetIntangibleName: this.sourceAction.name,
            AssetIntangibleMemo: this.sourceAction.memo,

            IsActive: this.sourceAction.isActive,
            IsDelete: this.isDelete,
            masterCompanyId: 1
        };
        if (this.isEditMode == false) {
            this.assetIntangibleService.add(params).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {
            params.assetIntangibleTypeId = this.sourceAction.assetIntangibleTypeId;
            this.assetIntangibleService.update(params).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }

    removeAssetIntangible() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.assetIntangibleService.remove(this.sourceAction.assetIntangibleTypeId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    private saveSuccessHelper(role?: AssetIntangibleTypeSingleScreen) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);
        this.loadData();
    }

    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

    private saveCompleted(user?: AssetIntangibleTypeSingleScreen) {
        this.isSaving = false;
        if (this.isDelete == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDelete = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
        }
        this.loadData();
    }

    handleChange(rowData, e) {
        console.log(rowData)
        const params = <any>{
            createdBy: this.userName,
            updatedBy: this.userName,
            AssetIntangibleCode: rowData.code,
            AssetIntangibleName: rowData.name,
            AssetIntangibleMemo: rowData.memo,
            AssetIntangibleTypeId: rowData.assetIntangibleTypeId,
            isActive: rowData.isActive,
            IsDelete: false,
            masterCompanyId: 1
        };
        if (e.checked == false) {
            this.Active = "In Active";
            this.assetIntangibleService.update(params).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }
        else {
            this.Active = "Active";
            this.assetIntangibleService.update(params).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

    }

    openView(content, row) {
        this.sourceAction = row;
        this.code = row.code;
        this.name = row.name;
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



    openDelete(content, row) {
        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceAction = row;
        this.code_Name = row.code;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    showAuditPopup(template, assetIntangibleTypeId): void {
        this.auditIntangible(assetIntangibleTypeId);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditIntangible(assetIntangibleTypeId: number): void {
        this.AuditDetails = [];
        this.assetIntangibleService.getAssetIntangibleAudit(assetIntangibleTypeId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["assetIntangibleTypeSingleAuditId", "assetIntangibleTypeId", "createdBy", "createdDate", "updatedDate","masterCompanyId"];
            }
        });
    }

}