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
import { DashNumberService } from '../../../services/dash-number/dash-number.service';
import { AtaSubChapter1Service } from '../../../services/atasubchapter1.service';
import { EmployeeService } from '../../../services/employee.service';

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
  generalInformationDetails: any = {};
  airCraftTypesList = [];
  airCraftModels = [];
  dashModels = [];
  aircraftList: any = [];
  showModelAircraftModel: boolean = false;
  partNumberList = [];
  selectedPartNumbers = [];
  pnMappingList = [];
  publicationRecordId: number;
  employeeList = [];
  ataList = [];
  headersforPNMapping = [
    { field: 'PartNumber', header: 'PN ID/Code' },
    { field: 'PartNumberDescription', header: 'PN Description' },
    { field: 'ItemClassification', header: 'Item Classification' }
  ];

  aircraftManufacturerList: { label: string; value: number }[];

  // search function in aircraftInformation
  selectAircraftManfacturer = [];
  aircraftManfacturerIdsUrl: string = '';
  aircraftModelList: any = [];
  selectedAircraftModel = [];
  aircraftModelsIdUrl: string = '';
  dashNumberList: any = [];
  selectedDashNumbers = [];
  dashNumberIdUrl: string = '';
  ataChapterList = [];
  selectedATAchapter = [];
  ataChapterIdUrl: string = '';
  selectedATASubChapter = [];
  ataSubchapterIdUrl: string = '';
  searchParams: string = '';
  ataSubChapterList: { label: string; value: number }[];
  searchATAParams: string = '';
  isDisabledSteps = false;
  // dropdown

  publicationTypes = [
    { label: 'CMM', value: 'CMM' },
    { label: 'AD', value: 'AD' },
    { label: 'SB', value: 'SB' }
  ];

  // table columns for ata

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
    private atasubchapter1service: AtaSubChapter1Service,
    private alertService: AlertService,
    public ataMainSer: AtaMainService,
    public inteService: IntegrationService,
    private http: HttpClient,
    private aircraftManufacturerService: AircraftManufacturerService,
    private aircraftModelService: AircraftModelService,
    private pubdashNumberService: PublicationService,
    private authService: AuthService,
    private itemMasterService: ItemMasterService,
    private Dashnumservice: DashNumberService,
    private employeeService: EmployeeService,
    private route: Router
  ) { }
  aircraftInformationCols: any[] = [
    { field: 'aircraft', header: 'Aircraft' },
    { field: 'model', header: 'Model' },
    { field: 'dashNumber', header: 'Dash Numbers' },
    { field: 'memo', header: 'Memo' }
  ];
  first: number = 0;
  ngOnInit() {
    this.getAllEmployeeList();


  }

  get userName(): string {
    return this.authService.currentUser
      ? this.authService.currentUser.userName
      : '';
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
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
      this.getAllAircraftManufacturer();
      this.getAllAircraftModels();
      this.getAllDashNumbers();
    } else if (value === 'Atachapter') {
      this.currentTab = 'Atachapter';
      this.activeMenuItem = 4;
      this.getAllATAChapter();
      this.getAllSubChapters();
    }

  }




  async getAllEmployeeList() {
    await this.employeeService.getEmployeeList().subscribe(res => {
      const responseData = res[0];
      this.employeeList = responseData.map(x => {
        return {
          label: x.firstName,
          value: x.employeeId
        };
      });
    });
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
      this.http.post('~/upload', formData).subscribe(val => { });
    }
  }
  editItemCloseModel() {

    if (this.sourcePublication.PublicationId != '' && this.publicationRecordId == null) {
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
    } else {
      this.changeOfTab('PnMap');
    }


  }
  private loadCustomerClassifiData() { }
  private onDataLoadClassifiSuccessful(
    getCustomerClassificationList: CustomerClassification[]
  ) { }

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
    const mapData = this.selectedPartNumbers.map(obj => {
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
        CreatedDate: '2019-08-12',
        UpdatedDate: '2019-08-12'
      };
    });
    this.selectedPartNumbers = [];

    // PNMapping Save
    this.publicationService.postMappedPartNumbers(mapData).subscribe(res => {
      this.isDisabledSteps = true;
      this.publicationService
        .getPublicationPNMapping(this.publicationRecordId)
        .subscribe(res => {
          this.pnMappingList = res.map(x => {
            return {
              ...x,
              PartNumber: x.partNumber,
              PartNumberDescription: x.partNumberDescription,
              ItemClassification: x.itemClassification
            };
          });
        });

      this.getAircraftInformationByPublicationId();
      this.getAtaChapterByPublicationId();
      // get aircraft mapped data by publication id
    });
  }

  searchByFieldUrlCreateforAircraftInformation() {


    if (this.selectAircraftManfacturer.length > 0) {
      const aircraftTypeIds = this.selectAircraftManfacturer.reduce(
        (acc, value) => {
          return `${acc},${value}`;
        },
        ''
      );
      this.aircraftManfacturerIdsUrl = aircraftTypeIds.substr(1);
    } else {
      this.aircraftManfacturerIdsUrl = '';
    }
    if (this.selectedAircraftModel.length > 0) {
      const aircraftModelIds = this.selectedAircraftModel.reduce((acc, id) => {
        return `${acc},${id}`;
      }, '');
      this.aircraftModelsIdUrl = aircraftModelIds.substr(1);
    } else {
      this.aircraftModelsIdUrl = '';
    }
    if (this.selectedDashNumbers.length > 0) {
      const dashNumberIds = this.selectedDashNumbers.reduce((acc, id) => {
        return `${acc},${id}`;
      }, '');
      this.dashNumberIdUrl = dashNumberIds.substr(1);
    } else {
      this.dashNumberIdUrl = '';
    }
  }

  // get All
  getAllAircraftManufacturer() {
    this.aircraftManufacturerService
      .getAll()
      .subscribe(aircraftManufacturer => {
        this.showModelAircraftModel = false;
        const responseData = aircraftManufacturer[0];
        this.airCraftTypesList = responseData.map(x => {
          return {
            value: x.aircraftTypeId,
            label: x.description
          };
        });
      });
  }
  // get all Aircraft Models
  getAllAircraftModels() {
    this.aircraftModelService.getAll().subscribe(models => {
      const responseValue = models[0];
      this.aircraftModelList = responseValue.map(models => {
        return {
          label: models.modelName,
          value: models.aircraftModelId
        };
      });
    });
  }


  // get all dashnumber
  getAllDashNumbers() {
    this.Dashnumservice.getAll().subscribe(dashnumbers => {
      const responseData = dashnumbers[0];
      this.dashNumberList = responseData.map(dashnumbers => {
        return {
          label: dashnumbers.dashNumber,
          value: dashnumbers.dashNumberId
        };
      });
    });
  }

  // get aircraft information by publication id

  getAircraftInformationByPublicationId() {
    this.publicationService
      .getAircraftMappedByPublicationId(this.publicationRecordId)
      .subscribe(res => {
        this.aircraftList = res.map(x => {
          return {
            aircraft: x.aircraftType,
            model: x.aircraftModel,
            dashNumber: x.dashNumber,
            memo: x.memo
          };
        });
      });
  }

  // get AircraftModels By manufacturer Type
  async getAircraftModelByManfacturerType() {
    // construct url from array
    await this.searchByFieldUrlCreateforAircraftInformation();
    // reset the dropdowns
    this.selectedAircraftModel = []
    this.selectedDashNumbers = []
    this.aircraftModelList = []
    this.dashNumberList = []
    // checks where multi select is empty or not and calls the service
    if (this.aircraftManfacturerIdsUrl !== '') {
      this.aircraftModelService
        .getAircraftModelListByManufactureId(this.aircraftManfacturerIdsUrl)
        .subscribe(models => {
          const responseValue = models[0];
          this.aircraftModelList = responseValue.map(models => {
            return {
              label: models.modelName,
              value: models.aircraftModelId
            };
          });
        });
    } else {
      this.getAllAircraftModels();
      this.getAllDashNumbers();
    }


  }


  async getDashNumberByManfacturerandModel() {
    // construct url from array
    await this.searchByFieldUrlCreateforAircraftInformation();
    // reset dropdown
    this.selectedDashNumbers = []
    this.dashNumberList = []
    // checks where multi select is empty or not and calls the service

    if (this.aircraftManfacturerIdsUrl !== '' && this.aircraftModelsIdUrl !== '') {
      this.Dashnumservice.getDashNumberByModelTypeId(
        this.aircraftModelsIdUrl,
        this.aircraftManfacturerIdsUrl
      ).subscribe(dashnumbers => {
        const responseData = dashnumbers;
        this.dashNumberList = responseData.map(dashnumbers => {
          return {
            label: dashnumbers.dashNumber,
            value: dashnumbers.dashNumber
          };
        });
      });
    }
  }

  async searchAircraftInformation() {
    await this.searchByFieldUrlCreateforAircraftInformation();

    this.searchParams = '';

    // checks where multi select is empty or not and calls the service
    if (
      this.aircraftManfacturerIdsUrl !== '' &&
      this.aircraftModelsIdUrl !== '' &&
      this.dashNumberIdUrl !== ''
    ) {
      this.searchParams = `aircrafttypeid=${
        this.aircraftManfacturerIdsUrl
        }&aircraftmodelid=${this.aircraftModelsIdUrl}&dashNumberId=${
        this.dashNumberIdUrl
        }`;
    }
    // search only by manfacturer and Model and  publicationId
    else if (
      this.aircraftManfacturerIdsUrl !== '' &&
      this.aircraftModelsIdUrl !== ''
    ) {
      this.searchParams = `aircrafttypeid=${
        this.aircraftManfacturerIdsUrl
        }&aircraftmodelid=${this.aircraftModelsIdUrl}`;
    } else if (this.aircraftManfacturerIdsUrl !== '') {
      this.searchParams = `aircrafttypeid=${this.aircraftManfacturerIdsUrl}`;
    }
    // search only by model and publicationId
    else if (this.aircraftModelsIdUrl !== '') {
      this.searchParams = `aircraftmodelid=${this.aircraftModelsIdUrl}`;
    }
    // search only by dashNumber and publicationId
    else if (this.dashNumberIdUrl !== '') {
      this.searchParams = `&dashNumberId=${this.dashNumberIdUrl}`;
    }
    this.publicationService
      .aircraftInformationSearch(this.searchParams, this.publicationRecordId)
      .subscribe(res => { });
  }

  // get atachapter by publication id

  getAtaChapterByPublicationId() {
    this.publicationService
      .getAtaMappedByPublicationId(this.publicationRecordId)
      .subscribe(res => {
        const responseData = res;
        this.ataList = responseData.map(x => {
          return {
            ataChapter: x.ataChapterName,
            ataSubChapter: x.ataSubChapterDescription,
            ataChapterCode: x.ataChapterCode,
            ataSubChapterId: x.ataSubChapterId,
            ataChapterId: x.ataChapterId
          };
        });
      });
  }

  // ata search by publication id

  searchByFieldUrlCreateforATA() {

    if (this.selectedATAchapter.length > 0) {
      const ataIds = this.selectedATAchapter.reduce((acc, value) => {
        return `${acc},${value}`;
      }, '');
      this.ataChapterIdUrl = ataIds.substr(1);
    } else {
      this.ataChapterIdUrl = '';
    }
    if (this.selectedATASubChapter.length > 0) {
      const ataSubchapterIds = this.selectedATASubChapter.reduce((acc, id) => {
        return `${acc},${id}`;
      }, '');
      this.ataSubchapterIdUrl = ataSubchapterIds.substr(1);
    } else {
      this.ataSubchapterIdUrl = '';
    }
  }

  multiSelectMaxLengthAlert() {
    if (this.selectedAircraftModel.length >= 30) {
      alert('You have Selected Max Number of Models');
    }
    if (this.selectedDashNumbers.length >= 30) {
      alert('You have Selected Max Number of DashNumbers');
    }

  }

  // get ata chapter for dropdown
  getAllATAChapter() {
    this.ataMainSer.getAtaMainList().subscribe(Atachapter => {
      const response = Atachapter[0];
      this.ataChapterList = response.map(x => {
        return {
          value: x.ataChapterId,
          label: x.ataChapterName
        };
      });
    });
  }
  // get all subchapter for dropdown
  getAllSubChapters() {
    this.atasubchapter1service
      .getAtaSubChapter1List()
      .subscribe(atasubchapter => {
        const responseData = atasubchapter[0];
        this.ataSubChapterList = responseData.map(x => {
          return {
            label: x.description,
            value: x.ataSubChapterId
          };
        });
      });
  }

  getSubChapterByATAChapter() {
    this.searchByFieldUrlCreateforATA();

    if (this.ataChapterIdUrl !== '') {
      this.ataMainSer
        .getMultiATASubDesc(this.ataChapterIdUrl)
        .subscribe(atasubchapter => {

          const responseData = atasubchapter;

          this.ataSubChapterList = responseData.map(x => {
            return {
              label: x.description,
              value: x.ataSubChapterId
            };
          });
        });

    } else {
      this.getAllSubChapters();
    }
  }

  async searchATA() {
    await this.searchByFieldUrlCreateforATA();
    this.searchATAParams = '';
    // checks where multi select is empty or not and calls the service
    if (this.ataChapterIdUrl !== '' && this.ataSubchapterIdUrl !== '') {
      this.searchATAParams = `ATAChapterId=${
        this.ataChapterIdUrl
        }&ATASubChapterID=${this.ataSubchapterIdUrl}`;
    }
    else if (this.ataChapterIdUrl !== '') {
      this.searchATAParams = `ATAChapterId=${this.ataChapterIdUrl}`;
    }
    else if (this.ataSubchapterIdUrl !== '') {
      this.searchATAParams = `ATASubChapterID=${this.ataSubchapterIdUrl}`;
    }
    this.publicationService
      .searchgetATAMappedByMultiSubChapterId(
        this.searchATAParams,
        this.publicationRecordId
      )
      .subscribe(res => {

        this.ataList = res.map(x => {
          return {
            ataChapter: x.ataChapterName,
            ataSubChapter: x.ataSubChapterDescription,
            ataChapterCode: x.ataChapterCode,
            ataSubChapterId: x.ataSubChapterId,
            ataChapterId: x.ataChapterId
          };
        });
      });
  }
}
