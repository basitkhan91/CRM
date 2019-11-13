import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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
import { AppTranslationService } from '../../../../services/app-translation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UnitOfMeasureService } from '../../../../services/unitofmeasure.service';

import { LocalStoreManager } from '../../../../services/local-store-manager.service';
//import { EmployeeAddService } from '../../../../services/employee.Add.Service';
import { DBkeys } from '../../../../services/db-Keys';

import { User } from '../../../../models/user.model';
import { ItemMasterService } from '../../../../services/itemMaster.service';



@Component({
    selector: 'app-employee-training',
    templateUrl: './employee-training.component.html',
    styleUrls: ['./employee-training.component.scss'],
    animations: [fadeInOut]
})

export class EmployeeTrainingComponent implements OnInit, AfterViewInit {
	
	activeIndex: number;
	alltrainingTypes: any[];
	allPurchaseUnitOfMeasureinfo: any[];
	localunit: any[];
    manufacturerData: any;

	ngOnInit(): void {
		this.employeeService.currentUrl = '/employeesmodule/employeepages/app-employee-training';
		this.employeeService.bredcrumbObj.next(this.employeeService.currentUrl);
		this.employeeService.ShowPtab = true;
		this.employeeService.alertObj.next(this.employeeService.ShowPtab); //steps
        if (this.local) {
			this.loadData();
			
        }
		this.loadTariningTypes();
        this.Purchaseunitofmeasure();
        this.getAllAircraftManfacturer();
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns = ['employeeId', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'];
    dataSource: MatTableDataSource<any>;
    allEmployeeinfo: any[] = [];
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
    local: any;
    modal: NgbModalRef;
    employeeName: string;
    filteredBrands: any[];
    localCollection: any[] = [];
    sourceEmployee: any = {};
    public allWorkFlows: any[] = [];

    public empId: any;
    public firstName: any;
    public lastName: any;
    public nextbuttonEnable = false;
    public userA: any;

    /** Actions ctor */

    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
    Active: string = "Active";
    constructor(private route: ActivatedRoute, private itemser: ItemMasterService, private translationService: AppTranslationService, public unitService: UnitOfMeasureService, public authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, private router: Router, public employeeService: EmployeeService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService, private localStorage: LocalStoreManager,) {
        this.displayedColumns.push('action');
		this.dataSource = new MatTableDataSource();
		if (this.employeeService.generalCollection) {
			this.local = this.employeeService.generalCollection;
		}
		if (this.employeeService.listCollection && this.employeeService.isEditMode == true) {
            this.sourceEmployee = this.employeeService.listCollection;
            this.empId = this.sourceEmployee.employeeId;
            if (this.sourceEmployee.employeeId) {
                this.nextbuttonEnable = true;

            }
            this.firstName = this.sourceEmployee.firstName;
            this.lastName = this.sourceEmployee.lastName;
            console.log(this.sourceEmployee.employeeTrainingTypeId);

            console.log("traingi");
            console.log(this.sourceEmployee );
			this.local = this.employeeService.listCollection;
            this.loadData();
        }
        let user = this.localStorage.getDataObject<User>(DBkeys.CURRENT_USER);
        this.userA = user.userName;
		this.translationService.closeCmpny = false;
    }
    
    ngAfterViewInit() {

        this.route.queryParams
            .filter(params => params.order)
            .subscribe(params => {
                console.log(params); // {order: "popular"}
                //  console.log(params.order);
                this.empId = params.order;

                this.empId = params.order;

                if (this.empId) {
                    this.nextbuttonEnable = true;

                }
                else {
                    console.log('no buttion')
                }
                this.firstName = params.firstname;
                this.lastName = params.lastname;
                console.log(this.empId);
            });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
  

    private loadData() {

        console.log("this.empId"+this.empId);
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.employeeService.getTrainingList(this.empId).subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

        this.cols = [
            { field: 'aircraftModelId', header: 'AircraftModel' },
            { field: 'scheduleDate', header: 'Schedule Date' },
            { field: 'frequencyOfTraining', header: 'Frequency Of Training' },
            { field: 'completionDate', header: 'Completion Date' },
            { field: 'cost', header: 'cost' },
            { field: 'duration', header: 'Duration' },
            { field: 'provider', header: 'Provider' },
            { field: 'industryCode', header: 'Industry Code' },
            { field: 'expirationDate', header: 'Expiration Date' }, 
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
            { field: 'updatedDate', header: 'Updated Date' },
            { field: 'createdDate', header: 'Created Date' }
        ];

        this.selectedColumns = this.cols;

	}
	private loadTariningTypes() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.employeeService.getTrainingTypes().subscribe(
			results => this.onTariningTypesData(results[0]),
			error => this.onDataLoadFailed(error)
		);
    }
    
    getAllAircraftManfacturer() {
        this.itemser.getAircraft().subscribe(res => {
            this.manufacturerData = res[0].map(x => {
                return {
                    value: x.aircraftTypeId, label: x.description
                }
            })
        });
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
    private onDataLoadSuccessful(getTrainingList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getTrainingList;
		this.allEmployeeinfo = getTrainingList;
        if (this.allEmployeeinfo.length > 0) {

            
            this.sourceEmployee = this.allEmployeeinfo[0].t;
            console.log(this.sourceEmployee);
			this.sourceEmployee.scheduleDate = new Date(this.sourceEmployee.scheduleDate);
			this.sourceEmployee.completionDate = new Date(this.sourceEmployee.completionDate);
            this.sourceEmployee.expirationDate = new Date(this.sourceEmployee.expirationDate);
            this.sourceEmployee.aircraftModelId = this.sourceEmployee.aircraftModelId;

            console.log(" this.sourceEmployee.aircraftModelId" + this.sourceEmployee.aircraftModelId);
            
		}
    }

	private onTariningTypesData(getTrainingList: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = getTrainingList;
		this.alltrainingTypes = getTrainingList;
			
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

	private onDataPurchaseunitSuccessful(getUnitOfMeasureList: any) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allPurchaseUnitOfMeasureinfo = getUnitOfMeasureList;

	}
	private Purchaseunitofmeasure() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.unitService.getUnitOfMeasureList().subscribe(
			results => this.onDataPurchaseunitSuccessful(results[0]),
			error => this.onDataLoadFailed(error)
		);

	}

	filterPurchaseUnitOfMeasures(event) {
		this.localunit = [];
		if (this.allPurchaseUnitOfMeasureinfo) {
			for (let i = 0; i < this.allPurchaseUnitOfMeasureinfo.length; i++) {
				let unitName = this.allPurchaseUnitOfMeasureinfo[i].description;
				if (unitName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.localunit.push(unitName);
				}
			}
		}
	}

    open(content) {
        this.isEditMode = false;
        this.isDeleteMode = false;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction.isActive = true;
        this.employeeName = "";
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

    savetrainigSection() {

        console.log();

        if (!this.sourceEmployee.employeeTrainingTypeId) {


            this.alertService.showMessage("Failure", `Training Type Required`, MessageSeverity.success);

        }
        else {
            console.log("trainig id  exists");
            if (!this.sourceEmployee.employeeTrainingId) {
                this.sourceEmployee.createdBy = this.userName;
                this.sourceEmployee.updatedBy = this.userName;
                this.sourceEmployee.masterCompanyId = 1;
                this.sourceEmployee.isActive = true;
                this.sourceEmployee.employeeId = this.empId;
                this.sourceEmployee.createdBy = this.userA;
                this.sourceEmployee.updatedBy = this.userA;

                this.employeeService.newAddTraining(this.sourceEmployee).subscribe(
                    role => this.saveSuccessHelper(role),
                    error => this.saveFailedHelper(error));

            }
            else {
                this.sourceEmployee.updatedBy = this.userName;
                this.sourceEmployee.masterCompanyId = 1;
                this.employeeService.updateTrainingDetails(this.sourceEmployee).subscribe(
                    response => this.saveCompleted(this.sourceEmployee),
                    error => this.saveFailedHelper(error));
            }

        }
    
    }


    editTrainAndCloseModel() {
        this.isSaving = true;
        if (!this.sourceEmployee.employeeTrainingId) {
            this.sourceEmployee.createdBy = this.userName;
            this.sourceEmployee.updatedBy = this.userName;
			this.sourceEmployee.masterCompanyId = 1;
			this.sourceEmployee.isActive = true;
			this.sourceEmployee.employeeId = this.local.employeeId;
            this.employeeService.newAddTraining(this.sourceEmployee).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {

            this.sourceEmployee.updatedBy = this.userName;
            this.sourceEmployee.masterCompanyId = 1;
            this.employeeService.updateTrainingDetails(this.sourceEmployee).subscribe(
                response => this.saveCompleted(this.sourceEmployee),
                error => this.saveFailedHelper(error));
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

	previousClick() {
		this.employeeService.listCollection = this.local;
		this.activeIndex = 1;
		this.employeeService.indexObj.next(this.activeIndex);
		//this.saveCompleted(this.sourceCustomer);
		this.router.navigateByUrl('/employeesmodule/employeepages/app-employee-certification');

	}
}