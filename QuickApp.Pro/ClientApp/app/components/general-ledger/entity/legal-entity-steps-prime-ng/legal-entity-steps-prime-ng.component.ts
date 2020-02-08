import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message } from 'primeng/components/common/message';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { LegalEntityService } from '../../../../services/legalentity.service';

@Component({
	selector: 'app-legal-entity-steps-prime-ng',
	templateUrl: './legal-entity-steps-prime-ng.component.html',
	styleUrls: ['./legal-entity-steps-prime-ng.component.scss']
})
/** legal-entity-steps-primeNG component*/
export class LegalEntityStepsPrimeNgComponent implements OnInit {
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
		private route: Router, private entityService: LegalEntityService) {
		this.entityService.activeStep.subscribe(activeIndex => {
			this.changeStep(activeIndex);
		})
	}
	ngOnInit() {
		if (this.entityService.isEditMode) {
			this.isDisabledSteps = true;
		}
	}

	changeStep(value) {
		console.log(value);
		console.log(this.entityService.listCollection);
		if (value == 1) {
			this.activeMenuItem = 1;
			this.route.navigateByUrl('/generalledgermodule/generalledgerpage/legal-entity-general-information');
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
	}


}