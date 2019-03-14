import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { AtaMainService } from '../../services/atamain.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { ATAMain } from '../../models/atamain.model';
import { AuditHistory } from '../../models/audithistory.model';
import { AuthService } from '../../services/auth.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { ATAChapter } from '../../models/atachapter.model';


@Component({
    selector: 'app-ata-main',
    templateUrl: './ata-main.component.html',
    styleUrls: ['./ata-main.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class AtaMainComponent implements OnInit, AfterViewInit {
    selectedActionName: any;
    disableSave: boolean;
    actionamecolle: any[]=[];
    ataChapter_Name: any = "";
    ataChapterCategory = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    capabilityNamecolle: any[]=[];


    ngOnInit(): void {
		this.loadData();
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-ata-main';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

	displayedColumns = ['ataChapterId','ataChapterCode', 'ataChapterName', 'ataChapterCategory', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
	dataSource: MatTableDataSource<ATAChapter>;
	allATAMaininfo: any[];
    allComapnies: MasterCompany[] = [];
	private isSaving: boolean;
	public sourceAction: any;
    public auditHisory: AuditHistory[] = [];
    private bodyText: string;
    loadingIndicator: boolean;
	closeResult: string;
	selectedColumn: any[];
    selectedColumns: any[];
    cols: any[];
    title: string = "Create";
    id: number;
    errorMessage: any;
    modal: NgbModalRef;
	ataChapterName: string;
	ataChapterCode: any;
    filteredBrands: any[];
    localCollection: any[] = [];
    /** Actions ctor */

    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    Active: string = "Active";
	constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public ataMainService : AtaMainService,  private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
		this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
		this.sourceAction = new ATAChapter();

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
	public allWorkFlows: ATAChapter[] = [];

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.ataMainService.getAtaMainList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.cols = [
            //{ field: 'ataMainId', header: 'ATAMain Id' },
            { field: 'ataChapterName', header: 'ATA Chapter Name' }, 
            { field: 'ataChapterCategory', header: 'ATA Chapter Category' },
            { field: 'memo', header: 'Memo' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
            //{ field: 'updatedDate', header: 'Updated Date' },
            //{ field: 'createdDate', header: 'createdDate' }
        ];

        this.selectedColumns = this.cols;

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
	private onDataLoadSuccessful(getAtaMainList: ATAChapter[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
       // this.dataSource.data = getAtaMainList;
        this.allATAMaininfo = getAtaMainList;
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
    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceAction.isActive == false;
            this.ataMainService.updateATAMain(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive == true;
            this.ataMainService.updateATAMain(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

    }

    open(content) {

        this.isEditMode = false;
		this.isDeleteMode = false;
		this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
		this.sourceAction = new ATAChapter();
		this.sourceAction.isActive = true;
		this.ataChapterName = "";
		this.ataChapterCode = "";
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

    openEdit(content, row) {

        this.isEditMode = true;

		this.isSaving = true;
		this.disableSave = false;
        this.loadMasterCompanies();
        this.sourceAction = row;
		this.ataChapterName = this.sourceAction.ataChapterName;
		this.ataChapterCode = this.sourceAction.ataChapterCode;
		this.ataChapterCategory = this.sourceAction.ataChapterCategory;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openView(content, row) {

        this.sourceAction = row;
		this.ataChapter_Name = row.ataChapterName;
		this.ataChapterCode = row.ataChapterCode;
        this.ataChapterCategory = row.ataChapterCategory;
        this.memo = row.memo;
        this.createdBy = row.createdBy;
        this.updatedBy = row.updatedBy;
        this.createdDate = row.createdDate;
        this.updatedDate = row.updatedDate;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    openHelpText(content) {
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }



    openHist(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;


        this.sourceAction = row;



        //this.isSaving = true;
		// debugger;
		this.ataMainService.historyATAMain(this.sourceAction.ataCahpterId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));


    }


    editItemAndCloseModel() {

        // debugger;

        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
              this.sourceAction.masterCompanyId= 1;
			this.sourceAction.ataChapterName = this.ataChapterName;
			//this.sourceAction.ataChapterCode = this.ataChapterCode;
            this.ataMainService.newATAMain(this.sourceAction).subscribe(
                //role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {

            this.sourceAction.updatedBy = this.userName;
			this.sourceAction.ataChapterName = this.ataChapterName;
			//this.sourceAction.ataChapterCode = this.ataChapterCode;
              this.sourceAction.masterCompanyId= 1;
            this.ataMainService.updateATAMain(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
		this.sourceAction.updatedBy = this.userName;
		this.ataMainService.deleteATAMain(this.sourceAction.ataChapterId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }
    eventHandler(event) {
        let value = event.target.value.toLowerCase();
        if (this.selectedActionName) {
            if (value == this.selectedActionName.toLowerCase()) {
                //alert("Action Name already Exists");
                this.disableSave = true;
            }
            else {
                this.disableSave = false;
            }
        }

    }
    partnmId(event) {
    //    for (let i = 0; i < this.actionamecolle.length; i++) {
    //        if (event == this.actionamecolle[i][0].ataChapterName) {
    //            this.disableSave = true;
    //            this.selectedActionName = event;
    //        }
    //    }
    //}
		if (this.allATAMaininfo) {

			for (let i = 0; i < this.allATAMaininfo.length; i++) {
				if (event == this.allATAMaininfo[i].capabilityName) {
					this.sourceAction.ataChapterName = this.allATAMaininfo[i].ataChapterName;
					this.disableSave = true;

					this.selectedActionName = event;
				}

			}
		}
	}
    filterAtamains(event) {

   //     this.localCollection = [];
   //     for (let i = 0; i < this.allATAMaininfo.length; i++) {
			//let ataChapterName = this.allATAMaininfo[i].ataChapterName;
   //         if (ataChapterName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
			//	this.allATAMaininfo.push([{
			//		"ataChapterId": this.allATAMaininfo[i].ataChapterId,
   //                 "ataChapterName": ataChapterName
   //             }]),
   //             this.localCollection.push(ataChapterName);
   //         }
   //     }
		this.localCollection = [];
		for (let i = 0; i < this.allATAMaininfo.length; i++) {
			let ataChapterName = this.allATAMaininfo[i].ataChapterName;
			if (ataChapterName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.capabilityNamecolle.push([{
					"ataChapterId": this.allATAMaininfo[i].ataChapterId,
					"ataChapterName": ataChapterName
				}]),
					this.localCollection.push(ataChapterName)

			}
		}
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    private saveCompleted(user?: ATAMain) {
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

    private saveSuccessHelper(role?: ATAMain) {
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
}