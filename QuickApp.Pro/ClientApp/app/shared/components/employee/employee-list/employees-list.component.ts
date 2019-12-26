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
import $ from "jquery";
import { CommonService } from '../../../../services/common.service';
import { getValueFromArrayOfObjectById } from '../../../../generic/autocomplete';



@Component({
    selector: 'app-employees-list',
    templateUrl: './employees-list.component.html',
    styleUrls: ['./employees-list.component.scss'],
    animations: [fadeInOut]
})
/** employees-list component*/
export class EmployeesListComponent implements OnInit {
    activeIndex: number;
    private isSaving: boolean;
    isDeleteMode: boolean = false;
    private isEditMode: boolean = false;
    viewempDetails: any = {};
    //viewempDetails: any = {};
    viewTraining: any = {};
    viewGeneralDetails: any = {};
    allEmployeelist: any = {};
    public originationCounty: any;
    public nationalCountry: any;
    public companyCode: any;
    public businessUnit: any;
    public departmentCode: any;
    public divisionCode: any;
    public empExpertisedescription: any;
    public jobTypeName: any;
    public jobTitleName: any;
    public employeeLeaveType: any;
    public deleteEmployeeId: any;
    totalRecords: any;
    totalPages: number;
    pageSize: number = 10;
    public departname: any;
    public divsioname: any;
    public biuName: any;
    public compnayname: any;
    public shiftId: any;
    public supervisiorname: any;
    public empTrainningInfo: any;
    public leaveMapArray: any;
    public shiftMapArray: any;
    //public auditHistory: AuditHistory[] = [];
    auditHistory: any=[];
    getAllFrequencyTrainingInfodrpData;
    frequencyOfTrainingData:any;

    ngOnInit(): void {

        // debugger;
        this.loadData();
        this.activeIndex = 0;
        this.empService.currentUrl = '/employeesmodule/employeepages/app-employees-list';
        this.empService.bredcrumbObj.next(this.empService.currentUrl);

        this.empService.ShowPtab = false;

        this.empService.alertObj.next(this.empService.ShowPtab);
        this.getAllFrequencyTrainingData();

    }

    allVendorList: any[];
    dataSource: MatTableDataSource<any>;
    selectedColumn: any[];
    public sourceEmployee: any = {};
    Active: string = "Active";
    selectedColumns: any[];
    cols: any[];
    modal: NgbModalRef;
    /** employees-list ctor */
    constructor(private modalService: NgbModal, private translationService: AppTranslationService, private empService: EmployeeService, private router: Router, private authService: AuthService, private alertService: AlertService, public commonService: CommonService) {
        this.dataSource = new MatTableDataSource();
        this.translationService.closeCmpny = false;
        this.activeIndex = 0;
        this.empService.listCollection = null;

    }
    private onDataLoadSuccessful(allWorkFlows: any[]) {
        //debugger;
        //this.alertService.stopLoadingMessage();
        //this.loadingIndicator = false;
        this.totalRecords = allWorkFlows.length;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);

        this.dataSource.data = allWorkFlows;
        this.allVendorList = allWorkFlows;


    }
    private onemployeeDataLoadSuccessful(allWorkFlows: any[]) {
        console.log(allWorkFlows);
        if (allWorkFlows[0].employeeLeaveTypeMapping != null) {
            this.employeeLeaveType = allWorkFlows[0].employeeLeaveTypeMapping.employeeLeaveTypeId;
            this.shiftId = allWorkFlows[0].employeeShiftMapping.shiftId;
            this.leaveMapArray = allWorkFlows[0].employeeLeaveTypeMapping;
            this.shiftMapArray = allWorkFlows[0].employeeShiftMapping;
           

        }
        //debugger;
        //this.alertService.stopLoadingMessage();
        //this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.allEmployeelist = allWorkFlows[0];


    }

    loadCustomerPages(event) {

    }


    public navigateTogeneralInfo() {
        //this.workFlowtService.listCollection = [];
        this.empService.isEditMode = false;
        this.router.navigateByUrl('/employeesmodule/employeepages/app-employee-general-information')

    }
    openEdit(row) {

       //console.log(row);
        
        //this.isEditMode = true;
        this.empService.isEditMode = true;
        //this.isSaving = true;
        //this.sourceVendor = row;
        //this.loadMasterCompanies();
        this.empService.listCollection = row;
        this.router.navigateByUrl('/employeesmodule/employeepages/app-employee-general-information');
        // this.actionName = this.sourceVendor.description;

    }
    private onDataLoadFailed(error: any) {
        // alert(error);
        //this.alertService.stopLoadingMessage();
        //this.loadingIndicator = false;

    }
    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    //deleteItemAndCloseModel(rowData) {
    //	this.isSaving = true;
    //	this.sourceEmployee = rowData;
    //	this.sourceEmployee.updatedBy = this.userName;
    //	this.sourceEmployee.isActive = false;
    //	this.sourceEmployee.employeeId = rowData.employeeId;
    //	this.empService.updateListstatus(this.sourceEmployee).subscribe(
    //		response => this.saveCompleted(this.sourceEmployee),
    //		error => this.saveFailedHelper(error));

    //}

    private loadData() {


        this.empService.getEmployeeList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.cols = [
            { field: 'firstName', header: 'First Name' },
            { field: 'lastName', header: 'Last Name' },
            { field: 'employeeId', header: 'EmpID' },
            // { field: 'email', header: 'Email' },
            //{ field: 'businessUnitId', header: 'BU' },
            //{ field: 'divisionId', header: 'Division' },
            //{ field: 'departmentId', header: 'Department' },
            { field: 'jobtitle', header: 'Job Title' },
            { field: 'employeeExpertise', header: 'Emp Expertise'},
            { field: 'jobtype', header: 'Job Type'},
            { field: 'startDate', header: 'Start Date'},
            { field: 'company', header: 'Company' },
            { field: 'paytype', header: 'Pay Type'}
            // { field: 'createdBy', header: 'Created By' },
            // { field: 'updatedBy', header: 'Updated By' },
            // { field: 'updatedDate', header: 'Updated Date' },
            // { field: 'createdDate', header: 'Created Date' }

        ];

        this.selectedColumns = this.cols;

    }

    getData(rowData, field) {
         if (field === 'jobtitle') return rowData['jobtitle'] ? rowData['jobtitle']['description'] : 'NA';
        if (field === 'jobtype') return rowData['jobtype'] ? rowData['jobtype']['jobTypeName'] : 'NA';
        else if (field === 'company') {
           // return rowData['masterCompany'] ? rowData['masterCompany']['companyName'] : 'NA';

            if (rowData.managmentLegalEntity != null && rowData.divmanagmentLegalEntity != null && rowData.biumanagmentLegalEntity != null && rowData.compmanagmentLegalEntity != null) {
                return rowData.compmanagmentLegalEntity.name;

            }
            else if (rowData.biumanagmentLegalEntity != null && rowData.divmanagmentLegalEntity != null && rowData.managmentLegalEntity != null) {
                return rowData.biumanagmentLegalEntity.name;

            }
            else if (rowData.divmanagmentLegalEntity != null && rowData.managmentLegalEntity != null) {
                return rowData.divmanagmentLegalEntity.name;
            }
            else if (rowData.managementStructeInfo != null) {
                return rowData.managmentLegalEntity.name;
            } else {
                return 'NA';
            }


        }
        else if (field === 'employeeExpertise') return rowData['employeeExpertise'] ? rowData['employeeExpertise']['description'] : 'NA';
        else if (field === 'employeeId') return `EMP ${rowData[field]}`;
        else if (field === 'paytype') return rowData['isHourly'] ? 'Hourly' : 'Yearly';
        else return rowData[field];
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.isDeleteMode = true;
        this.sourceEmployee.isdelete = true;
        //this.sourceVendor = content;
        //this.sourceEmployee.employeeId = rowData.employeeId;
        this.sourceEmployee.employeeId = this.deleteEmployeeId;
        this.sourceEmployee.updatedBy = this.userName;
        this.empService.deleteEmployee(this.sourceEmployee).subscribe(data => {
            this.alertService.showMessage("Employee removed successfully.");
            this.modal.close();
            this.loadData();
        })
        //this.modal.close();
    }

    openDelete(content, row) {

        //console.log(row);
        this.deleteEmployeeId = row.employeeId
        this.isEditMode = false;
        this.isDeleteMode = true;
        this.sourceEmployee = row;

        this.modal = this.modalService.open(content, { size: 'sm', backdrop: 'static', keyboard: false });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    private saveCompleted(user?: any) {
        this.isSaving = false;

        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

        }

        //	this.loadData();
    }
    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }
    openView(content, row) {


        if (row.managmentLegalEntity != null && row.divmanagmentLegalEntity != null && row.biumanagmentLegalEntity != null && row.compmanagmentLegalEntity != null) {
            this.departname = row.managementStructeInfo.name;
            this.divsioname = row.divmanagmentLegalEntity.name;
            this.biuName = row.biumanagmentLegalEntity.name;
            this.compnayname = row.compmanagmentLegalEntity.name;

        }
        else if (row.biumanagmentLegalEntity != null && row.divmanagmentLegalEntity != null && row.managmentLegalEntity != null) {

            this.divsioname = row.managmentLegalEntity.name;
            this.biuName = row.divmanagmentLegalEntity.name;
            this.compnayname = row.biumanagmentLegalEntity.name;



        }
        else if (row.divmanagmentLegalEntity != null && row.managmentLegalEntity != null) {
            this.biuName = row.managmentLegalEntity.name;
            this.compnayname = row.divmanagmentLegalEntity.name;


        }
        else if (row.managementStructeInfo != null) {

            this.compnayname = row.managmentLegalEntity.name;

        }
        else {
            //console.log("no Info Presnts")
        }
      
        if(row.employeetraingInfo.frequencyOfTrainingId > 0)
        {
            this.frequencyOfTrainingData = getValueFromArrayOfObjectById('label', 'value', row.employeetraingInfo.frequencyOfTrainingId, this.getAllFrequencyTrainingInfodrpData);
        }
        else{
            this.frequencyOfTrainingData="";
        }

        if (row.empSupervisor != null) {
            this.supervisiorname = row.empSupervisor.firstName
        }
        this.originationCounty = row.orgCountries ? row.orgCountries.countries_name : '';
        this.nationalCountry = row.nationalCountryId ? row.nationalCountryId.countries_name : '';

        if (row.employeeExpertise != null) {
            this.empExpertisedescription = row.employeeExpertise.description
        }

        if (row.jobtype != null) {
            this.jobTypeName = row.jobtype.jobTypeName
        }

        if (row.jobtitle != null) {
            this.jobTitleName = row.jobtitle.description
        }

        if (row.employeetraingType != null) {
            this.empTrainningInfo = row.employeetraingType.description

        }

        if (row.managementStructeInfo != null) {
            this.companyCode = row.managementStructeInfo.code;
        }



        if (row.buInfo != null) {
            this.businessUnit = row.buInfo.code;
        }
        if (row.departmentInfo != null) {
            this.departmentCode = row.departmentInfo.code;
        }
        if (row.divisonInfo != null) {

            this.divisionCode = row.divisonInfo.code;
        }


        this.jobTypeName = row.jobtype.jobTypeName;


        this.viewGeneralDetails = row;
        this.viewempDetails = row;
        this.viewTraining = row;
        this.allEmployeelist = row;
        this.empService.getEmployeeListforView(row.employeeId).subscribe(
            results => this.onemployeeDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
      
        // this.modal = this.modalService.open(content, { size: 'lg' });
        // this.modal.result.then(() => {
        //     console.log('When user closes');
        // }, () => { console.log('Backdrop click') })
    }

    dismissModel() {
        this.modal.close();
    }
    handleChange(rowData, e) {
        if (e.checked == false) {

            //console.log("In active");
            this.sourceEmployee = rowData;
            this.sourceEmployee.updatedBy = this.userName;
            this.sourceEmployee.IsActive = false;
            var employpeeleaveTypeId = [];
            employpeeleaveTypeId.push(this.sourceEmployee.employeeLeaveTypeId);

            //console.log(employpeeleaveTypeId);
            this.sourceEmployee.employeeLeaveTypeId = employpeeleaveTypeId;

            this.Active = "In Active";
            this.sourceEmployee.isActive = false;
            this.empService.updateActionforActive(this.sourceEmployee).subscribe(
                response => this.saveCompleted(this.sourceEmployee),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            //console.log("active");
            var employpeeleaveTypeId = [];
            this.sourceEmployee = rowData;
            employpeeleaveTypeId.push(this.sourceEmployee.employeeLeaveTypeId);
            this.sourceEmployee.employeeLeaveTypeId = employpeeleaveTypeId;
            this.sourceEmployee.updatedBy = this.userName;
            this.sourceEmployee.IsActive = true;
            this.Active = "Active";
            this.sourceEmployee.isActive == true;
            this.empService.updateActionforActive(this.sourceEmployee).subscribe(
                response => this.saveCompleted(this.sourceEmployee),
                error => this.saveFailedHelper(error));
            //alert(e);
        }

    }

    ExpandAllEmployeeDetailsModel()
    {
        $('#step1').collapse('show');
        $('#step2').collapse('show');
        $('#step3').collapse('show');
        //$('#step4').collapse('show');      
    }
    CloseAllEmployeerDetailsModel()
    {
        $('#step1').collapse('hide');
        $('#step2').collapse('hide');
        $('#step3').collapse('hide');
        //$('#step4').collapse('hide');
      
    }

    getAuditHistoryById(rowData) {       
        this.empService.getEmployeeAuditDetails(rowData.employeeId).subscribe(res => {           
            this.auditHistory = res;
        })
    }
    getColorCodeForHistory(i, field, value) {
        const data = this.auditHistory;
        const dataLength = data.length;
        if (i >= 0 && i <= dataLength) {
            if ((i + 1) === dataLength) {
                return true;
            } else {
                return data[i + 1][field] === value
            }
        }
    }

    async getAllFrequencyTrainingData() {
        await this.commonService.smartDropDownList('FrequencyOfTraining', 'FrequencyOfTrainingId', 'FrequencyName').subscribe(res => {
            this.getAllFrequencyTrainingInfodrpData = res;
            
        });        
    }


}