import { OnInit, Component, AfterViewInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { fadeInOut } from "../../../services/animations";
import { POROCategory } from "../../../models/po-ro-category.model";
import { SingleScreenAuditDetails } from "../../../models/single-screen-audit-details.model";
import { AuthService } from "../../../services/auth.service";
import { POROCategoryService } from "../../../services/porocategory/po-ro-category.service";
import { AlertService, MessageSeverity } from '../../../services/alert.service';

@Component({
    selector: 'app-po-ro-category',
    templateUrl: './po-ro-category.component.html',
    styleUrls: ['./po-ro-category.component.scss'],
    animations: [fadeInOut]
})
export class PoRoCategoryComponent implements OnInit, AfterViewInit {

    currentporoCategory: POROCategory;
    poroCategoryToUpdate: POROCategory;
    poroCategoryToRemove: POROCategory;
    poroCategoryList: POROCategory[];
    modal: NgbModalRef;
    display: boolean = false;
    Active: string;
    AuditDetails: SingleScreenAuditDetails[];
    loadingIndicator: boolean;
    allPOROList: any[] = [];
    isDeleteMode: boolean = false;
    cols: any[];
    isEditMode: boolean;
    isSaving: boolean;
    public sourceAction: any = {};
    sourcePORPCategory: any;
    pageSize: number = 10;
    totalRecords: any;
    totalPages: number;
    selectedRowforDelete: any;
    updateMode: boolean;
    disableSave: boolean = false;

    headers = [
        { field: 'categoryName', header: 'Name' },
        { field: 'isPO', header: 'PO' },
        { field: 'isRO', header: 'RO' }
    ]
    selectedColumns = this.headers;

    new = {
        poroCategoryId: 1,
        categoryName: "",
        createdBy: "",
        updatedBy: "",
        createdDate: Date,
        updatedDate: Date,
        isPO: false,
        isRO: false,
        masterCompanyId: 1,
        isDelete: false,
        isActive: true,
    }

    addNew = { ...this.new };
    isEdit: boolean = false;
    selectedRecordForEdit: any;

    constructor(private alertService: AlertService, private poroCategoryService: POROCategoryService, private modalService: NgbModal, private authService: AuthService) {
        this.poroCategoryService.currentUrl = '/generalledgermodule/generalledgerpage/app-po-ro-category';
        this.poroCategoryService.bredcrumbObj.next(this.poroCategoryService.currentUrl);//Bread Crumb

    }

    ngOnInit(): void {
        this.loadData();
        this.poroCategoryService.currentUrl = '/generalledgermodule/generalledgerpage/app-po-ro-category';
        this.poroCategoryService.bredcrumbObj.next(this.poroCategoryService.currentUrl);
    }

    private loadData() {
        this.loadingIndicator = true;
        this.poroCategoryService.getAll().subscribe(
            results => this.onPORPSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    toggledbldisplay(content, row) {
        this.isEditMode = true;
        this.isSaving = true;
        this.sourceAction = row;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    changePage(event: { first: any; rows: number }) {
        console.log(event);
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    save() {

        const data = {
            ...this.addNew, createdBy: this.userName, updatedBy: this.userName, createdDate: Date, updatedDate: Date

        };
        const { selectedCompanysData, ...rest }: any = data;

        if (!data.categoryName) {
            this.disableSave = false
        }
        else {
            if (!this.isEdit) {
                this.poroCategoryService.add(rest).subscribe(() => {
                    this.resetForm();
                    this.poroCategoryService.getAll().subscribe(nodes => {
                        this.allPOROList = nodes[0];
                        this.loadData();
                    });
                    this.alertService.showMessage(
                        'Success',
                        `Added  New PO-RO Category Successfully`,
                        MessageSeverity.success
                    );
                })

            } else {
                this.poroCategoryService.update(data).subscribe((response) => {
                    this.selectedRecordForEdit = undefined;
                    this.isEdit = false;
                    this.resetForm();
                    this.poroCategoryService.getAll().subscribe(nodes => {
                        this.allPOROList = nodes[0];
                        this.loadData();
                        this.alertService.showMessage(
                            'Success',
                            `Updated PO-RO Category Successfully`,
                            MessageSeverity.success
                        );
                    });

                })
                this.updatePOROCategory();
            }
        }
    }

    updatePOROCategory(): void {
        this.currentporoCategory.updatedBy = this.userName;
        this.poroCategoryService.update(this.currentporoCategory).subscribe(node => {
            this.alertService.showMessage('PO-RO Category updated successfully.');
            this.poroCategoryService.getAll().subscribe(nodes => {
                this.allPOROList = nodes[0];
            });
            this.updateMode = false;

        });
    }

    private saveCompleted(user?: any) {
        this.isSaving = false;

        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", 'Action was deleted successfully', MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", 'Action was edited successfully', MessageSeverity.success);
        }
    }

    open(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.currentporoCategory = new POROCategory();
        this.currentporoCategory.isActive = true;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    delete(rowData) {
        this.selectedRowforDelete = rowData;
    }

    deleteConformation(value) {
        if (value === 'Yes') {
            this.poroCategoryService.remove(this.selectedRowforDelete.poroCategoryId).subscribe(() => {
                this.loadData();
                this.alertService.showMessage(
                    'Success',
                    `Deleted Record Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    private onPORPSuccessful(allWorkFlows: any[]) {
        this.loadingIndicator = false;
        this.allPOROList = allWorkFlows;
        this.totalRecords = this.allPOROList.length;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }

    resetForm() {
        this.isEdit = false;
        this.selectedRecordForEdit = undefined;
        this.addNew = { ...this.new };
    }

    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
    }

    ngAfterViewInit() { }

    openHist() {
        alert("Functionality not yet done");
    }


    edit(rowData) {
        this.isEdit = true;
        this.addNew = {
            ...rowData,
        };
        this.selectedRecordForEdit = { ...this.addNew }

    }

    setporoCategoryToUpdate(editporoCategoryPopup: any, id: number): void {
        this.poroCategoryToUpdate = Object.assign({}, this.poroCategoryList.filter(function (asset) {
            return asset.poroCategoryId == id;
        })[0]);
        this.modal = this.modalService.open(editporoCategoryPopup, { size: 'sm', backdrop: 'static', keyboard: false });
    }

    updateStatus(): void {
        this.poroCategoryToUpdate.updatedBy = this.userName;
        this.poroCategoryService.update(this.poroCategoryToUpdate).subscribe(asset => {
            this.alertService.showMessage("Success", "PO-RO-Category updated successfully.", MessageSeverity.success);
            this.poroCategoryService.getAll().subscribe(assets => {
                this.poroCategoryList = assets[0];
            });
            this.resetUpdatePoro();
            this.dismissModel();
        });
    }

    removeporoCategory(): void {
        this.poroCategoryService.remove(this.poroCategoryToRemove.poroCategoryId).subscribe(response => {
            this.alertService.showMessage("PO-RO-Category removed successfully.");
            this.poroCategoryService.getAll().subscribe(assets => {
                this.poroCategoryList = assets[0];
                this.modal.close();
            });
        });

    }

    resetAddporoCategory(): void {
        this.currentporoCategory = new POROCategory();
    }

    resetUpdatePoro(): void {
        this.poroCategoryToUpdate = new POROCategory();
    }

    confirmDelete(content, id): void {
        this.poroCategoryToRemove = Object.assign({}, this.poroCategoryList.filter(function (poroCategory) {
            return poroCategory.poroCategoryId == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
    }

    toggleIsActive(poroCategory: any, event): void {
        this.poroCategoryToUpdate = poroCategory;
        this.poroCategoryToUpdate.isActive = event.checked == false ? false : true;
        this.updateStatus();
    }

    handleChangeforPORPIsActive(rowData, e) {
        if (e.checked == false) {
            this.sourceAction.poroCategoryId = rowData.poroCategoryId;
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceAction.isActive = false;
            this.poroCategoryService.updateActionforActivePORO(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.itemMasterId = rowData.poroCategoryId;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive = true;
            this.poroCategoryService.updateActionforActivePORO(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

    }

    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

    showAuditPopup(template, id): void {
        this.auditPOROCategory(id);
        this.modal = this.modalService.open(template, { size: 'sm', backdrop: 'static', keyboard: false });
    }

    auditPOROCategory(poroCategoryId: number): void {
        this.AuditDetails = [];
        this.poroCategoryService.getAudit(poroCategoryId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["poroCategoryAuditId", "poroCategoryId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }
}