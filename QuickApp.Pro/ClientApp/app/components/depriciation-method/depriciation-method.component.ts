import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { DepriciationMethodService } from '../../services/depriciation-method/depriciation.service';
import { DepriciationMethod } from '../../models/depriciation-method.model';
import { fadeInOut } from '../../services/animations';
//import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { SingleScreenAuditDetails } from '../../models/single-screen-audit-details.model';
import { SingleScreenBreadcrumbService } from '../../services/single-screens-breadcrumb.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';
import { Itemgroup } from '../../models/item-group.model';
import { ItemGroupService } from '../../services/item-group.service';
import { AuditHistory } from '../../models/audithistory.model';
import { MenuItem, LazyLoadEvent } from 'primeng/api';//bread crumb;


@Component({
    selector: 'app-depriciation-method',
    templateUrl: './depriciation-method.component.html',
    styleUrls: ['./depriciation-method.component.scss'],
    animations: [fadeInOut]
})
/** DepriciationMethod component*/
export class DepriciationMethodComponent implements OnInit {
    currentDepriciationmethod: DepriciationMethod;
    dataSource: MatTableDataSource<DepriciationMethod>;
    depriciationMethodList: DepriciationMethod[] = [];
    depriciationToUpdate: DepriciationMethod;
    updateMode: boolean;
    private isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;
    selectedColumns: any[];
    loadingIndicator: boolean;
    cols: any[];
    memoPopupText: string;
    memoNotes: string = 'This is  memo';
    AuditDetails: SingleScreenAuditDetails[];
    allunitData: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    /** DepriciationMethod ctor */
    constructor(private breadCrumb: SingleScreenBreadcrumbService,private alertService: AlertService, private authService: AuthService, private depriciationMethodService: DepriciationMethodService, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.loadData();
        this.cols = [
            //{ field: 'actionId', header: 'Action Id' },
            { field: 'id', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'customerType', header: 'Customer Type' },
            { field: 'basis', header: 'Depriciation Basis ' },
            { field: 'memo', header: 'Memo' }
        ];
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-depriciation-method';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        this.selectedColumns = this.cols;        
        this.currentDepriciationmethod = new DepriciationMethod();
    }

    //ngAfterViewInit() {
    //    this.dataSource.paginator = this.paginator;
    //    this.dataSource.sort = this.sort;
    //}

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.depriciationMethodService.getAll().subscribe(data => {
            this.allunitData = data[0].columHeaders;
            this.depriciationMethodList = data[0].columnData;
            console.log(this.depriciationMethodList);
            this.cols = [
                console.log(this.allunitData),
                this.selectedColumns = this.allunitData
            ];
        });


        //this.cols = [
        //    //{ field: 'actionId', header: 'Action Id' },
        //    { field: 'id', header: 'Code' },
        //    { field: 'name', header: 'Name' },
        //    { field: 'customerType', header: 'Customer Type' },
        //    { field: 'basis', header: 'Depriciation Basis ' },
        //    { field: 'memo', header: 'Memo' }
        //];

        //if (!this.selectedColumns) {
        //    this.selectedColumns = this.cols;
        //    console.log(this.selectedColumns);
        //}
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    adddepriciationmethod(): void {
        if (!(this.currentDepriciationmethod.assetDepreciationId && this.currentDepriciationmethod.assetDepreciationMethodName && this.currentDepriciationmethod.assetDepreciationBasis && this.currentDepriciationmethod.assetDepreciationMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.currentDepriciationmethod.assetDepreciationMethodName && this.currentDepriciationmethod.assetDepreciationId  && this.currentDepriciationmethod.assetDepreciationBasis && this.currentDepriciationmethod.assetDepreciationMemo)) {
            this.currentDepriciationmethod.createdBy = this.userName;
            this.currentDepriciationmethod.updatedBy = this.userName;
            this.depriciationMethodService.add(this.currentDepriciationmethod).subscribe(depriciationmethod => {
                this.currentDepriciationmethod = depriciationmethod;
                this.alertService.showMessage('Depriciation Method  added successfully.');
                this.depriciationMethodService.getAll().subscribe(depriciationmethods => {
                    this.depriciationMethodList = depriciationmethods[0];
                });
                this.resetdepriciationmethod();
            });
        }
    }
    
    setdepriciationmethodToUpdate(editAssetStatusPopup: any, id: number): void {
        this.depriciationToUpdate = Object.assign({}, this.depriciationMethodList.filter(function (depriciationmethod) {
            return depriciationmethod.assetDepreciationMethodId == id;
        })[0]);
        this.modal = this.modalService.open(editAssetStatusPopup, { size: 'sm' });
    }

    updatedepriciationmethod(): void {
        if (!(this.depriciationToUpdate.assetDepreciationMethodName && this.currentDepriciationmethod.assetDepreciationId  && this.depriciationToUpdate.assetDepreciationBasis && this.depriciationToUpdate.assetDepreciationMemo)) {
            this.display = true;
            this.modelValue = true;
        }
        else {
            this.currentDepriciationmethod.updatedBy = this.userName;
            this.depriciationMethodService.update(this.depriciationToUpdate).subscribe(depriciationmethod => {
                this.alertService.showMessage('Depriciation Method  updated successfully.');
                this.depriciationMethodService.getAll().subscribe(depriciationmethods => {
                    this.depriciationMethodList = depriciationmethods[0];
                });
                this.updateMode = false;
                this.resetdepriciationmethod();
                this.dismissModel();
            });
        }
    }

    removedepriciationmethod(): void {
        this.depriciationMethodService.remove(this.currentDepriciationmethod.assetDepreciationMethodId).subscribe(response => {
            this.alertService.showMessage("Depriciation Method  removed successfully.");
            this.depriciationMethodService.getAll().subscribe(depriciationmethods => {
                this.depriciationMethodList = depriciationmethods[0];
                this.modal.close();
            });
        });
    }    
    resetdepriciationmethod(): void {
        this.updateMode = false;
        this.currentDepriciationmethod = new DepriciationMethod();
    }
    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.currentDepriciationmethod = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    toggleIsActive(depriciationMethod: any, event) {
        debugger;
        this.currentDepriciationmethod.assetDepreciationId = depriciationMethod.assetDepreciationMethodId;
        this.depriciationToUpdate = depriciationMethod;
        this.depriciationToUpdate.isActive = event.checked == false ? false : true;
        this.updatedepriciationmethod();
    }

    showAuditPopup(template, id): void {
        this.getAssetDepreciationAudits(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    getAssetDepreciationAudits(assetdepreciationMethodId: number): void {
        this.AuditDetails = [];
        this.depriciationMethodService.getAssetDepriciationMethodAudits(assetdepreciationMethodId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["assetDepreciationMethodAuditId", "assetDepreciationMethodId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }
}