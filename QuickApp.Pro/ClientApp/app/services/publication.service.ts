// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';

import { PublicationEndpointService } from './publication-endpoint.service';
import { Publication } from '../models/publication.model';
import { AuditHistory } from '../models/audithistory.model';

export type RolesChangedOperation = 'add' | 'delete' | 'modify';
export type RolesChangedEventArg = {
  roles: Role[] | string[];
  operation: RolesChangedOperation;
};

@Injectable()
export class PublicationService {
  public static readonly roleAddedOperation: RolesChangedOperation = 'add';
  public static readonly roleDeletedOperation: RolesChangedOperation = 'delete';
  public static readonly roleModifiedOperation: RolesChangedOperation =
    'modify';

  private _rolesChanged = new Subject<RolesChangedEventArg>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private publicationEndpoint: PublicationEndpointService
  ) {}

  getWorkFlows() {
    return Observable.forkJoin(
      this.publicationEndpoint.getpublicationEndpoint<Publication[]>()
    );
  }

  getAllPublications() {
    return Observable.forkJoin(
      this.publicationEndpoint.getpublicationEndpoint<Publication[]>()
    );
  }
    getAllbyIdPublications(id) {
        return Observable.forkJoin(
            this.publicationEndpoint.getpublicationbyIdEndpoint<any>(id)
        );
    }
  newAction(action) {
    return this.publicationEndpoint.getNewpublicationEndpoint<any>(
      action
    );
  }

  getAction(actionId?: any) {
    return this.publicationEndpoint.getEditActionEndpoint<Publication>(
      actionId
    );
  }

  updateAction(file: any) {
    return this.publicationEndpoint.getUpdateActionEndpoint<any>(
      file
    );
  }

  deleteAcion(actionId: any) {
    return this.publicationEndpoint.getDeleteActionEndpoint(actionId);
    }

    publicationStatus(publicationRecordId: number, status: boolean, updatedBy: string) {
        return this.publicationEndpoint.publicationStatusEndpoint(publicationRecordId, status, updatedBy);
    }

  historyAcion(actionId: number) {
    return Observable.forkJoin(
      this.publicationEndpoint.getHistoryActionEndpoin<AuditHistory[]>(actionId)
    );
  }

  getPublicationAudit(publicationId: number) {
    return this.publicationEndpoint.getPublincationAuditById<any>(
      publicationId
    );
  }

  newPNACMappingAction(action: Publication) {
    return this.publicationEndpoint.postPNACMapping<Publication>(action);
  }
  newPNATAMappingAction(action: Publication) {
    return this.publicationEndpoint.postPNATAMapping<Publication>(action);
  }
  getPublicationPNMapping(PNid: number) {
    return this.publicationEndpoint.getPubPNById<any>(PNid);
  }
  // Save Part Number Mapping
  postMappedPartNumbers(actionData) {
    return this.publicationEndpoint.postPartNumberMappedData(actionData);
  }
  aircraftInformationSearch(searchUrl, publicationId) {
    return this.publicationEndpoint.getAircraftInformationBySearch(
      searchUrl,
      publicationId
    );
  }
  getAircraftMappedByPublicationId(PublicationID: number) {
    return this.publicationEndpoint.getAirMappedByPubId<any>(PublicationID);
  }
  getAtaMappedByPublicationId(PublicationID: number) {
    return this.publicationEndpoint.getAtaMappedByPubId<any>(PublicationID);
  }
  getAirMappedByMultiTypeId(PublicationID: number, AircraftTypeID: string) {
    return this.publicationEndpoint.getAirMappedByMultiTypeId<any>(
      PublicationID,
      AircraftTypeID
    );
  }
  getAirMappedByMultiModelId(PublicationID: number, AircraftModelID: string) {
    return this.publicationEndpoint.getAtaMappedByMultiModelId<any>(
      PublicationID,
      AircraftModelID
    );
  }
  getAirMappedByMultiDashId(PublicationID: number, DashNumberId: string) {
    return this.publicationEndpoint.getAtaMappedByMultiDashId<any>(
      PublicationID,
      DashNumberId
    );
  }
  getAirMappedByMultiTypeIdModelID(
    PublicationID: number,
    AircraftTypeID: string,
    AircraftModelID: string
  ) {
    return this.publicationEndpoint.getAtaMappedByMultiTypeIDModelID<any>(
      PublicationID,
      AircraftTypeID,
      AircraftModelID
    );
  }

  getAirMappedByMultiTypeIdModelIDDashID(
    PublicationID: number,
    AircraftTypeID: string,
    AircraftModelID: string,
    DashNumberId: string
  ) {
    return this.publicationEndpoint.getAtaMappedByMultiTypeIDModelIDDashID<any>(
      PublicationID,
      AircraftTypeID,
      AircraftModelID,
      DashNumberId
    );
  }
  getATAMappedByMultiChapterIdSubChapterID(
    PublicationID: number,
    ChapterId: string,
    SubChapterId: string
  ) {
    return this.publicationEndpoint.getAtaMappedByMultiATAIDSubChapterID<any>(
      PublicationID,
      ChapterId,
      SubChapterId
    );
  }
  getATAMappedByMultiChapterId(PublicationID: number, ChapterId: string) {
    return this.publicationEndpoint.getAtaMappedByMultiChapterID<any>(
      PublicationID,
      ChapterId
    );
  }
  getATAMappedByMultiSubChapterId(PublicationID: number, SubChapterId: string) {
    return this.publicationEndpoint.getAtaMappedByMultiSubChapterID<any>(
      PublicationID,
      SubChapterId
    );
  }
  deleteItemMasterMapping(PublicationItemMasterMappingId: number) {
    return this.publicationEndpoint.deleteitemMasterMappedEndpoint<any>(
      PublicationItemMasterMappingId
    );
  }
  searchgetAirMappedByMultiTypeIdModelIDDashID(PublicationID: number) {
    return this.publicationEndpoint.searchgetAirMappedByMultiTypeIDModelIDDashID<any>(PublicationID);
  }
  searchgetATAMappedByMultiSubChapterId(
    searchUrl: string,
    PublicationID: number
  ) {
    return this.publicationEndpoint.searchgetAtaMappedByMultiSubChapterID<any>(
      searchUrl,
      PublicationID
    );
  }
}
