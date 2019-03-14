import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../../../services/vendor.service';

@Component({
    selector: 'app-receivng-po',
    templateUrl: './receivng-po.component.html',
    styleUrls: ['./receivng-po.component.scss']
})
/** receivng-po component*/
export class ReceivngPoComponent {
	sourcePoApproval: any = {};;
	pocollection: any[]=[];
    /** receivng-po ctor */
	constructor(private router: Router, private vendorService: VendorService) {
		//debugger;
		this.pocollection = vendorService.selectedPoCollection;
		if (this.vendorService.selectedPoCollection) {
			this.sourcePoApproval = this.pocollection[0];
			this.sourcePoApproval.dateRequested = new Date(this.sourcePoApproval.dateRequested);
			this.sourcePoApproval.dateApprovied = new Date(this.sourcePoApproval.dateApprovied);
			this.sourcePoApproval.needByDate = new Date(this.sourcePoApproval.needByDate);
		}
	}

	submitToReceive()
	{
		this.router.navigateByUrl('receivingmodule/receivingpages/app-edit-po')	
	}
}