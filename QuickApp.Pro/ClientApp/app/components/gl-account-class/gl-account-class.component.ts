import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import * as $ from 'jquery';
import { MenuItem, LazyLoadEvent } from 'primeng/api';//bread crumb
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';
import { GLAccountClassService } from '../../services/glaccountclass.service';
import { DataTableModule } from 'primeng/datatable';
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { SelectButtonModule } from 'primeng/selectbutton'
import { InputTextModule } from 'primeng/inputtext'
import { MultiSelectModule } from 'primeng/multiselect'
import { Action } from 'rxjs/scheduler/Action';
import { AuditHistory } from '../../models/audithistory.model';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { GLAccountClass } from '../../models/glaccountclass.model';
import { SingleScreenAuditDetails } from '../../models/single-screen-audit-details.model';


@Component({
	selector: 'app-gl-account-class',
	templateUrl: './gl-account-class.component.html',
	styleUrls: ['./gl-account-class.component.scss'],
	animations: [fadeInOut]
})
/** GlAccountClass component*/
export class GlAccountClassComponent implements OnInit, AfterViewInit {
    glAccountClassNameInputFieldValue: any;
    glAccountClass = [];
    matvhMode: any;
    field: any;
    event: any;
	disableSave: boolean;
	selectedGlAccountClassName: any;
	auditHisory: any[];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	glaccountclassnamecolle: any[] = [];
	cols: any[];
	selectedColumns: any[];
	displayedColumns = ['glcid', 'glaccountclassname', 'createdDate', 'companyName'];
	dataSource: MatTableDataSource<any>;
	allGLAccountClass: any[] ;
	allComapnies: MasterCompany[] = [];
	private isSaving: boolean;
	public sourceglaccountclass: any = {}
	private bodyText: string;
	loadingIndicator: boolean;
	closeResult: string;
	title: string = "Create";
	id: number;
	display: boolean = false;
	modelValue: boolean = false;
	errorMessage: any;
	modal: NgbModalRef;
	/** Actions ctor */
	private isEditMode: boolean = false;
	private isDeleteMode: boolean = false;
	glAccountclassName: string;
	filteredBrands: any[];
	localCollection: any[] = [];
	selectedColumn: any[];
	Active: string = "Active";
	glclassViewFileds: any = {};
    disablesave: boolean = false;
    AuditDetails: SingleScreenAuditDetails[];

    pageSearch: { query: any; field: any; };
    first: number;
    rows: number;
    paginatorState: any;

    glAccountClassPagination: GLAccountClass[];//added
    totalRecords: number;
    loading: boolean;

	/** GlAccountClass ctor */
	constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public glAccountService: GLAccountClassService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
		this.displayedColumns.push('action');
		this.dataSource = new MatTableDataSource();
		this.sourceglaccountclass = new GLAccountClass();
	}
	ngOnInit(): void {
		this.loadData();
		this.cols = [

			
			{ field: 'glAccountClassName', header: 'GL Account Type Name' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' },


		];
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-gl-account-class';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
		this.selectedColumns = this.cols;

	}
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

	}
	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.glAccountService.getWorkFlows().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	private loadMasterCompanies() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.masterComapnyService.getMasterCompanies().subscribe(
			results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}
	public applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue;
	}
	private refresh() {		
		this.applyFilter(this.dataSource.filter);
	}


	private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allComapnies = allComapnies;

	}
	private onDataLoadSuccessful(allWorkFlows: any[]) {
		this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.totalRecords = allWorkFlows.length;
		this.allGLAccountClass = allWorkFlows;

	}
	private onDataLoadFailed(error: any) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

	}
	open(content) {
		this.disableSave = false;
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.disablesave = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceglaccountclass = new GLAccountClass();
		this.glAccountclassName = "";
		this.sourceglaccountclass.isActive = true;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}


	openView(content, row) {

		this.sourceglaccountclass = row;
		this.glclassViewFileds.capabilityName = row.glAccountClassName;
		this.glclassViewFileds.capabilityId = row.glcid;		
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	openDelete(content, row) {

		this.isEditMode = false;
		this.isDeleteMode = true;
		this.sourceglaccountclass = row;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openEdit(content, row) {
		this.disablesave = false;
		this.isEditMode = true;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.disableSave = false;
		this.sourceglaccountclass = row;
		this.glAccountclassName = this.sourceglaccountclass.glaccountclassname;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	handleChange(rowData, e) {
		if (e.checked == false) {
			this.sourceglaccountclass = rowData;
			this.sourceglaccountclass.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceglaccountclass.isActive == false;
			this.glAccountService.updateGlAccountClass(this.sourceglaccountclass).subscribe(
				response => this.saveCompleted(this.sourceglaccountclass),
				error => this.saveFailedHelper(error));
			//alert(e);
		}
		else {
			this.sourceglaccountclass = rowData;
			this.sourceglaccountclass.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceglaccountclass.isActive == true;
			this.glAccountService.updateGlAccountClass(this.sourceglaccountclass).subscribe(
				response => this.saveCompleted(this.sourceglaccountclass),
				error => this.saveFailedHelper(error));
			//alert(e);
		}

}
	
		eventHandler(event) {
			if (event.target.value != "") {
				let value = event.target.value.toLowerCase();
				if (this.selectedGlAccountClassName) {
					if (value == this.selectedGlAccountClassName.toLowerCase()) {
						this.disablesave = true;

					}
					else {
						this.disablesave = false;
					}
				}

			}
		}

	partnmId(event) {
		if (this.allGLAccountClass) {

			for (let i = 0; i < this.allGLAccountClass.length; i++) {
				if (event == this.allGLAccountClass[i].glAccountClassName) {
					this.sourceglaccountclass.glAccountClassName = this.allGLAccountClass[i].glAccountClassName;
					this.disablesave = true;

					this.selectedGlAccountClassName = event;
				}
			}
		}
	}
	filterGlAccountclass(event) {

		this.localCollection = [];
		for (let i = 0; i < this.allGLAccountClass.length; i++) {
			let glAccountClassName = this.allGLAccountClass[i].glAccountClassName;
			if (glAccountClassName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.glaccountclassnamecolle.push([{
					"glAccountClassId": this.allGLAccountClass[i].glAccountClassId,
					"glAccountClassName": glAccountClassName
				}]),
					this.localCollection.push(glAccountClassName)

			}
		}
	}

	editItemAndCloseModel() {
		if (!(this.sourceglaccountclass.glAccountClassName)) {
			this.display = true;
			this.modelValue = true;
		}
		if ((this.sourceglaccountclass.glAccountClassName)) {
			this.isSaving = true;

			if (this.isEditMode == false) {
				this.sourceglaccountclass.createdBy = this.userName;
				this.sourceglaccountclass.updatedBy = this.userName;
				this.sourceglaccountclass.masterCompanyId = 1;
				this.glAccountService.newGlAccountClass(this.sourceglaccountclass).subscribe(
					role => this.saveSuccessHelper(role),
					error => this.saveFailedHelper(error));
			}
			else {

				this.sourceglaccountclass.updatedBy = this.userName;
				this.sourceglaccountclass.glaccountclassname = this.glAccountclassName;
				this.sourceglaccountclass.masterCompanyId = 1;
				this.glAccountService.updateGlAccountClass(this.sourceglaccountclass).subscribe(
					response => this.saveCompleted(this.sourceglaccountclass),
					error => this.saveFailedHelper(error));
			}

			this.modal.close();
		}
	}
	deleteItemAndCloseModel() {
		this.isSaving = true;
		this.sourceglaccountclass.updatedBy = this.userName;
		this.glAccountService.deleteGlAccountClass(this.sourceglaccountclass.glAccountClassId).subscribe(
			response => this.saveCompleted(this.sourceglaccountclass),
			error => this.saveFailedHelper(error));
		this.modal.close();
	}

	dismissModel() {
		this.isDeleteMode = false;
		this.isEditMode = false;
		this.modal.close();
	}

	private saveSuccessHelper(role?: any) {
		this.isSaving = false;
		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

        this.updatePaginatorState();

	}

	private saveCompleted(user?: any) {
		this.isSaving = false;

		if (this.isDeleteMode == true) {
			this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
			this.isDeleteMode = false;
		}
		else {
			this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

		}

        this.updatePaginatorState();
	}

	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}

	private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.auditHisory = auditHistory;
		this.modal = this.modalService.open(content, { size: 'lg' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })


	}
	private saveFailedHelper(error: any) {
		this.isSaving = false;
		this.alertService.stopLoadingMessage();
		this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
		this.alertService.showStickyMessage(error, null, MessageSeverity.error);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
    }

    showAuditPopup(template, glAccountClassId): void {
        this.auditGlAccountClass(glAccountClassId);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditGlAccountClass(glAccountClassId: number): void {
        this.AuditDetails = [];
        this.glAccountService.getGlAudit(glAccountClassId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["glAccountClassAuditId", "glAccountClassId", "createdBy", "createdDate", "updatedDate", "masterCompanyId"];
            }
        });
    }

    updatePaginatorState() //need to pass this Object after update or Delete to get Server Side pagination
    {
        this.paginatorState = {
            rows: this.rows,
            first: this.first
        }
        if (this.paginatorState) {
            this.loadGlAccountPage(this.paginatorState);
        }
    }

    loadGlAccountPage(event: LazyLoadEvent) //when page initilizes it will call this method
    {
        this.loading = true;
        this.rows = event.rows;
        this.first = event.first;
        setTimeout(() => {
            if (this.totalRecords) {
                this.glAccountService.getServerPages(event).subscribe( //we are sending event details to service
                    pages => {
                        if (pages.length > 0) {
                            this.glAccountClassPagination = pages[0];
                        }
                    });
                this.loading = false;
            }
        }, 1000);
    }

    inputFiledFilter(event, filed, matchMode) {

        this.event = event;
        this.field = filed;
        this.matvhMode = matchMode;

        if (filed == 'glAccountClassName') {
            this.glAccountClassNameInputFieldValue = event;
        }
        if (filed == 'createdBy') {
            this.createdByInputFieldValue = event;
        }
        if (filed == 'updatedBy') {
            this.updatedByInputFieldValue = event;
        }
        this.glAccountClass.push({
            glAccountClassName: this.glAccountClassNameInputFieldValue,
            CreatedBy: this.createdByInputFieldValue,
            UpdatedBy: this.updatedByInputFieldValue,
            first: this.first,
            page: 10,
            pageCount: 10,
            rows: this.rows,
            limit: 5
        })
        if (this.glAccountClass) {
            this.glAccountService.getServerPages(this.glAccountClass[this.glAccountClass.length - 1]).subscribe( //we are sending event details to service
                pages => {
                    if (pages.length > 0) {
                        this.glAccountClassPagination = pages[0];
                    }
                });
        }
        else {
        }
    }
}
