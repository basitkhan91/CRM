import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuditHistory } from '../../../../models/audithistory.model';
import { AuthService } from '../../../../services/auth.service';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { VendorService } from '../../../../services/vendor.service';
import { fadeInOut } from '../../../../services/animations';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { PurchaseOrderService } from '../../../../services/purchase-order.service';
import { VendorCapabilitiesService } from '../../../../services/vendorcapabilities.service';
import { CommonService } from '../../../../services/common.service';
import { listSearchFilterObjectCreation } from '../../../../generic/autocomplete';
import * as $ from 'jquery';


@Component({
	selector: 'app-ro-list',
	templateUrl: './ro-list.component.html',
	styleUrls: ['./ro-list.component.scss'],
    animations: [fadeInOut],
    providers: [DatePipe]
})
/** Rolist component*/
export class RoListComponent implements OnInit {
	totalRecords: number = 0;
    totalPages: number = 0;
    headers = [
		{ field: 'repairOrderNumber', header: 'RO Num' },
        { field: 'openDate', header: 'Open Date' },
        { field: 'closedDate', header: 'Closed/Cancelled Date' },
        { field: 'vendorName', header: 'Vendor Name' },
        { field: 'vendorCode', header: 'Vendor Code' },
        { field: 'status', header: 'Status' },
        { field: 'requestedBy', header: 'Requested By' },
        { field: 'approvedBy', header: 'Approved By' },
    ]
    selectedColumns = this.headers;
    data: any;
    pageSize: number = 10;
    pageIndex: number = 0;
    @ViewChild('dt')
    private table: Table;
    lazyLoadEventData: any;
    lazyLoadEventDataInput: any;
    auditHistory: AuditHistory[];
    rowDataToDelete: any = {};
    roHeaderAdd: any = {};
    roPartsList: any = [];
    approveList: any = [];
    vendorCapesInfo: any = [];
    vendorCapesCols: any[];
    headerManagementStructure: any = {};
    repairOrderNoInput: any;
    openDateInput: any;
    closedDateInput: any;
    vendorNameInput: any;
    vendorCodeInput: any;
    statusIdInput: any;
    requestedByInput: any;
    approvedByInput: any;
    @Input() isEnableROList: boolean;
    @Input() vendorId: number;
    currentStatus: string = 'open';
    filterText: any = '';
    // currentdate: any = new Date();
    // todayDate: any = this.datePipe.transform(new Date(), "yyyy-MM-dd");

    constructor(private _route: Router,
        private authService: AuthService,
        private alertService: AlertService,
        public vendorService: VendorService,
        private purchaseOrderService: PurchaseOrderService,
        private vendorCapesService: VendorCapabilitiesService,
        private commonService: CommonService,
        private datePipe: DatePipe) {
        // this.displayedColumns.push('Customer');
        // this.dataSource = new MatTableDataSource();
        // this.activeIndex = 0;
        // this.workFlowtService.listCollection = null;
        //this.sourceCustomer = new Customer();

    }

    ngOnInit() {
        // this.getList();
        this.vendorCapesCols = [
			//{ field: 'vcId', header: 'VCID' },
			{ field: 'ranking', header: 'Ranking' },
			{ field: 'partNumber', header: 'PN' },
			{ field: 'partDescription', header: 'PN Description' },
			{ field: 'capabilityType', header: 'Capability Type' },
			{ field: 'cost', header: 'Cost' },
			{ field: 'tat', header: 'TAT' },
			{ field: 'name', header: 'PN Mfg' },
        ];
    }

    getROListByStatus(status) {
        const pageIndex = parseInt(this.lazyLoadEventDataInput.first) / this.lazyLoadEventDataInput.rows;;
        this.pageIndex = pageIndex;
        this.pageSize = this.lazyLoadEventDataInput.rows;
        this.lazyLoadEventDataInput.first = pageIndex;
        if(status == 'open') {            
            this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, status: 'open' };            
        } 
        else if(status == 'closed') {
            this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, status: 'closed' };
        }
        else if(status == 'pending') {
            this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, status: 'pending' };
        }
        else if(status == 'fulfilling') {
            this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, status: 'fulfilling' };
        }
        else if(status == 'canceled') {
            this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, status: 'canceled' };
        }
        this.getList(this.lazyLoadEventDataInput);
    }

    // getList(data) {
    //     this.vendorService.getRepaireOrderlist().subscribe(res => {
	// 		console.log(res);			
    //          this.data = res[0];
    //     })
	// }
	
	getList(data) {
        this.vendorService.getROList(data).subscribe(res => {
			console.log(res);			
             this.data = res[0];
            if (this.data.length > 0) {
                this.totalRecords = res[0][0].totalRecords;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }else {
                this.data=[];
                this.totalRecords=0;
                this.totalPages=0;
            } 
        })
	}

    getManagementStructureCodes(id) {
        this.commonService.getManagementStructureCodes(id).subscribe(res => {
			if (res.Level1) {
				this.headerManagementStructure.level1 = res.Level1;
            }
            if (res.Level2) {
				this.headerManagementStructure.level2 = res.Level2;
            }
            if (res.Level3) {
				this.headerManagementStructure.level3 = res.Level3;
            }
            if (res.Level4) {
				this.headerManagementStructure.level4 = res.Level4;
			}
		})
    }
    
    getManagementStructureCodesParent(partList) {
        this.commonService.getManagementStructureCodes(partList.managementStructureId).subscribe(res => {
			if (res.Level1) {
				partList.level1 = res.Level1;
            }
            if (res.Level2) {
				partList.level2 = res.Level2;
            }
            if (res.Level3) {
				partList.level3 = res.Level3;
            }
            if (res.Level4) {
				partList.level4 = res.Level4;
			}
		})
    }

    getManagementStructureCodesChild(partChild) {
        this.commonService.getManagementStructureCodes(partChild.managementStructureId).subscribe(res => {
			if (res.Level1) {
				partChild.level1 = res.Level1;
            }
            if (res.Level2) {
				partChild.level2 = res.Level2;
            }
            if (res.Level3) {
				partChild.level3 = res.Level3;
            }
            if (res.Level4) {
				partChild.level4 = res.Level4;
			}
		})
    }

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    columnsChanges() {
        this.refreshList();
    }
    refreshList() {
        this.table.reset();
        // this.getList();
        // this.table.sortOrder = 0;
        // this.table.sortField = '';


    }
    loadData(event) {
        this.lazyLoadEventData = event;
        const pageIndex = parseInt(event.first) / event.rows;;
        this.pageIndex = pageIndex;
        this.pageSize = event.rows;
        event.first = pageIndex;
        this.lazyLoadEventDataInput = event;
        this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, status: 'open' };
        if(this.isEnableROList) {
            this.lazyLoadEventDataInput.filters = { ...this.lazyLoadEventDataInput.filters, vendorId: this.vendorId }
        }
        if(this.filterText == '') {
            this.getList(this.lazyLoadEventDataInput);
        } else {
            this.globalSearch(this.filterText);
        }
        console.log(event);
    }

    onChangeInputField(value, field, el) {
        console.log(value, field);
        if (value === '') { el.classList.add("hidePlaceHolder"); }
        else el.classList.remove("hidePlaceHolder");

                      
        // if(field == "repairOrderId") {
        //     this.repairOrderIdInput = value;
        // }
        if(field == "repairOrderNumber") {
            this.repairOrderNoInput = value;
        }
        if(field == "openDate") {
            this.openDateInput = value;
        }
        if(field == "closedDate") {
            this.closedDateInput = value;
        }
        if(field == "vendorName") {
            this.vendorNameInput = value;
        }
        if(field == "vendorCode") {
            this.vendorCodeInput = value;
        }
        if(field == "status") {
            this.statusIdInput = value;
        }
        if(field == "requestedBy") {
            this.requestedByInput = value;
        }
        if(field == "approvedBy") {
            this.approvedByInput = value;
        }

        this.lazyLoadEventDataInput.filters = {
            repairOrderNo: this.repairOrderNoInput,
            openDate: this.openDateInput,
            closedDate: this.closedDateInput,
            vendorName: this.vendorNameInput,
            vendorCode: this.vendorCodeInput,
            status: this.statusIdInput ? this.statusIdInput : this.currentStatus,
            requestedBy: this.requestedByInput,
            approvedBy: this.approvedByInput,
            vendorId: this.vendorId ? this.vendorId : null
        }
        console.log(this.lazyLoadEventDataInput);        
        //this.loadData(event);
        this.getList(this.lazyLoadEventDataInput);
    }

    changeStatus(rowData) {
        console.log(rowData);
        
        this.vendorService.getROStatus(rowData.repairOrderId, rowData.isActive, this.userName).subscribe(res => {
            this.alertService.showMessage("Success", `Successfully Updated Status`, MessageSeverity.success);
        })

    }
    edit(rowData) {
		console.log(rowData);		
        const { repairOrderId } = rowData;
        this._route.navigateByUrl(`vendorsmodule/vendorpages/app-ro-setup/edit/${repairOrderId}`);
    }
    delete(rowData) {
        this.rowDataToDelete = rowData;
    }
    deleteRO() {
        const { repairOrderId } = this.rowDataToDelete;
        this.vendorService.deleteRO(repairOrderId, this.userName).subscribe(res => {
            this.getList(this.lazyLoadEventData);
            this.alertService.showMessage("Success", `Successfully Deleted Record`, MessageSeverity.success);

        })
    }

    viewSelectedRow(rowData) { 
        console.log(rowData);
        this.getROViewById(rowData.repairOrderId);
        this.getROPartsViewById(rowData.repairOrderId);
        this.getApproversListById(rowData.repairOrderId);
    }

    viewSelectedRowdbl(rowData) {
        this.viewSelectedRow(rowData);
        $('#roView').modal('show');
    }

    getROViewById(roId) {
        this.vendorService.getROViewById(roId).subscribe(res => {
            console.log(res);  
            this.roHeaderAdd = res;
            this.getVendorCapesByID(this.roHeaderAdd.vendorId);
            this.getManagementStructureCodes(res.managementStructureId);
        });
    }
    getROPartsViewById(roId) {
		this.roPartsList = [];
        this.vendorService.getROPartsViewById(roId).subscribe(res => {
            console.log(res);  
            res.map(x => {
                const partList = {
                    ...x,
                    repairOrderSplitParts: this.getRepairOrderSplit(x)              
                }
                this.getManagementStructureCodesParent(partList);
                this.roPartsList.push(partList);
            });
        });
    }

    getRepairOrderSplit(partList) {
        if(partList.repairOrderSplitParts) {
			return partList.repairOrderSplitParts.map(y => {
				const splitpart = {
					...y,					
				}
				this.getManagementStructureCodesChild(splitpart);
				return splitpart;
			})
		}
    }

    getApproversListById(roId) {
		this.vendorService.getROApproverList(roId).subscribe(response => {
			console.log(response);			
			this.approveList = response;
        });
    }

    getVendorCapesByID(vendorId) {
		this.vendorCapesService.getVendorCapesById(vendorId).subscribe(res => {
			this.vendorCapesInfo = res;
		})
	}


    // changePage(event: { first: any; rows: number }) {
    //     console.log(event);
    //     this.pageIndex = (event.first / event.rows);
    //     // this.pageIndex = pageIndex;
    //     this.pageSize = event.rows;
    //     this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    // }
    globalSearch(value) {
        this.pageIndex = 0;
        this.filterText = value;
        this.vendorId = this.vendorId ? this.vendorId : 0;
        this.vendorService.repairOrderGlobalSearch(value, this.pageIndex, this.pageSize, this.vendorId).subscribe(res => {
            this.pageIndex = 0;
            this.data = res;
            if (this.data.length > 0) {
                this.totalRecords = res[0].totalRecords;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            }
        })

        //this.pageIndex = 0;
        // this.customerService.getGlobalSearch(value, this.pageIndex, this.pageSize).subscribe(res => {
        //     this.data = res;
        //     if (res.length > 0) {
        //         this.totalRecords = res[0].totalRecords;
        //         this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        //     }
        // })
    }
    getAuditHistoryById(rowData) {
        this.vendorService.getROHistory(rowData.repairOrderId).subscribe(res => {
            console.log(res);            
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

    closeViewModal() {
        $("#roView").modal("hide");
    }

    closeHistoryModal() {
        $("#roHistory").modal("hide");
    }

    closeDeleteModal() {
        $("#roDelete").modal("hide");
    }
}
