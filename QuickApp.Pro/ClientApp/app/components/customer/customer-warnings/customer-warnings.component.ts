import { Component } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { PageHeaderComponent } from '../../../shared/page-header.component';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Globals } from '../../../globals';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from '../../../services/auth.service';
import { AlertService, MessageSeverity } from '../../../services/alert.service';

@Component({
	selector: 'app-customer-warnings',
	templateUrl: './customer-warnings.component.html',
	styleUrls: ['./customer-warnings.component.scss'],
	animations: [fadeInOut]
})

/** CustomerWarnings component*/
export class CustomerWarningsComponent implements OnInit {
	isDeleteMode: boolean;
	isSaving: boolean;
	allwarningData: any;
	localcollection: any[];
	dataSource: MatTableDataSource<{}>;
	local: any;
	/** CustomerWarnings ctor */
	sourceWarning: any = {};
	//sourePerformReceiving: any = {};
	sourceQuoting: any = {};
	sourceWOCreation: any = {};
	sourceCreatingInvoicing: any = {};
	sourceCreditMemo: any = {};
	sourceShipping: any = {};
	soureRepairOrder: any = {};
	sourceSalesOrder: any = {};
	sourceNetAPAR: any = {};
	sourceEDI: any = {};
	sourceAeroxchange: any = {};
	sourcePMA: any = {};
	sourceDAR: any = {};
	sourceWarranty: any = {};
	sourePerformReceiving: any = {};
	sourePerformallReceiving: any = {};
	sourcewarningAll: any = {};
	sourcerestrictall: any = {};
	isOnly: boolean = true;
	isOnlyRead: boolean = true;
	isOnlyReads: boolean = true;
	isOnlyClose: boolean = true;
	isOnlyReas: boolean = true;
	isReClose: boolean = true
	isReas: boolean = true;
	isReadOpens: boolean = true;
	isopen: boolean = true;
	isReads: boolean = true;
	isRead: boolean = true;
	isReadOnly: boolean = true;
	isRepair: boolean = true;
	isRepair1: boolean = true;
	issales: boolean = true;
	sales: boolean = true;
	isNet: boolean = true;
	isnetAp: boolean = true;
	Edidisable: boolean = true;
	isaerodisble: boolean = true;
	isaeroEnable: boolean = true;
	IsEdienable: boolean = true;
	ispmaenable: boolean = true;
	ispmadisable: boolean = true;
	isDerEnable: boolean = true;
	isDerdisable: boolean = true;
	isWarrenable: boolean = true;
	isWarrdisable: boolean = true;
	activeIndex: number;
	constructor(private authService: AuthService, private route: Router, private CustomerService: CustomerService, private alertService: AlertService, public workFlowtService: CustomerService) {
		if (this.CustomerService.shippingCollection) {
			this.local = this.CustomerService.shippingCollection;
		}
		this.dataSource = new MatTableDataSource();
		if (this.CustomerService.listCollection && this.CustomerService.isEditMode == true) {
			//debugger;
			this.local = this.CustomerService.listCollection;

		}
	}
	ngOnInit() {
		this.workFlowtService.currentUrl = '/customersmodule/customerpages/app-customer-warnings';
		this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
		this.sourePerformReceiving.allow = true;
		this.sourceQuoting.allow = true;
		this.sourceWOCreation.allow = true;
		this.sourceCreatingInvoicing.allow = true;
		this.sourceCreditMemo.allow = true;
		this.sourceShipping.allow = true;
		this.soureRepairOrder.allow = true;
		this.sourceSalesOrder.allow = true;
		this.sourceNetAPAR.allow = true;
		this.sourceEDI.allow = true;
		this.sourceAeroxchange.allow = true;
        this.sourcePMA.allow = true;
        this.sourePerformReceiving.isAllow = true;
		this.sourceDAR.allow = true;
		this.sourceWarranty.allow = true;
		if (this.sourePerformReceiving.allow = true && this.sourceQuoting.allow == true && this.sourceWOCreation.allow == true && this.sourceCreatingInvoicing.allow == true && this.sourceCreditMemo.allow == true && this.sourceShipping.allow == true && this.soureRepairOrder.allow == true
			&& this.sourceNetAPAR.allow == true && this.sourceEDI.allow == true && this.sourceAeroxchange.allow == true && this.sourcePMA.allow == true && this.sourceDAR.allow == true && this.sourceWarranty.allow == true

		) {
			this.isOnly = true;
			this.isOnlyRead = true;
			this.isOnlyReads = true;
			this.isOnlyClose = true;
			this.isReClose = true;
			this.isOnlyReas = true;

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
			this.sourePerformReceiving.warning = false;
            this.sourePerformReceiving.allow = false;
            this.sourePerformReceiving.isAllow = false;
			this.isReadOnly = true;

		}

		else if (value == "A") {
			this.isOnly = true;
            this.sourePerformReceiving.allow = true;
            this.sourePerformReceiving.isRestrict = false;

            this.sourePerformReceiving.isRestrict = true;

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
			this.sourceQuoting.warning = false;
            this.sourceQuoting.allow = false;
            this.sourePerformReceiving.isAllow = false;
			this.isRead = true;
		}
		else if (value == "A") {
			this.isOnlyRead = true;
            this.sourceQuoting.allow = true;
            this.sourePerformReceiving.isRestrict = false;
            this.sourePerformReceiving.isRestrict = true;//added New
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
            this.sourceWOCreation.warning = false;
            this.sourePerformReceiving.isAllow = false;
            this.sourceWOCreation.allow = false;

			this.isReads = true;
		}
		else if (value == "A") {
            this.isOnlyReads = true;
            this.sourePerformReceiving.isRestrict = false;
            this.sourceWOCreation.allow = true;
            this.sourePerformReceiving.isRestrict = true;//added New

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
			this.sourceCreatingInvoicing.warning = false;
            this.sourceCreatingInvoicing.allow = false;
            this.sourePerformReceiving.isAllow = false;
			this.isopen = true;
		}
		else if (value == "A") {
			this.isOnlyClose = true;
            this.sourceCreatingInvoicing.allow = true;
            this.sourePerformReceiving.isRestrict = false;
            this.sourePerformReceiving.isRestrict = true;//added New

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
			this.sourceCreditMemo.warning = false;
            this.sourceCreditMemo.allow = false;
            this.sourePerformReceiving.isAllow = false;
			this.isReadOpens = true;
		}
		else if (value == "A") {
			this.isReClose = true;
            this.sourceCreditMemo.allow = true;
            this.sourePerformReceiving.isRestrict = false;
            this.sourePerformReceiving.isRestrict = true;//added New
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
	isRepairorder(value) {
		if (value == "B") {
			this.isRepair = false;
		}
		else if (value == "A") {
			this.isRepair = true;
		}

	}
	isRepairorder1(value) {
		if (value == "B") {
			this.isRepair1 = false;
			this.soureRepairOrder.warning = false;
            this.soureRepairOrder.allow = false;
            this.sourePerformReceiving.isAllow = false;
			this.isRepair = true;
		}
		else if (value == "A") {
			this.isRepair1 = true;
            this.soureRepairOrder.allow = true;
            this.sourePerformReceiving.isRestrict = false;
            this.sourePerformReceiving.isRestrict = true;//added New
		}
	}

	isSalesOrder(value) {
		if (value == "B") {
			this.issales = false;
		}
		else if (value == "A") {
			this.issales = true;
		}

	}
	salesOrder(value) {
		if (value == "B") {
			this.sales = false;
			this.sourceSalesOrder.warning = false;
            this.sourceSalesOrder.allow = false;
            this.sourePerformReceiving.isAllow = false;
			this.issales = true;
		}
		else if (value == "A") {
			this.sales = true;
            this.sourceSalesOrder.allow = true;
            this.sourePerformReceiving.isRestrict = false;
            this.sourePerformReceiving.isRestrict = true;//added New
		}


	}
	isNetAp(value) {
		if (value == "B") {
			this.isNet = false;
		}
		else if (value == "A") {
			this.isNet = true;
		}

	}
	netAp(value) {
		if (value == "B") {
			this.isnetAp = false;
			this.sourceNetAPAR.allow = false;
            this.sourceNetAPAR.warning = false;
            this.sourePerformReceiving.isAllow = false;
			this.isNet = true;
		}
		else if (value == "A") {
			this.isnetAp = true;
            this.sourceNetAPAR.allow = true;
            this.sourePerformReceiving.isRestrict = false;
            this.sourePerformReceiving.isRestrict = true;//added New
		}


	}
	isEdi(value) {


		if (value == "B") {
			this.Edidisable = false;
		}
		else if (value == "A") {
            this.Edidisable = true;
            this.sourePerformReceiving.isRestrict = true;//added New
		}

	}
	Edi(value) {
		if (value == "B") {
			this.IsEdienable = false;
			this.sourceEDI.allow = false ;
            this.sourceEDI.warning = false;

            this.sourePerformReceiving.isAllow = false;
			this.Edidisable = true;
		}
		else if (value == "A") {
			this.IsEdienable = true;
            this.sourceEDI.allow = true;

            this.sourePerformReceiving.isRestrict = false;

		}
		//if (this.sourceEDI.restrict == true) {
		//	this.sourceEDI.warning = false;
		//	this.sourceEDI.allow = false;

		//}

	}
	isAeroxchange(value) {


		if (value == "B") {
			this.isaeroEnable = false;
		}
		else if (value == "A") {
			this.isaeroEnable = true;
		}

	}
	Aeroxchange(value) {



		if (value == "B") {
			this.isaerodisble = false;
			this.sourceAeroxchange.allow = false;
            this.sourceAeroxchange.warning = false;
            this.sourePerformReceiving.isAllow = false;
			this.isaeroEnable = true;
		}
		else if (value == "A") {
			this.isaerodisble = true;
            this.sourceAeroxchange.allow = true;
            this.sourePerformReceiving.isRestrict = false;
            this.sourePerformReceiving.isRestrict = true;//added New
		}


	}

	isPma(value) {


		if (value == "B") {
			this.ispmaenable = false;
		}
		else if (value == "A") {
			this.ispmaenable = true;
		}

	}
	Pma(value) {
		if (value == "B") {
			this.ispmadisable = false;
            this.sourcePMA.allow = false;
            this.sourePerformReceiving.isAllow = false;
			this.sourcePMA.warning = false;
			this.ispmaenable = true;
		}
		else if (value == "A") {
			this.ispmadisable = true;
            this.sourcePMA.allow = true;
            this.sourePerformReceiving.isRestrict = false;
            this.sourePerformReceiving.isRestrict = true;//added New
		}


	}
	isDer(value) {


		if (value == "B") {
			this.isDerEnable = false;
		}
		else if (value == "A") {
			this.isDerEnable = true;
		}

	}
	der(value) {



		if (value == "B") {
			this.isDerdisable = false;
            this.sourceDAR.allow = false;
            this.sourePerformReceiving.isAllow = false;
			this.sourceDAR.warning = false;
			this.isDerEnable = true;
		}
		else if (value == "A") {
			this.isDerdisable = true;
            this.sourceDAR.allow = true;
            this.sourePerformReceiving.isRestrict = false;
            this.sourePerformReceiving.isRestrict = true;//added New
		}


	}
	isWarrenty(value) {


		if (value == "B") {
			this.isWarrenable = false;
		}
		else if (value == "A") {
			this.isWarrenable = true;
		}

	}
	warrenty(value) {



		if (value == "B") {
			this.isWarrdisable = false;
			this.sourceWarranty.allow = false;
            this.sourceWarranty.warning = false;
            this.sourePerformReceiving.isAllow = false;
			this.isWarrenable = true;

		}

		else if (value == "A") {
			this.isWarrdisable = true;
            this.sourceWarranty.allow = true;
            this.sourePerformReceiving.isRestrict = false;
            this.sourePerformReceiving.isRestrict = true;//added New
		}
	}


	isClose(value) {


		if (value == "B") {
			this.isOnlyReas = false;
			this.sourceShipping.warning = false;
            this.sourceShipping.allow = false;
            this.sourePerformReceiving.isAllow = false;
			this.isReas = true;
		}
		else if (value == "A") {
			this.isOnlyReas = true;
            this.sourceShipping.allow = true;
            this.sourePerformReceiving.isRestrict = false;
            this.sourePerformReceiving.isRestrict = true;//added New
		}

	}

    // Load Warnings data
	private loadData() {

		this.CustomerService.getCustomerWarnings(this.local.customerId).subscribe(
			data => {
				this.localcollection = data[0];
				for (let i = 0; i < this.localcollection.length; i++) {

					if (this.localcollection[i].t.sourceModule == 'PerformReceiving') {
						this.sourePerformReceiving = this.localcollection[i].t;
						if (this.sourePerformReceiving.warning == true) {
							this.isReadOnly = false;

						}
						if (this.sourePerformReceiving.restrict == true) {
							this.isOnly = false;
						}
					}
					if (this.localcollection[i].t.sourceModule == 'Quoting') {
						this.sourceQuoting = this.localcollection[i].t;
						if (this.sourceQuoting.warning == true) {
							this.isRead = false;
						}
						if (this.sourceQuoting.restrict == true) {
							this.isOnlyRead = false;
						}

					}
					if (this.localcollection[i].t.sourceModule == 'WOCreation') {
						this.sourceWOCreation = this.localcollection[i].t;
						if (this.sourceWOCreation.warning == true) {
							this.isReads = false;
						}
						if (this.sourceWOCreation.restrict == true) {
							this.isOnlyReads = false;
						}
					}
					if (this.localcollection[i].t.sourceModule == 'CreatingInvoicing') {
						this.sourceCreatingInvoicing = this.localcollection[i].t;
						if (this.sourceCreatingInvoicing.warning == true) {
							this.isopen = false;
						}
						if (this.sourceCreatingInvoicing.restrict == true) {
							this.isOnlyClose = false;
						}
					}
					if (this.localcollection[i].t.sourceModule == 'CreditMemo') {
						this.sourceCreditMemo = this.localcollection[i].t;
						if (this.sourceCreditMemo.warning == true) {
							this.isReadOpens = false;
						}
						if (this.sourceCreditMemo.restrict == true) {
							this.isReClose = false;
						}
					}
					if (this.localcollection[i].t.sourceModule == 'Shipping') {
						this.sourceShipping = this.localcollection[i].t;
						if (this.sourceShipping.warning == true) {
							this.isReas = false;
						}
						if (this.sourceShipping.restrict == true) {
							this.isOnlyReas = false;
						}
					}
					if (this.localcollection[i].t.sourceModule == 'RepairOrder') {
						this.soureRepairOrder = this.localcollection[i].t;
						if (this.soureRepairOrder.warning == true) {
							this.isRepair = false;
						}
						if (this.soureRepairOrder.restrict == true) {
							this.isRepair1 = false;
						}
					}
					if (this.localcollection[i].t.sourceModule == 'SalesOrder') {
						this.sourceSalesOrder = this.localcollection[i].t;
						if (this.sourceSalesOrder.warning == true) {
							this.issales = false;
						}
						if (this.sourceSalesOrder.restrict == true) {
							this.sales = false;
						}
					}
					if (this.localcollection[i].t.sourceModule == 'NetAPAR') {
						this.sourceNetAPAR = this.localcollection[i].t;
						if (this.sourceNetAPAR.warning == true) {
							this.isNet = false;
						}
						if (this.sourceNetAPAR.restrict == true) {
							this.isnetAp = false;
						}
					}
					if (this.localcollection[i].t.sourceModule == 'EDI') {
						this.sourceEDI = this.localcollection[i].t;
						if (this.sourceEDI.warning == true) {
							this.Edidisable = false;
						}
						if (this.sourceEDI.restrict == true) {
							this.IsEdienable = false;
						}
					}
					if (this.localcollection[i].t.sourceModule == 'Aeroxchange') {
						this.sourceAeroxchange = this.localcollection[i].t;
						if (this.sourceAeroxchange.warning == true) {
							this.isaeroEnable = false;
						}
						if (this.sourceAeroxchange.restrict == true) {
							this.isaerodisble = false;
						}
					}
					if (this.localcollection[i].t.sourceModule == 'PMA') {
						this.sourcePMA = this.localcollection[i].t;
						if (this.sourcePMA.warning == true) {
							this.ispmaenable = false;
						}
						if (this.sourcePMA.restrict == true) {
							this.ispmadisable = false;
						}
					}
					if (this.localcollection[i].t.sourceModule == 'DER') {
						this.sourceDAR = this.localcollection[i].t;
						if (this.sourceDAR.warning == true) {
							this.isDerEnable = false;
						}
						if (this.sourceDAR.restrict == true) {
							this.isDerdisable = false;
						}
					}
					if (this.localcollection[i].t.sourceModule == 'Warranty') {
						this.sourceWarranty = this.localcollection[i].t;
						if (this.sourceWarranty.warning == true) {
							this.isWarrenable = false;
						}
						if (this.sourceWarranty.restrict == true) {
							this.isWarrdisable = false;
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
		if (!this.sourePerformReceiving.customerWarningId) {
			this.sourePerformReceiving.sourceModule = 'PerformReceiving';
			this.sourePerformReceiving.createdBy = this.userName;
			this.sourePerformReceiving.updatedBy = this.userName;
            this.sourePerformReceiving.masterCompanyId = 1;
            if (this.sourePerformReceiving.isAllow == true) {
                this.sourePerformReceiving.isAllow = 1;
            }
            else {
                this.sourePerformReceiving.isAllow = null;
            }
			this.sourePerformReceiving.customerId = this.local.customerId;
			this.CustomerService.saveCustomerwarnings(this.sourePerformReceiving).subscribe(
				data => {

					this.saveQuoting();
				})
		}
		else {

			this.sourePerformReceiving.updatedBy = this.userName;
            if (this.sourePerformReceiving.isAllow == true) {
                this.sourePerformReceiving.isAllow = 1;
            }
            else {
                this.sourePerformReceiving.isAllow = null;
            }
			this.sourePerformReceiving.masterCompanyId = 1;
			this.CustomerService.updateCustomerWarnings(this.sourePerformReceiving).subscribe(
				data => { this.saveQuoting(); console.log(data) })
		}
	}
	saveQuoting() {
		if (!this.sourceQuoting.customerWarningId) {
			this.sourceQuoting.sourceModule = 'Quoting';
			this.sourceQuoting.createdBy = this.userName;
			this.sourceQuoting.updatedBy = this.userName;
			this.sourceQuoting.masterCompanyId = 1;
			this.sourceQuoting.customerId = this.local.customerId;
			this.CustomerService.saveCustomerwarnings(this.sourceQuoting).subscribe(
				data => {

					this.SaveWOCreation();
				})
		}
		else {

			this.sourceQuoting.updatedBy = this.userName;

			this.sourePerformReceiving.masterCompanyId = 1;
			this.CustomerService.updateCustomerWarnings(this.sourceQuoting).subscribe(
				data => { this.SaveWOCreation(); console.log(data) })
		}
	}
	SaveWOCreation() {
		if (!this.sourceWOCreation.customerWarningId) {
			this.sourceWOCreation.sourceModule = 'WOCreation';
			this.sourceWOCreation.createdBy = this.userName;
			this.sourceWOCreation.updatedBy = this.userName;
			this.sourceWOCreation.masterCompanyId = 1;
			this.sourceWOCreation.customerId = this.local.customerId;
			this.CustomerService.saveCustomerwarnings(this.sourceWOCreation).subscribe(
				data => {

					this.SaveCreatingInvoicing();
				})
		}
		else {

			this.sourceWOCreation.updatedBy = this.userName;

			this.sourePerformReceiving.masterCompanyId = 1;
			this.CustomerService.updateCustomerWarnings(this.sourceWOCreation).subscribe(
				data => { this.SaveCreatingInvoicing(); console.log(data) })
		}
	}

	SaveCreatingInvoicing() {
		if (!this.sourceCreatingInvoicing.customerWarningId) {
			this.sourceCreatingInvoicing.sourceModule = 'CreatingInvoicing';
			this.sourceCreatingInvoicing.createdBy = this.userName;
			this.sourceCreatingInvoicing.updatedBy = this.userName;
			this.sourceCreatingInvoicing.masterCompanyId = 1;
			this.sourceCreatingInvoicing.customerId = this.local.customerId;
			this.CustomerService.saveCustomerwarnings(this.sourceCreatingInvoicing).subscribe(
				data => {

					this.SaveCreditMemo();
				})
		}
		else {

			this.sourceCreatingInvoicing.updatedBy = this.userName;

			this.sourceCreatingInvoicing.masterCompanyId = 1;
			this.sourePerformReceiving.masterCompanyId = 1;
			this.CustomerService.updateCustomerWarnings(this.sourceCreatingInvoicing).subscribe(
				data => { this.SaveCreditMemo(); console.log(data) })
		}
	}

	SaveCreditMemo() {
		if (!this.sourceCreditMemo.customerWarningId) {
			this.sourceCreditMemo.sourceModule = 'CreditMemo';
			this.sourceCreditMemo.createdBy = this.userName;
			this.sourceCreditMemo.updatedBy = this.userName;
			this.sourceCreditMemo.customerId = this.local.customerId;
			this.sourceCreditMemo.masterCompanyId = 1;
			this.CustomerService.saveCustomerwarnings(this.sourceCreditMemo).subscribe(
				data => {

					this.SaveShipping();
				})
		}
		else {

			this.sourceCreditMemo.updatedBy = this.userName;

			this.sourceCreditMemo.masterCompanyId = 1;
			this.CustomerService.updateCustomerWarnings(this.sourceCreditMemo).subscribe(
				data => { this.SaveShipping(); console.log(data) })
		}
	}
	SaveShipping() {
		if (!this.sourceShipping.customerWarningId) {
			this.sourceShipping.sourceModule = 'Shipping';
			this.sourceShipping.createdBy = this.userName;
			this.sourceShipping.updatedBy = this.userName;
			this.sourceShipping.masterCompanyId = 1;
			this.sourceShipping.customerId = this.local.customerId;
			this.CustomerService.saveCustomerwarnings(this.sourceShipping).subscribe(
				data => {
					this.SaveRepairOrder();
				})
		}
		else {

			this.sourceShipping.updatedBy = this.userName;

			this.sourceShipping.masterCompanyId = 1;
			this.CustomerService.updateCustomerWarnings(this.sourceShipping).subscribe(
				data => { this.SaveRepairOrder(); console.log(data) })
		}


	}
	SaveRepairOrder() {
		if (!this.soureRepairOrder.customerWarningId) {
			this.soureRepairOrder.sourceModule = 'RepairOrder';
			this.soureRepairOrder.createdBy = this.userName;
			this.soureRepairOrder.updatedBy = this.userName;
			this.soureRepairOrder.customerId = this.local.customerId;
			this.soureRepairOrder.masterCompanyId = 1;
			this.CustomerService.saveCustomerwarnings(this.soureRepairOrder).subscribe(
				data => {

					this.SaveSalesOrder();
				})
		}
		else {

			this.soureRepairOrder.updatedBy = this.userName;

			this.soureRepairOrder.masterCompanyId = 1;
			this.CustomerService.updateCustomerWarnings(this.soureRepairOrder).subscribe(
				data => { this.SaveSalesOrder(); console.log(data) })
		}
	}
	SaveSalesOrder() {
		if (!this.sourceSalesOrder.customerWarningId) {
			this.sourceSalesOrder.sourceModule = 'SalesOrder';
			this.sourceSalesOrder.createdBy = this.userName;
			this.sourceSalesOrder.updatedBy = this.userName;
			this.sourceSalesOrder.customerId = this.local.customerId;
			this.sourceSalesOrder.masterCompanyId = 1;
			this.CustomerService.saveCustomerwarnings(this.sourceSalesOrder).subscribe(
				data => {

					this.SaveNetAPAR();
				})
		}
		else {

			this.sourceSalesOrder.updatedBy = this.userName;

			this.sourceSalesOrder.masterCompanyId = 1;
			this.CustomerService.updateCustomerWarnings(this.sourceSalesOrder).subscribe(
				data => { this.SaveNetAPAR(); console.log(data) })
		}
	}
	SaveNetAPAR() {
		if (!this.sourceNetAPAR.customerWarningId) {
			this.sourceNetAPAR.sourceModule = 'NetAPAR';
			this.sourceNetAPAR.createdBy = this.userName;
			this.sourceNetAPAR.updatedBy = this.userName;
			this.sourceNetAPAR.customerId = this.local.customerId;
			this.sourceNetAPAR.masterCompanyId = 1;
			this.CustomerService.saveCustomerwarnings(this.sourceNetAPAR).subscribe(
				data => {

					this.SaveEDI();
				})
		}
		else {

			this.sourceNetAPAR.updatedBy = this.userName;

			this.sourceNetAPAR.masterCompanyId = 1;
			this.CustomerService.updateCustomerWarnings(this.sourceNetAPAR).subscribe(
				data => { this.SaveEDI(); console.log(data) })
		}
	}
	//this.modal.close();


	SaveEDI() {
		if (!this.sourceEDI.customerWarningId) {
			this.sourceEDI.sourceModule = 'EDI';
			this.sourceEDI.createdBy = this.userName;
			this.sourceEDI.updatedBy = this.userName;
			this.sourceEDI.customerId = this.local.customerId;
			this.sourceEDI.masterCompanyId = 1;
			this.CustomerService.saveCustomerwarnings(this.sourceEDI).subscribe(
				data => {

					this.SaveAeroxchange();
				})
		}
		else {

			this.sourceEDI.updatedBy = this.userName;

			this.sourceEDI.masterCompanyId = 1;
			this.CustomerService.updateCustomerWarnings(this.sourceEDI).subscribe(
				data => { this.SaveAeroxchange(); console.log(data) })
		}
	}
	//this.modal.close();
	SaveAeroxchange() {
		if (!this.sourceAeroxchange.customerWarningId) {
			this.sourceAeroxchange.sourceModule = 'Aeroxchange';
			this.sourceAeroxchange.createdBy = this.userName;
			this.sourceAeroxchange.updatedBy = this.userName;
			this.sourceAeroxchange.customerId = this.local.customerId;
			this.sourceAeroxchange.masterCompanyId = 1;
			this.CustomerService.saveCustomerwarnings(this.sourceAeroxchange).subscribe(
				data => {

					this.SavePMA();
				})
		}
		else {

			this.sourceAeroxchange.updatedBy = this.userName;

			this.sourceAeroxchange.masterCompanyId = 1;
			this.CustomerService.updateCustomerWarnings(this.sourceAeroxchange).subscribe(
				data => { this.SavePMA(); console.log(data) })
		}
	}
	SavePMA() {
		if (!this.sourcePMA.customerWarningId) {
			this.sourcePMA.sourceModule = 'PMA';
			this.sourcePMA.createdBy = this.userName;
			this.sourcePMA.updatedBy = this.userName;
			this.sourcePMA.customerId = this.local.customerId;
			this.sourcePMA.masterCompanyId = 1;
			this.CustomerService.saveCustomerwarnings(this.sourcePMA).subscribe(
				data => {

					this.SaveDER();
				})
		}
		else {

			this.sourcePMA.updatedBy = this.userName;

			this.sourcePMA.masterCompanyId = 1;
			this.CustomerService.updateCustomerWarnings(this.sourcePMA).subscribe(
				data => { this.SaveDER(); console.log(data) })
		}
	}
	SaveDER() {
		if (!this.sourceDAR.customerWarningId) {
			this.sourceDAR.sourceModule = 'DER';
			this.sourceDAR.createdBy = this.userName;
			this.sourceDAR.updatedBy = this.userName;
			this.sourceDAR.customerId = this.local.customerId;
			this.sourceDAR.masterCompanyId = 1;
			this.CustomerService.saveCustomerwarnings(this.sourceDAR).subscribe(
				data => {

					this.SaveWarranty();
				})
		}
		else {

			this.sourceDAR.updatedBy = this.userName;

			this.sourceDAR.masterCompanyId = 1;
			this.CustomerService.updateCustomerWarnings(this.sourceDAR).subscribe(
				data => { this.SaveWarranty(); console.log(data) })
		}
	}
	SaveWarranty() {
		if (!this.sourceWarranty.customerWarningId) {
			this.sourceWarranty.sourceModule = 'Warranty';
			this.sourceWarranty.createdBy = this.userName;
			this.sourceWarranty.updatedBy = this.userName;
			this.sourceWarranty.customerId = this.local.customerId;
			this.sourceWarranty.masterCompanyId = 1;
			this.CustomerService.saveCustomerwarnings(this.sourceWarranty).subscribe(data => {
				this.savesuccessCompleted(this.sourceWarranty);
			})


		}
		else {

			this.sourceWarranty.updatedBy = this.userName;

			this.sourceWarranty.masterCompanyId = 1;
			this.CustomerService.updateCustomerWarnings(this.sourceWarranty).subscribe(data => {
				this.saveCompleted(this.sourceWarranty);
			})
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

		}

		this.loadData();
	}

	private savesuccessCompleted(user?: any) {
		this.isSaving = false;


		this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);



		this.loadData();
	}
	private saveFailedHelper(error: any) {
		this.isSaving = false;
		this.alertService.stopLoadingMessage();
		this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
		this.alertService.showStickyMessage(error, null, MessageSeverity.error);
	}
	backClick() {
		this.workFlowtService.contactCollection = this.local;
		this.activeIndex = 5;
		this.workFlowtService.indexObj.next(this.activeIndex);
		//this.saveCompleted(this.sourceCustomer);
		this.route.navigateByUrl('/customersmodule/customerpages/app-customer-sales-person');

	}

	isAllEnable() {


        if (this.sourePerformReceiving.isAllow == true) {
			this.sourePerformReceiving.allow = true;
			this.sourceQuoting.allow = true;
			this.sourceWOCreation.allow = true;
			this.sourceCreatingInvoicing.allow = true;
			this.sourceCreditMemo.allow = true;
			this.sourceShipping.allow = true;
			this.soureRepairOrder.allow = true;
			this.sourceSalesOrder.allow = true;
			this.sourceNetAPAR.allow = true;
			this.sourceEDI.allow = true;
			this.sourceAeroxchange.allow = true;
			this.sourcePMA.allow = true;
			this.sourceDAR.allow = true;
			this.sourceWarranty.allow = true;

		}
		else {
			this.sourePerformReceiving.allow = false;
			this.sourceQuoting.allow = false;
			this.sourceWOCreation.allow = false;
			this.sourceCreatingInvoicing.allow = false;
			this.sourceCreditMemo.allow = false;
			this.sourceShipping.allow = false;
			this.soureRepairOrder.allow = false;
			this.sourceSalesOrder.allow = false;
			this.sourceNetAPAR.allow = false;
			this.sourceEDI.allow = false;
			this.sourceAeroxchange.allow = false;
			this.sourcePMA.allow = false;
			this.sourceDAR.allow = false;
			this.sourceWarranty.allow = false;

		}

	}
	isAllwarningEnable(value) {


        if (this.sourePerformReceiving.isWarning == true)
        {

			this.sourePerformReceiving.warning = true;
			this.sourceQuoting.warning = true;
			this.sourceWOCreation.warning = true;
			this.sourceCreatingInvoicing.warning = true;
			this.sourceCreditMemo.warning = true;
			this.sourceShipping.warning = true;
			this.soureRepairOrder.warning = true;
			this.sourceSalesOrder.warning = true;
			this.sourceNetAPAR.warning = true;
			this.sourceEDI.warning = true;
			this.sourceAeroxchange.warning = true;
			this.sourcePMA.warning = true;
			this.sourceDAR.warning = true;
			this.sourceWarranty.warning = true;
			this.isReadOnly = false;
			this.isRead = false;
			this.isReads = false;
			this.isopen = false;
			this.isReadOpens = false;
			this.isReas = false;
			this.isRepair = false;
			this.issales = false;
			this.isNet = false;
			this.Edidisable = false;
			this.isaeroEnable = false;
			this.ispmaenable = false;
			this.isDerEnable = false;
            this.isWarrenable = false;

            //if (this.sourePerformReceiving.isAllow == true)
            //{
            //    this.sourePerformReceiving.isAllow = false;

            //    this.sourePerformReceiving.allow = false;
            //    this.sourceQuoting.allow = false;
            //    this.sourceWOCreation.allow = false;
            //    this.sourceCreatingInvoicing.allow = false;
            //    this.sourceCreditMemo.allow = false;
            //    this.sourceShipping.allow = false;
            //    this.soureRepairOrder.allow = false;
            //    this.sourceSalesOrder.allow = false;
            //    this.sourceNetAPAR.allow = false;
            //    this.sourceEDI.allow = false;
            //    this.sourceAeroxchange.allow = false;
            //    this.sourcePMA.allow = false;
            //    this.sourceDAR.allow = false;
            //    this.sourceWarranty.allow = false;
            //}

            if (this.sourePerformReceiving.isRestrict == true)
            {
                this.sourcerestrictall.restrict = false;
                this.sourePerformReceiving.restrict = false;
                this.sourceQuoting.restrict = false;
                this.sourceWOCreation.restrict = false;
                this.sourceCreatingInvoicing.restrict = false;
                this.sourceCreditMemo.restrict = false;
                this.sourceShipping.restrict = false;
                this.soureRepairOrder.restrict = false;
                this.sourceSalesOrder.restrict = false;
                this.sourceNetAPAR.restrict = false;
                this.sourceEDI.restrict = false;
                this.sourceAeroxchange.restrict = false;
                this.sourcePMA.restrict = false;
                this.sourceDAR.restrict = false;
                this.sourceWarranty.restrict = false;
            }
		}
		else{
			this.sourePerformReceiving.warning = false;
			this.sourceQuoting.warning = false;
			this.sourceWOCreation.warning = false;
			this.sourceCreatingInvoicing.warning = false;
			this.sourceCreditMemo.warning = false;
			this.sourceShipping.warning = false;
			this.soureRepairOrder.warning = false;
			this.sourceSalesOrder.warning = false;
			this.sourceNetAPAR.warning = false;
			this.sourceEDI.warning = false;
			this.sourceAeroxchange.warning = false;
			this.sourcePMA.warning = false;
			this.sourceDAR.warning = false;
			this.sourceWarranty.warning = false;
			this.isReadOnly = true;
			this.isRead = true;
			this.isReads = true;
			this.isopen = true;
			this.isReadOpens = true;
			this.isReas = true;
			this.isRepair = true;
			this.issales = true;
			this.isNet = true;
			this.Edidisable = true;
			this.isaeroEnable = true;
			this.ispmaenable = true;
			this.isDerEnable = true;
			this.isWarrenable = true;
		}

	}
	isAllrestrictEnable(value) {
        if (this.sourePerformReceiving.isRestrict == true)  {

                this.sourePerformReceiving.isWarning = false;
				this.sourePerformallReceiving.allow = false;
				this.sourePerformReceiving.allow = false;
				this.sourceQuoting.allow = false;
				this.sourceWOCreation.allow = false;
				this.sourceCreatingInvoicing.allow = false;
				this.sourceCreditMemo.allow = false;
				this.sourceShipping.allow = false;
				this.soureRepairOrder.allow = false;
				this.sourceSalesOrder.allow = false;
				this.sourceNetAPAR.allow = false;
				this.sourceEDI.allow = false;
				this.sourceAeroxchange.allow = false;
				this.sourcePMA.allow = false;
				this.sourceDAR.allow = false;
				this.sourceWarranty.allow = false;
				this.sourePerformReceiving.warning = false;
				this.sourceQuoting.warning = false;
				this.sourceWOCreation.warning = false;
				this.sourceCreatingInvoicing.warning = false;
				this.sourceCreditMemo.warning = false;
				this.sourceShipping.warning = false;
				this.soureRepairOrder.warning = false;
				this.sourceSalesOrder.warning = false;
				this.sourceNetAPAR.warning = false;
				this.sourceEDI.warning = false;
				this.sourceAeroxchange.warning = false;
				this.sourcePMA.warning = false;
				this.sourceDAR.warning = false;
				this.sourceWarranty.warning = false;
				this.sourePerformReceiving.restrict = true;
				this.sourcerestrictall.restrict = true;
				this.sourceQuoting.restrict = true;
				this.sourceWOCreation.restrict = true;
				this.sourceCreatingInvoicing.restrict = true;
				this.sourceCreditMemo.restrict = true;
				this.sourceShipping.restrict = true;
				this.soureRepairOrder.restrict = true;
				this.sourceSalesOrder.restrict = true;
				this.sourceNetAPAR.restrict = true;
				this.sourceEDI.restrict = true;
				this.sourceAeroxchange.restrict = true;
				this.sourcePMA.restrict = true;
				this.sourceDAR.restrict = true;
            this.sourceWarranty.restrict = true;
            this.sourePerformReceiving.isAllow = false;
				this.isOnly = false;
				this.isOnlyRead = false;
				this.isOnlyReads = false;
				this.isOnlyClose = false;
				this.isReClose = false;
				this.isOnlyReas = false;
				this.isRepair1 = false;
				this.sales = false;
				this.isnetAp = false;
				this.IsEdienable = false;
				this.isaerodisble = false;
				this.ispmadisable = false;
				this.isDerdisable = false;
				this.isWarrdisable = false;
				this.isReadOnly = true;
				this.isRead = true;
				this.isReads = true;
				this.isopen = true;
				this.isReadOpens = true;
				this.isReas = true;
				this.isRepair = true;
				this.issales = true;
				this.isNet = true;
				this.Edidisable = true;
				this.isaeroEnable = true;
				this.ispmaenable = true;
				this.isDerEnable = true;
				this.isWarrenable = true;

			}
			else  {
				this.sourcerestrictall.restrict = false;
				this.sourePerformReceiving.restrict = false;
				this.sourceQuoting.restrict = false;
				this.sourceWOCreation.restrict = false;
				this.sourceCreatingInvoicing.restrict = false;
				this.sourceCreditMemo.restrict = false;
				this.sourceShipping.restrict = false;
				this.soureRepairOrder.restrict = false;
				this.sourceSalesOrder.restrict = false;
				this.sourceNetAPAR.restrict = false;
				this.sourceEDI.restrict = false;
				this.sourceAeroxchange.restrict = false;
				this.sourcePMA.restrict = false;
				this.sourceDAR.restrict = false;
                this.sourceWarranty.restrict = false;
                this.sourePerformReceiving.isAllow = true;
				this.isOnly = true;
				this.isOnlyRead = true;
				this.isOnlyReads = true;
				this.isOnlyClose = true;
				this.isReClose = true;
				this.isOnlyReas = true;
				this.isRepair1 = true;
				this.sales = true;
				this.isnetAp = true;
				this.IsEdienable = true;
				this.isaerodisble = true;
				this.ispmadisable = true;
				this.isDerdisable = true;
				this.isWarrdisable = true;
				this.sourePerformReceiving.allow = true;
				this.sourceQuoting.allow = true;
				this.sourceWOCreation.allow = true;
				this.sourceCreatingInvoicing.allow = true;
				this.sourceCreditMemo.allow = true;
				this.sourceShipping.allow = true;
				this.soureRepairOrder.allow = true;
				this.sourceSalesOrder.allow = true;
				this.sourceNetAPAR.allow = true;
				this.sourceEDI.allow = true;
				this.sourceAeroxchange.allow = true;
				this.sourcePMA.allow = true;
				this.sourceDAR.allow = true;
				this.sourceWarranty.allow = true;
				this.sourePerformallReceiving.allow = true;
			}

		}

	}
