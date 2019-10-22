import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService, MessageSeverity } from "../../services/alert.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { AuditHistory } from '../../models/audithistory.model';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
//
import { AssetTypeService } from "../../services/asset-type/asset-type.service";
import { AssetType } from "../../models/asset-type.model";
import { ModeOfOperation } from "../../models/ModeOfOperation.enum";
import { UploadTag } from "../../models/UploadTag.enum";

//
@Component({
    selector: 'app-asset-type',
    templateUrl: './asset-type.component.html',
    styleUrls: ['./asset-type.component.scss'],
    animations: [fadeInOut]
})
export class AssetTypeComponent implements OnInit {
    auditHistory: any[];
    columnHeaders: any[];
    currentModeOfOperation: ModeOfOperation;
    disableSave: boolean = false;
    header: string;
    itemList: AssetType[];
    itemDetails: any;
    modal: NgbModalRef;
    pageIndex: number = 0;
    pageSize: number = 10;
    rowName: string;
    selectedColumns: any[];
    selectedRowforDelete: any;
    selectedRowforEdit: any;
    totalRecords: any;
    totalPages: number;
    formData: FormData;
    uploadedRecords: Object;
    constructor(private breadCrumb: SingleScreenBreadcrumbService, private alertService: AlertService, private coreDataService: AssetTypeService, private modalService: NgbModal, private authService: AuthService) {
    }
    ngOnInit(): void {
        //Get page-rendering payload
        this.loadData();
    }

    //for auditing
    get userName(): string {
        //to-do:fix the empty username
        return this.authService.currentUser ? this.authService.currentUser.userName : "admin";
    }

    //
    addNewItem(): void {
        this.selectedRowforEdit = new AssetType();
        this.selectedRowforEdit.createdBy = this.userName;
        this.currentModeOfOperation = ModeOfOperation.Add;
    }

    bulkUpload(event) {
        this.formData = new FormData();
        const file = event.target.files;
        if (file.length > 0) {
            this.formData.append('file', file[0]);
            this.coreDataService.bulkUpload(this.formData).subscribe(response => {
                //event.target.value = '';
                let bulkUploadResult = response[0];
                this.showBulkUploadResult(bulkUploadResult);
                this.getItemList();
            })
        }

    }

    //to-do: Build lazy loading
    changePage(event: { first: any; rows: number }) {
        const pageIndex = (event.first / event.rows);
        this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }

    //Check if item exists before add/delete
    checkItemExists(rowData): boolean {
        this.getItemList();
        const exists = this.itemList.some(item => item.assetTypeName == rowData.assetTypeName && item.assetTypeMemo == rowData.assetTypeMemo);
        return exists;
    }

    confirmItemDelete(rowData) {
        this.selectedRowforDelete = rowData;
        this.currentModeOfOperation = ModeOfOperation.Delete;
    }

    //Step D3: calls API to soft-delete
    deleteItem() {
        let rowData = this.selectedRowforDelete;
        let itemExists = this.checkItemExists(rowData);
        if (itemExists) {
            this.currentModeOfOperation = ModeOfOperation.Delete;
            //
            this.coreDataService.remove(this.selectedRowforDelete.assetTypeId).subscribe(response => {
                this.alertService.showMessage('Success', this.rowName + " removed successfully.", MessageSeverity.success);
                this.getItemList();
            });
        }
        this.dismissModal();
    }

    //Reset the modal
    dismissModal() {
        this.selectedRowforEdit = new AssetType();
        this.selectedRowforDelete = new AssetType();
        this.auditHistory = [];
        this.currentModeOfOperation = ModeOfOperation.None;
    }

    getItemList() {
        this.coreDataService.getAll().subscribe(res => {
            const responseData = res[0];
            this.itemList = responseData;
            this.totalRecords = responseData.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        })
    }

    //Filters the grid data
    filterAssetTypes(event) {
        const AssetTypeData = [...this.itemList.filter(x => {
            //change filter conditions if required. currently filters by name
            return x.assetTypeName.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.itemList = AssetTypeData;
    }

    openItemForEdit(rowData): void {
        this.selectedRowforEdit = rowData;
        this.currentModeOfOperation = ModeOfOperation.Update;
    }

    //
    reorderValues(event) {
        this.columnHeaders.sort(function (a: any, b: any) { return (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0); });
    }

    saveNewItem(): void {
        this.currentModeOfOperation = ModeOfOperation.Add;
        this.coreDataService.add(this.selectedRowforEdit).subscribe(response => {
            this.alertService.showMessage('Success', this.rowName + " added successfully.", MessageSeverity.success);
            this.getItemList();
        });
        this.currentModeOfOperation = ModeOfOperation.None;
    }

    saveExistingItem(rowData): void {
        var itemExists = this.checkItemExists(rowData);
        if (itemExists) {
            this.currentModeOfOperation = ModeOfOperation.Update;
            rowData.updatedBy = this.userName;
            this.coreDataService.update(rowData).subscribe(response => {
                this.alertService.showMessage('Success', this.rowName + " updated successfully.", MessageSeverity.success);
                this.getItemList();
            });
        } else {
            this.saveNewItem();
        }
        this.dismissModal();
    }

    showBulkUploadResult(items: any) {
        let successCount = items.filter(item => item.UploadTag == UploadTag.Success);
        let failedCount = items.filter(item => item.UploadTag == UploadTag.Failed);
        let duplicateCount = items.filter(item => item.UploadTag == UploadTag.Duplicate);
        this.alertService.showMessage('Success', `${successCount} ${this.rowName}${successCount > 1 ? 's' : ''} uploaded successfully.`, MessageSeverity.success);
        this.alertService.showMessage('Error', `${failedCount} ${this.rowName}${failedCount > 1 ? 's' : ''} failed to upload.`, MessageSeverity.error);
        this.alertService.showMessage('Info', `${duplicateCount} ${duplicateCount > 1 ? 'duplicates' : 'duplicate'} ignored.`, MessageSeverity.info);
    }

    showHistory(rowData): void {
        this.currentModeOfOperation = ModeOfOperation.Audit;
        //
        this.coreDataService.getItemAuditById(rowData.assetTypeId).subscribe(audits => {
            if (audits[0].length > 0) {
                this.auditHistory = audits[0];
            }
        });
    }

    showItemEdit(rowData): void {
        this.selectedRowforEdit = rowData;
        this.currentModeOfOperation = ModeOfOperation.Update;
    }

    toggleActiveStatus(rowData) {
        this.selectedRowforEdit = rowData;
        this.saveExistingItem(rowData);
    }

    updateItem(): void {
        this.saveExistingItem(this.selectedRowforEdit);
    }

    viewItemDetails(rowData) {
        this.itemDetails = rowData;
    }

    //
    private loadData() {
        this.getItemList();
        //
        this.rowName = "Asset Type";
        this.header = "Asset Type";
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-asset-type';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        //Required details for dropdown options/column header
        this.columnHeaders = [
            { field: 'assetTypeName', header: 'Name', index: 1, showByDefault: true },
            { field: 'assetTypeMemo', header: 'Memo', index: 2, showByDefault: true }
        ];
        this.currentModeOfOperation = ModeOfOperation.None;
        this.selectedColumns = this.columnHeaders;
        this.selectedRowforEdit = new AssetType();
    }

}