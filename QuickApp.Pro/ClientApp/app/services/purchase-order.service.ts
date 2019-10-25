import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { PurchaseOrderEndpoint } from './purchase-order-endpoint.service';



@Injectable()
export class PurchaseOrderService {
    constructor(
        private router: Router,
        private http: HttpClient,
       	private purchaseORderEndpoint: PurchaseOrderEndpoint) { let currentUrl = this.router.url; }
    getPurchaseOrdersBasic() {
		return Observable.forkJoin(
			this.purchaseORderEndpoint.getPurchaseOrderBasicList<any[]>());
  }
  
  /*vendor PO*/
  getVendorPOById(Id: number) {
    return this.purchaseORderEndpoint.getVendorPOById<any>(Id);
  }
  /*./vendor PO*/

}