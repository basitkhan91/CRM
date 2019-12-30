import { OnInit, AfterViewInit, Component, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog, SELECT_MULTIPLE_PANEL_PADDING_X } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemMasterService } from '../../../../services/itemMaster.service';

@Component({
    selector: 'app-ntae-alternate',
    templateUrl: './ntae-alternate.component.html',
    styleUrls: ['./ntae-alternate.component.scss']
})

/** item-master-stock component*/
export class NTAEAlternateComponent implements OnInit {
    itemMasterId: number;
    itemMasterData: any = {
        partNumber: '',
        partDescription: '',
        Manufacturer: ''
    };

    constructor(public itemser: ItemMasterService, private _actRoute: ActivatedRoute,){
        this.itemMasterId = this._actRoute.snapshot.params['id'];
        if(this.itemMasterId !== undefined){
            this.getItemMasterDetailById()
        }        
    }
   
    ngOnInit(){

    }

    getItemMasterDetailById(){        
        this.itemser.getItemMasterDetailById(this.itemMasterId).subscribe(res => {
            this.itemMasterData = res[0];
        })
    }
}

