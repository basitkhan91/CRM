import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { PageHeaderComponent } from '../../../../shared/page-header.component';
import * as $ from 'jquery';
import { LegalEntityEndpontService } from '../../../../services/legalentity-endpoint.service';
import { AuthService } from '../../../../services/auth.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { FormBuilder } from '@angular/forms';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { MasterCompany } from '../../../../models/mastercompany.model';
import { CurrencyService } from '../../../../services/currency.service';
import { Currency } from '../../../../models/currency.model';
//import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
	selector: 'app-entity-edit',
	templateUrl: './entity-edit.component.html',
	styleUrls: ['./entity-edit.component.scss'],
	animations: [fadeInOut]
})
/** EntityEdit component*/
export class EntityEditComponent implements OnInit, AfterViewInit {
	cols1: any[];
	
	//isEditMode: boolean;
	gridData: TreeNode[];
	childCollection: any[] = [];
	/** EntityList ctor */
	allCurrencyInfo: any[];
	sourceLegalEntity: any = {};
	selectedNode1: TreeNode;
	dataSource: MatTableDataSource<{}>;
	displayedColumns: any;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	selectedColumn: any;
	@ViewChild(MatSort) sort: MatSort;
	loadingIndicator: boolean;
	currencyName: any;
	cols: any[];
	allComapnies: MasterCompany[] = [];
	allATAMaininfo: any[] = [];
	isSaving: boolean;
	selectedColumns: any[];
	selectedColumns1: any[];
	//selectedColumn: any;
	isEditMode: boolean = false;
	isDeleteMode: boolean;
	public sourceAction: any = [];
	public GeneralInformationValue: boolean = true;
	public LockboxValue: boolean = false;
	public domesticWireValue: boolean = false;
	public internationalValue: boolean = false;
	public GeneralInformationStyle: boolean = true;
	public LockboxStyle: boolean = false;
	public domesticWireStyle: boolean = false;
	public internationalStyle: boolean = false;
	ACHStyle: boolean;
	ACHValue: boolean;
	entityName: string;
    Active: string;
    entityViewFeilds: any = {};
	//selectedNode1: TreeNode

	constructor(
		private authService: AuthService, private _fb: FormBuilder, private alertService: AlertService, public currency: CurrencyService, public workFlowtService: LegalEntityService, private modalService: NgbModal, private activeModal: NgbActiveModal, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {

		this.dataSource = new MatTableDataSource();
		if (this.workFlowtService.listCollection != null && this.workFlowtService.isEditMode == true) {
			this.sourceLegalEntity = this.workFlowtService.listCollection;
			this.sourceLegalEntity.createdDate = new Date();
			this.sourceLegalEntity.modifiedDate = new Date();
		}
	
	}

	ngOnInit(): void {
		this.CurrencyData();
		this.loadData();
	}

	modal: NgbModalRef;
	modal1: NgbModalRef;

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	public allWorkFlows: any[] = [];


	private loadMasterCompanies() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.masterComapnyService.getMasterCompanies().subscribe(
			results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}

	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getEntityList().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

		this.cols = [
			//{ field: 'ataMainId', header: 'ATAMain Id' },
			{ field: 'name', header: 'Name' },
			{ field: 'description', header: 'Description' },
			{ field: 'cageCode', header: 'Cage Code' },
			{ field: 'doingLegalAs', header: 'Doing Business As' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' },
			{ field: 'updatedDate', header: 'Updated Date' },
			{ field: 'createdDate', header: 'Created Date' }
		];

		this.selectedColumns = this.cols;
	}

	private onDataLoadSuccessful(getAtaMainList: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getAtaMainList;
		this.allATAMaininfo = getAtaMainList;
		//debugger;

		//this.gridData = this.makeNestedObj(this.allATAMaininfo, null);
		//this.cols1 = [
		//	{ field: 'name', header: 'Name' },

		//];
		//this.selectedColumns1 = this.cols1;
	}

	makeNestedObj(arr, parent) {
		var out = []
		for (var i in arr) {
			if (arr[i].parentId == parent) {
				var children = this.makeNestedObj(arr, arr[i].legalEntityId)
				arr[i] = { "data": arr[i] };
				if (children.length) {
					arr[i].children = children
				}
				out.push(arr[i])
			}
		}
		return out
	}

	GeneralInformation() {
		this.GeneralInformationValue = true;
		this.LockboxValue = false;
		this.domesticWireValue = false;
		this.internationalValue = false;
		this.ACHValue = false;

		this.GeneralInformationStyle = true;
		this.LockboxStyle = false;
		this.domesticWireStyle = false;
		this.internationalStyle = false;
		this.ACHStyle = false;
	}

	Lockbox() {
		this.GeneralInformationValue = false;
		this.LockboxValue = true;
		this.domesticWireValue = false;
		this.internationalValue = false;
		this.ACHValue = false;

		this.GeneralInformationStyle = false;
		this.LockboxStyle = true;
		this.domesticWireStyle = false;
		this.internationalStyle = false;
		this.ACHStyle = false;
	}
	DomesticWire() {
		this.GeneralInformationValue = false;
		this.LockboxValue = false;
		this.domesticWireValue = true;
		this.internationalValue = false;
		this.ACHValue = false;

		this.GeneralInformationStyle = false;
		this.LockboxStyle = false;
		this.domesticWireStyle = true;
		this.internationalStyle = false;
		this.ACHStyle = false;
	}
	InternationalWire() {
		this.GeneralInformationValue = false;
		this.LockboxValue = false;
		this.domesticWireValue = false;
		this.internationalValue = true;
		this.ACHValue = false;

		this.GeneralInformationStyle = false;
		this.LockboxStyle = false;
		this.domesticWireStyle = false;
		this.internationalStyle = true;
		this.ACHStyle = false;
	}
	ACH() {
		this.GeneralInformationValue = false;
		this.LockboxValue = false;
		this.domesticWireValue = false;
		this.internationalValue = false;
		this.ACHValue = true;

		this.GeneralInformationStyle = false;
		this.LockboxStyle = false;
		this.domesticWireStyle = false;
		this.internationalStyle = false;
		this.ACHStyle = true;
	}
	showDomesticWire() {

		this.DomesticWire();
	}



	open(content) {
		this.sourceLegalEntity = {};
		this.sourceLegalEntity.isActive = true;
		this.entityName = "";
		this.modal = this.modalService.open(content, { size: 'lg' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allComapnies = allComapnies;

	}
	private CurrencyData() {
		// 
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.currency.getCurrencyList().subscribe(
			results => this.oncurrencySuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}
	private oncurrencySuccessful(getCreditTermsList: Currency[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allCurrencyInfo = getCreditTermsList;
	}
	private onDataLoadFailed(error: any) {
		// alert(error);
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

	}
	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}

	openCurrency(content) {

		this.isEditMode = false;
		this.isDeleteMode = false;

		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceAction = new Currency();
		this.sourceAction.isActive = true;
		this.currencyName = "";
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {



			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	editItemAndCloseModel() {

		this.isSaving = true;

		if (!this.sourceLegalEntity.legalEntityId) {
			this.sourceLegalEntity.createdBy = this.userName;
			this.sourceLegalEntity.updatedBy = this.userName;

			this.sourceLegalEntity.masterCompanyId = 1;
			this.workFlowtService.newAddEntity(this.sourceLegalEntity).subscribe(
				role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
            this.workFlowtService.getEntityforEdit().subscribe(
                results => this.onDataLoadSuccessful(results[0]),
                error => this.onDataLoadFailed(error)
            );

            this.loadData();
		}
		else {

			this.sourceLegalEntity.createdBy = this.userName;
			this.sourceLegalEntity.updatedBy = this.userName;
            this.sourceLegalEntity.masterCompanyId = 1;
			this.workFlowtService.updateEntity(this.sourceLegalEntity).subscribe(
				response => this.saveCompleted(this.sourceLegalEntity),
                error => this.saveFailedHelper(error));
            this.workFlowtService.getEntityforEdit().subscribe(
                results => this.onDataLoadSuccessful(results[0]),
                error => this.onDataLoadFailed(error)
            );

            this.loadData();
		}
		if (this.modal) { this.modal.close();}
		if (this.modal1) { this.modal1.close();}		
		
	}


	private saveSuccessHelper(role?: any) {
		this.isSaving = false;
		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

		//this.loadData();

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

		//this.loadData();
	}

	private saveFailedHelper(error: any) {
		this.isSaving = false;
		this.alertService.stopLoadingMessage();
		this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
		this.alertService.showStickyMessage(error, null, MessageSeverity.error);
	}

	dismissModel() {
		this.isDeleteMode = false;
		this.isEditMode = false;
		if (this.modal) { this.modal.close(); }
		if (this.modal1) { this.modal1.close(); }
		
	}
	openContentEdit(content, row) {
		this.GeneralInformation();
		this.sourceLegalEntity.isBankingInfo = false;
		this.sourceLegalEntity = row;
		this.sourceLegalEntity.createdDate = new Date(row.createdDate);
		this.sourceLegalEntity.modifiedDate = new Date(row.updatedDate);
		this.modal1 = this.modalService.open(content, { size: 'lg' });
		this.modal1.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	openEdit(content, row) {
		this.GeneralInformation();
		this.sourceLegalEntity = {};
		this.sourceLegalEntity = row;
		

		this.isSaving = true;
		this.sourceLegalEntity.parentId = row.legalEntityId;
		this.modal = this.modalService.open(content, { size: 'lg' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	openDelete(content, row) {
		this.sourceLegalEntity = row;
		this.isEditMode = false;
		this.isDeleteMode = true;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	deleteItemAndCloseModel() {
		this.isSaving = true;
		this.sourceLegalEntity.updatedBy = this.userName;
		this.workFlowtService.updateEntitydelete(this.sourceLegalEntity.legalEntityId).subscribe(
			data => {
				this.loadData();
			})
		this.modal.close();
	}
	openHist(content, row) {
		this.sourceLegalEntity = row;

    }

    toggleIsActive(rowData, e) {
        if (e.checked == false) {
            this.sourceLegalEntity = rowData;
            this.sourceLegalEntity.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceLegalEntity.isActive == false;
            this.workFlowtService.updateLegalEntityForActive(this.sourceLegalEntity).subscribe(
                response => this.saveCompleted(this.sourceLegalEntity),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceLegalEntity = rowData;
            this.sourceLegalEntity.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceLegalEntity.isActive == true;
            this.workFlowtService.updateLegalEntityForActive(this.sourceLegalEntity).subscribe(
                response => this.saveCompleted(this.sourceLegalEntity),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

    }
    openView(content, row) {

        this.entityViewFeilds.name = row.name;
        this.entityViewFeilds.description = row.description;
        this.entityViewFeilds.doingLegalAs = row.doingLegalAs;
        this.entityViewFeilds.address1 = row.address1;
        this.entityViewFeilds.address2 = row.address2;
        this.entityViewFeilds.city = row.city;
        this.entityViewFeilds.stateOrProvince = row.stateOrProvince;
        this.entityViewFeilds.postalCode = row.postalCode;
        this.entityViewFeilds.country = row.country;
        this.entityViewFeilds.faxNumber = row.faxNumber;
        this.entityViewFeilds.phoneNumber1 = row.phoneNumber1;
        this.modal = this.modalService.open(content, { size: 'lg' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
  
}