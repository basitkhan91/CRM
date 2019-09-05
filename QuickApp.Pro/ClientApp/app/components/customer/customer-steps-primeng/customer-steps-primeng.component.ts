import { Component, state } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { Message } from 'primeng/components/common/message';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';

@Component({
	selector: 'app-customer-create',
	templateUrl: './customer-steps-primeng.component.html',
	styleUrls: ['./customer-steps-primeng.component.scss']
})
/** customer-steps-primeng component*/
export class CustomerStepsPrimengComponent {
	activeMenuItem: number = 1;
	currentTab: string = 'General';
	savedGeneralInformationData: any;
	// ifvalue: boolean;
	// generalcollection: any;
	// collection: any;
	// currentUrl: any;
	// items: MenuItem[];
	// readonly = true;
	// read = false;
	// msgs: Message[] = [];

	// activeIndex: number;

	// showComponentPTab: boolean;
	/** customer-steps-primeng ctor */
	constructor(private router: ActivatedRoute, private route: Router, private customerService: CustomerService) {
		// let currentUrl = this.route.url;
		// this.customerService.alertChangeObject$.subscribe(value => {
		// 	this.showComponentPTab = value;

		// });
		// this.customerService.indexObjChangeObject$.subscribe(value => {
		// 	this.activeIndex = value;

		// });
	}

	ngOnInit() {
		// 	this.showComponentPTab = this.customerService.ShowPtab;
		// 	this.currentUrl = this.route.url;
		// 	//debugger
		// 	if (this.currentUrl == '/customersmodule/customerpages/app-customers-list') {
		// 		this.showComponentPTab = false;
		// 		this.activeIndex = 0;

		// 	}
		// 	else if (this.currentUrl == '/customersmodule/customerpages/app-customer-general-information') {
		// 		this.activeIndex = 0;

		// 	}
		// 	else if (this.currentUrl == '/customersmodule/customerpages/app-customer-contacts') {
		// 		//	this.showComponentPTab = this.vendorService.ShowPtab;
		// 		this.activeIndex = 1;
		// 	}
		// 	else if (this.currentUrl == '/customersmodule/customerpages/app-customer-aircraft') {

		// 		this.activeIndex = 2;
		// 	}

		// 	else if (this.currentUrl == '/customersmodule/customerpages/app-customer-ata') {

		// 		this.activeIndex = 3;
		// 	}


		// 	else if (this.currentUrl == '/customersmodule/customerpages/app-customer-financial-information') {

		// 		this.activeIndex = 4;
		// 	}
		// 	else if (this.currentUrl == '/customersmodule/customerpages/app-customer-billing-information') {

		// 		this.activeIndex = 5;
		// 	}
		// 	else if (this.currentUrl == '/customersmodule/customerpages/app-customer-shipping-information') {

		// 		this.activeIndex = 6;
		// 	}
		// 	else if (this.currentUrl == '/customersmodule/customerpages/app-customer-sales-person') {

		// 		this.activeIndex = 7;
		// 	}
		// 	else if (this.currentUrl == '/customersmodule/customerpages/app-customer-warnings') {

		// 		this.activeIndex = 8;
		// 	}


		// 	this.items = [{
		// 		label: 'General Information',
		// 		command: (event: any) => {
		// 			this.activeIndex = 0;
		// 			this.msgs.length = 0;
		// 			this.msgs.push({ severity: 'info', summary: 'General Information', detail: event.item.label });
		// 			this.route.navigateByUrl('/customersmodule/customerpages/app-customer-general-information');

		// 		}
		// 	},
		// 	{
		// 		label: 'Contacts',
		// 		command: (event: any) => {
		// 			this.customerService.financial = true;
		// 			this.activeIndex = 1;
		// 			this.msgs.length = 0;
		// 			this.msgs.push({ severity: 'info', summary: 'Contacts', detail: event.item.label });
		// 			this.route.navigateByUrl('/customersmodule/customerpages/app-customer-contacts');
		// 		}
		// 	},
		// 	{
		// 		label: 'Aircraft',
		// 		command: (event: any) => {
		// 			this.activeIndex = 2;
		// 			this.msgs.length = 0;
		// 			this.msgs.push({ severity: 'info', summary: 'Aircraft', detail: event.item.label });


		// 			this.route.navigate(['/customersmodule/customerpages/app-customer-aircraft']);
		// 		}
		// 	},
		// 	{
		// 		label: 'ATA Chapter',
		// 		command: (event: any) => {
		// 			this.activeIndex = 3;
		// 			this.msgs.length = 0;
		// 			this.msgs.push({ severity: 'info', summary: 'ATA Chapter', detail: event.item.label });
		// 			this.route.navigateByUrl('/customersmodule/customerpages/app-customer-ata');
		// 		}
		// 	},
		// 	{
		// 		label: 'Financial Information',
		// 		command: (event: any) => {
		// 			this.activeIndex = 4;
		// 			this.msgs.length = 0;
		// 			this.msgs.push({ severity: 'info', summary: 'Financial Information', detail: event.item.label });
		// 			this.route.navigateByUrl('/customersmodule/customerpages/app-customer-financial-information');
		// 		}
		// 	},
		// 	{
		// 		label: 'Billing Information',
		// 		command: (event: any) => {
		// 			this.activeIndex = 5;
		// 			this.msgs.length = 0;
		// 			this.msgs.push({ severity: 'info', summary: 'Billing Information', detail: event.item.label });
		// 			this.route.navigateByUrl('/customersmodule/customerpages/app-customer-billing-information');
		// 		}
		// 	},
		// 	{
		// 		label: 'Shipping Information',
		// 		command: (event: any) => {
		// 			this.activeIndex = 6;
		// 			this.msgs.length = 0;
		// 			this.msgs.push({ severity: 'info', summary: 'Shipping Information', detail: event.item.label });
		// 			this.route.navigateByUrl('/customersmodule/customerpages/app-customer-shipping-information');
		// 		}
		// 	},
		// 	{
		// 		label: 'Sales Information',
		// 		command: (event: any) => {
		// 			this.activeIndex = 7;
		// 			this.msgs.length = 0;
		// 			this.msgs.push({ severity: 'info', summary: 'Warnings', detail: event.item.label });
		// 			this.route.navigateByUrl('/customersmodule/customerpages/app-customer-sales-person');
		// 		}
		// 	},
		// 	{
		// 		label: 'Warnings',
		// 		command: (event: any) => {
		// 			this.activeIndex = 8;
		// 			this.msgs.length = 0;
		// 			this.msgs.push({ severity: 'info', summary: 'Memo', detail: event.item.label });
		// 			this.route.navigateByUrl('/customersmodule/customerpages/app-customer-warnings');
		// 		}
		// 	}];
	}
	changeOfTab(value) {
		if (value === 'General') {
			this.currentTab = 'General';
			this.activeMenuItem = 1;
		} else if (value === 'Contacts') {
			this.currentTab = 'Contacts';
			this.activeMenuItem = 2;

		} else if (value === 'AircraftInfo') {
			this.currentTab = 'AircraftInfo';
			this.activeMenuItem = 3;
		} else if (value === 'Atachapter') {
			this.currentTab = 'Atachapter';
			this.activeMenuItem = 4;
		} else if (value === 'Financial') {
			this.currentTab = 'Financial';
			this.activeMenuItem = 5;
		} else if (value === 'Billing') {
			this.currentTab = 'Billing';
			this.activeMenuItem = 6;
		} else if (value === 'Shipping') {
			this.currentTab = 'Shipping';
			this.activeMenuItem = 7;
		} else if (value === 'Sales') {
			this.currentTab = 'Sales';
			this.activeMenuItem = 8;
		} else if (value === 'Warnings') {
			this.currentTab = 'Warnings';
			this.activeMenuItem = 9;
		}
	}
	generalInformationData(data) {
		this.savedGeneralInformationData = data;
	}
}
//{
//	label: 'Emails',
//	command: (event: any) => {
//		this.activeIndex = 7;
//		this.msgs.length = 0;
//		this.msgs.push({ severity: 'info', summary: 'Emails', detail: event.item.label });
//		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-emails');
//	}
//},
//{
//	label: 'Conversations',
//	command: (event: any) => {
//		this.activeIndex = 8;
//		this.msgs.length = 0;
//		this.msgs.push({ severity: 'info', summary: 'Conversations', detail: event.item.label });
//		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-conversations');
//	}
	//}];
