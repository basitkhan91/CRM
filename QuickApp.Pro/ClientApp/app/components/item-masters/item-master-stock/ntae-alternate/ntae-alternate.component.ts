import { OnInit, OnChanges, SimpleChanges, AfterViewInit, Component, ViewChild, ChangeDetectorRef, Inject, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog, SELECT_MULTIPLE_PANEL_PADDING_X } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemMasterService } from '../../../../services/itemMaster.service';
import { MessageSeverity, AlertService } from '../../../../services/alert.service';

@Component({
    selector: 'app-ntae-alternate',
    templateUrl: './ntae-alternate.component.html',
    styleUrls: ['./ntae-alternate.component.scss']
})

/** item-master-stock component*/
export class NTAEAlternateComponent implements OnInit {
    itemMasterId: number;
    itemMasterData: any = {
        partNumber: String,
        partDescription: String,
        Manufacturer: String
    };
    filterItemMaster: any = {
        MappingPNumber: "",
        Description: "",
        ManufacturerId: null,
        itemClassificationId: null
    };
    alternateData: any = {};
    pnData: any = [];
    partsData: any = [];
    alterTableColumns: any[] = [
        { field: "partNumber", header: "PN" },
        { field: "partDescription", header: "Description" },
        { field: "manufacturer", header: "Manufacturer " }
    ];
    nhaTableColumns: any [] = [
        { field: "partNumber", header: "PN" },
        { field: "partDescription", header: "Description" },
        { field: "manufacturer", header: "Manufacturer " }
    ];
    tlaTableColumns: any [] = [
        { field: "partNumber", header: "PN" },
        { field: "partDescription", header: "Description" },
        { field: "manufacturer", header: "Manufacturer " }
    ];
    equivalencyTableColumns: any [] = [
        { field: "partNumber", header: "PN" },
        { field: "partDescription", header: "Description" },
        { field: "manufacturer", header: "Manufacturer " },
        { field: "itemClassification", header: "ITEM CLASSIFICATION " },
        { field: "document", header: "Document " }
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
    selectedNTAETabId: number;
    itenClassificationData: any = [];
    filterPartItemClassificationData: any = [];
    formData = new FormData()



    constructor(public itemser: ItemMasterService, private _actRoute: ActivatedRoute, private alertService: AlertService){
             
    }
   
    ngOnInit(){
        this.itemMasterId = this._actRoute.snapshot.params['id'];
        if(this.itemMasterId !== undefined){
            this.getItemMasterDetailById();
            this.getalterqquparts();
            this.getNtaeData();
            this.ptnumberlistdata();
            this.manufacturerdata();

        }   
    }
    ngOnChanges(changes: SimpleChanges) {
        for (let property in changes) {
            if (property == 'selectedTab') {
                this.selectedTab = changes[property].currentValue
                this.checkTheCurrentTab(this.selectedTab)
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
        this.getNtaeData();
        this.filterItemMaster = {};
    }

    getItemMasterDetailById(){        
        this.itemser.getItemMasterDetailById(this.itemMasterId).subscribe(res => {
            console.log(res, "response of itemMaster");
            this.itemMasterData = res[0];
        })
    }
    getalterqquparts(){
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
    getNtaeData(){
        let reqData = {  
            first:0,
            rows:10,
            sortOrder:1,
            filters:{
                ItemMasterId:this.itemMasterId,
                MappingType:this.selectedNTAETabId,
                ManufacturerId:this.filterItemMaster.ManufacturerId || null,
	            Description:this.filterItemMaster.Description,
	            MappingItemMasterId: this.filterItemMaster.ManufacturerId
            },
            globalFilter:null
         }
        this.itemser.getnhatlaaltequpartlis(reqData).subscribe(res => {
            console.log(res, "parnumbers");
//             partNumber: "PN1234_17"
// partDescription: "PN Description "
// manufacturer: "111"
// manufacturerId: 3
            this.ntaeData = res;
            for(let i = 0; i<this.ntaeData.length; i++){
                // this.filterPNData.push({
                //     label: this.ntaeData[i].partNumber, value : this.ntaeData[i].itemMasterId
                // })
                // this.filterPartDescriptionData.push({
                    // label: this.ntaeData[i].partDescription, value :this.ntaeData[i].partDescription })
                this.filterManufacturerData.push({
                    label: this.ntaeData[i].manufacturer, value : this.ntaeData[i].manufacturerId
                })
                if(this.selectedNTAETabId == 2){
                    this.filterPartItemClassificationData.push({
                        label: this.ntaeData[i].itemClassification, value :this.ntaeData[i].itemClassificationId
                    })
                }
            }
            
        })
    }
    fileUpload(event) {
        console.log(event);
        if (event.files.length === 0)
          return;
    
        // const formData = new FormData();
    
        for (let file of event.files)
          this.formData.append(file.name, file);
      }
    bindPartDataInPopup(event){
        for(let i=0; i<this.partsData.length; i++){
            if(this.partsData[i].itemMasterId == this.alternateData.MappingItemMasterId){
                this.alternateData.Description = this.partsData[i].partDescription;
                this.alternateData.manufacturer = this.partsData[i].manufacturer;
            }
        }
    }

    saveAlternate(){
        var reqData;
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
         reqData = reqDataJson;
         if(this.selectedNTAETabId == 2){
            // Object.keys(reqDataJson).forEach(key => this.formData.append(key, JSON.stringify(reqDataJson[key])));
            this.formData.append('ItemMappingId', "0");
            this.formData.append('ItemMasterId', JSON.stringify(this.itemMasterId));
            this.formData.append('MappingItemMasterId', JSON.stringify(this.alternateData.MappingItemMasterId));
            this.formData.append('MappingType', JSON.stringify(this.selectedNTAETabId));
            this.formData.append('masterCompanyId', JSON.stringify(1));
            this.formData.append('CreatedBy', "admin");
            this.formData.append('UpdatedBy', "admin");
            this.formData.append('IsActive', "true");
            this.formData.append('IsDeleted', "false");

            
            reqData = this.formData
         }
console.log(reqData, "reqData++++++++")
         

         this.itemser.createnhatlaaltequpart (reqData).subscribe(datas => {
             console.log(datas)
            this.alertService.showMessage(
                'Success',
                'Alter Information Added Successfully',
                MessageSeverity.success
            );
            this.getNtaeData();

            // this.getAircraftMappedDataByItemMasterId();

        }, err => {
            const errorLog = err;
            this.errorMessageHandler(errorLog);
           
        })

         console.log(reqData, "reqData+++")


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
        this.filterPNData = this.allpnNumbers;

        const oemFilterData = [...this.allpnNumbers.filter(x => {
            return x.partNumber.toLowerCase().includes(event.query.toLowerCase())
        })]
        console.log(oemFilterData, "oemFilterData+++")
        this.filterPNData = oemFilterData;

        this.filterPNData = [];
        if (this.allpnNumbers) {
            if (this.allpnNumbers.length > 0) {

                for (let i = 0; i < this.allpnNumbers.length; i++) {
                    let partName = this.allpnNumbers[i].partNumber;
                    if (partName) {
                        if (partName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                            this.itemclaColl.push([{
                                "partId": this.allpnNumbers[i].itemMasterId,
                                "partName": partName
                            }]),

                                this.filterPNData.push(partName);
                                this.filterDiscriptionData.push(this.allpnNumbers[i].partDescription)
                        }
                    }
                }
            }
        }
        
    }

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


    private onmanufacturerSuccessful(allWorkFlows: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allManufacturerInfo = allWorkFlows;
        console.log("this.allManufacturerInfo", this.allManufacturerInfo)

    }
    partnmId(event) {
        console.log(event, "event++++")
        if (this.itemclaColl) {
            for (let i = 0; i < this.itemclaColl.length; i++) {
                if (event == this.itemclaColl[i][0].partName) {
                    this.filterItemMaster.MappingItemMasterId = this.itemclaColl[i][0].partId;
                    this.filterItemMaster.MappingPNumber = event;

                    // this.disableSavepartNumber = true;
                    // this.selectedActionName = event;
                }
            }
            console.log(this.filterItemMaster.MappingItemMasterId, "this.filterItemMaster.MappingItemMasterId++++")
            for(let j=0; j < this.allpnNumbers.length; j++){

                if(this.filterItemMaster.MappingItemMasterId === this.allpnNumbers[j].itemMasterId){
                    this.filterItemMaster.ManufacturerId = this.allpnNumbers[j].manufacturerId;
                }
            }
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
            this.getNtaeData()
            return false;
            // this.itemMasterData = res[0];
        }),
        error=>{
            console.log( "ERROR:" + error );
        }
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




}

