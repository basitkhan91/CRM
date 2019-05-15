import { Component } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { Message } from 'primeng/components/common/message';

import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { VendorService } from '../services/vendor.service';

import { BreadcrumbModule } from 'primeng/breadcrumb'; //Bread Crumb
import { AppComponent } from '../app.component';
import { AppTranslationService } from '../services/app-translation.service';

@Component({
	selector: 'quickapp-pro-vendor',
    templateUrl: './vendorpages.component.html'
})
/** Vendorpages component*/
export class VendorpagesComponent {
	//matSpinner: boolean=true;
	otherurl: any;
	currentUrl: string;

	public items: MenuItem[];
	home: MenuItem;

	
	
	constructor(private router: ActivatedRoute, private route: Router, private vendorService: VendorService,
		private appComponent: AppComponent, private appTranslationService: AppTranslationService)
	{
		
		this.vendorService.bredcrumbObjChangeObject$.subscribe(value => {
			//debugger
			this.otherurl = value;
			this.loadmethod(this.otherurl);

		});
		
	}
	

	//Bread Crumb Start
	ngOnInit() {
		
		//this.appTranslationService.matSpinObj.next(this.appTranslationService.matSpinner = true
		//);
		
		this.currentUrl = this.route.url;
		//debugger
		this.loadmethod(this.currentUrl)

	}
	ngOnDestroy()
	{
		
		//this.appTranslationService.matSpinObj.next(this.appTranslationService.matSpinner=false);
		
	}
	loadmethod(url) {
		
		this.currentUrl = url;
		if (this.currentUrl) {
			if (this.currentUrl == '/vendorsmodule/vendorpages/app-vendors-list') {
				this.items = [
					{ label: 'Vendor', url: '/vendorsmodule/vendorpages/app-vendors-list' },
					{ label: 'Vendors List' }
				];
			}

			else if (this.currentUrl == '/vendorsmodule/vendorpages/app-vendor-general-information') {
				this.items = [
					{ label: 'Vendor', url: '/vendorsmodule/vendorpages/app-vendors-list' },
					{ label: 'Vendor'+"'"+' General Information' }
				];
			}

			else if (this.currentUrl == '/vendorsmodule/vendorpages/app-vendor-contacts') {
				this.items = [
					{ label: 'Vendor', url: '/vendorsmodule/vendorpages/app-vendors-list'},
					{ label: 'Contacts' }
				];
			}

			else if (this.currentUrl == '/vendorsmodule/vendorpages/app-vendor-financial-information') {
				this.items = [
					{ label: 'Vendor', url: '/vendorsmodule/vendorpages/app-vendors-list' },
					{ label: 'Financial Information' }
				];
			}

			else if (this.currentUrl == '/vendorsmodule/vendorpages/app-vendor-payment-information') {
				this.items = [
					{ label: 'Vendor', url: '/vendorsmodule/vendorpages/app-vendors-list' },
					{ label: 'Payment Information' }
				];
			}

			else if (this.currentUrl == '/vendorsmodule/vendorpages/app-vendor-shipping-information') {
				this.items = [
					{ label: 'Vendor', url: '/vendorsmodule/vendorpages/app-vendors-list' },
					{ label: 'Shipping Information' }
				];
			}

			else if (this.currentUrl == '/vendorsmodule/vendorpages/app-vendor-warnings')
			{
				this.items = [
					{ label: 'Vendor', url: '/vendorsmodule/vendorpages/app-vendors-list' },
					{ label: 'Warnings' }
				];
			}

			else if (this.currentUrl == '/vendorsmodule/vendorpages/app-vendor-memo') {
				this.items = [
					{ label: 'Vendor' },
					{ label: 'Memo' }
				];
			}

			else if (this.currentUrl == '/vendorsmodule/vendorpages/app-vendor-emails') {
				this.items = [
					{ label: 'Vendor' },
					{ label: 'Vendor Emails' }
				];
			}

			else if (this.currentUrl == '/vendorsmodule/vendorpages/app-vendor-conversations') {
				this.items = [
					{ label: 'Vendor' },
					{ label: 'Conversations' }
				];
			}

			else if (this.currentUrl == 'vendorsmodule/vendorpages/app-create-po') {
				this.items = [
					{ label: 'Vendor' },
					{ label: 'Create PO' }
				];
			}
			else if (this.currentUrl == 'vendorsmodule/vendorpages/app-polist') {
				this.items = [
					{ label: 'Vendor' },
					{ label: 'PO List' }
				];
			}
			else if (this.currentUrl == 'vendorsmodule/vendorpages/app-purchase-setup') {
				this.items = [
					{ label: 'Vendor' },
					{ label: 'PO Setup' }
				];
			}
			else if (this.currentUrl == 'vendorsmodule/vendorpages/app-vendor-capabilities-list') {
				this.items = [
					{ label: 'Vendor' },
					{ label: 'Capabilities-list' }
				];
			}
			else if (this.currentUrl == 'vendorsmodule/vendorpages/app-add-vendor-capabilities') {
				this.items = [
					{ label: 'Add Vendor' },
					{ label: 'capabilities' }
				];
			}
		}
		if (this.otherurl) {
			if (this.otherurl == '/vendorsmodule/vendorpages/app-vendors-list') {
				this.items = [
					{ label: 'Vendor', url: '/vendorsmodule/vendorpages/app-vendors-list' },
					{ label: 'Vendors List' }
				];
			}

			else if (this.otherurl == '/vendorsmodule/vendorpages/app-vendor-general-information') {
				this.items = [
					{ label: 'Vendor', url: '/vendorsmodule/vendorpages/app-vendors-list'},
					{ label: 'Vendor' + "'s" + ' General Information' }
				];
			}

			else if (this.otherurl == '/vendorsmodule/vendorpages/app-vendor-contacts') {
				this.items = [
					{ label: 'Vendor', url: '/vendorsmodule/vendorpages/app-vendors-list' },
					{ label: 'Contacts' }
				];
			}

			else if (this.otherurl == 'vendorsmodule/vendorpages/app-vendor-financial-information') {
				this.items = [
					{ label: 'Vendor', url: '/vendorsmodule/vendorpages/app-vendors-list' },
					{ label: 'Financial Information' }
				];
			}

			else if (this.otherurl == '/vendorsmodule/vendorpages/app-vendor-payment-information') {
				this.items = [
					{ label: 'Vendor', url: '/vendorsmodule/vendorpages/app-vendors-list' },
					{ label: 'Payment Information' }
				];
			}

			else if (this.otherurl == '/vendorsmodule/vendorpages/app-vendor-shipping-information') {
				this.items = [
					{ label: 'Vendor', url: '/vendorsmodule/vendorpages/app-vendors-list' },
					{ label: 'Shipping Information' }
				];
			}

			else if (this.otherurl == '/vendorsmodule/vendorpages/app-vendor-warnings') {
				this.items = [
					{ label: 'Vendor', url: '/vendorsmodule/vendorpages/app-vendors-list' },
					{ label: 'Warnings' }
				];
			}

			else if (this.otherurl == '/vendorsmodule/vendorpages/app-vendor-memo') {
				this.items = [
					{ label: 'Vendor' },
					{ label: 'Memo' }
				];
			}

			else if (this.otherurl == '/vendorsmodule/vendorpages/app-vendor-emails') {
				this.items = [
					{ label: 'Vendor' },
					{ label: 'Emails' }
				];
			}

			else if (this.otherurl == '/vendorsmodule/vendorpages/app-vendor-conversations') {
				this.items = [
					{ label: 'Vendor' },
					{ label: 'Conversations' }
				];
			}
			else if (this.otherurl == 'vendorsmodule/vendorpages/app-create-po') {
				this.items = [
					{ label: 'Vendor' },
					{ label: 'Create PO' }
				];
			}
			else if (this.otherurl == 'vendorsmodule/vendorpages/app-create-po') {
				this.items = [
					{ label: 'Vendor' },
					{ label: 'Create PO' }
				];
			}
			else if (this.otherurl == 'vendorsmodule/vendorpages/app-polist') {
				this.items = [
					{ label: 'Vendor' },
					{ label: 'PO List' }
				];
			}
			else if (this.otherurl == 'vendorsmodule/vendorpages/app-purchase-setup') {
				this.items = [
					{ label: 'Vendor' },
					{ label: 'PO Setup' }
				];
			}
			else if (this.currentUrl == 'vendorsmodule/vendorpages/app-vendor-capabilities-list') {
				this.items = [
					{ label: 'Vendor' },
					{ label: 'Capabilities-list' }
				];
			}
			else if (this.currentUrl == 'vendorsmodule/vendorpages/app-add-vendor-capabilities') {
				this.items = [
					{ label: 'Add Vendor' },
					{ label: 'capabilities' }
				];
			}
		}


	}
}