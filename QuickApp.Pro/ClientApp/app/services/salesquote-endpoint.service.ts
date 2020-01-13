import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { EndpointFactory } from "./endpoint-factory.service";
import { ConfigurationService } from "./configuration.service";
import { ISalesQuote } from "../models/sales/ISalesQuote.model";
import { ISalesQuoteView } from "../models/sales/ISalesQuoteView";
import { ISalesOrderQuote } from "../models/sales/ISalesOrderQuote";
import { ISalesSearchParameters } from "../models/sales/ISalesSearchParameters";
import { ISalesQuoteListView } from "../models/sales/ISalesQuoteListView";

@Injectable()
export class SalesQuoteEndpointService extends EndpointFactory {
  private readonly getNewSalesQuoteInstanceUrl: string = "/api/salesquote/new";
  private readonly saleQuote: string = "/api/salesquote";
  private readonly searchSalesQuote: string = "/api/salesquote/search";
  private readonly getSalesQuoteDetails: string = "/api/salesquote/get";
  private readonly saleQuoteDeletePart: string = "/api/salesquote/deletepart";

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

  create(salesQuote: ISalesQuoteView): Observable<ISalesOrderQuote> {
    return this.http
      .post(
        this.saleQuote,
        JSON.stringify(salesQuote),
        this.getRequestHeaders()
      )
      .catch(error => {
        return this.handleError(error, () => this.create(salesQuote));
      });
  }

  update(salesQuote: ISalesQuoteView): Observable<ISalesOrderQuote> {
    let url: string = `${this.saleQuote}/${salesQuote.salesOrderQuote.salesOrderQuoteId}`;
    return this.http
      .put(url, JSON.stringify(salesQuote), this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.create(salesQuote));
      });
  }

  search(
    salesQuoteSearchParameters: ISalesSearchParameters
  ): Observable<ISalesQuoteListView> {
    return this.http
      .post(
        this.searchSalesQuote,
        JSON.stringify(salesQuoteSearchParameters),
        this.getRequestHeaders()
      )
      .catch(error => {
        return this.handleError(error, () =>
          this.search(salesQuoteSearchParameters)
        );
      });
  }

  delete(salesQuoteId: number): Observable<boolean> {
    let endpointUrl = `${this.saleQuote}/${salesQuoteId}`;
    return this.http
      .delete<boolean>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.delete(salesQuoteId));
      });
  }

  deletePart(salesQuotePartId: number): Observable<boolean> {
    let endpointUrl = `${this.saleQuoteDeletePart}/${salesQuotePartId}`;
    return this.http
      .delete<boolean>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.deletePart(salesQuotePartId));
      });
  }

  getSalesQuote(salesQuoteId: number): Observable<ISalesQuoteView> {
    const URL = `${this.getSalesQuoteDetails}/${salesQuoteId}`;
    return this.http
      .get<ISalesQuote>(URL, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.getSalesQuote(salesQuoteId));
      });
  }
}
