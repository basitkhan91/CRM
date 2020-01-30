import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
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
import * as $ from 'jquery';
import { VendorStepsPrimeNgComponent } from '../vendor-steps-prime-ng/vendor-steps-prime-ng.component';
@Component({
    selector: 'app-vendor-capes',
    templateUrl: './vendor-capes.component.html',
    styleUrls: ['./vendor-capes.component.scss'],
    animations: [fadeInOut]
})
/** anys component*/
export class VendorCapesComponent implements OnInit {
    @ViewChild(VendorStepsPrimeNgComponent) stepper: VendorStepsPrimeNgComponent;
    activeIndex = 2;
    matSpinner: boolean;
    local: any;
    isEnableVendor: boolean = true;
    vendorId: number;
    loadList: boolean = false;
    @Input() vendorCapabilityId: number = 0;

    constructor(public workFlowtService: VendorService, private router: ActivatedRoute, private route: Router, private authService: AuthService, private alertService: AlertService) {
        if (this.local) {
            this.workFlowtService.capesCollection = this.local;
        }
        if (this.workFlowtService.listCollection) {
            this.local = this.workFlowtService.listCollection;
        }
        //this.dataSource = new MatTableDataSource();
        console.log(this.workFlowtService);
        if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
            this.local = this.workFlowtService.listCollection;
            //this.loadData();
        }
        if (this.workFlowtService.listCollection) {
            this.vendorId = this.workFlowtService.listCollection.vendorId;
            console.log(this.vendorId);
        }
        this.alertService.stopLoadingMessage();
        console.log(this.local);
        if (this.local) {
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

    getVendorCapabilityId(id) {
        console.log(id);
        this.vendorCapabilityId = id;
        if (this.vendorCapabilityId) {
            $('#addCapabilityInfo').modal('show');
        }
        this.loadList = false;
    }

    loadListData() {
        this.loadList = !this.loadList;
        this.vendorCapabilityId = 0;
    }

    onAddCapsInfo() {
        this.loadList = !this.loadList;
        this.vendorCapabilityId = null;
    }

    previousClick() {
        this.activeIndex = 1
        this.stepper.changeStep(this.activeIndex);
        // this.vendorService.vendorgeneralcollection = this.local;
        // this.workFlowtService.indexObj.next(this.activeIndex);
        // this.workFlowtService.changeStep('General Information');
        this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');
    }
    nextClick() {
        this.activeIndex = 3;
        this.stepper.changeStep(this.activeIndex);
        // this.workFlowtService.indexObj.next(this.activeIndex);
        // this.workFlowtService.changeStep('Contacts');
        this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-contacts');
    }
}