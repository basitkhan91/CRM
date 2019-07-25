﻿import { Router } from "@angular/router";
import { PublicationService } from "../../../services/publication.service";
import {
  MatDialog,
  throwMatDialogContentAlreadyAttachedError
} from "@angular/material";
import { FormBuilder } from "@angular/forms";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { AuthService } from "../../../services/auth.service";
import { MessageSeverity, AlertService } from "../../../services/alert.service";

import { MasterComapnyService } from "../../../services/mastercompany.service";
import { CustomerClassification } from "../../../models/customer-classification.model";
import { HttpClient } from "@angular/common/http";

import { IntegrationService } from "../../../services/integration-service";

import { OnInit, Component } from "@angular/core";

import { AtaMainService } from "../../../services/atamain.service";
import { AircraftModelService } from "../../../services/aircraft-model/aircraft-model.service";
import { AircraftManufacturerService } from "../../../services/aircraft-manufacturer/aircraftManufacturer.service";
@Component({
  selector: "app-create-publication",
  templateUrl: "./create-publication.component.html",
  styleUrls: ["./create-publication.component.scss"]
})
/** Create-publication component*/
export class CreatePublicationComponent implements OnInit {
  activeMenuItem: number = 1;
  revision: boolean = false;
  currentTab: string = "General";
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
  aircraftList: any = [];
  showModelAircraftModel: boolean = false;

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  // onUpload() {
  //   const uploadData = new FormData();
  //   uploadData.append("image", this.selectedFile, this.selectedFile.name);
  //   this.http.post("/upload", uploadData).subscribe(event => {
  //     console.log(event); // handle event here
  //   });
  // }
  types = [
    { label: "SelectPublication ", value: "Select publication" },
    { label: "CMM", value: "CMM" },
    { label: "AD", value: "AD" },
    { label: "SB", value: "SB" }
  ];
  status = [
    { label: "Select Status ", value: "Select Status" },
    { label: "Active", value: "Active" },
    { label: "In-Active", value: "In-Active" }
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
    private route: Router
  ) {}

  cols: any[];
  first: number = 0;
  ngOnInit() {
    this.cols = [
      // { field: "id", header: "ID" },
      { field: "aircraft", header: "Aircraft" },
      { field: "model", header: "Model" },
      { field: "dashNumber", header: "Dash Numbers" },
      { field: "memo", header: "Memo" }
      // { field: "actions", header: "Actions" }
    ];
  }

  changeOfTab(value) {
    if (value === "General") {
      this.currentTab = "General";
      this.activeMenuItem = 1;
    } else if (value === "Aircraft") {
      this.currentTab = "Aircraft";
      this.activeMenuItem = 2;
      this.getAllAircraftTypes();
      this.getAircraftAllList();
    } else if (value === "Atachapter") {
      this.currentTab = "Atachapter";
      this.activeMenuItem = 3;
    }
  }
  private saveSuccessHelper(role?: any) {
    this.isSaving = false;
    this.alertService.showMessage(
      "Success",
      `Action was created successfully`,
      MessageSeverity.success
    );

    // this.loadData();
  }
  private saveFailedHelper(error: any) {
    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage(
      "Save Error",
      "The below errors occured whilst saving your changes:",
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
    //this.hasFile = true;
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  postMethod(event) {
    console.log(event);
    if (this.sourcePublication.docpath != "") {
      let formData = new FormData();
      formData.append("image", this.selectedFile, event.files.name);
      this.http.post("~/upload", formData).subscribe(val => {
        console.log(val);
      });
    }
  }
  editItemCloseModel() {
    if (this.sourcePublication.PublicationId != "") {
      //this.isSaving = true;
      //if (this.isEditMode == false)
      {
        //this.sourcePublication.createdBy = this.userName;
        //this.sourcePublication.updatedBy = this.userName;
        this.sourcePublication.PublicationId = this.sourcePublication.PublicationId;
        this.sourcePublication.masterCompanyId = 1;
        this.publicationService
          .newAction(this.sourcePublication)
          .subscribe(
            role => this.saveSuccessHelper(role),
            error => this.saveFailedHelper(error)
          );
      }
      //this.publicationService.newAction(this.sourcePublication).subscribe(data => {
      //    if (data)
      //    {
      //        this.sourcePublication.PublicationId = data.publicationId;
      //        this.sourcePublication.pubDescr = data.description
      //        this.sourcePublication.entryDate = data.entryDate;
      //        this.sourcePublication.pubType = data.pubType;
      //        this.sourcePublication.pubType = data.pubType;

      //    }
      //    //this.loadCustomerClassifiData();
      //    this.changeOfTab('Aircraft');
      //})
    }
    // else {

    //this.sourceClassification.updatedBy = this.userName;
    //this.sourceClassification.description = this.classificationName;
    //this.sourceClassification.masterCompanyId = 1;
    //this.customerClassificationService.updatecustomerclass(this.sourceClassification).subscribe(
    //    response => this.saveCompleted(this.sourceClassification),
    //    error => this.saveFailedHelper(error));
    // }

    //this.displayCustomerClassification = false;
    //this.customerClassificationError = false;
    //this.modal.close();
    // }
  }
  private loadCustomerClassifiData() {
    //this.alertService.startLoadingMessage();
    //this.loadingIndicator = true;
    //this.customerClassificationService.getCustomerClassificationList().subscribe(
    //    results => this.onDataLoadClassifiSuccessful(results[0]),
    //    error => this.onDataLoadFailed(error)
    //);
  }
  private onDataLoadClassifiSuccessful(
    getCustomerClassificationList: CustomerClassification[]
  ) {
    //this.alertService.stopLoadingMessage();
    //this.loadingIndicator = false;
    //this.dataSource.data = getCustomerClassificationList;
    //this.allcustomerclassificationInfo = getCustomerClassificationList;
  }

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
          { label: "Select Aircraft", value: null },
          ...typesOfAircraft
        ];
      });
  }
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
    this.aircraftModelService.getAll().subscribe(details => {
      console.log(details);
      const responseData = details[0].map(x => {
        return {
          aircraft: x.aircraftType.description,
          model: x.modelName,
          dashNumber: "",
          memo: x.memo
        };
      });
      this.aircraftList = responseData;
      console.log(this.aircraftList);
      console.log(responseData);
    });
  }
}
