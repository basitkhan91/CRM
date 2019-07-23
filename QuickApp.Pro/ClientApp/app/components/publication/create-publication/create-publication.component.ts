import { Router, NavigationExtras } from '@angular/router';
import { PublicationService } from '../../../services/publication.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { fadeInOut } from '../../../services/animations';
import { MasterCompany } from '../../../models/mastercompany.model';
import { AuditHistory } from '../../../models/audithistory.model';
import { AuthService } from '../../../services/auth.service';
import { MessageSeverity, AlertService } from '../../../services/alert.service';
import { ItemMasterService } from '../../../services/itemMaster.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { CustomerClassification } from '../../../models/customer-classification.model';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { GMapModule } from 'primeng/gmap';
import { AddActionsDialogComponent } from '../../dialogs/add-actions-dialog/add-actions-dialog.component';
import { unescapeHtml } from '@angular/platform-browser/src/browser/transfer_state';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { Message } from 'primeng/components/common/message';
import { CustomerClassificationService } from '../../../services/CustomerClassification.service';
import { Integration } from '../../../models/integration.model';
import { IntegrationService } from '../../../services/integration-service';
import { DialogModule } from 'primeng/dialog';
import { timeInterval } from 'rxjs/operator/timeInterval';
import { BaseRowDef } from '@angular/cdk/table';
import { ItemClassificationService } from '../../../services/item-classfication.service';
import { ItemClassificationModel } from '../../../models/item-classification.model';
import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { Itemgroup } from '../../../models/item-group.model';
import { ItemGroupService } from '../../../services/item-group.service';
import { Provision } from '../../../models/provision.model';

import { ProvisionService } from '../../../services/provision.service';
import { ATAMain } from '../../../models/atamain.model';
import { AtaMainService } from '../../../services/atamain.service';
import { Priority } from '../../../models/priority.model';
import { PriorityService } from '../../../services/priority.service';
import { Currency } from '../../../models/currency.model';
import { CurrencyService } from '../../../services/currency.service';
import { UnitOfMeasureService } from '../../../services/unitofmeasure.service';
import { UnitOfMeasure } from '../../../models/unitofmeasure.model';

import { CalendarModule } from 'primeng/calendar';
import { ATAChapter } from '../../../models/atachapter.model';
import { GlAccount } from '../../../models/GlAccount.model';
import { GlAccountService } from '../../../services/glAccount/glAccount.service';
@Component({
  selector: "app-create-publication",
  templateUrl: "./create-publication.component.html",
  styleUrls: ["./create-publication.component.scss"]
})
/** Create-publication component*/
export class CreatePublicationComponent {
  activeMenuItem: number = 1;
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

    onFileChanged(event) {
        this.selectedFile = event.target.files[0]
    }

    onUpload() {
        const uploadData = new FormData();
        uploadData.append('image', this.selectedFile, this.selectedFile.name);
        this.http.post('/upload', uploadData).subscribe(event => {
                console.log(event); // handle event here
            });
    }
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
    constructor(private router: Router, private publicationService: PublicationService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public ataMainSer: AtaMainService, public inteService: IntegrationService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private http: HttpClient)
    {

    }

  changeOfTab(value) {
    if (value === "General") {
      this.currentTab = "General";
      this.activeMenuItem = 1;
    } else if (value === "Aircraft") {
      this.currentTab = "Aircraft";
      this.activeMenuItem = 2;
    }
    }
    private saveSuccessHelper(role?: any) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

       // this.loadData();

    }
    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
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
   
    postMethod(event) {
        if (this.sourcePublication.docpath != "") {
            let formData = new FormData();
            formData.append('image', this.selectedFile, event.files.name);
            this.http.post('~/upload', formData).subscribe((val) => {
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
                this.publicationService.newAction(this.sourcePublication).subscribe(
                    role => this.saveSuccessHelper(role),
                    error => this.saveFailedHelper(error));
           
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
    private onDataLoadClassifiSuccessful(getCustomerClassificationList: CustomerClassification[]) {
        //this.alertService.stopLoadingMessage();
        //this.loadingIndicator = false;
        //this.dataSource.data = getCustomerClassificationList;

        //this.allcustomerclassificationInfo = getCustomerClassificationList;
    }
}
