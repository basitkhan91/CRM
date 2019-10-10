﻿import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class PublicationEndpointService extends EndpointFactory {
    private readonly _publicationGetUrl: string = '/api/Publication/getpublicationslist';
    private readonly _publicationGetByIdUrl: string = '/api/Publication/GetPublicationByID';
    
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
  private readonly _getAirMappingByPublicationID: string =
    '/api/Publication/getItemAircraftMappedByPublcationID';
  private readonly _getAtaMappingByPublicationID: string =
    '/api/Publication/getItemAtaMappedByPublcationID';
  private readonly _getAirMappingByMultiTypeID: string =
    '/api/Publication/getItemAirMappedByPublicationIdMultiTypeID';
  private readonly _getAirMappingByMultiModelID: string =
    '/api/Publication/getItemAirMappedByPublicationIdMultiModelID';
  private readonly _getAirMappingByMultiDashID: string =
    '/api/Publication/getItemAirMappedByPublicationIdMultiDashID';
  private readonly _getAirMappingByMultiTypeIDModelID: string =
    '/api/Publication/getItemAirMappedByPublicationIdMultiTypeIDModelID';
  private readonly _getAirMappingByMultiTypeIDModelIDDashID: string =
    '/api/Publication/getItemAirMappedByPublicationIdMultiTypeIDModelIDDashID';

  private readonly _getATAMappingByMultiChapterIDSubID: string =
    '/api/Publication/getItemATAMappedByPublicationIdMultiATAIDSubChapterID';
  private readonly _deleteItemMasterMappingByID: string =
    '/api/Publication/deletePublicationItemMasterMapping';
  private readonly _getATAMappingByMultiChapterID: string =
    '/api/Publication/getItemATAMappedByPublicationIdMultiChapterID';
  private readonly _getATAMappingByMultiSubChapterID: string =
    '/api/Publication/getItemATAMappedByPublicationIdMultiSubChapterID';

  private readonly _publicationPNMappingData: string =
    '/api/Publication/GetPubPNMappedDataByPublicationRecordIds';
  private readonly _AircraftInformationSearch: string =
    '/api/Publication/searchGetItemAirMappedByPublicationIdMultiTypeIDModelIDDashID';

  private readonly _searchgetAirMappingByMultiTypeIDModelIDDashID: string =
    '/api/Publication/searchGetItemAirMappedByPublicationIdMultiTypeIDModelIDDashID';

  private readonly _searchgetATAMappingByMultiChapterIDSubID: string =
        '/api/Publication/searchGetItemATAMappedByPublicationIdMultiATAIDSubChapterID';

    private readonly _publicationStatus: string =
        '/api/Publication/publicationstatus';
    private readonly _publicationGetByIdViewUrl: string = '/api/Publication/publicationview';
    private readonly _publicationGlobalSearchUrl: string = '/api/Publication/publicationsglobalsearch';  
    private readonly _publicationTypes: string = '/api/Publication/getpublicationtypes';  



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
    getpublicationbyIdEndpoint<T>(id): Observable<T> {
        return this.http
            .get<T>(`${this._publicationGetByIdUrl}/${id}`, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.getpublicationbyIdEndpoint(id));
            });
    }

   
    
  getNewpublicationEndpoint<T>(file: any): Observable<T> {
    const headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    return this.http
      .post<T>(`${this._publicationUrlNew}`, file)
      

        // return this.http
    //   .post<T>(
    //     this._publicationUrlNew,
    //     JSON.stringify(userObject),
    //     this.getRequestHeaders()
    //   )
    //   .catch(error => {
    //     return this.handleError(error, () =>
    //       this.getNewpublicationEndpoint(userObject)
    //     );
    //   });
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

    getUpdateActionEndpoint<T>(file: any): Observable<T> {
    const headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    let endpointUrl = `${this._publicationUrlNew}`;

    return this.http
      .put<T>(endpointUrl, file  )
      .catch(error => {
        return this.handleError(error, () =>
          this.getUpdateActionEndpoint(file)
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

    publicationStatusEndpoint<T>(id, status, updatedBy): Observable<T> {
        return this.http
            .get<T>(`${this._publicationStatus}?publicationRecordId=${id}&status=${status}&updatedBy=${updatedBy}`, this.getRequestHeaders())
            .catch(error => {
                return this.handleError(error, () => this.publicationStatusEndpoint(id, status, updatedBy));
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

  getPubPNById<T>(PNid: number): Observable<T> {
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

  getAircraftInformationBySearch<T>(searchUrl, publicationId): Observable<T> {
    console.log(searchUrl);
    return this.http
      .get<T>(
        `${this._AircraftInformationSearch}/${publicationId}?${searchUrl}`
      )
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
        return this.handleError(error, () =>
          this.getAirMappedByPubId(PublicationID)
        );
      });
  }
  getAtaMappedByPubId<T>(PublicationID: number): Observable<T> {
    let endpointUrl = `${this._getAtaMappingByPublicationID}/${PublicationID}`;

    return this.http
      .get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getAtaMappedByPubId(PublicationID)
        );
      });
  }
  getAirMappedByMultiTypeId<T>(
    PublicationID: number,
    AircraftTypeId: string
  ): Observable<T> {
    let endpointUrl = `${
      this._getAirMappingByMultiTypeID
      }/${PublicationID}${AircraftTypeId}`;

    return this.http
      .get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getAirMappedByMultiTypeId(PublicationID, AircraftTypeId)
        );
      });
  }
  getAtaMappedByMultiModelId<T>(
    PublicationID: number,
    AircraftModelID: string
  ): Observable<T> {
    let endpointUrl = `${
      this._getAirMappingByMultiModelID
      }/${PublicationID}${AircraftModelID}`;

    return this.http
      .get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getAtaMappedByMultiModelId(PublicationID, AircraftModelID)
        );
      });
  }
  getAtaMappedByMultiDashId<T>(
    PublicationID: number,
    DashNumberId: string
  ): Observable<T> {
    let endpointUrl = `${
      this._getAirMappingByMultiDashID
      }/${PublicationID}${DashNumberId}`;

    return this.http
      .get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getAtaMappedByMultiDashId(PublicationID, DashNumberId)
        );
      });
  }
  getAtaMappedByMultiTypeIDModelID<T>(
    PublicationID: number,
    AircraftTypeId: string,
    AircraftModelID: string
  ): Observable<T> {
    let endpointUrl = `${
      this._getAirMappingByMultiTypeIDModelID
      }/${PublicationID}${AircraftTypeId}/${AircraftModelID}`;

    return this.http
      .get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getAtaMappedByMultiTypeIDModelID(
            PublicationID,
            AircraftTypeId,
            AircraftModelID
          )
        );
      });
  }
  getAtaMappedByMultiTypeIDModelIDDashID<T>(
    PublicationID: number,
    AircraftTypeId: string,
    AircraftModelID: string,
    DashNumberId: string
  ): Observable<T> {
    let endpointUrl = `${
      this._getAirMappingByMultiTypeIDModelIDDashID
      }/${PublicationID}${AircraftTypeId}/${AircraftModelID}/${DashNumberId}`;

    return this.http
      .get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getAtaMappedByMultiTypeIDModelIDDashID(
            PublicationID,
            AircraftTypeId,
            AircraftModelID,
            DashNumberId
          )
        );
      });
  }

  getAtaMappedByMultiATAIDSubChapterID<T>(
    PublicationID: number,
    ChapterID: string,
    SubChapterID
  ): Observable<T> {
    let endpointUrl = `${
      this._getATAMappingByMultiChapterIDSubID
      }/${PublicationID}/${ChapterID}/${SubChapterID}`;

    return this.http
      .get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getAtaMappedByMultiATAIDSubChapterID(
            PublicationID,
            ChapterID,
            SubChapterID
          )
        );
      });
  }
  getAtaMappedByMultiChapterID<T>(
    PublicationID: number,
    ChapterID: string
  ): Observable<T> {
    let endpointUrl = `${
      this._getATAMappingByMultiChapterID
      }/${PublicationID}/${ChapterID}`;

    return this.http
      .get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getAtaMappedByMultiChapterID(PublicationID, ChapterID)
        );
      });
  }
  getAtaMappedByMultiSubChapterID<T>(
    PublicationID: number,
    SubChapterID: string
  ): Observable<T> {
    let endpointUrl = `${
      this._getATAMappingByMultiSubChapterID
      }/${PublicationID}/${SubChapterID}`;

    return this.http
      .get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.getAtaMappedByMultiSubChapterID(PublicationID, SubChapterID)
        );
      });
  }

  deleteitemMasterMappedEndpoint<T>(PublicationItemMasterMappingId: any): Observable<T> {
    return this.http
      .post<T>(
        `${this._deleteItemMasterMappingByID}/${PublicationItemMasterMappingId}`,
        //JSON.stringify(userObject),
     {},
        this.getRequestHeaders()
      )
      .catch(error => {
        return this.handleError(error, () =>
          this.deleteitemMasterMappedEndpoint(PublicationItemMasterMappingId)
        );
      });
  }

  searchgetAirMappedByMultiTypeIDModelIDDashID<T>(
    PublicationID: number
  ): Observable<T> {
    let endpointUrl = `${
      this._searchgetAirMappingByMultiTypeIDModelIDDashID
      }/${PublicationID}`;
    return this.http
      .get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.searchgetAirMappedByMultiTypeIDModelIDDashID(PublicationID)
        );
      });
  }
  searchgetAtaMappedByMultiSubChapterID<T>(
    searchUrl: string,
    PublicationID: number
  ): Observable<T> {
    let endpointUrl = `${
      this._searchgetATAMappingByMultiChapterIDSubID
      }/${PublicationID}?${searchUrl}`;
    return this.http
      .get<T>(endpointUrl, this.getRequestHeaders())
      .catch(error => {
        return this.handleError(error, () =>
          this.searchgetAtaMappedByMultiSubChapterID(searchUrl, PublicationID)
        );
      });
  }

  getpublicationbyIdViewEndpoint<T>(id): Observable<T> {
    return this.http
        .get<T>(`${this._publicationGetByIdViewUrl}/${id}`, this.getRequestHeaders())
        .catch(error => {
            return this.handleError(error, () => this.getpublicationbyIdViewEndpoint(id));
        });
}

getpublicationListEndpoint<T>(pageIndex, pageSize): Observable<T> {
  return this.http
    .get<T>(`${this.getCodeUrl}?pageNumber=${pageIndex}&pageSize=${pageSize}`, this.getRequestHeaders())
    .catch(error => {
      return this.handleError(error, () => this.getpublicationListEndpoint(pageIndex, pageSize));
    });
  }

  getpublicationGlobalSearchEndpoint<T>(ataChapterId, ataSubChapterId, airCraftId, modelId, dashNumberId, pageNumber, pageSize): Observable<T> {
    return this.http
        .get<T>(`${this._publicationGlobalSearchUrl}/?ataChapterId=${ataChapterId}&ataSubChapterId=${ataSubChapterId}&airCraftId=${airCraftId}&modelId=${modelId}&dashNumberId=${dashNumberId}&pageNumber=${pageNumber}&pageSize=${pageSize}`, this.getRequestHeaders())
        .catch(error => {
            return this.handleError(error, () => this.getpublicationGlobalSearchEndpoint(ataChapterId, ataSubChapterId, airCraftId, modelId, dashNumberId, pageNumber, pageSize));
        });
}

getpublicationTypesEndpoint<T>(): Observable<T> {
  return this.http
      .get<T>(`${this._publicationTypes}`, this.getRequestHeaders())
      .catch(error => {
          return this.handleError(error, () => this.getpublicationTypesEndpoint());
      });
}

}
