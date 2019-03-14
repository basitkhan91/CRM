import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { ActionService } from '../../services/action.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { ActionAttribute } from '../../models/actionattribute.model';
import { AuthService } from '../../services/auth.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';
import { ActionAttributeService } from '../../services/actionattribute.service';
import { DataTableModule } from 'primeng/datatable';
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { SelectButtonModule } from 'primeng/selectbutton'
import { InputTextModule } from 'primeng/inputtext'
import { MultiSelectModule } from 'primeng/multiselect'
import { Action } from 'rxjs/scheduler/Action';
import { AuditHistory } from '../../models/audithistory.model';
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
@Component({
    selector: 'app-action-attributes',
    templateUrl: './action-attributes.component.html',
    styleUrls: ['./action-attributes.component.scss'],
    animations: [fadeInOut]
})
/** ActionsAttribute component*/
export class ActionAttributesComponent implements OnInit, AfterViewInit {
	sourceView: any = {};
    disableSave: boolean;
    selectedActionName: any;
    actionamecolle: any[]=[];
    auditHisory: any[];
   
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    cols: any[];
    selectedColumns: any[];
    displayedColumns = ['actionattributeid', 'description', 'createdDate','companyName'];
    dataSource: MatTableDataSource<ActionAttribute>;
    allActionAttribute: ActionAttribute[] = [];
    allComapnies: MasterCompany[] = [];
    private isSaving: boolean;
    public sourceAction: ActionAttribute;
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    title: string = "Create";
    id: number;
    errorMessage: any;
    modal: NgbModalRef;
    /** Actions ctor */
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    actionAttributeName: string;
    filteredBrands: any[];
    localCollection: any[] = [];
    selectedColumn: ActionAttribute[];
    Active: string = "Active";
    description: any;
    memo: any;
    updatedBy: any;
    createdBy: any;
    updatedDate: any;
	constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: ActionAttributeService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.sourceAction = new ActionAttribute();

    }
    ngOnInit(): void {
        
        this.loadData();
        this.cols = [
            //{ field: 'actionAttributeId', header: 'ACID' },
			{ field: 'description', header: 'Action Attribute Name' },
			{ field: 'memo', header: 'Memo' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
            //{ field: 'createdDate', header: 'Created Date' },
            //{ field: 'updatedDate', header: 'Updated Date' }
          
        
		];
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-action-attributes';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        this.selectedColumns = this.cols;
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    public allWorkFlows: ActionAttribute[] = [];
    private loadData() {
       this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.workFlowtService.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
       );
    }


    private loadMasterCompanies() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.masterComapnyService.getMasterCompanies().subscribe(
            results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

	}
	openView(content, row) {

		this.sourceView = row;
		
		this.loadMasterCompanies();
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue;
    }

    private refresh() {
        // Causes the filter to refresh there by updating with recently added data.
        this.applyFilter(this.dataSource.filter);
	}

    private onDataLoadSuccessful(allWorkFlows: ActionAttribute[]) {
       
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allActionAttribute = allWorkFlows;
       
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
        this.disableSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = new ActionAttribute();
        this.actionAttributeName = "";
		this.sourceAction.isActive = true;
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
        this.actionAttributeName = this.sourceAction.description;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openHist(content, row) {

        this.sourceAction = row;
           
        this.workFlowtService.historyAcion(this.sourceAction.actionAttributeId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));
    }
    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceAction.isActive == false;
            this.workFlowtService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive == true;
            this.workFlowtService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

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
        else {
            for (let i = 0; i < this.actionamecolle.length; i++) {
                if (value == this.actionamecolle[i][0].actionAttributeName.toLowerCase()) {
                    //alert("Action Name already Exists");
                    this.disableSave = true;
                    this.selectedActionName = event;
                }
            }
        }

    }
    partnmId(event) {
        //debugger;
        for (let i = 0; i < this.actionamecolle.length; i++) {
            if (event == this.actionamecolle[i][0].actionAttributeName) {
                //alert("Action Name already Exists");
                this.disableSave = true;
                this.selectedActionName = event;
            }
        }
    }
    filterActionAttributes(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allActionAttribute.length; i++) {
            let actionAttributeName = this.allActionAttribute[i].description;
            if (actionAttributeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.actionamecolle.push([{
                    "actionAttributeId": this.allActionAttribute[i].actionAttributeId,
                    "actionAttributeName": actionAttributeName
                }]),
                this.localCollection.push(actionAttributeName)
                
            }
        }
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
              this.sourceAction.masterCompanyId= 1;
            this.sourceAction.description = this.actionAttributeName;
            this.workFlowtService.newAction(this.sourceAction).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.actionAttributeName;
              this.sourceAction.masterCompanyId= 1;
            this.workFlowtService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.workFlowtService.deleteAcion(this.sourceAction.actionAttributeId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    private saveCompleted(user?: ActionAttribute) {
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

    private saveSuccessHelper(role?: ActionAttribute) {
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

   

