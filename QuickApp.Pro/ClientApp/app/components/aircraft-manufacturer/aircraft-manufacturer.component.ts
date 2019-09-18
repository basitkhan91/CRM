import { OnInit, Component } from "@angular/core";
import { fadeInOut } from "../../services/animations";
import { AuthService } from "../../services/auth.service";
import { AlertService, MessageSeverity } from "../../services/alert.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AircraftType } from "../../models/AircraftType.model";
import { AircraftManufacturerService } from "../../services/aircraft-manufacturer/aircraftManufacturer.service";
import { SingleScreenAuditDetails } from "../../models/single-screen-audit-details.model";
import { LazyLoadEvent } from "primeng/api";
import { MasterCompany } from "../../models/mastercompany.model";
import { MasterComapnyService } from "../../services/mastercompany.service";
import { SingleScreenBreadcrumbService } from "../../services/single-screens-breadcrumb.service";
@Component({
    selector: 'app-aircraft-manufacturer',
    templateUrl: './aircraft-manufacturer.component.html',
    styleUrls: ['./aircraft-manufacturer.component.scss'],
    animations: [fadeInOut]
})
/** aircraft-manufacturer component*/
export class AircraftManufacturerComponent implements OnInit {
    pageSearch: { query: any; field: any; };
    first: number;
    rows: number;
    paginatorState: any;
    loadingIndicator: boolean;
    AuditDetails: any[];
    /** aircraft-manufacturer ctor */
    allComapnies: MasterCompany[] = [];
    currentAircraftManufacturerType: AircraftType;
    aircraftManufacturerTypeToUpdate: AircraftType;
    aircraftManufacturerTypeToRemove: AircraftType;
    aircraftManufacturerTypeToUpdateActive: AircraftType;
    aircraftManufacturertoview: AircraftType;
    aircraftManufacturerList: AircraftType[];
    aircraftManufacturerPagination: AircraftType[];//added
    public sourceaircraftmanufacturer: any = {}
    aircraftManufacturerSearchList: AircraftType[];
    aircraftManufacturerPaginationList: any[] = [];
    modal: NgbModalRef;
    display: boolean = false;
    modelValue: boolean = false;
    Active: string;
    manufactureViewField: any = {};
    //adding for Pagination start
    totalRecords: number;
    cols: any[];
    loading: boolean;
    comments: any = " ";
    createdBy: any = "";
    updatedBy: any = "";
    createdDate: any = "";
    updatedDate: any = "";
    field: any;
    aircraftManufacturer = [];
    totelPages: number;
    allmanufacturerInfo: AircraftType[] = [];
    actionmanufacturer: any[] = [];
    selectedActionName: any;
    localCollection: any[] = [];
    disableSave: boolean = false;
    manufacturer: string;
    //adding for Pagination End

    constructor(private breadCrumb: SingleScreenBreadcrumbService,
        private aircraftManufacurerService: AircraftManufacturerService, private masterComapnyService: MasterComapnyService, private alertService: AlertService, private modalService: NgbModal, private authService: AuthService, ) {

    }

    //filterGrid(query, field, Mode) {
    //    this.pageSearch = {
    //        query: query,
    //        field: field
    //    }
    //    console.log(query, field, Mode);
    //    this.aircraftManufacurerService.getPageSerach(pageSearch).subscribe(aircraftManufacturer => {
    //        this.aircraftManufacturerSearchList = aircraftManufacturer[0];
    //        this.totalRecords = this.aircraftManufacturerList.length;//Adding for Pagination
    //    });
    //  }

    private loadMasterCompanies() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.masterComapnyService.getMasterCompanies().subscribe(
            results => this.onDataMasterCompaniesLoadSuccessful(results[0]),
            error => this.onDataLoadFailed(error)
        );

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
    ngOnInit(): void {
        this.breadCrumb.currentUrl = '/singlepages/singlepages/app-aircraft-manufacturer';
        this.breadCrumb.bredcrumbObj.next(this.breadCrumb.currentUrl);
        this.currentAircraftManufacturerType = new AircraftType();
        this.loadData();
        //Adding for p-table in table also we can put headers and columns manually
        this.cols = [
            
            { field: 'description', header: 'Aircraft Manufacturer Name' },
            { field: 'memo', header: 'Memo' },
        ];
        this.loading = true;
        //P-table Code End
    }
    public loadData() {
        this.aircraftManufacurerService.getAll().subscribe(aircraftManufacturer => {
            this.aircraftManufacturerList = aircraftManufacturer[0];
            this.allmanufacturerInfo = aircraftManufacturer[0];
            this.totalRecords = this.aircraftManufacturerList.length;//Adding for Pagination
            this.totelPages = Math.ceil(this.totalRecords / this.rows);
            this.aircraftManufacturerList.forEach(function (manufacturer) {
                manufacturer.isActive = manufacturer.isActive == false ? false : true;
            });
        });
    }

    loadAircraftManufacturer(event: LazyLoadEvent) //when page initilizes it will call this method
    {
        this.loading = true;
        this.rows = event.rows;
        this.first = event.first;
        if (this.field) {
            this.aircraftManufacturer.push({
                first: this.first,
                page: 10,
                pageCount: 10,
                rows: this.rows,
                limit: 5
            })
            if (this.aircraftManufacturer) {
                this.aircraftManufacurerService.getServerPages(this.aircraftManufacturer[this.aircraftManufacturer.length - 1]).subscribe( //we are sending event details to service
                    pages => {
                        if (pages.length > 0) {
                            this.aircraftManufacturerPaginationList = pages;
                            this.totalRecords = this.aircraftManufacturerPaginationList[0].totalRecordsCount;
                            this.totelPages = Math.ceil(this.totalRecords / this.rows);
                        }
                    });
            }
        }
        else {
            setTimeout(() => {
                if (this.aircraftManufacturerList) {
                    this.aircraftManufacurerService.getServerPages(event).subscribe( //we are sending event details to service
                        pages => {
                            if (pages.length > 0) {
                                this.aircraftManufacturerPagination = pages[0];
                            }
                        });
                    this.loading = false;
                }
            }, 1000);
        }

    }
    //Pagination Code End

    get userName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    addAircraftManufacturer(): void {
        if (!(this.currentAircraftManufacturerType.description)) {
            this.display = true;
            return;
        }
        this.currentAircraftManufacturerType.createdBy = this.userName;
        this.currentAircraftManufacturerType.updatedBy = this.userName;
        this.aircraftManufacurerService.add(this.currentAircraftManufacturerType).subscribe(aircraftManufacturer => {
            this.alertService.showMessage("Success", 'Aircraft manufacturer Added successfully.', MessageSeverity.success);
            // this.updatePaginatorState(); // previously after update we used to call getAll now we can this method to get required list
            this.loadData();
            this.resetAddAircraftManufacturer();
            this.dismissModel();
        });

    }



    setAircraftManufacturerToUpdate(editAircraftManufacturerpopup: any, id: number): void {
        this.aircraftManufacturerTypeToUpdate = Object.assign({}, this.allmanufacturerInfo.filter(function (aircraftManufacturer) {
            return aircraftManufacturer.aircraftTypeId == id;
        })[0]);
        this.loadData();
        this.modal = this.modalService.open(editAircraftManufacturerpopup, { size: 'sm' });
    }

    updateAircraftManufacturer(): void {
        this.currentAircraftManufacturerType.updatedBy = this.userName;
        this.aircraftManufacurerService.update(this.aircraftManufacturerTypeToUpdate).subscribe(aircraftmanufacturer => {
            this.alertService.showMessage("Success", 'Aircraft manufacturer Updated successfully.', MessageSeverity.success);
            // this.updatePaginatorState(); // previously after update we used to call getAll now we can this method to get required list
            this.loadData();
            this.resetUpdateAircraftManufacturer();
            this.dismissModel();
        });
    }

    removeAircraftManufacturer(): void {
        this.aircraftManufacurerService.remove(this.aircraftManufacturerTypeToRemove.aircraftTypeId).subscribe(response => {
            this.alertService.showMessage("Success", 'Aircraft manufacturer removed successfully.', MessageSeverity.success);
            // this.updatePaginatorState(); // previously after update we used to call getAll now we can this method to get required list
            this.loadData();
            this.dismissModel();
        });

    }
    // UpdateActiveManufacture() {
    //     this.aircraftManufacurerService.updateActive(this.aircraftManufacturerTypeToUpdateActive.aircraftTypeId).subscribe(response => {
    //         this.alertService.showMessage("Success", 'Aircraft manufacturer removed successfully.', MessageSeverity.success);
    //         // this.updatePaginatorState(); // previously after update we used to call getAll now we can this method to get required list
    //         this.loadData();
    //         this.dismissModel();
    //     });
    // }
    resetAddAircraftManufacturer(): void {
        this.currentAircraftManufacturerType = new AircraftType();
    }

    resetUpdateAircraftManufacturer(): void {
        this.aircraftManufacturerTypeToUpdate = new AircraftType();
    }

    dismissModel(): void {
        if (this.modal != undefined) {
            this.modal.close();
        }
    }

    confirmDelete(content, id): void {
        this.aircraftManufacturerTypeToRemove = Object.assign({}, this.allmanufacturerInfo.filter(function (manufacturer) {
            return manufacturer.aircraftTypeId == id;
        })[0]);;
        this.modal = this.modalService.open(content, { size: 'sm' });
    }
    openView(viewData, id): void {
        this.aircraftManufacturertoview = Object.assign({}, this.allmanufacturerInfo.filter(function (manufacturer) {
            return manufacturer.aircraftTypeId == id;
        })[0]);;
        console.log(this.aircraftManufacturertoview);
        this.modal = this.modalService.open(viewData, { size: 'sm' });
    }
    updateStatus(rowData){
        const data = {
            AircraftTypeId : rowData.aircraftTypeId,
            Description : rowData.description,
            Memo : rowData.memo,
            MasterCompanyId :  1,

       }
       this.modal = this.modalService.open(rowData, { size: 'sm' });
              this.aircraftManufacurerService.updateActive(data).subscribe(response => { 

        })
    }
    toggleIsActive(rowData: any): void {
        const data = {
             AircraftTypeId : rowData.AircraftTypeId,
             Description : rowData.Description,
             Memo : rowData.Memo,
             MasterCompanyId :  1,
 
        }
        // this.aircraftManufacturerTypeToUpdateActive = assetStatus;
        // this.aircraftManufacturerTypeToUpdateActive.isActive = assetStatus.isActive;
        // this.aircraftManufacturerTypeToRemove = Object.assign({}, this.allmanufacturerInfo.filter(function (manufacturer) {
        //     return manufacturer.aircraftTypeId == id;
        // })[0]);;
        this.modal = this.modalService.open(rowData, { size: 'sm' });
        // this.aircraftManufacurerService.updateActive(data).subscribe(response => { 

        // })
        // this.UpdateActiveManufacture();
    }

    showAuditPopup(template, manufacturerId): void {
        this.audit(manufacturerId);
        this.modal = this.modalService.open(template, { size: 'sm' });
    }

    audit(manufacturerId: number): void {
        this.AuditDetails = [];
        this.aircraftManufacurerService.getAudit(manufacturerId).subscribe(audits => {
            if (audits.length > 0) {
                this.AuditDetails = audits;
                this.AuditDetails[0].ColumnsToAvoid = ["AircraftTypeAuditId", "masterCompanyId", "createdBy", "createdDate", "updatedDate"];
            }
        });
    }
    open(content) //added
    {
        this.currentAircraftManufacturerType = new AircraftType();
        this.modal = this.modalService.open(content, { size: 'sm' });
        this.modal.result.then(() => {
            console.log('When user closes');
        }, () => { console.log('Backdrop click') })
    }
    // updatePaginatorState() //need to pass this Object after update or Delete to get Server Side pagination
    // {
    //     this.paginatorState = {
    //         rows: this.rows,
    //         first: this.first
    //     }
    //     if (this.paginatorState) {
    //         this.loadAircraftManufacturer(this.paginatorState);
    //     }
    // }
    manufactureId(event) {
        for (let i = 0; i < this.actionmanufacturer.length; i++) {
            if (event == this.actionmanufacturer[i][0].manufacturer) {
                //alert("Action Name already Exists");
                this.disableSave = true;
                this.selectedActionName = event;
            }
        }
    }
    filterManufacturer(event) {

        this.localCollection = [];
        for (let i = 0; i < this.allmanufacturerInfo.length; i++) {
            let manufacturer = this.allmanufacturerInfo[i].description;
            if (manufacturer.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.actionmanufacturer.push([{
                    "aircraftTypeId": this.allmanufacturerInfo[i].aircraftTypeId,
                    "manufacturer": manufacturer
                }]),
                    this.localCollection.push(manufacturer);
            }
        }
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
}