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
import { editValueAssignByCondition } from '../../../generic/autocomplete';
@Component({
    selector: 'app-vendor-capes',
    templateUrl: './vendor-capes.component.html',
    styleUrls: ['./vendor-capes.component.scss'],
    animations: [fadeInOut]
})
/** anys component*/
export class VendorCapesComponent implements OnInit {
    activeIndex = 2;
    matSpinner: boolean;
    local: any;
    isEnableVendor: boolean = true;
    vendorId: number;
    loadList: boolean = false;
    @Input() vendorCapabilityId: number = 0;
    isvendorEditMode: any;
    constructor(public vendorService: VendorService, private router: ActivatedRoute, private route: Router, private authService: AuthService, private alertService: AlertService) {
        if (this.local) {
            this.vendorService.capesCollection = this.local;
        }
        if (this.vendorService.listCollection) {
            this.local = this.vendorService.listCollection;
        }
        //this.dataSource = new MatTableDataSource();
        console.log(this.vendorService);
        if (this.vendorService.listCollection && this.vendorService.isEditMode == true) {
            this.local = this.vendorService.listCollection;
            //this.loadData();
        }
        if (this.vendorService.listCollection) {
            this.vendorId = this.vendorService.listCollection.vendorId;
            console.log(this.vendorId);
        }
        this.alertService.stopLoadingMessage();
        console.log(this.local);
        if (this.local) {
            this.vendorId = this.local.vendorId;
        }
        if (this.vendorService.listCollection) {
            this.vendorId = this.vendorService.listCollection.vendorId;
        }
        console.log(this.vendorService.listCollection);

    }

    ngOnInit() {
        this.vendorService.currentEditModeStatus.subscribe(message => {
            this.isvendorEditMode = message;
        });

        //this.sourceVendor.isdefaultContact = true;
        this.matSpinner = true;
        this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-capes';
        this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);
        // if (this.local) {
        //     this.loadData();
        // }
        // this.loadCompleteddata();
        // this.loadEmptyObject();
        // this.router.queryParams.subscribe((params: Params) => {
        // });
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
        this.vendorService.changeofTab(this.activeIndex);
        // this.vendorService.vendorgeneralcollection = this.local;
        // this.vendorService.indexObj.next(this.activeIndex);
        // this.vendorService.changeStep('General Information');
        // this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');
    }
    nextClick() {
        this.activeIndex = 3;
        this.vendorService.changeofTab(this.activeIndex);
        this.alertService.showMessage(
            'Success',
            `${this.isvendorEditMode ? 'Updated' : 'Saved'}  Capabilities Sucessfully `,
            MessageSeverity.success
        );
        // this.vendorService.indexObj.next(this.activeIndex);
        // this.vendorService.changeStep('Contacts');
        // this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-contacts');
    }
    getVendorName() {


        if (this.local !== undefined) {
            return editValueAssignByCondition('vendorName', this.local.vendorName) === undefined ? '' : editValueAssignByCondition('vendorName', this.local.vendorName);
        } else {
            return '';
        }
    }

}


// ${this.iseditMode ? 'Updated' : 'Saved'  }