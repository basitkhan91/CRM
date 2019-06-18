import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TableModule } from 'primeng/table';
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
import { FileUploadModule } from 'primeng/fileupload';//
import { Message } from 'primeng/components/common/message';
import { CustomerClassificationService } from '../../../services/CustomerClassification.service';
import { Integration } from '../../../models/integration.model';
import { IntegrationService } from '../../../services/integration-service';
import { DialogModule } from 'primeng/dialog';
import { timeInterval } from 'rxjs/operator/timeInterval';
import { BaseRowDef } from '@angular/cdk/table';
import { ItemClassificationService } from '../../../services/item-classfication.service';
import { ItemClassificationModel } from '../../../models/item-classification.model';
import { OnInit, AfterViewInit, Component, ViewChild, ChangeDetectorRef } from '@angular/core';
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
import { indexDebugNode } from '@angular/core/src/debug/debug_node';
import { AjaxError } from 'rxjs';
import { LegalEntityService } from '../../../services/legalentity.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ATAChapter } from '../../../models/atachapter.model';
import { FormArray } from '@angular/forms';
import { ItemMasterCapabilitiesModel } from '../../../models/itemMasterCapabilities.model';
import { GlAccountService } from '../../../services/glAccount/glAccount.service';
import { GlAccount } from '../../../models/GlAccount.model';
import { VendorService } from '../../../services/vendor.service';


@Component({
    selector: 'app-item-master-stock',
    templateUrl: './item-master-stock.component.html',
    styleUrls: ['./item-master-stock.component.scss']
})

/** item-master-stock component*/
export class ItemMasterStockComponent implements OnInit, AfterViewInit {

    disableIntegrationSave: boolean;
    currencySymbol: any;
    bulist: any[] = [];
    bulistovh: any[] = [];
    departmentList: any[] = [];
    departmentListovh: any[] = [];
    divisionlist: any[] = [];
    divisionlistovh: any[] = [];
    maincompanylist: any[] = [];
    allManagemtninfo: any[] = [];
    selectdescription: any;
    itemdescription: any[] = [];
    showexportData: boolean;
    showGeneralData: boolean = true;
    showpurchaseData: boolean;
    disableSaveglAccount: boolean;
    glAccountCollection: any[];
    enablePopupData: boolean = false;
    display: boolean = false;
    modelValue: boolean = false;
    allCapesData: any[] = [];
    enablePlus: boolean = false;
    allAircraftsGet: any[] = [];
    manfacturerAircraftmodelsarray: any[] = [];
    overhaulAircraftmodelsarray: any[] = [];
    distributionAircraftmodelsarray: any[] = [];
    repairAircraftmodelsarray: any[] = [];
    certificationarrayAircraftmodelsarray: any[] = [];
    exchangeAircraftmodelsarray: any[] = [];
    capesCollection: any[] = [];
    selectedModels: any[] = [];
    sourceUOM: UnitOfMeasure;
    disableSavepartNumber: boolean;
    disableSaveItemClassficationCode: boolean;
    disableSaveItemGroup: boolean;
    selectedItemGroup: any;
    disableSavePurchaseUOM: boolean;
    selectedPurchaseUOM: any;
    disableSaveProvision: boolean;
    selectedProvision: any;
    disableSaveManufacturer: boolean;
    selectedManufacturer: any;
    disableSaveATAChapter: boolean;
    selectedATAChapter: any;
    disableSavePriority: boolean;
    selectedPriority: any;
    disableSaveStockUOM: boolean;
    selectedStockUOM: any;
    disableSaveConsume: boolean;
    selectedConsume: any;
    disableSaveSOLD: boolean;
    selectedSOLD: any;
    disableSaveIntegration: boolean;
    selectedIntegration: any;
    selectedItemCode: any;
    descriptionCollection: any[];
    selectedActionName: any;
    showLable: boolean;
    markUpListPriceAfterDiskValue: boolean;
    markupListPriceValue: boolean = true;
    calculateUsingPurchasePrice: any;
    fixedSalesPriceValue: boolean = true;
    collectionofItemMaster: any;
    value: number;
    partCollection: any[];
    allPartnumbersInfo: any[];
    name: string;
    allglAccountInfo: any[];
    glAccountcla: any[];
    localmanufacturer: any[];
    sourcemanufacturer: any = {};
    allManufacturerInfo: any[];
    allActions: any[];
    provisionName: string;
    shiftValues: any[] = [];
    allaircraftInfo: any[];
    allAircraftinfo: any[];
    selectedAircraftTypes: any;
    allWarninginfo: any[];
    localunit: any[];
    unitName: string;
    none: any;
    allCountryInfo: any[];
    allCurrencyInfo: any[];
    localpriority: any[];
    priorityName: string;
    itemclaColl: any[];
    integrationName: string;
    localintegration: any[];
    allIntegrationInfo: Integration[];
    localatamain: any[];
    ataChapterName: string;
    localprovision: any[] = [];
    localgroup: any[] = [];
    allProvisonInfo: Provision[];
    itemGroupName: string;
    partNumber: any;
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
    localNameCollection: any[] = [];
    localtypeCollection: any[] = [];
    selectedAircraftDataModels: any[] = [];
    Weight: any;
    classnamecolle: any[] = [];
    classificationtypecolle: any[] = [];
    displayedColumns = ['itemclassificationId', 'itemclassificationCode', 'description', 'memo'];
    dataSource: MatTableDataSource<ItemClassificationModel>;
    allitemclassificationInfo: ItemClassificationModel[];
    allComapnies: MasterCompany[] = [];
    allitemgroupobjInfo: Itemgroup[];
    private isSaving: boolean;
    public sourceAction: any = {};
    public sourceActions: any = {};
    allATAMaininfo: ATAChapter[];
    allPriorityInfo: Priority[];
    allUnitOfMeasureinfo: any[];
    allPurchaseUnitOfMeasureinfo: any[];
    allStockUnitOfMeasureinfo: any[];
    allConsumeUnitOfMeasureinfo: any[];
    allSOLDUnitOfMeasureinfo: any[];
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    selectedColumn: ItemClassificationModel[];
    data: boolean;
    title: string = "Create";
    id: number;
    errorMessage: any;
    Active: string = "Active";
    modal: NgbModalRef;
    itemName: string;
    className: any;
    itemTypeName: any;
    filteredBrands: any[];
    localCollection: any[] = [];
    sourceItemMaster: any = {};
    isEnabeCapes: boolean = false;
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    purchaseData: boolean = false;
    exportData: boolean = false;
    showInput: boolean;
    activeIndex: number;
    descriptionbyPart: any[] = [];
    allintegrationdetails: any;
    integrationvalues: any[] = [];
    disableClassdesc: boolean;
    disabletypeSave: boolean;
    disableSavepartDescription: boolean;
    allAircraftManufacturer: any[] = [];
    allCurrentItemMasterModels: any[] = [];
    completeAircraftModelData: any[] = [];
    currentItemMasterModels: any[] = [];
    selectedIntegrationTypes: any[];
    selectedPartId: any;
    manufacturerData: any[] = [];
    capabilitiesForm: FormGroup;
    sourceItemMasterCap: any = {};
    completeAircraftManfacturerData: any[];
    ItemMasterId: number = 0;
    isSaveCapes: boolean;
    allATAMaininfo1: ATAMain[];
    capabilityEditCollection: any;
    allGlInfo: GlAccount[];
    allSubChapter: ATAChapter[];
    disableSaveNHANumber: boolean;
    disableSaveAlterumber: boolean;
    portalURL: any = "";
    public sourceIntegration: any = {};
    integrationNamecolle: any[] = [];


    constructor(public integrationService: IntegrationService, private formBuilder: FormBuilder, public workFlowtService1: LegalEntityService, private changeDetectorRef: ChangeDetectorRef, private router: Router,
        private authService: AuthService, public unitService: UnitOfMeasureService, private modalService: NgbModal, private glAccountService: GlAccountService, public vendorser: VendorService,
        public itemser: ItemMasterService, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public ataMainSer: AtaMainService,
        public currency: CurrencyService, public priority: PriorityService, public inteService: IntegrationService, public workFlowtService: ItemClassificationService, public itemservice: ItemGroupService, public proService: ProvisionService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.itemser.currentUrl = '/itemmastersmodule/itemmasterpages/app-item-master-stock';
        this.itemser.bredcrumbObj.next(this.itemser.currentUrl);//Bread Crumb
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.CurrencyData();
        if (this.itemser.listCollection != null && this.itemser.isEditMode == true) {

            this.showLable = true;
            this.sourceItemMaster = this.itemser.listCollection;
            this.sourceItemMaster.itemMasterId = this.itemser.listCollection.itemMasterId;
            this.sourceItemMaster.partdescription = this.itemser.listCollection.partDescription;
            this.sourceItemMaster.isHazardousMaterial = this.itemser.listCollection.isHazardousMaterial;

            if (this.sourceItemMaster.ataChapterId) {
                this.getATASubChapterData(this.sourceItemMaster.ataChapterId);
            }

            this.sourceItemMaster.expirationDate = this.itemser.listCollection.expirationDate;
            if (this.sourceItemMaster.manufacturer) {
                this.sourceItemMaster.manufacturerId = this.itemser.listCollection.manufacturer.manufacturerId;
            }
            if (this.sourceItemMaster.salesMarkUpOnPurchaseListPriceActive == true) {

                this.markupListPrice();
            }
            else {
                this.markUpListPriceAfterDisk();
            }

            if (this.sourceItemMaster.salesIsFixedPrice == true) {
                this.onFixedSalesPrice()
            }
            else { this.onCalculatedUsingPurchasePrice() }
            if (this.sourceItemMaster.purchaseLastListPriceDate == "0001-01-01T00:00:00" || this.sourceItemMaster.purchaseLastListPriceDate == undefined || this.sourceItemMaster.purchaseLastListPriceDate == "undefined") {
                this.sourceItemMaster.purchaseLastListPriceDate = new Date();
            }
            else {
                this.sourceItemMaster.purchaseLastListPriceDate = new Date(this.sourceItemMaster.purchaseLastListPriceDate);
            }
            if (this.sourceItemMaster.purchaseLastDiscountPercentDate == "0001-01-01T00:00:00" || this.sourceItemMaster.purchaseLastDiscountPercentDate == undefined || this.sourceItemMaster.purchaseLastDiscountPercentDate == "undefined") {
                this.sourceItemMaster.purchaseLastDiscountPercentDate = new Date();
            }
            else {
                this.sourceItemMaster.purchaseLastDiscountPercentDate = new Date(this.sourceItemMaster.purchaseLastDiscountPercentDate);
            }
            if (this.sourceItemMaster.purchaseLastListPriceAfterDiscountDate == "0001-01-01T00:00:00" || this.sourceItemMaster.purchaseLastListPriceAfterDiscountDate == undefined || this.sourceItemMaster.purchaseLastListPriceAfterDiscountDate == "undefined") {
                this.sourceItemMaster.purchaseLastListPriceAfterDiscountDate = new Date();
            }
            else {
                this.sourceItemMaster.purchaseLastListPriceAfterDiscountDate = new Date(this.sourceItemMaster.purchaseLastListPriceAfterDiscountDate);
            }
            if (this.sourceItemMaster.salesLastMarkUpPercentOnListPriceDate == "0001-01-01T00:00:00" || this.sourceItemMaster.salesLastMarkUpPercentOnListPriceDate == undefined || this.sourceItemMaster.salesLastMarkUpPercentOnListPriceDate == "undefined") {
                this.sourceItemMaster.salesLastMarkUpPercentOnListPriceDate = new Date();
            }
            else {
                this.sourceItemMaster.salesLastMarkUpPercentOnListPriceDate = new Date(this.sourceItemMaster.salesLastMarkUpPercentOnListPriceDate);
            }
            if (this.sourceItemMaster.salesLastMakUpPercentOnListPriceAfterDiscDate == "0001-01-01T00:00:00" || this.sourceItemMaster.salesLastMakUpPercentOnListPriceAfterDiscDate == undefined || this.sourceItemMaster.salesLastMakUpPercentOnListPriceAfterDiscDate == "undefined") {
                this.sourceItemMaster.salesLastMakUpPercentOnListPriceAfterDiscDate = new Date();
            }
            else {
                this.sourceItemMaster.salesLastMakUpPercentOnListPriceAfterDiscDate = new Date(this.sourceItemMaster.salesLastMakUpPercentOnListPriceAfterDiscDate);
            }
            if (this.sourceItemMaster.salesLastBaselineSalesPriceDate == "0001-01-01T00:00:00" || this.sourceItemMaster.salesLastBaselineSalesPriceDate == undefined || this.sourceItemMaster.salesLastBaselineSalesPriceDate == "undefined") {
                this.sourceItemMaster.salesLastBaselineSalesPriceDate = new Date();
            }
            else {
                this.sourceItemMaster.salesLastBaselineSalesPriceDate = new Date(this.sourceItemMaster.salesLastBaselineSalesPriceDate);
            }
            if (this.sourceItemMaster.salesLastSalesDiscountPercentDate == "0001-01-01T00:00:00") {
                this.sourceItemMaster.salesLastSalesDiscountPercentDate = new Date();
            }
            else {
                this.sourceItemMaster.salesLastSalesDiscountPercentDate = new Date(this.sourceItemMaster.salesLastSalesDiscountPercentDate);
            }
            if (this.sourceItemMaster.expirationDate == "0001-01-01T00:00:00" || this.sourceItemMaster.expirationDate == undefined || this.sourceItemMaster.expirationDate == "undefined") {
                this.sourceItemMaster.expirationDate = new Date();
            }
            else {
                this.sourceItemMaster.expirationDate = new Date(this.sourceItemMaster.expirationDate);
            }
            if (this.sourceItemMaster.expirationDate == "0001-01-01T00:00:00" || this.sourceItemMaster.expirationDate == undefined || this.sourceItemMaster.expirationDate == "undefined") {
                this.sourceItemMaster.expirationDate = new Date();
            }
            else {
                this.sourceItemMaster.expirationDate = new Date(this.sourceItemMaster.expirationDate);
            }
            if (this.sourceItemMaster.salesLastSalePriceDate == "0001-01-01T00:00:00" || this.sourceItemMaster.salesLastSalePriceDate == undefined || this.sourceItemMaster.salesLastSalePriceDate == "undefined") {
                this.sourceItemMaster.salesLastSalePriceDate = new Date();
                //this.sourceItemMaster.salesLastSalePriceDate = Date.now();
                //this.sourceItemMaster.salesLastSalePriceDate.setValue(new Date().toISOString());
            }
            else {
                this.sourceItemMaster.salesLastSalePriceDate = new Date(this.sourceItemMaster.salesLastSalePriceDate);
            }

        }

    }

    //setting the values for capability //
    capabilityTypeData: any = [{
        CapabilityTypeId: 1, Description: 'Manufacturing', formArrayName: 'mfgForm', selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: []
    },
    {
        CapabilityTypeId: 2, Description: 'Overhaul', formArrayName: 'overhaulForm', selectedAircraftDataModels: []
        , selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: []
    },
    {
        CapabilityTypeId: 3, Description: 'Distribution', formArrayName: 'distributionForm', selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: []
    },
    {
        CapabilityTypeId: 4, Description: 'Certification', formArrayName: 'certificationForm', selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: []
    },
    {
        CapabilityTypeId: 5, Description: 'Repair', formArrayName: 'repairForm', selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: []
    },
    {
        CapabilityTypeId: 6, Description: 'Exchange', formArrayName: 'exchangeForm', selectedAircraftDataModels: [],
        selectedAircraftModelTypes: [], selectedAircraftTypes: [], selectedManufacturer: [], selectedModel: []
    }];


    ngOnInit(): void {
        this.loadManagementdata();
        this.manufacturerdata();
        this.aircraftManfacturerData();
        this.itemclass();
        this.itemgroup();
        this.provisiondata();
        this.atamaindata();
        this.integrationData();
        this.priorityData();
        this.CurrencyData();
        this.countryData();
        this.unitofmeasure();
        this.Purchaseunitofmeasure();
        this.Stockunitofmeasure();
        this.Consumeunitofmeasure();
        this.SOLDunitofmeasure();
        this.warningdata();
        this.aircraftmodelData();
        this.loadData();
        this.glList();
        this.ptnumberlistdata();
        this.glAccountlistdata();
        this.getAircraftModelsData();
        this.getCpaesData();
        this.activeIndex = 0;
        this.Integration();
        this.sourceItemMaster.salesIsFixedPrice = true;
        this.capabilitiesForm = this.formBuilder.group({
            mfgForm: this.formBuilder.array([]),
            overhaulForm: this.formBuilder.array([]),
            distributionForm: this.formBuilder.array([]),
            certificationForm: this.formBuilder.array([]),
            repairForm: this.formBuilder.array([]),
            exchangeForm: this.formBuilder.array([])
        });
    }


    // Form array for capability//
    get mfgFormArray(): FormArray {
        return this.capabilitiesForm.get('mfgForm') as FormArray;
    }

    get overhaulFormArray(): FormArray {
        return this.capabilitiesForm.get('overhaulForm') as FormArray;
    }


    get distributionFormArray(): FormArray {
        return this.capabilitiesForm.get('distributionForm') as FormArray;
    }

    get certificationFormArray(): FormArray {
        return this.capabilitiesForm.get('certificationForm') as FormArray;
    }

    get repairFormArray(): FormArray {
        return this.capabilitiesForm.get('repairForm') as FormArray;
    }

    get exchangeFormArray(): FormArray {
        return this.capabilitiesForm.get('exchangeForm') as FormArray;
    }

    //loading aircraftmanufacturer data//
    private aircraftManfacturerData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemser.getAircraft().subscribe(
            results => this.onDataLoadaircraftManfacturerSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onDataLoadaircraftManfacturerSuccessful(allWorkFlows: any[]) //While loading
    {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allaircraftInfo = allWorkFlows; //Complete Aircraft Data
        this.completeAircraftManfacturerData = allWorkFlows;

        if (this.allaircraftInfo) {
            if (this.allaircraftInfo.length > 0) {
                for (let i = 0; i < this.allaircraftInfo.length; i++)
                    this.manufacturerData.push(
                        { value: this.allaircraftInfo[i].aircraftTypeId, label: this.allaircraftInfo[i].description },

                    );
            }

        }
    }

    // Temporery Item Master Radio Route

    markupListPrice() {
        this.markupListPriceValue = true;
        this.markUpListPriceAfterDiskValue = false;
    }

    ViewFunction() {

        alert("functionality not yet implemented");
    }

    //loading aircraftmodels data//
    getAircraftModelsData(): any {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemser.getAircaftList(this.sourceItemMaster.itemMasterId).subscribe(
            results => this.onAircarftmodelloadsuccessfull(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }


    private onAircarftmodelloadsuccessfull(allWorkFlows: any[]) {
        for (let i = 0; i < allWorkFlows.length; i++) {
            allWorkFlows[i].checkbox = true;
        }
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.allAircraftsGet = allWorkFlows;
        this.currentItemMasterModels = allWorkFlows;//All Models Data which has for Current Item Master Id
        this.allCurrentItemMasterModels = allWorkFlows;
        if (this.allAircraftsGet.length > 0) {
            this.enablePlus = true;
            this.allAircraftinfo = JSON.parse(JSON.stringify(this.allAircraftsGet));
            this.isDeleteMode = false;
            this.isEditMode = false;
            this.isEnabeCapes = true;

        }
    }

    //loading capability data//
    getCpaesData(): any {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemser.getCpaesData(this.sourceItemMaster.itemMasterId).subscribe(
            results => this.OnCapesLoadSuccessfull(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    alterPnHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {
                    this.disableSaveAlterumber = false;
                }
                else {
                    this.disableSaveAlterumber = true;
                }
            }

        }
    }


    onAlterPnSelect(event) {
        if (this.itemclaColl) {
            for (let i = 0; i < this.itemclaColl.length; i++) {
                if (event == this.itemclaColl[i][0].partName) {
                    this.sourceItemMaster.partId = this.itemclaColl[i][0].partId;
                    this.disableSaveAlterumber = false;
                    this.selectedActionName = event;
                }
            }
        }
    }



    private OnCapesLoadSuccessfull(allWorkFlows: any[]) {
        this.manfacturerAircraftmodelsarray = [];
        this.distributionAircraftmodelsarray = [];
        this.overhaulAircraftmodelsarray = [];
        this.certificationarrayAircraftmodelsarray = [];
        this.repairAircraftmodelsarray = [];
        this.exchangeAircraftmodelsarray = [];
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.allCapesData = allWorkFlows;
        if (this.allCapesData) {
            for (let i = 0; i < this.allCapesData.length; i++) {
                if (this.allCapesData[i].capabilityTypeId == 1) {
                    this.manfacturerAircraftmodelsarray.push(JSON.parse(JSON.stringify(this.allCapesData[i])));

                }

                else if (this.allCapesData[i].capabilityTypeId == 2) {
                    this.getBUListovh(this.allCapesData[i], this.allCapesData[i].masterComapnyId1);
                    this.getDepartmentlistovh(this.allCapesData[i], this.allCapesData[i].buid1);
                    this.getDivisionlistovh(this.allCapesData[i], this.allCapesData[i].depid1);
                    this.overhaulAircraftmodelsarray.push(JSON.parse(JSON.stringify(this.allCapesData[i])));

                }
                else if (this.allCapesData[i].capabilityTypeId == 3) {
                    this.getBUListDistribution(this.allCapesData[i], this.allCapesData[i].masterComapnyId1);
                    this.getDepartmentlistdistribution(this.allCapesData[i], this.allCapesData[i].buid1);
                    this.getDivisionlistdistrubution(this.allCapesData[i], this.allCapesData[i].depid1);
                    this.distributionAircraftmodelsarray.push(JSON.parse(JSON.stringify(this.allCapesData[i])));

                }
                else if (this.allCapesData[i].capabilityTypeId == 4) {
                    this.getBUListcertificate(this.allCapesData[i], this.allCapesData[i].masterComapnyId1);
                    this.getDepartmentlistcertificate(this.allCapesData[i], this.allCapesData[i].buid1);
                    this.getDivisionlistcertificate(this.allCapesData[i], this.allCapesData[i].depid1);
                    this.certificationarrayAircraftmodelsarray.push(JSON.parse(JSON.stringify(this.allCapesData[i])));

                }
                else if (this.allCapesData[i].capabilityTypeId == 5) {
                    this.getBUListrepair(this.allCapesData[i], this.allCapesData[i].masterComapnyId1);
                    this.getDepartmentlistrepair(this.allCapesData[i], this.allCapesData[i].buid1);
                    this.getDivisionlistrepair(this.allCapesData[i], this.allCapesData[i].depid1);
                    this.repairAircraftmodelsarray.push(JSON.parse(JSON.stringify(this.allCapesData[i])));

                }
                else if (this.allCapesData[i].capabilityTypeId == 6) {
                    this.getBUListexcahnge(this.allCapesData[i], this.allCapesData[i].masterComapnyId1);
                    this.getDepartmentlistexcahnge(this.allCapesData[i], this.allCapesData[i].buid1);
                    this.getDivisionlistexcahnge(this.allCapesData[i], this.allCapesData[i].depid1);
                    this.exchangeAircraftmodelsarray.push(JSON.parse(JSON.stringify(this.allCapesData[i])));

                }

            }
        }

    }


    markUpListPriceAfterDisk() {
        this.markupListPriceValue = false;
        this.markUpListPriceAfterDiskValue = true;
    }

    onChange(deviceValue) {
        alert(deviceValue);
        this.sourceItemMaster.ataMainId = deviceValue;
    }

    onFixedSalesPrice() {
        this.sourceItemMaster.salesIsFixedPrice = true;
        this.fixedSalesPriceValue = true;
        this.calculateUsingPurchasePrice = false;
    }

    onCalculatedUsingPurchasePrice() {
        this.fixedSalesPriceValue = false;
        this.calculateUsingPurchasePrice = true;
    }

    stock() {
        this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-stock');
    }

    nonStock() {
        this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-non-stock');
    }
    equipment() {
        this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-equipment');
    }
    exchange() {
        this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-exchange');
    }
    loan() {
        this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-loan');
    }


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public allWorkFlows: any[] = [];

    //loading itemClassification data//
    private itemclass() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }


    private onDataLoadSuccessful(allWorkFlows: ItemClassificationModel[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allitemclassificationInfo = allWorkFlows;
    }

    //loading GlAccount from generalLedger//
    private glList() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.glAccountService.getAll().subscribe(
            results => this.onGlAccountLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onGlAccountLoad(getGlList: GlAccount[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allGlInfo = getGlList;
    }

    //getting ItemMaster//
    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemser.getItemMasterList().subscribe(
            results => this.onitemmasterSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }


    private onitemmasterSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allActions = allWorkFlows;
    }

    //loading manufacturer data from Singlescreen//
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

        this.allManufacturerInfo = allWorkFlows;
    }

    aircraftModalChange(event, capData) {
        let selectedData = event.value;
        capData.selectedModel = [];
        selectedData.forEach(element1 => {
            capData.selectedAircraftDataModels.forEach(element2 => {
                if (element1 == element2.value) {
                    capData.selectedModel.push(element2);
                }
            })
        })
    }


    cunstructCapabilities(content) {
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {

            console.log('When user closes');
        }, () => { console.log('Backdrop click') })

        if (this.itemser.capsCollection) {
            this.capabilityEditCollection = this.itemser.listCollection;
            this.cunstructFormForEdit()
        }

        else {
            this.capabilityTypeData.forEach(item => {
                item.selectedAircraftDataModels = this.allAircraftinfo;
                item.selectedAircraftModelTypes = this.selectedModels;
                item.selectedAircraftTypes = this.selectedAircraftTypes;
                item.selectedAircraftModelTypes.forEach(value => {
                    item.selectedAircraftDataModels.forEach(value2 => {
                        if (value.aircraftModelId == value2.aircraftModelId) {
                            item.selectedModel.push(value2);
                        }
                    })
                })
                item.selectedAircraftTypes.forEach(typeVal1 => {
                    this.manufacturerData.forEach(typeVal2 => {
                        if (typeVal1 == typeVal2.value) {
                            item.selectedManufacturer.push(typeVal2);
                        }

                    })
                })
                this.addModels(item);

            })
        }
    }


    addModels(capData) {
        this.capabilityTypeData.for
        let capbilitiesObj = new ItemMasterCapabilitiesModel;
        capData.selectedManufacturer.forEach(element1 => {
            capbilitiesObj.itemMasterId = this.ItemMasterId;
            capbilitiesObj.aircraftTypeId = element1.value;
            capbilitiesObj.aircraftTypeName = element1.label;
            capbilitiesObj.capabilityTypeId = capData.CapabilityTypeId;
            capbilitiesObj.aircraftManufacturer = element1.label;
            capData.selectedModel.forEach(element2 => {
                if (element2.aircraftTypeId == element1.value) {
                    capbilitiesObj.aircraftModelName = element2.label;
                    capbilitiesObj.aircraftModelId = element2.value;
                    let mfObj = this.formBuilder.group(capbilitiesObj);
                    switch (capData.formArrayName) {
                        case "mfgForm":
                            let mfgItemExisted = this.checkIsExisted(element1.value, element2.value, this.mfgFormArray, this.capabilityTypeData[0]);
                            if (mfgItemExisted == false) {
                                this.mfgFormArray.push(mfObj);
                                let mfgIndex = this.mfgFormArray.controls.length - 1;
                                this.mfgFormArray.controls[mfgIndex]['buList'] = [];
                                this.mfgFormArray.controls[mfgIndex]['departmentList'] = [];
                                this.mfgFormArray.controls[mfgIndex]['divisionlist'] = [];
                            }


                            break;
                        case "overhaulForm":
                            let oralItemExisted = this.checkIsExisted(element1.value, element2.value, this.overhaulFormArray, this.capabilityTypeData[1]);
                            if (oralItemExisted == false) {
                                this.overhaulFormArray.push(mfObj);
                                let overIndex = this.overhaulFormArray.controls.length - 1;
                                this.overhaulFormArray.controls[overIndex]['buList'] = [];
                                this.overhaulFormArray.controls[overIndex]['departmentList'] = [];
                                this.overhaulFormArray.controls[overIndex]['divisionlist'] = [];
                            }
                            break;
                        case "distributionForm":
                            let distExisted = this.checkIsExisted(element1.value, element2.value, this.distributionFormArray, this.capabilityTypeData[2]);
                            if (distExisted == false) {
                                this.distributionFormArray.push(mfObj);
                                let distIndex = this.distributionFormArray.controls.length - 1;
                                this.distributionFormArray.controls[distIndex]['buList'] = [];
                                this.distributionFormArray.controls[distIndex]['departmentList'] = [];
                                this.distributionFormArray.controls[distIndex]['divisionlist'] = [];
                            }
                            break;
                        case "certificationForm":
                            let certExisted = this.checkIsExisted(element1.value, element2.value, this.certificationFormArray, this.capabilityTypeData[3]);
                            if (certExisted == false) {
                                this.certificationFormArray.push(mfObj);
                                let certIndex = this.certificationFormArray.controls.length - 1;
                                this.certificationFormArray.controls[certIndex]['buList'] = [];
                                this.certificationFormArray.controls[certIndex]['departmentList'] = [];
                                this.certificationFormArray.controls[certIndex]['divisionlist'] = [];
                            }
                            break;
                        case "repairForm":
                            let repairExisted = this.checkIsExisted(element1.value, element2.value, this.repairFormArray, this.capabilityTypeData[4]);
                            if (repairExisted == false) {
                                this.repairFormArray.push(mfObj);
                                let repIndex = this.repairFormArray.controls.length - 1;
                                this.repairFormArray.controls[repIndex]['buList'] = [];
                                this.repairFormArray.controls[repIndex]['departmentList'] = [];
                                this.repairFormArray.controls[repIndex]['divisionlist'] = [];
                            }
                            break;
                        case "exchangeForm":
                            let exchangeExisted = this.checkIsExisted(element1.value, element2.value, this.exchangeFormArray, this.capabilityTypeData[5]);
                            if (exchangeExisted == false) {
                                this.exchangeFormArray.push(mfObj);
                                let excngIndex = this.exchangeFormArray.controls.length - 1;
                                this.exchangeFormArray.controls[excngIndex]['buList'] = [];
                                this.exchangeFormArray.controls[excngIndex]['departmentList'] = [];
                                this.exchangeFormArray.controls[excngIndex]['divisionlist'] = [];
                            }
                            break;
                    }
                }

            });
        });

    }


    manufacturerChange(event, capData) {
        let selectedData = event.value;
        capData.selectedManufacturer = [];
        selectedData.forEach(element1 => {
            this.manufacturerData.forEach(element2 => {
                if (element1 == element2.value) {
                    capData.selectedManufacturer.push(element2);
                }
            })
        })
    }

    resetFormArray(capData) {
        switch (capData.formArrayName) {
            case "mfgForm":
                this.mfgFormArray.controls = [];
                break;
            case "overhaulForm":
                this.overhaulFormArray.controls = [];
                break;
            case "distributionForm":
                this.distributionFormArray.controls = [];
                break;
            case "certificationForm":
                this.certificationFormArray.controls = [];
                break;
            case "repairForm":
                this.repairFormArray.controls = [];
                break;
            case "exchangeForm":
                this.exchangeFormArray.controls = [];
                break;
        }
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

        this.allPartnumbersInfo = allWorkFlows;
    }


    private glAccountlistdata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        let value = "Stock";
        this.itemser.getItemStockList(value).subscribe(
            results => this.onglAccountSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }


    private onglAccountSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allglAccountInfo = allWorkFlows;
    }




    private warningdata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemser.getWarningdata().subscribe(
            results => this.onwarningSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    private onwarningSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.allWarninginfo = allWorkFlows;
    }


    private countryData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemser.getCountrydata().subscribe(
            results => this.onDataLoadcountrySuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    private unitofmeasure() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.unitService.getUnitOfMeasureList().subscribe(
            results => this.onDataunitSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    private Purchaseunitofmeasure() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.unitService.getUnitOfMeasureList().subscribe(
            results => this.onDataPurchaseunitSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }
    private Stockunitofmeasure() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.unitService.getUnitOfMeasureList().subscribe(
            results => this.onDataStockunitSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }
    private Consumeunitofmeasure() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.unitService.getUnitOfMeasureList().subscribe(
            results => this.onDataConsumeunitSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    private SOLDunitofmeasure() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.unitService.getUnitOfMeasureList().subscribe(
            results => this.onDataSOLDunitSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }


    private onDataunitSuccessful(getUnitOfMeasureList: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allUnitOfMeasureinfo = getUnitOfMeasureList;

    }


    private onDataPurchaseunitSuccessful(getUnitOfMeasureList: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allPurchaseUnitOfMeasureinfo = getUnitOfMeasureList;

    }


    private onDataStockunitSuccessful(getUnitOfMeasureList: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allStockUnitOfMeasureinfo = getUnitOfMeasureList;
    }


    private onDataConsumeunitSuccessful(getUnitOfMeasureList: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.allConsumeUnitOfMeasureinfo = getUnitOfMeasureList;
    }


    private onDataSOLDunitSuccessful(getUnitOfMeasureList: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allSOLDUnitOfMeasureinfo = getUnitOfMeasureList;
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


    private onDataLoadcountrySuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allCountryInfo = allWorkFlows;
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

        if (this.itemser.listCollection != null && this.itemser.isEditMode == true)
        {
            //adding for Currency
            if (this.sourceItemMaster.purchaseCurrencyId) {
                this.currencySymbolSelection(this.sourceItemMaster.purchaseCurrencyId);
            }
        }
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
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
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

    private onSuccessful(getAtaMainList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allATAMaininfo = getAtaMainList;
        this.allATAMaininfo1 = getAtaMainList;
    }


    private integrationData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.inteService.getWorkFlows().subscribe(
            results => this.onDatainteSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }


    private onDatainteSuccessful(allWorkFlows: Integration[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
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
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allProvisonInfo = getProvisionList;
    }


    private onDataitemSuccessful(allWorkFlows: Itemgroup[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
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


    private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allComapnies = allComapnies;

    }

    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

    }


    private aircraftmodelData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemser.getAircraft().subscribe(
            results => this.onDataLoadaircraftmodelSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }


    private onDataLoadaircraftmodelSuccessful(allWorkFlows: any[]) //While oading

    {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.allaircraftInfo = allWorkFlows; //Complete Aircraft Manufacturer Data

        this.completeAircraftModelData = allWorkFlows;

        if (this.allaircraftInfo) {
            if (this.allaircraftInfo.length > 0) {
                for (let i = 0; i < this.allaircraftInfo.length; i++)
                    this.shiftValues.push(
                        { value: this.allaircraftInfo[i].aircraftTypeId, label: this.allaircraftInfo[i].description },

                    );
            }

            //Adding

            let valAirCraft = [];
            //we are Passing Customer Id for getting Edit Data and make it check 
            this.itemser.getAircaftManafacturerList(this.sourceItemMaster.itemMasterId)
                .subscribe(results => {
                    this.allAircraftManufacturer = results[0];
                    if (results != null) {
                        for (let i = 0; i < this.allAircraftManufacturer.length; i++) {
                            valAirCraft.push(this.allAircraftManufacturer[i].aircraftTypeId);
                        }
                        this.selectedAircraftTypes = valAirCraft; //if there is Aircraft Data with ItemMasterId that will be Checked 
                        console.log(this.selectedAircraftTypes);
                    }

                },
                    error => this.onDataLoadFailed(error)
                );
        }

    }


    openModelPopups(capData) {
        debugger;
        if (this.itemser.isEditMode == false) {

            //Adding for Aircraft manafacturer List Has empty then List Should be null
            if (this.selectedAircraftTypes.length > 0) {
                var arr = this.selectedAircraftTypes;
                var selectedvalues = arr.join(",");
                this.itemser.getAircraftTypes(selectedvalues).subscribe(
                    results => this.onDataLoadaircrafttypeSuccessful(results[0], capData),
                    error => this.onDataLoadFailed(error)
                );
            }
            else {
                this.allAircraftinfo = []; //Making empty if selecting is null
            }
        }
    }


    openCapes(content) {
        this.modal = this.modalService.open(content, { size: 'lg' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })

    }


    saverange(selectedRow) {

        let ischange = false;
        if (this.selectedModels.length > 0) {
            this.selectedModels.map((row) => {
                if (selectedRow.aircraftModelId == row.aircraftModelId) {
                    row = selectedRow;
                    ischange = true;
                }
            });
        }
        if (!ischange) {
            this.selectedModels.push(selectedRow);
        }

    }
    private onDataLoadaircrafttypeSuccessful(AircraftType: any[], capData) //getting Models Based on Manfacturer Selection

    {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        capData.selectedAircraftDataModels = [];
        this.allAircraftinfo = [];

        for (let models of AircraftType) {
            var manufacturer = this.shiftValues.filter(function (manufacturerParam) {
                return manufacturerParam.value == models.aircraftTypeId;
            })[0].label;
            
            this.allAircraftinfo.push({ value: models.aircraftModelId, label: models.modelName, aircraftManufacturer: manufacturer });
        }

        this.modal = this.modalService.open(capData, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })

        //allWorkFlows.forEach(element => {
        //    this.allAircraftinfo.push({ value: element.aircraftModelId, label: element.modelName, aircraftTypeId: element.aircraftTypeId });
        //    //capData.selectedAircraftDataModels.push({ value: element.aircraftModelId, label: element.modelName, aircraftTypeId: element.aircraftTypeId })
        //});

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
        this.sourceAction = new Priority();
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
        this.sourceAction = new ATAMain();
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
        this.sourceAction = new Itemgroup();
        this.sourceAction.isActive = true;
        this.itemGroupName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    waning(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
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
        this.sourceAction = new Provision();
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
        this.sourceAction = new Integration();
        this.sourceAction.isActive = true;
        this.integrationName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }



    eventHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {
                    this.disableSavepartNumber = true;
                }
                else {
                    this.disableSavepartNumber = false;
                }
            }

        }
    }


    private onpartnumberloadsuccessfull(allWorkFlows: any[]) {

        this.descriptionbyPart = allWorkFlows[0]
        this.sourceItemMaster.partDescription = allWorkFlows[0].partDescription;
    }


    partnmId(event) {
        if (this.itemclaColl) {
            for (let i = 0; i < this.itemclaColl.length; i++) {
                if (event == this.itemclaColl[i][0].partName) {
                    this.sourceItemMaster.partId = this.itemclaColl[i][0].partId;
                    this.disableSavepartNumber = true;
                    this.selectedActionName = event;
                }
            }
            this.itemser.getDescriptionbypart(event).subscribe(
                results => this.onpartnumberloadsuccessfull(results[0]),
                error => this.onDataLoadFailed(error)


            );
        }
    }

    partEventHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {
                    this.disableSavepartNumber = true;
                }
                else {
                    this.disableSavepartNumber = false;
                    this.sourceItemMasterCap.partDescription = "";
                    this.disableSavepartDescription = false;
                }
            }

        }
    }
    ItemHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedItemCode) {
                if (value == this.selectedItemCode.toLowerCase()) {
                    this.disableSaveItemClassficationCode = true;

                }
                else {
                    this.disableSaveItemClassficationCode = false;

                }
            }

        }
    }


    ItemClassficationCode(event) {

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


    ItemGroupHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedItemGroup) {
                if (value == this.selectedItemGroup.toLowerCase()) {
                    this.disableSaveItemGroup = true;
                }
                else {
                    this.disableSaveItemGroup = false;

                }
            }

        }
    }



    itemGroupCode(event) {
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


    ProvisionHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedProvision) {
                if (value == this.selectedProvision.toLowerCase()) {
                    this.disableSaveProvision = true;

                }
                else {
                    this.disableSaveProvision = false;

                }
            }

        }
    }


    ProvisionDescription(event) {
        if (this.allProvisonInfo) {

            for (let i = 0; i < this.allProvisonInfo.length; i++) {
                if (event == this.allProvisonInfo[i].description) {
                    this.sourceItemMaster.description = this.allProvisonInfo[i].description;
                    this.disableSaveProvision = true;
                    this.selectedProvision = event;
                }

            }
        }
    }


    ManufacturerHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedManufacturer) {
                if (value == this.selectedManufacturer.toLowerCase()) {
                    this.disableSaveManufacturer = true;

                }
                else {
                    this.disableSaveManufacturer = false;

                }
            }

        }
    }


    Manufacturerdescription(event) {

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



    ATAChapterHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedATAChapter) {
                if (value == this.selectedATAChapter.toLowerCase()) {
                    this.disableSaveATAChapter = true;

                }
                else {
                    this.disableSaveATAChapter = false;

                }
            }

        }
    }



    AtaChapterName(event) {

        if (this.allATAMaininfo) {

            for (let i = 0; i < this.allATAMaininfo.length; i++) {
                if (event == this.allATAMaininfo[i].ataChapterName) {
                    this.sourceItemMaster.ataChapterName = this.allATAMaininfo[i].ataChapterName;
                    this.disableSaveATAChapter = true;

                    this.selectedATAChapter = event;
                }

            }
        }
    }



    PriorityHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedPriority) {
                if (value == this.selectedPriority.toLowerCase()) {
                    this.disableSavePriority = true;

                }
                else {
                    this.disableSavePriority = false;

                }
            }

        }
    }


    Prioritydescription(event) {
        if (this.allPriorityInfo) {

            for (let i = 0; i < this.allPriorityInfo.length; i++) {
                if (event == this.allPriorityInfo[i].description) {
                    this.sourceItemMaster.description = this.allPriorityInfo[i].description;
                    this.disableSavePriority = true;

                    this.selectedPriority = event;
                }

            }
        }
    }



    PurchaseUOMHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedPurchaseUOM) {
                if (value == this.selectedPurchaseUOM.toLowerCase()) {
                    this.disableSavePurchaseUOM = true;

                }
                else {
                    this.disableSavePurchaseUOM = false;

                }
            }

        }
    }



    PurchaseUOMdescription(event) {

        if (this.allPurchaseUnitOfMeasureinfo) {

            for (let i = 0; i < this.allPurchaseUnitOfMeasureinfo.length; i++) {
                if (event == this.allPurchaseUnitOfMeasureinfo[i].description) {
                    this.sourceItemMaster.itemClassificationCode = this.allPurchaseUnitOfMeasureinfo[i].description;
                    this.disableSavePurchaseUOM = true;

                    this.selectedPurchaseUOM = event;
                }

            }
        }
    }



    StockUOMHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedStockUOM) {
                if (value == this.selectedStockUOM.toLowerCase()) {
                    this.disableSaveStockUOM = true;

                }
                else {
                    this.disableSaveStockUOM = false;

                }
            }

        }
    }



    StockUOMdescription(event) {
        if (this.allStockUnitOfMeasureinfo) {

            for (let i = 0; i < this.allStockUnitOfMeasureinfo.length; i++) {
                if (event == this.allStockUnitOfMeasureinfo[i].description) {
                    this.sourceItemMaster.itemClassificationCode = this.allStockUnitOfMeasureinfo[i].description;
                    this.disableSaveStockUOM = true;

                    this.selectedStockUOM = event;
                }

            }
        }
    }



    ConsumeUOMHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedConsume) {
                if (value == this.selectedConsume.toLowerCase()) {
                    this.disableSaveConsume = true;

                }
                else {
                    this.disableSaveConsume = false;

                }
            }

        }
    }


    ConsumeUOMdescription(event) {

        if (this.allConsumeUnitOfMeasureinfo) {

            for (let i = 0; i < this.allConsumeUnitOfMeasureinfo.length; i++) {
                if (event == this.allConsumeUnitOfMeasureinfo[i].description) {
                    this.sourceItemMaster.itemClassificationCode = this.allConsumeUnitOfMeasureinfo[i].description;
                    this.disableSaveConsume = true;
                    this.selectedConsume = event;
                }

            }
        }
    }


    SOLDUOMHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedSOLD) {
                if (value == this.selectedSOLD.toLowerCase()) {
                    this.disableSaveSOLD = true;

                }
                else {
                    this.disableSaveSOLD = false;

                }
            }

        }
    }



    SOLDUOMdescription(event) {
        if (this.allSOLDUnitOfMeasureinfo) {

            for (let i = 0; i < this.allSOLDUnitOfMeasureinfo.length; i++) {
                if (event == this.allSOLDUnitOfMeasureinfo[i].description) {
                    this.sourceItemMaster.itemClassificationCode = this.allSOLDUnitOfMeasureinfo[i].description;
                    this.disableSaveSOLD = true;
                    this.selectedSOLD = event;
                }

            }
        }
    }


    IntegrationHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedIntegration) {
                if (value == this.selectedIntegration.toLowerCase()) {
                    this.disableSaveIntegration = true;
                }

                else {
                    this.disableSaveIntegration = false;

                }
            }

        }
    }



    Integrationdescription(event) {

        if (this.allIntegrationInfo) {

            for (let i = 0; i < this.allIntegrationInfo.length; i++) {
                if (event == this.allIntegrationInfo[i].description) {
                    this.sourceItemMaster.description = this.allIntegrationInfo[i].description;
                    this.disableSaveIntegration = true;
                    this.selectedIntegration = event;
                }

            }
        }
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


    filterItems(event) {

        this.localCollection = [];
        if (this.allitemclassificationInfo) {
            for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
                let itemName = this.allitemclassificationInfo[i].itemClassificationCode;
                if (itemName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.localCollection.push(itemName);
                }
            }
        }
    }


    private loadManagementdata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService1.getManagemententity().subscribe(
            results => this.onManagemtntdataLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }


    private onManagemtntdataLoad(getAtaMainList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getAtaMainList;
        this.allManagemtninfo = getAtaMainList;
        for (let i = 0; i < this.allManagemtninfo.length; i++) {

            if (this.allManagemtninfo[i].parentId == null) {
                this.maincompanylist.push(this.allManagemtninfo[i]);

            }

        }
    }


    cunstructFormForEdit() {
        if (this.manufacturerData.length > 0 && this.allManagemtninfo.length > 0) {
            this.cunstructItemMastars();
        }
    }


    cunstructItemMastars() {
        let mfgData: any = [];
        this.capabilityEditCollection.forEach(element => {
            if (element.isDelete != true) {
                this.ItemMasterId = element.itemMasterId;
                let index = element.capabilityTypeId - 1;
                let capData = this.capabilityTypeData[index];
                let typeIndex = capData.selectedAircraftTypes.indexOf(element.aircraftTypeId);
                if (typeIndex == -1) {
                    capData.selectedAircraftTypes.push(element.aircraftTypeId);
                    capData.selectedManufacturer.push({ value: element.aircraftTypeId, label: this.getAircraftTypeName(element.aircraftTypeId) });
                }
                capData.selectedAircraftModelTypes.push(element.aircraftModelId);
                this.addExistingData(capData, element)
            }
        });
        this.capabilityTypeData.forEach(element1 => {
            if (element1.selectedAircraftModelTypes.length > 0) {
                this.loadModalsForExistingRecords(element1);
            }
        });

    }


    loadModalsForExistingRecords(capData) {
        if (capData.selectedAircraftTypes.length > 0) {

            let arr = [];
            capData.selectedAircraftTypes.forEach(element => {
                arr.push(element);
            });
            var selectedvalues = arr.join(",");
            this.itemser.getAircraftTypes(selectedvalues).subscribe(
                results => this.onDataLoadaircrafttypeSuccessfulForExisting(results[0], capData),

                error => this.onDataLoadFailed(error)
            );
        }
    }


    private onDataLoadaircrafttypeSuccessfulForExisting(allWorkFlows: any[], capData) //getting Models Based on Manfacturer Selection

    {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        capData.selectedAircraftDataModels = [];
        allWorkFlows.forEach(element => {
            for (let z = 0; z < capData.selectedAircraftModelTypes.length; z++) {
                if (element.aircraftModelId == capData.selectedAircraftModelTypes[z]) {
                    capData.selectedModel.push({ value: element.aircraftModelId, label: element.modelName, aircraftTypeId: element.aircraftTypeId })
                }
            }
            capData.selectedAircraftDataModels.push({ value: element.aircraftModelId, label: element.modelName, aircraftTypeId: element.aircraftTypeId })
        });
        this.displayModalNames(capData);
    }



    displayModalNames(capData) {
        switch (capData.formArrayName) {
            case "mfgForm":
                this.mfgFormArray.controls.forEach(mfg => {
                    mfg['controls']['aircraftModelName'].setValue(this.getAirCraftModalName(capData.selectedAircraftDataModels, mfg['controls']['aircraftModelId'].value));
                    this.mfgFormArray.updateValueAndValidity();
                });
                break;
            case "overhaulForm":
                this.overhaulFormArray.controls.forEach(orl => {
                    orl['controls']['aircraftModelName'].setValue(this.getAirCraftModalName(capData.selectedAircraftDataModels, orl['controls']['aircraftModelId'].value));
                });
                break;
            case "distributionForm":
                this.distributionFormArray.controls.forEach(dist => {
                    dist['controls']['aircraftModelName'].setValue(this.getAirCraftModalName(capData.selectedAircraftDataModels, dist['controls']['aircraftModelId'].value));
                });
                break;
            case "certificationForm":
                this.certificationFormArray.controls.forEach(cert => {
                    cert['controls']['aircraftModelName'].setValue(this.getAirCraftModalName(capData.selectedAircraftDataModels, cert['controls']['aircraftModelId'].value));
                });
                break;
            case "repairForm":
                this.repairFormArray.controls.forEach(rep => {
                    rep['controls']['aircraftModelName'].setValue(this.getAirCraftModalName(capData.selectedAircraftDataModels, rep['controls']['aircraftModelId'].value));
                });
                break;
            case "exchangeForm":
                this.exchangeFormArray.controls.forEach(ex => {
                    ex['controls']['aircraftModelName'].setValue(this.getAirCraftModalName(capData.selectedAircraftDataModels, ex['controls']['aircraftModelId'].value));
                });
                break;
        }

    }


    getAircraftTypeName(aircraftTypeId) {
        let label = "";
        for (let i = 0; i < this.manufacturerData.length; i++) {
            if (this.manufacturerData[i].value == aircraftTypeId) {
                label = this.manufacturerData[i].label
                break;
            }
        }
        return label;
    }


    getAirCraftModalName(modalData, modalId) {
        let label = "";
        for (let i = 0; i < modalData.length; i++) {
            if (modalData[i].value == modalId) {
                label = modalData[i].label
                break;
            }
        }
        return label;
    }


    getExistingRowBuList(companyId, formArray) {
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == companyId) {
                formArray['buList'].push(this.allManagemtninfo[i])
            }
        }
    }


    getExistingRowDepartmentlist(businessUnitId, formArray) {
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == businessUnitId) {
                formArray.departmentList.push(this.allManagemtninfo[i]);
            }
        }
    }



    getExistingRowDivisionlist(departmentId, formArray) {
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == departmentId) {
                formArray.divisionlist.push(this.allManagemtninfo[i]);
            }
        }
    }


    managementStructureData: any = [];
    setManagementStrucureData(capObj) {
        this.managementStructureData = [];
        this.checkMSParents(capObj.managementStructureId);
        if (this.managementStructureData.length == 4) {
            capObj.companyId = this.managementStructureData[3];
            capObj.buisinessUnitId = this.managementStructureData[2];
            capObj.departmentId = this.managementStructureData[1];
            capObj.divisionId = this.managementStructureData[0];
        }
        if (this.managementStructureData.length == 3) {
            capObj.companyId = this.managementStructureData[2];
            capObj.buisinessUnitId = this.managementStructureData[1];
            capObj.departmentId = this.managementStructureData[0];
        }
        if (this.managementStructureData.length == 2) {
            capObj.companyId = this.managementStructureData[1];
            capObj.buisinessUnitId = this.managementStructureData[0];
        }
        if (this.managementStructureData.length == 1) {
            capObj.companyId = this.managementStructureData[0];
        }

    }


    checkMSParents(msId) {
        this.managementStructureData.push(msId);
        for (let a = 0; a < this.allManagemtninfo.length; a++) {
            if (this.allManagemtninfo[a].managementStructureId == msId) {
                if (this.allManagemtninfo[a].parentId) {
                    this.checkMSParents(this.allManagemtninfo[a].parentId);
                    break;
                }
            }
        }

    }


    addExistingData(capData, data) {
        let capbilitiesObj = data;
        capbilitiesObj.aircraftTypeName = this.getAircraftTypeName(data.aircraftTypeId);
        capbilitiesObj.aircraftModelName = "";
        capbilitiesObj.entryDate = new Date()
        capbilitiesObj.isVerified = false;
        capbilitiesObj.isActive = true;
        capbilitiesObj.verifiedBy = "";

        capbilitiesObj.aircraftManufacturer = this.getAircraftTypeName(data.aircraftTypeId);
        capbilitiesObj.dateVerified = new Date();
        this.setManagementStrucureData(capbilitiesObj);
        let mfObj = this.formBuilder.group(capbilitiesObj);
        switch (capData.formArrayName) {
            case "mfgForm":
                this.mfgFormArray.push(mfObj);
                let mfgIndex = this.mfgFormArray.controls.length - 1;
                this.mfgFormArray.controls[mfgIndex]['buList'] = [];
                this.mfgFormArray.controls[mfgIndex]['departmentList'] = [];
                this.mfgFormArray.controls[mfgIndex]['divisionlist'] = [];
                if (this.mfgFormArray.controls[mfgIndex]['controls']['companyId'].value) {
                    this.getExistingRowBuList(this.mfgFormArray.controls[mfgIndex]['controls']['companyId'].value, this.mfgFormArray.controls[mfgIndex]);
                }
                if (this.mfgFormArray.controls[mfgIndex]['controls']['buisinessUnitId'].value) {
                    this.getExistingRowDepartmentlist(this.mfgFormArray.controls[mfgIndex]['controls']['buisinessUnitId'].value, this.mfgFormArray.controls[mfgIndex]);
                }
                if (this.mfgFormArray.controls[mfgIndex]['controls']['departmentId'].value) {
                    this.getExistingRowDivisionlist(this.mfgFormArray.controls[mfgIndex]['controls']['departmentId'].value, this.mfgFormArray.controls[mfgIndex]);
                }

                break;
            case "overhaulForm":
                this.overhaulFormArray.push(mfObj);
                let overIndex = this.overhaulFormArray.controls.length - 1;
                this.overhaulFormArray.controls[overIndex]['buList'] = [];
                this.overhaulFormArray.controls[overIndex]['departmentList'] = [];
                this.overhaulFormArray.controls[overIndex]['divisionlist'] = [];
                if (this.overhaulFormArray.controls[overIndex]['controls']['companyId'].value) {
                    this.getExistingRowBuList(this.overhaulFormArray.controls[overIndex]['controls']['companyId'].value, this.overhaulFormArray.controls[overIndex]);
                }
                if (this.overhaulFormArray.controls[overIndex]['controls']['buisinessUnitId'].value) {
                    this.getExistingRowDepartmentlist(this.overhaulFormArray.controls[overIndex]['controls']['buisinessUnitId'].value, this.overhaulFormArray.controls[overIndex]);
                }
                if (this.overhaulFormArray.controls[overIndex]['controls']['departmentId'].value) {
                    this.getExistingRowDivisionlist(this.overhaulFormArray.controls[overIndex]['controls']['departmentId'].value, this.overhaulFormArray.controls[overIndex]);
                }
                break;
            case "distributionForm":
                this.distributionFormArray.push(mfObj);
                let distIndex = this.distributionFormArray.controls.length - 1;
                this.distributionFormArray.controls[distIndex]['buList'] = [];
                this.distributionFormArray.controls[distIndex]['departmentList'] = [];
                this.distributionFormArray.controls[distIndex]['divisionlist'] = [];
                if (this.distributionFormArray.controls[distIndex]['controls']['companyId'].value) {
                    this.getExistingRowBuList(this.distributionFormArray.controls[distIndex]['controls']['companyId'].value, this.distributionFormArray.controls[distIndex]);
                }
                if (this.distributionFormArray.controls[distIndex]['controls']['buisinessUnitId'].value) {
                    this.getExistingRowDepartmentlist(this.distributionFormArray.controls[distIndex]['controls']['buisinessUnitId'].value, this.distributionFormArray.controls[distIndex]);
                }
                if (this.distributionFormArray.controls[distIndex]['controls']['departmentId'].value) {
                    this.getExistingRowDivisionlist(this.distributionFormArray.controls[distIndex]['controls']['departmentId'].value, this.distributionFormArray.controls[distIndex]);
                }
                break;
            case "certificationForm":
                this.certificationFormArray.push(mfObj);
                let certIndex = this.certificationFormArray.controls.length - 1;
                this.certificationFormArray.controls[certIndex]['buList'] = [];
                this.certificationFormArray.controls[certIndex]['departmentList'] = [];
                this.certificationFormArray.controls[certIndex]['divisionlist'] = [];
                if (this.certificationFormArray.controls[certIndex]['controls']['companyId'].value) {
                    this.getExistingRowBuList(this.certificationFormArray.controls[certIndex]['controls']['companyId'].value, this.certificationFormArray.controls[certIndex]);
                }
                if (this.certificationFormArray.controls[certIndex]['controls']['buisinessUnitId'].value) {
                    this.getExistingRowDepartmentlist(this.certificationFormArray.controls[certIndex]['controls']['buisinessUnitId'].value, this.certificationFormArray.controls[certIndex]);
                }
                if (this.certificationFormArray.controls[certIndex]['controls']['departmentId'].value) {
                    this.getExistingRowDivisionlist(this.certificationFormArray.controls[certIndex]['controls']['departmentId'].value, this.certificationFormArray.controls[certIndex]);
                }
                break;
            case "repairForm":
                this.repairFormArray.push(mfObj);
                let repIndex = this.repairFormArray.controls.length - 1;
                this.repairFormArray.controls[repIndex]['buList'] = [];
                this.repairFormArray.controls[repIndex]['departmentList'] = [];
                this.repairFormArray.controls[repIndex]['divisionlist'] = [];
                if (this.repairFormArray.controls[repIndex]['controls']['companyId'].value) {
                    this.getExistingRowBuList(this.repairFormArray.controls[repIndex]['controls']['companyId'].value, this.repairFormArray.controls[repIndex]);
                }
                if (this.repairFormArray.controls[repIndex]['controls']['buisinessUnitId'].value) {
                    this.getExistingRowDepartmentlist(this.repairFormArray.controls[repIndex]['controls']['buisinessUnitId'].value, this.repairFormArray.controls[repIndex]);
                }
                if (this.repairFormArray.controls[repIndex]['controls']['departmentId'].value) {
                    this.getExistingRowDivisionlist(this.repairFormArray.controls[repIndex]['controls']['departmentId'].value, this.repairFormArray.controls[repIndex]);
                }
                break;
            case "exchangeForm":
                this.exchangeFormArray.push(mfObj);
                let excngIndex = this.exchangeFormArray.controls.length - 1;
                this.exchangeFormArray.controls[excngIndex]['buList'] = [];
                this.exchangeFormArray.controls[excngIndex]['departmentList'] = [];
                this.exchangeFormArray.controls[excngIndex]['divisionlist'] = [];
                if (this.exchangeFormArray.controls[excngIndex]['controls']['companyId'].value) {
                    this.getExistingRowBuList(this.exchangeFormArray.controls[excngIndex]['controls']['companyId'].value, this.exchangeFormArray.controls[excngIndex]);
                }
                if (this.exchangeFormArray.controls[excngIndex]['controls']['buisinessUnitId'].value) {
                    this.getExistingRowDepartmentlist(this.exchangeFormArray.controls[excngIndex]['controls']['buisinessUnitId'].value, this.exchangeFormArray.controls[excngIndex]);
                }
                if (this.exchangeFormArray.controls[excngIndex]['controls']['departmentId'].value) {
                    this.getExistingRowDivisionlist(this.exchangeFormArray.controls[excngIndex]['controls']['departmentId'].value, this.exchangeFormArray.controls[excngIndex]);
                }
                break;
        }
    }


    checkIsExisted(type, modal, myForm, capData) {
        let itemExisted = false;
        myForm.controls.forEach(data => {
            if (data['controls']['aircraftTypeId'].value == type && data['controls']['aircraftModelId'].value == modal) {
                itemExisted = true;
                data['controls']['isDelete'].setValue(false);
            } else {
                let typeId = data['controls']['aircraftTypeId'].value;
                let typeIndex = capData.selectedAircraftTypes.indexOf(typeId);
                if (typeIndex == -1) {
                    data['controls']['isDelete'].setValue(true);
                }
                let modaleId = data['controls']['aircraftModelId'].value;
                let modalIndex = capData.selectedAircraftModelTypes.indexOf(modaleId);
                if (modalIndex == -1) {
                    data['controls']['isDelete'].setValue(true);
                }
            }


        });
        return itemExisted;
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



    filterPurchaseUnitOfMeasures(event) {

        this.localunit = [];
        if (this.allPurchaseUnitOfMeasureinfo) {
            for (let i = 0; i < this.allPurchaseUnitOfMeasureinfo.length; i++) {
                let unitName = this.allPurchaseUnitOfMeasureinfo[i].description;
                if (unitName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.localunit.push(unitName);
                }
            }
        }
    }


    filterStockUnitOfMeasures(event) {

        this.localunit = [];
        if (this.allStockUnitOfMeasureinfo) {
            for (let i = 0; i < this.allStockUnitOfMeasureinfo.length; i++) {
                let unitName = this.allStockUnitOfMeasureinfo[i].description;
                if (unitName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.localunit.push(unitName);
                }
            }
        }
    }



    filterConsumeUnitOfMeasures(event) {

        this.localunit = [];
        if (this.allConsumeUnitOfMeasureinfo) {
            for (let i = 0; i < this.allConsumeUnitOfMeasureinfo.length; i++) {
                let unitName = this.allConsumeUnitOfMeasureinfo[i].description;
                if (unitName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.localunit.push(unitName);
                }
            }
        }
    }



    filterSOLDUnitOfMeasures(event) {

        this.localunit = [];
        if (this.allSOLDUnitOfMeasureinfo) {
            for (let i = 0; i < this.allSOLDUnitOfMeasureinfo.length; i++) {
                let unitName = this.allSOLDUnitOfMeasureinfo[i].description;
                if (unitName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.localunit.push(unitName);
                }
            }
        }
    }



    filterItemgroups(event) {

        this.localgroup = [];
        if (this.allitemgroupobjInfo) {
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


    setvalue() {

        this.markupListPriceValue = true;
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
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive == true;
            this.workFlowtService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
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



    editItemAndCloseModel() {

        this.isSaving = true;
        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.itemClassificationCode = this.itemName;
            this.sourceAction.masterCompanyId = 1;

            if (this.selectedAircraftTypes != null) //separting Array which is having ","
            {
                this.sourceAction.AircraftTypeId = this.selectedAircraftTypes.toString().split(",");
            }
            this.workFlowtService.newAction(this.sourceAction).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
            this.activeIndex = 0;
        }
        else {
            //Adding when we select Multiple Aircrafts 
            if (this.selectedAircraftTypes != null) //separting Array whic is having ","
            {
                this.sourceItemMaster.AircraftTypeId = this.selectedAircraftTypes.toString().split(",");
            }
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.itemClassificationCode = this.itemName;
            this.sourceAction.masterCompanyId = 1;
            this.workFlowtService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }
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


    deletehomeFormIndex(rowNumber: number) {
        this.manfacturerAircraftmodelsarray.splice(rowNumber, 1);
        this.changeDetectorRef.detectChanges();
    }



    deleteovhindex(rowNumber: number) {
        this.overhaulAircraftmodelsarray.splice(rowNumber, 1);
        this.changeDetectorRef.detectChanges();
    }


    deletedisindex(rowNumber: number) {
        this.distributionAircraftmodelsarray.splice(rowNumber, 1);
        this.changeDetectorRef.detectChanges();
    }

    deletecertificateindex(rowNumber: number) {
        this.certificationarrayAircraftmodelsarray.splice(rowNumber, 1);
        this.changeDetectorRef.detectChanges();
    }

    deleterepairindex(rowNumber: number) {
        this.repairAircraftmodelsarray.splice(rowNumber, 1);
        this.changeDetectorRef.detectChanges();
    }

    deleteexcahngeindex(rowNumber: number) {
        this.exchangeAircraftmodelsarray.splice(rowNumber, 1);
        this.changeDetectorRef.detectChanges();
    }


    dismissAircraftModel() {
        if (this.selectedModels.length > 0) {
            this.manfacturerAircraftmodelsarray = [];
            this.distributionAircraftmodelsarray = [];
            this.overhaulAircraftmodelsarray = [];
            this.certificationarrayAircraftmodelsarray = [];
            this.repairAircraftmodelsarray = [];
            this.exchangeAircraftmodelsarray = [];
            this.isDeleteMode = false;
            this.isEditMode = false;
            this.modal.close();
            if (this.itemser.isEditMode == false || (this.itemser.isEditMode == true && this.selectedModels.length > 0)) {

                this.manfacturerAircraftmodelsarray = this.manfacturerAircraftDataParsing(JSON.parse(JSON.stringify(this.selectedModels)));
                this.distributionAircraftmodelsarray = JSON.parse(JSON.stringify(this.selectedModels));
                this.overhaulAircraftmodelsarray = JSON.parse(JSON.stringify(this.selectedModels));
                this.certificationarrayAircraftmodelsarray = JSON.parse(JSON.stringify(this.selectedModels));
                this.repairAircraftmodelsarray = JSON.parse(JSON.stringify(this.selectedModels));
                this.exchangeAircraftmodelsarray = JSON.parse(JSON.stringify(this.selectedModels));
            }
        }
        this.showInput = true;
        this.modal.close();
    }


    manfacturerAircraftDataParsing(data) {
        if (data) {
            for (let obj of data) {
                obj["bulist"] = []
                obj["departmentList"] = []
                obj["divisionlist"] = []
            }

            return data;
        }
        return null;
    }


    dismissCapesModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
        this.capesCollection = [];
        for (let i = 0; i < this.manfacturerAircraftmodelsarray.length; i++) {
            this.capesCollection.push(JSON.parse(JSON.stringify(this.manfacturerAircraftmodelsarray[i])));


        }
        for (let i = 0; i < this.overhaulAircraftmodelsarray.length; i++) {
            this.capesCollection.push(JSON.parse(JSON.stringify(this.overhaulAircraftmodelsarray[i])));


        }

        for (let i = 0; i < this.distributionAircraftmodelsarray.length; i++) {
            this.capesCollection.push(JSON.parse(JSON.stringify(this.distributionAircraftmodelsarray[i])));


        }

        for (let i = 0; i < this.repairAircraftmodelsarray.length; i++) {
            this.capesCollection.push(JSON.parse(JSON.stringify(this.repairAircraftmodelsarray[i])));


        }

        for (let i = 0; i < this.certificationarrayAircraftmodelsarray.length; i++) {
            this.capesCollection.push(JSON.parse(JSON.stringify(this.certificationarrayAircraftmodelsarray[i])));


        }

        for (let i = 0; i < this.exchangeAircraftmodelsarray.length; i++) {
            this.capesCollection.push(JSON.parse(JSON.stringify(this.exchangeAircraftmodelsarray[i])));


        }
    }


    public saveSelectedModel(selectedRow, indeex) {
        var models = this.selectedModels.filter(function (models) {
            return models.aircraftModelId == selectedRow.aircraftModelId
        });

        if (models == undefined || models.length == 0) {
            this.selectedModels.push(selectedRow);
        }
        else {
            this.selectedModels.splice(this.selectedModels.indexOf(models[0], 1));
            this.selectedModels.push(selectedRow);
        }

        //selectedRow.isBoolean = indeex;
        //let ischange = false;
        //if (this.selectedModels.length > 0) {
        //    this.selectedModels.map((row) => {
        //        if (selectedRow.aircraftModelId == row.aircraftModelId) {

        //            ischange = true;
        //        }
        //    });
        //}
        //if (!ischange) {
            
        //}
        //console.log(this.selectedModels);

    }


    public getSelectedItem(selectedRow, event) {
        let ischange = false;
        if (this.selectedModels.length > 0) {
            this.selectedModels.map((row) => {
                if (selectedRow.aircraftModelId == row.aircraftModelId) {
                    row.priority = event.target.value;
                    ischange = true;
                }
            });
        }
        if (!ischange) {
            this.selectedModels.push(selectedRow);
        }
        console.log(this.selectedModels);
    }


    getBUList(companyId, formArray) {

        formArray.controls['buisinessUnitId'].setValue("");
        formArray.controls['departmentId'].setValue("");
        formArray.controls['divisionId'].setValue("");
        formArray.controls['managementStructureId'].setValue(companyId);
        formArray.departmentList = [];
        formArray.divisionlist = [];
        formArray['buList'] = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == companyId) {
                formArray['buList'].push(this.allManagemtninfo[i])
            }
        }

        this.setValidations(formArray);
    }



    setValidations(formArray) {
        formArray.controls['buisinessUnitId'].clearValidators();
        formArray.updateValueAndValidity();
        if (formArray['buList'].length == 0) {
            formArray.controls['buisinessUnitId'].setValidators([Validators.required]);
            formArray.updateValueAndValidity();
        }
    }


    getBUListovh(selItem, masterCompanyId) {
        let _bulist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == masterCompanyId) {
                _bulist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["bulistovh"] = _bulist;
        console.log(this.bulist);
    }


    getBUListDistribution(selItem, masterCompanyId) {
        let _bulist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == masterCompanyId) {
                _bulist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["bulistdistribution"] = _bulist;
        console.log(this.bulist);
    }


    getBUListcertificate(selItem, masterCompanyId) {
        let _bulist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == masterCompanyId) {
                _bulist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["bulistcertificate"] = _bulist;
        console.log(this.bulist);
    }


    getBUListexcahnge(selItem, masterCompanyId) {
        let _bulist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == masterCompanyId) {
                _bulist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["bulistexcahnge"] = _bulist;
        console.log(this.bulist);
    }


    getBUListrepair(selItem, masterCompanyId) {
        let _bulist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == masterCompanyId) {
                _bulist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["bulistrepair"] = _bulist;
        console.log(this.bulist);
    }



    getDepartmentlistrepair(selItem, buid) {
        let _departmentList = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == buid) {
                _departmentList.push(this.allManagemtninfo[i]);
            }
        }
        selItem["departmentListrepair"] = _departmentList;
        console.log(this.departmentList);
    }


    getDepartmentlist(businessUnitId, formArray) {
        formArray.controls['departmentId'].setValue("");
        formArray.controls['divisionId'].setValue("");
        formArray.controls['managementStructureId'].setValue(businessUnitId);
        formArray.departmentList = [];
        formArray.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == businessUnitId) {
                formArray.departmentList.push(this.allManagemtninfo[i]);
            }
        }

        this.setValidations(formArray);
    }


    getDepartmentlistdistribution(selItem, buid) {
        let _departmentList = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == buid) {
                _departmentList.push(this.allManagemtninfo[i]);
            }
        }
        selItem["departmentListdistribution"] = _departmentList;
        console.log(this.departmentList);
    }


    getDepartmentlistovh(selItem, buid) {
        let _departmentList = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == buid) {
                _departmentList.push(this.allManagemtninfo[i]);
            }
        }
        selItem["departmentListovh"] = _departmentList;
        console.log(this.departmentList);
    }


    getDepartmentlistcertificate(selItem, buid) {
        let _departmentList = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == buid) {
                _departmentList.push(this.allManagemtninfo[i]);
            }
        }
        selItem["departmentListcertificate"] = _departmentList;
        console.log(this.departmentList);
    }


    getDepartmentlistexcahnge(selItem, buid) {
        let _departmentList = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == buid) {
                _departmentList.push(this.allManagemtninfo[i]);
            }
        }
        selItem["departmentListexcahnge"] = _departmentList;
        console.log(this.departmentList);
    }


    getDivisionlist(departmentId, formArray) {
        formArray.controls['divisionId'].setValue("");
        formArray.controls['managementStructureId'].setValue(departmentId);
        formArray.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == departmentId) {
                formArray.divisionlist.push(this.allManagemtninfo[i]);
            }
        }
        this.setValidations(formArray);
    }



    validateForm(form, fieldName: any) {
        let className = '';
        if (form.get(fieldName).valid) {
        } else {
            className = 'form-validation-error';
        }
        return className;
    };


    getDivisionlistcertificate(selItem, depid) {
        let _divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == depid) {
                _divisionlist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["divisionlistcertificate"] = _divisionlist;
        console.log(this.divisionlist);
    }


    getDivisionlistdistrubution(selItem, depid) {
        let _divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == depid) {
                _divisionlist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["divisionlistdistribution"] = _divisionlist;
        console.log(this.divisionlist);
    }


    getDivisionlistovh(selItem, depid) {
        let _divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == depid) {
                _divisionlist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["divisionlistovh"] = _divisionlist;
        console.log(this.divisionlist);
    }


    getDivisionlistexcahnge(selItem, depid) {
        let _divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == depid) {
                _divisionlist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["divisionlistexcahnge"] = _divisionlist;
        console.log(this.divisionlist);
    }


    getDivisionlistrepair(selItem, depid) {
        let _divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == depid) {
                _divisionlist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["divisionlistrepair"] = _divisionlist;
        console.log(this.divisionlist);
    }


    divisionChange(divisionId, formArray) {
        formArray.controls['managementStructureId'].setValue(divisionId);
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


    private saveSuccessHelper(role?: any) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

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


    private savesuccessCompleted(user?: any) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);
        this.loadData();
    }


    saveitemclassification() {

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
            })
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
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.itemGroupCode = this.itemGroupName;
            this.sourceAction.masterCompanyId = 1;
            this.itemservice.newAction(this.sourceAction).subscribe(data => { this.itemgroup() })
        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.itemGroupCode = this.itemGroupName;
            this.sourceAction.masterCompanyId = 1;
            this.itemservice.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }


    saveprovision() {
        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.provisionName;
            this.sourceAction.masterCompanyId = 1;
            this.proService.newProvision(this.sourceAction).subscribe(data => { this.provisiondata() })

        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.provisionName;

            this.proService.updateProvision(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }


    saveatamain() {
        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.masterCompanyId = 1;
            this.sourceAction.ataChapterName = this.ataChapterName;
            this.ataMainSer.newATAMain(this.sourceAction).subscribe(data => { this.atamaindata() })

        }
        else {
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.ataChapterName = this.ataChapterName;
            this.ataMainSer.updateATAMain(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }


    saveunitofmeasure() {

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
                response => this.saveCompleted(this.sourceUOM),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }


    savePurchaseunitofmeasure() {
        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceUOM.createdBy = this.userName;
            this.sourceUOM.updatedBy = this.userName;
            this.sourceUOM.description = this.unitName;
            this.sourceUOM.masterCompanyId = 1;
            this.unitService.newUnitOfMeasure(this.sourceUOM).subscribe(data => { this.Purchaseunitofmeasure() })

        }
        else {

            this.sourceUOM.updatedBy = this.userName;
            this.sourceUOM.description = this.unitName;
            this.sourceUOM.masterCompanyId = 1;
            this.unitService.updateUnitOfMeasure(this.sourceUOM).subscribe(
                response => this.saveCompleted(this.sourceUOM),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }


    saveStockunitofmeasure() {
        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceUOM.createdBy = this.userName;
            this.sourceUOM.updatedBy = this.userName;
            this.sourceUOM.description = this.unitName;
            this.sourceUOM.masterCompanyId = 1;
            this.unitService.newUnitOfMeasure(this.sourceUOM).subscribe(data => { this.Stockunitofmeasure() })

        }
        else {

            this.sourceUOM.updatedBy = this.userName;
            this.sourceUOM.description = this.unitName;
            this.sourceUOM.masterCompanyId = 1;
            this.unitService.updateUnitOfMeasure(this.sourceUOM).subscribe(
                response => this.saveCompleted(this.sourceUOM),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }


    saveConsumeunitofmeasure() {

        this.isSaving = true;
        if (this.isEditMode == false) {
            this.sourceUOM.createdBy = this.userName;
            this.sourceUOM.updatedBy = this.userName;
            this.sourceUOM.description = this.unitName;
            this.sourceUOM.masterCompanyId = 1;
            this.unitService.newUnitOfMeasure(this.sourceUOM).subscribe(data => { this.Consumeunitofmeasure() })

        }
        else {

            this.sourceUOM.updatedBy = this.userName;
            this.sourceUOM.description = this.unitName;
            this.sourceUOM.masterCompanyId = 1;
            this.unitService.updateUnitOfMeasure(this.sourceUOM).subscribe(
                response => this.saveCompleted(this.sourceUOM),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }


    saveSOLDunitofmeasure() {
        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceUOM.createdBy = this.userName;
            this.sourceUOM.updatedBy = this.userName;
            this.sourceUOM.description = this.unitName;
            this.sourceUOM.masterCompanyId = 1;
            this.unitService.newUnitOfMeasure(this.sourceUOM).subscribe(data => { this.SOLDunitofmeasure() })

        }
        else {

            this.sourceUOM.updatedBy = this.userName;
            this.sourceUOM.description = this.unitName;
            this.sourceUOM.masterCompanyId = 1;
            this.unitService.updateUnitOfMeasure(this.sourceUOM).subscribe(
                response => this.saveCompleted(this.sourceUOM),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }



    savepriority() {

        this.isSaving = true;
        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.priorityName;
            this.sourceAction.masterCompanyId = 1;
            this.priority.newPriority(this.sourceAction).subscribe(data => { this.priorityData() })


        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.priorityName;
            this.priority.updatePriority(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }



    saveintegration() {

        this.isSaving = true;
        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.integrationName;
            this.sourceAction.masterCompanyId = 1;
            this.inteService.newAction(this.sourceAction).subscribe(data => { this.integrationData() })

        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.integrationName;
            this.inteService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }


    savewarnings() {

        this.isSaving = true;
        if (this.isEditMode == false) {
            this.sourceActions.createdBy = this.userName;
            this.sourceActions.updatedBy = this.userName;
            this.itemser.newWarning(this.sourceActions).subscribe(data => { this.warningdata() })
        }
        else {

            this.sourceActions.updatedBy = this.userName;
            this.itemser.updateItemMaster(this.sourceActions).subscribe(
                response => this.saveCompleted(this.sourceActions),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }


    onMarkupAfterDisc(myValue, percentValue) {
        let afterpercent = percentValue / 100;
        let test = afterpercent * myValue;
        this.sourceItemMaster.salesBaselineSalesPrice = myValue - test;
    }


    onMarkupPercentonListprice(myValue, percentValue) {
        let afterpercent = percentValue / 100;
        let test = afterpercent * myValue;
        this.sourceItemMaster.salesBaselineSalesPrice = myValue - test;
    }


    savemfginfo(partid, itemid, data) {

        for (let i = 0; i < data.length; i++) {

            if (data[i].atcChapterId1 != null) {
                data[i].itemId = itemid;
                data[i].partId = partid;
                data[i].capabilityTypeId = 1;
                data[i].verifiedBy = data[i].verifiedBy1;
                data[i].isCMMExist = data[i].isCMMExist1;
                data[i].description = data[i].modelname1;
                data[i].isCMMExist = data[i].isCMMExist1;
                data[i].aTAMainId = data[i].atcChapterId1;
                data[i].memo = data[i].memo1;
                data[i].aircraftManufacturer = data[i].description;
                data[i].aircraftModelId = data[i].aircraftModelId;
                data[i].aircraftTypeId = data[i].aircraftTypeId;
                data[i].entryDate = data[i].entrydate1;

                this.itemser.saveManfacturerinforcapes(data[i]).subscribe(data11 => {
                    this.collectionofItemMaster = data11;
                })
            }
        }
    }


    saveDistrbution(partid, itemid, data) {

        for (let i = 0; i < data.length; i++) {
            if (data[i].atcChapterId1 != null) {
                data[i].itemId = itemid;
                data[i].partId = partid;
                data[i].capabilityTypeId = 3;
                data[i].verifiedBy = data[i].verifiedBy1;
                data[i].isCMMExist = data[i].isCMMExist1;
                data[i].description = data[i].modelname1;
                data[i].isCMMExist = data[i].isCMMExist1;
                data[i].aTAMainId = data[i].atcChapterId1;
                data[i].memo = data[i].memo1;
                data[i].aircraftManufacturer = data[i].aircraftManufacturer;
                data[i].aircraftModelId = data[i].aircraftModelId;
                data[i].aircraftTypeId = data[i].aircraftTypeId;
                data[i].entryDate = data[i].entrydate1;

                this.itemser.saveManfacturerinforcapes(data[i]).subscribe(data11 => {
                    this.collectionofItemMaster = data11;
                })
            }

        }
    }


    saveovhinfo(partid, itemid, data) {

        for (let i = 0; i < data.length; i++) {
            if (data[i].atcChapterId1 != null) {
                data[i].itemId = itemid;
                data[i].partId = partid;
                data[i].capabilityTypeId = 2;
                data[i].verifiedBy = data[i].verifiedBy1;
                data[i].isCMMExist = data[i].isCMMExist1;
                data[i].description = data[i].modelname1;
                data[i].isCMMExist = data[i].isCMMExist1;
                data[i].aTAMainId = data[i].atcChapterId1;
                data[i].memo = data[i].memo1;
                data[i].aircraftManufacturer = data[i].aircraftManufacturer;
                data[i].aircraftModelId = data[i].aircraftModelId;
                data[i].aircraftTypeId = data[i].aircraftTypeId;
                data[i].entryDate = data[i].entrydate1;

                this.itemser.saveManfacturerinforcapes(data[i]).subscribe(data11 => {
                    this.collectionofItemMaster = data11;
                })
            }

        }
    }


    saverepairinfo(partid, itemid, data) {

        for (let i = 0; i < data.length; i++) {
            if (data[i].atcChapterId1 != null) {
                data[i].itemId = itemid;
                data[i].partId = partid;
                data[i].capabilityTypeId = 5;
                data[i].verifiedBy = data[i].verifiedBy1;
                data[i].isCMMExist = data[i].isCMMExist1;
                data[i].description = data[i].modelname1;
                data[i].isCMMExist = data[i].isCMMExist1;
                data[i].aTAMainId = data[i].atcChapterId1;
                data[i].memo = data[i].memo1;
                data[i].aircraftManufacturer = data[i].aircraftManufacturer;
                data[i].aircraftModelId = data[i].aircraftModelId;
                data[i].aircraftTypeId = data[i].aircraftTypeId;
                data[i].entryDate = data[i].entrydate1;

                this.itemser.saveManfacturerinforcapes(data[i]).subscribe(data11 => {
                    this.collectionofItemMaster = data11;
                })
            }

        }
    }


    saveexcahneginfo(partid, itemid, data) {

        for (let i = 0; i < data.length; i++) {
            if (data[i].atcChapterId1 != null) {
                data[i].itemId = itemid;
                data[i].partId = partid;
                data[i].capabilityTypeId = 6;
                data[i].verifiedBy = data[i].verifiedBy1;
                data[i].isCMMExist = data[i].isCMMExist1;
                data[i].description = data[i].modelname1;
                data[i].isCMMExist = data[i].isCMMExist1;
                data[i].aTAMainId = data[i].atcChapterId1;
                data[i].memo = data[i].memo1;
                data[i].aircraftManufacturer = data[i].aircraftManufacturer;
                data[i].aircraftModelId = data[i].aircraftModelId;
                data[i].aircraftTypeId = data[i].aircraftTypeId;
                data[i].entryDate = data[i].entrydate1;

                this.itemser.saveManfacturerinforcapes(data[i]).subscribe(data11 => {
                    this.collectionofItemMaster = data11;
                })
            }

        }
    }


    savecertification(partid, itemid, data) {

        for (let i = 0; i < data.length; i++) {
            if (data[i].atcChapterId1 != null) {
                data[i].itemId = itemid;
                data[i].partId = partid;
                data[i].capabilityTypeId = 4;
                data[i].verifiedBy = data[i].verifiedBy1;
                data[i].isCMMExist = data[i].isCMMExist1;
                data[i].description = data[i].modelname1;
                data[i].isCMMExist = data[i].isCMMExist1;
                data[i].aTAMainId = data[i].atcChapterId1;
                data[i].memo = data[i].memo1;
                data[i].aircraftManufacturer = data[i].aircraftManufacturer;
                data[i].aircraftModelId = data[i].aircraftModelId;
                data[i].aircraftTypeId = data[i].aircraftTypeId;
                data[i].entryDate = data[i].entrydate1;

                this.itemser.saveManfacturerinforcapes(data[i]).subscribe(data11 => {
                    this.collectionofItemMaster = data11;
                })
            }
        }
    }


    saveAircraftmodelinfo(partid, itemid, data) {

        for (let i = 0; i < data.length; i++) {
            data[i].itemMasterId = itemid;
            this.itemser.saveAircraftinfo(data[i]).subscribe(aircraftdata => {
                this.collectionofItemMaster = aircraftdata;
            })

        }
    }


    moveGeneralInfromation() {
        this.showGeneralData = true;
        this.showpurchaseData = false;
        this.showexportData = false;
    }


    movePurchaseInformation() {
        this.showpurchaseData = true;
        this.showGeneralData = false;
        this.showexportData = false;
    }

    moveExportInformation() {
        this.showpurchaseData = false;
        this.showGeneralData = false;
        this.showexportData = true;
    }

    moveExportInformation1() {
        this.showpurchaseData = true;
        this.showGeneralData = false;
        this.showexportData = false;
    }


    movePurchaseInformation1() {
        this.showpurchaseData = false;
        this.showGeneralData = true;
        this.showexportData = false;
    }


    saveitemMasterclose() {
        if (!(this.sourceItemMaster.partNumber && this.sourceItemMaster.partDescription && this.sourceItemMaster.itemClassificationId && this.sourceItemMaster.purchaseUnitOfMeasureId && this.sourceItemMaster.glAccountId)) {
            this.display = true;
            this.modelValue = true;
        }
        if ((this.sourceItemMaster.partNumber && this.sourceItemMaster.partDescription && this.sourceItemMaster.itemClassificationId && this.sourceItemMaster.purchaseUnitOfMeasureId && this.sourceItemMaster.glAccountId)) {

            this.isSaving = true;

            if (!this.sourceItemMaster.itemMasterId) //for Edit Screen
            {
                this.sourceItemMaster.createdBy = this.userName;
                this.sourceItemMaster.updatedBy = this.userName;
                this.sourceItemMaster.masterCompanyId = 1;
                this.sourceItemMaster.itemTypeId = 1;

                this.itemser.newItemMaster(this.sourceItemMaster).subscribe(data => {
                    this.collectionofItemMaster = data;
                    this.savesuccessCompleted(this.sourceItemMaster);
                    if (data != null) {
                        this.ItemMasterId = data.itemMasterId;
                        if (this.isSaveCapes == true) {
                            this.saveCapabilities();
                        }
                    }
                    this.alertService.startLoadingMessage();

                    this.AddCustomerAircraftdata(this.collectionofItemMaster); //passing ItemMaster Saved Collection for Stote Aircraft Data

                    this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-list')
                    this.value = 1;
                    this.itemser.listStock = true;
                    this.itemser.listNonstock = false;
                    this.itemser.listEquipment = false;

                })

                if (this.selectedAircraftTypes != null) //separting Array whic is having ","
                {
                    this.sourceItemMaster.AircraftTypeId = this.selectedAircraftTypes.toString().split(",");
                }

                if (this.selectedIntegrationTypes != null) //separting Array which is having ","
                {
                    this.sourceItemMaster.IntegrationPortalId = this.selectedIntegrationTypes.toString().split(",");
                }


            }
            else //for Edit Screen
            {
                if (this.selectedAircraftTypes != null) //separting Array whic is having ","
                {
                    this.sourceItemMaster.AircraftTypeId = this.selectedAircraftTypes.toString().split(",");
                }


                if (this.selectedIntegrationTypes != null) //separting Array whic is having ","
                {
                    this.sourceItemMaster.IntegrationPortalId = this.selectedIntegrationTypes.toString().split(",");
                }



                this.sourceItemMaster.updatedBy = this.userName;
                this.sourceItemMaster.masterCompanyId = 1;
                this.sourceItemMaster.itemTypeId = 1;
                this.itemser.updateItemMaster(this.sourceItemMaster).subscribe(data => {
                    this.collectionofItemMaster = data;
                    this.saveCompleted(this.sourceItemMaster);
                    if (data != null) {
                        if (data.partId && data.itemMasterId) {
                            if (this.manfacturerAircraftmodelsarray.length >= 0) {
                                this.savemfginfo(data.partId, data.itemMasterId, this.manfacturerAircraftmodelsarray);
                            }
                            if (this.distributionAircraftmodelsarray.length >= 0) {
                                this.saveDistrbution(data.partId, data.itemMasterId, this.distributionAircraftmodelsarray);
                            }

                            if (this.overhaulAircraftmodelsarray.length >= 0) {
                                this.saveovhinfo(data.partId, data.itemMasterId, this.overhaulAircraftmodelsarray);
                            }
                            if (this.repairAircraftmodelsarray.length >= 0) {
                                this.saverepairinfo(data.partId, data.itemMasterId, this.repairAircraftmodelsarray);
                            }
                            if (this.certificationarrayAircraftmodelsarray.length >= 0) {
                                this.savecertification(data.partId, data.itemMasterId, this.certificationarrayAircraftmodelsarray);
                            }
                            if (this.exchangeAircraftmodelsarray.length >= 0) {
                                this.saveexcahneginfo(data.partId, data.itemMasterId, this.exchangeAircraftmodelsarray);
                            }
                            if (this.selectedModels.length > 0) {

                                this.saveAircraftmodelinfo(data.partId, data.itemMasterId, this.selectedModels);

                            }
                        }
                    }
                    this.alertService.startLoadingMessage();
                    this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-list')
                })
            }
        } else { }
    }



    salesfinalPrice(myValue, percentValue) {
        let afterpercent = percentValue / 100;
        let test = afterpercent * myValue;
        this.sourceItemMaster.salesPrice = myValue - test;
    }



    onPercentageCal(myValue, percentValue) {

        let afterpercent = percentValue / 100;
        let test = afterpercent * myValue;
        this.sourceItemMaster.purchaseListPriceAfterDiscount = myValue - test;

    }

    //for Insert AircraftData
    public AddCustomerAircraftdata(ItemMasterobject) {
        for (let i = 0; i < this.selectedAircraftTypes.length; i++) {
            ItemMasterobject.aircraftTypeId = this.selectedAircraftTypes[i];
            this.itemser.AddItemMasteraircrafttype(ItemMasterobject).subscribe(data => {
                this.localCollection = data;
            })
        }
    }



    saveManufacturer() {
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
            this.inteService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }


    filtermanufacturer(event) {

        this.localmanufacturer = [];
        if (this.allManufacturerInfo) {
            for (let i = 0; i < this.allManufacturerInfo.length; i++) {
                let name = this.allManufacturerInfo[i].name;
                if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.localmanufacturer.push(name);
                }
            }
        }
    }


    Mfacturer(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;

        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction.isActive = true;
        this.name = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    captureId(event) {
        if (this.itemclaColl) {
            for (let i = 0; i < this.itemclaColl.length; i++) {
                if (event == this.itemclaColl[i][0].partName) {
                    this.sourceItemMaster.partId = this.itemclaColl[i][0].partId;
                }
            }
        }
    }


    filterpartItems(event) {

        this.partCollection = [];
        this.itemclaColl = [];
        if (this.allPartnumbersInfo) {
            if (this.allPartnumbersInfo.length > 0) {

                for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
                    let partName = this.allPartnumbersInfo[i].partNumber;
                    if (partName) {
                        if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                            this.itemclaColl.push([{
                                "partId": this.allPartnumbersInfo[i].itemMasterId,
                                "partName": partName
                            }]),

                                this.partCollection.push(partName);
                        }
                    }
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
                        this.descriptionCollection.push(partDescription);
                    }
                }
            }
        }
    }


    partdescriptionId(event) {
        if (this.allPartnumbersInfo) {
            for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
                if (event == this.allPartnumbersInfo[i].partDescription) {
                    this.sourceItemMaster.partDescription = event;
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
                    this.disableSavepartDescription = true;
                }
                else {
                    this.disableSavepartDescription = false;
                }
            }
        }
    }


    private onIntegrationData(getEmployeeCerficationList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getEmployeeCerficationList;
        this.allintegrationdetails = getEmployeeCerficationList;
        if (this.allintegrationdetails.length > 0) {
            for (let i = 0; i < this.allintegrationdetails.length; i++)
                this.integrationvalues.push(
                    { value: this.allintegrationdetails[i].integrationPortalId, label: this.allintegrationdetails[i].description },
                );
        }

        let valAirCraft = [];
        this.itemser.getintegrationtypes(this.sourceItemMaster.itemMasterId)
            .subscribe(results => {
                this.allIntegrationInfo = results;
                if (results != null) {
                    for (let i = 0; i < this.allIntegrationInfo.length; i++) {
                        valAirCraft.push(this.allIntegrationInfo[i].integrationPortalId);
                    }
                    this.selectedIntegrationTypes = valAirCraft;
                    console.log(this.selectedIntegrationTypes);
                }

            },
                error => this.onDataLoadFailed(error)
            );
    }


    public AddIntegration(imObj) {
        for (let i = 0; i < this.selectedIntegrationTypes.length; i++) {
            imObj.employeeLeaveTypeId = this.selectedIntegrationTypes[i];
            this.itemser.Addmultileaves(imObj).subscribe(data => {
                this.localCollection = data;
            })
        }
    }



    private Integration() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.inteService.getWorkFlows().subscribe(
            results => this.onIntegrationData(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }


    classificationId(event) {
        if (this.allitemclassificationInfo) {
            for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
                if (event == this.allitemclassificationInfo[i].description) {
                    this.disableClassdesc = true;
                    this.selectedActionName = event;
                }
            }
        }
    }


    classificationtypeId(event) {
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
                this.disabletypeSave = true;
            }
            else {
                this.disabletypeSave = false;
            }
        }

    }


    saveCapabilitiesEnable() {
        this.isSaveCapes = true;
        this.modal.close();
    }


    saveCapabilities() {
        let capbilitiesForm = this.capabilitiesForm.value;
        let capabilityCollection: any = [];
        let mfgForm = capbilitiesForm.mfgForm;
        let overhaulForm = capbilitiesForm.overhaulForm;
        let distributionForm = capbilitiesForm.distributionForm;
        let certificationForm = capbilitiesForm.certificationForm;
        let repairForm = capbilitiesForm.repairForm;
        let exchangeForm = capbilitiesForm.exchangeForm;
        mfgForm.forEach(element => {
            element.itemMasterId = this.ItemMasterId
            capabilityCollection.push(element);
        });
        overhaulForm.forEach(element => {
            element.itemMasterId = this.ItemMasterId
            capabilityCollection.push(element);
        });
        distributionForm.forEach(element => {
            element.itemMasterId = this.ItemMasterId
            capabilityCollection.push(element);
        });
        certificationForm.forEach(element => {
            element.itemMasterId = this.ItemMasterId
            capabilityCollection.push(element);
        });
        repairForm.forEach(element => {
            element.itemMasterId = this.ItemMasterId
            capabilityCollection.push(element);
        });
        exchangeForm.forEach(element => {
            element.itemMasterId = this.ItemMasterId
            capabilityCollection.push(element);
        });

        this.itemser.saveManfacturerinforcapes(capabilityCollection).subscribe(data11 => {
            this.router.navigateByUrl("/itemmastersmodule/itemmasterpages/app-item-master-list");
        })

    }
    //calling for ATA Subchapter Data

    getATASubChapterData(ataMainId) {
        this.allSubChapter = [];
        this.vendorser.getATASubchapterData(ataMainId).subscribe( //calling and Subscribing for Address Data
            results => this.onDataLoadAtaSubChapterDataSuccessful(results[0]), //sending Address
            error => this.onDataLoadFailed(error)
        );
    }

    private onDataLoadAtaSubChapterDataSuccessful(data: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allSubChapter = data;
    }

    nhaHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {
                    this.disableSaveNHANumber = false;
                }
                else {
                    this.disableSaveNHANumber = true;
                }
            }

        }
    }


    onNHASelect(event) {
        if (this.itemclaColl) {
            for (let i = 0; i < this.itemclaColl.length; i++) {
                if (event == this.itemclaColl[i][0].partName) {
                    this.sourceItemMaster.partId = this.itemclaColl[i][0].partId;
                    this.disableSaveNHANumber = false;
                    this.selectedActionName = event;
                }
            }
        }
    }
    //adding for 
    currencySymbolSelection(currencyid) {
        if (currencyid) {
            for (let i = 0; i < this.allCurrencyInfo.length; i++) {
                if (currencyid == this.allCurrencyInfo[i].currencyId) {
                    this.currencySymbol = this.allCurrencyInfo[i].symbol;
                }
            }

        }
    }

    //Add Intehration Model for Add Multi

    addIntegrationModelSingle(integration) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceUOM = new UnitOfMeasure();
        this.sourceUOM.isActive = true;
        this.unitName = "";
        this.modal = this.modalService.open(integration, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    createIntegration() {
        this.isSaving = true;
        if (this.isEditMode == false) {
            this.sourceIntegration.createdBy = this.userName;
            this.sourceIntegration.updatedBy = this.userName;
            //this.sourceAction.description = this.integrationName;
            this.sourceIntegration.portalURL = this.portalURL;
            this.integrationService.newAction(this.sourceIntegration).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {
            this.sourceIntegration.updatedBy = this.userName;
            this.sourceIntegration.description = this.integrationName;
            this.sourceIntegration.portalURL = this.portalURL;
            this.integrationService.updateAction(this.sourceIntegration).subscribe(
                response => this.saveCompleted(this.sourceIntegration),
                error => this.saveFailedHelper(error));
        }
        this.modal.close();
    }

    integrationEventHandler(event) {
        let value = event.target.value.toLowerCase();
        if (this.selectedActionName) {
            if (value == this.selectedActionName.toLowerCase()) {
                //alert("Action Name already Exists");
                this.disableIntegrationSave = true;
            }
            else {
                this.disableIntegrationSave = false;
            }
        }

    }
    integrationPartnmId(event) {
        //debugger;
        for (let i = 0; i < this.integrationNamecolle.length; i++) {
            if (event == this.integrationNamecolle[i][0].integrationName) {
                //alert("Action Name already Exists");
                this.disableIntegrationSave = true;
                this.selectedActionName = event;
            }
        }
    }


    filterIntegrationsSelect(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allIntegrationInfo.length; i++) {
            let integrationName = this.allIntegrationInfo[i].description;
            if (integrationName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.integrationNamecolle.push([{
                    "chargeId": this.allIntegrationInfo[i].integrationPortalId,
                    "integrationName": integrationName
                }]),
                    this.localCollection.push(integrationName);
            }
        }
    }
}
