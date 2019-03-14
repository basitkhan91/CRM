import { Component } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { PageHeaderComponent } from '../../../shared/page-header.component';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Globals } from '../../../globals';

@Component({
    selector: 'app-customer-setup',
    templateUrl: './customer-setup.component.html',
    styleUrls: ['./customer-setup.component.scss'],
    animations: [fadeInOut]
})
/** CustomerSetup component*/
export class CustomerSetupComponent implements OnInit {
    //currentURL: string='';
    //isEnablecontact: boolean = false;;
    //isEnableGeneral: boolean=true;
    //isEnableFinanciaal: boolean=false;
    //isEnableBilling: boolean=false;
    //isEnableShipping: boolean=false;
    //isEnablePerson: boolean=false;
    //isEnableInternation: boolean=false;
    /** CustomerSetup ctor */
    constructor(private _route: Router, private _rte: ActivatedRoute, private cusService: CustomerService, public globals: Globals) {
       
        globals.currentPage = "Contacts";

        
    }
    ngOnInit() {
        this.cusService.isEditMode = false;
    }
  
       
        
    }
   
    
    
