import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService, MessageSeverity } from "../../services/alert.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { AuditHistory } from '../../models/audithistory.model';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { AssetAttributeType } from "../../models/asset-attribute-type.model";
import { AssetAttributeTypeService } from "../../services/asset-attribute-type/asset-attribute-type.service";
import { ModeOfOperation } from "../../models/ModeOfOperation.enum";

@Component({
    selector: 'app-asset-attribute-type',
    templateUrl: './asset-attribute-type.component.html',
    styleUrls: [],
    animations: [fadeInOut]
})
export class AssetAttributeTypeComponent implements OnInit {
    itemList: AssetAttributeType[];
    columnHeaders: any[];
    itemDetails: any;
    currentRow: AssetAttributeType;
    currentModeOfOperation: ModeOfOperation;
    rowName: string;
    header: string;
    disableSave: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    modal: NgbModalRef;
    selectedColumns: any[];
    auditHistory: any[];
    constructor(private breadCrumb: SingleScreenBreadcrumbService, private alertService: AlertService, private coreDataService: AssetAttributeTypeService, private modalService: NgbModal, private authService: AuthService) {
    }
    ngOnInit(): void {
        //gather up all the required data to be displayed on the screen 
        this.loadData();
    }

    //for auditing
    get userName(): string {
        //to-do:fix the empty username
        return this.authService.currentUser ? this.authService.currentUser.userName : "admin";
    }

    //Step E1: Open row up for editing
    addNewItem(): void {
        this.currentRow = new AssetAttributeType();
        this.currentModeOfOperation = ModeOfOperation.Add;
    }

    //Functionality for pagination.
    //to-do: Build lazy loading
    changePage(event: { first: any; rows: number }) {
        const pageIndex = (event.first / event.rows);
        this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }

    //Check if asset type exists before add/delete
    checkItemExists(rowData): boolean {
        this.getItemList();
        let item = rowData as AssetAttributeType;
        const exists = this.itemList.some(existingItem =>
            existingItem.assetTypeId == item.assetTypeId &&
            existingItem.assetAttributeTypeName == item.assetAttributeTypeName &&
            existingItem.description == item.description &&
            existingItem.conventionType == item.conventionType &&
            existingItem.depreciationMethod == item.depreciationMethod &&
            existingItem.residualPercentage == item.residualPercentage &&
            existingItem.residualValue == item.residualValue &&
            existingItem.assetLife == item.assetLife &&
            existingItem.depreciationFrequencyId == item.depreciationFrequencyId &&
            existingItem.acquiredGLAccountId == item.acquiredGLAccountId &&
            existingItem.deprExpenseGLAccountId == item.deprExpenseGLAccountId &&
            existingItem.adDepsGLAccountId == item.adDepsGLAccountId &&
            existingItem.assetSale == item.assetSale &&
            existingItem.assetWriteOff == item.assetWriteOff &&
            existingItem.assetWriteDown == item.assetWriteDown
        );
        return exists;
    }

    //Open the confirmation to delete
    confirmItemDelete(rowData) {
        this.currentRow = rowData as AssetAttributeType;
        this.currentModeOfOperation = ModeOfOperation.Delete;
    }

    //calls API to soft-delete
    deleteItem() {
        let item = this.currentRow;
        var itemExists = this.checkItemExists(item);
        if (itemExists) {
            this.currentModeOfOperation = ModeOfOperation.Update;
            item.updatedBy = this.userName;
            //item.isDelete = true;
            this.coreDataService.remove(item.assetAttributeTypeId).subscribe(response => {
                this.alertService.showMessage('Success', this.rowName + " removed successfully.", MessageSeverity.success);
                this.getItemList();
            });
        }
        this.dismissModal();
    }

    //Close open modal
    dismissModal() {
        this.currentRow = new AssetAttributeType();
        this.auditHistory = [];
        this.currentModeOfOperation = ModeOfOperation.None;
    }

    //Get the page's grid data
    getItemList() {
        this.coreDataService.getAll().subscribe(res => {
            const responseData = res[0];
            const itemList = [];
            responseData.forEach(function (item) {
                let nItem = item as AssetAttributeType;
                itemList.push(nItem);
            });
            this.itemList = itemList;
            this.totalRecords = responseData.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        })
    }

    newItem(rowData): AssetAttributeType {
        let userName = this.userName || "admin";
        rowData.updatedBy = rowData.updatedBy || userName;
        rowData.isActive = rowData.isActive || false;
        rowData.isDelete = rowData.isDelete || false;
        let item = new AssetAttributeType(rowData.assetAttributeTypeId, rowData.assetTypeId, rowData.description, rowData.assetAttributeTypeName, rowData.conventionType, rowData.depreciationMethod, rowData.residualPercentage, rowData.residualValue, rowData.assetLife, rowData.depreciationFrequencyId, rowData.acquiredGLAccountId, rowData.deprExpenseGLAccountId, rowData.adDepsGLAccountId, rowData.assetSale, rowData.assetWriteOff, rowData.assetWriteDown, rowData.createdBy, rowData.createdDate, rowData.updatedDate, rowData.updatedBy, rowData.isActive, rowData.isDelete);
        debugger;
        return item;
    }

    openItemForEdit(rowData): void {
        this.currentRow = rowData as AssetAttributeType;
        this.currentModeOfOperation = ModeOfOperation.Update;
    }

    saveNewItem(): void {
        this.currentModeOfOperation = ModeOfOperation.Add;
        this.coreDataService.add(this.currentRow).subscribe(response => {
            this.alertService.showMessage('Success', this.rowName + " added successfully.", MessageSeverity.success);
            this.getItemList();
        });
        this.currentModeOfOperation = ModeOfOperation.None;
    }

    saveExistingItem(rowData): void {
        let item = rowData as AssetAttributeType;
        var itemExists = this.checkItemExists(item);
        if (itemExists) {
            this.currentModeOfOperation = ModeOfOperation.Update;
            item.updatedBy = this.userName;
            this.coreDataService.update(item).subscribe(response => {
                this.alertService.showMessage('Success', this.rowName + " updated successfully.", MessageSeverity.success);
                this.getItemList();
            });
        } else {
            this.saveNewItem();
        }
        this.dismissModal();
    }

    //Open the audit history modal.
    showHistory(rowData): void {
        this.currentModeOfOperation = ModeOfOperation.Audit;
        let item = rowData as AssetAttributeType;
        this.coreDataService.getItemAuditById(item.assetAttributeTypeId).subscribe(audits => {
            if (audits[0].length > 0) {
                this.auditHistory = audits[0];
            }
        });
    }

    showItemEdit(rowData): void {
        this.currentRow = rowData as AssetAttributeType;
        this.currentModeOfOperation = ModeOfOperation.Update;
    }

    //turn the item active/inActive
    toggleActiveStatus(rowData) {
        this.currentRow = rowData as AssetAttributeType;
        this.saveExistingItem(this.currentRow);
    }

    updateItem(): void {
        this.saveExistingItem(this.currentRow);
    }

    viewItemDetails(rowData) {
        this.itemDetails = rowData;
    }

    //Step x: load all the required data for the page to function
    private loadData() {
        this.getItemList();
        this.rowName = "Asset Attribute Type";
        this.header = "Asset Attribute Type";
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-asset-attribute-type';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);

        //Step x: Add the required details for dropdown options/column header
        this.columnHeaders = [
            { field: 'assetTypeId', header: 'Asset Type', index: 1, showByDefault: true },
            { field: 'description', header: 'Description', index: 1, showByDefault: true },
            { field: 'assetAttributeTypeName', header: 'Name', index: 1, showByDefault: true },
            { field: 'conventionType', header: 'Convention Type', index: 1, showByDefault: true },
            { field: 'depreciationMethod', header: 'Depreciation Method', index: 1, showByDefault: true },
            { field: 'residualPercentage', header: 'Residual Percentage', index: 1, showByDefault: true },
            { field: 'residualValue', header: 'Residual Value', index: 1, showByDefault: true },
            { field: 'assetLife', header: 'Asset Life', index: 1, showByDefault: true },
            { field: 'depreciationFrequencyId', header: 'Depreciation Frequency', index: 1, showByDefault: true },
            { field: 'acquiredGLAccountId', header: 'Acquired GL Account', index: 1, showByDefault: true },
            { field: 'deprExpenseGLAccountId', header: 'Depr Expense GL Account', index: 1, showByDefault: true },
            { field: 'adDepsGLAccountId', header: 'AdDepsGLAccountId', index: 1, showByDefault: true },
            { field: 'assetSale', header: 'Asset Sale', index: 1, showByDefault: true },
            { field: 'assetWriteOff', header: 'Asset Write Off', index: 1, showByDefault: true },
            { field: 'assetWriteDown', header: 'Asset Write Down', index: 1, showByDefault: true }
        ];
        this.currentModeOfOperation = ModeOfOperation.None;
        this.selectedColumns = this.columnHeaders;
        this.currentRow = new AssetAttributeType();
    }

}