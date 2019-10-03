import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { ProvisionService } from '../../services/provision.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { Provision } from '../../models/provision.model';
import { AuditHistory } from '../../models/audithistory.model';
import { AuthService } from '../../services/auth.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';

import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { getObjectByValue, validateRecordExistsOrNot, selectedValueValidate, editValueAssignByCondition, getObjectById } from '../../generic/autocomplete';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
    selector: 'app-provision',
    templateUrl: './provision.component.html',
    styleUrls: ['./provision.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class ProvisionComponent implements OnInit{
    // allprovisin: any[] = [];
    // selectedreason: any;
    // provision_Name: any = "";
    // memo: any = "";
    // createdBy: any = "";
    // updatedBy: any = "";
    // createdDate: any = "";
    // updatedDate: any = "";
    // disableSave: boolean = false;
    // isSaving: boolean;
    // totalRecords: number;
    // ngOnInit(): void {
    //     this.cols = [
    //         //{ field: 'provisionId', header: 'Provison Id' },
    //         { field: 'description', header: 'Provision Name' },
    //         { field: 'memo', header: 'Memo' },
    //         // { field: 'createdBy', header: 'Created By' },
    //         // { field: 'updatedBy', header: 'Updated By' },
    //         // { field: 'updatedDate', header: 'Updated Date' },
    //         // { field: 'createdDate', header: 'Created Date' }
    //     ];
    //     this.selectedColumns = this.cols;
    //     this.loadData();
    //     this.breadCrumb.currentUrl = '/singlepages/singlepages/app-provision';
    //     this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    // }
    // Active: string = "Active";
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ViewChild(MatSort) sort: MatSort;

    // displayedColumns = ['provisionId', 'description', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    // dataSource: MatTableDataSource<Provision>;
    // allProvisonInfo: Provision[] = [];
    // allComapnies: MasterCompany[] = [];
    // public auditHisory: AuditHistory[] = [];
    // sourceAction: any;
    // loadingIndicator: boolean;
    // actionForm: FormGroup;
    // title: string = "Create";
    // id: number;
    // errorMessage: any;
    // cols: any[];
    // selectedColumns: any[];
    // modal: NgbModalRef;
    // selectedColumn: Provision[];

    // provisionName: any;
    // filteredBrands: any[];
    // localCollection: any[] = [];

    // AuditDetails: SingleScreenAuditDetails[];

    // /** Actions ctor */

    // private isEditMode: boolean = false;
    // private isDeleteMode: boolean = false;

    // constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public provisionService: ProvisionService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
    //     this.displayedColumns.push('action');
    //     this.dataSource = new MatTableDataSource();
    //     this.sourceAction = new Provision();

    // }
    // validateRecordExistsOrNot(field: string, currentInput: any, originalData: any) {
    //     //console.log(field, currentInput, originalData)
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
    // public allWorkFlows: Provision[] = [];

    // private loadData() {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;

    //     this.provisionService.getProvisionList().subscribe(
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
    // private onDataLoadSuccessful(getProvisionList: Provision[]) {
    //     // alert('success');
    //     this.alertService.stopLoadingMessage();
    //     this.loadingIndicator = false;
    //     this.dataSource.data = getProvisionList;
    //     this.allProvisonInfo = getProvisionList;
    //     this.totalRecords = this.allProvisonInfo.length;
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
    // openView(content, row) {

    //     this.sourceAction = row;
    //     this.provision_Name = row.description;
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

    // open(content) {

    //     this.isEditMode = false;
    //     this.isDeleteMode = false;
    //     this.disableSave = false;
    //     this.isSaving = true;
    //     this.loadMasterCompanies();
    //     this.sourceAction = new Provision();
    //     this.sourceAction.isActive = true;
    //     this.sourceAction.provisionName = "";
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }


    // openDelete(content, row) {
    //     this.isEditMode = false;
    //     this.isDeleteMode = true;
    //     this.sourceAction = row;
    //     this.provision_Name = row.description;
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // openEdit(content, row) {
    //     this.isEditMode = true;
    //     this.isSaving = true;
    //     this.loadMasterCompanies();
    //     this.disableSave = false;
    //     this.sourceAction = {...row};
    //     this.sourceAction.provisionName = getObjectByValue('description',row.description,this.allProvisonInfo)
    //     this.loadMasterCompanies();
    //     this.modal = this.modalService.open(content, { size: 'sm' });
    //     this.modal.result.then(() => {
    //         console.log('When user closes');
    //     }, () => { console.log('Backdrop click') })
    // }

    // eventHandler(field, value) {
    //     value = value.trim();
    //     const exists = this.validateRecordExistsOrNot(field, value, this.allProvisonInfo);
    //     //console.log(exists);
    //     if (exists.length > 0) {
    //         this.disableSave = true;
    //     }
    //     else {
    //         this.disableSave = false;
    //     }

    // }




    // provisionId(event) {
    //     this.disableSave = true;
    // }

    // filterprovisions(event) {
     
    //     this.localCollection = this.allProvisonInfo;

    //     if (event.query !== undefined && event.query !== null) {
    //         const provision = [...this.allProvisonInfo.filter(x => {
    //             return x.description.toLowerCase().includes(event.query.toLowerCase())
    //         })]
    //         this.localCollection = provision;
    //     }
    // }

    // openHist(content, row) {
    //     this.alertService.startLoadingMessage();
    //     this.loadingIndicator = true;


    //     this.sourceAction = row;



    //     //this.isSaving = true;
    //     // debugger;
    //     this.provisionService.historyProvision(this.sourceAction.provisionId).subscribe(
    //         results => this.onHistoryLoadSuccessful(results[0], content),
    //         error => this.saveFailedHelper(error));


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

    // handleChange(rowData, e) {
    //     if (e.checked == false) {
    //         this.sourceAction = rowData;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.Active = "In Active";
    //         this.sourceAction.isActive == false;
    //         this.provisionService.updateProvision(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //         //alert(e);
    //     }
    //     else {
    //         this.sourceAction = rowData;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.Active = "Active";
    //         this.sourceAction.isActive == true;
    //         this.provisionService.updateProvision(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //         //alert(e);
    //     }

    // }


    // editItemAndCloseModel() {

    //     // debugger;

    //     this.isSaving = true;

    //     if (this.isEditMode == false) {
    //         this.sourceAction.createdBy = this.userName;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.description = this.sourceAction.provisionName;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.provisionService.newProvision(this.sourceAction).subscribe(
    //             role => this.saveSuccessHelper(role),
    //             error => this.saveFailedHelper(error));
    //     }
    //     else {

    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.provisionName = this.editValueAssignByCondition('description',this.sourceAction.provisionName)
    //         this.sourceAction.description = this.sourceAction.provisionName;            
    //         this.sourceAction.masterCompanyId = 1;
    //         this.provisionService.updateProvision(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //     }

    //     this.modal.close();
    // }

    // deleteItemAndCloseModel() {
    //     this.isSaving = true;
    //     this.sourceAction.updatedBy = this.userName;
    //     this.provisionService.deleteProvision(this.sourceAction.provisionId).subscribe(
    //         response => this.saveCompleted(this.sourceAction),
    //         error => this.saveFailedHelper(error));
    //     this.modal.close();
    // }

    // dismissModel() {
    //     this.isDeleteMode = false;
    //     this.isEditMode = false;
    //     this.modal.close();
    // }

    // private saveCompleted(user?: Provision) {
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

    // private saveSuccessHelper(role?: Provision) {
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
    //     this.modal = this.modalService.open(template, { size: 'sm' });
    //     this.auditProvision(id);

    // }

    // auditProvision(provisionId: number): void {
    //     this.AuditDetails = [];
    //     this.provisionService.getProvisionAudit(provisionId).subscribe(audits => {
    //         if (audits.length > 0) {
    //             this.AuditDetails = audits;
    //             this.AuditDetails[0].ColumnsToAvoid = ["provisionAuditId", "provisionId", "masterCompanyId", "createdBy", "createdDate", "updatedDate", "updatedBy"];
    //         }


    //     });
    // }

    
    provisionData: any;
    // selectedColumns: any = [];
    viewRowData: any;
    selectedRowforDelete: any;
    newProvision =
        {
            provisionId: "",
            description: "",           
            masterCompanyId: 1,
            isActive: true,
            isDelete: false,
            memo: "",
          
        }
    addnewProvision = this.newProvision;
    disableSaveForUOM: boolean = false;
    provisionList: any;
    isEdit: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    provisionHeader = [
        { field: 'description', header: 'Provison Name' },
        { field: 'memo', header: 'Memo' },
    ]
    selectedColumns = this.provisionHeader;
    formData = new FormData()

    @ViewChild('dt')
    private table: Table;
    auditHistory: any[] = [];
    existingRecordsResponse: Object;
    selectedRecordForEdit: any;
    disableSaveForShortName: boolean = false;
    manufacturerList: any;

    constructor(private breadCrumb: SingleScreenBreadcrumbService, private configurations: ConfigurationService, private authService: AuthService, private alertService: AlertService, public provisionService: ProvisionService) {


    }
    ngOnInit(): void {
        this.getProvisionData();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-provision';

    }



    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        this.table.reset();
        this.getProvisionData();
    }

    // customExcelUpload(event) {
    //     const file = event.target.files;

    //     console.log(file);
    //     if (file.length > 0) {

    //         this.formData.append('file', file[0])
    //         this.unitofmeasureService.UOMFileUpload(this.formData).subscribe(res => {
    //             event.target.value = '';

    //             this.formData = new FormData();
    //             this.existingRecordsResponse = res;
    //             this.getUOMList();
    //             this.alertService.showMessage(
    //                 'Success',
    //                 `Successfully Uploaded  `,
    //                 MessageSeverity.success
    //             );

    //             // $('#duplicateRecords').modal('show');
    //             // document.getElementById('duplicateRecords').click();

    //         })
    //     }

    // }
    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=Manufacturer&fileName=manufacturer.xlsx`;

        window.location.assign(url);
    }

    getProvisionData() {
        this.provisionService.getProvisionList().subscribe(res => {          
            const responseData = res[0];           
            this.provisionData = responseData;
            this.totalRecords = responseData.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        })
    }
    changePage(event: { first: any; rows: number }) {
        console.log(event);
        const pageIndex = (event.first / event.rows);
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }


    checkProvisionExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.provisionData, this.selectedRecordForEdit);
        if (exists.length > 0) {
            this.disableSaveForUOM = true;
        }
        else {
            this.disableSaveForUOM = false;
        }

    }
    filterDescription(event) {
        this.provisionList = this.provisionList;

        const ProvisionValue = [...this.provisionData.filter(x => {
            return x.description.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.provisionList = ProvisionValue;
    }
    selectedProvision(object) {
        const exists = selectedValueValidate('description', object, this.selectedRecordForEdit)

        this.disableSaveForUOM = !exists;
    }

    
    saveProvision() {
        const data = {
            ...this.addnewProvision, createdBy: this.userName, updatedBy: this.userName,
            description: editValueAssignByCondition('provisionId', this.addnewProvision.provisionId),
        };
        if (!this.isEdit) {
            this.provisionService.newProvision(data[0]).subscribe(() => {
                this.resetManufacuterForm();
                this.getProvisionData();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Manufacturer Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.provisionService.updateProvision(data[0]).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.resetManufacuterForm();
                this.getProvisionData();
                this.alertService.showMessage(
                    'Success',
                    `Updated   Manufacturer  Successfully  `,
                    MessageSeverity.success
                );
            })
        }
    }

    resetManufacuterForm() {
        this.isEdit = false;
        this.selectedRecordForEdit = undefined;
        this.addnewProvision = { ...this.newProvision };
    }


    editManufacturer(rowData) {
        console.log(rowData);
        this.isEdit = true;
        this.disableSaveForUOM = false;
        this.disableSaveForShortName = false;
        // this.addNewUOM = rowData;

        this.addnewProvision = {
            ...rowData, description: getObjectById('provisionId', rowData.provisionId, this.provisionData),
            
        };
        this.selectedRecordForEdit = { ...this.addnewProvision }

    }

    changeStatus(rowData) {
        console.log(rowData);
        const data = { ...rowData }
        this.provisionService.updateProvision(data).subscribe(() => {
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

            this.provisionService.deleteProvision(this.selectedRowforDelete.provisionId).subscribe(() => {
                this.getProvisionData();
                this.alertService.showMessage(
                    'Success',
                    `Deleted Manufacturer Successfully  `,
                    MessageSeverity.success
                );
            })

        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    getAuditHistoryById(rowData) {
        this.provisionService.getProvisionAudit(rowData.provisionId).subscribe(res => {
            console.log(res)
            this.auditHistory = res;
        })
    }
    
}