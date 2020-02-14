import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { fadeInOut } from '../../../services/animations';
import { MasterCompany } from '../../../models/mastercompany.model';
import { AuditHistory } from '../../../models/audithistory.model';
import { AuthService } from '../../../services/auth.service';
import { MessageSeverity, AlertService } from '../../../services/alert.service';
import { VendorService } from '../../../services/vendor.service';
import { MasterComapnyService } from '../../../services/mastercompany.service';
import { Vendor } from '../../../models/vendor.model';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Message } from 'primeng/components/common/message';
import { MenuItem } from 'primeng/components/common/menuitem';
import { async } from '../../../../../node_modules/@angular/core/testing';
import { VendorStepsPrimeNgComponent } from '../vendor-steps-prime-ng/vendor-steps-prime-ng.component';
import { editValueAssignByCondition } from '../../../generic/autocomplete';


@Component({
	selector: 'app-vendor-memo',
	templateUrl: './vendor-memo.component.html',
	styleUrls: ['./vendor-memo.component.scss'],
	animations: [fadeInOut]
})
/** VendorMemo component*/
export class VendorMemoComponent implements OnInit {
	loadingIndicator: boolean;
	allVendorPOList: any[];
	allVendorROList: any[];
	allVendorPOROList: any[];
	activeIndex: any;
	isvendorEditMode: any;
	local: any;
	private isEditMode: boolean = false;
	private isSaving: boolean;
	totalRecords: number = 0;
	pageIndex: number = 0;
	pageSize: number = 10;
	totalPages: number = 0;

	memoCols = [
		{ field: 'module', header: 'Module' },
		{ field: 'orderNumber', header: 'ID' },
		//{ field: 'notes', header: 'Memo text' },      

		// { field: 'module', header: 'Module' },			
		// { field: 'RepairOrderNumber', header: 'Id' },
		// { field: 'RoMemo', header: 'Memo text' },  
	];
	selectedColumns = this.memoCols;
	loaderForMemos: boolean;



	//displayedColumns = ['capabilityName', 'capabilityId', 'createdDate', 'companyName'];	


	/** VendorMemo ctor */
	constructor(public vendorService: VendorService, private router: Router, private alertService: AlertService, private authService: AuthService, ) {
		if (this.vendorService.listCollection !== undefined) {
			this.vendorService.isEditMode = true;
		}
		if (this.vendorService.listCollection && this.vendorService.isEditMode == true) {

			this.local = this.vendorService.listCollection;

		}

	}

	ngOnInit(): void {
		this.vendorService.currentEditModeStatus.subscribe(message => {
			this.isvendorEditMode = message;
		});
		this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-memo';
		this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);
		this.vendorService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-memo';
		this.vendorService.bredcrumbObj.next(this.vendorService.currentUrl);
		this.vendorService.ShowPtab = true;
		this.vendorService.alertObj.next(this.vendorService.ShowPtab);
		if (this.local) {
			this.VendorPOMemolist();
			this.VendorROMemolist();
		}

	}

	get userName(): string {
		return this.authService.currentUser ? this.authService.currentUser.userName : "";
	}

	createnew() {
		// this.vendorService.changeStep('General Information');
		// this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');
	}


	async  VendorPOMemolist() {
		this.loaderForMemos = true;
		await this.vendorService.getVendorPOMemolist(this.local.vendorId).subscribe(
			res => {
				this.allVendorPOList = res;
				this.allVendorPOROList = res;
				//this.allVendorPOROList.push(this.allVendorPOList);
				console.log(this.allVendorPOROList);
				this.loaderForMemos = false;
			},
			err => {
				this.loaderForMemos = false;
			});
	}

	async  VendorROMemolist() {
		this.loaderForMemos = true;
		await this.vendorService.getVendorROMemolist(this.local.vendorId).subscribe(
			res => {
				this.allVendorROList = res;

				for (let value of this.allVendorROList) {
					this.allVendorPOROList.push(value);
				}
				this.loaderForMemos = false;
			},
			err => {
				this.loaderForMemos = false;
			});

	}

	updateMemoTxext(row, e) {
		this.isEditMode = true;
		this.isSaving = true;
		console.log(row);
		var name = this.userName;
		this.vendorService.updateVendorPOROmemolist(row.orderNumberId, row.module, row.notes, name).subscribe(
			res => {
				this.VendorPOMemolist();
				this.VendorROMemolist();
				this.alertService.showMessage(
					'Success',
					`Saved Memo Successfully `,
					MessageSeverity.success
				);
			}

		)
	}
	isViewMode
	NextClick() {
		this.vendorService.contactCollection = this.local;
		this.activeIndex = 10;
		this.vendorService.changeofTab(this.activeIndex);
		this.alertService.showMessage(
			'Success',
			`${this.isvendorEditMode ? 'Updated' : 'Saved'}  Memos Sucessfully `,
			MessageSeverity.success
		);
		// this.vendorService.indexObj.next(this.activeIndex);
		// this.vendorService.changeStep('Documents');
		// this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-documents');
	}

	backClick() {
		this.activeIndex = 8;
		this.vendorService.changeofTab(this.activeIndex);
		// this.vendorService.indexObj.next(this.activeIndex);
		// this.vendorService.changeStep('Warnings');
		// this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-warnings');
	}

	getVendorName() {


		if (this.local !== undefined) {
			return editValueAssignByCondition('vendorName', this.local.vendorName) === undefined ? '' : editValueAssignByCondition('vendorName', this.local.vendorName);
		} else {
			return '';
		}
	}

	getPageCount(totalNoofRecords, pageSize) {
		return Math.ceil(totalNoofRecords / pageSize)
	}
}   