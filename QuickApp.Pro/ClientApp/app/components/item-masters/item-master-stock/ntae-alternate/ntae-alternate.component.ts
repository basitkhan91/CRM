import { OnInit, AfterViewInit, Component, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
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
    filterItemMaster: any = {};
    alternateData: any = {};
    pnData: any = [];
    partsData: any = [];
    alterTableColumns: any[] = [
        { field: "partNumber", header: "PN" },
        { field: "partDescription", header: "Description" },
        { field: "manufacturer", header: "Manufacturer " }
    ];
    ntaeData: any = [];

    constructor(public itemser: ItemMasterService, private _actRoute: ActivatedRoute, private alertService: AlertService){
             
    }
   
    ngOnInit(){
        this.itemMasterId = this._actRoute.snapshot.params['id'];
        if(this.itemMasterId !== undefined){
            this.getItemMasterDetailById();
            this.getalterqquparts();
            this.getNtaeData();
        }   
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
                MappingType:1
            },
            globalFilter:null
         }
        this.itemser.getnhatlaaltequpartlis(reqData).subscribe(res => {
            console.log(res, "parnumbers");
            this.ntaeData = res;                            
        })
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
        let reqData = {  
            ItemMappingId:0,
            ItemMasterId:this.itemMasterId,
            MappingItemMasterId: this.alternateData.MappingItemMasterId,
            MappingType:1,
            masterCompanyId:1,
            CreatedBy:"admin",
            UpdatedBy:"admin",
            CreatedDate: new Date(),
            UpdatedDate: new Date(),
            IsActive:true,
            IsDeleted:false                            
         }

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

    errorMessageHandler(log) {
        this.alertService.showMessage(
            'Error',
            log.error.error,
            MessageSeverity.error
        );
    }



}

