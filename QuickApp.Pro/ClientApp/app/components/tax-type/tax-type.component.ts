import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { TaxTypeService } from '../../services/taxtype.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { TaxType } from '../../models/taxtype.model';
import { AuditHistory } from '../../models/audithistory.model';
import { AuthService } from '../../services/auth.service';

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
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";

@Component({
	selector: 'app-tax-type',
	templateUrl: './tax-type.component.html',
	styleUrls: ['./tax-type.component.scss'],
	animations: [fadeInOut]
})
/** Actions component*/
export class TaxTypeComponent implements OnInit, AfterViewInit {
    actionamecolle: any[]=[];
    disableSave: boolean= false;
    selectedActionName: any;
    taxType_Name: any = ""; 
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
	ngOnInit(): void {
		this.loadData();
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-tax-type';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
	}
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
    Active: string = "Active";
	displayedColumns = ['taxTypeId', 'description', 'createdBy', 'By', 'updatedDate', 'createdDate'];
	dataSource: MatTableDataSource<TaxType>;
	allTaxTypes: TaxType[] = [];
	allComapnies: MasterCompany[] = [];
	private isSaving: boolean;
	public sourceAction: TaxType;
	public auditHisory: AuditHistory[] = [];
	private bodyText: string;
	loadingIndicator: boolean;
	closeResult: string;
	selectedColumn: TaxType[];
	selectedColumns: any[];
	cols: any[];
	title: string = "Create";
	id: number;
	errorMessage: any;
    modal: NgbModalRef;

    description: string;
    filteredBrands: any[];
    localCollection: any[] = [];
	/** Actions ctor */

	private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    AuditDetails: SingleScreenAuditDetails[];


	constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: TaxTypeService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
		this.displayedColumns.push('taxType');
		this.dataSource = new MatTableDataSource();
		this.sourceAction = new TaxType();

	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	public allWorkFlows: TaxType[] = [];

	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getWorkFlows().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

		this.cols = [
			{ field: 'description', header: 'Tax Type' },
			{ field: 'memo', header: 'Memo' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' },
			//{ field: 'updatedDate', header: 'Updated Date' },
			//{ field: 'createdDate', header: 'createdDate' }

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

	public applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue;
	}

	private refresh() {
		// Causes the filter to refresh there by updating with recently added data.
		this.applyFilter(this.dataSource.filter);
	}
	private onDataLoadSuccessful(allWorkFlows: TaxType[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allTaxTypes = allWorkFlows;
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

	open(content) {

		this.isEditMode = false;
		this.isDeleteMode = false;
		this.disableSave = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceAction = new TaxType();
        this.sourceAction.isActive = true;
        this.description = "";
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
    openView(content, row) {

        this.sourceAction = row;
        this.taxType_Name = row.description;     
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
        this.description = this.sourceAction.description;

		this.loadMasterCompanies();
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
		this.workFlowtService.historyTaxType(this.sourceAction.taxTypeId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));


    }


    eventHandler(event) {
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
    partnmId(event) {
        //debugger;
		for (let i = 0; i < this.actionamecolle.length; i++)
		{
			if (event == this.actionamecolle[i][0].description)
			{
                //alert("Action Name already Exists");
                this.disableSave = true;
                this.selectedActionName = event;
            }
        }
    }


    filterTaxTypes(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allTaxTypes.length; i++) {
            let description = this.allTaxTypes[i].description;
            if (description.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {

                this.actionamecolle.push([{
                    "taxTypeId": this.allTaxTypes[i].taxTypeId,
                    "description": description
                }]),

                this.localCollection.push(description);
            }
        }
    }
    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceAction.isActive == false;
            this.workFlowtService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive == true;
            this.workFlowtService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

    }

    

	editItemAndCloseModel() {

		// debugger;

		this.isSaving = true;

		if (this.isEditMode == false) {
			this.sourceAction.createdBy = this.userName;
			this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.description;
            this.sourceAction.masterCompanyId = 1;
			this.workFlowtService.newAction(this.sourceAction).subscribe(
				role => this.saveSuccessHelper(role),
				error => this.saveFailedHelper(error));
		}
		else {

			this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.description;
            this.sourceAction.masterCompanyId = 1;
			this.workFlowtService.updateAction(this.sourceAction).subscribe(
				response => this.saveCompleted(this.sourceAction),
				error => this.saveFailedHelper(error));
		}

		this.modal.close();
	}

	deleteItemAndCloseModel() {
		this.isSaving = true;
		this.sourceAction.updatedBy = this.userName;
		this.workFlowtService.deleteAcion(this.sourceAction.taxTypeId).subscribe(
			response => this.saveCompleted(this.sourceAction),
			error => this.saveFailedHelper(error));
		this.modal.close();
	}

	dismissModel() {
		this.isDeleteMode = false;
		this.isEditMode = false;
		this.modal.close();
	}

	private saveCompleted(user?: TaxType) {
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

	private saveSuccessHelper(role?: TaxType) {
		this.isSaving = false;
		this.alertService.showMessage("Success", `TaxType was created successfully`, MessageSeverity.success);

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
        this.auditAssetStatus(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditAssetStatus(taxTypeId: number): void
    {
        this.AuditDetails = [];
        this.workFlowtService.getTaxTypeAudit(taxTypeId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["TaxTypeAuditId", "TaxTypeId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }
}