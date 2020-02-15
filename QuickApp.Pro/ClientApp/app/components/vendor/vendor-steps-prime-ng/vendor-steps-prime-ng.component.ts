import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { Message } from 'primeng/components/common/message';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { VendorService } from '../../../services/vendor.service';

@Component({
	selector: 'app-vendor-steps-prime-ng',
	templateUrl: './vendor-steps-prime-ng.component.html',
	styleUrls: ['./vendor-steps-prime-ng.component.scss']
})
/** vendor-steps-primeNG component*/
export class VendorStepsPrimeNgComponent implements OnInit {
	activeMenuItem: number = 1;
	ifvalue: boolean;
	generalcollection: any;
	collection: any;
	currentUrl: any;
	isDisabledSteps = false;

	items: MenuItem[];

	msgs: Message[] = [];


	showComponentPTab: boolean;

	constructor(private router: ActivatedRoute,
		private _changeDetectionRef: ChangeDetectorRef,
		private route: Router, private vendorService: VendorService) {

		this.vendorService.activeStep.subscribe(activeIndex => {
			this.changeStep(activeIndex);
		})


	}




	ngOnInit() {


		if (this.vendorService.isEditMode) {

			this.isDisabledSteps = true;

		}
		//alert('ngInit');


		//this.items = [{
		//	label: 'General Information',
		//	command: (event: any) => {
		//		this.activeIndex = 0;
		//		this.msgs.length = 0;
		//		this.msgs.push({ severity: 'info', summary: 'General Information', detail: event.item.label });
		//		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');

		//	}
		//},
		//{
		//	label: 'Contacts',
		//	command: (event: any) => {
		//		this.activeIndex = 1;
		//		this.msgs.length = 0;
		//		this.msgs.push({ severity: 'info', summary: 'Contacts', detail: event.item.label });
		//		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-contacts');
		//	}
		//},
		//{
		//	label: 'Financial Information',
		//	command: (event: any) => {
		//		this.activeIndex = 2;
		//		this.msgs.length = 0;
		//		this.msgs.push({ severity: 'info', summary: 'Financial Information', detail: event.item.label });
		//		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-financial-information');
		//	}
		//},
		//{
		//	label: 'Payment Information',
		//	command: (event: any) => {
		//		this.activeIndex = 3;
		//		this.msgs.length = 0;
		//		this.msgs.push({ severity: 'info', summary: 'Payment Information', detail: event.item.label });
		//		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-payment-information');
		//	}
		//},
		//{
		//	label: 'Shipping Information',
		//	command: (event: any) => {
		//		this.activeIndex = 4;
		//		this.msgs.length = 0;
		//		this.msgs.push({ severity: 'info', summary: 'Shipping Information', detail: event.item.label });
		//		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-shipping-information');
		//	}
		//},
		//{
		//	label: 'Warnings',
		//	command: (event: any) => {
		//		this.activeIndex = 5;
		//		this.msgs.length = 0;
		//		this.msgs.push({ severity: 'info', summary: 'Warnings', detail: event.item.label });
		//		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-warnings');
		//	}
		//},
		//{
		//	label: 'Memo',
		//	command: (event: any) => {
		//		this.activeIndex = 6;
		//		this.msgs.length = 0;
		//		this.msgs.push({ severity: 'info', summary: 'Memo', detail: event.item.label });
		//		this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-memo');
		//	}
		//},
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
		//}
		//];
	}


	changeStep(value) {
		console.log(value);


		console.log(this.vendorService.listCollection);

		if (value == 1) {
			//	this.showComponentPTab = this.vendorService.ShowPtab;
			this.activeMenuItem = 1;
			if (this.vendorService.isEditMode) {
				const vendorId = this.vendorService.listCollection.vendorId;
				this.route.navigateByUrl(`/vendorsmodule/vendorpages/app-vendor-general-information/edit/${vendorId}`);
			} else {
				this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');
			}
		}

		else if (value == 2) {
			this.activeMenuItem = 2;
			this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-capes');
		}
		else if (value == 3) {

			this.activeMenuItem = 3;
			this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-contacts');
		}
		else if (value == 4) {

			this.activeMenuItem = 4;
			this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-financial-information');
		}
		else if (value == 5) {

			this.activeMenuItem = 5;
			this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-payment-information');
		}
		else if (value == 6) {

			this.activeMenuItem = 6;
			this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-billing-information');
		}
		else if (value == 7) {

			this.activeMenuItem = 7;
			this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-shipping-information');
		}
		else if (value == 8) {

			this.activeMenuItem = 8;
			this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-warnings');
		}
		else if (value == 9) {

			this.activeMenuItem = 9;
			this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-memo');
		}
		else if (value == 10) {

			this.activeMenuItem = 10;
			this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-documents');
		}
		// else {
		// 	this.activeMenuItem = 1;
		// 	this.route.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');
		// }

	}


}