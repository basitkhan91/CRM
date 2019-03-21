import { Component } from "@angular/core";
import { BreadcrumbModule } from 'primeng/breadcrumb'; //Bread Crumb
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { Message } from 'primeng/components/common/message';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { CustomerService } from "../services/customer.service";
@Component({
    selector: "quickapp-pro-customer",
    templateUrl: './customerpages.component.html'
})
export class CustomerPagesComponent {
	otherurl: any;
	currentUrl: string;

	public items: MenuItem[];
	home: MenuItem;

	constructor(private router: ActivatedRoute, private route: Router, private customerService: CustomerService ) {
		//let currentUrl = this.route.url;
		this.customerService.bredcrumbObjChangeObject$.subscribe(value => {
			//debugger
			this.otherurl = value;
			this.loadmethod(this.otherurl);

		});
		//this.showPTab = this.vendorService.ShowPtab;

	}

	ngOnInit() {
		this.currentUrl = this.route.url;
		this.loadmethod(this.currentUrl)

	}
	loadmethod(url) {

		this.currentUrl = url;
		if (this.currentUrl) {
			if (this.currentUrl == '/customersmodule/customerpages/app-customers-list') {
				this.items = [
					{ label: 'Customer'},
					{ label: 'Customer-list' }
				];
			}

			else if (this.currentUrl == '/customersmodule/customerpages/app-customer-general-information') {
				this.items = [
					{ label: 'Customer' },
					{ label: 'General-Information' }
				];
			}

			else if (this.currentUrl == '/customersmodule/customerpages/app-customer-contacts') {
				this.items = [
					{ label: 'Customer'},
					{ label: 'Contacts' }
				];
			}

			else if (this.currentUrl == '/customersmodule/customerpages/app-customer-financial-information') {
				this.items = [
					{ label: 'Customer'},
					{ label: 'Financial-Information' }
				];
			}

			else if (this.currentUrl == '/customersmodule/customerpages/app-customer-billing-information') {
				this.items = [
					{ label: 'Customer'},
					{ label: 'Billing-Information' }
				];
			}

			else if (this.currentUrl == '/customersmodule/customerpages/app-customer-shipping-information') {
				this.items = [
					{ label: 'Customer' },
					{ label: 'Shipping-Information' }
				];
			}

			else if (this.currentUrl == '/customersmodule/customerpages/app-customer-sales-person') {
				this.items = [
					{ label: 'Customer' },
					{ label: 'Sales-Person' }
				];
			}

			else if (this.currentUrl == '/customersmodule/customerpages/app-customer-warnings') {
				this.items = [
					{ label: 'Customer' },
					{ label: 'Warnings' }
				];
			}
		}
		if (this.otherurl)
		{
			if (this.currentUrl == '/customersmodule/customerpages/app-customers-list') {
				this.items = [
					{ label: 'Customer' },
					{ label: 'Customer-list' }
				];
			}

			else if (this.currentUrl == '/customersmodule/customerpages/app-customer-general-information') {
				this.items = [
					{ label: 'Customer' },
					{ label: 'General-Information' }
				];
			}

			else if (this.currentUrl == '/customersmodule/customerpages/app-customer-contacts') {
				this.items = [
					{ label: 'Customer' },
					{ label: 'Contacts' }
				];
			}

			else if (this.currentUrl == '/customersmodule/customerpages/app-customer-financial-information') {
				this.items = [
					{ label: 'Customer' },
					{ label: 'Financial-Information' }
				];
			}

			else if (this.currentUrl == '/customersmodule/customerpages/app-customer-billing-information') {
				this.items = [
					{ label: 'Customer' },
					{ label: 'Billing-Information' }
				];
			}

			else if (this.currentUrl == '/customersmodule/customerpages/app-customer-shipping-information') {
				this.items = [
					{ label: 'Customer' },
					{ label: 'Shipping-Information' }
				];
			}

			else if (this.currentUrl == '/customersmodule/customerpages/app-customer-sales-person') {
				this.items = [
					{ label: 'Customer' },
					{ label: 'Sales-Person' }
				];
			}

			else if (this.currentUrl == '/customersmodule/customerpages/app-customer-warnings') {
				this.items = [
					{ label: 'Customer' },
					{ label: 'Warnings' }
				];
			}

		}


	}
}