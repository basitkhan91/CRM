import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService, MessageSeverity } from "../../services/alert.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { AuditHistory } from '../../models/audithistory.model';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { ExpenditureCategory } from "../../models/expenditure-category.model";
import { ExpenditureCategoryService } from "../../services/expenditure-category/expenditure-category.service";
import { ModeOfOperation } from "../../models/ModeOfOperation.enum";

@Component({
    selector: 'app-expenditure-category',
    templateUrl: './expenditure-category.component.html',
    styleUrls: [],
    animations: [fadeInOut]
})
export class ExpenditureCategoryComponent implements OnInit {
    itemList: ExpenditureCategory[];
    columnHeaders: any[];
    itemDetails: any;
    currentRow: ExpenditureCategory;
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
    constructor(private breadCrumb: SingleScreenBreadcrumbService, private alertService: AlertService, private coreDataService: ExpenditureCategoryService, private modalService: NgbModal, private authService: AuthService) {
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
        this.currentRow = new ExpenditureCategory();
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
        let item = rowData as ExpenditureCategory;
        const exists = this.itemList.some(existingItem => existingItem.description === item.description && existingItem.memo === item.memo);
        return exists;
    }

    //Open the confirmation to delete
    confirmItemDelete(rowData) {
        this.currentRow = rowData as ExpenditureCategory;
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
            this.coreDataService.remove(item.expenditureCategoryId).subscribe(response => {
                this.alertService.showMessage('Success', this.rowName + " removed successfully.", MessageSeverity.success);
                this.getItemList();
            });
        }
        this.dismissModal();
    }

    //Close open modal
    dismissModal() {
        this.currentRow = new ExpenditureCategory();
        this.auditHistory = [];
        this.currentModeOfOperation = ModeOfOperation.None;
    }

    //Get the page's grid data
    getItemList() {
        this.coreDataService.getAll().subscribe(res => {
            const responseData = res[0];
            const itemList = [];
            responseData.forEach(function (item) {
                let nItem = item as ExpenditureCategory;
                itemList.push(nItem);
            });
            this.itemList = itemList;
            this.totalRecords = responseData.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        })
    }

    newItem(rowData): ExpenditureCategory {
        let userName = this.userName || "admin";
        rowData.isActive = rowData.isActive || false;
        rowData.isDelete = rowData.isDelete || false;
        let item = new ExpenditureCategory(rowData.ExpenditureCategoryId, rowData.ExpenditureCategoryName, rowData.glcid, rowData.createdBy, rowData.createdDate, rowData.updatedDate, userName, rowData.isActive, rowData.isDelete);
        debugger;
        return item;
    }

    openItemForEdit(rowData): void {
        this.currentRow = rowData as ExpenditureCategory;
        this.currentModeOfOperation = ModeOfOperation.Update;
    }

    //to-do:onchange 
    //reorderValues(event) {
    //    this.columnHeaders.sort(function (a: any, b: any) { return (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0); });
    //}

    saveNewItem(): void {
        this.currentModeOfOperation = ModeOfOperation.Add;
        this.coreDataService.add(this.currentRow).subscribe(response => {
            this.alertService.showMessage('Success', this.rowName + " added successfully.", MessageSeverity.success);
            this.getItemList();
        });
        this.currentModeOfOperation = ModeOfOperation.None;
    }

    saveExistingItem(rowData): void {
        let item = rowData as ExpenditureCategory;
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
        let item = rowData as ExpenditureCategory;
        this.coreDataService.getItemAuditById(item.expenditureCategoryId).subscribe(audits => {
            if (audits[0].length > 0) {
                this.auditHistory = audits[0];
            }
        });
    }

    showItemEdit(rowData): void {
        this.currentRow = rowData as ExpenditureCategory;
        this.currentModeOfOperation = ModeOfOperation.Update;
    }

    //turn the item active/inActive
    toggleActiveStatus(rowData) {
        this.currentRow = rowData as ExpenditureCategory;
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
        this.rowName = "Expenditure Category";
        this.header = "Expenditure Category";
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-expenditure-category';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        //Step x: Add the required details for dropdown options/column header
        this.columnHeaders = [
            { field: 'description', header: 'Description', index: 1, showByDefault: true },
            { field: 'memo', header: 'Memo', index: 2, showByDefault: true }
        ];
        this.currentModeOfOperation = ModeOfOperation.None;
        this.selectedColumns = this.columnHeaders;
        this.currentRow = new ExpenditureCategory();
    }

}