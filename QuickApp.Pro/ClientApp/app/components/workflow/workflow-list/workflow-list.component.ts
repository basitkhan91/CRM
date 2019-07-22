import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatIcon } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { fadeInOut } from '../../../services/animations';
import { AuthService } from '../../../services/auth.service';
import { MessageSeverity, AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { WorkFlowtService } from '../../../services/workflow.service';
import { ActionService } from '../../../Workflow/ActionService';

@Component({
    selector: 'app-workflow-list',
    templateUrl: './workflow-list.component.html',
	styleUrls: ['./workflow-list.component.scss'],
	animations: [fadeInOut]
})


export class WorkflowListComponent implements OnInit {

    title: string = "Work Flow";
    workFlowGridSource: MatTableDataSource<any>;
    gridColumns: any[];
    selectedGridColumn: any[];
    selectedGridColumns: any[];
    selectedWorflow: any[];
    workflowList: any[];
    modal: NgbModalRef;
    currentWorkflow: any;
    
    constructor(private actionService: ActionService,
        private router: ActivatedRoute,
        private route: Router,
        private authService: AuthService,
        private modalService: NgbModal,
        private alertService: AlertService,
        public workFlowtService: WorkFlowtService) {
        this.workFlowGridSource = new MatTableDataSource();
        this.workFlowtService.listCollection = null;
    }

    ngOnInit() {
        this.getAllWorkflows();
    }

 
	public allWorkFlows: any[] = [];

    private getAllWorkflows() {
        this.alertService.startLoadingMessage();
        this.workFlowtService.getWorkFlows().subscribe(
            results => this.onWorkflowLoadSuccessful(results[0]),
            error => { }
        );

        this.gridColumns = [
            { field: 'workflowId', header: 'Work Flow ID' },
            { field: 'partNumber', header: 'Part Number' },
            { field: 'partDescription', header: 'PN Description' },
            { field: 'description', header: 'Work Scope' },
            { field: 'name', header: 'Customer Name' },
            { field: 'createdDate', header: 'Created Date' },
            { field: 'workflowExpirationDate', header: 'Expiration Date' },

        ];

        this.selectedGridColumns = this.gridColumns;
    }

	public applyFilter(filterValue: string) {
        this.workFlowGridSource.filter = filterValue;
	}
	
	private refresh() {
		 this.applyFilter(this.workFlowGridSource.filter);
    }

    private onWorkflowLoadSuccessful(allWorkFlows: any[]) {
        this.alertService.stopLoadingMessage();
        this.workFlowGridSource.data = allWorkFlows;
        this.workflowList = allWorkFlows;
    }
    
    confirmDelete(confirmDeleteTemplate, rowData) {
        this.currentWorkflow = rowData;
        this.modal = this.modalService.open(confirmDeleteTemplate, { size: 'sm' });
    }

    removeWorkFlow(): void {
        this.actionService.RemoveWorkFlow(this.currentWorkflow.workflowId).subscribe(
            result => {
                this.alertService.showMessage(this.title, "ACC" + this.currentWorkflow.workflowId + ' deleted successfully.', MessageSeverity.success);
                this.getAllWorkflows();
            },
            error => {
                var message = '';
                if (error.error.constructor == Array) {
                    message = error.error[0].errorMessage;
                }
                else {
                    message = error.error.Message;
                }
                this.alertService.showMessage(this.title, message, MessageSeverity.error);
            });
        this.dismissModel();
    }

    toggleIsActive(workflow: any, event): void {
        this.actionService.toggleState(workflow.workflowId).subscribe(
            result => {
                this.alertService.showMessage(this.title, "Workflow updated successfully.", MessageSeverity.success);
            },
            error => {
                var message = '';
                if (error.error.constructor == Array) {
                    message = error.error[0].errorMessage;
                }
                else {
                    message = error.error.Message;
                }
                this.alertService.showMessage(this.title, message, MessageSeverity.error);
            }
        )
       
    }
    AddPage() {
        this.route.navigateByUrl('/workflowmodule/workflowpages/wf-create');
    }
    openEdit(row) {
        this.workFlowtService.listCollection = row;
        this.workFlowtService.enableUpdateMode = true;
        this.workFlowtService.currentWorkFlowId = row.workflowId;
        this.route.navigateByUrl('/workflowmodule/workflowpages/wf-create');
    }

	dismissModel() {
		this.modal.close();
	}
    
	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}
}