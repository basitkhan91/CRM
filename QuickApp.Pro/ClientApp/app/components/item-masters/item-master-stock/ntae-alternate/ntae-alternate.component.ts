﻿import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog, SELECT_MULTIPLE_PANEL_PADDING_X } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../../../models/mastercompany.model';
import { AuditHistory } from '../../../../models/audithistory.model';
import { AuthService } from '../../../../services/auth.service';
import { MessageSeverity, AlertService } from '../../../../services/alert.service';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Integration } from '../../../../models/integration.model';
import { IntegrationService } from '../../../../services/integration-service';
import { ItemClassificationService } from '../../../../services/item-classfication.service';
import { ItemClassificationModel } from '../../../../models/item-classification.model';
import { OnInit, AfterViewInit, Component, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { Itemgroup } from '../../../../models/item-group.model';
import { ItemGroupService } from '../../../../services/item-group.service';
import { Provision } from '../../../../models/provision.model';
import { ProvisionService } from '../../../../services/provision.service';
import { ATAMain } from '../../../../models/atamain.model';
import { AtaMainService } from '../../../../services/atamain.service';
import { Priority } from '../../../../models/priority.model';
import { PriorityService } from '../../../../services/priority.service';
import { Currency } from '../../../../models/currency.model';
import { CurrencyService } from '../../../../services/currency.service';
import { UnitOfMeasureService } from '../../../../services/unitofmeasure.service';
import { UnitOfMeasure } from '../../../../models/unitofmeasure.model';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { ATAChapter } from '../../../../models/atachapter.model';
import { FormArray } from '@angular/forms';
import { ItemMasterCapabilitiesModel } from '../../../../models/itemMasterCapabilities.model';
import { GlAccountService } from '../../../../services/glAccount/glAccount.service';
import { GlAccount } from '../../../../models/GlAccount.model';
import { VendorService } from '../../../../services/vendor.service';
import { MenuItem } from 'primeng/api';
import { AircraftDashNumber } from '../../../../models/dashnumber.model';
import { AircraftModel } from '../../../../models/aircraft-model.model';
import { AircraftModelService } from '../../../../services/aircraft-model/aircraft-model.service';
import { AircraftManufacturerService } from '../../../../services/aircraft-manufacturer/aircraftManufacturer.service';
import { AtaSubChapter1Service } from '../../../../services/atasubchapter1.service';
import { CustomerService } from '../../../../services/customer.service';
import { PublicationService } from '../../../../services/publication.service';
import { DashNumberService } from '../../../../services/dash-number/dash-number.service';
import { CommonService } from '../../../../services/common.service';

@Component({
    selector: 'app-ntae-alternate',
    templateUrl: './ntae-alternate.component.html',
    styleUrls: ['./ntae-alternate.component.scss']
})

/** item-master-stock component*/
export class NTAEAlternateComponent implements OnInit, AfterViewInit {
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
    memoNotes: string = 'This is Itemmaster memo';
    manufacturerValue: FormGroup;
    ataChaptherSelected: any;
    modelUnknown = false;
    dashNumberUnknown = false;
    newFields = {
        Condition: null ,
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
    currentTab: string = 'General';
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
     colsaircraftLD: any[] = [
        { field: "description", header: "Description" },
        { field: "manufacturer", header: "Manufacturer" }
    ];
    pnvalue: any;

    // errorLogForPS: string = '';

    constructor(private fb: FormBuilder, public priorityService: PriorityService, public countryservice: CustomerService, private Dashnumservice: DashNumberService, private atasubchapter1service: AtaSubChapter1Service, private atamain: AtaMainService, private aircraftManufacturerService: AircraftManufacturerService, private aircraftModelService: AircraftModelService, private Publicationservice: PublicationService, public integrationService: IntegrationService, private formBuilder: FormBuilder, public workFlowtService1: LegalEntityService, private changeDetectorRef: ChangeDetectorRef, private router: Router,
        private authService: AuthService, public unitService: UnitOfMeasureService, private modalService: NgbModal, private glAccountService: GlAccountService, public vendorser: VendorService,
        public itemser: ItemMasterService, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public ataMainSer: AtaMainService,
        public currency: CurrencyService, private _actRoute: ActivatedRoute,
        public priority: PriorityService, public inteService: IntegrationService,
        public workFlowtService: ItemClassificationService, public itemservice: ItemGroupService,
        public proService: ProvisionService, private dialog: MatDialog,
        private masterComapnyService: MasterComapnyService, public commonService: CommonService, @Inject(DOCUMENT) document) {
        this.itemser.currentUrl = '/itemmastersmodule/itemmasterpages/app-item-master-stock';
        this.itemser.bredcrumbObj.next(this.itemser.currentUrl);//Bread Crumb
        this.displayedColumns.push('action');
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
            this.itemser.getItemMasterDetailById(this.itemMasterId).subscribe(res => {
                const responseDataOfEdit = res;
                this.isDisabledSteps = true;
                this.sourceItemMaster = responseDataOfEdit[0];
                this.sourceItemMaster.expirationDate = new Date(this.sourceItemMaster.expirationDate);
                this.Integration();
                this.sourceItemMaster.oemPNId = this.sourceItemMaster.oemPNData[0]
                this.ItemMasterId = this.itemMasterId;
                // assign the header values
                this.pnvalue = this.sourceItemMaster.partNumber;
                this.pnDescription = this.sourceItemMaster.partDescription;
                this.ManufacturerValue = this.sourceItemMaster.manufacturerName;
                this.alternatePn = this.sourceItemMaster.partAlternatePartId;

                
                // validate classification required in Export Information
                this.validateClassificationRequired()

            })

        }
        this.Integration();



    }

    
    aircraftListDataValues: any;
    capesListDataValues: any;

    ngOnInit(): void {
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
        this.addFieldValue();
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
        this.Stockunitofmeasure();
        this.Consumeunitofmeasure();
        this.SOLDunitofmeasure();
        this.warningdata();
        this.aircraftmodelData();
        this.loadData();
        this.glList();
        this.ptnumberlistdata();
        this.glAccountlistdata();

        this.activeIndex = 0;
        this.sourceItemMaster.salesIsFixedPrice = true;
        this.capabilitiesForm = this.formBuilder.group({
            mfgForm: this.formBuilder.array([]),
            overhaulForm: this.formBuilder.array([]),
            distributionForm: this.formBuilder.array([]),
            certificationForm: this.formBuilder.array([]),
            repairForm: this.formBuilder.array([]),
            exchangeForm: this.formBuilder.array([])
        });

        this.getConditionsList();




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


    markUpListPriceAfterDisk() {
        this.markupListPriceValue = false;
        this.markUpListPriceAfterDiskValue = true;
    }

    onChange(deviceValue) {
        alert(deviceValue);
        this.sourceItemMaster.ataMainId = deviceValue;
    }



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
                    this.disableSavepartDescription = false;
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


    // Tabs content display logic -- jyotsna
    moveGeneralInfromation() {
        this.showGeneralData = true;
        this.showpurchaseData = false;
        this.showexportData = false;
        this.showAircraftData = false;
        this.showAtachapter = false;
    }
   
    LoadValues: any[] = [];
    newValue: any;
    

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
        });
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

   


    getConditionsList(){
        this.commonService.smartDropDownList('Condition', 'ConditionId' , 'Description'  ).subscribe(res => {
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

        if (this.exportInfo.IsExportUnspecified || this.exportInfo.IsExportMilitary || this.exportInfo.IsExportNONMilitary || this.exportInfo.IsExportDual) {

            this.isValidClassification = true;
        } else {
            this.isValidClassification = false;
        }



    }



    selectedOEM(value) {

        this.tempOEMpartNumberId = value.itemMasterId;
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
    
    

    filterUOM(event) {
        this.unitofmeasureValue = [];
        for (let i = 0; i < this.allPurchaseUnitOfMeasureinfo.length; i++) {
            let unitName = this.allPurchaseUnitOfMeasureinfo[i].description;
            if (unitName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.unitofmeasureValue.push(unitName)
            }
        }
    }


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

}

