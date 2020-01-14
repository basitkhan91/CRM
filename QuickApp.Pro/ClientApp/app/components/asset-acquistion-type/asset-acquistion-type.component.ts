import { fadeInOut } from "../../services/animations";
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService, MessageSeverity } from "../../services/alert.service";
import { AssetAcquistionType } from "../../models/asset-acquistion-type.model";
import { AssetAcquistionTypeService } from "../../services/asset-acquistion-type/asset-acquistion-type.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AssetAcquistionTypeAudit} from "../../models/asset-acquistion-type-audit.model";
import { forEach } from "@angular/router/src/utils/collection";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuthService } from "../../services/auth.service";
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { MasterCompany } from '../../models/mastercompany.model';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AuditHistory } from '../../models/audithistory.model';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
    selector: 'asset-acquistion-type',
    templateUrl: './asset-acquistion-type.component.html',
    styleUrls: ['asset-acquistion-type.component.scss'],
    animations: [fadeInOut]
})
export class AssetAcquistionTypeComponent implements OnInit {

    currentAssetAcquistionType: AssetAcquistionType;
    dataSource: MatTableDataSource<AssetAcquistionType>;
    assetAcquistionTypeToUpdate: AssetAcquistionType;
    assetAcquistionTypeToRemove: AssetAcquistionType;
    assetAcquistionTypeList: AssetAcquistionType[] = [];
    assetAcquistionTypeAuditList: AssetAcquistionTypeAudit[];
    updateMode: boolean;
    selectedData: any;
    formData = new FormData();
    public auditHisory: AuditHistory[] = [];
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    public sourceAction: AssetAcquistionType;
    display: boolean = false;
    modelValue: boolean = false;
    allComapnies: MasterCompany[] = [];
    Active: string;
    AuditDetails: SingleScreenAuditDetails[];
    memoNotes: string;
    memoPopupText: string;
    code: any = "";
    name: any = "";
    memo: any = "";
    selectedreason: any;
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    allunitData: any;
    code_Name: any = "";
    cols: any[];
    updatedDate: any = "";
    selectedColumns: any[];
    localCollection: any[] = [];
    disableSave: boolean = false;
    isSaving: boolean;
    assetAcquistionTypeId: number = 0;
    private isDelete: boolean = false;
    codeName: string = "";
    allreasn: any[] = [];
    existingRecordsResponse: Object;
    loadingIndicator: boolean;
    auditHistory: any[] = [];
    isEdit: boolean = false;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    displayedColumns = ['Code', 'Name', 'Memo'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    /** AssetAcquistionType ctor */

    paginatorState: { rows: number; first: number; };
    totalRecords: number;
    first: number;
    rows: number;
    loading: boolean;
    disposalTypePagination: AssetAcquistionType[];


    constructor(private alertService: AlertService, private assetAcquistionTypeService: AssetAcquistionTypeService, private modalService: NgbModal, private authService: AuthService, private breadCrumb: SingleScreenBreadcrumbService, private masterComapnyService: MasterComapnyService, private configurations: ConfigurationService) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.sourceAction = new AssetAcquistionType();
    
    }

    ngOnInit(): void {
        this.loadData();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/asset-acquistion-type';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.assetAcquistionTypeService.getAll().subscribe(data => {
            this.allunitData = data[0].columHeaders;
            this.assetAcquistionTypeList = data[0].columnData;
            console.log(this.assetAcquistionTypeList);
            this.totalRecords = this.assetAcquistionTypeList.length;
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

    public allWorkFlows: AssetAcquistionType[] = [];

    private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
        // debugger;
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.auditHisory = auditHistory;
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
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

    filterAssetAcquistionType(event) {
        this.localCollection = [];

        for (let i = 0; i < this.assetAcquistionTypeList.length; i++) {

            let codeName = this.assetAcquistionTypeList[i].code
                ;

            if (codeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                console.log(codeName);
                this.allreasn.push([{
                    "assetAcquistionTypeId": this.assetAcquistionTypeList[i].assetAcquistionTypeId,
                    "codeName": codeName
                }]),
                    this.localCollection.push(codeName);
            }
        }
    }
    
    resetdepriciationmethod(): void {
        this.updateMode = false;
        this.currentAssetAcquistionType = new AssetAcquistionType();
    }

    open(content) {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new AssetAcquistionType();
        this.sourceAction.isActive = true;

        this.codeName = "";
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
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
          
        this.assetAcquistionTypeId = this.assetAcquistionTypeId;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    SaveandEditAssetAcquistionType() {
        // debugger;


        this.isSaving = true;
        console.log(this);

        const params = <any>{
            createdBy: this.userName,
            updatedBy: this.userName,
            Code: this.codeName,
            Name: this.sourceAction.name,
            Memo: this.sourceAction.memo,
            assetAcquistionTypeId: this.sourceAction.assetAcquistionTypeId,
            IsActive: this.sourceAction.isActive,
            IsDelete: this.isDelete,
            masterCompanyId: 1
        };
        if (this.isEditMode == false) {
            this.assetAcquistionTypeService.add(params).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {
            params.AssetDisposalTypeId = this.sourceAction.assetAcquistionTypeId;
            this.assetAcquistionTypeService.update(params).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.assetAcquistionTypeService.remove(this.sourceAction.assetAcquistionTypeId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    private saveSuccessHelper(role?: AssetAcquistionType) {
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

    private saveCompleted(user?: AssetAcquistionType) {
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
            Code: rowData.code,
            Name: rowData.name,
            Memo: rowData.memo,
            isActive: rowData.isActive,
            IsDelete: false,
            masterCompanyId: 1,
            assetAcquistionTypeId: rowData.assetAcquistionTypeId
        };
        if (e.checked == false) {
            this.Active = "In Active";
            this.assetAcquistionTypeService.update(params).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }
        else {
            this.Active = "Active";
            this.assetAcquistionTypeService.update(params).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

    }

    openView(content, row) {
        console.log(content);
        this.sourceAction = row;
        this.code = row.code;
        this.name = row.name;
        this.memo = row.memo;
        this.createdBy = row.createdBy;
        this.updatedBy = row.updatedBy;
        this.createdDate = row.createdDate;
        this.updatedDate = row.updatedDate;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    openDelete(content, row) {
        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceAction = row;
        this.code_Name = row.code;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    
     resetAddAssetAcquistionType(): void {
        this.currentAssetAcquistionType = new AssetAcquistionType();
    }

    resetUpdateAssetAcquistionType(): void {
        this.assetAcquistionTypeToUpdate = new AssetAcquistionType();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

 
    getAuditHistoryById(rowData) {
        this.assetAcquistionTypeService.getAssetAudit(rowData.assetAcquistionTypeId).subscribe(res => {
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

    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=AssetAcquistionType&fileName=AssetAcquistionType.xlsx`;

        window.location.assign(url);
    }

    customExcelUpload(event) {
        const file = event.target.files;

        console.log(file);
        if (file.length > 0) {

            this.formData.append('file', file[0])
            this.assetAcquistionTypeService.AssetAcquistionTypeCustomUpload(this.formData).subscribe(res => {
                event.target.value = '';

                this.formData = new FormData();
                this.existingRecordsResponse = res;
                this.getAssetAcquistionTypeList();
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

    getAssetAcquistionTypeList() {

        this.loadData();
    }
}