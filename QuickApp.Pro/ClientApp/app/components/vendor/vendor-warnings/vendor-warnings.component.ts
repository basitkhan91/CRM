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
import { debounce } from 'rxjs/operators/debounce';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { VendorStepsPrimeNgComponent } from '../vendor-steps-prime-ng/vendor-steps-prime-ng.component';

@Component({
    selector: 'app-vendor-warnings',
    templateUrl: './vendor-warnings.component.html',
    styleUrls: ['./vendor-warnings.component.scss'],
    animations: [fadeInOut]
})
/** VendorWarnings component*/
export class VendorWarningsComponent implements OnInit {
    isOnlyReas: boolean = false;
    isReas: boolean = true;
    isReClose: boolean = true;
    isReadOpens: boolean = true;
    isOnlyClose: boolean = true;
    isopen: boolean = true;
    isOnlyReads: boolean = true;
    isReads: boolean = true;
    isOnlyRead: boolean = true;
    isRead: boolean = true;
    allwarningData: any;
    localcollection: any[];
    checkbox: boolean;
    dataSource: MatTableDataSource<{}>;
    local: any;
    isReadOnly: boolean = true;
    isOnly: boolean = true;
    viewName: string = "Create";
    sourceWarning: any = {};
    sourePo: any = {};
    soureRMA: any = {};
    sourceRo: any = {};
    sourceEdi: any = {};
    sourceAero: any = {};
    sourceNet: any = {};
    activeIndex: number;
    isSaving: boolean;
    isDeleteMode: boolean;
    sourcePOQuote: any = {};
    sourceROQuote: any = {};

    //isPOQuoteMsg: boolean = false;
    //isPOQuoteWar: boolean = true;
    isPOQuoteReadOnly: boolean = true;
    isPOQuoteOnlyReas: boolean = true;
    isROQuoteReadOnly: boolean = true;
    isROQuoteOnlyReas: boolean = true;

    constructor(private authService: AuthService, private router: Router, private vendorService: VendorService, private alertService: AlertService) {
        if (this.vendorService.listCollection !== undefined) {
            this.vendorService.isEditMode = true;
        }
        if (this.vendorService.shippingCollection) {
            this.local = this.vendorService.shippingCollection;
            this.vendorService.ShowPtab = true;
        }
        this.dataSource = new MatTableDataSource();
        if (this.vendorService.listCollection && this.vendorService.isEditMode == true) {
            this.viewName = "Edit";
            this.local = this.vendorService.listCollection;
        }
    }

    ngOnInit() {
        this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-warnings';
        this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);
        this.sourePo.allow = true;
        this.soureRMA.allow = true;
        this.sourceRo.allow = true;
        this.sourceEdi.allow = true;
        this.sourceAero.allow = true;
        this.sourceNet.allow = true;
        this.sourePo.isAllow = true;
        this.sourcePOQuote.allow = true;
        this.sourceROQuote.allow = true;

        // if (this.sourePo.allow = true  && this.sourceRo.allow == true && this.soureRMA.allow == true && this.sourceEdi.allow == true && this.sourceAero.allow == true && this.sourceNet.allow == true) {
        if (this.sourePo.allow = true && this.sourceRo.allow == true && this.sourcePOQuote.allow == true && this.sourceROQuote.allow == true) {
            this.isOnly = true;
            this.isOnlyRead = true;
            this.isOnlyReads = true;
            this.isOnlyClose = true;
            this.isReClose = true;
            this.isOnlyReas = true;
            this.isPOQuoteReadOnly = true;
            this.isROQuoteReadOnly = true;
            this.isPOQuoteOnlyReas = true;
            this.isROQuoteOnlyReas = true;
        }
        if (this.local) {
            this.loadData();
        }
    }
    isEnable(value) {
        if (value == "B") {
            this.isReadOnly = false;
        }
        else if (value == "A") {
            this.isReadOnly = true;
        }
    }

    isCheck(value) {
        if (value == "B") {
            this.isOnly = false;
            this.sourePo.restrictMessage = "";
            this.sourePo.warning = false;
            this.sourePo.allow = false;
            this.sourePo.isAllow = false;
            this.isReadOnly = true;
        }
        else if (value == "A") {
            this.isOnly = true;
            this.sourePo.allow = true;
            this.sourePo.isWarning = false;
            this.sourePo.isRestrict = false;
        }

    }

    isPOQuoteEnable(value) {
        if (value == "B") {
            this.isPOQuoteReadOnly = false;
        }
        else if (value == "A") {
            this.isPOQuoteReadOnly = true;
        }
    }

    isPOQuoteCheck(value) {
        if (value == "B") {
            this.isPOQuoteOnlyReas = false;
            this.sourcePOQuote.restrictMessage = "";
            this.sourcePOQuote.warning = false;
            this.sourcePOQuote.allow = false;
            this.sourcePOQuote.isAllow = false;
            this.isPOQuoteReadOnly = true;
        }
        else if (value == "A") {
            this.isPOQuoteOnlyReas = true;
            this.sourcePOQuote.allow = true;
            this.sourcePOQuote.isWarning = false;
            this.sourcePOQuote.isRestrict = false;
        }

    }

    isROQuoteEnable(value) {
        if (value == "B") {
            this.isROQuoteReadOnly = false;
        }
        else if (value == "A") {
            this.isROQuoteReadOnly = true;
        }
    }

    isROQuoteCheck(value) {
        if (value == "B") {
            this.isROQuoteOnlyReas = false;
            this.sourceROQuote.restrictMessage = "";
            this.sourceROQuote.warning = false;
            this.sourceROQuote.allow = false;
            this.sourceROQuote.isAllow = false;
            this.isROQuoteReadOnly = true;
        }
        else if (value == "A") {
            this.isROQuoteOnlyReas = true;
            this.sourceROQuote.allow = true;
            this.sourceROQuote.isWarning = false;
            this.sourceROQuote.isRestrict = false;
        }

    }



    isEnabled(value) {
        if (value == "B") {
            this.isRead = false;
        }
        else if (value == "A") {
            this.isRead = true;
        }
    }

    isCheckd(value) {
        if (value == "B") {
            this.isOnlyRead = false;
            this.soureRMA.allow = false;
            this.soureRMA.warning = false;
            this.sourePo.isAllow = false;
            this.isRead = true;
        }
        else if (value == "A") {
            this.isOnlyRead = true;
            this.soureRMA.allow = true;
            this.sourePo.isRestrict = false;
        }
    }

    isEnabd(value) {
        if (value == "B") {
            this.isReads = false;
        }
        else if (value == "A") {
            this.isReads = true;
        }
    }

    isChekd(value) {
        if (value == "B") {
            this.isOnlyReads = false;
            this.sourceRo.warning = false;
            this.sourceRo.allow = false;
            this.sourePo.isAllow = false;
            this.isReads = true;
        }
        else if (value == "A") {
            this.isOnlyReads = true;
            this.sourePo.isRestrict = false;
            this.sourceRo.allow = true;
        }

    }

    isEnabld(value) {
        if (value == "B") {
            this.isopen = false;
        }
        else if (value == "A") {
            this.isopen = true;
        }
    }

    isCheks(value) {
        if (value == "B") {
            this.isOnlyClose = false;
            this.sourceEdi.allow = false;
            this.sourceEdi.warning = false;
            this.sourePo.isAllow = false;
            this.isopen = true;
        }
        else if (value == "A") {
            this.isOnlyClose = true;
            this.sourceEdi.allow = true;
            this.sourePo.isRestrict = false;
        }


    }

    isEnad(value) {
        if (value == "B") {
            this.isReadOpens = false;
        }
        else if (value == "A") {
            this.isReadOpens = true;
        }

    }

    isCkd(value) {
        if (value == "B") {
            this.isReClose = false;
            this.sourceAero.warning = false;
            this.sourceAero.allow = false;
            this.sourePo.isAllow = false;
            this.isReadOpens = true;
        }
        else if (value == "A") {
            this.isReClose = true;
            this.sourePo.isRestrict = false;
            this.sourceAero.allow = true;
        }

    }

    isOpen(value) {
        if (value == "B") {
            this.isReas = false;
        }
        else if (value == "A") {
            this.isReas = true;
        }
    }

    isClose(value) {
        if (value == "B") {
            this.isOnlyReas = false;
            this.sourceNet.allow = false;
            this.sourceNet.warning = false;
            this.sourePo.isAllow = false;
            this.isReas = true;
        }
        else if (value == "A") {
            this.isOnlyReas = true;
            this.sourePo.isRestrict = false;
            this.sourceNet.allow = true;
        }

    }

    private loadData() {
        this.vendorService.getVendorWarnings(this.local.vendorId).subscribe(
            data => {
                this.localcollection = data[0];
                for (let i = 0; i < this.localcollection.length; i++) {

                    if (this.localcollection[i].t.sourceModule == 'PO') {
                        this.sourePo = this.localcollection[i].t;
                        if (this.sourePo.restrict == true) {
                            this.isOnly = false;
                            if (this.sourePo.restrict == false) {
                                this.sourePo.restrictMessage = false;
                            }
                        }
                        if (this.sourePo.warning == true) {
                            this.isReadOnly = false;
                        }
                    }
                    // if (this.localcollection[i].t.sourceModule == 'RMA') {
                    //     this.soureRMA = this.localcollection[i].t;
                    //     if (this.soureRMA.restrict == true) {
                    //         this.isOnlyRead = false;
                    //     }
                    //     if (this.soureRMA.warning == true) {
                    //         this.isRead = false;
                    //     }
                    // }
                    if (this.localcollection[i].t.sourceModule == 'RO') {
                        this.sourceRo = this.localcollection[i].t;
                        if (this.sourceRo.restrict == true) {
                            this.isOnlyReads = false;
                        }
                        if (this.sourceRo.warning == true) {
                            this.isReads = false;
                        }
                    }
                    // if (this.localcollection[i].t.sourceModule == 'EDI') {
                    //     this.sourceEdi = this.localcollection[i].t;
                    //     if (this.sourceEdi.restrict == true) {
                    //         this.isOnlyClose = false;
                    //     }
                    //     if (this.sourceEdi.warning == true) {
                    //         this.isopen = false;
                    //     }
                    // }
                    // if (this.localcollection[i].t.sourceModule == 'Aeroexchange') {
                    //     this.sourceAero = this.localcollection[i].t;
                    //     if (this.sourceAero.restrict == true) {
                    //         this.isReClose = false;
                    //     }
                    //     if (this.sourceAero.warning == true) {
                    //         this.isReadOpens = false;
                    //     }
                    // }
                    // if (this.localcollection[i].t.sourceModule == 'Net') {
                    //     this.sourceNet = this.localcollection[i].t;
                    //     if (this.sourceNet.restrict == true) {
                    //         this.isOnlyReas = false;
                    //     }
                    //     if (this.sourceNet.warning == true) {
                    //         this.isReas = false;
                    //     }
                    // }

                    if (this.localcollection[i].t.sourceModule == 'POQuote') {
                        this.sourcePOQuote = this.localcollection[i].t;
                        if (this.sourcePOQuote.restrict == true) {
                            this.isPOQuoteOnlyReas = false;
                        }
                        if (this.sourcePOQuote.warning == true) {
                            this.isPOQuoteReadOnly = false;
                        }
                    }

                    if (this.localcollection[i].t.sourceModule == 'ROQuote') {
                        this.sourceROQuote = this.localcollection[i].t;
                        if (this.sourceROQuote.restrict == true) {
                            this.isROQuoteOnlyReas = false;
                        }
                        if (this.sourceROQuote.warning == true) {
                            this.isROQuoteReadOnly = false;
                        }
                    }


                }

            })


    }
    private onDataLoadSuccessful(allWorkFlows: any) {

        this.dataSource.data = allWorkFlows;
        this.allwarningData = allWorkFlows;
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }
    saveDetails() {
        if (!this.sourePo.vendorWarningId) {
            this.sourePo.sourceModule = 'PO';
            this.sourePo.createdBy = this.userName;
            this.sourePo.updatedBy = this.userName;
            this.sourePo.masterCompanyId = 1;
            this.sourePo.vendorId = this.local.vendorId;
            this.vendorService.saveVendorwarnings(this.sourePo).subscribe(
                data => {
                    // this.saveRMA();
                    this.SaveRO();
                    this.nextClick();
                })
        }
        else {
            this.sourePo.updatedBy = this.userName;

            this.sourePo.masterCompanyId = 1;
            this.vendorService.updateVendorWarnings(this.sourePo).subscribe(
                data => {
                    //this.saveRMA();
                    this.SaveRO();
                    this.nextClick();
                })
        }
    }

    previousClick() {
        this.activeIndex = 8;
        this.vendorService.changeofTab(this.activeIndex);
        // this.vendorService.indexObj.next(this.activeIndex);
        // this.vendorService.changeStep('Billing Information');
        // this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-billing-information');
    }
    nextClick() {
        this.activeIndex = 9;
        this.vendorService.changeofTab(this.activeIndex);
        // this.vendorService.indexObj.next(this.activeIndex);
        // this.vendorService.changeStep('Memos');
        // this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-memo');
    }

    // saveRMA() {
    //     if (!this.soureRMA.vendorWarningId) {
    //         this.soureRMA.sourceModule = 'RMA';
    //         this.soureRMA.createdBy = this.userName;
    //         this.soureRMA.updatedBy = this.userName;
    //         this.soureRMA.masterCompanyId = 1;
    //         this.soureRMA.vendorId = this.local.vendorId;
    //         this.vendorService.saveVendorwarnings(this.soureRMA).subscribe(
    //             data => {
    //                 this.SaveRO();
    //             })
    //     }
    //     else {
    //         this.soureRMA.updatedBy = this.userName;
    //         this.sourePo.masterCompanyId = 1;
    //         this.vendorService.updateVendorWarnings(this.soureRMA).subscribe(
    //             data => { this.SaveRO(); console.log(data) })
    //     }
    // }
    SaveRO() {
        if (!this.sourceRo.vendorWarningId) {
            this.sourceRo.sourceModule = 'RO';
            this.sourceRo.createdBy = this.userName;
            this.sourceRo.updatedBy = this.userName;
            this.sourceRo.masterCompanyId = 1;
            this.sourceRo.vendorId = this.local.vendorId;
            this.vendorService.saveVendorwarnings(this.sourceRo).subscribe(
                data => {
                    this.SavePOQuote();
                    //this.SaveEDI();
                })
        }
        else {

            this.sourceRo.updatedBy = this.userName;

            this.sourePo.masterCompanyId = 1;
            this.vendorService.updateVendorWarnings(this.sourceRo).subscribe(
                data => {
                    //this.SaveEDI(); 
                    this.SavePOQuote();
                    console.log(data)
                })
        }
    }

    SaveEDI() {
        if (!this.sourceEdi.vendorWarningId) {
            this.sourceEdi.sourceModule = 'EDI';
            this.sourceEdi.createdBy = this.userName;
            this.sourceEdi.updatedBy = this.userName;
            this.sourceEdi.masterCompanyId = 1;
            this.sourceEdi.vendorId = this.local.vendorId;
            this.vendorService.saveVendorwarnings(this.sourceEdi).subscribe(
                data => {

                    this.SaveAero();
                })
        }
        else {
            this.sourceEdi.updatedBy = this.userName;
            this.sourceEdi.masterCompanyId = 1;
            this.sourePo.masterCompanyId = 1;
            this.vendorService.updateVendorWarnings(this.sourceEdi).subscribe(
                data => { this.SaveAero(); console.log(data) })
        }
    }

    SaveAero() {
        if (!this.sourceAero.vendorWarningId) {
            this.sourceAero.sourceModule = 'Aeroexchange';
            this.sourceAero.createdBy = this.userName;
            this.sourceAero.updatedBy = this.userName;
            this.sourceAero.vendorId = this.local.vendorId;
            this.sourceAero.masterCompanyId = 1;
            this.vendorService.saveVendorwarnings(this.sourceAero).subscribe(
                data => {

                    this.Savenet();
                })
        }
        else {

            this.sourceAero.updatedBy = this.userName;

            this.sourceAero.masterCompanyId = 1;
            this.vendorService.updateVendorWarnings(this.sourceAero).subscribe(
                data => { this.Savenet(); console.log(data) })
        }
    }
    Savenet() {
        if (!this.sourceNet.vendorWarningId) {
            this.sourceNet.sourceModule = 'Net';
            this.sourceNet.createdBy = this.userName;
            this.sourceNet.updatedBy = this.userName;
            this.sourceNet.masterCompanyId = 1;
            this.sourceNet.vendorId = this.local.vendorId;
            this.vendorService.saveVendorwarnings(this.sourceNet).subscribe(
                data => {
                    this.saveCompleted(this.sourceWarning);
                })
        }
        else {

            this.sourceNet.updatedBy = this.userName;

            this.sourceNet.masterCompanyId = 1;
            this.vendorService.updateVendorWarnings(this.sourceNet).subscribe(
                data => {
                    this.saveCompleted(this.sourceWarning);
                })
        }
    }

    SavePOQuote() {
        if (!this.sourcePOQuote.vendorWarningId) {
            this.sourcePOQuote.sourceModule = 'POQuote';
            this.sourcePOQuote.createdBy = this.userName;
            this.sourcePOQuote.updatedBy = this.userName;
            this.sourcePOQuote.masterCompanyId = 1;
            this.sourcePOQuote.vendorId = this.local.vendorId;
            this.vendorService.saveVendorwarnings(this.sourcePOQuote).subscribe(
                data => {

                    this.SaveROQuote();
                })
        }
        else {
            this.sourcePOQuote.updatedBy = this.userName;
            this.sourcePOQuote.masterCompanyId = 1;
            this.sourcePOQuote.masterCompanyId = 1;
            this.vendorService.updateVendorWarnings(this.sourcePOQuote).subscribe(
                data => { this.SaveROQuote(); console.log(data) })
        }
    }
    SaveROQuote() {
        if (!this.sourceROQuote.vendorWarningId) {
            this.sourceROQuote.sourceModule = 'ROQuote';
            this.sourceROQuote.createdBy = this.userName;
            this.sourceROQuote.updatedBy = this.userName;
            this.sourceROQuote.masterCompanyId = 1;
            this.sourceROQuote.vendorId = this.local.vendorId;
            this.vendorService.saveVendorwarnings(this.sourceROQuote).subscribe(
                data => {

                    this.saveCompleted();
                })
        }
        else {
            this.sourceROQuote.updatedBy = this.userName;
            this.sourceROQuote.masterCompanyId = 1;
            this.sourceROQuote.masterCompanyId = 1;
            this.vendorService.updateVendorWarnings(this.sourceROQuote).subscribe(
                data => { this.saveCompleted(); console.log(data) })
        }
    }

    private saveCompleted(user?: any) {
        this.isSaving = false;
        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);
            this.saveCompleted
        }
        this.loadData();
    }
    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }//this.modal.close();


    isAllowallEnable(value) {
        if (value == "A") {
            this.sourePo.allow = true;
            this.soureRMA.allow = true;
            this.sourceRo.allow = true;
            this.sourceEdi.allow = true;
            this.sourceAero.allow = true;
            this.sourceNet.allow = true;
            this.sourceROQuote.allow = true;
            this.sourcePOQuote.allow = true;

        }
        else if (value == "B") {
            this.sourePo.allow = false;
            this.soureRMA.allow = false;
            this.sourceRo.allow = false;
            this.sourceEdi.allow = false;
            this.sourceAero.allow = false;
            this.sourceNet.allow = false;
            this.sourceROQuote.allow = false;
            this.sourcePOQuote.allow = false;
        }
    }

    isAllwarning(value) {
        if (value == "C") {
            this.sourePo.warning = true;
            this.soureRMA.warning = true;
            this.sourceRo.warning = true;
            this.sourceEdi.warning = true;
            this.sourceAero.warning = true;
            this.sourceNet.warning = true;
            this.sourcePOQuote.warning = true;
            this.sourceROQuote.warning = true;
            this.isReadOnly = false;
            this.isRead = false;
            this.isReads = false;
            this.isopen = false;
            this.isReadOpens = false;
            this.isReas = false;
            this.isPOQuoteReadOnly = false;
            this.isROQuoteReadOnly = false;
        }
        else if (value == "D") {
            this.sourePo.warning = false;
            this.soureRMA.warning = false;
            this.sourceRo.warning = false;
            this.sourceEdi.warning = false;
            this.sourceAero.warning = false;
            this.sourceNet.warning = false;
            this.sourcePOQuote.warning = false;
            this.sourceROQuote.warning = false;
            this.isReadOnly = true;
            this.isRead = true;
            this.isReads = true;
            this.isopen = true;
            this.isReadOpens = true;
            this.isReas = true;
            this.isPOQuoteReadOnly = true;
            this.isROQuoteReadOnly = true;
        }

    }
    IsAllRestrict(value) {
        if (value == "E") {
            this.sourePo.isAllow = false;
            this.sourePo.isWarning = false;
            this.sourePo.warning = false;
            this.soureRMA.warning = false;
            this.sourceRo.warning = false;
            this.sourceEdi.warning = false;
            this.sourceAero.warning = false;
            this.sourceNet.warning = false;
            this.sourcePOQuote.warning = false;
            this.sourceROQuote.warning = false;
            this.sourePo.allow = false;
            this.soureRMA.allow = false;
            this.sourceRo.allow = false;
            this.sourceEdi.allow = false;
            this.sourceAero.allow = false;
            this.sourceNet.allow = false;
            this.sourcePOQuote.allow = false;
            this.sourceROQuote.allow = false;
            this.sourePo.restrict = true;
            this.soureRMA.restrict = true;
            this.sourceRo.restrict = true;
            this.sourceEdi.restrict = true;
            this.sourceAero.restrict = true;
            this.sourceNet.restrict = true;
            this.sourcePOQuote.restrict = true;
            this.sourceROQuote.restrict = true;

            this.isReadOnly = true;
            this.isRead = true;
            this.isReads = true;
            this.isopen = true;
            this.isReadOpens = true;
            this.isReas = true;
            this.isOnly = false;
            this.isOnlyRead = false;
            this.isOnlyReads = false;
            this.isOnlyClose = false;
            this.isReClose = false;
            this.isOnlyReas = false;
            this.isPOQuoteReadOnly = true;
            this.isROQuoteReadOnly = true;
            this.isPOQuoteOnlyReas = false;
            this.isROQuoteOnlyReas = false;
        }
        else if (value == "F") {
            this.sourePo.restrict = false;
            this.soureRMA.restrict = false;
            this.sourceRo.restrict = false;
            this.sourceEdi.restrict = false;
            this.sourceAero.restrict = false;
            this.sourceNet.restrict = false;
            this.sourcePOQuote.restrict = false;
            this.sourceROQuote.restrict = false;

            this.isReadOnly = true;
            this.isRead = true;
            this.isReads = true;
            this.isopen = true;
            this.isReadOpens = true;
            this.isReas = true;
            this.isOnly = true;
            this.isOnlyRead = true;
            this.isOnlyReads = true;
            this.isOnlyClose = true;
            this.isReClose = true;
            this.isOnlyReas = true;
            this.isPOQuoteReadOnly = true;
            this.isROQuoteReadOnly = true;
            this.isPOQuoteOnlyReas = true;
            this.isROQuoteOnlyReas = true;
            this.sourePo.allow = true;
            this.soureRMA.allow = true;
            this.sourceRo.allow = true;
            this.sourceEdi.allow = true;
            this.sourceAero.allow = true;
            this.sourceNet.allow = true;
            this.sourePo.isAllow = true;
            this.sourcePOQuote.allow = true;
            this.sourceROQuote.allow = true;

        }

    }
}