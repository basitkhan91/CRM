import { Component } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../../../services/animations';
import { PageHeaderComponent } from '../../../page-header.component';
import { ActionService } from '../../../../services/action.service';
import { MasterComapnyService } from '../../../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../../../services/alert.service';
import { Action } from '../../../../models/action.model';
import { AuditHistory } from '../../../../models/audithistory.model';
import { AuthService } from '../../../../services/auth.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../../../models/mastercompany.model';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';

import { CheckboxModule } from 'primeng/checkbox';
import { EmployeeService } from '../../../../services/employee.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
import { AppTranslationService } from '../../../../services/app-translation.service';


@Component({
    selector: 'app-employees-management-structure',
    templateUrl: './employees-management-structure.component.html',
    styleUrls: ['./employees-management-structure.component.scss'],
    animations: [fadeInOut]
})
/** employees-list component*/
export class EmployeesManagementStructureComponent implements OnInit{
    sourceEmployee: any;
    employeeRolesList: object[];
    constructor(public employeeService: EmployeeService){

    }

    ngOnInit(){
        this.structureInit();
        this.loadEmployeeRoles();
    }
    structureInit(){
        var toggler = document.getElementsByClassName("caret");
        var i;

        for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function() {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
        }
    }
    loadEmployeeRoles(){
        this.employeeService.getAllRolesOfEmployee().subscribe(
            results => {
                this.employeeRolesList = results;
            },
            error => console.log(error)
        );
    }

}