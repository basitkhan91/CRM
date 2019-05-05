import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { AtaSubChapter1Service } from '../../services/atasubchapter1.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { ATASubChapter } from '../../models/atasubchapter.model';
import { AuditHistory } from '../../models/audithistory.model';
import { AuthService } from '../../services/auth.service';
import { ATAMain } from '../../models/atamain.model';
import { AtaMainService } from '../../services/atamain.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { ATAChapter } from '../../models/atachapter.model';
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
@Component({
	selector: 'app-ata-sub-chapter1',
	templateUrl: './ata-sub-chapter1.component.html',
	styleUrls: ['./ata-sub-chapter1.component.scss'],
	animations: [fadeInOut]
})
/** AtaSubChapter1 component*/
export class AtaSubChapter1Component implements OnInit, AfterViewInit {
	
	memo: any = "";
	createdBy: any = "";
	updatedBy: any = "";
	createdDate: any = "";
	updatedDate: any = "";
	private isEditMode: boolean = false;
	private isDeleteMode: boolean = false;
	Active: string = "Active";
	selectedActionName: any;
	disableSave: boolean;
	actionamecolle: any[] = [];
    description: string;
    ataChapterCode: any;
    AuditDetails: SingleScreenAuditDetails[];
	/** AtaSubChapter1 ctor */
	ngOnInit(): void {
		this.loadData();
		this.atamaindata();
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-ata-sub-chapter1';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	displayedColumns = ['memo','createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
	dataSource: MatTableDataSource<ATASubChapter>;
	allATAMaininfo: ATASubChapter[] = [];
	allComapnies: MasterCompany[] = [];
	allATAMaininfo1: any[];
	private isSaving: boolean;
	public sourceAction: any;
	public auditHisory: AuditHistory[] = [];
	private bodyText: string;
	loadingIndicator: boolean;
	closeResult: string;
	selectedColumn: ATASubChapter[];
	selectedColumns: any[];
	cols: any[];
	title: string = "Create";
	id: number;
	errorMessage: any;
	modal: NgbModalRef;
	ataChapterName: string;
	filteredBrands: any[];
	localCollection: any[] = [];
	//allATAMaininfo: ATAMain[] = [];
	/** Actions ctor */

	constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, public ataservice: AtaMainService, private _fb: FormBuilder, private alertService: AlertService, public ataSubChapter1Service: AtaSubChapter1Service, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
		this.displayedColumns.push('action');
		this.dataSource = new MatTableDataSource();
		this.sourceAction = new ATASubChapter();

	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	public allWorkFlows: ATASubChapter[] = [];

	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.ataSubChapter1Service.getAtaSubChapter1List().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

        this.cols = [
            { field: 'ataSubChapterCode', header: 'ATA SubChapter Code' },
			{ field: 'description', header: 'Description' },
			//{ field: 'ataChapterName', header: 'ATA Chapter Name' },
			//{ field: 'ataChapterCategory', header: 'ATA Chapter Category' },
			{ field: 'memo', header: 'Memo' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' }
		];

		this.selectedColumns = this.cols;

	}

	private loadMasterCompanies() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.masterComapnyService.getMasterCompanies().subscribe(
			results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}
	private atamaindata() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.ataservice.getAtaMainList().subscribe(
			results => this.onSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onSuccessful(getAtaMainList: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = getAtaMainList;
		this.allATAMaininfo1 = getAtaMainList;
	}

	public applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue;
	}

	private refresh() {
		// Causes the filter to refresh there by updating with recently added data.
		this.applyFilter(this.dataSource.filter);
	}

	private onDataLoadSuccessful(getAtaSubChapter1List: ATASubChapter[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getAtaSubChapter1List;
		this.allATAMaininfo = getAtaSubChapter1List;
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

	//eventHandler(event) {
	//	let value = event.target.value.toLowerCase();
	//	if (this.selectedActionName) {
	//		if (value == this.selectedActionName.toLowerCase()) {
	//			//alert("Action Name already Exists");
	//			this.disableSave = true;
	//		}
	//		else {
	//			this.disableSave = false;
	//		}
	//	}
	//	else {
	//		for (let i = 0; i < this.allATAMaininfo.length; i++) {
	//			if (value == this.allATAMaininfo[i][0].actionAttributeName.toLowerCase()) {
	//				//alert("Action Name already Exists");
	//				this.disableSave = true;
	//				this.selectedActionName = event;
	//			}
	//		}
	//	}

	//}

	eventHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedActionName) {
				if (value == this.selectedActionName.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSave = true;
				}
				else {
					this.disableSave = false;
				}
			}
		}
	}


	partnmId(event) {
		//debugger;
		if (this.allATAMaininfo) {

			for (let i = 0; i < this.allATAMaininfo.length; i++) {
				if (event == this.allATAMaininfo[i].description) {
					this.sourceAction.description = this.allATAMaininfo[i].description;
					this.disableSave = true;

					this.selectedActionName = event;
				}
			}
		}
	}
	filterActionAttributes(event) {

		this.localCollection = [];
		for (let i = 0; i < this.allATAMaininfo.length; i++) {
			let description = this.allATAMaininfo[i].description;
			if (description.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.actionamecolle.push([{
					"ataSubChapterId": this.allATAMaininfo[i].ataSubChapterId,
					"description": description
				}]),
					this.localCollection.push(description)

			}
		}
	}

	private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allComapnies = allComapnies;

	}

	private onDataLoadFailed(error: any) {
		// alert(error);
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

	}

	handleChange(rowData, e) {
		if (e.checked == false) {
			this.sourceAction = rowData;
			this.sourceAction.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceAction.isActive == false;
			this.ataSubChapter1Service.updateATASubChapter1(this.sourceAction).subscribe(
				response => this.saveCompleted(this.sourceAction),
				error => this.saveFailedHelper(error));
			//alert(e);
		}
		else {
			this.sourceAction = rowData;
			this.sourceAction.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceAction.isActive == true;
			this.ataSubChapter1Service.updateATASubChapter1(this.sourceAction).subscribe(
				response => this.saveCompleted(this.sourceAction),
				error => this.saveFailedHelper(error));
			//alert(e);
		}

	}

	open(content) {

		this.isEditMode = false;
		this.isDeleteMode = false;
		this.disableSave = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceAction = new ATASubChapter();
		this.sourceAction.isActive = true;
		this.ataChapterName = "";
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}


	openDelete(content, row) {

		this.isEditMode = false;
		this.isDeleteMode = true;
		this.sourceAction = row;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openEdit(content, row) {

		this.isEditMode = true;
		this.disableSave = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceAction = row;
		//this.ataChapterName = this.sourceAction.ataChapterName;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openView(content, row) {

		this.sourceAction = row;
		//this.ataChapter_Name = row.ataChapterName;
		//this.ataChapterCategory = row.ataChapterCategory;
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

	openHelpText(content) {
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}



	openHist(content, row) {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;


		this.sourceAction = row;



		//this.isSaving = true;
		// debugger;
		this.ataSubChapter1Service.historyATASubChapter1(this.sourceAction.ataSubChapterId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));


	}


	editItemAndCloseModel() {

		// debugger;

		this.isSaving = true;

		if (this.isEditMode == false) {
			this.sourceAction.createdBy = this.userName;
			this.sourceAction.updatedBy = this.userName;
			this.sourceAction.masterCompanyId = 1;
			//this.sourceAction.ataChapterCode = this.ataChapterCode;
			this.ataSubChapter1Service.newATASubChapter1(this.sourceAction).subscribe(
				role => this.saveSuccessHelper(role),
				error => this.saveFailedHelper(error));
		}
		else {

			this.sourceAction.updatedBy = this.userName;
			//this.sourceAction.ataChapterCode = this.ataChapterCode;
			this.sourceAction.masterCompanyId = 1;
			this.ataSubChapter1Service.updateATASubChapter1(this.sourceAction).subscribe(
				response => this.saveCompleted(this.sourceAction),
				error => this.saveFailedHelper(error));
		}

		this.modal.close();
	}

	deleteItemAndCloseModel() {
		this.isSaving = true;
		this.sourceAction.updatedBy = this.userName;
		this.ataSubChapter1Service.deleteATASubChapter1(this.sourceAction.ataSubChapterId).subscribe(
			response => this.saveCompleted(this.sourceAction),
			error => this.saveFailedHelper(error));
		this.modal.close();
	}

	

	//partnmId(event) {
	//	//debugger;
	//	for (let i = 0; i < this.actionamecolle.length; i++) {
	//		if (event == this.actionamecolle[i][0].ataChapterName) {
	//			//alert("Action Name already Exists");
	//			this.disableSave = true;
	//			this.selectedActionName = event;
	//		}
	//	}
	//}

	//filterAtamains(event) {

	//	this.localCollection = [];
	//	for (let i = 0; i < this.allATAMaininfo.length; i++) {
	//		let ataChapterName = this.allATAMaininfo[i].ataSubChapter1Id;
	//		if (ataChapterName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
	//			this.actionamecolle.push([{
	//				"ataSubChapter1Id": this.allATAMaininfo[i].ataSubChapter1Id,
	//				"ataChapterName": ataChapterName
	//			}]),
	//				this.localCollection.push(ataChapterName);
	//		}
	//	}
	//}

	dismissModel() {
		this.isDeleteMode = false;
		this.isEditMode = false;
		this.modal.close();
	}

	private saveCompleted(user?: ATASubChapter) {
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

	private saveSuccessHelper(role?: ATASubChapter) {
		this.isSaving = false;
		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

		this.loadData();

	}

	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
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
        this.auditAtaSubchapter(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditAtaSubchapter(ataSubChapterId: number): void {
        this.AuditDetails = [];
        this.ataSubChapter1Service.getAtaSubChapterAudit(ataSubChapterId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["ataSubChapterAuditId", "ataSubChapterId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }
}


