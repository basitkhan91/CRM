import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { EndpointFactory } from "./endpoint-factory.service";
import { ConfigurationService } from "./configuration.service";
import { ISalesOrder } from "../models/sales/ISalesOrder.model";
@Injectable()
export class SalesOrderEndpointService extends EndpointFactory {
  private readonly getNewSalesOrderInstanceUrl: string = "/api/salesquote/new";

  constructor(
    http: HttpClient,
    configurations: ConfigurationService,
    injector: Injector
  ) {
    super(http, configurations, injector);
  }

  getNewSalesOrderInstance<ISalesOrder>(
    customerId: number
  ): Observable<ISalesOrder> {
    const URL = `${this.getNewSalesOrderInstanceUrl}/${customerId}`;
    return this.http
      .get<ISalesOrder>(URL, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getNewSalesOrderInstance(customerId)
        );
      });
  }
}
