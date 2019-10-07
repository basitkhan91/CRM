import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { ActionService } from '../../services/action.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { GlCashFlowClassification } from '../../models/glcashflowclassification.model';
import { AuthService } from '../../services/auth.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';
import { GlCashFlowClassificationService } from '../../services/gl-cash-flow-classification.service';
import { DataTableModule } from 'primeng/datatable';
import { TableModule, Table } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { SelectButtonModule } from 'primeng/selectbutton'
import { InputTextModule } from 'primeng/inputtext'
import { MultiSelectModule } from 'primeng/multiselect'
import { Action } from 'rxjs/scheduler/Action';
import { AuditHistory } from '../../models/audithistory.model';
import { MenuItem, LazyLoadEvent } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails } from '../../models/single-screen-audit-details.model';
import { validateRecordExistsOrNot, selectedValueValidate, editValueAssignByCondition, getObjectByValue, getObjectById } from '../../generic/autocomplete';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
    selector: 'app-gl-cash-flow-classification',
    templateUrl: './gl-cash-flow-classification.component.html',
	styleUrls: ['./gl-cash-flow-classification.component.scss'],
	animations: [fadeInOut]
})
/** gl-cash-flow-classification component*/
export class GlCashFlowClassificationComponent implements OnInit {
	originalData: any;
    isEdit: boolean = false;
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    headers = [
        { field: 'glClassFlowClassificationName', header: 'GL Cash Flow Classification Name' },
        { field: 'memo', header: 'Memo' },
    ];
    selectedColumns = this.headers;
    formData = new FormData()
    @ViewChild('dt')

    private table: Table;
    auditHistory: any[] = [];
    disableSaveGLCFName: boolean = false;
    glCashFlowList: any;
    descriptionList: any;

    new = {
        glClassFlowClassificationName: "",
        masterCompanyId: 1,
        isActive: true,
        memo: "",
    }
    addNew = { ...this.new };
    selectedRecordForEdit: any;
    viewRowData: any;
    selectedRowforDelete: any;
    existingRecordsResponse = []


//     glAccountClassification = [];
//     updatedByInputFieldValue: any;
//     createdByInputFieldValue: any;
//     glClassFlowClassificationNameInputFieldValue: any;
//     matvhMode: any;
//     field: any;
//     event: any;
//     paginator: MatPaginator;
//     sort: MatSort;    
// 	disableSave: boolean;
// 	selectedGLClassFlowClassificationName: any;
// 	auditHisory: any[];
// 	dataSource: MatTableDataSource<any>;	
// 	glcashflowcoll: any[] = [];		
// 	createdBy: any = "";
// 	updatedBy: any = "";
// 	createddate: any = "";
// 	updatedDate: any = "";
// 	GLClassFlowClassificationNamecolle: any[] = [];
// 	cols: any[];
// 	selectedColumns: any[]=[];
// 	selectedColumn: any[];
// 	displayedColumns = ['glcid', 'glClassFlowClassificationName', 'createdDate', 'companyName'];
// 	allComapnies: MasterCompany[] = [];
// 	private isSaving: boolean;
// 	private bodyText: string;
// 	loadingIndicator: boolean;
// 	closeResult: string;
// 	glClassFlowClassificationName: string;	
// 	title: string = "Create";

// 	id: number;
// 	errorMessage: any;
// 	modal: NgbModalRef;	
// 	Active: string = "Active";
// 	length: number;
// 	localCollection: any[] = [];	
// 	allGlCashflow: any[] = [];
// 	//allGLcashflow: any[];
// 	isEditMode: boolean = false;
// 	isDeleteMode: boolean = false;
// 	public sourceglcashflowclassification: any = {}
// 	GLClassFlowClassificationName: string;
//    // allGLcashflow: any[];
//     cashflowViewFileds: any = {};
//     AuditDetails: SingleScreenAuditDetails[];

//     pageSearch: { query: any; field: any; };
//     first: number;
//     rows: number;
//     paginatorState: any;

//     glCashFlowClassificationPagination: GlCashFlowClassification[];//added
//     totalRecords: number;
//     loading: boolean;
	
	constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private glCashFlowClassificationService:GlCashFlowClassificationService, private configurations: ConfigurationService) {
		/*this.displayedColumns.push('action');
		this.dataSource = new MatTableDataSource();
		this.sourceglcashflowclassification = new GlCashFlowClassification();*/
	}
	ngOnInit() {
		this.getList();

		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-gl-cash-flow-classification';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);

		/*this.loadData();
				
		*/
	}

	get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        this.table.reset();

        // this.table.sortOrder = 0;
        // this.table.sortField = '';

        this.getList();
    }

    customExcelUpload(event) {
        // const file = event.target.files;

        // console.log(file);
        // if (file.length > 0) {

        //     this.formData.append('file', file[0])
        //     this.unitofmeasureService.UOMFileUpload(this.formData).subscribe(res => {
        //         event.target.value = '';

        //         this.formData = new FormData();
        //         this.existingRecordsResponse = res;
        //         this.getList();
        //         this.alertService.showMessage(
        //             'Success',
        //             `Successfully Uploaded  `,
        //             MessageSeverity.success
        //         );

        //     })
        // }

    }
    sampleExcelDownload() {
         const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=CashFlow&fileName=cashflow.xlsx`;

         window.location.assign(url);
    }

    getList() {
        this.glCashFlowClassificationService.getWorkFlows().subscribe(res => {
            const responseData = res[0];
            // this.uomHeaders = responseData.columHeaders;
            // this.selectedColumns = responseData.columHeaders;
            this.originalData = responseData;
            this.totalRecords = responseData.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        })
    }
    changePage(event: { first: any; rows: number }) {
        console.log(event);
        const pageIndex = (event.first / event.rows);
        // this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }


    checkGLCFNameExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.originalData, this.selectedRecordForEdit);
        if (exists.length > 0) {
            this.disableSaveGLCFName = true;
        }
        else {
            this.disableSaveGLCFName = false;
        }

    }
    filterGLCFName(event) {
        this.glCashFlowList = this.originalData;

        const glCashFlowData = [...this.originalData.filter(x => {
            return x.glClassFlowClassificationName.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.glCashFlowList = glCashFlowData;
    }
    selectedGLCFName(object) {
        const exists = selectedValueValidate('glClassFlowClassificationName', object, this.selectedRecordForEdit)
        this.disableSaveGLCFName = !exists;
    }

    save() {
        const data = {
            ...this.addNew, createdBy: this.userName, updatedBy: this.userName,
            glClassFlowClassificationName: editValueAssignByCondition('glClassFlowClassificationName', this.addNew.glClassFlowClassificationName),
        };
        if (!this.isEdit) {
            this.glCashFlowClassificationService.newGlCashFlowClassification(data).subscribe(() => {
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Added New GL Cash Flow Classification Successfully`,
                    MessageSeverity.success
                );
            })
        } else {
            this.glCashFlowClassificationService.updateCashFlowClassification(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Updated GL Cash Flow Classification Successfully`,
                    MessageSeverity.success
                );
            })
		}
		
    }

    resetForm() {
        this.isEdit = false;
        this.selectedRecordForEdit = undefined;
		this.addNew = { ...this.new };
		this.disableSaveGLCFName = false;
    }


    edit(rowData) {
        console.log(rowData);
        this.isEdit = true;
        this.disableSaveGLCFName = false;

        this.addNew = {
            ...rowData,
            glClassFlowClassificationName: getObjectById('glClassFlowClassificationId', rowData.glClassFlowClassificationId, this.originalData),
        };
        this.selectedRecordForEdit = { ...this.addNew }

    }

    changeStatus(rowData) {
        console.log(rowData);
        const data = { ...rowData }
        this.glCashFlowClassificationService.updateCashFlowClassification(data).subscribe(() => {
            // this.getUOMList();
            this.alertService.showMessage(
                'Success',
                `Updated Status Successfully`,
                MessageSeverity.success
            );
        })

    }
    viewSelectedRow(rowData) {
        console.log(rowData);
        this.viewRowData = rowData;
    }
    resetViewData() {
        this.viewRowData = undefined;
    }
    delete(rowData) {
        this.selectedRowforDelete = rowData;

    }
    deleteConformation(value) {
        if (value === 'Yes') {
            this.glCashFlowClassificationService.deleteCashFlowClassification(this.selectedRowforDelete.glClassFlowClassificationId).subscribe(() => {
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Deleted ItemGroup Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    getAuditHistoryById(rowData) {
        this.glCashFlowClassificationService.historyGlCashFlowClassification(rowData.glClassFlowClassificationId).subscribe(res => {
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

	/*private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.glCashFlowClassificationService.getWorkFlows().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
		this.cols = [
			{ field: 'glClassFlowClassificationName', header: 'GL Class Flow ClassificationName' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' },
			//{ field: 'createdDate', header: 'Created Date' },
			//{ field: 'updatedDate', header: 'Updated Date' }


		];
		this.selectedColumns = this.cols;
	}
	private onDataLoadSuccessful(allWorkFlows: any[]) {
		//debugger;
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = allWorkFlows;
        this.allGlCashflow = allWorkFlows;
        this.totalRecords = allWorkFlows.length;
		this.selectedColumns = this.cols;

	}
	private onDataLoadFailed(error: any) {
		// alert(error);
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

	}
	ngAfterViewInit() {
		//this.dataSource.paginator = this.paginator;
		//this.dataSource.sort = this.sort;

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
	open(content) {
		this.disableSave = false;
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.disableSave = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceglcashflowclassification = new GlCashFlowClassification();
		this.GLClassFlowClassificationName = "";
		this.sourceglcashflowclassification.isActive = true;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}


	openDelete(content, row) {

		this.isEditMode = false;
		this.isDeleteMode = true;
		this.sourceglcashflowclassification = row;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openEdit(content, row) {
		this.disableSave = false;
		this.isEditMode = true;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceglcashflowclassification = row;
		this.GLClassFlowClassificationName = this.sourceglcashflowclassification.glClassFlowClassificationName;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openHist(content, row) {

		this.sourceglcashflowclassification = row;

		this.glCashFlowClassificationService.historyGlCashFlowClassification(this.sourceglcashflowclassification.glcashflowclassificationId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));
	}

	handleChange(rowData, e) {
		if (e.checked == false) {
			this.sourceglcashflowclassification = rowData;
			this.sourceglcashflowclassification.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceglcashflowclassification.isActive == false;
			this.glCashFlowClassificationService.updateCashFlowClassification(this.sourceglcashflowclassification).subscribe(
				response => this.saveCompleted(this.sourceglcashflowclassification),
				error => this.saveFailedHelper(error));
			//alert(e);
		}
		else {
			this.sourceglcashflowclassification = rowData;
			this.sourceglcashflowclassification.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceglcashflowclassification.isActive == true;
			this.glCashFlowClassificationService.updateCashFlowClassification(this.sourceglcashflowclassification).subscribe(
				response => this.saveCompleted(this.sourceglcashflowclassification),
				error => this.saveFailedHelper(error));
			//alert(e);
		}

	}
	eventHandler(event) {
		let value = event.target.value.toLowerCase();
		if (this.selectedGLClassFlowClassificationName) {
			if (value == this.selectedGLClassFlowClassificationName.toLowerCase()) {
				//alert("Action Name already Exists");
				this.disableSave = true;
			}
			else {
				this.disableSave = false;
			}
		}
		else {
			for (let i = 0; i < this.GLClassFlowClassificationNamecolle.length; i++) {
				if (value == this.GLClassFlowClassificationNamecolle[i].glClassFlowClassificationName.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSave = true;
					this.selectedGLClassFlowClassificationName = event;
				}
			}
		}

	}

	partnmId(event) {
		if (this.allGlCashflow) {

			for (let i = 0; i < this.allGlCashflow.length; i++) {
				if (event == this.allGlCashflow[i].glClassFlowClassificationName) {
					this.sourceglcashflowclassification.glClassFlowClassificationName = this.allGlCashflow[i].glClassFlowClassificationName;
					this.disableSave = true;

					this.selectedGLClassFlowClassificationName = event;
				}

			}
		}
	}
	
	filterGlAccountclass(event) {

		this.localCollection = [];
		if (this.allGlCashflow) {
			for (let i = 0; i < this.allGlCashflow.length; i++) {
				let glClassFlowClassificationName = this.allGlCashflow[i].glClassFlowClassificationName;
				if (glClassFlowClassificationName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.glcashflowcoll.push([{
						"glClassFlowClassificationId": this.allGlCashflow[i].glClassFlowClassificationId,
						"glClassFlowClassificationName": glClassFlowClassificationName
					}]),
						this.localCollection.push(glClassFlowClassificationName)

				}
			}
		}
	}
	editItemAndCloseModel() {

		this.isSaving = true;

		if (this.isEditMode == false) {
			this.sourceglcashflowclassification.createdBy = this.userName;
			this.sourceglcashflowclassification.updatedBy = this.userName;
			this.sourceglcashflowclassification.masterCompanyId = 1;
			//this.sourceglaccountclass.glaccountclassname = this.glAccountclassName;
			this.glCashFlowClassificationService.newGlCashFlowClassification(this.sourceglcashflowclassification).subscribe(
				role => this.saveSuccessHelper(role),
				error => this.saveFailedHelper(error));
		}
		else {

			this.sourceglcashflowclassification.updatedBy = this.userName;
			//this.sourceglcashflowclassification.glClassFlowClassificationName = this.glClassFlowClassificationName;
			this.sourceglcashflowclassification.masterCompanyId = 1;
			this.glCashFlowClassificationService.updateCashFlowClassification(this.sourceglcashflowclassification).subscribe(
				response => this.saveCompleted(this.sourceglcashflowclassification),
				error => this.saveFailedHelper(error));
		}

		this.modal.close();
	}
	deleteItemAndCloseModel() {
		this.isSaving = true;
		this.sourceglcashflowclassification.updatedBy = this.userName;
		this.glCashFlowClassificationService.deleteCashFlowClassification(this.sourceglcashflowclassification.glClassFlowClassificationId).subscribe(
			response => this.saveCompleted(this.sourceglcashflowclassification),
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

		// debugger;
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
	openView(content, row) {

		this.sourceglcashflowclassification = row;
		this.cashflowViewFileds.glClassFlowClassificationName = row.glClassFlowClassificationName;
		this.cashflowViewFileds.glcid = row.glcid;
		//this.createdBy = row.createdBy;
		//this.updatedBy = row.updatedBy;
		//this.createdDate = row.createdDate;
		//this.updatedDate = row.updatedDate;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
    }

    showAuditPopup(template, id): void {
        debugger;
        this.getAuditDetails(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    getAuditDetails(Id: number): void {
        this.glCashFlowClassificationService.getGLCashFlowClassificationAuditDetails(Id).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["glClassFlowClassificationAuditId", "glClassFlowClassificationId", "glcid","masterCompanyId", "createdBy", "createdDate", "updatedDate"];
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
            this.loadGlCashFlowClassification(this.paginatorState);
        }
    }

    loadGlCashFlowClassification(event: LazyLoadEvent) //when page initilizes it will call this method
    {
        this.loading = true;
        this.rows = event.rows;
        this.first = event.first;
        setTimeout(() => {
            if (this.allGlCashflow) {
                this.glCashFlowClassificationService.getServerPages(event).subscribe( //we are sending event details to service
                    pages => {
                        if (pages.length > 0) {
                            this.glCashFlowClassificationPagination = pages[0];
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

        if (filed == 'glClassFlowClassificationName') {
            this.glClassFlowClassificationNameInputFieldValue = event;
        }
        if (filed == 'createdBy') {
            this.createdByInputFieldValue = event;
        }
        if (filed == 'updatedBy') {
            this.updatedByInputFieldValue = event;
        }
        this.glAccountClassification.push({
            GlClassFlowClassificationName: this.glClassFlowClassificationNameInputFieldValue,
            CreatedBy: this.createdByInputFieldValue,
            UpdatedBy: this.updatedByInputFieldValue,
            first: this.first,
            page: 10,
            pageCount: 10,
            rows: this.rows,
            limit: 5
        })
        if (this.glAccountClassification) {
            this.glCashFlowClassificationService.getServerPages(this.glAccountClassification[this.glAccountClassification.length - 1]).subscribe( //we are sending event details to service
                pages => {
                    if (pages.length > 0) {
                        this.glCashFlowClassificationPagination = pages[0];
                    }
                });
        }
        else {
        }
    }*/

}

