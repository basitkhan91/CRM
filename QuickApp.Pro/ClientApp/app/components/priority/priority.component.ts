
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
import { PriorityService } from '../../services/priority.service';
import { Priority } from '../../models/priority.model';
import { AuditHistory } from '../../models/audithistory.model';
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { getObjectByValue } from '../../generic/autocomplete';




@Component({
    selector: 'app-priority',
    templateUrl: './priority.component.html',
    styleUrls: ['./priority.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class PriorityComponent implements OnInit, AfterViewInit {
    allpriority: any[]=[];
    selectedreason: any;
    priority_Name: any = "";  
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    totalRecords: number;
    tempPriorityName: any;

   
    ngOnInit(): void {
        this.cols = [
            
            { field: 'description', header: 'Priority Name' },
            { field: 'memo', header: 'Memo' },
            // { field: 'createdBy', header: 'Created By' },
            // { field: 'updatedBy', header: 'Updated By' },
          
        ];
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-priority';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        this.selectedColumns = this.cols;
        this.loadData();
    }
    Active: string = "Active";
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns = ['priorityId' ,'description'];
    //, 'Sequence', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'
    dataSource: MatTableDataSource<Priority>;
    allPriorityInfo: any = [];
    allComapnies: MasterCompany[] = [];
    public auditHisory: AuditHistory[] = [];
    private isSaving: boolean;
    public sourceAction: any;
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    disableSave: boolean = false;
    title: string = "Create";
    id: number;
    errorMessage: any;
    modal: NgbModalRef;
    /** Actions ctor */
    cols: any[];
    selectedColumns: any[];
    priorityName: any = "";
    filteredBrands: any[];
    localCollection: any[] = [];

    selectedColumn: Priority[];
    AuditDetails: SingleScreenAuditDetails[];

    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;

	constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public priorityService: PriorityService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.sourceAction = new Priority();

    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    public allWorkFlows: Priority[] = [];

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.priorityService.getPriorityList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );   
    }

    validateRecordExistsOrNot(field: string, currentInput: any, originalData: any) {
       // console.log(field, currentInput, originalData)
        if ((field !== '' || field !== undefined) && (currentInput !== '' || currentInput !== undefined) && (originalData !== undefined)) {
            const data = originalData.filter(x => {
                return x[field].toLowerCase() === currentInput.toLowerCase()
            })
            return data;
        }
    }
    editValueAssignByCondition(field: any, value: any) {
		console.log(field, value)
		if ((value !== undefined) && (field !== '' || field !== undefined)) {
	
			if (typeof (value) === 'string') {
				return value
			} 
			else {
				return this.getValueFromObjectByKey(field, value)
			}
		}
    }
    getValueFromObjectByKey(field: string, object: any) {
		console.log(field, object)
		if ((field !== '' || field !== undefined) && (object !== undefined)) {
			return object[field];
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
	private onDataLoadSuccessful(getPriorityList: Priority[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getPriorityList;
        this.allPriorityInfo = getPriorityList;
        this.totalRecords= this.allPriorityInfo.length;
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
		this.disableSave = false;
        this.loadMasterCompanies();
		this.sourceAction = new Priority();
        this.sourceAction.isActive = true;
        this.sourceAction.priorityName = "";
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {



            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }


    openDelete(content, row) {

        this.isEditMode = false;
        this.isDeleteMode = true;
        this.priority_Name = row.description;
        this.sourceAction = row;
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openEdit(content, row) {
        console.log(row)
        this.isEditMode = true;
		this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = {...row};
        this.sourceAction.priorityName = getObjectByValue('description',row.description,this.allPriorityInfo)
       
        //this.priorityName = this.sourceAction.description;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openView(content, row) {

        this.sourceAction = row;
        this.priority_Name = row.description;
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


    eventHandler(field, value) {
        value = value.trim();
        const exists = this.validateRecordExistsOrNot(field, value, this.allPriorityInfo);
        console.log(exists);
        if (exists.length > 0) {
            this.disableSave = true;
        }
        else {
            this.disableSave = false;
        }

    }
    priorityId(event) {
        this.disableSave = true;
      
    }
    filterpriorities(event) {
     
        this.localCollection = this.allPriorityInfo;

        if (event.query !== undefined && event.query !== null) {
            const priority = [...this.allPriorityInfo.filter(x => {
                return x.description.toLowerCase().includes(event.query.toLowerCase())
            })]
            this.localCollection = priority;
        }
    }
    openHist(content, row) {

        this.sourceAction = row;

        this.modal = this.modalService.open(content, { size: 'sm' });

        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
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

    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceAction.isActive == false;
            this.priorityService.updatePriority(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive == true;
            this.priorityService.updatePriority(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

    }

    
    editItemAndCloseModel() {
        console.log(this.sourceAction.priorityName)
        console.log(this.sourceAction.memo)
        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.sourceAction.priorityName;
            this.priorityService.newPriority({ ...this.sourceAction, isDelete: this.isDeleteMode }).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {
           
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.priorityName = this.editValueAssignByCondition('description',this.sourceAction.priorityName)
            this.sourceAction.description = this.sourceAction.priorityName;
           // console.log( this.sourceAction.description)
            this.priorityService.updatePriority(this.sourceAction).subscribe(

                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.priorityService.deletePriority(this.sourceAction.priorityId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    private saveCompleted(user?: Priority) {
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

    private saveSuccessHelper(role?: Priority) {
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

    // private getDismissReason(reason: any): string {
    //     if (reason === ModalDismissReasons.ESC) {
    //         return 'by pressing ESC';
    //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //         return 'by clicking on a backdrop';
    //     } else {
    //         return `with: ${reason}`;
    //     }
    // }

    showAuditPopup(template, id): void {
        this.auditPriority(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditPriority(priorityid: number): void {
        this.AuditDetails = [];
        this.priorityService.getPriorityAudit(priorityid).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["priorityAuditId", "priorityId", "masterCompanyId","createdBy", "createdDate", "updatedDate"];
            }
        });
    }
}