import { Component, OnInit, ViewChild } from '@angular/core';
import { fadeInOut } from "../../services/animations";
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AssetDepConvention } from "../../models/assetDepConvention.model";
import { AssetDepConventionTypeService } from "../../services/assetDepConventionType/assetDepConventionType.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { SingleScreenAuditDetails } from "../../models/single-screen-audit-details.model";
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuditHistory } from '../../models/audithistory.model';
import { MasterCompany } from '../../models/mastercompany.model';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
    selector: 'app-asset-dep-convention-type',
    templateUrl: './asset-dep-convention-type.component.html',
        styleUrls: ['./asset-dep-convention-type.component.scss'],
        animations: [fadeInOut]
})

export class AssetDepConventionTypeComponent implements OnInit {

    currentAssetDep: AssetDepConvention;
    dataSource: MatTableDataSource<AssetDepConvention>;
    assetDepList: AssetDepConvention[] = [];
    assetDepConventionToUpdate: AssetDepConvention;
    updateMode: boolean;
    selectedData: any;
    formData = new FormData();
    existingRecordsResponse: Object;
    public auditHisory: AuditHistory[] = [];
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    public sourceAction: AssetDepConvention;
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
    memoPopupText: string;
    selectedreason: any;
    AuditDetails: SingleScreenAuditDetails[];
    allunitData: any;
    code_Name: any = "";
    localCollection: any[] = [];
    auditHistory: any[] = [];
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
    /** DepConvension ctor */

    paginatorState: { rows: number; first: number; };
    totalRecords: number;
    first: number;
    rows: number;
    loading: boolean;
    disposalTypePagination: AssetDepConvention[];

    constructor(private breadCrumb: SingleScreenBreadcrumbService, private alertService: AlertService, private assetDepConventionTypeService: AssetDepConventionTypeService, private modalService: NgbModal, private authService: AuthService, private masterComapnyService: MasterComapnyService, private configurations: ConfigurationService) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.sourceAction = new AssetDepConvention();
    }

    ngOnInit(): void {
        this.loadData();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-asset-dep-convention-type';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);       
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.assetDepConventionTypeService.getAll().subscribe(data => {
            this.allunitData = data[0].columHeaders;
            this.assetDepList = data[0].columnData;
            console.log(this.assetDepList);
            this.totalRecords = this.assetDepList.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            this.cols = [
                console.log(this.allunitData),
                this.selectedColumns = this.allunitData
            ];
            this.selectedData = this.selectedColumns
            this.alertService.stopLoadingMessage();
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

    public allWorkFlows: AssetDepConvention[] = [];

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

    filterDepConvension(event) {
        this.localCollection = [];

        for (let i = 0; i < this.assetDepList.length; i++) {

            let codeName = this.assetDepList[i].code
                ;

            if (codeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                console.log(codeName);
                this.allreasn.push([{
                    "AssetDepConventionId": this.assetDepList[i].assetDepConventionId,
                    "codeName": codeName
                }]),
                    this.localCollection.push(codeName);
            }
        }
    }

    resetAssetDepConventionType(): void {
        this.updateMode = false;
        this.currentAssetDep = new AssetDepConvention();
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
        this.sourceAction = new AssetDepConvention();
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

    SaveandEditDepConvension() {
        // debugger;

        this.isSaving = true;
        console.log(this);

        const params = <any>{
            createdBy: this.userName,
            updatedBy: this.userName,
            AssetDepConventionCode: this.codeName,
            AssetDepConventionName: this.sourceAction.name,
            AssetDepConventionMemo: this.sourceAction.memo,

            IsActive: this.sourceAction.isActive,
            IsDeleted: this.isDelete,
            masterCompanyId: 1
        };
        if (this.isEditMode == false) {
            this.assetDepConventionTypeService.add(params).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {
            params.AssetDepConventionId = this.sourceAction.assetDepConventionId;
            this.assetDepConventionTypeService.update(params).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }

    removeAssetDepConventionType() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.assetDepConventionTypeService.remove(this.sourceAction.assetDepConventionId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    private saveSuccessHelper(role?: AssetDepConvention) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);
        this.loadData();
        this.alertService.stopLoadingMessage();
    }

    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

    private saveCompleted(user?: AssetDepConvention) {
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

        const params = <any>{
            createdBy: this.userName,
            updatedBy: this.userName,
            AssetDepConventionId: rowData.assetDepConventionId,
            AssetDepConventionCode: rowData.code,
            AssetDepConventionName: rowData.name,
            AssetDepConventionMemo: rowData.memo,
            isActive: rowData.isActive,
            IsDeleted: false,
            masterCompanyId: 1
        };
        if (e.checked == false) {
            this.Active = "In Active";
            /*this.assetDepConventionTypeService.update(params).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));*/
        }
        else {
            this.Active = "Active";
            /*this.assetDepConventionTypeService.update(params).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));*/
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

    //showAuditPopup(template, id): void {
    //    this.auditDepConvention(id);
    //    this.modal = this.modalService.open(template, { size: 'sm' });
    //}

    //auditDepConvention(assetDepConventionTypeId: number): void {
    //    this.AuditDetails = [];
    //    this.assetDepConventionTypeService.getAudit(assetDepConventionTypeId).subscribe(audits => {
    //        if (audits.length > 0) {
    //            this.AuditDetails = audits;
    //            this.AuditDetails[0].ColumnsToAvoid = ["assetDepConventionTypeAuditId", "assetDepConventionTypeId", "createdBy", "createdDate", "updatedDate", "masterCompanyId"];
    //        }
    //    });
    //}

    getAuditHistoryById(rowData) {
        this.assetDepConventionTypeService.getAudit(rowData.assetDepConventionId).subscribe(res => {
            this.auditHistory = res;
        })
    }

    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=DepreciationConvention&fileName=AssetDepConvention.xlsx`;

        window.location.assign(url);
    }

    customExcelUpload(event) {
        const file = event.target.files;

        console.log(file);
        if (file.length > 0) {

            this.formData.append('file', file[0])
            this.assetDepConventionTypeService.AssetDepConvCustomUpload(this.formData).subscribe(res => {
                event.target.value = '';

                this.formData = new FormData();
                this.existingRecordsResponse = res;
                this.getAssetDepConvList();
                this.alertService.showMessage(
                    'Success',
                    `Successfully Uploaded  `,
                    MessageSeverity.success
                );

                // $('#duplicateRecords').modal('show');
                // document.getElementById('duplicateRecords').click();

            })
        }

    }

    getAssetDepConvList() {

        this.loadData();
    }
}