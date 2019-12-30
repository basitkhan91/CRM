import { Component, OnInit, ViewChild } from '@angular/core';
import { DisposalTypeService } from '../../services/disposal-type/disposaltype.service';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { DisposalType } from '../../models/disposal-type.model';
import { fadeInOut } from '../../services/animations';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { SingleScreenAuditDetails } from '../../models/single-screen-audit-details.model';
import { SingleScreenBreadcrumbService } from '../../services/single-screens-breadcrumb.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuditHistory } from '../../models/audithistory.model';
import { MasterCompany } from '../../models/mastercompany.model';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
    selector: 'app-disposal-type',
    templateUrl: './disposal-type.component.html',
    styleUrls: ['./disposal-type.component.scss'],
    animations: [fadeInOut]
})
/** DisposalType component*/
export class DisposalTypeComponent implements OnInit {
    currentDisposalType: DisposalType;
    dataSource: MatTableDataSource<DisposalType>;
    disposalTypeList: DisposalType[] = [];
    disposalTypeToUpdate: DisposalType;
    updateMode: boolean;
    selectedData: any;
    formData = new FormData();
    public auditHisory: AuditHistory[] = [];
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    public sourceAction: DisposalType;
    selectedRow: any;
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
    auditHistory: any[] = [];
    selectedreason: any;
    memoNotes: string = 'This is  memo';
    AuditDetails: SingleScreenAuditDetails[];
    allunitData: any;
    code_Name: any = "";
    localCollection: any[] = [];
    disableSave: boolean = false;
    isSaving: boolean;
    private isDelete: boolean = false;
    codeName: string = "";
    existingRecordsResponse: Object;
    isEdit: boolean = false;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    recordExists: boolean = false;
    selAssetDisposalTypeId: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    /** DisposalType ctor */

    paginatorState: { rows: number; first: number; };
    totalRecords: number;
    first: number;
    rows: number;
    loading: boolean;
    disposalTypePagination: DisposalType[];

    

    constructor(private breadCrumb: SingleScreenBreadcrumbService, private alertService: AlertService, private disposalTypeService: DisposalTypeService, private authService: AuthService, private modalService: NgbModal, private masterComapnyService: MasterComapnyService, private configurations: ConfigurationService) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.sourceAction = new DisposalType();
    }

    ngOnInit(): void {
        this.loadData();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-disposal-type';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.disposalTypeService.getAll().subscribe(data => {
            this.allunitData = data[0].columHeaders;
            this.disposalTypeList = data[0].columnData;
            console.log(this.disposalTypeList);
            this.totalRecords = this.disposalTypeList.length;
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

    public allWorkFlows: DisposalType[] = [];

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
            console.log(191);
            if (value == this.selectedreason.toLowerCase() &&
                (this.isEditMode && this.selAssetDisposalTypeId != this.selectedRow.assetDisposalTypeId || !this.isEditMode)
            ) {
                this.disableSave = true;
                this.recordExists = true;
            }
            else {
                this.disableSave = false;
                this.recordExists = false;
            }
        }
    }

    partnmId(event) {
        //console.log(event.target.value)
        for (let i = 0; i < this.allreasn.length; i++) {
            if (event == this.allreasn[i][0].codeName) {
                this.selAssetDisposalTypeId = this.allreasn[i][0].assetDisposalTypeId;
                if ((this.isEditMode && this.selAssetDisposalTypeId != this.selectedRow.assetDisposalTypeId || !this.isEditMode)) {
                    this.disableSave = true;
                    this.recordExists = true;
                }
                else {
                    this.disableSave = false;
                    this.recordExists = false;
                }
                this.selectedreason = event;
                console.log(this.allreasn[i][0]);
            }
        }
    }

    filterDisposalType(event) {
        this.localCollection = [];
     
        for (let i = 0; i < this.disposalTypeList.length; i++) {
           
            let codeName = this.disposalTypeList[i].code
                ;
           
            if (codeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                console.log(codeName);
                this.allreasn.push([{
                    "assetDisposalTypeId": this.disposalTypeList[i].assetDisposalTypeId,
                    "codeName": codeName
                }]),
                    this.localCollection.push(codeName);
            }
        }
    }

    resetdepriciationmethod(): void {
        this.updateMode = false;
        this.currentDisposalType = new DisposalType();
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
        this.recordExists = false;
        this.loadMasterCompanies();
        this.sourceAction = new DisposalType();
        this.sourceAction.isActive = true;
       
        this.codeName = "";
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openEdit(content, row) {
       
        this.isEditMode = true;
        this.disableSave = true;
        this.recordExists = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = row;
        this.selectedRow = row;
        
        this.codeName = row.code;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    SaveandEditDisposalType() {
        // debugger;
     
        this.isSaving = true;
        console.log(this);
      
        const params = <any>{
            createdBy: this.userName,
            updatedBy: this.userName,
            AssetDisposalCode: this.codeName,
            AssetDisposalName: this.sourceAction.name,
            AssetDisposalMemo: this.sourceAction.memo,

            IsActive: this.sourceAction.isActive,
            IsDeleted: this.isDelete,
            masterCompanyId: 1
        };
        if (this.isEditMode == false) {
            this.disposalTypeService.add(params).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {
            params.AssetDisposalTypeId = this.sourceAction.assetDisposalTypeId;
            this.disposalTypeService.update(params).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.disposalTypeService.remove(this.sourceAction.assetDisposalTypeId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    private saveSuccessHelper(role?: DisposalType) {
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

    private saveCompleted(user?: DisposalType) {
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
            AssetDisposalTypeId: rowData.assetDisposalTypeId,
            AssetDisposalCode: rowData.code,
            AssetDisposalName: rowData.name,
            AssetDisposalMemo: rowData.memo,
            isActive: rowData.isActive,
            IsDeleted: false,
            masterCompanyId: 1
        };
        if (e.checked == false) {
            this.Active = "In Active";       
            this.disposalTypeService.update(params).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }
        else {
            this.Active = "Active";
            this.disposalTypeService.update(params).subscribe(
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

    //showAuditPopup(template, id): void {
    //    this.getAssetDepreciationAudits(id);
    //    this.modal = this.modalService.open(template, { size: 'sm' });
    //}

    //getAssetDepreciationAudits(AssetDisposalTypeId: number): void {
    //    this.AuditDetails = [];
    //    this.disposalTypeService.getDisposalAudit(AssetDisposalTypeId).subscribe(audits => {
    //        if (audits.length > 0) {
    //            this.AuditDetails = audits;
    //            this.AuditDetails[0].ColumnsToAvoid = ["assetDisposalTypeAuditId", "AssetDisposalTypeId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
    //        }
    //    });
    //}


    getAuditHistoryById(rowData) {
        this.disposalTypeService.getDisposalAudit(rowData.assetDisposalTypeId).subscribe(res => {
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
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=DisposalType&fileName=DispType.xlsx`;

        window.location.assign(url);
    }

    customExcelUpload(event) {
        const file = event.target.files;

        console.log(file);
        if (file.length > 0) {

            this.formData.append('file', file[0])
            this.disposalTypeService.DispTypeCustomUpload(this.formData).subscribe(res => {
                event.target.value = '';

                this.formData = new FormData();
                this.existingRecordsResponse = res;
                this.getDispTypeList();
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

    getDispTypeList() {

        this.loadData();
    }

    onBlurCheck(event, type, field) {
        console.log(event.target.value);
        if (this.isEditMode) {
            if (this.selectedRow[field] == event.value) {
                this.disableSave = true;
            }
            else {
                this.disableSave = false;
            }
        }
    }

    enableSave() {
        console.log('on change triggered');
        this.disableSave = false;
    }

}