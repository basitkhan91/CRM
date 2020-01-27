import { Component, OnInit, ViewChild } from '@angular/core';

import { fadeInOut } from '../../services/animations';

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
        { field: 'description', header: 'Vendor Capability Type' },

        { field: 'capabilityTypeDesc', header: 'Description' },
        { field: 'sequenceMemo', header: 'Memo' },
        { field: 'sequenceNo', header: 'Sequence' }

    ]
    selectedRowforDelete: any;
    selectedRecordForEdit: any;
    isEdit: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    capabilityTypeList: any;
    sequenceList: any;
    viewRowData: any;
    historyName: any;
    auditHistory: any[] = [];
    disableSaveForCondition: boolean;
    disableSaveForSequence: boolean = false;
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
        this.disableSaveForCondition = true;
        this.addNewCapabilityType = {
            ...rowData, description: getObjectById('capabilityTypeId', rowData.capabilityTypeId, this.capabilityTypeData),
            sequenceNo: getObjectById('capabilityTypeId', rowData.capabilityTypeId, this.capabilityTypeData)
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
                this.getCapabilityTypeList();
                this.formData = new FormData();

                this.alertService.showMessage(
                    'Success',
                    `Successfully Uploaded  `,
                    MessageSeverity.success
                );

            })
        }

    }
    delete(rowData) {
        this.selectedRowforDelete = rowData;

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
            

                return;
            }

        }

    }
    checkSequenceExists(value) {


        this.disableSaveForSequence = false;
        for (let i = 0; i < this.capabilityTypeData.length; i++) {

            if (this.addNewCapabilityType.sequenceNo == this.capabilityTypeData[i].sequenceNo || value == this.capabilityTypeData[i].sequenceNo) {
                this.disableSaveForSequence = true;


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
    selectedSequence(object) {
        const exists = selectedValueValidate('sequenceNo', object, this.selectedRecordForEdit)
        this.disableSaveForSequence = !exists;
    }


    changeStatus(rowData) {
      
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
   
    getChange() {
        this.disableSaveForCondition = false;

    }
  
    
    deleteConformation(value) {
        if (value === 'Yes') {
            this.capabilityService.getDeleteCapabilityTypeEndpoint(this.selectedRowforDelete.capabilityTypeId, this.selectedRowforDelete.updatedBy).subscribe(() => {
                this.getCapabilityTypeList();
                this.alertService.showMessage(
                    'Success',
                    `Deleted Capability Type Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }
    filterCapabilityType(event) {
        this.capabilityTypeList = this.capabilityTypeData;

        const capabilityTypeData = [...this.capabilityTypeData.filter(x => {
            return x.description.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.capabilityTypeList = capabilityTypeData;
    }


    filterSequence(event) {
        this.sequenceList = this.capabilityTypeData;
      
        const capabilityTypeData = [...this.capabilityTypeData.filter(x => {
            if (x.sequenceNo !== null && x.sequenceNo !== "") {

                //if (x.sequenceNo == event)
                //    return x;
                x.sequenceNo = String(x.sequenceNo)
                return x.sequenceNo.toLowerCase().includes((event.query.toLowerCase()))
            }
        })]
        this.sequenceList = capabilityTypeData;

         }

    resetCapabilityTypeForm() {
        this.isEdit = false;
        this.disableSaveForCapabilityType = false;
        this.selectedRecordForEdit = undefined;
        this.disableSaveForCondition = false;
        this.disableSaveForSequence = false;

        this.addNewCapabilityType = { ...this.newCapabilityType };
    }
    saveCapabilityType() {
        const data = {
            ...this.addNewCapabilityType, createdBy: this.userName, updatedBy: this.userName,
            description: editValueAssignByCondition('description', this.addNewCapabilityType.description),
            sequenceNo: editValueAssignByCondition('sequenceNo', this.addNewCapabilityType.sequenceNo)
        };
        if (!this.isEdit) {

            this.capabilityService.getNewCapabilityTypeEndpoint(data).subscribe(() => {
                this.resetCapabilityTypeForm();
                this.getCapabilityTypeList();
                this.alertService.showMessage(
                    'Success',
                    `Added  Capability Type Successfully`,
                    MessageSeverity.success
                );
            })
        } else {
            this.capabilityService.getNewCapabilityTypeEndpoint(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.disableSaveForCondition = false;
                this.resetCapabilityTypeForm();
                this.getCapabilityTypeList();
                this.alertService.showMessage(
                    'Success',
                    `Updated Capability Type Successfully`,
                    MessageSeverity.success
                );
            })
        }
    }



    getAuditHistoryById(capabilityTypeId) {
        this.capabilityService.getAllCapabilityTypeAudit(capabilityTypeId).subscribe(res => {
            this.auditHistory = res;
        })
    }
    showAuditPopup(audit): void {
       // this.historyName = audit.description;
        this.historyName = 'Vendor Capability Type';
        this.getAuditHistoryById(audit.capabilityTypeId);
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