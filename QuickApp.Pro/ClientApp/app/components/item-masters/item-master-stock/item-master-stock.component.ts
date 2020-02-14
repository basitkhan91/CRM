import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog, SELECT_MULTIPLE_PANEL_PADDING_X } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../../models/mastercompany.model';
import { AuditHistory } from '../../../models/audithistory.model';
import { AuthService } from '../../../services/auth.service';
import { MessageSeverity, AlertService } from '../../../services/alert.service';
import { ItemMasterService } from '../../../services/itemMaster.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Integration } from '../../../models/integration.model';
import { IntegrationService } from '../../../services/integration-service';
import { ItemClassificationService } from '../../../services/item-classfication.service';
import { ItemClassificationModel } from '../../../models/item-classification.model';
import { OnInit, AfterViewInit, Component, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
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
import { LegalEntityService } from '../../../services/legalentity.service';
import { ATAChapter } from '../../../models/atachapter.model';
import { FormArray } from '@angular/forms';
import { ItemMasterCapabilitiesModel } from '../../../models/itemMasterCapabilities.model';
import { GlAccountService } from '../../../services/glAccount/glAccount.service';
import { GlAccount } from '../../../models/GlAccount.model';
import { VendorService } from '../../../services/vendor.service';
import { MenuItem } from 'primeng/api';
import { AircraftDashNumber } from '../../../models/dashnumber.model';
import { AircraftModel } from '../../../models/aircraft-model.model';
import { AircraftModelService } from '../../../services/aircraft-model/aircraft-model.service';
import { AircraftManufacturerService } from '../../../services/aircraft-manufacturer/aircraftManufacturer.service';
import { AtaSubChapter1Service } from '../../../services/atasubchapter1.service';
import { CustomerService } from '../../../services/customer.service';
import { PublicationService } from '../../../services/publication.service';
import { DashNumberService } from '../../../services/dash-number/dash-number.service';
import { CommonService } from '../../../services/common.service';
import { ItemMasterExchangeLoanComponent } from '../item-master-exch-loan/item-master-exch-loan.component';
import { ConfigurationService } from '../../../services/configuration.service';
import { pulloutRequiredFieldsOfForm } from '../../../validations/form.validator';

import { SiteService } from '../../../services/site.service';
import { Site } from '../../../models/site.model';
import { StocklineService } from '../../../services/stockline.service';
import { DBkeys } from '../../../services/db-Keys';
import { getObjectByValue, getPageCount, getObjectById, getValueFromObjectByKey, editValueAssignByCondition, getValueFromArrayOfObjectById } from '../../../generic/autocomplete';
import { AssetAcquisitionType } from '../../../models/asset-acquisition-type.model';
import { AssetAcquisitionTypeService } from "../../../services/asset-acquisition-type/asset-acquisition-type.service";


@Component({
    selector: 'app-item-master-stock',
    templateUrl: './item-master-stock.component.html',
    styleUrls: ['./item-master-stock.component.scss']
})

/** item-master-stock component*/
export class ItemMasterStockComponent implements OnInit, AfterViewInit {
    @ViewChild('exchLoan') exchLoan: ItemMasterExchangeLoanComponent;
    defaultRotableId: any ;
    dataSourceValue: MatTableDataSource<Priority>;
    disables: boolean = false;
    disable1: boolean = true;
    disabled: boolean = false;
    disableSave: boolean;
    view: boolean = false;
    unitofmeasureValue: any[];
    disableIntegrationSave: boolean;
    currencySymbol: any;
    bulist: any[] = [];
    public sourcePS: any = {};
    public sourceAircraft: any = {};
    bulistovh: any[] = [];
    departmentList: any[] = [];
    departmentListovh: any[] = [];
    divisionlist: any[] = [];
    disableuomvalue: boolean = false;
    divisionlistovh: any[] = [];
    maincompanylist: any[] = [];
    allManagemtninfo: any[] = [];
    selectdescription: any;
    aircraftList: any[];
    aircraftListData: any[];
    itemdescription: any[] = [];
    showexportData: boolean;
    showGeneralData: boolean = true;
    showpurchaseData: boolean;
    disableManufacturer: boolean;
    disableSaveglAccount: boolean;
    glAccountCollection: any[];
    enablePopupData: boolean = false;
    display: boolean = false;
    modelValue: boolean = false;
    allCapesData: any[] = [];
    enablePlus: boolean = false;
    public sourceAction: any = {};
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
    selectedIntegration: any;
    disableSaveStockUOM: boolean;
    selectedStockUOM: any;
    disableSaveConsume: boolean;
    selectedConsume: any;
    disableSaveSOLD: boolean;
    disableSavepn: boolean;
    selectedSOLD: any;
    disableSaveIntegration: boolean;
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
    actionamecolle: any[] = [];
    partCollection: any[];
    oempnCollection: any[];
    manufacturerCollection: any[];
    allPartnumbersInfo: any[];
    allpnNumbers: any[];
    name: string;
    allglAccountInfo: any[];
    glAccountcla: any[];
    localmanufacturer: any[] = [];
    sourcemanufacturer: any = {};
    allManufacturerInfo: any[];
    allActions: any[];
    provisionName: any = {};
    shiftValues: any[] = [];
    modelValues: any[] = [];
    selectedModelValues: any;
    allaircraftInfo: any[];
    allAircraftinfo: any[];
    selectedAircraftTypes: any;
    allWarninginfo: any[];
    localunit: any[];
    unitName: string;
    none: any;
    allCountryInfo: any[];
    countryName: any[];
    allCurrencyInfo: any[];
    localpriority: any[];
    priorityName: string;
    itemclaColl: any[];
    oempnNumber: any[];
    ProvisionNumber: any[];
    manufacturerNumber: any[];
    integrationName: string;
    localintegration: any[];
    allIntegrationInfo: Integration[];
    localatamain: any[];
    ataChapterName: string;
    localprovision: any[] = [];
    localgroup: any[] = [];
    //allProvisonInfo: Provision[];
    allProvisonInfo: any = [];
    activeTab: number = 0;
    itemQuantity = [];
    items1: MenuItem[];
    activeItem: MenuItem;
    itemGroupName: string;
    manufacturerName: string;
    partNumber: any;
    pmaNumber: any;
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
    getALlUOM: any;
    classnamecolle: any[] = [];
    classificationtypecolle: any[] = [];
    displayedColumns = ['itemclassificationId', 'itemclassificationCode', 'description', 'memo'];
    dataSource: MatTableDataSource<ItemClassificationModel>;
    allitemclassificationInfo: ItemClassificationModel[];
    allComapnies: MasterCompany[] = [];
    allitemgroupobjInfo: Itemgroup[];
    private isSaving: boolean;
    countrycollection: any[];
    allCountryinfo: any[];
    public sourceActions: any = {};
    public sourceUomModel: any = {};
    allATAMaininfo: ATAChapter[];
    allPriorityInfo: Priority[] = [];
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
    PDropdownDirectives: any = []
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
    selected: any[] = [];
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
    portalURL: any;
    public sourceIntegration: any = {};
    integrationNamecolle: any[] = [];
    cols1: any[];
    ataMainchapter: ATAChapter[]
    showAircraftData: boolean = false;
    showAtachapter: boolean = false;
    selectedAircraftId: any;
    selectedModelId: any;
    //new code-- for purchase and sales calculation
    itemQuantitys = [];
    sales: any[];
    atasub: any[];
    sales2: any[];
    salesDash: any[];
    modalDash: any[];
    currentDashNumberType: AircraftDashNumber;
    selectedAircrafttype: AircraftDashNumber;
    currentAtaNumber: ATAChapter;
    // aircraftManufacturerList = [];
    aircraftModelsList: AircraftModel[];
    atasubchapter = [];
    LoadAircraftmanufacturer: any[] = [];
    LoadAtachapter: any[] = [];
    vendorPrice: any;
    purchaseDiscount: any;
    pnDescription: any;
    ManufacturerValue: any;
    alternatePn: any;
    ataform: FormGroup;
    memoNotes: string = 'Add Memo Entry';
    manufacturerValue: FormGroup;
    ataChaptherSelected: any;
    modelUnknown = false;
    dashNumberUnknown = false;
    newFields = {
        Condition: null,
        PP_UOMId: null,
        PP_CurrencyId: null,
        PP_FXRatePerc: null,
        PP_VendorListPrice: null,
        PP_LastListPriceDate: new Date(),
        PP_PurchaseDiscPerc: null,
        PP_LastPurchaseDiscDate: new Date(),
        PP_PurchaseDiscAmount: null,
        PP_UnitPurchasePrice: null,
        SP_FSP_UOMId: null,
        SP_FSP_CurrencyId: null,
        SP_FSP_FXRatePerc: null,
        SP_FSP_FlatPriceAmount: null,
        SP_FSP_LastFlatPriceDate: new Date(),
        SP_CalSPByPP_MarkUpPercOnListPrice: null,
        SP_CalSPByPP_MarkUpAmount: null,
        SP_CalSPByPP_LastMarkUpDate: new Date(),
        SP_CalSPByPP_BaseSalePrice: null,
        SP_CalSPByPP_SaleDiscPerc: null,
        SP_CalSPByPP_SaleDiscAmount: null,
        SP_CalSPByPP_LastSalesDiscDate: new Date(),
        SP_CalSPByPP_UnitSalePrice: null
    }
    aircraftData: any;
    selectedAtAChapther: ATAChapter[];
    ataMappedList: any;
    enableDNMemo: boolean = true;
    indexOfrow: any;
    activeMenuItem: number = 1;
    activeNTAEMenuItem: number = 1;
    currentTab: string = 'General';
    currentNTAETab: string = 'NHA';
    manufacturer: any;
    aircraftManfacturerIdsUrl: any = '';
    aircraftModelsIdUrl: any = '';
    dashNumberIdUrl: any = '';
    searchAircraftParams: string = '';
    aircraftModelList: { label: string; value: number; }[] = [];
    dashNumberList: any = [];
    viewTable: boolean = false;
    aircraftdata = [];
    selectedDashnumber: any;
    dashNumberUrl: any;
    newDashnumValue: any = [];
    selectAircraftManfacturer: any = [];
    selectedAircraftModel: any = [];
    selectedDashNumbers: any = [];
    selectedATAchapter: any = [];
    ataChapterIdUrl: any = '';
    selectedATASubChapter: any = [];
    ataSubchapterIdUrl: any = '';
    searchATAParams: string = '';
    isDisabledSteps = false;
    isNTAEDisabledSteps = true;
    isEdit: boolean = false;
    itemMasterId: number;
    fieldArray: any = [];
    row: any;
    Delete = true;
    allpriority: any[] = [];
    allIntegration: any[] = [];
    selectedreason: any;
    exportInfo = {
        ExportECCN: '',
        ITARNumber: '',
        ExportUomId: null,
        ExportCountryId: null,
        ExportValue: null,
        ExportCurrencyId: null,
        ExportWeight: null,
        ExportWeightUnit: null,
        ExportSizeLength: null,
        ExportSizeWidth: null,
        ExportSizeHeight: null,
        IsExportUnspecified: false,
        IsExportMilitary: false,
        IsExportNONMilitary: false,
        IsExportDual: false,
        unitOfMeasureId: ''
    }
    tempOEMpartNumberId: number = null;
    tempExportCountryId: number = null;
    isItemMasterCreated: boolean = false;
    isValidClassification: boolean = false;
    oemPnData: any;
    //capes
    capabilityTypeList: any = [];
    selectedCapabilityTypes: any = [];
    capeBldList: any = [];
    distinctAtaList: any[] = [];
    listOfErrors: any = [];
    conditionList: any;
    revisedPartNumbersList: any = [];
    formData = new FormData();
    allUploadedDocumentsList: any = [];
    documentDeleted: boolean;
    allSites: any[] = [];
    wareHouseData: any[] = [];
    locationData: any[] = [];
    shelfData: any[] = [];
    binData: any[] = [];
    isEnableItemMaster: boolean = true;
    orginalAtaSubChapterValues: any[] = [];
    AssetAcquisitionTypeList: AssetAcquisitionType[] = [];
    aircraftTablePageSize: number = 10;
    totalAircraftRecords: any;
    totalAircraftPages: number;
    selectedItemClassificationName: any = "";

    // errorLogForPS: string = '';

    constructor(private fb: FormBuilder, public priorityService: PriorityService, public countryservice: CustomerService, private Dashnumservice: DashNumberService, private atasubchapter1service: AtaSubChapter1Service, private atamain: AtaMainService, private aircraftManufacturerService: AircraftManufacturerService, private aircraftModelService: AircraftModelService, private Publicationservice: PublicationService, public integrationService: IntegrationService, private formBuilder: FormBuilder, public workFlowtService1: LegalEntityService, private changeDetectorRef: ChangeDetectorRef, private router: Router,
        private authService: AuthService, public unitService: UnitOfMeasureService, private modalService: NgbModal, private glAccountService: GlAccountService, public vendorser: VendorService,
        public itemser: ItemMasterService, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public ataMainSer: AtaMainService,
        public currency: CurrencyService, private _actRoute: ActivatedRoute,
        public priority: PriorityService, public inteService: IntegrationService,
        public workFlowtService: ItemClassificationService, public itemservice: ItemGroupService,
        public proService: ProvisionService, private dialog: MatDialog,
        private masterComapnyService: MasterComapnyService, public commonService: CommonService, @Inject(DOCUMENT) document, private configurations: ConfigurationService, public siteService: SiteService, public stockLineService: StocklineService, private AssetAcquisitionTypeService: AssetAcquisitionTypeService) {
        this.itemser.currentUrl = '/itemmastersmodule/itemmasterpages/app-item-master-stock';
        this.itemser.bredcrumbObj.next(this.itemser.currentUrl);//Bread Crumb
        this.displayedColumns.push('action');
        this.formData = new FormData();
        this.dataSource = new MatTableDataSource();
        this.CurrencyData();
        this.sourceItemMaster = {
            partNumber: "",
            partDescription: ""
        }
        
        this.PDropdownDirectives = ["partNumber", "partDescription"];
        //Adding Below Code for By Default Date Should be current Date while Creation
        this.sourceItemMaster.salesLastSalePriceDate = new Date();
        this.sourceItemMaster.salesLastSalesDiscountPercentDate = new Date();
        // checks the params id with the url 
        this.itemMasterId = this._actRoute.snapshot.params['id'];
        if (this.itemMasterId !== undefined) {
            // get the itemmaster data by id
            this.isEdit = true;
            this.isItemMasterCreated = true;
            this.getItemMasterDetailsById()
           

        }
        this.Integration();



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

    colsaircraftLD = [
        { field: "aircraft", header: "Aircraft" },
        { field: "model", header: "Model" },
        { field: "dashNumber", header: "Dash Numbers" }
    ];
    selectedAircraftLDColumns = this.colsaircraftLD;
    colaircraft: any[] = [
        { field: "AircraftType", header: "Aircraft" },
        { field: "AircraftModel", header: "Model" },
        { field: "DashNumber", header: "Dash Numbers" },
    ];
    capesColumns: any[] = [
        { field: 'capability', header: "CAPABILITY TYPES" },
        { field: 'entity', header: "ENTITY" },
        { field: 'company', header: "COMPANY" },
        { field: 'bu', header: "BU" },
        { field: 'division', header: "DIVISION" },
        { field: 'dep', header: "DEP" },
        { field: 'manufacturer', header: "MANUFACTURER" },
        { field: 'aircaft', header: "AIRCRAFT" },
        { field: 'model', header: "MODEL" },
        { field: 'dashnumber', header: "DASH NUM" },
        { field: 'description', header: "DESCRIPTION" },
        { field: 'ataChapter', header: "ATA CHAPTER" },
        { field: 'atasubchapter', header: "ATA SUBCHAPTER" },
        { field: 'entrydate', header: "ENTRY DATE" },
        { field: 'cmmid', header: "CMM ID" },
        { field: 'verified', header: "VERIFIED" },
        { field: 'verifiedby', header: "VERIFIED BY" },
        { field: 'dateverified', header: "DATE VERIFIED" },
        { field: 'ntehrs', header: "NTE HRS" },
        { field: 'tat', header: "TAT" },
        { field: 'memo', header: "MEMO" },
    ];
    aircraftListDataValues: any = [];
    capesListDataValues: any;
    showAdvancedSearchCard: boolean = false;


    ngOnInit(): void {
        this.defaultRotableId = DBkeys.DEFAULT_ROTABLE_ID;
        this.ataform = this.fb.group({
            atanumber: new FormControl('', Validators.required),
            atasubchaptername: new FormControl('', Validators.required)
        });
        this.manufacturerValue = this.fb.group({
            'manufacturer': new FormControl('', Validators.required)
        });
        // this.itemser.getMappedAirCraftDetails(this.sourceItemMaster.itemMasterId).subscribe(data => {
        //     this.aircraftListDataValues = data.map(x => {
        //         return {
        //             aircraft: x.aircraftType,
        //             model: x.aircraftModel,
        //             dashNumber: x.dashNumber,
        //             memo: x.memo,
        //         }
        //     })
        //     // resetting popup Data
        //     this.aircraftData = undefined;
        //     this.selectedAircraftId = []
        //     this.selectedModelId = undefined;
        //     this.selectedDashnumber = undefined;
        //});
        // this.addFieldValue();
        // this.getAtachapter();
        this.modalDash = [
            { field: 'aircraft', header: 'Aircraft' },
            { field: 'model', header: 'Model' },
        ];
        this.salesDash = [
            { aircraft: '', model: '', dashnumber: '' },
            { aircraft: '', model: '', dashnumber: '' },
        ];

        this.atasub = [
            { field: 'ataChapterName', header: 'ATA Chapter' },
            { field: 'ataSubChapterDescription', header: 'ATA Sub-Chapter' }
        ];
        this.itemQuantity = Array(100).fill(1).map((x, i) => i + 1);
        this.itemQuantitys = Array(100).fill(1).map((x, i) => i + 1);
        // this.items1 = [
        //     { label: 'General Information', icon: 'fa fa-fw fa-info-circle', command: (onclick: any) => this.moveGeneralInfromation() },
        //     { label: 'Aircraft Information', icon: 'fa fa-fw fa-paper-plane', command: (onclick: any) => this.moveAircraftInformation() },
        //     { label: 'ATA Chapter', icon: 'fa fa-fw fa-paper-plane', command: (onclick: any) => this.moveAtachapter() },
        //     { label: 'Purchase and Sales', icon: 'fa fa-fw fa-shopping-cart', command: (onclick: any) => this.movePurchaseInformation() },
        //     { label: 'Export Information', icon: 'fa fa-fw fa-external-link', command: (onclick: any) => this.moveExportInformation() },
        // ];
        this.loadManagementdata();
        this.manufacturerdata();
        // get all aircraft Manfacturer
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
        this.countrylist();
        this.sourceItemMaster.salesIsFixedPrice = true;
        this.capabilitiesForm = this.formBuilder.group({
            mfgForm: this.formBuilder.array([]),
            overhaulForm: this.formBuilder.array([]),
            distributionForm: this.formBuilder.array([]),
            certificationForm: this.formBuilder.array([]),
            repairForm: this.formBuilder.array([]),
            exchangeForm: this.formBuilder.array([])
        });
        this.getAllAircraftModels();
        this.getAllDashNumbers();
        this.getAllATAChapter();
        // this.getAllATASubChapter();
        this.getAllSubChapters();
        this.getCapabilityType();
        this.getConditionsList();
        this.loadSiteData();
        this.getAcquisitionTypeList();



        // //cutom
        // this.itemser.getMappedAirCraftDetails(this.ItemMasterId).subscribe(data => {
        //     this.aircraftListData = data.map(x => {
        //         return {
        //             aircraft: x.aircraftType,
        //             model: x.aircraftModel,
        //             dashNumber: x.dashNumber,
        //             memo: x.memo,
        //         }
        //     })
        //     // resetting popup Data
        //     /*this.aircraftData = undefined;
        //     this.selectedAircraftId = []
        //     this.selectedModelId = undefined;
        //     this.selectedDashnumber = undefined;*/
        // })

        // //cutom
        // this.itemser.getMappedATADetails(this.ItemMasterId).subscribe(data => {
        //     this.aircraftListData = data.map(x => {
        //         return {
        //             aircraft: x.aircraftType,
        //             model: x.aircraftModel,
        //             dashNumber: x.dashNumber,
        //             memo: x.memo,
        //         }
        //     })
        // })


    }

    //Gneral Infor - Get Acquisition Types List
    getAcquisitionTypeList() {
        this.AssetAcquisitionTypeService.getAll().subscribe(data => {
            this.AssetAcquisitionTypeList = data[0].columnData;
            console.log(this.AssetAcquisitionTypeList, "this.AssetAcquisitionTypeList+++")
        });
    }

    getItemMasterDetailsById(){
        this.itemser.getItemMasterDetailById(this.itemMasterId).subscribe(res => {
            const responseDataOfEdit = res;
            this.isDisabledSteps = true;
            this.sourceItemMaster = responseDataOfEdit[0];
            this.onItemClassificationChange(this.sourceItemMaster.itemClassificationId)
            if (this.sourceItemMaster.siteId) {
                this.siteValueChange()
            }
            if (this.sourceItemMaster.warehouseId) {
                this.wareHouseValueChange()
            }
            if (this.sourceItemMaster.locationId) {
                this.locationValueChange()
            }
            if (this.sourceItemMaster.shelfId) {
                this.shelfValueChange()
            }
            this.sourceItemMaster.expirationDate = new Date(this.sourceItemMaster.expirationDate);
            this.Integration();
            this.sourceItemMaster.oemPNId = this.sourceItemMaster.oemPNData[0]
            this.ItemMasterId = this.itemMasterId;
            // assign the header values
            this.pnvalue = this.sourceItemMaster.partNumber;
            this.pnDescription = this.sourceItemMaster.partDescription;
            this.ManufacturerValue = this.sourceItemMaster.manufacturerName;
            this.alternatePn = this.sourceItemMaster.partAlternatePartId;

            this.itemser.getPurcSaleDetailById(this.itemMasterId).subscribe(res => {


                this.fieldArray = res.map(x => {
                    return {
                        Condition: x.condition,
                        PP_UOMId: x.pP_UOMId,
                        PP_CurrencyId: x.pP_CurrencyId,
                        PP_FXRatePerc: x.pP_FXRatePerc,
                        PP_VendorListPrice: x.pP_VendorListPrice,
                        PP_LastListPriceDate: x.pP_LastListPriceDate,
                        PP_PurchaseDiscPerc: x.pP_PurchaseDiscPerc,
                        PP_LastPurchaseDiscDate: x.pP_LastPurchaseDiscDate,
                        PP_PurchaseDiscAmount: x.pP_PurchaseDiscAmount,
                        PP_UnitPurchasePrice: x.pP_UnitPurchasePrice,
                        SP_FSP_UOMId: x.sP_FSP_UOMId,
                        SP_FSP_CurrencyId: x.sP_FSP_CurrencyId,
                        SP_FSP_FXRatePerc: x.sP_FSP_FXRatePerc,
                        SP_FSP_FlatPriceAmount: x.sP_FSP_FlatPriceAmount,
                        SP_FSP_LastFlatPriceDate: x.sP_FSP_LastFlatPriceDate,
                        SP_CalSPByPP_MarkUpPercOnListPrice: x.sP_CalSPByPP_MarkUpPercOnListPrice,
                        SP_CalSPByPP_MarkUpAmount: x.sP_CalSPByPP_MarkUpAmount,
                        SP_CalSPByPP_LastMarkUpDate: x.sP_CalSPByPP_LastMarkUpDate,
                        SP_CalSPByPP_BaseSalePrice: x.sP_CalSPByPP_BaseSalePrice,
                        SP_CalSPByPP_SaleDiscPerc: x.sP_CalSPByPP_SaleDiscPerc,
                        SP_CalSPByPP_SaleDiscAmount: x.sP_CalSPByPP_SaleDiscAmount,
                        SP_CalSPByPP_LastSalesDiscDate: x.sP_CalSPByPP_LastSalesDiscDate,
                        SP_CalSPByPP_UnitSalePrice: x.sP_CalSPByPP_UnitSalePrice
                    }
                })

            })



            // binding the export information data on edit
            this.exportInfo = {
                unitOfMeasureId: this.sourceItemMaster.unitOfMeasureId || null,
                ExportECCN: this.sourceItemMaster.exportECCN,
                ITARNumber: this.sourceItemMaster.itarNumber,
                ExportUomId: this.sourceItemMaster.exportUomId,
                ExportCountryId: this.sourceItemMaster.countryData[0],
                ExportValue: this.sourceItemMaster.exportValue,
                ExportCurrencyId: this.sourceItemMaster.exportCurrencyId,
                ExportWeight: this.sourceItemMaster.exportWeight,
                ExportWeightUnit: parseInt(this.sourceItemMaster.exportWeightUnit),
                ExportSizeLength: this.sourceItemMaster.exportSizeLength,
                ExportSizeWidth: this.sourceItemMaster.exportSizeWidth,
                ExportSizeHeight: this.sourceItemMaster.exportSizeHeight,
                IsExportUnspecified: this.sourceItemMaster.isExportUnspecified || false,
                IsExportMilitary: this.sourceItemMaster.isExportMilitary || false,
                IsExportNONMilitary: this.sourceItemMaster.isExportNONMilitary || false,
                IsExportDual: this.sourceItemMaster.isExportDual || false,
            }
            // validate classification required in Export Information
            this.validateClassificationRequired()
            this.getAircraftMappedDataByItemMasterId();
            this.toGetAllDocumentsList(this.ItemMasterId);
        })
    }
    

    private loadSiteData()  //retriving Information
    {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.siteService.getSiteList().subscribe(   //Getting Site List Hear
            results => this.onSiteDataLoadSuccessful(results[0]), //Pasing first Array and calling Method
            error => this.onDataLoadFailed(error)
        );

    }
    private onSiteDataLoadSuccessful(getSiteList: Site[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allSites = getSiteList; //Contain first array of Loaded table Data will put in Html as [value]

        //console.log(this.allSites);
    }
    siteValueChange() //Site Valu Selection in Form
    {
        this.stockLineService.getWareHouseDataBySiteId(this.sourceItemMaster.siteId).subscribe(
            result => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;
                this.wareHouseData = result;
            },
            error => this.onDataLoadFailed(error)
        )

    }
    wareHouseValueChange() //Site Valu Selection in Form
    {
        this.stockLineService.getLocationDataByWarehouseId(this.sourceItemMaster.warehouseId).subscribe(
            result => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;
                this.locationData = result;
            },
            error => this.onDataLoadFailed(error)
        )

    }
    locationValueChange() //Site Valu Selection in Form
    {
        this.stockLineService.getShelfDataByLocationId(this.sourceItemMaster.locationId).subscribe(
            result => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;
                this.shelfData = result;
            },
            error => this.onDataLoadFailed(error)
        )

    }
    shelfValueChange() //Site Valu Selection in Form
    {
        this.stockLineService.getBinDataByShelfId(this.sourceItemMaster.shelfId).subscribe(
            result => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;
                this.binData = result;
            },
            error => this.onDataLoadFailed(error)
        )

    }
    errorMessageHandler(log) {
        this.alertService.showMessage(
            'Error',
            log.error.error,
            MessageSeverity.error
        );
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


    selectedCountry(event) {
        console.log(event);
    }

    // get All Aircraft 
    private aircraftManfacturerData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.itemser.getAircraft().subscribe(
            results => this.onDataLoadaircraftManfacturerSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    changeValueStringToInt(value) {

        return parseFloat(value);
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

    onItemClassificationChange(val){
        this.selectedItemClassificationName = getValueFromArrayOfObjectById('description', 'itemClassificationId', this.sourceItemMaster.itemClassificationId, this.allitemclassificationInfo)  
    }

    enableDisableAdvancedSearch(val) {
        this.showAdvancedSearchCard = val;
        // this.search_SelectedContact = [];
        // this.search_SelectedATA = [];
        // this.search_SelectedATASubChapter = [];
        // this.getMappedATAByCustomerId();
        this.selectAircraftManfacturer = '';
        this.selectedAircraftModel = [];
        this.selectedDashNumbers = [];
        this.aircraftManfacturerIdsUrl = '';
        this.aircraftModelsIdUrl = '';
        this.dashNumberIdUrl = '';
        this.getAircraftMappedDataByItemMasterId();
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
    //equipment() {
    //    this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-equipment');
    //}
    //exchange() {
    //    this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-exchange');
    //}
    //loan() {
    //    this.router.navigateByUrl('/itemmastersmodule/itemmasterpages/app-item-master-loan');
    //}


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public allWorkFlows: any[] = [];

    public allWorkFlowValues: Integration[] = [];

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
        console.log("this.allitemclassificationInfo:::", this.allitemclassificationInfo)
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
        console.log("this.allManufacturerInfo", this.allManufacturerInfo)

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
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
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
        console.log(allWorkFlows, "allWorkFlows+++")
        this.revisedPartNumbersList = [];
        for (let i = 0; i < allWorkFlows.length; i++) {
            if (this.isEdit == true) {
                if (allWorkFlows[i].itemMasterId != this.itemMasterId) {
                    this.revisedPartNumbersList.push({
                        itemMasterId: allWorkFlows[i].itemMasterId,
                        partNumber: allWorkFlows[i].partNumber
                    })
                }
            } else {
                this.revisedPartNumbersList.push({
                    itemMasterId: allWorkFlows[i].itemMasterId,
                    partNumber: allWorkFlows[i].partNumber
                })
            }
        }
        this.allpnNumbers = allWorkFlows;
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
        console.log(this.allUnitOfMeasureinfo);



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
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
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

        if (this.itemser.listCollection != null && this.itemser.isEditMode == true) {
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


    private onDatainteSuccessful(allWorkFlowValues: Integration[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allIntegrationInfo = allWorkFlowValues;
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
        //  this.allProvisonInfofilter = getProvisionList;

        // alert(JSON.stringify(this.allProvisonInfo.));

        if (getProvisionList != null) {
            for (let i = 0; i < getProvisionList.length; i++) {
                if (getProvisionList[i].isActive === true) {
                    this.allProvisonInfo.push(getProvisionList[i]);
                }
            }
        }
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
                    }

                },
                    error => this.onDataLoadFailed(error)
                );
        }

    }


    openModelPopups(capData) {

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
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
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

        this.modal = this.modalService.open(capData, { size: 'sm', backdrop: 'static', keyboard: false });
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
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
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
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    waning(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
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
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
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

    ManufacturerHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {
                    this.disableManufacturer = true;
                }
                else {
                    this.disableManufacturer = false;

                }
            }

        }
    }

    pmeventHandler(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {
                    this.disableSavepn = true;
                }
                else {
                    this.disableSavepn = false;
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

    pnId(event) {
        if (this.oempnNumber) {
            for (let i = 0; i < this.oempnNumber.length; i++) {
                if (event == this.oempnNumber[i][0].partName) {
                    this.sourceItemMaster.partId = this.oempnNumber[i][0].partId;
                    this.disableSavepn = true;
                    this.selectedActionName = event;
                }
            }
        }
    }

    manufacturerId(event) {
        if (this.manufacturerNumber) {
            for (let i = 0; i < this.manufacturerNumber.length; i++) {
                if (event == this.manufacturerNumber[i][0].name) {
                    this.sourcemanufacturer.name = this.manufacturerNumber[i][0].name;
                    this.disableManufacturer = true;
                    this.selectedActionName = event;
                }
            }
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
                    // this.disableSavepartDescription = false;
                }
            }

        }
    }
    //ItemHandler(event) {
    //    if (event.target.value != "") {
    //        let value = event.target.value.toLowerCase();
    //        if (this.selectedItemCode) {
    //            if (value == this.selectedItemCode.toLowerCase()) {
    //                this.disableSaveItemClassficationCode = true;

    //            }
    //            else {
    //                this.disableSaveItemClassficationCode = false;

    //            }
    //        }

    //    }
    //}


    //ItemClassficationCode(event) {
    //    if (this.allitemclassificationInfo) {
    //        for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
    //            if (event == this.allitemclassificationInfo[i].itemClassificationCode) {
    //                this.sourceItemMaster.itemClassificationCode = this.allitemclassificationInfo[i].itemClassificationCode;
    //                this.disableSaveItemClassficationCode = true;
    //                this.selectedItemCode = event;
    //            }

    //        }
    //    }
    //}

    //filterItems(event) {

    //    this.localCollection = [];
    //    if (this.allitemclassificationInfo) {
    //        for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
    //            let itemName = this.allitemclassificationInfo[i].itemClassificationCode;
    //            if (itemName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                this.localCollection.push(itemName);
    //            }
    //        }
    //    }
    //}
    ItemHandler(event) {
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


    ItemClassficationCode(event) {
        for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
            if (event == this.allitemclassificationInfo[i].itemClassificationCode) {
                this.sourceItemMaster.itemClassificationCode = this.allitemclassificationInfo[i].itemClassificationCode;
                this.disableSaveItemClassficationCode = true;
                this.selectedItemCode = event;
            }
        }

    }

    filterItems(event) {

        this.localCollection = [];

        for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
            let itemName = this.allitemclassificationInfo[i].itemClassificationCode;
            if (itemName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.localCollection.push(itemName);
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


    Manufacturerdescription(event) {
        if (this.allManufacturerInfo) {
            for (let i = 0; i < this.allManufacturerInfo.length; i++) {
                if (event == this.allManufacturerInfo[i].name) {
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
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
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
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
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
        this.ProvisionNumber = [];
        if (this.allProvisonInfo) {
            for (let i = 0; i < this.allProvisonInfo.length; i++) {
                let provisionName = this.allProvisonInfo[i].description;
                if (provisionName) {
                    if (provisionName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                        if (this.allProvisonInfo[i].isActive === true) {
                            this.ProvisionNumber.push([{
                                "provisionId": this.allProvisonInfo[i].provisionId,
                                "provisionName": provisionName
                            }]),
                                this.localprovision.push(provisionName)
                        }
                    }
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
        this.modal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })

    }



    // editItemAndCloseModel() {

    //     console.log(this.sourceItemMaster.AircraftTypeId);

    //     this.isSaving = true;
    //     if (this.isEditMode == false) {
    //         this.sourceAction.createdBy = this.userName;
    //         this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.itemClassificationCode = this.itemName;
    //         this.sourceAction.masterCompanyId = 1;

    //         if (this.selectedAircraftTypes != null) //separting Array which is having ","
    //         {
    //             // this.sourceAction.AircraftTypeId = this.selectedAircraftTypes.toString().split(",");
    //         }
    //         this.workFlowtService.newAction(this.sourceAction).subscribe(
    //             role => this.saveSuccessHelper(role),
    //             error => this.saveFailedHelper(error));
    //         this.activeIndex = 0;
    //     }
    //     else {
    //         //Adding when we select Multiple Aircrafts 
    //         if (this.selectedAircraftTypes != null) //separting Array whic is having ","
    //             // {
    //             //     this.sourceItemMaster.AircraftTypeId = this.selectedAircraftTypes.toString().split(",");
    //             // }
    //             this.sourceAction.updatedBy = this.userName;
    //         this.sourceAction.itemClassificationCode = this.itemName;
    //         this.sourceAction.masterCompanyId = 1;
    //         this.workFlowtService.updateAction(this.sourceAction).subscribe(
    //             response => this.saveCompleted(this.sourceAction),
    //             error => this.saveFailedHelper(error));
    //     }
    // }


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
        //console.log(this.selectedModels);
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
        // console.log(this.bulist);
    }


    getBUListDistribution(selItem, masterCompanyId) {
        let _bulist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == masterCompanyId) {
                _bulist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["bulistdistribution"] = _bulist;
        //console.log(this.bulist);
    }


    getBUListcertificate(selItem, masterCompanyId) {
        let _bulist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == masterCompanyId) {
                _bulist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["bulistcertificate"] = _bulist;
        //console.log(this.bulist);
    }


    getBUListexcahnge(selItem, masterCompanyId) {
        let _bulist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == masterCompanyId) {
                _bulist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["bulistexcahnge"] = _bulist;
        //console.log(this.bulist);
    }


    getBUListrepair(selItem, masterCompanyId) {
        let _bulist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == masterCompanyId) {
                _bulist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["bulistrepair"] = _bulist;
        //console.log(this.bulist);
    }



    getDepartmentlistrepair(selItem, buid) {
        let _departmentList = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == buid) {
                _departmentList.push(this.allManagemtninfo[i]);
            }
        }
        selItem["departmentListrepair"] = _departmentList;
        //console.log(this.departmentList);
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
        //console.log(this.departmentList);
    }


    getDepartmentlistovh(selItem, buid) {
        let _departmentList = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == buid) {
                _departmentList.push(this.allManagemtninfo[i]);
            }
        }
        selItem["departmentListovh"] = _departmentList;
        //console.log(this.departmentList);
    }


    getDepartmentlistcertificate(selItem, buid) {
        let _departmentList = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == buid) {
                _departmentList.push(this.allManagemtninfo[i]);
            }
        }
        selItem["departmentListcertificate"] = _departmentList;
        //console.log(this.departmentList);
    }


    getDepartmentlistexcahnge(selItem, buid) {
        let _departmentList = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == buid) {
                _departmentList.push(this.allManagemtninfo[i]);
            }
        }
        selItem["departmentListexcahnge"] = _departmentList;
        //console.log(this.departmentList);
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
        //console.log(this.divisionlist);
    }


    getDivisionlistdistrubution(selItem, depid) {
        let _divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == depid) {
                _divisionlist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["divisionlistdistribution"] = _divisionlist;
        //console.log(this.divisionlist);
    }


    getDivisionlistovh(selItem, depid) {
        let _divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == depid) {
                _divisionlist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["divisionlistovh"] = _divisionlist;
        //console.log(this.divisionlist);
    }


    getDivisionlistexcahnge(selItem, depid) {
        let _divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == depid) {
                _divisionlist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["divisionlistexcahnge"] = _divisionlist;
        //console.log(this.divisionlist);
    }


    getDivisionlistrepair(selItem, depid) {
        let _divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == depid) {
                _divisionlist.push(this.allManagemtninfo[i]);
            }
        }
        selItem["divisionlistrepair"] = _divisionlist;
        //console.log(this.divisionlist);
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
    // new for priority 
    priorityopen(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        //this.loadPriority();
        this.isSaving = true;
        this.disableSave = false;
        this.loadMasterCompanies();
        this.sourceAction = new Priority();
        this.sourceAction.isActive = true;
        this.priorityName = "";
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    priorityopenedit(content, row) {
        this.isEditMode = true;
        this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.loadPriority();
        this.sourceAction = row;
        this.priorityName = this.sourceAction.description;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
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
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    openHelpText(content) {
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
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



    saveitemgroup() {
        this.isSaving = true;
        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.itemGroupCode = this.itemGroupName;
            this.sourceAction.masterCompanyId = 1;
            this.itemservice.newAction(this.sourceAction).subscribe(
                data => {
                    this.sourceItemMaster.itemGroupId = data.itemGroupId;
                    this.alertService.showMessage("Success", `Saved Item Group Successfully`, MessageSeverity.success);
                    this.itemgroup();
                })
        }
        //else {

        //    this.sourceAction.updatedBy = this.userName;
        //    this.sourceAction.itemGroupCode = this.itemGroupName;
        //    this.sourceAction.masterCompanyId = 1;
        //    this.itemservice.updateAction(this.sourceAction).subscribe(
        //        response => this.saveCompleted(this.sourceAction),
        //        error => this.saveFailedHelper(error));
        //}

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


        if (this.isEditMode == false) {
            this.isSaving = true;
            this.disableuomvalue = true;
            this.sourceUOM.createdBy = this.userName;
            this.sourceUOM.updatedBy = this.userName;
            this.sourceUOM.description = this.unitName;
            this.sourceUOM.masterCompanyId = 1;
            this.unitService.newUnitOfMeasure(this.sourceUOM).subscribe(data => {

                this.sourceItemMaster.purchaseUnitOfMeasureId = data.unitOfMeasureId;
                this.Purchaseunitofmeasure(), this.Stockunitofmeasure(), this.Consumeunitofmeasure()
            })

        }
        else {
            this.disableuomvalue = false;
            this.sourceUOM.updatedBy = this.userName;
            this.sourceUOM.description = this.unitName;
            this.sourceUOM.masterCompanyId = 1;
            this.unitService.updateUnitOfMeasure(this.sourceUOM).subscribe(data => { this.Purchaseunitofmeasure(), this.Stockunitofmeasure(), this.Consumeunitofmeasure() });
        }

        this.modal.close();
    }

    saveStockunitofmeasure() {
        this.isSaving = true;
        if (this.isEditMode == false) {
            this.disableuomvalue = false;
            this.sourceUOM.createdBy = this.userName;
            this.sourceUOM.updatedBy = this.userName;
            this.sourceUOM.description = this.unitName;
            this.sourceUOM.masterCompanyId = 1;
            this.unitService.newUnitOfMeasure(this.sourceUOM).subscribe(
                data => {
                    this.sourceItemMaster.stockUnitOfMeasureId = data.unitOfMeasureId;
                    this.Stockunitofmeasure()
                },
                response => this.saveCompleted(this.sourceUOM)
            )
        }
        else {
            this.disableuomvalue = false;
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
            this.disableuomvalue = false;
            this.sourceUomModel.createdBy = this.userName;
            this.sourceUomModel.updatedBy = this.userName;
            this.sourceUomModel.description = this.unitName;
            this.sourceUomModel.masterCompanyId = 1;
            this.unitService.newUnitOfMeasure(this.sourceUomModel).subscribe(data => {
                this.sourceItemMaster.consumeUnitOfMeasureId = data.unitOfMeasureId;
                this.Consumeunitofmeasure()
            })

        }
        else {
            this.disableuomvalue = false;
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
            this.priorityService.newPriority({ ...this.sourceAction, isDelete: this.isDeleteMode }).subscribe(
                data => {
                    this.sourceItemMaster.priorityId = data.priorityId;
                    this.loadPriority()
                });
        }
        else {
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.priorityName;
            this.priorityService.updatePriority(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }


    removeFile(file: File, uploader) {
        const index = uploader.files.indexOf(file);
        uploader.remove(index);
    }

    fileUploads(event) {
        if (event.files.length === 0)
            return;
        for (let file of event.files)
            this.formData.append(file.name, file);
    }


    saveintegration() {
        this.isSaving = true;
        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.description;
            this.sourceAction.masterCompanyId = 1;
            this.inteService.newAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));

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

    // Tabs content display logic -- jyotsna
    moveGeneralInfromation() {
        this.showGeneralData = true;
        this.showpurchaseData = false;
        this.showexportData = false;
        this.showAircraftData = false;
        this.showAtachapter = false;
    }
    pnvalue: any;
    getManufacturer(value) {
        //console.log(value.originalEvent);
    }
    moveAircraftInformation() {
        //console.log(this.sourceItemMaster.partId);
        // this.activeTab = 1;
        this.pnvalue = this.sourceItemMaster.partNumber;
        this.pnDescription = this.sourceItemMaster.partDescription;
        // this.ManufacturerValue = this.sourceItemMaster.name;
        //console.log(this.sourceItemMaster.name);
        this.alternatePn = this.sourceItemMaster.partAlternatePartId;
        // this.showAircraftData = true;
        // this.showGeneralData = false;
        // this.showpurchaseData = false;
        // this.showexportData = false;
        // this.showAtachapter = false;
        this.currentDashNumberType = new AircraftDashNumber();
        // this.getAircraftAllList();
        // this.aircraftManufacturerService.getAll().subscribe(aircraftManufacturer => {
        //     const responseData = aircraftManufacturer[0];            
        //     this.aircraftManufacturerList = responseData.map(x => {                
        //         return {                    
        //             label: x.description,
        //             value: x.aircraftTypeId,                     
        //         }
        //     })            

        // });            
        // this.itemser.getMappedAirCraftDetails(this.sourceItemMaster.partId).subscribe(data => {
        //     const responseData = data;

        //     this.aircraftListData = responseData.map(x => {
        //             return {

        //             }
        //     })        

        //     //cutom
        //     this.itemser.getMappedAirCraftDetails(this.ItemMasterId).subscribe(data => {
        //         const responseData = data;
        //         this.aircraftListData = responseData.map(x => {
        //             return {
        //                 aircraft: x.aircraftType,
        //                 model: x.aircraftModel,
        //                 dashNumber: x.dashNumber,
        //                 memo: x.memo,
        //             }
        //         })
        //         // resetting popup Data
        //         this.aircraftData = undefined;
        //         this.selectedAircraftId = []
        //         this.selectedModelId = undefined;
        //         this.selectedDashnumber = undefined;
        //     })

        // })
    }
    LoadValues: any[] = [];
    newValue: any;
    // get aircraft model by type 
    getAircraftModelByManfacturer(value) {
        this.newValue = value.originalEvent.target.textContent;

        if (this.newValue) {
            this.aircraftModelService.getAircraftModelListByManufactureId(this.selectedAircraftId).subscribe(models => {

                const responseValue = models[0];
                this.LoadValues = responseValue.map(models => {
                    return {
                        label: models.modelName,
                        value: models
                    }
                });

            });
            this.selectedModelId = undefined;
            this.selectedDashnumber = undefined;
        }



    }
    selectedAircraftIdvalue: any;
    selectedModelIdvalue: any;
    LoadModelidValues: any[] = [];



    searchByFieldUrlCreateforAircraftInformation() {
        if (this.selectAircraftManfacturer.length > 0) {
            const aircraftTypeIds = this.selectAircraftManfacturer.reduce(
                (acc, value) => {
                    return `${acc},${value}`;
                },
                ''
            );
            this.aircraftManfacturerIdsUrl = aircraftTypeIds.substr(1);
        } else {
            this.aircraftManfacturerIdsUrl = '';
        }

        if (this.selectedAircraftModel.length > 0) {
            const aircraftModelIds = this.selectedAircraftModel.reduce((acc, id) => {
                return `${acc},${id}`;
            }, '');
            this.aircraftModelsIdUrl = aircraftModelIds.substr(1);
        } else {
            this.aircraftModelsIdUrl = '';
        }
        if (this.selectedDashNumbers.length > 0) {
            const dashNumberIds = this.selectedDashNumbers.reduce((acc, id) => {
                return `${acc},${id}`;
            }, '');
            this.dashNumberIdUrl = dashNumberIds.substr(1);
        } else {
            this.dashNumberIdUrl = '';
        }

    }



    // get AircraftModels By manufacturer Type
    async getAircraftModelByManfacturerType() {



        // construct url from array
        await this.searchByFieldUrlCreateforAircraftInformation();
        // reset the dropdowns
        this.selectedAircraftModel = [];
        this.selectedDashNumbers = []
        // checks where multi select is empty or not and calls the service
        if (this.aircraftManfacturerIdsUrl !== '') {
            this.aircraftModelService
                .getAircraftModelListByManufactureId(this.aircraftManfacturerIdsUrl)
                .subscribe(models => {
                    const responseValue = models[0];
                    this.aircraftModelList = responseValue.map(models => {
                        return {
                            label: models.modelName,
                            value: models.aircraftModelId
                        };
                    });
                });
        } else {
            this.getAllAircraftModels();
            this.getAllDashNumbers();
        }
    }



    async getDashNumberByManfacturerandModel() {
        // construct url from array
        await this.searchByFieldUrlCreateforAircraftInformation();
        // reset dropdown
        this.selectedDashNumbers = []
        // checks where multi select is empty or not and calls the service

        if (this.aircraftManfacturerIdsUrl !== '' && this.aircraftModelsIdUrl !== '') {
            this.Dashnumservice.getDashNumberByModelTypeId(
                this.aircraftModelsIdUrl,
                this.aircraftManfacturerIdsUrl
            ).subscribe(dashnumbers => {
                const responseData = dashnumbers;
                this.dashNumberList = responseData.map(dashnumbers => {

                    return {
                        label: dashnumbers.dashNumber,
                        value: dashnumbers.dashNumberId
                    };
                });
            });
        }
    }
    // async getModelIdvalues() {
    //     await this.searchByFieldUrlCreateforAircraftInformation();
    //     this.selectedModelIdvalue = undefined;
    //     this.selectedDashnumber = undefined;
    //     this.aircraftModelService.getAircraftModelListByManufactureId(this.selectedAircraftIdvalue).subscribe(models => {
    //         const responseValue = models[0];
    //         this.LoadModelidValues = responseValue.map(models => {
    //             return {
    //                 label: models.modelName,
    //                 value: models.aircraftModelId
    //             }
    //         });
    //     });
    // }


    LoadDashnumberValues: any[] = [];
    // async getDashNumberValues() {
    //     await this.searchByFieldUrlCreateforAircraftInformation();
    //     this.Dashnumservice.getDashNumberByModelTypeId(this.selectedModelIdvalue, this.selectedAircraftIdvalue).subscribe(dashnumbers => {
    //         const responseData = dashnumbers;
    //         this.LoadDashnumberValues = responseData.map(dashnumbers => {
    //             return {
    //                 label: dashnumbers.dashNumber,
    //                 value: dashnumbers.dashNumber
    //             }
    //         });
    //     });
    // }
    LoadDashnumber = [];
    newModelValue: any = [];

    // get dashNumbers by Type and Model 
    getDashNumberByTypeandModel(value) {
        this.newModelValue = value.originalEvent.target.textContent;
        this.dashNumberUrl = this.selectedModelId.reduce((acc, obj) => {

            return `${acc},${obj.aircraftModelId}`
        }, '')
        this.dashNumberUrl = this.dashNumberUrl.substr(1);
        this.Dashnumservice.getDashNumberByModelTypeId(this.dashNumberUrl, this.selectedAircraftId).subscribe(dashnumbers => {
            const responseData = dashnumbers;
            this.LoadDashnumber = responseData.map(dashnumbers => {
                return {
                    label: dashnumbers.dashNumber,
                    value: dashnumbers.dashNumberId
                }
            });

        });
    }



    //  search aircraft information by all parameter
    async searchAircraftInformation() {

        await this.searchByFieldUrlCreateforAircraftInformation();
        this.searchAircraftParams = '';

        // checks where multi select is empty or not and calls the service
        if (
            this.aircraftManfacturerIdsUrl !== '' &&
            this.aircraftModelsIdUrl !== '' &&
            this.dashNumberIdUrl !== ''
        ) {
            this.searchAircraftParams = `aircraftTypeID=${this.aircraftManfacturerIdsUrl}&aircraftModelID=${this.aircraftModelsIdUrl}&dashNumberId=${this.dashNumberIdUrl}`;
        }
        // search only by manfacturer and Model and  publicationId
        else if (
            this.aircraftManfacturerIdsUrl !== '' &&
            this.aircraftModelsIdUrl !== ''
        ) {
            this.searchAircraftParams = `aircraftTypeID=${this.aircraftManfacturerIdsUrl}&aircraftModelID=${this.aircraftModelsIdUrl}`;
        } else if (this.aircraftManfacturerIdsUrl !== '') {
            this.searchAircraftParams = `aircraftTypeID=${this.aircraftManfacturerIdsUrl}`;
        }
        // search only by model and publicationId
        else if (this.aircraftModelsIdUrl !== '') {
            this.searchAircraftParams = `aircraftModelID=${this.aircraftModelsIdUrl}`;
        }
        // search only by dashNumber and publicationId
        else if (this.dashNumberIdUrl !== '') {
            this.searchAircraftParams = `dashNumberId=${this.dashNumberIdUrl}`;
        }

        const ItemMasterID = this.isEdit === true ? this.itemMasterId : this.collectionofItemMaster.itemMasterId;

        this.itemser.searchAirMappedByMultiTypeIdModelIDDashID(ItemMasterID, this.searchAircraftParams).subscribe(res => {
            this.aircraftListDataValues = res.map(x => {
                return {
                    aircraft: x.aircraftType,
                    model: x.aircraftModel,
                    dashNumber: x.dashNumber,
                    memo: x.memo,
                }
            })
            if (this.aircraftListDataValues.length > 0) {
                this.totalAircraftRecords = this.aircraftListDataValues.length;
                this.totalAircraftPages = Math.ceil(this.totalAircraftRecords / this.aircraftTablePageSize);
            }
        });
    }

    getPageCount(totalNoofRecords, pageSize) {
        return Math.ceil(totalNoofRecords / pageSize)
    }






    selectedDashnumbervalue(value) {
        this.newDashnumValue = value.originalEvent.target.textContent;
        console.log()
    }

    resetAircraftModelsorDashNumbers() {
        if (this.modelUnknown) {
            this.selectedModelId = undefined;
            this.selectedDashnumber = undefined;

        }
        if (this.dashNumberUnknown) {

            this.selectedDashnumber = undefined;

        }

    }

    mapAircraftInformation() {
        console.log(this.selectedDashnumber)
        this.viewTable = true;
        // Selected All 
        if (this.selectedAircraftId !== undefined && this.selectedModelId !== undefined && this.selectedDashnumber !== undefined) {
            this.Dashnumservice.getAllDashModels(this.dashNumberUrl, this.selectedAircraftId, this.selectedDashnumber).subscribe(aircraftdata => {
                const responseValue = aircraftdata;
                this.aircraftData = responseValue.map(x => {
                    return {
                        AircraftType: x.aircraft,
                        AircraftModel: x.model,
                        DashNumber: x.dashNumber,
                        AircraftModelId: x.modelid,
                        DashNumberId: x.dashNumberId,
                        Memo: '',
                        IsChecked: false
                    }
                })
            })
        }

        // if (this.selectedAircraftId !== undefined && this.selectedModelId !== undefined && this.selectedDashnumber === undefined) {
        //     this.aircraftData = this.selectedModelId.map(x => {
        //         return {
        //             AircraftType: this.newValue,
        //             AircraftModel: x.modelName,
        //             DashNumber: '',
        //             AircraftModelId: x.aircraftModelId,
        //             DashNumberId: '',
        //             Memo: '',
        //             IsChecked: false
        //         }
        //     })
        // }
        // if (this.selectedAircraftId !== undefined && this.selectedModelId === undefined && this.selectedDashnumber === undefined) {
        //     this.aircraftData = [{
        //         AircraftType: this.newValue,
        //         AircraftModel: '',
        //         DashNumber: '',
        //         AircraftModelId: '',
        //         DashNumberId: '',
        //         Memo: '',
        //         IsChecked: false
        //     }]
        // }

        if (this.selectedAircraftId !== undefined && this.modelUnknown) {
            this.aircraftData = [{
                AircraftType: this.newValue,
                AircraftModel: 'Unknown',
                DashNumber: 'Unknown',
                AircraftModelId: '',
                DashNumberId: '',
                Memo: '',
                IsChecked: false
            }]
        }

        if (this.selectedAircraftId !== undefined && this.selectedModelId !== undefined && this.dashNumberUnknown) {
            this.aircraftData = this.selectedModelId.map(x => {
                return {
                    AircraftType: this.newValue,
                    AircraftModel: x.modelName,
                    DashNumber: 'Unknown',
                    AircraftModelId: x.aircraftModelId,
                    DashNumberId: '',
                    Memo: '',
                    IsChecked: false
                }
            })
        }





    }
    selectedMemo: any;
    saveAircraft() {

        const ItemMasterID = this.isEdit === true ? this.itemMasterId : this.collectionofItemMaster.itemMasterId;
        // const aircraftData = this.aircraftData.filter(x => {
        //     if (x.IsChecked) {
        //         return x;
        //     }
        // })
        const data = this.aircraftData.map(obj => {
            console.log(obj);

            return {
                ...obj,
                DashNumberId: obj.DashNumber === 'Unknown' ? null : obj.DashNumberId,
                AircraftModelId: obj.AircraftModel === 'Unknown' ? null : obj.AircraftModelId,
                ItemMasterId: ItemMasterID,
                PartNumber: this.pnvalue,
                MasterCompanyId: 1,
                CreatedBy: this.userName,
                UpdatedBy: this.userName,
                CreatedDate: new Date(),
                UpdatedDate: new Date(),
                AircraftTypeId: this.selectedAircraftId,
                IsActive: true,
                IsDeleted: false

            }
        })
        // posting the DashNumber Mapped data from Popup
        // Used to get the Data Posted in the Popup
        this.itemser.newItemMasterAircarftClass(data).subscribe(datas => {
            this.alertService.showMessage(
                'Success',
                'Mapped Aircraft Information Successfully',
                MessageSeverity.success
            );
            // reset poupup aircraft information
            this.aircraftData = undefined;
            this.selectedAircraftId = undefined;
            this.selectedModelId = undefined;
            this.selectedDashnumber = undefined;
            this.dashNumberUnknown = false;
            this.modelUnknown = false;

            // get aircraft Mapped Data 
            this.getAircraftMappedDataByItemMasterId();

        }, err => {
            const errorLog = err;
            this.errorMessageHandler(errorLog);
            // reset poupup aircraft information
            this.aircraftData = undefined;
            this.selectedAircraftId = undefined;
            this.selectedModelId = undefined;
            this.selectedDashnumber = undefined;
            this.dashNumberUnknown = false;
            this.modelUnknown = false;
        })


        //this.currentTab = 'AircraftInfo';
        //this.activeMenuItem = 2;
        this.changeOfTab('AircraftInfo');

    }



    getAircraftMappedDataByItemMasterId() {
        // check whether edit or create and send and passes ItemMasterId
        const id = this.isEdit === true ? this.itemMasterId : this.collectionofItemMaster.itemMasterId;
        this.itemser.getMappedAirCraftDetails(id).subscribe(data => {
            const responseData = data;
            this.aircraftListDataValues = responseData.map(x => { //aircraftListData
                return {
                    ...x,
                    aircraft: x.aircraftType,
                    model: x.aircraftModel,
                    dashNumber: x.dashNumber,
                    memo: x.memo,
                }
            })



        })
    }



    deleteAircraftMapped(data) {


        this.itemser.deleteItemMasterAir(data.itemMasterAircraftMappingId).subscribe(res => {
            this.getAircraftMappedDataByItemMasterId();
            this.alertService.showMessage(
                'Success',
                `Deleted Successfully`,
                MessageSeverity.success
            );
        })
    }

    movePurchaseSales() {
        this.changeOfTab('PurchaseSales');
    }
    moveExportInformations() {
        this.alertService.showMessage(
            'Success',
            `Action Saved Successfully `,
            MessageSeverity.success
        );
        this.changeOfTab('Exchange');
    }
    moveAtachapter() {
        this.alertService.showMessage(
            'Success',
            `Saved Air CraftInfo Successfully `,
            MessageSeverity.success
        );
        this.changeOfTab('Atachapter');
        // this.activeTab = 2
        // this.showAtachapter = true;
        // this.showAircraftData = false;
        // this.showGeneralData = false;
        // this.showpurchaseData = false;
        // this.showexportData = false;
        // Created ATA Main
        this.currentAtaNumber = new ATAChapter();
        this.getAllATAChapter();

    }

    getAllATAChapter() {
        this.atamain.getAtaMainList().subscribe(Atachapter => {
            this.ataMainchapter = Atachapter[0];
            for (let i = 0; i < this.ataMainchapter.length; i++) {
                this.LoadAtachapter.push(
                    { value: this.ataMainchapter[i].ataChapterId, label: `${this.ataMainchapter[i].ataChapterCode}-${this.ataMainchapter[i].ataChapterName}` },
                );
            }
        });
    }

    getAllATASubChapter() {
        this.atasubchapter1service.getAtaSubChapter1List().subscribe(res => {
            this.atasubchapter = res[0].map(x => {
                return {
                    label:  x.ataSubChapterCode + ' - ' + x.description,
                    value: x
                }
            })
        })
    }
    addNewATA() {
        this.atasubchapter = [];
        this.ataform.reset();
    }
    addATAMapping() {
        const ItemMasterID = this.isEdit === true ? this.itemMasterId : this.collectionofItemMaster.itemMasterId;
        const PartNumber = this.isEdit === true ? this.pnvalue : this.collectionofItemMaster.partNumber
        //console.log(this.selectedModels, this.ataChaptherSelected);
        const ataMappingData = this.selectedModels.map(x => {
            return {
                ItemMasterId: ItemMasterID,
                ATAChapterId: this.ataChaptherSelected[0].ataChapterId,
                ATASubChapterId: x.ataSubChapterId,
                ATAChapterCode: this.ataChaptherSelected[0].ataChapterCode,
                ATAChapterName: this.ataChaptherSelected[0].ataChapterName,
                ATASubChapterDescription: x.description,
                MasterCompanyId: x.masterCompanyId,
                CreatedBy: this.userName,
                UpdatedBy: this.userName,
                CreatedDate: new Date(),
                UpdatedDate: new Date(),
                PartNumber: PartNumber,
                IsActive: true,
                IsDeleted: false,
            }
        })

        this.itemser.postATAMapping(ataMappingData).subscribe(res => {
            this.ataform.reset();
            this.getATAMappedDataByItemMasterId();

        })

    }


    getATAMappedDataByItemMasterId() {
        // check whether edit or create and send and passes ItemMasterId
        const id = this.isEdit === true ? this.itemMasterId : this.collectionofItemMaster.itemMasterId;
        this.itemser.getMappedATADetails(id).subscribe(res => {
            this.ataMappedList = res.map(x => {
                return {
                    ...x,
                    ataChapterName: x.ataChapterCode + ' - ' + x.ataChapterName,
                    ataSubChapterDescription: getValueFromArrayOfObjectById('ataSubChapterCode', 'ataSubChapterId', x.ataSubChapterId, this.orginalAtaSubChapterValues) + ' - ' +x.ataSubChapterDescription
                }
            })

        })
    }
    deleteATAMapped(data) {
        this.itemser.deleteItemMasterATA(data.itemMasterATAMappingId).subscribe(res => {
            this.getATAMappedDataByItemMasterId();
            this.alertService.showMessage(
                'Success',
                `Deleted Successfully`,
                MessageSeverity.success
            );
        })
    }


    // get all Aircraft Models
    getAllAircraftModels() {

        this.aircraftModelService.getAll().subscribe(models => {
            const responseValue = models[0];
            this.aircraftModelList = responseValue.map(models => {
                return {
                    label: models.modelName,
                    value: models.aircraftModelId
                };
            });
        });
    }


    // get all dashnumber
    getAllDashNumbers() {
        this.Dashnumservice.getAll().subscribe(dashnumbers => {
            const responseData = dashnumbers[0];
            this.dashNumberList = responseData.map(dashnumbers => {
                return {
                    label: dashnumbers.dashNumber,
                    value: dashnumbers.dashNumberId
                };
            });
        });
    }


    // ata search by itemmaster  id

    searchByFieldUrlCreateforATA() {

        if (this.selectedATAchapter.length > 0) {
            const ataIds = this.selectedATAchapter.reduce((acc, value) => {
                return `${acc},${value}`;
            }, '');
            this.ataChapterIdUrl = ataIds.substr(1);
        } else {
            this.ataChapterIdUrl = '';
        }
        if (this.selectedATASubChapter.length > 0) {
            const ataSubchapterIds = this.selectedATASubChapter.reduce((acc, id) => {
                return `${acc},${id}`;
            }, '');
            this.ataSubchapterIdUrl = ataSubchapterIds.substr(1);
        } else {
            this.ataSubchapterIdUrl = '';
        }
    }

    // get all subchapter for dropdown
    getAllSubChapters() {
        this.atasubchapter1service
            .getAtaSubChapter1List()
            .subscribe(atasubchapter => {
                const responseData = atasubchapter[0];
                this.orginalAtaSubChapterValues = responseData;
                this.atasubchapterValues = responseData.map(x => {
                    return {
                        label:  x.ataSubChapterCode + ' - ' + x.description,
                        value: x.ataSubChapterId
                    };
                });
                // for(let i=0; i<responseData.length; i++){
                //     responseData[i]['label'] = responseData[i]['description'];
                //     responseData[i]['value'] = responseData[i]['ataSubChapterId'];
                // }
                this.getATAMappedDataByItemMasterId();
            });
    }

    getSubChapterByATAChapter() {
        this.searchByFieldUrlCreateforATA();

        if (this.ataChapterIdUrl !== '') {
            this.ataMainSer
                .getMultiATASubDesc(this.ataChapterIdUrl)
                .subscribe(atasubchapter => {

                    const responseData = atasubchapter;

                    this.atasubchapterValues = responseData.map(x => {
                        return {
                            label:  x.ataSubChapterCode + ' - ' + x.description,
                            value: x.ataSubChapterId
                        };
                    });
                });

        } else {
            this.getAllSubChapters();
        }
    }

    getCapabilityType() {
        this.commonService.smartDropDownList("CapabilityType", "CapabilityTypeId", "Description").subscribe(data => {
            this.capabilityTypeList = data;
        });
    }

    onSelectAta(value) {
        console.log(value);
    }
    addCape() {

        this.capeBldList = [];
        this.distinctAtaList = [];
        const result = [];
        const map = new Map();
        for (const item of this.ataMappedList) {
            if (!map.has(item.ataChapterId)) {
                map.set(item.ataChapterId, true);    // set any value to Map
                this.distinctAtaList.push({
                    id: item.ataChapterId,
                    name: item.ataChapterName
                });
            }
        }
        // need to get the list of aircraft and have to populate rows for each aircrat
        this.selectedCapabilityTypes.forEach(cap => {
            this.aircraftListDataValues.forEach(x => {
                this.capeBldList.push(
                    {
                        capabilityType: this.capabilityTypeList.find(c => c.value === cap),
                        entity: 'ent1',
                        companyId: 1,
                        buId: 2,
                        departmentId: 3,
                        aircraft: x


                    }

                )

            });


        });


        console.log(this.capeBldList);
    }

    async searchATA() {
        await this.searchByFieldUrlCreateforATA();
        this.searchATAParams = '';
        // checks where multi select is empty or not and calls the service
        if (this.ataChapterIdUrl !== '' && this.ataSubchapterIdUrl !== '') {
            this.searchATAParams = `ataChapterId=${
                this.ataChapterIdUrl
                }&ataSubChapterId=${this.ataSubchapterIdUrl}`;
        }
        else if (this.ataChapterIdUrl !== '') {
            this.searchATAParams = `ataChapterId=${this.ataChapterIdUrl}`;
        }
        else if (this.ataSubchapterIdUrl !== '') {
            this.searchATAParams = `ataSubChapterId=${this.ataSubchapterIdUrl}`;
        }

        const ItemMasterID = this.isEdit === true ? this.itemMasterId : this.collectionofItemMaster.itemMasterId;
        this.itemser
            .searchATAMappedByMultiTypeIdModelIDDashID(
                ItemMasterID,
                this.searchATAParams,
            )
            .subscribe(res => {
                this.ataMappedList = res.map(x => {
                    return {
                        ataChapterName: x.ataChapterName,
                        ataSubChapterDescription: x.ataSubChapterDescription,
                        ataChapterCode: x.ataChapterCode,
                        ataSubChapterId: x.ataSubChapterId,
                        ataChapterId: x.ataChapterId
                    };
                });
            });
    }


    movePurchaseInformation() {
        this.alertService.showMessage(
            'Success',
            `Saved Ata Chapter Successfully `,
            MessageSeverity.success
        );
        this.changeOfTab('PurchaseSales');
        // this.showpurchaseData = true;
        // this.showGeneralData = false;
        // this.showexportData = false;
        // this.showAircraftData = false;
        // this.showAtachapter = false;
    }

    moveExportInformation() {
        // this.showpurchaseData = false;
        // this.showGeneralData = false;
        // this.showexportData = true;
        // this.showAircraftData = false;
        // this.showAtachapter = false;

        this.savePurchaseandSales();

    }


    savePurchaseandSales() {
        const ItemMasterID = this.isEdit === true ? this.itemMasterId : this.collectionofItemMaster.itemMasterId;

        const data = this.fieldArray.map(obj => {

            return {
                ...obj,
                ItemMasterId: ItemMasterID,
                PartNumber: this.pnvalue,
                MasterCompanyId: 1,
                CreatedBy: this.userName,
                UpdatedBy: this.userName,
                CreatedDate: new Date(),
                UpdatedDate: new Date(),
                IsActive: true,
                IsDeleted: false
            }
        })
        console.log(data);





        this.itemser.newItemMasterPurcSaleClass(data).subscribe(datas => {
            this.alertService.showMessage(
                'Success',
                `Saved Purchase and Sale Successfully `,
                MessageSeverity.success
            );
            this.exchLoan.loadData(this.ItemMasterId);
            this.changeOfTab('Exchange');
            // console.log(datas);
        })

        // const isValid = data.map(x => {
        //     const _ObjectKeys = Object.keys(x);

        //     for (let i = 0; i < _ObjectKeys.length; i++) {
        //         if (x[_ObjectKeys[i]] === null || x[_ObjectKeys[i]] === undefined || x[_ObjectKeys[i]] === '') {
        //             return alert('Some Fields are Missing');
        //         }
        //     }



        // })




    }

    getConditionsList() {
        this.commonService.smartDropDownList('Condition', 'ConditionId', 'Description').subscribe(res => {
            this.conditionList = res;
        })
    }
    moveExportInformation1() {
        this.showpurchaseData = true;
        this.showGeneralData = false;
        this.showexportData = false;
        this.showAircraftData = false;
    }
    movePurchaseInformation1() {
        this.showpurchaseData = false;
        this.showGeneralData = true;
        this.showexportData = false;
    }

    validateClassificationRequired() {
        if(this.exportInfo.IsExportUnspecified == null){
            this.exportInfo.IsExportUnspecified = true
        }
        if(this.exportInfo.IsExportMilitary == null){
            this.exportInfo.IsExportMilitary = true
        }
        if(this.exportInfo.IsExportNONMilitary == null){
            this.exportInfo.IsExportNONMilitary = true
        }
        if(this.exportInfo.IsExportDual == null){
            this.exportInfo.IsExportDual = true
        }
      //  if (this.exportInfo.IsExportUnspecified || this.exportInfo.IsExportMilitary || this.exportInfo.IsExportNONMilitary || this.exportInfo.IsExportDual) {

            this.isValidClassification = true;
        //} else {
        //    this.isValidClassification = false;
        //}



    }

    saveExportInformation() {

        const ItemMasterID = this.isEdit === true ? this.itemMasterId : this.collectionofItemMaster.itemMasterId;
        const data = { ...this.exportInfo, ExportCountryId: this.tempExportCountryId, ItemMasterId: parseInt(ItemMasterID) }

        this.itemser.newItemMasterExportInformation(data).subscribe(datas => {
            this.tempExportCountryId = null;
            this.alertService.showMessage(
                'Success',
                `Saved Export Information Successfully `,
                MessageSeverity.success
            );
            this.router.navigate(['itemmastersmodule/itemmasterpages/app-item-master-list'])
        })
    }
    saveandcreate(exportInfoormatiom) {

        if (this.isValidClassification) {
            if(this.exportInfo.IsExportUnspecified == undefined){
                this.exportInfo.IsExportUnspecified = false
            }
            if(this.exportInfo.IsExportMilitary == undefined){
                this.exportInfo.IsExportMilitary = false
            }
            if(this.exportInfo.IsExportNONMilitary == undefined){
                this.exportInfo.IsExportNONMilitary = false
            }
            if(this.exportInfo.IsExportDual == undefined){
                this.exportInfo.IsExportDual = false
            }
            const ItemMasterID = this.isEdit === true ? this.itemMasterId : this.collectionofItemMaster.itemMasterId;
            const data = { ...this.exportInfo, ExportCountryId: this.tempExportCountryId, ItemMasterId: parseInt(ItemMasterID) }

            this.itemser.newItemMasterExportInformation(data).subscribe(datas => {
                this.tempExportCountryId = null;
                this.alertService.showMessage(
                    'Success',
                    `Saved Export Information Successfully `,
                    MessageSeverity.success
                );
                this.router.navigate(['itemmastersmodule/itemmasterpages/app-item-master-stock']);
                // Before this line we should clear form but I could not find all forms data and states
                // so as of now I'm keeping in comments
                // this.changeOfTab('General');
            });
        } else {
            this.display = true;
            this.modelValue = true;
        }


    }

    selectedOEM(value) {

        this.tempOEMpartNumberId = value.itemMasterId;
    }

    saveItemMasterGeneralInformation(addCustomerWorkForm) {
        this.listOfErrors = pulloutRequiredFieldsOfForm(addCustomerWorkForm);
        if (this.listOfErrors.length > 0) {

            this.display = true;
            this.modelValue = true;
            return false;

        } else {



            this.isSaving = true;
            if (!this.isItemMasterCreated) //for create ItemMaster

            {
                this.oemPnData = this.sourceItemMaster.oemPNId;
                this.sourceItemMaster.createdBy = this.userName;
                this.sourceItemMaster.updatedBy = this.userName;
                this.sourceItemMaster.masterCompanyId = 1;
                this.sourceItemMaster.itemTypeId = 1;


                if (this.selectedIntegrationTypes != null) {

                    this.sourceItemMaster.IntegrationPortalId = this.selectedIntegrationTypes.toString().split(",");
                }

                if (this.sourceItemMaster.isPma) {
                    this.sourceItemMaster.oemPNId = this.tempOEMpartNumberId;
                }
                console.log(this.sourceItemMaster, "this.sourceItemMaster+++++")
                this.itemser.newItemMaster(this.sourceItemMaster).subscribe(data => {

                    this.sourceItemMaster.oemPNId = this.oemPnData;

                    this.tempOEMpartNumberId = null;
                    
               

                    this.ManufacturerValue = data.manufacturer.name;
                    // check whether response it there or not 
                    if (data != null) {
                        this.ItemMasterId = data.itemMasterId;
                        if (this.isSaveCapes == true) {
                            this.saveCapabilities();
                        }


                        const vdata = {
                            referenceId: this.ItemMasterId,
                            masterCompanyId: 1,
                            createdBy: this.userName,
                            updatedBy: this.userName,
                            moduleId: 22
                        }

                        for (var key in vdata) {
                            this.formData.append(key, vdata[key]);
                        }

                        this.commonService.uploadDocumentsEndpoint(this.formData).subscribe(res => {
                            //this.saveSuccessHelper(data);
                            this.formData = new FormData();
                            this.toGetAllDocumentsList(this.ItemMasterId);
                        });

                    }

                    // // get aircraft Mapped Information by ItemMasterId
                    // this.itemser.getMappedAirCraftDetails(this.ItemMasterId).subscribe(data => {
                    //     this.aircraftListDataValues = data.map(x => {
                    //         return {
                    //             aircraft: x.aircraftType,
                    //             model: x.aircraftModel,
                    //             dashNumber: x.dashNumber,
                    //             memo: x.memo,
                    //         }
                    //     })
                    // })

                    this.isItemMasterCreated = true;
                    // go to next tab
                    this.changeOfTab('AircraftInfo');
                    // response Data after save 
                    this.collectionofItemMaster = data;


                    this.savesuccessCompleted(this.sourceItemMaster);

                    this.alertService.startLoadingMessage();
                    this.AddCustomerAircraftdata(this.collectionofItemMaster); //passing ItemMaster Saved Collection for Stote Aircraft Data                                    
                    // this.value = 1;
                    // this.activeTab = 2;
                    this.moveAircraftInformation();

                })



                // if (this.selectedAircraftTypes != null) //separting Array whic is having ","
                // {
                // this.sourceItemMaster.AircraftTypeId = this.selectedAircraftTypes.toString().split(",");
                // }

                // if (this.selectedIntegrationTypes != null) //separting Array which is having ","
                // {
                //     this.sourceItemMaster.IntegrationPortalId = this.selectedIntegrationTypes.toString().split(",");
                // }


            }
            else if (this.isItemMasterCreated || this.itemMasterId) //for Edit Screen

            {

                const itemMasterId = this.isEdit === true ? this.itemMasterId : this.collectionofItemMaster.itemMasterId;
                // takes copy of current object to reassign to UI after submit data only on create edit Method


                this.oemPnData = this.sourceItemMaster.oemPNId;


                if (this.selectedIntegrationTypes != null) //separting Array whic is having ","
                {
                    this.sourceItemMaster.IntegrationPortalId = this.selectedIntegrationTypes.toString().split(",");
                }
                this.sourceItemMaster.updatedBy = this.userName;
                this.sourceItemMaster.masterCompanyId = 1;
                this.sourceItemMaster.itemTypeId = 1;

                if (this.sourceItemMaster.isPma) {
                    // checks whether the Change of Data is Happened or not if not and its is in edit mode binds the old data id if not edit and no change it will get the old create oemPnID
                    this.sourceItemMaster.oemPNId = this.tempOEMpartNumberId === null ? this.isEdit === true ? this.sourceItemMaster.oemPNId.itemMasterId : this.oemPnData.itemMasterId : this.tempOEMpartNumberId;
                }

                this.sourceItemMaster.itemMasterId = itemMasterId;
                console.log(this.sourceItemMaster, "this.sourceItemMaster+++")
                // Destructing the Object in Services Place Apply Changes there also 
                this.itemser.updateItemMaster(this.sourceItemMaster).subscribe(data => {
                    
                    this.sourceItemMaster.oemPNId = this.oemPnData;
                    this.tempOEMpartNumberId = null;
                    this.changeOfTab('AircraftInfo');
                    this.collectionofItemMaster = data;
                    this.getItemMasterDetailsById();
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
                        const vdata = {
                            referenceId: this.ItemMasterId,
                            masterCompanyId: 1,
                            createdBy: this.userName,
                            updatedBy: this.userName,
                            moduleId: 22
                        }

                        for (var key in vdata) {
                            this.formData.append(key, vdata[key]);
                        }

                        this.commonService.uploadDocumentsEndpoint(this.formData).subscribe(res => {
                            //this.saveSuccessHelper(data);
                            this.formData = new FormData();
                            this.toGetAllDocumentsList(this.ItemMasterId);
                        });
                    }
                    this.alertService.startLoadingMessage();
                    this.moveAircraftInformation();
                })
            }


        }
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
    //Itemclassification Save
    itemclassification(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        //this.sourceAction = new ItemClassificationModel();
        this.sourceAction.isActive = true;
        this.itemName = "";
        this.className = "";
        this.itemTypeName = "";
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    saveitemclassification() {
        this.isSaving = true;
        console.log("this:::", this);
        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.itemClassificationCode = this.itemName;
            this.sourceAction.description = this.className;
            this.sourceAction.itemType = this.itemTypeName;
            this.sourceAction.masterCompanyId = 1;
            this.workFlowtService.newAction(this.sourceAction).subscribe(
                data => {
                    this.sourceItemMaster.itemClassificationId = data.itemClassificationId;
                    console.log(data);
                    this.itemclass();
                })
            console.log("this.sourceItemMaster.itemClassificationId after save::", this.sourceItemMaster.itemClassificationId);
            console.log("this.sourceItemMaster::", this.sourceItemMaster)
        }


        //else {

        //    this.sourceAction.updatedBy = this.userName;
        //    this.sourceAction.itemClassificationCode = this.itemName;
        //    this.sourceAction.description = this.className;
        //    this.sourceAction.itemType = this.itemTypeName;
        //    this.sourceAction.masterCompanyId = 1;
        //    this.workFlowtService.updateAction(this.sourceAction).subscribe(data => { this.itemclass(); },
        //        response => this.saveCompleted(this.sourceAction));
        //}

        this.modal.close();
    }

    // Manufacturer Save
    filtermanufacturer(event) {
        this.manufacturerCollection = [];
        this.manufacturerNumber = [];
        if (this.allManufacturerInfo) {
            if (this.allpnNumbers.length > 0) {
                for (let i = 0; i < this.allManufacturerInfo.length; i++) {
                    let name = this.allManufacturerInfo[i].name;
                    if (name) {

                        if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                            this.manufacturerNumber.push([{
                                "manufacturerId": this.allManufacturerInfo[i].manufacturerId,
                                "name": name
                            }]),

                                this.manufacturerCollection.push(name);
                        }
                    }
                }
            }
        }
        //this.modal.close();
    }


    //else {

    //    this.sourceAction.updatedBy = this.userName;
    //    this.sourceAction.itemClassificationCode = this.itemName;
    //    this.sourceAction.description = this.className;
    //    this.sourceAction.itemType = this.itemTypeName;
    //    this.sourceAction.masterCompanyId = 1;
    //    this.workFlowtService.updateAction(this.sourceAction).subscribe(data => { this.itemclass(); },
    //        response => this.saveCompleted(this.sourceAction));
    //}







    Manufacturer(content) {
        this.sourcemanufacturer.name = '';
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction.isActive = true;
        this.manufacturerName = " "
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    saveManufacturer() {
        this.isSaving = true;
        if (this.isEditMode == false) {
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.Name = this.sourcemanufacturer.name;
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.masterCompanyId = 1;
            this.itemser.savemanufacutrer(this.sourceAction).subscribe(
                data => {
                    this.alertService.showMessage(
                        'Success',
                        `Saved Manufacturer Successfully `,
                        MessageSeverity.success
                    );
                    this.sourceItemMaster.manufacturerId = data.manufacturerId;
                    this.manufacturerdata()
                })
        }
        //else {

        //    this.sourceAction.updatedBy = this.userName;
        //    this.sourceAction.description = this.integrationName;
        //    this.inteService.updateAction(this.sourceAction).subscribe(
        //        response => this.saveCompleted(this.sourceAction),
        //        error => this.saveFailedHelper(error));
        //}

        this.modal.close();
    }


    // Provision --- Save
    provisionope(content) {
        this.provisionName = '';
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        // this.sourceAction = new Provision();
        this.sourceAction.isActive = true;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
        }, () => { console.log('Backdrop click') })
    }

    exportUOmOpen(content) {
        console.log("In exportUOmOpen function!!");
        // this.sourceUOM.isActive = true;
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
        }, () => { console.log('Backdrop click') })
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
    saveprovision() {
        this.isSaving = true;
        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.provisionName;
            this.sourceAction.masterCompanyId = 1;
            this.proService.newProvision(this.sourceAction).subscribe(
                data => {
                    this.sourceItemMaster.provisionId = data.provisionId;
                    this.provisiondata();
                },
                response => this.saveCompleted(this.sourceAction));

        }
        this.modal.close();
    }


    getAllUnitofmeasure() {

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

    filterpn(event) {
        this.oempnCollection = this.allpnNumbers;

        const oemFilterData = [...this.allpnNumbers.filter(x => {
            return x.partNumber.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.oempnCollection = oemFilterData;
        // this.oempnNumber = [];
        // if (this.allpnNumbers) {
        //     if (this.allpnNumbers.length > 0) {
        //         for (let i = 0; i < this.allpnNumbers.length; i++) {
        //             let partName = this.allpnNumbers[i].partNumber;
        //             if (partName) {
        //                 if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {

        //                     // this.oempnNumber.push([{
        //                     //     "partId": this.allpnNumbers[i].itemMasterId,
        //                     //     "partName": partName
        //                     // }]),

        //                     //     this.oempnCollection.push(partName);
        //                 }
        //             }
        //         }
        //     }
        // }
    }


    filterdescription(event) {
        this.descriptionCollection = [];
        this.itemdescription = [];
        if (this.allPartnumbersInfo) {
            if (this.allPartnumbersInfo.length > 0) {

                for (let i = 0; i < this.allPartnumbersInfo.length; i++) {
                    let partDescription = this.allPartnumbersInfo[i].partDescription;
                    if (partDescription) {
                        if (partDescription.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                        this.descriptionCollection.push(partDescription);
                        }
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
                    // this.disableSavepartDescription = true;
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
        this.integrationvalues = [];
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getEmployeeCerficationList;
        this.allintegrationdetails = getEmployeeCerficationList;
        if (this.allintegrationdetails.length > 0) {
            for (let i = 0; i < this.allintegrationdetails.length; i++) {
                this.integrationvalues.push(
                    { value: this.allintegrationdetails[i].integrationPortalId, label: this.allintegrationdetails[i].description },
                );
            }
            this.selectedIntegrationTypes = this.sourceItemMaster.integrationPortalIds;
        }


        // let valAirCraft = [];
        // this.itemser.getintegrationtypes(this.sourceItemMaster.itemMasterId)
        //     .subscribe(results => {
        //         this.allIntegrationInfo = results;
        //         if (results != null) {
        //             for (let i = 0; i < this.allIntegrationInfo.length; i++) {
        //                 valAirCraft.push(this.allIntegrationInfo[i].integrationPortalId);
        //             }
        //             this.selectedIntegrationTypes = valAirCraft;
        //             //console.log(this.selectedIntegrationTypes);
        //         }

        //     },
        //         error => this.onDataLoadFailed(error)
        //     );
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
                    this.currencySymbol = this.allCurrencyInfo[i].code;
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
        this.portalURL = "";
        this.integrationName = "";
        this.sourceAction.description = "";
        this.modal = this.modalService.open(integration, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    createIntegration() {
        this.isSaving = true;
        if (this.isEditMode == false) {
            this.sourceIntegration.createdBy = this.userName;
            this.sourceIntegration.updatedBy = this.userName;
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




    // New code for loading dropdown

    getATASubChapterByATAChapter() {
        const selectedATAChapterId = this.ataform.value.atanumber;
        this.ataChaptherSelected = this.ataMainchapter.filter(x => {
            if (x.ataChapterId === selectedATAChapterId) {
                return x;
            }
        });
        this.atasubchapter1service.getATASubChapterListByATAChapterId(selectedATAChapterId).subscribe(atasubchapter => {
            const responseData = atasubchapter[0];
            this.atasubchapter = responseData.map(x => {
                return {
                    label: x.ataSubChapterCode + ' - ' + x.description,
					value: x
                }
            })
        })

        this.disables = true;
        this.view = false;
    }
    LoadAircraft: any[];
    selectedModels1: any;
    viewcheck1: boolean = false;
    addDashnumber() {
        this.viewCheck = false;
        this.disabled = true;
        this.disable1 = true;
        this.viewcheck1 = true;
        if (this.selectedModels1 == '') {
            this.viewCheck = true;
            this.disabled = false;
            this.disable1 = false;
            this.viewcheck1 = false;
        }
    }
    check($event) {
        this.disables = true;
        this.view = false;
    }
    Adddash($event) {
        this.disabled = false;
    }
    onToggle(i) {
        this.disable1 = true;
    }
    viewDash: boolean = true;
    viewCheck: boolean = true;

    schematic = false;
    onSchematic(e) {
        this.schematic = e.target.checked;
    }


    addFieldValue(): void {
        if (this.fieldArray.length <= 5) {
            this.fieldArray = [...this.fieldArray, { ...this.newFields }]
        }


    }

    // checkDropDownValueExists(value) {

    //     const data = this.fieldArray.filter(x => {
    //         if (x.Condition === value) {
    //             return value;
    //         }
    //     })
    //     return data.length > 0 ? true : false;

    // }
    delete(i) {
        if (this.fieldArray.length > 0) {
            this.fieldArray.splice(i, 1);
        }
        else {
            this.Delete = false;
        }
    }
    //percentValue(sourcePS: any) {
    //    if (sourcePS.PP_VendorListPrice && sourcePS.PP_PurchaseDiscPerc && !sourcePS.SP_FSP_FlatPriceAmount) {
    //        sourcePS.PP_PurchaseDiscAmount = sourcePS.PP_VendorListPrice * sourcePS.PP_PurchaseDiscPerc
    //    }
    //    if (sourcePS.PP_PurchaseDiscAmount) {
    //        sourcePS.PP_UnitPurchasePrice = sourcePS.PP_PurchaseDiscAmount - sourcePS.PP_VendorListPrice
    //    }
    //    if (sourcePS.SP_CalSPByPP_MarkUpPercOnListPrice && sourcePS.PP_VendorListPrice) {
    //        sourcePS.SP_CalSPByPP_MarkUpAmount = sourcePS.PP_VendorListPrice * sourcePS.SP_CalSPByPP_MarkUpPercOnListPrice;
    //    }
    //}
    //salePercent(sourcePS) {
    //    if (sourcePS.SP_CalSPByPP_BaseSalePrice && sourcePS.SP_CalSPByPP_SaleDiscPerc) {
    //        sourcePS.SP_CalSPByPP_SaleDiscAmount = sourcePS.SP_CalSPByPP_BaseSalePrice * sourcePS.SP_CalSPByPP_BaseSalePrice
    //    }
    //    if (sourcePS.SP_CalSPByPP_SaleDiscAmount && sourcePS.SP_CalSPByPP_BaseSalePrice) {
    //        sourcePS.SP_CalSPByPP_UnitSalePrice = sourcePS.SP_CalSPByPP_SaleDiscAmount - sourcePS.SP_CalSPByPP_BaseSalePrice
    //    }
    ////}
    percentValue(field) {
        if (field.PP_VendorListPrice && field.PP_PurchaseDiscPerc && !field.SP_FSP_FlatPriceAmount) {
            field.PP_PurchaseDiscAmount = ((field.PP_VendorListPrice * field.PP_PurchaseDiscPerc) / 100)
        }
        if (field.PP_PurchaseDiscAmount) {
            field.PP_UnitPurchasePrice = field.PP_VendorListPrice - field.PP_PurchaseDiscAmount
        }
        if (field.SP_CalSPByPP_MarkUpPercOnListPrice && field.PP_VendorListPrice) {
            field.SP_CalSPByPP_MarkUpAmount = ((field.PP_VendorListPrice * field.SP_CalSPByPP_MarkUpPercOnListPrice) / 100)
        }
        if (field.PP_UnitPurchasePrice && field.SP_CalSPByPP_MarkUpAmount) {

            field.SP_CalSPByPP_BaseSalePrice = field.PP_VendorListPrice + field.SP_CalSPByPP_MarkUpAmount;
        }

        if (field.SP_CalSPByPP_UnitSalePrice !== null) {
            this.salePercent(field);
        }

    }
    salePercent(field) {
        if (field.SP_CalSPByPP_BaseSalePrice && field.SP_CalSPByPP_SaleDiscPerc) {
            field.SP_CalSPByPP_SaleDiscAmount = ((field.SP_CalSPByPP_BaseSalePrice * field.SP_CalSPByPP_SaleDiscPerc) / 100);
        }

        if (field.SP_CalSPByPP_SaleDiscAmount && field.SP_CalSPByPP_BaseSalePrice) {
            field.SP_CalSPByPP_UnitSalePrice = field.SP_CalSPByPP_BaseSalePrice - field.SP_CalSPByPP_SaleDiscAmount;

        }
    }
    atasubchapterValues = [];
    selectedATachapter: any;
    // selectedAtachapterID() {
    //     this.atasubchapter1service.getATASubChapterListByATAChapterId(this.selectedATachapter).subscribe(atasubchapter => {
    //         const responseData = atasubchapter[0];
    //         this.atasubchapterValues = responseData.map(x => {
    //             return {
    //                 label: x.description,
    //                 value: x.ataSubChapterId
    //             }
    //         })
    //     })
    // }
    getAircraftAllList() {
        this.aircraftManufacturerService.getAll().subscribe(
            details => this.onDataLoad(details[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private onDataLoad(allACList: any[]) {
        this.alertService.stopLoadingMessage();
        this.aircraftList = allACList;
    }

    // getAtachapter() {
    //     this.atamain.getAtaMainList().subscribe(data => {
    //         const responseData = data[0].map(x => {
    //             return {
    //                 atachapter: x.ataChapterName,
    //                 atasubchapter: ""
    //             };
    //         });
    //         this.atachapterList = responseData;
    //     });
    // }

    private countrylist() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.countryservice.getCountrylist().subscribe(
            results => this.onDatacountrySuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onDatacountrySuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allCountryinfo = allWorkFlows;

        // this.countrycollection = [];



        // if (this.allCountryinfo.length > 0) {
        //     for (let i = 0; i < this.allCountryinfo.length; i++) {
        //         let countryName = this.allCountryinfo[i].nice_name;
        //         if (countryName) {
        //             this.countrycollection.push(countryName);
        //         }
        //     }
        // }
    }
    selectedExportCountry(value) {

        this.tempExportCountryId = value.countries_id;
    }
    filtercountry(event) {
        this.countrycollection = this.allCountryinfo;

        const countryNameFilterData = [...this.allCountryinfo.filter(x => {
            return x.nice_name.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.countrycollection = countryNameFilterData;


        // for (let i = 0; i < this.allCountryinfo.length; i++) {
        //     let countryName = this.allCountryinfo[i].nice_name;
        //     if (countryName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        //         this.countrycollection.push(countryName);
        //     }
        // }
    }

    filterUOM(event) {
        this.unitofmeasureValue = [];
        for (let i = 0; i < this.allPurchaseUnitOfMeasureinfo.length; i++) {
            let unitName = this.allPurchaseUnitOfMeasureinfo[i].description;
            if (unitName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.unitofmeasureValue.push(unitName)
            }
        }
    }


    // onClickDNCheckbox(rowIndex) {
    //     this.indexOfrow = rowIndex;
    //     this.enableDNMemo = !this.enableDNMemo;
    // }

    changeOfTab(value) {
        console.log('invoked');
        console.log(`Parent master id ${this.ItemMasterId}`);
        if (value === 'General') {
            this.currentTab = 'General';
            this.activeMenuItem = 1;
        } else if (value === 'AircraftInfo') {
            this.currentTab = 'AircraftInfo';
            this.activeMenuItem = 2;
        } else if (value === 'Atachapter') {
            this.currentTab = 'Atachapter';
            this.activeMenuItem = 3;
        } else if (value == "Capes") {
            this.currentTab = 'Capes';
            this.activeMenuItem = 4;
        } else if (value === 'PurchaseSales') {
            this.currentTab = 'PurchaseSales';
            this.activeMenuItem = 5;
        } else if (value === 'NhaTlaAlternateTab') {
            this.currentTab = 'NhaTlaAlternateTab';
            this.activeMenuItem = 6;
        } else if (value === "Exchange") {
            this.currentTab = 'Exchange';
            this.exchLoan.loadData(this.ItemMasterId);
            this.activeMenuItem = 7;
        }
        else if (value === 'ExportInfo') {
            this.currentTab = 'ExportInfo';
            this.activeMenuItem = 8;
        }

    }
    changeOfNTAETab(value) {
        console.log('invoked');
        console.log(`Parent master id ${this.ItemMasterId}`);
        if (value === 'NHA') {
            this.currentNTAETab = 'NHA';
            this.activeNTAEMenuItem = 1;
        } else if (value === 'TLA') {
            this.currentNTAETab = 'TLA';
            this.activeNTAEMenuItem = 2;
        } else if (value === 'Alternate') {
            this.currentNTAETab = 'Alternate';
            this.activeNTAEMenuItem = 3;
        } else if (value == "Equivalency") {
            this.currentNTAETab = 'Equivalency';
            this.activeNTAEMenuItem = 4;
        }

    }
    //New Priority
    private loadPriority() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.priorityService.getPriorityList().subscribe(
            results => this.onDataSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private onDataSuccessful(getPriorityList: Priority[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        //this.dataSourceValue = getPriorityList;
        this.allPriorityInfo = getPriorityList;

    }
    priorityeventHandler(event) {
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
    priorityId(event) {
        for (let i = 0; i < this.allpriority.length; i++) {
            if (event == this.allpriority[i][0].priorityName) {
                this.disableSave = true;
                this.selectedreason = event;
            }
        }
    }
    filterpriorities(event) {
        this.localCollection = [];
        for (let i = 0; i < this.allPriorityInfo.length; i++) {
            let priorityName = this.allPriorityInfo[i].description;
            if (priorityName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.allpriority.push([{
                    "priorityId": this.allPriorityInfo[i].priorityId,
                    "priorityName": priorityName
                }]),
                    this.localCollection.push(priorityName);
            }
        }
    }
    // Add Integration  

    integrationopen(content) {
        this.sourceAction = {};
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.disableSave = false;
        this.isSaving = true;
        this.integrationData();
        this.loadMasterCompanies();
        this.sourceAction.isActive = true;
        this.portalURL = "";
        this.integrationName = "";
        this.sourceAction.description = "";
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    integrationopenEdit(content, row) {
        this.isEditMode = true;
        this.isSaving = true;
        this.disableSave = false;
        this.loadMasterCompanies();
        this.integrationData();
        this.sourceAction = row;
        this.integrationName = this.sourceAction.description;
        this.portalURL = row.portalURL;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    integrationeventHandler(event) {
        let value = event.target.value.toLowerCase();
        if (this.selectedActionName) {
            if (value == this.selectedActionName.toLowerCase()) {
                this.disableSave = true;
            }
            else {
                this.disableSave = false;
            }
        }

    }
    integrationId(event) {
        //debugger;
        for (let i = 0; i < this.actionamecolle.length; i++) {
            if (event == this.actionamecolle[i][0].integrationName) {
                //alert("Action Name already Exists");
                this.disableSave = true;
                this.selectedActionName = event;
            }
        }
    }
    Exportuom(content) {
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceUOM = new UnitOfMeasure();
        this.sourceUOM.isActive = true;
        this.unitName = "";
        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    StockUOMstandard(event) {
        if (this.allUnitOfMeasureinfo) {
            for (let i = 0; i < this.allUnitOfMeasureinfo.length; i++) {
                if (event == this.allUnitOfMeasureinfo[i].shortName) {
                    //this.sourceItemMaster.itemClassificationCode = this.allUnitOfMeasureinfo[i].shortName;
                    this.disableSaveStockUOM = true;
                    this.selectedStockUOM = event;
                }

            }
        }
    }
    consumeUOMstandard(event) {
        if (this.allUnitOfMeasureinfo) {
            for (let i = 0; i < this.allUnitOfMeasureinfo.length; i++) {
                if (event == this.allUnitOfMeasureinfo[i].standard) {
                    //this.sourceItemMaster.itemClassificationCode = this.allUnitOfMeasureinfo[i].standard;
                    this.disableSaveConsume = true;
                    this.selectedConsume = event;
                }
                else {
                    this.disableSaveConsume = false;
                }

            }
        }
    }

    saveexportuom() {
        this.isSaving = true;
        this.disableuomvalue = false;
        this.sourceUOM.createdBy = this.userName;
        this.sourceUOM.updatedBy = this.userName;
        this.sourceUOM.description = this.unitName;
        this.sourceUOM.masterCompanyId = 1;
        this.unitService.newUnitOfMeasure(this.sourceUOM).subscribe(data => {
            this.sourceItemMaster.consumeUnitOfMeasureId = data.unitOfMeasureId;
            this.Purchaseunitofmeasure();
        })
        this.modal.close();
    }

    filterStandardUOM(event) {
        this.unitofmeasureValue = [];
        if (this.allUnitOfMeasureinfo) {
            for (let i = 0; i < this.allUnitOfMeasureinfo.length; i++) {
                let unitName = this.allUnitOfMeasureinfo[i].shortName;
                if (unitName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.unitofmeasureValue.push(unitName)
                }
            }
        }

    }
    filterconsumeUOM(event) {
        this.unitofmeasureValue = [];
        if (this.allUnitOfMeasureinfo) {
            for (let i = 0; i < this.allUnitOfMeasureinfo.length; i++) {
                let unitName = this.allUnitOfMeasureinfo[i].standard;
                if (unitName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                    this.unitofmeasureValue.push(unitName)
                }
            }
        }

    }
    filterintegrations(event) {
        this.localmanufacturer = [];
        for (let i = 0; i < this.allIntegrationInfo.length; i++) {
            let integrationName = this.allIntegrationInfo[i].description;
            if (integrationName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.actionamecolle.push([{
                    "chargeId": this.allIntegrationInfo[i].integrationPortalId,
                    "integrationName": integrationName
                }]),
                    this.localmanufacturer.push(integrationName);
            }
        }
    }

    saveIntegration() {

        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.portalURL = this.portalURL;
            this.integrationService.newAction(this.sourceAction).subscribe((data) => { this.Integration(); },
                role => this.saveSuccessHelper(role)
            );
        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.integrationName;
            this.sourceAction.portalURL = this.portalURL;
            this.integrationService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }
    onSubmit(value) {

    }


    fileUpload(event, fileType) {

        if (event.files.length === 0)
            return;

        for (let file of event.files) {
            this.formData.append(fileType, file);
        }
    }


    toGetAllDocumentsList(itemMasterId) {
        var moduleId = 22;
        this.commonService.GetDocumentsList(itemMasterId, moduleId).subscribe(res => {
            this.allUploadedDocumentsList = res;
            //console.log(this.allEmployeeTrainingDocumentsList);
        })
    }
    // downloadFileUpload(rowData) {	
    //     const url = `${this.configurations.baseUrl}/api/FileUpload/downloadattachedfile?filePath=${rowData.link}`;
    // 	window.location.assign(url);       
    // }
    downloadFileUpload(rowData) {
        this.commonService.toDownLoadFile(rowData.link);
    }

    getAttachmentDeleteById(rowData) {

        let attachmentDetailId = rowData.attachmentDetailId;
        let updatedBy = this.userName;

        this.commonService.GetAttachmentDeleteById(attachmentDetailId, updatedBy).subscribe(res => {
            this.toGetAllDocumentsList(this.itemMasterId);
            this.documentDeleted = true;
        })
    }
}

