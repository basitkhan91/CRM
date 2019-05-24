import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../../services/animations';
import { PageHeaderComponent } from '../../../shared/page-header.component';
import { ActionService } from '../../../services/action.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../../services/alert.service';
import { Action } from '../../../models/action.model';
import { AuditHistory } from '../../../models/audithistory.model';
import { AuthService } from '../../../services/auth.service';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../../models/mastercompany.model';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';

import { CheckboxModule } from 'primeng/checkbox';
import { EmployeeService } from '../../../services/employee.service';
import { JobTitle } from '../../../models/jobtitle.model';
import { JobTitleService } from '../../../services/job-title.service';
import { EmployeeExpertiseService } from '../../../services/employeeexpertise.service';
import { EmployeeExpertise } from '../../../models/employeeexpertise.model';
import { Router } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { AppTranslationService } from '../../../services/app-translation.service';
import * as moment from 'moment'
import { CalendarModule } from 'primeng/calendar';
import { LegalEntityService } from '../../../services/legalentity.service';
import { EmployeeLeaveType } from '../../../models/EmployeeLeaveTypeModel';
import { PhoneNumber } from '../../../models/phoneNumber.model';

@Component({
	selector: 'app-employee-general-information',
	templateUrl: './employee-general-information.component.html',
	styleUrls: ['./employee-general-information.component.scss'],
	animations: [fadeInOut]
})

export class EmployeeGeneralInformationComponent implements OnInit, AfterViewInit {
    phoneNumber = new PhoneNumber()
    
	local: any;
	activeIndex: number;
	allLeaves: EmployeeLeaveType[];
	allCountries: any[];
	yearly: boolean;
	hourly: boolean;
	showsingle: boolean;
	showMultiple: boolean;
	shiftValues: any[] = [];
	allManufacturerInfo: any[];
	selectedCars1: any;
	divisionId: any;
	departmentId: any;
	businessUnitId: any;
	companyId: any;
	allEmployeeExpertiseInfo: EmployeeExpertise[];
	allJobTitlesinfo: JobTitle[];
	jobName: string;
	_divisionlist: any[];
	_departmentList: any[];
	leavemultiValues: any[] = [];
	allLeaveDetails: any[];
    selectedshiftValues: any[];
    allShiftValues: any[]=[];
    collectionofItemMaster: any;
	allleaveInfo: any[] = [];
	selectedLeaveValues: any[];
    description: any;
	localleaveCollection: any[] = [];
	allLeavesinfo: EmployeeLeaveType[];
    employeeLeaveTypeId: any;
    allmultiLeaves: any[];
    allMultipleLeaves: any[]=[];
    managementStructureData: any[];
    selectedFirstName: any;
    disableSaveFirstName: boolean;
    disableSaveMiddleName: boolean;
    disableSaveName: any;
    disableSaveLastName: boolean;
    disableSaveLeaveName: boolean;
    selectedActionName: any;
    disableJobTitle: boolean;
    disableExpTitle: boolean;
	ngOnInit(): void {
		this.employeeService.currentUrl = '/employeesmodule/employeepages/app-employee-general-information';
		this.employeeService.bredcrumbObj.next(this.employeeService.currentUrl);
		this.employeeService.ShowPtab = true;
		this.employeeService.alertObj.next(this.employeeService.ShowPtab); //steps
		this.activeIndex = 0;
		this.employeeService.indexObj.next(this.activeIndex);
		this.loadManagementdata();
		this.loadData();
		this.loadJobtitlesData();
		this.loademployeesexperties();
		this.multiLeavelist();
		this.EmployeeTrainingType();
		this.shift();
		this.Countries();
		this.EmployeeLeaveType();
	}
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	displayedColumns = ['employeeId', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
	dataSource: MatTableDataSource<any>;
	allEmployeeinfo: any[] = [];
	allShiftdetails: any;
	allComapnies: MasterCompany[] = [];
	private isSaving: boolean;
	public sourceAction: any = {};
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
	employeeName: string;
	filteredBrands: any[];
	localCollection: any[] = [];
	firstCollection: any[];
	lastNameCollection: any[];
	empIdCollection: any[];
	middleNameCollection: any[];
	/** Actions ctor */
	allManagemtninfo: any[] = [];
	maincompanylist: any[] = [];
	private isEditMode: boolean = false;
	private isDeleteMode: boolean = false;
	departmentList: any[] = [];
	bulist: any[] = [];
	divisionlist: any[] = [];
	Active: string = "Active";
    allAircraftManufacturer: any[] = [];
    sourceEmployee: any = {};
    updateMode: boolean = false;

	constructor(private translationService: AppTranslationService, private router: Router, public workFlowtService: JobTitleService, private empservice: EmployeeExpertiseService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private route: Router, private alertService: AlertService, public employeeService: EmployeeService, public workFlowtService1: LegalEntityService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.displayedColumns.push('action');


        const control = new FormControl('1', Validators.pattern('[a-zA-Z ]*'));

        console.log(control.errors);

		this.dataSource = new MatTableDataSource();
		if (this.employeeService.listCollection != null && this.employeeService.isEditMode == true) {
		
            this.sourceEmployee = this.employeeService.listCollection;
            this.updateMode = true;
			this.sourceEmployee.startDate = new Date();
			this.sourceEmployee.dateOfBirth = new Date(this.sourceEmployee.dateOfBirth);
			if (this.local) {
				this.employeeService.employeeCollection = this.local;
			}

			if (this.sourceEmployee.inMultipleShifts == true) {
				this.sourceEmployee.multiShift = "multiShift";
				this.showsingle = false;
				this.showMultiple = true;
			}
			if (this.sourceEmployee.inMultipleShifts == false) {
				this.sourceEmployee.singleShift = "singleShift";
				this.showsingle = true;
				this.showMultiple = false;
			}
			if (this.sourceEmployee.isHourly == true) {
				this.sourceEmployee.hourlypayType = "Hourly";
				this.hourly = true
			}

			if (this.sourceEmployee.isHourly == false) {
				this.sourceEmployee.yearlypayType = "Yearly";
				this.yearly = true
			}
		}
		this.translationService.closeCmpny = false;


	}

	singleClick(click) {
		if (click == 'single') {
			this.showsingle = true;
			this.showMultiple = false;
			this.sourceEmployee.inMultipleShifts = true;

		}
		if (click == 'multiple') {
			this.showMultiple = true;
			this.showsingle = false;
			this.sourceEmployee.inMultipleShifts = false;
		}

	}
	paytypeclick(click) {
		if (click == 'hourly') {
			this.hourly = true;
			this.yearly = false;
			this.sourceEmployee.isHourly = true;
		}
		if (click == 'yearly') {
			this.yearly = true;
			this.hourly = false;
			this.sourceEmployee.isHourly = false;
		}

	}
	

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	public allWorkFlows: any[] = [];

	private loadData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.employeeService.getEmployeeList().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
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

	private shift() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.employeeService.getshift().subscribe(
			results => this.onshiftData(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private Countries() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.employeeService.getCountries().subscribe(
			results => this.onCountryloadsuccessfull(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private EmployeeTrainingType() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.employeeService.getEmployeeTrainingType().subscribe(
			results => this.onDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	private EmployeeLeaveType() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.employeeService.getEmployeeLeaveType().subscribe(
			results => this.onLeavedata(results[0]),
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
	private onDataLoadSuccessful(getEmployeeCerficationList: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getEmployeeCerficationList;
		this.allEmployeeinfo = getEmployeeCerficationList;
	}
	private onLeavedata(getEmployeeCerficationList: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getEmployeeCerficationList;
		this.allLeaves = getEmployeeCerficationList;
	}
	private onCountryloadsuccessfull(getEmployeeCerficationList: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getEmployeeCerficationList;
		this.allCountries = getEmployeeCerficationList;
	}
	private onshiftData(getEmployeeCerficationList: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getEmployeeCerficationList;
		this.allShiftdetails = getEmployeeCerficationList;
		if (this.allShiftdetails.length > 0) {
			this.shiftValues = [];
			for (let i = 0; i < this.allShiftdetails.length; i++)
				this.shiftValues.push(
					{ value: this.allShiftdetails[i].shiftId, label: this.allShiftdetails[i].description },
					

				);
		}
		let valAirCraft = [];
		this.employeeService.getemployeeshiftsList(this.sourceEmployee.employeeId)
			.subscribe(results => {
				this.allAircraftManufacturer = results[0];
				if (results != null) {
					for (let i = 0; i < this.allAircraftManufacturer.length; i++) {
						valAirCraft.push(this.allAircraftManufacturer[i].shiftId);
					}
					this.selectedshiftValues = valAirCraft; 
					console.log(this.selectedshiftValues);
				}

			},
				error => this.onDataLoadFailed(error)
			);
	}

	
	private onmultiLeavedata(getMultiLeaveList: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getMultiLeaveList;
		this.allLeaveDetails = getMultiLeaveList;
		if (this.allLeaveDetails.length > 0) {
			for (let i = 0; i < this.allLeaveDetails.length; i++)
				this.leavemultiValues.push(
					{ value: this.allLeaveDetails[i].employeeLeaveTypeId, label: this.allLeaveDetails[i].description },
					
				);
		}
		let valAirCraft = [];
		this.employeeService.getmultileaves(this.sourceEmployee.employeeId)
			.subscribe(results => {
				this.allMultipleLeaves = results;
				if (results != null) {
					for (let i = 0; i < this.allMultipleLeaves.length; i++) {
						valAirCraft.push(this.allMultipleLeaves[i].employeeLeaveTypeId);
					}
					this.selectedLeaveValues = valAirCraft;
					console.log(this.selectedLeaveValues);
				}

			},
				error => this.onDataLoadFailed(error)
			);
	}

	private loadJobtitlesData() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService.getWorkFlows().subscribe(
			results => this.onJobtitlesDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}


	private onJobtitlesDataLoadSuccessful(allWorkFlows: JobTitle[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allJobTitlesinfo = allWorkFlows;
	}



	filterJobs(event) {

		this.localCollection = [];
		for (let i = 0; i < this.allJobTitlesinfo.length; i++) {
			let jobName = this.allJobTitlesinfo[i].description;
			if (jobName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.localCollection.push(jobName);
			}
		}
	}

	filterLeaves(event) {

		this.localleaveCollection = [];
		for (let i = 0; i < this.allLeaves.length; i++) {
			let description = this.allLeaves[i].description;
			if (description.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.localleaveCollection.push(description);
			}
		}
	}

	private loademployeesexperties() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.empservice.getWorkFlows().subscribe(
			results => this.onEmpDataLoadSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}
	private onEmpDataLoadSuccessful(allWorkFlows: EmployeeExpertise[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = allWorkFlows;
		this.allEmployeeExpertiseInfo = allWorkFlows;
	}


	filterEmployeeNames(event) {

		this.localCollection = [];
		for (let i = 0; i < this.allEmployeeExpertiseInfo.length; i++) {
			let employeeName = this.allEmployeeExpertiseInfo[i].description;
			if (employeeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.localCollection.push(employeeName);
			}
		}
	}




	private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.auditHisory = auditHistory;
		this.modal = this.modalService.open(content, { size: 'lg' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })


	}

	private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allComapnies = allComapnies;

	}

	private onDataLoadFailed(error: any) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;

	}
	handleChange(rowData, e) {
		if (e.checked == false) {
			this.sourceAction = rowData;
			this.sourceAction.updatedBy = this.userName;
			this.Active = "In Active";
			this.sourceAction.isActive == false;
			this.employeeService.updateEmployee(this.sourceAction).subscribe(
				response => this.saveCompleted(this.sourceAction),
				error => this.saveFailedHelper(error));
		}
		else {
			this.sourceAction = rowData;
			this.sourceAction.updatedBy = this.userName;
			this.Active = "Active";
			this.sourceAction.isActive == true;
			this.employeeService.updateEmployee(this.sourceAction).subscribe(
				response => this.saveCompleted(this.sourceAction),
				error => this.saveFailedHelper(error));
		}

	}

	open(content) {
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceAction.isActive = true;
		this.employeeName = "";
		this.modal = this.modalService.open(content, { size: 'lg' });
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

	openjobtitle(content) {
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceAction = new JobTitle();
		this.sourceAction.isActive = true;
		this.jobName = "";
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}

	openLeaveType(content) {
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceAction = new EmployeeLeaveType();
		this.sourceAction.isActive = true;
		this.description = "";
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
			console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}


	openemployeeExpertise(content) {
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceAction = new EmployeeExpertise();
		this.sourceAction.isActive = true;
		this.employeeName = "";
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
            console.log('When user closes');
		}, () => { console.log('Backdrop click') })


	}

	
	openEdit(content, row) {
		this.isEditMode = true;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceAction = row;
		this.employeeName = this.sourceAction.employeeName;
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
		this.employeeService.historyEmployee(this.sourceAction.employeeId).subscribe(
			results => this.onHistoryLoadSuccessful(results[0], content),
			error => this.saveFailedHelper(error));


	}


	editItemAndCloseModel() {
		this.isSaving = true;
		if (!this.sourceEmployee.employeeId) {
			this.sourceEmployee.createdBy = this.userName;
			this.sourceEmployee.updatedBy = this.userName;
			this.sourceEmployee.masterCompanyId = 1;
			this.sourceEmployee.employeeName = this.employeeName;
			this.sourceEmployee.isActive = true;
			if (this.sourceEmployee.singleShift) {
				this.sourceEmployee.inMultipleShifts = false;
			}
			if (this.sourceEmployee.multiShift) {
				this.sourceEmployee.inMultipleShifts = true;
			}
			this.employeeService.newAddEmployee(this.sourceEmployee).subscribe(data => {
				this.sourceEmployee.updatedBy = this.userName;
				this.localCollection = data;

				this.employeeService.generalCollection = this.localCollection;
				this.activeIndex = 0;
			})
			if (this.selectedshiftValues != null) //separting Array whic is having ","
			{
				this.sourceEmployee.ShiftId = this.selectedshiftValues.toString().split(",");
			}

			if (this.selectedLeaveValues != null) //separting Array whic is having ","
			{
                this.sourceEmployee.employeeLeaveTypeId = this.selectedLeaveValues.toString().split(",");
			}

		}
		else {
			if (this.selectedshiftValues != null) //separting Array whic is having ","
			{
				this.sourceEmployee.ShiftId = this.selectedshiftValues.toString().split(",");
			}
			if (this.selectedLeaveValues != null) //separting Array which is having ","
			{
                this.sourceEmployee.employeeLeaveTypeId = this.selectedLeaveValues.toString().split(",");
			}


			if (this.sourceEmployee.singleShift) {
				this.sourceEmployee.inMultipleShifts = false;
			}
			if (this.sourceEmployee.multiShift) {
				this.sourceEmployee.inMultipleShifts = true;
			}
			if (this.sourceEmployee["employeeShift"]) {
				delete this.sourceEmployee["employeeShift"];
			}
					this.sourceEmployee.updatedBy = this.userName;
					this.sourceEmployee.employeeName = this.employeeName;
					this.sourceEmployee.masterCompanyId = 1;
					this.employeeService.updateEmployeeDetails(this.sourceEmployee).subscribe(
						response => this.saveCompleted(this.sourceEmployee),
						error => this.saveFailedHelper(error));
					this.activeIndex = 0;
					this.employeeService.indexObj.next(this.activeIndex);
				}
				//this.modal.close();
	       }

	editItemJobCloseModel() {
		this.isSaving = true;

		if (this.isEditMode == false) {
			this.sourceAction.createdBy = this.userName;
			this.sourceAction.updatedBy = this.userName;
			this.sourceAction.description = this.jobName;
			this.sourceAction.masterCompanyId = 1;
			this.workFlowtService.newAction(this.sourceAction).subscribe(data => { this.loadJobtitlesData() })
		}
		else {

			this.sourceAction.updatedBy = this.userName;
			this.sourceAction.description = this.jobName;
			this.sourceAction.masterCompanyId = 1;
			this.workFlowtService.updateAction(this.sourceAction).subscribe(
				response => this.saveCompleted(this.sourceAction),
				error => this.saveFailedHelper(error));
		}
	}

	editItemLeaveCloseModel() {
		this.isSaving = true;

		if (this.isEditMode == false) {
			this.sourceAction.createdBy = this.userName;
			this.sourceAction.updatedBy = this.userName;
			this.sourceAction.description = this.description;
			this.sourceAction.masterCompanyId = 1;
			this.employeeService.newActionforLeave(this.sourceAction).subscribe(data => {
				this.saveCompleted(this.sourceAction);
                this.sourceEmployee.employeeLeaveTypeId = data.employeeLeaveTypeId;
                this.EmployeeLeaveType();
                
			})
		}
		else {

			this.sourceAction.updatedBy = this.userName;
			this.sourceAction.description = this.description;
			this.sourceAction.masterCompanyId = 1;
			this.employeeService.newActionforLeave(this.sourceAction).subscribe(data => {
				this.saveCompleted(this.sourceAction);
                this.sourceEmployee.employeeLeaveTypeId = data.employeeLeaveTypeId;
                this.EmployeeLeaveType();
			});
			
		}

		this.modal.close();
	}

	editItemExpertiesCloseModel() {

		this.isSaving = true;

		if (this.isEditMode == false) {
			this.sourceAction.createdBy = this.userName;
			this.sourceAction.updatedBy = this.userName;
			this.sourceAction.description = this.employeeName;
			this.sourceAction.masterCompanyId = 1;
			this.empservice.newAction(this.sourceAction).subscribe(data => { this.loademployeesexperties() })

		}
		else {

			this.sourceAction.updatedBy = this.userName;
			this.sourceAction.description = this.employeeName;
			this.sourceAction.masterCompanyId = 1;
			this.workFlowtService.updateAction(this.sourceAction).subscribe(
				response => this.saveCompleted(this.sourceAction),
				error => this.saveFailedHelper(error));
		}

		//s this.modal.close();
	}
	filterfirstName(event) {

		this.firstCollection = [];
		for (let i = 0; i < this.allEmployeeinfo.length; i++) {
			let firstName = this.allEmployeeinfo[i].firstName;
			if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.firstCollection.push(firstName);
			}
		}
	}

	filterlastName(event) {

		this.lastNameCollection = [];
		for (let i = 0; i < this.allEmployeeinfo.length; i++) {
			let lastName = this.allEmployeeinfo[i].lastName;
			if (lastName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.lastNameCollection.push(lastName);
			}
		}
	}
	filtermiddleName(event) {

		this.middleNameCollection = [];
		for (let i = 0; i < this.allEmployeeinfo.length; i++) {
			let middleName = this.allEmployeeinfo[i].middleName;
			if (middleName) {
				if (middleName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.middleNameCollection.push(middleName);
				}
			}
		}
	}

	filterempIdName(event) {

		this.empIdCollection = [];
		for (let i = 0; i < this.allEmployeeinfo.length; i++) {
			let employeeId = this.allEmployeeinfo[i].employeeId;
			if (employeeId) {
				if (employeeId.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.empIdCollection.push(employeeId);
				}
			}
		}
	}
	deleteItemAndCloseModel() {
		this.isSaving = true;
		this.sourceAction.updatedBy = this.userName;
		this.employeeService.deleteEmployee(this.sourceAction.employeeId).subscribe(
			response => this.saveCompleted(this.sourceAction),
			error => this.saveFailedHelper(error));
		this.modal.close();
	}
	filterEmployees(event) {

		this.localCollection = [];
		for (let i = 0; i < this.allEmployeeinfo.length; i++) {
			let employeeName = this.allEmployeeinfo[i].employeeName;
			if (employeeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.localCollection.push(employeeName);
			}
		}
	}

	dismissModel() {
		this.isDeleteMode = false;
		this.isEditMode = false;
		this.modal.close();
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

		this.loadData();
	}

	private saveSuccessHelper(role?: any) {
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

	private loadManagementdata() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.workFlowtService1.getManagemententity().subscribe(
			results => this.onManagemtntdataLoad(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onManagemtntdataLoad(getAtaMainList: any[]) {
		// alert('success');
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getAtaMainList;
		this.allManagemtninfo = getAtaMainList;
		for (let i = 0; i < this.allManagemtninfo.length; i++) {

			if (this.allManagemtninfo[i].parentId == null) {
				this.maincompanylist.push(this.allManagemtninfo[i]);

			}
		}

        this.setManagementStrucureData(this.sourceEmployee);
	}
	

    getBUList(companyId) {
        if (this.updateMode == false) {
            this.sourceEmployee.buisinessUnitId = "";
            this.sourceEmployee.departmentId = "";
            this.sourceEmployee.divisionId = "";
            this.sourceEmployee.managementStructureId = companyId;
            this.departmentList = [];
            this.divisionlist = [];
            this.bulist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == companyId) {
                    this.bulist.push(this.allManagemtninfo[i])
                }
            }

        }
        else {
            this.departmentList = [];
            this.divisionlist = [];
            this.bulist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == companyId) {
                    this.bulist.push(this.allManagemtninfo[i])
                }
            }
        }
    }

    getDepartmentlist(businessUnitId) {
        if (this.updateMode == false) {
            this.sourceEmployee.departmentId = "";
            this.sourceEmployee.divisionId = "";
            this.sourceEmployee.managementStructureId = businessUnitId;
            this.departmentList = [];
            this.divisionlist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == businessUnitId) {
                    this.departmentList.push(this.allManagemtninfo[i]);
                }
            }

        }
        else {
            this.departmentList = [];
            this.divisionlist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == businessUnitId) {
                    this.departmentList.push(this.allManagemtninfo[i]);
                }
            }
        }
    }

    getDivisionlist(departmentId) {
        if (this.updateMode == false) {
            this.sourceEmployee.divisionId = "";
            this.sourceEmployee.managementStructureId = departmentId;
            this.divisionlist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == departmentId) {
                    this.divisionlist.push(this.allManagemtninfo[i]);
                }
            }
        }
        else {
            this.divisionlist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == departmentId) {
                    this.divisionlist.push(this.allManagemtninfo[i]);
                }
            }
        }
    }

    divisionChange(divisionId) {
        this.sourceEmployee.managementStructureId = divisionId;
    }



	private multiLeavelist() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;

		this.employeeService.getEmployeeLeaveType().subscribe(
			results => this.onmultiLeavedata(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}
	nextClick() {
		this.employeeService.listCollection = this.local;
		this.activeIndex = 1;
		this.employeeService.indexObj.next(this.activeIndex);
		this.route.navigateByUrl('/employeesmodule/employeepages/app-employee-certification');

	}
	public AddLeavedata(imObj) {
		for (let i = 0; i < this.selectedLeaveValues.length; i++) {
			imObj.employeeLeaveTypeId = this.selectedLeaveValues[i];
			this.employeeService.Addmultileaves(imObj).subscribe(data => {
				this.localCollection = data;
			})
		}
	}
	public AddShiftsdata(employeeObject) {
		for (let i = 0; i < this.selectedshiftValues.length; i++) {
			employeeObject.employeeShiftId = this.selectedshiftValues[i];
			this.employeeService.AddShifts(employeeObject).subscribe(data => {
				this.localCollection = data;
			})
		}
    }

    setManagementStrucureData(obj) {
        this.managementStructureData = [];
        this.checkMSParents(obj.managementStructureId);
        if (this.managementStructureData.length == 4) {
            this.sourceEmployee.companyId = this.managementStructureData[3];
            this.sourceEmployee.buisinessUnitId = this.managementStructureData[2];
            this.sourceEmployee.departmentId = this.managementStructureData[1];
            this.sourceEmployee.divisionId = this.managementStructureData[0];
            this.getBUList(this.sourceEmployee.companyId);
            this.getDepartmentlist(this.sourceEmployee.buisinessUnitId);
            this.getDivisionlist(this.sourceEmployee.departmentId);
        }
        if (this.managementStructureData.length == 3) {
            this.sourceEmployee.companyId = this.managementStructureData[2];
            this.sourceEmployee.buisinessUnitId = this.managementStructureData[1];
            this.sourceEmployee.departmentId = this.managementStructureData[0];
            this.getBUList(this.sourceEmployee.companyId);
            this.getDepartmentlist(this.sourceEmployee.buisinessUnitId);
        }
        if (this.managementStructureData.length == 2) {
            this.sourceEmployee.companyId = this.managementStructureData[1];
            this.sourceEmployee.buisinessUnitId = this.managementStructureData[0];
            this.getBUList(this.sourceEmployee.companyId);
        }
        if (this.managementStructureData.length == 1) {
            this.sourceEmployee.companyId = this.managementStructureData[0];
        }

    }

    checkMSParents(msId) {
        this.managementStructureData.push(msId);
        for (let a = 0; a < this.allManagemtninfo.length; a++) {
            if (this.allManagemtninfo[a].managementStructureId == msId) {
                if (this.allManagemtninfo[a].parentId) {
                    this.checkMSParents(this.allManagemtninfo[a].parentId);
                    break;
                }
            }
        }

    }
    onKeyUpFirstNames(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedFirstName) {
                if (value == this.selectedFirstName.toLowerCase()) {
                    this.disableSaveFirstName = true;

                }
                else {
                    this.disableSaveFirstName = false;

                }
            }

        }
    }

    onSelectFirstName(event) {
        if (this.allEmployeeinfo) {
            for (let i = 0; i < this.allEmployeeinfo.length; i++) {
                if (event == this.allEmployeeinfo[i].firstName) {
                    this.sourceEmployee.firstName = event;
                    this.disableSaveFirstName = true;

                    this.selectedFirstName = event;
                }

            }
        }
    }

    onKeyUpMiddleNames(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.disableSaveName) {
                if (value == this.disableSaveName.toLowerCase()) {
                    this.disableSaveMiddleName = true;

                }
                else {
                    this.disableSaveMiddleName = false;

                }
            }

        }
    }

    onSelectMiddleName(event) {
        if (this.allEmployeeinfo) {
            for (let i = 0; i < this.allEmployeeinfo.length; i++) {
                if (event == this.allEmployeeinfo[i].middleName) {
                    this.sourceEmployee.middleName = event;
                    this.disableSaveMiddleName = true;

                    this.disableSaveName = event;
                }

            }
        }
    }

    onKeyUpLastNames(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.disableSaveName) {
                if (value == this.disableSaveName.toLowerCase()) {
                    this.disableSaveLastName = true;

                }
                else {
                    this.disableSaveLastName = false;

                }
            }

        }
    }

    onSelectLastName(event) {
        if (this.allEmployeeinfo) {
            for (let i = 0; i < this.allEmployeeinfo.length; i++) {
                if (event == this.allEmployeeinfo[i].lastName) {
                    this.sourceEmployee.lastName = event;
                    this.disableSaveLastName = true;

                    this.disableSaveName = event;
                }

            }
        }
    }
    onKeyUpLeaveNames(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.disableSaveName) {
                if (value == this.disableSaveName.toLowerCase()) {
                    this.disableSaveLeaveName = true;

                }
                else {
                    this.disableSaveLeaveName = false;

                }
            }

        }
    }

    onSelectLeaveName(event) {
        if (this.allLeaves) {
            for (let i = 0; i < this.allLeaves.length; i++) {
                if (event == this.allLeaves[i].description) {
                    this.sourceEmployee.description = event;
                    this.disableSaveLeaveName = true;

                    this.disableSaveName = event;
                }

            }
        }
    }


    onKeyJob(event)
    {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {
                    this.disableJobTitle = true;
                }
                else {
                    this.disableJobTitle = false;
                }
            }

        }
    }

    onSelectJob(event)
    {
        if (this.allJobTitlesinfo) {
            for (let i = 0; i < this.allJobTitlesinfo.length; i++) {
                if (event == this.allJobTitlesinfo[i].description) {
                    this.sourceEmployee.jobName = event;
                    this.disableJobTitle = true;
                    this.selectedActionName = event;
                }
            }
        }
    }

    onKeyUpExp(event) {
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {
                    this.disableExpTitle = true;
                }
                else {
                    this.disableExpTitle = false;
                }
            }

        }
    }

    onSelectExp(event) {
        if (this.allEmployeeExpertiseInfo) {
            for (let i = 0; i < this.allEmployeeExpertiseInfo.length; i++) {
                if (event == this.allEmployeeExpertiseInfo[i].description) {
                    this.sourceEmployee.employeeName = event;
                    this.disableExpTitle = true;
                    this.selectedActionName = event;
                }
            }
        }
    }
}
