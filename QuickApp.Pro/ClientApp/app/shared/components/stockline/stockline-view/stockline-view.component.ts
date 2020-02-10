import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { fadeInOut } from '../../../../services/animations';
import { CustomerService } from '../../../../services/customer.service';
import { CommonService } from '../../../../services/common.service';
import { StocklineService } from '../../../../services/stockline.service';
import { NgbModal, NgbActiveModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';



@Component({
    selector: 'app-stockline-view',
    templateUrl: './stockline-view.component.html',
    styleUrls: ['./stockline-view.component.scss'],
    animations: [fadeInOut]
})

export class StocklineViewComponent implements OnInit {

    @Input() stockLineId;
    createdBy: any = "";
    quantityOnHand: any = "";
    quantityReserved: any = "";
    quantityIssued: any = "";
    quantityAvailable: any = "";
    engineSerialNumber: any = "";
    aircraftTailNumber: any = "";
    blackListed: boolean = false;
    blackListedReason: any = "";
    incident: boolean = false;
    incidentReason:any=""
    accident: boolean = false;
    accicentReason: any = "";
    memo: any = "";
    //shelfLife: any = "";
    stockLineNumber: any = "";
    stocklineMatchKey: any = "";
    partNumber: any = "";
    purchaseOrderUnitCost: any = "";
    repairOrderUnitCost: any = "";
    receiverNumber: any = "";
    reconciliationNumber: any = "";
    unitSalesPrice: any = "";
    coreUnitCost: any = "";
    glAccountId: any = "";
    glAccountName: any = "";
    assetId: any = "";
    updatedBy: any = "";
    updatedDate: any = "";
    createdDate: any = "";
    oem: any = "";
    enableExternal: boolean = false;
    businessUnitName: any;
    company: any;
    division: any;
    departmentName: any;
    partDescription: any;
    isSerialized: any;
    controlNumber: any;
    condition: any;
    serialNumber: any;
    shelfLife: any;
    shelfLifeExpirationDate: any;
    site: any;
    warehouse: any;
    location: any;
    shelf: any;
    bin: any;
    obtainFrom: any;
    owner: any;
    traceableTo: any;
    manufacturer: any;
    manufacturerLotNumber: any;
    manufacturingDate: any;
    manufacturingBatchNumber: any;
    partCertificationNumber: any;
    certifiedBy: any;
    certifiedDate: any;
    tagType: any;
    certifiedDueDate: any;
    calibrationMemo: any;
    orderDate: any;
    purchaseOrderNumber: any;
    repairOrderNumber: any;
    receivedDate: any;
    isHazardousMaterial: any;
    isPMA: any;
    isDER: any;
    isAdjustSaving: boolean;
    tagdate: any;
    idNumber: any;
    manufacturerId: any;

    cyclesRemaining:any;
    cyclesSinceNew: any;
    cyclesSinceOVH: any;
    cyclesSinceInspection: any;
    cyclesSinceRepair : any;
    timeRemaining: any;
    timeSinceNew: any;
    timeSinceOVH: any;
    timeSinceInspection: any;
    lastSinceInspection: any;
    lastSinceOVH: any;
    lastSinceNew: any;
    timeSinceRepair: any;

    totalRecords: number = 0;
    totalPages: number = 0;
    pageSize: number = 20;
    data:any;
    constructor(private workFlowtService: StocklineService, private activeModal: NgbActiveModal, ) {


    }
    ngOnInit(): void {
        this.getStocklineListById(this.stockLineId);
    }
    dismissModel() {
        this.activeModal.close();
    }

    getStocklineListById(stockLineId) {
        this.workFlowtService.getStockLineDetailsById(stockLineId).subscribe(res => {
            this.data = res;
            let row = res;
            if (row.compmanagmentLegalEntity) this.company = row.compmanagmentLegalEntity.name;
            if (row.biumanagmentLegalEntity) this.businessUnitName = row.biumanagmentLegalEntity.name;
            if (row.divmanagmentLegalEntity) this.division = row.divmanagmentLegalEntity.name;
            if (row.mana) this.departmentName = row.mana.name;
            this.partNumber = row.partNumber;
            this.glAccountId = row.glAccountId;
            this.glAccountName = row.glAccountName;
            this.partDescription = row.partDescription;
            this.stockLineNumber = row.stockLineNumber;
            if (row.isSerialized) {
                this.isSerialized = row.isSerialized;
            }
            else {
                this.isSerialized = false;
            }
    
            this.controlNumber = row.controlNumber;
            this.quantityOnHand = row.quantityOnHand;
            this.quantityReserved = row.quantityReserved;
            this.quantityIssued = row.quantityIssued;
            this.quantityAvailable = row.quantityAvailable;
            this.blackListed = row.blackListed;
            this.blackListedReason = row.blackListedReason;
            this.incident = row.incident;
            this.accident = row.accident;
            this.incident = row.incident;
            this.incidentReason = row.incidentReason;
            this.engineSerialNumber = row.engineSerialNumber;
            this.aircraftTailNumber = row.aircraftTailNumber;
            this.condition = row.condition;
            this.serialNumber = row.serialNumber;
            this.shelfLife = row.shelfLife;
            this.shelfLifeExpirationDate = row.shelfLifeExpirationDate;
            this.site = row.siteName;
            this.warehouse = row.warehouse;
            this.location = row.location;
            this.shelf = row.shelfName;
            this.bin = row.binName;
    
            this.obtainFrom = row.obtainFrom;
            this.owner = row.owner;
            this.traceableTo = row.traceableTo;
            //this.manufacturer = row.manufacturer;
            if (row.man) {
                this.manufacturerId = row.man.name;
            }
            else { this.manufacturerId = "" }
            this.manufacturerLotNumber = row.manufacturerLotNumber;
            this.manufacturingDate = row.manufacturingDate;
            this.manufacturingBatchNumber = row.manufacturingBatchNumber;
            this.partCertificationNumber = row.partCertificationNumber;
            this.certifiedBy = row.certifiedBy;
            this.certifiedDate = row.certifiedDate;
            this.tagdate = row.tagDate;
            this.tagType = row.tagType;
            this.certifiedDueDate = row.certifiedDueDate;
            this.calibrationMemo = row.calibrationMemo;
            this.orderDate = row.orderDate;
            this.purchaseOrderNumber = row.purchaseOrderNumber;
            this.purchaseOrderUnitCost = row.purchaseOrderUnitCost;
            this.repairOrderNumber = row.repairOrderNumber;
            this.repairOrderUnitCost = row.repairOrderUnitCost;
    
    
            this.receivedDate = row.receivedDate;
            this.receiverNumber = row.receiver;
            this.reconciliationNumber = row.reconciliationNumber;
            this.unitSalesPrice = row.unitSalesPrice;
            this.coreUnitCost = row.coreUnitCost;
            this.glAccountId = row.glAccountId;
            this.glAccountName = row.glAccountName;
            this.assetId = row.assetId;
            if (row.isHazardousMaterial) {
                this.isHazardousMaterial = row.isHazardousMaterial;
            }
            else { this.isHazardousMaterial = false; }
    
            this.isPMA = row.isPMA;
            this.isDER = row.isDER;
            this.oem = row.oem;
            this.memo = row.memo;
            this.idNumber = row.idNumber;
    
    
            this.cyclesRemaining = row.cyclesRemaining;
            this.cyclesSinceNew = row.cyclesSinceNew;
            this.cyclesSinceOVH = row.cyclesSinceOVH;
            this.cyclesSinceInspection = row.cyclesSinceInspection;
            this.cyclesSinceRepair = row.cyclesSinceRepair;
            this.timeRemaining = row.timeRemaining;
            this.timeSinceNew = row.timeSinceNew;
            this.timeSinceOVH = row.timeSinceOVH;
            this.timeSinceInspection = row.timeSinceInspection;
            this.lastSinceInspection = row.lastSinceInspection;
            this.lastSinceOVH = row.lastSinceOVH;
            this.lastSinceNew = row.lastSinceNew;
            this.timeSinceRepair = row.timeSinceRepair;
    
            this.createdBy = row.createdBy;
            this.updatedBy = row.updatedBy;
            this.createdDate = row.createdDate;
            this.updatedDate = row.updatedDate;
           // this.loadMasterCompanies();
           

        });
    
    }

     




}