﻿import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class PublicationEndpointService extends EndpointFactory {
  private readonly _publicationGetUrl: string = '/api/Publication/Get';
  private readonly _publicationUrlNew: string =
    '/api/Publication/publicationpost';
  private readonly _actionsUrlAuditHistory: string =
    '/api/Publication/auditHistoryById';
  private readonly getPublicationAuditById: string = '/api/Publication/audits';

  private readonly _publicationPNACNEW: string =
    '/api/Publication/PubPNACMappingPost';
  private readonly _publicationPNATANEW: string =
    '/api/Publication/PubPNATAMappingPost';
  private readonly _PostPNMapping: string = '/api/Publication/PNIMMappingPost';
    private readonly _getAirMappingByPublicationID: string = '/api/Publication/getItemAircraftMappedByPublcationID';
    private readonly _getAtaMappingByPublicationID: string = '/api/Publication/getItemAtaMappedByPublcationID';
  private readonly _publicationPNMappingData: string =
    '/api/Publication/GetPubPNMappedData_PNID';
  private readonly _AircraftInformationSearch: string =
    'getDashListBy_MUTLI_MID_TID_DID/';
  get getCodeUrl() {
    return this.configurations.baseUrl + this._publicationGetUrl;
  }

  constructor(
    http: HttpClient,
    configurations: ConfigurationService,
    injector: Injector
  ) {
    super(http, configurations, injector);
  }

  getpublicationEndpoint<T>(): Observable<T> {
    return this.http
      .get<T>(this.getCodeUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.getpublicationEndpoint());
      });
  }

  getNewpublicationEndpoint<T>(userObject: any): Observable<T> {
    return this.http
      .post<T>(
        this._publicationUrlNew,
        JSON.stringify(userObject),
        this.getRequestHeaders()
      )
      .catch(error => {
        return this.handleError(error, () =>
          this.getNewpublicationEndpoint(userObject)
        );
      });
  }

  getEditActionEndpoint<T>(actionId?: number): Observable<T> {
    let endpointUrl = actionId
      ? `${this._publicationUrlNew}/${actionId}`
      : this._publicationUrlNew;

    return this.http
      .get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getEditActionEndpoint(actionId)
        );
      });
  }

  getUpdateActionEndpoint<T>(roleObject: any, actionId: any): Observable<T> {
    let endpointUrl = `${this._publicationUrlNew}/${actionId}`;

    return this.http
      .put<T>(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getUpdateActionEndpoint(roleObject, actionId)
        );
      });
  }

  getDeleteActionEndpoint<T>(actionId: number): Observable<T> {
    let endpointUrl = `${this._publicationUrlNew}/${actionId}`;

    return this.http
      .delete<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getDeleteActionEndpoint(actionId)
        );
      });
  }
  getHistoryActionEndpoin<T>(actionId: number): Observable<T> {
    let endpointUrl = `${this._actionsUrlAuditHistory}/${actionId}`;

    return this.http
      .get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getHistoryActionEndpoin(actionId)
        );
      });
  }

  getPublincationAuditById<T>(publicationId: number): Observable<T> {
    let endpointUrl = `${this.getPublicationAuditById}/${publicationId}`;

    return this.http
      .get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getPublincationAuditById(publicationId)
        );
      });
  }

  postPNACMapping<T>(userObject: any): Observable<T> {
    return this.http
      .post<T>(
        this._publicationPNACNEW,
        JSON.stringify(userObject),
        this.getRequestHeaders()
      )
      .catch(error => {
        return this.handleError(error, () => this.postPNACMapping(userObject));
      });
  }
  postPNATAMapping<T>(userObject: any): Observable<T> {
    return this.http
      .post<T>(
        this._publicationPNATANEW,
        JSON.stringify(userObject),
        this.getRequestHeaders()
      )
      .catch(error => {
        return this.handleError(error, () => this.postPNATAMapping(userObject));
      });
  }

  getPubPNById<T>(PNid: string): Observable<T> {
    let endpointUrl = `${this._publicationPNMappingData}/${PNid}`;

    return this.http
      .get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () => this.getPubPNById(PNid));
      });
  }

  // Save Part Number Mapping
  postPartNumberMappedData<T>(object): Observable<T> {
    return this.http
      .post<T>(
        this._PostPNMapping,
        JSON.stringify(object),
        this.getRequestHeaders()
      )
      .catch(err => {
        return this.handleError(err, () =>
          this.postPartNumberMappedData(object)
        );
      });

  }

  getAircraftInformationBySearch<T>(searchUrl, publicationId?): Observable<T> {
    console.log(searchUrl);
    return this.http
      .get<T>(`${this._AircraftInformationSearch}${searchUrl}`)
      .catch(err => {
        return this.handleError(err, () =>
          this.getAircraftInformationBySearch(searchUrl, publicationId)
        );
      });
  }


    getAirMappedByPubId<T>(PublicationID: number): Observable<T> {
        let endpointUrl = `${this._getAirMappingByPublicationID}/${PublicationID}`;

        return this.http
            .get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAirMappedByPubId(PublicationID));
            });
    }
    getAtaMappedByPubId<T>(PublicationID: number): Observable<T> {
        let endpointUrl = `${this._getAtaMappingByPublicationID}/${PublicationID}`;

        return this.http
            .get<T>(endpointUrl, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getAtaMappedByPubId(PublicationID));
            });
    }
}
