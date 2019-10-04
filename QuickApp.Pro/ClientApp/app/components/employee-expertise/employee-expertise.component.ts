import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeExpertiseService } from '../../services/employeeexpertise.service';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { getObjectByValue, validateRecordExistsOrNot, selectedValueValidate, editValueAssignByCondition } from '../../generic/autocomplete';
import { Table } from 'primeng/table';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
    selector: 'app-employee-expertise',
    templateUrl: './employee-expertise.component.html',
    styleUrls: ['./employee-expertise.component.scss'],
    animations: [fadeInOut]
})
/** EmployeeExpertise component*/
export class EmployeeExpertiseComponent implements OnInit {
    originalData: any;
    isEdit: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    headers = [
        { field: 'description', header: ' Employee Expertise ' },
        { field: 'memo', header: 'Memo' },
    ]
    selectedColumns = this.headers;
    formData = new FormData()
    @ViewChild('dt')

    private table: Table;
    auditHistory: any[] = [];
    disableSaveEmpExpertise: boolean = false;
    EmpExpertiseList: any;


    new = {
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
    constructor(private breadCrumb: SingleScreenBreadcrumbService,
        private authService: AuthService,
        private alertService: AlertService,
        public employeeService: EmployeeExpertiseService,
        private configurations: ConfigurationService) {


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
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-employee-expertise';
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

    customExcelUpload() {
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
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=EmployeeExpertise&fileName=employeeExpertise.xlsx`;

        window.location.assign(url);
    }

    getList() {
        this.employeeService.getWorkFlows().subscribe(res => {
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
        // this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }


    checkEmployeeExpertiseExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.originalData, this.selectedRecordForEdit);
        console.log(exists);
        if (exists.length > 0) {
            this.disableSaveEmpExpertise = true;
        }
        else {
            this.disableSaveEmpExpertise = false;
        }

    }
    filterEmployeeExpertise(event) {
        this.EmpExpertiseList = this.originalData;

        const EmpExpertiseData = [...this.originalData.filter(x => {
            return x.description.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.EmpExpertiseList = EmpExpertiseData;
    }
    selectedEmpExpertise(object) {
        const exists = selectedValueValidate('description', object, this.selectedRecordForEdit)

        this.disableSaveEmpExpertise = !exists;
    }



    save() {
        const data = {
            ...this.addNew, createdBy: this.userName, updatedBy: this.userName,
            description: editValueAssignByCondition('description', this.addNew.description),
            // unitName: editValueAssignByCondition('description', this.addNew.unitName)
        };
        if (!this.isEdit) {
            this.employeeService.newAction(data).subscribe(() => {
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Added Employee Expertise  Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.employeeService.updateAction(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Added  Employee Expertise  Successfully  `,
                    MessageSeverity.success
                );
            })
        }
    }

    resetForm() {
        this.isEdit = false;
        this.selectedRecordForEdit = undefined;
        this.disableSaveEmpExpertise = false;
        this.addNew = { ...this.new };
    }


    edit(rowData) {
        console.log(rowData);
        this.isEdit = true;
        this.disableSaveEmpExpertise = false;



        this.addNew = {
            ...rowData,
            description: getObjectByValue('description', rowData.description, this.originalData),
        };
        this.selectedRecordForEdit = { ...this.addNew }

    }

    changeStatus(rowData) {
        console.log(rowData);
        const data = { ...rowData }
        this.employeeService.updateAction(data).subscribe(() => {
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
            this.employeeService.deleteAcion(this.selectedRowforDelete.employeeExpertiseId).subscribe(() => {
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Deleted  Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    // getAuditHistoryById(rowData) {
    //     this.itemGroupService.historyAcion(rowData.itemGroupId).subscribe(res => {
    //         this.auditHistory = res;
    //     })
    // }
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
























    // ngOnInit(): void {
    //     this.loadData();
    //     this.cols = [
    //         //{ field: 'employeeExpertiseId', header: 'EmployeeExpertise Id' },
    //         { field: 'description', header: 'Employee Expertise' },
    //         { field: 'memo', header: 'Memo' },
    //         // { field: 'createdBy', header: 'Created By' },
    //         // { field: 'updatedBy', header: 'Updated By' },
    //         //{ field: 'updatedDate', header: 'Updated Date' },
    //         //{ field: 'createdDate', header: 'Created Date' }
    //     ];
    //     this.breadCrumb.currentUrl = '/singlepages/singlepages/app-employee-expertise';
    //     this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    //     this.selectedColumns = this.cols;
    // }

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
    // 	console.log(field, value)
    // 	if ((value !== undefined) && (field !== '' || field !== undefined)) {

    // 		if (typeof (value) === 'string') {
    // 			return value
    // 		} 
    // 		else {
    // 			return this.getValueFromObjectByKey(field, value)
    // 		}
    // 	}
    // }
    // getValueFromObjectByKey(field: string, object: any) {
    // 	console.log(field, object)
    // 	if ((field !== '' || field !== undefined) && (object !== undefined)) {
    // 		return object[field];
    // 	}
    // }
    // ngAfterViewInit() {
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    // }
    // public allWorkFlows: EmployeeExpertise[] = [];

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

    // private refresh() {
    //     // Causes the filter to refresh there by updating with recently added data.
    //     this.applyFilter(this.dataSource.filter);
    // }
    // private onDataLoadSuccessful(allWorkFlows: EmployeeExpertise[]) {
    //     // alert('success');
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = allWorkFlows;
    //     this.allEmployeeExpertiseInfo = allWorkFlows;
    //     this.totalRecords = this.allEmployeeExpertiseInfo.length;
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
    //     this.isSaving = true;
    //     this.loadMasterCompanies();
    //     this.sourceAction = new EmployeeExpertise();
    //     this.sourceAction.isActive = true;
    //     this.sourceAction.employeeName = "";
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }


    // openDelete(content, row) {

    //     this.isEditMode = false;
    //     this.isDeleteMode = true;
    //     this.sourceAction = row;
    //     this.employeeExpertise_Name = row.description;
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
    //     this.sourceAction.employeeName =getObjectByValue('description',row.description,this.allEmployeeExpertiseInfo);
    //     this.tempValue = this.sourceAction;
    //     console.log(this.tempValue)       

    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }
    // openView(content, row) {

    //     this.sourceAction = row;
    //     this.employeeExpertise_Name = row.description;
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
    // eventHandler(field,value) {
    //     value = value.trim();
    //     const exists = this.validateRecordExistsOrNot(field, value, this.allEmployeeExpertiseInfo);
    //     // console.log(exists,"test");
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
    //     // for (let i = 0; i < this.actionamecolle.length; i++) {
    //     //     if (event == this.actionamecolle[i][0].employeeName) {
    //     //         //alert("Action Name already Exists");
    //     //         this.disableSave = true;
    //     //         this.selectedActionName = event;
    //     //     }
    //    // }
    // }


    // filterEmployeeNames(event) {
    //     this.localCollection = this.allEmployeeExpertiseInfo;
    //     if (event.query !== undefined && event.query !== null) {
    //         const employeeName = [...this.allEmployeeExpertiseInfo.filter(x => {
    //             // return x.description.toLowerCase().includes(event.query.toLowerCase())
    //             return x.description.toLowerCase().includes(event.query.toLowerCase())
    //         })]

    //         this.localCollection = employeeName;
    //     }

    // }
    // handleChange(rowData, e) {
    //     if (e.checked == false) {
    //         this.sourceAction = rowData;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.Active = "In Active";
    //         this.sourceAction.isActive == false;
    //         this.workFlowtService.updateAction(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //         //alert(e);
    //     }
    //     else {

    //         this.sourceAction = rowData;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.Active = "Active";
    //         this.sourceAction.isActive == true;
    //         this.workFlowtService.updateAction(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //         //alert(e);
    //     }

    // }


    // openHist(content, row) {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;


    //     this.sourceAction = row;



    //     this.isSaving = true;

    //     this.workFlowtService.historyAcion(this.sourceAction.employeeExpertiseId).subscribe(
    //         results => this.onHistoryLoadSuccessful(results[0], content),
    //         error => this.saveFailedHelper(error));


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
    //         this.sourceAction.description = this.sourceAction.employeeName;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.workFlowtService.newAction(this.sourceAction).subscribe(
    //             role => this.saveSuccessHelper(role),
    //             error => this.saveFailedHelper(error));
    //     }
    //     else {
    //         console.log(this.tempValue)
    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.description = this.editValueAssignByCondition('description',this.sourceAction.employeeName)
    //         this.sourceAction.masterCompanyId = 1;
    //         this.workFlowtService.updateAction(this.tempValue).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //     }

    //     this.modal.close();
    // }

    // deleteItemAndCloseModel() {
    //     this.isSaving = true;
    //     this.sourceAction.updatedBy = this.userName;
    //     this.workFlowtService.deleteAcion(this.sourceAction.employeeExpertiseId).subscribe(
    //         response => this.saveCompleted(this.sourceAction),
    //         error => this.saveFailedHelper(error));
    //     this.modal.close();
    // }

    // dismissModel() {
    //     this.isDeleteMode = false;
    //     this.isEditMode = false;
    //     this.modal.close();
    // }

    // private saveCompleted(user?: EmployeeExpertise) {
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

    // private saveSuccessHelper(role?: EmployeeExpertise) {
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

    // showAuditPopup(template, employeeExpertiseId): void {
    //     this.empExpretiseAudit(employeeExpertiseId);
    //     this.modal = this.modalService.open(template, { size: 'sm' });
    // }

    // empExpretiseAudit(employeeExpertiseId: number): void {
    //     this.AuditDetails = [];
    //     this.workFlowtService.getAudit(employeeExpertiseId).subscribe(audits => {
    //         if (audits.length > 0) {
    //             this.AuditDetails = audits;
    //             this.AuditDetails[0].ColumnsToAvoid = ["employeeExpertiseAuditId", "employeeExpertiseId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
    //         }
    //     });
    // }
}