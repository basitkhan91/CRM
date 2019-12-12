import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { EndpointFactory } from "./endpoint-factory.service";
import { ConfigurationService } from "./configuration.service";
import { ISalesQuote } from "../models/sales/ISalesQuote.model";
import { ISalesQuoteView } from "../models/sales/ISalesQuoteView";
import { ISalesOrderQuote } from "../models/sales/ISalesOrderQuote";

@Injectable()
export class SalesQuoteEndpointService extends EndpointFactory {
  private readonly getNewSalesQuoteInstanceUrl: string = "/api/salesquote/new";
  private readonly saleQuote: string = "/api/salesquote";


  constructor(
    http: HttpClient,
    configurations: ConfigurationService,
    injector: Injector
  ) {
    super(http, configurations, injector);
  }

  getNewSalesQuoteInstance<ISalesQuote>(
    customerId: number
  ): Observable<ISalesQuote> {
    const URL = `${this.getNewSalesQuoteInstanceUrl}/${customerId}`;
    return this.http
      .get<ISalesQuote>(URL, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getNewSalesQuoteInstance(customerId)
        );
      });
  }

  create(
    salesQuote: ISalesQuoteView
  ): Observable<ISalesOrderQuote> {
    return this.http.post(this.saleQuote, JSON.stringify(salesQuote), this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.create(salesQuote));
      });
  }

  update(
    salesQuote: ISalesQuoteView
  ): Observable<ISalesOrderQuote> {
    return this.http.put(this.saleQuote, JSON.stringify(salesQuote), this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.create(salesQuote));
      });
  }

}
