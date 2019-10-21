﻿import { Component, OnInit, ViewChild } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { ChargeService } from '../../services/charge.service';
import {VendorService} from '../../services/vendor.service';
import {CurrencyService} from '../../services/currency.service';
import {IntegrationService} from '../../services/integration-service';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { ConfigurationService } from '../../services/configuration.service';
import { PurchaseOrderService} from '../../services/purchase-order.service';
import {GLAccountService} from '../../services/glAccount.service';
import { Charge } from '../../models/charge.model';
import {PercentService} from '../../services/percent.service';
import { AuditHistory } from '../../models/audithistory.model';
import { MasterCompany } from '../../models/mastercompany.model';
import { LegalEntityService } from '../../services/legalentity.service';
import { Table } from 'primeng/table';
import { validateRecordExistsOrNot, getObjectById,  selectedValueValidate, editValueAssignByCondition } from '../../generic/autocomplete';



@Component({
    selector: 'app-charges',
    templateUrl: './charges.component.html',
    styleUrls: ['./charges.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class ChargesComponent implements OnInit {
    totalRecords: number = 0;
    totalPages: number = 0;
    pageSize: number = 10;
    chargeData: any[];
    isEdit: boolean = false;
    addNewCharge: Charge= new Charge();
    chargeHeaders = [
        { field: 'chargeName', header: 'Charge' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'description', header: 'Description' },
        { field: 'symbol', header: 'Currency' },
        { field: 'functionalCurrencySymbol', header: 'Functional Currency' },
        { field: 'cost', header: 'Cost' },
        { field: 'markUpPercentage', header: 'Mark up %' },
        { field: 'purchaseOrderNumber', header: 'Purchase Order' },
        { field: 'vendorName', header: 'Vendor Name' },
        { field: 'integrationPortalDescription', header: 'Integration' },
        { field: 'glAccountName', header: 'GL Account' },      
        { field: 'memo', header: 'Memo' },
    ]
    selectedColumns = this.chargeHeaders;
    selectedRowforDelete: Charge;
    viewRowData: any;
    vendorList:any[];
    percentageList:any[];
    integrationList:any[];
    purchaseOrderList:any[];
    glAccountList:any[];
    filteredVendorList:any[];
    filteredIntegrationList:any[];
    currencyList:any[];
    filteredPurchaseOrderList: any[];
    filteredGLAccountList:any[];
    filteredChargeList:any[];
    companyList:any[];
    buList:any[];
    divisionList:any[];
    departmentList:any[];
    selectedCompanyID:number=0;
    selectedBUId:number=0;
    selectedDivisionID:number=0;
    selectedDeptID:number=0;
    allmgmtData:any[];
    mgmtStructureId:any;
    isEditMode: boolean = false;
    selectedRecordForEdit: any;
    disableSaveForCharge:boolean;
    disableForMgmtStructure:boolean;
    auditHistory:any[];
    @ViewChild('dt')
    private table: Table;

    constructor(private breadCrumb: SingleScreenBreadcrumbService, private configurations: ConfigurationService,
        private authService: AuthService, private alertService: AlertService, public chargeService: ChargeService ,
        public vendorService:VendorService , public currencyService:CurrencyService, public integrationService:IntegrationService,
        public purchaseOrderService: PurchaseOrderService, public glAccountService:GLAccountService,
        public legalEntityService: LegalEntityService, public percentService: PercentService) {


    }
    ngOnInit(): void {
        this.getChargeList();
        this.loadVendorData();
        this.loadCurrencyData();
        this.loadIntegrationData();
        this.loadPurchaseOrderData();
        this.loadGLAccountData();
        this.loadManagementdata();
        this.loadPercentData();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-charges';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }

    getChargeList(): void {
        this.chargeService.getChargeList().subscribe(res => {
            const responseData = res[0];
             this.chargeData = responseData;//.columnData;
            this.totalRecords = responseData==null?0: responseData.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        })
    }
    loadPercentData():void {
        this.percentService.getPercentages().subscribe(res=>{
            this.percentageList=res[0];
        });
    }
    loadVendorData():void {
		this.alertService.startLoadingMessage();
		this.vendorService.getVendorsBasic().subscribe( res=>{
            this.vendorList=res[0];
            this.alertService.stopLoadingMessage();
        });
    }
    loadIntegrationData():void{
        this.integrationService.getIntegrationsBasic().subscribe( res=>{
            this.integrationList=res;
        });
    }
    loadCurrencyData():void{
        this.currencyService.getCurrencyList().subscribe(res=>{
            this.currencyList=res[0];
        })
    }
    loadPurchaseOrderData():void{
        this.purchaseOrderService.getPurchaseOrdersBasic().subscribe(res=>{
            this.purchaseOrderList=res[0];
        });
    }
    loadGLAccountData():void{
        this.glAccountService.getGlAccountBasic().subscribe(res=>{
            this.glAccountList=res[0];
        });
    }
    loadManagementdata() {
		this.legalEntityService.getManagemententity().subscribe(
			res => {this.loadHierarchy(res[0])
            });
    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    resetChargeForm(): void {
        this.isEditMode=false;
        this.disableForMgmtStructure = true;
        this.addNewCharge = new Charge();
        this.addNewCharge={...this.addNewCharge, isActive:true, isDeleted:false};
        this.selectedCompanyID=0;
        this.selectedDeptID=0;
        this.selectedBUId=0;
        this.selectedDivisionID=0;
    }
    resetViewData():void {
        this.viewRowData = undefined;
    }
    changePage(event: { first: any; rows: number }) {
        console.log(event);
        const pageIndex = (event.first / event.rows);
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }
    changeStatus(rowData):void {
        console.log(rowData);
        const data = { ...rowData }
        this.chargeService.updateCharge(data).subscribe(() => {
            // this.getUOMList();
            this.alertService.showMessage(
                'Success',
                `Updated Status Successfully  `,
                MessageSeverity.success
            );
        })

    }

    delete(rowData):void {
        this.selectedRowforDelete = rowData;

    }
    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        this.table.reset();
        this.getChargeList();
    }
 
    editCharge(rowData) {
        console.log(rowData);
        this.isEditMode = true;
        this.disableSaveForCharge = false;
        this.disableForMgmtStructure=false;
        this.addNewCharge = { ...rowData, 
            chargeName: getObjectById('chargeId', rowData.chargeId, this.chargeData),
            vendorId: getObjectById('vendorId', rowData.vendorId, this.vendorList) ,
            purchaseOrderId:getObjectById('purchaseOrderId', rowData.purchaseOrderId, this.purchaseOrderList) ,
            integrationPortalId: getObjectById('integrationPortalId', rowData.integrationPortalId, this.integrationList),
            glAccountId: getObjectById('glAccountId', rowData.glAccountId, this.glAccountList)
        };
        this.selectedRecordForEdit = { ...this.addNewCharge }
        this.mgmtStructureId=this.selectedRecordForEdit.managementStructureId;
        this.populateMgmtStructure(this.selectedRecordForEdit.managementStructureId);
        console.log(this.addNewCharge);
    }
 

    deleteConfirmation(value):void {
        if (value === 'Yes') {
            this.chargeService.deleteCharge(this.selectedRowforDelete.chargeId).subscribe(() => {
                this.getChargeList();
                this.alertService.showMessage(
                    'Success',
                    `Deleted Charge Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }
    viewSelectedRow(rowData) {
        console.log(rowData);
        this.viewRowData = rowData;
    }
 

    saveCharge() {
        const data = {
            ...this.addNewCharge, createdBy: this.userName, updatedBy: this.userName,
            chargeName: editValueAssignByCondition('chargeName', this.addNewCharge.chargeName),
            vendorId:editValueAssignByCondition('vendorId', this.addNewCharge.vendorId),
            purchaseOrderId:editValueAssignByCondition('purchaseOrderId', this.addNewCharge.purchaseOrderId),
            integrationPortalId:editValueAssignByCondition('integrationPortalId', this.addNewCharge.integrationPortalId),
            glAccountId:editValueAssignByCondition('glAccountId', this.addNewCharge.glAccountId),
            managementStructureId:this.mgmtStructureId

        };
        if (!this.isEditMode) {
            this.chargeService.newCharge(data).subscribe(() => {
                this.resetChargeForm();
                this.getChargeList();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Charge Successfully`,
                    MessageSeverity.success
                );
            },
            (error)=>{
                this.alertService.showMessage(
                    'Error',
                    error,
                    MessageSeverity.error
                );
            })
        } else {
            this.chargeService.updateCharge(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEditMode = false;
                this.resetChargeForm();
                this.getChargeList();
                this.alertService.showMessage(
                    'Success',
                    `Updated Charge Successfully`,
                    MessageSeverity.success
                );
            })
        }
    }

    selectedCharge(rowData):void {
        const exists = selectedValueValidate('chargeName', rowData, this.selectedRecordForEdit)

        this.disableSaveForCharge = !exists;
    }
  

    checkChargeExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.chargeData, this.selectedRecordForEdit);
        if (exists.length > 0) {
            this.disableSaveForCharge= true;
        }
        else {
            this.disableSaveForCharge = false;
        }

    }
    filterCharge(event):void {
        this.filteredChargeList = this.chargeData;
       
        const CHARGEDATA = [...this.filteredChargeList.filter(x => {
            return x.chargeName.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.filteredChargeList = CHARGEDATA;

    }
    filterVendor(event):void {
        this.filteredVendorList = this.vendorList;
        //const VENDORDATA =[...this.vendorList]
        const VENDORDATA = [...this.vendorList.filter(x => {
            return x.vendorName.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.filteredVendorList = VENDORDATA;
    }
    filterIntegration(event) :void {
        this.filteredIntegrationList = this.integrationList;
        const INTDATA = [...this.integrationList.filter(x => {
            return x.description.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.filteredIntegrationList = INTDATA;
    }
    filterPurchaseOrder(event):void{
        this.filteredPurchaseOrderList=this.purchaseOrderList;
        const PODATA = [...this.purchaseOrderList.filter(x => {
            return x.purchaseOrderNumber.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.filteredPurchaseOrderList = PODATA;
    }
    filterGLAccount(event):void{
        this.filteredGLAccountList=this.glAccountList;
        const GLADATA = [...this.glAccountList.filter(x => {
            return x.accountName.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.filteredGLAccountList = GLADATA;
    }
    loadHierarchy(mgmtStructureData){
        this.allmgmtData=mgmtStructureData;
        this.companyList= this.allmgmtData.filter(c=> c.parentId==null);
        }

    companyselected():void {
            console.log(`Company :${ this.selectedCompanyID}`);
    
            if(this.selectedCompanyID.toString()!=="0")
            {
            this.mgmtStructureId=this.selectedCompanyID;
            this.disableForMgmtStructure=false;
            }
            else
            {
                this.disableForMgmtStructure=true;
            }
            this.divisionList=[];
            this.departmentList=[];
            this.selectedBUId=0;
            this.selectedDeptID=0;
            this.selectedDivisionID=0;
            this.buList=this.allmgmtData.filter(c=>c.parentId===this.selectedCompanyID);
        }
       
    buselected():void {
        console.log(`BU :${ this.selectedBUId}`);
        this.mgmtStructureId=this.selectedBUId;
        if(this.selectedBUId.toString()!=="0")
        {
          this.mgmtStructureId=this.selectedBUId;
        }else{
          this.mgmtStructureId=this.selectedCompanyID;
        }

        this.departmentList=[];
        this.selectedDeptID=0;
        this.selectedDivisionID=0;
         this.divisionList=this.allmgmtData.filter(c=>c.parentId===this.selectedBUId);
      }
    
    divisionselected():void{
        console.log(`Division id :${ this.selectedDivisionID}`);
        if(this.selectedDivisionID.toString()!=="0")
        {
          this.mgmtStructureId=this.selectedDivisionID;
        }else{
          this.mgmtStructureId=this.selectedBUId;
        }
       this.departmentList=this.allmgmtData.filter(c=>c.parentId===this.selectedDivisionID);
    }
      
    departmentselected():void{
          if(this.selectedDeptID.toString()!=="0")
          {
            this.mgmtStructureId=this.selectedDeptID;
          }else{
            this.mgmtStructureId=this.selectedDivisionID;
          }
        
    }

    populateMgmtStructure(mgmtStructureId:number):void{
        // find the record first
       let  mgmtRecord=this.findmgmtRecord(mgmtStructureId);
       let level0siblings: any[] =null;
       let level0parent:any=null;
       let level1siblings: any[] =null;
       let level1parent:any=null;
       let level2siblings: any[] =null;
       let level2parent:any=null;
       let level3siblings: any[] =null;
       let level3parent:any=null;
       let level4siblings: any[] =null;
       let level4parent:any=null;
       if(mgmtRecord!==null && mgmtRecord.parentId!==null)
       {
            level0siblings= this.findmgmtSiblingRecords(mgmtRecord.parentId);
            level0parent= this.findmgmtRecord(mgmtRecord.parentId);
       }
       if(level0parent!=null && level0parent.parentId!==null)
       {
            level1siblings= this.findmgmtSiblingRecords(level0parent.parentId);
            level1parent= this.findmgmtRecord(level0parent.parentId);
       }
       if(level1parent!=null && level1parent.parentId!==null)
       {
            level2siblings= this.findmgmtSiblingRecords(level1parent.parentId);
            level2parent= this.findmgmtRecord(level1parent.parentId);
       }
       if(level2parent!=null && level2parent.parentId!==null)
       {
            level3siblings= this.findmgmtSiblingRecords(level2parent.parentId);
            level3parent= this.findmgmtRecord(level2parent.parentId);
       }
       if(level3parent!=null && level3parent.parentId!==null)
       {
            level4siblings= this.findmgmtSiblingRecords(level3parent.parentId);
            level4parent= this.findmgmtRecord(level3parent.parentId);
       }

       //means this is a company that is selected hence it has no parent
       if(level0parent===null )
       {
           this.selectedCompanyID=mgmtStructureId;
           this.selectedBUId=0;
           this.selectedDivisionID=0;
           this.selectedDeptID=0;
           return;
       }
       // this means bu is selected as Bu will have a level0 parent but nothing abobie
       if(level1parent===null )
       {
           this.buList=level0siblings;
           this.selectedBUId=mgmtStructureId;
           this.selectedCompanyID=level0parent.managementStructureId;
           this.selectedDivisionID=0;
           this.selectedDeptID=0;
           return;
       }
     // this means division is selected as Bu will have a level0 parent but nothing abobie
     if(level2parent===null )
     {
         this.divisionList=level0siblings
         this.selectedDivisionID=mgmtStructureId;
         this.buList=level1siblings;
         this.selectedBUId=level0parent.managementStructureId;
         this.selectedCompanyID=level1parent.managementStructureId;
         this.selectedDeptID=0;
         return;
     }
     // this means dept is selected
     if(level3parent===null )
     {
         
          this.departmentList=level0siblings;
         this.selectedDeptID=mgmtStructureId;
         this.divisionList=level1siblings;
         this.selectedDivisionID=level0parent.managementStructureId;
         this.buList=level2siblings;
         this.selectedBUId=level1parent.managementStructureId;
         this.selectedCompanyID=level2parent.managementStructureId;
         return;
        
     }

    }
     
    findmgmtRecord(id:number):any{
         return  this.allmgmtData.find(c=> c.managementStructureId===id);
     }
     
    findmgmtSiblingRecords(parentid:number):any[]{
        return  this.allmgmtData.filter(c=>c.parentId==parentid);
    } 
    getAuditHistoryById(rowData) {
        this.chargeService.getChargeAudit(rowData.chargeId).subscribe(res => {
            this.auditHistory = res;
        })
    }
    getColorCodeForHistory(i, field, value) {
        const data = this.auditHistory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }
}


