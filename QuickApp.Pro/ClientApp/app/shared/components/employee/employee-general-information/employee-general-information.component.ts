import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
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
import { JobTitle } from '../../../../models/jobtitle.model';
import { JobType } from '../../../../models/jobtype.model';
import { JobTitleService } from '../../../../services/job-title.service';
import { JobTypeService } from '../../../../services/job-type.service';
import { EmployeeExpertiseService } from '../../../../services/employeeexpertise.service';
import { EmployeeExpertise } from '../../../../models/employeeexpertise.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { AppTranslationService } from '../../../../services/app-translation.service';
import * as moment from 'moment'
import { CalendarModule } from 'primeng/calendar';
import { LegalEntityService } from '../../../../services/legalentity.service';
import { EmployeeLeaveType } from '../../../../models/EmployeeLeaveTypeModel';
import { LocalStoreManager } from '../../../../services/local-store-manager.service';
//import { EmployeeAddService } from '../../../services/employee.Add.Service';
import { DBkeys } from '../../../../services/db-Keys';

import { User } from '../../../../models/user.model';


import { CompanyService } from '../../../../services/company.service';



@Component({
    selector: 'app-employee-general-information',
    templateUrl: './employee-general-information.component.html',
    styleUrls: ['./employee-general-information.component.scss'],
    animations: [fadeInOut]
})

export class EmployeeGeneralInformationComponent implements OnInit, AfterViewInit {


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
    allJobTypesinfo: JobType[];
    jobName: string;
    _divisionlist: any[];
    _departmentList: any[];
    leavemultiValues: any[] = [];
    allLeaveDetails: any[];
    selectedshiftValues: any[];
    sessionShiftValues: any[];
    allShiftValues: any[] = [];
    collectionofItemMaster: any;
    allleaveInfo: any[] = [];
    selectedLeaveValues: any[];
    sessionLeaveValues: any[];
    description: any;
    localleaveCollection: any[] = [];
    allLeavesinfo: EmployeeLeaveType[];
    employeeLeaveTypeId: any;
    allmultiLeaves: any[];
    allMultipleLeaves: any[] = [];
    managementStructureData: any[];
    selectedFirstName: any;
    disableSaveFirstName: boolean;
    disableSaveMiddleName: boolean;
    disableSaveName: any;
    disableSaveLastName: boolean;
    disableSaveLeaveName: boolean;
    selectedActionName: any;
    disableJobTitle: boolean = true;
    disableJobType: boolean = true;
    disableExpTitle: boolean;
    display: boolean = false;
    modelValue: boolean = false;

    public empId: any;
    public firstName: any;
    public lastName: any;

    public jobTypeName: any;
    public jobTypeDescription: any;
    employeeIdTemp = "create"




    ngOnInit(): void {


        this.employeeService.currentUrl = '/employeesmodule/employeepages/app-employee-general-information';
        this.employeeService.bredcrumbObj.next(this.employeeService.currentUrl);
        this.employeeService.ShowPtab = true;
        this.employeeService.alertObj.next(this.employeeService.ShowPtab); //steps
        this.activeIndex = 0;
        this.employeeService.indexObj.next(this.activeIndex);
        // this.sourceEmployee.employeeId = 1;
        this.loadManagementdata();
        this.loadData();
        this.loadJobtitlesData();
        this.loademployeesexperties();
        this.multiLeavelist();
        this.EmployeeTrainingType();
        this.shift();
        this.Countries();
        this.EmployeeLeaveType();
        this.loadjobtypesData();
        this.loadLegalEntityData();

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
    alllegalEntityInfo: any[] = [];
    maincompanylist: any[] = [];
    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    desableJobTypeSave: boolean = true;
    departmentList: any[] = [];
    bulist: any[] = [];
    divisionlist: any[] = [];
    Active: string = "Active";
    allAircraftManufacturer: any[] = [];
    sourceEmployee: any = {};
    updateMode: boolean = false;
    showMsg: boolean = false;
    showTitle: string;
    sourceEmpFirst: {
        firstName: any;
    };
    sourceEmpLast: {
        lastName: any;
    };
    public userInfo: any;
    public userA: any;
    public companylist: any;
    public supervisorId: any = 0;


    empCreationForm = new FormGroup({
        firstname: new FormControl('firstName', Validators.minLength(1)),
        middleName: new FormControl('middleName', Validators.minLength(1)),
        lastName: new FormControl('lastName', Validators.minLength(1)),
        jobTitleId: new FormControl('jobTitleId', Validators.minLength(1)),
        employeeExpertiseId: new FormControl('employeeExpertiseId', Validators.minLength(1)),
        JobTypeId: new FormControl('JobTypeId', Validators.minLength(1)),
        companyId: new FormControl('companyId', Validators.minLength(1)),
        startDate: new FormControl('companyId', Validators.minLength(1)),

    });


    constructor(private fb: FormBuilder, private Actroute: ActivatedRoute, private translationService: AppTranslationService, private router: Router, public jobTypeService: JobTypeService, public jobTitleService: JobTitleService, private empservice: EmployeeExpertiseService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private route: Router, private alertService: AlertService, public employeeService: EmployeeService, public jobTitleService1: LegalEntityService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private localStorage: LocalStoreManager, private companyService: CompanyService) {
        this.displayedColumns.push('action');

        //new emp form

        // this.empCreationForm.controls['companyId'].patchValue('0');

        this.loadCompanyData()

        let user = this.localStorage.getDataObject<User>(DBkeys.CURRENT_USER);

        console.log("user:" + user.userName)

        this.userA = user.userName;


        //console.log(
        // this.userInfo[0].name);

        this.empCreationForm = fb.group({
            'firstName': [null, Validators.compose([Validators.required, Validators.minLength(1), this.checkfirstNameExists('firstName')])],
            'middleName': [null],
            'lastName': [null, Validators.compose([Validators.required, Validators.minLength(1), this.checklasttNameExists('lastName')])],
            'jobTitleId': [0, Validators.compose([Validators.required, Validators.minLength(1)])],
            'employeeExpertiseId': [0, Validators.compose([Validators.required, Validators.minLength(1)])],
            'JobTypeId': [0, Validators.compose([Validators.required, Validators.minLength(1)])],
            'companyId': [0, Validators.compose([Validators.required, Validators.minLength(1)])],
            'startDate': [0, Validators.compose([Validators.required, Validators.minLength(1)])],
            'BusinessUnitId': [0],
            'divisionId': [0],
            'departmentId': [0],
            'email': [null, Validators.compose([Validators.pattern('[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}')])],




        });


        const control = new FormControl('1', Validators.pattern('[a-zA-Z ]*'));

        this.dataSource = new MatTableDataSource();

        if (this.employeeService.listCollection != null && this.employeeService.isEditMode == true) {

            if (this.sourceEmployee.employeeId) {
                this.empId = this.sourceEmployee.employeeId;
            }



            this.sourceEmployee = this.employeeService.listCollection;

            this.empCreationForm.controls['jobTitleId'].setValue(this.sourceEmployee.jobTitleId);


            this.empCreationForm.controls['employeeExpertiseId'].setValue(this.sourceEmployee.employeeExpertiseId);
            this.empCreationForm.controls['JobTypeId'].setValue(this.sourceEmployee.jobTypeId);
            this.supervisorId = this.sourceEmployee.supervisorId;





            this.updateMode = true;
            this.sourceEmployee.startDate = new Date(this.sourceEmployee.startDate);
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
                this.sourceEmployee.yearlypayType = "Monthly";
                this.sourceEmployee.yearlypayType = "Yearly";
                this.yearly = true
            }
        }
        this.translationService.closeCmpny = false;

        this.Actroute.queryParams
            .filter(params => params.order)
            .subscribe(params => {
                console.log(params); // {order: "popular"}
                //  console.log(params.order);
                this.empId = params.order;
                this.firstName = params.firstname;
                this.lastName = params.lastname;
                console.log(params.order);

                if (this.empId != undefined || this.empId != null) {
                    console.log("haviing emp Id value");
                    this.employeeService.getEmployeeListforView(this.empId).subscribe(
                        results => this.getEmpInfo(results),

                        error => this.onDataLoadFailed(error)
                    );


                }

            });

        //new code




    }

    loadLegalEntityData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.jobTitleService1.getManagemtentLengalEntityData().subscribe(
            results => this.onManagemtntlegaldataLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    private onManagemtntlegaldataLoad(getAtaMainList: any[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.alllegalEntityInfo = getAtaMainList;
        for (let i = 0; i < this.alllegalEntityInfo.length; i++) {

            if (this.alllegalEntityInfo[i].parentId == null) {
                this.maincompanylist.push(this.alllegalEntityInfo[i]);

            }
        }

    }


    loadCompanyData() {

        this.companyService.getallCompanyData().subscribe(
            results => this.assigninCOmpanyData(results),

            error => this.onDataLoadFailed(error)
        );

    }

    assigninCOmpanyData(results: any) {
        console.log("results")
        this.companylist = results[0];
        console.log("companylist")
        console.log(this.companylist)
    }

    onSelectMethod(event) {
        let d = new Date(Date.parse(event));
        this.sourceEmployee.dateOfBirth = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    }
    checkfirstName(value) {



        const arr = this.allEmployeeinfo;

        console.log(arr.find(e => e.firstName === value));

        return arr.find(e => e.firstName === value);



    }

    checklastName(value) {

        const arr = this.allEmployeeinfo;

        console.log(arr.find(e => e.lastName === value));

        return arr.find(e => e.lastName === value);

    }
    checkfirstNameExists(field_name): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (this.allEmployeeinfo) {
                console.log(control.value);

                var res = this.checkfirstName(control.value);
                var msg = true;

                if (res == undefined) {

                    return null;
                }
                else {

                    return { notSame: true }

                }






                //console.log("hellox");

            }

        }
    }
    checklasttNameExists(field_name): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (this.allEmployeeinfo) {
                console.log(control.value);

                var res = this.checklastName(control.value);
                var msg = true;

                if (res == undefined) {

                    return null;
                }
                else {

                    return { notSame: true }

                }






                //console.log("hellox");

            }

        }
    }

    getEmpInfo(res: any) {
        console.log("getEmpInfo");
        console.log(res[0][0]);

        this.sourceEmployee = res[0][0];
        this.empCreationForm.patchValue({
            employeeExpertiseId: res[0][0].employeeExpertiseId,
            JobTypeId: res[0][0].jobTypeId,
            jobTitleId: res[0][0].jobTitleId,
            startDate: new Date(res[0][0].startDate)
        });
        this.sourceEmployee.startDate = new Date(res[0][0].startDate);

        console.log(res[0][0].firstName);
        this.sourceEmpFirst.firstName = res[0][0].firstName;
        console.log(res[0][0].firstName);
        console.log(this.sourceEmpFirst.firstName);
        this.sourceEmpLast.lastName = res[0][0].lastName;

    }




    onSubmit2() {




        console.log(this.empCreationForm);

        this.supervisorId;
        this.sourceEmployee.firstName = this.empCreationForm.get('firstName').value;
        this.sourceEmployee.lastName = this.empCreationForm.get('lastName').value;
        this.sourceEmployee.middleName = this.empCreationForm.get('middleName').value;
        this.sourceEmployee.jobTitleId = this.empCreationForm.get('jobTitleId').value;
        this.sourceEmployee.employeeExpertiseId = this.empCreationForm.get('employeeExpertiseId').value;
        this.sourceEmployee.JobTypeId = this.empCreationForm.get('JobTypeId').value;

        this.sourceEmployee.startDate = this.empCreationForm.get('startDate').value;
        this.sourceEmployee.SupervisorId = this.supervisorId;


        this.selectedshiftValues.push(this.sourceEmployee.shifId);



        console.log("hourlyPay:" + this.sourceEmployee.hourlyPay);
        console.log("isHourly:" + this.sourceEmployee.isHourly);


        this.sourceEmployee.ShiftId = this.selectedshiftValues;






        if (this.sourceEmployee.hourlypayType == "Hourly") {

            this.sourceEmployee.IsHourly = true;
            this.sourceEmployee.HourlyPay = this.sourceEmployee.hourlyPay;

        }

        if (this.sourceEmployee.hourlypayType == "Monthly") {
            this.sourceEmployee.IsHourly = false;
            this.sourceEmployee.HourlyPay = this.sourceEmployee.hourlyPay;
        }
        this.sourceEmployee.createdBy = this.userA;
        this.sourceEmployee.updatedBy = this.userA;


        if (this.sourceEmployee.dateOfBirth == undefined) {

            this.sourceEmployee.dateOfBirth = null;
        }
        // if (this.sourceEmployee.firstName !== '' && this.sourceEmployee.lastName && this.sourceEmployee.middleName && this.sourceEmployee.jobTitleId && this.sourceEmployee.employeeExpertiseId && this.sourceEmployee.JobTypeId
        //     && this.sourceEmployee.startDate
        // ) {




        if (this.empCreationForm.get('departmentId').value != null && this.empCreationForm.get('departmentId').value >0) {

            this.sourceEmployee.managementStructureId = this.empCreationForm.get('departmentId').value;

        }
        else if (this.empCreationForm.get('divisionId').value != null && this.sourceEmployee.departmentId == '' && this.sourceEmployee.departmentId>0) {

            this.sourceEmployee.managementStructureId = this.empCreationForm.get('divisionId').value;
        }
        else if (this.empCreationForm.get('BusinessUnitId').value != null && this.sourceEmployee.departmentId == '' && this.sourceEmployee.divisionId == '' && this.sourceEmployee.divisionId >0) {
            this.sourceEmployee.managementStructureId = this.empCreationForm.get('BusinessUnitId').value;
        }
        else {

            this.sourceEmployee.managementStructureId = this.empCreationForm.get('companyId').value;
        }
        
       

        if (this.sourceEmployee.employeeId) {
            this.sourceEmployee.IsHourly = this.sourceEmployee.isHourly;

            this.employeeService.updateEmployee(this.sourceEmployee).subscribe(
                results => {
                    this.employeeService.employeeStored = results;
                    this.empUpdate(this.sourceEmployee, results),
                        this.employeeLeavetypeUpdate(this.sourceEmployee.employeeId);
                    //this.employeeShifttypeAdd(this.sourceEmployee.employeeId);
                    this.employeeShifttypeUpdate(this.sourceEmployee.employeeId);
                },

                error => this.onDataLoadFailed(error)
            );
        }
        else {
        console.log(this.sourceEmployee.ShiftId);

        if (this.sourceEmployee.shifId !== undefined) {
            this.selectedshiftValues.push(this.sourceEmployee.shifId);
            this.sourceEmployee.ShiftId = this.selectedshiftValues;
        }



            this.sourceEmployee.employeeLeaveTypeId = this.selectedLeaveValues;

            this.employeeService.newAddEmployee(this.sourceEmployee).subscribe(
                results => {
                    this.employeeService.employeeStored = results;
                    this.empAdd(this.sourceEmployee, results);

                    this.employeeLeavetypeAdd(results.employeeId);
                    this.employeeShifttypeAdd(results.employeeId);

                }

                ,

                error => this.onDataLoadFailed(error)
            );
        }


    }
    removeEmployeeLevaes() {
        for (var i = 0; i < this.sessionLeaveValues.length; i++) {

            var selectedLevae = this.sessionLeaveValues[i];
            console.log("selected remove Levae" + selectedLevae);
            var selectedLeaveValues = this.selectedLeaveValues;


            if (selectedLeaveValues.indexOf(selectedLevae) !== -1) {
                console.log("remove value exists");
            } else {

                this.leaveTypeValueRemoved(selectedLevae);
                console.log("remove value Does notexists");
                //alert("Value does not exists!")
            };


        }


    }
    leaveTypeValueRemoved(selectedLevae) {
        if (this.sourceEmployee.employeeId) {
            console.log(this.sourceEmployee)
            this.employeeService.updateEmployee(this.sourceEmployee).subscribe(

                results => {
                    this.empUpdate(this.sourceEmployee, results),

                        //console.log("value to be removed" + selectedLevae);
                        this.sourceEmployee.LeaveTypeId = selectedLevae;
                    this.sourceEmployee.EmployeeId = this.sourceEmployee.employeeId;
                    this.employeeService.employeeLeavetypeRemove(this.sourceEmployee).subscribe(
                        results => {
                            console.log("Leave value added sucessfully")
                        },
                        error => this.onDataLoadFailed(error))
                });

        }
    }

        shiftTypeValueRemoved(selectedLevae) {

            console.log("value to be removed shift " + selectedLevae);
            this.sourceEmployee.ShiftTypeId = selectedLevae;
            this.sourceEmployee.EmployeeId = this.sourceEmployee.employeeId;

            this.employeeService.employeeshifttypeRemove(this.sourceEmployee).subscribe(
                results => {
                    console.log("Leave value removed sucessfully")
                },

                error => this.onDataLoadFailed(error)
            );

        }
    removeEmployeeShiftValues() {
        for (var i = 0; i < this.sessionShiftValues.length; i++) {

            var selectedShift = this.sessionShiftValues[i];
            console.log("selected remove Levae" + selectedShift);
            var selectedshiftValues = this.selectedshiftValues;


            if (selectedshiftValues.indexOf(selectedShift) !== -1) {
                console.log("remove value exists");
            } else {

             //   this.shiftTypeValueRemoved(selectedShift);
                console.log("remove value Does notexists");
                //alert("Value does not exists!")
            };
        }

    }

    employeeShifttypeUpdate(empId) {
        console.log(empId);
        console.log(this.selectedshiftValues);

        console.log(this.sessionShiftValues);
      //  this.removeEmployeeShiftValues();
        for (var i = 0; i < this.selectedshiftValues.length; i++) {

            var selectedLevae = this.selectedshiftValues[i];
            console.log("selectedShift" + selectedLevae);
            var sessionValues = this.sessionShiftValues;

            if (sessionValues.indexOf(selectedLevae) !== -1) {

                if (selectedLevae != 0) {
                    this.newShiftValuetobeAdded(selectedLevae);

                }
              
                console.log("value shift exists");
            } else {

                if (selectedLevae != 0) {
                    this.newShiftValuetobeAdded(selectedLevae);
                }

            
                console.log("value shift Does notexists");
                //alert("Value does not exists!")
            };

        }

        console.log("this.selectedshiftValues" + this.selectedshiftValues);

    }


    newShiftValuetobeAdded(selectedLevae) {

        console.log("shift value to be added" + selectedLevae)

        if (selectedLevae !=null) {
            this.sourceEmployee.ShiftTypeId = selectedLevae;
            this.sourceEmployee.EmployeeId = this.sourceEmployee.employeeId;

            this.employeeService.employeeShifttypeAdd(this.sourceEmployee).subscribe(
                results => {
                    console.log("shift value added sucessfully")
                },

                error => this.onDataLoadFailed(error)
            );
        }
      

    }


    employeeLeavetypeUpdate(empId) {
        this.selectedLeaveValues;

  
        this.removeEmployeeLevaes();
       
        console.log("selectedLevae" + selectedLevae);

        for (var i = 0; i < this.selectedLeaveValues.length; i++) {

            var selectedLevae = this.selectedLeaveValues[i];
            console.log("selectedLevae" + selectedLevae);
            var sessionValues = this.sessionLeaveValues;
       

            if (sessionValues.indexOf(selectedLevae) !== -1) {
                console.log("value exists");
            } else {

                this.newValuetobeAdded(selectedLevae);
                console.log("value Does notexists");
                //alert("Value does not exists!")
            };


        }

        
        console.log("selectedLeave Value session" +this.sessionLeaveValues);
        console.log("selectedLeave Value"+this.selectedLeaveValues);
        console.log(empId);

        var arr = this.sessionLeaveValues;
        var check = this.selectedLeaveValues;

        var found = false;
     

        // }
    }

    newValuetobeAdded(selectedLevae) {

        console.log(selectedLevae + "new entity to be added");

        this.sourceEmployee.LeaveTypeId = selectedLevae;
        this.sourceEmployee.EmployeeId = this.sourceEmployee.employeeId;

        this.employeeService.employeeLeavetypeAdd(this.sourceEmployee).subscribe(
            results => {
                console.log("Leave value added sucessfully")
            },

            error => this.onDataLoadFailed(error)
        );

    }




    employeeShifttypeAdd(employeeId) {


        console.log("shiftValuesLength:" + this.selectedshiftValues.length);

        for (var i = 0; i < this.selectedshiftValues.length; i++) {
            console.log("i" + i);
            console.log("this.shiftValues[i]" + this.selectedshiftValues[i]);

            var shiftTypeId = this.selectedshiftValues[i];

            if (shiftTypeId != null) {
                this.sourceEmployee.ShiftTypeId = shiftTypeId;
                this.sourceEmployee.EmployeeId = employeeId;

                this.employeeService.employeeShifttypeAdd(this.sourceEmployee).subscribe(
                    results => {
                        console.log("shift value added sucessfully")
                    },

                    error => this.onDataLoadFailed(error)
                );

            }



        }



    }
    employeeLeavetypeAdd(employeeId) {

        this.selectedLeaveValues = this.selectedLeaveValues.filter((el, i, a) => i === a.indexOf(el));

        this.selectedLeaveValues;

        console.log("Length:" + this.selectedLeaveValues.length);

        for (var i = 0; i < this.selectedLeaveValues.length; i++) {
            console.log("i" + i);
            console.log("this.selectedLeaveValues[i]" + this.selectedLeaveValues[i]);

            var leaveTypeId = this.selectedLeaveValues[i];

            this.sourceEmployee.LeaveTypeId = leaveTypeId;
            this.sourceEmployee.EmployeeId = employeeId;

            this.employeeService.employeeLeavetypeAdd(this.sourceEmployee).subscribe(
                results => {
                    console.log("Leave value added sucessfully")
                },

                error => this.onDataLoadFailed(error)
            );

        }



    }

    onSubmit() {
        this.sourceEmployee.firstName;

              this.employeeService.newAddEmployee(this.sourceEmployee).subscribe(
            results => this.empAdd(this.sourceEmployee, results),

            error => this.onDataLoadFailed(error)
        );
    }


        empUpdate(obj: any, res: any) {
            this.showMsg = true;
            //this.sourceEmployee.reser

            // if (res.employeeId) {
            this.empId = res.employeeId;
            console.log(res.employeeId);
            this.firstName = res.firstName;
            this.lastName = res.lastName;

            console.log(this.empId);
            this.showTitle = 'Employee Updated Sucessfully';

            ///this.sourceEmployee.reset();
            // this.nextClick();
            this.router.navigate(['/employeesmodule/employeepages/app-employee-certification'])
            this.alertService.showMessage("Success", this.showTitle, MessageSeverity.success);
            this.activeIndex = 1;
            this.employeeService.indexObj.next(this.activeIndex);
            //this.nextClick();
            this.sourceEmpFirst = null;
            //window.location.reload();

            this.loadData();

            // }
            // else {
            //     this.showTitle = 'Some thing went wrong please try again later';

            //     ///this.sourceEmployee.reset();
            //     this.alertService.showMessage("Failure", this.showTitle, MessageSeverity.success);

            // }


        }
    empAdd(obj: any, res: any) {

        this.showMsg = true;
        //this.sourceEmployee.reser

        if (res.employeeId) {
            this.empId = res.employeeId;
            console.log(res.employeeId);
            this.firstName = res.firstName;
            this.lastName = res.lastName;

            console.log(this.empId);
            this.showTitle = 'Employee Added Sucessfully';

            ///this.sourceEmployee.reset();
            this.alertService.showMessage("Success", this.showTitle, MessageSeverity.success);
            this.nextClick();
            this.sourceEmpFirst = null;
            //window.location.reload();

            this.loadData();

        }
        else {
            this.showTitle = 'Some thing went wrong please try again later';

            ///this.sourceEmployee.reset();
            this.alertService.showMessage("Failure", this.showTitle, MessageSeverity.success);

        }


    }



    singleClick(click) {
        if (click == 'single') {
            this.showsingle = true;
            this.showMultiple = false;
            this.sourceEmployee.inMultipleShifts = false;
            this.sourceEmployee.inMultipleShifts = true;

        }
        if (click == 'multiple') {
            this.showMultiple = true;
            this.showsingle = false;
            this.sourceEmployee.inMultipleShifts = true;
            this.sourceEmployee.inMultipleShifts = false;
        }

    }
    // paytypeclick(click) {
    //     if (click == 'hourly') {
    //         this.hourly = true;
    //         this.yearly = false;
    //         this.sourceEmployee.isHourly = true;
    //     }
    //     if (click == 'monthly') {
    //        // if (click == 'yearly') {
    //             this.yearly = true;
    //             this.hourly = false;
    //             this.sourceEmployee.isHourly = false;
    //        // }

    //     }
    // }



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

        console.log("leave type()")
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
        console.log("this.allEmployeeinfo")
        console.log(this.allEmployeeinfo);
    }
    private onLeavedata(getEmployeeCerficationList: any[]) {
        console.log("on levae data");
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getEmployeeCerficationList;
        this.allLeaves = getEmployeeCerficationList;
        //   this.leavemultiValues = getEmployeeCerficationList;
        console.log(getEmployeeCerficationList);
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
                    this.sessionShiftValues = this.selectedshiftValues;
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
                    this.sessionLeaveValues = this.selectedLeaveValues;
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

        this.jobTitleService.getAllJobTitleList().subscribe(
            results => this.onJobtitlesDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    private loadjobtypesData() {

        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;


        this.jobTypeService.getAllJobTypeList().subscribe(
            results => this.onJobtypeDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    onJobtypeDataLoadSuccessful(jobTypes: JobType[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        console.log("Job Type Data")
        console.log(jobTypes);
        this.allJobTypesinfo = jobTypes
    }


    private onJobtitlesDataLoadSuccessful(jobTitles: JobTitle[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = jobTitles;
        this.allJobTitlesinfo = jobTitles;
    }



    filterJobs(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allJobTypesinfo.length; i++) {
            let jobName = this.allJobTypesinfo[i].jobTypeName;
            if (jobName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.localCollection.push(jobName);
            }
        }
    }

    filterEMpExpertise(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allEmployeeExpertiseInfo.length; i++) {
            let empExpertise = this.allEmployeeExpertiseInfo[i].description;
            if (empExpertise.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.localCollection.push(empExpertise);
            }
        }
    }

    filterJObTitles(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allJobTitlesinfo.length; i++) {
            let jobtitle = this.allJobTitlesinfo[i].description;
            if (jobtitle.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.localCollection.push(jobtitle);
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




    //private onHistoryLoadSuccessful(auditHistory: AuditHistory[], content) {
    //    this.alertService.stopLoadingMessage();
    //    this.loadingIndicator = false;
    //    this.auditHisory = auditHistory;
    //    this.modal = this.modalService.open(content, { size: 'lg' });
    //    this.modal.result.then(() => {
    //        console.log('When user closes');
    //    }, () => { console.log('Backdrop click') })


    //}

    //private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
    //    this.alertService.stopLoadingMessage();
    //    this.loadingIndicator = false;
    //    this.allComapnies = allComapnies;

    //}

    //private onDataLoadFailed(error: any) {
    //    this.alertService.stopLoadingMessage();
    //    this.loadingIndicator = false;

    //}
    //handleChange(rowData, e) {
    //    if (e.checked == false) {
    //        this.sourceAction = rowData;
    //        this.sourceAction.updatedBy = this.userName;
    //        this.Active = "In Active";
    //        this.sourceAction.isActive == false;
    //        this.employeeService.updateEmployee(this.sourceAction).subscribe(
    //            response => this.saveCompleted(this.sourceAction),
    //            error => this.saveFailedHelper(error));
    //    }
    //    else {
    //        this.sourceAction = rowData;
    //        this.sourceAction.updatedBy = this.userName;
    //        this.Active = "Active";
    //        this.sourceAction.isActive == true;
    //        this.employeeService.updateEmployee(this.sourceAction).subscribe(
    //            response => this.saveCompleted(this.sourceAction),
    //            error => this.saveFailedHelper(error));
    //    }

    //}

    //open(content) {
    //    this.isEditMode = false;
    //    this.isDeleteMode = false;
    //    this.isSaving = true;
    //    this.loadMasterCompanies();
    //    this.sourceAction.isActive = true;
    //    this.employeeName = "";
    //    this.modal = this.modalService.open(content, { size: 'lg' });
    //    this.modal.result.then(() => {
    //        console.log('When user closes');
    //    }, () => { console.log('Backdrop click') })
    //}



    //filterLeaves(event) {

    //    this.localleaveCollection = [];
    //    for (let i = 0; i < this.allLeaves.length; i++) {
    //        let description = this.allLeaves[i].description;
    //        if (description.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //            this.localleaveCollection.push(description);
    //        }
    //    }
    //}

    //private loademployeesexperties() {

    //    this.alertService.startLoadingMessage();
    //    this.loadingIndicator = true;

    //    this.empservice.getWorkFlows().subscribe(
    //        results => this.onEmpDataLoadSuccessful(results[0]),
    //        error => this.onDataLoadFailed(error)
    //    );

    //}
    //private onEmpDataLoadSuccessful(allWorkFlows: EmployeeExpertise[]) {
    //    // alert('success');
    //    this.alertService.stopLoadingMessage();
    //    this.loadingIndicator = false;
    //    this.dataSource.data = allWorkFlows;
    //    this.allEmployeeExpertiseInfo = allWorkFlows;
    //}


    //filterEmployeeNames(event) {

    //    this.localCollection = [];
    //    for (let i = 0; i < this.allEmployeeExpertiseInfo.length; i++) {
    //        let employeeName = this.allEmployeeExpertiseInfo[i].description;
    //        if (employeeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //            this.localCollection.push(employeeName);
    //        }
    //    }
    //}




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
    openjobtype(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        //this.sourceAction = new JobTitle();
        this.sourceAction = new JobType();
        this.sourceAction.isActive = true;
        this.jobName = "";
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

    //openLeaveType(content) {
    //    this.isEditMode = false;
    //    this.isDeleteMode = false;
    //    this.isSaving = true;
    //    this.loadMasterCompanies();
    //    this.sourceAction = new EmployeeLeaveType();
    //    this.sourceAction.isActive = true;
    //    this.description = "";
    //    this.modal = this.modalService.open(content, { size: 'sm' });
    //    this.modal.result.then(() => {
    //        console.log('When user closes');
    //    }, () => { console.log('Backdrop click') })
    //}


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
            //    console.log('When user closes');
            //}, () => { console.log('Backdrop click') })
            //    console.log('When user closes');
            //}, () => { console.log('Backdrop click') 
        });
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
            //    console.log('When user closes');
            //}, () => { console.log('Backdrop click') 
        });
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

    //openemployeeExpertise(content) {
    //    this.isEditMode = false;
    //    this.isDeleteMode = false;
    //    this.isSaving = true;
    //    this.loadMasterCompanies();
    //    this.sourceAction = new EmployeeExpertise();
    //    this.sourceAction.isActive = true;
    //    this.employeeName = "";
    //    this.modal = this.modalService.open(content, { size: 'sm' });
    //        this.modal.result.then(() => {
    //            //    console.log('When user closes');
    //            //}, () => { console.log('Backdrop click') 
    //        });
    //}


    

    openHist(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.sourceAction = row;
        this.employeeService.historyEmployee(this.sourceAction.employeeId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));
    }

    //openEdit(content, row) {
    //    this.isEditMode = true;
    //    this.isSaving = true;
    //    this.loadMasterCompanies();
    //    this.sourceAction = row;
    //    this.employeeName = this.sourceAction.employeeName;
    //    this.loadMasterCompanies();
    //    this.modal = this.modalService.open(content, { size: 'sm' });
    //        this.modal.result.then(() => {
    //            //    console.log('When user closes');
    //            //}, () => { console.log('Backdrop click') 
    //        });
    //}

    //openHelpText(content) {
    //    this.modal = this.modalService.open(content, { size: 'sm' });
    //    this.modal.result.then(() => {
    //        console.log('When user closes');
    //    }, () => { console.log('Backdrop click') })
    //}



    //openHist(content, row) {
    //    this.alertService.startLoadingMessage();
    //    this.loadingIndicator = true;
    //    this.sourceAction = row;
    //    this.employeeService.historyEmployee(this.sourceAction.employeeId).subscribe(
    //        results => this.onHistoryLoadSuccessful(results[0], content),
    //        error => this.saveFailedHelper(error));


    //}


    editItemAndCloseModel() {
        if (!(this.sourceEmployee.firstName && this.sourceEmployee.middleName && this.sourceEmployee.employeeIdAsPerPayroll && this.sourceEmployee.stationId
            && this.sourceEmployee.workPhone && this.sourceEmployee.employeeCertifyingStaff
        )) {
            this.display = true;
            this.modelValue = true;
        }
        if (this.sourceEmployee.firstName && this.sourceEmployee.middleName && this.sourceEmployee.employeeIdAsPerPayroll && this.sourceEmployee.stationId
            && this.sourceEmployee.workPhone && this.sourceEmployee.employeeCertifyingStaff
        ) {
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
        }

        this.multiLeavelist()
        //this.modal.close();
    }

    saveJobTitle() {
        this.sourceAction.createdBy = this.userA;
        this.sourceAction.updatedBy = this.userA;
        this.sourceAction.description = this.jobName;
        this.sourceAction.masterCompanyId = 1;
        console.log(this.sourceAction);
        this.sourceAction.description = this.jobName;
        console.log(this.sourceAction);
        this.jobTitleService.newJobTitle(this.sourceAction).subscribe(data => {
            this.loadJobtitlesData()
            this.showTitle = 'job Title Added Sucessfully';

            ///this.sourceEmployee.reset();
            this.alertService.showMessage("Success", this.showTitle, MessageSeverity.success);
        })
    }

    saveJobType() {

        console.log(this.jobTypeName);


        if (this.jobTypeName) {

            this.sourceAction.createdBy = this.userA;
            this.sourceAction.updatedBy = this.userA;
            this.sourceAction.jobTypeName = this.jobTypeName;
            this.sourceAction.jobTypeDescription = this.jobTypeDescription;
            this.sourceAction.masterCompanyId = 1;
            console.log(this.sourceAction);
            this.sourceAction.description = this.jobName;

            this.jobTypeService.newJobType(this.sourceAction).subscribe(data => {
                this.loadJobtitlesData()
                this.showTitle = 'job Type Added Sucessfully';
                this.loadjobtypesData();

                ///this.sourceEmployee.reset();
                this.alertService.showMessage("Success", this.showTitle, MessageSeverity.success);
            })
            console.log(this.jobTypeName);
            console.log(this.jobTypeDescription)

        }
        else {
            this.showTitle = 'Job Title Required';
            this.alertService.showMessage("Failure", this.showTitle, MessageSeverity.error);
        }

        // if (this.jobTypeName == null || this.jobTypeName == undefined) {




        // }
        //else {

        //  }




    }

    editItemJobCloseModel() {
        this.isSaving = true;

        if (this.isEditMode == false) {

            console.log(this.jobName);

            console.log("new action");
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.jobName;
            this.sourceAction.masterCompanyId = 1;
            console.log(this.sourceAction);
            this.sourceAction.jobTitleId = this.jobName;
            console.log(this.sourceAction);
            this.jobTitleService.newJobTitle(this.sourceAction).subscribe(data => { this.loadJobtitlesData() })
        }
        else {

            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.jobName;
            this.sourceAction.masterCompanyId = 1;
            this.jobTitleService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }
    }

    editItemLeaveCloseModel() {
        
        this.isSaving = true;
       
				 if (this.description.toLowerCase().trim()=="")
                 {
                     this.alertService.showMessage("Empty", 'Cannot Submit Empty', MessageSeverity.warn);
                     return;
                 }

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
            this.sourceAction.description = this.description;
            this.sourceAction.masterCompanyId = 1;
            this.employeeService.newActionforLeave(this.sourceAction).subscribe(data => {
                this.saveCompleted(this.sourceAction);
                this.sourceEmployee.employeeLeaveTypeId = data.employeeLeaveTypeId;
                this.EmployeeLeaveType();
                this.multiLeavelist();
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
                this.multiLeavelist();
            });

        }

        this.modal.close();
    }

    saveEmpExpertise() {
        this.sourceAction.createdBy = this.userName;
        this.sourceAction.updatedBy = this.userName;
        this.sourceAction.description = this.employeeName;
        this.sourceAction.masterCompanyId = 1;
        this.empservice.newAction(this.sourceAction).subscribe(data => {

            this.showTitle = 'Employee Expertise Added Sucessfully';

            ///this.sourceEmployee.reset();
            this.alertService.showMessage("Success", this.showTitle, MessageSeverity.success);
            this.loademployeesexperties()

        })
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
            this.jobTitleService.updateAction(this.sourceAction).subscribe(
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

        this.jobTitleService1.getManagemententity().subscribe(
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


        console.log("struckin");

        if (this.sourceEmployee.managmentLegalEntity != null && this.sourceEmployee.divmanagmentLegalEntity != null && this.sourceEmployee.biumanagmentLegalEntity != null && this.sourceEmployee.compmanagmentLegalEntity != null) {

            console.log("Buid" + this.sourceEmployee.biumanagmentLegalEntity.managementStructureId);

            this.empCreationForm.controls['companyId'].setValue(this.sourceEmployee.compmanagmentLegalEntity.managementStructureId);
            this.empCreationForm.controls['BusinessUnitId'].setValue(this.sourceEmployee.biumanagmentLegalEntity.managementStructureId);
            this.empCreationForm.controls['divisionId'].setValue(this.sourceEmployee.divmanagmentLegalEntity.managementStructureId);
            this.empCreationForm.controls['departmentId'].setValue(this.sourceEmployee.managementStructeInfo.managementStructureId);


        }
        else if (this.sourceEmployee.biumanagmentLegalEntity != null && this.sourceEmployee.divmanagmentLegalEntity != null && this.sourceEmployee.managmentLegalEntity != null) {

            this.empCreationForm.controls['companyId'].setValue(this.sourceEmployee.biumanagmentLegalEntity.managementStructureId);
            this.empCreationForm.controls['BusinessUnitId'].setValue(this.sourceEmployee.divmanagmentLegalEntity.managementStructureId);
            this.empCreationForm.controls['divisionId'].setValue(this.sourceEmployee.managmentLegalEntity.managementStructureId);





        }
        else if (this.sourceEmployee.divmanagmentLegalEntity != null && this.sourceEmployee.managmentLegalEntity != null) {

            this.empCreationForm.controls['companyId'].setValue(this.sourceEmployee.divmanagmentLegalEntity.managementStructureId);
            this.empCreationForm.controls['BusinessUnitId'].setValue(this.sourceEmployee.managmentLegalEntity.managementStructureId);

        }
        else if (this.sourceEmployee.managementStructeInfo != null) {

            this.empCreationForm.controls['companyId'].setValue(this.sourceEmployee.managmentLegalEntity.managementStructureId);



        }
        else {
            console.log("no Info Presnts")
        }

        this.setManagementStrucureData(this.sourceEmployee);
    }

    getBUList2(id) {

        var companyId = id;

        if (this.updateMode == false) {

            console.log("1screen");

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
            console.log("2screen");

            this.bulist = [];
            this.departmentList = [];
            this.divisionlist = [];
       


            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == companyId) {
                    this.bulist.push(this.allManagemtninfo[i])
                }
            }



        }
    }


    getBUList(event) {

        var companyId = this.empCreationForm.controls['companyId'].value;
    
            if (this.updateMode == false) {

                console.log("1screen");
             
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
                console.log("2screen");
                //this.empCreationForm.controls['BusinessUnitId'].setValue(null);

                //this.empCreationForm.controls['divisionId'].setValue(null);
                //this.empCreationForm.controls['departmentId'].setValue(null);
              //  this.sourceEmployee.buisinessUnitId = "";
            // this.sourceEmployee.departmentId = "";
              // this.sourceEmployee.divisionId = "";
                this.sourceEmployee.buisinessUnitId = null;

                console.log("BuId"+this.sourceEmployee.buisinessUnitId );
    
                this.empCreationForm.controls['BusinessUnitId'].setValue(null);
                this.empCreationForm.controls['divisionId'].setValue(null);
                this.empCreationForm.controls['departmentId'].setValue(null);
                this.sourceEmployee.departmentId = "";
                this.sourceEmployee.divisionId = "";
                this.sourceEmployee.buisinessUnitId = "";
                this.bulist = [];
                this.departmentList = [];
                this.divisionlist = [];
              


                for (let i = 0; i < this.allManagemtninfo.length; i++) {
                    if (this.allManagemtninfo[i].parentId == companyId) {
                        this.bulist.push(this.allManagemtninfo[i])
                    }
                }


            }


        
       

    }

    getDepartmentlist(value) {



        console.log("Department" + value);
        var splitted = value.split(": ");
        var businessUnitId = this.empCreationForm.controls['BusinessUnitId'].value;
        console.log(businessUnitId);
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

            console.log("page loading")
            this.empCreationForm.controls['divisionId'].setValue(null);
            this.empCreationForm.controls['departmentId'].setValue(null);
            this.sourceEmployee.departmentId = "";
            this.sourceEmployee.divisionId = "";
            this.departmentList = [];
            this.divisionlist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == businessUnitId) {
                    this.departmentList.push(this.allManagemtninfo[i]);
                }
            }
        }
    }



    getDepartmentlist2(value) {

        console.log("getDepartmentlist2" + value);

        if (this.updateMode == false) {
            this.sourceEmployee.departmentId = "";
            this.sourceEmployee.divisionId = "";
            this.sourceEmployee.managementStructureId = value;
            this.departmentList = [];
            this.divisionlist = [];


            for (let i = 0; i < this.allManagemtninfo.length; i++) {


                if (this.allManagemtninfo[i].parentId == value) {

                    this.departmentList.push(this.allManagemtninfo[i]);
                }
            }

        }
        else {
            this.departmentList = [];
            this.divisionlist = [];
            for (let i = 0; i < this.allManagemtninfo.length; i++) {
                if (this.allManagemtninfo[i].parentId == value) {
                    this.departmentList.push(this.allManagemtninfo[i]);
                }
            }
        }

    }

    getDivisionlist(value) {

        console.log("Division List" + value);

        var departmentId = this.empCreationForm.controls['divisionId'].value;;
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
        console.log("multList")
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.employeeService.getEmployeeLeaveType().subscribe(
            results => this.onmultiLeavedata(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    //	nextClick() {
    //this.employeeService.listCollection = this.local;
    //this.activeIndex = 1;
    //this.employeeService.indexObj.next(this.activeIndex);
    //	this.route.navigateByUrl('/employeesmodule/employeepages/app-employee-certification');
    //
    //}
    nextClick() {

        console.log("next Click")

        console.log(this.local);



        console.log(this.employeeService.listCollection);
        this.employeeService.listCollection = this.local;

        console.log(this.employeeService.listCollection);
        console.log(this.local);
        console.log(this.empId);
        this.activeIndex = 1;
        this.employeeService.indexObj.next(this.activeIndex);

        var data = { "empId": this.empId, "firstName": this.firstName, "lastName": this.lastName };

        console.log(data);

        var stringData = JSON.stringify(data);

        console.log(stringData)


        var encryptedData = btoa(JSON.stringify(data));

        console.log(encryptedData);



        this.route.navigate(['/employeesmodule/employeepages/app-employee-certification'], { queryParams: { order: this.empId, 'firstName': this.firstName, 'lastName': this.lastName }, skipLocationChange: true });
        // this.route.navigate(['/employeesmodule/employeepages/app-employee-certification'], { queryParams: { order: stringData } });

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
            this.getBUList2(this.sourceEmployee.companyId);
            this.getDepartmentlist2(this.sourceEmployee.buisinessUnitId);
            this.getDivisionlist(this.sourceEmployee.departmentId);
        }
        if (this.managementStructureData.length == 3) {
            this.sourceEmployee.companyId = this.managementStructureData[2];
            this.sourceEmployee.buisinessUnitId = this.managementStructureData[1];
            this.sourceEmployee.departmentId = this.managementStructureData[0];
            this.getBUList2(this.sourceEmployee.companyId);
            this.getDepartmentlist2(this.sourceEmployee.buisinessUnitId);
        }
        if (this.managementStructureData.length == 2) {
            this.sourceEmployee.companyId = this.managementStructureData[1];
            this.sourceEmployee.buisinessUnitId = this.managementStructureData[0];
            this.getBUList2(this.sourceEmployee.companyId);
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
            console.log(this.sourceEmployee.firstName);
            console.log(value);
            this.sourceEmployee.firstName = value;
            console.log(this.sourceEmployee.firstName);
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
    handlePayType(value) {
        //var target = evt.target.value;

        this.sourceEmployee.hourlyPay = null;
        this.sourceEmployee.hourlyPay = null;

        if (value == 'hourly') {
            this.hourly = true;
            this.yearly = false;
            this.sourceEmployee.isHourly = true;
        }
        if (value == 'monthly') {
           // if (click == 'yearly') {
                this.yearly = true;
                this.hourly = false;
                this.sourceEmployee.isHourly = false;
           // }

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
            this.sourceEmployee.lastName = value;
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

    onBlurLeaveName(event)
    {       
        if (event.target.value != "") {
            let value = event.target.value.toLowerCase();
            if (this.allLeaves) {
                for (let i = 0; i < this.allLeaves.length; i++) {
                    if (value == this.allLeaves[i].description) {
                        this.sourceEmployee.description = event;
                        this.disableSaveLeaveName = true;    
                        this.disableSaveName = event;
                    }
    
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


    onKeyJob(event) {
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

    onSelectJob(event) {
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

    onJobTypeKeyUP() {
        console.log(this.jobTypeName);
        if (this.jobTypeName != "") {
            this.disableJobType = false;
        } else {
            this.disableJobType = true;
        }
        
    }
    onEmpExpertiseKeyUP() {
        console.log(this.jobTypeName);
        if (this.employeeName != "") {
            this.disableExpTitle = false;
        } else {
            this.disableExpTitle = true;
        }

    }

    onjobTitleKeyUP() {
        console.log(this.jobTypeName);
        if (this.jobName != "") {
            this.disableJobTitle = false;
        } else {
            this.disableJobTitle = true;
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
