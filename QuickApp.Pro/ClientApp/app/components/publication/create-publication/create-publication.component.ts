import { Router } from '@angular/router';
import { PublicationService } from '../../../services/publication.service';
import {
  MatDialog,
  throwMatDialogContentAlreadyAttachedError
} from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { MessageSeverity, AlertService } from '../../../services/alert.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { CustomerClassification } from '../../../models/customer-classification.model';
import { HttpClient } from '@angular/common/http';
import { IntegrationService } from '../../../services/integration-service';
import { OnInit, Component } from '@angular/core';
import { ItemMasterService } from '../../../services/itemMaster.service';
import { AtaMainService } from '../../../services/atamain.service';
import { AircraftModelService } from '../../../services/aircraft-model/aircraft-model.service';
import { AircraftManufacturerService } from '../../../services/aircraft-manufacturer/aircraftManufacturer.service';
import { map } from 'rxjs/operator/map';
@Component({
  selector: 'app-create-publication',
  templateUrl: './create-publication.component.html',
  styleUrls: ['./create-publication.component.scss']
})
/** Create-publication component*/
export class CreatePublicationComponent implements OnInit {
  activeMenuItem: number = 1;
  revision: boolean = false;
  currentTab: string = 'General';
  PublicationId: string;
  entryDate: Date;
  pubDescr: string;
  pubType: string;
  uploadedFiles: any[] = [];
  private isSaving: boolean;
  private isEditMode: boolean;
  selectedFile: File = null;
  public sourcePublication: any = {};
  airCraftTypes = [];
  airCraftModels = [];
  dashModels = [];
  aircraftList: any = [];
  showModelAircraftModel: boolean = false;
  partNumberList = [];
  selectedPartNumbers = [];
  pnMapping = [];
  publicationRecordId: Number;
  headersforPNMapping = [
    { field: 'PartNumber', header: 'PN ID/Code' },
    { field: 'PartNumberDescription', header: 'PN Description' },
    { field: 'ItemClassification', header: 'Item Classification' }
  ];
  generalInformationDetails: any = {};
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  types = [
    { label: 'SelectPublication ', value: 'Select publication' },
    { label: 'CMM', value: 'CMM' },
    { label: 'AD', value: 'AD' },
    { label: 'SB', value: 'SB' }
  ];
  atacols = [
    { field: 'ataChapter', header: 'AtaChapter' },
    { field: 'ataSubChapter', header: 'AtaSubChapter' }
  ];
  status = [
    { label: 'Select Status ', value: 'Select Status' },
    { label: 'Active', value: 'Active' },
    { label: 'In-Active', value: 'In-Active' }
  ];
  /** Create-publication ctor */
  constructor(
    private publicationService: PublicationService,
    private alertService: AlertService,
    public ataMainSer: AtaMainService,
    public inteService: IntegrationService,
    private http: HttpClient,
    private aircraftManufacturerService: AircraftManufacturerService,
    private aircraftModelService: AircraftModelService,
    private pubdashNumberService: PublicationService,
    private authService: AuthService,
    private itemMasterService: ItemMasterService,
    private route: Router
  ) {}
  cols: any[] = [
    { field: 'aircraft', header: 'Aircraft' },
    { field: 'model', header: 'Model' },
    { field: 'dashNumber', header: 'Dash Numbers' },
    { field: 'memo', header: 'Memo' }
  ];
  first: number = 0;
  ngOnInit() {}

  get userName(): string {
    return this.authService.currentUser
      ? this.authService.currentUser.userName
      : '';
  }

  changeOfTab(value) {
    if (value === 'General') {
      this.currentTab = 'General';
      this.activeMenuItem = 1;
    } else if (value === 'PnMap') {
      this.currentTab = 'PnMap';
      this.activeMenuItem = 2;
      this.getPartNumberList();
    } else if (value === 'Aircraft') {
      this.currentTab = 'Aircraft';
      this.activeMenuItem = 3;
      this.getAllAircraftTypes();
      this.getAircraftAllList();
    } else if (value === 'Atachapter') {
      this.currentTab = 'Atachapter';
      this.activeMenuItem = 4;
    }
  }
  private saveSuccessHelper(role?: any) {
    this.isSaving = false;
    this.alertService.showMessage(
      'Success',
      `Action was created successfully`,
      MessageSeverity.success
    );

    // this.loadData();
  }
  private saveFailedHelper(error: any) {
    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage(
      'Save Error',
      'The below errors occured whilst saving your changes:',
      MessageSeverity.error,
      error
    );
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);
  }
  onSelect(event) {
    //Execute the actual UPDATES here.
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      //this.fileupload..push(file);
    }
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  postMethod(event) {
    if (this.sourcePublication.docpath != '') {
      let formData = new FormData();
      formData.append('image', this.selectedFile, event.files.name);
      this.http.post('~/upload', formData).subscribe(val => {});
    }
  }
  editItemCloseModel() {
    if (this.sourcePublication.PublicationId != '') {
      this.generalInformationDetails = this.sourcePublication;

      {
        this.sourcePublication.PublicationId = this.sourcePublication.PublicationId;
        this.sourcePublication.masterCompanyId = 1;
        this.publicationService
          .newAction(this.sourcePublication)
          .subscribe(res => {
            const { publicationRecordId } = res;
            this.publicationRecordId = publicationRecordId;
            this.changeOfTab('PnMap'),
              role => this.saveSuccessHelper(role),
              error => this.saveFailedHelper(error);
          });
      }
    }
  }
  private loadCustomerClassifiData() {}
  private onDataLoadClassifiSuccessful(
    getCustomerClassificationList: CustomerClassification[]
  ) {}

  // get All
  getAllAircraftTypes() {
    this.aircraftManufacturerService
      .getAll()
      .subscribe(aircraftManufacturer => {
        this.showModelAircraftModel = false;
        const responseData = aircraftManufacturer[0];
        const typesOfAircraft = responseData.map(x => {
          return {
            value: x.aircraftTypeId,
            label: x.description
          };
        });
        this.airCraftTypes = [
          { label: 'Select Aircraft', value: null },
          ...typesOfAircraft
        ];
      });
  }
  // get PartNumbers
  async getPartNumberList() {
    await this.itemMasterService.getPrtnumberslistList().subscribe(list => {
      const responseData = list[0];

      this.partNumberList = responseData.map(x => {
        return {
          label: x.partNumber,
          value: x
        };
      });
    });
  }
  savePNMapping() {
    console.log(this.publicationRecordId);
    this.pnMapping = this.selectedPartNumbers.map(obj => {
      return {
        PublicationRecordId: this.publicationRecordId,
        PublicationId: this.generalInformationDetails.PublicationId,
        PartNumber: obj.partNumber,
        PartNumberDescription: obj.partDescription,
        ItemMasterId: obj.itemMasterId,
        ItemClassification:
          obj.itemClassification === null ? '-' : obj.itemClassification,
        ItemClassificationId: obj.itemClassificationId,
        ItemGroupId: obj.itemGroupId == null ? 1 : obj.itemGroupId,
        CreatedBy: this.userName,
        UpdatedBy: this.userName,
        MasterCompanyId: obj.masterCompanyId,
        IsActive: true,
          CreatedDate:  '2019-08-12',
          UpdatedDate: '2019-08-12',
      };
    });
    this.selectedPartNumbers = [];
    // PNMapping Save
    this.publicationService
      .postMappedPartNumbers(this.pnMapping)
      .subscribe(res => {
        // this.alertService.startLoadingMessage('PN Mapping', '');
      });
  }

  getPartNumber;

  // get Aircraft Model By Type
  getAircraftModelByType(aircraftTypeId) {
    this.aircraftModelService
      .getAircraftModelListByManufactureId(aircraftTypeId)
      .subscribe(res => {
        this.showModelAircraftModel = true;
        const responseData = res[0];

        this.airCraftModels = responseData.map(x => {
          return {
            value: x.aircraftTypeId,
            label: x.modelName
          };
        });
      });
  }

  getAircraftAllList() {
    this.aircraftManufacturerService
      .getAll()
      .subscribe(
        details => this.onDataLoadSuccessful(details[0]),
        error => this.onDataLoadFailed(error)
      );
  }
  private onDataLoadSuccessful(allACList: any[]) {
    this.alertService.stopLoadingMessage();
    this.aircraftList = allACList;
    console.log(this.aircraftList);
  }
  private onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    //this.loadingIndicator = false;
  }
}
