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
import { Router } from '@angular/router';
import { AppTranslationService } from '../../../services/app-translation.service';
import { CertificationtypeService } from '../../../services/certificationtype.service';
import { CertificationType } from '../../../models/certificationtype.model';



@Component({
	selector: 'app-employee-certification',
	templateUrl: './employee-certification.component.html',
	styleUrls: ['./employee-certification.component.scss'],
	animations: [fadeInOut]
})

export class EmployeeCertificationComponent implements OnInit, AfterViewInit {
	activeIndex: number;
	data: any;
    disablesave: boolean;
	selecteddescription: any;
	allCertification: any[];
	descriptioncolle: any[] = [];
    description: any;
    certificationtypeCollection: any[];
    display: boolean;
    modelValue: boolean;
    employeeLicenseTypeId: any;
    certificationTypeId: any;	
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
	/** Actions ctor */

	private isEditMode: boolean = false;
	private isDeleteMode: boolean = false;
    Active: string = "Active";
    public allWorkFlows: any[] = [];
	constructor(private translationService: AppTranslationService, public certificationser: CertificationtypeService, private router: Router, public authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public employeeService: EmployeeService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
		this.displayedColumns.push('action');
		this.dataSource = new MatTableDataSource();


		if (this.employeeService.generalCollection) {

			this.local = this.employeeService.generalCollection;
		}
		if (this.employeeService.listCollection && this.employeeService.isEditMode == true) {
			//debugger;
			this.sourceEmployee = this.employeeService.listCollection;
			this.local = this.employeeService.listCollection;
			this.sourceEmployee.certificationDate = new Date();
			this.getwithemployeeLicensureId();
		}
		
	}
		sourceEmployee: any = {};
		ngAfterViewInit() {
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		}
    
    ngOnInit(): void {
        this.employeeService.currentUrl = '/employeesmodule/employeepages/app-employee-certification';
        this.employeeService.bredcrumbObj.next(this.employeeService.currentUrl);
        this.employeeService.ShowPtab = true;
        this.employeeService.alertObj.next(this.employeeService.ShowPtab); //steps
        if (this.local) {
            this.loadData();
            this.loadDataforCertification();
        }
    }
    // Load Employee lcience data//
	private getwithemployeeLicensureId() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.employeeService.getCertificationList(this.local.employeeId).subscribe(
			results => this.onCertifywithEmpId(results[0]),
			error => this.onDataLoadFailed(error)
		);

		this.cols = [
			{ field: 'licenseNumber', header: 'Certification' },
			{ field: 'employeeLicenseTypeId', header: 'Certification Type' },
			{ field: 'certifyingInstitution', header: 'Certification Institution' },
			{ field: 'certificationDate', header: 'certification Date' },
			{ field: 'isLicenseInForce', header: 'Certification In Force' },
			{ field: 'createdBy', header: 'Created By' },
			{ field: 'updatedBy', header: 'Updated By' },
			{ field: 'updatedDate', header: 'Updated Date' },
			{ field: 'createdDate', header: 'Created Date' }
		];

		this.selectedColumns = this.cols;

	}

    // Load Emp list
    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.employeeService.getEmployeeList().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

    }

    // Load Master Cpmpanies
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
    private onDataLoadSuccessful(getCertificationList: any[]) {

        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = getCertificationList;
		this.allEmployeeinfo = getCertificationList;
		
	}
	private loadDataforCertification() {
		this.alertService.startLoadingMessage();
		this.loadingIndicator = true;
		this.certificationser.getWorkFlows().subscribe(
			results => this.onDataLoadSuccessfulforCertification(results[0]),
			error => this.onDataLoadFailed(error)
		);
	}

	private onDataLoadSuccessfulforCertification(allWorkFlows: any[]) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.allCertification = allWorkFlows;

	}


	private onCertifywithEmpId(certfilist: any) {
		this.alertService.stopLoadingMessage();
		this.loadingIndicator = false;
		this.dataSource.data = certfilist;
		this.data = certfilist;
		if (this.data.length>0) {
			this.sourceEmployee = this.data[0].t;
			this.sourceEmployee.certificationDate = new Date(this.sourceEmployee.certificationDate);
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

   
    editItemAndCloseModel() {
        this.isSaving = true;
		if (!this.sourceEmployee.employeeLicensureId) {			
				this.sourceEmployee.createdBy = this.userName;
				this.sourceEmployee.updatedBy = this.userName;
				this.sourceEmployee.isActive = true;
				this.sourceEmployee.masterCompanyId = 1;
				this.sourceEmployee.employeeId = this.local.employeeId;
				this.employeeService.newAddCertification(this.sourceEmployee).subscribe(
					data => {
						this.localCollection = data;
						this.employeeService.generalCollection = this.local;
                })

            response => this.saveCompleted(this.sourceEmployee)
				this.activeIndex = 1;
				this.employeeService.indexObj.next(this.activeIndex);
			
		}
        else {

            this.sourceEmployee.updatedBy = this.userName;
			this.sourceEmployee.masterCompanyId = 1;
			this.employeeService.updateCertificationDetails(this.sourceEmployee).subscribe(data => {
				this.employeeService.generalCollection = this.local;
            })

            response => this.saveCompleted(this.sourceEmployee)
			this.activeIndex = 1;
			this.employeeService.indexObj.next(this.activeIndex);
			
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
	nextClick() {
		this.employeeService.listCollection = this.local;
		this.activeIndex = 2;
		this.employeeService.indexObj.next(this.activeIndex);
		this.router.navigateByUrl('/employeesmodule/employeepages/app-employee-training');

	}
	previousClick() {
		this.employeeService.listCollection = this.local;
		this.activeIndex = 0;
		this.employeeService.indexObj.next(this.activeIndex);
		this.router.navigateByUrl('/employeesmodule/employeepages/app-employee-general-information');

	}
	certificationType(event) {
		
		if (this.allCertification) {

			for (let i = 0; i < this.allCertification.length; i++) {
				if (event == this.allCertification[i].employeeLicensureId) {
					this.disablesave = true;
					this.selecteddescription = event;
				}

			}
		}
	}
	certificationHandlerHandler(event) {
		if (event.target.value != "") {
			let value = event.target.value.toLowerCase();
			if (this.selecteddescription) {
				if (value == this.selecteddescription.toLowerCase()) {
					//alert("Action Name already Exists");
					this.disablesave = true;

				}
				else {
					this.disablesave = false;

				}
			}

		}
	}
	filtercertificationType(event) {
		
		this.certificationtypeCollection = [];
		for (let i = 0; i < this.allCertification.length; i++) {
			let description = this.allCertification[i].description;
			if (description.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.descriptioncolle.push([{
					"employeeLicensureId": this.allCertification[i].employeeLicensureId,
					"description": description
				}]),
					this.certificationtypeCollection.push(description);
			}
		}
	}
	saveCertification() {
	    this.isSaving = true;
		if (this.isEditMode == false) {
			this.sourceEmployee.createdBy = this.userName;
			this.sourceEmployee.updatedBy = this.userName;
			this.sourceEmployee.description = this.description;
			this.sourceEmployee.masterCompanyId = 1;
			this.certificationser.newCertificationtype(this.sourceEmployee).subscribe(data => {
				this.loadDataforCertification();

				this.sourceEmployee.employeeLicensureId = data.employeeLicensureId;

			});
		}
			else {

				this.sourceEmployee.updatedBy = this.userName;
				this.sourceEmployee.description = this.description;
				this.sourceEmployee.masterCompanyId = 1;
				this.certificationser.updateCertificationtype(this.sourceEmployee).subscribe(
					response => this.saveCompleted(this.sourceEmployee),
					error => this.saveFailedHelper(error));
			}

			this.modal.close();
		}
	
	openCertification(content) {
		this.disablesave = false;
		this.isEditMode = false;
		this.isDeleteMode = false;
		this.disablesave = false;
		this.isSaving = true;
		this.loadMasterCompanies();
		this.sourceEmployee = new CertificationType();
		this.description = "";
		this.sourceEmployee.isActive = true;
		this.modal = this.modalService.open(content, { size: 'sm' });
		this.modal.result.then(() => {
            console.log('When user closes');
		}, () => { console.log('Backdrop click') })
	}


}