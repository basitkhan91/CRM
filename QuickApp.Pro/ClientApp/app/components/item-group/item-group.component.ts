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
import { getObjectByValue, validateRecordExistsOrNot, selectedValueValidate, editValueAssignByCondition, getObjectById } from '../../generic/autocomplete';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-item-group',
    templateUrl: './item-group.component.html',
    styleUrls: ['./item-group.component.scss'],
    animations: [fadeInOut]

})
/** Actions component*/
export class ItemGroupComponent implements OnInit {
    originalData: any;
    isEdit: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    headers = [
        { field: 'itemGroupCode', header: 'Item Group ID' },
        { field: 'description', header: 'Item Group Name' },
        { field: 'memo', header: 'Memo' },
    ]
    selectedColumns = this.headers;
    formData = new FormData()
    @ViewChild('dt')

    private table: Table;
    auditHistory: any[] = [];
    disableSaveGroupId: boolean = false;
    groupIdList: any;
    disableSaveForDescription: boolean = false;
    descriptionList: any;

    new = {
        itemGroupCode: "",
        description: "",
        masterCompanyId: 1,
        isActive: true,
        memo: "",
    }
    addNew = { ...this.new };
    selectedRecordForEdit: any;
    viewRowData: any;
    selectedRowforDelete: any;
    // originalData: any;
    existingRecordsResponse = []
    // existingRecordsResponse: Object;
    // selectedRecordForEdit: any;
    // disableSaveForShortName: boolean = false;
    // shortNameList: any;
    // dataOriginal: any;

    constructor(private breadCrumb: SingleScreenBreadcrumbService,
        private authService: AuthService,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private _fb: FormBuilder,
        private alertService: AlertService,
        public itemGroupService: ItemGroupService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        // this.displayedColumns.push('action');
        // this.dataSource = new MatTableDataSource();
        // this.sourceAction = new Itemgroup();

    }


    ngOnInit(): void {
        this.getList();
        // this.loadData();
        // this.cols = [
        //    // { field: 'itemGroupId', header: 'IGID' },

        //     // { field: 'createdBy', header: 'Created By' },
        //     // { field: 'updatedBy', header: 'Updated By' },
        //     //{ field: 'updatedDate', header: 'Updated Date' },
        //     //{ field: 'createdDate', header: 'Created Date' }
        // ];
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-item-group';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        // this.selectedColumns = this.cols;
    }



    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        this.table.reset();

        // this.table.sortOrder = 0;
        // this.table.sortField = '';

        this.getList();
    }

    customExcelUpload(event) {
        // const file = event.target.files;

        // console.log(file);
        // if (file.length > 0) {

        //     this.formData.append('file', file[0])
        //     this.unitofmeasureService.UOMFileUpload(this.formData).subscribe(res => {
        //         event.target.value = '';

        //         this.formData = new FormData();
        //         this.existingRecordsResponse = res;
        //         this.getList();
        //         this.alertService.showMessage(
        //             'Success',
        //             `Successfully Uploaded  `,
        //             MessageSeverity.success
        //         );

        //     })
        // }

    }
    sampleExcelDownload() {
        // const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=UnitOfMeasure&fileName=uom.xlsx`;

        // window.location.assign(url);
    }

    getList() {
        this.itemGroupService.getWorkFlows().subscribe(res => {
            const responseData = res[0];
            // this.uomHeaders = responseData.columHeaders;
            // this.selectedColumns = responseData.columHeaders;
            this.originalData = responseData;
            this.totalRecords = responseData.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        })
    }
    changePage(event: { first: any; rows: number }) {
        console.log(event);
        const pageIndex = (event.first / event.rows);
        // this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }


    checkGroupIdExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.originalData, this.selectedRecordForEdit);
        if (exists.length > 0) {
            this.disableSaveGroupId = true;
        }
        else {
            this.disableSaveGroupId = false;
        }

    }
    filtergroupId(event) {
        this.groupIdList = this.originalData;

        const groupIdData = [...this.originalData.filter(x => {
            return x.itemGroupCode.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.groupIdList = groupIdData;
    }
    selectedGroupId(object) {
        const exists = selectedValueValidate('itemGroupCode', object, this.selectedRecordForEdit)

        this.disableSaveGroupId = !exists;
    }

    checkGroupDescriptionExists(field, value) {
        console.log(this.selectedRecordForEdit);
        const exists = validateRecordExistsOrNot(field, value, this.originalData, this.selectedRecordForEdit);
        if (exists.length > 0) {
            this.disableSaveForDescription = true;
        }
        else {
            this.disableSaveForDescription = false;
        }

    }
    filterDescription(event) {
        this.descriptionList = this.originalData;

        const descriptionData = [...this.originalData.filter(x => {
            return x.description.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.descriptionList = descriptionData;
    }
    selectedDescription(object) {
        const exists = selectedValueValidate('description', object, this.selectedRecordForEdit)

        this.disableSaveForDescription = !exists;
    }

    save() {
        const data = {
            ...this.addNew, createdBy: this.userName, updatedBy: this.userName,
            itemGroupCode: editValueAssignByCondition('itemGroupCode', this.addNew.itemGroupCode),
            description: editValueAssignByCondition('description', this.addNew.description),
            // unitName: editValueAssignByCondition('description', this.addNew.unitName)
        };
        if (!this.isEdit) {
            this.itemGroupService.newAction(data).subscribe(() => {
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Unit of Measurment  Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.itemGroupService.updateAction(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Unit of Measurment  Successfully  `,
                    MessageSeverity.success
                );
            })
        }
    }

    resetForm() {
        this.isEdit = false;
        this.selectedRecordForEdit = undefined;
        this.addNew = { ...this.new };
    }


    edit(rowData) {
        console.log(rowData);
        this.isEdit = true;
        this.disableSaveGroupId = false;
        this.disableSaveForDescription = false;


        this.addNew = {
            ...rowData,
            itemGroupCode: getObjectById('itemGroupId', rowData.itemGroupId, this.originalData),
            description: getObjectByValue('description', rowData.description, this.originalData),
        };
        this.selectedRecordForEdit = { ...this.addNew }

    }

    changeStatus(rowData) {
        console.log(rowData);
        const data = { ...rowData }
        this.itemGroupService.updateAction(data).subscribe(() => {
            // this.getUOMList();
            this.alertService.showMessage(
                'Success',
                `Updated Status Successfully  `,
                MessageSeverity.success
            );
        })

    }
    viewSelectedRow(rowData) {
        console.log(rowData);
        this.viewRowData = rowData;
    }
    resetViewData() {
        this.viewRowData = undefined;
    }
    delete(rowData) {
        this.selectedRowforDelete = rowData;

    }
    deleteConformation(value) {
        if (value === 'Yes') {
            this.itemGroupService.deleteAcion(this.selectedRowforDelete.itemGroupId).subscribe(() => {
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Deleted ItemGroup Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    getAuditHistoryById(rowData) {
        this.itemGroupService.historyAcion(rowData.itemGroupId).subscribe(res => {
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


    // ngAfterViewInit() {
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    // }
    // public allWorkFlows: Itemgroup[] = [];
    // validateRecordExistsOrNot(field: string, currentInput: any, originalData: any) {
    //     // console.log(field, currentInput, originalData)
    //     if ((field !== '' || field !== undefined) && (currentInput !== '' || currentInput !== undefined) && (originalData !== undefined)) {
    //         const data = originalData.filter(x => {
    //             return x[field].toLowerCase() === currentInput.toLowerCase()
    //         })
    //         return data;
    //     }
    // }
    // editValueAssignByCondition(field: any, value: any) {
    //     console.log(field, value)
    //     if ((value !== undefined) && (field !== '' || field !== undefined)) {

    //         if (typeof (value) === 'string') {
    //             return value
    //         }
    //         else {
    //             return this.getValueFromObjectByKey(field, value)
    //         }
    //     }
    // }
    // getValueFromObjectByKey(field: string, object: any) {
    //     console.log(field, object)
    //     if ((field !== '' || field !== undefined) && (object !== undefined)) {
    //         return object[field];
    //     }
    // }
    // private loadData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.workFlowtService.getWorkFlows().subscribe(
    //         results => this.onDataLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    // }

    // private loadMasterCompanies() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.masterComapnyService.getMasterCompanies().subscribe(
    //         results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
    //         error => this.onDataLoadFailed(error)
    //     );

    // }

    // public applyFilter(filterValue: string) {
    //     this.dataSource.filter = filterValue;
    // }


    // private onDataLoadSuccessful(allWorkFlows: Itemgroup[]) {
    //     // alert('success');
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.totalRecords = allWorkFlows.length
    //     this.allitemgroupobjInfo = allWorkFlows;


    // }

    // private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
    //     // alert('success');
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.allComapnies = allComapnies;

    // }

    // private onDataLoadFailed(error: any) {
    //     // alert(error);
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;

    // }

    // open(content) {

    //     this.isEditMode = false;
    //     this.isDeleteMode = false;
    //     this.disableSave = false;
    //     this.disableCode = false;
    //     this.isSaving = true;
    //     this.loadMasterCompanies();
    //     this.sourceAction = new Itemgroup();
    //     this.sourceAction.isActive = true;
    //     this.sourceAction.itemgroupCode = "";
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }


    // openDelete(content, row) {
    //     this.isEditMode = false;
    //     this.isDeleteMode = true;
    //     this.sourceAction = row;
    //     this.itemGroup_Name = row.itemGroupCode;
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // openEdit(content, row) {
    //     this.disableSave = false;
    //     this.disableCode = false;
    //     this.isEditMode = true;
    //     this.isSaving = true;
    //     this.loadMasterCompanies();
    //     this.sourceAction = { ...row };
    //     this.sourceAction.itemgroupCode = getObjectByValue('itemGroupCode', row.itemGroupCode, this.allitemgroupobjInfo)
    //     this.sourceAction.description = getObjectByValue('description', row.description, this.allitemgroupobjInfo);
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // openHist(content, row) {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.sourceAction = row;
    //     this.isSaving = true;
    //     this.workFlowtService.historyAcion(this.sourceAction.itemGroupId).subscribe(
    //         results => this.onHistoryLoadSuccessful(results[0], content),
    //         error => this.saveFailedHelper(error));


    // }

    // openView(content, row) {

    //     this.sourceAction = row;
    //     this.itemGroup_Name = row.itemGroupCode;
    //     this.description = row.description;
    //     this.memo = row.memo;
    //     this.createdBy = row.createdBy;
    //     this.updatedBy = row.updatedBy;
    //     this.createdDate = row.createdDate;
    //     this.updatedDate = row.updatedDate;
    //     this.loadMasterCompanies();
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }
    // openHelpText(content) {
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // eventHandler(field, value) {
    //     value = value.trim();
    //     const exists = this.validateRecordExistsOrNot(field, value, this.allitemgroupobjInfo);
    //     // console.log(exists);
    //     if (exists.length > 0) {
    //         this.disableSave = true;
    //     }
    //     else {
    //         this.disableSave = false;
    //     }
    // }
    // itemDescription(field, value) {
    //     value = value.trim();
    //     const data = this.validateRecordExistsOrNot(field, value, this.allitemgroupobjInfo);
    //     if (data.length > 0) {
    //         this.disableCode = true;
    //     }
    //     else {
    //         this.disableCode = false;
    //     }
    // }

    // itemGroupId(event) {
    //     this.disableSave = true;
    // }
    // itemGroupDescription(event) {
    //     this.disableCode = true;
    // }

    // filterItemgroups(event) {
    //     this.localCollection = this.allitemgroupobjInfo;
    //     if (event.query !== undefined && event.query !== null) {
    //         const itemGroup = [...this.allitemgroupobjInfo.filter(x => {
    //             return x.itemGroupCode.toLowerCase().includes(event.query.toLowerCase())
    //         })]
    //         this.localCollection = itemGroup;
    //     }
    // }
    // filterItemgroupDescription(event) {
    //     this.localCollection = this.allitemgroupobjInfo;
    //     if (event.query !== undefined && event.query !== null) {
    //         const itemDescription = [...this.allitemgroupobjInfo.filter(x => {
    //             return x.description.toLowerCase().includes(event.query.toLowerCase())
    //         })]
    //         this.localCollection = itemDescription;
    //     }
    // }
    // private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;

    //     this.auditHisory = auditHistory;


    //     this.modal = this.modalService.open(content, { size: 'lg' });

    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })


    // }


    // editItemAndCloseModel() {

    //     this.isSaving = true;

    //     if (this.isEditMode == false) {

    //         this.sourceAction.createdBy = this.userName;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.itemGroupCode = this.sourceAction.itemgroupCode;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.workFlowtService.newAction(this.sourceAction).subscribe(
    //             role => this.saveSuccessHelper(role),
    //             error => this.saveFailedHelper(error));
    //     }
    //     else {

    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.itemgroupCode = this.editValueAssignByCondition('itemGroupCode', this.sourceAction.itemgroupCode);
    //         this.sourceAction.description = this.editValueAssignByCondition('description', this.sourceAction.description);
    //         //this.sourceAction.itemGroupCode = this.sourceAction.itemGroupName;            
    //         this.sourceAction.masterCompanyId = 1;
    //         this.workFlowtService.updateAction(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //     }

    //     this.modal.close();
    // }

    // handleChange(rowData, e) {
    //     if (e.checked == false) {
    //         console.log('Smoe2');
    //         this.sourceAction = rowData;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.Active = "In Active";
    //         this.sourceAction.isActive == false;
    //         this.loadMasterCompanies();
    //         this.sourceAction.masterCompanyId = 1;
    //         this.workFlowtService.updateAction(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //         //alert(e);
    //     }
    //     else {
    //         console.log('Smoe3');
    //         this.sourceAction = rowData;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.Active = "Active";
    //         this.sourceAction.isActive == true;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.workFlowtService.updateAction(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //         //alert(e);
    //     }

    // }
    // deleteItemAndCloseModel() {
    //     this.isSaving = true;
    //     this.sourceAction.updatedBy = this.userName;
    //     this.workFlowtService.deleteAcion(this.sourceAction.itemGroupId).subscribe(
    //         response => this.saveCompleted(this.sourceAction),
    //         error => this.saveFailedHelper(error));
    //     this.modal.close();
    // }

    // dismissModel() {
    //     this.isDeleteMode = false;
    //     this.isEditMode = false;
    //     this.modal.close();
    // }

    // private saveCompleted(user?: Itemgroup) {
    //     this.isSaving = false;

    //     if (this.isDeleteMode == true) {
    //         this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
    //         this.isDeleteMode = false;
    //     }
    //     else {
    //         this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

    //     }

    //     this.loadData();
    // }

    // private saveSuccessHelper(role?: Itemgroup) {
    //     this.isSaving = false;
    //     this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

    //     this.loadData();

    // }

    // get userName(): string {
    //     return this.authService.currentUser ? this.authService.currentUser.userName : "";
    // }

    // private saveFailedHelper(error: any) {
    //     this.isSaving = false;
    //     this.alertService.stopLoadingMessage();
    //     this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
    //     this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    // }

    // private getDismissReason(reason: any): string {
    //     if (reason === ModalDismissReasons.ESC) {
    //         return 'by pressing ESC';
    //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //         return 'by clicking on a backdrop';
    //     } else {
    //         return `with: ${reason}`;
    //     }
    // }

    // showAuditPopup(template, id): void {
    //     this.auditItemGroup(id);
    //     this.modal = this.modalService.open(template, { size: 'sm' });
    // }

    // auditItemGroup(itemGroupId: number): void {
    //     this.AuditDetails = [];
    //     this.workFlowtService.getItemGroupAudit(itemGroupId).subscribe(audits => {
    //         if (audits.length > 0) {
    //             this.AuditDetails = audits;
    //             this.AuditDetails[0].ColumnsToAvoid = ["itemGroupAuditId", "itemGroupId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
    //         }
    //     });
    // }

    // loadItemGroup(event: LazyLoadEvent) //when page initilizes it will call this method
    // {
    //     this.loading = true;
    //     this.rows = event.rows;
    //     this.first = event.first;
    //     if (this.field) {
    //         this.itemGroup.push({
    //             ItemGroupCode: this.itemGroupCodeInputFieldValue,
    //             description: this.descriptionInputFieldValue,
    //             memo: this.memoInputFieldValue,
    //             Memo: this.memoInputFieldValue,
    //             CreatedBy: this.createdByInputFieldValue,
    //             UpdatedBy: this.updatedByInputFieldValue,
    //             first: this.first,
    //             page: 10,
    //             pageCount: 10,
    //             rows: this.rows,
    //             limit: 5
    //         })
    //         if (this.itemGroup) {
    //             this.workFlowtService.getServerPages(this.itemGroup[this.itemGroup.length - 1]).subscribe( //we are sending event details to service
    //                 pages => {
    //                     this.itemGroupPaginationList = pages;
    //                     this.itemGroupPagination = this.itemGroupPaginationList[0].itemGroupList;
    //                     this.totalRecords = this.itemGroupPaginationList[0].totalRecordsCount;
    //                     this.totelPages = Math.ceil(this.totalRecords / this.rows);
    //                 });
    //         }
    //         else {
    //         }
    //     }

    //     else {
    //         setTimeout(() => {
    //             if (this.allitemgroupobjInfo) {
    //                 this.workFlowtService.getServerPages(event).subscribe( //we are sending event details to service
    //                     pages => {
    //                         this.itemGroupPaginationList = pages;
    //                         this.itemGroupPagination = this.itemGroupPaginationList[0].itemGroupList;
    //                         this.totalRecords = this.itemGroupPaginationList[0].totalRecordsCount;
    //                         this.totelPages = Math.ceil(this.totalRecords / this.rows);
    //                     });
    //                 this.loading = false;
    //             }
    //         }, 1000);
    //     }

    // }

    //     updatePaginatorState() //need to pass this Object after update or Delete to get Server Side pagination
    //     {
    //         this.paginatorState = {
    //             rows: this.rows,
    //             first: this.first
    //         }
    //         if (this.paginatorState) {
    //             this.loadItemGroup(this.paginatorState);
    //         }
    //     }

    //     inputFiledFilter(event, filed, matchMode) {
    //         this.first = 0;
    //         this.event = event;
    //         this.field = filed;
    //         this.matchMode = matchMode;

    //         if (filed == 'itemGroupCode') {
    //             this.itemGroupCodeInputFieldValue = event;
    //         }
    //         if (filed == 'description') {
    //             this.descriptionInputFieldValue = event;
    //         }
    //         if (filed == 'memo') {
    //             this.memoInputFieldValue = event;
    //         }
    //         if (filed == 'createdBy') {
    //             this.createdByInputFieldValue = event;
    //         }
    //         if (filed == 'updatedBy') {
    //             this.updatedByInputFieldValue = event;
    //         }

    //         this.itemGroup.push({
    //             ItemGroupCode: this.itemGroupCodeInputFieldValue,
    //             description: this.descriptionInputFieldValue,
    //             memo: this.memoInputFieldValue,
    //             Memo: this.memoInputFieldValue,
    //             CreatedBy: this.createdByInputFieldValue,
    //             UpdatedBy: this.updatedByInputFieldValue,
    //             first: this.first,
    //             page: 10,
    //             pageCount: 10,
    //             rows: this.rows,
    //             limit: 5
    //         })
    //         if (this.itemGroup) {
    //             this.workFlowtService.getServerPages(this.itemGroup[this.itemGroup.length - 1]).subscribe( //we are sending event details to service
    //                 pages => {
    //                     this.itemGroupPaginationList = pages;
    //                     this.itemGroupPagination = this.itemGroupPaginationList[0].itemGroupList;
    //                     this.totalRecords = this.itemGroupPaginationList[0].totalRecordsCount;
    //                     this.totelPages = Math.ceil(this.totalRecords / this.rows);
    //                 });
    //         }
    //         else {
    //         }
    //     }
}