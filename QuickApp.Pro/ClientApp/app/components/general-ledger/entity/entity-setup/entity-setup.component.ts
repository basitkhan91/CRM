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
import { TreeNode, MenuItem, MessageService } from 'primeng/api';
import { forEach } from '@angular/router/src/utils/collection';
//import { TreeTableModule } from 'primeng/treetable';

@Component({
    selector: 'app-managemententity-structure',
    templateUrl: './entity-setup.component.html',
    styleUrls: ['./entity-setup.component.scss'],
    animations: [fadeInOut]
})
/** EntitySetup component*/

export class ManagementStructureComponent implements OnInit, AfterViewInit {
	selectedNode1: any;
	tagNameCollection: any[]=[];
	modelValue: boolean = false;
	display: boolean = false;
	showicon: boolean=false;
	treeindex: number=1;
	allManagemtninfo: any[];
	modal1: NgbModalRef;
	cols1: any[];
	header: boolean = true;
	headerofMS: any = "";
	gridData: TreeNode[];
	childCollection: any[] = [];
	/** EntityList ctor */
	allCurrencyInfo: any[];
	sourceLegalEntity: any = {}
	dataSource: MatTableDataSource<{}>;
	displayedColumns: any;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	loadingIndicator: boolean;
	currencyName: any;
	cols: any[];
	allComapnies: MasterCompany[] = [];
	allATAMaininfo: any[] = [];
	isSaving: boolean;
	selectedColumns: any[];
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
	selectedFile3: TreeNode;
	items: MenuItem[];
	selectedNode: TreeNode;
    managementViewData: any = {};
	
	constructor(private messageService: MessageService,private authService: AuthService, private _fb: FormBuilder, private alertService: AlertService, public currency: CurrencyService, public workFlowtService: LegalEntityService, private modalService: NgbModal, private activeModal: NgbActiveModal, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {

		this.dataSource = new MatTableDataSource();


	}

	ngOnInit(): void {
		this.CurrencyData();
		this.loadData();
		this.loadManagementdata();
	}

	modal: NgbModalRef;


	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	public allWorkFlows: any[] = [];

	contextMenu(node, contextMenu) {
		if (node) {
			contextMenu.hide();
		}
	}
	private loadMasterCompanies() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.masterComapnyService.getMasterCompanies().subscribe(
			results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}
	
	expandAll(toggle: boolean) {
		this.gridData.map(node => {
			node.expanded = toggle;
		});
	}
	private loadManagementdata() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getManagemententity().subscribe(
			results => this.onManagemtntdataLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);

		this.cols = [
			//{ field: 'ataMainId', header: 'ATAMain Id' },
			{ field: 'code', header: 'Code' },
			{ field: 'description', header: 'Description' },
			//{ field: 'cageCode', header: 'CageCode' },
			//{ field: 'doingLegalAs', header: 'DoingLegalAs' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' },
			{ field: 'updatedDate', header: 'Updated Date' },
			{ field: 'createdDate', header: 'createdDate' }
		];

		this.selectedColumns = this.cols;
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
			{ field: 'cageCode', header: 'CageCode' },
			{ field: 'doingLegalAs', header: 'DoingLegalAs' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' },
			{ field: 'updatedDate', header: 'Updated Date' },
			{ field: 'createdDate', header: 'createdDate' }
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
		
	}
	nodeSelect(event) {
		this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.data.name });
	}

	nodeUnselect(event) {
		this.messageService.add({ severity: 'info', summary: 'Node Unselected', detail: event.node.data.name });
	}
	private onManagemtntdataLoad(getAtaMainList: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getAtaMainList;
		this.allManagemtninfo = getAtaMainList;
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].tagName != null) {
				this.tagNameCollection.push(this.allManagemtninfo[i]);
			}
		}
		//debugger;
		if (this.allManagemtninfo)
		{
			
			this.gridData = this.makeNestedObj(this.allManagemtninfo, null);
		}

		this.cols1 = [
			{ field: 'code', header: 'Code' },
			{ field: 'name', header: 'Name' },
			{ field: 'description', header: 'Description' },
			//{ field: 'legalEntityId', header: 'ID' },
			

		];
		
		console.log(this.gridData);
	}
	openDelete(content, row) {

		this.isEditMode = false;
		this.isDeleteMode = true;
		this.sourceAction = row;
		this.modal = this.modalService.open(content, { size: 'lg' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	
	
	deleteItemAndCloseModel() {
		this.isSaving = true;
		this.sourceAction.updatedBy = this.userName;
		this.workFlowtService.delete(this.sourceAction.managementStructureId).subscribe(data => {
			this.saveCompleted(this.sourceLegalEntity);
			this.loadManagementdata();
		})
		this.modal.close();
    }

    showViewData(viewContent, row) {

        this.managementViewData.code = row.code;
        this.managementViewData.name = row.name;
        this.managementViewData.description = row.description;
        this.modal = this.modalService.open(viewContent, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })    

    }

	makeNestedObj(arr, parent) {
		var out = []
		for (var i in arr) {
			if (arr[i].parentId == parent) {
				var children = this.makeNestedObj(arr, arr[i].managementStructureId)
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

	openContentEdit(content, row) {
		this.headerofMS = row.code;
		
		this.sourceLegalEntity = row;
		if (row.isLastChild == true) {
			this.sourceLegalEntity.isAssignable = true;
		}
		this.modal1 = this.modalService.open(content, { size: 'sm' });
		this.modal1.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	open(content) {
		this.headerofMS = "Add Root Entity";
		this.sourceLegalEntity = {};
		this.isEditMode = false;
		this.isDeleteMode = false;

		this.isSaving = true;
		this.loadMasterCompanies();
		//this.sourceLegalEntity = new ATAMain();
		this.sourceLegalEntity.isActive = true;
		this.entityName = "";
		this.modal = this.modalService.open(content, { size: 'sm' });
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
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = getCreditTermsList;

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
		
			if (!(this.sourceLegalEntity.code && this.sourceLegalEntity.name)) {
				this.display = true;
				this.modelValue = true;
			}
		
		//this.isSaving = true;
		if (this.sourceLegalEntity.code && this.sourceLegalEntity.name) {
			if (!this.sourceLegalEntity.managementStructureId) {
				this.sourceLegalEntity.createdBy = this.userName;
				this.sourceLegalEntity.updatedBy = this.userName;

				this.sourceLegalEntity.masterCompanyId = 1;
				this.workFlowtService.getmanagementPost(this.sourceLegalEntity).subscribe(data => {
					this.saveSuccessHelper(this.sourceLegalEntity);
					//this.selectedNode1.children.data = data;
					this.loadManagementdata();
				});
			}
			else {
				this.sourceLegalEntity.createdBy = this.userName;
				this.sourceLegalEntity.updatedBy = this.userName;
				this.sourceLegalEntity.masterCompanyId = 1;
				this.workFlowtService.updateManagementEntity(this.sourceLegalEntity).subscribe(
					data => {
						this.saveCompleted(this.sourceLegalEntity);
						this.loadManagementdata();
					})

			}
		}
		if (this.display == false) {

			this.dismissModel();
		}
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
		if (this.modal) { this.modal.close(); }
		if (this.modal1) { this.modal1.close(); }
		
	}
	onNodeExpand(event) {

		if (event.node.parent == null) {
			this.treeindex == 1;
			this.treeindex++;
			if (this.treeindex == 4) {
			this.showicon = true;
				alert(this.showicon);
			}
			
		}
	}
	openEdit(content, rowNode) {
		this.headerofMS = rowNode.node.data.code;
		this.selectedNode1 = rowNode.node;
		//this.isEditMode = true;
		this.sourceLegalEntity = {};
		this.isSaving = true;
		this.loadMasterCompanies();
		//this.sourceAction = row;
		this.sourceLegalEntity.parentId = rowNode.node.data.managementStructureId;
		
		//this.entityName = this.sourceLegalEntity.entityName;
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}
	openHist(content, row) {
		this.sourceLegalEntity = row;
	}
}