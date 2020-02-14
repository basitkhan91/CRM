import { OnInit, OnChanges, SimpleChanges, AfterViewInit, Component, ViewChild, ChangeDetectorRef, Inject, Input, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog, SELECT_MULTIPLE_PANEL_PADDING_X } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { MessageSeverity, AlertService } from '../../../../services/alert.service';
import { ConfigurationService } from '../../../../services/configuration.service';
import { pulloutRequiredFieldsOfForm } from '../../../../validations/form.validator';
declare var $ : any;

@Component({
    selector: 'app-ntae-alternate',
    templateUrl: './ntae-alternate.component.html',
    styleUrls: ['./ntae-alternate.component.scss']
})

/** item-master-stock component*/
export class NTAEAlternateComponent implements OnInit {
    itemMasterId: any;
    itemMasterData: any = {};
    filterItemMaster: any = {
        MappingPNumber: "",
        Description: "",
        ManufacturerId: null,
        itemClassificationId: null
    };
    modalName: any = "";
    alternateData: any = {};
    pnData: any = [];
    partsData: any = [];
    alterTableColumns: any[] = [
        { field: "altPartNo", header: "PN" },
        { field: "altPartDescription", header: "Description" },
        { field: "manufacturer", header: "Manufacturer " }
    ];
    nhaTableColumns: any [] = [
        { field: "altPartNo", header: "PN" },
        { field: "altPartDescription", header: "Description" },
        { field: "manufacturer", header: "Manufacturer " }
    ];
    tlaTableColumns: any [] = [
        { field: "altPartNo", header: "PN" },
        { field: "altPartDescription", header: "Description" },
        { field: "manufacturer", header: "Manufacturer " }
    ];
    equivalencyTableColumns: any [] = [
        { field: "altPartNo", header: "PN" },
        { field: "altPartDescription", header: "Description" },
        { field: "manufacturer", header: "Manufacturer " },
        { field: "itemClassification", header: "ITEM CLASSIFICATION " },
    ];
    ntaeData: any = [];
    filterPNData: any = [];
    filterPartDescriptionData: any = [];
    filterManufacturerData: any = [];
    loadingIndicator: boolean;
    allpnNumbers: any = [];
    itemclaColl: any = [];
    allManufacturerInfo: any = [];
    filterDiscriptionData: any = [];
    // selectedTab: any = "";
    @Input() selectedTab: string = "";
    ntaeTableColumns: any[];
    selectedNTAETabId: any;
    itenClassificationData: any = [];
    filterPartItemClassificationData: any = [];
    formDataNtae = new FormData()
    listOfErrors: any;
    displayNtae: boolean = false;
    modelValue: boolean = false;
    ntaeDataTableTablePageSize: Number = 10;
    @ViewChild('closeAddPopup') closeAddPopup : ElementRef 


    constructor(public itemser: ItemMasterService, private _actRoute: ActivatedRoute, private alertService: AlertService,  private configurations: ConfigurationService){
        this.itemMasterId = this._actRoute.snapshot.params['id'];

    }
   
    ngOnInit(){
         
    }
    ngOnChanges(changes: SimpleChanges) {
        for (let property in changes) {
            if (property == 'selectedTab') {
                this.filterItemMaster = {};
                this.selectedTab = changes[property].currentValue
                this.checkTheCurrentTab(this.selectedTab);
                if(this.itemMasterId !== undefined){
                    this.getItemMasterDetailById();
                    this.getalterqquparts();
                    // this.getNtaeData(true);
                    this.ptnumberlistdata();
                    this.manufacturerdata();
        
                }  
            //   console.log('Current: ', changes[property].currentValue);
            }
          }
        console.log(changes, "changesss")
        // this.selectedTab = 

      }
    checkTheCurrentTab(tabName){
        if(tabName == "NHA"){
            this.ntaeTableColumns = this.nhaTableColumns
            this.selectedNTAETabId = 3             
        } else if(tabName == "TLA"){
            this.ntaeTableColumns = this.tlaTableColumns
            this.selectedNTAETabId = 4
        } else if(tabName == "Alternate"){
            this.ntaeTableColumns = this.alterTableColumns
            this.selectedNTAETabId = 1
        } else if(tabName == "Equivalency"){
            this.ntaeTableColumns = this.equivalencyTableColumns
            this.selectedNTAETabId = 2
        }
        if(this.itemMasterId !== undefined){
            this.getNtaeData(true);
        }
        
        this.filterItemMaster = {};
    }

    getItemMasterDetailById(){        
        this.itemser.getItemMasterDetailById(this.itemMasterId).subscribe(res => {
            console.log(res, "response of itemMaster");
            this.itemMasterData = res[0];
        })
    }
    getalterqquparts(){
        this.partsData = [];
        this.pnData = [];
        this.itemser.getalterqquparts(this.itemMasterId).subscribe(res => {
            console.log(res, "parnumbers");          
            this.partsData = res[0];
            for(let i=0; i<this.partsData.length; i++){
                this.pnData.push({
                    label: this.partsData[i].partNumber, value : this.partsData[i].itemMasterId
                }) 
            }         
            
        })
    }
    getNtaeData(status: boolean){
        this.filterManufacturerData = [];
        this.filterDiscriptionData = [];
        this.filterPartItemClassificationData = [];
        let reqData = {  
                first:0,
                rows:10,
                sortOrder:1,
                filters:{
                    ItemMasterId:parseInt(this.itemMasterId),
                    MappingType:this.selectedNTAETabId,
                    ManufacturerId:this.filterItemMaster.ManufacturerId || null,
                    Description:this.filterItemMaster.Description,
                    MappingItemMasterId: this.filterItemMaster.MappingItemMasterId
                },
                globalFilter:null
             }

             if(this.selectedNTAETabId == 2){
                this.itemser.getequivalencypartlist(reqData).subscribe(res => {

                    this.ntaeData = res;
                    for(let i = 0; i<this.ntaeData.length; i++){

                        if(this.ntaeData[i].attachmentDetails){
                            this.ntaeData[i]["fileName"]= this.ntaeData[i].attachmentDetails.ad.fileName
                        }
                       
                        this.filterManufacturerData.push({
                            label: this.ntaeData[i].manufacturer, value : this.ntaeData[i].manufacturerId
                        })
                        this.filterDiscriptionData.push({
                            label: this.ntaeData[i].altPartDescription, value : this.ntaeData[i].altPartDescription
                        })
                        this.filterPartItemClassificationData.push({
                            label: this.ntaeData[i].itemClassification, value :this.ntaeData[i].itemClassificationId
                        })

                    }
                })
               
             } else {
                this.itemser.getnhatlaaltequpartlis(reqData).subscribe(res => {

                    this.ntaeData = res;
                    for(let i = 0; i<this.ntaeData.length; i++){
                       
                        this.filterManufacturerData.push({
                            label: this.ntaeData[i].manufacturer, value : this.ntaeData[i].manufacturerId
                        })
                        this.filterDiscriptionData.push({
                            label: this.ntaeData[i].altPartDescription, value : this.ntaeData[i].altPartDescription
                        })
 
                    }
                    
                })
             }
        
        
    }
    fileUploadNtae (event) {
        const file = event.target.files;

        console.log(file);
        if (file.length > 0) {
            this.formDataNtae.append('file', file[0])
        }

        console.log(this.formDataNtae, "this.formData.append++++")
      }
    bindPartDataInPopup(event){
        for(let i=0; i<this.partsData.length; i++){
            if(this.partsData[i].itemMasterId == this.alternateData.MappingItemMasterId){
                this.alternateData.Description = this.partsData[i].partDescription;
                this.alternateData.manufacturer = this.partsData[i].manufacturer;
                if(this.selectedNTAETabId == 2){
                    this.alternateData.itemClassificationId = this.partsData[i].itemClassification
                }
            }
        }
    }

    saveAlternate(saveNtaeTabForm){
        console.log(saveNtaeTabForm, "saveNtaeTabForm++++")
        this.listOfErrors = pulloutRequiredFieldsOfForm(saveNtaeTabForm);         
        if(this.listOfErrors.length > 0){
           
            this.displayNtae = true;
            this.modelValue = true;
             return false;

        } else {
        
       
         if(this.selectedNTAETabId == 2){
             console.log(this.formDataNtae, "this.formData++++++++++")
            // Object.keys(reqDataJson).forEach(key => this.formData.append(key, JSON.stringify(reqDataJson[key])));
            this.formDataNtae.append('ItemMappingId', "0");
            this.formDataNtae.append('ItemMasterId', this.itemMasterId);
            this.formDataNtae.append('MappingItemMasterId', this.alternateData.MappingItemMasterId);
            this.formDataNtae.append('MappingType', this.selectedNTAETabId);
            this.formDataNtae.append('masterCompanyId', "1");
            this.formDataNtae.append('CreatedBy', "admin");
            this.formDataNtae.append('UpdatedBy', "admin");
            this.formDataNtae.append('CreatedDate', "admin");
            this.formDataNtae.append('UpdatedDate', "admin");
            this.formDataNtae.append('IsActive', "true");
            this.formDataNtae.append('IsDeleted', "false");

            console.log(this.formDataNtae, "formDataNtae+++++")
            // reqData = this.formDataNtae;
            this.itemser.createNTAEFileUploadForEquivalency (this.formDataNtae).subscribe(datas => {
                console.log(datas)
               this.alertService.showMessage(
                   'Success',
                   'Alter Information Added Successfully',
                   MessageSeverity.success
               );
               
               this.getNtaeData(true);
               this.getalterqquparts();
               this.closeModal()
               
   
               // this.getAircraftMappedDataByItemMasterId();
   
           }, err => {
               const errorLog = err;
               this.errorMessageHandler(errorLog);
              
           })
         } else {
            let reqDataJson = {  
                ItemMappingId:0,
                ItemMasterId:this.itemMasterId,
                MappingItemMasterId: this.alternateData.MappingItemMasterId,
                MappingType: this.selectedNTAETabId,
                masterCompanyId:1,
                CreatedBy:"admin",
                UpdatedBy:"admin",
                CreatedDate: new Date(),
                UpdatedDate: new Date(),
                IsActive:true,
                IsDeleted:false                            
             }
            this.itemser.createnhatlaaltequpart (reqDataJson).subscribe(datas => {
                console.log(datas)
               this.alertService.showMessage(
                   'Success',
                   'Alter Information Added Successfully',
                   MessageSeverity.success
               );
               this.getNtaeData(true);
               this.closeModal();
               this.getalterqquparts();
   
               // this.getAircraftMappedDataByItemMasterId();
   
           }, err => {
               const errorLog = err;
               this.errorMessageHandler(errorLog);
              
           })
         }


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
        this.allpnNumbers = allWorkFlows;        
    }

    filetrDropdownValues(event, type){
        this.filterPNData = this.ntaeData;
        console.log(this.filterPNData);
        const oemFilterData = [...this.ntaeData.filter(x => {
            return x.partNumber.toLowerCase().includes(event.query.toLowerCase())
        })]
        console.log(oemFilterData, "oemFilterData+++")
        this.filterPNData = oemFilterData;

        this.filterPNData = [];
        if (this.ntaeData) {
            if (this.ntaeData.length > 0) {

                for (let i = 0; i < this.ntaeData.length; i++) {
                    let partName = this.ntaeData[i].altPartNo;
                    if (partName) {
                        if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                            this.itemclaColl.push([{
                                "partId": this.ntaeData[i].mappingItemMasterId,
                                "partName": partName
                            }]),

                                this.filterPNData.push(partName);
                                this.filterDiscriptionData.push(this.ntaeData[i].altPartDescription)
                        }
                    }
                }
            }
        }
        
    }
    // filetrDropdownValues(event, type){
    //     this.filterPNData = this.allpnNumbers;
    //     console.log(this.filterPNData);
    //     const oemFilterData = [...this.allpnNumbers.filter(x => {
    //         return x.partNumber.toLowerCase().includes(event.query.toLowerCase())
    //     })]
    //     console.log(oemFilterData, "oemFilterData+++")
    //     this.filterPNData = oemFilterData;

    //     this.filterPNData = [];
    //     if (this.allpnNumbers) {
    //         if (this.allpnNumbers.length > 0) {

    //             for (let i = 0; i < this.allpnNumbers.length; i++) {
    //                 let partName = this.allpnNumbers[i].partNumber;
    //                 if (partName) {
    //                     if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //                         this.itemclaColl.push([{
    //                             "partId": this.allpnNumbers[i].itemMasterId,
    //                             "partName": partName
    //                         }]),

    //                             this.filterPNData.push(partName);
    //                             this.filterDiscriptionData.push(this.allpnNumbers[i].partDescription)
    //                     }
    //                 }
    //             }
    //         }
    //     }
        
    // }

    private onpartnumberloadsuccessfull(allWorkFlows: any[]) {

        // this.descriptionbyPart = allWorkFlows[0]
        this.filterItemMaster.Description = allWorkFlows[0].partDescription;
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
    downloadFileUpload(rowData) {
        const url = `${this.configurations.baseUrl}/api/FileUpload/downloadattachedfile?filePath=${rowData.attachmentDetails.ad.link}`;
        window.location.assign(url);       
    }

    private onmanufacturerSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allManufacturerInfo = allWorkFlows;
        console.log("this.allManufacturerInfo", this.allManufacturerInfo)

    }
    partnmId(event) {
        console.log(this.ntaeData, "this.ntaeData++++")
        console.log(event, "event++++")
        if (this.itemclaColl) {
            for (let i = 0; i < this.ntaeData.length; i++) {
                if (event == this.ntaeData[i].altPartNo) {
                    this.filterItemMaster.MappingItemMasterId = this.ntaeData[i].mappingItemMasterId;
                    this.filterItemMaster.MappingPNumber = event;
                    this.filterItemMaster.ManufacturerId = this.ntaeData[i].manufacturerId;
                    if(this.selectedNTAETabId == 2){
                        this.filterItemMaster.itemClassificationId = this.ntaeData[i].itemClassificationId
                    }
                    

                    // this.disableSavepartNumber = true;
                    // this.selectedActionName = event;
                }
            }

            console.log(this.filterItemMaster.MappingItemMasterId, "this.filterItemMaster.MappingItemMasterId++++")
            // for(let j=0; j < this.allpnNumbers.length; j++){

            //     if(this.filterItemMaster.MappingItemMasterId === this.allpnNumbers[j].itemMasterId){
            //         this.filterItemMaster.ManufacturerId = this.allpnNumbers[j].manufacturerId;
            //     }
            // }
            console.log(this.filterItemMaster.ManufacturerId, "this.filterItemMaster.ManufacturerId+=");

            this.itemser.getDescriptionbypart(event).subscribe(
                results => this.onpartnumberloadsuccessfull(results[0]),
                error => this.onDataLoadFailed(error)


            );
        }
    }

    //Delete NTAE ROW deletenhatlaaltequpart
    deleteNTAERow(itemMasterId, index){        
        this.itemser.deleteNTAERow(itemMasterId, "admin").subscribe(res => {
            console.log(res, "response of itemMaster+++++++++++++");
            this.getNtaeData(true)
            return false;
            // this.itemMasterData = res[0];
        }),
        error=>{
            console.log( "ERROR:" + error );
        }
    }

    closeModal(){
        this.closeAddPopup.nativeElement.click();
        this.alternateData = {}
        this.formDataNtae = new FormData()
    }

    errorMessageHandler(log) {
        this.alertService.showMessage(
            'Error',
            log.error.error,
            MessageSeverity.error
        );
    }

    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

    }

    getPageCount(totalNoofRecords, pageSize) {
        return Math.ceil(totalNoofRecords / pageSize)
    }




}

