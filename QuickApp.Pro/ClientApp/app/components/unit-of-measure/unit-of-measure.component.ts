import { Component, OnInit, ViewChild } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { UnitOfMeasureService } from '../../services/unitofmeasure.service';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { validateRecordExistsOrNot, editValueAssignByCondition, getObjectById, selectedValueValidate, getObjectByValue } from '../../generic/autocomplete';
import { Table } from 'primeng/table';
import { ConfigurationService } from '../../services/configuration.service';
// import { colorCodeGeneratorForHistory } from '../../generic/history-smart';

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
    @ViewChild('dt')

    private table: Table;
    auditHistory: any[] = [];
    existingRecordsResponse: Object;
    selectedRecordForEdit: any;
    disableSaveForShortName: boolean = false;
    shortNameList: any;

    constructor(private breadCrumb: SingleScreenBreadcrumbService, private configurations: ConfigurationService, private authService: AuthService, private alertService: AlertService, public unitofmeasureService: UnitOfMeasureService) {


    }
    ngOnInit(): void {
        this.getUOMList();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-unit-of-measure';
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

        // this.table.sortOrder = 0;
        // this.table.sortField = '';

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
    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=UnitOfMeasure&fileName=uom.xlsx`;

        window.location.assign(url);
    }

    getUOMList() {
        this.unitofmeasureService.getAllUnitofMeasureList().subscribe(res => {
            const responseData = res[0];
            this.uomData = responseData.columnData;
            this.totalRecords = responseData.totalRecords;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        })
    }
    changePage(event: { first: any; rows: number }) {
        console.log(event);
        const pageIndex = (event.first / event.rows);
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }


    checkUOMExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.uomData, this.selectedRecordForEdit);
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
        const exists = selectedValueValidate('description', object, this.selectedRecordForEdit)

        this.disableSaveForUOM = !exists;
    }

    checkShortNameExists(field, value) {
        console.log(this.selectedRecordForEdit);
        const exists = validateRecordExistsOrNot(field, value, this.uomData, this.selectedRecordForEdit);
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
        const exists = selectedValueValidate('shortName', object, this.selectedRecordForEdit)

        this.disableSaveForShortName = !exists;
    }

    saveUOM() {
        const data = {
            ...this.addNewUOM, createdBy: this.userName, updatedBy: this.userName,
            shortName: editValueAssignByCondition('shortName', this.addNewUOM.shortName),
            description: editValueAssignByCondition('description', this.addNewUOM.unitName),
            unitName: editValueAssignByCondition('description', this.addNewUOM.unitName)
        };
        if (!this.isEdit) {
            this.unitofmeasureService.newUnitOfMeasure(data).subscribe(() => {
                this.resetUOMForm();
                this.getUOMList();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Unit of Measurment Successfully`,
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
                    `Updated Unit of Measurment Successfully`,
                    MessageSeverity.success
                );
            })
        }
    }

    resetUOMForm() {
        this.isEdit = false;
        this.disableSaveForUOM = false;
        this.disableSaveForShortName = false;
        this.selectedRecordForEdit = undefined;
        this.addNewUOM = { ...this.newUOM };
    }


    editUOM(rowData) {
        console.log(rowData);
        this.isEdit = true;
        this.disableSaveForUOM = false;
        this.disableSaveForShortName = false;
        // this.addNewUOM = rowData;

        this.addNewUOM = {
            ...rowData, unitName: getObjectById('unitOfMeasureId', rowData.unitOfMeasureId, this.uomData),
            shortName: getObjectById('unitOfMeasureId', rowData.unitOfMeasureId, this.uomData)
        };
        this.selectedRecordForEdit = { ...this.addNewUOM }

    }

    changeStatus(rowData) {
        console.log(rowData);
        const data = { ...rowData }
        this.unitofmeasureService.updateUnitOfMeasure(data).subscribe(() => {
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