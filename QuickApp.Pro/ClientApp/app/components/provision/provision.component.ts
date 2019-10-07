import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';

import { fadeInOut } from '../../services/animations';

import { ProvisionService } from '../../services/provision.service';

import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';

import { AuthService } from '../../services/auth.service';


import { TableModule, Table } from 'primeng/table';

import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
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

    provisionData: any;
    // selectedColumns: any = [];
    viewRowData: any;
    selectedRowforDelete: any;
    newProvision =
        {            
            description: "",           
            masterCompanyId: 1,
            isActive: true,
            isDelete: false,
            memo: "",
          
        }
    addnewProvision = {...this.newProvision};
    disableSaveForProvision: boolean = false;
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
    // sampleExcelDownload() {
    //     const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=Provision&fileName=manufacturer.xlsx`;

    //     window.location.assign(url);
    // }

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
            this.disableSaveForProvision = true;
        }
        else {
            this.disableSaveForProvision = false;
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

        this.disableSaveForProvision = !exists;
    }

    
    saveProvision() {
        const data = {
            ...this.addnewProvision, createdBy: this.userName, updatedBy: this.userName,
            description: editValueAssignByCondition('description', this.addnewProvision.description),
        };
        if (!this.isEdit) {
            this.provisionService.newProvision(data).subscribe(() => {
                this.resetProvisionForm();
                this.getProvisionData();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Provision Successfully  `,
                    MessageSeverity.success
                );
            })
        }
        else {
            this.provisionService.updateProvision(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.resetProvisionForm();
                this.getProvisionData();
                this.alertService.showMessage(
                    'Success',
                    `Updated   Provision  Successfully  `,
                    MessageSeverity.success
                );
            })
        }
    }

    resetProvisionForm() {
        this.isEdit = false;
        this.disableSaveForProvision = false;       
        this.selectedRecordForEdit = undefined;
        this.addnewProvision = { ...this.newProvision };
    }


    editProvision(rowData) {
        console.log(rowData);
        this.isEdit = true;
        this.disableSaveForProvision = false;       
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
                    `Deleted Provision Successfully  `,
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