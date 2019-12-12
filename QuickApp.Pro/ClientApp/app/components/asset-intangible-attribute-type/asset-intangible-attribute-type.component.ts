import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AlertService, MessageSeverity } from "../../services/alert.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { AuditHistory } from '../../models/audithistory.model';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { AssetIntangibleAttributeType } from "../../models/asset-intangible-attribute-type.model";
import { AssetIntangibleType } from "../../models/asset-intangible-type.model";
import { AssetIntangibleAttributeTypeService } from "../../services/asset-intangible-attribute-type/asset-intangible-attribute-type.service";
import { ModeOfOperation } from "../../models/ModeOfOperation.enum";
import { ConfigurationService } from '../../services/configuration.service';
import { validateRecordExistsOrNot, editValueAssignByCondition, getObjectById, selectedValueValidate, getObjectByValue } from '../../generic/autocomplete';
import { CommonService } from '../../services/common.service';
import { GlAccountService } from '../../services/glAccount/glAccount.service';
import { GlAccount } from '../../models/GlAccount.model';

@Component({
    selector: 'app-asset-intangible-attribute-type',
    templateUrl: './asset-intangible-attribute-type.component.html',
    styleUrls: [],
    animations: [fadeInOut]
})
export class AssetIntangibleAttributeTypeComponent implements OnInit {
    itemList: AssetIntangibleAttributeType[];
    filteredItemList: AssetIntangibleAttributeType[];
    allAssetIntangibleTypes: AssetIntangibleType[];
    filteredAssetIntangibleTypes: AssetIntangibleType[];
    filteredGLAccountList: any[] = [];
    filteredAssetSaleList: any[] = [];
    assetWriteOffList: any[] = [];
    filteredWriteOffList: any[] = [];
    assetWriteDownList: any[] = [];
    filteredAssetWriteDownList: any[] = [];
    columnHeaders: any[];
    itemDetails: any;
    currentRow: AssetIntangibleAttributeType;
    currentModeOfOperation: ModeOfOperation;
    rowName: string;
    header: string;
    disableSave: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    modal: NgbModalRef;
    allGlInfo: any[] = [];
    selectedColumns: any[];
    auditHistory: any[] = [];
    formData = new FormData();
    existingRecordsResponse: Object;
    allAssetIntangibleAttributeTypes: any[] = [];
    localCollection: any[] = [];
    selectedAssetIntangible: any;
    sourceAction: AssetIntangibleAttributeType;
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    loadingIndicator: boolean;
    closeResult: string;
    depreciationFreq: any[] = [];
    percentageList: any[] = [];
    companyList: any[];
    buList: any[];
    divisionList: any[];
    departmentList: any[];
    selectedCompanyID: number = 0;
    selectedBUId: number = 0;
    selectedDivisionID: number = 0;
    selectedDeptID: number = 0;
    allmgmtData: any[];
    mgmtStructureId: any;
    disableForMgmtStructure: boolean;

    constructor(private breadCrumb: SingleScreenBreadcrumbService, private commonservice: CommonService, private glAccountService: GlAccountService, private configurations: ConfigurationService, private alertService: AlertService, private coreDataService: AssetIntangibleAttributeTypeService, private modalService: NgbModal, private authService: AuthService) {
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

    //loading GlAccount from generalLedger//
    private glList() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.glAccountService.getAll().subscribe(
            results => this.onGlAccountLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

    }

    private onGlAccountLoad(getGlList: GlAccount[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allGlInfo = getGlList;
        //this.loadSelectedNames();
    }

    filterGLAccount(event): void {
        this.filteredGLAccountList = this.allGlInfo;
        const GLADATA = [...this.allGlInfo.filter(x => {
            return x.accountName.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.filteredGLAccountList = GLADATA;
    }

    filterAssetSale(event): void {
        this.filteredAssetSaleList = this.allGlInfo;
        const GLADATA = [...this.allGlInfo.filter(x => {
            return x.accountCode.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.filteredAssetSaleList = GLADATA;
    }

    filterAssetWriteOff(event): void {
        this.filteredWriteOffList = this.allGlInfo;
        const GLADATA = [...this.allGlInfo.filter(x => {
            return x.accountCode.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.filteredWriteOffList = GLADATA;
    }

    filterAssetWriteDown(event): void {
        this.filteredAssetWriteDownList = this.allGlInfo;
        const GLADATA = [...this.allGlInfo.filter(x => {
            return x.accountCode.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.filteredAssetWriteDownList = GLADATA;
    }

    getAllPercentage() {
        this.commonservice.smartDropDownList('[Percent]', 'PercentId', 'PercentValue').subscribe(res => {
            //////console.log('res: '+res);
            this.percentageList = res;
        });
        //////console.log('percentge list : ', this.percentageList);
    }

    getAllFrequency() {
        this.commonservice.smartDropDownList('[AssetDepreciationFrequency]', 'AssetDepreciationFrequencyId', 'Name').subscribe(res => {
            this.depreciationFreq = res;
            //this.loadSelectedNames();
        })
    }

    companySelected(): void {
        ////console.log(`Company Id :${this.selectedCompanyID}`);

        if (this.selectedCompanyID != undefined && this.selectedCompanyID.toString() !== "0") {
            this.mgmtStructureId = this.selectedCompanyID;
            this.disableForMgmtStructure = false;
        }
        else {
            this.disableForMgmtStructure = true;
        }
        this.divisionList = [];
        this.departmentList = [];
        this.selectedBUId = 0;
        this.selectedDeptID = 0;
        this.selectedDivisionID = 0;
        this.buList = this.allmgmtData.filter(c => c.parentId === this.selectedCompanyID);
    }

    buSelected(): void {
        ////console.log(`BU :${this.selectedBUId}`);
        this.mgmtStructureId = this.selectedBUId;
        if (this.selectedBUId.toString() !== "0") {
            this.mgmtStructureId = this.selectedBUId;
        } else {
            this.mgmtStructureId = this.selectedCompanyID;
        }

        this.departmentList = [];
        this.selectedDeptID = 0;
        this.selectedDivisionID = 0;
        this.divisionList = this.allmgmtData.filter(c => c.parentId === this.selectedBUId);
    }

    divisionSelected(): void {
        ////console.log(`Division id :${this.selectedDivisionID}`);
        if (this.selectedDivisionID.toString() !== "0") {
            this.mgmtStructureId = this.selectedDivisionID;
        } else {
            this.mgmtStructureId = this.selectedBUId;
        }
        this.departmentList = this.allmgmtData.filter(c => c.parentId === this.selectedDivisionID);
    }

    departmentSelected(): void {
        if (this.selectedDeptID.toString() !== "0") {
            this.mgmtStructureId = this.selectedDeptID;
        } else {
            this.mgmtStructureId = this.selectedDivisionID;
        }

    }

    populateMgmtStructure(mgmtStructureId: number): void {
        // find the record first
        let mgmtRecord = this.findmgmtRecord(mgmtStructureId);
        let level0siblings: any[] = null;
        let level0parent: any = null;
        let level1siblings: any[] = null;
        let level1parent: any = null;
        let level2siblings: any[] = null;
        let level2parent: any = null;
        let level3siblings: any[] = null;
        let level3parent: any = null;
        let level4siblings: any[] = null;
        let level4parent: any = null;
        if (mgmtRecord != undefined && mgmtRecord !== null && mgmtRecord.parentId !== null) {
            level0siblings = this.findmgmtSiblingRecords(mgmtRecord.parentId);
            level0parent = this.findmgmtRecord(mgmtRecord.parentId);
        }
        if (level0parent != undefined && level0parent != null && level0parent.parentId !== null) {
            level1siblings = this.findmgmtSiblingRecords(level0parent.parentId);
            level1parent = this.findmgmtRecord(level0parent.parentId);
        }
        if (level1parent != undefined && level1parent != null && level1parent.parentId !== null) {
            level2siblings = this.findmgmtSiblingRecords(level1parent.parentId);
            level2parent = this.findmgmtRecord(level1parent.parentId);
        }
        if (level2parent != undefined && level2parent != null && level2parent.parentId !== null) {
            level3siblings = this.findmgmtSiblingRecords(level2parent.parentId);
            level3parent = this.findmgmtRecord(level2parent.parentId);
        }
        if (level3parent != undefined && level3parent != null && level3parent.parentId !== null) {
            level4siblings = this.findmgmtSiblingRecords(level3parent.parentId);
            level4parent = this.findmgmtRecord(level3parent.parentId);
        }

        //means this is a company that is selected hence it has no parent
        if (level0parent == undefined || level0parent === null) {
            this.selectedCompanyID = mgmtStructureId;
            this.selectedBUId = 0;
            this.selectedDivisionID = 0;
            this.selectedDeptID = 0;
            return;
        }
        // this means bu is selected as Bu will have a level0 parent but nothing abobie
        if (level1parent == undefined || level1parent === null) {
            this.buList = level0siblings;
            this.selectedBUId = mgmtStructureId;
            this.selectedCompanyID = level0parent.managementStructureId;
            this.selectedDivisionID = 0;
            this.selectedDeptID = 0;
            return;
        }
        // this means division is selected as Bu will have a level0 parent but nothing abobie
        if (level2parent == undefined || level2parent === null) {
            this.divisionList = level0siblings
            this.selectedDivisionID = mgmtStructureId;
            this.buList = level1siblings;
            this.selectedBUId = level0parent.managementStructureId;
            this.selectedCompanyID = level1parent.managementStructureId;
            this.selectedDeptID = 0;
            return;
        }
        // this means dept is selected
        if (level3parent == undefined || level3parent === null) {

            this.departmentList = level0siblings;
            this.selectedDeptID = mgmtStructureId;
            this.divisionList = level1siblings;
            this.selectedDivisionID = level0parent.managementStructureId;
            this.buList = level2siblings;
            this.selectedBUId = level1parent.managementStructureId;
            this.selectedCompanyID = level2parent.managementStructureId;
            return;
        }

    }

    findmgmtRecord(id: number): any {
        return this.allmgmtData.find(c => c.managementStructureId === id);
    }

    findmgmtSiblingRecords(parentid: number): any[] {
        return this.allmgmtData.filter(c => c.parentId == parentid);
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
        const exists = this.itemList.some(existingItem => existingItem.assetintangibleAttributeTypeId === item.assetintangibleAttributeTypeId);
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
            this.coreDataService.remove(item.assetintangibleAttributeTypeId).subscribe(response => {
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

    newItem(rowData): AssetIntangibleAttributeType {
        let item = new AssetIntangibleAttributeType();
        let defaultUserName = "admin";
        if (rowData) {
            item.assetintangibleAttributeTypeId = rowData.assetintangibleAttributeTypeId || 0;
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
        console.log(rowData.assetintangibleAttributeTypeId);
        this.currentRow = this.newItem(rowData);
        this.currentRow = {
            ...rowData,
            assetIntangibleAttributeName: getObjectById('assetintangibleAttributeTypeId', rowData.assetintangibleAttributeTypeId, this.itemList)
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
        this.coreDataService.getItemAuditById(item.assetintangibleAttributeTypeId).subscribe(audits => {
            if (audits[0].length > 0) {
                this.auditHistory = audits[0];
            }
        });
    }

    showItemEdit(rowData): void {
        console.log(rowData.assetintangibleAttributeTypeId);
        this.currentRow = this.newItem(rowData);
        this.currentRow = {
            ...rowData,
            assetIntangibleName: getObjectById('AssetIntangibleAttributeTypeId', rowData.AssetIntangibleAttributeTypeId, this.itemList)
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
        this.rowName = "Intangible Attribute Type";
        this.header = "Intangible Attribute  Type";
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-asset-intangible-attribute-type';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        //Step x: Add the required details for dropdown options/column header
        this.columnHeaders = [
            { field: 'companyName', header: 'Company', index: 1, showByDefault: true },
            { field: 'buName', header: 'Bu', index: 2, showByDefault: true },
            { field: 'divisionName', header: 'Division', index: 3, showByDefault: true },
            { field: 'deptName', header: 'Dept', index: 4, showByDefault: true },
            { field: 'intangibleTypeName', header: 'Intangible Type', index: 5, showByDefault: true },
            { field: 'amortizationMethodName', header: 'Amortization Method', index: 6, showByDefault: true },
            { field: 'intangibleLifeName', header: 'Intangible Life', index: 7, showByDefault: true },
            { field: 'amortFrequency', header: 'Amort Frequency', index: 8, showByDefault: true },
            { field: 'intangibleGL', header: 'Intangible GL', index: 8, showByDefault: true },
            { field: 'amortExpenseGL', header: 'Amort Expense GL', index: 9, showByDefault: true },
            { field: 'accAmortdeprGL', header: 'Acc Amort Depr GL', index: 10, showByDefault: true },
            { field: 'intangiblewritedDownGL', header: 'Intangible Write Down GL', index: 11, showByDefault: true },
            { field: 'intangiblewritedoffGL', header: 'Intangible Write Off GL', index: 12, showByDefault: true },
        ];
        this.currentModeOfOperation = ModeOfOperation.None;
        this.selectedColumns = this.columnHeaders;
        this.currentRow = this.newItem(0);
    }

    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=AssetIntangibleAttributeType&fileName=AssetIntangibleAttributeType.xlsx`;

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
        for (let i = 0; i < this.allAssetIntangibleAttributeTypes.length; i++) {
            if (event == this.allAssetIntangibleAttributeTypes[i][0].assetIntangibleName) {
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
        this.filteredAssetIntangibleTypes = this.allAssetIntangibleTypes;

        const IntangibleData = [...this.allAssetIntangibleTypes.filter(x => {
            return x.assetIntangibleName.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.allAssetIntangibleTypes = IntangibleData;
    }

    filterIntangibleNames(event) {
        this.localCollection = [];
        for (let i = 0; i < this.itemList.length; i++) {
            let assetIntangibleName = this.allAssetIntangibleTypes[i].assetIntangibleName;
            if (assetIntangibleName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.allAssetIntangibleAttributeTypes.push([{
                    //"AssetIntangibleAttributeTypeId": this.itemList[i].AssetIntangibleAttributeTypeId,
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