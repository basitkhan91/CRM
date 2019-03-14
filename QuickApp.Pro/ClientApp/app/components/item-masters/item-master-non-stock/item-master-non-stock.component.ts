import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { fadeInOut } from '../../../services/animations';
import { MasterCompany } from '../../../models/mastercompany.model';
import { AuditHistory } from '../../../models/audithistory.model';
import { AuthService } from '../../../services/auth.service';
import { MessageSeverity, AlertService } from '../../../services/alert.service';
import { ItemMasterService } from '../../../services/itemMaster.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { Router, NavigationExtras } from '@angular/router';
import { CustomerClassification } from '../../../models/customer-classification.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GMapModule } from 'primeng/gmap';
import { AddActionsDialogComponent } from '../../dialogs/add-actions-dialog/add-actions-dialog.component';
import { unescapeHtml } from '@angular/platform-browser/src/browser/transfer_state';
import { FileUploadModule } from 'primeng/fileupload';
import { Message } from 'primeng/components/common/message';
import { CustomerClassificationService } from '../../../services/CustomerClassification.service';
import { Integration } from '../../../models/integration.model';
import { IntegrationService } from '../../../services/integration-service';
import { DialogModule } from 'primeng/dialog';
import { timeInterval } from 'rxjs/operator/timeInterval';
import { BaseRowDef } from '@angular/cdk/table';
import { ItemClassificationService } from '../../../services/item-classfication.service';
import { ItemClassificationModel } from '../../../models/item-classification.model';
import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { Itemgroup } from '../../../models/item-group.model';
import { ItemGroupService } from '../../../services/item-group.service';
import { Provision } from '../../../models/provision.model';

import { ProvisionService } from '../../../services/provision.service';
import { ATAMain } from '../../../models/atamain.model';
import { AtaMainService } from '../../../services/atamain.service';
import { Priority } from '../../../models/priority.model';
import { PriorityService } from '../../../services/priority.service';
import { Currency } from '../../../models/currency.model';
import { CurrencyService } from '../../../services/currency.service';
import { UnitOfMeasureService } from '../../../services/unitofmeasure.service';
import { UnitOfMeasure } from '../../../models/unitofmeasure.model';

import { CalendarModule } from 'primeng/calendar';
import { ATAChapter } from '../../../models/atachapter.model';
@Component({
    selector: 'app-item-master-non-stock',
    templateUrl: './item-master-non-stock.component.html',
    styleUrls: ['./item-master-non-stock.component.scss']
})
/** item-master-non-stock component*/
export class ItemMasterNonStockComponent {
	modelValue: boolean = false;
	display: boolean = false;
	disableSaveglAccount: boolean;
	disableSaveItemClassficationCode: boolean;
	selectedItemCode: any;
	selectdescription: any;
	disableSaveItemGroup: boolean;
	selectedItemGroup: any;
	disableSaveManufacturer: boolean;
	public sourceActions: any = {};
	selectedManufacturer: any;
	disableSavePurchaseUOM: boolean;
	disableSavepartNumber: boolean;
	selectedPurchaseUOM: any;
	disableSaveCusName: boolean;
	disableSaveCusCode: boolean;
	selectedActionName: any;
    showLable: boolean;
    collectionofItemMaster: any;
    partCollection: any[];
	allPartnumbersInfo: any[];
	itemdescription: any[] = [];
	descriptionCollection: any[];
    partNumber: any;
	name: string;
	glAccountcla: any[];
	glAccountCollection: any[];
    localmanufacturer: any[];
    sourcemanufacturer: any = {};
    allManufacturerInfo: any[];
    itemclaColl: any[];
    localunit: any;
    sourceUOM: UnitOfMeasure;
    unitName: string;
	allUnitOfMeasureinfo: any[];
	allitemclassificationInfo: ItemClassificationModel[];
    localCollection: any[];
	itemClassificationCode: any; 
    purchaseUnitOfMeasureId: any;
    disabletypeSave: boolean;
    localNameCollection: any[];
    classnamecolle: any[]=[];
    localtypeCollection: any[];
    classificationtypecolle: any[]=[];
    disableClassdesc: boolean;
    className: string;
    itemTypeName: string;
    disableSavepartDescription: boolean;


    /** item-master-non-stock ctor */
    constructor(private router: Router, public unitService: UnitOfMeasureService, private authService: AuthService, private modalService: NgbModal, public itemser: ItemMasterService, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public ataMainSer: AtaMainService, public currency: CurrencyService, public priority: PriorityService, public inteService: IntegrationService, public workFlowtService: ItemClassificationService, public itemservice: ItemGroupService, public proService: ProvisionService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.sourceAction = new ItemClassificationModel();
        this.sourceItem = new Itemgroup();
        this.sourceprovision = new Provision();
        this.sourceatamain = new ATAMain();
        let selectedLink = 2;
        this.itemser.currentUrl = '/itemmastersmodule/itemmasterpages/app-item-master-non-stock';
        this.itemser.bredcrumbObj.next(this.itemser.currentUrl);//Bread Crumb
        //this.itemser.radioObj.next(selectedLink)
        if (this.itemser.listNonStockCollection && this.itemser.isEditMode == true) {


            this.showLable = true;
			this.sourceItemMaster = this.itemser.listNonStockCollection;
			if (this.itemser.listNonStockCollection.itemClassification) {
				this.itemClassificationCode = this.itemser.listNonStockCollection.itemClassification.description;
			}
			this.sourceItemMaster.priceDate = new Date(this.itemser.listNonStockCollection.priceDate);
			//if (this.itemser.listNonStockCollection.part) {
			//	this.sourceItemMaster.partNumber = this.itemser.listNonStockCollection.part.partNumber;
			//}
			//if (this.itemser.listNonStockCollection.part) {
			//	this.sourceItemMaster.partdescription = this.itemser.listNonStockCollection.part.description;
			//}
			this.sourceItemMaster.partdescription = this.itemser.listNonStockCollection.partDescription;

            this.sourceItemMaster.itemGroupId = this.itemser.listNonStockCollection.itemGroupId;
		 
			
			
        }
    }
	allglAccountInfo: any[];
    allCountryInfo: any[];
    allCurrencyInfo: any[];
    localpriority: any[];
    priorityName: string;
    sourceintegratn: Integration;
    integrationName: string;
    localintegration: any[];
    allIntegrationInfo: Integration[];
    localatamain: any[];
    ataChapterName: string;
    localprovision: any[] = [];
    localgroup: any[] = [];
    allProvisonInfo: Provision[] = [];
    itemGroupName: string;
    itemgroupservice: any;
    itemType: any;
    description: any;
    item_Name: any;
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    auditHisory: AuditHistory[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    cols: any[];
    selectedColumns: any[];
    displayedColumns = ['itemclassificationId', 'itemclassificationCode', 'description', 'memo'];
    //, 'Sequence', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'
    dataSource: MatTableDataSource<ItemClassificationModel>;


    allComapnies: MasterCompany[] = [];
    allitemgroupobjInfo: Itemgroup[] = [];
    private isSaving: boolean;
	public sourceAction: ItemClassificationModel;
	descriptionbyPart: any[] = [];
    public sourceItem: Itemgroup;
	public sourceprovision: Provision;
	allATAMaininfo: ATAChapter[] = [];
    allPriorityInfo: Priority[] = [];
    public sourcepriority: Priority;
    public sourceatamain: ATAMain;
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    selectedColumn: ItemClassificationModel[];
    title: string = "Create";
    id: number;
    errorMessage: any;
    Active: string = "Active";
    modal: NgbModalRef;
    itemName: string;
    filteredBrands: any[];

    sourceItemMaster: any = {};

    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;




    ngOnInit(): void {
        this.itemclass();
        this.itemgroup();
        this.provisiondata();
        this.atamaindata();
        this.integrationData();
        this.priorityData();
        this.CurrencyData();
        this.countryData();
        this.unitofmeasure();
        this.manufacturerdata();
		this.ptnumberlistdata();
		this.glAccountlistdata();
        this.cols = [
            //{ field: 'itemClassificationId', header: 'Item Classification ID' },

        ];
        this.selectedColumns = this.cols;
        this.itemser.currentUrl = '/itemmastersmodule/itemmasterpages/app-item-master-non-stock';
        this.itemser.bredcrumbObj.next(this.itemser.currentUrl);
        //this.sourceItemMaster.unitCost = "$";
        //this.sourceItemMaster.listPrice = "$";
        
    }




    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    public allWorkFlows: ItemClassificationModel[] = [];

    private itemclass() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    private countryData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemser.getCountrydata().subscribe(
            results => this.onDataLoadcountrySuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }


    private manufacturerdata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemser.getManufacturerList().subscribe(
            results => this.onmanufacturerSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onmanufacturerSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allManufacturerInfo = allWorkFlows;


        //console.log(this.allActions);


	}
	
	private glAccountlistdata() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		let value = "Non-stock";
		this.itemser.getItemStockList(value).subscribe(
			results => this.onglAccountSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	//private purchaseDiscountOffListPrice() {
	//	this.loadingIndicator = true;
	//}

	private onglAccountSuccessful(allWorkFlows: any[]) {

		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allglAccountInfo = allWorkFlows;


		//console.log(this.allActions);


	}
    private ptnumberlistdata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemser.getPrtnumberslistList().subscribe(
            results => this.onptnmbersSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onptnmbersSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allPartnumbersInfo = allWorkFlows;


        //console.log(this.allActions);


    }



    private onDataLoadcountrySuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allCountryInfo = allWorkFlows;
    }
    filterUnitOfMeasures(event) {

		this.localunit = [];
		if (this.allUnitOfMeasureinfo) {
			for (let i = 0; i < this.allUnitOfMeasureinfo.length; i++) {
				let unitName = this.allUnitOfMeasureinfo[i].description;
				if (unitName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.localunit.push(unitName);
				}
			}
		}
    }

    private CurrencyData() {
        // debugger;
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


    private priorityData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.priority.getPriorityList().subscribe(
            results => this.onprioritySuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private itemgroup() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemservice.getWorkFlows().subscribe(
            results => this.onDataitemSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }
    private onprioritySuccessful(getPriorityList: Priority[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        // this.dataSource.data = getPriorityList;
        this.allPriorityInfo = getPriorityList;
    }
    private atamaindata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.ataMainSer.getAtaMainList().subscribe(
            results => this.onSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

	private onSuccessful(getAtaMainList: ATAChapter[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = getAtaMainList;
        this.allATAMaininfo = getAtaMainList;
    }

    private integrationData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.inteService.getWorkFlows().subscribe(
            results => this.onDatainteSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

	}

	eventHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedActionName) {
				if (value == this.selectedActionName.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSaveCusCode = true;
					this.disableSaveCusName = true;
				}
				else {
					this.disableSaveCusCode = false;
					this.disableSaveCusName = false;
					this.sourceItemMaster.partdescription = "";
					this.disableSavepartDescription = false;
				}
			}

		}
	}

    private onDatainteSuccessful(allWorkFlows: Integration[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = allWorkFlows;
        this.allIntegrationInfo = allWorkFlows;
    }

    private provisiondata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.proService.getProvisionList().subscribe(
            results => this.onprodataSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onprodataSuccessful(getProvisionList: Provision[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSource.data = getProvisionList;
        this.allProvisonInfo = getProvisionList;
    }



	saveItemclass() {

		this.isSaving = true;

		if (this.isEditMode == false) {
			this.sourceAction.createdBy = this.userName;
			this.sourceAction.updatedBy = this.userName;
			this.sourceAction.itemClassificationCode = this.itemName;
			this.sourceAction.description = this.className;
			this.sourceAction.itemType = this.itemTypeName;
			this.sourceAction.masterCompanyId = 1;
			this.workFlowtService.newAction(this.sourceAction).subscribe(data => {
				this.itemclass();
				this.sourceAction.itemClassificationId = data.itemClassificationId;
				//this.itemName=this.itemName;
			})
                //role => this.saveSuccessHelper(role),
                //error => this.saveFailedHelper(error));
        }
	
        else {

            this.sourceAction.updatedBy = this.userName;
			this.sourceAction.itemClassificationCode = this.itemName;
			this.sourceAction.description = this.className;
			this.sourceAction.itemType = this.itemTypeName;
            this.sourceAction.masterCompanyId = 1;
            this.workFlowtService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
	}

	saveitemgroup() {

        this.isSaving = true;

        if (this.isEditMode == false) {
			this.sourceItem.createdBy = this.userName;
			this.sourceItem.updatedBy = this.userName;
			this.sourceItem.itemGroupCode = this.itemGroupName;
			this.sourceItem.masterCompanyId = 1;
			this.itemservice.newAction(this.sourceItem).subscribe(data => { this.itemgroup()})
        }
        else {

			this.sourceItem.updatedBy = this.userName;
			this.sourceItem.itemGroupCode = this.itemGroupName;
			this.sourceItem.masterCompanyId = 1;
			this.itemservice.updateAction(this.sourceItem).subscribe(
				response => this.saveCompleted(this.sourceItem),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }
    private onDataitemSuccessful(allWorkFlows: Itemgroup[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        // this.dataSource.data = allWorkFlows;
        this.allitemgroupobjInfo = allWorkFlows;
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
    private onDataLoadSuccessful(allWorkFlows: ItemClassificationModel[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allitemclassificationInfo = allWorkFlows;
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

    itemclassification(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;
		this.disabletypeSave = false;
		this.disableClassdesc = false;
		this.disableSaveItemClassficationCode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new ItemClassificationModel();
        this.sourceAction.isActive = true;
		this.itemName = "";
		this.className = "";
		this.itemTypeName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    priorty(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;

        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourcepriority = new Priority();
        this.sourceAction.isActive = true;
        this.priorityName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    atamai(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;

        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceatamain = new ATAMain();
        this.sourceAction.isActive = true;
        this.ataChapterName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    item(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;

        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceItem = new Itemgroup();
        this.sourceAction.isActive = true;
        this.itemGroupName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    provisionope(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;

        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceprovision = new Provision();
        this.sourceAction.isActive = true;

        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    integratn(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;

        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceintegratn = new Integration();
        this.sourceAction.isActive = true;
        this.integrationName = "";
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
		this.disabletypeSave = false;
		this.disableClassdesc = false;
		this.disableSaveItemClassficationCode = false;
        this.isEditMode = true;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = row;
		this.itemName = this.sourceAction.itemClassificationCode;
		this.className = this.sourceAction.description;
		this.itemTypeName = this.sourceAction.itemType;
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



        this.isSaving = true;

        this.workFlowtService.historyAcion(this.sourceAction.itemClassificationId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));


	}

	ItemHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedItemCode) {
				if (value == this.selectedItemCode.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSaveItemClassficationCode = true;

				}
				else {
					this.disableSaveItemClassficationCode = false;

				}
			}

		}
	}

	ItemClassficationCode(event) {
		//debugger;
		if (this.allitemclassificationInfo) {

			for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
				if (event == this.allitemclassificationInfo[i].itemClassificationCode) {
					this.sourceItemMaster.itemClassificationCode = this.allitemclassificationInfo[i].itemClassificationCode;
					this.disableSaveItemClassficationCode = true;

					this.selectedItemCode = event;
				}

			}
		}
	}
	partdescriptionId(event) {

		//debugger;

		if (this.itemclaColl) {

			for (let i = 0; i < this.itemclaColl.length; i++) {

				if (event == this.itemclaColl[i][0].description) {

					this.sourceItemMaster.description = this.itemclaColl[i][0].description;

					this.disableSavepartDescription = true;



					this.selectdescription = event;

				}

			}

		}

	}
	descriptionHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedActionName) {
				if (value == this.selectedActionName.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSavepartDescription = true;
				}
				else {
					this.disableSavepartDescription = false;
				}
			}
		}
	}
	filterdescription(event) {

		this.descriptionCollection = [];
		this.itemdescription = [];
		if (this.allPartnumbersInfo) {
			if (this.allPartnumbersInfo.length > 0) {

				for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
					let partDescription = this.allPartnumbersInfo[i].partDescription;
					if (partDescription) {
						//////if (description.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
						//////	this.itemclaColl.push([{
						//////	"partId": this.alldescriptionInfo[i].partId,
						//////	"description": description
						//////	}]),

						this.descriptionCollection.push(partDescription);
					}
				}
			}
		}
	}
	ItemGroupHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedItemGroup) {
				if (value == this.selectedItemGroup.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSaveItemGroup = true;

				}
				else {
					this.disableSaveItemGroup = false;

				}
			}

		}
	}

	itemGroupCode(event) {
		//debugger;
		if (this.allitemgroupobjInfo) {

			for (let i = 0; i < this.allitemgroupobjInfo.length; i++) {
				if (event == this.allitemgroupobjInfo[i].itemGroupCode) {
					this.sourceItemMaster.itemGroupCode = this.allitemgroupobjInfo[i].itemGroupCode;
					this.disableSaveItemGroup = true;

					this.selectedItemGroup = event;
				}

			}
		}
	}


	ManufacturerHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedManufacturer) {
				if (value == this.selectedManufacturer.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSaveManufacturer = true;

				}
				else {
					this.disableSaveManufacturer = false;

				}
			}

		}
	}

	Manufacturerdescription(event) {
		//debugger;
		if (this.allManufacturerInfo) {

			for (let i = 0; i < this.allManufacturerInfo.length; i++) {
				if (event == this.allManufacturerInfo[i].name) {
					this.sourcemanufacturer.name = this.allManufacturerInfo[i].name;
					this.disableSaveManufacturer = true;

					this.selectedManufacturer = event;
				}

			}
		}
	}

	

	glAccountHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedActionName) {
				if (value == this.selectedActionName.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSaveglAccount = true;

				}
				else {
					this.disableSaveglAccount = false;

				}
			}

		}
	}
	glAccountId(event) {
		//
		if (this.glAccountcla) {
			for (let i = 0; i < this.glAccountcla.length; i++) {
				if (event == this.glAccountcla[i][0].glAccountId) {
					this.sourceItemMaster.ItemMasterId = this.itemclaColl[i][0].ItemMasterId;
				}
			}
		}
	}

	filterglAccount(event) {

		this.glAccountCollection = [];
		this.glAccountcla = [];
		if (this.allglAccountInfo) {
			for (let i = 0; i < this.allglAccountInfo.length; i++) {
				let glAccountId = this.allglAccountInfo[i].glAccountId;

				if (glAccountId) {
					this.glAccountCollection.push(glAccountId);
				}
			}
		}
	}

	PurchaseUOMHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selectedPurchaseUOM) {
				if (value == this.selectedPurchaseUOM.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disableSavePurchaseUOM = true;

				}
				else {
					this.disableSavePurchaseUOM = false;

				}
			}

		}
	}

	PurchaseUOMdescription(event) {
		//debugger;
		if (this.allUnitOfMeasureinfo) {

			for (let i = 0; i < this.allUnitOfMeasureinfo.length; i++) {
				if (event == this.allUnitOfMeasureinfo[i].description) {
					this.sourcemanufacturer.description = this.allUnitOfMeasureinfo[i].description;
					this.disableSavePurchaseUOM = true;

					this.selectedPurchaseUOM = event;
				}

			}
		}
	}
    filterItems(event) {
       
        this.localCollection = [];
		this.itemclaColl = [];
		if (this.allitemclassificationInfo) {
			for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
				let itemName = this.allitemclassificationInfo[i].itemClassificationCode;
				if (itemName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.itemclaColl.push([{
						"itemClassificationId": this.allitemclassificationInfo[i].itemClassificationId,
						"itemName": itemName
					}]),

						this.localCollection.push(itemName);
				}
			}
		}
	}

	

    filterItemgroups(event) {

		this.localgroup = [];
		if (this.allitemclassificationInfo) {
			for (let i = 0; i < this.allitemgroupobjInfo.length; i++) {
				let itemGroupName = this.allitemgroupobjInfo[i].itemGroupCode;
				if (itemGroupName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.localgroup.push(itemGroupName);
				}
			}
        }
    }

    filterprovisions(event) {

		this.localprovision = [];
		if (this.allProvisonInfo) {
			for (let i = 0; i < this.allProvisonInfo.length; i++) {
				let provisionName = this.allProvisonInfo[i].description;
				if (provisionName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.localprovision.push(provisionName);
				}
			}
        }
    }

    filterpriorities(event) {

		this.localpriority = [];
		if (this.allPriorityInfo) {
			for (let i = 0; i < this.allPriorityInfo.length; i++) {
				let priorityName = this.allPriorityInfo[i].description;
				if (priorityName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.localpriority.push(priorityName);
				}
			}
        }
    }

    filterAtamains(event) {

		this.localatamain = [];
		if (this.allATAMaininfo) {
			for (let i = 0; i < this.allATAMaininfo.length; i++) {
				let ataChapterName = this.allATAMaininfo[i].ataChapterName;
				if (ataChapterName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.localatamain.push(ataChapterName);
				}
			}
        }
    }

    filterintegrations(event) {

		this.localintegration = [];
		if (this.allIntegrationInfo) {
			for (let i = 0; i < this.allIntegrationInfo.length; i++) {
				let integrationName = this.allIntegrationInfo[i].description;
				if (integrationName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.localintegration.push(integrationName);
				}
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
    private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {


        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.auditHisory = auditHistory;


        this.modal = this.modalService.open(content, { size: 'lg' });

        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })


    }
    private unitofmeasure() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.unitService.getUnitOfMeasureList().subscribe(
            results => this.onDataunitSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    private onDataunitSuccessful(getUnitOfMeasureList: any) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        // this.dataSource.data = getUnitOfMeasureList;
        this.allUnitOfMeasureinfo = getUnitOfMeasureList;
    }
    unitmeasure(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;

        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceUOM = new UnitOfMeasure();
        this.sourceUOM.isActive = true;
        this.unitName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    saveunitofmeasure() {

        // debugger;

        this.isSaving = true;

        if (this.isEditMode == false) {
			this.sourceUOM.createdBy = this.userName;
			this.sourceUOM.updatedBy = this.userName;
			this.sourceUOM.description = this.unitName;
			this.sourceUOM.masterCompanyId = 1;
            this.unitService.newUnitOfMeasure(this.sourceUOM).subscribe(data => { this.unitofmeasure() })

        }
        else {

			this.sourceUOM.updatedBy = this.userName;
			this.sourceUOM.description = this.unitName;
			this.sourceUOM.masterCompanyId = 1;
            this.unitService.updateUnitOfMeasure(this.sourceUOM).subscribe(
                response => this.saveCompleted(this.itemgroup),
                error => this.saveFailedHelper(error));
        }

         this.modal.close();
    }
    captureId(event) {
		//debugger;
		if (this.itemclaColl) {
			for (let i = 0; i < this.itemclaColl.length; i++) {
				if (event == this.itemclaColl[i][0].itemName) {
					this.sourceItemMaster.itemClassificationId = this.itemclaColl[i][0].itemClassificationId;
				}
			}
        }
    }
    editItemAndCloseModel() {

		if (!(this.sourceItemMaster.partNumber && this.sourceItemMaster.partdescription && this.sourceItemMaster.itemClassificationId && this.sourceItemMaster.purchaseUnitOfMeasureId && this.sourceItemMaster.glAccountId)) {
			this.display = true;
			this.modelValue = true;
		}
		if ((this.sourceItemMaster.partNumber && this.sourceItemMaster.partdescription && this.sourceItemMaster.itemClassificationId && this.sourceItemMaster.purchaseUnitOfMeasureId && this.sourceItemMaster.glAccountId)) {

			this.isSaving = true;

			if (!this.sourceItemMaster.itemMasterId) {


				this.sourceItemMaster.isActive = true;
				this.sourceItemMaster.createdBy = this.userName;
				this.sourceItemMaster.updatedBy = this.userName;
				this.sourceItemMaster.itemClassificationCode = this.itemName;
				this.sourceItemMaster.masterCompanyId = 1;
				this.sourceItemMaster.itemTypeId = 2;
				this.itemser.newItemMaster(this.sourceItemMaster).subscribe(data => {
					this.collectionofItemMaster = data;
					this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-list')

					this.itemser.listStock = false;
					this.itemser.listNonstock = true;
					this.itemser.listEquipment = false;
					this.savesuccessCompleted(this.sourceItemMaster);

				})
			}
			else {

				this.sourceItemMaster.updatedBy = this.userName;
				this.sourceItemMaster.itemClassificationCode = this.itemName;
				this.sourceItemMaster.masterCompanyId = 1;
				this.itemser.updateNonStockItemMaster(this.sourceItemMaster).subscribe(
					response => this.saveCompleted(this.sourceItemMaster),
					error => this.saveFailedHelper(error));
			}
		}
        //this.modal.close();
		this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-list')
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.workFlowtService.deleteAcion(this.sourceAction.itemClassificationId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
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

        this.itemclass();
    }


    openView(content, row) {

        this.sourceAction = row;
        this.item_Name = row.itemClassificationCode;
        this.description = row.description;
        this.itemType = row.itemType;
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

    private saveSuccessHelper(role?: ItemClassificationModel) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

        this.itemclass();

	}

	private savesuccessCompleted(user?: any) {
		this.isSaving = false;


		this.alertService.showMessage("Success", `Action was saved successfully`, MessageSeverity.success);



		this.itemclass();
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
    // Temporery Item Master Radiuo Route
   public stock() {
        this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-stock');
    }

    public nonStock() {
		this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-non-stock');
		//this.savesuccessCompleted(this.sourceItemMaster);

    }
    public equipment() {
        this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-equipment');
    }
    public exchange() {
        this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-exchange');
    }
    public loan() {
        this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-loan');
    }

    saveManufacturer() {

        //debugger;
		this.isSaving = true;
		if (this.isEditMode == false) {
			this.sourcemanufacturer.masterCompanyId = 1;
			this.sourceAction.updatedBy = this.userName;
			this.sourceAction.description = this.integrationName;
			this.sourceAction.masterCompanyId = 1;
			this.itemser.savemanufacutrer(this.sourcemanufacturer).subscribe(data => { this.manufacturerdata() })

		}
		else {

			this.sourceAction.updatedBy = this.userName;
			this.sourceAction.description = this.integrationName;
			this.inteService.updateAction(this.sourcemanufacturer).subscribe(
				response => this.saveCompleted(this.sourceAction),
				error => this.saveFailedHelper(error));
		}

		this.modal.close();
	}

        //this.isSaving = true;
        //this.sourcemanufacturer.masterCompanyId = 1;
        //this.itemser.savemanufacutrer(this.sourcemanufacturer).subscribe(
        //    role => this.saveSuccessHelper(role),
        //    error => this.saveFailedHelper(error));


	
    filtermanufacturer(event) {

        this.localmanufacturer = [];
        for (let i = 0; i < this.allManufacturerInfo.length; i++) {
            let name = this.allManufacturerInfo[i].name;
            if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.localmanufacturer.push(name);
            }
        }
    }
    Mfacturer(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;

        this.isSaving = true;
        this.loadMasterCompanies();
        //this.sourceAction = new UnitOfMeasure();
        this.sourceAction.isActive = true;
        this.name = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
	}

	getSelectedValue(selectedvalue) {
		var test = selectedvalue;
		var test1 = +test;
		this.sourceItemMaster.discountPurchasePercent = test1;
		//alert(this.sourceItemMaster.discountPurchasePercent);
	}

    partnmId(event) {
        //debugger;
        for (let i = 0; i < this.itemclaColl.length; i++) {
            if (event == this.itemclaColl[i][0].partName) {
				this.sourceItemMaster.partId = this.itemclaColl[i][0].partId;
				this.disableSaveCusName = true;
			
				this.selectedActionName = event;
            }
		}
		this.itemser.getDescriptionbypart(event).subscribe(
			results => this.onpartnumberloadsuccessfull(results[0]),
			error => this.onDataLoadFailed(error)
		);
		this.disableSavepartDescription = true;
	}
	private onpartnumberloadsuccessfull(allWorkFlows: any[]) {


		this.descriptionbyPart = allWorkFlows[0]
		this.sourceActions = this.descriptionbyPart;
		this.sourceItemMaster.partdescription = allWorkFlows[0].partDescription;


	}

    filterpartItems(event) {

        this.partCollection = [];
		this.itemclaColl = [];
		if (this.allPartnumbersInfo) {
			for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
				let partName = this.allPartnumbersInfo[i].partNumber;
				if (partName) {
					if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
						this.itemclaColl.push([{
							"partId": this.allPartnumbersInfo[i].partId,
							"partName": partName
						}]),

							this.partCollection.push(partName);
					}
				}
			}
        }
	}
	classificationId(event) {
		//debugger;
		if (this.allitemclassificationInfo) {
			for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
				if (event == this.allitemclassificationInfo[i].description) {
					//alert("Action Name already Exists");
					this.disableClassdesc = true;
					this.selectedActionName = event;
				}
			}
		}
	}
	classificationtypeId(event) {
		//debugger;
		if (this.allitemclassificationInfo) {
			for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
				if (event == this.allitemclassificationInfo[i].itemType) {
					this.disabletypeSave = true;
					this.selectedActionName = event;
				}
			}
		}
	}

	filterItemNames(event) {

		this.localNameCollection = [];
		if (this.allitemclassificationInfo) {
			for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
				let className = this.allitemclassificationInfo[i].description;
				if (className.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.classnamecolle.push([{
						"itemClassificationId": this.allitemclassificationInfo[i].itemClassificationId,
						"className": className
					}]),
						this.localNameCollection.push(className);
				}
			}
		}
	}
	filterItemtypes(event) {

		this.localtypeCollection = [];
		if (this.allitemclassificationInfo) {
			for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
				let itemTypeName = this.allitemclassificationInfo[i].itemType;
				if (itemTypeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.classificationtypecolle.push([{
						"itemClassificationId": this.allitemclassificationInfo[i].itemClassificationId,
						"itemTypeName": itemTypeName
					}]),
						this.localtypeCollection.push(itemTypeName);
				}
			}
		}
	}
	classeventHandler(event) {
		let value = event.target.value.toLowerCase();
		if (this.selectedActionName) {
			if (value == this.selectedActionName.toLowerCase()) {
				//alert("Action Name already Exists");
				this.disableClassdesc = true;
			}
			else {
				this.disableClassdesc = false;
			}
		}

	}
	classeventtypeHandler(event) {
		let value = event.target.value.toLowerCase();
		if (this.selectedActionName) {
			if (value == this.selectedActionName.toLowerCase()) {
				//alert("Action Name already Exists");
				this.disabletypeSave = true;
			}
			else {
				this.disabletypeSave = false;
			}
		}

	}


}


   
