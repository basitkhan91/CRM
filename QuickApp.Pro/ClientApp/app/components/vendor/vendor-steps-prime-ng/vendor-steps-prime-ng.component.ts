﻿import { Component } from '@angular/core';
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
export class VendorStepsPrimeNgComponent {
	ifvalue: boolean;
	generalcollection: any;
	collection: any;
    currentUrl: any;
    isDisabledSteps: boolean = false;
	items: MenuItem[];

	msgs: Message[] = [];

    activeMenuItem: number = 1;
	
	showComponentPTab: boolean;

	constructor(private router: ActivatedRoute, private route: Router, private vendorService: VendorService) {
		//debugger;
        this.vendorService.stepData$.subscribe(value => {
            this.changeStep(value);
        });
		
		
    }

    changeStep(value) {
        if (value == 'General Information') {
            //	this.showComponentPTab = this.vendorService.ShowPtab;
            this.activeMenuItem = 1;
        }

        else if (value == 'Contacts') {

            this.activeMenuItem = 2;
        }
        else if (value == 'Financial Information') {

            this.activeMenuItem = 3;
        }
        else if (value == 'Payment Information') {

            this.activeMenuItem = 4;
        }
        else if (value == 'Shipping Information') {

            this.activeMenuItem = 5;
        }
        else if (value == 'Warnings') {

            this.activeMenuItem = 6;
        }
        else if (value == 'Documents') {

            this.activeMenuItem = 7;
        }
    }
    changeOfTab(value) {

    }

	ngOnInit() {
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
}