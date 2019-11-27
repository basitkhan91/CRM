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


@Component({
    selector: 'app-vendor-memo',
    templateUrl: './vendor-memo.component.html',
	styleUrls: ['./vendor-memo.component.scss'],
	animations: [fadeInOut]
})
/** VendorMemo component*/
export class VendorMemoComponent implements OnInit{
	loadingIndicator: boolean;
	allVendorPOList:any[];
	allVendorROList:any[];
	allVendorPOROList: any[];
	
	local: any;
	private isEditMode: boolean = false;
	private isSaving: boolean;
			
	memoCols = [
		{ field: 'module', header: 'Module' },			
		{ field: 'orderNumber', header: 'Id' },
		//{ field: 'notes', header: 'Memo text' },      

		// { field: 'module', header: 'Module' },			
		// { field: 'RepairOrderNumber', header: 'Id' },
		// { field: 'RoMemo', header: 'Memo text' },          


	];       



    //displayedColumns = ['capabilityName', 'capabilityId', 'createdDate', 'companyName'];	
	

    /** VendorMemo ctor */
	constructor(public workFlowtService: VendorService, private router: Router,private alertService: AlertService,private authService: AuthService,) {
		if (this.workFlowtService.listCollection && this.workFlowtService.isEditMode == true) {
			
			this.local = this.workFlowtService.listCollection;
						
		}
		
	}

	ngOnInit(): void {
		this.workFlowtService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-memo';
		this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
		this.workFlowtService.currentUrl = '/vendorsmodule/vendorpages/app-vendor-memo';
		this.workFlowtService.bredcrumbObj.next(this.workFlowtService.currentUrl);
		this.workFlowtService.ShowPtab = true;
		this.workFlowtService.alertObj.next(this.workFlowtService.ShowPtab);
		if (this.local) {
			this.VendorPOMemolist();
			this.VendorROMemolist();
        }
		
	}
	get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

	createnew(){
        this.workFlowtService.changeStep('General Information');
        this.router.navigateByUrl('/vendorsmodule/vendorpages/app-vendor-general-information');
	}


	async  VendorPOMemolist() {			       
	    await this.workFlowtService.getVendorPOMemolist(this.local.vendorId).subscribe(
		 res => {
			 this.allVendorPOList = res;
			 this.allVendorPOROList = res;
			 //this.allVendorPOROList.push(this.allVendorPOList);
			 console.log(this.allVendorPOROList);
		 });
	}
	
	async  VendorROMemolist() {			       
	    await this.workFlowtService.getVendorROMemolist(this.local.vendorId).subscribe(
		 res => {
			 this.allVendorROList = res;		 

			 for (let value of this.allVendorROList) {
				this.allVendorPOROList.push(value);
			  }
			 
		 });

	}	
	
	updateMemoTxext(row,e) {
		debugger
        this.isEditMode = true;
        this.isSaving = true;	
		console.log(row);
		var name= this.userName;		
		this.workFlowtService.updateVendorPOROmemolist(row.orderNumberId,row.module,row.notes,name).subscribe(
			res=>{
				this.VendorPOMemolist();
				this.VendorROMemolist();
			}
		)
		
     
    }
}   