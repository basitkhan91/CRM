import { Component, OnInit,  ViewChild } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { CreditTermsService } from '../../services/Credit Terms.service';
import { AlertService,  MessageSeverity } from '../../services/alert.service';
import { CreditTerms } from '../../models/credit-terms.model';
import { AuthService } from '../../services/auth.service';
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";

import { Table } from 'primeng/table';
import { ConditionService } from '../../services/condition.service';
import { PercentageService } from '../../services/percentage.service';
import { validateRecordExistsOrNot, getObjectById, getObjectByValue, selectedValueValidate, editValueAssignByCondition } from '../../generic/autocomplete';

@Component({
    selector: 'app-credit-terms',
    templateUrl: './credit-terms.component.html',
    styleUrls: ['./credit-terms.component.scss'],
    animations: [fadeInOut]
})


export class CreditTermsComponent implements OnInit {
    selectedActionName: any;
    actionamecolle: any[] = [];
    selectedColumns: any[];
 
    isEditMode: boolean = false;

    selectedColumn: any[];
    filteredBrands: any[];
    localCollection: any[] = [];
    Active: string = "Active";

    viewRowData: any;
    auditHistory: any;
    selectedRowforDelete: any;
    percentageList:any[];
    dayList:number[]=[];
    netDayList:number[]=[];
    creditTermData: any;
    creditTermsList: any;
    creditTermHeaders = [

        { field: 'name', header: 'Credit Term Name' },
        { field: 'percentage', header: 'Percentage' },
        { field: 'days', header: 'Days' },
        { field: 'netDays', header: 'Net Days' },
        { field: 'memo', header: 'Memo' },

    ];
    totalRecords: any;
    pageIndex: number = 0;
    pageSize: number = 10;
    totalPages: number;
    @ViewChild('dt')
    private table: Table;
    selectedRecordForEdit: any;
    newCreditTerm =
        {
            name: "",
            percentage: 0,
            days: 0,
            netDays:0,
            masterCompanyId: 1,
            isActive: true,
            isDelete: false,
            memo: ""
        };
    addNewCreditTerm= { ...this.newCreditTerm };
    disableSaveForCreditTerm: boolean;
    /** credit terms ctor */
    constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private alertService: AlertService,
        public percentageService: PercentageService, public creditTermService: CreditTermsService) {


    }
    ngOnInit(): void {
        this.selectedColumns = this.creditTermHeaders;
        this.getCreditTermList();
        this.getPercentageList();
        this.setDays();
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-credit-terms';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
    }


    columnsChanges() {
        this.refreshList();
    }
    private getCreditTermList() {
        this.creditTermService.getCreditTermsList().subscribe(res => {
            const respData = res[0];
            this.creditTermData = respData.columnData;
            this.totalRecords = respData.totalRecords;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        });
    }

    private getPercentageList() {
        this.percentageService.getPercentageList().subscribe(res => {
            const respData = res[0];
            this.percentageList= respData;
        });
    }
    private setDays(){
        const DAYCOUNT=360;
        for(var i = 0; i <= DAYCOUNT; i++){
            this.dayList.push(i);
            this.netDayList.push(i);

         }
    }

    resetCreditTermsForm() {
        this.isEditMode = false;
        this.disableSaveForCreditTerm = false;

        this.selectedRecordForEdit = undefined;
        this.addNewCreditTerm = { ...this.newCreditTerm };
    }

    changeStatus(rowData) {
        console.log(rowData);
        const data = { ...rowData }
        this.creditTermService.updatecreditterms(data).subscribe(() => {
            // this.getUOMList();
            this.alertService.showMessage(
                'Success',
                `Updated Status Successfully  `,
                MessageSeverity.success
            );
        })

    }

    filterCreditTerms(event) {
        this.creditTermsList = this.creditTermData;

        const CREDITTERMDATA = [...this.creditTermData.filter(x => {
            return x.name.toLowerCase().includes(event.query.toLowerCase())
        })]
        this.creditTermsList = CREDITTERMDATA;
    }

    checkCreditTermExists(field, value) {
        const exists = validateRecordExistsOrNot(field, value, this.creditTermData, this.selectedRecordForEdit);
        if (exists.length > 0) {
            this.disableSaveForCreditTerm = true;
        }
        else {
            this.disableSaveForCreditTerm = false;
        }

    }
    selectedCreditTerm(object) {
        const exists = selectedValueValidate('name', object, this.selectedRecordForEdit)

        this.disableSaveForCreditTerm = !exists;
    }


    refreshList() {
        this.table.reset();
        this.getCreditTermList();
    }

    delete(rowData) {
        this.selectedRowforDelete = rowData;

    }
    deleteConformation(value) {
        if (value === 'Yes') {
            this.creditTermService.deletecreditterms(this.selectedRowforDelete.creditTermsId).subscribe(() => {
                this.getCreditTermList();
                this.alertService.showMessage(
                    'Success',
                    `Deleted Credit Term Successfully  `,
                    MessageSeverity.success
                );
            })
        } else {
            this.selectedRowforDelete = undefined;
        }
    }

    viewSelectedRow(rowData) {
        console.log(rowData);
        this.viewRowData = rowData;
    }

    resetViewData() {
        this.viewRowData = undefined;
    }
    edit(rowData) {
        console.log(rowData);
        this.isEditMode = true;
        this.disableSaveForCreditTerm = false;
        this.addNewCreditTerm = { ...rowData, name: getObjectById('creditTermsId', rowData.creditTermsId, this.creditTermData) };
        this.selectedRecordForEdit = { ...this.addNewCreditTerm }
        console.log(this.addNewCreditTerm);
    }

    saveCreditTerms() {
        const data = {
            ...this.addNewCreditTerm, createdBy: this.userName, updatedBy: this.userName,
            name: editValueAssignByCondition('name', this.addNewCreditTerm.name)

        };
        if (!this.isEditMode) {
            this.creditTermService.newAddcreditterms(data).subscribe(() => {
                this.resetCreditTermsForm();
                this.getCreditTermList();
                this.alertService.showMessage(
                    'Success',
                    `Added  New Credit Term Successfully`,
                    MessageSeverity.success
                );
            })
        } else {
            this.creditTermService.updatecreditterms(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEditMode = false;
                this.resetCreditTermsForm();
                this.getCreditTermList();
                this.alertService.showMessage(
                    'Success',
                    `Updated Credit Term Successfully`,
                    MessageSeverity.success
                );
            })
        }
    }




    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }


    getAuditHistoryById(rowData) {
        this.creditTermService.getCreditTermsAudit(rowData.creditTermsId).subscribe(res => {
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

    changePage(event: { first: any; rows: number }) {
        console.log(event);
        const pageIndex = (event.first / event.rows);
        // this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }

}
