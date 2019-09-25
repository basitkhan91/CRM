import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../../services/publication.service';
import { AuditHistory } from '../../models/audithistory.model';
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { zip } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { getObjectById, getValueFromArrayOfObjectById } from '../../generic/autocomplete';
import { EmployeeService } from '../../services/employee.service';

@Component({
    selector: 'app-publication',
    templateUrl: './publication.component.html',
    styleUrls: ['./publication.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class PublicationComponent implements OnInit, AfterViewInit {
    allpublic: any[] = [];
    selectedreason: any;
    publication_Name: any = "";
    description: any = "";
    partNumber: any = "";
    model: any = "";
    ataMain: any = "";
    ataSubChapter: any = "";
    ataPositionZone: any = "";
    platform: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    disableSave: boolean = false;
    allEmployeeinfo: any[] = [];

    AuditDetails: SingleScreenAuditDetails[];
    auditHisory: AuditHistory[];
    Active: string = "Active";
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns = ['PublicationId', 'PartNumber', 'description'];
    //, 'Sequence', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'
    dataSource: MatTableDataSource<Publication>;
    allpublicationInfo: any = [];
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    public sourceAction: Publication;
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    selectedColumn: Publication[];
    title: string = "Create";
    id: number;
    errorMessage: any;
    modal: NgbModalRef;
    /** Actions ctor */
    cols: any[];
    selectedColumns: any[];

    publicationName: string;
    filteredBrands: any[];
    localCollection: any[] = [];
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    generalInfo: any;
    pageIndex: number;
    pnMappingList = [];
    aircraftList: any = [];
    ataList = [];
    headersforPNMapping = [
        { field: 'PartNumber', header: 'PN ID/Code' },
        { field: 'PartNumberDescription', header: 'PN Description' },
        { field: 'ItemClassification', header: 'Item Classification' }
    ];
    aircraftInformationCols: any[] = [
        { field: 'aircraft', header: 'Aircraft' },
        { field: 'model', header: 'Model' },
        { field: 'dashNumber', header: 'Dash Numbers' },
        { field: 'memo', header: 'Memo' }
      ];
    atacols = [
    { field: 'ataChapter', header: 'AtaChapter' },
    { field: 'ataSubChapter', header: 'AtaSubChapter' }
    ];
    

    first: number = 0;
    pagesize: number;

    constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: PublicationService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private router: Router, public employeeService: EmployeeService, private publicationService: PublicationService
    ) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.sourceAction = new Publication();

    }
    ngOnInit(): void {
        this.loadData();
        this.employeedata();

        this.cols = [
            { field: 'publicationId', header: 'Publication ID' },
            { field: 'description', header: 'Description' },
            { field: 'publicationType', header: 'Publication Type' },
            { field: 'publishby', header: 'Published By' },
            { field: 'employeeName', header: 'Employee' },
            { field: 'location', header: 'Location' },
            //{ field: 'aircraftModel', header: 'Aircraft Model' },
            //{ field: 'aircraftType', header: 'Aircraft Type' },
            //{ field: 'ataChapterName', header: 'ATAChapter Name' },
            //{ field: 'ataSubChapterDescription', header: 'ATA SubChapter' },
            //{ field: 'memo', header: 'Memo' },
            //{ field: 'createdBy', header: 'Created By' },
            //{ field: 'updatedBy', header: 'Updated By' },

        ];
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-publication';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        this.selectedColumns = this.cols;

        
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    public allWorkFlows: Publication[] = [];

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0]['paginationList']),
            error => this.onDataLoadFailed(error)
        );

    }


    eventHandler(event) {
        let value = event.target.value.toLowerCase()
        if (this.selectedreason) {
            if (value == this.selectedreason.toLowerCase()) {
                this.disableSave = true;
            }
            else {
                this.disableSave = false;
            }
        }
    }


    publicationId(event) {
        for (let i = 0; i < this.allpublic.length; i++) {
            if (event == this.allpublic[i][0].publicationName) {

                this.disableSave = true;
                this.selectedreason = event;
            }




        }
    }


    private loadMasterCompanies() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.masterComapnyService.getMasterCompanies().subscribe(
            results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue;
    }

    private refresh() {
        // Causes the filter to refresh there by updating with recently added data.
        this.applyFilter(this.dataSource.filter);
    }




    private onDataLoadSuccessful(allWorkFlows) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allpublicationInfo = allWorkFlows.map(x => {
            return {
                ...x,
                //employee: getValueFromArrayOfObjectById('firstName', 'employeeId', x.employee, this.allEmployeeinfo),
            }
        });
        console.log(this.allpublicationInfo)



        // allWorkFlows.map(x => {
        //     return {
        //         publicationRecordId: x.publicationRecordId,
        //         publicationId: x.publicationId,
        //         memo: x.memo == null ? '-' : x.memo,
        //         description: x.description == '' ? '-' : x.description,
        //         companyName: x.masterCompany.companyName,
        //         emailAddress: x.masterCompany.emailAddress,
        //         ataSubChapterDescription: x.ataSubChapterDescription,
        //         aircraftType : x.aircraftType ,

        //         createdBy: x.createdBy,
        //         updatedBy: x.updatedBy
        //     }
        // });

    }

    private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allComapnies = allComapnies;

    }

    private onDataLoadFailed(error: any) {
        // alert(error);
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

    }

    open(content) {

        this.isEditMode = false;
        this.isDeleteMode = false;

        this.isSaving = true;
        this.loadMasterCompanies();
        this.disableSave = false;
        this.sourceAction = new Publication();
        this.sourceAction.isActive = true;
        this.publicationName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceAction = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    openView(content, row) {
        console.log(row)
        this.generalInfo = row;
        this.sourceAction = row;
        this.publication_Name = row.publicationId;
        this.description = row.description;
        this.partNumber = row.partNumber;
        this.model = row.model;
        this.ataMain = row.ataMain;
        this.ataSubChapter = row.ataSubChapter;
        this.ataPositionZone = row.ataPositionZone;
        this.platform = row.platform;
        this.memo = row.memo;
        this.createdBy = row.createdBy;
        this.updatedBy = row.updatedBy;
        this.createdDate = row.createdDate;
        this.updatedDate = row.updatedDate;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'lg' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })

        //get PN Mapping info
        this.publicationService.getPublicationPNMapping(row.publicationRecordId)
        .subscribe(res => {
            console.log(res);
          this.pnMappingList = res.map(x => {
            return {
              ...x,
              PartNumber: x.partNumber,
              PartNumberDescription: x.partNumberDescription,
              ItemClassification: x.itemClassification
            };
          });
        });

        //get aircraft info
        this.publicationService
      .getAircraftMappedByPublicationId(row.publicationRecordId)
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

      // get ata chapter info
      this.publicationService
      .getAtaMappedByPublicationId(row.publicationRecordId)
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
    openHelpText(content) {
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openEdit(content, row) {
        const { publicationRecordId } = row;

        // this.router.navigateByUrl(`/singlepages/singlepages/app-publication/app-create-publication/edit/${publicationRecordId}`);




        this.disableSave = false;
        this.isEditMode = true;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = row;
        console.log(this.sourceAction);
        this.publicationName = this.sourceAction.publicationId;
        this.loadMasterCompanies();
        this.router.navigateByUrl(`/singlepages/singlepages/app-create-publication/edit/${publicationRecordId}`);
        // this.modal = this.modalService.open(content, { size: 'sm' });
        // this.modal.result.then(() => {
        //     console.log('When user closes');
        // }, () => { console.log('Backdrop click') })
    }


    filterpublications(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allpublicationInfo.length; i++) {
            let publicationName = this.allpublicationInfo[i].publicationId;
            if (publicationName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.allpublic.push([{
                    "publicationId": this.allpublicationInfo[i].publicationId,
                    "publicationName": publicationName
                }]),
                    this.localCollection.push(publicationName);
            }
        }
    }

    openHist(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;


        this.sourceAction = row;



        //this.isSaving = true;
        // debugger;
        this.workFlowtService.historyAcion(this.sourceAction.publicationRecordId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));


    }
    private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {

        // debugger;
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.auditHisory = auditHistory;


        this.modal = this.modalService.open(content, { size: 'lg' });

        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })


    }

    editItemAndCloseModel() {

        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.publicationId = this.publicationName;
            this.sourceAction.masterCompanyId = 1;
            this.workFlowtService.newAction(this.sourceAction).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.publicationId = this.publicationName;
            // this.workFlowtService.updateAction(this.sourceAction).subscribe(
            //     response => this.saveCompleted(this.sourceAction),
            //     error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.workFlowtService.deleteAcion(this.sourceAction.publicationRecordId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    private saveCompleted(user?: Publication) {
        this.isSaving = false;

        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

        }

        this.loadData();
    }

    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceAction.isActive == false;
            // this.workFlowtService.updateAction(this.sourceAction).subscribe(
            //     response => this.saveCompleted(this.sourceAction),
            //     error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive == true;
            // this.workFlowtService.updateAction(this.sourceAction).subscribe(
            //     response => this.saveCompleted(this.sourceAction),
            //     error => this.saveFailedHelper(error));
            //alert(e);
        }

    }


    private saveSuccessHelper(role?: Publication) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

        this.loadData();

    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    showAuditPopup(template, id): void {
        this.auditAssetStatus(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditAssetStatus(publicationId: number): void {
        this.AuditDetails = [];
        this.workFlowtService.getPublicationAudit(publicationId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["publicationAuditId", "publicationRecordId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }

    private employeedata() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.employeeService.getEmployeeList().subscribe(
			results => { console.log(results), this.onempDataLoadSuccessful(results[0]) },
			error => this.onDataLoadFailed(error)
		);
    }
    
    private onempDataLoadSuccessful(getEmployeeCerficationList: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		//this.dataSource.data = getEmployeeCerficationList;
		this.allEmployeeinfo = getEmployeeCerficationList;
    }
    
    // publicationPagination(event: { first: any; rows: number }) {
    //     const pageIndex = parseInt(event.first) / event.rows;
    //     this.pageIndex = pageIndex;
    //     this.pagesize = 10;
    //     //this.pageSizeForInternationalShipVia = this.pageSizeForInternationalShipVia;
    // }
}