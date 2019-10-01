import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { UnitOfMeasureService } from '../../services/unitofmeasure.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { validateRecordExistsOrNot, editValueAssignByCondition, getObjectById, selectedValueValidate, getObjectByValue } from '../../generic/autocomplete';
import { Table } from 'primeng/table';
import * as $ from 'jquery';

@Component({
    selector: 'app-unit-of-measure',
    templateUrl: './unit-of-measure.component.html',
    styleUrls: ['./unit-of-measure.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class UnitOfMeasureComponent implements OnInit {
    // uomHeaders: any;
    uomData: any;
    // selectedColumns: any = [];
    viewRowData: any;
    selectedRowforDelete: any;
    newUOM =
        {
            description: "",
            shortName: "",
            standard: "",
            masterCompanyId: 1,
            isActive: true,
            isDelete: false,
            memo: "",
            unitName: ''
        }
    addNewUOM = { ...this.newUOM };
    disableSaveForUOM: boolean = false;
    uomList: any;
    isEdit: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    uomHeaders = [
        { field: 'description', header: 'Unit Of Measure' },
        { field: 'shortName', header: 'Short Name' },
        { field: 'standard', header: 'Standard' },
        { field: 'memo', header: 'Memo' },
    ]
    selectedColumns = this.uomHeaders;
    formData = new FormData()
    // paginationBoolean: string = 'true';

    // {"description":"",
    // "shortName":"SAmple",
    // "standard":"Standard",
    // "masterCompanyId":1,
    // "createdBy":"admin",
    // "updatedBy":"admin",
    // "isActive":true,
    // "isDelete":false,
    // "memo":"Memo",
    // "unitName":"Feets"}

    // unitOfMeasurePaginationList: any[] = [];
    // totelPages: number;
    // updatedByInputFieldValue: any;
    // createdByInputFieldValue: any;
    // unitOfMeasure = [];
    // memoInputFieldValue: any;
    // standardInputFieldValue: any;
    // shortNameInputFieldValue: any;
    // descriptionInputFieldValue: any;
    // matvhMode: any;
    // field: any;
    // event: any;
    // paginatorState: { rows: number; first: number; };
    // totalRecords: number;
    // first: number;
    // rows: number;
    // loading: boolean;
    // selectedActionName: any;
    // actionamecolle: any[] = [];
    // disableSave: boolean = false;
    // unitofmeasure_Name: any = "";
    // shortName: any = "";
    // standard: any = "";
    // memo: any = "";
    // createdBy: any = "";
    // updatedBy: any = "";
    // createdDate: any = "";
    // updatedDate: any = "";
    // AuditDetails: SingleScreenAuditDetails[];
    // unitOfMeasurePagination: UnitOfMeasure[];//added

    // isSaving: boolean;

    @ViewChild('dt')
    private table: Table;
    auditHistory: any[] = [];
    existingRecordsResponse: Object;
    selectedRecordForEdit: any;
    disableSaveForShortName: boolean = false;
    shortNameList: any;

    constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private alertService: AlertService, public unitofmeasureService: UnitOfMeasureService) {
        // this.displayedColumns.push('action');
        // this.dataSource = new MatTableDataSource();
        // this.sourceAction = new UnitOfMeasure();

    }
    ngOnInit(): void {
        this.getUOMList();
        // this.loadData();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-unit-of-measure';
        // this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ViewChild(MatSort) sort: MatSort;
    // Active: string = "Active";
    // displayedColumns = ['unitofmeasureId', 'description', 'shortname', 'standard', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    // dataSource: MatTableDataSource<UnitOfMeasure>;
    // allUnitOfMeasureinfo: any = [];
    // sourceAction: any;
    // allComapnies: MasterCompany[] = [];
    // public auditHisory: AuditHistory[] = [];
    // loadingIndicator: boolean;
    // actionForm: FormGroup;
    // title: string = "Create";
    // id: number;
    // errorMessage: any;
    // cols: any[];
    // selectedColumns: any[];
    // modal: NgbModalRef;
    // allunitData: any;
    // selectedColumn: UnitOfMeasure[];
    // unitName: any;
    // shortname: string;
    // filteredBrands: any[];
    // localCollection: any[] = [];
    // selectedData: any;
    // private isEditMode: boolean = false;
    // private isDelete: boolean = false;
    // uomEditTempInfo: any = {};



    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        this.table.reset();
        this.getUOMList();
    }

    customExcelUpload(event) {
        const file = event.target.files;

          console.log(file);
        if (file.length > 0) {

            this.formData.append('file', file[0])
            this.unitofmeasureService.UOMFileUpload(this.formData).subscribe(res => {
                event.target.value = '';
         
                this.formData = new FormData();
                this.existingRecordsResponse = res;
                this.getUOMList();
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
    sampleExcelDownload(){
        this.unitofmeasureService.downloadSampleExcel().subscribe(res => {
            
        })
    }

    getUOMList() {
        this.unitofmeasureService.getAllUnitofMeasureList().subscribe(res => {
            const responseData = res[0];
            console.log(responseData);
            // this.uomHeaders = responseData.columHeaders;
            // this.selectedColumns = responseData.columHeaders;
            this.uomData = responseData.columnData;
            this.totalRecords = responseData.totalRecords;
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


    checkUOMExists(field, value) {
        const   exists = validateRecordExistsOrNot(field, value, this.uomData , this.selectedRecordForEdit);
        if (exists.length > 0) {
            this.disableSaveForUOM = true;
        }
        else {
            this.disableSaveForUOM = false;
        }

    }
    filterUnitOfMeasures(event) {
        this.uomList = this.uomData;

        const UOMData = [...this.uomData.filter(x => {
            return x.description.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.uomList = UOMData;
    }
    selectedUOM(object) {
        const exists = selectedValueValidate( 'description' , object , this.selectedRecordForEdit  )

        this.disableSaveForUOM = !exists;
    }

    checkShortNameExists(field, value) {
        console.log(this.selectedRecordForEdit);
        const   exists = validateRecordExistsOrNot(field, value, this.uomData , this.selectedRecordForEdit);
        if (exists.length > 0) {
            this.disableSaveForShortName = true;
        }
        else {
            this.disableSaveForShortName = false;
        }

    }
    filterShortName(event) {
        this.shortNameList = this.uomData;

        const shortNameData = [...this.uomData.filter(x => {
            return x.shortName.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.shortNameList = shortNameData;
    }
    selectedShortName(object) {
        const exists = selectedValueValidate( 'shortName' , object , this.selectedRecordForEdit  )

        this.disableSaveForShortName = !exists;
    }

    saveUOM() {
        const data = {
            ...this.addNewUOM, createdBy: this.userName, updatedBy: this.userName,
            shortName : editValueAssignByCondition('shortName', this.addNewUOM.shortName),
            description: editValueAssignByCondition('description', this.addNewUOM.unitName),
            unitName: editValueAssignByCondition('description', this.addNewUOM.unitName)
        };
        if (!this.isEdit) {
            this.unitofmeasureService.newUnitOfMeasure(data).subscribe(() => {
                this.resetUOMForm();
                this.getUOMList();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Unit of Measurment  Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.unitofmeasureService.updateUnitOfMeasure(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.resetUOMForm();
                this.getUOMList();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Unit of Measurment  Successfully  `,
                    MessageSeverity.success
                );
            })
        }
    }

    resetUOMForm() {
        this.isEdit = false;
        this.selectedRecordForEdit = undefined;
        this.addNewUOM = { ...this.newUOM };
    }


    editUOM(rowData) {
        console.log(rowData);
        this.isEdit = true;
        this.disableSaveForUOM = false;
        this.disableSaveForShortName = false;
        // this.addNewUOM = rowData;

       this.addNewUOM = { ...rowData, unitName: getObjectById('unitOfMeasureId', rowData.unitOfMeasureId, this.uomData),
          shortName: getObjectByValue('shortName', rowData.shortName ,  this.uomData )
    };
       this.selectedRecordForEdit = {...this.addNewUOM}

    }

    changeStatus(rowData) {
        console.log(rowData);
        const data = { ...rowData }
        this.unitofmeasureService.updateUnitOfMeasure(data).subscribe(() => {
            this.getUOMList();
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

            this.unitofmeasureService.deleteUnitOfMeasure(this.selectedRowforDelete.unitOfMeasureId).subscribe(() => {
                this.getUOMList();
                this.alertService.showMessage(
                    'Success',
                    `Deleted UOM Successfully  `,
                    MessageSeverity.success
                );
            })

        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    getAuditHistoryById(rowData) {
        this.unitofmeasureService.getUnitOfWorkAuditDetails(rowData.unitOfMeasureId).subscribe(res => {
            this.auditHistory = res;
        })
    }
    // ngAfterViewInit() {
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    // }
    // validateRecordExistsOrNot(field: string, currentInput: any, originalData: any) {
    //     console.log(field, currentInput, originalData)
    //     if ((field !== '' || field !== undefined) && (currentInput !== '' || currentInput !== undefined) && (originalData !== undefined)) {
    //         const data = originalData.filter(x => {
    //             return x[field].toLowerCase() === currentInput.toLowerCase()

    //         })
    //         return data;
    //     }
    // }
    // public allWorkFlows: UnitOfMeasure[] = [];
    // private loadData() {
    //     this.unitofmeasureService.getAllUnitofMeasureList().subscribe(data => {
    //         this.allunitData = data[0].columHeaders;
    //         this.allUnitOfMeasureinfo = data[0].columnData;
    //         console.log(this.allUnitOfMeasureinfo);
    //         this.totalRecords = this.allUnitOfMeasureinfo.length;
    //         this.cols = [
    //             this.selectedColumns = this.allunitData

    //         ];
    //         this.selectedData = this.selectedColumns
    //     }
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




    // private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
    //     // debugger;
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.auditHisory = auditHistory;
    //     this.modal = this.modalService.open(content, { size: 'lg' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
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
    //     this.isDelete = false;
    //     this.disableSave = false;
    //     this.isSaving = true;
    //     this.loadMasterCompanies();
    //     this.sourceAction = new UnitOfMeasure();
    //     this.sourceAction.isActive = true;
    //     this.unitName = "";
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }


    // openDelete(content, row) {

    //     this.isEditMode = false;
    //     this.isDelete = true;
    //     this.sourceAction = row;
    //     this.unitofmeasure_Name = row.description;
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // openEdit(content, row) {
    //     this.isEditMode = true;
    //     this.disableSave = false;
    //     this.isSaving = true;
    //     this.loadMasterCompanies();
    //     this.sourceAction = {...row};        
    //     this.sourceAction.unitName = getObjectByValue('description', row.description, this.allUnitOfMeasureinfo)  
    //     console.log(this.unitName)     
    //     this.loadMasterCompanies();
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // openHist(content, row) {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;
    //     this.sourceAction = row;
    //     // debugger;
    //     this.unitofmeasureService.historyUnitOfMeasure(this.sourceAction.unitOfMeasureId).subscribe(
    //         results => this.onHistoryLoadSuccessful(results[0], content),
    //         error => this.saveFailedHelper(error));
    // }

    // openView(content, row) {
    //     this.sourceAction = row;
    //     this.unitofmeasure_Name = row.description;
    //     this.shortName = row.shortName;
    //     this.standard = row.standard;
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
    //     const exists = this.validateRecordExistsOrNot(field, value, this.allUnitOfMeasureinfo);

    //    // console.log(exists);
    //     if (exists.length > 0) {
    //         this.disableSave = true;
    //     }
    //     else {
    //         this.disableSave = false;
    //     }

    // }
    // partnmId(event) {
    //     //debugger;
    //     this.disableSave = true;

    // }

    // filterUnitOfMeasures(event) {
    //     this.localCollection = this.allUnitOfMeasureinfo;

    //     if (event.query !== undefined && event.query !== null) {
    //         const uom = [...this.allUnitOfMeasureinfo.filter(x => {
    //             return x.description.toLowerCase().includes(event.query.toLowerCase())
    //         })]
    //         this.localCollection = uom;
    //     }
    // }


    // handleChange(rowData, e) {
    //     if (e.checked == false) {
    //         this.sourceAction = rowData;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.Active = "In Active";
    //         this.sourceAction.isActive == false;
    //         this.loadMasterCompanies();
    //         this.sourceAction.masterCompanyId = 1;
    //         this.unitofmeasureService.updateUnitOfMeasure(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //     }
    //     else {
    //         this.sourceAction = rowData;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.Active = "Active";
    //         this.sourceAction.isActive == true;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.unitofmeasureService.updateUnitOfMeasure(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //         //alert(e);
    //     }

    // }


    // SaveandEditUOM() {
    //     // debugger;
    //     this.isSaving = true;
    //     if (this.isEditMode == false) {
    //         this.sourceAction.createdBy = this.userName;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.description = this.unitName;
    //         this.sourceAction.isDelete = this.isDelete;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.unitofmeasureService.newUnitOfMeasure(this.sourceAction).subscribe(
    //             role => this.saveSuccessHelper(role),
    //             error => this.saveFailedHelper(error));
    //     }
    //     else {
    //         console.log(this.unitName.description);
    //         this.sourceAction.description = this.sourceAction.unitName;
    //         this.sourceAction.updatedBy = this.userName;         
    //         this.sourceAction.masterCompanyId = 1;            
    //         this.unitofmeasureService.updateUnitOfMeasure(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //     }
    //     this.modal.close();
    // }

    // deleteItemAndCloseModel() {
    //     //this.isSaving = true;
    //     this.sourceAction.updatedBy = this.userName;
    //     this.unitofmeasureService.deleteUnitOfMeasure(this.sourceAction.unitOfMeasureId).subscribe(
    //         response => this.saveCompleted(this.sourceAction),
    //         error => this.saveFailedHelper(error));
    //     this.modal.close();
    // }

    // dismissModel() {
    //     this.isDelete = false;
    //     this.isEditMode = false;
    //     this.modal.close();
    // }

    // private saveCompleted(user?: UnitOfMeasure) {
    //     this.isSaving = false;

    //     if (this.isDelete == true) {
    //         this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
    //         this.isDelete = false;
    //     }
    //     else {
    //         this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

    //     }

    //     //this.updatePaginatorState();
    //     this.loadData();
    // }

    // private saveSuccessHelper(role?: UnitOfMeasure) {
    //     this.isSaving = false;
    //     this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

    //     //this.updatePaginatorState();
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

    // // private getDismissReason(reason: any): string {
    // //     debugger;
    // //     if (reason === ModalDismissReasons.ESC) {
    // //         return 'by pressing ESC';
    // //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    // //         return 'by clicking on a backdrop';
    // //     } else {
    // //         return `with: ${reason}`;
    // //     }
    // // }

    // showAuditPopup(template, id): void {
    //     debugger;
    //     this.getUnitOfMeasureAuditDetails(id);
    //     this.modal = this.modalService.open(template, { size: 'sm' });
    // }

    // getUnitOfMeasureAuditDetails(Id: number): void {
    //     this.unitofmeasureService.getUnitOfWorkAuditDetails(Id).subscribe(audits => {
    //         console.log(audits);
    //         if (audits != null)
    //             if (audits.length > 0) {
    //                 this.AuditDetails = audits;
    //                 this.AuditDetails[0].ColumnsToAvoid = ["unitOfMeasureAuditId", "unitOfMeasureId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
    //             }
    //     });
    // }
}