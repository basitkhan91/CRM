
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

@Component({
    selector: 'app-percent',
    templateUrl: './percent.component.html',
    styleUrls: ['./percent.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class PercentComponent implements OnInit {
   
    cols: any[];
	constructor(private breadCrumb: SingleScreenBreadcrumbService){}
    ngOnInit(): void {
		this.loadData();
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-percent';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }
    private loadData(){
       this.cols=[
           { field:'Discountid',header:'ID'},
           { field:'discountValue',header:'Percent '},
           { field:'memo',header:'Memo'}           
       ]
    }
}