import { OnInit, Component, AfterViewInit} from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { forEach } from "@angular/router/src/utils/collection";
import { fadeInOut } from "../../../services/animations";
import { POROCategory } from "../../../models/po-ro-category.model";
import { SingleScreenAuditDetails } from "../../../models/single-screen-audit-details.model";
import { AuthService } from "../../../services/auth.service";
import { POROCategoryService } from "../../../services/porocategory/po-ro-category.service";
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { MenuItem } from 'primeng/api';//bread crumb

@Component({
    selector: 'app-po-ro-category',
    templateUrl: './po-ro-category.component.html',
    styleUrls: ['./po-ro-category.component.scss'],
    animations: [fadeInOut]
})
export class PoRoCategoryComponent implements OnInit, AfterViewInit {

    currentporo: POROCategory;
    poroCategoryToUpdate: POROCategory;
    poroCategoryToRemove: POROCategory;
    poroCategoryList: POROCategory[];
    modal: NgbModalRef;
    poroTable: boolean;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;
    AuditDetails: SingleScreenAuditDetails[];
    loadingIndicator: boolean;
    allPOROList: any[] = [];

    isDeleteMode: boolean = false;

    dataSource: MatTableDataSource<any>;
    selectedColumn: any[];
    selectedColumns: any[];
    cols: any[];
    isEditMode: boolean;
    isSaving: boolean;
    public sourceAction: any = {};
    sourcePORPCategory: any;
    selectedstockColumn: any;

    constructor(private alertService: AlertService, private poroCategoryService: POROCategoryService, private modalService: NgbModal, private authService: AuthService) {
        this.poroCategoryService.currentUrl = '/generalledgermodule/generalledgerpage/app-po-ro-category';
        this.poroCategoryService.bredcrumbObj.next(this.poroCategoryService.currentUrl);//Bread Crumb

    }

    ngOnInit(): void {
        this.loadData();
        /*this.poroCategoryService.getAll().subscribe(assets => {
            this.poroCategoryList = assets[0];
            this.poroCategoryList.forEach(function (poroCategory) {
                poroCategory.isActive = poroCategory.isActive == false ? false : true;
            });
        });
        this.currentporo = new POROCategory();*/
        this.poroCategoryService.currentUrl = '/generalledgermodule/generalledgerpage/app-po-ro-category';
        this.poroCategoryService.bredcrumbObj.next(this.poroCategoryService.currentUrl);
        //this.poroCategoryService.ShowPtab = false;
        //this.poroCategoryService.alertObj.next(this.poroCategoryService.ShowPtab);
        //this.loadRolesData();
    }

    private loadData() {
        //this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.poroCategoryService.getAll().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        //this.alertService.startLoadingMessage();
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

    //private loadRolesData() {
    //    //this.alertService.startLoadingMessage();
    //    this.loadingIndicator = true;

    //    this.poroCategoryService.getRolesData().subscribe(
    //        results => this.onRolesLoadSuccessfull(results[0]),
    //        error => this.onDataLoadFailed(error)
    //    );
    //}

    toggledbldisplay(content, row) {
        this.isEditMode = true;
        this.isSaving = true;
        
        this.sourceAction = row;
        //this.itemName = this.sourceAction.itemClassificationCode;
        //this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
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

    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourcePORPCategory = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    private onDataLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = allWorkFlows;
        this.allPOROList = allWorkFlows;

        //this.selectedColumns = this.cols;
        //this.loadingIndicator = false;
        //this.allStockInfo = allWorkFlows;
    }

    private onPORPSuccessful(allWorkFlows: any[]) {
        //debugger;

        this.cols = [
            { field: 'categoryName', header: 'Name' },
            { field: 'isPO', header: 'PO' },
            { field: 'isRO', header: 'RO' }
            //{ field: 'createdBy', header: 'Created By' },
            //{ field: 'updatedBy', header: 'Updated By' },
            //{ field: 'updatedDate', header: 'Updated Date' },
            //{ field: 'createdDate', header: 'Created Date' }
        ];
            this.selectedColumns = this.cols;
            this.loadingIndicator = false;
            this.allPOROList = allWorkFlows;
    }

    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
    }

    ngAfterViewInit() { }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    openHist() {
        alert("Functionality not yet done");
    }

    addporoCategory(): void {
        if (!(this.currentporo.categoryName)) {
            this.display = true;
            return;
        }
        this.currentporo.createdBy = this.userName;
        this.currentporo.updatedBy = this.userName;
        this.poroCategoryService.add(this.currentporo).subscribe(asset => {
            this.alertService.showMessage(' PO-RO-Category Added successfully.');
            this.poroCategoryService.getAll().subscribe(assets => {
                this.poroCategoryList = assets[0];
            });
            this.resetAddporoCategory();
        });

    }

    setporoCategoryToUpdate(editporoCategoryPopup: any, id: number): void {
        this.poroCategoryToUpdate = Object.assign({}, this.poroCategoryList.filter(function (asset) {
            return asset.poroCategoryId == id;
        })[0]);
        this.modal = this.modalService.open(editporoCategoryPopup, { size: 'sm' });
    }

    updateporoCategory(): void {
        this.currentporo.updatedBy = this.userName;
        this.poroCategoryService.update(this.poroCategoryToUpdate).subscribe(asset => {
            //this.alertService.showMessage(' PO-RO-Category updated successfully.');
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
        this.currentporo = new POROCategory();
    }

    resetUpdatePoro(): void {
        this.poroCategoryToUpdate = new POROCategory();
    }

    //dismissModel(): void {
    //    if (this.modal != undefined) {
    //        this.modal.close();
    //    }
    //}

    confirmDelete(content, id): void {
        this.poroCategoryToRemove = Object.assign({}, this.poroCategoryList.filter(function (poroCategory) {
            return poroCategory.poroCategoryId == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm' });
    }

    toggleIsActive(poroCategory: any, event): void {
        this.poroCategoryToUpdate = poroCategory;
        this.poroCategoryToUpdate.isActive = event.checked == false ? false : true;
        this.updateporoCategory();
    }

    handleChangeforPORPIsActive(rowData, e) {
        //alert(rowData.poroCategoryId);
        if (e.checked == false) {
            this.sourceAction.poroCategoryId = rowData.poroCategoryId;
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceAction.isActive = false;
            this.poroCategoryService.updateActionforActivePORO(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
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
            //alert(e);
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
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditPOROCategory(poroCategoryId: number): void {
        this.AuditDetails = [];
        this.poroCategoryService.getAudit(poroCategoryId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["poroCategoryAuditId", "poroCategoryId","masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }
}