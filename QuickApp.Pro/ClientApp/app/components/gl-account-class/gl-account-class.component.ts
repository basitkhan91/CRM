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
import { ConfigurationService } from '../../services/configuration.service';

@Component({
	selector: 'app-gl-account-class',
	templateUrl: './gl-account-class.component.html',
	styleUrls: ['./gl-account-class.component.scss'],
	animations: [fadeInOut]
})
/** GlAccountClass component*/
export class GlAccountClassComponent implements OnInit {
    event: any;
    glAccountClass = [];
    dataSource: MatTableDataSource<GLAccountClass>;
    GLAccountTypeList: GLAccountClass[] = [];
    GLAccountTypeToUpdate: GLAccountClass;
    updatedByInputFieldValue: any;
    createdByInputFieldValue: any;
    private isDelete: boolean = false;
    matvhMode: any;
    formData = new FormData();
    field: any;
    existingRecordsResponse: Object;
    gLAccountType: string = "";
    auditHistory: any[] = [];
    selectedreason: any;
    glAccountClassNameInputFieldValue: any;
    glAccountData: any[] = [];
	disableSave: boolean;
	selectedGlAccountClassName: any;
	auditHisory: any[];
	glaccountclassnamecolle: any[] = [];
    cols: any[];
    GLCID: any = "";
    GLAccountType: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    GL_Account_Type: any = "";
	selectedColumns: any[];
	displayedColumns = ['glcid', 'glaccountclassname', 'createdDate', 'companyName'];
	allGLAccountClass: any[] ;
	allComapnies: MasterCompany[] = [];
	private isSaving: boolean;
    public sourceAction: GLAccountClass;
    private bodyText: string;
    code_Name: any = "";
    loadingIndicator: boolean;
    allunitData: any;
	closeResult: string;
	title: string = "Create";
	id: number;
	display: boolean = false;
	modelValue: boolean = false;
    errorMessage: any;
    allreasn: any[] = [];
	modal: NgbModalRef;
	/** Actions ctor */
	private isEditMode: boolean = false;
	private isDeleteMode: boolean = false;
    glAccountclassName: string;
    selectedData: any;
    codeName: string = "";
	filteredBrands: any[];
	localCollection: any[] = [];
	selectedColumn: any[];
	Active: string = "Active";
	glclassViewFileds: any = {};
    disablesave: boolean = false;
    AuditDetails: SingleScreenAuditDetails[];
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;

    pageSearch: { query: any; field: any; };
    first: number;
    rows: number;
    paginatorState: { rows: number; first: number; };
    totalRecords: number;
    //paginatorState: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    glAccountClassPagination: GLAccountClass[];//added
    loading: boolean;

	/** GlAccountClass ctor */
    constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public glAccountService: GLAccountClassService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private configurations: ConfigurationService) {
		this.displayedColumns.push('action');
		this.dataSource = new MatTableDataSource();
		this.sourceAction = new GLAccountClass();
	}
	ngOnInit(): void {
        this.loadData();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-gl-account-class';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
	}
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

	}
	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
        this.glAccountService.getGlAccountClassList().subscribe(data => {
            this.allunitData = data[0].columHeaders;
            this.GLAccountTypeList = data[0].columnData;
            console.log(this.GLAccountTypeList);
            this.totalRecords = this.GLAccountTypeList.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            this.cols = [
                console.log(this.allunitData),
                this.selectedColumns = this.allunitData
            ];
            this.selectedData = this.selectedColumns
            this.alertService.stopLoadingMessage();
        });
    }

    changePage(event: { first: any; rows: number }) {
        console.log(event);
        const pageIndex = (event.first / event.rows);
        // this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
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

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    validateRecordExistsOrNot(field: string, currentInput: any, originalData: any) {
        console.log(field, currentInput, originalData)
        if ((field !== '' || field !== undefined) && (currentInput !== '' || currentInput !== undefined) && (originalData !== undefined)) {
            const data = originalData.filter(x => {
                return x[field].toLowerCase() === currentInput.toLowerCase()
            })
            return data;
        }
    }

	open(content) {
		this.disableSave = false;
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.isSaving = true;
		this.loadMasterCompanies();
        this.sourceAction = new GLAccountClass();
        this.sourceAction.isActive = true;
        this.gLAccountType = "";
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}


	openView(content, row) {

		this.sourceAction = row;
        this.GLAccountType = row.gLAccountType;
        this.GLCID = row.gLCID;		
        this.memo = row.memo;
        this.createdBy = row.createdBy;
        this.updatedBy = row.updatedBy;
        this.createdDate = row.createdDate;
        this.updatedDate = row.updatedDate;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	openDelete(content, row) {

		this.isEditMode = false;
		this.isDeleteMode = true;
        this.sourceAction = row;
        this.code_Name = row.gLAccountType;
        //this.GLCID = row.gLCID ;	
        //this.GL_Account_Type = row.gLAccountType;
        this.modal = this.modalService.open(content, { size: 'sm' });
        console.log(content);
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openEdit(content, row) {
		this.disablesave = false;
		this.isEditMode = true;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceAction = row;
        this.gLAccountType = row.gLAccountType;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

    handleChange(rowData, e) {

        const params = <any>{
            createdBy: this.userName,
            updatedBy: this.userName,
            GLAccountClassId: rowData.glAccountClassId,
            GLCID: rowData.gLCID,
            GLAccountClassName: rowData.gLAccountType,
            GLAccountClassMemo: rowData.memo,
            isActive: rowData.isActive,
            IsDeleted: false,
            masterCompanyId: 1
        };

        if (e.checked == false) {
            this.Active = "In Active";
            this.glAccountService.updateGlAccountClass(params).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));			
		}
		else {
            this.Active = "Active";
            this.glAccountService.updateGlAccountClass(params).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));			
		}

}
	
    eventHandler(event) {
        let value = event.target.value.toLowerCase()
        if (this.selectedreason) {
            if (value == this.selectedreason.toLowerCase()) {
                this.disableSave = true;
            }
            else {
                this.disableSave = false;
            }
        }
    }

    partnmId(event) {
        for (let i = 0; i < this.allreasn.length; i++) {
            if (event == this.allreasn[i][0].gLAccountType) {
                this.disableSave = true;
                this.selectedreason = event;
            }
        }
    }

	filterGlAccountclass(event) {

		this.localCollection = [];
        for (let i = 0; i < this.GLAccountTypeList.length; i++) {
            let gLAccountType = this.GLAccountTypeList[i].gLAccountType;
            if (gLAccountType.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.allreasn.push([{
                    "gLAccountClassId": this.GLAccountTypeList[i].glAccountClassId,
                    "gLAccountType": gLAccountType
				}]),
                    this.localCollection.push(gLAccountType)

			}
		}
	}

    editItemAndCloseModel() {

        this.isSaving = true;
        console.log(this);

        const params = <any>{
            createdBy: this.userName,
            updatedBy: this.userName,
            GLAccountClassName: this.gLAccountType,
            GLCID: this.sourceAction.gLCID,
            GLAccountClassMemo: this.sourceAction.memo,

            IsActive: this.sourceAction.isActive,
            IsDeleted: this.isDelete,
            masterCompanyId: 1
        };

  //      if (!(this.sourceAction.GLAccountType)) {
		//	this.display = true;
		//	this.modelValue = true;
		//}
  //      if ((this.sourceAction.GLAccountType)) {
		//	this.isSaving = true;

        if (this.isEditMode == false) {

            this.glAccountService.newGlAccountClass(params).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
			}
        else {
            params.glAccountClassId = this.sourceAction.glAccountClassId;
            this.glAccountService.updateGlAccountClass(params).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
			}

			this.modal.close();
		}

	deleteItemAndCloseModel() {
		this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
		this.glAccountService.deleteGlAccountClass(this.sourceAction.glAccountClassId).subscribe(
			response => this.saveCompleted(this.sourceAction),
			error => this.saveFailedHelper(error));
		this.modal.close();
}



	dismissModel() {
		this.isDeleteMode = false;
		this.isEditMode = false;
		this.modal.close();
	}

    private saveSuccessHelper(role?: GLAccountClass) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);
        this.loadData();
        this.alertService.stopLoadingMessage();
    }

    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

    private saveCompleted(user?: GLAccountClass) {
        this.isSaving = false;
        if (this.isDelete == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDelete = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
        }
        this.loadData();
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

    getAuditHistoryById(rowData) {
        this.glAccountService.getGlAudit(rowData.glAccountClassId).subscribe(res => {
            this.auditHistory = res;
        })
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

    sampleExcelDownload() {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=GLAccountClass&fileName=GLAccountClass.xlsx`;

        window.location.assign(url);
    }

    customExcelUpload(event) {
        const file = event.target.files;

        console.log(file);
        if (file.length > 0) {

            this.formData.append('file', file[0])
            this.glAccountService.GLAccountClassCustomUpload(this.formData).subscribe(res => {
                event.target.value = '';

                this.formData = new FormData();
                this.existingRecordsResponse = res;
                this.getGLAccountClassList();
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

    getGLAccountClassList() {

        this.loadData();
    }

}
    

