import { Component, OnInit } from '@angular/core';
import { AlertService } from "../../../../../services/alert.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { forEach } from "@angular/router/src/utils/collection";
import { SingleScreenAuditDetails, AuditChanges } from "../../../../../models/single-screen-audit-details.model";
import { AuthService } from "../../../../../services/auth.service";
import { JournelService } from "../../../../../services/journals/journals.service";
import { fadeInOut } from "../../../../../services/animations";
import { JournalManual } from '../../../../../models/journal-manual';
import { LegalEntityService } from '../../../../../services/legalentity.service';
import { EmployeeService } from '../../../../../services/employee.service';
import { Currency } from '../../../../../models/currency.model';
import { CurrencyService } from '../../../../../services/currency.service';

@Component({
    selector: 'app-create-journel',
    templateUrl: './create-journel.component.html',
    styleUrls: ['./create-journel.component.scss']
})
/** create-journel component*/
export class CreateJournelComponent implements OnInit
{

    divisionlist: any[];
    departmentList: any[];
    bulist: any[];
    accountNumberCollection: any[];
    accountNumberListForEntity: any;
    updateJournelButton: boolean;
    toggleRecurringGrid: boolean;
    toggleReversingGrid: boolean;
    allEmployeeinfo: any[] = [];
    firstCollection: any[];
    loadingIndicator: boolean;
    allCurrencyInfo: any[];
    EmployeeNamecoll: any[] = [];
    maincompanylist: any[] = [];
    allManagemtninfo: any[] = [];

    currentManualJournel: JournalManual;
    manualJournelToUpdate: JournalManual;
    manualJournelToRemove: JournalManual;
    manualJournelList: JournalManual[];
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;
    companyList: any[] = [];
    AddRors: Array<any> = [];

    /** create-journel ctor */
    constructor(public legalService: LegalEntityService,public currency: CurrencyService,public employeeService: EmployeeService,private legalEntityservice:LegalEntityService,private alertService: AlertService, private journelService: JournelService, private modalService: NgbModal, private authService: AuthService)
    {
        if (this.journelService.manulaJournelCollection)
        {
            this.currentManualJournel = this.journelService.manulaJournelCollection;

            if (this.currentManualJournel.journalManualEntryDate) {
                this.currentManualJournel.journalManualEntryDate = new Date(this.currentManualJournel.journalManualEntryDate);
            }

            if (this.currentManualJournel.journalManualEffectiveDate) {
                this.currentManualJournel.journalManualEffectiveDate = new Date(this.currentManualJournel.journalManualEffectiveDate);
            }

            if (this.currentManualJournel.journalManualCurrencyDate) {
              this.currentManualJournel.journalManualCurrencyDate = new Date(this.currentManualJournel.journalManualCurrencyDate);
            }

            if (this.currentManualJournel.journalManualReversingDate) {
                this.currentManualJournel.journalManualReversingDate = new Date(this.currentManualJournel.journalManualReversingDate);
            }

            this.updateJournelButton = true; 
        }
    }
    ngOnInit(): void
    {
        if (this.journelService.manulaJournelCollection == null) {
            this.currentManualJournel = new JournalManual();
        }

        this.loadCompaniesData();//loading for Company information
        this.CurrencyData();
        this.employeedata();
        this.loadManagementdata();
        this.Add();
    }
    private loadCompaniesData() {
        this.legalEntityservice.getEntityList().subscribe(entitydata => {
            this.companyList = entitydata[0];
        });
    }
    get userName(): string
    {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    addJournelManual(): void
    {
        this.currentManualJournel.createdBy = this.userName;
        this.currentManualJournel.updatedBy = this.userName;
        this.journelService.addJournel(this.currentManualJournel).subscribe(journel => {
            this.alertService.showMessage('Manual Journel added successfully.');
            //this.journelService.getAllJournel().subscribe(journel => {
            //    this.manualJournelList = journel[0];
            //});
            this.resetAddBatch();
        });
    }

    setManualJournlToUpdate(editManulaJournelPopup: any, id: number): void {
        this.manualJournelToUpdate = Object.assign({}, this.manualJournelList.filter(function (journel) {
            return journel.id == id;
        })[0]);
        this.modal = this.modalService.open(editManulaJournelPopup, { size: 'sm' });
    }

    updateManualJournel(): void {
        this.currentManualJournel.updatedBy = this.userName;
        this.journelService.updateJournel(this.currentManualJournel).subscribe(journel => {
            this.alertService.showMessage('Journel updated successfully.');
            this.journelService.getAllJournel().subscribe(journel => {
                this.manualJournelList = journel[0];
            });
            this.resetUpdateBatch();
            this.dismissModel();
        });
    }

    removeManualJournel(): void {
        this.journelService.removeJournel(this.manualJournelToRemove.id).subscribe(response => {
            this.alertService.showMessage("Journel removed successfully.");
            this.journelService.getAllJournel().subscribe(journels => {
                this.manualJournelList = journels[0];
                this.modal.close();
            });
        });

    }
    resetAddBatch(): void {
        this.currentManualJournel = new JournalManual();
    }

    resetUpdateBatch(): void {
        this.manualJournelToUpdate = new JournalManual();
    }

    Add() {
        this.AddRors.push({
            'Line 1': 1,
            'maincompanylist': this.maincompanylist,
            'bulist': this.bulist,
            'divisionlist': this.divisionlist,
            'departmentList': this.departmentList,
            'accountNumberCollection': this.accountNumberCollection
        })
    }
    dismissModel(): void {
        if (this.modal != undefined) {
            this.modal.close();
        }
    }

    confirmDelete(content, id): void {
        this.manualJournelToRemove = Object.assign({}, this.manualJournelList.filter(function (journel) {
            return journel.id == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm' });
    }

    toggleIsActive(manualJournelStatus: any, event): void {
        this.manualJournelToUpdate = manualJournelStatus;
        this.manualJournelToUpdate.isActive = event.checked == false ? false : true;
        this.updateManualJournel();
    }

    //Employee Data
    private employeedata() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.employeeService.getEmployeeList().subscribe(
            results => this.onempDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onempDataLoadSuccessful(getEmployeeCerficationList: any[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allEmployeeinfo = getEmployeeCerficationList;
    }

    
    filterfirstName(event) {
        this.firstCollection = [];
        for (let i = 0; i < this.allEmployeeinfo.length; i++) {
            let firstName = this.allEmployeeinfo[i].firstName;
            if (firstName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.EmployeeNamecoll.push([{
                    "employeeId": this.allEmployeeinfo[i].employeeId,
                    "employeeName": firstName
                }]),
                this.firstCollection.push(firstName);
            }
        }
    }

    onEmployeeselected(event)
    {
        for (let i = 0; i < this.EmployeeNamecoll.length; i++) {
            if (event == this.EmployeeNamecoll[i][0].employeeName)
            {
                this.currentManualJournel.journalManualEmployeeId = this.EmployeeNamecoll[i][0].employeeId;
            }

        }
    }

    private onDataLoadFailed(error: any) {

    }
    //Currency Data
    private CurrencyData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.currency.getCurrencyList().subscribe(
            results => this.oncurrencySuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }
    private oncurrencySuccessful(getCreditTermsList: Currency[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allCurrencyInfo = getCreditTermsList;
    }

    //show and Hide for Reversing and recurring

    toggleReversingData(data)
    {
        this.toggleReversingGrid = !this.toggleReversingGrid;
    }

    toggleRecurringData()
    {
        this.toggleRecurringGrid = !this.toggleRecurringGrid;
    }

    //get Legal Entity Data Based on ledger Selection

    getLegalEntityData(glAccountId)
    {
       this.accountNumberCollection = [];
        this.legalEntityservice.getEntityAccounts(glAccountId).subscribe(journels => {
            this.accountNumberListForEntity = journels[0][0];
            if (this.accountNumberListForEntity)
            {
                if (this.accountNumberListForEntity.accountNumber)
                {
                    this.accountNumberCollection.push({
                        "accountNO": this.accountNumberListForEntity.accountNumber,
                    })
                }
                if (this.accountNumberListForEntity.achAccountNumber) {
                    this.accountNumberCollection.push({
                        "accountNO": this.accountNumberListForEntity.achAccountNumber,
                    })
                }
                if (this.accountNumberListForEntity.beneficiaryBankAccount) {
                    this.accountNumberCollection.push({
                        "accountNO": this.accountNumberListForEntity.beneficiaryBankAccount,
                    })
                }
            }
        });
    }

    //company Data Handling

    private loadManagementdata()
    {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.legalService.getManagemententity().subscribe(
            results => this.onManagemtntdataLoad(results[0]),
            error => this.onDataLoadFailed(error)
        );
    }

    private onManagemtntdataLoad(getAtaMainList: any[])
    {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allManagemtninfo = getAtaMainList;
        for (let i = 0; i < this.allManagemtninfo.length; i++)
        {
            if (this.allManagemtninfo[i].parentId == null) {
                this.maincompanylist.push(this.allManagemtninfo[i]);
            }
        }
    }

    getBUList(companyId) {
        this.currentManualJournel.masterCompanyId = companyId; //Saving Management Structure Id if there Company Id
        this.bulist = [];
        this.departmentList = [];
        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == companyId) {
                this.bulist.push(this.allManagemtninfo[i]);
            }
        }
    }

    getDepartmentlist(businessUnitId) {
        this.currentManualJournel.masterCompanyId = businessUnitId;
        this.departmentList = [];
        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == businessUnitId) {
                this.departmentList.push(this.allManagemtninfo[i]);
            }
        }
    }

    getDivisionlist(departmentId) {
        this.currentManualJournel.masterCompanyId = departmentId;
        this.divisionlist = [];
        for (let i = 0; i < this.allManagemtninfo.length; i++) {
            if (this.allManagemtninfo[i].parentId == departmentId) {
                this.divisionlist.push(this.allManagemtninfo[i]);
            }
        }
    }
    getDivisionChangeManagementCode(divisionId) {
        this.currentManualJournel.masterCompanyId = divisionId;
    }

    localDebitCurrencyChange(amount)
    {
        this.currentManualJournel.journalManualReposrtingDebitCurrency = this.currentManualJournel.journalManualLocalDebitCurrency * this.currentManualJournel.journalManualcurrencyrate;
    }
}