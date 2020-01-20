import { OnInit, Component, ViewChild } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService, MessageSeverity } from "../../services/alert.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { AuditHistory } from '../../models/audithistory.model';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { StageCode } from "../../models/stage-code.model";
import { StageCodeService } from "../../services/stage-code/stage-code.service";
import { ModeOfOperation } from "../../models/ModeOfOperation.enum";
import { Table } from "primeng/table";
import { TaxRate } from "../../models/taxrate.model";
import { CommonService } from "../../services/common.service";
import { ConfigurationService } from "../../services/configuration.service";
import { StageService } from '../../services/work-order-stagecode.service';


@Component({
    selector: 'app-stage-code',
    templateUrl: './stage-code.component.html',
    styleUrls: [],
    animations: [fadeInOut]
})
export class StageCodeComponent implements OnInit {





    originalData: any;
    isEdit: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    currentModeOfOperation: ModeOfOperation;
    headers = [
        { field: 'taxType', header: 'Tax Type' },
        { field: 'taxRate', header: 'Tax Rate' },
        { field: 'memo', header: 'Memo' },
    ]
    selectedColumns = this.headers;
    formData = new FormData()
    @ViewChild('dt')

    private table: Table;
    auditHistory: any[] = [];
    disableSave: boolean = false;
    taxTypeList: any;
    createdDate: any = "";
    percentageList: any[];
    filteredPercentageList: any[];
    allTaxTypes: any[];
    filteredTaxType: any[];
    loadingIndicator: boolean;

    // new = {
    //     taxTypeId: 0,
    //     taxRateId: "",
    //     taxRate: 0,
    //     masterCompanyId: 1,
    //     isActive: true,
    //     isDeleted: true,
    //     memo: "",
    //     createdDate: "",
    //     updatedDate: "",
    // }
    addNew = new StageCode();
    selectedRecordForEdit: any;
    viewRowData: any;
    selectedRowforDelete: any;
    // originalData: any;
    existingRecordsResponse = [];

    constructor(
        private breadCrumb: SingleScreenBreadcrumbService,
        private authService: AuthService,
        private modalService: NgbModal,
        private configurations: ConfigurationService,
        private stageService: StageService,
        private commonservice: CommonService) {


    }



    ngOnInit(): void {



        this.breadCrumb.currentUrl = '/singlepages/WorkOrder/StageCode';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        this.getList();

    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        this.table.reset();


        this.getList();
    }

    getAllPercentage() {
        this.commonservice.smartDropDownList('[Percent]', 'PercentId', 'PercentValue').subscribe(res => {

            this.percentageList = res;
        });

    }


    filterTaxType(event): void {
        this.filteredTaxType = this.allTaxTypes;
        const ASSETADATA = [...this.allTaxTypes.filter(x => {
            return x.description.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.filteredTaxType = ASSETADATA;
    }

    customExcelUpload() {


    }
    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=TaxRate&fileName=TaxRate.xlsx`;
        window.location.assign(url);
    }

    getList() {
        this.stageService.getWorkOrderStageList().subscribe(res => {
            const responseData = res[0];
            // this.uomHeaders = responseData.columHeaders;
            // this.selectedColumns = responseData.columHeaders;
            this.originalData = responseData.map(x => {
                return {
                    ...x,
                    //taxType: getValueFromArrayOfObjectById('description', 'taxTypeId', x.taxTypeId, this.allTaxTypes)
                }
            });
            console.log(this.originalData);
            this.totalRecords = responseData.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        })
    }
    changePage(event: { first: any; rows: number }) {
        //console.log(event);
        // this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }


    checkTaxTypeExists(field, value) {
        //console.log('this.selectedRecordForEdit', this.selectedRecordForEdit);
        // const exists = validateRecordExistsOrNot(field, value, this.originalData, this.selectedRecordForEdit);
        //console.log(exists);
        // if (exists.length > 0) {
        //     this.disableSave = true;
        // }
        // else {
        //     this.disableSave = false;
        // }

    }

    selectedTaxType(object) {
        //console.log('selectedTaxType', object);
        // const exists = selectedValueValidate('description', object, this.selectedRecordForEdit)

        // this.disableSave = !exists;
    }

    save() {

        if (!this.isEdit) {
            const data = {
                ...this.addNew, createdBy: this.userName, updatedBy: this.userName,
                // taxTypeId: editValueAssignByCondition('taxTypeId', this.addNew.taxTypeId),
                // taxRateId: editValueAssignByCondition('value', this.addNew.taxRate),
                // taxRate: editValueAssignByCondition('value', this.addNew.taxRate),
                masterCompanyId: 1,
                // unitName: editValueAssignByCondition('description', this.addNew.unitName)
            };
            //console.log('data', data);
            // this.taxRateService.newTaxRate(data).subscribe(() => {
            //     this.resetForm();
            //     this.getList();
            //     this.alertService.showMessage(
            //         'Success',
            //         `Added Tax Rate Successfully  `,
            //         MessageSeverity.success
            //     );
            // });
        } else {
            const data = {
                ...this.addNew, updatedBy: this.userName,
                // taxTypeId: editValueAssignByCondition('taxTypeId', this.addNew.taxTypeId),
                // //taxTypeId: editValueAssignByCondition('description', this.addNew.taxTypeId),
                // taxRate: editValueAssignByCondition('value', this.addNew.taxRate),
                masterCompanyId: 1,
            };
            //console.log('data', data);
            // this.taxRateService.updateTaxRate(data).subscribe(() => {
            //     this.selectedRecordForEdit = undefined;
            //     this.isEdit = false;
            //     this.resetForm();
            //     this.getList();
            //     this.alertService.showMessage(
            //         'Success',
            //         `Updated Tax Rate Successfully  `,
            //         MessageSeverity.success
            //     );
            // })
        }
    }

    resetForm() {
        this.isEdit = false;
        this.selectedRecordForEdit = undefined;

        // this.addNew = new TaxRate();
        // this.addNew.isActive = true;
    }


    edit(rowData) {
        console.log('rowData', rowData);
        this.isEdit = true;
        this.disableSave = false;
        //console.log(this.getTaxTypeId(rowData.taxTypeId));
        this.addNew = {
            ...rowData,
            //taxTypeId: getObjectById('taxTypeId', this.getTaxTypeId(rowData.taxTypeId), this.allTaxTypes),
            // taxTypeId: getObjectById('taxTypeId', rowData.taxTypeId, this.allTaxTypes),
            // taxRate: getObjectById('value', rowData.taxRate, this.percentageList),
        };
        this.addNew = {
            ...this.addNew
        };
        console.log('addNew', this.addNew);
        this.selectedRecordForEdit = { ...this.addNew }

    }

    // getTaxTypeId(value) {
    //     //console.log(value);
    //     for (let i = 0; i < this.allTaxTypes.length; i++) {
    //         let description = this.allTaxTypes[i].description;
    //         let taxTypeId = this.allTaxTypes[i].taxTypeId;
    //         //console.log(description,value);
    //         if (description.toLowerCase() == value.toLowerCase()) {
    //             return taxTypeId.toString();
    //         }
    //     }
    //     return '0';
    // }

    changeStatus(rowData) {
        //console.log(rowData);
        const data = { ...rowData }
        // this.taxRateService.updateTaxRate(data).subscribe(() => {
        //     // this.getUOMList();
        //     this.alertService.showMessage(
        //         'Success',
        //         `Updated Status Successfully  `,
        //         MessageSeverity.success
        //     );
        // })

    }
    viewSelectedRow(rowData) {
        //console.log(rowData);
        let data =
        {
            ...rowData,
            //taxTypeName: editValueAssignByCondition('description', rowData.taxTypeId),
        };
        this.viewRowData = data;
    }
    resetViewData() {
        this.viewRowData = undefined;
    }
    delete(rowData) {
        this.selectedRowforDelete = {
            ...rowData,
            // taxTypeName: editValueAssignByCondition('description', this.addNew.taxTypeId),
        };

    }
    deleteConformation(value) {
        if (value === 'Yes') {
            // this.taxRateService.deleteTaxRate(this.selectedRowforDelete.taxRateId).subscribe(() => {
            //     this.getList();
            //     this.alertService.showMessage(
            //         'Success',
            //         `Deleted Tax Rate Successfully`,
            //         MessageSeverity.success
            //     );
            // })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }
    showHistory(rowData): void {
        this.currentModeOfOperation = ModeOfOperation.Audit;
        // this.taxRateService.getTaxRateAudit(rowData.taxRateId).subscribe(audits => {
        //     if (audits) {
        //         this.auditHistory = audits[0].result;
        //     }
        // });
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


















    // itemList: StageCode[];
    // columnHeaders: any[];
    // itemDetails: any;
    // currentRow: StageCode;
    // currentModeOfOperation: ModeOfOperation;
    // rowName: string;
    // header: string;
    // disableSave: boolean = false;
    // totalRecords: any;
    // pageIndex: number = 0;
    // pageSize: number = 10;
    // totalPages: number;
    // modal: NgbModalRef;
    // selectedColumns: any[];
    // auditHistory: any[];
    // constructor(private breadCrumb: SingleScreenBreadcrumbService, private alertService: AlertService, private coreDataService: StageCodeService, private modalService: NgbModal, private authService: AuthService) {
    // }
    // ngOnInit(): void {
    //     //gather up all the required data to be displayed on the screen 
    //     this.loadData();
    // }

    // //for auditing
    // get userName(): string {
    //     //to-do:fix the empty username
    //     return this.authService.currentUser ? this.authService.currentUser.userName : "admin";
    // }

    // //Step E1: Open row up for editing
    // addNewItem(): void {
    //     this.currentRow = this.newItem(0);
    //     this.currentModeOfOperation = ModeOfOperation.Add;
    // }

    // //Functionality for pagination.
    // //to-do: Build lazy loading
    // changePage(event: { first: any; rows: number }) {
    //     const pageIndex = (event.first / event.rows);
    //     this.pageIndex = pageIndex;
    //     this.pageSize = event.rows;
    //     this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    // }

    // //Check if asset type exists before add/delete
    // checkItemExists(rowData): boolean {
    //     this.getItemList();
    //     let item = this.newItem(rowData);
    //     const exists = this.itemList.some(existingItem => existingItem.stageCodeId === item.stageCodeId);
    //     return exists;
    // }

    // //Open the confirmation to delete
    // confirmItemDelete(rowData) {
    //     this.currentRow = this.newItem(rowData);
    //     this.currentModeOfOperation = ModeOfOperation.Delete;
    // }

    // //calls API to soft-delete
    // deleteItem() {
    //     let item = this.currentRow;
    //     var itemExists = this.checkItemExists(item);
    //     if (itemExists) {
    //         this.currentModeOfOperation = ModeOfOperation.Update;
    //         item.updatedBy = this.userName;
    //         item.isDelete = true;
    //         this.coreDataService.update(item).subscribe(response => {
    //             this.alertService.showMessage('Success', this.rowName + " removed successfully.", MessageSeverity.success);
    //             this.getItemList();
    //         });
    //     }
    //     this.dismissModal();
    // }

    // //Close open modal
    // dismissModal() {
    //     this.currentRow = this.newItem(0);
    //     this.auditHistory = [];
    //     this.currentModeOfOperation = ModeOfOperation.None;
    // }

    // //Get the page's grid data
    // getItemList() {
    //     this.coreDataService.getAll().subscribe(res => {
    //         const responseData = res[0];
    //         this.itemList = responseData;
    //         this.totalRecords = responseData.length;
    //         this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    //     })
    // }

    // newItem(rowData): StageCode {
    //     let item = new StageCode();
    //     let defaultUserName = "admin";
    //     if (rowData) {
    //         item.stageCodeId = rowData.stageCodeId || 0;
    //         item.gateCode = rowData.gateCode || (rowData.gateCode || "");
    //         item.description = rowData.description || (rowData.description || "");
    //         item.sequence = rowData.sequence || (rowData.sequence || "");
    //         item.memo = rowData.memo || (rowData.memo || "");
    //         item.updatedBy = this.userName || defaultUserName;
    //         item.createdBy = this.userName || defaultUserName;
    //         item.isActive = rowData.isActive || false;
    //         item.isDelete = rowData.isDelete || false;
    //     }
    //     return item;
    // }

    // openItemForEdit(rowData): void {
    //     this.currentRow = this.newItem(rowData);
    //     this.currentModeOfOperation = ModeOfOperation.Update;
    // }

    // //to-do:onchange 
    // //reorderValues(event) {
    // //    this.columnHeaders.sort(function (a: any, b: any) { return (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0); });
    // //}

    // saveNewItem(): void {
    //     this.currentModeOfOperation = ModeOfOperation.Add;
    //     this.coreDataService.add(this.currentRow).subscribe(response => {
    //         this.alertService.showMessage('Success', this.rowName + " added successfully.", MessageSeverity.success);
    //         this.getItemList();
    //     });
    //     this.currentModeOfOperation = ModeOfOperation.None;
    // }

    // saveExistingItem(rowData): void {
    //     let item = this.newItem(rowData);
    //     var itemExists = this.checkItemExists(item);
    //     if (itemExists) {
    //         this.currentModeOfOperation = ModeOfOperation.Update;
    //         item.updatedBy = this.userName;
    //         this.coreDataService.update(item).subscribe(response => {
    //             this.alertService.showMessage('Success', this.rowName + " updated successfully.", MessageSeverity.success);
    //             this.getItemList();
    //         });
    //     } else {
    //         this.saveNewItem();
    //     }
    //     this.dismissModal();
    // }

    // //Open the audit history modal.
    // showHistory(rowData): void {
    //     this.currentModeOfOperation = ModeOfOperation.Audit;
    //     let item = this.newItem(rowData);
    //     this.coreDataService.getItemAuditById(item.stageCodeId).subscribe(audits => {
    //         if (audits[0].length > 0) {
    //             this.auditHistory = audits[0];
    //         }
    //     });
    // }

    // showItemEdit(rowData): void {
    //     this.currentRow = this.newItem(rowData);
    //     this.currentModeOfOperation = ModeOfOperation.Update;
    // }

    // //turn the item active/inActive
    // toggleActiveStatus(rowData) {
    //     this.currentRow = this.newItem(rowData);
    //     this.saveExistingItem(this.currentRow);
    // }

    // updateItem(): void {
    //     this.saveExistingItem(this.currentRow);
    // }

    // viewItemDetails(rowData) {
    //     this.itemDetails = rowData;
    // }

    // //Step x: load all the required data for the page to function
    // private loadData() {
    //     this.getItemList();
    //     this.rowName = "Stage Code";
    //     this.header = "Stage Code";
    //     this.breadCrumb.currentUrl = '/singlepages/singlepages/app-stage-code';
    //     this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    //     //Step x: Add the required details for dropdown options/column header
    //     this.columnHeaders = [
    //         { field: 'gateCode', header: 'Gate Code', index: 1, showByDefault: true },
    //         { field: 'description', header: 'Description', index: 2, showByDefault: true },
    //         { field: 'sequence', header: 'Sequence', index: 3, showByDefault: true },
    //         { field: 'memo', header: 'Memo', index: 4, showByDefault: true }
    //     ];
    //     this.currentModeOfOperation = ModeOfOperation.None;
    //     this.selectedColumns = this.columnHeaders;
    //     this.currentRow = this.newItem(0);
    // }

}