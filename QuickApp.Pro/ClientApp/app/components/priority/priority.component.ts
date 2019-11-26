
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
import { PriorityService } from '../../services/priority.service';
import { Priority } from '../../models/priority.model';
import { AuditHistory } from '../../models/audithistory.model';
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { getObjectByValue, validateRecordExistsOrNot, selectedValueValidate, editValueAssignByCondition, getObjectById } from '../../generic/autocomplete';
import { Table } from 'primeng/table';
import { ConfigurationService } from '../../services/configuration.service';




@Component({
    selector: 'app-priority',
    templateUrl: './priority.component.html',
    styleUrls: ['./priority.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class PriorityComponent implements OnInit {

    PriorityData: any;
    // selectedColumns: any = [];
    viewRowData: any;
    selectedRowforDelete: any;
    newPriority =
        {            
            description: "",           
            masterCompanyId: 1,
            isActive: true,
            isDeleted: false,
            memo: "",
          
        }
    addnewPriority = {...this.newPriority};
    disableSaveForPriority: boolean = false;
    PriorityList: any;
    isEdit: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    priorityHeader = [
        { field: 'description', header: 'Priority Name' },
        { field: 'memo', header: 'Memo' },
    ]
    selectedColumns = this.priorityHeader;
    formData = new FormData()

    @ViewChild('dt')
    private table: Table;
    auditHistory: any[] = [];
    existingRecordsResponse: Object;
    selectedRecordForEdit: any;
    disableSaveForShortName: boolean = false;
    manufacturerList: any;

    constructor(private breadCrumb: SingleScreenBreadcrumbService, private configurations: ConfigurationService, private authService: AuthService, private alertService: AlertService, public priorityService: PriorityService) {


    }
    ngOnInit(): void {
        this.getProrityData();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-priority';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        this.table.reset();
        this.getProrityData();
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
    // sampleExcelDownload() {
    //     const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=Priority&fileName=manufacturer.xlsx`;

    //     window.location.assign(url);
    // }

    getProrityData() {
        this.priorityService.getPriorityList().subscribe(res => {          
            const responseData = res[0];           
            this.PriorityData = responseData;
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


    checkPriorityExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.PriorityData, this.selectedRecordForEdit);
        if (exists.length > 0) {
            this.disableSaveForPriority = true;
        }
        else {
            this.disableSaveForPriority = false;
        }

    }
    filterDescription(event) {
        this.PriorityList = this.PriorityList;

        const PriorityValue = [...this.PriorityData.filter(x => {
            return x.description.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.PriorityList = PriorityValue;
    }
    selectedPriority(object) {
        const exists = selectedValueValidate('description', object, this.selectedRecordForEdit)

        this.disableSaveForPriority = !exists;
    }

    
    savePriority() {
        const data = {
            ...this.addnewPriority, createdBy: this.userName, updatedBy: this.userName,
            description: editValueAssignByCondition('description', this.addnewPriority.description),
        };
        if (!this.isEdit) {
            this.priorityService.newPriority(data).subscribe(() => {
                this.resetPriorityForm();
                this.getProrityData();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Priority Successfully  `,
                    MessageSeverity.success
                );
            })
        }
        else {
            this.priorityService.updatePriority(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.resetPriorityForm();
                this.getProrityData();
                this.alertService.showMessage(
                    'Success',
                    `Updated   Priority  Successfully  `,
                    MessageSeverity.success
                );
            })
        }
    }

    resetPriorityForm() {
        this.isEdit = false;
        this.selectedRecordForEdit = undefined;
        this.disableSaveForPriority = false;
        this.addnewPriority = { ...this.newPriority };
    }


    editPriority(rowData) {
        console.log(rowData);
        this.isEdit = true;
        this.disableSaveForPriority = false;
       // this.disableSaveForShortName = false;
        // this.addNewUOM = rowData;

        this.addnewPriority = {
            ...rowData, description: getObjectByValue('description', rowData.description, this.PriorityData),
            
        };
        this.selectedRecordForEdit = { ...this.addnewPriority }

    }

    changeStatus(rowData) {
        console.log(rowData);
        const data = { ...rowData }
        this.priorityService.updatePriority(data).subscribe(() => {
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

            this.priorityService.deletePriority(this.selectedRowforDelete.priorityId).subscribe(() => {
                this.getProrityData();
                this.alertService.showMessage(
                    'Success',
                    `Deleted Priority Successfully  `,
                    MessageSeverity.success
                );
            })

        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    getAuditHistoryById(rowData) {
        this.priorityService.historyPriority(rowData.priorityId).subscribe(res => {
            console.log(res)
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
    
}