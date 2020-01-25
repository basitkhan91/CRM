﻿import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fadeInOut } from '../../services/animations';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { AtaSubChapter1Service } from '../../services/atasubchapter1.service';
import { MasterComapnyService } from '../../services/mastercompany.service';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { ATASubChapter } from '../../models/atasubchapter.model';
import { AuditHistory } from '../../models/audithistory.model';
import { AuthService } from '../../services/auth.service';
import { ATAMain } from '../../models/atamain.model';
import { AtaMainService } from '../../services/atamain.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { MasterCompany } from '../../models/mastercompany.model';

import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuItem } from 'primeng/api';//bread crumb
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
import { ATAChapter } from '../../models/atachapter.model';
import { SingleScreenAuditDetails, AuditChanges } from "../../models/single-screen-audit-details.model";
import { validateRecordExistsOrNot, selectedValueValidate, editValueAssignByCondition, getObjectByValue, getObjectById } from '../../generic/autocomplete';
import { ConfigurationService } from '../../services/configuration.service';
@Component({
	selector: 'app-ata-sub-chapter1',
	templateUrl: './ata-sub-chapter1.component.html',
	styleUrls: ['./ata-sub-chapter1.component.scss'],
	animations: [fadeInOut]
})
/** AtaSubChapter1 component*/
export class AtaSubChapter1Component implements OnInit {

	originalData: any;
	isEdit: boolean = false;
	totalRecords: any;
	pageIndex: number = 0;
	pageSize: number = 10;
	totalPages: number;
	headers = [
		{ field: 'ataSubChapterCode', header: 'Code' },
		{ field: 'description', header: 'ATA Sub Chapter' },
		{ field: 'ataChapterName', header: 'ATA Chapter' },
		{ field: 'ataChapterCategory', header: 'ATA Chapter Category' },
		{ field: 'memo', header: 'Memo' },
	]
	selectedColumns = this.headers;
	formData = new FormData()
	@ViewChild('dt')

	private table: Table;
	auditHistory: any[] = [];
	disableSaveGroupId: boolean = false;
	PortalList: any;
	disableSaveForDescription: boolean = false;
    disableSaveForDescriptionMsg : boolean = false;
	descriptionList: any;
	ataList: any;
	new = {
		ataSubChapterCode: "",
		description: "",
		ataChapterId: "",
		ataChapterName: "",
		ataChapterCategory: "",
		masterCompanyId: 1,
		isActive: true,
		memo: "",
	}
	addNew = { ...this.new };
	selectedRecordForEdit: any;
	viewRowData: any;
	selectedRowforDelete: any;
	existingRecordsResponse = []
	constructor(private breadCrumb: SingleScreenBreadcrumbService,
		private authService: AuthService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
		private _fb: FormBuilder,
		private alertService: AlertService,
		public atasubchapterService: AtaSubChapter1Service,
		private ataChapterService: AtaMainService,
		private dialog: MatDialog, private configurations: ConfigurationService) {
	}
	ngOnInit(): void {
		this.getList();
		this.breadCrumb.currentUrl = '/singlepages/singlepages/app-ata-sub-chapter1';
		this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
	}

	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}
	columnsChanges() {
		this.refreshList();
	}
	refreshList() {
		this.table.reset();

		// this.table.sortOrder = 0;
		// this.table.sortField = '';

		this.getList();
	}

    onBlur(event) {
        
        const value = event.target.value;
		this.disableSaveForDescriptionMsg = false;
		for (let i = 0; i < this.originalData.length; i++) {
			let description = this.originalData[i].description;
			let ataSubChapterId = this.originalData[i].ataSubChapterId;
            if (description.toLowerCase() == value.toLowerCase()) {
                if (!this.isEdit || this.isEdit) {
					this.disableSaveForDescriptionMsg = true;
					this.disableSaveForDescription = true;
                }
				else if (ataSubChapterId != this.selectedRecordForEdit.ataSubChapterId) {
					this.disableSaveForDescriptionMsg = true;
					this.disableSaveForDescription = false;
                }
                else {
					this.disableSaveForDescriptionMsg = false;
					this.disableSaveForDescription = false;
                }
                console.log('description :', description);
                break;
            }
        }
    }


	customExcelUpload(event) {
		// const file = event.target.files;

		// console.log(file);
		// if (file.length > 0) {

		//     this.formData.append('file', file[0])
		//     this.unitofmeasureService.UOMFileUpload(this.formData).subscribe(res => {
		//         event.target.value = '';

		//         this.formData = new FormData();
		//         this.existingRecordsResponse = res;
		//         this.getList();
		//         this.alertService.showMessage(
		//             'Success',
		//             `Successfully Uploaded  `,
		//             MessageSeverity.success
		//         );

		//     })
		// }

	}
	sampleExcelDownload() {
		const url = `${this.configurations.baseUrl}/api/FileUpload/downloadsamplefile?moduleName=ATASubchapter&fileName=ATASubchapter.xlsx`;

		window.location.assign(url);
	}

	getList() {
		this.atasubchapterService.getAtaSubChapter1List().subscribe(res => {
			const responseData = res[0];
			this.originalData = responseData;
			this.totalRecords = responseData.length;
			this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
		})
		this.ataChapterService.getAtaMainList().subscribe(result => {
			this.ataList = result[0];
		})

	}
	changePage(event: { first: any; rows: number }) {
		console.log(event);
		const pageIndex = (event.first / event.rows);

		this.pageSize = event.rows;
		this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
	}


	checkGroupDescriptionExists(field, value) {
		console.log(this.selectedRecordForEdit);
		const exists = validateRecordExistsOrNot(field, value, this.originalData, this.selectedRecordForEdit);
		if (exists.length > 0) {
			this.disableSaveForDescription = true;
            this.disableSaveForDescriptionMsg = true;
		}
		else {
			this.disableSaveForDescription = false;
            this.disableSaveForDescriptionMsg = false;
        }
    }
	filterDescription(event) {
		this.descriptionList = this.originalData;

		const descriptionData = [...this.originalData.filter(x => {
			return x.description.toLowerCase().includes(event.query.toLowerCase())
		})]
		this.descriptionList = descriptionData;
	}
	selectedDescription(object) {
		const exists = selectedValueValidate('description', object, this.selectedRecordForEdit)

		this.disableSaveForDescription = !exists;
	}

	save() {
		const data = {
			...this.addNew, createdBy: this.userName, updatedBy: this.userName,
            description: editValueAssignByCondition('description', this.addNew.description),
            ataChapterCategory: editValueAssignByCondition('ataChapterCategory', this.addNew.ataChapterCategory),
            //ataChapterCode: editValueAssignByCondition('ataChapterCode', this.addNew.ataChapterCode),
            ataChapterName: editValueAssignByCondition('ataChapterId', this.addNew.ataChapterId)            
		};
		console.log(data)
		if (!this.isEdit) {
			this.atasubchapterService.newATASubChapter1(data).subscribe(() => {
				this.resetForm();
				this.getList();
				this.alertService.showMessage(
					'Success',
					`Added  New ATA Subchapter Successfully  `,
					MessageSeverity.success
				);
			})
		} else {

            this.atasubchapterService.updateATASubChapter1(data).subscribe(() => {
                this.selectedRecordForEdit = undefined;
                this.isEdit = false;
                this.resetForm();
                this.getList();
                this.alertService.showMessage(
                    'Success',
                    `Updated  ATA Subchapter Successfully  `,
                    MessageSeverity.success
                );
            });
        }
	}

	resetForm() {
		this.isEdit = false;
		this.selectedRecordForEdit = undefined;
		this.disableSaveForDescriptionMsg = false;
        this.disableSaveForDescription = false;
		this.addNew = { ...this.new };
	}

    getmemo($event) {
		
			this.disableSaveForDescriptionMsg = false;
			this.disableSaveForDescription = false;
        
    }

	edit(rowData) {
		console.log(rowData);
		this.isEdit = true;
		this.disableSaveGroupId = false;
		this.disableSaveForDescription = true;
        this.disableSaveForDescriptionMsg = false;


		this.addNew = {
			...rowData,		
			description: getObjectByValue('description', rowData.description, this.originalData),
		};
		this.selectedRecordForEdit = { ...this.addNew }

	}

	changeStatus(rowData) {
		console.log(rowData);
		const data = { ...rowData }
		this.atasubchapterService.updateATASubChapter1(data).subscribe(() => {
			this.alertService.showMessage(
				'Success',
				`Updated Status Successfully  `,
				MessageSeverity.success
			);
		})

	}
	viewSelectedRow(rowData) {
		console.log(rowData);
		this.viewRowData = rowData;
	}
	resetViewData() {
		this.viewRowData = undefined;
	}
	delete(rowData) {
		this.selectedRowforDelete = rowData;

	}
	deleteConformation(value) {
		if (value === 'Yes') {
			this.atasubchapterService.deleteATASubChapter1(this.selectedRowforDelete.ataSubChapterId).subscribe(() => {
				this.getList();
				this.alertService.showMessage(
					'Success',
					`Deleted ATA Subchapter Successfully  `,
					MessageSeverity.success
				);
			})
		} else {
			this.selectedRowforDelete = undefined;
		}
	}

	getAuditHistoryById(rowData) {
        this.atasubchapterService.historyATASubChapter1(rowData.ataSubChapterId).subscribe(res => {
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

	
}


