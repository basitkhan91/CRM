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
import { CertificationtypeService } from '../../services/certificationtype.service';
import { CertificationType } from '../../models/certificationtype.model';
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";

@Component({
	selector: 'app-certification-type',
	templateUrl: './certification-type.component.html',
	styleUrls: ['./certification-type.component.scss'],
	animations: [fadeInOut]
})
/** GlAccountClass component*/
export class CertificationTypeComponent implements OnInit, AfterViewInit {
	disablesave: boolean;
	selectedcertificationName: any;
	auditHisory: any[];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	certificationNamecolle: any[] = [];
	cols: any[];
	selectedColumns: any[];
	displayedColumns = ['description', 'createdDate', 'companyName'];
	dataSource: MatTableDataSource<any>;
	allCertification: any[];
	allComapnies: MasterCompany[] = [];
	private isSaving: boolean;
	public sourcecertificationtype: any = {}
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
	description: string;
	filteredBrands: any[];
	localCollection: any[] = [];
	selectedColumn: any[];
	Active: string = "Active";
    certificationViewFileds: any = {};
    AuditDetails: SingleScreenAuditDetails[];
	//disablesave: boolean = false;


	
	constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: CertificationtypeService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
		this.displayedColumns.push('action');
		this.dataSource = new MatTableDataSource();
		this.sourcecertificationtype = new CertificationType();
	}
	ngOnInit(): void {
		this.loadData();
		this.cols = [


			{ field: 'description', header: 'Certification Name' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' },


		];
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-certification-type';
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
		this.workFlowtService.getWorkFlows().subscribe(
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

		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = allWorkFlows;
		this.allCertification = allWorkFlows;

	}
	private onDataLoadFailed(error: any) {
		// alert(error);
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

	}
	open(content) {
		
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.disablesave = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourcecertificationtype = new CertificationType();
		this.description = "";
		this.sourcecertificationtype.isActive = true;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}


	openView(content, row) {

		this.sourcecertificationtype = row;
		this.certificationViewFileds.capabilityName = row.description;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	openDelete(content, row) {

		this.isEditMode = false;
		this.isDeleteMode = true;
		this.sourcecertificationtype = row;
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
		this.sourcecertificationtype = row;
		this.description = this.sourcecertificationtype.description;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openHist(content, row) {

		this.sourcecertificationtype = row;

		this.workFlowtService.historyCertificationtype(this.sourcecertificationtype.employeeLicenseTypeId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));
	}

	handleChange(rowData, e) {
		if (e.checked == false) {
			this.sourcecertificationtype = rowData;
			this.sourcecertificationtype.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourcecertificationtype.isActive == false;
			this.workFlowtService.updateCertificationtype(this.sourcecertificationtype).subscribe(
				response => this.saveCompleted(this.sourcecertificationtype),
				error => this.saveFailedHelper(error));
			//alert(e);
		}
		else {
			this.sourcecertificationtype = rowData;
			this.sourcecertificationtype.updatedBy = this.userName;
		
			this.Active = "Active";
			this.sourcecertificationtype.isActive == true;
			this.workFlowtService.updateCertificationtype(this.sourcecertificationtype).subscribe(
				response => this.saveCompleted(this.sourcecertificationtype),
				error => this.saveFailedHelper(error));
			
		}

	}
	eventHandler(event) {
		if (event.target.value != "") {
		let value = event.target.value.toLowerCase();
			if (this.selectedcertificationName) {
				if (value == this.selectedcertificationName.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disablesave = true;
				}
				else {
					this.disablesave = false;

				}
			}
		}
	}

	partnmId(event) {

		for (let i = 0; i < this.allCertification.length; i++) {
			if (event == this.allCertification[i].description) {
				this.disablesave = true;
				this.selectedcertificationName = event;
			}
		}
	}
	//partnmId(event) {
		

	//		for (let i = 0; i < this.allCertification.length; i++) {
	//			if (event == this.allCertification[i][0].description) {
	//				//this.sourcecertificationtype.certificationName = this.allCertification[i].certificationName;
	//				this.disablesave = true;

	//				this.selectedcertificationName = event;
	//			}
	//		}
	//}
	filterGlAccountclass(event) {

		this.localCollection = [];
		for (let i = 0; i < this.allCertification.length; i++) {
			let description = this.allCertification[i].description;
			if (description.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.certificationNamecolle.push([{
					"employeeLicenseTypeId": this.allCertification[i].employeeLicenseTypeId,
					"description": description
				}]),
					this.localCollection.push(description)

			}
		}
	}

	editItemAndCloseModel() {
		if (!(this.sourcecertificationtype.description)) {
			this.display = true;
			this.modelValue = true;
		}
		if ((this.sourcecertificationtype.description)) {
			this.isSaving = true;

			if (this.isEditMode == false) {
				this.sourcecertificationtype.createdBy = this.userName;
				this.sourcecertificationtype.updatedBy = this.userName;
				//this.sourcecertificationtype.certificationName = this.certificationName;
				this.sourcecertificationtype.masterCompanyId = 1;
				this.workFlowtService.newCertificationtype(this.sourcecertificationtype).subscribe(
					role => this.saveSuccessHelper(role),
					error => this.saveFailedHelper(error));
			}
			else {

				this.sourcecertificationtype.updatedBy = this.userName;
				//this.sourcecertificationtype.certificationName = this.certificationName;
				this.sourcecertificationtype.masterCompanyId = 1;
				this.workFlowtService.updateCertificationtype(this.sourcecertificationtype).subscribe(
					response => this.saveCompleted(this.sourcecertificationtype),
					error => this.saveFailedHelper(error));
			}

			this.modal.close();
		}
	}
	deleteItemAndCloseModel() {
		this.isSaving = true;
		this.sourcecertificationtype.updatedBy = this.userName;
		this.workFlowtService.deleteCertificationtype(this.sourcecertificationtype.employeeLicenseTypeId).subscribe(
			response => this.saveCompleted(this.sourcecertificationtype),
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

		this.loadData();

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

		this.loadData();
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

    showAuditPopup(template, id): void {
        this.certificationType(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    certificationType(certificationTypeId: number): void
    {
        this.AuditDetails = [];
        this.workFlowtService.getEmployeeLicenceAudit(certificationTypeId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["employeeLicenseTypeAuditId", "employeeLicenseTypeId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }
}
