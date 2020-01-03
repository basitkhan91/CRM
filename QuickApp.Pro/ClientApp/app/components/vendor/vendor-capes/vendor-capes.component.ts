import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
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
import { VendorService } from '../../../services/vendor.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { Vendor } from '../../../models/vendor.model';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Row } from 'primeng/components/common/shared';
import { CustomerService } from '../../../services/customer.service';
@Component({
    selector: 'app-vendor-capes',
    templateUrl: './vendor-capes.component.html',
    styleUrls: ['./vendor-capes.component.scss'],
    animations: [fadeInOut]
})
/** anys component*/
export class VendorCapesComponent implements OnInit {

    activeIndex = 10;
    matSpinner: boolean;
    local: any;
    isEnableVendor: boolean = true;
    vendorId: number;

    constructor(public workFlowtService: VendorService, private router: ActivatedRoute, private route: Router, private authService: AuthService, private alertService: AlertService) {
        if (this.local) {
            this.workFlowtService.capesCollection = this.local;
        }
        // if (this.workFlowtService.generalCollection) {
        //     this.local = this.workFlowtService.generalCollection;
        // }
        //this.dataSource = new MatTableDataSource();
        console.log(this.workFlowtService);        
        if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
        this.local = this.workFlowtService.listCollection.t; 
            //this.loadData();
        }
        if(this.workFlowtService.listCollection) {
            this.vendorId = this.workFlowtService.listCollection.vendorId;
            console.log(this.vendorId);            
        }
        this.alertService.stopLoadingMessage();
        console.log(this.local);
        if(this.local) {
            this.vendorId = this.local.vendorId;
        }
        if (this.workFlowtService.generalCollection) {
                this.vendorId = this.workFlowtService.generalCollection.vendorId;
            }
        console.log(this.workFlowtService.listCollection);
        
    }

    ngOnInit() {


        //this.sourceVendor.isdefaultContact = true;
        this.matSpinner = true;
        this.workFlowtService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-capes';
        this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
        // if (this.local) {
        //     this.loadData();
        // }
        // this.loadCompleteddata();
        // this.loadEmptyObject();
        this.router.queryParams.subscribe((params: Params) => {
        });
    }

    previousClick() {
        this.activeIndex = 0;
        // this.vendorService.vendorgeneralcollection = this.local;
        this.workFlowtService.indexObj.next(this.activeIndex);
        this.workFlowtService.changeStep('General Information');
        this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');
    }
    nextClick() {
        this.activeIndex = 2;
        this.workFlowtService.indexObj.next(this.activeIndex);
        this.workFlowtService.changeStep('Contacts');
        this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-contacts');
    }
}