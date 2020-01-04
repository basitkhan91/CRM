import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import * as $ from 'jquery';
import { MenuItem } from 'primeng/api';//bread crumb
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';
import { GLAccountClassService } from '../../services/glaccountclass.service';
import { DataTableModule } from 'primeng/datatable';
import { TableModule, Table } from 'primeng/table'
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
import { CertificationtypeService } from '../../services/certificationtype.service';
import { CertificationType } from '../../models/certificationtype.model';
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { getObjectByValue, validateRecordExistsOrNot, selectedValueValidate, editValueAssignByCondition, getObjectById } from '../../generic/autocomplete';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
	selector: 'app-certification-type',
	templateUrl: './certification-type.component.html',
	styleUrls: ['./certification-type.component.scss'],
	animations: [fadeInOut]
})
/** GlAccountClass component*/
export class CertificationTypeComponent implements OnInit {
	// disablesave: boolean;
	// selectedcertificationName: any;
	// auditHisory: any[];
	// @ViewChild(MatPaginator) paginator: MatPaginator;
	// @ViewChild(MatSort) sort: MatSort;
	// certificationNamecolle: any[] = [];
	// cols: any[];
	// selectedColumns: any[];
	// displayedColumns = ['description', 'createdDate', 'companyName'];
	// dataSource: MatTableDataSource<any>;
	// allCertification: any[];
	// allComapnies: MasterCompany[] = [];
	// private isSaving: boolean;
	// public sourcecertificationtype: any = {}
	// private bodyText: string;
	// loadingIndicator: boolean;
	// closeResult: string;
	// title: string = "Create";
	// id: number;
	// display: boolean = false;
	// modelValue: boolean = false;
	// errorMessage: any;
	// modal: NgbModalRef;
	// /** Actions ctor */
	// private isEditMode: boolean = false;
	// private isDeleteMode: boolean = false;
	// description: string;
	// memo: string;
	// filteredBrands: any[];
	// localCollection: any[] = [];
	// selectedColumn: any[];
	// Active: string = "Active";
	// certificationViewFileds: any = {};
	// totalRecords: number;
	// AuditDetails: SingleScreenAuditDetails[];
	// //disablesave: boolean = false;
	// public certificationname: any = "";


	// constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: CertificationtypeService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
	// 	this.displayedColumns.push('action');
	// 	this.dataSource = new MatTableDataSource();
	// 	this.sourcecertificationtype = new CertificationType();
	// }
	// validateRecordExistsOrNot(field: string, currentInput: any, originalData: any) {
	// 	// console.log(field, currentInput, originalData)
	// 	if ((field !== '' || field !== undefined) && (currentInput !== '' || currentInput !== undefined) && (originalData !== undefined)) {
	// 		const data = originalData.filter(x => {
	// 			return x[field].toLowerCase() === currentInput.toLowerCase()
	// 		})
	// 		return data;
	// 	}
	// }
	// editValueAssignByCondition(field: any, value: any) {
	// 	console.log(field, value)
	// 	if ((value !== undefined) && (field !== '' || field !== undefined)) {

	// 		if (typeof (value) === 'string') {
	// 			return value
	// 		}
	// 		else {
	// 			return this.getValueFromObjectByKey(field, value)
	// 		}
	// 	}
	// }
	// getValueFromObjectByKey(field: string, object: any) {
	// 	console.log(field, object)
	// 	if ((field !== '' || field !== undefined) && (object !== undefined)) {
	// 		return object[field];
	// 	}
	// }



	originalData: any;
	isEdit: boolean = false;
	totalRecords: any;
	pageIndex: number = 0;
	pageSize: number = 10;
	totalPages: number;
	headers = [
		{ field: 'description', header: 'Certification Type' },
		{ field: 'memo', header: 'Memo' },
	]
	selectedColumns = this.headers;
	formData = new FormData()
	@ViewChild('dt')

	private table: Table;
	auditHistory: any[] = [];
	disableSaveCertification: boolean = false;
	certificationList: any;

    disableSaveCertificationMsg:boolean = false;
	new = {
		description: "",
		masterCompanyId: 1,
		isActive: true,
		memo: "",
	}
	addNew = { ...this.new };
	selectedRecordForEdit: any;
	viewRowData: any;
	selectedRowforDelete: any;
	// originalData: any;
	existingRecordsResponse = []
	constructor(private breadCrumb: SingleScreenBreadcrumbService,
		private authService: AuthService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
		private _fb: FormBuilder,
		private alertService: AlertService,
		public certificationService: CertificationtypeService,
		private dialog: MatDialog,
		private masterComapnyService: MasterComapnyService,
		private configurations: ConfigurationService) {

	}

	OnInit() {

	}



	ngOnInit(): void {
		this.getList();
		// this.loadData();
		// this.cols = [
		//    // { field: 'itemGroupId', header: 'IGID' },

		//     // { field: 'createdBy', header: 'Created By' },
		//     // { field: 'updatedBy', header: 'Updated By' },
		//     //{ field: 'updatedDate', header: 'Updated Date' },
		//     //{ field: 'createdDate', header: 'Created Date' }
		// ];
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-certification-type';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
		// this.selectedColumns = this.cols;
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

	customExcelUpload() {
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
		const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=CertificationType&fileName=certificationType.xlsx`;

		window.location.assign(url);
	}

	getList() {
		this.certificationService.getWorkFlows().subscribe(res => {
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
		// this.pageIndex = pageIndex;
		this.pageSize = event.rows;
		this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
	}


	checkCertificationName(field, value) {
		const exists = validateRecordExistsOrNot(field, value, this.originalData, this.selectedRecordForEdit);
		console.log(exists);
		if (exists.length > 0) {
			this.disableSaveCertification = true;
            this.disableSaveCertificationMsg = true;
        }
		else {
			this.disableSaveCertification = false;
            this.disableSaveCertificationMsg = false;
        }

	}
	filterCertificationName(event) {
		this.certificationList = this.originalData;

		const certificationData = [...this.originalData.filter(x => {
			return x.description.toLowerCase().includes(event.query.toLowerCase())
		})]
		this.certificationList = certificationData;
	}
	selectedCertificationName(object) {
        const exists = selectedValueValidate('description', object, this.selectedRecordForEdit);
		this.disableSaveCertification = !exists;
        this.disableSaveCertificationMsg = !exists;
    }


    onBlur(event) {
        const value = event.target.value;
		this.disableSaveCertificationMsg = false;
        for (let i = 0; i < this.originalData.length; i++) {
            let description = this.originalData[i].description;
            let taxTypeId = this.originalData[i].taxTypeId;
            if (description.toLowerCase() == value.toLowerCase()) {
                if (!this.isEdit || this.isEdit) {
					this.disableSaveCertification = true;
					this.disableSaveCertificationMsg = true;
                }
                else if (taxTypeId != this.selectedRecordForEdit.taxTypeId) {
					this.disableSaveCertification = false;
					this.disableSaveCertificationMsg = true;
                }
                else {
					this.disableSaveCertification = false;
					this.disableSaveCertificationMsg = false;
                }
                console.log('description :', description);
                break;
            }
        }
    }


	save() {
		const data = {
			...this.addNew, createdBy: this.userName, updatedBy: this.userName,
			description: editValueAssignByCondition('description', this.addNew.description),
			// unitName: editValueAssignByCondition('description', this.addNew.unitName)
		};
		if (!this.isEdit) {
			this.certificationService.newCertificationtype(data).subscribe(() => {
				this.resetForm();
				this.getList();
				this.alertService.showMessage(
					'Success',
					`Added New Certification  Successfully  `,
					MessageSeverity.success
				);
			})
		} else {
			this.certificationService.updateCertificationtype(data).subscribe(() => {
				this.selectedRecordForEdit = undefined;
				this.isEdit = false;
				this.resetForm();
				this.getList();
				this.alertService.showMessage(
					'Success',
					`Added  Updated New Certification Successfully  `,
					MessageSeverity.success
				);
			})
		}
	}

	resetForm() {
		this.isEdit = false;
        this.disableSaveCertificationMsg = false;
		this.selectedRecordForEdit = undefined;

		this.addNew = { ...this.new };
	}


	edit(rowData) {
		console.log(rowData);
		this.isEdit = true;
		this.disableSaveCertification = true;
        this.disableSaveCertificationMsg = false;
        this.addNew = {
			...rowData,
			description: getObjectById('employeeLicenseTypeId', rowData.employeeLicenseTypeId, this.originalData),
		};
		this.selectedRecordForEdit = { ...this.addNew }

	}

	changeStatus(rowData) {
		console.log(rowData);
		const data = { ...rowData }
		this.certificationService.updateCertificationtype(data).subscribe(() => {
			// this.getUOMList();
			this.alertService.showMessage(
				'Success',
				`Updated Status Successfully  `,
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
			this.certificationService.deleteCertificationtype(this.selectedRowforDelete.employeeLicenseTypeId).subscribe(() => {
				this.getList();
				this.alertService.showMessage(
					'Success',
					`Deleted  Successfully  `,
					MessageSeverity.success
				);
			})
		} else {
			this.selectedRowforDelete = undefined;
		}
	}

	// getAuditHistoryById(rowData) {
	//     this.itemGroupService.historyAcion(rowData.itemGroupId).subscribe(res => {
	//         this.auditHistory = res;
	//     })
	// }
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
	// ngOnInit(): void {
	// 	this.loadData();
	// 	this.cols = [
	// 		{ field: 'description', header: 'Certification Name' },
	// 		{ field: 'memo', header: 'Memo' },
	// 		{ field: 'createdBy', header: 'Created By' },
	// 		{ field: 'updatedBy', header: 'Updated By' },
	// 	];
	// 	this.breadCrumb.currentUrl = '/singlepages/singlepages/app-certification-type';
	// 	this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
	// 	this.selectedColumns = this.cols;
	// }
	// ngAfterViewInit() {
	// 	this.dataSource.paginator = this.paginator;
	// 	this.dataSource.sort = this.sort;
	// }
	// private loadData() {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;
	// 	this.workFlowtService.getWorkFlows().subscribe(
	// 		results => this.onDataLoadSuccessful(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);
	// }
	// private loadMasterCompanies() {
	// 	this.alertService.startLoadingMessage();
	// 	this.loadingIndicator = true;
	// 	this.masterComapnyService.getMasterCompanies().subscribe(
	// 		results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
	// 		error => this.onDataLoadFailed(error)
	// 	);

	// }
	// public applyFilter(filterValue: string) {
	// 	this.dataSource.filter = filterValue;
	// }
	// private refresh() {
	// 	this.applyFilter(this.dataSource.filter);
	// }


	// private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
	// 	// alert('success');
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	this.allComapnies = allComapnies;

	// }
	// private onDataLoadSuccessful(allWorkFlows: any[]) {

	// 	// alert('success');
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;
	// 	//this.dataSource.data = allWorkFlows;
	// 	this.allCertification = allWorkFlows;
	// 	this.totalRecords = this.allCertification.length;

	// }
	// private onDataLoadFailed(error: any) {
	// 	// alert(error);
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;

	// }
	// open(content) {

	// 	this.isEditMode = false;
	// 	this.isDeleteMode = false;
	// 	this.disablesave = false;
	// 	this.isSaving = true;
	// 	this.loadMasterCompanies();
	// 	this.sourcecertificationtype = new CertificationType();
	// 	this.sourcecertificationtype.certificationname = "";
	// 	//this.memo = "";
	// 	this.sourcecertificationtype.isActive = true;
	// 	this.modal = this.modalService.open(content, { size: 'sm' });
	// 	this.modal.result.then(() => {
	// 		console.log('When user closes');
	// 	}, () => { console.log('Backdrop click') })
	// }


	// openView(content, row) {

	// 	this.sourcecertificationtype = row;
	// 	this.certificationViewFileds.capabilityName = row.description;
	// 	this.loadMasterCompanies();
	// 	this.modal = this.modalService.open(content, { size: 'sm' });
	// 	this.modal.result.then(() => {
	// 		console.log('When user closes');
	// 	}, () => { console.log('Backdrop click') })
	// }
	// openDelete(content, row) {

	// 	this.isEditMode = false;
	// 	this.isDeleteMode = true;
	// 	this.sourcecertificationtype = row;
	// 	this.certificationViewFileds.capabilityName = row.description;
	// 	this.modal = this.modalService.open(content, { size: 'sm' });
	// 	this.modal.result.then(() => {
	// 		console.log('When user closes');
	// 	}, () => { console.log('Backdrop click') })
	// }

	// openEdit(content, row) {
	// 	this.disablesave = false;
	// 	this.isEditMode = true;
	// 	this.isSaving = true;
	// 	this.loadMasterCompanies();
	// 	this.sourcecertificationtype = { ...row };
	// 	this.sourcecertificationtype.certificationname = getObjectByValue('description', row.description, this.allCertification)

	// 	this.modal = this.modalService.open(content, { size: 'sm' });
	// 	this.modal.result.then(() => {
	// 		console.log('When user closes');
	// 	}, () => { console.log('Backdrop click') })
	// }

	// openHist(content, row) {
	// 	this.sourcecertificationtype = row;
	// 	this.workFlowtService.historyCertificationtype(this.sourcecertificationtype.employeeLicenseTypeId).subscribe(
	// 		results => this.onHistoryLoadSuccessful(results[0], content),
	// 		error => this.saveFailedHelper(error));
	// }

	// handleChange(rowData, e) {
	// 	if (e.checked == false) {
	// 		this.sourcecertificationtype = rowData;
	// 		this.sourcecertificationtype.updatedBy = this.userName;
	// 		this.Active = "In Active";
	// 		this.sourcecertificationtype.isActive == false;
	// 		this.workFlowtService.updateCertificationtype(this.sourcecertificationtype).subscribe(
	// 			response => this.saveCompleted(this.sourcecertificationtype),
	// 			error => this.saveFailedHelper(error));
	// 		//alert(e);
	// 	}
	// 	else {
	// 		this.sourcecertificationtype = rowData;
	// 		this.sourcecertificationtype.updatedBy = this.userName;

	// 		this.Active = "Active";
	// 		this.sourcecertificationtype.isActive == true;
	// 		this.workFlowtService.updateCertificationtype(this.sourcecertificationtype).subscribe(
	// 			response => this.saveCompleted(this.sourcecertificationtype),
	// 			error => this.saveFailedHelper(error));

	// 	}

	// }
	// eventHandler(field, value) {
	// 	value = value.trim();
	// 	const exists = this.validateRecordExistsOrNot(field, value, this.allCertification);
	// 	// console.log(exists,"test");
	// 	if (exists.length > 0) {
	// 		this.disablesave = true;
	// 	}
	// 	else {
	// 		this.disablesave = false;
	// 	}
	// }

	// partnmId(event) {

	// 	this.disablesave = true;
	// }
	// //partnmId(event) {


	// //		for (let i = 0; i < this.allCertification.length; i++) {
	// //			if (event == this.allCertification[i][0].description) {
	// //				//this.sourcecertificationtype.certificationName = this.allCertification[i].certificationName;
	// //				this.disablesave = true;

	// //				this.selectedcertificationName = event;
	// //			}
	// //		}
	// //}
	// filterGlAccountclass(event) {
	// 	this.localCollection = this.allCertification;
	// 	if (event.query !== undefined && event.query !== null) {
	// 		const certification = [...this.allCertification.filter(x => {
	// 			// return x.description.toLowerCase().includes(event.query.toLowerCase())
	// 			return x.description.toLowerCase().includes(event.query.toLowerCase())
	// 		})]

	// 		this.localCollection = certification;
	// 	}
	// }

	// editItemAndCloseModel() {
	// 	if (!(this.sourcecertificationtype.certificationame)) {
	// 		this.display = true;
	// 		this.modelValue = true;
	// 	}
	// 	if ((this.sourcecertificationtype.certificationame)) {
	// 		this.isSaving = true;

	// 		if (this.isEditMode == false) {
	// 			this.sourcecertificationtype.createdBy = this.userName;
	// 			this.sourcecertificationtype.updatedBy = this.userName;
	// 			//this.sourcecertificationtype.certificationName = this.certificationName;
	// 			this.sourcecertificationtype.masterCompanyId = 1;
	// 			this.workFlowtService.newCertificationtype(this.sourcecertificationtype).subscribe(
	// 				role => this.saveSuccessHelper(role),
	// 				error => this.saveFailedHelper(error));
	// 		}
	// 		else {

	// 			this.sourcecertificationtype.updatedBy = this.userName;
	// 			//this.sourcecertificationtype.certificationName = this.sourcecertificationtype.description;
	// 			this.sourcecertificationtype.certificationname = this.editValueAssignByCondition('description', this.sourcecertificationtype.certificationname)
	// 			this.sourcecertificationtype.masterCompanyId = 1;
	// 			this.workFlowtService.updateCertificationtype(this.sourcecertificationtype).subscribe(
	// 				response => this.saveCompleted(this.sourcecertificationtype),
	// 				error => this.saveFailedHelper(error));
	// 		}

	// 		this.modal.close();
	// 	}
	// }
	// deleteItemAndCloseModel() {
	// 	this.isSaving = true;
	// 	this.sourcecertificationtype.updatedBy = this.userName;
	// 	this.workFlowtService.deleteCertificationtype(this.sourcecertificationtype.employeeLicenseTypeId).subscribe(
	// 		response => this.saveCompleted(this.sourcecertificationtype),
	// 		error => this.saveFailedHelper(error));
	// 	this.modal.close();
	// }

	// dismissModel() {
	// 	this.isDeleteMode = false;
	// 	this.isEditMode = false;
	// 	this.modal.close();
	// }

	// private saveSuccessHelper(role?: any) {
	// 	this.isSaving = false;
	// 	this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

	// 	this.loadData();

	// }

	// private saveCompleted(user?: any) {
	// 	this.isSaving = false;

	// 	if (this.isDeleteMode == true) {
	// 		this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
	// 		this.isDeleteMode = false;
	// 	}
	// 	else {
	// 		this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

	// 	}

	// 	this.loadData();
	// }

	// get userName(): string {
	// 	return this.authService.currentUser ? this.authService.currentUser.userName : "";
	// }

	// private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {

	// 	// debugger;
	// 	this.alertService.stopLoadingMessage();
	// 	this.loadingIndicator = false;

	// 	this.auditHisory = auditHistory;


	// 	this.modal = this.modalService.open(content, { size: 'lg' });

	// 	this.modal.result.then(() => {
	// 		console.log('When user closes');
	// 	}, () => { console.log('Backdrop click') })


	// }
	// private saveFailedHelper(error: any) {
	// 	this.isSaving = false;
	// 	this.alertService.stopLoadingMessage();
	// 	this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
	// 	this.alertService.showStickyMessage(error, null, MessageSeverity.error);
	// }

	// private getDismissReason(reason: any): string {
	// 	if (reason === ModalDismissReasons.ESC) {
	// 		return 'by pressing ESC';
	// 	} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
	// 		return 'by clicking on a backdrop';
	// 	} else {
	// 		return `with: ${reason}`;
	// 	}
	// }

	// showAuditPopup(template, id): void {
	// 	this.certificationType(id);
	// 	this.modal = this.modalService.open(template, { size: 'sm' });
	// }

	// certificationType(certificationTypeId: number): void {
	// 	this.AuditDetails = [];
	// 	this.workFlowtService.getEmployeeLicenceAudit(certificationTypeId).subscribe(audits => {
	// 		if (audits.length > 0) {
	// 			this.AuditDetails = audits;
	// 			this.AuditDetails[0].ColumnsToAvoid = ["employeeLicenseTypeAuditId", "employeeLicenseTypeId", "createdBy", "createdDate", "updatedDate"];
	// 		}
	// 	});
	// }
}
