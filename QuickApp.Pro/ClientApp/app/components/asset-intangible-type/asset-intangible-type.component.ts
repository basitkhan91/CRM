import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService, MessageSeverity } from "../../services/alert.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { AuditHistory } from '../../models/audithistory.model';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { AssetIntangibleType } from "../../models/asset-intangible-type.model";
import { AssetIntangibleTypeService } from "../../services/asset-intangible-type/asset-intangible-type.service";
import { ModeOfOperation } from "../../models/ModeOfOperation.enum";
import { ConfigurationService } from '../../services/configuration.service';
import { validateRecordExistsOrNot, editValueAssignByCondition, getObjectById, selectedValueValidate, getObjectByValue } from '../../generic/autocomplete';

@Component({
    selector: 'app-asset-intangible-type',
    templateUrl: './asset-intangible-type.component.html',
    styleUrls: [],
    animations: [fadeInOut]
})
export class AssetIntangibleTypeComponent implements OnInit {
    itemList: AssetIntangibleType[];
    filteredItemList: AssetIntangibleType[];
    columnHeaders: any[];
    itemDetails: any;
    currentRow: AssetIntangibleType;
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
    auditHistory: any[] = [];
    formData = new FormData();
    existingRecordsResponse: Object;
    allAssetIntangibleTypes: any[] = [];
    localCollection: any[] = [];
    selectedAssetIntangible: any;
    sourceAction: AssetIntangibleType;
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    loadingIndicator: boolean;
    closeResult: string;

    constructor(private breadCrumb: SingleScreenBreadcrumbService, private configurations: ConfigurationService, private alertService: AlertService, private coreDataService: AssetIntangibleTypeService, private modalService: NgbModal, private authService: AuthService) {
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
        this.currentRow = this.newItem(0);
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
        let item = this.newItem(rowData);
        const exists = this.itemList.some(existingItem => existingItem.assetIntangibleTypeId === item.assetIntangibleTypeId);
        return exists;
    }

    //Open the confirmation to delete
    confirmItemDelete(rowData) {
        this.currentRow = this.newItem(rowData);
        this.currentModeOfOperation = ModeOfOperation.Delete;
    }

    //calls API to soft-delete
    deleteItem() {
        let item = this.currentRow;
        console.log('item', item);
        var itemExists = this.checkItemExists(item);
        console.log('itemExists : ', itemExists);
        if (itemExists) {
            this.currentModeOfOperation = ModeOfOperation.Update;
            item.updatedBy = this.userName;
            item.isDelete = true;
            this.coreDataService.remove(item.assetIntangibleTypeId).subscribe(response => {
                this.alertService.showMessage('Success', this.rowName + " removed successfully.", MessageSeverity.success);
                this.getItemList();
            });
        }
        this.dismissModal();
    }

    //Close open modal
    dismissModal() {
        this.currentRow = this.newItem(0);
        this.auditHistory = [];
        this.currentModeOfOperation = ModeOfOperation.None;
    }

    //Get the page's grid data
    getItemList() {
        this.coreDataService.getAll().subscribe(res => {
            const responseData = res[0];
            this.itemList = responseData;
            this.totalRecords = responseData.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        })
    }

    newItem(rowData): AssetIntangibleType {
        let item = new AssetIntangibleType();
        let defaultUserName = "admin";
        if (rowData) {
            item.assetIntangibleTypeId = rowData.assetIntangibleTypeId || 0;
            item.assetIntangibleName = rowData.assetIntangibleTypeName || (rowData.assetIntangibleName || "");
            item.assetIntangibleMemo = rowData.assetIntangibleTypeMemo || (rowData.assetIntangibleMemo || "");
            item.updatedBy = this.userName || defaultUserName;
            item.createdBy = this.userName || defaultUserName;
            item.isActive = rowData.isActive || false;
            item.isDelete = rowData.isDelete || false;
        }
        else {
            item.isActive = true;
        }
        return item;
    }

    openItemForEdit(rowData): void {
        console.log(rowData.assetIntangibleTypeId);
        this.currentRow = this.newItem(rowData);
        this.currentRow = {
            ...rowData,
            assetIntangibleName: getObjectById('assetIntangibleTypeId', rowData.assetIntangibleTypeId, this.itemList)
        };
        console.log(this.currentRow);
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
        let item = this.newItem(rowData);
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
        let item = this.newItem(rowData);
        this.coreDataService.getItemAuditById(item.assetIntangibleTypeId).subscribe(audits => {
            if (audits[0].length > 0) {
                this.auditHistory = audits[0];
            }
        });
    }

    showItemEdit(rowData): void {
        console.log(rowData.assetIntangibleTypeId);
        this.currentRow = this.newItem(rowData);
        this.currentRow = {
            ...rowData,
            assetIntangibleName: getObjectById('assetIntangibleTypeId', rowData.assetIntangibleTypeId, this.itemList)
        };
        console.log(this.currentRow);
        this.currentModeOfOperation = ModeOfOperation.Update;
    }

    //turn the item active/inActive
    toggleActiveStatus(rowData) {
        this.currentRow = this.newItem(rowData);
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
        this.rowName = "Asset Intangible Type";
        this.header = "Asset Intangible Type";
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-asset-intangible-type';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        //Step x: Add the required details for dropdown options/column header
        this.columnHeaders = [
            { field: 'assetIntangibleName', header: 'Name', index: 1, showByDefault: true },
            { field: 'assetIntangibleMemo', header: 'Memo', index: 2, showByDefault: true }
        ];
        this.currentModeOfOperation = ModeOfOperation.None;
        this.selectedColumns = this.columnHeaders;
        this.currentRow = this.newItem(0);
    }

    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=AssetIntangibleType&fileName=AssetIntangibleType.xlsx`;

        window.location.assign(url);
    }

    customExcelUpload(event) {
        const file = event.target.files;

        console.log(file);
        if (file.length > 0) {

            this.formData.append('file', file[0])
            this.coreDataService.bulkUpload(this.formData).subscribe(res => {
                event.target.value = '';

                this.formData = new FormData();
                this.existingRecordsResponse = res;
                this.getItemList();
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

    eventHandler(event) {
        let value = event.target.value.toLowerCase()
        if (this.selectedAssetIntangible) {
            if (value == this.selectedAssetIntangible.toLowerCase()) {
                this.disableSave = true;
            }
            else {
                this.disableSave = false;
            }
        }
    }

    itemId(event) {
        for (let i = 0; i < this.allAssetIntangibleTypes.length; i++) {
            if (event == this.allAssetIntangibleTypes[i][0].assetIntangibleName) {
                this.disableSave = true;
                this.selectedAssetIntangible = event;
            }

        }
    }
    selectedName(object) {
        const exists = selectedValueValidate('assetIntangibleName', object, this.currentRow);
        this.disableSave = !exists;
    }

    filterAssetIntangibleName(event) {
        this.filteredItemList = this.itemList;

        const ReasonCodeData = [...this.itemList.filter(x => {
            return x.assetIntangibleName.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.filteredItemList = ReasonCodeData;
    }

    filterIntangibleNames(event) {
        this.localCollection = [];
        for (let i = 0; i < this.itemList.length; i++) {
            let assetIntangibleName = this.itemList[i].assetIntangibleName;
            if (assetIntangibleName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.allAssetIntangibleTypes.push([{
                    "assetIntangibleTypeId": this.itemList[i].assetIntangibleTypeId,
                    "assetIntangibleName": assetIntangibleName
                }]),
                    this.localCollection.push(assetIntangibleName);
            }
        }
        console.log('this.localCollection', this.localCollection);
    }

    checkReasonCodeExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.itemList, this.currentRow);
        if (exists.length > 0) {
            this.disableSave = true;
        }
        else {
            this.disableSave = false;
        }

    }

}