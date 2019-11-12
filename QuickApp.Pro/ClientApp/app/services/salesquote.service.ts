import { Injectable } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { ShelfEndpoint } from "./shelf-endpoint.service";
import { AuthService } from "./auth.service";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";
import { Shelf } from "../models/shelf.model";
import { AuditHistory } from "../models/audithistory.model";
import { SalesQuoteEndpointService } from "./salesquote-endpoint.service";
import { ISalesQuote } from "../models/sales/ISalesQuote.model";

export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = {
  roles: Role[] | string[];
  operation: RolesChangedOperation;
};

@Injectable()
export class SalesQuoteService {
  constructor(private salesQuoteEndPointSevice: SalesQuoteEndpointService) {}

  getNewSalesQuoteInstance(customerId: number) {
    return Observable.forkJoin(
      this.salesQuoteEndPointSevice.getNewSalesQuoteInstance<ISalesQuote>(
        customerId
      )
    );
  }
}
