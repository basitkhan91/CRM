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
       	private purchaseOrderEndpoint: PurchaseOrderEndpoint) { let currentUrl = this.router.url; }
    getPurchaseOrdersBasic() {
		return Observable.forkJoin(
			this.purchaseOrderEndpoint.getPurchaseOrderBasicList<any[]>());
  }
  
  /*vendor PO*/
  getVendorPOById(Id: number) {
    return this.purchaseOrderEndpoint.getVendorPOById<any>(Id);
  }

  saveCreatePOApproval(action: any) {
    return this.purchaseOrderEndpoint.saveCreatePOApproval<any>(action);
  }

  updatePOApproval(action: any) {
      return this.purchaseOrderEndpoint.updatePOApproval<any>(action);
  }

  getPOApproverList(purchaseOrderId){
    return this.purchaseOrderEndpoint.getPOApproverList(purchaseOrderId);
  }

  getPurchaseOrderPartsById(purchaseOrderId){
    return this.purchaseOrderEndpoint.getPurchaseOrderPartsById(purchaseOrderId);
  }

  getPOStatus(purchaseOrderId, status, updatedBy){
    return this.purchaseOrderEndpoint.getPOStatus(purchaseOrderId, status, updatedBy);
  }
  /*./vendor PO*/

}