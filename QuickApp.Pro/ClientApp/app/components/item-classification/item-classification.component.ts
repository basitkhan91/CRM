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

import { ItemClassificationService } from '../../services/item-classfication.service';
import { ItemClassificationModel } from '../../models/item-classification.model';
import { AuditHistory } from '../../models/audithistory.model';
import { MenuItem, LazyLoadEvent } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";

@Component({
    selector: 'app-item-classification',
    templateUrl: './item-classification.component.html',
    styleUrls: ['./item-classification.component.scss'],
    animations: [fadeInOut]
})
/** Actions component*/
export class ItemClassificationComponent implements OnInit, AfterViewInit {
    totelPages: number;
    itemClassificationPaginationList: any[] = [];
    event: any;
    itemClassification = [];
    itemTypeInputFieldValue: any;
    updatedByInputFieldValue: any;
    memoInputFieldValue: any;
    createdByInputFieldValue: any;
    descriptionInputFieldValue: any;
    matvhMode: any;
    field: any;
    itemClassificationCodeInputFieldValue: any;
    itemClassificationPagination: any;
    item_Name: any = "";
    description: any = "";
    itemType: any = "";
    memo: any = "";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    auditHisory: AuditHistory[];
    AuditDetails: SingleScreenAuditDetails[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    cols: any[];
    selectedColumns: any[];
    displayedColumns = ['itemclassificationId', 'itemclassificationCode', 'description', 'memo'];
    //, 'Sequence', 'createdBy', 'updatedBy', 'updatedDate', 'createdDate'
    dataSource: MatTableDataSource<ItemClassificationModel>;
    allitemclassificationInfo: ItemClassificationModel[] = [];
    allComapnies: MasterCompany[] = [];
	private isSaving: boolean;
	public sourceAction: any;
    private bodyText: string;
    loadingIndicator: boolean;
    closeResult: string;
    selectedColumn: ItemClassificationModel[];
    title: string = "Create";
    id: number;
    errorMessage: any;
    Active: string = "Active";
    modal: NgbModalRef;
    itemName: string;
    filteredBrands: any[];
	localCollection: any[] = [];
	localNameCollection: any[] = [];
	localtypeCollection: any[] = [];
    /** Actions ctor */
    selectedActionName: any;
    disableSave: boolean;
    actionamecolle: any[] = [];

    private isEditMode: boolean = false;
    private isDeleteMode: boolean = false;
	classnamecolle: any[] = [];
	classificationtypecolle: any[] = [];
	allitemclassnameinfo: ItemClassificationModel[];
	disableClassdesc: boolean = false;
    disabletypeSave: boolean;
    className: any;
    itemTypeName: any;

    pageSearch: { query: any; field: any; };
    first: number;
    rows: number;
    paginatorState: any;
    totalRecords: number;
    loading: boolean;

	constructor(private breadCrumb: SingleScreenBreadcrumbService, private authService: AuthService, private modalService: NgbModal, private activeModal: NgbActiveModal, private _fb: FormBuilder, private alertService: AlertService, public workFlowtService: ItemClassificationService, private dialog: MatDialog, private masterComapnyService: MasterComapnyService) {
        this.displayedColumns.push('action');
        this.dataSource = new MatTableDataSource();
        this.sourceAction = new ItemClassificationModel();

    }

    
    ngOnInit(): void {
        this.loadData();
        this.cols = [
            //{ field: 'itemClassificationId', header: 'Item Classification ID' },
            { field: 'itemClassificationCode', header: 'Item Classification Name' },
            { field: 'description', header: 'Item Classification Description' },
            { field: 'itemType', header: 'ItemType' },
            { field: 'memo', header: 'Memo' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'updatedBy', header: 'Updated By' },
           // { field: 'updatedDate', header: 'Updated Date' },
            //{ field: 'createdDate', header: 'Created Date' }
		];
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-item-classification';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        this.selectedColumns = this.cols;
    }




    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    public allWorkFlows: ItemClassificationModel[] = [];

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.workFlowtService.getWorkFlows().subscribe(
            results => this.onDataLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

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
    private onDataLoadSuccessful(allWorkFlows: ItemClassificationModel[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = allWorkFlows;
        this.totalRecords = allWorkFlows.length;
        this.allitemclassificationInfo = allWorkFlows;
    }

    private onDataMasterCompaniesLoadSuccessful(allComapnies: MasterCompany[]) {
        // alert('success');
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.allComapnies = allComapnies;

    }

    private onDataLoadFailed(error: any) {
        // alert(error);
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

    }

	open(content) {
		this.disableSave = false;
		this.disableClassdesc = false;
        this.isEditMode = false;
        this.isDeleteMode = false;
		this.disabletypeSave = false;
        this.isSaving = true;
        this.loadMasterCompanies();
		this.sourceAction = new ItemClassificationModel();
        this.sourceAction.isActive = true;
		this.itemName = "";
		this.className = "";
		this.itemTypeName = "";
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
		this.disableClassdesc = false;
		this.disableSave = false;
		this.disabletypeSave = false;
        this.isEditMode = true;
        this.isSaving = true;
        this.loadMasterCompanies();
        this.sourceAction = row;
		this.itemName = this.sourceAction.itemClassificationCode;
		this.className = this.sourceAction.description;
		this.itemTypeName = this.sourceAction.itemType;
        this.loadMasterCompanies();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }

    openHist(content, row) {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;


        this.sourceAction = row;



        this.isSaving = true;

        this.workFlowtService.historyAcion(this.sourceAction.itemClassificationId).subscribe(
            results => this.onHistoryLoadSuccessful(results[0], content),
            error => this.saveFailedHelper(error));


    }
        eventHandler(event) {
            let value = event.target.value.toLowerCase();
            if (this.selectedActionName) {
                if (value == this.selectedActionName.toLowerCase()) {
                    //alert("Action Name already Exists");
                    this.disableSave = true;
                }
                else {
                    this.disableSave = false;
                }
            }

	}
	classeventHandler(event) {
		let value = event.target.value.toLowerCase();
		if (this.selectedActionName) {
			if (value == this.selectedActionName.toLowerCase()) {
				//alert("Action Name already Exists");
				this.disableClassdesc = true;
			}
			else {
				this.disableClassdesc = false;
			}
		}

	}
	classeventtypeHandler(event) {
		let value = event.target.value.toLowerCase();
		if (this.selectedActionName) {
			if (value == this.selectedActionName.toLowerCase()) {
				//alert("Action Name already Exists");
				this.disabletypeSave = true;
			}
			else {
				this.disabletypeSave = false;
			}
		}

	}

        partnmId(event) {
            //debugger;
            for (let i = 0; i < this.actionamecolle.length; i++) {
                if (event == this.actionamecolle[i][0].itemName) {
                    //alert("Action Name already Exists");
                    this.disableSave = true;
                    this.selectedActionName = event;
                }
            }
        }
	classificationId(event) {
		//debugger;
		if (this.allitemclassificationInfo) {
			for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
				if (event == this.allitemclassificationInfo[i].description) {
					//alert("Action Name already Exists");
					this.disableClassdesc = true;
					this.selectedActionName = event;
				}
			}
		}
	}
	classificationtypeId(event) {
		//debugger;
		if (this.allitemclassificationInfo) {
			for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
				if (event == this.allitemclassificationInfo[i].itemType) {
					this.disabletypeSave = true;
					this.selectedActionName = event;
				}
			}
		}
	}
    filterItems(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
            let itemName = this.allitemclassificationInfo[i].itemClassificationCode;
            if (itemName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.actionamecolle.push([{
                    "itemClassificationId": this.allitemclassificationInfo[i].itemClassificationId,
                    "itemName": itemName
                }]),
                this.localCollection.push(itemName);
            }
        }
	}


	filterItemNames(event) {

		this.localNameCollection = [];
		if (this.allitemclassificationInfo) {
			for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
				let className = this.allitemclassificationInfo[i].description;
				if (className.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.classnamecolle.push([{
						"itemClassificationId": this.allitemclassificationInfo[i].itemClassificationId,
						"className": className
					}]),
						this.localNameCollection.push(className);
				}
			}
		}
	}
	filterItemtypes(event) {

		this.localtypeCollection = [];
		if (this.allitemclassificationInfo) {
			for (let i = 0; i < this.allitemclassificationInfo.length; i++) {
				let itemTypeName = this.allitemclassificationInfo[i].itemType;
				if (itemTypeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
					this.classificationtypecolle.push([{
						"itemClassificationId": this.allitemclassificationInfo[i].itemClassificationId,
						"itemTypeName": itemTypeName
					}]),
						this.localtypeCollection.push(itemTypeName);
				}
			}
		}
	}

    handleChange(rowData, e) {
        if (e.checked == false) {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "In Active";
            this.sourceAction.isActive == false;
            this.workFlowtService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
        }
        else {
            this.sourceAction = rowData;
            this.sourceAction.updatedBy = this.userName;
            this.Active = "Active";
            this.sourceAction.isActive == true;
            this.workFlowtService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
            //alert(e);
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


    editItemAndCloseModel() {

        this.isSaving = true;

        if (this.isEditMode == false) {
            this.sourceAction.createdBy = this.userName;
            this.sourceAction.updatedBy = this.userName;
			this.sourceAction.itemClassificationCode = this.itemName;
			this.sourceAction.description = this.className;
			this.sourceAction.itemType = this.itemTypeName;
            this.sourceAction.masterCompanyId = 1;
            this.workFlowtService.newAction(this.sourceAction).subscribe(
                role => this.saveSuccessHelper(role),
                error => this.saveFailedHelper(error));
        }
        else {

            this.sourceAction.updatedBy = this.userName;
			this.sourceAction.itemClassificationCode = this.itemName;
			this.sourceAction.description = this.className;
			this.sourceAction.itemType = this.itemTypeName;
            this.sourceAction.masterCompanyId = 1;
            this.workFlowtService.updateAction(this.sourceAction).subscribe(
                response => this.saveCompleted(this.sourceAction),
                error => this.saveFailedHelper(error));
        }

        this.modal.close();
    }

    deleteItemAndCloseModel() {
        this.isSaving = true;
        this.sourceAction.updatedBy = this.userName;
        this.workFlowtService.deleteAcion(this.sourceAction.itemClassificationId).subscribe(
            response => this.saveCompleted(this.sourceAction),
            error => this.saveFailedHelper(error));
        this.modal.close();
    }

    dismissModel() {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.modal.close();
    }

    private saveCompleted(user?: ItemClassificationModel) {
        this.isSaving = false;

        if (this.isDeleteMode == true) {
            this.alertService.showMessage("Success", `Action was deleted successfully`, MessageSeverity.success);
            this.isDeleteMode = false;
        }
        else {
            this.alertService.showMessage("Success", `Action was edited successfully`, MessageSeverity.success);

        }

        this.updatePaginatorState();
    }


    openView(content, row) {

        this.sourceAction = row;
        this.item_Name = row.itemClassificationCode;
        this.description = row.description;
        this.itemType = row.itemType;     
        this.memo = row.memo;
        this.createdBy = row.createdBy;
        this.updatedBy = row.updatedBy;
        this.createdDate = row.createdDate;
        this.updatedDate = row.updatedDate;
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

    private saveSuccessHelper(role?: ItemClassificationModel) {
        this.isSaving = false;
        this.alertService.showMessage("Success", `Action was created successfully`, MessageSeverity.success);

        this.updatePaginatorState();

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

    showAuditPopup(template, id): void {
        this.auditItemClassification(id);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    auditItemClassification(itemClassificationId: number): void {
        this.AuditDetails = [];
        this.workFlowtService.getItemClassificationAudit(itemClassificationId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["itemClassificationAuditId", "itemClassificationId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }

    loadItemClassification(event: LazyLoadEvent) //when page initilizes it will call this method
    {
        this.loading = true;
        this.rows = event.rows;
        this.first = event.first;

        if (this.field)
        {
            this.itemClassification.push({
                ItemClassificationCode: this.itemClassificationCodeInputFieldValue,
                Description: this.descriptionInputFieldValue,
                ItemType: this.itemTypeInputFieldValue,
                Memo: this.memoInputFieldValue,
                CreatedBy: this.createdByInputFieldValue,
                UpdatedBy: this.updatedByInputFieldValue,
                first: this.first,
                page: 10,
                pageCount: 10,
                rows: this.rows,
                limit: 5
            })
            if (this.itemClassification) {
                this.workFlowtService.getServerPages(this.itemClassification[this.itemClassification.length - 1]).subscribe( //we are sending event details to service
                    pages => {
                        this.itemClassificationPaginationList = pages;
                        this.itemClassificationPagination = this.itemClassificationPaginationList[0].itemClassificationList;
                        this.totalRecords = this.itemClassificationPaginationList[0].totalRecordsCount;
                        this.totelPages = Math.ceil(this.totalRecords / this.rows);
                    });
            }
            else {
            }
        }
        else {
            setTimeout(() => {
                if (this.allitemclassificationInfo) {
                    this.workFlowtService.getServerPages(event).subscribe( //we are sending event details to service
                        pages => {
                            this.itemClassificationPaginationList = pages;
                            this.itemClassificationPagination = this.itemClassificationPaginationList[0].itemClassificationList;
                            this.totalRecords = this.itemClassificationPaginationList[0].totalRecordsCount;
                            this.totelPages = Math.ceil(this.totalRecords / this.rows);
                        });
                    this.loading = false;
                }
            }, 1000);
        }
        
    }

    updatePaginatorState() //need to pass this Object after update or Delete to get Server Side pagination
    {
        this.paginatorState = {
            rows: this.rows,
            first: this.first
        }
        if (this.paginatorState) {
            this.loadItemClassification(this.paginatorState);
        }
    }

    inputFiledFilter(event, filed, matchMode) {
        this.first = 0;
        this.event = event;
        this.field = filed;
        this.matvhMode = matchMode;

        if (filed == 'itemClassificationCode') {
            this.itemClassificationCodeInputFieldValue = event;
        }
        if (filed == 'description') {
            this.descriptionInputFieldValue = event;
        }
        if (filed == 'itemType') {
            this.itemTypeInputFieldValue = event;
        }
        if (filed == 'memo') {
            this.memoInputFieldValue = event;
        }
        if (filed == 'createdBy') {
            this.createdByInputFieldValue = event;
        }
        if (filed == 'updatedBy') {
            this.updatedByInputFieldValue = event;
        }
        this.itemClassification.push({
            ItemClassificationCode: this.itemClassificationCodeInputFieldValue,
            Description: this.descriptionInputFieldValue,
            ItemType: this.itemTypeInputFieldValue,
            Memo: this.memoInputFieldValue,
            CreatedBy: this.createdByInputFieldValue,
            UpdatedBy: this.updatedByInputFieldValue,
            first: this.first,
            page: 10,
            pageCount: 10,
            rows: this.rows,
            limit: 5
        })
        if (this.itemClassification) {
            this.workFlowtService.getServerPages(this.itemClassification[this.itemClassification.length - 1]).subscribe( //we are sending event details to service
                pages => {
                    this.itemClassificationPaginationList = pages;
                    this.itemClassificationPagination = this.itemClassificationPaginationList[0].itemClassificationList;
                    this.totalRecords = this.itemClassificationPaginationList[0].totalRecordsCount;
                    this.totelPages = Math.ceil(this.totalRecords / this.rows);
                });
        }
        else {
        }
    }


}