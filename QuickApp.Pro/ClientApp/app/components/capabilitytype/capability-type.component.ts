import { Component, OnInit, ViewChild } from '@angular/core';

import { fadeInOut } from '../../services/animations';
// import { VendorProcess1099Service } from '../../services/vendorprocess1099.service';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";

import { ConfigurationService } from '../../services/configuration.service';

import { CommonService } from '../../services/common.service';
import { CapabilityTypeService } from '../../services/capability-type.service';
import { editValueAssignByCondition, selectedValueValidate, getObjectById } from '../../generic/autocomplete';
@Component({
    selector: 'app-capability-type',
    templateUrl: './capability-type.component.html',
    styleUrls: ['./capability-type.component.scss'],
    animations: [fadeInOut]
})

export class CapabilityTypeComponent implements OnInit {
    capabilityTypeData: any;
    capabilityTypeHeaders = [
        { field: 'description', header: 'Capability Type' },

        { field: 'capabilityTypeDesc', header: 'Description' },
        { field: 'sequenceMemo', header: 'Memo' },
        { field: 'sequenceNo', header: 'Sequence' }

    ]
    selectedRecordForEdit: any;
    isEdit: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    capabilityTypeList: any;
    viewRowData: any;
    newCapabilityType =
        {
            capabilityTypeId: null,
            description: "",
            isActive: true,
            isDeleted: false,
            sequenceMemo: "",
            masterCompanyId: 1,
            sequenceNo: '',
           capabilityTypeDesc:"",

        }
    disableSaveForCapabilityType: boolean = false;
    addNewCapabilityType = { ...this.newCapabilityType };
    selectedColumns = this.capabilityTypeHeaders;
    formData = new FormData()

    constructor(private breadCrumb: SingleScreenBreadcrumbService,
        private configurations: ConfigurationService,
        private authService: AuthService,
        private alertService: AlertService,
        private commonService: CommonService,
        private capabilityService: CapabilityTypeService
    ) {

    }


    ngOnInit(): void {
        this.getCapabilityTypeList();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-capability-type';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    getCapabilityTypeList() {
     
        this.capabilityService.getAllCapabilityTypeEndpoint().subscribe(res => {

            const responseData = res;

            this.capabilityTypeData = responseData;

            if (res.length > 0) {
                this.totalRecords = res.length;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }
                 })
    }
    changePage(event: { first: any; rows: number }) {
        console.log(event);
        const pageIndex = (event.first / event.rows);
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }
    editCapabilityType(rowData) {
        console.log(rowData);
        this.isEdit = true;
        this.disableSaveForCapabilityType = false;

        this.addNewCapabilityType = {
            ...rowData, description: getObjectById('capabilityTypeId', rowData.capabilityTypeId, this.capabilityTypeData)
        };
        this.selectedRecordForEdit = { ...this.addNewCapabilityType }

    }
    customExcelUpload(event) {
        const file = event.target.files;

        console.log(file);
        if (file.length > 0) {

            this.formData.append('ModuleName', 'CapabilityType')
            this.formData.append('file', file[0])


            this.commonService.smartExcelFileUpload(this.formData).subscribe(res => {

                this.formData = new FormData();

                this.alertService.showMessage(
                    'Success',
                    `Successfully Uploaded  `,
                    MessageSeverity.success
                );

            })
        }

    }

    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=CapabilityType&fileName=CapabilityType.xlsx`;
        window.location.assign(url);
    }
    checkCapabilityTypeExists(value) {


        this.disableSaveForCapabilityType = false;
        for (let i = 0; i < this.capabilityTypeData.length; i++) {

            if (this.addNewCapabilityType.description == this.capabilityTypeData[i].description || value == this.capabilityTypeData[i].description) {
                this.disableSaveForCapabilityType = true;
                // this.disableSave = true;


                return;
            }

        }

    }
    viewSelectedRow(rowData) {
        console.log(rowData);
        this.viewRowData = rowData;
    }
    selectedCapabilityType(object) {
        const exists = selectedValueValidate('description', object, this.selectedRecordForEdit)
        this.disableSaveForCapabilityType = !exists;
    }

    changeStatus(rowData) {
        debugger
        console.log(rowData);
        
        const data = { ...rowData }
        this.capabilityService.getStatusCapabilityTypeEndpoint(data.capabilityTypeId, data.updatedBy, data.isActive).subscribe(() => {
            this.getCapabilityTypeList();
            this.alertService.showMessage(
                'Success',
                `Updated Status Successfully  `,
                MessageSeverity.success
            );
        })

    }
    filterCapabilityType(event) {
        this.capabilityTypeList = this.capabilityTypeData;

        const vendorProcess1099Data = [...this.capabilityTypeData.filter(x => {
            return x.description.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.capabilityTypeList = vendorProcess1099Data;
    }
    resetCapabilityTypeForm() {
        this.isEdit = false;
        this.disableSaveForCapabilityType = false;
        // this.selectedRecordForEdit = undefined;
        this.addNewCapabilityType = { ...this.newCapabilityType };
    }
    saveCapabilityType() {
        const data = {
            ...this.addNewCapabilityType, createdBy: this.userName, updatedBy: this.userName,
            description: editValueAssignByCondition('description', this.addNewCapabilityType.description)
        };
        if (!this.isEdit) {

            this.capabilityService.getNewCapabilityTypeEndpoint(data).subscribe(() => {
                this.resetCapabilityTypeForm();
                this.getCapabilityTypeList();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Vendor Process1099 Successfully`,
                    MessageSeverity.success
                );
            })
        } else {
            this.capabilityService.getNewCapabilityTypeEndpoint(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.resetCapabilityTypeForm();
                this.getCapabilityTypeList();
                this.alertService.showMessage(
                    'Success',
                    `Updated Vendor Process1099 Successfully`,
                    MessageSeverity.success
                );
            })
        }
    }




    













}