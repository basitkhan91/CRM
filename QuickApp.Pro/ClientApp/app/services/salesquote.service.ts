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
import { ISalesQuoteView } from "../models/sales/ISalesQuoteView";
import { ISalesOrderQuote } from "../models/sales/ISalesOrderQuote";
import { ISalesSearchParameters } from "../models/sales/ISalesSearchParameters";
import { ISalesQuoteListView } from "../models/sales/ISalesQuoteListView";
import { SalesOrderQuote } from "../models/sales/SalesOrderQuote";
import { ItemMasterSearchQuery } from "../components/sales/quotes/models/item-master-search-query";
import { IPartJson } from "../components/sales/shared/models/ipart-json";
import { PartDetail } from "../components/sales/shared/models/part-detail";

export type RolesChangedOperation = "add" | "delete" | "modify";
export type RolesChangedEventArg = {
  roles: Role[] | string[];
  operation: RolesChangedOperation;
};

@Injectable()
export class SalesQuoteService {
  salesOrderQuote: ISalesOrderQuote;
  approvers: any[];
  parts: IPartJson[];
  selectedParts: PartDetail[];
  query: ItemMasterSearchQuery;
  constructor(private salesQuoteEndPointSevice: SalesQuoteEndpointService) {
    this.salesOrderQuote = new SalesOrderQuote();
    this.approvers = [];
    this.parts = [];
    this.selectedParts = [];
    this.query = new ItemMasterSearchQuery();
    this.query.partSearchParamters.quantityAlreadyQuoted = 0;
  }

  getNewSalesQuoteInstance(customerId: number) {
    return Observable.forkJoin(
      this.salesQuoteEndPointSevice.getNewSalesQuoteInstance<ISalesQuote>(
        customerId
      )
    );
  }

  getNewSalesOrderQuteInstance() {
    return Observable.create(observer => {
      observer.next(this.salesOrderQuote);
      observer.complete();

    });
  }

  getSalesOrderQuteInstance() {
    return Observable.create(observer => {
      observer.next(this.salesOrderQuote);
      observer.complete();

    });
  }
  resetSalesOrderQuote(){
    this.approvers = [];
    this.selectedParts = [];
    this.salesOrderQuote = new SalesOrderQuote();
  }

  getSelectedParts() {
    return Observable.create(observer => {
      observer.next(this.selectedParts);
      observer.complete();

    });
  }
  getSalesOrderQuteApprovers() {
    return Observable.create(observer => {
      observer.next(this.approvers);
      observer.complete();

    });
  }
  getSearchPartResult(){
    return Observable.create(observer => {
      observer.next(this.parts);
      observer.complete();

    });
  }
  getSearchPartObject(){
    return Observable.create(observer => {
      observer.next(this.query);
      observer.complete();

    });
  }
  resetSearchPart(){
    this.parts = [];
    this.query = new ItemMasterSearchQuery();
    this.query.partSearchParamters.quantityAlreadyQuoted = 0;
  }
  updateSearchPartResult(parts){
    this.parts = parts;
  }
  updateSearchPartObject(query){
    this.query = query;
  }


  create(salesquote: ISalesQuoteView): Observable<ISalesOrderQuote[]> {
    return Observable.forkJoin(
      this.salesQuoteEndPointSevice.create(
        salesquote
      )
    );
  }

  update(salesquote: ISalesQuoteView): Observable<ISalesOrderQuote[]> {
    return Observable.forkJoin(
      this.salesQuoteEndPointSevice.update(
        salesquote
      )
    );
  }

  search(salesQuoteSearchParameters: ISalesSearchParameters): Observable<ISalesQuoteListView[]> {
    return Observable.forkJoin(
      this.salesQuoteEndPointSevice.search(
        salesQuoteSearchParameters
      )
    );
  }

  delete(salesQuoteId: number): Observable<boolean[]> {
    return Observable.forkJoin(
      this.salesQuoteEndPointSevice.delete(
        salesQuoteId
      )
    )
  }
}