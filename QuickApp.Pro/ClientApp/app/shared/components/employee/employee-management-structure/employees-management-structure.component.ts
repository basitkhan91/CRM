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
import { OnInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, ActivatedRoute } from '@angular/router';
import { AppTranslationService } from '../../../../services/app-translation.service';
import { LegalEntityService } from '../../../../services/legalentity.service';



@Component({
    selector: 'app-employees-management-structure',
    templateUrl: './employees-management-structure.component.html',
    styleUrls: ['./employees-management-structure.component.scss'],
    animations: [fadeInOut]
})
/** employees-list component*/
export class EmployeesManagementStructureComponent implements OnInit,AfterViewInit{
    selectedRoles: any = [];
    memoText: string;
    employeeRolesList: object[];
    employeeRoleLabel = [];
    allManagemtninfo: any[];
    tagNameCollection: any[] = [];
    empId: any;
    firstName: any;
    lastName: any;

    dropdownSettings = {
        singleSelection: false,
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: false
    };
    gridData = [];
    
    constructor(private router: Router, private route: ActivatedRoute, public employeeService: EmployeeService, private legalEntityService: LegalEntityService, private alertService: AlertService){

    }

    ngOnInit(){
        console.log(this.employeeService.listCollection);
        this.structureInit();
        this.loadEmployeeRoles();
        
        if (this.employeeService.listCollection != null && this.employeeService.isEditMode == true) {
            // this.employeeService.storeEmployeeManagementStructure
        }
    }

    ngAfterViewInit() {
        this.route.queryParams
        .filter(params => params.order)
        .subscribe(params => {
            console.log(params); // {order: "popular"}
            //  console.log(params.order);
            this.empId = params.order;

            this.empId = params.order;
            this.firstName = params.firstname;
            this.lastName = params.lastname;
        });
    }

    getManagementStructureData(){
        let roles = [];
        this.employeeService.getStoredEmployeeRoles(this.empId)
        .subscribe(
            (employeeList: any[])=>{
                this.employeeRolesList.forEach(mainRole => {
                    employeeList.forEach(role => {
                        if(role.roleId == mainRole['id']){
                            roles.push(mainRole['name']);
                        }
                    });
                });
                this.selectedRoles = roles;
            }
        )
        this.employeeService.getStoredEmployeeManagementStructure(this.empId)
        .subscribe(
            (managementStructureList: any[])=>{
                console.log(managementStructureList);
                this.employeeService.legalEnityList = managementStructureList;
            }
        )
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
                this.employeeRoleLabel = this.employeeRolesList.map((emp)=>{ return emp['name']})
                this.loadManagementStructure();
            },
            error => console.log(error)
        );
    }
    loadManagementStructure(){
        this.legalEntityService.getManagemententity().subscribe(
            (results: any)=>{
                this.onManagemtntdataLoad(results[0])
                this.getManagementStructureData();
            },
            (error: any)=>{
                console.log(error);
            }
        )
    }

    private onManagemtntdataLoad(getAtaMainList: any[]) {
		// alert('success');
		// this.alertService.stopLoadingMessage();
		// this.loadingIndicator = false;
		// this.dataSource.data = getAtaMainList;
		this.allManagemtninfo = getAtaMainList;
		for (let i = 0; i < this.allManagemtninfo.length; i++) {
			if (this.allManagemtninfo[i].tagName != null) {
				this.tagNameCollection.push(this.allManagemtninfo[i]);
			}
		}
		//debugger;
		if (this.allManagemtninfo)
		{
			
            this.gridData = [{
                data: {
                    name: "ABC Inc",
                    isRoot: true
                },
                children: this.makeNestedObj(this.allManagemtninfo, null)}];
            // this.employeeService.structureData = this.gridData;
		}

		
		// console.log(this.gridData);
    }
    makeNestedObj(arr, parent) {
		var out = []
		for (var i in arr) {
			if (arr[i].parentId == parent) {
				var children = this.makeNestedObj(arr, arr[i].managementStructureId)
				arr[i] = { "data": arr[i] };
				if (children.length) {
					arr[i].children = children
				}
				out.push(arr[i])
			}
		}
		return out
    }
    
    saveManagementStructure(){
        this.employeeService.employeeStored['memo'] = this.memoText;
        this.employeeService.updateEmployee(this.employeeService.employeeStored).subscribe(
            results => {
                this.employeeService.storeEmployeeRoles(this.getEmployeeRolesList()).subscribe(
                    (result)=>{
                        this.employeeService.storeEmployeeManagementStructure(this.getLegalEntityList()).subscribe(
                            (result) => {
                                this.alertService.showMessage("Success", "Employee Updated Sucessfully", MessageSeverity.success);
                                this.router.navigateByUrl('/employeesmodule/employeepages/app-employees-list');
                            },
                            (error)=>{
                            }
                        )
                    },
                    (error)=>{
                    }
                )
            },

            error => console.log(error)
        );
        
    }
    getEmployeeRolesList(){
        let result = [];
        this.employeeRolesList.forEach((role)=>{
            if(this.selectedRoles.indexOf(role['name']) != -1){
                result.push(
                    {
                        "employeeId": this.empId,
                        "roleId": role['id'],
                        "createdBy": "admin",
                        "updatedBy": "admin",
                        "isActive": role['isActive'],
                        "isDeleted": role['isDeleted']
                    }
                )
            }
        })
        return result;
    }

    getLegalEntityList(){
        let result = [];
        this.employeeService.legalEnityList.forEach((ele, index)=>{
            this.employeeService.legalEnityList[index]['isActive'] = true;
            this.employeeService.legalEnityList[index]['isDeleted'] = false;
            this.employeeService.legalEnityList[index]['employeeId'] = this.empId;
        })
        return this.employeeService.legalEnityList;
    }

    previousClick(){
		this.employeeService.indexObj.next(2);
		//this.saveCompleted(this.sourceCustomer);
        this.router.navigate(['/employeesmodule/employeepages/app-employee-training'], { queryParams: { order: this.empId, 'firstName': this.firstName, 'lastName': this.lastName } });
    }
     

}